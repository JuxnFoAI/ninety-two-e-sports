import type { CSSProperties } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

import {
  NEWS_SPIRAL_CARD_REVEAL_DELAY_MS,
  NEWS_SPIRAL_CARD_STAGGER_MS,
  NOTICIAS_PANEL_REVEAL_DELAY_MS,
} from "../../lib/noticiasTitleTiming";
import {
  NEWS_SPIRAL_ANGLE_STEP_DEG,
  NEWS_SPIRAL_SCROLL_VH_PER_PHOTO,
  type NewsSpiralPhoto,
} from "../../lib/newsSpiral";
import { useRevealSection } from "../reveal/useRevealSection";
import styles from "./NewsPhotoSpiral.module.css";
import { useNewsSpiralScroll } from "./useNewsSpiralScroll";

type NewsPhotoSpiralProps = {
  photos: readonly NewsSpiralPhoto[];
  onSelect: (id: string) => void;
};

export const NewsPhotoSpiral = ({
  photos,
  onSelect,
}: NewsPhotoSpiralProps): JSX.Element => {
  const trackRef = useNewsSpiralScroll();
  const isVisible = useRevealSection();
  const prefersReducedMotion = useEffectiveReducedMotion();
  const delayMs = prefersReducedMotion ? 0 : NOTICIAS_PANEL_REVEAL_DELAY_MS;

  const stickyClass = isVisible
    ? prefersReducedMotion
      ? styles.stickyVisible
      : styles.stickyAnimated
    : "";
  const cardRevealClass = isVisible
    ? prefersReducedMotion
      ? styles.cardVisible
      : styles.cardRevealed
    : "";

  return (
    <div
      ref={trackRef}
      className={styles.track}
      style={
        {
          "--photo-count": String(photos.length),
          "--helix-angle-step": String(NEWS_SPIRAL_ANGLE_STEP_DEG),
          "--panel-reveal-delay": `${delayMs}ms`,
          "--card-reveal-delay": `${prefersReducedMotion ? 0 : NEWS_SPIRAL_CARD_REVEAL_DELAY_MS}ms`,
          "--card-stagger": `${NEWS_SPIRAL_CARD_STAGGER_MS}ms`,
          height: `${Math.max(photos.length, 2) * NEWS_SPIRAL_SCROLL_VH_PER_PHOTO * 100}vh`,
        } as CSSProperties
      }
    >
      <div className={styles.sticky}>
        <div
          className={`${styles.backdrop} ${stickyClass}`.trim()}
          aria-hidden
        />
        <div className={styles.leadIn} aria-hidden />
        <div className={styles.stage}>
          <div className={styles.scene}>
            <div className={styles.helix}>
              <ul className={styles.list} aria-label="Fotos de noticias">
                {photos.map((photo, index) => (
                  <li
                    key={photo.id}
                    className={`${styles.card} ${cardRevealClass}`.trim()}
                    style={
                      {
                        "--card-index": String(index),
                      } as CSSProperties
                    }
                  >
                    <button
                      type="button"
                      className={styles.select}
                      onClick={() => onSelect(photo.id)}
                      aria-label={`Abrir noticia: ${photo.imageAlt}`}
                    >
                      <figure className={styles.frame}>
                        <img
                          src={photo.image}
                          alt=""
                          className={styles.image}
                          draggable={false}
                          decoding="async"
                          fetchPriority={index === 0 ? "high" : "low"}
                        />
                      </figure>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
