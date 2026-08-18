import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { Spinner } from "@/components/ui/Spinner";

export const iconButtonVariants = cva(
  "inline-flex items-center justify-center shrink-0 rounded-md transition-colors duration-150 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-primary text-white shadow-xs hover:bg-brand-primary-hover active:bg-brand-primary-active",
        secondary:
          "bg-brand-secondary text-white shadow-xs hover:bg-brand-secondary-hover active:bg-brand-secondary-active",
        outline:
          "border border-border bg-surface text-brand-primary shadow-xs hover:bg-surface-subtle hover:border-brand-secondary active:bg-surface-muted",
        ghost:
          "text-brand-primary hover:bg-surface-subtle active:bg-surface-muted",
        destructive:
          "bg-status-danger-text text-white shadow-xs hover:bg-red-800 active:bg-red-900",
      },
      size: {
        sm: "size-8 p-1.5 text-xs rounded-sm",
        md: "size-10 p-2 text-sm rounded-md",
        lg: "size-12 p-3 text-base rounded-md",
      },
    },
    defaultVariants: {
      variant: "ghost",
      size: "md",
    },
  }
);

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants> {
  /**
   * Accessible name for screen readers. Required.
   */
  "aria-label": string;
  loading?: boolean;
  icon?: React.ReactNode;
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      disabled,
      children,
      icon,
      "aria-label": ariaLabel,
      type = "button",
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        className={cn(iconButtonVariants({ variant, size }), className)}
        disabled={isDisabled}
        aria-busy={loading ? "true" : undefined}
        aria-disabled={isDisabled ? "true" : undefined}
        {...props}
      >
        {loading ? (
          <Spinner
            size={size === "sm" ? "sm" : "md"}
            variant={variant === "primary" || variant === "secondary" || variant === "destructive" ? "white" : "current"}
          />
        ) : (
          icon || children
        )}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";
