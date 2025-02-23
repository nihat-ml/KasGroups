import { useTranslation } from "react-i18next";
import { translateText } from "../utils/translate";

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const changeLanguage = async (lng) => {
    i18n.changeLanguage(lng);

    
    if (!i18n.hasResourceBundle(lng, "translation")) {
      const translatedText = await translateText(t("welcome_message"), lng);
      i18n.addResourceBundle(lng, "translation", { "welcome_message": translatedText });
    }
  };

  return (
    <div className="flex gap-4">
      <button onClick={() => changeLanguage("en")} className="px-4 py-2 bg-blue-500 text-white rounded">
        English
      </button>
      <button onClick={() => changeLanguage("az")} className="px-4 py-2 bg-green-500 text-white rounded">
        Azərbaycan
      </button>
    </div>
  );
};

export default LanguageSwitcher;
