// Tag taxonomy for the UI Snippets library.
//
// A tag is a cross-cutting label — the library a snippet loads, the browser API it
// calls, the CSS technique it shows off, or the product surface it belongs to. Unlike
// a category (a snippet has exactly one), a snippet carries up to five tags, so a
// GSAP-powered pricing table shows up under both `gsap` and `ecommerce`.
//
// Membership is generated: scripts/generate-snippet-tags.mjs scans every snippet and
// writes src/lib/snippet-tag-map.js. This file holds the human half — labels, meta
// copy, and the on-page SEO content each /ui-snippets/tag/<id>/ page renders.
//
// `{n}` in any title/subtitle is replaced at build time with the live snippet count
// for that tag, so the number can never drift from the real library.

import { SNIPPET_TAG_MAP } from './snippet-tag-map.js';

export const BASE_URL = 'https://webdevpuneet.com/ui-snippets';
export const TAG_BASE = `${BASE_URL}/tag`;

// Every tag OG image is generated at exactly 1200×630 by scripts/make-tag-og-images.mjs.
export const TAG_OG_DIR = 'https://webdevpuneet.com/images/ui-snippets/tags';
export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

// A tag needs at least this many snippets to get its own indexed page — a
// three-result page is a thin page, and thin pages are worth less than no page.
export const MIN_TAG_SNIPPETS = 5;

/**
 * The taxonomy. Per tag:
 *   label     display name (chips, headings, breadcrumbs)
 *   ogSource  which existing category PNG the 1200×630 OG image is cropped from
 *   blurb     one sentence — meta description opener and chip tooltip
 *   intro     the About paragraph(s) on the tag page
 *   features  what the collection covers, 5 bullets
 *   useCases  4 { icon, title, desc } cards — icons: CODE APP DESIGN LEARN FLOW STAR FORM
 *   faqs      3 tag-specific Q&As (two shared ones are appended by tagSeoContent)
 */
