import { readFile } from 'node:fs/promises';
import path from 'node:path';

// Shared SEO/social metadata for a single snippet, used by BOTH the canonical
// page (/ui-snippets/[slug]/) and the bare iframe target (/ui-snippets/[slug]/embed/).
// Both routes must advertise the same title, description and og:image so a shared
// embed URL unfurls identically to the real page — and both must point og:url and
// the canonical link at the real page, never at the embed.

const PREVIEW_DIR = path.resolve('public/images/ui-snippets/previews');

export const BASE_URL = 'https://webdevpuneet.com/ui-snippets';
export const BASE_OG = 'https://webdevpuneet.com/images/ui-snippets';
const FALLBACK_OG = BASE_OG + '.png';

const OG_CATEGORIES = new Set([
  'animations', 'buttons', 'cards', 'charts', 'dashboards', 'forms',
  'heroes', 'layouts', 'loaders', 'modals', 'navigation',
  'pricing', 'tables', 'scroll', 'mobile', 'games',
  'carousels', 'media', 'tools', 'visualizers',
]);

/** Returns the OG image for a category id. Falls back to the generic image. */
export function categoryOG(catId) {
  return OG_CATEGORIES.has(catId) ? `${BASE_OG}/${catId}.png` : FALLBACK_OG;
}

/** Reads a PNG's intrinsic width/height from its IHDR chunk (bytes 16-23). */
export async function pngSize(slug) {
  try {
    const buf = await readFile(path.join(PREVIEW_DIR, `${slug}.png`));
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  } catch {
    return null;
  }
}

/**
 * Resolves the OG/Twitter image for a snippet: its own captured preview at the
 * real pixel size when one exists, otherwise the category card.
 */
export async function snippetOgImage(sn, alt) {
  const previewSize = await pngSize(sn.id);
  return previewSize
    ? { url: `${BASE_OG}/previews/${sn.id}.png`, width: previewSize.width, height: previewSize.height, alt }
    : { url: categoryOG(sn.category), width: 1200, height: 630, alt };
}

/**
 * Builds the full Next.js metadata object for a snippet.
 *
 * @param {object}  sn      the snippet record
 * @param {boolean} embed   true for the /embed/ route: identical social tags, but
 *                          kept out of the index since the page has no real content.
 *                          og:url and canonical still resolve to the canonical page,
 *                          so shares and crawlers are funnelled to the right URL.
 */
export async function buildSnippetMetadata(sn, { embed = false } = {}) {
  const title = sn.seo?.title || `${sn.title} — Free HTML CSS${sn.js ? ' JS' : ''} Snippet | UI Snippets`;
  const description = sn.seo?.description
    || `Copy-paste ${sn.title} snippet with live preview and editable HTML, CSS${sn.js ? ' and JavaScript' : ''}. Free — exports to React, Vue, Angular & Tailwind.`;

  const ogImage = await snippetOgImage(sn, title);
  const canonical = `${BASE_URL}/${sn.id}/`;

  return {
    title,
    description,
    authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
    robots: (embed || sn.noindex) ? { index: false, follow: false } : { index: true, follow: true },
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
      siteName: 'webdevpuneet.com',
      title,
      description,
      images: [ogImage],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@webdevpuneet',
      title,
      description,
      images: [ogImage.url],
    },
  };
}
