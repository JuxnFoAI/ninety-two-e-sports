import { FRAGMENT_SHADER, VERTEX_SHADER } from "./shader.js";

const LOGO_URL = new URL("../../assets/marca/ninety-two.png", import.meta.url)
  .href;
const INK_URL = new URL("./tinta-mascara.png", import.meta.url).href;
const SDF_SIZE = 512;
const LOGO_FILL = 0.84;
const LOGO_SCALE = 0.92;
const INK_SCALE = 0.86;
const MAX_DPR = 1.75;

// One-way: photo -> logo. The loop restarts through black, never by
// turning the logo back into ink.
const TIMELINE = {
  fadeIn: 0.2,
  hold: 0.65,
  transform: 1.45,
  rest: 0.7,
  fadeOut: 0.2,
};
const LOOP =
  TIMELINE.hold + TIMELINE.transform + TIMELINE.rest + TIMELINE.fadeOut;

const OPTIONS = [
  {
    title: "Condensación",
    intent:
      "La tinta pierde turbulencia y se acumula dentro de la silueta, como mercurio que encuentra su molde. Es la más elegante y sobria: ideal como intro de marca.",
    specs: {
      Duración: "3 s (1.45 s de transformación)",
      Curva: "ease-in-out (smoothstep)",
      Uso: "Loader · Intro de video",
    },
  },
  {
    title: "Vórtice",
    intent:
      "El mármol entra en un remolino y el logo se desenrosca desde el centro. Tiene anticipación y follow-through claros: transmite energía y competición.",
    specs: {
      Duración: "3 s (1.45 s de transformación)",
      Curva: "cubic in-out + giro radial",
      Uso: "Intro de stream · Redes",
    },
  },
  {
    title: "Rayo",
    intent:
      "Un frente eléctrico recorre la diagonal del rayo del logo y cristaliza la tinta a su paso. Conecta el efecto con el ADN del isotipo.",
    specs: {
      Duración: "3 s (1.45 s de transformación)",
      Curva: "cubic in-out",
      Uso: "Hero web · Overlays",
    },
  },
  {
    title: "Onda",
    intent:
      "Una gota cae en el centro y la onda expansiva empuja la tinta hacia fuera, dejando el N2 limpio detrás. Muy legible incluso en tamaños pequeños.",
    specs: {
      Duración: "3 s (1.45 s de transformación)",
      Curva: "ease-in-out + rebote de onda",
      Uso: "Transiciones · Reels",
    },
  },
  {
    title: "Esculpido",
    intent:
      "La imagen fluye como tinta viva desde el primer frame. El logo actúa como cincel: la recorta sin detener el movimiento, un contorno azul ondula con el líquido y la tinta solo se asienta al final, cuando fragua en el N2.",
    specs: {
      Duración: "3 s (1.45 s de transformación)",
      Curva: "dos fases solapadas",
      Uso: "Aperturas · Revelados",
    },
  },
];

const THEMES = {
  dark: { ink: [1, 1, 1], bg: [0, 0, 0] },
  light: { ink: [0.02, 0.02, 0.02], bg: [0.945, 0.945, 0.937] },
};
const ACCENT = [21 / 255, 145 / 255, 220 / 255];

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

let theme = THEMES.dark;

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

const alphaBounds = (img) => {
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);
  const { data } = ctx.getImageData(0, 0, img.width, img.height);
  let minX = img.width;
  let minY = img.height;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      if (data[(y * img.width + x) * 4 + 3] > 127) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }
  return { x: minX, y: minY, w: maxX - minX + 1, h: maxY - minY + 1 };
};

