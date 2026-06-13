import {
  MEDIA_FRAME_CLASS,
  MEDIA_FRAME_IMAGE_HOVER_CLASS,
  MEDIA_FRAME_INNER_CLASS,
} from "../../styles/mediaFrameStyles";

export const THUMB_STRIP_WRAPPER_CLASS = "mt-6 overflow-visible";

export const THUMB_STRIP_NAV_ROW_CLASS = "flex items-center gap-2 sm:gap-3";

export const THUMB_STRIP_SCROLL_CLASS = "min-w-0 flex-1";

/** R8 → R1 in DOM: newest left, oldest right; natural scroll direction. */
export const THUMB_STRIP_CLASS =
  "flex flex-row justify-start gap-2.5 overflow-x-auto scroll-smooth px-1 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [touch-action:pan-x] sm:gap-3 sm:px-0 [&::-webkit-scrollbar]:hidden snap-x snap-mandatory";

export const THUMB_STRIP_DRAGGING_CLASS = "cursor-grabbing select-none";

export const THUMB_STRIP_IDLE_CLASS = "cursor-grab";

const THUMB_FRAME_BASE_CLASS = `${MEDIA_FRAME_CLASS} shrink-0 w-[min(76vw,11rem)] snap-start text-left transition-[border-color,opacity,box-shadow] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 sm:w-[min(42vw,11rem)] lg:p-3`;

export const THUMB_FRAME_ACTIVE_CLASS = `${THUMB_FRAME_BASE_CLASS} border-white/[0.28] opacity-100`;

export const THUMB_FRAME_IDLE_CLASS = `${THUMB_FRAME_BASE_CLASS} opacity-80 hover:opacity-100`;

export const THUMB_PREVIEW_INNER_CLASS = MEDIA_FRAME_INNER_CLASS;

export const THUMB_PREVIEW_IMAGE_CLASS = `relative z-0 aspect-video h-full w-full object-cover ${MEDIA_FRAME_IMAGE_HOVER_CLASS}`;

export const THUMB_PREVIEW_OVERLAY_CLASS =
  "pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-black/70 via-black/15 to-transparent";

export const THUMB_TITLE_CLASS =
  "line-clamp-2 block px-0.5 pb-0.5 pt-2 text-[0.65rem] font-normal leading-snug tracking-normal text-white/85";
