import { useEffect } from "react";

import { formatPageTitle } from "@/shared/lib/pageTitle";

/** Sets `document.title` for the active route. */
export const usePageTitle = (section?: string): void => {
  const title = formatPageTitle(section);

  useEffect(() => {
    document.title = title;
  }, [title]);
};
