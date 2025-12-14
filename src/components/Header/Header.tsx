import { ThemeToggle } from "./ThemeToggle";
import type { ThemeClasses } from "../../types";

export interface HeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  theme: ThemeClasses;
}

/**
 * Header component with title and theme toggle
 */
export const Header = ({ isDark, toggleTheme, theme }: HeaderProps) => {
  return (
    <div
      className={`border-4 ${theme.border} bg-[#ff6b6b] p-6 ${theme.shadow} flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all duration-300`}
    >
      <div>
        <h1
          className={`text-5xl md:text-6xl font-black uppercase tracking-tighter text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]`}
          style={{ textShadow: "4px 4px 0px #000" }}
        >
          ETH TPS
        </h1>
        <p
          className={`font-bold ${theme.text} mt-2 ${theme.cardBg} inline-block px-2 border-2 ${theme.border}`}
        >
          THE REAL NUMBERS
        </p>
      </div>

      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} theme={theme} />
    </div>
  );
};
