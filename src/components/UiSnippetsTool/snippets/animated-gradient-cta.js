const animatedGradientCta = {
  id: 'animated-gradient-cta',
  title: 'Animated Gradient CTA',
  lastmod: '2026-07-18',
  category: 'heroes',
  html: `<section class="ag-cta">
  <div class="ag-glow" aria-hidden="true"></div>
  <div class="ag-grain" aria-hidden="true"></div>
  <div class="ag-inner">
    <span class="ag-badge">✦ Limited beta</span>
    <h2 class="ag-title">Build interfaces<br>at the speed of thought</h2>
    <p class="ag-sub">Drop in production-ready components and ship your next idea this weekend — no design debt.</p>
    <form class="ag-form" id="agForm">
      <input type="email" class="ag-input" placeholder="you@company.com" required aria-label="Email address">
      <button type="submit" class="ag-btn">Get early access</button>
    </form>
    <p class="ag-note" id="agNote">Join 12,400 builders. No spam, ever.</p>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#06060a;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:30px 16px}

.ag-cta{position:relative;width:100%;max-width:680px;border-radius:26px;overflow:hidden;background:#0d0b1a;border:1px solid rgba(255,255,255,.08);padding:54px 30px;text-align:center;isolation:isolate}

.ag-glow{position:absolute;inset:-40%;z-index:-2;background:conic-gradient(from 0deg,#6366f1,#ec4899,#f59e0b,#22d3ee,#6366f1);filter:blur(70px);opacity:.55;animation:agSpin 9s linear infinite}
@keyframes agSpin{to{transform:rotate(360deg)}}
.ag-grain{position:absolute;inset:0;z-index:-1;opacity:.35;background-image:radial-gradient(rgba(255,255,255,.12) 1px,transparent 1px);background-size:4px 4px;mix-blend-mode:overlay}

.ag-inner{position:relative;z-index:1;display:flex;flex-direction:column;align-items:center;gap:16px}
.ag-badge{font-size:12px;font-weight:700;letter-spacing:.04em;color:#fbcfe8;background:rgba(236,72,153,.14);border:1px solid rgba(236,72,153,.35);padding:6px 13px;border-radius:999px}
.ag-title{font-size:clamp(28px,6vw,46px);font-weight:900;letter-spacing:-.03em;line-height:1.06;color:#fff}
.ag-sub{font-size:15px;color:#c7c7d9;max-width:440px;line-height:1.55}

.ag-form{display:flex;gap:9px;width:100%;max-width:420px;margin-top:6px}
.ag-input{flex:1;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.16);border-radius:12px;padding:13px 15px;font-family:inherit;font-size:14px;color:#fff;outline:none;transition:border-color .2s,box-shadow .2s}
.ag-input::placeholder{color:#8b8ba3}
.ag-input:focus{border-color:#ec4899;box-shadow:0 0 0 3px rgba(236,72,153,.22)}
.ag-btn{background:#fff;color:#0d0b1a;border:none;border-radius:12px;padding:13px 20px;font-family:inherit;font-size:14px;font-weight:800;cursor:pointer;white-space:nowrap;transition:transform .15s,box-shadow .15s}
.ag-btn:hover{transform:translateY(-2px);box-shadow:0 12px 30px -10px rgba(255,255,255,.4)}
.ag-note{font-size:12px;color:#9a9ab0}

@media(max-width:520px){.ag-form{flex-direction:column}.ag-cta{padding:42px 22px}}`,

  js: `var form = document.getElementById('agForm');
var note = document.getElementById('agNote');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var input = form.querySelector('.ag-input');
  var btn = form.querySelector('.ag-btn');
  if (!input.value) return;

  btn.disabled = true;
  btn.textContent = 'Joining…';
  // Simulate an async signup; replace with a real fetch to your API.
  setTimeout(function () {
    form.style.display = 'none';
    note.innerHTML = '✓ You are on the list — check ' +
      '<strong style="color:#fff">' + input.value + '</strong>';
    note.style.color = '#a7f3d0';
  }, 800);
});

// Pause the gradient spin when the tab is hidden to save battery.
document.addEventListener('visibilitychange', function () {
  var glow = document.querySelector('.ag-glow');
  glow.style.animationPlayState = document.hidden ? 'paused' : 'running';
});`,

  seo: {
    title: 'Animated Gradient CTA — Free HTML CSS JS Section Snippet',
    description: `A call-to-action section with a spinning conic-gradient glow, grain overlay, and inline email capture that confirms on submit. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Animated Gradient CTA — Spinning Conic Glow with Email Capture',
      description: `The animated gradient CTA is the eye-catching conversion block at the bottom of modern landing pages: a rounded panel lit from behind by a slowly rotating, blurred rainbow glow, with a headline and an inline email signup. This snippet builds the full section in plain HTML, CSS, and a little vanilla JavaScript — including the layered background, focus states, and a submit flow that confirms in place.

**The rotating conic glow**

The colorful light is a single \`.ag-glow\` element stretched well beyond the panel with \`inset: -40%\` and painted with a \`conic-gradient\` that cycles indigo, pink, amber, and cyan back to indigo. A heavy \`filter: blur(70px)\` melts those color stops into a soft aurora, and an \`agSpin\` keyframe rotates it a full 360° over nine seconds. Because it sits at \`z-index: -2\` behind the content and the panel uses \`overflow: hidden\`, only the part inside the rounded corners shows, so the glow reads as ambient light leaking from behind the card.

**A grain overlay for texture**

Flat gradients can look plasticky, so a \`.ag-grain\` layer adds subtle noise. It's a tiny \`radial-gradient\` dot tiled at \`4px\` via \`background-size\`, set to \`mix-blend-mode: overlay\` so the dots interact with the colors beneath rather than sitting on top as gray specks. This is a zero-image way to give the gradient a premium, textured finish. \`isolation: isolate\` on the panel keeps that blend mode contained to this component.

**Layered with z-index and isolation**

Three stacked layers compose the look: the spinning glow at \`-2\`, the grain at \`-1\`, and the content at \`1\`. Keeping the content above its own stacking context (via \`isolation: isolate\`) guarantees the \`overlay\` blend never bleeds onto the page behind the section, which is a common bug when blend modes escape their container.

**The inline signup**

The form pairs an email \`input\` with a submit button. The input has a clear focus ring — a pink border plus a soft \`box-shadow\` halo — so keyboard users always see where they are. On submit, JavaScript prevents the default navigation, disables the button and shows a "Joining…" label, then after a short simulated delay hides the form and replaces the helper note with a success message that echoes the entered address. Swap the \`setTimeout\` for a real \`fetch\` to your signup endpoint and the UX stays identical.

**Respecting the user's battery**

A continuously spinning, blurred gradient is GPU work, so a \`visibilitychange\` listener pauses the animation by setting \`animationPlayState\` to \`paused\` whenever the tab is hidden, and resumes it on return. That small courtesy stops the effect from draining battery in a background tab.

**Customizing it**

Change the \`conic-gradient\` color stops to your brand palette, slow or speed the \`agSpin\` duration, dial the blur and opacity for a subtler or more intense glow, and adjust the grain dot size and opacity. The button hover lift and the focus ring are independent, so you can restyle them freely. On screens under 520px the form stacks vertically. Pair it with a [scroll velocity marquee](/ui-snippets/scroll-velocity-marquee/) above or a [testimonial wall](/ui-snippets/testimonial-wall/) to close a landing page with momentum.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A rounded CTA panel glows with a slowly spinning rainbow light.` },
      { title: 'Notice the texture', text: `A subtle grain overlay gives the gradient a premium finish.` },
      { title: 'Focus the email field', text: `A pink ring and halo make the focus state obvious.` },
      { title: 'Submit the form', text: `The button shows Joining, then a success note echoes your email.` },
      { title: 'Switch tabs', text: `The gradient pauses while the tab is hidden to save battery.` },
      { title: 'Recolor and retime', text: `Edit the conic stops, spin duration, blur, and grain.` },
    ] },
    features: [
      { title: 'Spinning conic glow', text: `A blurred conic-gradient rotates behind the panel.` },
      { title: 'Grain overlay', text: `A tiled dot pattern with overlay blend adds texture.` },
      { title: 'Layered z-index', text: `Glow, grain, and content composited cleanly.` },
      { title: 'Contained blend mode', text: `isolation: isolate keeps the overlay inside the card.` },
      { title: 'Inline email capture', text: `A clear focus ring and accessible label.` },
      { title: 'In-place confirmation', text: `Submit hides the form and echoes the address.` },
      { title: 'Battery-aware', text: `Animation pauses when the tab is hidden.` },
      { title: 'Responsive form', text: `Input and button stack under 520px.` },
    ],
    useCases: [
      { title: 'Landing page closers', text: 'Close a page beneath a [testimonial wall](/ui-snippets/testimonial-wall/) with a panel lit by a slowly rotating blurred conic glow.' },
      { title: 'Waitlist capture', text: 'Offer an alternative to a full [waitlist signup](/ui-snippets/waitlist-signup/) page, with an inline email field that confirms on submit.' },
      { title: 'Newsletter blocks', text: 'Provide a bolder take on a [newsletter signup](/ui-snippets/newsletter-signup/), with a tiled dot grain adding texture through an overlay blend.' },
      { title: 'Product launches', text: 'Follow a [scroll velocity marquee](/ui-snippets/scroll-velocity-marquee/) band with a conversion block, using `isolation: isolate` to keep blend modes inside the card.' },
      { title: 'Beta invites', text: 'Pair the badge with a [sticky promo bar](/ui-snippets/sticky-promo-bar/), and study layered conic glow as a gradient reference.' },
      { icon: 'CODE', title: 'Related: CTA Banner Section', desc: 'See the [CTA Banner Section](/ui-snippets/cta-banner/) for a related heroes pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Waitlist Hero with Live Position Counter', desc: 'See the [Waitlist Hero with Live Position Counter](/ui-snippets/hero-waitlist-position-counter/) for a related heroes pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Hero with Audience Toggle Switcher', desc: 'See the [Hero with Audience Toggle Switcher](/ui-snippets/hero-audience-toggle-switcher/) for a related heroes pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Hero with Draggable Kanban Board Preview', desc: 'See the [Hero with Draggable Kanban Board Preview](/ui-snippets/hero-kanban-drag-preview/) for a related heroes pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Hero with Interactive Command Palette Demo', desc: 'See the [Hero with Interactive Command Palette Demo](/ui-snippets/hero-command-palette-search-demo/) for a related heroes pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the spinning glow made?', a: `A single oversized element with inset: -40% is filled with a conic-gradient of four colors and blurred heavily with filter: blur(70px), then rotated 360 degrees on a 9-second keyframe. It sits behind the content at z-index -2, and the panel's overflow: hidden clips it to the rounded corners so it reads as ambient backlight.` },
      { q: 'What does the grain layer add?', a: `It tiles a 1px radial-gradient dot every 4 pixels and uses mix-blend-mode: overlay so the noise interacts with the colors beneath instead of sitting on top as gray dots. That breaks up the flat gradient and gives the panel a textured, premium finish with zero image assets.` },
      { q: 'Why use isolation: isolate on the panel?', a: `The grain layer uses an overlay blend mode. Without a new stacking context, that blend can bleed onto whatever sits behind the section on the page. isolation: isolate creates a contained stacking context so the blend only affects the panel's own layers, which is the standard fix for escaping blend modes.` },
      { q: 'Does the animation waste battery in background tabs?', a: `No. A visibilitychange listener sets the glow's animationPlayState to paused whenever document.hidden is true and back to running on return. A blurred, continuously rotating gradient is real GPU work, so pausing it off-screen is a meaningful courtesy on laptops and phones.` },
      { q: 'How do I use this animated gradient CTA in React, Vue, or Angular?', a: `The markup and CSS port directly. Handle submit with a framework event handler that calls your signup API and toggles a submitted boolean to swap the form for the success note. Add the visibilitychange listener in a mount effect with cleanup on unmount. In Tailwind, build the glow with an absolute element using bg-[conic-gradient(...)], blur-3xl, and an animate-spin-slow keyframe.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work through the layering yourself — paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why isolation: isolate on the panel is necessary given the grain layer's mix-blend-mode: overlay, and what would visually leak onto the page if it were removed. The same assistant is useful for optimizing it — asking whether pausing the conic-gradient spin on visibilitychange is enough or whether it should also pause when the element scrolls out of view via IntersectionObserver. It's just as good for extending the CTA: ask it to add real email validation with inline error states before the fake submit delay, wire the form to an actual API endpoint with proper error handling and a retry path, or make the conic-gradient colors and grain density configurable via CSS custom properties for a theming system. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "animated gradient CTA" section in plain HTML, CSS, and JavaScript — no libraries, using a layered conic-gradient glow, a noise texture, and an inline email capture form.

Requirements:
- A rounded panel with overflow hidden and CSS isolation set to isolate, containing three stacked layers behind the content: a large element (bigger than the panel, using a negative inset) filled with a multi-color conic-gradient, heavily blurred with a CSS filter, and continuously rotated with a linear infinite keyframe animation; and a second full-coverage layer painted with a small tiled radial-gradient dot pattern set to mix-blend-mode: overlay to add grain texture, layered via z-index below the actual content.
- Foreground content (a small pill/badge, a large bold heading, a supporting paragraph, and an inline form) must sit above both background layers using explicit stacking.
- The form must contain an email input with a visible focus state (a colored border plus a soft box-shadow halo) and a submit button. On submit, prevent the default page navigation, disable the button and change its label to a loading state, then after a short simulated delay hide the form entirely and replace a helper text element with a confirmation message that includes the submitted email address.
- Add a document-level visibilitychange listener that pauses the conic-gradient's CSS animation (via animationPlayState) whenever the browser tab is hidden, and resumes it when the tab becomes visible again, to avoid wasting GPU cycles in a background tab.
- Make the form responsive: stack the input and button vertically instead of side-by-side below a defined breakpoint.`,
    },
  },
};

export default animatedGradientCta;
