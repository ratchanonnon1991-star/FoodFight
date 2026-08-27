import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

export const textareaVariants = cva(
  "flex w-full rounded-xl border bg-surface px-3.5 py-3 text-sm text-text-primary placeholder:text-text-muted transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:text-text-disabled disabled:border-border-disabled resize-none",
  {
    variants: {
      isInvalid: {
        true: "border-status-danger-icon text-status-danger-text focus-visible:outline-status-danger-icon",
        false: "border-border hover:border-border-strong focus-visible:outline-focus-ring",
      },
    },
    defaultVariants: {
      isInvalid: false,
    },
  }
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      invalid = false,
      "aria-invalid": ariaInvalid,
      disabled,
      rows = 4,
      ...props
    },
    ref
  ) => {
    const isActuallyInvalid = invalid || ariaInvalid === true || ariaInvalid === "true";

    return (
      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        aria-invalid={isActuallyInvalid ? "true" : undefined}
        className={cn(
          textareaVariants({ isInvalid: isActuallyInvalid }),
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
