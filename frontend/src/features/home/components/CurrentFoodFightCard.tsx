"use client";

/* Profile images are supplied by external OAuth providers. */
/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import { ChevronRight, Clock, Users, UtensilsCrossed } from "lucide-react";
import type {
  CurrentFoodFightMember,
  CurrentFoodFightSession,
} from "../types/home-types";

export interface CurrentFoodFightCardProps {
  session: CurrentFoodFightSession;
  onContinue?: () => void;
}

export function CurrentFoodFightCard({
  session,
  onContinue,
}: CurrentFoodFightCardProps) {
  const visibleMembers = session.members.slice(0, 4);
  const remainingMemberCount = session.members.length - visibleMembers.length;

  return (
    <section
      aria-labelledby="current-foodfight-heading"
      className="space-y-2.5"
    >
      {/* Section Title */}
      <div className="flex items-center gap-2">
        <UtensilsCrossed className="size-4 text-text-primary stroke-[2.2]" />
        <h2
          id="current-foodfight-heading"
          className="text-sm sm:text-base font-bold text-text-primary tracking-tight"
        >
          Current FoodFight
        </h2>
      </div>

      {/* Main Card with increased visual weight */}
      <div className="p-5 sm:p-6 rounded-2xl border border-border/80 bg-surface shadow-xs space-y-4 sm:space-y-5">
        {/* Top Info Section */}
        <div className="flex items-center gap-4">
          {/* Room Avatar Placeholder */}
          <div className="size-16 sm:size-18 shrink-0 rounded-full bg-surface-subtle border border-border/70 flex items-center justify-center text-text-secondary shadow-2xs">
            <Users className="size-8 sm:size-9 stroke-[1.8]" />
          </div>

          {/* Room Details */}
          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h3 className="text-lg sm:text-xl font-bold text-text-primary tracking-tight truncate">
                {session.title}
              </h3>
              <span className="rounded-full px-2.5 py-0.5 text-xs font-semibold bg-surface-subtle text-text-secondary border border-border/70">
                {session.status}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary flex-wrap">
              <span className="inline-flex items-center gap-1.5 font-medium">
                <Users className="size-4" />
                {session.memberCount} members
              </span>
              <span className="text-border-disabled">|</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" />
                {session.statusDescription}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Action & Member Stack */}
        <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/50">
          {/* Member Avatar Stack */}
          <div
            className="flex items-center -space-x-2"
            aria-label="Room members"
          >
            {visibleMembers.map((member, index) => (
              <div
                key={`${member.id}-${index}`}
                className="size-8 rounded-full bg-surface-subtle border-2 border-surface flex items-center justify-center text-text-muted shadow-2xs"
                title={member.name}
              >
                <MemberAvatar member={member} />
              </div>
            ))}
            {remainingMemberCount > 0 ? (
              <div className="size-8 rounded-full bg-surface-subtle border-2 border-surface flex items-center justify-center text-xs font-bold text-text-secondary shadow-2xs">
                +{remainingMemberCount}
              </div>
            ) : null}
          </div>

          {/* Continue Button */}
          <button
            type="button"
            onClick={onContinue}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border/80 bg-surface hover:bg-surface-subtle font-semibold text-xs sm:text-sm text-text-primary shadow-2xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary cursor-pointer active:scale-[0.98]"
          >
            <span>Continue</span>
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function MemberAvatar({ member }: { member: CurrentFoodFightMember }) {
  const [failedImageUrl, setFailedImageUrl] = React.useState<string | null>(
    null,
  );
  const shouldShowImage = Boolean(
    member.avatarUrl && failedImageUrl !== member.avatarUrl,
  );

  if (shouldShowImage) {
    return (
      <img
        key={member.avatarUrl}
        src={member.avatarUrl ?? undefined}
        alt={`${member.name}'s profile`}
        className="size-full rounded-full object-cover"
        referrerPolicy="no-referrer"
        onError={() => setFailedImageUrl(member.avatarUrl ?? null)}
      />
    );
  }

  return (
    <span
      className="text-[0.6rem] font-semibold text-text-secondary"
      aria-hidden="true"
    >
      {getInitials(member.name) || "?"}
    </span>
  );
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
