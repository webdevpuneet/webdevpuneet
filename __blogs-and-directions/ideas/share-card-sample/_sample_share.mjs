import { chromium } from 'playwright';
import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
const id = process.argv[2];
const mod = (await import(pathToFileURL('src/components/UiSnippetsTool/snippets/' + id + '.js').href)).default;
let src = fs.readFileSync('scripts/game-share/share-module.src.js', 'utf8').replace(/^\s*\/\*[\s\S]*?\*\/\s*/, '')
  .replace('__TITLE__', mod.title.replace(/'/g, "\'")).replace('__URL__', 'https://webdevpuneet.com/ui-snippets/' + id + '/');
const cdn = (mod.cdnUrls || []).map(u => '<script src="' + u + '"><\/script>').join('');
const doc = '<!DOCTYPE html><html><head><meta charset="UTF-8">' + cdn + '<style>*{box-sizing:border-box}body{margin:0;font-family:system-ui}' + mod.css + '</style></head><body>' + mod.html + '<script>' + mod.js.split('/* wdp-share:start */')[0] + '<\/script><script>' + src + '<\/script></body></html>';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1000, height: 800 } });
p.on('pageerror', e => console.log('ERR', e.message));
await p.setContent(doc, { waitUntil: 'load' });
await p.waitForTimeout(2500);
// force a result on screen
await p.evaluate(() => {
  const d = document.createElement('div'); d.className = 'result-overlay';
  d.innerHTML = '<h2 class="result-title">Level cleared!</h2><span id="score">Score 4,820</span> <span id="level">Level 3 / 3</span>';
  d.style.cssText = 'position:fixed;left:0;top:0;width:1px;height:1px;opacity:.99;overflow:hidden';
  document.body.appendChild(d);
});
await p.waitForTimeout(1800);
await p.evaluate(() => (document.querySelector('.wdps-in:not([hidden])') || document.querySelector('.wdps-btn')).click());
await p.waitForTimeout(1500);
const url = await p.evaluate(() => document.querySelector('.wdps-box [data-a="dl"]').href);
fs.writeFileSync(process.argv[3], Buffer.from(url.split(',')[1], 'base64'));
console.log('saved', process.argv[3], url.length);
await b.close();
