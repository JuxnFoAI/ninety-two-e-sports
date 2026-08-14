import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { scrollToPageTop } from "@/shared/lib/scrollToPageTop";

const isHomeTopHash = (hash: string): boolean =>
  hash === "" || hash === "#" || hash === "#inicio";

/** Restores scroll on route changes and after in-app hash navigation. */
export const ScrollManager = (): null => {
  const { pathname, hash } = useLocation();
  const previousPathnameRef = useRef(pathname);
  const isFirstPassRef = useRef(true);

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const pathChanged =
      isFirstPassRef.current || previousPathnameRef.current !== pathname;
    isFirstPassRef.current = false;
    previousPathnameRef.current = pathname;

    if (hash && !isHomeTopHash(hash)) {
      const id = decodeURIComponent(hash.slice(1));
      const target = document.getElementById(id);

      if (target) {
        target.scrollIntoView();
        return;
      }
    }

    // Path change (e.g. /equipos → /) or /#inicio: jump to the true top.
    // Same-path hash clear (logo on home) is left to NavbarBrand so it can smooth-scroll.
    if (pathChanged || hash === "#inicio") {
      scrollToPageTop(true);
      const frame = window.requestAnimationFrame(() => {
        scrollToPageTop(true);
      });

      return () => window.cancelAnimationFrame(frame);
    }

    return undefined;
  }, [pathname, hash]);

  return null;
};
