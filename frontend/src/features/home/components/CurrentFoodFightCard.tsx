"use client";

import * as React from "react";
import { ChevronRight, Clock, User, Users, UtensilsCrossed } from "lucide-react";
import type { CurrentFoodFightSession } from "../types/home-types";

export interface CurrentFoodFightCardProps {
  session: CurrentFoodFightSession;
  onContinue?: () => void;
}

export function CurrentFoodFightCard({
  session,
  onContinue,
}: CurrentFoodFightCardProps) {
  return (
    <section aria-labelledby="current-foodfight-heading" className="space-y-2.5">
      {/* Section Title */}
      <div className="flex items-center gap-2">
        <UtensilsCrossed className="size-4 text-text-primary stroke-[2.2]" />
        <h2
          id="current-foodfight-heading"
          className="text-sm font-bold text-text-primary tracking-tight"
        >
          Current FoodFight
        </h2>
      </div>

      {/* Main Card */}
      <div className="p-4 sm:p-5 rounded-2xl border border-border/80 bg-surface shadow-xs space-y-4">
        {/* Top Info Section */}
        <div className="flex items-center gap-3.5 sm:gap-4">
          {/* Room Avatar */}
          <div className="size-14 sm:size-16 shrink-0 rounded-full bg-surface-subtle border border-border/70 flex items-center justify-center text-text-secondary shadow-2xs">
            <Users className="size-7 stroke-[1.8]" />
          </div>

          {/* Room Details */}
          <div className="space-y-1.5 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold text-text-primary truncate">
                {session.title}
              </h3>
              <span className="rounded-full px-2.5 py-0.5 text-2xs font-semibold bg-surface-subtle text-text-secondary border border-border/60">
                {session.status}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-text-secondary flex-wrap">
              <span className="inline-flex items-center gap-1 font-medium">
                <Users className="size-3.5" />
                {session.memberCount} members
              </span>
              <span className="text-border-disabled">|</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3.5" />
                {session.statusDescription}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Action & Member Stack */}
        <div className="flex items-center justify-between gap-3 pt-1 border-t border-border/40">
          {/* Member Avatar Stack */}
          <div className="flex items-center -space-x-1.5" aria-label="Room members">
            {session.members.slice(0, 4).map((member, index) => (
              <div
                key={`${member}-${index}`}
                className="size-7 rounded-full bg-surface-subtle border-2 border-surface flex items-center justify-center text-text-muted shadow-2xs"
                title={member}
              >
                <User className="size-3.5" />
              </div>
            ))}
            <div className="size-7 rounded-full bg-surface-subtle border-2 border-surface flex items-center justify-center text-3xs font-bold text-text-secondary shadow-2xs">
              +1
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="button"
            onClick={onContinue}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl border border-border/80 bg-surface hover:bg-surface-subtle font-semibold text-xs text-text-primary shadow-2xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary cursor-pointer"
          >
            <span>Continue</span>
            <ChevronRight className="size-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
