import { useLayoutEffect, type RefObject } from "react";

/**
 * Toggles the DOM `inert` property. React 18 does not emit the attribute
 * from JSX, so this has to be set on the element itself.
 */
export const useInert = (
  ref: RefObject<HTMLElement | null>,
  inactive: boolean,
): void => {
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) {
      return undefined;
    }

    element.inert = inactive;

    return () => {
      element.inert = false;
    };
  }, [inactive, ref]);
};
