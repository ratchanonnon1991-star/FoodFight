"use client";

import * as React from "react";
import { ArrowRight, Check, Clock3, Crown, ImageIcon, MessageCircle, RotateCcw, Sparkles, UsersRound, Utensils } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ROUTES } from "@/config/routes";
import { RoomPageHeader } from "@/features/room/components/RoomPageHeader";
import {
  RestaurantLoadingScreen,
  RestaurantResults,
} from "@/features/food-fight/components/RestaurantResults";
import {
  BUDGET_OPTIONS,
  COOKING_METHOD_OPTIONS,
  CUISINE_OPTIONS,
  PROTEIN_OPTIONS,
  RESTAURANT_STYLE_OPTIONS,
  type MealPreferenceOption,
} from "@/features/food-fight/constants/meal-preference-options";
import { foodFightService, FoodFightApiError } from "@/features/food-fight/services/food-fight-service";
import type {
  FoodFightState,
  MealPreferenceBudget,
  MealPreferenceDraft,
  RecommendationItem,
  VoteAction,
  VoteSubmission,
} from "@/features/food-fight/types/food-fight-types";

const EMPTY_DRAFT: MealPreferenceDraft = {
  cookingMethods: [], cookingMethodsOther: "", cuisines: [], cuisinesOther: "",
  proteins: [], proteinsOther: "", budget: null, budgetOther: "",
  restaurantStyles: [], restaurantStylesOther: "", additionalNuances: "",
};

type View = "loading" | "form" | "submitted" | "error";

