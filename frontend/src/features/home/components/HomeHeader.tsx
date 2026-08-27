"use client";

/* Profile images are supplied by external OAuth providers. */
/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import Link from "next/link";
import {
  Bell,
  ChevronDown,
  CreditCard,
  LogOut,
  Pencil,
  Utensils,
} from "lucide-react";
import { ROUTES } from "@/config/routes";
import { pageTypography } from "@/components/layout/PageContainer";
import { cn } from "@/lib/utils/cn";
import type { AuthenticatedUserDisplay } from "../types/home-types";
import { useHomeLanguage } from "../i18n/HomeLanguageContext";
import { HomeLanguageSwitcher } from "./HomeLanguageSwitcher";

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
  const [failedAvatarUrl, setFailedAvatarUrl] = React.useState<string | null>(
    null,
  );
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  const initial = user.name.trim().charAt(0).toUpperCase() || "?";

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
                "truncate font-extrabold text-text-primary",
              )}
            >
              {t.header.greeting(user.name)} 👋
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary">
              {t.header.greetingSubtitle}
            </p>
          </>
        )}
      </div>

      {/* Header Actions */}
      <div className="flex shrink-0 items-center gap-2 pt-0.5 lg:fixed lg:right-10 lg:top-3 lg:z-40 2xl:right-[calc((100vw-1440px)/2+2.5rem)]">
        {/* Language Switcher Dropdown */}
        <HomeLanguageSwitcher />

        {/* Notification Bell (Dormant Control preserved) */}
        <button
          type="button"
          onClick={onNotificationClick}
          aria-label={t.header.notificationsLabel}
          className="size-10 rounded-full border border-border/80 bg-surface flex items-center justify-center text-text-secondary hover:text-brand-primary hover:border-brand-primary/50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring cursor-pointer shadow-2xs"
        >
          <Bell className="size-5" />
        </button>

        {/* User Profile Avatar Button */}
        <div ref={menuRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen((open) => !open);
              onProfileClick?.();
            }}
            aria-label={t.header.profileMenuLabel}
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            aria-busy={isLoading}
            disabled={isLoading}
            title={isLoading ? "Loading profile" : user.name}
            className="flex items-center gap-1 rounded-full p-0.5 text-text-secondary transition-colors hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring disabled:cursor-wait"
          >
            <span className="size-10 rounded-full border border-border/80 bg-surface flex items-center justify-center shadow-2xs">
              {isLoading ? (
                <span
                  className="size-full animate-pulse rounded-full bg-surface-subtle"
                  aria-hidden="true"
                />
              ) : user.avatarUrl && failedAvatarUrl !== user.avatarUrl ? (
                <img
                  key={user.avatarUrl}
                  src={user.avatarUrl}
                  alt={`${user.name}'s profile`}
                  className="size-full rounded-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={() => setFailedAvatarUrl(user.avatarUrl ?? null)}
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="flex size-full items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white"
                >
                  {initial}
                </span>
              )}
            </span>
            <ChevronDown
              className={`size-4 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
          </button>

          {isMenuOpen && !isLoading ? (
            <div
              role="menu"
              aria-label={t.header.profileMenuLabel}
              className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-border bg-surface shadow-lg"
            >
              <div className="border-b border-border-subtle px-4 py-3">
                <p className="truncate text-sm font-bold text-text-primary">
                  {user.name}
                </p>
                {user.email ? (
                  <p className="truncate text-xs text-text-secondary">
                    {user.email}
                  </p>
                ) : null}
              </div>

              <div className="p-1.5">
                <Link
                  href={ROUTES.PROFILE}
                  role="menuitem"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-primary hover:bg-surface-subtle"
                >
                  <Pencil className="size-4 text-text-secondary" />
                  {t.header.editProfile}
                </Link>
                <Link
                  href={ROUTES.FOOD_PROFILE.ALLERGIES}
                  role="menuitem"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-primary hover:bg-surface-subtle"
                >
                  <Utensils className="size-4 text-text-secondary" />
                  {t.header.editFoodProfile}
                </Link>
                <Link
                  href={ROUTES.PAYMENT_ACCOUNT}
                  role="menuitem"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-primary hover:bg-surface-subtle"
                >
                  <CreditCard className="size-4 text-text-secondary" />
                  {t.header.paymentAccount}
                </Link>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsMenuOpen(false);
                    onLogout?.();
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-status-danger-text hover:bg-status-danger-bg"
                >
                  <LogOut className="size-4" />
                  {t.header.logout}
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
