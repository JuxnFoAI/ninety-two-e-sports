/** YouTube tournament VOD entry; `round` drives gallery order (R1 right → R8 left). */
export interface TournamentVideo {
  youtubeId: string;
  /** Verbatim YouTube video title (do not paraphrase — attribution). */
  title: string;
  /** Season round number (1 = rightmost thumbnail, higher = further left). */
  round: number;
  /** Optional start offset in seconds (e.g. deep-link `&t=`). */
  startSeconds?: number;
}
