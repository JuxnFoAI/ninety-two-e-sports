let restoreToken = 0;

const SMOOTH_SCROLL_RESTORE_MS = 1000;

/**
 * Scrolls the document to y = 0, bypassing `scroll-padding-top` and CSS
 * `scroll-behavior: smooth` so the hero is not left a header-height short.
 */
export const scrollToPageTop = (instant: boolean): void => {
  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  const previousPadding = root.style.scrollPaddingTop;
  const token = ++restoreToken;

  const restore = (): void => {
    if (token !== restoreToken) {
      return;
    }

    root.style.scrollBehavior = previousBehavior;
    root.style.scrollPaddingTop = previousPadding;
  };

  root.style.scrollPaddingTop = "0px";

  if (instant) {
    root.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    root.scrollTop = 0;
    document.body.scrollTop = 0;
    restore();
    return;
  }

  root.style.scrollBehavior = "smooth";
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  window.setTimeout(restore, SMOOTH_SCROLL_RESTORE_MS);
};
