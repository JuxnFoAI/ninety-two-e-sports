import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent,
} from "react";

import { easeOut } from "@/shared/lib/easings";

import type { NewsPhoto } from "../../lib/newsPhotos";
import styles from "./NewsPhotoSlider.module.css";

type NewsPhotoSliderProps = {
  photos: readonly NewsPhoto[];
  onSelect: (id: string) => void;
};

/** Full travel of one card, as a percentage of its own width (right edge to left edge). */
const CARD_TRAVEL_PERCENT = 420;
const LOOP_MS = 26_000;
const DRAG_THRESHOLD_PX = 12;
/** How long one arrow step takes to glide into place. */
const STEP_MS = 640;

type SlideTween = {
  frame: number;
  from: number;
  to: number;
  startedAt: number;
  durationMs: number;
};

const newsIdFromTarget = (target: EventTarget | null): string | null => {
  if (!(target instanceof Element)) {
    return null;
  }

  return target.closest<HTMLElement>("[data-news-id]")?.dataset.newsId ?? null;
};

const readTime = (animation: Animation | undefined): number | null => {
  const time = animation?.currentTime;
  return typeof time === "number" ? time : null;
};

const readDuration = (animation: Animation | undefined): number | null => {
  const duration = animation?.effect?.getComputedTiming().duration;
  return typeof duration === "number" && duration > 0 ? duration : null;
};

const cardAnimations = (list: HTMLElement): Animation[] =>
  [...list.querySelectorAll<HTMLElement>("li")].flatMap((item) => {
    const animation = item.getAnimations()[0];
    return animation ? [animation] : [];
  });

const applyPlayhead = (list: HTMLElement, time: number): void => {
  for (const animation of cardAnimations(list)) {
    const duration = readDuration(animation);
    if (duration === null) {
      continue;
    }

    animation.currentTime = ((time % duration) + duration) % duration;
  }
};

const seekBy = (list: HTMLElement, deltaMs: number): void => {
  const current = readTime(cardAnimations(list)[0]);
  if (current === null) {
    return;
  }

  applyPlayhead(list, current + deltaMs);
};

const sampleSlide = (slide: SlideTween, now: number): number => {
  const progress = Math.min(1, (now - slide.startedAt) / slide.durationMs);
  return slide.from + (slide.to - slide.from) * easeOut(progress);
};

/**
 * Infinite card row. Cards stay put until the visitor drags them, or
 * steps with the arrows. The paused loop keeps the center card largest.
 */
