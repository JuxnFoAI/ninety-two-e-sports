import { ABOUT_TEXT_SLIDE_PX, AboutScrollReveal } from "./AboutScrollReveal";
import titleStyles from "../SectionDisplayTitle.module.css";

/** Section title — hidden until scroll, then scrubs in at scroll speed. */
export const QuienesSomosTitle = (): JSX.Element => (
  <AboutScrollReveal
    as="h2"
    id="quienes-somos-title"
    className={`${titleStyles.root} text-section-title`}
    aria-label="Quiénes somos"
    xFrom={-ABOUT_TEXT_SLIDE_PX}
  >
    Quiénes somos
  </AboutScrollReveal>
);
