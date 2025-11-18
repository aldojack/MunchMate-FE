import {
  createContext,
  ReactNode,
  useContext,
  useState,
} from "react";
export type ThemeType = "light" | "dark";
interface ThemeContextInterface {
  theme: ThemeType;
  changeTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextInterface | undefined>(undefined);
// provide
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  const changeTheme = (newTheme: ThemeType) => {
    if (newTheme !== theme) {
      setTheme(newTheme);
      const html = document.documentElement;
      html.classList.remove("light", "dark");
      html.classList.add(newTheme);
    }
  };

  //Import eslint to disable sonar rule here
  const state = {theme, changeTheme}

  return (
    <ThemeContext.Provider value={state}>
      {children}
    </ThemeContext.Provider>
  );
};
// use
export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme)
    throw new Error("useTheme must not be used inside <ThemeProvider>");
  return theme;
};

export default ThemeContext;
