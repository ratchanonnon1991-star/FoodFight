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
      {/* Icon in soft rounded box */}
      <div className="size-11 sm:size-12 rounded-xl border border-border/60 bg-surface flex items-center justify-center text-text-primary mb-3 shadow-2xs">
        {icon}
      </div>

      {/* Title with inline small Chevron */}
      <div className="flex items-center justify-between gap-1 w-full">
        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-text-primary truncate">
          {title}
        </span>
        <ChevronRight className="size-4 shrink-0 text-text-secondary group-hover:translate-x-0.5 transition-transform" />
      </div>

      {/* Description */}
      <p className="text-xs text-text-secondary mt-1 line-clamp-1">
        {description}
      </p>
    </>
  );

  const cardClasses = cn(
    "group flex flex-col justify-between p-4 sm:p-5 rounded-2xl border border-border/80 bg-surface shadow-xs hover:border-brand-secondary/60 hover:shadow-sm transition-all duration-150 text-left select-none",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-secondary cursor-pointer",
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
