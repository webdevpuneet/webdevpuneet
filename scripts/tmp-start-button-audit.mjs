// Audit: in every game snippet, does clicking the obvious start control
// actually change anything? Flags buttons that appear to do nothing.
import { chromium } from 'playwright';
import { SNIPPETS } from '../src/components/UiSnippetsTool/snippets.js';

const START_RE = /^(new game|start|play|start game|begin|restart|new puzzle|deal|new round|go)$/i;
const games = SNIPPETS.filter(s => s.category === 'games');

const browser = await chromium.launch();
const suspicious = [];
let checked = 0;

for (const sn of games) {
  const page = await browser.newPage({ viewport: { width: 900, height: 900 } });
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  try {
    await page.setContent(
      `<!DOCTYPE html><html><head><meta charset="UTF-8"><style>${sn.css}</style></head><body>${sn.html}<script>${sn.js || ''}<\/script></body></html>`,
      { waitUntil: 'load' },
    );
    await page.waitForTimeout(300);

    const idx = await page.evaluate(re => {
      const rx = new RegExp(re, 'i');
      const btns = [...document.querySelectorAll('button')];
      return btns.findIndex(b => rx.test((b.textContent || '').trim()) && b.offsetParent !== null);
    }, START_RE.source);
    if (idx < 0) { await page.close(); continue; }

    checked++;
    const before = { html: await page.evaluate(() => document.body.innerHTML), shot: await page.screenshot() };
    await page.evaluate(i => [...document.querySelectorAll('button')][i].click(), idx);
    await page.waitForTimeout(700);
    const afterHtml = await page.evaluate(() => document.body.innerHTML);
    const afterShot = await page.screenshot();

    // A live game loop keeps repainting, so also sample twice after the click.
    const s1 = await page.screenshot();
    await page.waitForTimeout(400);
    const s2 = await page.screenshot();

    const domChanged = before.html !== afterHtml;
    const pixelsChanged = !before.shot.equals(afterShot);
    const animating = !s1.equals(s2);

    if (!domChanged && !pixelsChanged && !animating) {
      suspicious.push(sn.id);
      console.log(`SUSPECT ${sn.id} — start button changed nothing`);
    }
    if (errs.length) console.log(`ERROR   ${sn.id} — ${errs[0]}`);
  } catch (err) {
    console.log(`FAILED  ${sn.id} — ${err.message}`);
  } finally {
    await page.close();
  }
}

console.log(`\nchecked ${checked} of ${games.length} games with a start-like button; suspicious: ${suspicious.length ? suspicious.join(', ') : 'none'}`);
await browser.close();