export const TAGS = [
  /* ── Libraries ─────────────────────────────────────────────────────────── */
  {
    id: 'gsap', label: 'GSAP', ogSource: 'animations',
    tail: 'GSAP Animation & ScrollTrigger Examples',
    blurb: 'Copy-paste GSAP animation snippets — timelines, ScrollTrigger pinning, stagger grids and SVG morphs, all runnable from a single CDN script tag.',
    intro: `GSAP is the animation library production sites reach for when CSS transitions run out of room: precise timelines, scroll-linked scrubbing, and pinning that stays smooth on a long page. Every snippet tagged **GSAP** loads the library from a CDN — no npm install, no build step — and keeps its timeline setup in one readable block you can lift straight into a component.\n\nThe collection spans the whole surface: basic tweens and staggers, ScrollTrigger reveals and pinned story sections, image-sequence scrubbing, SVG path animation, and the flip/morph transitions that make a layout change feel deliberate rather than abrupt.\n\n**Timelines over one-off tweens**\n\nA gsap.to() call is a tween; a gsap.timeline() is a sequence of them with shared position labels, per-tween offsets and a single play/pause/reverse surface. Every multi-step snippet here builds a timeline rather than chaining callbacks, because a timeline can be scrubbed, reversed and retimed as a whole — the property that makes GSAP worth reaching for once an animation has more than two moving parts.\n\n**ScrollTrigger for anything tied to scroll position**\n\nPinning a section, scrubbing a value against scroll progress, or firing a reveal at a precise viewport offset is ScrollTrigger's job, and it is a genuinely hard problem to hand-roll correctly across browsers — start/end markers, resize recalculation and momentum scrolling all have edge cases ScrollTrigger has already solved. These snippets configure it with explicit start/end strings and scrub values rather than magic numbers, so the trigger points stay readable months later.\n\n**Stagger, and why it reads as intentional**\n\nAnimating a grid or a list one element at a time, with a small per-child delay, is the difference between a page that "appears" and a page that "arrives." GSAP's stagger option computes that delay from the DOM order automatically, including grid-aware distributions that ripple from the centre or a corner rather than a flat left-to-right sweep.\n\n**Cleanup discipline**\n\nBecause GSAP timelines and ScrollTrigger instances keep running until explicitly killed, every snippet that mounts one also tears it down — killing the timeline and any associated ScrollTrigger on unmount or teardown. This is the single most common bug in hand-ported GSAP code, and it is why the framework exports here route setup and cleanup through the mount hook rather than leaving it to whoever integrates the snippet.`,
    features: [
      'Timeline sequencing — chained tweens with labels, offsets and per-child stagger',
      'ScrollTrigger reveals, scrubs and pinned sections wired to real scroll position',
      'Image-sequence and canvas scrubbing driven by scroll progress',
      'SVG path draw, morph and motion-path animation',
      'Every snippet loads GSAP from a CDN — nothing to install, nothing to bundle',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Marketing pages and product tours', desc: 'Pinned sections and scroll-scrubbed reveals turn a long landing page into a paced narrative instead of a wall of blocks.' },
      { icon: 'STAR',   title: 'Agency and portfolio sites', desc: 'Stagger grids, morphing shapes and motion-path animation signal craft in the first three seconds of a visit.' },
      { icon: 'CODE',   title: 'Replacing brittle scroll listeners', desc: 'ScrollTrigger handles start/end points, scrubbing and cleanup that hand-rolled scroll handlers usually get wrong.' },
      { icon: 'LEARN',  title: 'Learning timeline-based animation', desc: 'Each snippet is a small, complete timeline — the fastest way to see how labels, offsets and eases compose.' },
    ],
    faqs: [
      { q: 'Do I need a GSAP licence to use these snippets?', a: 'GSAP\'s core, including ScrollTrigger, is free for the vast majority of uses under its standard licence. The bonus plugins (SplitText, MorphSVG and friends) are the paid ones — none of the snippets here depend on them, so everything in this tag runs on the free CDN build.' },
      { q: 'How do I use a GSAP snippet in React, Vue or Angular?', a: 'Export the snippet to your framework from the editor. The exporter moves the timeline setup into the mount hook — useEffect in React, onMounted in Vue, ngAfterViewInit in Angular — and returns a cleanup that kills the timeline and any ScrollTrigger instances, which is the step most hand-ported GSAP code forgets.' },
      { q: 'Will GSAP animation hurt scroll performance?', a: 'Not when it animates transform and opacity, which is what these snippets do. GSAP batches its work into a single requestAnimationFrame tick, so ten animating elements cost one loop rather than ten competing ones — usually smoother than the equivalent CSS transitions firing independently.' },
    ],
  },
  {
    id: 'three-js', label: 'Three.js', ogSource: 'animations',
    tail: 'Three.js WebGL Scenes & Shader Effects',
    blurb: 'WebGL scenes you can paste into a page — Three.js particle fields, shader backgrounds, 3D product viewers and orbiting hero graphics.',
    intro: `Three.js puts a WebGL renderer behind a normal \`<canvas>\`, and these snippets keep that surface small: a scene, a camera, one or two meshes, and a render loop short enough to read in a single screen. No bundler, no asset pipeline — the library loads from a CDN and the whole demo is self-contained.\n\nThe tag covers ambient hero backgrounds, particle and point-cloud fields, shader-driven gradients, rotating product and device viewers, and the orbit-controls patterns that make a 3D object feel inspectable rather than decorative.\n\n**The scene graph, kept minimal**\n\nEvery snippet follows the same skeleton — a Scene, a PerspectiveCamera, a WebGLRenderer sized to its container, one or two meshes, and a light or two if the material needs one. Keeping that skeleton visible rather than burying it behind a framework abstraction is deliberate: it is the part every Three.js tutorial glosses over, and the part you actually need to see once to stop being intimidated by the library.\n\n**Particle fields and instancing**\n\nWhen a snippet needs hundreds or thousands of points, it uses a single BufferGeometry with a Points or InstancedMesh object rather than one mesh per particle — the difference between one draw call and thousands. This is also where most of the perceived "3D performance" work actually lives: the GPU handles a hundred thousand instanced points without effort, and the same count as individual meshes will stall a phone.\n\n**Shaders, when a material alone will not do**\n\nA handful of snippets write a custom vertex or fragment shader with GLSL, passing time or pointer position in as a uniform. This is the lowest-level surface Three.js exposes, and it is worth using sparingly — most visual effects are achievable with a built-in material, and a custom shader is the tool for the specific cases (flowing gradients, distortion, procedural noise) that built-in materials cannot express.\n\n**Orbit controls and making a model feel real**\n\nOrbitControls with damping enabled is what turns a static rotation into something that feels like it has inertia — the camera keeps drifting slightly after the pointer releases, then settles. Pairing that with a resize handler that recomputes the camera's aspect ratio and the renderer's size is what keeps a 3D viewer usable when the browser window changes shape, which a surprising number of published demos get wrong.`,
    features: [
      'Scene, camera and renderer setup condensed to a readable block',
      'Particle fields, point clouds and instanced geometry for hero backgrounds',
      'Custom fragment/vertex shader demos with uniforms driven by pointer or time',
      'Orbiting product viewers with damped controls and responsive resize handling',
      'Device-pixel-ratio clamping and animation cleanup so the loop never leaks',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Hero backgrounds with depth', desc: 'A slow particle field or shader gradient gives a landing page motion that a static image cannot, at a cost you control.' },
      { icon: 'APP',    title: 'Product and device viewers', desc: 'Let users orbit a model instead of clicking through five flat photographs — the single highest-value 3D use on a commerce page.' },
      { icon: 'LEARN',  title: 'Learning WebGL without the boilerplate', desc: 'Each snippet is a complete scene, so the parts that usually take an afternoon to wire up are already wired.' },
      { icon: 'CODE',   title: 'Prototyping a shader idea', desc: 'Edit the fragment shader in the live editor and watch it recompile — no toolchain between the idea and the pixels.' },
    ],
    faqs: [
      { q: 'Do these Three.js snippets work on mobile?', a: 'Yes, though they are the heaviest snippets in the library. Each one clamps devicePixelRatio and resizes with the viewport, which is what keeps a retina phone from rendering four times the pixels it needs. For low-end devices, reduce the particle count or geometry detail first — that is almost always the bottleneck, not the shader.' },
      { q: 'How do I stop the render loop when the component unmounts?', a: 'Keep the id returned by requestAnimationFrame and call cancelAnimationFrame on teardown, then dispose the geometry, materials and renderer. The framework exports do this in the cleanup function; if you paste the raw JS into a single-page app, add it yourself or the loop keeps running against a detached canvas.' },
      { q: 'Can I load my own 3D model?', a: 'Yes — add GLTFLoader from the same CDN, load your .glb, and add the returned scene to the existing scene graph. The camera, lighting and resize handling in these snippets stay exactly as they are.' },
    ],
  },
  {
    id: 'bootstrap', label: 'Bootstrap', ogSource: 'dashboards',
    tail: 'Bootstrap 5 Components Built on the Real Framework',
    blurb: 'Copy-paste Bootstrap 5.3 snippets — navbars, modals, offcanvas panels, tabs and accordions — built on the real bootstrap.min.css and bootstrap.bundle.min.js, not a lookalike.',
    intro: `Every snippet tagged **Bootstrap** loads the actual Bootstrap 5.3 framework from a CDN — the real \`bootstrap.min.css\` and \`bootstrap.bundle.min.js\`, not custom CSS made to resemble it. That distinction is what makes the difference between a snippet you can only screenshot and one you can paste straight into an existing Bootstrap project: the class names, the \`data-bs-*\` attributes, and the JavaScript component behavior all match exactly, because it is the same framework running underneath.\n\nThe tag spans the components a real Bootstrap project reaches for most — a responsive navbar with a working hamburger collapse, a hero section, a product card grid, a pricing table, a login form, a multi-step signup modal, an offcanvas cart, a tabbed settings panel, a searchable accordion, and a full admin dashboard shell — each pairing Bootstrap's own components with a small amount of custom JavaScript that adds one genuinely useful behavior on top.\n\n**Bootstrap's own JavaScript does the heavy lifting**\n\nA modal closes itself with \`bootstrap.Modal.getInstance(el).hide()\` — the documented API. A tab panel switches via \`data-bs-toggle="pill"\`, Bootstrap's own Tab component, not a hand-rolled click handler. None of these snippets reimplement what Bootstrap's bundled JavaScript already does correctly; the custom code that is here exists specifically because it is not something Bootstrap ships out of the box — a live search filter, a cart subtotal, a fade-swap price toggle.\n\n**What is Bootstrap's, and what is custom**\n\nEvery snippet's CSS tab holds only what was layered on top of Bootstrap's own styles — a gradient, a hover lift, a spacing tweak — never Bootstrap's base styles, which stay in the CDN stylesheet. That separation is deliberate: it is what lets you read a snippet's CSS panel and see exactly what you would need to add to a plain Bootstrap component to get this result, rather than untangling a wall of overrides.\n\n**Dropping one into your own project**\n\nBecause the markup uses Bootstrap's real classes, copying it into a project that already loads Bootstrap works immediately — no class renaming, no CSS specificity fights. Each snippet's CDN panel shows the exact, pinned Bootstrap version used, so you always know precisely what is being loaded.`,
    features: [
      'Real Bootstrap 5.3 — the actual bootstrap.min.css and bootstrap.bundle.min.js from a CDN, not a lookalike',
      'Bootstrap\'s own JS components used correctly — Modal, Collapse, Offcanvas, Tab — not reimplemented by hand',
      'A small, deliberate amount of custom JavaScript per snippet, adding one behavior Bootstrap doesn\'t ship',
      'Copy-paste ready into any existing Bootstrap project — class names and structure match exactly',
      'CDN panel shows the exact pinned Bootstrap version each snippet loads',
    ],
    useCases: [
      { icon: 'CODE',   title: 'Dropping a component into an existing Bootstrap project', desc: 'Real classes and real JS components mean copying one into a project that already loads Bootstrap works immediately, with no conflicts to resolve.' },
      { icon: 'LEARN',  title: 'Learning how a Bootstrap component actually works', desc: 'See exactly which classes a working navbar, modal or accordion needs, and how data-bs-toggle/data-bs-target wire it up, without digging through the full docs.' },
      { icon: 'FLOW',   title: 'Prototyping an admin panel or dashboard fast', desc: 'The admin dashboard and pricing-table snippets give a working starting layout that would otherwise take an hour to assemble from Bootstrap\'s components by hand.' },
      { icon: 'DESIGN', title: 'Seeing custom styling layered cleanly on Bootstrap defaults', desc: 'Each snippet\'s CSS tab shows only what was added on top of Bootstrap — a minimal reference for theming without fighting its base styles.' },
    ],
    faqs: [
      { q: 'Do these snippets use real Bootstrap, or CSS made to look like it?', a: 'Real Bootstrap — every snippet loads the actual bootstrap.min.css and bootstrap.bundle.min.js from a CDN, visible and copyable in its CDN panel, and uses Bootstrap\'s genuine component classes and JavaScript.' },
      { q: 'Which version of Bootstrap is used?', a: 'Bootstrap 5.3, loaded via a pinned CDN version so every snippet behaves identically to how it looked when built. The exact version is visible in each snippet\'s CDN panel.' },
      { q: 'Can I drop one of these directly into my existing Bootstrap project?', a: 'Yes — since the markup uses Bootstrap\'s real classes and component structure, copying the HTML (and any custom CSS/JS shown in those tabs) into a project that already loads Bootstrap works without modification.' },
    ],
  },
  {
    id: 'js-libraries', label: 'JS Libraries', ogSource: 'dashboards',
    tail: 'CDN-Loaded JS Library Demos',
    blurb: 'Snippets built on real JavaScript libraries loaded from a CDN — animation, scroll, charting, physics and particle libraries wired up and ready to paste.',
    intro: `Some effects are not worth hand-rolling. These snippets each load a real library from a CDN — Lottie, Swiper, Matter.js, Chart.js, D3, p5, PixiJS, Lenis, Scrollama, tsParticles, Typed.js, Vanilla Tilt and more — and show the minimum wiring that library needs to do something useful.\n\nBecause every dependency arrives as a plain script tag, there is no install step and no bundler config: the snippet runs the moment you paste it, and the library version is visible in the URL so you always know what you are shipping.\n\n**Why a library instead of hand-rolled code**\n\nPhysics simulation, force-directed layout, smooth-scroll easing and carousel touch handling are all problems with more edge cases than they first appear — collision resolution, momentum, resize recalculation, accessibility keyboard paths. A mature library has already absorbed years of bug reports against those edge cases; reproducing that from scratch for a single page is rarely a good trade, which is exactly the judgement call this tag is meant to make concrete.\n\n**The minimum-wiring principle**\n\nEach snippet resists the temptation to demonstrate a library's entire API. It shows the smallest setup that produces a genuinely useful result — one Swiper instance with the options that matter, one Matter.js world with a handful of bodies — so the snippet reads as a starting point to extend rather than a feature tour to trim down.\n\n**Version pinning as a habit**\n\nEvery CDN URL here pins an exact version rather than a floating tag like @latest. A floating tag means your page's behaviour can change the day the library ships a breaking release, with no code change on your side to explain it. Pinning trades that risk for an explicit, deliberate upgrade you control and can test before it reaches production.\n\n**When to graduate to npm**\n\nA CDN script tag is the right choice for a static page, a prototype, or a single effect bolted onto a server-rendered template. Once a project has a real build step, installing the package instead brings tree-shaking, type definitions, and a lockfile — the snippet's logic ports over unchanged, only the import line differs.`,
    features: [
      'Every dependency loads from a CDN as a plain script tag — no npm, no build step',
      'Animation and motion libraries: Lottie, Anime.js, Motion One, KUTE.js, Vivus',
      'Scroll libraries: Lenis, Locomotive Scroll, Scrollama, Rellax, AOS',
      'Canvas and physics: PixiJS, Matter.js, p5.js, Paper.js, tsParticles, canvas-confetti',
      'Pinned library versions in every URL, so an upstream release can never change your page overnight',
    ],
    useCases: [
      { icon: 'CODE',  title: 'Evaluating a library before adopting it', desc: 'A runnable minimal example beats a README — see the real API surface and output before it enters your package.json.' },
      { icon: 'APP',   title: 'Prototyping without a toolchain', desc: 'Drop the snippet into a static HTML file and you have a working prototype in seconds, with no project scaffolding.' },
      { icon: 'FLOW',  title: 'Adding one effect to a legacy page', desc: 'A CDN script tag is often the only realistic way to add motion to a WordPress theme or a server-rendered template.' },
      { icon: 'LEARN', title: 'Learning a library\'s initialisation pattern', desc: 'Every snippet shows the setup-plus-teardown shape a library expects, which is the part docs usually spread across five pages.' },
    ],
    faqs: [
      { q: 'Should I use a CDN in production?', a: 'For a marketing page or a prototype, a pinned CDN URL is fine and saves you a build step. For an application you ship regularly, install the package instead — you get version control, tree shaking, offline builds, and no third-party host in your critical path. The snippet code stays identical either way; only the import changes.' },
      { q: 'How do I know which library a snippet uses?', a: 'Open the snippet and check the CDN URLs listed in the editor — every external script is declared there with an exact pinned version, and the same list is what the export writes into the generated file.' },
      { q: 'Can I swap the pinned version for a newer one?', a: 'Yes, and it is worth doing deliberately rather than by using a floating tag. Bump the version in the CDN URL, run the preview, and check the console — most breakage from a major bump shows up immediately as a missing method on initialisation.' },
    ],
  },
  {
    id: 'lottie', label: 'Lottie', ogSource: 'loaders',
    tail: 'Lottie Animation Examples',
    blurb: 'Lottie animation snippets — After Effects JSON played in the browser for loaders, empty states, success ticks and micro-illustrations.',
    intro: `Lottie plays vector animations exported from After Effects as JSON, which makes it the practical bridge between a motion designer's file and a real interface. These snippets load lottie-web from a CDN and cover the patterns that actually earn their weight: loading indicators, success confirmations, empty-state illustrations and small looping accents.\n\nEach one shows the parts that matter in production — controlling playback, reacting to a state change, and keeping the animation from fighting a user's reduced-motion preference.\n\n**Why JSON instead of a GIF or video**\n\nA Lottie file describes vector shapes and keyframes as data, not pixels, so it stays sharp at any size, is usually a fraction of the file size of an equivalent GIF, and can be recoloured or resized from CSS-adjacent code rather than re-exported. That is also what makes it editable after the fact — swapping a colour is a find-and-replace in JSON, not a re-render in After Effects.\n\n**Playback as an API, not a video tag**\n\nlottie-web exposes play, pause, stop, and setSpeed, plus segment control that plays only a portion of the timeline — the mechanism behind a success animation that plays its "build" segment once and then loops only the idle portion. These snippets drive that API from real interface state (a promise resolving, a click, a tab becoming visible) rather than firing it on a timer, which is what makes the animation feel like feedback instead of decoration.\n\n**Sizing and renderer choice**\n\nlottie-web can render to SVG, canvas or HTML, and the choice affects both crispness and cost: SVG stays vector-sharp and is the default for anything that scales with its container, canvas is cheaper for animations with very high shape counts. Every snippet here sets an explicit renderer rather than leaving it implicit, because the default is not always the right one for the animation's complexity.\n\n**Respecting reduced motion without losing the illustration**\n\nBecause a Lottie animation is a real asset, not a CSS transform, the reduced-motion path here calls goToAndStop on a representative frame rather than removing the element — the user still sees the illustration doing its job as static art, they just do not see it move. That is a meaningfully better fallback than hiding the animation entirely, which is what a naive prefers-reduced-motion guard tends to do.`,
    features: [
      'lottie-web loaded from a CDN, playing JSON animations with no build step',
      'Play, pause, seek and segment control driven by interface state',
      'Loop and one-shot patterns for loaders versus confirmations',
      'Reduced-motion handling that falls back to a static frame',
      'Renderer sizing that keeps a vector animation crisp at any container width',
    ],
    useCases: [
      { icon: 'FLOW',   title: 'Loading and processing states', desc: 'A designed loop reads as intentional where a generic spinner reads as a stall — worth it on any wait longer than a second.' },
      { icon: 'STAR',   title: 'Success and celebration moments', desc: 'A one-shot tick or burst on checkout, upload or signup completion, played once and then left in its final frame.' },
      { icon: 'DESIGN', title: 'Empty states and onboarding', desc: 'A small illustrated loop turns a blank screen into a moment of personality without a heavy hero image.' },
      { icon: 'CODE',   title: 'Handing motion work to designers', desc: 'The animation lives in a JSON file, so a designer can iterate on it without touching your component code.' },
    ],
    faqs: [
      { q: 'Where do the JSON animation files come from?', a: 'From After Effects via the Bodymovin plugin, or from a free library such as LottieFiles. The snippet points at a URL, so swapping in your own animation is a one-line change.' },
      { q: 'Is Lottie heavier than a CSS animation?', a: 'The library itself is the main cost — roughly the weight of a mid-sized image. For one small loader, CSS is lighter. For several illustrated animations, or anything a designer needs to own, Lottie usually wins because the incremental cost per animation is just a small JSON file.' },
      { q: 'How do I respect prefers-reduced-motion?', a: 'Check window.matchMedia("(prefers-reduced-motion: reduce)") before playing, and if it matches, call goToAndStop on a representative frame instead of play. The user still sees the illustration; it just does not move.' },
    ],
  },

  /* ── Browser APIs and platform features ────────────────────────────────── */
  {
    id: 'canvas', label: 'Canvas', ogSource: 'games',
    tail: 'Canvas Particle & Drawing Effects',
    blurb: 'HTML5 canvas snippets — particle systems, generative backgrounds, drawing tools, game loops and pixel effects in plain 2D context code.',
    intro: `The 2D canvas context is the right tool the moment you need more elements than the DOM can comfortably animate, or pixel-level control the DOM simply does not offer. These snippets cover both: particle fields and generative backgrounds where element count is the point, and drawing, signature and image-effect tools where reading and writing pixels is the point.\n\nEvery one keeps the render loop small and explicit — clear, update, draw — and handles the two details canvas demos usually skip: device-pixel-ratio scaling and cleaning up the animation frame.\n\n**The clear/update/draw loop**\n\nEvery animated snippet here structures its requestAnimationFrame callback the same way: clear the canvas (or paint a translucent rectangle for a trailing effect), update the state of every particle or shape in plain JavaScript objects, then draw the result. Keeping those three phases separate is what makes a hundred-line particle system readable — the physics never gets tangled with the drawing calls.\n\n**Why canvas wins at high element counts**\n\nThe DOM's cost scales with node count: a thousand animated divs means a thousand things the browser has to track for layout, style and paint. A canvas is one element regardless of how many particles it draws, because everything inside it is pixels the browser forgets the instant the frame is presented. That trade — no per-shape DOM cost, but no per-shape styling or hit-testing either — is the entire case for reaching for canvas over absolutely-positioned elements.\n\n**Pixel-level work with getImageData**\n\nThe drawing and image-effect snippets read and write raw pixel data directly — colour picking from a click point, a threshold filter, a signature exported as a PNG. This is the one thing SVG and the DOM genuinely cannot do, and it is why tools like colour pickers and image filters live on canvas rather than as styled elements.\n\n**The two details that separate a demo from production code**\n\nA canvas has a CSS size and a separate backing-store pixel size; setting only the CSS size leaves retina screens blurry, so every snippet here multiplies both by devicePixelRatio and scales the context to match. And because requestAnimationFrame keeps calling itself indefinitely, every snippet stores the returned id and cancels it on teardown — skipping that step is the most common reason a "finished" canvas demo keeps burning CPU on a page nobody is looking at.`,
    features: [
      'requestAnimationFrame render loops with explicit clear/update/draw phases',
      'Particle systems, flow fields and generative backgrounds that stay smooth at high counts',
      'Drawing, signature-pad and freehand tools with pointer-event input',
      'Pixel manipulation via getImageData for filters, colour picking and effects',
      'devicePixelRatio scaling so lines stay crisp on retina displays',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Animated hero backgrounds', desc: 'Hundreds of moving particles cost one canvas element rather than hundreds of DOM nodes the compositor has to track.' },
      { icon: 'FORM',   title: 'Signature and annotation capture', desc: 'Pointer events into a canvas is the standard way to collect a signature or let a user mark up an image in the browser.' },
      { icon: 'APP',    title: 'Games and interactive toys', desc: 'A canvas plus a game loop is the shortest path from idea to something playable, with no engine to learn first.' },
      { icon: 'LEARN',  title: 'Learning graphics fundamentals', desc: 'Transform stacks, easing, collision and particle physics are all easier to understand at this level than behind an abstraction.' },
    ],
    faqs: [
      { q: 'Why does my canvas look blurry on a retina screen?', a: 'Because the canvas has a CSS size and a separate backing-store size. Set canvas.width/height to the CSS size multiplied by window.devicePixelRatio, then scale the context by the same factor. Every canvas snippet here does this, which is why lines stay sharp on a phone.' },
      { q: 'Canvas or SVG?', a: 'SVG for a modest number of shapes you need to style, hit-test or animate individually — it stays in the DOM, so CSS and accessibility tooling can reach it. Canvas once you cross a few hundred moving elements, or when you need per-pixel work. Canvas draws pixels and forgets them, which is exactly why it scales.' },
      { q: 'How do I stop a canvas animation cleanly?', a: 'Store the id from requestAnimationFrame and call cancelAnimationFrame when the element goes away. In a single-page app this matters: without it, the loop keeps running against a canvas nobody can see, burning battery for nothing.' },
    ],
  },
  {
    id: 'svg', label: 'SVG', ogSource: 'charts',
    tail: 'Animated SVG Icons & Graphics',
    blurb: 'SVG snippets — animated icons, progress rings, path-draw effects, morphing shapes, charts and dividers that stay sharp at any size.',
    intro: `SVG is vector graphics that live in the DOM, which means CSS can style them, JavaScript can animate them, and they stay crisp at every resolution. These snippets use that directly: stroke-dasharray progress rings, path-draw line reveals, morphing shapes, animated icons, and chart marks drawn as real elements rather than images.\n\nBecause every part is an element, each one can be targeted, transitioned and made accessible — the practical difference between an icon that responds to state and an image that just sits there.\n\n**The dash-offset trick, once and for all**\n\nA single idea underlies most of the "drawing" effects in this tag: set stroke-dasharray to a path's own length so one dash covers it entirely, then animate stroke-dashoffset from that length to zero. The stroke appears to grow along the path. Because path.getTotalLength() gives that length for any arbitrary shape, the same technique produces a circular progress ring, a signature that draws itself, and a route line that traces across a map.\n\n**Paths as state, not pictures**\n\nAn icon built from SVG paths can morph between two shapes by interpolating their point coordinates, or swap strokes for state — a hamburger's three lines rotating and merging into an X is a CSS transition on individual <line> or <path> elements, not a sprite swap. That is only possible because each stroke is an addressable element; the same visual result baked into a static image file has no state to transition between.\n\n**Charts as marks, not screenshots**\n\nWhen a chart's bars, lines or arcs are real <rect>, <path> and <circle> elements, each one can carry its own hover state, transition when the underlying value changes, and be labelled for a screen reader individually. Rendering the same chart as a canvas bitmap or an exported image loses all three properties at once.\n\n**Making it accessible on purpose**\n\nAn inline SVG with no label is announced as nothing meaningful, which is worse than a plain image with alt text. Meaningful graphics get role="img" and a <title> referenced by aria-labelledby; purely decorative ones — the animated dividers and background flourishes — get aria-hidden="true" so they are skipped entirely rather than read as noise.`,
    features: [
      'stroke-dasharray / stroke-dashoffset progress rings and path-draw reveals',
      'Animated, state-aware icons — menu-to-close, play-to-pause, check and error marks',
      'Shape morphing and path interpolation for logo and illustration transitions',
      'Charts drawn as real SVG marks so every point can be styled or hit-tested',
      'Gradients, masks and clip paths for effects that would need images otherwise',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Progress rings and gauges', desc: 'A dash-offset ring is the standard way to show a percentage in a dashboard tile, and it scales to any size for free.' },
      { icon: 'APP',    title: 'Icons that reflect state', desc: 'Because the paths are elements, a hamburger can morph into a close mark with a CSS transition instead of a sprite swap.' },
      { icon: 'FLOW',   title: 'Line-draw reveals on scroll', desc: 'Animating stroke-dashoffset makes a path draw itself — the effect behind most animated signature and route graphics.' },
      { icon: 'LEARN',  title: 'Understanding the SVG coordinate system', desc: 'viewBox, preserveAspectRatio and unit scaling stop being abstract once you can edit them live and watch the shape move.' },
    ],
    faqs: [
      { q: 'How does the stroke-dashoffset progress trick work?', a: 'Set stroke-dasharray to the path\'s total length so the dash covers the whole shape, then animate stroke-dashoffset from that length down to zero — the visible portion grows from nothing to complete. For a circle the length is 2πr; for an arbitrary path, path.getTotalLength() gives it.' },
      { q: 'Should SVG be inline or in an <img> tag?', a: 'Inline when you need to style or animate its parts — CSS and JS cannot reach inside an <img>. Use <img> for large static illustrations you want cached and kept out of the document. Every snippet here is inline, because every one animates something.' },
      { q: 'How do I make an SVG accessible?', a: 'For meaningful graphics, add role="img" and a <title> as the first child, referenced with aria-labelledby. For decorative ones, aria-hidden="true" so screen readers skip them entirely. An unlabelled inline SVG is announced as nothing useful at all.' },
    ],
  },
  {
    id: 'intersection-observer', label: 'IntersectionObserver', ogSource: 'scroll',
    tail: 'Scroll Reveal & Lazy Load Examples',
    blurb: 'IntersectionObserver snippets — scroll reveals, lazy loading, sticky-state detection, infinite scroll and scrollspy, with no scroll listeners.',
    intro: `IntersectionObserver lets the browser tell you when an element crosses a viewport threshold, instead of you asking on every scroll frame. That single inversion removes the layout thrash that makes hand-rolled scroll listeners janky, and it is why every reveal-style snippet in this library uses it.\n\nThe tag covers fire-once reveals and staggered grids, lazy loading of images and iframes, scrollspy navigation that highlights the section you are reading, infinite-scroll sentinels, and the "is this sticky header stuck yet" trick that has no other clean solution.\n\n**Push instead of poll**\n\nA scroll listener is a poll: you ask "are we there yet" on every single scroll event, and any layout read inside that handler — getBoundingClientRect, offsetTop — forces the browser to recompute layout synchronously, often dozens of times a second. An observer is a push: the browser does the intersection math on its own schedule, off the critical path, and calls your code only when a threshold is actually crossed. The snippets here never mix the two — once an observer is watching an element, no scroll listener duplicates that work.\n\n**Thresholds and rootMargin as tuning, not boilerplate**\n\nThe threshold option controls how much of an element must be visible before it counts as intersecting, and rootMargin grows or shrinks the viewport box the observer checks against. A negative bottom margin is what makes a reveal fire once an element is meaningfully on screen rather than the instant its top pixel appears — a detail that is the difference between an animation that feels timed and one that feels premature.\n\n**Fire-once versus continuous watching**\n\nMost reveal and lazy-load snippets call unobserve on an element the moment they act on it, because re-triggering an entrance animation every time a user scrolls past it reads as a bug. Scrollspy and sticky-header detection are the exception — they need to keep watching indefinitely, since the answer to "which section is current" changes for as long as the page keeps scrolling.\n\n**The sentinel pattern**\n\nInfinite scroll and stuck-header detection both work by observing an invisible marker element rather than the content itself — a sentinel placed just before the end of a list, or a one-pixel element just above a sticky header. When the sentinel crosses the viewport, the observer fires, and the actual work (loading the next page, adding a "stuck" class) happens in response. It is a small indirection that turns two otherwise-awkward problems into the same well-understood technique.`,
    features: [
      'Fire-once reveals that unobserve after triggering — no repeated work',
      'Staggered grid and list entrances driven by per-child delay',
      'Lazy loading for images, iframes and heavy embeds below the fold',
      'Scrollspy navigation that tracks the section currently in view',
      'Infinite-scroll sentinels and stuck-state detection for sticky headers',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Reveal-on-scroll sections', desc: 'The most common motion pattern on the web, done the way that does not fight the browser for main-thread time.' },
      { icon: 'FLOW',   title: 'Lazy loading below the fold', desc: 'Defer images, maps and video embeds until they are about to be seen, using rootMargin to start slightly early.' },
      { icon: 'APP',    title: 'Scrollspy and reading progress', desc: 'Highlight the current heading in a docs sidebar without measuring positions on every frame.' },
      { icon: 'CODE',   title: 'Replacing a scroll listener you already have', desc: 'Most existing onscroll handlers map onto a threshold-based observer with less code and better frame times.' },
    ],
    faqs: [
      { q: 'Why is IntersectionObserver better than a scroll listener?', a: 'A scroll handler runs on the main thread on every scroll event, and any layout read inside it (getBoundingClientRect, offsetTop) forces a synchronous reflow. The observer does its intersection math off the main thread and calls you only when a threshold is actually crossed — far fewer calls, and no forced layout.' },
      { q: 'What does rootMargin do?', a: 'It grows or shrinks the box the observer treats as the viewport. A rootMargin of "0px 0px -100px 0px" delays the callback until the element is a hundred pixels inside the viewport, which stops a reveal from firing while the element is still visually at the edge — the small tuning knob that makes reveals feel right.' },
      { q: 'How do I make an animation fire only once?', a: 'Call observer.unobserve(entry.target) inside the callback as soon as you have applied the visible class. Otherwise the element re-animates every time it scrolls back into view, which looks like a bug to anyone scrolling up.' },
    ],
  },
  {
    id: 'local-storage', label: 'Local Storage', ogSource: 'forms',
    tail: 'Local Storage & IndexedDB Examples',
    blurb: 'Snippets that persist state in the browser — localStorage theme and preference memory, saved drafts, IndexedDB collections and recently-viewed lists.',
    intro: `Some state should survive a refresh without a backend: a chosen theme, a dismissed banner, a half-written draft, a list of recently viewed items. These snippets use localStorage, sessionStorage and IndexedDB to keep exactly that kind of state on the device, with no account and no network round trip.\n\nThey also handle the parts that bite in production — storage that throws in private mode, JSON that fails to parse after a schema change, and quota limits that arrive without warning.\n\n**Picking the right storage for the job**\n\nlocalStorage persists across tabs and restarts and is capped around 5MB of synchronous, string-only data — right for a theme flag, a dismissed-banner id, or a short recently-viewed list. sessionStorage holds the same shape of data but clears when the tab closes, which suits a multi-step form that should not survive an accidental close. IndexedDB is asynchronous, holds far more data, stores real objects and blobs without JSON stringifying them, and can be queried by index — the right choice once a draft, cache or dataset outgrows a simple key-value pair.\n\n**Guarding against the ways storage actually fails**\n\nA read or write can throw rather than quietly fail: Safari's private browsing mode throws on any localStorage write, a browser configured to block site data throws on access entirely, and a full quota throws on write specifically. Every snippet that touches storage wraps the call in try/catch and falls back to an in-memory default, so a strict privacy setting degrades the feature instead of crashing the page.\n\n**Schema drift and stale data**\n\nA value written by an older version of a page can fail to parse, or parse into a shape the current code no longer expects. These snippets version their stored payloads or defensively check the parsed shape before trusting it, rather than assuming JSON.parse always returns what was last written — the failure mode otherwise is a page that throws on load for any returning visitor with old data.\n\n**Reading before first paint**\n\nFor anything visual — a theme, a layout preference — reading the stored value has to happen in a small inline script in the document head, before the stylesheet-dependent paint happens. Doing the same read inside a framework's mount effect happens after the first paint, which is exactly when a visible flash of the wrong state occurs.`,
    features: [
      'Theme and preference persistence that survives reload with no flash of the wrong theme',
      'Draft autosave for forms and editors, restored on return',
      'Dismissed-banner and seen-tour flags that respect the user\'s last decision',
      'IndexedDB collections for data too large or too structured for localStorage',
      'try/catch guards for private mode, disabled storage and quota errors',
    ],
    useCases: [
      { icon: 'APP',   title: 'Remembering a user\'s theme', desc: 'Read the stored value before first paint so a dark-mode user never sees a white flash on load.' },
      { icon: 'FORM',  title: 'Autosaving long forms', desc: 'A debounced write on input turns an accidental refresh from lost work into a shrug.' },
      { icon: 'FLOW',  title: 'Onboarding and banner state', desc: 'Store the dismissal, not the display — a banner that reappears every visit is the fastest way to annoy a returning user.' },
      { icon: 'CODE',  title: 'Offline-capable prototypes', desc: 'IndexedDB gives a demo real persistence and querying without standing up any backend at all.' },
    ],
    faqs: [
      { q: 'localStorage or IndexedDB?', a: 'localStorage for small, simple, synchronous values — a theme, a flag, a short list. It is capped at around 5MB and blocks the main thread on every access. IndexedDB for larger, structured or binary data, and anything you need to query: it is asynchronous, far bigger, and stores objects and blobs without serialising to strings.' },
      { q: 'Why wrap storage access in try/catch?', a: 'Because it throws, not returns null, in real situations: Safari private mode, browsers configured to block site data, and a full quota. An unguarded read at module scope can take down the whole page for a user whose only sin is a strict privacy setting.' },
      { q: 'How do I avoid a flash of the wrong theme?', a: 'Read the stored theme in a small inline script in the head, before the stylesheet-dependent paint, and set a class or data attribute on the root element. Doing it in a React effect is too late — the first paint has already happened by then.' },
    ],
  },
  {
    id: 'clipboard-api', label: 'Clipboard API', ogSource: 'dashboards',
    tail: 'Copy-to-Clipboard Examples',
    blurb: 'Copy-to-clipboard snippets — copy buttons with success feedback, code blocks, share links, colour values and API keys via navigator.clipboard.',
    intro: `Copying a value is a two-second interaction that people notice only when it goes wrong. These snippets use \`navigator.clipboard.writeText\` and pair it with the feedback that makes it feel finished: a label that switches to "Copied", a tick that fades back after a moment, a toast for a longer confirmation.\n\nThey also cover the failure paths — an insecure context where the API is unavailable, a rejected permission, and the older \`execCommand\` fallback that still matters on legacy embedded browsers.\n\n**Feedback is the actual feature**\n\nThe copy call itself is one line; every snippet's real content is what happens around it. A button's label swapping to "Copied" and back, an inline tick that fades in and out, a toast that stacks and auto-dismisses — these confirm the action completed, because a silent clipboard write leaves the user unsure whether anything happened at all and prone to clicking twice.\n\n**Timed reset, done correctly**\n\nA "Copied" state that never reverts reads as broken the next time the button is looked at. These snippets reset the label after a short timeout, and clear any previous pending timeout before starting a new one — otherwise clicking the button twice in quick succession leaves it stuck in the confirmed state indefinitely, or reverts early mid-way through the second click's window.\n\n**Why the write has to happen inside the gesture**\n\nnavigator.clipboard.writeText only succeeds when called synchronously inside a user gesture such as a click handler. Awaiting a slow operation — formatting the text, fetching a value — before making the call moves it outside that gesture window in some browsers, and the write silently fails. The fix is to prepare the string first and make the clipboard call the very next synchronous step in the handler.\n\n**Fallbacks that still matter**\n\nThe Clipboard API requires a secure context and is unavailable on plain HTTP or in some embedded webviews. The older document.execCommand("copy") path — create a hidden textarea, select its contents, run the command, remove it — is deprecated but still functions everywhere, which is why a try/catch around the modern call with this as the fallback covers effectively every environment a copy button might run in.`,
    features: [
      'navigator.clipboard.writeText with async success and error handling',
      'Copy buttons with a timed state change back to idle — no permanently stuck "Copied"',
      'Code block, colour value, API key and share-link copy patterns',
      'Toast and inline-tick feedback variants for different densities',
      'Graceful fallback when the Clipboard API is blocked or unavailable',
    ],
    useCases: [
      { icon: 'CODE',  title: 'Code blocks in docs', desc: 'A copy button on every snippet is the single highest-value affordance a documentation page can add.' },
      { icon: 'APP',   title: 'API keys, IDs and tokens', desc: 'Long opaque strings should never be selected by hand — one button removes a whole class of paste errors.' },
      { icon: 'FLOW',  title: 'Share links and invites', desc: 'Copy-link is the fallback that works everywhere the native share sheet does not, which is most desktop browsers.' },
      { icon: 'DESIGN',title: 'Colour and token pickers', desc: 'Click a swatch, get the hex or variable name on the clipboard — the fastest handoff between a palette and a stylesheet.' },
    ],
    faqs: [
      { q: 'Why does clipboard.writeText fail on my page?', a: 'Almost always one of two reasons: the page is not in a secure context (the API needs HTTPS or localhost), or the call did not happen inside a user gesture. Move the write into the click handler itself rather than after an await of something slow, and serve over HTTPS.' },
      { q: 'Do I need to request clipboard permission?', a: 'Not for writing. Writing text from inside a user gesture is allowed without a prompt in every current browser. Reading the clipboard is the operation that needs permission, and these snippets never read.' },
      { q: 'What about older browsers?', a: 'The document.execCommand("copy") path — create a temporary textarea, select it, execute, remove it — still works as a fallback. It is deprecated but universally supported, so a small try/catch around the modern call with this as the fallback covers effectively everything.' },
    ],
  },
  {
    id: 'drag-and-drop', label: 'Drag & Drop', ogSource: 'layouts',
    tail: 'Sortable & Draggable UI Examples',
    blurb: 'Drag and drop snippets — sortable lists, kanban boards, file dropzones, reorderable table rows and draggable panels with real pointer handling.',
    intro: `Dragging is direct manipulation: the user moves the thing itself rather than describing the move to a form. These snippets cover both mechanisms — the native HTML5 drag events for file drops and cross-container moves, and pointer-event dragging for the smooth, cancellable reordering that lists and boards need.\n\nEach one handles the details that separate a real implementation from a demo: a placeholder showing where the item will land, auto-scroll near the edges, a cancel path on Escape, and a keyboard-accessible alternative for people who cannot drag at all.\n\n**Two different APIs for two different jobs**\n\nThe HTML5 drag-and-drop API (draggable, dragstart, dragover, drop) is the only mechanism that receives files dragged in from the desktop or elements dragged between browser windows — nothing else can see those events. Pointer events, by contrast, give full control over the dragged element's visual position on every move, which is what in-page sortable lists and kanban boards actually need. Reaching for the wrong one is the most common cause of a drag feature that half-works.\n\n**The placeholder is what makes reordering legible**\n\nWithout a visible gap showing where an item will land, a drag operation is guesswork until the user releases. Every sortable snippet here computes the insertion point continuously as the pointer moves — usually by comparing the pointer position against the midpoints of sibling elements — and shows a placeholder there, so the drop location is obvious before the drop happens.\n\n**Auto-scroll near the edges**\n\nA list or board longer than the viewport needs to scroll while an item is being dragged toward its edge, or reordering is limited to whatever is currently visible. These snippets detect the pointer entering a margin near the container's top or bottom and scroll the container at a speed proportional to how close the pointer is to the edge, stopping the moment the pointer moves back toward the centre.\n\n**Escape, and the keyboard path that is not optional**\n\nA cancel-on-Escape handler that returns the dragged item to its original position covers the case where a user changes their mind mid-drag. The more important requirement is a fully separate keyboard path — focus the item, then move it with an arrow-key or button-based control, announcing the new position through an aria-live region — because drag-only reordering is entirely unusable without a mouse, which makes it one of the more common accessibility failures in board and list UIs.`,
    features: [
      'Sortable lists and kanban columns with live placeholder positioning',
      'File dropzones with dragover styling, type filtering and paste support',
      'Reorderable table rows and columns that persist their new order',
      'Pointer-event dragging that works identically with mouse, touch and pen',
      'Keyboard-accessible reordering as a first-class alternative, not an afterthought',
    ],
    useCases: [
      { icon: 'APP',   title: 'Kanban and task boards', desc: 'Moving a card between columns is the interaction the whole board pattern exists for.' },
      { icon: 'FORM',  title: 'File upload dropzones', desc: 'Drop, click and paste should all reach the same handler — users try whichever one they learned first.' },
      { icon: 'FLOW',  title: 'Priority and playlist ordering', desc: 'Dragging expresses relative order far faster than typing numbers into a position field.' },
      { icon: 'DESIGN',title: 'Dashboard and layout builders', desc: 'Draggable panels let a user arrange their own workspace instead of accepting yours.' },
    ],
    faqs: [
      { q: 'HTML5 drag events or pointer events?', a: 'HTML5 drag-and-drop for files from the desktop and for drops between windows — it is the only API that receives those. Pointer events for in-page reordering, because you control the visuals completely and it behaves the same on touch, where the native drag API is effectively unusable.' },
      { q: 'How do I make dragging accessible?', a: 'Pair every drag with a keyboard path: focus the item, then move it with Ctrl+Arrow or a "move up / move down" control, announcing the new position through an aria-live region. Drag-only reordering is unusable with a keyboard, a screen reader, or a tremor — and it is one of the most common accessibility failures in board UIs.' },
      { q: 'Why does my dragged element flicker over drop targets?', a: 'Usually because a child element fires dragleave as the pointer crosses it. Track a counter that increments on dragenter and decrements on dragleave, and only remove the highlight when it reaches zero — or set pointer-events: none on the children.' },
    ],
  },
  {
    id: 'touch-gestures', label: 'Touch Gestures', ogSource: 'mobile',
    tail: 'Swipe & Touch Gesture Examples',
    blurb: 'Touch gesture snippets — swipe cards, pull-to-refresh, pinch zoom, long press, bottom sheets and double-tap actions built on pointer events.',
    intro: `Touch interfaces are built from a small vocabulary — swipe, drag, pinch, long press, double tap — and each one has a threshold and a feel that has to be tuned rather than guessed. These snippets implement that vocabulary with pointer events, so the same code path serves mouse, touch and stylus.\n\nThey follow the platform conventions people already expect: a card that follows the finger and snaps past a distance threshold, a sheet that can be flung closed, a long press that gives feedback before it fires, and gestures that stop fighting the browser's own scrolling.\n\n**One event model for every input type**\n\nPointer events unify mouse, touch and stylus behind a single API, carrying pressure and tilt data when the hardware provides it and supporting pointer capture — the mechanism that keeps a drag tracking correctly even after the finger moves outside the original element's bounds. Building on pointer events instead of the older, touch-specific TouchEvent API is what lets every snippet here behave identically whether it is tested with a mouse on a laptop or a thumb on a phone.\n\n**Distance and velocity together**\n\nA swipe-to-dismiss or swipe-to-action gesture commits based on two signals, not one: how far the pointer travelled, and how fast it was moving at release. Distance alone makes a fast, short flick feel unresponsive since it falls short of the threshold; velocity alone makes a slow, deliberate drag fail to register. Combining them — commit past a fraction of the element's width, or on a fast release even short of that — is what makes the gesture feel right under both a hurried flick and a careful drag.\n\n**Resistance and release, not just movement**\n\nPull-to-refresh, sheet-drag and similar gestures use a resistance curve rather than a raw 1:1 pixel mapping, so the further something is dragged past its natural range the harder it becomes to pull further. Combined with a spring-back animation when the pointer releases below the trigger threshold, this is what makes a gesture feel physical instead of just tracking a coordinate.\n\n**Not fighting the browser's own scrolling**\n\nA custom gesture and native scrolling compete for the same pointer input unless told otherwise. Setting touch-action explicitly — none for a fully custom gesture, pan-y when only horizontal movement should be intercepted — tells the browser up front which axis to leave alone, which is more reliable than calling preventDefault inside a touch handler, since that call does nothing in a passive listener.`,
    features: [
      'Swipe-to-dismiss and swipe-to-action cards with velocity-aware thresholds',
      'Pull-to-refresh with resistance curve and release-to-trigger feedback',
      'Pinch-zoom and pan for images, with bounds clamping',
      'Long press with a progress indicator and a cancel-on-move path',
      'touch-action and passive-listener handling so gestures never block scrolling',
    ],
    useCases: [
      { icon: 'APP',   title: 'Mobile app screens', desc: 'Swipeable cards and draggable sheets are what make a web view feel native rather than transplanted.' },
      { icon: 'FLOW',  title: 'Inbox and list actions', desc: 'Swipe-to-archive and swipe-to-delete put the two common actions one gesture away from every row.' },
      { icon: 'DESIGN',title: 'Image galleries and viewers', desc: 'Pinch to zoom and drag to pan are the two gestures users try first on any image, on every platform.' },
      { icon: 'STAR',  title: 'Reaction and confirmation gestures', desc: 'Double-tap to like and long-press to confirm add depth without adding buttons to a crowded screen.' },
    ],
    faqs: [
      { q: 'Should I use touch events or pointer events?', a: 'Pointer events. They cover mouse, touch and pen through one API, carry pressure and tilt when available, and support pointer capture — which is what keeps a drag tracking correctly when the finger leaves the element. Touch events are only needed for legacy support.' },
      { q: 'Why does my gesture also scroll the page?', a: 'Because the browser starts its own scroll unless you tell it not to. Set touch-action on the element — touch-action: none for a fully custom gesture, or pan-y when you only handle horizontal swipes — rather than calling preventDefault, which does not work in a passive listener anyway.' },
      { q: 'How do I pick swipe thresholds?', a: 'Combine distance and velocity: commit if the gesture travelled more than roughly a third of the element width, or if it was moving fast enough at release even over a short distance. Distance alone makes fast flicks feel unresponsive; velocity alone makes slow deliberate drags fail.' },
    ],
  },
  {
    id: 'keyboard-navigation', label: 'Keyboard Navigation', ogSource: 'navigation',
    tail: 'Keyboard Navigation Patterns',
    blurb: 'Keyboard-driven snippets — command palettes, shortcut overlays, arrow-key menus, focus traps and roving tabindex patterns.',
    intro: `Keyboard support is not an accessibility checkbox bolted on at the end — for power users it is the fastest interface you can ship. These snippets implement the patterns that make an app keyboard-complete: a command palette on Ctrl+K, arrow-key movement through menus and grids, Escape to dismiss, Enter to commit, and focus that returns to where it came from.\n\nThey follow the ARIA authoring practices for each widget, which is what makes the same code serve both a power user and a screen-reader user.\n\n**Roving tabindex, the pattern behind every menu and toolbar**\n\nA group of related controls — a menu, a toolbar, a grid of cells — should expose exactly one stop in the page's tab order, with arrow keys moving focus between the items inside it. That is roving tabindex: the currently active item gets tabindex="0", every sibling gets tabindex="-1", and arrow-key handling moves the "0" between them. Without it, a fifty-item menu costs fifty tab presses to get past; with it, one tab press enters the group and arrows do the rest.\n\n**Focus traps that behave like a real dialog**\n\nOpening a modal moves focus inside it and must stop Tab from ever reaching content underneath — wrapping Tab from the last focusable element back to the first, and Shift+Tab the other way. Just as important is what happens on close: focus has to return to the exact element that opened the dialog, not to the top of the page, or a keyboard user loses their place every time they dismiss something. The native <dialog> element with showModal() handles most of this natively, which is why several snippets here build on it rather than reimplementing the trap by hand.\n\n**A command palette is a filtered, keyboard-driven list**\n\nCtrl+K opening a searchable list, arrow keys moving a highlighted selection, and Enter running the highlighted command is now an expected pattern in developer-facing tools, and it scales to far more commands than any menu bar could expose. The implementation detail that makes it feel fast is filtering on every keystroke against a precomputed searchable index rather than re-scanning a DOM tree each time.\n\n**Discoverability matters as much as implementation**\n\nA shortcut nobody knows exists provides no value. Hint chips showing the relevant key next to a control, and a shortcuts overlay reachable with "?" or a help menu, are what turn a keyboard-complete interface into one power users actually discover and adopt rather than one that only rewards people who already read the source.`,
    features: [
      'Command palette with fuzzy search, arrow selection and Enter to run',
      'Roving tabindex for menus, toolbars and grids — one tab stop, arrows inside',
      'Focus traps for modals and drawers, with focus restored to the trigger on close',
      'Shortcut overlays and hint chips that make available keys discoverable',
      'Escape-to-dismiss and type-ahead selection wired to the right ARIA roles',
    ],
    useCases: [
      { icon: 'APP',   title: 'Command palettes in web apps', desc: 'Ctrl+K is now an expected affordance in developer-facing products, and it scales better than any menu.' },
      { icon: 'FLOW',  title: 'Modal and drawer focus management', desc: 'Trapping focus inside an open dialog and restoring it on close is what stops a keyboard user from getting lost behind the overlay.' },
      { icon: 'FORM',  title: 'Comboboxes and select menus', desc: 'Arrow keys, type-ahead and Enter are how these are actually operated once someone uses them more than twice.' },
      { icon: 'LEARN', title: 'Learning the ARIA patterns', desc: 'Each snippet implements a documented authoring practice, so the roles and key handling are worth copying verbatim.' },
    ],
    faqs: [
      { q: 'What is a roving tabindex?', a: 'A pattern where a group of controls exposes exactly one tab stop: the active item has tabindex="0" and every sibling has tabindex="-1", with arrow keys moving the zero between them. It is what stops a fifty-item menu from requiring fifty tab presses to get past.' },
      { q: 'How do I trap focus in a modal correctly?', a: 'Find the focusable descendants, move focus to the first on open, and wrap Tab from the last back to the first (and Shift+Tab the other way). On close, restore focus to the element that opened the dialog. The native <dialog> element with showModal() does most of this for you and is worth preferring.' },
      { q: 'Which shortcuts should I avoid overriding?', a: 'Anything the browser or assistive tech owns: Ctrl+T, Ctrl+W, Ctrl+L, Ctrl+F in most contexts, and single-letter shortcuts while a text field has focus. Check event.target before acting on a bare-letter shortcut, or you will hijack typing.' },
    ],
  },
  {
    id: 'web-audio', label: 'Web Audio', ogSource: 'games',
    tail: 'Web Audio Visualizer Examples',
    blurb: 'Web Audio snippets — visualizers, waveform displays, UI sound feedback, synth pads and audio players built on AudioContext.',
    intro: `The Web Audio API turns the browser into a small audio workstation: oscillators, gain nodes, filters and an analyser you can read frame by frame. These snippets use it for the two things it is genuinely good at on the web — visualising sound and generating small interface sounds without shipping audio files.\n\nThey handle the rule every audio demo eventually hits: an AudioContext starts suspended until a user gesture resumes it, so playback has to be wired to a real interaction.\n\n**A graph of nodes, not a single call**\n\nWeb Audio models everything as nodes connected into a graph — a source (oscillator, microphone or file), through processing nodes (gain, filter), into a destination (the speakers) or an analyser. These snippets keep that graph to three or four nodes, which is enough to see the pattern clearly: connect() chains sources to processors to output, and the graph itself is the entire mental model the API asks you to hold.\n\n**Reading sound instead of just playing it**\n\nAn AnalyserNode inserted into the graph exposes getByteFrequencyData for a spectrum and getByteTimeDomainData for a raw waveform, refreshed on every animation frame into a reusable typed array. The fftSize property controls how finely that data is resolved, trading detail against smoothness — the one setting every visualiser snippet here tunes deliberately rather than leaving at its default.\n\n**Synthesising sound instead of loading it**\n\nAn OscillatorNode generating a tone through a GainNode envelope produces a short, crisp interface sound — a success blip, an error tone, a notification chime — with zero audio files to fetch, decode or cache. The gain envelope (a quick ramp up, then a decay) is what keeps a synthesised tone from clicking at its start and end, which is the detail that separates a pleasant sound from a harsh one.\n\n**The autoplay rule, and why it exists**\n\nBrowsers create every AudioContext in a suspended state and will not let it produce sound until resumed from inside a genuine user gesture such as a click or keydown handler — a policy that exists specifically to stop pages from playing audio the moment they load. Calling audioContext.resume() as the first line of a click handler is the fix for the single most common "silent in production, worked in my testing" Web Audio bug.`,
    features: [
      'AnalyserNode frequency and waveform visualisers drawn to canvas',
      'Oscillator and gain-node UI sounds generated with no audio assets',
      'Audio players with real seek, buffering and level metering',
      'Microphone input via getUserMedia for live visualisation',
      'Autoplay-policy handling — context resumed from a genuine user gesture',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Music and podcast players', desc: 'A live waveform or level meter makes a player feel connected to the audio instead of decorating it.' },
      { icon: 'APP',    title: 'Interface sound feedback', desc: 'Short synthesised blips for success, error and notification, with no files to load or cache.' },
      { icon: 'STAR',   title: 'Visualisers and creative toys', desc: 'Frequency data mapped to bars, rings or particles is one of the best-value effects on the web.' },
      { icon: 'LEARN',  title: 'Learning the audio graph model', desc: 'Nodes connected into a graph is a concept worth understanding once — these snippets keep the graph to three or four nodes.' },
    ],
    faqs: [
      { q: 'Why is there no sound until I click something?', a: 'Browsers create the AudioContext in a suspended state and refuse to start audio without a user gesture. Call audioContext.resume() inside a click or keydown handler — that single line is the fix for most "works locally, silent in production" audio bugs.' },
      { q: 'How do I get the data for a visualiser?', a: 'Connect an AnalyserNode into your graph, then call getByteFrequencyData for a spectrum or getByteTimeDomainData for a waveform on each animation frame, into a reusable Uint8Array. Setting fftSize controls the resolution and the trade-off against smoothness.' },
      { q: 'Can I visualise the microphone?', a: 'Yes — request the stream with getUserMedia, wrap it with createMediaStreamSource, and connect that to the analyser. Do not connect it to the destination unless you want feedback howl through the speakers.' },
    ],
  },
  {
    id: 'web-crypto', label: 'Web Crypto', ogSource: 'dashboards',
    tail: 'SHA Hashing & Token Generators',
    blurb: 'Web Crypto snippets — SHA hashing, random token and UUID generation, and password entropy meters using the browser\'s native SubtleCrypto.',
    intro: `The browser ships a real cryptography implementation, and for hashing and random generation there is no reason to bundle a JavaScript library instead. These snippets call \`crypto.subtle.digest\` and \`crypto.getRandomValues\` directly, which means the output matches what \`shasum\` or Node's crypto module produce for the same input, byte for byte.\n\nEverything runs client-side, which is the whole point: hashing a file or checking a secret should never involve sending it anywhere.\n\n**Real digests, not an approximation**\n\ncrypto.subtle.digest implements the actual SHA algorithms specified by NIST — the same math a command-line shasum or Node's crypto module runs — so a hash computed by one of these snippets is byte-for-byte identical to the one any other correct implementation produces for the same input. That correctness is what makes the checksum-verification snippet trustworthy: comparing against a vendor's published SHA-256 is a real integrity check, not a demonstration.\n\n**Files, hashed without ever leaving the device**\n\nReading a File object's arrayBuffer() and passing it straight to digest() hashes arbitrary file content entirely in memory, with nothing uploaded anywhere. That is a meaningfully different trust story than a server-side hashing tool, which necessarily receives the file first — for anything sensitive, computing the digest locally is strictly the safer default.\n\n**Random values that are actually unpredictable**\n\ncrypto.getRandomValues draws from the operating system's cryptographically secure random number generator, unlike Math.random, which is a fast but predictable pseudo-random generator never intended for anything security-adjacent. The token and UUID generators in this tag use getRandomValues specifically because the moment a generated value is a secret — an invite token, an API key — predictability becomes an exploitable weakness rather than a cosmetic flaw.\n\n**Entropy over arbitrary composition rules**\n\nThe password-strength snippets here score based on the real size of the character set used and the length of the string — actual entropy — rather than checking boxes like "contains a symbol." A long passphrase with no symbols at all can be stronger than a short password that satisfies every composition rule, and entropy-based scoring is what actually reflects that.`,
    features: [
      'SHA-1, SHA-256, SHA-384 and SHA-512 digests via crypto.subtle.digest',
      'File hashing straight from arrayBuffer() — no upload, no server',
      'Cryptographically strong tokens and UUIDs from crypto.getRandomValues',
      'Password entropy and strength meters that score real character-set size',
      'Request-id guards so fast typing never renders a stale, out-of-order digest',
    ],
    useCases: [
      { icon: 'CODE',  title: 'Verifying a download checksum', desc: 'Drop a file in, compare against the vendor\'s published SHA-256, with no CLI tool to install.' },
      { icon: 'FORM',  title: 'Password strength feedback', desc: 'Entropy-based scoring gives honest guidance where a "must contain a symbol" rule mostly teaches people to append an exclamation mark.' },
      { icon: 'APP',   title: 'Generating API keys and invite tokens', desc: 'getRandomValues is the correct source; Math.random is not, and the difference matters the moment a token is a secret.' },
      { icon: 'LEARN', title: 'Demonstrating the avalanche effect', desc: 'Change one character and watch every digest change completely — the clearest way to explain what a hash guarantees.' },
    ],
    faqs: [
      { q: 'Why is MD5 not an option?', a: 'The Web Crypto specification deliberately excludes it. MD5 is broken for any security purpose, and the standards authors chose not to make the broken thing convenient. If you need MD5 for a legacy checksum, you must bring your own implementation — which is a reasonable moment to ask whether you should.' },
      { q: 'Is hashing in the browser secure?', a: 'The hash itself is a real, correct SHA digest, and nothing leaves the device — which is strictly better than uploading the input to a server. What client-side hashing cannot do is authenticate anything: never treat a hash computed in the browser as proof of a password on the server side.' },
      { q: 'Why does crypto.subtle need HTTPS?', a: 'It is restricted to secure contexts, so it exists on HTTPS pages and on localhost, and is undefined on plain HTTP. Feature-detect it and show a clear message rather than failing with an unhelpful "cannot read property digest of undefined".' },
    ],
  },

  /* ── CSS and motion techniques ─────────────────────────────────────────── */
  {
    id: 'css-animation', label: 'CSS Animation', ogSource: 'animations',
    tail: 'Pure CSS Keyframe Animations',
    blurb: 'Pure CSS animation snippets — keyframe loops, hover transitions, entrance effects and loading motion with no JavaScript at all.',
    intro: `Most interface motion does not need JavaScript. A keyframe block and a transition handle entrances, loops, hovers and state changes, run on the compositor, and keep working even if a script fails to load. These snippets are that argument in code: animated loaders, entrance effects, hover states, gradients and attention cues built from \`@keyframes\` and \`transition\` alone.\n\nThey stick to transform and opacity — the two properties the browser can animate without a repaint — which is the difference between motion that holds sixty frames a second and motion that stutters on a mid-range phone.\n\n**Two mechanisms, two different jobs**\n\nA transition interpolates automatically between two states whenever a property actually changes — a hover, a class toggle, a focus — and needs no further code once declared. An animation runs a self-contained @keyframes sequence with as many waypoints as needed, and can loop indefinitely on its own without any state change to trigger it. Anything that repeats, or that needs more than a start and end point, needs @keyframes; anything reacting to a single state change is usually a transition.\n\n**Why transform and opacity specifically**\n\nThe browser's rendering pipeline has three stages that matter here — layout, paint and composite — and transform and opacity are the only two commonly-animated properties that skip the first two entirely, running purely on the compositor thread. Animating width, height, top, left or margin instead forces a layout recalculation on every single frame, which is the direct cause of animation that drops frames on anything but a fast device.\n\n**Fill-mode and direction, used on purpose**\n\nanimation-fill-mode: forwards is what keeps an entrance animation's final state instead of snapping back to its pre-animation values the instant the keyframes finish — a detail that silently breaks a huge fraction of copy-pasted CSS animations. animation-direction: alternate turns a one-way keyframe sequence into a back-and-forth pulse without duplicating a single keyframe, which is how most of the breathing and floating loops in this tag are built.\n\n**Motion as an enhancement, not a requirement**\n\nEvery loop and entrance here is wrapped so it can be disabled outright under @media (prefers-reduced-motion: no-preference) rather than merely slowed down. Slowing an animation down is not sufficient for the subset of users whose vestibular symptoms are triggered by movement itself — for that group, the only correct behaviour is no movement, with the final visible state shown immediately.`,
    features: [
      '@keyframes loops for loaders, pulses, floats and attention cues',
      'Entrance animations with per-child delay for staggered lists and grids',
      'Hover and focus transitions built on transform and opacity only',
      'animation-fill-mode, direction and easing used deliberately rather than by default',
      'prefers-reduced-motion queries so motion can be switched off, not just slowed',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Loaders and progress feedback', desc: 'A CSS spinner or shimmer costs nothing at runtime and keeps animating while the main thread is busy.' },
      { icon: 'FLOW',   title: 'Entrance and state transitions', desc: 'Cards, menus and toasts that animate in feel considered — and it is three lines of CSS, not a library.' },
      { icon: 'STAR',   title: 'Attention and micro-feedback', desc: 'A pulse on a new item or a shake on an invalid field communicates faster than any copy.' },
      { icon: 'LEARN',  title: 'Learning easing and timing', desc: 'Editing a cubic-bezier live and watching the result is the only way easing ever really clicks.' },
    ],
    faqs: [
      { q: 'Which CSS properties are safe to animate?', a: 'transform and opacity, essentially. They are handled by the compositor without layout or paint work. Animating width, height, top, left or margin forces layout on every frame, which is where jank comes from — use transform: translate and scale instead.' },
      { q: 'transition or animation?', a: 'A transition interpolates between two states triggered by a change — hover, a class toggle, a focus. An animation runs a keyframe sequence on its own, can loop, and can define more than two waypoints. If motion should repeat or has intermediate steps, it needs @keyframes.' },
      { q: 'How do I respect reduced-motion?', a: 'Wrap the motion in @media (prefers-reduced-motion: no-preference), so the default is stillness and animation is the enhancement. Reducing durations is not enough for people whose symptoms are triggered by movement itself — for those users the honest answer is no movement.' },
    ],
  },
  {
    id: 'css-only', label: 'CSS Only', ogSource: 'layouts',
    tail: 'Zero-JavaScript CSS Components',
    blurb: 'Zero-JavaScript snippets — accordions, tabs, tooltips, menus, toggles and loaders built entirely from HTML and CSS.',
    intro: `Every snippet under this tag ships with no JavaScript whatsoever. Floating labels, accordions, tooltips, dropdowns, tabs, toggles, loaders and reveal effects, built from \`:checked\`, \`:focus-within\`, \`:has()\`, sibling combinators and the details element.\n\nThat constraint buys real things: nothing to hydrate, nothing to break when a bundle fails, and behaviour that works before the page is interactive. It also buys accessibility almost for free, because the state lives in native form controls that assistive technology already understands.\n\n**The checkbox hack, and why it still works**\n\nA hidden checkbox paired with a <label> as the visible control gives you toggleable state with zero script: the label's click toggles the checkbox's :checked state, and a sibling combinator styles whatever should change in response. It predates every modern CSS selector on this list and remains genuinely useful, because unlike a div with a click handler, the resulting control is keyboard-operable and screen-reader-understood the moment it exists.\n\n**:has() turns CSS into a parent-aware language**\n\nBefore :has(), CSS could only style based on an element's own state or its ancestors' — never react to what a descendant was doing. A form container with :has(:invalid) — or a card with :has(.badge) — lets a parent's appearance change based on its children's state with no listener at all, which is why several form-validation-styling patterns in this tag needed JavaScript until browser support caught up, and no longer do.\n\n**<details> as a free accordion**\n\nThe <details>/<summary> pair is a fully native disclosure widget: click to open and close, keyboard-operable by default, and exposed to assistive technology with the correct expanded state automatically. Building an accordion from it instead of a div-plus-button pattern removes an entire category of ARIA states that would otherwise need to be managed by hand.\n\n**What this buys, and what it costs**\n\nA CSS-only component works before any script has parsed, survives a failed or slow bundle entirely, and inherits keyboard and screen-reader behaviour from the native control underneath it. The trade is that some interactions genuinely need script — anything requiring a value computed at runtime, or state shared across more than a simple sibling relationship — which is why this tag covers the specific set of patterns where the constraint is a feature rather than a limitation.`,
    features: [
      'Accordions and disclosure panels via <details> or the checkbox hack',
      'Tabs, toggles and segmented controls driven by :checked and sibling selectors',
      'Tooltips, dropdowns and hover cards using :hover and :focus-within',
      'Parent-aware styling with :has() — form states without a single listener',
      'Loaders, skeletons and entrance effects from keyframes alone',
    ],
    useCases: [
      { icon: 'CODE',   title: 'Static sites and email-adjacent HTML', desc: 'Where scripts are unavailable or unwelcome, CSS-only components are the only components you get.' },
      { icon: 'FLOW',   title: 'Progressive enhancement baselines', desc: 'The interface works before hydration, so a slow bundle degrades the experience instead of breaking it.' },
      { icon: 'DESIGN', title: 'Fast-loading marketing pages', desc: 'No script means nothing blocking, which is the cheapest performance win available on a landing page.' },
      { icon: 'LEARN',  title: 'Learning what modern CSS can do alone', desc: ':has(), :focus-within and the sibling combinators replace a surprising amount of JavaScript people still write.' },
    ],
    faqs: [
      { q: 'Are CSS-only components accessible?', a: 'They can be more accessible than scripted ones, because the state lives in a real input or a <details> element that screen readers and keyboards already understand. The failure mode is different: labels must be correctly associated, and any purely decorative markup added for the effect needs aria-hidden.' },
      { q: 'What is the checkbox hack?', a: 'A hidden checkbox paired with a <label> as the visible control, with :checked plus a sibling combinator styling whatever should change. It gives you toggleable state with no script — and unlike a div with a click handler, it is keyboard-operable by default.' },
      { q: 'Is :has() safe to use now?', a: 'Yes — it is supported in every current browser. As with any newer selector, write it so the unsupported case degrades to a plain but usable state rather than a broken one, and you can ship it without a fallback script.' },
    ],
  },
  {
    id: 'css-grid', label: 'CSS Grid', ogSource: 'layouts',
    tail: 'CSS Grid Layout Examples',
    blurb: 'CSS Grid layout snippets — bento boxes, dashboards, masonry-style galleries, responsive card grids and full page layouts.',
    intro: `CSS Grid is the first layout system on the web that lets you describe a two-dimensional arrangement directly instead of approximating it. These snippets use it for what it is best at: bento-box feature sections, dashboard shells, card galleries that reflow without media queries, and page layouts defined as named template areas you can read at a glance.\n\nThe recurring trick is \`repeat(auto-fit, minmax(...))\` — a grid that decides its own column count from the available width, which removes most breakpoint maintenance from a card layout.\n\n**Two dimensions, described directly**\n\nBefore Grid, a two-dimensional layout meant nesting flexbox containers or relying on float-based hacks to approximate rows and columns together. Grid lets a single declaration describe both axes at once — track sizes, gaps and item placement — which is why a bento-box section with items of varying size is a handful of grid-column and grid-row spans rather than a nest of wrapper divs.\n\n**auto-fit and minmax removing breakpoints**\n\nrepeat(auto-fit, minmax(240px, 1fr)) tells the browser to fit as many 240px-minimum columns as the container allows, stretching them to fill any remaining space, and to collapse to fewer columns as the viewport narrows — all without a single @media query. This one line is doing the job that used to take three separate breakpoints per card grid, and it never produces the orphaned single-item row that a fixed column count does at odd widths.\n\n**Named areas as a legible layout language**\n\ngrid-template-areas lets a layout be described as a literal ASCII diagram of named regions — "header header" / "sidebar content" / "footer footer" — and the elements assigned to each area follow that shape without any additional positioning code. Reading the stylesheet tells you the actual page structure at a glance, which is a real advantage over inferring the same structure from nested markup and margins.\n\n**Where Grid's limits show up**\n\nCSS still has no native masonry layout in every browser, so packing items of different heights into a Pinterest-style grid uses grid-auto-flow: dense with varied row spans as a convincing approximation rather than true masonry. And Grid composes with, rather than replaces, Flexbox: a page-level grid shell whose individual cells lay out their own content with flex is the most common and most maintainable real-world combination.`,
    features: [
      'auto-fit / minmax responsive card grids that need no media queries',
      'Bento-box sections built from spanning grid items',
      'Named grid-template-areas for readable page and dashboard shells',
      'Masonry-style galleries via grid-auto-flow: dense and row spanning',
      'gap, alignment and subgrid usage that keeps nested content aligned',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Bento feature sections', desc: 'The layout every product page now uses, and Grid is the only clean way to express it.' },
      { icon: 'APP',    title: 'Dashboard and app shells', desc: 'Sidebar, header and content as named areas makes the layout legible in the stylesheet instead of implied by nesting.' },
      { icon: 'FLOW',   title: 'Responsive card galleries', desc: 'One auto-fit declaration replaces three breakpoints and never has an awkward orphan column.' },
      { icon: 'LEARN',  title: 'Learning Grid properly', desc: 'Template areas, spanning and implicit tracks are far easier to understand when you can edit them live.' },
    ],
    faqs: [
      { q: 'auto-fit or auto-fill?', a: 'auto-fit collapses empty tracks so the remaining items stretch to fill the row; auto-fill keeps the empty tracks, leaving a gap where more items would go. For a card grid that should always look full, auto-fit is usually what you want.' },
      { q: 'Grid or Flexbox?', a: 'Grid when you are placing content in two dimensions — rows and columns together. Flexbox for a single line of items that should distribute along one axis. They compose well: a grid page shell whose individual cells use flex internally is the most common real-world combination.' },
      { q: 'Can CSS Grid do masonry?', a: 'Not natively yet in all browsers. The practical approach in these snippets is grid-auto-flow: dense with varied row spans, which fills gaps convincingly for image galleries. True masonry needs a script or the still-shipping CSS masonry syntax.' },
    ],
  },
  {
    id: 'glassmorphism', label: 'Glassmorphism', ogSource: 'cards',
    tail: 'Frosted-Glass UI Examples',
    blurb: 'Frosted-glass UI snippets — backdrop-filter cards, navbars, modals and overlays with blur, translucency and layered depth.',
    intro: `Glassmorphism is a translucent surface blurring whatever sits behind it — the effect Apple and Microsoft made a system-level convention. In CSS it is \`backdrop-filter: blur()\` over a semi-transparent background, and the whole craft lies in the supporting details: a subtle light border, a soft shadow, and a background with enough variation for the blur to be visible at all.\n\nThese snippets cover cards, navigation bars, modals, sidebars and overlays, each tuned so the surface reads as glass rather than as a grey rectangle.\n\n**backdrop-filter, and why it needs something to blur**\n\nbackdrop-filter samples whatever is rendered behind an element and applies the filter to that sampled content — it has nothing to do with the element's own background image. That means the effect is invisible against a flat, uniform background: it needs a gradient, a photo, or textured content behind it for the blur to actually read as glass rather than as a plain translucent panel.\n\n**The supporting details that sell the illusion**\n\nA blurred background alone looks unfinished. A one-pixel border in a light, semi-transparent white gives the pane an edge to catch the eye the way real glass catches light; a soft, diffuse shadow gives it the sense of sitting above the surface rather than being painted onto it; a slight saturation boost in the filter keeps colours behind the glass from washing out. These three details, more than the blur radius itself, are what separate a convincing glass card from a grey rectangle.\n\n**Cost, and where to spend it**\n\nbackdrop-filter is one of the more expensive properties in CSS to render, because the compositor has to resample the backdrop on every frame the element is visible or animating. A handful of static glass surfaces per screen is unremarkable; a scrolling list of them, or one animating continuously, is where mid-range devices start dropping frames — worth testing on real hardware rather than a development machine before shipping broadly.\n\n**Contrast has to be checked against the real backdrop**\n\nText inside a glass panel needs to stay legible against whatever happens to be behind it, not against a curated demo background — and a translucent surface's actual contrast varies as the content behind it scrolls or changes. Raising the panel's background opacity slightly and adding saturation to the filter is usually enough to restore contrast without losing the glass effect, and it is worth verifying against the lightest realistic backdrop the panel could sit over.`,
    features: [
      'backdrop-filter blur and saturation tuned per surface type',
      'Translucent backgrounds layered over gradient and image backdrops',
      'Light-edge borders and soft shadows that give the pane real thickness',
      'Sticky glass navbars that blur page content as it scrolls under them',
      'Fallback backgrounds for contexts where backdrop-filter is unavailable',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Hero cards over imagery', desc: 'Glass keeps a photographic background visible while still giving text a readable surface.' },
      { icon: 'APP',    title: 'Sticky navigation bars', desc: 'A blurred bar stays legible over any content that scrolls beneath it, without going fully opaque.' },
      { icon: 'FLOW',   title: 'Modals and command overlays', desc: 'Blurring the page behind a dialog focuses attention without the heaviness of a solid scrim.' },
      { icon: 'STAR',   title: 'Premium and dark-themed products', desc: 'Layered translucency is the shorthand for "considered" in dark interfaces, and it costs a handful of properties.' },
    ],
    faqs: [
      { q: 'Why does my backdrop-filter do nothing?', a: 'Three usual causes: the element\'s own background is fully opaque so there is nothing to see through; there is no variation behind it to blur; or an ancestor creates a stacking or containment context that clips the effect. Start by making the background colour semi-transparent.' },
      { q: 'Is backdrop-filter expensive?', a: 'It is one of the more costly CSS effects, because it forces the compositor to sample and blur what is behind the element on every frame. A few glass surfaces are fine; a page of them, or one animating continuously, is where mid-range devices start dropping frames.' },
      { q: 'How do I keep glass accessible?', a: 'Check contrast against the lightest area the panel can sit over, not against your demo background. Raising the background alpha and adding saturation to the filter usually restores contrast while keeping the effect — an unreadable label is a failed design however good the blur looks.' },
    ],
  },
  {
    id: '3d-effects', label: '3D Effects', ogSource: 'cards',
    tail: 'CSS 3D Tilt & Flip Examples',
    blurb: 'CSS 3D snippets — tilt cards, flip animations, perspective galleries, cube and carousel transforms using transform-style: preserve-3d.',
    intro: `CSS gives you a real 3D transform pipeline without any WebGL: set a \`perspective\`, add \`transform-style: preserve-3d\`, and children rotate in actual depth. These snippets use it for tilt cards that follow the pointer, flip cards with a genuine back face, cube and coverflow carousels, and perspective grids that give a flat layout a sense of space.\n\nEverything stays on the compositor, so the motion is smooth even on modest hardware — and it is all still DOM, so the content remains selectable, styleable and readable by assistive technology.\n\n**perspective and preserve-3d, and why both are required**\n\nA rotation only reads as three-dimensional when the parent establishes a perspective value — the notional distance from the viewer to the flat plane of the screen — and every level between that parent and the rotating element carries transform-style: preserve-3d. Miss either one and children flatten back into their parent's 2D plane regardless of how the rotation itself is defined, which is the single most common reason a "3D" transform renders looking completely flat.\n\n**Pointer-tracking tilt, done smoothly**\n\nA tilt card reads the pointer's position relative to the card's centre and maps that offset to small rotateX/rotateY values, so the card appears to lean toward the cursor. The snippets here ease that rotation back toward zero with a lerp rather than snapping instantly on pointer leave, which is what makes the return-to-rest feel like momentum settling rather than a hard reset.\n\n**Flip cards need backface-visibility, explicitly**\n\nWithout backface-visibility: hidden on both faces, the front face's content stays visible — mirrored — through what should be the back of a flipped card, because CSS renders both sides of a rotated element by default. Setting hidden on each face and rotating the back face 180 degrees to start is what actually produces a card with a distinct front and back rather than a double-exposed smear mid-flip.\n\n**Where the GPU cost actually goes**\n\nCSS 3D transforms run on the compositor and never trigger layout or paint, which is what keeps them smooth even on modest hardware. The cost to watch instead is GPU memory: promoting many large elements onto their own composited layers — which preserve-3d and continuous transforms tend to do — can add up on mobile GPUs, so it is worth promoting only the elements that actually animate rather than every element in a 3D scene.`,
    features: [
      'Pointer-tracking tilt cards with a lerped return to rest',
      'Flip cards with a real backface and backface-visibility handling',
      'Cube, coverflow and carousel transforms built from rotate and translateZ',
      'Perspective grids and tilted layouts that add depth to flat sections',
      'transform-origin and perspective-origin tuned so rotation feels anchored',
    ],
    useCases: [
      { icon: 'STAR',   title: 'Product and feature cards', desc: 'A subtle tilt on hover reads as responsiveness and costs nothing in layout terms.' },
      { icon: 'DESIGN', title: 'Portfolio and agency sites', desc: 'Perspective galleries and coverflow carousels give a flat grid a sense of stage and depth.' },
      { icon: 'FLOW',   title: 'Flip cards for two-sided content', desc: 'Front for the summary, back for the detail — one card doing the work of a card plus a modal.' },
      { icon: 'LEARN',  title: 'Understanding the 3D transform model', desc: 'perspective, preserve-3d and transform-origin only make sense once you can nudge them and watch.' },
    ],
    faqs: [
      { q: 'Why does my 3D transform look flat?', a: 'Either the parent has no perspective value, or it lacks transform-style: preserve-3d so children are flattened into the parent\'s plane. Both must be set, and preserve-3d must be on every level between the perspective and the rotating element.' },
      { q: 'How do I stop a flip card showing its front through the back?', a: 'Set backface-visibility: hidden on both faces and rotate the back face 180 degrees to start. Without it, the front stays painted through the reversed card and the flip reads as a smear.' },
      { q: 'Are CSS 3D transforms fast?', a: 'Yes — they are composited on the GPU and do not trigger layout or paint. The cost to watch is memory: promoting many large elements to their own layers can use significant GPU memory on mobile, so promote what actually animates rather than everything.' },
    ],
  },
  {
    id: 'parallax', label: 'Parallax', ogSource: 'scroll',
    tail: 'Parallax Scroll Effect Examples',
    blurb: 'Parallax scrolling snippets — multi-layer depth, hero image drift, mouse-move parallax and scroll-linked movement that stays smooth.',
    intro: `Parallax works because layers moving at different speeds read as different distances. The technique is easy to do badly — hijacked scrolling, laggy transforms, motion so heavy it makes people queasy — so these snippets keep it restrained and cheap: transform-only movement, small offsets, and a hard stop when the user prefers reduced motion.\n\nThe tag covers scroll-linked layer drift, hero backgrounds that move slower than their foreground, pointer-driven depth on cards and heroes, and the CSS-only perspective approach that needs no script at all.\n\n**Why different speeds read as depth**\n\nIn the real world, closer objects appear to move faster across your field of view than distant ones as you move past them — the same cue your eyes use to judge distance while looking out a car window. Giving a background layer a smaller scroll-speed factor than the foreground content reproduces that cue artificially, which is the entire mechanism behind every parallax effect regardless of how it is implemented.\n\n**Doing it off the main thread**\n\nThe naive approach — read scroll position in a scroll event handler, set a style property directly — forces layout work on the main thread on every scroll frame. These snippets instead write only transform values, and do so inside a requestAnimationFrame callback rather than directly in the scroll handler, which keeps the actual work on the compositor and prevents scroll-linked motion from ever competing with the page's own responsiveness.\n\n**The CSS-only approach, with no script at all**\n\nGiving a scrolling container its own perspective, then pushing background layers back along the z-axis with translateZ and scaling them up to compensate for the resulting shrink, produces genuine parallax purely through how the browser renders 3D transforms during a normal scroll — no JavaScript computes anything. It is the smoothest version of the effect available, in exchange for a more specific HTML structure than the scripted approach requires.\n\n**Restraint is the actual craft**\n\nLarge parallax offsets and any horizontal drift are what trigger motion discomfort in sensitive users, which is why every snippet here keeps layer displacement small relative to the scroll distance involved. Under prefers-reduced-motion, the correct response is disabling the effect entirely rather than merely slowing it down — a slower version of a nauseating effect is still a nauseating effect for the people the preference exists to protect.`,
    features: [
      'Multi-layer scroll parallax with per-layer speed factors',
      'Hero backgrounds that drift slower than the content above them',
      'Pointer-move parallax for cards and hero illustrations',
      'CSS-only parallax via perspective and translateZ — zero JavaScript',
      'requestAnimationFrame-throttled updates and reduced-motion opt-out',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Landing page heroes', desc: 'A small amount of layered drift makes the top of a page feel dimensional without slowing the scroll.' },
      { icon: 'STAR',   title: 'Storytelling and case studies', desc: 'Depth cues separate scenes as a reader moves through a long editorial page.' },
      { icon: 'APP',    title: 'Cards that respond to the pointer', desc: 'Mouse parallax gives a card presence on hover with less commitment than a full 3D tilt.' },
      { icon: 'LEARN',  title: 'Learning scroll-linked motion', desc: 'Mapping scroll progress to a transform is the foundation every scroll effect builds on.' },
    ],
    faqs: [
      { q: 'Does parallax hurt performance?', a: 'Only when done with layout properties or an unthrottled scroll handler. These snippets write transforms inside a requestAnimationFrame callback and never read layout during a scroll event, which keeps the work on the compositor and off the main thread.' },
      { q: 'Can I do parallax without JavaScript?', a: 'Yes. Give a scrolling container a perspective, then push layers back with translateZ and scale them up to compensate — the browser then moves them at different rates for free, in the compositor. It is the smoothest approach available, at the cost of a more constrained structure.' },
      { q: 'How much movement is too much?', a: 'Large offsets and any horizontal drift are what trigger motion discomfort. Keep layer movement subtle relative to the scroll distance, and disable it entirely under prefers-reduced-motion rather than merely reducing it.' },
    ],
  },
  {
    id: 'scroll-animation', label: 'Scroll Animation', ogSource: 'scroll',
    tail: 'Scroll-Triggered Animation Examples',
    blurb: 'Scroll-triggered animation snippets — reveals, pinned sections, progress bars, sticky stacks and scroll-scrubbed effects.',
    intro: `Scroll is how people move through a page, which makes it the richest surface for motion — and the easiest to overdo. These snippets cover the whole vocabulary: fire-once reveals, staggered entrances, progress indicators, pinned sections that hold while their content advances, sticky card stacks, and effects scrubbed frame-by-frame against scroll position.\n\nThe implementation choices are deliberate: IntersectionObserver for anything that just needs to know "is it visible", scroll-linked math only where continuous progress is genuinely required, and transform/opacity throughout.\n\n**Visibility versus progress — two different questions**\n\nMost scroll effects only need to answer "has this element entered the viewport yet," which is exactly what IntersectionObserver was built for and costs almost nothing to run. A smaller set of effects — a progress bar, a value that scrubs with the scroll position, an image sequence advancing frame by frame — need the actual continuous answer to "how far through has the user scrolled," which requires reading scroll position directly. These snippets use the cheaper mechanism whenever the question is binary, and only reach for continuous scroll math when the effect genuinely needs it.\n\n**Pinning versus sticky — different tools for holding still**\n\nCSS position: sticky pins an element within its own containing block using nothing but a stylesheet, which is enough for sticky headers and stacking card effects. Pinning a section so its internal content can advance while the section itself stays fixed — the mechanism behind scrollytelling and horizontal-scroll galleries — needs more control over exactly when the pin starts and ends than sticky alone provides, which is why those specific snippets lean on GSAP ScrollTrigger rather than reinventing pin-and-release logic by hand.\n\n**Staggering as pacing, not just motion**\n\nA grid or list that reveals with a small per-item delay reads as a considered sequence rather than a wall of content appearing at once. That per-child delay is computed once from DOM order at setup time, not recalculated on every scroll event, which keeps the technique cheap regardless of how many items are in the grid.\n\n**The performance and accessibility baseline throughout**\n\nEvery reveal unobserves its element once triggered so nothing re-fires on scroll-back, every animation writes only transform and opacity so nothing forces a layout recalculation mid-scroll, and every effect sits behind a prefers-reduced-motion check that removes movement rather than merely slowing it. Those three habits, repeated across every technique in this tag, are what keep an ambitious scroll experience from becoming a janky one.`,
    features: [
      'Fire-once reveals and staggered grids via IntersectionObserver',
      'Scroll progress bars, reading indicators and section trackers',
      'Pinned sections and horizontal-scroll galleries (GSAP ScrollTrigger)',
      'Sticky stacks and sticky feature panels using pure CSS position: sticky',
      'Scrubbed effects — image sequences, counters, path draws tied to scroll progress',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Marketing and landing pages', desc: 'Reveals pace a long page so each section arrives rather than all existing at once.' },
      { icon: 'FLOW',   title: 'Scrollytelling and product tours', desc: 'Pinned steps turn a scroll into a guided narrative with no navigation for the reader to operate.' },
      { icon: 'APP',    title: 'Docs and long-form reading', desc: 'Progress bars and section trackers orient a reader in a page that would otherwise feel endless.' },
      { icon: 'LEARN',  title: 'Choosing the right scroll technique', desc: 'Seeing observer-based and scroll-linked approaches side by side makes the trade-off concrete.' },
    ],
    faqs: [
      { q: 'Do these use scroll event listeners?', a: 'Mostly not. Anything that only needs to know whether an element is visible uses IntersectionObserver. Only the effects that need continuous progress read scroll position, and they do it inside a requestAnimationFrame callback rather than on every scroll event.' },
      { q: 'Why does my reveal animation replay when I scroll back up?', a: 'Because the observer is still watching. Call unobserve on the element once you have applied the visible class — a reveal that re-triggers on every pass reads as a glitch, not as a feature.' },
      { q: 'What about scroll-driven animations in CSS?', a: 'The animation-timeline / scroll() syntax now works in Chromium browsers and is the future of this whole category — no script, and the animation runs off the main thread. Until support is universal, the patterns here are the portable version, and several snippets show both.' },
    ],
  },
  {
    id: 'text-effects', label: 'Text Effects', ogSource: 'animations',
    tail: 'Animated Typography Examples',
    blurb: 'Animated typography snippets — typewriter, scramble, gradient and shimmer text, marquees, split-letter reveals and glitch effects.',
    intro: `Typography carries most of the meaning on a page, so animating it is high-leverage and easy to overplay. These snippets cover the effects worth having: typewriter and scramble sequences, gradient and shimmer fills, split-letter and word reveals, marquees, variable-font weight animation, and glitch treatments for a deliberately technical tone.\n\nEach one keeps the underlying text real and selectable — the effect is applied over the content, not instead of it, so search engines and screen readers still get the sentence.\n\n**The gradient-fill trick, explained once**\n\nPainting a gradient as an element's background, then setting background-clip: text with a transparent text colour, makes the gradient visible only through the shape of the glyphs themselves. Animating the gradient's background-position afterward is what turns a static gradient fill into the shimmer effect used across several headline and accent-text snippets here — one property doing all the work.\n\n**Splitting text without losing the sentence**\n\nStaggered letter and word reveals work by wrapping each character or word in its own span so it can be transitioned individually with a per-element delay. The risk is that a screen reader announces a heavily split sentence oddly, or search indexing sees fragments instead of a sentence — every snippet here keeps the original text content on the parent element and treats the split spans as a presentation layer, adding an aria-label when the split would otherwise change how the text is announced.\n\n**Timing sequences with steps(), not just duration**\n\nA typewriter effect is not a smooth transition — it needs to reveal exact character boundaries at discrete moments, which is what animation-timing-function: steps(n) provides: n distinct jumps rather than a continuous interpolation. Pairing that with a monospace font or a fixed-width container is what stops the classic typewriter cursor from drifting as different characters render at different widths.\n\n**Seamless loops need exact math**\n\nA marquee or ticker that appears to scroll forever is actually a duplicated copy of its content, translated by precisely half the combined width of both copies before looping back to zero. Any offset other than exactly half produces the visible stutter or jump that gives away a marquee built without this detail — it is the single calculation that separates a convincing infinite scroll from an obviously looping one.`,
    features: [
      'Typewriter and scramble sequences with per-character timing control',
      'Gradient, shimmer and animated-fill text via background-clip',
      'Split-letter and split-word reveals with cascading delay',
      'Marquee and infinite ticker rows with seamless looping',
      'Glitch, outline and variable-font weight animation',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Hero headlines', desc: 'One animated headline gives a landing page a focal point without any imagery at all.' },
      { icon: 'STAR',   title: 'Rotating value propositions', desc: 'A typewriter cycling through audiences or use cases says more than a static line of copy.' },
      { icon: 'FLOW',   title: 'Tickers and announcement bars', desc: 'A seamless marquee fits a lot of short items into a strip of vertical space.' },
      { icon: 'LEARN',  title: 'Learning text animation techniques', desc: 'background-clip fills, per-character splitting and steps() timing are each worth knowing on their own.' },
    ],
    faqs: [
      { q: 'Does animated text hurt SEO or accessibility?', a: 'Not when the real text stays in the DOM, which is how these snippets work — the effect wraps or styles existing content. Where letters are split into spans, keep the parent readable and add aria-label if the split makes the text announce oddly. Avoid effects that rely on the text being an image.' },
      { q: 'How does the gradient text trick work?', a: 'Paint a gradient as the element\'s background, then set background-clip: text with a transparent text colour, so the background shows only through the glyphs. Animating the background-position turns it into a shimmer.' },
      { q: 'How do I make a marquee loop seamlessly?', a: 'Duplicate the content once and translate the pair by exactly half its total width, then loop. Any other offset produces the visible jump that gives most marquee implementations away.' },
    ],
  },
  {
    id: 'micro-interactions', label: 'Micro-Interactions', ogSource: 'buttons',
    tail: 'Micro-Interaction UI Examples',
    blurb: 'Micro-interaction snippets — ripples, magnetic buttons, hover reveals, toggles, confetti bursts and the small feedback that makes UI feel alive.',
    intro: `A micro-interaction is the smallest complete unit of interface feedback: a button that acknowledges a press, a toggle that slides rather than jumps, a like that bursts, a card that lifts under the cursor. Individually they are trivial. Collectively they are most of what people mean when they say an interface feels good.\n\nThese snippets cover the vocabulary — ripples, magnetic attraction, hover lifts and reveals, state transitions, success ticks and confetti — each small enough to lift into an existing component without restructuring anything.\n\n**Acknowledging the action, not decorating it**\n\nEvery micro-interaction here exists to confirm that something the user did actually registered — a click landed, a toggle moved, a value changed. A ripple originates from the real click coordinates rather than the element's centre, which is what makes it read as a direct response to that specific tap rather than a generic animation that happens to play on click.\n\n**Cheap effects that still feel physical**\n\nA magnetic button's attraction toward the cursor and its return to rest both run through a lerp — the position eases a fixed percentage of the remaining distance toward its target on every animation frame, rather than jumping or moving at constant speed. That single technique, reused across the magnetic and hover-follow effects in this tag, is what gives cursor-following motion a sense of weight without any physics engine.\n\n**Cleanup as part of the interaction**\n\nA ripple span, ideally, does not accumulate: it is created on click, scaled and faded via a keyframe, and removed from the DOM on animationend. Confetti particles work the same way — created, animated with a gravity term reducing their velocity each frame, then removed once fully faded. Skipping that removal step is what turns a snappy micro-interaction into a slow memory leak on a page where the action repeats often.\n\n**Knowing when to stop**\n\nThe rule that keeps this tag's effects from becoming exhausting is animating only what the user just caused, not the content they are trying to read next to it — and keeping any added delay to roughly 200 milliseconds so feedback never gets in the way of the next action. Every effect here also drops its movement, while keeping the underlying state change, under prefers-reduced-motion.`,
    features: [
      'Ripple effects positioned from the real click coordinates',
      'Magnetic buttons and cursor-following elements with lerped motion',
      'Hover lifts, glows, reveals and icon transitions',
      'Toggle, checkbox and switch animations with satisfying state changes',
      'Success ticks, confetti bursts and celebratory feedback for completed actions',
    ],
    useCases: [
      { icon: 'STAR',   title: 'Buttons and calls to action', desc: 'The element people click most deserves the clearest acknowledgement that the click landed.' },
      { icon: 'FLOW',   title: 'Form and toggle feedback', desc: 'A switch that animates its state removes any doubt about which position it just moved to.' },
      { icon: 'DESIGN', title: 'Card and tile hover states', desc: 'A small lift and shadow change is the cheapest way to make a grid feel interactive.' },
      { icon: 'APP',    title: 'Completion moments', desc: 'A tick or a burst at checkout or upload completion converts a technical success into a felt one.' },
    ],
    faqs: [
      { q: 'How much micro-interaction is too much?', a: 'When motion competes with the task. A good rule: animate what the user just caused, not what they are trying to read. Elements that move on their own, repeat, or delay the next action past roughly 200 milliseconds are past the line.' },
      { q: 'How does the ripple effect get its position?', a: 'From getBoundingClientRect on the button subtracted from the click coordinates, giving a point relative to the element. A span is placed there and scaled up with a keyframe, then removed on animationend so the DOM does not accumulate leftovers.' },
      { q: 'Do micro-interactions need to respect reduced-motion?', a: 'Yes. Keep the state change — the colour, the label, the tick — and drop the movement under prefers-reduced-motion. The feedback survives; only the travel disappears, which is exactly the intent of the preference.' },
    ],
  },
  {
    id: 'dark-mode', label: 'Dark Mode', ogSource: 'dashboards',
    tail: 'Dark Mode Theme Examples',
    blurb: 'Dark mode snippets — theme toggles, prefers-color-scheme handling, CSS-variable palettes and components designed for both themes.',
    intro: `Dark mode is now an expectation, and the components that survive it are the ones built on tokens rather than hard-coded colours. These snippets cover the whole pattern: a variable-driven palette, a toggle with three states (light, dark, follow system), persistence that avoids a flash of the wrong theme on load, and components that look deliberate in both.\n\nThe recurring lesson is that dark mode is not an inversion. Shadows stop working, pure black is harsher than a dark grey, and saturated brand colours usually need to be softened rather than reused unchanged.\n\n**Semantic tokens, not hard-coded colours**\n\nA component that references --color-background and --color-text, rather than a literal hex value, gets a second theme for free the moment those custom properties are redefined under a dark selector. Every snippet in this tag is built against a small set of named tokens — surface, text, border, accent — for exactly this reason: adding a theme is then a values-only change, never a rewrite of the components themselves.\n\n**Three states, not two**\n\nA toggle limited to light and dark forces every user to make an explicit choice, including the majority who would be perfectly happy following their operating system's setting. These snippets default to prefers-color-scheme and layer an explicit override on top only once the user picks one — which is also what lets a three-state control offer "system" as a way back to automatic that a plain two-state switch has no room for.\n\n**No flash of the wrong theme**\n\nApplying the stored theme from inside a framework's mount effect happens after the first paint, which is precisely when a visible flash of the wrong theme occurs. The fix used throughout this tag is a small inline script in the document head that reads the stored preference and sets a class or data-theme attribute on the root element before the stylesheet-dependent paint happens at all.\n\n**Why dark mode is not simply inverted colours**\n\nA shadow calculated for a light surface has almost no visible contrast against a dark one, so elevation in these components comes from a lighter surface colour instead, sometimes with a subtle light border rather than a shadow. Saturated brand colours that look vivid on white frequently vibrate uncomfortably against a dark background and need their lightness or saturation adjusted specifically for the dark palette rather than reused unchanged from the light one.`,
    features: [
      'CSS custom-property palettes with light and dark token sets',
      'Three-state theme toggles — light, dark and follow-system',
      'prefers-color-scheme defaults with an explicit user override on top',
      'Persistence that applies the theme before first paint, with no white flash',
      'Elevation via surface lightness rather than shadows, which vanish on dark',
    ],
    useCases: [
      { icon: 'APP',    title: 'Product and dashboard shells', desc: 'A theme switch in the header is table stakes for anything people keep open all day.' },
      { icon: 'DESIGN', title: 'Design token systems', desc: 'Defining colour once as semantic variables is what makes a second theme cheap rather than a rewrite.' },
      { icon: 'FLOW',   title: 'Respecting system preference', desc: 'Follow the OS by default and let the user override it — that combination surprises nobody.' },
      { icon: 'LEARN',  title: 'Learning theming architecture', desc: 'Token naming, contrast checking and elevation in dark themes are all visible here in working code.' },
    ],
    faqs: [
      { q: 'How do I avoid the white flash before dark mode applies?', a: 'Read the stored preference in a tiny inline script in the <head> and set a class or data-theme attribute on the root element before the body paints. Applying the theme from a framework effect always runs after the first paint, which is exactly when the flash happens.' },
      { q: 'Should I follow the system preference or remember a choice?', a: 'Both, in that order: default to prefers-color-scheme, and store an explicit choice only when the user makes one. A three-state toggle that includes "system" lets them return to automatic, which a two-state one cannot.' },
      { q: 'Why do my shadows disappear in dark mode?', a: 'Because a dark shadow on a dark surface has almost no contrast. Convey elevation with a lighter surface colour instead, optionally with a subtle light border — the approach every mature dark design system converges on.' },
    ],
  },
  {
    id: 'accessibility', label: 'Accessibility', ogSource: 'modals',
    tail: 'Accessible ARIA UI Examples',
    blurb: 'Accessible component snippets — focus management, ARIA roles and live regions, reduced-motion handling and keyboard-complete widgets.',
    intro: `These snippets treat accessibility as part of the component, not a pass afterwards: focus that moves and returns predictably, roles and states that match what the widget actually does, live regions that announce changes, visible focus indicators, and motion that can be switched off.\n\nThey follow the ARIA authoring practices for each pattern — dialogs, tabs, comboboxes, disclosures, alerts — so the markup is worth copying exactly rather than approximating.\n\n**The first rule of ARIA is not needing it**\n\nA native <button>, <dialog>, <details> or <input> arrives with correct role, state and keyboard behaviour built in, and no amount of ARIA fully replaces that. These snippets reach for ARIA roles and states only when building something the platform genuinely does not provide — and when they do, they implement the entire authoring-practice pattern for that role, because a role announced without the matching keyboard behaviour is worse for a screen-reader user than no role at all.\n\n**Focus has to go somewhere, and come back**\n\nOpening a dialog or drawer means deciding exactly where focus lands — usually the first focusable element or a heading — and trapping Tab so it cannot escape to content behind the overlay. Just as critical is what happens on close: focus returning to the exact trigger element that opened the interaction, rather than resetting to the top of the document, is what keeps a keyboard user oriented across repeated open-and-close cycles.\n\n**Live regions announce without stealing attention**\n\nContent that changes without a focus move — a result count updating, a toast appearing, a save confirming — needs an aria-live region to be noticed by a screen reader at all. These snippets default to aria-live="polite", which waits for a natural pause before announcing, and reserve assertive for genuine interruptions like a blocking error, because an assertive region firing constantly is experienced as being talked over.\n\n**Focus rings that show up when they matter**\n\n:focus-visible is what let designers stop removing focus outlines altogether: it shows a ring for keyboard and other non-pointer input while staying invisible on a mouse click, resolving the old conflict between "focus rings look messy on click" and "removing them breaks keyboard navigation entirely." Every custom-styled control in this tag keeps a real, high-contrast ring under :focus-visible rather than suppressing it for aesthetic reasons.`,
    features: [
      'Focus traps for dialogs and drawers, with focus restored to the trigger',
      'aria-live regions that announce async results without stealing focus',
      ':focus-visible indicators that appear for keyboards and stay out of the way of mice',
      'Correct roles and states for tabs, dialogs, comboboxes and disclosures',
      'prefers-reduced-motion paths that remove movement while keeping feedback',
    ],
    useCases: [
      { icon: 'FLOW',  title: 'Modals, drawers and overlays', desc: 'Focus management is what separates a usable overlay from a trap for keyboard users.' },
      { icon: 'FORM',  title: 'Forms with real error messaging', desc: 'Errors tied to inputs with aria-describedby and announced live are the difference between fixable and invisible.' },
      { icon: 'APP',   title: 'Custom widgets built from divs', desc: 'If you must rebuild a select or a tablist, these are the roles and key handlers it needs to behave like one.' },
      { icon: 'LEARN', title: 'Learning ARIA by example', desc: 'Working implementations of the authoring practices are far easier to absorb than the specification.' },
    ],
    faqs: [
      { q: 'When should I use ARIA at all?', a: 'As little as possible. A <button>, <dialog>, <details> or <input> brings its role, state and keyboard behaviour for free, and no ARIA can fully replace that. Reach for roles and states only when you are building something the platform does not provide — and then implement the whole pattern, because a role without the matching keyboard behaviour is worse than none.' },
      { q: 'What is an aria-live region for?', a: 'Announcing content that changes without a focus move — a search result count, a toast, a save confirmation. Use polite for almost everything so it waits for a pause, and assertive only for genuine interruptions such as errors that block the task.' },
      { q: 'Is :focus-visible enough for focus indicators?', a: 'Yes, and it is the right default: it shows a ring for keyboard and assistive input while suppressing it for mouse clicks, which is why designers stopped removing outlines. Make sure the ring itself has real contrast against both the element and the page background.' },
    ],
  },

  /* ── Product surfaces and domains ──────────────────────────────────────── */
  {
    id: 'ai-ui', label: 'AI UI', ogSource: 'dashboards',
    tail: 'AI Chat & Agent Interface Examples',
    blurb: 'AI interface snippets — chat streams, prompt composers, reasoning traces, token meters, model pickers and agent step timelines.',
    intro: `AI products have produced a genuinely new set of interface patterns, and most of them exist to make a probabilistic system legible: streaming responses that show progress, reasoning traces that expose intermediate steps, citations that make a claim checkable, confidence badges, token and context meters, and approval cards for actions an agent wants to take.\n\nThese snippets implement that vocabulary as plain HTML, CSS and JavaScript, driven by simulated data — so you can wire them to any model API without adopting a framework first.\n\n**Streaming is a state machine, not a text append**\n\nA response bubble that looks well-built moves through distinct states — idle, streaming with a blinking cursor, a visible stop-generation control while tokens are still arriving, then settled once the stream ends or errors. Treating streaming as this explicit sequence, rather than just appending characters to a div as they arrive, is what makes the interface communicate whether generation is still in progress and give the user a way to interrupt it.\n\n**Making a probabilistic answer inspectable**\n\nA reasoning trace that expands to show intermediate steps, a citation that links a claim back to its source, and a confidence badge on an uncertain answer all exist for the same reason: a model's output is a claim, not a fact, and an interface that hides how it arrived at that claim leaves the user with no way to judge whether to trust it. These components make the "why" available without forcing every user to read it by default — collapsed until expanded, present but not intrusive.\n\n**Budgets are part of the interface now**\n\nToken counters, context-window meters and per-request cost displays surface constraints that used to be invisible to end users but directly affect what an AI feature can do — a conversation that is about to exceed its context window behaves differently, and a user who can see that coming is better served than one who hits it unexpectedly. Developer-facing AI tools in particular treat these meters as first-class UI, not a debug afterthought.\n\n**Simulated data, real interface contracts**\n\nEvery streaming and reasoning-trace snippet here consumes a stream of tokens or steps from a local simulation rather than a live API, specifically so the components can be evaluated, demoed and iterated on with no API key, no cost and no network dependency. Because the components consume a stream in a defined shape, replacing the simulated source with a real fetch against a streaming endpoint is a change to where the data comes from, not to how the interface renders it.`,
    features: [
      'Streaming response bubbles with typing, cursor and stop-generation states',
      'Prompt composers with attachments, model selection and token counting',
      'Reasoning, tool-call and agent-step traces that expand to show detail',
      'Context-window, token-usage and cost meters',
      'Citation, confidence and refusal cards that make model output inspectable',
    ],
    useCases: [
      { icon: 'APP',   title: 'Chat and assistant interfaces', desc: 'The streaming bubble and composer pair is the core loop of every AI product on the web.' },
      { icon: 'FLOW',  title: 'Agent and tool-use surfaces', desc: 'Step timelines and approval cards make an autonomous run reviewable instead of a black box.' },
      { icon: 'CODE',  title: 'Developer-facing AI tooling', desc: 'Token meters, model comparison tables and function-call traces are what these users actually need on screen.' },
      { icon: 'STAR',  title: 'Prototyping an AI feature', desc: 'Simulated data means the interface can be designed and reviewed before a single API call exists.' },
    ],
    faqs: [
      { q: 'Do these snippets call a real model API?', a: 'No — they run on simulated data so they work offline and cost nothing to demo. The streaming components consume a token stream, so swapping the simulation for a fetch against a real streaming endpoint is a change to the data source, not to the interface code.' },
      { q: 'How do I connect the streaming bubble to a real API?', a: 'Replace the simulated interval with a fetch that reads the response body as a stream, decoding chunks and appending text as they arrive. Keep the existing states — idle, streaming, stopped, error — because those are the parts users notice and the parts naive implementations skip.' },
      { q: 'Why show reasoning steps and token counts at all?', a: 'Because they convert an opaque answer into an inspectable one. Seeing which tools ran, which sources were used, and how much context remains is what lets a user judge whether to trust a result — and it dramatically reduces the "why did it do that" support load.' },
    ],
  },
  {
    id: 'developer-tools', label: 'Developer Tools', ogSource: 'dashboards',
    tail: 'Formatter & Dev Tool Examples',
    blurb: 'Developer tool snippets — JSON and SQL formatters, regex testers, terminals, log viewers, diff views and API inspectors.',
    intro: `Tools built for developers have their own interface conventions: monospaced output, precise error locations, keyboard-first operation, and a strong preference for doing the work locally rather than sending code to a server. These snippets follow all four.\n\nThe tag covers formatters and validators, regex and cron builders, terminal and log-stream views, diff and API-response inspectors, and the visualizers that explain a mechanism — the event loop, a hash table, a rate limiter — by animating it.\n\n**Errors that point at exactly the problem**\n\nA generic "invalid input" message forces a developer to hunt for what is actually wrong; a message naming the exact line and column, or the specific token that failed to parse, gets them there directly. Every formatter and validator in this tag surfaces that precise location rather than a blanket failure state, because that specificity is most of what separates a genuinely useful dev tool from a toy.\n\n**Real parsers where it matters, pragmatic ones where it doesn't**\n\nThe JSON tools run the browser's own JSON.parse under the hood, so behaviour matches your actual runtime rather than a reimplementation that might disagree with it at the edges. The SQL and .env formatters, in contrast, use clause detection and line-by-line parsing — the same practical technique real-world formatters lean on — which handles every realistic input without the weight of a complete grammar, a reasonable trade for tools that format rather than execute.\n\n**Local by default, and it matters here specifically**\n\nA config file, an API key, or a production log line can contain something sensitive, so every tool in this tag runs entirely client-side and keeps working with the network disconnected — nothing is transmitted anywhere for inspection or formatting. For developer tooling specifically, this is not a nice-to-have: it is the property that makes the tool safe to point at real, unsanitised production data in the first place.\n\n**Visualising a mechanism instead of describing it**\n\nAn event loop, a hash table's collision handling, or a token-bucket rate limiter are all concepts that take a paragraph to explain in prose and about five seconds to understand once animated step by step. The visualizer snippets in this tag exist specifically for that gap — they are teaching tools built from the same primitives (canvas, SVG, CSS transitions) as the rest of the library, aimed at making a mechanism obvious rather than merely correct.`,
    features: [
      'Formatters and validators that report the exact line and column of a failure',
      'Terminal, log-stream and command-palette interfaces',
      'Diff views, API response inspectors and request timelines',
      'Regex, cron and query builders with live output',
      'Everything runs client-side — no code or config leaves the browser',
    ],
    useCases: [
      { icon: 'CODE',  title: 'Internal developer platforms', desc: 'Log viewers, diff panes and inspectors are the components these tools are mostly made of.' },
      { icon: 'APP',   title: 'Documentation and API portals', desc: 'A live formatter or request inspector on the page beats a static example block.' },
      { icon: 'LEARN', title: 'Teaching how something works', desc: 'The visualizers animate the mechanism, which explains an event loop or a cache far faster than prose.' },
      { icon: 'FLOW',  title: 'Admin and ops surfaces', desc: 'Cron builders and log streams are recurring pieces of any internal operations interface.' },
    ],
    faqs: [
      { q: 'Do these tools send my data anywhere?', a: 'No. Every one runs entirely in the browser, which is the whole point for anything touching a config file, an API key or a production log. Nothing is uploaded, and they keep working with the network disconnected.' },
      { q: 'Are the formatters real parsers?', a: 'They are pragmatic, not complete grammars. The JSON tools use the browser\'s own JSON.parse, so behaviour matches your runtime exactly. The SQL and .env tools use clause detection and line-by-line parsing — the same techniques real formatters use — which handles every realistic input without the weight of a full parser.' },
      { q: 'Can I use these in a commercial product?', a: 'Yes. Every snippet is free to copy, modify and ship, including in commercial work, with no attribution requirement.' },
    ],
  },
  {
    id: 'data-visualization', label: 'Data Visualization', ogSource: 'charts',
    tail: 'No-Library Chart & Data Viz Examples',
    blurb: 'Chart and data-viz snippets — bar, line, donut, radar and gauge charts, sparklines, heatmaps and metric tiles with no charting library.',
    intro: `Most product charts do not need a charting library. A bar chart is rectangles, a line chart is a path, a donut is a stroked circle — and drawing them yourself means full control over styling, animation and accessibility, with nothing added to your bundle.\n\nThese snippets cover the common chart types plus the small-format marks that dashboards actually run on: sparklines, progress rings, heatmap grids, gauges and metric tiles with trend indicators.\n\n**A chart is simpler geometry than it looks**\n\nA bar chart is a set of rectangles whose heights are derived from a linear scale mapping data values to pixels. A line or area chart is one SVG path whose points come from mapping each data point through the same kind of scale on both axes. A donut is a circle with stroke-dasharray used the same way it draws a progress ring. Seeing the charts this way — as a small number of well-understood primitives with data-derived coordinates — is what makes hand-drawing them tractable instead of intimidating.\n\n**Deriving scale from data, not assuming it**\n\nEvery chart here computes its axis domain from the actual data range at render time rather than hard-coding fixed minimum and maximum values. That single habit is what lets the same rendering code handle a dataset that later grows or shrinks, and it is the entire mechanism by which "connect this to real data" reduces to swapping one array at the top of the file.\n\n**Small-format marks carry dashboard density**\n\nA sparkline, a trend arrow, and a metric tile with a delta communicate more information per pixel than a full chart with axes and a legend, which is why dashboards lean on them heavily. These marks use the same scale-and-path logic as the full-size charts, just sized down and stripped of axis chrome, so the two categories share a real implementation rather than being built from separate techniques.\n\n**Accessibility is a second representation, not an attribute**\n\nA chart with role="img" and a label is a start, but the numbers behind it still need to reach a screen reader — which means providing the underlying data as a visually hidden table or a toggleable data view alongside the visual. A chart with no textual equivalent conveys nothing to anyone who cannot see it, no matter how well the visual itself is built.`,
    features: [
      'Bar, line, area, donut, radar, gauge and candlestick charts in plain SVG or canvas',
      'Sparklines and micro-charts sized for table cells and metric tiles',
      'Activity heatmaps and calendar grids',
      'Animated entry and value transitions driven by real data changes',
      'Accessible fallbacks — data tables and labels behind every visual',
    ],
    useCases: [
      { icon: 'APP',    title: 'Product dashboards', desc: 'Tiles, sparklines and trend arrows carry most of the information density in a dashboard.' },
      { icon: 'FLOW',   title: 'Reports and analytics views', desc: 'Full-size charts with axes and legends, styled to match your product rather than a library default.' },
      { icon: 'DESIGN', title: 'Marketing pages with numbers', desc: 'An animated chart in a feature section makes a claim concrete without a screenshot.' },
      { icon: 'LEARN',  title: 'Learning how charts are drawn', desc: 'Scales, axes and paths are much less mysterious once you have built one from arithmetic.' },
    ],
    faqs: [
      { q: 'Why not just use a charting library?', a: 'For heavy interactive analytics, use one. For the eight to ten charts a typical product ships, hand-drawn SVG is smaller, styles natively with your design tokens, animates exactly how you want, and never fights the library over a customisation it did not anticipate.' },
      { q: 'How do I make a chart accessible?', a: 'Give the SVG role="img" and a summary label, and provide the underlying numbers in a visually hidden table or a toggleable data view. A chart with no textual equivalent is invisible to a screen reader, however clear it looks.' },
      { q: 'How do I connect these to real data?', a: 'Each snippet keeps its data in one array at the top and derives every scale from it, so replacing that array with a fetch result is usually the entire integration. The rendering code recomputes the domain rather than assuming fixed bounds.' },
    ],
  },
  {
    id: 'dashboard-ui', label: 'Dashboard UI', ogSource: 'dashboards',
    tail: 'Dashboard & KPI Tile Examples',
    blurb: 'Dashboard snippets — stat tiles, KPI rows, activity feeds, status pages, monitoring widgets and admin layouts.',
    intro: `A dashboard is a hierarchy: the number that matters, the trend behind it, and the detail you drill into. These snippets supply the pieces — stat and KPI tiles with trend indicators, activity feeds, status and uptime widgets, monitoring gauges, kanban boards and the shells that arrange them.\n\nSeveral of the monitoring widgets simulate telemetry at the request level rather than the summary level, which is why they read as live systems instead of animated placeholders — a pattern worth copying for any status display.\n\n**Information hierarchy over decoration**\n\nA stat tile answers three questions in order of importance: what is the number, is it moving in a good direction, and by how much. That ordering — the value largest and first, the trend arrow and delta secondary, a sparkline as supporting context — is what these tiles are built around, because a dashboard where every element competes for equal attention communicates nothing at a glance.\n\n**Simulating telemetry that looks real**\n\nA convincing live-data demo generates individual events at the item level — one simulated request, one simulated user action — and aggregates those into the totals shown on screen, rather than picking one smooth random percentage per tick and animating toward it. The wobble and occasional spike that real telemetry produces comes directly from that item-level aggregation; a single randomised summary number is what gives most fake dashboards away on close inspection.\n\n**Status communication before someone opens a ticket**\n\nAn uptime bar built from discrete time-bucket segments, and an incident timeline listing what happened and when, let a user assess system health themselves rather than guessing from a spinner or a support form. This is a deliberately different job from an internal monitoring gauge — status pages communicate outward, to people who may have no other context on the system at all.\n\n**Shells that reflow instead of shrink**\n\nAn admin or dashboard shell built from auto-fit grid tracks reflows its tile count as the viewport narrows rather than compressing every tile to an unreadable size, and a wide data table scrolls horizontally inside its own container rather than forcing every column to shrink. Stacking tiles in priority order on mobile — most important information first — is what keeps a dense dashboard usable on a phone without a dedicated mobile layout.`,
    features: [
      'Stat and KPI tiles with deltas, trend arrows and inline sparklines',
      'Activity feeds, audit logs and notification centres',
      'Status pages, uptime bars and incident timelines',
      'Monitoring widgets with realistic simulated telemetry',
      'Admin shells — sidebars, filter bars and responsive grid layouts',
    ],
    useCases: [
      { icon: 'APP',   title: 'SaaS product dashboards', desc: 'The landing surface of most products, where information hierarchy matters more than decoration.' },
      { icon: 'FLOW',  title: 'Ops and status pages', desc: 'Uptime bars and incident timelines communicate system state to users before they open a ticket.' },
      { icon: 'CODE',  title: 'Internal admin tools', desc: 'Tables, filters and detail panels assembled quickly, since nobody budgets design time for internal tooling.' },
      { icon: 'STAR',  title: 'Demos and investor screenshots', desc: 'Convincing simulated data makes a prototype presentable long before the backend is real.' },
    ],
    faqs: [
      { q: 'How do the widgets simulate live data?', a: 'At the item level, not the summary level: a tick generates individual events, routes them, and aggregates the result, so the totals wobble the way real telemetry does. Picking one random percentage per tick produces the smooth, obviously fake motion that gives most demo dashboards away.' },
      { q: 'How do I wire these to a real API?', a: 'Replace the simulation interval with a poll or a subscription and feed the same shape into the same render function. Keep the aggregation step — it is what lets a per-region breakdown diverge from the global number, which is exactly what makes a regional problem visible.' },
      { q: 'How should a dashboard behave on mobile?', a: 'Stack tiles in priority order rather than shrinking a grid, and let wide tables scroll horizontally inside their own container instead of squeezing columns. These snippets use auto-fit grids so tile layouts reflow without extra breakpoints.' },
    ],
  },
  {
    id: 'data-tables', label: 'Data Tables', ogSource: 'tables',
    tail: 'Sortable Data Table Examples',
    blurb: 'Data table snippets — sortable and filterable tables, frozen columns, inline editing, row selection, pagination and virtualised lists.',
    intro: `Tables are where dense data meets real interaction, and the details decide whether one is usable: which column is sorted, what stays pinned when you scroll, how a long row reveals its detail, and what happens when the data is empty, loading or broken.\n\nThese snippets cover the full working set — sorting, multi-sort, filtering, search highlighting, frozen and resizable columns, inline editing, row selection, expandable detail panels, virtualisation for large sets, and the loading, empty and error states most implementations forget.\n\n**Sorting state has to be visible, not just functional**\n\nA sortable column needs its current direction shown in the header — an arrow indicating ascending or descending — and exposed programmatically via aria-sort, not just handled correctly on click. Multi-sort extends this with a visible priority indicator per column, because a user who shift-clicks a second column to add a tiebreaker needs to see that the first sort is still active underneath it.\n\n**Frozen and sticky, without breaking scroll**\n\nA frozen first column and a sticky header both rely on position: sticky combined with a defined stacking context, and the tricky part is keeping cell borders and shadows consistent as content scrolls underneath — a shadow that only appears once the frozen column has something to separate itself from is what sells the effect rather than looking like a static line.\n\n**Editing inline versus a modal round trip**\n\nInline editing with per-cell validation lets a small correction happen without navigating away from the table's context, which matters most in admin tools where the table itself is the primary interface. The validation for each cell needs to behave like a real form field — an error message, an aria-invalid state, a way to cancel back to the previous value — not just a visual red border on the cell.\n\n**Virtualisation is a performance tool, not a default**\n\nRendering only the rows currently in the viewport keeps a table with thousands of rows responsive, but it also breaks native browser find-in-page and complicates row-height-dependent layouts. Below roughly a few hundred rows, the DOM cost is negligible and the added complexity of virtualisation is not worth its trade-offs; above it, rendering only the visible window is what keeps scrolling and re-rendering fast.\n\n**States a table can be in besides "has data"**\n\nA loading skeleton shaped like the eventual table, an empty state that suggests why there is nothing to show and what to do about it, and an error state distinct from an empty one are each a deliberate design decision — and each is a state these snippets implement explicitly rather than leaving as an afterthought discovered in production.`,
    features: [
      'Sortable, multi-sortable and filterable tables with live search highlighting',
      'Frozen columns, sticky headers and sticky summary rows',
      'Inline editing, validation errors and row-level actions',
      'Row selection, bulk action bars and expandable detail panels',
      'Virtualisation, pagination, and explicit loading, empty and error states',
    ],
    useCases: [
      { icon: 'APP',   title: 'Admin and back-office tools', desc: 'The table is usually the product here, so sorting, filtering and inline edit are core, not extras.' },
      { icon: 'FLOW',  title: 'Reporting and export views', desc: 'Grouped rows, summary rows and print views are what turn a table into something a person can hand over.' },
      { icon: 'FORM',  title: 'Editable data grids', desc: 'Inline editing with per-cell validation avoids a modal round trip for every small correction.' },
      { icon: 'DESIGN',title: 'Responsive table patterns', desc: 'Card-per-row on mobile keeps a wide table readable without a horizontal scroll nobody discovers.' },
    ],
    faqs: [
      { q: 'When do I need virtualisation?', a: 'Once the DOM node count starts hurting — roughly a few hundred rows with several cells each. Below that, virtualisation adds complexity and breaks Ctrl+F for no real gain. Above it, rendering only the visible window is the difference between instant and unusable.' },
      { q: 'How do I make a table accessible?', a: 'Use real table markup with <th> and the right scope attributes, put sort controls in <button>s inside the header cells, and expose the current sort with aria-sort. A grid of divs needs the entire grid role pattern reimplemented to reach the same baseline.' },
      { q: 'What is the best mobile table pattern?', a: 'Either a horizontal scroll container with the first column frozen, or transform each row into a stacked card with labels. Scroll suits comparison across columns; cards suit reading one record at a time. Both beat shrinking text until it is illegible.' },
    ],
  },
  {
    id: 'form-validation', label: 'Forms & Validation', ogSource: 'forms',
    tail: 'Form Input & Validation Examples',
    blurb: 'Form snippets — floating labels, OTP inputs, password strength, multi-step wizards, file uploads and inline validation feedback.',
    intro: `Forms are where users commit — signing up, paying, configuring — so friction here costs more than anywhere else in a product. These snippets cover the input patterns that reduce it: floating labels, auto-advancing OTP fields, card inputs that format as you type, password strength that scores honestly, tag inputs, file dropzones, and multi-step flows that validate per step.\n\nValidation is inline and specific throughout: the message says what is wrong and where, sits next to the field, and is announced to assistive technology rather than only shown in colour.\n\n**Validate at the right moment, not the earliest one**\n\nMarking a field invalid the instant a user starts typing reads as hostile — it tells someone they are wrong before they have finished answering. Every validated field here checks on blur for its first pass, then switches to live, on-input checking only once it has already been marked invalid once, so a correction is confirmed immediately without punishing someone mid-keystroke on their first attempt.\n\n**Building on the constraint validation API, not replacing it**\n\nHTML's own required, type, pattern and min/max attributes give real validation and browser-native behaviour — including mobile keyboard hints — for free, with no script. These snippets use that as the actual validation layer and override only the default error bubble's appearance, via setCustomValidity or by reading the input's validity state directly, which keeps the semantics native while the visual design stays fully custom.\n\n**Errors need three properties to be accessible**\n\nA message tied to its field with aria-describedby, an aria-invalid="true" on the input itself, and the message text present in the DOM rather than conveyed through colour alone — all three matter, because a red border alone is invisible to a screen reader and ambiguous to anyone with a colour vision deficiency. Every inline-validation snippet in this tag implements all three together rather than any one in isolation.\n\n**Interaction detail is where these components earn their keep**\n\nAn OTP input's paste-to-fill splitting one clipboard read across every box, a credit-card field auto-formatting with a live Luhn check as digits are typed, and a password meter scoring real entropy rather than checking boxes for a symbol — each of these is a small mechanical detail, and each is disproportionately responsible for whether the surrounding form feels considered or generic.`,
    features: [
      'Floating labels, focus rings and clear field states in pure CSS where possible',
      'OTP inputs with auto-advance, paste-to-fill and backspace navigation',
      'Credit-card formatting with live type detection and Luhn checking',
      'Password strength meters scored on real character-set entropy',
      'Multi-step wizards with per-step validation and progress indication',
    ],
    useCases: [
      { icon: 'FORM',  title: 'Sign-up and onboarding', desc: 'The highest-drop-off screens in any product, where every removed keystroke is measurable.' },
      { icon: 'FLOW',  title: 'Checkout and payment', desc: 'Auto-formatting and inline validation prevent the errors that make people abandon a cart.' },
      { icon: 'APP',   title: 'Settings and configuration', desc: 'Toggles, segmented controls and sliders make preferences fast to scan and to change.' },
      { icon: 'LEARN', title: 'Learning CSS-first form technique', desc: 'The floating label is a genuinely zero-JavaScript component — :placeholder-shown and a sibling selector do all of it.' },
    ],
    faqs: [
      { q: 'When should validation fire?', a: 'On blur for the first pass, then live on input once a field has already been marked invalid — so a user sees a correction take effect immediately without being told they are wrong while still typing. Validating on every keystroke from the start is the pattern people find hostile.' },
      { q: 'How do I make error messages accessible?', a: 'Link the message to the field with aria-describedby, set aria-invalid on the input, and put the message text in the DOM rather than conveying the error through a red border alone. Colour-only error states are invisible to a screen reader and ambiguous to anyone with a colour vision deficiency.' },
      { q: 'Should I use the native constraint validation API?', a: 'Use it as the foundation — required, type, pattern and min/max give you real validation with no script, plus browser-level behaviour. Then override the default bubbles with your own messages via setCustomValidity or by reading validity, so the styling is yours and the semantics stay native.' },
    ],
  },
  {
    id: 'loading-states', label: 'Loading States', ogSource: 'loaders',
    tail: 'Skeleton & Loading State Examples',
    blurb: 'Loading UI snippets — skeleton screens, shimmer placeholders, spinners, progress bars, upload indicators and optimistic states.',
    intro: `A loading state is a promise about how long a wait will be. Skeletons imply "nearly there and this is the shape", spinners imply "unknown but short", progress bars imply "measurable" — and choosing the wrong one is why some waits feel longer than they are.\n\nThese snippets cover all three plus the surrounding cases: shimmer placeholders matched to real content, determinate and indeterminate progress, upload indicators with cancel, staged multi-step loaders, and the empty and error states a load can end in.\n\n**Matching the loader's shape to the wait's shape**\n\nA skeleton implies the layout is already known and reserves the exact space the real content will occupy, which is why it suits predictable, structured loads like a list of cards or a profile page. A spinner implies no particular shape or duration and suits short, unpredictable waits — a button submission, a small inline fetch. Using a skeleton for a two-hundred-millisecond load, or a bare spinner for a five-second one, is a mismatch between the signal given and the wait actually experienced.\n\n**The shimmer, and why it costs almost nothing**\n\nA shimmer placeholder is one linear-gradient, wider than the element it sits inside, animated across it by moving background-position — a single composited property. Because the animation is one property on one background layer, a page full of shimmering skeleton blocks costs about the same as a single one, which is what makes it viable to use liberally across a loading layout.\n\n**Delay before showing, minimum duration once shown**\n\nA loader that appears immediately on every request flashes on and off for anything that resolves quickly, which reads as instability rather than responsiveness. Delaying its appearance by roughly 200 to 300 milliseconds absorbs the requests that finish before anyone would notice a loader at all, and once one has appeared, keeping it visible for a minimum duration prevents it from disappearing mid-render in a way that looks like a glitch.\n\n**Progress that is honest about what it knows**\n\nA determinate progress bar promises a real percentage and should only be shown when one is actually available — an upload with byte counts, a multi-step process with known step count. An indeterminate bar or spinner is the honest choice when no such number exists; faking a percentage that does not correspond to real progress erodes trust in every progress bar the product shows afterward.`,
    features: [
      'Skeleton screens shaped like the content they are standing in for',
      'Shimmer placeholders built from a single animated gradient',
      'Determinate progress bars and rings with real percentage feedback',
      'Upload progress with per-file state, cancel and retry',
      'Staged loaders that name the current step during a long operation',
    ],
    useCases: [
      { icon: 'APP',   title: 'Initial page and dashboard loads', desc: 'A skeleton keeps the layout stable, which removes the content jump a spinner leaves behind.' },
      { icon: 'FLOW',  title: 'File uploads and long operations', desc: 'Measurable progress with a cancel path is the difference between waiting and wondering.' },
      { icon: 'FORM',  title: 'Button and inline loading', desc: 'A button that shows its own pending state prevents the double submit it would otherwise get.' },
      { icon: 'DESIGN',title: 'Perceived performance work', desc: 'Optimistic updates and staged messaging change how long a wait feels without changing how long it is.' },
    ],
    faqs: [
      { q: 'Skeleton or spinner?', a: 'Skeleton when you know the shape of what is coming and the wait is more than about half a second — it reserves layout and reads as progress. Spinner for short, unpredictable waits or small inline actions. A skeleton for a two-hundred-millisecond load is just a flash of grey.' },
      { q: 'Should a loader appear immediately?', a: 'No — delay it by roughly 200 to 300 milliseconds. Most requests finish inside that window, and a loader that flashes on and off makes a fast interface feel unstable. Once shown, keep it visible for a minimum duration so it does not blink out mid-render.' },
      { q: 'How do I build the shimmer effect?', a: 'One linear-gradient with a lighter band, sized wider than the element, animated across it by moving background-position. It is a single composited property, so a page full of shimmering placeholders still costs almost nothing.' },
    ],
  },
  {
    id: 'ecommerce', label: 'E-Commerce', ogSource: 'pricing',
    tail: 'E-Commerce Cart & Checkout Examples',
    blurb: 'E-commerce snippets — product cards, carts, checkout steps, pricing tables, variant pickers, reviews and order tracking.',
    intro: `Commerce interfaces are measured directly in conversion, which makes their components unusually well-defined: a product card has to answer price, image, rating and availability at a glance; a cart has to make quantity changes and totals obvious; a checkout has to remove every avoidable decision.\n\nThese snippets cover that path end to end — product grids and quick views, variant and size pickers, cart drawers, coupon fields, checkout steps, pricing tables with billing toggles, reviews, and order tracking after the purchase.\n\n**A product card answers four questions before a click**\n\nPrice, a representative image, a rating signal and current availability are what a shopper scans for before deciding whether to open a product at all, and a card that makes any of them require a click has already lost some fraction of that decision. These snippets keep all four visible in the card itself, with badges and stock states layered on rather than replacing any of the four.\n\n**Show unavailable options, don't hide them**\n\nRemoving a sold-out size from a variant picker entirely makes a shopper think the size was never offered, which reads as a smaller, less capable catalogue than the one that actually exists. Dimming an unavailable option and keeping it selectable enough to explain why — rather than deleting it from the list — preserves that information while still being clear about what can be ordered right now.\n\n**Every step removed from checkout is measurable**\n\nGuest checkout, address autocomplete, auto-formatted card entry, and a running total that includes shipping before the final step are each independently testable changes with their own measurable effect on completion — which is why this collection treats them as separate components rather than one monolithic checkout flow. A visible step indicator throughout matters for the same reason a progress bar matters anywhere else: an unknown number of remaining steps reads as a longer wait than a known one.\n\n**Where these snippets stop, on purpose**\n\nCard inputs here format and structurally validate with a Luhn check locally, and nothing is transmitted — real payment collection has to go through a PCI-compliant provider's hosted fields or elements, and these components are built to sit around that boundary rather than cross it. The same caution applies to anything resembling account or payment storage: the interface patterns are complete, the trust and compliance layer is deliberately left to a real provider.`,
    features: [
      'Product cards and grids with pricing, ratings, badges and stock state',
      'Variant, size and colour pickers with unavailable-option handling',
      'Cart drawers with quantity controls, running totals and coupon entry',
      'Multi-step checkout with address, payment and confirmation stages',
      'Pricing tables with monthly/annual toggles and order-tracking timelines',
    ],
    useCases: [
      { icon: 'STAR',  title: 'Storefronts and catalogues', desc: 'Card, filter and quick-view patterns that shoppers already know how to operate.' },
      { icon: 'FLOW',  title: 'Cart and checkout flows', desc: 'The stretch where friction converts directly into abandonment, so every removed step counts.' },
      { icon: 'APP',   title: 'SaaS pricing pages', desc: 'Tier tables, billing toggles and usage calculators for products sold by subscription.' },
      { icon: 'FORM',  title: 'Post-purchase surfaces', desc: 'Order tracking and returns flows reduce support volume more reliably than any help article.' },
    ],
    faqs: [
      { q: 'Do these handle real payments?', a: 'No — they are interface components only. Card inputs format and validate structure locally with a Luhn check, but never transmit anything. Real payment collection must go through a PCI-compliant provider\'s hosted fields or elements; keep those in place and use these patterns for everything around them.' },
      { q: 'How should unavailable variants behave?', a: 'Show them, mark them unavailable, and keep them selectable enough to explain why — hiding a sold-out size makes shoppers think you never stocked it. The variant pickers here dim and label rather than remove.' },
      { q: 'What makes a checkout convert better?', a: 'Fewer required decisions: guest checkout available, address autocomplete, formatted card entry, visible progress, and a total that includes shipping before the last step. Each of those has its own snippet here because each is independently measurable.' },
    ],
  },
  {
    id: 'landing-page', label: 'Landing Page', ogSource: 'heroes',
    tail: 'Landing Page Section Examples',
    blurb: 'Landing page snippets — hero sections, feature grids, testimonials, CTAs, logo walls, FAQs and footers.',
    intro: `A landing page is a sequence of answers: what this is, who it is for, why it is credible, and what to do next. These snippets are the sections that carry those answers — heroes with clear value propositions, feature grids and bento layouts, social proof from logo walls to testimonial carousels, comparison tables, FAQ accordions, final calls to action and footers.\n\nEach one is self-contained, so a page can be assembled from the sections you need without inheriting a template's opinions about the rest.\n\n**A page is a sequence, and the sequence is the design decision**\n\nWhich answer comes first — what this is, who it serves, why it can be trusted, what to do next — matters more than how any single section is styled, because a visitor who does not get the right answer at the right point leaves before reaching the sections further down. These snippets are built to be reordered freely for exactly that reason: the sequence is the part worth deliberately choosing per page, not inheriting from a template.\n\n**Social proof does specific jobs, not one generic job**\n\nA logo wall answers "have credible companies used this," a testimonial answers "did it actually work for someone like me," and a stat band answers "at what scale." These are different claims aimed at different hesitations, which is why this tag treats them as separate sections rather than one interchangeable "proof" block — a page can use the one that answers its visitor's actual doubt rather than defaulting to whichever is easiest to fill in.\n\n**Fewer sections, not more, past a point**\n\nEvery additional section is scroll depth a shrinking fraction of visitors will reach, so the sections that matter most — a hero that states the offer clearly, one strong credibility signal, the two or three benefits that actually differentiate the product, and a call to action repeated at the end — earn their place before anything optional does. Treating every section here as something to justify including, rather than something to fill space with, is what keeps a page from working against itself.\n\n**Motion and responsiveness without a performance cost**\n\nEvery section is built mobile-first with fluid type and auto-fit grids so it reflows rather than merely shrinking, and any animation sticks to transform and opacity so it never delays the hero's own render. A landing page's first paint is competing directly against a visitor's patience, which is why nothing here defers the hero behind a script or a heavy above-the-fold animation.`,
    features: [
      'Hero sections for SaaS, product, app and portfolio positioning',
      'Feature grids, bento layouts and alternating feature rows',
      'Social proof — logo walls, testimonial carousels and stat bands',
      'FAQ accordions, comparison tables and final CTA sections',
      'Footers ranging from minimal to full sitemap, with newsletter capture',
    ],
    useCases: [
      { icon: 'STAR',   title: 'Product and SaaS marketing sites', desc: 'The standard section set, ready to reorder and rewrite rather than build from nothing.' },
      { icon: 'FLOW',   title: 'Campaign and waitlist pages', desc: 'A hero, a proof band and a capture form is often the entire page a launch needs.' },
      { icon: 'DESIGN', title: 'Agency and portfolio sites', desc: 'Case-study layouts and animated heroes where the site itself is the sample of work.' },
      { icon: 'APP',    title: 'App download pages', desc: 'Store badges, device mockups and feature highlights arranged for a single conversion goal.' },
    ],
    faqs: [
      { q: 'How do I keep a landing page fast with this much motion?', a: 'Animate only transform and opacity, defer below-the-fold work with IntersectionObserver, and let the hero render without waiting on a script. These sections avoid layout-triggering animation for exactly this reason — motion should not cost you the largest contentful paint.' },
      { q: 'Which sections does a landing page actually need?', a: 'A hero that states the offer, one credibility signal, the two or three benefits that matter most, and a call to action repeated at the end. Everything else is optional and should earn its scroll depth — more sections consistently means fewer people reaching the last one.' },
      { q: 'Are these sections responsive?', a: 'Yes — every section is built mobile-first with fluid type and auto-fit grids, so it reflows rather than merely shrinking. Preview at 375px in the editor before you commit to a section; that is where most marketing traffic actually is.' },
    ],
  },
  {
    id: 'mobile-ui', label: 'Mobile UI', ogSource: 'mobile',
    tail: 'Mobile App Screen Examples',
    blurb: 'Mobile app UI snippets — chat, feed, checkout, banking and settings screens in a CSS phone mockup, plus bottom sheets and tab bars.',
    intro: `These snippets recreate native mobile patterns in the browser, framed inside a CSS phone mockup so they are immediately presentable in a portfolio, a pitch deck or a design review. Chat threads, social feeds, onboarding flows, banking dashboards, music players, camera views, checkout screens and settings lists.\n\nThe individual pieces — bottom sheets, tab bars, action sheets, pull-to-refresh, swipeable rows — are also usable on their own in any responsive web app, mockup frame removed.\n\n**The phone frame is one wrapper, not a constraint**\n\nEvery screen renders inside a pure-CSS device frame — a rounded rectangle with a notch or status bar and consistent proportions — that is entirely decorative and lives in a single wrapper element. That separation matters practically: delete the wrapper and the screen underneath is a normal responsive layout, which is why several of the components here, particularly the sheets and tab bars, are written to work identically with or without the frame around them.\n\n**Interaction patterns borrowed deliberately, not copied blindly**\n\nA bottom sheet that can be dragged closed, a tab bar with an active-state indicator, an action sheet that slides up from the bottom edge — these are patterns users already know from native apps, and reproducing their exact feel (the drag resistance, the spring-back, the backdrop dimming) is what makes a web recreation read as familiar rather than approximate. Getting the small physics details right is most of the work; the visual chrome is comparatively easy.\n\n**Safe areas are not optional on a real device**\n\nA layout that ignores env(safe-area-inset-bottom) will put an interactive control directly under an iPhone's home indicator or a notch's rounded corner the moment it runs as an actual installed or full-screen web app rather than inside a demo frame. These snippets reserve that space explicitly, which only becomes visible as a real requirement once a screen leaves the mockup and runs on hardware.\n\n**Touch targets sized for fingers, not cursors**\n\nEvery tappable control here is at least 44 by 44 CSS pixels with spacing from its neighbours, even when the visible icon inside it is smaller — the hit area extends beyond what is drawn. That gap between visible size and tappable size is deliberate: an icon can look small and refined while still being comfortably tappable, but only if the two are sized independently.`,
    features: [
      'Complete app screens rendered inside a pure-CSS phone frame',
      'Bottom sheets, action sheets and modal drawers with drag-to-dismiss',
      'Tab bars, segmented controls and mobile navigation patterns',
      'Swipeable list rows, pull-to-refresh and infinite feeds',
      'Safe-area-aware spacing and touch targets sized for real fingers',
    ],
    useCases: [
      { icon: 'APP',    title: 'App concepts and pitch decks', desc: 'A working screen in a phone frame communicates more in one screenshot than a static mockup.' },
      { icon: 'DESIGN', title: 'Portfolio case studies', desc: 'Interactive screens let a reviewer feel the flow instead of imagining it from images.' },
      { icon: 'FLOW',   title: 'Mobile web applications', desc: 'The sheets, tab bars and gestures work perfectly well outside the mockup in a responsive app.' },
      { icon: 'LEARN',  title: 'Studying native patterns in CSS', desc: 'Seeing how a bottom sheet or a tab bar is built from scratch is useful for any platform.' },
    ],
    faqs: [
      { q: 'Can I use these outside the phone mockup?', a: 'Yes. The frame is one wrapper element with its own styles — delete it and the screen becomes a normal responsive layout. Several components, particularly the sheets and tab bars, are written to be used that way from the start.' },
      { q: 'Do they handle notches and safe areas?', a: 'The layouts leave room for status and home indicators, and use env(safe-area-inset-*) where it matters, so a screen used as a real web app does not put a control under the home bar on an iPhone.' },
      { q: 'How big should touch targets be?', a: 'At least 44 by 44 CSS pixels, with spacing between adjacent targets. The components here follow that, which is why the tap areas often extend beyond the visible icon — an icon can be small as long as its hit area is not.' },
    ],
  },
  {
    id: 'social-ui', label: 'Social UI', ogSource: 'cards',
    tail: 'Social Feed & Chat UI Examples',
    blurb: 'Social interface snippets — feeds, comment threads, chat bubbles, reactions, profile cards, avatar stacks and notification centres.',
    intro: `Social interfaces are built from a small set of heavily reused components: the post, the thread, the reaction, the presence indicator, the notification. Getting them right matters more than usual because users encounter them hundreds of times a session.\n\nThese snippets cover feeds and post cards, nested comment threads, chat bubbles with delivery and typing states, reaction pickers, profile and follow cards, avatar stacks with overflow counts, story rails and notification centres with unread handling.\n\n**Repetition raises the bar on small components**\n\nA feed post or a chat bubble is seen hundreds of times in a single session, which means a slightly awkward hover state or a half-second delay that would go unnoticed on a settings page becomes genuinely irritating at that frequency. These snippets are held to that higher bar deliberately — the interaction cost of the smallest component multiplied by hundreds of repetitions per session outweighs almost anything a rarely-visited screen does.\n\n**Optimistic updates, because the alternative feels broken**\n\nA like or a vote that waits for a server round trip before changing state reads as unresponsive at the frequency these actions actually happen. Applying the change immediately and reconciling with the server afterward — reverting only on the rare failure — is the standard this tag's reaction and vote components follow, because the failure rate is low enough that an occasional revert is a far better trade than universal latency on every interaction.\n\n**Nesting has a practical depth limit**\n\nComment threads that indent every reply level visually run out of horizontal space within two or three levels on a phone, which is where most reading actually happens. Flattening deeper replies with an inline "replying to" reference instead of further indentation is what keeps a long, active thread readable at any depth rather than collapsing into a sliver of text down the right edge of the screen.\n\n**Presence and notifications need more than a coloured dot**\n\nA red badge or a green presence dot communicates nothing to a screen reader on its own — the unread count needs to be part of the trigger's accessible name, and new items need to be announced through a polite aria-live region as they arrive. These snippets treat that announcement as part of the component, not a separate accessibility pass layered on after the visual design was finished.`,
    features: [
      'Feed and post cards with author, media, actions and engagement counts',
      'Nested comment threads with collapse, reply and moderation affordances',
      'Chat bubbles with timestamps, read receipts and typing indicators',
      'Reaction pickers, like bursts and vote controls with optimistic updates',
      'Avatar stacks, presence dots, story rails and notification centres',
    ],
    useCases: [
      { icon: 'APP',   title: 'Community and social products', desc: 'The feed and thread are the entire product surface for most community software.' },
      { icon: 'FLOW',  title: 'In-app messaging and support chat', desc: 'Bubbles, typing indicators and read state are what make a chat feel connected rather than queued.' },
      { icon: 'STAR',  title: 'Engagement features in any product', desc: 'Comments, reactions and mentions bolt onto documents, courses and dashboards alike.' },
      { icon: 'FORM',  title: 'Profile and team surfaces', desc: 'Profile cards, avatar stacks and presence indicators for anything with multiple people in it.' },
    ],
    faqs: [
      { q: 'Should reactions update optimistically?', a: 'Yes — apply the change immediately and reconcile with the server response, reverting on failure. A like that waits for a round trip feels broken, and the failure rate is low enough that the occasional revert is a far better trade than universal latency.' },
      { q: 'How deep should comment nesting go?', a: 'Two or three visual levels, then flatten with an inline reference to who is being replied to. Deeper indentation runs out of horizontal space on a phone, which is where most of the reading happens.' },
      { q: 'How do I make a notification centre accessible?', a: 'Announce new items through a polite aria-live region, expose the unread count in the trigger\'s accessible name, and let the list be navigated and dismissed by keyboard. A red dot alone communicates nothing to a screen reader.' },
    ],
  },
  {
    id: 'media-player', label: 'Media Player', ogSource: 'cards',
    tail: 'Video & Audio Player Examples',
    blurb: 'Media snippets — video and audio players, playlists, carousels, lightboxes, galleries and image comparison sliders.',
    intro: `Media components are judged on their controls. A player needs a scrub bar that is easy to hit, state that is obvious at a glance, and keyboard support; a gallery needs to open, navigate and close without ever trapping the user.\n\nThese snippets cover custom video and audio players, playlists and podcast interfaces, image carousels and coverflow galleries, lightboxes with keyboard navigation, before/after comparison sliders, and thumbnail strips.\n\n**Native controls first, custom ones deliberately**\n\nThe browser's built-in media controls are accessible, familiar and free — keyboard support, captions, casting and screen-reader labelling all come included. These snippets reach for a custom player only when the product genuinely needs consistent cross-browser styling, chapter markers, or controls integrated into a surrounding interface, and even then keep the underlying <video> or <audio> element as the actual playback engine, driving it through its own API rather than reimplementing buffering and seeking from scratch.\n\n**A scrub bar is a precision target, treated as one**\n\nThe hit area for dragging a video's progress bar needs to be noticeably larger than its visible track, because a thin visual line is genuinely hard to grab precisely, especially on touch. These snippets extend the interactive area beyond what is drawn and show a hover preview of the seek position, which is what makes scrubbing feel controllable rather than approximate.\n\n**Galleries that never trap the visitor**\n\nA lightbox needs arrow-key and swipe navigation between images, a visible and reachable close control, and Escape as a guaranteed way out regardless of what else is happening on the page — and focus needs to move into the lightbox on open and back to the trigger on close, the same discipline any other modal overlay follows. Autoplaying carousels without a visible, always-available pause control are one of the most consistently complained-about patterns on the web, which is why every carousel here ships pause-on-hover and a manual control by default.\n\n**Performance choices specific to media**\n\npreload="metadata" instead of auto, a poster image shown before the first frame decodes, and lazy-loading a player entirely until it nears the viewport are what keep a media-heavy page from front-loading megabytes nobody has asked to watch yet. For a muted background-video hero specifically, a short, well-compressed loop costs a fraction of a full-quality file left to preload itself in the background.`,
    features: [
      'Custom video and audio players with scrubbing, volume and buffering display',
      'Playlists and podcast interfaces with track state and progress',
      'Carousels and galleries with keyboard, touch and autoplay control',
      'Lightboxes with focus management and Escape to close',
      'Before/after comparison sliders and thumbnail navigation strips',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Portfolios and case studies', desc: 'Comparison sliders and lightboxes are how visual work is best presented on the web.' },
      { icon: 'APP',    title: 'Course and content platforms', desc: 'A custom player styled to the product beats an embed that carries someone else\'s branding.' },
      { icon: 'STAR',   title: 'Product galleries', desc: 'Thumbnail strips, zoom and quick view are the standard commerce media set.' },
      { icon: 'FLOW',   title: 'Podcast and audio pages', desc: 'Waveforms, chapter markers and playback speed make an audio page usable rather than merely playable.' },
    ],
    faqs: [
      { q: 'Should I build a custom player or use the native one?', a: 'Native controls are accessible, familiar and free — use them unless you need consistent styling across browsers, custom chapters, or controls integrated with your interface. If you do build custom, keep the underlying media element and drive it through its API rather than reimplementing playback.' },
      { q: 'How do I make a carousel accessible?', a: 'Real buttons for previous and next, arrow-key support, a live region announcing the current slide, and no autoplay without a visible pause control. Autoplaying carousels are among the most complained-about patterns on the web for good reason.' },
      { q: 'How do I keep video from hurting page performance?', a: 'Use preload="metadata" rather than auto, provide a poster image, and load the player lazily below the fold. For a hero background, a muted short loop encoded well is far cheaper than a full-quality file left to preload itself.' },
    ],
  },
  {
    id: 'games', label: 'Games', ogSource: 'games',
    tail: 'Playable Browser Game Examples',
    blurb: 'Browser game snippets — Snake, Pong, 2048, Minesweeper, memory and word games, plus coding games that teach CSS and regex.',
    intro: `Every game here is a complete, playable implementation in plain HTML, CSS and JavaScript: a game loop, input handling, collision or rule logic, scoring and a restart path, with no engine and no assets. Small enough to read in a sitting, complete enough to actually play.\n\nAlongside the arcade classics are teaching games — selector challenges, regex matching, flexbox alignment, binary puzzles — which use the same loop to drill a skill rather than to entertain.\n\n**Input, update, render — the pattern behind every one**\n\nEvery game here separates reading input, advancing game state, and drawing the result into distinct steps run once per frame, rather than mixing them together in whatever order felt convenient. That separation is what makes a two-hundred-line Snake implementation readable in one sitting, and it is the single most reusable idea in the whole tag — the same three-step loop is what any new game, however different its rules, ends up built from.\n\n**A fixed timestep for logic that has to be fair**\n\nGames with collision or physics — Pong's ball, Breakout's paddle — update their simulation on a fixed timestep rather than however much wall-clock time happened to pass since the last frame, so gameplay speed stays consistent regardless of a device's actual frame rate. Coupling simulation speed to frame rate is what makes a game run faster on a powerful machine and slower on a weak one, which is unfair in exactly the way a game should never be.\n\n**Teaching games use the loop for repetition, not spectacle**\n\nA CSS selector challenge or a regex-matching game runs the identical loop structure as an arcade game — present a challenge, accept input, score it, advance — but the "game" is a skill drill wearing a game's feedback and progression mechanics. That framing is deliberate: immediate, scored feedback is what makes a fact stick, and it works as well for a CSS selector as it does for dodging an obstacle.\n\n**Self-contained by necessity**\n\nNo game here depends on an engine or an external asset, because every asset is a thing that can fail to load and every engine is a dependency someone has to trust before reading the code underneath it. State persists to localStorage where a high score matters, but nothing is transmitted anywhere — the entire game, rules included, is the file you copy.`,
    features: [
      'Classic arcade logic — Snake, Pong, Breakout, 2048, Minesweeper, Tetris-style stacking',
      'Puzzle and word games with real rule validation and scoring',
      'Coding games that teach CSS selectors, flexbox, regex and binary',
      'Game loops with fixed timestep, keyboard and touch input, and pause/restart',
      'Score persistence and difficulty progression, all client-side',
    ],
    useCases: [
      { icon: 'STAR',  title: 'Portfolio pieces', desc: 'A playable game says more about your JavaScript than another to-do list ever will.' },
      { icon: 'LEARN', title: 'Learning game loops and state', desc: 'Input, update, render is a pattern worth internalising, and these are the smallest complete examples of it.' },
      { icon: 'APP',   title: 'Engagement and 404 pages', desc: 'A small playable game turns a dead end or a waiting screen into something people remember.' },
      { icon: 'FLOW',  title: 'Teaching front-end concepts', desc: 'The coding games make selectors and regex stick because the feedback is immediate and scored.' },
    ],
    faqs: [
      { q: 'Do these games work on touch devices?', a: 'The ones designed for it, yes — they include tap or swipe controls alongside the keyboard. Keyboard-only games are marked as such; adding touch usually means mapping a swipe handler to the same direction function the arrow keys already call.' },
      { q: 'Do they save high scores?', a: 'Several store the best score in localStorage, so it survives a refresh on the same device. Nothing is sent anywhere, and there is no leaderboard backend to stand up.' },
      { q: 'Can I use these as a base for my own game?', a: 'That is the intent. The loop, input handling and state machine are the reusable parts — swap the rules and the rendering and the skeleton still holds. Everything is free to modify and ship, commercially included.' },
    ],
  },
  {
    id: 'authentication', label: 'Authentication', ogSource: 'forms',
    tail: 'Login & Auth UI Examples',
    blurb: 'Auth UI snippets — login and signup forms, OTP verification, password reset, social login, 2FA and account switchers.',
    intro: `Authentication screens are the first thing a user meets and the last thing anyone wants to spend a week designing. These snippets cover the whole set — login and signup, social provider buttons, OTP and 2FA verification, password reset and strength feedback, session and device lists, permission matrices and account switchers.\n\nThey are interface only. No credentials are transmitted or stored: the validation runs locally so you can wire the forms to whatever identity provider you already use.\n\n**The first screen sets the tone for everything after it**\n\nA sign-up or login form is usually the very first interaction a new user has with a product, before they have any goodwill built up — friction here costs disproportionately more than the same friction three screens deeper into an onboarded experience. These snippets keep validation inline and specific and error states unambiguous for exactly that reason: this is the worst possible place for an unclear or unhelpful error message.\n\n**An OTP input has three details that decide whether it works**\n\nAuto-advance to the next box as each digit is typed, backspace that moves focus back a box when the current one is empty, and — most importantly — paste that fills every box from a single clipboard read, because copying an entire code out of a text message or email is what people actually do rather than typing six digits by hand. Setting inputmode="numeric" and autocomplete="one-time-code" on top of that is what lets mobile keyboards switch to a numeric pad and lets iOS and Android autofill the code directly from a received message.\n\n**Password guidance shown before, not just after**\n\nDisplaying requirements up front and updating them live as each one is satisfied, rather than only revealing them in a rejection message after submission, turns password creation into a small guided task instead of a guessing game. Entropy-based strength meters reward length specifically, which is the property that most reliably makes a password resistant to guessing — more so than any fixed rule requiring a specific character class.\n\n**Interface only, and that boundary is deliberate**\n\nEvery validation check in this tag runs client-side and nothing is transmitted or persisted — these are the visual and interaction layer meant to sit in front of whatever real identity provider or backend handles actual authentication. Treating a client-side check as a security boundary in its own right is the mistake this tag is built to help avoid, not enable.`,
    features: [
      'Login and signup forms with inline validation and clear error states',
      'Social login buttons following each provider\'s brand requirements',
      'OTP and 2FA inputs with auto-advance, paste support and resend timers',
      'Password reset flows with entropy-based strength feedback',
      'Session, device and permission management screens',
    ],
    useCases: [
      { icon: 'FORM',  title: 'Product sign-in and sign-up', desc: 'The screens every product needs and nobody wants to design from scratch twice.' },
      { icon: 'FLOW',  title: 'Verification and recovery', desc: 'OTP entry and reset flows where a small interaction detail changes the completion rate noticeably.' },
      { icon: 'APP',   title: 'Account and security settings', desc: 'Device lists, active sessions and permission matrices for anything handling real accounts.' },
      { icon: 'STAR',  title: 'Multi-tenant products', desc: 'Account and workspace switchers for users who belong to more than one organisation.' },
    ],
    faqs: [
      { q: 'Do these snippets handle real authentication?', a: 'No — they are the interface layer. Validation is client-side only and nothing is transmitted. Connect the forms to your identity provider or backend, and never treat any client-side check as a security boundary.' },
      { q: 'What makes a good OTP input?', a: 'Auto-advance between boxes, backspace that moves back, and paste that fills every box from one clipboard read — that last one matters most, because copying the whole code from a message is what people actually do. Also set inputmode="numeric" and autocomplete="one-time-code" so mobile keyboards and iOS autofill cooperate.' },
      { q: 'Should password rules be shown up front?', a: 'Yes. Show the requirements before typing and update them live as they are met, rather than rejecting after submit. Entropy-based meters like the ones here also reward length, which is the property that actually makes a password strong.' },
    ],
  },
  {
    id: 'onboarding', label: 'Onboarding', ogSource: 'modals',
    tail: 'Product Tour & Onboarding Examples',
    blurb: 'Onboarding snippets — product tours, multi-step wizards, checklists, tooltips, empty states and welcome flows.',
    intro: `Onboarding is the narrow window where a new user decides whether a product is worth learning. These snippets cover the patterns that work in that window: setup checklists that show progress, guided tours anchored to real elements, multi-step wizards that break configuration into digestible steps, contextual tooltips, and empty states that suggest a first action instead of apologising for having no data.\n\nEach one keeps its dismissal state, because the fastest way to lose a returning user is to make them close the same tour twice.\n\n**Checklists over tours, most of the time**\n\nA checklist is self-paced, resumable across sessions, and shows visible progress toward a known end — a new user can leave and come back without losing their place. A modal tour interrupts before the user has any context for what is being shown, forcing them to remember instructions for a feature they have not touched yet. These snippets default to the checklist pattern and reserve a guided tour specifically for a genuinely non-obvious interaction that a checklist item alone could not explain, keeping any tour that does exist to only a few steps.\n\n**Persisting dismissal, specifically, not generally**\n\nStoring a single "has seen onboarding" flag conflates every distinct tip, tour and checklist into one switch, which means completing one silently dismisses all the others. These snippets persist dismissal per item — in localStorage for anonymous visitors, in the account record once signed in — so a user who deliberately closed one specific tooltip is not shown that one again, while unrelated tips remain available.\n\n**Positioning a tour without fighting the layout**\n\nAnchoring a tooltip or coach mark to a real element means measuring it with getBoundingClientRect, choosing a side that fits the viewport, and flipping to the opposite side when the preferred one would overflow — then repeating that calculation on scroll and resize, since the anchor's position is not fixed. The native Popover API and CSS anchor positioning now handle a meaningful part of this natively, which is why several snippets here build on those platform features instead of a fully custom positioning script.\n\n**An empty state is an opportunity, not an apology**\n\nA list with nothing in it can either say "no items yet" or suggest the specific first action that would populate it — the second framing is what turns a moment of nothing to see into progress toward using the feature. Every empty state in this tag defaults to a concrete next step rather than a passive statement of absence.`,
    features: [
      'Setup checklists with persisted completion and progress indication',
      'Product tours with element spotlighting and step-by-step positioning',
      'Multi-step wizards with per-step validation and a visible progress bar',
      'Contextual tooltips, coach marks and feature-announcement popovers',
      'Empty states that propose a concrete first action',
    ],
    useCases: [
      { icon: 'FLOW',  title: 'First-run experiences', desc: 'A checklist converts an intimidating empty product into a short, finishable list.' },
      { icon: 'APP',   title: 'Feature announcements', desc: 'A tooltip anchored to the new control beats a changelog nobody opens.' },
      { icon: 'FORM',  title: 'Configuration wizards', desc: 'Long setup split into validated steps, so an error never costs the whole form.' },
      { icon: 'STAR',  title: 'Empty states throughout the product', desc: 'Every empty list is an opportunity to teach what should go in it.' },
    ],
    faqs: [
      { q: 'Tour or checklist?', a: 'Checklists generally win. They are self-paced, resumable, and show progress, whereas a modal tour interrupts before the user has any context for what they are being shown. Use a tour only for a genuinely non-obvious interaction, and keep it to a few steps.' },
      { q: 'How do I stop onboarding reappearing?', a: 'Persist completion and dismissal — localStorage for anonymous users, the account record for signed-in ones. Store the dismissal specifically rather than a general "seen" flag, so a user who deliberately closed something is not shown it again on their next device.' },
      { q: 'How should a tour position itself?', a: 'Measure the target with getBoundingClientRect and place the popover with flipping when it would overflow the viewport, repositioning on scroll and resize. The native Popover API and CSS anchor positioning now handle much of this, and several snippets here use them.' },
    ],
  },
  {
    id: 'timers', label: 'Timers & Clocks', ogSource: 'dashboards',
    tail: 'Countdown Timer & Clock Examples',
    blurb: 'Time UI snippets — countdown timers, clocks, stopwatches, date pickers, schedule views and calendar grids.',
    intro: `Anything that displays time has the same two problems: drift, because \`setInterval\` is not a clock, and timezones, because a date without one is a guess. These snippets handle both — timing derived from timestamps rather than accumulated ticks, and formatting through \`Intl\` rather than manual string building.\n\nThe tag covers countdowns for launches and sales, analog and digital clocks, stopwatches and Pomodoro timers, date and range pickers, schedule and agenda views, and calendar grids.\n\n**Timestamps as the source of truth, ticks as the trigger only**\n\nsetInterval is not guaranteed to fire on schedule, and a throttled background tab makes the drift far worse — accumulating "one second" per tick compounds that error over any meaningfully long countdown. Every timer here instead recomputes the remaining or elapsed time on every tick from the difference between a fixed target timestamp and Date.now(), using the interval only to trigger a re-render, so a tab that was asleep for ten minutes shows the correct number the instant it wakes rather than needing to catch up.\n\n**Formatting time is a solved problem — Intl solves it**\n\nManually building a date string with string concatenation gets locale formats, daylight saving transitions, and month-name pluralisation wrong in ways that only surface on specific dates or for specific users. Intl.DateTimeFormat and Intl.RelativeTimeFormat, given an explicit timeZone and locale, handle all of that correctly by construction, which is why every date-displaying snippet in this tag routes through them instead of hand-rolled formatting.\n\n**Storing instants, displaying local time**\n\nThe reliable pattern for anything scheduled — a countdown target, an event time — is storing the instant in UTC and only converting to a viewer's local time zone at the point of display via Intl. Storing a "local" time without its zone attached is a value that means something different depending on who reads it, which is the exact ambiguity that causes an event to display an hour off for someone in a different time zone.\n\n**Native inputs first, custom pickers only when needed**\n\nThe native <input type="date"> and its relatives bring a mobile-native picker UI, keyboard support, and locale-correct formatting with zero additional code, and are worth using wherever their appearance is acceptable. A custom date or range picker is the right call only once a real requirement — selecting a range, showing availability, matching a specific visual design the native control cannot express — justifies rebuilding the keyboard behaviour the native input would otherwise provide for free.`,
    features: [
      'Countdown timers computed from a target timestamp, so they never drift',
      'Analog and digital clocks with multi-timezone support',
      'Stopwatches, lap timers and Pomodoro cycles with pause and reset',
      'Date, time and range pickers with keyboard navigation',
      'Calendar grids, agenda lists and schedule timelines',
    ],
    useCases: [
      { icon: 'STAR',  title: 'Launch and sale countdowns', desc: 'Urgency that stays accurate on a page left open for an hour, which naive interval-based timers do not.' },
      { icon: 'APP',   title: 'Booking and scheduling', desc: 'Date pickers and availability grids for anything that reserves a slot.' },
      { icon: 'FLOW',  title: 'Productivity tooling', desc: 'Pomodoro timers, stopwatches and duration tracking with visible state.' },
      { icon: 'FORM',  title: 'Deadline and expiry indicators', desc: 'Relative time labels and expiry badges that make a due date scannable.' },
    ],
    faqs: [
      { q: 'Why does my countdown drift?', a: 'Because setInterval is not guaranteed to fire on schedule — throttled background tabs make it much worse. Compute the remaining time on every tick from the difference between the target timestamp and Date.now(), and use the interval only to trigger a re-render. Then a tab that slept for ten minutes shows the right number immediately on return.' },
      { q: 'How do I handle timezones?', a: 'Store instants in UTC and format for display with Intl.DateTimeFormat, passing the timeZone you want. Do not build date strings by hand: the Intl APIs handle offsets, daylight saving and locale formats that manual arithmetic gets wrong every spring.' },
      { q: 'Should I use the native date input?', a: 'Yes, where its look is acceptable — it brings mobile date pickers, keyboard support and locale formatting for free. Build a custom picker only when you need ranges, availability, or styling the native control cannot provide, and keep the keyboard behaviour the native one would have given you.' },
    ],
  },
];

