"use client";

import { motion } from "framer-motion";
import type { AboutMeData, Locale } from "@/data/types";
import { useLanguage } from "@/components/LanguageThemeProvider";

function t(text: { en: string; ar: string }, locale: Locale) {
  return text[locale];
}

export function AboutSection({ data }: { data: AboutMeData }) {
  const { locale } = useLanguage();

  return (
    <section
      id="about"
      className="bg-slate-950 px-4 py-16 text-foreground sm:py-20"
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex-1 space-y-3"
        >
          <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            {locale === "en" ? "About Me" : "نبذة عني"}
          </h2>
          <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
            {t(data.about, locale)}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="flex-1 rounded-2xl border border-white/5 bg-slate-900/60 p-4 text-xs text-zinc-300 shadow-lg sm:p-5"
        >
          <p className="mb-2 font-medium text-zinc-200">
            {locale === "en" ? "Highlights" : "أهم النقاط"}
          </p>
          <ul className="space-y-1.5">
            <li>
              {locale === "en"
                ? "Petroleum & Gas Production Engineering student with 4+ years using Linux."
                : "طالب مهندس إنتاج بترول وغاز مع أكثر من ٤ سنوات استخدام لنظام Linux."}
            </li>
            <li>
              {locale === "en"
                ? "Experience with React Native, Python, Django, KivyMD, Qt5 and more."
                : "خبرة في React Native, Python, Django, KivyMD, Qt5 وغيرها."}
            </li>
            <li>
              {locale === "en"
                ? "Interested in AI and modern, user‑centered app design."
                : "مهتم بالذكاء الاصطناعي وتصميم التطبيقات الموجه للمستخدم."}
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

