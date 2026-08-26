"use client";

import Link from "next/link";
import { AlertCircle, ChevronRight, Clock3, ReceiptText } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";
import type { PendingBill, PendingBillNextStep } from "../types/bill-types";

export interface PendingBillsSectionProps {
  bills: readonly PendingBill[];
  isLoading?: boolean;
  error?: string | null;
  onRetry?: () => void;
  variant?: "home" | "bills";
}

export function PendingBillsSection({
  bills,
  isLoading = false,
  error = null,
  onRetry,
  variant = "bills",
}: PendingBillsSectionProps) {
  if (!isLoading && !error && bills.length === 0) {
    return null;
  }

  const isHomeVariant = variant === "home";

  return (
    <section
      aria-labelledby="pending-bills-heading"
      className={cn("space-y-2.5", isHomeVariant && "animate-fade-in")}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={cn(
              "flex size-8 shrink-0 items-center justify-center rounded-xl",
              isHomeVariant
                ? "bg-brand-primary text-white shadow-sm"
                : "bg-surface-subtle text-brand-primary",
            )}
          >
            <Clock3 className="size-4" aria-hidden="true" />
          </span>
          <h2
            id="pending-bills-heading"
            className="truncate text-sm font-bold tracking-tight text-text-primary sm:text-base"
          >
            Unfinished bills
          </h2>
        </div>
        {bills.length > 0 ? (
          <span className="shrink-0 rounded-full bg-status-warning-bg px-2.5 py-1 text-xs font-bold text-status-warning-text">
            {bills.length} pending
          </span>
        ) : null}
      </div>

      {isLoading ? (
        <Card variant="subtle" padding="md" className="space-y-3">
          <div className="h-4 w-2/5 animate-pulse rounded bg-surface-subtle" />
          <div className="h-3 w-3/5 animate-pulse rounded bg-surface-subtle" />
          <div className="h-10 w-full animate-pulse rounded-xl bg-surface-subtle" />
        </Card>
      ) : error ? (
        <Alert variant="warning">
          <AlertCircle className="size-4" />
          <AlertDescription className="flex flex-wrap items-center gap-2">
            <span>{error}</span>
            {onRetry ? (
              <Button type="button" size="sm" variant="outline" onClick={onRetry}>
                Try again
              </Button>
            ) : null}
          </AlertDescription>
        </Alert>
      ) : (
        <div
          className={cn(
            "space-y-3",
            isHomeVariant &&
              "rounded-2xl border border-brand-primary/25 bg-brand-primary/5 p-3 sm:p-4",
          )}
        >
          {bills.map((bill) => (
            <PendingBillCard key={bill.id} bill={bill} compact={isHomeVariant} />
          ))}
        </div>
      )}
    </section>
  );
}

function PendingBillCard({
  bill,
  compact,
}: {
  bill: PendingBill;
  compact: boolean;
}) {
  const status = getStatusPresentation(bill.nextStep);

  return (
    <Card
      variant="default"
      padding="md"
      className={cn(
        "space-y-3 transition-shadow hover:shadow-sm",
        compact && "border-brand-primary/20 bg-surface",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-surface-subtle text-brand-primary">
          <ReceiptText className="size-5" aria-hidden="true" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-sm font-bold text-text-primary">
              {bill.title}
            </h3>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[0.65rem] font-bold",
                status.className,
              )}
            >
              {status.label}
            </span>
          </div>
          <p className="mt-1 truncate text-xs text-text-secondary">
            {bill.restaurantName ?? "Restaurant not selected"}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-text-secondary">
        <span>{bill.itemCount} {bill.itemCount === 1 ? "item" : "items"}</span>
        <span className="text-border-disabled">•</span>
        <span>{getProgressText(bill)}</span>
      </div>

      <Link
        href={bill.continueHref}
        className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-brand-primary px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary"
      >
        Continue
        <ChevronRight className="size-4" aria-hidden="true" />
      </Link>
    </Card>
  );
}

function getStatusPresentation(nextStep: PendingBillNextStep) {
  switch (nextStep) {
    case "RECEIPT":
      return {
        label: "Needs receipt",
        className: "bg-status-warning-bg text-status-warning-text",
      };
    case "SPLIT":
      return {
        label: "Needs assignment",
        className: "bg-status-warning-bg text-status-warning-text",
      };
    case "SUMMARY":
      return {
        label: "Ready to confirm",
        className: "bg-brand-primary/10 text-brand-primary",
      };
    case "PAYMENT":
      return {
        label: "Payment pending",
        className: "bg-status-info-bg text-status-info-text",
      };
  }
}

function getProgressText(bill: PendingBill) {
  if (bill.nextStep === "PAYMENT") {
    return `${bill.paymentProgress.paidCount}/${bill.paymentProgress.totalCount} paid`;
  }

  if (bill.nextStep === "RECEIPT") {
    return bill.receiptUploaded ? "Review receipt items" : "Add a receipt to continue";
  }

  if (bill.nextStep === "SPLIT") {
    return `${bill.unassignedItemCount} item(s) need assignment`;
  }

  return "All items assigned";
}
