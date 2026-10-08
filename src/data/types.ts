import type { ImageMetadata } from 'astro';

export type Locale = 'it' | 'en';

export interface Profile {
  name: string;
  nickname: string;
  title: string;
  titleLead: string;
  titleRest: string;
  bio: string;
  bioParagraphs: readonly string[];
  mbti: string;
  location: string;
  city: string;
  country: string;
  languages: readonly string[];
  availability: string;
  /** Riga per chi scorre in fretta: anni, stack, ruolo */
  facts: string;
  /** Frase-aggancio dell'hero */
  hook: string;
  email: string;
  cvPath: string;
}

export interface Experience {
  company: string;
  url?: string;
  logo?: ImageMetadata;
  role: string;
  period: string;
  location: string;
  description: string[];
}

export interface Education {
  institution: string;
  url?: string;
  logo?: ImageMetadata;
  degree: string;
  field: string;
  year: string;
  description?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Project {
  title: string;
  /** Ruolo ricoperto nel progetto, mostrato in mono sotto il titolo */
  role?: string;
  description: string;
  stack: string[];
  github?: string;
  demo?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface PersonalPhoto {
  image: ImageMetadata;
  /** Descrizione per chi non vede la foto */
  alt: string;
  /** Didascalia breve sotto la foto (facoltativa) */
  caption?: string;
}

export interface PersonalChapter {
  kicker: string;
  body: string;
}

export interface Personal {
  title: string;
  titleEm: string;
  /** Riga mono sotto il titolo (anno di nascita) */
  since: string;
  lead: string;
  chapters: PersonalChapter[];
  note: string;
  photos: PersonalPhoto[];
}
