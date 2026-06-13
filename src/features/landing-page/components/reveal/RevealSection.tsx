import type { ReactNode } from "react";

import { useIntersectionReveal } from "@/shared/hooks";

import { RevealSectionContext } from "./revealSectionContext";

const SECTION_SHELL_CLASS =
  "scroll-mt-[var(--header-height)] bg-black/80 px-[clamp(1rem,4vw,4rem)] py-[clamp(3rem,8vw,6rem)] backdrop-blur-md";

interface RevealSectionProps {
  "aria-labelledby": string;
  children: ReactNode;
  className?: string;
  id: string;
}

/** Landing section shell that coordinates scroll-triggered child reveals. */
export const RevealSection = ({
  "aria-labelledby": ariaLabelledBy,
  children,
  className = "",
  id,
}: RevealSectionProps): JSX.Element => {
  const { isVisible, ref } = useIntersectionReveal<HTMLElement>();

  return (
    <RevealSectionContext.Provider value={isVisible}>
      <section
        ref={ref}
        id={id}
        aria-labelledby={ariaLabelledBy}
        className={`${SECTION_SHELL_CLASS} ${className}`.trim()}
      >
        {children}
      </section>
    </RevealSectionContext.Provider>
  );
};
