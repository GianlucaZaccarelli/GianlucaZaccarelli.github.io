import type { ImageMetadata } from 'astro';

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
  description?: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Project {
  title: string;
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
