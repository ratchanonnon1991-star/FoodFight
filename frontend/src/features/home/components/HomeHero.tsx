import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bot, LogIn, Sparkles, UsersRound, Zap } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
import { BrandMark } from "@/design-system";
import { LandingSocialAuth } from "./LandingSocialAuth";

export interface HomeHeroProps {
  className?: string;
}

export function HomeHero({ className }: HomeHeroProps) {
  return (
    <main className={cn("relative h-dvh overflow-hidden bg-background", className)}>
      <Image
        src="/food-fighter-landing-background-desktop-v1.png"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="hidden object-cover lg:block"
      />
      <Image
        src="/food-fighter-landing-background-v2.png"
        alt=""
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover lg:hidden"
      />
      <div className="relative z-10 mx-auto flex h-full w-full max-w-md flex-col px-5 py-4 text-center sm:max-w-xl sm:px-8">
        <header className="flex h-[47%] flex-none flex-col items-center justify-center pt-1 sm:h-auto sm:min-h-0 sm:flex-1" aria-label="FoodFighter">
          <h1 aria-label="FoodFighter" className="flex items-center justify-center">
            <BrandMark
              variant="stacked"
              width={220}
              height={275}
              priority
              alt="FoodFighter"
              className="h-auto w-[208px] sm:w-[230px] drop-shadow-sm"
            />
          </h1>
        </header>

        <section className="mx-auto max-w-sm pb-3" aria-labelledby="landing-heading">
          <div className="space-y-1.5">
            <h2 id="landing-heading" className="text-lg font-bold leading-5 tracking-tight text-text-primary sm:text-2xl sm:leading-7">
              AI-Powered Group Meal Decision Platform
            </h2>
            <p className="text-xs leading-4 text-text-secondary sm:text-sm sm:leading-5">
              End the daily group meal dilemma. Set your taste preferences, let AI generate personalized dish recommendations, and vote together to reach consensus effortlessly.
            </p>
          </div>
        </section>

        <section className="space-y-2" aria-label="Account actions">
          <Link
            href={ROUTES.AUTH.REGISTER}
            className={cn(
              buttonVariants({ variant: "primary", size: "lg" }),
              "h-11 w-full rounded-xl text-base font-bold shadow-md sm:h-12"
            )}
          >
            Get Started <Sparkles className="size-5 text-accent-energy" aria-hidden="true" />
          </Link>
          <Link
            href={ROUTES.AUTH.LOGIN}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 w-full rounded-xl border-2 border-brand-primary bg-surface/85 text-base font-bold sm:h-12"
            )}
          >
            <LogIn className="size-6" aria-hidden="true" /> Log in
          </Link>
        </section>

        <div className="flex items-center gap-3 py-2 text-[0.65rem] font-semibold text-text-secondary" aria-hidden="true">
          <span className="h-px flex-1 bg-border" />
          OR
          <span className="h-px flex-1 bg-border" />
        </div>

        <LandingSocialAuth compact />

        <section className="mt-3 grid flex-none grid-cols-3 divide-x divide-border-subtle rounded-2xl border border-border-subtle bg-surface/80 px-1 py-2.5 text-center shadow-sm" aria-label="FoodFighter benefits">
          <Benefit icon={<UsersRound aria-hidden="true" />} title="Group Voting" tone="chili" />
          <Benefit icon={<Bot aria-hidden="true" />} title="AI Recommendations" tone="saffron" />
          <Benefit icon={<Zap aria-hidden="true" />} title="Save Time" tone="herb" />
        </section>
      </div>
    </main>
  );
}

function Benefit({
  icon,
  title,
  tone,
}: {
  icon: React.ReactNode;
  title: string;
  tone: "chili" | "saffron" | "herb";
}) {
  const iconTone = {
    chili: "bg-accent-warm text-brand-primary",
    saffron: "bg-accent-energy/25 text-text-primary",
    herb: "bg-accent-fresh/20 text-accent-fresh",
  }[tone];

  return (
    <div className="flex min-w-0 flex-col items-center px-1.5 sm:px-3">
      <div className={cn("mb-1.5 flex size-8 items-center justify-center rounded-full sm:size-10", iconTone)}>{icon}</div>
      <h3 className="text-[0.6rem] font-bold leading-3 text-text-primary sm:text-xs">{title}</h3>
    </div>
  );
}
