import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Ref,
} from "react";

import { useCaptionsPreferred } from "@/features/accessibility";
import { useHorizontalDragScroll, useMediaQuery } from "@/shared/hooks";

import { TOURNAMENT_VIDEOS } from "../../data/tournaments";
import {
  getLatestTournamentVideo,
  getTournamentThumbStripScrollState,
  getTournamentVideoKey,
  scrollTournamentThumbIntoStrip,
  scrollTournamentThumbStrip,
} from "../../lib/tournamentGallery";
import { getYoutubeEmbedUrl, getYoutubeThumbnailUrl } from "../../lib/youtube";
import type { TournamentVideo } from "../../types/tournamentVideo";
import { RevealItem, useRevealSection } from "../reveal";
import { TournamentGalleryNavButton } from "./TournamentGalleryNavButton";
import {
  THUMB_FRAME_ACTIVE_CLASS,
  THUMB_FRAME_IDLE_CLASS,
  THUMB_PREVIEW_IMAGE_CLASS,
  THUMB_PREVIEW_INNER_CLASS,
  THUMB_PREVIEW_OVERLAY_CLASS,
  THUMB_STRIP_CLASS,
  THUMB_STRIP_DRAGGING_CLASS,
  THUMB_STRIP_IDLE_CLASS,
  THUMB_STRIP_NAV_ROW_CLASS,
  THUMB_STRIP_SCROLL_CLASS,
  THUMB_STRIP_WRAPPER_CLASS,
  THUMB_TITLE_CLASS,
} from "./tournamentGalleryStyles";

const THUMB_STRIP_ID = "tournament-thumb-strip";

const LATEST_VIDEO = getLatestTournamentVideo(TOURNAMENT_VIDEOS);

const TOUCH_PRIMARY_MEDIA_QUERY = "(hover: none) and (pointer: coarse)";

const PLAYER_FRAME_CLASS =
  "relative aspect-video w-full overflow-hidden border border-white/12 bg-black shadow-[0_0_40px_rgba(0,0,0,0.45)]";

const PLAYER_POSTER_BUTTON_CLASS =
  "group absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center border-0 bg-black p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70";

const PLAYER_POSTER_IMAGE_CLASS =
  "absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] motion-reduce:group-hover:scale-100";

const PLAYER_PLAY_OVERLAY_CLASS =
  "pointer-events-none absolute inset-0 bg-black/35 transition-colors duration-300 group-hover:bg-black/25 motion-reduce:transition-none";

const PLAYER_PLAY_ICON_CLASS =
  "relative z-[1] flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-black/55 text-white shadow-[0_8px_32px_rgba(0,0,0,0.45)] backdrop-blur-sm transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100 sm:h-[4.5rem] sm:w-[4.5rem]";

interface TournamentVideoGalleryProps {
  revealStartIndex: number;
}

interface TournamentThumbCardProps {
  video: TournamentVideo;
  isActive: boolean;
  onSelect: () => void;
  buttonRef?: Ref<HTMLButtonElement>;
}

const TournamentThumbCard = ({
  video,
  isActive,
  onSelect,
  buttonRef,
}: TournamentThumbCardProps): JSX.Element => (
  <button
    ref={buttonRef}
    type="button"
    role="listitem"
    aria-pressed={isActive}
    aria-label={`Seleccionar ronda ${video.round}: ${video.title}`}
    className={isActive ? THUMB_FRAME_ACTIVE_CLASS : THUMB_FRAME_IDLE_CLASS}
    onClick={onSelect}
    onPointerDown={(event) => {
      event.stopPropagation();
    }}
  >
    <div className={THUMB_PREVIEW_INNER_CLASS}>
      <img
        src={getYoutubeThumbnailUrl(video.youtubeId)}
        alt=""
        className={THUMB_PREVIEW_IMAGE_CLASS}
        loading="lazy"
        decoding="async"
      />
      <span className={THUMB_PREVIEW_OVERLAY_CLASS} aria-hidden />
      {isActive ? (
        <span
          className="pointer-events-none absolute left-2 top-2 z-[2] rounded-sm bg-white/90 px-1.5 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-black"
          aria-hidden
        >
          Ahora
        </span>
      ) : null}
    </div>
    <span className={THUMB_TITLE_CLASS}>{video.title}</span>
  </button>
);

