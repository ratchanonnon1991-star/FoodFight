import * as React from "react";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { buttonVariants } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { cn } from "@/lib/utils/cn";

export interface AuthSessionFallbackProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function AuthSessionLoading() {
  return (
    <div
      className="flex min-h-40 flex-col items-center justify-center gap-3 text-center"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Spinner size="md" />
      <p className="text-xs text-text-secondary">Restoring your session...</p>
    </div>
  );
}

export function AuthSessionFallback({
  title = "Verification session not found",
  description = "Please register or sign in to continue.",
  actionLabel = "Go to Register",
  actionHref = ROUTES.AUTH.REGISTER,
}: AuthSessionFallbackProps) {
  return (
    <div className="w-full space-y-6 text-center py-4">
      <div className="space-y-2">
        <h1 className="text-xl font-bold text-text-primary">{title}</h1>
        <p className="text-xs text-text-secondary">{description}</p>
      </div>
      <Link
        href={actionHref}
        className={cn(buttonVariants({ variant: "primary" }), "w-full h-11 text-sm font-semibold justify-center")}
      >
        {actionLabel}
      </Link>
    </div>
  );
}
