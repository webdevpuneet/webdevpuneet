'use client';

import { useBookmarks, toggleBookmark } from '@/lib/snippet-bookmarks';

/* Bookmark toggle for a library snippet. The bookmarks show up in the gallery's Bookmarked view and in the sidebar
   under UI Snippets. `className` lets each place style it like its neighbouring buttons. */
export default function BookmarkButton({ id, className, size = 13, text }) {
  const on = useBookmarks().includes(id);
  const label = on ? 'Remove from bookmarks' : 'Add to bookmarks';
  return (
    <button
      type="button"
      className={className}
      aria-pressed={on}
      aria-label={label}
      title={label}
      style={{ cursor: 'pointer', ...(on ? { color: '#f59e0b' } : null) }}
      onClick={e => { e.preventDefault(); e.stopPropagation(); toggleBookmark(id); }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill={on ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
      {text}
    </button>
  );
}
