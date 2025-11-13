import { useEffect, useState } from "react";

const BREAKPOINTS = {
  medium: 768,
  large: 1024,
  extraLarge: 1440,
};

export const useDeviceSize = () => {
  const [isLargerThanMd, setIsLargerThanMd] = useState(false);
  const [isLargerThanLg, setIsLargerThanLg] = useState(false);
  const [isLargerThanXl, setIsLargerThanXl] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      setIsLargerThanMd(width >= BREAKPOINTS.medium);
      setIsLargerThanLg(width >= BREAKPOINTS.large);
      setIsLargerThanXl(width >= BREAKPOINTS.extraLarge);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { isLargerThanMd, isLargerThanLg, isLargerThanXl };
};
