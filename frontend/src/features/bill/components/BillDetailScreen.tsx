"use client";

import * as React from "react";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { buttonVariants } from "@/components/ui/Button";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { cn } from "@/lib/utils/cn";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/Button";
import { ApiError } from "@/lib/api/client";
import { useLanguage } from "@/i18n/LanguageProvider";
import { billTranslations } from "../i18n/bill-translations";
import { useBill } from "../hooks/use-bill";
import { useCurrentUser } from "../hooks/use-current-user";
import { billService } from "../services/bill-service";
import { BillPageHeader } from "./BillPageHeader";
import { PaymentRow } from "./PaymentRow";

export interface BillDetailScreenProps {
  billId: string;
}

export function BillDetailScreen({ billId }: BillDetailScreenProps) {
  const { locale } = useLanguage();
  const t = billTranslations[locale];
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
      setCloseError(err instanceof ApiError ? err.message : "Unable to close the bill.");
    } finally {
      setIsClosing(false);
    }
  };

  if (isLoading && !bill) {
    return (
      <div className="flex-1 flex justify-center items-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !bill) {
    return (
      <main className="flex-1 py-8">
        <PageContainer maxWidth="auth" paddingY="none">
          <Alert variant="error">
            <AlertDescription>{error ?? "Bill not found."}</AlertDescription>
          </Alert>
        </PageContainer>
      </main>
    );
  }

  const isCancelled =
    bill.status === "CANCELLED" || bill.roomStatus === "CANCELLED";

  if (isCancelled) {
    return (
      <div className="min-h-dvh flex flex-col bg-transparent text-text-primary">
        <BillPageHeader
          title="Bill"
          subtitle={bill.meal.name}
          backHref={ROUTES.BILLS}
        />
        <main className="flex-1 py-8">
          <PageContainer maxWidth="auth" paddingY="none">
            <Alert variant="warning">
              <AlertDescription className="space-y-2">
                <p>This bill cannot be continued because its room was cancelled.</p>
                <Link
                  href={ROUTES.BILLS}
                  className={cn(buttonVariants({ size: "sm" }))}
                >
                  Back to Bills
                </Link>
              </AlertDescription>
            </Alert>
          </PageContainer>
        </main>
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
      <div className="min-h-dvh flex flex-col bg-transparent text-text-primary">
        <BillPageHeader title="Bill" subtitle={bill.meal.name} backHref={ROUTES.BILLS} />
        <main className="flex-1 py-8">
          <PageContainer maxWidth="auth" paddingY="none">
            <Card variant="subtle" padding="lg" className="text-center space-y-3">
              <p className="text-sm font-medium text-text-primary">
                This bill isn&apos;t finalized yet.
              </p>
              <Link href={resumeHref} className={cn(buttonVariants({ size: "md" }))}>
                Continue setting up the bill
              </Link>
            </Card>
          </PageContainer>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-dvh flex flex-col bg-transparent text-text-primary">
      <BillPageHeader title="Bill Detail" subtitle={bill.meal.name} backHref={ROUTES.BILLS} />


      <main className="flex-1 py-6 pb-24">
        <PageContainer maxWidth="auth" paddingY="none" className="space-y-6">
          {bill.status === "CLOSED" && (
            <Alert variant="info">
              <AlertDescription className="space-y-2">
                <p>
                  This bill was closed
                  {bill.closedAt
                    ? ` on ${new Date(bill.closedAt).toLocaleDateString()}`
                    : ""}
                  . No further changes can be made.
                </p>
                <Link
                  href={ROUTES.AUTHENTICATED_HOME}
                  className={cn(buttonVariants({ size: "sm" }))}
                >
                  Back to Home
                </Link>
              </AlertDescription>
            </Alert>
          )}

          {bill.isCreator &&
            bill.status === "COMPLETED" &&
            bill.progress.remaining === 0 && (
              <Alert variant="success">
                <AlertDescription className="space-y-2">
                  <p>Everyone has paid in full. You can close this bill now.</p>
                  {closeError && (
                    <p className="text-status-danger-text">{closeError}</p>
                  )}
                  <Button size="sm" loading={isClosing} onClick={handleCloseBill}>
                    Close Bill
                  </Button>
                </AlertDescription>
              </Alert>
            )}

          <Card variant="default" padding="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm text-text-secondary">Total</p>
              <p className="text-xl font-bold text-text-primary">
                ฿{bill.totalAmount.toFixed(2)}
              </p>
            </div>

            <div className="h-2 w-full rounded-full bg-surface-subtle overflow-hidden">
              <div
                className="h-full bg-brand-primary transition-all"
                style={{
                  width:
                    bill.totalAmount > 0
                      ? `${Math.min((bill.progress.collected / bill.totalAmount) * 100, 100)}%`
                      : "0%",
                }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span>
                {bill.progress.paidCount} / {bill.progress.totalCount} paid
              </span>
              <Badge variant={bill.progress.remaining === 0 ? "success" : "warning"}>
                {bill.progress.remaining === 0
                  ? "Fully collected"
                  : `฿${bill.progress.remaining.toFixed(2)} remaining`}
              </Badge>
            </div>

            {bill.paymentAccount && (
              <p className="text-xs text-text-muted">
                Pay {bill.createdBy.displayName} ({bill.paymentAccount.accountName})
                via PromptPay {bill.paymentAccount.promptPayId}
              </p>
            )}
          </Card>

          <Card variant="default" padding="md">
            <p className="text-sm font-semibold text-text-primary mb-2">
              Payment Status
            </p>
            <div className="divide-y divide-border">
              {bill.payments.map((payment) => (
                <PaymentRow
                  key={payment.userId}
                  billId={billId}
                  payment={payment}
                  isCreator={bill.isCreator}
                  isSelf={user?.sub === payment.userId}
                  locked={bill.status === "CLOSED"}
                  onChange={setBill}
                />
              ))}
            </div>
          </Card>
        </PageContainer>
      </main>
    </div>
  );
}
