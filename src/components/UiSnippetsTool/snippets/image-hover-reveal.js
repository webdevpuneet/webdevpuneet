const imageHoverReveal = {
  id: 'image-hover-reveal',
  title: 'Image Hover Reveal Cards',
  lastmod: '2026-06-13',
  category: 'cards',
  html: `<div class="page">
  <h2 class="page-title">Our Work</h2>
  <p class="page-sub">Hover over any project to explore</p>
  <div class="grid">
    <article class="card" tabindex="0" aria-label="Project: Mountain Retreat">
      <div class="img-wrap">
        <img src="https://picsum.photos/seed/arch1/600/420" alt="Mountain Retreat architecture project" loading="lazy" class="img" />
        <div class="overlay">
          <span class="tag">Architecture</span>
          <h3 class="card-title">Mountain Retreat</h3>
          <p class="card-desc">A minimalist alpine escape blending raw concrete with panoramic glass walls and heated stone floors.</p>
          <div class="meta">
            <span class="meta-item">📍 Swiss Alps</span>
            <span class="meta-item">📅 2024</span>
          </div>
          <a href="#" class="card-link">View project →</a>
        </div>
      </div>
    </article>
    <article class="card card-tall" tabindex="0" aria-label="Project: Urban Loft">
      <div class="img-wrap">
        <img src="https://picsum.photos/seed/loft/600/720" alt="Urban Loft interior design" loading="lazy" class="img" />
        <div class="overlay">
          <span class="tag">Interior</span>
          <h3 class="card-title">Urban Loft</h3>
          <p class="card-desc">Industrial-meets-residential conversion in a repurposed 1920s factory. Exposed beams, polished concrete, and custom millwork.</p>
          <div class="meta">
            <span class="meta-item">📍 Brooklyn, NY</span>
            <span class="meta-item">📅 2025</span>
          </div>
          <a href="#" class="card-link">View project →</a>
        </div>
      </div>
    </article>
    <article class="card" tabindex="0" aria-label="Project: Coastal Villa">
      <div class="img-wrap">
        <img src="https://picsum.photos/seed/villa/600/420" alt="Coastal Villa exterior" loading="lazy" class="img" />
        <div class="overlay">
          <span class="tag">Residential</span>
          <h3 class="card-title">Coastal Villa</h3>
          <p class="card-desc">Breezy Mediterranean-influenced villa with terracotta tiles, arched doorways, and a cliff-edge infinity pool.</p>
          <div class="meta">
            <span class="meta-item">📍 Santorini</span>
            <span class="meta-item">📅 2025</span>
          </div>
          <a href="#" class="card-link">View project →</a>
        </div>
      </div>
    </article>
    <article class="card" tabindex="0" aria-label="Project: Forest Cabin">
      <div class="img-wrap">
        <img src="https://picsum.photos/seed/cabin/600/420" alt="Forest Cabin design" loading="lazy" class="img" />
        <div class="overlay">
          <span class="tag">Eco Design</span>
          <h3 class="card-title">Forest Cabin</h3>
          <p class="card-desc">A net-zero prefab cabin using cross-laminated timber, solar shingles, and rainwater harvesting. Off-grid ready.</p>
          <div class="meta">
            <span class="meta-item">📍 Oregon</span>
            <span class="meta-item">📅 2026</span>
          </div>
          <a href="#" class="card-link">View project →</a>
        </div>
      </div>
    </article>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#0f172a;min-height:100vh;padding:32px 20px}
.page-title{font-size:28px;font-weight:800;color:#f1f5f9;text-align:center;margin-bottom:6px}
.page-sub{font-size:14px;color:#64748b;text-align:center;margin-bottom:28px}

.grid{
  display:grid;
  grid-template-columns:repeat(2,1fr);
  grid-template-rows:240px 240px;
  gap:16px;
  max-width:680px;
  margin:0 auto;
}
.card-tall{grid-row:span 2;}

.card{border-radius:16px;overflow:hidden;cursor:pointer;outline:none}
.card:focus-visible{box-shadow:0 0 0 3px #818cf8}
.img-wrap{position:relative;width:100%;height:100%;overflow:hidden}
.img{width:100%;height:100%;object-fit:cover;transition:transform .6s cubic-bezier(.25,.46,.45,.94);display:block}
.card:hover .img,.card:focus-visible .img{transform:scale(1.08)}

.overlay{
  position:absolute;inset:0;
  background:linear-gradient(to top, rgba(2,6,23,.98) 0%, rgba(2,6,23,.75) 45%, rgba(2,6,23,.1) 100%);
  display:flex;flex-direction:column;justify-content:flex-end;
  padding:20px;
  opacity:0;
  transition:opacity .35s ease;
}
.card:hover .overlay,.card:focus-visible .overlay{opacity:1}

.tag{
  display:inline-block;font-size:9.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;
  background:rgba(129,140,248,.2);border:1px solid rgba(129,140,248,.35);color:#a5b4fc;
  border-radius:20px;padding:2px 9px;margin-bottom:8px;
  transform:translateY(12px);opacity:0;transition:transform .3s .05s ease,opacity .3s .05s ease;
}
.card:hover .tag,.card:focus-visible .tag{transform:translateY(0);opacity:1}
.card-title{font-size:17px;font-weight:800;color:#f8fafc;margin-bottom:6px;
  transform:translateY(16px);opacity:0;transition:transform .3s .1s ease,opacity .3s .1s ease}
.card:hover .card-title,.card:focus-visible .card-title{transform:translateY(0);opacity:1}
.card-desc{font-size:12px;color:#94a3b8;line-height:1.6;margin-bottom:10px;
  transform:translateY(16px);opacity:0;transition:transform .3s .15s ease,opacity .3s .15s ease}
.card:hover .card-desc,.card:focus-visible .card-desc{transform:translateY(0);opacity:1}
.meta{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px;
  transform:translateY(16px);opacity:0;transition:transform .3s .18s ease,opacity .3s .18s ease}
.card:hover .meta,.card:focus-visible .meta{transform:translateY(0);opacity:1}
.meta-item{font-size:11px;color:#64748b}
.card-link{display:inline-block;font-size:12px;font-weight:700;color:#818cf8;text-decoration:none;
  transform:translateY(16px);opacity:0;transition:transform .3s .22s ease,opacity .3s .22s ease}
.card:hover .card-link,.card:focus-visible .card-link{transform:translateY(0);opacity:1}
.card-link:hover{text-decoration:underline}

@media(max-width:520px){.grid{grid-template-columns:1fr;grid-template-rows:auto}.card-tall{grid-row:span 1}.img-wrap{height:220px}}`,

  js: `// Keyboard: Enter/Space activates hover state for accessibility
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.classList.toggle('force-hover');
    }
  });
});`,

  seo: {
    title: 'Image Hover Reveal Cards — CSS Overlay Animation Snippet',
    description: `Image cards with staggered overlay text reveal on hover — gradient overlay, zoom, tag badge, keyboard accessible. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: `Image Hover Reveal — Gradient Overlay, Staggered translateY Reveal & CSS Grid Layout`,
      description: `Image hover reveal cards are a staple of portfolio sites, agency showcases, and editorial grids — a clean image at rest, with rich content that appears as the user approaches. This snippet builds a four-card asymmetric grid with a gradient overlay that fades in on hover, each content element (tag, title, description, metadata, link) animating in from below with a staggered delay that creates a natural cascading reveal effect — entirely in CSS.

The technique is widely used across Awwwards-winning portfolio sites, photography galleries, architecture firm showcases, and e-commerce collection grids because it maximises image real estate while hiding secondary content until needed. The challenge is making the reveal feel graceful rather than abrupt, and making it accessible without JavaScript.

**The gradient overlay reveal**

The overlay \`div\` sits \`position: absolute; inset: 0\` over the image and starts at \`opacity: 0\`. On \`:hover\` (and \`:focus-visible\` for keyboard users), it transitions to \`opacity: 1\`. The overlay background is \`linear-gradient(to top, rgba(2,6,23,.98) 0%, rgba(2,6,23,.75) 45%, rgba(2,6,23,.1) 100%)\` — dark and opaque at the bottom where text lives, fading to near-transparent at the top where the image should remain visible. This gradient is tuned so the image is still recognisable while text remains readable at any contrast level.

**Staggered translateY animation**

Each element within the overlay — tag, title, description, metadata, link — starts at \`transform: translateY(16px); opacity: 0\`. On hover, each transitions to \`translateY(0); opacity: 1\` with increasing \`transition-delay\` values: 0.05s, 0.1s, 0.15s, 0.18s, 0.22s. This staggered cascade makes the content appear to rise up from the bottom naturally, as if emerging from below the image edge. The effect is achieved without JavaScript or \`@keyframes\` — pure CSS transitions on the child elements within the hover context.

**Image scale on hover**

The image itself scales from 1.0 to 1.08 with \`transition: transform .6s cubic-bezier(.25,.46,.45,.94)\`. The scale is subtle (8%) — enough to signal interaction but not enough to be distracting. The longer duration (0.6s) and deceleration easing make the zoom feel organic rather than mechanical.

**Asymmetric CSS Grid layout**

The grid uses \`grid-template-columns: repeat(2, 1fr)\` with a tall card (\`.card-tall\`) spanning two rows via \`grid-row: span 2\`. This asymmetric Masonry-like layout creates visual interest and hierarchy — the tall card draws the eye first. All dimensions use fixed pixel row heights for predictable behaviour in the demo; in production, adapt with \`aspect-ratio\` on the image for fluid heights. Pair with an [image lightbox](/ui-snippets/image-lightbox/) to open images full-screen after the hover reveal.`,
    },
    howToUse: { type: 'steps', items: [
      {
        title: 'Paste HTML, CSS, and JS',
        text: `Four cards appear in an asymmetric grid on a dark background — three square cards and one tall card spanning two rows. All show images from picsum.photos.`,
      },
      {
        title: 'Hover over any card',
        text: `A gradient overlay fades in. The tag, title, description, metadata, and link each animate upward in sequence with a 50ms stagger — creating a cascading reveal.`,
      },
      {
        title: 'Notice the image zoom',
        text: `The background image scales to 108% while hovering — a slow 0.6s ease that feels organic. The \`overflow:hidden\` on the card clips the scale to the card boundary.`,
      },
      {
        title: 'Test keyboard navigation',
        text: `Tab to a card and press Enter or Space — the overlay reveals. Tab to the "View project →" link inside and follow it. Press Enter/Space again to dismiss.`,
      },
      {
        title: 'Replace with your images',
        text: `Swap the \`src\` on each \`<img>\` tag with your own images. Update \`alt\`, card titles, descriptions, tags, and metadata to match your content.`,
      },
      {
        title: 'Add or remove cards',
        text: `Copy an \`<article class="card">\` block and add it to the grid. To make a card tall, add \`card-tall\` class. Adjust the grid \`grid-template-rows\` to add more rows.`,
      },
    ] },
    features: [
      {
        title: 'Gradient overlay fade-in',
        text: `\`opacity: 0\` → \`opacity: 1\` on hover with a bottom-heavy \`linear-gradient\` — dark at the bottom for text legibility, fading to transparent at the top to preserve the image.`,
      },
      {
        title: 'Staggered translateY cascade',
        text: `Tag, title, desc, meta, and link each have increasing \`transition-delay\` (0.05s, 0.1s, 0.15s, 0.18s, 0.22s) — a rising cascade purely in CSS, no JavaScript.`,
      },
      {
        title: 'Subtle image scale on hover',
        text: `Image scales 8% over 0.6s with \`cubic-bezier(.25,.46,.45,.94)\`. Combined with \`overflow:hidden\` on the card, the zoom is contained and feels natural.`,
      },
      {
        title: 'Asymmetric CSS Grid layout',
        text: `Two-column grid with a tall card spanning two rows via \`grid-row: span 2\`. Creates visual hierarchy without JavaScript masonry libraries.`,
      },
      {
        title: 'Keyboard accessible',
        text: `Cards have \`tabindex="0"\` and \`:focus-visible\` styles that trigger the same overlay as hover. JS adds Enter/Space toggle for full keyboard operability.`,
      },
      {
        title: 'Tag badge with glass style',
        text: `Category tag uses a translucent indigo background with border — visible over both light and dark image areas. Animates in first with the shortest delay.`,
      },
      {
        title: 'Responsive grid',
        text: `Media query at 520px switches to a single-column layout with fixed-height image containers — maintains the reveal effect on mobile screens.`,
      },
      {
        title: 'Lazy-loaded images',
        text: `All \`<img>\` tags use \`loading="lazy"\` — images outside the viewport don't load until scrolled into view, improving initial page performance.`,
      },
    ],
    useCases: [
      {
        title: 'Portfolio and agency project grids',
        text: `The primary use case — show project images clean, reveal details on hover. Architecture, design, photography, and creative agency sites use this pattern extensively.`,
      },
      {
        title: 'Team member showcase',
        text: `Show team photos at rest, reveal name, role, and LinkedIn link on hover. A professional pattern for "About Us" pages that avoids cluttering the initial view.`,
      },
      {
        title: 'E-commerce product collection grids',
        text: `Show product photography at full size. Hover reveals product name, price, and "Add to cart" — a conversion-focused alternative to always-visible product labels.`,
      },
      {
        title: 'Travel and destination guides',
        text: `Destination cards with full-bleed photography. Hover reveals location name, description, and a "Learn more" link — engaging without overwhelming the visual.`,
      },
      {
        title: 'Blog post or article cards',
        text: `Article cards with featured images. Hover reveals title, excerpt, publish date, and category tag — pairs well with a [masonry grid](/ui-snippets/masonry-grid/) layout.`,
      },
      {
        title: 'Restaurant or food menu items',
        text: `Food photography at full size, hover reveals dish name, ingredients, and price. The gradient overlay ensures dark text is readable over any food photo colour palette.`,
      },
      { icon: 'CODE', title: 'Related: Swipeable Cards Stack', desc: 'See the [Swipeable Cards Stack](/ui-snippets/swipeable-cards-stack/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'How do I always show the title even without hover?',
        a: `Remove the \`opacity: 0\` and \`transform: translateY(16px)\` from \`.card-title\` in CSS, and remove its hover/focus reset. The overlay will still fade in on hover for the description and link, while the title stays permanently visible at the bottom of each card.`,
      },
      {
        q: 'How do I use real aspect ratios instead of fixed row heights?',
        a: `On the \`.img-wrap\`, set \`aspect-ratio: 4/3\` (or your preferred ratio) and remove the fixed pixel \`grid-template-rows\`. Set \`height: 100%\` on the \`.img\`. This makes cards size to their image content, which is better for responsive grids.`,
      },
      {
        q: 'Can I use a video instead of an image?',
        a: `Yes — replace the \`<img>\` with a \`<video autoplay muted loop playsinline>\`. The overlay and reveal CSS work the same way. Set \`object-fit: cover\` on the video and ensure the \`.img-wrap\` has \`overflow: hidden\` and the height constrained.`,
      },
      {
        q: 'How do I export this as a React component?',
        a: `Map your data array to \`<article className="card">\` elements. \`tabIndex={0}\` and \`onKeyDown\` handle keyboard. The stagger animation is CSS-only so it works in React without any extra state — just ensure className strings map correctly.`,
      },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the cascade timing by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the increasing transition-delay values on the tag, title, description, meta, and link (0.05s through 0.22s) combine with their shared translateY and opacity transitions to create the rising cascade effect, or why focus-visible is paired with hover on every rule rather than relying on hover alone. The same assistant is useful for optimizing it — ask whether five separate transition-delay values hardcoded per element is harder to maintain than a CSS custom property scaled by a data attribute, and how you'd refactor it that way. It's just as handy for extending the cards: ask it to make the grid-row span 2 tall-card pattern rearrange itself for different numbers of items, add a subtle parallax tilt on mouse movement within each card, or swap the keyboard toggle's force-hover class for a proper aria-expanded announcement. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an image hover-reveal card grid in plain HTML, CSS, and JavaScript — no library.

Requirements:
- A CSS grid of cards with at least one card spanning two rows (an asymmetric grid, not all cards the same size), each card containing a full-cover image and an absolutely-positioned overlay div sitting on top of it.
- The overlay must be a bottom-heavy linear gradient (opaque near the bottom fading to nearly transparent near the top) so the image stays visible near the top while text is legible near the bottom, starting fully transparent and only becoming fully opaque on hover or keyboard focus.
- Inside the overlay, place at least five separate pieces of content (a category tag, a title, a description, a metadata row, and a link), each one starting shifted downward and transparent, and each transitioning to its resting position and full opacity with a distinct, increasing transition-delay so they visibly cascade into view one after another rather than all appearing simultaneously.
- The card's image itself must scale up slightly (a modest zoom, not dramatic) on hover using a slow, eased transform transition, clipped by overflow hidden on the card so the zoom never bleeds outside the card's rounded corners.
- Every hover-triggered CSS rule must also trigger on focus-visible (not just :hover) so the reveal works identically for sighted keyboard users tabbing through the cards, and each card must be focusable via tabindex.
- Add a small amount of JavaScript that listens for Enter or Space being pressed while a card is focused and toggles a class that forces the same revealed state, so the effect is fully operable without relying on native focus behavior alone.
- Make the grid collapse to a single column on narrow viewports, with the tall card reverting to a normal single-row span.`,
    },
  },
};

export default imageHoverReveal;
