import gsap from "gsap";

interface CreateLoaderTimelineOptions {
  logo: HTMLElement;
  bar: HTMLElement;
  onProgress: (progress: number) => void;
  onComplete: () => void;
}

const query = (root: ParentNode, selector: string): HTMLElement | null =>
  root.querySelector<HTMLElement>(selector);

const addLogo = (timeline: gsap.core.Timeline, logo: HTMLElement): void => {
  timeline.fromTo(
    logo,
    { autoAlpha: 0, y: 12, scale: 0.94 },
    { autoAlpha: 1, y: 0, scale: 1, duration: 0.36, ease: "power3.out" },
    0.04,
  );
};

const addEje = (timeline: gsap.core.Timeline, bar: HTMLElement): void => {
  const fill = query(bar, "[data-fill]");
  const core = query(bar, "[data-core]");
  if (!fill || !core) {
    return;
  }

  timeline.fromTo(
    fill,
    { scaleX: 0 },
    { scaleX: 1, duration: 0.55, ease: "expo.out" },
    0.16,
  );
  timeline.fromTo(
    core,
    { scale: 0, autoAlpha: 0 },
    { scale: 1, autoAlpha: 1, duration: 0.24, ease: "back.out(1.8)" },
    0.18,
  );
  timeline.to(
    core,
    { scale: 0.35, autoAlpha: 0, duration: 0.28, ease: "power2.in" },
    0.58,
  );
};

/**
 * Builds a 1-second timeline. Callers set `timeScale` so the same
 * choreography plays in the configured real duration.
 */
export const createLoaderTimeline = ({
  logo,
  bar,
  onProgress,
  onComplete,
}: CreateLoaderTimelineOptions): gsap.core.Timeline => {
  const timeline = gsap.timeline({ paused: true, onComplete });

  addLogo(timeline, logo);
  addEje(timeline, bar);
  timeline.set({}, {}, 1);
  timeline.eventCallback("onUpdate", () => {
    onProgress(timeline.progress());
  });

  return timeline;
};

/** Snaps the logo and the bar to their finished frame. */
export const applyLoaderEndState = (
  logo: HTMLElement,
  bar: HTMLElement,
): void => {
  gsap.set(logo, { autoAlpha: 1, y: 0, scale: 1 });

  const fill = query(bar, "[data-fill]");
  if (fill) {
    gsap.set(fill, { scaleX: 1 });
  }

  const core = query(bar, "[data-core]");
  if (core) {
    gsap.set(core, { scale: 0.35, autoAlpha: 0 });
  }
};
