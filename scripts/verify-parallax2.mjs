import { chromium } from 'playwright';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

const errors = [];
page.on('console', m => {
  if (m.type() === 'error') {
    errors.push({ text: m.text(), location: m.location() });
  }
});
page.on('pageerror', e => errors.push({ text: e.message, stack: e.stack }));

await page.goto('http://localhost:3000/ui-snippets/parallax-hero/', { waitUntil: 'networkidle' });

// Check the iframe src — it's a blob URL with the snippet JS injected
const iframeSrc = await page.locator('iframe').first().getAttribute('src').catch(() => 'no iframe');
console.log('iframe src:', iframeSrc?.slice(0, 60));

// Check if the snippet preview iframe has its own errors
const iframeEl = page.frameLocator('iframe').first();
const frameErrors = [];
const frame = await page.frames().find(f => f.url().startsWith('blob:') || f.url().includes('localhost'));

console.log('\nAll frames:', page.frames().map(f => f.url().slice(0, 60)));

console.log('\nConsole errors with locations:');
errors.forEach(e => console.log(' -', JSON.stringify(e)));

// Check if the snippet JS has any syntax issues by fetching the rendered page source
const html = await page.content();
const hasPreferRe = html.includes("Unexpected identifier");
console.log('\nPage HTML contains "Unexpected identifier":', hasPreferRe);

// Check what's in the iframe document
const iframeContent = await iframeEl.locator('body').innerHTML().catch(() => 'could not read');
const bodyBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
console.log('\nMain page body bg:', bodyBg);

await browser.close();
