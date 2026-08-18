import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

export const inputVariants = cva(
  "flex w-full rounded-md border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-muted transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-2 focus-visible:outline-offset-1 disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:text-text-disabled disabled:border-border-disabled",
  {
    variants: {
      inputSize: {
        sm: "h-8 text-xs px-2.5 rounded-sm",
        md: "h-10 text-sm px-3 rounded-md",
        lg: "h-12 text-base px-4 rounded-md",
      },
      isInvalid: {
        true: "border-status-danger-icon text-status-danger-text focus-visible:outline-status-danger-icon",
        false: "border-border hover:border-brand-secondary focus-visible:outline-brand-secondary",
      },
    },
    defaultVariants: {
      inputSize: "md",
      isInvalid: false,
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  invalid?: boolean;
  leftAdornment?: React.ReactNode;
  rightAdornment?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      inputSize,
      invalid = false,
      "aria-invalid": ariaInvalid,
      leftAdornment,
      rightAdornment,
      disabled,
      ...props
    },
    ref
  ) => {
    const isActuallyInvalid = invalid || ariaInvalid === true || ariaInvalid === "true";

    if (leftAdornment || rightAdornment) {
      return (
        <div className="relative flex w-full items-center">
          {leftAdornment && (
            <div className="pointer-events-none absolute left-3 flex items-center justify-center text-text-muted">
              {leftAdornment}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            disabled={disabled}
            aria-invalid={isActuallyInvalid ? "true" : undefined}
            className={cn(
              inputVariants({ inputSize, isInvalid: isActuallyInvalid }),
              leftAdornment && "pl-9",
              rightAdornment && "pr-9",
              className
            )}
            {...props}
          />
          {rightAdornment && (
            <div className="absolute right-3 flex items-center justify-center text-text-muted">
              {rightAdornment}
            </div>
          )}
        </div>
      );
    }

    return (
      <input
        type={type}
        ref={ref}
        disabled={disabled}
        aria-invalid={isActuallyInvalid ? "true" : undefined}
        className={cn(
          inputVariants({ inputSize, isInvalid: isActuallyInvalid }),
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
