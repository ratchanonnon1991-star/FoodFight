"use client";

/* Profile images are supplied by external OAuth providers. */
/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import Link from "next/link";
import {
  Check,
  ChevronRight,
  Clock,
  Flame,
  Users,
  UtensilsCrossed,
} from "lucide-react";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils/cn";
import {
  MEMBER_IDENTITY_PALETTE_15,
  resolveRoomMemberAccents,
  type MemberIdentityAccent,
} from "@/lib/member-identity/member-identity";
import { useHomeLanguage } from "../i18n/HomeLanguageContext";
import type { HomeTranslations } from "../i18n/home-translations";
import type {
  CurrentFoodFightMember,
  CurrentFoodFightSession,
  FoodFightJourneyStepNumber,
} from "../types/home-types";

export interface CurrentFoodFightCardProps {
  session: CurrentFoodFightSession | null;
  isLoading?: boolean;
  onContinue?: () => void;
}

function getStatusBadgeStyles(status: string) {
  const normalized = status.toLowerCase();
  if (normalized.includes("progress") || normalized.includes("active")) {
    return "bg-brand-primary/10 text-brand-primary border-brand-primary/30";
  }
  if (normalized.includes("lobby") || normalized.includes("waiting")) {
    return "bg-accent-energy/15 text-text-primary border-accent-energy/40";
  }
  if (normalized.includes("completed") || normalized.includes("finished")) {
    return "bg-accent-fresh/15 text-accent-fresh border-accent-fresh/30";
  }
  return "bg-surface-subtle text-text-secondary border-border/70";
}

function getLocalizedStatus(status: string, t: HomeTranslations) {
  const normalized = status.toLowerCase();
  if (normalized.includes("progress") || normalized.includes("active")) {
    return t.currentFoodFight.statusInProgress;
  }
  if (normalized.includes("lobby") || normalized.includes("waiting")) {
    return t.currentFoodFight.statusLobby;
  }
  if (normalized.includes("completed") || normalized.includes("finished")) {
    return t.currentFoodFight.statusCompleted;
  }
  return status;
}

