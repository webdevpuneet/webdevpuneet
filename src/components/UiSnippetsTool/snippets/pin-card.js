const pinCard = {
  id: 'pin-card',
  title: '3D Pin Card',
  lastmod: '2026-11-07',
  category: 'cards',
  html: `<div class="pc-stage">
  <article class="pc-pin" id="pcPin" tabindex="0" aria-label="Featured project: Aurora Design System">
    <div class="pc-card">
      <div class="pc-thumb" aria-hidden="true">
        <div class="pc-win">
          <div class="pc-win-bar"><i></i><i></i><i></i></div>
          <div class="pc-win-body"><b></b><b></b><b></b></div>
        </div>
      </div>
      <div class="pc-body">
        <span class="pc-badge"><span class="pc-badge-dot"></span>Featured project</span>
        <h3>Aurora Design System</h3>
        <p>A themeable UI kit with 60+ accessible components, shipped as plain HTML, CSS and JavaScript.</p>
        <ul class="pc-tags"><li>HTML</li><li>CSS 3D</li><li>A11y</li></ul>
        <div class="pc-foot">
          <a class="pc-visit" href="https://webdevpuneet.com/ui-snippets/" target="_blank" rel="noopener">Visit site <span aria-hidden="true">→</span></a>
          <button class="pc-copy" id="pcCopy" type="button"><span id="pcCopyTxt" aria-live="polite">Copy link</span></button>
        </div>
      </div>
      <span class="pc-glare" aria-hidden="true"></span>
    </div>

    <div class="pc-anchor" aria-hidden="true">
      <span class="pc-label"><i class="pc-fav"></i>webdevpuneet.com/ui-snippets</span>
      <span class="pc-beam"></span>
      <span class="pc-core"></span>
      <span class="pc-ring"></span>
      <span class="pc-ring pc-ring2"></span>
    </div>
  </article>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,'Segoe UI',sans-serif;background:#07070d;background-image:radial-gradient(700px 380px at 50% 18%,rgba(99,102,241,.16),transparent 70%);color:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh}

.pc-stage{perspective:1100px;padding:30px 40px 170px}
.pc-pin{position:relative;width:300px;transform-style:preserve-3d;transform:rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg));outline:none;will-change:transform}

.pc-card{position:relative;border-radius:20px;background:linear-gradient(180deg,#14152a,#0d0e1a);border:1px solid #25274a;overflow:hidden;transform-origin:50% 100%;transition:transform .5s cubic-bezier(.2,.8,.2,1),box-shadow .5s,border-color .5s;box-shadow:0 20px 40px -28px rgba(0,0,0,.8)}
.pc-pin:hover .pc-card,.pc-pin:focus-within .pc-card{transform:rotateX(24deg) scale(.96);border-color:#4f46e5;box-shadow:0 46px 70px -34px rgba(99,102,241,.55)}

.pc-thumb{height:118px;position:relative;background:radial-gradient(120px 90px at 20% 20%,rgba(129,140,248,.7),transparent 70%),radial-gradient(140px 100px at 85% 90%,rgba(236,72,153,.5),transparent 70%),#1b1c3a;display:flex;align-items:flex-end;justify-content:center;overflow:hidden}
.pc-win{width:74%;border-radius:10px 10px 0 0;background:rgba(10,10,22,.72);border:1px solid rgba(255,255,255,.14);border-bottom:none;backdrop-filter:blur(6px);transform:translateY(10px);transition:transform .5s cubic-bezier(.2,.8,.2,1)}
.pc-pin:hover .pc-win,.pc-pin:focus-within .pc-win{transform:translateY(0)}
.pc-win-bar{display:flex;gap:4px;padding:7px 9px}
.pc-win-bar i{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.28)}
.pc-win-body{display:flex;gap:6px;padding:2px 9px 10px}
.pc-win-body b{flex:1;height:30px;border-radius:5px;background:linear-gradient(180deg,rgba(255,255,255,.16),rgba(255,255,255,.05))}
.pc-win-body b:nth-child(2){height:40px;background:linear-gradient(180deg,rgba(129,140,248,.7),rgba(129,140,248,.15))}

.pc-body{padding:18px 20px 18px;position:relative;z-index:1}
.pc-badge{display:inline-flex;align-items:center;gap:6px;font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#a5b4fc;margin-bottom:9px}
.pc-badge-dot{width:6px;height:6px;border-radius:50%;background:#34d399;box-shadow:0 0 0 0 rgba(52,211,153,.6);animation:pcLive 2s infinite}
@keyframes pcLive{70%{box-shadow:0 0 0 6px rgba(52,211,153,0)}100%{box-shadow:0 0 0 0 rgba(52,211,153,0)}}
.pc-body h3{font-size:19px;font-weight:800;letter-spacing:-.015em;margin-bottom:7px}
.pc-body p{font-size:13px;line-height:1.55;color:#a3a6c4}
.pc-tags{list-style:none;display:flex;gap:6px;margin:13px 0 15px;flex-wrap:wrap}
.pc-tags li{font-size:11px;font-weight:600;color:#c7d2fe;background:rgba(99,102,241,.14);border:1px solid rgba(99,102,241,.3);padding:3px 9px;border-radius:999px}
.pc-foot{display:flex;align-items:center;justify-content:space-between;gap:10px;padding-top:14px;border-top:1px solid #23254a}
.pc-visit{font-size:13px;font-weight:700;color:#fff;text-decoration:none;display:inline-flex;gap:5px;align-items:center}
.pc-visit span{transition:transform .2s}
.pc-visit:hover span{transform:translateX(3px)}
.pc-copy{font:inherit;font-size:12px;font-weight:600;color:#c7d2fe;background:rgba(99,102,241,.12);border:1px solid rgba(99,102,241,.35);padding:6px 12px;border-radius:9px;cursor:pointer;transition:background .2s,color .2s,border-color .2s}
.pc-copy:hover{background:rgba(99,102,241,.28)}
.pc-copy.done{color:#6ee7b7;border-color:rgba(52,211,153,.5);background:rgba(52,211,153,.12)}
.pc-visit:focus-visible,.pc-copy:focus-visible{outline:2px solid #818cf8;outline-offset:2px}
.pc-pin:focus-visible .pc-card{border-color:#818cf8}

.pc-glare{position:absolute;inset:0;background:radial-gradient(circle at var(--gx,50%) var(--gy,0%),rgba(255,255,255,.16),transparent 45%);opacity:0;transition:opacity .4s;pointer-events:none;z-index:2}
.pc-pin:hover .pc-glare,.pc-pin:focus-within .pc-glare{opacity:1}

/* The pin: label, beam, glowing core and rings rise from under the card */
.pc-anchor{position:absolute;left:50%;top:100%;width:0;height:0;pointer-events:none;transform:translateZ(90px)}
.pc-label{position:absolute;left:0;top:10px;display:flex;align-items:center;gap:7px;font-size:11.5px;font-weight:700;letter-spacing:.02em;color:#e0e7ff;background:rgba(30,27,75,.92);border:1px solid #4f46e5;padding:6px 13px 6px 8px;border-radius:999px;white-space:nowrap;opacity:0;transform:translate(-50%,-14px) translateZ(0);transition:opacity .35s,transform .5s cubic-bezier(.2,.8,.2,1);box-shadow:0 8px 24px -8px rgba(99,102,241,.7)}
.pc-fav{width:14px;height:14px;border-radius:50%;background:conic-gradient(#818cf8,#ec4899,#818cf8)}
.pc-beam{position:absolute;left:0;top:44px;width:2px;height:0;margin-left:-1px;border-radius:2px;background:linear-gradient(180deg,#818cf8,rgba(129,140,248,0));transition:height .55s cubic-bezier(.2,.8,.2,1)}
.pc-core{position:absolute;left:0;top:138px;width:8px;height:8px;margin:-4px 0 0 -4px;border-radius:50%;background:#a5b4fc;box-shadow:0 0 14px 3px rgba(129,140,248,.8);opacity:0;transform:scale(0);transition:opacity .3s .25s,transform .4s .25s}
.pc-ring{position:absolute;left:0;top:138px;width:10px;height:10px;border-radius:50%;border:1.5px solid rgba(129,140,248,.7);transform:translate(-50%,-50%) rotateX(72deg);opacity:0}

.pc-pin:hover .pc-label,.pc-pin:focus-within .pc-label{opacity:1;transform:translate(-50%,0) translateZ(0)}
.pc-pin:hover .pc-beam,.pc-pin:focus-within .pc-beam{height:94px}
.pc-pin:hover .pc-core,.pc-pin:focus-within .pc-core{opacity:1;transform:scale(1)}
.pc-pin:hover .pc-ring,.pc-pin:focus-within .pc-ring{animation:pcPing 2.4s ease-out infinite}
.pc-pin:hover .pc-ring2,.pc-pin:focus-within .pc-ring2{animation-delay:1.2s}
@keyframes pcPing{0%{opacity:.8;width:10px;height:10px}100%{opacity:0;width:130px;height:130px}}

@media(max-width:420px){.pc-stage{padding:24px 16px 170px}.pc-pin{width:272px}}
@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition-duration:.01ms!important}}`,

  js: `var pin = document.getElementById('pcPin');
var copyBtn = document.getElementById('pcCopy');
var copyTxt = document.getElementById('pcCopyTxt');
var LINK = 'https://webdevpuneet.com/ui-snippets/pin-card/';
var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

// Smooth cursor tilt: pointermove only sets a target, a rAF loop eases toward it,
// so the card glides instead of snapping. The result is written to CSS variables.
var cur = { x: 0, y: 0 }, tgt = { x: 0, y: 0 }, raf = 0;

function apply() {
  pin.style.setProperty('--rx', cur.x.toFixed(2) + 'deg');
  pin.style.setProperty('--ry', cur.y.toFixed(2) + 'deg');
}
function loop() {
  cur.x += (tgt.x - cur.x) * 0.14;
  cur.y += (tgt.y - cur.y) * 0.14;
  apply();
  raf = (Math.abs(tgt.x - cur.x) > 0.02 || Math.abs(tgt.y - cur.y) > 0.02) ? requestAnimationFrame(loop) : 0;
}
function aim(x, y) {
  tgt.x = x; tgt.y = y;
  if (reduce) { cur.x = x; cur.y = y; apply(); return; }
  if (!raf) raf = requestAnimationFrame(loop);
}

pin.addEventListener('pointermove', function (e) {
  var r = pin.getBoundingClientRect();
  var px = (e.clientX - r.left) / r.width - 0.5;    // -0.5 .. 0.5
  var py = (e.clientY - r.top) / r.height - 0.5;
  aim(-py * 10, px * 14);
  // the glare highlight follows the cursor across the card
  pin.style.setProperty('--gx', ((px + 0.5) * 100).toFixed(1) + '%');
  pin.style.setProperty('--gy', ((py + 0.5) * 100).toFixed(1) + '%');
});
pin.addEventListener('pointerleave', function () { aim(0, 0); });

// Copy the link: Clipboard API first, a hidden-textarea fallback for older browsers / iframes
function legacyCopy(t) {
  return new Promise(function (ok, fail) {
    var ta = document.createElement('textarea');
    ta.value = t; ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta); ta.select();
    var done = false;
    try { done = document.execCommand('copy'); } catch (err) {}
    document.body.removeChild(ta);
    done ? ok() : fail();
  });
}
function copyText(t) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(t).catch(function () { return legacyCopy(t); });
  }
  return legacyCopy(t);
}
function flash(msg, good) {
  copyTxt.textContent = msg;
  copyBtn.classList.toggle('done', good);
  clearTimeout(copyBtn._t);
  copyBtn._t = setTimeout(function () { copyTxt.textContent = 'Copy link'; copyBtn.classList.remove('done'); }, 1400);
}
copyBtn.addEventListener('click', function () {
  copyText(LINK).then(function () { flash('Copied ✓', true); }, function () { flash('Copy failed', false); });
});`,

  seo: {
    title: '3D Pin Card — Tilt, Glare & Floating Pin Hover HTML CSS JS',
    description: `A 3D hover card that tilts back with a cursor-tracking glare while a floating pin label, beam and ripple rings rise below it. Pure HTML, CSS & JS, no library.`,
    about: {
      title: '3D Pin Card — Cursor Tilt, Glare Highlight & a Rising Anchor Pin',
      description: `The 3D pin card is a hover interaction popularised by modern component libraries: a card tilts back into the scene while a "pin" — a floating label, a glowing beam and rippling rings — rises beneath it, as if the card were staked to a point in space. This version is a complete project card with a preview thumbnail, status badge, tags, a visit link and a copy-link button, built with plain HTML, CSS 3D transforms and a small vanilla JavaScript tilt loop.

**Establishing 3D space**

Everything sits in a \`perspective: 1100px\` stage, which gives child transforms real depth — without it, \`rotateX\` just looks like a flat squash. The pin wrapper uses \`transform-style: preserve-3d\` so the card and the pin keep their own positions in 3D instead of flattening into one plane.

**The backward tilt, anchored at the bottom**

On hover or keyboard focus the card rotates with \`rotateX(24deg) scale(.96)\` around \`transform-origin: 50% 100%\`. Anchoring the rotation at the bottom edge means the top recedes while the bottom stays planted exactly where the pin sits, which is what sells the illusion. A soft indigo shadow grows underneath, and the pin is lifted forward with \`translateZ(90px)\` so the card's shadow, which lives in the tilted plane, can never cover it. The thumbnail's mini browser window slides up slightly for extra depth.

**The pin: label, beam, core and rings**

Four small elements rise from beneath the card: a pill-shaped label with the destination URL, a \`.pc-beam\` that grows downward with a gradient fade, a glowing \`.pc-core\` dot at its tip, and two \`.pc-ring\` circles rotated 72° into the floor plane that \`pcPing\` outward and fade on a staggered loop, like ripples around the pin's base. All of it is pure CSS and driven by \`:hover\` and \`:focus-within\`, so keyboard and touch users get the same effect.

**Smooth cursor-tracking tilt and glare**

A \`pointermove\` handler converts the cursor position to a -0.5…0.5 range and only sets a target. A \`requestAnimationFrame\` loop eases the current rotation toward that target (14% per frame) and writes it to \`--rx\` and \`--ry\` custom properties, so the card glides instead of snapping, and the loop stops itself once it settles. The same handler updates \`--gx\` and \`--gy\`, which position a radial-gradient glare over the card so a highlight slides under the pointer like light on glass.

**Copy link with a safe fallback**

The copy button uses the async Clipboard API when available and falls back to a hidden textarea with \`document.execCommand('copy')\`, so it still works in iframes and older browsers. The button text lives in an \`aria-live\` region and switches to "Copied ✓" or "Copy failed", so the result is announced to screen readers. The card itself stays a normal article with a real link, so clicking never hijacks navigation.

**Accessibility and motion**

The card is focusable (\`tabindex="0"\`), shows the pin on \`:focus-within\`, and the buttons have visible focus rings. With \`prefers-reduced-motion\`, animations and easing are switched off and the tilt applies instantly.

**Customizing it**

Change the \`rotateX(24deg)\` for a steeper or gentler tilt, the \`14\` and \`10\` multipliers for how strongly it follows the cursor, and the beam height and ring size for a taller pin. Recolour the indigo accent, swap the thumbnail for a real screenshot, and set the label and \`LINK\` to your URL. For other pointer-reactive cards, see the [glare card](/ui-snippets/glare-card/) and [spotlight card](/ui-snippets/spotlight-card/); for grids of cards try [focus cards](/ui-snippets/focus-cards/) or a [meteor card](/ui-snippets/meteor-card/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A project card renders flat with a thumbnail, badge, tags and two actions. The pin is hidden underneath it.` },
      { title: 'Hover or focus the card', text: `It tilts back in 3D while a URL label, a beam, a glowing core and ripple rings rise beneath it. Tab onto it to get the same effect from the keyboard.` },
      { title: 'Move the cursor', text: `The whole assembly eases toward the pointer and a glare highlight slides across the card surface.` },
      { title: 'Click Copy link', text: `The link is copied (with a fallback for older browsers) and the button confirms with "Copied ✓".` },
      { title: 'Click Visit site', text: `It's a real anchor, so it navigates normally. Set the href to your project URL.` },
      { title: 'Make it yours', text: `Edit the title, text, tags and label, set the \`LINK\` constant in the JS, and replace the thumbnail with your own screenshot.` },
    ] },
    features: [
      { title: 'Real 3D perspective', text: `A perspective stage plus preserve-3d gives the card and pin true depth.` },
      { title: 'Bottom-anchored tilt', text: `transform-origin at the bottom edge makes the top recede while the pin stays planted.` },
      { title: 'Eased cursor tracking', text: `pointermove sets a target and a rAF loop glides toward it, then stops itself when settled.` },
      { title: 'Cursor glare highlight', text: `A radial gradient follows the pointer via --gx / --gy for a glass-like sheen.` },
      { title: 'Rising pin', text: `A URL label, gradient beam, glowing core and two staggered ripple rings animate in with pure CSS.` },
      { title: 'Keyboard and touch ready', text: `The effect runs on :hover and :focus-within, with visible focus rings on every control.` },
      { title: 'Robust copy button', text: `Clipboard API with a textarea fallback and an aria-live result message.` },
      { title: 'Reduced-motion friendly', text: `prefers-reduced-motion removes animation and applies the tilt instantly.` },
    ],
    useCases: [
      { title: 'Featured project cards', text: 'Spotlight a case study or open-source project inside a [focus cards](/ui-snippets/focus-cards/) grid, with the pin showing the destination URL on hover.' },
      { title: 'Portfolio highlights', text: 'Pin your best project in a [portfolio hero](/ui-snippets/portfolio-hero/) so visitors see the live link rising from the card.' },
      { title: 'Product and tool directories', text: 'Give each listing a thumbnail, tags and a copy-link action, and pair with a [meteor card](/ui-snippets/meteor-card/) for variety.' },
      { title: 'Profile card upgrades', text: 'Turn a flat [profile card](/ui-snippets/profile-card/) into a 3D one where the pin shows a handle or website.' },
      { title: 'Link-in-bio pages', text: 'Make a shareable link the centrepiece, with Copy link for quick sharing and a real Visit anchor for navigation.' },
    ],
    faqs: [
      { q: 'Why does the card need a perspective parent?', a: `perspective: 1100px on the stage gives 3D transforms real depth. Without it, rotateX looks like a vertical squash. The pin wrapper also uses transform-style: preserve-3d so the card and pin keep their own 3D positions instead of flattening into one plane.` },
      { q: 'Why is the tilt anchored at the bottom edge?', a: `The card uses transform-origin: 50% 100%, so rotateX moves the top edge back while the bottom stays where the pin attaches. With the default centre origin the bottom would swing forward and detach from the beam.` },
      { q: 'How does the smooth cursor tracking work?', a: `pointermove only stores a target rotation. A requestAnimationFrame loop moves the current rotation 14% of the way there each frame and writes --rx and --ry on the wrapper. It cancels itself when the difference is tiny, so it costs nothing while idle.` },
      { q: 'How do I show the pin on touch devices?', a: `The pin shows on :focus-within, and the card has tabindex="0", so tapping it focuses it and raises the pin. For a persistent state on touch, add a class on tap and include it in the same selectors as :hover and :focus-within.` },
      { q: 'How do I use this 3D pin card in React, Vue, or Angular?', a: `Render the markup as a component and keep the CSS. Hold the target rotation in a ref, run the rAF loop in an effect, and write --rx, --ry, --gx and --gy through the element's style. The pin animation is pure CSS and needs no JS. In Tailwind, use arbitrary values for perspective, rotate-x and the beam height.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to puzzle out the 3D layering by trial and error. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the card's transform-origin is the bottom edge, how preserve-3d on the wrapper keeps the pin attached while the whole assembly leans with the cursor, and why the pointer handler only sets a target while a requestAnimationFrame loop does the easing. It can also help harden it: asking whether the 14% easing factor feels right at 144Hz, how to pause the loop when the tab is hidden, or how to make the pin persist on touch screens where there is no hover. And it's a quick way to extend it: swap the thumbnail for a live screenshot, add a second pin state for "visited" links, or turn it into a grid where only the hovered card tilts. Treat the code as the start of a conversation, not a finished artifact.`,
      prompt: `Build a 3D "pin card" project card with a rising pin, as ONE self-contained HTML file (inline CSS and JS, no libraries, no canvas). Dark theme.

STRUCTURE
- A stage with perspective: 1100px containing a focusable <article tabindex="0"> (300px wide) with transform-style: preserve-3d, and an aria-label. Reserve about 170px of space below it for the pin.
- Inside: a card (20px radius, dark gradient, 1px indigo-tinted border, overflow hidden) with: a 118px thumbnail (layered radial gradients with a translucent mini browser window: three dots and three bars) ; a "Featured project" badge with a pulsing green dot; an h3 "Aurora Design System"; a short description; three tag pills; and a footer with a real "Visit site →" anchor (target=_blank, rel=noopener) and a "Copy link" button.
- A glare overlay (radial-gradient positioned by --gx / --gy, hidden until hover) on top of the card with pointer-events none.
- A pin anchor placed under the card's bottom centre containing: a pill label with a small gradient favicon and a URL, a 2px beam with a gradient fade, a glowing core dot at the beam's tip, and two ring elements rotated rotateX(72deg) into the floor plane.

BEHAVIOUR (CSS, driven by :hover and :focus-within)
- The card tilts back with rotateX(24deg) scale(.96) using transform-origin 50% 100% so the top recedes while the bottom stays planted at the pin; the border brightens and a soft indigo shadow grows. The thumbnail's mini window slides up a few pixels.
- The label fades and rises in, the beam grows from 0 to about 94px, the core scales in, and the rings loop an expand-and-fade keyframe (10px to 130px, staggered by half the duration).

JAVASCRIPT
- pointermove computes the cursor as a -0.5 to 0.5 fraction of the article, and sets a TARGET rotation (rotateX = -py * 10, rotateY = px * 14) plus --gx / --gy percentages for the glare. A requestAnimationFrame loop eases the current rotation toward the target by 14% per frame, writes --rx and --ry on the article (transform: rotateX(var(--rx)) rotateY(var(--ry))), and stops itself once the difference is tiny. pointerleave sets the target back to zero. With prefers-reduced-motion, apply values instantly and skip the loop.
- The Copy link button copies a URL constant with navigator.clipboard when in a secure context, otherwise falls back to a hidden textarea and document.execCommand('copy'). The button text sits in an aria-live="polite" span and shows "Copied ✓" (green style) or "Copy failed" for about 1.4s, then resets.

QUALITY
- Visible focus rings on the link and button; prefers-reduced-motion disables animations; works at 272px width on narrow phones; no console errors.

Return only the finished single HTML file.`,
    },
  },
};

export default pinCard;
