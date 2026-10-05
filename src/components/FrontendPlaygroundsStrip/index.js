'use client';

import styles from '@/components/SeoSection/styles.module.css';
import { LIVE_TOOLS } from '@/lib/tools-registry';
import BlogStrip from '@/components/BlogStrip';

const PLAYGROUND_SLUGS = [
  'html-playground',
  'css-playground',
  'js-playground',
  'react-playground',
  'gsap-playground',
  'svg-playground',
  'scss-playground',
  'tailwind-playground',
  'bootstrap5-playground',
];

// `blogPosts`: latest posts already fetched on the server (home), handed to the blog strip.
// `blogFirst`: put the blog strip above this one instead of below it (home).
// `after`: extra strip(s) placed right after this one (home: tools).
export default function FrontendPlaygroundsStrip({ blogPosts = null, blogFirst = false, after = null }) {
  const tools = PLAYGROUND_SLUGS
    .map(s => LIVE_TOOLS.find(t => t.slug === s))
    .filter(Boolean);

  if (!tools.length) return null;

  const blog = <BlogStrip initialPosts={blogPosts} first={blogFirst} />;

  return (
    <>
    {blogFirst && blog}
    <div className={styles.ymal}>
      <div className={styles.ymalHead}>
        <div>
          <h2 className={styles.ymalTitle}>Learn Coding Visually</h2>
          <p className={styles.ymalSub}>Learn to code with interactive, live-preview playgrounds — HTML, CSS, JavaScript, React &amp; more.</p>
        </div>
        <a href="/learn-to-code/" className={styles.ymalSeeAll}>See all -&gt;</a>
      </div>
      <div className={styles.ymalScroll}>
        {tools.map(tool => (
          <a key={tool.slug} href={`/${tool.slug}/`} className={styles.ymalCard}>
            <span className={styles.ymalIconWrap}>
              <img src={`/icons/${tool.slug}.svg`} alt="" width={20} height={20} className={styles.ymalIcon} />
            </span>
            <span className={styles.ymalBody}>
              <span className={styles.ymalName}>{tool.name}</span>
              <span className={styles.ymalDesc}>{tool.sub || tool.desc}</span>
            </span>
            <svg className={styles.ymalArrow} width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        ))}
      </div>
    </div>
    {/* Latest blog posts: right after this strip (after any `after` strips) unless blogFirst. */}
    {after}
    {!blogFirst && blog}
    </>
  );
}
