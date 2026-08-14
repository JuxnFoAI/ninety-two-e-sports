import { ABOUT_BODY } from "../../data/about";
import { AboutFamilyParagraph } from "./AboutFamilyParagraph";
import { AboutLeadParagraph } from "./AboutLeadParagraph";
import { AboutRebrandParagraph } from "./AboutRebrandParagraph";

interface AboutBodyProps {
  /** Paragraph ids to render, in display order. Defaults to all. */
  paragraphIds?: readonly string[];
  className?: string;
}

export const AboutBody = ({
  paragraphIds,
  className = "",
}: AboutBodyProps): JSX.Element => {
  const paragraphs =
    paragraphIds == null
      ? [...ABOUT_BODY]
      : paragraphIds.flatMap((id) => {
          const paragraph = ABOUT_BODY.find((entry) => entry.id === id);
          return paragraph ? [paragraph] : [];
        });

  return (
    <div className={className}>
      {paragraphs.map(({ id, text }) => {
        if (id === "origins") {
          return <AboutLeadParagraph key={id}>{text}</AboutLeadParagraph>;
        }

        if (id === "rebrand") {
          return <AboutRebrandParagraph key={id}>{text}</AboutRebrandParagraph>;
        }

        if (id === "family") {
          return <AboutFamilyParagraph key={id}>{text}</AboutFamilyParagraph>;
        }

        return null;
      })}
    </div>
  );
};
