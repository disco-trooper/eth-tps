import type { ThemeClasses } from "../../types";

export interface TotalTPSProps {
  totalTPS: number;
  theme: ThemeClasses;
  isDark: boolean;
}

/**
 * Total TPS display component
 */
export const TotalTPS = ({ totalTPS, theme, isDark }: TotalTPSProps) => {
  return (
    <div
      className={`md:col-span-12 border-4 ${theme.border} ${theme.cardBg} p-8 ${theme.shadow} relative overflow-hidden transition-all duration-300`}
    >
      <div
        className={`absolute top-0 right-0 bg-[#4ade80] border-l-4 border-b-4 ${theme.border} px-4 py-2 font-black text-sm text-black`}
      >
        TOTAL THROUGHPUT
      </div>

      <div className="flex flex-col items-center justify-center pt-4">
        <span
          className={`text-9xl md:text-[10rem] font-black leading-none tracking-tighter ${theme.text}`}
        >
          {Math.round(totalTPS).toLocaleString()}
        </span>
        <span
          className={`text-xl font-bold uppercase tracking-widest ${
            isDark ? "bg-white text-black" : "bg-black text-white"
          } px-6 py-1 mt-4 -rotate-1`}
        >
          Transactions + Votes Per Second
        </span>
      </div>
    </div>
  );
};
