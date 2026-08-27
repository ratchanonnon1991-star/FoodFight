"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";
import type { FoodInspirationCardItem } from "../constants/home-static-data";
import { useHomeLanguage } from "../i18n/HomeLanguageContext";
import { HomeFoodCarouselCard } from "./HomeFoodCarouselCard";
import {
  HomeFoodCarouselHeader,
  HomeFoodCarouselPagination,
} from "./HomeFoodCarouselControls";

export interface HomeFoodCarouselProps {
  items?: readonly FoodInspirationCardItem[];
  autoplayIntervalMs?: number;
  pauseResumeDelayMs?: number;
  className?: string;
}

const DEFAULT_AUTOPLAY_MS = 2000;
const DEFAULT_PAUSE_RESUME_MS = 10000;

function getCardPosition(index: number, activeIndex: number, total: number) {
  let diff = index - activeIndex;
  while (diff > Math.floor(total / 2)) diff -= total;
  while (diff < -Math.floor((total - 1) / 2)) diff += total;
  return diff;
}

export function HomeFoodCarousel({
  items: propItems,
  autoplayIntervalMs = DEFAULT_AUTOPLAY_MS,
  pauseResumeDelayMs = DEFAULT_PAUSE_RESUME_MS,
  className,
}: HomeFoodCarouselProps) {
  const { t } = useHomeLanguage();

  // Localized items mapped from active translations with real image assets
  const localizedItems: readonly FoodInspirationCardItem[] = React.useMemo(() => {
    if (propItems && propItems.length > 0) return propItems;
    const cats = t.carousel.categories;
    return [
      {
        id: "inspire-1",
        tag: cats.quickBites.tag,
        title: cats.quickBites.title,
        subtitle: cats.quickBites.subtitle,
        iconName: "flame",
        imageSrc: "/images/home/home-carousel-street-eats.webp",
      },
      {
        id: "inspire-2",
        tag: cats.warmBowls.tag,
        title: cats.warmBowls.title,
        subtitle: cats.warmBowls.subtitle,
        iconName: "soup",
        imageSrc: "/images/home/home-carousel-comfort.webp",
      },
      {
        id: "inspire-3",
        tag: cats.sharingPlates.tag,
        title: cats.sharingPlates.title,
        subtitle: cats.sharingPlates.subtitle,
        iconName: "pizza",
        imageSrc: "/images/home/home-carousel-group-feast.webp",
      },
      {
        id: "inspire-4",
        tag: cats.greenHealthy.tag,
        title: cats.greenHealthy.title,
        subtitle: cats.greenHealthy.subtitle,
        iconName: "sparkles",
        imageSrc: "/images/home/home-carousel-fresh-light.webp",
      },
      {
        id: "inspire-5",
        tag: cats.dessertsDrinks.tag,
        title: cats.dessertsDrinks.title,
        subtitle: cats.dessertsDrinks.subtitle,
        iconName: "utensils",
        imageSrc: "/images/home/home-carousel-sweet.webp",
      },
    ];
  }, [propItems, t.carousel.categories]);

  const items = localizedItems;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPausedByUser, setIsPausedByUser] = React.useState(false);
  const pauseTimerRef = React.useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = React.useRef<number | null>(null);

  // Pause autoplay on user interaction and resume after 10s of inactivity
  const handleUserInteraction = React.useCallback(() => {
    setIsPausedByUser(true);

    if (pauseTimerRef.current) {
      clearTimeout(pauseTimerRef.current);
    }

    pauseTimerRef.current = setTimeout(() => {
      setIsPausedByUser(false);
    }, pauseResumeDelayMs);
  }, [pauseResumeDelayMs]);

  // Clean up pause timer on unmount
  React.useEffect(() => {
    return () => {
      if (pauseTimerRef.current) {
        clearTimeout(pauseTimerRef.current);
      }
    };
  }, []);

  // Navigation handlers
  const handleNext = React.useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const handlePrev = React.useCallback(() => {
    setActiveIndex((prev) => (prev <= 0 ? items.length - 1 : prev - 1));
  }, [items.length]);

  const handleSelect = React.useCallback(
    (index: number) => {
      handleUserInteraction();
      setActiveIndex(index % items.length);
    },
    [handleUserInteraction, items.length]
  );

  const onUserPrev = React.useCallback(() => {
    handleUserInteraction();
    handlePrev();
  }, [handleUserInteraction, handlePrev]);

  const onUserNext = React.useCallback(() => {
    handleUserInteraction();
    handleNext();
  }, [handleUserInteraction, handleNext]);

  // Autoplay effect (runs every 2s unless user recently interacted)
  React.useEffect(() => {
    if (isPausedByUser || items.length <= 1) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoplayIntervalMs);

    return () => clearInterval(interval);
  }, [isPausedByUser, items.length, autoplayIntervalMs, handleNext]);

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartXRef.current - touchEndX;

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        onUserNext();
      } else {
        onUserPrev();
      }
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      aria-labelledby="food-carousel-heading"
      className={cn("space-y-2.5 sm:space-y-3 select-none", className)}
      onMouseEnter={() => handleUserInteraction()}
    >
      {/* Section Header with Desktop Controls */}
      <HomeFoodCarouselHeader onPrev={onUserPrev} onNext={onUserNext} />

      {/* Infinite Stage Track */}
      <div
        className="relative flex items-center justify-center overflow-hidden h-[255px] xs:h-[265px] sm:h-[285px] md:h-[305px] w-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {items.map((item, index) => {
          const diff = getCardPosition(index, activeIndex, items.length);
          const isActive = diff === 0;

          return (
            <HomeFoodCarouselCard
              key={item.id}
              item={item}
              index={index}
              diff={diff}
              isActive={isActive}
              onClick={() => handleSelect(index)}
            />
          );
        })}
      </div>

      {/* Pagination Indicators (5 Dots) */}
      <HomeFoodCarouselPagination
        items={items}
        activeIndex={activeIndex}
        onSelect={handleSelect}
      />
    </section>
  );
}
