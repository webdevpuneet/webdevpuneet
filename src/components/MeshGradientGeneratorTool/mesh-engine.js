/* ─────────────────────────────────────────────────────────────
   Mesh gradient engine — shapes, motion and every export.

   A blob is { x, y, color, scale, op, blur, stretch, rot, mode }:
     x, y     centre, 0–1 of the canvas
     scale    size multiplier (radius = max(W,H) · spread · 0.5 · scale)
     stretch  width ÷ height of the ellipse (1 = circle)
     rot      rotation in degrees
     mode     mix-blend-mode ('normal', 'screen', 'multiply', 'overlay', …)
     op/blur  per-blob overrides of the global opacity / blur (null = global)

   Motion: one seeded, seamless loop. blobPose(blob, i, u, anim) gives the pose at
   loop phase u (0–1). The live preview, the SVG / CSS / React / Tailwind exports
   and the MP4 / WebM / GIF renders all sample this same function, so they match.
───────────────────────────────────────────────────────────── */

export const BLEND_MODES = [
  { value: 'normal',      label: 'Normal' },
  { value: 'screen',      label: 'Screen' },
  { value: 'multiply',    label: 'Multiply' },
  { value: 'overlay',     label: 'Overlay' },
  { value: 'soft-light',  label: 'Soft light' },
  { value: 'color-dodge', label: 'Color dodge' },
  { value: 'lighten',     label: 'Lighten' },
  { value: 'hard-light',  label: 'Hard light' },
];

export const DEFAULT_ANIM = { on: false, dur: 14, amount: 55, seed: 7 };

const TAU = Math.PI * 2;
const r1 = n => Math.round(n * 10) / 10;
const r2 = n => Math.round(n * 100) / 100;
const pct = n => `${r2(n * 100)}%`;

/* ── Blob geometry ── */
export function blobRadius(b, spread, W, H) {
  return Math.max(W, H) * spread * 0.5 * (b.scale ?? 1);
}
export function blobAlpha(b, opacity) { return (b.op ?? opacity) / 100; }
export function blobBlur(b, blur)     { return b.blur ?? blur; }
const stretchOf = b => b.stretch ?? 1;
const rotOf     = b => b.rot ?? 0;
const modeOf    = b => b.mode || 'normal';

/* ── Seeded motion ── */
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const _motionCache = new Map();
function motionParams(seed, i) {
  const key = `${seed}:${i}`;
  let m = _motionCache.get(key);
  if (m) return m;
  const rnd = mulberry32((Math.imul(seed | 0, 9973) + Math.imul(i + 1, 7919)) >>> 0);
  rnd(); rnd();
  // Whole-number frequencies keep every path a closed loop over one period
  m = {
    kx: rnd() < 0.6 ? 1 : 2, ky: rnd() < 0.6 ? 1 : 2,
    dir: rnd() < 0.5 ? 1 : -1,
    px: rnd() * TAU, py: rnd() * TAU, pr: rnd() * TAU, ps: rnd() * TAU,
    ax: 0.6 + rnd() * 0.4, ay: 0.6 + rnd() * 0.4,
    ar: 0.5 + rnd() * 0.5, as: 0.5 + rnd() * 0.5,
  };
  if (_motionCache.size > 500) _motionCache.clear();
  _motionCache.set(key, m);
  return m;
}

/** Pose of blob i at loop phase u (0–1). Without animation it is the blob's own pose. */
export function blobPose(b, i, u, anim) {
  if (!anim?.on || !anim.amount) return { x: b.x, y: b.y, rot: rotOf(b), sc: 1 };
  const m = motionParams(anim.seed, i);
  const A = anim.amount / 100;
  const t = u * TAU;
  return {
    x:   b.x + 0.2 * A * m.ax * Math.sin(m.dir * m.kx * t + m.px),
    y:   b.y + 0.2 * A * m.ay * Math.cos(m.ky * t + m.py),
    rot: rotOf(b) + 30 * A * m.ar * Math.sin(t + m.pr),
    sc:  1 + 0.14 * A * m.as * Math.sin(m.dir * t + m.ps),
  };
}

export const svgTransform = (p, W, H) =>
  `translate(${r1(p.x * W)} ${r1(p.y * H)}) rotate(${r1(p.rot)}) scale(${r2(p.sc)})`;

