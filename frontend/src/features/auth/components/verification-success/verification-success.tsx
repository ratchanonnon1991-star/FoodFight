"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { useAuthFlow } from "@/features/auth/context";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { AuthSessionFallback } from "../auth-session-fallback";

function maskEmail(email: string): string {
  const parts = email.split("@");
  if (parts.length !== 2) return email;
  const [user, domain] = parts;
  if (user.length <= 2) return `${user[0] ?? ""}***@${domain}`;
  return `${user[0]}***${user[user.length - 1]}@${domain}`;
}

export function VerificationSuccess() {
  const { verificationCompleted, challenge } = useAuthFlow();

  if (!verificationCompleted) {
    return (
      <AuthSessionFallback
        title="Verification required"
        description="Please complete email verification before viewing this confirmation."
        actionLabel="Go to Register"
        actionHref={ROUTES.AUTH.REGISTER}
      />
    );
  }

  return (
    <div className="w-full space-y-6 text-center py-2">
      {/* Brand Header */}
      <div className="space-y-1">
        <div className="text-xl font-bold tracking-tight text-brand-primary">FoodFighter</div>
      </div>

      {/* Success Badge */}
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="flex size-16 items-center justify-center rounded-full bg-status-success-bg border border-status-success-border text-status-success-icon shadow-xs">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-text-primary">
          Email verified!
        </h1>
        <p className="text-xs text-text-secondary max-w-xs mx-auto leading-relaxed">
          {challenge?.email ? (
            <>
              Your email <span className="font-semibold text-text-primary">{maskEmail(challenge.email)}</span> has been successfully verified.
            </>
          ) : (
            "Your email has been successfully verified. Your account is ready."
          )}
        </p>
      </div>

      {/* Continuation Card */}
      <div className="p-4 rounded-md bg-surface-subtle border border-border text-xs text-text-secondary leading-relaxed text-left">
        <span className="font-semibold text-text-primary block mb-1">
          Account ready
        </span>
        You can now log in with your credentials and start using FoodFighter to decide group meals.
      </div>

      {/* Next Action Affordance */}
      <div className="pt-2">
        <Link
          href={ROUTES.AUTH.LOGIN}
          className={cn(buttonVariants({ variant: "primary" }), "w-full h-11 text-sm font-semibold justify-center tracking-wide")}
        >
          Continue to Login
        </Link>
      </div>
    </div>
  );
}
