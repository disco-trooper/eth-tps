import type { ThemeClasses } from "../types/theme";

/**
 * Get theme configuration object based on dark mode state
 * @param isDark - Whether dark mode is enabled
 * @returns Theme configuration with CSS classes
 */
export const getThemeClasses = (isDark: boolean): ThemeClasses => ({
  bg: isDark ? "bg-[#050505]" : "bg-[#f3f0e8]",
  text: isDark ? "text-white" : "text-black",
  border: isDark ? "border-white" : "border-black",
  shadow: isDark
    ? "shadow-[8px_8px_0px_0px_#ffffff]"
    : "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
  shadowSm: isDark
    ? "shadow-[2px_2px_0px_0px_#ffffff]"
    : "shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
  cardBg: isDark ? "bg-[#1a1a1a]" : "bg-white",
  mutedText: isDark ? "text-gray-400" : "text-gray-500",
  badgeBg: isDark ? "bg-[#262626]" : "bg-white",
  subCardBg: isDark ? "bg-[#262626]" : "bg-white",
});
