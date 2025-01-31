import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../store/features/languageSlice";

const LanguageToggle = () => {
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);

  const toggleLanguage = () => {
    dispatch(setLanguage(language === "en" ? "ar" : "en"));
  };

  return (
    <button onClick={toggleLanguage}>
      {language === "en" ? "🇬🇧 English" : "🇸🇦 العربية"}
    </button>
  );
};

export default LanguageToggle;
