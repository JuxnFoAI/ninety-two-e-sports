/** YouTube tournament VOD entry; `round` drives season-calendar order (R1 left → latest right). */
export interface TournamentVideo {
  youtubeId: string;
  /** Verbatim YouTube video title (do not paraphrase — attribution). */
  title: string;
  /** Team-written on-air title; shown instead of the YouTube title. */
  headline: string;
  /** Circuit name for the broadcast overlay and calendar (e.g. Spa-Francorchamps). */
  circuit: string;
  /** Season round number (1 = leftmost calendar stop). */
  round: number;
  /** Optional start offset in seconds (e.g. deep-link `&t=`). */
  startSeconds?: number;
}
