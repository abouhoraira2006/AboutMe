"use client";

import type { AboutMeData } from "@/data/types";
import { useLanguage } from "./LanguageThemeProvider";

export function Footer({ data }: { data: AboutMeData }) {
  const { locale } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-slate-950/95 py-4 text-xs text-zinc-500">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 sm:flex-row">
        <span>
          © {year} {data.name}
        </span>
        <span>
          {locale === "en"
            ? "Built with Next.js, Tailwind CSS & Framer Motion."
            : "مصمم باستخدام Next.js و Tailwind CSS و Framer Motion."}
        </span>
      </div>
    </footer>
  );
}