export function MealPreferenceForm({ roomId }: { roomId: string }) {
  const [draft, setDraft] = React.useState(EMPTY_DRAFT);
  const [state, setState] = React.useState<FoodFightState | null>(null);
  const [view, setView] = React.useState<View>("loading");
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isStarting, setIsStarting] = React.useState(false);
  const [isVoting, setIsVoting] = React.useState(false);
  const [isFinalVoting, setIsFinalVoting] = React.useState(false);
  const [isHostTieBreaking, setIsHostTieBreaking] = React.useState(false);
  const [isRerolling, setIsRerolling] = React.useState(false);
  const [isStartingRestaurants, setIsStartingRestaurants] = React.useState(false);
  const [votes, setVotes] = React.useState<Record<string, VoteAction>>({});
  const [finalVoteSelection, setFinalVoteSelection] = React.useState<string | null>(null);
  const [hostTieBreakSelection, setHostTieBreakSelection] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const loadState = React.useCallback(async (options: { clearError?: boolean } = {}) => {
    const nextState = await foodFightService.getFoodFightState(roomId);
    setState(nextState);
    if (options.clearError !== false) setError(null);
    setView((currentView) => nextState.state === "WAITING_FOR_PREFERENCES" && currentView !== "submitted" ? "form" : currentView === "loading" ? "submitted" : currentView);
    setVotes((currentVotes) => Object.keys(currentVotes).length ? currentVotes : Object.fromEntries(nextState.currentUser.votes.map((vote) => [vote.recommendationItemId, vote.vote])));
  }, [roomId]);

  React.useEffect(() => {
    let active = true;
    const loadTimer = window.setTimeout(() => void loadState().catch(() => {
      if (active) { setError("ไม่สามารถโหลดสถานะ FoodFight ได้ กรุณาลองใหม่อีกครั้ง"); setView("error"); }
    }), 0);
    return () => { active = false; window.clearTimeout(loadTimer); };
  }, [loadState]);

  React.useEffect(() => {
    if (!state || state.restaurantState === "RESTAURANTS_READY") return;
    const pollId = window.setInterval(() => void loadState({ clearError: false }).catch(() => setError("เซิร์ฟเวอร์ไม่พร้อมใช้งานชั่วคราว กำลังลองใหม่อีกครั้ง")), 2000);
    return () => window.clearInterval(pollId);
  }, [loadState, state]);

  const updateDraft = <K extends keyof MealPreferenceDraft>(key: K, value: MealPreferenceDraft[K]) => setDraft((current) => ({ ...current, [key]: value }));
  const toggleOption = (key: "cookingMethods" | "cuisines" | "proteins" | "restaurantStyles", value: string) => setDraft((current) => {
    const otherKey = {
      cookingMethods: "cookingMethodsOther",
      cuisines: "cuisinesOther",
      proteins: "proteinsOther",
      restaurantStyles: "restaurantStylesOther",
    }[key] as "cookingMethodsOther" | "cuisinesOther" | "proteinsOther" | "restaurantStylesOther";
    const selectedValues = current[key];

    if (value === "ANY") {
      const isAnySelected = selectedValues.includes("ANY");
      return {
        ...current,
        [key]: isAnySelected ? [] : ["ANY"],
        [otherKey]: isAnySelected ? current[otherKey] : "",
      };
    }

    const withoutAny = selectedValues.filter((item) => item !== "ANY");
    return {
      ...current,
      [key]: withoutAny.includes(value) ? withoutAny.filter((item) => item !== value) : [...withoutAny, value],
    };
  });
  const validationMessage = () => {
    if (!draft.cookingMethods.length && !draft.cookingMethodsOther.trim()) return "เลือกวิธีปรุงอาหารอย่างน้อย 1 รายการ";
    if (!draft.cuisines.length && !draft.cuisinesOther.trim()) return "เลือกประเภทอาหารอย่างน้อย 1 รายการ";
    if (!draft.proteins.length && !draft.proteinsOther.trim()) return "เลือกโปรตีนอย่างน้อย 1 รายการ";
    if (!draft.budget) return "เลือกงบประมาณของมื้ออาหาร";
    if (!draft.restaurantStyles.length && !draft.restaurantStylesOther.trim()) return "เลือกรูปแบบร้านอาหารอย่างน้อย 1 รายการ";
    return null;
  };

  const submitPreference = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validation = validationMessage();
    if (validation) { setError(validation); return; }
    setError(null); setIsSubmitting(true);
    try { await foodFightService.submitMealPreference(roomId, draft); setIsEditing(false); setView("submitted"); await loadState(); }
    catch (requestError) { setError(requestError instanceof FoodFightApiError ? requestError.message : "ส่งความต้องการไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"); }
    finally { setIsSubmitting(false); }
  };

  const startRecommendation = async () => {
    if (!state?.currentUser.isHost || isStarting) return;
    setError(null); setIsStarting(true);
    try { await foodFightService.startRecommendation(roomId); await loadState(); }
    catch (requestError) { setError(requestError instanceof FoodFightApiError ? requestError.message : "เริ่มการแนะนำไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"); }
    finally { setIsStarting(false); }
  };

  const submitVotes = async () => {
    const items = state?.currentRound?.items.slice(0, 2) ?? [];
    if (items.length !== 2 || items.some((item) => !votes[item.id]) || isVoting || state?.currentUser.hasSubmittedVotes) return;
    setError(null); setIsVoting(true);
    const payload: VoteSubmission[] = items.map((item) => ({ recommendationItemId: item.id, vote: votes[item.id] }));
    try { await foodFightService.submitVotes(roomId, payload); await loadState(); }
    catch (requestError) { setError(requestError instanceof FoodFightApiError ? requestError.message : "ส่งการโหวตไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"); }
    finally { setIsVoting(false); }
  };

  const submitFinalVote = async () => {
    if (!finalVoteSelection || isFinalVoting || state?.currentUser.hasSubmittedFinalVote) return;
    setError(null); setIsFinalVoting(true);
    try { await foodFightService.submitFinalVote(roomId, finalVoteSelection); await loadState(); }
    catch (requestError) { setError(requestError instanceof FoodFightApiError ? requestError.message : "ส่งการเลือกเมนูสุดท้ายไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"); }
    finally { setIsFinalVoting(false); }
  };

  const submitHostTieBreak = async () => {
    if (!hostTieBreakSelection || isHostTieBreaking || !state?.currentUser.isHost) return;
    setError(null); setIsHostTieBreaking(true);
    try { await foodFightService.submitHostTieBreak(roomId, hostTieBreakSelection); await loadState(); }
    catch (requestError) { setError(requestError instanceof FoodFightApiError ? requestError.message : "ส่งผลตัดสินเสมอไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"); }
    finally { setIsHostTieBreaking(false); }
  };

  const rerollRecommendation = async () => {
    if (!state?.currentUser.isHost || isRerolling) return;
    setError(null); setIsRerolling(true);
    try { await foodFightService.rerollRecommendation(roomId); await loadState(); }
    catch (requestError) { setError(requestError instanceof FoodFightApiError ? requestError.message : "เริ่มการแนะนำรอบใหม่ไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"); }
    finally { setIsRerolling(false); }
  };

  const startRestaurantRecommendations = async () => {
    if (!state?.currentUser.isHost || state.restaurantState !== "FINALIZED_MENU" || isStartingRestaurants) return;
    setError(null); setIsStartingRestaurants(true);
    try { await foodFightService.startRestaurantRecommendations(roomId); await loadState(); }
    catch (requestError) { setError(requestError instanceof FoodFightApiError ? requestError.message : "เริ่มค้นหาร้านอาหารไม่สำเร็จ กรุณาลองใหม่อีกครั้ง"); }
    finally { setIsStartingRestaurants(false); }
  };

  if (view === "loading") return <StatusScreen title="กำลังโหลด FoodFight..." />;
  if (view === "error") return <StatusScreen title="โหลดข้อมูลไม่สำเร็จ" description={error ?? undefined} action={<Button onClick={() => { setView("loading"); void loadState().catch(() => setView("error")); }}>ลองใหม่</Button>} />;
  if (!state) return null;
  if (state.state === "WAITING_FOR_VOTES" && !state.currentUser.hasSubmittedVotes) {
    return <VoteSubmissionScreen roomId={roomId} state={state} votes={votes} setVotes={setVotes} submitVotes={() => void submitVotes()} isVoting={isVoting} />;
  }
  if (view === "form" || isEditing) return <PreferenceForm roomId={roomId} draft={draft} error={error} isSubmitting={isSubmitting} updateDraft={updateDraft} toggleOption={toggleOption} submitPreference={submitPreference} />;
  return <main className="min-h-dvh bg-background text-text-primary"><div className="mx-auto w-full max-w-md px-4 pb-32 pt-3 sm:px-6 sm:pt-5 md:max-w-3xl"><RoomPageHeader title={getFoodFightTitle(state)} subtitle="สถานะมื้ออาหารสำหรับห้องนี้" backHref={ROUTES.ROOM.LOBBY(roomId)} />{error ? <Alert variant="error" className="mb-4"><AlertTitle>เกิดข้อผิดพลาด</AlertTitle><AlertDescription>{error}</AlertDescription><Button className="mt-3" variant="outline" size="sm" onClick={() => void loadState().catch(() => setError("เซิร์ฟเวอร์ไม่พร้อมใช้งานชั่วคราว กำลังลองใหม่อีกครั้ง"))}>ลองใหม่</Button></Alert> : null}{state.state === "VOTING" && !state.currentUser.hasSubmittedVotes ? <VotingScreen state={state} votes={votes} setVotes={setVotes} submitVotes={() => void submitVotes()} isVoting={isVoting} /> : null}{state.state === "VOTING" && state.currentUser.hasSubmittedVotes ? <WaitingScreen title="รอสมาชิกโหวต" description="คุณส่งการโหวตแล้ว รอสมาชิกคนอื่นโหวตให้ครบ" count={state.voteProgress.submittedMemberCount} total={state.voteProgress.totalMemberCount} /> : null}{state.state === "WAITING_FOR_VOTES" ? <WaitingScreen title="รอสมาชิกโหวต" description="รอสมาชิกโหวตให้ครบทุกคน" count={state.voteProgress.submittedMemberCount} total={state.voteProgress.totalMemberCount} /> : null}{state.state === "RECOMMENDING" ? <LoadingCard title="กำลังหาเมนูที่เหมาะกับทุกคน..." description="กำลังวิเคราะห์ความชอบและข้อจำกัดของสมาชิก" count={state.submittedMemberCount} total={state.totalMemberCount} /> : null}{state.state === "WAITING_FOR_PREFERENCES" || state.state === "READY_TO_RECOMMEND" ? <WaitingForMembers state={state} onEdit={() => setIsEditing(true)} onStart={() => void startRecommendation()} isStarting={isStarting} /> : null}{state.state === "FINAL_VOTE_REQUIRED" && state.finalVoteProgress.hostTieBreakRequired && state.currentUser.isHost ? <FinalVoteScreen state={state} selection={hostTieBreakSelection} setSelection={setHostTieBreakSelection} submit={() => void submitHostTieBreak()} isSubmitting={isHostTieBreaking} hostTieBreak /> : null}{state.state === "FINAL_VOTE_REQUIRED" && !state.finalVoteProgress.hostTieBreakRequired && !state.currentUser.hasSubmittedFinalVote ? <FinalVoteScreen state={state} selection={finalVoteSelection} setSelection={setFinalVoteSelection} submit={() => void submitFinalVote()} isSubmitting={isFinalVoting} /> : null}{state.state === "FINAL_VOTE_REQUIRED" && (state.currentUser.hasSubmittedFinalVote || state.finalVoteProgress.hostTieBreakRequired) && !(state.finalVoteProgress.hostTieBreakRequired && state.currentUser.isHost) ? <FinalVoteWaiting state={state} /> : null}{state.state === "REROLL_REQUIRED" ? <RerollScreen state={state} onReroll={() => void rerollRecommendation()} isRerolling={isRerolling} /> : null}{state.state === "FINALIZED" && isStartingRestaurants ? <RestaurantLoadingScreen /> : null}{state.state === "FINALIZED" && !isStartingRestaurants ? <FinalizedScreen state={state} onStartRestaurants={() => void startRestaurantRecommendations()} isStartingRestaurants={isStartingRestaurants} /> : null}{(state.restaurantState === "RECOMMENDING_RESTAURANTS" || state.restaurantState === "RESTAURANTS_READY" || state.state === "RECOMMENDING_RESTAURANTS" || state.state === "RESTAURANTS_READY") ? <RestaurantResults roomId={roomId} state={state} /> : null}</div></main>;
}

