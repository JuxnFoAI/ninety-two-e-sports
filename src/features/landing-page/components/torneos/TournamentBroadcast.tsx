import { useEffect, useState } from "react";

import { formatTournamentRoundLabel } from "../../lib/tournamentGallery";
import {
  getYoutubeEmbedUrl,
  getYoutubeHeroThumbnailUrl,
  getYoutubeThumbnailUrl,
} from "../../lib/youtube";
import type { TournamentVideo } from "../../types/tournamentVideo";
import { StretchInkButton } from "../StretchInkButton";
import styles from "./TournamentBroadcast.module.css";

interface TournamentBroadcastProps {
  video: TournamentVideo;
  isPlaying: boolean;
  isSectionVisible: boolean;
  captionsPreferred: boolean;
  onPlay: () => void;
}

export const TournamentBroadcast = ({
  video,
  isPlaying,
  isSectionVisible,
  captionsPreferred,
  onPlay,
}: TournamentBroadcastProps): JSX.Element => {
  const [posterSrc, setPosterSrc] = useState(() =>
    getYoutubeHeroThumbnailUrl(video.youtubeId),
  );
  const roundLabel = formatTournamentRoundLabel(video.round);
  const playLabel = `Reproducir ${roundLabel} · ${video.circuit}: ${video.headline}`;

  useEffect(() => {
    setPosterSrc(getYoutubeHeroThumbnailUrl(video.youtubeId));
  }, [video.youtubeId]);

  return (
    <div className={styles.bleed}>
      <div className={styles.stage}>
        {isSectionVisible && isPlaying ? (
          <iframe
            key={`${video.youtubeId}-${video.startSeconds ?? 0}`}
            className={styles.player}
            src={getYoutubeEmbedUrl(video.youtubeId, video.startSeconds, {
              captions: captionsPreferred,
              autoplay: true,
            })}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <>
            <img
              src={posterSrc}
              alt=""
              className={styles.poster}
              decoding="async"
              onError={() => {
                const fallback = getYoutubeThumbnailUrl(video.youtubeId);
                setPosterSrc((current) =>
                  current === fallback ? current : fallback,
                );
              }}
            />
            <div className={styles.hit} onClick={onPlay} aria-hidden />
            <div className={styles.veil} aria-hidden />
            <div className={styles.hud}>
              <p className={styles.meta}>
                <span className={styles.round}>{roundLabel}</span>
                <span className={styles.circuit}>{video.circuit}</span>
              </p>
              <div className={styles.play}>
                <StretchInkButton aria-label={playLabel} onClick={onPlay}>
                  Reproducir
                </StretchInkButton>
              </div>
              <h3 className={styles.headline}>{video.headline}</h3>
            </div>
          </>
        )}
      </div>

      {captionsPreferred ? (
        <p className={styles.captionsNote} role="note">
          Subtítulos activados cuando el vídeo los incluye. Actívalos también
          desde el reproductor de YouTube si no aparecen.
        </p>
      ) : null}
    </div>
  );
};
