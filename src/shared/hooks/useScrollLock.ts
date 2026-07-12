import { useEffect } from "react";

const SCROLL_LOCK_CLASS = "scroll-locked";

interface BodyStyleSnapshot {
  position: string;
  top: string;
  width: string;
  overflow: string;
  touchAction: string;
}

let lockCount = 0;
let savedScrollY = 0;
let bodySnapshot: BodyStyleSnapshot | null = null;
let htmlOverflowSnapshot = "";

const restoreScrollPosition = (scrollY: number): void => {
  const htmlStyle = document.documentElement.style;
  const previousScrollBehavior = htmlStyle.scrollBehavior;

  htmlStyle.scrollBehavior = "auto";
  window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
  htmlStyle.scrollBehavior = previousScrollBehavior;
};

const lockScroll = (): void => {
  if (lockCount === 0) {
    savedScrollY = window.scrollY;

    const bodyStyle = document.body.style;
    const htmlStyle = document.documentElement.style;

    bodySnapshot = {
      position: bodyStyle.position,
      top: bodyStyle.top,
      width: bodyStyle.width,
      overflow: bodyStyle.overflow,
      touchAction: bodyStyle.touchAction,
    };
    htmlOverflowSnapshot = htmlStyle.overflow;

    document.documentElement.classList.add(SCROLL_LOCK_CLASS);
    htmlStyle.overflow = "hidden";

    bodyStyle.position = "fixed";
    bodyStyle.top = `-${savedScrollY}px`;
    bodyStyle.width = "100%";
    bodyStyle.overflow = "hidden";
    bodyStyle.touchAction = "none";
  }

  lockCount += 1;
};

const unlockScroll = (): void => {
  if (lockCount === 0) {
    return;
  }

  lockCount -= 1;

  if (lockCount > 0) {
    return;
  }

  const bodyStyle = document.body.style;
  const htmlStyle = document.documentElement.style;
  const snapshot = bodySnapshot;
  const scrollY = savedScrollY;

  document.documentElement.classList.remove(SCROLL_LOCK_CLASS);
  htmlStyle.overflow = htmlOverflowSnapshot;

  if (snapshot) {
    bodyStyle.position = snapshot.position;
    bodyStyle.top = snapshot.top;
    bodyStyle.width = snapshot.width;
    bodyStyle.overflow = snapshot.overflow;
    bodyStyle.touchAction = snapshot.touchAction;
  }

  bodySnapshot = null;
  restoreScrollPosition(scrollY);
};

/** Locks document scroll (iOS-safe) while `locked` is true. Restores position on release. */
export const useScrollLock = (locked: boolean): void => {
  useEffect(() => {
    if (!locked) {
      return undefined;
    }

    lockScroll();

    return () => {
      unlockScroll();
    };
  }, [locked]);
};
