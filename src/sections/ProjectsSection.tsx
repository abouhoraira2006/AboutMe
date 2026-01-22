"use client";

import { motion } from "framer-motion";
import type { AboutMeData, Locale, Project } from "@/data/types";
import { useLanguage } from "@/components/LanguageThemeProvider";
import { FaGlobe } from "react-icons/fa";

function tOptional(text: { en: string; ar: string } | undefined, locale: Locale) {
  if (!text) return "";
  return text[locale];
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: 0.06 * index, ease: "easeOut" as const },
  }),
};

export function ProjectsSection({ data }: { data: AboutMeData }) {
  const { locale } = useLanguage();

  return (
    <section
      id="projects"
      className="bg-slate-950 px-4 py-16 text-foreground sm:py-20"
    >
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
            {locale === "en" ? "Projects" : "المشاريع"}
          </h2>
          <p className="text-xs text-zinc-400">
            {locale === "en"
              ? "Selected apps and projects from GitHub and Google Play."
              : "مجموعة مختارة من التطبيقات والمشاريع على GitHub و Google Play."}
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {data.projects.map((project: Project, index: number) => (
            <motion.article
              key={project.id || project.name}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="group flex h-full flex-col rounded-2xl border border-white/5 bg-slate-900/60 p-4 shadow-sm transition-transform hover:-translate-y-1 hover:border-emerald-500/70"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-white">
                  {project.name}
                </h3>
                {project.googlePlay ? (
                  <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] text-emerald-300">
                    {locale === "en" ? "Google Play" : "متوفر على Google Play"}
                  </span>
                ) : null}
              </div>
              {project.description && (
                <p className="mb-3 text-xs leading-relaxed text-zinc-300">
                  {tOptional(project.description, locale)}
                </p>
              )}
              <div className="mt-auto flex gap-2 pt-2 text-xs">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-emerald-500/40 bg-slate-900/70 px-3 py-1 text-emerald-200 transition-colors group-hover:bg-emerald-500/10"
                  >
                    <span>GitHub</span>
                  </a>
                )}
                {project.googlePlay && (
                  <a
                    href={project.googlePlay}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-sky-500/40 bg-slate-900/70 px-3 py-1 text-sky-200 transition-colors group-hover:bg-sky-500/10"
                  >
                    <span>
                      {locale === "en" ? "Google Play" : "Google Play"}
                    </span>
                  </a>
                )}
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-emerald-500/40 bg-slate-900/70 px-3 py-1 text-emerald-200 transition-colors group-hover:bg-emerald-500/10"
                  >
                    <FaGlobe className="text-base" />
                    <span>{locale === "en" ? "Website" : "Website"}</span>
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

