# Convenciones del proyecto

Guía para quien mantenga o extienda el código de Ninety Two E-Sports.

## Organización por features

| Carpeta                        | Responsabilidad                                                              |
| ------------------------------ | ---------------------------------------------------------------------------- |
| `src/app/`                     | Composición raíz (`AccessibilityProvider` → `LoadingScreen` → `LandingPage`) |
| `src/features/landing-page/`   | Página principal y secciones                                                 |
| `src/features/loading-screen/` | Animación de carga (canvas)                                                  |
| `src/features/accessibility/`  | Panel de accesibilidad, preferencias y anuncios para lectores de pantalla    |
| `src/shared/`                  | Hooks y utilidades reutilizables entre features                              |
| `assets/`                      | Imágenes y videos importados con `@assets`                                   |
| `public/`                      | Solo archivos con URL fija (`/favicon.png`)                                  |

Cada feature puede tener `components/`, `hooks/`, `data/`, `lib/`, `types/` según necesite.

## Imports

| Alcance                    | Convención      | Ejemplo                        |
| -------------------------- | --------------- | ------------------------------ |
| Fuera de la feature actual | Alias `@/`      | `@/shared/hooks`               |
| Dentro de la misma feature | Rutas relativas | `../../data/pilots`            |
| Medios estáticos           | Alias `@assets` | `@assets/marca/ninety-two.png` |

Evita mezclar `@/` y `../` en el mismo archivo salvo casos justificados (p. ej. canvas que usa `@/shared/lib/geometry` y `./stageLayout`).

## Nombres en español e inglés

Es intencional y coherente con el producto:

- **Carpetas y secciones (UI):** español — `equipos`, `noticias`, `PatrocinadoresSection`, IDs `#equipos`.
- **Componentes internos / datos:** inglés — `SponsorCard`, `PilotCard`, `NewsGrid`.

Al añadir una sección nueva, mantén el patrón: carpeta en español, componente de sección `*Section.tsx`, subcomponentes en inglés descriptivo.

## Animaciones reveal

Las secciones usan `RevealSection` + `RevealItem` con índices de stagger (`index`).

| Constante                                           | Valor | Uso                                            |
| --------------------------------------------------- | ----- | ---------------------------------------------- |
| `SECTION_HEADER_REVEAL_COUNT`                       | 2     | Cabecera con índice, título y descripción      |
| `SECTION_COMPACT_HEADER_REVEAL_COUNT`               | 1     | Solo índice y título                           |
| `SECTION_COMPACT_HEADER_WITH_CONTROLS_REVEAL_START` | 2     | Tras cabecera compacta + una fila de controles |

`SectionHeader` admite `description` opcional. Si no hay descripción, el siguiente bloque usa el índice `1`.

## Loading screen: dos “geometry”

| Archivo                                             | Contenido                                                  |
| --------------------------------------------------- | ---------------------------------------------------------- |
| `src/shared/lib/geometry.ts`                        | Matemáticas genéricas (ángulos, puntos en círculo)         |
| `src/features/loading-screen/canvas/stageLayout.ts` | Tamaño del canvas, radios de anillos, tiempos de animación |

No renombrar `stageLayout.ts` a `geometry.ts`: colisionaría con el módulo compartido.

## Tipos de dominio

Los tipos viven en `src/features/landing-page/types/`. Importa el archivo concreto (`./types/pilot`, `./types/sponsor`…). Los datos (`constants.ts`, `data/*`) no deben importar componentes React.

## Assets

- Fotos de pilotos: `assets/integrantes/` y `assets/lideres/`
- Patrocinadores: `assets/patrocinadores/`
- Preferir nombres en kebab-case ASCII (`espana.jpg`, no `españa.jpg`) para compatibilidad entre sistemas.
