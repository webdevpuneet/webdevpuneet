/* A small JPEG (a data: URL) of the top of an HTML page, drawn in the browser with no server. Used for the thumbnails of saved
   emails, website sections and websites on the home page and in the sidebar, the same way a saved social post keeps its own
   data:image thumbnail. It is made when the design is saved, so nothing has to render the full page again to show a card.

   The page is drawn through an SVG <foreignObject>. An SVG image cannot load anything from outside itself, so every image
   (an uploaded photo, a template picture, a CSS background) and every Google font is fetched first and put inline.
   Returns '' when it cannot draw one (offline, a blocked image, an odd page); callers then fall back to the template preview. */

const dataUrlCache = new Map();
const blobToDataUrl = blob => new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(blob); });

/* An image as a data URL, scaled down to at most `max` px wide: a thumbnail needs no more, and a full-size photo would
   bloat the page being drawn */
async function imageDataUrl(url, max = 900) {
  const blob = await (await fetch(url)).blob();
  if (!blob.size) throw new Error('empty');
  if (/svg/.test(blob.type) || !/^image\//.test(blob.type)) return blobToDataUrl(blob);
  try {
    const bmp = await createImageBitmap(blob);
    const k = Math.min(1, max / bmp.width);
    const c = document.createElement('canvas');
    c.width = Math.max(1, Math.round(bmp.width * k));
    c.height = Math.max(1, Math.round(bmp.height * k));
    c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
    bmp.close?.();
    return c.toDataURL(/jpe?g/.test(blob.type) ? 'image/jpeg' : 'image/png', 0.82);
  } catch { return blobToDataUrl(blob); }
}
function toDataUrl(url) {
  if (!url || /^data:/i.test(url)) return Promise.resolve(url);
  // Uploaded photos are blob: URLs that are revoked later, so only remote files are worth remembering
  if (/^blob:/i.test(url)) return imageDataUrl(url).catch(() => '');
  if (!dataUrlCache.has(url)) dataUrlCache.set(url, imageDataUrl(url).catch(() => ''));
  return dataUrlCache.get(url);
}

/* Every url(...) in some CSS pointing at a file, turned into a data URL (a file that cannot be read is dropped) */
async function inlineCssUrls(css, base) {
  const found = [...css.matchAll(/url\(\s*(['"]?)([^)'"]+)\1\s*\)/g)].filter(m => !/^(data:|#)/i.test(m[2].trim()));
  if (!found.length) return css;
  const urls = [...new Set(found.map(m => m[2].trim()))];
  const done = new Map(await Promise.all(urls.map(async u => { let abs = u; try { abs = new URL(u, base).href; } catch { /* keep */ } return [u, await toDataUrl(abs)]; })));
  return css.replace(/url\(\s*(['"]?)([^)'"]+)\1\s*\)/g, (all, q, u) => (/^(data:|#)/i.test(u.trim()) ? all : done.get(u.trim()) ? `url("${done.get(u.trim())}")` : 'none'));
}

/* A Google Fonts stylesheet as @font-face rules with the (Latin) font files inline */
const fontCssCache = new Map();
function googleFontCss(href) {
  if (!fontCssCache.has(href)) {
    fontCssCache.set(href, (async () => {
      try {
        const css = await (await fetch(href)).text();
        const all = [...css.matchAll(/\/\*\s*([\w-]+|\[\d+\])\s*\*\/\s*(@font-face\s*\{[^}]*\})/g)];
        const latin = all.filter(m => m[1] === 'latin');
        const blocks = (latin.length ? latin : all).map(m => m[2]);
        if (!blocks.length) blocks.push(...(css.match(/@font-face\s*\{[^}]*\}/g) || []));
        const out = await Promise.all(blocks.map(async b => {
          const u = /url\(([^)]+)\)/.exec(b);
          if (!u) return '';
          try { return b.replace(u[0], `url(${await blobToDataUrl(await (await fetch(u[1].replace(/['"]/g, ''))).blob())})`); } catch { return ''; }
        }));
        return out.join('\n');
      } catch { return ''; }
    })());
  }
  return fontCssCache.get(href);
}

/* Every url(...) in some CSS that is not already inline, removed (the plain drawing) */
const noUrls = css => css.replace(/url\(\s*(['"]?)(?!data:)([^)'"]+)\1\s*\)/gi, 'none');

/* The page's own html / body / :root rules have to land on the wrapper element instead */
const scopeCss = css => css.replace(/:root\b/g, '.__root').replace(/(^|[}\s,>+~])(?:html|body)(?=[\s,{.:#[>+~])/g, '$1.__root');

/**
 * @param html    a full HTML document (or fragment) as a string
 * @param width   the width the page is laid out at (a section or website: 1280, an email: 640)
 * @param height  how much of the top of the page to keep
 * @param out     the width of the picture that comes back
 * @returns       a JPEG data URL (data:image/jpeg;base64,...), or '' if it could not be drawn
 */
export async function htmlThumb(html, opts = {}) {
  // If the full drawing fails (a font or picture the browser will not decode), draw it again without fonts and pictures:
  // a plainer thumbnail of the real design beats none
  return (await draw(html, opts, false)) || draw(html, opts, true);
}

async function draw(html, { width = 1280, height = 800, out = 400, base } = {}, plain) {
  try {
    const baseUrl = base || window.location.href;
    const doc = new DOMParser().parseFromString(html, 'text/html');
    doc.querySelectorAll('script, noscript, iframe, video, audio, object, embed, canvas').forEach(n => n.remove());
    // Comments go too: email Outlook comments such as <!--[if !mso]><!--> are not valid XML and would stop the drawing
    const walker = doc.createTreeWalker(doc, NodeFilter.SHOW_COMMENT);
    const comments = [];
    while (walker.nextNode()) comments.push(walker.currentNode);
    comments.forEach(c => c.remove());
    // Outlook-only elements such as <v:roundrect> or <o:p> have a prefix with no namespace, which XML does not accept
    [...doc.querySelectorAll('*')].filter(el => el.localName.includes(':')).forEach(el => el.remove());
    if (plain) doc.querySelectorAll('img, link').forEach(n => n.remove());
    let fontCss = '';
    for (const l of [...doc.querySelectorAll('link[rel~="stylesheet"]')]) {
      const href = l.getAttribute('href') || '';
      if (!plain && /fonts\.googleapis\.com/.test(href)) fontCss += await googleFontCss(href);
      else if (!plain && href) {
        // Any other stylesheet (a CSS library from a CDN): its rules, with its own pictures and fonts inline
        try { const abs = new URL(href, base || window.location.href).href; fontCss += `\n${scopeCss(await inlineCssUrls((await (await fetch(abs)).text()).replace(/@import[^;]+;/g, ''), abs))}`; } catch { /* skip it */ }
      }
      l.remove();
    }
    const sheets = [];
    for (const st of [...doc.querySelectorAll('style')]) {
      const css = (st.textContent || '').replace(/@import[^;]+;/g, '');
      sheets.push(scopeCss(plain ? noUrls(css) : await inlineCssUrls(css, baseUrl)));
      st.remove();
    }
    for (const el of [...doc.querySelectorAll('[style]')]) el.setAttribute('style', plain ? noUrls(el.getAttribute('style') || '') : await inlineCssUrls(el.getAttribute('style') || '', baseUrl));
    for (const img of [...doc.querySelectorAll('img')]) {
      img.removeAttribute('srcset');
      img.removeAttribute('loading');
      const src = img.getAttribute('src') || '';
      if (!src || /^data:/i.test(src)) continue;
      let abs = src; try { abs = new URL(src, baseUrl).href; } catch { /* keep */ }
      const data = await toDataUrl(abs);
      if (data) img.setAttribute('src', data); else img.removeAttribute('src');
    }
    const wrap = document.createElement('div');
    wrap.className = '__root';
    wrap.setAttribute('style', `${doc.body.getAttribute('style') || ''};width:${width}px;height:${height}px;overflow:hidden;position:relative;margin:0;background-color:#fff`);
    const style = document.createElement('style');
    style.textContent = `${fontCss}\n${sheets.join('\n')}`;
    wrap.appendChild(style);
    [...doc.body.childNodes].forEach(n => wrap.appendChild(document.importNode(n, true)));
    // Characters XML forbids (stray control codes in pasted text) are dropped
    const xhtml = new XMLSerializer().serializeToString(wrap).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\uFFFE\uFFFF]/g, '');
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><foreignObject x="0" y="0" width="${width}" height="${height}">${xhtml}</foreignObject></svg>`;
    // A data: URL, not a blob: URL: the browser keeps the canvas readable only for an SVG that is loaded this way
    const img = new Image();
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    await img.decode();
    const c = document.createElement('canvas');
    c.width = out;
    c.height = Math.round(out * height / width);
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL('image/jpeg', 0.78);
  } catch {
    return '';
  }
}
