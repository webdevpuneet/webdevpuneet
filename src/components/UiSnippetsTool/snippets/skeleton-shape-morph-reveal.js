const skeletonShapeMorphReveal = {
  id: 'skeleton-shape-morph-reveal',
  title: 'Skeleton Shape Morph Reveal',
  category: 'loaders',
  html: `<div class="sm-wrap">
  <button class="sm-reload" id="smReload" type="button">Reload card</button>
  <div class="sm-card" id="smCard">
    <div class="sm-block sm-avatar" id="smAvatar"></div>
    <div class="sm-block sm-title" id="smTitle"></div>
    <div class="sm-block sm-body" id="smBody"></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px}

.sm-reload{padding:9px 16px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit}
.sm-reload:disabled{opacity:.55;cursor:not-allowed}

.sm-card{width:100%;max-width:340px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:20px;box-shadow:0 10px 30px rgba(15,23,42,.06);display:flex;flex-direction:column;gap:14px}

/* Every block's width, height, and border-radius are animated directly via
   JS-driven inline styles (a true geometric morph into the real content's
   measured dimensions), not an opacity crossfade between two stacked layers. */
.sm-block{background:linear-gradient(90deg,#e2e8f0 25%,#eef1f5 37%,#e2e8f0 63%);background-size:400% 100%;
  transition:width .5s cubic-bezier(.4,0,.2,1),height .5s cubic-bezier(.4,0,.2,1),border-radius .5s cubic-bezier(.4,0,.2,1),background-color .35s;
  overflow:hidden;display:flex;align-items:center}
.sm-block.sm-shimmer{animation:smShimmer 1.5s ease-in-out infinite}
@keyframes smShimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}

.sm-block.sm-loaded{background:none;animation:none}

.sm-avatar{width:44px;height:44px;border-radius:50%}
.sm-title{width:70%;height:16px;border-radius:6px}
.sm-body{width:100%;height:54px;border-radius:8px}

.sm-avatar-img{width:100%;height:100%;border-radius:50%;background:linear-gradient(135deg,#818cf8,#c084fc);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:15px;opacity:0;transition:opacity .3s}
.sm-block.sm-loaded .sm-avatar-img{opacity:1}

.sm-title-text{font-size:15px;font-weight:800;color:#1e293b;white-space:nowrap;opacity:0;transition:opacity .3s}
.sm-block.sm-loaded .sm-title-text{opacity:1}

.sm-body-text{font-size:12.5px;line-height:1.6;color:#475569;opacity:0;transition:opacity .3s;align-self:flex-start}
.sm-block.sm-loaded .sm-body-text{opacity:1}`,

  js: `// True shape-morph reveal: instead of crossfading a skeleton layer with a
// separately-sized real-content layer, we measure the REAL content's actual
// rendered dimensions off-screen first, then animate the skeleton block's own
// width/height/border-radius directly to those exact measured values before
// swapping in the real content at the end of the morph.
var avatarEl = document.getElementById('smAvatar');
var titleEl = document.getElementById('smTitle');
var bodyEl = document.getElementById('smBody');
var reloadBtn = document.getElementById('smReload');

var CONTENT = {
  initials: 'JM',
  name: 'Jordan Mills',
  bio: 'Product designer focused on onboarding flows and conversion. Building calmer, faster interfaces.',
};

function measureNaturalSize(html, styleText) {
  var probe = document.createElement('div');
  probe.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;left:-9999px;top:-9999px;' + styleText;
  probe.innerHTML = html;
  document.body.appendChild(probe);
  var rect = probe.getBoundingClientRect();
  document.body.removeChild(probe);
  return { width: rect.width, height: rect.height };
}

function morphBlock(el, contentHtml, contentClass, styleForMeasure, targetRadius) {
  var size = measureNaturalSize(contentHtml, styleForMeasure);
  // Animate the skeleton block's own box to the real content's true size.
  el.style.width = Math.max(size.width, 20) + 'px';
  el.style.height = Math.max(size.height, 12) + 'px';
  el.style.borderRadius = targetRadius;

  setTimeout(function () {
    el.classList.remove('sm-shimmer');
    el.classList.add('sm-loaded');
    el.innerHTML = '<div class="' + contentClass + '">' + contentHtml + '</div>';
  }, 500);
}

function runReveal() {
  reloadBtn.disabled = true;
  [avatarEl, titleEl, bodyEl].forEach(function (el) {
    el.classList.remove('sm-loaded');
    el.classList.add('sm-shimmer');
    el.innerHTML = '';
    el.style.width = '';
    el.style.height = '';
    el.style.borderRadius = '';
  });
  // Force a reflow so the reset skeleton sizes are the starting point of the
  // next transition rather than jumping straight to the target size.
  void avatarEl.offsetWidth;

  setTimeout(function () {
    morphBlock(avatarEl, CONTENT.initials, 'sm-avatar-img', 'width:44px;height:44px;font-size:15px;font-weight:800;display:flex;align-items:center;justify-content:center', '50%');
    morphBlock(titleEl, CONTENT.name, 'sm-title-text', 'font-size:15px;font-weight:800;white-space:nowrap', '6px');
    morphBlock(bodyEl, CONTENT.bio, 'sm-body-text', 'font-size:12.5px;line-height:1.6;width:296px', '8px');
  }, 650);

  setTimeout(function () { reloadBtn.disabled = false; }, 1300);
}

reloadBtn.addEventListener('click', runReveal);
runReveal();`,

  seo: {
    title: 'Skeleton Shape Morph Reveal — Skeleton Animates Into Real Content CSS JS',
    description: 'A skeleton loader whose blocks geometrically morph width, height, and border-radius into the real content\\u2019s measured size instead of an instant swap or crossfade. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Skeleton Shape Morph Reveal — Skeleton Blocks That Resize Into the Real Content, Not Just Fade Into It',
      description: `The most common way to end a skeleton loading state is an instant swap or a crossfade — the skeleton fades out, the real content fades in, both occupying roughly the same space. This snippet does something more literal: it measures the real content's actual rendered size first, then animates the skeleton block's own \`width\`, \`height\`, and \`border-radius\` directly to that measured size, so the placeholder visibly reshapes itself into the real content's exact footprint before the content itself fades in on top.

**Measuring real content off-screen**

\`measureNaturalSize()\` creates a throwaway probe element positioned off-screen (\`position: absolute; left: -9999px\`), sets its inner HTML and styling to match what the real content will actually look like, appends it, reads its \`getBoundingClientRect()\`, and immediately removes it. This gives an accurate target width and height for content whose size can't be known in advance — a name of arbitrary length, a bio paragraph that wraps differently depending on its exact word count.

**Animating the skeleton's own geometry**

\`morphBlock()\` then sets the visible skeleton block's \`style.width\`, \`style.height\`, and \`style.borderRadius\` to those measured values. Because the CSS has \`transition\` rules on exactly those three properties, the block doesn't jump — it visibly grows, shrinks, or reshapes from its generic placeholder size into the real content's precise dimensions over half a second, using a real geometric transform rather than an opacity trick layered over a fixed-size container.

**Content fades in only after the shape settles**

A \`setTimeout\` matching the CSS transition duration waits for the resize to finish before swapping in the real markup and adding \`.sm-loaded\`, which fades the actual text or avatar in via its own opacity transition. The two-phase sequence — first the shape morphs, then the content appears inside the now-correctly-sized box — is what separates this from a same-size crossfade: the skeleton and the content are never pretending to be the same size the whole time, they genuinely aren't, and the morph is the part that reconciles them.

**A forced reflow for a real starting point**

When \`runReveal()\` resets the demo, it explicitly reads \`avatarEl.offsetWidth\` to force a synchronous reflow before the next morph begins. Without this, the browser could batch the size reset and the new target size into the same paint, skipping the visible transition entirely — the classic FLIP-technique gotcha this snippet works around.

**Distinct from a same-size crossfade**

This is a different technique from [the skeleton-to-content crossfade loader](/ui-snippets/skeleton-to-content-crossfade/), which layers two same-sized elements and fades between them. Here the skeleton block genuinely changes shape — useful whenever your placeholder's generic size doesn't match the real content's actual footprint, like a name that's much shorter than the skeleton bar suggested, or a bio that wraps to a different height than a fixed skeleton block guessed.

**Customizing it**

Swap the \`CONTENT\` object and probe styles for your real data shape, or drive the initial skeleton sizes and target sizes from actual API response metadata instead of a demo delay. Reuse \`measureNaturalSize()\` and \`morphBlock()\` against any element whose real content size is unknown until it arrives.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'A card renders with shimmering skeleton blocks for an avatar, title, and body.' },
        { title: 'Watch the shapes morph', text: 'After a short delay, each block resizes to the real content\\u2019s exact measured dimensions.' },
        { title: 'Watch the content fade in', text: 'Once each block settles at its new size, the real avatar, name, and bio fade in inside it.' },
        { title: 'Click "Reload card"', text: 'The demo resets to skeleton shapes and morphs again, so you can replay the effect.' },
        { title: 'Edit the CONTENT object', text: 'Change the name, initials, and bio text to see the morph adapt to different measured sizes.' },
        { title: 'Reuse measureNaturalSize/morphBlock', text: 'Apply the same two functions to your own skeleton elements once real data arrives from an API.' },
      ],
    },
    features: [
      'Skeleton blocks morph width, height, and border-radius directly to the real content\\u2019s measured size',
      'Off-screen probe element measures true content dimensions before animating',
      'Two-phase reveal: shape settles first, then content fades in inside the resized box',
      'Forced reflow ensures the resize transition is never skipped by paint batching',
      'CSS transitions (not JS-driven frame stepping) handle the actual geometric animation',
      'Distinct from a same-size opacity crossfade — the skeleton genuinely changes shape',
      'Replayable demo via a reload button',
      'Reusable measureNaturalSize() and morphBlock() helper functions',
      'Zero dependencies — vanilla DOM measurement and CSS transitions',
      'Works for content of unknown or variable size (names, bios, arbitrary text)',
    ],
    useCases: [
      { icon: 'APP', title: 'Profile cards with variable-length content', desc: 'Names and bios of unpredictable length settle into their true size before appearing.' },
      { icon: 'CODE', title: 'Dynamic dashboard widgets', desc: 'Widgets whose real size depends on fetched data can morph rather than mismatch a fixed skeleton.' },
      { icon: 'LEARN', title: 'Teaching the FLIP measurement technique', desc: 'A clear, minimal example of measuring off-screen before animating a real geometric transition.' },
      { icon: 'FORM', title: 'Search result and comment previews', desc: 'Placeholder rows that resolve into real, differently-sized content without a jarring layout jump.' },
      { icon: 'DESIGN', title: 'Alternative to a same-size crossfade', desc: 'Pairs as a contrast case with [the skeleton to content crossfade loader](/ui-snippets/skeleton-to-content-crossfade/) when sizes genuinely differ.' },
      { icon: 'CODE', title: 'Related: Suspense Fallback Card', desc: 'See the [Suspense Fallback Card](/ui-snippets/loader-suspense-fallback-card/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is this different from a skeleton-to-content crossfade?', a: 'A crossfade layers a skeleton and the real content at the SAME fixed size and fades opacity between them — the box never changes shape. This snippet measures the real content\\u2019s true rendered size first, then animates the skeleton block\\u2019s own width, height, and border-radius to that exact size, so the box genuinely reshapes itself before the content fades in inside it.' },
      { q: 'How is the real content\\u2019s size measured before it\\u2019s visible?', a: 'measureNaturalSize() creates a hidden probe element positioned off-screen with position: absolute and a large negative left offset, gives it the same styling and content the real element will have, appends it to the DOM just long enough to call getBoundingClientRect(), then removes it — giving an accurate size without ever flashing it on screen.' },
      { q: 'Why does the code force a reflow with avatarEl.offsetWidth?', a: 'Browsers can batch multiple style changes into a single paint if they happen in the same tick, which would let a width reset and a new target width collapse into one jump with no visible transition. Reading offsetWidth synchronously forces the browser to compute layout at that point, guaranteeing the reset size is genuinely painted before the new target size is applied.' },
      { q: 'What happens if I only change the content text without touching the sizes?', a: 'The morph still runs correctly — measureNaturalSize() always reflects whatever HTML and styles you pass it, so changing CONTENT.name or CONTENT.bio to a longer or shorter string automatically produces a different measured target size and a different morph animation, with no other code changes required.' },
      { q: 'Can this handle content whose size depends on the viewport width?', a: 'Yes, as long as the probe element\\u2019s styling matches the real element\\u2019s actual constraints (e.g. a fixed width for text that wraps). Re-run the measurement (and the morph) on resize if your layout is responsive enough that the target size would meaningfully change.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep a ref to a hidden probe element (or measure a temporarily-rendered off-screen version of your real component) after your data arrives, store the measured size in state, and apply it as inline width/height/border-radius styles on the skeleton element with a CSS transition, swapping in the real component once a timeout matching that transition\\u2019s duration completes.' },
    ],
    aiPrompt: {
      paragraph: `Rather than assuming this is just a fancier crossfade, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how measureNaturalSize() gets an accurate size for content that hasn't been shown yet by rendering a hidden off-screen probe, and why the forced reflow via offsetWidth before the next morph is necessary to avoid the browser silently skipping the transition. The same assistant can help optimize it — for instance asking whether the off-screen probe element should be cached and reused across morphs instead of created and destroyed each time, to reduce layout thrashing. It's also useful for extending it: ask it to make the morph responsive to viewport resizes by re-measuring and re-animating, add a subtle overshoot/bounce easing to the resize transition, or generalize morphBlock() into a small reusable utility that takes any skeleton element and any real-content renderer function. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a skeleton loading state in plain HTML, CSS, and JavaScript — no libraries — where the skeleton blocks genuinely MORPH their shape into the real content's actual size, rather than an instant swap or a same-size opacity crossfade.

Requirements:
- A small card containing at least three skeleton placeholder blocks of different kinds: a circular avatar placeholder, a short title-bar placeholder, and a taller multi-line body-text placeholder, each with a shimmer gradient animation while in the skeleton state.
- Before revealing each block's real content, measure that real content's TRUE rendered size by creating a hidden, off-screen probe element (positioned far outside the viewport, not just display:none) with the same content and styling the real element will have, reading its getBoundingClientRect() width and height, then removing the probe from the DOM.
- Animate the visible skeleton block's own inline width, height, and border-radius styles directly to that measured target size using a CSS transition on those exact properties — the block must visibly grow or shrink into the real content's footprint, not just fade at a fixed size.
- Only after that resize transition has had time to finish should the real content (avatar image/initials, real name text, real body text) actually render inside the block, itself fading in with its own opacity transition — a clear two-phase sequence, not both changes happening simultaneously.
- Include a "reload" button that resets all blocks back to their generic skeleton size and re-runs the whole measure-then-morph sequence, using a forced synchronous reflow (reading an offsetWidth/offsetHeight property) between the reset and the next size change so the transition is never accidentally skipped by the browser batching style changes.
- Make the real content's text (a name and a short bio) different lengths from a naive default skeleton size, so the morph is visually obvious rather than a no-op.`,
    },
  },
};

export default skeletonShapeMorphReveal;
