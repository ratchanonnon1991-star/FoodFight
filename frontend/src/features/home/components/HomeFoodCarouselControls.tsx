"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { FoodInspirationCardItem } from "../constants/home-static-data";
import { useHomeLanguage } from "../i18n/HomeLanguageContext";

export interface HomeFoodCarouselHeaderProps {
  onPrev: () => void;
  onNext: () => void;
}

export function HomeFoodCarouselHeader({
  onPrev,
  onNext,
}: HomeFoodCarouselHeaderProps) {
  const { t } = useHomeLanguage();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Sparkles className="size-4.5 text-white/90 stroke-[2.2]" aria-hidden="true" />
        <h2
          id="food-carousel-heading"
          className="text-sm sm:text-base font-bold text-white tracking-tight drop-shadow-xs"
        >
          {t.carousel.heading}
        </h2>
      </div>

      {/* Desktop Prev/Next Controls - Continuous Loop */}
      <div className="hidden sm:flex items-center gap-2">
        <button
          type="button"
          onClick={onPrev}
          aria-label={t.carousel.prevCardLabel}
          className="size-8 rounded-full border border-white/20 bg-black/20 hover:bg-black/30 backdrop-blur-md flex items-center justify-center text-white shadow-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-focus-ring active:scale-95 hover:border-white/30"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label={t.carousel.nextCardLabel}
          className="size-8 rounded-full border border-white/20 bg-black/20 hover:bg-black/30 backdrop-blur-md flex items-center justify-center text-white shadow-xs transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-focus-ring active:scale-95 hover:border-white/30"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>

  );
}

export interface HomeFoodCarouselPaginationProps {
  items: readonly FoodInspirationCardItem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function HomeFoodCarouselPagination({
  items,
  activeIndex,
  onSelect,
}: HomeFoodCarouselPaginationProps) {
  return (
    <div
      className="flex items-center justify-center gap-1.5 pt-2"
      role="tablist"
      aria-label="Food inspiration carousel pagination"
    >
      {items.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to slide ${index + 1}: ${item.title}`}
            onClick={() => onSelect(index)}
            className={cn(
              "transition-all duration-200 focus-visible:outline-2 focus-visible:outline-focus-ring cursor-pointer",
              isActive
                ? "h-2 w-5 rounded-full bg-brand-primary"
                : "size-2 rounded-full bg-border-disabled hover:bg-border"
            )}
          />
        );
      })}
    </div>
  );
}
