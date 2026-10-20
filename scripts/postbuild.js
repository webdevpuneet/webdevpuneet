import fs   from 'fs';
import path from 'path';
// import { execSync } from 'child_process';
import { LIVE_TOOLS } from '../src/lib/tools-registry.js';
import { CATEGORIES } from '../src/lib/categories.js';
import { SNIPPETS as ALL_SNIPPETS, CATEGORIES as SNIPPET_CATEGORIES } from '../src/components/UiSnippetsTool/snippets.js';
import { publishedTags, snippetsForTag } from '../src/lib/snippet-tags.js';
import { TEMPLATES as SOCIAL_TEMPLATES, TEMPLATE_CATEGORIES as SOCIAL_CATEGORIES } from '../src/components/SocialPostTemplates/templates/index.js';
import { TEMPLATE_SEO as SOCIAL_SEO } from '../src/components/SocialPostTemplates/templates/seo-content.js';
import { CATEGORY_SEO as SOCIAL_CATEGORY_SEO } from '../src/components/SocialPostTemplates/templates/seo-categories.js';
import { EMAIL_TEMPLATES, EMAIL_CATEGORIES } from '../src/components/EmailTemplates/templates/index.js';
import { EMAIL_CATEGORY_SEO } from '../src/components/EmailTemplates/templates/seo-categories.js';
import { EMAIL_SEO } from '../src/components/EmailTemplates/templates/seo-content.js';
import { SECTION_TEMPLATES, SECTION_CATEGORIES } from '../src/components/SectionTemplates/templates/index.js';
import { SECTION_SEO } from '../src/components/SectionTemplates/templates/seo-content.js';
import { SECTION_CATEGORY_SEO } from '../src/components/SectionTemplates/templates/seo-categories.js';

// Exclude nofollow/test snippets (noindex: true) from sitemap + llms.txt — they only show on localhost
const SNIPPETS = ALL_SNIPPETS.filter(sn => !sn.noindex);

// The build output always ends up in out/, which make-zip.js archives as tools.zip.
// When NEXT_DIST_DIR is set (e.g. `NEXT_DIST_DIR=.next-deploy npm run deploy` while the dev
// server owns .next), Next writes the static export into that folder instead, so step 1
// moves it to out/ first.
const DIST_DIR = process.env.NEXT_DIST_DIR;

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

/** Write a file into the build output */
function write(filename, content) {
  fs.writeFileSync(path.join('out', filename), content, 'utf8');
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

/** Build a <urlset> of pages that may carry <image:image> entries (template libraries) */
function pageImageUrlset(entries) {
  const items = entries.map(({ loc, lastmod, changefreq, priority, images = [] }) => {
    const parts = [`\t\t<loc>${loc}</loc>`];
    if (lastmod)   parts.push(`\t\t<lastmod>${lastmod}</lastmod>`);
    if (changefreq) parts.push(`\t\t<changefreq>${changefreq}</changefreq>`);
    if (priority !== undefined) parts.push(`\t\t<priority>${priority.toFixed(1)}</priority>`);
    for (const img of images) {
      const ip = [`\t\t\t<image:loc>${img.loc}</image:loc>`];
      if (img.title)   ip.push(`\t\t\t<image:title>${esc(img.title)}</image:title>`);
      if (img.caption) ip.push(`\t\t\t<image:caption>${esc(img.caption)}</image:caption>`);
      parts.push(`\t\t<image:image>\n${ip.join('\n')}\n\t\t</image:image>`);
    }
    return `\t<url>\n${parts.join('\n')}\n\t</url>`;
  }).join('\n');
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    items,
    '</urlset>',
  ].join('\n');
}

