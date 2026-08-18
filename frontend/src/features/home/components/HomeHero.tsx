import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Bot, Crown, LogIn, Sparkles, UsersRound, UtensilsCrossed, Zap } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/lib/utils/cn";
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
        <header className="flex h-[47%] flex-none flex-col items-center justify-center pt-5 sm:h-auto sm:min-h-0 sm:flex-1" aria-label="FoodFighter">
          <div className="relative mb-1 flex size-12 items-center justify-center rounded-full bg-surface/90 text-brand-primary shadow-md sm:size-16">
            <Crown className="absolute -top-3 size-6 fill-accent-custard text-yellow-500" aria-hidden="true" />
            <UtensilsCrossed className="size-7 sm:size-9" strokeWidth={2.6} aria-hidden="true" />
          </div>
          <h1 aria-label="FoodFighter" className="text-[clamp(2.5rem,12vw,5.25rem)] font-extrabold leading-[0.8] tracking-[-0.075em] text-brand-primary [text-shadow:0_3px_0_rgb(255_255_255_/_0.9),0_8px_18px_rgb(72_40_74_/_0.16)]">
            Food<br />Fighter
          </h1>
        </header>

        <section className="mx-auto max-w-sm pb-3" aria-labelledby="landing-heading">
          <div className="space-y-1.5">
            <h2 id="landing-heading" className="text-lg font-bold leading-5 tracking-tight text-brand-primary sm:text-2xl sm:leading-7">
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
            Get Started <Sparkles className="size-5 text-accent-custard" aria-hidden="true" />
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

        <div className="flex items-center gap-3 py-2 text-[0.65rem] font-semibold text-brand-primary" aria-hidden="true">
          <span className="h-px flex-1 bg-border" />
          OR
          <span className="h-px flex-1 bg-border" />
        </div>

        <LandingSocialAuth compact />

        <section className="mt-3 grid flex-none grid-cols-3 divide-x divide-border-subtle rounded-2xl border border-border-subtle bg-surface/80 px-1 py-2.5 text-center shadow-sm" aria-label="FoodFighter benefits">
          <Benefit icon={<UsersRound aria-hidden="true" />} title="Group Voting" tone="petal" />
          <Benefit icon={<Bot aria-hidden="true" />} title="AI Recommendations" tone="lavender" />
          <Benefit icon={<Zap aria-hidden="true" />} title="Save Time" tone="custard" />
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
  tone: "petal" | "lavender" | "custard";
}) {
  const iconTone = {
    petal: "bg-accent-petal/45 text-brand-primary",
    lavender: "bg-violet-100 text-brand-primary",
    custard: "bg-accent-custard/50 text-green-600",
  }[tone];

  return (
    <div className="flex min-w-0 flex-col items-center px-1.5 sm:px-3">
      <div className={cn("mb-1.5 flex size-8 items-center justify-center rounded-full sm:size-10", iconTone)}>{icon}</div>
      <h3 className="text-[0.6rem] font-bold leading-3 text-brand-primary sm:text-xs">{title}</h3>
    </div>
  );
}
