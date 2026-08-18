import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  invalid?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      id,
      checked,
      defaultChecked,
      disabled = false,
      invalid = false,
      "aria-invalid": ariaInvalid,
      label,
      description,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const isActuallyInvalid = invalid || ariaInvalid === true || ariaInvalid === "true";

    return (
      <div className="flex items-start gap-2.5">
        <div className="relative flex items-center justify-center mt-0.5">
          <input
            ref={ref}
            type="checkbox"
            id={inputId}
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            aria-invalid={isActuallyInvalid ? "true" : undefined}
            onChange={onChange}
            className={cn(
              "peer size-4 shrink-0 cursor-pointer appearance-none rounded-xs border transition-colors",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary",
              "checked:bg-brand-primary checked:border-brand-primary",
              isActuallyInvalid
                ? "border-status-danger-icon focus-visible:outline-status-danger-icon"
                : "border-border hover:border-brand-secondary",
              "disabled:cursor-not-allowed disabled:bg-surface-muted disabled:border-border-disabled disabled:checked:bg-text-disabled",
              className
            )}
            {...props}
          />
          <Check
            className="pointer-events-none absolute size-3 text-white opacity-0 transition-opacity peer-checked:opacity-100 peer-disabled:text-surface-subtle"
            strokeWidth={3}
            aria-hidden="true"
          />
        </div>
        {(label || description) && (
          <div className="flex flex-col select-none">
            {label && (
              <label
                htmlFor={inputId}
                className={cn(
                  "text-sm font-medium leading-5 text-text-primary cursor-pointer",
                  disabled && "cursor-not-allowed text-text-disabled"
                )}
              >
                {label}
              </label>
            )}
            {description && (
              <p
                className={cn(
                  "text-xs text-text-secondary leading-normal",
                  disabled && "text-text-disabled"
                )}
              >
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
