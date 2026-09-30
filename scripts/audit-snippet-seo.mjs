// One-off audit: measures seo.title / seo.description lengths across all snippets
import { SNIPPETS } from '../src/components/UiSnippetsTool/snippets.js';

let longTitle = [], shortTitle = [], shortDesc = [], longDesc = [], noSeo = [], noFw = [];
for (const sn of SNIPPETS) {
  if (!sn.seo) { noSeo.push(sn.id); continue; }
  const t = sn.seo.title || '';
  const d = sn.seo.description || '';
  if (t.length > 60) longTitle.push(`${sn.id} (${t.length})`);
  if (t.length < 30) shortTitle.push(`${sn.id} (${t.length})`);
  if (d.length < 120) shortDesc.push(`${sn.id} (${d.length})`);
  if (d.length > 165) longDesc.push(`${sn.id} (${d.length})`);
  const blob = JSON.stringify(sn.seo).toLowerCase();
  if (!blob.includes('tailwind') && !blob.includes('angular')) noFw.push(sn.id);
}
console.log('total snippets:', SNIPPETS.length);
console.log('\nno seo block:', noSeo.length, noSeo.join(', '));
console.log('\ntitles > 60 chars:', longTitle.length);
console.log(longTitle.join('\n'));
console.log('\ndescriptions < 120 chars:', shortDesc.length);
console.log(shortDesc.join('\n'));
console.log('\ndescriptions > 165 chars:', longDesc.length);
console.log(longDesc.join('\n'));
console.log('\ncustom seo with NO tailwind/angular mention:', noFw.length);
console.log(noFw.join(', '));
