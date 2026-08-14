import type { ReactNode } from "react";

import { RevealItem } from "./reveal";

interface SectionFooterRevealProps {
  index: number;
  children: ReactNode;
}

export const SectionFooterReveal = ({
  index,
  children,
}: SectionFooterRevealProps): JSX.Element => (
  <RevealItem
    as="p"
    index={index}
    className="m-0 mt-10 max-w-lg text-[clamp(0.85rem,2.2vw,0.95rem)] font-normal leading-relaxed tracking-wide text-white/50 lg:mt-12"
  >
    {children}
  </RevealItem>
);