function PreferenceForm({ roomId, draft, error, isSubmitting, updateDraft, toggleOption, submitPreference }: { roomId: string; draft: MealPreferenceDraft; error: string | null; isSubmitting: boolean; updateDraft: <K extends keyof MealPreferenceDraft>(key: K, value: MealPreferenceDraft[K]) => void; toggleOption: (key: "cookingMethods" | "cuisines" | "proteins" | "restaurantStyles", value: string) => void; submitPreference: (event: React.FormEvent<HTMLFormElement>) => void }) {
  return <main className="min-h-dvh bg-background text-text-primary"><div className="mx-auto w-full max-w-md px-4 pb-32 pt-3 sm:px-6 sm:pt-5 md:max-w-2xl"><RoomPageHeader title="Meal Preference" subtitle="บอกความต้องการของคุณสำหรับมื้อนี้" backHref={ROUTES.ROOM.LOBBY(roomId)} />{error ? <Alert variant="warning" className="mb-4"><AlertTitle>ข้อมูลยังไม่ครบ</AlertTitle><AlertDescription>{error}</AlertDescription></Alert> : null}<Card variant="outline" className="rounded-2xl p-4 sm:p-6"><div className="flex items-start gap-3 rounded-xl bg-surface-subtle p-4"><Sparkles className="mt-0.5 size-5 shrink-0 text-brand-primary" aria-hidden="true" /><p className="text-sm leading-6 text-text-secondary">เลือกเฉพาะสิ่งที่อยากทานในมื้อนี้ ข้อมูลนี้จะใช้ร่วมกับความต้องการของสมาชิกคนอื่นในห้อง</p></div><form className="mt-6 space-y-7" onSubmit={submitPreference}><OptionGroup title="วิธีปรุงอาหาร" options={COOKING_METHOD_OPTIONS} selectedValues={draft.cookingMethods} onToggle={(value) => toggleOption("cookingMethods", value)} otherValue={draft.cookingMethodsOther} onOtherChange={(value) => updateDraft("cookingMethodsOther", value)} /><OptionGroup title="ประเภทอาหาร" options={CUISINE_OPTIONS} selectedValues={draft.cuisines} onToggle={(value) => toggleOption("cuisines", value)} otherValue={draft.cuisinesOther} onOtherChange={(value) => updateDraft("cuisinesOther", value)} /><OptionGroup title="โปรตีนที่อยากทาน" options={PROTEIN_OPTIONS} selectedValues={draft.proteins} onToggle={(value) => toggleOption("proteins", value)} otherValue={draft.proteinsOther} onOtherChange={(value) => updateDraft("proteinsOther", value)} /><fieldset><legend className="text-sm font-semibold">งบประมาณต่อคน</legend><div className="mt-3 grid gap-2 sm:grid-cols-3">{BUDGET_OPTIONS.map((option) => <button key={option.value} type="button" aria-pressed={draft.budget === option.value} onClick={() => updateDraft("budget", option.value as MealPreferenceBudget)} className={`rounded-xl border p-3 text-left ${draft.budget === option.value ? "border-brand-primary bg-brand-primary/10" : "border-border bg-surface"}`}><span className="block text-sm font-semibold">{option.label}</span><span className="mt-1 block text-xs text-text-secondary">{option.description}</span></button>)}</div></fieldset><OptionGroup title="รูปแบบร้านอาหาร" options={RESTAURANT_STYLE_OPTIONS} selectedValues={draft.restaurantStyles} onToggle={(value) => toggleOption("restaurantStyles", value)} otherValue={draft.restaurantStylesOther} onOtherChange={(value) => updateDraft("restaurantStylesOther", value)} /><label className="block"><span className="text-sm font-semibold">รายละเอียดเพิ่มเติม</span><Textarea value={draft.additionalNuances} onChange={(event) => updateDraft("additionalNuances", event.target.value)} className="mt-3" placeholder="บอกความต้องการเพิ่มเติมได้ที่นี่" rows={4} /></label><Button type="submit" fullWidth loading={isSubmitting} loadingText="กำลังส่งข้อมูล..." rightIcon={<ArrowRight className="size-4" aria-hidden="true" />}>ส่ง Meal Preference</Button></form></Card></div></main>;
}

