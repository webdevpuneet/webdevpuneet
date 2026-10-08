// The blog is a WordPress install at webdevpuneet.com/blog/ (same origin as this
// site). Posts are read from the WordPress REST API through the ?rest_route=
// form, which works whether or not pretty permalinks are enabled — /wp-json/
// and /feed/ only exist once they are.
export const BLOG_URL = 'https://webdevpuneet.com/blog/';

function postsApiUrl(max) {
  return `${BLOG_URL}?rest_route=/wp/v2/posts&per_page=${max}&_embed=wp:featuredmedia&_fields=title,link,date,excerpt,_links,_embedded`;
}

// WordPress returns titles as HTML (e.g. "It&#8217;s"), so decode the entities
// the card renders as plain text.
const NAMED_ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', hellip: '…', mdash: '—', ndash: '–' };
function decodeEntities(s) {
  return s
    .replace(/<[^>]*>/g, '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&([a-z]+);/gi, (m, name) => NAMED_ENTITIES[name.toLowerCase()] ?? m);
}

// Plain-text excerpt for the featured card: tags and the trailing "[...]" WordPress adds are
// dropped and the text is cut to about 150 characters at a word boundary.
function cleanExcerpt(html) {
  const text = decodeEntities(html || '').replace(/\s+/g, ' ').replace(/\s*\[…\]\s*$/, '').trim();
  if (text.length <= 150) return text;
  const cut = text.slice(0, 150);
  return cut.slice(0, cut.lastIndexOf(' ') > 90 ? cut.lastIndexOf(' ') : 150).replace(/[\s,.;:—-]+$/, '') + '…';
}

// Featured image at a card-friendly size, falling back to the full image.
function extractThumb(post) {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (!media) return null;
  const sizes = media.media_details?.sizes || {};
  return (sizes.medium_large || sizes.large || sizes.medium)?.source_url || media.source_url || null;
}

// Fetches the latest posts as [{ title, href, thumb, date, excerpt }]. Runs both at
// build time (home page, server component) and in the browser (sidebar Blog
// tab, latest-posts carousel); `next.revalidate` is ignored client-side.
// Fails soft (returns []) on any network or parse error so a blog outage
// never breaks the page it's embedded on.
export async function fetchLatestBlogPosts(max = 4) {
  try {
    const res = await fetch(postsApiUrl(max), { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    if (!Array.isArray(data)) return [];
    return data
      .map((post) => ({
        title: decodeEntities(post.title?.rendered || '').trim(),
        href: post.link || null,
        thumb: extractThumb(post),
        date: post.date || null,
        excerpt: cleanExcerpt(post.excerpt?.rendered),
      }))
      .filter((p) => p.title && p.href)
      .slice(0, max);
  } catch (_) {
    return [];
  }
}
