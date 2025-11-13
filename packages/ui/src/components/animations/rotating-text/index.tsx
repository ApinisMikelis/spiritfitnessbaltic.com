"use client";

import { cn } from "../../../lib/utils";
import { useCallback, useEffect, useState } from "react";

type Props = {
  textList: string[];
  speed?: number;
  baseText?: string;
};

export const RotatingText = ({
  textList,
  speed = 1500,
  baseText = "future",
}: Props) => {
  const [currentText, setCurrentText] = useState(baseText);
  const [isAnimating, setIsAnimating] = useState(true);
  const [animKey, setAnimKey] = useState(0);

  const shuffle = useCallback(() => {
    setCurrentText((prev) => {
      const currentIndex = textList.indexOf(prev);
      const nextIndex = (currentIndex + 1) % textList.length;
      return textList[nextIndex] || baseText;
    });
  }, [textList, baseText]);

  const onAnimationEnd = () => {
    setIsAnimating(false);
    setTimeout(() => {
      shuffle();
      requestAnimationFrame(() => {
        setAnimKey((k) => k + 1);
        setIsAnimating(true);
      });
    }, 50);
  };

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  return (
    <span className="inline-block overflow-hidden align-bottom" aria-hidden>
      <span
        key={animKey}
        onAnimationEnd={onAnimationEnd}
        className={cn("inline-block will-change-transform", {
          animate: isAnimating,
          "opacity-0": !isAnimating,
        })}
      >
        {currentText}.
      </span>

      <style>{`
        .animate {
          animation: fadeInOut ${speed}ms ease-in-out forwards;
        }

        @keyframes fadeInOut {
          0% {
            opacity: 0;
            transform: translateY(100%);
          }
          15% {
            opacity: 1;
            transform: translateY(0%);
          }
          85% {
            opacity: 1;
            transform: translateY(0%);
          }
          100% {
            opacity: 0;
            transform: translateY(-100%);
          }
        }
      `}</style>
    </span>
  );
};

RotatingText.displayName = "RotatingText";
