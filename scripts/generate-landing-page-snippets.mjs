// Turns every one-page website template into a UI snippet in the "landing-pages" category:
//   src/components/UiSnippetsTool/snippets/<template-id>-landing-page-template.js
// The html/css/js come from the same export the Website Builder gives (siteFiles), so the snippet IS
// the template. SEO text is hand-written in scripts/landing-page-content/batch-*.mjs; this script adds
// the facts that come from the data (which website section templates the page uses, with links).
// It also registers the snippets in snippets.js. Re-runnable.
//   node scripts/generate-landing-page-snippets.mjs           write files
//   node scripts/generate-landing-page-snippets.mjs --check   validate content only
import fs from 'node:fs';
import path from 'node:path';
import { WEBSITE_TEMPLATES } from '../src/components/SectionTemplates/templates/starters.js';
import { siteFromStarter, siteFiles, starterPageList } from '../src/components/SectionTemplates/templates/site.js';
import { sectionTemplateById, THEME_PRESETS } from '../src/components/SectionTemplates/templates/index.js';
import { websiteAiPrompt } from '../src/components/SectionTemplates/templates/ai-prompts.js';
import { resolveFont } from '../src/lib/fonts.js';
import { BATCH_1 } from './landing-page-content/batch-1.mjs';
import { BATCH_2 } from './landing-page-content/batch-2.mjs';
import { BATCH_3 } from './landing-page-content/batch-3.mjs';
import { BATCH_4 } from './landing-page-content/batch-4.mjs';

const CONTENT = { ...BATCH_1, ...BATCH_2, ...BATCH_3, ...BATCH_4 };
const SNIP_DIR = path.resolve('src/components/UiSnippetsTool/snippets');
const REGISTRY = path.resolve('src/components/UiSnippetsTool/snippets.js');
const CHECK = process.argv.includes('--check');
const TODAY = '2026-10-28';
const suffix = '-landing-page-template';
const esc = s => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
const camel = id => id.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

const problems = [];
for (const t of WEBSITE_TEMPLATES) {
  const c = CONTENT[t.id];
  if (!c) { problems.push(`${t.id}: no content`); continue; }
  if (c.title.length < 50 || c.title.length > 60) problems.push(`${t.id}: title ${c.title.length} chars`);
  if (c.description.length < 150 || c.description.length > 160) problems.push(`${t.id}: description ${c.description.length} chars`);
  if (c.roles.length !== t.sections.length) problems.push(`${t.id}: ${c.roles.length} roles for ${t.sections.length} sections`);
  if (c.steps.length !== 3) problems.push(`${t.id}: needs 3 steps`);
  if (c.useCases.length !== 3 || c.faqs.length !== 3) problems.push(`${t.id}: needs 3 use cases and 3 faqs`);
  for (const [sid] of t.sections) if (!sectionTemplateById(sid)) problems.push(`${t.id}: unknown section ${sid}`);
}
if (problems.length) { console.log(problems.join('\n')); process.exit(1); }
if (CHECK) { console.log(`Content OK for ${WEBSITE_TEMPLATES.length} templates`); process.exit(0); }

