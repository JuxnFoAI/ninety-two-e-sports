/** YouTube tournament VOD entry; `round` drives season-calendar order (R1 left → latest right). */
export interface TournamentVideo {
  youtubeId: string;
  /** Verbatim YouTube video title (do not paraphrase — attribution). */
  title: string;
  /** Team-written on-air title; shown instead of the YouTube title. */
  headline: string;
  /** Circuit name for the broadcast overlay and calendar (e.g. Spa-Francorchamps). */
  circuit: string;
  /** Season sort key; highest round is the on-air default. */
  round: number;
  /** On-air round label when it differs from `R${round}` (e.g. two cups share R1). */
  roundLabel?: string;
  /** Optional start offset in seconds (e.g. deep-link `&t=`). */
  startSeconds?: number;
}

/** One championship; first entry in `TOURNAMENT_CHAMPIONSHIPS` is on-air. */
export interface TournamentChampionship {
  id: string;
  /** Label above the season calendar (e.g. Summer Madness · 2026). */
  label: string;
  videos: readonly TournamentVideo[];
}
