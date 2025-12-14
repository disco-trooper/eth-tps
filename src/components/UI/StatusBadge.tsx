import { Wifi, WifiOff, Database } from "lucide-react";
import type { DataStatus, ThemeClasses } from "../../types";

export interface StatusBadgeProps {
  status: DataStatus;
  loading: boolean;
  label: string;
  theme: ThemeClasses;
}

/**
 * Status badge component showing data source status
 */
export const StatusBadge = ({
  status,
  loading,
  label,
  theme,
}: StatusBadgeProps) => {
  return (
    <div
      className={`flex items-center gap-2 border-2 ${theme.border} ${theme.badgeBg} px-3 py-1 ${theme.shadowSm} transition-all duration-300`}
    >
      <span
        className={`text-[10px] font-black uppercase tracking-wider ${theme.text}`}
      >
        {label}:
      </span>
      {loading ? (
        <span className="flex items-center gap-1 text-xs font-bold text-blue-500 animate-pulse">
          LOAD...
        </span>
      ) : status === "live" ? (
        <span className="flex items-center gap-1 text-xs font-bold text-green-500">
          <Wifi className="w-3 h-3 stroke-[3]" /> LIVE
        </span>
      ) : status === "cached" ? (
        <span className="flex items-center gap-1 text-xs font-bold text-purple-500">
          <Database className="w-3 h-3 stroke-[3]" /> MEM
        </span>
      ) : (
        <span className="flex items-center gap-1 text-xs font-bold text-orange-500">
          <WifiOff className="w-3 h-3 stroke-[3]" /> EST
        </span>
      )}
    </div>
  );
};
