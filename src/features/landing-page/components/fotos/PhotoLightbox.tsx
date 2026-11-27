import {
  useCallback,
  useRef,
  useState,
  type AnimationEvent,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";

import { useEffectiveReducedMotion } from "@/features/accessibility";
import { useOverlayDialog } from "@/shared/hooks";
import type { AnimatedIconHandle } from "@/shared/icons";

import type { TeamDesign } from "../../types/design";
import { CloseIcon } from "../icons/CloseIcon";
import { DownloadIcon } from "../icons/DownloadIcon";
import styles from "./PhotoLightbox.module.css";

interface PhotoLightboxProps {
  design: TeamDesign;
  onClose: () => void;
}

/** Blob URL for the image, or null so the caller can fall back to the plain URL. */
const fetchObjectUrl = async (src: string): Promise<string | null> => {
  try {
    const response = await fetch(src);
    return response.ok ? URL.createObjectURL(await response.blob()) : null;
  } catch {
    return null;
  }
};

export const PhotoLightbox = ({
  design,
  onClose,
}: PhotoLightboxProps): JSX.Element => {
  const prefersReducedMotion = useEffectiveReducedMotion();
  const [closing, setClosing] = useState(false);

  const requestClose = useCallback((): void => {
    if (prefersReducedMotion) {
      onClose();
      return;
    }

    setClosing(true);
  }, [onClose, prefersReducedMotion]);

  const handleAnimationEnd = (event: AnimationEvent<HTMLDivElement>): void => {
    if (closing && event.target === event.currentTarget) {
      onClose();
    }
  };

  const closeRef = useOverlayDialog(requestClose);
  const closeIconRef = useRef<AnimatedIconHandle>(null);
  const downloadIconRef = useRef<AnimatedIconHandle>(null);

  const handleDownload = useCallback(
    async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
      event.stopPropagation();

      const pathname = design.src.split("?")[0] ?? "";
      const ext = pathname.match(/\.([a-z0-9]+)$/i)?.[1] ?? "png";
      const objectUrl = await fetchObjectUrl(design.src);
      const link = document.createElement("a");

      link.href = objectUrl ?? design.src;
      link.download = `${design.id}.${ext}`;
      document.body.append(link);
      link.click();
      link.remove();

      if (objectUrl) {
        // Revoking in the same tick can cancel the download in some browsers.
        window.setTimeout(() => URL.revokeObjectURL(objectUrl), 0);
      }
    },
    [design.id, design.src],
  );

  const startCloseIcon = (): void => {
    closeIconRef.current?.startAnimation();
  };

  const stopCloseIcon = (): void => {
    closeIconRef.current?.stopAnimation();
  };

  const startDownloadIcon = (): void => {
    downloadIconRef.current?.startAnimation();
  };

  const stopDownloadIcon = (): void => {
    downloadIconRef.current?.stopAnimation();
  };

  return createPortal(
    <div
      className={`${styles.scrim} ${
        prefersReducedMotion ? styles.scrimStatic : styles.scrimAnimated
      } ${closing ? styles.scrimClosing : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={design.alt}
      onClick={requestClose}
      onAnimationEnd={handleAnimationEnd}
    >
      <div
        className={styles.actions}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className={styles.action}
          aria-label="Cerrar foto"
          onClick={(event) => {
            event.stopPropagation();
            requestClose();
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

        <button
          type="button"
          className={`${styles.action} ${styles.download}`}
          aria-label="Descargar foto"
          onClick={handleDownload}
          onMouseEnter={startDownloadIcon}
          onMouseLeave={stopDownloadIcon}
          onFocus={startDownloadIcon}
          onBlur={stopDownloadIcon}
        >
          <DownloadIcon
            ref={downloadIconRef}
            size={18}
            strokeWidth={1.6}
            animateOnHover={false}
          />
          <span className={styles.downloadLabel} aria-hidden="true">
            Descargar
          </span>
        </button>
      </div>

      <img
        src={design.src}
        alt={design.alt}
        className={styles.image}
        draggable={false}
        onClick={(event) => event.stopPropagation()}
      />
    </div>,
    document.body,
  );
};
