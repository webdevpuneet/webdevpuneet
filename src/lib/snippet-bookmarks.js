'use client';
/* Bookmarked library snippets, kept in this browser's localStorage as a list of snippet ids (newest bookmark first).
   "Bookmarked" is a client-side view only: it has no URL of its own. The gallery shows it as a chip that filters its
   grid, and the sidebar lists the bookmarks under UI Snippets. Everything that shows bookmarks listens for
   BOOKMARKS_EVENT, which is fired in this tab on every change ('storage' covers the other tabs). */
import { useEffect, useState } from 'react';

const KEY = 'uis_bookmarks';
const VIEW_KEY = 'uis_show_bookmarked';
export const BOOKMARKS_EVENT = 'uis-bookmarks-changed';

export function getBookmarks() {
  try {
    const list = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(list) ? list.filter(id => typeof id === 'string') : [];
  } catch { return []; }
}

function write(list) {
  try { localStorage.setItem(KEY, JSON.stringify(list)); } catch {}
  window.dispatchEvent(new Event(BOOKMARKS_EVENT));
}

/** Add or remove a snippet; returns true when it is now bookmarked */
export function toggleBookmark(id) {
  const list = getBookmarks();
  const has = list.includes(id);
  write(has ? list.filter(x => x !== id) : [id, ...list]);
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

/** The bookmarked ids, kept in step with every change (empty on the server render) */
export function useBookmarks() {
  const [list, setList] = useState([]);
  useEffect(() => {
    const sync = () => setList(getBookmarks());
    sync();
    window.addEventListener(BOOKMARKS_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => { window.removeEventListener(BOOKMARKS_EVENT, sync); window.removeEventListener('storage', sync); };
  }, []);
  return list;
}
