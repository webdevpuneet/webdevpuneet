/* SVG artwork library: decorative layers any section can switch on (roadmap "SVG artwork
   layer"; user rule: SVG wherever possible, so art follows the theme and GSAP can animate it).

   A section's state may carry
     art: { id, color, strength, pos, anim }
   id        an artwork below
   color     'brand' | 'text' | 'muted' | 'surface'  (CSS variable, so it follows every preset)
   strength  '8' | '15' | '30' | '100'              (opacity %, 100 = solid, for dividers)
   pos       'top' | 'bottom'                       (edge artworks only)
   anim      '' | 'float' | 'draw' | 'parallax' | 'spin'  (only what the artwork supports)

   It renders as <div class="st-art" aria-hidden="true"><svg>…</svg></div>, the first child
   of the <section>, painted behind the content (z-index -1 inside an isolated section). Every
   shape uses currentColor, which .st-art sets from the chosen colour. ART_CSS and ART_RUNTIME
   are only added to a page when a section uses artwork, so other exports don't change.
   SVG ids are suffixed with a key (section uid / template id) so several can share a page. */

export const ART_COLORS = [['brand', 'Brand'], ['text', 'Text'], ['muted', 'Muted'], ['surface', 'Cards']];
export const ART_STRENGTHS = [['8', 'Subtle'], ['15', 'Light'], ['30', 'Medium'], ['100', 'Solid']];
export const ART_ANIMS = { float: 'Float', draw: 'Draw on scroll', parallax: 'Parallax', spin: 'Spin' };

const f = n => Math.round(n * 10) / 10;
// A wavy closed loop around (cx, cy): radius r, `bumps` waves of height `amp`
const loop = (cx, cy, r, bumps, amp, phase = 0) => {
  const pts = [];
  for (let i = 0; i <= 72; i++) {
    const a = (i / 72) * Math.PI * 2;
    const rr = r + Math.sin(a * bumps + phase) * amp;
    pts.push(`${f(cx + Math.cos(a) * rr)} ${f(cy + Math.sin(a) * rr * 0.62)}`);
  }
  return `M${pts.join(' L')}Z`;
};
const star = (x, y, s) => `M${x} ${y - s} C${x + s * 0.15} ${y - s * 0.15} ${x + s * 0.15} ${y - s * 0.15} ${x + s} ${y} C${x + s * 0.15} ${y + s * 0.15} ${x + s * 0.15} ${y + s * 0.15} ${x} ${y + s} C${x - s * 0.15} ${y + s * 0.15} ${x - s * 0.15} ${y + s * 0.15} ${x - s} ${y} C${x - s * 0.15} ${y - s * 0.15} ${x - s * 0.15} ${y - s * 0.15} ${x} ${y - s}Z`;

/* Each artwork: label, kind (background | divider), layout (cover | edge | corner), the
   animations it supports, and svg(key) → markup. */
