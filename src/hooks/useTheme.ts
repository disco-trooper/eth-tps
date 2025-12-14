import { useState, useEffect } from "react";
import { getThemeClasses } from "../utils/theme";
import type { ThemeClasses } from "../types/theme";

const THEME_STORAGE_KEY = "eth_tps_theme";

export interface UseThemeReturn {
  isDark: boolean;
  toggleTheme: () => void;
  theme: ThemeClasses;
}

/**
 * Custom hook for managing theme state (dark/light mode)
 * @returns {UseThemeReturn} { isDark, toggleTheme, theme }
 */
export const useTheme = (): UseThemeReturn => {
  const [isDark, setIsDark] = useState<boolean>(false);

  // Load theme from local storage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = (): void => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme ? "dark" : "light");
  };

  const theme = getThemeClasses(isDark);

  return { isDark, toggleTheme, theme };
};
