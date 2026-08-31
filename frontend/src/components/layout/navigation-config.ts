import { Clock, Home, Receipt, User, type LucideIcon } from "lucide-react";
import { ROUTES } from "@/config/routes";

import type { Locale } from "@/i18n/config";
import { commonTranslations } from "@/i18n/common-translations";

export type NavTab = "home" | "history" | "bills" | "profile";

export interface NavigationItem {
  id: NavTab;
  label: string;
  icon: LucideIcon;
  href: string;
}

export function getNavigationItems(locale: Locale): readonly NavigationItem[] {
  const t = commonTranslations[locale].nav;
  return [
    {
      id: "home",
      label: t.home,
      icon: Home,
      href: ROUTES.AUTHENTICATED_HOME,
    },
    {
      id: "history",
      label: t.history,
      icon: Clock,
      href: ROUTES.HISTORY,
    },
    {
      id: "bills",
      label: t.bills,
      icon: Receipt,
      href: ROUTES.BILLS,
    },
    {
      id: "profile",
      label: t.profile,
      icon: User,
      href: ROUTES.PROFILE,
    },
  ];
}

export const navigationItems: readonly NavigationItem[] = getNavigationItems("en");

export function getActiveNavigationTab(
  pathname: string,
  fallback: NavTab = "home",
): NavTab {
  if (pathname.startsWith(ROUTES.BILLS)) {
    return "bills";
  }

  if (pathname.startsWith(ROUTES.HISTORY)) {
    return "history";
  }

  if (pathname.startsWith(ROUTES.PROFILE)) {
    return "profile";
  }

  if (pathname === ROUTES.AUTHENTICATED_HOME) {
    return "home";
  }

  return fallback;
}
