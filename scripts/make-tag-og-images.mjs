/**
 * Generates one 1200×630 OG image per tag into public/images/ui-snippets/tags/.
 *
 *   node scripts/make-tag-og-images.mjs
 *
 * The existing category cards are 1200×63x — close to the social ratio but not
 * exactly it, and og:image dimensions that disagree with the file are the kind of
 * mismatch validators flag. Rather than hand-cutting forty images, this crops each
 * tag's source card to exactly 1200×630 by trimming the surplus rows evenly from
 * the top and bottom, which leaves the card's centred artwork untouched.
 *
 * Pure Node: the PNG is parsed chunk by chunk, the scanlines are inflated and
 * unfiltered, the wanted rows are re-filtered with filter 0 and deflated again.
 * No image dependency, so it runs anywhere the repo does.
 */

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { TAGS, OG_WIDTH, OG_HEIGHT } from '../src/lib/snippet-tags.js';

const SRC_DIR = path.resolve('public/images/ui-snippets');
const OUT_DIR = path.join(SRC_DIR, 'tags');
const FALLBACK_SRC = path.resolve('public/images/ui-snippets.png');

const SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const CHANNELS = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 };

/* ── CRC32 (PNG's polynomial), table built once ───────────────────────────── */
const CRC_TABLE = (() => {
  const t = new Int32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const out = Buffer.alloc(data.length + 12);
  out.writeUInt32BE(data.length, 0);
  out.write(type, 4, 'ascii');
  data.copy(out, 8);
  out.writeUInt32BE(crc32(out.subarray(4, 8 + data.length)), 8 + data.length);
  return out;
}

/** Splits a PNG into its chunks. */
function readChunks(buf) {
  const chunks = [];
  let p = 8;
  while (p < buf.length) {
    const len = buf.readUInt32BE(p);
    const type = buf.toString('ascii', p + 4, p + 8);
    chunks.push({ type, data: buf.subarray(p + 8, p + 8 + len) });
    p += len + 12;
    if (type === 'IEND') break;
  }
  return chunks;
}

/** Undoes PNG's per-scanline filtering, returning raw rows of `stride` bytes. */
function unfilter(raw, width, height, bpp, stride) {
  const out = Buffer.alloc(height * stride);
  let pos = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[pos++];
    const row = out.subarray(y * stride, (y + 1) * stride);
    raw.copy(row, 0, pos, pos + stride);
    pos += stride;
    const prev = y > 0 ? out.subarray((y - 1) * stride, y * stride) : null;
    for (let x = 0; x < stride; x++) {
      const a = x >= bpp ? row[x - bpp] : 0;
      const b = prev ? prev[x] : 0;
      const c = prev && x >= bpp ? prev[x - bpp] : 0;
      switch (filter) {
        case 0: break;
        case 1: row[x] = (row[x] + a) & 0xff; break;
        case 2: row[x] = (row[x] + b) & 0xff; break;
        case 3: row[x] = (row[x] + ((a + b) >> 1)) & 0xff; break;
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
          const pred = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
          row[x] = (row[x] + pred) & 0xff;
          break;
        }
        default: throw new Error(`unknown PNG filter ${filter}`);
      }
    }
  }
  return out;
}

/** Crops `src` to `OG_WIDTH`×`OG_HEIGHT`, trimming surplus rows top and bottom. */
function cropToOg(srcPath) {
  const buf = fs.readFileSync(srcPath);
  if (!buf.subarray(0, 8).equals(SIG)) throw new Error(`${srcPath} is not a PNG`);

  const chunks = readChunks(buf);
  const ihdr = chunks.find(c => c.type === 'IHDR').data;
  const width = ihdr.readUInt32BE(0);
  const height = ihdr.readUInt32BE(4);
  const depth = ihdr[8];
  const colorType = ihdr[9];
  const interlace = ihdr[12];

  if (depth !== 8 || interlace !== 0) throw new Error(`${srcPath}: only 8-bit non-interlaced PNGs supported`);
  if (width !== OG_WIDTH) throw new Error(`${srcPath}: expected ${OG_WIDTH}px wide, got ${width}`);

  const bpp = CHANNELS[colorType];
  const stride = width * bpp;

  const idat = zlib.inflateSync(Buffer.concat(chunks.filter(c => c.type === 'IDAT').map(c => c.data)));
  const rows = unfilter(idat, width, height, bpp, stride);

  // Trim the surplus evenly so the card's centred artwork keeps its framing.
  const surplus = height - OG_HEIGHT;
  const top = Math.max(0, Math.floor(surplus / 2));

  const refiltered = Buffer.alloc(OG_HEIGHT * (stride + 1));
  for (let y = 0; y < OG_HEIGHT; y++) {
    const srcY = Math.min(height - 1, top + y);   // pad by repeating the last row if the source is short
    refiltered[y * (stride + 1)] = 0;             // filter type 0 (None)
    rows.copy(refiltered, y * (stride + 1) + 1, srcY * stride, (srcY + 1) * stride);
  }

  const newIhdr = Buffer.from(ihdr);
  newIhdr.writeUInt32BE(OG_HEIGHT, 4);

  // Keep the palette and transparency chunks; drop everything else (text, timestamps).
  const keep = chunks.filter(c => c.type === 'PLTE' || c.type === 'tRNS');

  return Buffer.concat([
    SIG,
    chunk('IHDR', newIhdr),
    ...keep.map(c => chunk(c.type, Buffer.from(c.data))),
    chunk('IDAT', zlib.deflateSync(refiltered, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

fs.mkdirSync(OUT_DIR, { recursive: true });

let written = 0;
for (const tag of TAGS) {
  const src = path.join(SRC_DIR, `${tag.ogSource}.png`);
  const from = fs.existsSync(src) ? src : FALLBACK_SRC;
  try {
    const out = cropToOg(from);
    fs.writeFileSync(path.join(OUT_DIR, `${tag.id}.png`), out);
    written++;
  } catch (err) {
    console.error(`✗ ${tag.id}: ${err.message}`);
  }
}
// The tag index gets the generic library card, cropped to the same exact size.
try {
  fs.writeFileSync(path.join(OUT_DIR, 'index.png'), cropToOg(FALLBACK_SRC));
  written++;
} catch (err) {
  console.error(`✗ index: ${err.message}`);
}

console.log(`✓ ${written}/${TAGS.length + 1} tag OG images written to ${path.relative(process.cwd(), OUT_DIR)} at ${OG_WIDTH}×${OG_HEIGHT}`);
