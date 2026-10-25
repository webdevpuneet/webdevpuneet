import { IMG, esc } from './meta.js';
import { postFields, blogSchema } from './parts.js';

/* Blog Grid with Pagination: every post is in the page's HTML (so search engines and visitors
   without JavaScript see them all); with JavaScript the grid shows one page at a time with
   Previous / numbered / Next buttons, or a "Show more posts" button, and says which posts
   are showing. Settings are data attributes on [data-pager], written by `finalize`. The
   `paginate` behaviour (behaviors.js) does the paging. */

const pick = (v, allowed, d) => (allowed.includes(String(v)) ? String(v) : d);
const num = (v, d, min, max) => { const n = parseFloat(v); return Number.isFinite(n) ? Math.min(max, Math.max(min, Math.round(n))) : d; };
const av = n => IMG(`avatar-${n}.jpg`);
const P = (image, category, date, readTime, title, excerpt, author, avatar) => ({ image: IMG(image), category, date, readTime, title, excerpt, author, avatar: av(avatar), url: '/blog/' });

const POSTS = [
  P('blog-4.jpg', 'Engineering', 'Oct 14, 2026', '8 min read', 'How we cut page load time in half', 'Lazy hydration, smarter caching and one surprising database index: the full story of our performance sprint.', 'Maya Chen', 3),
  P('blog-6.jpg', 'Product', 'Oct 9, 2026', '5 min read', 'Introducing live reports', 'Dashboards that update as your team works, with no spreadsheets and no Friday status updates.', 'Noah Reyes', 5),
  P('blog-1.jpg', 'Culture', 'Oct 2, 2026', '6 min read', 'What four-day sprints taught us', 'A year of shorter weeks: what changed in our output, our planning and how the team feels.', 'Aisha Bello', 2),
  P('blog-2.jpg', 'Design', 'Sep 25, 2026', '4 min read', 'Designing calm interfaces', 'Fewer colours, more space and motion that explains: the principles behind our redesign.', 'Zara Ahmed', 4),
  P('blog-3.jpg', 'Guides', 'Sep 18, 2026', '7 min read', 'A beginner’s guide to roadmaps', 'How to plan a quarter without a 40-page document, and keep everyone pointing the same way.', 'Leo Martin', 1),
  P('blog-5.jpg', 'Engineering', 'Sep 11, 2026', '9 min read', 'Zero-downtime migrations in practice', 'The checklist we follow when changing a database that people are using right now.', 'Maya Chen', 3),
  P('blog-2.jpg', 'Product', 'Sep 4, 2026', '3 min read', 'Release notes: September', 'Faster search, bulk actions and a long list of small fixes you asked for.', 'Noah Reyes', 5),
  P('blog-4.jpg', 'Guides', 'Aug 28, 2026', '6 min read', 'Writing release notes people read', 'Short, specific and honest: a simple structure for updates that earn their place in the inbox.', 'Aisha Bello', 2),
  P('blog-1.jpg', 'Culture', 'Aug 21, 2026', '5 min read', 'Hiring for curiosity', 'What we ask in interviews, and why we stopped asking for years of experience with a tool.', 'Leo Martin', 1),
  P('blog-6.jpg', 'Design', 'Aug 14, 2026', '5 min read', 'A colour system that scales', 'Eight tokens, two modes and zero arguments: how we keep dozens of screens consistent.', 'Zara Ahmed', 4),
  P('blog-3.jpg', 'Engineering', 'Aug 7, 2026', '10 min read', 'Testing what matters', 'Fewer tests, better tests: the small set of checks that catches most of our real bugs.', 'Maya Chen', 3),
  P('blog-5.jpg', 'Product', 'Jul 31, 2026', '4 min read', 'Why we added a free plan', 'The thinking behind it, what it cost and what happened to sign-ups in the first month.', 'Noah Reyes', 5),
];

