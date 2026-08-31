"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/config/routes";
import { apiFetch, getStoredAccessToken } from "@/config/api-client";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button, buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

import { useLanguage } from "@/i18n/LanguageProvider";
import { commonTranslations } from "@/i18n/common-translations";
import { LanguageSwitcher } from "@/components/language/LanguageSwitcher";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8888";

type AuthenticatedUser = {
  sub: string;
  email: string;
  role: string;
};

export interface PublicHeaderProps {
  className?: string;
}

export function PublicHeader({ className }: PublicHeaderProps) {
  const router = useRouter();
  const { locale } = useLanguage();
  const t = commonTranslations[locale].publicHeader;
  const [user, setUser] = React.useState<AuthenticatedUser | null>(null);
  const [isCheckingSession, setIsCheckingSession] = React.useState(true);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    const accessToken = getStoredAccessToken();

    if (!accessToken) {
      void Promise.resolve().then(() => {
        if (isMounted) {
          setIsCheckingSession(false);
        }
      });

      return () => {
        isMounted = false;
      };
    }

    apiFetch(`${API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }, accessToken)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Session is no longer valid");
        }

        return (await response.json()) as AuthenticatedUser;
      })
      .then((authenticatedUser) => {
        if (isMounted) {
          setUser(authenticatedUser);
        }
      })
      .catch(() => {
        window.localStorage.removeItem("accessToken");

        if (isMounted) {
          setUser(null);
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsCheckingSession(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    const accessToken = getStoredAccessToken();

    setIsLoggingOut(true);

    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
        headers: accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : undefined,
      });
    } finally {
      window.localStorage.removeItem("accessToken");
      setUser(null);
      setIsLoggingOut(false);
      router.replace(ROUTES.AUTH.LOGIN);
    }
  };

  return (
    <header className={cn("border-b border-border bg-surface", className)}>
      <PageContainer
        maxWidth="lg"
        paddingY="none"
        className="h-16 flex items-center justify-between gap-4"
      >
        {/* Brand */}
        <Link
          href={ROUTES.HOME}
          className="text-xl font-bold tracking-tight text-brand-primary hover:text-brand-primary-hover transition-colors focus-visible:outline-2 focus-visible:outline-brand-secondary rounded-sm"
          aria-label="FoodFighter Home"
        >
          FoodFighter
        </Link>

        {/* Account Navigation & Language Switcher */}
        <nav aria-label={t.accountActions} className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher variant="subtle" />

          {isCheckingSession ? (
            <span className="text-xs text-text-muted" aria-live="polite">
              {t.checkingSession}
            </span>
          ) : user ? (
            <>
              <span
                className="hidden max-w-56 truncate text-xs font-medium text-text-secondary sm:inline"
                title={user.email}
              >
                {user.email}
              </span>
              <Button
                type="button"
                variant="outline"
                size="sm"
                loading={isLoggingOut}
                onClick={handleLogout}
                className="text-xs sm:text-sm min-h-[40px]"
              >
                {t.logOut}
              </Button>
            </>
          ) : (
            <>
              <Link
                href={ROUTES.AUTH.LOGIN}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "text-xs sm:text-sm font-semibold text-text-secondary hover:text-text-primary px-3 sm:px-4 min-h-[40px] inline-flex items-center justify-center",
                )}
              >
                {t.logIn}
              </Link>
              <Link
                href={ROUTES.AUTH.REGISTER}
                className={cn(
                  buttonVariants({ variant: "primary", size: "sm" }),
                  "text-xs sm:text-sm font-semibold px-3 sm:px-4 min-h-[40px] inline-flex items-center justify-center",
                )}
              >
                {t.register}
              </Link>
            </>
          )}
        </nav>
      </PageContainer>
    </header>
  );
}
