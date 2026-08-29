"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/config/routes";

import { cn } from "@/lib/utils/cn";
import { PageContainer } from "./PageContainer";
import { useLanguage } from "@/i18n/LanguageProvider";
import { commonTranslations } from "@/i18n/common-translations";
import { GlassSurface } from "@/components/ui/GlassSurface";
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

  const isLandingPage = pathname === "/";
  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/verify-email") ||
    pathname.startsWith("/verification-success") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/change-email") ||
    pathname.startsWith("/auth");

  const isAtmosphericPage = !isLandingPage && !isAuthPage;


  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const threshold =
        pathname === "/" ||
        pathname === "/home" ||
        pathname === ROUTES.AUTHENTICATED_HOME
          ? 340
          : 100;
      setIsScrolled(window.scrollY > threshold);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isOverHeroAtmosphere = isAtmosphericPage && !isScrolled;


  return (
    <header
      data-navigation="top"
      className={cn(
        "sticky top-0 z-30 hidden h-16 bg-transparent pointer-events-none lg:block",
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
          className={cn(
            "shrink-0 text-xl font-extrabold tracking-tight flex items-center gap-1.5 transition-colors duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring pointer-events-auto",
            isOverHeroAtmosphere
              ? "text-white drop-shadow-xs"
              : "text-brand-primary drop-shadow-2xs",
          )}
          aria-label="FoodFighter Home"
        >
          <span>FoodFighter</span>
          <span className="text-xl">🌶️</span>
        </Link>

        <nav
          aria-label={t.mainNavigation}
          className="absolute left-1/2 -translate-x-1/2 pointer-events-auto"
        >


          <div
            className="flex items-center p-1 rounded-full bg-black/25 backdrop-blur-md border border-white/20 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.3),0_4px_12px_rgba(0,0,0,0.15)]"
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
                        "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm transition-all select-none",
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring",
                        isActive
                          ? "bg-white font-bold text-brand-primary shadow-xs"
                          : "font-medium text-white/80 hover:text-white hover:bg-white/10 hover:-translate-y-0.25 active:translate-y-0 active:scale-[0.98]",
                      )}
                    >
                      <Icon
                        className={cn(
                          "size-4.5",
                          isActive ? "stroke-[2.5] text-brand-primary" : "stroke-[1.8] text-white/80",
                        )}
                        aria-hidden="true"
                      />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>


        <div className="flex items-center gap-3 w-10 shrink-0" />
      </PageContainer>
    </header>
  );
}
