import type { NewsArticle } from "../../types/news";
import { NewsStoryContent } from "./NewsStoryContent";
import { NewsStoryShell } from "./NewsStoryShell";
import { getNewsStoryGridClassName } from "./newsStoryLayout";
import { PilotPortrait } from "./PilotPortrait";
import { useNewsStoryScrollReveal } from "./useNewsStoryScrollReveal";
import "./newsStory.css";

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

export const NewsCard = ({ article, index }: NewsCardProps): JSX.Element => {
  const { id, image, imageAlt, portraitFocus, portraitScale, href } = article;
  const { containerRef, photoStyle, titleStyle, bodyStyle } =
    useNewsStoryScrollReveal();

  return (
    <NewsStoryShell storyId={id} href={href}>
      <div ref={containerRef} className={getNewsStoryGridClassName(index)}>
        <PilotPortrait
          image={image}
          imageAlt={imageAlt}
          focus={portraitFocus}
          scale={portraitScale}
          revealStyle={photoStyle}
        />
        <NewsStoryContent
          article={article}
          titleRevealStyle={titleStyle}
          bodyRevealStyle={bodyStyle}
        />
      </div>
    </NewsStoryShell>
  );
};
