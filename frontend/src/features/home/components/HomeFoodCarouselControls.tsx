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
        <Sparkles className="size-4 text-brand-primary stroke-[2.2]" />
        <h2
          id="food-carousel-heading"
          className="text-sm sm:text-base font-bold text-text-primary tracking-tight"
        >
          {t.carousel.heading}
        </h2>
      </div>

      {/* Desktop Prev/Next Controls - Continuous Loop */}
      <div className="hidden sm:flex items-center gap-1.5">
        <button
          type="button"
          onClick={onPrev}
          aria-label={t.carousel.prevCardLabel}
          className="size-8 rounded-xl border border-border/80 bg-surface flex items-center justify-center text-text-secondary hover:text-brand-primary hover:border-brand-primary/50 transition-colors cursor-pointer shadow-2xs focus-visible:outline-2 focus-visible:outline-focus-ring active:scale-95"
        >
          <ChevronLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label={t.carousel.nextCardLabel}
          className="size-8 rounded-xl border border-border/80 bg-surface flex items-center justify-center text-text-secondary hover:text-brand-primary hover:border-brand-primary/50 transition-colors cursor-pointer shadow-2xs focus-visible:outline-2 focus-visible:outline-focus-ring active:scale-95"
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
