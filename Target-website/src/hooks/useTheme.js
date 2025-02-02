import { useEffect } from "react";
import { useSelector } from "react-redux";

const useTheme = () => {
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  useEffect(() => {


    document.body.setAttribute("theme", isDarkMode);
  }, [isDarkMode]);

  return isDarkMode; // Returning the theme state so components can use it
};

export default useTheme;
