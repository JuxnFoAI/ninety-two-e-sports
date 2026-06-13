import { ABOUT_BODY } from "../../data/about";
import { SECTION_DESCRIPTION_CLASS } from "../../styles/sectionClasses";
import { RevealItem } from "../reveal";

interface AboutBodyProps {
  revealStartIndex: number;
}

const BODY_CLASS = `${SECTION_DESCRIPTION_CLASS} max-w-3xl lg:max-w-none`;

export const AboutBody = ({
  revealStartIndex,
}: AboutBodyProps): JSX.Element => (
  <div>
    {ABOUT_BODY.map(({ id, text }, index) => (
      <RevealItem
        key={id}
        as="p"
        index={revealStartIndex + index}
        className={`${BODY_CLASS} ${index > 0 ? "mt-5" : ""}`.trim()}
      >
        {text}
      </RevealItem>
    ))}
  </div>
);
