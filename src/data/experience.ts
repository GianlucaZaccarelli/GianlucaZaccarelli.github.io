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
      'Sviluppo software e consulenza in ambito informatico in modalità body rental su soluzioni gestionali e bancarie.',
      'Gestionale HR: analisi funzionale, progettazione e implementazione di un sistema per la gestione delle risorse e dei rapportini aziendali.',
      'Settore bancario/assicurativo: sviluppo di applicazioni per la gestione dei contratti assicurativi, integrazione con sistemi bancari e digitalizzazione documentale.',
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
      "Unica risorsa IT a supporto dell'IT Manager e del Sistemista in un'azienda leader nella sartoria di alta moda.",
      "Analisi delle esigenze, valutazione di fattibilità, sviluppo e debug di procedure software; manutenzione ed estensione dell'ERP aziendale.",
      'Supporto agli utenti a seguito di rilasci applicativi e gestione delle problematiche infrastrutturali.',
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
      'Tirocinio (set 2017 – mar 2018): sviluppo in COBOL su sistemi MainFrame e test sulla procedura di digitalizzazione degli assegni bancari.',
      "Middle Developer in apprendistato (mar 2018 – mar 2021): sviluppo app GDPR-compliant per la gestione ingresso/uscita visitatori; Capo Progetto con coordinamento di un team di 3 stagisti.",
      'Senior Developer (apr 2021 – mar 2022): redazione stime di progetto, sviluppo e manutenzione del gestionale aziendale e del sistema di biglietteria automatizzata certificato S.I.A.E.',
      'Stack: COBOL · MainFrame · Full-Stack Web · GDPR compliance · Project Management.',
    ],
  },
];

const experienceEnDescriptions = [
  [
    'Software development and IT consulting in body rental mode on management and banking solutions.',
    'HR management system: functional analysis, design, and implementation of a system for resource management and company timesheet reporting.',
    'Banking/insurance domain: development of applications for insurance contract management, integration with banking systems, and document digitalization.',
    'Stack: C# · Docker · Kubernetes · Git · CI/CD · Microservices.',
  ],
  [
    'Sole IT resource supporting the IT Manager and System Administrator in a leading high-end tailoring company.',
    'Requirements analysis, feasibility assessment, development and debugging of software procedures, and maintenance/extension of the corporate ERP.',
    'User support after application releases and management of infrastructure-related issues.',
    'Stack: JavaScript · Ext.js Sencha · .NET ASPX · HTML · CSS · Microsoft SQL Server · Crystal Reports.',
  ],
  [
    'Internship (Sep 2017 - Mar 2018): COBOL development on MainFrame systems and testing on the bank check digitalization procedure.',
    'Middle Developer apprenticeship (Mar 2018 - Mar 2021): development of GDPR-compliant apps for visitor check-in/check-out management; Project Lead coordinating a team of 3 interns.',
    'Senior Developer (Apr 2021 - Mar 2022): project estimation drafting, development and maintenance of the corporate management system, and the automated ticketing system certified by S.I.A.E.',
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
