"use client";

import * as React from "react";
import {
  type Locale,
  DEFAULT_LOCALE,
  STORAGE_KEY,
} from "./config";

export interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

export interface LanguageProviderProps {
  children: React.ReactNode;
  defaultLocale?: Locale;
}

export function LanguageProvider({
  children,
  defaultLocale = DEFAULT_LOCALE,
}: LanguageProviderProps) {
  const [locale, setLocaleState] = React.useState<Locale>(defaultLocale);

  // Initialize from localStorage on client mount
  React.useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "th" || stored === "en") {
        setLocaleState(stored);
      }
    } catch {
      // Ignore localStorage access restrictions
    }
  }, []);

  const setLocale = React.useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLocale);
    } catch {
      // Ignore localStorage access restrictions
    }
  }, []);

  const value = React.useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale,
    }),
    [locale, setLocale]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = React.useContext(LanguageContext);
  if (!context) {
    // Safe fallback if consumed outside provider
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => undefined,
    };
  }
  return context;
}
