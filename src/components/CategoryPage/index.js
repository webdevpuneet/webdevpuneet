'use client';
import { useState, useEffect } from 'react';
import CategoryGrid from '@/components/CategoryGrid';
import AdSlot from '@/components/AdSlot';
import PlaygroundTopAd from '@/components/PlaygroundTopAd';
import SeoSection from '@/components/SeoSection';
import { LIVE_TOOLS } from '@/lib/tools-registry';
import { CATEGORIES } from '@/lib/categories';
import styles from '@/app/category-page.module.css';

function FaqAccordion({ faqs }) {
  const [open, setOpen] = useState(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  return (
    <div className={styles.faqList}>
      {faqs.map((item, i) => {
        const isOpen = open === i;
        const hidden = mounted && !isOpen;
        return (
          <div key={i} className={styles.faqItem}>
            <button
              className={styles.faqQ}
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              {item.q}
              <span className={`${styles.faqChevron} ${isOpen ? styles.faqChevronOpen : ''}`}>▼</span>
            </button>
            <div
              className={`${styles.faqA} ${hidden ? styles.faqAHidden : ''}`}
              aria-hidden={hidden}
            >
              <p className={styles.faqAP}>{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function renderInline(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((chunk, j) =>
    chunk.startsWith('**') && chunk.endsWith('**')
      ? <strong key={j}>{chunk.slice(2, -2)}</strong>
      : chunk
  );
}

function renderAbout(text) {
  return text.split('\n\n').map((para, i) => {
    if (para.startsWith('### ')) {
      return <h3 key={i} className={styles.seoH3}>{renderInline(para.slice(4))}</h3>;
    }
    if (para.startsWith('## ')) {
      return <h2 key={i} className={styles.seoH2}>{renderInline(para.slice(3))}</h2>;
    }
    if (para.startsWith('- ')) {
      const items = para.split('\n').filter(l => l.startsWith('- '));
      return (
        <ul key={i} className={styles.seoList}>
          {items.map((l, j) => <li key={j}>{renderInline(l.slice(2))}</li>)}
        </ul>
      );
    }
    return <p key={i}>{renderInline(para)}</p>;
  });
}

export default function CategoryPage({ slug }) {
  const category = CATEGORIES.find(c => c.slug === slug);
  if (!category) return null;

  const liveSlugs = new Set(LIVE_TOOLS.map(t => t.slug));
  const tools = category.toolSlugs
    .map(s => LIVE_TOOLS.find(t => t.slug === s))
    .filter(t => t && liveSlugs.has(t.slug));

  const latestLastmod = tools.reduce((best, t) => (!best || t.lastmod > best ? t.lastmod : best), null);
  const lastmodFmt = latestLastmod ? (() => {
    const [y, m, d] = latestLastmod.split('-').map(Number);
    return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  })() : null;

  const relatedCategories = CATEGORIES.filter(c => category.related.includes(c.slug));
  const getLiveCategoryToolCount = (cat) => cat.toolSlugs.filter(s => liveSlugs.has(s)).length;

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${category.name} — Free Online Tools`,
    url: `https://webdevpuneet.com/${slug}/`,
    description: category.metadata.description,
    itemListElement: tools.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      description: t.desc,
      url: `https://webdevpuneet.com/${t.slug}/`,
    })),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: category.faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'webdevpuneet.com', item: 'https://webdevpuneet.com' },
      { '@type': 'ListItem', position: 2, name: category.name, item: `https://webdevpuneet.com/${slug}/` },
    ],
  };

  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero */}
      <header className={styles.hero}>
        <div className={styles.heroOrb1} aria-hidden="true" />
        <div className={styles.heroOrb2} aria-hidden="true" />
        <div className={styles.heroInner}>
          {/* Breadcrumb inside hero */}
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span>{category.name}</span>
          </nav>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            {tools.length} free tools · no signup · runs in your browser
          </div>
          <h1 className={styles.title}>{category.headline}</h1>
          <div className={styles.heroAccentLine} aria-hidden="true" />
          {category.tagline && <p className={styles.subtitle}>{category.tagline}</p>}
          {category.description && <p className={styles.heroDesc}>{category.description}</p>}
          <div className={styles.statsRow}>
            {[
              { num: tools.length, label: 'Tools' },
              { num: '100%', label: 'Free' },
              { num: '0', label: 'Signup' },
              { num: '∞', label: 'No limits' },
            ].map(({ num, label }) => (
              <div key={label} className={styles.statCell}>
                <strong className={styles.statNum}>{num}</strong>
                <span className={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
          <div className={styles.heroBottom}>
            {lastmodFmt && <p className={styles.lastmod}>Updated {lastmodFmt}</p>}
          </div>
          {/* Leaderboard ad (max 90px) at the bottom of the hero — all hub pages share this component */}
          <PlaygroundTopAd className={styles.heroAd} />
        </div>
      </header>

      {/* Tool grid */}
      <CategoryGrid tools={tools} currentSlug={slug} />

      <AdSlot slot={`${slug}-below-grid`} />

      {/* SEO content via SeoSection */}
      <div className={styles.seoWrap}>
        <SeoSection
          slug={slug}
          noShare
          noRelated
          about={category.about ? {
            title: `About ${category.name}`,
            description: category.about,
          } : undefined}
          useCases={category.useCases}
          faqs={category.faqs}
        />
      </div>
    </div>
  );
}
