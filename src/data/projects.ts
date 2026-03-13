import type { Project } from './types';

export const projects: Project[] = [
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
