"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  FileText,
  Info,
  QrCode,
  Users,
  X,
} from "lucide-react";
import { ROUTES, billRoutes } from "@/config/routes";
import { AtmosphereBackground } from "@/components/ui/AtmosphereBackground";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Spinner } from "@/components/ui/Spinner";
import { ApiError } from "@/lib/api/client";
import { cn } from "@/lib/utils/cn";
import {
  resolveRoomMemberAccents,
  MEMBER_IDENTITY_PALETTE_15,
  type MemberIdentityAccent,
} from "@/lib/member-identity/member-identity";
import { useLanguage } from "@/i18n/LanguageProvider";
import { billTranslations } from "../i18n/bill-translations";
import { useBill } from "../hooks/use-bill";
import { billService } from "../services/bill-service";
import type { BillDetail, BillMember } from "../types/bill-types";

export interface SummaryStepScreenProps {
  billId: string;
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

function SummaryIdentityAvatar({
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

interface MemberSummaryEntry {
  member: BillMember;
  itemsSubtotal: number;
  estimatedTotal: number;
}

function memberBreakdown(bill: BillDetail): MemberSummaryEntry[] {
  const totals = new Map<string, number>();
  for (const member of bill.members) {
    totals.set(member.userId, 0);
  }
  for (const item of bill.items) {
    for (const share of item.shares) {
      totals.set(share.userId, (totals.get(share.userId) ?? 0) + share.amount);
    }
  }

  const extraCharges = bill.serviceCharge + bill.tax - bill.discount;

  const entries = bill.members
    .map((member) => {
      const itemsSubtotal = totals.get(member.userId) ?? 0;
      const shareOfExtra =
        bill.subtotal > 0 ? (itemsSubtotal / bill.subtotal) * extraCharges : 0;
      return {
        member,
        itemsSubtotal,
        estimatedTotal: itemsSubtotal + shareOfExtra,
      };
    })
    .filter((entry) => entry.itemsSubtotal > 0);

  if (entries.length === 0) {
    return bill.members.map((member) => ({
      member,
      itemsSubtotal: 0,
      estimatedTotal: 0,
    }));
  }

  return entries;
}

export function SummaryStepScreen({ billId }: SummaryStepScreenProps) {
  const router = useRouter();
  const { locale } = useLanguage();
  const isTh = locale === "th";
  const t = billTranslations[locale].summary;
  const { bill, isLoading, error, setBill } = useBill(billId);
  const [actionError, setActionError] = React.useState<string | null>(null);
  const [isConfirming, setIsConfirming] = React.useState(false);
  const [isCalculating, setIsCalculating] = React.useState(false);
  const hasCalculatedRef = React.useRef(false);

  const calculateSummary = React.useCallback(async () => {
    if (!bill || bill.summaryCalculated || hasCalculatedRef.current) {
      return;
    }

    hasCalculatedRef.current = true;
    setIsCalculating(true);

    try {
      const updated = await billService.calculateSummary(billId, {
        serviceCharge: bill.serviceCharge,
        tax: bill.tax,
        discount: bill.discount,
      });
      setBill(updated);
    } catch (err) {
      setActionError(
        err instanceof ApiError
          ? err.message
          : isTh
            ? "ไม่สามารถคำนวณสรุปยอดบิลได้"
            : "Unable to calculate the bill summary.",
      );
    } finally {
      setIsCalculating(false);
    }
  }, [bill, billId, isTh, setBill]);

  React.useEffect(() => {
    void Promise.resolve().then(calculateSummary);
  }, [calculateSummary]);

  const handleConfirm = async () => {
    setActionError(null);
    setIsConfirming(true);
    try {
      await billService.confirmBill(billId);
      router.push(billRoutes.detail(billId));
    } catch (err) {
      setActionError(
        err instanceof ApiError
          ? err.message
          : isTh
            ? "ไม่สามารถยืนยันสร้างบิลได้"
            : "Unable to confirm the bill.",
      );
    } finally {
      setIsConfirming(false);
    }
  };

  const summaryAccentsMap = React.useMemo(() => {
    if (!bill) return new Map<string, MemberIdentityAccent>();
    return resolveRoomMemberAccents(bill.members);
  }, [bill]);

  if (isLoading && !bill) {
    return (
      <div className="flex min-h-dvh items-center justify-center py-20 bg-background text-text-primary">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !bill) {
    return (
      <main className="min-h-dvh flex items-center justify-center p-4 bg-background text-text-primary">
        <Card variant="outline" className="max-w-md w-full p-6 text-center space-y-4">
          <Alert variant="error">
            <AlertDescription>{error ?? (isTh ? "ไม่พบบิลที่ต้องการ" : "Bill not found.")}</AlertDescription>
          </Alert>
          <Button variant="outline" onClick={() => router.push(ROUTES.HOME)}>
            {isTh ? "กลับหน้าหลัก" : "Return to Home"}
          </Button>
        </Card>
      </main>
    );
  }

  const breakdown = memberBreakdown(bill);
  const hasAdjustments =
    bill.serviceCharge > 0 || bill.tax > 0 || bill.discount > 0;
  const missingPaymentAccount = bill.isCreator && !bill.paymentAccount;
  const hostMember =
    bill.members.find((m) => m.role === "HOST") ?? bill.members[0];
  const hostName = hostMember?.displayName ?? "Host";
  const paymentAccountLabel = bill.paymentAccount
    ? `${bill.paymentAccount.promptPayId}${
        bill.paymentAccount.accountName
          ? ` (${bill.paymentAccount.accountName})`
          : ""
      }`
    : "";

  return (
    <div className="relative min-h-dvh bg-background text-text-primary selection:bg-brand-primary selection:text-white flex flex-col">
      {/* Warm Atmosphere Hero Background Layer */}
      <AtmosphereBackground variant="hero" height="hero" className="-top-0" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto w-full max-w-md px-3.5 pb-28 pt-3 sm:px-6 sm:pb-32 sm:pt-5 md:max-w-3xl lg:max-w-5xl flex-1 flex flex-col">
        {/* Navigation & Step Indicator Row */}
        <div className="mb-2 flex items-center justify-between">
          <Link
            href={`/bills/${billId}/split`}
            className="inline-flex items-center gap-1 text-xs font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] hover:text-white/80 transition-colors cursor-pointer"
          >
            <ChevronLeft className="size-4 stroke-[2.5]" />
            <span>{isTh ? "ย้อนกลับไปแบ่งค่าอาหาร" : "Back to Split"}</span>
          </Link>
          <span className="text-[11px] font-extrabold text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
            {t.stepIndicator}
          </span>
        </div>

        {/* Singular Hero Header with High-Contrast White Text */}
        <div className="mb-4 text-center sm:mb-6">
          <h1 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] sm:text-3xl md:text-4xl">
            {t.title}
          </h1>
          <p className="mx-auto mt-1 max-w-sm text-xs font-semibold leading-relaxed text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] sm:text-sm md:max-w-md">
            {t.subtitle(
              bill.meal.restaurantName ?? bill.meal.name,
              bill.members.length,
            )}
          </p>
          <p className="mx-auto mt-1 max-w-md text-[11px] sm:text-xs text-white/95 font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
            {t.helper}
          </p>
        </div>

        {/* Action Error Banner */}
        {actionError && (
          <div className="mb-4 rounded-2xl border border-status-danger-border bg-status-danger-bg p-3.5 text-xs text-status-danger-text flex items-center justify-between shadow-xs">
            <span>{actionError}</span>
            <button
              type="button"
              onClick={() => setActionError(null)}
              className="text-status-danger-text hover:opacity-75 cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>
        )}

        {/* Calculating Summary Status */}
        {isCalculating && (
          <div
            className="mb-4 flex items-center justify-center gap-2 rounded-2xl border border-border/80 bg-surface-subtle px-4 py-3 text-sm text-text-secondary"
            role="status"
            aria-live="polite"
            aria-busy="true"
          >
            <Spinner size="sm" />
            <span>
              {isTh ? "กำลังคำนวณสรุปยอด..." : "Calculating bill summary..."}
            </span>
          </div>
        )}

        {/* Member Read-Only Notice: Opaque Rice Tactile Card */}
        {!bill.isCreator && (
          <div className="mb-4 rounded-3xl border-2 border-border/90 bg-surface p-4 sm:p-5 shadow-md flex items-start gap-3.5">
            <div className="size-10 rounded-2xl bg-surface-subtle border border-border-subtle flex items-center justify-center text-text-primary shrink-0 shadow-2xs">
              <Users className="size-5 text-brand-primary" />
            </div>
            <div className="text-xs space-y-1">
              <p className="font-extrabold text-sm text-text-primary">
                {t.memberNoticeTitle}
              </p>
              <p className="leading-relaxed text-text-secondary font-medium">
                {t.memberNoticeDesc(hostName)}
              </p>
            </div>
          </div>
        )}

        {/* Main Responsive Grid: 2-Column on Desktop / Stacked on Mobile */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6 items-start">
          {/* LEFT COLUMN (Desktop col-span-7): MEMBER BREAKDOWN */}
          <div className="lg:col-span-7 space-y-3.5">
            <Card
              variant="outline"
              className="rounded-3xl border-2 border-[#E8E2D9] bg-white p-4 sm:p-5 shadow-md space-y-3.5 text-[#211D19]"
            >
              <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-3">
                <div className="flex items-center gap-2">
                  <Users className="size-4 text-brand-primary" />
                  <h2 className="text-sm sm:text-base font-extrabold tracking-tight text-[#211D19]">
                    {t.memberBreakdownTitle}
                  </h2>
                </div>
                <span className="rounded-full bg-[#FAF8F5] border border-[#E8E2D9] px-2.5 py-0.5 text-xs font-bold text-[#665E55]">
                  {breakdown.length} {isTh ? "คน" : "members"}
                </span>
              </div>

              {/* Calm Estimate Disclaimer Banner when Adjustments exist */}
              {hasAdjustments && (
                <div className="rounded-2xl border border-[#E8E2D9] bg-[#FAF8F5] p-3 text-xs text-[#665E55] flex items-start gap-2.5">
                  <Info className="size-4 text-[#665E55] shrink-0 mt-0.5" />
                  <p className="leading-relaxed font-medium">
                    {t.estimateDisclaimer}
                  </p>
                </div>
              )}

              {/* Member Breakdown List with Pure White Cards + 4px Left Rail */}
              <div className="space-y-2.5">
                {breakdown.map(({ member, itemsSubtotal, estimatedTotal }) => {
                  const accent =
                    summaryAccentsMap.get(member.userId) ??
                    MEMBER_IDENTITY_PALETTE_15[0];

                  return (
                    <div
                      key={member.userId}
                      className="relative rounded-2xl border-2 border-[#E8E2D9] bg-white p-3.5 sm:p-4 flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition-all overflow-hidden text-[#211D19]"
                    >
                      {/* 4px Left Member Identity Rail */}
                      <div
                        className={cn(
                          "absolute left-0 top-0 bottom-0 w-[4px]",
                          accent.railClass,
                        )}
                      />

                      <div className="flex items-center gap-3 min-w-0 pl-1.5">
                        <SummaryIdentityAvatar
                          name={member.displayName}
                          photo={member.avatarUrl}
                          accent={accent}
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-extrabold text-[#211D19] truncate">
                              {member.displayName}
                            </p>
                            {member.role === "HOST" && (
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
                            {hasAdjustments ? (
                              <p className="text-xs text-[#665E55] font-medium">
                                {t.itemSubtotalLabel}:{" "}
                                <span className="font-semibold text-[#211D19]">
                                  {formatMoney(itemsSubtotal)}
                                </span>
                              </p>
                            ) : (
                              <p className="text-xs text-[#665E55] font-medium">
                                {accent.nameTh} ({accent.nameEn})
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-bold text-[#665E55] block">
                          {hasAdjustments
                            ? t.estimatedTotalLabel
                            : t.finalTotalLabel}
                        </span>
                        <span className="text-base sm:text-lg font-black text-[#211D19]">
                          {formatMoney(estimatedTotal)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* RIGHT COLUMN (Desktop col-span-5): BILL TOTALS & PAYMENT ACTION */}
          <div className="lg:col-span-5 space-y-4">
            {/* Bill Totals Card */}
            <Card
              variant="outline"
              className="rounded-3xl border-2 border-border/90 bg-surface p-4 sm:p-5 shadow-md space-y-3.5"
            >
              <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                <FileText className="size-4 text-brand-primary" />
                <h2 className="text-sm sm:text-base font-extrabold tracking-tight text-text-primary">
                  {t.billTotalsTitle}
                </h2>
              </div>

              <div className="space-y-2 text-xs sm:text-sm font-medium">
                <div className="flex justify-between text-text-secondary">
                  <span>{t.subtotalLabel}</span>
                  <span className="font-bold text-text-primary">
                    {formatMoney(bill.subtotal)}
                  </span>
                </div>

                {bill.serviceCharge > 0 && (
                  <div className="flex justify-between text-text-secondary">
                    <span>{t.serviceChargeLabel}</span>
                    <span className="font-bold text-text-primary">
                      +{formatMoney(bill.serviceCharge)}
                    </span>
                  </div>
                )}

                {bill.tax > 0 && (
                  <div className="flex justify-between text-text-secondary">
                    <span>{t.taxLabel}</span>
                    <span className="font-bold text-text-primary">
                      +{formatMoney(bill.tax)}
                    </span>
                  </div>
                )}

                {bill.discount > 0 && (
                  <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-bold">
                    <span>{t.discountLabel}</span>
                    <span>-{formatMoney(bill.discount)}</span>
                  </div>
                )}

                {/* Grand Total Row */}
                <div className="border-t-2 border-border/80 pt-3 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs sm:text-sm font-black text-text-primary uppercase tracking-wider block">
                      {t.grandTotalLabel}
                    </span>
                    <span className="text-[11px] text-text-secondary font-medium">
                      {isTh ? "ยอดรวมทั้งบิล" : "Authoritative total"}
                    </span>
                  </div>
                  <span className="text-xl sm:text-2xl font-black text-text-primary drop-shadow-2xs">
                    {formatMoney(bill.totalAmount)}
                  </span>
                </div>
              </div>
            </Card>

            {/* Payment Readiness Cue (Host View Only) */}
            {bill.isCreator && (
              <>
                {missingPaymentAccount ? (
                  /* Saffron Warning Banner for Missing PromptPay */
                  <div className="rounded-2xl border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/90 p-4 text-xs shadow-sm space-y-2.5">
                    <div className="flex items-start gap-2.5 text-amber-950 dark:text-amber-100">
                      <AlertTriangle className="size-5 shrink-0 text-amber-700 dark:text-amber-400 mt-0.5" />
                      <div className="space-y-0.5">
                        <p className="font-extrabold text-sm">
                          {t.promptPayMissingTitle}
                        </p>
                        <p className="leading-relaxed text-amber-900 dark:text-amber-200 font-medium">
                          {t.promptPayMissingDesc}
                        </p>
                      </div>
                    </div>

                    <Link
                      href={`${ROUTES.BILL_PAYMENT_ACCOUNT}?next=${encodeURIComponent(
                        billRoutes.summary(billId),
                      )}`}
                      className="w-full h-9 rounded-xl border-2 border-[#F2AF32] bg-[#FFF7DF] text-[#5A260C] font-extrabold text-xs shadow-2xs transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer hover:border-[#D98E12] hover:bg-[#F2AF32] hover:text-[#211D19] active:border-[#B5750A] active:bg-[#D98E12] active:text-[#211D19] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                    >
                      <QrCode className="size-3.5 mr-1" />
                      <span>{t.setupNowButton}</span>
                    </Link>
                  </div>
                ) : (
                  /* Herb Readiness Pill for Configured PromptPay */
                  <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50 dark:bg-emerald-950/90 p-3.5 text-xs text-emerald-950 dark:text-emerald-100 shadow-2xs flex items-center gap-2.5 font-bold">
                    <CheckCircle2 className="size-5 shrink-0 text-emerald-700 dark:text-emerald-400" />
                    <span>{t.promptPayReady(paymentAccountLabel)}</span>
                  </div>
                )}

                {/* Primary Confirm CTA Button */}
                <div className="pt-1 text-center space-y-2">
                  <Button
                    size="lg"
                    loading={isConfirming}
                    disabled={
                      isCalculating ||
                      !bill.summaryCalculated ||
                      missingPaymentAccount
                    }
                    onClick={handleConfirm}
                    className={cn(
                      "w-full h-12 rounded-2xl text-base font-extrabold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer",
                      !missingPaymentAccount
                        ? "bg-brand-primary hover:bg-brand-primary-hover text-white shadow-md active:scale-[0.99]"
                        : "bg-surface-muted text-text-secondary/60 border border-border cursor-not-allowed opacity-85",
                    )}
                  >
                    <span>{t.confirmButton}</span>
                    <ArrowRight className="size-5 stroke-[2.5]" />
                  </Button>

                  <p className="text-xs text-text-secondary font-medium">
                    {t.confirmHelper}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
