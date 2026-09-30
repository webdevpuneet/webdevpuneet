const debounceThrottleVisualizer = {
  id: 'debounce-throttle-visualizer',
  title: 'Debounce vs Throttle Visualizer',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="dtv-wrap">
  <div class="dtv-card">
    <div class="dtv-controls-row">
      <input type="range" min="0" max="100" value="50" class="dtv-slider" id="dtv-slider" />
      <button class="dtv-btn" id="dtv-burst-btn">Fire 10 events quickly</button>
      <button class="dtv-btn ghost" id="dtv-reset-btn">Reset</button>
    </div>

    <div class="dtv-lane">
      <div class="dtv-lane-head">
        <span class="dtv-lane-title">Debounce <span class="dtv-ms">(300ms)</span></span>
        <span class="dtv-fire-count" id="dtv-debounce-count">0 fires</span>
      </div>
      <div class="dtv-track" id="dtv-debounce-track">
        <div class="dtv-now-line" id="dtv-debounce-now"></div>
      </div>
    </div>

    <div class="dtv-lane">
      <div class="dtv-lane-head">
        <span class="dtv-lane-title">Throttle <span class="dtv-ms">(300ms)</span></span>
        <span class="dtv-fire-count" id="dtv-throttle-count">0 fires</span>
      </div>
      <div class="dtv-track" id="dtv-throttle-track">
        <div class="dtv-now-line" id="dtv-throttle-now"></div>
      </div>
    </div>

    <div class="dtv-legend">
      <span class="dtv-legend-item"><i class="dtv-swatch tick"></i> raw event</span>
      <span class="dtv-legend-item"><i class="dtv-swatch fire"></i> function fires</span>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.dtv-wrap { width: 100%; max-width: 560px; }
.dtv-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }

