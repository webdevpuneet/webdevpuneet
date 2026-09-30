const circularProgress = {
  id: 'circular-progress',
  title: 'Circular Progress Ring',
  lastmod: '2026-08-17',
  category: 'loaders',
  html: `<div class="demo">
  <div class="ring-row">
    <div class="ring-wrap">
      <svg class="ring" viewBox="0 0 120 120">
        <circle class="ring-track" cx="60" cy="60" r="52"></circle>
        <circle class="ring-fill" id="ringA" cx="60" cy="60" r="52"></circle>
      </svg>
      <div class="ring-label"><span id="valA">68</span>%</div>
    </div>
    <div class="ring-wrap sm">
      <svg class="ring" viewBox="0 0 120 120">
        <circle class="ring-track" cx="60" cy="60" r="52"></circle>
        <circle class="ring-fill ring-warn" id="ringB" cx="60" cy="60" r="52"></circle>
      </svg>
      <div class="ring-label"><span id="valB">30</span>%</div>
    </div>
    <div class="ring-wrap sm">
      <svg class="ring" viewBox="0 0 120 120">
        <circle class="ring-track" cx="60" cy="60" r="52"></circle>
        <circle class="ring-fill ring-danger" id="ringC" cx="60" cy="60" r="52"></circle>
      </svg>
      <div class="ring-label"><span id="valC">92</span>%</div>
    </div>
  </div>
  <div class="controls">
    <label>Storage used: <span id="sliderVal">68</span>%</label>
    <input type="range" id="slider" min="0" max="100" value="68">
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8f9fa; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo { width: 100%; max-width: 420px; }
.ring-row { display: flex; align-items: center; justify-content: center; gap: 24px; margin-bottom: 28px; }
.ring-wrap { position: relative; width: 128px; height: 128px; }
.ring-wrap.sm { width: 88px; height: 88px; }
.ring { width: 100%; height: 100%; transform: rotate(-90deg); }
.ring-track { fill: none; stroke: #eef0f3; stroke-width: 10; }
.ring-fill { fill: none; stroke: #2563eb; stroke-width: 10; stroke-linecap: round; stroke-dasharray: 326.7; stroke-dashoffset: 326.7; transition: stroke-dashoffset 0.5s cubic-bezier(.4,0,.2,1); }
.ring-warn { stroke: #d97706; }
.ring-danger { stroke: #dc2626; }
.ring-label { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; color: #111827; }
.ring-wrap.sm .ring-label { font-size: 15px; }
.controls { text-align: center; }
.controls label { display: block; font-size: 13px; color: #4b5563; margin-bottom: 8px; font-weight: 600; }
.controls input { width: 100%; }`,
  js: `var CIRCUMFERENCE = 2 * Math.PI * 52;

function setRing(el, valueEl, pct) {
  pct = Math.max(0, Math.min(100, pct));
  var offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;
  el.style.strokeDashoffset = offset;
  valueEl.textContent = Math.round(pct);
}

setRing(document.getElementById('ringA'), document.getElementById('valA'), 68);
setRing(document.getElementById('ringB'), document.getElementById('valB'), 30);
setRing(document.getElementById('ringC'), document.getElementById('valC'), 92);

var slider = document.getElementById('slider');
var sliderVal = document.getElementById('sliderVal');
var ringA = document.getElementById('ringA');
var valA = document.getElementById('valA');

slider.addEventListener('input', function() {
  var pct = Number(slider.value);
  sliderVal.textContent = pct;
  setRing(ringA, valA, pct);
});`,
  seo: {
    title: 'Circular Progress Ring — SVG HTML CSS JS Snippet',
    description: 'SVG circular progress ring driven by stroke-dashoffset, with a live slider demo and color-coded threshold variants. Exports to React, Vue & Angular.',
    about: {
      title: 'Circular Progress Ring — SVG stroke-dashoffset Technique',
      description: `A circular progress ring shows completion as an arc filling around a circle rather than a horizontal bar — used for storage quotas, upload progress, goal completion, and dashboard KPI tiles where a compact round shape fits better than a linear one. This snippet builds the ring from two stacked SVG circles and animates the fill purely by rewriting one stroke property.\n\n**Two stacked circles**\n\nEach ring is an \`<svg>\` containing a \`.ring-track\` circle (the full gray background ring) and a \`.ring-fill\` circle drawn directly on top of it with an accent color. Both share the same \`cx\`, \`cy\`, and \`r\` — only the fill circle's stroke properties change to represent progress.\n\n**stroke-dasharray and stroke-dashoffset**\n\n\`stroke-dasharray\` is set to the circle's full circumference (\`2 × π × r\`, or 326.7 for \`r=52\`), which turns the stroke into one dash exactly as long as the circle itself — visually indistinguishable from a solid stroke at rest. \`stroke-dashoffset\` then shifts where that dash starts drawing from. Setting the offset equal to the full circumference makes the dash start exactly one full lap away, so none of the stroke is visible; setting it to \`circumference × (1 − pct/100)\` reveals exactly \`pct\`% of the ring. This is the standard SVG technique for drawable progress rings and expanding donut charts alike, and it needs no \`<canvas>\`, no clip-path, and no JavaScript-driven redraw loop.\n\n**Why the SVG is rotated -90deg**\n\nAn SVG circle's stroke naturally starts drawing from the 3 o'clock position and proceeds clockwise. \`transform: rotate(-90deg)\` on the whole \`<svg>\` rotates that starting point to 12 o'clock, which is the conventional "empty to full, starting at the top" reading direction users expect from a progress ring.\n\n**Animating the fill**\n\nThe CSS \`transition: stroke-dashoffset 0.5s cubic-bezier(.4,0,.2,1)\` means any JavaScript update to the offset animates smoothly rather than jumping instantly — \`setRing()\` only ever sets the target \`strokeDashoffset\` value once per call; the browser's compositor handles interpolating between the old and new value.\n\n**Percentage math lives in one function**\n\n\`setRing(el, valueEl, pct)\` is the single place that converts a percentage into a dashoffset and updates the paired numeric label — every ring on the page, regardless of size or color, calls the same function, so the circumference constant (\`CIRCUMFERENCE = 2 * Math.PI * 52\`) only needs to match the \`r\` value used in the SVG markup, and changing the ring's radius means updating exactly one number.\n\n**Threshold-based coloring**\n\nThe three demo rings use three color modifier classes — \`.ring-fill\` (blue, default), \`.ring-warn\` (amber), \`.ring-danger\` (red) — applied as a plain class swap. In a real dashboard, choose the class based on the value itself (for example, red above 90%, amber above 70%, blue otherwise) so the ring communicates urgency without the user needing to read the number.\n\n**Sizing variants**\n\nThe \`.ring-wrap.sm\` modifier only changes the container's width/height and the label's font size — because the SVG uses a \`viewBox\` rather than fixed pixel dimensions, it scales cleanly to any container size without recalculating the stroke width or dash values, though very small rings may need a thinner \`stroke-width\` to avoid the ring looking disproportionately thick.\n\n**Live updates from real data**\n\nThe slider in the demo stands in for any real value source — replace its \`input\` event with a \`fetch\` response handler, a WebSocket message, or a polling interval, and call \`setRing()\` with the new percentage each time new data arrives.\n\nSee also the [gauge chart](/ui-snippets/gauge-chart/) for a half-circle variant of the same technique, and the [quota usage meter](/ui-snippets/quota-usage-meter/) for a linear-bar alternative to this ring.`,
    },
    howToUse: [
      { title: 'Copy one ring-wrap block', text: 'Each ring is a .ring-wrap div containing an SVG with a .ring-track and .ring-fill circle, plus a .ring-label overlay for the numeric text.' },
      { title: 'Match the circumference constant to your radius', text: 'If you change the circle\'s r attribute from 52, recompute CIRCUMFERENCE as 2 * Math.PI * yourRadius and update stroke-dasharray in the CSS to match.' },
      { title: 'Call setRing with a percentage', text: 'setRing(fillCircleElement, labelElement, percentage) updates both the ring\'s fill and its numeric label in one call — use it for both the initial render and any live updates.' },
      { title: 'Pick a color based on the value', text: 'Swap the ring-warn or ring-danger class onto .ring-fill when a value crosses your thresholds, so color communicates urgency without extra text.' },
      { title: 'Resize with .ring-wrap.sm or your own variant', text: 'Add a size modifier class changing only the wrapper\'s width/height and label font-size — the SVG viewBox handles the rest automatically.' },
    ],
    features: [
      'Pure SVG stroke-dashoffset technique — no canvas, no clip-path, no per-frame redraw loop',
      'Smooth animated fill transition driven entirely by CSS, triggered by a single JS property update',
      'One shared setRing() function drives every ring on the page regardless of size or color',
      'Three color variants (default, warning, danger) for threshold-based visual urgency',
      'Scales cleanly to any container size via SVG viewBox with no per-size recalculation',
      'Live percentage label overlaid at the ring\'s center, always in sync with the visual fill',
      'Works with any live data source — swap the demo slider for a fetch, WebSocket, or poll handler',
      'Zero dependencies — pure HTML, CSS, and JavaScript',
    ],
    useCases: [
      { icon: 'CHART', title: 'Storage & Quota Meters', desc: 'Disk usage, API rate limits, or subscription quota indicators' },
      { icon: 'APP', title: 'Dashboard KPI Tiles', desc: 'Compact completion indicators inside a [skeleton dashboard](/ui-snippets/skeleton-dashboard/) grid' },
      { icon: 'GEAR', title: 'Upload & Task Progress', desc: 'File upload or long-running task progress, paired with a [download button](/ui-snippets/download-button/) ring for a matching visual language' },
      { icon: 'FLOW', title: 'Goal & Habit Tracking', desc: 'Daily goal completion rings in a fitness or productivity app' },
      { icon: 'CODE', title: 'Related: Audio Buffering Visualizer', desc: 'See the [Audio Buffering Visualizer](/ui-snippets/loader-audio-buffering-visualizer/) for a related loaders pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Stage Progress Fill Checklist', desc: 'See the [Stage Progress Fill Checklist](/ui-snippets/stage-progress-fill-checklist/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I change the ring\'s thickness?', a: 'Adjust stroke-width on both .ring-track and .ring-fill — keep them equal so the fill sits centered over the track. A thicker stroke may need a slightly larger radius to avoid the ring looking cramped inside its viewBox.' },
      { q: 'Why does the SVG need to be rotated -90 degrees?', a: 'An SVG circle\'s stroke starts drawing at the 3 o\'clock position by default. Rotating the whole SVG -90 degrees moves that starting point to 12 o\'clock, which matches how progress rings are conventionally read — starting at the top and filling clockwise.' },
      { q: 'How do I connect this to real progress data, like a file upload?', a: 'Listen to your upload mechanism\'s progress event (for example XMLHttpRequest\'s progress event with loaded/total, or a streamed fetch reader) and call setRing(fillEl, labelEl, (loaded/total)*100) on each update — the same function used for the demo slider.' },
      { q: 'Can I show an indeterminate (unknown duration) loading ring instead of a percentage?', a: 'Yes — remove the dashoffset percentage logic, set stroke-dasharray to roughly 25% of the circumference so only a partial arc is visible, and add a CSS animation that rotates the whole ring continuously, similar to a classic spinner but ring-shaped.' },
      { q: 'How do I use this circular progress ring in React, Vue, or Angular?', a: 'Open the Export menu on the snippet page for a React component computing dashoffset from a percentage prop, a React + Tailwind version, a Vue 3 SFC, or an Angular standalone component with an @Input() percentage — all preserve the SVG structure and the animated transition.' },
    ],
    aiPrompt: {
      paragraph: `Paste this progress ring's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how stroke-dasharray and stroke-dashoffset combine to reveal a specific arc length, and why the whole SVG is rotated -90 degrees to make the fill start from the top. It's a good snippet to hand to an assistant for wiring to real data — describe your actual progress source (a file upload's progress event, a fetch stream, a WebSocket) and have it replace the demo slider with genuine live updates. Beyond that, ask it to add an indeterminate loading variant for when the total duration is unknown, or a multi-segment ring showing several categories' shares of a whole, similar to a donut chart but built on this same stroke technique.`,
      prompt: `Build an animated SVG circular progress ring in plain HTML, CSS, and JavaScript, no framework, no libraries.

Requirements:
- Each ring must be built from two overlapping SVG circles sharing the same center and radius inside one <svg> element: a plain gray background track circle, and a colored foreground circle whose visible arc length represents a percentage value.
- The foreground circle's progress must be controlled purely through the stroke-dasharray and stroke-dashoffset CSS/SVG properties, calculated from the circle's true circumference, not through clip-path, canvas drawing, or conic-gradient.
- The whole SVG must be rotated so the arc visibly starts filling from the top of the circle (12 o'clock) and proceeds clockwise, rather than starting from the SVG's default 3 o'clock position.
- Changing the dashoffset value must animate smoothly via a CSS transition rather than jumping instantly, so any JavaScript update to the percentage produces a smooth fill animation.
- A single reusable JavaScript function must take a percentage value, the ring element, and a label element, and update both the ring's visual fill and a numeric percentage label displayed at the ring's center in one call.
- Demonstrate at least three rings on the page: one large ring controlled live by a range slider input, and two smaller static rings using different accent colors to represent a warning and a danger threshold state, showing the same technique works at multiple sizes and colors without changing the underlying math.`,
    },
  },
};

export default circularProgress;
