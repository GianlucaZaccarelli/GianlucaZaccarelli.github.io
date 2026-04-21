import type { Locale, Skill } from './types';

const skillsIt: Skill[] = [
  {
    category: 'Backend',
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
    items: [
      'JavaScript',
      'TypeScript',
      'HTML5',
      'CSS3',
      'Dart',
      'Flutter',
      'Responsive Design',
      'Accessibilita (WCAG)',
      'State Management',
      'UI Performance (Core Web Vitals)',
      'Design Systems',
      'Form Validation',
    ],
  },
  {
    category: 'DevOps',
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
    category: 'Soft Skills & Tools',
    items: [
      'Project Management',
      'Team Leadership',
      'Analisi dei requisiti',
      'GDPR compliance',
      'Visual Studio',
      'Visual Studio Code',
      'Office Suite',
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

const skillsEnItems: ReadonlyArray<ReadonlyArray<string>> = [
  [
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
  [
    'JavaScript',
    'TypeScript',
    'HTML5',
    'CSS3',
    'Dart',
    'Flutter',
    'Responsive Design',
    'Accessibility (WCAG)',
    'State Management',
    'UI Performance (Core Web Vitals)',
    'Design Systems',
    'Form Validation',
  ],
  [
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
  [
    'Project Management',
    'Team Leadership',
    'Requirements analysis',
    'GDPR compliance',
    'Visual Studio',
    'Visual Studio Code',
    'Office Suite',
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
];

export function getSkills(locale: Locale = 'it'): Skill[] {
  if (locale === 'it') {
    return skillsIt;
  }

  return skillsIt.map((skill, index) => ({
    ...skill,
    items: [...(skillsEnItems[index] ?? skill.items)],
  }));
}

export const skills = getSkills('it');
