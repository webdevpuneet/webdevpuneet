/* IndexedDB store for images uploaded into email templates (too big for localStorage).
   Keys are `${templateId}:${fieldKey}:${uploadId}`, so undo can bring back an earlier upload. */

const DB_NAME = 'wdp_email_assets';
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

export const putAsset = (key, record) => run('readwrite', store => store.put(record, key));
export const getAsset = key => run('readonly', store => store.get(key));
export const deleteAsset = key => run('readwrite', store => store.delete(key));
export const assetKeys = prefix => run('readonly', store => store.getAllKeys()).then(keys => (keys || []).filter(k => String(k).startsWith(prefix)));
