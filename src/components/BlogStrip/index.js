'use client';

import { useEffect, useState } from 'react';
import rs from '@/components/UiSnippetsTool/RelatedCarousel.module.css';
import seo from '@/components/SeoSection/styles.module.css';
import { fetchLatestBlogPosts, BLOG_URL } from '@/lib/blog-feed';

// "From the blog" strip, styled like the Related Snippets strip. The posts load in the
// browser after the page is up, so they never block rendering. The live WordPress REST API
// comes first (newest posts); if that returns nothing, the build-time copy at
// /blog-posts.json (same origin) fills in. The strip stays out of the page until there is
// something to show. One load per page is shared through a module-level promise, and an
// empty result is not cached, so the next page tries again.
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
export default function BlogStrip({ max = 6, initialPosts = null, first = false }) {
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

  // Always rendered inside AdSlot's .relatedFull, which already pads the sides, so drop
  // .section's own side padding or the strip sits indented from the strips above it.
  return (
    <div className={rs.section} style={{ paddingLeft: 0, paddingRight: 0, ...(first && { marginTop: 0 }) }}>
      <div className={rs.header}>
        <h2 className={rs.title}>Latest from the Blog</h2>
        <span className={rs.headCount}>front-end tips, tutorials and live demos</span>
        <a href={BLOG_URL} className={seo.ymalSeeAll} style={{ marginLeft: 'auto' }}>See all -&gt;</a>
      </div>
      <div className={rs.track}>
        {posts.slice(0, max).map(post => (
          <a key={post.href} href={post.href} className={rs.card} title={post.title}>
            {post.thumb
              ? <img className={rs.thumb} src={post.thumb} alt="" loading="lazy" />
              : <div className={rs.thumb} aria-hidden="true" />}
            <h3 className={rs.cardTitle}>{post.title}</h3>
          </a>
        ))}
      </div>
    </div>
  );
}
