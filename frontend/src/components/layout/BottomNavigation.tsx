"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Home, Receipt, User } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils/cn";
import { PageContainer } from "./PageContainer";

export type NavTab = "home" | "history" | "bills" | "profile";

export interface BottomNavigationProps {
  activeTab?: NavTab;
  className?: string;
}

function detectActiveTab(pathname: string): NavTab {
  if (pathname.startsWith(ROUTES.BILLS)) {
    return "bills";
  }
  if (pathname.startsWith(ROUTES.HISTORY)) {
    return "history";
  }
  if (pathname.startsWith(ROUTES.PROFILE)) {
    return "profile";
  }
  return "home";
}

export function BottomNavigation({
  activeTab,
  className,
}: BottomNavigationProps) {
  const pathname = usePathname();
  const resolvedActiveTab = activeTab ?? detectActiveTab(pathname);
  const tabs = [
    {
      id: "home" as const,
      label: "Home",
      icon: Home,
      href: ROUTES.AUTHENTICATED_HOME,
      isAvailable: true,
    },
    {
      id: "history" as const,
      label: "History",
      icon: Clock,
      href: ROUTES.HISTORY,
      isAvailable: false,
    },
    {
      id: "bills" as const,
      label: "Bills",
      icon: Receipt,
      href: ROUTES.BILLS,
      isAvailable: true,
    },
    {
      id: "profile" as const,
      label: "Profile",
      icon: User,
      href: ROUTES.PROFILE,
      isAvailable: false,
    },
  ];

  return (
    <nav
      aria-label="Main Navigation"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-30 border-t border-border/80 bg-surface/95 backdrop-blur-md py-2.5 shadow-lg",
        className
      )}
    >
      <PageContainer maxWidth="auth" paddingY="none">
        <ul className="flex items-center justify-around gap-1.5" role="list">
          {tabs.map((tab) => {
            const isActive = tab.id === resolvedActiveTab;
            const Icon = tab.icon;

            return (
              <li key={tab.id} className="flex-1">
                {tab.isAvailable ? (
                  <Link
                    href={tab.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-2xl transition-all select-none",
                      "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-secondary",
                      isActive
                        ? "bg-surface-subtle text-brand-primary font-bold shadow-2xs"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-subtle/50"
                    )}
                  >
                    <Icon className={cn("size-5", isActive ? "stroke-[2.5]" : "stroke-[1.8]")} />
                    <span className="text-2xs sm:text-xs leading-none">{tab.label}</span>
                  </Link>
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-label={`${tab.label} (Coming soon)`}
                    className="w-full flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-2xl text-text-disabled cursor-not-allowed select-none opacity-60"
                  >
                    <Icon className="size-5 stroke-[1.8]" />
                    <span className="text-2xs sm:text-xs leading-none">{tab.label}</span>
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </PageContainer>
    </nav>
  );
}