function VoteSubmissionScreen({ roomId, state, votes, setVotes, submitVotes, isVoting }: { roomId: string; state: FoodFightState; votes: Record<string, VoteAction>; setVotes: React.Dispatch<React.SetStateAction<Record<string, VoteAction>>>; submitVotes: () => void; isVoting: boolean }) {
  return <main className="min-h-dvh bg-background text-text-primary"><div className="mx-auto w-full max-w-md px-4 pb-32 pt-3 sm:px-6 sm:pt-5 md:max-w-3xl"><RoomPageHeader title={getFoodFightTitle(state)} subtitle="สถานะมื้ออาหารสำหรับห้องนี้" backHref={ROUTES.ROOM.LOBBY(roomId)} /><VotingScreen state={state} votes={votes} setVotes={setVotes} submitVotes={submitVotes} isVoting={isVoting} /></div></main>;
}

function getFoodFightTitle(state: FoodFightState) {
  if (state.restaurantState === "RECOMMENDING_RESTAURANTS") return "กำลังค้นหาร้านอาหาร";
  if (state.restaurantState === "RESTAURANTS_READY") return "ร้านอาหารที่แนะนำ";
  if (state.state === "WAITING_FOR_PREFERENCES") return "กำลังรอสมาชิก";
  if (state.state === "READY_TO_RECOMMEND") return "ทุกคนพร้อมแล้ว!";
  if (state.state === "RECOMMENDING") return "กำลังประมวลผล";
  if (state.state === "VOTING") return state.currentRound?.roundNumber === 2 ? "เมนูที่แนะนำ รอบที่ 2" : "เมนูที่แนะนำ";
  if (state.state === "WAITING_FOR_VOTES") return "รอผลโหวตจากสมาชิก";
  if (state.state === "FINAL_VOTE_REQUIRED") return state.finalVoteProgress.hostTieBreakRequired ? "คะแนนเท่ากัน!" : "เลือกเมนูสุดท้าย";
  if (state.state === "REROLL_REQUIRED") return "รอ Host เริ่มรอบใหม่";
  if (state.state === "FINALIZED") return "เมนูที่กลุ่มเลือกแล้ว!";
  return "FoodFight";
}

