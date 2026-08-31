"use client";

import * as React from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Clock3,
  Crown,
  ImageIcon,
  Info,
  MessageCircle,
  RotateCcw,
  Sparkles,
  UsersRound,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ROUTES } from "@/config/routes";
import { CookingAnimation } from "@/features/food-fight/components/CookingAnimation";
import { RoomPageHeader } from "@/features/room/components/RoomPageHeader";
import {
  RestaurantLoadingScreen,
  RestaurantResults,
} from "@/features/food-fight/components/RestaurantResults";
import { PreferenceSelectionForm } from "@/features/food-fight/components/PreferenceSelectionForm";
import { VotingRoundScreen } from "@/features/food-fight/components/VotingRoundScreen";
import {
  FinalVoteScreen,
  FinalVoteWaiting,
} from "@/features/food-fight/components/FinalVoteScreen";
import { FinalizedScreen } from "@/features/food-fight/components/FinalizedScreen";
import { useLanguage } from "@/i18n/LanguageProvider";
import { foodFightTranslations } from "../i18n/food-fight-translations";
import {
  foodFightService,
  FoodFightApiError,
} from "@/features/food-fight/services/food-fight-service";
import type {
  FoodFightState,
  MealPreferenceDraft,
  RecommendationItem,
  VoteAction,
  VoteSubmission,
} from "@/features/food-fight/types/food-fight-types";

type View = "loading" | "form" | "submitted" | "error";

