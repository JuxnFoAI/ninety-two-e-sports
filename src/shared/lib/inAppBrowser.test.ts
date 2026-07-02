import { describe, expect, it, vi } from "vitest";

import {
  isInAppBrowser,
  isInstagramBrowser,
  shouldForceMobileLayout,
} from "./inAppBrowser";

describe("inAppBrowser", () => {
  it("detects Instagram user agents", () => {
    vi.stubGlobal("navigator", {
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Instagram 312.0.0.0.0",
    });
    vi.stubGlobal("window", {
      innerWidth: 390,
      matchMedia: () => ({ matches: true }),
      visualViewport: { width: 390, height: 844 },
    });

    expect(isInstagramBrowser()).toBe(true);
    expect(isInAppBrowser()).toBe(true);
    expect(shouldForceMobileLayout()).toBe(true);
  });

  it("detects Android Instagram WebView tokens", () => {
    vi.stubGlobal("navigator", {
      userAgent:
        "Mozilla/5.0 (Linux; Android 15; wv) AppleWebKit/537.36 Chrome/147.0.0.0 Mobile Safari/537.36 Instagram 425.0.0.47.61 Android IABMV/1",
    });
    vi.stubGlobal("window", {
      innerWidth: 412,
      matchMedia: () => ({ matches: true }),
      visualViewport: { width: 412, height: 892 },
    });

    expect(isInstagramBrowser()).toBe(true);
    expect(isInAppBrowser()).toBe(true);
  });

  it("returns false for regular mobile Safari", () => {
    vi.stubGlobal("navigator", {
      userAgent:
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
    });
    vi.stubGlobal("window", {
      innerWidth: 390,
      matchMedia: () => ({ matches: true }),
      visualViewport: { width: 390, height: 844 },
    });

    expect(isInstagramBrowser()).toBe(false);
    expect(isInAppBrowser()).toBe(false);
    expect(shouldForceMobileLayout()).toBe(false);
  });
});