export const NewsPhotoSlider = ({
  photos,
  onSelect,
}: NewsPhotoSliderProps): JSX.Element => {
  const viewportRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const suppressClick = useRef(false);
  const slideRef = useRef<SlideTween | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    lastX: number;
    moved: boolean;
    newsId: string | null;
  } | null>(null);
  const [dragging, setDragging] = useState(false);

  const cancelSlide = (): void => {
    const slide = slideRef.current;
    if (!slide) {
      return;
    }

    cancelAnimationFrame(slide.frame);
    slideRef.current = null;
  };

  useEffect(
    () => () => {
      const slide = slideRef.current;
      if (slide) {
        cancelAnimationFrame(slide.frame);
      }
    },
    [],
  );

  const stepCard = (direction: 1 | -1): void => {
    const list = listRef.current;
    const count = photos.length;
    const loop = list ? readDuration(cardAnimations(list)[0]) : null;
    const from = list
      ? slideRef.current
        ? sampleSlide(slideRef.current, performance.now())
        : readTime(cardAnimations(list)[0])
      : null;
    if (!list || loop === null || from === null || count === 0) {
      return;
    }

    const step = direction * (loop / count);
    const to = (slideRef.current?.to ?? from) + step;
    const durationMs = Math.min(
      980,
      STEP_MS * Math.max(1, Math.abs(to - from) / (loop / count)),
    );

    cancelSlide();

    const tween: SlideTween = {
      frame: 0,
      from,
      to,
      startedAt: performance.now(),
      durationMs,
    };

    const tick = (now: number): void => {
      const slide = slideRef.current;
      const currentList = listRef.current;
      if (!slide || !currentList) {
        return;
      }

      if (now - slide.startedAt >= slide.durationMs) {
        applyPlayhead(currentList, slide.to);
        slideRef.current = null;
        return;
      }

      applyPlayhead(currentList, sampleSlide(slide, now));
      slide.frame = requestAnimationFrame(tick);
    };

    slideRef.current = tween;
    tween.frame = requestAnimationFrame(tick);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>): void => {
    if (event.button !== 0) {
      return;
    }

    // Stops the browser from dragging the photo itself (the slashed cursor).
    event.preventDefault();

    const list = listRef.current;
    if (list && slideRef.current) {
      applyPlayhead(list, sampleSlide(slideRef.current, performance.now()));
      cancelSlide();
    }

    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      lastX: event.clientX,
      moved: false,
      newsId: newsIdFromTarget(event.target),
    };
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>): void => {
    const drag = dragRef.current;
    const list = listRef.current;
    const card = list?.querySelector("li");
    if (!drag || !list || !card || event.pointerId !== drag.pointerId) {
      return;
    }

    const dx = event.clientX - drag.lastX;
    drag.lastX = event.clientX;
    if (Math.abs(event.clientX - drag.startX) < DRAG_THRESHOLD_PX) {
      return;
    }

    if (!drag.moved) {
      drag.moved = true;
      setDragging(true);
      viewportRef.current?.setPointerCapture(event.pointerId);
    }

    const duration = readDuration(cardAnimations(list)[0]);
    const cardWidth = card.getBoundingClientRect().width;
    if (duration === null || cardWidth <= 0) {
      return;
    }

    const travelPx = cardWidth * ((CARD_TRAVEL_PERCENT * 2) / 100);
    seekBy(list, (-dx / travelPx) * duration);
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>): void => {
    const drag = dragRef.current;
    if (!drag || event.pointerId !== drag.pointerId) {
      return;
    }

    suppressClick.current = true;
    window.setTimeout(() => {
      suppressClick.current = false;
    }, 0);

    if (!drag.moved && drag.newsId) {
      onSelect(drag.newsId);
    }

    dragRef.current = null;
    setDragging(false);
  };

  return (
    <div
      className={`${styles.slider} ${dragging ? styles.dragging : ""}`.trim()}
      style={
        {
          "--photo-count": String(photos.length),
          "--loop-duration": `${LOOP_MS}ms`,
        } as CSSProperties
      }
    >
      <div
        ref={viewportRef}
        className={styles.viewport}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDragStart={(event) => event.preventDefault()}
      >
        <ul
          ref={listRef}
          className={styles.list}
          aria-label="Fotos de noticias"
        >
          {photos.map((photo, index) => (
            <li
              key={photo.id}
              className={styles.card}
              style={
                {
                  animationDelay: `${-(((0.5 + index / photos.length) % 1) * LOOP_MS)}ms`,
                } as CSSProperties
              }
            >
              <button
                type="button"
                className={styles.select}
                data-news-id={photo.id}
                onClick={() => {
                  if (suppressClick.current) {
                    return;
                  }
                  onSelect(photo.id);
                }}
                aria-label={`Abrir noticia: ${photo.imageAlt}`}
              >
                <figure className={styles.frame}>
                  <img
                    src={photo.image}
                    alt=""
                    className={styles.image}
                    draggable={false}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </figure>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.controls}>
        <button
          type="button"
          className={styles.control}
          onClick={() => stepCard(-1)}
          aria-label="Noticia anterior"
        >
          <span
            className={`${styles.chevron} ${styles.chevronPrev}`}
            aria-hidden
          />
        </button>
        <button
          type="button"
          className={styles.control}
          onClick={() => stepCard(1)}
          aria-label="Noticia siguiente"
        >
          <span
            className={`${styles.chevron} ${styles.chevronNext}`}
            aria-hidden
          />
        </button>
      </div>
    </div>
  );
};
