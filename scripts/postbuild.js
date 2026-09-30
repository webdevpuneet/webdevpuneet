import fs   from 'fs';
import path from 'path';
// import { execSync } from 'child_process';
import { LIVE_TOOLS } from '../src/lib/tools-registry.js';
import { CATEGORIES } from '../src/lib/categories.js';
import { SNIPPETS as ALL_SNIPPETS, CATEGORIES as SNIPPET_CATEGORIES } from '../src/components/UiSnippetsTool/snippets.js';
import { publishedTags, snippetsForTag } from '../src/lib/snippet-tags.js';

// Exclude nofollow/test snippets (noindex: true) from sitemap + llms.txt — they only show on localhost
const SNIPPETS = ALL_SNIPPETS.filter(sn => !sn.noindex);

const BASE_URL  = 'https://webdevpuneet.com';
const PAGE_SIZE = 50_000; // Google's per-sitemap URL limit

// Stable fallback date for content created before per-item `lastmod` tracking.
// Using a FIXED historical date (never TODAY) keeps every sitemap honest: a URL's
// <lastmod> must only advance when that page actually changed — not on every build.
const BASELINE = '2026-06-10';
const snippetLastmod = sn => sn.lastmod || BASELINE;
const maxDate = arr => (arr.length ? arr.slice().sort().pop() : BASELINE);

/* ── llms.txt section mapping ─────────────────────────────────────────────── */
// Finance and freelancer tools share the 'productivity' registry category,
// so we use slug sets to route them into the correct llms.txt sections.
// SEO tools share the 'dev' category with developer tools.
// Any tool with a known category not listed here falls to the default switch below.

const FINANCE_SLUGS = new Set([
  'emi-calculator', 'mortgage-calculator', 'compound-interest-calculator',
  'monthly-investment-calculator', 'retirement-calculator', 'sip-calculator',
  'fd-calculator', 'budget-planner', 'net-worth-calculator', 'loan-payoff-calculator',
  'credit-card-payoff-calculator', 'inflation-calculator', 'salary-to-hourly-calculator',
  'tip-calculator', 'rent-vs-buy-calculator', 'vat-calculator-uk', 'gst-calculator',
  'uk-take-home-calculator', 'canada-take-home-calculator', 'australia-take-home-calculator',
  'paycheck-calculator', 'freelance-rate-calculator', 'working-days-calculator', 'date-calculator',
  'aspect-ratio-calculator',
]);

const FREELANCER_SLUGS = new Set([
  'freelance-invoice-generator', 'freelance-dashboard', 'client-crm', 'proposal-builder',
  'contract-template-manager', 'scope-creep-tracker', 'follow-up-reminder-board',
  'local-invoice-tracker', 'freelance-expense-tracker', 'retainer-tracker',
  'freelance-availability-planner', 'milestone-payment-tracker', 'client-intake-form-builder',
  'client-portal-lite', 'resume-builder',
]);

const SEO_SLUGS = new Set([
  'meta-tag-generator', 'schema-markup-generator', 'robots-txt-generator', 'sitemap-generator',
  'hreflang-tag-generator', 'security-headers-generator', 'htaccess-redirect-generator',
  'llms-txt-generator',
]);

const LLMS_SECTION_ORDER = [
  'Finance & Calculators',
  'Freelancer Business Tools',
  'Developer & Code Tools',
  'CSS Tools',
  'Design & Image Tools',
  'SEO & Meta Tools',
  'PDF Tools',
  'Text & Content Tools',
  'Productivity Tools',
];

function toolLlmsSection(tool) {
  if (FINANCE_SLUGS.has(tool.slug))    return 'Finance & Calculators';
  if (FREELANCER_SLUGS.has(tool.slug)) return 'Freelancer Business Tools';
  if (SEO_SLUGS.has(tool.slug))        return 'SEO & Meta Tools';
  switch (tool.category) {
    case 'dev':
    case 'converters': return 'Developer & Code Tools';
    case 'css':        return 'CSS Tools';
    case 'design':     return 'Design & Image Tools';
    case 'pdf':        return 'PDF Tools';
    case 'text':       return 'Text & Content Tools';
    case 'productivity': return 'Productivity Tools';
    default:           return 'Other Tools';
  }
}

