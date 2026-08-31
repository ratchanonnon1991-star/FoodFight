"use client";

import * as React from "react";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  Camera,
  Check,
  CheckCircle2,
  ChevronLeft,
  FileText,
  ImageUp,
  Info,
  QrCode,
  Receipt,
  Users,
  X,
  ZoomIn,
} from "lucide-react";
import { AtmosphereBackground } from "@/components/ui/AtmosphereBackground";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { AddReceiptItemForm } from "@/features/bill/components/AddReceiptItemForm";
import { ReceiptItemRow } from "@/features/bill/components/ReceiptItemRow";
import { ItemAssignmentRow } from "@/features/bill/components/ItemAssignmentRow";
import { billTranslations } from "@/features/bill/i18n/bill-translations";
import {
  MEMBER_IDENTITY_PALETTE_15,
  resolveRoomMemberAccents,
  type MemberIdentityAccent,
} from "@/lib/member-identity/member-identity";
import { cn } from "@/lib/utils/cn";
import type { BillItem, BillMember } from "@/features/bill/types/bill-types";
import type { ReceiptItemInput } from "@/features/bill/services/bill-service";

// Development Guard
const isDev = process.env.NODE_ENV !== "production";

type StepMode = "RECEIPT" | "SPLIT" | "SUMMARY";

type ReceiptPreviewState =
  | "EMPTY_RECEIPT"
  | "RECEIPT_LOADED"
  | "ITEMS_READY"
  | "OCR_FAILED"
  | "EDIT_ITEM";

type SplitPreviewState =
  | "SPLIT_UNASSIGNED"
  | "SPLIT_PARTIAL"
  | "SPLIT_ALL_ASSIGNED"
  | "SPLIT_MEMBER_VIEW";

type SummaryPreviewState =
  | "SUMMARY_READY"
  | "SUMMARY_WITH_ADJUSTMENTS"
  | "SUMMARY_NO_PAYMENT_ACCOUNT"
  | "SUMMARY_MEMBER_VIEW";

type DevPreviewLocale = "th" | "en";

interface SummaryMemberMock {
  member: BillMember;
  itemsSubtotal: number;
  estimatedTotal: number;
}

const MOCK_MEMBERS_15: BillMember[] = [
  { userId: "u1", displayName: "Poh (Host)", avatarUrl: null, role: "HOST", joinedAt: "2026-08-29T10:00:00.000Z" },
  { userId: "u2", displayName: "May", avatarUrl: null, role: "MEMBER", joinedAt: "2026-08-29T10:01:00.000Z" },
  { userId: "u3", displayName: "Golf", avatarUrl: null, role: "MEMBER", joinedAt: "2026-08-29T10:02:00.000Z" },
  { userId: "u4", displayName: "Earn", avatarUrl: null, role: "MEMBER", joinedAt: "2026-08-29T10:03:00.000Z" },
  { userId: "u5", displayName: "Bank", avatarUrl: null, role: "MEMBER", joinedAt: "2026-08-29T10:04:00.000Z" },
  { userId: "u6", displayName: "Tang", avatarUrl: null, role: "MEMBER", joinedAt: "2026-08-29T10:05:00.000Z" },
  { userId: "u7", displayName: "Nut", avatarUrl: null, role: "MEMBER", joinedAt: "2026-08-29T10:06:00.000Z" },
  { userId: "u8", displayName: "Fah", avatarUrl: null, role: "MEMBER", joinedAt: "2026-08-29T10:07:00.000Z" },
  { userId: "u9", displayName: "Krit", avatarUrl: null, role: "MEMBER", joinedAt: "2026-08-29T10:08:00.000Z" },
  { userId: "u10", displayName: "Aom", avatarUrl: null, role: "MEMBER", joinedAt: "2026-08-29T10:09:00.000Z" },
  { userId: "u11", displayName: "Top", avatarUrl: null, role: "MEMBER", joinedAt: "2026-08-29T10:10:00.000Z" },
  { userId: "u12", displayName: "View", avatarUrl: null, role: "MEMBER", joinedAt: "2026-08-29T10:11:00.000Z" },
  { userId: "u13", displayName: "Beam", avatarUrl: null, role: "MEMBER", joinedAt: "2026-08-29T10:12:00.000Z" },
  { userId: "u14", displayName: "Oat", avatarUrl: null, role: "MEMBER", joinedAt: "2026-08-29T10:13:00.000Z" },
  { userId: "u15", displayName: "Jane", avatarUrl: null, role: "MEMBER", joinedAt: "2026-08-29T10:14:00.000Z" },
];

const MOCK_MEMBERS_6 = MOCK_MEMBERS_15.slice(0, 6);

const INITIAL_MOCK_ITEMS: BillItem[] = [
  {
    id: "item-1",
    name: "ไก่ย่างสมุนไพรเตาถ่าน (ตัว)",
    imageUrl: null,
    quantity: 2,
    unitPrice: 240,
    totalPrice: 480,
    assignedUserIds: [],
    shares: [],
  },
  {
    id: "item-2",
    name: "ส้มตำไทยไข่เค็ม",
    imageUrl: null,
    quantity: 3,
    unitPrice: 90,
    totalPrice: 270,
    assignedUserIds: [],
    shares: [],
  },
  {
    id: "item-3",
    name: "ต้มแซ่บกระดูกอ่อนหมู",
    imageUrl: null,
    quantity: 2,
    unitPrice: 150,
    totalPrice: 300,
    assignedUserIds: [],
    shares: [],
  },
];

const RECEIPT_STATES_CONFIG: Array<{
  id: ReceiptPreviewState;
  label: string;
  desc: string;
}> = [
  {
    id: "EMPTY_RECEIPT",
    label: "A. Empty Receipt",
    desc: "No Receipt Photo • Empty Items List • Disabled Continue CTA",
  },
  {
    id: "RECEIPT_LOADED",
    label: "B. Receipt Loaded",
    desc: "Receipt Photo Preview Loaded • Ready for Item Extraction",
  },
  {
    id: "ITEMS_READY",
    label: "C. Items Ready",
    desc: "Receipt Preview + 3 Typed Items • Calculated Subtotal • Enabled Continue CTA",
  },
  {
    id: "OCR_FAILED",
    label: "D. OCR Failed",
    desc: "Saffron OCR Warning Banner • Manual Editing Available",
  },
  {
    id: "EDIT_ITEM",
    label: "E. Edit Item",
    desc: "Item #1 in Responsive Edit Mode • Full-Width Name + Qty/Price Grid",
  },
];

