// Exports every website template as a ready-to-upload demo site:
//   demos/website-templates/<template-id>/one-page/    the template as a single page
//   demos/website-templates/<template-id>/multi-page/  its multi-page version (home, inner pages, privacy)
// each holding index.html (+ the other pages, styles.css, script.js, favicon). This is the same export
// the Website Builder gives ("Export HTML"), with a noindex tag so search engines list the template
// pages, not the demos. Upload the folder and open
//   https://webdevpuneet.com/demos/website-templates/<id>/one-page/   and   .../multi-page/
// Re-runnable. Optional id arguments limit it:  node scripts/export-website-demos.mjs saas podcast
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { WEBSITE_TEMPLATES } from '../src/components/SectionTemplates/templates/starters.js';
import { siteFromStarter, siteFiles } from '../src/components/SectionTemplates/templates/site.js';

const OUT = path.resolve('demos/website-templates');
const only = process.argv.slice(2);
const SKIP = new Set(['sitemap.xml', 'robots.txt', 'llms.txt']); // demos are not a real site
const NOINDEX = '<meta name="robots" content="noindex, follow">';

await mkdir(OUT, { recursive: true });
let made = 0;
for (const t of WEBSITE_TEMPLATES) {
  if (only.length && !only.includes(t.id)) continue;
  const dir = path.join(OUT, t.id);
  await rm(dir, { recursive: true, force: true });
  const counts = [];
  for (const [folder, multi] of [['one-page', false], ['multi-page', true]]) {
    const site = siteFromStarter(t.id, { multi });
    const files = siteFiles(site, {}).filter(f => !SKIP.has(f.path));
    await mkdir(path.join(dir, folder), { recursive: true });
    for (const f of files) {
      let content = f.content;
      if (f.path.endsWith('.html')) {
        if (/<meta name="robots"/i.test(content)) content = content.replace(/<meta name="robots"[^>]*>/i, NOINDEX);
        else content = content.replace(/(<meta charset="[^"]*">)/i, `$1
${NOINDEX}`);
      }
      await writeFile(path.join(dir, folder, f.path), f.base64 ? Buffer.from(content, 'base64') : content);
    }
    counts.push(`${folder} ${files.filter(f => f.path.endsWith('.html')).length}`);
  }
  made++;
  console.log(`✓ ${t.id.padEnd(14)} ${counts.join(', ')} page(s)`);
}
console.log(`Done: ${made} demo site(s) in ${OUT}`);
