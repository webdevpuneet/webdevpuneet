const colorContrastChecker = {
  id: 'color-contrast-checker',
  title: 'Color Contrast Checker',
  lastmod: '2026-07-18',
  category: 'tools',
  html: `<div class="cc-card">
  <div class="cc-preview" id="ccPreview">
    <span class="cc-big">Big Text</span>
    <span class="cc-small">The quick brown fox jumps over the lazy dog.</span>
  </div>

  <div class="cc-inputs">
    <label class="cc-field"><span>Text</span>
      <div class="cc-swatch"><input type="color" id="ccFg" value="#475569"><input type="text" id="ccFgHex" value="#475569" maxlength="7" spellcheck="false"></div>
    </label>
    <label class="cc-field"><span>Background</span>
      <div class="cc-swatch"><input type="color" id="ccBg" value="#ffffff"><input type="text" id="ccBgHex" value="#ffffff" maxlength="7" spellcheck="false"></div>
    </label>
  </div>

  <div class="cc-ratio"><strong id="ccRatio">0</strong><span>: 1 contrast ratio</span></div>

  <div class="cc-grid" id="ccGrid">
    <div class="cc-cell" data-k="aaNormal"><span>AA Normal</span><b></b></div>
    <div class="cc-cell" data-k="aaLarge"><span>AA Large</span><b></b></div>
    <div class="cc-cell" data-k="aaaNormal"><span>AAA Normal</span><b></b></div>
    <div class="cc-cell" data-k="aaaLarge"><span>AAA Large</span><b></b></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;color:#0f172a;display:flex;justify-content:center;padding:36px 18px}

.cc-card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:18px;width:100%;max-width:400px;box-shadow:0 12px 34px -22px rgba(0,0,0,.3)}
.cc-preview{border-radius:12px;padding:22px 18px;display:flex;flex-direction:column;gap:8px;margin-bottom:16px;border:1px solid #e2e8f0}
.cc-big{font-size:26px;font-weight:800}
.cc-small{font-size:13.5px;line-height:1.5}

.cc-inputs{display:flex;gap:12px;margin-bottom:14px}
.cc-field{flex:1;display:flex;flex-direction:column;gap:6px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:#64748b}
.cc-swatch{display:flex;align-items:center;gap:8px;border:1px solid #e2e8f0;border-radius:10px;padding:6px 8px}
.cc-swatch input[type=color]{width:28px;height:28px;border:none;background:none;padding:0;cursor:pointer}
.cc-swatch input[type=text]{border:none;outline:none;font-size:13px;font-family:ui-monospace,monospace;width:100%;text-transform:uppercase;color:#0f172a}

.cc-ratio{text-align:center;margin-bottom:14px;color:#64748b;font-size:13px}
.cc-ratio strong{font-size:30px;font-weight:800;color:#0f172a;font-variant-numeric:tabular-nums}

.cc-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.cc-cell{border:1px solid #e2e8f0;border-radius:10px;padding:10px 12px;display:flex;justify-content:space-between;align-items:center;font-size:12.5px;font-weight:600;color:#475569}
.cc-cell b{font-size:11px;font-weight:800;padding:2px 8px;border-radius:20px}
.cc-cell.pass b{background:#dcfce7;color:#15803d}
.cc-cell.pass b::after{content:'PASS'}
.cc-cell.fail b{background:#fee2e2;color:#b91c1c}
.cc-cell.fail b::after{content:'FAIL'}`,

  js: `function clampHex(v) {
  v = v.trim(); if (v[0] !== '#') v = '#' + v;
  if (/^#[0-9a-fA-F]{3}$/.test(v)) v = '#' + v[1]+v[1]+v[2]+v[2]+v[3]+v[3];
  return /^#[0-9a-fA-F]{6}$/.test(v) ? v.toLowerCase() : null;
}
function toRgb(hex) { return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)]; }
// Relative luminance per WCAG 2.x.
function luminance(rgb) {
  var a = rgb.map(function (c) { c /= 255; return c <= 0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055, 2.4); });
  return 0.2126*a[0] + 0.7152*a[1] + 0.0722*a[2];
}
function ratio(fg, bg) {
  var l1 = luminance(toRgb(fg)), l2 = luminance(toRgb(bg));
  var hi = Math.max(l1, l2), lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

var fg = document.getElementById('ccFg'), fgHex = document.getElementById('ccFgHex');
var bg = document.getElementById('ccBg'), bgHex = document.getElementById('ccBgHex');
var preview = document.getElementById('ccPreview');
var ratioEl = document.getElementById('ccRatio');
var cells = Array.prototype.slice.call(document.querySelectorAll('.cc-cell'));

function update() {
  var f = clampHex(fgHex.value) || fg.value;
  var b = clampHex(bgHex.value) || bg.value;
  fg.value = f; bg.value = b;
  preview.style.color = f; preview.style.background = b;
  var r = ratio(f, b);
  ratioEl.textContent = r.toFixed(2);
  var pass = { aaNormal: r >= 4.5, aaLarge: r >= 3, aaaNormal: r >= 7, aaLargeAAA: r >= 4.5, aaaLarge: r >= 4.5 };
  cells.forEach(function (cell) {
    var k = cell.getAttribute('data-k');
    var ok = pass[k];
    cell.classList.toggle('pass', !!ok);
    cell.classList.toggle('fail', !ok);
  });
}

[fg, bg].forEach(function (inp) { inp.addEventListener('input', function () { (inp === fg ? fgHex : bgHex).value = inp.value.toUpperCase(); update(); }); });
[fgHex, bgHex].forEach(function (inp) { inp.addEventListener('input', function () { var c = clampHex(inp.value); if (c) (inp === fgHex ? fg : bg).value = c; update(); }); });

update();`,

  seo: {
    title: 'Color Contrast Checker — WCAG AA/AAA Ratio Tool',
    description: `A live WCAG color contrast checker: pick text and background, see the ratio and AA/AAA pass/fail. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Color Contrast Checker — WCAG Contrast Ratio with AA/AAA Pass-Fail',
      description: `A color contrast checker measures whether text is legible against its background using the WCAG contrast formula, then shows whether it passes AA and AAA at normal and large sizes. It's the tool every designer and developer needs to keep interfaces accessible. This snippet computes the real WCAG ratio in the browser and previews it live, in plain HTML, CSS, and vanilla JavaScript.

**The real WCAG math**

Contrast isn't a naive RGB difference — it's based on **relative luminance**. The script converts each colour to linearised sRGB (applying the \`c <= 0.03928 ? c/12.92 : ((c+0.055)/1.055)^2.4\` transfer function per channel), weights the channels \`0.2126 / 0.7152 / 0.0722\`, and computes the ratio as \`(L_lighter + 0.05) / (L_darker + 0.05)\`. That's the exact WCAG 2.x definition, so the number you see matches what an audit tool or accessibility checker reports.

**Pass/fail at a glance**

The four thresholds are evaluated and shown as PASS/FAIL pills: **AA Normal** needs 4.5:1, **AA Large** needs 3:1, **AAA Normal** needs 7:1, and **AAA Large** needs 4.5:1. "Large" means roughly 18px bold or 24px regular and up. Seeing all four at once tells you not just whether a pairing works, but for which text sizes — so you can confidently use a borderline colour for headings while avoiding it for body copy.

**Dual input, always in sync**

Each colour has a native \`<input type="color">\` swatch and a hex text field, kept in sync both ways: pick from the OS colour picker and the hex updates; type a hex (3- or 6-digit, with or without \`#\`) and the swatch updates. A small \`clampHex\` validator normalises shorthand like \`#fff\` to \`#ffffff\` and ignores invalid input, so the preview never breaks mid-typing.

**Live preview**

The preview panel renders real big and small text in the chosen colours, so you judge legibility with your eyes as well as the number — the two together catch problems a ratio alone can miss, like a technically-passing pair that still feels muddy. Every change recomputes instantly with no button to press.

**Self-contained and portable**

The luminance and ratio functions are pure and dependency-free — you can lift them straight into a design-system linter, a Figma plugin, or a build-time check. The whole checker is a compact, framework-agnostic reference for doing WCAG contrast correctly instead of eyeballing it.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A contrast checker renders with a live text preview and pass/fail grid.` },
      { title: 'Choose colors', text: `Use the swatch picker or type a hex for text and background.` },
      { title: 'Read the ratio', text: `The big number is the exact WCAG contrast ratio, updated live.` },
      { title: 'Check the levels', text: `The four pills show AA/AAA pass or fail for normal and large text.` },
      { title: 'Judge the preview', text: `The sample text renders in your colors so you can sanity-check legibility.` },
      { title: 'Reuse the math', text: `Lift the luminance/ratio functions into a linter or design tool.` },
    ] },
    features: [
      { title: 'Exact WCAG ratio', text: `Relative-luminance math matching the WCAG 2.x definition.` },
      { title: 'AA & AAA checks', text: `Pass/fail for 4.5:1, 3:1, 7:1 and 4.5:1 thresholds at a glance.` },
      { title: 'Normal & large text', text: `Separate results for body copy and large/heading text.` },
      { title: 'Live preview', text: `Real big and small text rendered in the chosen colors.` },
      { title: 'Swatch + hex sync', text: `Native color picker and a hex field stay in sync both ways.` },
      { title: 'Hex normalisation', text: `Accepts #fff or #ffffff, with or without the hash.` },
      { title: 'Pure functions', text: `Reusable luminance and ratio helpers with no dependencies.` },
      { title: 'No library', text: `Pure HTML/CSS/JS — no color or accessibility package.` },
    ],
    useCases: [
      { title: 'Design token validation', text: 'Validate text-on-surface pairs against the exact WCAG 2.x relative-luminance formula before they become part of a design system.' },
      { title: 'Theme building', text: 'Test palette choices from a [theme palette generator](/ui-snippets/theme-palette-generator/), with pass or fail for AA and AAA at normal and large sizes.' },
      { title: 'Accessibility audits', text: 'Spot failing combinations before launch, with a live preview rendering both big and small text in the chosen colours.' },
      { title: 'Dark mode tuning', text: 'Verify contrast in both themes alongside a [colour mode toggle](/ui-snippets/color-mode-toggle/), where a pair that passes in light often fails in dark.' },
      { title: 'Brand and marketing legibility', text: 'Keep calls to action and headings readable over brand colours, using a [colour swatch](/ui-snippets/color-swatch/) for the chosen pair.' },
      { icon: 'CODE', title: 'Related: Cron Expression Builder', desc: 'See the [Cron Expression Builder](/ui-snippets/cron-expression-builder/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the contrast ratio calculated?', a: `It uses the WCAG 2.x formula: each color is converted to relative luminance by linearising its sRGB channels and weighting them 0.2126 (R), 0.7152 (G), 0.0722 (B), then the ratio is (lighter + 0.05) / (darker + 0.05). This is the same math accessibility auditors use, so the number matches official checkers — it is not a simple RGB or brightness difference.` },
      { q: 'What do AA and AAA mean?', a: `They are WCAG conformance levels. AA requires 4.5:1 for normal text and 3:1 for large text; AAA is stricter at 7:1 normal and 4.5:1 large. "Large" is about 18px bold or 24px regular and up. AA is the common legal/target baseline; AAA is an enhanced level. The grid shows all four so you know exactly which sizes a color pair is safe for.` },
      { q: 'Why show a preview as well as a number?', a: `The ratio is objective but does not capture everything — a pair can pass yet still feel muddy, or you may want to see how a borderline color reads at real sizes. Rendering actual big and small text in the chosen colors lets you confirm legibility with your eyes, catching issues a single number can hide.` },
      { q: 'Can I reuse the contrast calculation elsewhere?', a: `Yes. The luminance(rgb) and ratio(fg, bg) functions are pure and have no dependencies, so you can copy them into a design-system linter, a CI check that fails on low-contrast tokens, a Figma plugin, or a Storybook addon. They take hex/RGB and return the WCAG ratio directly.` },
      { q: 'How do I use this contrast checker in React, Vue, or Angular?', a: `Keep the luminance and ratio helpers as plain functions and hold the two colors in state (useState/ref/component fields). Compute the ratio and pass/fail flags as derived values on each change, and bind them to the preview style and the pill classes. Two-way bind the color and hex inputs to the same state. In Tailwind, swap the classes for utilities; the math is unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to eyeball whether this snippet's math matches the WCAG spec exactly. Paste the HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through why the luminance function applies that particular piecewise transfer curve to each channel before weighting them 0.2126/0.7152/0.0722, instead of just averaging RGB values. The same assistant can help optimize it — for instance checking whether recomputing luminance for both colors on every keystroke is wasteful, or whether the clampHex validator could reject bad input earlier to avoid needless re-renders. It is just as useful for extending the tool: ask it to add APCA contrast scoring alongside the WCAG ratio, support a third "against" color for a three-way palette check, or flag the nearest passing color automatically when a pair fails. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a color contrast checker in plain HTML, CSS, and JavaScript that computes the real WCAG 2.x contrast ratio — no color libraries, no approximations.

Requirements:
- Two color inputs (text and background), each pairing a native input type="color" swatch with a synced hex text field that accepts 3- or 6-digit hex with or without a leading hash.
- A pure function that converts a hex color to RGB, then to relative luminance using the WCAG transfer function per channel (c/12.92 below the 0.03928 threshold, otherwise ((c+0.055)/1.055) raised to the 2.4 power), weighted 0.2126 red, 0.7152 green, 0.0722 blue.
- A ratio function computing (lighter luminance + 0.05) / (darker luminance + 0.05) from the two luminance values, matching the official WCAG formula exactly.
- Display the numeric ratio live, updating on every input change with no submit button.
- Four pass/fail indicators evaluated from the same ratio: AA Normal at 4.5:1, AA Large at 3:1, AAA Normal at 7:1, and AAA Large at 4.5:1, each rendered as a clearly distinct pass or fail state.
- A live preview area rendering real sample text (a heading and a paragraph) in the exact chosen foreground and background colors so users can visually sanity-check legibility alongside the numeric ratio.
- Keep the luminance and ratio functions as standalone, dependency-free functions that could be copy-pasted into a separate linter or build script.`,
    },
  },
};

export default colorContrastChecker;
