import { useCallback, useEffect, useRef, type MouseEvent } from "react";
import { createPortal } from "react-dom";

import { useEffectiveReducedMotion } from "@/features/accessibility";
import type { AnimatedIconHandle } from "@/shared/icons";
import { useScrollLock } from "@/shared/hooks";

import type { TeamDesign } from "../../types/design";
import { CloseIcon } from "../icons/CloseIcon";
import { DownloadIcon } from "../icons/DownloadIcon";
import styles from "./PhotoLightbox.module.css";

interface PhotoLightboxProps {
  design: TeamDesign;
  onClose: () => void;
}

export const PhotoLightbox = ({
  design,
  onClose,
}: PhotoLightboxProps): JSX.Element => {
  const prefersReducedMotion = useEffectiveReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const closeIconRef = useRef<AnimatedIconHandle>(null);
  const downloadIconRef = useRef<AnimatedIconHandle>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useScrollLock(true);

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [onClose]);

  const handleDownload = useCallback(
    async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
      event.stopPropagation();

      const response = await fetch(design.src);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${design.id}.png`;
      document.body.append(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
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
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={design.alt}
      onClick={onClose}
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
