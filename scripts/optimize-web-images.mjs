import { readdir, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

/**
 * Caps raster assets at the size a phone can decode while scrolling.
 * A 3840×2160 frame becomes ~33MB of pixels in memory; a 1920px JPEG does not.
 * Logos (marca, patrocinadores) and files that already fit are left alone.
 * Safe to run again.
 */

const ROOT = process.cwd();

const FOLDERS = [
  { dir: "assets/noticias", maxEdge: 1600, quality: 82 },
  { dir: "assets/integrantes", maxEdge: 960, quality: 82 },
  { dir: "assets/lideres", maxEdge: 960, quality: 82 },
  { dir: "assets/Designs", maxEdge: 1920, quality: 84 },
  { dir: "assets/quienes-somos", maxEdge: 1400, quality: 82 },
  {
    dir: "assets/videos",
    maxEdge: 1280,
    quality: 78,
    include: /^fondo-n2-movil\./,
  },
];

const SKIP_BYTES = 450 * 1024;

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (/\.(jpe?g|png)$/i.test(entry.name)) {
      files.push(full);
    }
  }

  return files;
};

const extensionOf = (file) => path.extname(file).toLowerCase();

const containerMatches = (file, meta) => {
  const ext = extensionOf(file);
  if (ext === ".png") {
    return meta.format === "png";
  }

  return meta.format === "jpeg";
};

const alreadyFits = (file, meta, size, maxEdge) =>
  containerMatches(file, meta) &&
  (meta.width ?? 0) <= maxEdge &&
  (meta.height ?? 0) <= maxEdge &&
  size <= SKIP_BYTES;

const optimizeFile = async (file, { maxEdge, quality }) => {
  const before = await stat(file);
  const meta = await sharp(file).metadata();

  if (alreadyFits(file, meta, before.size, maxEdge)) {
    return { file, skipped: true, before: before.size, after: before.size };
  }

  const pipeline = sharp(file).rotate().resize({
    width: maxEdge,
    height: maxEdge,
    fit: "inside",
    withoutEnlargement: true,
  });

  const keepPng =
    extensionOf(file) === ".png" &&
    meta.hasAlpha === true &&
    !file.includes(`${path.sep}Designs${path.sep}`);
  const buffer = keepPng
    ? await pipeline.png({ compressionLevel: 9 }).toBuffer()
    : await pipeline
        .flatten({ background: "#000" })
        .jpeg({ quality, mozjpeg: true })
        .toBuffer();

  if (buffer.length >= before.size && containerMatches(file, meta)) {
    return { file, skipped: true, before: before.size, after: before.size };
  }

  const dest = keepPng ? file : file.replace(/\.(png|jpe?g)$/i, ".jpg");
  const temp = `${dest}.optimizing`;

  await writeFile(temp, buffer);
  await rename(temp, dest);

  if (dest !== file) {
    await unlink(file);
  }

  return {
    file: dest,
    skipped: false,
    before: before.size,
    after: buffer.length,
    converted: dest !== file,
  };
};

let saved = 0;
let changed = 0;

for (const folder of FOLDERS) {
  const absolute = path.join(ROOT, folder.dir);
  const files = await walk(absolute);

  for (const file of files) {
    if (folder.include && !folder.include.test(path.basename(file))) {
      continue;
    }

    const result = await optimizeFile(file, folder);
    if (result.skipped) {
      continue;
    }

    changed += 1;
    saved += result.before - result.after;
    const from = (result.before / 1024).toFixed(0);
    const to = (result.after / 1024).toFixed(0);
    console.log(
      `${path.relative(ROOT, result.file)}  ${from}KB → ${to}KB${result.converted ? "  (jpg)" : ""}`,
    );
  }
}

console.log(
  `\n${changed} archivos. Ahorro ${(saved / 1024 / 1024).toFixed(1)} MB.`,
);
