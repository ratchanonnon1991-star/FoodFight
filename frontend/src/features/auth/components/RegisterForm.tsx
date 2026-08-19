"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";

import { ROUTES } from "@/config/routes";
import { authService } from "@/features/auth/services/auth-runtime";
import { useAuthFlow } from "@/features/auth/context/auth-flow-context";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/schemas/register-schema";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import {
  FormField,
  FormLabel,
  FormDescription,
  FormError,
} from "@/components/ui/form-field";
import { Separator } from "@/components/ui/Separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";

import { SocialAuthButtons } from "./SocialAuthButtons";
import { TermsConsent } from "./TermsConsent";

export function RegisterForm() {
  const router = useRouter();
  const { setChallenge } = useAuthFlow();

  const [generalError, setGeneralError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      termsAccepted: false,
    },
    mode: "onBlur",
  });

  const onSubmit = async (values: RegisterFormValues) => {
    setGeneralError(null);

    try {
      const result = await authService.register(values);

      if (!result.ok) {
        if (result.error.kind === "duplicate_email") {
          setError("email", {
            message: result.error.message,
          });

          return;
        }

        if (result.error.fieldErrors) {
          for (const [field, message] of Object.entries(
            result.error.fieldErrors,
          )) {
            setError(field as keyof RegisterFormValues, {
              message,
            });
          }

          return;
        }

        setGeneralError(result.error.message);

        return;
      }

      if (!result.data) {
        setGeneralError(
          "Registration succeeded, but verification information was not returned.",
        );

        return;
      }

      setChallenge(result.data);

      router.push(ROUTES.AUTH.VERIFY_EMAIL);
    } catch {
      setGeneralError(
        "An unexpected error occurred during registration. Please try again.",
      );
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Back */}
      <div className="flex items-center justify-between">
        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center gap-1.5 rounded-sm text-xs font-medium text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-2 focus-visible:outline-brand-secondary"
          aria-label="Back to home"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />

          <span>Back</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-1.5 text-center">
        <div className="text-xl font-bold tracking-tight text-brand-primary">
          FoodFighter
        </div>

        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          Create your account
        </h1>

        <p className="text-xs text-text-secondary">
          Join FoodFighter to decide group meals easily with AI.
        </p>
      </div>

      {/* General Error */}
      {generalError && (
        <Alert variant="error">
          <AlertTitle>Registration Failed</AlertTitle>

          <AlertDescription>{generalError}</AlertDescription>
        </Alert>
      )}

      {/* Register Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        {/* Full Name */}
        <FormField isInvalid={!!errors.name}>
          <FormLabel htmlFor="name" required>
            Full Name
          </FormLabel>

          <Input
            id="name"
            placeholder="e.g. Somchai Dee"
            autoComplete="name"
            disabled={isSubmitting}
            {...register("name")}
          />

          {errors.name && <FormError>{errors.name.message}</FormError>}
        </FormField>

        {/* Email */}
        <FormField isInvalid={!!errors.email}>
          <FormLabel htmlFor="email" required>
            Email Address
          </FormLabel>

          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            disabled={isSubmitting}
            {...register("email")}
          />

          {errors.email && <FormError>{errors.email.message}</FormError>}
        </FormField>

        {/* Password */}
        <FormField isInvalid={!!errors.password}>
          <FormLabel htmlFor="password" required>
            Password
          </FormLabel>

          <PasswordInput
            id="password"
            placeholder="••••••••"
            autoComplete="new-password"
            disabled={isSubmitting}
            {...register("password")}
          />

          <FormDescription>
            At least 8 characters with lowercase, uppercase, a number, and a
            special character.
          </FormDescription>

          {errors.password && <FormError>{errors.password.message}</FormError>}
        </FormField>

        {/* Confirm Password */}
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

        {/* Terms */}
        <TermsConsent
          control={control}
          error={errors.termsAccepted?.message}
          disabled={isSubmitting}
        />

        {/* Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            className="h-11 w-full text-sm font-semibold tracking-wide"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            CREATE ACCOUNT
          </Button>
        </div>
      </form>

      {/* Divider */}
      <div className="relative my-4">
        <Separator text="OR" />
      </div>

      {/* Social Auth */}
      <SocialAuthButtons
        disabled={isSubmitting}
        onSuccess={() => router.push(ROUTES.FOOD_PROFILE.ALLERGIES)}
        onError={(message) => setGeneralError(message)}
      />

      {/* Login */}
      <div className="pt-2 text-center text-xs text-text-secondary">
        Already have an account?{" "}
        <Link
          href={ROUTES.AUTH.LOGIN}
          className="rounded-sm font-semibold text-brand-primary underline underline-offset-2 transition-colors hover:text-brand-primary-hover focus-visible:outline-2 focus-visible:outline-brand-secondary"
        >
          Log in
        </Link>
      </div>
    </div>
  );
}
