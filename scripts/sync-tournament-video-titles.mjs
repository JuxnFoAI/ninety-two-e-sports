/**
 * Syncs `title` fields in tournaments.ts with live YouTube oEmbed titles.
 * Usage: npm run tournaments:sync-titles
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TOURNAMENTS_FILE = join(
  __dirname,
  "../src/features/landing-page/data/tournaments.ts",
);

const fetchYoutubeTitle = async (videoId) => {
  const endpoint = new URL("https://www.youtube.com/oembed");
  endpoint.searchParams.set(
    "url",
    `https://www.youtube.com/watch?v=${videoId}`,
  );
  endpoint.searchParams.set("format", "json");

  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`oEmbed failed for "${videoId}" (${response.status})`);
  }

  const { title } = await response.json();
  return title;
};

const main = async () => {
  const source = readFileSync(TOURNAMENTS_FILE, "utf8");
  const videoIds = [...source.matchAll(/youtubeId:\s*'([^']+)'/g)].map(
    (match) => match[1],
  );

  if (videoIds.length === 0) {
    throw new Error("No youtubeId entries found in tournaments.ts");
  }

  const titles = await Promise.all(videoIds.map((id) => fetchYoutubeTitle(id)));

  let titleIndex = 0;
  const titleFieldPattern =
    /title:\s*(?:'(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"),/g;
  const updated = source.replace(titleFieldPattern, (match) => {
    if (titleIndex >= titles.length) {
      return match;
    }

    const next = `title: ${JSON.stringify(titles[titleIndex])},`;
    titleIndex += 1;
    return next;
  });

  if (titleIndex !== titles.length) {
    throw new Error(
      `Expected ${titles.length} title fields, updated ${titleIndex}. Check tournaments.ts format.`,
    );
  }

  writeFileSync(TOURNAMENTS_FILE, updated, "utf8");

  for (const [id, title] of videoIds.map((id, index) => [id, titles[index]])) {
    console.log(`${id}\n  → ${title}\n`);
  }

  console.log(`Updated ${titles.length} titles in tournaments.ts`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
