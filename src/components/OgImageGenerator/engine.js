/* ── OG image drawing engine ─────────────────────────────────────────────────────
   Pure canvas code, no React: templates, fonts, text fitting, backgrounds, logo
   and author blocks. drawDesign() renders one design at any of the SIZES; the UI
   uses it for the main canvas and for the template thumbnails. */

export const SIZES = [
  { id: 'og',     label: 'Open Graph · 1200×630', w: 1200, h: 630,  note: 'Facebook, LinkedIn, X, Slack, Discord' },
  { id: 'x',      label: 'X / Twitter · 1200×600', w: 1200, h: 600,  note: 'X summary_large_image (2:1)' },
  { id: 'square', label: 'Square · 1200×1200',    w: 1200, h: 1200, note: 'WhatsApp, Instagram, square cards' },
];

/* Google Fonts are loaded on demand (only the weights each family really has —
   the CSS API rejects a request for a missing weight). System entries need no load. */
export const FONTS = [
  { id: 'inter',        label: 'Inter',             family: 'Inter',             weights: [400, 500, 600, 700, 800, 900], fallback: 'sans-serif' },
  { id: 'poppins',      label: 'Poppins',           family: 'Poppins',           weights: [400, 500, 600, 700, 800, 900], fallback: 'sans-serif' },
  { id: 'montserrat',   label: 'Montserrat',        family: 'Montserrat',        weights: [400, 500, 600, 700, 800, 900], fallback: 'sans-serif' },
  { id: 'jakarta',      label: 'Plus Jakarta Sans', family: 'Plus Jakarta Sans', weights: [400, 500, 600, 700, 800],      fallback: 'sans-serif' },
  { id: 'dmsans',       label: 'DM Sans',           family: 'DM Sans',           weights: [400, 500, 600, 700, 800, 900], fallback: 'sans-serif' },
  { id: 'space',        label: 'Space Grotesk',     family: 'Space Grotesk',     weights: [400, 500, 600, 700],           fallback: 'sans-serif' },
  { id: 'oswald',       label: 'Oswald',            family: 'Oswald',            weights: [400, 500, 600, 700],           fallback: 'sans-serif' },
  { id: 'bebas',        label: 'Bebas Neue',        family: 'Bebas Neue',        weights: [400],                          fallback: 'sans-serif' },
  { id: 'playfair',     label: 'Playfair Display',  family: 'Playfair Display',  weights: [400, 500, 600, 700, 800, 900], fallback: 'serif' },
  { id: 'merriweather', label: 'Merriweather',      family: 'Merriweather',      weights: [400, 700, 900],                fallback: 'serif' },
  { id: 'lora',         label: 'Lora',              family: 'Lora',              weights: [400, 500, 600, 700],           fallback: 'serif' },
  { id: 'jetbrains',    label: 'JetBrains Mono',    family: 'JetBrains Mono',    weights: [400, 500, 600, 700, 800],      fallback: 'monospace' },
  { id: 'system',       label: 'System sans (Arial)', stack: 'Arial, Helvetica, sans-serif',      weights: [400, 700] },
  { id: 'georgia',      label: 'System serif (Georgia)', stack: 'Georgia, "Times New Roman", serif', weights: [400, 700] },
];
const FONT_BY_ID = new Map(FONTS.map(f => [f.id, f]));

