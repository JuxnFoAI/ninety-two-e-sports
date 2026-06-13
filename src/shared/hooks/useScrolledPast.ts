import { useEffect, useState } from "react";

const DEFAULT_THRESHOLD = 32;

/** Returns true once the window has scrolled past `threshold` pixels. */
export const useScrolledPast = (threshold = DEFAULT_THRESHOLD): boolean => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = (): void => {
      setIsScrolled(window.scrollY > threshold);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrollState);
    };
  }, [threshold]);

  return isScrolled;
};
