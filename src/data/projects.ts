import type { Locale, Project } from './types';

const projectsIt: Project[] = [
  {
    title: 'Portfolio Personale v2',
    description: 'Questo sito — portfolio personale statico realizzato con Astro e Tailwind CSS v4, deployato su GitHub Pages con GitHub Actions.',
    stack: ['Astro', 'TypeScript', 'Tailwind CSS', 'GitHub Actions'],
    demo: 'https://gianlucazaccarelli.github.io',
  },
  {
    title: 'Sistema Biglietteria S.I.A.E.',
    description: 'Software di biglietteria automatizzata certificato S.I.A.E. sviluppato e mantenuto durante il percorso in SiGrade S.p.A.',
    stack: ['Full-Stack Web', 'SQL', 'GDPR compliance'],
  },
  {
    title: 'App Gestione Visitatori (GDPR)',
    description: 'Applicazione per la gestione delle procedure di ingresso/uscita visitatori, conforme al GDPR. Progetto gestito in autonomia come Capo Progetto con un team di 3 stagisti.',
    stack: ['Full-Stack Web', 'SQL', 'GDPR'],
  },
  {
    title: 'Gestionale Risorse HR',
    description: 'Gestionale aziendale per la gestione e allocazione delle risorse umane e dei rapportini. Progettato e sviluppato per un cliente del settore fintech.',
    stack: ['C#', 'Microservizi', 'Docker', 'Kubernetes'],
  },
];

const projectsEnOverride: Array<Partial<Project>> = [
  {
    title: 'Personal Portfolio v2',
    description:
      'This website - a personal static portfolio built with Astro and Tailwind CSS v4, deployed on GitHub Pages via GitHub Actions.',
  },
  {
    title: 'S.I.A.E. Ticketing System',
    description:
      'Automated ticketing software certified by S.I.A.E., developed and maintained during my experience at SiGrade S.p.A.',
  },
  {
    title: 'Visitor Management App (GDPR)',
    description:
      'Application for managing visitor check-in/check-out procedures, compliant with GDPR. Project managed autonomously as Project Lead with a team of 3 interns.',
  },
  {
    title: 'HR Resource Management Platform',
    description:
      'Corporate management platform for human resource allocation and timesheet reporting. Designed and developed for a fintech-sector client.',
  },
];

export function getProjects(locale: Locale = 'it'): Project[] {
  if (locale === 'it') {
    return projectsIt;
  }

  return projectsIt.map((project, index) => ({
    ...project,
    ...(projectsEnOverride[index] ?? {}),
  }));
}

export const projects = getProjects('it');
