import type { ReactNode } from "react";

import { SiteShell } from "./SiteShell";

type StandaloneSectionPageProps = {
  children: ReactNode;
  /** Stretch main content so a night panel can meet the footer seamlessly. */
  connectToFooter?: boolean;
  /** Hide background media under the night panel and footer. */
  opaqueNight?: boolean;
};

/** Shared chrome for routed section pages (`/equipos`, `/fotos`, `/noticias`, `/torneos`). */
export const StandaloneSectionPage = ({
  children,
  connectToFooter = false,
  opaqueNight = false,
}: StandaloneSectionPageProps): JSX.Element => (
  <SiteShell
    connectFooterToContent={connectToFooter}
    opaqueNight={opaqueNight}
  >
    <div
      className={
        connectToFooter
          ? "flex min-h-full flex-1 flex-col pt-[var(--header-height)]"
          : "pt-[var(--header-height)]"
      }
    >
      {children}
    </div>
  </SiteShell>
);
