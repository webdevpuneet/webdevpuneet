'use client';
import { useEffect } from 'react';
import HomeOmniSearch from '@/components/HomeOmniSearch';
import { LIVE_TOOLS } from '@/lib/tools-registry';
import { setNotFound } from '@/lib/not-found-state';
import HomeSnippetsCarousel from '@/components/HomeSnippetsCarousel';
import { VISIBLE_SNIPPET_INDEX } from '@/lib/snippet-index';
import { CATEGORIES as SNIPPET_CATEGORIES } from '@/components/UiSnippetsTool/categories';
import { PATREON_GAME_IDS } from '@/lib/patreon-settings';
import PlaygroundTopNav from '@/components/PlaygroundTopNav';
import styles from './not-found.module.css';

const SNIPPET_TOTAL = (Math.floor(VISIBLE_SNIPPET_INDEX.length / 100) * 100).toLocaleString('en-US') + '+';
const TOOL_TOTAL = LIVE_TOOLS.filter(t => !t.slug.endsWith('-playground') && t.slug !== 'ui-snippets').length;

// "Explore everything": one compact card per part of the site
const EXPLORE = [
  { name: 'Website Builder', sub: 'Pick a template, edit it with forms, download a site', href: '/website-builder/', icon: 'website-builder' },
  { name: 'Section Templates', sub: 'Heroes, pricing, footers and more, ready to edit', href: '/website-section-templates/', icon: 'website-section-templates' },
  { name: 'Email Templates', sub: 'Responsive emails that work in Gmail and Outlook', href: '/email-templates/', icon: 'email-templates' },
  { name: 'Social Post Templates', sub: 'Posts and short videos for every occasion', href: '/social-post-templates/', icon: 'social-post-templates' },
  { name: 'UI Snippets', sub: SNIPPET_TOTAL + ' components with live code and exports', href: '/ui-snippets/', icon: 'ui-snippets' },
  { name: 'Games', sub: 'Play free in the browser; unlock the code on Patreon', href: '/ui-snippets/games/', icon: 'games', badge: 'Patreon' },
  { name: 'Coding Playgrounds', sub: 'Learn HTML, CSS, JS, React and more with lessons', href: '/learn-to-code/', icon: 'html-playground' },
  { name: 'Developer Tools', sub: TOOL_TOTAL + ' free tools: CSS, images, SEO, JSON and more', href: '/tools/', icon: 'json-formatter' },
];

// "Random UI Snippets" (same strip as the home page): 2 games + 3 snippets from other categories, re-picked
// at random in the browser. The pools are built in a fixed order so the pre-rendered HTML matches the first client render.
const catLabel = id => SNIPPET_CATEGORIES.find(c => c.id === id)?.label || id;
const RANDOM_GAMES = VISIBLE_SNIPPET_INDEX
  .filter(sn => sn.category === 'games' && PATREON_GAME_IDS.includes(sn.id))
  .map(sn => ({ id: sn.id, title: sn.title, cat: catLabel(sn.category), game: true }));
const RANDOM_OTHERS = VISIBLE_SNIPPET_INDEX
  .filter(sn => sn.category !== 'games')
  .map(sn => ({ id: sn.id, title: sn.title, cat: catLabel(sn.category) }));

// Newest first (the index is oldest-first), with the category for the card tags
const LATEST = [...VISIBLE_SNIPPET_INDEX].reverse().slice(0, 60).map(sn => ({ id: sn.id, title: sn.title, category: sn.category }));

const PLAYGROUNDS = LIVE_TOOLS.filter(t => t.slug.endsWith('-playground'));

export default function NotFound() {
  useEffect(() => {
    setNotFound(true);
    return () => setNotFound(false);
  }, []);

  return (
    <div className={styles.shell}>
      {/* The same tabs as the tool pages: UI Snippets, Website Builder, Website Sections, Email Templates… */}
      <PlaygroundTopNav />
      <div className={styles.page} data-not-found-page>
      <div className={styles.inner}>
        <div className={styles.code}>404</div>
        <h1 className={styles.title}>Page not found</h1>
        <p className={styles.sub}>That URL doesn&apos;t exist. Search for a snippet, template, playground or tool below, or try one of these.</p>

        {/* The home page's search: UI snippets, website, section, email and social templates, playgrounds and tools */}
        <div className={styles.omniSearch}><HomeOmniSearch /></div>

          <>
            {/* Same panel as the home page: Random (2 games + 3 others) and Latest, with a divider between */}
            <div className={styles.snipPanel}>
              <div className={styles.latestStrip}><HomeSnippetsCarousel items={RANDOM_OTHERS} games={RANDOM_GAMES} title="Random UI Snippets" shuffle flush /></div>
              <div className={styles.latestStrip}><HomeSnippetsCarousel items={LATEST} total={VISIBLE_SNIPPET_INDEX.length} flush /></div>
            </div>

            {/* Everything else on the site, compact: one card per product, then every playground as a chip */}
            <p className={styles.sectionLabel}>Explore everything</p>
            <div className={styles.exploreGrid}>
              {EXPLORE.map(x => (
                <a key={x.href} href={x.href} className={styles.exploreCard}>
                  <span className={styles.exploreIcon}><img src={`/icons/${x.icon}.svg`} alt="" width={20} height={20} /></span>
                  <span className={styles.exploreText}>
                    <span className={styles.exploreName}>{x.name}{x.badge && <span className={styles.exploreBadge}>{x.badge}</span>}</span>
                    <span className={styles.exploreSub}>{x.sub}</span>
                  </span>
                  <span className={styles.exploreArrow} aria-hidden="true">→</span>
                </a>
              ))}
            </div>

            <p className={styles.sectionLabel}>Coding playgrounds</p>
            <div className={styles.chipRow}>
              {PLAYGROUNDS.map(tool => (
                <a key={tool.slug} href={`/${tool.slug}/`} className={styles.chip}>
                  <img src={`/icons/${tool.slug}.svg`} alt="" width={14} height={14} />
                  {tool.name.replace(' Playground', '')}
                </a>
              ))}
              <a href="/learn-to-code/" className={styles.chipMore}>All playgrounds →</a>
            </div>
          </>

        <a href="/" className={styles.homeLink}>← Back to home</a>
      </div>
      </div>
    </div>
  );
}
