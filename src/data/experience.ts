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
    role: 'Senior Full-Stack Developer',
    period: { it: 'Set 2024 – Presente', en: 'Sep 2024 – Present' },
    location: 'Parma (PR) — Body Rental',
    description: {
      it: [
        'Sviluppo software e consulenza su soluzioni gestionali e bancarie in modalità body rental.',
        'Gestionale HR: analisi funzionale, progettazione e implementazione di un sistema per la gestione delle risorse e dei rapportini.',
        'Settore bancario: sviluppo app gestione contratti, integrazione sistemi bancari e digitalizzazione documentale.',
        'Stack: C# · Docker · Kubernetes · Git · CI/CD · Microservizi.',
      ],
      en: [
        'Software development and IT consulting on management and banking solutions in body rental mode.',
        'HR management system: functional analysis, design, and implementation of a system for resource and timesheet management.',
        'Banking domain: applications for contract management, banking systems integration, and document digitalization.',
        'Stack: C# · Docker · Kubernetes · Git · CI/CD · Microservices.',
      ],
    },
  },
  {
    company: 'Raffaele Caruso S.p.A.',
    url: 'https://carusomenswear.com/',
    logo: carusoLogo,
    role: 'IT Management & Dev-Analyst',
    period: { it: 'Mar 2022 – Lug 2024', en: 'Mar 2022 – Jul 2024' },
    location: 'Soragna (PR)',
    description: {
      it: [
        "Supporto all'IT Manager e Sistemista in un'azienda leader nella sartoria di alta moda.",
        "Analisi, valutazione fattibilità, sviluppo e debugging procedure software; manutenzione ed estensione dell'ERP aziendale.",
        'Supporto agli utenti post-rilascio e gestione delle problematiche infrastrutturali.',
        'Stack: JavaScript · Ext.js Sencha · .NET ASPX · HTML · CSS · Microsoft SQL Server · Crystal Reports.',
      ],
      en: [
        'IT resource supporting IT Manager and System Administrator in a leading high-end tailoring company.',
        'Requirements analysis, feasibility assessment, development and debugging of software; maintenance/extension of corporate ERP.',
        'User support after releases and infrastructure-related issue management.',
        'Stack: JavaScript · Ext.js Sencha · .NET ASPX · HTML · CSS · Microsoft SQL Server · Crystal Reports.',
      ],
    },
  },
  {
    company: 'SiGrade S.p.A.',
    url: 'https://www.sigrade.it',
    logo: sigradeLogo,
    role: 'Full-Stack Developer (Junior → Senior)',
    period: { it: 'Set 2017 – Mar 2022', en: 'Sep 2017 – Mar 2022' },
    location: 'Parma (PR)',
    description: {
      it: [
        'Tirocinio (2017–2018): sviluppo COBOL su sistemi MainFrame e test su procedura digitalizzazione assegni.',
        'Middle Developer (2018–2021): sviluppo app GDPR-compliant e gestione visitatori; Capo Progetto con coordinamento di 3 stagisti.',
        'Senior Developer (2021–2022): stime di progetto, sviluppo e manutenzione gestionale aziendale e sistema biglietteria certificato S.I.A.E.',
        'Stack: COBOL · MainFrame · Full-Stack Web · GDPR compliance · Project Management.',
      ],
      en: [
        'Internship (2017–2018): COBOL development on MainFrame systems and testing on bank check digitalization.',
        'Middle Developer (2018–2021): development of GDPR-compliant apps and visitor management; Project Lead with 3 interns.',
        'Senior Developer (2021–2022): project estimation, development and maintenance of corporate management and S.I.A.E.-certified ticketing systems.',
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
