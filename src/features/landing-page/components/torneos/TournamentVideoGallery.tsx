import { useEffect, useRef, useState, type Ref } from "react";

import { useCaptionsPreferred } from "@/features/accessibility";
import { useHorizontalDragScroll, useMediaQuery } from "@/shared/hooks";

import { TOURNAMENT_VIDEOS } from "../../data/tournaments";
import {
  findTournamentVideoIndex,
  getLatestTournamentVideo,
  getTournamentVideoByOffset,
  getTournamentVideoKey,
  scrollTournamentThumbIntoStrip,
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
  "relative w-full overflow-hidden border border-white/12 bg-black pt-[56.25%] shadow-[0_0_40px_rgba(0,0,0,0.45)]";

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
    aria-label={`Reproducir ronda ${video.round}: ${video.title}`}
    className={isActive ? THUMB_FRAME_ACTIVE_CLASS : THUMB_FRAME_IDLE_CLASS}
    onClick={onSelect}
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
  const hasUserSelectedRef = useRef(false);
  const {
    ref: thumbStripRef,
    dragScrollProps,
    isDragging: isStripDragging,
  } = useHorizontalDragScroll(true, { preferVerticalTouchPan: isTouchPrimary });

  const [activeKey, setActiveKey] = useState(() =>
    LATEST_VIDEO ? getTournamentVideoKey(LATEST_VIDEO) : "",
  );

  useEffect(() => {
    if (!hasUserSelectedRef.current) {
      return;
    }

    scrollTournamentThumbIntoStrip(activeThumbRef.current);
  }, [activeKey]);

  const handleSelect = (videoKey: string): void => {
    hasUserSelectedRef.current = true;
    setActiveKey(videoKey);
  };

  const handleNavigate = (offset: -1 | 1): void => {
    const nextVideo = getTournamentVideoByOffset(
      TOURNAMENT_VIDEOS,
      activeKey,
      offset,
    );
    if (!nextVideo) {
      return;
    }

    handleSelect(getTournamentVideoKey(nextVideo));
  };

  if (TOURNAMENT_VIDEOS.length === 0) {
    return null;
  }

  const activeVideo =
    TOURNAMENT_VIDEOS.find(
      (video) => getTournamentVideoKey(video) === activeKey,
    ) ??
    LATEST_VIDEO ??
    TOURNAMENT_VIDEOS[0];
  const activeIndex = findTournamentVideoIndex(
    TOURNAMENT_VIDEOS,
    getTournamentVideoKey(activeVideo),
  );
  const showThumbnails = TOURNAMENT_VIDEOS.length > 1;
  const canGoToNewer = activeIndex > 0;
  const canGoToOlder =
    activeIndex >= 0 && activeIndex < TOURNAMENT_VIDEOS.length - 1;

  return (
    <>
      <div className="mt-10 lg:mt-12">
        <div className={PLAYER_FRAME_CLASS}>
          {isSectionVisible ? (
            <iframe
              key={getTournamentVideoKey(activeVideo)}
              className="absolute inset-0 h-full w-full border-0"
              src={getYoutubeEmbedUrl(
                activeVideo.youtubeId,
                activeVideo.startSeconds,
                {
                  captions: captionsPreferred,
                },
              )}
              title={activeVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : null}
        </div>
        <p className="m-0 mt-3 text-[0.8rem] font-normal leading-snug tracking-normal text-white/75">
          {activeVideo.title}
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
                disabled={!canGoToNewer}
                onClick={() => handleNavigate(-1)}
              />

              <div className={THUMB_STRIP_SCROLL_CLASS}>
                <div
                  id={THUMB_STRIP_ID}
                  ref={thumbStripRef}
                  className={`${THUMB_STRIP_CLASS} ${isStripDragging ? THUMB_STRIP_DRAGGING_CLASS : THUMB_STRIP_IDLE_CLASS}`}
                  data-tournament-thumb-strip=""
                  role="list"
                  aria-label="Torneos por ronda, de la más reciente a la izquierda"
                  {...dragScrollProps}
                >
                  {TOURNAMENT_VIDEOS.map((video) => {
                    const videoKey = getTournamentVideoKey(video);
                    const isActive =
                      videoKey === getTournamentVideoKey(activeVideo);

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
                disabled={!canGoToOlder}
                onClick={() => handleNavigate(1)}
              />
            </div>
          </RevealItem>
        </div>
      ) : null}
    </>
  );
};
