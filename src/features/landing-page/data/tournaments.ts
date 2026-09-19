import { orderTournamentVideosForSeasonCalendar } from "../lib/tournamentGallery";
import type {
  TournamentChampionship,
  TournamentVideo,
} from "../types/tournamentVideo";

/**
 * Tournament gallery. First championship is on-air by default.
 * `title` must match the YouTube video title verbatim (attribution).
 * `headline` is the on-air title written by the team. `circuit` is the overlay / calendar name.
 * `round` sets calendar order within a championship. Pass `"desc"` to list newest first.
 * After adding a `youtubeId`, run `npm run tournaments:sync-titles` to refresh titles.
 */
const GT_WORLD_SERIES_2026_VIDEOS: readonly TournamentVideo[] = [
  {
    round: 3,
    roundLabel: "R2",
    youtubeId: "UJFo4dhswus",
    circuit: "Nations · Tokio",
    headline: "El mundial llega a Tokio",
    title: "[Español] GT World Series 2026 | Ronda 2 - Tokio | Nations Cup",
  },
  {
    round: 2,
    roundLabel: "R1",
    youtubeId: "1uoO2zIIMo8",
    circuit: "Nations · Milán",
    headline: "Las naciones en Milán",
    title: "[Español] GT World Series 2026 | Ronda 1 - Milán | Nations Cup",
  },
  {
    round: 1,
    roundLabel: "R1",
    youtubeId: "KAVyeGDsPKc",
    circuit: "Manufacturers · Milán",
    headline: "Milán abre el mundial",
    title:
      "[Español] GT World Series 2026 | Ronda 1 - Milán | Manufacturers Cup",
  },
];

const SUMMER_MADNESS_2026_VIDEOS: readonly TournamentVideo[] = [
  {
    round: 5,
    roundLabel: "R4",
    youtubeId: "hhr_rhi9SAE",
    circuit: "Fuji Speedway",
    headline: "Fuji decide el título",
    title: "🔴 [ES] R4 SUMMER MADNESS | MIRA LA CARRERA DEFINITIVA DE LA SM",
  },
  {
    round: 4,
    roundLabel: "R3",
    youtubeId: "ZusTaGvrBfE",
    circuit: "High Speed Ring Inverso",
    headline: "Otra vez la misma historia",
    title: "🔴 [ES] R3 SUMMER MADNESS | OTRA VEZ LA MISMA HISTORIA",
  },
  {
    round: 3,
    roundLabel: "R2",
    youtubeId: "VIyDxcZL1ds",
    circuit: "Nürburgring Resistencia",
    headline: "La mayor locura competitiva",
    title: "🔴 [ES] R2 SUMMER MADNESS | La MAYOR LOCURA COMPETITIVA de GT7",
  },
  {
    round: 2,
    roundLabel: "R1",
    youtubeId: "iXaoVUG1q9k",
    circuit: "Nürburgring Sprint",
    headline: "La ruleta decide el clima",
    title: "🔴 [ES] R1 SUMMER MADNESS | SORTEO DE CLIMA + 40 MINS DE CARRERA",
  },
  {
    round: 1,
    roundLabel: "Clasif.",
    youtubeId: "rmNqcwFymfs",
    circuit: "Nürburgring",
    headline: "El Top 15 se clasifica",
    title:
      "🔴 [ES] SUMMER MADNESS | FASE CLASIFICATORIA - EL TOP15 SE CLASIFICA",
  },
];

const TOURNAMENT_CIE_2026_VIDEOS: readonly TournamentVideo[] = [
  {
    round: 6,
    roundLabel: "R3 · P3",
    youtubeId: "ouaWE4TK61c",
    circuit: "Clausura",
    headline: "Cierra la tercera ronda",
    title: "CIE 2026 Clausura - Ronda 3 PARTE 3",
  },
  {
    round: 5,
    roundLabel: "R3 · P2",
    youtubeId: "NyBJfNEvgsE",
    circuit: "Clausura",
    headline: "Sigue la tercera ronda",
    title: "CIE 2026 Clausura - Ronda 3 PARTE 2",
  },
  {
    round: 4,
    roundLabel: "R3 · P1",
    youtubeId: "81Y2Fik75Nk",
    circuit: "Clausura",
    headline: "Arranca la tercera ronda",
    title: "CIE 2026 Clausura - Ronda 3 PARTE 1",
  },
  {
    round: 3,
    roundLabel: "R2",
    youtubeId: "cWriixeDmOs",
    circuit: "Clausura",
    headline: "Arranca la segunda ronda",
    title: "CIE 2026 Clausura- Ronda 2",
  },
  {
    round: 2,
    roundLabel: "R1 · P2",
    youtubeId: "1vtr7-jMKx8",
    circuit: "Clausura",
    headline: "Sigue la primera ronda",
    title: "CIE 2026 Clausura- Ronda 1 (PARTE2)",
  },
  {
    round: 1,
    roundLabel: "R1 · P1",
    youtubeId: "fN4Tgq2QvV8",
    circuit: "Clausura",
    headline: "Arranca la primera ronda",
    title: "CIE 2026 Clausura - Ronda 1 (PARTE 1)",
  },
];

const SEC_SERIES_2026_VIDEOS: readonly TournamentVideo[] = [
  {
    round: 2,
    roundLabel: "R1",
    youtubeId: "Dm6VAblG6JE",
    circuit: "Monza",
    headline: "3 horas de Monza",
    title: "【SEC SERIES 2026】3 HORAS DE MONZA - GT3 - CARRERA",
  },
  {
    round: 1,
    roundLabel: "Clasif.",
    youtubeId: "YWsgWM1RCXY",
    circuit: "Monza",
    headline: "Se decide la parrilla",
    title: "【SEC SERIES 2026】3 HORAS DE MONZA - GT3 - CLASIFICACION",
  },
];

const INFINITY_G_SERIES_2026_VIDEOS: readonly TournamentVideo[] = [
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
  {
    round: 10,
    youtubeId: "340niyELv7Q",
    circuit: "Grand Valley",
    headline: "Última carrera de la temporada",
    title:
      "🔴 [ES] R10 INFINITY GSERIES - ÚLTIMA CARRERA DE LA TEMPORADA _ GRAND VALLEY",
  },
];

export const TOURNAMENT_CHAMPIONSHIPS: readonly TournamentChampionship[] = [
  {
    id: "gt-world-series-2026",
    label: "GT World Series · 2026",
    videos: orderTournamentVideosForSeasonCalendar(
      GT_WORLD_SERIES_2026_VIDEOS,
      "desc",
    ),
  },
  {
    id: "summer-madness-2026",
    label: "Summer Madness · 2026",
    videos: orderTournamentVideosForSeasonCalendar(
      SUMMER_MADNESS_2026_VIDEOS,
      "desc",
    ),
  },
  {
    id: "tournament-cie-2026",
    label: "Tournament CIE · 2026",
    videos: orderTournamentVideosForSeasonCalendar(
      TOURNAMENT_CIE_2026_VIDEOS,
      "desc",
    ),
  },
  {
    id: "sec-series-2026",
    label: "SEC Series · 2026",
    videos: orderTournamentVideosForSeasonCalendar(
      SEC_SERIES_2026_VIDEOS,
      "desc",
    ),
  },
  {
    id: "infinity-g-series-2026",
    label: "Infinity G Series · 2026",
    videos: orderTournamentVideosForSeasonCalendar(
      INFINITY_G_SERIES_2026_VIDEOS,
      "desc",
    ),
  },
];
