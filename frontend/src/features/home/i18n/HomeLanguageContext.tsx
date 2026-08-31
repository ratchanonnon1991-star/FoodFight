"use client";

import * as React from "react";
import { useLanguage } from "@/i18n/LanguageProvider";
import { type Locale } from "@/i18n/config";
import {
  type HomeTranslations,
  homeTranslations,
} from "./home-translations";

export type HomeLocale = Locale;

export interface HomeLanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: HomeTranslations;
}

/**
 * Compatibility wrapper for HomeLanguageProvider.
 * Global state is now centrally managed by the root LanguageProvider.
 */
export function HomeLanguageProvider({
  children,
}: {
  children: React.ReactNode;
  defaultLocale?: Locale;
}) {
  return <>{children}</>;
}

/**
 * Hook providing Home translations tied to global language state.
 */
export function useHomeLanguage(): HomeLanguageContextValue {
  const { locale, setLocale } = useLanguage();

  return {
    locale,
    setLocale,
    t: homeTranslations[locale],
  };
}
