/* ---------------------------------------------------------------
   sync-fwdtools-sidebar.mjs — snapshot fwdtools' sidebar groups

   The webdevpuneet sidebar shows the same Learn to Code / Freelance /
   category accordions as fwdtools. Tools that live here link locally;
   every other tool links to https://fwdtools.com/<slug>/.

   Reads ../fwdtools/src/lib/tools-registry.js and writes
   src/data/fwdtools-sidebar.json, and copies any missing tool icons
   into public/icons/. Re-run after tools are added on fwdtools:

     node scripts/sync-fwdtools-sidebar.mjs
--------------------------------------------------------------- */
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const FWD_ROOT = path.resolve('../fwdtools');
const { CATEGORY_META, LIVE_TOOLS } = await import(
  pathToFileURL(path.join(FWD_ROOT, 'src/lib/tools-registry.js')).href
);

// Learn to Code: every playground now on webdevpuneet (Mind Map stays on fwdtools).
// Freelance mirrors FREELANCER_SLUGS_SIDEBAR in fwdtools' Sidebar.
const PLAYGROUND_SLUGS = [
  'ui-snippets', 'ai-prompt-studio',
  'html-playground', 'css-playground', 'js-playground', 'typescript-playground', 'scss-playground',
  'tailwind-playground', 'bootstrap5-playground', 'jquery-playground', 'react-playground', 'angular-playground',
  'vue-playground', 'nextjs-playground', 'gsap-playground', 'svg-playground',
  'git-playground', 'python-playground', 'nodejs-playground', 'php-playground',
  'sql-playground', 'mongo-playground', 'express-playground', 'graphql-playground',
  'firebase-playground', 'rest-api-builder-playground', 'redis-playground',
  'database-schema-designer',
];

const FREELANCER_SLUGS = [
  'freelance-dashboard', 'freelance-invoice-generator', 'client-crm', 'proposal-builder',
  'contract-template-manager', 'freelance-expense-tracker', 'time-tracker',
  'freelance-rate-calculator', 'follow-up-reminder-board', 'local-invoice-tracker',
  'retainer-tracker', 'milestone-payment-tracker', 'scope-creep-tracker',
  'client-intake-form-builder', 'freelance-availability-planner',
];

const slim = t => ({ slug: t.slug, name: t.name, ...(t.icon ? { icon: t.icon } : {}) });
const bySlug = Object.fromEntries(LIVE_TOOLS.map(t => [t.slug, t]));

const data = {
  // Slugs fwdtools doesn't have (webdevpuneet-only playgrounds) are resolved
  // from webdevpuneet's own registry at render time, so keep them as bare slugs.
  playgrounds: PLAYGROUND_SLUGS.map(s => (bySlug[s] ? slim(bySlug[s]) : { slug: s })),
  freelancer: FREELANCER_SLUGS.map(s => bySlug[s]).filter(Boolean).map(slim),
  categories: CATEGORY_META.map(c => ({
    id: c.id,
    label: c.label,
    tools: LIVE_TOOLS.filter(t => !t.extended && t.category === c.id).map(slim),
  })).filter(c => c.tools.length > 0),
};

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/fwdtools-sidebar.json', JSON.stringify(data, null, 2) + '\n', 'utf8');

// Icons: /icons/<slug>.svg, plus any registry icon given as a /path.
const iconPaths = new Set();
for (const t of [...data.playgrounds, ...data.freelancer, ...data.categories.flatMap(c => c.tools)]) {
  iconPaths.add(`/icons/${t.slug}.svg`);
  if (t.icon?.startsWith('/')) iconPaths.add(t.icon);
}
let copied = 0;
for (const p of iconPaths) {
  const src = path.join(FWD_ROOT, 'public', p);
  const dest = path.join('public', p);
  if (fs.existsSync(dest) || !fs.existsSync(src)) continue;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  copied++;
}

const total = data.categories.reduce((n, c) => n + c.tools.length, 0);
console.log(`✓ src/data/fwdtools-sidebar.json — ${data.playgrounds.length} playgrounds, ${data.freelancer.length} freelancer, ${data.categories.length} categories (${total} tools)`);
console.log(`✓ ${copied} icon(s) copied into public/icons/`);
