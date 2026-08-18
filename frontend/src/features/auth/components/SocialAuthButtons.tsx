"use client";

import * as React from "react";
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
 * Official multicolor Google "G" brand icon
 */
function GoogleGIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      focusable="false"
    >
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
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

  const isGoogleLoading = loadingProvider === "google";
  const isLineLoading = loadingProvider === "line";
  const isAnyLoading = loadingProvider !== null;
  const isCompact = density === "compact";
  const buttonSize = isCompact ? "h-10 text-xs" : "h-12 text-sm";
  const iconSize = isCompact ? "size-4" : "size-5";

  return (
    <div className={cn("flex w-full flex-col", isCompact ? "space-y-2" : "space-y-3")}>
      {/* 1. Official Google Identity Button */}
      <button
        type="button"
        id="google-auth-button"
        onClick={handleGoogleAuth}
        disabled={disabled || isAnyLoading}
        aria-label={googleLabel}
        className={cn("flex w-full items-center justify-center gap-3 rounded-xl border border-border/80 bg-surface px-4 font-semibold text-text-primary shadow-sm transition-all hover:bg-surface-subtle/80 active:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary disabled:cursor-not-allowed disabled:opacity-50 select-none", buttonSize)}
      >
        {isGoogleLoading ? (
          <Loader2 className={cn(iconSize, "animate-spin text-text-muted")} aria-hidden="true" />
        ) : (
          <GoogleGIcon className={cn(iconSize, "shrink-0")} />
        )}
        <span>{googleLabel}</span>
      </button>

      {/* 2. Official LINE Identity Button */}
      <button
        type="button"
        id="line-auth-button"
        onClick={handleLineAuth}
        disabled={disabled || isAnyLoading}
        aria-label={lineLabel}
        className={
          appearance === "surface"
            ? cn("flex w-full items-center justify-center gap-3 rounded-xl border border-border/80 bg-surface px-4 font-semibold text-text-primary shadow-sm transition-all hover:bg-surface-subtle/80 active:bg-surface-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary disabled:cursor-not-allowed disabled:opacity-50 select-none", buttonSize)
            : cn("flex w-full items-center justify-center gap-3 rounded-xl bg-[#06C755] px-4 font-semibold text-white shadow-sm transition-all hover:bg-[#05B34C] active:bg-[#049F43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06C755] disabled:cursor-not-allowed disabled:opacity-50 select-none", buttonSize)
        }
      >
        {isLineLoading ? (
          <Loader2 className={cn(iconSize, "animate-spin text-white/80")} aria-hidden="true" />
        ) : (
          <LineBrandIcon className={cn(iconSize, "shrink-0")} onSurface={appearance === "surface"} />
        )}
        <span className={appearance === "surface" ? "text-text-primary" : "text-white"}>{lineLabel}</span>
      </button>
    </div>
  );
}
