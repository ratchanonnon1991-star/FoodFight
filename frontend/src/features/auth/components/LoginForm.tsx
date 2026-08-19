"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { authService, isMockFoodProfileComplete } from "@/features/auth/services/auth-runtime";
import { useAuthFlow } from "@/features/auth/context/auth-flow-context";
import { loginSchema, type LoginFormValues } from "@/features/auth/schemas/login-schema";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { FormField, FormLabel, FormError } from "@/components/ui/form-field";
import { Separator } from "@/components/ui/Separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";
import { SocialAuthButtons } from "./SocialAuthButtons";

export function LoginForm() {
  const router = useRouter();
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

  const handleAuthSuccess = (foodProfileComplete: boolean) => {
    setIsAuthenticated(true);
    setIsFoodProfileCompleted(foodProfileComplete);

    if (foodProfileComplete) {
      router.push(ROUTES.AUTHENTICATED_HOME);
    } else {
      router.push(ROUTES.FOOD_PROFILE.ALLERGIES);
    }
  };

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
      setGeneralError("An unexpected error occurred during login. Please try again.");
    }
  };

  const isAnyPending = isSubmitting || isSocialPending;

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
          Welcome back
        </h1>
        <p className="text-xs text-text-secondary">
          Enter your credentials to access your account.
        </p>
      </div>

      {/* General Error Alert */}
      {generalError && (
        <Alert variant="error">
          <AlertTitle>Login Notice</AlertTitle>
          <AlertDescription>{generalError}</AlertDescription>
        </Alert>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
            disabled={isAnyPending}
            {...register("email")}
          />
          {errors.email && <FormError>{errors.email.message}</FormError>}
        </FormField>

        {/* Password */}
        <FormField isInvalid={!!errors.password}>
          <div className="flex items-center justify-between">
            <FormLabel htmlFor="password" required>
              Password
            </FormLabel>
            <Link
              href={ROUTES.AUTH.FORGOT_PASSWORD}
              className="text-xs font-medium text-brand-primary hover:text-brand-primary-hover underline underline-offset-2 transition-colors focus-visible:outline-2 focus-visible:outline-brand-secondary rounded-sm"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            placeholder="••••••••"
            autoComplete="current-password"
            disabled={isAnyPending}
            {...register("password")}
          />
          {errors.password && <FormError>{errors.password.message}</FormError>}
        </FormField>

        {/* Login CTA */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            className="w-full h-11 text-sm font-semibold tracking-wide"
            disabled={isAnyPending}
            loading={isSubmitting}
          >
            LOG IN
          </Button>
        </div>
      </form>

      {/* Social Auth Separator */}
      <div className="relative my-4">
        <Separator text="OR" />
      </div>

      {/* Social Auth Buttons with concurrency guard */}
      <SocialAuthButtons
        disabled={isAnyPending}
        onSuccess={() => handleAuthSuccess(isMockFoodProfileComplete())}
        onError={(msg) => setGeneralError(msg)}
        onPendingChange={(pending) => setIsSocialPending(pending)}
      />

      {/* Sign up Link */}
      <div className="text-center pt-2 text-xs text-text-secondary">
        Don&apos;t have an account?{" "}
        <Link
          href={ROUTES.AUTH.REGISTER}
          className="font-semibold text-brand-primary hover:text-brand-primary-hover underline underline-offset-2 transition-colors focus-visible:outline-2 focus-visible:outline-brand-secondary rounded-sm"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
