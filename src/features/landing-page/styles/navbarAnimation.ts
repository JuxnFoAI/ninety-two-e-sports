/** Entrance animation for the fixed navbar after page mount / title sequence. */
export const getNavbarEntranceClass = (delayMs: number): string =>
  `motion-safe:animate-[navbarSlideDown_0.75s_cubic-bezier(0.22,1,0.36,1)_both] motion-safe:[animation-delay:${delayMs}ms] motion-reduce:animate-none`;
