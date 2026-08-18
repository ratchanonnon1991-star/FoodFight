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
        "relative flex items-center justify-between p-3.5 sm:p-4 rounded-xl border text-left cursor-pointer select-none transition-all duration-150",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary",
        selected
          ? "bg-accent-petal/30 border-brand-primary text-brand-primary shadow-xs ring-1 ring-brand-primary"
          : "bg-surface border-border text-text-primary hover:border-brand-secondary/50 hover:bg-surface-subtle/50 active:bg-surface-subtle",
        disabled && "opacity-50 pointer-events-none cursor-not-allowed",
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0 pr-2">
        {icon && (
          <span
            className={cn(
              "shrink-0 transition-colors duration-150",
              selected ? "text-brand-primary" : "text-text-secondary"
            )}
          >
            {icon}
          </span>
        )}
        <div className="min-w-0">
          <p
            className={cn(
              "text-sm sm:text-base leading-snug truncate",
              selected ? "font-semibold text-brand-primary" : "font-medium text-text-primary"
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
          "size-5 shrink-0 rounded-md border flex items-center justify-center transition-colors duration-150",
          selected
            ? "bg-brand-primary border-brand-primary text-white"
            : "border-border bg-surface"
        )}
        aria-hidden="true"
      >
        {selected && <Check className="size-3.5 stroke-[2.5]" />}
      </div>
    </button>
  );
}
