import { DesignsSection } from "./designs";
import { PatrocinadoresSection } from "./patrocinadores";
import { QuienesSomosSection } from "./quienes-somos";

import styles from "./ContentSections.module.css";

export const ContentSections = (): JSX.Element => {
  return (
    <div className="relative flex flex-col">
      {/* Soft lead-in so the night surface begins with Quiénes somos, not a hard cut. */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-28 -translate-y-full bg-gradient-to-b from-transparent to-black/90"
        aria-hidden="true"
      />
      <div className={styles.stack} data-home-content-stack>
        <QuienesSomosSection />
        <DesignsSection />
        <PatrocinadoresSection />
      </div>
    </div>
  );
};
