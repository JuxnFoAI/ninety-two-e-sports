/** Tight filter region so the default -10%/120% box cannot inflate hit-testing. */
const FILTER_REGION = {
  x: "0%",
  y: "0%",
  width: "100%",
  height: "100%",
} as const;

/** SVG color matrices for color-blind accessibility filters. */
export const ColorBlindnessFilters = (): JSX.Element => (
  <svg
    className="pointer-events-none absolute h-0 w-0 overflow-hidden"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <filter id="a11y-protanopia" {...FILTER_REGION}>
        <feColorMatrix
          type="matrix"
          values="0.567 0.433 0 0 0
                  0.558 0.442 0 0 0
                  0 0.242 0.758 0 0
                  0 0 0 1 0"
        />
      </filter>
      <filter id="a11y-deuteranopia" {...FILTER_REGION}>
        <feColorMatrix
          type="matrix"
          values="0.625 0.375 0 0 0
                  0.7 0.3 0 0 0
                  0 0.3 0.7 0 0
                  0 0 0 1 0"
        />
      </filter>
      <filter id="a11y-tritanopia" {...FILTER_REGION}>
        <feColorMatrix
          type="matrix"
          values="0.95 0.05 0 0 0
                  0 0.433 0.567 0 0
                  0 0.475 0.525 0 0
                  0 0 0 1 0"
        />
      </filter>
    </defs>
  </svg>
);
