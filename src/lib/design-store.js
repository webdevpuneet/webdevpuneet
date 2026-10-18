/* Per-tool design storage in IndexedDB (room for photos, unlike localStorage), shared by
   Social Post Templates and Email Templates. Each tool gets its own database with:
   - designs:  "My designs", named copies of a design.
               { id, name, tpl, state, thumb?, created, updated }
   - autosave: what's open in each template, saved as you edit. { tpl, state, updated } */

const STORE = 'designs';
const AUTOSAVE = 'autosave';

/* Ask the browser to keep this site's storage when space runs low (best effort, once) */
let persistAsked = false;
function askPersist() {
  if (persistAsked) return;
  persistAsked = true;
  try { navigator.storage?.persist?.(); } catch { /* unsupported */ }
}

export function makeDesignStore(dbName) {
  let dbP = null;
  const open = () => {
    if (!dbP) {
      dbP = new Promise((res, rej) => {
        const req = indexedDB.open(dbName, 2);
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
  };
  const run = async (mode, fn, store = STORE) => {
    const db = await open();
    return new Promise((res, rej) => {
      const tx = db.transaction(store, mode);
      const out = fn(tx.objectStore(store));
      tx.oncomplete = () => res(out?.result);
      tx.onerror = () => rej(tx.error);
    });
  };

  const CHANGE = `${dbName}-change`;
  const changed = () => window.dispatchEvent(new Event(CHANGE));

  const api = {
    onDesignsChange: fn => { window.addEventListener(CHANGE, fn); return () => window.removeEventListener(CHANGE, fn); },
    async getAutosave(tpl) {
      try { return (await run('readonly', st => st.get(tpl), AUTOSAVE))?.state || null; } catch { return null; }
    },
    async putAutosave(tpl, state) {
      askPersist();
      await run('readwrite', st => st.put({ tpl, state, updated: new Date().toISOString() }), AUTOSAVE);
    },
    async listDesigns() {
      try {
        const all = await run('readonly', st => st.getAll());
        return (all || []).sort((a, b) => b.updated.localeCompare(a.updated));
      } catch { return []; }
    },
    getDesign: id => run('readonly', st => st.get(id)),
    async saveDesign(rec) {
      askPersist();
      const now = new Date().toISOString();
      const full = { created: now, ...rec, id: rec.id || `d-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`, updated: now };
      await run('readwrite', st => st.put(full));
      changed();
      return full;
    },
    async deleteDesign(id) { await run('readwrite', st => st.delete(id)); changed(); },
    async duplicateDesign(id) {
      const d = await api.getDesign(id);
      if (!d) return null;
      return api.saveDesign({ ...d, id: undefined, created: undefined, name: `${d.name} (copy)` });
    },
  };
  return api;
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
