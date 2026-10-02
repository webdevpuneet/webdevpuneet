const splideThumbnailGallery = {
  id: 'splide-thumbnail-gallery',
  title: 'Splide Thumbnail Gallery',
  lastmod: '2026-08-02',
  category: 'carousels',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css',
    'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js',
  ],
  html: `<div class="stg-wrap">
  <div class="stg-head">
    <span class="stg-tag">splide · two synced sliders</span>
    <h2>Aurora Chair</h2>
  </div>

  <div id="stgMain" class="splide stg-main" aria-label="Product images">
    <div class="splide__track">
      <ul class="splide__list">
        <li class="splide__slide"><div class="stg-shot v1"><span>Front</span></div></li>
        <li class="splide__slide"><div class="stg-shot v2"><span>Angle</span></div></li>
        <li class="splide__slide"><div class="stg-shot v3"><span>Detail</span></div></li>
        <li class="splide__slide"><div class="stg-shot v4"><span>Back</span></div></li>
        <li class="splide__slide"><div class="stg-shot v5"><span>In situ</span></div></li>
      </ul>
    </div>
  </div>

  <div id="stgThumbs" class="splide stg-thumbs" aria-label="Choose an image">
    <div class="splide__track">
      <ul class="splide__list">
        <li class="splide__slide"><div class="stg-thumb v1"></div></li>
        <li class="splide__slide"><div class="stg-thumb v2"></div></li>
        <li class="splide__slide"><div class="stg-thumb v3"></div></li>
        <li class="splide__slide"><div class="stg-thumb v4"></div></li>
        <li class="splide__slide"><div class="stg-thumb v5"></div></li>
      </ul>
    </div>
  </div>

  <p class="stg-note">Drag the main image, or pick a thumbnail — both sliders stay in step.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f5f6fa;color:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.stg-wrap{width:min(560px,94vw)}
.stg-head{margin-bottom:16px}
.stg-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#0d9488;background:#ccfbf1;border:1px solid #99f6e4;padding:5px 11px;border-radius:99px;margin-bottom:10px}
.stg-head h2{font-size:clamp(22px,4.4vw,30px);font-weight:800;letter-spacing:-.02em}

.stg-main{border-radius:18px;overflow:hidden;box-shadow:0 24px 54px -28px rgba(15,23,42,.5)}
.stg-shot{position:relative;height:340px;display:flex;align-items:flex-end;padding:20px}
.stg-shot span{font-size:12px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#fff;background:rgba(15,23,42,.4);backdrop-filter:blur(6px);padding:7px 14px;border-radius:99px}

.stg-thumbs{margin-top:12px}
.stg-thumb{height:60px;border-radius:11px;cursor:pointer;opacity:.45;transition:opacity .2s,transform .2s}
.stg-thumbs .splide__slide:hover .stg-thumb{opacity:.8}
/* Splide adds is-active to the current navigation slide — that is the hook. */
.stg-thumbs .splide__slide.is-active .stg-thumb{opacity:1;transform:translateY(-2px);box-shadow:0 0 0 2px #0d9488}

.v1{background:linear-gradient(140deg,#c7d2fe,#6366f1)}
.v2{background:linear-gradient(140deg,#a7f3d0,#0d9488)}
.v3{background:linear-gradient(140deg,#fed7aa,#ea580c)}
.v4{background:linear-gradient(140deg,#e9d5ff,#a855f7)}
.v5{background:linear-gradient(140deg,#bae6fd,#0284c7)}

.stg-main .splide__arrow{background:rgba(255,255,255,.92);opacity:1;height:38px;width:38px;box-shadow:0 4px 14px -4px rgba(15,23,42,.5)}
.stg-main .splide__arrow svg{fill:#0f172a;height:15px}
.stg-main .splide__arrow:disabled{opacity:.35}

.stg-note{font-size:13px;color:#64748b;margin-top:16px;line-height:1.6}`,

  js: `var main = new Splide('#stgMain', {
  type: 'loop',
  perPage: 1,
  pagination: false,
  arrows: true,
  speed: 520,
  dragAngleThreshold: 40
});

var thumbs = new Splide('#stgThumbs', {
  // isNavigation is what turns these slides into clickable controls and
  // gives the current one an .is-active class to style against.
  isNavigation: true,
  fixedWidth: 92,
  fixedHeight: 60,
  gap: 10,
  rewind: true,
  pagination: false,
  arrows: false,
  focus: 'center',
  isActiveOnFocus: true,
  breakpoints: {
    480: { fixedWidth: 68, fixedHeight: 46, gap: 8 }
  }
});

// sync() must run BEFORE either slider is mounted — it wires the internal
// events, and a mounted instance has already missed them.
main.sync(thumbs);
main.mount();
thumbs.mount();`,

  seo: {
    title: 'Splide Thumbnail Gallery — Two Synced Sliders',
    description: 'A product gallery where a main slider and thumbnail strip stay in step using the one-line Splide sync API. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Splide Thumbnail Gallery — How Slider Syncing Actually Works',
      description: `Every product page needs the same thing: a large image, a row of thumbnails below it, and both staying in agreement no matter which one you touch. Hand-building it means writing two carousels and then a third layer of code to keep their indexes reconciled — and that reconciliation layer is where the bugs live. Click a thumbnail while the main slider is mid-transition, or drag past the loop boundary, and the two drift apart.

**Splide** solves this with a first-class API rather than a workaround, and it does it in one line.

## sync(), and the ordering rule that breaks people

\`main.sync(thumbs);\`

That single call establishes a **bidirectional** relationship: moving the main slider moves the thumbnails, and clicking a thumbnail moves the main slider. There is no index bookkeeping to write and no event handlers to wire.

The critical detail is the order of the next three lines:

\`main.sync(thumbs); main.mount(); thumbs.mount();\`

\`sync()\` must be called **before either slider is mounted**. It works by subscribing to internal move events, and \`mount()\` is what fires the setup those subscriptions need to exist for. Call \`sync()\` after mounting and you get no error, no warning, and two completely independent sliders — which is a genuinely frustrating way to lose an hour, because everything looks correctly written.

## isNavigation is doing more than it sounds

\`isNavigation: true\` on the thumbnail slider is what converts its slides from passive content into **controls**. It makes each slide focusable and clickable, adds the correct ARIA roles so the strip announces itself as a set of controls rather than a second gallery, and — the part the CSS depends on — adds an \`is-active\` class to whichever slide matches the main slider's current index.

That class is the entire styling hook:

\`.stg-thumbs .splide__slide.is-active .stg-thumb { opacity: 1; transform: translateY(-2px); box-shadow: 0 0 0 2px #0d9488 }\`

Inactive thumbnails sit at 45% opacity, hover lifts them to 80%, and the active one goes fully opaque with a ring and a small rise. Using opacity as the primary signal rather than a border is deliberate: borders change an element's box and can shift the strip by a pixel as selection moves.

\`isActiveOnFocus: true\` extends the same behavior to keyboard focus, so tabbing through the strip previews each image rather than requiring a click.

## focus: center, and why it matters with many images

\`focus: 'center'\` keeps the active thumbnail in the middle of the visible strip rather than wherever it happens to fall. With five images it is a nicety. With twenty it is essential — without it, the active thumbnail eventually sits at the edge of the viewport or scrolls out of view entirely, and the user loses track of where they are in the set.

\`fixedWidth\` and \`fixedHeight\` are the right sizing choice for thumbnails specifically. \`perPage\` would divide the available width by a slide count, so thumbnails would resize as the viewport changes; fixed dimensions keep them a consistent, predictable size and simply show more or fewer as space allows. The \`breakpoints\` block shrinks them below 480px so a phone still shows several rather than two enormous ones.

## The main slider's settings

\`type: 'loop'\` lets the gallery wrap from last to first, which is expected behavior in a product viewer. Splide handles the slide cloning internally, and \`sync()\` correctly maps cloned indexes back to real ones — one of the specific things that is painful to get right by hand.

\`dragAngleThreshold: 40\` is a mobile detail worth knowing. It sets how many degrees off horizontal a drag can be before Splide ignores it and lets the page scroll instead. The default is tighter; raising it to 40 means a slightly diagonal swipe still changes the image, while a mostly-vertical one scrolls the page. Getting this wrong produces a gallery that either steals every scroll attempt or feels unresponsive to swipes.

## Reusing it

Replace the gradient placeholders with real \`<img>\` tags — keep the \`.splide__track\` and \`.splide__list\` structure exactly, since Splide queries for those class names specifically. Add \`loading="lazy"\` to everything except the first image. For a lightbox on click, pair it with an [image lightbox](/ui-snippets/image-lightbox/); for a zoom-on-hover detail view, an [image magnifier](/ui-snippets/image-magnifier/) sits naturally over the main slide.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add both Splide CDNs', text: 'Splide needs its core CSS as well as its JS — include both.' },
      { title: 'Paste HTML, CSS, and JS', text: 'A main gallery renders above a synced thumbnail strip.' },
      { title: 'Drag the main image', text: 'The thumbnail strip follows and re-centers the active thumb.' },
      { title: 'Click a thumbnail', text: 'The main slider jumps to it — the sync is bidirectional.' },
      { title: 'Tab through the strip', text: 'isActiveOnFocus previews each image on keyboard focus.' },
      { title: 'Swap in real images', text: 'Replace the gradient divs with img tags inside the same structure.' },
    ] },
    features: [
      { title: 'One-line bidirectional sync', text: 'main.sync(thumbs) replaces all manual index reconciliation.' },
      { title: 'Correct mount ordering', text: 'sync() before mount(), the rule that silently breaks syncing.' },
      { title: 'Thumbnails as real controls', text: 'isNavigation adds focus, click handling and ARIA roles.' },
      { title: 'is-active styling hook', text: 'Splide marks the current thumb so CSS can highlight it.' },
      { title: 'Layout-safe selection', text: 'Opacity and ring shadow instead of a border that shifts the strip.' },
      { title: 'Centered active thumb', text: 'focus: center keeps the current image findable in long sets.' },
      { title: 'Fixed thumbnail sizing', text: 'fixedWidth/fixedHeight with a mobile breakpoint, not perPage.' },
      { title: 'Scroll-friendly dragging', text: 'dragAngleThreshold 40 distinguishes swipes from page scrolls.' },
    ],
    useCases: [
      { title: 'Ecommerce gallery with thumbnails', text: 'Build the standard ecommerce gallery with a large image above a row of thumbnails, kept in agreement by `main.sync(thumbs)` in one line.' },
      { title: 'Real estate listings', text: 'Show room-by-room photos where the thumbnail strip follows the main image, with `isNavigation` giving thumbnails focus, click handling and ARIA roles.' },
      { title: 'Project shot browsing', text: 'Step through project shots without a separate index tracker, with Splide marking the current thumbnail through an `is-active` class.' },
      { title: 'Variant and lightbox pairings', text: 'Pair with a [variant selector](/ui-snippets/variant-selector/) so colour choices change the images, or feed the active image into an [image lightbox](/ui-snippets/image-lightbox/).' },
      { title: 'Slider syncing reference', text: 'Learn why `sync()` must be called before `mount()`, the ordering rule that silently breaks synchronisation when reversed.' },
    ],
    faqs: [
      { q: 'Why must sync() be called before mount()?', a: 'sync() works by subscribing to the sliders internal move events, and mount() is what fires the setup those subscriptions depend on. Calling sync() after mounting produces no error and no warning — you simply get two independent sliders that ignore each other, which is hard to debug because the code looks correct.' },
      { q: 'What does isNavigation actually change?', a: 'It converts the thumbnail slides from passive content into controls: they become focusable and clickable, they get correct ARIA roles so assistive tech announces a set of controls rather than a second gallery, and the slide matching the main slider gets an is-active class, which is the hook the CSS uses for highlighting.' },
      { q: 'Why highlight the active thumbnail with opacity and a box-shadow instead of a border?', a: 'A border changes the element box model, so adding one to the active thumbnail can shift the whole strip by a pixel each time selection moves. Opacity plus an outset box-shadow ring costs no layout, so the strip stays perfectly still while the highlight moves.' },
      { q: 'What does focus: center do?', a: 'It keeps the active thumbnail centered in the visible strip rather than wherever it naturally falls. With five images it is cosmetic; with twenty it is essential, because otherwise the active thumbnail drifts to the edge or out of view and the user loses their place in the set.' },
      { q: 'Why use fixedWidth and fixedHeight rather than perPage for thumbnails?', a: 'perPage divides available width by a slide count, so thumbnails would grow and shrink with the viewport. Fixed dimensions keep them a consistent size and simply fit more or fewer as space allows, which is the correct behavior for a thumbnail strip. A breakpoint then shrinks them on small screens so a phone still shows several.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Official @splidejs/react-splide and @splidejs/vue-splide wrappers exist; with them you get refs to both instances and call sync in a mount effect, still before mounting completes. With the vanilla build, construct both instances in a mount effect, call sync then mount in that order, and call destroy() on both in cleanup so remounts do not leave orphaned listeners.' },
    ],
    aiPrompt: {
      paragraph: `This snippet is short but has one ordering rule that causes an unusual amount of pain, so it is worth having it explained rather than memorized. Paste the HTML, CSS, and JS into an AI assistant like Claude and ask it to explain why main.sync(thumbs) must come before main.mount() and thumbs.mount(), and what specifically happens internally if the order is reversed — then reverse it and confirm the sliders silently stop talking to each other. Ask it what isNavigation adds beyond click handling, especially the ARIA roles and the is-active class the CSS depends on. Then ask why the active thumbnail is highlighted with opacity and a box-shadow rather than a border, and what layout artifact a border would introduce. For optimization, ask how to lazy-load real images in this structure without breaking Splide measurement, and what dragAngleThreshold should be for a gallery inside a long scrolling page. To extend it: have it swap the gradient divs for real img tags with correct lazy-loading, add a lightbox on main-slide click, wire keyboard arrow support, or drive both sliders from a product data array. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a product image gallery with a main slider and a synced thumbnail strip using Splide 4 from a CDN — include BOTH its core CSS and its JS — in plain HTML, CSS, and JavaScript.

Requirements:
- Two Splide instances using the required markup structure exactly (.splide > .splide__track > .splide__list > .splide__slide), since Splide queries those class names specifically.
- Link them with a single main.sync(thumbs) call for bidirectional syncing, and CRITICALLY call sync() BEFORE mounting either instance — then mount main, then mount thumbs. Add a comment explaining that sync() subscribes to internal move events which mount() sets up, so calling sync after mount produces two silently independent sliders with no error or warning.
- Configure the thumbnail slider with isNavigation: true, and explain that this is what turns its slides into real controls: focusable, clickable, correctly ARIA-roled, and given an is-active class on the slide matching the main slider — which is the CSS styling hook.
- Style thumbnails so inactive ones sit around 45% opacity, hover raises them to about 80%, and the active one is fully opaque with a small upward translate and a ring drawn with box-shadow. Use opacity and box-shadow rather than a border, and explain that a border changes the box model and would shift the strip by a pixel every time selection moves.
- Set focus: 'center' on the thumbnail slider so the active thumb stays centered in the strip, and explain that this matters most with long image sets where the active thumb would otherwise drift out of view.
- Size thumbnails with fixedWidth and fixedHeight plus a breakpoint that shrinks them below 480px — not perPage — and explain that perPage would resize thumbnails with the viewport whereas fixed sizing keeps them consistent and simply fits more or fewer.
- Set isActiveOnFocus: true so keyboard tabbing through the strip previews each image without requiring a click.
- Give the main slider type: 'loop' and a dragAngleThreshold around 40, explaining that this controls how far off horizontal a drag can be before Splide ignores it and lets the page scroll — too tight feels unresponsive to swipes, too loose steals vertical scrolling.
- Use CSS gradient placeholder blocks instead of external image files, styled as a clean light product page.`,
    },
  },
};

export default splideThumbnailGallery;