const ids = [];
for (const t of WEBSITE_TEMPLATES) {
  const c = CONTENT[t.id];
  const id = `${t.id}${suffix}`;
  const files = siteFiles(siteFromStarter(t.id, { multi: false }), {});
  const get = p => files.find(f => f.path === p).content;
  const page = get('index.html');
  const body = page.slice(page.indexOf('<body>') + 6, page.indexOf('<script src='))
    .replace(/href="\/"/g, 'href="#"').replace(/\n\s+$/, '');
  const font = (page.match(/<link href="(https:\/\/fonts\.googleapis\.com\/css2[^"]+)" rel="stylesheet">/) || [])[1];
  const cdn = [...page.matchAll(/<script src="(https:[^"]+)"/g)].map(m => m[1]);
  const css = `${font ? `@import url('${font}');\n` : ''}${get('styles.css')}`;
  const js = get('script.js');

  const sections = t.sections.map(([sid], i) => {
    const st = sectionTemplateById(sid);
    return { id: sid, name: st.name, url: `/website-section-templates/${sid}/`, role: c.roles[i] };
  });
  const pages = starterPageList(t.id).length;
  const names = sections.map(s => s.name).join(', ');
  const seo = {
    title: c.title,
    description: c.description,
    subtitle: `${t.name} template · ${sections.length} website sections · Plain HTML, CSS & JS · Customise it in the Website Builder`,
    startTemplate: { id: t.id, name: t.name, url: `/website-builder/editor/?starter=${t.id}`, templateUrl: `/website-builder/templates/${t.id}/` },
    sectionsUsed: sections,
    about: { title: c.headline, description: c.about },
    features: [
      `${sections.length} ready-made website sections assembled into one finished ${t.name.toLowerCase()} page: ${names}`,
      'Every section links to its own page in the Website Section Templates library, where you can edit it on its own',
      'One theme drives the whole page (colours, fonts, corner radius, width), so changing the brand takes a minute',
      'Container-query responsive: each section adapts to the width it is placed in, from phone to desktop',
      'GSAP entrance animations and scroll effects load from a CDN, and switch off for visitors who prefer reduced motion',
      pages ? `Also available as a ${pages + 1}-page website in the builder, sharing one navbar, footer and theme` : 'Add more pages in the Website Builder, sharing one navbar, footer and theme',
      'Plain HTML, CSS and JavaScript: copy the code here or export it to React, Vue, Angular or Tailwind',
    ],
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Open the template in the Website Builder', text: `Press "Start using this template" to open the ${t.name} in the [Website Builder](/website-builder/). Everything is edited with forms in a side panel; no code is needed.` },
        ...c.steps,
        { title: 'Export and publish', text: 'Download one HTML file or a ZIP (or one HTML file per page for the multi-page version) and upload it to Netlify, Vercel, Cloudflare Pages, GitHub Pages or your own host. Or copy the code from this page and export it to React, Vue, Angular or Tailwind with the buttons above the editor.' },
      ],
    },
    useCases: c.useCases,
    faqs: [
      ...c.faqs,
      { q: 'Which website sections is this landing page built from?', a: `It is assembled from ${sections.length} templates in the free Website Section Templates library: ${names}. Each one has its own page where you can edit it separately.` },
      { q: 'How is this snippet different from the template in the Website Builder?', a: 'It is the same page. Here you read and edit the HTML, CSS and JavaScript directly with a live preview; in the Website Builder you edit it with forms, change the theme once for the whole page, add pages and export a finished site.' },
    ],
    // Same prompt as the template's page (website-builder/templates/[id]), built from the template's data
    aiPrompt: websiteAiPrompt(t, {
      theme: { ...(t.preset ? THEME_PRESETS.find(p => p.id === t.preset) : {}), ...(t.theme || {}) },
      fontNames: [resolveFont(t.fonts?.heading).label, resolveFont(t.fonts?.body).label],
      pages: starterPageList(t.id),
    }),
  };

  const out = `// Generated by scripts/generate-landing-page-snippets.mjs from the "${t.id}" website template.
// Do not edit the code by hand: regenerate it after changing the template or the content files.
const ${camel(id)} = {
  id: '${id}',
  title: '${t.name.replace(/'/g, "\\'")} Template',
  lastmod: '${TODAY}',
  category: 'landing-pages',
  cdnUrls: ${JSON.stringify(cdn, null, 2).replace(/\n/g, '\n  ')},
  html: \`${esc(body)}\`,

  css: \`${esc(css)}\`,

  js: \`${esc(js)}\`,

  seo: ${JSON.stringify(seo, null, 2).replace(/\n/g, '\n  ')},
};

export default ${camel(id)};
`;
  const file = path.join(SNIP_DIR, `${id}.js`);
  const old = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
  const same = old !== null && old.replace(/lastmod: '[^']*'/, '') === out.replace(/lastmod: '[^']*'/, '');
  if (!same) fs.writeFileSync(file, out); // unchanged snippets keep their file and their lastmod
  ids.push(id);
  console.log(same ? '=' : (old === null ? '+' : '✓'), id, `${(out.length / 1024).toFixed(0)} KB`, same ? 'unchanged' : (old === null ? 'new' : 'updated'));
}

// Register in snippets.js (idempotent): imports after the last snippet import, array entries before `];`
let reg = fs.readFileSync(REGISTRY, 'utf8');
const missing = ids.filter(id => !reg.includes(`from './snippets/${id}.js'`));
if (missing.length) {
  const imports = missing.map(id => `import ${camel(id)} from './snippets/${id}.js';`).join('\n');
  const lastImport = [...reg.matchAll(/^import .*;$/gm)].filter(m => m[0].includes("'./snippets/")).pop();
  reg = reg.slice(0, lastImport.index + lastImport[0].length) + '\n' + imports + reg.slice(lastImport.index + lastImport[0].length);
  const end = reg.indexOf('\n];', reg.indexOf('export const SNIPPETS'));
  reg = reg.slice(0, end) + '\n' + missing.map(id => `  ${camel(id)},`).join('\n') + reg.slice(end);
  fs.writeFileSync(REGISTRY, reg);
  console.log(`Registered ${missing.length} snippets in snippets.js`);
}
