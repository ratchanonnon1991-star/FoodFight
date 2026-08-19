"use client";

import * as React from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { Loader2 } from "lucide-react";

import { authService } from "@/features/auth/services/auth-runtime";
import { cn } from "@/lib/utils/cn";

export interface SocialAuthButtonsProps {
  disabled?: boolean;
  onSuccess?: () => void;
  onError?: (message: string) => void;
  onPendingChange?: (isPending: boolean) => void;
  googleLabel?: string;
  lineLabel?: string;
  appearance?: "brand" | "surface";
  density?: "default" | "compact";
}

/**
 * Official LINE speech bubble brand icon
 */
function LineBrandIcon({
  className = "size-5",
  onSurface = false,
}: {
  className?: string;
  onSurface?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      focusable="false"
    >
      <path
        fill={onSurface ? "#06C755" : "#FFFFFF"}
        d="M24 10.304c0-5.369-5.383-9.738-12-9.738-6.616 0-12 4.369-12 9.738 0 4.814 4.269 8.846 10.035 9.608.391.084.922.258 1.057.592.122.303.079.778.039 1.085l-.171 1.027c-.053.303-.242 1.186 1.039.647 1.281-.54 6.911-4.069 9.428-6.967 1.739-1.907 2.573-3.843 2.573-5.292z"
      />

      <path
        fill={onSurface ? "#FFFFFF" : "#06C755"}
        d="M9.228 13.072H7.104a.531.531 0 0 1-.531-.531V7.955c0-.293.238-.531.531-.531h.708a.531.531 0 0 1 .531.531v3.878h1.416a.531.531 0 0 1 .531.531v.708a.531.531 0 0 1-.531.531zm2.348 0h-.708a.531.531 0 0 1-.531-.531V7.955c0-.293.238-.531.531-.531h.708a.531.531 0 0 1 .531.531v4.586a.531.531 0 0 1-.531.531zm4.721 0h-.708a.531.531 0 0 1-.447-.245l-2.022-2.889v2.603c0 .293-.238.531-.531.531h-.708a.531.531 0 0 1-.531-.531V7.955c0-.293.238-.531.531-.531h.708a.531.531 0 0 1 .447.245l2.022 2.889V7.955c0-.293.238-.531.531-.531h.708a.531.531 0 0 1 .531.531v4.586a.531.531 0 0 1-.531.531zm4.331-3.355h-1.416v.708h1.416a.531.531 0 0 1 .531.531v.708a.531.531 0 0 1-.531.531h-2.124a.531.531 0 0 1-.531-.531V7.955c0-.293.238-.531.531-.531h2.124a.531.531 0 0 1 .531.531v.708a.531.531 0 0 1-.531.531h-1.416v.708h1.416a.531.531 0 0 1 .531.531v.708a.531.531 0 0 1-.531.531z"
      />
    </svg>
  );
}

export function SocialAuthButtons({
  disabled = false,
  onSuccess,
  onError,
  onPendingChange,
  googleLabel = "Continue with Google",
  lineLabel = "Continue with LINE",
  appearance = "brand",
  density = "default",
}: SocialAuthButtonsProps) {
  const [loadingProvider, setLoadingProvider] = React.useState<
    "google" | "line" | null
  >(null);

  const setPending = (provider: "google" | "line" | null) => {
    setLoadingProvider(provider);
    onPendingChange?.(provider !== null);
  };

  // =========================
  // GOOGLE
  // =========================

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

  // =========================
  // LINE
  // =========================

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

    setPending("line");

    const state = crypto.randomUUID();

    sessionStorage.setItem("line_oauth_state", state);

    const params = new URLSearchParams({
      response_type: "code",
      client_id: channelId,
      redirect_uri: callbackUrl,
      state,
      scope: "profile openid",
    });

    window.location.href = `https://access.line.me/oauth2/v2.1/authorize?${params.toString()}`;
  };

  // =========================
  // UI
  // =========================

  const isGoogleLoading = loadingProvider === "google";

  const isLineLoading = loadingProvider === "line";

  const isAnyLoading = loadingProvider !== null;

  const isCompact = density === "compact";

  const iconSize = isCompact ? "size-4" : "size-5";

  return (
    <div
      className={cn(
        "flex w-full flex-col",
        isCompact ? "space-y-2" : "space-y-3",
      )}
    >
      {/* Google */}
      <div
        aria-label={googleLabel}
        className={cn(
          "relative w-full overflow-hidden rounded-xl",
          (disabled || isAnyLoading) && "pointer-events-none opacity-50",
        )}
      >
        {isGoogleLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface/80">
            <Loader2
              className={cn(iconSize, "animate-spin text-text-muted")}
              aria-hidden="true"
            />
          </div>
        )}

        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
        >
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              setPending(null);

              onError?.("Google authentication failed. Please try again.");
            }}
            text="continue_with"
            shape="rectangular"
            width="100%"
          />
        </GoogleOAuthProvider>
      </div>

      {/* LINE */}
      <button
        type="button"
        id="line-auth-button"
        onClick={handleLineAuth}
        disabled={disabled || isAnyLoading}
        aria-label={lineLabel}
        className={
          appearance === "surface"
            ? cn(
                "flex w-full items-center justify-center gap-3 rounded-xl border border-border/80 bg-surface px-4 font-semibold text-text-primary shadow-sm transition-all",
                "hover:bg-surface-subtle/80 active:bg-surface-subtle",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary",
                "disabled:cursor-not-allowed disabled:opacity-50 select-none",
                isCompact ? "h-10 text-xs" : "h-12 text-sm",
              )
            : cn(
                "flex w-full items-center justify-center gap-3 rounded-xl bg-[#06C755] px-4 font-semibold text-white shadow-sm transition-all",
                "hover:bg-[#05B34C] active:bg-[#049F43]",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06C755]",
                "disabled:cursor-not-allowed disabled:opacity-50 select-none",
                isCompact ? "h-10 text-xs" : "h-12 text-sm",
              )
        }
      >
        {isLineLoading ? (
          <Loader2
            className={cn(
              iconSize,
              "animate-spin",
              appearance === "surface" ? "text-text-muted" : "text-white/80",
            )}
            aria-hidden="true"
          />
        ) : (
          <LineBrandIcon
            className={cn(iconSize, "shrink-0")}
            onSurface={appearance === "surface"}
          />
        )}

        <span
          className={
            appearance === "surface" ? "text-text-primary" : "text-white"
          }
        >
          {lineLabel}
        </span>
      </button>
    </div>
  );
}
