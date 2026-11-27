import { useCallback } from "react";
import {
  motion,
  useTransform,
  type MotionValue,
  type UseScrollOptions,
} from "motion/react";

import { useEffectiveReducedMotion } from "@/features/accessibility";

import { useOneWayScrollReveal } from "../../lib/useOneWayScrollReveal";
import styles from "./ScrollAppearText.module.css";

/** Share of the scroll window each letter takes to fade in. */
const GLYPH_WINDOW = 0.34;

/**
 * Heading top meets the viewport at 98%, then at 72%.
 * Short on purpose: this block sits near the end of the page.
 */
const TITLE_SCROLL_OFFSET: UseScrollOptions["offset"] = [
  "start 0.98",
  "start 0.72",
];

/** Rise while a letter is still arriving (em). */
const GLYPH_RISE = 0.35;

type ScrollAppearTextProps = {
  id: string;
  text: string;
};

type GlyphProps = {
  char: string;
  index: number;
  count: number;
  progress: MotionValue<number>;
  settled: boolean;
};

const glyphRange = (index: number, count: number): [number, number] => {
  if (count <= 1) {
    return [0, 1];
  }

  const start = (index / (count - 1)) * (1 - GLYPH_WINDOW);
  return [start, start + GLYPH_WINDOW];
};

/** One letter, faded and raised until its slice of the scroll arrives. */
const ScrollAppearGlyph = ({
  char,
  index,
  count,
  progress,
  settled,
}: GlyphProps): JSX.Element => {
  const [start, end] = glyphRange(index, count);
  const opacity = useTransform(progress, [start, end], [0, 1]);
  const y = useTransform(progress, [start, end], [`${GLYPH_RISE}em`, "0em"]);

  return (
    <motion.span
      className={styles.glyph}
      style={settled ? undefined : { opacity, y }}
    >
      {char}
    </motion.span>
  );
};

/** Desktop/fine pointer: letters follow scroll and stay once shown. */
const ScrollAppearTextScrub = ({
  id,
  text,
}: ScrollAppearTextProps): JSX.Element => {
  const glyphs = [...text];
  const { ref, progress, settled } = useOneWayScrollReveal({
    offset: TITLE_SCROLL_OFFSET,
  });
  const setRef = useCallback(
    (node: HTMLHeadingElement | null) => {
      ref.current = node;
    },
    [ref],
  );

  return (
    <h2
      ref={setRef}
      id={id}
      aria-label={text}
      className={`${styles.root} ${settled ? "" : styles.scrub}`.trim()}
    >
      <span className={styles.line} aria-hidden="true">
        {glyphs.map((char, index) => (
          <ScrollAppearGlyph
            key={`${char}-${index}`}
            char={char}
            index={index}
            count={glyphs.length}
            progress={progress}
            settled={settled}
          />
        ))}
      </span>
    </h2>
  );
};

/**
 * Heading that writes itself as it scrolls into view.
 * Fast scroll completes it just as fast; already-shown letters stay visible.
 */
export const ScrollAppearText = ({
  id,
  text,
}: ScrollAppearTextProps): JSX.Element => {
  const prefersReducedMotion = useEffectiveReducedMotion();

  if (prefersReducedMotion) {
    return (
      <h2 id={id} className={styles.root}>
        {text}
      </h2>
    );
  }

  return <ScrollAppearTextScrub id={id} text={text} />;
};
