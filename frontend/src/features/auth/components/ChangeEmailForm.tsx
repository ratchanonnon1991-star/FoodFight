"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail, AlertCircle } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { authService } from "@/features/auth/services/auth-runtime";
import { useAuthFlow } from "@/features/auth/context";
import { changeEmailSchema, type ChangeEmailFormValues } from "@/features/auth/schemas/change-email-schema";
import { Button, buttonVariants } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FormField, FormLabel, FormError } from "@/components/ui/form-field";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";
import { cn } from "@/lib/utils/cn";
import { AuthSessionFallback } from "./AuthSessionFallback";

function maskEmail(email: string): string {
  const parts = email.split("@");
  if (parts.length !== 2) return email;
  const [user, domain] = parts;
  if (user.length <= 2) return `${user[0] ?? ""}***@${domain}`;
  return `${user[0]}***${user[user.length - 1]}@${domain}`;
}

export function ChangeEmailForm() {
  const router = useRouter();
  const { challenge, setChallenge, setVerificationCompleted } = useAuthFlow();
  const [generalError, setGeneralError] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ChangeEmailFormValues>({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: { newEmail: "" },
    mode: "onBlur",
  });

  const onSubmit = async (values: ChangeEmailFormValues) => {
    setGeneralError(null);

    try {
      const result = await authService.changeVerificationEmail(values);

      if (!result.ok) {
        if (result.error.kind === "duplicate_email") {
          setError("newEmail", { message: result.error.message });
        } else if (result.error.fieldErrors) {
          for (const [field, message] of Object.entries(result.error.fieldErrors)) {
            setError(field as keyof ChangeEmailFormValues, { message });
          }
        } else {
          setGeneralError(result.error.message);
        }
        return;
      }

      if (result.data) {
        setChallenge(result.data);
      }
      setVerificationCompleted(false);
      router.push(ROUTES.AUTH.VERIFY_EMAIL);
    } catch {
      setGeneralError("An unexpected error occurred while changing email. Please try again.");
    }
  };

  if (!challenge) {
    return (
      <AuthSessionFallback
        title="Verification session not found"
        description="Please register or sign in to change your verification email."
      />
    );
  }

  return (
    <div className="w-full space-y-6">
      {/* Back Link */}
      <div className="flex items-center justify-between">
        <Link
          href={ROUTES.AUTH.VERIFY_EMAIL}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-2 focus-visible:outline-brand-secondary rounded-sm"
          aria-label="Back to verification"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          <span>Back</span>
        </Link>
      </div>

      {/* Brand & Heading */}
      <div className="text-center space-y-1.5">
        <div className="text-xl font-bold tracking-tight text-brand-primary">FoodFighter</div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">Change email</h1>
        <p className="text-xs text-text-secondary">
          Enter your new email address. We&apos;ll send a fresh 6-digit verification code to confirm.
        </p>
      </div>

      {/* Current Email Indicator */}
      <div className="flex items-center gap-2.5 p-3 rounded-md bg-surface-subtle border border-border text-xs text-text-secondary">
        <Mail className="size-4 shrink-0 text-brand-primary" aria-hidden="true" />
        <div>
          <span>Current registered email: </span>
          <span className="font-semibold text-text-primary">{maskEmail(challenge.email)}</span>
        </div>
      </div>

      {/* Error Alert */}
      {generalError && (
        <Alert variant="error">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{generalError}</AlertDescription>
        </Alert>
      )}

      {/* Change Email Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField isInvalid={!!errors.newEmail}>
          <FormLabel htmlFor="newEmail" required>
            New email address
          </FormLabel>
          <Input
            id="newEmail"
            type="email"
            placeholder="new.email@example.com"
            autoComplete="email"
            disabled={isSubmitting}
            {...register("newEmail")}
          />
          {errors.newEmail && <FormError>{errors.newEmail.message}</FormError>}
        </FormField>

        {/* Advisory Notice */}
        <div className="flex items-start gap-2 text-xs text-text-muted">
          <AlertCircle className="size-3.5 shrink-0 text-text-muted mt-0.5" aria-hidden="true" />
          <span>Changing your email address will immediately invalidate the previous verification code.</span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <Button
            type="submit"
            variant="primary"
            className="w-full h-11 text-sm font-semibold tracking-wide"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            SEND CODE
          </Button>

          <Link
            href={ROUTES.AUTH.VERIFY_EMAIL}
            className={cn(buttonVariants({ variant: "outline" }), "w-full h-11 text-sm font-medium justify-center")}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
