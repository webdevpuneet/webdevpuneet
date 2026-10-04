import SvgWaveGeneratorTool from '@/components/SvgWaveGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'SVG Wave Generator — Free Wave Dividers, 4 Edges, SVG/CSS/React | webdevpuneet.com',
  description: 'Generate smooth SVG wave dividers on any edge — multi-color layers, drift animation, undo/redo, shareable links. Export SVG, CSS, or React. Free, no sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/svg-wave-generator/' },
  icons: { icon: '/icons/svg-wave-generator.svg', shortcut: '/icons/svg-wave-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/svg-wave-generator/',
    siteName: 'webdevpuneet.com',
    title: 'SVG Wave Generator — Wave Dividers for Any Edge of a Section',
    description: 'Build flowing SVG wave dividers with sliders for amplitude, wave count, and layers. Top, bottom, left, or right edge, multi-color layers, gentle drift animation, undo/redo, shareable links. Export SVG, CSS data-URI, or React.',
    images: [{ url: 'https://webdevpuneet.com/images/svg-wave-generator.png', width: 1200, height: 630, alt: 'SVG Wave Generator Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'SVG Wave Generator — Wave Dividers for Any Edge',
    description: 'Generate SVG wave dividers on any of 4 edges. Multi-color layers, drift animation, undo/redo. Export SVG, CSS background, or React. 100% free and browser-only.',
    images: ['https://webdevpuneet.com/images/svg-wave-generator.png'],
  },
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SVG Wave Generator',
  url: 'https://webdevpuneet.com/svg-wave-generator/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Visual SVG wave divider generator with sliders for amplitude, wave count, layers, and thickness. Top, bottom, left, or right edge; solid, gradient, or multi-color layer fill; built-in drift animation; undo/redo; shareable links. Export SVG, CSS data-URI, or React. 100% client-side.',
  featureList: [
    'Six style presets: Calm, Smooth, Wavy, Peaks, Choppy, Bold',
    'Smooth sine-based waves rendered with Catmull-Rom bezier paths',
    'Adjustable amplitude, wave count, smoothness, layers, and thickness sliders',
    'Stack up to 5 layered waves with graduated opacity for depth',
    'Top, bottom, left, or right edge placement for horizontal or vertical dividers',
    'Solid color, two-stop linear gradient, or independent multi-color per layer',
    'Built-in gentle drift animation baked into every export format',
    'Decorative export toggle adds aria-hidden automatically',
    'Undo/redo (up to 60 steps) and a shareable link that encodes the full design',
    'Randomize button for instant organic variations',
    'Export SVG markup, CSS background data-URI, or React component',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'SVG Wave Generator', item: 'https://webdevpuneet.com/svg-wave-generator/' },
  ],
};

