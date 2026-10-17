// Builds public/data/google-fonts.json: every Google Fonts family, most popular first,
// as compact rows the font picker loads on demand:
//   [family, category, weights]
//   category: s = sans serif, e = serif, d = display, h = handwriting, m = monospace
//   weights:  the upright weights it has, in hundreds ("47" = 400 and 700)
// Re-run to pick up new families:  node scripts/build-google-fonts.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'data', 'google-fonts.json');
const CAT = { 'Sans Serif': 's', Serif: 'e', Display: 'd', Handwriting: 'h', Monospace: 'm' };

const res = await fetch('https://fonts.google.com/metadata/fonts');
if (!res.ok) throw new Error(`Google Fonts metadata: HTTP ${res.status}`);
const { familyMetadataList } = await res.json();

const rows = familyMetadataList
  .filter(f => f.isOpenSource !== false && CAT[f.category])
  .sort((a, b) => a.popularity - b.popularity)
  .map(f => {
    const weights = [...new Set(Object.keys(f.fonts || {}).filter(k => /^\d+$/.test(k)).map(Number).filter(w => w % 100 === 0 && w >= 100 && w <= 900))].sort((a, b) => a - b);
    return [f.family, CAT[f.category], weights.map(w => w / 100).join('')];
  })
  .filter(r => r[2]); // italic-only families (e.g. Molle) have no upright weight to request

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify(rows));
console.log(`${rows.length} families -> ${OUT}`);
