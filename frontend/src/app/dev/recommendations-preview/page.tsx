"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import {
  Check,
  ChevronRight,
  Clock3,
  Info,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { AtmosphereBackground } from "@/components/ui/AtmosphereBackground";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";
import { VotingRoundScreen } from "@/features/food-fight/components/VotingRoundScreen";
import {
  FinalVoteScreen,
} from "@/features/food-fight/components/FinalVoteScreen";
import type {
  RecommendationItem,
  VoteAction,
} from "@/features/food-fight/types/food-fight-types";

// Development Guard
const isDev = process.env.NODE_ENV !== "production";

type DevPreviewState =
  | "INITIAL_VOTING"
  | "SELECTED_VOTING"
  | "WAITING_FOR_VOTES"
  | "FINAL_VOTE"
  | "REROLL_REQUIRED";

type DevPreviewLocale = "th" | "en";

interface PreviewMember {
  id: string;
  name: string;
  avatarUrl: string | null;
  status: "voted" | "choosing" | "waiting";
}

const PREVIEW_MEMBERS: PreviewMember[] = [
  {
    id: "user-1",
    name: "You (Host)",
    avatarUrl: null,
    status: "voted",
  },
  {
    id: "user-2",
    name: "Alex",
    avatarUrl: null,
    status: "voted",
  },
  {
    id: "user-3",
    name: "Sam",
    avatarUrl: null,
    status: "choosing",
  },
];

const PREVIEW_RECOMMENDATION_ITEMS: RecommendationItem[] = [
  {
    id: "preview-item-1",
    menuName: "ไก่ย่างสมุนไพรข้าวเหนียว",
    description:
      "ไก่บ้านหมักสมุนไพรไทย ย่างเตาถ่านหนังกรอบเนื้อนุ่ม เสิร์ฟพร้อมข้าวเหนียวร้อนๆ และน้ำจิ้มแจ่วรสเด็ด",
    reason: "ตรงกับความชอบ 'ย่าง' และ 'ไก่' ของทุกคนในกลุ่ม ปลอดภัยไร้สารก่อภูมิแพ้",
    imageUrl: "/images/home/home-current-foodfight.webp",
    recommendationScore: 94,
    displayOrder: 1,
    metadata: {
      conceptId: "grilled-chicken-herb",
      name: "Grilled Herb Chicken with Sticky Rice",
      nameTh: "ไก่ย่างสมุนไพรข้าวเหนียว",
      cuisine: "Thai",
      cuisineTh: "อาหารไทย",
      cookingMethods: ["Grilled"],
      cookingMethodsTh: ["ย่างเตาถ่าน"],
      proteins: ["Chicken"],
      proteinsTh: ["ไก่"],
      tastes: ["Savory", "Herb", "Spicy"],
      tastesTh: ["กลมกล่อม", "หอมสมุนไพร"],
      satisfiedMembers: 3,
      memberCount: 3,
      satisfactionRatio: 1.0,
      safeCoverage: 1.0,
      compatibilityPercentage: 94,
      reasons: [
        "ตรงกับความชอบ 'ย่าง' และ 'ไก่' ของสมาชิกทุกคน",
        "ไม่มีส่วนผสมที่สมาชิกแพ้",
      ],
    },
  },
  {
    id: "preview-item-2",
    menuName: "ทงคัตสึราเมนซุปกระดูกหมูเข้มข้น",
    description:
      "ราเมนเส้นสดในน้ำซุปกระดูกหมูเคี่ยวนานกว่า 12 ชั่วโมง ท็อปปิ้งหมูชาชูชิ้นโตและไข่ต้มยางมะตูม",
    reason: "ตรงกับความชอบ 'อาหารญี่ปุ่น' และ 'ต้ม/ซุป' รสชาติเข้มข้นถูกใจกลุ่ม",
    imageUrl: "/images/home/home-current-foodfight.webp",
    recommendationScore: 88,
    displayOrder: 2,
    metadata: {
      conceptId: "tonkotsu-ramen",
      name: "Tonkotsu Pork Bone Ramen",
      nameTh: "ทงคัตสึราเมนซุปกระดูกหมูเข้มข้น",
      cuisine: "Japanese",
      cuisineTh: "อาหารญี่ปุ่น",
      cookingMethods: ["Boiled"],
      cookingMethodsTh: ["ต้ม/ซุป"],
      proteins: ["Pork"],
      proteinsTh: ["หมูชาชู"],
      tastes: ["Rich", "Umami"],
      tastesTh: ["เข้มข้น", "อูมามิ"],
      satisfiedMembers: 3,
      memberCount: 3,
      satisfactionRatio: 1.0,
      safeCoverage: 1.0,
      compatibilityPercentage: 88,
      reasons: [
        "ตรงกับความต้องการ 'อาหารญี่ปุ่น' และ 'ต้ม/ซุป'",
        "รสชาติเข้มข้นถูกใจกลุ่ม",
      ],
    },
  },
];

