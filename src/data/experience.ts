import type { Experience, Locale } from './types';
import codeitLogo from '../assets/logos/codeit.jpg';
import carusoLogo from '../assets/logos/caruso.jpg';
import sigradeLogo from '../assets/logos/sigrade.jpg';

const experienceIt: Experience[] = [
  {
    company: 'Code It Digital Solutions S.r.l.',
    url: 'https://www.linkedin.com/company/code-it-digital-solutions-s-r-l/',
    logo: codeitLogo,
    role: 'Senior Full-Stack Developer',
    period: 'Set 2024 – Presente',
    location: 'Parma (PR) — Body Rental',
    description: [
      'Sviluppo software e consulenza su soluzioni gestionali e bancarie in modalità body rental.',
      'Gestionale HR: analisi funzionale, progettazione e implementazione di un sistema per la gestione delle risorse e dei rapportini.',
      'Settore bancario: sviluppo app gestione contratti, integrazione sistemi bancari e digitalizzazione documentale.',
      'Stack: C# · Docker · Kubernetes · Git · CI/CD · Microservizi.',
    ],
  },
  {
    company: 'Raffaele Caruso S.p.A.',
    url: 'https://carusomenswear.com/',
    logo: carusoLogo,
    role: 'IT Management & Dev-Analyst',
    period: 'Mar 2022 – Lug 2024',
    location: 'Soragna (PR)',
    description: [
      "Supporto all'IT Manager e Sistemista in un'azienda leader nella sartoria di alta moda.",
      "Analisi, valutazione fattibilità, sviluppo e debugging procedure software; manutenzione ed estensione dell'ERP aziendale.",
      'Supporto agli utenti post-rilascio e gestione delle problematiche infrastrutturali.',
      'Stack: JavaScript · Ext.js Sencha · .NET ASPX · HTML · CSS · Microsoft SQL Server · Crystal Reports.',
    ],
  },
  {
    company: 'SiGrade S.p.A.',
    url: 'https://www.sigrade.it',
    logo: sigradeLogo,
    role: 'Full-Stack Developer (Junior → Senior)',
    period: 'Set 2017 – Mar 2022',
    location: 'Parma (PR)',
    description: [
      'Tirocinio (2017–2018): sviluppo COBOL su sistemi MainFrame e test su procedura digitalizzazione assegni.',
      'Middle Developer (2018–2021): sviluppo app GDPR-compliant e gestione visitatori; Capo Progetto con coordinamento di 3 stagisti.',
      'Senior Developer (2021–2022): stime di progetto, sviluppo e manutenzione gestionale aziendale e sistema biglietteria certificato S.I.A.E.',
      'Stack: COBOL · MainFrame · Full-Stack Web · GDPR compliance · Project Management.',
    ],
  },
];

const experienceEnDescriptions = [
  [
    'Software development and IT consulting on management and banking solutions in body rental mode.',
    'HR management system: functional analysis, design, and implementation of a system for resource and timesheet management.',
    'Banking domain: applications for contract management, banking systems integration, and document digitalization.',
    'Stack: C# · Docker · Kubernetes · Git · CI/CD · Microservices.',
  ],
  [
    'IT resource supporting IT Manager and System Administrator in a leading high-end tailoring company.',
    'Requirements analysis, feasibility assessment, development and debugging of software; maintenance/extension of corporate ERP.',
    'User support after releases and infrastructure-related issue management.',
    'Stack: JavaScript · Ext.js Sencha · .NET ASPX · HTML · CSS · Microsoft SQL Server · Crystal Reports.',
  ],
  [
    'Internship (2017–2018): COBOL development on MainFrame systems and testing on bank check digitalization.',
    'Middle Developer (2018–2021): development of GDPR-compliant apps and visitor management; Project Lead with 3 interns.',
    'Senior Developer (2021–2022): project estimation, development and maintenance of corporate management and automated ticketing systems.',
    'Stack: COBOL · MainFrame · Full-Stack Web · GDPR compliance · Project Management.',
  ],
] as const;

const experienceEnOverride: Array<Partial<Experience>> = [
  {
    period: 'Sep 2024 - Present',
    location: 'Parma (PR) - Body Rental',
    description: [],
  },
  {
    period: 'Mar 2022 - Jul 2024',
    description: [],
  },
  {
    period: 'Sep 2017 - Mar 2022',
    description: [],
  },
];

export function getExperience(locale: Locale = 'it'): Experience[] {
  if (locale === 'it') {
    return experienceIt;
  }

  return experienceIt.map((job, index) => {
    const override = experienceEnOverride[index] ?? {};
    const draftDescription = experienceEnDescriptions[index] ?? [];
    const description = draftDescription.length ? [...draftDescription] : job.description;

    return {
      ...job,
      ...override,
      description,
    };
  });
}

export const experience = getExperience('it');
