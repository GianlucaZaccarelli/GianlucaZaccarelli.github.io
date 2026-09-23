import type { Locale, Project } from './types';
import { tr, type Localized } from './localize';

type ProjectEntry = Omit<Project, 'title' | 'description'> & {
  title: Localized<string>;
  description: Localized<string>;
};

const entries: ProjectEntry[] = [
  {
    title: { it: 'Portfolio Personale v2', en: 'Personal Portfolio v2' },
    description: {
      it: 'Questo sito — portfolio personale statico realizzato con Astro e Tailwind CSS v4, deployato su GitHub Pages con GitHub Actions.',
      en: 'This website — a personal static portfolio built with Astro and Tailwind CSS v4, deployed on GitHub Pages via GitHub Actions.',
    },
    stack: ['Astro', 'TypeScript', 'Tailwind CSS', 'GitHub Actions'],
    demo: 'https://gianlucazaccarelli.github.io',
  },
  {
    title: { it: 'Sistema Biglietteria S.I.A.E.', en: 'S.I.A.E. Ticketing System' },
    description: {
      it: 'Software di biglietteria automatizzata certificato S.I.A.E. sviluppato e mantenuto durante il percorso in SiGrade S.p.A.',
      en: 'Automated ticketing software certified by S.I.A.E., developed and maintained during my experience at SiGrade S.p.A.',
    },
    stack: ['Full-Stack Web', 'SQL', 'GDPR compliance'],
  },
  {
    title: { it: 'App Gestione Visitatori (GDPR)', en: 'Visitor Management App (GDPR)' },
    description: {
      it: 'Applicazione per la gestione delle procedure di ingresso/uscita visitatori, conforme al GDPR. Progetto gestito in autonomia come Capo Progetto con un team di 3 stagisti.',
      en: 'Application for managing visitor check-in/check-out procedures, compliant with GDPR. Project managed autonomously as Project Lead with a team of 3 interns.',
    },
    stack: ['Full-Stack Web', 'SQL', 'GDPR'],
  },
  {
    title: { it: 'Gestionale Risorse HR', en: 'HR Resource Management Platform' },
    description: {
      it: 'Gestionale aziendale per la gestione e allocazione delle risorse umane e dei rapportini. Progettato e sviluppato per un cliente del settore fintech.',
      en: 'Corporate management platform for human resource allocation and timesheet reporting. Designed and developed for a fintech-sector client.',
    },
    stack: ['C#', 'Microservizi', 'Docker', 'Kubernetes'],
  },
];

export function getProjects(locale: Locale = 'it'): Project[] {
  return entries.map((p) => ({
    ...p,
    title: tr(p.title, locale),
    description: tr(p.description, locale),
  }));
}
