"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  triggerOnce?: boolean;
};

export const useInViewport = ({
  threshold = 0,
  rootMargin = "0px",
  root = null,
  triggerOnce = false,
}: Props) => {
  const ref = useRef<Element | null>(null);

  const [state, setState] = useState({
    intersectionRatio: 0,
    isIntersecting: false,
  });

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    let hasIntersected = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry || (triggerOnce && hasIntersected)) {
          return;
        }

        setState({
          intersectionRatio: entry.intersectionRatio,
          isIntersecting: entry.isIntersecting,
        });

        if (triggerOnce && entry.isIntersecting) {
          hasIntersected = true;

          observer.unobserve(element);
          observer.disconnect();
        }
      },
      { threshold, rootMargin, root },
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [threshold, rootMargin, root, triggerOnce]);

  return { ref, ...state };
};
