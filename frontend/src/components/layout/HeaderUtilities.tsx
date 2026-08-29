"use client";

import * as React from "react";
import { Bell } from "lucide-react";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";
import { AccountDropdown, type AccountDropdownUser } from "./AccountDropdown";
import { useLanguage } from "@/i18n/LanguageProvider";
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
  isLoading = false,
  onNotificationClick,
  onProfileClick,
  onLogout,
  className,
}: HeaderUtilitiesProps) {
  const { locale } = useLanguage();
  const activeUser = user ?? { name: "FoodFighter" };

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
        isLoading={isLoading}
        onProfileClick={onProfileClick}
        onLogout={onLogout}
      />
    </div>
  );
}
