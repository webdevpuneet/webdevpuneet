const cssGridCards = {
    id: 'css-grid-cards',
    title: 'Responsive Card Grid',
    category: 'layouts',
    html: `<div class="grid">
  <article class="card">
    <div class="thumb" style="background:#6366f1"></div>
    <div class="body">
      <span class="tag">Design</span>
      <h3>Building design systems at scale</h3>
      <p>How to create consistent components across large teams.</p>
    </div>
  </article>
  <article class="card">
    <div class="thumb" style="background:#0ea5e9"></div>
    <div class="body">
      <span class="tag">Dev</span>
      <h3>Performance budgets that actually work</h3>
      <p>Practical strategies for keeping your app fast.</p>
    </div>
  </article>
  <article class="card">
    <div class="thumb" style="background:#10b981"></div>
    <div class="body">
      <span class="tag">CSS</span>
      <h3>Modern layout with CSS Grid and Subgrid</h3>
      <p>Unlock alignment superpowers with one property.</p>
    </div>
  </article>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 24px; }

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}

.card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  transition: box-shadow 0.15s, transform 0.15s;
}
.card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); transform: translateY(-2px); }

.thumb { height: 120px; }

.body { padding: 16px; }

.tag {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6366f1;
  background: rgba(99,102,241,0.08);
  padding: 2px 8px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 10px;
}

h3 { font-size: 14px; font-weight: 700; color: #1e293b; line-height: 1.4; margin-bottom: 8px; }
p { font-size: 13px; color: #64748b; line-height: 1.55; }`,
    js: '',

  seo: {
    title: 'Responsive Card Grid — Free CSS Grid auto-fill Snippet',
    description: 'Card grid using repeat(auto-fill, minmax()) — wraps automatically with zero media queries, hover lift included. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Responsive Card Grid — CSS Grid auto-fill minmax Without Media Queries',
      description: `The responsive card grid is one of the most common layout patterns in web development. Blog post listings of [article cards](/ui-snippets/article-card/), [product](/ui-snippets/product-card/) grids, [team member](/ui-snippets/team-card/) pages, feature showcases — they all need a multi-column grid that reflows to fewer columns on smaller screens. The traditional approach uses multiple \`@media\` queries to change the column count. The modern CSS Grid approach does it in a single declaration with no breakpoints at all.

**The auto-fill minmax pattern**

\`grid-template-columns: repeat(auto-fill, minmax(220px, 1fr))\` is the core of this snippet. \`auto-fill\` tells the browser to create as many columns as will fit in the available width. \`minmax(220px, 1fr)\` sets the minimum column width to 220px and the maximum to \`1fr\` (equal share of remaining space). The browser calculates how many 220px columns fit, creates that many, and scales them up equally to fill the row. When the container narrows, fewer columns fit, and the grid automatically reflows to a new row — no media query needed.

**auto-fill vs auto-fit**

\`auto-fill\` creates columns even if there are no items to fill them — empty columns remain in the grid and occupy space. \`auto-fit\` collapses empty columns to zero width, allowing filled columns to expand. For a card grid where you want cards to always be a consistent size, \`auto-fill\` is usually the right choice. For a grid where you want a single card to fill the full width when alone, use \`auto-fit\`.

**The hover lift effect**

Cards use \`transition: box-shadow 0.15s, transform 0.15s\` and \`:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.1); transform: translateY(-3px); }\`. The \`translateY(-3px)\` moves the card 3px upward and the shadow deepens simultaneously, creating the illusion of the card lifting off the page. Both transitions are hardware-accelerated.

**Card structure**

Each card uses the \`<article>\` element — semantically correct for a self-contained content item. The thumbnail uses a coloured div (replace with an \`<img>\` tag for real images). The body contains a tag chip, headline, and metadata row.

**Changing the minimum card width**

The \`220px\` minimum determines how many columns appear at each screen width. Increase it to \`280px\` or \`320px\` for fewer, wider cards. Decrease it to \`160px\` for more compact cards. The grid recalculates automatically — no other CSS changes needed.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Load the snippet',
          text: 'Click "Responsive Card Grid" in the sidebar. Resize the preview panel to see the grid reflow between 1, 2, and 3 columns without any media queries.',
        },
        {
          title: 'Change the minimum card width',
          text: 'In the CSS panel, update the 220px value in minmax(220px, 1fr). Larger values create fewer columns; smaller values create more.',
        },
        {
          title: 'Update the card content',
          text: 'In the HTML panel, replace the thumb colours, tag labels, titles, and meta text with your real content. Add or remove article.card elements as needed.',
        },
        {
          title: 'Replace the colour thumbs with images',
          text: 'Replace each .thumb div with an <img> tag. Add object-fit: cover; width: 100%; to the .thumb CSS rule.',
        },
        {
          title: 'Adjust the hover lift',
          text: 'Change translateY(-3px) and the box-shadow on .card:hover in the CSS panel to increase or reduce the lift effect.',
        },
        {
          title: 'Export in your format',
          text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.',
        },
      ],
    },
    features: [
      'repeat(auto-fill, minmax(220px, 1fr)) — responsive columns with no media queries',
      'Grid automatically calculates column count from available container width',
      'hover: translateY(-3px) + deeper box-shadow for a hardware-accelerated lift',
      'Article elements for semantic card markup',
      'Tag chip, headline, and metadata row in each card body',
      'gap: 16px uniform spacing between all cards horizontally and vertically',
      'Pure HTML and CSS — no JavaScript required',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      {
        icon: 'APP',
        title: 'Blog and content listing pages',
        desc: 'Display blog posts, case studies, or news articles in a responsive grid. The auto-fill pattern handles any number of cards without breakpoint adjustments.',
      },
      {
        icon: 'LEARN',
        title: 'Learn CSS Grid auto-fill minmax',
        desc: 'Change the 220px value and resize the preview to see how the column count changes. Swap auto-fill for auto-fit to understand the difference in card stretching behaviour.',
      },
      {
        icon: 'DESIGN',
        title: 'Product and portfolio grids',
        desc: 'Use the card grid for product listings, team member pages, or portfolio case studies. Replace the colour thumbs with real images and update the card metadata.',
      },
      {
        icon: 'FLOW',
        title: 'Feature showcase sections',
        desc: 'Present product features, pricing plan details, or comparison items in an auto-wrapping grid. Test how the layout looks at 375px, 768px, and desktop widths.',
      },
      {
        icon: 'CODE',
        title: 'Drop into any project without breakpoints',
        desc: 'The single grid-template-columns declaration handles all screen sizes. Copy the CSS class and HTML structure — no media query management needed.',
      },
      {
        icon: 'IMG',
        title: 'Image gallery layouts',
        desc: 'Replace the colour thumb divs with img tags for an instant responsive photo gallery. Add object-fit: cover to maintain consistent card heights across varied image ratios.',
      },
      { icon: 'CODE', title: 'Related: CSS text-box-trim Demo', desc: 'See the [CSS text-box-trim Demo](/ui-snippets/css-text-box-trim-demo/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'How does the grid respond without media queries?',
        a: 'repeat(auto-fill, minmax(220px, 1fr)) tells the browser to fill the row with as many 220px columns as fit. When the container width changes, the browser recalculates and reflows automatically. There is no fixed column count — the grid adapts to any container width.',
      },
      {
        q: 'What is the difference between auto-fill and auto-fit?',
        a: 'auto-fill creates columns even if they have no items, leaving empty space. auto-fit collapses empty columns to zero and lets filled columns expand. For a card grid with consistent card sizes, auto-fill is usually correct. For a grid where a lone card should fill the full width, use auto-fit.',
      },
      {
        q: 'How do I control the number of columns at specific breakpoints?',
        a: 'Adjust the minmax minimum value. A 320px minimum gives 3 columns on desktop, 2 on tablet, 1 on mobile. For fixed column counts at specific widths, add a media query overriding grid-template-columns — for example: @media (max-width: 600px) { .grid { grid-template-columns: 1fr; } }.',
      },
      {
        q: 'How do I replace the coloured thumbnail with a real image?',
        a: 'Replace <div class="thumb" style="background:#6366f1"></div> with <img class="thumb" src="your-image.jpg" alt="description" />. Add object-fit: cover; width: 100%; to .thumb in the CSS panel to maintain the fixed height and crop the image.',
      },
      {
        q: 'How do I make all cards the same height?',
        a: 'The grid already stretches cards to equal height in the same row by default (align-items: stretch is the grid default). For consistent height across all rows regardless of content, set a fixed height on .card or use a fixed aspect ratio on the thumbnail.',
      },
      {
        q: 'Can I use this grid layout in React?',
        a: 'Yes. Click "JSX" to download a React component or "Tailwind" for a Tailwind version. In React, map over a cards array and render each article element. The CSS grid layout works identically in React — no framework-specific grid library needed.',
      },
    ],
    aiPrompt: {
      paragraph: `You don't have to run through every viewport width yourself to trust that this grid reflows correctly. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how repeat combined with auto-fill and a minmax value determines the column count at any given container width, and why swapping auto-fill for auto-fit would change the behavior specifically when there are fewer cards than would fill a row. The same assistant can help optimize it — for instance asking whether using object-fit cover on real images instead of the flat-color placeholder divs would require any adjustment to the fixed thumbnail height. It's also useful for extending the layout: ask it to add a featured card that spans two grid columns using grid-column, support a masonry-style variable card height instead of uniform stretched rows, or add a subtle entrance animation that staggers as cards scroll into view. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a responsive card grid in plain HTML and CSS only, using CSS Grid's auto-fill and minmax so it reflows across screen sizes without a single media query.

Requirements:
- A grid container whose grid-template-columns is defined with repeat, auto-fill, and a minmax function specifying a minimum card width and a maximum of one fractional unit, so the browser calculates the column count purely from available width with no explicit breakpoints anywhere in the stylesheet.
- Each card is a semantic article element containing a fixed-height thumbnail area, a small uppercase category tag styled as a pill, a heading, and a short description paragraph.
- Cards must visually lift on hover using a combined transform (moving upward slightly) and an intensified box-shadow, both transitioning smoothly, and the effect must be purely cosmetic with no layout shift.
- Uniform gap spacing must be applied both horizontally and vertically between grid items using the grid gap property rather than manual margins on individual cards.
- Do not use any JavaScript, any explicit pixel-based breakpoints, or any framework grid utilities — the entire responsive behavior must come from the single grid-template-columns declaration.
- Structure the markup so that swapping the placeholder colored thumbnail divs for real img elements with object-fit cover requires no other changes to the grid or card CSS.`,
    },
  },
};

export default cssGridCards;
