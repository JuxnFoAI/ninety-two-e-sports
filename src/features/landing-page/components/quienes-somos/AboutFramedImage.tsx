import type { AboutImage } from "../../data/about";
import { MEDIA_FRAME_OVERLAY_CLASS } from "../../styles/mediaFrameStyles";
import {
  ABOUT_IMAGE_FRAME_CLASS,
  ABOUT_IMAGE_INNER_CLASS,
  getAboutImageClass,
} from "./aboutGalleryStyles";
import { AboutScrollReveal } from "./AboutScrollReveal";

type AboutFramedImageProps = {
  image: AboutImage;
  className?: string;
};

/** Framed photo that scrubs in with scroll. */
export const AboutFramedImage = ({
  image,
  className = "",
}: AboutFramedImageProps): JSX.Element => (
  <AboutScrollReveal
    className={`${ABOUT_IMAGE_FRAME_CLASS} ${className}`.trim()}
    yFrom={28}
    scaleFrom={0.97}
  >
    <div className={ABOUT_IMAGE_INNER_CLASS}>
      <div className={MEDIA_FRAME_OVERLAY_CLASS} aria-hidden />
      <img
        src={image.src}
        alt={image.alt}
        className={getAboutImageClass(image.showFullImage)}
        loading="lazy"
        decoding="async"
      />
    </div>
  </AboutScrollReveal>
);
