// Renders the email footer social icons (socialIconSvg in EmailTemplates/templates/shell.js)
// to grey PNGs: public/images/email-templates/social/<slug>.png, 72×72 (shown at 24px, 3×).
// Emails can't use SVG, so these hosted PNGs are what "Grey icons" links to.
// Usage: node scripts/build-email-social-icons.mjs   (headless Chromium via playwright)
import { mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { socialIconSvg, SOCIAL_SLUGS, SOCIAL_ICON_GREY } from '../src/components/EmailTemplates/templates/shell.js';

const SIZE = 72;
const OUT = new URL('../public/images/email-templates/social/', import.meta.url);
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: SIZE, height: SIZE } });
for (const slug of SOCIAL_SLUGS) {
  await page.setContent(`<html><body style="margin:0;background:transparent">${socialIconSvg(slug, SOCIAL_ICON_GREY, SIZE)}</body></html>`);
  const file = new URL(`${slug}.png`, OUT);
  await page.locator('svg').screenshot({ path: fileURLToPath(file), omitBackground: true });
  console.log('wrote', fileURLToPath(file));
}
await browser.close();
