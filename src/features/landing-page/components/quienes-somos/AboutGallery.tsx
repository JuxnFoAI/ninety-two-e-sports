import { ABOUT_IMAGES } from "../../data/about";
import type { AboutImage } from "../../data/about";
import {
  MEDIA_FRAME_INNER_CLASS,
  MEDIA_FRAME_OVERLAY_CLASS,
} from "../../styles/mediaFrameStyles";
import { RevealItem } from "../reveal";
import {
  ABOUT_GALLERY_CLASS,
  ABOUT_IMAGE_FRAME_CLASS,
  getAboutImageClass,
} from "./aboutGalleryStyles";

interface AboutGalleryProps {
  revealStartIndex: number;
}

interface AboutImageCardProps {
  image: AboutImage;
  revealIndex: number;
}

const AboutImageCard = ({
  image,
  revealIndex,
}: AboutImageCardProps): JSX.Element => (
  <RevealItem as="div" index={revealIndex} className={ABOUT_IMAGE_FRAME_CLASS}>
    <div className={MEDIA_FRAME_INNER_CLASS}>
      <div className={MEDIA_FRAME_OVERLAY_CLASS} aria-hidden />
      <img
        src={image.src}
        alt={image.alt}
        className={getAboutImageClass(image.showFullImage)}
        loading="lazy"
        decoding="async"
      />
    </div>
  </RevealItem>
);

export const AboutGallery = ({
  revealStartIndex,
}: AboutGalleryProps): JSX.Element => (
  <div
    className={ABOUT_GALLERY_CLASS}
    role="group"
    aria-label="Imágenes del equipo"
  >
    {ABOUT_IMAGES.map((image, index) => (
      <AboutImageCard
        key={image.id}
        image={image}
        revealIndex={revealStartIndex + index}
      />
    ))}
  </div>
);
