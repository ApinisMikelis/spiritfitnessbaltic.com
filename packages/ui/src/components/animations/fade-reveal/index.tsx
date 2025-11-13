"use client";

import { cn } from "../../../lib/utils";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

type Props = PropsWithChildren & {
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  delay?: number;
  distance?: number;
  once?: boolean;
  className?: string;
  blur?: boolean;
  blurAmount?: number;
  threshold?: number;
};

export const FadeReveal = ({
  children,
  direction = "up",
  duration = 0.5,
  delay = 0,
  distance = 50,
  once = true,
  className = "",
  blur = false,
  blurAmount = 10,
  threshold = 0.5,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;

        if (entry.isIntersecting && (!once || !hasAnimated)) {
          setTimeout(() => {
            setIsVisible(true);
            if (once) setHasAnimated(true);
          }, delay * 1000);
        } else if (!once && !entry.isIntersecting) {
          setIsVisible(false);
        }
      },
      { threshold }, // Use the new threshold prop here
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, once, hasAnimated, threshold]);

  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return `translateY(${distance}px)`;
      case "down":
        return `translateY(-${distance}px)`;
      case "left":
        return `translateX(${distance}px)`;
      case "right":
        return `translateX(-${distance}px)`;
      case "none":
        return "none";
      default:
        return `translateY(${distance}px)`;
    }
  };

  const initialTransform = getInitialTransform();
  const blurFilter = blur ? `blur(${blurAmount}px)` : "none";

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translate(0, 0)" : initialTransform,
    filter: isVisible ? "blur(0px)" : blurFilter,
    transition: `all ${duration}s ease-out`,
  };

  return (
    <div ref={elementRef} className={cn("relative", className)} style={style}>
      {children}
    </div>
  );
};

FadeReveal.displayName = "FadeReveal";
