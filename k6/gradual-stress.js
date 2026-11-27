import exec from "k6/execution";
import http from "k6/http";
import { check, group, sleep } from "k6";
import { Counter, Gauge, Trend } from "k6/metrics";

/**
 * Prueba gradual de la web ya construida (npm run preview / npm run perf).
 *
 * Recorre /, /equipos, /fotos, /noticias y /torneos como un visitante nuevo:
 * HTML, JS, CSS, una muestra de imágenes y el vídeo de fondo.
 *
 * Para cambiar la presión, edita los `target` de GRADUAL (usuarios virtuales).
 * K6_PROFILE=smoke hace un recorrido corto para comprobar que el servidor responde.
 * BASE_URL por defecto es el preview local. Hace falta ALLOW_REMOTE=1 para otro host.
 */

const BASE_URL = (__ENV.BASE_URL || "http://127.0.0.1:4173").replace(/\/$/, "");
const PROFILE = __ENV.K6_PROFILE || "gradual";

const IS_LOCAL = /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/i.test(BASE_URL);
if (!IS_LOCAL && __ENV.ALLOW_REMOTE !== "1") {
  throw new Error(
    "Esta prueba apunta fuera de tu máquina. Usa el preview local o define ALLOW_REMOTE=1 si de verdad quieres medir otro host.",
  );
}

if (PROFILE !== "smoke" && PROFILE !== "gradual") {
  throw new Error(`K6_PROFILE desconocido: ${PROFILE}. Usa smoke o gradual.`);
}

const ROUTES = ["/", "/equipos", "/fotos", "/noticias", "/torneos"];

const GRADUAL = [
  { phase: "warmup", duration: "20s", target: 8 },
  { phase: "warmup", duration: "20s", target: 8 },
  { phase: "load", duration: "30s", target: 30 },
  { phase: "load", duration: "20s", target: 30 },
  { phase: "stress", duration: "30s", target: 80 },
  { phase: "stress", duration: "25s", target: 80 },
  { phase: "spike", duration: "15s", target: 140 },
  { phase: "spike", duration: "20s", target: 140 },
  { phase: "recover", duration: "20s", target: 0 },
];

const SMOKE = [
  { phase: "warmup", duration: "10s", target: 2 },
  { phase: "warmup", duration: "8s", target: 0 },
];

const PLAN = PROFILE === "smoke" ? SMOKE : GRADUAL;

const PHASE_LABEL = {
  warmup: "calentamiento",
  load: "carga",
  stress: "estrés",
  spike: "pico",
  recover: "recuperación",
};

const LATENCY_SLO = {
  warmup: "p(95)<800",
  load: "p(95)<1200",
  stress: "p(95)<2500",
};

const ERROR_SLO = {
  warmup: "rate<0.01",
  load: "rate<0.01",
  stress: "rate<0.02",
  spike: "rate<0.05",
  recover: "rate<0.05",
};

const documentBytes = new Trend("document_bytes", true);
const shellBytes = new Trend("shell_bytes", true);
const mediaBytes = new Trend("media_bytes", true);
const transferredBytes = new Counter("transferred_bytes");
const catalogImages = new Gauge("catalog_images");
const catalogVideoBytes = new Gauge("catalog_video_bytes");
const catalogShellBytes = new Gauge("catalog_shell_bytes");
const catalogLargestImage = new Gauge("catalog_largest_image_bytes");

const BOUNDARIES = [];
let elapsedBoundary = 0;
for (const step of PLAN) {
  elapsedBoundary += seconds(step.duration);
  BOUNDARIES.push({ until: elapsedBoundary, phase: step.phase });
}

function seconds(duration) {
  const match = /^(\d+)(ms|s|m)$/.exec(duration);
  if (!match) {
    throw new Error(`Duración inválida: ${duration}`);
  }
  const value = Number(match[1]);
  if (match[2] === "ms") return value / 1000;
  if (match[2] === "m") return value * 60;
  return value;
}

