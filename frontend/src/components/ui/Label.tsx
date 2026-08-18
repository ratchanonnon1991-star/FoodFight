import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

export const labelVariants = cva(
  "text-sm font-medium leading-none text-text-primary select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      disabled: {
        true: "cursor-not-allowed text-text-disabled",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      disabled: false,
    },
  }
);

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement>,
    VariantProps<typeof labelVariants> {
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size, disabled, required, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(labelVariants({ size, disabled }), className)}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-1 text-status-danger-text" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = "Label";
