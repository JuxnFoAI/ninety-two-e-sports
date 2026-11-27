import { useRef, useState } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

import { TEAM_DESIGNS } from "../../data/designs";
import { useDesignsGalleryScrollStagger } from "../../lib/useDesignsGalleryScrollStagger";
import type { TeamDesign } from "../../types/design";
import { PhotoLightbox } from "../fotos/PhotoLightbox";

import styles from "./DesignsGallery.module.css";

interface DesignCardProps {
  design: TeamDesign;
  onOpen: (design: TeamDesign) => void;
}

const DesignCard = ({ design, onOpen }: DesignCardProps): JSX.Element => (
  <button
    type="button"
    className={styles.card}
    data-design-card
    aria-label={`Ampliar: ${design.alt}`}
    onClick={() => onOpen(design)}
  >
    <img
      src={design.src}
      alt=""
      className={styles.image}
      loading="lazy"
      decoding="async"
      fetchPriority="low"
      draggable={false}
    />
  </button>
);

export const DesignsGallery = (): JSX.Element => {
  const prefersReducedMotion = useEffectiveReducedMotion();
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeDesign, setActiveDesign] = useState<TeamDesign | null>(null);

  useDesignsGalleryScrollStagger(gridRef, !prefersReducedMotion);

  return (
    <>
      <div
        ref={gridRef}
        className={styles.grid}
        role="region"
        aria-label="Diseños del equipo"
      >
        {TEAM_DESIGNS.map((design) => (
          <DesignCard
            key={design.id}
            design={design}
            onOpen={setActiveDesign}
          />
        ))}
      </div>

      {activeDesign ? (
        <PhotoLightbox
          design={activeDesign}
          onClose={() => setActiveDesign(null)}
        />
      ) : null}
    </>
  );
};
