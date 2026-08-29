/**
 * Global Frontend Localization Configuration
 * Supported Locales: TH (ภาษาไทย) and EN (English)
 */

export type Locale = "th" | "en";

export const DEFAULT_LOCALE: Locale = "en";

export const STORAGE_KEY = "foodfighter_language";

export interface LanguageOption {
  locale: Locale;
  label: string;
  shortLabel: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: readonly LanguageOption[] = [
  { locale: "th", label: "ภาษาไทย", shortLabel: "TH", flag: "🇹🇭" },
  { locale: "en", label: "English", shortLabel: "EN", flag: "🇺🇸" },
];
