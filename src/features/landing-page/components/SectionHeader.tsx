import {
  SECTION_DESCRIPTION_CLASS,
  SECTION_TITLE_CLASS,
} from "../styles/sectionClasses";
import { RevealItem } from "./reveal";

interface SectionHeaderProps {
  titleId: string;
  title: string;
  /** Omit when the section uses a custom block after the title (e.g. division selector). */
  description?: string;
  descriptionClassName?: string;
}

export const SectionHeader = ({
  titleId,
  title,
  description,
  descriptionClassName = "max-w-2xl",
}: SectionHeaderProps): JSX.Element => (
  <>
    <RevealItem as="h2" id={titleId} index={0} className={SECTION_TITLE_CLASS}>
      {title}
    </RevealItem>

    {description != null ? (
      <RevealItem
        as="p"
        index={1}
        className={`${SECTION_DESCRIPTION_CLASS} ${descriptionClassName}`.trim()}
      >
        {description}
      </RevealItem>
    ) : null}
  </>
);
