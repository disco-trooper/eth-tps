import { Info } from "lucide-react";
import type { ThemeClasses } from "../../types";

export interface AboutSectionProps {
  theme: ThemeClasses;
  isDark: boolean;
}

/**
 * About/Info section component
 */
export const AboutSection = ({ theme, isDark }: AboutSectionProps) => {
  return (
    <div
      className={`border-4 ${theme.border} ${theme.cardBg} p-6 ${theme.shadow} flex-grow transition-all duration-300`}
    >
      <h4
        className={`font-black text-lg uppercase mb-3 flex items-center gap-2 ${theme.text}`}
      >
        <Info className="w-5 h-5 stroke-[3]" /> The "Real" TPS?
      </h4>
      <p className={`font-bold text-sm leading-relaxed mb-4 ${theme.text}`}>
        Chains like Solana include{" "}
        <span className="bg-[#d8b4fe] px-1 border border-black text-black">
          consensus votes
        </span>{" "}
        in their TPS. Ethereum usually doesn't.
      </p>
      <p className={`font-bold text-sm leading-relaxed mb-4 ${theme.text}`}>
        If we count Ethereum's consensus layer activity (attestations), the
        network processes over{" "}
        <span className="bg-[#4ade80] px-1 border border-black text-black">
          2,600 TPS
        </span>{" "}
        constantly.
      </p>
      <div
        className={`${isDark ? "bg-[#262626]" : "bg-gray-100"} border-2 ${
          theme.border
        } p-3 text-xs font-mono ${theme.text}`}
      >
        Formula = Active_Validators / 384s
      </div>
    </div>
  );
};
