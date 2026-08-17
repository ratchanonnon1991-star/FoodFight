"use client";

import * as React from "react";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export function VerificationSessionFallback() {
  return (
    <div className="w-full space-y-6 text-center py-4">
      <div className="space-y-2">
        <h1 className="text-xl font-bold text-text-primary">
          Verification session not found
        </h1>
        <p className="text-xs text-text-secondary">
          Please register or sign in to verify your email address.
        </p>
      </div>
      <Link
        href={ROUTES.AUTH.REGISTER}
        className={cn(buttonVariants({ variant: "primary" }), "w-full h-11 text-sm font-semibold justify-center")}
      >
        Go to Register
      </Link>
    </div>
  );
}
