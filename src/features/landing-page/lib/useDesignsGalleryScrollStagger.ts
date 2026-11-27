import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, type RefObject } from "react";

import {
  EFFECTIVE_SCROLL_EVENT,
  isScrollLocked,
} from "@/shared/hooks/useScrollLock";

gsap.registerPlugin(ScrollTrigger);

const CARD_SELECTOR = "[data-design-card]";

/**
 * GSAP “stagger items in on scroll” — scrubbed reveal while the gallery scrolls through.
 */
export const useDesignsGalleryScrollStagger = (
  rootRef: RefObject<HTMLElement | null>,
  enabled: boolean,
): void => {
  useLayoutEffect(() => {
    if (!enabled) {
      return undefined;
    }

    const root = rootRef.current;
    if (!root) {
      return undefined;
    }

    const cards = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll(CARD_SELECTOR),
    );

    if (cards.length === 0) {
      return undefined;
    }

    let trigger: ScrollTrigger | undefined;

    const context = gsap.context(() => {
      const tween = gsap.from(cards, {
        y: 64,
        autoAlpha: 0,
        stagger: 0.07,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 88%",
          end: "bottom 55%",
          scrub: 0.75,
        },
      });
      trigger = tween.scrollTrigger;
    }, root);

    // A locked body reads as scrollY 0; freeze the reveal instead of scrubbing back,
    // but let an in-flight scrub settle so nothing is left to move on unlock.
    const syncWithScrollLock = (): void => {
      if (isScrollLocked()) {
        trigger?.disable(false, true);
      } else {
        trigger?.enable(false);
      }
    };
    window.addEventListener(EFFECTIVE_SCROLL_EVENT, syncWithScrollLock);

    const refresh = (): void => {
      ScrollTrigger.refresh();
    };

    const pendingImages = Array.from(root.querySelectorAll("img")).filter(
      (img) => !img.complete,
    );
    for (const img of pendingImages) {
      img.addEventListener("load", refresh, { once: true });
    }
    refresh();

    return () => {
      window.removeEventListener(EFFECTIVE_SCROLL_EVENT, syncWithScrollLock);
      for (const img of pendingImages) {
        img.removeEventListener("load", refresh);
      }
      context.revert();
    };
  }, [enabled, rootRef]);
};
