/* Website section templates: everything a person makes is kept in this browser.
   - IndexedDB `wdp-section-designs`: "My designs" and the autosave of each section
     (src/lib/design-store.js for the record shapes)
   - IndexedDB `wdp_section_assets`: uploaded images as Blobs, key `${tpl}:${field}:${uploadId}`
   Uploaded fonts live in the shared `wdp-fonts` store (src/lib/fonts.js). */
import { makeDesignStore } from '@/lib/design-store';

export const sectionDesignStore = makeDesignStore('wdp-section-designs');

const DB_NAME = 'wdp_section_assets';
const STORE = 'images';

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => { if (!req.result.objectStoreNames.contains(STORE)) req.result.createObjectStore(STORE); };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}
function run(mode, fn) {
  return openDb().then(db => new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, mode);
    const out = fn(tx.objectStore(STORE));
    tx.oncomplete = () => resolve(out?.result ?? out);
    tx.onerror = () => reject(tx.error);
  }));
}

/* record: { blob, type, file, w, h } */
export const putAsset = (key, record) => run('readwrite', store => store.put(record, key));
export const getAsset = key => run('readonly', store => store.get(key));
export const deleteAsset = key => run('readwrite', store => store.delete(key));

