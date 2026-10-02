const imageHotspot = {
  id: 'image-hotspot',
  title: 'Image Hotspot with Tooltips',
  lastmod: '2026-06-13',
  category: 'media',
  html: `<div class="demo">
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">MacBook Pro Workspace</h3>
      <span class="badge">Click hotspots to explore</span>
    </div>
    <div class="hotspot-wrap" id="hotspotWrap">
      <!-- CSS-drawn workspace scene -->
      <div class="scene">
        <div class="desk"></div>
        <div class="laptop">
          <div class="screen">
            <div class="screen-content">
              <div class="code-line w80"></div>
              <div class="code-line w60"></div>
              <div class="code-line w90"></div>
              <div class="code-line w50"></div>
              <div class="code-line w70"></div>
              <div class="code-line w40"></div>
            </div>
          </div>
          <div class="laptop-base"></div>
        </div>
        <div class="monitor">
          <div class="mon-screen">
            <div class="mon-bar"></div>
            <div class="mon-content">
              <div class="chart-bar" style="height:60%"></div>
              <div class="chart-bar" style="height:85%"></div>
              <div class="chart-bar" style="height:45%"></div>
              <div class="chart-bar" style="height:70%"></div>
              <div class="chart-bar" style="height:95%"></div>
            </div>
          </div>
          <div class="mon-stand"></div>
        </div>
        <div class="keyboard"></div>
        <div class="mouse"></div>
        <div class="coffee"></div>
      </div>

      <!-- Hotspot pins -->
      <button class="pin" style="left:38%;top:28%" data-tip="0" aria-label="Laptop info">
        <span class="pin-inner"></span>
      </button>
      <button class="pin" style="left:72%;top:20%" data-tip="1" aria-label="Monitor info">
        <span class="pin-inner"></span>
      </button>
      <button class="pin" style="left:45%;top:72%" data-tip="2" aria-label="Keyboard info">
        <span class="pin-inner"></span>
      </button>
      <button class="pin" style="left:82%;top:68%" data-tip="3" aria-label="Coffee info">
        <span class="pin-inner"></span>
      </button>

      <!-- Tooltips -->
      <div class="tip" id="tip0">
        <div class="tip-name">MacBook Pro 14"</div>
        <div class="tip-detail">M3 Pro · 18GB RAM · 512GB SSD</div>
        <div class="tip-price">from $1,999</div>
      </div>
      <div class="tip" id="tip1">
        <div class="tip-name">LG UltraWide 34"</div>
        <div class="tip-detail">3440×1440 · 144Hz · USB-C</div>
        <div class="tip-price">from $649</div>
      </div>
      <div class="tip" id="tip2">
        <div class="tip-name">Keychron K2 Pro</div>
        <div class="tip-detail">Wireless · Hot-swap · RGB</div>
        <div class="tip-price">from $99</div>
      </div>
      <div class="tip" id="tip3">
        <div class="tip-name">Specialty Coffee</div>
        <div class="tip-detail">Ethiopian Yirgacheffe · Light roast</div>
        <div class="tip-price">Fuel for coding</div>
      </div>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f1f5f9; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
.demo { width: 100%; max-width: 520px; }
.card { background: #fff; border-radius: 16px; box-shadow: 0 4px 24px rgba(0,0,0,0.08); overflow: hidden; }
.card-header { display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border-bottom: 1px solid #f1f5f9; }
.card-title { font-size: 14px; font-weight: 700; color: #111827; }
.badge { font-size: 10px; font-weight: 600; padding: 3px 10px; background: #eef2ff; color: #6366f1; border-radius: 20px; }

.hotspot-wrap { position: relative; user-select: none; }

/* CSS-drawn scene */
.scene { width: 100%; padding-bottom: 58%; position: relative; background: linear-gradient(160deg,#1e293b 0%,#0f172a 100%); overflow: hidden; }
.desk { position: absolute; bottom: 0; left: 0; right: 0; height: 35%; background: #7c5c3a; border-radius: 4px 4px 0 0; }
.desk::after { content:''; position:absolute; top:0; left:0; right:0; height:6px; background:#6b4f31; }
.laptop { position: absolute; bottom: 33%; left: 24%; width: 30%; }
.screen { width: 100%; padding-bottom: 62%; background: #1e293b; border-radius: 4px 4px 0 0; border: 2px solid #475569; overflow: hidden; position: relative; }
.screen-content { padding: 6px 8px; display: flex; flex-direction: column; gap: 3px; position: absolute; inset: 0; }
.code-line { height: 3px; background: #3b82f6; border-radius: 2px; opacity: 0.7; }
.code-line.w80 { width: 80%; } .code-line.w60 { width: 60%; background: #a78bfa; } .code-line.w90 { width: 90%; }
.code-line.w50 { width: 50%; background: #34d399; } .code-line.w70 { width: 70%; } .code-line.w40 { width: 40%; background: #f472b6; }
.laptop-base { height: 8px; background: linear-gradient(#374151,#1f2937); border-radius: 0 0 3px 3px; margin: 0 -4%; width: 108%; }
.monitor { position: absolute; bottom: 33%; left: 54%; width: 32%; }
.mon-screen { width: 100%; padding-bottom: 66%; background: #0f172a; border: 2px solid #475569; border-radius: 4px; position: relative; overflow: hidden; }
.mon-bar { height: 5px; background: #1e293b; }
.mon-content { display: flex; align-items: flex-end; gap: 4px; padding: 4px 6px; position: absolute; bottom: 0; left: 0; right: 0; height: calc(100% - 5px); }
.chart-bar { flex: 1; background: linear-gradient(to top, #6366f1, #818cf8); border-radius: 2px 2px 0 0; }
.mon-stand { width: 30%; height: 12px; background: #374151; margin: 0 auto; border-radius: 0 0 4px 4px; }
.keyboard { position: absolute; bottom: 30%; left: 30%; width: 35%; height: 5%; background: #374151; border-radius: 3px; }
.mouse { position: absolute; bottom: 29%; left: 68%; width: 5%; padding-bottom: 7%; background: #4b5563; border-radius: 30% 30% 40% 40%; }
.coffee { position: absolute; bottom: 34%; left: 85%; width: 7%; padding-bottom: 9%; background: #92400e; border-radius: 6px; }
.coffee::before { content:''; position:absolute; top:-4px; left:5%; right:5%; height:4px; background:#78350f; border-radius:3px 3px 0 0; }
.coffee::after { content:''; position:absolute; top:4px; left:10%; right:10%; height:3px; background: rgba(255,255,255,0.15); border-radius:2px; }

/* Pins */
.pin { position: absolute; width: 24px; height: 24px; transform: translate(-50%,-50%); background: none; border: none; cursor: pointer; padding: 0; z-index: 10; }
.pin-inner { display: block; width: 18px; height: 18px; background: #fff; border: 2px solid #6366f1; border-radius: 50%; position: absolute; top: 3px; left: 3px; transition: transform 0.2s; }
.pin::before { content:''; position:absolute; inset:-4px; border-radius:50%; background:rgba(99,102,241,0.2); animation: ripple 2s infinite; }
.pin.active .pin-inner { background: #6366f1; transform: scale(1.2); }
@keyframes ripple { 0%,100%{transform:scale(1);opacity:0.5} 50%{transform:scale(1.5);opacity:0} }

/* Tooltips */
.tip { position: absolute; background: #fff; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 10px 14px; box-shadow: 0 8px 24px rgba(0,0,0,0.12); min-width: 160px; z-index: 20; display: none; animation: tipIn 0.15s ease; }
.tip.show { display: block; }
@keyframes tipIn { from { opacity:0; transform:translateY(-4px); } to { opacity:1; transform:none; } }
.tip::before { content:''; position:absolute; bottom:-6px; left:16px; width:10px; height:10px; background:#fff; border-right:1.5px solid #e2e8f0; border-bottom:1.5px solid #e2e8f0; transform:rotate(45deg); }
.tip-name { font-size: 12px; font-weight: 700; color: #111827; margin-bottom: 3px; }
.tip-detail { font-size: 11px; color: #6b7280; margin-bottom: 4px; }
.tip-price { font-size: 11px; font-weight: 700; color: #6366f1; }`,

  js: `const POSITIONS = [
  {left:'38%',top:'28%'},
  {left:'72%',top:'20%'},
  {left:'45%',top:'72%'},
  {left:'82%',top:'68%'}
];
let activeTip = null;

document.querySelectorAll('.pin').forEach(pin => {
  pin.addEventListener('click', function(e) {
    e.stopPropagation();
    const idx = this.getAttribute('data-tip');
    const tip = document.getElementById('tip' + idx);
    const wrap = document.getElementById('hotspotWrap');
    const wRect = wrap.getBoundingClientRect();
    const pRect = this.getBoundingClientRect();
    const pl = parseFloat(POSITIONS[idx].left);
    const pt = parseFloat(POSITIONS[idx].top);

    if (activeTip === idx) {
      tip.classList.remove('show');
      this.classList.remove('active');
      activeTip = null;
      return;
    }
    document.querySelectorAll('.tip').forEach(t => t.classList.remove('show'));
    document.querySelectorAll('.pin').forEach(p => p.classList.remove('active'));

    // Position tooltip above pin
    const tipLeft = Math.min(Math.max(pl - 8, 2), 55);
    const tipTop = Math.max(pt - 28, 2);
    tip.style.left = tipLeft + '%';
    tip.style.top = tipTop + '%';
    tip.classList.add('show');
    this.classList.add('active');
    activeTip = idx;
  });
});

document.addEventListener('click', function() {
  document.querySelectorAll('.tip').forEach(t => t.classList.remove('show'));
  document.querySelectorAll('.pin').forEach(p => p.classList.remove('active'));
  activeTip = null;
});`,

  seo: {
    title: 'Image Hotspot Tooltips — HTML CSS JS Snippet',
    description: 'Image hotspot component with clickable pin markers, animated ripple pulse, and positioned tooltip cards. Pure HTML CSS JS — exports to React, Vue & Angular.',
    about: {
      title: `Image Hotspot — Clickable Pin Markers, Ripple Pulse & Positioned Tooltip Cards`,
      description: `An image hotspot component overlays interactive pin markers on an image or scene, revealing detailed tooltip cards when clicked. It is widely used in product photography (shoppable lookbooks), interactive diagrams (hardware explainers, floor plans), and educational content (anatomy diagrams, historical maps). The key engineering challenge is positioning tooltips so they remain within the container bounds regardless of where on the image the pin falls.\n\n**CSS-drawn scene**\n\nRather than requiring a real photograph (which creates licensing and file-size concerns for a snippet), the scene is drawn entirely in CSS: a dark gradient background, wooden desk surface, laptop with a screen containing coloured code lines, external monitor with a bar chart, keyboard, mouse, and coffee cup. Each element uses absolute positioning relative to the \`.scene\` container, which uses \`padding-bottom: 58%\` to maintain a fixed aspect ratio — the same technique used for responsive iframes and 16:9 video containers.\n\n**Pin placement and sizing**\n\nEach \`.pin\` button is positioned with \`position: absolute\` using percentage-based \`left\` and \`top\` values. \`transform: translate(-50%, -50%)\` centres the pin on its coordinates. This combination of percentage positioning and centring transform makes pins scale correctly as the container resizes. The pin itself is a circular \`.pin-inner\` div inside the button, giving a clickable area larger than the visual dot.\n\n**Ripple animation**\n\nEach pin has a \`::before\` pseudo-element that runs \`@keyframes ripple\`: scaling from 1× to 1.5× while fading opacity from 0.5 to 0. This creates a continuous pulsing halo that draws attention to the interactive points without requiring user interaction. The animation uses \`2s infinite\` so it runs permanently — useful for indicating interactivity on first load.\n\n**Active state: CSS class toggle**\n\nWhen a pin is clicked, JavaScript adds \`.active\` to it. The CSS rule \`.pin.active .pin-inner { background: #6366f1; transform: scale(1.2) }\` fills the pin with the accent colour and slightly enlarges it — confirming the selection. The transition on \`.pin-inner\` makes this change animate smoothly over 0.2s.\n\n**Tooltip positioning logic**\n\nThe tooltip is positioned above its pin using the same percentage coordinates from the POSITIONS array. A small offset (\`tipTop = pt - 28\`) places it above the pin circle. The horizontal position is clamped with \`Math.min(Math.max(pl - 8, 2), 55)\` to prevent tooltips from overflowing the right edge of the container. The CSS arrow (\`::before\` pseudo-element with \`border-right\` and \`border-bottom\`) appears at the bottom-left of the tooltip, pointing toward the pin below.\n\n**Toggle and exclusive open**\n\nThe click handler tracks \`activeTip\`. If the clicked pin's tip is already open, it closes it (toggle behaviour). Otherwise, all open tips are closed before opening the new one — only one tooltip visible at a time. \`document.addEventListener('click')\` closes all tooltips when clicking outside any pin, using \`e.stopPropagation()\` on pin clicks to prevent immediate close.\n\n**Tooltip entrance animation**\n\n\`@keyframes tipIn\` fades the tooltip in from opacity 0 and translates it up from 4px below its final position. The animation re-runs each time the \`.show\` class is added because CSS animations restart on \`display: none → block\` transitions.\n\n**React integration**\n\nAccept an \`image\` src prop and a \`hotspots\` array where each entry has \`x\`, \`y\` (percentage positions), and \`content\` (tooltip data object). Track \`openIndex\` with \`useState(null)\`. Render a pin component for each hotspot using \`style={{ left: x+'%', top: y+'%' }}\`. The tooltip renders conditionally based on \`openIndex === index\`. Use a \`useEffect\` to attach a document click listener for outside-close, returning cleanup.\n\nSee also the [image comparison snippet](/ui-snippets/image-comparison/) for before/after slider, the [image lightbox snippet](/ui-snippets/image-lightbox/) for full-screen zoom, and the [image magnifier snippet](/ui-snippets/image-magnifier/) for hover-zoom details.`
    },
    howToUse: [
      { title: 'Replace the CSS scene with a real image', text: 'Swap the .scene div with an <img> tag or a div with background-image. Keep position:relative on the container and padding-bottom for aspect ratio.' },
      { title: 'Set pin positions', text: 'Set each .pin button\'s left and top as percentages corresponding to where on the image the hotspot should appear. Keep data-tip matching the tip ID.' },
      { title: 'Update tooltip content', text: 'Edit the .tip-name, .tip-detail, and .tip-price inside each #tipN div with your product or annotation content.' },
      { title: 'Update POSITIONS in JS', text: 'The POSITIONS array in JS must match the CSS left/top values on each .pin. These are used for tooltip offset calculations.' },
      { title: 'Adjust tooltip arrow direction', text: 'The ::before arrow points downward (toward the pin). For pins near the bottom of the image, flip the tooltip above by adjusting tipTop calculation and the ::before positioning.' }
    ],
    features: [
      'Percentage-based pin positioning scales with container size',
      'Continuous ripple pulse animation draws attention to pins',
      'Active pin fills with accent colour via CSS class',
      'Single tooltip open at a time — others close automatically',
      'Outside-click document listener closes all tooltips',
      'Tooltip positioned above pin with clamped overflow protection',
      'CSS arrow pseudo-element on tooltip bottom',
      'Zero dependencies — pure HTML, CSS, JavaScript'
    ],
    useCases: [
      { icon: '🛍️', title: 'Shoppable images', desc: 'Mark products in a lifestyle photo with pulsing pins, each opening a tooltip card with a name and price when clicked.' },
      { icon: '🔧', title: 'Hardware explainers', desc: 'Label the components of a device on a product page, with percentage-based positions keeping each pin on its part at any screen size.' },
      { icon: '🎓', title: 'Educational diagrams', desc: 'Build interactive anatomy, geography or engineering diagrams where learners click a marker to read about that point.' },
      { icon: '🏢', title: 'Office and floor plans', desc: 'Annotate rooms and facilities on a workspace map, with only one tooltip open at a time so the plan stays readable.' },
      { icon: 'CODE', title: 'Related: Splide Thumbnail Gallery', desc: 'See the [Splide Thumbnail Gallery](/ui-snippets/splide-thumbnail-gallery/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I use this image hotspot in React?', a: 'Accept an image src and hotspots array (each with x, y, content props). Track openIndex with useState(null). Use useEffect for the document click listener with cleanup.' },
      { q: 'How do I use a real photo instead of the CSS scene?', a: 'Replace the .scene div with a container div holding an <img> with width:100%. Keep position:relative on the container and adjust aspect ratio via padding-bottom or a fixed height.' },
      { q: 'How do I stop tooltips overflowing on mobile?', a: 'Detect if the tooltip right edge exceeds the container width using getBoundingClientRect(). If it does, anchor the tooltip to the right instead of the left with right:X% and flip the ::before arrow.' },
      { q: 'Can I show tooltips on hover instead of click?', a: 'Replace the click event listener with mouseenter/mouseleave on each .pin. Add pointer-events:none to .tip and pointer-events:auto when shown to allow clicking links inside.' },
      { q: 'How do I export this image hotspot to Vue, Angular, or Tailwind?', a: 'Open the Export menu (or the Test Exports preview) in the snippet toolbar. It generates a plain React component, a React + Tailwind version where the pin and tooltip styles become utility classes, a Vue 3 single-file component with the open/close logic in script setup, and an Angular standalone component. Each converter preserves the markup, the ripple-pulse CSS, and the click-to-open behaviour — inline handlers map to the matching framework event bindings, so the hotspots and tooltips work identically across React, Vue, and Angular. Pass the hotspots in as a component prop or input instead of hardcoding them in the markup.' },
      { q: 'How do I make the hotspots responsive across image sizes?', a: 'Position each pin with percentage left/top values rather than pixels, so the markers track the image as it scales. Keep the image container position:relative and the pins position:absolute inside it — the percentages then stay accurate at any width, including full-bleed mobile layouts where the scene resizes with the viewport.' }
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the coordinate math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the POSITIONS array in the JS must stay in sync with the inline left/top percentages on each pin button, or how the tipLeft clamping formula (Math.min(Math.max(pl - 8, 2), 55)) keeps a tooltip from overflowing the right edge of the container. The same assistant is useful for optimizing it — ask whether keeping pin coordinates duplicated in both the HTML inline styles and the JS POSITIONS array is a maintenance risk, and how you'd refactor it to a single source of truth (like reading the pin's own style at click time instead). It's just as handy for extending the component: ask it to detect overflow dynamically with getBoundingClientRect instead of hardcoded clamp values so it works at any container width, add smooth pan/zoom into the hotspot region on click, or support a hover-to-preview mode alongside the click-to-open behavior. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an image hotspot component with clickable pin markers and positioned tooltip cards in plain HTML, CSS, and JavaScript — no library.

Requirements:
- A relatively-positioned image or scene container holding several absolutely-positioned circular pin buttons, each placed using percentage-based left and top values (not pixels) so they track the container proportionally at any size, centered on their coordinate using a translate transform.
- Each pin must have a continuously looping CSS ripple animation (a pseudo-element scaling up while fading out) to draw attention, and a distinct visual "active" state (different fill color and a slight scale-up) applied only while its tooltip is open.
- One tooltip card per pin, absolutely positioned and hidden by default, containing at least a name, a detail line, and a price or label line, with a small triangular arrow pseudo-element pointing down toward its pin.
- Clicking a pin must position its tooltip above the pin using the pin's own coordinate data, clamp the tooltip's horizontal position so it never overflows past the right edge of the container, close any other currently-open tooltip and deactivate its pin first, and toggle its own tooltip closed again if it was already open (so clicking the same pin twice opens then closes it).
- Clicking anywhere outside of a pin (on the document) must close every open tooltip and deactivate every pin, and clicking a pin itself must not trigger that outside-click close (event propagation must be stopped appropriately).
- Give the tooltip a brief entrance animation (fade and slight upward slide) that replays every time it's shown.`,
    },
  },
};

export default imageHotspot;
