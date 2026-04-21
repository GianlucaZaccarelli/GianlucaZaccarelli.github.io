import type { Education, Locale } from './types';
import uniprLogo from '../assets/logos/unipr.jpg';
import itisLogo from '../assets/logos/itis.webp';

const educationIt: Education[] = [
  {
    institution: 'Università degli Studi di Parma',
    url: 'https://www.unipr.it',
    logo: uniprLogo,
    degree: 'Laurea Breve',
    field: 'Scienze e tecniche psicologiche per le sfide contemporanee',
    year: 'Sett. 2025 – In corso',
    description: [
      'Percorso universitario orientato allo sviluppo di competenze teoriche e pratiche.',
      'Approfondimento di temi contemporanei con un approccio multidisciplinare.',
      'Attenzione alla crescita personale e professionale all’interno del percorso di studi.',
    ],
  },
  {
    institution: 'I.T.I.S Galileo Galilei — San Secondo Parmense',
    url: 'https://poloagroindustriale.edu.it/',
    logo: itisLogo,
    degree: 'Diploma — Perito Informatico',
    field: 'Scienze Informatiche',
    year: '2012 – 2017',
    description: [
      'Percorso scolastico a indirizzo tecnico-informatico.',
      'Consolidamento delle basi scientifiche e informatiche, con un approccio concreto alla risoluzione dei problemi.',
      'Votazione finale: 70/100.',
    ],
  },
];

const educationEnOverride: Array<Partial<Education>> = [
  {
    institution: 'University of Parma',
    degree: "Bachelor's Degree",
    field: 'Psychological sciences and techniques for contemporary challenges',
    year: 'Sep 2025 - Ongoing',
    description: [
      'A university path focused on building solid theoretical and practical skills.',
      'Exploration of contemporary topics through a multidisciplinary approach.',
      'Attention to both personal and professional growth throughout the program.',
    ],
  },
  {
    institution: 'I.T.I.S Galileo Galilei - San Secondo Parmense',
    degree: 'Diploma - IT Technician',
    field: 'Computer Science',
    year: '2012 - 2017',
    description: [
      'Technical school path focused on scientific and IT subjects.',
      'Solid foundation built through a practical and methodical approach to concrete problems.',
      'Final grade: 70/100.',
    ],
  },
];

export function getEducation(locale: Locale = 'it'): Education[] {
  if (locale === 'it') {
    return educationIt;
  }

  return educationIt.map((item, index) => ({
    ...item,
    ...(educationEnOverride[index] ?? {}),
  }));
}

export const education = getEducation('it');
