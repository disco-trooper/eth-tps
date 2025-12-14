import type { VisualizerMode, ThemeClasses } from "../../types";

export interface VisualizerControlsProps {
  mode: VisualizerMode;
  onModeChange: (mode: VisualizerMode) => void;
  theme: ThemeClasses;
  isDark: boolean;
}

/**
 * Visualizer mode control buttons
 */
export const VisualizerControls = ({
  mode,
  onModeChange,
  theme,
  isDark,
}: VisualizerControlsProps) => {
  return (
    <div className="flex gap-2">
      {(["exec", "vote", "total"] as const).map((m) => (
        <button
          key={m}
          onClick={() => onModeChange(m)}
          className={`
            px-3 py-1 border-2 ${
              theme.border
            } text-xs font-bold uppercase transition-all
            ${
              mode === m
                ? `${
                    isDark ? "bg-white text-black" : "bg-black text-white"
                  } shadow-none translate-y-[2px] translate-x-[2px]`
                : `${theme.cardBg} ${theme.text} hover:opacity-80 ${theme.shadowSm}`
            }
          `}
        >
          {m}
        </button>
      ))}
    </div>
  );
};
