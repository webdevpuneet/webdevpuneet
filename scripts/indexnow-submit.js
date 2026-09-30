import { LIVE_TOOLS } from '../src/lib/tools-registry.js';
import { CATEGORIES } from '../src/lib/categories.js';
import { VISIBLE_SNIPPETS } from '../src/components/UiSnippetsTool/snippets.js';

const DEFAULT_BASE_URL = 'https://webdevpuneet.com';
const DEFAULT_KEY = '06ff9525d1da00756d719b180552b64fdb4ea05c3594397d3df2c140e3bf489e';
const ENDPOINT = process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow';
const MAX_BATCH_SIZE = 10_000;

// Disabled until webdevpuneet.com is live on its new server. Flip to true (or set
// INDEXNOW_ENABLED=1) once the site is deployed and the key file is reachable.
// --dry-run still works while disabled (it never contacts IndexNow).
const INDEXNOW_ENABLED = false;

function usage() {
  console.log([
    'Usage:',
    '  npm run indexnow',
    '  npm run indexnow -- --dry-run',
    '  npm run indexnow -- --url https://webdevpuneet.com/mind-map/',
    '',
    'Environment overrides:',
    '  INDEXNOW_BASE_URL=https://webdevpuneet.com',
    '  INDEXNOW_KEY=<8-128 character key>',
    '  INDEXNOW_KEY_LOCATION=https://webdevpuneet.com/<key>.txt',
    '  INDEXNOW_ENDPOINT=https://api.indexnow.org/indexnow',
  ].join('\n'));
}

function normalizeBaseUrl(value) {
  return (value || DEFAULT_BASE_URL).replace(/\/+$/, '');
}

function getArgValues(flag) {
  const values = [];
  const args = process.argv.slice(2);
  for (let i = 0; i < args.length; i++) {
    if (args[i] === flag && args[i + 1]) {
      values.push(args[i + 1]);
      i++;
    }
  }
  return values;
}

function getPositionalUrls() {
  const args = process.argv.slice(2);
  const urls = [];
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--url') { i++; continue; }
    if (arg.startsWith('--')) continue;
    if (/^https?:\/\//i.test(arg)) urls.push(arg);
  }
  return urls;
}

function buildDefaultUrls(baseUrl) {
  const urls = [
    `${baseUrl}/`,
    `${baseUrl}/puneet/`,
    `${baseUrl}/privacy-policy/`,
    `${baseUrl}/terms/`,
    ...CATEGORIES.map(c => `${baseUrl}/${c.slug}/`),
    ...LIVE_TOOLS.map(t => `${baseUrl}/${t.slug}/`),
    `${baseUrl}/ui-snippets/`,
    ...VISIBLE_SNIPPETS.map(s => `${baseUrl}/ui-snippets/${s.id}/`),
  ];
  return [...new Set(urls)];
}

function chunk(items, size) {
  const out = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

async function submitBatch({ host, key, keyLocation, urls, dryRun }) {
  const payload = { host, key, keyLocation, urlList: urls };
  if (dryRun) {
    console.log(JSON.stringify(payload, null, 2));
    return { status: 'dry-run' };
  }

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  if (!response.ok && response.status !== 202) {
    const body = await response.text().catch(() => '');
    throw new Error(`IndexNow rejected batch: HTTP ${response.status}${body ? ` ${body}` : ''}`);
  }
  return { status: response.status };
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) {
    usage();
    return;
  }

  const baseUrl = normalizeBaseUrl(process.env.INDEXNOW_BASE_URL);
  const url = new URL(baseUrl);
  const host = url.host;
  const key = process.env.INDEXNOW_KEY || DEFAULT_KEY;
  const keyLocation = process.env.INDEXNOW_KEY_LOCATION || `${baseUrl}/${key}.txt`;
  const dryRun = args.includes('--dry-run') || process.env.INDEXNOW_DRY_RUN === '1';
  if (!dryRun && !INDEXNOW_ENABLED && process.env.INDEXNOW_ENABLED !== '1') {
    console.log('IndexNow is disabled for webdevpuneet.com (see INDEXNOW_ENABLED in scripts/indexnow-submit.js). Use --dry-run to preview.');
    return;
  }
  const explicitUrls = [...getArgValues('--url'), ...getPositionalUrls()];
  const urls = explicitUrls.length ? explicitUrls : buildDefaultUrls(baseUrl);

  if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) {
    throw new Error('INDEXNOW_KEY must be 8-128 characters and contain only letters, numbers, or dashes.');
  }
  if (!urls.every(item => new URL(item).host === host)) {
    throw new Error(`Every submitted URL must belong to ${host}.`);
  }

  const batches = chunk(urls, MAX_BATCH_SIZE);
  console.log(`${dryRun ? 'Preparing' : 'Submitting'} ${urls.length} URL${urls.length !== 1 ? 's' : ''} to IndexNow for ${host}`);

  for (let i = 0; i < batches.length; i++) {
    const result = await submitBatch({ host, key, keyLocation, urls: batches[i], dryRun });
    console.log(`Batch ${i + 1}/${batches.length}: ${result.status}`);
  }
}

main().catch(err => {
  console.error(err.message);
  process.exit(1);
});
