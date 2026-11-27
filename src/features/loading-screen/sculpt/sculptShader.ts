export const VERTEX_SHADER = /* glsl */ `#version 300 es
in vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

/*
 * Signed-field convention: d < 0 is ink, d > 0 is empty.
 * The flowing ink lives only inside the logo silhouette, traced by a blue
 * contour; a diagonal sweep (uK 0 -> 1) sets it into the solid mark.
 */
export const FRAGMENT_SHADER = /* glsl */ `#version 300 es
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform float uK;
uniform float uZoom;
uniform float uFade;
uniform sampler2D uLogoSdf;
uniform float uLogoScale;
uniform sampler2D uInkSdf;
uniform float uInkScale;
uniform vec3 uInk;
uniform vec3 uBg;
uniform vec3 uAccent;

out vec4 outColor;

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

float sampleSdf(sampler2D tex, float scale, vec2 p) {
  vec2 uv = p / scale + 0.5;
  float d = texture(tex, clamp(vec2(uv.x, 1.0 - uv.y), 0.0, 1.0)).r;
  vec2 outside = max(abs(uv - 0.5) - 0.5, 0.0);
  return (d + length(outside)) * scale;
}

// Two layers drifting in different directions, so the swirl evolves
// instead of just sliding.
float stream(vec2 p, float t) {
  return fbmSoft(p + vec2(t * 0.22, -t * 0.15))
    + 0.5 * fbmSoft(p * 2.1 + vec2(-t * 0.18, t * 0.26) + 4.7);
}

// Divergence-free, so the ink swirls without swelling or shrinking.
vec2 curl(vec2 p, float t) {
  const float e = 0.02;
  float dx = stream(p + vec2(e, 0.0), t) - stream(p - vec2(e, 0.0), t);
  float dy = stream(p + vec2(0.0, e), t) - stream(p - vec2(0.0, e), t);
  return vec2(dy, -dx) / (2.0 * e);
}

float inkSdf(vec2 p, float t, float amp) {
  vec2 v1 = curl(p * 1.3, t);
  vec2 q = p - v1 * 0.02 * amp;
  vec2 v2 = curl(q * 2.4 + 7.0, t * 1.3);
  q -= v2 * 0.005 * amp;
  return sampleSdf(uInkSdf, uInkScale, q);
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / min(uRes.x, uRes.y);
  p /= uZoom;
  float k = clamp(uK, 0.0, 1.0);

  float dl = sampleSdf(uLogoSdf, uLogoScale, p);
  float dm = inkSdf(p, uTime, 1.7);

  // Diagonal front with a ragged liquid edge; behind it the logo is solid.
  float along = (p.x + p.y * 0.6) / 1.166;
  float front = mix(-0.75, 0.75, k);
  float edge = along - front + (noise(p * 9.0 + uTime * 0.8) * 0.035);
  float solid = 1.0 - smoothstep(-0.015, 0.015, edge);

  float d = mix(max(dl, dm), dl, solid);

  float aa = max(fwidth(d), 1e-5) * 0.8;
  float ink = 1.0 - smoothstep(-aa, aa, d);
  float laa = max(fwidth(dl), 1e-5) * 0.8;
  float inLogo = 1.0 - smoothstep(-laa, laa, dl);

  // A faint body and a blue contour keep the N2 readable while the ink
  // drifts in and out of it.
  ink = max(ink, inLogo * 0.1 * (1.0 - solid));
  float glow = exp(-abs(dl) * 260.0) * 0.7 * (1.0 - solid);
  glow += inLogo * exp(-edge * edge * 900.0) * 0.85 * step(0.0005, k) * step(k, 0.9995);

  ink *= uFade;
  vec3 col = mix(uBg, uInk, ink);
  col = mix(col, uAccent, clamp(glow * uFade, 0.0, 1.0));

  // Grain only on the ink, so the background stays the overlay's flat black.
  float grain = fract(sin(dot(gl_FragCoord.xy + uTime * 61.0, vec2(12.9898, 78.233))) * 43758.5453);
  col += (grain - 0.5) * 0.025 * ink;

  outColor = vec4(col, 1.0);
}
`;
