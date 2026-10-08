import type { Locale, Project } from './types';
import { tr, type Localized } from './localize';

type ProjectEntry = {
  [K in keyof Project]: K extends 'github' | 'demo'
    ? Project[K]
    : K extends 'stack'
      ? Localized<string>[]
      : Localized<Project[K]>;
};

// L'ordine segue la griglia di Projects.astro: in evidenza, normale, normale, larga
const entries: ProjectEntry[] = [
  {
    title: { it: 'App Gestione Visitatori (GDPR)', en: 'Visitor Management App (GDPR)' },
    role: { it: 'Capo progetto · team di 3 stagisti', en: 'Project lead · team of 3 interns' },
    description: {
      it: 'Applicazione per la gestione delle procedure di ingresso/uscita visitatori, conforme al GDPR. Progetto gestito in autonomia come Capo Progetto con un team di 3 stagisti.',
      en: 'Application for managing visitor check-in/check-out procedures, compliant with GDPR. Project managed autonomously as Project Lead with a team of 3 interns.',
    },
    stack: ['Full-Stack Web', 'SQL', 'GDPR', 'Project Management'],
  },
  {
    title: { it: 'Gestionale Risorse HR', en: 'HR Resource Management Platform' },
    role: { it: 'Analisi, progettazione e sviluppo', en: 'Analysis, design and development' },
    description: {
      it: 'Gestionale aziendale per la gestione e allocazione delle risorse umane e dei rapportini. Progettato e sviluppato per un cliente del settore fintech.',
      en: 'Corporate management platform for human resource allocation and timesheet reporting. Designed and developed for a fintech-sector client.',
    },
    stack: ['C#', { it: 'Microservizi', en: 'Microservices' }, 'Docker', 'Kubernetes'],
  },
  {
    title: { it: 'Questo sito', en: 'This website' },
    role: { it: 'Design e sviluppo', en: 'Design and development' },
    description: {
      it: 'Portfolio statico bilingue con CV in PDF generato in build da Puppeteer, deployato su GitHub Pages con GitHub Actions.',
      en: 'Bilingual static portfolio with a PDF CV generated at build time by Puppeteer, deployed on GitHub Pages via GitHub Actions.',
    },
    stack: ['Astro', 'TypeScript', 'Tailwind CSS', 'GitHub Actions'],
    github: 'https://github.com/GianlucaZaccarelli/GianlucaZaccarelli.github.io',
  },
  {
    title: { it: 'Sistema Biglietteria S.I.A.E.', en: 'S.I.A.E. Ticketing System' },
    role: { it: 'Sviluppo e manutenzione', en: 'Development and maintenance' },
    description: {
      it: 'Software di biglietteria automatizzata certificato S.I.A.E. sviluppato e mantenuto durante il percorso in SiGrade S.p.A.',
      en: 'Automated ticketing software certified by S.I.A.E., developed and maintained during my experience at SiGrade S.p.A.',
    },
    stack: ['Full-Stack Web', 'SQL', 'GDPR compliance'],
  },
];

export function getProjects(locale: Locale = 'it'): Project[] {
  return entries.map((p) => ({
    ...p,
    title: tr(p.title, locale),
    role: p.role && tr(p.role, locale),
    description: tr(p.description, locale),
    stack: p.stack.map((s) => tr(s, locale)),
  }));
}
