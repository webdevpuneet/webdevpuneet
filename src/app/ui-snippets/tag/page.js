import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import { VISIBLE_SNIPPETS } from '@/components/UiSnippetsTool/snippets';
import { SNIPPET_COUNT } from '@/lib/snippet-count';
import { BASE_URL, TAG_BASE, TAG_OG_DIR, OG_WIDTH, OG_HEIGHT, publishedTags } from '@/lib/snippet-tags';
import styles from '../[slug]/styles.module.css';

const TAGS = publishedTags(VISIBLE_SNIPPETS);

const TITLE = `UI Snippet Tags — Browse ${SNIPPET_COUNT}+ Free HTML CSS JS Components by Technique | UI Snippets`;
const DESCRIPTION = `Browse every UI snippet by tag — GSAP, Three.js, canvas, SVG, CSS Grid, scroll animation, dark mode, accessibility, AI UI and more. ${SNIPPET_COUNT}+ free copy-paste components with live preview.`;
const OG_IMAGE = { url: `${TAG_OG_DIR}/index.png`, width: OG_WIDTH, height: OG_HEIGHT, alt: TITLE };

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: `${TAG_BASE}/` },
  openGraph: {
    type: 'website',
    url: `${TAG_BASE}/`,
    siteName: 'webdevpuneet.com',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    creator: '@webdevpuneet',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export default function TagIndexPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://webdevpuneet.com' },
      { '@type': 'ListItem', position: 2, name: 'UI Snippets', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 3, name: 'Tags',        item: `${TAG_BASE}/` },
    ],
  };

  const listSchema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: TITLE,
    description: DESCRIPTION,
    url: `${TAG_BASE}/`,
    isPartOf: { '@type': 'WebSite', name: 'webdevpuneet.com', url: 'https://webdevpuneet.com' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: TAGS.length,
      itemListElement: TAGS.map((t, i) => ({
        '@type': 'ListItem', position: i + 1, name: `${t.label} snippets`, url: `${TAG_BASE}/${t.id}/`,
      })),
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />
      <AdSlot adFirst related={false} />
      <IndexOnly>
      <SeoSection
        slug="ui-snippets/tag"
        title="UI Snippet Tags — Browse by Library, API and Technique"
        subtitle={`${TAGS.length} tags across ${SNIPPET_COUNT}+ snippets · Live preview · Exports to React, Vue, Angular & Tailwind`}
        topExtra={
          <div className={styles.tagIndex} key="tag-index">
            <h2 className={styles.tagIndexTitle}>Every tag</h2>
            <p className={styles.tagIndexIntro}>
              A category says what a snippet <em>is</em>; a tag says what it is <em>made of</em> or <em>for</em>.
              Each snippet carries up to five, so a GSAP-powered pricing table appears under both GSAP and E-Commerce.
            </p>
            <div className={styles.tagIndexGrid}>
              {TAGS.map(t => (
                <a key={t.id} href={`/ui-snippets/tag/${t.id}/`} className={styles.tagIndexCard}>
                  <span className={styles.tagIndexName}>{t.label}</span>
                  <span className={styles.tagIndexCount}>{t.count}</span>
                </a>
              ))}
            </div>
          </div>
        }
        about={{
          title: 'Browse UI Snippets by Tag',
          description: `Tags cut across the library's categories. A category answers "what kind of component is this" — a button, a table, a hero. A tag answers the questions you actually search on: which library does it use, which browser API does it call, which CSS technique does it demonstrate, and which product surface is it for.\n\nEvery snippet carries up to five tags, generated from what the code actually contains rather than from a manual label — the CDN scripts it loads, the APIs it calls, the properties it animates. That means a tag page is an honest filter: everything on it genuinely uses the thing the tag names.`,
        }}
        features={[
          'Library tags — GSAP, Three.js, Lottie and the CDN-loaded libraries behind each effect',
          'API tags — canvas, SVG, IntersectionObserver, Clipboard, Web Audio, Web Crypto, storage',
          'Technique tags — CSS Grid, CSS-only, 3D transforms, glassmorphism, scroll animation, dark mode',
          'Surface tags — dashboards, e-commerce, AI UI, mobile, forms, tables, landing pages, games',
          'Every tag page paginates the full matching set, with live previews and one-click framework export',
        ]}
        faqs={[
          { q: 'How is a tag different from a category?', a: 'A snippet belongs to exactly one category — that is its structural type, and it determines its place in the library. Tags are cross-cutting and a snippet has up to five, so the same component can be found through the library it uses, the technique it demonstrates and the product surface it belongs to.' },
          { q: 'How are tags assigned?', a: 'Automatically, from the snippet\'s own code: the CDN URLs it loads, the browser APIs it calls, the CSS properties it uses and the words in its title. The mapping is regenerated whenever snippets are added, so it never drifts from what the code actually does.' },
          { q: 'Why do some tags not have a page?', a: 'A tag needs at least five snippets before it gets its own indexed page. A page with two results is thin — worth less to a reader and to a search engine than no page at all — so those tags stay as labels until the library catches up.' },
        ]}
      /></IndexOnly>
    </>
  );
}
