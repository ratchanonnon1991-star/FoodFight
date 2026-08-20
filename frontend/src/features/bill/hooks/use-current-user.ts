"use client";

import * as React from "react";
import { apiFetch } from "@/lib/api/client";

export interface CurrentUser {
  sub: string;
  email: string;
  role: string;
}

export function useCurrentUser() {
  const [user, setUser] = React.useState<CurrentUser | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;

    apiFetch<CurrentUser>("/auth/me")
      .then((data) => {
        if (isMounted) {
          setUser(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setUser(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { user, isLoading };
}
