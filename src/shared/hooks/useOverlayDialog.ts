import { useEffect, useRef } from "react";

import { useScrollLock } from "./useScrollLock";

/**
 * Focuses the close control, restores the previous focus, locks scroll,
 * and closes on Escape. Shared by photo / article overlays.
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

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus({ preventScroll: true });
    };
  }, []);

  return closeRef;
};
