"use client";

import * as React from "react";
import { cn } from "@/lib/utils/cn";
import { EMAIL_VERIFICATION_POLICY } from "@/features/auth/constants/auth-policy";

export interface VerificationCodeInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  isInvalid?: boolean;
  className?: string;
}

export function VerificationCodeInput({
  value,
  onChange,
  disabled = false,
  isInvalid = false,
  className,
}: VerificationCodeInputProps) {
  const length = EMAIL_VERIFICATION_POLICY.codeLength;
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const digits = React.useMemo(() => {
    const arr = value.split("").slice(0, length);
    while (arr.length < length) {
      arr.push("");
    }
    return arr;
  }, [value, length]);

  const focusInput = (index: number) => {
    if (index >= 0 && index < length) {
      inputRefs.current[index]?.focus();
    }
  };

  const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;
    const sanitized = rawVal.replace(/\D/g, "");

    if (!sanitized) {
      // Empty / cleared
      const nextDigits = [...digits];
      nextDigits[index] = "";
      onChange(nextDigits.join(""));
      return;
    }

    if (sanitized.length === 1) {
      const nextDigits = [...digits];
      nextDigits[index] = sanitized;
      onChange(nextDigits.join(""));
      focusInput(index + 1);
    } else {
      // Multiple digits pasted into single input
      const pastedDigits = sanitized.slice(0, length).split("");
      const nextDigits = [...digits];
      for (let i = 0; i < pastedDigits.length; i++) {
        if (index + i < length) {
          nextDigits[index + i] = pastedDigits[i];
        }
      }
      onChange(nextDigits.join(""));
      const nextFocus = Math.min(length - 1, index + pastedDigits.length);
      focusInput(nextFocus);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        focusInput(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      focusInput(index + 1);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasteData) return;

    const pastedDigits = pasteData.slice(0, length).split("");
    const nextDigits = [...digits];
    for (let i = 0; i < length; i++) {
      nextDigits[i] = pastedDigits[i] || "";
    }
    onChange(nextDigits.join(""));
    const focusTarget = Math.min(length - 1, pastedDigits.length);
    focusInput(focusTarget);
  };

  return (
    <div
      role="group"
      aria-label="6-digit verification code"
      className={cn("flex items-center justify-between gap-1.5 sm:gap-2.5 w-full", className)}
    >
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          value={digit}
          disabled={disabled}
          aria-label={`Digit ${index + 1} of ${length}`}
          aria-invalid={isInvalid ? "true" : undefined}
          onChange={(e) => handleInputChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          className={cn(
            "size-11 sm:size-12 rounded-md border text-center text-lg font-bold text-text-primary transition-colors",
            "bg-surface focus:bg-background focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-secondary",
            isInvalid
              ? "border-status-danger-border text-status-danger-text bg-status-danger-bg/20"
              : "border-border hover:border-brand-secondary",
            disabled && "cursor-not-allowed bg-surface-muted text-text-disabled border-border-disabled"
          )}
        />
      ))}
    </div>
  );
}
