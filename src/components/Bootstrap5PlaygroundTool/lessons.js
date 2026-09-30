export const CHAPTERS = [
  'Getting Started',
  'Grid System',
  'Typography',
  'Colors & Borders',
  'Tables',
  'Images',
  'Alerts & Badges',
  'Buttons',
  'Cards',
  'Navigation',
  'Forms',
  'Components',
  'Overlays',
  'Carousel',
  'Utilities',
];

export const LESSONS = [

  // ── Chapter 1: Getting Started ───────────────────────────────────────────────
  {
    id: 'bs-intro',
    chapter: 'Getting Started',
    title: 'Hello Bootstrap',
    concept: '**Bootstrap** is the world\'s most popular CSS framework for building responsive, mobile-first websites. Add it via a single `<link>` CDN tag — no build tools needed. You instantly get a polished design system: utility classes, components, a grid, and interactive widgets. In this playground Bootstrap 5.3 is pre-loaded in every preview.',
    code: `<div class="text-center py-4">
  <h1 class="display-4 fw-bold text-primary">Hello, Bootstrap! 🎉</h1>
  <p class="lead text-muted">The world's most popular CSS framework — no setup needed.</p>
  <a href="#" class="btn btn-primary btn-lg me-2">Get Started</a>
  <a href="#" class="btn btn-outline-secondary btn-lg">Learn More</a>
</div>

<div class="row g-3 mt-2">
  <div class="col-md-4">
    <div class="p-3 border rounded text-center h-100">
      <div class="fs-1 mb-2">📱</div>
      <h6 class="fw-bold">Mobile First</h6>
      <p class="text-muted small mb-0">Designed for phones, scales up to desktop.</p>
    </div>
  </div>
  <div class="col-md-4">
    <div class="p-3 border rounded text-center h-100">
      <div class="fs-1 mb-2">🎨</div>
      <h6 class="fw-bold">Pre-styled</h6>
      <p class="text-muted small mb-0">Buttons, forms, navbars — ready to use.</p>
    </div>
  </div>
  <div class="col-md-4">
    <div class="p-3 border rounded text-center h-100">
      <div class="fs-1 mb-2">⚡</div>
      <h6 class="fw-bold">Interactive</h6>
      <p class="text-muted small mb-0">Modals, dropdowns, accordions — no JS needed.</p>
    </div>
  </div>
</div>`,
  },

  {
    id: 'bs-containers',
    chapter: 'Getting Started',
    title: 'Containers',
    concept: 'Containers are the basic layout building block. `.container` gives a responsive fixed-max-width centered box that snaps at each breakpoint. `.container-fluid` is always 100% wide. `.container-{breakpoint}` (sm/md/lg/xl/xxl) is fluid below the breakpoint and fixed above it. Always place `.row`s inside a container.',
    code: `<div class="container bg-primary-subtle border border-primary rounded p-3 mb-3">
  <strong>.container</strong> — fixed max-width, centered, responsive breakpoints
</div>
<div class="container-fluid bg-success-subtle border border-success rounded p-3 mb-3">
  <strong>.container-fluid</strong> — full viewport width at all sizes
</div>
<div class="container-sm bg-warning-subtle border border-warning rounded p-3 mb-3">
  <strong>.container-sm</strong> — fluid below 576px, fixed above
</div>
<div class="container-md bg-danger-subtle border border-danger rounded p-3 mb-3">
  <strong>.container-md</strong> — fluid below 768px, fixed above
</div>
<p class="text-muted small">Resize the preview pane to see container-sm/md switch between fluid and fixed.</p>`,
  },

  {
    id: 'bs-breakpoints',
    chapter: 'Getting Started',
    title: 'Breakpoints',
    concept: 'Bootstrap\'s six **breakpoints** are the foundation of responsive design. The class infix (sm, md, lg, xl, xxl) sets the minimum width at which the rule applies. Classes without an infix apply to all screen sizes (xs and up). Breakpoint-aware classes follow the pattern `.{class}-{infix}` — e.g. `col-md-6` or `d-lg-none`.',
    code: `<table class="table table-bordered table-sm mb-4">
  <thead class="table-dark">
    <tr><th>Infix</th><th>Breakpoint</th><th>Min-width</th></tr>
  </thead>
  <tbody>
    <tr><td><em>(none)</em></td><td>xs — Extra small</td><td>&lt; 576px</td></tr>
    <tr><td>sm</td><td>Small</td><td>≥ 576px</td></tr>
    <tr><td>md</td><td>Medium</td><td>≥ 768px</td></tr>
    <tr><td>lg</td><td>Large</td><td>≥ 992px</td></tr>
    <tr><td>xl</td><td>Extra large</td><td>≥ 1200px</td></tr>
    <tr><td>xxl</td><td>Extra extra large</td><td>≥ 1400px</td></tr>
  </tbody>
</table>

<p class="text-muted small mb-2">Resize the preview pane to see columns reflow:</p>
<div class="row g-2 text-center">
  <div class="col-12 col-sm-6 col-lg-3"><div class="p-2 bg-primary text-white rounded small">12 / sm-6 / lg-3</div></div>
  <div class="col-12 col-sm-6 col-lg-3"><div class="p-2 bg-success text-white rounded small">12 / sm-6 / lg-3</div></div>
  <div class="col-12 col-sm-6 col-lg-3"><div class="p-2 bg-warning rounded small">12 / sm-6 / lg-3</div></div>
  <div class="col-12 col-sm-6 col-lg-3"><div class="p-2 bg-danger text-white rounded small">12 / sm-6 / lg-3</div></div>
</div>`,
  },

  // ── Chapter 2: Grid System ────────────────────────────────────────────────────
  {
    id: 'bs-grid',
    chapter: 'Grid System',
    title: 'Grid Basics',
    concept: 'Bootstrap\'s grid uses a 12-column **flexbox** layout. Wrap columns in a `.row` and use `.col` classes inside. Plain `.col` divides available space equally. Numbered classes like `.col-6` take exactly that many of the 12 columns. Columns in the same row always sum to 12 (or wrap to the next line). Use `.g-{n}` on the row for gutters.',
    challenge: {
      question: 'How many columns does Bootstrap\'s grid system have by default?',
      options: ['10', '12', '16', '24'],
      correct: 1,
    },
    code: `<div class="row g-2 mb-3">
  <div class="col"><div class="p-2 bg-primary text-white rounded text-center small">col</div></div>
  <div class="col"><div class="p-2 bg-primary text-white rounded text-center small">col</div></div>
  <div class="col"><div class="p-2 bg-primary text-white rounded text-center small">col</div></div>
</div>
<div class="row g-2 mb-3">
  <div class="col-6"><div class="p-2 bg-success text-white rounded text-center small">col-6</div></div>
  <div class="col-6"><div class="p-2 bg-success text-white rounded text-center small">col-6</div></div>
</div>
<div class="row g-2 mb-3">
  <div class="col-4"><div class="p-2 bg-warning rounded text-center small">col-4</div></div>
  <div class="col-8"><div class="p-2 bg-warning rounded text-center small">col-8</div></div>
</div>
<div class="row g-2">
  <div class="col-3"><div class="p-2 bg-danger text-white rounded text-center small">col-3</div></div>
  <div class="col-6"><div class="p-2 bg-danger text-white rounded text-center small">col-6</div></div>
  <div class="col-3"><div class="p-2 bg-danger text-white rounded text-center small">col-3</div></div>
</div>`,
  },

  {
    id: 'bs-grid-responsive',
    chapter: 'Grid System',
    title: 'Responsive Grid',
    concept: 'Stack breakpoint suffixes to create **responsive column layouts**. `col-12 col-md-8` means full-width on mobile, 8/12 columns on medium screens and up. The `row-cols-{n}` shorthand sets how many columns appear per row — e.g. `row-cols-1 row-cols-sm-2 row-cols-lg-3` creates a 1→2→3 column card grid.',
    code: `<h6>Blog layout — stacked on mobile, sidebar on md+</h6>
<div class="row g-3 mb-4">
  <div class="col-12 col-md-8">
    <div class="p-3 bg-primary-subtle border rounded h-100">
      <strong>Main content</strong> (col-12 / col-md-8)
    </div>
  </div>
  <div class="col-12 col-md-4">
    <div class="p-3 bg-secondary-subtle border rounded h-100">
      <strong>Sidebar</strong> (col-12 / col-md-4)
    </div>
  </div>
</div>

<h6>Card grid — 1 → 2 → 3 columns</h6>
<div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-2">
  <div class="col"><div class="p-3 bg-success-subtle border rounded">Card 1</div></div>
  <div class="col"><div class="p-3 bg-success-subtle border rounded">Card 2</div></div>
  <div class="col"><div class="p-3 bg-success-subtle border rounded">Card 3</div></div>
  <div class="col"><div class="p-3 bg-success-subtle border rounded">Card 4</div></div>
  <div class="col"><div class="p-3 bg-success-subtle border rounded">Card 5</div></div>
  <div class="col"><div class="p-3 bg-success-subtle border rounded">Card 6</div></div>
</div>`,
  },

  {
    id: 'bs-grid-offset',
    chapter: 'Grid System',
    title: 'Offset & Order',
    concept: '`offset-{n}` pushes a column right by that many columns — useful for centering or indenting content. `order-{n}` changes the **visual** order of columns without changing the DOM order — great for swapping elements between mobile and desktop layouts.',
    code: `<h6>Offset — push columns right</h6>
<div class="row g-2 mb-4">
  <div class="col-4"><div class="p-2 bg-primary text-white rounded text-center small">col-4</div></div>
  <div class="col-4 offset-4"><div class="p-2 bg-primary text-white rounded text-center small">col-4 offset-4</div></div>
</div>
<div class="row g-2 mb-4">
  <div class="col-3 offset-3"><div class="p-2 bg-success text-white rounded text-center small">col-3 offset-3</div></div>
  <div class="col-3 offset-3"><div class="p-2 bg-success text-white rounded text-center small">col-3 offset-3</div></div>
</div>

<h6>Order — resequence columns visually</h6>
<div class="row g-2">
  <div class="col order-3"><div class="p-2 bg-warning rounded text-center small">1st in DOM<br><code>order-3</code></div></div>
  <div class="col order-1"><div class="p-2 bg-danger text-white rounded text-center small">2nd in DOM<br><code>order-1</code></div></div>
  <div class="col order-2"><div class="p-2 bg-info text-white rounded text-center small">3rd in DOM<br><code>order-2</code></div></div>
</div>
<p class="text-muted small mt-2">Visual order: Danger → Info → Warning (despite DOM order)</p>`,
  },

  // ── Chapter 3: Typography ─────────────────────────────────────────────────────
  {
    id: 'bs-headings',
    chapter: 'Typography',
    title: 'Headings & Display',
    concept: 'Bootstrap inherits heading styles from the browser and adds `.display-{1-6}` for large hero text. `.lead` makes a paragraph stand out. Use `.h1`–`.h6` classes on non-heading elements to apply heading styles without changing semantics.',
    code: `<h1>h1. Bootstrap heading</h1>
<h2>h2. Bootstrap heading</h2>
<h3>h3. Bootstrap heading</h3>
<h4>h4. Bootstrap heading</h4>
<h5>h5. Bootstrap heading</h5>
<h6>h6. Bootstrap heading</h6>

<hr>
<p class="display-1 fw-bold">Display 1</p>
<p class="display-3">Display 3</p>
<p class="display-5">Display 5</p>

<hr>
<p class="lead">This is a lead paragraph. It stands out from regular paragraphs using <code>.lead</code>.</p>
<p>Regular paragraph for comparison. <strong>Bold</strong>, <em>italic</em>, and <small>small</small> work as expected.</p>
<p class="text-muted">Muted helper text using <code>.text-muted</code>.</p>`,
  },

  {
    id: 'bs-text',
    chapter: 'Typography',
    title: 'Text Utilities',
    concept: 'Bootstrap provides utility classes for **text alignment** (`.text-start`, `.text-center`, `.text-end`), **font weight** (`.fw-bold`, `.fw-normal`, `.fw-light`), **style** (`.fst-italic`), **decoration** (`.text-decoration-underline`), and **transform** (`.text-uppercase`, `.text-capitalize`). These can all be combined with breakpoint infixes.',
    code: `<p class="text-start">Text aligned left (.text-start)</p>
<p class="text-center">Text aligned center (.text-center)</p>
<p class="text-end">Text aligned right (.text-end)</p>

<hr>
<p class="fw-bold">Bold text (.fw-bold)</p>
<p class="fw-semibold">Semibold text (.fw-semibold)</p>
<p class="fw-normal">Normal weight (.fw-normal)</p>
<p class="fst-italic">Italic text (.fst-italic)</p>
<p class="text-decoration-underline">Underlined (.text-decoration-underline)</p>
<p class="text-decoration-line-through">Strikethrough (.text-decoration-line-through)</p>

<hr>
<p class="text-uppercase">Uppercase (.text-uppercase)</p>
<p class="text-lowercase">LOWERCASE (.text-lowercase)</p>
<p class="text-capitalize">capitalize each word (.text-capitalize)</p>

<hr>
<p>Inline elements: <code>inline code</code>, <kbd>Ctrl+C</kbd>, <mark>highlighted text</mark>, <del>deleted</del>, <ins>inserted</ins></p>`,
  },

  {
    id: 'bs-lists',
    chapter: 'Typography',
    title: 'Lists & Blockquotes',
    concept: '`.list-unstyled` removes bullets and left padding from a list. `.list-inline` with `.list-inline-item` places items side by side. Blockquotes use the `<blockquote class="blockquote">` element with an optional `<figcaption class="blockquote-footer">`. Description lists use `.row` with `.col-sm-{n}` for a two-column layout.',
    code: `<div class="row g-3">
  <div class="col-md-6">
    <h6>Unstyled list</h6>
    <ul class="list-unstyled mb-3">
      <li>Item one</li>
      <li>Item two</li>
      <li>Item three</li>
    </ul>

    <h6>Inline list</h6>
    <ul class="list-inline mb-3">
      <li class="list-inline-item">Home</li>
      <li class="list-inline-item">·</li>
      <li class="list-inline-item">About</li>
      <li class="list-inline-item">·</li>
      <li class="list-inline-item">Contact</li>
    </ul>

    <h6>Description list</h6>
    <dl class="row">
      <dt class="col-sm-4">HTML</dt>
      <dd class="col-sm-8">HyperText Markup Language</dd>
      <dt class="col-sm-4">CSS</dt>
      <dd class="col-sm-8">Cascading Style Sheets</dd>
      <dt class="col-sm-4">JS</dt>
      <dd class="col-sm-8">JavaScript</dd>
    </dl>
  </div>
  <div class="col-md-6">
    <h6>Blockquote</h6>
    <figure>
      <blockquote class="blockquote">
        <p>The only way to do great work is to love what you do.</p>
      </blockquote>
      <figcaption class="blockquote-footer">
        Steve Jobs, <cite>Stanford Commencement 2005</cite>
      </figcaption>
    </figure>

    <h6>Right-aligned caption</h6>
    <figure class="text-end">
      <blockquote class="blockquote">
        <p>Simplicity is the ultimate sophistication.</p>
      </blockquote>
      <figcaption class="blockquote-footer">Leonardo da Vinci</figcaption>
    </figure>
  </div>
</div>`,
  },

  // ── Chapter 4: Colors & Borders ──────────────────────────────────────────────
  {
    id: 'bs-colors',
    chapter: 'Colors & Borders',
    title: 'Color Utilities',
    concept: 'Bootstrap provides **text color** classes (`text-primary`, `text-success`, etc.) and **background** classes (`bg-primary`, `bg-success`, etc.) for all eight contextual colors. Bootstrap 5.3 adds **subtle** variants (`bg-primary-subtle`, `text-primary-emphasis`) that adapt automatically to light and dark mode via CSS variables.',
    code: `<h6>Text colors</h6>
<div class="mb-3">
  <span class="text-primary me-3">text-primary</span>
  <span class="text-success me-3">text-success</span>
  <span class="text-danger me-3">text-danger</span>
  <span class="text-warning me-3">text-warning</span>
  <span class="text-info me-3">text-info</span>
  <span class="text-muted">text-muted</span>
</div>

<h6>Background badges</h6>
<div class="d-flex flex-wrap gap-2 mb-3">
  <span class="badge bg-primary p-2">primary</span>
  <span class="badge bg-secondary p-2">secondary</span>
  <span class="badge bg-success p-2">success</span>
  <span class="badge bg-danger p-2">danger</span>
  <span class="badge bg-warning text-dark p-2">warning</span>
  <span class="badge bg-info text-dark p-2">info</span>
  <span class="badge bg-dark p-2">dark</span>
  <span class="badge bg-light text-dark p-2">light</span>
</div>

<h6>Subtle backgrounds (Bootstrap 5.3+)</h6>
<div class="row g-2">
  <div class="col"><div class="p-2 bg-primary-subtle text-primary-emphasis rounded text-center small">primary-subtle</div></div>
  <div class="col"><div class="p-2 bg-success-subtle text-success-emphasis rounded text-center small">success-subtle</div></div>
  <div class="col"><div class="p-2 bg-danger-subtle text-danger-emphasis rounded text-center small">danger-subtle</div></div>
  <div class="col"><div class="p-2 bg-warning-subtle text-warning-emphasis rounded text-center small">warning-subtle</div></div>
</div>`,
  },

  {
    id: 'bs-borders',
    chapter: 'Colors & Borders',
    title: 'Borders & Rounded',
    concept: 'Add or remove borders with `.border` and `.border-{side}`. Color borders with `.border-{color}`. Control corner radius with `.rounded`, `.rounded-circle`, `.rounded-pill`, and numbered sizes `.rounded-1` through `.rounded-5`. Use `.border-{n}` (1–5) to control border thickness.',
    code: `<h6>Border utilities</h6>
<div class="d-flex flex-wrap gap-3 mb-4">
  <div class="border p-3 small">border</div>
  <div class="border-top p-3 small">border-top</div>
  <div class="border-end p-3 small">border-end</div>
  <div class="border-bottom p-3 small">border-bottom</div>
  <div class="border-start p-3 small">border-start</div>
  <div class="border-0 bg-secondary-subtle p-3 small">border-0</div>
</div>

<h6>Border colors</h6>
<div class="d-flex flex-wrap gap-3 mb-4">
  <div class="border border-primary p-2 small">primary</div>
  <div class="border border-success p-2 small">success</div>
  <div class="border border-danger p-2 small">danger</div>
  <div class="border border-warning p-2 small">warning</div>
  <div class="border border-info p-2 small">info</div>
</div>

<h6>Rounded corners</h6>
<div class="d-flex flex-wrap gap-3">
  <div class="border rounded p-3 small">rounded</div>
  <div class="border rounded-top p-3 small">rounded-top</div>
  <div class="border rounded-circle p-3 small" style="width:70px;height:70px;display:flex;align-items:center;justify-content:center">circle</div>
  <div class="border rounded-pill px-4 p-2 small">pill</div>
  <div class="border rounded-0 p-3 small">rounded-0</div>
  <div class="border rounded-4 p-3 small">rounded-4</div>
</div>`,
  },

  // ── Chapter 5: Tables ─────────────────────────────────────────────────────────
  {
    id: 'bs-tables',
    chapter: 'Tables',
    title: 'Tables',
    concept: 'Add `.table` to a `<table>` element to apply Bootstrap\'s table styles. Combine with `.table-striped` (alternating row shading), `.table-hover` (row highlight on hover), and `.table-bordered` (borders on all cells). Use `.table-dark` on the `<thead>` or the whole table for dark headers.',
    code: `<table class="table">
  <thead>
    <tr><th>#</th><th>Name</th><th>Role</th><th>Status</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>Alice Johnson</td><td>Designer</td><td><span class="badge bg-success">Active</span></td></tr>
    <tr><td>2</td><td>Bob Smith</td><td>Developer</td><td><span class="badge bg-success">Active</span></td></tr>
    <tr><td>3</td><td>Carol White</td><td>Manager</td><td><span class="badge bg-warning text-dark">On Leave</span></td></tr>
    <tr><td>4</td><td>Dan Brown</td><td>Analyst</td><td><span class="badge bg-danger">Inactive</span></td></tr>
  </tbody>
</table>

<h6>Striped + Hover + Bordered</h6>
<table class="table table-striped table-hover table-bordered">
  <thead class="table-dark">
    <tr><th>Product</th><th>Price</th><th>Stock</th></tr>
  </thead>
  <tbody>
    <tr><td>Widget A</td><td>$29.99</td><td>142</td></tr>
    <tr><td>Widget B</td><td>$49.99</td><td>58</td></tr>
    <tr><td>Widget C</td><td>$19.99</td><td>0</td></tr>
  </tbody>
</table>`,
  },

  {
    id: 'bs-tables-variants',
    chapter: 'Tables',
    title: 'Table Variants & Responsive',
    concept: 'Apply contextual color classes to `<tr>` elements to highlight rows: `.table-success`, `.table-danger`, etc. Wrap the `<table>` in `.table-responsive` to make it horizontally scrollable on small screens. `.table-sm` reduces cell padding for compact tables.',
    code: `<h6>Contextual row colors</h6>
<table class="table table-bordered mb-4">
  <thead><tr><th>Class</th><th>Use case</th></tr></thead>
  <tbody>
    <tr class="table-primary"><td>table-primary</td><td>Selected or highlighted</td></tr>
    <tr class="table-success"><td>table-success</td><td>Positive / completed</td></tr>
    <tr class="table-danger"><td>table-danger</td><td>Error / failed</td></tr>
    <tr class="table-warning"><td>table-warning</td><td>Warning / pending</td></tr>
    <tr class="table-info"><td>table-info</td><td>Informational</td></tr>
    <tr class="table-secondary"><td>table-secondary</td><td>Secondary / inactive</td></tr>
    <tr class="table-light"><td>table-light</td><td>Light background</td></tr>
    <tr class="table-dark"><td>table-dark</td><td>Dark background</td></tr>
  </tbody>
</table>

<h6>Responsive table (scroll on small screens)</h6>
<div class="table-responsive">
  <table class="table table-sm table-striped" style="min-width:600px">
    <thead class="table-info">
      <tr><th>Col 1</th><th>Col 2</th><th>Col 3</th><th>Col 4</th><th>Col 5</th><th>Col 6</th></tr>
    </thead>
    <tbody>
      <tr><td>Alpha</td><td>Beta</td><td>Gamma</td><td>Delta</td><td>Epsilon</td><td>Zeta</td></tr>
      <tr><td>Eta</td><td>Theta</td><td>Iota</td><td>Kappa</td><td>Lambda</td><td>Mu</td></tr>
    </tbody>
  </table>
</div>`,
  },

  // ── Chapter 6: Images ─────────────────────────────────────────────────────────
  {
    id: 'bs-images',
    chapter: 'Images',
    title: 'Images',
    concept: '`.img-fluid` makes images scale with their parent container (`max-width: 100%`). Shape classes `.rounded`, `.rounded-circle`, and `.img-thumbnail` (adds a border and padding) style the image. Float images with `.float-start` / `.float-end` and use `.clearfix` on the parent to prevent layout collapse.',
    code: `<h6>Responsive image — .img-fluid</h6>
<img src="https://picsum.photos/600/200?random=1" class="img-fluid rounded mb-4" alt="Responsive">

<h6>Shape classes</h6>
<div class="d-flex gap-3 flex-wrap mb-4">
  <img src="https://picsum.photos/100?random=2" class="rounded" alt="rounded" width="100">
  <img src="https://picsum.photos/100?random=3" class="rounded-circle" alt="circle" width="100">
  <img src="https://picsum.photos/100?random=4" class="img-thumbnail" alt="thumbnail" width="100">
</div>

<h6>Float alignment</h6>
<div class="clearfix">
  <img src="https://picsum.photos/120/80?random=5" class="float-start me-3 mb-2 rounded" alt="">
  <p>Images can be floated using Bootstrap's float utilities. <code>.float-start</code> floats left, <code>.float-end</code> floats right. Always wrap the parent in <code>.clearfix</code> to prevent layout collapse when the floated image is taller than the text.</p>
</div>`,
  },

  {
    id: 'bs-figures',
    chapter: 'Images',
    title: 'Figures & Aspect Ratios',
    concept: 'The `<figure>` element with `.figure` groups an image with its caption. Use `.figure-img` on the image and `.figure-caption` on the caption. Apply `.text-end` or `.text-center` to the `<figure>` to align the caption. `.ratio` with `.ratio-16x9`, `.ratio-4x3`, or `.ratio-1x1` enforces aspect ratios on embedded content.',
    code: `<div class="row g-3 mb-4">
  <div class="col-md-6">
    <figure class="figure">
      <img src="https://picsum.photos/400/260?random=10" class="figure-img img-fluid rounded" alt="">
      <figcaption class="figure-caption">Left-aligned caption (default).</figcaption>
    </figure>
  </div>
  <div class="col-md-6">
    <figure class="figure text-end">
      <img src="https://picsum.photos/400/260?random=11" class="figure-img img-fluid rounded" alt="">
      <figcaption class="figure-caption">Right-aligned caption.</figcaption>
    </figure>
  </div>
</div>

<h6>Aspect ratio boxes</h6>
<div class="row g-3">
  <div class="col-4">
    <div class="ratio ratio-16x9 bg-primary rounded">
      <div class="d-flex align-items-center justify-content-center text-white small fw-bold">16:9</div>
    </div>
  </div>
  <div class="col-4">
    <div class="ratio ratio-4x3 bg-success rounded">
      <div class="d-flex align-items-center justify-content-center text-white small fw-bold">4:3</div>
    </div>
  </div>
  <div class="col-4">
    <div class="ratio ratio-1x1 bg-warning rounded">
      <div class="d-flex align-items-center justify-content-center small fw-bold">1:1</div>
    </div>
  </div>
</div>`,
  },

  // ── Chapter 7: Alerts & Badges ────────────────────────────────────────────────
  {
    id: 'bs-alerts',
    chapter: 'Alerts & Badges',
    title: 'Alerts',
    concept: 'Alerts are created with `.alert .alert-{color}`. Include `role="alert"` for accessibility so screen readers announce the message. Use `.alert-heading` on a child heading and `.alert-link` on links inside alerts to maintain consistent styling. Bootstrap provides eight contextual variants.',
    challenge: {
      question: 'Which role attribute should every Bootstrap alert have?',
      options: ['role="dialog"', 'role="alert"', 'role="status"', 'role="banner"'],
      correct: 1,
    },
    code: `<div class="alert alert-primary" role="alert"><strong>Primary:</strong> A simple primary alert — check it out!</div>
<div class="alert alert-secondary" role="alert">Secondary alert.</div>
<div class="alert alert-success" role="alert"><strong>Success!</strong> Your profile was updated.</div>
<div class="alert alert-danger" role="alert"><strong>Error!</strong> Something went wrong. Please try again.</div>
<div class="alert alert-warning" role="alert"><strong>Warning:</strong> Your session expires in 5 minutes.</div>
<div class="alert alert-info" role="alert"><strong>Info:</strong> A new version is available. <a href="#" class="alert-link">See what's new</a>.</div>
<div class="alert alert-dark" role="alert">Dark alert.</div>
<div class="alert alert-light" role="alert">Light alert.</div>`,
  },

  {
    id: 'bs-alerts-dismiss',
    chapter: 'Alerts & Badges',
    title: 'Dismissible Alerts',
    concept: 'Add `.alert-dismissible .fade .show` and a `<button class="btn-close" data-bs-dismiss="alert">` to make an alert dismissible. The `.fade .show` classes add a smooth fade-out animation when dismissed. No JavaScript code is needed — Bootstrap\'s JS bundle handles it automatically via the `data-bs-dismiss` attribute.',
    code: `<div class="alert alert-warning alert-dismissible fade show" role="alert">
  <strong>Heads up!</strong> You should check in on some of those fields below.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>

<div class="alert alert-success alert-dismissible fade show" role="alert">
  ✅ <strong>File saved successfully!</strong> <a href="#" class="alert-link">View details</a>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>

<div class="alert alert-danger alert-dismissible fade show" role="alert">
  <h5 class="alert-heading">Upload failed!</h5>
  <p>The file exceeds the maximum allowed size of 10MB.</p>
  <hr>
  <p class="mb-0">Please compress the file and try again. <a href="#" class="alert-link">Learn more</a>.</p>
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`,
  },

  {
    id: 'bs-badges',
    chapter: 'Alerts & Badges',
    title: 'Badges',
    concept: 'Badges scale to match the text of their parent element. Use `.badge .text-bg-{color}` (Bootstrap 5.2+) for proper foreground/background contrast in both light and dark modes. Add `.rounded-pill` for pill-shaped badges. Place badges inside buttons or headings to show counts.',
    code: `<h6>Inline badges in headings</h6>
<h2>Messages <span class="badge text-bg-primary">4</span></h2>
<h4>Alerts <span class="badge text-bg-danger">99+</span></h4>
<h6>Updates <span class="badge text-bg-secondary">New</span></h6>

<hr>
<h6>Button badges</h6>
<div class="d-flex gap-2 flex-wrap mb-4">
  <button type="button" class="btn btn-primary">
    Inbox <span class="badge text-bg-danger">5</span>
  </button>
  <button type="button" class="btn btn-outline-secondary">
    Notifications <span class="badge text-bg-primary">12</span>
  </button>
</div>

<h6>Pill badges</h6>
<div class="d-flex gap-2 flex-wrap">
  <span class="badge rounded-pill text-bg-primary">Primary</span>
  <span class="badge rounded-pill text-bg-secondary">Secondary</span>
  <span class="badge rounded-pill text-bg-success">Success</span>
  <span class="badge rounded-pill text-bg-danger">Danger</span>
  <span class="badge rounded-pill text-bg-warning">Warning</span>
  <span class="badge rounded-pill text-bg-info">Info</span>
  <span class="badge rounded-pill text-bg-dark">Dark</span>
  <span class="badge rounded-pill text-bg-light">Light</span>
</div>`,
  },

  // ── Chapter 8: Buttons ────────────────────────────────────────────────────────
  {
    id: 'bs-buttons',
    chapter: 'Buttons',
    title: 'Button Styles',
    concept: 'Bootstrap buttons use `.btn .btn-{color}`. The `<button>`, `<a>`, and `<input>` elements can all be styled as buttons. Add `disabled` attribute or `.disabled` class to disable. Use `aria-pressed="true"` on active toggle buttons. For navigation links styled as buttons, use `<a>` with `role="button"`.',
    challenge: {
      question: 'Which element should be used for a navigation link styled as a button?',
      options: ['<button>', '<input type="submit">', '<a> with role="button"', '<div class="btn">'],
      correct: 2,
    },
    code: `<h6>Filled buttons</h6>
<div class="d-flex flex-wrap gap-2 mb-3">
  <button type="button" class="btn btn-primary">Primary</button>
  <button type="button" class="btn btn-secondary">Secondary</button>
  <button type="button" class="btn btn-success">Success</button>
  <button type="button" class="btn btn-danger">Danger</button>
  <button type="button" class="btn btn-warning">Warning</button>
  <button type="button" class="btn btn-info">Info</button>
  <button type="button" class="btn btn-light">Light</button>
  <button type="button" class="btn btn-dark">Dark</button>
  <button type="button" class="btn btn-link">Link</button>
</div>

<h6>States</h6>
<div class="d-flex flex-wrap gap-2">
  <button type="button" class="btn btn-primary active" aria-pressed="true">Active</button>
  <button type="button" class="btn btn-primary" disabled>Disabled</button>
  <a href="#" class="btn btn-success" role="button">Link as button</a>
</div>`,
  },

  {
    id: 'bs-buttons-size',
    chapter: 'Buttons',
    title: 'Sizes & Outline',
    concept: 'Use `.btn-lg` and `.btn-sm` to change button size. Outline buttons (`.btn-outline-{color}`) have a transparent background and a colored border — ideal for secondary actions or buttons on colored backgrounds. `.w-100` makes a button full-width.',
    code: `<h6>Sizes</h6>
<div class="d-flex align-items-center gap-3 flex-wrap mb-4">
  <button type="button" class="btn btn-primary btn-lg">Large (.btn-lg)</button>
  <button type="button" class="btn btn-primary">Default</button>
  <button type="button" class="btn btn-primary btn-sm">Small (.btn-sm)</button>
</div>

<h6>Outline buttons</h6>
<div class="d-flex flex-wrap gap-2 mb-4">
  <button type="button" class="btn btn-outline-primary">Primary</button>
  <button type="button" class="btn btn-outline-secondary">Secondary</button>
  <button type="button" class="btn btn-outline-success">Success</button>
  <button type="button" class="btn btn-outline-danger">Danger</button>
  <button type="button" class="btn btn-outline-warning">Warning</button>
  <button type="button" class="btn btn-outline-info">Info</button>
  <button type="button" class="btn btn-outline-dark">Dark</button>
</div>

<h6>Full-width button</h6>
<button type="button" class="btn btn-success w-100">Full width (.w-100)</button>`,
  },

  {
    id: 'bs-button-groups',
    chapter: 'Buttons',
    title: 'Button Groups',
    concept: '`.btn-group` wraps buttons into a connected group (merged borders). `.btn-toolbar` combines multiple groups into a toolbar. `.btn-group-vertical` stacks buttons. Use `role="group"` and `role="toolbar"` for accessibility. Button groups support the same size modifiers as individual buttons.',
    code: `<h6>Basic group</h6>
<div class="btn-group mb-3" role="group">
  <button type="button" class="btn btn-primary">Left</button>
  <button type="button" class="btn btn-primary">Middle</button>
  <button type="button" class="btn btn-primary">Right</button>
</div>

<h6>Outlined group with active state</h6>
<div class="btn-group mb-3" role="group">
  <button type="button" class="btn btn-outline-danger">Bold</button>
  <button type="button" class="btn btn-outline-danger active">Italic</button>
  <button type="button" class="btn btn-outline-danger">Underline</button>
</div>

<h6>Toolbar</h6>
<div class="btn-toolbar mb-4" role="toolbar">
  <div class="btn-group me-2" role="group">
    <button type="button" class="btn btn-outline-secondary btn-sm">1</button>
    <button type="button" class="btn btn-outline-secondary btn-sm">2</button>
    <button type="button" class="btn btn-outline-secondary btn-sm">3</button>
  </div>
  <div class="btn-group me-2" role="group">
    <button type="button" class="btn btn-outline-secondary btn-sm">4</button>
    <button type="button" class="btn btn-outline-secondary btn-sm">5</button>
  </div>
  <div class="btn-group" role="group">
    <button type="button" class="btn btn-outline-secondary btn-sm">6</button>
  </div>
</div>

<h6>Vertical group</h6>
<div class="btn-group-vertical" role="group">
  <button type="button" class="btn btn-primary">Top</button>
  <button type="button" class="btn btn-primary">Middle</button>
  <button type="button" class="btn btn-primary">Bottom</button>
</div>`,
  },

  // ── Chapter 9: Cards ──────────────────────────────────────────────────────────
  {
    id: 'bs-cards',
    chapter: 'Cards',
    title: 'Basic Cards',
    concept: 'Cards are flexible content containers with a border and optional padding. A card consists of `.card > .card-body`. Add `.card-title`, `.card-subtitle`, `.card-text`, and `.card-link` inside. Optionally add `.card-header` and `.card-footer` for top/bottom labels.',
    code: `<div class="row g-3">
  <div class="col-md-4">
    <div class="card h-100">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
        <p class="card-text">Some quick example text to build on the card title.</p>
        <a href="#" class="card-link">Card link</a>
        <a href="#" class="card-link">Another link</a>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card h-100">
      <div class="card-header">Featured</div>
      <div class="card-body">
        <h5 class="card-title">Special title</h5>
        <p class="card-text">With supporting text as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary btn-sm">Go somewhere</a>
      </div>
      <div class="card-footer text-muted">2 days ago</div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card h-100 text-center">
      <div class="card-body">
        <h5 class="card-title">Centered card</h5>
        <p class="card-text">Cards support any mix of content and components.</p>
        <a href="#" class="btn btn-success btn-sm">Action</a>
      </div>
    </div>
  </div>
</div>`,
  },

  {
    id: 'bs-cards-media',
    chapter: 'Cards',
    title: 'Cards with Media',
    concept: '`.card-img-top` and `.card-img-bottom` attach images to the top or bottom of a card. `.card-img-overlay` positions text over a full-bleed image inside a `text-bg-dark` card. For **horizontal cards**, use a `.row.g-0` inside the card with an image column and a content column.',
    code: `<div class="row g-3 mb-3">
  <div class="col-md-4">
    <div class="card">
      <img src="https://picsum.photos/400/200?random=20" class="card-img-top" alt="">
      <div class="card-body">
        <h5 class="card-title">Image top</h5>
        <p class="card-text">Image cap at the top of the card.</p>
        <a href="#" class="btn btn-primary btn-sm">Read More</a>
      </div>
    </div>
  </div>
  <div class="col-md-4">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Image bottom</h5>
        <p class="card-text">Image cap at the bottom of the card.</p>
      </div>
      <img src="https://picsum.photos/400/200?random=21" class="card-img-bottom" alt="">
    </div>
  </div>
  <div class="col-md-4">
    <div class="card text-bg-dark" style="max-height:175px;overflow:hidden">
      <img src="https://picsum.photos/400/200?random=22" class="card-img" alt="">
      <div class="card-img-overlay">
        <h5 class="card-title">Overlay</h5>
        <p class="card-text small">Text overlaid on image.</p>
      </div>
    </div>
  </div>
</div>

<h6>Horizontal card</h6>
<div class="card" style="max-width:480px">
  <div class="row g-0">
    <div class="col-4">
      <img src="https://picsum.photos/200/150?random=23" class="img-fluid rounded-start h-100 object-fit-cover" alt="">
    </div>
    <div class="col-8">
      <div class="card-body">
        <h5 class="card-title">Horizontal card</h5>
        <p class="card-text small">Image left, content right.</p>
        <small class="text-muted">Last updated 3 mins ago</small>
      </div>
    </div>
  </div>
</div>`,
  },

  {
    id: 'bs-cards-grid',
    chapter: 'Cards',
    title: 'Card Grid',
    concept: 'Use `row-cols-{breakpoint}-{n}` on the `.row` to create a card grid where all cards share equal height. Apply `.h-100` to each `.card` to stretch them to fill their column. This ensures the footer of each card aligns even when content length varies.',
    code: `<div class="row row-cols-1 row-cols-md-3 g-3">
  <div class="col">
    <div class="card h-100">
      <img src="https://picsum.photos/400/200?random=30" class="card-img-top" alt="">
      <div class="card-body">
        <h5 class="card-title">Mountains</h5>
        <p class="card-text">A breathtaking view of alpine peaks. The h-100 class makes all cards the same height regardless of content length.</p>
      </div>
      <div class="card-footer"><small class="text-muted">Photography</small></div>
    </div>
  </div>
  <div class="col">
    <div class="card h-100">
      <img src="https://picsum.photos/400/200?random=31" class="card-img-top" alt="">
      <div class="card-body">
        <h5 class="card-title">Forest</h5>
        <p class="card-text">Dense woodland in early autumn.</p>
      </div>
      <div class="card-footer"><small class="text-muted">Nature</small></div>
    </div>
  </div>
  <div class="col">
    <div class="card h-100">
      <img src="https://picsum.photos/400/200?random=32" class="card-img-top" alt="">
      <div class="card-body">
        <h5 class="card-title">Ocean</h5>
        <p class="card-text">Waves rolling in at sunset on a warm evening.</p>
      </div>
      <div class="card-footer"><small class="text-muted">Seascape</small></div>
    </div>
  </div>
</div>`,
  },

  // ── Chapter 10: Navigation ────────────────────────────────────────────────────
  {
    id: 'bs-nav',
    chapter: 'Navigation',
    title: 'Nav & Pills',
    concept: '`.nav` is the base navigation component. Add `.nav-pills` for pill-shaped active states. `.nav-fill` or `.nav-justified` make items expand to fill the available width. `.flex-column` turns the nav vertical. Mark the current page with `.active` and disable items with `.disabled`.',
    code: `<h6>Basic nav</h6>
<ul class="nav mb-3">
  <li class="nav-item"><a class="nav-link active" href="#">Active</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
  <li class="nav-item"><a class="nav-link disabled">Disabled</a></li>
</ul>

<h6>Pills</h6>
<ul class="nav nav-pills mb-3">
  <li class="nav-item"><a class="nav-link active" href="#">Active</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
</ul>

<h6>Fill</h6>
<ul class="nav nav-pills nav-fill mb-4">
  <li class="nav-item"><a class="nav-link active" href="#">Active</a></li>
  <li class="nav-item"><a class="nav-link" href="#">A longer link</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Link</a></li>
  <li class="nav-item"><a class="nav-link disabled">Disabled</a></li>
</ul>

<h6>Vertical pills</h6>
<div class="d-flex gap-3">
  <ul class="nav flex-column nav-pills">
    <li class="nav-item"><a class="nav-link active" href="#">Dashboard</a></li>
    <li class="nav-item"><a class="nav-link" href="#">Profile</a></li>
    <li class="nav-item"><a class="nav-link" href="#">Settings</a></li>
  </ul>
  <div class="p-3 border rounded flex-grow-1">
    Select a nav item to switch views.
  </div>
</div>`,
  },

  {
    id: 'bs-nav-tabs',
    chapter: 'Navigation',
    title: 'Tabs',
    concept: 'Interactive tabs use `.nav-tabs` with `data-bs-toggle="tab"` and `data-bs-target="#id"` on each button, paired with `.tab-content > .tab-pane` divs. The active pane has both `.show` and `.active` classes. The `.fade` class adds a transition. No custom JavaScript is needed.',
    code: `<ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item" role="presentation">
    <button class="nav-link active" data-bs-toggle="tab" data-bs-target="#tab-home" type="button" role="tab">Home</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-profile" type="button" role="tab">Profile</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" data-bs-toggle="tab" data-bs-target="#tab-contact" type="button" role="tab">Contact</button>
  </li>
  <li class="nav-item" role="presentation">
    <button class="nav-link" type="button" role="tab" disabled>Disabled</button>
  </li>
</ul>
<div class="tab-content border border-top-0 p-3 rounded-bottom">
  <div class="tab-pane fade show active" id="tab-home" role="tabpanel">
    <h5>Home</h5>
    <p>This is the <strong>Home</strong> tab content. Tabs are interactive — Bootstrap JS bundle handles everything via <code>data-bs-toggle="tab"</code>.</p>
  </div>
  <div class="tab-pane fade" id="tab-profile" role="tabpanel">
    <h5>Profile</h5>
    <p>User profile information would go here.</p>
  </div>
  <div class="tab-pane fade" id="tab-contact" role="tabpanel">
    <h5>Contact</h5>
    <p>Contact form or information would go here.</p>
  </div>
</div>`,
  },

  {
    id: 'bs-navbar',
    chapter: 'Navigation',
    title: 'Navbar',
    concept: '`.navbar .navbar-expand-{breakpoint}` creates a responsive navbar that collapses into a hamburger menu below the chosen breakpoint. The toggler button uses `data-bs-toggle="collapse"` with `data-bs-target` pointing to the collapsible content. Use `.navbar-dark` on dark backgrounds.',
    challenge: {
      question: 'Which class makes a navbar collapse into a hamburger menu on mobile?',
      options: ['navbar-collapse', 'navbar-expand-lg', 'navbar-toggler', 'navbar-responsive'],
      correct: 1,
    },
    code: `<nav class="navbar navbar-expand-lg bg-body-tertiary rounded mb-3">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">MyApp</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav me-auto">
        <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Features</a></li>
        <li class="nav-item"><a class="nav-link" href="#">Pricing</a></li>
        <li class="nav-item"><a class="nav-link disabled">Docs</a></li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

<nav class="navbar bg-dark rounded" data-bs-theme="dark">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Dark Navbar</a>
    <div class="d-flex gap-2">
      <button class="btn btn-outline-light btn-sm">Login</button>
      <button class="btn btn-primary btn-sm">Sign up</button>
    </div>
  </div>
</nav>`,
  },

  {
    id: 'bs-pagination',
    chapter: 'Navigation',
    title: 'Pagination & Breadcrumb',
    concept: 'Pagination uses a `<nav>` with `<ul class="pagination">` containing `.page-item` and `.page-link` elements. Disable items with `.disabled`, mark the current page with `.active`. Size with `.pagination-lg` or `.pagination-sm`. Breadcrumbs use `<nav><ol class="breadcrumb">` with `.breadcrumb-item` and `.active` on the current page.',
    code: `<h6>Pagination</h6>
<nav aria-label="Page navigation">
  <ul class="pagination mb-3">
    <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
    <li class="page-item active"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item"><a class="page-link" href="#">Next</a></li>
  </ul>
</nav>

<h6>Sizes</h6>
<nav><ul class="pagination pagination-lg mb-2">
  <li class="page-item active"><a class="page-link" href="#">1</a></li>
  <li class="page-item"><a class="page-link" href="#">2</a></li>
  <li class="page-item"><a class="page-link" href="#">3</a></li>
</ul></nav>
<nav><ul class="pagination pagination-sm mb-4">
  <li class="page-item active"><a class="page-link" href="#">1</a></li>
  <li class="page-item"><a class="page-link" href="#">2</a></li>
  <li class="page-item"><a class="page-link" href="#">3</a></li>
</ul></nav>

<h6>Breadcrumb</h6>
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item"><a href="#">Library</a></li>
    <li class="breadcrumb-item active">Data</li>
  </ol>
</nav>
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Products</a></li>
    <li class="breadcrumb-item"><a href="#">Electronics</a></li>
    <li class="breadcrumb-item active">iPhone 15</li>
  </ol>
</nav>`,
  },

  // ── Chapter 11: Forms ─────────────────────────────────────────────────────────
  {
    id: 'bs-forms',
    chapter: 'Forms',
    title: 'Form Controls',
    concept: 'Bootstrap form controls use `.form-control` on `<input>`, `<textarea>`, and `<select>`. Pair with `.form-label` and wrap in `.mb-3` for spacing. Add `.form-text` below an input for helper text. Size inputs with `.form-control-lg` and `.form-control-sm`. Use `readonly` and `disabled` HTML attributes as needed.',
    code: `<form>
  <div class="mb-3">
    <label for="emailInput" class="form-label">Email address</label>
    <input type="email" class="form-control" id="emailInput" placeholder="name@example.com">
    <div class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="passwordInput" class="form-label">Password</label>
    <input type="password" class="form-control" id="passwordInput">
  </div>
  <div class="mb-3">
    <label for="bioTextarea" class="form-label">Bio</label>
    <textarea class="form-control" id="bioTextarea" rows="3" placeholder="Tell us about yourself..."></textarea>
  </div>
  <div class="mb-3">
    <label class="form-label">Input sizes</label>
    <input type="text" class="form-control form-control-lg mb-2" placeholder="Large (.form-control-lg)">
    <input type="text" class="form-control mb-2" placeholder="Default">
    <input type="text" class="form-control form-control-sm" placeholder="Small (.form-control-sm)">
  </div>
  <div class="mb-3">
    <label class="form-label">Special states</label>
    <input type="text" class="form-control mb-2" value="Readonly input" readonly>
    <input type="text" class="form-control" placeholder="Disabled input" disabled>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>`,
  },

  {
    id: 'bs-forms-select',
    chapter: 'Forms',
    title: 'Select, Range & Color',
    concept: '`.form-select` styles `<select>` elements. Add `multiple` for multi-select. Range inputs use `.form-range`. Color pickers use `.form-control.form-control-color` which renders a color swatch. All these controls respect the same size modifiers (`.form-select-sm`, `.form-select-lg`) as text inputs.',
    code: `<form>
  <div class="mb-3">
    <label for="exampleSelect" class="form-label">Single select</label>
    <select class="form-select" id="exampleSelect">
      <option selected>Choose a framework</option>
      <option>Bootstrap</option>
      <option>Tailwind CSS</option>
      <option>Bulma</option>
    </select>
  </div>

  <div class="mb-3">
    <label for="multiSelect" class="form-label">Multiple select (hold Ctrl/Cmd to pick many)</label>
    <select class="form-select" id="multiSelect" multiple size="4">
      <option>JavaScript</option>
      <option>Python</option>
      <option>Rust</option>
      <option>Go</option>
    </select>
  </div>

  <div class="mb-3">
    <label for="exampleRange" class="form-label">Range — <span id="rangeVal">50</span></label>
    <input type="range" class="form-range" min="0" max="100" value="50" id="exampleRange"
      oninput="document.getElementById('rangeVal').textContent = this.value">
  </div>

  <div class="mb-3">
    <label for="colorPicker" class="form-label">Color picker</label>
    <input type="color" class="form-control form-control-color" id="colorPicker" value="#6f42c1" title="Choose a color">
  </div>
</form>`,
  },

  {
    id: 'bs-forms-check',
    chapter: 'Forms',
    title: 'Checkboxes & Switches',
    concept: 'Checkboxes and radios use `.form-check > .form-check-input + .form-check-label`. Switches add `.form-switch` to the wrapper. All three work with `checked` and `disabled` HTML attributes. Add `.form-check-inline` to place items side by side in a horizontal row.',
    code: `<h6>Checkboxes</h6>
<div class="mb-3">
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="check1" checked>
    <label class="form-check-label" for="check1">Default checkbox (checked)</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="check2">
    <label class="form-check-label" for="check2">Unchecked checkbox</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="checkbox" id="check3" disabled>
    <label class="form-check-label" for="check3">Disabled checkbox</label>
  </div>
</div>

<h6>Radio buttons</h6>
<div class="mb-3">
  <div class="form-check">
    <input class="form-check-input" type="radio" name="radios" id="radio1" checked>
    <label class="form-check-label" for="radio1">Option 1 (selected)</label>
  </div>
  <div class="form-check">
    <input class="form-check-input" type="radio" name="radios" id="radio2">
    <label class="form-check-label" for="radio2">Option 2</label>
  </div>
</div>

<h6>Switches</h6>
<div class="form-check form-switch mb-2">
  <input class="form-check-input" type="checkbox" id="switch1" checked>
  <label class="form-check-label" for="switch1">Enable notifications</label>
</div>
<div class="form-check form-switch mb-3">
  <input class="form-check-input" type="checkbox" id="switch2">
  <label class="form-check-label" for="switch2">Dark mode</label>
</div>

<h6>Inline checks</h6>
<div>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="inline1" checked>
    <label class="form-check-label" for="inline1">JavaScript</label>
  </div>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="inline2">
    <label class="form-check-label" for="inline2">Python</label>
  </div>
  <div class="form-check form-check-inline">
    <input class="form-check-input" type="checkbox" id="inline3">
    <label class="form-check-label" for="inline3">Rust</label>
  </div>
</div>`,
  },

  {
    id: 'bs-input-group',
    chapter: 'Forms',
    title: 'Input Groups',
    concept: '`.input-group` attaches addons (text, buttons, or dropdowns) before or after inputs. `.input-group-text` wraps static text addons. Size the whole group with `.input-group-sm` or `.input-group-lg`. Multiple addons can be stacked on either side.',
    code: `<h6>Text addons</h6>
<div class="input-group mb-3">
  <span class="input-group-text">@</span>
  <input type="text" class="form-control" placeholder="Username">
</div>
<div class="input-group mb-3">
  <input type="text" class="form-control" placeholder="Amount">
  <span class="input-group-text">.00</span>
</div>
<div class="input-group mb-4">
  <span class="input-group-text">$</span>
  <input type="text" class="form-control" placeholder="Amount">
  <span class="input-group-text">.00</span>
</div>

<h6>With buttons</h6>
<div class="input-group mb-4">
  <button class="btn btn-outline-secondary" type="button">Button</button>
  <input type="text" class="form-control" placeholder="Search…">
  <button class="btn btn-primary" type="button">Go</button>
</div>

<h6>Sizes</h6>
<div class="input-group input-group-lg mb-2">
  <span class="input-group-text">@</span>
  <input type="text" class="form-control" placeholder="Large">
</div>
<div class="input-group input-group-sm">
  <span class="input-group-text">@</span>
  <input type="text" class="form-control" placeholder="Small">
</div>`,
  },

  {
    id: 'bs-floating-labels',
    chapter: 'Forms',
    title: 'Floating Labels',
    concept: '**Floating labels** animate from the placeholder position up to above the input when focused or typed in. Wrap a `.form-control` (or `.form-select`) and a `<label>` inside `.form-floating`. The input **must** have a `placeholder` attribute (even an empty one) for the float animation to trigger. Textareas work too but need an explicit inline `height`.',
    code: `<form>
  <div class="form-floating mb-3">
    <input type="email" class="form-control" id="floatEmail" placeholder="name@example.com">
    <label for="floatEmail">Email address</label>
  </div>

  <div class="form-floating mb-3">
    <input type="password" class="form-control" id="floatPass" placeholder="Password">
    <label for="floatPass">Password</label>
  </div>

  <div class="form-floating mb-3">
    <input type="text" class="form-control" id="floatDisabled" placeholder="Disabled" value="Prefilled value" disabled>
    <label for="floatDisabled">Disabled input</label>
  </div>

  <div class="form-floating mb-3">
    <select class="form-select" id="floatSelect">
      <option value="" disabled selected></option>
      <option>Bootstrap</option>
      <option>Tailwind CSS</option>
      <option>Bulma</option>
    </select>
    <label for="floatSelect">Pick a framework</label>
  </div>

  <div class="form-floating mb-3">
    <textarea class="form-control" id="floatTextarea" placeholder="Leave a comment" style="height:100px"></textarea>
    <label for="floatTextarea">Comments</label>
  </div>

  <button type="submit" class="btn btn-primary">Submit</button>
</form>`,
  },

  {
    id: 'bs-forms-validation',
    chapter: 'Forms',
    title: 'Form Validation',
    concept: 'Bootstrap uses the browser\'s native Constraint Validation API. Add `novalidate` to the `<form>` to suppress native UI, then add `.was-validated` via JavaScript after submission to reveal Bootstrap\'s custom feedback. `.valid-feedback` and `.invalid-feedback` elements appear based on the input\'s validity state.',
    challenge: {
      question: 'Which class is added to the <form> element to trigger Bootstrap validation styles?',
      options: ['.validated', '.was-validated', '.needs-validation', '.form-validated'],
      correct: 1,
    },
    code: `<form class="needs-validation" novalidate id="demoForm">
  <div class="row g-3 mb-3">
    <div class="col-md-6">
      <label for="firstName" class="form-label">First name</label>
      <input type="text" class="form-control" id="firstName" required>
      <div class="valid-feedback">Looks good!</div>
      <div class="invalid-feedback">Please enter your first name.</div>
    </div>
    <div class="col-md-6">
      <label for="lastName" class="form-label">Last name</label>
      <input type="text" class="form-control" id="lastName" required>
      <div class="valid-feedback">Looks good!</div>
      <div class="invalid-feedback">Please enter your last name.</div>
    </div>
  </div>
  <div class="mb-3">
    <label for="emailVal" class="form-label">Email</label>
    <input type="email" class="form-control" id="emailVal" required>
    <div class="invalid-feedback">Please provide a valid email address.</div>
  </div>
  <div class="form-check mb-3">
    <input class="form-check-input" type="checkbox" id="agreeCheck" required>
    <label class="form-check-label" for="agreeCheck">Agree to terms and conditions</label>
    <div class="invalid-feedback">You must agree before submitting.</div>
  </div>
  <button class="btn btn-primary" type="submit">Submit form</button>
</form>

<script>
(function() {
  var form = document.getElementById('demoForm');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    e.stopPropagation();
    form.classList.add('was-validated');
    if (form.checkValidity()) alert('Form submitted successfully!');
  });
})();
</script>`,
  },

  // ── Chapter 12: Components ────────────────────────────────────────────────────
  {
    id: 'bs-progress',
    chapter: 'Components',
    title: 'Progress Bars',
    concept: 'Progress bars use `.progress > .progress-bar` with an inline `style="width: X%"`. Add `.progress-bar-striped` for a striped texture and `.progress-bar-animated` to animate the stripes. Stack multiple `.progress-bar` divs inside one `.progress` for segmented bars. Control height via inline `style="height: Xpx"` on the `.progress` wrapper.',
    code: `<h6>Basic bars</h6>
<div class="progress mb-2" style="height:20px">
  <div class="progress-bar" style="width:25%">25%</div>
</div>
<div class="progress mb-2" style="height:20px">
  <div class="progress-bar bg-success" style="width:50%">50%</div>
</div>
<div class="progress mb-2" style="height:20px">
  <div class="progress-bar bg-warning text-dark" style="width:75%">75%</div>
</div>
<div class="progress mb-4" style="height:20px">
  <div class="progress-bar bg-danger" style="width:100%">100%</div>
</div>

<h6>Striped & Animated</h6>
<div class="progress mb-2">
  <div class="progress-bar progress-bar-striped" style="width:40%">40%</div>
</div>
<div class="progress mb-4">
  <div class="progress-bar progress-bar-striped progress-bar-animated bg-info" style="width:65%">Uploading…</div>
</div>

<h6>Stacked bars</h6>
<div class="progress mb-4">
  <div class="progress-bar bg-success" style="width:30%" title="HTML 30%">HTML 30%</div>
  <div class="progress-bar bg-warning text-dark" style="width:20%" title="CSS 20%">CSS 20%</div>
  <div class="progress-bar bg-danger" style="width:15%" title="JS 15%">JS 15%</div>
</div>

<h6>Height variants</h6>
<div class="progress mb-1" style="height:4px"><div class="progress-bar" style="width:60%"></div></div>
<div class="progress mb-1" style="height:10px"><div class="progress-bar bg-success" style="width:60%"></div></div>
<div class="progress" style="height:24px"><div class="progress-bar bg-danger" style="width:60%">60%</div></div>`,
  },

  {
    id: 'bs-spinners',
    chapter: 'Components',
    title: 'Spinners',
    concept: 'Bootstrap provides two spinner types: `.spinner-border` (a rotating ring) and `.spinner-grow` (a pulsing circle). Both support contextual color classes and size modifiers (`.spinner-border-sm`). Always include a `.visually-hidden` span with "Loading..." for screen reader accessibility. Place a spinner inside a button to indicate a loading state.',
    code: `<h6>Border spinners</h6>
<div class="d-flex gap-3 mb-4">
  <div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>
  <div class="spinner-border text-success" role="status"><span class="visually-hidden">Loading...</span></div>
  <div class="spinner-border text-danger" role="status"><span class="visually-hidden">Loading...</span></div>
  <div class="spinner-border text-warning" role="status"><span class="visually-hidden">Loading...</span></div>
  <div class="spinner-border text-info" role="status"><span class="visually-hidden">Loading...</span></div>
</div>

<h6>Growing spinners</h6>
<div class="d-flex gap-3 mb-4">
  <div class="spinner-grow text-primary" role="status"><span class="visually-hidden">Loading...</span></div>
  <div class="spinner-grow text-success" role="status"><span class="visually-hidden">Loading...</span></div>
  <div class="spinner-grow text-danger" role="status"><span class="visually-hidden">Loading...</span></div>
  <div class="spinner-grow text-warning" role="status"><span class="visually-hidden">Loading...</span></div>
</div>

<h6>Sizes</h6>
<div class="d-flex gap-3 align-items-center mb-4">
  <div class="spinner-border spinner-border-sm" role="status"></div>
  <div class="spinner-border" role="status"></div>
  <div class="spinner-grow spinner-grow-sm text-success" role="status"></div>
  <div class="spinner-grow text-success" role="status"></div>
</div>

<h6>Button with spinner</h6>
<div class="d-flex gap-2">
  <button class="btn btn-primary" type="button" disabled>
    <span class="spinner-border spinner-border-sm me-2" role="status"></span>Saving…
  </button>
  <button class="btn btn-secondary" type="button" disabled>
    <span class="spinner-grow spinner-grow-sm me-2" role="status"></span>Loading
  </button>
</div>`,
  },

  {
    id: 'bs-list-group',
    chapter: 'Components',
    title: 'List Groups',
    concept: 'List groups display a series of content. Use `<ul class="list-group">` with `<li class="list-group-item">`. Make items interactive with `.list-group-item-action` on `<a>` or `<button>` elements. `.list-group-flush` removes outer borders. Contextual classes like `.list-group-item-success` apply color. Use flexbox to add badges.',
    code: `<div class="row g-3">
  <div class="col-md-6">
    <h6>Basic with badges</h6>
    <ul class="list-group mb-3">
      <li class="list-group-item active">Active item</li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Inbox <span class="badge text-bg-primary rounded-pill">14</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Ads <span class="badge text-bg-secondary rounded-pill">2</span>
      </li>
      <li class="list-group-item d-flex justify-content-between align-items-center">
        Junk <span class="badge text-bg-danger rounded-pill">99+</span>
      </li>
      <li class="list-group-item disabled">Disabled item</li>
    </ul>

    <h6>Contextual colors</h6>
    <ul class="list-group">
      <li class="list-group-item list-group-item-success">Success</li>
      <li class="list-group-item list-group-item-danger">Danger</li>
      <li class="list-group-item list-group-item-warning">Warning</li>
      <li class="list-group-item list-group-item-info">Info</li>
    </ul>
  </div>
  <div class="col-md-6">
    <h6>Linked (flush)</h6>
    <div class="list-group list-group-flush">
      <a href="#" class="list-group-item list-group-item-action active">Dashboard</a>
      <a href="#" class="list-group-item list-group-item-action">Profile</a>
      <a href="#" class="list-group-item list-group-item-action">Settings</a>
      <a href="#" class="list-group-item list-group-item-action">Billing</a>
    </div>
  </div>
</div>`,
  },

  {
    id: 'bs-accordion',
    chapter: 'Components',
    title: 'Accordion',
    concept: 'Accordions use Bootstrap\'s Collapse plugin. Set a unique `id` on the `.accordion` wrapper and add `data-bs-parent="#id"` to each `.accordion-collapse` so that opening one panel closes others. Without `data-bs-parent`, panels open and close independently. Use `.accordion-flush` to remove the outer border and rounded corners.',
    challenge: {
      question: 'What attribute on each .accordion-collapse closes other open panels?',
      options: ['data-bs-parent', 'data-bs-target', 'data-bs-dismiss', 'data-bs-toggle'],
      correct: 0,
    },
    code: `<div class="accordion" id="accordionMain">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
        Accordion Item #1 (open by default)
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionMain">
      <div class="accordion-body">
        <strong>This is the first item's body.</strong> It is shown by default. Opening another item will close this one because of <code>data-bs-parent</code>.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionMain">
      <div class="accordion-body">
        This is the second item's body. It is hidden by default.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionMain">
      <div class="accordion-body">
        This is the third item's body.
      </div>
    </div>
  </div>
</div>`,
  },

  {
    id: 'bs-modal',
    chapter: 'Components',
    title: 'Modal',
    concept: 'Modals use `data-bs-toggle="modal"` and `data-bs-target="#id"` on a trigger element. The modal markup lives anywhere in the body and consists of `.modal > .modal-dialog > .modal-content > header/body/footer`. `.modal-dialog-scrollable` enables independent scroll, `.modal-dialog-centered` vertically centers it. Sizes: `.modal-sm`, `.modal-lg`, `.modal-xl`.',
    code: `<div class="d-flex gap-2 flex-wrap mb-3">
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#basicModal">Basic Modal</button>
  <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#scrollModal">Scrollable</button>
  <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#centeredModal">Centered</button>
</div>

<div class="modal fade" id="basicModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Basic Modal</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">Place any content here — forms, images, text, or other components.</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="scrollModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Scrollable Modal</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p>This modal body scrolls independently of the page.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.</p>
        <p>Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.</p>
        <p>Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia.</p>
        <p>Deserunt mollit anim id est laborum lorem ipsum dolor sit amet.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="centeredModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Vertically Centered</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">This modal is vertically centered in the viewport.</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">OK</button>
      </div>
    </div>
  </div>
</div>`,
  },

  {
    id: 'bs-toast',
    chapter: 'Components',
    title: 'Toasts',
    concept: '**Toasts** are lightweight push notifications that auto-dismiss after a delay. Unlike alerts, they must be triggered via JavaScript: `new bootstrap.Toast(el).show()`. Place them in a `.toast-container` with position utilities (e.g. `.position-fixed.bottom-0.end-0`) to anchor to a viewport corner. `data-bs-autohide="false"` keeps the toast open until dismissed. Default delay is 5000ms.',
    code: `<div class="d-flex gap-2 flex-wrap mb-3">
  <button class="btn btn-primary" id="btnBasicToast">Show Basic Toast</button>
  <button class="btn btn-success" id="btnSuccessToast">Show Success Toast</button>
  <button class="btn btn-danger" id="btnPersistToast">Show Persistent Toast</button>
</div>

<div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index:1100">
  <div id="basicToast" class="toast" role="alert">
    <div class="toast-header">
      <span class="rounded me-2 bg-primary d-inline-block" style="width:16px;height:16px"></span>
      <strong class="me-auto">Bootstrap</strong>
      <small>just now</small>
      <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
    </div>
    <div class="toast-body">Hello! This toast auto-hides after 5 seconds.</div>
  </div>

  <div id="successToast" class="toast align-items-center text-bg-success border-0" role="alert">
    <div class="d-flex">
      <div class="toast-body">✅ Profile saved successfully!</div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>
  </div>

  <div id="persistToast" class="toast" role="alert" data-bs-autohide="false">
    <div class="toast-header text-bg-danger">
      <strong class="me-auto text-white">⚠ Error</strong>
      <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast"></button>
    </div>
    <div class="toast-body">data-bs-autohide="false" — stays until you close it.</div>
  </div>
</div>

<script>
document.getElementById('btnBasicToast').addEventListener('click', function() {
  new bootstrap.Toast(document.getElementById('basicToast')).show();
});
document.getElementById('btnSuccessToast').addEventListener('click', function() {
  new bootstrap.Toast(document.getElementById('successToast'), { delay: 3000 }).show();
});
document.getElementById('btnPersistToast').addEventListener('click', function() {
  new bootstrap.Toast(document.getElementById('persistToast')).show();
});
</script>`,
  },

  // ── Chapter 13: Overlays ──────────────────────────────────────────────────────
  {
    id: 'bs-dropdown',
    chapter: 'Overlays',
    title: 'Dropdowns',
    concept: 'Dropdowns use `.dropdown` wrapping a toggle button (`data-bs-toggle="dropdown"`) and a `.dropdown-menu`. Add `.dropdown-divider` to separate groups and `.dropdown-header` for section labels. Disable items with `.disabled`. Change direction with `.dropup`, `.dropend`, or `.dropstart` on the wrapper.',
    code: `<h6>Basic dropdown</h6>
<div class="dropdown mb-3">
  <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
    Actions
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
  </ul>
</div>

<h6>With header and disabled item</h6>
<div class="dropdown mb-3">
  <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">Dropdown</button>
  <ul class="dropdown-menu">
    <li><h6 class="dropdown-header">Section header</h6></li>
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item disabled">Disabled action</a></li>
  </ul>
</div>

<h6>Direction variants</h6>
<div class="d-flex gap-2 flex-wrap">
  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle btn-sm" data-bs-toggle="dropdown">Dropdown ↓</button>
    <ul class="dropdown-menu"><li><a class="dropdown-item" href="#">Item</a></li></ul>
  </div>
  <div class="dropup">
    <button class="btn btn-secondary dropdown-toggle btn-sm" data-bs-toggle="dropdown">Dropup ↑</button>
    <ul class="dropdown-menu"><li><a class="dropdown-item" href="#">Item</a></li></ul>
  </div>
  <div class="dropend">
    <button class="btn btn-secondary dropdown-toggle btn-sm" data-bs-toggle="dropdown">Dropend →</button>
    <ul class="dropdown-menu"><li><a class="dropdown-item" href="#">Item</a></li></ul>
  </div>
</div>`,
  },

  {
    id: 'bs-tooltip',
    chapter: 'Overlays',
    title: 'Tooltips & Popovers',
    concept: 'Tooltips use `data-bs-toggle="tooltip"` with a `title` attribute. Popovers use `data-bs-toggle="popover"` with `data-bs-title` and `data-bs-content`. Both must be initialized with JavaScript — this playground does it automatically for every preview. Control placement with `data-bs-placement`. Popovers also support `data-bs-trigger="hover focus"`.',
    code: `<h6>Tooltips (initialized automatically)</h6>
<div class="d-flex gap-2 flex-wrap mb-4">
  <button type="button" class="btn btn-secondary btn-sm"
    data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top">Top</button>
  <button type="button" class="btn btn-secondary btn-sm"
    data-bs-toggle="tooltip" data-bs-placement="right" title="Tooltip on right">Right</button>
  <button type="button" class="btn btn-secondary btn-sm"
    data-bs-toggle="tooltip" data-bs-placement="bottom" title="Tooltip on bottom">Bottom</button>
  <button type="button" class="btn btn-secondary btn-sm"
    data-bs-toggle="tooltip" data-bs-placement="left" title="Tooltip on left">Left</button>
</div>

<h6>Popovers (click to open)</h6>
<div class="d-flex gap-2 flex-wrap">
  <button type="button" class="btn btn-success btn-sm"
    data-bs-toggle="popover"
    data-bs-placement="top"
    data-bs-title="Popover title"
    data-bs-content="This is the popover body. It can contain longer text than a tooltip.">
    Top popover (click)
  </button>
  <button type="button" class="btn btn-info btn-sm"
    data-bs-toggle="popover"
    data-bs-placement="right"
    data-bs-title="Right side"
    data-bs-content="Popover aligned to the right.">
    Right popover (click)
  </button>
  <button type="button" class="btn btn-warning btn-sm"
    data-bs-toggle="popover"
    data-bs-trigger="hover focus"
    data-bs-title="Hover/Focus trigger"
    data-bs-content="This opens on hover or focus, not click.">
    Hover/Focus
  </button>
</div>`,
  },

  {
    id: 'bs-offcanvas',
    chapter: 'Overlays',
    title: 'Offcanvas',
    concept: 'Offcanvas panels slide in from the edge of the viewport. Use `data-bs-toggle="offcanvas"` on a trigger and `.offcanvas .offcanvas-{start|end|top|bottom}` on the panel. The panel includes a `.offcanvas-header` (with a `.btn-close` using `data-bs-dismiss="offcanvas"`) and an `.offcanvas-body`. Great for mobile navigation and side panels.',
    code: `<div class="d-flex gap-2 flex-wrap mb-3">
  <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasLeft">
    ← Left panel
  </button>
  <button class="btn btn-secondary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight">
    Right panel →
  </button>
  <button class="btn btn-warning" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom">
    ↑ Bottom panel
  </button>
</div>

<div class="offcanvas offcanvas-start" id="offcanvasLeft" tabindex="-1">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title">Navigation</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
  </div>
  <div class="offcanvas-body">
    <p class="text-muted small">Use the left offcanvas for navigation menus.</p>
    <ul class="list-unstyled">
      <li class="mb-2"><a href="#" class="text-decoration-none">📊 Dashboard</a></li>
      <li class="mb-2"><a href="#" class="text-decoration-none">👤 Profile</a></li>
      <li class="mb-2"><a href="#" class="text-decoration-none">⚙️ Settings</a></li>
      <li class="mb-2"><a href="#" class="text-decoration-none">💳 Billing</a></li>
    </ul>
  </div>
</div>

<div class="offcanvas offcanvas-end" id="offcanvasRight" tabindex="-1">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title">Shopping Cart</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
  </div>
  <div class="offcanvas-body">
    <div class="list-group mb-3">
      <div class="list-group-item">Widget A — $29.99</div>
      <div class="list-group-item">Widget B — $49.99</div>
    </div>
    <button class="btn btn-primary w-100">Checkout</button>
  </div>
</div>

<div class="offcanvas offcanvas-bottom" style="height:180px" id="offcanvasBottom" tabindex="-1">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title">Cookie Notice</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
  </div>
  <div class="offcanvas-body">
    <p>We use cookies to improve your experience.</p>
    <button class="btn btn-sm btn-primary me-2" data-bs-dismiss="offcanvas">Accept All</button>
    <button class="btn btn-sm btn-outline-secondary" data-bs-dismiss="offcanvas">Reject</button>
  </div>
</div>`,
  },

  // ── Chapter 14: Carousel ──────────────────────────────────────────────────────
  {
    id: 'bs-carousel',
    chapter: 'Carousel',
    title: 'Carousel Basics',
    concept: 'The carousel needs a unique `id` on `.carousel`, indicator buttons pointing to each slide via `data-bs-slide-to`, and `.carousel-item` divs inside `.carousel-inner`. The first item must have `.active`. Add prev/next `<button>` controls with `data-bs-slide="prev"/"next"`. Set `data-bs-ride="carousel"` to auto-play.',
    code: `<div id="mainCarousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="0" class="active"></button>
    <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="1"></button>
    <button type="button" data-bs-target="#mainCarousel" data-bs-slide-to="2"></button>
  </div>

  <div class="carousel-inner rounded">
    <div class="carousel-item active">
      <img src="https://picsum.photos/800/300?random=40" class="d-block w-100" alt="Slide 1">
      <div class="carousel-caption d-none d-md-block">
        <h5>First slide</h5>
        <p>Caption text for the first slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://picsum.photos/800/300?random=41" class="d-block w-100" alt="Slide 2">
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide</h5>
        <p>Caption text for the second slide.</p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="https://picsum.photos/800/300?random=42" class="d-block w-100" alt="Slide 3">
      <div class="carousel-caption d-none d-md-block">
        <h5>Third slide</h5>
        <p>Caption text for the third slide.</p>
      </div>
    </div>
  </div>

  <button class="carousel-control-prev" type="button" data-bs-target="#mainCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#mainCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`,
  },

  {
    id: 'bs-carousel-adv',
    chapter: 'Carousel',
    title: 'Crossfade & Options',
    concept: 'Add `.carousel-fade` for a crossfade transition instead of the default slide. Set `data-bs-interval="{ms}"` on individual slides to control their display time. Use `data-bs-ride="false"` to disable auto-play and let users navigate manually. The `data-bs-pause="hover"` attribute (default) pauses on mouse hover.',
    code: `<h6>Crossfade carousel</h6>
<div id="carouselFade" class="carousel carousel-fade slide mb-4" data-bs-ride="carousel">
  <div class="carousel-inner rounded">
    <div class="carousel-item active" data-bs-interval="2000">
      <img src="https://picsum.photos/800/220?random=50" class="d-block w-100" alt="">
    </div>
    <div class="carousel-item" data-bs-interval="2000">
      <img src="https://picsum.photos/800/220?random=51" class="d-block w-100" alt="">
    </div>
    <div class="carousel-item">
      <img src="https://picsum.photos/800/220?random=52" class="d-block w-100" alt="">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselFade" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselFade" data-bs-slide="next">
    <span class="carousel-control-next-icon"></span>
  </button>
</div>

<h6>Manual carousel (data-bs-ride="false")</h6>
<div id="carouselManual" class="carousel slide" data-bs-ride="false">
  <div class="carousel-inner rounded border">
    <div class="carousel-item active p-4 text-center bg-primary text-white">
      <h3>Slide 1</h3><p>data-bs-ride="false" — no auto-play. Navigate manually.</p>
    </div>
    <div class="carousel-item p-4 text-center bg-success text-white">
      <h3>Slide 2</h3><p>Each slide can also have its own data-bs-interval.</p>
    </div>
    <div class="carousel-item p-4 text-center bg-danger text-white">
      <h3>Slide 3</h3><p>The last slide.</p>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselManual" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" style="filter:invert(1)"></span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselManual" data-bs-slide="next">
    <span class="carousel-control-next-icon" style="filter:invert(1)"></span>
  </button>
</div>`,
  },

  // ── Chapter 15: Utilities ─────────────────────────────────────────────────────
  {
    id: 'bs-spacing',
    chapter: 'Utilities',
    title: 'Spacing',
    concept: 'Spacing utilities follow `{property}{sides}-{size}`. **Property**: `m` (margin) or `p` (padding). **Sides**: `t`/`b`/`s`/`e`/`x`/`y` or omit for all sides. **Size**: 0–5 (0=0, 1=0.25rem, 2=0.5rem, 3=1rem, 4=1.5rem, 5=3rem) or `auto`. Use responsive infixes like `mt-md-3` to apply only at certain breakpoints.',
    code: `<h6>Margin (m-0 to m-4)</h6>
<div class="d-flex flex-wrap align-items-start bg-light border p-1 mb-3">
  <div class="bg-primary text-white small p-1 m-0">m-0</div>
  <div class="bg-primary text-white small p-1 m-1">m-1</div>
  <div class="bg-primary text-white small p-1 m-2">m-2</div>
  <div class="bg-primary text-white small p-1 m-3">m-3</div>
  <div class="bg-primary text-white small p-1 m-4">m-4</div>
</div>

<h6>Padding (p-0 to p-5)</h6>
<div class="d-flex flex-wrap gap-2 mb-3">
  <div class="bg-success text-white small p-0 border">p-0</div>
  <div class="bg-success text-white small p-1">p-1</div>
  <div class="bg-success text-white small p-2">p-2</div>
  <div class="bg-success text-white small p-3">p-3</div>
  <div class="bg-success text-white small p-4">p-4</div>
  <div class="bg-success text-white small p-5">p-5</div>
</div>

<h6>Side-specific</h6>
<div class="d-flex gap-2 flex-wrap">
  <div class="bg-warning p-2 pt-5 small border">pt-5<br>(top)</div>
  <div class="bg-warning p-2 pb-5 small border">pb-5<br>(bottom)</div>
  <div class="bg-warning p-2 ps-5 small border">ps-5<br>(start)</div>
  <div class="bg-warning p-2 pe-5 small border">pe-5<br>(end)</div>
  <div class="bg-warning p-2 px-5 small border">px-5<br>(x-axis)</div>
  <div class="bg-warning p-2 py-4 small border">py-4<br>(y-axis)</div>
</div>`,
  },

  {
    id: 'bs-flex',
    chapter: 'Utilities',
    title: 'Flexbox Utilities',
    concept: '`.d-flex` enables flexbox. Control direction with `.flex-row` (default) or `.flex-column`. Align items along the main axis with `.justify-content-{start|center|end|between|around|evenly}`. Align on the cross axis with `.align-items-{start|center|end|stretch}`. `.flex-grow-1` makes an item expand to fill remaining space.',
    code: `<h6>justify-content</h6>
<div class="d-flex justify-content-between border rounded p-2 mb-2">
  <span class="badge bg-primary">between-1</span>
  <span class="badge bg-primary">between-2</span>
  <span class="badge bg-primary">between-3</span>
</div>
<div class="d-flex justify-content-center gap-2 border rounded p-2 mb-2">
  <span class="badge bg-success">center-1</span>
  <span class="badge bg-success">center-2</span>
</div>
<div class="d-flex justify-content-end gap-2 border rounded p-2 mb-4">
  <span class="badge bg-danger">end-1</span>
  <span class="badge bg-danger">end-2</span>
</div>

<h6>align-items</h6>
<div class="d-flex align-items-center gap-2 border rounded p-2 mb-4" style="height:80px">
  <div class="bg-warning p-1 small">center</div>
  <div class="bg-warning p-3 small">tall</div>
  <div class="bg-warning p-1 small">short</div>
</div>

<h6>flex-grow-1</h6>
<div class="d-flex gap-2 border rounded p-2 mb-4">
  <div class="bg-info text-white p-2 small">fixed</div>
  <div class="bg-primary text-white p-2 flex-grow-1 small">flex-grow-1 (fills remaining space)</div>
  <div class="bg-info text-white p-2 small">fixed</div>
</div>

<h6>flex-column</h6>
<div class="d-flex flex-column gap-2" style="max-width:200px">
  <div class="bg-secondary text-white p-2 small rounded">Stack item 1</div>
  <div class="bg-secondary text-white p-2 small rounded">Stack item 2</div>
  <div class="bg-secondary text-white p-2 small rounded">Stack item 3</div>
</div>`,
  },

  {
    id: 'bs-display',
    chapter: 'Utilities',
    title: 'Display & Visibility',
    concept: '`.d-{value}` sets `display`. Common values: `none`, `block`, `inline`, `inline-block`, `flex`, `grid`. Add a breakpoint infix for responsive behavior: `.d-none.d-md-block` hides on mobile and shows on md+. `.visible` and `.invisible` toggle visibility while keeping element space. `.visually-hidden` hides from sighted users but keeps it accessible to screen readers.',
    code: `<h6>Display utilities</h6>
<div class="d-block bg-primary text-white p-2 mb-2 small rounded">d-block</div>
<span class="d-inline-block bg-success text-white p-2 mb-2 small rounded me-2">d-inline-block</span>
<span class="d-inline bg-warning p-1 small rounded">d-inline</span>
<div class="d-flex gap-2 mt-2 mb-4">
  <div class="p-2 bg-info text-white small rounded">d-flex</div>
  <div class="p-2 bg-info text-white small rounded">items side by side</div>
</div>

<h6>Responsive display (resize preview pane)</h6>
<div class="d-none d-md-block alert alert-info mb-2">
  Visible only on md+ screens (<code>d-none d-md-block</code>)
</div>
<div class="d-md-none alert alert-warning mb-4">
  Visible only below md (<code>d-md-none</code>)
</div>

<h6>Visibility (still takes space)</h6>
<div class="d-flex gap-3 mb-3">
  <div class="border p-3 visible small rounded">visible</div>
  <div class="border p-3 invisible small rounded">invisible</div>
  <div class="border p-3 visible small rounded">visible</div>
</div>

<h6>Screen-reader only</h6>
<p>This paragraph has <span class="visually-hidden">hidden accessible text</span>a visually-hidden span inside it (check the DOM).</p>`,
  },

  {
    id: 'bs-position',
    chapter: 'Utilities',
    title: 'Position Utilities',
    concept: 'Bootstrap provides `.position-{static|relative|absolute|fixed|sticky}` classes. Pair `.position-absolute` with `.top-{0|50|100}`, `.start-{0|50|100}`, `.bottom-{0|50|100}`, `.end-{0|50|100}` to place elements precisely inside a `.position-relative` parent. `.translate-middle` centers on both axes simultaneously; use `.translate-middle-x` or `.translate-middle-y` for one axis only. `.sticky-top` sticks to the top of the nearest scroll container.',
    code: `<h6>Corner & center anchoring</h6>
<div class="position-relative bg-body-secondary border rounded mb-4" style="height:130px">
  <div class="position-absolute top-0 start-0 bg-primary text-white rounded-2 p-1 small">top-0 start-0</div>
  <div class="position-absolute top-0 end-0 bg-success text-white rounded-2 p-1 small">top-0 end-0</div>
  <div class="position-absolute bottom-0 start-0 bg-warning rounded-2 p-1 small">bottom-0 start-0</div>
  <div class="position-absolute bottom-0 end-0 bg-danger text-white rounded-2 p-1 small">bottom-0 end-0</div>
  <div class="position-absolute top-50 start-50 translate-middle bg-dark text-white rounded-2 p-1 small text-nowrap">center (translate-middle)</div>
</div>

<h6>Edge midpoints</h6>
<div class="position-relative bg-body-secondary border rounded mb-4" style="height:100px">
  <div class="position-absolute top-0 start-50 translate-middle-x bg-info text-white rounded-2 p-1 small">top center</div>
  <div class="position-absolute top-50 end-0 translate-middle-y bg-secondary text-white rounded-2 p-1 small">middle end</div>
  <div class="position-absolute bottom-0 start-50 translate-middle-x bg-primary text-white rounded-2 p-1 small">bottom center</div>
</div>

<h6>Notification badge pattern</h6>
<div class="d-flex gap-4 mb-4">
  <div class="position-relative d-inline-block">
    <button class="btn btn-secondary">Inbox</button>
    <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">9+</span>
  </div>
  <div class="position-relative d-inline-block">
    <button class="btn btn-outline-primary">Notifications</button>
    <span class="position-absolute top-0 start-100 translate-middle p-1 bg-success border border-2 border-white rounded-circle">
      <span class="visually-hidden">New alerts</span>
    </span>
  </div>
</div>

<h6>Sticky within a scroll container</h6>
<div class="border rounded overflow-auto" style="height:120px">
  <div class="sticky-top bg-body-tertiary border-bottom px-2 py-1 fw-bold small">Sticky header — scroll me</div>
  <div class="p-2 small text-muted">
    <p>Line 1 — scroll down to see the sticky header remain at the top.</p>
    <p>Line 2 — position-sticky works within overflow scroll containers.</p>
    <p>Line 3 — useful for table headers and section headings in long lists.</p>
    <p>Line 4 — end of content.</p>
  </div>
</div>`,
  },

  {
    id: 'bs-shadows',
    chapter: 'Utilities',
    title: 'Shadows & Overflow',
    concept: 'Add box shadows with `.shadow-none`, `.shadow-sm`, `.shadow`, or `.shadow-lg`. Control overflow with `.overflow-auto`, `.overflow-hidden`, `.overflow-scroll`, or `.overflow-visible`. Z-index utilities `.z-0` through `.z-3` (and `.z-n1`) work on positioned elements to control stacking order.',
    code: `<h6>Box shadows</h6>
<div class="row g-3 mb-4">
  <div class="col-6 col-md-3"><div class="shadow-none p-3 border rounded text-center small">shadow-none</div></div>
  <div class="col-6 col-md-3"><div class="shadow-sm p-3 rounded text-center small">shadow-sm</div></div>
  <div class="col-6 col-md-3"><div class="shadow p-3 rounded text-center small">shadow</div></div>
  <div class="col-6 col-md-3"><div class="shadow-lg p-3 rounded text-center small">shadow-lg</div></div>
</div>

<h6>Overflow</h6>
<div class="d-flex gap-3 flex-wrap mb-4">
  <div class="overflow-auto border rounded p-2 small" style="max-height:80px;width:160px">
    <strong>overflow-auto</strong><br>More content to force scroll. Lorem ipsum dolor sit amet consectetur adipiscing.
  </div>
  <div class="overflow-hidden border rounded p-2 small" style="max-height:80px;width:160px">
    <strong>overflow-hidden</strong><br>This content is clipped. Lorem ipsum dolor sit amet consectetur adipiscing elit.
  </div>
  <div class="overflow-scroll border rounded p-2 small" style="max-height:80px;width:160px">
    <strong>overflow-scroll</strong><br>Scroll bars always shown. Lorem ipsum dolor sit amet consectetur.
  </div>
</div>

<h6>Z-index stacking</h6>
<div style="position:relative;height:100px">
  <div class="position-absolute z-3 bg-danger text-white rounded p-2 small" style="top:0;left:0">z-3 (top)</div>
  <div class="position-absolute z-2 bg-warning rounded p-2 small" style="top:15px;left:15px">z-2</div>
  <div class="position-absolute z-1 bg-success text-white rounded p-2 small" style="top:30px;left:30px">z-1 (bottom)</div>
</div>`,
  },

];
