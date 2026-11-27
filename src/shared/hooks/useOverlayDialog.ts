import { useEffect, useRef } from "react";

import { useScrollLock } from "./useScrollLock";

/** Makes every top-level body child except the dialog's inert; returns a restore fn. */
const isolateDialog = (dialog: Element): (() => void) => {
  const host = Array.from(document.body.children).find((child) =>
    child.contains(dialog),
  );
  const siblings = Array.from(document.body.children).filter(
    (child): child is HTMLElement =>
      child instanceof HTMLElement && child !== host,
  );
  const previous = siblings.map((element) => element.inert);

  for (const element of siblings) {
    element.inert = true;
  }

  return () => {
    siblings.forEach((element, index) => {
      element.inert = previous[index] ?? false;
    });
  };
};

/**
 * Focuses the close control, keeps focus inside the dialog, restores the
 * previous focus, locks scroll, and closes on Escape. Shared by photo /
 * article overlays.
 */
export const useOverlayDialog = (onClose: () => void) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);

  onCloseRef.current = onClose;

  useScrollLock(true);

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus({ preventScroll: true });

    const dialog = closeRef.current?.closest('[role="dialog"]');
    const restoreSiblings = dialog ? isolateDialog(dialog) : undefined;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      restoreSiblings?.();
      previousFocusRef.current?.focus({ preventScroll: true });
    };
  }, []);

  return closeRef;
};
