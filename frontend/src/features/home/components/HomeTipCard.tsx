"use client";

import * as React from "react";
import { Lightbulb, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { HomeTipData } from "../types/home-types";
import { useHomeLanguage } from "../i18n/HomeLanguageContext";

export interface HomeTipCardProps {
  tip?: HomeTipData;
  onDismiss?: () => void;
  className?: string;
}

export function HomeTipCard({ tip, onDismiss, className }: HomeTipCardProps) {
  const { t } = useHomeLanguage();
  const [isVisible, setIsVisible] = React.useState<boolean>(true);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  const resolvedTitle = tip?.title && tip.title !== "Tip" ? tip.title : t.tip.heading;
  const resolvedText = tip?.text && !tip.text.includes("The more accurate") ? tip.text : t.tip.text;

  return (
    <aside
      aria-label={resolvedTitle}
      className={cn(
        "group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-surface p-5 shadow-xs transition-all duration-200 select-none animate-fade-in",
        className
      )}
    >
      {/* Decorative 1:1 Media Slot (Lower-Right Background Watermark) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-3 -right-3 z-0 flex size-20 sm:size-24 aspect-square items-center justify-center rounded-3xl"
      >
        <div className="flex size-full items-center justify-center rounded-3xl border border-accent-energy/20 bg-gradient-to-br from-accent-energy/10 to-transparent text-brand-secondary/20 transition-transform duration-300 group-hover:scale-105">
          <Lightbulb className="size-10 sm:size-12 stroke-[1.4]" />
        </div>
      </div>

      {/* Main Content Stack */}
      <div className="relative z-10 flex flex-col justify-between h-full space-y-2.5 pr-6">
        {/* Header Row: Saffron Icon Badge & Section Heading */}
        <div className="flex items-center gap-2.5">
          <div className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-xl bg-accent-energy/15 text-brand-secondary border border-accent-energy/30 shadow-2xs">
            <Sparkles className="size-4 stroke-[2.2]" />
          </div>
          <h3 className="text-sm sm:text-base font-extrabold text-text-primary tracking-tight">
            {resolvedTitle}
          </h3>
        </div>

        {/* Tip Body Copy */}
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          {resolvedText}
        </p>
      </div>

      {/* Dismiss X Button (44px touch target) */}
      <button
        type="button"
        onClick={handleDismiss}
        aria-label={t.tip.dismissLabel}
        className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-lg text-text-muted hover:text-text-primary hover:bg-surface-subtle transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring cursor-pointer"
      >
        <X className="size-4 stroke-[2]" />
      </button>
    </aside>
  );
}
