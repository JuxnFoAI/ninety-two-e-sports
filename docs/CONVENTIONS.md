# Convenciones del proyecto

Guía para quien mantenga o extienda el código de Ninety Two E-Sports.

## Organización por features

| Carpeta                        | Responsabilidad                                                                                                         |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `src/app/`                     | Composición raíz (`AccessibilityProvider` → `LoadingScreen` → rutas + `ScrollManager`)                                  |
| `src/features/landing-page/`   | Inicio (`/`), páginas propias (`/equipos`, `/fotos`, `/noticias`, `/torneos`) vía `SiteShell` / `StandaloneSectionPage` |
| `src/features/loading-screen/` | Animación de carga (esculpido WebGL2, con la timeline GSAP como respaldo en gama baja)                                  |
| `src/features/accessibility/`  | Panel de accesibilidad, preferencias y anuncios para lectores de pantalla                                               |
| `src/shared/`                  | Hooks y utilidades reutilizables entre features                                                                         |
| `assets/`                      | Imágenes y videos importados con `@assets`                                                                              |
| `public/`                      | Solo archivos con URL fija (`/favicon.png`)                                                                             |

Cada feature puede tener `components/`, `hooks/`, `data/`, `lib/`, `types/` según necesite.

## Imports

| Alcance                    | Convención      | Ejemplo                        |
| -------------------------- | --------------- | ------------------------------ |
| Fuera de la feature actual | Alias `@/`      | `@/shared/hooks`               |
| Dentro de la misma feature | Rutas relativas | `../../data/pilots`            |
| Medios estáticos           | Alias `@assets` | `@assets/marca/ninety-two.png` |

Un archivo puede usar `@/` para lo compartido y rutas relativas para su propia feature (p. ej. `useLoadingScreen` importa `@/features/accessibility` y `../constants`). Lo que no se hace es llegar a otra feature con `../../..`.

## Nombres en español e inglés

Es intencional y coherente con el producto:

- **Carpetas y secciones (UI):** español — `equipos`, `noticias`, `disenos`, `PatrocinadoresSection`.
- **Inicio (`/`):** hero + `#quienes-somos` + `#disenos` + `#patrocinadores` (bloque continuo, `surface="flush"`).
- **Rutas independientes:** español en path — `/equipos`, `/fotos`, `/noticias`, `/torneos` (misma pestaña vía React Router). `/fotos` no va en el menú (solo URL directa). Cualquier otra ruta muestra la página 404. Cada ruta pone su sección en `document.title`.
- **Componentes internos / datos:** inglés — `SponsorCard`, `PilotCard`, `NewsPhotoSlider`.
- **Diseños:** assets en `assets/Designs/` (`@assets/Designs/...`).

Al añadir una sección nueva en el inicio, mantén el patrón: carpeta en español, componente de sección `*Section.tsx`, subcomponentes en inglés descriptivo. Si pasa a página propia, añade ruta en `App.tsx`, página con `StandaloneSectionPage` y enlace en `NAV_LINKS` solo si debe aparecer en el menú.

## Animaciones reveal

Las secciones usan `RevealSection` + `RevealItem` con índices de stagger (`index`). Las páginas propias (`/equipos`, `/fotos`, `/noticias`, `/torneos`) comparten `NightPanelSection` (título + panel noche). Equipos, Fotos y Torneos tienen intro de título propia; Diseños y Noticias usan `SectionDisplayTitle`; Patrocinadores usa `ScrollAppearText` (las letras aparecen con el scroll).

## Loading screen

Código de producción en `src/features/loading-screen/` (el laboratorio
`prototypes/n2-liquid/` prueba variantes históricas; lo que publica el sitio es
`sculpt/`).

`useLoadingScreen` elige la variante con `detectDeviceTier` (`src/shared/lib/deviceTier.ts`):

- **Esculpido** (PC y móviles de gama alta y media): `sculpt/playSculptIntro.ts` dibuja en WebGL2 el logo N2 relleno de tinta que fluye, que un barrido diagonal solidifica en blanco. Las fases viven en `SCULPT_PHASES_S` y duran `SCULPT_DURATION_MS` antes del fundido.
- **Clásica** (gama baja, movimiento reducido, ahorro de datos o si WebGL falla): `animation/createLoaderTimeline.ts` arma una timeline GSAP de 1 s y `useLoadingScreen` le aplica `timeScale` para que dure `LOADING_DURATION_MS`.

Los tiempos viven en `constants.ts`.

## Tipos de dominio

Los tipos viven en `src/features/landing-page/types/`. Importa el archivo concreto (`./types/pilot`, `./types/sponsor`…). Los datos (`constants.ts`, `data/*`) no deben importar componentes React.

## Assets

- Fotos de pilotos: `assets/integrantes/` y `assets/lideres/`
- Liveries / diseños: `assets/Designs/` + lista `TEAM_DESIGNS` en `src/features/landing-page/data/designs.ts`
- Noticias: `assets/noticias/`
- Patrocinadores: `assets/patrocinadores/`
- Preferir nombres en kebab-case ASCII (`espana.jpg`, no `españa.jpg`) para compatibilidad entre sistemas.
- Diseños: copiar el original desde las capturas de GT7 (`D:\PS5\CREATE\Screenshots\…`). No usar el preview del chat.
- Antes de dejar una foto en el repo, pasar `node scripts/optimize-web-images.mjs`. Deja diseños en 1920 px, noticias en 1600 y pilotos en 960. Logos de marca y patrocinadores no se tocan.
