import { useEffect, useRef } from "react";
import type { VisualizerMode } from "../../types";

export interface TpsVisualizerProps {
  voteTPS: number;
  execTPS: number;
  mode: VisualizerMode;
  isDark: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
  update: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
}

/**
 * TPS Visualizer component with canvas animation
 */
export const TpsVisualizer = ({
  voteTPS,
  execTPS,
  mode,
  isDark,
}: TpsVisualizerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const propsRef = useRef({ voteTPS, execTPS, mode, isDark });

  useEffect(() => {
    propsRef.current = { voteTPS, execTPS, mode, isDark };
  }, [voteTPS, execTPS, mode, isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Animation State
    let particles: Particle[] = [];
    let lastTime = 0;
    let accumulators = { vote: 0, exec: 0 };

    const resizeCanvas = (): void => {
      const parent = canvas!.parentElement;
      if (parent) {
        // Handle high DPI displays for crisp lines
        const dpr = window.devicePixelRatio || 1;
        const rect = parent.getBoundingClientRect();

        canvas!.width = rect.width * dpr;
        canvas!.height = 240 * dpr;

        canvas!.style.width = `${rect.width}px`;
        canvas!.style.height = "240px";

        ctx.scale(dpr, dpr);
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Theme color mapping helper for canvas drawing
    const getThemeColors = (isDark: boolean) => ({
      cardBg: isDark ? "#1a1a1a" : "#ffffff",
      text: isDark ? "#ffffff" : "#000000",
      border: isDark ? "#ffffff" : "#000000",
      shadow: isDark ? "#ffffff" : "#000000",
    });

    // Particle class
    class ParticleImpl implements Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
      size: number;

      constructor(x: number, y: number, color: string, size: number) {
        // Adjust spawning for DPI
        const width = canvas!.width / (window.devicePixelRatio || 1);

        this.x = x === -1 ? Math.random() * width : x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = Math.random() * 3 + 3; // Speed
        this.life = 1.0;
        this.color = color;
        this.size = size;
      }

      update(): void {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.01; // Slightly longer life
      }

      draw(ctx: CanvasRenderingContext2D): void {
        ctx.globalAlpha = Math.max(0, this.life);

        // Neo-Brutalism: Hard borders on particles
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.size, this.size);

        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "#000000";
        ctx.strokeRect(this.x, this.y, this.size, this.size);

        ctx.globalAlpha = 1.0;
      }
    }

    const render = (time: number): void => {
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      // 1. Background
      const width = canvas!.width / (window.devicePixelRatio || 1);
      const height = canvas!.height / (window.devicePixelRatio || 1);

      ctx.fillStyle = "#1a1a1a"; // Keep it dark CRT style
      ctx.fillRect(0, 0, width, height);

      // 2. Dashed Grid (Technical Look)
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]); // Dashed lines
      ctx.beginPath();
      for (let i = 0; i < width; i += 40) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
      }
      for (let i = 0; i < height; i += 40) {
        ctx.moveTo(0, i);
        ctx.lineTo(width, i);
      }
      ctx.stroke();
      ctx.setLineDash([]); // Reset dash

      const currentProps = propsRef.current;
      if (!currentProps) return;

      const { voteTPS, execTPS, mode, isDark } = currentProps;
      const themeColors = getThemeColors(isDark);

      const spawn = (
        tps: number,
        key: "vote" | "exec",
        color: string,
        size: number
      ): void => {
        if (deltaTime < 1) {
          accumulators[key] += tps * deltaTime;
        }

        const count = Math.floor(accumulators[key]);
        if (count > 0) {
          accumulators[key] -= count;
          const safeCount = Math.min(count, 400);
          for (let i = 0; i < safeCount; i++) {
            // x = -1 triggers random X in constructor
            particles.push(new ParticleImpl(-1, -20, color, size));
          }
        }
      };

      // Increased sizes for better visual impact
      if (mode === "vote" || mode === "total") {
        spawn(voteTPS, "vote", "#a78bfa", 6); // Size 6 + border
      }
      if (mode === "exec" || mode === "total") {
        spawn(execTPS, "exec", "#facc15", 10); // Size 10 + border
      }

      // Update/Draw Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        if (!particle) continue;
        particle.update();
        particle.draw(ctx);
        if (particle.life <= 0 || particle.y > height) {
          particles.splice(i, 1);
        }
      }

      // 3. HUD / Legend "Sticker"
      if (mode === "total") {
        const stickerX = 16;
        const stickerY = 16;
        const stickerW = 140;
        const stickerH = 70;

        // Hard Shadow
        ctx.fillStyle = themeColors.shadow;
        ctx.fillRect(stickerX + 4, stickerY + 4, stickerW, stickerH);

        // Card Background (Theme-aware)
        ctx.fillStyle = themeColors.cardBg;
        ctx.fillRect(stickerX, stickerY, stickerW, stickerH);

        // Card Border
        ctx.lineWidth = 3;
        ctx.strokeStyle = themeColors.border;
        ctx.strokeRect(stickerX, stickerY, stickerW, stickerH);

        // Text Styles
        ctx.font = 'bold 12px "Courier New", monospace';
        ctx.fillStyle = themeColors.text;

        // Legend Items
        // Consensus
        ctx.fillStyle = "#a78bfa";
        ctx.fillRect(stickerX + 12, stickerY + 15, 12, 12);
        ctx.strokeStyle = themeColors.border;
        ctx.strokeRect(stickerX + 12, stickerY + 15, 12, 12); // Border on swatch

        ctx.fillStyle = themeColors.text;
        ctx.fillText("Consensus", stickerX + 32, stickerY + 25);

        // Execution
        ctx.fillStyle = "#facc15";
        ctx.fillRect(stickerX + 12, stickerY + 40, 12, 12);
        ctx.strokeStyle = themeColors.border;
        ctx.strokeRect(stickerX + 12, stickerY + 40, 12, 12); // Border on swatch

        ctx.fillStyle = themeColors.text;
        ctx.fillText("Execution", stickerX + 32, stickerY + 50);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      className={`w-full h-[240px] bg-[#1a1a1a] border-4 ${
        isDark ? "border-white" : "border-black"
      } relative overflow-hidden transition-colors duration-300`}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};
