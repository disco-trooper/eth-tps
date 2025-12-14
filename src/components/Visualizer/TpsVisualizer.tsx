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
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = 240; // Taller for better view
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

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
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = Math.random() * 3 + 3;
        this.life = 1.0;
        this.color = color;
        this.size = size;
      }

      update(): void {
        this.x += this.vx;
        this.y += this.vy;
        this.life -= 0.015;
      }

      draw(ctx: CanvasRenderingContext2D): void {
        ctx.globalAlpha = Math.max(0, this.life);
        ctx.fillStyle = this.color;

        // Draw square particles for brutalist feel
        ctx.fillRect(this.x, this.y, this.size, this.size);

        ctx.globalAlpha = 1.0;
      }
    }

    const render = (time: number): void => {
      const deltaTime = (time - lastTime) / 1000;
      lastTime = time;

      // Clear canvas - Retro dark screen look
      // In dark mode, we might want a slightly lighter screen or keep it CRT black
      ctx.fillStyle = "#1a1a1a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid lines
      ctx.strokeStyle = "#333";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = 0; i < canvas.width; i += 40) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
      }
      for (let i = 0; i < canvas.height; i += 40) {
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
      }
      ctx.stroke();

      const currentProps = propsRef.current;
      if (!currentProps) return;

      const { voteTPS, execTPS, mode } = currentProps;

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
            particles.push(
              new ParticleImpl(Math.random() * canvas.width, -10, color, size)
            );
          }
        }
      };

      // Vote: Violet, smaller squares
      if (mode === "vote" || mode === "total") {
        spawn(voteTPS, "vote", "#a78bfa", 3);
      }
      // Exec: Yellow, larger squares
      if (mode === "exec" || mode === "total") {
        spawn(execTPS, "exec", "#facc15", 6);
      }

      // Update/Draw
      for (let i = particles.length - 1; i >= 0; i--) {
        const particle = particles[i];
        if (!particle) continue;
        particle.update();
        particle.draw(ctx);
        if (particle.life <= 0 || particle.y > canvas.height) {
          particles.splice(i, 1);
        }
      }

      // HUD Overlay Text
      ctx.fillStyle = "#fff";
      ctx.font = 'bold 16px "Courier New", monospace';

      if (mode === "total") {
        // Draw simple legend
        ctx.fillStyle = "#a78bfa";
        ctx.fillRect(10, 15, 10, 10);
        ctx.fillText(`Consensus`, 28, 25);

        ctx.fillStyle = "#facc15";
        ctx.fillRect(10, 35, 10, 10);
        ctx.fillText(`Execution`, 28, 45);
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
