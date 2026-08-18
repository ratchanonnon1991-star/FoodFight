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
}

export function HomeActionCard({
  title,
  description,
  icon,
  href,
  onClick,
  id,
  className,
}: HomeActionCardProps) {
  const content = (
    <>
      {/* Icon in larger soft rounded box */}
      <div className="size-12 sm:size-14 rounded-2xl border border-border/70 bg-surface flex items-center justify-center text-text-primary mb-3.5 shadow-2xs">
        {icon}
      </div>

      <div>
        {/* Title with inline small Chevron */}
        <div className="flex items-center justify-between gap-1 w-full">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-text-primary truncate">
            {title}
          </span>
          <ChevronRight className="size-4 shrink-0 text-text-secondary group-hover:translate-x-0.5 transition-transform" />
        </div>

        {/* Description */}
        <p className="text-xs text-text-secondary mt-1 line-clamp-1 leading-snug">
          {description}
        </p>
      </div>
    </>
  );

  const cardClasses = cn(
    "group flex flex-col justify-between min-h-[148px] p-5 rounded-2xl border border-border/80 bg-surface shadow-xs hover:border-brand-secondary/60 hover:shadow-sm transition-all duration-150 text-left select-none",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary cursor-pointer active:scale-[0.98]",
    className
  );

  if (href) {
    return (
      <Link href={href} id={id} className={cardClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" id={id} onClick={onClick} className={cardClasses}>
      {content}
    </button>
  );
}