function StateIllustration({ icon, tone = "brand" }: { icon: React.ReactNode; tone?: "brand" | "success" | "muted" }) {
  const toneClass = tone === "success" ? "bg-status-success-bg text-status-success-icon" : tone === "muted" ? "bg-surface-muted text-text-secondary" : "bg-brand-primary text-white";
  return <div className={`mx-auto flex size-24 items-center justify-center rounded-full ${toneClass}`}>{icon}</div>;
}

function WaitingForMembers({ state, onEdit, onStart, isStarting }: { state: FoodFightState; onEdit: () => void; onStart: () => void; isStarting: boolean }) {
  const ready = state.state === "READY_TO_RECOMMEND";
  const remaining = Math.max(state.totalMemberCount - state.submittedMemberCount, 0);

  return <Card variant="outline" className="rounded-3xl p-5 shadow-sm sm:p-7"><StateIllustration icon={ready ? <Check className="size-10" strokeWidth={2.5} aria-hidden="true" /> : <UsersRound className="size-10" strokeWidth={1.6} aria-hidden="true" />} tone={ready ? "success" : "brand"} /><h2 className="mt-5 text-center text-2xl font-semibold tracking-tight">{ready ? "ทุกคนพร้อมแล้ว!" : "กำลังรอสมาชิก"}</h2><p className="mx-auto mt-2 max-w-xs text-center text-sm leading-6 text-text-secondary">{ready ? "ส่งความต้องการอาหารครบแล้ว พร้อมเริ่มแนะนำเมนู" : "ส่งความต้องการแล้ว รอสมาชิกคนอื่นส่งข้อมูลให้ครบ"}</p><div className="mt-6 text-center"><p className="text-sm text-text-secondary">ส่งความต้องการแล้ว</p><p className="mt-1 text-3xl font-semibold tracking-tight">{state.submittedMemberCount} / {state.totalMemberCount} <span className="text-base font-normal text-text-secondary">คน</span></p>{!ready && remaining > 0 ? <p className="mt-1 text-sm text-text-secondary">รอเพื่อนอีก {remaining} คน</p> : <p className="mt-1 text-sm text-text-secondary">พร้อมเริ่มแนะนำเมนู</p>}</div><div className="mt-6 rounded-2xl border border-border-subtle bg-surface-subtle p-4"><div className="flex items-center justify-between text-xs text-text-secondary"><span>ความคืบหน้า</span><span>{state.submittedMemberCount} / {state.totalMemberCount}</span></div><div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-muted"><div className="h-full rounded-full bg-brand-primary transition-[width] duration-300" style={{ width: `${state.totalMemberCount ? (state.submittedMemberCount / state.totalMemberCount) * 100 : 0}%` }} /></div></div>{ready ? <div className="mt-6"><p className="mb-2 text-xs font-medium text-text-secondary">{state.currentUser.isHost ? "Host เท่านั้น" : "สำหรับสมาชิก"}</p><Button className="w-full" onClick={onStart} disabled={!state.currentUser.isHost || isStarting} loading={isStarting} loadingText="กำลังเริ่ม..." rightIcon={<ArrowRight className="size-4" aria-hidden="true" />}>{state.currentUser.isHost ? "เริ่มแนะนำเมนู" : "รอ Host เริ่มแนะนำ"}</Button></div> : <Button className="mt-6 w-full" variant="outline" onClick={onEdit}>แก้ไขความต้องการ</Button>}</Card>;
}

function VotingScreen({ state, votes, setVotes, submitVotes, isVoting }: { state: FoodFightState; votes: Record<string, VoteAction>; setVotes: React.Dispatch<React.SetStateAction<Record<string, VoteAction>>>; submitVotes: () => void; isVoting: boolean }) {
  const items = state.currentRound?.items.slice(0, 2) ?? [];
  const roundNumber = state.currentRound?.roundNumber ?? 1;
  const isSecondRound = roundNumber === 2;

  return <section aria-labelledby="voting-title"><p className="text-sm font-medium text-brand-primary">{isSecondRound ? "เมนูที่แนะนำ รอบที่ 2" : "เมนูที่แนะนำ"}</p><h2 id="voting-title" className="mt-1 text-2xl font-semibold tracking-tight">{isSecondRound ? "เมนูใหม่สำหรับกลุ่ม" : "เราเลือกมาให้กลุ่ม 2 เมนู"}</h2><p className="mt-2 text-sm leading-6 text-text-secondary">เลือก OK หรือ PASS ทั้งคู่ แล้วกดยืนยันการโหวต</p><div className="mt-5 grid gap-3">{items.map((item) => <RecommendationCard key={item.id} item={item} vote={votes[item.id]} onVote={(vote) => setVotes((current) => ({ ...current, [item.id]: vote }))} />)}</div><Button className="mt-5 w-full" onClick={submitVotes} disabled={items.length !== 2 || items.some((item) => !votes[item.id]) || isVoting} loading={isVoting} loadingText="กำลังส่งการโหวต...">ยืนยันการโหวต</Button><p className="mt-3 text-center text-xs text-text-secondary">ต้องเลือกให้ครบทั้ง 2 เมนู</p></section>;
}

