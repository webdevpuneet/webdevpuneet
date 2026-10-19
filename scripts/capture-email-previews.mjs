// Renders every email template in headless Chromium and writes:
//   public/images/email-templates/previews/<id>.png   full email at 640 px wide (About section, gallery card)
//   public/images/email-templates/og/<id>.jpg         1200×630 share card (title + email preview), compressed
// Re-runnable: skips templates that already have both files unless --force. Any
// non-flag argument filters by id prefix:  node scripts/capture-email-previews.mjs --force welcome
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir, access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { EMAIL_TEMPLATES, defaultEmailState, emailCategoryById } from '../src/components/EmailTemplates/templates/index.js';
import { sampleMergePlain } from '../src/components/EmailTemplates/templates/meta.js';

const ROOT = path.resolve('public/images/email-templates');
const PREVIEW_DIR = path.join(ROOT, 'previews');
const OG_DIR = path.join(ROOT, 'og');
const ARGS = process.argv.slice(2);
const FORCE = ARGS.includes('--force');
const FILTERS = ARGS.filter(a => !a.startsWith('--'));
const exists = p => access(p).then(() => true, () => false);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Images on this site load from public/ (inlined), so capture works before a deploy
async function inlineLocalImages(html) {
  const urls = [...new Set(html.match(/https:\/\/webdevpuneet\.com\/images\/[^"')\s]+/g) || [])];
  for (const u of urls) {
    const file = path.resolve('public', u.replace('https://webdevpuneet.com/', ''));
    if (!(await exists(file))) continue;
    const ext = path.extname(file).slice(1).replace('jpg', 'jpeg');
    const data = `data:image/${ext};base64,${(await readFile(file)).toString('base64')}`;
    html = html.split(u).join(data);
  }
  return html;
}

function ogCard(t, brand) {
  const cat = emailCategoryById(t.category)?.label || 'Email';
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0f172a"/><stop offset="1" stop-color="#1e1b4b"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.2" r="0.7"><stop offset="0" stop-color="${brand}" stop-opacity="0.55"/><stop offset="1" stop-color="${brand}" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <text x="72" y="150" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" letter-spacing="3" fill="${brand}">${esc(cat.toUpperCase())} EMAIL</text>
  <text x="72" y="230" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="800" fill="#ffffff">${esc(t.name.replace(/ Email$/, ''))}</text>
  <text x="72" y="300" font-family="Segoe UI, Arial, sans-serif" font-size="64" font-weight="800" fill="#ffffff">Email Template</text>
  <text x="72" y="360" font-family="Segoe UI, Arial, sans-serif" font-size="26" fill="#cbd5e1">Free responsive HTML · dark mode</text>
  <g font-family="Segoe UI, Arial, sans-serif" font-size="19" font-weight="600" fill="#e2e8f0">
    <rect x="72" y="410" width="104" height="40" rx="20" fill="#ffffff" fill-opacity="0.1"/><text x="124" y="437" text-anchor="middle">Gmail</text>
    <rect x="188" y="410" width="116" height="40" rx="20" fill="#ffffff" fill-opacity="0.1"/><text x="246" y="437" text-anchor="middle">Outlook</text>
    <rect x="316" y="410" width="140" height="40" rx="20" fill="#ffffff" fill-opacity="0.1"/><text x="386" y="437" text-anchor="middle">Apple Mail</text>
  </g>
  <text x="72" y="560" font-family="Segoe UI, Arial, sans-serif" font-size="22" font-weight="700" fill="#94a3b8">webdevpuneet.com/email-templates</text>
</svg>`);
}

async function main() {
  await mkdir(PREVIEW_DIR, { recursive: true });
  await mkdir(OG_DIR, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 640, height: 900 }, deviceScaleFactor: 1 });
  let made = 0;
  for (const t of EMAIL_TEMPLATES.filter(x => !FILTERS.length || FILTERS.some(f => x.id.startsWith(f)))) {
    const previewPath = path.join(PREVIEW_DIR, `${t.id}.png`);
    const ogPath = path.join(OG_DIR, `${t.id}.jpg`);
    if (!FORCE && await exists(previewPath) && await exists(ogPath)) continue;
    const state = defaultEmailState(t);
    const html = await inlineLocalImages(sampleMergePlain(t.build(state)));
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const shot = await page.screenshot({ fullPage: true, type: 'png' });
    await sharp(shot).png({ compressionLevel: 9 }).toFile(previewPath);

    // Share card: email preview in a rounded frame on the right, title on the left
    const crop = await sharp(shot).extract({ left: 0, top: 0, width: 640, height: 760 }).resize(470).png().toBuffer();
    const { height: ch } = await sharp(crop).metadata();
    const h = Math.min(ch, 560);
    const mask = Buffer.from(`<svg width="470" height="${h}"><rect width="470" height="${h + 40}" rx="22" fill="#fff"/></svg>`);
    const framed = await sharp(crop).extract({ left: 0, top: 0, width: 470, height: h }).composite([{ input: mask, blend: 'dest-in' }]).png().toBuffer();
    const shadow = Buffer.from(`<svg width="1200" height="630"><defs><filter id="s" x="-20%" y="-20%" width="140%" height="160%"><feGaussianBlur stdDeviation="18"/></filter></defs><rect x="${670}" y="${80}" width="470" height="${h}" rx="22" fill="#000" opacity="0.45" filter="url(#s)"/></svg>`);
    await sharp(ogCard(t, state.vars.brand))
      .composite([{ input: shadow, left: 0, top: 0 }, { input: framed, left: 660, top: 70 }])
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(ogPath);
    made++;
    console.log(`✓ ${t.id}`);
  }
  await browser.close();
  console.log(`Done: ${made} email template(s) captured.`);
}

main().catch(err => { console.error(err); process.exit(1); });
