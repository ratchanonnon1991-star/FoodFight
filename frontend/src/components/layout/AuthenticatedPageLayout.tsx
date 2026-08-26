import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
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
    <main className="min-h-dvh bg-background text-text-primary lg:min-h-[calc(100dvh-4rem)]">
      <PageContainer
        maxWidth={maxWidth}
        paddingY="none"
        className={cn(
          "space-y-6 pb-28 pt-5 sm:pt-8 lg:pb-8",
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
  className?: string;
}

export function AuthenticatedPageHeader({
  eyebrow,
  title,
  description,
  backHref = ROUTES.AUTHENTICATED_HOME,
  className,
}: AuthenticatedPageHeaderProps) {
  return (
    <header className={cn("flex items-start gap-3", className)}>
      <Link
        href={backHref}
        aria-label="Back to home"
        className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-text-secondary hover:text-text-primary"
      >
        <ArrowLeft className="size-5" />
      </Link>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
          {eyebrow}
        </p>
        <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-text-secondary">{description}</p>
        ) : null}
      </div>
    </header>
  );
}
