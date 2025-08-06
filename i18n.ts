// i18n.ts
export const locales = ['en', 'es'] as const;

export const localeNames = {
  en: 'English',
  es: 'Español',
};

export const defaultLocale = 'en';

export type Locale = (typeof locales)[number];