/* Keyframe samples per loop (CSS interpolates linearly between them; the blur hides the corners) */
const STEPS = 20;
function samples(b, i, anim) {
  return Array.from({ length: STEPS + 1 }, (_, k) => ({ k, pose: blobPose(b, i, k / STEPS, anim) }));
}

/* ── Grain ── */
const GRAIN_FILTER = `<feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/>`;
function grainDataUri(grain) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='${(grain / 100).toFixed(2)}'/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/* ── SVG ──
   phase:    loop phase drawn as the static pose (raster frames, still exports)
   animated: true adds a CSS animation inside the SVG (the SVG download / code tab) */
export function buildSvg(d, { phase = 0, animated = false } = {}) {
  const { blobs, bgColor, blur, spread, opacity, grain, W, H, anim } = d;
  const animate = animated && anim?.on && anim.amount > 0;
  const filters = blobs.map((b, i) =>
    `    <filter id="blur${i}" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="${blobBlur(b, blur)}"/></filter>`
  ).join('\n');
  const shapes = blobs.map((b, i) => {
    const r = blobRadius(b, spread, W, H);
    const s = stretchOf(b);
    const mode = modeOf(b);
    const pose = blobPose(b, i, animate ? 0 : phase, anim);
    const blend = mode !== 'normal' ? ` style="mix-blend-mode:${mode}"` : '';
    const cls = animate ? ` class="b${i}"` : '';
    return `  <g${cls} transform="${svgTransform(pose, W, H)}"><ellipse rx="${r1(r * s)}" ry="${r1(r)}" fill="${b.color}" opacity="${blobAlpha(b, opacity).toFixed(2)}" filter="url(#blur${i})"${blend}/></g>`;
  }).join('\n');
  let style = null;
  if (animate) {
    const rules = blobs.map((b, i) => {
      const frames = samples(b, i, anim).map(({ k, pose }) =>
        `      ${r1((k / STEPS) * 100)}% { transform: translate(${r1(pose.x * W)}px, ${r1(pose.y * H)}px) rotate(${r1(pose.rot)}deg) scale(${r2(pose.sc)}); }`
      ).join('\n');
      return `    .b${i} { animation: mesh-b${i} ${anim.dur}s linear infinite; }\n    @keyframes mesh-b${i} {\n${frames}\n    }`;
    }).join('\n');
    style = `  <style>\n${rules}\n    @media (prefers-reduced-motion: reduce) { g[class^="b"] { animation: none; } }\n  </style>`;
  }
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">`,
    style,
    `  <defs>`,
    filters,
    grain > 0 ? `    <filter id="grain">${GRAIN_FILTER}</filter>` : null,
    `  </defs>`,
    `  <rect width="${W}" height="${H}" fill="${bgColor}"/>`,
    shapes,
    grain > 0 ? `  <rect width="${W}" height="${H}" filter="url(#grain)" opacity="${(grain / 100).toFixed(2)}"/>` : null,
    `</svg>`,
  ].filter(Boolean).join('\n');
}

/* ── HTML + CSS (blob elements, so shapes can rotate, blend and move) ──
   Sizes are % of the container and blur is in cqw, so the mesh scales with any box. */
function blobCssProps(b, i, d) {
  const { spread, opacity, blur, W, H } = d;
  const r = blobRadius(b, spread, W, H);
  const s = stretchOf(b);
  const props = [
    `left: ${pct(b.x)}`,
    `top: ${pct(b.y)}`,
    `width: ${pct((2 * r * s) / W)}`,
    `aspect-ratio: ${r2(s)}`,
    `background: ${b.color}`,
    `opacity: ${blobAlpha(b, opacity).toFixed(2)}`,
    `filter: blur(${r2((blobBlur(b, blur) / W) * 100)}cqw)`,
  ];
  if (rotOf(b)) props.push(`rotate: ${r1(rotOf(b))}deg`);
  if (modeOf(b) !== 'normal') props.push(`mix-blend-mode: ${modeOf(b)}`);
  return props;
}

