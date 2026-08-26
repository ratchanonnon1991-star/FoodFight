"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";
import { PageContainer } from "./PageContainer";
import {
  getActiveNavigationTab,
  navigationItems,
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
  const resolvedActiveTab = getActiveNavigationTab(pathname, activeTab);

  return (
    <nav
      aria-label="Main Navigation"
      data-navigation="bottom"
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-border/80 bg-surface/95 py-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))] shadow-lg backdrop-blur-md lg:hidden",
        className,
      )}
    >
      <PageContainer maxWidth="standard" paddingY="none">
        <ul className="flex items-center justify-around gap-1.5" role="list">
          {navigationItems.map((tab) => {
            const isActive = tab.id === resolvedActiveTab;
            const Icon = tab.icon;

            return (
              <li key={tab.id} className="flex-1">
                <Link
                  href={tab.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 rounded-2xl px-3 py-1.5 transition-all select-none",
                    "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-secondary",
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
                  <span className="text-2xs leading-none sm:text-xs">
                    {tab.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </PageContainer>
    </nav>
  );
}
