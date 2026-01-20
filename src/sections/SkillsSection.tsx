"use client";

import { motion } from "framer-motion";
import type { AboutMeData, Locale, SkillCategory } from "@/data/types";
import { useLanguage } from "@/components/LanguageThemeProvider";

function t(text: { en: string; ar: string }, locale: Locale) {
  return text[locale];
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: 0.05 * index, ease: "easeOut" as const },
  }),
};

export function SkillsSection({ data }: { data: AboutMeData }) {
  const { locale } = useLanguage();

  return (
    <section
      id="skills"
      className="bg-slate-950 px-4 py-16 text-foreground sm:py-20"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            {locale === "en" ? "Skills" : "المهارات"}
          </h2>
          <p className="text-xs text-zinc-400">
            {locale === "en"
              ? "A snapshot of tools and technologies I work with."
              : "نظرة سريعة على الأدوات والتقنيات التي أستخدمها."}
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.skills.map((skill: SkillCategory, index: number) => (
            <motion.div
              key={t(skill.category, locale)}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="group rounded-2xl border border-white/5 bg-slate-900/50 p-4 shadow-sm transition-transform hover:-translate-y-1 hover:border-emerald-500/60"
            >
              <p className="mb-2 text-sm font-semibold text-white">
                {t(skill.category, locale)}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-slate-800/70 px-2.5 py-1 text-[11px] text-zinc-200 transition-colors group-hover:bg-emerald-500/15 group-hover:text-emerald-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

