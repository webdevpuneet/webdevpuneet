/* Minimal PDF writer: one JPEG per page, each page the image's own size.
   Used for LinkedIn "document" carousels, which are uploaded as a PDF. No dependency:
   JPEG data is embedded as-is with DCTDecode, so pages keep full quality. */

const enc = new TextEncoder();

/** @param {{ bytes: Uint8Array, w: number, h: number }[]} pages  JPEG bytes + pixel size
    @returns {Blob} application/pdf */
export function jpegsToPdf(pages, { title = 'Carousel' } = {}) {
  const chunks = [];
  const offsets = [];
  let length = 0;
  const push = part => {
    const b = typeof part === 'string' ? enc.encode(part) : part;
    chunks.push(b);
    length += b.length;
  };
  const obj = (n, body) => { offsets[n] = length; push(`${n} 0 obj\n`); body(); push('\nendobj\n'); };

  // Objects: 1 catalog, 2 pages, 3 info, then per page: page, image, content stream
  const n = pages.length;
  const pageId = i => 4 + i * 3;
  const imgId = i => 5 + i * 3;
  const contentId = i => 6 + i * 3;
  const total = 4 + n * 3;

  push('%PDF-1.4\n%âãÏÓ\n');
  obj(1, () => push('<< /Type /Catalog /Pages 2 0 R >>'));
  obj(2, () => push(`<< /Type /Pages /Count ${n} /Kids [${pages.map((_, i) => `${pageId(i)} 0 R`).join(' ')}] >>`));
  const safeTitle = String(title).replace(/[()\\]/g, '');
  obj(3, () => push(`<< /Title (${safeTitle}) /Producer (webdevpuneet.com Social Post Templates) >>`));
  pages.forEach((p, i) => {
    // 1 px = 0.75 pt keeps the page at the image's real-world 96 dpi size
    const W = +(p.w * 0.75).toFixed(2);
    const H = +(p.h * 0.75).toFixed(2);
    obj(pageId(i), () => push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /XObject << /Im${i} ${imgId(i)} 0 R >> /ProcSet [/PDF /ImageC] >> /Contents ${contentId(i)} 0 R >>`));
    obj(imgId(i), () => {
      push(`<< /Type /XObject /Subtype /Image /Width ${p.w} /Height ${p.h} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${p.bytes.length} >>\nstream\n`);
      push(p.bytes);
      push('\nendstream');
    });
    const draw = `q ${W} 0 0 ${H} 0 0 cm /Im${i} Do Q`;
    obj(contentId(i), () => push(`<< /Length ${draw.length} >>\nstream\n${draw}\nendstream`));
  });

  const xref = length;
  let table = `xref\n0 ${total}\n0000000000 65535 f \n`;
  for (let k = 1; k < total; k++) table += `${String(offsets[k]).padStart(10, '0')} 00000 n \n`;
  push(table);
  push(`trailer\n<< /Size ${total} /Root 1 0 R /Info 3 0 R >>\nstartxref\n${xref}\n%%EOF\n`);
  return new Blob(chunks, { type: 'application/pdf' });
}
