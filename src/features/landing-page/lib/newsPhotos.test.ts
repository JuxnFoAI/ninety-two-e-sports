import { describe, expect, it } from "vitest";

import type { NewsArticle } from "../types/news";
import { getNewsPhotos } from "./newsPhotos";

const article = (
  id: string,
  extras: Partial<Pick<NewsArticle, "image" | "imageAlt">> = {},
): NewsArticle => ({
  id,
  title: `Titular ${id}`,
  excerpt: "Extracto",
  ...extras,
});

describe("getNewsPhotos", () => {
  it("keeps the photo and falls back to the title when alt text is missing", () => {
    expect(
      getNewsPhotos([
        article("con-alt", { image: "/a.jpg", imageAlt: "Alt A" }),
        article("sin-foto"),
        article("sin-alt", { image: "/c.jpg" }),
      ]),
    ).toEqual([
      { id: "con-alt", image: "/a.jpg", imageAlt: "Alt A" },
      { id: "sin-alt", image: "/c.jpg", imageAlt: "Titular sin-alt" },
    ]);
  });
});
