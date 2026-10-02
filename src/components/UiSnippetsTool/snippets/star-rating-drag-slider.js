const starRatingDragSlider = {
  id: 'star-rating-drag-slider',
  title: 'Star-Rating Drag Slider',
  lastmod: '2026-09-14',
  category: 'forms',
  html: `<div class="srd-wrap">
  <div class="srd-track" id="srdTrack" tabindex="0" role="slider" aria-label="Rating" aria-valuemin="0" aria-valuemax="5" aria-valuenow="3.5">
    <div class="srd-stars-back">★★★★★</div>
    <div class="srd-stars-fill" id="srdFill">★★★★★</div>
    <div class="srd-handle" id="srdHandle"></div>
  </div>
  <div class="srd-readout" id="srdReadout">3.5 / 5</div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f6f7f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.srd-wrap{display:flex;flex-direction:column;align-items:center;gap:12px}
.srd-track{position:relative;width:260px;height:52px;cursor:pointer;touch-action:none}
.srd-track:focus-visible{outline:2px solid #6366f1;outline-offset:4px;border-radius:6px}
.srd-stars-back,.srd-stars-fill{position:absolute;inset:0;font-size:48px;line-height:52px;letter-spacing:6px;white-space:nowrap}
.srd-stars-back{color:#e5e7eb}
.srd-stars-fill{color:#f59e0b;width:70%;overflow:hidden}
.srd-handle{position:absolute;top:50%;left:70%;width:14px;height:14px;border-radius:50%;background:#fff;border:3px solid #f59e0b;box-shadow:0 2px 6px rgba(15,23,42,.25);transform:translate(-50%,-50%);pointer-events:none}
.srd-readout{font:800 14px system-ui,sans-serif;color:#1f2937}`,

  js: `var track = document.getElementById('srdTrack');
var fill = document.getElementById('srdFill');
var handle = document.getElementById('srdHandle');
var readout = document.getElementById('srdReadout');

var MAX = 5;
var value = 3.5;

function render() {
  var pct = (value / MAX) * 100;
  fill.style.width = pct + '%';
  handle.style.left = pct + '%';
  readout.textContent = value.toFixed(1) + ' / ' + MAX;
  track.setAttribute('aria-valuenow', value.toFixed(1));
}

function valueFromClientX(clientX) {
  var rect = track.getBoundingClientRect();
  var x = Math.max(0, Math.min(rect.width, clientX - rect.left));
  var raw = (x / rect.width) * MAX;
  return Math.round(raw * 2) / 2; // snap to nearest half star
}

var dragging = false;

function onMove(e) {
  if (!dragging) return;
  var clientX = e.touches ? e.touches[0].clientX : e.clientX;
  value = valueFromClientX(clientX);
  render();
}

track.addEventListener('pointerdown', function (e) { dragging = true; onMove(e); });
window.addEventListener('pointermove', onMove);
window.addEventListener('pointerup', function () { dragging = false; });
track.addEventListener('touchstart', function (e) { dragging = true; onMove(e); }, { passive: true });
window.addEventListener('touchmove', onMove, { passive: true });
window.addEventListener('touchend', function () { dragging = false; });

track.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { value = Math.min(MAX, value + 0.5); render(); e.preventDefault(); }
  else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { value = Math.max(0, value - 0.5); render(); e.preventDefault(); }
  else if (e.key === 'Home') { value = 0; render(); e.preventDefault(); }
  else if (e.key === 'End') { value = MAX; render(); e.preventDefault(); }
});

render();`,

  seo: {
    title: 'Star-Rating Drag Slider — HTML CSS JS Snippet',
    description: 'A continuous drag slider disguised as a row of stars — drag anywhere on the row to set a rating with half-star precision, no separate star buttons to click. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Star-Rating Drag Slider — A Slider Dressed as Stars, Not Five Separate Buttons',
      description: `A typical star rating is five separate clickable icons, each an all-or-nothing button. This is structurally a completely different thing: it's a single continuous slider — the exact same "drag anywhere, get a proportional value" mechanic as a volume control — that happens to render its fill using the star glyph instead of a plain colored bar.\n\n**Two identical star rows, one clipped**\n\nThe trick is two stacked copies of \`★★★★★\`: a gray "background" row showing all five empty stars, and an amber "fill" row directly on top of it, clipped with \`width: X%\` and \`overflow: hidden\`. Because both rows use identical text, font-size, and letter-spacing, clipping the top row at, say, 70% width doesn't just show 3.5 stars-worth of *characters* — it shows exactly 3.5 stars-worth of the same continuous strip, including a partially-visible fifth character if the value lands mid-star. That's a genuinely continuous fill using only two \`<div>\`s, no per-star DOM elements or SVG paths at all.\n\n**Half-star snapping, not five discrete zones**\n\nDragging converts a pointer's x-position into a raw 0–5 value, then rounds it to the nearest 0.5 with \`Math.round(raw * 2) / 2\` — giving 10 addressable positions (0, 0.5, 1, 1.5 … 5) instead of the usual 5-button rating's binary all-or-nothing stars, while still reading as a clean, deliberate rating rather than an arbitrary decimal.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'A star row appears with 3.5 stars filled and "3.5 / 5" shown below it.' },
        { title: 'Drag across the stars', text: 'The fill follows your cursor continuously, snapping to the nearest half-star as you move.' },
        { title: 'Click anywhere on the row', text: 'Jump straight to that rating without needing to drag from the start.' },
        { title: 'Use the keyboard', text: 'Focus the row and press Left/Right (or Up/Down) to adjust by half a star; Home/End jump to 0 or 5.' },
        { title: 'Change the scale', text: 'Adjust MAX in the JS for a 10-star or 3-star scale — the star string and math scale together.' },
      ],
    },
    features: [
      'A genuine continuous slider, not five separate all-or-nothing star buttons',
      'Two stacked, identically-styled star rows — one clipped by percentage width — produce a real fractional fill',
      'Snaps to the nearest half-star during drag, giving 10 clean addressable positions on a 5-star scale',
      'Click-anywhere-to-jump plus true drag, unified across pointer and touch input',
      'Full keyboard support with half-star steps, plus Home/End for the extremes',
      'A live numeric readout stays in sync with the visual fill from the same underlying value',
    ],
    useCases: [
      { icon: 'FORM', title: 'Review forms', desc: 'Let a reviewer express precise opinions by dragging anywhere along a row of stars, with half-star precision and no separate buttons.' },
      { icon: 'CODE', title: 'Feedback and satisfaction surveys', desc: 'Offer a tactile, continuous alternative to five all-or-nothing stars, using two stacked identical rows with one clipped by percentage width.' },
      { icon: 'APP', title: 'Difficulty or quality ratings', desc: 'Rate content on cards, either read-only or interactive, snapping to ten clean half-star positions during a drag.' },
      { icon: 'DESIGN', title: 'Admin scoring tools', desc: 'Provide fast, precise scoring for curating content, with click-anywhere-to-jump and true dragging unified across pointer and touch.' },
      { icon: 'CODE', title: 'Slider-in-disguise learning', desc: 'Study how a slider can wear any visual skin, since it is the same drag anywhere, get a proportional value pattern.' },
    ],
    faqs: [
      { q: 'How do I make it read-only for displaying an existing rating?', a: 'Remove the pointerdown/touchstart listeners and the tabindex/keydown handling, and just call render() once with a fixed value — the two-layer clipped star technique works identically as a static display.' },
      { q: 'How do I allow quarter-star precision instead of half-star?', a: 'Change the snapping formula from Math.round(raw * 2) / 2 (halves) to Math.round(raw * 4) / 4 (quarters) — the multiplier and divisor both control the snap granularity together.' },
      { q: 'Why use two stacked star strings instead of an SVG or icon font with a fill percentage?', a: 'It\'s the simplest possible technique requiring no icon library or SVG path data — as long as both rows render the exact same characters at the exact same size, clipping one by width produces a pixel-accurate fractional fill for free.' },
      { q: 'Can I use a different symbol, like hearts or flames?', a: 'Yes — replace ★ with any character or emoji in both the background and fill rows; the clipping technique is symbol-agnostic as long as both rows stay identical.' },
      { q: 'Is it accessible?', a: 'The track carries role="slider" with aria-valuemin/max/now kept in sync, and is fully operable via Left/Right/Up/Down/Home/End without a mouse — pair it with a visible or aria-describedby label identifying what is being rated.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how stacking two identical star-character rows and clipping the top one by percentage width produces a genuinely fractional (not just per-star) fill effect, and why the font-size and letter-spacing of both rows must match exactly for it to align correctly. It's also worth asking the assistant to add a read-only display mode for showing an existing average rating without drag/keyboard interaction, or to add a hover preview that shows what rating would be set before the user actually clicks or drags.`,
      prompt: `Build a star-rating input that behaves as a genuine continuous drag slider rather than five separate clickable star buttons, in plain HTML, CSS, and vanilla JavaScript — no library.

Requirements:
- Two stacked, identically-styled rows of star characters occupying the exact same position — a background row showing all stars in a neutral/empty color, and a foreground "fill" row in an accent color, clipped to a percentage width via overflow hidden so only a fraction of it is visible.
- A single numeric rating value (out of a configurable maximum, e.g. 5) that drives the fill row's clipped width as a direct percentage, so partial values produce a genuinely partial star showing at the clip boundary, not just fully-lit or fully-empty individual stars.
- Dragging anywhere across the star row (via pointer events with a touch fallback) must convert the pointer's horizontal position within the row into a raw fractional rating, then snap that raw value to the nearest half-star increment before applying it — both during the drag itself (live snapping, not only on release) and it must also support a simple click-to-jump without requiring a drag gesture first.
- A small handle or marker indicating the current fill boundary position, purely visual, following the fill percentage.
- A live text readout showing the current numeric rating (e.g. "3.5 / 5") that stays in sync with the visual fill at all times.
- Keyboard support: the control must be focusable and respond to Left/Right (or Down/Up) arrow keys by adjusting the rating by one half-star increment, with Home and End jumping to the minimum and maximum respectively.
- The control must carry correct ARIA slider role and value attributes reflecting the current rating.`,
    },
  },
};

export default starRatingDragSlider;
