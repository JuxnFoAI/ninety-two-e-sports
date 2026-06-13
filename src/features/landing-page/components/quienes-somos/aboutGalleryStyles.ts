import {
  MEDIA_FRAME_CLASS,
  MEDIA_FRAME_IMAGE_HOVER_CLASS,
  MEDIA_FRAME_INNER_CLASS,
  MEDIA_FRAME_OVERLAY_CLASS,
} from "../../styles/mediaFrameStyles";

/** Layout of the Quiénes somos image column. */
export const ABOUT_GALLERY_CLASS =
  "mx-auto flex w-full max-w-[16.5rem] flex-col gap-4 sm:max-w-[18rem] sm:gap-5 lg:mx-0 lg:max-w-none lg:gap-6";

export const ABOUT_IMAGE_FRAME_CLASS = `${MEDIA_FRAME_CLASS} lg:p-3`;

export const ABOUT_IMAGE_INNER_CLASS = MEDIA_FRAME_INNER_CLASS;

export const ABOUT_IMAGE_OVERLAY_CLASS = MEDIA_FRAME_OVERLAY_CLASS;

const ABOUT_IMAGE_BASE_CLASS = `relative z-0 h-auto w-full object-contain object-center ${MEDIA_FRAME_IMAGE_HOVER_CLASS}`;

const ABOUT_IMAGE_CROPPED_CLASS = `${ABOUT_IMAGE_BASE_CLASS} lg:aspect-[4/3] lg:h-full lg:object-cover`;

const ABOUT_IMAGE_FULL_CLASS = ABOUT_IMAGE_BASE_CLASS;

/** Tailwind classes for each about image variant. */
export const getAboutImageClass = (showFullImage?: boolean): string =>
  showFullImage ? ABOUT_IMAGE_FULL_CLASS : ABOUT_IMAGE_CROPPED_CLASS;
