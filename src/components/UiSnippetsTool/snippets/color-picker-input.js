const colorPickerInput = {
    id: 'color-picker-input',
    title: 'Color Picker Input',
    category: 'forms',
    html: `<div class="demo">
  <div class="picker-card">
    <div class="preview-bar" id="preview-bar"></div>
    <div class="picker-body">
      <label>Brand color</label>
      <div class="hex-row">
        <span class="hash">#</span>
        <input id="hex" class="hex-inp" value="6366F1" maxlength="6" oninput="fromHex(this.value)" />
        <input type="color" id="native" value="#6366f1" oninput="fromNative(this.value)" class="native-input" />
        <button class="eye-drop" title="Pick color" onclick="document.getElementById('native').click()">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M2 22l1-1h3l9-9"/><path d="M3 21v-3l9-9"/><path d="m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8"/></svg>
        </button>
      </div>

      <div class="swatches">
        <span class="sw-label">Presets</span>
        <div class="sw-row" id="sw-row"></div>
      </div>

      <div class="opacity-row">
        <label>Opacity <span id="op-val">100%</span></label>
        <input type="range" id="opacity" min="0" max="100" value="100" oninput="setOpacity(this.value)" />
      </div>
    </div>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }

.demo { width: 280px; }

.picker-card { background: #fff; border-radius: 14px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }

.preview-bar { height: 72px; background: #6366f1; transition: background 0.2s; }

.picker-body { padding: 16px; display: flex; flex-direction: column; gap: 14px; }
label { font-size: 12px; font-weight: 600; color: #475569; }

.hex-row { display: flex; align-items: center; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 8px; overflow: hidden; transition: border-color 0.15s; }
.hex-row:focus-within { border-color: #6366f1; }
.hash { padding: 0 8px; font-size: 13px; font-family: monospace; color: #94a3b8; }
.hex-inp { flex: 1; padding: 9px 0; font-size: 13px; font-family: monospace; border: none; outline: none; background: transparent; color: #1e293b; text-transform: uppercase; }

.native-input { opacity: 0; width: 0; height: 0; pointer-events: none; }
.eye-drop { width: 36px; height: 36px; background: none; border: none; border-left: 1px solid #e2e8f0; color: #94a3b8; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.12s, color 0.12s; }
.eye-drop:hover { background: #f1f5f9; color: #6366f1; }

.swatches { display: flex; flex-direction: column; gap: 8px; }
.sw-label { font-size: 12px; font-weight: 600; color: #475569; }
.sw-row { display: flex; gap: 6px; flex-wrap: wrap; }
.sw { width: 22px; height: 22px; border-radius: 6px; cursor: pointer; border: 2px solid transparent; transition: transform 0.12s, border-color 0.12s; }
.sw:hover { transform: scale(1.15); }
.sw.active { border-color: #1e293b; }

.opacity-row { display: flex; flex-direction: column; gap: 6px; }
.opacity-row label { display: flex; justify-content: space-between; }
input[type="range"] { width: 100%; height: 4px; -webkit-appearance: none; background: linear-gradient(to right, #6366f1 100%, #e2e8f0 100%); border-radius: 4px; outline: none; accent-color: #6366f1; }`,
    js: `const PRESETS = ['#ef4444','#f97316','#f59e0b','#22c55e','#0ea5e9','#6366f1','#8b5cf6','#ec4899','#1e293b','#94a3b8'];
const bar = document.getElementById('preview-bar');
const hexInp = document.getElementById('hex');
const native = document.getElementById('native');
let opacity = 100;

function applyColor(hex) {
  const r = parseInt(hex.slice(0,2),16), g = parseInt(hex.slice(2,4),16), b = parseInt(hex.slice(4,6),16);
  bar.style.background = \`rgba(\${r},\${g},\${b},\${opacity/100})\`;
  document.querySelector('input[type="range"]').style.background =
    \`linear-gradient(to right, #\${hex} \${opacity}%, #e2e8f0 \${opacity}%)\`;
}

function fromHex(v) {
  if (v.length === 6 && /^[0-9a-fA-F]{6}$/.test(v)) {
    native.value = '#' + v;
    applyColor(v.toUpperCase());
  }
}

function fromNative(v) {
  const hex = v.slice(1).toUpperCase();
  hexInp.value = hex;
  applyColor(hex);
}

function setOpacity(v) {
  opacity = v;
  document.getElementById('op-val').textContent = v + '%';
  applyColor(hexInp.value);
}

// Build swatches
const row = document.getElementById('sw-row');
PRESETS.forEach(c => {
  const s = document.createElement('div');
  s.className = 'sw' + (c === '#6366f1' ? ' active' : '');
  s.style.background = c;
  s.onclick = () => {
    document.querySelectorAll('.sw').forEach(x => x.classList.remove('active'));
    s.classList.add('active');
    const hex = c.slice(1).toUpperCase();
    hexInp.value = hex; native.value = c;
    applyColor(hex);
  };
  row.appendChild(s);
});

applyColor('6366F1');`,

  seo: {
    title: 'Color Picker Input — Free HTML CSS JS Snippet',
    description: 'Colour field with preset swatches, hex input, live preview bar and a native picker trigger. Copy-paste or export to React, Vue, Angular & Tailwind.',
    about: {
      title: "Color Picker Input — Preset Swatches, Hex Input Sync, Opacity Slider & Native Picker",
      description: `A colour picker input is a specialised form field that lets users select a colour through multiple interaction methods: clicking a preset swatch, typing a hex code directly, or opening the native OS colour picker via an eyedropper button. For a hue wheel instead, see the [color wheel picker](/ui-snippets/color-wheel-picker/); for product variants, the [color swatch](/ui-snippets/color-swatch/) selector. This snippet implements all three methods in a unified card component with a live preview bar, an opacity slider, and full two-way synchronisation between every input method.

**The PRESETS swatch array**

The \`PRESETS\` array contains 10 hex colour values covering the most common brand palette needs: reds, oranges, yellows, greens, blues, indigos, purples, pinks, and neutrals. The swatch rendering loop uses \`PRESETS.forEach(c => { const s = document.createElement('div'); s.className = 'sw'; s.style.background = c; s.onclick = () => { ... }; row.appendChild(s); })\`. When a swatch is clicked, it marks itself with the \`.active\` class (adding a dark border ring), updates the hex input value, and calls \`applyColor(hex)\` to update the preview bar.

**The hex input with live validation**

The hex input is prefixed by a \`#\` hash span (purely decorative, the hash is not part of the input value). The \`fromHex(v)\` function validates the input using \`/^[0-9a-fA-F]{6}$/.test(v)\` and only calls \`applyColor()\` when exactly 6 valid hex characters are present. This prevents the preview from flashing during typing. The input uses \`text-transform: uppercase\` in CSS to display hex values in the standard uppercase format.

**The hidden native colour picker**

A real \`<input type="color">\` element is rendered at 0 width and height with \`opacity: 0; pointer-events: none\` so it is invisible but fully functional. The eyedropper button's \`onclick\` calls \`document.getElementById('native').click()\` to programmatically open the OS colour picker. When the user selects a colour in the OS picker, the \`oninput="fromNative(this.value)"\` handler fires, strips the leading hash, and syncs the hex input and preview bar. This technique opens the native picker without any visible input element in the UI.

**The opacity slider with gradient track**

The opacity range input controls a separate \`opacity\` variable. The \`setOpacity(v)\` function converts the 0–100 range value to a 0–1 decimal for the \`rgba()\` colour in the preview. The slider track is updated dynamically: \`linear-gradient(to right, #hex opacity%, #e2e8f0 opacity%)\` creates a visual fill effect showing how much of the track corresponds to the current opacity value.

**The applyColor() function**

\`applyColor(hex)\` is the single function that all three input methods call. It parses the 6-character hex into r, g, b integer values using \`parseInt(hex.slice(0,2), 16)\` and constructs an \`rgba(r,g,b,opacity/100)\` string applied to the preview bar's background. This single-source-of-truth approach ensures the preview is always consistent regardless of which input method was used.`,
    },
    howToUse: { type: 'steps', items: [
      { title: "Click preset swatches to select a colour", text: "Click any of the 10 preset colour swatches below the hex input. The clicked swatch gets a dark active border ring, the hex input updates with the swatch's hex code, and the preview bar at the top of the card immediately changes to the selected colour." },
      { title: "Type a hex code directly into the input", text: "Click the hex input field and type a 6-character hex code like 3B82F6 (without the # prefix — the # is shown as a prefix label). The preview bar updates as soon as you type a valid 6-character hex value. The input validates with /^[0-9a-fA-F]{6}$/ before applying." },
      { title: "Open the OS native colour picker via the eyedropper button", text: "Click the eyedropper icon button on the right side of the hex input row. This programmatically triggers a hidden <input type='color'> element, opening your operating system's native colour picker. When you select a colour and close the picker, the hex input and preview bar update to match your selection." },
      { title: "Adjust the opacity slider", text: "Drag the Opacity range slider to change transparency from 0% (fully transparent) to 100% (fully opaque). The preview bar background uses rgba() so it shows the colour at the selected opacity over the white card background. The slider track fills with the current colour to show the full opacity gradient." },
      { title: "Customise the PRESETS array with your brand palette", text: "In the JS panel, replace the PRESETS array values with your own brand colour hex codes. The swatches are generated dynamically from this array, so adding, removing, or reordering entries automatically updates the rendered swatch row without any HTML changes." },
      { title: "Read the selected colour value for form submission or CSS variable updates", text: "After colour selection, read hexInp.value for the hex code (6 characters, no hash). For CSS custom property updates: document.documentElement.style.setProperty('--accent-color', '#' + hexInp.value). For form submission, include it as a hidden input or append it to your FormData object before submitting." },
    ]},
    features: [
      "PRESETS array of hex colours rendered as clickable swatches",
      "Swatch click calls pick(colour) — updates hex input and preview bar",
      "Hex input oninput updates preview bar in real time",
      "Native <input type=\"color\"> hidden, triggered by eyedropper button click",
      "color input \"input\" event syncs native picker selection to hex input",
      "Live preview bar spans full card width — immediate colour feedback",
      "Swatch .active border ring shows currently selected preset",
      "Export as HTML file, React JSX, or React + Tailwind CSS",
      "Mobile (375px), Tablet (768px), Desktop device preview buttons",
      "Live split-pane editor — preview updates as you type",
    ],
    useCases: [
      { icon: "DESIGN", title: "Theme and brand colour customisation panels", desc: "Use in user-facing settings panels where users pick an accent or primary brand colour for their workspace, dashboard, or profile. The PRESETS array provides common brand palette starting points while the hex input allows precise colour specification. The opacity slider enables setting semi-transparent overlay colours for backgrounds and decorative elements." },
      { icon: "APP", title: "Profile and avatar background colour pickers", desc: "Let users personalise their profile avatar background colour, their team's colour tag, or their workspace accent colour. The preset swatches guide users toward aesthetically compatible choices while the hex input and native picker let power users enter exact brand colours. The active swatch ring clearly shows which preset is currently selected." },
      { icon: "FORM", title: "Design tools and canvas editors", desc: "A standard UI component in web-based design tools, no-code page builders, and canvas editors where users select fill colours, stroke colours, and text colours. The multi-input approach (swatches + hex + native picker) matches how professional tools like Figma and Canva implement their colour selection interfaces." },
      { icon: "LEARN", title: "Learn hidden input type=color with programmatic trigger", desc: "The native colour picker is opened by programmatically clicking a hidden <input type='color'> element. This technique lets you use a custom-styled button as the trigger while still leveraging the OS native picker. Study how fromNative() syncs the picked colour back to the hex text input, demonstrating the two-way synchronisation pattern between native and custom UI elements." },
      { icon: "CODE", title: "Live CSS custom property overrides", desc: "On colour selection, apply the chosen colour directly to a CSS custom property: document.documentElement.style.setProperty('--brand-color', '#' + hexInp.value). Combine with CSS variables throughout your stylesheet to create a live theme preview where every branded element updates in real time as the user selects different colours." },
      { icon: "FLOW", title: "Background and text colour contrast configurators", desc: "Use two picker instances side by side — one for background colour, one for text — and calculate the WCAG contrast ratio between the two selected colours in real time. Display a pass/fail accessibility indicator and the contrast ratio value to help users choose colour combinations that meet AA or AAA accessibility standards for their design." },
      { icon: 'CODE', title: 'Related: OKLCH Color Picker & Playground', desc: 'See the [OKLCH Color Picker & Playground](/ui-snippets/css-oklch-color-picker/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: "How does the native OS colour picker sync back to the hex input?", a: "A hidden <input type='color' id='native'> element is rendered with opacity: 0; width: 0; height: 0; pointer-events: none so it is invisible but functional. The eyedropper button's onclick handler calls document.getElementById('native').click(), which programmatically opens the OS native colour picker. When the user selects a colour and the picker closes, the oninput='fromNative(this.value)' handler fires. fromNative() strips the leading # from the value, converts it to uppercase, sets hexInp.value to the stripped hex string, sets native.value to synchronise them, then calls applyColor() to update the preview bar and opacity slider track." },
      { q: "How does the hex input validate colour codes before applying?", a: "The fromHex(v) function checks two conditions before calling applyColor: v.length === 6 ensures the full 6-character code is entered (so the preview doesn't flash during typing of incomplete codes), and /^[0-9a-fA-F]{6}$/.test(v) ensures all characters are valid hexadecimal digits. If either check fails, the function returns early without updating the preview. When both pass, native.value is synchronised to '#' + v and applyColor(v.toUpperCase()) is called to update the preview bar." },
      { q: "How does the opacity slider update the preview colour?", a: "The setOpacity(v) function stores the slider value in the opacity variable and calls applyColor(hexInp.value). Inside applyColor(hex), the function parses the hex string into r, g, b integer values using parseInt(hex.slice(0,2), 16) for each channel. It then constructs rgba(r, g, b, opacity/100) and applies it to bar.style.background. The slider track is simultaneously updated using linear-gradient(to right, #hex opacity%, #e2e8f0 opacity%) to create a visual fill effect that shows the current opacity as a proportional fill of the track." },
      { q: "How do I show colour names as tooltips on the preset swatches?", a: "Replace the PRESETS array with objects containing both the hex value and a name: const PRESETS = [{hex:'#ef4444',name:'Red'},{hex:'#6366f1',name:'Indigo'},...]. In the swatch-building loop, set s.style.background = c.hex, s.title = c.name (for native browser tooltip), and pass c.hex to the onclick handler's applyColor call. For a custom styled tooltip instead of the native title, add a tooltip span as a child of the swatch and show/hide it on mouseenter/mouseleave events." },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out how the eyedropper button and the hidden color input actually cooperate just by staring at it. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the native input type color element is rendered at zero size with pointer-events none rather than just hidden, and how document.getElementById('native').click() manages to open the OS picker from a completely different-looking button. The same assistant can help optimize it — for instance asking whether re-querying the range input with document.querySelector on every applyColor call is wasteful compared to caching the reference once. It's also useful for extending the component: ask it to add an eyedropper using the real EyeDropper API where supported, support an alpha-aware hex8 format instead of a separate opacity slider, or persist the last-picked color to localStorage between visits. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a color picker input field in plain HTML, CSS, and JavaScript combining preset swatches, a hex text field, a hidden native color input, and an opacity slider — no color-picker libraries.

Requirements:
- A row of clickable preset swatches generated from a PRESETS array of hex strings (not hardcoded HTML per swatch), where clicking one marks itself active with a visible ring and updates every other control to match.
- A hex text input prefixed with a purely decorative "#" label, validating with a strict six-character hex regex, only applying the color once exactly six valid hex characters are present so the preview never flashes on incomplete input.
- A real input type="color" element rendered at zero width and height with pointer-events disabled so it is invisible, triggered by a separate visible eyedropper-icon button that calls its .click() method to open the OS native color picker without showing the raw input in the layout.
- Two-way sync so picking a color in the native picker updates the hex field and vice versa, both funneling through one single source-of-truth function that applies the current color to a preview bar.
- An opacity range slider (0-100) that combines with the current hex color to produce an rgba() value applied to the preview bar's background, and that also repaints the slider's own track with a linear-gradient so the filled portion visually matches the current opacity percentage.
- Keep a single applyColor function as the only place that writes to the preview bar's background, called by all three input methods (swatch click, hex typing, native picker) so they can never fall out of sync.`,
    },
  }
};

export default colorPickerInput;
