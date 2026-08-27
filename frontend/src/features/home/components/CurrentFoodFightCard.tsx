"use client";

/* Profile images are supplied by external OAuth providers. */
/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import Link from "next/link";
import { ChevronRight, Clock, Flame, Users, UtensilsCrossed } from "lucide-react";
import { ROUTES } from "@/config/routes";
import { cn } from "@/lib/utils/cn";
import { useHomeLanguage } from "../i18n/HomeLanguageContext";
import type { HomeTranslations } from "../i18n/home-translations";
import type {
  CurrentFoodFightMember,
  CurrentFoodFightSession,
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
            className="text-sm sm:text-base font-bold text-text-primary tracking-tight"
          >
            {t.currentFoodFight.heading}
          </h2>
        </div>
      </div>

      {isLoading ? (
        /* Loading Skeleton matching final card geometry */
        <div
          className="rounded-2xl sm:rounded-3xl border border-border/80 bg-surface p-5 sm:p-6 shadow-xs space-y-5"
          role="status"
          aria-live="polite"
          aria-busy="true"
          aria-label="Loading current FoodFight"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
              <div className="size-12 sm:size-14 shrink-0 animate-pulse rounded-2xl bg-surface-subtle" />
              <div className="min-w-0 flex-1 space-y-2.5">
                <div className="h-5 sm:h-6 w-3/5 animate-pulse rounded-lg bg-surface-subtle" />
                <div className="h-4 w-2/5 animate-pulse rounded-md bg-surface-subtle" />
              </div>
            </div>
            <div className="w-24 sm:w-32 md:w-40 aspect-[4/3] shrink-0 animate-pulse rounded-2xl bg-surface-subtle" />
          </div>
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/50">
            <div className="h-8 w-24 animate-pulse rounded-full bg-surface-subtle" />
            <div className="h-9 w-28 animate-pulse rounded-xl bg-surface-subtle" />
          </div>
        </div>
      ) : session ? (
        /* Focal Active Card */
        <div className="group relative rounded-2xl sm:rounded-3xl border border-border/80 bg-surface p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-200 space-y-4 sm:space-y-5">
          {/* Main Info Row with Left Content & Right 4:3 Media Slot */}
          <div className="flex items-start justify-between gap-3 sm:gap-4">
            {/* Left Content Area */}
            <div className="flex items-start gap-3 sm:gap-4 min-w-0 flex-1">
              {/* Room Leading Badge */}
              <div className="size-11 sm:size-13 shrink-0 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary shadow-2xs mt-0.5">
                <Flame className="size-5 sm:size-6 stroke-[2.2]" aria-hidden="true" />
              </div>

              {/* Room Details */}
              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg md:text-xl font-extrabold text-text-primary tracking-tight truncate">
                    {session.title}
                  </h3>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-0.5 text-[0.7rem] sm:text-xs font-bold border tracking-wide uppercase",
                      getStatusBadgeStyles(session.status)
                    )}
                  >
                    {getLocalizedStatus(session.status, t)}
                  </span>
                </div>

                {/* Metadata Row */}
                <div className="flex items-center gap-2 text-xs sm:text-sm text-text-secondary flex-wrap">
                  <span className="inline-flex items-center gap-1.5 font-semibold text-text-primary">
                    <Users className="size-3.5 sm:size-4 text-text-secondary" />
                    {t.currentFoodFight.membersLabel(session.memberCount)}
                  </span>
                  <span className="text-border-disabled">|</span>
                  <span className="inline-flex items-center gap-1.5 text-text-secondary">
                    <Clock className="size-3.5 sm:size-4 text-text-muted" />
                    {session.statusDescription}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: 4:3 Hero 3D Media Slot */}
            <div
              aria-hidden="true"
              className="w-24 sm:w-32 md:w-40 aspect-[4/3] shrink-0 rounded-2xl flex items-center justify-center select-none overflow-hidden"
            >
              <img
                src="/images/home/home-current-foodfight.webp"
                alt=""
                className="size-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Bottom Action & Member Stack */}
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-border/50">
            {/* Member Avatar Stack */}
            <div
              className="flex items-center -space-x-2"
              aria-label="Room members"
            >
              {visibleMembers.map((member, index) => (
                <div
                  key={`${member.id}-${index}`}
                  className="size-8 sm:size-9 rounded-full bg-surface-subtle border-2 border-surface flex items-center justify-center text-text-muted shadow-2xs overflow-hidden"
                  title={member.name}
                >
                  <MemberAvatar member={member} />
                </div>
              ))}
              {remainingMemberCount > 0 ? (
                <div className="size-8 sm:size-9 rounded-full bg-surface-subtle border-2 border-surface flex items-center justify-center text-xs font-bold text-text-secondary shadow-2xs">
                  +{remainingMemberCount}
                </div>
              ) : null}
            </div>

            {/* Continue Primary CTA Button */}
            {session.continueHref ? (
              <Link
                href={session.continueHref}
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover font-bold text-xs sm:text-sm text-white shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring cursor-pointer active:scale-[0.98]"
              >
                <span>{t.currentFoodFight.continueCta}</span>
                <ChevronRight className="size-4 stroke-[2.5]" />
              </Link>
            ) : (
              <button
                type="button"
                onClick={onContinue}
                className="inline-flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary-hover font-bold text-xs sm:text-sm text-white shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring cursor-pointer active:scale-[0.98]"
              >
                <span>{t.currentFoodFight.continueCta}</span>
                <ChevronRight className="size-4 stroke-[2.5]" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-2xl sm:rounded-3xl border border-dashed border-border/90 bg-surface p-6 sm:p-8 text-center shadow-xs space-y-3">
          <div className="mx-auto flex size-12 sm:size-14 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary border border-brand-primary/20 shadow-2xs">
            <UtensilsCrossed className="size-6 sm:size-7 stroke-[1.8]" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-text-primary">
              {t.currentFoodFight.noActiveTitle}
            </h3>
            <p className="mx-auto max-w-xs text-xs sm:text-sm leading-relaxed text-text-secondary">
              {t.currentFoodFight.noActiveDesc}
            </p>
          </div>
          <div className="pt-2">
            <Link
              href={ROUTES.ROOM.CREATE}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-xs sm:text-sm font-bold text-white shadow-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring"
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

function MemberAvatar({ member }: { member: CurrentFoodFightMember }) {
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
      className="text-[0.65rem] sm:text-xs font-bold text-text-secondary"
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
