const IN_APP_BROWSER_PATTERN =
  /Instagram|FBAN|FBAV|FB_IAB|IABMV\/1|Twitter|Line\/|TikTok|Snapchat|Pinterest/i;

const readViewportWidth = (): number =>
  window.visualViewport?.width ?? window.innerWidth;

/** True when the page runs inside a social app in-app browser (Instagram, Facebook, etc.). */
export const isInAppBrowser = (): boolean =>
  IN_APP_BROWSER_PATTERN.test(navigator.userAgent);

/**
 * In-app browsers often report a desktop layout width while the visible area
 * stays phone-sized. Force the mobile layout only in those environments.
 */
export const shouldForceMobileLayout = (): boolean => {
  if (isInAppBrowser()) {
    return true;
  }

  const layoutWidth = window.innerWidth;
  const visualWidth = readViewportWidth();
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

  return coarsePointer && layoutWidth > visualWidth + 1;
};

/** Adds document attributes/classes used by CSS overrides for in-app browsers. */
export const initInAppBrowserClass = (): void => {
  if (isInAppBrowser()) {
    document.documentElement.classList.add("in-app-browser");
  }

  if (shouldForceMobileLayout()) {
    document.documentElement.setAttribute("data-force-mobile", "true");
  }
};

/** Re-applies the viewport meta tag for in-app browsers that miscalculate width. */
export const initInAppViewportMeta = (): void => {
  if (!isInAppBrowser()) {
    return;
  }

  const viewportMeta = document.querySelector('meta[name="viewport"]');

  if (!viewportMeta) {
    return;
  }

  viewportMeta.setAttribute(
    "content",
    "width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover, interactive-widget=resizes-content",
  );
};
