"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft, Eye } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { PageContainer } from "@/components/layout/PageContainer";
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
}

function PreviewTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-brand-primary/20 bg-brand-primary/5 px-2.5 py-1 text-xs font-semibold text-text-primary">
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
  const hasAllergies = draft.allergies.length > 0 || Boolean(draft.otherAllergies.trim());
  const hasRestrictions =
    draft.restrictions.length > 0 || Boolean(draft.otherRestrictions.trim());

  return (
    <section
      aria-label="Food profile preview"
      className="rounded-2xl border border-brand-primary/15 bg-surface p-4 shadow-xs sm:p-5"
    >
      <div className="flex items-start gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
          <Eye className="size-4.5" />
        </div>
        <div className="min-w-0">
          <h2 className="text-sm font-bold text-text-primary">Current profile preview</h2>
          <p className="mt-0.5 text-xs leading-relaxed text-text-secondary">
            Your saved preferences are shown here and update as you edit.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
            Allergies
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {draft.hasNoAllergies ? (
              <span className="rounded-full bg-surface-subtle px-2.5 py-1 text-xs font-semibold text-text-secondary">
                No allergies
              </span>
            ) : hasAllergies ? (
              <>
                {draft.allergies.map((allergy) => (
                  <PreviewTag key={allergy}>
                    {getOptionLabel(allergy, STANDARD_ALLERGIES)}
                  </PreviewTag>
                ))}
                {draft.otherAllergies.trim() ? (
                  <PreviewTag>{draft.otherAllergies.trim()}</PreviewTag>
                ) : null}
              </>
            ) : (
              <span className="text-xs text-text-muted">Not selected yet</span>
            )}
          </div>
        </div>

        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
            Dietary restrictions
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {draft.hasNoRestrictions ? (
              <span className="rounded-full bg-surface-subtle px-2.5 py-1 text-xs font-semibold text-text-secondary">
                No restrictions
              </span>
            ) : hasRestrictions ? (
              <>
                {draft.restrictions.map((restriction) => (
                  <PreviewTag key={restriction}>
                    {getOptionLabel(restriction, STANDARD_RESTRICTIONS)}
                  </PreviewTag>
                ))}
                {draft.otherRestrictions.trim() ? (
                  <PreviewTag>{draft.otherRestrictions.trim()}</PreviewTag>
                ) : null}
              </>
            ) : (
              <span className="text-xs text-text-muted">Not selected yet</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 border-t border-border/60 pt-3">
        <p className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
          Additional nuances
        </p>
        <p className="mt-1 text-xs leading-relaxed text-text-secondary">
          {draft.additionalNotes.trim() || "Not added yet"}
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
}: FoodProfileStepLayoutProps) {
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
                aria-label="Go back to previous step"
              >
                <ChevronLeft className="size-5" />
                <span>Back</span>
              </Link>
            ) : onBack ? (
              <button
                type="button"
                onClick={onBack}
                className="inline-flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-brand-primary transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary rounded-sm p-1 -ml-1"
                aria-label="Go back to previous step"
              >
                <ChevronLeft className="size-5" />
                <span>Back</span>
              </button>
            ) : (
              <div className="w-16" />
            )}

            {/* Step Counter */}
            <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Step {currentStep} of 3
            </span>

            {/* Balancer spacing */}
            <div className="w-16" />
          </div>

          {/* 3-Step Progress Indicator */}
          <StepProgress currentStep={currentStep} />
        </PageContainer>
      </header>

      {/* Main Content Area */}
      <main className={cn("flex-1 py-6 sm:py-8", className)}>
        <PageContainer maxWidth="auth" paddingY="none" className="space-y-6">
          {/* Question & Supporting Text */}
          <div className="space-y-1.5 text-left">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary">
              {title}
            </h1>
            <p className="text-sm text-text-secondary leading-relaxed">
              {description}
            </p>
          </div>

          <FoodProfilePreview />

          {/* Step Content */}
          <div className="space-y-4">
            {children}
          </div>
        </PageContainer>
      </main>

      {/* Sticky / Bottom Footer */}
      {footer && (
        <footer className="w-full border-t border-border/40 bg-surface/90 backdrop-blur-xs py-4">
          <PageContainer maxWidth="auth" paddingY="none">
            {footer}
          </PageContainer>
        </footer>
      )}
    </div>
  );
}
