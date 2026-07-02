import { initInAppBrowserClass, initInAppViewportMeta } from "./inAppBrowser";
import { initViewportHeight } from "./viewportHeight";

/** Runs once before React mounts to normalize in-app browser layout behavior. */
export const initDocumentEnvironment = (): void => {
  initInAppBrowserClass();
  initInAppViewportMeta();
  initViewportHeight();
};
