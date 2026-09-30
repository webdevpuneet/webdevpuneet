const heroAudienceToggleSwitcher = {
  id: 'hero-audience-toggle-switcher',
  title: 'Hero with Audience Toggle Switcher',
  category: 'heroes',
  html: `<section class="ats-hero">
  <div class="ats-toggle" role="tablist" aria-label="Choose your audience">
    <button type="button" class="ats-opt active" data-audience="dev" role="tab" aria-selected="true">For Developers</button>
    <button type="button" class="ats-opt" data-audience="team" role="tab" aria-selected="false">For Teams</button>
    <span class="ats-thumb" id="atsThumb"></span>
  </div>

  <span class="ats-eyebrow" id="atsEyebrow">Ship faster, break less</span>
  <h1 class="ats-h1" id="atsH1">An API that gets<br>out of your way</h1>
  <p class="ats-sub" id="atsSub">Type-safe SDKs, predictable errors, and docs that match the code. Integrate in an afternoon, not a sprint.</p>
  <div class="ats-ctas">
    <a href="#" class="ats-cta-primary" id="atsCtaPrimary">Read the docs</a>
    <a href="#" class="ats-cta-secondary" id="atsCtaSecondary">View on GitHub</a>
  </div>
</section>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0f1a;color:#f1f5f9}
.ats-hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:16px;padding:24px}

.ats-toggle{position:relative;display:inline-flex;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:999px;padding:4px;margin-bottom:22px}
.ats-opt{position:relative;z-index:2;border:none;background:none;color:#94a3b8;font-family:inherit;font-size:13px;font-weight:700;padding:9px 20px;border-radius:999px;cursor:pointer;transition:color .25s}
.ats-opt.active{color:#0b0f1a}
.ats-thumb{position:absolute;top:4px;left:4px;height:calc(100% - 8px);width:calc(50% - 4px);background:#f1f5f9;border-radius:999px;transition:transform .3s cubic-bezier(.4,0,.2,1);z-index:1}
.ats-thumb.shift{transform:translateX(100%)}

.ats-eyebrow{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#60a5fa;transition:opacity .2s}
.ats-h1{font-size:clamp(32px,5.4vw,54px);font-weight:800;line-height:1.12;letter-spacing:-.02em;max-width:720px;transition:opacity .2s}
.ats-sub{font-size:15.5px;color:#94a3b8;line-height:1.7;max-width:520px;transition:opacity .2s}
.ats-ctas{display:flex;gap:12px;margin-top:8px;flex-wrap:wrap;justify-content:center}
.ats-cta-primary{background:#3b82f6;color:#fff;font-weight:700;font-size:15px;padding:12px 26px;border-radius:9px;text-decoration:none;box-shadow:0 8px 24px rgba(59,130,246,.32);transition:transform .15s,background .2s}
.ats-cta-primary:hover{transform:translateY(-2px)}
.ats-cta-secondary{color:#f1f5f9;font-weight:700;font-size:15px;padding:12px 22px;border-radius:9px;text-decoration:none;border:1px solid rgba(255,255,255,.16);transition:background .2s}
.ats-cta-secondary:hover{background:rgba(255,255,255,.06)}

.fade-out{opacity:0}`,
  js: `// Real content swap: each audience owns a full copy set. No page reload, no fake typing effect —
// clicking a toggle option updates every string and the accent color in one synchronous pass.
var COPY = {
  dev: {
    eyebrow: 'Ship faster, break less',
    h1: 'An API that gets<br>out of your way',
    sub: 'Type-safe SDKs, predictable errors, and docs that match the code. Integrate in an afternoon, not a sprint.',
    primary: 'Read the docs',
    secondary: 'View on GitHub',
    accent: '#3b82f6'
  },
  team: {
    eyebrow: 'One workspace, zero silos',
    h1: 'Ship work your<br>whole team can see',
    sub: 'Plan, assign, and track every project in one place. No more status-update meetings just to know where things stand.',
    primary: 'Start free trial',
    secondary: 'Book a demo',
    accent: '#22c55e'
  }
};

var opts = document.querySelectorAll('.ats-opt');
var thumb = document.getElementById('atsThumb');
var eyebrow = document.getElementById('atsEyebrow');
var h1 = document.getElementById('atsH1');
var sub = document.getElementById('atsSub');
var primary = document.getElementById('atsCtaPrimary');
var secondary = document.getElementById('atsCtaSecondary');

function applyAudience(key, animateThumb) {
  var data = COPY[key];
  if (!data) return;

  var block = [eyebrow, h1, sub];
  block.forEach(function (el) { el.classList.add('fade-out'); });

  window.setTimeout(function () {
    eyebrow.textContent = data.eyebrow;
    h1.innerHTML = data.h1;
    sub.textContent = data.sub;
    primary.textContent = data.primary;
    secondary.textContent = data.secondary;
    primary.style.background = data.accent;
    block.forEach(function (el) { el.classList.remove('fade-out'); });
  }, 160);

  if (animateThumb) {
    thumb.classList.toggle('shift', key === 'team');
  }
}

opts.forEach(function (btn) {
  btn.addEventListener('click', function () {
    opts.forEach(function (b) {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    applyAudience(btn.dataset.audience, true);
  });
});`,
  seo: {
    title: 'Hero with Audience Toggle — Free HTML CSS JS Snippet',
    description: 'A hero section that swaps headline, subheading, CTAs, and accent color between two audiences via a sliding pill toggle, with no page reload. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Hero with Audience Toggle — Sliding Pill Switch That Rewrites the Message',
      description: `A single hero rarely speaks to two audiences equally well. A message tuned for developers ("type-safe SDKs", "read the docs") reads as noise to a non-technical buyer, and a message tuned for a business team ("one workspace, zero silos") undersells a product to an engineer evaluating it on technical merit. Rather than building two landing pages, this hero lets a visitor self-select their audience with a toggle and rewrites the entire hero — eyebrow, headline, subheading, both CTAs, and the primary button's accent color — in place.

**The sliding pill toggle**

The toggle is two buttons layered over an absolutely positioned \`.ats-thumb\` element. Clicking a \`.ats-opt\` button toggles a \`.shift\` class on the thumb, which applies \`transform: translateX(100%)\` with a \`cubic-bezier\` transition — the thumb physically slides to sit behind whichever label is active, rather than each button independently changing its own background. This is the same mechanic behind iOS-style segmented controls: one moving element, not two static states.

**A full copy object per audience, not string interpolation**

The \`COPY\` object holds a complete set of strings — \`eyebrow\`, \`h1\`, \`sub\`, both CTA labels, and an \`accent\` hex color — keyed by audience. \`applyAudience(key)\` looks up the whole object and assigns every field in one pass. This is deliberately not a system that swaps a single word inside a fixed sentence template; templated copy reads as obviously templated ("For **Developers**, ship faster"), while a fully separate copy set per audience can be written and edited independently by whoever owns that audience's messaging.

**The fade transition on swap**

Before writing new text, the eyebrow, headline, and subheading get a \`.fade-out\` class (\`opacity: 0\`, transitioned). A \`setTimeout\` of 160ms — matched to the CSS transition duration — waits for the fade-out to finish before writing the new strings and removing \`.fade-out\` to fade back in. Swapping text instantly, with no fade, reads as a jarring flicker; this two-step fade-out-then-write-then-fade-in sequence makes the content change feel intentional rather than like a layout bug.

**Why \`innerHTML\` only on the headline**

\`h1.innerHTML = data.h1\` is used (rather than \`textContent\`) specifically because the headline copy includes a \`<br>\` for a manual line break at a chosen word. The eyebrow and subheading use plain strings assigned via \`textContent\`, which is the safer default when no markup is needed — \`innerHTML\` is reserved for the one field that requires it.

**Accent color follows the primary CTA**

Each audience's \`accent\` value is applied directly to \`primary.style.background\`, so the "Read the docs" button is blue for developers and the "Start free trial" button is green for teams. This small touch reinforces that the whole page — not just the words — adapted to the selected audience.

**Extending it to more than two audiences**

Add a third key to \`COPY\` (say, \`enterprise\`) and a third \`.ats-opt\` button with \`data-audience="enterprise"\`. The thumb-sliding CSS assumes exactly two options (\`width: calc(50% - 4px)\`, a single \`translateX(100%)\` shift); for three or more segments, change the thumb width to \`calc(100% / N)\` and compute the translate distance as \`(index * 100%)\` in JavaScript instead of a fixed \`.shift\` class.

**Persisting the choice**

Right now the audience resets to "For Developers" on every page load. To remember a visitor's choice, write the selected key to \`localStorage\` inside the click handler and read it back on load to call \`applyAudience()\` before the user interacts at all — useful if the same visitor returns to the pricing or docs pages and you want the tone to stay consistent.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click a toggle option', text: 'Click "For Developers" or "For Teams" — the headline, subheading, both CTAs, and the primary button color update in place.' },
        { title: 'Edit the copy sets', text: 'In the JS panel, change the strings inside the COPY object for the "dev" and "team" keys.' },
        { title: 'Add a third audience', text: 'Add a new key to COPY, a matching .ats-opt button with a data-audience attribute, and adjust the thumb width/shift logic in CSS and JS for three segments.' },
        { title: 'Change the accent colors', text: 'Edit the accent hex value inside each COPY entry — it is applied directly to the primary CTA background.' },
        { title: 'Persist the selection', text: 'Store the clicked audience key in localStorage and call applyAudience() with the saved value on page load.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Sliding pill toggle with a single translateX-animated thumb element',
      'Full copy object per audience — headline, subheading, both CTAs, accent color',
      'Fade-out / write / fade-in sequence keeps the content swap from flickering',
      'innerHTML used only where a manual <br> line break is needed, textContent elsewhere',
      'Primary CTA background color changes per audience for stronger visual reinforcement',
      'role="tablist" / aria-selected wired up for basic toggle accessibility',
      'No page reload, no query params, no framework — pure DOM updates',
      'Easy to extend to a third or fourth audience segment',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'APP', title: 'Dev-tool and platform landing pages', desc: 'Speak to engineers and to the business buyer evaluating the same tool without maintaining two separate landing pages.' },
      { icon: 'FLOW', title: 'B2B SaaS with two buyer personas', desc: 'Common for products bought by both an IT admin and an end-user team lead — let each self-select their framing.' },
      { icon: 'DESIGN', title: 'Marketplace platforms (buyer vs seller)', desc: 'Swap the hero between "Start selling" and "Start shopping" messaging with the same toggle mechanic.' },
      { icon: 'LEARN', title: 'Learn the fade-swap content pattern', desc: 'Study how the 160ms setTimeout is matched to the CSS transition duration to avoid a jarring instant text swap.' },
      { icon: 'CODE', title: 'Pair with a stats row hero', desc: 'Combine with the [Hero with Animated Stat Counters](/ui-snippets/hero-stats-counter-row/) for a hero that both counts up and adapts by audience.' },
      { icon: 'FORM', title: 'Pricing pages with two plan tracks', desc: 'Use the same sliding-toggle mechanic above a pricing table that also swaps between individual and team plans.' },
    ],
    faqs: [
      { q: 'How does the sliding thumb know which side to sit on?', a: 'Clicking an .ats-opt button toggles a .shift class on the #atsThumb element. The default position is the left half; .shift applies transform: translateX(100%), moving it to the right half. The CSS transition animates the move.' },
      { q: 'Why fade the text out before changing it instead of just replacing it instantly?', a: 'An instant text swap reads as a layout glitch. Adding a .fade-out class (opacity: 0, transitioned) and waiting 160ms — matched to the CSS transition-duration — before writing the new strings and removing the class produces a deliberate cross-fade instead of a flicker.' },
      { q: 'Why does the headline use innerHTML while the subheading uses textContent?', a: 'The headline copy includes a manual <br> tag to control the line break at a specific word, which requires innerHTML to render as markup. The subheading and eyebrow have no markup needs, so they use the safer textContent assignment.' },
      { q: 'How do I add a third audience segment?', a: 'Add a new key (e.g. enterprise) to the COPY object with its own eyebrow/h1/sub/primary/secondary/accent values, add a matching .ats-opt button with data-audience="enterprise", and change the thumb CSS width from 50% to roughly a third, computing its translateX offset by index in JavaScript instead of the fixed .shift class.' },
      { q: 'Does the toggle remember which audience was selected after a page reload?', a: 'Not by default — it always starts on "For Developers". Save the clicked data-audience value to localStorage inside the click handler, then read it back and call applyAudience() with that saved value before the user interacts, if you want the choice to persist.' },
      { q: 'Can this work with more than a hero — like also changing the page below it?', a: 'Yes. Fire a custom event (e.g. document.dispatchEvent(new CustomEvent("audiencechange", { detail: key }))) inside applyAudience(), and have other sections of the page listen for it to swap their own content in sync with the hero.' },
    ],
    aiPrompt: {
      paragraph: `Rather than guessing at the right transition timing or copy structure, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the fade-out setTimeout duration is matched to the CSS transition-duration value, and what would visually break if those two numbers drifted apart. The same assistant is useful for extending the pattern — ask it to generalize the thumb-sliding math from two segments to N segments computed dynamically, or to add a custom event so other sections of the page (like a pricing table below the hero) can react to the same audience toggle. It can also help you persist the selection across page loads with localStorage, or convert the copy-object-per-audience approach into a CMS-driven structure where marketing can edit each audience's strings without touching code. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a hero section in plain HTML, CSS, and vanilla JavaScript with a two-option sliding pill toggle ("For Developers" / "For Teams") that rewrites the entire hero's content when clicked — no page reload, no library.

Requirements:
- A segmented toggle made of two buttons layered over one absolutely-positioned "thumb" element that visually slides from behind the first button to behind the second (and back) using a CSS transform transition, rather than each button independently changing its own background color.
- A single JavaScript object holding a complete copy set per audience — eyebrow text, headline (including a manual line-break point), subheading, both CTA button labels, and an accent hex color — so switching audiences swaps every one of those fields together, not just a single interpolated word in a fixed sentence.
- When a toggle option is clicked, the eyebrow, headline, and subheading must first fade to opacity 0 via a CSS transition, then after a timeout matched to that transition's duration, the new text is written in and the elements fade back to opacity 1 — explain in a comment why an instant text swap without this fade sequence looks like a glitch.
- The headline should be updated with innerHTML (since it contains a deliberate <br> line break) while the eyebrow and subheading use the safer textContent, and the code should include a comment explaining that distinction.
- The primary CTA button's background color should change to match the active audience's accent color.
- Add basic ARIA (role="tablist" on the toggle container, aria-selected updated on the buttons) for accessibility.`,
    },
  },
};

export default heroAudienceToggleSwitcher;
