import type { Locale } from './types';

export const defaultLocale: Locale = 'it';

export function normalizeLocale(value?: string | null): Locale {
  return value === 'en' ? 'en' : defaultLocale;
}

export function getLocaleFromUrl(url: URL): Locale {
  return normalizeLocale(url.searchParams.get('lang'));
}
