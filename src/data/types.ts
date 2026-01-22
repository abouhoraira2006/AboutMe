export type Locale = "en" | "ar";

export interface LocalizedText {
  en: string;
  ar: string;
}

export interface SkillCategory {
  category: LocalizedText;
  items: string[];
}

export interface Project {
  id: string;
  name: string;
  description?: LocalizedText;
  github?: string;
  googlePlay?: string;
  website?: string;
}

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  github1?: string;
  github2?: string;
  discord?: string;
  email?: string;
  youtube?: string;
  // allow extra arbitrary accounts (key -> url)
  extraAccounts?: Record<string, string>;
}

export interface AboutMeData {
  name: string;
  tagline: LocalizedText;
  about: LocalizedText;
  skills: SkillCategory[];
  projects: Project[];
  social: SocialLinks;
}

