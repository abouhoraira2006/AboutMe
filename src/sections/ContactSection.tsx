"use client";

import { motion } from "framer-motion";
import type { AboutMeData } from "@/data/types";
import { useLanguage } from "@/components/LanguageThemeProvider";

export function ContactSection({ data }: { data: AboutMeData }) {
  const { locale } = useLanguage();
  const emailHref = data.social.email || "mailto:";

  return (
    <section
      id="contact"
      className="bg-slate-950 px-4 pb-16 pt-4 text-foreground sm:pb-20"
    >
      <div className="mx-auto max-w-5xl rounded-3xl border border-white/5 bg-slate-900/70 p-6 shadow-lg sm:p-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between"
        >
          <div className="space-y-2 text-sm">
            <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
              {locale === "en" ? "Let’s work together" : "خلينا نشتغل معًا"}
            </h2>
            <p className="max-w-md text-xs leading-relaxed text-zinc-300 sm:text-sm">
              {locale === "en"
                ? "Have an idea, app concept, or collaboration in mind? Reach out and let's talk."
                : "عندك فكرة، تطبيق، أو مشروع حاب نشتغل عليه؟ تواصل معي وخلينا نتكلم."}
            </p>
          </div>
          <a
            href={emailHref}
            className="mt-2 inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-2 text-sm font-medium text-slate-950 shadow-md transition-transform hover:-translate-y-0.5 hover:bg-emerald-400"
          >
            {locale === "en" ? "Email me" : "إرسال بريد إلكتروني"}
          </a>
        </motion.div>
      </div>
    </section>
  );
}

