import { useEffect, useState } from "react";

const getMediaQueryMatches = (query: string): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(query).matches;
};

/** Tracks whether a CSS media query currently matches. */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => getMediaQueryMatches(query));

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const syncMatches = (): void => {
      setMatches(mediaQuery.matches);
    };

    syncMatches();
    mediaQuery.addEventListener("change", syncMatches);

    return () => {
      mediaQuery.removeEventListener("change", syncMatches);
    };
  }, [query]);

  return matches;
};
