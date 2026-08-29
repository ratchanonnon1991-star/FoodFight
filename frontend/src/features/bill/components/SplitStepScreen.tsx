"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Users } from "lucide-react";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Spinner } from "@/components/ui/Spinner";
import { ApiError } from "@/lib/api/client";
import { useLanguage } from "@/i18n/LanguageProvider";
import { billTranslations } from "../i18n/bill-translations";
import { BillPageHeader } from "./BillPageHeader";
import { ItemAssignmentRow } from "./ItemAssignmentRow";
import { useBill } from "../hooks/use-bill";
import { billService } from "../services/bill-service";

export interface SplitStepScreenProps {
  billId: string;
}

export function SplitStepScreen({ billId }: SplitStepScreenProps) {
  const router = useRouter();
  const { locale } = useLanguage();
  const t = billTranslations[locale];
  const { bill, isLoading, error, setBill } = useBill(billId);
  const [actionError, setActionError] = React.useState<string | null>(null);
  const [savingItemId, setSavingItemId] = React.useState<string | null>(null);
  const [isSplittingEvenly, setIsSplittingEvenly] = React.useState(false);

  const handleSplitEvenly = async () => {
    setActionError(null);
    setIsSplittingEvenly(true);
    try {
      const updated = await billService.splitEvenly(billId);
      setBill(updated);
    } catch (err) {
      setActionError(
        err instanceof ApiError ? err.message : "Unable to split the bill evenly.",
      );
    } finally {
      setIsSplittingEvenly(false);
    }
  };

  const saveAssignment = async (itemId: string, nextUserIds: string[]) => {
    setActionError(null);
    setSavingItemId(itemId);
    try {
      const updated = await billService.assignItem(billId, itemId, nextUserIds);
      setBill(updated);
    } catch (err) {
      setActionError(
        err instanceof ApiError ? err.message : "Unable to update assignment.",
      );
    } finally {
      setSavingItemId(null);
    }
  };

  const handleToggle = (itemId: string, userId: string) => {
    const item = bill?.items.find((existing) => existing.id === itemId);
    if (!item) {
      return;
    }

    const nextUserIds = item.assignedUserIds.includes(userId)
      ? item.assignedUserIds.filter((id) => id !== userId)
      : [...item.assignedUserIds, userId];

    void saveAssignment(itemId, nextUserIds);
  };

  const handleToggleAll = (itemId: string) => {
    const item = bill?.items.find((existing) => existing.id === itemId);
    if (!bill || !item) {
      return;
    }

    const allSelected = bill.members.every((member) =>
      item.assignedUserIds.includes(member.userId),
    );
    const nextUserIds = allSelected
      ? []
      : bill.members.map((member) => member.userId);

    void saveAssignment(itemId, nextUserIds);
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

  const unassignedCount = bill.items.filter(
    (item) => item.assignedUserIds.length === 0,
  ).length;
  const allAssigned = bill.items.length > 0 && unassignedCount === 0;

  return (
    <div className="min-h-dvh flex flex-col bg-background text-text-primary">
      <BillPageHeader
        title="Split Bill"
        subtitle={bill.meal.name}
        backHref={`/bills/${billId}/receipt`}
      />

      <main className="flex-1 py-6 pb-24">
        <PageContainer maxWidth="auth" paddingY="none" className="space-y-6">
          {actionError && (
            <Alert variant="error" onClose={() => setActionError(null)}>
              <AlertDescription>{actionError}</AlertDescription>
            </Alert>
          )}

          {!bill.isCreator && (
            <Alert variant="info">
              <AlertDescription>
                Only {bill.createdBy.displayName} can assign items right now.
              </AlertDescription>
            </Alert>
          )}

          <p className="text-sm text-text-secondary">
            Tap each member to mark who shared an item. Items are split
            evenly among everyone selected.
          </p>

          {bill.isCreator && (
            <Button
              variant="outline"
              fullWidth
              leftIcon={<Users className="size-4" />}
              loading={isSplittingEvenly}
              onClick={handleSplitEvenly}
            >
              Split Everything Equally
            </Button>
          )}

          <Card variant="default" padding="md">
            <div className="divide-y divide-border">
              {bill.items.map((item) => (
                <div key={item.id} className="relative">
                  <ItemAssignmentRow
                    item={item}
                    members={bill.members}
                    disabled={!bill.isCreator || savingItemId === item.id}
                    onToggle={(userId) => handleToggle(item.id, userId)}
                    onToggleAll={() => handleToggleAll(item.id)}
                  />
                  {savingItemId === item.id && (
                    <div className="absolute right-0 top-3">
                      <Spinner size="sm" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>

          <Alert variant={allAssigned ? "success" : "warning"}>
            {allAssigned ? <CheckCircle2 className="size-4" /> : undefined}
            <AlertDescription>
              {allAssigned
                ? "All items have been assigned. Ready to calculate the split."
                : `${unassignedCount} item(s) still need someone assigned.`}
            </AlertDescription>
          </Alert>

          {bill.isCreator && (
            <Button
              fullWidth
              size="lg"
              disabled={!allAssigned}
              onClick={() => router.push(`/bills/${billId}/summary`)}
            >
              Calculate Split
            </Button>
          )}
        </PageContainer>
      </main>
    </div>
  );
}