export const TAG_BY_ID = new Map(TAGS.map(t => [t.id, t]));

/** All tag ids for a snippet id, in the generated (most specific first) order. */
export function tagsForSnippetId(id) {
  return (SNIPPET_TAG_MAP[id] || []).filter(t => TAG_BY_ID.has(t));
}

/** Tag records (not just ids) for a snippet, ready to render as chips. */
export function tagsForSnippet(sn) {
  return tagsForSnippetId(sn?.id).map(t => TAG_BY_ID.get(t));
}

/** Every snippet in `list` carrying `tagId`, preserving the list's own order. */
export function snippetsForTag(list, tagId) {
  return list.filter(sn => tagsForSnippetId(sn.id).includes(tagId));
}

/** Counts per tag across a snippet list — used for {n} tokens and the tag index. */
export function tagCounts(list) {
  const counts = new Map(TAGS.map(t => [t.id, 0]));
  for (const sn of list) {
    for (const t of tagsForSnippetId(sn.id)) counts.set(t, counts.get(t) + 1);
  }
  return counts;
}

/** Tags with enough snippets to deserve an indexed page, largest first. */
export function publishedTags(list) {
  const counts = tagCounts(list);
  return TAGS
    .filter(t => counts.get(t.id) >= MIN_TAG_SNIPPETS)
    .map(t => ({ ...t, count: counts.get(t.id) }))
    .sort((a, b) => b.count - a.count);
}