function FinalVoteScreen({ state, selection, setSelection, submit, isSubmitting, hostTieBreak = false }: { state: FoodFightState; selection: string | null; setSelection: React.Dispatch<React.SetStateAction<string | null>>; submit: () => void; isSubmitting: boolean; hostTieBreak?: boolean }) {
  const title = hostTieBreak ? "คะแนนเท่ากัน!" : state.finalVoteType === "FOUR_MENU_FINAL" ? "เลือกเมนูสุดท้าย" : "เลือกเมนูสุดท้ายของห้อง";
  const description = hostTieBreak ? "ทั้ง 2 เมนูได้คะแนนเท่ากัน โหวตอีกครั้งเพื่อเลือกเมนูที่ชอบที่สุด" : "สมาชิกแต่ละคนเลือกได้ 1 เมนู";
  const items = state.finalVoteCandidates;

  return <section aria-labelledby="final-vote-title"><p className="text-sm font-medium text-brand-primary">Final Vote</p><h2 id="final-vote-title" className="mt-1 text-2xl font-semibold tracking-tight">{title}</h2><p className="mt-2 text-sm leading-6 text-text-secondary">{description}</p><p className="mt-3 text-sm font-medium">เลือก 1 เมนูเท่านั้น</p><div className="mt-4 grid gap-2" role="radiogroup" aria-label={title}>{items.map((item) => <FinalVoteCard key={item.id} item={item} selected={selection === item.id} onSelect={() => setSelection(item.id)} voteCount={hostTieBreak ? state.finalVoteProgress.counts[item.id] : undefined} />)}</div><Button className="mt-5 w-full" onClick={submit} disabled={!selection || isSubmitting} loading={isSubmitting} loadingText="กำลังส่งการเลือก...">{hostTieBreak ? "ยืนยันการโหวต" : "ยืนยันเมนูสุดท้าย"}</Button><p className="mt-3 text-center text-xs text-text-secondary">ทุกคนต้องเลือกให้ครบ</p></section>;
}

function FinalVoteCard({ item, selected, onSelect, voteCount }: { item: RecommendationItem; selected: boolean; onSelect: () => void; voteCount?: number }) {
  const metadata = item.metadata;
  const reasons = metadata?.reasons?.length ? metadata.reasons : item.reason ? [item.reason] : [];

  return <Card variant="outline" className={`rounded-2xl p-2 shadow-sm ${selected ? "border-brand-primary bg-brand-primary/5" : ""}`}><button type="button" role="radio" aria-checked={selected} onClick={onSelect} className="flex w-full items-start gap-3 rounded-xl p-2 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-focus-ring"><div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface-muted"><ImageIcon className="size-8 text-text-muted" aria-hidden="true" /><span className="absolute -left-1 -top-1 flex size-6 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">{item.displayOrder}</span></div><div className="min-w-0 flex-1"><h3 className="text-base font-semibold">{metadata?.nameTh ?? item.menuName}</h3>{metadata?.name && metadata.name !== metadata.nameTh ? <p className="text-xs text-text-secondary">{metadata.name}</p> : null}{metadata?.cuisineTh || metadata?.cuisine ? <p className="mt-1 text-xs text-text-secondary">{metadata.cuisineTh ?? metadata.cuisine}</p> : null}{item.description ? <p className="mt-1 line-clamp-2 text-xs leading-5 text-text-secondary">{item.description}</p> : null}{reasons.length ? <p className="mt-1 line-clamp-2 text-xs leading-5 text-text-secondary">{reasons[0]}</p> : null}{voteCount != null ? <p className="mt-1 text-xs text-text-muted">คะแนน {voteCount} คน</p> : null}</div><span className={`mt-1 flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${selected ? "border-brand-primary" : "border-border-strong"}`} aria-hidden="true">{selected ? <span className="size-2.5 rounded-full bg-brand-primary" /> : null}</span></button></Card>;
}

function FinalVoteWaiting({ state }: { state: FoodFightState }) {
  const tieBreakRequired = state.finalVoteProgress.hostTieBreakRequired;
  return <Card variant="outline" className="rounded-3xl p-6 text-center shadow-sm sm:p-8"><StateIllustration icon={tieBreakRequired ? <MessageCircle className="size-10" aria-hidden="true" /> : <UsersRound className="size-10" aria-hidden="true" />} tone="muted" /><h2 className="mt-5 text-xl font-semibold">{tieBreakRequired ? "รอ Host ตัดสินผลเสมอ" : "รอผลโหวตจากสมาชิก"}</h2><p className="mt-2 text-sm leading-6 text-text-secondary">{tieBreakRequired ? "สมาชิกส่งคะแนนครบแล้ว รอ Host เลือกเมนูจากตัวเลือกที่ Backend ส่งมา" : "รอเพื่อนโหวตให้ครบทุกคน"}</p><p className="mt-5 text-2xl font-semibold tracking-tight">{state.finalVoteProgress.submittedMemberCount} / {state.finalVoteProgress.totalMemberCount} <span className="text-sm font-normal text-text-secondary">คน</span></p><p className="mt-1 text-xs text-text-secondary">(คุณโหวตแล้ว)</p></Card>;
}