function buildThresholds() {
  const thresholds = { checks: ["rate>0.95"] };
  const phases = new Set(PLAN.map((step) => step.phase));

  for (const phase of phases) {
    thresholds[`http_req_duration{phase:${phase}}`] = [
      LATENCY_SLO[phase] || "p(95)<60000",
    ];
    thresholds[`http_req_failed{phase:${phase}}`] = [
      ERROR_SLO[phase] || "rate<1",
    ];
  }

  return thresholds;
}

export const options = {
  scenarios: {
    visitantes: {
      executor: "ramping-vus",
      exec: "visit",
      stages: PLAN.map(({ duration, target }) => ({ duration, target })),
      gracefulRampDown: "5s",
    },
  },
  thresholds: buildThresholds(),
  summaryTrendStats: ["avg", "med", "p(90)", "p(95)", "p(99)", "max"],
  setupTimeout: "120s",
};

function header(res, name) {
  const headers = (res && res.headers) || {};
  const wanted = name.toLowerCase();
  for (const key of Object.keys(headers)) {
    if (key.toLowerCase() === wanted) return headers[key];
  }
  return "";
}

function absolute(path) {
  if (/^https?:\/\//i.test(path)) return path;
  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function unique(values) {
  return [...new Set(values)];
}

function byteLength(res) {
  const raw = header(res, "Content-Length");
  if (raw !== "") {
    const declared = Number(raw);
    if (Number.isFinite(declared) && declared >= 0) return declared;
  }
  return res && res.body ? res.body.length : 0;
}

function assetPaths(source, extensions) {
  const rooted = new RegExp(
    `(?:\\.?\\/)?assets\\/[A-Za-z0-9._~-]+\\.(?:${extensions})`,
    "g",
  );
  const relative = new RegExp(
    `\\.\\/[A-Za-z0-9._~-]+\\.(?:${extensions})`,
    "g",
  );
  return unique(
    [
      ...collectMatches(source, rooted),
      ...collectMatches(source, relative),
    ].map((token) => {
      if (token.startsWith("./")) return `/assets/${token.slice(2)}`;
      if (token.startsWith("/")) return token;
      return `/${token}`;
    }),
  );
}

function collectMatches(source, pattern) {
  const found = [];
  const flags = pattern.flags.includes("g")
    ? pattern.flags
    : `${pattern.flags}g`;
  const expression = new RegExp(pattern.source, flags);
  let match = expression.exec(source);
  while (match) {
    found.push(match[0]);
    match = expression.exec(source);
  }
  return found;
}

function extractFromHtml(html) {
  const shell = [];
  const attributes = /(?:src|href)="([^"]+)"/g;
  let match = attributes.exec(html);
  while (match) {
    const raw = match[1];
    if (!/^https?:\/\//i.test(raw) && /\.(js|css)(\?|$)/i.test(raw)) {
      const [path, query] = raw.split("?");
      shell.push(query ? `${path}?${query}` : path);
    }
    match = attributes.exec(html);
  }
  return shell.map((path) => (path.startsWith("/") ? path : `/${path}`));
}

function phaseNow() {
  const startedMs = new Date(exec.scenario.startTime).getTime();
  const elapsed = Number.isFinite(startedMs)
    ? (Date.now() - startedMs) / 1000
    : 0;
  for (const boundary of BOUNDARIES) {
    if (elapsed < boundary.until) return boundary.phase;
  }
  return BOUNDARIES[BOUNDARIES.length - 1].phase;
}

function pick(items, count) {
  if (!items.length) return [];
  const start =
    (exec.vu.idInTest + exec.scenario.iterationInInstance) % items.length;
  const amount = Math.min(count, items.length);
  const picked = [];
  for (let index = 0; index < amount; index += 1) {
    picked.push(items[(start + index) % items.length]);
  }
  return picked;
}

function batchGet(paths, name, phase) {
  if (!paths.length) return [];
  return http.batch(
    paths.map((path) => ({
      method: "GET",
      url: absolute(path),
      params: {
        tags: { name, phase },
        responseType: "none",
        timeout: "30s",
      },
    })),
  );
}