// Felzenszwalb & Huttenlocher exact Euclidean distance transform.
const edt1d = (f, n, d, v, z) => {
  let k = 0;
  v[0] = 0;
  z[0] = -Infinity;
  z[1] = Infinity;
  for (let q = 1; q < n; q++) {
    let s;
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

const edt2d = (grid, size) => {
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

const buildSdf = (img, scale) => {
  const bounds = alphaBounds(img);
  const fit = (SDF_SIZE * LOGO_FILL) / Math.max(bounds.w, bounds.h);
  const w = bounds.w * fit;
  const h = bounds.h * fit;

  const canvas = document.createElement("canvas");
  canvas.width = SDF_SIZE;
  canvas.height = SDF_SIZE;
  const ctx = canvas.getContext("2d");
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
  for (let i = 0; i < count; i++) {
    const inside = data[i * 4 + 3] > 127;
    toInside[i] = inside ? 0 : 1e20;
    toOutside[i] = inside ? 1e20 : 0;
  }
  edt2d(toInside, SDF_SIZE);
  edt2d(toOutside, SDF_SIZE);

  const sdf = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const px = Math.sqrt(toInside[i]) - Math.sqrt(toOutside[i]);
    sdf[i] = px / SDF_SIZE;
  }

  return { sdf, span: scale / LOGO_FILL };
};

const uploadSdf = (gl, unit, field) => {
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.R16F,
    SDF_SIZE,
    SDF_SIZE,
    0,
    gl.RED,
    gl.FLOAT,
    field.sdf,
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
};

const compile = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "Shader error");
  }
  return shader;
};

const createRenderer = (canvas, fields, mode) => {
  const gl = canvas.getContext("webgl2", { antialias: false, alpha: false });
  if (!gl) throw new Error("WebGL2 no disponible");

  const program = gl.createProgram();
  gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
  gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? "Link error");
  }
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );
  const aPos = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  uploadSdf(gl, 0, fields.logo);
  uploadSdf(gl, 1, fields.ink);

  const u = (name) => gl.getUniformLocation(program, name);
  const loc = {
    res: u("uRes"),
    time: u("uTime"),
    k: u("uK"),
    zoom: u("uZoom"),
    settle: u("uSettle"),
    fade: u("uFade"),
    ink: u("uInk"),
    bg: u("uBg"),
  };
  gl.uniform1i(u("uSdf"), 0);
  gl.uniform1i(u("uInkSdf"), 1);
  gl.uniform1i(u("uMode"), mode);
  gl.uniform1f(u("uLogoScale"), fields.logo.span);
  gl.uniform1f(u("uInkScale"), fields.ink.span);
  gl.uniform3fv(u("uAccent"), ACCENT);

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  };

  return (state) => {
    resize();
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(loc.res, canvas.width, canvas.height);
    gl.uniform1f(loc.time, state.time);
    gl.uniform1f(loc.k, state.k);
    gl.uniform1f(loc.zoom, state.zoom);
    gl.uniform1f(loc.settle, state.settle);
    gl.uniform1f(loc.fade, state.fade);
    gl.uniform3fv(loc.ink, theme.ink);
    gl.uniform3fv(loc.bg, theme.bg);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
};

const easeInOutSine = (x) => -(Math.cos(Math.PI * x) - 1) / 2;

// Maps a looping playhead to the animation state. The "rest" phase carries
// a damped spring on scale (overshoot + settle) and a single light sweep.
const sample = (playhead) => {
  const { fadeIn, hold, transform, rest, fadeOut } = TIMELINE;
  let k = 0;
  let zoom = 1;
  let settle = 0;
  let fade = 1;
  if (playhead < hold) {
    k = 0;
    fade = easeInOutSine(Math.min(playhead / fadeIn, 1));
  } else if (playhead < hold + transform) {
    k = (playhead - hold) / transform;
  } else if (playhead < hold + transform + rest) {
    const x = playhead - hold - transform;
    k = 1;
    zoom = 1 + 0.035 * Math.exp(-x * 9) * Math.sin(x * 18 + Math.PI / 2);
    settle = x > 0.08 && x < 0.5 ? (x - 0.08) / 0.42 : 0;
  } else {
    k = 1;
    fade = 1 - easeInOutSine((playhead - hold - transform - rest) / fadeOut);
  }
  return { k, zoom, settle, fade };
};

