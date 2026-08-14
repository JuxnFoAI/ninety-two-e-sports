import { orderTournamentVideosForSeasonCalendar } from "../lib/tournamentGallery";
import type { TournamentVideo } from "../types/tournamentVideo";

/** Championship shown above the season calendar. */
export const TOURNAMENT_SEASON_LABEL = "Infinity G Series · 2026";

/**
 * Tournament gallery entries. `title` must match the YouTube video title verbatim (attribution).
 * `headline` is the on-air title written by the team. `circuit` is the overlay / calendar name.
 * `round` sets calendar order: R1 on the left, latest on the right.
 * After adding a `youtubeId`, run `npm run tournaments:sync-titles` to refresh titles.
 */
const TOURNAMENT_VIDEOS_RAW: readonly TournamentVideo[] = [
  {
    round: 1,
    youtubeId: "FMzayYMdIMc",
    circuit: "Deep Forest",
    headline: "Así empieza la temporada",
    title:
      "🔴 [ES] GT7 EN VIVO: R1.1 DEEP FOREST | ASÍ EMPIEZA LA TEMPORADA 2026",
  },
  {
    round: 2,
    youtubeId: "UDj5S5lH0OM",
    circuit: "Mount Panorama",
    headline: "Los equipos se miden en Bathurst",
    title: "🔴 [ES] IGS2026 | R2.2 MOUNT PANORAMA | COMPETICIÓN EQUIPOS GT7",
  },
  {
    round: 3,
    youtubeId: "myr3h1gryZs",
    circuit: "Lago Maggiore",
    headline: "Tercera cita en Italia",
    title:
      "🔴 [ES] GT7 EN VIVO | R3.2 LAGO MAGGIORE | INFINITY GSERIES · GT7 ESPORTS",
  },
  {
    round: 4,
    youtubeId: "CxBEjIYXb_c",
    circuit: "Red Bull Ring",
    headline: "Spielberg en directo",
    title:
      "🔴 [ES] LAS INFINITY GSERIES EN DIRECTO | R4.2 RED BULL RING | #SORTEO",
  },
  {
    round: 5,
    youtubeId: "7nE4XiceoZg",
    circuit: "Dragon Trail",
    headline: "Cruce de temporada",
    title: "🔴 [ES] INFINITY GSERIES | R5.2 DRAGON TRAIL",
  },
  {
    round: 6,
    youtubeId: "FheUdLXkxDk",
    circuit: "Barcelona",
    headline: "De vuelta a casa",
    title: "🔴 [ES] INFINITY GSERIES | R6.1 BARCELONA",
    startSeconds: 9816,
  },
  {
    round: 7,
    youtubeId: "IzmX0q0fYQg",
    circuit: "Yas Marina",
    headline: "Final de la liga regular",
    title: "🔴 [ES] FINAL LIGA REGULAR - INFINITY GSERIES | R7.1 YAS MARINA",
    startSeconds: 9263,
  },
  {
    round: 8,
    youtubeId: "V7ZQb-SqjeU",
    circuit: "Circuit de la Sarthe",
    headline: "Arranca la fase final",
    title:
      "🔴 [ES] FASE FINAL (1/3) · R8 INFINITY GSERIES _ CIRCUIT DE LA SARTHE",
    startSeconds: 11513,
  },
  {
    round: 9,
    youtubeId: "ZNR4zN1dvLc",
    circuit: "Spa-Francorchamps",
    headline: "Finales por el título",
    title:
      "🔴 [ES] R9 INFINITY GSERIES - FINALES POR EL TÍTULO (2/3) _ SPA FRANCORCHAMPS",
    startSeconds: 10888,
  },
];

export const TOURNAMENT_VIDEOS = orderTournamentVideosForSeasonCalendar(
  TOURNAMENT_VIDEOS_RAW,
);
