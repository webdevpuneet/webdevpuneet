'use client';

import { useEffect, useState } from 'react';
import { fetchLatestBlogPosts, BLOG_URL } from '@/lib/blog-feed';
import styles from './styles.module.css';

// "Latest from the Blog": the newest post as a featured card (title, excerpt, Read article)
// and the next three as a list. The posts load in the browser after the page is up, so they
// never block rendering. The live WordPress REST API comes first (newest posts); if that
// returns nothing, the build-time copy at /blog-posts.json (same origin) fills in. The strip
// stays out of the page until there is something to show. One load per page is shared
// through a module-level promise, and an empty result is not cached, so the next page tries
// again.
let postsPromise = null;

async function loadPosts(max) {
  const live = await fetchLatestBlogPosts(max);
  if (live.length) return live;
  try {
    const res = await fetch('/blog-posts.json');
    const saved = res.ok ? await res.json() : [];
    return Array.isArray(saved) ? saved.slice(0, max) : [];
  } catch {
    return [];
  }
}

// `initialPosts`: posts already fetched on the server (home), so no browser fetch is needed.
// `first`: leads its block (home), so the strip above already supplies the spacing.
// `max`: posts shown, featured one included.
export default function BlogStrip({ max = 4, initialPosts = null, first = false }) {
  const [posts, setPosts] = useState(initialPosts);

  useEffect(() => {
    if (initialPosts) return;
    let cancelled = false;
    postsPromise = postsPromise || loadPosts(max);
    postsPromise.then(list => {
      if (!list.length) postsPromise = null;   // nothing came back: let the next page retry
      if (!cancelled) setPosts(list);
    });
    return () => { cancelled = true; };
  }, [max, initialPosts]);

  if (!posts || posts.length === 0) return null;

  const [featured, ...rest] = posts.slice(0, max);

  return (
    <div className={`${styles.section} ${first ? styles.first : ''}`}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Latest from the Blog</h2>
          <p className={styles.sub}>Practical front-end tips, tutorials &amp; live demos</p>
        </div>
        <a href={BLOG_URL} className={styles.seeAll}>See all &rarr;</a>
      </div>
      <div className={styles.card}>
        <a href={featured.href} className={styles.featured}>
          <span className={styles.badge}>FEATURED</span>
          <h3 className={styles.featTitle}>{featured.title}</h3>
          {featured.excerpt && <p className={styles.excerpt}>{featured.excerpt}</p>}
          <span className={styles.read}>Read article &rarr;</span>
        </a>
        {rest.length > 0 && (
          <div className={styles.list}>
            {rest.map(post => (
              <a key={post.href} href={post.href} className={styles.row}>
                <span>{post.title}</span>
                <svg className={styles.chev} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