export function MealPreferenceForm({ roomId }: { roomId: string }) {
  const { locale } = useLanguage();
  const [state, setState] = React.useState<FoodFightState | null>(null);
  const [view, setView] = React.useState<View>("loading");
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isStarting, setIsStarting] = React.useState(false);
  const [isVoting, setIsVoting] = React.useState(false);
  const [isFinalVoting, setIsFinalVoting] = React.useState(false);
  const [isHostTieBreaking, setIsHostTieBreaking] = React.useState(false);
  const [isRerolling, setIsRerolling] = React.useState(false);
  const [isStartingRestaurants, setIsStartingRestaurants] =
    React.useState(false);
  const [votes, setVotes] = React.useState<Record<string, VoteAction>>({});
  const [finalVoteSelection, setFinalVoteSelection] = React.useState<
    string | null
  >(null);
  const [hostTieBreakSelection, setHostTieBreakSelection] = React.useState<
    string | null
  >(null);
  const [error, setError] = React.useState<string | null>(null);

  const loadState = React.useCallback(
    async (options: { clearError?: boolean } = {}) => {
      const nextState = await foodFightService.getFoodFightState(roomId);
      setState(nextState);
      if (options.clearError !== false) setError(null);
      setView((currentView) =>
        nextState.state === "WAITING_FOR_PREFERENCES" &&
        currentView !== "submitted"
          ? "form"
          : currentView === "loading"
            ? "submitted"
            : currentView,
      );
      setVotes((currentVotes) =>
        Object.keys(currentVotes).length
          ? currentVotes
          : Object.fromEntries(
              nextState.currentUser.votes.map((vote) => [
                vote.recommendationItemId,
                vote.vote,
              ]),
            ),
      );
    },
    [roomId],
  );

  React.useEffect(() => {
    let active = true;
    const loadTimer = window.setTimeout(
      () =>
        void loadState().catch(() => {
          if (active) {
            setError("ไม่สามารถโหลดสถานะ FoodFight ได้ กรุณาลองใหม่อีกครั้ง");
            setView("error");
          }
        }),
      0,
    );
    return () => {
      active = false;
      window.clearTimeout(loadTimer);
    };
  }, [loadState]);

  React.useEffect(() => {
    if (
      !state ||
      state.restaurantState === "RESTAURANTS_EMPTY" ||
      state.restaurantState === "RESTAURANTS_READY"
    )
      return;
    const pollId = window.setInterval(
      () =>
        void loadState({ clearError: false }).catch(() =>
          setError("เซิร์ฟเวอร์ไม่พร้อมใช้งานชั่วคราว กำลังลองใหม่อีกครั้ง"),
        ),
      2000,
    );
    return () => window.clearInterval(pollId);
  }, [loadState, state]);

  const submitPreference = async (preference: MealPreferenceDraft) => {
    setError(null);
    setIsSubmitting(true);
    try {
      await foodFightService.submitMealPreference(roomId, preference);
      setIsEditing(false);
      setView("submitted");
      await loadState();
    } catch (requestError) {
      setError(
        requestError instanceof FoodFightApiError
          ? requestError.message
          : "ส่งความต้องการไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const startRecommendation = async () => {
    if (!state?.currentUser.isHost || isStarting) return;
    setError(null);
    setIsStarting(true);
    try {
      await foodFightService.startRecommendation(roomId);
      await loadState();
    } catch (requestError) {
      setError(
        requestError instanceof FoodFightApiError
          ? requestError.message
          : "เริ่มการแนะนำไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
      );
    } finally {
      setIsStarting(false);
    }
  };

  const submitVotes = async () => {
    const items = state?.currentRound?.items.slice(0, 2) ?? [];
    if (
      items.length !== 2 ||
      items.some((item) => !votes[item.id]) ||
      isVoting ||
      state?.currentUser.hasSubmittedVotes
    )
      return;
    setError(null);
    setIsVoting(true);
    const payload: VoteSubmission[] = items.map((item) => ({
      recommendationItemId: item.id,
      vote: votes[item.id],
    }));
    try {
      await foodFightService.submitVotes(roomId, payload);
      await loadState();
    } catch (requestError) {
      setError(
        requestError instanceof FoodFightApiError
          ? requestError.message
          : "ส่งการโหวตไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
      );
    } finally {
      setIsVoting(false);
    }
  };

  const submitFinalVote = async () => {
    if (
      !finalVoteSelection ||
      isFinalVoting ||
      state?.currentUser.hasSubmittedFinalVote
    )
      return;
    setError(null);
    setIsFinalVoting(true);
    try {
      await foodFightService.submitFinalVote(roomId, finalVoteSelection);
      await loadState();
    } catch (requestError) {
      setError(
        requestError instanceof FoodFightApiError
          ? requestError.message
          : "ส่งการเลือกเมนูสุดท้ายไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
      );
    } finally {
      setIsFinalVoting(false);
    }
  };

  const submitHostTieBreak = async () => {
    if (
      !hostTieBreakSelection ||
      isHostTieBreaking ||
      !state?.currentUser.isHost
    )
      return;
    setError(null);
    setIsHostTieBreaking(true);
    try {
      await foodFightService.submitHostTieBreak(roomId, hostTieBreakSelection);
      await loadState();
    } catch (requestError) {
      setError(
        requestError instanceof FoodFightApiError
          ? requestError.message
          : "ส่งผลตัดสินเสมอไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
      );
    } finally {
      setIsHostTieBreaking(false);
    }
  };

  const rerollRecommendation = async () => {
    if (!state?.currentUser.isHost || isRerolling) return;
    setError(null);
    setIsRerolling(true);
    try {
      await foodFightService.rerollRecommendation(roomId);
      await loadState();
    } catch (requestError) {
      setError(
        requestError instanceof FoodFightApiError
          ? requestError.message
          : "เริ่มการแนะนำรอบใหม่ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
      );
    } finally {
      setIsRerolling(false);
    }
  };

  const startRestaurantRecommendations = async () => {
    if (
      !state?.currentUser.isHost ||
      (state.restaurantState !== "FINALIZED_MENU" &&
        state.restaurantState !== "RESTAURANTS_EMPTY") ||
      isStartingRestaurants
    )
      return;
    setError(null);
    setIsStartingRestaurants(true);
    try {
      await foodFightService.startRestaurantRecommendations(roomId);
      await loadState();
    } catch (requestError) {
      setError(
        requestError instanceof FoodFightApiError
          ? requestError.message
          : "เริ่มค้นหาร้านอาหารไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
      );
    } finally {
      setIsStartingRestaurants(false);
    }
  };

  const handleVoteChange = (itemId: string, vote: VoteAction) => {
    setVotes((current) => ({ ...current, [itemId]: vote }));
  };

  if (view === "loading")
    return <StatusScreen title="กำลังโหลด FoodFight..." />;
  if (view === "error")
    return (
      <StatusScreen
        title="โหลดข้อมูลไม่สำเร็จ"
        description={error ?? undefined}
        action={
          <Button
            onClick={() => {
              setView("loading");
              void loadState().catch(() => setView("error"));
            }}
          >
            ลองใหม่
          </Button>
        }
      />
    );
  if (!state) return null;
  if (
    state.state === "WAITING_FOR_VOTES" &&
    !state.currentUser.hasSubmittedVotes
  ) {
    return (
      <main className="min-h-dvh bg-transparent text-text-primary">
        <div className="mx-auto w-full max-w-md px-4 pb-28 pt-2 sm:px-6 sm:pb-32 sm:pt-3 md:max-w-xl">
          <RoomPageHeader
            title={getFoodFightTitle(state, locale)}
            subtitle={
              locale === "th"
                ? "สถานะมื้ออาหารสำหรับห้องนี้"
                : "Meal status for this room"
            }
            backHref={ROUTES.ROOM.LOBBY(roomId)}
            showBackButton={false}
          />
          <VotingRoundScreen
            roundNumber={state.currentRound?.roundNumber ?? 1}
            items={state.currentRound?.items ?? []}
            votes={votes}
            isVoting={isVoting}
            onVote={handleVoteChange}
            onSubmitVotes={() => void submitVotes()}
          />
        </div>
      </main>
    );
  }
  if (view === "form" || isEditing)
    return (
      <PreferenceSelectionForm
        roomId={roomId}
        error={error}
        isSubmitting={isSubmitting}
        onSubmit={submitPreference}
      />
    );
  return (
    <main className="min-h-dvh bg-transparent text-text-primary">
      <div className="mx-auto w-full max-w-md px-4 pb-28 pt-2 sm:px-6 sm:pb-32 sm:pt-3 md:max-w-xl">
        <RoomPageHeader
          title={getFoodFightTitle(state, locale)}
          subtitle={
            locale === "th"
              ? "สถานะมื้ออาหารสำหรับห้องนี้"
              : "Meal status for this room"
          }
          backHref={ROUTES.ROOM.LOBBY(roomId)}
          showBackButton={false}
        />
        {error ? (
          <Alert variant="error" className="mb-4">
            <AlertTitle>เกิดข้อผิดพลาด</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
            <Button
              className="mt-3"
              variant="outline"
              size="sm"
              onClick={() =>
                void loadState().catch(() =>
                  setError(
                    "เซิร์ฟเวอร์ไม่พร้อมใช้งานชั่วคราว กำลังลองใหม่อีกครั้ง",
                  ),
                )
              }
            >
              ลองใหม่
            </Button>
          </Alert>
        ) : null}
        {state.state === "VOTING" && !state.currentUser.hasSubmittedVotes ? (
          <VotingRoundScreen
            roundNumber={state.currentRound?.roundNumber ?? 1}
            items={state.currentRound?.items ?? []}
            votes={votes}
            isVoting={isVoting}
            onVote={handleVoteChange}
            onSubmitVotes={() => void submitVotes()}
          />
        ) : null}
        {state.state === "VOTING" && state.currentUser.hasSubmittedVotes ? (
          <WaitingScreen
            title="รอสมาชิกโหวต"
            description="คุณส่งการโหวตแล้ว รอสมาชิกคนอื่นโหวตให้ครบ"
            count={state.voteProgress.submittedMemberCount}
            total={state.voteProgress.totalMemberCount}
          />
        ) : null}
        {state.state === "WAITING_FOR_VOTES" ? (
          <WaitingScreen
            title="รอสมาชิกโหวต"
            description="รอสมาชิกโหวตให้ครบทุกคน"
            count={state.voteProgress.submittedMemberCount}
            total={state.voteProgress.totalMemberCount}
          />
        ) : null}
        {state.state === "RECOMMENDING" ? (
          <LoadingCard
            title="กำลังหาเมนูที่เหมาะกับทุกคน..."
            description="กำลังวิเคราะห์ความชอบและข้อจำกัดของสมาชิก"
            count={state.submittedMemberCount}
            total={state.totalMemberCount}
          />
        ) : null}
        {state.state === "WAITING_FOR_PREFERENCES" ||
        state.state === "READY_TO_RECOMMEND" ? (
          <WaitingForMembers
            state={state}
            onEdit={() => setIsEditing(true)}
            onStart={() => void startRecommendation()}
            isStarting={isStarting}
          />
        ) : null}
        {state.state === "FINAL_VOTE_REQUIRED" &&
        state.finalVoteProgress.hostTieBreakRequired &&
        state.currentUser.isHost ? (
          <FinalVoteScreen
            candidates={state.finalVoteCandidates}
            selection={hostTieBreakSelection}
            onSelect={setHostTieBreakSelection}
            onSubmit={() => void submitHostTieBreak()}
            isSubmitting={isHostTieBreaking}
            finalVoteType={state.finalVoteType}
            hostTieBreak
            voteCounts={state.finalVoteProgress.counts}
          />
        ) : null}
        {state.state === "FINAL_VOTE_REQUIRED" &&
        !state.finalVoteProgress.hostTieBreakRequired &&
        !state.currentUser.hasSubmittedFinalVote ? (
          <FinalVoteScreen
            candidates={state.finalVoteCandidates}
            selection={finalVoteSelection}
            onSelect={setFinalVoteSelection}
            onSubmit={() => void submitFinalVote()}
            isSubmitting={isFinalVoting}
            finalVoteType={state.finalVoteType}
          />
        ) : null}
        {state.state === "FINAL_VOTE_REQUIRED" &&
        (state.currentUser.hasSubmittedFinalVote ||
          state.finalVoteProgress.hostTieBreakRequired) &&
        !(
          state.finalVoteProgress.hostTieBreakRequired &&
          state.currentUser.isHost
        ) ? (
          <FinalVoteWaiting
            tieBreakRequired={state.finalVoteProgress.hostTieBreakRequired}
            submittedMemberCount={state.finalVoteProgress.submittedMemberCount}
            totalMemberCount={state.finalVoteProgress.totalMemberCount}
          />
        ) : null}
        {state.state === "REROLL_REQUIRED" ? (
          <RerollScreen
            state={state}
            onReroll={() => void rerollRecommendation()}
            isRerolling={isRerolling}
          />
        ) : null}
        {state.state === "FINALIZED" && isStartingRestaurants ? (
          <RestaurantLoadingScreen />
        ) : null}
        {state.state === "FINALIZED" &&
        !isStartingRestaurants &&
        state.restaurantState !== "RESTAURANTS_EMPTY" ? (
          <FinalizedScreen
            finalSelection={state.finalSelection}
            isHost={state.currentUser.isHost}
            canStartRestaurants={
              state.restaurantState === "FINALIZED_MENU"
            }
            isStartingRestaurants={isStartingRestaurants}
            onStartRestaurants={() => void startRestaurantRecommendations()}
          />
        ) : null}
        {state.restaurantState === "RECOMMENDING_RESTAURANTS" ||
        state.restaurantState === "RESTAURANTS_EMPTY" ||
        state.restaurantState === "RESTAURANTS_READY" ||
        state.state === "RECOMMENDING_RESTAURANTS" ||
        state.state === "RESTAURANTS_READY" ? (
          <RestaurantResults roomId={roomId} state={state} />
        ) : null}
      </div>
    </main>
  );
}

function getFoodFightTitle(
  state: FoodFightState,
  locale: "th" | "en" = "th",
) {
  if (state.restaurantState === "RECOMMENDING_RESTAURANTS")
    return locale === "th" ? "กำลังค้นหาร้านอาหาร" : "Finding Restaurants";
  if (state.restaurantState === "RESTAURANTS_EMPTY")
    return locale === "th"
      ? "ยังไม่พบร้านอาหารที่ใช้ได้"
      : "No Restaurants Found";
  if (state.restaurantState === "RESTAURANTS_READY")
    return locale === "th" ? "ร้านอาหารที่แนะนำ" : "Restaurant Matches";
  if (state.state === "WAITING_FOR_PREFERENCES")
    return locale === "th" ? "กำลังรอสมาชิก" : "Waiting for Members";
  if (state.state === "READY_TO_RECOMMEND")
    return locale === "th" ? "ทุกคนพร้อมแล้ว!" : "Everyone is Ready!";
  if (state.state === "RECOMMENDING")
    return locale === "th" ? "กำลังประมวลผล" : "Analyzing Preferences";
  if (state.state === "VOTING")
    return state.currentRound?.roundNumber === 2
      ? locale === "th"
        ? "เมนูที่แนะนำ รอบที่ 2"
        : "Recommendations Round 2"
      : locale === "th"
        ? "เมนูที่แนะนำ"
        : "Meal Recommendations";
  if (state.state === "WAITING_FOR_VOTES")
    return locale === "th" ? "รอผลโหวตจากสมาชิก" : "Waiting for Votes";
  if (state.state === "FINAL_VOTE_REQUIRED")
    return state.finalVoteProgress.hostTieBreakRequired
      ? locale === "th"
        ? "คะแนนเท่ากัน!"
        : "Tie Break Required!"
      : locale === "th"
        ? "เลือกเมนูสุดท้าย"
        : "Final Choice";
  if (state.state === "REROLL_REQUIRED")
    return locale === "th" ? "รอ Host เริ่มรอบใหม่" : "Reroll Required";
  if (state.state === "FINALIZED")
    return locale === "th" ? "เมนูที่กลุ่มเลือกแล้ว!" : "Group Winner!";
  return "FoodFight";
}

function StateIllustration({
  icon,
  tone = "brand",
}: {
  icon: React.ReactNode;
  tone?: "brand" | "success" | "muted";
}) {
  const toneClass =
    tone === "success"
      ? "bg-status-success-bg border border-status-success-border/60 text-status-success-icon"
      : tone === "muted"
        ? "bg-surface-muted border border-border text-text-secondary"
        : "bg-brand-primary/10 border border-brand-primary/25 text-brand-primary";
  return (
    <div
      className={`mx-auto flex size-16 items-center justify-center rounded-2xl shadow-2xs ${toneClass}`}
    >
      {icon}
    </div>
  );
}

function WaitingForMembers({
  state,
  onEdit,
  onStart,
  isStarting,
}: {
  state: FoodFightState;
  onEdit: () => void;
  onStart: () => void;
  isStarting: boolean;
}) {
  const { locale } = useLanguage();
  const ready = state.state === "READY_TO_RECOMMEND";
  const remaining = Math.max(
    state.totalMemberCount - state.submittedMemberCount,
    0,
  );

  return (
    <Card
      variant="outline"
      className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-7"
    >
      <StateIllustration
        icon={
          ready ? (
            <Check className="size-8" strokeWidth={2.5} aria-hidden="true" />
          ) : (
            <UsersRound
              className="size-8"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          )
        }
        tone={ready ? "success" : "brand"}
      />
      <h2 className="mt-4 text-center text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
        {ready
          ? locale === "th"
            ? "ทุกคนพร้อมแล้ว!"
            : "Everyone is ready!"
          : locale === "th"
            ? "กำลังรอสมาชิก"
            : "Waiting for members..."}
      </h2>
      <p className="mx-auto mt-1 max-w-sm text-center text-xs leading-relaxed text-text-secondary sm:text-sm">
        {ready
          ? locale === "th"
            ? "ส่งความต้องการอาหารครบแล้ว พร้อมเริ่มแนะนำเมนู"
            : "All members have submitted preferences. Ready to recommend!"
          : locale === "th"
            ? "ส่งความต้องการแล้ว รอสมาชิกคนอื่นส่งข้อมูลให้ครบ"
            : "Preferences submitted! Waiting for other members to finish."}
      </p>

      <div className="mt-6 rounded-2xl border border-border-subtle bg-surface-subtle/80 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            {locale === "th" ? "ส่งความต้องการแล้ว" : "Preferences Submitted"}
          </span>
          <span className="inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-bold text-text-primary shadow-2xs">
            {state.submittedMemberCount} / {state.totalMemberCount}{" "}
            {locale === "th" ? "คน" : "members"}
          </span>
        </div>

        <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-muted">
          <div
            className="h-full rounded-full bg-brand-primary transition-[width] duration-300"
            style={{
              width: `${state.totalMemberCount ? (state.submittedMemberCount / state.totalMemberCount) * 100 : 0}%`,
            }}
          />
        </div>

        <p className="mt-2 text-center text-xs text-text-secondary">
          {!ready && remaining > 0
            ? locale === "th"
              ? `รอเพื่อนอีก ${remaining} คน`
              : `Waiting for ${remaining} more friend${remaining === 1 ? "" : "s"}...`
            : locale === "th"
              ? "สมาชิกทุกคนส่งข้อมูลครบแล้ว"
              : "All members have submitted preferences"}
        </p>
      </div>

      {ready ? (
        <div className="mt-6 space-y-2">
          <Button
            size="lg"
            className="w-full"
            onClick={onStart}
            disabled={!state.currentUser.isHost || isStarting}
            loading={isStarting}
            loadingText={locale === "th" ? "กำลังเริ่ม..." : "Starting..."}
            rightIcon={<ArrowRight className="size-4" aria-hidden="true" />}
          >
            {state.currentUser.isHost
              ? locale === "th"
                ? "เริ่มแนะนำเมนู"
                : "Start Recommendations"
              : locale === "th"
                ? "รอ Host เริ่มแนะนำ"
                : "Waiting for Host to start"}
          </Button>
          <p className="text-center text-xs font-medium text-text-secondary">
            {state.currentUser.isHost
              ? locale === "th"
                ? "👑 สิทธิ์เฉพาะหัวหน้าห้องในการเริ่มแนะนำเมนู"
                : "👑 Host action: Start AI meal recommendations"
              : locale === "th"
                ? "รอหัวหน้าห้องกดเริ่มแนะนำเมนูอาหาร"
                : "Waiting for host to start meal recommendations"}
          </p>
        </div>
      ) : (
        <Button className="mt-6 w-full" variant="outline" onClick={onEdit}>
          {locale === "th" ? "แก้ไขความต้องการ" : "Edit Preferences"}
        </Button>
      )}
    </Card>
  );
}

function RerollScreen({
  state,
  onReroll,
  isRerolling,
}: {
  state: FoodFightState;
  onReroll: () => void;
  isRerolling: boolean;
}) {
  const { locale } = useLanguage();
  const isTh = locale === "th";

  if (isRerolling) return <RerollLoadingCard />;

  if (!state.currentUser.isHost) {
    return (
      <WaitingScreen
        title={isTh ? "รอ Host เริ่มรอบใหม่" : "Waiting for Host"}
        description={
          isTh
            ? "ทั้งสองเมนูยังไม่มีคะแนนถึงเกณฑ์ รอหัวหน้าห้องเริ่มการแนะนำเมนูอีกครั้ง"
            : "Both options did not reach consensus. Waiting for host to start a new round."
        }
        count={state.voteProgress.submittedMemberCount}
        total={state.voteProgress.totalMemberCount}
      />
    );
  }

  return (
    <Card
      variant="outline"
      className="rounded-3xl border-2 border-border/90 bg-surface p-6 shadow-md sm:p-8 text-center space-y-6"
    >
      <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-600 shadow-2xs">
        <RotateCcw className="size-8 stroke-[2]" aria-hidden="true" />
      </div>

      <div className="space-y-1.5">
        <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 text-xs font-bold text-amber-700">
          {isTh ? "จบรอบการโหวต" : "Round Completed"}
        </span>
        <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
          {isTh ? "ยังไม่มีเมนูที่ได้ข้อสรุป" : "No Consensus Reached"}
        </h2>
        <p className="mx-auto max-w-sm text-xs leading-relaxed text-text-secondary sm:text-sm">
          {isTh
            ? "เมนูในรอบก่อนหน้ายังไม่ได้รับคะแนนเห็นพ้องตามเกณฑ์ คุณสามารถเริ่มค้นหาเมนูชุดใหม่ได้ทันที"
            : "The previous menu recommendations did not reach consensus. You can generate a fresh pair of recommendations."}
        </p>
      </div>

      <div className="rounded-2xl border border-border-subtle bg-surface-subtle/70 p-4 text-left text-xs space-y-2">
        <div className="flex items-center justify-between font-bold text-text-primary">
          <span>
            {isTh
              ? `สรุปผลรอบที่ ${state.currentRound?.roundNumber ?? 1}`
              : `Round ${state.currentRound?.roundNumber ?? 1} Summary`}
          </span>
          <span className="text-text-muted">
            {state.currentRound?.items.length ?? 2} {isTh ? "เมนู" : "menus"}
          </span>
        </div>
        <p className="text-text-secondary leading-relaxed">
          {isTh
            ? "สมาชิกบางท่านเลือก PASS สำหรับทั้ง 2 เมนู ระบบจึงเตรียมค้นหาเมนูทางเลือกใหม่ที่ตรงใจกลุ่มยิ่งขึ้น"
            : "Some members passed on both options. The system is ready to find new culinary alternatives."}
        </p>
      </div>

      <div className="space-y-2 pt-2">
        <Button
          size="lg"
          className="w-full h-12 rounded-2xl bg-brand-primary hover:bg-brand-primary-hover text-white font-extrabold text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
          onClick={onReroll}
          loading={isRerolling}
          loadingText={isTh ? "กำลังเริ่มรอบใหม่..." : "Starting new round..."}
        >
          <span>
            {isTh ? "แนะนำเมนูรอบใหม่ (Reroll)" : "Find New Menus (Reroll)"}
          </span>
          <ChevronRight className="size-5 stroke-[2.5]" />
        </Button>
        <p className="text-center text-xs font-semibold text-text-muted">
          👑{" "}
          {isTh
            ? "สิทธิ์เฉพาะหัวหน้าห้องในการเริ่มรอบใหม่"
            : "Host action to start a new recommendation round"}
        </p>
      </div>
    </Card>
  );
}

function RerollLoadingCard() {
  return (
    <Card variant="outline" className="rounded-3xl p-8 text-center shadow-sm">
      <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-surface-muted text-text-secondary">
        <CookingAnimation size="sm" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">กำลังหาเมนูใหม่ให้คุณ...</h2>
      <p className="mt-2 text-sm leading-6 text-text-secondary">
        กำลังสร้างเมนูรอบถัดไปจากความต้องการของสมาชิก
      </p>
      <Button
        className="mt-7 w-full"
        variant="outline"
        loading
        loadingText="กำลังวิเคราะห์..."
      >
        กำลังวิเคราะห์...
      </Button>
    </Card>
  );
}

function WaitingScreen({
  title,
  description,
  count,
  total,
}: {
  title: string;
  description: string;
  count: number;
  total: number;
}) {
  const { locale } = useLanguage();
  const isTh = locale === "th";
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <Card
      variant="outline"
      className="rounded-3xl border-2 border-border/90 bg-surface p-6 text-center shadow-md sm:p-8 space-y-6"
    >
      <div className="text-center space-y-2">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-brand-primary/20 bg-brand-primary/10 text-brand-primary shadow-2xs">
          <Clock3 className="size-8 stroke-[2]" aria-hidden="true" />
        </div>
        <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
          {title}
        </h2>
        <p className="mx-auto max-w-sm text-xs leading-relaxed text-text-secondary sm:text-sm">
          {description}
        </p>
      </div>

      <div className="rounded-2xl border-2 border-border-subtle bg-surface-subtle/80 p-4 sm:p-5 space-y-3 shadow-2xs">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-text-secondary">
            {isTh ? "ความคืบหน้าการโหวต" : "Voting Progress"}
          </span>
          <span className="inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-extrabold text-text-primary shadow-2xs">
            {count} / {total} {isTh ? "คน" : "voted"}
          </span>
        </div>

        <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-muted shadow-inner">
          <div
            className="h-full rounded-full bg-brand-primary transition-all duration-700 ease-out motion-reduce:transition-none"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-start gap-2.5 rounded-xl bg-surface-subtle/70 p-3 border border-border-subtle text-xs text-text-secondary text-left">
        <Info className="size-4 text-brand-primary shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {isTh
            ? "ระบบจะประมวลผลและเปลี่ยนหน้าโดยอัตโนมัติเมื่อสมาชิกทุกคนส่งผลโหวตครบ"
            : "The screen will advance automatically once everyone in the room has voted."}
        </p>
      </div>
    </Card>
  );
}
function LoadingCard({
  title,
  description,
  count,
  total,
}: {
  title: string;
  description: string;
  count?: number;
  total?: number;
}) {
  return (
    <Card variant="outline" className="rounded-3xl p-8 text-center shadow-sm">
      <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-surface-muted text-text-secondary">
        <CookingAnimation size="sm" />
      </div>
      <div className="mt-4 flex justify-center gap-2 text-text-muted">
        <span className="size-2 rounded-full bg-text-muted" />
        <span className="size-2 rounded-full bg-text-muted opacity-70" />
        <span className="size-2 rounded-full bg-text-muted opacity-40" />
      </div>
      <h2 className="mt-6 text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-text-secondary">
        {description}
      </p>
      {count != null && total != null ? (
        <p className="mt-6 rounded-2xl bg-surface-subtle p-4 text-sm">
          สมาชิกพร้อมแล้ว {count} / {total} คน
        </p>
      ) : null}
    </Card>
  );
}
function StatusScreen({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <main className="min-h-dvh bg-transparent text-text-primary">
      <div className="mx-auto flex min-h-dvh w-full max-w-md items-center justify-center px-4">

        <Card variant="outline" className="w-full rounded-2xl p-6 text-center">
          <h1 className="text-lg font-semibold">{title}</h1>
          {description ? (
            <p className="mt-2 text-sm text-text-secondary">{description}</p>
          ) : null}
          {action ? <div className="mt-5">{action}</div> : null}
        </Card>
      </div>
    </main>
  );
}
