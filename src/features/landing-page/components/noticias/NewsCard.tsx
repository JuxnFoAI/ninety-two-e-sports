import type { NewsArticle } from "../../types/news";
import { NewsCompanionGallery } from "./NewsCompanionGallery";
import { NewsStoryContent } from "./NewsStoryContent";
import { NewsStoryShell } from "./NewsStoryShell";
import { getNewsStoryGridModifier } from "./newsStoryLayout";
import { PilotPortrait } from "./PilotPortrait";
import "./newsStory.css";

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

export const NewsCard = ({ article, index }: NewsCardProps): JSX.Element => {
  const {
    id,
    image,
    imageAlt,
    portraitFocus,
    portraitScale,
    companionImages,
    href,
  } = article;
  const gridModifier = getNewsStoryGridModifier(index);
  const companions = companionImages ?? [];

  return (
    <NewsStoryShell storyId={id} href={href}>
      <div className={`news-story-grid ${gridModifier}`.trim()}>
        <PilotPortrait
          image={image}
          imageAlt={imageAlt}
          focus={portraitFocus}
          scale={portraitScale}
        />
        <NewsStoryContent article={article} />
        <NewsCompanionGallery companions={companions} />
      </div>
    </NewsStoryShell>
  );
};
