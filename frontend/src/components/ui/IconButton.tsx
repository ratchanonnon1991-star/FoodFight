import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { Spinner } from "@/components/ui/Spinner";

export const iconButtonVariants = cva(
  "inline-flex items-center justify-center shrink-0 rounded-md transition-colors duration-150 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "bg-interactive-primary text-white shadow-xs hover:bg-interactive-primary-hover active:bg-interactive-primary-active",
        secondary:
          "bg-brand-secondary text-white shadow-xs hover:bg-brand-secondary-hover active:bg-brand-secondary-active",
        outline:
          "border border-border bg-surface text-text-primary shadow-xs hover:bg-surface-subtle hover:border-brand-primary active:bg-surface-muted",
        ghost:
          "text-text-primary hover:bg-surface-subtle active:bg-surface-muted",
        destructive:
          "bg-status-danger-icon text-white shadow-xs hover:bg-status-danger-text active:bg-status-danger-text",
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
