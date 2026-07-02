const APP_VH_VAR = "--app-vh";
const APP_VW_VAR = "--app-vw";

const readViewportHeight = (): number =>
  window.visualViewport?.height ?? window.innerHeight;

const readViewportWidth = (): number =>
  window.visualViewport?.width ?? window.innerWidth;

/** Keeps viewport CSS variables in sync with the visible area (in-app browser chrome). */
export const initViewportHeight = (): void => {
  const syncViewportMetrics = (): void => {
    document.documentElement.style.setProperty(
      APP_VH_VAR,
      `${readViewportHeight() * 0.01}px`,
    );
    document.documentElement.style.setProperty(
      APP_VW_VAR,
      `${readViewportWidth() * 0.01}px`,
    );
  };

  syncViewportMetrics();

  window.visualViewport?.addEventListener("resize", syncViewportMetrics);
  window.visualViewport?.addEventListener("scroll", syncViewportMetrics);
  window.addEventListener("resize", syncViewportMetrics);
  window.addEventListener("orientationchange", syncViewportMetrics);
};
