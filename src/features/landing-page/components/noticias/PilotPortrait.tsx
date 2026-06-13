import { createPilotFrameStyle } from "./pilotPortraitStyle";

interface PilotPortraitProps {
  image?: string;
  imageAlt?: string;
  focus?: string;
  scale?: number;
}

export const PilotPortrait = ({
  image,
  imageAlt,
  focus = "center center",
  scale,
}: PilotPortraitProps): JSX.Element => (
  <figure
    className="news-story-pilot"
    style={createPilotFrameStyle(focus, scale)}
    aria-label={imageAlt ? `Retrato de ${imageAlt}` : undefined}
  >
    <div className="news-story-pilot__spotlight" aria-hidden />
    <div className="news-story-pilot__frame">
      {image ? (
        <img
          src={image}
          alt={imageAlt ?? ""}
          className="news-story-pilot__image"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div className="news-story-pilot__placeholder" aria-hidden />
      )}
    </div>
  </figure>
);
