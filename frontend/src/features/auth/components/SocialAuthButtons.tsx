"use client";

import * as React from "react";
import { Button } from "@/components/ui/Button";
import { authService } from "@/features/auth/services/auth-runtime";

export interface SocialAuthButtonsProps {
  disabled?: boolean;
  onSuccess?: () => void;
  onError?: (message: string) => void;
  onPendingChange?: (isPending: boolean) => void;
}

export function SocialAuthButtons({
  disabled = false,
  onSuccess,
  onError,
  onPendingChange,
}: SocialAuthButtonsProps) {
  const [loadingProvider, setLoadingProvider] = React.useState<"google" | "line" | null>(null);

  const setPending = (provider: "google" | "line" | null) => {
    setLoadingProvider(provider);
    onPendingChange?.(provider !== null);
  };

  const handleGoogleAuth = async () => {
    if (disabled || loadingProvider !== null) return;
    try {
      setPending("google");
      const result = await authService.beginGoogleAuth();
      if (result.ok) {
        onSuccess?.();
      } else {
        onError?.(result.error.message);
      }
    } catch {
      onError?.("Failed to authenticate with Google. Please try again.");
    } finally {
      setPending(null);
    }
  };

  const handleLineAuth = async () => {
    if (disabled || loadingProvider !== null) return;
    try {
      setPending("line");
      const result = await authService.beginLineAuth();
      if (result.ok) {
        onSuccess?.();
      } else {
        onError?.(result.error.message);
      }
    } catch {
      onError?.("Failed to authenticate with LINE. Please try again.");
    } finally {
      setPending(null);
    }
  };

  return (
    <div className="flex flex-col space-y-3 w-full">
      <Button
        type="button"
        variant="outline"
        className="w-full justify-center text-sm font-medium h-11"
        disabled={disabled || loadingProvider !== null}
        loading={loadingProvider === "google"}
        onClick={handleGoogleAuth}
      >
        Continue with Google
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full justify-center text-sm font-medium h-11"
        disabled={disabled || loadingProvider !== null}
        loading={loadingProvider === "line"}
        onClick={handleLineAuth}
      >
        Continue with LINE
      </Button>
    </div>
  );
}
