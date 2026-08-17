import { useLayoutEffect, useRef, useState } from "react";
import { useScroll } from "motion/react";

import { isDocumentScrollLocked } from "@/shared/hooks";

const FALLBACK_HEADER_PX = 96;

const readHeaderOffsetPx = (): number => {
  const styles = getComputedStyle(document.documentElement);
  const raw = styles.getPropertyValue("--header-height").trim();
  const value = Number.parseFloat(raw);

  if (!Number.isFinite(value)) {
    return FALLBACK_HEADER_PX;
  }

  if (raw.endsWith("rem")) {
    const fontSize = Number.parseFloat(styles.fontSize) || 16;
    return value * fontSize;
  }

  return value;
};

/**
 * Drives `--spiral-progress` (0 = first photo in front, 1 = last)
 * from the sticky track's travel under the navbar.
 */
export const useNewsSpiralScroll = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [headerOffsetPx, setHeaderOffsetPx] = useState(FALLBACK_HEADER_PX);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: [`start ${headerOffsetPx}px`, "end end"],
  });

  useLayoutEffect(() => {
    const syncHeader = (): void => {
      setHeaderOffsetPx(readHeaderOffsetPx());
    };

    syncHeader();
    window.addEventListener("resize", syncHeader);

    return () => {
      window.removeEventListener("resize", syncHeader);
    };
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return undefined;
    }

    const apply = (value: number): void => {
      if (isDocumentScrollLocked()) {
        return;
      }

      track.style.setProperty("--spiral-progress", value.toFixed(4));
    };

    apply(scrollYProgress.get());
    const unsubscribe = scrollYProgress.on("change", apply);
    const observer = new MutationObserver(() => {
      apply(scrollYProgress.get());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      unsubscribe();
      observer.disconnect();
    };
  }, [scrollYProgress]);

  return trackRef;
};
