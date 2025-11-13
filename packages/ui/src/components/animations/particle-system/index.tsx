"use client";

import { cn } from "../../../lib/utils";
import type React from "react";

import { type PropsWithChildren, useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  alpha: number;
};

export type ParticleSystemProps = PropsWithChildren & {
  particleCount?: number;
  colors?: string[];
  trigger?: "click" | "continuous";
  effect?: "explosion" | "spiral" | "fireworks";
  intensity?: number;
  size?: [number, number];
  speed?: [number, number];
  gravity?: number;
  className?: string;
};

export function ParticleSystem({
  children,
  particleCount = 50,
  colors = ["#3b82f6", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"],
  trigger = "click",
  effect = "explosion",
  intensity = 1,
  size = [2, 6],
  speed = [1, 5],
  gravity = 0.1,
  className = "",
}: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLButtonElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(null);
  const isAnimatingRef = useRef(false);

  const createParticle = (
    x: number,
    y: number,
    customVelocity?: { vx: number; vy: number },
  ): Particle => {
    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * (speed[1] - speed[0]) + speed[0];
    const particleSize = Math.random() * (size[1] - size[0]) + size[0];

    return {
      x,
      y,
      vx: customVelocity?.vx ?? Math.cos(angle) * velocity * intensity,
      vy: customVelocity?.vy ?? Math.sin(angle) * velocity * intensity,
      life: 0,
      maxLife: 60 + Math.random() * 60,
      size: particleSize,
      color: colors[Math.floor(Math.random() * colors.length)]!,
      alpha: 1,
    };
  };

  const createExplosion = (x: number, y: number) => {
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(createParticle(x, y));
    }
  };

  const createSpiral = (x: number, y: number) => {
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 6;
      const spiralSpeed = 3 * intensity;

      const tangentAngle = angle + Math.PI / 2;
      const vx = Math.cos(tangentAngle) * spiralSpeed + Math.cos(angle) * 0.5;
      const vy = Math.sin(tangentAngle) * spiralSpeed + Math.sin(angle) * 0.5;

      const particle = createParticle(x, y, { vx, vy });
      particle.maxLife = 120 + Math.random() * 60;
      particlesRef.current.push(particle);
    }
  };

  const createFireworks = (x: number, y: number) => {
    const launchParticle = createParticle(x, window.innerHeight, {
      vx: 0,
      vy: -10 * intensity,
    });
    launchParticle.color = "#ffffff";
    launchParticle.size = 3;
    launchParticle.maxLife = 30;
    particlesRef.current.push(launchParticle);

    if (!isAnimatingRef.current) {
      updateParticles();
    }

    setTimeout(() => {
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const offsetX = (Math.random() - 0.5) * 100;
          const offsetY = (Math.random() - 0.5) * 100;
          for (let j = 0; j < particleCount / 3; j++) {
            particlesRef.current.push(createParticle(x + offsetX, y + offsetY));
          }

          if (!isAnimatingRef.current) {
            updateParticles();
          }
        }, i * 200);
      }
    }, 0);
  };

  const updateParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current = particlesRef.current.filter((particle) => {
      particle.life++;
      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.vy += gravity;
      particle.alpha = 1 - particle.life / particle.maxLife;

      if (effect === "spiral") {
        const spiralForce = 0.02;
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const dx = particle.x - centerX;
        const dy = particle.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
          particle.vx += (-dx / distance) * spiralForce;
          particle.vy += (-dy / distance) * spiralForce;
        }
      }

      ctx.save();
      ctx.globalAlpha = particle.alpha;
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      return particle.life < particle.maxLife;
    });

    if (particlesRef.current.length > 0) {
      animationRef.current = requestAnimationFrame(updateParticles);
      isAnimatingRef.current = true;
    } else {
      isAnimatingRef.current = false;
    }
  };

  const handleInteraction = (e: React.MouseEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    switch (effect) {
      case "explosion":
        createExplosion(x, y);
        break;
      case "spiral":
        createSpiral(x, y);
        break;
      case "fireworks":
        createFireworks(x, y);
        break;
      default:
        createExplosion(x, y);
    }

    if (!isAnimatingRef.current) {
      updateParticles();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    if (trigger === "continuous") {
      const interval = setInterval(() => {
        const rect = container.getBoundingClientRect();
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        createExplosion(x, y);

        if (!isAnimatingRef.current) {
          updateParticles();
        }
      }, 1000);

      return () => {
        clearInterval(interval);
        window.removeEventListener("resize", resizeCanvas);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [trigger, particleCount, effect, intensity, gravity]);

  return (
    <button
      ref={containerRef}
      className={cn("relative", className)}
      onClick={trigger === "click" ? handleInteraction : undefined}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-10"
        style={{ mixBlendMode: "screen" }}
      />
      {children}
    </button>
  );
}

ParticleSystem.displayName = "ParticleSystem";
