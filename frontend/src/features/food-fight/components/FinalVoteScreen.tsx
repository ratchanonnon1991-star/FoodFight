"use client";

import * as React from "react";
import { Check, ChevronRight, Clock3, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";
import { useLanguage } from "@/i18n/LanguageProvider";
import { RecommendationFoodMedia } from "./RecommendationFoodMedia";
import type {
  FinalVoteType,
  RecommendationItem,
} from "@/features/food-fight/types/food-fight-types";

export interface FinalVoteScreenProps {
  candidates: RecommendationItem[];
  selection: string | null;
  onSelect: (candidateId: string) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  finalVoteType?: FinalVoteType | null;
  hostTieBreak?: boolean;
  voteCounts?: Record<string, number>;
}

export interface FinalVoteWaitingProps {
  tieBreakRequired: boolean;
  submittedMemberCount: number;
  totalMemberCount: number;
}

function FinalVoteCandidateCard({
  item,
  isSelected,
  onSelect,
  voteCount,
  isTh,
}: {
  item: RecommendationItem;
  isSelected: boolean;
  onSelect: () => void;
  voteCount?: number;
  isTh: boolean;
}) {
  const metadata = item.metadata;

  const displayName = isTh
    ? metadata?.nameTh ?? item.menuName
    : metadata?.name ?? item.menuName;
  const secondaryName = isTh ? metadata?.name : metadata?.nameTh;

  const cuisine = isTh
    ? metadata?.cuisineTh ?? metadata?.cuisine
    : metadata?.cuisine ?? metadata?.cuisineTh;
  const cookingMethod = isTh
    ? metadata?.cookingMethodsTh?.[0] ?? metadata?.cookingMethods?.[0]
    : metadata?.cookingMethods?.[0] ?? metadata?.cookingMethodsTh?.[0];
  const protein = isTh
    ? metadata?.proteinsTh?.[0] ?? metadata?.proteins?.[0]
    : metadata?.proteins?.[0] ?? metadata?.proteinsTh?.[0];

  const reason = metadata?.reasons?.[0] ?? item.reason ?? item.description;

  return (
    <div
      onClick={onSelect}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        "relative flex items-stretch w-full cursor-pointer group rounded-3xl transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
        isSelected && "shadow-[0_0_24px_rgba(225,29,72,0.2)]",
      )}
    >
      {/* ------------------------------------------------------------------- */}
      {/* CARD 1: FOOD IMAGE CARD (Left, higher z-index, overlaps Card 2)   */}
      {/* ------------------------------------------------------------------- */}
      <RecommendationFoodMedia
        imageUrl={item.imageUrl}
        alt={displayName}
        orderNumber={item.displayOrder}
        compatibilityPercentage={metadata?.compatibilityPercentage}
        className={cn(
          isSelected
            ? "border-brand-primary ring-2 ring-brand-primary/40 shadow-[0_0_20px_rgba(225,29,72,0.25)] scale-[1.01] motion-reduce:scale-100"
            : "border-border/90 group-hover:border-border-strong",
        )}
      />

      {/* ------------------------------------------------------------------- */}
      {/* CARD 2: INFORMATION CARD (Right, Solid Opaque Surface)             */}
      {/* ------------------------------------------------------------------- */}
      <div
        className={cn(
          "relative z-0 -ml-6 sm:-ml-7 flex-1 min-w-0 rounded-2xl sm:rounded-3xl border-2 bg-surface shadow-md pl-8 sm:pl-10 pr-3.5 sm:pr-5 py-3 sm:py-4 flex flex-col justify-between space-y-2 sm:space-y-3 transition-all duration-300",
          isSelected
            ? "border-brand-primary ring-2 ring-brand-primary/30 shadow-[0_0_20px_rgba(225,29,72,0.18)]"
            : "border-border-strong/90 group-hover:border-border-strong",
        )}
      >
        <div>
          <div className="flex items-start justify-between gap-1.5">
            <div className="min-w-0 flex-1">
              <h3 className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight text-text-primary line-clamp-1">
                {displayName}
              </h3>
              {secondaryName && secondaryName !== displayName ? (
                <p className="text-[11px] sm:text-xs font-semibold text-text-muted truncate">
                  {secondaryName}
                </p>
              ) : null}
            </div>

            {/* Custom Radio Ring with Active Energy */}
            <div
              className={cn(
                "size-5 sm:size-6 shrink-0 rounded-full border-2 flex items-center justify-center transition-all mt-0.5",
                isSelected
                  ? "border-brand-primary bg-brand-primary text-white shadow-sm ring-2 ring-brand-primary/30"
                  : "border-border-strong bg-surface",
              )}
            >
              {isSelected ? <Check className="size-3.5 stroke-[3]" /> : null}
            </div>
          </div>

          {/* Chips */}
          <div className="mt-1.5 flex flex-wrap gap-1">
            {cuisine ? (
              <span className="rounded-md border border-border-subtle bg-surface-subtle px-1.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-text-secondary">
                {cuisine}
              </span>
            ) : null}
            {cookingMethod ? (
              <span className="rounded-md border border-border-subtle bg-surface-subtle px-1.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-text-secondary">
                {cookingMethod}
              </span>
            ) : null}
            {protein ? (
              <span className="rounded-md border border-border-subtle bg-surface-subtle px-1.5 py-0.5 text-[10px] sm:text-[11px] font-semibold text-text-secondary">
                {protein}
              </span>
            ) : null}
          </div>

          {/* Reason */}
          {reason ? (
            <p className="mt-1.5 line-clamp-2 rounded-xl border border-border-subtle/80 bg-surface-subtle/60 p-2 text-[11px] sm:text-xs leading-relaxed text-text-secondary">
              {reason}
            </p>
          ) : null}

          {/* Vote count if in tie break */}
          {voteCount != null ? (
            <p className="mt-1 text-[11px] font-bold text-brand-primary">
              {isTh ? `คะแนนโหวต ${voteCount} เสียง` : `${voteCount} votes`}
            </p>
          ) : null}
        </div>

        {/* Selection Banner Button with Warm Active Halo */}
        <div
          className={cn(
            "w-full py-1.5 sm:py-2 rounded-xl text-center text-xs font-extrabold transition-all border",
            isSelected
              ? "bg-brand-primary text-white border-brand-primary shadow-xs"
              : "bg-surface-subtle text-text-secondary border-border group-hover:bg-surface-muted",
          )}
        >
          {isSelected
            ? isTh
              ? "✓ เมนูที่คุณเลือก"
              : "✓ Selected Choice"
            : isTh
              ? "แตะเพื่อเลือกเมนูนี้"
              : "Tap to Select"}
        </div>
      </div>
    </div>
  );
}

