// Applies seo-rewrites.mjs to snippet files: replaces seo.title and seo.description.
import fs from 'fs';
import path from 'path';
import { REWRITES } from './seo-rewrites.mjs';

const DIR = 'src/components/UiSnippetsTool/snippets';
// single- or double-quoted JS string with escapes
const STR = `(?:'(?:[^'\\\\]|\\\\.)*'|"(?:[^"\\\\]|\\\\.)*")`;
const re = new RegExp(`(  seo: \\{\\r?\\n    title: )${STR}(,\\r?\\n    description: )${STR}`, 'm');

let applied = 0, failed = [];
for (const [id, { t, d }] of Object.entries(REWRITES)) {
  const file = path.join(DIR, `${id}.js`);
  if (!fs.existsSync(file)) { failed.push(`${id} (file missing)`); continue; }
  const src = fs.readFileSync(file, 'utf8');
  const esc = s => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const out = src.replace(re, (m, p1, p3) => `${p1}'${esc(t)}'${p3}'${esc(d)}'`);
  if (out === src) { failed.push(`${id} (pattern not matched)`); continue; }
  fs.writeFileSync(file, out, 'utf8');
  applied++;
}
console.log(`rewrites in map: ${Object.keys(REWRITES).length}`);
console.log(`applied: ${applied}`);
if (failed.length) { console.log(`FAILED (${failed.length}):`); failed.forEach(f => console.log('  ' + f)); process.exit(1); }
