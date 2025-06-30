import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../store/features/languageSlice";
import { useTranslation } from "../hooks/useTranslation";

const LanguageToggle = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);
  const { translate: t } = useTranslation();

  const toggleLanguage = () => {
    dispatch(setLanguage(language === "en" ? "ar" : "en"));
  };

  return (
    <button onClick={toggleLanguage}>
      {language === "en" ? t('common.language.english') : t('common.language.arabic')}
    </button>
  );
};

export default LanguageToggle;
