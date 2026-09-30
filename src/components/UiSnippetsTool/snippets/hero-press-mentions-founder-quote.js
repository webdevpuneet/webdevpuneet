const heroPressMentionsFounderQuote = {
  id: 'hero-press-mentions-founder-quote',
  title: 'Hero with Press Mentions and Founder Quote',
  lastmod: '2026-08-31',
  category: 'heroes',
  cdnUrls: [],
  html: `<section class="pfq-hero">
  <div class="pfq-copy">
    <span class="pfq-eyebrow">As seen in TechCrunch, Forbes &amp; The Verge</span>
    <h1 class="pfq-h1">The finance stack investors ask about before the term sheet</h1>
    <p class="pfq-sub">Real-time cash visibility, automated reconciliation, and board-ready reports — built for teams who close their books in hours, not weeks.</p>
    <div class="pfq-cta-row">
      <button type="button" class="pfq-btn-primary">Start free trial</button>
      <button type="button" class="pfq-btn-ghost">Watch 2-min demo</button>
    </div>

    <div class="pfq-press-row">
      <span class="pfq-press-logo">TechCrunch</span>
      <span class="pfq-press-logo">Forbes</span>
      <span class="pfq-press-logo">The Verge</span>
      <span class="pfq-press-logo">Bloomberg</span>
    </div>
  </div>

  <aside class="pfq-quote-card" id="pfqQuoteCard">
    <svg class="pfq-quote-mark" width="30" height="24" viewBox="0 0 30 24" fill="currentColor"><path d="M12.5 0C6 1.6 2 6.6 2 13.2 2 18.7 5.6 22.5 10.3 22.5c4 0 6.9-3 6.9-6.8 0-3.6-2.5-6.1-5.8-6.1-.6 0-1.2.1-1.6.3.6-3.8 3.6-6.9 7.6-7.7L12.5 0Zm16 0c-6.5 1.6-10.5 6.6-10.5 13.2 0 5.5 3.6 9.3 8.3 9.3 4 0 6.9-3 6.9-6.8 0-3.6-2.5-6.1-5.8-6.1-.6 0-1.2.1-1.6.3.6-3.8 3.6-6.9 7.6-7.7L28.5 0Z"/></svg>
    <p class="pfq-quote-text" id="pfqQuoteText">We tried three other tools before this one. It's the first finance product our engineering team actually wanted to build integrations for.</p>
    <div class="pfq-quote-person">
      <div class="pfq-avatar" id="pfqAvatar">MK</div>
      <div>
        <b id="pfqName">Maya Kessler</b>
        <span id="pfqRole">Co-founder &amp; CEO, Ledgerly</span>
      </div>
    </div>
    <div class="pfq-quote-dots" id="pfqDots"></div>
  </aside>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#faf9f7;color:#1c1a17}
.pfq-hero{display:grid;grid-template-columns:1.15fr 1fr;gap:52px;max-width:1120px;margin:0 auto;padding:72px 24px;align-items:center}

.pfq-eyebrow{display:inline-block;font-size:12px;font-weight:700;letter-spacing:.03em;color:#92722f;background:#fbf3e0;border:1px solid #f1e0b6;padding:6px 12px;border-radius:99px;margin-bottom:20px}
.pfq-h1{font-size:clamp(30px,4.2vw,46px);font-weight:800;line-height:1.12;letter-spacing:-.02em;margin-bottom:18px}
.pfq-sub{font-size:15.5px;color:#5c5851;line-height:1.65;max-width:480px;margin-bottom:28px}

.pfq-cta-row{display:flex;gap:12px;margin-bottom:36px}
.pfq-btn-primary{background:#1c1a17;color:#fff;border:none;border-radius:10px;padding:13px 24px;font-size:14.5px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .15s}
.pfq-btn-primary:hover{background:#33302a}
.pfq-btn-ghost{background:none;border:1.5px solid #ddd8ce;color:#1c1a17;border-radius:10px;padding:13px 24px;font-size:14.5px;font-weight:700;cursor:pointer;font-family:inherit}

.pfq-press-row{display:flex;flex-wrap:wrap;gap:22px;padding-top:24px;border-top:1px solid #e8e3d8}
.pfq-press-logo{font-size:14.5px;font-weight:800;color:#a39d8e;letter-spacing:-.01em}

.pfq-quote-card{background:#1c1a17;color:#f4f1ea;border-radius:22px;padding:34px 30px;position:relative;box-shadow:0 30px 70px rgba(28,26,23,.25)}
.pfq-quote-mark{color:#645c48;margin-bottom:14px}
.pfq-quote-text{font-size:17px;line-height:1.6;font-weight:600;margin-bottom:24px;min-height:96px;transition:opacity .25s}
.pfq-quote-person{display:flex;align-items:center;gap:12px;margin-bottom:18px}
.pfq-avatar{width:42px;height:42px;border-radius:50%;background:#3a352c;color:#f4f1ea;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;flex-shrink:0;transition:opacity .25s}
.pfq-quote-person div b{display:block;font-size:14px;font-weight:800}
.pfq-quote-person div span{font-size:12.5px;color:#a39d8e}

.pfq-quote-dots{display:flex;gap:6px}
.pfq-quote-dots button{width:7px;height:7px;border-radius:50%;background:#4a453a;border:none;cursor:pointer;padding:0;transition:background .2s,width .2s}
.pfq-quote-dots button.pfq-dot-active{background:#e8c574;width:20px;border-radius:99px}

@media(max-width:840px){
  .pfq-hero{grid-template-columns:1fr;gap:36px;padding:48px 20px}
  .pfq-sub{max-width:none}
}`,

  js: `// Rotates through several customer/press quotes on a timer, with clickable dots
// for manual control. Fading the quote text and avatar together (not the whole
// card) avoids the layout jump you'd get animating the card's height.
var quotes = [
  {
    text: "We tried three other tools before this one. It's the first finance product our engineering team actually wanted to build integrations for.",
    name: 'Maya Kessler',
    role: 'Co-founder & CEO, Ledgerly',
    initials: 'MK'
  },
  {
    text: 'A genuinely well-built product, and the kind of company we like backing twice.',
    name: 'David Osei',
    role: 'Partner, Northgate Ventures',
    initials: 'DO'
  },
  {
    text: 'Migrated 40,000 transactions in an afternoon with zero support tickets from finance. That never happens.',
    name: 'Priya Shah',
    role: 'VP Finance, Outset Labs',
    initials: 'PS'
  }
];

var textEl = document.getElementById('pfqQuoteText');
var nameEl = document.getElementById('pfqName');
var roleEl = document.getElementById('pfqRole');
var avatarEl = document.getElementById('pfqAvatar');
var dotsEl = document.getElementById('pfqDots');
var current = 0;
var timer = null;

function renderDots() {
  dotsEl.innerHTML = '';
  for (var i = 0; i < quotes.length; i++) {
    var dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', 'Show quote ' + (i + 1));
    if (i === current) dot.className = 'pfq-dot-active';
    dot.addEventListener('click', (function (index) {
      return function () { showQuote(index, true); };
    })(i));
    dotsEl.appendChild(dot);
  }
}

function showQuote(index, isManual) {
  current = index;
  var q = quotes[current];
  textEl.style.opacity = '0';
  avatarEl.style.opacity = '0';
  setTimeout(function () {
    textEl.textContent = q.text;
    nameEl.textContent = q.name;
    roleEl.textContent = q.role;
    avatarEl.textContent = q.initials;
    textEl.style.opacity = '1';
    avatarEl.style.opacity = '1';
  }, 180);
  renderDots();
  if (isManual) restartTimer();
}

function restartTimer() {
  if (timer) clearInterval(timer);
  timer = setInterval(function () {
    showQuote((current + 1) % quotes.length, false);
  }, 5000);
}

renderDots();
restartTimer();`,

  seo: {
    title: 'Hero with Press Mentions and Founder Quote — Free HTML CSS JS Snippet',
    description: 'A trust-building hero section pairing a press-mention strip with a rotating founder or investor quote card that auto-advances with clickable dots. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Press Mentions + Founder Quote Hero — Rotating Social Proof Card for Landing Pages',
      description: `A headline promises a product is good; a press mention or an investor's own words prove someone independent already agreed. This hero section pairs both trust signals in one composition — a press-logo strip sitting under the primary copy and CTA, and a self-rotating quote card on the opposite side that cycles between a founder testimonial, an investor endorsement, and a customer story.

**One rotation function drives every part of the card**

\`showQuote(index, isManual)\` is the single source of truth for the quote card's state. It updates the quote text, the person's name and role, the avatar initials, and the active dot — all from one \`quotes\` array entry — so there's no risk of the name updating while the quote text lags behind, a common bug in hand-rolled rotators that update each field with separate logic.

**Fading text and avatar, not the whole card**

Rather than fading the entire \`.pfq-quote-card\` (which would visibly dim the surrounding chrome and border on every rotation), only \`.pfq-quote-text\` and \`.pfq-avatar\` have their \`opacity\` toggled, with the actual content swap happening inside a \`setTimeout\` timed to the CSS transition's midpoint. This keeps the card's border, background, and dots fully visible and stable throughout the rotation — only the content that's actually changing appears to fade.

**\`min-height\` on the quote text prevents layout jump**

Quotes of different lengths would otherwise cause the card — and everything below it, including the dots — to jump vertically each time the text changes. Setting a \`min-height\` on \`.pfq-quote-text\` reserves enough vertical space for a two-to-three line quote regardless of which one is currently showing, so the dots and avatar stay anchored in place.

**Dots are both an indicator and a control**

\`renderDots()\` rebuilds the dot row on every rotation so the active dot always matches \`current\`, and each dot is a real \`<button>\` with a click handler bound via an IIFE closure over its own index — a common pitfall in a loop-generated event handler is every handler closing over the same final loop variable, which the IIFE avoids. Clicking a dot calls \`showQuote(index, true)\`, where the \`true\` flag tells the function to call \`restartTimer()\` — so a manual click resets the five-second auto-advance clock instead of immediately being overridden by it.

**The press-logo strip as understated proof, not a carousel**

The press mentions are deliberately static text logotypes below a divider, not another rotating or animated element — stacking two moving elements in one hero would compete for attention. The static row reads as ambient credibility while the quote card, which changes over time, is the one element inviting a second look.

**Customizing it**

Add or remove entries from the \`quotes\` array — each needs \`text\`, \`name\`, \`role\`, and \`initials\`; the dots and rotation logic scale automatically to however many entries the array holds. Replace the avatar initials with real \`<img>\` photos by swapping \`.pfq-avatar\`'s \`textContent\` assignment for an \`src\` update. Adjust the auto-advance interval by changing the \`5000\` millisecond value passed to \`setInterval\` inside \`restartTimer()\`.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Watch the quote card rotate', text: 'Every 5 seconds the card fades to the next founder, investor, or customer quote automatically.' },
        { title: 'Click a dot to jump quotes', text: 'Clicking any dot immediately shows that quote and resets the auto-advance timer.' },
        { title: 'Edit the quotes array', text: 'In the JS panel, edit the text, name, role, and initials fields for each quote.' },
        { title: 'Update the press logos', text: 'Replace the .pfq-press-logo spans in the HTML panel with your own outlet names or logo images.' },
        { title: 'Change the rotation speed', text: 'Edit the 5000 millisecond value inside restartTimer() in the JS panel.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Self-rotating quote card cycling through founder, investor, and customer quotes',
      'Single showQuote() function keeps text, name, role, avatar, and dots always in sync',
      'Clickable dots for manual navigation, each resetting the auto-advance timer',
      'IIFE-bound click handlers avoid the classic loop-closure indexing bug',
      'min-height on the quote text prevents layout jump between quotes of different lengths',
      'Only the changing text and avatar fade, keeping the card border and dots stable',
      'Static press-logo strip reads as ambient credibility beside the animated quote card',
      'No carousel or slider library — plain setInterval and class toggling',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'APP', title: 'Seed and Series A startup landing pages', desc: 'Combine press coverage with an investor quote to build fundraising-stage credibility before a visitor ever reaches the product screenshots.' },
      { icon: 'FLOW', title: 'B2B SaaS homepage above-the-fold', desc: 'Pair with [social proof logos](/ui-snippets/hero-social-proof-logos/) further down the page for a layered trust-building sequence.' },
      { icon: 'FORM', title: 'Fundraising and investor relations pages', desc: 'Rotate between multiple investor and customer quotes without needing a full testimonial carousel section.' },
      { icon: 'LEARN', title: 'Learn closure-safe loop event binding', desc: 'Study the IIFE pattern in renderDots() that gives each dot its own correctly-scoped index inside a for loop.' },
      { icon: 'DESIGN', title: 'Agency and consultancy homepages', desc: 'Swap founder quotes for client testimonials to open a services homepage with third-party validation.' },
      { icon: 'CODE', title: 'Related: Rotating Testimonial Spotlight', desc: 'See the [Rotating Testimonial Spotlight](/ui-snippets/hero-rotating-testimonial-spotlight/) for a full-width alternative to this two-column layout.' },
    ],
    faqs: [
      { q: 'How often does the quote card rotate automatically?', a: 'Every 5000 milliseconds (5 seconds), set inside restartTimer() via setInterval. Edit that number in the JS panel to speed up or slow down the auto-advance.' },
      { q: 'What happens when I click a dot mid-rotation?', a: 'showQuote(index, true) runs immediately, updating the text, name, role, avatar, and active dot to the clicked quote, and the true flag tells it to call restartTimer(), which clears the existing interval and starts a fresh 5-second countdown so the auto-advance does not immediately override your manual choice.' },
      { q: 'Why does only the text and avatar fade, not the whole card?', a: 'Fading the entire card would visibly dim its border, background, and the dot row on every single rotation, which reads as flickery. Only .pfq-quote-text and .pfq-avatar have their opacity toggled, so the card itself stays visually stable while just the content that is actually changing fades in and out.' },
      { q: 'How do I add a fourth quote?', a: 'Add a new object with text, name, role, and initials fields to the quotes array at the top of the JS panel. renderDots() and the rotation logic both read the array\'s length dynamically, so a fourth dot appears automatically with no other code changes needed.' },
      { q: 'Can I use real photos instead of initials in the avatar circle?', a: 'Yes. Change .pfq-avatar from a div with text content to an img element, and in the JS swap the avatarEl.textContent = q.initials line for avatarEl.src = q.photoUrl, adding a photoUrl field to each entry in the quotes array.' },
      { q: 'Why is there a min-height on the quote text?', a: 'Quotes of different lengths would otherwise cause the card, and the avatar and dots below it, to jump vertically every time the text changes. The min-height reserves enough space for a typical two-to-three line quote so the layout stays visually anchored regardless of which quote is showing.' },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing the fade timing by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how showQuote() sequences the opacity fade-out, the setTimeout-delayed content swap, and the fade-in so the two never visually overlap, and why the dot click handlers are wrapped in an IIFE inside the for loop in renderDots(). The same assistant can help you extend it — ask it to add a subtle progress bar under the dots showing time remaining until the next auto-advance, pause the rotation on hover or keyboard focus so a reader is not interrupted mid-read, or pull the quotes array from a CMS or JSON endpoint instead of a hardcoded list. It's also useful for an accessibility pass: ask whether the rotating quote region needs an aria-live attribute, and whether the auto-advance should respect a visitor's prefers-reduced-motion setting. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a two-column hero section in plain HTML, CSS, and vanilla JavaScript pairing a headline/CTA column with a static press-mention logo strip against a self-rotating quote card — no carousel library.

Requirements:
- Left column: an eyebrow label, a large headline, a supporting paragraph, two call-to-action buttons, and a row of press outlet names/logos below a divider.
- Right column: a dark quote card containing a large decorative quote mark icon, a quote paragraph, a small avatar circle with initials, a name and role line, and a row of navigation dots — one per quote.
- Store all quotes (text, name, role, initials) in a single JavaScript array. Write one function that updates the quote text, avatar, name, role, and active dot together from one array entry, so no field can ever visually lag behind another during a transition.
- Auto-advance to the next quote every 5 seconds using setInterval, wrapping back to the first quote after the last.
- Make each dot clickable: clicking one must immediately jump to that quote and reset the 5-second auto-advance timer so it does not fire again right away. Bind each dot's click handler so it correctly captures its own index even though the dots are created in a loop.
- Fade only the quote text and avatar (not the whole card) between quote changes, swapping the actual text content at the midpoint of the fade so the transition never shows mismatched old/new content at once.
- Give the quote text a minimum height so quotes of different lengths do not shift the avatar and dots vertically when the text changes.`,
    },
  },
};

export default heroPressMentionsFounderQuote;
