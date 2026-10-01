import SvgPlaygroundTool from '@/components/SvgPlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'SVG Playground — Learn SVG Visually, 44 Lessons Free | webdevpuneet.com',
  description: 'Learn SVG online from beginner to pro with 44 hands-on lessons — shapes, paths, viewBox, gradients, filters, clipping, plus CSS and SMIL animation. Live editor and preview, free, no install.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/svg-playground/' },
  icons: { icon: '/icons/svg-playground.svg', shortcut: '/icons/svg-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/svg-playground/',
    siteName: 'webdevpuneet.com',
    title: 'SVG Playground — Learn SVG with 44 Interactive Lessons, Live Preview',
    description: 'Learn SVG in the browser with 44 hands-on lessons — the viewBox, basic shapes, paths and Bézier curves, gradients, patterns, text, transforms, filters, clipping, masking, plus CSS and SMIL animation. No install needed.',
    images: [{ url: 'https://webdevpuneet.com/images/svg-playground.png', width: 1200, height: 630, alt: 'SVG Playground — 44 Interactive Lessons' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'SVG Playground — Learn SVG with 44 Interactive Lessons',
    description: 'From your first circle to self-drawing lines and morphing paths — 44 guided SVG lessons with live preview, transparency grid, animation replay, and progress tracking. Free, no install.',
    images: ['https://webdevpuneet.com/images/svg-playground.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Do I need to install anything to learn SVG?', acceptedAnswer: { '@type': 'Answer', text: 'No. The SVG Playground runs entirely in your browser. You can edit SVG markup, see it render live, toggle a transparency grid, replay animations, and save progress without installing an editor, Node.js, or any design software.' } },
    { '@type': 'Question', name: 'Is this SVG tutorial good for complete beginners?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The first chapters start with the <svg> element, the viewBox and coordinate system, and basic shapes — rect, circle, ellipse, line, polyline, and polygon — with the drawing rendering instantly after every edit. You do not need any prior SVG or graphics experience.' } },
    { '@type': 'Question', name: 'Does the SVG Playground cover animation?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Two full chapters cover animation. The CSS chapter teaches transitions, @keyframes, transform-box, transform-origin, and staggered animation. The SMIL chapter teaches the <animate>, <animateTransform>, and <animateMotion> elements, plus begin timing, keyTimes, and repeatCount. Pro lessons then build self-drawing lines, spinners, animated icons, path morphing, and animated gradients.' } },
    { '@type': 'Question', name: 'What is the difference between CSS animation and SMIL in SVG?', acceptedAnswer: { '@type': 'Answer', text: 'CSS animation uses a <style> block with transitions and @keyframes and is great for hover effects, transforms, and reusable classes. SMIL animation is built into SVG with the <animate>, <animateTransform>, and <animateMotion> elements — it can animate almost any attribute (including a path’s d for morphing) and needs no CSS or JavaScript. The playground teaches both so you can pick the right tool per effect.' } },
    { '@type': 'Question', name: 'How does the live preview work?', acceptedAnswer: { '@type': 'Answer', text: 'Your SVG markup renders in a sandboxed preview that updates as you type. You can switch the background between a transparency grid (checkerboard), plain white, or dark to check how the graphic looks in context, and press Replay to restart CSS and SMIL animations from the beginning.' } },
    { '@type': 'Question', name: 'Can I use my own SVG code in the editor?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Ignore the lesson path and paste any SVG into the editor — an icon exported from a design tool, a logo, or a hand-written graphic. The live preview, background toggle, copy, download, and share controls all work on your own code.' } },
    { '@type': 'Question', name: 'Can I download or share what I make?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Click Download to save the current markup as a .svg file you can use in any website or app. Click Share to copy a link that encodes your SVG in the URL — nothing is uploaded to a server.' } },
    { '@type': 'Question', name: 'Why does my rotation animation drift instead of spinning in place?', acceptedAnswer: { '@type': 'Answer', text: 'CSS transforms on SVG elements are measured from the SVG origin, not the shape’s centre. Add transform-box: fill-box and transform-origin: center so the rotation pivots around the shape itself. The CSS animation lessons cover this exact gotcha.' } },
    { '@type': 'Question', name: 'Is SVG better than PNG or JPG for icons and logos?', acceptedAnswer: { '@type': 'Answer', text: 'For icons, logos, and illustrations, usually yes. SVG is vector-based, so it stays razor-sharp at any size and on any screen density, the files are often tiny, and you can style and animate it with CSS. Raster formats like PNG and JPG are better for photographs.' } },
    { '@type': 'Question', name: 'How do I make an SVG responsive?', acceptedAnswer: { '@type': 'Answer', text: 'Keep the viewBox attribute and remove any fixed width and height so the SVG scales to fill its container. Use preserveAspectRatio to control how it fits, and add a <title> element plus role="img" for accessibility. The final Pro Techniques lesson walks through production-ready responsive markup.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SVG Playground',
  url: 'https://webdevpuneet.com/svg-playground/',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires a modern browser with JavaScript enabled',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free interactive SVG playground with 44 guided lessons across 12 chapters — the viewBox and coordinate system, basic shapes, paths and Bézier curves, styling and strokes, gradients, patterns, text, groups, transforms, reuse with <use> and <symbol>, filters, clipping, masking, plus CSS and SMIL animation. Live preview, transparency grid, animation replay, progress tracking. No install required.',
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
  featureList: [
    '44 guided lessons across 12 chapters',
    'Live SVG editor with instant preview',
    'Transparency grid, white, and dark preview backgrounds',
    'Replay button restarts CSS and SMIL animations',
    'Basic shapes — rect, circle, ellipse, line, polyline, polygon',
    'Path commands — M, L, Q, C, A, Z and Bézier curves',
    'Gradients, patterns, filters, clipping, and masking',
    'CSS animation — transitions, @keyframes, transform-box',
    'SMIL animation — animate, animateTransform, animateMotion',
    'Pro techniques — self-drawing lines, spinners, morphing, animated gradients',
    'Progress tracking via localStorage',
    'Share code via URL and download as .svg',
    '100% browser-based, no install required',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Learn to Code', item: 'https://webdevpuneet.com/learn-to-code/' },
    { '@type': 'ListItem', position: 3, name: 'SVG Playground', item: 'https://webdevpuneet.com/svg-playground/' },
  ],
};

const seoData = {
  slug: 'svg-playground',
  title: 'SVG Playground — Learn SVG from Basics to Animation',
  subtitle: 'A free interactive SVG playground with 44 guided lessons, live preview, a transparency grid, animation replay, progress tracking, and share links. No install.',

  about: {
    title: 'Learn SVG Online Without Installing Anything — 44 Lessons, Live Browser Preview',
    description: `Most SVG tutorials paste a finished graphic and move on, so you never learn what each number in the markup actually controls. This SVG Playground keeps the code and the rendered picture side by side. Change a coordinate, a colour, or an animation value and the preview updates instantly — that tight feedback loop is how SVG finally clicks.

There is nothing to install. No design software, no Node.js, no build step. Open the page and 44 lessons are ready across 12 chapters that take you from your first \`<circle>\` all the way to self-drawing lines, morphing paths, and animated gradients.

**SVG Basics — the mental model everything builds on**

The first chapter establishes how SVG thinks. You learn that a drawing lives inside an \`<svg>\` element, that the \`viewBox\` defines an internal coordinate grid you can zoom and pan independently of the on-screen size, and — the thing that trips up every beginner — that the y-axis grows **downward** from a top-left origin. Interactive picker lessons let you zoom in, zoom out, and pan the same shape so the \`viewBox\` stops being abstract.

**Basic Shapes — rect, circle, ellipse, line, polyline, polygon**

Before paths, you master the primitives. Rectangles with \`x\`, \`y\`, \`width\`, \`height\`, and the \`rx\` that rounds corners into pills. Circles and ellipses with \`cx\`, \`cy\`, and one or two radii. Lines and polylines that need a \`stroke\` to appear. Polygons that auto-close into triangles, hexagons, and stars from a list of points. Each shape renders live so you can drag the numbers and watch it respond.

**Paths — the one element that can draw anything**

The \`<path>\` and its \`d\` attribute are the heart of SVG. You learn the mini-language one command at a time: \`M\` to move the pen, \`L\` to draw a line, \`Z\` to close. Then curves — the quadratic \`Q\` with one control point, the cubic \`C\` with two (the kind design tools export), and the smooth \`T\` shorthand for waves. An arc lesson demystifies the \`A\` command and its two flags, and a final lesson builds a real heart icon from arcs, exactly like the single \`d\` string you copy out of Figma or Illustrator.

**Styling & Strokes — fill, stroke, dashes, caps, and joins**

Colour and line treatment get their own chapter. \`fill\` versus \`stroke\` and \`stroke-width\`, \`fill="none"\` for outline-only shapes, and colour in hex, \`rgb()\`, \`hsl()\`, or \`currentColor\`. Then the stroke details that make graphics feel polished: \`stroke-dasharray\` for dashes and dots, \`stroke-dashoffset\` (which becomes the key to line-drawing animation later), \`opacity\` and layering, and \`stroke-linecap\` and \`stroke-linejoin\` for soft rounded ends and corners.

**Gradients & Patterns — depth without images**

Define a \`<linearGradient>\` or \`<radialGradient>\` once inside \`<defs>\`, give it an \`id\`, and reference it with \`fill="url(#id)"\`. You learn to place \`<stop>\` colours, rotate a linear blend with its coordinates, and shift a radial focal point to fake a light source for spheres and glows. A \`<pattern>\` lesson tiles small artwork across a shape for dots, grids, and hatching — all vector, all resolution-independent.

**Text & Groups — labels, badges, and organisation**

SVG text is a first-class citizen. You place \`<text>\` at a baseline, align it with \`text-anchor\`, and style it with the same \`font-size\`, \`font-weight\`, and \`letter-spacing\` you know from CSS. A \`<tspan>\` restyles part of a line, \`<textPath>\` flows words along any curve for circular badges, and \`<g>\` groups elements so a single \`fill\` or \`transform\` cascades to every child.

**Transforms & Reuse — translate, rotate, scale, and DRY graphics**

The \`transform\` attribute moves, rotates, and scales with \`translate\`, \`rotate\`, and \`scale\`, and you learn how chaining and anchor points behave. Then reuse: define a shape once and stamp it many times with \`<use href="#id">\`, and package scalable icons with \`<symbol>\` and its own \`viewBox\` — the exact foundation of SVG icon sprites.

**Filters & Effects — shadows, blur, glow, and colour**

Filters live in \`<defs>\` and apply with \`filter="url(#id)"\`. You build a soft drop shadow with \`<feDropShadow>\`, blur with \`<feGaussianBlur>\`, a neon glow by merging a blurred copy behind the original with \`<feMerge>\`, and recolour graphics with \`<feColorMatrix>\` for greyscale and hue-rotate effects — the same primitives that power the CSS \`filter\` property.

**Clipping & Masking — cropping with hard and soft edges**

A \`<clipPath>\` crops an element to a shape with a hard edge — the classic circular avatar. A \`<mask>\` uses brightness instead, so white shows, black hides, and grey fades, giving the feathered edges a clip path cannot. Seeing both back to back makes the difference obvious.

**Animation: CSS — transitions, keyframes, and the transform-origin gotcha**

The first animation chapter uses plain CSS inside a \`<style>\` block. A hover lesson shows a \`transition\` smoothly interpolating scale and colour. A \`@keyframes\` picker builds spin, pulse, and bounce — and teaches the single most common SVG-animation mistake: transforms are measured from the SVG origin, so you need \`transform-box: fill-box\` and \`transform-origin: center\` to rotate in place. A staggered lesson uses \`animation-delay\` to build an equaliser wave.

**Animation: SMIL — animate, animateTransform, animateMotion**

The second animation chapter uses SVG's built-in SMIL — no CSS, no JavaScript. You drop an \`<animate>\` inside a shape to animate an attribute through a \`values\` list, use \`<animateTransform>\` for rotate, scale, and translate, and \`<animateMotion>\` to send an element gliding along a path with \`rotate="auto"\`. A timing lesson covers \`begin\`, \`keyTimes\`, and \`repeatCount\` so you can sequence and hold precisely.

**Pro Techniques — the effects people actually ship**

The final chapter combines everything into portfolio-grade effects: the self-drawing line built from \`stroke-dasharray\` and an animated \`stroke-dashoffset\`; a dependency-free spinner; animated check and heart icons; path morphing by animating the \`d\` attribute between shapes with matching structure; a living animated gradient; and production-ready responsive, accessible markup with \`preserveAspectRatio\`, \`<title>\`, and \`role="img"\`.

Every lesson has a Quick Check multiple-choice question, and progress is saved to localStorage so you can close the tab and resume where you left off. The Replay button restarts any animation, the background toggle switches between a transparency grid, white, and dark, and everything renders locally — no code is uploaded to any server. When you are ready to go further with motion, continue in the [GSAP playground](/gsap-playground) or the [CSS animation generator](/css-animation-generator/).`,
  },

  features: [
    '44 guided lessons across 12 chapters, from your first circle to morphing paths — then keep building motion in the [GSAP playground](/gsap-playground)',
    'Live SVG editor — the preview updates as you type, Ctrl+Enter to render immediately',
    'Transparency grid, white, and dark preview backgrounds to check any graphic in context',
    'Replay button restarts CSS and SMIL animations from the start',
    'Basic shapes chapter — rect, circle, ellipse, line, polyline, and polygon',
    'Paths chapter — M, L, Z, quadratic (Q), cubic (C), smooth (T), and arcs (A)',
    'Styling chapter — fill, stroke, stroke-dasharray, opacity, linecap, and linejoin',
    'Gradients & patterns — linearGradient, radialGradient, and tiled patterns',
    'Text & groups — text-anchor, tspan, textPath on a curve, and <g> grouping',
    'Transforms & reuse — translate/rotate/scale, <use>, <defs>, and <symbol> sprites',
    'Filters chapter — drop shadow, Gaussian blur, neon glow, and feColorMatrix',
    'Clipping & masking — clipPath for hard edges and mask for soft, feathered edges',
    'CSS animation — transitions, @keyframes, transform-box, and staggered delays',
    'SMIL animation — animate, animateTransform, animateMotion, keyTimes, repeatCount',
    'Pro techniques — self-drawing lines, spinners, animated icons, and animated gradients',
    'Progress tracking via localStorage — resume exactly where you left off',
    'Copy, download as .svg, and share via a base64 URL — pair it with the [SVG animation generator](https://fwdtools.com/svg-animation-generator)',
    '100% browser-based — no design software, no build step, no setup',
  ],

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Open the playground — no install required',
        text: 'Navigate to the SVG Playground. The editor and live preview are ready immediately — no design software, no Node.js, no build step. Start from the first lesson or jump to any chapter that matches your level.',
      },
      {
        title: 'Start with SVG Basics if you are new',
        text: 'Work through Hello SVG, The viewBox, and The Coordinate System first. These three lessons build the mental model — the <svg> element, the coordinate grid, and the downward y-axis — that every later chapter assumes.',
      },
      {
        title: 'Master shapes before paths',
        text: 'The Basic Shapes chapter covers rect, circle, ellipse, line, polyline, and polygon. Drag the numbers in the editor and watch each shape respond. Once shapes feel natural, the Paths chapter and its d-attribute commands (M, L, Q, C, A, Z) are far easier to read.',
      },
      {
        title: 'Use the background toggle to check your work',
        text: 'Switch the preview background between the transparency grid, white, and dark using the buttons above the preview. The checkerboard grid reveals transparent areas, while white and dark show how the graphic looks on real page backgrounds.',
      },
      {
        title: 'Work through both animation chapters',
        text: 'The CSS Animation chapter teaches transitions, @keyframes, and the transform-box gotcha; the SMIL Animation chapter teaches the built-in animate, animateTransform, and animateMotion elements. Press Replay above the preview to restart any animation and watch it again.',
      },
      {
        title: 'Build the Pro Techniques effects',
        text: 'The final chapter assembles everything into shippable effects — self-drawing lines, a spinner, animated icons, path morphing, and animated gradients. These are the graphics you will actually reuse in real projects.',
      },
      {
        title: 'Answer the Quick Check on each lesson',
        text: 'Most lessons end with a multiple-choice Quick Check. Answer it before marking the lesson done — it reinforces the concept and takes under a minute. Progress is saved automatically to localStorage.',
      },
      {
        title: 'Share, download, and reuse your SVG',
        text: 'Click Download to save the current markup as a .svg file, or Share to copy a base64 URL of your code. Both work on your own SVG too — paste an exported icon into the editor and tweak it live.',
      },
    ],
  },

  useCases: [
    {
      icon: '▶',
      title: 'Learn SVG from scratch in your browser',
      desc: 'If you want to understand SVG but do not know where to begin, open the SVG Basics chapter. The viewBox, coordinate system, and basic shapes are all explained with markup that renders instantly after every edit. No design software, no configuration — the 12-chapter path takes you from your first circle to animated, responsive graphics.',
    },
    {
      icon: '✎',
      title: 'Understand SVG paths and Bézier curves',
      desc: 'Paths are where most people give up on SVG. The Paths chapter teaches the d-attribute one command at a time — M, L, Z, then quadratic (Q) and cubic (C) curves, then arcs (A) — with control points drawn on screen. By the end you can read and edit the single d string a design tool exports for any icon.',
    },
    {
      icon: '✦',
      title: 'Master SVG animation — CSS and SMIL',
      desc: 'Two chapters cover animation in depth. Learn CSS transitions and @keyframes (including the transform-box fix for rotations), then the built-in SMIL elements animate, animateTransform, and animateMotion. Pro lessons build self-drawing lines, spinners, animated icons, path morphing, and animated gradients — effects you can drop straight into a site.',
    },
    {
      icon: '◐',
      title: 'Learn gradients, filters, clipping, and masking',
      desc: 'Add depth without images. Build linear and radial gradients, tiled patterns, drop shadows and neon glows with SVG filters, and crop graphics with clipPath (hard edges) or mask (soft, feathered edges). These are the techniques behind polished logos, avatars, and hero graphics.',
    },
    {
      icon: '⊞',
      title: 'Build reusable icons and sprites',
      desc: 'Define a shape once and reuse it with <use>, then package scalable icons with <symbol> and its own viewBox — the foundation of SVG icon sprites. Combine with groups and transforms to keep complex illustrations organised and DRY.',
    },
    {
      icon: '⚡',
      title: 'Use it as a fast SVG scratchpad',
      desc: 'Ignore the lessons and paste any SVG into the editor — an exported icon, a logo, or hand-written markup. The live preview, transparency grid, animation replay, copy, download, and share controls all work on your own code. Faster than spinning up a design tool for a quick tweak.',
    },
  ],

  faqs: [
    { q: 'Do I need to install anything to learn SVG?', a: 'No. The SVG Playground runs entirely in your browser. You can edit SVG markup, see it render live, toggle a transparency grid, replay animations, and save progress without installing an editor, Node.js, or any design software.' },
    { q: 'Is this SVG tutorial good for complete beginners?', a: 'Yes. The first chapters start with the <svg> element, the viewBox and coordinate system, and basic shapes — rect, circle, ellipse, line, polyline, and polygon — with the drawing rendering instantly after every edit. No prior SVG or graphics experience is needed.' },
    { q: 'Does the SVG Playground cover animation?', a: 'Yes. Two full chapters cover it. The CSS chapter teaches transitions, @keyframes, transform-box, transform-origin, and staggered delays. The SMIL chapter teaches animate, animateTransform, animateMotion, begin timing, keyTimes, and repeatCount. Pro lessons then build self-drawing lines, spinners, animated icons, path morphing, and animated gradients.' },
    { q: 'What is the difference between CSS animation and SMIL in SVG?', a: 'CSS animation uses a <style> block with transitions and @keyframes and is great for hover effects and reusable classes. SMIL is built into SVG with animate, animateTransform, and animateMotion — it can animate almost any attribute, including a path’s d for morphing, with no CSS or JavaScript. The playground teaches both.' },
    { q: 'How does the live preview work?', a: 'Your SVG renders in a sandboxed preview that updates as you type. You can switch the background between a transparency grid (checkerboard), white, or dark, and press Replay to restart CSS and SMIL animations from the beginning.' },
    { q: 'Can I use my own SVG code in the editor?', a: 'Yes. Ignore the lesson path and paste any SVG — an icon exported from a design tool, a logo, or hand-written markup. The live preview, background toggle, copy, download, and share controls all work on your own code.' },
    { q: 'Can I download or share what I make?', a: 'Yes. Download saves the current markup as a .svg file you can use anywhere. Share copies a link that encodes your SVG in the URL — nothing is uploaded to a server.' },
    { q: 'Why does my rotation animation drift instead of spinning in place?', a: 'CSS transforms on SVG elements are measured from the SVG origin, not the shape’s centre. Add transform-box: fill-box and transform-origin: center so the rotation pivots around the shape. The CSS animation lessons cover this exact gotcha.' },
    { q: 'Is SVG better than PNG or JPG for icons and logos?', a: 'For icons, logos, and illustrations, usually yes. SVG is vector-based, so it stays sharp at any size and screen density, files are often tiny, and you can style and animate it with CSS. Raster formats like PNG and JPG are better for photographs.' },
    { q: 'How do I make an SVG responsive?', a: 'Keep the viewBox and remove any fixed width and height so it scales to fill its container. Use preserveAspectRatio to control fitting, and add a <title> and role="img" for accessibility. The final Pro Techniques lesson walks through it.' },
  ],

  links: [
    { label: 'GSAP Playground', href: '/gsap-playground/', desc: 'Take SVG and DOM animation further with the GreenSock timeline and tween engine.' },
    { label: 'CSS Animation Generator', href: '/css-animation-generator/', desc: 'Generate CSS @keyframes visually — pairs perfectly with SVG CSS animation.' },
    { label: 'SVG Animation Generator', href: 'https://fwdtools.com/svg-animation-generator/', desc: 'Point-and-click SVG animations you can export, no hand-coding required.' },
    { label: 'HTML Playground', href: '/html-playground/', desc: 'Learn HTML structure — the document SVG graphics live inside.' },
    { label: 'CSS Playground', href: '/css-playground/', desc: 'Learn the styling layer that animates and positions your SVG.' },
  ],
};

export default function SvgPlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}>
        <SvgPlaygroundTool />
      </div>
      <IndexOnly><AdSlot />
      <SeoSection {...seoData} /></IndexOnly>
    </div>
  );
}
