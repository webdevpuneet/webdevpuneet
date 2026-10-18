/* "My designs": named copies of a design, kept in this browser's IndexedDB (they can hold
   photos, which are too big for localStorage). Record:
   { id, name, tpl, state, thumb (small JPEG data URL), created, updated } */

const DB = 'wdp-spt-designs';
const STORE = 'designs';

function open() {
  return new Promise((res, rej) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: 'id' });
    req.onsuccess = () => res(req.result);
    req.onerror = () => rej(req.error);
  });
}
async function run(mode, fn) {
  const db = await open();
  return new Promise((res, rej) => {
    const tx = db.transaction(STORE, mode);
    const out = fn(tx.objectStore(STORE));
    tx.oncomplete = () => res(out?.result);
    tx.onerror = () => rej(tx.error);
  });
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
