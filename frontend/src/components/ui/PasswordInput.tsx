"use client";

import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input, type InputProps } from "@/components/ui/Input";

export interface PasswordInputProps extends Omit<InputProps, "type" | "rightAdornment"> {
  showPasswordLabel?: string;
  hidePasswordLabel?: string;
}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      showPasswordLabel = "Show password",
      hidePasswordLabel = "Hide password",
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const toggleVisibility = React.useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    return (
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        className={className}
        disabled={disabled}
        rightAdornment={
          <button
            type="button"
            onClick={toggleVisibility}
            disabled={disabled}
            aria-label={showPassword ? hidePasswordLabel : showPasswordLabel}
            aria-pressed={showPassword}
            tabIndex={0}
            className="flex size-7 items-center justify-center rounded-sm text-text-muted hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus-ring disabled:pointer-events-none disabled:opacity-40"
          >
            {showPassword ? (
              <EyeOff className="size-4" aria-hidden="true" />
            ) : (
              <Eye className="size-4" aria-hidden="true" />
            )}
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";