function keyframesCss(d, name = 'mesh-drift') {
  const { blobs, anim } = d;
  return blobs.map((b, i) => {
    const frames = samples(b, i, anim).map(({ k, pose }) =>
      `  ${r1((k / STEPS) * 100)}% { left: ${pct(pose.x)}; top: ${pct(pose.y)}; rotate: ${r1(pose.rot)}deg; scale: ${r2(pose.sc)}; }`
    ).join('\n');
    return `@keyframes ${name}-${i + 1} {\n${frames}\n}`;
  }).join('\n');
}

export function cssParts(d) {
  const { blobs, bgColor, grain, anim } = d;
  const animate = anim?.on && anim.amount > 0;
  const html = `<div class="mesh-bg">\n${blobs.map((_, i) => `  <span class="mesh-blob b${i + 1}"></span>`).join('\n')}\n</div>`;
  const lines = [
    `.mesh-bg {`,
    `  position: relative;`,
    `  overflow: hidden;`,
    `  isolation: isolate;`,
    `  container-type: inline-size;`,
    `  background-color: ${bgColor};`,
    `}`,
    `.mesh-blob {`,
    `  position: absolute;`,
    `  z-index: -1;`,
    `  translate: -50% -50%;`,
    `  border-radius: 50%;`,
    `  pointer-events: none;`,
    `}`,
  ];
  blobs.forEach((b, i) => {
    const props = blobCssProps(b, i, d);
    if (animate) props.push(`animation: mesh-drift-${i + 1} ${anim.dur}s linear infinite`);
    lines.push(`.b${i + 1} { ${props.join('; ')}; }`);
  });
  if (grain > 0) {
    lines.push(`.mesh-bg::after {`, `  content: '';`, `  position: absolute;`, `  inset: 0;`, `  z-index: -1;`, `  pointer-events: none;`, `  background-image: ${grainDataUri(grain)};`, `}`);
  }
  if (animate) {
    lines.push(keyframesCss(d));
    lines.push(`@media (prefers-reduced-motion: reduce) {\n  .mesh-blob { animation: none; }\n}`);
  }
  return { html, css: lines.join('\n') };
}

export function buildCss(d) {
  const { html, css } = cssParts(d);
  return `<!-- HTML -->\n${html}\n\n/* CSS */\n${css}`;
}

export function buildReact(d) {
  const { css } = cssParts(d);
  const safeCss = css.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
  const spans = d.blobs.map((_, i) => `      <span className="mesh-blob b${i + 1}" />`).join('\n');
  return `const meshCss = \`\n${safeCss}\n\`;\n\nexport default function MeshBackground({ children, style }) {\n  return (\n    <div className="mesh-bg" style={{ width: '100%', height: '100%', ...style }}>\n      <style>{meshCss}</style>\n${spans}\n      {children}\n    </div>\n  );\n}`;
}

export function buildTailwind(d) {
  const { blobs, bgColor, grain, anim, spread, opacity, blur, W, H } = d;
  const animate = anim?.on && anim.amount > 0;
  const u = v => String(v).replace(/\s+/g, '_');
  const spans = blobs.map((b, i) => {
    const r = blobRadius(b, spread, W, H);
    const s = stretchOf(b);
    const cls = [
      'absolute', '-z-10', 'rounded-full', 'pointer-events-none', '[translate:-50%_-50%]',
      `left-[${pct(b.x)}]`, `top-[${pct(b.y)}]`, `w-[${pct((2 * r * s) / W)}]`, `aspect-[${r2(s)}]`,
      `bg-[${b.color}]`, `opacity-[${blobAlpha(b, opacity).toFixed(2)}]`,
      `[filter:blur(${r2((blobBlur(b, blur) / W) * 100)}cqw)]`,
    ];
    if (rotOf(b)) cls.push(`[rotate:${r1(rotOf(b))}deg]`);
    if (modeOf(b) !== 'normal') cls.push(`mix-blend-${modeOf(b)}`);
    if (animate) cls.push(`motion-safe:animate-[mesh-drift-${i + 1}_${anim.dur}s_linear_infinite]`);
    return `  <span class="${cls.join(' ')}"></span>`;
  }).join('\n');
  // Unquoted, fully encoded url() so it can sit inside class="…"
  const grainUrl = grainDataUri(grain).replace(/^url\("|"\)$/g, '').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29');
  const grainSpan = grain > 0 ? `\n  <span class="absolute inset-0 -z-10 pointer-events-none bg-[url(${u(grainUrl)})]"></span>` : '';
  const markup = `<div class="relative isolate overflow-hidden [container-type:inline-size] bg-[${bgColor}] h-full w-full">\n${spans}${grainSpan}\n</div>`;
  return animate ? `${markup}\n\n<!-- Keyframes: put once in your global CSS (or keep this style tag) -->\n<style>\n${keyframesCss(d)}\n</style>` : markup;
}

