"use client";

import * as React from "react";
import { type Control, Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/Checkbox";
import { useLanguage } from "@/i18n/LanguageProvider";
import { authTranslations } from "@/features/auth/i18n/auth-translations";
import type { RegisterFormValues } from "@/features/auth/schemas/register-schema";

export interface TermsConsentProps {
  control: Control<RegisterFormValues>;
  error?: string;
  disabled?: boolean;
}

export function TermsConsent({ control, error, disabled = false }: TermsConsentProps) {
  const { locale } = useLanguage();
  const t = authTranslations[locale].register;

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
                {t.termsAgree}{" "}
                <span className="font-medium text-brand-primary underline underline-offset-2">
                  {t.termsOfService}
                </span>{" "}
                {t.and}{" "}
                <span className="font-medium text-brand-primary underline underline-offset-2">
                  {t.privacyPolicy}
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
