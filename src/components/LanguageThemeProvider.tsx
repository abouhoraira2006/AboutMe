"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import type { Locale } from "@/data/types";

interface LanguageContextValue {
  locale: Locale;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageThemeProvider");
  }
  return ctx;
}

interface Props {
  children: React.ReactNode;
}

export function LanguageThemeProvider({ children }: Props) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("aboutme-locale") as Locale | null;
    if (stored === "ar" || stored === "en") {
      setLocale(stored);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    window.localStorage.setItem("aboutme-locale", locale);
  }, [locale]);

  const value: LanguageContextValue = {
    locale,
    toggleLocale: () => {
      setLocale((prev) => (prev === "en" ? "ar" : "en"));
    },
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
    </ThemeProvider>
  );
}

