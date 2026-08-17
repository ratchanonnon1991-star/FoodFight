"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { authService } from "@/features/auth/services/auth-runtime";
import { useAuthFlow } from "@/features/auth/context";
import { useCountdown } from "@/features/auth/hooks/use-countdown";
import { verifyEmailSchema, type VerifyEmailFormValues } from "@/features/auth/schemas/verify-email-schema";
import { Button, buttonVariants } from "@/components/ui/button";
import { FormField, FormError } from "@/components/ui/form-field";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils/cn";
import { VerificationCodeInput } from "../verification-code-input";
import { ResendCodeControl } from "./resend-code-control";
import { VerificationSecurityNotice } from "./verification-security-notice";
import { VerificationSessionFallback } from "./verification-session-fallback";

function maskEmail(email: string): string {
  const parts = email.split("@");
  if (parts.length !== 2) return email;
  const [user, domain] = parts;
  if (user.length <= 2) return `${user[0] ?? ""}***@${domain}`;
  return `${user[0]}***${user[user.length - 1]}@${domain}`;
}

export function VerifyEmailForm() {
  const router = useRouter();
  const { challenge, setChallenge, setVerificationCompleted } = useAuthFlow();
  const [generalError, setGeneralError] = React.useState<string | null>(null);
  const [isResending, setIsResending] = React.useState(false);
  const [resendMessage, setResendMessage] = React.useState<string | null>(null);

  const expiry = useCountdown(challenge?.expiresAt);
  const resend = useCountdown(challenge?.resendAvailableAt);

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { code: "" },
    mode: "onChange",
  });

  const codeValue = useWatch({ control, name: "code", defaultValue: "" });

  const onSubmit = async (values: VerifyEmailFormValues) => {
    setGeneralError(null);
    setResendMessage(null);

    try {
      const result = await authService.verifyEmail(values);

      if (!result.ok) {
        if (result.error.kind === "expired_code") {
          setError("code", { message: result.error.message });
          setGeneralError("Your code has expired. Please request a new verification code below.");
        } else if (result.error.kind === "invalid_code" || result.error.kind === "validation") {
          setError("code", { message: result.error.message });
        } else {
          setGeneralError(result.error.message);
        }
        return;
      }

      setVerificationCompleted(true);
      router.push(ROUTES.AUTH.VERIFICATION_SUCCESS);
    } catch {
      setGeneralError("An unexpected error occurred during verification. Please try again.");
    }
  };

  const handleResend = async () => {
    if (!challenge?.email || !resend.isExpired || isResending) return;

    setIsResending(true);
    setGeneralError(null);
    setResendMessage(null);

    try {
      const result = await authService.resendVerificationCode(challenge.email);
      if (result.ok && result.data) {
        setChallenge(result.data);
        setResendMessage("A new verification code has been sent to your email.");
      } else if (!result.ok) {
        setGeneralError(result.error.message);
      }
    } catch {
      setGeneralError("Failed to resend verification code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  if (!challenge) {
    return <VerificationSessionFallback />;
  }

  return (
    <div className="w-full space-y-6">
      {/* Back Link */}
      <div className="flex items-center justify-between">
        <Link
          href={ROUTES.AUTH.REGISTER}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary transition-colors focus-visible:outline-2 focus-visible:outline-brand-secondary rounded-sm"
          aria-label="Back to registration"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          <span>Back</span>
        </Link>
      </div>

      {/* Brand & Heading */}
      <div className="text-center space-y-1.5">
        <div className="text-xl font-bold tracking-tight text-brand-primary">FoodFighter</div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">Verify your email</h1>
        <div className="text-xs text-text-secondary">
          <span>We&apos;ve sent a 6-digit code to </span>
          <span className="font-semibold text-text-primary">{maskEmail(challenge.email)}</span>
          <div className="mt-1">
            <Link
              href={ROUTES.AUTH.CHANGE_EMAIL}
              className="text-xs font-medium text-brand-primary underline underline-offset-2 hover:text-brand-primary-hover focus-visible:outline-2 focus-visible:outline-brand-secondary rounded-sm"
            >
              Change email
            </Link>
          </div>
        </div>
      </div>

      {/* Feedback Alerts */}
      {generalError && (
        <Alert variant="error">
          <AlertTitle>Verification Notice</AlertTitle>
          <AlertDescription>{generalError}</AlertDescription>
        </Alert>
      )}

      {resendMessage && (
        <Alert variant="success">
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{resendMessage}</AlertDescription>
        </Alert>
      )}

      {/* Verification Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <FormField isInvalid={!!errors.code}>
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <VerificationCodeInput
                value={field.value}
                onChange={field.onChange}
                disabled={isSubmitting}
                isInvalid={!!errors.code}
              />
            )}
          />
          {errors.code && <FormError>{errors.code.message}</FormError>}
        </FormField>

        {/* Code Expiration Notice */}
        <div className="text-center text-xs text-text-muted">
          {expiry.isExpired ? (
            <span className="text-status-danger-text font-medium">Code has expired</span>
          ) : (
            <span>
              Code expires in{" "}
              <span className="font-medium text-text-secondary">{expiry.formattedTime}</span>
            </span>
          )}
        </div>

        {/* Verify CTA */}
        <Button
          type="submit"
          variant="primary"
          className="w-full h-11 text-sm font-semibold tracking-wide"
          disabled={isSubmitting || (codeValue?.length ?? 0) !== 6}
          loading={isSubmitting}
        >
          VERIFY OTP
        </Button>
      </form>

      {/* Resend Code Section */}
      <ResendCodeControl
        resend={resend}
        isResending={isResending}
        onResend={handleResend}
      />

      {/* Alternative Action Separator */}
      <div className="relative my-2">
        <Separator text="OR" />
      </div>

      {/* Change Email Button CTA */}
      <Link
        href={ROUTES.AUTH.CHANGE_EMAIL}
        className={cn(buttonVariants({ variant: "outline" }), "w-full h-11 text-sm font-medium justify-center")}
      >
        CHANGE EMAIL
      </Link>

      {/* Security Notice */}
      <VerificationSecurityNotice />
    </div>
  );
}
