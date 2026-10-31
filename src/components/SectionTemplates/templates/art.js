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
   SVG ids are suffixed with a key (section uid / template id) so several can share a page.

   Your own artwork (id 'custom'): an SVG the person uploads or pastes, cleaned to plain
   shapes in the browser (importArtSvg in panels.js) and checked again here with the icon
   whitelist (safeBody), stored inside the design so exports work offline:
     art: { id: 'custom', name, vb, body, layout: 'cover' | 'corner', recolor, color, strength, anim }
   recolor   true: every fill / stroke / stop colour becomes the theme colour (currentColor)
   Its shapes sit in one <g data-float data-spin>, so float and spin move the whole drawing. */
import { safeBody } from './icon-lib.js';

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
const BASE_ARTWORKS = [
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

/* More artwork. Scattered shapes use a seeded random, so they look the same in every preview,
   export and undo step. Patterns repeat a small tile; dividers are 1440 x 100 edges. */
const rng = seed => () => { seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
const scatter = (n, seed, make) => { const r = rng(seed); return Array.from({ length: n }, (_, i) => make(r, i)).join(''); };
const SK = 'fill="none" stroke="currentColor"';
const tile = (id, w, h, inner) => ({ svg: k => `<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice"><defs><pattern id="art-${id}-${k}" width="${w}" height="${h}" patternUnits="userSpaceOnUse">${inner}</pattern></defs><rect width="1200" height="800" fill="url(#art-${id}-${k})"/></svg>` });
const pattern = (id, label, w, h, inner, tags = '') => ({ id, label, cat: 'Patterns', tags, kind: 'background', layout: 'cover', anims: ['parallax'], ...tile(id, w, h, inner) });
const divider = (id, label, d, tags = '', vb = '0 0 1440 100') => ({ id: `divider-${id}`, label, cat: 'Edges', tags: `divider section edge ${tags}`, kind: 'divider', layout: 'edge', h: 'clamp(40px,6cqi,96px)', anims: [],
  svg: () => `<svg viewBox="${vb}" preserveAspectRatio="none">${d}</svg>` });
const bg = (id, label, cat, anims, svg, tags = '', layout = 'cover', extra = {}) => ({ id, label, cat, tags, kind: 'background', layout, anims, svg, ...extra });
const view = '<svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">';

const MORE_ARTWORKS = [
  pattern('plus', 'Plus signs', 40, 40, `<path d="M20 14v12M14 20h12" ${SK} stroke-width="2" stroke-linecap="round"/>`, 'cross crosses'),
  pattern('polka', 'Polka dots', 64, 64, '<circle cx="16" cy="16" r="6" fill="currentColor"/><circle cx="48" cy="48" r="6" fill="currentColor"/>', 'dots spots'),
  pattern('checker', 'Checkerboard', 48, 48, '<rect width="24" height="24" fill="currentColor"/><rect x="24" y="24" width="24" height="24" fill="currentColor"/>', 'squares chess'),
  pattern('hex', 'Hexagons', 56, 100, `<path d="M28 66L0 50V16L28 0l28 16v34L28 66v34" ${SK} stroke-width="2"/><path d="M28 0v34L0 50v34l28 16 28-16V50L28 34" ${SK} stroke-width="2"/>`, 'honeycomb'),
  pattern('triangles', 'Triangles', 48, 42, `<path d="M24 4l20 34H4Z" ${SK} stroke-width="2" stroke-linejoin="round"/>`),
  pattern('diamonds', 'Diamonds', 40, 40, `<path d="M20 4l16 16-16 16L4 20Z" ${SK} stroke-width="1.6"/>`, 'rhombus'),
  pattern('overlap', 'Overlapping circles', 40, 40, `<g ${SK} stroke-width="1.6"><circle cx="0" cy="0" r="20"/><circle cx="40" cy="0" r="20"/><circle cx="0" cy="40" r="20"/><circle cx="40" cy="40" r="20"/><circle cx="20" cy="20" r="20"/></g>`, 'scales rings'),
  pattern('crosshatch', 'Crosshatch', 20, 20, '<path d="M0 0l20 20M20 0L0 20" stroke="currentColor" stroke-width="1.2"/>', 'lines diagonal'),
  pattern('rules', 'Horizontal lines', 24, 24, '<path d="M0 12h24" stroke="currentColor" stroke-width="1.4"/>', 'stripes rules ruled'),
  pattern('ripples', 'Wavy lines', 40, 16, `<path d="M0 8Q10 0 20 8T40 8" ${SK} stroke-width="1.6"/>`, 'waves'),

  bg('circles', 'Outlined circles', 'Shapes', ['float', 'parallax'], () => `${view}<g ${SK} stroke-width="2">${scatter(9, 11, r => `<circle data-float cx="${f(80 + r() * 1040)}" cy="${f(60 + r() * 680)}" r="${f(30 + r() * 110)}"/>`)}</g></svg>`, 'rings bubbles'),
  bg('bubbles', 'Bubbles', 'Shapes', ['float', 'parallax'], () => `${view}<g fill="currentColor">${scatter(16, 7, (r, i) => { const c = `cx="${f(40 + r() * 1120)}" cy="${f(40 + r() * 720)}" r="${f(10 + r() * 46)}"`; return i % 3 ? `<circle data-float ${c} opacity="${f(0.3 + r() * 0.5)}"/>` : `<circle data-float ${c} fill="none" stroke="currentColor" stroke-width="2"/>`; })}</g></svg>`, 'circles dots'),
  bg('confetti', 'Confetti', 'Shapes', ['float', 'spin'], () => `${view}<g fill="currentColor">${scatter(40, 3, (r, i) => { const x = f(30 + r() * 1140), y = f(30 + r() * 740); return i % 3 === 0 ? `<circle data-float cx="${x}" cy="${y}" r="${f(6 + r() * 6)}"/>` : `<rect data-float data-spin x="${x}" y="${y}" width="${f(18 + r() * 14)}" height="${f(8 + r() * 6)}" rx="2" transform="rotate(${Math.round(r() * 180)} ${x} ${y})"/>`; })}</g></svg>`, 'party celebration'),
  bg('starfield', 'Starfield', 'Shapes', ['float'], () => `${view}<g fill="currentColor">${scatter(70, 21, (r, i) => `<circle${i % 6 === 0 ? ' data-float' : ''} cx="${f(r() * 1200)}" cy="${f(r() * 800)}" r="${f(1.4 + r() * 2.6)}"/>`)}</g></svg>`, 'stars night space dots'),
  bg('beams', 'Light beams', 'Shapes', ['float'], k => `${view}<defs><linearGradient id="art-beams-${k}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="currentColor"/><stop offset="1" stop-color="currentColor" stop-opacity="0"/></linearGradient></defs><g fill="url(#art-beams-${k})">${[-48, -32, -16, 0, 16, 32, 48].map(a => `<polygon data-float points="590,-20 610,-20 ${f(600 + Math.tan((a + 6) * Math.PI / 180) * 820)},800 ${f(600 + Math.tan((a - 6) * Math.PI / 180) * 820)},800"/>`).join('')}</g></svg>`, 'rays spotlight stage'),
  bg('sunburst', 'Sunburst', 'Shapes', ['spin'], () => `${view}<g data-spin fill="currentColor">${Array.from({ length: 12 }, (_, i) => { const a1 = (i * 30 - 7.5) * Math.PI / 180, a2 = (i * 30 + 7.5) * Math.PI / 180; return `<path d="M600 400L${f(600 + Math.cos(a1) * 1200)} ${f(400 + Math.sin(a1) * 1200)}L${f(600 + Math.cos(a2) * 1200)} ${f(400 + Math.sin(a2) * 1200)}Z"/>`; }).join('')}</g></svg>`, 'rays retro radial'),
  bg('aurora', 'Aurora', 'Shapes', ['float', 'parallax'], k => `${view}<defs><filter id="art-aurora-${k}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="70"/></filter></defs><g filter="url(#art-aurora-${k})" fill="currentColor"><ellipse data-float cx="300" cy="260" rx="420" ry="110" transform="rotate(-18 300 260)"/><ellipse data-float cx="820" cy="520" rx="460" ry="120" transform="rotate(-18 820 520)" opacity=".7"/><ellipse data-float cx="1050" cy="150" rx="300" ry="80" transform="rotate(-18 1050 150)" opacity=".5"/></g></svg>`, 'glow gradient northern lights soft'),
  bg('orbits', 'Orbits', 'Shapes', ['spin', 'draw', 'float'], () => `<svg viewBox="0 0 600 600"><g data-spin>${[[-25, 260, 110], [35, 210, 80], [100, 150, 60]].map(([rot, rx, ry]) => `<g transform="rotate(${rot} 300 300)"><ellipse data-draw cx="300" cy="300" rx="${rx}" ry="${ry}" ${SK} stroke-width="2"/><circle cx="${300 + rx}" cy="300" r="9" fill="currentColor"/></g>`).join('')}</g></svg>`, 'planets atom space', 'corner'),
  bg('blob-outline', 'Blob outline', 'Shapes', ['draw', 'float', 'spin'], () => `<svg viewBox="0 0 600 600"><g data-spin ${SK} stroke-width="2.5"><path data-draw data-float d="${loop(300, 300, 230, 3, 34, 0.4)}"/><path data-draw data-float d="${loop(300, 300, 170, 3, 26, 1.2)}"/></g></svg>`, 'organic shape', 'corner'),
  bg('ribbons', 'Ribbons', 'Lines', ['draw', 'float'], () => `${view}<g ${SK} stroke-linecap="round">${[[26, 'M-40 480C200 280 380 700 640 520S1040 260 1240 400', 0.5], [16, 'M-40 570C240 380 420 760 680 610S1060 350 1240 490', 0.75], [8, 'M-40 650C260 470 440 810 700 690S1080 440 1240 570', 1]].map(([w, d, o]) => `<path data-draw data-float d="${d}" stroke-width="${w}" opacity="${o}"/>`).join('')}</g></svg>`, 'flow curves'),
  bg('flow', 'Flow lines', 'Lines', ['draw', 'parallax'], () => `${view}<g ${SK} stroke-width="1.5">${Array.from({ length: 16 }, (_, i) => `<path data-draw d="M-40 ${180 + i * 26}C300 ${60 + i * 26} 600 ${400 + i * 26} 1240 ${200 + i * 26}"/>`).join('')}</g></svg>`, 'waves curves stream'),
  bg('corner-dots', 'Corner dots', 'Patterns', ['parallax'], () => [0, 1].map(() => `<svg viewBox="0 0 300 300"><g fill="currentColor">${Array.from({ length: 8 }, (_, j) => Array.from({ length: 8 - j }, (_, i) => `<circle cx="${286 - i * 30}" cy="${14 + j * 30}" r="3"/>`).join('')).join('')}</g></svg>`).join(''), 'dots triangle', 'corners'),
  bg('corner-squares', 'Corner squares', 'Lines', ['draw', 'float'], () => [0, 1].map(() => `<svg viewBox="0 0 300 300"><g ${SK} stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${[0, 1, 2, 3].map(i => `<path data-draw data-float d="M${230 - i * 60} 0V${70 + i * 60}H300"/>`).join('')}</g></svg>`).join(''), 'square corner frame', 'corners'),

  divider('scallop', 'Scallop edge', `<path fill="currentColor" d="M0 100V56${' a30 30 0 0 1 60 0'.repeat(24)}V100Z"/>`, 'bumps'),
  divider('clouds', 'Cloud edge', `<path fill="currentColor" d="M0 100V60${' a32 32 0 0 1 64 0 a22 22 0 0 1 44 0'.repeat(13)}H1440V100Z"/>`, 'bumps sky'),
  divider('teeth', 'Triangle teeth', `<path fill="currentColor" d="M0 100V45${Array.from({ length: 18 }, (_, i) => ` L${i * 80 + 40} 0 L${(i + 1) * 80} 45`).join('')}V100Z"/>`, 'spikes sawtooth'),
  divider('steps', 'Stairs edge', '<path fill="currentColor" d="M0 100V90H240V70H480V50H720V30H960V10H1200V0H1440V100Z"/>', 'steps'),
  divider('peaks', 'Mountain peaks', '<path fill="currentColor" d="M0 100V70L180 20L300 60L480 5L700 65L900 25L1100 70L1260 30L1440 70V100Z"/>', 'mountains hills'),
  divider('dip', 'Dip edge', '<path fill="currentColor" d="M0 100V0Q720 130 1440 0V100Z"/>', 'curve smile'),
  divider('torn', 'Torn paper edge', `<path fill="currentColor" d="M0 100V30${(r => Array.from({ length: 72 }, (_, i) => ` L${(i + 1) * 20} ${f(12 + r() * 34)}`).join(''))(rng(5))}V100Z"/>`, 'rough ripped'),
  divider('double-wave', 'Double wave edge', '<path fill="currentColor" opacity=".4" d="M0 40C240 -10 480 90 720 40S1200 -10 1440 40V100H0Z"/><path fill="currentColor" d="M0 64C240 14 480 114 720 64S1200 14 1440 64V100H0Z"/>', 'waves layered'),
];

/* Picker category and search words for the first artworks */
const BASE_CATEGORY = { dots: 'Patterns', grid: 'Patterns', stripes: 'Patterns', blobs: 'Shapes', glow: 'Shapes', topo: 'Lines', rings: 'Shapes', arcs: 'Lines', sparkles: 'Shapes', squiggle: 'Lines', waves: 'Edges', 'divider-wave': 'Edges', 'divider-curve': 'Edges', 'divider-tilt': 'Edges', 'divider-zigzag': 'Edges' };
const BASE_TAGS = { dots: 'dots spots polka', grid: 'grid squares', stripes: 'lines diagonal', blobs: 'circles soft', glow: 'gradient light soft', topo: 'map contour lines', rings: 'circles', arcs: 'curves corner', sparkles: 'stars twinkle', squiggle: 'wave curve line', waves: 'sea water', 'divider-wave': 'divider section edge', 'divider-curve': 'divider section edge', 'divider-tilt': 'divider section edge slant', 'divider-zigzag': 'divider section edge' };
export const ARTWORKS = [...BASE_ARTWORKS, ...MORE_ARTWORKS].map(a => ({ ...a, cat: a.cat || BASE_CATEGORY[a.id] || 'Shapes', tags: a.tags || BASE_TAGS[a.id] || '' }));
export const artworkById = id => ARTWORKS.find(a => a.id === id);

/* ── Your own artwork ── */
export const ART_CUSTOM_MAX = 100000; // characters of cleaned SVG markup
export const CUSTOM_ART_LAYOUTS = [['cover', 'Fill the section'], ['corner', 'Corner']];
const CUSTOM_ANIMS = ['float', 'spin', 'parallax'];
/* Where artwork sits in its section (art.pos; left out when it is the default):
   cover   fill (default) | top | bottom | left | right   (that half of the section)
   corner  c (centre, the default for new artwork; art.x / art.y = its centre as % from the left / top, 50 when
           left out) | tr (what older designs have) | tl | br | bl
   corners tr + bl (default) | tl + br
   edge    top | bottom (always stored) */
export const ART_POSITIONS = {
  cover: [['', 'Fill'], ['top', 'Top'], ['bottom', 'Bottom'], ['left', 'Left'], ['right', 'Right']],
  corner: [['c', 'Center'], ['', 'Top right'], ['tl', 'Top left'], ['br', 'Bottom right'], ['bl', 'Bottom left']],
  corners: [['', 'Top right'], ['tl', 'Top left']],
};
const clampPct = v => Math.max(-50, Math.min(150, Math.round(Number(v))));
const cleanPos = (layout, a) => {
  const pos = a?.pos;
  if (!(ART_POSITIONS[layout] || []).some(([v]) => v && v === pos)) return {};
  if (pos !== 'c') return { pos };
  // Centre: the artwork's middle sits at x% from the left and y% from the top (50 / 50 = the middle)
  const x = Number.isFinite(Number(a.x)) && a.x !== '' && a.x != null ? clampPct(a.x) : 50;
  const y = Number.isFinite(Number(a.y)) && a.y !== '' && a.y != null ? clampPct(a.y) : 50;
  return { pos, ...(x !== 50 ? { x } : {}), ...(y !== 50 ? { y } : {}) };
};
const cleanViewBox = vb => {
  const n = String(vb || '').trim().split(/[\s,]+/).map(Number);
  return n.length === 4 && n.every(Number.isFinite) && n[2] > 0 && n[3] > 0 ? n.map(v => Math.round(v * 1000) / 1000).join(' ') : '';
};
const recolor = body => body.replace(/\b(fill|stroke|stop-color)="(?!none"|url\()[^"]*"/g, '$1="currentColor"');
const customDef = a => ({
  id: 'custom', label: a.name || 'Your artwork', kind: 'background', layout: a.layout, anims: CUSTOM_ANIMS,
  svg: () => `<svg viewBox="${a.vb}" preserveAspectRatio="${a.layout === 'cover' ? 'xMidYMid slice' : 'xMidYMid meet'}"><g data-float data-spin>${a.recolor ? recolor(a.body) : a.body}</g></svg>`,
});

/** A saved artwork setting made safe, or undefined for none */
export function cleanArt(a) {
  if (a?.id === 'custom') {
    const body = safeBody(a.body, ART_CUSTOM_MAX), vb = cleanViewBox(a.vb);
    if (!body || !vb) return undefined;
    return {
      id: 'custom', name: String(a.name || '').replace(/[<>"]/g, '').slice(0, 60), vb, body,
      layout: a.layout === 'corner' ? 'corner' : 'cover', recolor: a.recolor !== false,
      ...cleanPos(a.layout === 'corner' ? 'corner' : 'cover', a),
      color: ART_COLORS.some(([v]) => v === a.color) ? a.color : 'brand',
      strength: ART_STRENGTHS.some(([v]) => v === String(a.strength)) ? String(a.strength) : '15',
      ...(CUSTOM_ANIMS.includes(a.anim) ? { anim: a.anim } : {}),
    };
  }
  const art = a && artworkById(a.id);
  if (!art) return undefined;
  return {
    id: art.id,
    color: ART_COLORS.some(([v]) => v === a.color) ? a.color : 'brand',
    strength: ART_STRENGTHS.some(([v]) => v === String(a.strength)) ? String(a.strength) : (art.kind === 'divider' ? '100' : '15'),
    ...(art.layout === 'edge' ? { pos: a.pos === 'top' ? 'top' : 'bottom' } : cleanPos(art.layout, a)),
    ...(art.anims.includes(a.anim) ? { anim: a.anim } : {}),
  };
}

/** Default settings when an artwork is picked */
export const newArt = id => cleanArt({ id, color: 'brand', strength: artworkById(id)?.kind === 'divider' ? '100' : '15', pos: { corner: 'c', edge: 'bottom' }[artworkById(id)?.layout], anim: '' });

/** The artwork layer for a section ('' when it has none); key keeps SVG ids unique */
export function artMarkup(art, key = 'a') {
  const a = cleanArt(art);
  if (!a) return '';
  const def = a.id === 'custom' ? customDef(a) : artworkById(a.id);
  const k = String(key).replace(/[^\w-]/g, '').slice(0, 24) || 'a';
  const cls = def.layout === 'edge' ? `st-art st-art--${a.pos}` : def.layout === 'corner' ? 'st-art st-art--corner' : def.layout === 'corners' ? 'st-art st-art--corners' : 'st-art';
  const style = `color:var(--st-${a.color === 'surface' ? 'surface' : a.color === 'brand' ? 'brand' : a.color});opacity:${Number(a.strength) / 100}${def.h ? `;--st-art-h:${def.h}` : ''}${def.layout === 'corner' && a.pos === 'c' && (a.x != null || a.y != null) ? `;--art-x:${a.x ?? 50}%;--art-y:${a.y ?? 50}%` : ''}`;
  return `<div class="${cls}" aria-hidden="true" style="${style}"${def.layout !== 'edge' && a.pos ? ` data-pos="${a.pos}"` : ''}${a.anim ? ` data-art-anim="${a.anim}"` : ''}>${def.svg(k)}</div>\n`;
}

/** CSS for artwork layers (added once to pages that use artwork) */
export const ART_CSS = `.st:has(>.st-art){isolation:isolate}
.st-art{position:absolute;inset:0;z-index:-1;overflow:hidden;pointer-events:none}
.st-art>svg{position:absolute;top:0;left:0;display:block;width:100%;height:100%}
.st-art--bottom>svg{top:auto;bottom:-1px;height:var(--st-art-h,80px)}
.st-art--top>svg{top:-1px;bottom:auto;height:var(--st-art-h,80px);transform:scaleY(-1)}
.st-art--corner>svg{top:-12%;right:-8%;left:auto;width:min(58%,620px);height:auto}
.st-art--corners>svg{top:0;right:0;left:auto;width:clamp(140px,22cqi,300px);height:auto}
.st-art--corners>svg+svg{top:auto;right:auto;bottom:0;left:0;transform:rotate(180deg)}
.st-art[data-pos=top]{inset:0 0 50% 0}
.st-art[data-pos=bottom]{inset:50% 0 0 0}
.st-art[data-pos=left]{inset:0 50% 0 0}
.st-art[data-pos=right]{inset:0 0 0 50%}
.st-art--corner[data-pos=c]>svg{top:var(--art-y,50%);left:var(--art-x,50%);right:auto;bottom:auto;translate:-50% -50%}
.st-art--corner[data-pos=tl]>svg{right:auto;left:-8%}
.st-art--corner[data-pos=br]>svg{top:auto;bottom:-12%}
.st-art--corner[data-pos=bl]>svg{top:auto;right:auto;bottom:-12%;left:-8%}
.st-art--corners[data-pos=tl]>svg{right:auto;left:0;transform:scaleX(-1)}
.st-art--corners[data-pos=tl]>svg+svg{left:auto;right:0;transform:scaleY(-1)}`;

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
    // window.ST_ART_PLAY (the section editor's preview): draw and parallax play once by themselves,
    // so picking them shows the effect without scrolling. Exports and pages keep the scroll-driven version.
    if (mode === 'draw' && (window.ScrollTrigger || window.ST_ART_PLAY)) layer.querySelectorAll('[data-draw]').forEach(function (p, i) {
      var len = p.getTotalLength ? p.getTotalLength() : 0;
      if (!len) return;
      if (window.ST_ART_PLAY) G.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, duration: 2.4, delay: i * 0.12, ease: 'power2.out' });
      else G.fromTo(p, { strokeDasharray: len, strokeDashoffset: len }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: sec, start: 'top 90%', end: 'bottom 40%', scrub: 0.6 } });
    });
    if (mode === 'parallax' && svg && (window.ScrollTrigger || window.ST_ART_PLAY)) {
      G.set(svg, { scale: 1.15 });
      if (window.ST_ART_PLAY) G.fromTo(svg, { yPercent: -6 }, { yPercent: 6, duration: 2.4, ease: 'sine.inOut', yoyo: true, repeat: 1 });
      else G.fromTo(svg, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true } });
    }
  });
})();`;

/** Thumbnail for the picker: the artwork at a visible strength */
export const artPreview = (id, key = 'p') => artworkById(id)?.svg(`${key}-${id}`) || '';
