import { ABOUT_TEXT_SLIDE_PX, AboutScrollReveal } from "./AboutScrollReveal";
import styles from "./AboutRebrandParagraph.module.css";

type AboutRebrandParagraphProps = {
  children: string;
};

/** Rebrand copy — fades in with scroll. */
export const AboutRebrandParagraph = ({
  children,
}: AboutRebrandParagraphProps): JSX.Element => (
  <AboutScrollReveal as="p" className={styles.root} xFrom={ABOUT_TEXT_SLIDE_PX}>
    {children}
  </AboutScrollReveal>
);
