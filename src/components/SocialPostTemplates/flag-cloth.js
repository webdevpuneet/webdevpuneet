/* A waving flag drawn as one piece of cloth (SVG), for the National Day template.

   The cloth is a wavy surface: each stripe is a band between two wavy curves, so the colours bend with the ripple and
   there are no seams. Shading follows the slope of the wave: dark where the cloth tips away, light where it faces the
   viewer. The wave grows from nothing at the pole to its full height at the tip and runs along the flag as time passes.
   `flagMarkup()` gives the still picture for the template; `flagFrame(el, t)` redraws it at time t (seconds) for the
   live preview and the video export. */

const W = 570, H = 380, PAD = 30; // viewBox: 0 -30 570 440 (room above and below for the waves)
const N = 38; // samples along the flag
const STRIPES = 3;
const REST = 0.5; // the still picture shows the wave at this moment

const lift = (x, t) => {
  const k = x / W;
  return 15 * k * Math.sin(k * 7.2 - t * 3.2) + 3.2 * k * Math.sin(k * 15 - t * 5.1);
};
const slope = (x, t) => (lift(Math.min(W, x + 2), t) - lift(Math.max(0, x - 2), t)) / 4;
const f = v => (+v.toFixed(1)).toString();
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

function bandPath(i, t) {
  const top = [], bottom = [];
  const y0 = i * H / STRIPES, y1 = (i + 1) * H / STRIPES + (i < STRIPES - 1 ? 1.2 : 0); // a hairline of overlap hides the join
  for (let n = 0; n <= N; n++) {
    const x = W * n / N, d = lift(x, t);
    top.push(`${f(x)},${f(y0 + d)}`);
    bottom.push(`${f(x)},${f(y1 + d)}`);
  }
  return `M${top.join('L')}L${bottom.reverse().join('L')}Z`;
}
function clothPath(t) {
  const top = [], bottom = [];
  for (let n = 0; n <= N; n++) { const x = W * n / N, d = lift(x, t); top.push(`${f(x)},${f(d)}`); bottom.push(`${f(x)},${f(H + d)}`); }
  return `M${top.join('L')}L${bottom.reverse().join('L')}Z`;
}
function stops(t, light) {
  let out = '';
  for (let n = 0; n <= N; n++) {
    const s = slope(W * n / N, t);
    const o = light ? clamp(-s * 1.7, 0, 0.26) : clamp(s * 1.7, 0, 0.3);
    out += `<stop offset="${f(n / N * 100)}%" stop-opacity="${o.toFixed(3)}" stop-color="${light ? '#fff' : '#000'}"/>`;
  }
  return out;
}

const SPOKES = Array.from({ length: 24 }, (_, i) => {
  const a = i * Math.PI / 12;
  return `<line x1="${f(Math.cos(a) * 12)}" y1="${f(Math.sin(a) * 12)}" x2="${f(Math.cos(a) * 54)}" y2="${f(Math.sin(a) * 54)}"/>`;
}).join('');

/* The flag: stripes (filled from the template's colours), the wheel, and the shading on top. */
export function flagMarkup() {
  const t = REST, cy = H / 2 + lift(W / 2, t);
  return `<svg class="nd-cloth" viewBox="0 ${-PAD} ${W} ${H + PAD * 2}" aria-hidden="true" focusable="false">
  <defs><linearGradient id="ndg-s" gradientUnits="userSpaceOnUse" x1="0" x2="${W}" y1="0" y2="0">${stops(t, false)}</linearGradient><linearGradient id="ndg-h" gradientUnits="userSpaceOnUse" x1="0" x2="${W}" y1="0" y2="0">${stops(t, true)}</linearGradient></defs>
  <path data-fl="s0" class="nd-s1" d="${bandPath(0, t)}"/><path data-fl="s1" class="nd-s2" d="${bandPath(1, t)}"/><path data-fl="s2" class="nd-s3" d="${bandPath(2, t)}"/>
  <g data-fl="wheel" class="nd-wheel" transform="translate(${W / 2} ${f(cy)})"><circle r="58" fill="none" stroke-width="7"/><circle r="9" stroke="none"/>${SPOKES}</g>
  <path data-fl="cloth" d="${clothPath(t)}" fill="url(#ndg-s)" pointer-events="none"/><path data-fl="cloth2" d="${clothPath(t)}" fill="url(#ndg-h)" pointer-events="none"/>
</svg>`;
}

let uid = 0;
/* Redraws the flag inside `el` (the wrapper that holds the svg) at time t. Returns nothing; safe to call every frame. */
export function flagFrame(el, t, cache) {
  const svg = el.querySelector('svg.nd-cloth');
  if (!svg) return;
  if (!cache.nodes) {
    // Several posts can sit on one page with the same gradient ids; give this flag its own before it starts moving
    const id = `ndg${(uid += 1)}`;
    const [gs, gh] = svg.querySelectorAll('linearGradient');
    gs.id = `${id}s`; gh.id = `${id}h`;
    const q = k => svg.querySelector(`[data-fl="${k}"]`);
    q('cloth').setAttribute('fill', `url(#${gs.id})`); q('cloth2').setAttribute('fill', `url(#${gh.id})`);
    cache.nodes = { s: [q('s0'), q('s1'), q('s2')], wheel: q('wheel'), cloth: q('cloth'), cloth2: q('cloth2'), gs, gh, emblem: el.querySelector('.nd-emblem') };
  }
  const c = cache.nodes;
  c.s.forEach((p, i) => p.setAttribute('d', bandPath(i, t)));
  c.cloth.setAttribute('d', clothPath(t)); c.cloth2.setAttribute('d', clothPath(t));
  c.gs.innerHTML = stops(t, false); c.gh.innerHTML = stops(t, true);
  const cy = H / 2 + lift(W / 2, t);
  c.wheel.setAttribute('transform', `translate(${W / 2} ${f(cy)}) scale(${(1 - Math.abs(slope(W / 2, t)) * 0.25).toFixed(3)} 1)`);
  if (c.emblem) c.emblem.style.translate = `0 ${((cy - H / 2) * svg.getBoundingClientRect().width / W).toFixed(2)}px`;
}
export const flagRest = (el, cache) => { if (cache.nodes) { flagFrame(el, REST, cache); if (cache.nodes.emblem) cache.nodes.emblem.style.translate = ''; } };
