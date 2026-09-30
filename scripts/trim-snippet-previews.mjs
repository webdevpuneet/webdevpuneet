// Post-processes already-captured preview PNGs to trim excess whitespace
// (from snippets whose outer wrapper is a full-viewport-width flex-centered
// container, making the captured bounding box much wider than the actual
// visible card) down to a uniform ~15px padding on every side.
//
// Guards against over-trimming a closed-by-default overlay (a modal,
// offcanvas, or dropdown whose real content only appears once opened): if
// the original capture was close to full-viewport-sized but content.trim()
// finds only a tiny fragment of it, that fragment is almost certainly just
// the trigger button on an otherwise blank page, not a real representation
// of the snippet — cropping tightly around it would make a weak preview
// look actively broken instead of just spacious. Those are left untouched.
//
//   node scripts/trim-snippet-previews.mjs                    # every preview
//   node scripts/trim-snippet-previews.mjs bootstrap-         # by id prefix
//   node scripts/trim-snippet-previews.mjs bootstrap-foo.png  # by exact file
import sharp from 'sharp';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const DIR = path.resolve('public/images/ui-snippets/previews');
const PADDING = 15;
const FILTERS = process.argv.slice(2);

// A capture at least this large in either dimension is "full-viewport-ish" —
// the kind produced when the only visible content is a trigger button
// centered on an otherwise empty full-height page.
const LARGE_ORIGINAL_W = 900;
const LARGE_ORIGINAL_H = 600;
// A trimmed content box (before padding) with less area than this is "too
// small to be the real subject" when the original was large — likely just a
// lone trigger button (which is often wide-but-short, like 218x44 — an area
// check catches that where a both-dimensions-small check would miss it).
const TINY_CONTENT_AREA = 200 * 120;

// Reads the page's actual background color from its top-left corner pixel,
// so the re-added padding matches a light-gray or off-white page background
// instead of assuming pure white for every snippet.
async function cornerColor(full) {
  const { data, info } = await sharp(full)
    .extract({ left: 0, top: 0, width: 1, height: 1 })
    .raw()
    .toBuffer({ resolveWithObject: true });
  return info.channels >= 4
    ? { r: data[0], g: data[1], b: data[2], alpha: 1 }
    : { r: data[0], g: data[1], b: data[2], alpha: 1 };
}

async function trimOne(file) {
  const full = path.join(DIR, file);
  const meta = await sharp(full).metadata();
  const bg = await cornerColor(full);

  // trim() finds the bounding box of content that differs from the
  // background (sampled from the corner) beyond `threshold`, then crops to
  // it — exactly what's needed to strip the invisible full-width flex
  // wrapper's side margins down to just the actual card.
  const trimmedBuf = await sharp(full).trim({ threshold: 12 }).png().toBuffer();
  const trimmedMeta = await sharp(trimmedBuf).metadata();

  if (trimmedMeta.width === meta.width && trimmedMeta.height === meta.height) {
    return { file, status: 'unchanged' };
  }

  const originalWasLarge = meta.width >= LARGE_ORIGINAL_W || meta.height >= LARGE_ORIGINAL_H;
  const trimmedIsTiny = trimmedMeta.width * trimmedMeta.height < TINY_CONTENT_AREA;
  if (originalWasLarge && trimmedIsTiny) {
    return { file, status: 'skipped-tiny', before: [meta.width, meta.height], wouldBe: [trimmedMeta.width, trimmedMeta.height] };
  }

  // Re-add the same page background color as padding, not hardcoded white —
  // several snippets use a light-gray or tinted page background, and white
  // padding around those would show up as a visible mismatched border.
  const out = await sharp(trimmedBuf)
    .extend({ top: PADDING, bottom: PADDING, left: PADDING, right: PADDING, background: bg })
    .png()
    .toBuffer();

  await sharp(out).toFile(full);
  return { file, status: 'trimmed', before: [meta.width, meta.height], after: [trimmedMeta.width + PADDING * 2, trimmedMeta.height + PADDING * 2] };
}

async function main() {
  const all = await readdir(DIR);
  const targets = FILTERS.length
    ? all.filter(f => FILTERS.some(f2 => f.startsWith(f2)))
    : all;

  let trimmed = 0, unchanged = 0, skipped = 0, failed = 0;
  for (const file of targets) {
    if (!file.endsWith('.png')) continue;
    try {
      const res = await trimOne(file);
      if (res.status === 'trimmed') {
        trimmed++;
        console.log(`trimmed ${res.file}  ${res.before.join('x')} -> ${res.after.join('x')}`);
      } else if (res.status === 'skipped-tiny') {
        skipped++;
        console.log(`SKIPPED (would over-crop) ${res.file}  ${res.before.join('x')} -> ${res.wouldBe.join('x')}`);
      } else {
        unchanged++;
      }
    } catch (err) {
      failed++;
      console.error(`FAILED ${file}: ${err.message}`);
    }
  }
  console.log(`\nDone. trimmed=${trimmed} unchanged=${unchanged} skipped=${skipped} failed=${failed} total=${targets.length}`);
}

main().catch(err => { console.error(err); process.exit(1); });
