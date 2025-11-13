"use client";

import { useRef, useEffect, type PropsWithChildren } from "react";
import { cn } from "../../../lib/utils";

type Props = PropsWithChildren & {
  pointsNumber?: number;
  widthFactor?: number;
  spring?: number;
  friction?: number;
  className?: string;
  colorfulTrail?: boolean;
};

export const CursorTrailWrapper = ({
  children,
  pointsNumber = 40,
  widthFactor = 0.3,
  spring = 0.4,
  friction = 0.5,
  className = "",
  colorfulTrail = false,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const mouseMoved = useRef(false);
  const containerHovered = useRef(false);
  const trail = useRef<{ x: number; y: number; dx: number; dy: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx || !containerRef.current) return;

    const resizeCanvas = () => {
      const { width, height } = containerRef.current!.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const { width, height } = containerRef.current.getBoundingClientRect();
    pointer.current.x = width / 2;
    pointer.current.y = height / 2;

    trail.current = Array.from({ length: pointsNumber }, () => ({
      x: pointer.current.x,
      y: pointer.current.y,
      dx: 0,
      dy: 0,
    }));

    const update = (t: number) => {
      const { width, height } = containerRef.current!.getBoundingClientRect();

      if (!mouseMoved.current || !containerHovered.current) {
        pointer.current.x =
          (0.5 + 0.3 * Math.cos(0.002 * t) * Math.sin(0.005 * t)) * width;
        pointer.current.y =
          (0.5 + 0.2 * Math.cos(0.005 * t) + 0.1 * Math.cos(0.01 * t)) * height;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      trail.current.forEach((p, i) => {
        const prev = i === 0 ? pointer.current : trail.current[i - 1]!;
        const springFactor = i === 0 ? 0.4 * spring : spring;

        p.dx += (prev.x - p.x) * springFactor;
        p.dy += (prev.y - p.y) * springFactor;
        p.dx *= friction;
        p.dy *= friction;
        p.x += p.dx;
        p.y += p.dy;
      });

      const trailColor = colorfulTrail
        ? `hsl(${(t * 0.05) % 360}, 100%, 60%)`
        : "#000";

      ctx.strokeStyle = trailColor;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(trail.current[0]!.x, trail.current[0]!.y);

      for (let i = 1; i < trail.current.length - 1; i++) {
        const xc = 0.5 * (trail.current[i]!.x + trail.current[i + 1]!.x);
        const yc = 0.5 * (trail.current[i]!.y + trail.current[i + 1]!.y);
        ctx.lineWidth = widthFactor * (pointsNumber - i);
        ctx.quadraticCurveTo(trail.current[i]!.x, trail.current[i]!.y, xc, yc);
        ctx.stroke();
      }

      ctx.lineTo(
        trail.current[trail.current.length - 1]!.x,
        trail.current[trail.current.length - 1]!.y,
      );
      ctx.stroke();

      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [pointsNumber, widthFactor, spring, friction, colorfulTrail]);

  useEffect(() => {
    const handleMove = (x: number, y: number) => {
      if (!containerHovered.current) return;
      mouseMoved.current = true;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      pointer.current.x = x - rect.left;
      pointer.current.y = y - rect.top;
    };

    const mouseHandler = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const touchHandler = (e: TouchEvent) => {
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener("mousemove", mouseHandler);
    window.addEventListener("click", mouseHandler);
    window.addEventListener("touchmove", touchHandler);

    const container = containerRef.current;
    const enter = () => (containerHovered.current = true);
    const leave = () => (containerHovered.current = false);
    container?.addEventListener("mouseenter", enter);
    container?.addEventListener("mouseleave", leave);

    return () => {
      window.removeEventListener("mousemove", mouseHandler);
      window.removeEventListener("click", mouseHandler);
      window.removeEventListener("touchmove", touchHandler);
      container?.removeEventListener("mouseenter", enter);
      container?.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <div ref={containerRef} className={cn("relative size-full", className)}>
      <canvas
        ref={canvasRef}
        className="absolute pointer-events-none inset-0"
      />
      {children}
    </div>
  );
};

CursorTrailWrapper.displayName = "CursorTrailWrapper";
