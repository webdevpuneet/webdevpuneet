import MeshGradientGeneratorTool from '@/components/MeshGradientGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Mesh Gradient Generator — Free SVG & CSS Mesh Background Tool | webdevpuneet.com',
  description: 'Free mesh gradient generator — drag colored blobs to create backgrounds like Stripe and Linear. Export SVG, PNG, or pure CSS. 6 presets, blur controls, free.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/mesh-gradient-generator/' },
  icons: { icon: '/icons/mesh-gradient-generator.svg', shortcut: '/icons/mesh-gradient-generator.svg' },
  openGraph: { type: 'website', url: 'https://webdevpuneet.com/mesh-gradient-generator/', siteName: 'webdevpuneet.com', title: 'Mesh Gradient Generator — Free SVG & CSS Mesh Backgrounds', description: 'Drag blobs to create stunning mesh gradient backgrounds. Export as SVG, PNG, or CSS. 6 presets, blur & spread controls. Free.', images: [{ url: 'https://webdevpuneet.com/images/mesh-gradient-generator.png', width: 1200, height: 630, alt: 'Mesh Gradient Generator' }], locale: 'en_US' },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: 'Mesh Gradient Generator — SVG & CSS Mesh Backgrounds', description: 'Create mesh gradient backgrounds by dragging blobs. Export SVG, PNG, or CSS. 6 presets. Free.', images: ['https://webdevpuneet.com/images/mesh-gradient-generator.png'] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a mesh gradient?',
      acceptedAnswer: { '@type': 'Answer', text: 'A mesh gradient is a type of background effect that blends multiple soft, overlapping color blobs to create a smooth, organic, multi-directional color transition — unlike a standard linear or radial gradient which has a fixed direction or a single center point. The effect produces a richly layered, almost three-dimensional color field that resembles the color mixing in watercolor painting or the soft blurring of bokeh lights. Mesh gradients became widely used in modern UI design after Apple popularized the style in macOS and iOS interfaces, and after Stripe adopted a highly sophisticated animated mesh gradient on their homepage. The technique is also called a "blob gradient," "soft gradient," or "fluid gradient" and is particularly popular as a hero background, card background, or decorative section backdrop in web design.' }
    },
    {
      '@type': 'Question',
      name: 'How does this mesh gradient generator work?',
      acceptedAnswer: { '@type': 'Answer', text: 'This tool creates mesh gradients using SVG technology. Each colored blob in your design is an SVG circle element with a Gaussian blur filter applied via the SVG feGaussianBlur primitive. When multiple large, heavily blurred circles overlap on a colored background, their colors blend smoothly at the edges to create the characteristic mesh gradient appearance. You drag the handles on the preview canvas to reposition each blob, pick individual colors with the color pickers, and adjust global settings like blur intensity (how soft/spread the edges are), spread (how large each blob is relative to the canvas), and opacity. The generated SVG file packages all these elements into a single portable vector file that renders at any size without loss of quality.' }
    },
    {
      '@type': 'Question',
      name: 'What is the difference between the SVG and CSS export?',
      acceptedAnswer: { '@type': 'Answer', text: 'The SVG export produces a complete SVG file containing a background rectangle and multiple blurred circle elements — this is the highest-quality output, is infinitely scalable, and can be embedded directly in HTML with an <img> tag, used as a CSS background-image, or referenced in a <use> element. The SVG feGaussianBlur filter produces smooth, accurate color blending that closely matches the preview. The CSS export produces a pure CSS background using multiple radial-gradient() calls — one per blob — layered via background-image. This requires no SVG file and can be pasted directly into any stylesheet, making it ideal for dynamic theming and CSS-only projects. The CSS version is a good approximation but lacks the Gaussian blur smoothness of the SVG approach, so edges between blobs are sharper. For the best visual quality, use SVG; for pure CSS without external files, use the CSS export.' }
    },
    {
      '@type': 'Question',
      name: 'How do I use the SVG mesh gradient in my project?',
      acceptedAnswer: { '@type': 'Answer', text: 'There are several ways to use the exported SVG. The simplest method is as a CSS background: background-image: url("mesh-gradient.svg"); background-size: cover;. You can also embed it inline in your HTML by pasting the SVG code directly inside a <div> — this avoids an extra HTTP request and allows CSS animation or JavaScript manipulation. In React or Next.js, import the SVG as a component or use it as a src attribute on an <img> tag. For Tailwind projects, add the SVG as a background utility: bg-[url("/images/mesh-gradient.svg")] bg-cover. The SVG is infinitely scalable so it looks sharp on any display density including Retina and 4K screens.' }
    },
    {
      '@type': 'Question',
      name: 'When should I use PNG instead of SVG?',
      acceptedAnswer: { '@type': 'Answer', text: 'Use PNG when SVG is not supported or not practical. Email newsletters do not render SVG reliably across email clients, so PNG is the right choice for email backgrounds. Some older content management systems and social media platforms require raster images rather than SVG. PNG is also useful when you need to compose the gradient with other raster images in a photo editing tool like Photoshop or Figma. The tool exports PNG at 1600×1000px (2× the canvas size) for retina-ready quality — this resolution is large enough for full-bleed website backgrounds on most screens. For web use where scalability matters, SVG is always preferred over PNG.' }
    },
    {
      '@type': 'Question',
      name: 'How many blobs should I use for a mesh gradient?',
      acceptedAnswer: { '@type': 'Answer', text: 'Three to five blobs produces the best mesh gradient results for most use cases. With fewer than three blobs, the gradient can look too simple and directional — similar to a radial gradient rather than a true mesh. With four or five blobs spread around the canvas, the overlapping colors create complex, interesting blends from multiple directions. Adding more than five or six blobs typically produces diminishing returns — the colors start to mix too uniformly and the gradient loses its color distinction. The tool supports up to eight blobs for maximum flexibility. For a simple, elegant background, four blobs at the four quadrants of the canvas with a dark background is a reliable starting configuration.' }
    },
    {
      '@type': 'Question',
      name: 'What do the blur and spread controls do?',
      acceptedAnswer: { '@type': 'Answer', text: 'Blur controls the SVG feGaussianBlur stdDeviation value — it determines how softly each blob\'s edges diffuse into the background and into neighboring blobs. Low blur values (10–30px) create visible, relatively hard-edged blobs; medium values (60–100px) produce the classic smooth mesh effect; high values (120–150px) create an ultra-soft, almost uniform color wash with barely visible blob boundaries. Spread controls the radius of each blob as a percentage of the canvas size. A spread of 50% means each blob\'s circle radius is 50% of the longest canvas dimension — at 800×500px that is 200px radius. Higher spread values cause blobs to cover more of the canvas and overlap more aggressively, producing richer color mixing. Lower spread with high blur creates airy, barely-there color clouds; high spread with medium blur creates the most dramatic mesh effect.' }
    },
    {
      '@type': 'Question',
      name: 'Can I animate a mesh gradient?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes — the exported SVG can be animated using CSS animations or SMIL SVG animation attributes. The simplest approach is to animate the cx and cy attributes of each circle element using SMIL <animate> tags inside the SVG, or to target the circles with CSS keyframe animations that translate the circle positions. For a JavaScript-powered animation like Stripe\'s, you can load the SVG inline and use JavaScript to smoothly update each circle\'s cx/cy values over time using requestAnimationFrame. Adding transition: cx 2s ease, cy 2s ease via CSS (cx and cy are animatable CSS properties in modern browsers) allows smooth blob movement when positions change. Start by exporting the SVG from this tool and then add animation on top of the generated markup.' }
    },
    {
      '@type': 'Question',
      name: 'How is a mesh gradient different from a linear or radial gradient?',
      acceptedAnswer: { '@type': 'Answer', text: 'A linear gradient (CSS linear-gradient()) transitions colors along a single straight axis — top to bottom, left to right, or at an angle. A radial gradient (radial-gradient()) transitions colors outward from a single center point in concentric rings. Both are directional and mathematically simple, which makes them look "designed" and slightly artificial. A mesh gradient instead blends several color sources positioned freely around the canvas, so color flows in from multiple directions at once and mixes in the overlap zones. The result reads as organic and dimensional — closer to how light diffuses through frosted glass or how paint bleeds on wet paper. In practical terms: use linear or radial for buttons, cards, and subtle accents; use a mesh gradient when you want a rich, premium, full-bleed background that feels custom-made.' }
    },
    {
      '@type': 'Question',
      name: 'Why do my CSS radial-gradient blobs look sharper than the SVG version?',
      acceptedAnswer: { '@type': 'Answer', text: 'The SVG export uses a true Gaussian blur (feGaussianBlur) applied to solid circles, which produces a physically accurate, smoothly falling-off edge — the same math a photo editor uses for its blur tool. The CSS export instead simulates each blob with a radial-gradient() that fades from a solid color to transparent. A radial-gradient falloff is a linear or eased ramp, not a true Gaussian curve, so the transition zone is narrower and the edges read as slightly crisper. This is a fundamental difference between the two rendering methods, not a bug. If edge softness matters — for a hero background, for example — export the SVG. If you need a self-contained CSS background with no external file (for runtime theming or a CSS-in-JS component), the radial-gradient version is an excellent, lightweight approximation. You can soften the CSS version further by increasing the transparent color stop percentage in each radial-gradient.' }
    },
    {
      '@type': 'Question',
      name: 'Do mesh gradients hurt page speed or SEO?',
      acceptedAnswer: { '@type': 'Answer', text: 'No — when used correctly, mesh gradients are extremely lightweight. An exported SVG mesh gradient is typically only 1–4 KB because it is just a handful of circle elements and a blur filter described as text, not pixel data. That is far smaller than an equivalent JPG or PNG photo background and it scales to any resolution without a larger file. The pure CSS export adds zero network requests because it lives in your stylesheet. Both approaches render on the GPU and do not block the main thread. For best Core Web Vitals, prefer the SVG or CSS export over a large raster image, set the background with background-image rather than an <img> that could affect Largest Contentful Paint, and avoid animating the gradient on low-end devices. A well-optimized mesh gradient improves perceived quality with almost no performance cost.' }
    },
    {
      '@type': 'Question',
      name: 'How do I match a mesh gradient to my brand colors?',
      acceptedAnswer: { '@type': 'Answer', text: 'Start from a preset that is close to your brand mood, then click each blob\'s color swatch and paste your exact brand hex values. For a cohesive result, use two or three brand colors plus one or two neighboring hues (analogous colors within about 30 degrees on the color wheel) rather than many unrelated colors — analogous palettes blend into smooth, professional meshes, while clashing hues can turn muddy where they overlap. Set the canvas background to a very dark or very light version of your primary brand color so the blobs sit on-brand. If you need help building the palette first, use our Color Palette Generator to create a harmonious set, then bring those hex codes into the blobs here. Keeping opacity around 80–90% preserves color vibrancy while still letting the blobs blend.' }
    },
    {
      '@type': 'Question',
      name: 'Can I use the mesh gradient in Figma, Canva, or Photoshop?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. For design tools, export the PNG at the highest resolution you need (up to 3200×2000px) and drag it straight into Figma, Canva, Photoshop, or Illustrator as a background layer, then place your text and elements on top. Figma and Illustrator can also import the SVG directly if you prefer an editable vector — you will get individual blurred circles you can recolor or reposition inside the app. For social graphics and thumbnails, the PNG is usually the fastest path. For anything that will be resized a lot, keep the SVG so it stays razor sharp.' }
    },
    {
      '@type': 'Question',
      name: 'Is this mesh gradient generator free, and do I need to credit it?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes, it is completely free with no sign-up, no watermark, and no usage limits. Everything you generate — SVG, PNG, or CSS — is yours to use in personal and commercial projects without attribution. The tool runs entirely in your browser: your colors, positions, and exports are never uploaded to a server, so your work stays private. You can create and download as many mesh gradients as you like.' }
    },
    {
      '@type': 'Question',
      name: 'Do mesh gradients work for both dark and light themes?',
      acceptedAnswer: { '@type': 'Answer', text: 'Absolutely. For a dark theme, choose a deep background (navy, charcoal, near-black, or dark purple) and use saturated, luminous blob colors — the Aurora, Neon, and Dusk presets are built for this and give that glowing, premium look. For a light theme, choose a white, cream, or very pale background and reduce blob opacity to around 40–60% so the colors stay soft and never overpower foreground text — the Pastel preset is the ready-made starting point. If you support both modes, generate two versions with the same blob positions but swapped backgrounds and opacity, and switch between them with a CSS variable or a prefers-color-scheme media query.' }
    },
    {
      '@type': 'Question',
      name: 'What is the film grain / noise overlay for?',
      acceptedAnswer: { '@type': 'Answer', text: 'The grain slider adds a fine, monochrome noise texture on top of the gradient. This is the subtle detail that separates a flat, obviously-CSS gradient from the premium mesh backgrounds you see on Stripe, Linear, Vercel, and Apple. A little grain (10–25%) breaks up colour banding on large gradients, adds tactile depth, and gives the background a filmic, designed quality. In the exported SVG the grain is rendered with an feTurbulence fractal-noise filter; in the CSS and React exports it is an inline SVG-noise background layer, so it travels with your code and needs no separate image. Keep it low — too much grain reads as visual dirt rather than texture.' }
    },
    {
      '@type': 'Question',
      name: 'Can I export the mesh gradient as React or Tailwind code?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Besides SVG and CSS, the tool has React and Tailwind export tabs. The React tab gives you a ready-to-paste component that returns a div with the gradient applied via an inline style object — drop it straight into any React or Next.js project. The Tailwind tab gives you a single element using Tailwind arbitrary values (bg-[#hex] and bg-[image:...]) with spaces encoded as underscores per Tailwind conventions, so it works without touching your config. All four formats — SVG, CSS, React, Tailwind — update live as you edit and have a one-click Copy button.' }
    },
    {
      '@type': 'Question',
      name: 'Can I control the size and opacity of each blob individually?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The Blur, Spread, and Opacity sliders set global defaults, but selecting any blob opens a per-blob editor where you can override its size and opacity independently. This is how you build sophisticated, realistic meshes: one large, dominant blob that anchors the composition plus several smaller, subtler accent blobs. Per-blob opacity also lets you push some colours forward and let others fade into the background, which adds depth that a single global opacity value cannot achieve. You can reset any blob back to the global opacity at any time.' }
    },
    {
      '@type': 'Question',
      name: 'How do I save or share a mesh gradient I created?',
      acceptedAnswer: { '@type': 'Answer', text: 'There are two ways. Click "Save current" to store the gradient as a custom preset in your browser (localStorage), so it appears alongside the built-in presets next time you visit — handy for reusing your brand gradient across projects. To share with someone else, click "Copy shareable link": the tool encodes the full design (blob positions, colours, sizes, background, blur, spread, opacity, grain, and aspect ratio) into the URL, so anyone who opens that link sees and can edit your exact gradient. Nothing is uploaded to a server — the entire state lives in the link itself.' }
    },
    {
      '@type': 'Question',
      name: 'Which aspect ratio should I choose for my mesh gradient?',
      acceptedAnswer: { '@type': 'Answer', text: 'Match the canvas aspect ratio to where the gradient will live. Use 16:9 for website hero sections, video thumbnails, and presentation slides; 16:10 for app and dashboard backgrounds; 1:1 (square) for social posts, avatars, and album-style artwork; 4:3 for classic slide decks; and 9:16 for phone wallpapers, Instagram/TikTok stories, and mobile splash screens. Because the blobs are positioned as percentages, switching aspect ratio re-flows the composition automatically, and the export (SVG, PNG, JPG, or WebP) is produced at the ratio you pick so nothing gets cropped or stretched.' }
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Mesh Gradient Generator',
  url: 'https://webdevpuneet.com/mesh-gradient-generator/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free mesh gradient generator using SVG blobs with feGaussianBlur. Drag to reposition blobs, pick colors, adjust blur/spread/opacity, add film grain, and export as SVG, PNG/JPG/WebP, CSS, React, or Tailwind. Includes undo/redo, aspect-ratio presets, color-harmony randomize, custom presets, and shareable links.',
  featureList: ['Drag-and-drop blob positioning (mouse & touch)', 'Individual color, size, and opacity per blob', 'Up to 8 blobs', '6 preset palettes + save your own', 'Film grain / noise overlay', 'Aspect-ratio presets (16:10, 16:9, 1:1, 4:3, 9:16)', 'Color-harmony randomize (analogous, complementary, triadic, monochrome)', 'Undo / redo with keyboard shortcuts', 'Blur, spread, and opacity controls', 'SVG, PNG, JPG, and WebP export up to 3200×2000px', 'CSS, React component, and Tailwind export', 'Shareable URL that restores your exact gradient'],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'Mesh Gradient Generator', item: 'https://webdevpuneet.com/mesh-gradient-generator/' },
  ],
};

