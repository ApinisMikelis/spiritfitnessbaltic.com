"use client";

import { cn } from "../../../lib/utils";
import { useRef, useState, useEffect, type PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  className?: string;
  intensity?: number;
  perspective?: number;
  scale?: number;
};

export const PerspectiveWrapper = ({
  children,
  className,
  intensity = 15,
  perspective = 1000,
  scale = 1.05,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      const rotateX = (mouseY / rect.height) * intensity * -1;
      const rotateY = (mouseX / rect.width) * intensity;

      setTransform(
        `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
      );
    };

    const handleMouseLeave = () => {
      setTransform(
        `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale(1)`,
      );
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [intensity, perspective, scale]);

  return (
    <div
      ref={containerRef}
      style={{ transform, transformStyle: "preserve-3d" }}
      className={cn(
        "inline-block transition-transform duration-200 ease-out",
        className,
      )}
    >
      {children}
    </div>
  );
};

PerspectiveWrapper.displayName = "PerspectiveWrapper";
