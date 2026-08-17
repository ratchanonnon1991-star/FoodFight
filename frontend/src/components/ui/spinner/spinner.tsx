import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

export const spinnerVariants = cva(
  "animate-spin inline-block shrink-0",
  {
    variants: {
      size: {
        sm: "size-4",
        md: "size-5",
        lg: "size-7",
        xl: "size-9",
      },
      variant: {
        primary: "text-brand-primary",
        secondary: "text-brand-secondary",
        white: "text-white",
        current: "text-current",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "primary",
    },
  }
);

export interface SpinnerProps
  extends React.SVGAttributes<SVGSVGElement>,
    VariantProps<typeof spinnerVariants> {
  label?: string;
}

export function Spinner({
  className,
  size,
  variant,
  label = "Loading...",
  ...props
}: SpinnerProps) {
  return (
    <span className="inline-flex items-center justify-center" role="status">
      <svg
        className={cn(spinnerVariants({ size, variant }), className)}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
        {...props}
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3.5"
        />
        <path
          className="opacity-90"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      {label && <span className="sr-only">{label}</span>}
    </span>
  );
}
