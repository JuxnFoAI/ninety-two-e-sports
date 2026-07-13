import type { Sponsor } from "../../types/sponsor";
import { RevealItem } from "../reveal";
import { SponsorCard } from "./SponsorCard";

interface SponsorGridProps {
  revealStartIndex: number;
  sponsors: readonly Sponsor[];
}

export const SponsorGrid = ({
  revealStartIndex,
  sponsors,
}: SponsorGridProps): JSX.Element => {
  return (
    <ul
      className="m-0 mt-10 grid list-none grid-cols-1 gap-4 p-0 min-[520px]:grid-cols-2 min-[520px]:gap-5 lg:mt-12 lg:grid-cols-4 lg:gap-6"
      role="list"
      aria-label="Marcas patrocinadoras"
    >
      {sponsors.map((sponsor, sponsorIndex) => (
        <RevealItem
          as="li"
          key={sponsor.id}
          index={revealStartIndex + sponsorIndex}
        >
          <SponsorCard sponsor={sponsor} />
        </RevealItem>
      ))}
    </ul>
  );
};
