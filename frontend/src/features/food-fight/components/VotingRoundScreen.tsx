"use client";

import * as React from "react";
import { ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CompatibilityIndicator } from "@/features/food-fight/components/CompatibilityIndicator";
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
}: {
  item: RecommendationItem;
  vote?: VoteAction;
  onVote: (vote: VoteAction) => void;
}) {
  const metadata = item.metadata;
  const reasons = metadata?.reasons?.length
    ? metadata.reasons
    : item.reason
      ? [item.reason]
      : [];
  const details = [
    metadata?.cuisineTh ?? metadata?.cuisine,
    metadata?.proteinsTh?.join(" • "),
    metadata?.cookingMethodsTh?.join(" • "),
  ].filter(Boolean);

  return (
    <Card variant="outline" className="relative rounded-2xl p-3 shadow-sm">
      <div className="flex gap-3">
        <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface-muted">
          <ImageIcon className="size-9 text-text-muted" aria-hidden="true" />
          <span className="absolute -left-1 -top-1 flex size-7 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">
            {item.displayOrder}
          </span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold leading-6">
            {metadata?.nameTh ?? item.menuName}
          </h3>
          <CompatibilityIndicator
            percentage={metadata?.compatibilityPercentage}
          />
          {metadata?.name && metadata.name !== metadata.nameTh ? (
            <p className="text-xs font-medium text-text-secondary">
              {metadata.name}
            </p>
          ) : null}
          {details.length ? (
            <ul className="mt-1 space-y-0.5 text-xs leading-5 text-text-secondary">
              {details.map((detail) => (
                <li key={detail} className="truncate">
                  • {detail}
                </li>
              ))}
            </ul>
          ) : null}
          {reasons.length ? (
            <p className="mt-1 line-clamp-2 text-xs leading-5 text-text-secondary">
              {reasons[0]}
            </p>
          ) : null}
          {metadata?.satisfiedMembers != null &&
          metadata.memberCount != null ? (
            <p className="mt-1 text-xs text-text-muted">
              ตรงใจสมาชิก {metadata.satisfiedMembers} / {metadata.memberCount}
            </p>
          ) : null}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <Button
          type="button"
          size="sm"
          variant={vote === "OK" ? "primary" : "outline"}
          aria-pressed={vote === "OK"}
          onClick={() => onVote("OK")}
        >
          OK
        </Button>
        <Button
          type="button"
          size="sm"
          variant={vote === "PASS" ? "primary" : "outline"}
          aria-pressed={vote === "PASS"}
          onClick={() => onVote("PASS")}
        >
          PASS
        </Button>
      </div>
    </Card>
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
  const isSecondRound = roundNumber === 2;
  const activeItems = items.slice(0, 2);

  return (
    <section aria-labelledby="voting-title">
      <p className="text-sm font-medium text-brand-primary">
        {isSecondRound ? "เมนูที่แนะนำ รอบที่ 2" : "เมนูที่แนะนำ"}
      </p>
      <h2
        id="voting-title"
        className="mt-1 text-2xl font-semibold tracking-tight"
      >
        {isSecondRound ? "เมนูใหม่สำหรับกลุ่ม" : "เราเลือกมาให้กลุ่ม 2 เมนู"}
      </h2>
      <p className="mt-2 text-sm leading-6 text-text-secondary">
        เลือก OK หรือ PASS ทั้งคู่ แล้วกดยืนยันการโหวต
      </p>
      <div className="mt-5 grid gap-3">
        {activeItems.map((item) => (
          <RecommendationCard
            key={item.id}
            item={item}
            vote={votes[item.id]}
            onVote={(vote) => onVote(item.id, vote)}
          />
        ))}
      </div>
      <Button
        className="mt-5 w-full"
        onClick={onSubmitVotes}
        disabled={
          activeItems.length !== 2 ||
          activeItems.some((item) => !votes[item.id]) ||
          isVoting
        }
        loading={isVoting}
        loadingText="กำลังส่งการโหวต..."
      >
        ยืนยันการโหวต
      </Button>
      <p className="mt-3 text-center text-xs text-text-secondary">
        ต้องเลือกให้ครบทั้ง 2 เมนู
      </p>
    </section>
  );
}
