import type { ReactNode } from "react";

import { SECTION_FOOTER_CLASS } from "../styles/sectionClasses";
import { RevealItem } from "./reveal";

interface SectionFooterRevealProps {
  index: number;
  children: ReactNode;
}

export const SectionFooterReveal = ({
  index,
  children,
}: SectionFooterRevealProps): JSX.Element => (
  <RevealItem as="p" index={index} className={SECTION_FOOTER_CLASS}>
    {children}
  </RevealItem>
);
