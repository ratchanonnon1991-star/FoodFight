"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { ROUTES } from "@/config/routes";
import { authService } from "@/features/auth/services/auth-runtime";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/features/auth/schemas/reset-password-schema";

import { Button } from "@/components/ui/Button";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { FormField, FormLabel, FormError } from "@/components/ui/form-field";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") ?? "";

  const otp = searchParams.get("otp") ?? "";

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

    if (!email || !otp) {
      setGeneralError(
        "Password reset session is missing or invalid. Please request a new reset code.",
      );
      return;
    }

    try {
      const result = await authService.resetPassword({
        email,
        otp,
        newPassword: values.password,
        confirmPassword: values.confirmPassword,
      });

      if (!result.ok) {
        setGeneralError(result.error.message);
        return;
      }

      router.replace(ROUTES.AUTH.LOGIN);
    } catch {
      setGeneralError("Unable to reset password. Please try again.");
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-1.5 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          Reset password
        </h1>

        <p className="text-xs text-text-secondary">Enter your new password.</p>
      </div>

      {generalError && (
        <Alert variant="error">
          <AlertTitle>Reset Password Failed</AlertTitle>

          <AlertDescription>{generalError}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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

          {errors.password && <FormError>{errors.password.message}</FormError>}
        </FormField>

        <FormField isInvalid={!!errors.confirmPassword}>
          <FormLabel htmlFor="confirmPassword" required>
            Confirm Password
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

        <Button
          type="submit"
          variant="primary"
          className="h-11 w-full"
          disabled={isSubmitting}
          loading={isSubmitting}
        >
          RESET PASSWORD
        </Button>
      </form>
    </div>
  );
}