function FoodFightJourneyRail({
  currentStep,
  checkpoints,
}: {
  currentStep: FoodFightJourneyStepNumber;
  checkpoints: {
    lobby: string;
    preferences: string;
    menu: string;
    restaurant: string;
    bill: string;
  };
}) {
  const steps = [
    { num: 1 as const, label: checkpoints.lobby },
    { num: 2 as const, label: checkpoints.preferences },
    { num: 3 as const, label: checkpoints.menu },
    { num: 4 as const, label: checkpoints.restaurant },
    { num: 5 as const, label: checkpoints.bill },
  ];

  return (
    <div
      className="w-full space-y-1.5"
      role="group"
      aria-label="FoodFight Progress"
    >
      {/* Node and Line Track */}
      <div className="relative flex items-center justify-between px-1 sm:px-2">
        {steps.map((step, idx) => {
          const isCompleted = step.num < currentStep;
          const isCurrent = step.num === currentStep;
          const isUpcoming = step.num > currentStep;

          return (
            <React.Fragment key={step.num}>
              {/* Node */}
              <div className="relative z-10 flex flex-col items-center">
                <div
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full text-[0.7rem] font-bold shadow-2xs transition-all duration-200 sm:size-7 sm:text-xs",
                    isCompleted &&
                      "border-2 border-accent-fresh bg-accent-fresh/15 text-accent-fresh",
                    isCurrent &&
                      "border-2 border-brand-primary bg-brand-primary text-white shadow-xs",
                    isUpcoming &&
                      "border-2 border-border/80 bg-surface-subtle text-text-muted",
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check
                      className="size-3.5 stroke-[2.8] sm:size-4"
                      aria-hidden="true"
                    />
                  ) : (
                    <span>{step.num}</span>
                  )}

                  {/* Pulsing indicator for active step (reduced motion safe) */}
                  {isCurrent ? (
                    <span
                      className="absolute -inset-1 animate-ping rounded-full bg-brand-primary/25 motion-reduce:hidden"
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
              </div>

              {/* Connecting Line between nodes */}
              {idx < steps.length - 1 ? (
                <div
                  className={cn(
                    "mx-1 h-0.5 flex-1 rounded-full transition-colors duration-200 sm:mx-2",
                    step.num < currentStep ? "bg-accent-fresh" : "bg-border/60",
                  )}
                  aria-hidden="true"
                />
              ) : null}
            </React.Fragment>
          );
        })}
      </div>

      {/* Desktop 5 Labels */}
      <div
        className="hidden grid-cols-5 px-0.5 text-center text-[0.68rem] md:grid"
        aria-hidden="true"
      >
        {steps.map((step) => {
          const isCompleted = step.num < currentStep;
          const isCurrent = step.num === currentStep;

          return (
            <span
              key={step.num}
              className={cn(
                "truncate px-0.5 font-semibold",
                isCurrent && "font-bold text-brand-primary",
                isCompleted && "text-text-primary",
                !isCurrent && !isCompleted && "text-text-muted",
              )}
            >
              {step.label}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function CurrentFoodFightCard({
  session,
  isLoading = false,
  onContinue,
}: CurrentFoodFightCardProps) {
  const { t } = useHomeLanguage();
  const visibleMembers = session?.members.slice(0, 4) ?? [];
  const remainingMemberCount = session
    ? session.members.length - visibleMembers.length
    : 0;

  const accentsMap = React.useMemo(
    () => resolveRoomMemberAccents(session?.members ?? []),
    [session?.members],
  );

  return (
    <section
      aria-labelledby="current-foodfight-heading"
      className="space-y-2.5 sm:space-y-3"
    >
      {/* Section Title */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="size-4 text-brand-primary stroke-[2.2]" />
          <h2
            id="current-foodfight-heading"
            className="text-sm font-bold tracking-tight text-text-primary sm:text-base"
          >
            {t.currentFoodFight.heading}
          </h2>
        </div>
      </div>

      {isLoading ? (
        /* Loading Skeleton matching final card geometry */
        <div
          className="space-y-5 rounded-2xl border border-border/80 bg-surface p-5 shadow-xs sm:rounded-3xl sm:p-6"
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label="Loading current FoodFight"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-3.5 sm:gap-4">
              <div className="size-12 shrink-0 animate-pulse rounded-2xl bg-surface-subtle sm:size-14" />
              <div className="min-w-0 flex-1 space-y-2.5">
                <div className="h-5 w-3/5 animate-pulse rounded-lg bg-surface-subtle sm:h-6" />
                <div className="h-4 w-2/5 animate-pulse rounded-md bg-surface-subtle" />
              </div>
            </div>
            <div className="aspect-[4/3] w-24 shrink-0 animate-pulse rounded-2xl bg-surface-subtle sm:w-32 md:w-40" />
          </div>
          <div className="flex items-center justify-between gap-3 border-t border-border/50 pt-3">
            <div className="h-8 w-24 animate-pulse rounded-full bg-surface-subtle" />
            <div className="h-9 w-28 animate-pulse rounded-xl bg-surface-subtle" />
          </div>
        </div>
      ) : session ? (
        /* Focal Active Card */
        <div className="group relative space-y-4 rounded-2xl border border-border/80 bg-surface p-5 shadow-xs transition-all duration-200 hover:shadow-md sm:space-y-5 sm:rounded-3xl sm:p-6">
          {/* Main Info Row with Left Content & Right 4:3 Media Slot */}
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            {/* Left Content Area */}
            <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
              {/* Room Leading Badge */}
              <div className="mt-0.5 flex size-11 shrink-0 items-center justify-center rounded-2xl border border-brand-primary/20 bg-brand-primary/10 text-brand-primary shadow-2xs sm:size-13">
                <Flame
                  className="size-5 stroke-[2.2] sm:size-6"
                  aria-hidden="true"
                />
              </div>

              {/* Room Details */}
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate text-base font-extrabold tracking-tight text-text-primary sm:text-lg md:text-xl">
                    {session.title}
                  </h3>
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 text-[0.7rem] font-bold uppercase tracking-wide sm:text-xs",
                      getStatusBadgeStyles(session.status),
                    )}
                  >
                    {getLocalizedStatus(session.status, t)}
                  </span>
                </div>

                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-2 text-xs text-text-secondary sm:text-sm">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-text-primary">
                    <Users className="size-3.5 text-text-secondary sm:size-4" />
                    {t.currentFoodFight.membersLabel(session.memberCount)}
                  </span>
                  {!session.journey && session.statusDescription ? (
                    <>
                      <span className="text-border-disabled">|</span>
                      <span className="inline-flex items-center gap-1.5 text-text-secondary">
                        <Clock className="size-3.5 text-text-muted sm:size-4" />
                        {session.statusDescription}
                      </span>
                    </>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Right: 4:3 Hero 3D Media Slot */}
            <div
              aria-hidden="true"
              className="flex aspect-[4/3] w-20 shrink-0 select-none items-center justify-center overflow-hidden rounded-2xl sm:w-28 md:w-36"
            >
              <img
                src="/images/home/home-current-foodfight.webp"
                alt=""
                className="size-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Live Journey Checkpoint Section */}
          {session.journey ? (
            <div className="space-y-3 rounded-2xl border border-border-subtle bg-surface-subtle/80 p-3.5 sm:p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-extrabold tracking-tight text-brand-primary sm:text-sm">
                    {session.journey.stageName}
                  </span>
                  <p className="mt-0.5 truncate text-[0.75rem] font-medium leading-tight text-text-secondary sm:text-xs">
                    {session.journey.stageSubLabel}
                  </p>
                </div>
                <span className="inline-flex shrink-0 items-center rounded-full border border-border bg-surface px-2.5 py-0.5 text-[0.7rem] font-bold text-text-primary shadow-2xs sm:text-xs">
                  {t.currentFoodFight.stepIndicator(
                    session.journey.currentStep,
                    5,
                  )}
                </span>
              </div>

              <FoodFightJourneyRail
                currentStep={session.journey.currentStep}
                checkpoints={t.currentFoodFight.checkpoints}
              />
            </div>
          ) : null}

          {/* Bottom Action & Member Stack */}
          <div className="flex items-center justify-between gap-3 border-t border-border/50 pt-3">
            {/* Member Avatar Stack */}
            <div
              className="flex items-center -space-x-2"
              aria-label="Room members"
            >
              {visibleMembers.map((member, index) => {
                const memberKey = member.userId || member.id;
                const accent =
                  accentsMap.get(memberKey) ?? MEMBER_IDENTITY_PALETTE_15[0];

                return (
                  <div
                    key={`${member.id}-${index}`}
                    className={cn(
                      "relative flex size-8 items-center justify-center overflow-hidden rounded-full border-2 border-surface font-bold shadow-2xs sm:size-9",
                      accent.ringClass,
                      member.avatarUrl ? "bg-white" : accent.initialsBgClass,
                    )}
                    title={member.name}
                  >
                    <MemberAvatar member={member} accent={accent} />
                  </div>
                );
              })}
              {remainingMemberCount > 0 ? (
                <div className="flex size-8 items-center justify-center rounded-full border-2 border-surface bg-surface-subtle text-xs font-bold text-text-secondary shadow-2xs sm:size-9">
                  +{remainingMemberCount}
                </div>
              ) : null}
            </div>

            {/* Continue Primary CTA Button */}
            {session.continueHref ? (
              <Link
                href={session.continueHref}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-brand-primary px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors hover:bg-brand-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring active:scale-[0.98] sm:px-5 sm:py-2.5 sm:text-sm"
              >
                <span>{t.currentFoodFight.continueCta}</span>
                <ChevronRight className="size-4 stroke-[2.5]" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={onContinue}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-brand-primary px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors hover:bg-brand-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring active:scale-[0.98] sm:px-5 sm:py-2.5 sm:text-sm"
              >
                <span>{t.currentFoodFight.continueCta}</span>
                <ChevronRight className="size-4 stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="space-y-3 rounded-2xl border border-dashed border-border/90 bg-surface p-6 text-center shadow-xs sm:rounded-3xl sm:p-8">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl border border-brand-primary/20 bg-brand-primary/10 text-brand-primary shadow-2xs sm:size-14">
            <UtensilsCrossed className="size-6 stroke-[1.8] sm:size-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-text-primary sm:text-lg">
              {t.currentFoodFight.noActiveTitle}
            </h3>
            <p className="mx-auto max-w-xs text-xs leading-relaxed text-text-secondary sm:text-sm">
              {t.currentFoodFight.noActiveDesc}
            </p>
          </div>
          <div className="pt-2">
            <Link
              href={ROUTES.ROOM.CREATE}
              className="inline-flex items-center gap-1.5 rounded-xl bg-brand-primary px-4 py-2 text-xs font-bold text-white shadow-xs transition-colors hover:bg-brand-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring sm:text-sm"
            >
              <span>{t.currentFoodFight.startCta}</span>
              <ChevronRight className="size-4 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}

function MemberAvatar({
  member,
  accent,
}: {
  member: CurrentFoodFightMember;
  accent?: MemberIdentityAccent;
}) {
  const [failedImageUrl, setFailedImageUrl] = React.useState<string | null>(
    null,
  );
  const shouldShowImage = Boolean(
    member.avatarUrl && failedImageUrl !== member.avatarUrl,
  );

  if (shouldShowImage) {
    return (
      <img
        key={member.avatarUrl}
        src={member.avatarUrl ?? undefined}
        alt={`${member.name}'s profile`}
        className="size-full rounded-full object-cover"
        referrerPolicy="no-referrer"
        onError={() => setFailedImageUrl(member.avatarUrl ?? null)}
      />
    );
  }

  return (
    <span
      className={cn(
        "text-[0.65rem] sm:text-xs font-bold",
        accent ? "" : "text-text-secondary",
      )}
      aria-hidden="true"
    >
      {getInitials(member.name) || "?"}
    </span>
  );
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}