.dtv-controls-row { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; flex-wrap: wrap; }
.dtv-slider { flex: 1; min-width: 120px; accent-color: #6366f1; }
.dtv-btn { font-size: 12.5px; font-weight: 600; color: #fff; background: #6366f1; border: none; border-radius: 8px; padding: 8px 12px; cursor: pointer; white-space: nowrap; transition: background 0.15s; }
.dtv-btn:hover { background: #4f46e5; }
.dtv-btn.ghost { background: #f1f5f9; color: #475569; }
.dtv-btn.ghost:hover { background: #e2e8f0; }

.dtv-lane { margin-bottom: 16px; }
.dtv-lane-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px; }
.dtv-lane-title { font-size: 12.5px; font-weight: 700; color: #0f172a; }
.dtv-ms { font-weight: 500; color: #94a3b8; }
.dtv-fire-count { font-size: 11.5px; font-weight: 700; color: #6366f1; font-variant-numeric: tabular-nums; }

.dtv-track { position: relative; height: 46px; background: #f8fafc; border: 1px solid #eef1f8; border-radius: 8px; overflow: hidden; }
.dtv-now-line { position: absolute; top: 0; bottom: 0; width: 2px; background: #cbd5e1; left: 0%; }

.dtv-mark { position: absolute; bottom: 0; width: 2px; border-radius: 1px 1px 0 0; }
.dtv-mark.tick { height: 14px; background: #a5b4fc; top: 6px; }
.dtv-mark.fire { width: 3px; height: 34px; top: 6px; background: #22c55e; box-shadow: 0 0 0 2px rgba(34,197,94,0.15); animation: dtv-fire-pop 0.4s ease; }
@keyframes dtv-fire-pop { from { transform: scaleY(0.3); opacity: 0.4; } to { transform: scaleY(1); opacity: 1; } }

.dtv-legend { display: flex; gap: 16px; margin-top: 4px; }
.dtv-legend-item { display: flex; align-items: center; gap: 6px; font-size: 11.5px; color: #64748b; }
.dtv-swatch { width: 8px; height: 8px; border-radius: 2px; display: inline-block; }
.dtv-swatch.tick { background: #a5b4fc; }
.dtv-swatch.fire { background: #22c55e; }`,
  js: `const slider = document.getElementById('dtv-slider');
const burstBtn = document.getElementById('dtv-burst-btn');
const resetBtn = document.getElementById('dtv-reset-btn');
const debounceTrack = document.getElementById('dtv-debounce-track');
const throttleTrack = document.getElementById('dtv-throttle-track');
const debounceCountEl = document.getElementById('dtv-debounce-count');
const throttleCountEl = document.getElementById('dtv-throttle-count');

const WAIT = 300; // ms, shared window for both lanes
const LANE_MS = 6000; // total horizontal timeline width represented, in ms

let timelineStart = performance.now();
let debounceFires = 0;
let throttleFires = 0;

// ---- Real debounce implementation ----
// Every call resets a pending timer. The wrapped function only actually runs
// once WAIT milliseconds have passed with NO further calls arriving -
// rapid-fire input keeps pushing the fire time later and later.
function debounce(fn, wait) {
  let timer = null;
  return function debounced(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, args);
    }, wait);
  };
}

// ---- Real throttle implementation ----
// The first call fires immediately. After that, calls within the wait window
// are ignored, EXCEPT the loop remembers whether a call was suppressed and,
// if so, fires exactly once more right when the window ends (trailing edge)
// so the final value in a burst is never silently dropped.
function throttle(fn, wait) {
  let lastFireTime = 0;
  let timer = null;
  let pendingArgs = null;
  return function throttled(...args) {
    const now = performance.now();
    const remaining = wait - (now - lastFireTime);
    if (remaining <= 0) {
      clearTimeout(timer);
      timer = null;
      lastFireTime = now;
      fn.apply(this, args);
    } else {
      pendingArgs = args;
      if (!timer) {
        timer = setTimeout(() => {
          lastFireTime = performance.now();
          timer = null;
          const a = pendingArgs;
          pendingArgs = null;
          fn.apply(this, a);
        }, remaining);
      }
    }
  };
}

function xPercentForNow() {
  const elapsed = performance.now() - timelineStart;
  return Math.min(100, (elapsed / LANE_MS) * 100);
}

function addMark(track, type) {
  const el = document.createElement('div');
  el.className = 'dtv-mark ' + type;
  el.style.left = xPercentForNow() + '%';
  track.appendChild(el);
  // Keep the DOM light - drop marks once they scroll fully out of the visible window.
  setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, LANE_MS + 500);
}

function onRawEvent() {
  addMark(debounceTrack, 'tick');
  addMark(throttleTrack, 'tick');
  debouncedFn();
  throttledFn();
}

const debouncedFn = debounce(() => {
  debounceFires++;
  debounceCountEl.textContent = debounceFires + ' fires';
  addMark(debounceTrack, 'fire');
}, WAIT);

const throttledFn = throttle(() => {
  throttleFires++;
  throttleCountEl.textContent = throttleFires + ' fires';
  addMark(throttleTrack, 'fire');
}, WAIT);

slider.addEventListener('input', onRawEvent);

function fireBurst() {
  // Ten raw events fired in rapid succession, ~35ms apart - well inside the
  // 300ms window, so every one of them lands within the same debounce/throttle
  // decision window and the difference in fire count becomes unmistakable.
  let i = 0;
  const id = setInterval(() => {
    onRawEvent();
    i++;
    if (i >= 10) clearInterval(id);
  }, 35);
}
burstBtn.addEventListener('click', fireBurst);

function resetAll() {
  debounceTrack.querySelectorAll('.dtv-mark').forEach(el => el.remove());
  throttleTrack.querySelectorAll('.dtv-mark').forEach(el => el.remove());
  debounceFires = 0;
  throttleFires = 0;
  debounceCountEl.textContent = '0 fires';
  throttleCountEl.textContent = '0 fires';
  timelineStart = performance.now();
}
resetBtn.addEventListener('click', resetAll);`,
  seo: {
    title: 'Debounce vs Throttle Visualizer — Free JS Snippet',
    description: 'A side-by-side animated timeline proving debounce fires once after input stops while throttle fires repeatedly during a burst. Exports to React.',
    about: {
      title: 'Debounce vs Throttle Visualizer — Real Implementations Compared Side by Side on an Animated Timeline',
      description: `Debounce and throttle are the two most commonly confused timing functions in frontend JavaScript, and most explanations of the difference are purely verbal — "debounce waits for a pause, throttle limits the rate" — which is accurate but forgettable, because you never actually see the behaviors happen. This snippet feeds a single shared stream of rapid-fire events into two lanes at once, each wrapping the exact same raw event with a real, correct implementation of debounce or throttle, and plots every raw event as a small tick alongside a taller, differently colored mark for every actual function fire. Run the same burst through both lanes and the fire count difference — debounce firing once, throttle firing several times — becomes something you watch happen, not something you have to take on faith.

**The debounce implementation, and why it has to clearTimeout on every call**

\`debounce(fn, wait)\` closes over a single \`timer\` variable. Every time the returned wrapped function is called, it unconditionally calls \`clearTimeout(timer)\` before scheduling a new \`setTimeout\`. This is the entire mechanism: a rapid burst of ten calls 35ms apart never lets any of the first nine timers survive long enough to fire, because each new call cancels the previous pending timer before it can complete. Only once 300ms pass with *no new call arriving to cancel it* does the very last scheduled timer actually run. This is why the visualizer's debounce lane shows a cluster of raw ticks tightly packed together, followed by exactly one green fire mark sitting 300ms after the *last* tick in the cluster — not 300ms after the first.

**The throttle implementation, and the trailing-edge detail most simplified versions skip**

\`throttle(fn, wait)\` is more involved than debounce, and this is deliberate: a naive throttle that only checks "has enough time passed since the last fire" and otherwise does nothing will silently drop the final value of a burst if the burst ends mid-window. This implementation tracks \`lastFireTime\` and computes \`remaining = wait - (now - lastFireTime)\` on every call. If no time remains, it fires immediately (the "leading edge") and updates \`lastFireTime\`. If time does remain, instead of just discarding the call, it stores the latest \`args\` as \`pendingArgs\` and — only if no trailing timer is already scheduled — schedules one to fire exactly when the window ends (the "trailing edge"), using the *most recent* arguments captured by that point. This guarantees the throttled function always reflects the latest input by the time the window closes, rather than potentially firing with stale, outdated arguments from earlier in the burst.

**Why the two lanes share one event source**

Both lanes are driven by the exact same \`onRawEvent()\` function, called once per raw slider \`input\` event or once per tick of the "Fire 10 events quickly" burst. Every single raw event is passed to *both* \`debouncedFn()\` and \`throttledFn()\` in the same call. This matters for the comparison to be honest: if the two lanes were driven by separately generated random event streams, any difference in fire count could be attributed to different input rather than different timing behavior. By construction, both wrapped functions here see literally identical input, so the entire difference in how many times each one fires is attributable purely to the debounce-versus-throttle logic itself.

**Plotting real elapsed time, not just counting events**

Every mark's horizontal position is computed from \`xPercentForNow()\`, which measures real elapsed milliseconds since the timeline was last reset against a fixed \`LANE_MS\` window (6 seconds), not from a fixed per-event pixel spacing. This means the visual gap between the raw ticks in a burst and their eventual fire mark(s) is an honest representation of the actual 300ms wait — if you fire the burst slowly by hand instead of using the button, the ticks visibly spread further apart and the debounce fire mark visibly follows further behind the last one, exactly matching the real timing.

**Why the fire count is the crux of the whole comparison**

For a burst of ten rapid raw events, debounce ends the burst having fired its wrapped function exactly once — after the last event plus 300ms. Throttle, wrapping the identical burst, fires near the very start (leading edge) and, if the burst duration exceeds the 300ms window, potentially a second time at the trailing edge — always at least once, and typically more than debounce's single fire for the same input. That fire-count difference for identical input, plotted side by side with visibly different-colored taller marks, is the entire point of the snippet: it is not asserted in prose, it is counted and displayed live in each lane's header.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Drag the slider slowly', text: 'Both lanes plot a light purple tick for every raw input event, spaced out in real time to match how quickly you actually moved the slider.' },
      { title: 'Click "Fire 10 events quickly"', text: 'Ten raw events fire about 35 milliseconds apart, well within the shared 300ms window, landing a tight cluster of ticks on both timelines at once.' },
      { title: 'Watch the Debounce lane', text: 'A single taller green "fire" mark appears roughly 300ms after the very last tick in the cluster — every earlier pending timer got cancelled by the next incoming event before it could run.' },
      { title: 'Watch the Throttle lane at the same time', text: 'A green fire mark appears almost immediately at the start of the burst (the leading edge), and depending on how long the burst runs, a second fire mark appears at the trailing edge — visibly more fires than the debounce lane for the identical input.' },
      { title: 'Compare the two "fires" counters in the lane headers', text: 'The numeric counters make the difference explicit: debounce typically reads 1 fire for a quick burst while throttle reads 2, proving the core distinction directly rather than just describing it.' },
      { title: 'Click Reset and try a slow, spread-out drag instead of the burst button', text: 'With gaps longer than 300ms between events, debounce fires after every individual pause and throttle fires close to every event too — the two behaviors converge and look similar, which itself demonstrates that the difference only shows up under rapid, bursty input.' },
    ]},
    features: [
      'Real, correct debounce(fn, wait) implementation using a single cancel-and-reschedule setTimeout, not a simplified approximation',
      'Real, correct throttle(fn, wait) implementation with both leading-edge and trailing-edge firing, so the last value in a burst is never dropped',
      'Both lanes driven by one identical shared event source, so any difference in output is purely due to the timing algorithm, not different input',
      'Marks positioned by real elapsed milliseconds against a fixed timeline window, not evenly spaced by event count',
      'Live numeric fire counters per lane, making the core comparison explicit rather than only visual',
      '"Fire 10 events quickly" burst control that reliably demonstrates the difference on demand, plus manual slider input for exploring the behavior at any speed',
      'Distinct raw-tick vs. actual-fire mark styling (color, height, and a pop-in animation) so the two signal types are unambiguous at a glance',
      'Self-cleaning timeline: old marks are automatically removed once they scroll out of the visible window, keeping the DOM light',
    ],
    useCases: [
      { icon: 'FORM', title: 'Search-as-you-type and autocomplete inputs', desc: 'The classic debounce use case — delay an API search request until the user actually stops typing, avoiding a request per keystroke; compare against the [autocomplete input](/ui-snippets/autocomplete-input) snippet where this exact debounce pattern is applied in a real search field.' },
      { icon: 'CODE', title: 'Scroll and resize event handlers', desc: 'The classic throttle use case — limit how often an expensive scroll-position or window-resize handler actually runs, capping it to a fixed rate instead of firing on every single native event, which can fire dozens of times per second.' },
      { icon: 'LEARN', title: 'Teaching the debounce vs throttle distinction visually', desc: 'A concrete, side-by-side reference for the single most commonly confused pair of timing utilities in frontend interviews and real codebases, pairing the correct implementations with a live, undeniable proof of their differing fire counts.' },
      { icon: 'FORM', title: 'Drag sliders and range input performance tuning', desc: 'Directly demonstrates the tradeoff involved in deciding whether a slider\'s onChange handler (updating a live preview, chart, or price calculation) should be debounced or throttled, using this exact [range slider](/ui-snippets/range-slider) style input as the event source.' },
      { icon: 'DESIGN', title: 'Engineering documentation and onboarding material', desc: 'A ready-made interactive diagram for internal engineering docs or a frontend fundamentals training deck, replacing a static explanation with something a new hire can actually manipulate and watch.' },
      { icon: 'CODE', title: 'Related: Focus Mode / Do Not Disturb Status Toggle', desc: 'See the [Focus Mode / Do Not Disturb Status Toggle](/ui-snippets/focus-status-toggle/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is the actual difference between debounce and throttle, proven by this snippet?', a: 'Debounce fires the wrapped function only once, a fixed delay after the last event in a burst — every new event cancels and reschedules the pending timer, so rapid-fire input keeps pushing the fire time later until the input actually stops. Throttle fires immediately on the first event and then at most once per fixed window afterward regardless of how many more events arrive, so a burst of events lasting longer than the window produces multiple fires. Feeding an identical burst into both (as this snippet does) makes the resulting fire-count difference directly observable rather than something you have to take on faith from a description.' },
      { q: 'Why does the throttle implementation fire on both the leading and trailing edge?', a: 'A throttle that only fires on the leading edge would silently ignore the final state of a fast-moving input if the burst ends inside the wait window — for example, a slider dragged quickly to its final value could have that final value never actually get processed if the last raw event happened to land inside the throttled window. This implementation stores the most recent call\'s arguments as pendingArgs and schedules exactly one trailing-edge fire for when the window closes, guaranteeing the throttled function is eventually called with the latest input, not a stale mid-burst value.' },
      { q: 'Why does the debounce lane always show fewer fires than the throttle lane for the same burst?', a: 'For a burst of ten events fired within a single 300ms window, debounce collapses the entire burst into exactly one fire, 300ms after the last event. Throttle, wrapping the same events, fires once immediately when the burst starts and then, if the burst duration crosses the 300ms boundary, fires again at the trailing edge — meaning throttle will always produce at least as many fires as debounce for the same bursty input, and typically strictly more, which is exactly the difference the two lanes are built to make visible.' },
      { q: 'Can I use these debounce and throttle functions in React, Vue, or Angular?', a: 'Yes, but they must be created once and persisted across renders rather than recreated on every render, or their internal timer/lastFireTime state resets constantly and the behavior breaks. In React, wrap the debounce/throttle call in useMemo or useRef so the same closure instance persists across re-renders, and clear any pending setTimeout inside a useEffect cleanup function on unmount. In Vue, create the wrapped function once outside the reactive setup (or in onMounted, stored in a non-reactive variable) and clear its timer in onUnmounted. In Angular, create it once in the component class (not inside a method that runs on every change detection cycle) and clear it in ngOnDestroy.' },
      { q: 'How do I change the 300ms wait window or test with a different burst pattern?', a: 'Change the WAIT constant at the top of the script — both debounce(fn, WAIT) and throttle(fn, WAIT) read from the same value, so the two lanes stay directly comparable at any window size. To test a different burst pattern, edit the interval passed to setInterval inside fireBurst() (currently 35ms between each of 10 events) — try spacing events further apart than WAIT to see debounce and throttle converge and fire similarly, which itself demonstrates that their difference only becomes dramatic under genuinely rapid, bursty input.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's JS to an AI assistant like Claude and ask it to trace through why throttle() needs both a lastFireTime check and a separate pendingArgs/trailing timer, rather than just checking "has enough time passed" — the trailing-edge case is the detail most simplified explanations of throttle skip entirely, and seeing it implemented correctly is worth more than another verbal description. It's also worth asking how you'd implement a debounce variant with a maxWait option (guaranteeing a fire even under continuous, uninterrupted input, similar to lodash's implementation) and what that would add to the visualization. For extending the snippet: ask for a third lane showing raw, unthrottled/undebounced fires for full comparison, a live-adjustable WAIT slider so the timing window itself can be tuned interactively, or exporting the fire-time data as a downloadable timeline for a blog post or presentation.`,
      prompt: `Build a side-by-side visual comparison of debounce versus throttle in plain HTML, CSS, and JavaScript, no libraries, using real correct implementations of both.

Requirements:
- A single shared, fast-firing input source: a slider the user can drag, plus a "Fire 10 events quickly" button that simulates a rapid burst of events roughly 30-40ms apart, well inside a shared wait window.
- Implement a real, correct debounce(fn, wait) function: every call must clear any pending timer and reschedule a new one, so the wrapped function only actually fires once, after wait milliseconds have passed with no further calls arriving.
- Implement a real, correct throttle(fn, wait) function that fires immediately on the first call (leading edge) and at most once per wait-millisecond window after that — but must NOT silently drop the final call of a burst that ends mid-window; it must track the most recent call's arguments and fire once more at the trailing edge if a call was suppressed during the window.
- Feed the identical burst of raw events into both the debounced and throttled wrapped functions at the same time, so any difference in behavior is attributable purely to the algorithm, not to different input.
- Visualize both lanes as horizontal timelines: plot every raw incoming event as a small tick mark, and separately mark (in a different color and taller) exactly when each lane's wrapped function actually fires, with mark positions reflecting real elapsed time, not a fixed per-event spacing.
- Display a live numeric fire count per lane so the difference in how many times each function actually ran for the identical burst is explicit, not just visual.
- Debounce must visibly show a single fire happening only after the burst has fully stopped; throttle must visibly show more fires than debounce for the same burst, including a fire near the very start of the burst.`,
    },
  },
};

export default debounceThrottleVisualizer;
