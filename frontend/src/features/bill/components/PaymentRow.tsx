"use client";

import * as React from "react";
import { Check, Clock, FileCheck, QrCode, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { ApiError, resolveMediaUrl } from "@/lib/api/client";
import { cn } from "@/lib/utils/cn";
import type { MemberIdentityAccent } from "@/lib/member-identity/member-identity";
import { useLanguage } from "@/i18n/LanguageProvider";
import { billTranslations } from "../i18n/bill-translations";
import { billService } from "../services/bill-service";
import type { BillDetail, BillPayment } from "../types/bill-types";

export interface PaymentRowProps {
  billId: string;
  payment: BillPayment;
  accent: MemberIdentityAccent;
  isHostMember?: boolean;
  isCreator: boolean;
  isSelf: boolean;
  locked?: boolean;
  onChange: (updated: BillDetail) => void;
}

function formatMoney(amount: number): string {
  return `฿${new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function PaymentIdentityAvatar({
  name,
  photo,
  accent,
}: {
  name: string;
  photo?: string | null;
  accent: MemberIdentityAccent;
}) {
  const [failedImageUrl, setFailedImageUrl] = React.useState<string | null>(null);
  const shouldShowImage = Boolean(photo && failedImageUrl !== photo);

  return (
    <div
      className={cn(
        "relative flex size-10 items-center justify-center shrink-0 rounded-full text-xs font-extrabold select-none overflow-hidden ring-2 shadow-2xs",
        accent.ringClass,
        photo ? "bg-white" : accent.initialsBgClass,
      )}
      title={`${name} (${accent.nameEn})`}
    >
      {shouldShowImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo!}
          alt={name}
          className="size-full object-cover rounded-full"
          referrerPolicy="no-referrer"
          onError={() => setFailedImageUrl(photo ?? null)}
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}

export function PaymentRow({
  billId,
  payment,
  accent,
  isHostMember = false,
  isCreator,
  isSelf,
  locked = false,
  onChange,
}: PaymentRowProps) {
  const { locale } = useLanguage();
  const t = billTranslations[locale].detail;
  const [showQr, setShowQr] = React.useState(false);
  const [qrDataUrl, setQrDataUrl] = React.useState<string | null>(null);
  const [isLoadingQr, setIsLoadingQr] = React.useState(false);
  const [isUploadingSlip, setIsUploadingSlip] = React.useState(false);
  const [isTogglingStatus, setIsTogglingStatus] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleToggleQr = async () => {
    if (showQr) {
      setShowQr(false);
      return;
    }

    setError(null);
    setIsLoadingQr(true);
    try {
      const qr = await billService.getPaymentQr(billId, payment.userId);
      setQrDataUrl(qr.qrDataUrl);
      setShowQr(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to load QR code.");
    } finally {
      setIsLoadingQr(false);
    }
  };

  const handleUploadSlip = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) {
      return;
    }

    setError(null);
    setIsUploadingSlip(true);
    try {
      const updated = await billService.uploadSlip(billId, payment.userId, file);
      onChange(updated);
      setShowQr(false);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to upload slip.");
    } finally {
      setIsUploadingSlip(false);
    }
  };

  const handleToggleStatus = async () => {
    setError(null);
    setIsTogglingStatus(true);
    try {
      const updated = await billService.setPaymentStatus(
        billId,
        payment.userId,
        payment.status === "PAID" ? "UNPAID" : "PAID",
      );
      onChange(updated);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Unable to update status.");
    } finally {
      setIsTogglingStatus(false);
    }
  };

  const slipImageUrl = resolveMediaUrl(payment.slipImageUrl);

  return (
    <div className="relative rounded-2xl border-2 border-[#E8E2D9] bg-white p-3.5 sm:p-4 shadow-2xs hover:shadow-xs transition-all overflow-hidden text-[#211D19] space-y-3">
      {/* 4px Left Member Identity Rail */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-[4px]",
          accent.railClass,
        )}
      />

      {/* Main Row: Avatar + Name + Identity Dot + Amount + Payment Status */}
      <div className="flex items-center justify-between gap-3 pl-1.5">
        <div className="flex items-center gap-3 min-w-0">
          <PaymentIdentityAvatar
            name={payment.displayName}
            photo={payment.avatarUrl}
            accent={accent}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-extrabold text-[#211D19] truncate">
                {payment.displayName}
              </p>
              {isSelf && (
                <span className="text-xs font-semibold text-[#665E55]">
                  ({t.youTag})
                </span>
              )}
              {isHostMember && (
                <span className="rounded bg-brand-primary/10 px-1.5 py-0.2 text-[10px] font-black uppercase text-brand-primary">
                  Host
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 mt-0.5">
              <span
                className="size-2 rounded-full shrink-0 shadow-2xs"
                style={{ backgroundColor: accent.baseHex }}
              />
              <p className="text-xs text-[#665E55] font-medium">
                {accent.nameTh} ({accent.nameEn})
              </p>
            </div>
          </div>
        </div>

        <div className="text-right shrink-0 space-y-1">
          <span className="text-base sm:text-lg font-black text-[#211D19] block">
            {formatMoney(payment.amount)}
          </span>

          <div className="flex items-center justify-end gap-1.5">
            {payment.status === "PAID" ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 border border-emerald-300 px-2 py-0.5 text-[11px] font-extrabold text-emerald-950 shadow-2xs">
                <Check className="size-3 stroke-[3] text-emerald-700" />
                <span>{t.paidBadge}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300 px-2 py-0.5 text-[11px] font-extrabold text-amber-950 shadow-2xs">
                <Clock className="size-3 stroke-[2.5] text-amber-700" />
                <span>{t.unpaidBadge}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Slip Attachment Link / Indicator if available */}
      {slipImageUrl && (
        <div className="pl-1.5">
          <a
            href={slipImageUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:underline"
          >
            <FileCheck className="size-3.5" />
            <span>{t.viewSlip}</span>
          </a>
        </div>
      )}

      {/* Host Controls */}
      {isCreator && !locked && (
        <div className="pt-2 border-t border-[#E8E2D9]/70 flex justify-end pl-1.5">
          <Button
            size="sm"
            variant="outline"
            loading={isTogglingStatus}
            onClick={handleToggleStatus}
            className="h-8 text-xs font-bold rounded-xl border-[#E8E2D9] hover:bg-[#FAF8F5]"
          >
            {payment.status === "PAID" ? t.markUnpaid : t.markPaid}
          </Button>
        </div>
      )}

      {/* Self-payment CTA Actions when UNPAID */}
      {!locked && isSelf && payment.status === "UNPAID" && (
        <div className="pt-2 border-t border-[#E8E2D9]/70 flex flex-wrap items-center gap-2 pl-1.5">
          <Button
            size="sm"
            variant="outline"
            leftIcon={<QrCode className="size-3.5" />}
            loading={isLoadingQr}
            onClick={handleToggleQr}
            className="h-8 text-xs font-bold rounded-xl border-[#E8E2D9] hover:bg-[#FAF8F5]"
          >
            {showQr ? t.hideQr : t.payNow}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<UploadCloud className="size-3.5" />}
            loading={isUploadingSlip}
            onClick={() => fileInputRef.current?.click()}
            className="h-8 text-xs font-bold rounded-xl text-brand-primary hover:bg-brand-primary/10 cursor-pointer"
          >
            {t.uploadSlip}
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUploadSlip}
          />
        </div>
      )}

      {/* QR Display Container */}
      {showQr && (
        <div className="flex flex-col items-center gap-2.5 rounded-2xl border-2 border-border/80 bg-surface-subtle p-4 ml-1.5">
          {qrDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={qrDataUrl}
              alt="PromptPay QR code"
              className="size-48 rounded-xl bg-white p-2 shadow-xs"
            />
          ) : (
            <Spinner />
          )}
          <p className="text-xs font-semibold text-text-secondary text-center">
            {t.scanInstruction(payment.amount)}
          </p>
        </div>
      )}

      {error && <p className="text-xs text-status-danger-text pl-1.5">{error}</p>}
    </div>
  );
}
