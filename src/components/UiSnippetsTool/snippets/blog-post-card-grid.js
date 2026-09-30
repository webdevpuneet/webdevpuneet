const blogPostCardGrid = {
  id: 'blog-post-card-grid',
  title: 'Blog Post Card Grid',
  category: 'cards',
  html: `<div class="blog-grid">
  <article class="post-card">
    <div class="cover" style="background: linear-gradient(135deg, #6366f1, #8b5cf6);"></div>
    <div class="post-body">
      <span class="tag">Engineering</span>
      <h3>Why we rebuilt our design system from scratch</h3>
      <p>A look at the tradeoffs we made moving from a component library to tokens-first architecture.</p>
      <div class="post-meta">
        <div class="mini-avatar">RK</div>
        <span class="author">Rina Kobayashi</span>
        <span class="dot">&middot;</span>
        <span class="date">Aug 18</span>
      </div>
    </div>
  </article>
  <article class="post-card">
    <div class="cover" style="background: linear-gradient(135deg, #f97316, #f43f5e);"></div>
    <div class="post-body">
      <span class="tag">Product</span>
      <h3>Shipping faster without breaking trust</h3>
      <p>How our team balances release velocity with the reliability our customers expect from us.</p>
      <div class="post-meta">
        <div class="mini-avatar" style="background:#f97316">DL</div>
        <span class="author">David Lin</span>
        <span class="dot">&middot;</span>
        <span class="date">Aug 12</span>
      </div>
    </div>
  </article>
  <article class="post-card">
    <div class="cover" style="background: linear-gradient(135deg, #10b981, #06b6d4);"></div>
    <div class="post-body">
      <span class="tag">Design</span>
      <h3>The case for boring, consistent UI patterns</h3>
      <p>Novelty is overrated. Here's why we default to familiar interaction patterns whenever we can.</p>
      <div class="post-meta">
        <div class="mini-avatar" style="background:#10b981">AS</div>
        <span class="author">Anya Souza</span>
        <span class="dot">&middot;</span>
        <span class="date">Aug 5</span>
      </div>
    </div>
  </article>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 32px; margin: 0; display: flex; align-items: center; flex-direction: column; gap: 20px; }

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 24px;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.post-card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  overflow: hidden;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
  cursor: pointer;
}
.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 30px rgba(0,0,0,0.08);
}

.cover { height: 140px; width: 100%; }

.post-body { padding: 18px 20px 20px; }

.tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #6366f1;
  background: #eef2ff;
  padding: 3px 10px;
  border-radius: 999px;
  margin-bottom: 12px;
}

.post-card h3 {
  font-size: 16px;
  color: #1e293b;
  margin: 0 0 8px;
  line-height: 1.35;
}

.post-card p {
  font-size: 13px;
  color: #64748b;
  line-height: 1.55;
  margin: 0 0 16px;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mini-avatar {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #6366f1;
  color: #fff;
  font-size: 9.5px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.author { font-size: 12.5px; font-weight: 600; color: #1e293b; }
.dot { color: #cbd5e1; font-size: 12px; }
.date { font-size: 12px; color: #94a3b8; }`,
  js: `// This grid is fully static — no JavaScript required. If you're
// rendering posts from a CMS or API, map your data onto the same
// markup shape, e.g.:
//
// function renderPost(p) {
//   return \`<article class="post-card">
//     <div class="cover" style="background:\${p.coverGradient}"></div>
//     <div class="post-body">
//       <span class="tag">\${p.category}</span>
//       <h3>\${p.title}</h3>
//       <p>\${p.excerpt}</p>
//     </div>
//   </article>\`;
// }`,

  seo: {
    title: 'Blog Post Card Grid — Free HTML CSS Responsive Blog Preview Snippet',
    description: 'A responsive grid of blog post preview cards with gradient cover placeholders, category tags, excerpts, and author/date rows. Pure HTML and CSS.',
    about: {
      title: 'Blog Post Card Grid — HTML & CSS Blog Preview Cards',
      description: `A blog listing page or "latest posts" section needs cards that scan quickly: a visual anchor, a category, a headline, a short excerpt, and who wrote it and when. Getting the density and hierarchy of that combination right is most of what makes a blog grid feel professional rather than cluttered.

This snippet builds that card pattern in **plain HTML and CSS**, using gradient placeholders instead of real cover images so it works immediately with zero image assets.

**How the cover placeholders work**

Each \`.cover\` div is just a fixed-height block with an inline \`background: linear-gradient(...)\` — no image request, no loading state to manage, no broken-image fallback needed. Because each gradient is set independently per card, the grid still reads as visually varied even without photography. Swapping in a real image later means replacing the div with an \`<img>\` (or setting \`background-image\` to a photo URL) sized to the same fixed height with \`object-fit: cover\` or \`background-size: cover\`.

**How the layout hierarchy works**

Inside \`.post-body\`, the order is deliberate: the category \`.tag\` comes first as a small pill (helping readers instantly filter by topic while scanning), then the headline in a slightly larger, high-contrast \`<h3>\`, then a muted excerpt paragraph, and finally the \`.post-meta\` row combining a mini avatar, author name, a middle-dot separator, and the date — all in a smaller, lower-contrast type size since it's the least important information for someone deciding whether to click.

**How the responsive grid works**

Like other card grids in this pattern, \`grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))\` handles every screen width automatically — three columns on desktop, one or two on tablet, a single column on mobile — with zero media queries.

**The hover affordance**

Each \`.post-card\` has \`cursor: pointer\` and lifts with a shadow on \`:hover\`, signaling the entire card is clickable even before you wrap it in an anchor tag — a common real-world pattern is making the whole card a link while keeping the semantic \`<article>\` element for each post.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Blog Post Card Grid" in the sidebar Library tab to see three post cards with gradient covers laid out in a grid.' },
        { title: 'Resize the preview', text: 'Switch device previews to see the grid reflow from three columns down to one with no additional CSS.' },
        { title: 'Add a post', text: 'In the HTML panel, copy an existing <article class="post-card"> block and update its gradient, tag, title, excerpt, and meta row.' },
        { title: 'Swap in real cover images', text: 'Replace a .cover div\'s inline gradient with a background-image pointing at a real photo, or convert it to an <img> tag with object-fit: cover.' },
        { title: 'Make the whole card clickable', text: 'Wrap each .post-card in an anchor tag (or add an absolutely-positioned "stretched link" overlay) pointing at the full post URL.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for React, or "Tailwind" for React + Tailwind CSS.' },
      ],
    },
    features: [
      'Gradient cover placeholders need zero image assets and never show a broken-image icon',
      'Responsive grid via auto-fit and minmax reflows for any screen size with no media queries',
      'Deliberate content hierarchy: tag, then headline, then excerpt, then de-emphasized meta row',
      'Mini author avatar reuses the same initials-circle technique as a full team card grid',
      'Hover lift and shadow signal the whole card is clickable before you wire up a link',
      'Semantic <article> elements per post keep the markup meaningful for assistive tech and SEO',
      'Each card\'s gradient and avatar color set independently for visual variety across the grid',
      'Drop-in upgrade path from gradient placeholder to a real photo with no layout changes',
      'Works with any number of posts — the grid reflows automatically as more are added',
      'No framework, no image lazy-loading library, no build step required',
    ],
    useCases: [
      { icon: 'BLOG', title: 'Blog homepage and category listings', desc: 'Show a scannable grid of recent posts with clear visual hierarchy before readers commit to clicking into any one article.' },
      { icon: 'LEARN', title: 'Learn responsive card grid layout principles', desc: 'Study how consistent card structure, spacing, and type hierarchy combine to make a content grid feel organized rather than busy.' },
      { icon: 'FLOW', title: 'Prototype a content marketing site', desc: 'Drop this into a marketing or docs site prototype to represent a "latest from the blog" section before real content and imagery exist.' },
      { icon: 'DESIGN', title: 'Match your brand\'s color and type system', desc: 'Adjust the tag pill color, gradient palette, and heading font to fit your existing content site\'s design language.' },
      { icon: 'ACCESS', title: 'Keep post cards screen-reader friendly', desc: 'Using semantic article and heading elements per card ensures screen readers and search engines correctly parse each post preview.' },
      { icon: 'CODE', title: 'Generate cards from a CMS or static site generator', desc: 'Template this exact markup structure from your Markdown frontmatter, headless CMS collection, or API response to render the grid dynamically.' },
      { icon: 'CODE', title: 'Related: CSS backdrop-filter Playground', desc: 'See the [CSS backdrop-filter Playground](/ui-snippets/css-backdrop-filter-playground/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why use gradient placeholders instead of real cover images?', a: 'Gradients require no image file, never show a broken-image icon while content is being built out, and load instantly with zero network requests — making them a practical placeholder for prototypes or posts that don\'t have final photography yet.' },
      { q: 'How do I replace a gradient with a real cover photo?', a: 'Replace the .cover div\'s inline background gradient with background-image: url(...) and background-size: cover, or convert it to an <img> tag with object-fit: cover sized to fill the same fixed height.' },
      { q: 'How does the grid stay responsive without media queries?', a: 'The container uses grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)), which automatically fits as many 240px-or-wider columns as the available width allows and stretches them evenly, producing fewer columns on narrower viewports with no explicit breakpoints.' },
      { q: 'How do I make the entire card clickable instead of just the title?', a: 'Wrap the whole .post-card markup in an anchor tag, or use the "stretched link" technique — position an absolutely-positioned, fully-covering anchor with an empty accessible label inside the card while keeping the visible heading text as a separate, styled element.' },
      { q: 'Can I add a "read time" estimate to the meta row?', a: 'Yes. Add another span inside .post-meta after the date, separated by another .dot span, following the same pattern used for the author name and date.' },
      { q: 'Is the category tag clickable to filter posts?', a: 'Not by default — it\'s a styled span. Convert the .tag element to an anchor pointing at a category archive URL if you want readers to filter the blog by that topic directly from the card.' },
      { q: 'How do I control how many columns show on a wide screen?', a: 'Adjust the minmax(240px, 1fr) minimum width in the CSS panel — increasing it produces fewer, wider columns per row, and decreasing it allows more columns to fit before wrapping.' },
      { q: 'Can this grid be generated from Markdown blog posts or a headless CMS?', a: 'Yes. Write a small template function that maps each post\'s frontmatter or CMS fields (title, excerpt, category, author, date, cover image) onto this exact card markup, then loop over your full posts collection to render the grid.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's HTML and CSS to an AI coding assistant like Claude and ask it to explain the reasoning behind the specific visual hierarchy used here — why the category tag sits above the headline, why the excerpt is deliberately muted compared to the title, and why the author/date meta row uses the smallest, lowest-contrast text of all — so you can apply the same hierarchy principles consistently to other content card patterns on your site. It's also a great snippet to extend with the assistant's help: ask it to generate the template function that maps your specific static site generator's frontmatter (Jekyll, Hugo, Astro, Next.js MDX) or your headless CMS's post schema onto this exact card markup, so the grid can be rendered dynamically from your real content.`,
      prompt: `Build a responsive grid of blog post preview cards in plain HTML and CSS — no JavaScript required for the static version, no external image service.

Requirements:
- A CSS grid container using repeat(auto-fit, minmax(<min-width>, 1fr)) for grid-template-columns so the layout reflows from multiple columns on desktop down to a single column on mobile with no media queries.
- Each card is a semantic <article> element containing, in this order: a fixed-height cover placeholder using an inline CSS gradient (no image file), a small category tag styled as a pill, a headline, a short excerpt paragraph, and a meta row combining a small circular initials avatar, the author's name, a separator, and a relative or short-form date.
- Deliberately differentiate the visual weight of each piece of text: the headline should have the highest contrast and largest size among the body text, the excerpt should be visibly more muted, and the meta row should be the smallest and most muted text on the card.
- Each card's cover gradient and avatar color must be set independently so the grid shows visual variety across multiple posts.
- Add a hover state that lifts the card and deepens its shadow, and set cursor: pointer, signaling the whole card is clickable even before it is wrapped in a link.
- The markup for a single card must be simple enough to trivially generate from a CMS collection, static site generator's frontmatter, or API response via a small template function.`,
    },
  },
};

export default blogPostCardGrid;
