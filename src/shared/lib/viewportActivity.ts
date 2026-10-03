const subscribers = new Set<() => void>();

let listening = false;
let timer = 0;

const notify = (): void => {
  window.clearTimeout(timer);
  timer = window.setTimeout(() => {
    for (const subscriber of subscribers) {
      subscriber();
    }
  }, 80);
};

const start = (): void => {
  if (listening) {
    return;
  }

  listening = true;
  window.addEventListener("scroll", notify, { passive: true });
  window.addEventListener("resize", notify);
  window.visualViewport?.addEventListener("resize", notify);
  window.visualViewport?.addEventListener("scroll", notify);
};

const stop = (): void => {
  if (!listening || subscribers.size > 0) {
    return;
  }

  listening = false;
  window.clearTimeout(timer);
  window.removeEventListener("scroll", notify);
  window.removeEventListener("resize", notify);
  window.visualViewport?.removeEventListener("resize", notify);
  window.visualViewport?.removeEventListener("scroll", notify);
};

/** One debounced scroll/resize listener for every reveal observer still waiting. */
export const subscribeViewportActivity = (
  subscriber: () => void,
): (() => void) => {
  subscribers.add(subscriber);
  start();

  return () => {
    subscribers.delete(subscriber);
    stop();
  };
};
