"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";
import type { DesignSystemTheme } from "./tokens";

export interface DesignSystemProviderProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: DesignSystemTheme;
  reducedMotion?: boolean;
}

export function DesignSystemProvider({
  theme = "ember",
  reducedMotion = false,
  className,
  children,
  ...props
}: DesignSystemProviderProps) {
  return (
    <div
      data-ff-design-system
      data-ff-theme={theme}
      data-ff-reduced-motion={reducedMotion ? "true" : "false"}
      className={cn("ff-ds", className)}
      {...props}
    >
      {children}
    </div>
  );
}
