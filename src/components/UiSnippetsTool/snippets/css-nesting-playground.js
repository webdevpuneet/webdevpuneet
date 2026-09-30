const cssNestingPlayground = {
  id: 'css-nesting-playground',
  title: 'Native CSS Nesting Playground',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="demo-wrap">
  <div class="intro">
    <h2>Native CSS nesting</h2>
    <p>The card below is styled with real, browser-native nested CSS — the <code>&amp;</code> selector, nested <code>:hover</code>/<code>:focus-within</code> states, and a nested <code>@media</code> query. No Sass, no build step. Hover the card, focus the button, and shrink the preview to see each nested rule activate.</p>
  </div>

  <div class="preview-shell">
    <article class="nested-card" tabindex="0">
      <div class="nc-icon">✦</div>
      <h3 class="nc-title">Native Nesting</h3>
      <p class="nc-desc">This card's hover glow, focus ring, and compact layout on narrow viewports are all written using the <code>&amp;</code> nesting selector.</p>
      <button class="nc-btn">Learn more</button>
    </article>
  </div>

  <div class="toggle-row">
    <button class="view-btn active" id="btn-nested" data-view="nested">Nested CSS</button>
    <button class="view-btn" id="btn-flat" data-view="flat">Flattened equivalent</button>
  </div>

  <div class="code-panel">
    <p class="code-panel-label" id="code-panel-label">Nested CSS (source)</p>
    <pre class="code-panel-body" id="code-panel-body"></pre>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; color: #1e293b; }

.demo-wrap { max-width: 640px; margin: 0 auto; padding: 32px 20px 48px; }
.intro h2 { font-size: 18px; font-weight: 700; margin-bottom: 6px; }
.intro p { font-size: 13px; color: #64748b; line-height: 1.6; }
.intro code { background: #eef2ff; color: #4f46e5; padding: 1px 6px; border-radius: 5px; font-size: 12px; }

.preview-shell {
  margin: 20px 0; padding: 28px;
  background: #eef2ff; border-radius: 16px;
  display: flex; justify-content: center;
  resize: horizontal; overflow: auto; max-width: 100%; min-width: 240px;
}

/* --- Native CSS nesting starts here --- */
.nested-card {
  background: #fff;
  border: 1.5px solid #e2e8f0;
  border-radius: 14px;
  padding: 22px;
  max-width: 300px;
  width: 100%;
  cursor: pointer;
  outline: none;
  transition: box-shadow 0.25s, transform 0.2s, border-color 0.25s;

  & .nc-icon {
    width: 40px; height: 40px;
    display: flex; align-items: center; justify-content: center;
    background: #eef2ff; color: #6366f1;
    border-radius: 10px; font-size: 18px;
    margin-bottom: 14px;
    transition: background 0.25s, color 0.25s;
  }

  & .nc-title {
    font-size: 16px; font-weight: 700; margin-bottom: 8px;
  }

  & .nc-desc {
    font-size: 12.5px; color: #64748b; line-height: 1.6; margin-bottom: 16px;

    & code { background: #f1f5f9; padding: 1px 5px; border-radius: 4px; font-size: 11px; }
  }

  & .nc-btn {
    background: #6366f1; color: #fff; border: none; border-radius: 8px;
    padding: 8px 16px; font-size: 12.5px; font-weight: 600;
    cursor: pointer; font-family: inherit;
    transition: background 0.15s;

    &:hover { background: #4f46e5; }
  }

  &:hover {
    box-shadow: 0 12px 28px rgba(99,102,241,0.18);
    transform: translateY(-3px);
    border-color: #a5b4fc;

    & .nc-icon { background: #6366f1; color: #fff; }
  }

  &:focus-within {
    box-shadow: 0 0 0 4px rgba(99,102,241,0.25);
  }

  @media (max-width: 300px) {
    padding: 14px;

    & .nc-title { font-size: 14px; }
    & .nc-btn { width: 100%; }
  }
}
/* --- Native CSS nesting ends here --- */

.toggle-row { display: flex; gap: 8px; margin: 20px 0 12px; }
.view-btn {
  flex: 1; padding: 9px; border-radius: 8px; border: 1.5px solid #e2e8f0;
  background: #fff; color: #475569; font-size: 12.5px; font-weight: 600;
  cursor: pointer; font-family: inherit; transition: all 0.15s;
}
.view-btn.active { background: #6366f1; border-color: #6366f1; color: #fff; }
.view-btn:not(.active):hover { border-color: #a5b4fc; color: #4f46e5; }

.code-panel { background: #0f172a; border-radius: 12px; padding: 14px 16px; max-height: 320px; overflow: auto; }
.code-panel-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #818cf8; margin-bottom: 8px; }
.code-panel-body { font-family: "SF Mono", Consolas, monospace; font-size: 11.5px; color: #e2e8f0; line-height: 1.6; white-space: pre; }`,
  js: `const NESTED_SRC = \`.nested-card {
  transition: box-shadow .25s, transform .2s;

  & .nc-icon {
    background: #eef2ff;
    color: #6366f1;
    transition: background .25s, color .25s;
  }

  & .nc-desc {
    color: #64748b;

    & code {
      background: #f1f5f9;
    }
  }

  & .nc-btn {
    background: #6366f1;

    &:hover {
      background: #4f46e5;
    }
  }

  &:hover {
    box-shadow: 0 12px 28px rgba(99,102,241,.18);
    transform: translateY(-3px);

    & .nc-icon {
      background: #6366f1;
      color: #fff;
    }
  }

  &:focus-within {
    box-shadow: 0 0 0 4px rgba(99,102,241,.25);
  }

  @media (max-width: 300px) {
    padding: 14px;

    & .nc-title {
      font-size: 14px;
    }
  }
}\`;

const FLAT_SRC = \`.nested-card {
  transition: box-shadow .25s, transform .2s;
}

.nested-card .nc-icon {
  background: #eef2ff;
  color: #6366f1;
  transition: background .25s, color .25s;
}

.nested-card .nc-desc {
  color: #64748b;
}

.nested-card .nc-desc code {
  background: #f1f5f9;
}

.nested-card .nc-btn {
  background: #6366f1;
}

.nested-card .nc-btn:hover {
  background: #4f46e5;
}

.nested-card:hover {
  box-shadow: 0 12px 28px rgba(99,102,241,.18);
  transform: translateY(-3px);
}

.nested-card:hover .nc-icon {
  background: #6366f1;
  color: #fff;
}

.nested-card:focus-within {
  box-shadow: 0 0 0 4px rgba(99,102,241,.25);
}

@media (max-width: 300px) {
  .nested-card {
    padding: 14px;
  }
  .nested-card .nc-title {
    font-size: 14px;
  }
}\`;

const body = document.getElementById('code-panel-body');
const label = document.getElementById('code-panel-label');
const btnNested = document.getElementById('btn-nested');
const btnFlat = document.getElementById('btn-flat');

function setView(view) {
  const isNested = view === 'nested';
  body.textContent = isNested ? NESTED_SRC : FLAT_SRC;
  label.textContent = isNested ? 'Nested CSS (source)' : 'Flattened equivalent (what the browser resolves to)';
  btnNested.classList.toggle('active', isNested);
  btnFlat.classList.toggle('active', !isNested);
}

btnNested.addEventListener('click', () => setView('nested'));
btnFlat.addEventListener('click', () => setView('flat'));

setView('nested');`,
  seo: {
    title: 'Native CSS Nesting Playground — & Selector Snippet',
    description: 'Native CSS nesting demo: the & selector, nested :hover and @media, shown side by side with its flattened equivalent. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Native CSS Nesting Playground — Writing Nested Selectors Without a Preprocessor',
      description: `For over a decade, nesting selectors inside one another — writing \`.card { & .title { ... } }\` instead of repeating \`.card .title { ... }\` as a flat rule — was something you could only get through a CSS preprocessor like Sass or Less, which meant a build step, a compiler, and source maps just to keep related styles visually grouped in your source file. Native CSS Nesting, standardized by the CSS Nesting Module and shipped in Chrome/Edge 112+, Safari 16.5+, and Firefox 117+ (giving it full baseline browser support since mid-2023), brings this directly into the CSS language itself — no tooling required, no \`.scss\` file extension, just a \`.css\` file the browser parses natively.

**How native CSS nesting works technically**

Inside a rule block, you can nest another selector, and it will be interpreted relative to the parent selector. The explicit \`&\` symbol represents "the parent selector" and can be positioned anywhere in the nested selector — most commonly at the start (\`& .child\`) to mean descendant, or directly attached to a pseudo-class (\`&:hover\`) to mean "this same element, when hovered." When you nest a plain type or class selector without a leading \`&\` (like \`& .nc-icon\` or even just \`.nc-icon\` in some contexts), the browser implicitly treats it as a descendant combinator, equivalent to writing \`.nested-card .nc-icon\` as a flat rule. Crucially, nesting is not just a source-code convenience — it compiles down (conceptually, inside the browser's own CSS object model) to exactly the same flat, fully-qualified selectors that hand-written CSS would produce; there's no new specificity or matching model, just a more ergonomic way to author the same rules. You can nest indefinitely, including nesting pseudo-classes inside pseudo-classes, and — as of the same specification — nest at-rules like \`@media\` directly inside a selector block, which previously required breaking a component's styles across multiple, disconnected top-level \`@media\` blocks in a Sass or vanilla CSS file.

**Why this matters for modern UI development in 2025/2026**

The biggest practical win is co-location: everything relevant to \`.nested-card\` — its hover state, its child element styles, its own responsive behavior — lives inside one contiguous rule block instead of being scattered across the file as separate flat selectors that a reader has to mentally reassemble. This mirrors how component-scoped styling already works in JSX/CSS-in-JS and Vue single-file components, but now works in plain \`.css\` files with zero runtime or build overhead. It also removes a major reason many teams reached for Sass or PostCSS plugins in the first place — as native nesting support has matured, projects can increasingly drop the preprocessor step entirely for projects that only used it for nesting and variables (the latter now covered by native CSS custom properties), simplifying the build pipeline.

**What this demo shows**

The nested-card component's CSS uses four nesting patterns you'll use constantly: \`& .nc-icon\` for descendant selection, \`&:hover\` and \`&:focus-within\` for interactive pseudo-classes on the card itself, a doubly-nested \`& .nc-desc { & code { ... } }\` for a grandchild selector, and a nested \`@media (max-width: 300px) { & .nc-title { ... } }\` block for container-relative responsive tweaks — all inside one \`.nested-card { }\` block. The toggle below the preview lets you flip between that authored nested source and a hand-written flattened equivalent, so you can see exactly which flat selector each nested rule expands to conceptually — \`&:hover .nc-icon\` becomes \`.nested-card:hover .nc-icon\`, and the nested \`@media\` block becomes a standalone top-level \`@media\` block wrapping fully-qualified selectors.

**Browser support and syntax caveats**

Full native nesting support (including the more permissive syntax that doesn't always require a leading \`&\`) landed across evergreen browsers in 2023, so it's safe for most 2025/2026 production audiences. One easy mistake: nesting a bare type selector (like \`p { }\`) directly without \`&\` can be ambiguous with a declaration in older parsing rules, so many style guides still prefer always prefixing nested selectors with \`&\` for clarity, exactly as this demo does throughout.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read the nested source', text: 'The "Nested CSS" code panel shows the actual authored CSS for .nested-card, including & .nc-icon, & .nc-desc { & code { ... } }, &:hover, &:focus-within, and a nested @media (max-width: 300px) block — all written inside one top-level rule.' },
        { title: 'Interact with the live card', text: 'Hover the card in the preview to trigger the &:hover rule (box-shadow lift and icon color invert), and click/Tab into it to trigger &:focus-within (the indigo focus ring), both defined natively inside .nested-card without a single separate top-level selector.' },
        { title: 'Compare against the flattened equivalent', text: 'Click "Flattened equivalent" to see a hand-written, non-nested version of the exact same rules — .nested-card:hover .nc-icon, .nested-card .nc-desc code, and so on — demonstrating that nesting is purely an authoring convenience with identical resolved behavior.' },
        { title: 'Shrink the preview shell', text: 'Drag the resize handle on the bottom-right corner of the light preview box (it uses CSS resize: horizontal) below 300px wide to trigger the nested @media (max-width: 300px) block, which reduces padding and stacks the button full-width.' },
        { title: 'Compare doubly-nested selectors', text: 'Notice & .nc-desc contains a further-nested & code rule inside it — this compiles conceptually to .nested-card .nc-desc code, a two-level-deep flat selector, showing nesting can go arbitrarily deep just like Sass.' },
        { title: 'Apply the pattern to your own components', text: 'In your own CSS files, wrap a component\'s child-element rules, pseudo-class states, and responsive breakpoints inside its own top-level selector block using &, keeping every rule relevant to that component visually co-located, then verify support with @supports selector(&) if you need a fallback strategy for older browsers.' },
      ],
    },
    features: [
      'Native & selector nests child element rules (.nc-icon, .nc-title, .nc-desc) inside .nested-card with zero build step',
      'Nested pseudo-classes: &:hover and &:focus-within defined directly inside the parent rule block',
      'Doubly-nested selector: & .nc-desc { & code { ... } } reaches a grandchild element two levels deep',
      'Nested @media (max-width: 300px) block lives inside .nested-card instead of a disconnected top-level query',
      'CSS resize: horizontal on .preview-shell lets you manually trigger the nested media query by dragging',
      'Side-by-side flattened-equivalent panel shows the exact non-nested selectors the browser conceptually resolves to',
      'Toggle buttons swap code panel content and label text via a single setView() function, no page reload',
      'Zero Sass/PostCSS dependency — parsed natively by the browser in a plain .css context',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Dropping Sass or PostCSS nesting plugins from a build pipeline', desc: 'Teams that only adopted Sass for its nesting and variable syntax can migrate those files to plain CSS using & nesting and CSS custom properties, removing a compilation step and its associated tooling maintenance, source-map configuration, and build-time dependency.' },
      { icon: 'CODE', title: 'Component-scoped styling without CSS-in-JS runtime cost', desc: 'Native nesting gives plain CSS files the same "everything about this component lives in one block" readability that styled-components or Emotion provide, but without any runtime style-injection cost or extra JavaScript bundle size — the browser parses it as ordinary CSS.' },
      { icon: 'LEARN', title: 'Teaching how nested selectors flatten to real CSS specificity', desc: 'Developers moving from Sass sometimes assume nesting changes specificity rules; this demo\'s side-by-side flattened view makes clear that nesting is purely a source-authoring convenience and that the resolved specificity and matching behavior are identical to hand-written flat selectors.' },
      { icon: 'APP', title: 'Interactive card and widget components with co-located states', desc: 'Any hoverable/focusable card, tile, or widget component — like the [Glass Card](/ui-snippets/glass-card/) pattern — benefits from nesting its hover, focus, and child-element rules together, making the component\'s full interactive behavior readable in one place instead of scattered across the stylesheet.' },
      { icon: 'FLOW', title: 'Responsive component variants without leaving the rule block', desc: 'Nesting @media queries inside the component\'s own selector keeps breakpoint-specific overrides physically next to the base styles they modify, reducing the chance that a later refactor edits the base rule but forgets a disconnected responsive override elsewhere in the file.' },
      { icon: 'DESIGN', title: 'Migrating legacy BEM-style flat CSS incrementally', desc: 'Existing flat BEM selectors like .card__icon or .card--active can be gradually rewritten using & nesting inside their parent .card block during routine maintenance, improving readability file-by-file without a wholesale rewrite or new build tooling.' },
      { icon: 'CODE', title: 'Related: Two-Column FAQ', desc: 'See the [Two-Column FAQ](/ui-snippets/faq-two-column/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Do I need Sass, PostCSS, or any build step to use CSS nesting today?', a: 'No — native CSS nesting is parsed directly by the browser in Chrome/Edge 112+, Safari 16.5+, and Firefox 117+, all released by mid-2023. You can write & inside a plain .css file with no compiler, no source maps, and no build configuration, though older browsers outside that support window will ignore the nested rules entirely.' },
      { q: 'What does the & symbol actually mean in nested CSS?', a: 'The & represents the parent selector at that point in the nest. &:hover means "this same element, in its hover state," while & .child means "a descendant matching .child inside this element" (equivalent to a plain descendant combinator when written as & .child or, in many cases, simply .child without &). You can also use & to build compound selectors like &.is-active for "this element when it also has the is-active class."' },
      { q: 'Is nested CSS the same as Sass nesting in terms of behavior?', a: 'Functionally very similar for common cases, but native CSS nesting follows the official CSS Nesting Module specification rather than the Sass language, and its resolved specificity/selector matching is identical to writing the equivalent flat CSS by hand — there is no additional specificity boost from nesting itself. Some advanced Sass features (like mixins, functions, and Maps) have no native CSS nesting equivalent and still require a preprocessor or native CSS functions/custom properties as a substitute.' },
      { q: 'Can I nest @media and other at-rules inside a selector block?', a: 'Yes — the CSS Nesting specification allows at-rules like @media, @supports, and @container to be nested directly inside a style rule, as shown in this demo\'s @media (max-width: 300px) { & .nc-title { ... } } block. This keeps a component\'s responsive overrides physically co-located with its base styles instead of requiring a separate top-level @media block elsewhere in the file.' },
      { q: 'Why does this demo always prefix nested selectors with &?', a: 'Early native-nesting syntax discussions raised ambiguity concerns about bare nested type selectors (like nesting p { } directly, which could look like a custom property or declaration to some parsers) — many browsers and style guides settled on requiring or strongly preferring an explicit leading & for nested compound and descendant selectors. Prefixing consistently with & (as this demo does throughout) avoids any such ambiguity and matches the most common real-world nesting style guide recommendation.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's CSS into an AI coding assistant like Claude and ask it to walk through exactly how each nested rule — & .nc-icon, the doubly-nested & .nc-desc { & code { ... } }, &:hover, &:focus-within, and the nested @media block — resolves to the flattened equivalent shown in the second code panel, line by line. You could also ask it to convert an existing flat stylesheet from your own project into nested form, or to explain when native nesting can and can't fully replace a Sass file (for example, Sass mixins and control-flow directives have no native CSS equivalent). It's also a good prompt for browser-support strategy: ask it to write an @supports selector(&) feature-detection block with a sensible flat-CSS fallback path.`,
      prompt: `Build an interactive HTML/CSS/JS demo teaching native CSS nesting (the & selector) using an interactive card component, with a side-by-side view of the nested source versus its flattened equivalent.

Requirements:
- A single card component styled using genuine native CSS nesting syntax (not Sass, not a preprocessor) inside one top-level .card { } rule block, including: at least one nested child-element selector using &, a nested pseudo-class state like &:hover or &:focus-within, a doubly-nested selector reaching a grandchild element, and a nested @media query block for a responsive tweak — all physically inside the same outer rule.
- The card must be genuinely interactive in the live preview: hovering and focusing it (e.g. via Tab key or click) must visibly trigger the nested &:hover / &:focus-within styles, and the nested @media block's effect must be triggerable by resizing a container (a CSS resize: horizontal wrapper around the preview is an acceptable way to let the user trigger this manually).
- Two toggleable read-only code panels (or one panel with a toggle) showing: (1) the actual nested CSS source as text, and (2) a hand-written flattened equivalent using fully-qualified flat selectors that a developer would have had to write before nesting existed — both must be accurate representations of real, valid CSS.
- Keep the flattened panel's content in sync conceptually with the nested panel — every nested rule in panel 1 must have a corresponding flat rule in panel 2, so a learner can map each nested line to its flattened counterpart.
- Use a neutral palette with one accent color and smooth CSS transitions on the card's interactive states.
- No external libraries, no build step — the nesting must be authored as literal native CSS text that a modern browser parses directly.`,
    },
  },
};

export default cssNestingPlayground;
