/* A small picture (a data: URL) of a saved website: the top of its first page, kept with the design when it is saved so the home
   page and the sidebar need not draw the whole site again. '' if it could not be drawn. */
import { restoreSite, siteDocumentHtml, isSite } from '@/components/SectionTemplates/templates/site.js';
import { getAsset } from '@/components/SectionTemplates/storage';
import { previewImages } from '@/components/SectionTemplates/upload';
import { htmlThumb } from '@/lib/html-thumb';

const sectionsOf = st => (isSite(st) ? [...(st.header || []), ...(st.pages || []).flatMap(p => p.sections || []), ...(st.footer || [])] : st?.sections || []);

export async function siteThumb(state) {
  if (!state) return '';
  const made = [];
  try {
    const urls = {};
    for (const sec of sectionsOf(state)) {
      // Its uploads, plus a section background image (style.bg, key '@bg')
      for (const [k, u] of [...Object.entries(sec.state?.uploads || {}), ...(sec.style?.bg ? [['@bg', sec.style.bg]] : [])]) {
        try { const rec = await getAsset(u.id); if (rec?.blob) { const url = URL.createObjectURL(rec.blob); made.push(url); urls[`${sec.uid}|${k}`] = url; } } catch { /* missing */ }
      }
    }
    const site = restoreSite(state);
    const html = previewImages(siteDocumentHtml(site, site.pages[0].id, { imageSrc: (uid, k) => urls[`${uid}|${k}`] || '', motion: false }), window.location.origin);
    return await htmlThumb(html, { width: 1280, height: 800 });
  } catch { return ''; } finally { made.forEach(u => URL.revokeObjectURL(u)); }
}
