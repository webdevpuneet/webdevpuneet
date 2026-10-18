/* Social post data in this browser's IndexedDB (room for photos, unlike localStorage):
   - designs:  "My designs", named copies of a design.
               { id, name, tpl, state, thumb (small JPEG data URL), created, updated }
   - autosave: what's open in each template, saved as you edit. { tpl, state, updated } */

const DB = 'wdp-spt-designs';
const STORE = 'designs';
const AUTOSAVE = 'autosave';

let dbP = null;
function open() {
  if (!dbP) {
    dbP = new Promise((res, rej) => {
      const req = indexedDB.open(DB, 2);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) db.createObjectStore(STORE, { keyPath: 'id' });
        if (!db.objectStoreNames.contains(AUTOSAVE)) db.createObjectStore(AUTOSAVE, { keyPath: 'tpl' });
      };
      req.onsuccess = () => {
        const db = req.result;
        // Another tab upgrading the database: let go so it isn't blocked
        db.onversionchange = () => { db.close(); dbP = null; };
        res(db);
      };
      req.onerror = () => { dbP = null; rej(req.error); };
      req.onblocked = () => { dbP = null; rej(new Error('Storage is busy in another tab')); };
    });
  }
  return dbP;
}
async function run(mode, fn, store = STORE) {
  const db = await open();
  return new Promise((res, rej) => {
    const tx = db.transaction(store, mode);
    const out = fn(tx.objectStore(store));
    tx.oncomplete = () => res(out?.result);
    tx.onerror = () => rej(tx.error);
  });
}

/* Ask the browser to keep this site's storage when space runs low (best effort, once) */
let persistAsked = false;
function askPersist() {
  if (persistAsked) return;
  persistAsked = true;
  try { navigator.storage?.persist?.(); } catch { /* unsupported */ }
}

/* Autosave of the open design, per template */
export async function getAutosave(tpl) {
  try { return (await run('readonly', st => st.get(tpl), AUTOSAVE))?.state || null; } catch { return null; }
}
export async function putAutosave(tpl, state) {
  askPersist();
  await run('readwrite', st => st.put({ tpl, state, updated: new Date().toISOString() }), AUTOSAVE);
}

const CHANGE = 'wdp-spt-designs-change';
const changed = () => window.dispatchEvent(new Event(CHANGE));
export const onDesignsChange = fn => { window.addEventListener(CHANGE, fn); return () => window.removeEventListener(CHANGE, fn); };

export async function listDesigns() {
  try {
    const all = await run('readonly', st => st.getAll());
    return (all || []).sort((a, b) => b.updated.localeCompare(a.updated));
  } catch { return []; }
}
export const getDesign = id => run('readonly', st => st.get(id));

export async function saveDesign(rec) {
  askPersist();
  const now = new Date().toISOString();
  const full = { created: now, ...rec, id: rec.id || `d-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`, updated: now };
  await run('readwrite', st => st.put(full));
  changed();
  return full;
}
export async function deleteDesign(id) { await run('readwrite', st => st.delete(id)); changed(); }
export async function duplicateDesign(id) {
  const d = await getDesign(id);
  if (!d) return null;
  return saveDesign({ ...d, id: undefined, created: undefined, name: `${d.name} (copy)` });
}

/** Small JPEG thumbnail from a full-size render Blob */
export async function thumbFrom(blob, maxW = 240) {
  const url = URL.createObjectURL(blob);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    const k = Math.min(1, maxW / img.naturalWidth);
    const c = document.createElement('canvas');
    c.width = Math.round(img.naturalWidth * k);
    c.height = Math.round(img.naturalHeight * k);
    c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
    return c.toDataURL('image/jpeg', 0.72);
  } finally { URL.revokeObjectURL(url); }
}
