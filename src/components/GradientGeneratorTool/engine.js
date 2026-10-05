/* ──────────────────────────────────────────────────────────────────────────
   Gradient engine — everything that turns a gradient config into output:
   color-space math (OKLab / OKLCH / HSL), CSS, and the raster (PNG) and
   vector (SVG) renderers used for downloads and the contrast check.
   Pure functions; no React.

   Config shape:
     { layers: [Layer], space, eased, grain, animId, animSpeed, previewMode }
     Layer = { id, type: 'linear'|'radial'|'conic', angle, stops: [{ id, c, a, p }],
               shape: 'ellipse'|'circle', size, cx, cy, from,
               repeating, repeatSize, hard, blend }
     Stop: c = #rrggbb, a = opacity 0–100, p = position 0–100.
   Layer 0 is the TOP layer (CSS order: the first background paints on top).
   ────────────────────────────────────────────────────────────────────────── */

export const SPACES = [
  ['srgb',         'sRGB',          'Classic browser default — can turn grey or muddy in the middle'],
  ['oklab',        'OKLab',         'Perceptually even — no grey dead zone between colors'],
  ['oklch',        'OKLCH',         'Keeps colors vivid by travelling around the hue wheel'],
  ['oklch-longer', 'OKLCH long',    'Goes the long way round the hue wheel — rainbow sweeps'],
  ['hsl',          'HSL',           'Hue-based mixing — bright, but less even than OKLCH'],
];
export const RADIAL_SIZES = ['farthest-corner', 'closest-side', 'farthest-side', 'closest-corner'];
export const BLEND_MODES = ['normal', 'multiply', 'screen', 'overlay', 'soft-light', 'hard-light', 'color-dodge', 'color-burn', 'lighten', 'darken', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity'];

/* ── Color math ─────────────────────────────────────────────────────────── */

const clamp01 = v => Math.min(1, Math.max(0, v));
const round = (n, d = 2) => Number(n.toFixed(d));

export function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255);
}
export function rgbToHex([r, g, b]) {
  return '#' + [r, g, b].map(v => Math.round(clamp01(v) * 255).toString(16).padStart(2, '0')).join('');
}
const toLinear = c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGamma = c => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);

function rgbToOklab(rgb) {
  const [r, g, b] = rgb.map(toLinear);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
  ];
}
function oklabToRgb([L, a, b]) {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s,
  ].map(c => toGamma(Math.max(0, c)));
}
function rgbToHsl([r, g, b]) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2;
  if (max === min) return [NaN, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  const h = max === r ? (g - b) / d + (g < b ? 6 : 0) : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return [h * 60, s, l];
}
function hslToRgb([h, s, l]) {
  if (!s) return [l, l, l];
  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1));
  return [f(0), f(8), f(4)];
}
function mixHue(h1, h2, t, longer) {
  if (isNaN(h1)) return h2;
  if (isNaN(h2)) return h1;
  let d = h2 - h1;
  if (longer) { if (d > 0 && d < 180) d -= 360; else if (d > -180 && d <= 0) d += 360; }
  else { if (d > 180) d -= 360; else if (d < -180) d += 360; }
  return (h1 + d * t + 360) % 360;
}

/** Mix two hex colors at t (0–1) in the given color space. */
export function mix(c1, c2, t, space = 'srgb') {
  const a = hexToRgb(c1), b = hexToRgb(c2);
  if (space === 'oklab' || space === 'oklch' || space === 'oklch-longer') {
    const A = rgbToOklab(a), B = rgbToOklab(b);
    if (space === 'oklab') return rgbToHex(oklabToRgb(A.map((v, i) => v + (B[i] - v) * t)));
    const lch = ([L, x, y]) => { const C = Math.hypot(x, y); return [L, C, C < 1e-4 ? NaN : (Math.atan2(y, x) * 180 / Math.PI + 360) % 360]; };
    const [L1, C1, H1] = lch(A), [L2, C2, H2] = lch(B);
    const L = L1 + (L2 - L1) * t, C = C1 + (C2 - C1) * t;
    const H = mixHue(H1, H2, t, space === 'oklch-longer');
    const h = (isNaN(H) ? 0 : H) * Math.PI / 180;
    return rgbToHex(oklabToRgb([L, C * Math.cos(h), C * Math.sin(h)]));
  }
  if (space === 'hsl') {
    const A = rgbToHsl(a), B = rgbToHsl(b);
    return rgbToHex(hslToRgb([mixHue(A[0], B[0], t, false) || 0, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t]));
  }
  return rgbToHex(a.map((v, i) => v + (b[i] - v) * t));
}

