import { IMG, esc } from './meta.js';
import { postFields, DEMO_POSTS } from './parts.js';
import { NETS, netSvg } from './social-share.js';

/* Blog Post Page (the permalink / single post view): breadcrumb, category, H1, standfirst, author
   and date, cover image, an optional table of contents, the article as repeatable sections
   (heading, text, bullet list, pull quote, image), tags, share buttons, an author box, previous /
   next links and related posts. Writes BlogPosting + BreadcrumbList structured data. The table
   of contents is built by the `toc` behaviour and the share row by the `share` behaviour
   (copy link and the share links use the page the visitor is on). */

const plain = s => String(s ?? '').replace(/\*/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
const isoOk = s => /^\d{4}-\d{2}-\d{2}/.test(String(s || '').trim());

const SHARE = ['x', 'linkedin', 'facebook', 'whatsapp', 'copy'].map(k => {
  const n = NETS[k];
  if (n.action === 'copy') return `<button type="button" class="bp-sbtn" data-net="copy" style="--c:${n.color}" aria-label="Copy link">${netSvg(n.icon)}${netSvg(['s', '<path d="M20 6 9 17l-5-5"/>'], 'ss-ic ss-ic--done')}</button>`;
  return `<a class="bp-sbtn" data-net="${k}" data-share="${esc(n.url)}" href="#" target="_blank" rel="noopener noreferrer" style="--c:${n.color}" aria-label="Share on ${n.label} (opens in a new tab)">${netSvg(n.icon)}</a>`;
}).join('');

export default {
  id: 'blog-post',
  name: 'Blog Post Page (Single Article)',
  version: '1.0.0',
  category: 'blog',
  tags: ['blog', 'blog-post', 'single-post', 'article', 'permalink', 'table-of-contents', 'author-box', 'related-posts', 'share-buttons', 'light'],
  created: '2026-10-25',
  updated: '2026-10-25',
  seoTitle: 'Blog Post Template — Free Single Article Page HTML & CSS',
  seoDescription: 'Free blog post template: breadcrumb, headline, author, cover image, table of contents, sections, share buttons, author box, related posts and schema markup.',
  description: 'The page a single blog post lives on: a breadcrumb, category, headline and standfirst, the author with date and read time, a cover image, an optional table of contents, then the article as sections with headings, text, bullet lists, pull quotes and images. Below it come tags, share buttons, an author box, previous and next links and related posts. It writes BlogPosting and breadcrumb structured data for search engines.',
  bestFor: ['Blog post and article pages (the permalink view)', 'News, guides and tutorials with a table of contents', 'Company blogs, magazines and personal blogs'],
  behaviors: ['toc', 'share'],
  schema: state => {
    const f = state.fields || {};
    const title = plain(f.title);
    if (!title) return null;
    const canon = String(f.canonicalUrl || '').trim();
    const abs = u => { const v = String(u || '').trim(); if (!v) return ''; try { return canon ? new URL(v, canon).href : (/^https?:/.test(v) ? v : ''); } catch { return /^https?:/.test(v) ? v : ''; } };
    const secs = Array.isArray(state.lists?.sections) ? state.lists.sections : [];
    const words = secs.map(s => `${plain(s.title)} ${plain(s.text)} ${plain(s.points)} ${plain(s.quote)}`).join(' ').split(/\s+/).filter(Boolean).length;
    const tags = String(f.tags || '').split(/\r?\n/).map(t => t.trim()).filter(Boolean);
    const post = {
      '@type': 'BlogPosting',
      headline: title,
      ...(plain(f.excerpt) && { description: plain(f.excerpt) }),
      ...(abs(f.cover) && { image: abs(f.cover) }),
      ...(isoOk(f.dateIso) && { datePublished: String(f.dateIso).trim(), dateModified: String(isoOk(f.modifiedIso) ? f.modifiedIso : f.dateIso).trim() }),
      ...(plain(f.authorName) && { author: { '@type': 'Person', name: plain(f.authorName), ...(abs(f.authorUrl) && { url: abs(f.authorUrl) }) } }),
      ...(plain(f.category) && { articleSection: plain(f.category) }),
      ...(tags.length && { keywords: tags.join(', ') }),
      ...(words && { wordCount: words }),
      ...(canon && { url: canon, mainEntityOfPage: { '@type': 'WebPage', '@id': canon } }),
    };
    const graph = [post];
    if (state.toggles?.showCrumbs !== false && canon) {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: [[f.crumbHome, f.crumbHomeUrl], [f.crumbBlog, f.crumbBlogUrl], [f.crumbCurrent || title, canon]].filter(([n]) => plain(n)).map(([n, u], i) => ({ '@type': 'ListItem', position: i + 1, name: plain(n), item: abs(u) })).filter(x => x.item),
      });
    }
    return { '@context': 'https://schema.org', '@graph': graph };
  },

  groups: [
    { id: 'crumbs', label: 'Breadcrumb', toggle: 'showCrumbs' },
    { id: 'header', label: 'Headline & author' },
    { id: 'cover', label: 'Cover image', toggle: 'showCover' },
    { id: 'toc', label: 'Table of contents', toggle: 'showToc' },
    { id: 'body', label: 'Article sections' },
    { id: 'extras', label: 'Tags & share', toggle: 'showShare' },
    { id: 'abox', label: 'Author box', toggle: 'showAuthorBox' },
    { id: 'pn', label: 'Previous & next', toggle: 'showPrevNext' },
    { id: 'related', label: 'Related posts', toggle: 'showRelated' },
  ],
  fields: [
    { key: 'crumbHome', group: 'crumbs', label: 'Home label', type: 'text', value: 'Home' },
    { key: 'crumbHomeUrl', group: 'crumbs', label: 'Home link', type: 'url', value: '/' },
    { key: 'crumbBlog', group: 'crumbs', label: 'Blog label', type: 'text', value: 'Blog' },
    { key: 'crumbBlogUrl', group: 'crumbs', label: 'Blog link', type: 'url', value: '/blog/' },
    { key: 'crumbCurrent', group: 'crumbs', label: 'This post (short title)', type: 'text', value: 'How we cut page load time in half' },

    { key: 'category', group: 'header', label: 'Category', type: 'text', value: 'Engineering' },
    { key: 'categoryUrl', group: 'header', label: 'Category link', type: 'url', value: '/blog/category/engineering/' },
    { key: 'title', group: 'header', label: 'Headline (H1)', type: 'textarea', value: 'How we cut page load time in *half*' },
    { key: 'excerpt', group: 'header', label: 'Standfirst (optional)', type: 'textarea', value: 'Lazy hydration, smarter caching and one surprising database index: the full story of our performance sprint, with the numbers.' },
    { key: 'authorName', group: 'header', label: 'Author name', type: 'text', value: 'Maya Chen' },
    { key: 'authorRole', group: 'header', label: 'Author role (optional)', type: 'text', value: 'Staff Engineer' },
    { key: 'authorUrl', group: 'header', label: 'Author link', type: 'url', value: '/about/' },
    { key: 'authorAvatar', group: 'header', label: 'Author photo (optional)', type: 'image', value: IMG('avatar-3.jpg'), upload: { name: 'author', maxW: 200 } },
    { key: 'authorAvatarAlt', group: 'header', label: 'Author photo alt text', type: 'text', value: 'Maya Chen' },
    { key: 'date', group: 'header', label: 'Date (as shown)', type: 'text', value: 'October 14, 2026' },
    { key: 'dateIso', group: 'header', label: 'Date for search engines (YYYY-MM-DD)', type: 'text', value: '2026-10-14', hint: 'Used for the structured data and the time element.' },
    { key: 'modifiedIso', group: 'header', label: 'Last updated (YYYY-MM-DD, optional)', type: 'text', value: '' },
    { key: 'readTime', group: 'header', label: 'Read time (optional)', type: 'text', value: '8 min read' },
    { key: 'canonicalUrl', group: 'header', label: 'Address of this post (for search engines)', type: 'url', value: '', hint: 'The full web address of the page. It lets the structured data include the post and breadcrumb addresses.' },

    { key: 'cover', group: 'cover', label: 'Cover image', type: 'image', value: IMG('blog-4.jpg'), hint: 'About 1600×900 px.', upload: { name: 'post-cover', maxW: 1800 } },
    { key: 'coverAlt', group: 'cover', label: 'Alt text', type: 'text', value: 'A fast loading chart on a laptop' },
    { key: 'coverCaption', group: 'cover', label: 'Caption (optional)', type: 'text', value: '' },

    { key: 'tocHeading', group: 'toc', label: 'Heading', type: 'text', value: 'In this article' },

    { key: 'tags', group: 'extras', label: 'Tags (one per line)', type: 'lines', value: 'Performance\nCaching\nDatabases' },
    { key: 'shareLabel', group: 'extras', label: 'Share label', type: 'text', value: 'Share this post' },

    { key: 'aboutLabel', group: 'abox', label: 'Label', type: 'text', value: 'Written by' },
    { key: 'authorBio', group: 'abox', label: 'Short bio', type: 'textarea', value: 'Maya leads performance work at Acme. She writes about caching, databases and making the web feel fast.' },

    { key: 'prevLabel', group: 'pn', label: 'Previous label', type: 'text', value: 'Previous post' },
    { key: 'prevTitle', group: 'pn', label: 'Previous post title (optional)', type: 'text', value: 'What four-day sprints taught us' },
    { key: 'prevUrl', group: 'pn', label: 'Previous post link', type: 'url', value: '/blog/four-day-sprints/' },
    { key: 'nextLabel', group: 'pn', label: 'Next label', type: 'text', value: 'Next post' },
    { key: 'nextTitle', group: 'pn', label: 'Next post title (optional)', type: 'text', value: 'Introducing live reports' },
    { key: 'nextUrl', group: 'pn', label: 'Next post link', type: 'url', value: '/blog/live-reports/' },

    { key: 'relatedHeading', group: 'related', label: 'Heading', type: 'text', value: 'Keep reading' },
  ],
  lists: [
    {
      key: 'sections', group: 'body', label: 'Sections', itemLabel: 'Section', titleKey: 'title', min: 1, max: 24,
      fields: [
        { key: 'title', label: 'Section heading (H2)', type: 'text', value: 'Section heading' },
        { key: 'text', label: 'Text', type: 'textarea', value: '', hint: 'Leave a blank line between paragraphs. Select text to make it bold or add emphasis.' },
        { key: 'points', label: 'Bullet list (one per line, optional)', type: 'lines', value: '' },
        { key: 'quote', label: 'Pull quote (optional)', type: 'textarea', value: '' },
        { key: 'image', label: 'Image (optional)', type: 'image', value: '', hint: 'About 1400×800 px.', upload: { name: 'post-image', maxW: 1600 } },
        { key: 'imageAlt', label: 'Image alt text', type: 'text', value: '' },
        { key: 'caption', label: 'Image caption (optional)', type: 'text', value: '' },
      ],
      value: [
        { title: 'Where the time was going', text: 'Before changing anything, we measured. A week of real-user data showed that the slowest pages were not slow because of the server: the browser spent most of its time running JavaScript that the page did not need yet.\n\nThat changed our plan. Instead of buying a bigger server, we set out to send less code and to send it later.', points: '', quote: '', image: '', imageAlt: '', caption: '' },
        { title: 'Hydrate only what is visible', text: 'Most of our pages are static text with a few interactive parts. We now load the code for each interactive part only when it scrolls into view, and the rest of the page stays plain HTML.', points: 'First visit JavaScript fell from 410 KB to 160 KB\nTime to interactive dropped by 38%\nNo change to how the pages look or behave', quote: '“The fastest code is the code you never send.”', image: '', imageAlt: '', caption: '' },
        { title: 'Cache what does not change', text: 'We put a cache in front of the pages that rarely change and gave every asset a long, versioned lifetime. Returning visitors now download almost nothing.\n\nWe also stopped caching things that looked cacheable but were not, such as personalised greetings, which had caused a few confusing bug reports.', points: '', quote: '', image: IMG('blog-1.jpg'), imageAlt: 'A chart of faster page loads', caption: 'Median load time, before and after the sprint.' },
        { title: 'The surprising database index', text: 'One query behind the dashboard scanned an entire table on every visit. A single composite index turned a 900 ms query into a 12 ms one, and it was the biggest single win of the whole project.', points: '', quote: '', image: '', imageAlt: '', caption: '' },
        { title: 'What we would do again', text: 'Measure first, change one thing at a time and write down the result. The sprint took three weeks and the numbers have held for six months, which is the part we are proudest of.', points: 'Start from real-user data, not guesses\nShip small changes and measure each one\nKeep a short log so the gains are not lost', quote: '', image: '', imageAlt: '', caption: '' },
      ],
    },
    { key: 'related', group: 'related', label: 'Related posts', itemLabel: 'Post', titleKey: 'title', min: 1, max: 6, fields: postFields(), value: DEMO_POSTS.slice(1, 4) },
  ],
  toggles: [
    { key: 'showCrumbs', label: 'Breadcrumb', value: true },
    { key: 'showCover', label: 'Cover image', value: true },
    { key: 'showToc', label: 'Table of contents', value: true },
    { key: 'showShare', label: 'Tags & share', value: true },
    { key: 'showAuthorBox', label: 'Author box', value: true },
    { key: 'showPrevNext', label: 'Previous & next', value: true },
    { key: 'showRelated', label: 'Related posts', value: true },
  ],
  theme: { brand: '#4f46e5', brandText: '#ffffff', bg: '#ffffff', surface: '#f5f6fb', text: '#0f172a', muted: '#5b6678', radius: '16', maxWidth: '960' },
  fonts: { heading: 'jakarta', body: 'inter' },

  html: `<article class="st-wrap bp">
  <nav class="bp-crumbs" data-show="showCrumbs" aria-label="Breadcrumb">
    <ol>
      <li><a data-href="crumbHomeUrl"><span data-edit="crumbHome"></span></a></li>
      <li><a data-href="crumbBlogUrl"><span data-edit="crumbBlog"></span></a></li>
      <li aria-current="page"><span data-edit="crumbCurrent"></span></li>
    </ol>
  </nav>
  <header class="bp-head">
    <a class="bp-cat" data-show-if="category" data-href="categoryUrl" data-anim="item"><span data-edit="category"></span></a>
    <h1 class="bp-title" data-anim="item" data-anim-text data-edit="title"></h1>
    <p class="bp-excerpt" data-show-if="excerpt" data-anim="item" data-edit="excerpt"></p>
    <div class="bp-meta" data-anim="item">
      <a class="bp-author" data-href="authorUrl">
        <img data-image="authorAvatar" data-optional alt="" width="96" height="96" loading="lazy">
        <span class="bp-author-text"><span class="bp-author-name" data-edit="authorName"></span><span class="bp-author-role" data-show-if="authorRole" data-edit="authorRole"></span></span>
      </a>
      <p class="bp-facts"><time data-set="datetime:dateIso"><span data-edit="date"></span></time><span class="bp-sep" data-show-if="readTime" aria-hidden="true">·</span><span data-edit="readTime"></span></p>
    </div>
  </header>
  <figure class="bp-cover" data-show="showCover" data-anim="media">
    <img data-image="cover" alt="" width="1600" height="900">
    <figcaption data-show-if="coverCaption" data-edit="coverCaption"></figcaption>
  </figure>
  <div class="bp-body">
    <aside class="bp-toc" data-show="showToc" data-toc aria-label="Table of contents" hidden>
      <p class="bp-toc-title" data-edit="tocHeading"></p>
      <ol class="bp-toc-list" data-toc-list></ol>
    </aside>
    <div class="bp-sections" data-toc-source data-list="sections">
      <section class="bp-sec">
        <h2 class="bp-h2" data-edit="title"></h2>
        <p class="bp-text" data-show-if="text" data-edit="text"></p>
        <ul class="bp-points" data-lines="points"></ul>
        <blockquote class="bp-quote" data-show-if="quote"><p data-edit="quote"></p></blockquote>
        <figure class="bp-fig"><img data-image="image" data-optional alt="" width="1400" height="800" loading="lazy"><figcaption data-show-if="caption" data-edit="caption"></figcaption></figure>
      </section>
    </div>
    <div class="bp-after" data-show="showShare">
      <ul class="bp-tags" data-show-if="tags" data-lines="tags"></ul>
      <div class="bp-share" data-ss data-copied="Link copied">
        <p class="bp-share-label" data-edit="shareLabel"></p>
        <div class="bp-share-btns">${SHARE}</div>
        <span class="ss-live" role="status" aria-live="polite"></span>
      </div>
    </div>
    <aside class="bp-abox" data-show="showAuthorBox">
      <img data-image="authorAvatar" data-optional alt="" width="144" height="144" loading="lazy">
      <div>
        <p class="bp-abox-label" data-edit="aboutLabel"></p>
        <h2 class="bp-abox-name"><a data-href="authorUrl"><span data-edit="authorName"></span></a></h2>
        <p class="bp-abox-bio" data-edit="authorBio"></p>
      </div>
    </aside>
    <nav class="bp-pn" data-show="showPrevNext" aria-label="More posts">
      <a class="bp-pn-link bp-pn-prev" data-show-if="prevTitle" data-href="prevUrl"><span class="bp-pn-label"><span aria-hidden="true">←</span> <span data-edit="prevLabel"></span></span><span class="bp-pn-title" data-edit="prevTitle"></span></a>
      <a class="bp-pn-link bp-pn-next" data-show-if="nextTitle" data-href="nextUrl"><span class="bp-pn-label"><span data-edit="nextLabel"></span> <span aria-hidden="true">→</span></span><span class="bp-pn-title" data-edit="nextTitle"></span></a>
    </nav>
  </div>
  <section class="bp-related" data-show="showRelated">
    <h2 class="bp-rel-h" data-edit="relatedHeading"></h2>
    <ul class="bp-rgrid" data-list="related">
      <li class="bp-rcard">
        <a class="bp-rcover" data-href="url" tabindex="-1" aria-hidden="true"><img data-image="image" alt="" width="1200" height="750" loading="lazy"></a>
        <p class="bp-rmeta"><span class="bp-rcat" data-show-if="category" data-edit="category"></span><span data-edit="date"></span></p>
        <h3 class="bp-rtitle"><a data-href="url"><span data-edit="title"></span></a></h3>
      </li>
    </ul>
  </section>
</article>`,
  css: `.st-blog-post{padding:clamp(40px,6cqi,88px) 0}
.bp{max-width:calc(var(--st-max) * 1px)}
.bp-crumbs{margin-bottom:clamp(20px,3cqi,32px);font-size:14px;color:var(--st-muted)}
.bp-crumbs ol{list-style:none;display:flex;flex-wrap:wrap;gap:4px 8px}
.bp-crumbs li+li::before{content:"/";margin-right:8px;opacity:.5}
.bp-crumbs a{color:inherit;text-decoration:none}
.bp-crumbs a:hover{color:var(--st-brand);text-decoration:underline}
.bp-crumbs [aria-current]{color:var(--st-text);font-weight:600}
.bp-head{display:flex;flex-direction:column;align-items:flex-start;gap:16px;max-width:760px;margin:0 auto clamp(28px,4cqi,48px)}
.bp-cat{padding:4px 12px;border-radius:999px;background:color-mix(in srgb,var(--st-brand) 11%,transparent);color:var(--st-brand);font-size:13px;font-weight:800;letter-spacing:.04em;text-transform:uppercase;text-decoration:none}
.bp-title{font-size:clamp(34px,3.6cqi + 14px,58px);line-height:1.06}
.bp-excerpt{color:var(--st-muted);font-size:clamp(18px,1cqi + 13px,21px);line-height:1.6}
.bp-meta{display:flex;align-items:center;flex-wrap:wrap;gap:14px 28px;margin-top:6px}
.bp-author{display:flex;align-items:center;gap:12px;color:inherit;text-decoration:none}
.bp-author img{width:48px;height:48px;border-radius:50%;object-fit:cover}
.bp-author-text{display:flex;flex-direction:column;line-height:1.3}
.bp-author-name{font-weight:700}
.bp-author-role{font-size:14px;color:var(--st-muted)}
.bp-facts{display:flex;flex-wrap:wrap;gap:6px;color:var(--st-muted);font-size:14.5px}
.bp-cover{margin:0 auto clamp(32px,4.4cqi,56px);max-width:960px}
.bp-cover img{width:100%;height:auto;aspect-ratio:16/9;object-fit:cover;border-radius:calc(var(--st-radius) * 1.3px);background:var(--st-surface)}
.bp-cover figcaption{margin-top:10px;text-align:center;font-size:14px;color:var(--st-muted)}
.bp-body{max-width:720px;margin:0 auto}
.bp-toc{margin-bottom:clamp(28px,3.4cqi,40px);padding:20px 24px;border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface)}
.bp-toc[hidden]{display:none}
.bp-toc-title{margin-bottom:10px;font:800 13px/1 var(--st-font-body);letter-spacing:.08em;text-transform:uppercase;color:var(--st-muted)}
.bp-toc-list{list-style:none;display:flex;flex-direction:column;gap:2px;counter-reset:bp}
.bp-toc-list li{counter-increment:bp}
.bp-toc-list a{display:block;padding:5px 0;color:var(--st-text);font-size:15.5px;font-weight:600;text-decoration:none}
.bp-toc-list a::before{content:counter(bp) ". ";color:var(--st-brand);font-variant-numeric:tabular-nums}
.bp-toc-list a:hover,.bp-toc-list a.is-current{color:var(--st-brand)}
.bp-sec{scroll-margin-top:24px;margin-bottom:clamp(28px,3.4cqi,44px)}
.bp-h2{margin-bottom:14px;font-size:clamp(25px,1.6cqi + 16px,34px);letter-spacing:-.02em}
.bp-text{color:color-mix(in srgb,var(--st-text) 86%,transparent);font-size:clamp(17px,.5cqi + 15px,19px);line-height:1.8}
.bp-text:empty{display:none}
.bp-points{list-style:none;display:flex;flex-direction:column;gap:10px;margin:18px 0 0}
.bp-points:empty{display:none}
.bp-points li{position:relative;padding-left:26px;font-size:clamp(16.5px,.4cqi + 15px,18px);line-height:1.6}
.bp-points li::before{content:"";position:absolute;left:4px;top:.7em;width:8px;height:8px;border-radius:50%;background:var(--st-brand)}
.bp-quote{margin:26px 0;padding:6px 0 6px 22px;border-left:4px solid var(--st-brand);font:700 clamp(20px,1.2cqi + 14px,26px)/1.4 var(--st-font-heading);letter-spacing:-.01em}
.bp-fig{margin:26px 0 0}
.bp-fig:not(:has(img)){display:none}
.bp-fig img{width:100%;height:auto;border-radius:calc(var(--st-radius) * 1px)}
.bp-fig figcaption{margin-top:8px;font-size:14px;color:var(--st-muted);text-align:center}
.bp-after{display:flex;flex-direction:column;gap:20px;margin:clamp(32px,4cqi,52px) 0;padding:22px 0;border-block:1px solid color-mix(in srgb,var(--st-text) 10%,transparent)}
.bp-tags{list-style:none;display:flex;flex-wrap:wrap;gap:8px}
.bp-tags li{padding:5px 12px;border-radius:999px;background:var(--st-surface);font-size:13.5px;font-weight:600}
.bp-share{display:flex;align-items:center;flex-wrap:wrap;gap:12px}
.bp-share-label{font-size:14.5px;font-weight:700}
.bp-share-btns{display:flex;gap:8px}
.bp-sbtn{position:relative;display:grid;place-items:center;width:40px;height:40px;border:0;border-radius:50%;background:var(--c,var(--st-brand));color:#fff;cursor:pointer;transition:transform .2s ease,filter .2s ease}
.bp-sbtn:hover{transform:translateY(-2px);filter:brightness(1.1)}
.bp-sbtn:focus-visible{outline:3px solid var(--st-text);outline-offset:2px}
.bp-sbtn .ss-ic{display:block;width:18px;height:18px}
.bp-sbtn .ss-ic--done{display:none}
.bp-sbtn.is-done .ss-ic:not(.ss-ic--done){display:none}
.bp-sbtn.is-done .ss-ic--done{display:block}
.ss-live{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap}
.bp-abox{display:flex;gap:20px;align-items:flex-start;padding:24px;border-radius:calc(var(--st-radius) * 1.2px);background:var(--st-surface)}
.bp-abox img{flex:none;width:72px;height:72px;border-radius:50%;object-fit:cover}
.bp-abox-label{font-size:12.5px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:var(--st-brand)}
.bp-abox-name{margin:2px 0 6px;font-size:20px}
.bp-abox-name a{color:inherit;text-decoration:none}
.bp-abox-name a:hover{text-decoration:underline}
.bp-abox-bio{color:var(--st-muted);font-size:15.5px}
.bp-pn{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:28px}
.bp-pn:not(:has(.bp-pn-link)){display:none}
.bp-pn-link{display:flex;flex-direction:column;gap:6px;padding:18px 20px;border:1px solid color-mix(in srgb,var(--st-text) 12%,transparent);border-radius:calc(var(--st-radius) * 1px);color:inherit;text-decoration:none;transition:border-color .2s ease,transform .2s ease}
.bp-pn-link:hover{border-color:var(--st-brand);transform:translateY(-2px)}
.bp-pn-next{text-align:right;grid-column:2}
.bp-pn-prev:only-child{grid-column:1}
.bp-pn-label{font-size:13px;font-weight:700;color:var(--st-muted)}
.bp-pn-title{font-size:17px;font-weight:700;line-height:1.35}
.bp-related{margin-top:clamp(48px,6cqi,88px)}
.bp-rel-h{margin-bottom:22px;font-size:clamp(24px,1.6cqi + 14px,32px)}
.bp-rgrid{list-style:none;display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(18px,2.4cqi,28px)}
.bp-rcover{display:block;overflow:hidden;margin-bottom:12px;border-radius:calc(var(--st-radius) * 1px);background:var(--st-surface);aspect-ratio:16/10}
.bp-rcover img{width:100%;height:100%;object-fit:cover;transition:transform .5s ease}
.bp-rcard:hover .bp-rcover img{transform:scale(1.05)}
.bp-rmeta{display:flex;align-items:center;gap:8px;margin-bottom:6px;font-size:13px;color:var(--st-muted)}
.bp-rcat{color:var(--st-brand);font-weight:800}
.bp-rtitle{font-size:18px;line-height:1.3}
.bp-rtitle a{color:inherit;text-decoration:none}
.bp-rtitle a:hover{text-decoration:underline}
@container st (max-width:760px){.bp-rgrid{grid-template-columns:1fr 1fr}.bp-pn{grid-template-columns:1fr}.bp-pn-next{grid-column:1;text-align:left}}
@container st (max-width:520px){.bp-rgrid{grid-template-columns:1fr}.bp-abox{flex-direction:column}}`,
};
