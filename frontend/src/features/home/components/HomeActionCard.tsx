"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface HomeActionCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
  id?: string;
  className?: string;
  variant?: "create" | "join" | "primary" | "secondary";
  ctaText?: string;
}

export function HomeActionCard({
  title,
  description,
  icon,
  href,
  onClick,
  id,
  className,
  variant,
  ctaText,
}: HomeActionCardProps) {
  // Infer variant from id/title if not explicitly provided
  const isCreate =
    variant === "create" ||
    variant === "primary" ||
    (id?.toLowerCase().includes("create") ?? false) ||
    title.toLowerCase().includes("create");

  const resolvedCtaText = ctaText || (isCreate ? "Create Now" : "Join Now");
  const imageSrc = isCreate
    ? "/images/home/home-create-room.webp"
    : "/images/home/home-join-room.webp";

  const content = (
    <>
      {/* Decorative Transparent 3D Soft Media Slot (Lower-Right 1:1) */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute -bottom-1.5 -right-1.5 z-0 flex size-24 sm:size-28 md:size-32 items-center justify-center overflow-hidden"
      >
        <img
          src={imageSrc}
          alt=""
          className="size-full object-contain drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* Main Content Stack */}
      <div className="relative z-10 flex flex-col justify-between h-full space-y-3">
        {/* Top Row: Filled Color Badge Icon */}
        <div className="flex items-center justify-between">
          <div
            className={cn(
              "flex size-11 items-center justify-center rounded-full shadow-xs transition-transform duration-200 group-hover:scale-105 sm:size-12",
              "[&>svg]:text-white [&>svg]:stroke-[2.2] [&>svg]:size-5 sm:[&>svg]:size-6",
              isCreate
                ? "bg-brand-primary text-white"
                : "bg-accent-fresh text-white"
            )}
          >
            {icon}
          </div>
        </div>

        {/* Text Details */}
        <div className="space-y-0.5 pr-1">
          <h3 className="text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-wider text-text-primary truncate">
            {title}
          </h3>
          <p className="text-xs text-text-secondary line-clamp-1 leading-snug">
            {description}
          </p>
        </div>

        {/* Bottom Action CTA Pill Button */}
        <div className="pt-0.5 flex items-center">
          {isCreate ? (
            <div className="inline-flex items-center gap-1 rounded-xl bg-brand-primary px-3 py-1.5 text-xs font-bold text-white shadow-xs group-hover:bg-brand-primary-hover transition-colors">
              <span>{resolvedCtaText}</span>
              <ChevronRight className="size-3.5 stroke-[2.5]" />
            </div>
          ) : (
            <div className="inline-flex items-center gap-1 rounded-xl border border-border/80 bg-surface px-3 py-1.5 text-xs font-bold text-text-primary shadow-2xs group-hover:bg-surface-subtle transition-colors">
              <span>{resolvedCtaText}</span>
              <ChevronRight className="size-3.5 stroke-[2.5]" />
            </div>
          )}
        </div>
      </div>
    </>
  );

  const cardClasses = cn(
    "group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-4 sm:p-5 text-left select-none",
    "min-h-[150px] sm:min-h-[160px] transition-all duration-200",
    "focus-visible:outline-2 focus-visible:outline-focus-ring cursor-pointer active:scale-[0.98]",
    "border-border/80 bg-surface shadow-xs hover:shadow-md",
    isCreate
      ? "hover:border-brand-primary/40 hover:ring-1 hover:ring-brand-primary/20"
      : "hover:border-accent-fresh/40 hover:ring-1 hover:ring-accent-fresh/20"
  );

  if (href) {
    return (
      <Link href={href} id={id} className={cn(cardClasses, className)}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      id={id}
      onClick={onClick}
      className={cn(cardClasses, className)}
    >
      {content}
    </button>
  );
}
