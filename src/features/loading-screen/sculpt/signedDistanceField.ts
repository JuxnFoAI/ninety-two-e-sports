export const SDF_SIZE = 512;

const INF = 1e20;

/** Share of the texture the shape's longest side occupies. */
const SHAPE_FILL = 0.84;

export interface SignedDistanceField {
  /** Distances in texture units: negative inside the shape. */
  data: Float32Array;
  /** Texture width in shader units, so the shape spans `scale` units. */
  span: number;
}

interface Bounds {
  x: number;
  y: number;
  w: number;
  h: number;
}

const alphaBounds = (img: HTMLImageElement): Bounds => {
  const canvas = document.createElement("canvas");
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    throw new Error("2D canvas unavailable");
  }
  ctx.drawImage(img, 0, 0);
  const { data, width, height } = ctx.getImageData(
    0,
    0,
    canvas.width,
    canvas.height,
  );
  let minX = width;
  let minY = height;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 127) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }
  return { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };
};

// Felzenszwalb & Huttenlocher exact squared Euclidean distance transform.
const edt1d = (
  f: Float64Array,
  n: number,
  d: Float64Array,
  v: Int32Array,
  z: Float64Array,
): void => {
  let k = 0;
  v[0] = 0;
  z[0] = -Infinity;
  z[1] = Infinity;
  for (let q = 1; q < n; q++) {
    let s: number;
    do {
      const r = v[k];
      s = (f[q] + q * q - (f[r] + r * r)) / (2 * q - 2 * r);
    } while (s <= z[k] && --k >= 0);
    k++;
    v[k] = q;
    z[k] = s;
    z[k + 1] = Infinity;
  }
  k = 0;
  for (let q = 0; q < n; q++) {
    while (z[k + 1] < q) k++;
    const r = v[k];
    d[q] = (q - r) * (q - r) + f[r];
  }
};

const edt2d = (grid: Float64Array, size: number): void => {
  const f = new Float64Array(size);
  const d = new Float64Array(size);
  const v = new Int32Array(size);
  const z = new Float64Array(size + 1);
  for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) f[y] = grid[y * size + x];
    edt1d(f, size, d, v, z);
    for (let y = 0; y < size; y++) grid[y * size + x] = d[y];
  }
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) f[x] = grid[y * size + x];
    edt1d(f, size, d, v, z);
    for (let x = 0; x < size; x++) grid[y * size + x] = d[x];
  }
};

/** Builds a centred SDF from an image's alpha channel. */
export const buildSignedDistanceField = (
  img: HTMLImageElement,
  scale: number,
): SignedDistanceField => {
  const bounds = alphaBounds(img);
  const fit = (SDF_SIZE * SHAPE_FILL) / Math.max(bounds.w, bounds.h);
  const w = bounds.w * fit;
  const h = bounds.h * fit;

  const canvas = document.createElement("canvas");
  canvas.width = SDF_SIZE;
  canvas.height = SDF_SIZE;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    throw new Error("2D canvas unavailable");
  }
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(
    img,
    bounds.x,
    bounds.y,
    bounds.w,
    bounds.h,
    (SDF_SIZE - w) / 2,
    (SDF_SIZE - h) / 2,
    w,
    h,
  );
  const { data } = ctx.getImageData(0, 0, SDF_SIZE, SDF_SIZE);

  const count = SDF_SIZE * SDF_SIZE;
  const toInside = new Float64Array(count);
  const toOutside = new Float64Array(count);
  // Edge pixels seed a fractional distance from their coverage (TinySDF),
  // so the contour is sub-pixel accurate instead of stair-stepped.
  for (let i = 0; i < count; i++) {
    const a = data[i * 4 + 3] / 255;
    if (a >= 1) {
      toInside[i] = 0;
      toOutside[i] = INF;
    } else if (a <= 0) {
      toInside[i] = INF;
      toOutside[i] = 0;
    } else {
      toInside[i] = Math.max(0, 0.5 - a) ** 2;
      toOutside[i] = Math.max(0, a - 0.5) ** 2;
    }
  }
  edt2d(toInside, SDF_SIZE);
  edt2d(toOutside, SDF_SIZE);

  const field = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    field[i] = (Math.sqrt(toInside[i]) - Math.sqrt(toOutside[i])) / SDF_SIZE;
  }

  return { data: field, span: scale / SHAPE_FILL };
};
