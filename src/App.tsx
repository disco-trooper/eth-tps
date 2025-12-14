import { useState } from "react";
import { useTheme } from "./hooks/useTheme";
import { useValidatorData } from "./hooks/useValidatorData";
import { useExecutionTPS } from "./hooks/useExecutionTPS";
import { EPOCH_TIME } from "./utils/constants";
import { Header } from "./components/Header/Header";
import { TotalTPS } from "./components/Stats/TotalTPS";
import { ConsensusCard } from "./components/Stats/ConsensusCard";
import { ExecutionCard } from "./components/Stats/ExecutionCard";
import { VisualizerSection } from "./components/Visualizer/VisualizerSection";
import { AboutSection } from "./components/Info/AboutSection";
import type { VisualizerMode } from "./types";

function App() {
  // Custom hooks for state management
  const { isDark, toggleTheme, theme } = useTheme();
  const { validatorCount, valStatus, loadingVal, refreshValidators } =
    useValidatorData();
  const { executionTPS, tpsStatus } = useExecutionTPS();

  // Local state
  const [visualizerMode, setVisualizerMode] = useState<VisualizerMode>("total");

  // Derived calculations
  const voteTPS = validatorCount / EPOCH_TIME;
  const totalTPS = voteTPS + executionTPS;

  return (
    <div
      className={`min-h-screen ${theme.bg} ${theme.text} font-sans p-4 md:p-8 flex justify-center transition-colors duration-300`}
    >
      <div className="max-w-4xl w-full flex flex-col gap-8">
        {/* Header Section */}
        <Header isDark={isDark} toggleTheme={toggleTheme} theme={theme} />

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Total TPS (Big Block) */}
          <TotalTPS totalTPS={totalTPS} theme={theme} isDark={isDark} />

          {/* Left Column: Metrics Breakdown */}
          <div className="md:col-span-5 flex flex-col gap-6">
            {/* Vote Card */}
            <ConsensusCard
              voteTPS={voteTPS}
              validatorCount={validatorCount}
              valStatus={valStatus}
              loadingVal={loadingVal}
              onRefresh={refreshValidators}
              theme={theme}
              isDark={isDark}
            />

            {/* Exec Card */}
            <ExecutionCard
              executionTPS={executionTPS}
              tpsStatus={tpsStatus}
              theme={theme}
            />
          </div>

          {/* Right Column: Visualizer & Info */}
          <div className="md:col-span-7 flex flex-col gap-6">
            {/* Visualizer Container */}
            <VisualizerSection
              voteTPS={voteTPS}
              execTPS={executionTPS}
              mode={visualizerMode}
              onModeChange={setVisualizerMode}
              theme={theme}
              isDark={isDark}
            />

            {/* Info / About */}
            <AboutSection theme={theme} isDark={isDark} />
          </div>
        </div>

        {/* Footer */}
        <a
          href="https://x.com/disco_trooper"
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-12 border-4 ${theme.border} ${theme.cardBg} p-4 ${theme.shadow} flex justify-center items-center gap-2 font-bold uppercase text-xs tracking-wider transition-all duration-300 ${theme.text} cursor-pointer hover:opacity-80`}
        >
          <span>Made with</span>
          <span className="text-red-500 animate-pulse">♥</span>
          <span>by</span>
          <span
            className={`px-2 py-0.5 border-2 ${theme.border} ${
              isDark ? "bg-white text-black" : "bg-black text-white"
            }`}
          >
            disco_trooper
          </span>
        </a>
      </div>
    </div>
  );
}

export default App;
