import type { Locale, Personal, PersonalPhoto } from './types';
import { tr, type Localized } from './localize';

// Le foto della galleria stanno in src/assets/foto/galleria/: per aggiungerne una,
// importala qui sotto e mettila in `photos` (l'ordine è quello di lettura).
import estetica from '../assets/foto/galleria/estetica.jpg';
import moto from '../assets/foto/galleria/moto.jpg';

type PhotoEntry = {
  image: PersonalPhoto['image'];
  alt: Localized<string>;
  caption?: Localized<string>;
};

const photos: PhotoEntry[] = [
  {
    image: estetica,
    alt: {
      it: 'Gianluca di profilo con cappellino scuro, occhiali da sole e orecchino d’oro, su un muro chiaro',
      en: 'Gianluca in profile with a dark cap, sunglasses and a gold earring, against a pale wall',
    },
    caption: { it: 'Profilo', en: 'Profile' },
  },
  {
    image: moto,
    alt: {
      it: 'Gianluca con casco e giacca da moto accanto alla sua Kawasaki Z650 verde in un parcheggio coperto, fari accesi',
      en: 'Gianluca in helmet and riding jacket next to his green Kawasaki Z650 in a covered car park, lights on',
    },
    caption: 'Kawasaki Z650',
  },
];

const text = {
  title: { it: 'Fuori', en: 'Off the' },
  titleEm: { it: 'orario', en: 'clock' },
  since: { it: 'Classe ’98', en: 'Born in ’98' },
  lead: {
    it: 'Scrivo codice per lavoro, ma il modo in cui guardo le cose viene da altrove: dalla cura per l’estetica e da una strada che sale in curva.',
    en: 'I write code for a living, but the way I look at things comes from elsewhere: a care for aesthetics and a road that climbs through the bends.',
  },
  chapters: [
    {
      kicker: { it: 'L’estetica', en: 'Aesthetics' },
      body: {
        it: 'Mi interessa come le cose sono fatte prima ancora di cosa fanno: proporzioni, materiali, il dettaglio che non noti finché non manca. È lo stesso occhio con cui guardo un’interfaccia o una riga di codice.',
        en: 'I care about how things are made before what they do: proportions, materials, the detail you only notice once it’s missing. It’s the same eye I bring to an interface or a line of code.',
      },
    },
    {
      kicker: { it: 'Le moto', en: 'Motorcycles' },
      body: {
        it: 'In sella alla mia Z650 la testa si svuota. Ogni curva chiede attenzione, ritmo e misura: abbastanza controllo per stare sicuro, abbastanza istinto per godersela. Un equilibrio che mi porto anche nel lavoro.',
        en: 'On my Z650 my head clears. Every bend asks for focus, rhythm and restraint: enough control to stay safe, enough instinct to enjoy it. A balance I bring to my work too.',
      },
    },
  ],
  note: {
    it: 'Per questo il punto del mio marchio è inclinato: è un punto in corsa.',
    en: 'That’s why the dot in my mark leans forward: it’s a dot in motion.',
  },
} satisfies Record<string, unknown>;

export function getPersonal(locale: Locale): Personal {
  return {
    title: tr(text.title, locale),
    titleEm: tr(text.titleEm, locale),
    since: tr(text.since, locale),
    lead: tr(text.lead, locale),
    chapters: text.chapters.map((c) => ({ kicker: tr(c.kicker, locale), body: tr(c.body, locale) })),
    note: tr(text.note, locale),
    photos: photos.map((p) => ({
      image: p.image,
      alt: tr(p.alt, locale),
      caption: p.caption && tr(p.caption, locale),
    })),
  };
}
