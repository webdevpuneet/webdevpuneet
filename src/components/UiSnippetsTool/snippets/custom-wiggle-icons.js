const customWiggleIcons = {
  id: 'custom-wiggle-icons',
  title: 'CustomWiggle Icons',
  lastmod: '2026-07-18',
  category: 'animations',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/CustomEase.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/CustomWiggle.min.js',
  ],
  html: `<div class="cwi-wrap">
  <div class="cwi-row">
    <button class="cwi-icon" id="cwiBell" aria-label="Notifications">🔔<i class="cwi-badge">3</i></button>
    <button class="cwi-icon" id="cwiHeart" aria-label="Like">❤️</button>
    <button class="cwi-icon" id="cwiCart" aria-label="Cart">🛒</button>
  </div>
  <div class="cwi-bar">
    <button class="cwi-btn is-active" data-type="easeOut">easeOut</button>
    <button class="cwi-btn" data-type="uniform">uniform</button>
    <button class="cwi-btn" data-type="random">random</button>
  </div>
  <p class="cwi-hint">Click an icon. The wiggle type changes its whole personality.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d16;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.cwi-wrap{display:flex;flex-direction:column;align-items:center;gap:24px}
.cwi-row{display:flex;gap:18px}
.cwi-icon{position:relative;width:76px;height:76px;border-radius:20px;border:1px solid rgba(255,255,255,.14);background:linear-gradient(160deg,#161c33,#10152a);font-size:32px;cursor:pointer;display:flex;align-items:center;justify-content:center;will-change:transform;transition:border-color .25s}
.cwi-icon:hover{border-color:rgba(129,140,248,.5)}
.cwi-badge{position:absolute;top:-6px;right:-6px;min-width:22px;height:22px;border-radius:99px;background:#ef4444;color:#fff;font:700 12px/22px system-ui;font-style:normal;text-align:center;padding:0 5px}
.cwi-bar{display:flex;gap:8px}
.cwi-btn{padding:9px 18px;border-radius:99px;border:1px solid rgba(255,255,255,.16);background:#141a2e;color:#c9d2f8;font:600 13px ui-monospace,monospace;cursor:pointer;transition:background .2s,border-color .2s}
.cwi-btn:hover{background:#1d2440}
.cwi-btn.is-active{border-color:#818cf8;background:#1d2440}
.cwi-hint{color:#5f6782;font-size:12px;letter-spacing:.05em}`,

  js: `gsap.registerPlugin(CustomEase, CustomWiggle);

var currentType = 'easeOut';

function makeWiggle() {
  // A wiggle ease oscillates between -1 and 1 the configured number of
  // times; 'type' shapes the amplitude envelope over those wiggles.
  CustomWiggle.create('wig', { wiggles: 8, type: currentType });
}
makeWiggle();

document.querySelectorAll('.cwi-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.cwi-btn').forEach(function (b) { b.classList.remove('is-active'); });
    btn.classList.add('is-active');
    currentType = btn.getAttribute('data-type');
    makeWiggle();
  });
});

// The ease's -1..1 output swings each property around its start value:
// rotation ±14°, scale between 0.82 and 1.18, x ±10px.
function wiggle(el, fromVars, toVars) {
  gsap.killTweensOf(el);
  gsap.fromTo(el, fromVars, Object.assign({ duration: 1, ease: 'wig' }, toVars));
}

document.getElementById('cwiBell').addEventListener('click', function () {
  wiggle(this, { rotation: 0 }, { rotation: 14 });
});
document.getElementById('cwiHeart').addEventListener('click', function () {
  wiggle(this, { scale: 1 }, { scale: 1.18 });
});
document.getElementById('cwiCart').addEventListener('click', function () {
  wiggle(this, { x: 0 }, { x: 10 });
});`,

  seo: {
    title: 'CustomWiggle Icons — Free GSAP Wiggle Ease Snippet',
    description: `Bell, heart, and cart icons that shake with GSAP CustomWiggle — configurable wiggle counts and three envelope types. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'CustomWiggle Icons — Oscillation as an Ease, Not a Keyframe List',
      description: `The attention wiggle — a bell shaking for unread notifications, a cart nudging after add-to-item — is usually hacked together with a dozen CSS keyframe stops. GSAP's CustomWiggle (free on the CDN since 3.13) reframes oscillation as an *easing curve*: an ease whose output swings between −1 and 1 a configured number of times before settling. This snippet wiggles three icons on three different properties from one registered ease, with buttons switching the amplitude envelope live.

**An ease that oscillates changes everything**

Normal eases travel from 0 to 1. \`CustomWiggle.create('wig', { wiggles: 8 })\` registers an ease that crosses zero sixteen times, overshooting alternately positive and negative. Applied to a tween targeting \`rotation: 14\`, the element swings between roughly +14° and −14°, decaying per the envelope, and lands exactly at the target. One tween line replaces the keyframe list — and because it's an ease, it composes with any property, duration, or timeline position like every other GSAP curve.

**type is the amplitude envelope**

The three buttons rebuild the ease with different \`type\` values, and the personality change is dramatic. \`easeOut\` starts at full amplitude and decays — a struck bell, the natural physical read. \`uniform\` holds constant amplitude to the end then stops — mechanical, alarm-like, deliberately artificial. \`random\` perturbs the oscillation pattern — organic jitter, closer to shivering than ringing. (\`easeInOut\` and \`anticipate\`, which winds up backward first, round out the set.) Same wiggle count, three different creatures.

**One ease, three properties**

The bell wiggles \`rotation\` (±14°, the canonical ring), the heart wiggles \`scale\` (a flutter around its size), and the cart wiggles \`x\` (a side-to-side nudge). Because the ease is registered by name, each icon's handler is a three-line \`fromTo\` — the oscillation logic lives in the curve, not in per-icon code. This is the pattern worth internalizing: encode motion *character* in a named ease once, then apply it anywhere.

**killTweensOf makes mashing safe**

Each wiggle starts by killing the element's running tweens and re-asserting the zero state via \`fromTo\`. Rapid clicks restart the shake cleanly instead of stacking oscillations into chaos — the same interrupt-safety idiom as every replayable effect, doubly important for an interaction users *will* spam.

**Why rotation origin isn't touched here**

Icons rotate around their centers, which reads fine at ±14°. For a hanging-bell feel, set \`transformOrigin: '50% 0%'\` so it swings from its mount point — one line, and the same ease produces pendulum physics instead of center spin.

**Wiggles are the sibling of bounces**

CustomWiggle is built on CustomEase (as is [CustomBounce](/ui-snippets/custom-bounce-ball/)) — both are generators for curve families too tedious to draw by hand. Bounce is asymmetric gravity; wiggle is symmetric oscillation. Between them and raw CustomEase paths, virtually any motion personality is expressible as a named, reusable ease.

**Customizing it**

Tune \`wiggles\` (3 is a nudge, 15 is a rattle), pair a wiggle with a color pulse on the badge, or trigger on real events — incoming websocket messages wiggling the bell is the production use. Related: attention motion in [notification bell](/ui-snippets/notification-bell/), impact physics in [custom bounce ball](/ui-snippets/custom-bounce-ball/), curve shopping in [gsap ease gallery](/ui-snippets/gsap-ease-gallery/), and click celebration in [like burst button](/ui-snippets/like-burst-button/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `gsap, CustomEase, and CustomWiggle (order matters).` },
      { title: 'Paste HTML, CSS, and JS', text: `Three icon buttons render with a type switcher.` },
      { title: 'Click the bell', text: `It rings with a decaying ±14° rotation wiggle.` },
      { title: 'Switch to uniform', text: `The same click now shakes mechanically.` },
      { title: 'Try heart and cart', text: `Scale flutter and x-nudge share the one ease.` },
      { title: 'Tune wiggles', text: `3 for a polite nudge, 15 for an urgent rattle.` },
    ] },
    features: [
      { title: 'Oscillating ease', text: `Output swings −1 to 1, then settles.` },
      { title: 'Envelope types', text: `easeOut, uniform, and random personalities.` },
      { title: 'Property-agnostic', text: `Rotation, scale, and x share one curve.` },
      { title: 'Named and reusable', text: `Register once, wiggle anywhere.` },
      { title: 'Mash-safe', text: `killTweensOf restarts shakes cleanly.` },
      { title: 'Live rebuilding', text: `Type buttons re-register the ease.` },
      { title: 'One-line variants', text: `Pendulum feel via transformOrigin.` },
      { title: 'CustomEase family', text: `Generated curves, hand-drawable if needed.` },
    ],
    useCases: [
      { title: 'Notification attention', text: `Ring the bell on new activity in a [notification bell](/ui-snippets/notification-bell/) or [notification center](/ui-snippets/notification-center/).` },
      { title: 'Add-to-cart feedback', text: `Nudge the cart icon alongside a [fly to cart button](/ui-snippets/fly-to-cart-button/).` },
      { title: 'Validation shakes', text: `Wiggle rejected inputs in an [inline validation form](/ui-snippets/inline-validation-form/).` },
      { title: 'Like flutters', text: `A heart scale-wiggle to complement [like burst button](/ui-snippets/like-burst-button/).` },
      { title: 'CTA nudges', text: `Periodic gentle wiggles on idle CTAs, subtler than a [pulse button](/ui-snippets/pulse-button/).` },
      { title: 'Impact siblings', text: `Pair with landing squash from [custom bounce ball](/ui-snippets/custom-bounce-ball/).` },
      { icon: 'CODE', title: 'Related: Gooey Text Morph', desc: 'See the [Gooey Text Morph](/ui-snippets/gooey-text/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does an ease produce a back-and-forth shake?', a: `CustomWiggle registers a curve whose output oscillates between −1 and 1 the configured number of times before settling at the end value. A tween to rotation: 14 with that ease therefore swings between roughly +14° and −14°, decaying per the envelope, landing exactly on target. The oscillation lives in the curve — the tween itself is one ordinary line.` },
      { q: 'What do the wiggle types actually change?', a: `The amplitude envelope over the oscillations. easeOut starts full-strength and decays like a struck bell; uniform holds constant amplitude until it abruptly stops — mechanical and alarm-like; random perturbs the pattern into organic jitter. easeInOut ramps both ends, and anticipate winds backward before wiggling. Same count, radically different personalities.` },
      { q: 'Why can the same ease drive rotation, scale, and position?', a: `Because eases are property-agnostic progress curves: GSAP maps the −1..1 output onto whatever delta each tween defines. rotation: 14 swings degrees, scale wiggles size around the start value, x: 10 nudges pixels. Registering the wiggle by name means its character is defined once and applied to any property with zero duplicated logic.` },
      { q: 'How do rapid repeated clicks stay clean?', a: `Every trigger starts with killTweensOf(el) and a fromTo that re-asserts the rest state, so a new shake replaces the old rather than stacking on top of a half-finished oscillation. Without the kill, spam clicks compound transforms into visual chaos — this is the standard interrupt-safety idiom for any replayable effect.` },
      { q: 'How do I make the bell swing from its top like a real bell?', a: `Set transformOrigin: '50% 0%' in the wiggle tween so rotation pivots at the mount point instead of the center — the same ease instantly reads as a pendulum. Combine a rotation wiggle with a small synchronized y wiggle for a bell on a springy bracket; both can share the one 'wig' ease at different amplitudes.` },
      { q: 'How do I use CustomWiggle in React, Vue, or Angular?', a: `Register CustomEase and CustomWiggle at module scope and create named wiggles there when the config is static (re-create in handlers only for live switching like this demo). Fire wiggles from event handlers against refs — no mount effect required — and killTweensOf targets in the unmount cleanup. Icon buttons and the type switcher are straightforward Tailwind compositions.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to guess why one registered ease can drive three completely different-feeling shakes. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how CustomWiggle.create turns a wiggles count and a type into an ease whose output swings between negative one and one, and why that same curve can be applied to rotation, scale, and x with totally different results. The same assistant can help optimize it — ask whether re-creating the named ease on every type-button click is wasteful compared to pre-registering all three variants up front, and whether the killTweensOf-then-fromTo pattern could miss an edge case during extremely rapid repeated clicks. It's also useful for extending the icons: ask it to wire the bell wiggle to a real websocket notification event instead of a click, add a color pulse on the badge synchronized to the wiggle's decay, or build a fourth custom envelope type by hand-drawing a CustomEase path. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a set of wiggling icon buttons in plain HTML, CSS, and JavaScript using GSAP with the CustomEase and CustomWiggle plugins (load all three from a CDN, in that order) — no manual keyframe animation.

Requirements:
- At least three icon buttons (for example a bell, a heart, and a cart), each wiggling a different CSS property when clicked: one rotation, one scale, one horizontal translation.
- Register a single named ease with CustomWiggle.create using a wiggles count (how many oscillations before settling) and a type option controlling the amplitude envelope, and expose at least three selectable type values as buttons that re-register the same named ease with a different envelope.
- Every icon's click handler must reuse the one named ease by reference (not duplicate oscillation logic per icon), animating its specific property with gsap.fromTo from a rest value to a displaced value using that ease.
- Before starting a new wiggle on an element, kill any of that element's in-flight tweens and reset it to its rest value via fromTo's "from" state, so rapid repeated clicks restart the shake cleanly instead of stacking multiple oscillations into visual chaos.
- Make switching the active envelope type live: clicking a type button should immediately re-register the named ease so the next wiggle triggered on any icon uses the newly selected envelope, without requiring a page reload.
- Explain in a comment or to the user why the same ease, applied to rotation versus scale versus x, produces a ring, a flutter, and a nudge respectively, even though the underlying oscillating curve is identical.`,
    },
  },
};

export default customWiggleIcons;
