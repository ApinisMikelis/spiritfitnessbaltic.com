"use client";

import { cn } from "../../../lib/utils";
import { useRef, useEffect, useState, type PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  strength?: number;
  className?: string;
};

export function MagneticCursor({
  children,
  strength = 0.3,
  className = "",
}: Props) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = elementRef.current;
    if (!element) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = Math.max(rect.width, rect.height);

      if (distance < maxDistance) {
        const force = (maxDistance - distance) / maxDistance;
        setTransform({
          x: deltaX * strength * force,
          y: deltaY * strength * force,
        });
      }
    };

    const handleMouseLeave = () => {
      setTransform({ x: 0, y: 0 });
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [strength]);

  return (
    <div
      ref={elementRef}
      className={cn("duration-100", className)}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }}
    >
      {children}
    </div>
  );
}

MagneticCursor.displayName = "MagneticCursor";