/* ── Frame rendering (raster stills, video, GIF) ── */
export function svgToImage(svg) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
    const img = new Image();
    img.onload = () => { URL.revokeObjectURL(url); resolve(img); };
    img.onerror = e => { URL.revokeObjectURL(url); reject(e); };
    img.src = url;
  });
}

/** Draws the mesh at loop phase u onto ctx (w × h). */
export async function drawFrame(ctx, d, u, w, h) {
  const img = await svgToImage(buildSvg(d, { phase: u }));
  ctx.fillStyle = d.bgColor;
  ctx.fillRect(0, 0, w, h);
  ctx.drawImage(img, 0, 0, w, h);
}

/* Fit the canvas ratio into a long edge; even numbers (video encoders need them) */
export function fitSize(W, H, longEdge) {
  const k = longEdge / Math.max(W, H);
  const even = n => Math.max(2, Math.round((n * k) / 2) * 2);
  return { w: even(W), h: even(H) };
}

/** One full loop as JPEG blobs (pass 1 of the video export). */
export async function renderLoopFrames(d, { w, h, fps, onProgress, signal }) {
  const total = Math.max(1, Math.round(d.anim.dur * fps));
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d');
  const frames = [];
  for (let f = 0; f < total; f++) {
    if (signal?.aborted) throw new DOMException('Cancelled', 'AbortError');
    await drawFrame(ctx, d, f / total, w, h);
    frames.push(await new Promise(res => canvas.toBlob(res, 'image/jpeg', 0.92)));
    onProgress?.({ phase: 'render', done: f + 1, total });
  }
  return frames;
}

/** One full loop as an endlessly looping GIF (global palette + light ordered dither). */
export async function renderGif(d, { w, h, fps = 20, onProgress, signal }) {
  const { GIFEncoder, quantize, applyPalette } = await import('gifenc');
  const total = Math.max(1, Math.round(d.anim.dur * fps));
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  const dither = data => {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const o = (y * w + x) * 4;
        const n = (BAYER[(y & 3) * 4 + (x & 3)] / 16 - 0.5) * 10;
        data[o] = Math.max(0, Math.min(255, data[o] + n));
        data[o + 1] = Math.max(0, Math.min(255, data[o + 1] + n));
        data[o + 2] = Math.max(0, Math.min(255, data[o + 2] + n));
      }
    }
    return data;
  };
  // Pass 1: every frame's pixels
  const pixels = [];
  for (let f = 0; f < total; f++) {
    if (signal?.aborted) throw new DOMException('Cancelled', 'AbortError');
    await drawFrame(ctx, d, f / total, w, h);
    pixels.push(dither(ctx.getImageData(0, 0, w, h).data));
    onProgress?.({ phase: 'render', done: f + 1, total });
  }
  // One palette from frames across the loop, so colours do not flicker between frames
  const picks = [0, 0.25, 0.5, 0.75].map(p => pixels[Math.floor(p * total)]);
  const sample = new Uint8ClampedArray(picks.reduce((n, p) => n + p.length, 0));
  let off = 0;
  for (const p of picks) { sample.set(p, off); off += p.length; }
  const palette = quantize(sample, 256);
  const gif = GIFEncoder();
  const delay = Math.round(1000 / fps);
  for (let f = 0; f < total; f++) {
    if (signal?.aborted) throw new DOMException('Cancelled', 'AbortError');
    gif.writeFrame(applyPalette(pixels[f], palette), w, h, { palette: f === 0 ? palette : undefined, delay, repeat: 0 });
    onProgress?.({ phase: 'encode', done: f + 1, total });
    if (f % 10 === 9) await new Promise(r => setTimeout(r, 0)); // keep the page responsive
  }
  gif.finish();
  return new Blob([gif.bytes()], { type: 'image/gif' });
}
