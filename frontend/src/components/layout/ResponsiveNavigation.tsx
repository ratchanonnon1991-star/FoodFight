"use client";

import { BottomNavigation } from "./BottomNavigation";
import { TopNavigation } from "./TopNavigation";
import type { NavTab } from "./navigation-config";

export interface ResponsiveNavigationProps {
  activeTab?: NavTab;
}

export function ResponsiveNavigation({
  activeTab,
}: ResponsiveNavigationProps) {
  return (
    <>
      <BottomNavigation activeTab={activeTab} />
      <TopNavigation activeTab={activeTab} />
    </>
  );
}