export function setup() {
  const home = http.get(absolute("/"), {
    tags: { name: "setup" },
    timeout: "15s",
  });

  if (home.status !== 200 || !String(home.body || "").includes('id="root"')) {
    throw new Error(
      `No hay una build servida en ${BASE_URL} (status ${home.status}). Ejecuta npm run perf.`,
    );
  }

  const shell = unique(extractFromHtml(home.body || ""));
  const seenJs = new Set(shell.filter((path) => /\.js(\?|$)/i.test(path)));
  const queue = [...seenJs];
  const media = [];
  let shellWeight = 0;

  while (queue.length) {
    const jsPath = queue.shift();
    const res = http.get(absolute(jsPath), {
      tags: { name: "setup" },
      timeout: "30s",
    });
    shellWeight += byteLength(res);
    const body = String(res.body || "");

    for (const chunk of assetPaths(body, "js")) {
      if (!seenJs.has(chunk)) {
        seenJs.add(chunk);
        queue.push(chunk);
        shell.push(chunk);
      }
    }

    for (const css of assetPaths(body, "css")) {
      if (!shell.includes(css)) shell.push(css);
    }

    media.push(...assetPaths(body, "mp4|webm|jpe?g|png|webp|gif|svg|avif"));
  }

  for (const path of shell) {
    if (/\.css(\?|$)/i.test(path)) {
      const css = http.get(absolute(path), {
        tags: { name: "setup" },
        timeout: "15s",
      });
      shellWeight += byteLength(css);
    }
  }

  const videos = unique(media.filter((path) => /\.(mp4|webm)$/i.test(path)));
  const images = unique(media.filter((path) => !/\.(mp4|webm)$/i.test(path)));
  const video = videos[0] || null;
  let videoBytes = 0;
  let rangeSupported = false;

  if (video) {
    const probe = http.get(absolute(video), {
      headers: { Range: "bytes=0-1023" },
      tags: { name: "setup" },
      responseType: "none",
      timeout: "20s",
    });
    rangeSupported = probe.status === 206;
    const range = header(probe, "Content-Range");
    const total = /\/(\d+)\s*$/.exec(range);
    videoBytes = total ? Number(total[1]) : byteLength(probe);
  }

  let largestImage = 0;
  if (images.length) {
    const sampleHead = http.head(absolute(images[0]), {
      tags: { name: "setup" },
      timeout: "10s",
    });
    const headWorks = sampleHead.status === 200 && byteLength(sampleHead) > 0;
    if (headWorks) {
      largestImage = byteLength(sampleHead);
      for (const image of images.slice(1)) {
        const head = http.head(absolute(image), {
          tags: { name: "setup" },
          timeout: "10s",
        });
        largestImage = Math.max(largestImage, byteLength(head));
      }
    }
  }

  catalogImages.add(images.length);
  catalogVideoBytes.add(videoBytes);
  catalogShellBytes.add(shellWeight);
  catalogLargestImage.add(largestImage);

  console.log(
    `Catálogo en ${BASE_URL}: shell ${formatBytes(shellWeight)}, ${images.length} imágenes, vídeo ${video ? formatBytes(videoBytes) : "no"}, rangos ${rangeSupported ? "sí" : "no"}`,
  );

  return {
    shell: unique(shell),
    images,
    video,
    videoBytes,
    rangeSupported,
  };
}

