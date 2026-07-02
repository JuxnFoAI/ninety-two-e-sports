export type DivisionId = "europe" | "america";

export interface PilotPhotoFit {
  /** Valor CSS para `object-position` (ej. `center 30%`). */
  position?: string;
  /** Zoom sobre la foto para recortar márgenes vacíos. */
  scale?: number;
  /** Origen del zoom; ancla el encuadre (ej. `center 45%` en la cintura). */
  origin?: string;
}

export interface Pilot {
  id: string;
  alias: string;
  country: string;
  role: string;
  /** URL del import desde `assets/` (alias `@assets`). Opcional hasta tener la foto. */
  photo?: string;
  /** Ajuste fino del encuadre cuando la foto trae espacio vacío alrededor del piloto. */
  photoFit?: PilotPhotoFit;
}

export interface DivisionRoster {
  id: DivisionId;
  title: string;
  leaderLabel: string;
  buttonLabel: string;
  badgeLabel: string;
  gradient: string;
  leader: Pilot;
  pilots: Pilot[];
}
