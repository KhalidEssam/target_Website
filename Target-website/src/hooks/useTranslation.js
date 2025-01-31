import { useSelector } from "react-redux";
import translations from "../locales/translations.json";

export const useTranslation = () => {
  const language = useSelector((state) => state.language.language);

  const translate = (key) => {
    const keys = key.split("."); // Split key by dot notation
    let result = translations;

    for (const k of keys) {
      result = result?.[k];
      if (!result) return key; // Return key if translation is missing
    }

    return result[language] || key;
  };

  return { translate };
};

