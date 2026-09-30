// Full lifecycle: start -> lose a ball -> Continue -> restart mid-play.
import { chromium } from 'playwright';
import { SNIPPETS } from '../src/components/UiSnippetsTool/snippets.js';

const sn = SNIPPETS.find(s => s.id === 'breakout-brick-game');
const doc = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${sn.css}</style></head><body>${sn.html}<script>${sn.js}<\/script></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 800 } });
page.on('pageerror', e => console.log('PAGEERROR:', e.message));
await page.setContent(doc);

const read = () => page.evaluate(() => ({
  hidden: document.getElementById('bo-overlay').classList.contains('hidden'),
  btn: document.getElementById('bo-new-btn').textContent,
  title: document.getElementById('bo-overlay-title').textContent,
  lives: document.getElementById('bo-lives').textContent,
}));

await page.click('#bo-new-btn');
await page.waitForTimeout(400);
console.log('playing        ', JSON.stringify(await read()));

// Never touch the paddle, so the ball is eventually lost.
await page.waitForFunction(
  () => !document.getElementById('bo-overlay').classList.contains('hidden'),
  null, { timeout: 30000 },
).catch(() => console.log('(ball never lost within 30s)'));
console.log('after ball lost', JSON.stringify(await read()));

await page.click('#bo-new-btn');           // "Continue"
await page.waitForTimeout(400);
console.log('after Continue ', JSON.stringify(await read()));

// Restart mid-play: the button is hidden behind the overlay while playing, so
// call the same path a user would after Game Over by clicking it directly.
await page.evaluate(() => document.getElementById('bo-new-btn').click());
await page.waitForTimeout(400);
const after = await read();
console.log('mid-play click ', JSON.stringify(after));

const a = await page.locator('#bo-canvas').screenshot();
await page.waitForTimeout(500);
const b = await page.locator('#bo-canvas').screenshot();
console.log('still animating:', !a.equals(b));

await browser.close();
