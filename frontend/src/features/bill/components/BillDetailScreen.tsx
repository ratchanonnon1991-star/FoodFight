"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, CheckCircle2, FileText, Info, Users, X } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { AtmosphereBackground } from "@/components/ui/AtmosphereBackground";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { cn } from "@/lib/utils/cn";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import { ApiError } from "@/lib/api/client";
import {
  resolveRoomMemberAccents,
  MEMBER_IDENTITY_PALETTE_15,
  type MemberIdentityAccent,
} from "@/lib/member-identity/member-identity";
import { useLanguage } from "@/i18n/LanguageProvider";
import { billTranslations } from "../i18n/bill-translations";
import { useBill } from "../hooks/use-bill";
import { useCurrentUser } from "../hooks/use-current-user";
import { billService } from "../services/bill-service";
import { PaymentRow } from "./PaymentRow";

export interface BillDetailScreenProps {
  billId: string;
}

function formatMoney(amount: number): string {
  return `฿${new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`;
}

export function BillDetailScreen({ billId }: BillDetailScreenProps) {
  const { locale } = useLanguage();
  const isTh = locale === "th";
  const t = billTranslations[locale].detail;
  const { bill, isLoading, error, setBill } = useBill(billId);
  const { user } = useCurrentUser();
  const [isClosing, setIsClosing] = React.useState(false);
  const [closeError, setCloseError] = React.useState<string | null>(null);

  const handleCloseBill = async () => {
    setCloseError(null);
    setIsClosing(true);
    try {
      const updated = await billService.closeBill(billId);
      setBill(updated);
    } catch (err) {
      setCloseError(
        err instanceof ApiError
          ? err.message
          : isTh
            ? "ไม่สามารถปิดบิลได้"
            : "Unable to close the bill.",
      );
    } finally {
      setIsClosing(false);
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
          <Link href={ROUTES.BILLS} className={cn(buttonVariants({ size: "md" }))}>
            {t.backToBills}
          </Link>
        </Card>
      </main>
    );
  }

  const isCancelled =
    bill.status === "CANCELLED" || bill.roomStatus === "CANCELLED";

  if (isCancelled) {
    return (
      <div className="relative min-h-dvh bg-background text-text-primary flex flex-col">
        <AtmosphereBackground variant="hero" height="hero" className="-top-0" />
        <div className="relative z-10 mx-auto w-full max-w-md px-3.5 py-6 sm:px-6 md:max-w-3xl flex-1 flex flex-col justify-center">
          <Card variant="outline" className="rounded-3xl border-2 border-border/90 bg-surface p-6 text-center space-y-4 shadow-md">
            <p className="text-sm font-bold text-text-primary">
              {t.cancelledNotice}
            </p>
            <Link
              href={ROUTES.BILLS}
              className={cn(buttonVariants({ size: "md" }), "rounded-2xl bg-brand-primary text-white font-extrabold")}
            >
              {t.backToBills}
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  if (bill.status !== "COMPLETED" && bill.status !== "CLOSED") {
    const resumeHref =
      bill.items.length === 0
        ? `/bills/${billId}/receipt`
        : bill.items.some((item) => item.assignedUserIds.length === 0)
          ? `/bills/${billId}/split`
          : `/bills/${billId}/summary`;

    return (
      <div className="relative min-h-dvh bg-background text-text-primary flex flex-col">
        <AtmosphereBackground variant="hero" height="hero" className="-top-0" />
        <div className="relative z-10 mx-auto w-full max-w-md px-3.5 py-6 sm:px-6 md:max-w-3xl flex-1 flex flex-col justify-center">
          <Card variant="outline" className="rounded-3xl border-2 border-border/90 bg-surface p-6 text-center space-y-4 shadow-md">
            <p className="text-base font-extrabold text-text-primary">
              {t.notFinalizedTitle}
            </p>
            <Link
              href={resumeHref}
              className={cn(buttonVariants({ size: "lg" }), "rounded-2xl bg-brand-primary text-white font-extrabold")}
            >
              {t.continueSetup}
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  const hostMember =
    bill.members.find((m) => m.role === "HOST") ?? bill.members[0];

  return (
    <div className="relative min-h-dvh bg-background text-text-primary selection:bg-brand-primary selection:text-white flex flex-col">
      {/* Warm Atmosphere Hero Background Layer */}
      <AtmosphereBackground variant="hero" height="hero" className="-top-0" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto w-full max-w-md px-3.5 pb-28 pt-3 sm:px-6 sm:pb-32 sm:pt-5 md:max-w-3xl lg:max-w-4xl flex-1 flex flex-col">
        {/* Navigation Row */}
        <div className="mb-2 flex items-center justify-between">
          <Link
            href={ROUTES.BILLS}
            className="inline-flex items-center gap-1 text-xs font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] hover:text-white/80 transition-colors cursor-pointer"
          >
            <ChevronLeft className="size-4 stroke-[2.5]" />
            <span>{t.backToBills}</span>
          </Link>
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
        </div>

        {/* Closed notice banner */}
        {bill.status === "CLOSED" && (
          <div className="mb-4 rounded-2xl border border-blue-300 bg-blue-50 dark:bg-blue-950/90 p-4 text-xs text-blue-950 dark:text-blue-100 flex items-start gap-2.5 shadow-sm">
            <Info className="size-4 shrink-0 text-blue-600 mt-0.5" />
            <p className="leading-relaxed font-medium">
              {t.closedNotice(
                bill.closedAt
                  ? new Date(bill.closedAt).toLocaleDateString()
                  : "",
              )}
            </p>
          </div>
        )}

        {/* Host All-Paid & Close Bill Action */}
        {bill.isCreator &&
          bill.status === "COMPLETED" &&
          bill.progress.remaining === 0 && (
            <div className="mb-4 rounded-2xl border-2 border-emerald-400 bg-emerald-50 dark:bg-emerald-950/90 p-4 text-xs shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-emerald-950 dark:text-emerald-100 font-extrabold">
                <CheckCircle2 className="size-4 text-emerald-700 dark:text-emerald-400" />
                <span>{t.allPaidNotice}</span>
              </div>
              {closeError && (
                <p className="text-status-danger-text text-xs">{closeError}</p>
              )}
              <Button
                size="sm"
                loading={isClosing}
                onClick={handleCloseBill}
                className="w-full sm:w-auto rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold"
              >
                {t.closeBill}
              </Button>
            </div>
          )}

        <div className="space-y-4 sm:space-y-6">
          {/* Bill Total & Progress Card */}
          <Card
            variant="outline"
            className="rounded-3xl border-2 border-border/90 bg-surface p-4 sm:p-5 shadow-md space-y-3.5"
          >
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="size-4 text-brand-primary" />
                <span className="text-xs sm:text-sm font-bold text-text-secondary">
                  {t.totalLabel}
                </span>
              </div>
              <span className="text-xl sm:text-2xl font-black text-text-primary drop-shadow-2xs">
                {formatMoney(bill.totalAmount)}
              </span>
            </div>

            {/* Collection Progress Bar */}
            <div className="space-y-2">
              <div className="h-2.5 w-full rounded-full bg-[#E8E2D9] dark:bg-surface-subtle overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all rounded-full"
                  style={{
                    width:
                      bill.totalAmount > 0
                        ? `${Math.min(
                            (bill.progress.collected / bill.totalAmount) * 100,
                            100,
                          )}%`
                        : "0%",
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-text-secondary">
                  {t.progressPaid(
                    bill.progress.paidCount,
                    bill.progress.totalCount,
                  )}
                </span>
                <Badge
                  variant={
                    bill.progress.remaining === 0 ? "success" : "warning"
                  }
                >
                  {bill.progress.remaining === 0
                    ? t.fullyCollected
                    : t.remainingAmount(bill.progress.remaining)}
                </Badge>
              </div>
            </div>

            {/* PromptPay Instruction Cue */}
            {bill.paymentAccount && (
              <div className="pt-2 border-t border-border/60 text-xs text-text-secondary font-medium">
                {t.paymentInstructions(
                  bill.createdBy.displayName,
                  bill.paymentAccount.accountName,
                  bill.paymentAccount.promptPayId,
                )}
              </div>
            )}
          </Card>

          {/* Payment Status Card */}
          <Card
            variant="outline"
            className="rounded-3xl border-2 border-border/90 bg-surface p-4 sm:p-5 shadow-md space-y-3.5"
          >
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <Users className="size-4 text-brand-primary" />
                <h2 className="text-sm sm:text-base font-extrabold tracking-tight text-text-primary">
                  {t.paymentStatusTitle}
                </h2>
              </div>
              <span className="rounded-full bg-[#FAF8F5] border border-[#E8E2D9] px-2.5 py-0.5 text-xs font-bold text-[#665E55]">
                {bill.payments.length} {isTh ? "คน" : "members"}
              </span>
            </div>

            {/* Pure White Payment Rows with Canonical Member Identity */}
            <div className="space-y-2.5">
              {bill.payments.map((payment) => {
                const accent =
                  summaryAccentsMap.get(payment.userId) ??
                  MEMBER_IDENTITY_PALETTE_15[0];

                return (
                  <PaymentRow
                    key={payment.userId}
                    billId={billId}
                    payment={payment}
                    accent={accent}
                    isHostMember={payment.userId === hostMember?.userId}
                    isCreator={bill.isCreator}
                    isSelf={user?.sub === payment.userId}
                    locked={bill.status === "CLOSED"}
                    onChange={setBill}
                  />
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
