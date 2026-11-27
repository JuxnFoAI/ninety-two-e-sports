import { RevealSection } from "../reveal";
import { SectionDisplayTitle } from "../SectionDisplayTitle";
import { DesignsGallery } from "./DesignsGallery";

export const DesignsSection = (): JSX.Element => (
  <RevealSection id="disenos" aria-labelledby="disenos-title" surface="flush">
    <div className="w-full text-center sm:text-left">
      <SectionDisplayTitle
        id="disenos-title"
        label="Diseños del Equipo"
        ariaLabel="Diseños del Equipo"
        reveal="slideLeft"
      />
    </div>

    <div id="disenos-galeria" className="mt-16 sm:mt-20">
      <DesignsGallery />
    </div>
  </RevealSection>
);
