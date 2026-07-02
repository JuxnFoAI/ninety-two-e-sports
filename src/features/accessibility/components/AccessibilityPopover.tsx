import { useEffect, useId, useRef } from "react";

import { AccessibilityPanelContent } from "./AccessibilityPanelContent";
import { AccessibilityTriggerButton } from "./AccessibilityTriggerButton";

const PANEL_CLASS =
  "absolute right-0 top-[calc(100%+0.65rem)] z-40 w-[min(22rem,calc(100vw-2rem))] max-h-[min(70vh,32rem)] overflow-y-auto rounded-xl border border-white/15 bg-black/90 p-4 shadow-[0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-md";

interface AccessibilityPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AccessibilityPopover = ({
  open,
  onOpenChange,
}: AccessibilityPopoverProps): JSX.Element => {
  const panelId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handlePointerDown = (event: MouseEvent): void => {
      if (!containerRef.current?.contains(event.target as Node)) {
        onOpenChange(false);
      }
    };

    const handleEscape = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onOpenChange]);

  return (
    <div
      ref={containerRef}
      className="relative hidden desktop-ui:block"
      data-desktop-only="true"
    >
      <AccessibilityTriggerButton
        expanded={open}
        controls={open ? panelId : undefined}
        onClick={() => onOpenChange(!open)}
      />

      {open ? (
        <div
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-label="Opciones de accesibilidad"
          className={PANEL_CLASS}
        >
          <AccessibilityPanelContent />
        </div>
      ) : null}
    </div>
  );
};
