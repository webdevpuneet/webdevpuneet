/* Export / import of "My designs" (Social Post, Email and Website Section Templates).

   The export is one JSON file a person can keep as a backup or move to another browser
   or device:
     { format: 'wdp-designs', version: 1, tool, exported, designs: [...],
       assets?: [...]  (email: uploaded images, as data URLs, keyed by their asset id)
       fonts?:  [...]  (social: uploaded fonts the designs use)
       brandKit?: {...} }

   Import never overwrites what's already there: a design that's already saved is
   skipped, and a different design that happens to share an id comes in as a copy. */

const FORMAT = 'wdp-designs';

/* Each tool's backup file name prefix and how it is named in messages */
const TOOLS = {
  'social-post-templates': { file: 'social-post', label: 'social post', page: 'Social Post Templates' },
  'email-templates': { file: 'email', label: 'email', page: 'Email Templates' },
  'website-section-templates': { file: 'website-section', label: 'website section', page: 'Website Section Templates' },
  'website-builder': { file: 'website-page', label: 'website page', page: 'the Website Builder' },
};
const toolInfo = tool => TOOLS[tool] || { file: tool, label: tool, page: tool };

const blobToDataUrl = blob => new Promise((res, rej) => {
  const fr = new FileReader();
  fr.onload = () => res(fr.result);
  fr.onerror = rej;
  fr.readAsDataURL(blob);
});
const dataUrlToBlob = async url => (await fetch(url)).blob();

function download(blob, name) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

/**
 * @param tool         'social-post-templates' | 'email-templates' | 'website-section-templates'
 * @param store        design store (src/lib/design-store.js)
 * @param getAssets    optional async (designs) => [{ key, data, type, name, w, h }]
 * @param getFonts     optional async (designs) => [font records]
 * @param brandKit     optional brand kit object to include
 * @returns {{ count: number, bytes: number }}
 */
export async function exportDesigns({ tool, store, getAssets, getFonts, brandKit }) {
  const designs = await store.listDesigns();
  const payload = {
    format: FORMAT,
    version: 1,
    tool,
    exported: new Date().toISOString(),
    source: 'https://webdevpuneet.com/' + tool + '/',
    count: designs.length,
    designs,
  };
  if (getAssets) payload.assets = await getAssets(designs);
  if (getFonts) payload.fonts = await getFonts(designs);
  if (brandKit) payload.brandKit = brandKit;
  const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
  const day = new Date().toISOString().slice(0, 10);
  download(blob, `${toolInfo(tool).file}-designs-${day}.json`);
  return { count: designs.length, bytes: blob.size };
}

/**
 * @param file         the chosen .json File
 * @param tool         must match the file's tool
 * @param store        design store
 * @param knownTemplate  id => boolean (designs for templates that no longer exist are skipped)
 * @param putAssets    optional async (assets) => number added
 * @param putFonts     optional async (fonts) => number added
 * @param applyKit     optional (kit) => boolean (true if it was applied)
 * @returns {{ added: number, skipped: number, copies: number, assets: number, fonts: number, kit: boolean }}
 */
export async function importDesigns(file, { tool, store, knownTemplate, putAssets, putFonts, applyKit }) {
  let data;
  try { data = JSON.parse(await file.text()); }
  catch { throw new Error('That file isn’t a designs export (it couldn’t be read as JSON).'); }
  if (data?.format !== FORMAT || !Array.isArray(data.designs)) throw new Error('That file isn’t a designs export from this site.');
  if (data.tool !== tool) {
    throw new Error(`That file has ${toolInfo(data.tool).label} designs. Import it in ${toolInfo(data.tool).page} instead.`);
  }

  // Images and fonts first, so imported designs open complete
  const assets = putAssets && Array.isArray(data.assets) ? await putAssets(data.assets) : 0;
  const fonts = putFonts && Array.isArray(data.fonts) ? await putFonts(data.fonts) : 0;

  const existing = new Map((await store.listDesigns()).map(d => [d.id, d]));
  let added = 0, skipped = 0, copies = 0;
  for (const d of data.designs) {
    if (!d?.id || !d.tpl || !d.state || (knownTemplate && !knownTemplate(d.tpl))) { skipped++; continue; }
    const have = existing.get(d.id);
    if (have && JSON.stringify(have.state) === JSON.stringify(d.state)) { skipped++; continue; }
    if (have) {
      await store.saveDesign({ ...d, id: undefined, created: undefined, name: `${d.name} (imported)` });
      copies++;
    } else {
      // Keep the original id, so re-importing the same file finds it and skips it
      await store.saveDesign({ ...d });
      added++;
    }
  }
  const kit = data.brandKit && applyKit ? applyKit(data.brandKit) : false;
  return { added, skipped, copies, assets, fonts, kit };
}

export { blobToDataUrl, dataUrlToBlob };
