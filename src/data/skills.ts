import type { Locale, Skill } from './types';
import { tr, type Localized } from './localize';

interface SkillEntry {
  category: Localized<string>;
  /** Competenze tecniche: finiscono anche nel `knowsAbout` del JSON-LD */
  technical: boolean;
  items: Localized<string>[];
}

const entries: SkillEntry[] = [
  {
    category: 'Backend',
    technical: true,
    items: [
      'C#',
      '.NET',
      'OpenAPI/Swagger',
      'API Versioning',
      'Backward Compatibility',
      'OAuth2',
      'OpenID Connect',
      'RabbitMQ',
      'Kafka',
      'Event-Driven Architecture',
      'Microsoft SQL Server',
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
      'Dart',
      'Flutter',
      'Responsive Design',
      { it: 'Accessibilità (WCAG)', en: 'Accessibility (WCAG)' },
      'State Management',
      'UI Performance (Core Web Vitals)',
      'Design Systems',
      'Form Validation',
    ],
  },
  {
    category: 'DevOps',
    technical: true,
    items: [
      'Docker',
      'Kubernetes',
      'Git',
      'GitHub',
      'NuGet',
      'CI/CD',
      'GitHub Actions',
      'Quality Gates',
      'Staging/Production Pipelines',
      'Azure',
      'AWS',
      'Grafana',
      'Logging & Monitoring',
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
  {
    category: 'Soft Skills & Tools',
    technical: false,
    items: [
      'Project Management',
      'Team Leadership',
      { it: 'Analisi dei requisiti', en: 'Requirements analysis' },
      'GDPR compliance',
      'Visual Studio',
      'Visual Studio Code',
      'Office Suite',
    ],
  },
];

export function getSkills(locale: Locale = 'it'): Skill[] {
  return entries.map((s) => ({
    category: tr(s.category, locale),
    items: s.items.map((item) => tr(item, locale)),
  }));
}

export function getKnowsAbout(locale: Locale = 'it'): string[] {
  return entries.filter((s) => s.technical).flatMap((s) => s.items.map((item) => tr(item, locale)));
}
