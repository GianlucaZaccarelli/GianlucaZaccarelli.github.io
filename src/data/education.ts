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
    year: { it: 'Sett. 2025 – In corso', en: 'Sep 2025 – Ongoing' },
    description: {
      it: [
        'Percorso universitario orientato allo sviluppo di competenze teoriche e pratiche.',
        'Approfondimento di temi contemporanei con un approccio multidisciplinare.',
        'Attenzione alla crescita personale e professionale all’interno del percorso di studi.',
      ],
      en: [
        'A university path focused on building solid theoretical and practical skills.',
        'Exploration of contemporary topics through a multidisciplinary approach.',
        'Attention to both personal and professional growth throughout the program.',
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
        'Votazione finale: 70/100.',
      ],
      en: [
        'Technical school path focused on scientific and IT subjects.',
        'Solid foundation built through a practical and methodical approach to concrete problems.',
        'Final grade: 70/100.',
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
