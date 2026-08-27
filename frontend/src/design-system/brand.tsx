"use client";

import Image from "next/image";
import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { brandLogoAssets } from "./tokens";

export type BrandMarkVariant = "primary" | "stacked" | "icon" | "app";
export type BrandMarkSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface BrandMarkProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * Brand asset variant:
   * - `primary`: Horizontal mark (symbol + wordmark) for headers and wide layouts (3:1 aspect ratio)
   * - `stacked`: Vertically stacked mark for centered auth cards, splash screens, and panels (4:5 aspect ratio)
   * - `icon`: Symbol-only mark for compact navigation and small indicators (1:1 aspect ratio)
   * - `app`: Rounded application icon for PWA and app-icon contexts (1:1 aspect ratio)
   */
  variant?: BrandMarkVariant;
  /**
   * Preset sizing scale
   */
  size?: BrandMarkSize;
  /**
   * Custom width in pixels. If provided without height, height is calculated from the aspect ratio.
   */
  width?: number;
  /**
   * Custom height in pixels. If provided without width, width is calculated from the aspect ratio.
   */
  height?: number;
  /**
   * Accessible alt text for screen readers. Defaults to "FoodFighter".
   * For decorative use or when wrapped in a link with existing label, set `decorative={true}` or `alt=""`.
   */
  alt?: string;
  /**
   * If true, marks the image as purely decorative with aria-hidden="true" and empty alt.
   */
  decorative?: boolean;
  /**
   * Preload with high priority (use ONLY for above-the-fold hero/primary header logos). Defaults to false.
   */
  priority?: boolean;
  /**
   * Optional custom sizes attribute for responsive image optimization. Defaults to intrinsic display width.
   */
  sizes?: string;
}

const defaultDimensions: Record<BrandMarkVariant, Record<BrandMarkSize, { width: number; height: number }>> = {
  primary: {
    xs: { width: 72, height: 24 },
    sm: { width: 96, height: 32 },
    md: { width: 120, height: 40 },
    lg: { width: 156, height: 52 },
    xl: { width: 192, height: 64 },
  },
  stacked: {
    xs: { width: 48, height: 60 },
    sm: { width: 64, height: 80 },
    md: { width: 88, height: 110 },
    lg: { width: 120, height: 150 },
    xl: { width: 160, height: 200 },
  },
  icon: {
    xs: { width: 24, height: 24 },
    sm: { width: 32, height: 32 },
    md: { width: 40, height: 40 },
    lg: { width: 48, height: 48 },
    xl: { width: 64, height: 64 },
  },
  app: {
    xs: { width: 32, height: 32 },
    sm: { width: 48, height: 48 },
    md: { width: 64, height: 64 },
    lg: { width: 80, height: 80 },
    xl: { width: 96, height: 96 },
  },
};

export const BrandMark = React.forwardRef<HTMLDivElement, BrandMarkProps>(
  (
    {
      variant = "primary",
      size = "md",
      width,
      height,
      alt = "FoodFighter",
      decorative = false,
      priority = false,
      sizes,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const asset = brandLogoAssets[variant];

    // Compute dimensions with ratio preservation if one dimension is given
    let finalWidth: number;
    let finalHeight: number;

    if (width !== undefined && height !== undefined) {
      finalWidth = width;
      finalHeight = height;
    } else if (width !== undefined) {
      finalWidth = width;
      finalHeight = Math.round(width / asset.aspectRatio);
    } else if (height !== undefined) {
      finalHeight = height;
      finalWidth = Math.round(height * asset.aspectRatio);
    } else {
      const preset = defaultDimensions[variant][size];
      finalWidth = preset.width;
      finalHeight = preset.height;
    }

    const isDecorative = decorative || alt === "";
    const effectiveAlt = isDecorative ? "" : alt;
    const effectiveSizes = sizes ?? `${finalWidth}px`;

    return (
      <div
        {...props}
        ref={ref}
        className={cn(
          "ff-ds-brand-mark",
          `ff-ds-brand-mark--${variant}`,
          `ff-ds-brand-mark--${size}`,
          className,
        )}
        style={{
          width: finalWidth,
          height: finalHeight,
          ...style,
        }}
        aria-hidden={isDecorative || undefined}
      >
        <Image
          src={asset.src}
          alt={effectiveAlt}
          width={finalWidth}
          height={finalHeight}
          sizes={effectiveSizes}
          priority={priority}
          className="ff-ds-brand-mark__image"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
          }}
        />
      </div>
    );
  },
);

BrandMark.displayName = "DesignSystemBrandMark";
