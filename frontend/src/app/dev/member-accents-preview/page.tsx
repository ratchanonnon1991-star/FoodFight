"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock,
  Eye,
  Flame,
  QrCode,
  ShieldAlert,
  Sparkles,
  Users,
} from "lucide-react";
import { AtmosphereBackground } from "@/components/ui/AtmosphereBackground";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  MEMBER_IDENTITY_PALETTE_15,
  getMemberAccent,
  resolveRoomMemberAccents,
  type MemberIdentityAccent,
} from "@/lib/member-identity/member-identity";
import { cn } from "@/lib/utils/cn";

// Development Guard
const isDev = process.env.NODE_ENV !== "production";

// 15 Mock Room Members for Showcase
const MOCK_15_MEMBERS = [
  { userId: "u01", name: "Poh (Host)", role: "HOST", photo: "/home/foodie_thai_mascot.png", joinedAt: "2026-08-29T10:00:00.000Z" },
  { userId: "u02", name: "May", role: "MEMBER", photo: null, joinedAt: "2026-08-29T10:01:00.000Z" },
  { userId: "u03", name: "Golf", role: "MEMBER", photo: null, joinedAt: "2026-08-29T10:02:00.000Z" },
  { userId: "u04", name: "Earn", role: "MEMBER", photo: null, joinedAt: "2026-08-29T10:03:00.000Z" },
  { userId: "u05", name: "Bank", role: "MEMBER", photo: null, joinedAt: "2026-08-29T10:04:00.000Z" },
  { userId: "u06", name: "Tang", role: "MEMBER", photo: null, joinedAt: "2026-08-29T10:05:00.000Z" },
  { userId: "u07", name: "Nut", role: "MEMBER", photo: null, joinedAt: "2026-08-29T10:06:00.000Z" },
  { userId: "u08", name: "Fah", role: "MEMBER", photo: null, joinedAt: "2026-08-29T10:07:00.000Z" },
  { userId: "u09", name: "Krit", role: "MEMBER", photo: null, joinedAt: "2026-08-29T10:08:00.000Z" },
  { userId: "u10", name: "Aom", role: "MEMBER", photo: null, joinedAt: "2026-08-29T10:09:00.000Z" },
  { userId: "u11", name: "Top", role: "MEMBER", photo: null, joinedAt: "2026-08-29T10:10:00.000Z" },
  { userId: "u12", name: "View", role: "MEMBER", photo: null, joinedAt: "2026-08-29T10:11:00.000Z" },
  { userId: "u13", name: "Beam", role: "MEMBER", photo: null, joinedAt: "2026-08-29T10:12:00.000Z" },
  { userId: "u14", name: "Oat", role: "MEMBER", photo: null, joinedAt: "2026-08-29T10:13:00.000Z" },
  { userId: "u15", name: "Jane", role: "MEMBER", photo: null, joinedAt: "2026-08-29T10:14:00.000Z" },
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

/**
 * Showcase Avatar with Identity Ring & Initials
 */
function IdentityAvatar({
  name,
  photo,
  accent,
  size = "md",
}: {
  name: string;
  photo?: string | null;
  accent: MemberIdentityAccent;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "size-8 text-xs ring-2",
    md: "size-10 text-sm ring-2",
    lg: "size-14 text-base ring-[3px]",
  }[size];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center shrink-0 rounded-full font-bold select-none overflow-hidden transition-all shadow-2xs",
        sizeClasses,
        accent.ringClass,
        photo ? "bg-white" : accent.initialsBgClass,
      )}
      title={`${name} (${accent.nameEn})`}
    >
      {photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo} alt={name} className="size-full object-cover" />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}

