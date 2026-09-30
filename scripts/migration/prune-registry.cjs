// One-off migration helper (fwdtools -> webdevpuneet).
// Removes TOOLS / CATEGORIES entries that are out of scope for webdevpuneet.com.
// Scope = every tool slug listed in the 'learn-to-code' category (which includes ui-snippets).
// Entries are the 2-space-indented `{ ... },` blocks inside the exported arrays.
const fs = require('fs');
const path = require('path');

const lib = path.join(__dirname, '..', '..', 'src', 'lib');

function pruneArray(file, arrayStart, keepFn) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const start = lines.findIndex(l => l.startsWith(arrayStart));
  if (start < 0) throw new Error(`${arrayStart} not found in ${file}`);
  const out = lines.slice(0, start + 1);
  const kept = [], removed = [];
  let i = start + 1;
  for (; i < lines.length; i++) {
    const l = lines[i];
    if (/^\];?\s*$/.test(l)) break;                 // end of array
    if (/^  \{\s*$/.test(l)) {                      // entry start
      let j = i;
      while (!/^  \},?\s*$/.test(lines[j])) j++;
      const block = lines.slice(i, j + 1);
      const m = block.join('\n').match(/slug:\s*'([^']+)'/);
      const slug = m && m[1];
      if (keepFn(slug)) { out.push(...block); kept.push(slug); } else removed.push(slug);
      i = j;
      continue;
    }
    // Section comment lines (/* — ... */) are dropped; blank lines kept.
    if (/^\s*\/\*.*\*\/\s*$/.test(l)) continue;
    out.push(l);
  }
  out.push(...lines.slice(i));
  fs.writeFileSync(file, out.join('\n').replace(/\n{3,}/g, '\n\n'), 'utf8');
  return { kept, removed };
}

// Scope from categories.js learn-to-code toolSlugs
const catSrc = fs.readFileSync(path.join(lib, 'categories.js'), 'utf8');
const ltc = catSrc.slice(catSrc.indexOf("slug:        'learn-to-code'"));
const slugBlock = ltc.slice(ltc.indexOf('toolSlugs: ['), ltc.indexOf('],'));
const KEEP = new Set([...slugBlock.matchAll(/'([^']+)'/g)].map(m => m[1]));

const t = pruneArray(path.join(lib, 'tools-registry.js'), 'export const TOOLS = [', s => KEEP.has(s));
const c = pruneArray(path.join(lib, 'categories.js'), 'export const CATEGORIES = [', s => s === 'learn-to-code');

console.log(JSON.stringify({
  scope: [...KEEP],
  toolsKept: t.kept, toolsRemovedCount: t.removed.length,
  missingFromRegistry: [...KEEP].filter(s => !t.kept.includes(s)),
  categoriesKept: c.kept, categoriesRemoved: c.removed,
}, null, 2));
