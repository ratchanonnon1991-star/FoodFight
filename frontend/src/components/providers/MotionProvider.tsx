"use client";

import * as React from "react";
import { MotionConfig } from "motion/react";

export interface MotionProviderProps {
  children: React.ReactNode;
  /**
   * Override reduced motion handling. Defaults to "user" (respects OS preference).
   */
  reducedMotion?: "user" | "always" | "never";
}

/**
 * Provides global motion configuration and respects OS reduced-motion preferences.
 */
export function MotionProvider({
  children,
  reducedMotion = "user",
}: MotionProviderProps) {
  return (
    <MotionConfig reducedMotion={reducedMotion}>
      {children}
    </MotionConfig>
  );
}
