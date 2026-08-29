import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

/**
 * Visual System V2 — Liquid Glass Surface Primitive
 *
 * A presentational glass surface supporting 3 distinct material tiers and illuminated rim variants.
 *
 * Rules:
 * - GlassSurface is a purely visual material container; it does NOT inject fake button/interaction semantics.
 * - Interaction mechanics (lift, active press, links, buttons) remain component-owned by callers.
 * - Nested GlassSurface instances are strongly discouraged by performance architecture.
 */
export const glassSurfaceVariants = cva(
  "border text-text-primary transition-colors",
  {
    variants: {
      variant: {
        soft: "border-glass-border-soft bg-glass-soft shadow-glass-soft backdrop-blur-sm",
        interactive:
          "border-glass-border-interactive bg-glass-interactive shadow-glass-interactive backdrop-blur-md",
        floating:
          "border-glass-border-floating bg-glass-floating shadow-glass-floating backdrop-blur-xl",
      },
      rim: {
        neutral: "[box-shadow:var(--glass-rim-neutral)]",
        herb: "[box-shadow:var(--glass-rim-herb)] border-accent-fresh",
        chili: "[box-shadow:var(--glass-rim-chili)] border-brand-primary",
        saffron: "[box-shadow:var(--glass-rim-saffron)] border-accent-energy",
      },
      padding: {
        none: "p-0",
        xs: "p-2",
        sm: "p-3 sm:p-4",
        md: "p-4 sm:p-6",
        lg: "p-6 sm:p-8",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "soft",
      rim: "neutral",
      padding: "none",
      radius: "xl",
    },
  }
);

export interface GlassSurfaceProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glassSurfaceVariants> {}

export const GlassSurface = React.forwardRef<HTMLDivElement, GlassSurfaceProps>(
  ({ className, variant, rim, padding, radius, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          glassSurfaceVariants({ variant, rim, padding, radius }),
          className
        )}
        {...props}
      />
    );
  }
);

GlassSurface.displayName = "GlassSurface";
