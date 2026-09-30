// Wraps plain howToUse arrays in { type: 'steps', items: [...] } format.
// SeoSection expects this shape; a bare array falls into the `text` branch and crashes.
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const IDS = [
  'notification-center',
  'chip-filter',
  'mega-menu',
  'auto-resize-textarea',
  'circular-steps',
  'stacked-cards',
  'css-animated-border',
  'photo-gallery',
  'parallax-hero',
  'floating-dock',
];

const DIR = 'src/components/UiSnippetsTool/snippets';

// Match:  howToUse: [
// and replace with: howToUse: { type: 'steps', items: [
// then find the matching ] and replace with ] },
for (const id of IDS) {
  const file = resolve(DIR, `${id}.js`);
  if (!existsSync(file)) { console.log(`SKIP (missing): ${id}`); continue; }

  let src = readFileSync(file, 'utf8');

  // Already wrapped?
  if (src.includes("howToUse: { type: 'steps'") || src.includes('howToUse: {type:')) {
    console.log(`SKIP (already wrapped): ${id}`);
    continue;
  }

  // Find howToUse: [
  const start = src.indexOf('    howToUse: [');
  if (start === -1) { console.log(`SKIP (no howToUse array): ${id}`); continue; }

  // Find the matching ] by brace counting from start of [
  const arrStart = src.indexOf('[', start);
  let depth = 0;
  let i = arrStart;
  let inStr = false, strChar = '', escaped = false;

  while (i < src.length) {
    const ch = src[i];
    if (escaped) { escaped = false; i++; continue; }
    if (ch === '\\') { escaped = true; i++; continue; }
    if (!inStr) {
      if (ch === '`' || ch === '"' || ch === "'") { inStr = true; strChar = ch; }
      else if (ch === '[' || ch === '{') depth++;
      else if (ch === ']' || ch === '}') {
        depth--;
        if (depth === 0) break;
      }
    } else {
      if (ch === strChar && strChar !== '`') inStr = false;
      if (ch === strChar && strChar === '`') inStr = false;
    }
    i++;
  }
  // i is at the closing ]

  // Replace:  howToUse: [ ... ]
  // with:     howToUse: { type: 'steps', items: [ ... ] }
  const before = src.slice(0, start);
  const inner = src.slice(arrStart, i + 1); // includes [ and ]
  const after = src.slice(i + 1);

  src = before + "    howToUse: { type: 'steps', items: " + inner + ' }' + after;
  writeFileSync(file, src, 'utf8');
  console.log(`FIXED: ${id}`);
}
console.log('Done.');
