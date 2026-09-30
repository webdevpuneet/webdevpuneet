const BLOG_FEED_BASE = 'https://www.webdevpuneet.com/feeds/posts/default';

function extractLink(entry) {
  const alt = (entry.link || []).find(l => l.rel === 'alternate');
  return alt ? alt.href : null;
}

function extractThumb(entry) {
  const url = entry.media$thumbnail?.url;
  if (!url) return null;
  // Blogger's default feed thumbnail is a tiny 72px *square* crop (the "-c"
  // suffix forces a square). Dropping "-c" and bumping the size gives back
  // the original image proportionally resized — the real rectangular photo,
  // not a cropped square — which is what the card actually needs.
  return url.replace(/\/s\d+(-c)?\//, '/s640/');
}

// Fetches the latest posts from the "UI Snippets" label on the (Blogger-hosted)
// blog at webdevpuneet.com. Server-only: this must run in a server component,
// route handler, or other Node context, never client-side — Blogger's public
// feed doesn't reliably send CORS headers for cross-origin browser fetches,
// while a plain server-to-server request has no CORS restriction at all.
// Fails soft (returns []) on any network or parse error so a blog outage
// never breaks the snippet page it's embedded on.
export async function fetchLatestBlogPosts(max = 4) {
  try {
    const res = await fetch(`${BLOG_FEED_BASE}?alt=json&max-results=${max}`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    const entries = data?.feed?.entry || [];
    return entries
      .map((entry) => ({
        title: entry.title?.$t?.trim() || '',
        href: extractLink(entry),
        thumb: extractThumb(entry),
        date: entry.published?.$t || null,
      }))
      .filter((p) => p.title && p.href)
      .slice(0, max);
  } catch (_) {
    return [];
  }
}
