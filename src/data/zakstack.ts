import type { Locale, ZakStackInfo } from './types';
import { tr, type Localized } from './localize';

const entry: { [K in keyof ZakStackInfo]: K extends 'url' ? string : Localized<ZakStackInfo[K]> } = {
  url: 'https://zakstackhq.com',
  lead: {
    it: 'ZakStack è la base da cui parte ogni gestionale che costruisco. Quello che serve a tutti i progetti è già fatto: dal primo giorno si lavora su quello che serve solo al tuo.',
    en: 'ZakStack is the base every business app I build starts from. What every project needs is already done: from day one the work goes into what only yours needs.',
  },
  description: {
    it: 'L’ho sviluppato io, mettendoci dentro 9 anni di esperienza da programmatore: un template e una libreria di pacchetti, estratti da codice che gira in produzione. Ogni progetto ha il suo dominio, il suo marchio e le sue lingue; un fix nella libreria li raggiunge tutti con un aggiornamento di dipendenza.',
    en: 'I built it myself, pouring in 9 years of experience as a developer: a template and a library of packages, extracted from code running in production. Each project gets its own domain, brand and languages; a fix in the library reaches all of them with a dependency update.',
  },
  includes: {
    it: ['Accesso con 2FA e passkey', 'Utenti e ruoli', 'Pannello admin', 'Notifiche', 'Ticket', 'Pagine e testi legali', 'Email', 'PWA installabile'],
    en: ['Sign-in with 2FA and passkeys', 'Users and roles', 'Admin panel', 'Notifications', 'Tickets', 'Pages and legal texts', 'Email', 'Installable PWA'],
  },
};

export function getZakStack(locale: Locale = 'it'): ZakStackInfo {
  return {
    url: entry.url,
    lead: tr(entry.lead, locale),
    description: tr(entry.description, locale),
    includes: tr(entry.includes, locale),
  };
}
