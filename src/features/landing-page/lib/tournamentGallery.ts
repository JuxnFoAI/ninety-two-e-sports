import type { TournamentVideo } from "../types/tournamentVideo";

export const getTournamentVideoKey = (video: TournamentVideo): string =>
  `${video.youtubeId}-${video.startSeconds ?? 0}`;

/** On-air round label (`R8`). */
export const formatTournamentRoundLabel = (round: number): string =>
  `R${round}`;

/**
 * Season calendar order (R1 → latest in DOM): the championship reads left to right.
 */
export const orderTournamentVideosForSeasonCalendar = (
  videos: readonly TournamentVideo[],
): TournamentVideo[] => [...videos].sort((a, b) => a.round - b.round);

/** Returns the highest-round video (season current / default player selection). */
export const getLatestTournamentVideo = (
  videos: readonly TournamentVideo[],
): TournamentVideo | undefined =>
  videos.reduce<TournamentVideo | undefined>(
    (latest, video) => (!latest || video.round > latest.round ? video : latest),
    undefined,
  );

const TOURNAMENT_CALENDAR_SELECTOR = "[data-tournament-season-calendar]";

const CALENDAR_SCROLL_TOLERANCE_PX = 1;

/** Whether the season calendar can scroll further in either direction. */
export const getTournamentCalendarScrollState = (
  calendar: HTMLElement | null,
): { canScrollPrev: boolean; canScrollNext: boolean } => {
  if (!calendar) {
    return { canScrollPrev: false, canScrollNext: false };
  }

  const maxScrollLeft = calendar.scrollWidth - calendar.clientWidth;

  if (maxScrollLeft <= CALENDAR_SCROLL_TOLERANCE_PX) {
    return { canScrollPrev: false, canScrollNext: false };
  }

  return {
    canScrollPrev: calendar.scrollLeft > CALENDAR_SCROLL_TOLERANCE_PX,
    canScrollNext:
      calendar.scrollLeft < maxScrollLeft - CALENDAR_SCROLL_TOLERANCE_PX,
  };
};

/** Scrolls the season calendar horizontally without changing the active round. */
export const scrollTournamentCalendar = (
  calendar: HTMLElement | null,
  direction: -1 | 1,
): void => {
  if (!calendar) {
    return;
  }

  const step = Math.max(calendar.clientWidth * 0.75, 160);

  calendar.scrollBy({
    left: direction * step,
    behavior: "smooth",
  });
};

/** Scrolls a round into view within the calendar only (never the page). */
export const scrollTournamentRoundIntoCalendar = (
  button: HTMLButtonElement | null,
): void => {
  if (!button) {
    return;
  }

  const calendar = button.closest(TOURNAMENT_CALENDAR_SELECTOR);
  if (!(calendar instanceof HTMLElement)) {
    return;
  }

  const calendarRect = calendar.getBoundingClientRect();
  const buttonRect = button.getBoundingClientRect();
  const padding = 8;

  if (buttonRect.left < calendarRect.left + padding) {
    calendar.scrollBy({
      left: buttonRect.left - calendarRect.left - padding,
      behavior: "smooth",
    });
    return;
  }

  if (buttonRect.right > calendarRect.right - padding) {
    calendar.scrollBy({
      left: buttonRect.right - calendarRect.right + padding,
      behavior: "smooth",
    });
  }
};
