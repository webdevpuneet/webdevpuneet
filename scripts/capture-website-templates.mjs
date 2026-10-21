// Images for the website templates (/website-builder/ gallery and /website-builder/templates/<id>/):
//   full/<id>.jpg    the whole page at desktop width (900px wide), for the template page
//   thumb/<id>.jpg   the top of the page (640×400), for cards
//   og/<id>.jpg      the top of the page in a browser frame (1200×630), for sharing
// Usage: node scripts/capture-website-templates.mjs [id …] [--force]
import { chromium } from 'playwright';
import sharp from 'sharp';
import { readFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { WEBSITE_TEMPLATES } from '../src/components/SectionTemplates/templates/starters.js';
import { pageFromStarter, pageDocumentHtml } from '../src/components/SectionTemplates/templates/page.js';

const ROOT = path.resolve('public/images/website-templates');
const ARGS = process.argv.slice(2);
const FORCE = ARGS.includes('--force');
const ONLY = ARGS.filter(a => !a.startsWith('--'));
const exists = p => access(p).then(() => true, () => false);

async function inline(html) {
  for (const u of new Set(html.match(/https:\/\/webdevpuneet\.com\/images\/[^"')\s]+/g) || [])) {
    const f = path.resolve('public', u.replace('https://webdevpuneet.com/', ''));
    const ext = path.extname(f).slice(1).replace('jpg', 'jpeg');
    try { html = html.split(u).join(`data:image/${ext};base64,${(await readFile(f)).toString('base64')}`); } catch { /* not local */ }
  }
  return html;
}

async function framed(shot, brand) {
  const W = 1200, H = 630;
  const inner = await sharp(shot).resize(1040, 650, { fit: 'cover', position: 'top' }).png().toBuffer();
  const bar = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1040" height="36"><rect width="1040" height="36" fill="#eef0f6"/><circle cx="20" cy="18" r="6" fill="#f87171"/><circle cx="40" cy="18" r="6" fill="#fbbf24"/><circle cx="60" cy="18" r="6" fill="#34d399"/><rect x="380" y="9" width="280" height="18" rx="9" fill="#ffffff"/></svg>`);
  const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1e1b4b"/><stop offset="1" stop-color="${brand}"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/></svg>`);
  const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1040" height="600"><rect width="1040" height="640" rx="18" fill="#fff"/></svg>`);
  const win = await sharp({ create: { width: 1040, height: 600, channels: 4, background: '#ffffff' } })
    .composite([{ input: bar, top: 0, left: 0 }, { input: await sharp(inner).extract({ left: 0, top: 0, width: 1040, height: 564 }).toBuffer(), top: 36, left: 0 }, { input: mask, blend: 'dest-in' }])
    .png().toBuffer();
  return sharp(bg).composite([{ input: win, top: 60, left: 80 }]).jpeg({ quality: 82, mozjpeg: true }).toBuffer();
}

const browser = await chromium.launch();
for (const dir of ['full', 'thumb', 'og']) await mkdir(path.join(ROOT, dir), { recursive: true });
let made = 0;
for (const t of WEBSITE_TEMPLATES.filter(x => !ONLY.length || ONLY.includes(x.id))) {
  const out = d => path.join(ROOT, d, `${t.id}.jpg`);
  if (!FORCE && await exists(out('full')) && await exists(out('og'))) continue;
  const page = pageFromStarter(t.id);
  const p = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
  const errors = []; p.on('pageerror', e => errors.push(e.message));
  await p.setContent(await inline(pageDocumentHtml(page, { motion: false })), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  const full = await p.screenshot({ fullPage: true });
  const top = await p.screenshot({ clip: { x: 0, y: 0, width: 1280, height: 800 } });
  await sharp(full).resize(900).jpeg({ quality: 72, mozjpeg: true }).toFile(out('full'));
  await sharp(top).resize(640, 400, { fit: 'cover', position: 'top' }).jpeg({ quality: 78, mozjpeg: true }).toFile(out('thumb'));
  await sharp(await framed(top, page.theme.brand || '#4f46e5')).toFile(out('og'));
  await p.close();
  made++;
  console.log(`✓ ${t.id}${errors.length ? ` (page errors: ${errors.join('; ')})` : ''}`);
}
await browser.close();
console.log(`Done: ${made} template(s) captured.`);
