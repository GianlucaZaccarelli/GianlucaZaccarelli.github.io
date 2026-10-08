import type { Locale, Skill } from './types';
import { tr, type Localized } from './localize';

interface SkillEntry {
  category: Localized<string>;
  /** Competenze tecniche: finiscono anche nel `knowsAbout` del JSON-LD */
  technical: boolean;
  items: Localized<string>[];
}

// In ogni cluster le voci sono in ordine di rilevanza: su mobile si vedono le prime
const entries: SkillEntry[] = [
  {
    category: { it: 'Leadership & metodo', en: 'Leadership & method' },
    technical: false,
    items: [
      'Team Leadership',
      'Project Management',
      { it: 'Analisi dei requisiti', en: 'Requirements analysis' },
      { it: 'Stime di progetto', en: 'Project estimation' },
      'GDPR compliance',
    ],
  },
  {
    category: 'Backend',
    technical: true,
    items: [
      'C#',
      '.NET',
      'Microsoft SQL Server',
      'OpenAPI/Swagger',
      'OAuth2',
      'OpenID Connect',
      'Event-Driven Architecture',
      'RabbitMQ',
      'Kafka',
      'API Versioning',
      'Backward Compatibility',
      'Visual Studio',
    ],
  },
  {
    category: 'Frontend',
    technical: true,
    items: [
      'JavaScript',
      'TypeScript',
      'HTML5',
      'CSS3',
      { it: 'Accessibilità (WCAG)', en: 'Accessibility (WCAG)' },
      'Design Systems',
      'Responsive Design',
      'UI Performance (Core Web Vitals)',
      'State Management',
      'Form Validation',
      'Dart',
      'Flutter',
      'Visual Studio Code',
    ],
  },
  {
    category: 'DevOps',
    technical: true,
    items: [
      'Docker',
      'Kubernetes',
      'CI/CD',
      'GitHub Actions',
      'Git',
      'GitHub',
      'Azure',
      'AWS',
      'Grafana',
      'Logging & Monitoring',
      'Quality Gates',
      'Staging/Production Pipelines',
      'NuGet',
    ],
  },
  {
    category: { it: 'Testing & Qualità', en: 'Testing & Quality' },
    technical: true,
    items: [
      'Playwright',
      'Unit Testing',
      'Integration Testing',
      'API Testing',
      'E2E Testing',
      'Coverage Analysis',
      'Performance Profiling',
      'Query Optimization',
      'OWASP',
    ],
  },
];

/** Gli strumenti di tutti i giorni, mostrati in evidenza sopra i cluster */
const core: string[] = ['C#', '.NET', 'TypeScript', 'Microsoft SQL Server', 'Docker', 'Kubernetes', 'CI/CD', 'Git'];

export function getCoreSkills(): string[] {
  return core;
}

export function getSkills(locale: Locale = 'it'): Skill[] {
  return entries.map((s) => ({
    category: tr(s.category, locale),
    items: s.items.map((item) => tr(item, locale)),
  }));
}

export function getKnowsAbout(locale: Locale = 'it'): string[] {
  return entries.filter((s) => s.technical).flatMap((s) => s.items.map((item) => tr(item, locale)));
}
