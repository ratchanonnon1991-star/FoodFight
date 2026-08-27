"use client";

import * as React from "react";
import {
  type HomeLocale,
  type HomeTranslations,
  homeTranslations,
} from "./home-translations";

const STORAGE_KEY = "foodfighter_language";

interface HomeLanguageContextValue {
  locale: HomeLocale;
  setLocale: (locale: HomeLocale) => void;
  t: HomeTranslations;
}

const HomeLanguageContext = React.createContext<HomeLanguageContextValue | null>(
  null
);

export function HomeLanguageProvider({
  children,
  defaultLocale = "en",
}: {
  children: React.ReactNode;
  defaultLocale?: HomeLocale;
}) {
  const [locale, setLocaleState] = React.useState<HomeLocale>(defaultLocale);

  // Initialize from localStorage on mount
  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "th" || stored === "en") {
        setLocaleState(stored);
      }
    } catch {
      // Ignore localStorage access issues
    }
  }, []);

  const setLocale = React.useCallback((nextLocale: HomeLocale) => {
    setLocaleState(nextLocale);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLocale);
    } catch {
      // Ignore localStorage access issues
    }
  }, []);

  const value = React.useMemo<HomeLanguageContextValue>(
    () => ({
      locale,
      setLocale,
      t: homeTranslations[locale],
    }),
    [locale, setLocale]
  );

  return (
    <HomeLanguageContext.Provider value={value}>
      {children}
    </HomeLanguageContext.Provider>
  );
}

export function useHomeLanguage(): HomeLanguageContextValue {
  const context = React.useContext(HomeLanguageContext);
  if (!context) {
    // Fallback safe context if consumed outside provider
    return {
      locale: "en",
      setLocale: () => undefined,
      t: homeTranslations.en,
    };
  }
  return context;
}
