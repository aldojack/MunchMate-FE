import { createContext, ReactNode, useEffect, useState } from "react";
const themes = ["light", "dark"] as const;
export type ThemeType = (typeof themes)[number];
interface ThemeContextInterface {
  theme: ThemeType;
  changeTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextInterface | undefined>(
  undefined,
);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  const changeTheme = (newTheme: ThemeType) => {
    if (newTheme !== theme) {
      setTheme(newTheme);
      const html = document.documentElement;
      for (const theme of themes) {
        html.classList.remove(theme);
      }
      html.classList.add(newTheme);
    }
  };

  //Import eslint to disable sonar rule here
  const state = { theme, changeTheme };

  useEffect(() => {
    //eventually pull last theme from localStorage or system preference
    // also look at moving this code into function as repeating now
    const html = document.documentElement;
    html.classList.remove("light", "dark");
    html.classList.add(theme);
  }, []);

  return (
    <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
