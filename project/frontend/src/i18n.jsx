import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "welcome_message": "We guarantee the quality of our products and services",
    },
  },
  az: {
    translation: {
      "welcome_message": "Məhsul və xidmətlərimizin keyfiyyətini təmin edirik",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
