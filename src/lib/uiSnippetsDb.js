/* — IndexedDB for My Code (custom snippets) — shared between UiSnippetsTool and Sidebar — */
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
  notifyChanged();
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
