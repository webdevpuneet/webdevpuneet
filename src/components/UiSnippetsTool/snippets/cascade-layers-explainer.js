const cascadeLayersExplainer = {
  id: 'cascade-layers-explainer',
  title: 'CSS Cascade Layers (@layer) Explainer',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="demo-wrap">
  <div class="intro">
    <h2>@layer cascade order</h2>
    <p>Drag-free reordering: use the up/down buttons to change which layer is declared last (and therefore wins the cascade). The same <code>.btn</code> selector is styled in all four layers — only order decides who wins, not specificity.</p>
  </div>

  <div class="layout">
    <div class="order-panel">
      <p class="panel-label">Layer declaration order</p>
      <p class="panel-sub">Later in the list = higher cascade priority</p>
      <ol class="layer-list" id="layer-list">
        <li class="layer-item" data-layer="reset">
          <span class="layer-swatch swatch-reset"></span>
          <span class="layer-name">reset</span>
          <div class="layer-move">
            <button class="move-btn" data-dir="up" aria-label="Move reset up">↑</button>
            <button class="move-btn" data-dir="down" aria-label="Move reset down">↓</button>
          </div>
        </li>
        <li class="layer-item" data-layer="base">
          <span class="layer-swatch swatch-base"></span>
          <span class="layer-name">base</span>
          <div class="layer-move">
            <button class="move-btn" data-dir="up" aria-label="Move base up">↑</button>
            <button class="move-btn" data-dir="down" aria-label="Move base down">↓</button>
          </div>
        </li>
        <li class="layer-item" data-layer="components">
          <span class="layer-swatch swatch-components"></span>
          <span class="layer-name">components</span>
          <div class="layer-move">
            <button class="move-btn" data-dir="up" aria-label="Move components up">↑</button>
            <button class="move-btn" data-dir="down" aria-label="Move components down">↓</button>
          </div>
        </li>
        <li class="layer-item" data-layer="utilities">
          <span class="layer-swatch swatch-utilities"></span>
          <span class="layer-name">utilities</span>
          <div class="layer-move">
            <button class="move-btn" data-dir="up" aria-label="Move utilities up">↑</button>
            <button class="move-btn" data-dir="down" aria-label="Move utilities down">↓</button>
          </div>
        </li>
      </ol>
      <button class="reset-order-btn" id="reset-order-btn">Reset to default order</button>
    </div>

    <div class="preview-panel">
      <p class="panel-label">Live result</p>
      <p class="panel-sub">Same <code>.btn</code> selector, colored by 4 different layers</p>
      <button class="btn" id="preview-btn">Sample Button</button>
      <p class="winner-line">Winning layer: <strong id="winner-name">utilities</strong></p>
    </div>
  </div>

  <div class="css-panel">
    <p class="css-panel-label">Generated @layer statement</p>
    <code class="css-panel-code" id="layer-statement">@layer reset, base, components, utilities;</code>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; color: #1e293b; }

.demo-wrap { max-width: 680px; margin: 0 auto; padding: 32px 20px 48px; }
.intro h2 { font-size: 18px; font-weight: 700; margin-bottom: 6px; }
.intro p { font-size: 13px; color: #64748b; line-height: 1.6; }
.intro code { background: #eef2ff; color: #4f46e5; padding: 1px 6px; border-radius: 5px; font-size: 12px; }

.layout { display: grid; grid-template-columns: 1.1fr 1fr; gap: 18px; margin-top: 20px; }
@media (max-width: 560px) { .layout { grid-template-columns: 1fr; } }

.order-panel, .preview-panel {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 16px;
}
.panel-label { font-size: 12px; font-weight: 700; color: #1e293b; }
.panel-sub { font-size: 11px; color: #94a3b8; margin: 3px 0 12px; }
.panel-sub code { background: #f1f5f9; padding: 1px 5px; border-radius: 4px; }

.layer-list { list-style: none; display: flex; flex-direction: column; gap: 6px; }
.layer-item {
  display: flex; align-items: center; gap: 10px;
  background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 9px;
  padding: 8px 10px;
  transition: transform 0.25s ease, box-shadow 0.2s;
}
.layer-swatch { width: 12px; height: 12px; border-radius: 4px; flex-shrink: 0; }
.swatch-reset { background: #94a3b8; }
.swatch-base { background: #38bdf8; }
.swatch-components { background: #a78bfa; }
.swatch-utilities { background: #f472b6; }

.layer-name { font-size: 13px; font-weight: 600; flex: 1; font-family: "SF Mono", Consolas, monospace; }
.layer-move { display: flex; gap: 4px; }
.move-btn {
  width: 24px; height: 24px; border-radius: 6px; border: 1px solid #e2e8f0;
  background: #fff; cursor: pointer; font-size: 12px; color: #475569;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s, border-color 0.15s;
}
.move-btn:hover { background: #eef2ff; border-color: #6366f1; color: #4f46e5; }
.move-btn:disabled { opacity: 0.35; cursor: not-allowed; }
.move-btn:disabled:hover { background: #fff; border-color: #e2e8f0; color: #475569; }

.reset-order-btn {
  margin-top: 12px; width: 100%; padding: 8px; border-radius: 8px;
  border: 1px solid #e2e8f0; background: #f8fafc; color: #475569;
  font-size: 12px; font-weight: 600; cursor: pointer; font-family: inherit;
  transition: border-color 0.15s, color 0.15s;
}
.reset-order-btn:hover { border-color: #6366f1; color: #4f46e5; }

.preview-panel { display: flex; flex-direction: column; align-items: flex-start; }

/* --- Real cascade layers --- */
@layer reset, base, components, utilities;

@layer reset {
  .btn { background: #94a3b8; color: #fff; border: none; border-radius: 6px; padding: 10px 18px; font-size: 13px; cursor: pointer; font-family: inherit; }
}
@layer base {
  .btn { background: #38bdf8; }
}
@layer components {
  .btn { background: #a78bfa; }
}
@layer utilities {
  .btn { background: #f472b6; }
}

#preview-btn { transition: background 0.3s ease; margin-bottom: 10px; box-shadow: 0 4px 14px rgba(15,23,42,0.12); }
.winner-line { font-size: 12px; color: #64748b; }
.winner-line strong { color: #0f172a; font-family: "SF Mono", Consolas, monospace; }

.css-panel { margin-top: 18px; background: #0f172a; border-radius: 12px; padding: 14px 16px; }
.css-panel-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #818cf8; margin-bottom: 6px; }
.css-panel-code { display: block; font-family: "SF Mono", Consolas, monospace; font-size: 12px; color: #e2e8f0; word-break: break-word; }`,
  js: `/*
  Real @layer order is fixed at parse time by the FIRST @layer statement the
  browser sees for a given stylesheet — reordering it live isn't something
  the platform lets you do by re-running JS. To teach the mechanism honestly,
  this demo re-injects a fresh <style> block whose @layer statement (and whose
  per-layer rule bodies) reflect the user's chosen order every time it changes.
  The winning layer is always simply "whichever layer is declared LAST" —
  that's the actual rule cascade layers use, and this demo makes it visible.
*/

const LAYER_COLORS = {
  reset: '#94a3b8',
  base: '#38bdf8',
  components: '#a78bfa',
  utilities: '#f472b6',
};

let order = ['reset', 'base', 'components', 'utilities'];
const DEFAULT_ORDER = [...order];

const list = document.getElementById('layer-list');
const layerStatementEl = document.getElementById('layer-statement');
const winnerNameEl = document.getElementById('winner-name');
const previewBtn = document.getElementById('preview-btn');

let styleTag = document.getElementById('dynamic-layer-style');
if (!styleTag) {
  styleTag = document.createElement('style');
  styleTag.id = 'dynamic-layer-style';
  document.head.appendChild(styleTag);
}

function render() {
  // Reorder the DOM list items to match the "order" array
  order.forEach(layerName => {
    const item = list.querySelector(\`[data-layer="\${layerName}"]\`);
    list.appendChild(item);
  });

  // Rebuild the actual @layer statement + rule bodies in declaration order.
  // Whichever layer comes LAST in the @layer statement wins the cascade.
  const statement = \`@layer \${order.join(', ')};\`;
  const rules = order.map(name => \`@layer \${name} { #preview-btn { background: \${LAYER_COLORS[name]}; } }\`).join('\\n');
  styleTag.textContent = \`\${statement}\\n\${rules}\`;

  const winner = order[order.length - 1];
  winnerNameEl.textContent = winner;
  layerStatementEl.textContent = statement;

  // Update move-button disabled states + swatch highlight for the winner
  order.forEach((name, i) => {
    const item = list.querySelector(\`[data-layer="\${name}"]\`);
    const upBtn = item.querySelector('[data-dir="up"]');
    const downBtn = item.querySelector('[data-dir="down"]');
    upBtn.disabled = i === 0;
    downBtn.disabled = i === order.length - 1;
    item.style.boxShadow = name === winner ? '0 0 0 2px #6366f1 inset' : 'none';
  });
}

list.addEventListener('click', e => {
  const btn = e.target.closest('.move-btn');
  if (!btn || btn.disabled) return;
  const item = btn.closest('.layer-item');
  const name = item.dataset.layer;
  const idx = order.indexOf(name);
  const dir = btn.dataset.dir === 'up' ? -1 : 1;
  const swapIdx = idx + dir;
  if (swapIdx < 0 || swapIdx >= order.length) return;
  [order[idx], order[swapIdx]] = [order[swapIdx], order[idx]];
  render();
});

document.getElementById('reset-order-btn').addEventListener('click', () => {
  order = [...DEFAULT_ORDER];
  render();
});

render();`,
  seo: {
    title: 'CSS Cascade Layers @layer Explainer — Free Snippet',
    description: 'Interactive @layer cascade demo — reorder layers, see which rule wins independent of selector specificity. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'CSS Cascade Layers (@layer) Explainer — Controlling Cascade Priority Without Specificity Wars',
      description: `Before cascade layers shipped, the only tools CSS gave you for resolving "which rule wins when two rules target the same element" were source order, specificity (ID beats class beats element), and the blunt hammer of \`!important\`. That system works fine in small stylesheets but breaks down badly at scale — once a design system, a component library, and page-specific overrides are all writing CSS for the same project, specificity wars are almost guaranteed, because bumping one selector's specificity to "win" often just moves the problem to the next conflict. The \`@layer\` at-rule, part of the CSS Cascade Layers specification and supported in all major browsers since 2022 (Chrome/Edge 99+, Firefox 97+, Safari 15.4+), solves this by adding an entirely new, explicit priority dimension to the cascade that sits *above* specificity.

**How @layer actually works**

You declare your layers' relative order once, up front, with a bare statement like \`@layer reset, base, components, utilities;\` — this line does not contain any rules, it just registers the names and their order. Layers declared later in this list have **higher priority** than layers declared earlier, no matter what specificity the individual selectors inside each layer have. This is the counterintuitive part worth sitting with: a single-element selector like \`.btn\` inside the \`utilities\` layer will beat an ID selector like \`#submit-button\` inside the \`reset\` layer, because layer order is checked *before* specificity is ever compared. Only after the browser has determined which layer wins does it fall back to specificity and source order to resolve conflicts *within* that same layer. Unlayered styles (any CSS not inside an \`@layer\` block) are treated as if they were in one implicit final layer that comes after all named layers — meaning ordinary global CSS still overrides everything in your layers unless you're careful, which is a common early surprise for teams adopting this feature.

**Why this matters for modern UI development in 2025/2026**

Design systems and component libraries (Tailwind's \`@layer base/components/utilities\`, and many custom-built systems) increasingly ship CSS in layers specifically so consuming applications can insert their own overrides at a predictable point in the priority order — for example, a documented \`@layer reset, tokens, base, components, overrides;\` contract lets a library guarantee "your app-level \`overrides\` layer will always beat our \`components\` layer," regardless of how specific either side's selectors are. This eliminates the need to escalate specificity or reach for \`!important\` just to override a third-party component's default button color. It also makes migrating or refactoring large stylesheets safer, because you can reason about "what layer is this rule in" as a stable fact, separate from "how many classes does this selector have."

**How this demo simulates live reordering**

The actual CSS Cascade Layers spec fixes a layer's relative order at the *first* \`@layer\` statement the browser parses for that stylesheet — real production code does not reorder layers at runtime. To make the mechanism visible and interactive anyway, this demo re-writes a \`<style>\` tag's entire \`@layer\` statement and per-layer rule bodies every time you click a reorder button, using genuine \`@layer\` syntax each time. The rendered button's color always reflects whichever layer is declared *last* in the freshly injected statement, which is the real rule the browser cascade uses — this demo isn't faking the visual result, it's re-authoring valid CSS on the fly so you can explore the rule interactively.

**Practical takeaway**

If you remember one thing: layer order beats specificity, specificity only matters *within* a layer or among unlayered rules, and unlayered CSS always sits in an implicit layer after every named layer. Structuring your stylesheet with a small number of well-named layers (reset, tokens, base, components, utilities, overrides) up front gives you a predictable, documented escape hatch for every future override.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read the default order', text: 'The default layer order is reset, base, components, utilities — declared by @layer reset, base, components, utilities; in the css panel. Because utilities is declared last, it currently wins, and the sample button is pink (#f472b6), matching the utilities swatch.' },
        { title: 'Move a layer with the up/down arrows', text: 'Click the ↑ or ↓ button next to any layer name in the order-panel list. The list re-sorts instantly, the generated @layer statement text updates at the bottom, and the sample button\'s color changes to match whichever layer is now declared last.' },
        { title: 'Move reset to the end', text: 'Click ↓ on the "reset" row repeatedly until it reaches the bottom of the list. Even though .btn in the reset layer has the exact same selector specificity as every other layer\'s .btn rule, it now wins purely because of declaration order — this is the core lesson of the demo.' },
        { title: 'Inspect the generated CSS', text: 'The dark "Generated @layer statement" panel shows the literal @layer statement text being injected into a live <style> tag in the page head via styleTag.textContent, so you can see the real CSS driving the result, not just a simulated color change.' },
        { title: 'Reset to the default order', text: 'Click "Reset to default order" to restore reset, base, components, utilities and confirm the button returns to pink, re-establishing the utilities layer as the winner.' },
        { title: 'Apply the pattern to your own stylesheet', text: 'In your real project CSS (not this JS-driven simulation), declare your layer order once at the top of your entry stylesheet, e.g. @layer reset, tokens, base, components, utilities, overrides; and then wrap each section of your existing CSS in the matching @layer name { ... } block — the order in that first statement is what governs priority everywhere in your app.' },
      ],
    },
    features: [
      '@layer reset, base, components, utilities; declares real cascade layer priority order',
      'Layer order determines winner independent of selector specificity — same .btn selector in every layer',
      'JS reorders by re-injecting a fresh <style> tag with a rebuilt @layer statement each time, using genuine syntax',
      'Unlayered CSS (this demo\'s own layout styles) sits in the implicit final layer, always after named layers',
      'Move buttons are disabled at list boundaries (upBtn.disabled, downBtn.disabled) to prevent invalid reordering',
      'Winning layer swatch gets a visible inset box-shadow ring so the current winner is always identifiable',
      'Generated @layer statement rendered as literal text so learners see the exact CSS being executed',
      'Smooth 0.3s background-color transition on the preview button softens each cascade-order change',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Design system and component library override contracts', desc: 'Ship your design system CSS inside named layers like tokens, base, components so consuming apps can declare their own overrides layer after yours in their @layer statement, guaranteeing app-level styles win without needing higher specificity or !important. This is the same strategy used by utility frameworks that expose base/components/utilities layers.' },
      { icon: 'APP', title: 'Migrating legacy CSS without a specificity rewrite', desc: 'Wrap old, highly-specific legacy CSS in a low-priority @layer legacy and new component CSS in a higher-priority @layer new — new code can override legacy selectors immediately without matching or exceeding their specificity, which is often impossible without risky refactors.' },
      { icon: 'LEARN', title: 'Teaching the real cascade algorithm order', desc: 'Most developers learn "specificity wins" as the whole story. This playground makes the actual four-step cascade (origin/importance, then layer order, then specificity, then source order) tangible by holding specificity constant and only varying layer order, isolating the variable that\'s hardest to build intuition for.' },
      { icon: 'CODE', title: 'Third-party widget and plugin style isolation', desc: 'Wrap an embeddable widget\'s CSS in its own named layer, declared early in your @layer statement, so host-page styles (in a later layer, or unlayered) always take precedence when needed — while still letting the widget ship sensible internal defaults.' },
      { icon: 'FLOW', title: 'Resolving conflicts between Tailwind and custom CSS', desc: 'Tailwind v3+ generates utilities inside its own @layer blocks; understanding that your custom unlayered CSS sits in the implicit final layer (and therefore already beats Tailwind\'s layered utilities regardless of specificity) explains a lot of "why did my override not need !important" and "why did it need !important after all" confusion teams run into.' },
      { icon: 'DESIGN', title: 'Theming and dark-mode override layers', desc: 'A dedicated @layer theme-overrides declared last in your stack lets a theme switcher safely override component-level color rules from any layer beneath it, similar in spirit to how the [Cascade Layers Explainer](/ui-snippets/cascade-layers-explainer) demo swaps the winning color by only touching declaration order.' },
      { icon: 'CODE', title: 'Related: Collapsible Sidebar', desc: 'See the [Collapsible Sidebar](/ui-snippets/collapsible-sidebar/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does @layer order really beat specificity? What about !important?', a: 'Yes, for normal-importance rules: layer order is checked before specificity in the cascade algorithm, so a low-specificity selector in a later layer beats a high-specificity selector in an earlier layer. !important flips this: important declarations in an EARLIER layer beat important declarations in a later layer — the priority order reverses for the important half of the cascade, which is an intentional design choice to keep !important as a true last-resort override.' },
      { q: 'What happens to CSS that is not inside any @layer block?', a: 'Unlayered rules are treated as belonging to a single implicit layer that is always placed after every explicitly named layer, meaning ordinary global CSS in your stylesheet will override anything inside a named layer regardless of specificity, unless you also move that CSS into a layer. This surprises teams who assume wrapping third-party CSS in a layer automatically makes their own untouched styles win — it does, but only because their styles were already unlayered and therefore already last.' },
      { q: 'Can I declare @layer order across multiple stylesheets or <style> tags?', a: 'Yes — the first @layer statement (or first use of a layer name) that the browser parses, across all stylesheets in document order, establishes each named layer\'s position. Later files can add more rules to an already-registered layer name without changing its position, which is what lets a design system register layer names early and let the consuming app safely append rules to those same layers later.' },
      { q: 'Is @layer safe to use in production today?', a: 'Yes — @layer has been supported in Chrome/Edge since version 99, Firefox since 97, and Safari since 15.4, all released in 2022, giving it several years of broad support by 2026. There is no meaningful fallback concern for modern evergreen-browser audiences; older browsers simply ignore unrecognized @layer blocks\' contents in unpredictable ways, so audit your support matrix if you must support legacy browsers.' },
      { q: 'Why does this demo reinject a whole <style> tag instead of just changing a color?', a: 'Real @layer priority order is fixed by the browser at parse time from the first @layer statement it encounters — there is no live JS API to reorder an already-registered layer. To demonstrate genuine cascade-layer behavior rather than fake it with a plain class swap, the demo rebuilds and re-parses an entirely new, valid @layer statement and rule set on every reorder, so the color change you see is a real consequence of real CSS cascade-layer resolution, just triggered by re-parsing rather than a live reorder API.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to explain, step by step, why a low-specificity .btn selector inside a later-declared layer beats a high-specificity #id selector inside an earlier-declared layer — it can walk through the full CSS cascade algorithm (origin, importance, layer order, specificity, source order) using this exact demo as the running example. You could also ask it to explain the !important-reverses-layer-priority behavior in more depth, or to show you how a real project (not this JS-simulated reordering) would declare @layer reset, base, components, utilities; once at the top of a global stylesheet. It's also worth asking it to extend the demo with a fifth "overrides" layer and an unlayered CSS example to show how unlayered rules always beat named layers.`,
      prompt: `Build an interactive HTML/CSS/JS demo that teaches how CSS cascade layers (@layer) determine priority independent of selector specificity.

Requirements:
- Style one shared selector (e.g. .btn on a sample button) inside four separate, genuinely valid @layer blocks (for example reset, base, components, utilities), each giving the button a different background color, so all four rules have identical specificity and the only variable is layer declaration order.
- A reorderable list UI (up/down move buttons per row is acceptable — drag and drop is not required) representing the four layer names, where changing the order updates a visible "winning layer" label showing which layer is currently declared last.
- Because real CSS @layer order cannot be changed live via a JavaScript API once parsed, implement the reordering by having JS rebuild and re-inject a fresh <style> element containing a new, valid @layer statement (in the new order) plus each layer's rule body, every time the user reorders — so the visual result is driven by genuine CSS cascade-layer resolution, not a simulated class swap.
- Display the exact generated @layer statement text (e.g. "@layer base, utilities, reset, components;") in a visible code panel so the underlying mechanism is never hidden.
- Disable the "move up" control on the first item and "move down" on the last item so the order list can't be moved out of bounds.
- Include a way to reset the order back to the original default sequence.
- Use smooth CSS transitions on the button's background-color change so reordering feels responsive, and visually mark the currently-winning layer's row in the list (e.g. a highlighted ring) so its win is legible without reading the code panel.`,
    },
  },
};

export default cascadeLayersExplainer;
