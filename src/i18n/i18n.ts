import i18next from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationEN from '@i18n/locales/en.json';
import translationES from '@i18n/locales/es.json';

const resources = {
  en: {
    translation: translationEN
  },
  es: {
    translation: translationES
  }
};

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: typeof resources.en;
  }
}

void i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'es',
    debug: true,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage'],
      caches: ['localStorage']
    }
  });
export default i18next;