export function FinalVoteScreen({
  candidates,
  selection,
  onSelect,
  onSubmit,
  isSubmitting,
  finalVoteType,
  hostTieBreak = false,
  voteCounts,
}: FinalVoteScreenProps) {
  const { locale } = useLanguage();
  const isTh = locale === "th";

  return (
    <section aria-labelledby="final-vote-title" className="space-y-4 sm:space-y-6">
      {/* Overlapping Two-Card Candidate List */}
      <div className="space-y-4 sm:space-y-5" role="radiogroup" aria-label="Final vote candidates">
        {candidates.map((item) => (
          <FinalVoteCandidateCard
            key={item.id}
            item={item}
            isSelected={selection === item.id}
            onSelect={() => onSelect(item.id)}
            voteCount={
              hostTieBreak && voteCounts ? voteCounts[item.id] : undefined
            }
            isTh={isTh}
          />
        ))}
      </div>

      {/* Primary Final Vote Submission CTA */}
      <div className="mx-auto max-w-md text-center pt-2">
        <Button
          size="lg"
          className="w-full h-12 rounded-2xl bg-brand-primary hover:bg-brand-primary-hover text-white font-extrabold text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          onClick={onSubmit}
          disabled={!selection || isSubmitting}
          loading={isSubmitting}
          loadingText={isTh ? "กำลังส่งการเลือก..." : "Submitting selection..."}
        >
          <span>
            {hostTieBreak
              ? isTh
                ? "ยืนยันการตัดสินผลเสมอ"
                : "Confirm Tie-Break"
              : isTh
                ? "ยืนยันเมนูสุดท้าย"
                : "Confirm Final Menu"}
          </span>
          <ChevronRight className="size-5 stroke-[2.5]" />
        </Button>
        <p className="mt-2 text-xs text-text-secondary">
          {isTh
            ? "ผลการตัดสินจะสรุปเป็นมื้ออาหารของกลุ่มทันที"
            : "The selected dish will become the group's finalized meal."}
        </p>
      </div>
    </section>
  );
}

export function FinalVoteWaiting({
  tieBreakRequired,
  submittedMemberCount,
  totalMemberCount,
}: FinalVoteWaitingProps) {
  const { locale } = useLanguage();
  const isTh = locale === "th";

  const percentage =
    totalMemberCount > 0
      ? Math.round((submittedMemberCount / totalMemberCount) * 100)
      : 0;

  return (
    <Card
      variant="outline"
      className="rounded-3xl border-2 border-border/90 bg-surface p-6 text-center shadow-md sm:p-8 space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-brand-primary/20 bg-brand-primary/10 text-brand-primary shadow-2xs">
          {tieBreakRequired ? (
            <MessageCircle className="size-8 stroke-[2]" aria-hidden="true" />
          ) : (
            <Clock3 className="size-8 stroke-[2]" aria-hidden="true" />
          )}
        </div>
        <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
          {tieBreakRequired
            ? isTh
              ? "รอ Host ตัดสินผลเสมอ"
              : "Waiting for Host Tie-Break"
            : isTh
              ? "รอผลโหวตจากสมาชิก"
              : "Waiting for Final Votes"}
        </h2>
        <p className="mx-auto max-w-sm text-xs leading-relaxed text-text-secondary sm:text-sm">
          {tieBreakRequired
            ? isTh
              ? "สมาชิกส่งคะแนนครบแล้ว รอหัวหน้าห้องเลือกเมนูสุดท้าย"
              : "All votes submitted. Waiting for host to break the tie."
            : isTh
              ? "คุณส่งคะแนนแล้ว กำลังรอสมาชิกคนอื่นให้ครบ"
              : "Your vote is recorded. Waiting for remaining members."}
        </p>
      </div>

      {/* Progress Box */}
      <div className="rounded-2xl border-2 border-border-subtle bg-surface-subtle/80 p-4 sm:p-5 space-y-3 shadow-2xs">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-text-secondary">
            {isTh ? "ความคืบหน้า" : "Progress"}
          </span>
          <span className="inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-extrabold text-text-primary shadow-2xs">
            {submittedMemberCount} / {totalMemberCount} {isTh ? "คน" : "voted"}
          </span>
        </div>

        <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-muted shadow-inner">
          <div
            className="h-full rounded-full bg-brand-primary transition-all duration-700 ease-out motion-reduce:transition-none"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </Card>
  );
}