const fontPromises = new Map();
/** Loads a Google Font family (all its weights) and resolves once the canvas can use it. */
export function ensureFont(id) {
  const f = FONT_BY_ID.get(id);
  if (!f || !f.family || typeof document === 'undefined') return Promise.resolve();
  if (fontPromises.has(id)) return fontPromises.get(id);
  const p = new Promise(resolve => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${f.family.replace(/ /g, '+')}:wght@${f.weights.join(';')}&display=swap`;
    const loadFaces = () => Promise.all(f.weights.map(w => document.fonts.load(`${w} 40px "${f.family}"`)))
      .catch(() => {}).then(resolve);
    link.onload = loadFaces;
    link.onerror = () => resolve(); // offline / blocked: the fallback stack draws instead
    document.head.appendChild(link);
  });
  fontPromises.set(id, p);
  return p;
}

function pickWeight(f, want) {
  return f.weights.reduce((best, w) => (Math.abs(w - want) < Math.abs(best - want) ? w : best), f.weights[0]);
}
export function fontCss(id, weight, size) {
  const f = FONT_BY_ID.get(id) || FONT_BY_ID.get('system');
  const stack = f.family ? `"${f.family}", ${f.fallback}` : f.stack;
  return `${pickWeight(f, weight)} ${size}px ${stack}`;
}

/* ── Colour helpers (tolerate half-typed hex values) ─────────────────────────── */
export function parseHex(hex) {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(hex || '').trim());
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = h.split('').map(c => c + c).join('');
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
}
export function rgba(hex, a) {
  const c = parseHex(hex) || [0, 0, 0];
  return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
}
function luminance(hex) {
  const c = parseHex(hex) || [0, 0, 0];
  const [r, g, b] = c.map(v => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
export function contrast(a, b) {
  const l1 = luminance(a), l2 = luminance(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}
/** White or near-black, whichever reads better on `hex`. */
export const onColor = hex => (contrast(hex, '#ffffff') >= contrast(hex, '#0f172a') ? '#ffffff' : '#0f172a');

/* ── Rich text: *word* is drawn in the accent colour ─────────────────────────── */
export const plainText = text => String(text || '').replace(/\*/g, '');

// -> words, each a list of runs {t, hi}
function parseRich(text) {
  const words = [];
  let word = [], buf = '', hi = false;
  const flush = () => { if (buf) { word.push({ t: buf, hi }); buf = ''; } };
  for (const ch of String(text || '')) {
    if (ch === '*') { flush(); hi = !hi; continue; }
    if (/\s/.test(ch)) { flush(); if (word.length) { words.push(word); word = []; } continue; }
    buf += ch;
  }
  flush();
  if (word.length) words.push(word);
  return words;
}
const wordW = (ctx, word) => word.reduce((sum, r) => sum + ctx.measureText(r.t).width, 0);

// A single word wider than the line (a long URL, say) is broken by characters
function splitLong(ctx, word, maxW) {
  if (wordW(ctx, word) <= maxW) return [word];
  const out = [];
  let cur = [], curW = 0;
  for (const run of word) {
    for (const ch of run.t) {
      const w = ctx.measureText(ch).width;
      if (curW + w > maxW && cur.length) { out.push(cur); cur = []; curW = 0; }
      const last = cur[cur.length - 1];
      if (last && last.hi === run.hi) last.t += ch; else cur.push({ t: ch, hi: run.hi });
      curW += w;
    }
  }
  if (cur.length) out.push(cur);
  return out;
}
function wrapRich(ctx, words, maxW) {
  const space = ctx.measureText(' ').width;
  const lines = [];
  let line = [], lineW = 0;
  for (const w0 of words) {
    for (const w of splitLong(ctx, w0, maxW)) {
      const ww = wordW(ctx, w);
      if (line.length && lineW + space + ww > maxW) { lines.push(line); line = [w]; lineW = ww; }
      else { lineW += (line.length ? space : 0) + ww; line.push(w); }
    }
  }
  if (line.length) lines.push(line);
  return lines;
}
const lineWidth = (ctx, line) => {
  const space = ctx.measureText(' ').width;
  return line.reduce((s, w, i) => s + wordW(ctx, w) + (i ? space : 0), 0);
};
// Keep at most maxLines; the last kept line ends in an ellipsis
function clampLines(ctx, lines, maxLines, maxW) {
  if (lines.length <= maxLines) return { lines, cut: false };
  if (maxLines <= 0) return { lines: [], cut: true };
  const kept = lines.slice(0, maxLines).map(l => l.map(w => w.map(r => ({ ...r }))));
  const last = kept[maxLines - 1];
  const ell = ctx.measureText('…').width;
  while (last.length > 1 && lineWidth(ctx, last) + ell > maxW) last.pop();
  const lastWord = last[last.length - 1];
  lastWord[lastWord.length - 1].t += '…';
  return { lines: kept, cut: true };
}
function drawLines(ctx, lines, { x, y, lineH, size, align, color, hiColor }) {
  const space = ctx.measureText(' ').width;
  ctx.textBaseline = 'top';
  ctx.textAlign = 'left';
  lines.forEach((line, i) => {
    const total = lineWidth(ctx, line);
    let cx = align === 'center' ? x - total / 2 : align === 'right' ? x - total : x;
    const ty = y + i * lineH + (lineH - size) / 2;
    line.forEach(w => {
      for (const run of w) {
        ctx.fillStyle = run.hi ? hiColor : color;
        ctx.fillText(run.t, cx, ty);
        cx += ctx.measureText(run.t).width;
      }
      cx += space;
    });
  });
}

/* ── Shapes ──────────────────────────────────────────────────────────────────── */
function rr(ctx, x, y, w, h, r) {
  r = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function setSpacing(ctx, px) { if ('letterSpacing' in ctx) ctx.letterSpacing = `${px}px`; }

function mulberry(seed) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ── Background: solid / gradient / mesh, optional photo, optional pattern ──── */
function drawBackground(ctx, o, a, W, H, colors = {}) {
  const base = colors.base || o.bg1;
  const c2 = colors.c2 || o.bg2;
  const c3 = colors.c3 || o.accentColor;
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, W, H);

  if (o.bgStyle === 'gradient') {
    const ang = ((o.gradAngle ?? 135) - 90) * Math.PI / 180;
    const len = Math.abs(W * Math.cos(ang)) + Math.abs(H * Math.sin(ang));
    const dx = Math.cos(ang) * len / 2, dy = Math.sin(ang) * len / 2;
    const g = ctx.createLinearGradient(W / 2 - dx, H / 2 - dy, W / 2 + dx, H / 2 + dy);
    g.addColorStop(0, base);
    g.addColorStop(1, c2);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  } else if (o.bgStyle === 'mesh') {
    const blob = (x, y, r, col, al) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, rgba(col, al));
      g.addColorStop(1, rgba(col, 0));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
    };
    blob(W * 0.12, H * 0.15, W * 0.62, c2, 0.95);
    blob(W * 0.9, H * 0.25, W * 0.5, c3, 0.7);
    blob(W * 0.65, H * 1.05, W * 0.55, c2, 0.75);
    blob(W * 0.05, H * 1.0, W * 0.35, c3, 0.45);
  }

  if (a.bg) {
    const img = a.bg;
    const k = Math.max(W / img.width, H / img.height);
    const extra = (o.blur || 0) * 2; // over-draw so a blur doesn't fade the edges
    ctx.save();
    if (o.blur > 0 && 'filter' in ctx) ctx.filter = `blur(${o.blur}px)`;
    ctx.drawImage(img, (W - img.width * k) / 2 - extra, (H - img.height * k) / 2 - extra, img.width * k + extra * 2, img.height * k + extra * 2);
    ctx.restore();
    ctx.fillStyle = rgba(base, o.overlay ?? 0.55);
    ctx.fillRect(0, 0, W, H);
  }

  const pc = rgba(o.textColor, o.pattern === 'noise' ? 1 : 0.09);
  ctx.save();
  if (o.pattern === 'dots') {
    ctx.fillStyle = pc;
    for (let y = 14; y < H; y += 28) for (let x = 14; x < W; x += 28) { ctx.beginPath(); ctx.arc(x, y, 2, 0, Math.PI * 2); ctx.fill(); }
  } else if (o.pattern === 'grid') {
    ctx.strokeStyle = pc;
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0.5; x < W; x += 48) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
    for (let y = 0.5; y < H; y += 48) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
    ctx.stroke();
  } else if (o.pattern === 'lines') {
    ctx.strokeStyle = pc;
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let x = -H; x < W; x += 22) { ctx.moveTo(x, H); ctx.lineTo(x + H, 0); }
    ctx.stroke();
  } else if (o.pattern === 'noise') {
    const rnd = mulberry(7);
    ctx.fillStyle = pc;
    const n = Math.round(W * H / 80);
    for (let i = 0; i < n; i++) { ctx.globalAlpha = 0.03 + rnd() * 0.07; ctx.fillRect(rnd() * W, rnd() * H, 1.6, 1.6); }
  }
  ctx.restore();
}

/* ── Logo / author ───────────────────────────────────────────────────────────── */
// Fits the logo inside box × (box × 3) keeping its shape; x is the left edge, y the centre line
function logoSize(img, box) {
  const k = Math.min(box / img.height, (box * 3) / img.width);
  return { w: img.width * k, h: img.height * k };
}
function drawLogo(ctx, img, x, y, box) {
  const { w, h } = logoSize(img, box);
  ctx.drawImage(img, x, y - h / 2, w, h);
  return w;
}

const AVATAR = 60;
function authorWidth(ctx, o, a) {
  ctx.font = fontCss(o.headingFont, 700, 26);
  const nw = ctx.measureText(plainText(o.author)).width;
  ctx.font = fontCss(o.bodyFont, 400, 21);
  const mw = o.authorMeta ? ctx.measureText(o.authorMeta).width : 0;
  return (a.avatar ? AVATAR + 16 : 0) + Math.max(nw, mw);
}
function drawAuthor(ctx, o, a, x, y, color) {
  let tx = x;
  if (a.avatar) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x + AVATAR / 2, y, AVATAR / 2, 0, Math.PI * 2);
    ctx.clip();
    const img = a.avatar, k = Math.max(AVATAR / img.width, AVATAR / img.height);
    ctx.drawImage(img, x + AVATAR / 2 - (img.width * k) / 2, y - (img.height * k) / 2, img.width * k, img.height * k);
    ctx.restore();
    tx += AVATAR + 16;
  }
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillStyle = color;
  ctx.font = fontCss(o.headingFont, 700, 26);
  ctx.fillText(plainText(o.author), tx, o.authorMeta ? y - 14 : y);
  if (o.authorMeta) {
    ctx.font = fontCss(o.bodyFont, 400, 21);
    ctx.fillStyle = rgba(color, 0.68);
    ctx.fillText(o.authorMeta, tx, y + 16);
  }
}

/* Footer row centred on y. 'split': author-or-site left, logo right (site moves right
   when there's an author but no logo). 'center': one centred row. noLogo / noSite
   skip items a template already shows elsewhere. */
function drawFooter(ctx, o, a, { y, left, right, align = 'split', color, siteColor, noLogo, noSite, siteSuffix = '' }) {
  const hasAuthor = !!plainText(o.author).trim();
  const site = noSite ? '' : (o.site || '').trim() + (o.site ? siteSuffix : '');
  const logo = !noLogo && a.logo ? a.logo : null;
  const siteFont = fontCss(o.bodyFont, 600, 26);
  const drawSite = (x, alignTo) => {
    ctx.font = siteFont;
    ctx.fillStyle = siteColor;
    ctx.textBaseline = 'middle';
    ctx.textAlign = alignTo;
    ctx.fillText(site, x, y);
    ctx.textAlign = 'left';
  };

  if (align === 'center') {
    const items = [];
    if (logo) items.push({ w: logoSize(logo, o.logoSize).w, draw: x => drawLogo(ctx, logo, x, y, o.logoSize) });
    if (hasAuthor) items.push({ w: authorWidth(ctx, o, a), draw: x => drawAuthor(ctx, o, a, x, y, color) });
    else if (site) { ctx.font = siteFont; items.push({ w: ctx.measureText(site).width, draw: x => drawSite(x, 'left') }); }
    const gap = 20;
    const total = items.reduce((s, it) => s + it.w, 0) + gap * Math.max(0, items.length - 1);
    let x = (left + right) / 2 - total / 2;
    items.forEach(it => { it.draw(x); x += it.w + gap; });
    return;
  }

  if (hasAuthor) drawAuthor(ctx, o, a, left, y, color);
  else if (site) drawSite(left, 'left');
  if (logo) {
    const { w } = logoSize(logo, o.logoSize);
    drawLogo(ctx, logo, right - w, y, o.logoSize);
  } else if (hasAuthor && site) {
    drawSite(right, 'right');
  }
}
const hasFooter = (o, a) => !!(plainText(o.author).trim() || (o.site || '').trim() || a.logo);

/* ── Eyebrow + title + description block ─────────────────────────────────────── */
const TITLE_MIN = 34;
/* Lays out the block inside [top, bottom], shrinking the title (and description with
   it) until everything fits; anything that still doesn't fit is cut with "…". */
function drawStack(ctx, o, box) {
  const {
    x, w, top, bottom, align = 'left', valign = 'center',
    titleMax = o.titleSize, titleWeight = 800, maxTitleLines = 4,
    eyebrow = 'text', descMax = 32, color = o.textColor, hiColor = o.accentColor, eyebrowColor = o.accentColor,
  } = box;
  const availH = Math.max(40, bottom - top);
  const titleWords = parseRich(o.title);
  const descWords = parseRich(o.description);
  const eyeText = eyebrow === 'none' ? '' : plainText(o.eyebrow).trim().toUpperCase();
  const eyeH = eyeText ? (eyebrow === 'pill' ? 46 : 28) : 0;
  const eyeGap = eyeText ? 26 : 0;

  let L;
  for (let size = Math.max(titleMax, TITLE_MIN); size >= TITLE_MIN; size -= 2) {
    ctx.font = fontCss(o.headingFont, titleWeight, size);
    const tl = wrapRich(ctx, titleWords, w);
    const lineH = Math.round(size * 1.14);
    const dSize = Math.max(22, Math.min(descMax, Math.round(size * 0.44)));
    ctx.font = fontCss(o.bodyFont, 400, dSize);
    const dlAll = wrapRich(ctx, descWords, w);
    const dLineH = Math.round(dSize * 1.45);
    const dCount = Math.min(dlAll.length, 3);
    const descGap = dlAll.length ? Math.round(size * 0.3) + 8 : 0;
    const h = eyeH + eyeGap + tl.length * lineH + descGap + dCount * dLineH;
    L = { size, tl, lineH, dSize, dlAll, dLineH, dCount, descGap, h };
    if (tl.length <= maxTitleLines && h <= availH) break;
  }

  // Still too tall at the smallest size: drop description lines first, then title lines
  let cut = false;
  ctx.font = fontCss(o.headingFont, titleWeight, L.size);
  let room = availH - eyeH - eyeGap;
  const titleFit = Math.max(1, Math.min(maxTitleLines, Math.floor(room / L.lineH)));
  const t = clampLines(ctx, L.tl, titleFit, w);
  cut = cut || t.cut;
  room -= t.lines.length * L.lineH;
  ctx.font = fontCss(o.bodyFont, 400, L.dSize);
  const descFit = L.dlAll.length ? Math.max(0, Math.min(3, Math.floor((room - L.descGap) / L.dLineH))) : 0;
  const d = clampLines(ctx, L.dlAll, descFit, w);
  cut = cut || d.cut;
  const descGap = d.lines.length ? L.descGap : 0;
  const h = eyeH + eyeGap + t.lines.length * L.lineH + descGap + d.lines.length * L.dLineH;
  let y = valign === 'top' ? top : valign === 'bottom' ? bottom - h : top + (availH - h) / 2;

  if (eyeText) {
    ctx.font = fontCss(o.bodyFont, 700, 21);
    setSpacing(ctx, 3);
    const tw = ctx.measureText(eyeText).width;
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    if (eyebrow === 'pill') {
      const pw = tw + 40;
      const px = align === 'center' ? x - pw / 2 : x;
      ctx.fillStyle = rgba(eyebrowColor, 0.14);
      rr(ctx, px, y, pw, eyeH, eyeH / 2);
      ctx.fill();
      ctx.fillStyle = eyebrowColor;
      ctx.fillText(eyeText, px + 20, y + eyeH / 2 + 1);
    } else {
      ctx.fillStyle = eyebrowColor;
      ctx.fillText(eyeText, align === 'center' ? x - tw / 2 : x, y + eyeH / 2);
    }
    setSpacing(ctx, 0);
    y += eyeH + eyeGap;
  }

  ctx.font = fontCss(o.headingFont, titleWeight, L.size);
  drawLines(ctx, t.lines, { x, y, lineH: L.lineH, size: L.size, align, color, hiColor });
  y += t.lines.length * L.lineH + descGap;
  if (d.lines.length) {
    ctx.font = fontCss(o.bodyFont, 400, L.dSize);
    drawLines(ctx, d.lines, { x, y, lineH: L.dLineH, size: L.dSize, align, color: rgba(color, 0.78), hiColor });
  }
  return { titleSize: L.size, truncated: cut };
}

/* ── Templates ───────────────────────────────────────────────────────────────── */
const P = 80; // outer padding

export const TEMPLATES = [
  {
    id: 'clean', label: 'Clean',
    draw(ctx, o, a, W, H) {
      drawBackground(ctx, o, a, W, H);
      ctx.fillStyle = o.accentColor;
      ctx.fillRect(0, 0, W, 10);
      const f = hasFooter(o, a);
      const info = drawStack(ctx, o, { x: P, w: W - P * 2, top: P, bottom: f ? H - 136 : H - P });
      if (f) drawFooter(ctx, o, a, { y: H - 72, left: P, right: W - P, color: o.textColor, siteColor: o.accentColor });
      return info;
    },
  },
  {
    id: 'sidebar', label: 'Side Bar',
    draw(ctx, o, a, W, H) {
      drawBackground(ctx, o, a, W, H);
      ctx.fillStyle = o.accentColor;
      ctx.fillRect(0, 0, 14, H);
      const f = hasFooter(o, a);
      const info = drawStack(ctx, o, { x: P + 14, w: W - P * 2 - 14, top: P, bottom: f ? H - 136 : H - P });
      if (f) drawFooter(ctx, o, a, { y: H - 72, left: P + 14, right: W - P, color: o.textColor, siteColor: o.accentColor });
      return info;
    },
  },
  {
    id: 'centered', label: 'Centered',
    draw(ctx, o, a, W, H) {
      drawBackground(ctx, o, a, W, H);
      const f = hasFooter(o, a);
      const info = drawStack(ctx, o, { x: W / 2, w: W - P * 2 - 60, top: P, bottom: f ? H - 140 : H - P, align: 'center', eyebrow: 'pill' });
      if (f) drawFooter(ctx, o, a, { y: H - 76, left: P, right: W - P, align: 'center', color: o.textColor, siteColor: rgba(o.textColor, 0.75) });
      return info;
    },
  },
  {
    id: 'bold', label: 'Bold',
    draw(ctx, o, a, W, H) {
      drawBackground(ctx, o, a, W, H);
      const R = Math.min(W, H);
      ctx.fillStyle = rgba(o.accentColor, 0.16);
      ctx.beginPath(); ctx.arc(W - 90, -90, R * 0.66, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = rgba(o.accentColor, 0.09);
      ctx.beginPath(); ctx.arc(-60, H + 60, R * 0.5, 0, Math.PI * 2); ctx.fill();
      const f = hasFooter(o, a);
      const info = drawStack(ctx, o, { x: P, w: W - P * 2, top: P, bottom: f ? H - 150 : H - P, titleMax: o.titleSize + 8, titleWeight: 900 });
      if (f) {
        ctx.fillStyle = o.accentColor;
        ctx.fillRect(P, H - 118, 56, 5);
        drawFooter(ctx, o, a, { y: H - 72, left: P, right: W - P, color: o.textColor, siteColor: o.accentColor });
      }
      return info;
    },
  },
  {
    id: 'split', label: 'Split',
    draw(ctx, o, a, W, H) {
      drawBackground(ctx, o, a, W, H);
      const pw = Math.round(W * 0.4);
      ctx.fillStyle = o.accentColor;
      ctx.fillRect(0, 0, pw, H);
      // Left panel: logo (or a monogram) with the site name under it, centred as one block
      const on = onColor(o.accentColor);
      const site = (o.site || '').trim();
      const markH = a.logo ? logoSize(a.logo, Math.max(o.logoSize, 120)).h : 132;
      const blockH = markH + (site ? 26 + 40 : 0);
      let y = (H - blockH) / 2;
      if (a.logo) {
        const { w } = logoSize(a.logo, Math.max(o.logoSize, 120));
        drawLogo(ctx, a.logo, pw / 2 - w / 2, y + markH / 2, Math.max(o.logoSize, 120));
      } else {
        ctx.fillStyle = rgba(on, 0.16);
        ctx.beginPath(); ctx.arc(pw / 2, y + 66, 66, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = on;
        ctx.font = fontCss(o.headingFont, 800, 64);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText((site.replace(/^https?:\/\/(www\.)?/, '')[0] || 'O').toUpperCase(), pw / 2, y + 70);
      }
      if (site) {
        ctx.fillStyle = on;
        ctx.font = fontCss(o.headingFont, 700, 34);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        let label = site;
        while (label.length > 4 && ctx.measureText(label).width > pw - 60) label = label.slice(0, -2) + '…';
        ctx.fillText(label, pw / 2, y + markH + 26 + 20);
      }
      ctx.textAlign = 'left';
      // Right panel
      const x = pw + 64, w = W - pw - 128;
      const hasAuthor = !!plainText(o.author).trim();
      const info = drawStack(ctx, o, { x, w, top: P, bottom: hasAuthor ? H - 140 : H - P, titleMax: Math.min(o.titleSize, 64) });
      if (hasAuthor) drawAuthor(ctx, o, a, x, H - 76, o.textColor);
      return info;
    },
  },
  {
    id: 'blog', label: 'Blog Post',
    draw(ctx, o, a, W, H) {
      drawBackground(ctx, o, a, W, H);
      ctx.fillStyle = o.accentColor;
      ctx.fillRect(0, H - 10, W, 10);
      // Top row: logo + site name
      let x = P;
      const topY = P + 6;
      if (a.logo) x += drawLogo(ctx, a.logo, x, topY, 44) + 16;
      if ((o.site || '').trim()) {
        ctx.font = fontCss(o.bodyFont, 600, 26);
        ctx.fillStyle = rgba(o.textColor, 0.8);
        ctx.textBaseline = 'middle';
        ctx.fillText(o.site.trim(), x, topY);
      }
      const hasAuthor = !!plainText(o.author).trim();
      const info = drawStack(ctx, o, { x: P, w: W - P * 2, top: P + 64, bottom: hasAuthor ? H - 150 : H - P, eyebrow: 'pill' });
      if (hasAuthor) drawAuthor(ctx, o, a, P, H - 86, o.textColor);
      return info;
    },
  },
  {
    id: 'card', label: 'Floating Card',
    draw(ctx, o, a, W, H) {
      // The outer area uses gradient end + accent; the card itself is the background colour
      drawBackground(ctx, o, a, W, H, { base: o.bg2, c2: o.accentColor, c3: o.bg1 });
      const m = H > 900 ? 72 : 46;
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.28)';
      ctx.shadowBlur = 48;
      ctx.shadowOffsetY = 18;
      ctx.fillStyle = o.bg1;
      rr(ctx, m, m, W - m * 2, H - m * 2, 30);
      ctx.fill();
      ctx.restore();
      const ip = m + 60;
      const f = hasFooter(o, a);
      const info = drawStack(ctx, o, { x: ip, w: W - ip * 2, top: m + 52, bottom: f ? H - m - 112 : H - m - 52 });
      if (f) drawFooter(ctx, o, a, { y: H - m - 60, left: ip, right: W - ip, color: o.textColor, siteColor: o.accentColor });
      return info;
    },
  },
  {
    id: 'minimal', label: 'Minimal',
    draw(ctx, o, a, W, H) {
      drawBackground(ctx, o, a, W, H);
      let x = P;
      if (a.logo) x += drawLogo(ctx, a.logo, x, P, 40) + 14;
      if ((o.site || '').trim()) {
        ctx.font = fontCss(o.bodyFont, 600, 24);
        ctx.fillStyle = rgba(o.textColor, 0.65);
        ctx.textBaseline = 'middle';
        ctx.fillText(o.site.trim(), x, P);
      }
      const hasAuthor = !!plainText(o.author).trim();
      const info = drawStack(ctx, o, { x: P, w: W - P * 2, top: P + 60, bottom: hasAuthor ? H - 150 : H - P, valign: 'bottom', titleMax: o.titleSize + 16 });
      if (hasAuthor) drawAuthor(ctx, o, a, P, H - 80, o.textColor);
      return info;
    },
  },
  {
    id: 'quote', label: 'Quote',
    draw(ctx, o, a, W, H) {
      drawBackground(ctx, o, a, W, H);
      ctx.fillStyle = o.accentColor;
      ctx.font = fontCss('georgia', 700, 280);
      ctx.textBaseline = 'top';
      ctx.fillText('“', P - 12, P - 70);
      const f = hasFooter(o, a);
      const info = drawStack(ctx, o, { x: P, w: W - P * 2, top: P + 96, bottom: f ? H - 140 : H - P, titleMax: Math.min(o.titleSize, 64), titleWeight: 700, eyebrow: 'none' });
      if (f) drawFooter(ctx, o, a, { y: H - 74, left: P, right: W - P, color: o.textColor, siteColor: o.accentColor });
      return info;
    },
  },
  {
    id: 'product', label: 'Product Launch',
    draw(ctx, o, a, W, H) {
      drawBackground(ctx, o, a, W, H);
      const R = Math.min(H * 0.3, 190);
      const cx = W - P - R, cy = H / 2;
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.9);
      glow.addColorStop(0, rgba(o.accentColor, 0.45));
      glow.addColorStop(1, rgba(o.accentColor, 0));
      ctx.fillStyle = glow;
      ctx.fillRect(cx - R * 2, cy - R * 2, R * 4, R * 4);
      if (a.logo) {
        ctx.fillStyle = rgba(onColor(o.bg1) === '#ffffff' ? '#ffffff' : '#0f172a', 0.06);
        ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = rgba(o.accentColor, 0.6);
        ctx.lineWidth = 3;
        ctx.stroke();
        const box = R * 1.05;
        const { w } = logoSize(a.logo, box);
        drawLogo(ctx, a.logo, cx - Math.min(w, R * 1.4) / 2, cy, Math.min(box, (R * 1.4 * box) / w));
      } else {
        for (let i = 3; i >= 1; i--) {
          ctx.strokeStyle = rgba(o.accentColor, 0.18 * i);
          ctx.lineWidth = 3;
          ctx.beginPath(); ctx.arc(cx, cy, (R * i) / 3, 0, Math.PI * 2); ctx.stroke();
        }
        ctx.fillStyle = o.accentColor;
        ctx.beginPath(); ctx.arc(cx, cy, R * 0.16, 0, Math.PI * 2); ctx.fill();
      }
      const w = W - P * 2 - R * 2 - 48;
      const info = drawStack(ctx, o, { x: P, w, top: P, bottom: H - 136, eyebrow: 'pill' });
      drawFooter(ctx, o, a, { y: H - 72, left: P, right: P + w, color: o.textColor, siteColor: o.accentColor, noLogo: true });
      return info;
    },
  },
  {
    id: 'docs', label: 'Docs',
    draw(ctx, o, a, W, H) {
      drawBackground(ctx, o, a, W, H);
      let x = P;
      if (a.logo) x += drawLogo(ctx, a.logo, x, P, 40) + 14;
      if ((o.site || '').trim()) {
        ctx.font = fontCss(o.headingFont, 700, 28);
        ctx.fillStyle = o.textColor;
        ctx.textBaseline = 'middle';
        ctx.fillText(o.site.trim(), x, P);
      }
      const info = drawStack(ctx, o, { x: P, w: W - P * 2, top: P + 62, bottom: H - 150 });
      ctx.fillStyle = rgba(o.textColor, 0.14);
      ctx.fillRect(P, H - 118, W - P * 2, 2);
      const hasAuthor = !!plainText(o.author).trim();
      if (hasAuthor) drawAuthor(ctx, o, a, P, H - 66, o.textColor);
      else if ((o.site || '').trim()) {
        ctx.font = fontCss(o.bodyFont, 600, 24);
        ctx.fillStyle = o.accentColor;
        ctx.textBaseline = 'middle';
        ctx.fillText(`Read the docs at ${o.site.trim()} →`, P, H - 66);
      }
      return info;
    },
  },
  {
    id: 'event', label: 'Event',
    draw(ctx, o, a, W, H) {
      drawBackground(ctx, o, a, W, H);
      const S = Math.min(H - P * 2, 250);
      const by = (H - S) / 2 - (H > 900 ? 0 : 20);
      ctx.fillStyle = o.accentColor;
      rr(ctx, P, by, S, S, 30);
      ctx.fill();
      // The eyebrow (e.g. "OCT 24") fills the date block
      const label = plainText(o.eyebrow).trim().toUpperCase() || 'EVENT';
      const words = parseRich(label);
      let size = 64, lines;
      for (; size >= 22; size -= 2) {
        ctx.font = fontCss(o.headingFont, 800, size);
        lines = wrapRich(ctx, words, S - 40);
        if (lines.length * size * 1.1 <= S - 40 && lines.length <= 3) break;
      }
      ctx.font = fontCss(o.headingFont, 800, size);
      const lh = size * 1.1;
      drawLines(ctx, lines, { x: P + S / 2, y: by + (S - lines.length * lh) / 2, lineH: lh, size, align: 'center', color: onColor(o.accentColor), hiColor: onColor(o.accentColor) });
      const x = P + S + 56;
      const f = hasFooter(o, a);
      const info = drawStack(ctx, o, { x, w: W - x - P, top: P, bottom: f ? H - 136 : H - P, eyebrow: 'none', titleMax: Math.min(o.titleSize, 66) });
      if (f) drawFooter(ctx, o, a, { y: H - 72, left: x, right: W - P, color: o.textColor, siteColor: o.accentColor });
      return info;
    },
  },
  {
    id: 'framed', label: 'Framed',
    draw(ctx, o, a, W, H) {
      drawBackground(ctx, o, a, W, H);
      ctx.strokeStyle = o.accentColor;
      ctx.lineWidth = 14;
      rr(ctx, 30, 30, W - 60, H - 60, 26);
      ctx.stroke();
      const f = hasFooter(o, a);
      const info = drawStack(ctx, o, { x: W / 2, w: W - (P + 50) * 2, top: P + 20, bottom: f ? H - 156 : H - P - 20, align: 'center' });
      if (f) drawFooter(ctx, o, a, { y: H - 96, left: P, right: W - P, align: 'center', color: o.textColor, siteColor: o.accentColor });
      return info;
    },
  },
  {
    id: 'diagonal', label: 'Diagonal',
    draw(ctx, o, a, W, H) {
      drawBackground(ctx, o, a, W, H);
      ctx.fillStyle = rgba(o.bg2, 0.9);
      ctx.beginPath();
      ctx.moveTo(W * 0.6, 0); ctx.lineTo(W * 0.645, 0); ctx.lineTo(W * 0.785, H); ctx.lineTo(W * 0.74, H);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = o.accentColor;
      ctx.beginPath();
      ctx.moveTo(W * 0.67, 0); ctx.lineTo(W, 0); ctx.lineTo(W, H); ctx.lineTo(W * 0.81, H);
      ctx.closePath(); ctx.fill();
      if (a.logo) {
        const box = Math.min(130, H * 0.22);
        const { w } = logoSize(a.logo, box);
        drawLogo(ctx, a.logo, W * 0.86 - w / 2, H / 2, box);
      }
      const w = W * 0.6 - P - 40;
      const f = hasFooter(o, a);
      const info = drawStack(ctx, o, { x: P, w, top: P, bottom: f ? H - 136 : H - P });
      if (f) drawFooter(ctx, o, a, { y: H - 72, left: P, right: P + w, color: o.textColor, siteColor: o.accentColor, noLogo: true });
      return info;
    },
  },
];
const TEMPLATE_BY_ID = new Map(TEMPLATES.map(t => [t.id, t]));
export const hasTemplate = id => TEMPLATE_BY_ID.has(id);

/** Draws a full design at W×H into ctx (caller sets any scale). Returns layout info. */
export function drawDesign(ctx, o, assets, W, H) {
  const t = TEMPLATE_BY_ID.get(o.template) || TEMPLATES[0];
  ctx.save();
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.globalAlpha = 1;
  ctx.clearRect(0, 0, W, H);
  let info;
  try { info = t.draw(ctx, o, assets || {}, W, H) || {}; }
  finally { ctx.restore(); }
  return info;
}

/* ── Palettes ────────────────────────────────────────────────────────────────── */
export const PALETTES = [
  { name: 'Indigo',   bg1: '#ffffff', bg2: '#e0e7ff', textColor: '#0f172a', accentColor: '#6366f1' },
  { name: 'Midnight', bg1: '#0b1020', bg2: '#1e293b', textColor: '#f8fafc', accentColor: '#38bdf8' },
  { name: 'Grape',    bg1: '#1e1033', bg2: '#4c1d95', textColor: '#faf5ff', accentColor: '#c084fc' },
  { name: 'Sunset',   bg1: '#fff7ed', bg2: '#fed7aa', textColor: '#431407', accentColor: '#ea580c' },
  { name: 'Forest',   bg1: '#052e16', bg2: '#14532d', textColor: '#ecfdf5', accentColor: '#4ade80' },
  { name: 'Rose',     bg1: '#fff1f2', bg2: '#fecdd3', textColor: '#4c0519', accentColor: '#e11d48' },
  { name: 'Ocean',    bg1: '#ecfeff', bg2: '#a5f3fc', textColor: '#083344', accentColor: '#0891b2' },
  { name: 'Carbon',   bg1: '#111111', bg2: '#262626', textColor: '#fafafa', accentColor: '#facc15' },
  { name: 'Mono',     bg1: '#ffffff', bg2: '#e4e4e7', textColor: '#09090b', accentColor: '#09090b' },
  { name: 'Mint',     bg1: '#f0fdf4', bg2: '#bbf7d0', textColor: '#14532d', accentColor: '#16a34a' },
  { name: 'Coral',    bg1: '#1f2937', bg2: '#374151', textColor: '#f9fafb', accentColor: '#fb7185' },
  { name: 'Sand',     bg1: '#faf7f2', bg2: '#efe6d8', textColor: '#3b2f20', accentColor: '#b45309' },
];
