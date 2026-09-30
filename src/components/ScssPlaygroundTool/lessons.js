const baseHtml = `<main class="page">
  <section class="hero">
    <p class="eyebrow">SCSS Playground</p>
    <h1>Build styles faster</h1>
    <p class="lead">Edit SCSS, inspect compiled CSS, and preview the result.</p>
    <a class="button" href="#">Start lesson</a>
  </section>
  <section class="cards">
    <article class="card"><h2>Tokens</h2><p>Reusable color, spacing, and type values.</p></article>
    <article class="card"><h2>Components</h2><p>Small styles that scale across pages.</p></article>
  </section>
</main>`;

const previewHtml = {
  'scss-comments': `<main class="page">
  <article class="card">
    <h2>Public section marker</h2>
    <p>Only the block comment remains in compiled CSS. The card padding still applies.</p>
  </article>
</main>`,
  'nested-properties': `<main class="page">
  <section class="hero">
    <p class="lead">Nested font properties compile into normal font-family, font-size, and font-weight declarations.</p>
  </section>
</main>`,
  'parent-selector': `<main class="page">
  <a class="button" href="#">Primary button</a>
  <a class="button button--secondary" href="#">Secondary button</a>
</main>`,
  'use-rule': `<main class="page">
  <a class="button" href="#">Namespaced token button</a>
</main>`,
  'use-with': `<main class="page">
  <a class="button" href="#">Configured theme button</a>
</main>`,
  'mixins': `<main class="page">
  <section class="hero">
    <h1>Centered by a mixin</h1>
    <p class="lead">The mixin outputs grid centering and a minimum hero height.</p>
  </section>
</main>`,
  'mixin-args': `<main class="page">
  <a class="button" href="#">Pill button from mixin arguments</a>
</main>`,
  'content-mixin': `<main class="page">
  <section class="cards">
    <article class="card"><h2>Responsive card</h2><p>The desktop mixin turns this grid into two columns.</p></article>
    <article class="card"><h2>Second card</h2><p>Resize the preview area to see the media query.</p></article>
  </section>
</main>`,
  'functions': `<main class="page">
  <section class="hero">
    <p class="lead">The custom rem() function turns 18px into 1.125rem for this lead text.</p>
  </section>
</main>`,
  'extend': `<main class="page">
  <div class="notice">Base notice from shared declarations.</div>
  <div class="notice--success">Success notice extends the base selector and changes the border color.</div>
</main>`,
  'placeholders': `<main class="page">
  <article class="card">
    <h2>Placeholder panel</h2>
    <p>The %panel placeholder does not output until .card extends it.</p>
  </article>
</main>`,
  'sass-math': `<main class="page">
  <section class="hero">
    <h1>80% width hero</h1>
    <p class="lead">math.div() calculates this hero width from a design measurement.</p>
  </section>
</main>`,
  'sass-color': `<main class="page">
  <a class="button" href="#">Hover color from sass:color</a>
</main>`,
  'sass-map': `<main class="page">
  <section class="hero">
    <h1>Map token lookup</h1>
    <p class="lead">The hero text color comes from a Sass map.</p>
  </section>
</main>`,
  'map-get-modern': `<main class="page">
  <article class="card">
    <h2>Modern map access</h2>
    <p>map.get() pulls the large spacing token for this card padding.</p>
  </article>
</main>`,
  'lists': `<main class="page">
  <section class="hero">
    <h1>Font stack list</h1>
    <p class="lead">A Sass list stores the fallback font stack for the page.</p>
  </section>
</main>`,
  'each-loop': `<main class="page">
  <section class="cards gap-sm">
    <article class="card"><h2>gap-sm</h2><p>Small generated gap utility.</p></article>
    <article class="card"><h2>Second card</h2><p>This row uses the smallest token.</p></article>
  </section>
  <section class="cards gap-md">
    <article class="card"><h2>gap-md</h2><p>Medium generated gap utility.</p></article>
    <article class="card"><h2>Second card</h2><p>This row uses the default spacing token.</p></article>
  </section>
  <section class="cards gap-lg">
    <article class="card"><h2>gap-lg</h2><p>Generated utility class from a Sass map.</p></article>
    <article class="card"><h2>Second card</h2><p>The visible gap comes from generated CSS.</p></article>
  </section>
</main>`,
  'for-loop': `<main class="page">
  <article class="card stack-1">Stack item 1</article>
  <article class="card stack-2">Stack item 2</article>
  <article class="card stack-3">Stack item 3</article>
  <article class="card stack-4">Stack item 4</article>
</main>`,
  'if-else': `<main class="page">
  <section class="hero">
    <h1>Compile-time dark theme</h1>
    <p class="lead">The page class receives the dark branch because $theme is "dark".</p>
  </section>
</main>`,
  'interpolation': `<main class="page">
  <nav class="cards">
    <a class="card tab-active" href="#">Active tab with interpolated selector</a>
    <a class="card" href="#">Inactive tab</a>
  </nav>
</main>`,
  'design-tokens': `<main class="page">
  <section class="hero" style="border-color: var(--color-brand); border-top-width: 8px; padding: var(--space-4); border-radius: var(--radius-md);">
    <h1>Tokens emitted as CSS variables</h1>
    <p class="lead">The inline preview consumes variables generated by Sass.</p>
  </section>
</main>`,
  'css-vars': `<main class="page">
  <a class="button" href="#">Button uses runtime CSS variable</a>
</main>`,
  'themes': `<main class="page" data-theme="dark" style="background: var(--bg); color: var(--text);">
  <section class="hero" style="background: transparent; color: var(--text);">
    <h1>Dark theme scope</h1>
    <p class="lead" style="color: var(--text);">The data-theme attribute receives CSS variables emitted from the theme map.</p>
  </section>
</main>`,
  'bem': `<main class="page">
  <article class="card card--featured">
    <h2 class="card__title">BEM card title</h2>
    <p>SCSS & keeps BEM output flat and predictable.</p>
  </article>
</main>`,
  'cascade-layers': `<main class="page">
  <a class="button" href="#">Button in a cascade layer</a>
</main>`,
  'container-queries': `<main class="page">
  <article class="card">
    <div class="card__body">
      <h2>Container query card</h2>
      <p>The body changes layout when the card container is wide enough.</p>
    </div>
  </article>
</main>`,
  'media-mixin': `<main class="page">
  <section class="cards">
    <article class="card"><h2>Breakpoint mixin</h2><p>Grid columns come from the mq() mixin.</p></article>
    <article class="card"><h2>Second card</h2><p>Resize to compare mobile and desktop.</p></article>
  </section>
</main>`,
  'fluid-type': `<main class="page">
  <section class="hero">
    <h1>Fluid heading size</h1>
    <p class="lead">The heading scales with clamp() between a min and max.</p>
  </section>
</main>`,
  'utility-generation': `<main class="page">
  <article class="card p-0">
    <h2>p-0</h2>
    <p>No padding utility from the spacing map.</p>
  </article>
  <article class="card p-2">
    <h2>p-2</h2>
    <p>Small padding utility from the spacing map.</p>
  </article>
  <article class="card p-4">
    <h2>p-4</h2>
    <p>Medium padding utility from the spacing map.</p>
  </article>
  <article class="card p-6">
    <h2>Generated padding utility</h2>
    <p>The p-6 class came from a Sass loop over spacing tokens.</p>
  </article>
</main>`,
  'component-api': `<main class="page">
  <a class="button button--primary" href="#">Primary variant</a>
  <a class="button button--neutral" href="#">Neutral variant</a>
</main>`,
  'forms': `<main class="page">
  <label class="field">
    <span>Email address</span>
    <input value="hello@example.com" />
  </label>
</main>`,
  'cards-component': `<main class="page">
  <article class="card">
    <h2>Card component</h2>
    <p>This card uses a local CSS variable for padding.</p>
  </article>
</main>`,
  'folder-structure': `<main class="page">
  <a class="button" href="#">Button from organized partials</a>
</main>`,
  'avoid-deep-nesting': `<main class="page">
  <nav class="nav card">
    <div class="nav__item"><a class="nav__link" href="#">Flat BEM nav link</a></div>
  </nav>
</main>`,
  'import-migration': `<main class="page">
  <a class="button" href="#">Modern @use button</a>
</main>`,
  'linting': `<main class="page">
  <a class="button" href="#">Linted button styles</a>
</main>`,
  'mini-project': `<main class="page">
  <article class="card">
    <h2 class="card__title">Pro plan</h2>
    <p class="card__price">$29</p>
    <p>Responsive pricing card built from tokens and nested selectors.</p>
  </article>
</main>`,
  'mini-theme-system': `<main class="page" data-theme="dark" style="background: var(--bg); color: var(--text);">
  <section class="hero" style="background: transparent; color: var(--text); border-color: var(--brand);">
    <h1>Theme system</h1>
    <p class="lead" style="color: var(--text);">CSS variables make the runtime theme visible in the preview.</p>
  </section>
</main>`,
};

