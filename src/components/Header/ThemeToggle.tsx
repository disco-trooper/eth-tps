import { Moon, Sun } from "lucide-react";
import type { ThemeClasses } from "../../types";

export interface ThemeToggleProps {
  isDark: boolean;
  toggleTheme: () => void;
  theme: ThemeClasses;
}

/**
 * Theme toggle button component
 */
export const ThemeToggle = ({
  isDark,
  toggleTheme,
  theme,
}: ThemeToggleProps) => {
  return (
    <button
      onClick={toggleTheme}
      className={`
        border-4 ${theme.border} ${theme.cardBg} ${theme.shadowSm}
        p-2 flex items-center gap-2 font-bold uppercase text-xs
        active:translate-y-1 active:translate-x-1 active:shadow-none transition-all
      `}
    >
      {isDark ? (
        <>
          <Sun className="w-5 h-5" /> Light Mode
        </>
      ) : (
        <>
          <Moon className="w-5 h-5" /> Dark Mode
        </>
      )}
    </button>
  );
};
