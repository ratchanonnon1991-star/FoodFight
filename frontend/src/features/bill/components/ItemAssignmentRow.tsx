"use client";

import * as React from "react";
import { AlertTriangle, Check, Users } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Card } from "@/components/ui/Card";
import { Spinner } from "@/components/ui/Spinner";
import { useLanguage } from "@/i18n/LanguageProvider";
import {
  MEMBER_IDENTITY_PALETTE_15,
  resolveRoomMemberAccents,
  type MemberIdentityAccent,
} from "@/lib/member-identity/member-identity";
import { billTranslations } from "../i18n/bill-translations";
import type { BillItem, BillMember } from "../types/bill-types";

export interface ItemAssignmentRowProps {
  item: BillItem;
  members: BillMember[];
  disabled: boolean;
  isSaving?: boolean;
  onToggle: (userId: string) => void;
  onToggleAll: () => void;
}

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

/**
 * Chip Avatar with Identity Ring and untinted photo/initials
 */
function ChipAvatar({
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
        "relative flex size-6 items-center justify-center shrink-0 rounded-full text-[10px] font-extrabold select-none overflow-hidden ring-2 shadow-2xs",
        accent.ringClass,
        photo ? "bg-white" : accent.initialsBgClass,
      )}
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

export function ItemAssignmentRow({
  item,
  members,
  disabled,
  isSaving = false,
  onToggle,
  onToggleAll,
}: ItemAssignmentRowProps) {
  const { locale } = useLanguage();
  const isTh = locale === "th";
  const t = billTranslations[locale].split;

  const accentsMap = React.useMemo(
    () => resolveRoomMemberAccents(members),
    [members],
  );

  const assignedSet = new Set(item.assignedUserIds);
  const isItemAllAssigned =
    members.length > 0 && members.every((m) => assignedSet.has(m.userId));
  const isItemUnassigned = item.assignedUserIds.length === 0;

  return (
    <Card
      variant="outline"
      className={cn(
        "rounded-3xl border-2 bg-white p-4 sm:p-5 shadow-sm space-y-3.5 transition-all relative text-[#211D19]",
        isItemUnassigned ? "border-amber-300" : "border-[#E8E2D9]",
      )}
    >
      {/* Item Header & Line Total */}
      <div className="flex items-start justify-between gap-3 border-b border-[#E8E2D9] pb-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm sm:text-base font-extrabold text-[#211D19] truncate">
            {item.name}
          </p>
          <p className="text-xs text-[#665E55] font-semibold mt-0.5">
            {item.quantity} × {formatMoney(item.unitPrice)}
          </p>
        </div>

        <div className="text-right shrink-0">
          <span className="text-[11px] font-bold text-[#665E55] block uppercase tracking-wider">
            {isTh ? "ยอดรวมเมนู" : "Line Total"}
          </span>
          <span className="text-base sm:text-lg font-black text-[#211D19]">
            {formatMoney(item.totalPrice)}
          </span>
        </div>
      </div>

      {/* Member Selection Section */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#665E55]">
            {t.sharedByLabel}
          </span>

          {/* High-Contrast Assignment Status Badge / Saving Spinner */}
          <div className="flex items-center gap-2">
            {isSaving && <Spinner size="sm" />}
            {isItemUnassigned ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 border border-amber-300 px-2.5 py-1 text-xs font-extrabold text-amber-950 shadow-2xs">
                <AlertTriangle className="size-3.5 text-amber-700" />
                <span>{t.unassignedBadge}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 border border-emerald-300 px-2.5 py-1 text-xs font-extrabold text-emerald-950 shadow-2xs">
                <Check className="size-3.5 stroke-[3] text-emerald-700" />
                <span>{t.assignedCount(item.assignedUserIds.length)}</span>
              </span>
            )}
          </div>
        </div>

        {/* Member Avatar / Pill Buttons Grid */}
        <div className="flex flex-wrap gap-2 items-center">
          {/* Toggle All Button (Host Only - Not a member, Chili styling preserved) */}
          {!disabled && (
            <button
              type="button"
              disabled={isSaving}
              onClick={onToggleAll}
              aria-pressed={isItemAllAssigned}
              className={cn(
                "h-11 min-h-[44px] px-3.5 rounded-2xl border-2 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs",
                isItemAllAssigned
                  ? "border-brand-primary bg-brand-primary text-white shadow-xs"
                  : "border-[#E8E2D9] bg-white text-[#211D19] hover:bg-[#FAF8F5]",
              )}
            >
              <Users className="size-3.5" />
              <span>{t.allButton}</span>
            </button>
          )}

          {/* Member Chips with Identity Tokens */}
          {members.map((member) => {
            const isAssigned = assignedSet.has(member.userId);
            const accent =
              accentsMap.get(member.userId) ?? MEMBER_IDENTITY_PALETTE_15[0];

            if (disabled) {
              // Read-only member chip for Member view
              return (
                <div
                  key={member.userId}
                  className={cn(
                    "h-11 min-h-[44px] px-3.5 rounded-2xl border-2 text-xs font-bold flex items-center gap-2 shadow-2xs transition-colors",
                    isAssigned
                      ? "border-emerald-400 bg-emerald-50 text-emerald-950 font-extrabold"
                      : "border-[#E8E2D9] bg-white text-[#211D19]",
                  )}
                >
                  <ChipAvatar
                    name={member.displayName}
                    photo={member.avatarUrl}
                    accent={accent}
                  />
                  <span>{member.displayName}</span>
                  {isAssigned && (
                    <Check className="size-3.5 stroke-[3] text-emerald-700 ml-0.5" />
                  )}
                </div>
              );
            }

            // Interactive 44px Button for Host
            return (
              <button
                key={member.userId}
                type="button"
                disabled={isSaving}
                onClick={() => onToggle(member.userId)}
                aria-pressed={isAssigned}
                aria-label={t.toggleMemberAria(member.displayName, item.name)}
                className={cn(
                  "h-11 min-h-[44px] px-3.5 rounded-2xl border-2 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xs",
                  isAssigned
                    ? "border-accent-fresh bg-accent-fresh text-white font-extrabold shadow-xs"
                    : "border-[#E8E2D9] bg-white text-[#211D19] hover:bg-[#FAF8F5]",
                )}
              >
                <ChipAvatar
                  name={member.displayName}
                  photo={member.avatarUrl}
                  accent={accent}
                />
                <span>{member.displayName}</span>
                {isAssigned ? (
                  <Check className="size-3.5 stroke-[3] text-white ml-0.5" />
                ) : (
                  <span
                    className="size-1.5 rounded-full shrink-0"
                    style={{ backgroundColor: accent.baseHex }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
