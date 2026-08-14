import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";
import { easeInOutCubic } from "@/shared/lib/easings";

import { TEAM_DESIGNS } from "../../data/designs";
import type { TeamDesign } from "../../types/design";
import styles from "./FotosGallery.module.css";
import { PhotoLightbox } from "./PhotoLightbox";

/** Only three cards sit in the fan; the rest wait in the deck order. */
const VISIBLE_COUNT = 3;
/** Open hand-of-cards fan for the visible trio (edge-to-edge degrees). */
const FAN_SPREAD_DEG = 38;
const FAN_X_PX = 28;
const FAN_ARC_Y_PX = 8;
/** Drag distance (px) to the right before the next photo takes the front. */
const DRAG_COMMIT_PX = 110;
const DECK_LEAVE_MS = 450;
const GRID_STAGGER_MS = 70;
/** Soft scroll under the FOTOS title before the ordered grid reveals. */
const GRID_SCROLL_MS = 1100;
/** Smallest card width that still lets 4 columns fit on desktop. */
const GRID_CARD_MIN_REM = 16;
const GRID_MAX_COLUMNS = 4;
/** Matches `.grid` / `.column` gap (`2rem`). */
const GRID_GAP_REM = 2;
/** Fan drag below this is treated as a click to open the photo. */
const LIGHTBOX_CLICK_MAX_PX = 12;

const getFotosGridColumnCount = (containerWidth: number): number => {
  const rem =
    Number.parseFloat(getComputedStyle(document.documentElement).fontSize) ||
    16;
  const gap = GRID_GAP_REM * rem;
  const minCard = GRID_CARD_MIN_REM * rem;

  return Math.min(
    GRID_MAX_COLUMNS,
    Math.max(1, Math.floor((containerWidth + gap) / (minCard + gap))),
  );
};

const splitIntoColumns = <T,>(items: readonly T[], count: number): T[][] => {
  const columns = Array.from({ length: count }, () => [] as T[]);

  items.forEach((item, index) => {
    columns[index % count].push(item);
  });

  return columns;
};

const getFotosSectionScrollTop = (): number | null => {
  const section = document.getElementById("fotos");
  if (!section) {
    return null;
  }

  const scrollMarginTop = Number.parseFloat(
    getComputedStyle(section).scrollMarginTop,
  );
  const margin = Number.isFinite(scrollMarginTop) ? scrollMarginTop : 0;

  return Math.max(
    0,
    section.getBoundingClientRect().top + window.scrollY - margin,
  );
};

const animateWindowScrollTo = (
  targetY: number,
  durationMs: number,
  onComplete?: () => void,
): (() => void) => {
  const startY = window.scrollY;
  const delta = targetY - startY;

  if (Math.abs(delta) < 1) {
    onComplete?.();
    return () => {};
  }

  const startedAt = performance.now();
  let frameId = 0;
  let cancelled = false;

  const tick = (now: number): void => {
    if (cancelled) {
      return;
    }

    const progress = Math.min(1, (now - startedAt) / durationMs);
    window.scrollTo(0, startY + delta * easeInOutCubic(progress));

    if (progress < 1) {
      frameId = window.requestAnimationFrame(tick);
      return;
    }

    onComplete?.();
  };

  frameId = window.requestAnimationFrame(tick);

  return () => {
    cancelled = true;
    window.cancelAnimationFrame(frameId);
  };
};

const getFanTransform = (
  slotIndex: number,
  total: number,
  dragX = 0,
  dragRotate = 0,
): string => {
  const mid = (total - 1) / 2;
  const unit = slotIndex - mid;
  const fanRotate = unit * (FAN_SPREAD_DEG / Math.max(1, total - 1));
  const fanX = unit * FAN_X_PX;
  const fanY = Math.abs(unit) * FAN_ARC_Y_PX;

  return `translate3d(${fanX + dragX}px, ${fanY}px, 0) rotate(${
    fanRotate + dragRotate
  }deg)`;
};

