import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export const alertVariants = cva(
  "relative w-full rounded-md border p-4 text-sm [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
  {
    variants: {
      variant: {
        info: "bg-status-info-bg border-status-info-border text-status-info-text [&>svg]:text-status-info-icon",
        success:
          "bg-status-success-bg border-status-success-border text-status-success-text [&>svg]:text-status-success-icon",
        warning:
          "bg-status-warning-bg border-status-warning-border text-status-warning-text [&>svg]:text-status-warning-icon",
        error:
          "bg-status-danger-bg border-status-danger-border text-status-danger-text [&>svg]:text-status-danger-icon",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

const defaultIcons = {
  info: <Info className="size-4" aria-hidden="true" />,
  success: <CheckCircle2 className="size-4" aria-hidden="true" />,
  warning: <AlertTriangle className="size-4" aria-hidden="true" />,
  error: <AlertCircle className="size-4" aria-hidden="true" />,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  icon?: React.ReactNode;
  hideIcon?: boolean;
  onClose?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      className,
      variant = "info",
      icon,
      hideIcon = false,
      onClose,
      children,
      ...props
    },
    ref
  ) => {
    const selectedIcon = icon || (variant ? defaultIcons[variant] : defaultIcons.info);

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {!hideIcon && selectedIcon}
        <div className="flex flex-col gap-1 pr-6">{children}</div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss alert"
            className="absolute right-3 top-3 rounded-xs p-1 opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-current"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        )}
      </div>
    );
  }
);
Alert.displayName = "Alert";

export type AlertTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

export const AlertTitle = React.forwardRef<HTMLHeadingElement, AlertTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <h5
        ref={ref}
        className={cn("font-semibold leading-none tracking-tight", className)}
        {...props}
      >
        {children}
      </h5>
    );
  }
);
AlertTitle.displayName = "AlertTitle";

export type AlertDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("text-sm leading-relaxed opacity-90", className)}
      {...props}
    />
  );
});
AlertDescription.displayName = "AlertDescription";
