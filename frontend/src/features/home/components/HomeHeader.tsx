"use client";

import * as React from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import { ChevronDown, CreditCard, LogOut, Pencil, Utensils } from "lucide-react";
import { ROUTES } from "@/config/routes";
import type { AuthenticatedUserDisplay } from "../types/home-types";

export interface HomeHeaderProps {
  user: AuthenticatedUserDisplay;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  onLogout?: () => void;
}

export function HomeHeader({
  user,
  onNotificationClick,
  onProfileClick,
  onLogout,
}: HomeHeaderProps) {
  const [imageFailed, setImageFailed] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setImageFailed(false);
  }, [user.avatarUrl]);

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
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-text-primary truncate">
          Hi, {user.name} 👋
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary">
          Ready to fight for the best meal?
        </p>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2 shrink-0 pt-0.5">
        {/* Notification Bell */}
        <button
          type="button"
          onClick={onNotificationClick}
          aria-label="View notifications"
          className="size-10 rounded-full border border-border/80 bg-surface flex items-center justify-center text-text-secondary hover:text-brand-primary hover:border-brand-secondary/50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary cursor-pointer shadow-2xs"
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
            aria-label="Open profile menu"
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            title={user.name}
            className="flex items-center gap-1 rounded-full p-0.5 text-text-secondary transition-colors hover:text-brand-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary"
          >
            <span className="size-10 rounded-full border border-border/80 bg-surface flex items-center justify-center shadow-2xs">
              {user.avatarUrl && !imageFailed ? (
                <img
                  src={user.avatarUrl}
                  alt={`${user.name}'s profile`}
                  className="size-full rounded-full object-cover"
                  onError={() => setImageFailed(true)}
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

          {isMenuOpen ? (
            <div
              role="menu"
              aria-label="Profile menu"
              className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-border bg-surface shadow-lg"
            >
              <div className="border-b border-border-subtle px-4 py-3">
                <p className="truncate text-sm font-bold text-text-primary">{user.name}</p>
                {user.email ? (
                  <p className="truncate text-xs text-text-secondary">{user.email}</p>
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
                  Edit profile
                </Link>
                <Link
                  href={ROUTES.FOOD_PROFILE.ALLERGIES}
                  role="menuitem"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-primary hover:bg-surface-subtle"
                >
                  <Utensils className="size-4 text-text-secondary" />
                  Edit food profile
                </Link>
                <Link
                  href={ROUTES.PAYMENT_ACCOUNT}
                  role="menuitem"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-primary hover:bg-surface-subtle"
                >
                  <CreditCard className="size-4 text-text-secondary" />
                  Payment account
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
                  Log out
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
