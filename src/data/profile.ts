import type { SocialLink } from './types';

const bioParagraphs = [
  'Sono una persona determinata e ambiziosa, con spiccate doti di leadership e una forte inclinazione alla pianificazione strategica.',
  'Mi concentro sul raggiungimento degli obiettivi, affrontando le sfide con sicurezza, razionalità e un approccio analitico. Comunico in modo chiaro e diretto, motivando e guidando chi mi circonda verso il successo.',
  'Sto approfondendo questi aspetti con una Laurea in Scienze Psicologiche, per unire alla solidità tecnica una comprensione più profonda delle persone e dei team.',
] as const;

export const profile = {
  name: 'Gianluca Zaccarelli',
  nickname: 'Zakka',
  title: 'Senior Full-Stack Developer',
  titleLead: 'Senior',
  titleRest: 'Full-Stack Developer',
  bio: bioParagraphs.join(' '),
  bioParagraphs,
  mbti: 'ENTJ',
  location: 'San Secondo Parmense (PR), Italia',
  city: 'San Secondo Parmense (PR)',
  country: 'Italia',
  languages: ['Italiano — madrelingua', 'Inglese — professionale'],
  availability: 'Open to opportunities',
  email: 'gianluca.zaccarelli.work@gmail.com',
  cvPath: '/cv.pdf',
} as const;

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
