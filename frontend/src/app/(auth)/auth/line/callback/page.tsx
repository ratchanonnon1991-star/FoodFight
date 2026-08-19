"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ROUTES } from "@/config/routes";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8888";

const LINE_PROCESSED_CODE_KEY = "line_oauth_processed_code";

export default function LineCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");

      const state = searchParams.get("state");

      const providerError = searchParams.get("error");

      const providerErrorDescription = searchParams.get("error_description");

      const storedState = sessionStorage.getItem("line_oauth_state");

      if (providerError) {
        setError(
          providerErrorDescription
            ? `${providerError}: ${providerErrorDescription}`
            : `LINE returned an error: ${providerError}`,
        );

        return;
      }

      if (!code) {
        setError("LINE authorization code is missing.");

        return;
      }

      if (!state || !storedState || state !== storedState) {
        setError("Invalid LINE authentication state.");

        return;
      }

      const processedCode = sessionStorage.getItem(LINE_PROCESSED_CODE_KEY);

      if (processedCode === code) {
        return;
      }

      // Prevent React Strict Mode
      // from exchanging the same LINE code twice.
      sessionStorage.setItem(LINE_PROCESSED_CODE_KEY, code);

      try {
        const response = await fetch(`${API_URL}/auth/line/code`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code,
          }),
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
          sessionStorage.removeItem(LINE_PROCESSED_CODE_KEY);

          setError(
            Array.isArray(data?.message)
              ? data.message.join(", ")
              : (data?.message ?? "LINE authentication failed."),
          );

          return;
        }

        if (!data?.accessToken) {
          sessionStorage.removeItem(LINE_PROCESSED_CODE_KEY);

          setError("Access token was not returned.");

          return;
        }

        localStorage.setItem("accessToken", data.accessToken);

        sessionStorage.removeItem("line_oauth_state");

        sessionStorage.removeItem(LINE_PROCESSED_CODE_KEY);

        const foodProfileComplete = data.foodProfileComplete ?? false;

        if (foodProfileComplete) {
          router.replace(ROUTES.AUTHENTICATED_HOME);

          return;
        }

        router.replace(ROUTES.FOOD_PROFILE.ALLERGIES);
      } catch {
        sessionStorage.removeItem(LINE_PROCESSED_CODE_KEY);

        setError("Unable to connect to the server.");
      }
    };

    void handleCallback();
  }, [router, searchParams]);

  if (error) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="space-y-2 text-center">
          <h1 className="text-lg font-semibold">LINE Login Failed</h1>

          <p className="text-sm text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[300px] items-center justify-center">
      <div className="space-y-2 text-center">
        <h1 className="text-lg font-semibold">Signing in with LINE...</h1>

        <p className="text-sm text-gray-500">Please wait a moment.</p>
      </div>
    </div>
  );
}
