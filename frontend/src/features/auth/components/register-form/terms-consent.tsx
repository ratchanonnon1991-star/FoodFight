"use client";

import * as React from "react";
import { type Control, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import type { RegisterFormValues } from "@/features/auth/schemas/register-schema";

export interface TermsConsentProps {
  control: Control<RegisterFormValues>;
  error?: string;
  disabled?: boolean;
}

export function TermsConsent({ control, error, disabled = false }: TermsConsentProps) {
  return (
    <div className="pt-1">
      <Controller
        name="termsAccepted"
        control={control}
        render={({ field }) => (
          <Checkbox
            id="termsAccepted"
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            disabled={disabled}
            invalid={!!error}
            label={
              <span className="text-xs text-text-secondary font-normal">
                I agree to the{" "}
                <span className="font-medium text-brand-primary underline underline-offset-2">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="font-medium text-brand-primary underline underline-offset-2">
                  Privacy Policy
                </span>
              </span>
            }
          />
        )}
      />
      {error && (
        <p className="mt-1 text-xs text-status-danger-text" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
