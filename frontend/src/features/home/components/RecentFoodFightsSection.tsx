"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import type { RecentFoodFightItemData } from "../types/home-types";
import { RecentFoodFightItem } from "./RecentFoodFightItem";

export interface RecentFoodFightsSectionProps {
  items: readonly RecentFoodFightItemData[];
  onViewAll?: () => void;
  onItemClick?: (item: RecentFoodFightItemData) => void;
}

export function RecentFoodFightsSection({
  items,
  onViewAll,
  onItemClick,
}: RecentFoodFightsSectionProps) {
  return (
    <section aria-labelledby="recent-foodfights-heading" className="space-y-2.5">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2
          id="recent-foodfights-heading"
          className="text-sm font-bold text-text-primary tracking-tight"
        >
          Recent FoodFights
        </h2>
        <button
          type="button"
          onClick={onViewAll}
          className="inline-flex items-center gap-0.5 text-xs font-semibold text-text-secondary hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary rounded-sm py-0.5 px-1 cursor-pointer"
        >
          <span>View all</span>
          <ChevronRight className="size-3.5" />
        </button>
      </div>

      {/* List of Recent Items */}
      <div className="space-y-2.5">
        {items.map((item) => (
          <RecentFoodFightItem
            key={item.id}
            item={item}
            onClick={() => onItemClick?.(item)}
          />
        ))}
      </div>
    </section>
  );
}
