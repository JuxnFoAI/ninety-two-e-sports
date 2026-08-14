import { ABOUT_TEXT_SLIDE_PX, AboutScrollReveal } from "./AboutScrollReveal";
import styles from "./AboutFamilyParagraph.module.css";

type AboutFamilyParagraphProps = {
  children: string;
};

/** Family copy — fades in with scroll. */
export const AboutFamilyParagraph = ({
  children,
}: AboutFamilyParagraphProps): JSX.Element => (
  <AboutScrollReveal as="p" className={styles.root} xFrom={-ABOUT_TEXT_SLIDE_PX}>
    {children}
  </AboutScrollReveal>
);
