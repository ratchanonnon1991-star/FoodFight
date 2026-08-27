"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Flame, Pizza, Soup, Sparkles, Utensils } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { FoodInspirationCardItem } from "../constants/home-static-data";

export interface HomeFoodCarouselCardProps {
  item: FoodInspirationCardItem;
  index: number;
  diff: number;
  isActive: boolean;
  onClick: () => void;
}

function CardIcon({
  name,
  className,
}: {
  name: FoodInspirationCardItem["iconName"];
  className?: string;
}) {
  const iconClasses = cn("size-3.5 sm:size-4 stroke-[2]", className);
  switch (name) {
    case "flame":
      return <Flame className={iconClasses} />;
    case "soup":
      return <Soup className={iconClasses} />;
    case "pizza":
      return <Pizza className={iconClasses} />;
    case "sparkles":
      return <Sparkles className={iconClasses} />;
    default:
      return <Utensils className={iconClasses} />;
  }
}

export function HomeFoodCarouselCard({
  item,
  index,
  diff,
  isActive,
  onClick,
}: HomeFoodCarouselCardProps) {
  // Render cards within visible range [-2, 2]
  const isVisible = Math.abs(diff) <= 2;
  if (!isVisible) return null;

  const zIndex = isActive ? 20 : 10 - Math.abs(diff);

  return (
    <motion.div
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Select ${item.title}`}
      aria-current={isActive ? "true" : undefined}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      initial={false}
      animate={{
        x: `${diff * 108}%`,
        scale: isActive ? 1.02 : 0.94,
        opacity: isActive ? 1 : Math.abs(diff) === 1 ? 0.65 : 0.25,
      }}
      transition={{
        type: "spring",
        stiffness: 280,
        damping: 28,
        mass: 0.8,
      }}
      style={{ zIndex }}
      className={cn(
        "group absolute flex flex-col justify-between overflow-hidden rounded-2xl border transition-colors cursor-pointer select-none",
        "aspect-[4/5] p-3 sm:p-4",
        "w-[185px] xs:w-[195px] sm:w-[210px] md:w-[225px]",
        isActive
          ? "border-brand-primary bg-surface shadow-md ring-2 ring-brand-primary/20"
          : "border-border/80 bg-surface/95 shadow-2xs hover:border-border"
      )}
    >
      {/* 4:5 Real Background Image with Readability Overlays */}
      {item.imageSrc ? (
        <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 195px, (max-width: 1024px) 210px, 225px"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            priority={index === 0}
          />
          {/* Top & Bottom gradient protection for badge and title copy */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-surface/60 to-transparent pointer-events-none" />
        </div>
      ) : (
        /* Fallback placeholder if imageSrc not provided */
        <div
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-surface-subtle/40 via-surface-subtle/70 to-surface-subtle/90"
          aria-hidden="true"
        >
          <div className="size-14 sm:size-18 rounded-2xl bg-surface/60 border border-border/40 flex items-center justify-center text-text-muted/40 shadow-inner">
            <CardIcon name={item.iconName} className="size-7 sm:size-9 stroke-[1.2]" />
          </div>
        </div>
      )}

      {/* Card Header: Tag Pill & Food Icon */}
      <div className="flex items-center justify-between gap-1.5 z-10 relative">
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[0.65rem] sm:text-[0.7rem] font-bold tracking-wide border transition-colors backdrop-blur-xs",
            isActive
              ? "bg-brand-primary/15 text-brand-primary border-brand-primary/40 bg-surface/90"
              : "bg-surface/90 text-text-secondary border-border/80"
          )}
        >
          {item.tag}
        </span>
        <div
          className={cn(
            "size-7 sm:size-8 rounded-full border flex items-center justify-center shadow-2xs transition-colors shrink-0 backdrop-blur-xs",
            isActive
              ? "bg-brand-primary text-white border-brand-primary"
              : "bg-surface/90 text-brand-primary border-border/70"
          )}
        >
          <CardIcon name={item.iconName} />
        </div>
      </div>

      {/* Card Footer: Category Title & Subtitle */}
      <div className="relative z-10 pt-2 space-y-0.5 bg-gradient-to-t from-surface via-surface/95 to-transparent -mx-3 -mb-3 sm:-mx-4 sm:-mb-4 p-2.5 sm:p-3.5 rounded-b-2xl border-t border-border/20">
        <h3 className="text-xs sm:text-sm md:text-base font-bold text-text-primary truncate tracking-tight">
          {item.title}
        </h3>
        <p className="text-[0.65rem] sm:text-xs text-text-secondary line-clamp-1 leading-tight">
          {item.subtitle}
        </p>
      </div>
    </motion.div>
  );
}
