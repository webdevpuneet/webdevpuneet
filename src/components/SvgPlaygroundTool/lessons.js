// SVG Playground — guided curriculum, beginner to pro, including animation.
// Lesson schema mirrors the JS Playground:
//   { id, chapter, title, type: 'live', concept, code, challenge? }
//   { id, chapter, title, type: 'picker', concept, options: [{ label, code, note? }], challenge? }
// `code` is raw SVG markup rendered live in the preview stage.

export const CHAPTERS = [
  'SVG Basics',
  'Basic Shapes',
  'Paths',
  'Styling & Strokes',
  'Gradients & Patterns',
  'Text & Groups',
  'Transforms & Reuse',
  'Filters & Effects',
  'Clipping & Masking',
  'Animation: CSS',
  'Animation: SMIL',
  'Pro Techniques',
];

export const LESSONS = [
  /* ── SVG Basics ─────────────────────────────────────────────────────────── */
  {
    id: 'hello-svg',
    chapter: 'SVG Basics',
    title: 'Hello SVG',
    type: 'live',
    concept:
      'SVG stands for **Scalable Vector Graphics** — pictures described by math, not pixels, so they stay crisp at any size. Everything lives inside an `<svg>` element. The `viewBox="minX minY width height"` sets the internal coordinate grid. Edit the numbers below and watch the shape update instantly.',
    code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="60" r="40" fill="#0891b2" />
  <text x="100" y="66" text-anchor="middle" fill="#fff" font-size="14">SVG</text>
</svg>`,
    challenge: {
      question: 'What does the viewBox attribute define?',
      options: ['The pixel size on screen', 'The internal coordinate system', 'The fill colour', 'The animation speed'],
      correct: 1,
    },
  },
  {
    id: 'viewbox',
    chapter: 'SVG Basics',
    title: 'The viewBox',
    type: 'picker',
    concept:
      'The `viewBox` is a window onto your drawing. The same shapes look bigger or smaller depending on how wide the window is. A **smaller** viewBox zooms in; a **larger** one zooms out. The on-screen size never changes — only how much of the coordinate space you see.',
    options: [
      {
        label: 'zoom in',
        note: 'A tight viewBox (0 0 100 100) makes the circle fill the frame.',
        code: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="#8b5cf6" />
</svg>`,
      },
      {
        label: 'zoom out',
        note: 'A wide viewBox (0 0 300 300) shrinks the same circle.',
        code: `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="#8b5cf6" />
</svg>`,
      },
      {
        label: 'pan',
        note: 'Change minX/minY to scroll the view. Here (30 30) shifts it.',
        code: `<svg viewBox="30 30 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="40" fill="#8b5cf6" />
</svg>`,
      },
    ],
  },
  {
    id: 'coordinates',
    chapter: 'SVG Basics',
    title: 'The Coordinate System',
    type: 'live',
    concept:
      'In SVG, `x` grows to the **right** and `y` grows **downward** — the origin (0,0) is the top-left corner. This trips up newcomers who expect y to go up like a maths graph. The grid below marks the corners so you can feel the layout.',
    code: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="200" height="140" fill="#f1f5f9" />
  <line x1="0" y1="0" x2="200" y2="0" stroke="#94a3b8" />
  <line x1="0" y1="0" x2="0" y2="140" stroke="#94a3b8" />
  <circle cx="0" cy="0" r="5" fill="#ef4444" />
  <text x="10" y="16" font-size="11" fill="#334155">(0, 0) origin</text>
  <circle cx="160" cy="110" r="5" fill="#0891b2" />
  <text x="90" y="126" font-size="11" fill="#334155">(160, 110)</text>
</svg>`,
  },

  /* ── Basic Shapes ───────────────────────────────────────────────────────── */
  {
    id: 'rectangles',
    chapter: 'Basic Shapes',
    title: 'Rectangles',
    type: 'picker',
    concept:
      '`<rect>` needs `x`, `y`, `width`, and `height`. Add `rx` (and optionally `ry`) to round the corners. A large `rx` on a square makes a circle — handy for pills and avatars.',
    options: [
      {
        label: 'plain',
        code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="40" y="30" width="120" height="60" fill="#0891b2" />
</svg>`,
      },
      {
        label: 'rounded',
        note: 'rx rounds the corners.',
        code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="40" y="30" width="120" height="60" rx="16" fill="#0891b2" />
</svg>`,
      },
      {
        label: 'pill',
        note: 'rx equal to half the height gives a pill.',
        code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="40" y="40" width="120" height="40" rx="20" fill="#0891b2" />
</svg>`,
      },
    ],
    challenge: {
      question: 'Which attribute rounds a rectangle’s corners?',
      options: ['radius', 'rx', 'corner', 'round'],
      correct: 1,
    },
  },
  {
    id: 'circles-ellipses',
    chapter: 'Basic Shapes',
    title: 'Circles & Ellipses',
    type: 'live',
    concept:
      'A `<circle>` is defined by its centre `cx`, `cy` and radius `r`. An `<ellipse>` uses two radii — `rx` (horizontal) and `ry` (vertical). Try dragging the numbers to squash the ellipse.',
    code: `<svg viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg">
  <circle cx="70" cy="60" r="40" fill="#8b5cf6" />
  <ellipse cx="170" cy="60" rx="50" ry="28" fill="#ec4899" />
</svg>`,
  },
  {
    id: 'lines-polylines',
    chapter: 'Basic Shapes',
    title: 'Lines & Polylines',
    type: 'live',
    concept:
      'A `<line>` connects two points with `x1,y1` and `x2,y2`. A `<polyline>` follows a list of `points`. Lines have no fill — you must give them a `stroke` to be visible.',
    code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <line x1="20" y1="100" x2="180" y2="100" stroke="#334155" stroke-width="2" />
  <polyline points="20,90 60,40 100,70 140,20 180,50"
            fill="none" stroke="#0891b2" stroke-width="3" />
</svg>`,
  },
  {
    id: 'polygons',
    chapter: 'Basic Shapes',
    title: 'Polygons',
    type: 'picker',
    concept:
      'A `<polygon>` is like a polyline but it automatically closes back to the first point and can be filled. List each corner as `x,y` pairs in `points`.',
    options: [
      {
        label: 'triangle',
        code: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
  <polygon points="100,20 180,120 20,120" fill="#f59e0b" />
</svg>`,
      },
      {
        label: 'hexagon',
        code: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
  <polygon points="100,15 175,55 175,105 100,145 25,105 25,55" fill="#10b981" />
</svg>`,
      },
      {
        label: 'star',
        code: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <polygon points="100,10 122,75 190,75 135,115 156,180 100,140 44,180 65,115 10,75 78,75"
           fill="#eab308" />
</svg>`,
      },
    ],
  },

  /* ── Paths ──────────────────────────────────────────────────────────────── */
  {
    id: 'path-basics',
    chapter: 'Paths',
    title: 'The Path Element',
    type: 'live',
    concept:
      'The `<path>` is the most powerful shape — every other shape can be drawn with it. Its `d` attribute is a mini language: `M x y` **moves** the pen, `L x y` draws a **line**, and `Z` **closes** the shape. Uppercase commands use absolute coordinates.',
    code: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
  <path d="M40 120 L100 20 L160 120 Z"
        fill="none" stroke="#0891b2" stroke-width="4" />
</svg>`,
    challenge: {
      question: 'What does the Z command do in a path?',
      options: ['Zoom the path', 'Zero the coordinates', 'Close the path back to the start', 'Nothing'],
      correct: 2,
    },
  },
  {
    id: 'path-curves',
    chapter: 'Paths',
    title: 'Curves',
    type: 'picker',
    concept:
      'Curves add control points that pull the line. `Q cx cy x y` is a **quadratic** curve with one control point. `C c1x c1y c2x c2y x y` is a **cubic** Bézier with two control points — the kind design tools export.',
    options: [
      {
        label: 'quadratic',
        note: 'Q uses a single control point (shown in red).',
        code: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 110 Q100 10 180 110" fill="none" stroke="#8b5cf6" stroke-width="4" />
  <circle cx="100" cy="10" r="4" fill="#ef4444" />
</svg>`,
      },
      {
        label: 'cubic',
        note: 'C uses two control points for an S-shaped curve.',
        code: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 110 C20 20 180 20 180 110" fill="none" stroke="#8b5cf6" stroke-width="4" />
  <circle cx="20" cy="20" r="4" fill="#ef4444" />
  <circle cx="180" cy="20" r="4" fill="#ef4444" />
</svg>`,
      },
      {
        label: 'wave',
        note: 'Chain curves for a smooth wave.',
        code: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 70 Q50 20 100 70 T200 70" fill="none" stroke="#ec4899" stroke-width="4" />
</svg>`,
      },
    ],
  },
  {
    id: 'path-arcs',
    chapter: 'Paths',
    title: 'Arcs',
    type: 'live',
    concept:
      'The arc command `A rx ry rot large-arc sweep x y` draws part of an ellipse. The two flags — `large-arc` and `sweep` — pick which of the four possible arcs is drawn. Flip the 0s and 1s below to see all four.',
    code: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
  <path d="M60 100 A40 40 0 0 1 140 100" fill="none" stroke="#0891b2" stroke-width="4" />
  <circle cx="60" cy="100" r="4" fill="#ef4444" />
  <circle cx="140" cy="100" r="4" fill="#ef4444" />
</svg>`,
  },
  {
    id: 'path-icon',
    chapter: 'Paths',
    title: 'A Path Icon',
    type: 'live',
    concept:
      'Real icons are just paths. Below is a heart made from two arcs meeting at a point. This is exactly what you get when you copy an icon from a design tool — a single `d` string.',
    code: `<svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg">
  <path d="M100 160
           C40 110 20 80 20 55
           A35 35 0 0 1 100 45
           A35 35 0 0 1 180 55
           C180 80 160 110 100 160 Z"
        fill="#ef4444" />
</svg>`,
  },

  /* ── Styling & Strokes ──────────────────────────────────────────────────── */
  {
    id: 'fill-stroke',
    chapter: 'Styling & Strokes',
    title: 'Fill & Stroke',
    type: 'picker',
    concept:
      '`fill` colours the inside; `stroke` colours the outline and `stroke-width` sets its thickness. Set `fill="none"` for an outline-only shape. Colours accept names, hex, `rgb()`, `hsl()`, or `currentColor`.',
    options: [
      {
        label: 'fill only',
        code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="60" r="45" fill="#0891b2" />
</svg>`,
      },
      {
        label: 'stroke only',
        code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="60" r="45" fill="none" stroke="#0891b2" stroke-width="6" />
</svg>`,
      },
      {
        label: 'both',
        code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="60" r="45" fill="#cffafe" stroke="#0891b2" stroke-width="6" />
</svg>`,
      },
    ],
  },
  {
    id: 'stroke-dasharray',
    chapter: 'Styling & Strokes',
    title: 'Dashed Strokes',
    type: 'picker',
    concept:
      '`stroke-dasharray` turns a solid stroke into dashes. The value is a list of dash/gap lengths that repeats. `stroke-dashoffset` shifts where the pattern starts — this becomes the key to line-drawing animation later.',
    options: [
      {
        label: 'dashed',
        code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="30" y="30" width="140" height="60" rx="10" fill="none"
        stroke="#8b5cf6" stroke-width="4" stroke-dasharray="10 6" />
</svg>`,
      },
      {
        label: 'dotted',
        note: 'A tiny dash with round caps makes dots.',
        code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="30" y="30" width="140" height="60" rx="10" fill="none"
        stroke="#8b5cf6" stroke-width="6" stroke-linecap="round" stroke-dasharray="0 14" />
</svg>`,
      },
      {
        label: 'offset',
        note: 'dashoffset slides the dashes along the line.',
        code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <line x1="20" y1="60" x2="180" y2="60" stroke="#8b5cf6" stroke-width="5"
        stroke-dasharray="16 8" stroke-dashoffset="12" />
</svg>`,
      },
    ],
  },
  {
    id: 'opacity',
    chapter: 'Styling & Strokes',
    title: 'Opacity & Layering',
    type: 'live',
    concept:
      'Use `opacity` (whole element), `fill-opacity`, or `stroke-opacity` for transparency. Overlapping semi-transparent shapes blend — the later element in the markup sits on top.',
    code: `<svg viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg">
  <circle cx="90"  cy="70" r="45" fill="#0891b2" fill-opacity="0.65" />
  <circle cx="130" cy="70" r="45" fill="#ec4899" fill-opacity="0.65" />
</svg>`,
  },
  {
    id: 'linecap-linejoin',
    chapter: 'Styling & Strokes',
    title: 'Caps & Joins',
    type: 'picker',
    concept:
      '`stroke-linecap` shapes the **ends** of open lines: `butt` (default), `round`, or `square`. `stroke-linejoin` shapes the **corners**: `miter`, `round`, or `bevel`. Rounded caps and joins give a soft, friendly look.',
    options: [
      {
        label: 'butt',
        code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <polyline points="30,90 100,30 170,90" fill="none" stroke="#0891b2"
            stroke-width="16" stroke-linecap="butt" stroke-linejoin="miter" />
</svg>`,
      },
      {
        label: 'round',
        code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <polyline points="30,90 100,30 170,90" fill="none" stroke="#0891b2"
            stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
</svg>`,
      },
      {
        label: 'square',
        code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <polyline points="30,90 100,30 170,90" fill="none" stroke="#0891b2"
            stroke-width="16" stroke-linecap="square" stroke-linejoin="bevel" />
</svg>`,
      },
    ],
  },

  /* ── Gradients & Patterns ───────────────────────────────────────────────── */
  {
    id: 'linear-gradient',
    chapter: 'Gradients & Patterns',
    title: 'Linear Gradients',
    type: 'live',
    concept:
      'Define a gradient once inside `<defs>`, give it an `id`, then reference it with `fill="url(#id)"`. A `<linearGradient>` blends colours along a line. Each `<stop>` sets an `offset` (0–100%) and a `stop-color`. Change `x1/y1/x2/y2` to rotate the blend.',
    code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
  </defs>
  <rect x="20" y="20" width="160" height="80" rx="14" fill="url(#grad)" />
</svg>`,
    challenge: {
      question: 'How do you apply a gradient defined with id="grad" to a shape?',
      options: ['fill="grad"', 'fill="#grad"', 'fill="url(#grad)"', 'gradient="grad"'],
      correct: 2,
    },
  },
  {
    id: 'radial-gradient',
    chapter: 'Gradients & Patterns',
    title: 'Radial Gradients',
    type: 'live',
    concept:
      'A `<radialGradient>` blends outward from a centre point — perfect for spheres, glows, and spotlights. Move the focal point with `fx`/`fy` to shift the highlight and fake a light source.',
    code: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="ball" cx="0.35" cy="0.35" r="0.65">
      <stop offset="0%" stop-color="#fef9c3" />
      <stop offset="45%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </radialGradient>
  </defs>
  <circle cx="100" cy="100" r="80" fill="url(#ball)" />
</svg>`,
  },
  {
    id: 'patterns',
    chapter: 'Gradients & Patterns',
    title: 'Patterns',
    type: 'live',
    concept:
      'A `<pattern>` tiles a small piece of SVG across a shape. Set `patternUnits="userSpaceOnUse"` and a `width`/`height` for the tile, draw inside it, then fill with `url(#id)`. Great for dots, grids, and hatching.',
    code: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="dots" width="18" height="18" patternUnits="userSpaceOnUse">
      <circle cx="4" cy="4" r="3" fill="#0891b2" />
    </pattern>
  </defs>
  <rect x="20" y="20" width="160" height="100" rx="12" fill="url(#dots)" />
</svg>`,
  },

  /* ── Text & Groups ──────────────────────────────────────────────────────── */
  {
    id: 'text-basics',
    chapter: 'Text & Groups',
    title: 'Text',
    type: 'live',
    concept:
      '`<text>` places words at an `x`,`y` baseline. `text-anchor` (`start`, `middle`, `end`) controls horizontal alignment relative to that point. Unlike HTML, SVG text does not wrap automatically — you position each line yourself.',
    code: `<svg viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg">
  <text x="110" y="55" text-anchor="middle" font-size="30"
        font-family="sans-serif" font-weight="700" fill="#0891b2">Vectors</text>
  <text x="110" y="82" text-anchor="middle" font-size="13" fill="#64748b">crisp at any size</text>
</svg>`,
  },
  {
    id: 'text-styling',
    chapter: 'Text & Groups',
    title: 'Styling Text',
    type: 'picker',
    concept:
      'Text takes the same `fill`, `stroke`, `font-size`, `font-weight`, and `letter-spacing` you know from CSS. Add a `stroke` for outlined text, or `<tspan>` to style part of a line differently.',
    options: [
      {
        label: 'outline',
        code: `<svg viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg">
  <text x="110" y="65" text-anchor="middle" font-size="44" font-weight="800"
        font-family="sans-serif" fill="none" stroke="#8b5cf6" stroke-width="1.5">BOLD</text>
</svg>`,
      },
      {
        label: 'spaced',
        code: `<svg viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg">
  <text x="110" y="60" text-anchor="middle" font-size="22" letter-spacing="8"
        font-family="sans-serif" fill="#0891b2">SPACED</text>
</svg>`,
      },
      {
        label: 'tspan',
        note: 'tspan restyles part of the text.',
        code: `<svg viewBox="0 0 220 100" xmlns="http://www.w3.org/2000/svg">
  <text x="110" y="60" text-anchor="middle" font-size="26" font-family="sans-serif" fill="#334155">
    Learn <tspan fill="#ec4899" font-weight="800">SVG</tspan>
  </text>
</svg>`,
      },
    ],
  },
  {
    id: 'text-on-path',
    chapter: 'Text & Groups',
    title: 'Text on a Path',
    type: 'live',
    concept:
      'Wrap text in `<textPath href="#pathId">` to flow it along any path — arcs, circles, or waves. The path itself can be invisible (defined in `<defs>`). This is how you make curved badges and circular labels.',
    code: `<svg viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <path id="curve" d="M20 110 Q110 10 200 110" />
  </defs>
  <path d="M20 110 Q110 10 200 110" fill="none" stroke="#e2e8f0" stroke-width="1" />
  <text font-size="18" font-weight="700" font-family="sans-serif" fill="#8b5cf6">
    <textPath href="#curve" startOffset="12%">Flowing along a curve</textPath>
  </text>
</svg>`,
  },
  {
    id: 'groups',
    chapter: 'Text & Groups',
    title: 'Groups',
    type: 'live',
    concept:
      'A `<g>` groups elements so you can style or move them together. Attributes set on the group — `fill`, `opacity`, `transform` — cascade to every child unless a child overrides them. Groups keep complex drawings organised.',
    code: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
  <g fill="#0891b2" transform="translate(20 20)">
    <circle cx="20" cy="20" r="16" />
    <circle cx="70" cy="20" r="16" />
    <circle cx="120" cy="20" r="16" />
    <rect x="0" y="55" width="140" height="40" rx="8" fill="#8b5cf6" />
  </g>
</svg>`,
  },

  /* ── Transforms & Reuse ─────────────────────────────────────────────────── */
  {
    id: 'transforms',
    chapter: 'Transforms & Reuse',
    title: 'Transforms',
    type: 'picker',
    concept:
      'The `transform` attribute moves, rotates, and scales elements. `translate(x y)` shifts, `rotate(deg cx cy)` spins around a point, and `scale(n)` resizes. You can chain several — they apply left to right.',
    options: [
      {
        label: 'translate',
        code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="40" width="50" height="50" fill="#cbd5e1" />
  <rect x="20" y="40" width="50" height="50" fill="#0891b2" transform="translate(90 0)" />
</svg>`,
      },
      {
        label: 'rotate',
        note: 'rotate(deg cx cy) spins around (cx,cy).',
        code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="75" y="35" width="50" height="50" fill="#cbd5e1" />
  <rect x="75" y="35" width="50" height="50" fill="#8b5cf6" transform="rotate(45 100 60)" />
</svg>`,
      },
      {
        label: 'scale',
        note: 'scale multiplies from the origin — combine with translate to control the anchor.',
        code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="20" y="35" width="50" height="50" fill="#cbd5e1" />
  <rect x="20" y="35" width="50" height="50" fill="#ec4899" transform="translate(90 -18) scale(1.4)" />
</svg>`,
      },
    ],
    challenge: {
      question: 'Which transform spins a shape around a point?',
      options: ['skew()', 'rotate()', 'turn()', 'spin()'],
      correct: 1,
    },
  },
  {
    id: 'use-defs',
    chapter: 'Transforms & Reuse',
    title: 'Reuse with <use>',
    type: 'live',
    concept:
      'Define a shape once, then stamp it many times with `<use href="#id">`. Each `<use>` can add its own `x`, `y`, and `transform`. Change the original and every copy updates — the DRY principle for graphics.',
    code: `<svg viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <circle id="dot" cx="0" cy="0" r="14" fill="#0891b2" />
  </defs>
  <use href="#dot" x="30"  y="60" />
  <use href="#dot" x="80"  y="60" transform="scale(1)" fill="#8b5cf6" />
  <use href="#dot" x="130" y="60" />
  <use href="#dot" x="180" y="60" />
</svg>`,
  },
  {
    id: 'symbol',
    chapter: 'Transforms & Reuse',
    title: 'Symbols & Icons',
    type: 'live',
    concept:
      'A `<symbol>` is like `<defs>` but carries its own `viewBox`, so it scales cleanly wherever you `<use>` it. This is the foundation of SVG icon sprites — one definition, reused at any size.',
    code: `<svg viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <symbol id="check" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="11" fill="#10b981" />
      <path d="M7 12 l3 3 l7 -7" fill="none" stroke="#fff" stroke-width="2.5"
            stroke-linecap="round" stroke-linejoin="round" />
    </symbol>
  </defs>
  <use href="#check" x="20"  y="45" width="30" height="30" />
  <use href="#check" x="90"  y="35" width="50" height="50" />
  <use href="#check" x="160" y="25" width="70" height="70" />
</svg>`,
  },

  /* ── Filters & Effects ──────────────────────────────────────────────────── */
  {
    id: 'drop-shadow',
    chapter: 'Filters & Effects',
    title: 'Drop Shadows',
    type: 'live',
    concept:
      'Filters live in `<defs>` and are applied with `filter="url(#id)"`. The shortcut `<feDropShadow>` gives a soft shadow in one line — set `dx`, `dy`, `stdDeviation` (blur), and `flood-color`.',
    code: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%">
      <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#000" flood-opacity="0.35" />
    </filter>
  </defs>
  <rect x="45" y="35" width="110" height="60" rx="14" fill="#0891b2" filter="url(#shadow)" />
</svg>`,
  },
  {
    id: 'blur',
    chapter: 'Filters & Effects',
    title: 'Blur',
    type: 'live',
    concept:
      '`<feGaussianBlur>` softens whatever it is applied to. `stdDeviation` controls the amount. Blur is the building block behind shadows, glows, and frosted-glass effects.',
    code: `<svg viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="soft"><feGaussianBlur stdDeviation="4" /></filter>
  </defs>
  <circle cx="70"  cy="60" r="38" fill="#8b5cf6" />
  <circle cx="160" cy="60" r="38" fill="#8b5cf6" filter="url(#soft)" />
</svg>`,
  },
  {
    id: 'glow',
    chapter: 'Filters & Effects',
    title: 'Neon Glow',
    type: 'live',
    concept:
      'Combine a blur with `<feMerge>` to layer the glow behind the original shape. The blurred copy sits under the crisp version, creating a neon halo. Bump `stdDeviation` for a stronger glow.',
    code: `<svg viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="neon" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="b" />
      <feMerge>
        <feMergeNode in="b" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
  <rect x="20" y="18" width="180" height="84" rx="12" fill="#0f172a" />
  <text x="110" y="72" text-anchor="middle" font-size="34" font-weight="800"
        font-family="sans-serif" fill="#22d3ee" filter="url(#neon)">NEON</text>
</svg>`,
  },
  {
    id: 'color-matrix',
    chapter: 'Filters & Effects',
    title: 'Colour Effects',
    type: 'picker',
    concept:
      '`<feColorMatrix>` recolours graphics. The `saturate` type dials colour up or down (0 = greyscale), and `hueRotate` spins the colour wheel. These are the same primitives CSS `filter` uses under the hood.',
    options: [
      {
        label: 'original',
        code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <circle cx="70"  cy="60" r="34" fill="#ef4444" />
  <circle cx="130" cy="60" r="34" fill="#3b82f6" />
</svg>`,
      },
      {
        label: 'greyscale',
        code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <defs><filter id="grey"><feColorMatrix type="saturate" values="0" /></filter></defs>
  <g filter="url(#grey)">
    <circle cx="70"  cy="60" r="34" fill="#ef4444" />
    <circle cx="130" cy="60" r="34" fill="#3b82f6" />
  </g>
</svg>`,
      },
      {
        label: 'hue rotate',
        code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <defs><filter id="hue"><feColorMatrix type="hueRotate" values="120" /></filter></defs>
  <g filter="url(#hue)">
    <circle cx="70"  cy="60" r="34" fill="#ef4444" />
    <circle cx="130" cy="60" r="34" fill="#3b82f6" />
  </g>
</svg>`,
      },
    ],
  },

  /* ── Clipping & Masking ─────────────────────────────────────────────────── */
  {
    id: 'clippath',
    chapter: 'Clipping & Masking',
    title: 'Clipping',
    type: 'live',
    concept:
      'A `<clipPath>` crops an element to a shape — anything outside is hidden, with a hard edge. Reference it via `clip-path="url(#id)"`. Here a wide photo-like gradient is clipped to a circle, the classic avatar mask.',
    code: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="circleClip"><circle cx="100" cy="80" r="60" /></clipPath>
    <linearGradient id="pic" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#ec4899" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="200" height="160" fill="url(#pic)" clip-path="url(#circleClip)" />
</svg>`,
  },
  {
    id: 'mask',
    chapter: 'Clipping & Masking',
    title: 'Masking',
    type: 'live',
    concept:
      'A `<mask>` uses **brightness** to decide visibility: white areas show, black areas hide, and grey is partly transparent — giving soft, feathered edges that a clip path cannot. Apply with `mask="url(#id)"`.',
    code: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="fade">
      <stop offset="55%" stop-color="#fff" />
      <stop offset="100%" stop-color="#000" />
    </radialGradient>
    <mask id="softMask"><rect x="0" y="0" width="200" height="140" fill="url(#fade)" /></mask>
  </defs>
  <rect x="0" y="0" width="200" height="140" fill="#8b5cf6" mask="url(#softMask)" />
</svg>`,
  },

  /* ── Animation: CSS ─────────────────────────────────────────────────────── */
  {
    id: 'css-transition',
    chapter: 'Animation: CSS',
    title: 'CSS Transitions (hover)',
    type: 'live',
    concept:
      'You can style SVG with a `<style>` block and animate with plain CSS. A `transition` smoothly interpolates a property when it changes — for example on `:hover`. **Hover the circle** in the preview to see it grow and change colour.',
    code: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
  <style>
    .blob { fill: #0891b2; transition: transform .35s ease, fill .35s ease;
            transform-box: fill-box; transform-origin: center; cursor: pointer; }
    .blob:hover { fill: #ec4899; transform: scale(1.25); }
  </style>
  <circle class="blob" cx="100" cy="70" r="40" />
  <text x="100" y="130" text-anchor="middle" font-size="11" fill="#64748b">hover me</text>
</svg>`,
    challenge: {
      question: 'Which CSS property is required so transform-origin: center works on an SVG shape?',
      options: ['transform-style', 'transform-box: fill-box', 'transform-anchor', 'origin-box'],
      correct: 1,
    },
  },
  {
    id: 'css-keyframes',
    chapter: 'Animation: CSS',
    title: 'CSS @keyframes',
    type: 'picker',
    concept:
      '`@keyframes` defines a named animation you attach with the `animation` shorthand. It runs on its own — no interaction needed. Use the **Replay** button above the preview to restart it. Remember `transform-box: fill-box` so rotations spin in place.',
    options: [
      {
        label: 'spin',
        code: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
  <style>
    @keyframes spin { to { transform: rotate(360deg); } }
    .r { transform-box: fill-box; transform-origin: center;
         animation: spin 2s linear infinite; }
  </style>
  <rect class="r" x="75" y="55" width="50" height="50" rx="8" fill="#0891b2" />
</svg>`,
      },
      {
        label: 'pulse',
        code: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
  <style>
    @keyframes pulse { 0%,100% { transform: scale(1); opacity: 1; }
                       50% { transform: scale(1.4); opacity: .6; } }
    .p { transform-box: fill-box; transform-origin: center;
         animation: pulse 1.4s ease-in-out infinite; }
  </style>
  <circle class="p" cx="100" cy="80" r="34" fill="#8b5cf6" />
</svg>`,
      },
      {
        label: 'bounce',
        code: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
  <style>
    @keyframes bounce { 0%,100% { transform: translateY(0); }
                        50% { transform: translateY(-40px); } }
    .b { transform-box: fill-box;
         animation: bounce 1s cubic-bezier(.5,.05,.5,.95) infinite; }
  </style>
  <circle class="b" cx="100" cy="110" r="24" fill="#ec4899" />
</svg>`,
      },
    ],
  },
  {
    id: 'css-stagger',
    chapter: 'Animation: CSS',
    title: 'Staggered Animation',
    type: 'live',
    concept:
      'Give several elements the same animation but different `animation-delay` values and you get a staggered, wave-like effect — the basis of loading bars and equaliser graphics. Hit **Replay** to watch the cascade again.',
    code: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
  <style>
    @keyframes grow { 0%,100% { transform: scaleY(.3); } 50% { transform: scaleY(1); } }
    .bar { transform-box: fill-box; transform-origin: bottom; fill: #0891b2;
           animation: grow 1s ease-in-out infinite; }
    .bar:nth-child(2){ animation-delay:.15s } .bar:nth-child(3){ animation-delay:.3s }
    .bar:nth-child(4){ animation-delay:.45s } .bar:nth-child(5){ animation-delay:.6s }
  </style>
  <rect class="bar" x="30"  y="30" width="20" height="80" />
  <rect class="bar" x="62"  y="30" width="20" height="80" />
  <rect class="bar" x="94"  y="30" width="20" height="80" />
  <rect class="bar" x="126" y="30" width="20" height="80" />
  <rect class="bar" x="158" y="30" width="20" height="80" />
</svg>`,
  },

  /* ── Animation: SMIL ────────────────────────────────────────────────────── */
  {
    id: 'smil-animate',
    chapter: 'Animation: SMIL',
    title: 'The <animate> Element',
    type: 'live',
    concept:
      'SMIL animation is built into SVG — no CSS needed. Drop an `<animate>` inside a shape and it animates one attribute. Set `attributeName`, `values` (semicolon-separated keyframes), `dur`, and `repeatCount="indefinite"`. Here the circle’s radius breathes.',
    code: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="70" r="20" fill="#0891b2">
    <animate attributeName="r" values="20;45;20" dur="2s" repeatCount="indefinite" />
    <animate attributeName="fill" values="#0891b2;#ec4899;#0891b2" dur="2s" repeatCount="indefinite" />
  </circle>
</svg>`,
    challenge: {
      question: 'Which attribute makes a SMIL animation loop forever?',
      options: ['loop="true"', 'repeatCount="indefinite"', 'repeat="infinite"', 'dur="loop"'],
      correct: 1,
    },
  },
  {
    id: 'smil-transform',
    chapter: 'Animation: SMIL',
    title: 'animateTransform',
    type: 'picker',
    concept:
      'To animate a transform you need `<animateTransform>` with `attributeName="transform"` and a `type` of `rotate`, `scale`, or `translate`. For rotation, the `from`/`to` values can include a centre point: `0 100 70` → `360 100 70`.',
    options: [
      {
        label: 'rotate',
        code: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
  <rect x="75" y="45" width="50" height="50" rx="8" fill="#8b5cf6">
    <animateTransform attributeName="transform" type="rotate"
      from="0 100 70" to="360 100 70" dur="3s" repeatCount="indefinite" />
  </rect>
</svg>`,
      },
      {
        label: 'scale',
        note: 'Scaling animates from the origin — translate first to keep it centred.',
        code: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(100 70)">
    <circle r="30" fill="#0891b2">
      <animateTransform attributeName="transform" type="scale"
        values="1;1.5;1" dur="1.6s" repeatCount="indefinite" />
    </circle>
  </g>
</svg>`,
      },
      {
        label: 'translate',
        code: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
  <circle cx="30" cy="70" r="18" fill="#ec4899">
    <animateTransform attributeName="transform" type="translate"
      values="0 0; 140 0; 0 0" dur="2.5s" repeatCount="indefinite" />
  </circle>
</svg>`,
      },
    ],
  },
  {
    id: 'smil-motion',
    chapter: 'Animation: SMIL',
    title: 'animateMotion',
    type: 'live',
    concept:
      '`<animateMotion>` moves an element **along a path** — you get complex, curved motion for free. Give it a `path` (same syntax as a `<path>` `d`), a `dur`, and add `rotate="auto"` to make the element turn to follow the curve.',
    code: `<svg viewBox="0 0 220 140" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 110 Q110 -10 200 110" fill="none" stroke="#e2e8f0" stroke-width="2" />
  <polygon points="0,-8 14,0 0,8" fill="#0891b2">
    <animateMotion dur="3s" repeatCount="indefinite" rotate="auto"
      path="M20 110 Q110 -10 200 110" />
  </polygon>
</svg>`,
  },
  {
    id: 'smil-timing',
    chapter: 'Animation: SMIL',
    title: 'Timing & keyTimes',
    type: 'live',
    concept:
      '`begin` delays or chains animations (e.g. `begin="1s"`), and `keyTimes` controls **when** each value in `values` is reached — a list from 0 to 1 matching your keyframes. This lets you hold, then snap, then ease. Three dots pulse in sequence below.',
    code: `<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
  <circle cx="60" cy="60" r="12" fill="#0891b2">
    <animate attributeName="r" values="12;20;12" keyTimes="0;0.5;1"
      dur="1.2s" begin="0s" repeatCount="indefinite" />
  </circle>
  <circle cx="100" cy="60" r="12" fill="#8b5cf6">
    <animate attributeName="r" values="12;20;12" keyTimes="0;0.5;1"
      dur="1.2s" begin="0.2s" repeatCount="indefinite" />
  </circle>
  <circle cx="140" cy="60" r="12" fill="#ec4899">
    <animate attributeName="r" values="12;20;12" keyTimes="0;0.5;1"
      dur="1.2s" begin="0.4s" repeatCount="indefinite" />
  </circle>
</svg>`,
  },

  /* ── Pro Techniques ─────────────────────────────────────────────────────── */
  {
    id: 'line-drawing',
    chapter: 'Pro Techniques',
    title: 'Self-Drawing Lines',
    type: 'live',
    concept:
      'The signature SVG effect: set `stroke-dasharray` to the path’s full length so one dash covers it, then animate `stroke-dashoffset` from that length down to 0. The stroke appears to draw itself. Press **Replay** to redraw.',
    code: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
  <style>
    @keyframes draw { to { stroke-dashoffset: 0; } }
    .sig { fill: none; stroke: #0891b2; stroke-width: 4; stroke-linecap: round;
           stroke-dasharray: 400; stroke-dashoffset: 400;
           animation: draw 2.2s ease forwards; }
  </style>
  <path class="sig" d="M20 90 C40 20 70 20 80 70 S120 130 130 70 S170 30 185 60" />
</svg>`,
  },
  {
    id: 'loader',
    chapter: 'Pro Techniques',
    title: 'A Spinner Loader',
    type: 'live',
    concept:
      'Combine a dashed circle with an infinite `rotate` and you have a production-ready loading spinner — tiny, dependency-free, and crisp on any screen. Both SMIL and CSS work; this uses `animateTransform`.',
    code: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="34" fill="none" stroke="#e2e8f0" stroke-width="8" />
  <circle cx="50" cy="50" r="34" fill="none" stroke="#0891b2" stroke-width="8"
          stroke-linecap="round" stroke-dasharray="55 200">
    <animateTransform attributeName="transform" type="rotate"
      from="0 50 50" to="360 50 50" dur="1s" repeatCount="indefinite" />
  </circle>
</svg>`,
  },
  {
    id: 'animated-icon',
    chapter: 'Pro Techniques',
    title: 'Animated Icons',
    type: 'picker',
    concept:
      'Micro-animations bring icons to life. A checkmark that draws on completion, or a heart that pops on like — both are just short animations on a path. Press **Replay** to see them run again.',
    options: [
      {
        label: 'check',
        code: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <style>
    @keyframes pop { 0% { transform: scale(0); } 70% { transform: scale(1.1); } 100% { transform: scale(1); } }
    @keyframes tick { to { stroke-dashoffset: 0; } }
    .ring { transform-box: fill-box; transform-origin: center; animation: pop .4s ease both; }
    .tick { fill: none; stroke: #fff; stroke-width: 8; stroke-linecap: round; stroke-linejoin: round;
            stroke-dasharray: 48; stroke-dashoffset: 48; animation: tick .35s .35s ease forwards; }
  </style>
  <circle class="ring" cx="60" cy="60" r="46" fill="#10b981" />
  <path class="tick" d="M38 62 l14 14 l30 -32" />
</svg>`,
      },
      {
        label: 'heart',
        code: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <style>
    @keyframes beat { 0%,100% { transform: scale(1); } 30% { transform: scale(1.25); } }
    .heart { transform-box: fill-box; transform-origin: center;
             animation: beat .9s ease-in-out infinite; }
  </style>
  <path class="heart" fill="#ef4444"
        d="M60 96 C24 70 14 52 14 38 A24 24 0 0 1 60 30 A24 24 0 0 1 106 38 C106 52 96 70 60 96 Z" />
</svg>`,
      },
    ],
  },
  {
    id: 'morphing',
    chapter: 'Pro Techniques',
    title: 'Shape Morphing',
    type: 'live',
    concept:
      'Animating a path’s `d` attribute **morphs** one shape into another — as long as both paths share the same command structure and point count. Here a triangle melts into a diamond and back with a single `<animate>`.',
    code: `<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
  <path fill="#8b5cf6"
        d="M100 20 L180 140 L20 140 Z">
    <animate attributeName="d" dur="2.4s" repeatCount="indefinite"
      values="M100 20 L180 140 L20 140 Z;
              M100 20 L170 80 L100 140 L30 80 Z;
              M100 20 L180 140 L20 140 Z" />
  </path>
</svg>`,
  },
  {
    id: 'gradient-animation',
    chapter: 'Pro Techniques',
    title: 'Animated Gradients',
    type: 'live',
    concept:
      'Gradient stops are animatable too. Animate each `<stop>`’s `stop-color` through a set of hues and the fill shifts like a living surface — a modern hero-background trick with zero images.',
    code: `<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="live" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0891b2">
        <animate attributeName="stop-color"
          values="#0891b2;#8b5cf6;#ec4899;#0891b2" dur="6s" repeatCount="indefinite" />
      </stop>
      <stop offset="100%" stop-color="#ec4899">
        <animate attributeName="stop-color"
          values="#ec4899;#0891b2;#8b5cf6;#ec4899" dur="6s" repeatCount="indefinite" />
      </stop>
    </linearGradient>
  </defs>
  <rect x="20" y="20" width="160" height="100" rx="16" fill="url(#live)" />
</svg>`,
  },
  {
    id: 'responsive-svg',
    chapter: 'Pro Techniques',
    title: 'Responsive & Accessible SVG',
    type: 'live',
    concept:
      'Drop the fixed `width`/`height` and keep only `viewBox` — the SVG then scales to fill its container. `preserveAspectRatio` controls how it fits. For accessibility, add a `<title>` (tooltip + screen readers) and `role="img"`. This is production-ready markup.',
    code: `<svg viewBox="0 0 200 120" role="img" preserveAspectRatio="xMidYMid meet"
     xmlns="http://www.w3.org/2000/svg">
  <title>A responsive teal badge that scales to any size</title>
  <rect x="10" y="10" width="180" height="100" rx="16" fill="#0891b2" />
  <text x="100" y="68" text-anchor="middle" fill="#fff" font-size="22"
        font-weight="700" font-family="sans-serif">Scalable</text>
</svg>`,
  },
];
