import { notFound } from 'next/navigation';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import { VISIBLE_SNIPPETS } from '@/components/UiSnippetsTool/snippets';
import {
  BASE_URL, TAG_BASE, TAG_BY_ID,
  publishedTags, snippetsForTag, tagCounts, tagsForSnippetId,
  tagMeta, tagOgImage, tagSeoContent,
} from '@/lib/snippet-tags';
import styles from '../../[slug]/styles.module.css';

export const dynamicParams = false;

// Only tags with enough snippets get a page — see MIN_TAG_SNIPPETS. A tag chip
// anywhere in the UI is drawn from this same list, so no chip can 404.
export function generateStaticParams() {
  return publishedTags(VISIBLE_SNIPPETS).map(t => ({ tag: t.id }));
}

export async function generateMetadata({ params }) {
  const { tag: tagId } = await params;
  const tag = TAG_BY_ID.get(tagId);
  if (!tag) return {};

  const count = tagCounts(VISIBLE_SNIPPETS).get(tagId) || 0;
  const { title, description } = tagMeta(tag, count);
  const canonical = `${TAG_BASE}/${tagId}/`;
  const ogImage = tagOgImage(tag, title);

  return {
    title,
    description,
    keywords: [
      `${tag.label} snippets`,
      `${tag.label} html css js`,
      `free ${tag.label.toLowerCase()} examples`,
      'copy paste ui components',
    ],
    authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
    robots: { index: true, follow: true },
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
      creator: '@webdevpuneet',
      title,
      description,
      images: [ogImage.url],
    },
  };
}

export default async function TagPage({ params }) {
  const { tag: tagId } = await params;
  const tag = TAG_BY_ID.get(tagId);
  if (!tag) notFound();

  const snippets = snippetsForTag(VISIBLE_SNIPPETS, tagId);
  const count = snippets.length;
  const content = tagSeoContent(tag, count);
  const url = `${TAG_BASE}/${tagId}/`;
  const { title: metaTitle, description } = tagMeta(tag, count);

  // Related tags = the tags that most often appear alongside this one, which is a
  // more useful "see also" than alphabetical neighbours.
  const related = (() => {
    const co = new Map();
    for (const sn of snippets) {
      for (const t of tagsForSnippetId(sn.id)) {
        if (t !== tagId) co.set(t, (co.get(t) || 0) + 1);
      }
    }
    const published = new Set(publishedTags(VISIBLE_SNIPPETS).map(t => t.id));
    return [...co.entries()]
      .filter(([id]) => published.has(id))
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([id]) => TAG_BY_ID.get(id));
  })();

  const breadcrumbSchema = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',        item: 'https://webdevpuneet.com' },
      { '@type': 'ListItem', position: 2, name: 'UI Snippets', item: `${BASE_URL}/` },
      { '@type': 'ListItem', position: 3, name: 'Tags',        item: `${TAG_BASE}/` },
      { '@type': 'ListItem', position: 4, name: tag.label,     item: url },
    ],
  };

  // CollectionPage + ItemList: this page really is a list of other pages, and the
  // first 20 items give search engines the actual members rather than just a count.
  const collectionSchema = {
    '@context': 'https://schema.org', '@type': 'CollectionPage',
    name: metaTitle,
    description,
    url,
    isPartOf: { '@type': 'WebSite', name: 'webdevpuneet.com', url: 'https://webdevpuneet.com' },
    author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: count,
      itemListElement: snippets.slice(0, 20).map((sn, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: sn.title,
        url: `${BASE_URL}/${sn.id}/`,
      })),
    },
  };

  const faqSchema = content.faqs?.length ? {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: content.faqs.map(f => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <IndexOnly>
        <AdSlot adFirst related={false} />
        <SeoSection
          slug={content.slug}
          title={content.title}
          subtitle={content.subtitle}
          about={content.about}
          aboutLabel="About this tag"
          features={content.features}
          useCases={content.useCases}
          faqs={content.faqs}
          bottomExtra={
            <div className={styles.tagRelated} key="related-tags">
              <h2 className={styles.tagRelatedTitle}>Tags that appear alongside {tag.label}</h2>
              <div className={styles.tagRelatedRow}>
                {related.map(t => (
                  <a key={t.id} href={`/ui-snippets/tag/${t.id}/`} className={styles.tagRelatedChip}>
                    {t.label}
                  </a>
                ))}
                {/* /ui-snippets/tag/ now 301s to the gallery, so link straight there. */}
                <a href="/ui-snippets/" className={styles.tagRelatedChip}>All snippets →</a>
              </div>
            </div>
          }
        />
      </IndexOnly>
    </>
  );
}