/** Color + opacity at position p (0–100) along a set of stops — used when adding a stop on the bar. */
export function colorAt(stops, p, space = 'srgb') {
  const s = [...stops].sort((x, y) => x.p - y.p);
  const pick = st => ({ c: st.c, a: st.a ?? 100 });
  if (p <= s[0].p) return pick(s[0]);
  if (p >= s[s.length - 1].p) return pick(s[s.length - 1]);
  for (let i = 0; i < s.length - 1; i++) {
    if (p >= s[i].p && p <= s[i + 1].p) {
      const t = (p - s[i].p) / (s[i + 1].p - s[i].p || 1);
      const a0 = s[i].a ?? 100, a1 = s[i + 1].a ?? 100;
      return { c: mix(s[i].c, s[i + 1].c, t, space), a: Math.round(a0 + (a1 - a0) * t) };
    }
  }
  return pick(s[0]);
}

/** CSS color for a stop: plain hex when opaque, 8-digit hex (#rrggbbaa) otherwise. */
export function stopColor(st) {
  const a = st.a ?? 100;
  return a >= 100 ? st.c : st.c + Math.round(Math.max(0, a) / 100 * 255).toString(16).padStart(2, '0');
}

export function luminance(hex) {
  return hexToRgb(hex).map(toLinear).reduce((sum, c, i) => sum + c * [0.2126, 0.7152, 0.0722][i], 0);
}

/* ── Stops ──────────────────────────────────────────────────────────────── */

const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * The stops actually emitted for a layer, positions 0–100:
 *  hard    → every color becomes a solid band (stripes / pie slices)
 *  eased   → 7 in-between stops per segment following an ease-in-out curve,
 *            mixed in the chosen color space (removes the hard "seam" at each stop)
 *  raster  → for PNG / SVG, segments are also sampled in the color space, because
 *            canvas and SVG can only interpolate in sRGB.
 */
export function expandStops(layer, cfg, { raster = false } = {}) {
  const s = [...layer.stops].sort((a, b) => a.p - b.p).map(x => ({ c: x.c, a: x.a ?? 100, p: x.p }));
  if (layer.hard) {
    const out = [];
    s.forEach((st, i) => {
      out.push({ c: st.c, a: st.a, p: i === 0 ? 0 : st.p });
      out.push({ c: st.c, a: st.a, p: i < s.length - 1 ? s[i + 1].p : 100 });
    });
    return out;
  }
  let out = s;
  if (cfg.eased) {
    out = [];
    s.forEach((st, i) => {
      out.push(st);
      if (i === s.length - 1) return;
      const next = s[i + 1];
      for (let k = 1; k < 8; k++) {
        const t = k / 8, e = easeInOut(t);
        out.push({ c: mix(st.c, next.c, e, cfg.space), a: st.a + (next.a - st.a) * e, p: st.p + (next.p - st.p) * t });
      }
    });
  }
  if (raster && cfg.space !== 'srgb') {
    const sampled = [];
    out.forEach((st, i) => {
      sampled.push(st);
      if (i === out.length - 1) return;
      const next = out[i + 1];
      const n = cfg.eased ? 3 : 12;
      for (let k = 1; k < n; k++) {
        const t = k / n;
        sampled.push({ c: mix(st.c, next.c, t, cfg.space), a: st.a + (next.a - st.a) * t, p: st.p + (next.p - st.p) * t });
      }
    });
    out = sampled;
  }
  return out;
}

/* ── CSS ────────────────────────────────────────────────────────────────── */

const INTERP = { oklab: 'in oklab', oklch: 'in oklch', 'oklch-longer': 'in oklch longer hue', hsl: 'in hsl' };

/** One layer as a CSS gradient function. `interp: false` gives the sRGB fallback. */
export function layerCSS(layer, cfg, { interp = true, angleVar = null } = {}) {
  const unit = layer.type === 'conic' ? 'deg' : 'px';
  const stops = expandStops(layer, cfg).map(st => (layer.repeating
    ? `${stopColor(st)} ${round(st.p * layer.repeatSize / 100)}${unit}`
    : `${stopColor(st)} ${round(st.p)}%`)).join(', ');
  const space = interp && cfg.space !== 'srgb' ? INTERP[cfg.space] : '';
  let head;
  if (layer.type === 'linear') head = [space, angleVar || `${layer.angle}deg`];
  else if (layer.type === 'radial') head = [space, layer.shape, layer.size === 'farthest-corner' ? '' : layer.size, `at ${layer.cx}% ${layer.cy}%`];
  else head = [space, `from ${layer.from}deg at ${layer.cx}% ${layer.cy}%`];
  const fn = `${layer.repeating ? 'repeating-' : ''}${layer.type}-gradient`;
  return `${fn}(${head.filter(Boolean).join(' ')}, ${stops})`;
}

