// Renders each snippet's HTML/CSS/JS in headless Chromium and screenshots it,
// producing the source images that opengraph-image.js composites into OG cards.
// Re-runnable: skips snippets that already have a captured preview, unless --force.
import { chromium } from 'playwright';
import { mkdir, writeFile, access } from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';
import { SNIPPETS } from '../src/components/UiSnippetsTool/snippets.js';

const OUT_DIR = path.resolve('public/images/ui-snippets/previews');
const ARGS = process.argv.slice(2);
const FORCE = ARGS.includes('--force');
// Any non-flag arg is treated as an id or id-prefix filter — e.g.
//   node scripts/capture-snippet-previews.mjs --force bootstrap-
// re-captures only ids starting with "bootstrap-", forced regardless of
// whether a preview already exists. With no filters, every snippet is
// eligible (existing behavior).
const FILTERS = ARGS.filter(a => !a.startsWith('--'));

// Margin added around the content's bounding box before clipping, so elements that
// overflow their own box (badges with negative offsets, drop shadows, tooltips,
// ripples) have room and aren't cut off at the screenshot edge.
const CAPTURE_MARGIN = 15;
const VIEWPORT = { width: 1280, height: 900 };

function buildSrcdoc(html, css, js, cdnUrls = []) {
  // A .css URL must land as a <link>, not a <script src> — every cdnUrls entry
  // was treated as a script until now, which silently no-ops for a stylesheet
  // (no error, just no styles). Nothing hit this before because every prior
  // snippet's cdnUrls were JS-only libraries; matches the same split used for
  // the live preview iframe in UiSnippetsTool/index.js.
  const cdnTags = cdnUrls.map((url) =>
    /\.css(\?.*)?$/.test(url.trim())
      ? `<link rel="stylesheet" href="${url}">`
      : `<script src="${url}"><\/script>`
  ).join('');
  return `<!DOCTYPE html><html><head><meta charset="UTF-8">${cdnTags}<style>*{box-sizing:border-box}::-webkit-scrollbar{display:none}*{scrollbar-width:none}body{margin:0;font-family:system-ui,sans-serif}${css}</style></head><body>${html}${js ? `<script>${js}<\/script>` : ''}</body></html>`;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();

  // Serve each snippet's HTML over a real local HTTP origin instead of
  // page.setContent(), which lands on a top-level about:blank page that
  // Chromium does not treat as a secure context. Snippets using crypto.subtle
  // (or any other secure-context-gated API) would silently fail under
  // setContent() even though they work fine in production, where the real
  // preview is an <iframe srcdoc> inside an https-served page — and a srcdoc
  // frame inherits secure-context status from its parent. http://127.0.0.1 is
  // specced as a secure context, so serving over it here matches production
  // behavior instead of an artifact of the capture method.
  let currentHtml = '';
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(currentHtml);
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  const previewUrl = `http://127.0.0.1:${port}/`;

  let captured = 0, skipped = 0, failed = 0;

  for (const snippet of SNIPPETS) {
    if (FILTERS.length && !FILTERS.some(f => snippet.id.startsWith(f))) continue;

    const outPath = path.join(OUT_DIR, `${snippet.id}.png`);
    const forceThis = FORCE || FILTERS.length > 0;

    if (!forceThis) {
      try { await access(outPath); skipped++; continue; } catch { /* not captured yet */ }
    }

    // A fresh page per snippet: reusing one page carries scroll position and stale
    // ScrollTrigger state between snippets, which left every scroll-driven snippet
    // after the first stuck at 0% progress. A clean page each time avoids that.
    const page = await browser.newPage({ viewport: VIEWPORT });
    try {
      currentHtml = buildSrcdoc(snippet.html, snippet.css, snippet.js, snippet.cdnUrls);
      await page.goto(previewUrl, { waitUntil: 'networkidle', timeout: 30000 });
      await page.waitForTimeout(500); // let CSS animations / JS init settle

      // Scroll-driven (GSAP ScrollTrigger) snippets render an "empty" starting state
      // by design — 0 fragments assembled, 0% charged, no lines drawn yet — so a
      // screenshot at scroll position 0 is mostly blank. Fast-forward partway into
      // the pinned scroll range first so the thumbnail shows the effect mid-motion.
      const hasScrollTrigger = (snippet.cdnUrls || []).some((u) => u.includes('ScrollTrigger'));
      if (hasScrollTrigger) {
        // Drive the ScrollTrigger instance to ~50% progress so the thumbnail shows
        // the effect mid-motion (these snippets render an empty 0% start state by
        // design). Reusing one page across hundreds of snippets makes a single
        // scroll racy — the pin-spacer may not be measured when we read positions,
        // or a scrub/refresh can reset us to 0. So refresh first, then poll: scroll
        // to the computed mid-point and re-check st.progress until it actually holds
        // near 0.5 (or we run out of tries), reading start/end fresh each attempt.
        await page.evaluate(() => window.ScrollTrigger && window.ScrollTrigger.refresh());
        await page.waitForTimeout(200);
        for (let attempt = 0; attempt < 10; attempt++) {
          const progress = await page.evaluate(() => {
            const st = window.ScrollTrigger && window.ScrollTrigger.getAll()[0];
            if (!st) return null;
            const y = st.start + (st.end - st.start) * 0.5;
            window.scrollTo(0, Math.round(y));
            return st.progress;
          });
          if (progress === null) break; // no ScrollTrigger instance — nothing to drive
          await page.waitForTimeout(250);
          const settled = await page.evaluate(() => {
            const st = window.ScrollTrigger && window.ScrollTrigger.getAll()[0];
            return st ? st.progress : 0;
          });
          if (settled > 0.4 && settled < 0.6) break; // holding near the middle
        }
        await page.waitForTimeout(400); // let the scrub tween + rAF loop settle
      }

      let buf;
      if (hasScrollTrigger) {
        // GSAP's pin wraps the pinned element in a "pin-spacer" that becomes body's
        // first child — its box reflects the full unpinned scroll-flow height (e.g.
        // 5000px), not the pinned content actually on screen, so a bounding-box clip
        // computed from it is wrong once scrolled. The pinned stage already fills the
        // viewport at this scroll position, so just screenshot the viewport directly.
        buf = await page.screenshot({ type: 'png' });
      } else {
        // Expand the content's bounding box by a margin (clamped to the viewport) so
        // overflowing children — badges, shadows, tooltips — are included, not clipped.
        const box = await page.locator('body > *').first().boundingBox();
        if (!box) throw new Error('no rendered content found in <body>');
        const clip = {
          x: Math.max(0, box.x - CAPTURE_MARGIN),
          y: Math.max(0, box.y - CAPTURE_MARGIN),
          width: Math.min(VIEWPORT.width, box.width + CAPTURE_MARGIN * 2),
          height: Math.min(VIEWPORT.height, box.height + CAPTURE_MARGIN * 2),
        };
        clip.width = Math.min(clip.width, VIEWPORT.width - clip.x);
        clip.height = Math.min(clip.height, VIEWPORT.height - clip.y);
        buf = await page.screenshot({ type: 'png', clip });
      }
      await writeFile(outPath, buf);
      captured++;
      console.log(`captured ${snippet.id}`);
    } catch (err) {
      failed++;
      console.error(`FAILED ${snippet.id}: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  await new Promise((resolve) => server.close(resolve));
  console.log(`\nDone. captured=${captured} skipped=${skipped} failed=${failed} total=${SNIPPETS.length}`);
}

main().catch(err => { console.error(err); process.exit(1); });
