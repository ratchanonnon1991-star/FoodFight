"use client";

import * as React from "react";
import { Bell } from "lucide-react";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";
import { AccountDropdown, type AccountDropdownUser } from "./AccountDropdown";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useUserProfile } from "@/context/user-profile-context";
import { cn } from "@/lib/utils/cn";

export interface HeaderUtilitiesProps {
  user?: AccountDropdownUser | null;
  isLoading?: boolean;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  onLogout?: () => void;
  className?: string;
}

export function HeaderUtilities({
  user,
  isLoading,
  onNotificationClick,
  onProfileClick,
  onLogout,
  className,
}: HeaderUtilitiesProps) {
  const { locale } = useLanguage();
  const { user: contextUser, isLoading: contextLoading, logout: contextLogout } =
    useUserProfile();

  const activeUser = user ?? contextUser ?? { name: "FoodFighter" };
  const effectiveLoading = isLoading ?? (user ? false : contextLoading);
  const effectiveLogout = onLogout ?? contextLogout;

  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-2 pt-0.5 pointer-events-auto",
        className,
      )}
    >
      <LanguageSwitcher variant="glass" />

      <button
        type="button"
        onClick={onNotificationClick}
        aria-label={locale === "th" ? "การแจ้งเตือน" : "Notifications"}
        className="size-10 rounded-full border border-white/20 bg-black/20 hover:bg-black/30 backdrop-blur-md flex items-center justify-center text-white shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring cursor-pointer hover:border-white/30"
      >
        <Bell className="size-5" />
      </button>

      <AccountDropdown
        user={activeUser}
        isLoading={effectiveLoading}
        onProfileClick={onProfileClick}
        onLogout={effectiveLogout}
      />
    </div>
  );
}
