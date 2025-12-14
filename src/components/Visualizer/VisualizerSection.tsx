import { Activity } from "lucide-react";
import { TpsVisualizer } from "./TpsVisualizer";
import { VisualizerControls } from "./VisualizerControls";
import { SLOTS_PER_EPOCH, EPOCH_TIME } from "../../utils/constants";
import type { VisualizerMode, ThemeClasses } from "../../types";

export interface VisualizerSectionProps {
  voteTPS: number;
  execTPS: number;
  mode: VisualizerMode;
  onModeChange: (mode: VisualizerMode) => void;
  theme: ThemeClasses;
  isDark: boolean;
}

/**
 * Visualizer section wrapper component
 */
export const VisualizerSection = ({
  voteTPS,
  execTPS,
  mode,
  onModeChange,
  theme,
  isDark,
}: VisualizerSectionProps) => {
  return (
    <div
      className={`border-4 ${theme.border} ${theme.cardBg} p-2 ${theme.shadow} transition-all duration-300`}
    >
      <div className="flex justify-between items-center mb-2 px-2">
        <h3
          className={`font-black uppercase flex items-center gap-2 ${theme.text}`}
        >
          <Activity className="w-5 h-5 stroke-[3]" /> Live Feed
        </h3>
        <VisualizerControls
          mode={mode}
          onModeChange={onModeChange}
          theme={theme}
          isDark={isDark}
        />
      </div>

      <TpsVisualizer
        voteTPS={voteTPS}
        execTPS={execTPS}
        mode={mode}
        isDark={isDark}
      />

      <div
        className={`flex justify-between items-center mt-2 px-2 text-xs font-mono font-bold ${theme.mutedText}`}
      >
        <span>EPOCH: {SLOTS_PER_EPOCH} SLOTS</span>
        <span>INTERVAL: {EPOCH_TIME}s</span>
      </div>
    </div>
  );
};
