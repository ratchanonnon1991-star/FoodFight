"use client";

import * as React from "react";
import {
  Check,
  ChevronDown,
  Clock3,
  Crown,
  Info,
  MapPin,
  RotateCcw,
  Sparkles,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CookingAnimation } from "@/features/food-fight/components/CookingAnimation";
import {
  foodFightService,
  FoodFightApiError,
} from "@/features/food-fight/services/food-fight-service";
import { useLanguage } from "@/i18n/LanguageProvider";
import { foodFightTranslations } from "../i18n/food-fight-translations";
import { LocationMap } from "@/features/room/components/LocationMap";
import { cn } from "@/lib/utils/cn";
import type {
  FoodFightState,
  RestaurantRecommendation,
} from "@/features/food-fight/types/food-fight-types";

interface RestaurantResultsProps {
  roomId: string;
  state?: FoodFightState;
}

interface MemberOptionData {
  memberName?: string;
  memberId?: string;
  options?: string[];
}

export function RestaurantResults({
  roomId,
  state: providedState,
}: RestaurantResultsProps) {
  const { locale } = useLanguage();
  const isTh = locale === "th";
  const t = foodFightTranslations[locale].restaurants;

  const [loadedState, setLoadedState] = React.useState<FoodFightState | null>(
    null,
  );
  const [retryState, setRetryState] = React.useState<FoodFightState | null>(
    null,
  );
  const [isLoadingState, setIsLoadingState] = React.useState(!providedState);
  const [isRetrying, setIsRetrying] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedRestaurantId, setSelectedRestaurantId] = React.useState<
    string | null
  >(null);

  const loadState = React.useCallback(
    async (showLoading = true) => {
      if (showLoading) setIsLoadingState(true);
      setError(null);
      try {
        setLoadedState(await foodFightService.getFoodFightState(roomId));
      } catch (requestError) {
        setError(
          requestError instanceof FoodFightApiError
            ? requestError.message
            : t.loadFailed,
        );
      } finally {
        if (showLoading) setIsLoadingState(false);
      }
    },
    [roomId, t.loadFailed],
  );

  React.useEffect(() => {
    if (providedState) return;
    const loadTimer = window.setTimeout(() => void loadState(), 0);
    return () => window.clearTimeout(loadTimer);
  }, [loadState, providedState]);

  const retryRestaurantSearch = async () => {
    setIsRetrying(true);
    setError(null);
    try {
      setRetryState(
        await foodFightService.startRestaurantRecommendations(roomId),
      );
    } catch (requestError) {
      setError(
        requestError instanceof FoodFightApiError
          ? requestError.message
          : t.loadFailed,
      );
    } finally {
      setIsRetrying(false);
    }
  };

  const state = retryState ?? providedState ?? loadedState;
  const isLoading = providedState ? false : isLoadingState;

  React.useEffect(() => {
    const restaurantState = state?.restaurantState;
    const foodFightState = state?.state;
    if (
      providedState ||
      restaurantState == null ||
      restaurantState === "RESTAURANTS_EMPTY" ||
      restaurantState === "RESTAURANTS_READY" ||
      foodFightState === "RESTAURANTS_READY"
    )
      return;
    const pollId = window.setInterval(() => void loadState(false), 2000);
    return () => window.clearInterval(pollId);
  }, [loadState, providedState, state?.restaurantState, state?.state]);

  const effectiveSelectedRestaurantId = state?.restaurants.some(
    (restaurant) => restaurant.id === selectedRestaurantId,
  )
    ? selectedRestaurantId
    : state?.restaurants[0]?.id ?? null;

  if (isLoading && !state) return <RestaurantLoadingScreen />;
  if (error && !state) {
    return (
      <Card
        variant="outline"
        className="rounded-3xl border-2 border-border/90 bg-surface p-6 text-center shadow-md sm:p-8 space-y-4"
      >
        <Info
          className="mx-auto size-12 text-status-danger-text"
          aria-hidden="true"
        />
        <h2 className="text-xl font-bold tracking-tight text-text-primary">
          {t.loadFailed}
        </h2>
        <p className="text-xs leading-relaxed text-text-secondary sm:text-sm">
          {error}
        </p>
        <Button
          className="mt-4"
          variant="outline"
          onClick={() => void loadState()}
        >
          {t.retry}
        </Button>
      </Card>
    );
  }
  if (
    !state ||
    state.restaurantState === "RECOMMENDING_RESTAURANTS" ||
    state.state === "RECOMMENDING_RESTAURANTS"
  ) {
    return <RestaurantLoadingScreen />;
  }
  if (
    state.restaurantState !== "RESTAURANTS_EMPTY" &&
    state.restaurantState !== "RESTAURANTS_READY" &&
    state.state !== "RESTAURANTS_READY"
  ) {
    return (
      <Card
        variant="outline"
        className="rounded-3xl border-2 border-border/90 bg-surface p-6 text-center shadow-md sm:p-8 space-y-4"
      >
        <Clock3
          className="mx-auto size-12 text-text-secondary"
          aria-hidden="true"
        />
        <h2 className="text-xl font-bold tracking-tight text-text-primary">
          {t.waitingForHostToStart}
        </h2>
        <p className="text-xs leading-relaxed text-text-secondary sm:text-sm">
          {t.winningMenuReadyWaitingHost}
        </p>
      </Card>
    );
  }

  const restaurants = state.restaurants;
  const mappedRestaurants = restaurants.filter(
    (restaurant) =>
      typeof restaurant.latitude === "number" &&
      Number.isFinite(restaurant.latitude) &&
      typeof restaurant.longitude === "number" &&
      Number.isFinite(restaurant.longitude),
  );

  return (
    <section aria-labelledby="restaurant-results-title" className="space-y-4 sm:space-y-6">
      {/* Winning Dish Context Banner */}
      {state.finalSelection && (
        <div className="flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1 text-xs font-bold text-text-primary shadow-xs">
            <Crown className="size-3.5 text-amber-500" aria-hidden="true" />
            <span>
              {t.winningDishPrefix}:{" "}
              {isTh
                ? state.finalSelection.nameTh ?? state.finalSelection.name
                : state.finalSelection.name}
            </span>
          </span>
        </div>
      )}

      {/* Interactive Map Surface */}
      {mappedRestaurants.length > 0 ? (
        <div className="overflow-hidden rounded-3xl border-2 border-border/80 bg-surface shadow-md">
          <div className="flex items-center justify-between border-b border-border/60 bg-surface-subtle/80 px-4 py-2.5 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-text-primary">
              <MapPin className="size-4 text-brand-primary" />
              <span>{t.mapLocationTitle}</span>
            </span>
            <span className="text-[11px] font-semibold text-text-secondary">
              {t.spotsNearby(mappedRestaurants.length)}
            </span>
          </div>

          <div className="h-52 sm:h-64 w-full">
            <LocationMap
              latitude={null}
              longitude={null}
              onPositionChange={() => undefined}
              onError={setError}
              markers={mappedRestaurants.map((restaurant) => ({
                id: restaurant.id,
                latitude: restaurant.latitude,
                longitude: restaurant.longitude,
                label: restaurant.rank
                  ? `#${restaurant.rank} ${restaurant.name}`
                  : restaurant.name,
              }))}
              selectedMarkerId={effectiveSelectedRestaurantId}
              onMarkerSelect={setSelectedRestaurantId}
              readOnly
            />
          </div>
        </div>
      ) : (
        <Card
          variant="subtle"
          className="rounded-2xl p-4 text-center text-xs text-text-secondary"
        >
          {t.mapNoCoordinates}
        </Card>
      )}

      {error ? (
        <div className="rounded-xl border border-status-danger-border bg-status-danger-bg px-3 py-2 text-xs text-status-danger-text">
          {error}
        </div>
      ) : null}

      {/* Empty State vs Restaurant List */}
      {!restaurants.length || state.restaurantState === "RESTAURANTS_EMPTY" ? (
        <Card
          variant="outline"
          className="rounded-3xl border-2 border-border/90 bg-surface p-6 shadow-md sm:p-8 text-center space-y-4 my-auto py-6 sm:py-8"
        >
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-600 shadow-2xs">
            <Store className="size-8 stroke-[2]" aria-hidden="true" />
          </div>

          <div className="space-y-1.5">
            <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
              {t.noRestaurantsFound}
            </h2>
            <p className="mx-auto max-w-sm text-xs leading-relaxed text-text-secondary sm:text-sm">
              {t.noRestaurantsDesc}
            </p>
          </div>

          {state.currentUser.isHost && (
            <div className="space-y-2 pt-2">
              <Button
                size="lg"
                className="w-full h-12 rounded-2xl bg-brand-primary hover:bg-brand-primary-hover text-white font-extrabold text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                onClick={() => void retryRestaurantSearch()}
                loading={isRetrying}
                loadingText={t.searching}
              >
                <RotateCcw className="size-5 stroke-[2.5]" />
                <span>{t.hostRetrySearch}</span>
              </Button>
              <p className="text-center text-xs font-semibold text-text-muted">
                {t.hostOnlyRetryHint}
              </p>
            </div>
          )}
        </Card>
      ) : (
        <>
          <div className="space-y-3 sm:space-y-3.5">
            {restaurants.map((restaurant) => (
              <TactileRestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                isSelected={restaurant.id === effectiveSelectedRestaurantId}
                onSelect={() => setSelectedRestaurantId(restaurant.id)}
                isTh={isTh}
              />
            ))}
          </div>

          {/* Confirm Destination Primary CTA */}
          <div className="mx-auto max-w-md pt-2 text-center">
            <Button
              size="lg"
              className={cn(
                "w-full h-12 rounded-2xl text-base font-extrabold shadow-sm transition-all flex items-center justify-center gap-2",
                effectiveSelectedRestaurantId
                  ? "bg-brand-primary hover:bg-brand-primary-hover text-white shadow-md active:scale-[0.99] cursor-pointer"
                  : "bg-surface-muted text-text-secondary/60 border border-border cursor-not-allowed opacity-85",
              )}
              disabled={!effectiveSelectedRestaurantId}
              onClick={() => {
                const chosen = restaurants.find(
                  (r) => r.id === effectiveSelectedRestaurantId,
                );
                alert(
                  isTh
                    ? `เลือกร้าน "${chosen?.name}" สำเร็จ!`
                    : `Selected "${chosen?.name}"!`,
                );
              }}
            >
              <Check className="size-5 stroke-[3]" />
              <span>{t.confirmSelection}</span>
            </Button>
            <p className="mt-2 text-xs text-text-secondary">
              {t.confirmHelper}
            </p>
          </div>
        </>
      )}
    </section>
  );
}

