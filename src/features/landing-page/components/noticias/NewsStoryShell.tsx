import type { ReactNode } from "react";

import { NEWS_STORY_SHELL_CLASS } from "./constants";

interface NewsStoryShellProps {
  storyId: string;
  href?: string;
  children: ReactNode;
}

export const NewsStoryShell = ({
  storyId,
  href,
  children,
}: NewsStoryShellProps): JSX.Element => {
  const labelledBy = `${storyId}-title`;

  if (href) {
    return (
      <a
        className={NEWS_STORY_SHELL_CLASS}
        href={href}
        aria-labelledby={labelledBy}
      >
        {children}
      </a>
    );
  }

  return (
    <article className={NEWS_STORY_SHELL_CLASS} aria-labelledby={labelledBy}>
      {children}
    </article>
  );
};
