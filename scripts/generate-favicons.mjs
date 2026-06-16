/**
 * Generates favicons and web manifest from the brand logo.
 * Usage: npm run icons:generate
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const sourceLogo = join(root, "assets/marca/ninety-two.png");
const publicDir = join(root, "public");
const iconsDir = join(publicDir, "icons");

const { version } = JSON.parse(
  await readFile(join(root, "package.json"), "utf8"),
);

const ICON_SPECS = [
  { name: "favicon-16x16.png", size: 16 },
  { name: "favicon-32x32.png", size: 32 },
  { name: "android-chrome-192x192.png", size: 192 },
  { name: "android-chrome-512x512.png", size: 512 },
];

const APPLE_TOUCH_ICON = { name: "apple-touch-icon.png", size: 180 };

const BLACK_BACKGROUND = { r: 0, g: 0, b: 0, alpha: 1 };
const CONTENT_PADDING_RATIO = 0.04;

const getContentBounds = async (input) => {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let minX = info.width;
  let minY = info.height;
  let maxX = 0;
  let maxY = 0;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = (y * info.width + x) * info.channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      if (a > 10 && (r > 20 || g > 20 || b > 20)) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }

  if (maxX < minX || maxY < minY) {
    return { left: 0, top: 0, width: info.width, height: info.height };
  }

  const padX = Math.round((maxX - minX + 1) * CONTENT_PADDING_RATIO);
  const padY = Math.round((maxY - minY + 1) * CONTENT_PADDING_RATIO);
  const left = Math.max(0, minX - padX);
  const top = Math.max(0, minY - padY);
  const right = Math.min(info.width - 1, maxX + padX);
  const bottom = Math.min(info.height - 1, maxY + padY);

  return {
    left,
    top,
    width: right - left + 1,
    height: bottom - top + 1,
  };
};

const logoBounds = await getContentBounds(sourceLogo);

const renderIcon = async (size, outputPath) => {
  await sharp(sourceLogo)
    .extract(logoBounds)
    .resize(size, size, {
      fit: "cover",
      background: BLACK_BACKGROUND,
    })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);
};

await mkdir(iconsDir, { recursive: true });

for (const { name, size } of ICON_SPECS) {
  await renderIcon(size, join(iconsDir, name));
}

const favicon32 = await readFile(join(iconsDir, "favicon-32x32.png"));
await writeFile(join(publicDir, "favicon.png"), favicon32);
await renderIcon(APPLE_TOUCH_ICON.size, join(publicDir, APPLE_TOUCH_ICON.name));

const manifest = {
  name: "Ninety Two E-Sports",
  short_name: "N2 E-Sports",
  description:
    "Ninety Two E-Sports — organización de simracing. Equipos, noticias, torneos y patrocinadores.",
  start_url: "/",
  display: "browser",
  background_color: "#000000",
  theme_color: "#000000",
  icons: [
    {
      src: `/icons/android-chrome-192x192.png?v=${version}`,
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: `/icons/android-chrome-512x512.png?v=${version}`,
      sizes: "512x512",
      type: "image/png",
    },
  ],
};

await writeFile(
  join(publicDir, "site.webmanifest"),
  `${JSON.stringify(manifest, null, 2)}\n`,
  "utf8",
);

console.log(`Favicons generated in public/ (app version ${version}).`);
