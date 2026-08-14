import { StandaloneSectionPage } from "./components";
import { FotosSection } from "./components/fotos";

export const FotosPage = (): JSX.Element => (
  <StandaloneSectionPage connectToFooter>
    <FotosSection />
  </StandaloneSectionPage>
);
