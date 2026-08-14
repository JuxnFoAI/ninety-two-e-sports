import type { CSSProperties, ReactNode } from "react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

import { RevealSection } from "./reveal";
import { useRevealSection } from "./reveal/useRevealSection";
import styles from "./NightPanelSection.module.css";

type NightPanelSectionProps = {
  id: string;
  titleId: string;
  title: ReactNode;
  panelDelayMs: number;
  children: ReactNode;
  className?: string;
  /** Extra bottom padding so a hashtag or credits sit above the footer. */
  panelPadding?: "default" | "deep";
};

const NightPanelBody = ({
  title,
  panelDelayMs,
  children,
  panelPadding,
}: Pick<
  NightPanelSectionProps,
  "title" | "panelDelayMs" | "children" | "panelPadding"
>): JSX.Element => {
  const isVisible = useRevealSection();
  const prefersReducedMotion = useEffectiveReducedMotion();
  const delayMs = prefersReducedMotion ? 0 : panelDelayMs;

  return (
    <>
      <div className={styles.title}>{title}</div>
      <div
        className={`${styles.panel} ${
          panelPadding === "deep" ? styles.panelDeep : ""
        } ${
          isVisible
            ? prefersReducedMotion
              ? styles.panelVisible
              : styles.panelAnimated
            : ""
        }`.trim()}
        style={
          {
            "--panel-reveal-delay": `${delayMs}ms`,
          } as CSSProperties
        }
      >
        <div className={styles.panelLeadIn} aria-hidden />
        {children}
      </div>
    </>
  );
};

/** Shared chrome for routed section pages: Orbitron title + rising night panel. */
export const NightPanelSection = ({
  id,
  titleId,
  title,
  panelDelayMs,
  children,
  className = "",
  panelPadding = "default",
}: NightPanelSectionProps): JSX.Element => (
  <RevealSection
    id={id}
    aria-labelledby={titleId}
    surface="flush"
    className={`${styles.section} flex flex-1 flex-col ${className}`.trim()}
  >
    <NightPanelBody
      title={title}
      panelDelayMs={panelDelayMs}
      panelPadding={panelPadding}
    >
      {children}
    </NightPanelBody>
  </RevealSection>
);
