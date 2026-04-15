import { defineRouting } from 'next-intl/routing';

export const locales = ['mk', 'en', 'de', 'sq', 'tr'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'mk',
  localePrefix: 'as-needed', // default locale (mk) has no prefix
});