export const TournamentVideoGallery = ({
  revealStartIndex,
}: TournamentVideoGalleryProps): JSX.Element | null => {
  const isSectionVisible = useRevealSection();
  const isTouchPrimary = useMediaQuery(TOUCH_PRIMARY_MEDIA_QUERY);
  const captionsPreferred = useCaptionsPreferred();
  const activeThumbRef = useRef<HTMLButtonElement>(null);
  const thumbStripElementRef = useRef<HTMLElement | null>(null);
  const hasUserSelectedRef = useRef(false);
  const {
    ref: setDragScrollRef,
    dragScrollProps,
    isDragging: isStripDragging,
  } = useHorizontalDragScroll(true, { preferVerticalTouchPan: isTouchPrimary });

  const [selectedKey, setSelectedKey] = useState(() =>
    LATEST_VIDEO ? getTournamentVideoKey(LATEST_VIDEO) : "",
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const setThumbStripRef = useCallback(
    (node: HTMLElement | null) => {
      thumbStripElementRef.current = node;
      setDragScrollRef(node);
    },
    [setDragScrollRef],
  );

  const syncThumbStripScrollState = useCallback((): void => {
    const { canScrollPrev: prev, canScrollNext: next } =
      getTournamentThumbStripScrollState(thumbStripElementRef.current);
    setCanScrollPrev(prev);
    setCanScrollNext(next);
  }, []);

  useEffect(() => {
    if (!hasUserSelectedRef.current) {
      return;
    }

    scrollTournamentThumbIntoStrip(activeThumbRef.current);
  }, [selectedKey]);

  useEffect(() => {
    const strip = thumbStripElementRef.current;
    if (!strip || TOURNAMENT_VIDEOS.length <= 1) {
      return undefined;
    }

    syncThumbStripScrollState();

    strip.addEventListener("scroll", syncThumbStripScrollState, {
      passive: true,
    });

    const resizeObserver = new ResizeObserver(syncThumbStripScrollState);
    resizeObserver.observe(strip);

    return () => {
      strip.removeEventListener("scroll", syncThumbStripScrollState);
      resizeObserver.disconnect();
    };
  }, [syncThumbStripScrollState]);

  const handleSelect = (videoKey: string): void => {
    hasUserSelectedRef.current = true;
    setSelectedKey(videoKey);
    setIsPlaying(false);
  };

  const handlePlaySelected = (): void => {
    setIsPlaying(true);
  };

  const handleScrollStrip = (direction: -1 | 1): void => {
    scrollTournamentThumbStrip(thumbStripElementRef.current, direction);
  };

  if (TOURNAMENT_VIDEOS.length === 0) {
    return null;
  }

  const selectedVideo =
    TOURNAMENT_VIDEOS.find(
      (video) => getTournamentVideoKey(video) === selectedKey,
    ) ??
    LATEST_VIDEO ??
    TOURNAMENT_VIDEOS[0];
  const showThumbnails = TOURNAMENT_VIDEOS.length > 1;

  return (
    <>
      <div className="mt-10 lg:mt-12">
        <div className={PLAYER_FRAME_CLASS}>
          {isSectionVisible && isPlaying ? (
            <iframe
              key={getTournamentVideoKey(selectedVideo)}
              className="absolute inset-0 h-full w-full border-0"
              src={getYoutubeEmbedUrl(
                selectedVideo.youtubeId,
                selectedVideo.startSeconds,
                {
                  captions: captionsPreferred,
                },
              )}
              title={selectedVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <button
              type="button"
              className={PLAYER_POSTER_BUTTON_CLASS}
              aria-label={`Reproducir ${selectedVideo.title}`}
              onClick={handlePlaySelected}
            >
              <img
                src={getYoutubeThumbnailUrl(selectedVideo.youtubeId)}
                alt=""
                className={PLAYER_POSTER_IMAGE_CLASS}
                decoding="async"
              />
              <span className={PLAYER_PLAY_OVERLAY_CLASS} aria-hidden />
              <span className={PLAYER_PLAY_ICON_CLASS} aria-hidden>
                <svg
                  viewBox="0 0 24 24"
                  className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8"
                  aria-hidden
                >
                  <path d="M8 5.14v13.72L19 12 8 5.14z" />
                </svg>
              </span>
            </button>
          )}
        </div>
        <p className="m-0 mt-3 text-[0.8rem] font-normal leading-snug tracking-normal text-white/75">
          {selectedVideo.title}
        </p>
        {captionsPreferred ? (
          <p
            className="m-0 mt-2 text-[0.72rem] leading-relaxed text-white/60"
            role="note"
          >
            Subtítulos activados cuando el vídeo los incluye. Actívalos también
            desde el reproductor de YouTube si no aparecen.
          </p>
        ) : null}
      </div>

      {showThumbnails ? (
        <div className={THUMB_STRIP_WRAPPER_CLASS}>
          <RevealItem index={revealStartIndex + 1}>
            <div className={THUMB_STRIP_NAV_ROW_CLASS}>
              <TournamentGalleryNavButton
                direction="prev"
                disabled={!canScrollPrev}
                onClick={() => handleScrollStrip(-1)}
              />

              <div className={THUMB_STRIP_SCROLL_CLASS}>
                <div
                  id={THUMB_STRIP_ID}
                  ref={setThumbStripRef}
                  className={`${THUMB_STRIP_CLASS} ${isStripDragging ? THUMB_STRIP_DRAGGING_CLASS : THUMB_STRIP_IDLE_CLASS}`}
                  data-tournament-thumb-strip=""
                  role="list"
                  aria-label="Torneos por ronda, de la más reciente a la izquierda"
                  {...dragScrollProps}
                >
                  {TOURNAMENT_VIDEOS.map((video) => {
                    const videoKey = getTournamentVideoKey(video);
                    const isActive =
                      videoKey === getTournamentVideoKey(selectedVideo);

                    return (
                      <TournamentThumbCard
                        key={videoKey}
                        video={video}
                        isActive={isActive}
                        buttonRef={isActive ? activeThumbRef : undefined}
                        onSelect={() => handleSelect(videoKey)}
                      />
                    );
                  })}
                </div>
              </div>

              <TournamentGalleryNavButton
                direction="next"
                disabled={!canScrollNext}
                onClick={() => handleScrollStrip(1)}
              />
            </div>
          </RevealItem>
        </div>
      ) : null}
    </>
  );
};
