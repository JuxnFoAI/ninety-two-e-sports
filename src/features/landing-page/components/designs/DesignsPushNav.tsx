import { useEffect, useId, useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/shared/hooks";

import { TEAM_DESIGNS } from "../../data/designs";

import closeStyles from "./DesignsCloseButton.module.css";
import galleryStyles from "./DesignsGallery.module.css";

interface DesignsPushNavProps {
  open: boolean;
  onClose: () => void;
}

export const DesignsPushNav = ({
  open,
  onClose,
}: DesignsPushNavProps): JSX.Element => {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  onCloseRef.current = onClose;

  useEffect(() => {
    const panel = panelRef.current;
    if (panel) {
      panel.inert = !open;
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      setExpandedId(null);
    }
  }, [open]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key !== "Escape") {
        return;
      }

      if (expandedId) {
        setExpandedId(null);
        return;
      }

      onCloseRef.current();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      previouslyFocused?.focus?.();
    };
  }, [open, expandedId]);

  const transitionClass = prefersReducedMotion
    ? ""
    : "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

  const toggleExpanded = (id: string): void => {
    setExpandedId((current) => (current === id ? null : id));
  };

  useEffect(() => {
    if (!expandedId) {
      return;
    }

    const node = panelRef.current?.querySelector(
      `[data-design-id="${expandedId}"]`,
    );
    node?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "nearest",
    });
  }, [expandedId, prefersReducedMotion]);

  return (
    <div
      ref={panelRef}
      id="designs-push-nav"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-hidden={!open}
      className={`fixed inset-0 z-50 flex w-full flex-col bg-black ${transitionClass} ${
        open ? "translate-x-0" : "pointer-events-none translate-x-full"
      }`}
    >
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 px-[clamp(1rem,4vw,4rem)] py-4 sm:py-5">
        <div>
          <p className="m-0 mb-1 text-[0.62rem] font-medium uppercase tracking-[0.28em] text-white/45">
            Ninety Two E-Sports
          </p>
          <h2
            id={titleId}
            className="m-0 text-[0.78rem] font-medium uppercase tracking-[0.2em] text-white/95 sm:text-[0.85rem]"
          >
            Diseños del Equipo
          </h2>
        </div>
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className={closeStyles.close}
          aria-label="Cerrar diseños del equipo"
        >
          <svg
            className={closeStyles.icon}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path
              d="M5 5l14 14M19 5L5 19"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </header>

      <div
        className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-[clamp(1rem,4vw,4rem)] py-6 sm:py-8"
        data-scroll-lock-scrollable=""
      >
        <ul className="m-0 mx-auto grid max-w-7xl list-none grid-cols-1 items-start gap-4 p-0 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
          {TEAM_DESIGNS.map((design) => {
            const isExpanded = expandedId === design.id;
            const isDimmed = expandedId !== null && !isExpanded;

            return (
              <li
                key={design.id}
                data-design-id={design.id}
                className={`${galleryStyles.item} ${
                  isExpanded
                    ? "col-span-1 sm:col-span-2 lg:col-span-2"
                    : "col-span-1"
                } ${isDimmed ? galleryStyles.itemDimmed : ""}`}
              >
                <button
                  type="button"
                  className={`${galleryStyles.trigger} ${
                    isExpanded ? galleryStyles.triggerExpanded : ""
                  }`}
                  aria-expanded={isExpanded}
                  aria-label={
                    isExpanded
                      ? `Reducir ${design.alt}`
                      : `Ampliar ${design.alt}`
                  }
                  onClick={() => toggleExpanded(design.id)}
                >
                  <figure
                    className={`m-0 ${galleryStyles.frame} ${
                      isExpanded ? galleryStyles.frameExpanded : ""
                    }`}
                  >
                    <div className={galleryStyles.media}>
                      <img
                        src={design.src}
                        alt={design.alt}
                        className={galleryStyles.image}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className={galleryStyles.overlay} aria-hidden />
                    </div>
                  </figure>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
