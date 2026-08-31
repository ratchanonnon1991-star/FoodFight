"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/Spinner";
import { ROUTES } from "@/config/routes";
import { API_BASE_URL } from "@/config/api";
import type { UserRole } from "@/features/auth/types/auth-types";

export interface AdminUserContext {
  sub: string;
  email: string;
  role: UserRole;
  displayName: string;
  avatarUrl?: string | null;
}

export const AdminUserReactContext = React.createContext<AdminUserContext | null>(
  null
);

export function useAdminUser(): AdminUserContext | null {
  return React.useContext(AdminUserReactContext);
}

export interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const router = useRouter();
  const [adminUser, setAdminUser] = React.useState<AdminUserContext | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;
    const accessToken = window.localStorage.getItem("accessToken");

    if (!accessToken) {
      router.replace(ROUTES.AUTH.LOGIN);
      return () => {
        isMounted = false;
      };
    }

    fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Unauthorized");
        }
        return (await response.json()) as AdminUserContext;
      })
      .then((user) => {
        if (!isMounted) return;

        if (user.role !== "ADMIN") {
          router.replace(ROUTES.AUTHENTICATED_HOME);
          return;
        }

        setAdminUser(user);
        setIsLoading(false);
      })
      .catch(() => {
        window.localStorage.removeItem("accessToken");
        if (isMounted) {
          router.replace(ROUTES.AUTH.LOGIN);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (isLoading || !adminUser) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center bg-background px-4 text-text-primary">
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" variant="primary" />
          <p className="text-sm font-medium text-text-secondary">
            Verifying admin authorization...
          </p>
        </div>
      </div>
    );
  }

  return (
    <AdminUserReactContext.Provider value={adminUser}>
      {children}
    </AdminUserReactContext.Provider>
  );
}
