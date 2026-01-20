"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useLanguage } from "./LanguageThemeProvider";
import type { Locale } from "@/data/types";

const sections = [
  { id: "hero", label: { en: "Home", ar: "الرئيسية" } },
  { id: "about", label: { en: "About", ar: "من أنا" } },
  { id: "skills", label: { en: "Skills", ar: "المهارات" } },
  { id: "projects", label: { en: "Projects", ar: "المشاريع" } },
  { id: "social", label: { en: "Social", ar: "الحسابات" } },
  { id: "contact", label: { en: "Contact", ar: "تواصل" } },
] as const;

function labelFor(locale: Locale, text: { en: string; ar: string }) {
  return text[locale];
}

export function Navbar({ name }: { name: string }) {
  const { theme, setTheme, systemTheme } = useTheme();
  const { locale, toggleLocale } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div
          className="cursor-pointer text-sm font-semibold tracking-tight text-zinc-100"
          onClick={() => handleScroll("hero")}
        >
          {name}
        </div>
        <div className="flex items-center gap-6">
          <ul className="hidden items-center gap-4 text-xs font-medium text-zinc-300 sm:flex">
            {sections.map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => handleScroll(s.id)}
                  className="rounded-full px-3 py-1 transition-colors hover:bg-zinc-800/70 hover:text-white dark:hover:bg-zinc-100/10"
                >
                  {labelFor(locale, s.label)}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <button
              onClick={toggleLocale}
              className="flex h-8 w-16 items-center justify-between rounded-full border border-zinc-700 bg-zinc-900/60 px-1 text-[11px] text-zinc-300 shadow-sm"
            >
              <span
                className={`flex-1 rounded-full py-0.5 text-center transition-colors ${
                  locale === "en" ? "bg-zinc-100 text-black" : ""
                }`}
              >
                EN
              </span>
              <span
                className={`flex-1 rounded-full py-0.5 text-center transition-colors ${
                  locale === "ar" ? "bg-zinc-100 text-black" : ""
                }`}
              >
                AR
              </span>
            </button>
            <button
              onClick={() =>
                setTheme(currentTheme === "dark" ? "light" : "dark")
              }
              className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 bg-zinc-900/60 text-zinc-300 shadow-sm"
              aria-label="Toggle theme"
            >
              {mounted && currentTheme === "dark" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </nav>
    </motion.header>
  );
}

