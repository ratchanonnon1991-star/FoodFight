"use client";

import * as React from "react";
import { ChevronRight, History, Utensils } from "lucide-react";
import type { RecentFoodFightItemData } from "../types/home-types";
import { useHomeLanguage } from "../i18n/HomeLanguageContext";
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
  const { t } = useHomeLanguage();

  return (
    <section aria-labelledby="recent-foodfights-heading" className="space-y-2.5 sm:space-y-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="size-4 text-text-primary stroke-[2.2]" />
          <h2
            id="recent-foodfights-heading"
            className="text-sm sm:text-base font-bold text-text-primary tracking-tight"
          >
            {t.recent.heading}
          </h2>
        </div>
        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-0.5 text-xs sm:text-sm font-bold text-text-secondary hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring rounded-md py-0.5 px-1.5 cursor-pointer"
        >
          <span>{t.recent.viewAll}</span>
          <ChevronRight className="size-4 stroke-[2.2]" />
        </button>
      </div>

      {isLoading ? (
        <div
          className="space-y-2.5 rounded-2xl sm:rounded-3xl border border-border/80 bg-surface p-4 shadow-xs"
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
        <div className="rounded-2xl sm:rounded-3xl border border-border/80 bg-surface shadow-xs divide-y divide-border/50 overflow-hidden">
          {items.map((item) => (
            <RecentFoodFightItem
              key={item.id}
              item={item}
              onClick={() => onItemClick?.(item)}
            />
          ))}
        </div>
      ) : (
        /* Upgraded Empty State */
        <div className="rounded-2xl sm:rounded-3xl border border-dashed border-border/80 bg-surface p-6 sm:p-7 text-center shadow-xs space-y-2.5">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-surface-subtle border border-border/60 text-text-muted shadow-2xs">
            <Utensils className="size-5 stroke-[1.8]" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-sm sm:text-base font-bold text-text-primary">
              {t.recent.noRecentTitle}
            </h3>
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-xs mx-auto">
              {t.recent.noRecentDesc}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
