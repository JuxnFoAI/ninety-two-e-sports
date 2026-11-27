export const VERTEX_SHADER = /* glsl */ `#version 300 es
in vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

/*
 * Signed-field convention: d < 0 is ink, d > 0 is empty.
 * Every mode blends the marble field into the logo SDF, so k = 1 always
 * lands on the exact logo silhouette.
 */
export const FRAGMENT_SHADER = /* glsl */ `#version 300 es
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform float uK;
uniform float uZoom;
uniform float uSettle;
uniform int uMode;
uniform float uFade;
uniform sampler2D uSdf;
uniform float uLogoScale;
uniform sampler2D uInkSdf;
uniform float uInkScale;
uniform vec3 uInk;
uniform vec3 uBg;
uniform vec3 uAccent;

out vec4 outColor;

const float PI = 3.14159265;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = dot(hash2(i), f);
  float b = dot(hash2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
  float c = dot(hash2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0));
  float d = dot(hash2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float s = 0.0;
  float a = 0.5;
  mat2 r = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 4; i++) {
    s += a * noise(p);
    p = r * p;
    a *= 0.5;
  }
  return s;
}

vec2 rotate(vec2 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return vec2(c * p.x - s * p.y, s * p.x + c * p.y);
}

float sampleSdf(sampler2D tex, float scale, vec2 p) {
  vec2 uv = p / scale + 0.5;
  float d = texture(tex, clamp(vec2(uv.x, 1.0 - uv.y), 0.0, 1.0)).r;
  vec2 outside = max(abs(uv - 0.5) - 0.5, 0.0);
  return (d + length(outside)) * scale;
}

float logoSdf(vec2 p) {
  return sampleSdf(uSdf, uLogoScale, p);
}

float fbmSoft(vec2 p) {
  float s = 0.0;
  float a = 0.5;
  mat2 r = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 3; i++) {
    s += a * noise(p);
    p = r * p;
    a *= 0.45;
  }
  return s;
}

// Stream function made of two layers drifting in different directions, so
// the swirl pattern evolves instead of just sliding.
float stream(vec2 p, float t) {
  return fbmSoft(p + vec2(t * 0.22, -t * 0.15))
    + 0.5 * fbmSoft(p * 2.1 + vec2(-t * 0.18, t * 0.26) + 4.7);
}

// Curl of the stream function: divergence-free, so the ink swirls like a
// fluid without swelling or shrinking.
vec2 curl(vec2 p, float t) {
  const float e = 0.02;
  float dx = stream(p + vec2(e, 0.0), t) - stream(p - vec2(e, 0.0), t);
  float dy = stream(p + vec2(0.0, e), t) - stream(p - vec2(0.0, e), t);
  return vec2(dy, -dx) / (2.0 * e);
}

