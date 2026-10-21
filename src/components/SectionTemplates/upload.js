/* Browser-side file helpers shared by the section editor and the Website Builder */

export function saveBlob(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/* Uploaded images are resized in the browser (GIFs and SVGs are kept as they are) */
export function prepareUpload(file, { maxW = 1600, mime = 'image/jpeg' } = {}) {
  return new Promise((resolve, reject) => {
    if (file.type === 'image/svg+xml' || file.type === 'image/gif') {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => { URL.revokeObjectURL(url); resolve({ blob: file, type: file.type, w: img.naturalWidth || 0, h: img.naturalHeight || 0 }); };
      img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read that image')); };
      img.src = url;
      return;
    }
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const k = Math.min(1, maxW / (img.naturalWidth || maxW));
      const w = Math.round(img.naturalWidth * k), h = Math.round(img.naturalHeight * k);
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      const ctx = c.getContext('2d');
      // Keep PNG transparency (cut-out phones, logos); photos become JPEG
      const type = file.type === 'image/png' || file.type === 'image/webp' || mime === 'image/png' ? 'image/png' : 'image/jpeg';
      if (type === 'image/jpeg') { ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, w, h); }
      ctx.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      c.toBlob(b => (b ? resolve({ blob: b, type, w, h }) : reject(new Error('Could not process that image'))), type, 0.86);
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Could not read that image')); };
    img.src = url;
  });
}

export const EXT = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/gif': 'gif', 'image/webp': 'webp', 'image/svg+xml': 'svg' };

/* Images on this site load from the local server while you edit (so new art shows before a deploy) */
export const previewImages = (html, origin) => (origin ? html.replace(/https:\/\/webdevpuneet\.com\/images\//g, `${origin}/images/`) : html);

/* ZIP export: copy every remote image the HTML uses (src="https://…" and url('https://…'))
   into dir/assets/ and point the HTML at the copies, so the download works offline. Our own
   images are fetched same-origin; an image whose host blocks cross-origin reads keeps its URL.
   `taken` holds file names already in assets/ (uploads). Returns { html, added, missed }. */
export async function localizeImages(html, dir, taken = new Set()) {
  const remote = new Set();
  html.replace(/\bsrc="(https?:\/\/[^"]+)"|url\('(https?:\/\/[^']+)'\)/g, (m, a, b) => { remote.add(a || b); return m; });
  let added = 0, missed = 0;
  for (const url of remote) {
    try {
      const u = new URL(url.replace(/&amp;/g, '&'));
      const own = /(^|\.)webdevpuneet\.com$/.test(u.hostname) || u.origin === location.origin;
      const res = await fetch(own ? u.pathname : u.href, own ? undefined : { mode: 'cors' });
      if (!res.ok) throw new Error(String(res.status));
      const blob = await res.blob();
      if (!/^image\//.test(blob.type)) throw new Error('not an image');
      const base = (u.pathname.split('/').pop() || 'image').replace(/[^\w.-]+/g, '-');
      const dot = base.lastIndexOf('.');
      const stem = dot > 0 ? base.slice(0, dot) : base;
      const ext = dot > 0 ? base.slice(dot) : `.${EXT[blob.type] || 'png'}`;
      let file = `${stem}${ext}`;
      for (let n = 2; taken.has(file); n++) file = `${stem}-${n}${ext}`;
      taken.add(file);
      dir.file(`assets/${file}`, blob);
      html = html.split(url).join(`assets/${file}`);
      added++;
    } catch { missed++; }
  }
  return { html, added, missed };
}