const SPLIT_STATES_CONFIG: Array<{
  id: SplitPreviewState;
  label: string;
  desc: string;
}> = [
  {
    id: "SPLIT_UNASSIGNED",
    label: "A. Unassigned (0/3)",
    desc: "3 Items • 0 Assigned • High-Contrast Saffron Badges • Disabled CTA",
  },
  {
    id: "SPLIT_PARTIAL",
    label: "B. Partial Split (2/3)",
    desc: "Item 1 (2 members) • Item 2 (All) • Item 3 (Unassigned)",
  },
  {
    id: "SPLIT_ALL_ASSIGNED",
    label: "C. All Assigned (3/3)",
    desc: "All 3 Items Assigned • High-Contrast Herb Banner • Enabled CTA",
  },
  {
    id: "SPLIT_MEMBER_VIEW",
    label: "D. Member View",
    desc: "Tactile Rice Info Card • High-Contrast Read-Only Chips • No Host CTAs",
  },
];

const SUMMARY_STATES_CONFIG: Array<{
  id: SummaryPreviewState;
  label: string;
  desc: string;
}> = [
  {
    id: "SUMMARY_READY",
    label: "A. Ready (PromptPay OK)",
    desc: "Standard Totals • PromptPay Ready • Host View • Enabled Confirm CTA",
  },
  {
    id: "SUMMARY_WITH_ADJUSTMENTS",
    label: "B. With Adjustments",
    desc: "Service Charge + Tax - Discount • Estimate Disclaimer • Proportional Shares",
  },
  {
    id: "SUMMARY_NO_PAYMENT_ACCOUNT",
    label: "C. No PromptPay",
    desc: "PromptPay Missing • Saffron Warning Banner • Disabled Confirm CTA",
  },
  {
    id: "SUMMARY_MEMBER_VIEW",
    label: "D. Member View",
    desc: "Read-Only Member Perspective • Informational Notice • No Confirm CTA",
  },
];

// Fixed Financial Example QA Data for Summary (No Invented Formula Calculations)
const ALL_SUMMARY_MEMBERS_STANDARD: SummaryMemberMock[] = MOCK_MEMBERS_15.map(
  (member, idx) => {
    const fixedTotals = [370.0, 245.0, 245.0, 190.0];
    const itemsSubtotal = fixedTotals[idx] ?? 120.0 + (idx % 5) * 15;
    return {
      member,
      itemsSubtotal,
      estimatedTotal: itemsSubtotal,
    };
  },
);

const ALL_SUMMARY_MEMBERS_ADJUSTMENTS: SummaryMemberMock[] =
  MOCK_MEMBERS_15.map((member, idx) => {
    const fixedItems = [370.0, 245.0, 245.0, 190.0];
    const fixedEstimates = [406.6, 269.27, 269.27, 208.86];
    const itemsSubtotal = fixedItems[idx] ?? 120.0 + (idx % 5) * 15;
    const estimatedTotal =
      fixedEstimates[idx] ?? Math.round(itemsSubtotal * 1.0988 * 100) / 100;
    return {
      member,
      itemsSubtotal,
      estimatedTotal,
    };
  });

function formatMoney(amount: number): string {
  return `฿${new Intl.NumberFormat("th-TH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)}`;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function SummaryIdentityAvatar({
  name,
  photo,
  accent,
}: {
  name: string;
  photo?: string | null;
  accent: MemberIdentityAccent;
}) {
  const [failedImageUrl, setFailedImageUrl] = React.useState<string | null>(null);
  const shouldShowImage = Boolean(photo && failedImageUrl !== photo);

  return (
    <div
      className={cn(
        "relative flex size-10 items-center justify-center shrink-0 rounded-full text-xs font-extrabold select-none overflow-hidden ring-2 shadow-2xs",
        accent.ringClass,
        photo ? "bg-white" : accent.initialsBgClass,
      )}
      title={`${name} (${accent.nameEn})`}
    >
      {shouldShowImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo!}
          alt={name}
          className="size-full object-cover rounded-full"
          referrerPolicy="no-referrer"
          onError={() => setFailedImageUrl(photo ?? null)}
        />
      ) : (
        <span>{getInitials(name)}</span>
      )}
    </div>
  );
}

