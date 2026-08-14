import { StandaloneSectionPage } from "./components";
import { TorneosSection } from "./components/torneos";

export const TorneosPage = (): JSX.Element => (
  <StandaloneSectionPage connectToFooter>
    <TorneosSection />
  </StandaloneSectionPage>
);