const PREVIEW_STATES_CONFIG: Array<{
  id: DevPreviewState;
  label: string;
  desc: string;
}> = [
  {
    id: "INITIAL_VOTING",
    label: "A. Initial Voting",
    desc: "Exercising Production VotingRoundScreen • Overlapping Two-Card Geometry • Unselected",
  },
  {
    id: "SELECTED_VOTING",
    label: "B. Selected Voting",
    desc: "Exercising Production VotingRoundScreen • Menu 1 = OK (Herb) • Menu 2 = PASS (Restrained Neutral) • Active Chili CTA",
  },
  {
    id: "WAITING_FOR_VOTES",
    label: "C. Waiting For Votes",
    desc: "Expressive Member Motion • Voted (Herb Glow) • Choosing (Saffron Pulse) • Smooth Progress",
  },
  {
    id: "FINAL_VOTE",
    label: "D. Final Vote",
    desc: "Exercising Production FinalVoteScreen • Opaque Tactile Info Cards • Warm Active Selection Glow",
  },
  {
    id: "REROLL_REQUIRED",
    label: "E. Reroll Required",
    desc: "Exercising Production Reroll State • Tactile Card • Host Restart Action",
  },
];

export default function RecommendationsDevPreviewPage() {
  if (!isDev) {
    notFound();
  }

  const [previewState, setPreviewState] =
    React.useState<DevPreviewState>("INITIAL_VOTING");
  const [locale, setLocale] = React.useState<DevPreviewLocale>("th");
  const [votes, setVotes] = React.useState<Record<string, VoteAction>>({});
  const [finalSelection, setFinalSelection] = React.useState<string | null>(
    "preview-item-1",
  );
  const [isTieBreak, setIsTieBreak] = React.useState(true);

  const isTh = locale === "th";

  // Handle switching dev states with default simulated values
  const handleSelectState = (stateId: DevPreviewState) => {
    setPreviewState(stateId);
    if (stateId === "INITIAL_VOTING") {
      setVotes({});
    } else if (stateId === "SELECTED_VOTING") {
      setVotes({
        "preview-item-1": "OK",
        "preview-item-2": "PASS",
      });
    }
  };

  const handleVoteChange = (itemId: string, action: VoteAction) => {
    setVotes((prev) => ({
      ...prev,
      [itemId]: action,
    }));
  };

  const handleLocalSubmitVotes = () => {
    setPreviewState("WAITING_FOR_VOTES");
  };

  return (
    <div className="relative min-h-dvh bg-background text-text-primary selection:bg-brand-primary selection:text-white">
      {/* ========================================================================= */}
      {/* 1. DEV PREVIEW CONTROL BAR (Technical Overlay, Clearly Distinct) */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-950 px-3 py-2.5 text-white shadow-lg">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          {/* Badge & Mode */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="rounded bg-amber-400 px-2 py-0.5 text-[10px] font-black tracking-wider uppercase text-black">
              DEV QA HARNESS
            </span>
            <span className="hidden font-bold text-slate-200 sm:inline">
              Production Recommendations Component Port
            </span>
          </div>

          {/* State Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {PREVIEW_STATES_CONFIG.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectState(option.id)}
                className={cn(
                  "rounded-lg px-2.5 py-1 text-xs font-bold transition-all",
                  previewState === option.id
                    ? "bg-brand-primary text-white shadow-xs"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Controls: Locale toggle */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLocale(isTh ? "en" : "th")}
              className="rounded-md border border-slate-700 bg-slate-800 px-2.5 py-0.5 text-[11px] font-bold text-slate-200 hover:bg-slate-700"
              title="Toggle Locale"
            >
              Lang: {locale.toUpperCase()}
            </button>
          </div>
        </div>

        {/* State description subtitle */}
        <div className="mx-auto mt-1.5 flex max-w-6xl items-center justify-between border-t border-slate-800/80 pt-1 text-[11px] text-slate-400">
          <div>
            <span className="font-semibold text-amber-300">Exercising: </span>
            {PREVIEW_STATES_CONFIG.find((s) => s.id === previewState)?.desc}
          </div>
          <span className="hidden font-mono text-[10px] text-slate-500 md:inline">
            Zero API Calls • Production Visual Port QA
          </span>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. ATMOSPHERIC HERO & SINGLE CLEAN HEADER (White on Atmosphere) */}
      {/* ========================================================================= */}
      <div className="relative min-h-[calc(100dvh-5rem)]">
        {/* Warm Atmosphere Hero Background Layer */}
        <AtmosphereBackground variant="hero" height="hero" className="-top-0" />

        <div className="relative z-10 mx-auto w-full max-w-md px-3.5 pb-28 pt-4 sm:px-6 sm:pb-32 sm:pt-6 md:max-w-3xl lg:max-w-4xl">
          {/* Singular Hero Header with High-Contrast White Text */}
          <div className="mb-5 text-center sm:mb-7">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-0.5 text-xs font-bold text-white shadow-2xs backdrop-blur-md">
              <Sparkles className="size-3.5" aria-hidden="true" />
              <span>
                {previewState === "FINAL_VOTE"
                  ? isTh
                    ? "รอบตัดสินสุดท้าย"
                    : "Final Decision"
                  : previewState === "REROLL_REQUIRED"
                    ? isTh
                      ? "สรุปผลการโหวต"
                      : "Voting Summary"
                    : isTh
                      ? "แนะนำเมนูสำหรับกลุ่ม"
                      : "Group Recommendations"}
              </span>
            </span>

            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white drop-shadow-sm sm:text-3xl md:text-4xl">
              {previewState === "FINAL_VOTE"
                ? isTh
                  ? "เลือกเมนูสุดท้าย"
                  : "Choose Final Menu"
                : previewState === "REROLL_REQUIRED"
                  ? isTh
                    ? "ยังไม่มีเมนูที่ได้ข้อสรุป"
                    : "No Consensus Reached"
                  : isTh
                    ? "เมนูที่แนะนำ"
                    : "Recommended Menus"}
            </h1>

            <p className="mx-auto mt-1 max-w-sm text-xs font-medium leading-relaxed text-white/85 sm:text-sm md:max-w-md">
              {previewState === "FINAL_VOTE"
                ? isTh
                  ? "คะแนนเท่ากัน — สมาชิกทุกคนร่วมเลือกเมนูที่ชอบที่สุดเพียง 1 เมนู"
                  : "Tie-break — choose your single favorite dish to finalize"
                : previewState === "REROLL_REQUIRED"
                  ? isTh
                    ? "ทั้งสองเมนูยังไม่ได้รับคะแนนเห็นพ้องตามเกณฑ์ Host สามารถเริ่มรอบใหม่ได้"
                    : "The group did not reach consensus. Host can start a fresh recommendation round"
                  : isTh
                    ? "เลือก OK หรือ PASS สำหรับแต่ละเมนู แล้วกดยืนยันการโหวต"
                    : "Decide OK or PASS for each dish, then confirm your votes"}
            </p>
          </div>

          {/* ========================================================================= */}
          {/* 3. SOLID TACTILE CONTENT CANVAS (Exercising Production Components) */}
          {/* ========================================================================= */}

          {/* ------------------------------------------------------------------------- */}
          {/* STATE A & B: INITIAL VOTING & SELECTED VOTING (Production VotingRoundScreen) */}
          {/* ------------------------------------------------------------------------- */}
          {(previewState === "INITIAL_VOTING" ||
            previewState === "SELECTED_VOTING") && (
            <VotingRoundScreen
              roundNumber={1}
              items={PREVIEW_RECOMMENDATION_ITEMS}
              votes={votes}
              isVoting={false}
              onVote={handleVoteChange}
              onSubmitVotes={handleLocalSubmitVotes}
            />
          )}

          {/* ------------------------------------------------------------------------- */}
          {/* STATE C: WAITING FOR VOTES (Social Context & Presence) */}
          {/* ------------------------------------------------------------------------- */}
          {previewState === "WAITING_FOR_VOTES" && (
            <div className="mx-auto max-w-lg">
              <Card
                variant="outline"
                className="rounded-3xl border-2 border-border/90 bg-surface p-6 shadow-md sm:p-8 space-y-6"
              >
                {/* Header Icon & Status */}
                <div className="text-center space-y-2">
                  <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-brand-primary/20 bg-brand-primary/10 text-brand-primary shadow-2xs">
                    <Clock3 className="size-8 stroke-[2]" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
                    {isTh
                      ? "รอผลโหวตจากสมาชิกในกลุ่ม"
                      : "Waiting for Group Votes"}
                  </h2>
                  <p className="mx-auto max-w-sm text-xs leading-relaxed text-text-secondary sm:text-sm">
                    {isTh
                      ? "คุณส่งผลโหวตเรียบร้อยแล้ว กำลังรอเพื่อนๆ ในห้องร่วมโหวตให้ครบ"
                      : "You have submitted your votes. Waiting for group members to finish voting"}
                  </p>
                </div>

                {/* Progress Box with Smooth Width Transition */}
                <div className="rounded-2xl border-2 border-border-subtle bg-surface-subtle/80 p-4 sm:p-5 space-y-3.5 shadow-2xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-text-secondary">
                      {isTh ? "ความคืบหน้าการโหวต" : "Voting Progress"}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs font-extrabold text-text-primary shadow-2xs">
                      2 / 3 {isTh ? "คน" : "voted"}
                    </span>
                  </div>

                  {/* Progress Bar with Smooth Transition */}
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-muted shadow-inner">
                    <div
                      className="h-full rounded-full bg-brand-primary transition-all duration-700 ease-out motion-reduce:transition-none"
                      style={{ width: "66.6%" }}
                    />
                  </div>

                  {/* Social Member Avatar Presence with Expressive Motion & Glow */}
                  <div className="pt-2.5 border-t border-border/60">
                    <p className="text-xs font-extrabold text-text-secondary mb-2.5 flex items-center justify-between">
                      <span>{isTh ? "สถานะของสมาชิก" : "Member Status"}</span>
                      <span className="text-[11px] font-normal text-text-muted">
                        {isTh ? "กำลังอัปเดตสด" : "Live updating"}
                      </span>
                    </p>

                    <div className="space-y-2">
                      {PREVIEW_MEMBERS.map((member) => {
                        const isVoted = member.status === "voted";
                        const isChoosing = member.status === "choosing";

                        return (
                          <div
                            key={member.id}
                            className={cn(
                              "flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs transition-all duration-300 border-2",
                              // Voted: Soft Herb tint, completed glow
                              isVoted &&
                                "bg-accent-fresh/10 border-accent-fresh/35 shadow-[0_0_12px_rgba(34,197,94,0.12)]",
                              // Choosing: Saffron tint, active breathing glow & pulse
                              isChoosing &&
                                "bg-amber-500/10 border-amber-500/40 shadow-[0_0_16px_rgba(245,158,11,0.2)] animate-[pulse_2.5s_cubic-bezier(0.4,0,0.6,1)_infinite] motion-reduce:animate-none",
                              // Waiting fallback
                              !isVoted &&
                                !isChoosing &&
                                "bg-surface border-border/80 text-text-secondary",
                            )}
                          >
                            {/* Member Info */}
                            <div className="flex items-center gap-2.5">
                              <div
                                className={cn(
                                  "size-7 rounded-full flex items-center justify-center font-bold text-[11px] transition-all",
                                  isVoted &&
                                    "bg-accent-fresh/20 text-accent-fresh ring-2 ring-accent-fresh/70",
                                  isChoosing &&
                                    "bg-amber-500/20 text-amber-700 ring-2 ring-amber-500/80 animate-pulse motion-reduce:animate-none",
                                  !isVoted &&
                                    !isChoosing &&
                                    "bg-surface-subtle text-text-secondary border border-border",
                                )}
                              >
                                {member.name.charAt(0)}
                              </div>
                              <span className="font-bold text-text-primary">
                                {member.name}
                              </span>
                            </div>

                            {/* Expressive Status Badge */}
                            {isVoted && (
                              <span className="inline-flex items-center gap-1.5 text-xs font-black text-accent-fresh">
                                <span className="flex size-4 items-center justify-center rounded-full bg-accent-fresh text-white shadow-2xs">
                                  <Check className="size-2.5 stroke-[3.5]" />
                                </span>
                                <span>{isTh ? "โหวตแล้ว" : "Voted"}</span>
                              </span>
                            )}

                            {isChoosing && (
                              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-700">
                                <span className="flex items-center gap-0.5">
                                  <span
                                    className="size-1.5 rounded-full bg-amber-600 animate-bounce motion-reduce:animate-none"
                                    style={{ animationDelay: "0ms" }}
                                  />
                                  <span
                                    className="size-1.5 rounded-full bg-amber-600 animate-bounce motion-reduce:animate-none"
                                    style={{ animationDelay: "180ms" }}
                                  />
                                  <span
                                    className="size-1.5 rounded-full bg-amber-600 animate-bounce motion-reduce:animate-none"
                                    style={{ animationDelay: "360ms" }}
                                  />
                                </span>
                                <span>{isTh ? "กำลังเลือก..." : "Choosing..."}</span>
                              </span>
                            )}

                            {!isVoted && !isChoosing && (
                              <span className="text-[11px] font-medium text-text-muted">
                                {isTh ? "รอเลือก" : "Waiting"}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Helpful Notification Note */}
                <div className="flex items-start gap-2.5 rounded-xl bg-surface-subtle/70 p-3 border border-border-subtle text-xs text-text-secondary">
                  <Info className="size-4 text-brand-primary shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {isTh
                      ? "ระบบจะประมวลผลและเปลี่ยนหน้าโดยอัตโนมัติเมื่อสมาชิกทุกคนส่งผลโหวตครบ"
                      : "The screen will advance automatically once everyone in the room has voted."}
                  </p>
                </div>

                {/* Reset preview CTA */}
                <Button
                  variant="outline"
                  className="w-full text-xs font-semibold"
                  onClick={() => handleSelectState("INITIAL_VOTING")}
                >
                  {isTh
                    ? "ย้อนกลับไปหน้าโหวต (Preview Reset)"
                    : "Back to Voting (Preview Reset)"}
                </Button>
              </Card>
            </div>
          )}

          {/* ------------------------------------------------------------------------- */}
          {/* STATE D: FINAL VOTE (Production FinalVoteScreen) */}
          {/* ------------------------------------------------------------------------- */}
          {previewState === "FINAL_VOTE" && (
            <div className="space-y-4 sm:space-y-6">
              {/* Tie-break toggle for dev inspection */}
              <div className="mx-auto flex max-w-md items-center justify-between rounded-2xl border-2 border-border/80 bg-surface px-4 py-2 text-xs shadow-xs">
                <span className="font-extrabold text-text-secondary">
                  {isTh ? "โหมดการตัดสิน:" : "Decision Mode:"}
                </span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => setIsTieBreak(true)}
                    className={cn(
                      "rounded-lg px-2.5 py-1 text-xs font-bold transition",
                      isTieBreak
                        ? "bg-brand-primary text-white shadow-2xs"
                        : "bg-surface-subtle text-text-secondary hover:bg-surface-muted",
                    )}
                  >
                    {isTh ? "คะแนนเท่ากัน (Tie-Break)" : "Tie-Break"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsTieBreak(false)}
                    className={cn(
                      "rounded-lg px-2.5 py-1 text-xs font-bold transition",
                      !isTieBreak
                        ? "bg-brand-primary text-white shadow-2xs"
                        : "bg-surface-subtle text-text-secondary hover:bg-surface-muted",
                    )}
                  >
                    {isTh ? "รอบ 4 เมนูชิงดำ" : "4-Menu Final"}
                  </button>
                </div>
              </div>

              {/* Production FinalVoteScreen component */}
              <FinalVoteScreen
                candidates={PREVIEW_RECOMMENDATION_ITEMS}
                selection={finalSelection}
                onSelect={setFinalSelection}
                onSubmit={() => {
                  alert("Dev QA Harness: Final choice selected!");
                }}
                isSubmitting={false}
                finalVoteType={isTieBreak ? "TIE_BREAK" : "FOUR_MENU_FINAL"}
                hostTieBreak={isTieBreak}
                voteCounts={{
                  "preview-item-1": 2,
                  "preview-item-2": 2,
                }}
              />
            </div>
          )}

          {/* ------------------------------------------------------------------------- */}
          {/* STATE E: REROLL REQUIRED (Production Reroll Visual Port) */}
          {/* ------------------------------------------------------------------------- */}
          {previewState === "REROLL_REQUIRED" && (
            <div className="mx-auto max-w-lg">
              <Card
                variant="outline"
                className="rounded-3xl border-2 border-border/90 bg-surface p-6 shadow-md sm:p-8 text-center space-y-6"
              >
                {/* Hero Status Badge */}
                <div className="mx-auto flex size-16 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-600 shadow-2xs">
                  <RotateCcw className="size-8 stroke-[2]" aria-hidden="true" />
                </div>

                <div className="space-y-1.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-0.5 text-xs font-bold text-amber-700">
                    {isTh ? "จบรอบการโหวต" : "Round Completed"}
                  </span>
                  <h2 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
                    {isTh
                      ? "ยังไม่มีเมนูที่ได้ข้อสรุป"
                      : "No Consensus Reached"}
                  </h2>
                  <p className="mx-auto max-w-sm text-xs leading-relaxed text-text-secondary sm:text-sm">
                    {isTh
                      ? "เมนูในรอบก่อนหน้ายังไม่ได้รับคะแนนเห็นพ้องตามเกณฑ์ คุณสามารถเริ่มค้นหาเมนูชุดใหม่ได้ทันที"
                      : "The previous menu recommendations did not reach consensus. You can generate a fresh pair of recommendations."}
                  </p>
                </div>

                {/* Status Insight Card */}
                <div className="rounded-2xl border border-border-subtle bg-surface-subtle/70 p-4 text-left text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold text-text-primary">
                    <span>{isTh ? "สรุปผลรอบที่ 1" : "Round 1 Summary"}</span>
                    <span className="text-text-muted">2 {isTh ? "เมนู" : "menus"}</span>
                  </div>
                  <p className="text-text-secondary leading-relaxed">
                    {isTh
                      ? "สมาชิกบางท่านเลือก PASS สำหรับทั้ง 2 เมนู ระบบจึงเตรียมค้นหาเมนูทางเลือกใหม่ที่ตรงใจกลุ่มยิ่งขึ้น"
                      : "Some members passed on both options. The system is ready to find new culinary alternatives."}
                  </p>
                </div>

                {/* Host Reroll Action */}
                <div className="space-y-2 pt-2">
                  <Button
                    size="lg"
                    className="w-full h-12 rounded-2xl bg-brand-primary hover:bg-brand-primary-hover text-white font-extrabold text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
                    onClick={() => handleSelectState("INITIAL_VOTING")}
                  >
                    <span>
                      {isTh
                        ? "แนะนำเมนูรอบใหม่ (Reroll)"
                        : "Find New Menus (Reroll)"}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
