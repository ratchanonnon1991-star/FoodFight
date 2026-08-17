"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { authService } from "@/features/auth/services/auth-runtime";
import { useAuthFlow } from "@/features/auth/context";
import { registerSchema, type RegisterFormValues } from "@/features/auth/schemas/register-schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { FormField, FormLabel, FormDescription, FormError } from "@/components/ui/form-field";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { SocialAuthButtons } from "../social-auth-buttons";
import { TermsConsent } from "./terms-consent";

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
          setError("email", { message: result.error.message });
        } else if (result.error.fieldErrors) {
          for (const [field, message] of Object.entries(result.error.fieldErrors)) {
            setError(field as keyof RegisterFormValues, { message });
          }
        } else {
          setGeneralError(result.error.message);
        }
        return;
      }

      if (result.data) {
        setChallenge(result.data);
      }
      router.push(ROUTES.AUTH.VERIFY_EMAIL);
    } catch {
      setGeneralError("An unexpected error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Navigation / Back link */}
      <div className="flex items-center justify-between">
        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-2 focus-visible:outline-brand-secondary rounded-sm"
          aria-label="Back to home"
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
          Create your account
        </h1>
        <p className="text-xs text-text-secondary">
          Join FoodFighter to decide group meals easily with AI.
        </p>
      </div>

      {generalError && (
        <Alert variant="error">
          <AlertTitle>Registration Failed</AlertTitle>
          <AlertDescription>{generalError}</AlertDescription>
        </Alert>
      )}

      {/* Registration Form */}
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
            At least 8 characters with lowercase, uppercase, and numbers.
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

        {/* Terms of Service & Privacy Policy Consent */}
        <TermsConsent
          control={control}
          error={errors.termsAccepted?.message}
          disabled={isSubmitting}
        />

        {/* Create Account CTA */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            className="w-full h-11 text-sm font-semibold tracking-wide"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            CREATE ACCOUNT
          </Button>
        </div>
      </form>

      {/* Social Auth Separator */}
      <div className="relative my-4">
        <Separator text="OR" />
      </div>

      {/* Social Auth Buttons */}
      <SocialAuthButtons disabled={isSubmitting} />

      {/* Login Link */}
      <div className="text-center pt-2 text-xs text-text-secondary">
        Already have an account?{" "}
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