function RerollScreen({ state, onReroll, isRerolling }: { state: FoodFightState; onReroll: () => void; isRerolling: boolean }) {
  if (isRerolling) return <RerollLoadingCard />;
  if (!state.currentUser.isHost) return <WaitingScreen title="รอ Host เริ่มรอบใหม่" description="ทั้งสองเมนูยังไม่มีคะแนนถึงเกณฑ์ รอ Host เริ่มการแนะนำอีกครั้ง" count={state.voteProgress.submittedMemberCount} total={state.voteProgress.totalMemberCount} />;
  return <Card variant="outline" className="rounded-3xl p-6 shadow-sm"><StateIllustration icon={<RotateCcw className="size-10" aria-hidden="true" />} tone="muted" /><h2 className="mt-5 text-center text-xl font-semibold">ยังไม่มีเมนูที่ได้คะแนนถึงเกณฑ์</h2><p className="mt-2 text-center text-sm leading-6 text-text-secondary">ทั้งสองเมนูยังไม่ได้รับคะแนนตามเกณฑ์ Backend คุณสามารถเริ่มการแนะนำรอบใหม่ได้</p><Button className="mt-6 w-full" onClick={onReroll} loading={isRerolling} loadingText="กำลังเริ่มรอบใหม่...">แนะนำเมนูรอบใหม่</Button></Card>;
}

function RerollLoadingCard() {
  return <Card variant="outline" className="rounded-3xl p-8 text-center shadow-sm"><div className="mx-auto flex size-24 items-center justify-center rounded-full bg-surface-muted text-text-secondary"><RotateCcw className="size-12 animate-spin" aria-hidden="true" /></div><h2 className="mt-6 text-xl font-semibold">กำลังหาเมนูใหม่ให้คุณ...</h2><p className="mt-2 text-sm leading-6 text-text-secondary">กำลังสร้างเมนูรอบถัดไปจากความต้องการของสมาชิก</p><Button className="mt-7 w-full" variant="outline" loading loadingText="กำลังวิเคราะห์...">กำลังวิเคราะห์...</Button></Card>;
}

function FinalizedScreen({ state, onStartRestaurants, isStartingRestaurants }: { state: FoodFightState; onStartRestaurants: () => void; isStartingRestaurants: boolean }) {
  if (isStartingRestaurants) return <RestaurantLoadingScreen />;
  const finalSelection = state.finalSelection;
  if (!finalSelection) return <StatusScreen title="กำลังโหลดเมนูสุดท้าย..." description="ยังไม่ได้รับข้อมูลเมนูสุดท้ายจาก Backend" />;
  return <Card variant="outline" className="rounded-3xl p-6 text-center shadow-sm"><StateIllustration icon={<Crown className="size-11" aria-hidden="true" />} tone="muted" /><p className="mt-5 text-sm font-medium text-brand-primary">FoodFight เสร็จสมบูรณ์</p><h2 className="mt-1 text-2xl font-semibold tracking-tight">เมนูที่กลุ่มเลือกแล้ว!</h2><div className="mt-5 rounded-2xl bg-surface-subtle p-5"><div className="mx-auto flex size-28 items-center justify-center rounded-xl bg-surface-muted"><ImageIcon className="size-12 text-text-muted" aria-hidden="true" /></div><h3 className="mt-4 text-2xl font-semibold">{finalSelection.nameTh ?? finalSelection.name}</h3>{finalSelection.nameTh && finalSelection.name !== finalSelection.nameTh ? <p className="mt-1 text-sm text-text-secondary">{finalSelection.name}</p> : null}{finalSelection.cuisine ? <p className="mt-2 text-sm text-text-secondary">{finalSelection.cuisine}</p> : null}<p className="mt-4 text-sm font-medium">สมาชิกทุกคนยืนยันเมนูนี้แล้ว</p></div>{state.currentUser.isHost ? <><p className="mt-5 text-xs text-text-secondary">Host เท่านั้นที่เริ่มค้นหาร้านอาหารได้</p><Button className="mt-3 w-full" variant="outline" onClick={onStartRestaurants} disabled={state.restaurantState !== "FINALIZED_MENU" || isStartingRestaurants} loading={isStartingRestaurants} loadingText="กำลังเริ่มค้นหา...">ค้นหาร้านอาหาร</Button></> : <p className="mt-6 text-center text-sm text-text-secondary">รอ Host ค้นหาร้านอาหาร</p>}</Card>;
}

