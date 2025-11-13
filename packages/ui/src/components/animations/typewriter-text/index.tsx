"use client";

import { useEffect, useState } from "react";

import { cn } from "../../../lib/utils";
import { Typography, type TypographyVariant } from "../../server";

type Props = {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  showCursor?: boolean;
  appearance?: TypographyVariant;
  onComplete?: () => void;
};

export function TypewriterText({
  text,
  speed = 50,
  delay = 0,
  className = "",
  showCursor = true,
  appearance = "p-reg-base",
  onComplete,
}: Props) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showCursorState, setShowCursorState] = useState(true);

  useEffect(() => {
    if (!text || currentIndex >= text.length) {
      if (currentIndex >= text.length && !isComplete) {
        setIsComplete(true);
        onComplete?.();
      }
      return;
    }

    const timer = setTimeout(() => {
      const timeoutId = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, speed);

      return () => clearTimeout(timeoutId);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIndex, text, speed, delay, isComplete, onComplete]);

  useEffect(() => {
    if (!showCursor) {
      return;
    }

    const interval = setInterval(() => {
      setShowCursorState((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, [showCursor]);

  useEffect(() => {
    setDisplayedText("");
    setCurrentIndex(0);
    setIsComplete(false);
    setShowCursorState(true);
  }, [text]);

  return (
    <Typography appearance={appearance} className={cn("relative", className)}>
      {displayedText}
      {showCursor && (
        <span
          className="inline-block w-0.5 h-5 bg-current ml-1 absolute right-0"
          style={{
            opacity: isComplete ? 0 : showCursorState ? 1 : 0,
            transition: "opacity 0.1s ease-in-out",
          }}
        />
      )}
    </Typography>
  );
}

TypewriterText.displayName = "TypewriterText";
