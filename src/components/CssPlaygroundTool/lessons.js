export const CHAPTERS = [
  {
    id: 'selectors',
    title: 'Selectors',
    emoji: '🎯',
    lessons: [
      {
        id: 'element-universal',
        title: 'Element & Universal',
        concept: `CSS selectors choose which HTML elements to style. The element selector targets all elements of a given type — write the tag name without angle brackets.\n\nThe universal selector \`*\` matches every element on the page. It is most commonly used in a CSS reset to strip default browser margin and padding.`,
        html: `<h1>Main Heading</h1>
<p>First paragraph with some text.</p>
<p>Second paragraph here.</p>
<ul>
  <li>List item one</li>
  <li>List item two</li>
  <li>List item three</li>
</ul>`,
        css: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  padding: 20px;
  font-family: system-ui, sans-serif;
}

h1 {
  color: #2563eb;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

p {
  color: #374151;
  line-height: 1.6;
  margin-bottom: 0.75rem;
}

li {
  color: #059669;
  margin-left: 1.5rem;
  margin-bottom: 0.25rem;
}`,
      },
      {
        id: 'class-id',
        title: 'Class & ID',
        concept: `Class selectors start with a dot: \`.card\`. Multiple elements can share a class. ID selectors start with a hash: \`#title\`. IDs must be unique per page.\n\nUse classes for styling reusable patterns. Reserve IDs for unique landmarks or JavaScript hooks — they carry higher specificity which can make overrides tricky.`,
        html: `<h1 id="page-title">My Portfolio</h1>
<div class="card">
  <p class="card-text">First card — design work</p>
  <button class="btn btn-primary">View Project</button>
</div>
<div class="card">
  <p class="card-text">Second card — development</p>
  <button class="btn btn-secondary">Details</button>
</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

#page-title {
  color: #1e40af;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.card {
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
}

.card-text {
  color: #475569;
  margin-bottom: 0.75rem;
}

.btn {
  padding: 0.4rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
}

.btn-primary  { background: #2563eb; color: #fff; }
.btn-secondary { background: #e2e8f0; color: #1e293b; }`,
        challenge: {
          question: 'Which selector targets elements by their class attribute?',
          options: ['#name', '.name', 'name', '*name'],
          correct: '.name',
        },
      },
      {
        id: 'pseudo-classes',
        title: 'Pseudo-classes',
        concept: `Pseudo-classes select elements based on their state or position. \`:hover\` applies when the mouse is over an element. \`:focus\` applies when an input has keyboard focus.\n\n\`:nth-child(n)\` selects by position: \`:first-child\`, \`:last-child\`, \`:nth-child(even)\` and \`:nth-child(odd)\` are the most commonly used variants.`,
        html: `<ul class="list">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
  <li>Fourth item</li>
</ul>

<br>
<a href="#" class="link">Hover over me</a>
<br><br>
<input type="text" placeholder="Click to focus" class="field" />`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

.list {
  list-style: none;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.list li {
  padding: 0.6rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  transition: background 0.15s;
  cursor: pointer;
}

.list li:hover {
  background: #eff6ff;
  color: #2563eb;
}

.list li:first-child { background: #dbeafe; font-weight: 600; }
.list li:last-child  { border-bottom: none; }
.list li:nth-child(even) { background: #f8fafc; }

.link { color: #2563eb; text-decoration: none; }
.link:hover { text-decoration: underline; }

.field {
  padding: 0.5rem 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  outline: none;
  font-size: 1rem;
  transition: border-color 0.15s;
}
.field:focus { border-color: #2563eb; }`,
        challenge: {
          question: 'Which pseudo-class applies styles only when a user hovers the mouse over an element?',
          options: [':focus', ':active', ':hover', ':visited'],
          correct: ':hover',
        },
      },
      {
        id: 'combinators',
        title: 'Combinators',
        concept: `Combinators describe the relationship between selectors.\n\n**Descendant** (\`div p\`) — any \`p\` inside a \`div\`. **Child** (\`div > p\`) — only direct children. **Adjacent sibling** (\`h2 + p\`) — the element immediately after an \`h2\`. **General sibling** (\`h2 ~ p\`) — all matching elements after \`h2\` in the same parent.`,
        html: `<section class="box">
  <h2>Section Title</h2>
  <p>First paragraph (adjacent sibling of h2).</p>
  <p>Second paragraph (general sibling).</p>
  <div>
    <p>Paragraph inside a div (descendant of section).</p>
  </div>
</section>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

.box {
  background: #f8fafc;
  border: 2px dashed #94a3b8;
  border-radius: 8px;
  padding: 1rem;
}

/* Descendant: any p inside .box */
.box p {
  padding: 0.4rem 0.75rem;
  margin-bottom: 0.4rem;
  border-radius: 4px;
}

/* Child: only direct p of .box */
.box > p {
  border-left: 3px solid #2563eb;
  background: #eff6ff;
}

/* Adjacent: first p after h2 */
h2 + p { font-weight: 600; color: #1d4ed8; }

/* General: all p after h2 in same parent */
h2 ~ p { border-bottom: 1px dashed #cbd5e1; }`,
      },
    ],
  },

  {
    id: 'colors',
    title: 'Colors',
    emoji: '🎨',
    lessons: [
      {
        id: 'color-values',
        title: 'Color Values',
        concept: `CSS supports many color formats. **Named**: \`tomato\`, \`steelblue\` — readable but limited. **Hex**: \`#2563eb\` — compact and widely used. **RGB**: \`rgb(37, 99, 235)\` — red, green, blue each 0–255. **HSL**: \`hsl(221, 83%, 53%)\` — hue angle, saturation, lightness — most intuitive for humans.\n\nAll formats support an alpha channel for transparency: \`rgba(0,0,0,0.5)\` or \`hsl(221 83% 53% / 0.5)\`.`,
        html: `<div class="grid">
  <div class="swatch named">named: tomato</div>
  <div class="swatch hex">#2563eb</div>
  <div class="swatch rgb">rgb(5,150,105)</div>
  <div class="swatch hsl">hsl(280,65%,55%)</div>
  <div class="swatch alpha">rgba(37,99,235,0.3)</div>
</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

.grid { display: grid; gap: 0.5rem; }

.swatch {
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-family: monospace;
  font-size: 0.85rem;
  color: white;
}

.named  { background: tomato; }
.hex    { background: #2563eb; }
.rgb    { background: rgb(5, 150, 105); }
.hsl    { background: hsl(280, 65%, 55%); }
.alpha  { background: rgba(37, 99, 235, 0.3); color: #1e3a8a; border: 1px solid #bfdbfe; }`,
        challenge: {
          question: 'Which color format uses hue, saturation, and lightness?',
          options: ['rgb()', 'hex', 'hsl()', 'named'],
          correct: 'hsl()',
        },
      },
      {
        id: 'gradients',
        title: 'Gradients',
        concept: `Gradients are CSS values set via \`background\` or \`background-image\` — they produce smooth colour transitions without images.\n\n**Linear** (\`linear-gradient\`): colours flow in a line. Control direction with \`to right\`, \`to bottom\`, or an angle like \`135deg\`. **Radial** (\`radial-gradient\`): radiates from a centre point. **Conic** (\`conic-gradient\`): rotates like a pie chart.`,
        html: `<div class="grid">
  <div class="g g1">linear → right</div>
  <div class="g g2">135deg</div>
  <div class="g g3">radial</div>
  <div class="g g4">conic</div>
  <div class="g g5">multi-stop</div>
  <div class="g g6">repeating</div>
</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.g {
  height: 80px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  font-size: 0.8rem;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.g1 { background: linear-gradient(to right, #2563eb, #7c3aed); }
.g2 { background: linear-gradient(135deg, #059669, #0891b2); }
.g3 { background: radial-gradient(circle, #f97316, #dc2626); }
.g4 { background: conic-gradient(#2563eb, #7c3aed, #ec4899, #2563eb); }
.g5 { background: linear-gradient(90deg, #fbbf24 0%, #f97316 50%, #dc2626 100%); }
.g6 { background: repeating-linear-gradient(45deg, #1e40af 0px, #1e40af 10px, #3b82f6 10px, #3b82f6 20px); }`,
      },
      {
        id: 'backgrounds',
        title: 'Backgrounds',
        concept: `Beyond solid colours, \`background\` accepts images, patterns, and fine-grained positioning.\n\n\`background-size: cover\` fills the element. \`background-position\` anchors the image. \`background-repeat: no-repeat\` prevents tiling. Multiple backgrounds can be layered with commas — the first listed sits on top.`,
        html: `<div class="box pattern">Dot pattern</div>
<div class="box gradient-overlay">Gradient overlay</div>
<div class="box layered">Layered backgrounds</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

.box {
  height: 90px;
  border-radius: 10px;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  font-size: 0.9rem;
  text-shadow: 0 1px 3px rgba(0,0,0,0.4);
}

.pattern {
  background-color: #1e40af;
  background-image: radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px);
  background-size: 18px 18px;
}

.gradient-overlay {
  background: linear-gradient(135deg, #7c3aed 0%, #2563eb 100%);
}

.layered {
  background:
    linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)),
    linear-gradient(135deg, #059669, #0891b2);
}`,
      },
    ],
  },

  {
    id: 'typography',
    title: 'Typography',
    emoji: '🔤',
    lessons: [
      {
        id: 'font-family-size',
        title: 'Font Family & Size',
        concept: `\`font-family\` sets the typeface. Always include a fallback stack ending with a generic family: \`sans-serif\`, \`serif\`, or \`monospace\`.\n\nPrefer \`rem\` over \`px\` for font sizes — \`1rem\` equals the root font size (typically 16px) and respects browser accessibility zoom settings.`,
        html: `<p class="sans">Sans-serif — clean, modern, screens</p>
<p class="serif">Serif — classic, editorial, authority</p>
<p class="mono">Monospace — code, data, terminals</p>
<hr>
<p class="xs">0.75rem — caption / label</p>
<p class="sm">0.875rem — secondary text</p>
<p class="base">1rem — body text</p>
<p class="lg">1.25rem — lead paragraph</p>
<p class="xl">2rem — display heading</p>`,
        css: `body { padding: 20px; }

.sans  { font-family: 'Helvetica Neue', Arial, sans-serif; }
.serif { font-family: Georgia, 'Times New Roman', serif; }
.mono  { font-family: 'Courier New', Courier, monospace; }

.xs   { font-size: 0.75rem; }
.sm   { font-size: 0.875rem; }
.base { font-size: 1rem; }
.lg   { font-size: 1.25rem; }
.xl   { font-size: 2rem; font-weight: 700; }

p { margin-bottom: 0.4rem; }
hr { margin: 0.75rem 0; border: none; border-top: 1px solid #e2e8f0; }`,
      },
      {
        id: 'font-weight-transform',
        title: 'Weight, Style & Transform',
        concept: `\`font-weight\` controls thickness: 100 (thin) to 900 (black). \`400\` is normal, \`700\` is bold. \`font-style: italic\` slants the text.\n\n\`text-transform\` changes capitalisation without altering the HTML: \`uppercase\`, \`lowercase\`, \`capitalize\` (first letter of each word).`,
        html: `<p class="w300">Weight 300 — Light</p>
<p class="w400">Weight 400 — Regular</p>
<p class="w600">Weight 600 — Semibold</p>
<p class="w700">Weight 700 — Bold</p>
<p class="w900">Weight 900 — Black</p>
<hr>
<p class="italic">font-style: italic</p>
<p class="upper">text-transform: uppercase</p>
<p class="lower">text-transform: LOWERCASE</p>
<p class="cap">text-transform: capitalize words</p>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; font-size: 1rem; }

.w300 { font-weight: 300; }
.w400 { font-weight: 400; }
.w600 { font-weight: 600; }
.w700 { font-weight: 700; }
.w900 { font-weight: 900; }

.italic { font-style: italic; }
.upper  { text-transform: uppercase; letter-spacing: 0.08em; }
.lower  { text-transform: lowercase; }
.cap    { text-transform: capitalize; }

p { margin-bottom: 0.4rem; }
hr { margin: 0.75rem 0; border: none; border-top: 1px solid #e2e8f0; }`,
      },
      {
        id: 'line-height-spacing',
        title: 'Line Height & Spacing',
        concept: `\`line-height\` controls vertical space between lines. A unitless value like \`1.6\` is best — it multiplies the font size. Body text typically reads well at 1.5–1.8.\n\n\`letter-spacing\` adds space between characters. Use \`em\` so it scales with the font. Uppercase labels and display headings often benefit from gentle positive letter-spacing.`,
        html: `<p class="tight">Tight 1.1 — Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
<p class="normal">Normal 1.6 — Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
<p class="loose">Loose 2.0 — Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
<hr>
<p class="ls-neg">letter-spacing: -0.04em — tight</p>
<p class="ls-0">letter-spacing: 0 — normal</p>
<p class="ls-pos">letter-spacing: 0.12em — wide label</p>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

.tight  { line-height: 1.1; margin-bottom: 1rem; }
.normal { line-height: 1.6; margin-bottom: 1rem; }
.loose  { line-height: 2.0; margin-bottom: 1rem; }

.ls-neg { letter-spacing: -0.04em; font-weight: 700; font-size: 1.2rem; }
.ls-0   { letter-spacing: 0; }
.ls-pos { letter-spacing: 0.12em; text-transform: uppercase; font-size: 0.8rem; font-weight: 600; color: #64748b; }

p { margin-bottom: 0.4rem; }
hr { margin: 0.5rem 0; border: none; border-top: 1px solid #e2e8f0; }`,
      },
      {
        id: 'text-decoration',
        title: 'Decoration & Shadow',
        concept: `\`text-decoration\` adds underlines, strikethroughs, and overlines. You can control the style (\`solid\`, \`wavy\`, \`dashed\`), colour, and thickness independently.\n\n\`text-shadow\` adds drop shadows to text. Syntax: \`offset-x offset-y blur colour\`. Layer multiple shadows with commas for neon or emboss effects.`,
        html: `<p class="underline">text-decoration: underline</p>
<p class="wavy">text-decoration: underline wavy red</p>
<p class="strike">text-decoration: line-through</p>
<p class="dashed">text-decoration: underline dashed blue</p>
<hr>
<h2 class="shadow-soft">Soft shadow</h2>
<h2 class="shadow-hard">Hard shadow</h2>
<h2 class="shadow-neon">Neon glow</h2>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; background: #f8fafc; }

.underline { text-decoration: underline; margin-bottom: 0.4rem; }
.wavy      { text-decoration: underline wavy #dc2626; text-underline-offset: 4px; margin-bottom: 0.4rem; }
.strike    { text-decoration: line-through; color: #94a3b8; margin-bottom: 0.4rem; }
.dashed    { text-decoration: underline dashed #2563eb 2px; text-underline-offset: 4px; margin-bottom: 0.4rem; }

.shadow-soft { font-size: 1.8rem; color: #1e293b; text-shadow: 2px 2px 4px rgba(0,0,0,0.2); margin-bottom: 0.4rem; }
.shadow-hard { font-size: 1.8rem; color: #1e40af; text-shadow: 3px 3px 0 #bfdbfe; margin-bottom: 0.4rem; }
.shadow-neon { font-size: 1.8rem; color: #a855f7; text-shadow: 0 0 8px #a855f7, 0 0 20px #a855f780; }

hr { margin: 0.75rem 0; border: none; border-top: 1px solid #e2e8f0; }`,
      },
    ],
  },

  {
    id: 'box-model',
    title: 'Box Model',
    emoji: '📦',
    lessons: [
      {
        id: 'padding-margin',
        title: 'Padding & Margin',
        concept: `Every HTML element is a rectangular box. **Padding** is space inside the border — between content and edge. **Margin** is space outside the border — between the element and its neighbours.\n\nBoth accept 1–4 values (top right bottom left). \`margin: 1rem auto\` is the classic trick to horizontally centre a block element.`,
        html: `<div class="outer">
  <div class="inner">No padding or margin</div>
</div>
<div class="outer">
  <div class="inner padded">padding: 1rem 2rem</div>
</div>
<div class="outer">
  <div class="inner margined">margin: 1rem</div>
</div>
<div class="outer">
  <div class="inner centered">margin: 0 auto (centered)</div>
</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

.outer {
  background: #dbeafe;
  border: 2px dashed #93c5fd;
  margin-bottom: 0.75rem;
  border-radius: 6px;
}

.inner {
  background: #2563eb;
  color: white;
  font-weight: 600;
  border-radius: 4px;
  font-size: 0.85rem;
}

.padded   { padding: 1rem 2rem; }
.margined { margin: 1rem; }
.centered { width: 55%; margin: 0.5rem auto; padding: 0.5rem; text-align: center; }`,
        challenge: {
          question: 'Which property adds space INSIDE the border, between content and the element edge?',
          options: ['margin', 'gap', 'padding', 'spacing'],
          correct: 'padding',
        },
      },
      {
        id: 'borders',
        title: 'Borders & Border Radius',
        concept: `\`border\` shorthand: \`width style color\` (e.g. \`border: 2px solid #2563eb\`). Styles: \`solid\`, \`dashed\`, \`dotted\`, \`double\`, \`none\`.\n\n\`border-radius\` rounds corners. \`50%\` on a square element makes a circle. \`border-radius: 999px\` on a tall element makes a pill.`,
        html: `<div class="demo solid">border: 2px solid</div>
<div class="demo dashed">border: 2px dashed</div>
<div class="demo dotted">border: 3px dotted</div>
<div class="demo double">border: 4px double</div>
<div class="demo rounded">border-radius: 12px</div>
<div class="demo pill">border-radius: 999px</div>
<div class="demo circle">border-radius: 50%</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

.demo {
  background: #eff6ff;
  color: #1e40af;
  padding: 0.65rem 1rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.85rem;
}

.solid   { border: 2px solid #2563eb; }
.dashed  { border: 2px dashed #7c3aed; }
.dotted  { border: 3px dotted #059669; }
.double  { border: 4px double #dc2626; }
.rounded { border: 2px solid #2563eb; border-radius: 12px; }
.pill    { border: 2px solid #059669; border-radius: 999px; }
.circle  {
  border: 3px solid #7c3aed;
  border-radius: 50%;
  width: 70px; height: 70px;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto;
}`,
      },
      {
        id: 'box-sizing',
        title: 'Box Sizing',
        concept: `By default (\`box-sizing: content-box\`), padding and border are added on top of the declared width — a \`200px\` box with \`20px\` padding renders as \`240px\`.\n\n\`box-sizing: border-box\` includes padding and border inside the declared width. This is predictable and used in virtually every modern project via \`* { box-sizing: border-box }\`.`,
        html: `<div class="container">
  <p class="label">content-box (default): width + padding = wider than declared</p>
  <div class="content-box">width: 200px + padding: 20px = 240px total</div>

  <p class="label">border-box: padding fits inside declared width</p>
  <div class="border-box">width: 200px (padding included)</div>
</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

.container {
  background: #f8fafc;
  border: 2px dashed #94a3b8;
  border-radius: 8px;
  padding: 1rem;
}

.label {
  font-size: 0.78rem;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 0.4rem;
  margin-top: 0.5rem;
}

.content-box {
  box-sizing: content-box;
  width: 200px;
  padding: 20px;
  background: #fecaca;
  border: 2px solid #dc2626;
  margin-bottom: 0.5rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: #991b1b;
}

.border-box {
  box-sizing: border-box;
  width: 200px;
  padding: 20px;
  background: #bbf7d0;
  border: 2px solid #059669;
  font-size: 0.78rem;
  font-weight: 600;
  color: #065f46;
}`,
        challenge: {
          question: 'Which box-sizing value makes padding and border included in the declared width?',
          options: ['content-box', 'width-box', 'border-box', 'padding-box'],
          correct: 'border-box',
        },
      },
      {
        id: 'box-shadow',
        title: 'Box Shadow',
        concept: `\`box-shadow\` adds drop shadows. Syntax: \`offset-x offset-y blur spread color\`. Negative spread shrinks the shadow; positive grows it.\n\nMultiple shadows layer with commas — first is on top. The \`inset\` keyword creates inner shadows.`,
        html: `<div class="card subtle">Subtle — 0 1px 3px</div>
<div class="card medium">Medium — 0 4px 12px</div>
<div class="card large">Large — 0 10px 30px</div>
<div class="card colored">Colored shadow</div>
<div class="card inset-card">Inset shadow</div>
<div class="card multi">Multi-layer shadow</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; background: #f1f5f9; }

.card {
  background: white;
  border-radius: 10px;
  padding: 0.9rem 1.25rem;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #1e293b;
}

.subtle   { box-shadow: 0 1px 3px rgba(0,0,0,0.12); }
.medium   { box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
.large    { box-shadow: 0 10px 30px rgba(0,0,0,0.20); }
.colored  { box-shadow: 0 4px 14px rgba(37,99,235,0.4); }
.inset-card { box-shadow: inset 0 2px 6px rgba(0,0,0,0.12); background: #f1f5f9; }
.multi    { box-shadow: 0 2px 4px rgba(0,0,0,0.08), 0 8px 20px rgba(37,99,235,0.18); }`,
      },
    ],
  },

  {
    id: 'layout-basics',
    title: 'Layout Basics',
    emoji: '📐',
    lessons: [
      {
        id: 'display',
        title: 'The Display Property',
        concept: `\`display\` controls how an element participates in layout.\n\n**block**: full width, starts on a new line. **inline**: only as wide as content, no width/height. **inline-block**: inline but respects width and height. **none**: removes from layout. **flex** and **grid** enable their layout models on the element's direct children.`,
        html: `<p>Text with <span class="inline">inline span</span> flowing in the text.</p>

<div class="block">Block — full width, new line</div>
<div class="block">Block — full width, new line</div>

<span class="iblock">inline-block</span>
<span class="iblock">inline-block</span>
<span class="iblock">inline-block</span>

<div class="hidden">You cannot see this (display: none)</div>
<p class="note">↑ A hidden div is above this line.</p>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

.inline {
  background: #fef3c7;
  color: #92400e;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 600;
}

.block {
  display: block;
  background: #dbeafe;
  color: #1e40af;
  padding: 0.5rem 1rem;
  margin-bottom: 0.25rem;
  border-radius: 6px;
  font-weight: 600;
}

.iblock {
  display: inline-block;
  background: #dcfce7;
  color: #166534;
  padding: 0.3rem 0.75rem;
  border-radius: 6px;
  width: 110px;
  text-align: center;
  font-weight: 600;
  margin-right: 4px;
}

.hidden { display: none; }
.note   { color: #64748b; font-size: 0.85rem; margin-top: 0.5rem; }`,
      },
      {
        id: 'position',
        title: 'Positioning',
        concept: `**static** (default) — normal flow. **relative** — offset from its normal position; still takes up space. **absolute** — removed from flow, positioned relative to the nearest non-static ancestor. **fixed** — stays in viewport while scrolling. **sticky** — scrolls normally until it hits a threshold, then sticks.`,
        html: `<div class="rel-parent">
  relative parent
  <div class="abs-child">absolute</div>
</div>

<div class="rel-nudge">relative top:-8px left:16px</div>

<div class="scroll-box">
  <p>Scroll down inside this box…</p>
  <div class="sticky-bar">sticky bar</div>
  <p>Content after sticky</p>
  <p>More content…</p>
  <p>Even more content…</p>
</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

.rel-parent {
  position: relative;
  background: #dbeafe;
  padding: 2rem 1rem 1rem;
  border-radius: 8px;
  border: 2px dashed #93c5fd;
  margin-bottom: 0.75rem;
  font-weight: 600;
  color: #1e40af;
}

.abs-child {
  position: absolute;
  top: 6px; right: 6px;
  background: #2563eb;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.rel-nudge {
  position: relative;
  top: -8px; left: 16px;
  background: #fef3c7;
  color: #92400e;
  padding: 0.4rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.scroll-box {
  height: 120px;
  overflow-y: scroll;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  padding: 0.5rem;
}

.sticky-bar {
  position: sticky;
  top: 0;
  background: #7c3aed;
  color: white;
  padding: 4px 10px;
  border-radius: 4px;
  font-weight: 700;
  font-size: 0.85rem;
}`,
        challenge: {
          question: 'Which position value removes an element from the normal flow, positioning it relative to its nearest non-static ancestor?',
          options: ['relative', 'fixed', 'absolute', 'sticky'],
          correct: 'absolute',
        },
      },
      {
        id: 'overflow',
        title: 'Overflow & Z-index',
        concept: `\`overflow\` controls what happens when content exceeds its container. \`visible\` (default) — spills out. \`hidden\` — clips. \`scroll\` — always shows scrollbar. \`auto\` — scrollbar only when needed.\n\n\`z-index\` controls the stacking order of positioned elements (anything except \`static\`). Higher value = on top.`,
        html: `<div class="box vis">overflow: visible — content spills out of this fixed-height box if it overflows</div>
<div class="box hid">overflow: hidden — content is clipped at the boundary of this box no matter what</div>
<div class="box aut">overflow: auto — Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</div>

<div class="stack-wrap">
  <div class="stack s1">z:1</div>
  <div class="stack s2">z:2</div>
  <div class="stack s3">z:3</div>
</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

.box {
  height: 55px;
  border: 2px solid #93c5fd;
  border-radius: 6px;
  background: #eff6ff;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.83rem;
}

.vis { overflow: visible; }
.hid { overflow: hidden; }
.aut { overflow: auto; }

.stack-wrap {
  position: relative;
  height: 90px;
  margin-top: 1rem;
}

.stack {
  position: absolute;
  width: 100px; height: 55px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
}

.s1 { background: #7c3aed; left: 0;   top: 0;   z-index: 1; }
.s2 { background: #2563eb; left: 55px; top: 18px; z-index: 2; }
.s3 { background: #059669; left: 110px; top: 36px; z-index: 3; }`,
      },
    ],
  },

  {
    id: 'flexbox',
    title: 'Flexbox',
    emoji: '↔️',
    lessons: [
      {
        id: 'flex-container',
        title: 'Flex Container',
        concept: `Flexbox is a one-dimensional layout model. Apply \`display: flex\` to a container — its direct children become flex items that arrange horizontally by default.\n\nFlex items stretch to fill the container height. The \`gap\` property adds consistent space between items without margin tricks.`,
        html: `<p class="lbl">Normal block elements:</p>
<div class="container no-flex">
  <div class="box">A</div>
  <div class="box">B</div>
  <div class="box">C</div>
</div>

<p class="lbl">display: flex</p>
<div class="container flex">
  <div class="box">A</div>
  <div class="box">B</div>
  <div class="box">C</div>
</div>

<p class="lbl">display: flex + gap: 0.5rem</p>
<div class="container flex gap">
  <div class="box">A</div>
  <div class="box">B</div>
  <div class="box">C</div>
</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

.box {
  background: #2563eb;
  color: white;
  font-weight: 700;
  padding: 0.65rem 1.1rem;
  border-radius: 6px;
}

.container {
  background: #f1f5f9;
  padding: 0.5rem;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.flex { display: flex; }
.gap  { gap: 0.5rem; }

.lbl { font-size: 0.78rem; font-weight: 600; color: #64748b; margin: 0.5rem 0 0.25rem; }`,
      },
      {
        id: 'flex-direction',
        title: 'Direction & Wrap',
        concept: `\`flex-direction\` controls the main axis. \`row\` (default) flows left-to-right. \`column\` flows top-to-bottom. The \`-reverse\` variants flip the order.\n\nBy default items squeeze onto one line. \`flex-wrap: wrap\` lets items flow to the next line when they run out of space — the foundation of simple responsive layouts.`,
        html: `<p class="lbl">row (default)</p>
<div class="flex row"><div class="box">1</div><div class="box">2</div><div class="box">3</div></div>

<p class="lbl">column</p>
<div class="flex col"><div class="box">1</div><div class="box">2</div><div class="box">3</div></div>

<p class="lbl">row-reverse</p>
<div class="flex row-rev"><div class="box">1</div><div class="box">2</div><div class="box">3</div></div>

<p class="lbl">wrap</p>
<div class="flex wrap">
  <div class="box w">One</div><div class="box w">Two</div>
  <div class="box w">Three</div><div class="box w">Four</div>
</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

.flex {
  display: flex;
  gap: 0.4rem;
  background: #f1f5f9;
  padding: 0.4rem;
  border-radius: 8px;
  margin-bottom: 0.4rem;
}

.box {
  background: #7c3aed;
  color: white;
  font-weight: 700;
  padding: 0.45rem 0.9rem;
  border-radius: 5px;
  font-size: 0.85rem;
}

.row     { flex-direction: row; }
.col     { flex-direction: column; }
.row-rev { flex-direction: row-reverse; }
.wrap    { flex-wrap: wrap; }
.w       { width: 110px; text-align: center; }

.lbl { font-size: 0.78rem; font-weight: 600; color: #64748b; margin: 0.5rem 0 0.2rem; }`,
      },
      {
        id: 'justify-align',
        title: 'Justify & Align',
        concept: `**\`justify-content\`** distributes items along the main axis: \`flex-start\`, \`center\`, \`flex-end\`, \`space-between\`, \`space-around\`, \`space-evenly\`.\n\n**\`align-items\`** aligns items on the cross axis: \`stretch\` (default), \`flex-start\`, \`flex-end\`, \`center\`, \`baseline\`.`,
        html: `<div class="flex jc-start"><div class="b">A</div><div class="b">B</div><div class="b">C</div></div>
<div class="flex jc-center"><div class="b">A</div><div class="b">B</div><div class="b">C</div></div>
<div class="flex jc-end"><div class="b">A</div><div class="b">B</div><div class="b">C</div></div>
<div class="flex jc-between"><div class="b">A</div><div class="b">B</div><div class="b">C</div></div>
<div class="flex jc-evenly"><div class="b">A</div><div class="b">B</div><div class="b">C</div></div>

<p class="lbl">align-items: center</p>
<div class="flex tall ai-center">
  <div class="b" style="height:28px">sm</div>
  <div class="b" style="height:48px">md</div>
  <div class="b" style="height:68px">lg</div>
</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

.flex {
  display: flex;
  gap: 0.3rem;
  background: #f1f5f9;
  padding: 0.35rem;
  border-radius: 6px;
  margin-bottom: 0.3rem;
}

.b {
  background: #059669;
  color: white;
  font-weight: 700;
  padding: 0.35rem 0.7rem;
  border-radius: 5px;
  font-size: 0.82rem;
  display: flex;
  align-items: center;
}

.jc-start   { justify-content: flex-start; }
.jc-center  { justify-content: center; }
.jc-end     { justify-content: flex-end; }
.jc-between { justify-content: space-between; }
.jc-evenly  { justify-content: space-evenly; }

.tall { height: 90px; }
.ai-center { align-items: center; }

.lbl { font-size: 0.78rem; font-weight: 600; color: #64748b; margin: 0.5rem 0 0.2rem; }`,
        challenge: {
          question: 'Which property distributes flex items along the main axis?',
          options: ['align-items', 'flex-wrap', 'justify-content', 'align-content'],
          correct: 'justify-content',
        },
      },
      {
        id: 'flex-items',
        title: 'Flex Items',
        concept: `Items control their own sizing. **\`flex-grow\`**: fraction of remaining space to claim (0 = don't grow). **\`flex-shrink\`**: whether to shrink when space is tight. **\`flex-basis\`**: the initial size before grow/shrink.\n\nThe shorthand \`flex: 1\` sets grow=1, shrink=1, basis=0 — items grow equally to fill available space.`,
        html: `<p class="lbl">flex-grow</p>
<div class="row">
  <div class="b g0">grow:0</div>
  <div class="b g1">grow:1</div>
  <div class="b g2">grow:2</div>
</div>

<p class="lbl">flex: 1 on all — equal widths</p>
<div class="row">
  <div class="b f1">Nav</div>
  <div class="b f1">Main Content</div>
  <div class="b f1">Aside</div>
</div>

<p class="lbl">fixed + flex-fill + fixed</p>
<div class="row">
  <div class="b fixed">80px</div>
  <div class="b fill">fills rest</div>
  <div class="b fixed">80px</div>
</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

.row {
  display: flex;
  gap: 0.4rem;
  background: #f1f5f9;
  padding: 0.4rem;
  border-radius: 6px;
  margin-bottom: 0.4rem;
}

.b {
  background: #dc2626;
  color: white;
  font-weight: 600;
  padding: 0.4rem;
  border-radius: 5px;
  font-size: 0.78rem;
  text-align: center;
}

.g0 { flex-grow: 0; }
.g1 { flex-grow: 1; }
.g2 { flex-grow: 2; }

.f1 { flex: 1; }

.fixed { flex: 0 0 80px; }
.fill  { flex: 1; background: #7c3aed; }

.lbl { font-size: 0.78rem; font-weight: 600; color: #64748b; margin: 0.5rem 0 0.2rem; }`,
      },
    ],
  },

  {
    id: 'grid',
    title: 'CSS Grid',
    emoji: '🔲',
    lessons: [
      {
        id: 'grid-basics',
        title: 'Grid Container',
        concept: `CSS Grid is a two-dimensional layout system — rows and columns at once. Apply \`display: grid\` and define columns with \`grid-template-columns\`.\n\nThe \`fr\` unit means "fraction of available space". \`repeat(3, 1fr)\` is shorthand for three equal columns.`,
        html: `<p class="lbl">repeat(3, 1fr)</p>
<div class="grid g3">
  <div class="cell">1</div><div class="cell">2</div><div class="cell">3</div>
  <div class="cell">4</div><div class="cell">5</div><div class="cell">6</div>
</div>

<p class="lbl">1fr 2fr 1fr</p>
<div class="grid g-asym">
  <div class="cell">Sidebar</div>
  <div class="cell">Main</div>
  <div class="cell">Aside</div>
</div>

<p class="lbl">repeat(4, 1fr)</p>
<div class="grid g4">
  <div class="cell">A</div><div class="cell">B</div>
  <div class="cell">C</div><div class="cell">D</div>
</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

.grid {
  display: grid;
  gap: 0.5rem;
  background: #f1f5f9;
  padding: 0.5rem;
  border-radius: 8px;
  margin-bottom: 0.75rem;
}

.cell {
  background: #2563eb;
  color: white;
  font-weight: 700;
  padding: 0.75rem;
  border-radius: 6px;
  text-align: center;
}

.g3    { grid-template-columns: repeat(3, 1fr); }
.g-asym { grid-template-columns: 1fr 2fr 1fr; }
.g4    { grid-template-columns: repeat(4, 1fr); }

.lbl { font-size: 0.78rem; font-weight: 600; color: #64748b; margin: 0.5rem 0 0.25rem; }`,
        challenge: {
          question: 'What does the `fr` unit in CSS Grid represent?',
          options: ['fixed ratio', 'frame rate', 'fraction of available space', 'full row'],
          correct: 'fraction of available space',
        },
      },
      {
        id: 'grid-areas',
        title: 'Grid Template Areas',
        concept: `\`grid-template-areas\` lets you name regions and draw the layout visually. Each string is a row; spaces separate cells. Assign items with \`grid-area: name\`.\n\nA dot (\`.\`) represents an empty cell. This approach is excellent for page-level layouts — the template reads like ASCII art of the final design.`,
        html: `<div class="page">
  <header class="hdr">Header</header>
  <nav class="nav">Nav</nav>
  <main class="main">Main Content</main>
  <aside class="aside">Sidebar</aside>
  <footer class="ftr">Footer</footer>
</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

.page {
  display: grid;
  grid-template-columns: 140px 1fr 120px;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "hdr  hdr   hdr"
    "nav  main  aside"
    "ftr  ftr   ftr";
  gap: 0.4rem;
  min-height: 220px;
}

.hdr, .nav, .main, .aside, .ftr {
  color: white;
  font-weight: 700;
  padding: 0.75rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

.hdr   { grid-area: hdr;   background: #1e40af; }
.nav   { grid-area: nav;   background: #7c3aed; }
.main  { grid-area: main;  background: #059669; }
.aside { grid-area: aside; background: #d97706; }
.ftr   { grid-area: ftr;   background: #475569; }`,
      },
      {
        id: 'grid-span',
        title: 'Span & Auto-placement',
        concept: `Items can span multiple columns with \`grid-column: span 2\` or exact lines: \`grid-column: 1 / 4\`.\n\n\`auto-fill\` with \`minmax()\` creates responsive grids that reflow automatically without media queries — one of CSS Grid's most powerful features.`,
        html: `<div class="grid">
  <div class="cell span2">spans 2 columns</div>
  <div class="cell">C</div>
  <div class="cell">D</div>
  <div class="cell span3">spans all 3</div>
  <div class="cell">E</div><div class="cell">F</div><div class="cell">G</div>
</div>

<p class="lbl">auto-fill + minmax — resize the preview to see it reflow:</p>
<div class="auto-grid">
  <div class="cell">1</div><div class="cell">2</div><div class="cell">3</div>
  <div class="cell">4</div><div class="cell">5</div><div class="cell">6</div>
</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  background: #f1f5f9;
  padding: 0.5rem;
  border-radius: 8px;
  margin-bottom: 0.75rem;
}

.cell {
  background: #7c3aed;
  color: white;
  font-weight: 700;
  padding: 0.65rem;
  border-radius: 6px;
  text-align: center;
  font-size: 0.85rem;
}

.span2 { grid-column: span 2; background: #2563eb; }
.span3 { grid-column: span 3; background: #059669; }

.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 0.5rem;
  background: #f1f5f9;
  padding: 0.5rem;
  border-radius: 8px;
}

.lbl { font-size: 0.78rem; font-weight: 600; color: #64748b; margin: 0.5rem 0 0.25rem; }`,
      },
    ],
  },

  {
    id: 'animations',
    title: 'Animations',
    emoji: '✨',
    lessons: [
      {
        id: 'transitions',
        title: 'Transitions',
        concept: `\`transition\` smoothly animates property changes. Syntax: \`property duration easing delay\`.\n\nCommon easings: \`ease\`, \`ease-in\`, \`ease-out\`, \`ease-in-out\`, \`linear\`. For best performance, prefer animating \`transform\` and \`opacity\` — they run on the GPU and don't trigger layout.`,
        html: `<p class="lbl">Hover over each button:</p>
<button class="btn t-bg">background color</button>
<button class="btn t-scale">transform scale</button>
<button class="btn t-shadow">box shadow</button>
<button class="btn t-multi">color + translate</button>
<button class="btn t-slow">slow — 1s ease-in-out</button>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

.btn {
  display: block;
  width: 220px;
  padding: 0.7rem 1.5rem;
  margin-bottom: 0.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  background: #2563eb;
  color: white;
}

.t-bg     { transition: background 0.3s ease; }
.t-scale  { transition: transform 0.2s ease; }
.t-shadow { transition: box-shadow 0.25s ease, transform 0.25s ease; }
.t-multi  { transition: background 0.3s, transform 0.2s; }
.t-slow   { transition: background 1s ease-in-out; }

.t-bg:hover     { background: #dc2626; }
.t-scale:hover  { transform: scale(1.07); }
.t-shadow:hover { box-shadow: 0 8px 24px rgba(37,99,235,0.45); transform: translateY(-2px); }
.t-multi:hover  { background: #059669; transform: translateX(4px); }
.t-slow:hover   { background: #7c3aed; }

.lbl { font-size: 0.78rem; font-weight: 600; color: #64748b; margin-bottom: 0.5rem; }`,
        challenge: {
          question: 'Which properties are best to animate for GPU-accelerated performance?',
          options: ['width / height', 'margin / padding', 'transform / opacity', 'left / top'],
          correct: 'transform / opacity',
        },
      },
      {
        id: 'transforms',
        title: 'Transforms',
        concept: `\`transform\` applies geometric changes without affecting layout flow. Key functions:\n\n**translate(x,y)** — moves. **scale(x,y)** — resizes. **rotate(deg)** — rotates. **skew(x,y)** — shears. Chain multiple transforms in one declaration: \`transform: translateY(-4px) scale(1.05)\`.`,
        html: `<div class="grid">
  <div class="box t1">translate</div>
  <div class="box t2">scale</div>
  <div class="box t3">rotate</div>
  <div class="box t4">skewX</div>
  <div class="box t5">chained</div>
  <div class="box t6">origin: top left</div>
</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 30px; }

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.box {
  background: #7c3aed;
  color: white;
  font-weight: 600;
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.8rem;
  text-align: center;
}

.t1 { transform: translate(10px, -6px); }
.t2 { transform: scale(1.15); }
.t3 { transform: rotate(12deg); }
.t4 { transform: skewX(14deg); }
.t5 { transform: translateX(8px) rotate(6deg) scale(1.05); background: #2563eb; }
.t6 { transform: rotate(10deg); transform-origin: top left; background: #059669; }`,
      },
      {
        id: 'keyframes',
        title: '@keyframes Animations',
        concept: `\`@keyframes\` define multi-step animations with percentage waypoints. Apply with the \`animation\` shorthand: \`name duration easing delay iteration-count direction\`.\n\n\`infinite\` loops forever. \`alternate\` reverses on even runs. \`animation-fill-mode: both\` keeps the final frame after the animation ends.`,
        html: `<div class="demos">
  <div class="box pulse">pulse</div>
  <div class="box spin-box">spin</div>
  <div class="box bounce">bounce</div>
  <div class="box slide">slide in</div>
  <div class="box shake">shake</div>
  <div class="box fade">fade loop</div>
</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50%       { transform: scale(1.12); opacity: 0.75; }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-14px); }
}

@keyframes slideIn {
  from { transform: translateX(-30px); opacity: 0; }
  to   { transform: translateX(0);     opacity: 1; }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-7px); }
  40%, 80% { transform: translateX(7px); }
}

@keyframes fadeLoop {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.2; }
}

.demos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.box {
  background: #2563eb;
  color: white;
  font-weight: 700;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  font-size: 0.85rem;
}

.pulse    { animation: pulse 1.4s ease-in-out infinite; background: #7c3aed; }
.spin-box { animation: spin 2s linear infinite; border-radius: 50%; background: #059669; }
.bounce   { animation: bounce 0.9s ease-in-out infinite; }
.slide    { animation: slideIn 0.7s ease-out both; background: #dc2626; }
.shake    { animation: shake 0.6s ease-in-out infinite; background: #d97706; }
.fade     { animation: fadeLoop 1.6s ease-in-out infinite; background: #0891b2; }`,
      },
    ],
  },
  {
    id: 'custom-properties',
    title: 'CSS Variables',
    emoji: '🔧',
    lessons: [
      {
        id: 'declaring-variables',
        title: 'Declaring & Using Variables',
        concept: `CSS custom properties (variables) store reusable values. Declare them with a double-dash prefix inside a selector — usually \`:root\` so they're available everywhere. Use them with \`var(--name)\`.\n\nVariables cascade like regular CSS — you can override them in a child element. They also accept a fallback value: \`var(--color, red)\` uses \`red\` if \`--color\` isn't defined.`,
        html: `<div class="card">
  <h2>Card Title</h2>
  <p>Card body text goes here.</p>
  <button class="btn">Action</button>
</div>
<div class="card alt">
  <h2>Alternate Card</h2>
  <p>Same structure, different theme via variables.</p>
  <button class="btn">Action</button>
</div>`,
        css: `:root {
  --color-primary: #2563eb;
  --color-bg: #eff6ff;
  --color-text: #1e40af;
  --radius: 10px;
  --spacing: 1rem;
}

body { font-family: system-ui, sans-serif; padding: 20px; }

.card {
  background: var(--color-bg);
  border: 2px solid var(--color-primary);
  border-radius: var(--radius);
  padding: var(--spacing);
  margin-bottom: 1rem;
}

h2 { color: var(--color-text); margin-bottom: 0.5rem; }
p  { color: var(--color-text); opacity: 0.8; margin-bottom: 0.75rem; }

.btn {
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: calc(var(--radius) / 2);
  padding: 0.4rem 1rem;
  cursor: pointer;
  font-weight: 600;
}

/* Override variables locally */
.alt {
  --color-primary: #7c3aed;
  --color-bg: #f5f3ff;
  --color-text: #4c1d95;
}`,
        challenge: {
          question: 'Which syntax correctly declares a CSS custom property?',
          options: ['$color: red', '--color: red', 'var-color: red', '@color: red'],
          correct: '--color: red',
        },
      },
      {
        id: 'variables-theming',
        title: 'Theming with Variables',
        concept: `One of the most powerful uses of CSS variables is theming. Define all colours as variables on \`:root\`, then override them on a \`[data-theme="dark"]\` selector — instant dark mode with a single attribute change.\n\nVariables can reference other variables, enabling a token system where semantic names (\`--color-text\`) reference primitive values (\`--gray-900\`).`,
        html: `<div class="page" id="page">
  <header class="header">
    <span class="logo">MyApp</span>
    <button class="toggle" onclick="document.getElementById('page').dataset.theme = document.getElementById('page').dataset.theme === 'dark' ? '' : 'dark'">Toggle theme</button>
  </header>
  <main class="content">
    <h1>Hello, CSS Variables</h1>
    <p>Click the button to switch themes. All colours come from variables — no extra CSS needed.</p>
    <div class="card">A card component using theme variables.</div>
  </main>
</div>`,
        css: `/* Light theme */
#page {
  --bg: #ffffff;
  --surface: #f1f5f9;
  --text: #0f172a;
  --text-muted: #64748b;
  --border: #e2e8f0;
  --accent: #2563eb;
  --accent-text: #ffffff;
}

/* Dark theme */
#page[data-theme="dark"] {
  --bg: #0f172a;
  --surface: #1e293b;
  --text: #f1f5f9;
  --text-muted: #94a3b8;
  --border: #334155;
  --accent: #3b82f6;
}

body { margin: 0; font-family: system-ui, sans-serif; }

.page { background: var(--bg); color: var(--text); min-height: 100vh; transition: background 0.3s, color 0.3s; }

.header {
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  padding: 0.75rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo { font-weight: 800; font-size: 1.1rem; color: var(--accent); }

.toggle {
  background: var(--accent);
  color: var(--accent-text);
  border: none;
  border-radius: 6px;
  padding: 0.35rem 0.85rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
}

.content { padding: 1.5rem 1.25rem; }
h1 { margin-bottom: 0.5rem; }
p  { color: var(--text-muted); margin-bottom: 1rem; }

.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1rem;
  color: var(--text-muted);
  font-size: 0.9rem;
}`,
      },
      {
        id: 'calc-function',
        title: 'calc() & Math Functions',
        concept: `\`calc()\` lets you mix units and do arithmetic in CSS: \`width: calc(100% - 2rem)\`. This is essential when you need to subtract a fixed offset from a fluid measurement.\n\n\`min()\`, \`max()\`, and \`clamp()\` go further. \`clamp(min, ideal, max)\` locks a value between a minimum and maximum — perfect for fluid typography that never gets too small or too large.`,
        html: `<div class="demo">
  <div class="calc-box">calc(100% - 40px)</div>
</div>
<hr>
<p class="fluid-sm">clamp(0.8rem, 2vw, 1rem) — small fluid text</p>
<p class="fluid-md">clamp(1rem, 3vw, 1.5rem) — medium fluid text</p>
<p class="fluid-lg">clamp(1.5rem, 5vw, 3rem) — large fluid heading</p>
<hr>
<div class="grid">
  <div class="item">min(200px, 100%)</div>
  <div class="item">min(200px, 100%)</div>
  <div class="item">min(200px, 100%)</div>
</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

.demo {
  background: #f1f5f9;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 1rem;
}

.calc-box {
  width: calc(100% - 40px);
  background: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
}

.fluid-sm { font-size: clamp(0.8rem, 2vw, 1rem);   margin-bottom: 0.5rem; }
.fluid-md { font-size: clamp(1rem, 3vw, 1.5rem);   margin-bottom: 0.5rem; font-weight: 600; }
.fluid-lg { font-size: clamp(1.5rem, 5vw, 3rem);   margin-bottom: 0.5rem; font-weight: 800; color: #1e40af; }

hr { margin: 0.75rem 0; border: none; border-top: 1px solid #e2e8f0; }

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.item {
  width: min(200px, 100%);
  background: #7c3aed;
  color: white;
  padding: 0.6rem;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
  text-align: center;
}`,
        challenge: {
          question: 'Which CSS function locks a value between a minimum and maximum?',
          options: ['calc()', 'min()', 'max()', 'clamp()'],
          correct: 'clamp()',
        },
      },
    ],
  },

  {
    id: 'pseudo-elements',
    title: 'Pseudo-elements',
    emoji: '✏️',
    lessons: [
      {
        id: 'before-after',
        title: '::before & ::after',
        concept: `Pseudo-elements insert virtual elements before or after an element's content — without adding any HTML. They require a \`content\` property (can be an empty string \`""\`) and can be styled like real elements.\n\n\`::before\` is placed inside the element, before the content. \`::after\` is placed inside the element, after the content. Both are \`inline\` by default but can be changed to \`block\` or \`flex\`.`,
        html: `<p class="quote">Design is not just what it looks like and feels like. Design is how it works.</p>

<div class="badge">New</div>

<ul class="fancy-list">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

/* Decorative quotes */
.quote {
  position: relative;
  padding: 1rem 1rem 1rem 3rem;
  background: #f8fafc;
  border-radius: 8px;
  font-style: italic;
  color: #475569;
  margin-bottom: 1rem;
}

.quote::before {
  content: '“';
  position: absolute;
  left: 0.5rem;
  top: 0;
  font-size: 3rem;
  color: #2563eb;
  line-height: 1;
}

/* Badge with dot */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: #dcfce7;
  color: #166534;
  font-weight: 700;
  font-size: 0.8rem;
  padding: 3px 10px;
  border-radius: 999px;
  margin-bottom: 1rem;
}

.badge::before {
  content: '';
  display: block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #16a34a;
}

/* Custom list markers */
.fancy-list { list-style: none; padding: 0; }

.fancy-list li {
  position: relative;
  padding-left: 1.5rem;
  margin-bottom: 0.4rem;
  color: #374151;
}

.fancy-list li::before {
  content: '→';
  position: absolute;
  left: 0;
  color: #2563eb;
  font-weight: 700;
}`,
        challenge: {
          question: 'What property is required for ::before and ::after to render?',
          options: ['display', 'content', 'position', 'visibility'],
          correct: 'content',
        },
      },
      {
        id: 'pseudo-decorative',
        title: 'Decorative Techniques',
        concept: `Because \`::before\` and \`::after\` are fully styled elements, they can create visual effects that would otherwise require extra HTML — overlays, underline animations, corner accents, and more.\n\nSetting \`position: absolute\` on a pseudo-element (with \`position: relative\` on the parent) is the most common pattern for decorative effects.`,
        html: `<h2 class="underline-title">Animated Underline</h2>
<h2 class="corner-title">Corner Accent</h2>

<div class="overlay-card">
  <p>Card with overlay on hover</p>
</div>

<button class="shimmer-btn">Shimmer Button</button>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

/* Animated underline */
.underline-title {
  display: inline-block;
  position: relative;
  margin-bottom: 1.5rem;
  color: #1e293b;
}
.underline-title::after {
  content: '';
  position: absolute;
  bottom: -4px; left: 0;
  width: 100%; height: 3px;
  background: linear-gradient(to right, #2563eb, #7c3aed);
  border-radius: 2px;
}

/* Corner accent */
.corner-title {
  position: relative;
  padding-left: 1rem;
  color: #1e293b;
  margin-bottom: 1.5rem;
}
.corner-title::before {
  content: '';
  position: absolute;
  left: 0; top: 0;
  width: 4px; height: 100%;
  background: #059669;
  border-radius: 2px;
}

/* Hover overlay card */
.overlay-card {
  position: relative;
  background: #2563eb;
  color: white;
  padding: 1.5rem;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 1rem;
  cursor: pointer;
}
.overlay-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0);
  transition: background 0.2s;
}
.overlay-card:hover::after { background: rgba(255,255,255,0.12); }

/* Shimmer */
.shimmer-btn {
  position: relative;
  overflow: hidden;
  background: #7c3aed;
  color: white;
  border: none;
  padding: 0.65rem 1.5rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
}
.shimmer-btn::after {
  content: '';
  position: absolute;
  top: -50%; left: -60%;
  width: 40%; height: 200%;
  background: rgba(255,255,255,0.25);
  transform: skewX(-20deg);
  transition: left 0.5s;
}
.shimmer-btn:hover::after { left: 120%; }`,
      },
      {
        id: 'pseudo-first-last',
        title: '::first-line & ::first-letter',
        concept: `\`::first-letter\` targets the first character of a block element — classic for drop caps in editorial layouts. \`::first-line\` targets the first rendered line, regardless of where the line wraps.\n\nBoth pseudo-elements accept only a limited set of CSS properties (font, color, text, background, margin, padding, border, float for first-letter).`,
        html: `<p class="dropcap">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>

<p class="first-line-style">The first line of this paragraph is styled differently from the rest of the text. Resize the window to see the first-line pseudo-element adapt to the actual line break.</p>

<p class="both">Both pseudo-elements can be combined on the same element for rich editorial typographic effects without any extra markup.</p>`,
        css: `body { font-family: Georgia, serif; padding: 20px; max-width: 600px; line-height: 1.7; }

.dropcap::first-letter {
  float: left;
  font-size: 4rem;
  line-height: 0.8;
  margin: 0.05em 0.1em 0 0;
  color: #2563eb;
  font-weight: 700;
}

.first-line-style { margin-top: 1.5rem; }
.first-line-style::first-line {
  font-weight: 700;
  color: #7c3aed;
  font-style: italic;
}

.both { margin-top: 1.5rem; }
.both::first-letter {
  font-size: 2.5rem;
  color: #059669;
  font-weight: 900;
  float: left;
  margin: 0 0.08em 0 0;
  line-height: 0.9;
}
.both::first-line {
  color: #374151;
  font-weight: 600;
}`,
      },
    ],
  },

  {
    id: 'responsive',
    title: 'Responsive Design',
    emoji: '📱',
    lessons: [
      {
        id: 'media-queries',
        title: 'Media Queries',
        concept: `Media queries apply CSS only when certain conditions are met — typically the viewport width. \`@media (max-width: 768px)\` targets screens 768px or narrower. \`@media (min-width: 1024px)\` targets wider screens.\n\n**Mobile-first** means writing base styles for small screens and adding \`min-width\` queries as the screen grows. This tends to produce leaner, more maintainable CSS than desktop-first with \`max-width\` overrides.`,
        html: `<div class="page">
  <header class="header">Header</header>
  <div class="layout">
    <aside class="sidebar">Sidebar</aside>
    <main class="content">
      <h2>Main Content</h2>
      <p>Resize the preview pane to see the layout change. On narrow screens the sidebar moves below the content.</p>
    </main>
  </div>
</div>`,
        css: `body { font-family: system-ui, sans-serif; margin: 0; }

.header {
  background: #1e40af;
  color: white;
  padding: 1rem;
  font-weight: 700;
}

/* Mobile first — single column */
.layout {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.sidebar {
  background: #eff6ff;
  border: 2px dashed #93c5fd;
  padding: 1rem;
  border-radius: 8px;
  font-weight: 600;
  color: #1e40af;
  order: 2; /* sidebar below on mobile */
}

.content {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
}

/* Tablet and up — two columns */
@media (min-width: 600px) {
  .layout {
    flex-direction: row;
  }
  .sidebar {
    width: 200px;
    flex-shrink: 0;
    order: 0;
  }
}`,
        challenge: {
          question: 'Which media query approach writes base styles for mobile and adds wider-screen styles on top?',
          options: ['desktop-first', 'mobile-first', 'tablet-first', 'fluid-first'],
          correct: 'mobile-first',
        },
      },
      {
        id: 'fluid-typography',
        title: 'Fluid Typography',
        concept: `Fluid typography scales smoothly between viewport sizes without breakpoint jumps. \`clamp(min, preferred, max)\` is the modern standard — the preferred value uses \`vw\` (viewport width) units to tie the font size to the screen.\n\nThe formula \`clamp(1rem, 0.5rem + 2vw, 2rem)\` means: never smaller than 1rem, never larger than 2rem, and scales between them using 0.5rem + 2vw.`,
        html: `<div class="demo">
  <h1 class="display">Display Heading</h1>
  <h2 class="title">Section Title</h2>
  <p class="body-text">Body text that scales fluidly. Resize the preview to see it shrink and grow without jumping at breakpoints.</p>
  <p class="caption">Caption — stays small</p>

  <div class="container">
    <h3 class="fluid-heading">Container-fluid heading</h3>
    <p>This container also has fluid padding that scales with the viewport.</p>
  </div>
</div>`,
        css: `body { font-family: system-ui, sans-serif; margin: 0; padding: 20px; }

/* Fluid sizes using clamp */
.display    { font-size: clamp(2rem,   5vw + 1rem, 4rem);   margin-bottom: 0.25em; color: #1e293b; }
.title      { font-size: clamp(1.25rem, 3vw + 0.5rem, 2rem); margin-bottom: 0.5em;  color: #334155; }
.body-text  { font-size: clamp(0.9rem, 1vw + 0.7rem, 1.1rem); line-height: 1.6; margin-bottom: 1rem; }
.caption    { font-size: clamp(0.75rem, 0.5vw + 0.6rem, 0.875rem); color: #64748b; }

/* Fluid spacing */
.container {
  margin-top: clamp(1rem, 4vw, 2.5rem);
  padding: clamp(0.75rem, 3vw, 2rem);
  background: #eff6ff;
  border-radius: clamp(6px, 1.5vw, 16px);
  border: 2px solid #bfdbfe;
}

.fluid-heading {
  font-size: clamp(1rem, 2vw + 0.5rem, 1.5rem);
  color: #1d4ed8;
  margin-bottom: 0.5rem;
}`,
      },
      {
        id: 'responsive-patterns',
        title: 'Responsive Patterns',
        concept: `Modern CSS layout tools (Grid and Flexbox) often handle responsiveness without media queries. \`auto-fill\` + \`minmax()\` creates a grid that reflows when items can't fit. \`flex-wrap\` lets flex items wrap to the next line naturally.\n\nThese intrinsic layout patterns are more resilient than breakpoint-based approaches because they react to the actual container size rather than the viewport.`,
        html: `<p class="label">Auto-fill grid — reflows without media queries:</p>
<div class="auto-grid">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
  <div class="card">Card 5</div>
  <div class="card">Card 6</div>
</div>

<p class="label">Flex wrap — items naturally wrap:</p>
<div class="flex-wrap-demo">
  <div class="tag">HTML</div>
  <div class="tag">CSS</div>
  <div class="tag">JavaScript</div>
  <div class="tag">React</div>
  <div class="tag">TypeScript</div>
  <div class="tag">Node.js</div>
  <div class="tag">GraphQL</div>
</div>

<p class="label">Holy grail layout — sidebar + main + aside:</p>
<div class="holy-grail">
  <nav class="nav-col">Nav</nav>
  <main class="main-col">Main</main>
  <aside class="aside-col">Aside</aside>
</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 20px; }

.label { font-size: 0.78rem; font-weight: 700; color: #64748b; margin: 1rem 0 0.4rem; text-transform: uppercase; letter-spacing: 0.05em; }

.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.card {
  background: #2563eb;
  color: white;
  padding: 0.75rem;
  border-radius: 8px;
  font-weight: 600;
  text-align: center;
  font-size: 0.85rem;
}

.flex-wrap-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.tag {
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
  padding: 0.2rem 0.75rem;
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 600;
}

.holy-grail {
  display: grid;
  grid-template-columns: 80px 1fr 80px;
  gap: 0.5rem;
  height: 80px;
}

.nav-col, .main-col, .aside-col {
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.82rem;
  color: white;
}
.nav-col   { background: #7c3aed; }
.main-col  { background: #059669; }
.aside-col { background: #d97706; }`,
      },
    ],
  },

  // ── Modern Selectors ──────────────────────────────────────────────────────
  {
    id: 'modern-selectors',
    title: 'Modern Selectors',
    emoji: '🔍',
    lessons: [
      {
        id: 'is-where-has',
        title: ':is(), :where() & :has()',
        concept: `**:is()** and **:where()** match any selector in a list — they're shorthand for grouping selectors. The key difference: \`:is()\` takes the specificity of its most specific argument; \`:where()\` always has zero specificity.\n\n**:has()** is the "parent selector" CSS never had. It matches an element that contains a specific child or sibling. \`.card:has(img)\` styles cards that contain an image — without any JavaScript.`,
        html: `<div class="card">
  <h2>Text only card</h2>
  <p>No image here.</p>
</div>

<div class="card">
  <img src="https://picsum.photos/300/120?grayscale" alt="photo" />
  <h2>Card with image</h2>
  <p>:has(img) selects this one.</p>
</div>

<div class="card">
  <h2>Another text card</h2>
  <p>Also no image.</p>
</div>`,
        css: `body { padding: 16px; font-family: system-ui, sans-serif; display: flex; flex-direction: column; gap: 12px; }

/* :is() — groups h1,h2,h3 in one rule */
:is(h1, h2, h3) {
  color: #1d4ed8;
  margin: 0 0 6px;
}

/* :where() — same but zero specificity so it's easy to override */
:where(p) {
  color: #6b7280;
  margin: 0;
  font-size: 0.9rem;
}

.card {
  padding: 14px;
  border: 2px solid #e5e7eb;
  border-radius: 10px;
  overflow: hidden;
}

.card img {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 10px;
  display: block;
}

/* :has() — style the card differently when it contains an img */
.card:has(img) {
  border-color: #6366f1;
  background: #eef2ff;
}

.card:has(img) h2 {
  color: #4338ca;
}`,
      },
      {
        id: 'css-nesting',
        title: 'CSS Nesting',
        concept: `Native CSS nesting (no preprocessor needed) lets you write child rules inside their parent. Use \`&\` to refer to the parent selector — \`&:hover\` becomes \`.button:hover\`. Nesting reduces repetition and keeps related styles together.\n\nAll major browsers support native CSS nesting since 2023. No Sass or PostCSS required.`,
        html: `<nav class="nav">
  <a href="#" class="nav-link">Home</a>
  <a href="#" class="nav-link active">Docs</a>
  <a href="#" class="nav-link">Blog</a>
</nav>

<div class="card">
  <div class="card-header">
    <h2>Nested CSS card</h2>
  </div>
  <p>The styles for this card are nested — no repeated selectors.</p>
  <button class="btn">Primary</button>
  <button class="btn secondary">Secondary</button>
</div>`,
        css: `body { padding: 16px; font-family: system-ui, sans-serif; }

.nav {
  display: flex;
  gap: 4px;
  margin-bottom: 16px;

  .nav-link {
    padding: 6px 14px;
    border-radius: 6px;
    text-decoration: none;
    color: #374151;
    font-size: 0.9rem;

    &:hover {
      background: #f3f4f6;
      color: #111827;
    }

    &.active {
      background: #6366f1;
      color: white;
      font-weight: 600;
    }
  }
}

.card {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  overflow: hidden;

  .card-header {
    background: #f9fafb;
    padding: 12px 16px;
    border-bottom: 1px solid #e5e7eb;

    h2 { margin: 0; font-size: 1rem; color: #111827; }
  }

  p {
    padding: 12px 16px;
    color: #6b7280;
    font-size: 0.9rem;
    margin: 0;
  }

  .btn {
    margin: 0 16px 16px;
    padding: 7px 16px;
    border: none;
    border-radius: 6px;
    background: #6366f1;
    color: white;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 600;

    &:hover { background: #4f46e5; }

    &.secondary {
      background: white;
      color: #374151;
      border: 1px solid #d1d5db;

      &:hover { background: #f9fafb; }
    }
  }
}`,
      },
    ],
  },

  // ── Modern Layout ─────────────────────────────────────────────────────────
  {
    id: 'modern-layout',
    title: 'Modern Layout',
    emoji: '📐',
    lessons: [
      {
        id: 'container-queries',
        title: 'Container queries',
        concept: `**Container queries** style elements based on their *container's* size, not the viewport. A card in a narrow sidebar and the same card in a wide main area can have different layouts — no JavaScript, no media queries.\n\nUse \`container-type: inline-size\` on the parent, then \`@container (min-width: Xpx)\` to write styles that respond to that container.`,
        html: `<div class="layout">
  <aside class="sidebar">
    <div class="card">
      <img src="https://picsum.photos/60/60?grayscale" alt="" />
      <div>
        <strong>Sidebar card</strong>
        <p>Compact layout in narrow container</p>
      </div>
    </div>
  </aside>

  <main class="content">
    <div class="card">
      <img src="https://picsum.photos/80/80?grayscale" alt="" />
      <div>
        <strong>Main area card</strong>
        <p>Wider layout in a larger container</p>
      </div>
    </div>
  </main>
</div>`,
        css: `body { padding: 16px; font-family: system-ui, sans-serif; }

.layout {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 12px;
}

/* Mark both parents as containers */
.sidebar, .content {
  container-type: inline-size;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 12px;
}

/* Base: stacked layout */
.card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.card img {
  border-radius: 6px;
  width: 60px;
  height: 60px;
  object-fit: cover;
}

.card strong { font-size: 0.9rem; color: #111827; }
.card p { font-size: 0.8rem; color: #6b7280; margin: 0; }

/* When container is wider than 200px: switch to row layout */
@container (min-width: 200px) {
  .card {
    flex-direction: row;
    align-items: center;
  }

  .card img { width: 80px; height: 80px; }
  .card strong { font-size: 1rem; }
  .card p { font-size: 0.875rem; }
}`,
      },
      {
        id: 'css-subgrid',
        title: 'Subgrid',
        concept: `**Subgrid** lets a child element participate in its parent's grid tracks. Without subgrid, nested grids define their own independent tracks — so labels in one card don't align with labels in another. With \`grid-template-columns: subgrid\`, the child inherits the parent's column lines.`,
        html: `<p class="label">Without subgrid — content misaligned:</p>
<div class="grid no-subgrid">
  <div class="card">
    <div class="card-label">Name</div>
    <div class="card-value">Alice</div>
  </div>
  <div class="card">
    <div class="card-label">Department</div>
    <div class="card-value">Engineering</div>
  </div>
</div>

<p class="label">With subgrid — content aligns across cards:</p>
<div class="grid with-subgrid">
  <div class="card sub">
    <div class="card-label">Name</div>
    <div class="card-value">Alice</div>
  </div>
  <div class="card sub">
    <div class="card-label">Department</div>
    <div class="card-value">Engineering</div>
  </div>
</div>`,
        css: `body { padding: 16px; font-family: system-ui, sans-serif; }
.label { font-size: 0.8rem; color: #9ca3af; margin: 0 0 6px; font-weight: 600; }

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1px;
  background: #e5e7eb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 16px;
}

.card {
  background: white;
  padding: 12px;
}

.card-label {
  font-size: 0.75rem;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 4px;
}

.card-value {
  font-size: 1rem;
  color: #111827;
  font-weight: 600;
}

/* Subgrid: card spans 2 columns of the parent grid */
.card.sub {
  display: grid;
  grid-row: span 2;
  grid-template-rows: subgrid;
}

.card.sub .card-label { align-self: end; }
.card.sub .card-value { color: #6366f1; }`,
      },
      {
        id: 'scroll-snap',
        title: 'Scroll snap',
        concept: `**Scroll snap** creates carousel-like behaviour with pure CSS — no JavaScript. Set \`scroll-snap-type\` on the container and \`scroll-snap-align\` on the children. The browser snaps to the nearest child after each scroll gesture.\n\nUse \`scroll-snap-type: x mandatory\` for horizontal carousels and \`y mandatory\` for vertical slides.`,
        html: `<p class="hint">Scroll horizontally →</p>
<div class="carousel">
  <div class="slide" style="background:#6366f1">Slide 1</div>
  <div class="slide" style="background:#8b5cf6">Slide 2</div>
  <div class="slide" style="background:#ec4899">Slide 3</div>
  <div class="slide" style="background:#f59e0b">Slide 4</div>
  <div class="slide" style="background:#10b981">Slide 5</div>
</div>

<p class="hint" style="margin-top:16px">Scroll vertically ↓</p>
<div class="vscroll">
  <div class="vslide" style="background:#eff6ff;color:#1d4ed8">Section 1</div>
  <div class="vslide" style="background:#f0fdf4;color:#15803d">Section 2</div>
  <div class="vslide" style="background:#fef9c3;color:#854d0e">Section 3</div>
</div>`,
        css: `body { padding: 16px; font-family: system-ui, sans-serif; }
.hint { font-size: 0.8rem; color: #9ca3af; margin: 0 0 8px; }

.carousel {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  border-radius: 10px;
  padding-bottom: 4px;
}

.slide {
  flex: 0 0 85%;
  height: 120px;
  border-radius: 10px;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
  font-weight: 700;
}

.vscroll {
  height: 140px;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}

.vslide {
  height: 140px;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  border-bottom: 1px solid #e5e7eb;
}`,
      },
    ],
  },

  // ── Cascade & Specificity ─────────────────────────────────────────────────
  {
    id: 'cascade',
    title: 'Cascade & Layers',
    emoji: '🏗️',
    lessons: [
      {
        id: 'cascade-layers',
        title: '@layer',
        concept: `**@layer** lets you control the cascade without fighting specificity. Styles in earlier layers always lose to styles in later layers — regardless of selector specificity. This makes it easy to define a base layer, a components layer, and an overrides layer that always wins.\n\nUnlayered styles sit above all named layers, so third-party CSS in a layer can never accidentally override your code.`,
        html: `<button class="btn">Styled button</button>
<p class="note">The order of @layer declarations (not the order of rules) controls which wins.</p>

<div class="alert">Alert component</div>`,
        css: `body { padding: 20px; font-family: system-ui, sans-serif; }

/* Declare layer order — earlier = lower priority */
@layer base, components, overrides;

@layer base {
  .btn {
    padding: 8px 16px;
    background: gray;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
  }

  .alert {
    padding: 12px;
    background: #fee2e2;
    border-radius: 6px;
  }
}

@layer components {
  /* Higher specificity here BUT same layer as base
     — specificity still matters within a layer */
  .btn {
    background: #6366f1;
    border-radius: 8px;
    font-weight: 600;
  }
}

@layer overrides {
  /* This layer always wins over base & components */
  .btn:hover {
    background: #4f46e5;
    transform: translateY(-1px);
  }
}

.note {
  font-size: 0.85rem;
  color: #6b7280;
  margin: 12px 0;
}`,
      },
      {
        id: 'logical-properties',
        title: 'Logical properties',
        concept: `**Logical properties** replace physical directions (left/right/top/bottom) with logical ones (inline/block). \`margin-inline\` = left+right, \`padding-block\` = top+bottom, \`inset-inline-start\` = left in LTR, right in RTL.\n\nThey make layouts automatically adapt to writing direction (Arabic, Hebrew, Japanese) and are now the recommended approach for any internationalised site.`,
        html: `<div class="card ltr">
  <h3>LTR Card</h3>
  <p>Margin, padding and border use logical properties. Flip direction to see the layout adapt.</p>
  <span class="badge">English</span>
</div>

<div class="card rtl" dir="rtl">
  <h3>RTL Card (dir="rtl")</h3>
  <p>Same CSS — logical properties automatically mirror for right-to-left text.</p>
  <span class="badge">عربي</span>
</div>`,
        css: `body { padding: 16px; font-family: system-ui, sans-serif; display: flex; flex-direction: column; gap: 14px; }

.card {
  border: 2px solid #e5e7eb;
  border-radius: 10px;

  /* Logical padding — top/bottom and left/right */
  padding-block: 14px;
  padding-inline: 16px;

  /* Logical border — only on the start side */
  border-inline-start: 4px solid #6366f1;
}

.card h3 {
  margin: 0 0 6px;
  font-size: 1rem;
  color: #111827;
}

.card p {
  color: #6b7280;
  font-size: 0.875rem;
  margin: 0 0 10px;
  line-height: 1.5;
}

.badge {
  display: inline-block;
  background: #eef2ff;
  color: #4f46e5;
  padding-block: 2px;
  padding-inline: 10px;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 600;
}

.rtl {
  border-inline-start: 4px solid #ec4899;
  direction: rtl;
}`,
      },
    ],
  },

  // ── Visual Effects ────────────────────────────────────────────────────────
  {
    id: 'visual-effects',
    title: 'Visual Effects',
    emoji: '✨',
    lessons: [
      {
        id: 'blend-modes',
        title: 'Blend modes & filters',
        concept: `**mix-blend-mode** controls how an element blends with what's behind it — like Photoshop layer modes. **backdrop-filter** applies filters (blur, brightness, etc.) to everything *behind* the element — the foundation of the glassmorphism effect.\n\n**filter** applies effects directly to an element (blur, grayscale, drop-shadow). Unlike box-shadow, \`filter: drop-shadow()\` follows the shape of transparent images.`,
        html: `<div class="blend-demo">
  <div class="bg-circles">
    <div class="circle c1"></div>
    <div class="circle c2"></div>
    <div class="circle c3"></div>
  </div>
  <div class="blend-text">BLEND</div>
</div>

<div class="glass-demo">
  <div class="glass-card">
    <h3>Glassmorphism</h3>
    <p>backdrop-filter: blur()</p>
  </div>
</div>

<div class="filter-demo">
  <img src="https://picsum.photos/120/80?grayscale" class="filter-img" alt="" />
  <img src="https://picsum.photos/120/80" class="filter-img sepia" alt="" />
  <img src="https://picsum.photos/120/80" class="filter-img hue" alt="" />
</div>`,
        css: `body { padding: 16px; font-family: system-ui, sans-serif; display: flex; flex-direction: column; gap: 16px; }

/* Blend mode demo */
.blend-demo {
  position: relative;
  height: 100px;
  background: #0f172a;
  border-radius: 10px;
  overflow: hidden;
}

.bg-circles {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  gap: -20px;
}

.circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  position: absolute;
}
.c1 { background: #ef4444; left: 20px; }
.c2 { background: #22c55e; left: 60px; }
.c3 { background: #3b82f6; left: 100px; }

.blend-text {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 900;
  color: white;
  mix-blend-mode: overlay;
  letter-spacing: 4px;
}

/* Glassmorphism */
.glass-demo {
  height: 90px;
  background: linear-gradient(135deg, #6366f1, #ec4899, #f59e0b);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.glass-card {
  backdrop-filter: blur(10px) saturate(1.5);
  background: rgba(255,255,255,0.2);
  border: 1px solid rgba(255,255,255,0.35);
  border-radius: 10px;
  padding: 10px 20px;
  color: white;
}
.glass-card h3 { margin: 0 0 2px; font-size: 0.9rem; }
.glass-card p { margin: 0; font-size: 0.75rem; opacity: 0.85; }

/* Filters */
.filter-demo { display: flex; gap: 8px; }
.filter-img { width: 100px; height: 66px; object-fit: cover; border-radius: 6px; }
.sepia { filter: sepia(1) hue-rotate(0deg); }
.hue { filter: hue-rotate(180deg) saturate(2); }`,
      },
      {
        id: 'scroll-driven-animations',
        title: 'Scroll-driven animations',
        concept: `**Scroll-driven animations** link a CSS \`@keyframes\` animation to scroll position — no JavaScript needed. Set \`animation-timeline: scroll()\` to drive the animation by the page scroll, or \`animation-timeline: view()\` to drive it by when the element enters the viewport.\n\nThis replaces common IntersectionObserver patterns for reveal animations.`,
        html: `<div class="scroll-progress"></div>

<div class="scroll-content">
  <div class="reveal-card">Card 1 — scroll to reveal</div>
  <div class="reveal-card">Card 2 — scroll to reveal</div>
  <div class="reveal-card">Card 3 — scroll to reveal</div>
  <div class="reveal-card">Card 4 — scroll to reveal</div>
  <div class="reveal-card">Card 5 — scroll to reveal</div>
</div>`,
        css: `body {
  margin: 0;
  padding: 0;
  font-family: system-ui, sans-serif;
}

/* Scroll progress bar — driven by page scroll */
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  background: linear-gradient(to right, #6366f1, #ec4899);
  width: 100%;
  transform-origin: left;
  animation: grow-bar linear;
  animation-timeline: scroll(root);
}

@keyframes grow-bar {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

.scroll-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 24px;
}

/* Reveal cards — driven by their own visibility */
.reveal-card {
  padding: 24px;
  background: #eef2ff;
  border-left: 4px solid #6366f1;
  border-radius: 8px;
  font-weight: 600;
  color: #4338ca;
  font-size: 0.9rem;

  animation: reveal linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 40%;
}

@keyframes reveal {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}`,
      },
    ],
  },

  // ── Advanced Variables ────────────────────────────────────────────────────
  {
    id: 'advanced-variables',
    title: 'Advanced Variables',
    emoji: '⚙️',
    lessons: [
      {
        id: 'registered-properties',
        title: '@property',
        concept: `**@property** registers a CSS custom property with a type, syntax, and initial value. This unlocks two superpowers: you can **animate custom properties** (normally CSS can't interpolate them), and you get **type safety** — the browser validates values and falls back to the initial value if invalid.`,
        html: `<div class="animated-gradient">Hover me</div>

<div class="typed-demo">
  <div class="box valid">Valid: 1.5</div>
  <div class="box invalid">Invalid: "hello" → falls back to 1</div>
</div>`,
        css: `body { padding: 20px; font-family: system-ui, sans-serif; }

/* Register a typed custom property for hue */
@property --hue {
  syntax: '<number>';
  inherits: false;
  initial-value: 260;
}

/* Now CSS can animate --hue because it knows it's a number */
.animated-gradient {
  --hue: 260;
  background: hsl(var(--hue), 80%, 60%);
  padding: 30px;
  border-radius: 12px;
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
  transition: --hue 0.8s ease;
}

.animated-gradient:hover { --hue: 0; }

/* Type-checked opacity */
@property --opacity-val {
  syntax: '<number>';
  inherits: false;
  initial-value: 1;
}

.typed-demo { display: flex; gap: 10px; margin-top: 16px; }

.box {
  padding: 12px;
  border-radius: 8px;
  background: #6366f1;
  color: white;
  font-size: 0.8rem;
  font-weight: 600;
  flex: 1;
  opacity: var(--opacity-val);
}

.valid   { --opacity-val: 0.5; }   /* valid number → 50% opacity */
.invalid { --opacity-val: hello; } /* invalid → browser uses initial-value: 1 */`,
      },
      {
        id: 'modern-units',
        title: 'Modern units & clamp()',
        concept: `Modern viewport units solve mobile-browser problems: **dvh** (dynamic viewport height) accounts for appearing/disappearing browser chrome. **svh** (small viewport height) always uses the smallest possible viewport.\n\n**cqi/cqb** are container query units — percentage of the container's inline or block size.\n\n**clamp(min, ideal, max)** sets a value that scales between a minimum and maximum — perfect for fluid typography that needs no breakpoints.`,
        html: `<div class="units-demo">
  <div class="clamp-text">I scale with the viewport</div>
  <div class="clamp-padding">Padding scales too</div>
</div>

<div class="dvh-demo">
  <span>dvh: scales with dynamic viewport</span>
</div>

<div class="container-unit-demo">
  <div class="cq-parent" style="width:100%">
    <div class="cq-child">50cqi wide</div>
  </div>
  <div class="cq-parent" style="width:60%">
    <div class="cq-child">50cqi wide (of narrower parent)</div>
  </div>
</div>`,
        css: `body { padding: 16px; font-family: system-ui, sans-serif; display: flex; flex-direction: column; gap: 14px; }

.units-demo {
  background: #f9fafb;
  padding: clamp(8px, 2vw, 24px);
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}

.clamp-text {
  /* Fluid: min 1rem, ideal 2.5vw, max 1.5rem */
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  font-weight: 700;
  color: #6366f1;
  margin-bottom: 8px;
}

.clamp-padding {
  font-size: 0.85rem;
  color: #6b7280;
  padding: clamp(4px, 1vw, 16px);
  background: #eef2ff;
  border-radius: 6px;
}

.dvh-demo {
  height: 15dvh; /* dynamic viewport height */
  min-height: 60px;
  background: linear-gradient(to right, #6366f1, #8b5cf6);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.85rem;
  font-weight: 600;
}

.container-unit-demo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cq-parent {
  container-type: inline-size;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px;
}

.cq-child {
  width: 50cqi; /* 50% of container inline size */
  background: #6366f1;
  color: white;
  border-radius: 5px;
  padding: 6px 10px;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}`,
      },
    ],
  },

  // ── Modern Color ───────────────────────────────────────────────────────────
  {
    id: 'modern-color',
    title: 'Modern Color',
    emoji: '🎨',
    lessons: [
      {
        id: 'color-mix',
        title: 'color-mix()',
        concept: `\`color-mix()\` blends two colors in a specified color space. Syntax: \`color-mix(in oklch, red 40%, blue)\` — 40% red, 60% blue, mixed in the oklch space.\n\nThe color space matters: mixing in \`srgb\` produces a different mid-point than \`oklch\`. OKLCH mixes through perceptually uniform space, avoiding the muddy grey that sRGB often produces at 50/50.`,
        html: `<div class="demo">
  <h3>oklch blend: red → blue</h3>
  <div class="row">
    <div class="swatch" style="background:red"><span>red</span></div>
    <div class="swatch" style="background:color-mix(in oklch,red 80%,blue)"><span>80%</span></div>
    <div class="swatch" style="background:color-mix(in oklch,red 60%,blue)"><span>60%</span></div>
    <div class="swatch" style="background:color-mix(in oklch,red 40%,blue)"><span>40%</span></div>
    <div class="swatch" style="background:color-mix(in oklch,red 20%,blue)"><span>20%</span></div>
    <div class="swatch" style="background:blue"><span>blue</span></div>
  </div>

  <h3>sRGB vs oklch at 50/50</h3>
  <div class="row">
    <div class="compare" style="background:color-mix(in srgb,#e63946,#2a9d8f)"><span>sRGB</span></div>
    <div class="compare" style="background:color-mix(in oklch,#e63946,#2a9d8f)"><span>oklch</span></div>
  </div>

  <h3>Brand tints with color-mix</h3>
  <div class="row">
    <div class="swatch" style="background:color-mix(in oklch,#6366f1 10%,white)"></div>
    <div class="swatch" style="background:color-mix(in oklch,#6366f1 30%,white)"></div>
    <div class="swatch" style="background:color-mix(in oklch,#6366f1 60%,white)"></div>
    <div class="swatch" style="background:#6366f1"></div>
    <div class="swatch" style="background:color-mix(in oklch,#6366f1 60%,black)"></div>
    <div class="swatch" style="background:color-mix(in oklch,#6366f1 30%,black)"></div>
  </div>
</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 16px; display: flex; flex-direction: column; gap: 14px; }
h3 { font-size: 12px; font-weight: 700; color: #374151; margin: 0 0 8px; text-transform: uppercase; letter-spacing: .04em; }
.demo { display: flex; flex-direction: column; gap: 14px; }
.row { display: flex; gap: 6px; }
.swatch { flex: 1; height: 52px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.swatch span { font-size: 10px; font-weight: 700; color: white; text-shadow: 0 1px 3px rgba(0,0,0,.4); }
.compare { flex: 1; height: 52px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.compare span { font-size: 12px; font-weight: 700; color: white; text-shadow: 0 1px 3px rgba(0,0,0,.5); }`,
        challenge: {
          question: 'Which color space avoids muddy grey when mixing two vivid colors at 50/50?',
          options: ['srgb', 'oklch', 'hex', 'hsl'],
          correct: 'oklch',
        },
      },
      {
        id: 'oklch',
        title: 'oklch color space',
        concept: `oklch defines colors as **Lightness** (0–1), **Chroma** (0–0.4, saturation), and **Hue** (0–360°). It is perceptually uniform — changing L by the same amount always looks like the same brightness change, unlike HSL.\n\nThe biggest practical advantage: you can build consistent color scales by adjusting only L, create harmonious hues by rotating H, and know that \`oklch(0.5 0.2 180)\` is always "medium" brightness regardless of hue.`,
        html: `<div class="demo">
  <h3>Same lightness, different hues (L=0.60, C=0.20)</h3>
  <div class="row">
    <div style="background:oklch(0.6 0.2 0)"><span>H0</span></div>
    <div style="background:oklch(0.6 0.2 60)"><span>H60</span></div>
    <div style="background:oklch(0.6 0.2 120)"><span>H120</span></div>
    <div style="background:oklch(0.6 0.2 180)"><span>H180</span></div>
    <div style="background:oklch(0.6 0.2 240)"><span>H240</span></div>
    <div style="background:oklch(0.6 0.2 300)"><span>H300</span></div>
  </div>

  <h3>Lightness scale (H=265, C=0.18)</h3>
  <div class="row">
    <div style="background:oklch(0.2 0.18 265)"><span>0.2</span></div>
    <div style="background:oklch(0.35 0.18 265)"><span>0.35</span></div>
    <div style="background:oklch(0.5 0.18 265)"><span>0.5</span></div>
    <div style="background:oklch(0.65 0.18 265)"><span>0.65</span></div>
    <div style="background:oklch(0.8 0.14 265)"><span>0.8</span></div>
    <div style="background:oklch(0.94 0.06 265)"><span>0.94</span></div>
  </div>

  <h3>Chroma scale (L=0.55, H=265)</h3>
  <div class="row">
    <div style="background:oklch(0.55 0 265)"><span>C0</span></div>
    <div style="background:oklch(0.55 0.07 265)"><span>.07</span></div>
    <div style="background:oklch(0.55 0.14 265)"><span>.14</span></div>
    <div style="background:oklch(0.55 0.21 265)"><span>.21</span></div>
    <div style="background:oklch(0.55 0.28 265)"><span>.28</span></div>
  </div>
</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 16px; }
h3 { font-size: 12px; font-weight: 700; color: #374151; margin: 0 0 8px; text-transform: uppercase; letter-spacing: .04em; }
.demo { display: flex; flex-direction: column; gap: 14px; }
.row { display: flex; gap: 6px; }
.row div { flex: 1; height: 52px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
.row span { font-size: 10px; font-weight: 700; color: white; text-shadow: 0 1px 3px rgba(0,0,0,.4); }`,
      },
      {
        id: 'relative-color',
        title: 'Relative color syntax',
        concept: `Relative color syntax lets you derive a new color from an existing one by modifying individual channels. Write \`oklch(from var(--base) l c calc(h + 30))\` to shift the hue by 30° while keeping lightness and chroma unchanged.\n\nThis makes theme variations, hover darks, and complementary colors all derivable from a single design token — no hardcoded duplicate values.`,
        html: `<div class="cards">
  <div class="card">
    <div class="swatch" style="background:var(--brand)"></div>
    <div class="label">Base</div>
    <code>var(--brand)</code>
  </div>
  <div class="card">
    <div class="swatch" style="background:oklch(from var(--brand) calc(l + 0.15) c h)"></div>
    <div class="label">Lighter</div>
    <code>L + 0.15</code>
  </div>
  <div class="card">
    <div class="swatch" style="background:oklch(from var(--brand) calc(l - 0.15) c h)"></div>
    <div class="label">Darker</div>
    <code>L − 0.15</code>
  </div>
  <div class="card">
    <div class="swatch" style="background:oklch(from var(--brand) l c calc(h + 180))"></div>
    <div class="label">Complement</div>
    <code>H + 180</code>
  </div>
  <div class="card">
    <div class="swatch" style="background:oklch(from var(--brand) l c calc(h + 120))"></div>
    <div class="label">Triadic</div>
    <code>H + 120</code>
  </div>
  <div class="card">
    <div class="swatch" style="background:oklch(from var(--brand) l calc(c * 0.25) h)"></div>
    <div class="label">Muted</div>
    <code>C × 0.25</code>
  </div>
</div>`,
        css: `:root { --brand: oklch(0.55 0.22 265); }
body { font-family: system-ui, sans-serif; padding: 16px; }
.cards { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
.card { border-radius: 10px; border: 1px solid #e5e7eb; padding: 10px; display: flex; flex-direction: column; gap: 5px; }
.swatch { height: 40px; border-radius: 6px; }
.label { font-size: 11px; font-weight: 700; color: #374151; }
code { font-size: 10px; color: #6b7280; }`,
        challenge: {
          question: 'What does `oklch(from var(--base) l c calc(h + 180))` produce?',
          options: ['A lighter shade', 'A muted shade', 'The complementary color', 'A triadic color'],
          correct: 'The complementary color',
        },
      },
    ],
  },

  // ── Clip & Mask ────────────────────────────────────────────────────────────
  {
    id: 'clip-mask',
    title: 'Clip & Mask',
    emoji: '✂️',
    lessons: [
      {
        id: 'clip-path',
        title: 'clip-path',
        concept: `\`clip-path\` crops an element to a shape — only content inside the shape is visible. Built-in shapes: \`circle()\`, \`ellipse()\`, \`inset()\`, \`polygon()\`.\n\nClip paths can be transitioned and animated with CSS transitions or keyframes, making them excellent for reveal effects and hover interactions. Edit any polygon point to see the shape change.`,
        html: `<div class="grid">
  <div class="item">
    <div class="box clip-circle">circle</div>
    <code>circle(50%)</code>
  </div>
  <div class="item">
    <div class="box clip-ellipse">ellipse</div>
    <code>ellipse(60% 40%)</code>
  </div>
  <div class="item">
    <div class="box clip-inset">inset</div>
    <code>inset(10% round 20px)</code>
  </div>
  <div class="item">
    <div class="box clip-triangle">triangle</div>
    <code>polygon(50% 0, 100% 100%, 0 100%)</code>
  </div>
  <div class="item">
    <div class="box clip-hex">hex</div>
    <code>polygon(6 points)</code>
  </div>
  <div class="item">
    <div class="box clip-reveal">hover me</div>
    <code>animated reveal</code>
  </div>
</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 16px; }
.grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
.item { display: flex; flex-direction: column; align-items: center; gap: 8px; }
code { font-size: 10px; color: #6b7280; text-align: center; }

.box {
  width: 90px; height: 90px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex; align-items: center; justify-content: center;
  color: white; font-size: 11px; font-weight: 700;
}

.clip-circle   { clip-path: circle(50%); }
.clip-ellipse  { clip-path: ellipse(60% 40% at 50% 50%); }
.clip-inset    { clip-path: inset(10% round 20px); }
.clip-triangle { clip-path: polygon(50% 0%, 100% 100%, 0% 100%); }
.clip-hex      { clip-path: polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%); }

.clip-reveal {
  background: linear-gradient(135deg, #f97316, #ef4444);
  clip-path: inset(0 100% 0 0);
  transition: clip-path 0.5s ease;
}
.clip-reveal:hover { clip-path: inset(0 0% 0 0); }`,
        challenge: {
          question: 'Which clip-path value creates a triangle shape?',
          options: ['triangle()', 'polygon(50% 0, 100% 100%, 0 100%)', 'circle(50%)', 'inset(0)'],
          correct: 'polygon(50% 0, 100% 100%, 0 100%)',
        },
      },
      {
        id: 'mask-image',
        title: 'mask-image',
        concept: `\`mask-image\` uses a gradient or image as an alpha mask. White/opaque areas of the mask are fully visible; black/transparent areas are hidden. Gradient masks are the most practical — a \`linear-gradient\` from black to transparent creates a smooth edge fade.\n\nAlways include the \`-webkit-\` prefix version alongside the standard property for full browser support.`,
        html: `<div class="demos">

  <div class="demo-item">
    <p class="label">Fade to right</p>
    <div class="text-fade">
      This paragraph fades out toward the right — useful for truncating content with a soft edge
      rather than a hard clip or text-overflow ellipsis. Works on any element.
    </div>
  </div>

  <div class="demo-item">
    <p class="label">Bottom fade (load more pattern)</p>
    <div class="list-fade">
      <div class="list-item">Item one</div>
      <div class="list-item">Item two</div>
      <div class="list-item">Item three</div>
      <div class="list-item">Item four</div>
      <div class="list-item">Item five</div>
    </div>
  </div>

  <div class="demo-item">
    <p class="label">Scallop edge (repeating radial mask)</p>
    <div class="scallop">Masked edge</div>
  </div>

</div>`,
        css: `body { font-family: system-ui, sans-serif; padding: 16px; }
.demos { display: flex; flex-direction: column; gap: 20px; }
.demo-item { display: flex; flex-direction: column; gap: 6px; }
.label { font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: .04em; margin: 0; }

.text-fade {
  font-size: 13px; line-height: 1.6; color: #374151;
  -webkit-mask-image: linear-gradient(to right, black 55%, transparent 95%);
  mask-image: linear-gradient(to right, black 55%, transparent 95%);
}

.list-fade {
  max-height: 90px; overflow: hidden;
  -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
  mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
}
.list-item { padding: 7px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; color: #374151; }

.scallop {
  height: 70px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  display: flex; align-items: center; justify-content: center;
  color: white; font-weight: 700; font-size: 14px;
  -webkit-mask-image: radial-gradient(circle at 50% 0, transparent 14px, black 15px);
  mask-image: radial-gradient(circle at 50% 0, transparent 14px, black 15px);
  -webkit-mask-size: 28px 28px;
  mask-size: 28px 28px;
  -webkit-mask-repeat: repeat-x;
  mask-repeat: repeat-x;
}`,
      },
    ],
  },
];