const faqs = [
  { q: 'What is an SVG wave divider?', a: 'An SVG wave divider is a vector shape placed between two page sections to replace a flat horizontal edge with a flowing curved transition. Because it is SVG it stays crisp at any size, scales to any width without pixelation, and weighs only a few hundred bytes. It is most often used beneath hero sections, between alternating content bands, and above footers.' },
  { q: 'How do I add the generated SVG wave to my website?', a: 'Either paste the <svg> markup directly into your HTML at the bottom of a section and position it absolutely against the edge, or use the CSS export, which embeds the wave as a data-URI background-image on a div with a set height. The SVG approach keeps the cleanest DOM and lets you animate the path; the CSS approach keeps your markup tidy for purely decorative dividers.' },
  { q: 'What do amplitude and wave count control?', a: 'Amplitude is the height of each crest and trough — higher amplitude means taller, more dramatic waves and low amplitude means a gentle ripple. Wave count is how many complete crests fit across the full width — more waves give a busier, choppier edge and fewer waves give long sweeping curves. Smoothness controls how rounded versus angular the curve appears.' },
  { q: 'How does the layered wave effect work?', a: 'Increasing the Layers slider stacks multiple wave paths of the same color at slightly different vertical offsets and phases, each drawn with a higher fill-opacity. The overlap of semi-transparent shapes creates a tonal, depth-rich ribbon effect popular on modern landing pages — without needing a separate image for each band.' },
  { q: 'Can I export the wave as a CSS background image?', a: 'Yes. The CSS tab produces a ready-to-paste rule that embeds the wave as a URL-encoded data-URI in background-image with background-size: cover so it fills its container. This keeps the wave inside your stylesheet with no extra HTTP request and no separate asset to host.' },
  { q: 'How do I use the SVG wave in React?', a: 'Select the React tab. The tool returns a complete function component with all attributes converted to JSX camelCase — fill-opacity becomes fillOpacity and stop-color becomes stopColor — so it compiles without warnings. Drop it in at any section boundary and recolor or resize it through props or wrapper styles. The same markup works in Next.js, Vite, and CRA.' },
  { q: 'How do I position the wave flush against a section edge?', a: 'For a horizontal wave (Top or Bottom edge), give the section position: relative, then add the wave as its last child with position: absolute, left: 0, bottom: 0 (or top: 0), width: 100%. The exported SVG uses preserveAspectRatio="none", so it stretches edge to edge and stays flush at any screen size. For a vertical wave (Left or Right edge), use top: 0, bottom: 0, height: 100%, and anchor left: 0 or right: 0 instead — width follows automatically from the aspect ratio.' },
  { q: 'How do I animate the SVG wave?', a: 'Tick "Animate (gentle drift)" in the Export options section and the tool bakes a per-layer CSS keyframe animation directly into the exported markup — a subtle alternating translateX sway, with each layer given a slightly different duration for a parallax feel. Because the animation lives inside the SVG\'s own <style> block, it automatically carries over into the CSS data-URI export too, with zero extra CSS needed. This built-in animation is a gentle side-to-side sway, not a seamless one-directional scroll. For a continuous rolling loop, duplicate the path so it tiles seamlessly and run your own linear translateX(-50%) keyframe by hand.' },
  { q: 'Why use an SVG wave instead of a PNG?', a: 'An SVG wave is a few hundred bytes of text, scales infinitely without blur, and can be recolored by editing one attribute or animated with CSS. A PNG is many kilobytes, looks soft on high-DPI screens unless you ship a 2x version, and cannot be recolored without re-exporting. For a flat decorative divider, SVG wins on both performance and flexibility.' },
  { q: 'Can I make a vertical wave divider for a sidebar or column?', a: 'Yes — choose Left or Right instead of Top or Bottom in the Edge section. The generator rotates the same sine-and-Catmull-Rom math onto the vertical axis, so the crests run up and down the container instead of left to right, and the shape closes to whichever side (left or right) you selected. This makes a wavy vertical divider between two side-by-side columns or a decorative sidebar edge, using the exact same sliders as the horizontal wave.' },
  { q: 'How does multi-color per layer work?', a: 'Tick "Multi-color layers" in the Color section and each of the up to 5 active layers gets its own independent color swatch, instead of every layer sharing one solid color or one gradient. This produces a bolder, more varied ribbon effect — for example a teal-to-purple-to-pink gradient of layers rather than one color fading through opacity. Turn the toggle off to go back to a single shared color or gradient.' },
  { q: 'Does the exported wave include aria-hidden automatically?', a: 'Yes — the "Decorative (adds aria-hidden)" checkbox is on by default, and the tool bakes aria-hidden="true" directly onto the root <svg> element in every export format. This tells screen readers to skip the divider, which is correct for almost every use case since a wave carries no information that needs to be announced. Untick it only if you have a specific reason for the SVG to be exposed to assistive technology.' },
  { q: 'Can I undo a change or share my exact wave design with someone?', a: 'Yes. Press Ctrl+Z to undo (Ctrl+Shift+Z or Ctrl+Y to redo) — the tool keeps up to 60 steps of history, debounced so rapid slider drags count as one step. Click the Share button in the header to copy a URL that encodes every setting (shape, edge, colors, animation, and accessibility options); opening that link reproduces your exact design, which is useful for sending a draft to a teammate or saving a favorite configuration as a bookmark.' },
  { q: 'Is the SVG wave generator free and private?', a: 'Yes — it is completely free with no sign-up, watermark, or limit, and all generation happens in your browser, so nothing is uploaded to a server. The tool keeps working offline once loaded, and the SVG you copy is yours to use in personal and commercial projects.' },
  { q: 'How is an SVG wave different from a CSS clip-path divider?', a: 'CSS clip-path reshapes the visible boundary of the element it is applied to — polygon() for angled cuts, or circle()/ellipse()/inset() with a border-radius for smooth curves — which is ideal for cropping a photo, card, or section into a non-rectangular shape. An SVG wave is a separate, filled shape placed as a divider between two sections, purpose-built to render several undulating crests and troughs with tunable amplitude and frequency — something clip-path is not designed for, since it clips one element rather than drawing a new decorative one. Use clip-path to reshape an existing element (try our [Clip-path Generator](/css-clip-path-generator)); use an SVG wave when you need a dedicated multi-crest divider band.' },
  { q: 'Will a complex, multi-layer wave slow down my page?', a: 'No — even a 5-layer wave with high smoothness is only a few kilobytes of path data and renders instantly, since browsers draw SVG paths natively with no JavaScript needed at runtime. Compare that to an equivalent PNG or WebP wave graphic, which is typically 20–100 KB and needs separate 1x/2x/3x versions for different screen densities. The only performance consideration is if you animate many layers at once with heavy filters — plain path fills and CSS transforms stay smooth even on low-end devices.' },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const SEO = {
  slug: 'svg-wave-generator',
  title: 'SVG Wave Generator Online — Layered Wave Dividers for Section Backgrounds',
  subtitle: 'Drag sliders to shape smooth, layered SVG wave dividers — then export SVG, a CSS background data-URI, or a React component. Free, private, and runs entirely in your browser.',

  sections: [
    {
      type: 'text',
      label: 'About this tool',
      heading: 'Generate Smooth, Layered SVG Wave Dividers — Adjust the Sliders, Copy the Code',
      text: `You want that soft curved transition between two page sections instead of a hard horizontal line — the kind of flowing wave divider you see beneath hero sections and above footers on modern landing pages. Hand-writing the SVG \`<path>\` bezier coordinates for a smooth wave is tedious and error-prone. This generator builds the path for you: drag the sliders, watch the live preview, and copy clean SVG, CSS, or React code.

Under the hood, each wave is generated by sampling a **sine function** across the full 1440-unit width and then converting those sample points into a smooth path using a **Catmull-Rom to cubic-bezier** conversion. That is why every shape stays flowing and continuous rather than jagged — the control points for each bezier segment are derived from the neighbouring sample points, so the curve passes smoothly through every peak and trough. The Amplitude slider scales the sine output, the Waves slider sets the sine frequency (how many full cycles fit across the width), and Smoothness changes how many points are sampled.

The **layered effect** stacks several wave paths at slightly offset baselines and phases, each drawn with a higher \`fill-opacity\` than the last. Because semi-transparent shapes overlap, you get a rich, tonal ribbon without exporting multiple images. Choose one shared color, a two-stop **linear gradient**, or turn on **multi-color layers** to give each of the up to 5 layers its own independent color for a bolder, more varied ribbon.

The wave works on **all four edges** of a section — Top, Bottom, Left, or Right. Top and Bottom generate a horizontal wave (crests running left to right); Left and Right rotate the same math onto the vertical axis so the crests run up and down instead, for a wavy sidebar or column divider. Whichever edge you pick, the path automatically closes to that side so the shape always fills cleanly.

## Built-in animation, accessibility, and safety net

Turn on **Animate (gentle drift)** and each layer gets its own CSS \`@keyframes\` animation baked directly into the exported \`<svg>\` — a subtle alternating \`translateX\` sway with a different duration per layer, so the ribbon feels alive without you writing any CSS. Because the \`<style>\` block lives inside the SVG itself, the animation carries over automatically into the CSS data-URI export too, and the React export wraps it in a JSX-safe template literal so it compiles cleanly. This is a gentle side-to-side sway, not a seamless one-directional scroll — for a continuous rolling-wave loop you would still duplicate the path and run a linear \`translateX(-50%)\` keyframe by hand.

**Decorative (adds aria-hidden)** is on by default, since a wave divider carries no information a screen reader needs to announce — the tool bakes \`aria-hidden="true"\` straight into the exported markup so you don't have to remember to add it yourself. And because tweaking six sliders plus color and edge settings can take a few tries to get right, the header includes **undo/redo** (Ctrl+Z / Ctrl+Shift+Z, up to 60 steps) and a **Share** button that encodes your entire design into a URL so a teammate can open the exact same wave.

Exports cover the three ways people actually drop waves into a project: raw \`<svg>\` markup for pasting into HTML, a **CSS \`background-image\` data-URI** that needs no separate file, and a **React component** with attributes already converted to JSX camelCase (\`fillOpacity\`, \`stopColor\`, \`className\`). Everything runs in your browser — nothing is uploaded, and the tool keeps working offline once loaded.

**Placing the wave on your page** depends on the edge. For a horizontal wave (Top/Bottom), give the parent section \`position: relative\`, then drop the exported SVG in as the last child with \`position: absolute; left: 0; bottom: 0; width: 100%\` (or \`top: 0\` for the Top edge). Because the markup uses \`preserveAspectRatio="none"\`, it stretches edge to edge and stays flush at every breakpoint — no media queries needed. For a vertical wave (Left/Right), use \`top: 0; bottom: 0; width: auto; height: 100%\` and anchor \`left: 0\` or \`right: 0\` instead. Vector paths render natively with no JavaScript at runtime, so a few kilobytes of SVG replaces a heavy animated GIF or a stack of PNG exports.`,
    },

    {
      type: 'table',
      label: 'How it compares',
      heading: 'SVG Wave vs Clip-Path vs a Raster Divider Image',
      boxed: true,
      columns: ['Technique', 'Edge shape', 'File weight', 'Scalability', 'Best for'],
      rows: [
        ['**SVG wave (this tool)**', 'Multiple undulating crests with tunable amplitude/frequency', 'A few hundred bytes to a few KB', 'Infinite — vector', 'Organic multi-crest wave dividers beneath heroes and above footers'],
        ['**CSS `clip-path`**', 'Cuts the *same* element\'s edge — polygons, or smooth circles/ellipses/rounded corners', 'Zero — pure CSS', 'Infinite — resolution independent', 'Reshaping a photo, card, or section\'s own boundary — see our [Clip-path Generator](/css-clip-path-generator)'],
        ['**PNG / WebP divider image**', 'Any shape, but fixed at export resolution', '20–100+ KB, needs 1x/2x/3x variants', 'None — pixelates when scaled up', 'Complex illustrated dividers that are not achievable with paths'],
      ],
    },

    {
      type: 'features',
      label: "What's included",
      heading: 'Features',
      items: [
        'Six one-click style presets — Calm, Smooth, Wavy, Peaks, Choppy, and Bold — to set amplitude and wave count instantly',
        'Smooth sine-based waves rendered with Catmull-Rom bezier paths so curves stay flowing, never jagged',
        'Five live sliders: amplitude, wave count, smoothness, layers, and thickness, all reflected in the preview in real time',
        'Stack up to 5 translucent layers for a modern depth effect without exporting multiple images',
        'All four edges — Top, Bottom, Left, or Right — so the same generator makes horizontal dividers or vertical sidebar/column waves',
        'Solid color, a two-stop linear gradient, or independent multi-color per layer — pair it with a palette from our [Color Palette Generator](/color-palette-generator)',
        'Built-in gentle drift animation toggle — bakes per-layer CSS keyframes directly into the SVG, CSS, and React export',
        'Decorative export toggle adds aria-hidden="true" automatically (on by default) so screen readers skip the divider',
        'Undo/redo with Ctrl+Z / Ctrl+Shift+Z (up to 60 steps) and a Share button that copies a URL encoding your exact design',
        'Randomize button shuffles phase, amplitude, wave count, and smoothness for instant organic variations',
        'Export to SVG markup, a CSS data-URI background, or a React component; convert raster art to vectors with our [Image to SVG](/image-to-svg/) tool',
      ],
    },

    {
      type: 'steps',
      label: 'Step by step',
      heading: 'How to Use',
      items: [
        { title: 'Start from a style preset', text: 'Pick one of the six presets — Calm, Smooth, Wavy, Peaks, Choppy, or Bold — to set a sensible amplitude and wave count in one click. The live preview updates instantly so you can see the shape of the divider before tweaking anything.' },
        { title: 'Choose the edge', text: 'Click Top, Bottom, Left, or Right to decide which side the wave sits on. Top and Bottom make a horizontal divider — Bottom for beneath a hero, Top for sitting on a footer. Left and Right rotate the same wave onto the vertical axis for a sidebar or column divider.' },
        { title: 'Shape the wave with sliders', text: 'Drag Amplitude to make the crests taller or flatter, Waves to set how many crests span the length, and Smoothness to control how rounded the curve is. Adjust Thickness to change the overall size of the divider band, and Layers to stack multiple translucent waves for a depth effect.' },
        { title: 'Pick a color, gradient, or multi-color layers', text: 'Use the color picker to set a single wave fill, or tick "Use gradient fill" for a two-stop blend. For a bolder ribbon, tick "Multi-color layers" to give each of the up to 5 layers its own independent color swatch.' },
        { title: 'Turn on animation and accessibility options', text: 'Tick "Animate (gentle drift)" to bake a subtle per-layer sway animation into the export with zero CSS of your own. Leave "Decorative" checked (it is on by default) so the export automatically gets aria-hidden="true" for screen readers.' },
        { title: 'Randomize, undo, or share', text: 'Click Randomize to shuffle the shape for a fresh organic result. Made a change you regret? Ctrl+Z undoes it (Ctrl+Shift+Z to redo). Click Share to copy a URL that reopens your exact design — handy for sending a draft to a teammate.' },
        { title: 'Export your format', text: 'Switch between the SVG, CSS, and React tabs. SVG gives raw markup to paste into HTML, CSS gives a background-image data-URI rule (animation included automatically), and React gives a ready-to-use component with JSX-safe attributes. Click Copy to grab the code.' },
      ],
    },

    {
      type: 'callout',
      variant: 'tip',
      heading: 'Pro tip: match wave count to section width',
      text: 'A wave that looks great full-width on desktop can look cramped or overly busy in a narrower content column. As a rule of thumb, use 2–3 waves for a full-viewport-width hero divider and drop to 1–2 waves with lower amplitude for a divider inside a boxed, max-width content area — fewer, wider crests read as calmer and more premium at smaller widths.',
    },

    {
      type: 'cards',
      label: 'Real-world uses',
      heading: 'Common Use Cases',
      columns: 3,
      items: [
        { icon: '🌊', title: 'Add a flowing wave divider beneath your hero section', desc: 'Drop the bottom-edge SVG at the foot of a colored hero band so it melts into the next section instead of ending on a hard line — the single most common landing-page use for wave dividers.' },
        { icon: '🎨', title: 'Create a layered, depth-rich section background', desc: 'Stack 3–5 translucent layers in a brand color to build the tonal ribbon look seen on SaaS marketing pages. Combine it with a clipped shape from our [CSS Clip-path Generator](/css-clip-path-generator).' },
        { icon: '🦶', title: 'Sit a wave on top of your site footer', desc: 'Switch to the top edge and place the wave above a dark footer so the page content flows down into it with a soft curved seam rather than a flat border.' },
        { icon: '🌈', title: 'Blend a gradient wave that matches your palette', desc: 'Turn on gradient fill and pick two brand colors for a wave that transitions vertically — ideal for hero overlays. Generate a matching scheme with our [Gradient Generator](/gradient-generator).' },
        { icon: '⚛️', title: 'Drop a reusable wave component into a React app', desc: 'Copy the React export to get a self-contained component with JSX-safe attributes — render it at any section boundary in Next.js, Vite, or CRA and recolor it through props or wrapper styles.' },
        { icon: '💾', title: 'Embed a wave as a CSS background with zero extra requests', desc: 'Use the CSS data-URI export to add a decorative wave entirely inside your stylesheet — no image hosting, no extra HTTP call. Shrink your final CSS with our [CSS Minifier & Beautifier](/css-minifier-beautifier).' },
        { icon: '📐', title: 'Build a wavy sidebar or column divider', desc: 'Switch the edge to Left or Right to rotate the same wave onto the vertical axis — perfect for a decorative boundary between a sidebar and main content, or between two side-by-side columns, without hand-drawing a vertical bezier path.' },
        { icon: '🎭', title: 'Design a bold, multi-tone ribbon effect', desc: 'Turn on Multi-color layers to give each of up to 5 stacked waves its own independent color, instead of one hue fading through opacity — ideal for vibrant SaaS hero sections or playful brand illustrations that need more than a single-color wash.' },
      ],
    },

    {
      type: 'callout',
      variant: 'note',
      heading: 'Performance & accessibility',
      text: 'SVG wave dividers are decorative, so this generator bakes `aria-hidden="true"` straight into the exported markup by default via the "Decorative" toggle — screen readers skip over it automatically, with nothing extra for you to add. Because the exported markup is pure vector data with no embedded raster image, it costs a few kilobytes at most and never contributes to layout shift when `width`/`height` or `viewBox` are set, which the generator also does automatically.',
    },

    {
      type: 'faq',
      label: 'Got questions?',
      heading: 'Frequently Asked Questions',
      items: faqs,
    },
  ],
};

export default function SvgWaveGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><SvgWaveGeneratorTool /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
