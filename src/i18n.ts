import { getRequestConfig } from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'fr', 'es'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Fallback to 'en' if locale is undefined or invalid
  const validLocale = locale && locales.includes(locale as Locale) ? locale : 'en';
  
  return {
    locale: validLocale,
    messages: (await import(`../messages/${validLocale}.json`)).default,
  };
});
