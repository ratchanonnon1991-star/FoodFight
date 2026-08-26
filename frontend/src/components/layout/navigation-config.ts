import { Clock, Home, Receipt, User, type LucideIcon } from "lucide-react";
import { ROUTES } from "@/config/routes";

export type NavTab = "home" | "history" | "bills" | "profile";

export interface NavigationItem {
  id: NavTab;
  label: string;
  icon: LucideIcon;
  href: string;
}

export const navigationItems: readonly NavigationItem[] = [
  {
    id: "home",
    label: "Home",
    icon: Home,
    href: ROUTES.AUTHENTICATED_HOME,
  },
  {
    id: "history",
    label: "History",
    icon: Clock,
    href: ROUTES.HISTORY,
  },
  {
    id: "bills",
    label: "Bills",
    icon: Receipt,
    href: ROUTES.BILLS,
  },
  {
    id: "profile",
    label: "Profile",
    icon: User,
    href: ROUTES.PROFILE,
  },
] as const;

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
