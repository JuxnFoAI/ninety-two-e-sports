import { EquiposSection } from "./equipos";
import { NoticiasSection } from "./noticias";
import { PatrocinadoresSection } from "./patrocinadores";
import { QuienesSomosSection } from "./quienes-somos";
import { TorneosSection } from "./torneos";

export const ContentSections = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-px bg-white/10">
      <QuienesSomosSection />
      <EquiposSection />
      <NoticiasSection />
      <TorneosSection />
      <PatrocinadoresSection />
    </div>
  );
};
