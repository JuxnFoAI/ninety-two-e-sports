import inkMaskUrl from "@assets/marca/tinta-mascara.png";
import n2LogoUrl from "@assets/marca/ninety-two.png";

import { SCULPT_PHASES_S } from "../constants";
import { FRAGMENT_SHADER, VERTEX_SHADER } from "./sculptShader";
import {
  buildSignedDistanceField,
  SDF_SIZE,
  type SignedDistanceField,
} from "./signedDistanceField";

const LOGO_SCALE = 0.92;
const INK_SCALE = 0.86;
const INK_COLOR = [1, 1, 1] as const;
const BG_COLOR = [0, 0, 0] as const;
const ACCENT_COLOR = [21 / 255, 145 / 255, 220 / 255] as const;

/** Frames ignored before judging speed (shader compile, first upload). */
const WARMUP_FRAMES = 4;
const SAMPLE_FRAMES = 12;
/** Median frame time that triggers rendering at a lower resolution (s). */
const SLOW_FRAME_S = 1 / 30;

interface SculptState {
  time: number;
  k: number;
  zoom: number;
  fade: number;
}

const easeInOutSine = (x: number): number => -(Math.cos(Math.PI * x) - 1) / 2;

/** The landing carries a damped spring on scale. */
const sampleTimeline = (seconds: number): Omit<SculptState, "time"> => {
  const { fadeIn, hold, transform } = SCULPT_PHASES_S;
  if (seconds < hold) {
    return {
      k: 0,
      zoom: 1,
      fade: easeInOutSine(Math.min(seconds / fadeIn, 1)),
    };
  }
  if (seconds < hold + transform) {
    return {
      k: easeInOutSine((seconds - hold) / transform),
      zoom: 1,
      fade: 1,
    };
  }
  const x = seconds - hold - transform;
  return {
    k: 1,
    zoom: 1 + 0.035 * Math.exp(-x * 9) * Math.sin(x * 18 + Math.PI / 2),
    fade: 1,
  };
};

const loadImage = async (src: string): Promise<HTMLImageElement> => {
  const img = new Image();
  img.src = src;
  await img.decode();
  return img;
};

const compile = (
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
): WebGLShader => {
  const shader = gl.createShader(type);
  if (!shader) {
    throw new Error("Could not create shader");
  }
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "Shader error");
  }
  return shader;
};

const uploadField = (
  gl: WebGL2RenderingContext,
  unit: number,
  field: SignedDistanceField,
): WebGLTexture => {
  const texture = gl.createTexture();
  if (!texture) {
    throw new Error("Could not create texture");
  }
  gl.activeTexture(gl.TEXTURE0 + unit);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.R16F,
    SDF_SIZE,
    SDF_SIZE,
    0,
    gl.RED,
    gl.FLOAT,
    field.data,
  );
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  return texture;
};

interface SculptRenderer {
  render: (state: SculptState) => void;
  setPixelRatioCap: (cap: number) => void;
  dispose: () => void;
}

const createRenderer = (
  canvas: HTMLCanvasElement,
  logo: SignedDistanceField,
  ink: SignedDistanceField,
  maxPixelRatio: number,
): SculptRenderer => {
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    powerPreference: "high-performance",
  });
  if (!gl || gl.isContextLost()) {
    throw new Error("WebGL2 unavailable");
  }

  const program = gl.createProgram();
  if (!program) {
    throw new Error("Could not create program");
  }
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
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

  const textures = [uploadField(gl, 0, logo), uploadField(gl, 1, ink)];

  const u = (name: string) => gl.getUniformLocation(program, name);
  const loc = {
    res: u("uRes"),
    time: u("uTime"),
    k: u("uK"),
    zoom: u("uZoom"),
    fade: u("uFade"),
  };
  gl.uniform1i(u("uLogoSdf"), 0);
  gl.uniform1i(u("uInkSdf"), 1);
  gl.uniform1f(u("uLogoScale"), logo.span);
  gl.uniform1f(u("uInkScale"), ink.span);
  gl.uniform3fv(u("uInk"), INK_COLOR);
  gl.uniform3fv(u("uBg"), BG_COLOR);
  gl.uniform3fv(u("uAccent"), ACCENT_COLOR);

  let pixelRatioCap = maxPixelRatio;

  const resize = (): void => {
    const dpr = Math.min(window.devicePixelRatio || 1, pixelRatioCap);
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
  };

  return {
    render: (state) => {
      resize();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(loc.res, canvas.width, canvas.height);
      gl.uniform1f(loc.time, state.time);
      gl.uniform1f(loc.k, state.k);
      gl.uniform1f(loc.zoom, state.zoom);
      gl.uniform1f(loc.fade, state.fade);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
    setPixelRatioCap: (cap) => {
      pixelRatioCap = cap;
    },
    // Resources are freed but the context is kept: StrictMode remounts reuse
    // the same canvas, and a lost context cannot be recovered on it.
    dispose: () => {
      textures.forEach((texture) => gl.deleteTexture(texture));
      gl.deleteBuffer(buffer);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.deleteProgram(program);
    },
  };
};

interface PlaySculptIntroOptions {
  canvas: HTMLCanvasElement;
  maxPixelRatio: number;
  onComplete: () => void;
  onError: (error: unknown) => void;
}

/**
 * Plays the ink-to-logo sculpt once and leaves the final frame on the
 * canvas. Returns a cleanup that stops it at any point.
 */
export const playSculptIntro = ({
  canvas,
  maxPixelRatio,
  onComplete,
  onError,
}: PlaySculptIntroOptions): (() => void) => {
  const { hold, transform, rest } = SCULPT_PHASES_S;
  const totalSeconds = hold + transform + rest;
  let cancelled = false;
  let frameId = 0;
  let renderer: SculptRenderer | null = null;

  const start = async (): Promise<void> => {
    const [logoImg, inkImg] = await Promise.all([
      loadImage(n2LogoUrl),
      loadImage(inkMaskUrl),
    ]);
    if (cancelled) {
      return;
    }
    const active = createRenderer(
      canvas,
      buildSignedDistanceField(logoImg, LOGO_SCALE),
      buildSignedDistanceField(inkImg, INK_SCALE),
      maxPixelRatio,
    );
    renderer = active;

    let elapsed = 0;
    let frames = 0;
    const frameTimes: number[] = [];
    let last = performance.now();

    const tick = (now: number): void => {
      const rawDt = (now - last) / 1000;
      const dt = Math.min(rawDt, 0.05);
      last = now;
      elapsed = Math.min(elapsed + dt, totalSeconds);
      frames += 1;
      if (frames > WARMUP_FRAMES && frameTimes.length < SAMPLE_FRAMES) {
        frameTimes.push(rawDt);
        if (frameTimes.length === SAMPLE_FRAMES) {
          frameTimes.sort((a, b) => a - b);
          if (frameTimes[SAMPLE_FRAMES >> 1] > SLOW_FRAME_S) {
            active.setPixelRatioCap(1);
          }
        }
      }

      active.render({ time: elapsed, ...sampleTimeline(elapsed) });

      if (elapsed >= totalSeconds) {
        onComplete();
        return;
      }
      frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
  };

  start().catch((error: unknown) => {
    if (!cancelled) {
      onError(error);
    }
  });

  return () => {
    cancelled = true;
    cancelAnimationFrame(frameId);
    renderer?.dispose();
    renderer = null;
  };
};
