// Renders every website section template in headless Chromium and writes:
//   public/images/section-templates/previews/<id>.png   the section at 1280 px wide (gallery cards, About screenshot)
//   public/images/section-templates/og/<id>.jpg         1200×630 share image (top of the section at 1440 px)
// Re-runnable: skips sections that already have both files unless --force. Any
// non-flag argument filters by id prefix:  node scripts/capture-section-previews.mjs --force saas
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir, access, readFile } from 'node:fs/promises';
import path from 'node:path';
import { SECTION_TEMPLATES, defaultSectionState } from '../src/components/SectionTemplates/templates/index.js';
import { documentHtml } from '../src/components/SectionTemplates/templates/render.js';

const ROOT = path.resolve('public/images/section-templates');
const PREVIEW_DIR = path.join(ROOT, 'previews');
const OG_DIR = path.join(ROOT, 'og');
const ARGS = process.argv.slice(2);
const FORCE = ARGS.includes('--force');
const FILTERS = ARGS.filter(a => !a.startsWith('--'));
const exists = p => access(p).then(() => true, () => false);

// Images on this site load from public/ (inlined), so capture works before a deploy
async function inlineLocalImages(html) {
  const urls = [...new Set(html.match(/https:\/\/webdevpuneet\.com\/images\/[^"')\s]+/g) || [])];
  for (const u of urls) {
    const file = path.resolve('public', u.replace('https://webdevpuneet.com/', ''));
    if (!(await exists(file))) continue;
    const ext = path.extname(file).slice(1).replace('jpg', 'jpeg');
    html = html.split(u).join(`data:image/${ext};base64,${(await readFile(file)).toString('base64')}`);
  }
  return html;
}

/* Placeholder page (no text) shown under navbars in previews: a hero with heading bars,
   buttons and a product panel, tinted with the section's brand colour */
function mockPage(brand) {
  const bar = (w, h, c, extra = '') => `<div style="width:${w};height:${h}px;border-radius:${h / 2}px;background:${c};${extra}"></div>`;
  return `<main style="position:relative;z-index:0;padding:72px 96px 80px;min-height:720px;background:radial-gradient(900px 500px at 75% 30%,color-mix(in srgb,${brand} 22%,transparent),transparent 70%),linear-gradient(180deg,#f8fafc,#eef2f7);display:grid;grid-template-columns:1fr 1fr;gap:64px;align-items:start;font-family:sans-serif">
  <div style="display:flex;flex-direction:column;gap:18px">
    ${bar('140px', 26, `color-mix(in srgb,${brand} 25%,#fff)`)}
    ${bar('92%', 44, '#1e293b')}${bar('70%', 44, brand)}
    ${bar('85%', 14, '#cbd5e1', 'margin-top:12px')}${bar('75%', 14, '#cbd5e1')}
    <div style="display:flex;gap:14px;margin-top:16px">${bar('170px', 52, brand)}${bar('140px', 52, '#e2e8f0')}</div>
  </div>
  <div style="height:380px;border-radius:24px;background:#fff;box-shadow:0 40px 80px -40px rgba(15,23,42,.35);padding:28px;display:flex;flex-direction:column;gap:16px">
    ${bar('40%', 18, '#334155')}${bar('100%', 120, `color-mix(in srgb,${brand} 18%,#fff)`, 'border-radius:16px')}
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px">${bar('100%', 70, '#f1f5f9', 'border-radius:14px')}${bar('100%', 70, '#f1f5f9', 'border-radius:14px')}${bar('100%', 70, '#f1f5f9', 'border-radius:14px')}</div>
  </div>
</main>`;
}

async function main() {
  await mkdir(PREVIEW_DIR, { recursive: true });
  await mkdir(OG_DIR, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
  let made = 0;
  for (const t of SECTION_TEMPLATES.filter(x => !FILTERS.length || FILTERS.some(f => x.id.startsWith(f)))) {
    const previewPath = path.join(PREVIEW_DIR, `${t.id}.png`);
    const ogPath = path.join(OG_DIR, `${t.id}.jpg`);
    if (!FORCE && await exists(previewPath) && await exists(ogPath)) continue;
    let html = await inlineLocalImages(documentHtml(t, defaultSectionState(t), { motion: false }));
    // Short sections (navbars) are shown on top of a placeholder page, so the preview and
    // share image show them in context instead of a thin strip
    if (t.previewMinHeight) html = html.replace('</body>', `${mockPage(t.theme?.brand || '#4f46e5')}</body>`);

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const shot = t.previewMinHeight
      ? await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 1280, height: Math.min(720, t.previewMinHeight) } })
      : await page.locator('section.st').screenshot({ type: 'png' });
    await sharp(shot).png({ compressionLevel: 9 }).toFile(previewPath);

    // Share image: the section at a wide desktop size, cropped to 1200×630
    await page.setViewportSize({ width: 1440, height: 756 });
    await page.evaluate(() => document.fonts.ready);
    const wide = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 1440, height: 756 } });
    await sharp(wide).resize(1200, 630).jpeg({ quality: 80, mozjpeg: true }).toFile(ogPath);
    made++;
    console.log(`✓ ${t.id}`);
  }
  await browser.close();
  console.log(`Done: ${made} section template(s) captured.`);
}
main().catch(e => { console.error(e); process.exit(1); });
