import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

const errors = [];
page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', e => errors.push(e.message));

await page.goto('http://localhost:3000/ui-snippets/parallax-hero/', { waitUntil: 'networkidle' });
await page.screenshot({ path: 'scripts/parallax-before.png', fullPage: false });

// Find the snippet iframe
const iframe = page.frameLocator('iframe').first();

// Check hero renders
const heroExists = await iframe.locator('#hero').count();
const headingText = await iframe.locator('.hero-heading').textContent().catch(() => 'NOT FOUND');
const layersCount = await iframe.locator('.layer').count();
const starsLayerHasChild = await iframe.locator('#layer-stars svg').count();

console.log('hero element exists:', heroExists > 0);
console.log('heading text:', headingText?.trim());
console.log('layer elements:', layersCount);
console.log('stars SVG generated:', starsLayerHasChild > 0);

// Get initial transform of hills layer
const hillsTransformBefore = await iframe.locator('#layer-hills').getAttribute('style');
console.log('hills style before mousemove:', hillsTransformBefore);

// Simulate mousemove over the hero
const heroBox = await iframe.locator('#hero').boundingBox();
if (heroBox) {
  await page.mouse.move(
    heroBox.x + heroBox.width * 0.75,
    heroBox.y + heroBox.height * 0.4
  );
  await page.waitForTimeout(400); // let lerp run a few frames
}

const hillsTransformAfter = await iframe.locator('#layer-hills').getAttribute('style');
console.log('hills style after mousemove:', hillsTransformAfter);

// Screenshot after mousemove
await page.screenshot({ path: 'scripts/parallax-after.png', fullPage: false });

// Console errors
console.log('console errors:', errors.length ? errors : 'none');

// Background colour of hero
const bgColor = await iframe.locator('#hero').evaluate(el => getComputedStyle(el).backgroundColor);
console.log('hero background:', bgColor);

await browser.close();
