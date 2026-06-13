import type { NewsCompanionImage } from "../../types/news";
import { BrandPanel } from "./BrandPanel";

interface NewsCompanionGalleryProps {
  companions: readonly NewsCompanionImage[];
}

export const NewsCompanionGallery = ({
  companions,
}: NewsCompanionGalleryProps): JSX.Element | null => {
  if (companions.length === 0) {
    return null;
  }

  return (
    <div
      className="news-story-brands"
      role="group"
      aria-label="Marcas y representación en competición"
    >
      {companions.map((companion, companionIndex) => (
        <BrandPanel
          key={companion.src}
          companion={companion}
          staggerIndex={companionIndex}
        />
      ))}
    </div>
  );
};
