const scrollComicPanels = {
  id: 'scroll-comic-panels',
  title: 'Scroll Comic Panel Sequence',
  lastmod: '2026-08-24',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="cmp-intro"><h1>Origin Story</h1><p>Scroll to turn the pages.</p></section>
<section class="cmp-pin" id="cmpPin">
  <div class="cmp-frame">
    <div class="cmp-panel cmp-p1" data-panel>
      <div class="cmp-art cmp-art-1"></div>
      <div class="cmp-bubble cmp-bubble-1">Another quiet Tuesday at the lab...</div>
    </div>
    <div class="cmp-panel cmp-p2" data-panel>
      <div class="cmp-art cmp-art-2"></div>
      <div class="cmp-bubble cmp-bubble-2">Wait — the readings just spiked!</div>
    </div>
    <div class="cmp-panel cmp-p3" data-panel>
      <div class="cmp-art cmp-art-3"></div>
      <div class="cmp-bubble cmp-bubble-3">Something's coming through the signal.</div>
    </div>
    <div class="cmp-panel cmp-p4" data-panel>
      <div class="cmp-art cmp-art-4"></div>
      <div class="cmp-bubble cmp-bubble-4">And just like that — everything changed.</div>
    </div>
  </div>
  <div class="cmp-progress"><div class="cmp-progress-fill" id="cmpProgressFill"></div></div>
  <div class="cmp-count" id="cmpCount">Panel 1 / 4</div>
</section>
<section class="cmp-outro"><p>To be continued...</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Comic Sans MS',system-ui,-apple-system,sans-serif;background:#111;color:#fff;min-height:100vh}
.cmp-intro,.cmp-outro{min-height:70vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px}
.cmp-intro h1{font-size:clamp(32px,7vw,58px);letter-spacing:-.02em;color:#fde047}
.cmp-intro p,.cmp-outro p{color:#a3a3a3;font-size:15px}
.cmp-pin{position:relative;height:100vh;overflow:hidden;background:#1a1a1a}
.cmp-frame{position:relative;width:100%;height:100%}
.cmp-panel{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;opacity:0;visibility:hidden}
.cmp-panel.is-visible{opacity:1;visibility:visible}
.cmp-art{width:min(560px,86vw);height:min(420px,56vh);border:6px solid #fff;border-radius:6px;box-shadow:10px 10px 0 rgba(0,0,0,.5);position:relative;overflow:hidden}
.cmp-art-1{background:radial-gradient(circle at 30% 30%,#38bdf8,#0c4a6e)}
.cmp-art-2{background:radial-gradient(circle at 70% 40%,#f97316,#7c2d12)}
.cmp-art-3{background:radial-gradient(circle at 50% 60%,#a78bfa,#3730a3)}
.cmp-art-4{background:radial-gradient(circle at 50% 50%,#fde047,#78350f)}
.cmp-bubble{margin-top:-40px;max-width:min(420px,80vw);background:#fff;color:#111;font-weight:700;font-size:15px;line-height:1.4;padding:14px 18px;border-radius:16px;position:relative;text-align:center;box-shadow:4px 4px 0 rgba(0,0,0,.4)}
.cmp-bubble::before{content:'';position:absolute;top:-14px;left:36px;border:10px solid transparent;border-bottom-color:#fff}
.cmp-progress{position:absolute;left:50%;bottom:26px;transform:translateX(-50%);width:min(320px,70vw);height:6px;border-radius:999px;background:rgba(255,255,255,.15);overflow:hidden}
.cmp-progress-fill{width:0%;height:100%;background:linear-gradient(90deg,#fde047,#f97316);border-radius:999px}
.cmp-count{position:absolute;left:50%;bottom:44px;transform:translateX(-50%);font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#d4d4d4}`,

  js: `gsap.registerPlugin(ScrollTrigger);

const panels = gsap.utils.toArray('[data-panel]');
const progressFill = document.getElementById('cmpProgressFill');
const countLabel = document.getElementById('cmpCount');
const total = panels.length;

// Panels are absolutely stacked on top of each other; only one is ever
// "is-visible" at a time. The pinned scroll distance is divided into equal
// slices, one per panel, and each slice's own ScrollTrigger drives that
// panel's own enter/exit tween — the panel-swap effect a real digital comic
// reader gives you, built entirely from GSAP timelines instead of a
// pre-rendered video.
gsap.set(panels[0], { visibility: 'visible', opacity: 1 });

panels.forEach((panel, i) => {
  const tl = gsap.timeline({ paused: true });
  tl.fromTo(panel.querySelector('.cmp-art'),
    { scale: 0.85, rotate: i % 2 === 0 ? -2 : 2 },
    { scale: 1, rotate: 0, duration: 0.5, ease: 'back.out(1.6)' }
  ).fromTo(panel.querySelector('.cmp-bubble'),
    { opacity: 0, y: 14, scale: 0.9 },
    { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(2)' },
    '-=0.15'
  );

  ScrollTrigger.create({
    trigger: '#cmpPin',
    start: () => 'top+=' + ((i / total) * getPinnedDistance()) + ' top',
    end: () => 'top+=' + (((i + 1) / total) * getPinnedDistance()) + ' top',
    onEnter: () => {
      panels.forEach((p) => p.classList.toggle('is-visible', p === panel));
      tl.restart();
      countLabel.textContent = 'Panel ' + (i + 1) + ' / ' + total;
    },
    onEnterBack: () => {
      panels.forEach((p) => p.classList.toggle('is-visible', p === panel));
      tl.restart();
      countLabel.textContent = 'Panel ' + (i + 1) + ' / ' + total;
    },
  });
});

function getPinnedDistance() {
  return window.innerHeight * (total - 1) * 0.9;
}

// One master ScrollTrigger owns the actual pin and reports overall progress
// for the fill bar — the per-panel triggers above only ever toggle
// visibility and replay each panel's own entrance timeline.
ScrollTrigger.create({
  trigger: '#cmpPin',
  start: 'top top',
  end: () => '+=' + getPinnedDistance(),
  pin: true,
  onUpdate: (self) => {
    progressFill.style.width = (self.progress * 100).toFixed(0) + '%';
  },
});

ScrollTrigger.addEventListener('refreshInit', () => {
  panels.forEach((p) => { if (p !== panels[0]) p.classList.remove('is-visible'); });
});`,

  seo: {
    title: 'Scroll Comic Panel Sequence — Free GSAP ScrollTrigger Panel-by-Panel Reveal',
    description: `A pinned comic-strip section that reveals one panel at a time as you scroll, each with its own back.out entrance timeline for the art and speech bubble, built with GSAP ScrollTrigger.`,
    about: {
      title: 'Scroll Comic Panel Sequence — A Comic Strip Told One Panel per Scroll',
      description: `Digital comics and scroll-driven brand stories both lean on the same beat: pin the reader in place, then turn each "page" with scroll instead of a click. This snippet builds that panel-by-panel reveal with GSAP and ScrollTrigger — one pinned section, four stacked panels, each with its own small entrance animation for the artwork and speech bubble.

**One pin owns the scroll distance, per-panel triggers own the swap**

A single master \`ScrollTrigger\` with \`pin: true\` locks \`#cmpPin\` in place for a fixed distance (\`getPinnedDistance()\`, sized to the panel count) and reports overall progress to the fill bar via \`onUpdate\`. Separately, each panel gets its own \`ScrollTrigger\` covering an equal slice of that same pinned distance — dividing responsibility cleanly: the master trigger only pins and measures progress, while the per-panel triggers only decide which panel is visible and when to replay its entrance.

**Panels stack absolutely; only one is ever visible**

All four \`.cmp-panel\` elements sit at \`position: absolute; inset: 0\` inside \`.cmp-frame\`, so they occupy the exact same space and swapping between them is just toggling an \`is-visible\` class — no layout shift, no cross-fade coordination between panel positions, just a clean cut like a real page turn.

**Each panel replays its own timeline, not a shared one**

Every panel builds its own paused \`gsap.timeline()\` in the setup loop — a \`back.out(1.6)\` scale-and-rotate-in for the artwork frame, followed by a \`back.out(2)\` pop-in for the speech bubble, overlapped slightly with \`"-=0.15"\`. \`onEnter\` and \`onEnterBack\` both call \`tl.restart()\`, so every time a panel becomes active — scrolling forward into it, or scrolling backward into it — its entrance plays again from the top, giving the comic a "just turned to this page" feel in both directions instead of just fading a static frame in.

**A slight tilt makes hand-drawn panels feel less mechanical**

Even-indexed panels rotate in from \`-2deg\` and odd-indexed ones from \`2deg\` before settling at \`0\`, a tiny detail that keeps four otherwise-identical entrance timelines from feeling like the exact same animation repeated — closer to how panels are actually laid slightly askew on a hand-inked page.

**A refresh-safe reset**

\`ScrollTrigger.addEventListener('refreshInit', ...)\` clears every panel but the first back to hidden whenever ScrollTrigger recalculates (e.g. on window resize), preventing a stale \`is-visible\` state left over from a previous scroll position from making two panels appear stacked and visible at once after a layout change.

**Customizing it**

Add a fifth \`[data-panel]\` block and the per-panel trigger loop divides the pinned distance evenly among however many panels exist — no distance math to hand-tune. Swap the CSS gradients for real illustrated frames, or replace the speech-bubble copy with narration captions for a less "comic," more "storyboard" feel. Pair with a [scroll horizontal story track](/ui-snippets/scroll-horizontal-story-track/) if panels should pan sideways instead of pinning in place.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add GSAP and ScrollTrigger', text: `Load both from the CDN and call gsap.registerPlugin(ScrollTrigger).` },
      { title: 'Paste the HTML, CSS, and JS', text: `Four stacked panels start with only the first one visible.` },
      { title: 'Scroll into the pinned section', text: `Each panel's artwork and speech bubble pop in with a back.out entrance.` },
      { title: 'Keep scrolling', text: `The section stays pinned while each panel takes its equal slice of scroll distance.` },
      { title: 'Scroll back up', text: `Earlier panels replay their entrance animation again, not just fade back in statically.` },
      { title: 'Add more panels', text: `Duplicate a .cmp-panel block with the next data-panel attribute — distance splits automatically.` },
    ] },
    features: [
      { title: 'Pinned panel-by-panel reveal', text: `One master ScrollTrigger pins the section while per-panel triggers swap content.` },
      { title: 'Replayable entrance timelines', text: `Each panel's art and bubble animate in fresh every time it becomes active, either direction.` },
      { title: 'back.out easing', text: `A slight scale/rotate overshoot gives panels a hand-placed, comic-page feel.` },
      { title: 'Alternating tilt', text: `Even and odd panels rotate in from opposite angles to avoid repetitive motion.` },
      { title: 'Progress bar and panel counter', text: `Both driven from the master trigger's own scroll progress.` },
      { title: 'Zero-layout-shift swapping', text: `Absolutely stacked panels swap via visibility, not DOM reordering.` },
      { title: 'Refresh-safe state reset', text: `A refreshInit listener prevents stale visible panels after a resize.` },
      { title: 'Distance scales with panel count', text: `Adding panels automatically redivides the pinned scroll distance.` },
    ],
    useCases: [
      { title: 'Brand origin-story or founder narrative pages', text: `Tell a company's founding moment as an illustrated, paced sequence.` },
      { title: 'Product launch teasers', text: `Reveal a feature story panel by panel before a final CTA.` },
      { title: 'Digital comics and webtoon-style content', text: `Recreate the panel-turn reading rhythm natively in the browser.` },
      { title: 'Onboarding or explainer flows', text: `Use comic-style panels instead of a plain step list to explain a process.` },
      { title: 'Campaign microsites', text: `Give a seasonal or promotional story a distinct illustrated identity.` },
      { title: 'Portfolio case-study intros', text: `Open a project write-up with a short scroll-driven visual narrative.` },
      { icon: 'CODE', title: 'Related: Scroll Chat Story', desc: 'See the [Scroll Chat Story](/ui-snippets/scroll-chat-story/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: `How does only one panel show at a time without a layout jump between them?`, a: `Every panel is positioned with position: absolute and inset: 0 inside a shared .cmp-frame container, so all four panels occupy the exact same box regardless of which one is visible. Swapping panels is just toggling an is-visible class that controls opacity and visibility — there's no reflow or repositioning happening, so the transition reads as a clean cut rather than a layout shift.` },
      { q: `Why does each panel replay its animation when scrolling both forward and backward into it?`, a: `Both onEnter and onEnterBack call the same panel's tl.restart(), which resets its timeline to time zero and plays it again regardless of scroll direction. That was a deliberate choice for this kind of "page turn" narrative — a comic panel should feel freshly revealed every time it becomes the active one, not just cross-fade in the first time and then sit static on any later revisit.` },
      { q: `How is the pinned scroll distance divided among the panels?`, a: `getPinnedDistance() returns a distance proportional to the panel count (window.innerHeight times one less than the total, times a scroll-feel multiplier), and each panel's own ScrollTrigger start/end values are computed as a fraction of that same total distance — panel index i owns the slice from i/total to (i+1)/total. Because both the master pin trigger and every per-panel trigger derive their numbers from the same total, adding a fifth panel automatically redivides the distance evenly with no manual recalculation.` },
      { q: `Why is there a refreshInit listener resetting panel visibility?`, a: `ScrollTrigger recalculates all trigger positions on events like a window resize, and during that recalculation a panel that was left visible from before the resize could end up stacked visibly on top of the new first panel for a frame. The refreshInit listener proactively hides every panel except the first any time ScrollTrigger is about to recompute, so the section always starts a fresh calculation from a known, single-panel-visible state.` },
      { q: `How do I build this scroll comic panel sequence in React, Vue, or Angular?`, a: `Set up the master pin trigger and the per-panel trigger loop inside a mount effect after the panel elements exist in the DOM, keeping references to every created ScrollTrigger instance (and each panel's GSAP timeline) in a ref or component-scoped array. Call .kill() on every ScrollTrigger and .kill() on every timeline in the cleanup function to avoid duplicate triggers building up across re-renders or route changes.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the master pin trigger and the per-panel triggers divide responsibility — one measuring overall scroll progress and pinning the section, the others deciding which panel is visible and replaying its own timeline — and why that separation makes it easy to add or remove panels without recalculating distances by hand. The same assistant can help extend the effect: ask it to add a sound-effect-style animated word (like "BOOM") that pops in on a specific panel, make panel art draggable/zoomable like a real comic reader, or convert the vertical pin into a horizontal panel-swipe interaction. Treat the code as a working starting point for your own scroll-driven visual narrative.`,
      prompt: `Build a "scroll comic panel sequence" in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin, loaded from a CDN with no bundler.

Requirements:
- A pinned full-viewport section containing several absolutely-positioned panels stacked on top of each other (each with an illustrated frame area and a speech-bubble caption), preceded by an intro section and followed by an outro section.
- Create one master ScrollTrigger on the pinned section with pin: true covering a total scroll distance proportional to the number of panels, and use its onUpdate callback to drive a progress bar and a "panel X of N" counter label.
- Create a separate ScrollTrigger for every individual panel, each covering an equal fractional slice of the same total pinned distance (panel index i owning the range from i/total to (i+1)/total), so that adding or removing panels automatically redivides the distance with no manual recalculation.
- Each panel should start hidden except the first, and its ScrollTrigger's onEnter and onEnterBack callbacks should both toggle a "visible" class exclusively on that panel (hiding all others) and restart that panel's own GSAP timeline from the beginning, so every panel replays its entrance animation fresh both when scrolling forward into it and when scrolling backward into it.
- Give each panel its own paused GSAP timeline animating its artwork frame in with a back-style overshoot easing (scale and a slight rotation, alternating rotation direction between even and odd panels) followed by a slightly overlapping pop-in animation for its speech bubble.
- Add a listener for ScrollTrigger's refresh/refreshInit event that resets every panel except the first back to hidden, so a window resize recalculation never leaves more than one panel visible at once.`,
    },
  },
};

export default scrollComicPanels;
