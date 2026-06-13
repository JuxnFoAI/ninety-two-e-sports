import { orderTournamentVideosForGalleryStrip } from "../lib/tournamentGallery";
import type { TournamentVideo } from "../types/tournamentVideo";

/**
 * Tournament gallery entries. `title` must match the YouTube video title verbatim (attribution).
 * `round` sets strip order: R8 on the left (newest), R1 on the right (oldest).
 * After adding a `youtubeId`, run `npm run tournaments:sync-titles` to refresh titles.
 */
const TOURNAMENT_VIDEOS_RAW: readonly TournamentVideo[] = [
  {
    round: 1,
    youtubeId: "FMzayYMdIMc",
    title:
      "🔴 [ES] GT7 EN VIVO: R1.1 DEEP FOREST | ASÍ EMPIEZA LA TEMPORADA 2026",
  },
  {
    round: 2,
    youtubeId: "UDj5S5lH0OM",
    title: "🔴 [ES] IGS2026 | R2.2 MOUNT PANORAMA | COMPETICIÓN EQUIPOS GT7",
  },
  {
    round: 3,
    youtubeId: "myr3h1gryZs",
    title:
      "🔴 [ES] GT7 EN VIVO | R3.2 LAGO MAGGIORE | INFINITY GSERIES · GT7 ESPORTS",
  },
  {
    round: 4,
    youtubeId: "CxBEjIYXb_c",
    title:
      "🔴 [ES] LAS INFINITY GSERIES EN DIRECTO | R4.2 RED BULL RING | #SORTEO",
  },
  {
    round: 5,
    youtubeId: "7nE4XiceoZg",
    title: "🔴 [ES] INFINITY GSERIES | R5.2 DRAGON TRAIL",
  },
  {
    round: 6,
    youtubeId: "FheUdLXkxDk",
    title: "🔴 [ES] INFINITY GSERIES | R6.1 BARCELONA",
    startSeconds: 9816,
  },
  {
    round: 7,
    youtubeId: "IzmX0q0fYQg",
    title: "🔴 [ES] FINAL LIGA REGULAR - INFINITY GSERIES | R7.1 YAS MARINA",
    startSeconds: 9263,
  },
  {
    round: 8,
    youtubeId: "V7ZQb-SqjeU",
    title:
      "🔴 [ES] FASE FINAL (1/3) · R8 INFINITY GSERIES _ CIRCUIT DE LA SARTHE",
    startSeconds: 11513,
  },
  {
    round: 9,
    youtubeId: "ZNR4zN1dvLc",
    title:
      "🔴 [ES] R9 INFINITY GSERIES - FINALES POR EL TÍTULO (2/3) _ SPA FRANCORCHAMPS",
    startSeconds: 10888,
  },
];

export const TOURNAMENT_VIDEOS = orderTournamentVideosForGalleryStrip(
  TOURNAMENT_VIDEOS_RAW,
);
