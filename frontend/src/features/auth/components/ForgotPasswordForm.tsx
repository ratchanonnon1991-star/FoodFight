"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { authService } from "@/features/auth/services/auth-runtime";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/features/auth/schemas/forgot-password-schema";
import { useLanguage } from "@/i18n/LanguageProvider";
import { authTranslations } from "@/features/auth/i18n/auth-translations";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FormField, FormLabel, FormError } from "@/components/ui/form-field";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";

export function ForgotPasswordForm() {
  const router = useRouter();
  const { locale } = useLanguage();
  const t = authTranslations[locale].forgotPassword;
  const [generalError, setGeneralError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setGeneralError(null);
    try {
      const result = await authService.forgotPassword(values);

      if (!result.ok) {
        setGeneralError(result.error.message);
        return;
      }

      // Mock visual flow: transition directly to /reset-password
      router.push(ROUTES.AUTH.RESET_PASSWORD);
    } catch {
      setGeneralError(t.unexpectedError);
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Navigation / Back link */}
      <div className="flex items-center justify-between">
        <Link
          href={ROUTES.AUTH.LOGIN}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-2 focus-visible:outline-brand-secondary rounded-sm"
          aria-label={t.back}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          <span>{t.back}</span>
        </Link>
      </div>

      {/* Brand Header */}
      <div className="text-center space-y-1.5">
        <div className="text-xl font-bold tracking-tight text-brand-primary">
          {t.brand}
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          {t.title}
        </h1>
        <p className="text-xs text-text-secondary max-w-xs mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      {/* General Error Alert */}
      {generalError && (
        <Alert variant="error">
          <AlertTitle>{t.noticeTitle}</AlertTitle>
          <AlertDescription>{generalError}</AlertDescription>
        </Alert>
      )}

      {/* Forgot Password Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Email */}
        <FormField isInvalid={!!errors.email}>
          <FormLabel htmlFor="email" required>
            {t.emailLabel}
          </FormLabel>
          <Input
            id="email"
            type="email"
            placeholder={t.emailPlaceholder}
            autoComplete="email"
            disabled={isSubmitting}
            {...register("email")}
          />
          {errors.email && <FormError>{errors.email.message}</FormError>}
        </FormField>

        {/* Action CTA */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            className="w-full h-11 text-sm font-semibold tracking-wide"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {t.submit}
          </Button>
        </div>
      </form>

      {/* Back to Login Link */}
      <div className="text-center pt-2 text-xs text-text-secondary">
        {t.rememberPassword}{" "}
        <Link
          href={ROUTES.AUTH.LOGIN}
          className="font-semibold text-brand-primary hover:text-brand-primary-hover underline underline-offset-2 transition-colors focus-visible:outline-2 focus-visible:outline-brand-secondary rounded-sm"
        >
          {t.logIn}
        </Link>
      </div>
    </div>
  );
}
