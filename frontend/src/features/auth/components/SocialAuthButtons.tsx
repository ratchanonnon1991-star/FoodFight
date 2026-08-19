"use client";

import * as React from "react";
import { GoogleLogin } from "@react-oauth/google";

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
  const [loadingProvider, setLoadingProvider] = React.useState<
    "google" | "line" | null
  >(null);

  const setPending = (provider: "google" | "line" | null) => {
    setLoadingProvider(provider);
    onPendingChange?.(provider !== null);
  };

  const handleGoogleSuccess = async (credentialResponse: {
    credential?: string;
  }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      onError?.("Google did not return an ID token.");
      return;
    }

    try {
      setPending("google");

      const result = await authService.beginGoogleAuth(idToken);

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

  const handleLineAuth = () => {
    if (disabled || loadingProvider !== null) {
      return;
    }

    const channelId = process.env.NEXT_PUBLIC_LINE_CHANNEL_ID;

    const callbackUrl = process.env.NEXT_PUBLIC_LINE_CALLBACK_URL;

    if (!channelId || !callbackUrl) {
      onError?.("LINE authentication is not configured.");
      return;
    }

    const state = crypto.randomUUID();

    sessionStorage.setItem("line_oauth_state", state);

    const params = new URLSearchParams({
      response_type: "code",
      client_id: channelId,
      redirect_uri: callbackUrl,
      state,
      // The email scope requires separate approval in LINE Developers.
      // The backend supports LINE accounts without an email, so request only
      // the scopes required to identify the user.
      scope: "profile openid",
    });

    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?${params.toString()}`;
  };

  return (
    <div className="flex flex-col space-y-3 w-full">
      {/* Google */}
      <div
        className={
          disabled || loadingProvider !== null
            ? "pointer-events-none opacity-50"
            : ""
        }
      >
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => {
            onError?.("Google authentication failed. Please try again.");
          }}
          text="continue_with"
          shape="rectangular"
          width="100%"
        />
      </div>

      {/* LINE */}
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
