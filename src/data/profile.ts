import type { Locale, Profile, SocialLink } from './types';

const bioParagraphsIt = [
  'Sono una persona determinata e ambiziosa, con spiccate doti di leadership e una forte inclinazione alla pianificazione strategica.',
  'Mi concentro sul raggiungimento degli obiettivi, affrontando le sfide con sicurezza, razionalità e un approccio analitico. Comunico in modo chiaro e diretto, motivando e guidando chi mi circonda verso il successo.',
  'Sto approfondendo questi aspetti con una Laurea in Scienze Psicologiche, per unire alla solidità tecnica una comprensione più profonda delle persone e dei team.',
] as const;

const bioParagraphsEn = [
  'I am a determined and ambitious person, with strong leadership skills and a clear inclination toward strategic planning.',
  'I focus on achieving goals, facing challenges with confidence, rational thinking, and an analytical approach. I communicate clearly and directly, motivating and guiding the people around me toward success.',
  'I am deepening these aspects through a Degree in Psychological Sciences, to combine technical solidity with a deeper understanding of people and teams.',
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
  availability: 'Open to opportunities',
  email: 'gianluca.zaccarelli.work@gmail.com',
  cvPath: '/cv.pdf',
} as const;

const profileEnOverride: Partial<Profile> = {
  location: 'San Secondo Parmense (PR), Italy',
  country: 'Italy',
  languages: ['Italian - native', 'English - professional'],
};

export function getProfile(locale: Locale = 'it'): Profile {
  if (locale === 'it') {
    return profileIt;
  }

  const paragraphs = bioParagraphsEn.length ? bioParagraphsEn : profileIt.bioParagraphs;

  return {
    ...profileIt,
    ...profileEnOverride,
    bioParagraphs: paragraphs,
    bio: paragraphs.join(' '),
  };
}

export const profile = getProfile('it');

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
