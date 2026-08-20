"use client";

import * as React from "react";
import { API_BASE_URL } from "@/config/api";
import {
  apiFetch,
  getStoredAccessToken,
} from "@/config/api-client";
import { ROUTES } from "@/config/routes";
import { PageContainer } from "@/components/layout/PageContainer";

const SESSION_CHECK_TIMEOUT_MS = 4_000;

function withSessionTimeout<T>(promise: Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      reject(new Error("Session check timed out"));
    }, SESSION_CHECK_TIMEOUT_MS);

    promise.then(
      (value) => {
        window.clearTimeout(timeoutId);
        resolve(value);
      },
      (error) => {
        window.clearTimeout(timeoutId);
        reject(error);
      },
    );
  });
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isChecking, setIsChecking] = React.useState(true);
  const [isAuthorized, setIsAuthorized] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;

    const validateSession = async () => {
      try {
        const accessToken = getStoredAccessToken();

        if (!accessToken) {
          window.location.replace(ROUTES.AUTH.LOGIN);
          return;
        }

        const headers: Record<string, string> = {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await withSessionTimeout(
          apiFetch(
            `${API_BASE_URL}/auth/me`,
            { headers },
            accessToken,
          ),
        );

        if (!response.ok) {
          throw new Error("Session is no longer valid");
        }

        if (isMounted) {
          setIsAuthorized(true);
        }
      } catch {
        window.localStorage.removeItem("accessToken");

        if (isMounted) {
          window.location.replace(ROUTES.AUTH.LOGIN);
        }
      } finally {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    };

    void validateSession();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isChecking) {
    return (
      <main className="min-h-dvh bg-background">
        <PageContainer maxWidth="auth" className="flex min-h-dvh items-center justify-center">
          <p className="text-sm text-text-secondary" role="status" aria-live="polite">
            Checking your session...
          </p>
        </PageContainer>
      </main>
    );
  }

  if (!isAuthorized) {
    return (
      <main className="min-h-dvh bg-background">
        <PageContainer maxWidth="auth" className="flex min-h-dvh items-center justify-center">
          <p className="text-sm text-text-secondary" role="status" aria-live="polite">
            Redirecting to login...
          </p>
        </PageContainer>
      </main>
    );
  }

  return <>{children}</>;
}