export function RestaurantLoadingScreen() {
  const { locale } = useLanguage();
  const t = foodFightTranslations[locale].restaurants;

  return (
    <Card
      variant="outline"
      className="rounded-3xl border-2 border-border/90 bg-surface p-6 shadow-md sm:p-8 text-center space-y-6 my-auto py-6 sm:py-8"
    >
      <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-surface-muted text-text-secondary shadow-2xs">
        <CookingAnimation size="sm" />
      </div>

      <div className="space-y-1.5">
        <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
          {t.rankingBestSpots}
        </h2>
        <p className="mx-auto max-w-sm text-xs leading-relaxed text-text-secondary sm:text-sm">
          {t.evaluatingMatch}
        </p>
      </div>

      {/* Animated loading step indicators */}
      <div className="rounded-2xl border border-border-subtle bg-surface-subtle/70 p-4 text-xs space-y-2.5 text-left">
        <div className="flex items-center gap-2.5 font-bold text-accent-fresh">
          <Check className="size-4 stroke-[3]" />
          <span>{t.analyzedWinningDish}</span>
        </div>
        <div className="flex items-center gap-2.5 font-bold text-amber-600">
          <span className="flex size-4 items-center justify-center">
            <span className="size-2 rounded-full bg-amber-500 animate-ping motion-reduce:animate-none" />
          </span>
          <span>{t.scanningNearby}</span>
        </div>
        <div className="flex items-center gap-2.5 text-text-muted font-medium">
          <span className="size-4 flex items-center justify-center text-[10px]">
            ○
          </span>
          <span>{t.rankingGroupCompatibility}</span>
        </div>
      </div>
    </Card>
  );
}

