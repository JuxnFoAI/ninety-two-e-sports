import type { NewsArticle } from "../../types/news";
import { NewsCompanionGallery } from "./NewsCompanionGallery";
import { NewsStoryContent } from "./NewsStoryContent";
import { NewsStoryShell } from "./NewsStoryShell";
import { getNewsStoryGridClassName } from "./newsStoryLayout";
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
    layout = "default",
  } = article;
  const gridClassName = getNewsStoryGridClassName(index, layout);
  const companions = companionImages ?? [];

  return (
    <NewsStoryShell storyId={id} href={href}>
      <div className={gridClassName}>
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
