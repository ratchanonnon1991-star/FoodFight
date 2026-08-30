import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { HeaderUtilities } from "./HeaderUtilities";
import type { AccountDropdownUser } from "./AccountDropdown";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils/cn";
import { PageContainer, type PageContainerProps } from "./PageContainer";

export interface AuthenticatedPageLayoutProps {
  children: React.ReactNode;
  maxWidth?: PageContainerProps["maxWidth"];
  className?: string;
}

export function AuthenticatedPageLayout({
  children,
  maxWidth = "auth",
  className,
}: AuthenticatedPageLayoutProps) {
  return (
    <main className="bg-transparent text-text-primary lg:min-h-[calc(100dvh-4rem)]">
      <PageContainer
        maxWidth={maxWidth}
        paddingY="none"
        className={cn(
          "space-y-6 pb-28 pt-2 sm:pt-4 lg:pb-8",
          className,
        )}
      >
        {children}
      </PageContainer>
    </main>
  );
}

export interface AuthenticatedPageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  backHref?: string;
  showAccountActions?: boolean;
  user?: AccountDropdownUser | null;
  onLogout?: () => void;
  actions?: React.ReactNode;
  className?: string;
}

export function AuthenticatedPageHeader({
  eyebrow,
  title,
  description,
  backHref = ROUTES.AUTHENTICATED_HOME,
  showAccountActions = true,
  user,
  onLogout,
  actions,
  className,
}: AuthenticatedPageHeaderProps) {
  return (
    <header className={cn("flex items-start justify-between gap-3 pb-1 pt-1", className)}>
      <div className="flex min-w-0 items-start gap-3">
        <Link
          href={backHref}
          aria-label="Back to home"
          className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white shadow-xs backdrop-blur-md transition-all hover:bg-black/30 hover:border-white/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-wider text-white/90 drop-shadow-2xs">
            {eyebrow}
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-xs">{title}</h1>
          {description ? (
            <p className="mt-0.5 text-xs sm:text-sm text-white/80 font-medium">{description}</p>
          ) : null}
        </div>
      </div>

      <div className="relative flex shrink-0 items-center gap-1.5">
        {actions}
        {showAccountActions ? (
          <HeaderUtilities
            user={user}
            onLogout={onLogout}
            className="lg:fixed lg:right-10 lg:top-3 lg:z-40 2xl:right-[calc((100vw-1440px)/2+2.5rem)]"
          />
        ) : null}
      </div>
    </header>
  );
}