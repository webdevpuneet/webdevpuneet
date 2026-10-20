import { postFields, DEMO_POSTS, blogSchema } from './parts.js';

export default {
  id: 'blog-cards',
  name: 'Blog Post Cards',
  version: '1.0.0',
  category: 'blog',
  tags: ['blog', 'articles', 'cards', 'grid', 'latest-posts', 'news', 'light'],
  created: '2026-10-20',
  updated: '2026-10-20',
  seoTitle: 'Blog Section Template — Free Latest Posts Card Grid HTML',
  seoDescription: 'Free blog section: a grid of post cards with cover images, categories, dates, read times, excerpts and authors, plus a view-all link and BlogPosting schema.',
  description: 'A “latest from the blog” section: a heading with a view-all link, then post cards with a cover image, category tag, date and read time, title, short excerpt and the author’s photo and name. Covers zoom gently on hover; the grid goes from three columns to one.',
  bestFor: ['Homepage “latest posts” blocks', 'Blog index and news pages', 'Resource and guide libraries'],
  schema: blogSchema('posts'),

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'items', label: 'Posts' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'Blog' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Latest from *the blog*' },
    { key: 'allLink', group: 'header', label: 'View-all link text (optional)', type: 'text', value: 'View all posts' },
    { key: 'allUrl', group: 'header', label: 'View-all link', type: 'url', value: '/blog/' },
  ],
  lists: [{ key: 'posts', group: 'items', label: 'Posts', itemLabel: 'Post', titleKey: 'title', min: 1, max: 9, fields: postFields(), value: DEMO_POSTS.slice(0, 3) }],
  toggles: [],
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#ffffff', surface: '#f5f6fb', text: '#0f172a', muted: '#64748b', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <div class="bc-top">
    <header class="st-head st-head--left bc-head">
      <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
      <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    </header>
    <a class="bc-all" data-anim="item" data-href="allUrl" data-show-if="allLink"><span data-edit="allLink"></span> <span aria-hidden="true">→</span></a>
  </div>
  <ul class="bc-grid" data-list="posts">
    <li class="bc-card" data-anim="item">
      <a class="bc-cover" data-href="url" tabindex="-1" aria-hidden="true"><img data-image="image" alt="" width="1200" height="750" loading="lazy"></a>
      <p class="bc-meta"><span class="bc-cat" data-show-if="category" data-edit="category"></span><span data-edit="date"></span><span class="bc-sep" data-show-if="readTime" aria-hidden="true">·</span><span data-edit="readTime"></span></p>
      <h3 class="bc-title"><a data-href="url"><span data-edit="title"></span></a></h3>
      <p class="bc-excerpt" data-edit="excerpt"></p>
      <p class="bc-author" data-show-if="author"><img data-image="avatar" data-optional alt="" width="64" height="64" loading="lazy"><span data-edit="author"></span></p>
    </li>
  </ul>
</div>`,
  css: `.st-blog-cards{padding:clamp(64px,8cqi,112px) 0}
.bc-top{display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:16px;margin-bottom:clamp(28px,3.4cqi,44px)}
.bc-head{margin:0}
.bc-all{color:var(--st-brand);font-weight:700;text-decoration:none;white-space:nowrap}
.bc-all:hover{text-decoration:underline}
.bc-grid{list-style:none;display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(20px,2.6cqi,32px)}
.bc-card{display:flex;flex-direction:column;gap:10px}
.bc-cover{display:block;overflow:hidden;margin-bottom:8px;border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);aspect-ratio:16/10}
.bc-cover img{width:100%;height:100%;object-fit:cover;transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.bc-card:hover .bc-cover img{transform:scale(1.06)}
.bc-meta{display:flex;align-items:center;flex-wrap:wrap;gap:8px;color:var(--st-muted);font-size:13.5px}
.bc-cat{padding:3px 10px;border-radius:999px;background:color-mix(in srgb,var(--st-brand) 11%,transparent);color:var(--st-brand);font-weight:700;font-size:12.5px}
.bc-title{font-size:20px;line-height:1.3;letter-spacing:-.015em}
.bc-title a{color:inherit;text-decoration:none;background:linear-gradient(currentColor,currentColor) 0 100%/0 2px no-repeat;transition:background-size .35s ease}
.bc-card:hover .bc-title a{background-size:100% 2px}
.bc-excerpt{color:var(--st-muted);font-size:15.5px}
.bc-author{display:flex;align-items:center;gap:10px;margin-top:6px;font-size:14.5px;font-weight:600}
.bc-author img{width:32px;height:32px;border-radius:50%;object-fit:cover}
@container st (max-width:960px){.bc-grid{grid-template-columns:repeat(2,1fr)}}
@container st (max-width:620px){.bc-grid{grid-template-columns:1fr}}`,
};