const L = (id, chapter, title, concept, scss, css, challenge) => ({
  id, chapter, title, concept, html: previewHtml[id] || baseHtml, scss, css, challenge,
});

export const LESSONS = [
  L('what-is-scss', 'Start Here', 'What SCSS Adds to CSS',
    'SCSS is the CSS-like syntax for Sass. It adds variables, nesting, modules, mixins, functions, loops, maps, and architecture patterns while still compiling to normal CSS.',
    `$brand: #cf649a;
$ink: #182033;

.hero {
  color: $ink;
  border-top: 4px solid $brand;
  padding: 2rem;
}`,
    `.hero {
  color: #182033;
  border-top: 4px solid #cf649a;
  padding: 2rem;
}`,
    { question: 'What does SCSS compile to?', options: ['Regular CSS', 'HTML', 'JavaScript only', 'A database query'], correct: 0 }),
  L('scss-comments', 'Start Here', 'Comments',
    '`/* ... */` comments remain in normal CSS output. `//` comments are Sass-only and disappear after compilation.',
    `// Design note: internal Sass-only comment
/* Public section marker */
.card {
  padding: 1rem; // this note is removed
}`,
    `/* Public section marker */
.card {
  padding: 1rem;
}`),
  L('variables', 'Core Syntax', 'Variables',
    'Variables store reusable values. Use them for design tokens like colors, spacing, shadows, sizes, and transition durations.',
    `$surface: #ffffff;
$border: #d8dee9;
$radius: 12px;

.card {
  background: $surface;
  border: 1px solid $border;
  border-radius: $radius;
}`,
    `.card {
  background: #ffffff;
  border: 1px solid #d8dee9;
  border-radius: 12px;
}`),
  L('default-variables', 'Core Syntax', 'Default Variables',
    '`!default` lets a variable be overridden before it is loaded. This is useful for themeable libraries and design systems.',
    `$brand: #cf649a !default;
$button-radius: 8px !default;

.button {
  background: $brand;
  border-radius: $button-radius;
}`,
    `.button {
  background: #cf649a;
  border-radius: 8px;
}`),
  L('nesting', 'Core Syntax', 'Nesting',
    'Nesting groups selectors by component. Keep nesting shallow so compiled CSS remains predictable.',
    `.card {
  padding: 1rem;

  h2 {
    margin: 0;
  }

  p {
    color: #526070;
  }
}`,
    `.card {
  padding: 1rem;
}
.card h2 {
  margin: 0;
}
.card p {
  color: #526070;
}`),
  L('parent-selector', 'Core Syntax', 'Parent Selector &',
    'The `&` parent selector refers to the current selector. Use it for states, modifiers, pseudo-classes, and BEM-style variants.',
    `.button {
  background: #cf649a;
  color: white;

  &:hover {
    background: #b84f85;
  }

  &--secondary {
    background: #334155;
  }
}`,
    `.button {
  background: #cf649a;
  color: white;
}
.button:hover {
  background: #b84f85;
}
.button--secondary {
  background: #334155;
}`),
  L('nested-properties', 'Core Syntax', 'Nested Properties',
    'Some CSS property groups can be nested. It reads nicely for font, margin, padding, border, animation, and transition groups.',
    `.lead {
  font: {
    family: system-ui, sans-serif;
    size: 1.125rem;
    weight: 500;
  }
}`,
    `.lead {
  font-family: system-ui, sans-serif;
  font-size: 1.125rem;
  font-weight: 500;
}`),
  L('partials', 'Modules', 'Partials',
    'Partial files usually start with `_`, such as `_tokens.scss`. They are not compiled alone; they are loaded by another stylesheet.',
    `// _tokens.scss
$brand: #cf649a;
$space-4: 1rem;

// app.scss
.hero {
  padding: $space-4;
  color: $brand;
}`,
    `.hero {
  padding: 1rem;
  color: #cf649a;
}`),
  L('use-rule', 'Modules', '@use',
    'Modern Sass prefers `@use` over old `@import`. `@use` loads a module once and keeps members namespaced by default.',
    `@use "tokens";

.button {
  background: tokens.$brand;
  padding: tokens.$space-3 tokens.$space-4;
}`,
    `.button {
  background: #cf649a;
  padding: 0.75rem 1rem;
}`),
  L('use-as', 'Modules', '@use with Alias',
    'Use `as` to shorten a module namespace. This keeps code clear without leaking every variable into global scope.',
    `@use "design/tokens" as t;

.card {
  border-radius: t.$radius-md;
  box-shadow: t.$shadow-sm;
}`,
    `.card {
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
}`),
  L('use-with', 'Modules', 'Configure Modules with with',
    '`@use ... with (...)` overrides variables marked `!default` inside a module. This is how reusable Sass packages expose configuration.',
    `@use "theme" with (
  $brand: #2563eb,
  $radius: 999px
);

.button {
  background: theme.$brand;
  border-radius: theme.$radius;
}`,
    `.button {
  background: #2563eb;
  border-radius: 999px;
}`),
  L('forward-rule', 'Modules', '@forward',
    '`@forward` creates a public API for many partials. A single index file can forward tokens, mixins, and functions.',
    `// _index.scss
@forward "tokens";
@forward "mixins";

// app.scss
@use "design";

.hero {
  color: design.$brand;
}`,
    `.hero {
  color: #cf649a;
}`),
  L('mixins', 'Reusable Patterns', 'Mixins',
    'Mixins output reusable blocks of CSS. Use them for declarations that appear together and need parameters.',
    `@mixin center-stack {
  display: grid;
  place-items: center;
}

.hero {
  @include center-stack;
  min-height: 320px;
}`,
    `.hero {
  display: grid;
  place-items: center;
  min-height: 320px;
}`),
  L('mixin-args', 'Reusable Patterns', 'Mixin Arguments',
    'Mixin arguments make reusable CSS flexible. Defaults keep the include call short for common cases.',
    `@mixin pill($bg, $color: white) {
  background: $bg;
  color: $color;
  border-radius: 999px;
  padding: 0.65rem 1rem;
}

.button {
  @include pill(#cf649a);
}`,
    `.button {
  background: #cf649a;
  color: white;
  border-radius: 999px;
  padding: 0.65rem 1rem;
}`),
  L('content-mixin', 'Reusable Patterns', '@content',
    '`@content` lets a mixin wrap custom rules. It is useful for media queries, themes, supports blocks, and state wrappers.',
    `@mixin desktop {
  @media (min-width: 900px) {
    @content;
  }
}

.cards {
  display: grid;

  @include desktop {
    grid-template-columns: repeat(2, 1fr);
  }
}`,
    `.cards {
  display: grid;
}
@media (min-width: 900px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}`),
  L('functions', 'Reusable Patterns', 'Custom Functions',
    'Functions return a value. Use them for token lookups, calculations, unit conversions, and controlled design decisions.',
    `@function rem($px) {
  @return calc($px / 16) * 1rem;
}

.lead {
  font-size: rem(18);
}`,
    `.lead {
  font-size: 1.125rem;
}`),
  L('extend', 'Reusable Patterns', '@extend',
    '`@extend` shares selectors instead of duplicating declarations. Use it carefully because it changes selector output.',
    `.notice {
  border-left: 4px solid #cf649a;
  padding: 1rem;
}

.notice--success {
  @extend .notice;
  border-color: #10b981;
}`,
    `.notice, .notice--success {
  border-left: 4px solid #cf649a;
  padding: 1rem;
}
.notice--success {
  border-color: #10b981;
}`),
  L('placeholders', 'Reusable Patterns', 'Placeholder Selectors',
    'Placeholder selectors start with `%` and do not compile by themselves. They are safer targets for `@extend` than normal classes.',
    `%panel {
  border: 1px solid #d8dee9;
  border-radius: 12px;
  padding: 1rem;
}

.card {
  @extend %panel;
}`,
    `.card {
  border: 1px solid #d8dee9;
  border-radius: 12px;
  padding: 1rem;
}`),
  L('sass-math', 'Built-in Modules', 'Math Module',
    'Modern Sass uses modules like `sass:math`. Prefer `math.div()` over slash division so your code matches modern Sass behavior.',
    `@use "sass:math";

.hero {
  width: math.div(960px, 1200px) * 100%;
}`,
    `.hero {
  width: 80%;
}`),
  L('sass-color', 'Built-in Modules', 'Color Module',
    'The `sass:color` module gives explicit color transformations. Prefer modern functions over old global helpers.',
    `@use "sass:color";

$brand: #cf649a;

.button:hover {
  background: color.scale($brand, $lightness: -15%);
}`,
    `.button:hover {
  background: #b84f85;
}`),
  L('sass-map', 'Data Structures', 'Maps',
    'Maps store named values. They are ideal for design tokens like colors, breakpoints, z-index layers, and spacing scales.',
    `$colors: (
  "brand": #cf649a,
  "ink": #182033,
  "muted": #64748b
);

.hero {
  color: map-get($colors, "ink");
}`,
    `.hero {
  color: #182033;
}`),
  L('map-get-modern', 'Data Structures', 'Modern Map Access',
    'Modern Sass code can use the `sass:map` module for clear, namespaced map functions.',
    `@use "sass:map";

$space: (
  "sm": 0.5rem,
  "md": 1rem,
  "lg": 1.5rem
);

.card {
  padding: map.get($space, "lg");
}`,
    `.card {
  padding: 1.5rem;
}`),
  L('lists', 'Data Structures', 'Lists',
    'Lists hold ordered values. Use them for shadows, font stacks, transition groups, and repeated output.',
    `$font-stack: ui-sans-serif, system-ui, sans-serif;

.page {
  font-family: $font-stack;
}`,
    `.page {
  font-family: ui-sans-serif, system-ui, sans-serif;
}`),
  L('each-loop', 'Control Flow', '@each Loop',
    '`@each` generates classes from a list or map. Use it for controlled utility classes and token-driven variants.',
    `$sizes: (
  "sm": 0.75rem,
  "md": 1rem,
  "lg": 1.5rem
);

@each $name, $size in $sizes {
  .gap-#{$name} {
    gap: $size;
  }
}`,
    `.gap-sm {
  gap: 0.75rem;
}
.gap-md {
  gap: 1rem;
}
.gap-lg {
  gap: 1.5rem;
}`),
  L('for-loop', 'Control Flow', '@for Loop',
    '`@for` loops are useful for numeric scales. Keep generated CSS small and intentional.',
    `@for $i from 1 through 4 {
  .stack-#{$i} {
    margin-top: $i * 0.25rem;
  }
}`,
    `.stack-1 {
  margin-top: 0.25rem;
}
.stack-2 {
  margin-top: 0.5rem;
}
.stack-3 {
  margin-top: 0.75rem;
}
.stack-4 {
  margin-top: 1rem;
}`),
  L('if-else', 'Control Flow', '@if and @else',
    '`@if` lets Sass choose output at compile time. Use it inside mixins and functions for explicit variants.',
    `$theme: "dark";

.page {
  @if $theme == "dark" {
    background: #0f172a;
    color: white;
  } @else {
    background: white;
    color: #0f172a;
  }
}`,
    `.page {
  background: #0f172a;
  color: white;
}`),
  L('interpolation', 'Control Flow', 'Interpolation',
    'Interpolation `#{}` injects Sass values into selectors, property names, strings, and custom property names.',
    `$state: "active";

.tab-#{$state} {
  border-color: #cf649a;
}`,
    `.tab-active {
  border-color: #cf649a;
}`),
  L('design-tokens', 'Modern Architecture', 'Design Tokens',
    'Use Sass maps to author token systems, then emit CSS custom properties for runtime theming.',
    `$tokens: (
  "color-brand": #cf649a,
  "space-4": 1rem,
  "radius-md": 12px
);

:root {
  @each $name, $value in $tokens {
    --#{$name}: #{$value};
  }
}`,
    `:root {
  --color-brand: #cf649a;
  --space-4: 1rem;
  --radius-md: 12px;
}`),
  L('css-vars', 'Modern Architecture', 'Sass + CSS Variables',
    'Sass variables are compile-time. CSS custom properties are runtime. Combining both gives structure and theme flexibility.',
    `$brand: #cf649a;

:root {
  --brand: #{$brand};
}

.button {
  background: var(--brand);
}`,
    `:root {
  --brand: #cf649a;
}
.button {
  background: var(--brand);
}`),
  L('themes', 'Modern Architecture', 'Theme Maps',
    'Theme maps keep light and dark values together and can emit scoped CSS variables for each theme.',
    `$themes: (
  light: (bg: #ffffff, text: #182033),
  dark: (bg: #0f172a, text: #f8fafc)
);

[data-theme="dark"] {
  --bg: #0f172a;
  --text: #f8fafc;
}`,
    `[data-theme="dark"] {
  --bg: #0f172a;
  --text: #f8fafc;
}`),
  L('bem', 'Modern Architecture', 'BEM with &',
    'SCSS works well with BEM when `&` is used for modifiers and elements. Keep selectors flat in the compiled CSS.',
    `.card {
  &__title {
    font-size: 1.125rem;
  }

  &--featured {
    border-color: #cf649a;
  }
}`,
    `.card__title {
  font-size: 1.125rem;
}
.card--featured {
  border-color: #cf649a;
}`),
  L('cascade-layers', 'Modern CSS', 'Cascade Layers',
    'SCSS can organize modern CSS features like `@layer`. Layers make override order intentional.',
    `@layer reset, base, components;

@layer components {
  .button {
    background: #cf649a;
    color: white;
  }
}`,
    `@layer reset, base, components;
@layer components {
  .button {
    background: #cf649a;
    color: white;
  }
}`),
  L('container-queries', 'Modern CSS', 'Container Queries',
    'SCSS can wrap modern CSS such as container queries. Use mixins if the same breakpoint repeats across components.',
    `.card {
  container-type: inline-size;

  @container (min-width: 420px) {
    .card__body {
      display: grid;
      grid-template-columns: 1fr 2fr;
    }
  }
}`,
    `.card {
  container-type: inline-size;
}
@container (min-width: 420px) {
  .card .card__body {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}`),
  L('media-mixin', 'Responsive SCSS', 'Breakpoint Mixin',
    'Centralize breakpoints in a map and read them through a mixin. This keeps responsive decisions consistent.',
    `$breakpoints: (
  md: 768px,
  lg: 1024px
);

@mixin mq($key) {
  @media (min-width: map-get($breakpoints, $key)) {
    @content;
  }
}

.cards {
  @include mq(md) {
    grid-template-columns: repeat(2, 1fr);
  }
}`,
    `@media (min-width: 768px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}`),
  L('fluid-type', 'Responsive SCSS', 'Fluid Type',
    'SCSS can package modern CSS like `clamp()` into reusable functions or tokens.',
    `$step-2: clamp(1.5rem, 1rem + 2vw, 3rem);

.hero h1 {
  font-size: $step-2;
  line-height: 1.05;
}`,
    `.hero h1 {
  font-size: clamp(1.5rem, 1rem + 2vw, 3rem);
  line-height: 1.05;
}`),
  L('utility-generation', 'Responsive SCSS', 'Generate Utilities',
    'Generated utilities are useful when they are token-driven and limited. Avoid generating thousands of classes without a reason.',
    `$spacing: (0: 0, 2: .5rem, 4: 1rem, 6: 1.5rem);

@each $key, $value in $spacing {
  .p-#{$key} { padding: $value; }
}`,
    `.p-0 {
  padding: 0;
}
.p-2 {
  padding: 0.5rem;
}
.p-4 {
  padding: 1rem;
}
.p-6 {
  padding: 1.5rem;
}`),
  L('component-api', 'Component Patterns', 'Component API',
    'A good SCSS component exposes a small API: base class, variants, sizes, and state selectors.',
    `$variants: (
  primary: #cf649a,
  neutral: #334155
);

@each $name, $color in $variants {
  .button--#{$name} {
    background: $color;
    color: white;
  }
}`,
    `.button--primary {
  background: #cf649a;
  color: white;
}
.button--neutral {
  background: #334155;
  color: white;
}`),
  L('forms', 'Component Patterns', 'Form Styles',
    'Form styles often combine variables, nesting, states, and accessible focus rings.',
    `$focus: #2563eb;

.field {
  display: grid;
  gap: .375rem;

  input:focus-visible {
    outline: 3px solid rgba($focus, .25);
    border-color: $focus;
  }
}`,
    `.field {
  display: grid;
  gap: 0.375rem;
}
.field input:focus-visible {
  outline: 3px solid rgba(37, 99, 235, 0.25);
  border-color: #2563eb;
}`),
  L('cards-component', 'Component Patterns', 'Card Component',
    'SCSS is strongest when it helps component CSS stay consistent and readable.',
    `.card {
  --card-pad: 1rem;
  padding: var(--card-pad);
  border: 1px solid #d8dee9;
  border-radius: 12px;

  &:has(img) {
    --card-pad: 0;
  }
}`,
    `.card {
  --card-pad: 1rem;
  padding: var(--card-pad);
  border: 1px solid #d8dee9;
  border-radius: 12px;
}
.card:has(img) {
  --card-pad: 0;
}`),
  L('folder-structure', 'Architecture', 'Folder Structure',
    'Large Sass projects usually separate settings, tools, generic styles, elements, objects, components, and utilities.',
    `// styles/
// 01-settings/_tokens.scss
// 02-tools/_mixins.scss
// 03-elements/_headings.scss
// 04-components/_button.scss
// app.scss
@use "01-settings/tokens";
@use "04-components/button";

.button {
  background: tokens.$brand;
  border-radius: tokens.$radius-md;
}`,
    `.button {
  background: #cf649a;
  border-radius: 12px;
}`),
  L('avoid-deep-nesting', 'Architecture', 'Avoid Deep Nesting',
    'Deep nesting creates overly specific selectors. Prefer flat component selectors and use `&` only when it improves clarity.',
    `.nav {
  &__item { color: #334155; }
  &__link { color: #2563eb; }
  &__link:hover { text-decoration: underline; }
}`,
    `.nav__item {
  color: #334155;
}
.nav__link {
  color: #2563eb;
}
.nav__link:hover {
  text-decoration: underline;
}`),
  L('import-migration', 'Architecture', 'Migrate from @import',
    'Old Sass projects often use `@import`. Modern Sass uses `@use` and `@forward` for clearer module boundaries.',
    `// Old
// @import "tokens";
// @import "buttons";

// Modern
@use "tokens";
@use "buttons";

.button {
  color: tokens.$button-text;
  background: tokens.$brand;
}`,
    `.button {
  color: #ffffff;
  background: #cf649a;
}`),
  L('linting', 'Architecture', 'Formatting and Linting',
    'Production SCSS should be formatted and linted. Stylelint plus a Sass-aware config catches invalid patterns before review.',
    `// package scripts example
// "lint:styles": "stylelint src/**/*.scss"

.button {
  color: white;
  background: #cf649a;
}`,
    `.button {
  color: white;
  background: #cf649a;
}`),
  L('mini-project', 'Mini Projects', 'Pricing Card',
    'Combine tokens, nesting, states, and responsive rules into a realistic component.',
    `$brand: #cf649a;
$ink: #182033;

.card {
  padding: clamp(1rem, 2vw, 2rem);
  border: 1px solid #d8dee9;
  border-radius: 16px;

  &__title { color: $ink; }
  &__price { color: $brand; font-size: 2rem; }

  @media (min-width: 720px) {
    max-width: 420px;
  }
}`,
    `.card {
  padding: clamp(1rem, 2vw, 2rem);
  border: 1px solid #d8dee9;
  border-radius: 16px;
}
.card__title {
  color: #182033;
}
.card__price {
  color: #cf649a;
  font-size: 2rem;
}
@media (min-width: 720px) {
  .card {
    max-width: 420px;
  }
}`),
  L('mini-theme-system', 'Mini Projects', 'Theme System',
    'A small theme system can use Sass maps to emit CSS variables and runtime theme scopes.',
    `$light: (bg: #ffffff, text: #182033, brand: #cf649a);
$dark: (bg: #0f172a, text: #f8fafc, brand: #f472b6);

:root {
  --bg: #ffffff;
  --text: #182033;
  --brand: #cf649a;
}

[data-theme="dark"] {
  --bg: #0f172a;
  --text: #f8fafc;
  --brand: #f472b6;
}`,
    `:root {
  --bg: #ffffff;
  --text: #182033;
  --brand: #cf649a;
}
[data-theme="dark"] {
  --bg: #0f172a;
  --text: #f8fafc;
  --brand: #f472b6;
}`),
];

export const CHAPTERS = [...new Set(LESSONS.map(lesson => lesson.chapter))];
