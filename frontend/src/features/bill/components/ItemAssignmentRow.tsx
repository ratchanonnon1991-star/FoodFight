"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Avatar } from "@/components/ui/Avatar";
import type { BillItem, BillMember } from "../types/bill-types";

export interface ItemAssignmentRowProps {
  item: BillItem;
  members: BillMember[];
  disabled: boolean;
  onToggle: (userId: string) => void;
}

export function ItemAssignmentRow({
  item,
  members,
  disabled,
  onToggle,
}: ItemAssignmentRowProps) {
  const assignedIds = new Set(item.assignedUserIds);

  return (
    <div className="py-3 space-y-2">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-text-primary truncate">
            {item.name}
          </p>
          <p className="text-xs text-text-secondary">
            {item.quantity} x ฿{item.unitPrice.toFixed(2)}
          </p>
        </div>
        <span className="text-sm font-semibold text-text-primary shrink-0">
          ฿{item.totalPrice.toFixed(2)}
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {members.map((member) => {
          const isAssigned = assignedIds.has(member.userId);

          return (
            <button
              key={member.userId}
              type="button"
              disabled={disabled}
              onClick={() => onToggle(member.userId)}
              className={cn(
                "relative rounded-full transition-transform disabled:cursor-not-allowed",
                !disabled && "cursor-pointer active:scale-95",
              )}
              aria-pressed={isAssigned}
              aria-label={`Toggle ${member.displayName} for ${item.name}`}
            >
              <Avatar
                size="sm"
                name={member.displayName}
                src={member.avatarUrl}
                className={cn(
                  isAssigned && "ring-2 ring-brand-primary",
                  !isAssigned && "opacity-50",
                )}
              />
              {isAssigned && (
                <span className="absolute -bottom-0.5 -right-0.5 flex size-3.5 items-center justify-center rounded-full bg-brand-primary text-white">
                  <Check className="size-2.5" strokeWidth={3} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