const mountCard = (template, option, index, fields, registry) => {
  const node = template.content.firstElementChild.cloneNode(true);
  node.querySelector(".card-index").textContent =
    `0${index + 1} / ${option.title.toUpperCase()}`;
  node.querySelector(".card-title").textContent =
    `${index + 1}. ${option.title}`;
  node.querySelector(".card-intent").textContent = option.intent;
  const specs = node.querySelector(".card-specs");
  for (const [term, value] of Object.entries(option.specs)) {
    const dt = document.createElement("dt");
    dt.textContent = term;
    const dd = document.createElement("dd");
    dd.textContent = value;
    specs.append(dt, dd);
  }

  const canvas = node.querySelector(".card-canvas");
  const playBtn = node.querySelector('[data-role="play"]');
  const scrub = node.querySelector(".card-scrub");
  const timeLabel = node.querySelector(".card-time");
  const stage = node.querySelector(".card-stage");

  document.getElementById("grid").append(node);
  const render = createRenderer(canvas, fields, index);

  const card = {
    playing: !prefersReducedMotion,
    playhead: prefersReducedMotion
      ? TIMELINE.hold + TIMELINE.transform + 0.6
      : 0,
    clock: 0,
    visible: true,
    update(dt) {
      if (this.playing) {
        this.playhead = (this.playhead + dt) % LOOP;
        this.clock += dt;
        scrub.value = String(Math.round((this.playhead / LOOP) * 1000));
      }
      timeLabel.textContent = `${this.playhead.toFixed(2)}s`;
      if (!this.visible) return;
      render({ time: this.clock, ...sample(this.playhead) });
    },
  };

  const setPlaying = (playing) => {
    card.playing = playing;
    playBtn.textContent = playing ? "Pausa" : "Reproducir";
  };
  setPlaying(card.playing);

  playBtn.addEventListener("click", () => setPlaying(!card.playing));
  scrub.addEventListener("input", () => {
    setPlaying(false);
    card.playhead = (Number(scrub.value) / 1000) * LOOP;
    card.clock = card.playhead;
  });

  const toggleFocus = (force) => {
    const focused = node.classList.toggle("is-focused", force);
    document.body.style.overflow = focused ? "hidden" : "";
  };
  stage.addEventListener("click", () => toggleFocus());
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") toggleFocus(false);
  });

  new IntersectionObserver(([entry]) => {
    card.visible = entry.isIntersecting;
  }).observe(canvas);

  card.focus = () => toggleFocus(true);
  card.freezeAt = (seconds) => {
    setPlaying(false);
    card.playhead = Math.min(Math.max(seconds, 0), LOOP - 0.001);
    card.clock = card.playhead;
    scrub.value = String(Math.round((card.playhead / LOOP) * 1000));
  };
  registry.push(card);
};

const start = async () => {
  const [logoImg, inkImg] = await Promise.all([
    loadImage(LOGO_URL),
    loadImage(INK_URL),
  ]);
  const fields = {
    logo: buildSdf(logoImg, LOGO_SCALE),
    ink: buildSdf(inkImg, INK_SCALE),
  };
  const template = document.getElementById("card-template");
  const cards = [];
  OPTIONS.forEach((option, index) =>
    mountCard(template, option, index, fields, cards),
  );

  document
    .querySelector('[data-action="theme"]')
    .addEventListener("click", (event) => {
      const next = document.body.dataset.theme === "dark" ? "light" : "dark";
      document.body.dataset.theme = next;
      theme = THEMES[next];
      event.currentTarget.textContent = `Tema: ${next === "dark" ? "oscuro" : "claro"}`;
    });

  document
    .querySelector('[data-action="sync"]')
    .addEventListener("click", () => {
      for (const card of cards) {
        card.playhead = 0;
        card.clock = 0;
      }
    });

  // ?focus=2&t=2.7 opens option 3 full screen, frozen at 2.7 s.
  const params = new URLSearchParams(location.search);
  const focusIndex = Number(params.get("focus"));
  if (params.has("focus") && cards[focusIndex]) cards[focusIndex].focus();
  if (params.has("t")) {
    for (const card of cards) card.freezeAt(Number(params.get("t")));
  }

  let last = performance.now();
  const frame = (now) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    for (const card of cards) card.update(dt);
    requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
};

start().catch((error) => {
  document.getElementById("grid").textContent =
    `No se pudo iniciar el laboratorio: ${error.message}`;
});
