import type { Locale } from './types';

/** Valore uguale in tutte le lingue, oppure una variante per lingua. */
export type Localized<T> = T | Record<Locale, T>;

export function tr<T>(value: Localized<T>, locale: Locale): T {
  const isPerLocale =
    typeof value === 'object' && value !== null && !Array.isArray(value) && 'it' in value && 'en' in value;
  return isPerLocale ? (value as Record<Locale, T>)[locale] : (value as T);
}
