"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/config/api";
import { apiFetch, getStoredAccessToken } from "@/config/api-client";
import { ROUTES } from "@/config/routes";
import { authService } from "@/features/auth/services/auth-runtime";
import type { UserRole } from "@/features/auth/types/auth-types";
import type { AccountDropdownUser } from "@/components/layout/AccountDropdown";

export interface UserProfileContextValue {
  user: AccountDropdownUser | null;
  isLoading: boolean;
  refreshProfile: () => Promise<void>;
  updateLocalProfile: (partial: Partial<AccountDropdownUser>) => void;
  logout: () => Promise<void>;
}

const UserProfileContext = React.createContext<UserProfileContextValue | null>(
  null,
);

export function UserProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = React.useState<AccountDropdownUser | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const fetchProfile = React.useCallback(async () => {
    const accessToken = getStoredAccessToken();

    if (!accessToken) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiFetch(
        `${API_BASE_URL}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
        accessToken,
      );

      if (!response.ok) {
        if (response.status === 401) {
          if (typeof window !== "undefined") {
            window.localStorage.removeItem("accessToken");
          }
          setUser(null);
        }
        return;
      }

      const data = (await response.json()) as {
        displayName?: string;
        email?: string;
        avatarUrl?: string | null;
        role?: UserRole;
      };

      const fallbackName = data.email?.split("@")[0] || "FoodFighter";

      setUser({
        name: data.displayName?.trim() || fallbackName,
        email: data.email,
        avatarUrl: data.avatarUrl ?? undefined,
        role: data.role,
      });
    } catch {
      // Non-blocking network error; preserve existing cached user if any
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void fetchProfile();

    const handleFocus = () => {
      if (document.visibilityState === "visible") {
        void fetchProfile();
      }
    };

    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleFocus);
    };
  }, [fetchProfile]);

  const updateLocalProfile = React.useCallback(
    (partial: Partial<AccountDropdownUser>) => {
      setUser((prev) => (prev ? { ...prev, ...partial } : null));
    },
    [],
  );

  const handleLogout = React.useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("accessToken");
      }
    } finally {
      setUser(null);
      router.replace(ROUTES.AUTH.LOGIN);
    }
  }, [router]);

  const value = React.useMemo(
    () => ({
      user,
      isLoading,
      refreshProfile: fetchProfile,
      updateLocalProfile,
      logout: handleLogout,
    }),
    [user, isLoading, fetchProfile, updateLocalProfile, handleLogout],
  );

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile(): UserProfileContextValue {
  const context = React.useContext(UserProfileContext);

  if (!context) {
    return {
      user: null,
      isLoading: false,
      refreshProfile: async () => {},
      updateLocalProfile: () => {},
      logout: async () => {},
    };
  }

  return context;
}
