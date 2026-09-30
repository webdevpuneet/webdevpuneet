// Restructures the seo block of new snippets from the wrong nested format to the correct flat format.
// Wrong:  seo: { title, description, about: { title, description, about, howToUse, features, useCases, faqs } }
// Correct: seo: { title, description, about: { title, description }, howToUse, features, useCases, faqs }
//
// Also merges seo.about.description + seo.about.about into one long description that SeoSection renders.

import { readFileSync, writeFileSync } from 'fs';
import { pathToFileURL } from 'url';
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

function jsStr(s) {
  // Serialize a string as a JS template literal, escaping backticks and ${
  return '`' + s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${') + '`';
}

function jsStrSingle(s) {
  return "'" + s.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'";
}

function serializeValue(val, indent) {
  const pad = ' '.repeat(indent);
  const pad2 = ' '.repeat(indent + 2);
  if (val === null || val === undefined) return 'null';
  if (typeof val === 'string') {
    // Use template literal for multi-line strings, single-quote for short ones
    if (val.includes('\n') || val.includes('`') || val.length > 80) return jsStr(val);
    if (val.includes("'")) return jsStr(val);
    return jsStrSingle(val);
  }
  if (typeof val === 'boolean') return String(val);
  if (typeof val === 'number') return String(val);
  if (Array.isArray(val)) {
    if (val.length === 0) return '[]';
    const items = val.map(item => pad2 + serializeValue(item, indent + 2));
    return '[\n' + items.join(',\n') + ',\n' + pad + ']';
  }
  if (typeof val === 'object') {
    const keys = Object.keys(val);
    if (keys.length === 0) return '{}';
    const entries = keys.map(k => pad2 + k + ': ' + serializeValue(val[k], indent + 2));
    return '{\n' + entries.join(',\n') + ',\n' + pad + '}';
  }
  return String(val);
}

for (const id of IDS) {
  const filePath = resolve(`src/components/UiSnippetsTool/snippets/${id}.js`);
  const url = pathToFileURL(filePath).href;

  let mod;
  try {
    mod = await import(url);
  } catch (e) {
    console.error(`ERROR importing ${id}:`, e.message);
    continue;
  }

  const sn = mod.default;
  const oldSeo = sn.seo;

  if (!oldSeo) { console.log(`SKIP (no seo): ${id}`); continue; }

  const oldAbout = oldSeo.about;
  if (!oldAbout || typeof oldAbout !== 'object') { console.log(`SKIP (no seo.about object): ${id}`); continue; }

  // Check if already correct structure (howToUse at seo level)
  if (oldSeo.howToUse) { console.log(`SKIP (already flat): ${id}`); continue; }

  // Check if nested (howToUse inside about)
  if (!oldAbout.howToUse) { console.log(`WARN (no about.howToUse): ${id}`); continue; }

  // Build merged description: about.description + \n\n + about.about (prose)
  let mergedDesc = oldAbout.description || '';
  if (oldAbout.about && typeof oldAbout.about === 'string') {
    mergedDesc = (mergedDesc ? mergedDesc + '\n\n' : '') + oldAbout.about;
  }

  // New seo structure
  const newSeo = {
    title: oldSeo.title,
    description: oldSeo.description,
    about: {
      title: oldAbout.title,
      description: mergedDesc,
    },
    howToUse: oldAbout.howToUse,
    features: oldAbout.features,
    useCases: oldAbout.useCases,
    faqs: oldAbout.faqs,
  };

  // Serialize new seo block
  const seoText = '  seo: ' + serializeValue(newSeo, 2) + ',';

  // Read source and replace seo block
  let src = readFileSync(filePath, 'utf8');

  // Find start of seo: block
  const seoStart = src.indexOf('  seo: {');
  if (seoStart === -1) { console.log(`WARN (seo: { not found in src): ${id}`); continue; }

  // Find end: the '},\n};' or '},\n  },' pattern after seo start
  // Strategy: count braces from seoStart
  let depth = 0;
  let i = seoStart + 7; // past '  seo: '
  let inStr = false;
  let strChar = '';
  let escaped = false;
  let templateDepth = 0;

  while (i < src.length) {
    const ch = src[i];
    if (escaped) { escaped = false; i++; continue; }
    if (ch === '\\') { escaped = true; i++; continue; }

    if (!inStr) {
      if (ch === '`') { inStr = true; strChar = '`'; templateDepth = depth; }
      else if (ch === '"' || ch === "'") { inStr = true; strChar = ch; }
      else if (ch === '{') depth++;
      else if (ch === '}') {
        depth--;
        if (depth === 0) { i++; break; }
      }
    } else {
      if (strChar === '`' && ch === '`') inStr = false;
      else if (strChar !== '`' && ch === strChar) inStr = false;
    }
    i++;
  }

  // i is now just past the closing }
  // Skip the comma if present
  if (src[i] === ',') i++;

  const newSrc = src.slice(0, seoStart) + seoText + src.slice(i);
  writeFileSync(filePath, newSrc, 'utf8');
  console.log(`RESTRUCTURED: ${id}`);
}

console.log('\nDone. Run: node scripts/audit-snippet-seo.mjs');
