import { StandaloneSectionPage } from "./components";
import { EquiposSection } from "./components/equipos";

export const EquiposPage = (): JSX.Element => (
  <StandaloneSectionPage connectToFooter>
    <EquiposSection />
  </StandaloneSectionPage>
);
