import { Zap } from "lucide-react";
import { StatusBadge } from "../UI/StatusBadge";
import type { DataStatus, ThemeClasses } from "../../types";

export interface ExecutionCardProps {
  executionTPS: number;
  tpsStatus: DataStatus;
  theme: ThemeClasses;
}

/**
 * Execution layer TPS card component
 */
export const ExecutionCard = ({
  executionTPS,
  tpsStatus,
  theme,
}: ExecutionCardProps) => {
  return (
    <div
      className={`border-4 ${theme.border} bg-[#fde047] p-6 ${theme.shadow} hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-300`}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-black uppercase text-black">Execution</h3>
        <div
          className={`p-1 ${theme.cardBg} border-2 ${theme.border} rounded-full`}
        >
          <Zap className={`w-5 h-5 stroke-[2.5] ${theme.text}`} />
        </div>
      </div>
      <div
        className={`font-mono text-4xl font-bold ${theme.cardBg} border-2 ${theme.border} p-2 inline-block mb-2 ${theme.text}`}
      >
        {executionTPS.toFixed(2)}
      </div>
      <p className="text-sm font-bold opacity-80 mb-4 text-black">
        User Tx/sec
      </p>
      <StatusBadge
        status={tpsStatus}
        loading={false}
        label="RPC"
        theme={theme}
      />
    </div>
  );
};
