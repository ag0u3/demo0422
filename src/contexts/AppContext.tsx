"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { getTheme } from "@/theme/theme";
import { translations, Language, TranslationKeys } from "@/i18n/translations";

type Mode = "light" | "dark";

interface AppContextValue {
  mode: Mode;
  toggleMode: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationKeys;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("light");
  const [language, setLanguageState] = useState<Language>("ja");

  // Hydrate from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("theme-mode") as Mode | null;
    const savedLang = localStorage.getItem("language") as Language | null;
    if (savedMode) setMode(savedMode);
    else if (window.matchMedia("(prefers-color-scheme: dark)").matches)
      setMode("dark");
    if (savedLang) setLanguageState(savedLang);
  }, []);

  const toggleMode = () => {
    setMode((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme-mode", next);
      return next;
    });
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const theme = useMemo(() => getTheme(mode), [mode]);
  const t = translations[language];

  return (
    <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <AppContext.Provider
        value={{ mode, toggleMode, language, setLanguage, t }}
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </AppContext.Provider>
    </AppRouterCacheProvider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
