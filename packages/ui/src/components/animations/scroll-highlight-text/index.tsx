"use client";

import { type PropsWithChildren, useEffect, useRef, useState } from "react";

import { cn } from "../../../lib/utils";
import { Typography, type TypographyVariant } from "../../server";

type Props = PropsWithChildren & {
  startOffset?: number;
  endOffset?: number;
  minThreshold?: number;
  maxThreshold?: number;
  textAppearance?: TypographyVariant;
  className?: string;
};

export const ScrollHighlightText = ({
  children,
  startOffset = 0.8,
  endOffset = 0.2,
  minThreshold = 0,
  maxThreshold = 1,
  textAppearance = "heading-1",
  className = "",
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [lineHeight, setLineHeight] = useState(0);
  const [totalLines, setTotalLines] = useState(0);

  const calculateLineMetrics = () => {
    if (textRef.current) {
      const element = textRef.current;

      element.offsetHeight;
      const testElement = document.createElement("div");
      const computedStyle = window.getComputedStyle(element);

      testElement.style.cssText = `
        position: absolute;
        visibility: hidden;
        white-space: nowrap;
        font-family: ${computedStyle.fontFamily};
        font-size: ${computedStyle.fontSize};
        font-weight: ${computedStyle.fontWeight};
        line-height: ${computedStyle.lineHeight};
        letter-spacing: ${computedStyle.letterSpacing};
        word-spacing: ${computedStyle.wordSpacing};
      `;
      testElement.textContent = "Ag";

      document.body.appendChild(testElement);
      const measuredLineHeight = testElement.getBoundingClientRect().height;
      document.body.removeChild(testElement);

      const contentHeight = element.getBoundingClientRect().height;
      const calculatedLines = Math.round(contentHeight / measuredLineHeight);

      setLineHeight(measuredLineHeight);
      setTotalLines(calculatedLines);
    }
  };

  useEffect(() => {
    const timer = setTimeout(calculateLineMetrics, 50);
    return () => clearTimeout(timer);
  }, [children]);

  useEffect(() => {
    let rafId: number | null = null;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking && containerRef.current) {
        rafId = requestAnimationFrame(() => {
          if (!containerRef.current) return;

          const element = containerRef.current;
          const rect = element.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const currentScrollY = window.scrollY;

          const documentScrollProgress =
            currentScrollY / (documentHeight - windowHeight);

          let thresholdProgress = 0;
          if (
            documentScrollProgress >= minThreshold &&
            documentScrollProgress <= maxThreshold
          ) {
            thresholdProgress =
              (documentScrollProgress - minThreshold) /
              (maxThreshold - minThreshold);
          } else if (documentScrollProgress > maxThreshold) {
            thresholdProgress = 1;
          }

          const elementTop = rect.top;
          const elementHeight = rect.height;
          const startPosition = windowHeight * startOffset;
          const endPosition = -elementHeight * endOffset;

          let elementProgress = 0;
          if (elementTop <= startPosition && elementTop >= endPosition) {
            elementProgress =
              (startPosition - elementTop) / (startPosition - endPosition);
          } else if (elementTop < endPosition) {
            elementProgress = 1;
          }

          const finalProgress = Math.min(thresholdProgress, elementProgress);
          const clampedProgress = Math.max(0, Math.min(1, finalProgress));

          setScrollProgress((prev) =>
            Math.abs(prev - clampedProgress) > 0.001 ? clampedProgress : prev,
          );
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleResize = () => {
      calculateLineMetrics();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    document.fonts?.addEventListener("loadingdone", calculateLineMetrics);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.fonts?.removeEventListener("loadingdone", calculateLineMetrics);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [startOffset, endOffset, minThreshold, maxThreshold]);

  const getClipPath = () => {
    if (lineHeight === 0 || totalLines === 0)
      return "polygon(0 0, 0 0, 0 0, 0 0)";

    const currentLineFloat = scrollProgress * totalLines;
    const currentLineIndex = Math.floor(currentLineFloat);
    const currentLineProgress = currentLineFloat - currentLineIndex;

    if (currentLineIndex >= totalLines) {
      return "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
    }

    if (currentLineIndex === 0 && currentLineProgress === 0) {
      return "polygon(0 0, 0 0, 0 0, 0 0)";
    }

    const currentLineTop = (currentLineIndex / totalLines) * 100;
    const currentLineBottom = ((currentLineIndex + 1) / totalLines) * 100;
    const smoothProgress = Math.max(
      0,
      Math.min(100, currentLineProgress * 100),
    );

    return `polygon(
      0 0,
      100% 0,
      100% ${currentLineTop}%,
      ${smoothProgress}% ${currentLineTop}%,
      ${smoothProgress}% ${currentLineBottom}%,
      0 ${currentLineBottom}%
    )`;
  };

  const sharedTextStyles = {
    fontWeight: "inherit",
    letterSpacing: "inherit",
    wordSpacing: "inherit",
    lineHeight: "inherit",
    whiteSpace: "inherit" as const,
    wordBreak: "inherit" as const,
    textAlign: "inherit" as const,
    margin: 0,
    padding: 0,
    border: 0,
    outline: 0,
  };

  return (
    <div ref={containerRef} className="relative text-center">
      <Typography
        ref={textRef}
        style={sharedTextStyles}
        appearance={textAppearance}
        className={cn("text-neutral-500", className)}
      >
        {children}
      </Typography>
      <Typography
        appearance={textAppearance}
        aria-hidden="true"
        className={cn(
          "absolute top-0 left-0 w-full text-neutral-900",
          className,
        )}
        style={{
          ...sharedTextStyles,
          clipPath: getClipPath(),
          willChange: "clip-path",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
      >
        {children}
      </Typography>
    </div>
  );
};

ScrollHighlightText.displayName = "ScrollHighlightText";
