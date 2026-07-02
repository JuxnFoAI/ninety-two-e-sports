import type {
  AccessibilitySectionConfig,
  AccessibilitySettings,
  ColorBlindMode,
} from "./types";

export const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  increaseTextSize: false,
  colorBlindMode: "off",
  enhancedContrast: false,
  muteBackgroundMedia: false,
  emphasizeCaptions: false,
  largeTargets: false,
  enhancedFocus: false,
  reduceMotion: false,
  readingMode: false,
  dyslexiaFriendlyFont: false,
  underlineLinks: false,
};

const COLOR_BLIND_CHOICES: ReadonlyArray<{
  value: ColorBlindMode;
  label: string;
}> = [
  { value: "off", label: "Sin filtro" },
  { value: "protanopia", label: "Protanopia (rojo-verde)" },
  { value: "deuteranopia", label: "Deuteranopia (verde)" },
  { value: "tritanopia", label: "Tritanopia (azul-amarillo)" },
];

export const ACCESSIBILITY_SECTIONS: readonly AccessibilitySectionConfig[] = [
  {
    id: "visual",
    title: "Visual",
    description: "Ajustes de lectura y tamaño del contenido.",
    options: [
      {
        kind: "boolean",
        key: "increaseTextSize",
        label: "Texto ampliado",
        description: "Incrementa el tamaño base de fuente en toda la página.",
      },
    ],
  },
  {
    id: "color-vision",
    title: "Daltonismo y contraste",
    description: "Filtros de color y paleta de alto contraste.",
    options: [
      {
        kind: "select",
        key: "colorBlindMode",
        label: "Modo de daltonismo",
        description: "Aplica un filtro de corrección según el tipo de visión.",
        choices: COLOR_BLIND_CHOICES,
      },
      {
        kind: "boolean",
        key: "enhancedContrast",
        label: "Contraste reforzado",
        description: "Aumenta contraste, bordes y legibilidad del texto.",
      },
    ],
  },
  {
    id: "hearing",
    title: "Discapacidad auditiva",
    description: "Control de medios y apoyo para contenido con subtítulos.",
    options: [
      {
        kind: "boolean",
        key: "muteBackgroundMedia",
        label: "Pausar fondo animado",
        description: "Detiene el video decorativo de fondo en escritorio.",
        hideOn: ["mobile"],
      },
      {
        kind: "boolean",
        key: "emphasizeCaptions",
        label: "Priorizar subtítulos",
        description: "Activa subtítulos en vídeos de YouTube embebidos.",
      },
    ],
  },
  {
    id: "motor",
    title: "Discapacidad motora",
    description: "Objetivos táctiles amplios y foco visible al teclado.",
    options: [
      {
        kind: "boolean",
        key: "largeTargets",
        label: "Objetivos táctiles amplios",
        description: "Aumenta el área mínima de botones y enlaces (44 px).",
      },
      {
        kind: "boolean",
        key: "enhancedFocus",
        label: "Foco reforzado",
        description:
          "Resalta claramente el elemento activo al navegar con teclado.",
      },
    ],
  },
  {
    id: "cognitive",
    title: "Discapacidad cognitiva",
    description: "Lectura simplificada y menos distracciones visuales.",
    options: [
      {
        kind: "boolean",
        key: "reduceMotion",
        label: "Reducir movimiento",
        description: "Desactiva animaciones decorativas adicionales.",
      },
      {
        kind: "boolean",
        key: "readingMode",
        label: "Modo lectura",
        description: "Oculta capas decorativas y suaviza el fondo.",
      },
      {
        kind: "boolean",
        key: "dyslexiaFriendlyFont",
        label: "Tipografía legible",
        description: "Usa Lexend con mayor espaciado entre letras y líneas.",
      },
      {
        kind: "boolean",
        key: "underlineLinks",
        label: "Subrayar enlaces",
        description:
          "Marca los enlaces de texto para identificarlos con facilidad.",
      },
    ],
  },
];

export const ACCESSIBILITY_SETTING_LABELS: Record<
  keyof AccessibilitySettings,
  string
> = {
  increaseTextSize: "Texto ampliado",
  colorBlindMode: "Modo de daltonismo",
  enhancedContrast: "Contraste reforzado",
  muteBackgroundMedia: "Pausar fondo animado",
  emphasizeCaptions: "Priorizar subtítulos",
  largeTargets: "Objetivos táctiles amplios",
  enhancedFocus: "Foco reforzado",
  reduceMotion: "Reducir movimiento",
  readingMode: "Modo lectura",
  dyslexiaFriendlyFont: "Tipografía legible",
  underlineLinks: "Subrayar enlaces",
};
