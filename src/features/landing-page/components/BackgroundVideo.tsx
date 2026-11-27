import { useEffect, useRef } from "react";

import mobileBackground from "@assets/videos/fondo-n2-movil.jpg";
import backgroundVideo from "@assets/videos/video-fondo.mp4";

import {
  A11Y_COLOR_FILTER_LAYER_CLASS,
  useBackgroundMediaEnabled,
  useEffectiveReducedMotion,
} from "@/features/accessibility";
import { MOBILE_MEDIA_QUERY } from "@/shared/constants/breakpoints";
import { useMediaQuery } from "@/shared/hooks";

const BACKGROUND_MEDIA_CLASS = "h-full w-full scale-[1.02] object-cover";

const BackgroundOverlays = (): JSX.Element => (
  <>
    <div
      className="absolute inset-0 bg-black/50 motion-reduce:bg-black/80"
      aria-hidden="true"
    />

    <div
      className="absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_40%,transparent_35%,rgb(0_0_0/0.55)_100%)] max-lg:bg-[radial-gradient(ellipse_95%_85%_at_50%_38%,transparent_42%,rgb(0_0_0/0.38)_100%)]"
      aria-hidden="true"
      data-decorative="true"
    />
  </>
);

export const BackgroundVideo = (): JSX.Element => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReducedMotion = useEffectiveReducedMotion();
  const backgroundMediaEnabled = useBackgroundMediaEnabled();
  const isDesktop = !useMediaQuery(MOBILE_MEDIA_QUERY);
  const showVideo =
    isDesktop && !prefersReducedMotion && backgroundMediaEnabled;

  useEffect(() => {
    if (!showVideo) {
      return undefined;
    }

    const video = videoRef.current;
    if (!video) {
      return undefined;
    }

    void video.play().catch(() => undefined);

    return () => {
      video.pause();
    };
  }, [showVideo]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-0 overflow-hidden bg-transparent max-lg:h-[calc(100dvh+env(safe-area-inset-bottom,0px))] max-lg:min-h-[100dvh] lg:inset-0 lg:h-auto"
      aria-hidden="true"
    >
      <div
        className={`relative h-full w-full bg-black ${A11Y_COLOR_FILTER_LAYER_CLASS}`}
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
            <source src={backgroundVideo} type="video/mp4" />
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
    </div>
  );
};
