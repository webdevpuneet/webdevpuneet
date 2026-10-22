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
/* Images the person removed from the gallery. Older uploads live in other tools' stores (still
   used by saved designs), so removing hides them here instead of deleting those copies. */
const HIDDEN_KEY = 'wdp_image_library_hidden';
const readHidden = () => { try { return new Set(JSON.parse(localStorage.getItem(HIDDEN_KEY) || '[]')); } catch { return new Set(); } };
const writeHidden = set => { try { localStorage.setItem(HIDDEN_KEY, JSON.stringify([...set])); } catch { /* blocked */ } };

const req2p = r => new Promise((res, rej) => { r.onsuccess = () => res(r.result); r.onerror = () => rej(r.error); });

export const imageSignature = (blob, w, h) => `${blob.type}:${blob.size}:${w}x${h}`;

/* Remember an uploaded image (a Blob). Safe to call for every upload. */
export async function addToLibrary(blob, { file = 'image', w = 0, h = 0 } = {}) {
  try {
    if (!blob || !/^image\//.test(blob.type)) return;
    const db = await openDb();
    const sig = imageSignature(blob, w, h);
    const hidden = readHidden();
    if (hidden.delete(sig)) writeHidden(hidden); // uploading it again brings it back
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
  const hidden = readHidden();
  const seen = new Set();
  const out = [];
  for (const a of [...own, ...legacy]) {
    const w = a.w || 0, h = a.h || 0;
    const sig = imageSignature(a.blob, w, h);
    if (seen.has(sig) || hidden.has(sig)) continue;
    seen.add(sig);
    out.push({ ...a, w, h, sig, file: a.file || a.name || 'image' });
  }
  // Older uploads have no timestamp: their key ends in a base-36 Date.now() ("tpl:field:<time><rand>")
  const when = a => {
    if (a.updatedAt) return Date.parse(a.updatedAt) || 0;
    const m = typeof a.key === 'string' && /([0-9a-z]{8})[0-9a-z]{4}$/.exec(a.key.split(':').pop());
    return m ? parseInt(m[1], 36) || 0 : 0;
  };
  // Newest first; items with no usable time keep reverse storage order (later saved = newer)
  return out.map((a, i) => ({ a, i, t: when(a) })).sort((x, y) => y.t - x.t || y.i - x.i).map(x => x.a);
}

/* Remove an image from the gallery. Its own library record is deleted; the sig is also hidden so
   copies kept by the section and email tools (used by saved designs) stay untouched. */
export async function deleteImage(item) {
  const hidden = readHidden();
  hidden.add(item.sig);
  writeHidden(hidden);
  if (item.origin === 'library') {
    try {
      const db = await openDb();
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).delete(item.key);
      await new Promise((res, rej) => { tx.oncomplete = res; tx.onerror = () => rej(tx.error); });
      db.close();
    } catch { /* hidden anyway */ }
  }
}
