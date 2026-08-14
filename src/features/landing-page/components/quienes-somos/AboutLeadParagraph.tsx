import { ABOUT_TEXT_SLIDE_PX, AboutScrollReveal } from "./AboutScrollReveal";
import styles from "./AboutLeadParagraph.module.css";

type AboutLeadParagraphProps = {
  children: string;
};

/** Origins copy — fades in with scroll. */
export const AboutLeadParagraph = ({
  children,
}: AboutLeadParagraphProps): JSX.Element => (
  <AboutScrollReveal
    as="p"
    className={styles.root}
    xFrom={-ABOUT_TEXT_SLIDE_PX}
  >
    {children}
  </AboutScrollReveal>
);
