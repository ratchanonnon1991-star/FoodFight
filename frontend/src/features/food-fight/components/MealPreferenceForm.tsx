"use client";

import * as React from "react";
import {
  ArrowRight,
  Check,
  Clock3,
  Crown,
  ImageIcon,
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
      <main className="min-h-dvh bg-background text-text-primary">
        <div className="mx-auto w-full max-w-md px-4 pb-32 pt-3 sm:px-6 sm:pt-5 md:max-w-3xl">
          <RoomPageHeader
            title={getFoodFightTitle(state)}
            subtitle="สถานะมื้ออาหารสำหรับห้องนี้"
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
    <main className="min-h-dvh bg-background text-text-primary">
      <div className="mx-auto w-full max-w-md px-4 pb-32 pt-3 sm:px-6 sm:pt-5 md:max-w-3xl">
        <RoomPageHeader
          title={getFoodFightTitle(state)}
          subtitle="สถานะมื้ออาหารสำหรับห้องนี้"
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

function getFoodFightTitle(state: FoodFightState) {
  if (state.restaurantState === "RECOMMENDING_RESTAURANTS")
    return "กำลังค้นหาร้านอาหาร";
  if (state.restaurantState === "RESTAURANTS_EMPTY")
    return "ยังไม่พบร้านอาหารที่ใช้ได้";
  if (state.restaurantState === "RESTAURANTS_READY") return "ร้านอาหารที่แนะนำ";
  if (state.state === "WAITING_FOR_PREFERENCES") return "กำลังรอสมาชิก";
  if (state.state === "READY_TO_RECOMMEND") return "ทุกคนพร้อมแล้ว!";
  if (state.state === "RECOMMENDING") return "กำลังประมวลผล";
  if (state.state === "VOTING")
    return state.currentRound?.roundNumber === 2
      ? "เมนูที่แนะนำ รอบที่ 2"
      : "เมนูที่แนะนำ";
  if (state.state === "WAITING_FOR_VOTES") return "รอผลโหวตจากสมาชิก";
  if (state.state === "FINAL_VOTE_REQUIRED")
    return state.finalVoteProgress.hostTieBreakRequired
      ? "คะแนนเท่ากัน!"
      : "เลือกเมนูสุดท้าย";
  if (state.state === "REROLL_REQUIRED") return "รอ Host เริ่มรอบใหม่";
  if (state.state === "FINALIZED") return "เมนูที่กลุ่มเลือกแล้ว!";
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
      ? "bg-status-success-bg text-status-success-icon"
      : tone === "muted"
        ? "bg-surface-muted text-text-secondary"
        : "bg-brand-primary text-white";
  return (
    <div
      className={`mx-auto flex size-24 items-center justify-center rounded-full ${toneClass}`}
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
  const ready = state.state === "READY_TO_RECOMMEND";
  const remaining = Math.max(
    state.totalMemberCount - state.submittedMemberCount,
    0,
  );

  return (
    <Card variant="outline" className="rounded-3xl p-5 shadow-sm sm:p-7">
      <StateIllustration
        icon={
          ready ? (
            <Check className="size-10" strokeWidth={2.5} aria-hidden="true" />
          ) : (
            <UsersRound
              className="size-10"
              strokeWidth={1.6}
              aria-hidden="true"
            />
          )
        }
        tone={ready ? "success" : "brand"}
      />
      <h2 className="mt-5 text-center text-2xl font-semibold tracking-tight">
        {ready ? "ทุกคนพร้อมแล้ว!" : "กำลังรอสมาชิก"}
      </h2>
      <p className="mx-auto mt-2 max-w-xs text-center text-sm leading-6 text-text-secondary">
        {ready
          ? "ส่งความต้องการอาหารครบแล้ว พร้อมเริ่มแนะนำเมนู"
          : "ส่งความต้องการแล้ว รอสมาชิกคนอื่นส่งข้อมูลให้ครบ"}
      </p>
      <div className="mt-6 text-center">
        <p className="text-sm text-text-secondary">ส่งความต้องการแล้ว</p>
        <p className="mt-1 text-3xl font-semibold tracking-tight">
          {state.submittedMemberCount} / {state.totalMemberCount}{" "}
          <span className="text-base font-normal text-text-secondary">คน</span>
        </p>
        {!ready && remaining > 0 ? (
          <p className="mt-1 text-sm text-text-secondary">
            รอเพื่อนอีก {remaining} คน
          </p>
        ) : (
          <p className="mt-1 text-sm text-text-secondary">
            พร้อมเริ่มแนะนำเมนู
          </p>
        )}
      </div>
      <div className="mt-6 rounded-2xl border border-border-subtle bg-surface-subtle p-4">
        <div className="flex items-center justify-between text-xs text-text-secondary">
          <span>ความคืบหน้า</span>
          <span>
            {state.submittedMemberCount} / {state.totalMemberCount}
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-muted">
          <div
            className="h-full rounded-full bg-brand-primary transition-[width] duration-300"
            style={{
              width: `${state.totalMemberCount ? (state.submittedMemberCount / state.totalMemberCount) * 100 : 0}%`,
            }}
          />
        </div>
      </div>
      {ready ? (
        <div className="mt-6">
          <p className="mb-2 text-xs font-medium text-text-secondary">
            {state.currentUser.isHost ? "Host เท่านั้น" : "สำหรับสมาชิก"}
          </p>
          <Button
            className="w-full"
            onClick={onStart}
            disabled={!state.currentUser.isHost || isStarting}
            loading={isStarting}
            loadingText="กำลังเริ่ม..."
            rightIcon={<ArrowRight className="size-4" aria-hidden="true" />}
          >
            {state.currentUser.isHost ? "เริ่มแนะนำเมนู" : "รอ Host เริ่มแนะนำ"}
          </Button>
        </div>
      ) : (
        <Button className="mt-6 w-full" variant="outline" onClick={onEdit}>
          แก้ไขความต้องการ
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
  if (isRerolling) return <RerollLoadingCard />;
  if (!state.currentUser.isHost)
    return (
      <WaitingScreen
        title="รอ Host เริ่มรอบใหม่"
        description="ทั้งสองเมนูยังไม่มีคะแนนถึงเกณฑ์ รอ Host เริ่มการแนะนำอีกครั้ง"
        count={state.voteProgress.submittedMemberCount}
        total={state.voteProgress.totalMemberCount}
      />
    );
  return (
    <Card variant="outline" className="rounded-3xl p-6 shadow-sm">
      <StateIllustration
        icon={<RotateCcw className="size-10" aria-hidden="true" />}
        tone="muted"
      />
      <h2 className="mt-5 text-center text-xl font-semibold">
        ยังไม่มีเมนูที่ได้คะแนนถึงเกณฑ์
      </h2>
      <p className="mt-2 text-center text-sm leading-6 text-text-secondary">
        ทั้งสองเมนูยังไม่ได้รับคะแนนตามเกณฑ์ Backend
        คุณสามารถเริ่มการแนะนำรอบใหม่ได้
      </p>
      <Button
        className="mt-6 w-full"
        onClick={onReroll}
        loading={isRerolling}
        loadingText="กำลังเริ่มรอบใหม่..."
      >
        แนะนำเมนูรอบใหม่
      </Button>
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
  return (
    <Card
      variant="outline"
      className="rounded-3xl p-6 text-center shadow-sm sm:p-8"
    >
      <StateIllustration
        icon={<Clock3 className="size-10" aria-hidden="true" />}
        tone="muted"
      />
      <h2 className="mt-5 text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-text-secondary">
        {description}
      </p>
      <p className="mt-5 text-2xl font-semibold tracking-tight">
        {count} / {total}{" "}
        <span className="text-sm font-normal text-text-secondary">คน</span>
      </p>
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
    <main className="min-h-dvh bg-background text-text-primary">
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
