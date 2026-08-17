"use client";

import * as React from "react";
import { ShieldCheck } from "lucide-react";

export function VerificationSecurityNotice() {
  return (
    <div className="flex items-start gap-3 p-3.5 rounded-md bg-surface-subtle border border-border text-xs text-text-secondary leading-relaxed">
      <ShieldCheck className="size-4 shrink-0 text-brand-primary mt-0.5" aria-hidden="true" />
      <div>
        <span className="font-semibold text-text-primary block mb-0.5">
          For your security
        </span>
        Never share your 6-digit verification code with anyone. FoodFighter will never ask for your code.
      </div>
    </div>
  );
}
