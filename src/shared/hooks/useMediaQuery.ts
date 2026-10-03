import { useEffect, useState } from "react";

/** Phones, tablets, and narrow windows. Desktop hover layouts stay outside. */
export const COARSE_LAYOUT_QUERY =
  "(max-width: 1023px), (hover: none) and (pointer: coarse)";

const getMediaQueryMatches = (query: string): boolean => {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(query).matches;
};

type QueryBucket = {
  mediaQuery: MediaQueryList;
  subscribers: Set<(matches: boolean) => void>;
};

const buckets = new Map<string, QueryBucket>();

const getBucket = (query: string): QueryBucket => {
  const existing = buckets.get(query);
  if (existing) {
    return existing;
  }

  const mediaQuery = window.matchMedia(query);
  const bucket: QueryBucket = {
    mediaQuery,
    subscribers: new Set(),
  };

  mediaQuery.addEventListener("change", () => {
    const matches = mediaQuery.matches;
    for (const subscriber of bucket.subscribers) {
      subscriber(matches);
    }
  });

  buckets.set(query, bucket);
  return bucket;
};

/**
 * Tracks whether a CSS media query currently matches.
 * One listener per query, shared by every component that asks for it.
 */
export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(() => getMediaQueryMatches(query));

  useEffect(() => {
    const bucket = getBucket(query);
    setMatches(bucket.mediaQuery.matches);
    bucket.subscribers.add(setMatches);

    return () => {
      bucket.subscribers.delete(setMatches);
    };
  }, [query]);

  return matches;
};
