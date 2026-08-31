import { useCallback, useEffect, useRef, useState, type Ref } from "react";

import { useHorizontalDragScroll, useMediaQuery } from "@/shared/hooks";

import {
  formatTournamentRoundLabel,
  getTournamentCalendarScrollState,
  getTournamentVideoKey,
  scrollTournamentCalendar,
  scrollTournamentRoundIntoCalendar,
} from "../../lib/tournamentGallery";
import type {
  TournamentChampionship,
  TournamentVideo,
} from "../../types/tournamentVideo";
import { TournamentGalleryNavButton } from "./TournamentGalleryNavButton";
import styles from "./TournamentSeasonCalendar.module.css";

const CALENDAR_ID = "tournament-season-calendar";
const TOUCH_PRIMARY_MEDIA_QUERY = "(hover: none) and (pointer: coarse)";

interface TournamentSeasonCalendarProps {
  championships: readonly TournamentChampionship[];
  selectedChampionshipId: string;
  onSelectChampionship: (championshipId: string) => void;
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
  const roundLabel = formatTournamentRoundLabel(video);
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

const ChampionshipSwitcher = ({
  championships,
  selectedChampionshipId,
  onSelectChampionship,
}: Pick<
  TournamentSeasonCalendarProps,
  "championships" | "selectedChampionshipId" | "onSelectChampionship"
>): JSX.Element => {
  const selectedChampionship =
    championships.find(
      (championship) => championship.id === selectedChampionshipId,
    ) ?? championships[0];

  if (championships.length <= 1) {
    return <p className={styles.season}>{selectedChampionship?.label ?? ""}</p>;
  }

  return (
    <div className={styles.seasons} role="group" aria-label="Campeonatos">
      {championships.map((championship) => {
        const isActive = championship.id === selectedChampionshipId;

        return (
          <button
            key={championship.id}
            type="button"
            aria-pressed={isActive}
            className={`${styles.seasonTab} ${
              isActive ? styles.seasonTabActive : styles.seasonTabIdle
            }`}
            onClick={() => onSelectChampionship(championship.id)}
          >
            {championship.label}
          </button>
        );
      })}
    </div>
  );
};

export const TournamentSeasonCalendar = ({
  championships,
  selectedChampionshipId,
  onSelectChampionship,
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
    const calendar = calendarElementRef.current;
    if (calendar) {
      calendar.scrollLeft = 0;
    }
    scrollTournamentRoundIntoCalendar(activeStopRef.current);
  }, [selectedChampionshipId, selectedKey]);

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

  const selectedChampionship =
    championships.find(
      (championship) => championship.id === selectedChampionshipId,
    ) ?? championships[0];
  const showRoundNav = videos.length > 1;
  const calendarLabel = selectedChampionship
    ? `Calendario de ${selectedChampionship.label}, de la ronda más reciente a la más antigua`
    : "Calendario de la temporada, de la ronda más reciente a la más antigua";

  return (
    <div className={styles.bleed}>
      <ChampionshipSwitcher
        championships={championships}
        selectedChampionshipId={selectedChampionshipId}
        onSelectChampionship={onSelectChampionship}
      />
      <div className={styles.row}>
        {showRoundNav ? (
          <TournamentGalleryNavButton
            direction="prev"
            disabled={!canScrollPrev}
            onClick={() =>
              scrollTournamentCalendar(calendarElementRef.current, -1)
            }
          />
        ) : null}

        <div className={styles.scroll}>
          <ol
            id={CALENDAR_ID}
            ref={setCalendarRef}
            className={`${styles.track} ${
              isCalendarDragging ? styles.trackDragging : styles.trackIdle
            }`}
            data-tournament-season-calendar=""
            aria-label={calendarLabel}
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

        {showRoundNav ? (
          <TournamentGalleryNavButton
            direction="next"
            disabled={!canScrollNext}
            onClick={() =>
              scrollTournamentCalendar(calendarElementRef.current, 1)
            }
          />
        ) : null}
      </div>
    </div>
  );
};
