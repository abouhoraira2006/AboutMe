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
  return (
    <div className="min-h-screen bg-slate-950 text-foreground">
      <Navbar name={aboutData.name} />
      <main className="pt-16">
        <Hero data={aboutData} />
        <AboutSection data={aboutData} />
        <SkillsSection data={aboutData} />
        <ProjectsSection data={aboutData} />
        <SocialSection data={aboutData} />
        <ContactSection data={aboutData} />
      </main>
      <Footer data={aboutData} />
    </div>
  );
}

