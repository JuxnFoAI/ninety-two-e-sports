import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";

const baseUrl = (process.env.BASE_URL || "http://127.0.0.1:4173").replace(
  /\/$/,
  "",
);
const isLocal = /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?$/i.test(baseUrl);

const k6Bin = () => {
  if (process.env.K6_BIN) return process.env.K6_BIN;
  const candidates = [
    "C:\\Program Files\\k6\\k6.exe",
    "C:\\Program Files (x86)\\k6\\k6.exe",
  ];
  for (const candidate of candidates) {
    if (existsSync(candidate)) return candidate;
  }
  return "k6";
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const previewIsUp = async () => {
  try {
    const response = await fetch(baseUrl, {
      signal: AbortSignal.timeout(2000),
    });
    if (!response.ok) return false;
    const html = await response.text();
    return html.includes('id="root"');
  } catch {
    return false;
  }
};

const waitUntilUp = async (child) => {
  const deadline = Date.now() + 20000;
  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`vite preview terminó antes de abrir ${baseUrl}.`);
    }
    if (await previewIsUp()) return;
    await wait(300);
  }
  throw new Error(`vite preview no respondió en ${baseUrl}.`);
};

const exitCodeOf = (child) =>
  new Promise((resolve, reject) => {
    child.on("error", reject);
    child.on("exit", (code) => resolve(code ?? 1));
  });

let preview;

const stopPreview = () => {
  if (!preview || preview.killed || preview.exitCode !== null) return;
  preview.kill();
};

process.on("SIGINT", () => {
  stopPreview();
  process.exit(130);
});

await mkdir("k6/results", { recursive: true });

if (!isLocal && process.env.ALLOW_REMOTE !== "1") {
  console.error(
    "BASE_URL no es localhost. Define ALLOW_REMOTE=1 solo si quieres medir ese host.",
  );
  process.exit(1);
}

if (isLocal) {
  if (!existsSync("dist/index.html")) {
    console.error(
      "No está dist/index.html. Ejecuta npm run perf para construir antes.",
    );
    process.exit(1);
  }

  if (await previewIsUp()) {
    console.error(
      `Ya hay una web en ${baseUrl}. Párala y vuelve a lanzar para medir la build actual.`,
    );
    process.exit(1);
  }

  preview = spawn(
    process.execPath,
    [
      "node_modules/vite/bin/vite.js",
      "preview",
      "--host",
      "127.0.0.1",
      "--port",
      "4173",
      "--strictPort",
      "--no-open",
    ],
    { stdio: ["ignore", "pipe", "pipe"] },
  );

  preview.stderr.on("data", (chunk) => {
    process.stderr.write(chunk);
  });

  try {
    await waitUntilUp(preview);
  } catch (error) {
    stopPreview();
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }

  console.log(`Preview listo en ${baseUrl}`);
}

const profile = process.env.K6_PROFILE || "gradual";
console.log(
  profile === "smoke"
    ? "k6 en perfil smoke (recorrido corto)."
    : "k6 en perfil gradual: calentamiento, carga, estrés, pico y bajada. Tarda unos 3 minutos.",
);

let code = 1;
try {
  const k6 = spawn(k6Bin(), ["run", "k6/gradual-stress.js"], {
    stdio: "inherit",
    env: { ...process.env, BASE_URL: baseUrl, K6_PROFILE: profile },
  });
  code = await exitCodeOf(k6);
} catch (error) {
  const missing =
    error &&
    typeof error === "object" &&
    "code" in error &&
    error.code === "ENOENT";
  console.error(
    missing
      ? "No está el ejecutable de k6. Instálalo con: winget install GrafanaLabs.k6"
      : error instanceof Error
        ? error.message
        : error,
  );
  code = 1;
} finally {
  stopPreview();
}

if (code === 0) {
  console.log("Informe: k6/results/informe.txt");
} else if (code === 99) {
  console.log(
    "k6 superó algún umbral. El informe sigue en k6/results/informe.txt",
  );
}

process.exit(code);
