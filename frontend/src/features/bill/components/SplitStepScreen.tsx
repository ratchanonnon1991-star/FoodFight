"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  Users,
  X,
} from "lucide-react";
import { AtmosphereBackground } from "@/components/ui/AtmosphereBackground";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { ApiError } from "@/lib/api/client";
import { useLanguage } from "@/i18n/LanguageProvider";
import { billTranslations } from "../i18n/bill-translations";
import { ItemAssignmentRow } from "./ItemAssignmentRow";
import { useBill } from "../hooks/use-bill";
import { billService } from "../services/bill-service";
import { cn } from "@/lib/utils/cn";

export interface SplitStepScreenProps {
  billId: string;
}

export function SplitStepScreen({ billId }: SplitStepScreenProps) {
  const router = useRouter();
  const { locale } = useLanguage();
  const isTh = locale === "th";
  const t = billTranslations[locale].split;

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
        err instanceof ApiError
          ? err.message
          : isTh
            ? "ไม่สามารถแบ่งค่าอาหารทุกคนเท่ากันได้"
            : "Unable to split the bill evenly.",
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
        err instanceof ApiError
          ? err.message
          : isTh
            ? "ไม่สามารถอัปเดตการแบ่งรายการได้"
            : "Unable to update assignment.",
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
      <div className="flex min-h-dvh items-center justify-center py-20 bg-background text-text-primary">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !bill) {
    return (
      <main className="min-h-dvh flex items-center justify-center p-4 bg-background text-text-primary">
        <Card
          variant="outline"
          className="rounded-3xl border-2 border-border/90 bg-surface p-6 text-center shadow-md max-w-md w-full space-y-4"
        >
          <AlertTriangle className="size-10 text-status-danger-text mx-auto" />
          <h2 className="text-xl font-bold tracking-tight text-text-primary">
            {error ?? (isTh ? "ไม่พบข้อมูลบิล" : "Bill not found.")}
          </h2>
          <Button
            variant="outline"
            onClick={() => router.push(`/bills/${billId}/receipt`)}
          >
            {isTh ? "กลับไปหน้าใบเสร็จ" : "Back to Receipt"}
          </Button>
        </Card>
      </main>
    );
  }

  const unassignedCount = bill.items.filter(
    (item) => item.assignedUserIds.length === 0,
  ).length;
  const assignedCount = bill.items.length - unassignedCount;
  const allAssigned = bill.items.length > 0 && unassignedCount === 0;

  return (
    <div className="relative min-h-dvh bg-background text-text-primary selection:bg-brand-primary selection:text-white flex flex-col">
      {/* Warm Atmosphere Hero Background Layer */}
      <AtmosphereBackground variant="hero" height="hero" className="-top-0" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto w-full max-w-md px-3.5 pb-28 pt-3 sm:px-6 sm:pb-32 sm:pt-5 md:max-w-3xl lg:max-w-5xl flex-1 flex flex-col">
        {/* Navigation & Step Indicator Row */}
        <div className="mb-2 flex items-center justify-between">
          <Link
            href={`/bills/${billId}/receipt`}
            className="inline-flex items-center gap-1 text-xs font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] hover:text-white/80 transition-colors cursor-pointer"
          >
            <ChevronLeft className="size-4 stroke-[2.5]" />
            <span>{isTh ? "ย้อนกลับไปใบเสร็จ" : "Back to Receipt"}</span>
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

        {/* Action error alert */}
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
                {t.memberNoticeDesc(bill.createdBy.displayName)}
              </p>
            </div>
          </div>
        )}

        {/* Split Overview & Progress Card */}
        <div className="mb-4 rounded-3xl border-2 border-border/90 bg-surface p-4 sm:p-5 shadow-md space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-text-secondary">
                {isTh ? "ความคืบหน้าการแบ่ง:" : "Assignment Progress:"}
              </span>
              <span className="ml-2 text-sm font-black text-text-primary">
                {t.progressCount(assignedCount, bill.items.length)}
              </span>
            </div>

            {/* Split Everything Equally Action (Host Only) */}
            {bill.isCreator && (
              <Button
                size="sm"
                variant="outline"
                loading={isSplittingEvenly}
                className="h-8 text-xs font-bold gap-1.5 rounded-xl border-border hover:bg-surface-subtle"
                onClick={handleSplitEvenly}
              >
                <Users className="size-3.5 text-brand-primary" />
                <span>{t.splitEvenlyButton}</span>
              </Button>
            )}
          </div>

          {/* Progress bar */}
          <div className="h-2.5 w-full rounded-full bg-surface-muted overflow-hidden border border-border-subtle">
            <div
              className={cn(
                "h-full transition-all duration-300 rounded-full",
                allAssigned ? "bg-accent-fresh" : "bg-brand-primary",
              )}
              style={{
                width: `${bill.items.length > 0 ? (assignedCount / bill.items.length) * 100 : 0}%`,
              }}
            />
          </div>
        </div>

        {/* Item Assignment Cards List */}
        <div className="space-y-3.5 mb-5">
          {bill.items.map((item) => (
            <ItemAssignmentRow
              key={item.id}
              item={item}
              members={bill.members}
              disabled={!bill.isCreator}
              isSaving={savingItemId === item.id}
              onToggle={(userId) => handleToggle(item.id, userId)}
              onToggleAll={() => handleToggleAll(item.id)}
            />
          ))}
        </div>

        {/* High-Contrast Status Alert Banner */}
        <div
          className={cn(
            "mb-5 rounded-2xl border-2 p-4 text-xs shadow-sm flex items-start gap-3.5",
            allAssigned
              ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/90 text-emerald-950 dark:text-emerald-100"
              : "border-amber-400 bg-amber-50 dark:bg-amber-950/90 text-amber-950 dark:text-amber-100",
          )}
        >
          {allAssigned ? (
            <CheckCircle2 className="size-5 shrink-0 text-emerald-700 dark:text-emerald-400 mt-0.5" />
          ) : (
            <AlertTriangle className="size-5 shrink-0 text-amber-700 dark:text-amber-400 mt-0.5" />
          )}
          <div className="space-y-0.5">
            <p className="font-extrabold text-sm">
              {allAssigned
                ? (isTh ? "แบ่งครบแล้ว" : "All Assigned")
                : (isTh ? "ยังแบ่งไม่ครบ" : "Incomplete Assignment")}
            </p>
            <p
              className={cn(
                "leading-relaxed font-medium",
                allAssigned
                  ? "text-emerald-900 dark:text-emerald-200"
                  : "text-amber-900 dark:text-amber-200",
              )}
            >
              {allAssigned
                ? t.allAssignedBanner
                : t.unassignedBanner(unassignedCount)}
            </p>
          </div>
        </div>

        {/* Primary Continue CTA (Host Only) */}
        {bill.isCreator && (
          <div className="pt-1 text-center space-y-2">
            <Button
              size="lg"
              className={cn(
                "w-full h-12 rounded-2xl text-base font-extrabold shadow-sm transition-all flex items-center justify-center gap-2",
                allAssigned
                  ? "bg-brand-primary hover:bg-brand-primary-hover text-white shadow-md active:scale-[0.99] cursor-pointer"
                  : "bg-surface-muted text-text-secondary/60 border border-border cursor-not-allowed opacity-85",
              )}
              disabled={!allAssigned || isSplittingEvenly}
              onClick={() => router.push(`/bills/${billId}/summary`)}
            >
              <span>{t.continueToSummary}</span>
              <ArrowRight className="size-5 stroke-[2.5]" />
            </Button>

            <p className="text-xs text-text-secondary font-medium">
              {t.continueHelper}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
