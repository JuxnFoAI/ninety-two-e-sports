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

const renderIcon = async (size, outputPath) => {
  await sharp(sourceLogo)
    .resize(size, size, {
      fit: "contain",
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
