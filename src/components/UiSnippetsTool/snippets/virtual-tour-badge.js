const virtualTourBadge = {
  id: 'virtual-tour-badge',
  title: 'Virtual Tour Badge',
  lastmod: '2026-08-22',
  category: 'cards',
  cdnUrls: [],
  html: `<div class="vtb-wrap">
  <figure class="vtb-photo">
    <button class="vtb-badge" id="vtbBadge" type="button" aria-expanded="false">
      <span class="vtb-play" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"></path></svg>
      </span>
      <span class="vtb-label">360&deg; Virtual Tour</span>
    </button>
    <div class="vtb-preview" id="vtbPreview" role="status">
      <div class="vtb-preview-shot"></div>
      <p class="vtb-preview-text">Tap to explore all 12 rooms in 360&deg;</p>
    </div>
  </figure>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c0f14;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px}
.vtb-wrap{width:100%;max-width:380px}
.vtb-photo{position:relative;aspect-ratio:4/3;border-radius:16px;overflow:visible;background:linear-gradient(135deg,#25324a,#141a26 70%);border:1px solid #232a38;box-shadow:0 18px 40px rgba(0,0,0,.35)}
.vtb-photo::before{content:'';position:absolute;inset:0;border-radius:16px;background:repeating-linear-gradient(115deg,rgba(255,255,255,.04) 0 2px,transparent 2px 46px);pointer-events:none}

.vtb-badge{position:absolute;left:12px;bottom:12px;display:flex;align-items:center;gap:8px;background:rgba(10,12,18,.72);backdrop-filter:blur(4px);border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:8px 14px 8px 8px;color:#fff;cursor:pointer;transition:background .15s,transform .15s;z-index:2}
.vtb-badge:hover,.vtb-badge:focus-visible{background:rgba(10,12,18,.9);transform:translateY(-1px)}
.vtb-play{width:26px;height:26px;border-radius:50%;background:#6366f1;display:flex;align-items:center;justify-content:center;flex-shrink:0;position:relative}
.vtb-play::after{content:'';position:absolute;inset:-4px;border-radius:50%;border:1.5px solid rgba(99,102,241,.55);animation:vtbPulse 2.2s ease-out infinite}
.vtb-play svg{width:13px;height:13px;margin-left:1px}
.vtb-label{font-size:12.5px;font-weight:700;letter-spacing:.01em;white-space:nowrap}

@keyframes vtbPulse{0%{transform:scale(1);opacity:.9}100%{transform:scale(1.6);opacity:0}}

.vtb-preview{position:absolute;left:12px;bottom:calc(100% + 10px);width:220px;background:#141822;border:1px solid #2a3244;border-radius:12px;padding:10px;box-shadow:0 16px 36px rgba(0,0,0,.45);opacity:0;visibility:hidden;transform:translateY(8px) scale(.97);transform-origin:bottom left;transition:opacity .18s,transform .18s,visibility .18s}
.vtb-badge[aria-expanded="true"] + .vtb-preview,
.vtb-photo:hover .vtb-preview{opacity:1;visibility:visible;transform:translateY(0) scale(1)}
.vtb-preview-shot{aspect-ratio:16/10;border-radius:8px;background:conic-gradient(from 200deg,#3a2a5c,#1c2942,#123a4a,#3a2a5c);position:relative;overflow:hidden}
.vtb-preview-shot::after{content:'';position:absolute;inset:0;border:2px dashed rgba(255,255,255,.35);border-radius:50%;transform:scale(1.4) translateY(20%)}
.vtb-preview-text{font-size:11.5px;color:#a5adc0;margin-top:8px;line-height:1.4}`,

  js: `var badge = document.getElementById('vtbBadge');

// Touch/keyboard users toggle the preview; mouse users also get it on hover via CSS.
badge.addEventListener('click', function () {
  var open = badge.getAttribute('aria-expanded') === 'true';
  badge.setAttribute('aria-expanded', String(!open));
});

document.addEventListener('click', function (e) {
  if (!badge.contains(e.target)) badge.setAttribute('aria-expanded', 'false');
});`,

  seo: {
    title: 'Virtual Tour Badge — Free 360° Media Overlay UI Snippet',
    description: `A hover/tap overlay badge that flags a 360° virtual tour on a listing photo, with a play-icon pulse and an expanding preview thumbnail. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Virtual Tour Badge — Flagging Richer Media Without Leaving the Grid',
      description: `Real-estate and e-commerce listings increasingly offer more than a flat photo — a 360° walkthrough, a product spin, a video tour — but that richer media is worthless if shoppers never notice it's available. The virtual tour badge is the small, unmissable overlay that sits on the photo itself and says "there's more here," with a pulsing play affordance and a hover-expand preview that gives a taste of the tour before committing to the click.

**A pill badge that reads as a button, not a label**

The badge combines a pulsing play-icon circle with a short label ("360° Virtual Tour") inside one rounded, semi-transparent pill anchored to the photo's bottom-left corner. It's a real \`<button>\`, so it's keyboard-focusable and announces correctly to assistive tech, unlike the \`<div>\`-with-an-onclick pattern that quietly breaks keyboard access. The same accessible-overlay-button approach shows up in [virtual try-on button](/ui-snippets/product-quick-view/) and other richer-media affordances layered on top of a static image.

**A ring pulse that draws the eye without being obnoxious**

The play icon's circular background carries a single expanding, fading ring (\`@keyframes vtbPulse\`) that loops every 2.2 seconds — long enough to register as "this is interactive and has motion" without becoming a distraction the way a fast, tight pulse would. It's pure CSS, so it costs nothing at runtime and never drifts out of sync.

**Hover-expand preview, no extra request**

Hovering (or tapping, via \`aria-expanded\`) the badge expands a small preview card above it showing a stylized 360° capture — a conic-gradient panorama with a dashed ellipse suggesting the camera's spherical field of view — plus a one-line description of what the tour covers. The preview is positioned and animated with \`opacity\`/\`transform\`/\`visibility\`, so it never affects the photo grid's layout while closed.

**Works for touch and keyboard, not just hover**

Because real hover doesn't exist on touchscreens, the badge also toggles an \`aria-expanded\` state on click/tap that the CSS listens for identically to \`:hover\` — so a tap opens the preview, and a document-level click listener closes it when the user taps elsewhere. This dual-trigger pattern is what keeps a "hover for more" UI from being a desktop-only feature; pair it with the same photo used in a [property listing card](/ui-snippets/property-listing-card/) or an e-commerce [product quick view](/ui-snippets/product-quick-view/) to flag richer media on either.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A photo placeholder renders with a pulsing "360° Virtual Tour" badge in the corner.` },
      { title: 'Hover the badge', text: `A preview card expands above it with a stylized panorama shot and a description.` },
      { title: 'Tap it on touch', text: `Tapping toggles the same preview via aria-expanded; tapping elsewhere closes it.` },
      { title: 'Watch the play icon', text: `A ring pulses outward continuously to signal the affordance is interactive.` },
      { title: 'Wire up the click', text: `On badge click, open your real tour viewer or embed instead of just previewing.` },
      { title: 'Reposition it', text: `Move .vtb-badge to any photo corner; the preview anchors relative to it.` },
    ] },
    features: [
      { title: 'Accessible overlay button', text: `A real <button> with aria-expanded, not a div with an onclick.` },
      { title: 'Looping ring pulse', text: `A pure-CSS expanding ring signals motion without a script or GIF.` },
      { title: 'Hover-expand preview', text: `A panorama preview and description expand above the badge on hover.` },
      { title: 'Touch and keyboard support', text: `aria-expanded toggling mirrors :hover for non-mouse input.` },
      { title: 'Outside-click dismissal', text: `A document listener closes the preview when focus moves elsewhere.` },
      { title: 'Zero layout shift', text: `The closed preview is absolutely positioned and never affects photo flow.` },
      { title: 'CSS-only panorama art', text: `A conic-gradient plus a dashed ellipse fakes a 360° capture with no image.` },
      { title: 'Drop onto any photo', text: `A self-contained overlay that layers onto an existing image or placeholder.` },
    ],
    useCases: [
      { title: 'Real estate listing photos', text: `Flag which photos on a [property listing card](/ui-snippets/property-listing-card/) have a full walkthrough.` },
      { title: 'E-commerce product galleries', text: `Signal a 360° spin view on a [product quick view](/ui-snippets/product-quick-view/) image.` },
      { title: 'Hotel and venue galleries', text: `Highlight rooms with an immersive tour inside a [hotel room picker](/ui-snippets/hotel-room-picker/).` },
      { title: 'Vehicle listing photos', text: `Mark cars with an interior 360° view, alongside a rental class card.` },
      { title: 'Event venue browsing', text: `Show which venue photos include a walkable virtual tour.` },
      { title: 'Museum and exhibit previews', text: `Flag exhibits with an immersive online walkthrough available.` },
    ],
    faqs: [
      { q: 'Why is the badge a button instead of a styled div?', a: `A real <button> is focusable by Tab, activatable with Enter or Space, and announced correctly by screen readers by default — none of which a <div> with a click handler gets without extra ARIA plumbing and manual key handling. Since this badge triggers an action (opening a tour), it belongs in the accessibility tree as an actual control.` },
      { q: 'How does the preview work on touch devices that have no hover?', a: `The badge listens for a click/tap and toggles its aria-expanded attribute between true and false. The CSS selector [aria-expanded="true"] + .vtb-preview shows the preview identically to the :hover rule used for mouse users, so both input types reach the same visual state. A document-level click listener closes the preview when a tap lands outside the badge.` },
      { q: 'How do I connect the badge to a real 360° tour viewer?', a: `Add your click handler logic where the aria-expanded toggle happens — instead of (or in addition to) opening the CSS preview, launch your tour viewer (an embedded Matterport/Kuula iframe, a custom panorama library, or a modal). Keep the aria-expanded toggle for the lightweight preview state even if the full tour opens in a separate modal.` },
      { q: 'Can I use this badge for media other than virtual tours?', a: `Yes — the pattern (pulsing icon, label, hover-expand preview) works for any "there's more here" flag: a product video, a floor plan overlay, a drone photo, or a 3D model viewer. Swap the play-icon SVG and label text, and change the preview's mock content to match what the flagged media actually is.` },
      { q: 'How do I use this virtual tour badge in React, Vue, or Angular?', a: `Keep it a real button bound to a boolean open state (useState in React, a ref in Vue) driving aria-expanded, and conditionally render or CSS-toggle the preview from that same state. Add an outside-click handler via a document listener in a mount effect, cleaned up on unmount, mirroring the vanilla document.addEventListener pattern shown here.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the dual hover/tap trigger on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the preview card listens to both the CSS :hover pseudo-class and the badge's aria-expanded attribute rather than picking just one, and how that combination keeps the "hover for more" pattern usable on touchscreens where true hover doesn't exist. The same assistant can help optimize it — ask whether the outside-click listener on document should instead use a focusout handler for better keyboard support, or whether the ring pulse animation should pause when the preview is open to reduce visual noise. It's also useful for extending the badge: ask it to wire the click into a real Matterport or custom panorama embed inside a modal, add a small "12 rooms" count pulled from real data, or build a second badge variant for flagging video instead of a 360° tour. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "virtual tour badge" overlay for a photo card in plain HTML, CSS, and JavaScript — no frameworks, no external images or video.

Requirements:
- A photo placeholder area (built from CSS gradients only, no real image) with an overlay badge pinned to one corner, combining a small circular play-icon button and a short text label ("360° Virtual Tour") inside one pill-shaped element.
- The badge must be a real <button> element (for keyboard focus and screen-reader semantics), not a div with a click handler, and must expose an aria-expanded attribute reflecting whether its preview is open.
- The play icon's circular background must have a continuously looping CSS-only pulse: a ring that expands outward and fades, timed slowly enough (roughly 2 seconds per cycle) to read as "interactive" without being distracting — implemented with @keyframes and no JavaScript-driven animation loop.
- A preview panel (built from CSS only, representing a stylized 360° panorama capture, not a real image) must expand above the badge on mouse hover via the :hover pseudo-class AND independently via the button's aria-expanded="true" state, so the exact same preview works for both mouse-hover users and touch/keyboard users who toggle it by tapping or activating the button.
- Add a document-level click listener that resets aria-expanded to false when a click lands outside the badge, so the preview closes when focus moves elsewhere on touch devices.
- The closed preview must not affect the surrounding layout at all (position it absolutely, animate only opacity/transform/visibility) so it never shifts other photos in a grid when opening or closing.`,
    },
  },
};

export default virtualTourBadge;
