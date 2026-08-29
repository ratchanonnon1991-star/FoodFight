"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils/cn";
import { PageContainer } from "./PageContainer";
import { useLanguage } from "@/i18n/LanguageProvider";
import { commonTranslations } from "@/i18n/common-translations";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";
import {
  getActiveNavigationTab,
  getNavigationItems,
  type NavTab,
} from "./navigation-config";

export interface TopNavigationProps {
  activeTab?: NavTab;
  className?: string;
}

export function TopNavigation({ activeTab, className }: TopNavigationProps) {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const resolvedActiveTab = getActiveNavigationTab(pathname, activeTab);
  const items = getNavigationItems(locale);
  const t = commonTranslations[locale].nav;

  return (
    <header
      data-navigation="top"
      className={cn(
        "sticky top-0 z-30 hidden h-16 border-b border-border/80 bg-surface/95 shadow-xs backdrop-blur-md lg:block",
        className,
      )}
    >
      <PageContainer
        maxWidth="wide"
        paddingY="none"
        className="relative flex h-full items-center justify-between gap-8"
      >
        <Link
          href={ROUTES.AUTHENTICATED_HOME}
          className="shrink-0 text-xl font-bold tracking-tight text-brand-primary transition-colors hover:text-brand-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
          aria-label="FoodFighter Home"
        >
          FoodFighter
        </Link>

        <nav
          aria-label={t.mainNavigation}
          className="absolute left-1/2 -translate-x-1/2"
        >
          <ul className="flex items-center justify-center gap-1" role="list">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === resolvedActiveTab;

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm transition-colors",
                      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
                      isActive
                        ? "bg-surface-subtle font-bold text-brand-primary"
                        : "font-medium text-text-secondary hover:bg-surface-subtle/70 hover:text-text-primary",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-4.5",
                        isActive ? "stroke-[2.5]" : "stroke-[1.8]",
                      )}
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher variant="subtle" />
        </div>
      </PageContainer>
    </header>
  );
}
