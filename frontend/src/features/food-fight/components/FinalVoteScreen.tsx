"use client";

import * as React from "react";
import { ImageIcon, MessageCircle, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CompatibilityIndicator } from "@/features/food-fight/components/CompatibilityIndicator";
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

function StateIllustration({
  icon,
  tone = "brand",
}: {
  icon: React.ReactNode;
  tone?: "brand" | "success" | "muted";
}) {
  const toneClass =
    tone === "success"
      ? "bg-status-success-bg text-status-success-icon"
      : tone === "muted"
        ? "bg-surface-muted text-text-secondary"
        : "bg-brand-primary text-white";
  return (
    <div
      className={`mx-auto flex size-24 items-center justify-center rounded-full ${toneClass}`}
    >
      {icon}
    </div>
  );
}

function FinalVoteCard({
  item,
  selected,
  onSelect,
  voteCount,
}: {
  item: RecommendationItem;
  selected: boolean;
  onSelect: () => void;
  voteCount?: number;
}) {
  const metadata = item.metadata;
  const reasons = metadata?.reasons?.length
    ? metadata.reasons
    : item.reason
      ? [item.reason]
      : [];

  return (
    <Card
      variant="outline"
      className={`rounded-2xl p-2 shadow-sm ${selected ? "border-brand-primary bg-brand-primary/5" : ""}`}
    >
      <button
        type="button"
        role="radio"
        aria-checked={selected}
        onClick={onSelect}
        className="flex w-full items-start gap-3 rounded-xl p-2 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-focus-ring"
      >
        <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface-muted">
          <ImageIcon className="size-8 text-text-muted" aria-hidden="true" />
          <span className="absolute -left-1 -top-1 flex size-6 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">
            {item.displayOrder}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold">
            {metadata?.nameTh ?? item.menuName}
          </h3>
          <CompatibilityIndicator
            percentage={metadata?.compatibilityPercentage}
          />
          {metadata?.name && metadata.name !== metadata.nameTh ? (
            <p className="text-xs text-text-secondary">{metadata.name}</p>
          ) : null}
          {metadata?.cuisineTh || metadata?.cuisine ? (
            <p className="mt-1 text-xs text-text-secondary">
              {metadata.cuisineTh ?? metadata.cuisine}
            </p>
          ) : null}
          {item.description ? (
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-text-secondary">
              {item.description}
            </p>
          ) : null}
          {reasons.length ? (
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-text-secondary">
              {reasons[0]}
            </p>
          ) : null}
          {voteCount != null ? (
            <p className="mt-1 text-xs text-text-muted">คะแนน {voteCount} คน</p>
          ) : null}
        </div>
        <span
          className={`mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${selected ? "border-brand-primary" : "border-border-strong"}`}
          aria-hidden="true"
        >
          {selected ? (
            <span className="size-2.5 rounded-full bg-brand-primary" />
          ) : null}
        </span>
      </button>
    </Card>
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
  const title = hostTieBreak
    ? "คะแนนเท่ากัน!"
    : finalVoteType === "FOUR_MENU_FINAL"
      ? "เลือกเมนูสุดท้าย"
      : "เลือกเมนูสุดท้ายของห้อง";
  const description = hostTieBreak
    ? "ทั้ง 2 เมนูได้คะแนนเท่ากัน โหวตอีกครั้งเพื่อเลือกเมนูที่ชอบที่สุด"
    : "สมาชิกแต่ละคนเลือกได้ 1 เมนู";

  return (
    <section aria-labelledby="final-vote-title">
      <p className="text-sm font-medium text-brand-primary">Final Vote</p>
      <h2
        id="final-vote-title"
        className="mt-1 text-2xl font-semibold tracking-tight"
      >
        {title}
      </h2>
      <p className="mt-2 text-sm leading-6 text-text-secondary">
        {description}
      </p>
      <p className="mt-3 text-sm font-medium">เลือก 1 เมนูเท่านั้น</p>
      <div className="mt-4 grid gap-2" role="radiogroup" aria-label={title}>
        {candidates.map((item) => (
          <FinalVoteCard
            key={item.id}
            item={item}
            selected={selection === item.id}
            onSelect={() => onSelect(item.id)}
            voteCount={
              hostTieBreak && voteCounts ? voteCounts[item.id] : undefined
            }
          />
        ))}
      </div>
      <Button
        className="mt-5 w-full"
        onClick={onSubmit}
        disabled={!selection || isSubmitting}
        loading={isSubmitting}
        loadingText="กำลังส่งการเลือก..."
      >
        {hostTieBreak ? "ยืนยันการโหวต" : "ยืนยันเมนูสุดท้าย"}
      </Button>
      <p className="mt-3 text-center text-xs text-text-secondary">
        ทุกคนต้องเลือกให้ครบ
      </p>
    </section>
  );
}

export function FinalVoteWaiting({
  tieBreakRequired,
  submittedMemberCount,
  totalMemberCount,
}: FinalVoteWaitingProps) {
  return (
    <Card
      variant="outline"
      className="rounded-3xl p-6 text-center shadow-sm sm:p-8"
    >
      <StateIllustration
        icon={
          tieBreakRequired ? (
            <MessageCircle className="size-10" aria-hidden="true" />
          ) : (
            <UsersRound className="size-10" aria-hidden="true" />
          )
        }
        tone="muted"
      />
      <h2 className="mt-5 text-xl font-semibold">
        {tieBreakRequired ? "รอ Host ตัดสินผลเสมอ" : "รอผลโหวตจากสมาชิก"}
      </h2>
      <p className="mt-2 text-sm leading-6 text-text-secondary">
        {tieBreakRequired
          ? "สมาชิกส่งคะแนนครบแล้ว รอ Host เลือกเมนูจากตัวเลือกที่ Backend ส่งมา"
          : "รอเพื่อนโหวตให้ครบทุกคน"}
      </p>
      <p className="mt-5 text-2xl font-semibold tracking-tight">
        {submittedMemberCount} / {totalMemberCount}{" "}
        <span className="text-sm font-normal text-text-secondary">คน</span>
      </p>
      <p className="mt-1 text-xs text-text-secondary">(คุณโหวตแล้ว)</p>
    </Card>
  );
}
