"use client";

import * as React from "react";
import { QrCode, UploadCloud } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { ApiError, resolveMediaUrl } from "@/lib/api/client";
import { billService } from "../services/bill-service";
import type { BillDetail, BillPayment } from "../types/bill-types";

export interface PaymentRowProps {
  billId: string;
  payment: BillPayment;
  isCreator: boolean;
  isSelf: boolean;
  onChange: (updated: BillDetail) => void;
}

export function PaymentRow({
  billId,
  payment,
  isCreator,
  isSelf,
  onChange,
}: PaymentRowProps) {
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
    <div className="py-3 space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <Avatar size="sm" name={payment.displayName} src={payment.avatarUrl} />
          <div className="min-w-0">
            <p className="text-sm font-medium text-text-primary truncate">
              {payment.displayName}
              {isSelf && <span className="text-text-muted"> (You)</span>}
            </p>
            <p className="text-xs text-text-secondary">
              ฿{payment.amount.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Badge variant={payment.status === "PAID" ? "success" : "warning"}>
            {payment.status === "PAID" ? "Paid" : "Unpaid"}
          </Badge>

          {isCreator && (
            <Button
              size="sm"
              variant="outline"
              loading={isTogglingStatus}
              onClick={handleToggleStatus}
            >
              {payment.status === "PAID" ? "Mark Unpaid" : "Mark Paid"}
            </Button>
          )}
        </div>
      </div>

      {isSelf && payment.status === "UNPAID" && (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            leftIcon={<QrCode className="size-3.5" />}
            loading={isLoadingQr}
            onClick={handleToggleQr}
          >
            {showQr ? "Hide QR" : "Pay Now"}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<UploadCloud className="size-3.5" />}
            loading={isUploadingSlip}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Slip & Confirm
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

      {showQr && (
        <div className="flex flex-col items-center gap-2 rounded-md border border-border bg-surface-subtle p-4">
          {qrDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={qrDataUrl} alt="PromptPay QR code" className="size-48" />
          ) : (
            <Spinner />
          )}
          <p className="text-xs text-text-secondary">
            Scan with your banking app to pay ฿{payment.amount.toFixed(2)}
          </p>
        </div>
      )}

      {slipImageUrl && (
        <a
          href={slipImageUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-block text-xs font-medium text-brand-primary hover:underline"
        >
          View payment slip
        </a>
      )}

      {error && <p className="text-xs text-status-danger-text">{error}</p>}
    </div>
  );
}
