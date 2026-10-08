import type { Education, Locale } from './types';
import { tr, type Localized } from './localize';
import uniprLogo from '../assets/logos/unipr.webp';
import itisLogo from '../assets/logos/itis.webp';

type EducationEntry = {
  [K in keyof Education]: K extends 'logo' | 'url' ? Education[K] : Localized<Education[K]>;
};

const entries: EducationEntry[] = [
  {
    institution: { it: 'Università degli Studi di Parma', en: 'University of Parma' },
    url: 'https://www.unipr.it',
    logo: uniprLogo,
    degree: { it: 'Laurea Breve', en: "Bachelor's Degree" },
    field: {
      it: 'Scienze e tecniche psicologiche per le sfide contemporanee',
      en: 'Psychological sciences and techniques for contemporary challenges',
    },
    year: { it: 'Set 2025 – In corso', en: 'Sep 2025 – Ongoing' },
    description: {
      it: [
        'Scelta per unire alla solidità tecnica una comprensione più profonda delle persone e dei team.',
        'Approfondimento di temi contemporanei con un approccio multidisciplinare.',
      ],
      en: [
        'Chosen to combine technical solidity with a deeper understanding of people and teams.',
        'Exploration of contemporary topics through a multidisciplinary approach.',
      ],
    },
  },
  {
    institution: 'I.T.I.S Galileo Galilei — San Secondo Parmense',
    url: 'https://poloagroindustriale.edu.it/',
    logo: itisLogo,
    degree: { it: 'Diploma — Perito Informatico', en: 'Diploma — IT Technician' },
    field: { it: 'Scienze Informatiche', en: 'Computer Science' },
    year: '2012 – 2017',
    description: {
      it: [
        'Percorso scolastico a indirizzo tecnico-informatico.',
        'Consolidamento delle basi scientifiche e informatiche, con un approccio concreto alla risoluzione dei problemi.',
      ],
      en: [
        'Technical school path focused on scientific and IT subjects.',
        'Solid foundation built through a practical and methodical approach to concrete problems.',
      ],
    },
  },
];

export function getEducation(locale: Locale = 'it'): Education[] {
  return entries.map((e) => ({
    ...e,
    institution: tr(e.institution, locale),
    degree: tr(e.degree, locale),
    field: tr(e.field, locale),
    year: tr(e.year, locale),
    description: e.description && tr(e.description, locale),
  }));
}
