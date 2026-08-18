"use client";

import * as React from "react";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { UseCountdownReturn } from "@/features/auth/hooks/use-countdown";

export interface ResendCodeControlProps {
  resend: UseCountdownReturn;
  isResending: boolean;
  onResend: () => void;
}

export function ResendCodeControl({
  resend,
  isResending,
  onResend,
}: ResendCodeControlProps) {
  return (
    <div className="text-center text-xs text-text-secondary space-y-1.5 pt-1">
      <div>Didn&apos;t receive the code?</div>
      {resend.isExpired ? (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onResend}
          disabled={isResending}
          loading={isResending}
          className="text-xs font-semibold text-brand-primary hover:text-brand-primary-hover"
          leftIcon={<RefreshCw className="size-3.5" />}
        >
          Resend code
        </Button>
      ) : (
        <span className="text-text-muted font-medium">
          Resend code in {resend.formattedTime}
        </span>
      )}
    </div>
  );
}
