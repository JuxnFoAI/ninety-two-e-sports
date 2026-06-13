/** Builds a privacy-enhanced YouTube embed URL. */
export interface YoutubeEmbedOptions {
  captions?: boolean;
}

export const getYoutubeEmbedUrl = (
  videoId: string,
  startSeconds?: number,
  options?: YoutubeEmbedOptions,
): string => {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
  });

  if (startSeconds != null && startSeconds > 0) {
    params.set("start", String(Math.floor(startSeconds)));
  }

  if (options?.captions) {
    params.set("cc_load_policy", "1");
  }

  return `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;
};

/** Standard YouTube thumbnail (`hq` is reliable for all videos). */
export const getYoutubeThumbnailUrl = (videoId: string): string =>
  `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
