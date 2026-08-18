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
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/features/auth/schemas/reset-password-schema";
import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { FormField, FormLabel, FormDescription, FormError } from "@/components/ui/form-field";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";

export function ResetPasswordForm() {
  const router = useRouter();
  const [generalError, setGeneralError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setGeneralError(null);
    try {
      const result = await authService.resetPassword({
        newPassword: values.password,
        confirmPassword: values.confirmPassword,
      });

      if (!result.ok) {
        setGeneralError(result.error.message);
        return;
      }

      // Mock reset success: navigate directly back to /login
      router.push(ROUTES.AUTH.LOGIN);
    } catch {
      setGeneralError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Navigation / Back link */}
      <div className="flex items-center justify-between">
        <Link
          href={ROUTES.AUTH.LOGIN}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-2 focus-visible:outline-brand-secondary rounded-sm"
          aria-label="Back to login"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          <span>Back</span>
        </Link>
      </div>

      {/* Brand Header */}
      <div className="text-center space-y-1.5">
        <div className="text-xl font-bold tracking-tight text-brand-primary">
          FoodFighter
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          Reset your password
        </h1>
        <p className="text-xs text-text-secondary max-w-xs mx-auto leading-relaxed">
          Create a new secure password to access your FoodFighter account.
        </p>
      </div>

      {/* General Error Alert */}
      {generalError && (
        <Alert variant="error">
          <AlertTitle>Reset Error</AlertTitle>
          <AlertDescription>{generalError}</AlertDescription>
        </Alert>
      )}

      {/* Reset Password Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* New Password */}
        <FormField isInvalid={!!errors.password}>
          <FormLabel htmlFor="password" required>
            New Password
          </FormLabel>
          <PasswordInput
            id="password"
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={isSubmitting}
            {...register("password")}
          />
          <FormDescription>
            At least 8 characters with lowercase, uppercase, and numbers.
          </FormDescription>
          {errors.password && <FormError>{errors.password.message}</FormError>}
        </FormField>

        {/* Confirm Password */}
        <FormField isInvalid={!!errors.confirmPassword}>
          <FormLabel htmlFor="confirmPassword" required>
            Confirm New Password
          </FormLabel>
          <PasswordInput
            id="confirmPassword"
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={isSubmitting}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <FormError>{errors.confirmPassword.message}</FormError>
          )}
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
            RESET PASSWORD
          </Button>
        </div>
      </form>

      {/* Back to Login Link */}
      <div className="text-center pt-2 text-xs text-text-secondary">
        Remember your password?{" "}
        <Link
          href={ROUTES.AUTH.LOGIN}
          className="font-semibold text-brand-primary hover:text-brand-primary-hover underline underline-offset-2 transition-colors focus-visible:outline-2 focus-visible:outline-brand-secondary rounded-sm"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
