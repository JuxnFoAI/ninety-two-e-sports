import { StandaloneSectionPage } from "./components";
import { NoticiasSection } from "./components/noticias";

export const NoticiasPage = (): JSX.Element => (
  <StandaloneSectionPage connectToFooter>
    <NoticiasSection />
  </StandaloneSectionPage>
);