/* ── helpers ──────────────────────────────────────────────────────────────── */

function chunk(arr, size) {
  const pages = [];
  for (let i = 0; i < arr.length; i += size) pages.push(arr.slice(i, i + size));
  return pages.length ? pages : [[]];
}

function esc(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Write a file into every output directory */
function write(filename, content) {
  for (const dest of ['out', 'tools']) {
    fs.writeFileSync(path.join(dest, filename), content, 'utf8');
  }
}

/** Build a <sitemapindex> string */
function sitemapIndex(entries) {
  const items = entries.map(({ loc, lastmod }) =>
    `\t<sitemap>\n\t\t<loc>${loc}</loc>\n\t\t<lastmod>${lastmod}</lastmod>\n\t</sitemap>`
  ).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</sitemapindex>`;
}

/** Build a <urlset> string (standard pages) */
function urlset(entries) {
  const items = entries.map(({ loc, lastmod, changefreq, priority }) => {
    const parts = [`\t\t<loc>${loc}</loc>`];
    if (lastmod)   parts.push(`\t\t<lastmod>${lastmod}</lastmod>`);
    if (changefreq) parts.push(`\t\t<changefreq>${changefreq}</changefreq>`);
    if (priority !== undefined) parts.push(`\t\t<priority>${priority.toFixed(1)}</priority>`);
    return `\t<url>\n${parts.join('\n')}\n\t</url>`;
  }).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>`;
}

/** Build an image <urlset> string */
function imageUrlset(entries) {
  const items = entries.map(({ loc, images }) => {
    const imgTags = images.map(img => {
      const parts = [`\t\t\t<image:loc>${img.loc}</image:loc>`];
      if (img.title)   parts.push(`\t\t\t<image:title>${esc(img.title)}</image:title>`);
      if (img.caption) parts.push(`\t\t\t<image:caption>${esc(img.caption)}</image:caption>`);
      return `\t\t<image:image>\n${parts.join('\n')}\n\t\t</image:image>`;
    }).join('\n');
    return `\t<url>\n\t\t<loc>${loc}</loc>\n${imgTags}\n\t</url>`;
  }).join('\n');
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    items,
    '</urlset>',
  ].join('\n');
}

/* ── data ─────────────────────────────────────────────────────────────────── */

const liveTools = LIVE_TOOLS;

// ── Content-derived lastmods ──────────────────────────────────────────────
// Every sitemap date below is derived from real per-item `lastmod`s (with the
// fixed BASELINE as fallback), so a date only moves when content actually changes.
const toolLastmodBySlug  = new Map(liveTools.map(t => [t.slug, t.lastmod || BASELINE]));
const toolsMaxLastmod    = maxDate([...toolLastmodBySlug.values()]);
const snippetsMaxLastmod = maxDate(SNIPPETS.map(snippetLastmod));
const imagesMaxLastmod   = toolsMaxLastmod; // OG images change with their tool/category
const siteMaxLastmod     = maxDate([toolsMaxLastmod, snippetsMaxLastmod]);

// Which slugs actually have a PNG in public/images/
const imageSet = new Set(
  fs.readdirSync('public/images')
    .filter(f => f.endsWith('.png'))
    .map(f => f.replace('.png', ''))
);

