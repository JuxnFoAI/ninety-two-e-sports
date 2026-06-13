import {
  useCallback,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  type RefCallback,
} from "react";

const DRAG_ACTIVATION_PX = 6;

type ScrollElement = HTMLElement;

interface PointerDragState {
  pointerId: number;
  startClientX: number;
  startScrollLeft: number;
  isDragging: boolean;
}

interface UseHorizontalDragScrollOptions {
  /** Allows vertical page scroll on touch while dragging the strip horizontally. */
  preferVerticalTouchPan?: boolean;
}

interface HorizontalDragScrollProps {
  onPointerDown: (event: ReactPointerEvent<ScrollElement>) => void;
  onPointerMove: (event: ReactPointerEvent<ScrollElement>) => void;
  onPointerUp: (event: ReactPointerEvent<ScrollElement>) => void;
  onPointerCancel: (event: ReactPointerEvent<ScrollElement>) => void;
  onClickCapture: (event: ReactMouseEvent<ScrollElement>) => void;
  style?: { touchAction: "pan-y" };
}

/**
 * Enables horizontal scrolling by dragging the strip.
 * Prevents accidental thumbnail taps when the user was swiping.
 */
export const useHorizontalDragScroll = (
  enabled: boolean,
  options: UseHorizontalDragScrollOptions = {},
): {
  ref: RefCallback<ScrollElement>;
  dragScrollProps: HorizontalDragScrollProps | undefined;
  isDragging: boolean;
} => {
  const { preferVerticalTouchPan = false } = options;
  const elementRef = useRef<ScrollElement | null>(null);
  const dragStateRef = useRef<PointerDragState | null>(null);
  const didDragRef = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const setRef = useCallback((node: ScrollElement | null) => {
    elementRef.current = node;
  }, []);

  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<ScrollElement>) => {
      if (!enabled || event.button !== 0) {
        return;
      }

      const element = elementRef.current;
      if (!element) {
        return;
      }

      dragStateRef.current = {
        pointerId: event.pointerId,
        startClientX: event.clientX,
        startScrollLeft: element.scrollLeft,
        isDragging: false,
      };

      element.setPointerCapture(event.pointerId);
    },
    [enabled],
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<ScrollElement>) => {
      const dragState = dragStateRef.current;
      const element = elementRef.current;

      if (!dragState || !element || dragState.pointerId !== event.pointerId) {
        return;
      }

      const deltaX = event.clientX - dragState.startClientX;

      if (!dragState.isDragging && Math.abs(deltaX) < DRAG_ACTIVATION_PX) {
        return;
      }

      if (!dragState.isDragging) {
        dragState.isDragging = true;
        setIsDragging(true);
      }

      didDragRef.current = true;
      element.scrollLeft = dragState.startScrollLeft - deltaX;
    },
    [],
  );

  const handlePointerEnd = useCallback(
    (event: ReactPointerEvent<ScrollElement>) => {
      const dragState = dragStateRef.current;
      const element = elementRef.current;

      if (!dragState || dragState.pointerId !== event.pointerId) {
        return;
      }

      element?.releasePointerCapture(event.pointerId);
      dragStateRef.current = null;
      setIsDragging(false);
    },
    [],
  );

  const handleClickCapture = useCallback(
    (event: ReactMouseEvent<ScrollElement>) => {
      if (!didDragRef.current) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      didDragRef.current = false;
    },
    [],
  );

  if (!enabled) {
    return { ref: setRef, dragScrollProps: undefined, isDragging: false };
  }

  return {
    ref: setRef,
    isDragging,
    dragScrollProps: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerEnd,
      onPointerCancel: handlePointerEnd,
      onClickCapture: handleClickCapture,
      style: preferVerticalTouchPan ? { touchAction: "pan-y" } : undefined,
    },
  };
};
