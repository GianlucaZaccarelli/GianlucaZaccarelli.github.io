import type { Experience, Locale } from './types';
import { tr, type Localized } from './localize';
import codeitLogo from '../assets/logos/codeit.webp';
import carusoLogo from '../assets/logos/caruso.webp';
import sigradeLogo from '../assets/logos/sigrade.webp';

type ExperienceEntry = {
  [K in keyof Experience]: K extends 'logo' | 'url' ? Experience[K] : Localized<Experience[K]>;
};

const entries: ExperienceEntry[] = [
  {
    company: 'Code It Digital Solutions S.r.l.',
    url: 'https://www.linkedin.com/company/code-it-digital-solutions-s-r-l/',
    logo: codeitLogo,
    role: 'Senior Full‑Stack Developer',
    period: { it: 'Set 2024 – Presente', en: 'Sep 2024 – Present' },
    location: 'Parma (PR) — Body Rental',
    description: {
      it: [
        'In body rental sviluppo software e faccio consulenza per i clienti, su soluzioni gestionali e bancarie.',
        'Gestionale HR: ho curato analisi funzionale, progettazione e implementazione del sistema per risorse e rapportini.',
        'Settore bancario: app per la gestione dei contratti, integrazione con i sistemi bancari e digitalizzazione dei documenti.',
        'Stack: C# · Docker · Kubernetes · Git · CI/CD · Microservizi.',
      ],
      en: [
        'In body rental I build software and consult for clients on management and banking solutions.',
        'HR platform: I handled the functional analysis, design and implementation of the resource and timesheet system.',
        'Banking: contract-management apps, integration with banking systems and document digitalization.',
        'Stack: C# · Docker · Kubernetes · Git · CI/CD · Microservices.',
      ],
    },
  },
  {
    company: 'Raffaele Caruso S.p.A.',
    url: 'https://carusomenswear.com/',
    logo: carusoLogo,
    role: 'IT Management & Dev‑Analyst',
    period: { it: 'Mar 2022 – Lug 2024', en: 'Mar 2022 – Jul 2024' },
    location: 'Soragna (PR)',
    description: {
      it: [
        "Affiancavo l'IT Manager e il sistemista in un'azienda leader della sartoria di alta moda.",
        "Analizzavo i requisiti e ne valutavo la fattibilità, poi sviluppavo le procedure e ne curavo il debug; ho mantenuto ed esteso l'ERP aziendale.",
        'Dopo i rilasci supportavo gli utenti e gestivo i problemi infrastrutturali.',
        'Stack: JavaScript · Ext.js Sencha · .NET ASPX · HTML · CSS · Microsoft SQL Server · Crystal Reports.',
      ],
      en: [
        'I worked alongside the IT Manager and the system administrator at a leading high-end tailoring company.',
        'I analysed requirements and assessed feasibility, then built and debugged the procedures; I maintained and extended the corporate ERP.',
        'After releases I supported users and handled infrastructure issues.',
        'Stack: JavaScript · Ext.js Sencha · .NET ASPX · HTML · CSS · Microsoft SQL Server · Crystal Reports.',
      ],
    },
  },
  {
    company: 'SiGrade S.p.A.',
    url: 'https://www.sigrade.it',
    logo: sigradeLogo,
    role: 'Full‑Stack Developer (Junior → Senior)',
    period: { it: 'Set 2017 – Mar 2022', en: 'Sep 2017 – Mar 2022' },
    location: 'Parma (PR)',
    description: {
      it: [
        'Tirocinio (2017–2018): COBOL su MainFrame e test della procedura di digitalizzazione degli assegni.',
        'Middle Developer (2018–2021): app GDPR-compliant e gestione visitatori; da capo progetto ho coordinato 3 stagisti.',
        'Senior Developer (2021–2022): stimavo i progetti; sviluppavo e mantenevo il gestionale aziendale e la biglietteria certificata S.I.A.E.',
        'Stack: COBOL · MainFrame · Full-Stack Web · GDPR compliance · Project Management.',
      ],
      en: [
        'Internship (2017–2018): COBOL on MainFrame and testing of the bank check digitalization procedure.',
        'Middle Developer (2018–2021): GDPR-compliant apps and visitor management; as project lead I coordinated 3 interns.',
        'Senior Developer (2021–2022): I estimated projects; I built and maintained the corporate management system and the S.I.A.E.-certified ticketing system.',
        'Stack: COBOL · MainFrame · Full-Stack Web · GDPR compliance · Project Management.',
      ],
    },
  },
];

/**
 * Separa la voce finale "Stack: A · B · C." dai bullet descrittivi.
 */
export function splitStack(description: string[]): { bullets: string[]; stack: string[] } {
  const stackItem = description.find((d) => d.startsWith('Stack:'));
  return {
    bullets: description.filter((d) => !d.startsWith('Stack:')),
    stack: stackItem
      ? stackItem
          .replace(/^Stack:\s*/, '')
          .replace(/\.$/, '')
          .split(/\s*·\s*/)
      : [],
  };
}

export function getExperience(locale: Locale = 'it'): Experience[] {
  return entries.map((e) => ({
    ...e,
    company: tr(e.company, locale),
    role: tr(e.role, locale),
    period: tr(e.period, locale),
    location: tr(e.location, locale),
    description: tr(e.description, locale),
  }));
}
