"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import type { RecentFoodFightItemData } from "../types/home-types";
import { RecentFoodFightItem } from "./RecentFoodFightItem";

export interface RecentFoodFightsSectionProps {
  items: readonly RecentFoodFightItemData[];
  isLoading?: boolean;
  onViewAll?: () => void;
  onItemClick?: (item: RecentFoodFightItemData) => void;
}

export function RecentFoodFightsSection({
  items,
  isLoading = false,
  onViewAll,
  onItemClick,
}: RecentFoodFightsSectionProps) {
  return (
    <section aria-labelledby="recent-foodfights-heading" className="space-y-2.5">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2
          id="recent-foodfights-heading"
          className="text-sm sm:text-base font-bold text-text-primary tracking-tight"
        >
          Recent FoodFights
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-0.5 text-xs sm:text-sm font-semibold text-text-secondary hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary rounded-sm py-0.5 px-1 cursor-pointer"
        >
          <span>View all</span>
          <ChevronRight className="size-4" />
        </button>
      </div>

      {isLoading ? (
        <div
          className="space-y-2 rounded-2xl border border-border/80 bg-surface p-3 shadow-xs"
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label="Loading recent FoodFights"
        >
          {[0, 1].map((item) => (
            <div
              key={item}
              className="h-16 animate-pulse rounded-xl bg-surface-subtle"
            />
          ))}
        </div>
      ) : items.length > 0 ? (
        <div className="rounded-2xl border border-border/80 bg-surface shadow-xs divide-y divide-border/60 overflow-hidden">
          {items.map((item) => (
            <RecentFoodFightItem
              key={item.id}
              item={item}
              onClick={() => onItemClick?.(item)}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-surface p-5 text-center shadow-xs">
          <p className="text-sm font-semibold text-text-primary">No recent FoodFights</p>
          <p className="mt-1 text-xs leading-relaxed text-text-secondary">
            Completed group meals will appear here.
          </p>
        </div>
      )}
    </section>
  );
}
