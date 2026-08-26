"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Spinner } from "@/components/ui/Spinner";
import { ROUTES } from "@/config/routes";
import { getStoredAccessToken } from "@/config/api-client";
import { useAuthFlow } from "@/features/auth/context/auth-flow-context";

export function GuestOnlyGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isHydrating } = useAuthFlow();
  const [isChecking, setIsChecking] = React.useState(true);

  React.useEffect(() => {
    if (isHydrating) {
      return;
    }

    let isMounted = true;

    void Promise.resolve().then(() => {
      if (!isMounted) {
        return;
      }

      if (isAuthenticated || getStoredAccessToken()) {
        router.replace(ROUTES.AUTHENTICATED_HOME);
        return;
      }

      setIsChecking(false);
    });

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, isHydrating, router]);

  if (isHydrating || isChecking) {
    return <GuestSessionLoading />;
  }

  return <>{children}</>;
}

function GuestSessionLoading() {
  return (
    <div
      className="flex min-h-48 flex-col items-center justify-center gap-3 text-center"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <Spinner size="lg" />
      <p className="text-sm text-text-secondary">Checking your session...</p>
    </div>
  );
}
