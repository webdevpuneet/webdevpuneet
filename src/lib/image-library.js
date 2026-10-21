/* A browser-wide library of uploaded images, shared by the template tools (Website Sections,
   Website Builder, Email Templates, Social Posts) so an image uploaded in one can be reused
   in another. Everything stays in this browser.
   - IndexedDB `wdp_image_library`: one record per distinct image (same type, size and
     dimensions count as the same image)
   - Images uploaded before the library existed are found by reading the section and email
     asset stores (read-only). */

const DB_NAME = 'wdp_image_library';
const STORE = 'images';

function openDb(name = DB_NAME) {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(name, 1);
    req.onupgradeneeded = () => { if (name === DB_NAME && !req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE); };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
const req2p = r => new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });

export const imageSignature = (blob, w, h) => `${blob.type}:${blob.size}:${w}x${h}`;

/* Remember an uploaded image (a Blob). Safe to call for every upload. */
export async function addToLibrary(blob, { file = 'image', w = 0, h = 0 } = {}) {
  try {
    if (!blob || !/^image\//.test(blob.type)) return;
    const db = await openDb();
    const sig = imageSignature(blob, w, h);
    const tx = db.transaction(STORE, 'readwrite');
    tx.objectStore(STORE).put({ blob, type: blob.type, file, w, h, updatedAt: new Date().toISOString() }, sig);
    await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = () => rej(tx.error); });
  } catch { /* storage blocked: the upload itself still works */ }
}

/* Read a store of another tool without ever creating it (opening a missing database would
   create an empty one and break that tool). */
async function readLegacy(name, origin) {
  try {
    if (!indexedDB.databases) return [];
    const dbs = await indexedDB.databases();
    if (!dbs.some(d => d.name === name)) return [];
    const db = await openDb(name);
    if (!db.objectStoreNames.contains('images')) { db.close(); return []; }
    const os = () => db.transaction('images', 'readonly').objectStore('images');
    const [keys, recs] = await Promise.all([req2p(os().getAllKeys()), req2p(os().getAll())]);
    db.close();
    return recs.map((rec, i) => ({ ...rec, origin, key: keys[i] })).filter(a => a.blob && /^image\//.test(a.blob.type));
  } catch { return []; }
}

/* Every image: [{ sig, key, origin, blob, type, file, w, h, updatedAt }], newest first, one per
   distinct image. `origin` is 'library', 'section' or 'email'. */
export async function listImages() {
  let own = [];
  try {
    const db = await openDb();
    const os = () => db.transaction(STORE, 'readonly').objectStore(STORE);
    const [keys, recs] = await Promise.all([req2p(os().getAllKeys()), req2p(os().getAll())]);
    db.close();
    own = recs.map((rec, i) => ({ ...rec, origin: 'library', key: keys[i] })).filter(a => a.blob);
  } catch { /* none */ }
  const legacy = [...await readLegacy('wdp_section_assets', 'section'), ...await readLegacy('wdp_email_assets', 'email')];
  const seen = new Set();
  const out = [];
  for (const a of [...own, ...legacy]) {
    const w = a.w || 0, h = a.h || 0;
    const sig = imageSignature(a.blob, w, h);
    if (seen.has(sig)) continue;
    seen.add(sig);
    out.push({ ...a, w, h, sig, file: a.file || a.name || 'image' });
  }
  return out.sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')));
}
