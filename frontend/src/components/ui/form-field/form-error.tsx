import * as React from "react";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useFormField } from "./form-field";

export interface FormErrorProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  error?: string;
  hideIcon?: boolean;
}

export const FormError = React.forwardRef<HTMLParagraphElement, FormErrorProps>(
  ({ className, id, error, hideIcon = false, children, ...props }, ref) => {
    const fieldContext = useFormField();
    const resolvedId = id || fieldContext?.errorId;
    const message = error || children;

    if (!message) {
      return null;
    }

    return (
      <p
        ref={ref}
        id={resolvedId}
        role="alert"
        aria-live="polite"
        className={cn(
          "flex items-center gap-1.5 text-xs font-medium text-status-danger-text",
          className
        )}
        {...props}
      >
        {!hideIcon && (
          <AlertCircle className="size-3.5 shrink-0 text-status-danger-icon" aria-hidden="true" />
        )}
        <span>{message}</span>
      </p>
    );
  }
);

FormError.displayName = "FormError";
