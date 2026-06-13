import { useEffect, useRef } from "react";

import mobileBackground from "@assets/videos/fondo-n2-movil.jpg";
import transitionVideo from "@assets/videos/Transicion-pagina.mp4";

import {
  A11Y_COLOR_FILTER_LAYER_CLASS,
  useBackgroundMediaEnabled,
  useEffectiveReducedMotion,
} from "@/features/accessibility";
import { useMediaQuery } from "@/shared/hooks";

const DESKTOP_MEDIA_QUERY = "(min-width: 48rem)";
const BACKGROUND_MEDIA_CLASS = "h-full w-full scale-[1.02] object-cover";

const BackgroundOverlays = (): JSX.Element => (
  <>
    <div
      className="absolute inset-0 bg-black/50 motion-reduce:bg-black/80"
      aria-hidden="true"
    />

    <div
      className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_40%,transparent_35%,rgb(0_0_0/0.55)_100%)]"
      aria-hidden="true"
      data-decorative="true"
    />
  </>
);

export const BackgroundVideo = (): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useEffectiveReducedMotion();
  const backgroundMediaEnabled = useBackgroundMediaEnabled();
  const isDesktop = useMediaQuery(DESKTOP_MEDIA_QUERY);
  const showVideo =
    isDesktop && !prefersReducedMotion && backgroundMediaEnabled;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !showVideo) {
      video?.pause();
      return;
    }

    void video.play().catch(() => undefined);
  }, [showVideo]);

  return (
    <div
      className={`pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black ${A11Y_COLOR_FILTER_LAYER_CLASS}`}
      aria-hidden="true"
    >
      {showVideo ? (
        <video
          ref={videoRef}
          className={BACKGROUND_MEDIA_CLASS}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
        >
          <source src={transitionVideo} type="video/mp4" />
        </video>
      ) : (
        <img
          src={mobileBackground}
          alt=""
          className={BACKGROUND_MEDIA_CLASS}
          decoding="async"
          fetchPriority="high"
        />
      )}

      <BackgroundOverlays />
    </div>
  );
};