/** Film-grain texture as an SVG data URI (fractal noise, desaturated). */
export function grainURL(amount) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(#n)' opacity='${round(amount / 100, 2)}'/></svg>`;
  // Escape only what a data URI needs, so the exported CSS stays readable.
  const enc = svg.replace(/%/g, '%25').replace(/</g, '%3C').replace(/>/g, '%3E').replace(/#/g, '%23').replace(/"/g, '%22');
  return `url("data:image/svg+xml,${enc}")`;
}

/** Background layers + blend modes (grain sits on top as an overlay). */
export function backgroundParts(cfg, opts = {}) {
  const layers = cfg.layers.map((l, i) => layerCSS(l, cfg, { ...opts, angleVar: i === 0 && l.type === 'linear' ? opts.angleVar : null }));
  const blends = cfg.layers.map(l => l.blend || 'normal');
  if (cfg.grain > 0) { layers.unshift(grainURL(cfg.grain)); blends.unshift('overlay'); }
  return { layers, blend: blends.some(b => b !== 'normal') ? blends.join(', ') : null };
}

export function backgroundValue(cfg, opts = {}) {
  return backgroundParts(cfg, opts).layers.join(', ');
}

/** CSS declarations, with an sRGB fallback line first when a modern color space is used. */
export function cssDeclarations(cfg, indent = '', opts = {}) {
  const { layers, blend } = backgroundParts(cfg, opts);
  const join = list => (list.length > 1 ? `\n${indent}  ${list.join(`,\n${indent}  `)}` : ` ${list[0]}`);
  const lines = [];
  if (cfg.space !== 'srgb') {
    lines.push(`${indent}/* sRGB fallback for browsers without CSS color-space interpolation */`);
    lines.push(`${indent}background:${join(backgroundParts(cfg, { ...opts, interp: false }).layers)};`);
  }
  lines.push(`${indent}background:${join(layers)};`);
  if (blend) lines.push(`${indent}background-blend-mode: ${blend};`);
  return lines.join('\n');
}

/* ── Raster renderer (PNG download + contrast sampling) ─────────────────── */

function geometry(layer, W, H) {
  const cx = W * layer.cx / 100, cy = H * layer.cy / 100;
  const l = cx, r = W - cx, t = cy, b = H - cy;
  if (layer.type === 'linear') {
    const a = layer.angle * Math.PI / 180;
    const dx = Math.sin(a), dy = -Math.cos(a);
    const len = Math.abs(W * Math.sin(a)) + Math.abs(H * Math.cos(a));
    return { x0: W / 2 - dx * len / 2, y0: H / 2 - dy * len / 2, x1: W / 2 + dx * len / 2, y1: H / 2 + dy * len / 2, len };
  }
  if (layer.type === 'radial') {
    const corners = [[l, t], [r, t], [l, b], [r, b]].map(([x, y]) => Math.hypot(x, y));
    let rx, ry;
    if (layer.shape === 'circle') {
      rx = ry = { 'closest-side': Math.min(l, r, t, b), 'farthest-side': Math.max(l, r, t, b), 'closest-corner': Math.min(...corners), 'farthest-corner': Math.max(...corners) }[layer.size];
    } else {
      const k = layer.size.endsWith('corner') ? Math.SQRT2 : 1;
      const pick = layer.size.startsWith('closest') ? Math.min : Math.max;
      rx = pick(l, r) * k; ry = pick(t, b) * k;
    }
    return { cx, cy, rx: Math.max(rx, 0.5), ry: Math.max(ry, 0.5) };
  }
  return { cx, cy };
}

function repeatStops(stops, periodFrac) {
  if (!(periodFrac > 0)) return stops;
  const out = [];
  for (let k = 0; k * periodFrac < 1 && k < 400; k++) {
    stops.forEach(st => out.push({ ...st, p: Math.min(100, (k + st.p / 100) * periodFrac * 100) }));
  }
  return out;
}

/** Draws the config to a canvas, bottom layer first, with blend modes and grain. */
export function renderCanvas(cfg, W, H, { grain = true } = {}) {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  [...cfg.layers].reverse().forEach((layer, i) => {
    const g = geometry(layer, W, H);
    let stops = expandStops(layer, cfg, { raster: true });
    let grad;
    ctx.save();
    if (layer.type === 'linear') {
      if (layer.repeating) stops = repeatStops(stops, layer.repeatSize / g.len);
      grad = ctx.createLinearGradient(g.x0, g.y0, g.x1, g.y1);
    } else if (layer.type === 'radial') {
      if (layer.repeating) stops = repeatStops(stops, layer.repeatSize / g.rx);
      ctx.translate(g.cx, g.cy); ctx.scale(1, g.ry / g.rx); ctx.translate(-g.cx, -g.cy);
      grad = ctx.createRadialGradient(g.cx, g.cy, 0, g.cx, g.cy, g.rx);
    } else {
      if (!ctx.createConicGradient) { ctx.restore(); return; }
      if (layer.repeating) stops = repeatStops(stops, layer.repeatSize / 360);
      grad = ctx.createConicGradient((layer.from - 90) * Math.PI / 180, g.cx, g.cy);
    }
    stops.forEach(st => grad.addColorStop(clamp01(st.p / 100), stopColor(st)));
    ctx.globalCompositeOperation = i === 0 || !layer.blend || layer.blend === 'normal' ? 'source-over' : layer.blend;
    ctx.fillStyle = grad;
    ctx.fillRect(-W * 4, -H * 4, W * 9, H * 9);
    ctx.restore();
  });
  if (grain && cfg.grain > 0) {
    const n = document.createElement('canvas');
    n.width = n.height = 220;
    const nctx = n.getContext('2d');
    const img = nctx.createImageData(220, 220);
    for (let i = 0; i < img.data.length; i += 4) {
      const v = Math.random() * 255;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255;
    }
    nctx.putImageData(img, 0, 0);
    ctx.globalCompositeOperation = 'overlay';
    ctx.globalAlpha = cfg.grain / 100 * 0.6;
    ctx.fillStyle = ctx.createPattern(n, 'repeat');
    ctx.fillRect(0, 0, W, H);
  }
  return canvas;
}

/* ── Contrast helper (sampled from a small render) ──────────────────────── */

const contrastRatio = (l1, l2) => (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

/** Worst-case contrast of white and of near-black text anywhere over the gradient. */
export function textContrast(cfg) {
  const canvas = renderCanvas(cfg, 64, 36, { grain: false });
  if (!canvas) return null;
  const data = canvas.getContext('2d').getImageData(0, 0, 64, 36).data;
  const darkL = luminance('#0f172a');
  let white = Infinity, dark = Infinity;
  for (let i = 0; i < data.length; i += 4) {
    const al = data[i + 3] / 255;   // see-through areas are measured over white
    const L = [data[i], data[i + 1], data[i + 2]]
      .map(v => toLinear((v / 255) * al + (1 - al)))
      .reduce((s, c, j) => s + c * [0.2126, 0.7152, 0.0722][j], 0);
    white = Math.min(white, contrastRatio(1, L));
    dark = Math.min(dark, contrastRatio(darkL, L));
  }
  return { white: round(white, 1), dark: round(dark, 1) };
}

/* ── Vector renderer (SVG download) ─────────────────────────────────────── */

/** SVG needs native gradients, so conic and repeating layers can't be exported as SVG. */
export function svgSupported(cfg) {
  return cfg.layers.every(l => l.type !== 'conic' && !l.repeating);
}

export function renderSVG(cfg, W, H) {
  const defs = [], rects = [];
  [...cfg.layers].reverse().forEach((layer, i) => {
    const g = geometry(layer, W, H);
    const stops = expandStops(layer, cfg, { raster: true })
      .map(st => `<stop offset="${round(st.p, 3)}%" stop-color="${st.c}"${st.a < 100 ? ` stop-opacity="${round(st.a / 100, 3)}"` : ''}/>`).join('');
    const id = `g${i}`;
    if (layer.type === 'linear') {
      defs.push(`<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="${round(g.x0)}" y1="${round(g.y0)}" x2="${round(g.x1)}" y2="${round(g.y1)}">${stops}</linearGradient>`);
    } else {
      defs.push(`<radialGradient id="${id}" gradientUnits="userSpaceOnUse" cx="${round(g.cx)}" cy="${round(g.cy)}" r="${round(g.rx)}" gradientTransform="translate(${round(g.cx)} ${round(g.cy)}) scale(1 ${round(g.ry / g.rx, 4)}) translate(${round(-g.cx)} ${round(-g.cy)})">${stops}</radialGradient>`);
    }
    const blend = i > 0 && layer.blend && layer.blend !== 'normal' ? ` style="mix-blend-mode:${layer.blend}"` : '';
    rects.push(`<rect width="${W}" height="${H}" fill="url(#${id})"${blend}/>`);
  });
  if (cfg.grain > 0) {
    defs.push('<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter>');
    rects.push(`<rect width="${W}" height="${H}" filter="url(#grain)" opacity="${round(cfg.grain / 100)}" style="mix-blend-mode:overlay"/>`);
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>${defs.join('')}</defs><g style="isolation:isolate">${rects.join('')}</g></svg>`;
}
