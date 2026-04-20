import type { Education } from './types';
import uniprLogo from '../assets/logos/unipr.jpg';
import itisLogo from '../assets/logos/itis.webp';

export const education: Education[] = [
  {
    institution: 'Università degli Studi di Parma',
    url: 'https://www.unipr.it',
    logo: uniprLogo,
    degree: 'Laurea Breve',
    field: 'Scienze e tecniche psicologiche per le sfide contemporanee',
    year: 'Sett. 2025 – In corso',
    description: 'Corso ad orientamento innovativo con integrazione delle prospettive psicobiologica, cognitiva, evolutiva, socio-relazionale e clinico-dinamica. Focus su sostenibilità, resilienza, tecnologie e competenze per psicologi in équipe multiprofessionali.',
  },
  {
    institution: 'I.T.I.S Galileo Galilei — San Secondo Parmense',
    url: 'https://poloagroindustriale.edu.it/',
    logo: itisLogo,
    degree: 'Diploma — Perito Informatico',
    field: 'Scienze Informatiche',
    year: '2012 – 2017',
    description: 'Votazione: 70/100. Competenze acquisite: T-SQL, C#.',
  },
];
