"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";

import { ROUTES } from "@/config/routes";
import { authService } from "@/features/auth/services/auth-runtime";
import { useAuthFlow } from "@/features/auth/context/auth-flow-context";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/login-schema";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { FormField, FormLabel, FormError } from "@/components/ui/form-field";
import { Separator } from "@/components/ui/Separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";

import { useLanguage } from "@/i18n/LanguageProvider";
import { authTranslations } from "@/features/auth/i18n/auth-translations";
import { SocialAuthButtons } from "./SocialAuthButtons";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { locale } = useLanguage();
  const t = authTranslations[locale].login;
  const { setIsAuthenticated, setIsFoodProfileCompleted } = useAuthFlow();

  const [generalError, setGeneralError] = React.useState<string | null>(null);

  const [isSocialPending, setIsSocialPending] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
  });

  const handleAuthSuccess = React.useCallback(
    (foodProfileComplete: boolean) => {
      setIsAuthenticated(true);

      setIsFoodProfileCompleted(foodProfileComplete);

      const returnTo = searchParams.get("returnTo");

      if (returnTo?.startsWith("/") && !returnTo.startsWith("//")) {
        router.push(returnTo);
      } else if (foodProfileComplete) {
        router.push(ROUTES.AUTHENTICATED_HOME);
      } else {
        router.push(ROUTES.FOOD_PROFILE.ALLERGIES);
      }
    },
    [router, searchParams, setIsAuthenticated, setIsFoodProfileCompleted],
  );

  const onSubmit = async (values: LoginFormValues) => {
    setGeneralError(null);

    try {
      const result = await authService.login(values);

      if (!result.ok) {
        setGeneralError(result.error.message);

        return;
      }

      handleAuthSuccess(result.data?.foodProfileComplete ?? false);
    } catch {
      setGeneralError(t.genericError);
    }
  };

  const isAnyPending = isSubmitting || isSocialPending;

  return (
    <div className="w-full space-y-6">
      {/* Back */}
      <div className="flex items-center justify-between">
        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center gap-1.5 rounded-sm text-xs font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-brand-secondary"
          aria-label={t.back}
        >
          <ArrowLeft className="size-4" aria-hidden="true" />

          <span>{t.back}</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-1.5 text-center">
        <div className="text-xl font-bold tracking-tight text-brand-primary">
          {t.brand}
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          {t.title}
        </h1>

        <p className="text-xs text-text-secondary">
          {t.subtitle}
        </p>
      </div>

      {/* Error */}
      {generalError && (
        <Alert variant="error">
          <AlertTitle>{t.noticeTitle}</AlertTitle>

          <AlertDescription>{generalError}</AlertDescription>
        </Alert>
      )}

      {/* Email Login */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField isInvalid={!!errors.email}>
          <FormLabel htmlFor="email" required>
            {t.emailLabel}
          </FormLabel>

          <Input
            id="email"
            type="email"
            placeholder={t.emailPlaceholder}
            autoComplete="email"
            disabled={isAnyPending}
            {...register("email")}
          />

          {errors.email && <FormError>{errors.email.message}</FormError>}
        </FormField>

        <FormField isInvalid={!!errors.password}>
          <div className="flex items-center justify-between">
            <FormLabel htmlFor="password" required>
              {t.passwordLabel}
            </FormLabel>

            <Link
              href={ROUTES.AUTH.FORGOT_PASSWORD}
              className="rounded-sm text-xs font-medium text-brand-primary underline underline-offset-2 transition-colors hover:text-brand-primary-hover focus-visible:outline-2 focus-visible:outline-brand-secondary"
            >
              {t.forgotPassword}
            </Link>
          </div>

          <PasswordInput
            id="password"
            placeholder={t.passwordPlaceholder}
            autoComplete="current-password"
            disabled={isAnyPending}
            {...register("password")}
          />

          {errors.password && <FormError>{errors.password.message}</FormError>}
        </FormField>

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            className="h-11 w-full text-sm font-semibold tracking-wide"
            disabled={isAnyPending}
            loading={isSubmitting}
          >
            {t.submit}
          </Button>
        </div>
      </form>

      <div className="relative my-4">
        <Separator text={t.or} />
      </div>

      {/* Social Login */}
      <SocialAuthButtons
        disabled={isAnyPending}
        onSuccess={(foodProfileComplete) =>
          handleAuthSuccess(foodProfileComplete)
        }
        onError={(message) => setGeneralError(message)}
        onPendingChange={(pending) => setIsSocialPending(pending)}
      />

      <div className="pt-2 text-center text-xs text-text-secondary">
        {t.noAccount}{" "}
        <Link
          href={ROUTES.AUTH.REGISTER}
          className="rounded-sm font-semibold text-brand-primary underline underline-offset-2 transition-colors hover:text-brand-primary-hover focus-visible:outline-2 focus-visible:outline-brand-secondary"
        >
          {t.signUp}
        </Link>
      </div>
    </div>
  );
}
