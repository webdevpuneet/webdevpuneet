// Renders every social post template in headless Chromium and writes:
//   public/images/social-post-templates/previews/<id>.png   full-size preview (gallery cards, About screenshot)
//   public/images/social-post-templates/og/<id>.jpg         1200×630 OG image, compressed with sharp
//   public/images/social-post-templates/og/gallery.jpg      1200×630 collage for /social-post-templates/
// Re-runnable: skips templates whose files exist unless --force. Any non-flag
// argument filters by id prefix, e.g.  node scripts/capture-template-previews.mjs --force big-
//
// Run it yourself after adding or changing a template:
//   node scripts/capture-template-previews.mjs
import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdir, access, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { TEMPLATES } from '../src/components/SocialPostTemplates/templates/index.js';
import { templateSource } from '../src/components/SocialPostTemplates/source.js';

const ROOT = path.resolve('public/images/social-post-templates');
const PREVIEW_DIR = path.join(ROOT, 'previews');
const OG_DIR = path.join(ROOT, 'og');
const ARGS = process.argv.slice(2);
const FORCE = ARGS.includes('--force');
const FILTERS = ARGS.filter(a => !a.startsWith('--'));
const OG_SIZE = { id: 'landscape', label: 'Open Graph', w: 1200, h: 630 };

const exists = p => access(p).then(() => true, () => false);

function page(html, css, w, h) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
html,body{margin:0;padding:0;width:${w}px;height:${h}px;overflow:hidden}
${css}</style></head><body>${html}</body></html>`;
}

async function render(browserPage, t, size) {
  // size null = the template's opening size, resolved by templateSource
  const { html, css, size: z } = templateSource(t, size);
  await browserPage.setViewportSize({ width: z.w, height: z.h });
  await browserPage.setContent(page(html, css, z.w, z.h), { waitUntil: 'networkidle' });
  await browserPage.evaluate(async () => {
    await document.fonts.ready;
    // Same fitting as the editor: shrink [data-fit] text until its box stops overflowing
    const root = document.querySelector('.spt');
    const els = [...root.querySelectorAll('[data-fit]')];
    const boxes = [...new Set(els.map(el => el.closest('[data-fit-box]') || root))];
    const over = () => boxes.some(b => b.scrollHeight > b.clientHeight + 1) || els.some(el => el.scrollWidth > el.clientWidth + 1);
    const base = els.map(el => parseFloat(getComputedStyle(el).fontSize) || 16);
    let k = 1;
    for (let i = 0; i < 45 && over(); i++) { k *= 0.95; els.forEach((el, j) => { el.style.fontSize = `${Math.max(9, base[j] * k)}px`; }); }
  });
  return browserPage.screenshot({ clip: { x: 0, y: 0, width: z.w, height: z.h }, type: 'png' });
}

async function main() {
  await mkdir(PREVIEW_DIR, { recursive: true });
  await mkdir(OG_DIR, { recursive: true });
  const browser = await chromium.launch();
  const browserPage = await browser.newPage();
  const list = TEMPLATES.filter(t => !FILTERS.length || FILTERS.some(f => t.id.startsWith(f)));
  let made = 0;

  for (const t of list) {
    const previewPath = path.join(PREVIEW_DIR, `${t.id}.png`);
    const ogPath = path.join(OG_DIR, `${t.id}.jpg`);
    if (!FORCE && await exists(previewPath) && await exists(ogPath)) continue;

    // Full-size preview at the template's opening size (4:5, or 9:16 for Story-first designs)
    const preview = await render(browserPage, t, null);
    await sharp(preview).png({ compressionLevel: 9, palette: false }).toFile(previewPath);

    // OG card: the design laid out at 1200×630, compressed for fast unfurls
    const og = await render(browserPage, t, OG_SIZE);
    await sharp(og).jpeg({ quality: 82, mozjpeg: true }).toFile(ogPath);
    made++;
    console.log(`✓ ${t.id}`);
  }

  // Gallery OG: four previews side by side on a dark band
  const galleryPath = path.join(OG_DIR, 'gallery.jpg');
  if (FORCE || !await exists(galleryPath) || made > 0) {
    const pick = ['big-quote', 'product-launch', 'holiday-sale', 'testimonial'];
    const tiles = await Promise.all(pick.map(id => sharp(path.join(PREVIEW_DIR, `${id}.png`)).resize(264, 330, { fit: 'cover', position: 'top' }).png().toBuffer()));
    await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#0f172a' } })
      .composite(tiles.map((input, i) => ({ input, left: 48 + i * (264 + 24), top: 150 })))
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(galleryPath);
    console.log('✓ gallery collage');
  }

  await browser.close();
  console.log(`Done: ${made} template(s) captured.`);
}

main().catch(err => { console.error(err); process.exit(1); });