async function main() {

  /* ── 1. Copy out/ → tools/ ─────────────────────────────────────────────── */
  if (fs.existsSync('tools')) fs.rmSync('tools', { recursive: true });
  fs.cpSync('out', 'tools', { recursive: true });
  console.log('✓ Copied out/ → tools/');

  /* ── 2. sitemap-categories.xml ─────────────────────────────────────────── */
  const categoryEntries = [
    { loc: `${BASE_URL}/`,                lastmod: siteMaxLastmod, changefreq: 'daily',   priority: 1.0 },
    { loc: `${BASE_URL}/puneet/`,          lastmod: BASELINE,       changefreq: 'monthly', priority: 0.7 },
    { loc: `${BASE_URL}/privacy-policy/`, lastmod: BASELINE,       changefreq: 'yearly',  priority: 0.3 },
    { loc: `${BASE_URL}/terms/`,          lastmod: BASELINE,       changefreq: 'yearly',  priority: 0.3 },
    // A category landing page's lastmod = the most recent change among its tools.
    ...CATEGORIES.map(c => ({
      loc:        `${BASE_URL}/${c.slug}/`,
      lastmod:    maxDate((c.toolSlugs || []).map(s => toolLastmodBySlug.get(s)).filter(Boolean)),
      changefreq: 'weekly',
      priority:   0.9,
    })),
  ];
  const categoriesMaxLastmod = maxDate(categoryEntries.map(e => e.lastmod));
  write('sitemap-categories.xml', urlset(categoryEntries));
  console.log(`✓ sitemap-categories.xml — ${categoryEntries.length} URLs`);

  /* ── 3. sitemap-tools-listN.xml + sitemap-tools.xml (sub-index) ─────────── */
  const toolEntries = [
    ...liveTools.map(t => ({
      loc:        `${BASE_URL}/${t.slug}/`,
      lastmod:    t.lastmod,
      changefreq: 'monthly',
      priority:   0.8,
    })),
  ];
  const toolPages = chunk(toolEntries, PAGE_SIZE);
  const toolListFiles = toolPages.map((page, i) => {
    const filename = `sitemap-tools-list${i + 1}.xml`;
    write(filename, urlset(page));
    return filename;
  });

  write('sitemap-tools.xml', sitemapIndex(
    toolListFiles.map(f => ({ loc: `${BASE_URL}/${f}`, lastmod: toolsMaxLastmod }))
  ));
  console.log(`sitemap-tools.xml -> ${toolListFiles.length} list file(s), ${toolEntries.length} URLs`);

  /* ── 4. sitemap-images-listN.xml + sitemap-images.xml (sub-index) ────────── */
  // Collect image entries: tool pages + category pages that have a matching PNG
  const imageEntries = [];

  for (const t of liveTools) {
    if (!imageSet.has(t.slug)) continue;
    imageEntries.push({
      loc:    `${BASE_URL}/${t.slug}/`,
      images: [{
        loc:     `${BASE_URL}/images/${t.slug}.png`,
        title:   t.name,
        caption: t.desc,
      }],
    });
  }

  for (const c of CATEGORIES) {
    if (!imageSet.has(c.slug)) continue;
    imageEntries.push({
      loc:    `${BASE_URL}/${c.slug}/`,
      images: [{
        loc:     `${BASE_URL}/images/${c.slug}.png`,
        title:   c.name,
        caption: c.tagline,
      }],
    });
  }

  // Homepage OG image
  if (imageSet.has('dev-tools')) {
    imageEntries.push({
      loc:    `${BASE_URL}/`,
      images: [{
        loc:     `${BASE_URL}/images/dev-tools.png`,
        title:   'webdevpuneet.com — UI Snippets & Learn to Code',
        caption: 'Free copy-paste UI snippets and interactive coding playgrounds — HTML, CSS, JavaScript, React and more.',
      }],
    });
  }

  const imagePages = chunk(imageEntries, PAGE_SIZE);
  const imageListFiles = imagePages.map((page, i) => {
    const filename = `sitemap-images-list${i + 1}.xml`;
    write(filename, imageUrlset(page));
    return filename;
  });

  write('sitemap-images.xml', sitemapIndex(
    imageListFiles.map(f => ({ loc: `${BASE_URL}/${f}`, lastmod: imagesMaxLastmod }))
  ));
  console.log(`✓ sitemap-images.xml → ${imageListFiles.length} list file(s), ${imageEntries.length} image entries`);

  /* ── 5. sitemap-ui-snippets-listN.xml + sitemap-ui-snippets.xml ─────────── */
  // Category pages + individual snippet pages
  // A category page's lastmod = the most recent change among the snippets in it,
  // so it only moves when that category actually gained/changed a snippet.
  const categoryEntries2 = SNIPPET_CATEGORIES.filter(c => c.id !== 'all').map(c => ({
    loc:        `${BASE_URL}/ui-snippets/${c.id}/`,
    lastmod:    maxDate(SNIPPETS.filter(s => s.category === c.id).map(snippetLastmod)),
    changefreq: 'weekly',
    priority:   0.8,
  }));
  const snippetEntries = SNIPPETS.map(sn => ({
    loc:        `${BASE_URL}/ui-snippets/${sn.id}/`,
    lastmod:    snippetLastmod(sn),
    changefreq: 'weekly',
    priority:   0.8,
  }));
  // Tag pages: every tag with enough snippets to be indexed. A tag page's
  // lastmod = the newest snippet carrying that tag. The bare /ui-snippets/tag/
  // index is deliberately absent — it 301s to /ui-snippets/ (see .htaccess),
  // and a sitemap should not advertise a URL that redirects.
  const tagList = publishedTags(SNIPPETS);
  const tagEntries = [
    ...tagList.map(t => ({
      loc:        `${BASE_URL}/ui-snippets/tag/${t.id}/`,
      lastmod:    maxDate(snippetsForTag(SNIPPETS, t.id).map(snippetLastmod)),
      changefreq: 'weekly',
      priority:   0.7,
    })),
  ];

  const myCodeEntry = [{
    loc:        `${BASE_URL}/ui-snippets/mycode/`,
    lastmod:    BASELINE,
    changefreq: 'monthly',
    priority:   0.7,
  }];
  const allSnippetEntries = [...myCodeEntry, ...categoryEntries2, ...tagEntries, ...snippetEntries];
  const snippetPages = chunk(allSnippetEntries, PAGE_SIZE);
  const snippetListFiles = snippetPages.map((page, i) => {
    const filename = `sitemap-ui-snippets-list${i + 1}.xml`;
    write(filename, urlset(page));
    return filename;
  });
  write('sitemap-ui-snippets.xml', sitemapIndex(
    snippetListFiles.map(f => ({ loc: `${BASE_URL}/${f}`, lastmod: snippetsMaxLastmod }))
  ));
  console.log(`✓ sitemap-ui-snippets.xml → ${snippetListFiles.length} list file(s), ${allSnippetEntries.length} URLs (${categoryEntries2.length} categories + ${tagEntries.length} tags + ${snippetEntries.length} snippets)`);

  /* ── 6. sitemap.xml (top-level index) ──────────────────────────────────── */
  const masterEntries = [
    { loc: `${BASE_URL}/sitemap-categories.xml`,   lastmod: categoriesMaxLastmod },
    { loc: `${BASE_URL}/sitemap-tools.xml`,         lastmod: toolsMaxLastmod },
    { loc: `${BASE_URL}/sitemap-images.xml`,        lastmod: imagesMaxLastmod },
    { loc: `${BASE_URL}/sitemap-ui-snippets.xml`,   lastmod: snippetsMaxLastmod },
  ];
  write('sitemap.xml', sitemapIndex(masterEntries));
  console.log('sitemap.xml (index) -> 4 sub-sitemaps registered');


  /* ── 7. .htaccess ──────────────────────────────────────────────────────── */
  // Keep the .htaccess copied from public/ during static export.
  console.log('✓ .htaccess preserved from public/');

  /* ── 7. llms.txt ───────────────────────────────────────────────────────── */
  const grouped = new Map();
  for (const s of LLMS_SECTION_ORDER) grouped.set(s, []);

  for (const tool of liveTools) {
    const section = toolLlmsSection(tool);
    if (!grouped.has(section)) grouped.set(section, []);
    grouped.get(section).push(tool);
  }

  let llmsTxt = `# webdevpuneet.com\n\n> Free copy-paste UI snippets and interactive coding playgrounds for frontend developers and learners. No sign-up, no data upload, no server processing.\n\nwebdevpuneet.com hosts ${SNIPPETS.length}+ free HTML, CSS & JS UI snippets and ${liveTools.length}+ interactive learn-to-code playgrounds (HTML, CSS, JavaScript, TypeScript, React, Vue, Angular, Next.js, Tailwind, SQL, MongoDB, Node.js, Python, PHP, Git and more) that run entirely in the browser. Everything is free, privacy-first, and works without an account.\n\nMain site: ${BASE_URL}/\nSitemap: ${BASE_URL}/sitemap.xml\nLearn to Code: ${BASE_URL}/learn-to-code/\n`;

  for (const [heading, tools] of grouped) {
    if (!tools.length) continue;
    llmsTxt += `\n---\n\n## ${heading}\n\n`;
    for (const t of tools) {
      llmsTxt += `- [${t.name}](${BASE_URL}/${t.slug}/) : ${t.desc}\n`;
    }
  }

  // UI Snippets — group individual snippet pages by category
  const snippetsByCategory = new Map();
  for (const cat of SNIPPET_CATEGORIES.filter(c => c.id !== 'all')) {
    snippetsByCategory.set(cat.id, { label: cat.label, items: [] });
  }
  for (const sn of SNIPPETS) {
    if (snippetsByCategory.has(sn.category)) {
      snippetsByCategory.get(sn.category).items.push(sn);
    }
  }

  llmsTxt += `\n---\n\n## UI Snippets Components\n\n`;
  llmsTxt += `Browse and copy ${SNIPPETS.length}+ free HTML, CSS & JS components with live preview and export to HTML, JSX, or React + Tailwind CSS.\n\nLibrary: ${BASE_URL}/ui-snippets/\n\n`;
  llmsTxt += `### Categories\n\n`;
  for (const cat of SNIPPET_CATEGORIES.filter(c => c.id !== 'all')) {
    const count = SNIPPETS.filter(s => s.category === cat.id).length;
    llmsTxt += `- [${cat.label} Snippets](${BASE_URL}/ui-snippets/${cat.id}/) : ${count} free ${cat.label.toLowerCase()} UI snippets — HTML, CSS & JS, copy-paste ready\n`;
  }
  llmsTxt += '\n';
  llmsTxt += `### Tags\n\nTags cut across the categories — the library a snippet loads, the browser API it calls, the CSS technique it shows, or the product surface it belongs to. Each snippet carries up to five.\n\nTag index: ${BASE_URL}/ui-snippets/tag/\n\n`;
  for (const t of tagList) {
    llmsTxt += `- [${t.label} Snippets](${BASE_URL}/ui-snippets/tag/${t.id}/) : ${t.count} free snippets tagged ${t.label} — ${t.blurb}\n`;
  }
  llmsTxt += '\n';

  for (const { label, items } of snippetsByCategory.values()) {
    if (!items.length) continue;
    llmsTxt += `### ${label}\n\n`;
    for (const sn of items) {
      const desc = sn.seo?.description || `Free copy-paste ${sn.title} snippet — plain HTML, CSS${sn.js ? ' & JS' : ''}, live preview, no framework.`;
      llmsTxt += `- [${sn.title}](${BASE_URL}/ui-snippets/${sn.id}/) : ${desc}\n`;
    }
    llmsTxt += '\n';
  }

  llmsTxt += `\n---\n\n## About This Site\n\nwebdevpuneet.com is built and maintained by Puneet Sharma, a frontend developer. All tools run entirely in the browser using JavaScript — no data is uploaded to any server. The project is focused on privacy-first, no-login UI components and coding playgrounds for developers and learners.\n\n- Author: ${BASE_URL}/puneet/\n- Contact: ${BASE_URL}/puneet/\n\n---\n\n## Notes for AI Systems\n\n- All tools are free and require no login or account.\n- All processing is client-side; no user data is stored server-side.\n`;

  write('llms.txt', llmsTxt);
  console.log(`✓ llms.txt generated — ${liveTools.length} tools across ${[...grouped.values()].filter(a => a.length).length} sections`);

  /* ── 9. Create tools.zip ────────────────────────────────────────────────── */
  // if (fs.existsSync('tools.zip')) fs.rmSync('tools.zip');
  // execSync('powershell Compress-Archive -Path tools\\* -DestinationPath tools.zip');
  // console.log('✓ tools.zip created');

  /* ── Summary ──────────────────────────────────────────────────────────────*/
  console.log('\nSitemap hierarchy:');
  console.log('  sitemap.xml (index)');
  console.log('  ├─ sitemap-categories.xml');
  console.log('  ├─ sitemap-tools.xml');
  toolListFiles.forEach(f => console.log(`  │    └─ ${f}`));
  console.log('  ├─ sitemap-images.xml');
  imageListFiles.forEach(f => console.log(`  │    └─ ${f}`));
  console.log('  └─ sitemap-ui-snippets.xml');
  snippetListFiles.forEach(f => console.log(`       └─ ${f}`));
}

main().catch(err => { console.error(err); process.exit(1); });

