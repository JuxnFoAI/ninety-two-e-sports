import type { TournamentVideo } from "../types/tournamentVideo";

export const getTournamentVideoKey = (video: TournamentVideo): string =>
  `${video.youtubeId}-${video.startSeconds ?? 0}`;

/**
 * Gallery strip order (R8 → R1 in DOM): newest on the left, oldest on the right.
 * Uses natural horizontal scroll — swipe/scroll right reveals older rounds.
 */
export const orderTournamentVideosForGalleryStrip = (
  videos: readonly TournamentVideo[],
): TournamentVideo[] => [...videos].sort((a, b) => b.round - a.round);

export const findTournamentVideoIndex = (
  videos: readonly TournamentVideo[],
  videoKey: string,
): number =>
  videos.findIndex((video) => getTournamentVideoKey(video) === videoKey);

export const getTournamentVideoByOffset = (
  videos: readonly TournamentVideo[],
  currentKey: string,
  offset: number,
): TournamentVideo | undefined => {
  const currentIndex = findTournamentVideoIndex(videos, currentKey);
  if (currentIndex < 0) {
    return undefined;
  }

  return videos[currentIndex + offset];
};

/** Returns the highest-round video (leftmost / default player selection). */
export const getLatestTournamentVideo = (
  videos: readonly TournamentVideo[],
): TournamentVideo | undefined =>
  videos.reduce<TournamentVideo | undefined>(
    (latest, video) => (!latest || video.round > latest.round ? video : latest),
    undefined,
  );

const TOURNAMENT_THUMB_STRIP_SELECTOR = "[data-tournament-thumb-strip]";

const THUMB_STRIP_SCROLL_TOLERANCE_PX = 1;

/** Whether the horizontal thumbnail strip can scroll further in either direction. */
export const getTournamentThumbStripScrollState = (
  strip: HTMLElement | null,
): { canScrollPrev: boolean; canScrollNext: boolean } => {
  if (!strip) {
    return { canScrollPrev: false, canScrollNext: false };
  }

  const maxScrollLeft = strip.scrollWidth - strip.clientWidth;

  if (maxScrollLeft <= THUMB_STRIP_SCROLL_TOLERANCE_PX) {
    return { canScrollPrev: false, canScrollNext: false };
  }

  return {
    canScrollPrev: strip.scrollLeft > THUMB_STRIP_SCROLL_TOLERANCE_PX,
    canScrollNext:
      strip.scrollLeft < maxScrollLeft - THUMB_STRIP_SCROLL_TOLERANCE_PX,
  };
};

/** Scrolls the thumbnail strip horizontally without changing the active video. */
export const scrollTournamentThumbStrip = (
  strip: HTMLElement | null,
  direction: -1 | 1,
): void => {
  if (!strip) {
    return;
  }

  const step = Math.max(strip.clientWidth * 0.75, 160);

  strip.scrollBy({
    left: direction * step,
    behavior: "smooth",
  });
};

/** Scrolls a thumbnail into view within the horizontal strip only (never the page). */
export const scrollTournamentThumbIntoStrip = (
  button: HTMLButtonElement | null,
): void => {
  if (!button) {
    return;
  }

  const strip = button.closest(TOURNAMENT_THUMB_STRIP_SELECTOR);
  if (!(strip instanceof HTMLElement)) {
    return;
  }

  const stripRect = strip.getBoundingClientRect();
  const buttonRect = button.getBoundingClientRect();
  const padding = 8;

  if (buttonRect.left < stripRect.left + padding) {
    strip.scrollBy({
      left: buttonRect.left - stripRect.left - padding,
      behavior: "smooth",
    });
    return;
  }

  if (buttonRect.right > stripRect.right - padding) {
    strip.scrollBy({
      left: buttonRect.right - stripRect.right + padding,
      behavior: "smooth",
    });
  }
};
