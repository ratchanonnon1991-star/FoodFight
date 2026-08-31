"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { useLanguage } from "@/i18n/LanguageProvider";
import { commonTranslations } from "@/i18n/common-translations";
import { GlassSurface } from "@/components/ui/GlassSurface";
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
      className="lg:hidden"
    >
      <div
        className={cn(
          "fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-40 mx-auto max-w-md p-1.5 rounded-full",
          "bg-black/35 backdrop-blur-xl border border-white/20 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.25),0_8px_24px_rgba(0,0,0,0.25)]",
          className,
        )}
      >
        <ul className="flex items-center justify-between gap-1" role="list">
          {items.map((tab) => {
            const isActive = tab.id === resolvedActiveTab;
            const Icon = tab.icon;

            return (
              <li key={tab.id} className="flex-1 min-w-0">
                <Link
                  href={tab.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center justify-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs sm:text-sm transition-all select-none whitespace-nowrap",
                    "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus-ring",
                    isActive
                      ? "bg-white font-bold text-brand-primary shadow-xs"
                      : "font-medium text-white/80 hover:text-white hover:bg-white/10 active:scale-[0.96]",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-4 shrink-0",
                      isActive ? "stroke-[2.5] text-brand-primary" : "stroke-[1.8] text-white/80",
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">
                    {tab.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
