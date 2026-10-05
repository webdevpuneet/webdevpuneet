'use client';

import { useEffect, useState } from 'react';
import rs from '@/components/UiSnippetsTool/RelatedCarousel.module.css';
import seo from '@/components/SeoSection/styles.module.css';
import { fetchLatestBlogPosts, BLOG_URL } from '@/lib/blog-feed';

// "From the blog" strip, styled like the Related Snippets strip. The posts load in the
// browser after the page is up (WordPress REST API), so they never block rendering; the
// strip stays out of the page until there is something to show, and a blog outage just
// leaves it out. One fetch per page load is shared through a module-level promise.
let postsPromise = null;

export default function BlogStrip({ max = 6 }) {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    let cancelled = false;
    postsPromise = postsPromise || fetchLatestBlogPosts(max);
    postsPromise.then(list => { if (!cancelled) setPosts(list); });
    return () => { cancelled = true; };
  }, [max]);

  if (!posts || posts.length === 0) return null;

  // Always rendered inside AdSlot's .relatedFull, which already pads the sides, so drop
  // .section's own side padding or the strip sits indented from the strips above it.
  return (
    <div className={rs.section} style={{ paddingLeft: 0, paddingRight: 0 }}>
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
