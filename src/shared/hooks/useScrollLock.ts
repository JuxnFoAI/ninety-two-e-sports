import { useEffect } from "react";

const SCROLL_LOCK_CLASS = "scroll-locked";

interface BodyStyleSnapshot {
  position: string;
  top: string;
  width: string;
  overflow: string;
  touchAction: string;
}

/** Locks document scroll (iOS-safe) while `locked` is true. Restores position on release. */
export const useScrollLock = (locked: boolean): void => {
  useEffect(() => {
    if (!locked) {
      return undefined;
    }

    const scrollY = window.scrollY;
    const bodyStyle = document.body.style;
    const htmlStyle = document.documentElement.style;

    const bodySnapshot: BodyStyleSnapshot = {
      position: bodyStyle.position,
      top: bodyStyle.top,
      width: bodyStyle.width,
      overflow: bodyStyle.overflow,
      touchAction: bodyStyle.touchAction,
    };
    const htmlOverflow = htmlStyle.overflow;

    document.documentElement.classList.add(SCROLL_LOCK_CLASS);
    htmlStyle.overflow = "hidden";

    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.width = "100%";
    bodyStyle.overflow = "hidden";
    bodyStyle.touchAction = "none";

    return () => {
      document.documentElement.classList.remove(SCROLL_LOCK_CLASS);
      htmlStyle.overflow = htmlOverflow;

      bodyStyle.position = bodySnapshot.position;
      bodyStyle.top = bodySnapshot.top;
      bodyStyle.width = bodySnapshot.width;
      bodyStyle.overflow = bodySnapshot.overflow;
      bodyStyle.touchAction = bodySnapshot.touchAction;

      window.scrollTo(0, scrollY);
    };
  }, [locked]);
};
