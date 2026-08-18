import * as React from "react";
import Link from "next/link";
import { ROUTES } from "@/config/routes";
import { PageContainer } from "@/components/layout/PageContainer";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";

export interface HomeHeroProps {
  className?: string;
}

export function HomeHero({ className }: HomeHeroProps) {
  return (
    <main className={cn("flex-1 flex items-center justify-center py-12 sm:py-20", className)}>
      <PageContainer maxWidth="sm" className="text-center space-y-6">
        {/* Brand & Heading */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-brand-primary">
            FoodFighter
          </h1>
          <p className="text-base sm:text-lg font-medium text-text-primary">
            AI-Powered Group Meal Decision Platform
          </p>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-md mx-auto">
            End the daily group meal dilemma. Set your taste preferences, let AI generate personalized dish recommendations, and vote together to reach consensus effortlessly.
          </p>
        </div>

        {/* Public Entry Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href={ROUTES.AUTH.REGISTER}
            className={cn(
              buttonVariants({ variant: "primary", size: "lg" }),
              "w-full sm:w-auto min-w-[160px] h-12 text-sm font-semibold justify-center"
            )}
          >
            Get Started
          </Link>
          <Link
            href={ROUTES.AUTH.LOGIN}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "w-full sm:w-auto min-w-[160px] h-12 text-sm font-semibold justify-center"
            )}
          >
            Log in
          </Link>
        </div>
      </PageContainer>
    </main>
  );
}