export default function BillsDevPreviewPage() {
  if (!isDev) {
    notFound();
  }

  const [stepMode, setStepMode] = React.useState<StepMode>("SUMMARY");
  const [receiptState, setReceiptState] =
    React.useState<ReceiptPreviewState>("ITEMS_READY");
  const [splitState, setSplitState] =
    React.useState<SplitPreviewState>("SPLIT_ALL_ASSIGNED");
  const [summaryState, setSummaryState] =
    React.useState<SummaryPreviewState>("SUMMARY_READY");
  const [locale, setLocale] = React.useState<DevPreviewLocale>("th");
  const [memberScale, setMemberScale] = React.useState<number>(4);

  // Local reactive items state for Receipt/Split
  const [items, setItems] = React.useState<BillItem[]>(INITIAL_MOCK_ITEMS);
  const [isEnlargedOpen, setIsEnlargedOpen] = React.useState(false);

  const activeMembers = React.useMemo(
    () => MOCK_MEMBERS_15.slice(0, memberScale),
    [memberScale],
  );

  const tReceipt = billTranslations[locale].receipt;
  const tSplit = billTranslations[locale].split;
  const tSummary = billTranslations[locale].summary;
  const isTh = locale === "th";

  // Close lightbox on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsEnlargedOpen(false);
      }
    };
    if (isEnlargedOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isEnlargedOpen]);

  // Handle Receipt state selection
  const handleSelectReceiptState = (stateId: ReceiptPreviewState) => {
    setReceiptState(stateId);
    if (stateId === "EMPTY_RECEIPT" || stateId === "RECEIPT_LOADED") {
      setItems([]);
    } else {
      setItems(INITIAL_MOCK_ITEMS);
    }
  };

  // Handle Split state selection
  const handleSelectSplitState = (stateId: SplitPreviewState) => {
    setSplitState(stateId);
    if (stateId === "SPLIT_UNASSIGNED") {
      setItems(
        INITIAL_MOCK_ITEMS.map((item) => ({ ...item, assignedUserIds: [] })),
      );
    } else if (stateId === "SPLIT_PARTIAL") {
      setItems([
        {
          ...INITIAL_MOCK_ITEMS[0],
          assignedUserIds: [activeMembers[0]?.userId, activeMembers[1]?.userId].filter(Boolean),
        },
        {
          ...INITIAL_MOCK_ITEMS[1],
          assignedUserIds: activeMembers.map((m) => m.userId),
        },
        {
          ...INITIAL_MOCK_ITEMS[2],
          assignedUserIds: [],
        },
      ]);
    } else if (stateId === "SPLIT_ALL_ASSIGNED" || stateId === "SPLIT_MEMBER_VIEW") {
      setItems([
        {
          ...INITIAL_MOCK_ITEMS[0],
          assignedUserIds: [activeMembers[0]?.userId, activeMembers[1]?.userId].filter(Boolean),
        },
        {
          ...INITIAL_MOCK_ITEMS[1],
          assignedUserIds: activeMembers.map((m) => m.userId),
        },
        {
          ...INITIAL_MOCK_ITEMS[2],
          assignedUserIds: [activeMembers[2]?.userId || activeMembers[0]?.userId],
        },
      ]);
    }
  };

  // Split Step Helpers
  const unassignedCount = items.filter(
    (item) => item.assignedUserIds.length === 0,
  ).length;
  const assignedCount = items.length - unassignedCount;
  const allAssigned = items.length > 0 && unassignedCount === 0;
  const isSplitMemberView = splitState === "SPLIT_MEMBER_VIEW";

  const handleToggleMember = (itemId: string, userId: string) => {
    if (isSplitMemberView) return;
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const exists = item.assignedUserIds.includes(userId);
        const nextIds = exists
          ? item.assignedUserIds.filter((id) => id !== userId)
          : [...item.assignedUserIds, userId];
        return { ...item, assignedUserIds: nextIds };
      }),
    );
  };

  const handleToggleAllMembers = (itemId: string) => {
    if (isSplitMemberView) return;
    setItems((prev) =>
      prev.map((item) => {
        if (item.id !== itemId) return item;
        const allSelected = activeMembers.every((m) =>
          item.assignedUserIds.includes(m.userId),
        );
        const nextIds = allSelected ? [] : activeMembers.map((m) => m.userId);
        return { ...item, assignedUserIds: nextIds };
      }),
    );
  };

  const handleSplitEverythingEqually = () => {
    if (isSplitMemberView) return;
    const allUserIds = activeMembers.map((m) => m.userId);
    setItems((prev) =>
      prev.map((item) => ({
        ...item,
        assignedUserIds: allUserIds,
      })),
    );
  };

  // Receipt Step Helpers
  const hasReceipt = receiptState !== "EMPTY_RECEIPT";
  const hasItems = items.length > 0;
  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);

  const handleAddItem = async (input: ReceiptItemInput) => {
    const newItem: BillItem = {
      id: `item-${Date.now()}`,
      name: input.name,
      imageUrl: null,
      quantity: input.quantity,
      unitPrice: input.unitPrice,
      totalPrice: input.quantity * input.unitPrice,
      assignedUserIds: [],
      shares: [],
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleUpdateItem = async (itemId: string, input: ReceiptItemInput) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              name: input.name,
              quantity: input.quantity,
              unitPrice: input.unitPrice,
              totalPrice: input.quantity * input.unitPrice,
            }
          : item,
      ),
    );
  };

  const handleDeleteItem = async (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Summary Step Helpers & Financial Truth Data
  const isSummaryAdjustments = summaryState === "SUMMARY_WITH_ADJUSTMENTS";
  const isSummaryMissingPayment = summaryState === "SUMMARY_NO_PAYMENT_ACCOUNT";
  const isSummaryMemberView = summaryState === "SUMMARY_MEMBER_VIEW";

  const currentSummaryMembers = isSummaryAdjustments
    ? ALL_SUMMARY_MEMBERS_ADJUSTMENTS
    : ALL_SUMMARY_MEMBERS_STANDARD;

  const activeSummaryMembers = React.useMemo(
    () => currentSummaryMembers.slice(0, memberScale),
    [currentSummaryMembers, memberScale],
  );

  const summaryAccentsMap = React.useMemo(
    () =>
      resolveRoomMemberAccents(
        activeSummaryMembers.map((m) => ({
          userId: m.member.userId,
          joinedAt: m.member.joinedAt,
        })),
      ),
    [activeSummaryMembers],
  );

  const currentSummaryData = React.useMemo(() => {
    const subtotal = activeSummaryMembers.reduce(
      (sum, m) => sum + m.itemsSubtotal,
      0,
    );
    const serviceCharge = isSummaryAdjustments ? Math.round(subtotal * 0.1) : 0;
    const tax = isSummaryAdjustments ? Math.round((subtotal + serviceCharge) * 0.07) : 0;
    const discount = isSummaryAdjustments ? (memberScale >= 4 ? 100.0 : 0.0) : 0;
    const totalAmount = subtotal + serviceCharge + tax - discount;

    return {
      subtotal,
      serviceCharge,
      tax,
      discount,
      totalAmount,
      members: activeSummaryMembers,
    };
  }, [activeSummaryMembers, isSummaryAdjustments, memberScale]);

  return (
    <div className="relative min-h-dvh bg-background text-text-primary selection:bg-brand-primary selection:text-white">
      {/* ========================================================================= */}
      {/* 1. DEV PREVIEW CONTROL BAR (Technical Overlay, Clearly Distinct) */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 border-b border-slate-700 bg-slate-950 px-3 py-2.5 text-white shadow-lg">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          {/* Badge & Step Mode Switcher */}
          <div className="flex items-center gap-2">
            <span className="rounded bg-amber-400 px-2 py-0.5 text-[10px] font-black tracking-wider uppercase text-black">
              DEV QA
            </span>
            <div className="flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
              <button
                type="button"
                onClick={() => setStepMode("RECEIPT")}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-bold transition-all cursor-pointer",
                  stepMode === "RECEIPT"
                    ? "bg-brand-primary text-white"
                    : "text-slate-300 hover:text-white",
                )}
              >
                Step 1: Receipt
              </button>
              <button
                type="button"
                onClick={() => setStepMode("SPLIT")}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-bold transition-all cursor-pointer",
                  stepMode === "SPLIT"
                    ? "bg-brand-primary text-white"
                    : "text-slate-300 hover:text-white",
                )}
              >
                Step 2: Split
              </button>
              <button
                type="button"
                onClick={() => setStepMode("SUMMARY")}
                className={cn(
                  "rounded-md px-2.5 py-1 text-xs font-bold transition-all cursor-pointer",
                  stepMode === "SUMMARY"
                    ? "bg-brand-primary text-white"
                    : "text-slate-300 hover:text-white",
                )}
              >
                Step 3: Summary
              </button>
            </div>
          </div>

          {/* State Tabs (Contextual to Active Step Mode) */}
          <div className="flex flex-wrap items-center gap-1.5">
            {stepMode === "RECEIPT" &&
              RECEIPT_STATES_CONFIG.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelectReceiptState(option.id)}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer",
                    receiptState === option.id
                      ? "bg-brand-primary text-white shadow-xs"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white",
                  )}
                >
                  {option.label}
                </button>
              ))}

            {stepMode === "SPLIT" &&
              SPLIT_STATES_CONFIG.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleSelectSplitState(option.id)}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer",
                    splitState === option.id
                      ? "bg-brand-primary text-white shadow-xs"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white",
                  )}
                >
                  {option.label}
                </button>
              ))}

            {stepMode === "SUMMARY" &&
              SUMMARY_STATES_CONFIG.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSummaryState(option.id)}
                  className={cn(
                    "rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer",
                    summaryState === option.id
                      ? "bg-brand-primary text-white shadow-xs"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white",
                  )}
                >
                  {option.label}
                </button>
              ))}
          </div>

          {/* Controls: Member Scale & Locale */}
          <div className="flex items-center gap-2">
            {(stepMode === "SPLIT" || stepMode === "SUMMARY") && (
              <div className="flex items-center rounded-md border border-slate-700 bg-slate-800 px-1.5 py-0.5 text-xs text-slate-200">
                <span className="text-[10px] text-slate-400 mr-1.5">Members:</span>
                {[2, 4, 6, 10, 15].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setMemberScale(num)}
                    className={cn(
                      "px-1.5 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer",
                      memberScale === num
                        ? "bg-brand-primary text-white"
                        : "text-slate-400 hover:text-slate-200",
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => setLocale(isTh ? "en" : "th")}
              className="rounded-md border border-slate-700 bg-slate-800 px-2.5 py-0.5 text-[11px] font-bold text-slate-200 hover:bg-slate-700 cursor-pointer"
              title="Toggle Locale"
            >
              {isTh ? "EN" : "ไทย"}
            </button>
          </div>
        </div>

        {/* State description subtitle */}
        <div className="mx-auto mt-1.5 flex max-w-6xl items-center justify-between border-t border-slate-800/80 pt-1 text-[11px] text-slate-400">
          <div>
            <span className="font-semibold text-amber-300">Exercising: </span>
            {stepMode === "RECEIPT" &&
              RECEIPT_STATES_CONFIG.find((s) => s.id === receiptState)?.desc}
            {stepMode === "SPLIT" &&
              SPLIT_STATES_CONFIG.find((s) => s.id === splitState)?.desc}
            {stepMode === "SUMMARY" &&
              SUMMARY_STATES_CONFIG.find((s) => s.id === summaryState)?.desc}
          </div>
          <span className="hidden font-mono text-[10px] text-slate-500 md:inline">
            Zero Network Mutation • Local Reactive State
          </span>
        </div>
      </header>

      {/* Main Preview Container */}
      <div className="relative min-h-dvh flex flex-col">
        {/* Warm Atmosphere Hero Background Layer */}
        <AtmosphereBackground variant="hero" height="hero" className="-top-0" />

        {/* Main Content Area */}
        <div className="relative z-10 mx-auto w-full max-w-md px-3.5 pb-28 pt-3 sm:px-6 sm:pb-32 sm:pt-5 md:max-w-3xl lg:max-w-5xl flex-1 flex flex-col">
          {/* ===================================================================== */}
          {/* STEP 3: SUMMARY / REVIEW & CONFIRM STEP PREVIEW                       */}
          {/* ===================================================================== */}
          {stepMode === "SUMMARY" && (
            <>
              {/* Back & Breadcrumb Row */}
              <div className="mb-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStepMode("SPLIT")}
                  className="inline-flex items-center gap-1 text-xs font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] hover:text-white/80 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="size-4 stroke-[2.5]" />
                  <span>{isTh ? "ย้อนกลับไปแบ่งบิล" : "Back to Split"}</span>
                </button>
                <span className="text-[11px] font-extrabold text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                  {tSummary.stepIndicator}
                </span>
              </div>

              {/* Singular Hero Header with High-Contrast White Text */}
              <div className="mb-4 text-center sm:mb-6">
                <h1 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] sm:text-3xl md:text-4xl">
                  {tSummary.title}
                </h1>
                <p className="mx-auto mt-1 max-w-sm text-xs font-semibold leading-relaxed text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] sm:text-sm md:max-w-md">
                  {tSummary.subtitle("ร้านไก่ย่างเสือใหญ่ (สาขาอารีย์)", activeSummaryMembers.length)}
                </p>
                <p className="mx-auto mt-1 max-w-md text-[11px] sm:text-xs text-white/95 font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                  {tSummary.helper}
                </p>
              </div>

              {/* Member Read-Only Notice: Opaque Rice Tactile Card */}
              {isSummaryMemberView && (
                <div className="mb-4 rounded-3xl border-2 border-border/90 bg-surface p-4 sm:p-5 shadow-md flex items-start gap-3.5">
                  <div className="size-10 rounded-2xl bg-surface-subtle border border-border-subtle flex items-center justify-center text-text-primary shrink-0 shadow-2xs">
                    <Users className="size-5 text-brand-primary" />
                  </div>
                  <div className="text-xs space-y-1">
                    <p className="font-extrabold text-sm text-text-primary">
                      {tSummary.memberNoticeTitle}
                    </p>
                    <p className="leading-relaxed text-text-secondary font-medium">
                      {tSummary.memberNoticeDesc("Poh (Host)")}
                    </p>
                  </div>
                </div>
              )}

              {/* Main Responsive Grid: 2-Column on Desktop / Stacked on Mobile */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6 items-start">
                {/* LEFT COLUMN (Desktop col-span-7): MEMBER BREAKDOWN */}
                <div className="lg:col-span-7 space-y-3.5">
                  <Card
                    variant="outline"
                    className="rounded-3xl border-2 border-[#E8E2D9] bg-white p-4 sm:p-5 shadow-md space-y-3.5 text-[#211D19]"
                  >
                    <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-3">
                      <div className="flex items-center gap-2">
                        <Users className="size-4 text-brand-primary" />
                        <h2 className="text-sm sm:text-base font-extrabold tracking-tight text-[#211D19]">
                          {tSummary.memberBreakdownTitle}
                        </h2>
                      </div>
                      <span className="rounded-full bg-[#FAF8F5] border border-[#E8E2D9] px-2.5 py-0.5 text-xs font-bold text-[#665E55]">
                        {activeSummaryMembers.length} {isTh ? "คน" : "members"}
                      </span>
                    </div>

                    {/* Calm Estimate Disclaimer Banner when Adjustments exist */}
                    {isSummaryAdjustments && (
                      <div className="rounded-2xl border border-[#E8E2D9] bg-[#FAF8F5] p-3 text-xs text-[#665E55] flex items-start gap-2.5">
                        <Info className="size-4 text-[#665E55] shrink-0 mt-0.5" />
                        <p className="leading-relaxed font-medium">
                          {tSummary.estimateDisclaimer}
                        </p>
                      </div>
                    )}

                    {/* Member Breakdown List with Pure White Cards + 4px Left Rail */}
                    <div className="space-y-2.5">
                      {activeSummaryMembers.map(({ member, itemsSubtotal, estimatedTotal }) => {
                        const accent =
                          summaryAccentsMap.get(member.userId) ??
                          MEMBER_IDENTITY_PALETTE_15[0];

                        return (
                          <div
                            key={member.userId}
                            className="relative rounded-2xl border-2 border-[#E8E2D9] bg-white p-3.5 sm:p-4 flex items-center justify-between gap-3 shadow-2xs hover:shadow-xs transition-all overflow-hidden text-[#211D19]"
                          >
                            {/* 4px Left Member Identity Rail */}
                            <div
                              className={cn(
                                "absolute left-0 top-0 bottom-0 w-[4px]",
                                accent.railClass,
                              )}
                            />

                            <div className="flex items-center gap-3 min-w-0 pl-1.5">
                              <SummaryIdentityAvatar
                                name={member.displayName}
                                photo={member.avatarUrl}
                                accent={accent}
                              />
                              <div className="min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <p className="text-sm font-extrabold text-[#211D19] truncate">
                                    {member.displayName}
                                  </p>
                                  {member.role === "HOST" && (
                                    <span className="rounded bg-brand-primary/10 px-1.5 py-0.2 text-[10px] font-black uppercase text-brand-primary">
                                      Host
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                  <span
                                    className="size-2 rounded-full shrink-0 shadow-2xs"
                                    style={{ backgroundColor: accent.baseHex }}
                                  />
                                  {isSummaryAdjustments ? (
                                    <p className="text-xs text-[#665E55] font-medium">
                                      {tSummary.itemSubtotalLabel}:{" "}
                                      <span className="font-semibold text-[#211D19]">
                                        {formatMoney(itemsSubtotal)}
                                      </span>
                                    </p>
                                  ) : (
                                    <p className="text-xs text-[#665E55] font-medium">
                                      {accent.nameTh} ({accent.nameEn})
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>

                            <div className="text-right shrink-0">
                              <span className="text-[11px] font-bold text-[#665E55] block">
                                {isSummaryAdjustments
                                  ? tSummary.estimatedTotalLabel
                                  : tSummary.finalTotalLabel}
                              </span>
                              <span className="text-base sm:text-lg font-black text-[#211D19]">
                                {formatMoney(estimatedTotal)}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </Card>
                </div>

                {/* RIGHT COLUMN (Desktop col-span-5): BILL TOTALS & PAYMENT ACTION */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Bill Totals Card */}
                  <Card
                    variant="outline"
                    className="rounded-3xl border-2 border-border/90 bg-surface p-4 sm:p-5 shadow-md space-y-3.5"
                  >
                    <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                      <FileText className="size-4 text-brand-primary" />
                      <h2 className="text-sm sm:text-base font-extrabold tracking-tight text-text-primary">
                        {tSummary.billTotalsTitle}
                      </h2>
                    </div>

                    <div className="space-y-2 text-xs sm:text-sm font-medium">
                      <div className="flex justify-between text-text-secondary">
                        <span>{tSummary.subtotalLabel}</span>
                        <span className="font-bold text-text-primary">
                          {formatMoney(currentSummaryData.subtotal)}
                        </span>
                      </div>

                      {(isSummaryAdjustments || currentSummaryData.serviceCharge > 0) && (
                        <div className="flex justify-between text-text-secondary">
                          <span>{tSummary.serviceChargeLabel}</span>
                          <span className="font-bold text-text-primary">
                            +{formatMoney(currentSummaryData.serviceCharge)}
                          </span>
                        </div>
                      )}

                      {(isSummaryAdjustments || currentSummaryData.tax > 0) && (
                        <div className="flex justify-between text-text-secondary">
                          <span>{tSummary.taxLabel}</span>
                          <span className="font-bold text-text-primary">
                            +{formatMoney(currentSummaryData.tax)}
                          </span>
                        </div>
                      )}

                      {(isSummaryAdjustments || currentSummaryData.discount > 0) && (
                        <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-bold">
                          <span>{tSummary.discountLabel}</span>
                          <span>-{formatMoney(currentSummaryData.discount)}</span>
                        </div>
                      )}

                      {/* Grand Total Row */}
                      <div className="border-t-2 border-border/80 pt-3 flex items-baseline justify-between">
                        <div>
                          <span className="text-xs sm:text-sm font-black text-text-primary uppercase tracking-wider block">
                            {tSummary.grandTotalLabel}
                          </span>
                          <span className="text-[11px] text-text-secondary font-medium">
                            {isTh ? "ยอดรวมทั้งบิล" : "Authoritative total"}
                          </span>
                        </div>
                        <span className="text-xl sm:text-2xl font-black text-text-primary drop-shadow-2xs">
                          {formatMoney(currentSummaryData.totalAmount)}
                        </span>
                      </div>
                    </div>
                  </Card>

                  {/* Payment Readiness Cue (Host View Only) */}
                  {!isSummaryMemberView && (
                    <>
                      {isSummaryMissingPayment ? (
                        /* Saffron Warning Banner for Missing PromptPay */
                        <div className="rounded-2xl border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/90 p-4 text-xs shadow-sm space-y-2.5">
                          <div className="flex items-start gap-2.5 text-amber-950 dark:text-amber-100">
                            <AlertTriangle className="size-5 shrink-0 text-amber-700 dark:text-amber-400 mt-0.5" />
                            <div className="space-y-0.5">
                              <p className="font-extrabold text-sm">
                                {tSummary.promptPayMissingTitle}
                              </p>
                              <p className="leading-relaxed text-amber-900 dark:text-amber-200 font-medium">
                                {tSummary.promptPayMissingDesc}
                              </p>
                            </div>
                          </div>

                          <button
                            type="button"
                            className="w-full h-9 rounded-xl border-2 border-[#F2AF32] bg-[#FFF7DF] text-[#5A260C] font-extrabold text-xs shadow-2xs transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer hover:border-[#D98E12] hover:bg-[#F2AF32] hover:text-[#211D19] active:border-[#B5750A] active:bg-[#D98E12] active:text-[#211D19] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
                            onClick={() => alert("DEV QA: PromptPay Setup Action triggered (Local mock only)")}
                          >
                            <QrCode className="size-3.5 mr-1" />
                            <span>{tSummary.setupNowButton}</span>
                          </button>
                        </div>
                      ) : (
                        /* Herb Readiness Pill for Configured PromptPay */
                        <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50 dark:bg-emerald-950/90 p-3.5 text-xs text-emerald-950 dark:text-emerald-100 shadow-2xs flex items-center gap-2.5 font-bold">
                          <CheckCircle2 className="size-5 shrink-0 text-emerald-700 dark:text-emerald-400" />
                          <span>{tSummary.promptPayReady("081-234-5678 (Poh)")}</span>
                        </div>
                      )}

                      {/* Primary Confirm CTA Button */}
                      <div className="pt-1 text-center space-y-2">
                        <Button
                          size="lg"
                          className={cn(
                            "w-full h-12 rounded-2xl text-base font-extrabold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer",
                            !isSummaryMissingPayment
                              ? "bg-brand-primary hover:bg-brand-primary-hover text-white shadow-md active:scale-[0.99]"
                              : "bg-surface-muted text-text-secondary/60 border border-border cursor-not-allowed opacity-85",
                          )}
                          disabled={isSummaryMissingPayment}
                          onClick={() => {
                            alert(
                              isTh
                                ? `ยืนยันและสร้างบิลเรียบร้อย (ยอดรวม ${formatMoney(currentSummaryData.totalAmount)})`
                                : `Bill confirmed & created (${formatMoney(currentSummaryData.totalAmount)})`,
                            );
                          }}
                        >
                          <span>{tSummary.confirmButton}</span>
                          <ArrowRight className="size-5 stroke-[2.5]" />
                        </Button>

                        <p className="text-xs text-text-secondary font-medium">
                          {tSummary.confirmHelper}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ===================================================================== */}
          {/* STEP 2: SPLIT STEP PREVIEW (Preserved for full workflow QA)          */}
          {/* ===================================================================== */}
          {stepMode === "SPLIT" && (
            <>
              {/* Back & Breadcrumb Row */}
              <div className="mb-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStepMode("RECEIPT")}
                  className="inline-flex items-center gap-1 text-xs font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] hover:text-white/80 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="size-4 stroke-[2.5]" />
                  <span>{isTh ? "ย้อนกลับไปใบเสร็จ" : "Back to Receipt"}</span>
                </button>
                <span className="text-[11px] font-extrabold text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                  {tSplit.stepIndicator}
                </span>
              </div>

              {/* Singular Hero Header with High-Contrast White Text & Drop Shadow */}
              <div className="mb-4 text-center sm:mb-6">
                <h1 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] sm:text-3xl md:text-4xl">
                  {tSplit.title}
                </h1>
                <p className="mx-auto mt-1 max-w-sm text-xs font-semibold leading-relaxed text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] sm:text-sm md:max-w-md">
                  {tSplit.subtitle("ร้านไก่ย่างเสือใหญ่ (สาขาอารีย์)", activeMembers.length)}
                </p>
                <p className="mx-auto mt-1 max-w-md text-[11px] sm:text-xs text-white/95 font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                  {tSplit.helper}
                </p>
              </div>

              {/* Member Read-Only Notice: Opaque Rice Tactile Card */}
              {isSplitMemberView && (
                <div className="mb-4 rounded-3xl border-2 border-border/90 bg-surface p-4 sm:p-5 shadow-md flex items-start gap-3.5">
                  <div className="size-10 rounded-2xl bg-surface-subtle border border-border-subtle flex items-center justify-center text-text-primary shrink-0 shadow-2xs">
                    <Users className="size-5 text-brand-primary" />
                  </div>
                  <div className="text-xs space-y-1">
                    <p className="font-extrabold text-sm text-text-primary">
                      {tSplit.memberNoticeTitle}
                    </p>
                    <p className="leading-relaxed text-text-secondary font-medium">
                      {tSplit.memberNoticeDesc("Poh (Host)")}
                    </p>
                  </div>
                </div>
              )}

              {/* Split Overview & Progress Card */}
              <div className="mb-4 rounded-3xl border-2 border-border/90 bg-surface p-4 sm:p-5 shadow-md space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-bold text-text-secondary">
                      {isTh ? "ความคืบหน้าการแบ่ง:" : "Assignment Progress:"}
                    </span>
                    <span className="ml-2 text-sm font-black text-text-primary">
                      {tSplit.progressCount(assignedCount, items.length)}
                    </span>
                  </div>

                  {/* Split Everything Equally Action (Host Only) */}
                  {!isSplitMemberView && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs font-bold gap-1.5 rounded-xl border-border hover:bg-surface-subtle cursor-pointer"
                      onClick={handleSplitEverythingEqually}
                    >
                      <Users className="size-3.5 text-brand-primary" />
                      <span>{tSplit.splitEvenlyButton}</span>
                    </Button>
                  )}
                </div>

                {/* Progress bar */}
                <div className="h-2.5 w-full rounded-full bg-surface-muted overflow-hidden border border-border-subtle">
                  <div
                    className={cn(
                      "h-full transition-all duration-300 rounded-full",
                      allAssigned ? "bg-accent-fresh" : "bg-brand-primary",
                    )}
                    style={{
                      width: `${items.length > 0 ? (assignedCount / items.length) * 100 : 0}%`,
                    }}
                  />
                </div>
              </div>

              {/* Item Assignment Cards List (Reusing Production ItemAssignmentRow) */}
              <div className="space-y-3.5 mb-5">
                {items.map((item) => (
                  <ItemAssignmentRow
                    key={item.id}
                    item={item}
                    members={activeMembers}
                    disabled={isSplitMemberView}
                    onToggle={(userId) => handleToggleMember(item.id, userId)}
                    onToggleAll={() => handleToggleAllMembers(item.id)}
                  />
                ))}
              </div>

              {/* High-Contrast Status Alert Banner */}
              <div
                className={cn(
                  "mb-5 rounded-2xl border-2 p-4 text-xs shadow-sm flex items-start gap-3.5",
                  allAssigned
                    ? "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/90 text-emerald-950 dark:text-emerald-100"
                    : "border-amber-400 bg-amber-50 dark:bg-amber-950/90 text-amber-950 dark:text-amber-100",
                )}
              >
                {allAssigned ? (
                  <CheckCircle2 className="size-5 shrink-0 text-emerald-700 dark:text-emerald-400 mt-0.5" />
                ) : (
                  <AlertTriangle className="size-5 shrink-0 text-amber-700 dark:text-amber-400 mt-0.5" />
                )}
                <div className="space-y-0.5">
                  <p className="font-extrabold text-sm">
                    {allAssigned
                      ? (isTh ? "แบ่งครบแล้ว" : "All Assigned")
                      : (isTh ? "ยังแบ่งไม่ครบ" : "Incomplete Assignment")}
                  </p>
                  <p
                    className={cn(
                      "leading-relaxed font-medium",
                      allAssigned
                        ? "text-emerald-900 dark:text-emerald-200"
                        : "text-amber-900 dark:text-amber-200",
                    )}
                  >
                    {allAssigned
                      ? tSplit.allAssignedBanner
                      : tSplit.unassignedBanner(unassignedCount)}
                  </p>
                </div>
              </div>

              {/* Primary Continue CTA (Host Only) */}
              {!isSplitMemberView && (
                <div className="pt-1 text-center space-y-2">
                  <Button
                    size="lg"
                    className={cn(
                      "w-full h-12 rounded-2xl text-base font-extrabold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer",
                      allAssigned
                        ? "bg-brand-primary hover:bg-brand-primary-hover text-white shadow-md active:scale-[0.99]"
                        : "bg-surface-muted text-text-secondary/60 border border-border cursor-not-allowed opacity-85",
                    )}
                    disabled={!allAssigned}
                    onClick={() => setStepMode("SUMMARY")}
                  >
                    <span>{tSplit.continueToSummary}</span>
                    <ArrowRight className="size-5 stroke-[2.5]" />
                  </Button>

                  <p className="text-xs text-text-secondary font-medium">
                    {tSplit.continueHelper}
                  </p>
                </div>
              )}
            </>
          )}

          {/* ===================================================================== */}
          {/* STEP 1: RECEIPT STEP PREVIEW (Preserved for full workflow QA)          */}
          {/* ===================================================================== */}
          {stepMode === "RECEIPT" && (
            <>
              {/* Back & Breadcrumb Row */}
              <div className="mb-2 flex items-center justify-between">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] hover:text-white/80 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="size-4 stroke-[2.5]" />
                  <span>{isTh ? "ย้อนกลับ" : "Back to Bills"}</span>
                </button>
                <span className="text-[11px] font-extrabold text-white/90 drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                  {isTh ? "ขั้นตอนที่ 1 จาก 3" : "Step 1 of 3"}
                </span>
              </div>

              {/* Singular Hero Header with High-Contrast White Text */}
              <div className="mb-4 text-center sm:mb-6">
                <h1 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] sm:text-3xl md:text-4xl">
                  {tReceipt.title}
                </h1>
                <p className="mx-auto mt-1 max-w-sm text-xs font-semibold leading-relaxed text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] sm:text-sm md:max-w-md">
                  {tReceipt.subtitle("ร้านไก่ย่างเสือใหญ่ (สาขาอารีย์)", 4)}
                </p>
              </div>

              {/* Saffron OCR Warning Banner (when OCR_FAILED) */}
              {receiptState === "OCR_FAILED" && (
                <div className="mb-4 rounded-2xl border-2 border-amber-400 bg-amber-50 dark:bg-amber-950/90 p-4 text-amber-950 dark:text-amber-100 shadow-sm flex items-start gap-3.5">
                  <AlertTriangle className="size-5 shrink-0 text-amber-700 dark:text-amber-400 mt-0.5" />
                  <div className="text-xs space-y-0.5">
                    <p className="font-extrabold text-sm">{tReceipt.ocrFailedTitle}</p>
                    <p className="leading-relaxed text-amber-900 dark:text-amber-200 font-medium">
                      {tReceipt.ocrFailedDesc}
                    </p>
                  </div>
                </div>
              )}

              {/* Main Grid: Responsive 2-Column on Desktop / Stacked on Mobile */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6 items-start">
                {/* LEFT COLUMN (Desktop col-span-5): RECEIPT PHOTO CARD */}
                <div className="lg:col-span-5 space-y-3">
                  <Card
                    variant="outline"
                    className="rounded-3xl border-2 border-border/90 bg-surface p-4 sm:p-5 shadow-md space-y-3.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Receipt className="size-4 text-brand-primary" />
                        <h2 className="text-sm font-extrabold tracking-tight text-text-primary">
                          {tReceipt.receiptCardTitle}
                        </h2>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs font-bold gap-1.5 rounded-xl cursor-pointer"
                        onClick={() =>
                          handleSelectReceiptState(
                            hasReceipt ? "EMPTY_RECEIPT" : "RECEIPT_LOADED",
                          )
                        }
                      >
                        <Camera className="size-3.5" />
                        <span>{hasReceipt ? tReceipt.rescanReceipt : tReceipt.scanReceipt}</span>
                      </Button>
                    </div>

                    {hasReceipt ? (
                      <div className="relative group rounded-2xl border-2 border-border-subtle bg-surface-muted overflow-hidden shadow-2xs">
                        <div
                          onClick={() => setIsEnlargedOpen(true)}
                          className="p-4 sm:p-5 bg-white text-slate-800 text-xs font-mono space-y-2 border-b border-dashed border-slate-300 cursor-pointer"
                        >
                          <div className="text-center border-b border-slate-200 pb-2 space-y-0.5">
                            <p className="font-bold text-sm tracking-tight text-slate-900 font-sans">
                              ร้านไก่ย่างเสือใหญ่
                            </p>
                            <p className="text-[10px] text-slate-500">
                              สาขาอารีย์ (พหลโยธิน 7)
                            </p>
                            <p className="text-[10px] text-slate-400">
                              TAX ID: 010555982142 • 29/08/2026 19:45
                            </p>
                          </div>

                          <div className="space-y-1 pt-1 text-[11px]">
                            <div className="flex justify-between">
                              <span>ไก่ย่างสมุนไพรเตาถ่าน 2x</span>
                              <span className="font-semibold">480.00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>ส้มตำไทยไข่เค็ม 3x</span>
                              <span className="font-semibold">270.00</span>
                            </div>
                            <div className="flex justify-between">
                              <span>ต้มแซ่บกระดูกอ่อนหมู 2x</span>
                              <span className="font-semibold">300.00</span>
                            </div>
                          </div>

                          <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-sm text-slate-900">
                            <span>TOTAL</span>
                            <span>1,050.00 THB</span>
                          </div>
                        </div>

                        <div className="p-2 bg-surface-subtle/90 flex items-center justify-between text-[11px] font-semibold text-text-secondary">
                          <span className="flex items-center gap-1 text-accent-fresh">
                            <Check className="size-3.5 stroke-[3]" />
                            <span>{isTh ? "แนบรูปแล้ว" : "Photo Attached"}</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => setIsEnlargedOpen(true)}
                            className="text-[10px] font-bold text-brand-primary hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <ZoomIn className="size-3" />
                            <span>{isTh ? "ดูภาพขยาย" : "Enlarge"}</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border py-10 text-text-muted bg-surface-subtle/50 text-center p-4">
                        <div className="size-12 rounded-2xl bg-surface border border-border flex items-center justify-center text-text-muted shadow-2xs">
                          <ImageUp className="size-6 stroke-[1.8]" />
                        </div>
                        <p className="text-xs font-bold text-text-secondary mt-1">
                          {tReceipt.noReceiptYet}
                        </p>
                        <p className="text-[11px] text-text-muted max-w-[220px]">
                          {isTh
                            ? "ถ่ายภาพใบเสร็จเพื่อช่วยดึงรายการอาหารอัตโนมัติ"
                            : "Take a photo of the receipt to extract items automatically"}
                        </p>
                      </div>
                    )}
                  </Card>
                </div>

                {/* RIGHT COLUMN (Desktop col-span-7): BILL ITEMS & ENTRY CARD */}
                <div className="lg:col-span-7 space-y-4">
                  <Card
                    variant="outline"
                    className="rounded-3xl border-2 border-border/90 bg-surface p-4 sm:p-5 shadow-md space-y-4"
                  >
                    <div className="flex items-center justify-between border-b border-border/60 pb-3">
                      <div className="flex items-center gap-2">
                        <FileText className="size-4 text-brand-primary" />
                        <h2 className="text-sm font-extrabold tracking-tight text-text-primary">
                          {tReceipt.itemsCardTitle}
                        </h2>
                        <span className="rounded-full bg-surface-subtle border border-border-subtle px-2 py-0.5 text-[11px] font-bold text-text-secondary">
                          {tReceipt.itemsCount(items.length)}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] font-semibold text-text-secondary mr-1.5">
                          {tReceipt.subtotalLabel}:
                        </span>
                        <span className="text-base sm:text-lg font-black text-text-primary">
                          {formatMoney(subtotal)}
                        </span>
                      </div>
                    </div>

                    {items.length === 0 ? (
                      <div className="py-8 text-center text-text-muted text-xs font-medium">
                        {tReceipt.emptyItemsHint}
                      </div>
                    ) : (
                      <div className="divide-y divide-border/60">
                        {items.map((item) => (
                          <ReceiptItemRow
                            key={item.id}
                            item={item}
                            editable={true}
                            onSave={(input) => handleUpdateItem(item.id, input)}
                            onDelete={() => handleDeleteItem(item.id)}
                          />
                        ))}
                      </div>
                    )}

                    <AddReceiptItemForm onAdd={handleAddItem} />
                  </Card>

                  {/* Continue to Split Button */}
                  <div className="pt-1 text-center space-y-2">
                    <Button
                      size="lg"
                      className={cn(
                        "w-full h-12 rounded-2xl text-base font-extrabold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer",
                        hasItems
                          ? "bg-brand-primary hover:bg-brand-primary-hover text-white shadow-md active:scale-[0.99]"
                          : "bg-surface-muted text-text-secondary/60 border border-border cursor-not-allowed opacity-85",
                      )}
                      disabled={!hasItems}
                      onClick={() => setStepMode("SPLIT")}
                    >
                      <span>{tReceipt.continueToSplit}</span>
                      <ArrowRight className="size-5 stroke-[2.5]" />
                    </Button>

                    <p className="text-xs text-text-secondary">
                      {tReceipt.continueHelper}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Enlarged Receipt Lightbox Viewer */}
      {isEnlargedOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setIsEnlargedOpen(false)}
        >
          <div
            className="relative max-w-lg w-full bg-surface rounded-3xl overflow-hidden shadow-2xl p-4 border border-border flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between pb-2 border-b border-border">
              <span className="text-xs font-bold text-text-primary">
                {tReceipt.receiptCardTitle} (Enlarged)
              </span>
              <button
                type="button"
                onClick={() => setIsEnlargedOpen(false)}
                className="size-8 rounded-full bg-surface-muted hover:bg-surface-subtle flex items-center justify-center text-text-primary transition-colors cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="p-4 bg-white text-slate-800 text-xs font-mono space-y-2 w-full mt-3 rounded-xl border">
              <div className="text-center border-b border-slate-200 pb-2 space-y-0.5">
                <p className="font-bold text-base tracking-tight text-slate-900 font-sans">
                  ร้านไก่ย่างเสือใหญ่
                </p>
                <p className="text-xs text-slate-500">
                  สาขาอารีย์ (พหลโยธิน 7)
                </p>
                <p className="text-[10px] text-slate-400">
                  TAX ID: 010555982142 • 29/08/2026 19:45
                </p>
              </div>

              <div className="space-y-1.5 pt-2 text-xs">
                <div className="flex justify-between">
                  <span>ไก่ย่างสมุนไพรเตาถ่าน 2x</span>
                  <span className="font-semibold">480.00</span>
                </div>
                <div className="flex justify-between">
                  <span>ส้มตำไทยไข่เค็ม 3x</span>
                  <span className="font-semibold">270.00</span>
                </div>
                <div className="flex justify-between">
                  <span>ต้มแซ่บกระดูกอ่อนหมู 2x</span>
                  <span className="font-semibold">300.00</span>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-3 flex justify-between font-bold text-base text-slate-900">
                <span>TOTAL</span>
                <span>1,050.00 THB</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
