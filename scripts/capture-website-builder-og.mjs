// Share image for /website-builder/: the SaaS starter page rendered by the page engine,
// framed in a browser window on a soft background (1200×630).
//   node scripts/capture-website-builder-og.mjs
import { chromium } from 'playwright';
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { pageFromStarter, pageDocumentHtml } from '../src/components/SectionTemplates/templates/page.js';

async function inline(html) {
  for (const u of new Set(html.match(/https:\/\/webdevpuneet\.com\/images\/[^"')\s]+/g) || [])) {
    const f = path.resolve('public', u.replace('https://webdevpuneet.com/', ''));
    const ext = path.extname(f).slice(1).replace('jpg', 'jpeg');
    try { html = html.split(u).join(`data:image/${ext};base64,${(await readFile(f)).toString('base64')}`); } catch { /* skip */ }
  }
  return html;
}

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
await p.setContent(await inline(pageDocumentHtml(pageFromStarter('saas'), { motion: false })), { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
const shot = await p.screenshot({ clip: { x: 0, y: 0, width: 1440, height: 900 } });
await b.close();

const W = 1200, H = 630, inner = await sharp(shot).resize(1040, 650).png().toBuffer();
const bar = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1040" height="36"><rect width="1040" height="36" fill="#eef0f6"/><circle cx="20" cy="18" r="6" fill="#f87171"/><circle cx="40" cy="18" r="6" fill="#fbbf24"/><circle cx="60" cy="18" r="6" fill="#34d399"/><rect x="380" y="9" width="280" height="18" rx="9" fill="#ffffff"/></svg>`);
const bg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#312e81"/><stop offset="1" stop-color="#6d28d9"/></linearGradient></defs><rect width="${W}" height="${H}" fill="url(#g)"/></svg>`);
const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1040" height="600"><rect width="1040" height="640" rx="18" fill="#fff"/></svg>`);
const win = await sharp({ create: { width: 1040, height: 600, channels: 4, background: '#ffffff' } })
  .composite([{ input: bar, top: 0, left: 0 }, { input: await sharp(inner).extract({ left: 0, top: 0, width: 1040, height: 564 }).toBuffer(), top: 36, left: 0 }, { input: mask, blend: 'dest-in' }])
  .png().toBuffer();
await sharp(bg).composite([{ input: win, top: 60, left: 80 }]).png({ compressionLevel: 9 }).toFile('public/images/website-builder.png');
console.log('public/images/website-builder.png written');