const faqs = faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text }));

const SEO = {
  slug: 'mesh-gradient-generator',
  title: 'Mesh Gradient Generator — Free SVG & CSS Mesh Backgrounds',
  subtitle: 'Drag soft color blobs to build the layered, Stripe-style mesh backgrounds modern products use — add film grain, fine-tune every blob, pick an aspect ratio, then export as SVG, PNG, JPG, WebP, CSS, React, or Tailwind. Free, private, and runs entirely in your browser.',

  sections: [
    /* ── About — deep dive ── */
    {
      type: 'text',
      label: 'About this tool',
      heading: 'Create a Mesh Gradient Background by Dragging Blobs — Export as SVG, PNG, CSS, React & Tailwind',
      quickFacts: true,
      text: `You want the kind of rich, layered gradient background that Stripe, Linear, Vercel, and Apple use — multiple soft color blobs blending into each other from different directions — but recreating it by hand with CSS \`radial-gradient()\` is fiddly, and hunting for a stock background image wastes time and rarely matches your brand. This mesh gradient generator lets you drag the blobs around a live canvas and watch the mesh build in real time, then copy production-ready code or download an image in seconds.

Under the hood, each blob is an SVG \`<circle>\` with a \`feGaussianBlur\` filter applied. When several large, heavily blurred circles overlap on a colored background, their colors diffuse and mix at the edges to produce the characteristic soft, organic mesh — the same way light blends through frosted glass. You control up to eight blobs, each draggable with the mouse or a finger, plus global sliders for blur (10–150px), spread, and opacity. Six curated presets — Aurora, Sunset, Ocean, Neon, Pastel, and Dusk — cover both dark and light themes as instant starting points, and you can **save your own presets** to reuse across projects.

## Fine control over every blob

Select any blob to open a full editor and override its **color, X/Y position, size, blur, and opacity** independently — the key to sophisticated meshes with one dominant blob and subtle accents. Add a **film grain / noise overlay** for the premium, textured finish top products use, choose an **aspect ratio** (16:10, 16:9, 1:1, 4:3, or 9:16) to match your target, and use **Randomize** with color-harmony modes (analogous, complementary, triadic, monochrome) so every shuffle looks designed. Full **undo/redo** (Ctrl+Z / Ctrl+Shift+Z) and arrow-key nudging keep experimentation safe and precise.

## Export to any stack, and share instantly

Export as **SVG** (infinitely scalable — embed in HTML or use as \`background-image: url()\`), as **PNG, JPG, or WebP** up to 3200×2000px for email, Figma, Canva, and social/Open Graph images, as pure **CSS** with stacked \`radial-gradient()\` calls, or as a ready-to-paste **React component** or **Tailwind** utility. Every format updates live with a one-click copy. Click **Copy shareable link** to encode your entire design into a URL so a teammate can open and edit your exact gradient. Everything is generated locally in your browser — your colors, positions, and downloads are never uploaded to a server, so your work stays completely private.

## Why designers reach for mesh gradients

Flat color backgrounds can feel dated, and photographic backgrounds compete with your content and bloat page weight. A mesh gradient sits perfectly in between: it adds depth, warmth, and a premium, custom-made feel while staying abstract enough to keep text readable on top. Because the output is vector or CSS, it weighs a few kilobytes instead of hundreds, scales flawlessly from a mobile hero to a 4K display, and never pixelates. If you are assembling a wider visual system, pair it with our [Gradient Generator](/gradient-generator) for linear and radial accents, our [Glassmorphism Generator](/glassmorphism-generator) for frosted cards to layer on top, and our [Color Palette Generator](/color-palette-generator) to lock in a harmonious set of blob colors first.`,
    },

    /* ── Gradient comparison table ── */
    {
      type: 'table',
      label: 'How it compares',
      heading: 'Mesh Gradient vs Linear, Radial, and Conic Gradients',
      boxed: true,
      columns: ['Gradient type', 'How it renders', 'Visual character', 'Best used for'],
      rows: [
        ['**Linear gradient**', 'Colors transition along one straight axis (`linear-gradient()`)', 'Directional, clean, predictable', 'Buttons, section dividers, progress bars, subtle overlays'],
        ['**Radial gradient**', 'Colors radiate outward from a single center point (`radial-gradient()`)', 'A single focal glow or vignette', 'Spotlights, glow effects, soft corner shading'],
        ['**Conic gradient**', 'Colors sweep around a center angle (`conic-gradient()`)', 'A pie or color-wheel sweep', 'Color wheels, pie charts, loading spinners, borders'],
        ['**Mesh gradient**', 'Several blurred color blobs blend from many directions at once', 'Organic, multi-directional, almost 3D', 'Hero backgrounds, cards, splash screens, [OG images](/og-image-generator/)'],
      ],
    },

    /* ── Features grid ── */
    {
      type: 'features',
      label: "What's included",
      heading: 'Features',
      items: [
        'Drag-and-drop blob positioning — move each blob anywhere on the canvas with live preview; works with mouse, touch, and pen',
        'Per-blob color, size, and opacity — select any blob to fine-tune it individually; build the scheme first with our [Color Palette Generator](/color-palette-generator)',
        'Up to 8 blobs with add/remove controls — start with 4 and layer up to 8 for complex multi-color meshes',
        'Film grain / noise overlay (0–60%) — add the subtle textured finish used by premium Stripe- and Linear-style backgrounds',
        'Aspect-ratio presets — 16:10, 16:9, 1:1 (square), 4:3, and 9:16 (story) so the canvas matches your target',
        'Color-harmony randomize — shuffle in Analogous, Complementary, Triadic, or Monochrome modes so every result looks designed',
        'Undo / redo — full history with Ctrl+Z / Ctrl+Shift+Z, plus arrow-key nudging for precise blob placement',
        '6 curated presets: Aurora, Sunset, Ocean, Neon, Pastel, Dusk — plus save your own custom presets to your browser',
        'Blur (10–150px), spread (20–90%), and opacity (30–100%) sliders for global control',
        'SVG export — a complete, embeddable vector with a real Gaussian blur filter (infinitely scalable)',
        'PNG, JPG, and WebP download up to 3200×2000px — retina-ready raster for email, social, and design tools; shrink it further with our [Image Compressor](/image-compressor/)',
        'CSS, React component, and Tailwind export — copy ready-to-paste code for any stack; compare with our [Gradient Generator](/gradient-generator)',
        'Shareable link — copy a URL that restores your exact gradient for teammates or clients',
        '100% client-side — nothing is uploaded; layer frosted cards on top with our [Glassmorphism Generator](/glassmorphism-generator)',
      ],
    },

    /* ── How to use — steps ── */
    {
      type: 'steps',
      label: 'Step by step',
      heading: 'How to Use the Mesh Gradient Generator',
      items: [
        { title: 'Choose a starting preset', text: 'Click any of the six presets in the left panel — Aurora, Sunset, Ocean, Neon, Pastel, or Dusk. Each loads a palette of 4 blobs on a matched background color. Aurora is the default dark-theme mesh; Pastel suits light UI themes. The preview updates instantly.' },
        { title: 'Pick a canvas aspect ratio', text: 'In the Canvas section choose 16:10, 16:9, 1:1 (square), 4:3, or 9:16 (story) to match where the gradient will live — a website hero, social post, or phone wallpaper. The blobs re-flow automatically and every export uses the ratio you pick.' },
        { title: 'Reposition blobs by dragging', text: 'Each blob appears as a handle on the canvas — drag it with your mouse or finger (touch is fully supported). Watch the mesh recompute in real time; small position changes can produce dramatically different color blends. Use arrow keys to nudge the selected blob for pixel-precise placement.' },
        { title: 'Fine-tune any blob', text: 'Click a blob to open its editor and override its color, X/Y position, size, blur, and opacity independently of the global settings. This is how you build depth — one large dominant blob plus smaller, softer accents. Hit "Reset blob overrides" to return it to the globals.' },
        { title: 'Add or remove blobs', text: 'Click "+ Add blob" to add a new blob at a random position — up to a maximum of 8. Click the × next to any blob to remove it (minimum of 2). Most designs look best with 4–6 blobs; more than that tends to blend into a flat, uniform color.' },
        { title: 'Adjust global blur, spread, opacity & grain', text: 'In Settings: Blur controls edge softness (10–150px), Spread sets blob radius relative to the canvas (20–90%), Opacity sets translucency (30–100%), and Grain (0–60%) adds a film-noise texture for that premium finish. Set the background color in the Background section.' },
        { title: 'Randomize with color harmony', text: 'Pick a Randomize style (Analogous, Complementary, Triadic, or Monochrome) then hit ⟳ Randomize to reshuffle positions and colors — the harmony mode keeps every result looking intentional. Use undo/redo (Ctrl+Z / Ctrl+Shift+Z) to step through variations safely.' },
        { title: 'Export, save, or share', text: 'Switch the export tab between SVG, CSS, React, and Tailwind and click Copy, or download SVG / PNG / JPG / WebP at up to 3200×2000px. Click "★ Save current" to keep the design as a custom preset, or "🔗 Copy shareable link" to send an editable URL to a teammate.' },
      ],
    },

    /* ── Export comparison table ── */
    {
      type: 'table',
      label: 'Pick the right export',
      heading: 'SVG, PNG, JPG, WebP, CSS, React or Tailwind — Which Export Should You Use?',
      boxed: true,
      columns: ['Format', 'Scalable?', 'Output', 'Best for', 'Quality'],
      rows: [
        ['**SVG**', 'Yes — infinite', '`.svg` vector file', 'Websites and apps in any modern browser', 'Highest — true Gaussian blur & grain'],
        ['**PNG**', 'No — raster', '`.png` up to 3200×2000', 'Email, Figma, Canva, social & Open Graph images', 'High, with transparency'],
        ['**JPG / WebP**', 'No — raster', '`.jpg` / `.webp` up to 3200×2000', 'Smaller files for web & social; WebP for modern browsers', 'High; smaller than PNG'],
        ['**CSS**', 'Yes — resolution independent', '`radial-gradient()` in your stylesheet', 'CSS-only projects, runtime theming, zero extra requests', 'Good — slightly sharper edges, global blur only'],
        ['**React**', 'Yes', 'A `<div>` component with inline style', 'React & Next.js apps', 'Matches the CSS output'],
        ['**Tailwind**', 'Yes', '`bg-[…]` arbitrary-value utility', 'Tailwind projects with no config changes', 'Matches the CSS output'],
      ],
    },

    /* ── Pro tip callout ── */
    {
      type: 'callout',
      variant: 'tip',
      heading: 'Pro tip: fewer colors, richer mesh',
      text: 'The most professional-looking meshes usually use just 3–4 analogous colors (hues sitting close together on the color wheel) at 80–90% opacity, with blobs pushed toward the four corners of the canvas and one accent blob near the center. Complementary or clashing colors tend to turn muddy brown or grey where they overlap. When in doubt, start from the Aurora or Dusk preset and only swap the hues — keep the proven positions and blur.',
    },

    /* ── Use cases ── */
    {
      type: 'cards',
      label: 'Real-world uses',
      heading: 'What You Can Build With a Mesh Gradient',
      columns: 3,
      items: [
        { icon: 'DESIGN', title: 'SaaS landing page hero background', desc: 'Mesh gradients are the signature background of modern SaaS sites — Stripe, Linear, and Vercel all use them. Apply the Aurora or Dusk preset behind white headline text, export SVG, and set `background-image: url("mesh.svg"); background-size: cover` — it scales to any screen width without pixelating.' },
        { icon: 'APP', title: 'App onboarding & splash screens', desc: 'Export PNG at 1600×1000 or larger and scale it to fill the screen. Neon suits gaming and creative apps; Pastel fits wellness and productivity apps. Hit Randomize to generate dozens of candidates fast and keep the most appealing one.' },
        { icon: 'IMAGE', title: 'Cards, modals & section surfaces', desc: 'The Pastel preset at 50–60% opacity makes a delicate card or modal background for light themes. Use the SVG as a CSS `background-image`, or the CSS export for components that need to be re-themed at runtime without an external file.' },
        { icon: 'MAIL', title: 'Email newsletter headers', desc: 'Email clients render SVG inconsistently, so use the PNG export for headers. A 1600×1000 PNG stays crisp on retina displays and drops straight into Mailchimp, Klaviyo, or HubSpot as a header background image.' },
        { icon: 'STAR', title: 'Open Graph & social share images', desc: 'A mesh gradient behind your title instantly looks more polished than flat color. Export PNG, open it in Figma or Canva, and overlay your branding — the resolution exceeds the minimum for every major platform’s OG and Twitter card specs.' },
        { icon: 'CSS', title: 'Pure CSS backgrounds with no image file', desc: 'The CSS export produces stacked `radial-gradient()` calls — no SVG or PNG needed. Paste it into a Tailwind arbitrary value or a CSS-in-JS style object for dynamically themed components that swap the gradient at runtime.' },
        { icon: 'ANIM', title: 'Animated, living backgrounds', desc: 'Export the SVG, then animate each circle’s `cx`/`cy` with CSS transitions or a small requestAnimationFrame loop to slowly drift the blobs — the Stripe-style effect. See the FAQ on animation for the exact approach.' },
        { icon: 'PPT', title: 'Slide decks & presentation backdrops', desc: 'Download a high-resolution PNG and drop it into Keynote, PowerPoint, or Google Slides as a title-slide background. A subtle mesh makes an investor or sales deck feel designed rather than templated.' },
        { icon: 'GAME', title: 'Profile banners, covers & thumbnails', desc: 'Use the Neon or Sunset preset for eye-catching YouTube thumbnails, Twitch panels, Discord banners, or social cover photos. Export PNG at the exact pixel size the platform requires.' },
      ],
    },

    /* ── Technical deep dive ── */
    {
      type: 'text',
      label: 'Under the hood',
      heading: 'How Mesh Gradients Work: the SVG Technique Explained',
      quickFacts: false,
      boxed: true,
      text: `A mesh gradient looks complex, but the underlying mechanism is elegantly simple — and understanding it helps you get better results and tweak the exported code with confidence.

## Blurred circles, blended edges

Every blob in your design is a plain SVG \`<circle>\` filled with a solid color. On its own, a circle has a hard edge. The magic comes from the \`feGaussianBlur\` filter primitive: it spreads each pixel of the circle outward following a Gaussian (bell-curve) distribution, softening the edge into a wide, feathered halo. The \`stdDeviation\` attribute — what the Blur slider controls — sets how far that halo reaches. A small stdDeviation keeps the circle tight and defined; a large one dissolves it into a faint cloud.

## Why overlap creates color mixing

When two blurred circles overlap, their feathered edges occupy the same pixels. Because each circle is semi-transparent at its edges (thanks to the blur and the Opacity setting), the colors composite together in the overlap zone — cyan over magenta reads as a soft violet, orange over pink as a warm coral. With four or five blobs positioned around the canvas, every region of the background receives color contributions from several directions, which is exactly what gives a mesh gradient its rich, non-directional, painterly quality. This is fundamentally different from a \`linear-gradient()\`, where color only ever varies along one axis.

## Spread, canvas, and the math of a blob

The Spread slider sets each circle's radius as a percentage of the canvas's longest dimension. On an 800×500 canvas, 50% spread means a 400px-diameter blob — large enough to reach well past the center, guaranteeing overlap with its neighbors. Smaller spread with high blur yields airy, barely-there color; larger spread with medium blur yields the boldest, most saturated mesh. The Opacity setting is applied per blob so that stacked blobs never blow out to pure white in their cores.

## What the CSS export does differently

The CSS export can't use \`feGaussianBlur\`, so it approximates each blob with a \`radial-gradient()\` that fades from the blob color to transparent, and stacks them all as layered \`background-image\` values. This is remarkably close visually and needs no external file, but a radial-gradient falloff isn't a true Gaussian curve — so edges are a touch crisper than the SVG. For pixel-perfect softness choose SVG; for a self-contained, zero-request background choose CSS. Both are valid, and this tool gives you the exact code for each so you can decide per project.`,
    },

    /* ── Design tips ── */
    {
      type: 'text',
      label: 'Design guidance',
      heading: 'Design Tips for Beautiful, Readable Mesh Gradients',
      quickFacts: false,
      boxed: true,
      text: `A mesh gradient can elevate a design or quietly ruin its readability. A few reliable rules keep yours in the first category.

## Choose colors that blend, not fight

Analogous palettes — colors within roughly 30° of each other on the wheel (say blue → teal → violet) — blend into smooth, sophisticated meshes. Complementary opposites (red and green, orange and blue) can look striking but often go muddy where they overlap. If you want contrast, get it from lightness and saturation within one hue family rather than from opposing hues. Building the palette in our [Color Palette Generator](/color-palette-generator) first, then pasting the hex codes into the blobs, is the fastest route to a coherent result.

## Protect your text contrast

If the mesh sits behind text, keep the text zone relatively calm: position your brightest, most saturated blobs toward the edges and corners, leaving the center softer. For body text, aim to preserve a 4.5:1 contrast ratio against the busiest part of the gradient the text crosses; for large headings, 3:1 is acceptable. A subtle dark overlay (a semi-transparent black layer) over a light mesh, or a light overlay over a dark mesh, is a common trick to guarantee legibility without dulling the effect.

## Use restraint with blob count and motion

Three to five blobs is the sweet spot. Beyond six, colors average out toward a flat, uniform tone and you lose the distinct color pockets that make a mesh interesting. If you animate the gradient, keep it slow (multi-second transitions) and gentle — fast movement is distracting and can trigger motion sensitivity, so wrap any animation in a \`prefers-reduced-motion\` media query and provide a static fallback.

## Match the mesh to the theme

Dark themes love luminous, saturated blobs on a near-black background for a glowing, premium feel (start with Aurora, Neon, or Dusk). Light themes need lower opacity (40–60%) on a white or cream background so the color stays soft and never competes with foreground UI (start with Pastel). If you ship both modes, reuse the same blob positions and just swap the background and opacity so the two versions feel like siblings.`,
    },

    /* ── Performance / accessibility callout ── */
    {
      type: 'callout',
      variant: 'note',
      heading: 'Performance & accessibility',
      text: 'An exported SVG mesh is usually only 1–4 KB and the CSS export adds zero network requests — both are far lighter than a photo background and render on the GPU. For the best Core Web Vitals, apply the gradient with `background-image` rather than a foreground `<img>`, avoid animating it on low-end devices, and always keep foreground text contrast in check. Mesh gradients are decorative, so they need no `alt` text — but any text placed on top must remain readable for everyone.',
    },

    /* ── FAQ ── */
    {
      type: 'faq',
      label: 'Got questions?',
      heading: 'Frequently Asked Questions',
      items: faqs,
    },
  ],
};

export default function MeshGradientGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><MeshGradientGeneratorTool /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
