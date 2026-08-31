"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Sparkles, Utensils } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils/cn";
import { useHomeLanguage } from "../i18n/HomeLanguageContext";

export interface HomeFoodProfileCardProps {
  className?: string;
}

export function HomeFoodProfileCard({ className }: HomeFoodProfileCardProps) {
  const { t } = useHomeLanguage();

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/80 bg-surface p-5 shadow-xs hover:border-brand-primary/40 hover:shadow-md transition-all duration-200 select-none",
        className
      )}
    >
      {/* Decorative 1:1 Media Slot (Lower-Right Background Watermark) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-3 -right-3 z-0 flex size-20 sm:size-24 aspect-square items-center justify-center rounded-3xl"
      >
        <div className="flex size-full items-center justify-center rounded-3xl border border-accent-fresh/15 bg-gradient-to-br from-accent-fresh/10 to-transparent text-accent-fresh/20 transition-transform duration-300 group-hover:scale-105">
          <Utensils className="size-10 sm:size-12 stroke-[1.4]" />
        </div>
      </div>

      {/* Main Content Stack */}
      <div className="relative z-10 flex flex-col justify-between h-full space-y-3">
        {/* Top: Icon Badge & Section Heading */}
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-accent-fresh/15 text-accent-fresh border border-accent-fresh/25 shadow-2xs">
            <Sparkles className="size-4 sm:size-5 stroke-[2.2]" />
          </div>
          <h3 className="text-sm sm:text-base font-extrabold text-text-primary tracking-tight">
            {t.foodProfile.heading}
          </h3>
        </div>

        {/* Supporting Copy */}
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed pr-10">
          {t.foodProfile.body}
        </p>

        {/* Action Link Button */}
        <div className="pt-1">
          <Link
            href={ROUTES.FOOD_PROFILE.ALLERGIES}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-brand-primary hover:text-brand-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring rounded-md transition-colors"
          >
            <span>{t.foodProfile.actionCta}</span>
            <ChevronRight className="size-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
