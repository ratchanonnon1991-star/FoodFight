"use client";

import * as React from "react";
import { Check, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { useLanguage } from "@/i18n/LanguageProvider";
import { RecommendationFoodMedia } from "./RecommendationFoodMedia";
import type {
  RecommendationItem,
  VoteAction,
} from "@/features/food-fight/types/food-fight-types";

export interface VotingRoundScreenProps {
  roundNumber?: number;
  items: RecommendationItem[];
  votes: Record<string, VoteAction>;
  isVoting: boolean;
  onVote: (itemId: string, action: VoteAction) => void;
  onSubmitVotes: () => void;
}

function RecommendationCard({
  item,
  vote,
  onVote,
  isTh,
}: {
  item: RecommendationItem;
  vote?: VoteAction;
  onVote: (vote: VoteAction) => void;
  isTh: boolean;
}) {
  const metadata = item.metadata;
  const isOk = vote === "OK";
  const isPass = vote === "PASS";

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
      className={cn(
        "relative flex items-stretch w-full rounded-3xl transition-all duration-300",
        isOk && "shadow-[0_0_24px_rgba(34,197,94,0.18)]",
        isPass && "shadow-[0_0_18px_rgba(30,41,59,0.18)]",
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
          isOk &&
            "border-accent-fresh ring-2 ring-accent-fresh/40 shadow-[0_0_18px_rgba(34,197,94,0.25)] scale-[1.01] motion-reduce:scale-100",
          isPass &&
            "border-slate-700 ring-2 ring-slate-700/30 shadow-[0_0_14px_rgba(30,41,59,0.25)]",
          !isOk && !isPass && "border-border/90 shadow-md",
        )}
        statusBadge={
          isOk ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-fresh px-2.5 py-0.5 text-[10px] sm:text-xs font-black text-white shadow-md transition-transform duration-200 scale-100">
              <Check className="size-3 stroke-[3]" />
              <span>OK</span>
            </span>
          ) : isPass ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-2.5 py-0.5 text-[10px] sm:text-xs font-black text-white shadow-md transition-transform duration-200 scale-100">
              <X className="size-3 stroke-[3]" />
              <span>PASS</span>
            </span>
          ) : null
        }
      />

      {/* ------------------------------------------------------------------- */}
      {/* CARD 2: INFORMATION / DECISION CARD (Right, overlapped by Card 1)  */}
      {/* ------------------------------------------------------------------- */}
      <div
        className={cn(
          "relative z-0 -ml-6 sm:-ml-7 flex-1 min-w-0 rounded-2xl sm:rounded-3xl border-2 bg-surface shadow-md pl-8 sm:pl-10 pr-3.5 sm:pr-5 py-3 sm:py-4 flex flex-col justify-between space-y-2 sm:space-y-3 transition-all duration-300",
          isOk &&
            "border-accent-fresh/80 ring-2 ring-accent-fresh/25 shadow-[0_0_18px_rgba(34,197,94,0.18)]",
          isPass &&
            "border-slate-600/80 ring-2 ring-slate-600/20 shadow-[0_0_14px_rgba(30,41,59,0.15)]",
          !isOk && !isPass && "border-border/90 hover:border-border-strong",
        )}
      >
        {/* Title & Metadata Block */}
        <div>
          {/* Dish Name */}
          <h3 className="text-sm sm:text-base md:text-lg font-extrabold tracking-tight text-text-primary line-clamp-1">
            {displayName}
          </h3>
          {secondaryName && secondaryName !== displayName ? (
            <p className="text-[11px] sm:text-xs font-semibold text-text-muted truncate">
              {secondaryName}
            </p>
          ) : null}

          {/* Compact Chips */}
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

          {/* Concise Recommendation Reason */}
          {reason ? (
            <p className="mt-1.5 line-clamp-2 rounded-xl border border-border-subtle/80 bg-surface-subtle/60 p-2 text-[11px] sm:text-xs leading-relaxed text-text-secondary">
              {reason}
            </p>
          ) : null}
        </div>

        {/* Decision Controls: OK / PASS (44px+ Touch Target with Active Energy) */}
        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 pt-1">
          {/* OK Decision Button (Herb Positive + Glow) */}
          <button
            type="button"
            onClick={() => onVote("OK")}
            aria-pressed={isOk}
            className={cn(
              "h-11 sm:h-12 rounded-xl font-extrabold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer active:scale-[0.97] border-2",
              isOk
                ? "bg-accent-fresh border-accent-fresh text-white shadow-[0_0_14px_rgba(34,197,94,0.35)] ring-2 ring-accent-fresh/35"
                : "bg-surface border-border/90 text-text-primary hover:border-accent-fresh/60 hover:bg-accent-fresh/5",
            )}
          >
            <Check
              className={cn(
                "size-3.5 sm:size-4 stroke-[3] transition-transform duration-200",
                isOk ? "text-white scale-110" : "text-accent-fresh",
              )}
            />
            <span>{isTh ? "OK (ชอบ)" : "OK"}</span>
          </button>

          {/* PASS Decision Button (Restrained Neutral-Negative + Subtle Shadow) */}
          <button
            type="button"
            onClick={() => onVote("PASS")}
            aria-pressed={isPass}
            className={cn(
              "h-11 sm:h-12 rounded-xl font-extrabold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer active:scale-[0.97] border-2",
              isPass
                ? "bg-slate-800 border-slate-800 text-white shadow-[0_0_12px_rgba(30,41,59,0.35)] ring-2 ring-slate-800/35"
                : "bg-surface border-border/90 text-text-secondary hover:border-text-secondary/60 hover:bg-surface-subtle",
            )}
          >
            <X
              className={cn(
                "size-3.5 sm:size-4 stroke-[3] transition-transform duration-200",
                isPass ? "text-white scale-110" : "text-text-muted",
              )}
            />
            <span>{isTh ? "PASS (ผ่าน)" : "PASS"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export function VotingRoundScreen({
  roundNumber = 1,
  items,
  votes,
  isVoting,
  onVote,
  onSubmitVotes,
}: VotingRoundScreenProps) {
  const { locale } = useLanguage();
  const isTh = locale === "th";
  const activeItems = items.slice(0, 2);

  const areAllVoted =
    activeItems.length === 2 &&
    activeItems.every((item) => Boolean(votes[item.id]));

  return (
    <section aria-labelledby="voting-title" className="space-y-4 sm:space-y-6">
      {/* 2 Overlapping Recommendation Cards */}
      <div className="space-y-4 sm:space-y-5">
        {activeItems.map((item) => (
          <RecommendationCard
            key={item.id}
            item={item}
            vote={votes[item.id]}
            onVote={(vote) => onVote(item.id, vote)}
            isTh={isTh}
          />
        ))}
      </div>

      {/* Primary Submission Action Row */}
      <div className="mx-auto max-w-md space-y-2 pt-2 text-center">
        <Button
          size="lg"
          className={cn(
            "w-full h-12 rounded-2xl text-base font-extrabold shadow-sm transition-all flex items-center justify-center gap-2",
            areAllVoted && !isVoting
              ? "bg-brand-primary hover:bg-brand-primary-hover text-white shadow-md active:scale-[0.99] cursor-pointer"
              : "bg-surface-muted text-text-muted border border-border/80 cursor-not-allowed opacity-75",
          )}
          onClick={onSubmitVotes}
          disabled={!areAllVoted || isVoting}
          loading={isVoting}
          loadingText={isTh ? "กำลังส่งการโหวต..." : "Submitting votes..."}
        >
          <span>{isTh ? "ยืนยันการโหวต" : "Confirm Votes"}</span>
          <ChevronRight className="size-5 stroke-[2.5]" />
        </Button>

        <p className="text-xs text-text-secondary">
          {areAllVoted ? (
            <span className="font-semibold text-accent-fresh flex items-center justify-center gap-1">
              <Check className="size-3.5 stroke-[3]" />
              {isTh
                ? "เลือกครบทั้ง 2 เมนูแล้ว พร้อมส่งผลโหวต"
                : "Both dishes decided. Ready to submit"}
            </span>
          ) : (
            <span>
              {isTh
                ? "ต้องเลือก OK หรือ PASS ให้ครบทั้ง 2 เมนู"
                : "Please choose OK or PASS for both dishes to proceed"}
            </span>
          )}
        </p>
      </div>
    </section>
  );
}
