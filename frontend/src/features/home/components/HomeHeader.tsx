"use client";

import * as React from "react";
import { pageTypography } from "@/components/layout/PageContainer";
import { HeaderUtilities } from "@/components/layout/HeaderUtilities";
import { cn } from "@/lib/utils/cn";
import type { AuthenticatedUserDisplay } from "../types/home-types";
import { useHomeLanguage } from "../i18n/HomeLanguageContext";


export interface HomeHeaderProps {
  user: AuthenticatedUserDisplay;
  isLoading?: boolean;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  onLogout?: () => void;
}

export function HomeHeader({
  user,
  isLoading = false,
  onNotificationClick,
  onProfileClick,
  onLogout,
}: HomeHeaderProps) {
  const { t } = useHomeLanguage();

  return (
    <header className="flex items-start justify-between gap-3 pt-2">
      {/* Greeting Text */}
      <div className="space-y-0.5 min-w-0">
        {isLoading ? (
          <div
            className="space-y-2"
            role="status"
            aria-live="polite"
            aria-label="Loading profile"
          >
            <div className="h-9 w-64 max-w-full animate-pulse rounded-lg bg-surface-subtle sm:h-11" />
            <div className="h-4 w-52 max-w-full animate-pulse rounded bg-surface-subtle" />
          </div>
        ) : (
          <>
            <h1
              className={cn(
                pageTypography.title,
                "truncate font-extrabold text-white drop-shadow-xs",
              )}
            >
              {t.header.greeting(user.name)} 👋
            </h1>
            <p className="text-xs sm:text-sm text-white/80">
              {t.header.greetingSubtitle}
            </p>

          </>
        )}
      </div>

      {/* Header Actions */}
      <HeaderUtilities
        user={user}
        isLoading={isLoading}
        onNotificationClick={onNotificationClick}
        onProfileClick={onProfileClick}
        onLogout={onLogout}
        className="lg:fixed lg:right-10 lg:top-3 lg:z-40 2xl:right-[calc((100vw-1440px)/2+2.5rem)]"
      />
    </header>

  );
}