// The reference photo advected through the flow field. amp = 0 shows the
// still image; amp = 1 is the regular liquid motion.
float marbleSdf(vec2 p, float t, float amp, out vec2 flow) {
  vec2 v1 = curl(p * 1.3, t);
  vec2 q = p - v1 * 0.02 * amp;
  vec2 v2 = curl(q * 2.4 + 7.0, t * 1.3);
  q -= v2 * 0.005 * amp;
  flow = v1 * 0.35;
  return sampleSdf(uInkSdf, uInkScale, q);
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  p /= uZoom;
  float t = uTime;
  float k = clamp(uK, 0.0, 1.0);
  float d = 1.0;
  float glow = 0.0;
  vec2 flow;

  if (uMode == 0) {
    // CONDENSACION: ink loses turbulence and pools into the mark.
    float e = smoothstep(0.0, 1.0, k);
    float dm = marbleSdf(p, t, 1.0, flow);
    float dl = logoSdf(p + flow * 0.16 * (1.0 - e) * (1.0 - e));
    d = mix(dm, dl, e);
  } else if (uMode == 1) {
    // VORTICE: the marble spins into a whirlpool, the logo unwinds out of it.
    float e = k * k * (3.0 - 2.0 * k);
    float r = length(p);
    float twist = 6.0 * exp(-r * 3.6);
    float dm = marbleSdf(rotate(p, e * twist), t, 1.0, flow);
    float dl = logoSdf(rotate(p, -(1.0 - e) * twist));
    float w = smoothstep(0.25, 0.85, k);
    d = mix(dm, dl, w);
    glow = 0.55 * sin(PI * k) * exp(-abs(d) * 600.0) * exp(-r * 2.5);
  } else if (uMode == 2) {
    // RAYO: a diagonal strike along the bolt's axis crystallises the mark.
    vec2 dir = normalize(vec2(0.72, 1.0));
    float s = dot(p, dir);
    float e = k < 0.5 ? 4.0 * k * k * k : 1.0 - pow(-2.0 * k + 2.0, 3.0) / 2.0;
    float front = mix(-0.85, 0.85, e) + 0.07 * fbm(p * 7.0 + t * 0.8);
    float band = exp(-pow((s - front) / 0.09, 2.0));
    vec2 jitter = vec2(fbm(p * 14.0 + t * 3.0), fbm(p * 14.0 - t * 3.0));
    vec2 pd = p + jitter * 0.05 * band;
    float dm = marbleSdf(pd, t, 1.0, flow);
    float dl = logoSdf(pd);
    float lk = 1.0 - smoothstep(front - 0.12, front + 0.03, s);
    d = mix(dm, dl, lk);
    glow = band * exp(-abs(d) * 70.0) * 1.1 * step(k, 0.999);
  } else if (uMode == 3) {
    // ONDA: a drop lands at the centre, the ripple pushes the ink out
    // and leaves the logo behind it.
    float e = smoothstep(0.0, 1.0, k);
    float r = length(p);
    float front = e * 1.05;
    float ring = exp(-abs(r - front) * 14.0);
    vec2 n = p / max(r, 1e-4);
    vec2 ripple = n * sin((r - front) * 55.0) * 0.012 * ring * (1.0 - k);
    float push = 0.12 * e * exp(-max(r - front, 0.0) * 5.0);
    float dm = marbleSdf(p - n * push + ripple, t, 1.0, flow);
    float dl = logoSdf(p + ripple);
    float edgeNoise = 0.06 * fbm(vec2(atan(p.y, p.x) * 3.0, t * 0.5));
    float lk = 1.0 - smoothstep(front - 0.14, front + 0.01, r + edgeNoise);
    d = mix(dm, dl, lk);
    glow = 0.45 * exp(-abs(r + edgeNoise - front) * 60.0) * sin(PI * k)
      * (1.0 - smoothstep(0.6, 0.95, r));
  } else {
    // ESCULPIDO: the logo acts as a chisel. The marble is carved to the
    // silhouette, a blue contour traces it, and then the ink sets solid.
    // The ink never stops: the flow gains energy while it is being carved
    // and only settles in the last frames so the mark lands clean.
    float carve = mix(0.55, 0.0, smoothstep(0.0, 0.55, k));
    float fill = mix(0.0, 0.06, smoothstep(0.5, 0.97, k));
    float amp = (1.0 + 0.7 * sin(PI * smoothstep(0.0, 0.8, k)))
      * (1.0 - smoothstep(0.78, 1.0, k));
    float dm = marbleSdf(p, t, amp, flow);
    float dl = logoSdf(p + flow * 0.05 * (1.0 - smoothstep(0.4, 0.9, k)));
    d = max(dl - carve, dm - fill);
    float stroke = sin(PI * smoothstep(0.2, 0.9, k));
    glow = stroke * exp(-abs(dl) * 260.0) * 0.9;
  }

  // Landing accent: a quick light sweep across the finished mark.
  if (uSettle > 0.0) {
    float sweep = (p.x + p.y * 0.6) - mix(-1.0, 1.0, uSettle);
    float inside = 1.0 - smoothstep(-0.002, 0.002, d);
    glow += inside * exp(-sweep * sweep * 220.0) * 0.55;
  }

  float aa = max(fwidth(d), 1e-5) * 0.8;
  float ink = (1.0 - smoothstep(-aa, aa, d)) * uFade;

  vec3 col = mix(uBg, uInk, ink);
  col = mix(col, uAccent, clamp(glow * uFade, 0.0, 1.0));

  float vignette = smoothstep(1.25, 0.25, length(p * vec2(0.85, 1.0)));
  col = mix(col, col * 0.82 + uBg * 0.18, 1.0 - vignette);
  float grain = fract(sin(dot(gl_FragCoord.xy + t * 61.0, vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) * 0.025;

  outColor = vec4(col, 1.0);
}
`;