export const FotosGallery = (): JSX.Element => {
  const prefersReducedMotion = useEffectiveReducedMotion();
  const [order, setOrder] = useState(() =>
    TEAM_DESIGNS.map((_, index) => index),
  );
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [deckLeaving, setDeckLeaving] = useState(false);
  const [expanding, setExpanding] = useState(false);
  const leaveTimerRef = useRef<number | null>(null);
  const cancelScrollRef = useRef<(() => void) | null>(null);
  const pointerStartX = useRef<number | null>(null);
  const dragXRef = useRef(0);
  const activePointerId = useRef<number | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState(1);
  const [lightbox, setLightbox] = useState<TeamDesign | null>(null);

  const closeLightbox = useCallback((): void => {
    setLightbox(null);
  }, []);

  const visibleOrder = order.slice(-VISIBLE_COUNT);
  const visibleTotal = visibleOrder.length;
  const frontSlot = visibleTotal - 1;
  const frontDesign = TEAM_DESIGNS[visibleOrder[frontSlot]];
  const showFan = !expanded;
  const expandInFlight = expanding || deckLeaving;

  const clearExpandTimers = useCallback((): void => {
    cancelScrollRef.current?.();
    cancelScrollRef.current = null;

    if (leaveTimerRef.current != null) {
      window.clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      clearExpandTimers();
    };
  }, [clearExpandTimers]);

  useLayoutEffect(() => {
    if (!expanded) {
      return undefined;
    }

    const node = gridRef.current;

    if (!node) {
      return undefined;
    }

    const updateColumnCount = (): void => {
      setColumnCount(getFotosGridColumnCount(node.clientWidth));
    };

    updateColumnCount();
    const observer = new ResizeObserver(updateColumnCount);
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [expanded]);

  const beginGridReveal = useCallback((): void => {
    if (prefersReducedMotion) {
      setExpanded(true);
      setDeckLeaving(false);
      setExpanding(false);
      return;
    }

    setDeckLeaving(true);

    if (leaveTimerRef.current != null) {
      window.clearTimeout(leaveTimerRef.current);
    }

    leaveTimerRef.current = window.setTimeout(() => {
      setExpanded(true);
      setDeckLeaving(false);
      setExpanding(false);
      leaveTimerRef.current = null;
    }, DECK_LEAVE_MS);
  }, [prefersReducedMotion]);

  const advancePhoto = useCallback(() => {
    setOrder((current) => {
      if (current.length < 2) {
        return current;
      }
      const next = [...current];
      const [front] = next.splice(next.length - 1, 1);
      next.unshift(front);
      return next;
    });
    dragXRef.current = 0;
    setDragX(0);
    setDragging(false);
  }, []);

  const handleExpandToggle = (): void => {
    if (expanded) {
      clearExpandTimers();
      setExpanded(false);
      setDeckLeaving(false);
      setExpanding(false);
      return;
    }

    if (expandInFlight) {
      return;
    }

    dragXRef.current = 0;
    setDragX(0);
    setDragging(false);
    setExpanding(true);

    const targetY = getFotosSectionScrollTop();

    const afterScroll = (): void => {
      cancelScrollRef.current = null;
      beginGridReveal();
    };

    if (targetY == null) {
      afterScroll();
      return;
    }

    if (prefersReducedMotion) {
      window.scrollTo({ top: targetY, left: 0, behavior: "instant" });
      afterScroll();
      return;
    }

    cancelScrollRef.current = animateWindowScrollTo(
      targetY,
      GRID_SCROLL_MS,
      afterScroll,
    );
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLLIElement>): void => {
    if (event.button !== 0 || expanded || expandInFlight) {
      return;
    }
    activePointerId.current = event.pointerId;
    pointerStartX.current = event.clientX;
    dragXRef.current = 0;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLLIElement>): void => {
    if (
      activePointerId.current !== event.pointerId ||
      pointerStartX.current == null
    ) {
      return;
    }

    const delta = Math.max(0, event.clientX - pointerStartX.current);
    dragXRef.current = delta;
    setDragX(delta);
  };

  const endDrag = (event: ReactPointerEvent<HTMLLIElement>): void => {
    if (activePointerId.current !== event.pointerId) {
      return;
    }

    const committed = dragXRef.current >= DRAG_COMMIT_PX;
    activePointerId.current = null;
    pointerStartX.current = null;
    setDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    if (committed) {
      advancePhoto();
      return;
    }

    if (dragXRef.current <= LIGHTBOX_CLICK_MAX_PX) {
      setLightbox(frontDesign);
    }

    dragXRef.current = 0;
    setDragX(0);
  };

  return (
    <div className={styles.stage}>
      {showFan ? (
        <ul
          className={`${styles.deck} ${deckLeaving ? styles.deckLeaving : ""}`}
          role="list"
          aria-label="Fotos del equipo. Arrastra la carta frontal a la derecha para ver la siguiente."
          aria-hidden={expandInFlight || undefined}
        >
          {visibleOrder.map((designIndex, slotIndex) => {
            const design = TEAM_DESIGNS[designIndex];
            const isFront = slotIndex === frontSlot;
            const dragRotate = isFront ? dragX * 0.045 : 0;

            return (
              <li
                key={design.id}
                className={`${styles.card} ${isFront ? styles.cardFront : ""}`}
                style={
                  {
                    zIndex: slotIndex + 1,
                    transform: getFanTransform(
                      slotIndex,
                      visibleTotal,
                      isFront ? dragX : 0,
                      dragRotate,
                    ),
                    transition:
                      isFront && dragging
                        ? "none"
                        : prefersReducedMotion
                          ? "none"
                          : "transform 320ms cubic-bezier(0.16, 1, 0.3, 1)",
                  } as CSSProperties
                }
                onPointerDown={isFront ? handlePointerDown : undefined}
                onPointerMove={isFront ? handlePointerMove : undefined}
                onPointerUp={isFront ? endDrag : undefined}
                onPointerCancel={isFront ? endDrag : undefined}
              >
                <figure className={styles.media}>
                  <img
                    src={design.src}
                    alt={isFront ? design.alt : ""}
                    className={styles.image}
                    loading="eager"
                    decoding="async"
                    draggable={false}
                  />
                  <div className={styles.overlay} aria-hidden />
                </figure>
              </li>
            );
          })}
        </ul>
      ) : (
        <div
          ref={gridRef}
          className={styles.grid}
          role="list"
          aria-label="Todas las fotos del equipo"
        >
          {splitIntoColumns(
            TEAM_DESIGNS.map((design, index) => ({ design, index })),
            columnCount,
          ).map((column, columnIndex) => (
            <div
              key={columnIndex}
              className={styles.column}
              role="presentation"
            >
              {column.map(({ design, index }) => (
                <div
                  key={design.id}
                  className={styles.gridItem}
                  role="listitem"
                >
                  <div
                    className={`${styles.gridRise} ${
                      prefersReducedMotion
                        ? styles.gridRiseVisible
                        : styles.gridRiseAnimated
                    }`}
                    style={
                      prefersReducedMotion
                        ? undefined
                        : ({
                            animationDelay: `${index * GRID_STAGGER_MS}ms`,
                          } as CSSProperties)
                    }
                  >
                    <button
                      type="button"
                      className={styles.gridOpen}
                      aria-label={`Ver foto: ${design.alt}`}
                      onClick={() => setLightbox(design)}
                    >
                      <figure className={styles.gridCard}>
                        <div className={styles.gridMedia}>
                          <img
                            src={design.src}
                            alt=""
                            className={styles.gridImage}
                            loading={index < 6 ? "eager" : "lazy"}
                            decoding="async"
                          />
                          <div className={styles.gridOverlay} aria-hidden />
                        </div>
                      </figure>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        className={`${styles.expandAction} ${
          expanded ? styles.expandActionActive : ""
        } ${expanded ? styles.expandActionBelowGrid : ""}`}
        aria-pressed={expanded}
        aria-busy={expandInFlight || undefined}
        disabled={expandInFlight}
        aria-label={
          expanded
            ? "Contraer la galería al abanico"
            : `Expandir todas las fotos desde ${frontDesign.alt}`
        }
        onClick={handleExpandToggle}
      >
        {expanded ? "Contraer" : "Expandir"}
      </button>

      {prefersReducedMotion && !expanded ? (
        <button
          type="button"
          className={styles.expandAction}
          onClick={advancePhoto}
        >
          Siguiente foto
        </button>
      ) : null}

      {lightbox ? (
        <PhotoLightbox design={lightbox} onClose={closeLightbox} />
      ) : null}
    </div>
  );
};
