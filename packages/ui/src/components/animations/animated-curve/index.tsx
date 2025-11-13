"use client";

import clsx from "clsx";
import {
  useEffect,
  useState,
  useRef,
  useCallback,
  type PropsWithChildren,
} from "react";

type Props = PropsWithChildren & {
  startThreshold?: string;
  endThreshold?: string;
  animationStart?: number;
  animationEnd?: number;
  className?: string;
};

export const AnimatedCurve = ({
  children,
  startThreshold = "start end",
  endThreshold = "end start",
  animationStart = 0,
  animationEnd = 1,
  className = "",
}: Props) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  const parseThreshold = useCallback((threshold: string) => {
    const parts = threshold.split(" ");
    const position = parts[0];
    const offset = parts[1] || (position === "start" ? "end" : "start");
    return { position, offset };
  }, []);

  const calculateScrollProgress = useCallback(() => {
    if (!sectionRef.current) return 0;

    const element = sectionRef.current;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const startThresh = parseThreshold(startThreshold);
    const endThresh = parseThreshold(endThreshold);

    let startPosition = 0;
    if (startThresh.position === "start") {
      if (startThresh.offset === "end") {
        startPosition = rect.top - windowHeight;
      } else if (startThresh.offset === "center") {
        startPosition = rect.top - windowHeight / 2;
      } else if (startThresh.offset === "start") {
        startPosition = rect.top;
      } else if (
        typeof startThresh.offset === "string" &&
        startThresh.offset.includes(".")
      ) {
        const factor = Number.parseFloat(startThresh.offset);
        startPosition = rect.top - windowHeight * factor;
      }
    } else if (startThresh.position === "end") {
      if (startThresh.offset === "end") {
        startPosition = rect.bottom - windowHeight;
      } else if (startThresh.offset === "center") {
        startPosition = rect.bottom - windowHeight / 2;
      } else if (startThresh.offset === "start") {
        startPosition = rect.bottom;
      }
    }

    let endPosition = 0;
    if (endThresh.position === "end") {
      if (endThresh.offset === "start") {
        endPosition = rect.bottom;
      } else if (endThresh.offset === "center") {
        endPosition = rect.bottom - windowHeight / 2;
      } else if (endThresh.offset === "end") {
        endPosition = rect.bottom - windowHeight;
      }
    } else if (endThresh.position === "start") {
      if (endThresh.offset === "start") {
        endPosition = rect.top;
      } else if (endThresh.offset === "center") {
        endPosition = rect.top - windowHeight / 2;
      } else if (endThresh.offset === "end") {
        endPosition = rect.top - windowHeight;
      }
    }

    const totalDistance = startPosition - endPosition;
    const currentDistance = startPosition;
    const progress =
      totalDistance !== 0
        ? Math.max(0, Math.min(1, currentDistance / totalDistance))
        : 0;

    return progress;
  }, [startThreshold, endThreshold, parseThreshold]);

  const updateAnimation = useCallback(() => {
    const progress = calculateScrollProgress();
    setScrollProgress(progress);
  }, [calculateScrollProgress]);

  const handleScroll = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }
    rafRef.current = requestAnimationFrame(updateAnimation);
  }, [updateAnimation]);

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    updateAnimation();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll, updateAnimation]);

  const animationProgress = Math.max(
    0,
    Math.min(
      1,
      (scrollProgress - animationStart) / (animationEnd - animationStart),
    ),
  );

  const strokeDashOffset = pathLength * (1 - animationProgress);

  return (
    <section ref={sectionRef} className={clsx("relative", className)}>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 400"
          preserveAspectRatio="none"
        >
          <path
            ref={pathRef}
            d="M 0,50 C 200,50 200,150 300,150 C 400,150 400,50 600,50 C 700,50 700,150 800,150 C 900,150 900,250 1000,350"
            fill="none"
            stroke="url(#curveGradient)"
            strokeWidth="24"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={pathLength}
            strokeDashoffset={strokeDashOffset}
            style={{
              filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.8))",
            }}
          />
          <defs>
            <linearGradient
              id="curveGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="25%" stopColor="#8b5cf6" />
              <stop offset="50%" stopColor="#ec4899" />
              <stop offset="75%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      {children}
    </section>
  );
};

AnimatedCurve.displayName = "AnimatedCurve";
