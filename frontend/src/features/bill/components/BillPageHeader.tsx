"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { PageContainer } from "@/components/layout/PageContainer";
import { useLanguage } from "@/i18n/LanguageProvider";
import { billTranslations } from "../i18n/bill-translations";

export interface BillPageHeaderProps {
  title: string;
  subtitle?: string;
  backHref: string;
  rightSlot?: React.ReactNode;
  variant?: "default" | "atmosphere";
  className?: string;
}

export function BillPageHeader({
  title,
  subtitle,
  backHref,
  rightSlot,
  variant = "default",
  className,
}: BillPageHeaderProps) {
  const { locale } = useLanguage();
  const t = billTranslations[locale].header;

  const isAtmosphere = variant === "atmosphere";

  return (
    <header
      className={cn(
        "w-full transition-colors",
        isAtmosphere
          ? "border-none bg-transparent relative z-10"
          : "border-b border-border/40 bg-surface/75 backdrop-blur-md sticky top-0 z-10",
        className,
      )}
    >
      <PageContainer maxWidth="auth" paddingY="none" className="py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          <Link
            href={backHref}
            className={cn(
              "inline-flex items-center gap-1 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary rounded-sm p-1 -ml-1",
              isAtmosphere
                ? "text-white/90 hover:text-white"
                : "text-text-primary hover:text-brand-primary",
            )}
            aria-label={t.goBack}
          >
            <ChevronLeft className="size-5" />
            <span>{t.back}</span>
          </Link>

          <div className="flex-1 text-center px-2">
            <h1
              className={cn(
                "text-base font-semibold truncate",
                isAtmosphere ? "text-white drop-shadow-sm font-extrabold" : "text-text-primary",
              )}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className={cn(
                  "text-xs truncate",
                  isAtmosphere ? "text-white/85 font-medium" : "text-text-secondary",
                )}
              >
                {subtitle}
              </p>
            )}
          </div>

          <div className="min-w-8 flex justify-end">{rightSlot}</div>
        </div>
      </PageContainer>
    </header>
  );
}