export function visit(data) {
  const phase = phaseNow();
  const route =
    ROUTES[
      (exec.vu.idInTest + exec.scenario.iterationInInstance) % ROUTES.length
    ];

  group(`página ${route}`, () => {
    const page = http.get(absolute(route), {
      tags: { name: "document", phase, route },
      timeout: "15s",
    });
    const pageSize = byteLength(page);
    documentBytes.add(pageSize);
    transferredBytes.add(pageSize);
    check(page, {
      "documento 200": (res) => res.status === 200,
      "documento html": (res) =>
        header(res, "Content-Type").includes("text/html"),
      "documento con la app": (res) =>
        String(res.body || "").includes('id="root"'),
    });

    const shellResponses = batchGet(data.shell || [], "shell", phase);
    let shellTotal = 0;
    for (const res of shellResponses) {
      const size = byteLength(res);
      shellTotal += size;
      transferredBytes.add(size);
      check(res, { "shell 200": (response) => response.status === 200 });
    }
    if (shellTotal) shellBytes.add(shellTotal);

    const imageResponses = batchGet(pick(data.images || [], 6), "image", phase);
    let imageTotal = 0;
    for (const res of imageResponses) {
      const size = byteLength(res);
      imageTotal += size;
      transferredBytes.add(size);
      check(res, { "imagen 200": (response) => response.status === 200 });
    }
    if (imageTotal) mediaBytes.add(imageTotal);

    if (data.video && shouldFetchVideo(data, phase)) {
      const fullVideo =
        !data.rangeSupported ||
        ((phase === "stress" || phase === "spike") &&
          exec.vu.idInTest % 4 === 0);
      const res = http.get(absolute(data.video), {
        headers: fullVideo ? undefined : { Range: "bytes=0-262143" },
        tags: { name: fullVideo ? "video_full" : "video_start", phase },
        responseType: "none",
        timeout: "60s",
      });
      const size = byteLength(res);
      transferredBytes.add(size);
      check(res, {
        "vídeo responde": (response) =>
          response.status === 200 || response.status === 206,
      });
    }
  });

  sleep(phase === "stress" || phase === "spike" ? 0.25 : 1);
}

function shouldFetchVideo(data, phase) {
  if (data.rangeSupported) return true;
  return (
    exec.vu.idInTest % 4 === 0 && (phase === "stress" || phase === "spike")
  );
}

