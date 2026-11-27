import { useEffect, useState } from "react";

import { EFFECTIVE_SCROLL_EVENT, getEffectiveScrollY } from "./useScrollLock";

const DEFAULT_THRESHOLD = 32;

/** Returns true once the window has scrolled past `threshold` pixels. */
export const useScrolledPast = (threshold = DEFAULT_THRESHOLD): boolean => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = (): void => {
      setIsScrolled(getEffectiveScrollY() > threshold);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener(EFFECTIVE_SCROLL_EVENT, updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener(EFFECTIVE_SCROLL_EVENT, updateScrollState);
    };
  }, [threshold]);

  return isScrolled;
};
