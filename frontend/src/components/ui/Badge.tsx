import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-medium select-none transition-colors border",
  {
    variants: {
      variant: {
        neutral:
          "bg-surface-subtle border-border text-text-secondary",
        brand:
          "bg-brand-primary border-brand-primary text-white",
        "brand-secondary":
          "bg-brand-secondary border-brand-secondary text-white",
        petal:
          "bg-accent-petal border-border text-text-primary",
        apricot:
          "bg-accent-apricot border-border text-text-primary",
        custard:
          "bg-accent-custard border-border text-text-primary",
        success:
          "bg-status-success-bg border-status-success-border text-status-success-text",
        warning:
          "bg-status-warning-bg border-status-warning-border text-status-warning-text",
        danger:
          "bg-status-danger-bg border-status-danger-border text-status-danger-text",
        info:
          "bg-status-info-bg border-status-info-border text-status-info-text",
      },
      size: {
        sm: "px-2 py-0.5 text-xs rounded-xs",
        md: "px-2.5 py-1 text-xs rounded-sm",
        lg: "px-3 py-1.5 text-sm rounded-sm",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean;
}

export function Badge({
  className,
  variant,
  size,
  dot = false,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {dot && (
        <span
          className="size-1.5 rounded-full bg-current shrink-0"
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
