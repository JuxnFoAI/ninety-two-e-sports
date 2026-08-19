/**
 * Applied on each visual layer that has a real box (not a shared parent, and
 * not a zero-height wrapper around `position: fixed` chrome). A CSS `filter`
 * creates a containing block and stacking context; an empty wrapper traps
 * z-index and can steal pointer events from the navbar and page sections.
 */
export const A11Y_COLOR_FILTER_LAYER_CLASS = "a11y-color-filter-layer";