/** The 1200×630 OG image for a tag. */
export function tagOgImage(tag, alt) {
  return { url: `${TAG_OG_DIR}/${tag.id}.png`, width: OG_WIDTH, height: OG_HEIGHT, alt };
}

/**
 * `<title>` and meta description for a tag page.
 *
 * The description is built to land inside the ~160 characters Google actually
 * renders: the count and label first, then the specific highlights lifted from the
 * tag's blurb, trimmed at a word boundary rather than mid-word.
 */
export function tagMeta(tag, count) {
  const title = `${tag.label} Snippets HTML CSS JS — ${count} Free ${tag.tail} | UI Snippets`;

  const head = `${count} free copy-paste ${tag.label} snippets — `;
  const tail = '. Live preview, export to React, Vue, Angular & Tailwind.';
  // The clause after the blurb's em dash is the specific part; the words before it
  // only repeat the label we have already used.
  const detail = (tag.blurb.split('—')[1] || tag.blurb).replace(/\.$/, '').trim();
  const room = 160 - head.length - tail.length;
  // Prefer cutting at the last comma so the description ends on a complete item
  // rather than mid-phrase; fall back to a word boundary, minus any connector.
  const comma = detail.lastIndexOf(',', room);
  const space = detail.lastIndexOf(' ', room);
  const highlights = detail.length <= room
    ? detail
    : comma > room * 0.5
      ? detail.slice(0, comma)
      : detail.slice(0, space).replace(/[,;]$/, '').replace(/\s+(and|or|with|for|the|a|an|plus|to|in|of)$/i, '');

  return { title, description: head + highlights + tail };
}

