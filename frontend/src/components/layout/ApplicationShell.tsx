"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { AtmosphereBackground } from "@/components/ui/AtmosphereBackground";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils/cn";

export interface ApplicationShellProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Global FoodFighter Application Shell
 *
 * Renders the approved responsive atmospheric identity across product application pages.
 * - Excludes Landing (/) and Authentication (/login, /register, etc.)
 * - Allows Home (/home) to manage its dedicated hero atmosphere without stacking.
 * - Standard application pages receive the approved shell atmosphere.
 */
export function ApplicationShell({
  children,
  className,
}: ApplicationShellProps) {
  const pathname = usePathname();

  const isHomePage =
    pathname === "/" ||
    pathname === "/home" ||
    pathname === ROUTES.AUTHENTICATED_HOME;

  return (
    <div
      className={cn(
        "relative min-h-dvh flex flex-col justify-between bg-background text-text-primary",
        className,
      )}
    >
      {/* On normal application pages, render the shared atmospheric shell background.
          Home manages its own dedicated hero atmosphere layer. */}
      {!isHomePage && (
        <AtmosphereBackground variant="shell" className="top-0" />
      )}
      <div className="relative z-10 flex-1 flex flex-col">{children}</div>

    </div>
  );
}
