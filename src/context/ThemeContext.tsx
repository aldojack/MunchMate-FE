import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { createContext, ReactNode, useEffect, useState } from "react";

const themes = ["light", "dark"] as const;

type ThemeType = (typeof themes)[number];
type ThemeContextType = {
  theme: ThemeType;
  changeTheme: (theme: ThemeType) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  const muiTheme = createTheme({
    palette: {
      mode: theme === "dark" ? "dark" : "light",
      primary: {
        main:
          theme === "dark"
            ? "rgb(80, 150, 250)" // Your dark mode primary
            : "rgb(21, 70, 216)", // Your light mode primary
      },
      secondary: {
        main: theme === "dark" ? "rgb(170, 70, 12)" : "rgb(180, 40, 5)",
      },
      background: {
        default: theme === "dark" ? "rgb(13, 13, 2)" : "rgb(253, 253, 242)",
      },
    },
  });

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
  }, [theme]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeContext.Provider value={state}>{children}</ThemeContext.Provider>
    </MuiThemeProvider>
  );
};

export default ThemeContext;