function formatBytes(bytes) {
  const value = Number(bytes) || 0;
  if (value < 1024) return `${Math.round(value)} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(1)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

function metricValues(data, name) {
  const metric = data.metrics[name];
  return metric ? metric.values : null;
}

function formatMs(value) {
  return Number.isFinite(value) ? `${Math.round(value)} ms` : "sin datos";
}

function formatRate(value) {
  return Number.isFinite(value) ? `${(value * 100).toFixed(2)}%` : "sin datos";
}

function failedChecks(groupNode, acc, prefix) {
  const label = prefix || "general";
  for (const item of groupNode.checks || []) {
    if (item.fails > 0) {
      acc.push(`${label} · ${item.name}: ${item.fails} fallos`);
    }
  }
  for (const child of groupNode.groups || []) {
    failedChecks(child, acc, child.name || label);
  }
  return acc;
}

function buildReport(data) {
  const requests = metricValues(data, "http_reqs");
  const failures = metricValues(data, "http_req_failed");
  const checksMetric = metricValues(data, "checks");
  const iterations = metricValues(data, "iterations");
  const vus = metricValues(data, "vus_max");
  const payload = metricValues(data, "transferred_bytes");
  const video = metricValues(data, "catalog_video_bytes");
  const shell = metricValues(data, "catalog_shell_bytes");
  const images = metricValues(data, "catalog_images");
  const largestImage = metricValues(data, "catalog_largest_image_bytes");
  const html = metricValues(data, "document_bytes");
  const shellPerVisit = metricValues(data, "shell_bytes");
  const mediaPerVisit = metricValues(data, "media_bytes");
  const largest = largestImage
    ? largestImage.value || largestImage.max || 0
    : 0;

  const lines = [
    "Prueba gradual k6 — Ninety Two E-Sports",
    `Destino: ${BASE_URL}`,
    `Perfil: ${PROFILE}`,
    "",
    `Usuarios virtuales máximos: ${vus ? Math.round(vus.max || vus.value || 0) : 0}`,
    `Iteraciones: ${iterations ? iterations.count : 0}`,
    `Peticiones: ${requests ? requests.count : 0} (${requests ? requests.rate.toFixed(1) : "0"}/s)`,
    `Datos transferidos (Content-Length): ${formatBytes(payload && payload.count)}`,
    `Errores HTTP: ${formatRate(failures && failures.rate)}`,
    `Checks: ${formatRate(checksMetric && checksMetric.rate)}`,
    "",
    "Latencia por fase (todas las peticiones de esa fase)",
  ];

  const phases = unique(PLAN.map((step) => step.phase));
  for (const phase of phases) {
    const duration = metricValues(data, `http_req_duration{phase:${phase}}`);
    const failed = metricValues(data, `http_req_failed{phase:${phase}}`);
    lines.push(
      `  ${PHASE_LABEL[phase] || phase}: media ${formatMs(duration && duration.avg)} · p95 ${formatMs(duration && duration["p(95)"])} · máximo ${formatMs(duration && duration.max)} · errores ${formatRate(failed && failed.rate)}`,
    );
  }

  lines.push(
    "",
    "Peso que descarga un visitante",
    `  HTML medio: ${formatBytes(html && html.avg)}`,
    `  JS + CSS por visita: ${formatBytes(shellPerVisit && shellPerVisit.avg)} (catálogo ${formatBytes(shell && (shell.value || shell.max))})`,
    `  Muestra de 6 imágenes por visita: ${formatBytes(mediaPerVisit && mediaPerVisit.avg)}`,
    `  Imagen más pesada del catálogo: ${largest > 0 ? formatBytes(largest) : "no medida"} entre ${images ? Math.round(images.value || images.max || 0) : 0}`,
    `  Vídeo de fondo: ${formatBytes(video && (video.value || video.max))}`,
    "",
    "Lectura",
  );

  const notes = [];
  const videoWeight = video ? video.value || video.max || 0 : 0;
  if (videoWeight > 8 * 1024 * 1024) {
    notes.push(
      `El vídeo de fondo pesa ${formatBytes(videoWeight)}. En escritorio se pide al entrar en cualquier página. Es el primer candidato a recortar, comprimir o no reproducir hasta que haga falta.`,
    );
  }

  if (largest > 250 * 1024) {
    notes.push(
      `Hay imágenes por encima de 250 KB (la mayor, ${formatBytes(largest)}). En un listado se piden varias a la vez.`,
    );
  }

  const stressFailed = metricValues(data, "http_req_failed{phase:stress}");
  const spikeFailed = metricValues(data, "http_req_failed{phase:spike}");
  const loadDuration = metricValues(data, "http_req_duration{phase:load}");
  const spikeDuration = metricValues(data, "http_req_duration{phase:spike}");
  if (
    (stressFailed && stressFailed.rate > 0.01) ||
    (spikeFailed && spikeFailed.rate > 0.01)
  ) {
    notes.push(
      "Aparecen errores HTTP al subir la concurrencia. El límite está en servir archivos, no en la interfaz.",
    );
  } else if (
    loadDuration &&
    spikeDuration &&
    loadDuration["p(95)"] > 0 &&
    spikeDuration["p(95)"] > loadDuration["p(95)"] * 3
  ) {
    notes.push(
      "El pico multiplica la latencia de la carga normal. Ahí el servidor local empieza a quedarse corto.",
    );
  } else if (PROFILE === "gradual") {
    notes.push(
      "El preview local completó el recorrido sin una rotura clara. El margen está en lo que pesa cada visita: el vídeo y las fotos mandan sobre el HTML y el JS.",
    );
  }

  if (PROFILE === "smoke") {
    notes.push(
      "Perfil smoke: solo comprueba que la build responde. La prueba de estrés es npm run perf.",
    );
  }

  const broken = failedChecks(data.root_group || {}, []);
  if (broken.length) {
    notes.push(`Checks con fallos: ${broken.slice(0, 8).join(" | ")}`);
  }

  if (!notes.length) {
    notes.push("Sin señales automáticas. Revisa la latencia p95 de cada fase.");
  }

  for (const note of notes) {
    lines.push(`  - ${note}`);
  }

  lines.push(
    "",
    "Esto mide la entrega de archivos de la build en el preview local, que no comprime. En producción el JS y el CSS bajan con gzip; el vídeo y las fotos, casi igual. No mide animaciones, el canvas de carga ni el trabajo de React en el navegador.",
  );

  return lines.join("\n");
}

export function handleSummary(data) {
  const report = `${buildReport(data)}\n`;
  return {
    stdout: report,
    "k6/results/informe.txt": report,
    "k6/results/summary.json": JSON.stringify(data, null, 2),
  };
}
