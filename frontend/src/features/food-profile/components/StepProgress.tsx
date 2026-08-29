"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { useLanguage } from "@/i18n/LanguageProvider";
import { foodProfileTranslations } from "../i18n/food-profile-translations";

export interface StepProgressProps {
  currentStep: number;
  className?: string;
}

export function StepProgress({ currentStep, className }: StepProgressProps) {
  const { locale } = useLanguage();
  const t = foodProfileTranslations[locale].steps;

  const stepsConfig = [
    { step: 1, label: t.allergies },
    { step: 2, label: t.restrictions },
    { step: 3, label: t.details },
  ];

  return (
    <nav aria-label={t.ariaLabel} className={cn("w-full", className)}>
      <ol className="flex items-center justify-between gap-2" role="list">
        {stepsConfig.map(({ step, label }, index) => {
          const isActive = step === currentStep;
          const isCompleted = step < currentStep;

          return (
            <li
              key={step}
              className="flex-1 flex flex-col items-center gap-1.5"
              aria-current={isActive ? "step" : undefined}
            >
              {/* Step indicator bar / circle */}
              <div className="w-full flex items-center">
                <div
                  className={cn(
                    "h-1.5 w-full rounded-full transition-colors duration-200",
                    isCompleted
                      ? "bg-brand-primary"
                      : isActive
                      ? "bg-brand-primary"
                      : "bg-surface-subtle"
                  )}
                />
              </div>

              {/* Step Label */}
              <div className="flex items-center gap-1 text-xs">
                <span
                  className={cn(
                    "font-semibold transition-colors duration-150",
                    isActive
                      ? "text-brand-primary font-bold"
                      : isCompleted
                      ? "text-text-primary"
                      : "text-text-muted"
                  )}
                >
                  {index + 1}. {label}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
