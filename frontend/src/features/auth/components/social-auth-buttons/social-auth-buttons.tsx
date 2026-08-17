"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { authService } from "@/features/auth/services/auth-runtime";

export interface SocialAuthButtonsProps {
  disabled?: boolean;
}

export function SocialAuthButtons({ disabled = false }: SocialAuthButtonsProps) {
  const [loadingProvider, setLoadingProvider] = React.useState<"google" | "line" | null>(null);

  const handleGoogleAuth = async () => {
    try {
      setLoadingProvider("google");
      await authService.beginGoogleAuth();
    } catch {
      // Ignored for now
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleLineAuth = async () => {
    try {
      setLoadingProvider("line");
      await authService.beginLineAuth();
    } catch {
      // Ignored for now
    } finally {
      setLoadingProvider(null);
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
