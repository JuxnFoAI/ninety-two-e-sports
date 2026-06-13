/** Shared subtle border box for images and media thumbnails. */
export const MEDIA_FRAME_CLASS =
  "rounded-md border border-white/[0.14] bg-gradient-to-b from-white/[0.05] to-black/35 p-2 shadow-[0_6px_22px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.06)] sm:rounded-lg sm:p-2.5 lg:transition-[border-color,box-shadow] lg:duration-300 lg:hover:border-white/[0.22] lg:hover:shadow-[0_8px_28px_rgba(0,0,0,0.34),inset_0_1px_0_rgba(255,255,255,0.08)]";

/** Inner crop area that keeps media inside the frame. */
export const MEDIA_FRAME_INNER_CLASS =
  "group relative overflow-hidden rounded-sm bg-black/25 sm:rounded-[0.4rem]";

export const MEDIA_FRAME_OVERLAY_CLASS =
  "pointer-events-none absolute inset-0 z-[1] bg-gradient-to-tr from-black/20 via-transparent to-white/[0.03] opacity-90 transition-opacity duration-300 motion-safe:group-hover:opacity-100";

export const MEDIA_FRAME_IMAGE_HOVER_CLASS =
  "transition-transform duration-500 motion-safe:group-hover:scale-[1.02] motion-reduce:group-hover:scale-100";
