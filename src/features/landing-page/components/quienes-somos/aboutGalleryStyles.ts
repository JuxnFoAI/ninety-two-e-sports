import { MEDIA_FRAME_IMAGE_HOVER_CLASS } from "../../styles/mediaFrameStyles";

/** Frame flush to the photo (no inner padding). */
export const ABOUT_IMAGE_FRAME_CLASS =
  "overflow-hidden rounded-md border border-white/[0.14] bg-gradient-to-b from-white/[0.05] to-black/35 shadow-[0_6px_22px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)] sm:rounded-lg lg:transition-[border-color,box-shadow] lg:duration-300 lg:hover:border-white/[0.22] lg:hover:shadow-[0_8px_28px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.08)]";

export const ABOUT_IMAGE_INNER_CLASS =
  "group relative overflow-hidden rounded-[inherit] bg-black/25";

const ABOUT_IMAGE_BASE_CLASS = `relative z-0 h-auto w-full object-contain object-center ${MEDIA_FRAME_IMAGE_HOVER_CLASS}`;

const ABOUT_IMAGE_CROPPED_CLASS = `${ABOUT_IMAGE_BASE_CLASS} lg:aspect-[4/3] lg:h-full lg:object-cover`;

/** Tailwind classes for each about image variant. */
export const getAboutImageClass = (showFullImage?: boolean): string =>
  showFullImage ? ABOUT_IMAGE_BASE_CLASS : ABOUT_IMAGE_CROPPED_CLASS;