/** Which captured preview images exist for a template library (public/images/<dir>/previews) */
const previewSet = dir => {
  try { return new Set(fs.readdirSync(path.join('public/images', dir, 'previews')).map(f => f.replace(/\.png$/, ''))); }
  catch { return new Set(); }
};

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

  /* ── 1. Build output → out/ ──────────────────────────────────────────────── */
  if (DIST_DIR && path.resolve(DIST_DIR) !== path.resolve('out')) {
    if (!fs.existsSync(path.join(DIST_DIR, 'index.html'))) throw new Error(`No static export found in ${DIST_DIR}/`);
    if (fs.existsSync('out')) fs.rmSync('out', { recursive: true });
    fs.renameSync(DIST_DIR, 'out');
    console.log(`✓ Moved ${DIST_DIR}/ → out/`);
  }
  if (!fs.existsSync(path.join('out', 'index.html'))) throw new Error('No static export found in out/');

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

  /* ── 3b. sitemap-email-templates.xml + sitemap-social-post-templates.xml ───── */
  // Each template library gets its own sitemap: category landing pages (lastmod = newest
  // template in it) and every template's editor page, with its captured preview image.
  const emailShots = previewSet('email-templates');
  const emailEntries = [
    ...EMAIL_CATEGORIES.filter(c => EMAIL_TEMPLATES.some(t => t.category === c.id)).map(c => ({
      loc:        `${BASE_URL}/email-templates/category/${c.id}/`,
      lastmod:    maxDate(EMAIL_TEMPLATES.filter(t => t.category === c.id).map(t => t.updated)),
      changefreq: 'monthly',
      priority:   0.7,
    })),
    ...EMAIL_TEMPLATES.map(t => ({
      loc:        `${BASE_URL}/email-templates/${t.id}/`,
      lastmod:    t.updated,
      changefreq: 'monthly',
      priority:   0.7,
      images:     emailShots.has(t.id) ? [{ loc: `${BASE_URL}/images/email-templates/previews/${t.id}.png`, title: `${t.name} — free HTML email template`, caption: t.description }] : [],
    })),
  ];
  const emailMaxLastmod = maxDate(emailEntries.map(e => e.lastmod));
  write('sitemap-email-templates.xml', pageImageUrlset(emailEntries));
  console.log(`sitemap-email-templates.xml -> ${emailEntries.length} URLs`);

  const socialShots = previewSet('social-post-templates');
  const socialEntries = [
    ...SOCIAL_CATEGORIES.filter(c => SOCIAL_TEMPLATES.some(t => t.category === c.id)).map(c => ({
      loc:        `${BASE_URL}/social-post-templates/category/${c.id}/`,
      lastmod:    maxDate(SOCIAL_TEMPLATES.filter(t => t.category === c.id).map(t => t.updated)),
      changefreq: 'monthly',
      priority:   0.7,
    })),
    ...SOCIAL_TEMPLATES.map(t => ({
      loc:        `${BASE_URL}/social-post-templates/${t.id}/`,
      lastmod:    t.updated,
      changefreq: 'monthly',
      priority:   0.7,
      images:     socialShots.has(t.id) ? [{ loc: `${BASE_URL}/images/social-post-templates/previews/${t.id}.png`, title: `${t.name} — free social media post template`, caption: t.description }] : [],
    })),
  ];
  const socialMaxLastmod = maxDate(socialEntries.map(e => e.lastmod));
  write('sitemap-social-post-templates.xml', pageImageUrlset(socialEntries));
  console.log(`sitemap-social-post-templates.xml -> ${socialEntries.length} URLs`);

  // Website section templates: images live in public/images/section-templates/
  const sectionShots = previewSet('section-templates');
  const sectionEntries = [
    ...SECTION_CATEGORIES.filter(c => SECTION_CATEGORY_SEO[c.id] && SECTION_TEMPLATES.some(t => t.category === c.id)).map(c => ({
      loc:        `${BASE_URL}/website-section-templates/category/${c.id}/`,
      lastmod:    maxDate(SECTION_TEMPLATES.filter(t => t.category === c.id).map(t => t.updated)),
      changefreq: 'monthly',
      priority:   0.7,
    })),
    ...SECTION_TEMPLATES.map(t => ({
      loc:        `${BASE_URL}/website-section-templates/${t.id}/`,
      lastmod:    t.updated,
      changefreq: 'monthly',
      priority:   0.7,
      images:     sectionShots.has(t.id) ? [{ loc: `${BASE_URL}/images/section-templates/previews/${t.id}.png`, title: `${t.name} — free website section template`, caption: t.description }] : [],
    })),
  ];
  const sectionMaxLastmod = maxDate(sectionEntries.map(e => e.lastmod));
  write('sitemap-website-section-templates.xml', pageImageUrlset(sectionEntries));
  console.log(`sitemap-website-section-templates.xml -> ${sectionEntries.length} URLs`);

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
    { loc: `${BASE_URL}/sitemap-email-templates.xml`,         lastmod: emailMaxLastmod },
    { loc: `${BASE_URL}/sitemap-social-post-templates.xml`,   lastmod: socialMaxLastmod },
    { loc: `${BASE_URL}/sitemap-website-section-templates.xml`, lastmod: sectionMaxLastmod },
  ];
  write('sitemap.xml', sitemapIndex(masterEntries));
  console.log(`sitemap.xml (index) -> ${masterEntries.length} sub-sitemaps registered`);


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

  let llmsTxt = `# webdevpuneet.com\n\n> Free copy-paste UI snippets and interactive coding playgrounds for frontend developers and learners. No sign-up, no data upload, no server processing.\n\nwebdevpuneet.com hosts ${SNIPPETS.length}+ free HTML, CSS & JS UI snippets and ${liveTools.length}+ interactive learn-to-code playgrounds (HTML, CSS, JavaScript, TypeScript, React, Vue, Angular, Next.js, Tailwind, SCSS, Bootstrap, GSAP, SVG and more) that run entirely in the browser. Everything is free, privacy-first, and works without an account.\n\nMain site: ${BASE_URL}/\nSitemap: ${BASE_URL}/sitemap.xml\nLearn to Code: ${BASE_URL}/learn-to-code/\n`;

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

  llmsTxt += `\n---\n\n## Social Post Templates\n\n`;
  llmsTxt += `${SOCIAL_TEMPLATES.length} free HTML/CSS templates for Instagram, Facebook, X, LinkedIn and Pinterest posts and Stories. Edit text, photos, colours and fonts in the browser, preview them in platform mock-ups, download PNG/JPEG in six sizes, animated MP4 videos for Reels and Stories, carousels as a LinkedIn PDF, bulk-create posts from a CSV, or copy the HTML.\n\nLibrary: ${BASE_URL}/social-post-templates/\n\n`;
  llmsTxt += `Each template is real HTML/CSS (copy it, download a .html file, or fork it into My Code), is free with no account or watermark, runs entirely in the browser (photos are never uploaded), and exports 1080×1350, 1080×1080, 1080×1920, 1600×900, LinkedIn 1200×627 and Pinterest 1000×1500 from one design.\n\n`;
  for (const c of SOCIAL_CATEGORIES) {
    const list = SOCIAL_TEMPLATES.filter(t => t.category === c.id);
    if (!list.length) continue;
    const cs = SOCIAL_CATEGORY_SEO[c.id];
    llmsTxt += `### [${cs?.h1 || c.label}](${BASE_URL}/social-post-templates/category/${c.id}/)\n\n${c.blurb}${cs?.keywords ? ` Searches: ${cs.keywords.join(', ')}.` : ''}\n\n`;
    for (const t of list) {
      const kw = SOCIAL_SEO[t.id]?.keywords;
      llmsTxt += `- [${t.name}](${BASE_URL}/social-post-templates/${t.id}/) : ${t.description}${kw ? ` Good for: ${kw.join(', ')}.` : ''}\n`;
    }
    llmsTxt += '\n';
  }
  llmsTxt += `\n---\n\n## Email Templates\n\n`;
  llmsTxt += `Free responsive HTML email templates built for real inboxes (Gmail, Outlook, Apple Mail): table layout, inline styles, Outlook-safe VML buttons, dark mode, hidden preheader and CAN-SPAM-ready footer. Edit online with desktop, mobile and dark previews, add extra sections, insert merge tags that convert to Mailchimp, Klaviyo, HubSpot or Brevo syntax on export, then copy the HTML, get a plain-text version, or fork the code into My Code.\n\nLibrary: ${BASE_URL}/email-templates/\n\n`;
  for (const c of EMAIL_CATEGORIES) {
    const list = EMAIL_TEMPLATES.filter(t => t.category === c.id);
    if (!list.length) continue;
    const cs = EMAIL_CATEGORY_SEO[c.id];
    llmsTxt += `### [${cs?.h1 || c.label}](${BASE_URL}/email-templates/category/${c.id}/)\n\n${c.blurb}${cs?.keywords ? ` Searches: ${cs.keywords.join(', ')}.` : ''}\n\n`;
    for (const t of list) {
      const kw = EMAIL_SEO[t.id]?.keywords;
      llmsTxt += `- [${t.name}](${BASE_URL}/email-templates/${t.id}/) : ${t.description}${kw ? ` Good for: ${kw.join(', ')}.` : ''}\n`;
    }
    llmsTxt += '\n';
  }
  llmsTxt += `\n---\n\n## Website Section Templates\n\n`;
  llmsTxt += `Free editable website section templates: hero, features (icon grid, bento grid, zig-zag rows, split image, how-it-works steps) and pricing sections (three-tier, dark glow, single plan, package rows, all with a GSAP Flip monthly/yearly switch) and testimonials (masonry wall, GSAP Draggable carousel, infinite marquee, featured quote with stats), with navbar, FAQ, CTA and footer to follow. Cards, rows and steps are repeatable lists with 60 built-in icons. Every section shares one theme of CSS custom properties (brand, background, surface, text, muted, fonts, radius, width), is responsive through CSS container queries, and animates in with GSAP + ScrollTrigger and SplitText headline effects (fade up, fade, slide, zoom; word, line, letter and blur text reveals; content stays visible without JavaScript and respects reduced motion). Edit text, links, images, colours and fonts in the browser, upload images and custom fonts (stored locally in IndexedDB, with a backup export/import), then export a single HTML file, a ZIP with images, a React component or a Vue component, or fork it into My Code.\n\nLibrary: ${BASE_URL}/website-section-templates/\n\n`;
  for (const c of SECTION_CATEGORIES) {
    const list = SECTION_TEMPLATES.filter(t => t.category === c.id);
    if (!list.length) continue;
    const cs = SECTION_CATEGORY_SEO[c.id];
    llmsTxt += `### [${cs?.h1 || c.label}](${BASE_URL}/website-section-templates/category/${c.id}/)\n\n${c.blurb}${cs?.keywords ? ` Searches: ${cs.keywords.join(', ')}.` : ''}\n\n`;
    for (const t of list) {
      const kw = SECTION_SEO[t.id]?.keywords;
      llmsTxt += `- [${t.name}](${BASE_URL}/website-section-templates/${t.id}/) : ${t.description}${kw ? ` Good for: ${kw.join(', ')}.` : ''}\n`;
    }
    llmsTxt += '\n';
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
  console.log('  ├─ sitemap-ui-snippets.xml');
  snippetListFiles.forEach(f => console.log(`  │    └─ ${f}`));
  console.log('  ├─ sitemap-email-templates.xml');
  console.log('  ├─ sitemap-social-post-templates.xml');
  console.log('  └─ sitemap-website-section-templates.xml');
}

main().catch(err => { console.error(err); process.exit(1); });

