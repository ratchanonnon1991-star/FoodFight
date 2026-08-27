"use client";

import * as React from "react";
import { Calendar, ChevronRight, CupSoda, Pizza, Soup, Users, Utensils } from "lucide-react";
import type { RecentFoodFightIconType, RecentFoodFightItemData } from "../types/home-types";
import { useHomeLanguage } from "../i18n/HomeLanguageContext";

export interface RecentFoodFightItemProps {
  item: RecentFoodFightItemData;
  onClick?: () => void;
}

function renderItemIcon(iconType: RecentFoodFightIconType) {
  switch (iconType) {
    case "soup":
      return <Soup className="size-6 text-text-primary stroke-[1.8]" />;
    case "pizza":
      return <Pizza className="size-6 text-text-primary stroke-[1.8]" />;
    case "drink":
      return <CupSoda className="size-6 text-text-primary stroke-[1.8]" />;
    default:
      return <Utensils className="size-6 text-text-primary stroke-[1.8]" />;
  }
}

export function RecentFoodFightItem({
  item,
  onClick,
}: RecentFoodFightItemProps) {
  const { t } = useHomeLanguage();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="group flex items-center justify-between p-3.5 sm:p-4 hover:bg-surface-subtle/50 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring select-none"
    >
      <div className="flex items-center gap-3.5 min-w-0 flex-1 pr-2">
        {/* Leading 1:1 Thumbnail Media Slot */}
        <div className="size-12 sm:size-13 aspect-square shrink-0 rounded-xl bg-surface-subtle border border-border/60 flex items-center justify-center shadow-2xs overflow-hidden">
          {renderItemIcon(item.iconType)}
        </div>

        {/* Info Details */}
        <div className="space-y-0.5 min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-text-primary truncate">
            {item.title}
          </h3>
          <p className="text-xs sm:text-sm text-text-secondary truncate">
            {item.subtitle}
          </p>
          <div className="flex items-center gap-2 text-xs text-text-muted pt-0.5">
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3.5" />
              {item.date}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Users className="size-3.5" />
              {t.recent.membersLabel(item.memberCount)}
            </span>
          </div>
        </div>
      </div>

      {/* Trailing Chevron Button */}
      <div
        className="size-8 shrink-0 rounded-xl border border-border/70 bg-surface flex items-center justify-center text-text-secondary group-hover:text-brand-primary group-hover:border-brand-primary/50 transition-colors shadow-2xs"
        aria-hidden="true"
      >
        <ChevronRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
      </div>
    </div>
  );
}
