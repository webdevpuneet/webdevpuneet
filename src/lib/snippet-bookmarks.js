'use client';
/* Bookmarked library snippets, kept in this browser's IndexedDB database `wdp-ui-bookmarks` (a design store, see
   src/lib/design-store.js): one record per bookmark, { id: the snippet id, name: the snippet id, tpl: 'bookmark',
   state: {} }, newest bookmark first. A copy of the ids is held in memory so every button and the sidebar can read
   them at once; the database is read when the page loads. Bookmarks that were kept in localStorage (`uis_bookmarks`)
   are moved over the first time they load, and the old key is removed once they are safely in IndexedDB.
   "Bookmarked" is a client-side view only: it has no URL of its own. The gallery shows it as a chip that filters its
   grid, and the sidebar shows a link with the count. Everything that shows bookmarks listens for BOOKMARKS_EVENT,
   fired in this tab on every change; a BroadcastChannel carries the change to other tabs. */
import { useEffect, useState } from 'react';
import { makeDesignStore } from '@/lib/design-store';

const LEGACY_KEY = 'uis_bookmarks';
const VIEW_KEY = 'uis_show_bookmarked';
export const BOOKMARKS_EVENT = 'uis-bookmarks-changed';

const store = makeDesignStore('wdp-ui-bookmarks');
let ids = [];          // newest first
let loaded = null;     // the one-time load, shared by every caller
let channel = null;

const announce = () => window.dispatchEvent(new Event(BOOKMARKS_EVENT));

async function readAll() {
  return (await store.listDesigns()).map(d => d.id);
}

function load() {
  if (!loaded) {
    loaded = (async () => {
      try {
        let old = [];
        try { old = JSON.parse(localStorage.getItem(LEGACY_KEY) || '[]'); } catch { /* unreadable: ignore */ }
        if (Array.isArray(old) && old.length) {
          const have = new Set(await readAll());
          // oldest first, so the newest ends up with the latest "updated" time and stays on top
          for (const id of [...old].reverse()) {
            if (typeof id === 'string' && !have.has(id)) await store.saveDesign({ id, name: id, tpl: 'bookmark', state: {} });
          }
        }
        try { localStorage.removeItem(LEGACY_KEY); } catch { /* ignore */ }
        ids = await readAll();
      } catch {
        ids = [];       // storage trouble: no bookmarks rather than a broken page
      }
      try {
        if (typeof BroadcastChannel !== 'undefined') {
          channel = new BroadcastChannel('uis-bookmarks');
          channel.onmessage = async () => { ids = await readAll(); announce(); };
        }
      } catch { /* unsupported */ }
      announce();
    })();
  }
  return loaded;
}

export function getBookmarks() {
  return ids;
}

/** Add or remove a snippet; returns true when it is now bookmarked. The screen updates at once, the save follows. */
export function toggleBookmark(id) {
  const has = ids.includes(id);
  ids = has ? ids.filter(x => x !== id) : [id, ...ids];
  announce();
  (async () => {
    try {
      await load();
      if (has) await store.deleteDesign(id);
      else await store.saveDesign({ id, name: id, tpl: 'bookmark', state: {} });
      channel?.postMessage('changed');
    } catch { /* the in-memory list still works for this visit */ }
  })();
  return !has;
}

/** A Bookmarked link calls this just before it navigates to the gallery, which opens on that view once */
export function requestBookmarkedView() {
  try { localStorage.setItem(VIEW_KEY, '1'); } catch {}
}
/** The gallery calls this on load: true once after a request, so a later plain visit opens on All */
export function consumeBookmarkedView() {
  try {
    const on = localStorage.getItem(VIEW_KEY) === '1';
    if (on) localStorage.removeItem(VIEW_KEY);
    return on;
  } catch { return false; }
}

/** The bookmarked ids, kept in step with every change (empty until the database has been read) */
export function useBookmarks() {
  const [list, setList] = useState([]);
  useEffect(() => {
    const sync = () => setList(ids);
    window.addEventListener(BOOKMARKS_EVENT, sync);
    load().then(sync);
    return () => window.removeEventListener(BOOKMARKS_EVENT, sync);
  }, []);
  return list;
}
