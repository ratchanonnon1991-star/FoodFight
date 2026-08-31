"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, Eye } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { PageContainer } from "@/components/layout/PageContainer";
import { Spinner } from "@/components/ui/Spinner";
import { useLanguage } from "@/i18n/LanguageProvider";
import { foodProfileTranslations } from "../i18n/food-profile-translations";
import {
  STANDARD_ALLERGIES,
  STANDARD_RESTRICTIONS,
} from "../constants/food-profile-constants";
import { useFoodProfile } from "../context/food-profile-context";
import { StepProgress } from "./StepProgress";

export interface FoodProfileStepLayoutProps {
  currentStep: number;
  title: string;
  description: string;
  backHref?: string;
  onBack?: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  previewPosition?: "top" | "bottom" | "none";
}

function PreviewTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-accent-fresh/30 bg-accent-fresh/10 px-2.5 py-1 text-xs font-semibold text-text-primary shadow-2xs">
      {children}
    </span>
  );
}

function getOptionLabel(
  id: string,
  options: ReadonlyArray<{ id: string; label: string }>,
) {
  return options.find((option) => option.id === id)?.label ?? id;
}

function FoodProfilePreview() {
  const { draft } = useFoodProfile();
  const { locale } = useLanguage();
  const t = foodProfileTranslations[locale];
  const p = t.preview;

  const hasAllergies =
    draft.allergies.length > 0 || Boolean(draft.otherAllergies.trim());
  const hasRestrictions =
    draft.restrictions.length > 0 || Boolean(draft.otherRestrictions.trim());

  return (
    <section
      aria-label={p.title}
      className="rounded-2xl border border-border bg-surface p-4 sm:p-4.5 text-xs shadow-2xs"
    >
      <div className="flex items-center gap-2.5">
        <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-accent-fresh/15 text-accent-fresh">
          <Eye className="size-4" />
        </div>
        <div className="min-w-0">
          <h2 className="text-xs sm:text-sm font-bold text-text-primary">
            {p.title}
          </h2>
          <p className="text-[11px] sm:text-xs text-text-secondary leading-normal">
            {p.subtitle}
          </p>
        </div>
      </div>

      <div className="mt-3.5 grid gap-3 sm:grid-cols-2">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
            {p.allergies}
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {draft.hasNoAllergies ? (
              <span className="rounded-lg bg-surface-subtle border border-border px-2.5 py-1 text-xs font-medium text-text-secondary">
                {p.noAllergies}
              </span>
            ) : hasAllergies ? (
              <>
                {draft.allergies.map((allergy) => (
                  <PreviewTag key={allergy}>
                    {t.allergies.options[allergy] ??
                      getOptionLabel(allergy, STANDARD_ALLERGIES)}
                  </PreviewTag>
                ))}
                {draft.otherAllergies.trim() ? (
                  <PreviewTag>{draft.otherAllergies.trim()}</PreviewTag>
                ) : null}
              </>
            ) : (
              <span className="text-xs text-text-secondary">{p.notSelected}</span>
            )}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
            {p.restrictions}
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {draft.hasNoRestrictions ? (
              <span className="rounded-lg bg-surface-subtle border border-border px-2.5 py-1 text-xs font-medium text-text-secondary">
                {p.noRestrictions}
              </span>
            ) : hasRestrictions ? (
              <>
                {draft.restrictions.map((restriction) => (
                  <PreviewTag key={restriction}>
                    {t.restrictions.options[restriction] ??
                      getOptionLabel(restriction, STANDARD_RESTRICTIONS)}
                  </PreviewTag>
                ))}
                {draft.otherRestrictions.trim() ? (
                  <PreviewTag>{draft.otherRestrictions.trim()}</PreviewTag>
                ) : null}
              </>
            ) : (
              <span className="text-xs text-text-secondary">{p.notSelected}</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-3.5 border-t border-border/60 pt-2.5">
        <p className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
          {p.nuances}
        </p>
        <p className="mt-1 text-xs font-medium text-text-primary leading-relaxed">
          {draft.additionalNotes.trim() || (
            <span className="font-normal text-text-secondary">{p.notAdded}</span>
          )}
        </p>
      </div>
    </section>
  );
}

export function FoodProfileStepLayout({
  currentStep,
  title,
  description,
  backHref,
  onBack,
  children,
  footer,
  className,
  previewPosition = "top",
}: FoodProfileStepLayoutProps) {
  const { isLoading } = useFoodProfile();
  const { locale } = useLanguage();
  const t = foodProfileTranslations[locale];

  const stepCounterText = t.layout.stepCounter
    .replace("{current}", String(currentStep))
    .replace("{total}", "3");

  return (
    <div className="min-h-dvh flex flex-col justify-between bg-background text-text-primary">
      {/* Top Header & Navigation */}
      <header className="w-full border-b border-border/40 bg-surface/80 backdrop-blur-xs sticky top-0 z-10">
        <PageContainer maxWidth="auth" paddingY="none" className="py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3 mb-3">
            {/* Back Button */}
            {backHref ? (
              <Link
                href={backHref}
                className="inline-flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary rounded-sm p-1 -ml-1"
                aria-label={t.layout.back}
              >
                <ChevronLeft className="size-5" />
                <span>{t.layout.back}</span>
              </Link>
            ) : onBack ? (
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-brand-primary transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary rounded-sm p-1 -ml-1"
                aria-label={t.layout.back}
              >
                <ChevronLeft className="size-5" />
                <span>{t.layout.back}</span>
              </button>
            ) : (
              <div className="w-16" />
            )}

            {/* Step Counter */}
            <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              {stepCounterText}
            </span>

            {/* Balancer spacing */}
            <div className="w-16" />
          </div>

          {/* 3-Step Progress Indicator */}
          <StepProgress currentStep={currentStep} />
        </PageContainer>
      </header>

      {/* Main Content Area */}
      <main className={cn("flex-1 pt-5 pb-10 sm:pt-6 sm:pb-12", className)}>
        <PageContainer maxWidth="auth" paddingY="none" className="space-y-6">
          {isLoading ? (
            <FoodProfileLoadingState />
          ) : (
            <>
              {/* Question & Supporting Text */}
              <div className="space-y-1.5 text-left">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
                  {title}
                </h1>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {description}
                </p>
              </div>

              {previewPosition === "top" && <FoodProfilePreview />}

              {/* Step Content */}

              <div className="space-y-4">
                {children}
              </div>

              {previewPosition === "bottom" && <FoodProfilePreview />}
            </>
          )}
        </PageContainer>
      </main>

      {/* Sticky / Bottom Footer */}
      {footer && !isLoading && (
        <footer className="sticky bottom-0 z-20 w-full border-t border-border/50 bg-surface/95 backdrop-blur-md py-3 sm:py-3.5 shadow-sm">
          <PageContainer maxWidth="auth" paddingY="none">
            {footer}
          </PageContainer>
        </footer>
      )}
    </div>
  );
}

function FoodProfileLoadingState() {
  const { locale } = useLanguage();
  const t = foodProfileTranslations[locale];

  return (
    <div
      className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-border/60 bg-surface p-6 text-center shadow-xs"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Spinner size="lg" />
      <p className="mt-4 text-sm font-semibold text-text-primary">
        {t.layout.loadingTitle}
      </p>
      <p className="mt-1 text-xs text-text-secondary">
        {t.layout.loadingSubtitle}
      </p>
    </div>
  );
}
