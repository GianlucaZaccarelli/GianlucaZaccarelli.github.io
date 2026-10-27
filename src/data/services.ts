import type { Locale, Service } from './types';
import { tr, type Localized } from './localize';

type ServiceEntry = {
  title: Localized<string>;
  description: Localized<string>;
  includes: Localized<string>[];
  proof: { label: Localized<string>; href: string }[];
};

// Ogni servizio cita il lavoro reale che lo dimostra (progetti o esperienza)
const entries: ServiceEntry[] = [
  {
    title: { it: 'Siti web su misura', en: 'Custom websites' },
    description: {
      it: 'Siti vetrina e portfolio per artisti, locali e professionisti: dal design alla messa online, veloci, accessibili e in due lingue quando serve.',
      en: 'Showcase and portfolio sites for artists, venues and professionals: from design to going live, fast, accessible and bilingual when needed.',
    },
    includes: [
      'Design',
      { it: 'Sviluppo in Astro', en: 'Built with Astro' },
      { it: 'Hosting e dominio', en: 'Hosting and domain' },
      { it: 'SEO di base', en: 'Core SEO' },
    ],
    proof: [
      { label: 'Face 2 Face Italia', href: '#projects' },
      { label: 'Giovanni Vitulano', href: '#projects' },
      { label: { it: 'questo sito', en: 'this website' }, href: '#projects' },
    ],
  },
  {
    title: { it: 'App web e gestionali', en: 'Web apps and business software' },
    description: {
      it: 'Applicazioni e gestionali su misura, dall’analisi dei requisiti al rilascio, con un backend solido e un’interfaccia che chi la usa ogni giorno capisce al volo.',
      en: 'Custom applications and business software, from requirements analysis to release, with a solid backend and an interface its daily users get at a glance.',
    },
    includes: [{ it: 'Analisi', en: 'Analysis' }, 'C# / .NET', 'TypeScript', 'SQL Server'],
    proof: [
      { label: { it: 'gestionale HR', en: 'HR platform' }, href: '#projects' },
      { label: { it: 'biglietteria S.I.A.E.', en: 'S.I.A.E. ticketing' }, href: '#projects' },
      { label: { it: 'app visitatori GDPR', en: 'GDPR visitor app' }, href: '#projects' },
    ],
  },
  {
    title: { it: 'Consulenza e body rental', en: 'Consulting and body rental' },
    description: {
      it: 'Un senior full-stack dentro il tuo team, per un progetto o per un periodo: sviluppo, analisi e supporto alle persone che lavorano sul codice.',
      en: 'A senior full-stack developer inside your team, for a project or a period: development, analysis and support for the people working on the code.',
    },
    includes: [{ it: 'Microservizi', en: 'Microservices' }, 'Docker', 'Kubernetes', 'CI/CD'],
    proof: [{ label: 'Code It Digital Solutions', href: '#experience' }],
  },
  {
    title: { it: 'Audit e ottimizzazione', en: 'Audit and optimization' },
    description: {
      it: 'Una revisione del sito che hai già: prestazioni, accessibilità e SEO, con un elenco di interventi in ordine di priorità e, se vuoi, la loro realizzazione.',
      en: 'A review of the site you already have: performance, accessibility and SEO, with a prioritized list of fixes and, if you like, their delivery.',
    },
    includes: ['Core Web Vitals', 'WCAG AA', { it: 'SEO tecnica', en: 'Technical SEO' }],
    proof: [{ label: { it: 'questo sito: Lighthouse 95–100', en: 'this website: Lighthouse 95–100' }, href: '#projects' }],
  },
];

export function getServices(locale: Locale = 'it'): Service[] {
  return entries.map((s) => ({
    title: tr(s.title, locale),
    description: tr(s.description, locale),
    includes: s.includes.map((i) => tr(i, locale)),
    proof: s.proof.map((p) => ({ label: tr(p.label, locale), href: p.href })),
  }));
}
