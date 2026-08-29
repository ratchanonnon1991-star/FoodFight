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
  const prevDiffRef = React.useRef(diff);
  const isWrapping = Math.abs(diff - prevDiffRef.current) > 2;

  React.useEffect(() => {
    prevDiffRef.current = diff;
  }, [diff]);

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
        scale: isActive ? 1.04 : 0.95,
        opacity: isActive ? 1 : Math.abs(diff) === 1 ? 0.95 : 0.80,
      }}
      transition={
        isWrapping
          ? { duration: 0 }
          : {
              duration: 0.65,
              ease: [0.25, 1, 0.5, 1],
            }
      }
      style={{ zIndex }}
      className={cn(
        "group absolute flex flex-col justify-between overflow-hidden rounded-3xl cursor-pointer select-none",
        "aspect-[4/5] p-3.5 sm:p-4.5",
        "w-[185px] xs:w-[195px] sm:w-[210px] md:w-[225px]",
        isActive
          ? "border-2 border-brand-primary bg-white shadow-[0_12px_32px_rgba(216,74,50,0.25)] ring-2 ring-brand-primary/20"
          : "border border-white/60 bg-[#FAF7F2]/80 backdrop-blur-md shadow-sm hover:border-white/90"
      )}
    >

      {/* 4:5 Real Background Image with Natural Faded Overlay */}
      {item.imageSrc ? (
        <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
          <Image
            src={item.imageSrc}
            alt={item.title}
            fill
            sizes="(max-width: 640px) 195px, (max-width: 1024px) 210px, 225px"
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            priority={index === 0}
          />
          {/* Natural soft gradient fade merging food into card base */}
          <div
            className={cn(
              "absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t pointer-events-none",
              isActive
                ? "from-white via-white/80 to-transparent"
                : "from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent"
            )}
          />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/15 to-transparent pointer-events-none" />
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
            "rounded-full px-3 py-1 text-[0.65rem] sm:text-[0.7rem] font-bold tracking-wide transition-colors shadow-2xs",
            isActive
              ? "bg-white text-brand-primary border border-brand-primary/20"
              : "bg-white/90 backdrop-blur-xs text-text-secondary border border-white/70"
          )}
        >
          {item.tag}
        </span>
        <div
          className={cn(
            "size-7 sm:size-8 rounded-full flex items-center justify-center shadow-2xs transition-colors shrink-0",
            isActive
              ? "bg-brand-primary text-white"
              : "bg-white/90 backdrop-blur-xs text-text-secondary border border-white/70"
          )}
        >
          <CardIcon name={item.iconName} />
        </div>
      </div>

      {/* Card Footer: Category Title & Subtitle sitting over the natural fade */}
      <div className="relative z-10 pt-2 space-y-0.5">
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
