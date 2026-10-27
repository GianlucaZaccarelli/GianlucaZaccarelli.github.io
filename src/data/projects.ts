import type { Locale, Project } from './types';
import { tr, type Localized } from './localize';

type ProjectEntry = {
  [K in keyof Project]: K extends 'github' | 'demo'
    ? Project[K]
    : K extends 'stack'
      ? Localized<string>[]
      : Localized<Project[K]>;
};

// L'ordine segue la griglia di Projects.astro: in evidenza + normale, poi a righe alterne normale + larga / larga + normale
const entries: ProjectEntry[] = [
  {
    title: { it: 'App Gestione Visitatori (GDPR)', en: 'Visitor Management App (GDPR)' },
    role: { it: 'Capo progetto · team di 3 stagisti', en: 'Project lead · team of 3 interns' },
    description: {
      it: 'Chi entra in azienda lascia dati personali: ingressi e uscite andavano registrati nel rispetto del GDPR. Ho gestito il progetto in autonomia, da capo progetto, coordinando 3 stagisti.',
      en: 'Every visitor leaves personal data at the door: check-ins and check-outs had to be recorded in line with GDPR. I ran the project autonomously as project lead, coordinating 3 interns.',
    },
    stack: ['Full-Stack Web', 'SQL', 'GDPR', 'Project Management'],
  },
  {
    title: { it: 'Gestionale Risorse HR', en: 'HR Resource Management Platform' },
    role: { it: 'Analisi, progettazione e sviluppo', en: 'Analysis, design and development' },
    description: {
      it: 'Un cliente fintech doveva gestire e allocare le proprie risorse e raccoglierne i rapportini. Ho curato analisi, progettazione e sviluppo del gestionale.',
      en: 'A fintech client needed to manage and allocate its people and collect their timesheets. I handled the analysis, design and development of the platform.',
    },
    stack: ['C#', { it: 'Microservizi', en: 'Microservices' }, 'Docker', 'Kubernetes'],
  },
  {
    title: 'Face 2 Face Italia',
    role: { it: 'Design e sviluppo', en: 'Design and development' },
    description: {
      it: 'Due DJ uno di fronte all’altro, a orecchio: il format presentato ai locali che possono ospitarlo. Accesso con password lato server, foto e video della serata, contatto diretto con il team.',
      en: 'Two DJs facing each other, playing by ear: the format pitched to the venues that could host it. Server-side password gate, photos and videos of the night, a direct line to the team.',
    },
    stack: ['Astro', 'Cloudflare Pages', 'Pages Functions'],
    demo: 'https://face2faceita.com',
  },
  {
    title: 'Giovanni Vitulano',
    role: { it: 'Design e sviluppo', en: 'Design and development' },
    description: {
      it: 'Portfolio di un producer e ingegnere di mix e mastering: crediti, lavori pubblicati e un modo semplice per gli artisti di mandargli una traccia.',
      en: 'Portfolio for a music producer and mixing & mastering engineer: credits, released work and an easy way for artists to send him a track.',
    },
    stack: ['Astro', 'PHP', 'Hostinger'],
    demo: 'https://giovannivitulano.com',
  },
  {
    title: { it: 'Questo sito', en: 'This website' },
    role: { it: 'Design e sviluppo', en: 'Design and development' },
    description: {
      it: 'Un CV che resta allineato in due lingue: sito e PDF nascono dagli stessi dati tipizzati. Il PDF lo genera Puppeteer in build, GitHub Actions pubblica tutto su GitHub Pages.',
      en: 'A CV that stays in sync in two languages: the site and the PDF come from the same typed data. Puppeteer renders the PDF at build time and GitHub Actions ships it all to GitHub Pages.',
    },
    stack: ['Astro', 'TypeScript', 'Tailwind CSS', 'GitHub Actions'],
    github: 'https://github.com/GianlucaZaccarelli/GianlucaZaccarelli.github.io',
  },
  {
    title: { it: 'Sistema Biglietteria S.I.A.E.', en: 'S.I.A.E. Ticketing System' },
    role: { it: 'Sviluppo e manutenzione', en: 'Development and maintenance' },
    description: {
      it: 'Una biglietteria automatizzata con certificazione S.I.A.E.: in SiGrade ne ho curato sviluppo e manutenzione.',
      en: 'Automated ticketing with S.I.A.E. certification: at SiGrade I developed and maintained it.',
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
