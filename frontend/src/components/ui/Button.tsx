import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";
import { Spinner } from "@/components/ui/Spinner";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium text-sm transition-all duration-150 select-none cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 disabled:scale-100 disabled:cursor-not-allowed disabled:shadow-none disabled:transform-none",
  {
    variants: {
      variant: {
        primary:
          "bg-interactive-primary text-white shadow-xs hover:bg-interactive-primary-hover hover:shadow-sm hover:-translate-y-0.5 active:bg-interactive-primary-active active:translate-y-0 active:scale-[0.98] active:shadow-xs",
        secondary:
          "bg-brand-secondary text-white shadow-xs hover:bg-brand-secondary-hover hover:shadow-sm hover:-translate-y-0.5 active:bg-brand-secondary-active active:translate-y-0 active:scale-[0.98] active:shadow-xs",
        outline:
          "border border-border bg-surface text-text-primary shadow-xs hover:bg-surface-subtle hover:border-brand-primary hover:shadow-sm hover:-translate-y-0.5 active:bg-surface-muted active:translate-y-0 active:scale-[0.98] active:shadow-xs",
        ghost:
          "text-text-primary hover:bg-surface-subtle active:bg-surface-muted active:scale-[0.98]",
        destructive:
          "bg-status-danger-icon text-white shadow-xs hover:bg-status-danger-text hover:shadow-sm hover:-translate-y-0.5 active:bg-status-danger-text active:translate-y-0 active:scale-[0.98] active:shadow-xs",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-sm",
        md: "h-10 px-4 text-sm rounded-md",
        lg: "h-12 px-6 text-base rounded-md",
        icon: "size-10 rounded-md p-0 shrink-0",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  loadingText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading = false,
      loadingText,
      disabled,
      children,
      leftIcon,
      rightIcon,
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
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        disabled={isDisabled}
        aria-busy={loading ? "true" : undefined}
        aria-disabled={isDisabled ? "true" : undefined}
        {...props}
      >
        {loading ? (
          <>
            <Spinner
              size={size === "sm" ? "sm" : "md"}
              variant={variant === "primary" || variant === "secondary" || variant === "destructive" ? "white" : "current"}
            />
            {loadingText ? <span>{loadingText}</span> : children}
          </>
        ) : (
          <>
            {leftIcon && <span className="shrink-0">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="shrink-0">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
