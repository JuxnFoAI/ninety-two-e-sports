import { useCallback, useEffect, useRef, useState, type Ref } from "react";

import { useHorizontalDragScroll, useMediaQuery } from "@/shared/hooks";

import { TOURNAMENT_SEASON_LABEL } from "../../data/tournaments";
import {
  formatTournamentRoundLabel,
  getTournamentCalendarScrollState,
  getTournamentVideoKey,
  scrollTournamentCalendar,
  scrollTournamentRoundIntoCalendar,
} from "../../lib/tournamentGallery";
import type { TournamentVideo } from "../../types/tournamentVideo";
import { TournamentGalleryNavButton } from "./TournamentGalleryNavButton";
import styles from "./TournamentSeasonCalendar.module.css";

const CALENDAR_ID = "tournament-season-calendar";
const TOUCH_PRIMARY_MEDIA_QUERY = "(hover: none) and (pointer: coarse)";

interface TournamentSeasonCalendarProps {
  videos: readonly TournamentVideo[];
  selectedKey: string;
  onSelect: (videoKey: string) => void;
}

interface TournamentRoundStopProps {
  video: TournamentVideo;
  isActive: boolean;
  onSelect: () => void;
  buttonRef?: Ref<HTMLButtonElement>;
}

const TournamentRoundStop = ({
  video,
  isActive,
  onSelect,
  buttonRef,
}: TournamentRoundStopProps): JSX.Element => {
  const roundLabel = formatTournamentRoundLabel(video.round);
  const statusLabel = isActive ? "En juego" : "Disputada";

  return (
    <li className={styles.stopItem}>
      <button
        ref={buttonRef}
        type="button"
        aria-pressed={isActive}
        aria-current={isActive ? "true" : undefined}
        aria-label={`${roundLabel} · ${video.circuit}: ${statusLabel}. ${video.headline}`}
        className={`${styles.stop} ${isActive ? styles.stopActive : styles.stopIdle}`}
        onClick={onSelect}
      >
        <span className={styles.round}>{roundLabel}</span>
        <span className={styles.nodeRow} aria-hidden>
          <span className={styles.node} />
        </span>
        <span className={styles.circuit}>{video.circuit}</span>
        <span className={styles.status}>{statusLabel}</span>
      </button>
    </li>
  );
};

export const TournamentSeasonCalendar = ({
  videos,
  selectedKey,
  onSelect,
}: TournamentSeasonCalendarProps): JSX.Element => {
  const isTouchPrimary = useMediaQuery(TOUCH_PRIMARY_MEDIA_QUERY);
  const activeStopRef = useRef<HTMLButtonElement>(null);
  const calendarElementRef = useRef<HTMLElement | null>(null);
  const {
    ref: setDragScrollRef,
    dragScrollProps,
    isDragging: isCalendarDragging,
  } = useHorizontalDragScroll(true, { preferVerticalTouchPan: isTouchPrimary });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const setCalendarRef = useCallback(
    (node: HTMLOListElement | null) => {
      calendarElementRef.current = node;
      setDragScrollRef(node);
    },
    [setDragScrollRef],
  );

  const syncCalendarScrollState = useCallback((): void => {
    const { canScrollPrev: prev, canScrollNext: next } =
      getTournamentCalendarScrollState(calendarElementRef.current);
    setCanScrollPrev(prev);
    setCanScrollNext(next);
  }, []);

  useEffect(() => {
    scrollTournamentRoundIntoCalendar(activeStopRef.current);
  }, [selectedKey]);

  useEffect(() => {
    const calendar = calendarElementRef.current;
    if (!calendar || videos.length <= 1) {
      return undefined;
    }

    syncCalendarScrollState();

    calendar.addEventListener("scroll", syncCalendarScrollState, {
      passive: true,
    });

    const resizeObserver = new ResizeObserver(syncCalendarScrollState);
    resizeObserver.observe(calendar);

    return () => {
      calendar.removeEventListener("scroll", syncCalendarScrollState);
      resizeObserver.disconnect();
    };
  }, [syncCalendarScrollState, videos.length]);

  return (
    <div className={styles.bleed}>
      <p className={styles.season}>{TOURNAMENT_SEASON_LABEL}</p>
      <div className={styles.row}>
        <TournamentGalleryNavButton
          direction="prev"
          disabled={!canScrollPrev}
          onClick={() =>
            scrollTournamentCalendar(calendarElementRef.current, -1)
          }
        />

        <div className={styles.scroll}>
          <ol
            id={CALENDAR_ID}
            ref={setCalendarRef}
            className={`${styles.track} ${
              isCalendarDragging ? styles.trackDragging : styles.trackIdle
            }`}
            data-tournament-season-calendar=""
            aria-label="Calendario de la temporada, de la primera ronda a la última"
            {...dragScrollProps}
          >
            {videos.map((video) => {
              const videoKey = getTournamentVideoKey(video);
              const isActive = videoKey === selectedKey;

              return (
                <TournamentRoundStop
                  key={videoKey}
                  video={video}
                  isActive={isActive}
                  buttonRef={isActive ? activeStopRef : undefined}
                  onSelect={() => onSelect(videoKey)}
                />
              );
            })}
          </ol>
        </div>

        <TournamentGalleryNavButton
          direction="next"
          disabled={!canScrollNext}
          onClick={() =>
            scrollTournamentCalendar(calendarElementRef.current, 1)
          }
        />
      </div>
    </div>
  );
};
