# Decisiones

Registro corto de **por qué** elegimos algo en frontend e infraestructura.
No sustituye al README ni a `CONVENTIONS.md`: aquí va el motivo, no el cómo.

Formato: máximo ~5 renglones por decisión. Añade entradas nuevas al final de cada sección.

---

## Frontend

### Navbar en píldora (estilo Apple)

Al hacer scroll, la barra pasa a “isla” con blur.
Motivo: se lee como producto premium, no tapa el hero y mantiene marca + redes + a11y a mano.
Alternativa descartada: navbar fija opaca de borde a borde.

### Rebrand visual (GTSPAIN 92 → Ninety Two / N2)

En Quiénes somos se muestra el logo anterior y el de nuevo comienzo.
Motivo: contar la evolución del equipo sin borrar la historia.
Los assets viven en `assets/quienes-somos/`.

### Iconos sociales y a11y animados (`motion` + itshover)

Usamos iconos animados al hover, no shadcn completo.
Motivo: el repo no tiene `components.json`; integrar solo el icono + `motion` evita ruido.
Respetan reduced motion del panel de accesibilidad.

### Morph de iconos de estado (`morphicons` + `lucide`)

Los toggles de trazo (menú ↔ cierre) morphan con spring, no se sustituyen a secas.
Motivo: el cambio de estado se lee en el mismo trazo; `lucide` aporta los datos SVG, no componentes.
`reducedMotion` sigue el panel de accesibilidad (`always` / `never`), no solo el del SO.

### Layout escalonado en Quiénes somos

Foto arriba a un lado, texto centrado, otra foto más abajo al contrario.
Motivo: ritmo visual tipo web moderna; el copy y las fotos se leen en beats, no en un muro.

### Cadena de reveals (párrafo → fotos → marca)

La 2.ª foto espera al 3.er párrafo; `nuevo-comienzo` espera a la 2.ª; “Un nuevo comienzo” se arma después.
Motivo: una sola historia en el scroll, sin todo animando a la vez.

### “Un nuevo comienzo” ligado al scroll

Tras la última foto, el texto se scrubbea con el scroll (bajar revela, subir reinicia).
Motivo: sensación de control del usuario, no un one-shot que queda pegado.

### Organización por features

`landing-page`, `loading-screen`, `accessibility` + `shared`.
Motivo: cada pantalla crece sin mezclar responsabilidades.
Detalle de imports y nombres: `docs/CONVENTIONS.md`.

### SPA con React Router

`/equipos`, `/fotos`, `/noticias`, `/torneos` son rutas propias con el mismo shell.
Motivo: secciones profundas merecen URL propia sin recargar toda la app.
`/fotos` no va en el menú; se abre desde Diseños («Ver todas»).

### Panel de accesibilidad propio

Preferencias (motion, filtros, etc.) en feature `accessibility`.
Motivo: control centralizado y anuncios para lectores de pantalla, no depender solo del SO.

### Torneos como broadcast (última carrera)

El vídeo activo ocupa casi todo el ancho, con overlay de ronda, circuito y CTA tipo «Todas las fotos».
Motivo: que el cierre se lea como retransmisión del club, no como una lista de YouTube.
El título de YouTube se guarda para atribución; el titular (`headline`) lo escribe el equipo.

### Torneos como calendario de temporada

La tira de miniaturas se sustituye por una línea de campeonato (ronda, circuito, estado).
Motivo: R1→última se lee como una temporada, no como una galería de YouTube.
La ronda en antena va en crema y «en juego»; el resto, más quieta.

### Título de Torneos separado del panel noche

El título Orbitron vive en el cromo de la página; el panel negro envuelve solo broadcast + calendario.
Motivo: el mismo peso visual que Equipos / Fotos / Noticias, y una entrada propia (letras desde el centro + línea de meta).

### Panel noche compartido (`NightPanelSection`)

Equipos, Fotos, Noticias y Torneos usan el mismo cromo: título arriba + panel negro que sube a encontrarse con el footer.
Motivo: el layout era el mismo en cuatro CSS; un solo componente evita drift. Cada sección guarda su intro de título (chocan, wipe, línea de meta, clip-up).
Descartado: un mega-componente de título o fusionar las cuatro páginas de ruta.

### Noticias sin columna de marcas

Las piezas van en dos columnas (imagen + texto). Se quitó la galería de marcas/compañeros.
Motivo: los assets de marcas ya no se publican; el layout de tres columnas quedaba vacío.
`href` opcional se mantiene por si una noticia enlaza «leer más».

### Foto única en Quiénes somos (`AboutFramedImage`)

Lead y closing usaban el mismo markup de marco + scrub de scroll.
Motivo: dos componentes idénticos solo por el JSDoc; un solo marco evita copiar el encuadre.

### Tres capas de animación (CSS + `motion` + `morphicons`)

No hay un solo motor: cada gesto usa la herramienta más barata.
CSS (`@keyframes` / modules): intros de título, panel noche, isla del navbar — one-shots, sin JS por frame.
`motion`: hover de iconos, scrub de scroll (Quiénes somos, noticias) y el botón de tinta — gestos y progreso ligado al scroll.
`morphicons` + `lucide`: solo el morph menú ↔ cierre, un trazo que cambia de estado.
Canvas propio: la loading screen, control frame a frame. Descartado: Framer/GSAP para todo.

### Tailwind + CSS modules

Tailwind cubre layout, spacing y tokens. Los modules guardan coreografías (títulos, panel noche, cartas).
Motivo: utilidades rápidas para cromo; animaciones complejas no caben en class soup.
`@tailwindcss/vite` (v4) inyecta el CSS sin PostCSS extra.

_(2026-08-14)_

---

## Backend / infraestructura

### Sin backend propio (por ahora)

El sitio es estático (Vite → `dist`).
Motivo: el contenido actual no exige API ni auth; menos coste y menos superficie de fallo.

### Hosting en Vercel

Deploy del frontend + rewrites SPA en `vercel.json`.
Motivo: encaja con Vite, HTTPS y previews por PR sin servidor propio.

### Títulos de torneos vía script (`tournaments:sync-titles`)

Script Node que lee títulos desde YouTube, no un servidor en runtime.
Motivo: datos frescos en build/mantenimiento, sin exponer API keys al cliente.

### CI en GitHub Actions

Formato, lint, types, tests y build en cada push/PR.
Motivo: pillar roturas antes de producción.

### Vite + TypeScript

Vite sirve y empaqueta el SPA; `tsc -b` valida tipos antes del build.
Motivo: recarga rápida en local y un `dist/` estático para Vercel, sin bundler extra.
React 18 es el runtime de UI; no hay meta-framework (Next, Remix) porque no hay SSR ni backend.

### ESLint + Prettier + Vitest

ESLint (hooks + refresh) pilla bugs de React; Prettier unifica formato; Vitest corre tests de utilidades (`easings`, etc.).
Motivo: el CI (`npm run ci`) es una sola puerta: formato, lint, types, tests y build.
Descartado: Jest (Vitest ya habla Vite) o un linter de CSS extra.

### Sharp para favicons

`scripts/generate-favicons.mjs` genera PNG de varios tamaños en `prebuild`.
Motivo: un solo master y tamaños correctos para pestaña, Apple y Android, sin subir cada variante a mano.

_(2026-08-14)_

---

## Cómo añadir una decisión

1. Título corto (qué se decidió).
2. Qué hicimos + por qué (y qué se descartó, si importa).
3. Máximo ~5 renglones.
4. Fecha opcional al final: `_(AAAA-MM-DD)_`.
