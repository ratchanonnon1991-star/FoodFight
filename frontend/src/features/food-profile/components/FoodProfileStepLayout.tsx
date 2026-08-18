"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { PageContainer } from "@/components/layout/PageContainer";
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
