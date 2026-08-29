"use client";

import * as React from "react";
import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { authTranslations } from "@/features/auth/i18n/auth-translations";

export function VerificationSecurityNotice() {
  const { locale } = useLanguage();
  const t = authTranslations[locale].verifyEmail;

  return (
    <div className="flex items-start gap-3 p-3.5 rounded-md bg-surface-subtle border border-border text-xs text-text-secondary leading-relaxed">
      <ShieldCheck className="size-4 shrink-0 text-brand-primary mt-0.5" aria-hidden="true" />
      <div>
        <span className="font-semibold text-text-primary block mb-0.5">
          {t.securityTitle}
        </span>
        {t.securityMessage}
      </div>
    </div>
  );
}
