"use client";

import * as React from "react";
import { Sparkles, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface RecommendationFoodMediaProps {
  imageUrl?: string | null;
  alt: string;
  orderNumber: number;
  compatibilityPercentage?: number | null;
  statusBadge?: React.ReactNode;
  className?: string;
}

export function RecommendationFoodMedia({
  imageUrl,
  alt,
  orderNumber,
  compatibilityPercentage,
  statusBadge,
  className,
}: RecommendationFoodMediaProps) {
  const [imageError, setImageError] = React.useState(false);
  const showImage = Boolean(imageUrl && !imageError);

  return (
    <div
      className={cn(
        "relative z-10 w-[38%] sm:w-[36%] md:w-[34%] shrink-0 rounded-2xl sm:rounded-3xl border-2 bg-surface overflow-hidden flex flex-col justify-between select-none transition-all duration-300 aspect-[4/5] sm:aspect-square",
        className,
      )}
    >
      {/* 1. Food Visual or Designed Fallback */}
      {showImage ? (
        <img
          src={imageUrl ?? undefined}
          alt={alt}
          onError={() => setImageError(true)}
          className="size-full object-cover"
        />
      ) : (
        <FoodGraphicPlaceholder orderNumber={orderNumber} name={alt} />
      )}

      {/* 2. Top Badges (#1 and Match %) */}
      <div className="absolute inset-x-2.5 top-2.5 flex items-center justify-between z-10">
        <span className="flex size-7 sm:size-8 items-center justify-center rounded-xl bg-black/70 border border-white/20 text-[11px] sm:text-xs font-black text-white shadow-md backdrop-blur-md">
          #{orderNumber}
        </span>
        {compatibilityPercentage != null ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-accent-fresh border border-white/20 px-2 py-0.5 text-[10px] sm:text-[11px] font-extrabold text-white shadow-md">
            <Sparkles className="size-2.5 stroke-[2.5]" />
            <span>{compatibilityPercentage}%</span>
          </span>
        ) : null}
      </div>

      {/* 3. Floating Selected Status Badge over image */}
      {statusBadge ? (
        <div className="absolute bottom-2 left-2 z-10">{statusBadge}</div>
      ) : null}

      {/* 4. Bottom subtle media shadow */}
      <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
    </div>
  );
}

function FoodGraphicPlaceholder({
  name,
}: {
  orderNumber: number;
  name: string;
}) {
  return (
    <div className="size-full bg-gradient-to-br from-amber-500/15 via-brand-primary/10 to-orange-500/20 flex flex-col items-center justify-center p-3 text-center select-none">
      <div className="size-11 sm:size-13 rounded-2xl bg-surface/90 border border-brand-primary/20 shadow-xs flex items-center justify-center text-brand-primary mb-1.5">
        <UtensilsCrossed className="size-5 sm:size-6 stroke-[1.8]" />
      </div>
      <span className="text-[11px] font-bold text-text-secondary truncate max-w-[90%]">
        {name}
      </span>
    </div>
  );
}
