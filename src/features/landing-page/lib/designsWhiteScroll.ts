/** 0 = noche en el stack; 1 = blanco (Diseños → patrocinadores). */
export const SCROLL_DESIGNS_WHITE_VAR = "--scroll-designs-white";

let lastPainted = "";

export const writeDesignsWhiteStrength = (raw: number): void => {
  const clamped = Math.min(1, Math.max(0, raw));
  const stepped = Math.round(clamped * 16) / 16;
  const next = stepped.toFixed(3);

  if (next === lastPainted) {
    return;
  }

  lastPainted = next;
  document.documentElement.style.setProperty(SCROLL_DESIGNS_WHITE_VAR, next);
};

export const clearDesignsWhiteStrength = (): void => {
  lastPainted = "";
  document.documentElement.style.removeProperty(SCROLL_DESIGNS_WHITE_VAR);
};

/** Maps the bridge marker on screen to white strength (0 = negro, 1 = blanco). */
export const computeDesignsWhiteProgress = (
  bridge: HTMLElement,
  viewportHeight: number,
): number => {
  const rect = bridge.getBoundingClientRect();

  if (rect.bottom < 0 || rect.top <= viewportHeight * 0.28) {
    return 1;
  }

  if (rect.top >= viewportHeight * 0.94) {
    return 0;
  }

  const startY = viewportHeight * 0.92;
  const endY = viewportHeight * 0.3;
  const raw = 1 - (rect.top - endY) / (startY - endY);

  return Math.min(1, Math.max(0, raw));
};
