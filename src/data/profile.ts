import type { Locale, Profile, SocialLink } from './types';

// [0] apertura · [1] psicologia, l'aggancio del profilo · [2] metodo
const bioParagraphsIt = [
  'Sviluppo software da oltre 8 anni e guido le persone che lo costruiscono: da capo progetto con un team di stagisti a senior su sistemi bancari e HR.',
  'Per questo studio Scienze Psicologiche all’Università di Parma: unire la solidità tecnica a una comprensione più profonda delle persone e dei team.',
  'Lavoro per obiettivi, con un approccio analitico e una comunicazione chiara e diretta.',
] as const;

const bioParagraphsEn = [
  'I’ve been building software for 8+ years and leading the people who build it: from project lead with a team of interns to senior developer on banking and HR systems.',
  'That’s why I’m studying Psychological Sciences at the University of Parma: to combine technical solidity with a deeper understanding of people and teams.',
  'I work towards clear goals, with an analytical approach and clear, direct communication.',
] as const;

const profileIt: Profile = {
  name: 'Gianluca Zaccarelli',
  nickname: 'Zakka',
  title: 'Senior Full-Stack Developer',
  titleLead: 'Senior',
  titleRest: 'Full-Stack Developer',
  bio: bioParagraphsIt.join(' '),
  bioParagraphs: bioParagraphsIt,
  mbti: 'ENTJ',
  location: 'San Secondo Parmense (PR), Italia',
  city: 'San Secondo Parmense (PR)',
  country: 'Italia',
  languages: ['Italiano — madrelingua', 'Inglese — professionale'],
  availability: 'Aperto a nuove opportunità',
  facts: '8+ anni · .NET · TypeScript · Team lead',
  hook: 'Scrivo codice e studio le persone che lo scrivono.',
  email: 'gianluca.zaccarelli.work@gmail.com',
  cvPath: '/cv.pdf',
} as const;

const profileEnOverride: Partial<Profile> = {
  location: 'San Secondo Parmense (PR), Italy',
  country: 'Italy',
  languages: ['Italian — native', 'English — professional'],
  availability: 'Open to opportunities',
  facts: '8+ years · .NET · TypeScript · Team lead',
  hook: 'I write code, and study the people who write it.',
  cvPath: '/cv-en.pdf',
};

export function getProfile(locale: Locale = 'it'): Profile {
  if (locale === 'it') {
    return profileIt;
  }

  return {
    ...profileIt,
    ...profileEnOverride,
    bioParagraphs: bioParagraphsEn,
    bio: bioParagraphsEn.join(' '),
  };
}

export const socialLinks: SocialLink[] = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/gianluca-zaccarelli-389807153/',
    icon: 'linkedin',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/gianlucazaccarelli',
    icon: 'github',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/gianlucazaccarelli/',
    icon: 'instagram',
  },
  {
    label: 'Email',
    href: 'mailto:gianluca.zaccarelli.work@gmail.com',
    icon: 'mail',
  },
];
