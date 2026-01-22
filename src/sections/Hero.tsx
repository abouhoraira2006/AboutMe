"use client";

import { motion } from "framer-motion";
import type { AboutMeData, Locale } from "@/data/types";
import { useLanguage } from "@/components/LanguageThemeProvider";

const floatingVariants = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
};

function t(text: { en: string; ar: string }, locale: Locale) {
  return text[locale];
}

export function Hero({ data }: { data: AboutMeData }) {
  const { locale } = useLanguage();

  return (
    <section
      id="hero"
      className="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 pt-8 text-foreground"
    >
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="bg-radial from-emerald-500/10 via-transparent to-transparent absolute -left-40 top-10 h-72 w-72 rounded-full blur-3xl" />
        <div className="bg-radial from-sky-500/10 via-transparent to-transparent absolute bottom-0 right-0 h-80 w-80 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-10 md:flex-row md:items-center md:justify-between">
        <motion.div
          initial={{ opacity: 0, x: locale === "ar" ? 40 : -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-xl space-y-5 text-center md:text-start"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-400">
            {locale === "en" ? "Portfolio" : "موقع شخصي"}
          </p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {data.name}
          </h1>
          <p className="text-sm font-medium text-emerald-300 sm:text-base">
            {t(data.tagline, locale)}
          </p>
          <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
            {t(data.about, locale)}
          </p>
        </motion.div>

        <motion.div
          className="relative mt-4 h-40 w-40 md:mt-0 md:h-52 md:w-52"
          variants={floatingVariants}
          animate="animate"
        >
          <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-emerald-500/80 via-sky-500/60 to-purple-500/60 opacity-70 blur-2xl" />
          <div className="relative flex h-full w-full items-center justify-center rounded-3xl border border-white/10 bg-slate-900/70 backdrop-blur-xl">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[11px] uppercase tracking-[0.25em] text-zinc-400">
                {locale === "en" ? "Available For" : "متاح لـ"}
              </span>
              <span className="rounded-full bg-slate-800/80 px-4 py-1 text-xs text-emerald-300">
                {locale === "en" ? "App & Web Projects" : "مشاريع تطبيقات وويب"}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