// Appended to every tag page's FAQs — the same three questions people ask about
// any snippet here, answered once rather than rewritten forty times.
const SHARED_FAQS = [
  { q: 'Do these snippets need React, Vue or an npm install?', a: 'No. Every snippet is plain HTML, CSS and vanilla JavaScript that runs in any page — a static file, a WordPress theme, a Rails view, anything. When you do want a framework version, the editor exports each snippet as a React component, a React + Tailwind component, a standalone Tailwind HTML file, a Vue 3 single-file component or an Angular standalone component.' },
  { q: 'Are these snippets free to use commercially?', a: 'Yes — copy, modify and ship them in personal or commercial work, with no attribution required and no licence to track.' },
  { q: 'Can I edit a snippet before copying it?', a: 'Yes. Every snippet opens in a live editor with separate HTML, CSS and JS panels and a preview that updates as you type. Check it at mobile, tablet and desktop widths, then copy the code or export it in your framework of choice.' },
];

/**
 * Builds the SeoSection content for a tag page.
 * `{n}` tokens are already resolved against the live count.
 */
export function tagSeoContent(tag, count) {
  return {
    slug: `ui-snippets/tag/${tag.id}`,
    title: `${tag.label} Snippets — Free HTML CSS JS ${tag.tail}`,
    subtitle: `${count} snippets tagged ${tag.label} · Live preview · Exports to React, Vue, Angular & Tailwind`,
    about: {
      title: `${tag.label} Snippets — ${count} Free ${tag.tail}`,
      description: tag.intro,
    },
    features: tag.features,
    useCases: tag.useCases,
    faqs: [...tag.faqs, ...SHARED_FAQS],
  };
}
