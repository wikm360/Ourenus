import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslation from "../locales/en/translation.json";
import faTranslation from "../locales/fa/translation.json";
import ruTranslation from "../locales/ru/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslation,
    },
    fa: {
      translation: faTranslation,
    },
    ru: {
      translation: ruTranslation,
    },
  },
  lng: "fa",
  fallbackLng: import.meta.env.VITE_SECOND_LANG || "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
