/* "Surprise me": random but tasteful combinations, so people can see how much the options change a
   section. Everything is a normal setting (a theme preset, an artwork with its position, a section
   colour scheme), so it can be undone and edited like anything chosen by hand. */
import { THEME_PRESETS, THEME_COLORS } from './meta.js';
import { ARTWORKS, ART_POSITIONS, newArt, cleanArt } from './art.js';

const pick = list => list[Math.floor(Math.random() * list.length)];
const between = (a, b) => Math.round(a + Math.random() * (b - a));

/** A random artwork with a random position, colour, strength and animation */
export function surpriseArt() {
  const w = pick(ARTWORKS);
  const art = { ...newArt(w.id) };
  const positions = ART_POSITIONS[w.layout];
  if (w.layout === 'edge') art.pos = pick(['top', 'bottom']);
  else if (positions) art.pos = pick(positions)[0];
  if (w.layout === 'corner' && art.pos === 'c') { art.x = between(15, 85); art.y = between(15, 85); }
  art.color = pick(['brand', 'brand', 'brand', 'text', 'muted']);
  art.strength = w.kind === 'divider' ? '100' : pick(['8', '15', '15', '30']);
  art.anim = w.anims.length && Math.random() < 0.6 ? pick(w.anims) : '';
  return cleanArt(art);
}

/** The colours (only) of a random theme preset, ready to merge into a theme. `not` = the one to avoid. */
export function surpriseColors(not) {
  const p = pick(THEME_PRESETS.filter(x => x.id !== not));
  return { id: p.id, colors: Object.fromEntries(THEME_COLORS.map(c => [c.key, p[c.key]])) };
}

/** A random section colour scheme for a page section (the page theme stays as it is) */
export function surpriseScheme(theme) {
  const scheme = pick(['surface', 'inverted', 'brand', 'gradient']);
  return scheme === 'gradient'
    ? { scheme, grad: { from: theme.brand, to: theme.text, angle: pick([135, 90, 180]) } }
    : { scheme };
}
