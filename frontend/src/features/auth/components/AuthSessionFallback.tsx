"use client";

import * as React from "react";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

export interface AuthSessionFallbackProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
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
