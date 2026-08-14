import { SectionDisplayTitle } from "../SectionDisplayTitle";

/** Large clip-up title on the page chrome, above the night panel. */
export const NoticiasTitle = ({ id }: { id: string }): JSX.Element => (
  <SectionDisplayTitle id={id} label="Noticias" size="lg" />
);