export const ARTWORKS = [
  { id: 'dots', label: 'Dot grid', kind: 'background', layout: 'cover', anims: ['parallax'],
    svg: k => `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"><defs><pattern id="art-dots-${k}" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.8" fill="currentColor"/></pattern></defs><rect width="1200" height="800" fill="url(#art-dots-${k})"/></svg>` },
  { id: 'grid', label: 'Grid lines', kind: 'background', layout: 'cover', anims: ['parallax'],
    svg: k => `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"><defs><pattern id="art-grid-${k}" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="currentColor" stroke-width="1"/></pattern></defs><rect width="1200" height="800" fill="url(#art-grid-${k})"/></svg>` },
  { id: 'stripes', label: 'Diagonal stripes', kind: 'background', layout: 'cover', anims: ['parallax'],
    svg: k => `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"><defs><pattern id="art-stripes-${k}" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="7" height="22" fill="currentColor"/></pattern></defs><rect width="1200" height="800" fill="url(#art-stripes-${k})"/></svg>` },
  { id: 'blobs', label: 'Soft blobs', kind: 'background', layout: 'cover', anims: ['float', 'parallax'],
    svg: k => `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"><defs><filter id="art-blur-${k}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="60"/></filter></defs><g filter="url(#art-blur-${k})" fill="currentColor"><circle data-float cx="180" cy="160" r="190"/><circle data-float cx="1040" cy="260" r="220"/><circle data-float cx="640" cy="720" r="200"/></g></svg>` },
  { id: 'glow', label: 'Glow', kind: 'background', layout: 'cover', anims: ['float'],
    svg: k => `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"><defs><radialGradient id="art-glow-${k}"><stop offset="0" stop-color="currentColor"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><ellipse data-float cx="600" cy="80" rx="620" ry="380" fill="url(#art-glow-${k})"/><ellipse data-float cx="1100" cy="760" rx="420" ry="300" fill="url(#art-glow-${k})"/></svg>` },
  { id: 'topo', label: 'Topographic lines', kind: 'background', layout: 'cover', anims: ['draw', 'parallax'],
    svg: () => `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"><g fill="none" stroke="currentColor" stroke-width="1.6">${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path data-draw d="${loop(860, 420, 70 + i * 62, 5, 10 + i * 3, i * 0.5)}"/>`).join('')}${[0, 1, 2, 3].map(i => `<path data-draw d="${loop(160, 120, 40 + i * 55, 4, 8 + i * 2, i)}"/>`).join('')}</g></svg>` },
  { id: 'rings', label: 'Concentric rings', kind: 'background', layout: 'corner', anims: ['spin', 'draw', 'float'],
    svg: () => `<svg viewBox="0 0 600 600"><g data-spin fill="none" stroke="currentColor" stroke-width="2">${[0, 1, 2, 3, 4, 5].map(i => `<circle data-draw cx="300" cy="300" r="${60 + i * 42}" ${i % 2 ? 'stroke-dasharray="10 14"' : ''}/>`).join('')}<circle cx="300" cy="300" r="10" fill="currentColor"/></g></svg>` },
  // Two fixed-size corner pieces (top right, bottom left), so the arcs show at any section height
  { id: 'arcs', label: 'Corner arcs', kind: 'background', layout: 'corners', anims: ['draw', 'float'],
    svg: () => [0, 1].map(c => `<svg viewBox="0 0 300 300"><g fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round">${[0, 1, 2].map(i => `<path data-draw data-float d="M${300 - 90 - i * 70} 0 A${90 + i * 70} ${90 + i * 70} 0 0 0 300 ${90 + i * 70}"/>`).join('')}</g></svg>`).join('') },
  { id: 'sparkles', label: 'Sparkles', kind: 'background', layout: 'cover', anims: ['float', 'spin'],
    svg: () => `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"><g fill="currentColor">${[[120, 140, 22], [340, 620, 14], [560, 90, 12], [820, 680, 20], [1020, 180, 26], [1120, 520, 12], [240, 380, 10], [700, 380, 9], [920, 420, 14], [460, 300, 8]].map(([x, y, s]) => `<path data-float data-spin d="${star(x, y, s)}"/>`).join('')}</g></svg>` },
  { id: 'squiggle', label: 'Squiggle line', kind: 'background', layout: 'cover', anims: ['draw', 'float'],
    svg: () => `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"><path data-draw data-float d="M-40 560 C120 420 220 700 380 560 S640 360 800 520 S1080 700 1240 380" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round"/><path data-draw d="M-40 200 C200 120 300 300 520 220 S900 80 1240 160" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-dasharray="2 16"/></svg>` },
  { id: 'waves', label: 'Layered waves', kind: 'background', layout: 'edge', h: '45%', anims: ['float'],
    svg: () => `<svg viewBox="0 0 1440 320" preserveAspectRatio="none"><path data-float fill="currentColor" opacity=".35" d="M0 120 C240 60 480 200 720 150 S1200 40 1440 110 V320 H0Z"/><path data-float fill="currentColor" opacity=".6" d="M0 190 C260 130 520 250 760 200 S1220 120 1440 180 V320 H0Z"/><path fill="currentColor" d="M0 250 C300 200 560 300 820 260 S1240 210 1440 250 V320 H0Z"/></svg>` },
  { id: 'divider-wave', label: 'Wave edge', kind: 'divider', layout: 'edge', h: 'clamp(40px,6cqi,96px)', anims: [],
    svg: () => `<svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path fill="currentColor" d="M0 40 C240 100 480 0 720 40 S1200 100 1440 40 V100 H0Z"/></svg>` },
  { id: 'divider-curve', label: 'Curve edge', kind: 'divider', layout: 'edge', h: 'clamp(40px,6cqi,96px)', anims: [],
    svg: () => `<svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path fill="currentColor" d="M0 100 Q720 -60 1440 100Z"/></svg>` },
  { id: 'divider-tilt', label: 'Tilted edge', kind: 'divider', layout: 'edge', h: 'clamp(32px,5cqi,80px)', anims: [],
    svg: () => `<svg viewBox="0 0 1440 100" preserveAspectRatio="none"><path fill="currentColor" d="M0 100 L1440 0 V100Z"/></svg>` },
  { id: 'divider-zigzag', label: 'Zigzag edge', kind: 'divider', layout: 'edge', h: 'clamp(16px,2cqi,28px)', anims: [],
    svg: () => `<svg viewBox="0 0 1440 40" preserveAspectRatio="none"><path fill="currentColor" d="M0 40 ${Array.from({ length: 48 }, (_, i) => `L${i * 30 + 15} 0 L${(i + 1) * 30} 40`).join(' ')} Z"/></svg>` },
];
export const artworkById = id => ARTWORKS.find(a => a.id === id);

