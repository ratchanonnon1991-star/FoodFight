"use client";

/* Profile images are supplied by external OAuth providers. */
/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import { Bell } from "lucide-react";
import type { AuthenticatedUserDisplay } from "../types/home-types";

export interface HomeHeaderProps {
  user: AuthenticatedUserDisplay;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
}

export function HomeHeader({
  user,
  onNotificationClick,
  onProfileClick,
}: HomeHeaderProps) {
  const [failedImageUrl, setFailedImageUrl] = React.useState<string | null>(
    null,
  );

  const initial = user.name.trim().charAt(0).toUpperCase() || "?";
  const shouldShowImage = Boolean(
    user.avatarUrl && failedImageUrl !== user.avatarUrl,
  );

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
        <button
          type="button"
          onClick={onProfileClick}
          aria-label="View user profile"
          title={user.name}
          className="size-10 rounded-full border border-border/80 bg-surface flex items-center justify-center text-text-secondary hover:text-brand-primary hover:border-brand-secondary/50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary cursor-pointer shadow-2xs"
        >
          {shouldShowImage ? (
            <img
              src={user.avatarUrl}
              alt={`${user.name}'s profile`}
              className="size-full rounded-full object-cover"
              onError={() => setFailedImageUrl(user.avatarUrl ?? null)}
            />
          ) : (
            <span
              aria-hidden="true"
              className="flex size-full items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white"
            >
              {initial}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
