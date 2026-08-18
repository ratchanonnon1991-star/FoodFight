"use client";

import * as React from "react";
import { Lightbulb, X } from "lucide-react";
import type { HomeTipData } from "../types/home-types";

export interface HomeTipCardProps {
  tip: HomeTipData;
  onDismiss?: () => void;
}

export function HomeTipCard({ tip, onDismiss }: HomeTipCardProps) {
  const [isVisible, setIsVisible] = React.useState<boolean>(true);

  if (!isVisible) return null;

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <aside
      aria-label="Helpful tip"
      className="p-3.5 sm:p-4 rounded-2xl border border-border/80 bg-surface shadow-xs flex items-start gap-3 relative animate-fade-in"
    >
      {/* Lightbulb Icon in soft container */}
      <div className="size-9 shrink-0 rounded-xl bg-surface-subtle border border-border/60 flex items-center justify-center text-text-primary shadow-2xs">
        <Lightbulb className="size-5 stroke-[2]" />
      </div>

      {/* Tip Content */}
      <div className="space-y-0.5 flex-1 pr-6">
        <p className="text-xs font-bold text-text-primary">
          {tip.title}
        </p>
        <p className="text-xs text-text-secondary leading-relaxed">
          {tip.text}
        </p>
      </div>

      {/* Dismiss X Button */}
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss tip"
        className="absolute top-3.5 right-3.5 text-text-muted hover:text-text-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary rounded-sm p-0.5 cursor-pointer"
      >
        <X className="size-4" />
      </button>
    </aside>
  );
}
