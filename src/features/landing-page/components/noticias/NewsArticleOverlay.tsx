import { useRef } from "react";
import { createPortal } from "react-dom";

import { useEffectiveReducedMotion } from "@/features/accessibility";
import { useOverlayDialog } from "@/shared/hooks";
import type { AnimatedIconHandle } from "@/shared/icons";

import type { NewsArticle } from "../../types/news";
import { CloseIcon } from "../icons/CloseIcon";
import { NewsStoryContent } from "./NewsStoryContent";
import styles from "./NewsArticleOverlay.module.css";

type NewsArticleOverlayProps = {
  article: NewsArticle;
  onClose: () => void;
};

export const NewsArticleOverlay = ({
  article,
  onClose,
}: NewsArticleOverlayProps): JSX.Element => {
  const prefersReducedMotion = useEffectiveReducedMotion();
  const closeRef = useOverlayDialog(onClose);
  const closeIconRef = useRef<AnimatedIconHandle>(null);

  const startCloseIcon = (): void => {
    closeIconRef.current?.startAnimation();
  };

  const stopCloseIcon = (): void => {
    closeIconRef.current?.stopAnimation();
  };

  const motionClass = prefersReducedMotion
    ? styles.scrimStatic
    : styles.scrimAnimated;

  return createPortal(
    <div
      className={`${styles.scrim} ${motionClass}`.trim()}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${article.id}-title`}
      onClick={onClose}
    >
      <button
        ref={closeRef}
        type="button"
        className={styles.close}
        aria-label="Cerrar noticia"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        onMouseEnter={startCloseIcon}
        onMouseLeave={stopCloseIcon}
        onFocus={startCloseIcon}
        onBlur={stopCloseIcon}
      >
        <CloseIcon
          ref={closeIconRef}
          size={18}
          strokeWidth={1.6}
          animateOnHover={false}
        />
      </button>

      <div
        className={styles.layout}
        onClick={(event) => event.stopPropagation()}
      >
        {article.image ? (
          <figure className={styles.photo}>
            <img
              src={article.image}
              alt={article.imageAlt ?? article.title}
              className={styles.image}
              draggable={false}
            />
          </figure>
        ) : null}

        <div className={styles.copy}>
          <NewsStoryContent article={article} />
        </div>
      </div>
    </div>,
    document.body,
  );
};
