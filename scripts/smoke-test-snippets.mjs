// Loads each named snippet in headless Chromium and reports console errors,
// page errors, and failed network requests (e.g. a 404 CDN URL).
import { chromium } from 'playwright';
import { SNIPPETS } from '../src/components/UiSnippetsTool/snippets.js';

const ids = process.argv.slice(2).filter(a => !a.startsWith('--'));
const list = ids.length ? SNIPPETS.filter(s => ids.includes(s.id)) : SNIPPETS;

function srcdoc(sn) {
  const tags = (sn.cdnUrls || []).map(u =>
    /\.css(\?.*)?$/.test(u) ? `<link rel="stylesheet" href="${u}">` : `<script src="${u}"><\/script>`
  ).join('\n');
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">${tags}<style>${sn.css}</style></head><body>${sn.html}<script>${sn.js || ''}<\/script></body></html>`;
}

const browser = await chromium.launch();
let failed = 0;

for (const sn of list) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errs = [], net = [];
  page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
  page.on('pageerror', e => errs.push('PAGEERROR: ' + e.message));
  page.on('requestfailed', r => net.push(r.url()));
  page.on('response', r => { if (r.status() >= 400) net.push(r.status() + ' ' + r.url()); });

  await page.setContent(srcdoc(sn), { waitUntil: 'load' });
  await page.waitForTimeout(1400);
  await page.mouse.move(640, 420);
  await page.mouse.move(680, 460);
  await page.waitForTimeout(600);

  await page.close();
  if (errs.length || net.length) {
    failed++;
    console.log(`\n✗ ${sn.id}`);
    [...new Set(errs)].slice(0, 4).forEach(e => console.log('   err: ' + e.slice(0, 160)));
    [...new Set(net)].slice(0, 4).forEach(n => console.log('   net: ' + n.slice(0, 160)));
  } else {
    console.log(`✓ ${sn.id}`);
  }
}

await browser.close();
console.log(failed ? `\n${failed}/${list.length} with issues` : `\nall ${list.length} clean`);
