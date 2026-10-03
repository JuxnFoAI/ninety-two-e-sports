import { usePageTitle } from "@/shared/hooks";

import { StandaloneSectionPage } from "./components";
import { TorneosSection } from "./components/torneos";

export const TorneosPage = (): JSX.Element => {
  usePageTitle("Torneos");

  return (
    <StandaloneSectionPage connectToFooter>
      <TorneosSection />
    </StandaloneSectionPage>
  );
};