export default {
  id: 'blog-grid-pagination',
  name: 'Blog Grid with Pagination',
  version: '1.0.0',
  category: 'blog',
  tags: ['blog', 'articles', 'grid', 'pagination', 'blog-index', 'archive', 'load-more', 'posts', 'light'],
  created: '2026-10-25',
  updated: '2026-10-25',
  seoTitle: 'Blog Grid with Pagination — Free Blog Index Template HTML',
  seoDescription: 'Free blog index template: a grid of post cards with numbered pagination or a load more button, post counts, covers, categories, dates and BlogPosting schema.',
  description: 'A blog index page: a heading and intro, then a grid of post cards with cover, category, date, read time, title, excerpt and author. Every post is in the page for search engines; for visitors the grid shows one page at a time with Previous, numbered and Next buttons (or a “Show more posts” button) and a line saying which posts are showing. You choose how many posts per page and how many columns.',
  bestFor: ['Blog index and archive pages', 'News, guides and resource libraries', 'Any list of articles longer than a screen or two'],
  behaviors: ['paginate'],
  schema: blogSchema('posts'),
  finalize: (html, state) => {
    const f = state.fields || {};
    const attrs = [
      ['data-per', num(f.perPage, 6, 1, 24)],
      ['data-style', pick(f.pagerStyle, ['numbers', 'more'], 'numbers')],
      ['data-cols', pick(f.columns, ['2', '3', '4'], '3')],
      ['data-label-prev', String(f.prevLabel || 'Previous')],
      ['data-label-next', String(f.nextLabel || 'Next')],
      ['data-label-more', String(f.moreLabel || 'Show more posts')],
      ['data-label-status', String(f.statusText || 'Showing {from}–{to} of {total} posts')],
      ['data-label-nav', String(f.navLabel || 'Pagination')],
    ].map(([k, v]) => ` ${k}="${esc(v)}"`).join('');
    return html.replace('<div class="bg-pager" data-pager>', () => `<div class="bg-pager" data-pager${attrs}>`);
  },

  groups: [
    { id: 'header', label: 'Heading' },
    { id: 'pager', label: 'Pagination' },
    { id: 'items', label: 'Posts' },
  ],
  fields: [
    { key: 'eyebrow', group: 'header', label: 'Eyebrow (optional)', type: 'text', value: 'The blog' },
    { key: 'heading', group: 'header', label: 'Heading', type: 'textarea', value: 'Stories, guides and *updates*' },
    { key: 'lead', group: 'header', label: 'Intro (optional)', type: 'textarea', value: 'Notes from the team on building, designing and shipping better software.' },

    { key: 'perPage', group: 'pager', label: 'Posts per page', type: 'text', value: '6', hint: 'Between 1 and 24.' },
    { key: 'columns', group: 'pager', label: 'Columns', type: 'choice', options: [['2', 'Two'], ['3', 'Three'], ['4', 'Four']], value: '3', hint: 'Fewer columns on tablets and phones.' },
    { key: 'pagerStyle', group: 'pager', label: 'Style', type: 'choice', options: [['numbers', 'Numbered pages with Previous and Next'], ['more', 'A “Show more posts” button']], value: 'numbers' },
    { key: 'prevLabel', group: 'pager', label: 'Previous button text', type: 'text', value: 'Previous' },
    { key: 'nextLabel', group: 'pager', label: 'Next button text', type: 'text', value: 'Next' },
    { key: 'moreLabel', group: 'pager', label: 'Show-more button text', type: 'text', value: 'Show more posts' },
    { key: 'statusText', group: 'pager', label: 'Status line', type: 'text', value: 'Showing {from}–{to} of {total} posts', hint: 'Use {from}, {to} and {total}. Leave empty to hide it.' },
    { key: 'navLabel', group: 'pager', label: 'Navigation label (screen readers)', type: 'text', value: 'Pagination' },
  ],
  lists: [{ key: 'posts', group: 'items', label: 'Posts', itemLabel: 'Post', titleKey: 'title', min: 1, max: 48, fields: postFields(), value: POSTS }],
  toggles: [],
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#ffffff', surface: '#f5f6fb', text: '#0f172a', muted: '#64748b', radius: '16' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<div class="st-wrap">
  <header class="st-head st-head--left bg-head">
    <p class="st-eyebrow" data-anim="item" data-edit="eyebrow"></p>
    <h2 class="st-h2" data-anim="item" data-anim-text data-edit="heading"></h2>
    <p class="st-lead" data-anim="item" data-show-if="lead" data-edit="lead"></p>
  </header>
  <div class="bg-pager" data-pager>
    <ul class="bg-grid" data-pager-items data-list="posts">
      <li class="bg-card">
        <a class="bg-cover" data-href="url" tabindex="-1" aria-hidden="true"><img data-image="image" alt="" width="1200" height="750" loading="lazy"></a>
        <p class="bg-meta"><span class="bg-cat" data-show-if="category" data-edit="category"></span><span data-edit="date"></span><span class="bg-sep" data-show-if="readTime" aria-hidden="true">·</span><span data-edit="readTime"></span></p>
        <h3 class="bg-title"><a data-href="url"><span data-edit="title"></span></a></h3>
        <p class="bg-excerpt" data-edit="excerpt"></p>
        <p class="bg-author" data-show-if="author"><img data-image="avatar" data-optional alt="" width="64" height="64" loading="lazy"><span data-edit="author"></span></p>
      </li>
    </ul>
    <p class="bg-status" data-pager-status role="status" aria-live="polite"></p>
    <nav class="bg-nav" data-pager-nav hidden></nav>
  </div>
</div>`,
  css: `.st-blog-grid-pagination{padding:clamp(64px,8cqi,112px) 0}
.bg-head{margin-bottom:clamp(28px,3.4cqi,44px)}
.bg-grid{list-style:none;display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(22px,2.8cqi,36px) clamp(18px,2.4cqi,30px)}
.bg-pager[data-cols="2"] .bg-grid{grid-template-columns:repeat(2,1fr)}
.bg-pager[data-cols="4"] .bg-grid{grid-template-columns:repeat(4,1fr)}
.bg-card{display:flex;flex-direction:column;gap:10px}
.bg-card[hidden]{display:none}
.bg-cover{display:block;overflow:hidden;margin-bottom:6px;border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);aspect-ratio:16/10}
.bg-cover img{width:100%;height:100%;object-fit:cover;transition:transform .6s cubic-bezier(.2,.8,.2,1)}
.bg-card:hover .bg-cover img{transform:scale(1.06)}
.bg-meta{display:flex;align-items:center;flex-wrap:wrap;gap:8px;color:var(--st-muted);font-size:13.5px}
.bg-cat{padding:3px 10px;border-radius:999px;background:color-mix(in srgb,var(--st-brand) 11%,transparent);color:var(--st-brand);font-weight:700;font-size:12.5px}
.bg-title{font-size:19px;line-height:1.3;letter-spacing:-.015em}
.bg-title a{color:inherit;text-decoration:none;background:linear-gradient(currentColor,currentColor) 0 100%/0 2px no-repeat;transition:background-size .35s ease}
.bg-card:hover .bg-title a{background-size:100% 2px}
.bg-excerpt{color:var(--st-muted);font-size:15px}
.bg-author{display:flex;align-items:center;gap:10px;margin-top:4px;font-size:14px;font-weight:600}
.bg-author img{width:30px;height:30px;border-radius:50%;object-fit:cover}
.bg-status{margin-top:clamp(24px,3cqi,36px);text-align:center;font-size:14px;color:var(--st-muted)}
.bg-status:empty{display:none}
.bg-nav{display:flex;align-items:center;justify-content:center;flex-wrap:wrap;gap:8px;margin-top:14px}
.bg-nav[hidden]{display:none}
.bg-pbtn{min-width:42px;height:42px;padding:0 14px;border:1.5px solid color-mix(in srgb,var(--st-text) 16%,transparent);border-radius:calc(var(--st-radius) * .65px);background:var(--st-bg);color:var(--st-text);font:700 14.5px/1 var(--st-font-body);cursor:pointer;transition:border-color .2s ease,background .2s ease,color .2s ease}
.bg-pbtn:hover:not(:disabled){border-color:var(--st-brand);color:var(--st-brand)}
.bg-pbtn[aria-current="page"]{border-color:var(--st-brand);background:var(--st-brand);color:var(--st-btn-text)}
.bg-pbtn:disabled{opacity:.4;cursor:default}
.bg-pbtn:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 50%,transparent);outline-offset:2px}
.bg-gap{padding:0 4px;color:var(--st-muted)}
.bg-more{min-height:48px;padding:0 28px;border:2px solid var(--st-brand);border-radius:calc(var(--st-radius) * .7px);background:transparent;color:var(--st-brand);font:700 15.5px/1 var(--st-font-body);cursor:pointer}
.bg-more:hover{background:var(--st-brand);color:var(--st-btn-text)}
.bg-more:focus-visible{outline:3px solid color-mix(in srgb,var(--st-brand) 50%,transparent);outline-offset:2px}
@container st (max-width:1000px){.bg-pager[data-cols="4"] .bg-grid,.bg-pager .bg-grid{grid-template-columns:repeat(2,1fr)}}
@container st (max-width:620px){.bg-pager .bg-grid,.bg-pager[data-cols="2"] .bg-grid,.bg-pager[data-cols="4"] .bg-grid{grid-template-columns:1fr}.bg-pbtn{min-width:38px;height:38px;padding:0 10px}}`,
};
