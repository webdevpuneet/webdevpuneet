'use client';

import { useEffect, useState } from 'react';
import HomeSnippetsCarousel from '@/components/HomeSnippetsCarousel';

// "Latest UI Snippets" for tool pages. The home page ranks its slice on the server; tool
// pages render this strip from a client component (AdSlot), so it loads the small
// {id, title} search index after the page is up instead of bundling the snippet library.
// The strip stays out of the page until the index has arrived.
export default function LatestSnippetsStrip({ limit = 60 }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    import('@/lib/snippet-search-index')
      .then(mod => {
        if (cancelled) return;
        const newestFirst = [...mod.SNIPPET_SEARCH_INDEX].reverse();   // the index is oldest-first
        setData({ items: newestFirst.slice(0, limit), total: newestFirst.length });
      })
      .catch(() => { /* offline or chunk failed: leave the strip out */ });
    return () => { cancelled = true; };
  }, [limit]);

  if (!data) return null;
  return <HomeSnippetsCarousel items={data.items} total={data.total} flush />;
}