/** A saved artwork setting made safe, or undefined for none */
export function cleanArt(a) {
  const art = a && artworkById(a.id);
  if (!art) return undefined;
  return {
    id: art.id,
    color: ART_COLORS.some(([v]) => v === a.color) ? a.color : 'brand',
    strength: ART_STRENGTHS.some(([v]) => v === String(a.strength)) ? String(a.strength) : (art.kind === 'divider' ? '100' : '15'),
    ...(art.layout === 'edge' ? { pos: a.pos === 'top' ? 'top' : 'bottom' } : {}),
    ...(art.anims.includes(a.anim) ? { anim: a.anim } : {}),
  };
}

/** Default settings when an artwork is picked */
export const newArt = id => cleanArt({ id, color: 'brand', strength: artworkById(id)?.kind === 'divider' ? '100' : '15', pos: 'bottom', anim: '' });

/** The artwork layer for a section ('' when it has none); key keeps SVG ids unique */
export function artMarkup(art, key = 'a') {
  const a = cleanArt(art);
  if (!a) return '';
  const def = artworkById(a.id);
  const k = String(key).replace(/[^\w-]/g, '').slice(0, 24) || 'a';
  const cls = def.layout === 'edge' ? `st-art st-art--${a.pos}` : def.layout === 'corner' ? 'st-art st-art--corner' : def.layout === 'corners' ? 'st-art st-art--corners' : 'st-art';
  const style = `color:var(--st-${a.color === 'surface' ? 'surface' : a.color === 'brand' ? 'brand' : a.color});opacity:${Number(a.strength) / 100}${def.h ? `;--st-art-h:${def.h}` : ''}`;
  return `<div class="${cls}" aria-hidden="true" style="${style}"${a.anim ? ` data-art-anim="${a.anim}"` : ''}>${def.svg(k)}</div>\n`;
}

/** CSS for artwork layers (added once to pages that use artwork) */
export const ART_CSS = `.st:has(>.st-art){isolation:isolate}
.st-art{position:absolute;inset:0;z-index:-1;overflow:hidden;pointer-events:none}
.st-art>svg{position:absolute;top:0;left:0;display:block;width:100%;height:100%}
.st-art--bottom>svg{top:auto;bottom:-1px;height:var(--st-art-h,80px)}
.st-art--top>svg{top:-1px;bottom:auto;height:var(--st-art-h,80px);transform:scaleY(-1)}
.st-art--corner>svg{top:-12%;right:-8%;left:auto;width:min(58%,620px);height:auto}
.st-art--corners>svg{top:0;right:0;left:auto;width:clamp(140px,22cqi,300px);height:auto}
.st-art--corners>svg+svg{top:auto;right:auto;bottom:0;left:0;transform:rotate(180deg)}`;

/* The animation runtime: float (gentle drift), draw (stroke drawn on scroll), parallax
   (the layer drifts slower than the page), spin (slow rotation). Exports and ▶ Play only;
   off for reduced motion and while editing (window.ST_STILL). */
export const ART_RUNTIME = `(function () {
  var G = window.gsap, reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!G || reduce || window.ST_STILL) return;
  if (window.ScrollTrigger) G.registerPlugin(ScrollTrigger);
  document.querySelectorAll('.st-art[data-art-anim]').forEach(function (layer) {
    var mode = layer.getAttribute('data-art-anim'), sec = layer.closest('.st'), svg = layer.querySelector('svg');
    if (mode === 'float') layer.querySelectorAll('[data-float]').forEach(function (el, i) {
      G.to(el, { x: (i % 3 - 1) * 24, y: (i % 2 ? -1 : 1) * 22, duration: 5 + (i % 3), ease: 'sine.inOut', yoyo: true, repeat: -1, delay: i * 0.4 });
    });
    if (mode === 'spin') layer.querySelectorAll('[data-spin]').forEach(function (el, i) {
      G.to(el, { rotation: i % 2 ? -360 : 360, duration: 60 + i * 8, ease: 'none', repeat: -1, transformOrigin: '50% 50%' });
    });
    if (mode === 'draw' && window.ScrollTrigger) layer.querySelectorAll('[data-draw]').forEach(function (p, i) {
      var len = p.getTotalLength ? p.getTotalLength() : 0;
      if (!len) return;
      G.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: sec, start: 'top 90%', end: 'bottom 40%', scrub: 0.6 } });
    });
    if (mode === 'parallax' && window.ScrollTrigger && svg) {
      G.set(svg, { scale: 1.15 });
      G.fromTo(svg, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true } });
    }
  });
})();`;

/** Thumbnail for the picker: the artwork at a visible strength */
export const artPreview = (id, key = 'p') => artworkById(id)?.svg(`${key}-${id}`) || '';
