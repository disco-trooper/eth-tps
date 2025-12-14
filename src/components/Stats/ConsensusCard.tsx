import { Server, RefreshCw } from "lucide-react";
import { StatusBadge } from "../UI/StatusBadge";
import type { DataStatus, ThemeClasses } from "../../types";

export interface ConsensusCardProps {
  voteTPS: number;
  validatorCount: number;
  valStatus: DataStatus;
  loadingVal: boolean;
  onRefresh: (forceRefresh?: boolean) => Promise<void>;
  theme: ThemeClasses;
  isDark: boolean;
}

/**
 * Consensus/Vote TPS card component
 */
export const ConsensusCard = ({
  voteTPS,
  validatorCount,
  valStatus,
  loadingVal,
  onRefresh,
  theme,
  isDark,
}: ConsensusCardProps) => {
  return (
    <div
      className={`border-4 ${theme.border} bg-[#d8b4fe] p-6 ${theme.shadow} hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-300`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-black uppercase text-black">Consensus</h3>
        <div
          className={`p-1 ${theme.cardBg} border-2 ${theme.border} rounded-full`}
        >
          <Server className={`w-5 h-5 stroke-[2.5] ${theme.text}`} />
        </div>
      </div>
      <div
        className={`font-mono text-4xl font-bold ${theme.cardBg} border-2 ${theme.border} p-2 inline-block mb-2 ${theme.text}`}
      >
        {Math.round(voteTPS).toLocaleString()}
      </div>
      <p className="text-sm font-bold opacity-80 mb-4 text-black">
        Attestations/sec
      </p>

      <StatusBadge
        status={valStatus}
        loading={loadingVal}
        label="SRC"
        theme={theme}
      />

      <div
        className={`mt-4 pt-4 border-t-2 ${theme.border} border-dashed flex items-center justify-between text-black`}
      >
        <div className="text-xs font-bold uppercase">Validators:</div>
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold">
            {validatorCount.toLocaleString()}
          </span>
          <button
            onClick={() => onRefresh(true)}
            disabled={loadingVal}
            className={`${
              isDark
                ? "bg-white text-black hover:bg-gray-200"
                : "bg-black text-white hover:bg-gray-800"
            } p-1 disabled:opacity-50`}
          >
            <RefreshCw
              className={`w-3 h-3 ${loadingVal ? "animate-spin" : ""}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
