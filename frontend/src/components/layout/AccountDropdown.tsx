"use client";

/* Profile images are supplied by external OAuth providers. */
/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import Link from "next/link";
import {
  ChevronDown,
  CreditCard,
  LogOut,
  Pencil,
  Shield,
  Utensils,
} from "lucide-react";
import { ROUTES } from "@/config/routes";
import { useLanguage } from "@/i18n/LanguageProvider";
import { commonTranslations } from "@/i18n/common-translations";
import type { UserRole } from "@/features/auth/types/auth-types";
import { cn } from "@/lib/utils/cn";

export interface AccountDropdownUser {
  name: string;
  email?: string;
  avatarUrl?: string;
  role?: UserRole;
}

export interface AccountDropdownProps {
  user: AccountDropdownUser;
  isLoading?: boolean;
  onProfileClick?: () => void;
  onLogout?: () => void;
  className?: string;
}

export function AccountDropdown({
  user,
  isLoading = false,
  onProfileClick,
  onLogout,
  className,
}: AccountDropdownProps) {
  const { locale } = useLanguage();
  const t = commonTranslations[locale].accountMenu;

  const [failedAvatarUrl, setFailedAvatarUrl] = React.useState<string | null>(
    null
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
    <div ref={menuRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => {
          setIsMenuOpen((open) => !open);
          onProfileClick?.();
        }}
        aria-label={t.profileMenuLabel}
        aria-haspopup="menu"
        aria-expanded={isMenuOpen}
        aria-busy={isLoading}
        disabled={isLoading}
        title={isLoading ? t.loadingProfile : user.name}
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
          aria-label={t.profileMenuLabel}
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
              {t.editProfile}
            </Link>
            <Link
              href={ROUTES.FOOD_PROFILE.ALLERGIES}
              role="menuitem"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-primary hover:bg-surface-subtle"
            >
              <Utensils className="size-4 text-text-secondary" />
              {t.editFoodProfile}
            </Link>
            <Link
              href={ROUTES.PAYMENT_ACCOUNT}
              role="menuitem"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-primary hover:bg-surface-subtle"
            >
              <CreditCard className="size-4 text-text-secondary" />
              {t.paymentAccount}
            </Link>
            {user.role === "ADMIN" ? (
              <Link
                href={ROUTES.ADMIN}
                role="menuitem"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-primary hover:bg-surface-subtle"
              >
                <Shield className="size-4 text-text-secondary" />
                {t.adminConsole}
              </Link>
            ) : null}
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
              {t.logout}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
