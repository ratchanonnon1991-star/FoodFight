import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

/**
 * Visual System V2 — Atmosphere Background Primitive
 *
 * Renders pure CSS multi-point layered radial gradients blending into the canonical Rice canvas (#F4EEE3).
 *
 * Rules:
 * - Purely decorative, non-interactive (pointer-events-none, aria-hidden="true").
 * - Does not constrain layout or page width.
 * - Does not apply full-page backdrop filters.
 */
export const atmosphereVariants = cva(
  "pointer-events-none absolute inset-x-0 top-0 overflow-hidden select-none",
  {
    variants: {
      variant: {
        hero: "",
        feature: "[background-image:var(--gradient-atmosphere-feature)]",
        subtle: "[background-image:var(--gradient-atmosphere-subtle)]",
      },
      height: {
        sm: "h-48 sm:h-64",
        md: "h-64 sm:h-80",
        lg: "h-80 sm:h-96",
        hero: "h-auto max-h-[560px] sm:max-h-[640px] lg:max-h-[720px]",
        full: "h-full",
      },
    },
    defaultVariants: {
      variant: "feature",
      height: "lg",
    },
  }
);

export interface AtmosphereBackgroundProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof atmosphereVariants> {}

export const AtmosphereBackground = React.forwardRef<
  HTMLDivElement,
  AtmosphereBackgroundProps
>(({ className, variant, height, ...props }, ref) => {
  if (variant === "hero") {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 overflow-hidden select-none",
          "h-[480px] sm:h-[560px] lg:h-[640px]",
          "[mask-image:linear-gradient(to_bottom,black_0%,black_15%,rgba(0,0,0,0.85)_30%,rgba(0,0,0,0.55)_48%,rgba(0,0,0,0.25)_65%,rgba(0,0,0,0.06)_80%,transparent_95%)]",
          "[-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_15%,rgba(0,0,0,0.85)_30%,rgba(0,0,0,0.55)_48%,rgba(0,0,0,0.25)_65%,rgba(0,0,0,0.06)_80%,transparent_95%)]",
          className
        )}
        {...props}
      >
        <picture className="block w-full h-full">
          <source
            media="(min-width: 1024px)"
            srcSet="/backgrounds/home/home-atmosphere-hero-desktop.png"
          />
          <img
            src="/backgrounds/home/home-atmosphere-hero-mobile.png"
            alt=""
            className="w-full h-full object-cover object-top select-none pointer-events-none blur-[4px] scale-[1.02]"
            loading="eager"
            decoding="async"
          />
        </picture>
      </div>
    );
  }



  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(atmosphereVariants({ variant, height }), className)}
      {...props}
    />
  );
});

AtmosphereBackground.displayName = "AtmosphereBackground";
