"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { useAuthFlow } from "@/features/auth/context/auth-flow-context";
import { useLanguage } from "@/i18n/LanguageProvider";
import { authTranslations } from "@/features/auth/i18n/auth-translations";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { AuthSessionFallback, AuthSessionLoading } from "./AuthSessionFallback";

function maskEmail(email: string): string {
  const parts = email.split("@");
  if (parts.length !== 2) return email;
  const [user, domain] = parts;
  if (user.length <= 2) return `${user[0] ?? ""}***@${domain}`;
  return `${user[0]}***${user[user.length - 1]}@${domain}`;
}

export function VerificationSuccess() {
  const { locale } = useLanguage();
  const t = authTranslations[locale].verificationSuccess;
  const { isHydrating, verificationCompleted, challenge } = useAuthFlow();

  if (isHydrating) {
    return <AuthSessionLoading />;
  }

  if (!verificationCompleted) {
    return (
      <AuthSessionFallback
        title={t.title}
        description={t.bodyWithoutEmail}
        actionLabel={t.continueToLogin}
        actionHref={ROUTES.AUTH.LOGIN}
      />
    );
  }

  return (
    <div className="w-full space-y-6 text-center py-2">
      {/* Brand Header */}
      <div className="space-y-1">
        <div className="text-xl font-bold tracking-tight text-brand-primary">{t.brand}</div>
      </div>

      {/* Success Badge */}
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="flex size-16 items-center justify-center rounded-full bg-status-success-bg border border-status-success-border text-status-success-icon shadow-xs">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          {t.title}
        </h1>
        <p className="text-xs text-text-secondary max-w-xs mx-auto leading-relaxed">
          {challenge?.email ? (
            t.bodyWithEmail(maskEmail(challenge.email))
          ) : (
            t.bodyWithoutEmail
          )}
        </p>
      </div>

      {/* Continuation Card */}
      <div className="p-4 rounded-md bg-surface-subtle border border-border text-xs text-text-secondary leading-relaxed text-left">
        <span className="font-semibold text-text-primary block mb-1">
          {t.accountReadyTitle}
        </span>
        {t.accountReadyDesc}
      </div>

      {/* Next Action Affordance */}
      <div className="pt-2">
        <Link
          href={ROUTES.AUTH.LOGIN}
          className={cn(buttonVariants({ variant: "primary" }), "w-full h-11 text-sm font-semibold justify-center tracking-wide")}
        >
          {t.continueToLogin}
        </Link>
      </div>
    </div>
  );
}
