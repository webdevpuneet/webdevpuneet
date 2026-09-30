const hoverExpandGallery = {
  id: 'hover-expand-gallery',
  title: 'Hover Expand Gallery',
  lastmod: '2026-07-18',
  category: 'media',
  html: `<div class="he-gallery" id="heGallery">
  <div class="he-panel is-open" style="--g:linear-gradient(160deg,#f97316,#db2777)" data-title="Kyoto">
    <span class="he-cap">Kyoto</span>
  </div>
  <div class="he-panel" style="--g:linear-gradient(160deg,#6366f1,#06b6d4)" data-title="Reykjavik">
    <span class="he-cap">Reykjavik</span>
  </div>
  <div class="he-panel" style="--g:linear-gradient(160deg,#10b981,#84cc16)" data-title="Patagonia">
    <span class="he-cap">Patagonia</span>
  </div>
  <div class="he-panel" style="--g:linear-gradient(160deg,#8b5cf6,#ec4899)" data-title="Marrakesh">
    <span class="he-cap">Marrakesh</span>
  </div>
  <div class="he-panel" style="--g:linear-gradient(160deg,#0ea5e9,#6366f1)" data-title="Lofoten">
    <span class="he-cap">Lofoten</span>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0b12;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.he-gallery{display:flex;gap:10px;width:min(720px,94vw);height:300px}
.he-panel{position:relative;flex:1;min-width:46px;border-radius:16px;background:var(--g);cursor:pointer;overflow:hidden;flex-grow:1;transition:flex-grow .5s cubic-bezier(.22,1,.36,1)}
.he-panel.is-open{flex-grow:6}
.he-panel::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.55),transparent 55%)}
.he-cap{position:absolute;left:14px;bottom:14px;z-index:1;color:#fff;font-size:18px;font-weight:700;letter-spacing:.01em;white-space:nowrap;opacity:0;transform:translateY(8px);transition:opacity .3s .12s,transform .3s .12s}
.he-panel.is-open .he-cap{opacity:1;transform:none}`,

  js: `var gallery = document.getElementById('heGallery');
var panels = Array.prototype.slice.call(gallery.querySelectorAll('.he-panel'));

function open(panel) {
  panels.forEach(function (p) { p.classList.toggle('is-open', p === panel); });
}

panels.forEach(function (panel) {
  // Expand on hover for pointers, and on click/tap for touch devices.
  panel.addEventListener('mouseenter', function () { open(panel); });
  panel.addEventListener('click', function () { open(panel); });
});`,

  seo: {
    title: 'Hover Expand Gallery — Free HTML CSS JS Accordion Gallery',
    description: `A horizontal image accordion whose panels expand on hover to reveal a caption, built with flex-grow transitions. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Hover Expand Gallery — A Horizontal Flex Accordion',
      description: `The hover expand gallery is the horizontal image accordion where hovering a slim panel makes it grow to fill most of the row while its neighbours shrink, revealing a caption as it opens. This snippet builds it with plain HTML, CSS flexbox transitions, and a tiny vanilla JavaScript class toggle — no widths to calculate and no library.

**Flex-grow does the layout**

All panels live in a flex row and share the available space through \`flex-grow\`. At rest every panel has the same grow value; the open panel is given a much larger one (\`flex-grow: 6\` versus \`1\`). Because the panels divide the row proportionally, raising one panel's grow automatically squeezes the others — you never set explicit pixel widths, so the gallery is fully responsive and adapts to any container size. A \`min-width\` keeps the collapsed panels wide enough to remain clickable.

**Animating an intrinsic property**

The expansion is animated by putting a \`transition\` on \`flex-grow\` itself with an ease-out cubic-bezier, so the panels glide between their collapsed and expanded sizes. Animating \`flex-grow\` (rather than \`width\`) is what lets the whole row rebalance smoothly in one motion: as the active panel grows, the rest contract in the same frame because they're all sharing the same flexible space.

**Revealing the caption**

Each panel's caption starts hidden — \`opacity: 0\` and nudged down with \`translateY\` — and only animates in when the panel gains the \`is-open\` class, with a small delay so the text appears after the panel has begun widening. This staggering makes the label feel like it belongs to the expansion rather than popping in abruptly. A bottom gradient overlay (\`::after\`) keeps the white caption readable over any panel colour.

**One class, mutually exclusive**

The JavaScript is deliberately minimal: an \`open()\` function toggles a single \`is-open\` class so exactly one panel is expanded at a time, and everything else — sizing, caption reveal, overlay — is driven by CSS from that one class. This keeps the logic trivial and the animation entirely declarative.

**Hover and touch**

Panels expand on \`mouseenter\` for pointer devices and also on \`click\`, so the gallery works on touchscreens where there is no hover — a tap opens a panel just as a hover does on desktop. This dual binding is the simple, reliable way to make a hover effect usable everywhere.

**Customizing it**

Swap the gradient backgrounds for real images via \`background-image\`, change the open grow ratio for a more or less dramatic expansion, adjust the timing, or add more panels — the flex math handles any count. Pair it with an [image accordion](/ui-snippets/image-accordion/), a [photo gallery](/ui-snippets/photo-gallery/), or a [scroll snap gallery](/ui-snippets/scroll-snap-gallery/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Five colored panels render with one open.` },
      { title: 'Hover a panel', text: `It expands and the others shrink smoothly.` },
      { title: 'See the caption', text: `The label fades in as the panel opens.` },
      { title: 'Tap on mobile', text: `A tap opens a panel where hover is absent.` },
      { title: 'Use real images', text: `Set background-image on each panel.` },
      { title: 'Tune the spread', text: `Change the open panel's flex-grow ratio.` },
    ] },
    features: [
      { title: 'Flex-grow layout', text: `Panels share the row — no pixel widths.` },
      { title: 'Smooth rebalance', text: `Transitioned flex-grow expands and contracts.` },
      { title: 'Caption reveal', text: `Label fades in with a slight delay.` },
      { title: 'Readability overlay', text: `Bottom gradient keeps text legible.` },
      { title: 'One-class logic', text: `A single is-open class drives everything.` },
      { title: 'Hover and tap', text: `Works on pointers and touchscreens.` },
      { title: 'Fully responsive', text: `Adapts to any container width.` },
      { title: 'Any panel count', text: `Flex math handles however many you add.` },
    ],
    useCases: [
      { title: 'Travel & portfolio', text: `An expressive [photo gallery](/ui-snippets/photo-gallery/) alternative.` },
      { title: 'Feature reveals', text: `Pair with an [image accordion](/ui-snippets/image-accordion/).` },
      { title: 'Category pickers', text: `Visual nav above a [scroll snap gallery](/ui-snippets/scroll-snap-gallery/).` },
      { title: 'Hero sections', text: `A striking band under a [minimal hero](/ui-snippets/minimal-hero/).` },
      { title: 'Case studies', text: `Showcase projects beside a [team card](/ui-snippets/team-card/).` },
      { title: 'Product lines', text: `Expand collections near a [product card](/ui-snippets/product-card/).` },
      { icon: 'CODE', title: 'Related: Paper.js Vector Blob', desc: 'See the [Paper.js Vector Blob](/ui-snippets/paper-js-vector-blob/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why animate flex-grow instead of width?', a: `All panels share the row through flex-grow, so raising one panel's grow value automatically squeezes the others within the same flexible space. Transitioning flex-grow lets the whole row rebalance in one smooth motion, and because no pixel widths are set, the gallery stays fully responsive to its container.` },
      { q: 'How does the caption time its reveal?', a: `Each caption starts at opacity 0 and nudged down with translateY. When the panel gains the is-open class, the caption transitions in with a short delay, so it appears just after the panel begins widening. That stagger makes the label feel part of the expansion rather than popping in abruptly.` },
      { q: 'Does it work on touch devices?', a: `Yes. Panels expand on mouseenter for pointers and also on click, so a tap opens a panel on touchscreens where hover does not exist. Binding both events is the simplest reliable way to make the hover behaviour usable on mobile and desktop alike.` },
      { q: 'How do I show only one panel open at a time?', a: `The open function toggles a single is-open class so exactly one panel carries it. All sizing, the caption reveal, and the overlay are driven by CSS from that one class, which keeps the JavaScript trivial and the animation entirely declarative.` },
      { q: 'How do I use this hover expand gallery in React, Vue, or Angular?', a: `Keep the open index in state and render panels from an array, applying the is-open class where the index matches. Bind onMouseEnter and onClick to set the index. All the animation is CSS, so nothing else changes; in Tailwind use grow utilities with arbitrary flex-grow values and a transition on flex-grow.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the flexbox math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why transitioning flex-grow instead of width lets every panel rebalance in one smooth motion, or why the caption's opacity transition has a small delay baked into its transition property rather than firing at the same instant the panel starts expanding. The same assistant is useful for optimizing it — ask whether toggling a class on every panel in the array on each hover (as the open function does) is more or less efficient than only touching the two panels whose state actually changed. It's just as handy for extending the gallery: ask it to auto-cycle through panels on a timer when the user isn't interacting, load real images with lazy loading instead of gradient placeholders, or make the expansion ratio configurable per panel instead of a single shared value. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a horizontal hover-expand image accordion in plain HTML, CSS, and JavaScript using flexbox — no explicit pixel widths, no library.

Requirements:
- A row of flex panels, each given the same flex-grow value at rest and a min-width so collapsed panels stay wide enough to remain clickable and hoverable.
- Give every panel a CSS transition on the flex-grow property itself (not on width) with an ease-out timing curve, so that when one panel's flex-grow is increased, every other panel in the row visibly and smoothly shrinks in the same motion as the row rebalances.
- Exactly one panel should carry an "open" state class at any time, which raises its flex-grow to a much larger value than the resting panels (creating a dominant expanded panel among slim collapsed ones).
- Each panel must contain a caption that starts fully transparent and shifted downward by a few pixels, and only transitions to fully visible and its resting position when that panel carries the open class, with the caption's own transition delayed slightly so it visibly follows after the panel begins expanding rather than appearing instantly.
- Add a semi-transparent dark gradient overlay along the bottom of every panel so a white caption text stays legible regardless of the panel's background color or image.
- Wire both a mouseenter listener (for pointer devices) and a click listener (for touch devices where hover doesn't exist) on every panel, both calling the same function that marks that one panel open and every other panel not open.`,
    },
  },
};

export default hoverExpandGallery;