export default function MemberAccentsPreviewPage() {
  if (!isDev) {
    notFound();
  }

  const [activeTab, setActiveTab] = React.useState<
    | "ALL_15"
    | "AVATARS"
    | "HOME_STACK"
    | "LOBBY"
    | "SPLIT"
    | "SUMMARY"
    | "PAYMENT"
    | "STRESS_TEST"
  >("ALL_15");

  // Resolve 15 accents
  const accentsMap = React.useMemo(
    () => resolveRoomMemberAccents(MOCK_15_MEMBERS),
    [],
  );

  return (
    <div className="relative min-h-dvh bg-[#FDFBF7] text-[#211D19] selection:bg-brand-primary selection:text-white">
      {/* ========================================================================= */}
      {/* 1. DEV QA CONTROL BAR                                                     */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-950 px-3 py-2.5 text-white shadow-lg">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="rounded bg-amber-400 px-2 py-0.5 text-[10px] font-black tracking-wider uppercase text-black">
              DEV QA
            </span>
            <span className="text-xs font-bold text-slate-200">
              Member Identity Accent Showcase (Pure White #FFFFFF Cards + 4px Accent Rails)
            </span>
          </div>

          {/* Section Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1">
            {[
              { id: "ALL_15", label: "1. All 15 Colors" },
              { id: "AVATARS", label: "2. Avatar Types" },
              { id: "HOME_STACK", label: "3. Home Stack" },
              { id: "LOBBY", label: "4. Lobby Cards" },
              { id: "SPLIT", label: "5. Split Chips" },
              { id: "SUMMARY", label: "6. Summary Rows" },
              { id: "PAYMENT", label: "7. Payment Rows" },
              { id: "STRESS_TEST", label: "8. Status Stress Test" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-bold transition-all cursor-pointer",
                  activeTab === tab.id
                    ? "bg-brand-primary text-white shadow-xs"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. ATMOSPHERIC HERO & SHOWCASE CONTAINER                                  */}
      {/* ========================================================================= */}
      <div className="relative min-h-[calc(100dvh-4.5rem)] flex flex-col">
        <AtmosphereBackground variant="hero" height="hero" className="-top-0" />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-3.5 pb-24 pt-4 sm:px-6 sm:pb-28 sm:pt-6">
          {/* Header Title */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              FoodFighter Member Identity Accent System
            </h1>
            <p className="mx-auto mt-1 max-w-lg text-xs sm:text-sm font-medium text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
              Pure White (#FFFFFF) cards with 4px solid left rails, avatar rings, and dark Ink (#211D19) text.
            </p>
          </div>

          {/* ===================================================================== */}
          {/* SECTION 1: ALL 15 ACCENTS AT ONCE                                     */}
          {/* ===================================================================== */}
          {activeTab === "ALL_15" && (
            <div className="space-y-4">
              <div className="rounded-2xl border-2 border-[#E8E2D9] bg-white p-4 shadow-sm flex items-center justify-between gap-3 text-[#211D19]">
                <div>
                  <h2 className="text-sm sm:text-base font-extrabold text-[#211D19]">
                    15 Standard Recognizable Colors (Pure White #FFFFFF Cards)
                  </h2>
                  <p className="text-xs text-[#665E55] font-medium mt-0.5">
                    Cards are 100% pure white (#FFFFFF) with a 4px solid colored left rail, avatar ring, and bold Ink text/money.
                  </p>
                </div>
                <span className="rounded-full bg-brand-primary/10 border border-brand-primary/30 px-2.5 py-1 text-xs font-black text-brand-primary shrink-0">
                  15 Colors
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {MOCK_15_MEMBERS.map((m, idx) => {
                  const accent = accentsMap.get(m.userId) ?? MEMBER_IDENTITY_PALETTE_15[0];

                  return (
                    <div
                      key={m.userId}
                      className="relative rounded-2xl border-2 border-[#E8E2D9] bg-white p-3.5 shadow-sm transition-all overflow-hidden flex items-center justify-between gap-3 text-[#211D19]"
                    >
                      {/* 4px Left Identity Rail */}
                      <div
                        className={cn("absolute left-0 top-0 bottom-0 w-[4px]", accent.railClass)}
                      />

                      <div className="flex items-center gap-3 min-w-0 pl-1.5">
                        <IdentityAvatar
                          name={m.name}
                          photo={m.photo}
                          accent={accent}
                          size="md"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-extrabold text-[#211D19] truncate">
                              {m.name}
                            </p>
                            <span className="text-[10px] font-bold text-[#665E55]">
                              #{idx + 1}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span
                              className="size-2.5 rounded-full shrink-0 shadow-2xs"
                              style={{ backgroundColor: accent.baseHex }}
                            />
                            <p className="text-[11px] font-semibold text-[#665E55]">
                              {accent.nameTh} ({accent.nameEn})
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[10px] font-bold text-[#665E55] block">
                          ยอดประมาณการ
                        </span>
                        <span className="text-sm font-black text-[#211D19]">
                          ฿{(300 + idx * 25).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SECTION 2: AVATAR TYPES DEMO                                          */}
          {/* ===================================================================== */}
          {activeTab === "AVATARS" && (
            <div className="rounded-3xl border-2 border-[#E8E2D9] bg-white p-5 shadow-md space-y-6 text-[#211D19]">
              <div>
                <h2 className="text-base font-extrabold text-[#211D19]">
                  Avatar Integration: Photo vs Initials Fallback
                </h2>
                <p className="text-xs text-[#665E55] mt-1">
                  Photo avatars receive a clear outer identity ring. Initials receive a soft matching background + ring with dark readable text.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Photo Examples */}
                <div className="space-y-3 rounded-2xl border border-[#E8E2D9] p-4 bg-[#FAF8F5]">
                  <span className="text-xs font-bold text-brand-primary uppercase tracking-wider block">
                    A. Photo Avatar with Identity Rings (Red / Slot 1)
                  </span>
                  <div className="flex items-center gap-4">
                    <IdentityAvatar
                      name="Poh (Host)"
                      photo="/home/foodie_thai_mascot.png"
                      accent={MEMBER_IDENTITY_PALETTE_15[0]}
                      size="sm"
                    />
                    <IdentityAvatar
                      name="Poh (Host)"
                      photo="/home/foodie_thai_mascot.png"
                      accent={MEMBER_IDENTITY_PALETTE_15[0]}
                      size="md"
                    />
                    <IdentityAvatar
                      name="Poh (Host)"
                      photo="/home/foodie_thai_mascot.png"
                      accent={MEMBER_IDENTITY_PALETTE_15[0]}
                      size="lg"
                    />
                  </div>
                  <p className="text-xs text-[#665E55] font-medium">
                    Photograph is never tinted or colorized. The identity ring clearly frames the member.
                  </p>
                </div>

                {/* Initials Examples */}
                <div className="space-y-3 rounded-2xl border border-[#E8E2D9] p-4 bg-[#FAF8F5]">
                  <span className="text-xs font-bold text-brand-primary uppercase tracking-wider block">
                    B. Initials Avatar with Soft Tint (Green / Slot 2)
                  </span>
                  <div className="flex items-center gap-4">
                    <IdentityAvatar
                      name="May"
                      photo={null}
                      accent={MEMBER_IDENTITY_PALETTE_15[1]}
                      size="sm"
                    />
                    <IdentityAvatar
                      name="May"
                      photo={null}
                      accent={MEMBER_IDENTITY_PALETTE_15[1]}
                      size="md"
                    />
                    <IdentityAvatar
                      name="May"
                      photo={null}
                      accent={MEMBER_IDENTITY_PALETTE_15[1]}
                      size="lg"
                    />
                  </div>
                  <p className="text-xs text-[#665E55] font-medium">
                    Soft background container with dark readable initials text (WCAG AA).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SECTION 3: HOME AVATAR STACK                                          */}
          {/* ===================================================================== */}
          {activeTab === "HOME_STACK" && (
            <div className="rounded-3xl border-2 border-[#E8E2D9] bg-white p-5 shadow-md space-y-6 text-[#211D19]">
              <div>
                <h2 className="text-base font-extrabold text-[#211D19]">
                  Home Current FoodFight Avatar Stack (Scaling Test)
                </h2>
                <p className="text-xs text-[#665E55] mt-1">
                  Avatar stack uses identity rings for each participant and clean neutral +N overflow for large groups.
                </p>
              </div>

              <div className="space-y-5">
                {/* 2 Members */}
                <div className="rounded-2xl border border-[#E8E2D9] p-4 bg-[#FAF8F5] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#211D19]">2 Members Room (Small)</span>
                    <p className="text-[11px] text-[#665E55]">Both avatars fully visible with identity rings (Red + Green)</p>
                  </div>
                  <div className="flex items-center -space-x-2">
                    {MOCK_15_MEMBERS.slice(0, 2).map((m) => (
                      <IdentityAvatar
                        key={m.userId}
                        name={m.name}
                        photo={m.photo}
                        accent={accentsMap.get(m.userId)!}
                        size="md"
                      />
                    ))}
                  </div>
                </div>

                {/* 6 Members */}
                <div className="rounded-2xl border border-[#E8E2D9] p-4 bg-[#FAF8F5] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#211D19]">6 Members Room (Medium)</span>
                    <p className="text-[11px] text-[#665E55]">4 visible avatars + neutral &quot;+2&quot; overflow counter</p>
                  </div>
                  <div className="flex items-center -space-x-2">
                    {MOCK_15_MEMBERS.slice(0, 4).map((m) => (
                      <IdentityAvatar
                        key={m.userId}
                        name={m.name}
                        photo={m.photo}
                        accent={accentsMap.get(m.userId)!}
                        size="md"
                      />
                    ))}
                    <div className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-xs font-black text-[#211D19] shadow-xs">
                      +2
                    </div>
                  </div>
                </div>

                {/* 15 Members */}
                <div className="rounded-2xl border border-[#E8E2D9] p-4 bg-[#FAF8F5] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#211D19]">15 Members Room (Max Capacity)</span>
                    <p className="text-[11px] text-[#665E55]">5 visible avatars + neutral &quot;+10&quot; overflow counter</p>
                  </div>
                  <div className="flex items-center -space-x-2">
                    {MOCK_15_MEMBERS.slice(0, 5).map((m) => (
                      <IdentityAvatar
                        key={m.userId}
                        name={m.name}
                        photo={m.photo}
                        accent={accentsMap.get(m.userId)!}
                        size="md"
                      />
                    ))}
                    <div className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-xs font-black text-[#211D19] shadow-xs">
                      +10
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SECTION 4: LOBBY MEMBER CARDS                                         */}
          {/* ===================================================================== */}
          {activeTab === "LOBBY" && (
            <div className="rounded-3xl border-2 border-[#E8E2D9] bg-white p-5 shadow-md space-y-4 text-[#211D19]">
              <div>
                <h2 className="text-base font-extrabold text-[#211D19]">
                  Lobby Member Cards: 4px Identity Rail + Status Coexistence
                </h2>
                <p className="text-xs text-[#665E55] mt-1">
                  Pure White (#FFFFFF) member cards with 4px left rail and avatar ring. Status badges (Host, Ready, Waiting) remain untouched.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Host (Red / Slot 1) - Ready */}
                {(() => {
                  const m = MOCK_15_MEMBERS[0];
                  const accent = accentsMap.get(m.userId)!;
                  return (
                    <div className="relative rounded-2xl border-2 border-[#E8E2D9] bg-white p-4 shadow-sm flex items-center justify-between overflow-hidden text-[#211D19]">
                      <div className={cn("absolute left-0 top-0 bottom-0 w-[4px]", accent.railClass)} />
                      <div className="flex items-center gap-3 pl-1">
                        <IdentityAvatar name={m.name} photo={m.photo} accent={accent} size="md" />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-extrabold text-[#211D19]">Poh</p>
                            <span className="rounded bg-brand-primary px-1.5 py-0.2 text-[10px] font-black uppercase text-white">
                              Host
                            </span>
                          </div>
                          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                            <Check className="size-3.5 stroke-[3]" /> พร้อมแล้ว
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Member 2 (Green / Slot 2) - Ready */}
                {(() => {
                  const m = MOCK_15_MEMBERS[1];
                  const accent = accentsMap.get(m.userId)!;
                  return (
                    <div className="relative rounded-2xl border-2 border-[#E8E2D9] bg-white p-4 shadow-sm flex items-center justify-between overflow-hidden text-[#211D19]">
                      <div className={cn("absolute left-0 top-0 bottom-0 w-[4px]", accent.railClass)} />
                      <div className="flex items-center gap-3 pl-1">
                        <IdentityAvatar name={m.name} photo={null} accent={accent} size="md" />
                        <div>
                          <p className="text-sm font-extrabold text-[#211D19]">May</p>
                          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                            <Check className="size-3.5 stroke-[3]" /> พร้อมแล้ว
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Member 3 (Orange / Slot 3) - Waiting */}
                {(() => {
                  const m = MOCK_15_MEMBERS[2];
                  const accent = accentsMap.get(m.userId)!;
                  return (
                    <div className="relative rounded-2xl border-2 border-[#E8E2D9] bg-white p-4 shadow-sm flex items-center justify-between overflow-hidden text-[#211D19]">
                      <div className={cn("absolute left-0 top-0 bottom-0 w-[4px]", accent.railClass)} />
                      <div className="flex items-center gap-3 pl-1">
                        <IdentityAvatar name={m.name} photo={null} accent={accent} size="md" />
                        <div>
                          <p className="text-sm font-extrabold text-[#211D19]">Golf</p>
                          <span className="text-xs font-bold text-amber-700 flex items-center gap-1 mt-0.5">
                            <Clock className="size-3.5" /> กำลังเลือก
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* Member 4 (Pink / Slot 4) - Waiting */}
                {(() => {
                  const m = MOCK_15_MEMBERS[3];
                  const accent = accentsMap.get(m.userId)!;
                  return (
                    <div className="relative rounded-2xl border-2 border-[#E8E2D9] bg-white p-4 shadow-sm flex items-center justify-between overflow-hidden text-[#211D19]">
                      <div className={cn("absolute left-0 top-0 bottom-0 w-[4px]", accent.railClass)} />
                      <div className="flex items-center gap-3 pl-1">
                        <IdentityAvatar name={m.name} photo={null} accent={accent} size="md" />
                        <div>
                          <p className="text-sm font-extrabold text-[#211D19]">Earn</p>
                          <span className="text-xs font-bold text-amber-700 flex items-center gap-1 mt-0.5">
                            <Clock className="size-3.5" /> กำลังเลือก
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SECTION 5: SPLIT CHIPS                                                */}
          {/* ===================================================================== */}
          {activeTab === "SPLIT" && (
            <div className="rounded-3xl border-2 border-[#E8E2D9] bg-white p-5 shadow-md space-y-4 text-[#211D19]">
              <div>
                <h2 className="text-base font-extrabold text-[#211D19]">
                  Split Step: Selected Assignment vs Identity Ring
                </h2>
                <p className="text-xs text-[#665E55] mt-1">
                  When selected, the active Herb green styling takes priority. When unselected, the member identity ring remains visible on a pure white surface.
                </p>
              </div>

              <div className="p-4 rounded-2xl border-2 border-[#E8E2D9] bg-[#FAF8F5] space-y-3">
                <div className="flex justify-between items-center border-b border-[#E8E2D9] pb-2">
                  <span className="text-sm font-bold text-[#211D19]">ไก่ย่างสมุนไพรเตาถ่าน (2x)</span>
                  <span className="text-sm font-black text-[#211D19]">฿480.00</span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-xs font-bold text-[#665E55]">แบ่งให้:</span>
                  <div className="flex flex-wrap gap-2">
                    {/* Member 1: Selected (Herb active state) */}
                    <button
                      type="button"
                      className="h-11 min-h-[44px] px-3.5 rounded-2xl border-2 border-emerald-500 bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-xs"
                    >
                      <IdentityAvatar
                        name="Poh"
                        photo="/home/foodie_thai_mascot.png"
                        accent={MEMBER_IDENTITY_PALETTE_15[0]}
                        size="sm"
                      />
                      <span>Poh</span>
                      <Check className="size-3.5 stroke-[3] text-white" />
                    </button>

                    {/* Member 2: Selected */}
                    <button
                      type="button"
                      className="h-11 min-h-[44px] px-3.5 rounded-2xl border-2 border-emerald-500 bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-xs"
                    >
                      <IdentityAvatar
                        name="May"
                        photo={null}
                        accent={MEMBER_IDENTITY_PALETTE_15[1]}
                        size="sm"
                      />
                      <span>May</span>
                      <Check className="size-3.5 stroke-[3] text-white" />
                    </button>

                    {/* Member 3: Unselected (Shows Identity Ring on pure white surface) */}
                    <button
                      type="button"
                      className="h-11 min-h-[44px] px-3.5 rounded-2xl border-2 border-[#E8E2D9] bg-white text-[#211D19] text-xs font-bold flex items-center gap-2 shadow-2xs"
                    >
                      <IdentityAvatar
                        name="Golf"
                        photo={null}
                        accent={MEMBER_IDENTITY_PALETTE_15[2]}
                        size="sm"
                      />
                      <span>Golf</span>
                    </button>

                    {/* Member 4: Unselected */}
                    <button
                      type="button"
                      className="h-11 min-h-[44px] px-3.5 rounded-2xl border-2 border-[#E8E2D9] bg-white text-[#211D19] text-xs font-bold flex items-center gap-2 shadow-2xs"
                    >
                      <IdentityAvatar
                        name="Earn"
                        photo={null}
                        accent={MEMBER_IDENTITY_PALETTE_15[3]}
                        size="sm"
                      />
                      <span>Earn</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SECTION 6: SUMMARY MEMBER ROWS                                        */}
          {/* ===================================================================== */}
          {activeTab === "SUMMARY" && (
            <div className="rounded-3xl border-2 border-[#E8E2D9] bg-white p-5 shadow-md space-y-4 text-[#211D19]">
              <div>
                <h2 className="text-base font-extrabold text-[#211D19]">
                  Summary Member Rows: Pure White (#FFFFFF) Cards + 4px Accent Rails
                </h2>
                <p className="text-xs text-[#665E55] mt-1">
                  Each member row is a pure white card with a 4px colored left rail and avatar ring. Content and financial amounts remain dark Ink (#211D19).
                </p>
              </div>

              <div className="space-y-2.5">
                {MOCK_15_MEMBERS.slice(0, 4).map((m, idx) => {
                  const accent = accentsMap.get(m.userId)!;

                  return (
                    <div
                      key={m.userId}
                      className="relative rounded-2xl border-2 border-[#E8E2D9] bg-white p-3.5 sm:p-4 flex items-center justify-between gap-3 shadow-sm overflow-hidden text-[#211D19]"
                    >
                      {/* 4px Left Rail */}
                      <div className={cn("absolute left-0 top-0 bottom-0 w-[4px]", accent.railClass)} />

                      <div className="flex items-center gap-3 min-w-0 pl-1.5">
                        <IdentityAvatar
                          name={m.name}
                          photo={m.photo}
                          accent={accent}
                          size="md"
                        />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="text-sm font-extrabold text-[#211D19]">{m.name}</p>
                            {m.role === "HOST" && (
                              <span className="rounded bg-brand-primary/10 px-1.5 py-0.2 text-[10px] font-black uppercase text-brand-primary">
                                Host
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#665E55] font-medium mt-0.5">
                            ค่าอาหาร: <span className="font-bold text-[#211D19]">฿{(320 + idx * 50).toFixed(2)}</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-[11px] font-bold text-[#665E55] block">
                          ยอดประมาณการ
                        </span>
                        <span className="text-base sm:text-lg font-black text-[#211D19]">
                          ฿{(360 + idx * 55).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SECTION 7: PAYMENT STATUS ROWS                                        */}
          {/* ===================================================================== */}
          {activeTab === "PAYMENT" && (
            <div className="rounded-3xl border-2 border-[#E8E2D9] bg-white p-5 shadow-md space-y-4 text-[#211D19]">
              <div>
                <h2 className="text-base font-extrabold text-[#211D19]">
                  Payment / Bill Detail: Member Identity + Payment Status
                </h2>
                <p className="text-xs text-[#665E55] mt-1">
                  Identity rail identifies the person. Status pill indicates whether payment has been collected.
                </p>
              </div>

              <div className="space-y-2.5">
                {/* Member 1 (Red): Paid */}
                {(() => {
                  const m = MOCK_15_MEMBERS[0];
                  const accent = accentsMap.get(m.userId)!;
                  return (
                    <div className="relative rounded-2xl border-2 border-[#E8E2D9] bg-white p-3.5 flex items-center justify-between overflow-hidden shadow-sm text-[#211D19]">
                      <div className={cn("absolute left-0 top-0 bottom-0 w-[4px]", accent.railClass)} />
                      <div className="flex items-center gap-3 pl-1.5">
                        <IdentityAvatar name={m.name} photo={m.photo} accent={accent} size="md" />
                        <div>
                          <p className="text-sm font-extrabold text-[#211D19]">Poh (Host)</p>
                          <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-0.5">
                            <CheckCircle2 className="size-3.5" /> ชำระแล้ว
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-base font-black text-[#211D19]">฿406.60</span>
                      </div>
                    </div>
                  );
                })()}

                {/* Member 2 (Green): Unpaid */}
                {(() => {
                  const m = MOCK_15_MEMBERS[1];
                  const accent = accentsMap.get(m.userId)!;
                  return (
                    <div className="relative rounded-2xl border-2 border-[#E8E2D9] bg-white p-3.5 flex items-center justify-between overflow-hidden shadow-sm text-[#211D19]">
                      <div className={cn("absolute left-0 top-0 bottom-0 w-[4px]", accent.railClass)} />
                      <div className="flex items-center gap-3 pl-1.5">
                        <IdentityAvatar name={m.name} photo={null} accent={accent} size="md" />
                        <div>
                          <p className="text-sm font-extrabold text-[#211D19]">May</p>
                          <span className="text-xs font-bold text-amber-700 flex items-center gap-1 mt-0.5">
                            <Clock className="size-3.5" /> รอชำระเงิน
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-base font-black text-[#211D19]">฿269.27</span>
                      </div>
                    </div>
                  );
                })()}

                {/* Member 3 (Orange): Slip Uploaded */}
                {(() => {
                  const m = MOCK_15_MEMBERS[2];
                  const accent = accentsMap.get(m.userId)!;
                  return (
                    <div className="relative rounded-2xl border-2 border-[#E8E2D9] bg-white p-3.5 flex items-center justify-between overflow-hidden shadow-sm text-[#211D19]">
                      <div className={cn("absolute left-0 top-0 bottom-0 w-[4px]", accent.railClass)} />
                      <div className="flex items-center gap-3 pl-1.5">
                        <IdentityAvatar name={m.name} photo={null} accent={accent} size="md" />
                        <div>
                          <p className="text-sm font-extrabold text-[#211D19]">Golf</p>
                          <span className="text-xs font-bold text-brand-primary flex items-center gap-1 mt-0.5">
                            <Eye className="size-3.5" /> แนบสลิปแล้ว (รอตรวจ)
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-base font-black text-[#211D19]">฿269.27</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* SECTION 8: DIFFICULT STATUS COLLISION STRESS TEST                     */}
          {/* ===================================================================== */}
          {activeTab === "STRESS_TEST" && (
            <div className="rounded-3xl border-2 border-[#E8E2D9] bg-white p-5 shadow-md space-y-5 text-[#211D19]">
              <div>
                <h2 className="text-base font-extrabold text-[#211D19]">
                  Status Collision Stress Test (Pure White Cards)
                </h2>
                <p className="text-xs text-[#665E55] mt-1">
                  Testing potentially confusing visual combinations on pure white cards. Identity is shown by the left rail and avatar ring only.
                </p>
              </div>

              <div className="space-y-4">
                {/* Test 1: Green Member Accent vs Paid Herb Status */}
                {(() => {
                  const m = MOCK_15_MEMBERS[1]; // Green
                  const accent = accentsMap.get(m.userId)!;
                  return (
                    <div className="p-4 rounded-2xl border-2 border-[#E8E2D9] bg-white space-y-2 relative overflow-hidden shadow-sm text-[#211D19]">
                      <div className={cn("absolute left-0 top-0 bottom-0 w-[4px]", accent.railClass)} />
                      <div className="flex items-center justify-between pl-1">
                        <div className="flex items-center gap-3">
                          <IdentityAvatar name={m.name} photo={null} accent={accent} size="md" />
                          <div>
                            <p className="text-sm font-extrabold text-[#211D19]">May (Green Member Accent / Slot 2)</p>
                            <p className="text-xs text-[#665E55]">Standard green base color (#5A9A68)</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-1 text-xs font-extrabold text-emerald-950">
                          <Check className="size-3.5 stroke-[3] text-emerald-700" />
                          <span>ชำระแล้ว (Paid Status)</span>
                        </span>
                      </div>
                      <p className="text-xs text-[#665E55] pl-1 font-medium">
                        ✓ Result: The 4px Green rail and Green avatar ring identify May on a pure white card, while the Emerald badge and Check icon explicitly convey the Paid status.
                      </p>
                    </div>
                  );
                })()}

                {/* Test 2: Gold Member Accent vs Unassigned Warning */}
                {(() => {
                  const m = MOCK_15_MEMBERS[5]; // Gold
                  const accent = accentsMap.get(m.userId)!;
                  return (
                    <div className="p-4 rounded-2xl border-2 border-[#E8E2D9] bg-white space-y-2 relative overflow-hidden shadow-sm text-[#211D19]">
                      <div className={cn("absolute left-0 top-0 bottom-0 w-[4px]", accent.railClass)} />
                      <div className="flex items-center justify-between pl-1">
                        <div className="flex items-center gap-3">
                          <IdentityAvatar name={m.name} photo={null} accent={accent} size="md" />
                          <div>
                            <p className="text-sm font-extrabold text-[#211D19]">Tang (Gold Member Accent / Slot 6)</p>
                            <p className="text-xs text-[#665E55]">Standard gold base color (#C99A38)</p>
                          </div>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 border border-amber-300 px-2.5 py-1 text-xs font-extrabold text-amber-950">
                          <AlertTriangle className="size-3.5 text-amber-700" />
                          <span>ยังไม่ระบุคน (Warning)</span>
                        </span>
                      </div>
                      <p className="text-xs text-[#665E55] pl-1 font-medium">
                        ✓ Result: Gold member rail is distinct; the warning badge uses explicit AlertTriangle icon and high-contrast Saffron badge text on a pure white card.
                      </p>
                    </div>
                  );
                })()}

                {/* Test 3: Red Member Accent vs Primary Chili CTA */}
                {(() => {
                  const m = MOCK_15_MEMBERS[0]; // Red
                  const accent = accentsMap.get(m.userId)!;
                  return (
                    <div className="p-4 rounded-2xl border-2 border-[#E8E2D9] bg-white space-y-3 relative overflow-hidden shadow-sm text-[#211D19]">
                      <div className={cn("absolute left-0 top-0 bottom-0 w-[4px]", accent.railClass)} />
                      <div className="flex items-center justify-between pl-1">
                        <div className="flex items-center gap-3">
                          <IdentityAvatar name={m.name} photo={m.photo} accent={accent} size="md" />
                          <div>
                            <p className="text-sm font-extrabold text-[#211D19]">Poh (Red Member Accent / Slot 1)</p>
                            <p className="text-xs text-[#665E55]">Standard red base color (#D95C4F)</p>
                          </div>
                        </div>
                        <Button size="sm" className="bg-brand-primary text-white font-extrabold h-9 px-4 rounded-xl">
                          <span>ยืนยันสร้างบิล</span>
                          <ArrowRight className="size-4 ml-1 stroke-[2.5]" />
                        </Button>
                      </div>
                      <p className="text-xs text-[#665E55] pl-1 font-medium">
                        ✓ Result: Primary action is a high-contrast Chili CTA button with arrow icon, clearly separate from the personal Red identity rail.
                      </p>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
