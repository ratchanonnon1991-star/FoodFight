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
  className?: string;
}

export function BillPageHeader({
  title,
  subtitle,
  backHref,
  rightSlot,
  className,
}: BillPageHeaderProps) {
  const { locale } = useLanguage();
  const t = billTranslations[locale].header;

  return (
    <header
      className={cn(
        "w-full border-b border-border/40 bg-surface/80 backdrop-blur-xs sticky top-0 z-10",
        className,
      )}
    >
      <PageContainer maxWidth="auth" paddingY="none" className="py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1 text-sm font-medium text-text-secondary hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary rounded-sm p-1 -ml-1"
            aria-label={t.goBack}
          >
            <ChevronLeft className="size-5" />
            <span>{t.back}</span>
          </Link>

          <div className="flex-1 text-center px-2">
            <h1 className="text-base font-semibold text-text-primary truncate">
              {title}
            </h1>
            {subtitle && (
              <p className="text-xs text-text-secondary truncate">{subtitle}</p>
            )}
          </div>

          <div className="min-w-8 flex justify-end">{rightSlot}</div>
        </div>
      </PageContainer>
    </header>
  );
}
