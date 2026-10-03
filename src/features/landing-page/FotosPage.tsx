import { usePageTitle } from "@/shared/hooks";

import { StandaloneSectionPage } from "./components";
import { FotosSection } from "./components/fotos";

export const FotosPage = (): JSX.Element => {
  usePageTitle("Fotos");

  return (
    <StandaloneSectionPage connectToFooter>
      <FotosSection />
    </StandaloneSectionPage>
  );
};
