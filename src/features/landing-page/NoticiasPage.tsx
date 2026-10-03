import { usePageTitle } from "@/shared/hooks";

import { StandaloneSectionPage } from "./components";
import { NoticiasSection } from "./components/noticias";

export const NoticiasPage = (): JSX.Element => {
  usePageTitle("Noticias");

  return (
    <StandaloneSectionPage connectToFooter opaqueNight>
      <NoticiasSection />
    </StandaloneSectionPage>
  );
};
