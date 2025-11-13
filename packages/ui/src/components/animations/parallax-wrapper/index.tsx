"use client";

import { useRef, useEffect, useState, type PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  speed?: number;
  className?: string;
  direction?: "up" | "down";
};

export function ParallaxWrapper({
  children,
  speed = 0.5,
  className = "",
  direction = "up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) {
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementTop = rect.top;
      const elementHeight = rect.height;

      const isInViewport =
        elementTop < windowHeight && elementTop + elementHeight > 0;

      if (isInViewport) {
        const scrollProgress =
          (windowHeight - elementTop) / (windowHeight + elementHeight);

        const transformValue = (scrollProgress - 0.5) * 200 * speed;
        const finalTransform =
          direction === "up" ? -transformValue : transformValue;

        setTransform(finalTransform);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed, direction]);

  return (
    <div ref={ref} className={className}>
      <div
        style={{
          transform: `translateY(${transform}px)`,
          transition: "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}

ParallaxWrapper.displayName = "ParallaxWrapper";
