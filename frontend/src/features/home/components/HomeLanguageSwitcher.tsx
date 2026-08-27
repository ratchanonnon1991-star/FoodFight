"use client";

import * as React from "react";
import { Check, Globe } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useHomeLanguage } from "../i18n/HomeLanguageContext";
import type { HomeLocale } from "../i18n/home-translations";

export interface LanguageOption {
  locale: HomeLocale;
  label: string;
  shortLabel: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: readonly LanguageOption[] = [
  { locale: "th", label: "ภาษาไทย", shortLabel: "TH", flag: "🇹🇭" },
  { locale: "en", label: "English", shortLabel: "EN", flag: "🇺🇸" },
];

export interface HomeLanguageSwitcherProps {
  className?: string;
}

export function HomeLanguageSwitcher({ className }: HomeLanguageSwitcherProps) {
  const { locale, setLocale, t } = useHomeLanguage();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Handle click outside & keyboard escape
  React.useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleSelectLanguage = (selectedLocale: HomeLocale) => {
    setLocale(selectedLocale);
    setIsOpen(false);
  };

  const currentOption =
    SUPPORTED_LANGUAGES.find((item) => item.locale === locale) ??
    SUPPORTED_LANGUAGES[0];

  return (
    <div ref={dropdownRef} className={cn("relative inline-block", className)}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={`${t.header.languageLabel}. ${currentOption.label}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title={`${t.header.languageLabel}: ${currentOption.label}`}
        className={cn(
          "size-10 rounded-full border border-border/80 bg-surface flex items-center justify-center text-text-secondary hover:text-brand-primary hover:border-brand-primary/50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring cursor-pointer shadow-2xs",
          isOpen && "border-brand-primary/60 text-brand-primary bg-surface-subtle"
        )}
      >
        <Globe className="size-4.5 stroke-[1.8]" />
      </button>

      {/* Dropdown Menu (Strictly 2 rows: TH and EN) */}
      {isOpen && (
        <div
          role="listbox"
          aria-label={t.header.selectLanguage}
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-border bg-surface shadow-lg animate-fade-in"
        >
          {/* Menu Header */}
          <div className="border-b border-border-subtle px-3.5 py-2 bg-surface-subtle/50">
            <span className="text-2xs font-bold uppercase tracking-wider text-text-muted">
              {t.header.selectLanguage}
            </span>
          </div>

          {/* 2-Item Language List */}
          <div className="p-1.5 space-y-0.5">
            {SUPPORTED_LANGUAGES.map((item) => {
              const isSelected = item.locale === locale;

              return (
                <button
                  key={item.locale}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelectLanguage(item.locale)}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-xs font-semibold transition-colors cursor-pointer",
                    isSelected
                      ? "bg-brand-primary/10 text-brand-primary"
                      : "text-text-primary hover:bg-surface-subtle"
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base leading-none" aria-hidden="true">
                      {item.flag}
                    </span>
                    <div className="truncate">
                      <span className="font-bold">{item.label}</span>
                      <span className="text-2xs text-text-muted ml-1.5 font-normal">
                        ({item.shortLabel})
                      </span>
                    </div>
                  </div>

                  {isSelected && (
                    <Check className="size-3.5 stroke-[2.5] text-brand-primary shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
