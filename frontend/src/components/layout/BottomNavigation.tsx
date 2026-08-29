"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { useLanguage } from "@/i18n/LanguageProvider";
import { commonTranslations } from "@/i18n/common-translations";
import {
  getActiveNavigationTab,
  getNavigationItems,
  type NavTab,
} from "./navigation-config";

export type { NavTab } from "./navigation-config";

export interface BottomNavigationProps {
  activeTab?: NavTab;
  className?: string;
}

export function BottomNavigation({
  activeTab,
  className,
}: BottomNavigationProps) {
  const pathname = usePathname();
  const { locale } = useLanguage();
  const resolvedActiveTab = getActiveNavigationTab(pathname, activeTab);
  const items = getNavigationItems(locale);
  const t = commonTranslations[locale].nav;

  return (
    <nav
      aria-label={t.mainNavigation}
      data-navigation="bottom"
      className={cn(
        "fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-30 mx-auto max-w-md",
        "rounded-full border border-border/80 bg-surface/95 p-1.5 shadow-lg backdrop-blur-md lg:hidden",
        className,
      )}
    >
      <ul className="flex items-center justify-around gap-1" role="list">
        {items.map((tab) => {
          const isActive = tab.id === resolvedActiveTab;
          const Icon = tab.icon;

          return (
            <li key={tab.id} className="flex-1">
              <Link
                href={tab.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center justify-center gap-0.5 rounded-full py-1.5 px-2 transition-all select-none",
                  "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus-ring",
                  isActive
                    ? "bg-surface-subtle font-bold text-brand-primary shadow-2xs"
                    : "text-text-secondary hover:bg-surface-subtle/50 hover:text-text-primary",
                )}
              >
                <Icon
                  className={cn(
                    "size-5",
                    isActive ? "stroke-[2.5]" : "stroke-[1.8]",
                  )}
                />
                <span className="text-[0.65rem] leading-none sm:text-xs">
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
