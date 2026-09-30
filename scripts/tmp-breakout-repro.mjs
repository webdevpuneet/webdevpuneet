// Does clicking "New Game" actually start the loop?
import { chromium } from 'playwright';
import { SNIPPETS } from '../src/components/UiSnippetsTool/snippets.js';

const sn = SNIPPETS.find(s => s.id === 'breakout-brick-game');
const doc = `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${sn.css}</style></head><body>${sn.html}<script>${sn.js}<\/script></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 800 } });
page.on('pageerror', e => console.log('PAGEERROR:', e.message));
await page.setContent(doc);

const state = async label => {
  const s = await page.evaluate(() => ({
    overlayHidden: document.getElementById('bo-overlay').classList.contains('hidden'),
    btn: document.getElementById('bo-new-btn').textContent,
    title: document.getElementById('bo-overlay-title').textContent,
  }));
  console.log(label, JSON.stringify(s));
};

await state('on load        ');
await page.click('#bo-new-btn');
await page.waitForTimeout(600);
await state('after New Game ');

// Is the ball actually moving? Sample the canvas twice.
const shot1 = await page.locator('#bo-canvas').screenshot();
await page.waitForTimeout(500);
const shot2 = await page.locator('#bo-canvas').screenshot();
console.log('canvas changed between frames (game running):', !shot1.equals(shot2));

await browser.close();
