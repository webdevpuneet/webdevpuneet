const scrollPhoneScreens = {
  id: 'scroll-phone-screens',
  title: 'Scroll Phone Screens',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="pss-top"><p>Scroll ↓</p></section>
<section class="pss-stage" id="pssStage">
  <div class="pss-caption" id="pssCap0"><h3>Track everything</h3><p>Every account, one feed.</p></div>
  <div class="pss-caption" id="pssCap1"><h3>Spot the trend</h3><p>Charts that explain themselves.</p></div>
  <div class="pss-caption" id="pssCap2"><h3>Get paid faster</h3><p>Invoices that chase themselves.</p></div>
  <div class="pss-caption" id="pssCap3"><h3>Sleep easy</h3><p>Alerts before problems grow.</p></div>
  <div class="pss-phone">
    <div class="pss-notch"></div>
    <div class="pss-viewport">
      <div class="pss-screens" id="pssScreens">
        <div class="pss-screen" style="--sc1:#6366f1;--sc2:#22d3ee"><span>🏠</span><em>Home feed</em></div>
        <div class="pss-screen" style="--sc1:#a855f7;--sc2:#ec4899"><span>📈</span><em>Insights</em></div>
        <div class="pss-screen" style="--sc1:#10b981;--sc2:#84cc16"><span>💸</span><em>Payments</em></div>
        <div class="pss-screen" style="--sc1:#f59e0b;--sc2:#ef4444"><span>🔔</span><em>Alerts</em></div>
      </div>
    </div>
  </div>
</section>
<section class="pss-bottom"><p>Four app screens scrolled through one pinned phone.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07080d;color:#fff}
.pss-top,.pss-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.pss-stage{position:relative;height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden;background:radial-gradient(75% 65% at 50% 45%,#131834,#07080d)}
.pss-phone{position:relative;width:min(270px,66vw);aspect-ratio:9/19;border-radius:40px;background:#101322;border:1px solid rgba(255,255,255,.14);box-shadow:0 40px 90px rgba(0,0,0,.6),inset 0 0 0 8px #05060b;padding:10px;z-index:2}
.pss-notch{position:absolute;top:16px;left:50%;transform:translateX(-50%);width:34%;height:16px;border-radius:99px;background:#05060b;z-index:3}
.pss-viewport{position:relative;width:100%;height:100%;border-radius:30px;overflow:hidden}
.pss-screens{position:absolute;inset:0;height:400%;display:flex;flex-direction:column;will-change:transform}
.pss-screen{height:25%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:linear-gradient(160deg,var(--sc1),var(--sc2))}
.pss-screen span{font-size:44px}
.pss-screen em{font-style:normal;font-weight:700;font-size:15px;letter-spacing:.03em}
.pss-caption{position:absolute;left:50%;top:12%;transform:translateX(-50%);text-align:center;opacity:0;will-change:transform,opacity}
.pss-caption h3{font-size:clamp(24px,4.4vw,40px);font-weight:800;letter-spacing:-.02em}
.pss-caption p{color:#aeb4ca;font-size:15px;margin-top:6px}`,

  js: `gsap.registerPlugin(ScrollTrigger);

var SCREENS = 4;
// The last caption's own entrance tween finishes exactly when the timeline
// ends, with nothing scheduled after it -- without a trailing hold, the
// scroll range would end at that exact instant too, so the final caption
// would flash in and the section would unpin before it's readable. HOLD
// adds the same dwell the other captions already get before they exit.
var HOLD = 0.7;
var RATE = 90 * SCREENS / (SCREENS - 1); // % scroll per 1 timeline unit

// One master timeline: the screen column slides up inside the phone
// viewport while captions hand off in sync with each screen boundary.
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#pssStage',
    start: 'top top',
    end: '+=' + (RATE * (SCREENS - 1 + HOLD)) + '%',
    scrub: 0.4,
    pin: true
  }
});

// The column is 400% tall; sliding it -75% shows screens 1 → 4.
tl.to('#pssScreens', {
  yPercent: -100 * (SCREENS - 1) / SCREENS,
  ease: 'none',
  duration: SCREENS - 1
}, 0);

// Captions: each owns one screen-length of the timeline.
for (var i = 0; i < SCREENS; i++) {
  var cap = '#pssCap' + i;
  // Enter as its screen arrives (screen 0 is visible from the start)
  if (i === 0) {
    gsap.set(cap, { opacity: 1 });
  } else {
    tl.fromTo(cap, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.3, ease: 'none' }, i - 0.3);
  }
  // Exit as the next screen takes over (last caption stays)
  if (i < SCREENS - 1) {
    tl.to(cap, { opacity: 0, y: -24, duration: 0.3, ease: 'none' }, i + 0.7);
  }
}

// A scrubbed timeline maps scroll progress linearly onto its OWN total
// duration -- extending the ScrollTrigger's end distance alone would only
// slow the whole sequence down uniformly, not add time after it. This
// no-op tween genuinely reserves HOLD units of timeline duration past the
// last caption's entrance, so it actually gets to sit at full opacity for
// a while before the section unpins, instead of finishing right as it ends.
tl.to({}, { duration: HOLD }, SCREENS - 1);`,

  seo: {
    title: 'Scroll Phone Screens — Free GSAP App Showcase Snippet',
    description: `A pinned phone mockup whose app screens slide vertically as you scroll, captions handing off per screen via ScrollTrigger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Phone Screens — Scrub Through an App Inside a Pinned Device',
      description: `The scroll phone screens pattern is the app-landing-page staple: a phone mockup pins in the center of the viewport, and as you scroll, the app's screens slide vertically inside the device frame — as if the page's scrollbar were your thumb flicking through the app. Captions above the phone hand off in sync with each screen. This snippet builds it with GSAP ScrollTrigger (from a CDN), a pure-CSS phone frame, and one master timeline.

**The device frame is CSS, and its viewport is a clipping window**

The phone is a rounded \`aspect-ratio: 9/19\` box with an inset shadow for the bezel and an absolutely positioned notch. Inside it, \`.pss-viewport\` has \`overflow: hidden\` with the screen's corner radius — that's the clipping window. The four app screens live in a \`.pss-screens\` column set to \`height: 400%\`, so each screen fills the viewport exactly and everything outside the window is invisible. The entire effect is translating that one column.

**One yPercent tween moves all four screens**

The column tweens to \`yPercent: -75\` (that is, \`-100 × (n−1)/n\`) across the pinned scroll. Because each screen is 25% of the column, every -25% step brings the next screen fully into the window. Translating a single element is cheaper than animating four separately, stays perfectly seamless at the boundaries, and — since \`yPercent\` is a transform — runs on the compositor without any layout work.

**Captions are choreographed on the same timeline**

Each caption owns one screen-length of the master timeline: it fades and rises in just before its screen arrives (\`i − 0.3\`) and lifts out as the next one takes over (\`i + 0.7\`). Because entrances and exits are positioned on the *same* timeline that moves the screen column, caption handoffs can never drift out of sync with the screens — scrub position is the single source of truth.

**Scroll distance scales with the screen count**

The trigger's \`end\` is computed as \`SCREENS × 90%\`, so adding a fifth screen automatically grants the section more scroll room and keeps the per-screen pacing constant. The duration of the column tween (\`SCREENS − 1\`) matches the caption loop's timeline positions, so the choreography scales with zero manual retuning.

**scrub: 0.4 mimics a real swipe**

A raw \`scrub: true\` locks the screens rigidly to the scrollbar, which feels mechanical. The 0.4-second smoothing window lets the column glide briefly after each wheel tick — close to the momentum of a real touch flick — while still settling exactly where the scrollbar says.

**Why vertical screens instead of crossfades**

A crossfade says "here's another screenshot"; a sliding column says "this is one continuous app." The shared column also means adjacent screens are briefly co-visible during the transition, exactly like mid-swipe on a real device — a detail crossfade approaches can't reproduce.

**The bezel layers so screens slide underneath the notch**

Layering order does quiet work here: the phone's bezel is an \`inset\` box-shadow (so it never affects inner layout), the screen viewport clips at its own radius inside the frame's padding, and the notch sits at \`z-index: 3\` — above the sliding column. As screens travel, their content passes *under* the notch exactly as pixels do on a real device. If you swap in screenshots, keep their status-bar areas empty or the notch will overlap real UI; alternatively move the notch into each screen and let it travel, which reads as a scrolling screenshot instead of a live device.

**Customizing it**

Swap the gradient screens for real app screenshots (\`<img>\` per \`.pss-screen\`), change \`SCREENS\`, or flip the motion horizontal with \`xPercent\` and \`flex-direction: row\`. Pair it with a [sticky scroll features](/ui-snippets/scroll-sticky-features/) section, a [scroll zoom hero](/ui-snippets/scroll-zoom-hero/) opener, or a [phone mockup](/ui-snippets/phone-mockup/) for static screens elsewhere on the page.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A CSS phone frame wraps a 400%-tall screen column.` },
      { title: 'Scroll into the stage', text: `The phone pins and screens start sliding upward.` },
      { title: 'Watch the captions', text: `Headlines hand off in sync with each screen.` },
      { title: 'Scroll back up', text: `The app scrubs in reverse, mid-swipe included.` },
      { title: 'Swap in screenshots', text: `Drop img tags into each screen; bump SCREENS to add more.` },
    ] },
    features: [
      { title: 'Pure-CSS device', text: `Bezel, notch, and screen radius without images.` },
      { title: 'Single-column slide', text: `One yPercent tween moves all screens.` },
      { title: 'Clipped viewport', text: `overflow hidden crops screens to the frame.` },
      { title: 'Synced captions', text: `Handoffs live on the same master timeline.` },
      { title: 'Count-aware pacing', text: `Scroll distance scales with SCREENS.` },
      { title: 'Swipe-feel scrub', text: `0.4s smoothing mimics touch momentum.` },
      { title: 'Compositor motion', text: `Transform-only animation, zero layout.` },
      { title: 'Reversible', text: `Scrolling up flicks back through the app.` },
    ],
    useCases: [
      { title: 'App landing pages', text: 'Walk visitors through core screens, opening with a [scroll zoom hero](/ui-snippets/scroll-zoom-hero/) before a pinned phone shows each one.' },
      { title: 'Feature tours', text: 'Pair the device with side copy using [scroll sticky features](/ui-snippets/scroll-sticky-features/), with captions handed off on the same master timeline.' },
      { title: 'Release announcements', text: 'Show what is new screen by screen, using one `yPercent` tween to move all screens inside a clipped viewport.' },
      { title: 'Onboarding previews', text: 'Let users preview a flow before installing the app, inspired by [mobile onboarding](/ui-snippets/mobile-onboarding/) screens, with captions handing off per screen.' },
      { title: 'Case studies and story chains', text: 'Present app work inside a [phone mockup](/ui-snippets/phone-mockup/) style frame, or chain into a [scroll pin story](/ui-snippets/scroll-pin-story/) for the narrative.' },
      { icon: 'CODE', title: 'Related: Scroll Rotate Gallery', desc: 'See the [Scroll Rotate Gallery](/ui-snippets/scroll-rotate-gallery/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do the screens slide inside the phone as I scroll?', a: `All four screens sit in one column set to height: 400% inside an overflow-hidden viewport. A pinned, scrubbed ScrollTrigger tweens the column to yPercent −75, and since each screen is 25% of the column, every −25% step brings the next screen fully into the window. One transform moves everything.` },
      { q: 'How do the captions stay in sync with the screens?', a: `Caption entrances and exits are placed at explicit positions (i − 0.3 and i + 0.7) on the same master timeline that slides the column. Because both share one scrubbed timeline, the scrollbar is the single source of truth — captions can never drift relative to screens, even when scrolling erratically or reversing.` },
      { q: 'How do I add a fifth screen?', a: `Add one .pss-screen div, then change SCREENS to 5 and .pss-screens height to 500% with each screen at 20% (or set height with a calc from a --n variable). The JS already scales: end distance, the column's yPercent target, and the caption loop all derive from the SCREENS constant, so pacing stays constant automatically.` },
      { q: 'Why translate one column instead of animating each screen?', a: `A single yPercent tween is compositor-only, keeps adjacent screens perfectly flush during transitions (you briefly see both, like a real mid-swipe), and makes the math trivial — screen k is fully visible at −k × 25%. Independent per-screen tweens would need four synchronized animations and still couldn't guarantee seamless edges.` },
      { q: 'Can the screens snap to whole positions instead of stopping mid-swipe?', a: `Yes — add snap to the ScrollTrigger config: snap: 1 / (SCREENS - 1) makes the scrub settle on the nearest screen boundary when scrolling pauses, or pass an object like { snapTo: 1/(SCREENS-1), duration: 0.3, ease: 'power1.inOut' } for tuned settle physics. Mid-swipe stopping is deliberate in the demo because it proves the column is one continuous surface, but snapping reads better when screens carry dense UI.` },
      { q: 'How do I use this scroll phone showcase in React, Vue, or Angular?', a: `Render screens from an array and build the timeline in a mount effect — useEffect, onMounted, or ngAfterViewInit — using refs for the stage and column instead of selectors. Wrap setup in gsap.context and revert it in the cleanup so the pin unregisters on unmount or route change. The frame styles map cleanly to Tailwind utilities if you prefer.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the column-slide math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why one yPercent tween on the whole screens column reads correctly at every screen boundary, or how the SCREENS constant flows through the end distance, the column's target yPercent, and the caption loop's timeline positions without any of them going out of sync. The same assistant can help optimize it — asking whether the caption fade tweens should be batched or whether the notch's z-index layering could cause paint issues with real screenshots instead of gradients. It's also useful for extending the effect: ask it to add scroll-snap so screens settle on whole positions instead of stopping mid-swipe, wire in real app screenshots with lazy loading, or add a horizontal variant using xPercent and flex-direction row. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll phone screens" app showcase in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin (load both from a CDN) — no video, no per-screen tweens.

Requirements:
- A CSS-only phone frame (rounded bezel, notch, clipped viewport) containing a single tall column of app "screens" stacked vertically, where the column's total height is 100% times the number of screens (e.g. 400% for 4 screens) and each screen is exactly 100/N percent of that column's height.
- A number of caption elements outside the phone, one per screen, absolutely positioned in the same spot, all but the first starting at opacity 0.
- Register one GSAP timeline on a single ScrollTrigger with pin: true and a scrub smoothing value (not a boolean), with the end distance computed from the screen count (e.g. count times 90%) rather than hardcoded, so adding a screen automatically extends the scroll distance.
- Inside that timeline, tween the screens column's yPercent from 0 to a single target value computed as -100 times (count - 1) divided by count, using ease none, so translating one element cycles through every screen with perfectly flush transitions.
- On that same timeline, position each caption's fade-in and fade-out (opacity plus a vertical offset) at explicit timeline positions computed from its screen index, so each caption enters just before its screen fully arrives and exits just as the next one takes over — the last caption should stay visible rather than exit.
- Do not hardcode per-screen timeline positions as separate magic numbers scattered through the code; derive them from the same loop/index so adding or removing a screen only requires changing the screen count and the data array.
- Confirm scrolling back up runs the whole sequence in reverse, mid-swipe states included, purely from the scrubbed timeline — no separate reverse code.`,
    },
  },
};

export default scrollPhoneScreens;
