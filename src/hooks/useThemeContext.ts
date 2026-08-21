import { useContext } from "react";
import ThemeContext from "@/app/providers/ThemeContext";

export const useThemeContext = () => {
  const theme = useContext(ThemeContext);
  if (!theme)
    throw new Error("useThemeContext must not be used inside <ThemeProvider>");
  return theme;
};

export default useThemeContext;