function RecommendationCard({ item, vote, onVote }: { item: RecommendationItem; vote?: VoteAction; onVote: (vote: VoteAction) => void }) {
  const metadata = item.metadata;
  const reasons = metadata?.reasons?.length ? metadata.reasons : item.reason ? [item.reason] : [];
  const details = [metadata?.cuisineTh ?? metadata?.cuisine, metadata?.proteinsTh?.join(" • "), metadata?.cookingMethodsTh?.join(" • ")].filter(Boolean);

  return <Card variant="outline" className="relative rounded-2xl p-3 shadow-sm"><div className="flex gap-3"><div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-surface-muted"><ImageIcon className="size-9 text-text-muted" aria-hidden="true" /><span className="absolute -left-1 -top-1 flex size-7 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white">{item.displayOrder}</span></div><div className="min-w-0 flex-1"><h3 className="text-base font-semibold leading-6">{metadata?.nameTh ?? item.menuName}</h3>{metadata?.name && metadata.name !== metadata.nameTh ? <p className="text-xs font-medium text-text-secondary">{metadata.name}</p> : null}{details.length ? <ul className="mt-1 space-y-0.5 text-xs leading-5 text-text-secondary">{details.map((detail) => <li key={detail} className="truncate">• {detail}</li>)}</ul> : null}{reasons.length ? <p className="mt-1 line-clamp-2 text-xs leading-5 text-text-secondary">{reasons[0]}</p> : null}{metadata?.satisfiedMembers != null && metadata.memberCount != null ? <p className="mt-1 text-xs text-text-muted">ตรงใจสมาชิก {metadata.satisfiedMembers} / {metadata.memberCount}</p> : null}</div></div><div className="mt-3 grid grid-cols-2 gap-2"><Button type="button" size="sm" variant={vote === "OK" ? "primary" : "outline"} aria-pressed={vote === "OK"} onClick={() => onVote("OK")}>OK</Button><Button type="button" size="sm" variant={vote === "PASS" ? "primary" : "outline"} aria-pressed={vote === "PASS"} onClick={() => onVote("PASS")}>PASS</Button></div></Card>;
}

function WaitingScreen({ title, description, count, total }: { title: string; description: string; count: number; total: number }) { return <Card variant="outline" className="rounded-3xl p-6 text-center shadow-sm sm:p-8"><StateIllustration icon={<Clock3 className="size-10" aria-hidden="true" />} tone="muted" /><h2 className="mt-5 text-xl font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-text-secondary">{description}</p><p className="mt-5 text-2xl font-semibold tracking-tight">{count} / {total} <span className="text-sm font-normal text-text-secondary">คน</span></p></Card>; }
function LoadingCard({ title, description, count, total }: { title: string; description: string; count?: number; total?: number }) { return <Card variant="outline" className="rounded-3xl p-8 text-center shadow-sm"><div className="mx-auto flex size-24 items-center justify-center rounded-full bg-surface-muted text-text-secondary"><Utensils className="size-11" aria-hidden="true" /></div><div className="mt-4 flex justify-center gap-2 text-text-muted"><span className="size-2 rounded-full bg-text-muted" /><span className="size-2 rounded-full bg-text-muted opacity-70" /><span className="size-2 rounded-full bg-text-muted opacity-40" /></div><h2 className="mt-6 text-xl font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-text-secondary">{description}</p>{count != null && total != null ? <p className="mt-6 rounded-2xl bg-surface-subtle p-4 text-sm">สมาชิกพร้อมแล้ว {count} / {total} คน</p> : null}</Card>; }
function StatusScreen({ title, description, action }: { title: string; description?: string; action?: React.ReactNode }) { return <main className="min-h-dvh bg-background text-text-primary"><div className="mx-auto flex min-h-dvh w-full max-w-md items-center justify-center px-4"><Card variant="outline" className="w-full rounded-2xl p-6 text-center"><h1 className="text-lg font-semibold">{title}</h1>{description ? <p className="mt-2 text-sm text-text-secondary">{description}</p> : null}{action ? <div className="mt-5">{action}</div> : null}</Card></div></main>; }
function OptionGroup({ title, options, selectedValues, onToggle, otherValue, onOtherChange }: { title: string; options: MealPreferenceOption[]; selectedValues: string[]; onToggle: (value: string) => void; otherValue: string; onOtherChange: (value: string) => void }) { return <fieldset><legend className="text-sm font-semibold">{title}</legend><div className="mt-3 flex flex-wrap gap-2">{options.map((option) => { const selected = selectedValues.includes(option.value); return <button key={option.value} type="button" aria-pressed={selected} onClick={() => onToggle(option.value)} className={`rounded-full border px-3.5 py-2 text-left text-sm ${selected ? "border-brand-primary bg-brand-primary text-white" : "border-border bg-surface text-text-primary"}`}>{option.label}<span className={`ml-1 text-xs ${selected ? "text-white/80" : "text-text-muted"}`}>{option.englishLabel}</span></button>; })}</div><Input value={otherValue} onChange={(event) => onOtherChange(event.target.value)} disabled={selectedValues.includes("ANY")} className="mt-3" placeholder="อื่น ๆ (ถ้ามี)" aria-label={`${title} อื่น ๆ`} /></fieldset>; }
