import type { ReactNode } from "react";

import { useIntersectionReveal } from "@/shared/hooks";

import { RevealSectionContext } from "./revealSectionContext";

const SECTION_LAYOUT_CLASS =
  "scroll-mt-[var(--header-height)] px-[clamp(1rem,4vw,4rem)] py-[clamp(3rem,8vw,6rem)]";

const SECTION_PANEL_CLASS = "bg-black/80 backdrop-blur-md";

interface RevealSectionProps {
  "aria-labelledby": string;
  children: ReactNode;
  className?: string;
  id: string;
  /** `panel` keeps its own surface; `flush` shares a parent surface (home stack). */
  surface?: "panel" | "flush";
}

/** Landing section shell that coordinates scroll-triggered child reveals. */
export const RevealSection = ({
  "aria-labelledby": ariaLabelledBy,
  children,
  className = "",
  id,
  surface = "panel",
}: RevealSectionProps): JSX.Element => {
  const { isVisible, ref } = useIntersectionReveal<HTMLElement>();

  return (
    <RevealSectionContext.Provider value={isVisible}>
      <section
        ref={ref}
        id={id}
        aria-labelledby={ariaLabelledBy}
        className={`${SECTION_LAYOUT_CLASS} ${
          surface === "panel" ? SECTION_PANEL_CLASS : ""
        } ${className}`.trim()}
      >
        {children}
      </section>
    </RevealSectionContext.Provider>
  );
};
