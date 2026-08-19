"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { ROUTES } from "@/config/routes";
import { SocialAuthButtons } from "@/features/auth/components/SocialAuthButtons";

/** Handles the existing social auth flow when it is started from the public landing page. */
export function LandingSocialAuth({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);

  return (
    <div className={compact ? "space-y-2" : "space-y-3"}>
      {error ? (
        <Alert variant="error">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      <SocialAuthButtons
        appearance="brand"
        density={compact ? "compact" : "default"}
        onSuccess={(foodProfileComplete) =>
          router.push(
            foodProfileComplete
              ? ROUTES.AUTHENTICATED_HOME
              : ROUTES.FOOD_PROFILE.ALLERGIES,
          )
        }
        onError={setError}
      />
    </div>
  );
}
