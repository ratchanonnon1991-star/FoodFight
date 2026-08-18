import * as React from "react";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { PageContainer } from "@/components/layout/PageContainer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

export interface PublicHeaderProps {
  className?: string;
}

export function PublicHeader({ className }: PublicHeaderProps) {
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

        {/* Public Navigation */}
        <nav aria-label="Account actions" className="flex items-center gap-2 sm:gap-3">
          <Link
            href={ROUTES.AUTH.LOGIN}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "text-xs sm:text-sm font-semibold text-text-secondary hover:text-text-primary px-3 sm:px-4 min-h-[40px] inline-flex items-center justify-center"
            )}
          >
            Log in
          </Link>
          <Link
            href={ROUTES.AUTH.REGISTER}
            className={cn(
              buttonVariants({ variant: "primary", size: "sm" }),
              "text-xs sm:text-sm font-semibold px-3 sm:px-4 min-h-[40px] inline-flex items-center justify-center"
            )}
          >
            Register
          </Link>
        </nav>
      </PageContainer>
    </header>
  );
}
