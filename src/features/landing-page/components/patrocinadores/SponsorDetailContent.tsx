import type { SponsorDetail } from "../../types/sponsor";

import { SponsorDetailLinks } from "./SponsorDetailLinks";

const BODY_CLASS =
  "m-0 text-[0.78rem] font-normal leading-relaxed tracking-wide text-white/72 sm:text-[0.82rem]";

interface SponsorDetailContentProps {
  detail: SponsorDetail;
}

export const SponsorDetailContent = ({
  detail,
}: SponsorDetailContentProps): JSX.Element => {
  const { paragraphs, links } = detail;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3">
      {paragraphs.map((paragraph, index) => (
        <p key={index} className={BODY_CLASS}>
          {paragraph}
        </p>
      ))}

      <SponsorDetailLinks links={links} />
    </div>
  );
};
