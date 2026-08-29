"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface SelectableOptionCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  description?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  "aria-label"?: string;
}

export function SelectableOptionCard({
  label,
  selected,
  onClick,
  icon,
  description,
  disabled = false,
  className,
  id,
  "aria-label": ariaLabel,
}: SelectableOptionCardProps) {
  return (
    <button
      type="button"
      id={id}
      role="checkbox"
      aria-checked={selected}
      aria-disabled={disabled ? "true" : undefined}
      aria-label={ariaLabel || label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "relative flex min-h-[54px] sm:min-h-[58px] items-center justify-between p-3.5 sm:p-4 rounded-2xl border text-left cursor-pointer select-none transition-all duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-fresh",
        selected
          ? "bg-status-success-bg/35 border-2 border-accent-fresh text-text-primary shadow-xs ring-1 ring-accent-fresh/20"
          : "bg-surface border border-border text-text-primary shadow-2xs hover:border-accent-fresh/60 hover:bg-surface-subtle active:scale-[0.99]",
        disabled && "opacity-50 pointer-events-none cursor-not-allowed",
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0 pr-2">
        {icon && (
          <span
            className={cn(
              "shrink-0 transition-colors duration-150",
              selected ? "text-accent-fresh" : "text-text-secondary"
            )}
          >
            {icon}
          </span>
        )}
        <div className="min-w-0">
          <p
            className={cn(
              "text-sm sm:text-base leading-snug break-words",
              selected ? "font-bold text-text-primary" : "font-semibold text-text-primary"
            )}
          >
            {label}
          </p>
          {description && (
            <p className="text-xs text-text-secondary mt-0.5 leading-normal">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Accessible visual check indicator */}
      <div
        className={cn(
          "size-5 sm:size-5.5 shrink-0 rounded-lg border flex items-center justify-center transition-all duration-150",
          selected
            ? "bg-accent-fresh border-accent-fresh text-white shadow-2xs"
            : "border-2 border-border-strong bg-surface text-transparent"
        )}
        aria-hidden="true"
      >
        {selected ? <Check className="size-3.5 stroke-[2.8]" /> : null}
      </div>
    </button>
  );
}
