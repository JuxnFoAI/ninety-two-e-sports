import { usePageTitle } from "@/shared/hooks";

import { StandaloneSectionPage } from "./components";
import { EquiposSection } from "./components/equipos";

export const EquiposPage = (): JSX.Element => {
  usePageTitle("Equipos");

  return (
    <StandaloneSectionPage connectToFooter>
      <EquiposSection />
    </StandaloneSectionPage>
  );
};
