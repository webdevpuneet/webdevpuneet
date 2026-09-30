const containerQueryCard = {
  id: 'container-query-card',
  title: 'Container Query Card',
  lastmod: '2026-07-22',
  category: 'cards',
  html: `<div class="demo">
  <p class="demo-hint">Drag the right edge — the card responds to its <strong>container</strong>, not the viewport</p>

  <!-- Resizable playground -->
  <div class="resizer" id="resizer">
    <div class="card-container">
      <article class="product-card">
        <div class="pc-media">
          <div class="pc-art"></div>
          <span class="pc-badge">-20%</span>
        </div>
        <div class="pc-body">
          <h3 class="pc-title">Aurora Desk Lamp</h3>
          <p class="pc-desc">Dimmable warm-to-cool LED with a weighted walnut base and touch controls.</p>
          <div class="pc-meta">
            <span class="pc-meta-item">★ 4.8 · 1,204 reviews</span>
            <span class="pc-meta-item">Free shipping</span>
            <span class="pc-meta-item">In stock</span>
          </div>
          <div class="pc-foot">
            <span class="pc-price"><s>$89</s> $71</span>
            <button class="pc-btn">Add to cart</button>
          </div>
        </div>
      </article>
    </div>
    <div class="grip" aria-hidden="true"><span></span><span></span></div>
  </div>
  <div class="width-readout"><span id="width-readout">—</span></div>

  <!-- Same markup, two fixed containers -->
  <div class="fixed-row">
    <div class="fixed-col narrow">
      <p class="col-label">Same component · 240px slot</p>
      <div class="card-container">
        <article class="product-card">
          <div class="pc-media"><div class="pc-art"></div><span class="pc-badge">-20%</span></div>
          <div class="pc-body">
            <h3 class="pc-title">Aurora Desk Lamp</h3>
            <p class="pc-desc">Dimmable warm-to-cool LED with a weighted walnut base and touch controls.</p>
            <div class="pc-meta">
              <span class="pc-meta-item">★ 4.8 · 1,204 reviews</span>
              <span class="pc-meta-item">Free shipping</span>
              <span class="pc-meta-item">In stock</span>
            </div>
            <div class="pc-foot">
              <span class="pc-price"><s>$89</s> $71</span>
              <button class="pc-btn">Add to cart</button>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; min-height: 100vh; display: flex; justify-content: center; padding: 28px 20px; }

.demo { width: 100%; max-width: 640px; }
.demo-hint { font-size: 12.5px; color: #64748b; margin-bottom: 14px; text-align: center; }
.demo-hint strong { color: #a5b4fc; }

/* — Resizable playground — */
.resizer {
  position: relative;
  width: min(100%, 560px); min-width: 230px; max-width: 100%;
  margin: 0 auto;
  padding-right: 18px;
}
.grip {
  position: absolute; right: 0; top: 0; bottom: 0; width: 18px;
  display: flex; align-items: center; justify-content: center; gap: 2px;
  cursor: ew-resize; border-radius: 0 10px 10px 0;
  background: #1e293b;
}
.grip span { width: 2px; height: 22px; background: #475569; border-radius: 2px; }
.grip:hover span { background: #818cf8; }

.width-readout { text-align: center; margin: 10px 0 30px; }
.width-readout span {
  font-size: 11px; color: #64748b; font-variant-numeric: tabular-nums;
  background: #1e293b; border: 1px solid #334155;
  padding: 3px 10px; border-radius: 20px;
}

.fixed-row { display: flex; justify-content: center; }
.fixed-col { width: 240px; }
.col-label { font-size: 11px; color: #475569; margin-bottom: 8px; text-align: center; }

/* ————————————————————————————————
   THE CONTAINER: one property turns any element
   into a query target for its descendants.
   ———————————————————————————————— */
.card-container {
  container-type: inline-size;
  container-name: card;
}

/* — Base (narrow / stacked) layout — */
.product-card {
  background: #1e293b; border: 1px solid #334155;
  border-radius: 14px; overflow: hidden;
  display: flex; flex-direction: column;
}
.pc-media { position: relative; }
.pc-art {
  height: 110px;
  background:
    radial-gradient(circle at 70% 30%, rgba(251,191,36,0.65), transparent 55%),
    linear-gradient(135deg, #7c3aed, #db2777, #f59e0b);
}
.pc-badge {
  position: absolute; top: 10px; left: 10px;
  background: #f43f5e; color: #fff;
  font-size: 10px; font-weight: 800;
  padding: 3px 8px; border-radius: 6px;
}
.pc-body { padding: 14px; display: flex; flex-direction: column; gap: 8px; }
.pc-title { font-size: clamp(14px, 6cqi, 19px); font-weight: 700; color: #f1f5f9; }
.pc-desc { font-size: 12px; color: #94a3b8; line-height: 1.55; display: none; }
.pc-meta { display: flex; flex-direction: column; gap: 4px; }
.pc-meta-item { font-size: 11px; color: #64748b; }
.pc-meta-item:nth-child(n+2) { display: none; }
.pc-foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 2px; }
.pc-price { font-size: 15px; font-weight: 800; color: #f8fafc; }
.pc-price s { color: #475569; font-weight: 600; font-size: 12px; margin-right: 5px; }
.pc-btn {
  background: #6366f1; color: #fff; border: none;
  border-radius: 9px; padding: 8px 14px;
  font-size: 12px; font-weight: 700; font-family: inherit; cursor: pointer;
  white-space: nowrap;
}
.pc-btn:hover { background: #4f46e5; }

/* — ≥340px: horizontal media+body split — */
@container card (min-width: 340px) {
  .product-card { flex-direction: row; }
  .pc-media { flex: 0 0 34%; }
  .pc-art { height: 100%; min-height: 140px; }
  .pc-desc { display: block; }
  .pc-body { flex: 1; }
}

/* — ≥480px: full layout with meta row — */
@container card (min-width: 480px) {
  .pc-media { flex-basis: 40%; }
  .pc-meta { flex-direction: row; gap: 14px; }
  .pc-meta-item:nth-child(n+2) { display: inline; }
  .pc-body { padding: 18px; gap: 10px; }
  .pc-btn { padding: 10px 20px; }
}`,

  js: `// The container queries need zero JavaScript — this is only the drag-to-resize
// playground and the live width readout.
const resizer  = document.getElementById('resizer');
const readout  = document.getElementById('width-readout');
const grip     = resizer.querySelector('.grip');

let dragging = false;

grip.addEventListener('pointerdown', e => {
  dragging = true;
  grip.setPointerCapture(e.pointerId);
});
grip.addEventListener('pointermove', e => {
  if (!dragging) return;
  const rect = resizer.getBoundingClientRect();
  const w = Math.max(230, Math.min(e.clientX - rect.left + 9, resizer.parentElement.clientWidth));
  resizer.style.width = w + 'px';
});
grip.addEventListener('pointerup', () => { dragging = false; });

// Live readout via ResizeObserver — updates for drag AND window resizes
const container = resizer.querySelector('.card-container');
new ResizeObserver(entries => {
  const w = Math.round(entries[0].contentBoxSize
    ? entries[0].contentBoxSize[0].inlineSize
    : entries[0].contentRect.width);
  let layout = 'stacked';
  if (w >= 480) layout = 'full';
  else if (w >= 340) layout = 'horizontal';
  readout.textContent = 'container: ' + w + 'px \\u2014 ' + layout + ' layout';
}).observe(container);`,

  seo: {
    title: 'Container Query Card — Free HTML CSS JS Snippet',
    description: 'One product card, three layouts driven by @container queries with cqi fluid type — drag to resize and watch it adapt. React & Tailwind exports.',
    about: {
      title: 'Container Query Card — container-type: inline-size, @container Breakpoints, cqi Fluid Typography & a Drag-Resize Playground',
      description: `Media queries ask "how wide is the viewport?" — but components don't live in viewports, they live in sidebars, grid cells, modals, and main columns of wildly different widths on the same screen. Container queries fix responsive design's original sin by letting a component ask "how wide is *my slot*?" This snippet demonstrates the complete pattern with the classic proving ground — a product card that renders three genuinely different layouts depending on the width of its container — wrapped in a drag-to-resize playground so you can watch every breakpoint fire, plus a fixed 240px column showing the identical markup adapting independently on the same page.

**Two CSS lines create the containment context**

Everything starts with the wrapper: \`.card-container { container-type: inline-size; container-name: card }\`. The \`container-type\` declaration establishes the element as a query container measured on its inline axis (width, in horizontal writing modes) — and critically, it applies *size containment*, meaning the container's width can no longer be influenced by its contents. That constraint is why container queries took a decade to ship: without containment, a child changing layout could change the container's size, re-triggering the query in an infinite loop. The optional \`container-name\` lets queries target this container specifically (\`@container card (min-width: 340px)\`) rather than the nearest ancestor container — essential hygiene once components nest.

**Three layouts, one markup**

The card's base styles define the narrow, stacked layout: media on top, tight padding, description hidden, only the first meta item visible. At \`@container card (min-width: 340px)\` the card flips to \`flex-direction: row\` — art on the left at 34% width, the description appears, and the body fills the remainder. At \`(min-width: 480px)\` the media grows to 40%, the meta list rotates from a column to an inline row revealing all three items, and padding and button sizing step up. Note what the queries change: *layout, visibility, and density* — the component's information hierarchy adapts, not just its scale. That is the design payoff of container queries: the same \`<article>\` dropped into a 240px rail renders the compact version while its sibling in a 560px main column renders the full version, with zero props, classes, or JS involved.

**Fluid type with cqi units**

The title uses \`font-size: clamp(14px, 6cqi, 19px)\` — \`cqi\` is a container query *unit*, 1% of the container's inline size. Between the clamp bounds, the title scales continuously with the container rather than jumping at breakpoints, which smooths the transitions between layout states. Container units (\`cqw\`, \`cqh\`, \`cqi\`, \`cqb\`, \`cqmin\`, \`cqmax\`) work anywhere lengths do and pair naturally with clamp() for per-component fluid typography — a technique impossible to express with viewport units when the same component appears at multiple sizes on one page.

**The playground: pointer capture + ResizeObserver**

The container queries themselves need zero JavaScript — the JS here only powers the demo apparatus. The drag grip uses the Pointer Events pattern (\`setPointerCapture\` so the drag survives the cursor leaving the grip) to set the playground's width between 230px and its parent's width. The live readout uses a \`ResizeObserver\` on the container — not on drag events — so it reports width changes from *any* cause, including window resizes, and annotates which layout tier is active. That observer pattern is also your escape hatch on the rare occasion JS needs to know about container size changes, since no "containerquery" DOM event exists.

Browser support has been universal since early 2023 (Chrome 105+, Safari 16+, Firefox 110+), making container queries safe for production today — and this component-first responsive approach is rapidly replacing viewport breakpoints as the default in design systems.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Drag the edge and watch the breakpoints',
          text: 'Grab the grip on the card\'s right edge and drag: below 340px the card is stacked and terse; from 340px it goes horizontal and the description appears; from 480px the meta row expands to three items and spacing opens up. The readout below reports the live container width and active layout tier. Note the fixed 240px column beneath — identical markup, rendering the compact layout because *its* container is narrow, regardless of your viewport.',
        },
        {
          title: 'Reuse the pattern on your own component',
          text: 'Wrap any component slot in a query container: .slot { container-type: inline-size; container-name: card }. Write the component\'s narrowest layout as its base styles, then add @container card (min-width: …) blocks that progressively unlock density — exactly like mobile-first media queries, but scoped. Drop the same component into a sidebar, a modal, and a main column; each instance sizes itself with no configuration.',
        },
        {
          title: 'Pick honest breakpoint values',
          text: 'Container breakpoints should come from where the *content* breaks, not from device widths: shrink the playground until the layout looks cramped, and that width is your min-width value. This card breaks at 340px (room for a side-by-side split) and 480px (room for the inline meta row). Two or three tiers cover most components; more usually signals the component is doing too much.',
        },
        {
          title: 'Use container units for the details',
          text: 'The title\'s clamp(14px, 6cqi, 19px) scales with the container between hard bounds. Apply the same to hero padding (padding: clamp(14px, 4cqi, 24px)) or icon sizes. Prefer cqi over cqw (it respects vertical writing modes), always clamp so extreme containers can\'t produce absurd sizes, and keep body text fixed — fluid scaling suits display elements, not paragraphs.',
        },
        {
          title: 'Query by name when components nest',
          text: 'An unnamed @container (min-width: …) query targets the nearest ancestor container of any name — fine until a card containing a chart sits inside a dashboard cell that is also a container. Name each context (container-name: card / panel / shell) and query the one you mean: @container panel (min-width: 600px). Establish this convention early in a design system; retrofitting names is tedious.',
        },
        {
          title: 'Export and integrate',
          text: 'Click JSX for a React version — the CSS is the whole mechanism, so the component ports as markup plus stylesheet with no resize listeners or width props. Use it in card grids like the [CSS Grid Cards](/ui-snippets/css-grid-cards) layout, inside the [Holy Grail Layout](/ui-snippets/holy-grail-layout) where sidebar and main column widths differ, or with the [Product Card](/ui-snippets/product-card) as richer content. Tailwind users: @container and @card:flex-row utilities via the official container-queries support map one-to-one.',
        },
      ],
    },
    features: [
      'True component-level responsiveness: three layouts driven by container width, not viewport width',
      'container-type: inline-size + container-name establish the query context in two declarations',
      'Mobile-first tiers: stacked base, horizontal at ≥340px, full density with inline meta row at ≥480px',
      'Queries change hierarchy, not just scale — description and meta items appear as space allows',
      'Fluid title via clamp() with the cqi container unit — continuous scaling between breakpoints',
      'Drag-resize playground with pointer capture, clamped between 230px and the parent width',
      'ResizeObserver-powered readout reporting live container width and the active layout tier',
      'Side-by-side proof: identical markup in a fixed 240px slot renders the compact layout simultaneously',
    ],
    useCases: [
      {
        icon: 'DESIGN',
        title: 'Design-system cards that work in any slot',
        desc: 'The core design-system problem container queries solve: one ProductCard component must live in a 3-up grid, a narrow "related items" rail, a full-width feature slot, and a mobile column — historically forcing size-variant props (size="sm|md|lg") that every consumer must set correctly per context. With this pattern the component self-adapts, variant props disappear, and misuse becomes impossible. Publish the container wrapper as part of the component and every future placement is automatically correct.',
      },
      {
        icon: 'WEB',
        title: 'E-commerce category grids with responsive tracks',
        desc: 'Combine with an auto-fitting grid — grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)) — and the card count per row changes with viewport while each card independently picks its layout from its actual track width: four compact stacked cards on a laptop, two horizontal cards on a narrow tablet, one full-density card on wide screens. No media queries coordinate any of this; the grid and the cards negotiate it emergently. This is the layout pattern modern storefronts (and this card\'s 340px/480px tiers) are built for.',
      },
      {
        icon: 'CHART',
        title: 'Dashboard widgets in resizable and rearrangeable grids',
        desc: 'Dashboards are the worst case for viewport queries: the user drags a widget from a third-width cell to a full-width row and the viewport never changed. Make each widget cell a named container and widgets restyle themselves on drop — a KPI card shows just the number at 200px, adds a sparkline at 340px, and a full chart with legend at 560px. Pairs directly with drag-grid shells and the [Metric Card Grid](/ui-snippets/metric-card-grid); the ResizeObserver readout technique here also helps chart libraries re-render on cell resize.',
      },
      {
        icon: 'LEARN',
        title: 'Teaching modern responsive design',
        desc: 'This snippet is built as a lesson: the drag playground makes breakpoints tangible (students *feel* 340px fire), the fixed 240px twin proves container-vs-viewport in one glance, and the readout names each tier as it activates. The CSS is deliberately layered — two lines of containment, base styles, two query blocks, one cqi clamp — so each concept is separable. Use it to migrate a team off viewport-breakpoint habits, or alongside the [CSS Grid Cards](/ui-snippets/css-grid-cards) snippet to teach intrinsic layout as a system.',
      },
      {
        icon: 'FORM',
        title: 'Embeddable widgets and third-party surfaces',
        desc: 'Anything embedded — checkout widgets, booking modules, newsletter cards, chat launchers — renders into a host-controlled slot whose width you cannot predict or query. Media queries are useless there (the host viewport tells you nothing about your iframe or mount point); container queries are the only correct tool. Ship the widget with its container wrapper and tiered layouts, and it renders sensibly from a 250px blog sidebar to a 700px article body without a single line of host-specific configuration.',
      },
      {
        icon: 'CSS',
        title: 'Replacing JS resize observers with pure CSS',
        desc: 'Many codebases carry ResizeObserver + class-toggling machinery ("if width < 400 add .compact") written before container queries shipped — dozens of lines of JS, layout thrash on resize, SSR flashes before hydration. This snippet shows the deletion path: the .compact class becomes base styles, the observer becomes a @container block, and the JS disappears (note this demo\'s only observer exists for the readout label, not the layout). The result renders correctly on first server paint, with no hydration dependency — a real performance and correctness win.',
      },
      { icon: 'CODE', title: 'Related: Howler Audio Player + Visualizer', desc: 'See the [Howler Audio Player + Visualizer](/ui-snippets/howler-audio-player-visualizer/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'When should I use container queries instead of media queries?',
        a: 'Use container queries for components and media queries for page scaffolding. The page-level grid — how many columns the app shell has, whether the sidebar collapses, navigation switching to a hamburger — is genuinely a viewport concern and stays with media queries. Everything that renders *inside* a slot of that scaffolding (cards, widgets, forms, media objects, tables) should respond to its slot via container queries, because the same component appears at different widths on one screen and viewport width tells it nothing useful. A practical migration heuristic: any media query that exists to restyle one component (rather than restructure the page) is a container query wearing the wrong syntax, and any width-watching ResizeObserver that toggles classes is one too.',
      },
      {
        q: 'Why does container-type: inline-size impose containment, and what are the gotchas?',
        a: 'Containment breaks the circular dependency that made container queries "impossible" for years: if children could size their container while the container\'s size determines the children\'s styles, layout could oscillate forever. Declaring inline-size containment promises the browser the container\'s width is determined by its own context (its parent, its explicit width) and never by its contents. The practical gotchas that follow: a container can no longer shrink-wrap its content\'s width, so don\'t make inline-sized wrappers of things like buttons that should size to their label; height-based queries need container-type: size, which additionally contains height and will collapse a container that has no explicit height; and the container element itself cannot be styled by its own query (queries match descendants only), so the wrapper div stays deliberately unstyled — exactly why this snippet uses a dedicated .card-container around the card rather than making the card query itself.',
      },
      {
        q: 'What is browser support like, and do I need a fallback?',
        a: 'Container size queries and container units have been supported in all evergreen browsers since February 2023 (Chrome/Edge 105+, Safari 16+, Firefox 110+) — global support now sits above 93%, so for most products no fallback is needed. Where you must serve older browsers, the degradation story is graceful by construction: browsers that don\'t understand @container simply keep the base (narrow/stacked) layout, which is fully functional — the same posture as mobile-first media queries. You can also gate enhancements with @supports (container-type: inline-size) { … } if you want to apply alternative media-query-based styling only where container queries are absent. Style queries (@container style(--variant: featured)) are newer and Chromium-only as of 2026 — treat those as progressive enhancement, but size queries like this snippet uses are production-safe everywhere.',
      },
      {
        q: 'How does this translate to Tailwind CSS, React, or Angular?',
        a: 'Tailwind has first-class support (built into v4; the official @tailwindcss/container-queries plugin for v3): mark the wrapper with @container (or @container/card to name it) and prefix utilities with the breakpoint — <div class="@container/card"><article class="flex flex-col @[340px]/card:flex-row @[480px]/card:gap-2.5">…</article></div>; arbitrary container units work as text-[clamp(14px,6cqi,19px)]. In React and Angular the mechanism is pure CSS, so nothing framework-specific is required — the component ships as markup plus stylesheet with no resize listeners, no width props, and no hydration concerns, which is precisely its advantage over JS-measured responsive components; in Angular, put the @container rules in the component\'s styles with ViewEncapsulation intact since the queries only need to match descendants. The only JS in this snippet (pointer-capture drag and the ResizeObserver readout) is demo apparatus you drop entirely in production.',
      },
    ],
    aiPrompt: {
      paragraph: `Container queries are best learned by breaking this demo, and an AI assistant makes that fast: paste the snippet into Claude and ask why the card needs a dedicated wrapper with container-type instead of declaring it on the card itself, what happens if you delete container-name and nest this card inside another container, and why the drag playground's JS would be entirely unnecessary in production. Then aim it at your codebase: give it one of your components that takes a size="sm|md|lg" prop and ask it to refactor the variants into @container tiers so the prop disappears — that refactor is the single highest-leverage use of this pattern. Ask it to hunt for width-watching ResizeObservers in your code that container queries could delete, to convert this card's CSS into Tailwind @container syntax for your stack, and to propose honest breakpoint values by reasoning from your component's content rather than device sizes. You'll get the mental model and a migration plan out of one conversation.`,
      prompt: `Build a container-query product card demo in plain HTML, CSS, and JavaScript that proves component-level responsiveness — one markup, three layouts, driven by container width rather than viewport width.

Requirements:
- A product card (gradient art area with a discount badge, title, description, a three-item meta list, price with strikethrough original, and an add-to-cart button) wrapped in a dedicated container element declaring container-type: inline-size and a container-name.
- Author mobile-first: the base styles render a stacked compact layout with the description hidden and only the first meta item visible; at a ~340px container breakpoint switch to a horizontal media/body split and reveal the description; at ~480px widen the media, turn the meta list into an inline row showing all items, and open up padding and button sizing — the breakpoints must change information hierarchy, not merely scale.
- Give the title fluid typography with clamp() using the cqi container unit so it scales continuously with the container between fixed bounds.
- Build a drag-to-resize playground around the card: a grip on the right edge draggable via Pointer Events with setPointerCapture, clamping the width between ~230px and the parent's width — and note in a comment that this JS is demo apparatus only, since the responsive behaviour itself is pure CSS.
- Add a live readout beneath the playground driven by a ResizeObserver on the container (not by drag events, so window resizes also update it) reporting the current container width in pixels and which named layout tier is active.
- Render the identical card markup a second time inside a fixed ~240px column on the same page, demonstrating that each instance responds to its own container independently of the viewport.
- Comment the CSS explaining why container-type imposes size containment, why queries target descendants rather than the container itself, and when to reach for named containers.`,
    },
  },
};

export default containerQueryCard;
