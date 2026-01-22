"use client";

import { useRemoteData } from "@/lib/useRemoteData";
import data from "@/data/aboutme.json";
import type { AboutMeData } from "@/data/types";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/sections/Hero";
import { AboutSection } from "@/sections/AboutSection";
import { SkillsSection } from "@/sections/SkillsSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { SocialSection } from "@/sections/SocialSection";
import { ContactSection } from "@/sections/ContactSection";
import { Footer } from "@/components/Footer";

const aboutData = data as AboutMeData;

export default function Home() {
  const { data: remote, loading } = useRemoteData();
  const about = (remote ?? aboutData) as AboutMeData;

  return (
    <div className="min-h-screen bg-slate-950 text-foreground">
      <Navbar name={about.name} />
      <main className="pt-16">
        <div className="mx-auto max-w-5xl px-4 py-4">
          {typeof window !== "undefined" && sessionStorage.getItem("admin_token") ? (
            <a href="/admin" className="text-xs text-zinc-400">Admin</a>
          ) : null}
        </div>
        <Hero data={about} />
        <AboutSection data={about} />
        <SkillsSection data={about} />
        <ProjectsSection data={about} />
        <SocialSection data={about} />
        <ContactSection data={about} />
      </main>
      <Footer data={about} />
    </div>
  );
}

