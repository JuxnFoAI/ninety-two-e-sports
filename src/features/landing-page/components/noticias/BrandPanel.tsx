import type { NewsCompanionImage } from "../../types/news";
import { createBrandPanelStyle } from "./brandPanelStyle";
import { BRAND_PANEL_STAGGER_REM } from "./constants";

interface BrandPanelProps {
  companion: NewsCompanionImage;
  staggerIndex?: number;
}

export const BrandPanel = ({
  companion,
  staggerIndex = 0,
}: BrandPanelProps): JSX.Element => (
  <figure
    className="news-brand-panel"
    style={{
      ...createBrandPanelStyle(companion.objectPosition),
      marginTop:
        staggerIndex > 0
          ? `${staggerIndex * BRAND_PANEL_STAGGER_REM}rem`
          : undefined,
    }}
  >
    <div className="news-brand-panel__frame">
      <img
        src={companion.src}
        alt={companion.alt ?? ""}
        className="news-brand-panel__image"
        loading="lazy"
        decoding="async"
      />
    </div>
    <div className="news-brand-panel__shade" aria-hidden />
  </figure>
);