export function TactileRestaurantCard({
  restaurant,
  isSelected,
  onSelect,
  isTh,
}: {
  restaurant: RestaurantRecommendation;
  isSelected: boolean;
  onSelect: () => void;
  isTh: boolean;
}) {
  const [isOptionsExpanded, setIsOptionsExpanded] = React.useState(false);
  const [isReasonsExpanded, setIsReasonsExpanded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const { locale } = useLanguage();
  const t = foodFightTranslations[locale].restaurants;

  const showImage = Boolean(restaurant.imageUrl && !imageError);

  const humanizeOption = (item: unknown): string => {
    if (typeof item === "string") return item;
    if (typeof item === "number" || typeof item === "boolean")
      return String(item);
    return t.optionsAvailable;
  };

  return (
    <div
      onClick={onSelect}
      role="radio"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          onSelect();
        }
      }}
      className={cn(
        "relative rounded-3xl border-2 bg-surface p-3.5 sm:p-4 shadow-md transition-all duration-200 cursor-pointer outline-none select-none",
        isSelected
          ? "border-accent-fresh ring-2 ring-accent-fresh/35 shadow-[0_0_24px_rgba(34,197,94,0.18)] scale-[1.005] motion-reduce:scale-100"
          : "border-border/90 hover:border-border-strong",
      )}
    >
      {/* Warning banner if finalMenuMatch is false */}
      {!restaurant.finalMenuMatch && (
        <div className="mb-2.5 rounded-xl bg-surface-subtle p-2 text-[11px] text-text-secondary border border-border-subtle">
          {t.unconfirmedMenuWarning}
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 1. TOP HEADER: MEDIA + PRIMARY RESTAURANT INFO                      */}
      {/* ------------------------------------------------------------------- */}
      <div className="flex items-start gap-3 sm:gap-3.5">
        {/* Left Media Container */}
        <div className="relative size-20 sm:size-22 shrink-0 rounded-2xl border-2 border-border/80 bg-surface-muted overflow-hidden shadow-xs">
          {showImage ? (
            <img
              src={restaurant.imageUrl ?? undefined}
              alt={restaurant.name}
              onError={() => setImageError(true)}
              className="size-full object-cover"
            />
          ) : (
            <RestaurantGraphicPlaceholder name={restaurant.name} />
          )}

          {/* Rank Badge */}
          <span className="absolute left-1.5 top-1.5 flex size-6 sm:size-6.5 items-center justify-center rounded-xl bg-black/75 border border-white/20 text-[10px] sm:text-xs font-black text-white shadow-md backdrop-blur-md">
            #{restaurant.rank ?? "?"}
          </span>
        </div>

        {/* Right Info Details */}
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-start justify-between gap-1.5">
            <h3 className="text-base sm:text-lg font-extrabold tracking-tight text-text-primary line-clamp-1">
              {restaurant.name}
            </h3>

            {/* Custom Check / Radio Indicator */}
            <div
              className={cn(
                "size-5 sm:size-5.5 shrink-0 rounded-full border-2 flex items-center justify-center transition-all mt-0.5",
                isSelected
                  ? "border-accent-fresh bg-accent-fresh text-white shadow-2xs"
                  : "border-border-strong bg-surface",
              )}
            >
              {isSelected ? <Check className="size-3.5 stroke-[3]" /> : null}
            </div>
          </div>

          {/* Badges Row: Distance, Open Status & Match Score (Omitted misleading star) */}
          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            {restaurant.distanceKm != null && (
              <span className="inline-flex items-center gap-1 rounded-md border border-border-subtle bg-surface-subtle px-2 py-0.5 text-[11px] font-bold text-text-primary">
                <MapPin className="size-3 text-brand-primary" />
                <span>
                  {restaurant.distanceKm < 1
                    ? `${Math.round(restaurant.distanceKm * 1000)} ${isTh ? "ม." : "m"}`
                    : `${restaurant.distanceKm.toFixed(1)} ${isTh ? "กม." : "km"}`}
                </span>
              </span>
            )}

            {restaurant.openNow != null && (
              <span
                className={cn(
                  "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-extrabold border",
                  restaurant.openNow
                    ? "border-accent-fresh/30 bg-accent-fresh/10 text-accent-fresh"
                    : "border-slate-700/30 bg-slate-800/10 text-slate-500",
                )}
              >
                <span
                  className={cn(
                    "size-1.5 rounded-full",
                    restaurant.openNow ? "bg-accent-fresh" : "bg-slate-400",
                  )}
                />
                <span>{restaurant.openNow ? t.openNow : t.closed}</span>
              </span>
            )}

            {restaurant.groupCoverage != null && (
              <span className="inline-flex items-center gap-1 rounded-md border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[11px] font-extrabold text-amber-700">
                <Sparkles className="size-3 stroke-[2.5]" />
                <span>{t.groupMatch(Math.round(restaurant.groupCoverage * 100))}</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------- */}
      {/* 2. REASONS (Primary Reason Visible + Expandable Additional Reasons) */}
      {/* ------------------------------------------------------------------- */}
      {restaurant.reasons && restaurant.reasons.length > 0 && (
        <div className="mt-2.5 rounded-xl border border-border-subtle/70 bg-surface-subtle/50 p-2.5 space-y-1">
          {/* Primary 1st Reason */}
          <p className="text-[11px] leading-relaxed text-text-secondary flex items-start gap-1.5">
            <span className="text-accent-fresh font-bold shrink-0">•</span>
            <span>{restaurant.reasons[0]}</span>
          </p>

          {/* Additional reasons collapse */}
          {restaurant.reasons.length > 1 && (
            <div className="pt-0.5">
              {isReasonsExpanded && (
                <ul className="space-y-1 text-[11px] leading-relaxed text-text-secondary pb-1 border-t border-border-subtle/50 pt-1.5 mt-1">
                  {restaurant.reasons.slice(1).map((reason, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-accent-fresh font-bold shrink-0">
                        •
                      </span>
                      <span>{reason}</span>
                    </li>
                  ))}
                </ul>
              )}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsReasonsExpanded((v) => !v);
                }}
                className="text-[11px] font-bold text-text-muted hover:text-text-primary transition-colors cursor-pointer"
              >
                {isReasonsExpanded
                  ? t.hideMoreReasons
                  : t.viewMoreReasons(restaurant.reasons.length - 1)}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------------- */}
      {/* 3. MEMBER MENU OPTIONS (Collapsed by default, Clean chips)          */}
      {/* ------------------------------------------------------------------- */}
      {restaurant.memberMenuOptions &&
        restaurant.memberMenuOptions.length > 0 && (
          <div className="mt-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsOptionsExpanded((v) => !v);
              }}
              className="flex items-center justify-between w-full py-0.5 text-xs font-bold text-brand-primary hover:underline cursor-pointer"
            >
              <span>{t.memberMenuOptions(restaurant.memberMenuOptions.length)}</span>
              <ChevronDown
                className={cn(
                  "size-3.5 transition-transform duration-200",
                  isOptionsExpanded && "rotate-180",
                )}
              />
            </button>

            {isOptionsExpanded && (
              <div className="mt-1.5 space-y-2 rounded-xl border border-border-subtle bg-surface-subtle p-2.5 text-xs">
                {restaurant.memberMenuOptions.map((opt, idx) => {
                  const data = opt as MemberOptionData;
                  const label =
                    data.memberName ??
                    (data.memberId
                      ? `${isTh ? "สมาชิก" : "Member"} ${data.memberId}`
                      : `${isTh ? "ตัวเลือก" : "Option"} ${idx + 1}`);

                  return (
                    <div key={idx} className="space-y-1">
                      <span className="font-bold text-text-primary text-[11px]">
                        {label}:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {Array.isArray(data.options) ? (
                          data.options.map((item, oIdx) => (
                            <span
                              key={oIdx}
                              className="rounded-md border border-border bg-surface px-1.5 py-0.5 text-[10px] font-semibold text-text-secondary"
                            >
                              {humanizeOption(item)}
                            </span>
                          ))
                        ) : (
                          <span className="text-text-muted text-[10px]">
                            {t.optionsAvailable}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      {/* ------------------------------------------------------------------- */}
      {/* 4. ADDRESS ROW & SELECTION STATUS CUE                               */}
      {/* ------------------------------------------------------------------- */}
      {restaurant.address && (
        <div className="mt-2.5 flex items-center justify-between gap-1.5 text-[11px] text-text-secondary border-t border-border/50 pt-2">
          <span className="flex items-center gap-1 min-w-0">
            <MapPin className="size-3 text-text-muted shrink-0" />
            <span className="truncate">{restaurant.address}</span>
          </span>
          {isSelected && (
            <span className="shrink-0 text-[11px] font-extrabold text-accent-fresh flex items-center gap-1">
              <Check className="size-3 stroke-[3]" />
              <span>{t.selectedBadge}</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function RestaurantGraphicPlaceholder({ name }: { name: string }) {
  return (
    <div className="size-full bg-gradient-to-br from-amber-500/15 via-brand-primary/10 to-orange-500/20 flex flex-col items-center justify-center p-2 text-center select-none">
      <div className="size-7 rounded-xl bg-surface/90 border border-brand-primary/20 shadow-xs flex items-center justify-center text-brand-primary mb-0.5">
        <Store className="size-3.5 stroke-[1.8]" />
      </div>
      <span className="text-[9px] font-bold text-text-secondary truncate max-w-[90%]">
        {name}
      </span>
    </div>
  );
}
