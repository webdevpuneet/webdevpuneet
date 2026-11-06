/* — IndexedDB for My Code (custom snippets) — shared between UiSnippetsTool and Sidebar — */
import { logActivity } from './activity-log';
import { htmlThumb } from './html-thumb';
const DB_NAME    = 'ui_snippets_db';
const DB_VERSION = 1;
const STORE      = 'custom_snippets';

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = e => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE)) {
        const store = db.createObjectStore(STORE, { keyPath: 'id' });
        store.createIndex('updatedAt', 'updatedAt');
      }
    };
    req.onsuccess = e => resolve(e.target.result);
    req.onerror   = e => reject(e.target.error);
  });
}

export async function dbGetAll() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE, 'readonly');
    const req = tx.objectStore(STORE).getAll();
    req.onsuccess = e => resolve(e.target.result || []);
    req.onerror   = e => reject(e.target.error);
  });
}

// The Sidebar's "My Code" tab badge keeps its own copy of the snippet list in
// state, loaded once on mount — without this, a save/delete elsewhere on the
// page (the UiSnippetsTool editor) never reaches it, so the badge count only
// ever updates on a full page refresh.
function notifyChanged() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('uis-custom-snippets-changed'));
}

export async function dbPut(record) {
  const db = await openDB();
  await new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE, 'readwrite');
    const req = tx.objectStore(STORE).put(record);
    req.onsuccess = () => resolve();
    req.onerror   = e => reject(e.target.error);
  });
  logActivity(); // one save for the home page's activity heatmap
  notifyChanged();
  queueThumb(record);
}

/* Thumbnails. Every saved snippet gets a small picture (a data:image/jpeg URL in `thumb`) of its HTML and CSS, like the saved
   designs of the other tools, for the home page. It is drawn after the save, in the background and one snippet at a time,
   so saving never waits for it; if the snippet changed again in the meantime, the newer save draws its own. Scripts do not
   run in the picture, so a snippet built by its JavaScript shows its static HTML. */
export function snippetThumb(r) {
  const links = (r.cdnUrls || []).filter(u => /\.css(\?.*)?$/i.test(u)).map(u => `<link rel="stylesheet" href="${u}">`).join('');
  const doc = `<!doctype html><html><head><meta charset="utf-8">${links}<style>html,body{margin:0;background:#fff;font-family:system-ui,sans-serif}${r.css || ''}</style></head><body>${r.html || ''}</body></html>`;
  return htmlThumb(doc, { width: 1000, height: 625 });
}

/* Adds or replaces just the thumbnail; the snippet's dates and the activity log are left alone */
export async function dbSetThumb(id, thumb) {
  if (!id || !thumb) return;
  const db = await openDB();
  await new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite');
    const os = tx.objectStore(STORE);
    const get = os.get(id);
    get.onsuccess = () => { if (get.result) os.put({ ...get.result, thumb }); };
    tx.oncomplete = () => resolve();
    tx.onerror = e => reject(e.target.error);
  });
  notifyChanged();
}

const thumbQueue = new Map(); // id -> the latest saved record still waiting for its picture
let thumbRunning = false;
function queueThumb(record) {
  if (typeof window === 'undefined' || !record?.id || !(record.html || record.css)) return;
  thumbQueue.set(record.id, record);
  if (thumbRunning) return;
  thumbRunning = true;
  (async () => {
    while (thumbQueue.size) {
      const [id, rec] = thumbQueue.entries().next().value;
      thumbQueue.delete(id);
      try {
        const thumb = await snippetThumb(rec);
        if (thumb && !thumbQueue.has(id)) await dbSetThumb(id, thumb);
      } catch { /* keep the snippet without a picture */ }
    }
    thumbRunning = false;
  })();
}

export async function dbDelete(id) {
  const db = await openDB();
  await new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE, 'readwrite');
    const req = tx.objectStore(STORE).delete(id);
    req.onsuccess = () => resolve();
    req.onerror   = e => reject(e.target.error);
  });
  notifyChanged();
}

export async function dbClear() {
  const db = await openDB();
  await new Promise((resolve, reject) => {
    const tx  = db.transaction(STORE, 'readwrite');
    const req = tx.objectStore(STORE).clear();
    req.onsuccess = () => resolve();
    req.onerror   = e => reject(e.target.error);
  });
  notifyChanged();
}
