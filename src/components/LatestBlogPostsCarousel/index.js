'use client';

import { useEffect, useRef, useState } from 'react';
import cs from './styles.module.css';

const PAGE_SIZE = 5;
const MAX_POSTS = 10;
const BLOG_URL = 'https://www.webdevpuneet.com/';
const BLOG_FEED_BASE = 'https://www.webdevpuneet.com/feeds/posts/default';

let postsCache = null;
let postsPromise = null;

// Blogger's JSON feed sends no CORS headers, but does support the classic
// JSONP form (alt=json-in-script) -- loading it as a <script> tag sidesteps
// CORS entirely and works from a fully static export, no API route needed.
// Same technique the sidebar's own Blog tab already uses. Module-level cache
// means this only ever fetches once per page session, however many times
// AdSlot (and this carousel with it) mounts across the page.
function fetchLatestPosts() {
  if (postsCache) return Promise.resolve(postsCache);
  if (postsPromise) return postsPromise;
  postsPromise = new Promise((resolve) => {
    const cbName = '__wdpLatestBlogCb' + Math.random().toString(36).slice(2);
    const cleanup = () => { delete window[cbName]; script.remove(); clearTimeout(timer); };
    const timer = setTimeout(() => { cleanup(); resolve([]); }, 8000);
    window[cbName] = (data) => {
      cleanup();
      try {
        const entries = data?.feed?.entry || [];
        const posts = entries
          .map((e) => {
            const rawThumb = e.media$thumbnail?.url || '';
            // Blogger's feed thumbnail is a cropped 72x72 square ("/s72-c/")
            // -- swap in a wide, uncropped size so the real header image
            // shows at its own aspect ratio instead of a tiny square crop.
            const thumb = rawThumb ? rawThumb.replace(/\/s\d+(-c)?\//, '/s640/') : null;
            return {
              title: e.title?.$t?.trim() || '',
              href: (e.link || []).find((l) => l.rel === 'alternate')?.href || '',
              thumb,
            };
          })
          .filter((p) => p.title && p.href);
        postsCache = posts;
        resolve(posts);
      } catch {
        resolve([]);
      }
    };
    const script = document.createElement('script');
    script.src = `${BLOG_FEED_BASE}?alt=json-in-script&max-results=${MAX_POSTS}&callback=${cbName}`;
    script.onerror = () => { cleanup(); resolve([]); };
    document.body.appendChild(script);
  });
  return postsPromise;
}

function PostCard({ post }) {
  return (
    <a href={post.href} target="_blank" rel="noopener noreferrer" className={cs.card}>
      <div className={cs.thumbWrap}>
        {post.thumb ? (
          <img src={post.thumb} alt="" className={cs.thumb} loading="lazy" />
        ) : (
          <div className={cs.thumbFallback}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            </svg>
          </div>
        )}
      </div>
      <h3 className={cs.name}>{post.title}</h3>
    </a>
  );
}

// Rendered from inside the shared <AdSlot>, so it appears after whatever
// "related" content each page already shows (Related Snippets, Related
// Tools, etc.) across the whole site -- one place to maintain instead of
// wiring it into every page individually.
//
// Genuinely lazy: nothing is fetched at all until this section actually
// scrolls into view (IntersectionObserver), not just deferred rendering --
// the blog feed request itself never fires on initial page load.
//
// Desktop: a fixed 5-at-a-time page with Prev/Next, matching RelatedCarousel.
// Mobile: no pagination -- the whole set is one horizontal-scroll strip.
export default function LatestBlogPostsCarousel() {
  const [visible, setVisible] = useState(false);
  const [posts, setPosts] = useState(postsCache);
  const [start, setStart] = useState(0);
  const rootRef = useRef(null);

  useEffect(() => {
    if (visible || !rootRef.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '200px 0px' }
    );
    io.observe(rootRef.current);
    return () => io.disconnect();
  }, [visible]);

  useEffect(() => {
    if (!visible || posts) return;
    let cancelled = false;
    fetchLatestPosts().then((p) => { if (!cancelled) setPosts(p); });
    return () => { cancelled = true; };
  }, [visible, posts]);

  if (posts && posts.length === 0) return null;

  const hasPosts = !!posts?.length;
  const hasPrev = start > 0;
  const hasNext = hasPosts && start + PAGE_SIZE < posts.length;
  const shown = hasPosts ? posts.slice(start, start + PAGE_SIZE) : [];
  const rangeEnd = hasPosts ? Math.min(start + PAGE_SIZE, posts.length) : 0;

  return (
    <div className={cs.section} ref={rootRef}>
      {hasPosts && (
        <>
          <div className={cs.header}>
            <div>
              <h2 className={cs.title}>Latest From the Blog</h2>
              <p className={cs.sub}>Fresh writeups from the blog.</p>
            </div>
            <a href={BLOG_URL} target="_blank" rel="noopener noreferrer" className={cs.seeAll}>See all -&gt;</a>
            <div className={cs.navBtns}>
              {posts.length > PAGE_SIZE && (
                <span className={cs.pageIndicator}>{start + 1}–{rangeEnd} of {posts.length}</span>
              )}
              <button
                type="button"
                className={cs.navBtn}
                onClick={() => setStart(s => Math.max(0, s - PAGE_SIZE))}
                disabled={!hasPrev}
                aria-label="See previous blog posts"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button
                type="button"
                className={cs.navBtn}
                onClick={() => setStart(s => (s + PAGE_SIZE < posts.length ? s + PAGE_SIZE : s))}
                disabled={!hasNext}
                aria-label="See more blog posts"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
          <div className={cs.track}>
            {shown.map(post => <PostCard key={post.href} post={post} />)}
          </div>
          <div className={cs.mobileScroll}>
            {posts.map(post => <PostCard key={post.href} post={post} />)}
          </div>
        </>
      )}
    </div>
  );
}
