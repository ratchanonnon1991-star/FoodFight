"use client";

import * as React from "react";
import { Check, Globe } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { useLanguage } from "@/i18n/LanguageProvider";
import { SUPPORTED_LANGUAGES, type Locale } from "@/i18n/config";

export interface LanguageSwitcherProps {
  className?: string;
  variant?: "default" | "subtle" | "landing" | "glass";
}

export function LanguageSwitcher({
  className,
  variant = "default",
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();
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

  const handleSelectLanguage = (selectedLocale: Locale) => {
    setLocale(selectedLocale);
    setIsOpen(false);
  };

  const currentOption =
    SUPPORTED_LANGUAGES.find((item) => item.locale === locale) ??
    SUPPORTED_LANGUAGES[0];

  const buttonLabel =
    locale === "th" ? "เปลี่ยนภาษา" : "Change language";
  const menuHeader =
    locale === "th" ? "เลือกภาษา" : "Select Language";

  return (
    <div ref={dropdownRef} className={cn("relative inline-block", className)}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={`${buttonLabel}: ${currentOption.label}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        title={`${buttonLabel}: ${currentOption.label}`}
        className={cn(
          "size-10 rounded-full border border-border/80 bg-surface flex items-center justify-center text-text-secondary hover:text-brand-primary hover:border-brand-primary/50 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus-ring cursor-pointer shadow-2xs",
          variant === "landing" &&
            "border-border/60 bg-surface/90 backdrop-blur-sm shadow-sm",
          variant === "subtle" && "size-9 border-transparent bg-transparent hover:bg-surface-subtle",
          variant === "glass" && "border-white/20 bg-black/20 text-white hover:bg-black/30 backdrop-blur-md shadow-xs hover:border-white/30",
          isOpen && variant === "glass" && "border-white/40 bg-black/40 text-white",
          isOpen && variant !== "glass" && "border-brand-primary/60 text-brand-primary bg-surface-subtle"
        )}
      >
        <Globe className="size-4.5 stroke-[1.8]" />
      </button>


      {/* Dropdown Menu (Strictly 2 rows: TH and EN) */}
      {isOpen && (
        <div
          role="listbox"
          aria-label={menuHeader}
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-border bg-surface shadow-lg animate-fade-in"
        >
          {/* Menu Header */}
          <div className="border-b border-border-subtle px-3.5 py-2 bg-surface-subtle/50">
            <span className="text-2xs font-bold uppercase tracking-wider text-text-muted">
              {menuHeader}
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
