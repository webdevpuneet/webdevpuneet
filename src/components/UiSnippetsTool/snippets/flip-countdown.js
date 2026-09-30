const flipCountdown = {
  id: 'flip-countdown',
  title: 'Flip Countdown',
  lastmod: '2026-07-18',
  category: 'animations',
  html: `<div class="fc-wrap">
  <p class="fc-title">Launch in</p>
  <div class="fc-clock" id="fcClock">
    <div class="fc-unit"><div class="fc-flip" data-unit="hours"></div><span class="fc-lbl">Hours</span></div>
    <div class="fc-unit"><div class="fc-flip" data-unit="minutes"></div><span class="fc-lbl">Minutes</span></div>
    <div class="fc-unit"><div class="fc-flip" data-unit="seconds"></div><span class="fc-lbl">Seconds</span></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0b12;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.fc-title{text-align:center;color:#8a90a6;font-size:14px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;margin-bottom:18px}
.fc-clock{display:flex;gap:16px}
.fc-unit{display:flex;flex-direction:column;align-items:center;gap:10px}
.fc-lbl{font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:#737b93;font-weight:600}

.fc-flip{position:relative;width:78px;height:96px;perspective:340px;font-size:54px;font-weight:800;color:#f3f4fb;font-variant-numeric:tabular-nums}
.fc-flip>div{position:absolute;left:0;width:100%;height:50%;overflow:hidden;background:#1a1d2b;display:flex;justify-content:center;backface-visibility:hidden}
.fc-top{top:0;align-items:flex-start;border-radius:10px 10px 0 0;border-bottom:1px solid #0a0b12}
.fc-top span,.fc-bottom span{line-height:96px;height:96px;display:block}
.fc-bottom{bottom:0;align-items:flex-end;border-radius:0 0 10px 10px}
/* The two animating leaves that fold over the static halves. */
.fc-fold-top{top:0;align-items:flex-start;border-radius:10px 10px 0 0;transform-origin:bottom;border-bottom:1px solid #0a0b12;z-index:2}
.fc-fold-bottom{bottom:0;align-items:flex-end;border-radius:0 0 10px 10px;transform-origin:top;transform:rotateX(90deg);z-index:2}
.fc-flip.is-flipping .fc-fold-top{animation:fcFoldTop .3s ease-in forwards}
.fc-flip.is-flipping .fc-fold-bottom{animation:fcFoldBottom .3s .3s ease-out forwards}
@keyframes fcFoldTop{to{transform:rotateX(-90deg)}}
@keyframes fcFoldBottom{to{transform:rotateX(0deg)}}`,

  js: `var units = { hours: 0, minutes: 0, seconds: 0 };

// Build the layered DOM for one flip tile: static halves + two folding leaves.
document.querySelectorAll('.fc-flip').forEach(function (el) {
  el.innerHTML =
    '<div class="fc-top"><span>00</span></div>' +
    '<div class="fc-bottom"><span>00</span></div>' +
    '<div class="fc-top fc-fold-top"><span>00</span></div>' +
    '<div class="fc-bottom fc-fold-bottom"><span>00</span></div>';
});

function pad(n) { return n < 10 ? '0' + n : '' + n; }

function setTile(el, value) {
  var current = el.querySelector('.fc-top span').textContent;
  var next = pad(value);
  if (current === next) return; // no change, skip the flip
  // Place the new value on the lower static half and the top leaf; old on the rest.
  el.querySelector('.fc-bottom span').textContent = next;
  el.querySelector('.fc-fold-top span').textContent = current;
  el.querySelector('.fc-fold-bottom span').textContent = next;
  el.classList.remove('is-flipping');
  void el.offsetWidth; // restart the CSS animation
  el.classList.add('is-flipping');
  // After the flip lands, commit the new value to the top static half.
  setTimeout(function () { el.querySelector('.fc-top span').textContent = next; }, 600);
}

// Count down to a target 2h 30m from load.
var target = Date.now() + (2 * 3600 + 30 * 60) * 1000;

function tick() {
  var diff = Math.max(0, Math.floor((target - Date.now()) / 1000));
  units.hours = Math.floor(diff / 3600);
  units.minutes = Math.floor((diff % 3600) / 60);
  units.seconds = diff % 60;
  document.querySelectorAll('.fc-flip').forEach(function (el) {
    setTile(el, units[el.dataset.unit]);
  });
}

tick();
setInterval(tick, 1000);`,

  seo: {
    title: 'Flip Countdown — Free HTML CSS JS Flip Clock Countdown Timer',
    description: `A split-flap countdown where each digit tile folds over to reveal the next value using 3D rotateX, only animating on change. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Flip Countdown — A Split-Flap Clock That Folds Each Second',
      description: `The flip countdown is the split-flap "departure board" timer, where each number tile folds down the middle to reveal the next value — the nostalgic mechanical-clock animation used on launch pages and event sites. This snippet builds it with plain HTML, CSS 3D transforms, and a vanilla JavaScript countdown, with no images and no library.

**The four-layer tile**

Each tile is built from four stacked halves: a static top and bottom showing the current number, plus two "leaf" halves that animate. The static halves are split so the top shows the upper portion of the digit and the bottom shows the lower portion, exactly like a physical flap display where a card is divided across the fold line. \`overflow: hidden\` on each half clips the full-height number so only its top or bottom appears.

**The fold animation**

When the value changes, two keyframe animations run in sequence using \`rotateX\` and a \`perspective\` parent. The top leaf — carrying the old number — folds down from \`0deg\` to \`-90deg\`, disappearing at the fold line; then the bottom leaf — carrying the new number — folds up from \`90deg\` to \`0deg\` to land flat. \`backface-visibility: hidden\` and \`transform-origin\` at the fold line make the two leaves read as one card physically flipping over. The second animation is delayed to start exactly when the first finishes, so the motion is continuous.

**Only flipping on change**

\`setTile\` compares the new value to what's displayed and returns early if they match, so a tile only animates when its digit actually changes — the seconds flip every second, but the hours sit still until they tick. To replay a CSS animation each second, the code removes the \`is-flipping\` class, forces a reflow with \`void el.offsetWidth\`, then re-adds it; without that reflow the browser would coalesce the change and the animation wouldn't restart.

**Committing the value**

After the fold lands, a \`setTimeout\` writes the new number into the top static half so the tile rests showing the final value, ready for the next flip. The numbers use \`font-variant-numeric: tabular-nums\` so the digits don't shift width as they change.

**A real countdown**

A target timestamp is set a couple of hours ahead, and a one-second \`setInterval\` recomputes hours, minutes, and seconds from the remaining difference, clamped at zero so it stops cleanly at the deadline. Each \`.fc-flip\` reads its unit from a \`data-unit\` attribute, so the same tile logic drives all three groups.

**Customizing it**

Point \`target\` at a real launch date, add a days group, change the tile size or colours, or adjust the fold duration. Pair it with a [countdown timer](/ui-snippets/countdown-timer/), a [flip clock](/ui-snippets/flip-clock/), or a [coming soon hero](/ui-snippets/coming-soon-hero/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A three-group flip countdown starts ticking.` },
      { title: 'Watch the seconds', text: `Each second the tile folds to the next value.` },
      { title: 'Note minutes and hours', text: `They flip only when they actually change.` },
      { title: 'Set a target', text: `Point target at your real launch timestamp.` },
      { title: 'Add a days group', text: `Copy a unit and extend the time math.` },
      { title: 'Restyle the tiles', text: `Change size, color, and fold speed.` },
    ] },
    features: [
      { title: 'Split-flap fold', text: `Two 3D leaves fold over the static halves.` },
      { title: 'Sequenced animation', text: `Bottom leaf starts as the top one ends.` },
      { title: 'Flips only on change', text: `Idle tiles stay still to save work.` },
      { title: 'Animation restart', text: `Reflow trick replays CSS each second.` },
      { title: 'Tabular digits', text: `Numbers keep equal width while flipping.` },
      { title: 'Clamped countdown', text: `Stops cleanly at zero at the deadline.` },
      { title: 'Data-unit driven', text: `One tile logic powers all groups.` },
      { title: 'No images', text: `Pure CSS 3D, no sprites or fonts.` },
    ],
    useCases: [
      { title: 'Launch pages', text: `Headline a [coming soon hero](/ui-snippets/coming-soon-hero/).` },
      { title: 'Sales', text: `Urgency above a [pricing card](/ui-snippets/pricing-card/).` },
      { title: 'Events', text: `A richer [countdown timer](/ui-snippets/countdown-timer/).` },
      { title: 'Clocks', text: `Pair with a [flip clock](/ui-snippets/flip-clock/) for the time.` },
      { title: 'Drops', text: `Build hype near a [stock urgency bar](/ui-snippets/stock-urgency-bar/).` },
      { title: 'Trials', text: `Show time left beside a [trial countdown](/ui-snippets/trial-countdown/).` },
      { icon: 'CODE', title: 'Related: Magnetic Grid', desc: 'See the [Magnetic Grid](/ui-snippets/magnetic-grid/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the fold animation built?', a: `Each tile has static top and bottom halves and two animating leaves. On change, the top leaf carrying the old number folds from 0 to -90 degrees with rotateX under a perspective parent, then the bottom leaf carrying the new number folds from 90 to 0 degrees. backface-visibility: hidden and a fold-line transform-origin make the two leaves read as one card flipping over.` },
      { q: 'Why does the animation need a forced reflow?', a: `To replay a CSS animation every second, the code removes the is-flipping class, reads void el.offsetWidth to force a reflow, then re-adds the class. Without that reflow the browser coalesces the remove and add into no change, so the animation would not restart. The reflow guarantees a fresh run each tick.` },
      { q: 'Do all the tiles animate every second?', a: `No. setTile compares the new value to the displayed one and returns early if they match, so a tile only folds when its digit actually changes. The seconds flip every second, but minutes and hours sit still until they tick, which avoids needless animation and looks correct.` },
      { q: 'How is the countdown calculated?', a: `A target timestamp is set ahead of now, and a one-second interval recomputes the remaining seconds, then derives hours, minutes, and seconds with division and modulo. The difference is clamped at zero so the clock stops cleanly at the deadline. Each tile reads its unit from a data-unit attribute to pick the right value.` },
      { q: 'How do I use this flip countdown in React, Vue, or Angular?', a: `Keep the target time and a ticking value in state with a one-second interval in a mount effect (cleared on unmount). For the flip, it is cleanest to keep the four-layer tile as a small child component that animates on a value-prop change via a key change or a transition, rather than manual class toggling. The 3D CSS ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the four-layer tile structure or the reflow trick by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why setTile writes the new value into the fold-bottom leaf before the fold-top leaf's animation even starts, and why "void el.offsetWidth" is needed between removing and re-adding the is-flipping class. The same assistant can help optimize it — ask whether rebuilding all four child divs with innerHTML on every mount is necessary, or whether the two chained keyframe animations (fold-top then fold-bottom, sequenced with an animation-delay) could be replaced with a single Web Animations API timeline for more precise control. It's also a good way to extend the countdown: have it add a days group ahead of hours, point it at a real ISO launch date instead of a fixed two-hour-thirty-minute offset, or fire a completion callback when the countdown clamps to zero. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a split-flap "flip countdown" timer in plain HTML, CSS, and JavaScript using only CSS 3D transforms (rotateX under a perspective parent) — no images, no canvas, no libraries.

Requirements:
- Three unit groups (hours, minutes, seconds), each rendering a tile built from four stacked, absolutely-positioned halves: a static top half and static bottom half showing the current number (each clipped with overflow hidden so together they show one full digit split at the seam), plus two "leaf" halves — a fold-top leaf with transform-origin at the bottom and a fold-bottom leaf with transform-origin at the top, both also clipped.
- On a value change for a given tile: write the OLD value into the fold-top leaf and the NEW value into both the static bottom half and the fold-bottom leaf, then trigger two sequenced CSS keyframe animations — the fold-top leaf rotating from 0 degrees to -90 degrees (folding down and out of view), followed immediately (the second animation's delay equals the first's duration) by the fold-bottom leaf rotating from 90 degrees to 0 degrees (folding up into place) — so the motion reads as one continuous card flip. After the sequence completes, commit the new value into the static top half via a timeout matching the total animation duration.
- Before triggering any animation on a tile, compare the incoming value against what is currently shown and skip the entire flip (no class change, no leaf updates) if they are identical.
- To guarantee the CSS animation restarts every time a flip is needed (even back-to-back identical-looking triggers), remove the flipping class, force a synchronous reflow by reading the element's offsetWidth, then re-add the class.
- Compute a genuine countdown: set a target timestamp some fixed duration ahead of the current time on load, and every second recompute the remaining hours, minutes, and seconds from the live difference (clamped at zero so it never goes negative), feeding each unit into its tile by a data-unit attribute rather than hard-coded references.`,
    },
  },
};

export default flipCountdown;
