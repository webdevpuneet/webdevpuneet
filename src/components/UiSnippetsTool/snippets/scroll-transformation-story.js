const scrollTransformationStory = {
  id: 'scroll-transformation-story',
  title: 'Scroll Transformation Story',
  lastmod: '2026-08-24',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="tfs-intro"><h1>Six Months, One Codebase</h1><p>Scroll to watch the rewrite unfold, line by line.</p></section>
<section class="tfs-pin" id="tfsPin">
  <div class="tfs-stage">
    <div class="tfs-panel tfs-before">
      <div class="tfs-label">Before</div>
      <pre class="tfs-code">function getUser(id, cb) {
  db.query(
    "SELECT * FROM users " +
    "WHERE id = " + id,
    function (err, rows) {
      if (err) cb(err);
      else cb(null, rows[0]);
    }
  );
}

getUser(userId, function (e, u) {
  if (e) console.log(e);
  render(u);
});</pre>
    </div>
    <div class="tfs-panel tfs-after" id="tfsAfter">
      <div class="tfs-label">After</div>
      <pre class="tfs-code">async function getUser(id) {
  const [row] = await db.query(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );
  return row ?? null;
}

try {
  render(await getUser(userId));
} catch (err) {
  reportError(err);
}</pre>
    </div>
    <div class="tfs-divider" id="tfsDivider"></div>
  </div>
  <div class="tfs-caption" id="tfsCaption">Callback soup, string-built SQL, silent failure paths.</div>
  <div class="tfs-progress"><div class="tfs-progress-fill" id="tfsProgressFill"></div></div>
</section>
<section class="tfs-outro"><p>Same behavior. Half the bugs. A rewrite worth the six months.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0c10;color:#fff;min-height:100vh}
.tfs-intro,.tfs-outro{min-height:65vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px}
.tfs-intro h1{font-size:clamp(28px,6vw,50px);letter-spacing:-.02em}
.tfs-intro p,.tfs-outro p{color:#8b90a8;font-size:15px;max-width:460px}
.tfs-pin{position:relative;height:100vh;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center}
.tfs-stage{position:relative;width:min(760px,88vw);height:min(420px,58vh)}
.tfs-panel{position:absolute;inset:0;border-radius:14px;overflow:hidden;background:#111318;border:1px solid rgba(255,255,255,.08);isolation:isolate}
.tfs-label{position:absolute;top:14px;left:16px;font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;padding:4px 10px;border-radius:999px;z-index:2}
.tfs-before .tfs-label{color:#fca5a5;background:rgba(248,113,113,.14)}
.tfs-after .tfs-label{color:#86efac;background:rgba(74,222,128,.14)}
.tfs-code{font-family:'SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:14px;line-height:1.7;color:#d6d9e6;padding:52px 22px 22px;white-space:pre}
.tfs-after{clip-path:inset(0 100% 0 0);will-change:clip-path}
.tfs-divider{position:absolute;top:0;bottom:0;left:0%;width:2px;background:#34d399;box-shadow:0 0 16px rgba(52,211,153,.7);z-index:3}
.tfs-caption{margin-top:20px;font-size:14px;color:#a3a9c2;max-width:420px;text-align:center;min-height:20px}
.tfs-progress{position:absolute;left:50%;bottom:26px;transform:translateX(-50%);width:min(280px,68vw);height:4px;border-radius:999px;background:rgba(255,255,255,.14);overflow:hidden}
.tfs-progress-fill{width:0%;height:100%;background:linear-gradient(90deg,#f87171,#34d399);border-radius:999px}`,

  js: `gsap.registerPlugin(ScrollTrigger);

const captionEl = document.getElementById('tfsCaption');
const progressFill = document.getElementById('tfsProgressFill');
const afterPanel = document.getElementById('tfsAfter');
const divider = document.getElementById('tfsDivider');

// The "after" panel sits stacked directly on top of the "before" panel and
// starts fully clipped away with clip-path: inset(0 100% 0 0) — a wipe
// hidden entirely from the right edge. A single scrubbed tween animates
// that clip-path's right inset down to 0%, so scroll position directly
// controls how much of the rewritten code has "taken over" the frame,
// with a glowing divider line riding the exact same edge.
const captions = [
  { at: 0, text: 'Callback soup, string-built SQL, silent failure paths.' },
  { at: 0.35, text: 'The rewrite begins to take over, one line at a time.' },
  { at: 0.7, text: 'async/await, parameterized queries, real error handling.' },
  { at: 0.96, text: 'Same behavior, verified against the same test suite.' },
];

ScrollTrigger.create({
  trigger: '#tfsPin',
  start: 'top top',
  end: '+=2200',
  pin: true,
  scrub: 0.4,
  onUpdate(self) {
    const pct = self.progress * 100;
    afterPanel.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
    divider.style.left = pct + '%';
    progressFill.style.width = pct.toFixed(0) + '%';

    let current = captions[0].text;
    for (const c of captions) {
      if (self.progress >= c.at) current = c.text;
    }
    if (captionEl.textContent !== current) captionEl.textContent = current;
  },
});`,

  seo: {
    title: 'Scroll Transformation Story — Free GSAP ScrollTrigger Before/After Wipe Reveal',
    description: `A scroll-scrubbed clip-path wipe that transforms a "before" state into an "after" state as you scroll, with a glowing divider line and captions that change at scroll thresholds, built with GSAP ScrollTrigger.`,
    about: {
      title: 'Scroll Transformation Story — A Before/After Wipe Driven by Scroll Position',
      description: `A drag-to-compare slider needs a visitor to actively operate it. This snippet instead ties the same "before becomes after" wipe directly to scroll position, so the transformation narrates itself as part of reading the page — scroll down and the rewrite visibly overtakes the legacy code; scroll back up and it retreats, exactly in step.

**\`clip-path: inset()\` as a scrubbed wipe, not a crossfade**

The "after" panel sits stacked exactly on top of the "before" panel and starts with \`clip-path: inset(0 100% 0 0)\` — fully clipped away from its right edge. A single ScrollTrigger with \`scrub: 0.4\` writes a new \`inset(0 N% 0 0)\` value every scroll update, where \`N\` shrinks from 100 to 0 as \`self.progress\` climbs from 0 to 1. Unlike an opacity crossfade, a clip-path wipe never shows both versions blended together mid-transition — at any given scroll position, the frame shows a hard, honest split between exactly how much "before" and how much "after" is visible, which reads far more clearly as a literal transformation in progress.

**One progress value drives three synchronized elements**

The same \`self.progress\` inside \`onUpdate\` sets the clip-path percentage, positions a glowing divider line at the identical edge (\`divider.style.left = pct + '%'\`), and fills a progress bar — three visibly different UI pieces, one shared number, so nothing can drift out of alignment the way separately-triggered animations might.

**Threshold-based captions, not per-frame text**

Captions live in a small array of \`{ at, text }\` pairs and are resolved each update by finding the highest \`at\` value the current progress has passed — a lightweight step function layered on top of a continuous scrub, giving discrete narrative beats ("the rewrite begins to take over...") without needing a second ScrollTrigger or a character-by-character tween.

**Why \`scrub\` instead of a triggered one-shot wipe**

Using \`scrub\` (rather than a played-once tween triggered on enter) makes the wipe bidirectional and exploratory by nature — a visitor can scroll slowly and watch the exact code line where the transformation crosses, or scroll back up to compare a specific point again, which a fire-once reveal can't offer.

**Customizing it**

Swap the two \`<pre>\` code blocks for any other before/after content — a UI screenshot pair, a paragraph of edited copy, a data table — the wipe mechanic only cares that both panels are the same size and stacked. For a visitor-controlled (rather than scroll-controlled) version of the same clip-path idea, see [scroll before/after](/ui-snippets/scroll-before-after/); this snippet is the narrative, hands-off counterpart.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add GSAP and ScrollTrigger', text: `Load both from the CDN and call gsap.registerPlugin(ScrollTrigger).` },
      { title: 'Paste the HTML, CSS, and JS', text: `The "after" panel starts fully clipped away behind the "before" panel.` },
      { title: 'Scroll into the pinned section', text: `A clip-path wipe reveals the "after" state in exact step with scroll progress.` },
      { title: 'Watch the divider and captions', text: `The glowing line and caption text update from the same progress value.` },
      { title: 'Scroll back up', text: `The wipe retreats smoothly, since scrub ties it directly to scroll position.` },
      { title: 'Swap in your own content', text: `Replace the two code panels with any equal-size before/after pair.` },
    ] },
    features: [
      { title: 'Scrubbed clip-path wipe', text: `Scroll position directly controls how much of the "after" state is revealed.` },
      { title: 'No blended crossfade', text: `clip-path shows a hard, literal split instead of an ambiguous opacity blend.` },
      { title: 'Single source of truth', text: `One progress value drives the wipe, divider position, and progress bar together.` },
      { title: 'Threshold-based captions', text: `Discrete narrative text changes layered on top of continuous scrub progress.` },
      { title: 'Fully bidirectional', text: `Scrolling up retreats the wipe smoothly, frame for frame.` },
      { title: 'Content-agnostic wipe mechanic', text: `Works for code, screenshots, copy, or any equal-size before/after pair.` },
      { title: 'Glowing divider indicator', text: `A visible edge line always sits exactly where the wipe currently is.` },
      { title: 'Single pinned section', text: `No separate scroll distance bookkeeping beyond one ScrollTrigger.` },
    ],
    useCases: [
      { title: 'Code refactor case studies', text: 'Show legacy code becoming clean code as the reader scrolls, with a scrubbed `clip-path` wipe and a glowing divider line.' },
      { title: 'Redesign showcases', text: 'Wipe from an old interface to the new one, with captions that change at scroll thresholds layered over the continuous motion.' },
      { title: 'Content editing demos', text: 'Reveal an edited version of text over the original, with a hard literal split rather than an ambiguous blended crossfade.' },
      { title: 'Renovation and product stories', text: 'Narrate a before and after transformation of a home or product, with one progress value driving the wipe, divider and captions.' },
      { title: 'Data cleanup and brand refreshes', text: 'Show a messy dataset becoming tidy, or wipe from an old logo to a new identity, without needing the visitor to drag a slider.' },
      { icon: 'CODE', title: 'Related: Three.js Scroll Prism Light Split', desc: 'See the [Three.js Scroll Prism Light Split](/ui-snippets/three-scroll-prism-split/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: `Why use clip-path instead of animating opacity for the before/after transition?`, a: `Animating opacity would blend both versions together at every point mid-transition, which reads ambiguously — the reader can't tell exactly how much has changed at any given scroll position. clip-path: inset() instead shows a hard edge: everything left of the divider is definitively "after" and everything right of it is definitively "before," with no blending, which communicates a literal, honest transformation rather than a soft fade.` },
      { q: `Why do the clip-path wipe, the divider line, and the progress bar all update inside the same onUpdate callback?`, a: `All three are derived from the exact same self.progress value on every scroll update, rather than each having its own separate trigger or calculation. That guarantees they can never visually drift apart from each other — the divider line is mathematically guaranteed to sit exactly on the wipe's actual edge, because both are computed from the same number in the same function call.` },
      { q: `How do the captions change without a separate ScrollTrigger for each one?`, a: `The captions array stores threshold points (the at value, from 0 to 1) alongside their text, and every onUpdate call loops through the array to find the highest threshold the current progress has already passed. This is a simple step function layered on top of the single continuous scrub value — no additional ScrollTrigger instances or timeline segments are needed to get discrete text changes at specific scroll points.` },
      { q: `Can I use this wipe effect for something other than code, like images?`, a: `Yes — the mechanic only requires that the "before" and "after" panels are the same size and stacked in the same position, which the CSS already sets up with position: absolute; inset: 0. Replace the <pre> code blocks with <img> tags, screenshots, or any other content of matching dimensions and the same clip-path scrub logic keeps working unchanged.` },
      { q: `How do I build this scroll-driven wipe in React, Vue, or Angular?`, a: `Create the ScrollTrigger inside a mount effect (useEffect, onMounted, or ngAfterViewInit) after both panels have rendered, and write the clip-path, divider position, and caption text as direct style/DOM updates inside onUpdate rather than through component state, since state updates at scroll-frame frequency would cause excessive re-renders. Call .kill() on the ScrollTrigger instance in the cleanup function.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why a clip-path wipe communicates a before/after transformation more clearly than an opacity crossfade, and how driving the wipe percentage, the divider line's position, and the progress bar from the same single self.progress value inside one onUpdate callback keeps all three permanently in sync. The same assistant can help extend the pattern — ask it to add a second wipe axis (vertical instead of horizontal) for a different visual metaphor, layer in a subtle particle or glow effect right at the divider line, or add syntax-highlighting to the code panels using a highlighting library loaded alongside GSAP. Treat the code as a working starting point for your own scroll-driven transformation narrative.`,
      prompt: `Build a "scroll transformation story" in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin, loaded from a CDN with no bundler.

Requirements:
- A pinned section containing two same-size panels stacked exactly on top of each other (position: absolute, inset: 0) representing a "before" state and an "after" state — any equal-size content works, such as two code blocks, two screenshots, or two paragraphs of text — plus a thin divider line element and a caption text element, preceded by an intro section and followed by an outro section.
- Give the "after" panel an initial clip-path of inset(0 100% 0 0), fully hiding it from its right edge, so only the "before" panel underneath is visible at the very start.
- Create a single ScrollTrigger on the pinned section with scrub enabled (a fractional value for slight easing lag), and inside its onUpdate callback, compute the clip-path's right-inset percentage as 100 minus the current scroll progress percentage, so the "after" panel's clip-path right inset shrinks from 100% to 0% in exact proportion to how far the visitor has scrolled through the pinned section — creating a hard-edged horizontal wipe rather than an opacity blend.
- In that same onUpdate callback, position a visible divider line's left offset to match the exact same progress percentage used for the clip-path, and update a separate progress bar fill's width from the same percentage — all three should be derived from one shared progress value so they can never fall out of sync with each other.
- Also in the same onUpdate callback, update a caption text element by checking the current scroll progress against a small ordered array of threshold-and-text pairs, displaying whichever caption's threshold is the highest one the current progress has already reached or passed — giving discrete narrative text changes layered on top of the continuous scrub-driven wipe.
- Ensure scrolling back up smoothly reverses the wipe, the divider position, the progress bar, and the captions, entirely through the scrub-driven ScrollTrigger with no separate reverse-direction logic required.`,
    },
  },
};

export default scrollTransformationStory;
