"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES, billRoutes } from "@/config/routes";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Avatar } from "@/components/ui/Avatar";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Spinner } from "@/components/ui/Spinner";
import { Separator } from "@/components/ui/Separator";
import { ApiError } from "@/lib/api/client";
import { BillPageHeader } from "./BillPageHeader";
import { useBill } from "../hooks/use-bill";
import { billService } from "../services/bill-service";
import type { BillDetail } from "../types/bill-types";

export interface SummaryStepScreenProps {
  billId: string;
}

function memberBreakdown(bill: BillDetail) {
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

  return bill.members
    .map((member) => {
      const itemsSubtotal = totals.get(member.userId) ?? 0;
      const shareOfExtra =
        bill.subtotal > 0 ? (itemsSubtotal / bill.subtotal) * extraCharges : 0;
      return {
        member,
        itemsSubtotal,
        total: itemsSubtotal + shareOfExtra,
      };
    })
    .filter((entry) => entry.itemsSubtotal > 0);
}

export function SummaryStepScreen({ billId }: SummaryStepScreenProps) {
  const router = useRouter();
  const { bill, isLoading, error, setBill } = useBill(billId);
  const [serviceCharge, setServiceCharge] = React.useState("0");
  const [tax, setTax] = React.useState("0");
  const [discount, setDiscount] = React.useState("0");
  const [actionError, setActionError] = React.useState<string | null>(null);
  const [isCalculating, setIsCalculating] = React.useState(false);
  const [isConfirming, setIsConfirming] = React.useState(false);

  React.useEffect(() => {
    if (bill) {
      setServiceCharge(String(bill.serviceCharge));
      setTax(String(bill.tax));
      setDiscount(String(bill.discount));
    }
  }, [bill]);

  const handleCalculate = async () => {
    setActionError(null);
    setIsCalculating(true);
    try {
      const updated = await billService.calculateSummary(billId, {
        serviceCharge: Number(serviceCharge) || 0,
        tax: Number(tax) || 0,
        discount: Number(discount) || 0,
      });
      setBill(updated);
    } catch (err) {
      setActionError(
        err instanceof ApiError ? err.message : "Unable to calculate the bill.",
      );
    } finally {
      setIsCalculating(false);
    }
  };

  const handleConfirm = async () => {
    setActionError(null);
    setIsConfirming(true);
    try {
      await billService.confirmBill(billId);
      router.push(billRoutes.detail(billId));
    } catch (err) {
      setActionError(
        err instanceof ApiError ? err.message : "Unable to confirm the bill.",
      );
    } finally {
      setIsConfirming(false);
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

  const breakdown = memberBreakdown(bill);
  const missingPaymentAccount = bill.isCreator && !bill.paymentAccount;

  return (
    <div className="min-h-dvh flex flex-col bg-background text-text-primary">
      <BillPageHeader
        title="Review & Confirm"
        subtitle={bill.meal.name}
        backHref={`/bills/${billId}/split`}
      />

      <main className="flex-1 py-6 pb-24">
        <PageContainer maxWidth="auth" paddingY="none" className="space-y-6">
          {actionError && (
            <Alert variant="error" onClose={() => setActionError(null)}>
              <AlertDescription>{actionError}</AlertDescription>
            </Alert>
          )}

          {bill.isCreator && (
            <Card variant="default" padding="md" className="space-y-3">
              <p className="text-sm font-semibold text-text-primary">
                Additional charges
              </p>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <Label size="sm">Service charge</Label>
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    value={serviceCharge}
                    onChange={(e) => setServiceCharge(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label size="sm">Tax</Label>
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    value={tax}
                    onChange={(e) => setTax(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label size="sm">Discount</Label>
                  <Input
                    type="number"
                    min={0}
                    step="0.01"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </div>
              </div>
              <Button
                variant="outline"
                fullWidth
                loading={isCalculating}
                onClick={handleCalculate}
              >
                Calculate
              </Button>
            </Card>
          )}

          <Card variant="default" padding="md" className="space-y-3">
            <p className="text-sm font-semibold text-text-primary">
              Split Summary
            </p>
            <div className="space-y-2">
              {breakdown.map(({ member, total }) => (
                <div
                  key={member.userId}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Avatar size="sm" name={member.displayName} src={member.avatarUrl} />
                    <span className="text-sm text-text-primary truncate">
                      {member.displayName}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-text-primary shrink-0">
                    ฿{total.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-text-secondary">
                <span>Subtotal</span>
                <span>฿{bill.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Service charge + Tax</span>
                <span>฿{(bill.serviceCharge + bill.tax).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Discount</span>
                <span>-฿{bill.discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-text-primary pt-1">
                <span>Grand Total</span>
                <span>฿{bill.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </Card>

          {missingPaymentAccount && (
            <Alert variant="warning">
              <AlertDescription>
                Set up your PromptPay account before confirming so members can
                pay you.{" "}
                <Link
                  href={`${ROUTES.BILL_PAYMENT_ACCOUNT}?next=${encodeURIComponent(
                    billRoutes.summary(billId),
                  )}`}
                  className="font-semibold underline"
                >
                  Set up now
                </Link>
              </AlertDescription>
            </Alert>
          )}

          {bill.isCreator && (
            <Button
              fullWidth
              size="lg"
              loading={isConfirming}
              disabled={!bill.summaryCalculated || missingPaymentAccount}
              onClick={handleConfirm}
            >
              Confirm & Create Bill
            </Button>
          )}
        </PageContainer>
      </main>
    </div>
  );
}
