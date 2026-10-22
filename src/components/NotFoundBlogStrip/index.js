'use client';

import { useEffect, useState } from 'react';
import { fetchLatestBlogPosts, BLOG_URL } from '@/lib/blog-feed';
// Same look as the Latest UI Snippets strip above it on the 404 page
import s from '../HeroSnippetPreview/styles.module.css';

// One row of the latest blog posts with their featured images. Posts load in the browser
// (the 404 page is a client component); nothing is drawn if the blog can't be reached.
export default function NotFoundBlogStrip({ count = 4, columns = 4 }) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    let live = true;
    fetchLatestBlogPosts(count).then(list => { if (live) setPosts(list); });
    return () => { live = false; };
  }, [count]);
  if (!posts.length) return null;

  return (
    <div className={s.wrap} style={{ '--cols': columns, marginTop: 28, marginBottom: 36 }}>
      <div className={s.head}>
        <div className={s.headLeft}>
          <span className={s.label}>Latest From the Blog</span>
          <span className={s.sub}>Practical front-end tutorials with live, forkable demos</span>
        </div>
        <div className={s.headRight}>
          <a href={BLOG_URL} className={s.seeAll}>See all →</a>
        </div>
      </div>
      <div className={s.grid}>
        {posts.map(post => (
          <a key={post.href} href={post.href} className={s.card}>
            <div className={s.thumb} style={{ height: 150 }}>
              {post.thumb && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={post.thumb} alt="" loading="lazy" style={{ objectFit: 'cover' }} />
              )}
            </div>
            <div className={s.footer}>
              <span className={s.title} style={{ whiteSpace: 'normal', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{post.title}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
