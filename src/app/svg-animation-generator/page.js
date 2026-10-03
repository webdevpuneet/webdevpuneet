import SvgAnimationGeneratorTool from '@/components/SvgAnimationGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'SVG Animation Generator — CSS, SMIL & GSAP Free | webdevpuneet.com',
  description: 'Animate SVG online with CSS @keyframes, SMIL, or GSAP — 50+ presets including rotate, draw stroke, and orbit. Download animated SVG or HTML. Free.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/svg-animation-generator/' },
  icons: { icon: '/icons/svg-animation-generator.svg', shortcut: '/icons/svg-animation-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/svg-animation-generator/',
    siteName: 'webdevpuneet.com',
    title: 'SVG Animation Generator — CSS, SMIL & GSAP Online Free',
    description: 'Animate SVG shapes with CSS, SMIL, or GSAP. 50+ presets — rotate, bounce, draw stroke, orbit. Upload SVG, animate layers, download. Free, no sign-up.',
    images: [{ url: 'https://webdevpuneet.com/images/svg-animation-generator.png', width: 1200, height: 630, alt: 'SVG Animation Generator Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'SVG Animation Generator — CSS, SMIL & GSAP Online Free',
    description: 'Animate SVGs with CSS, SMIL, or GSAP. 50+ presets including draw stroke, orbit, bounce. Upload SVG, animate layers. Free, no sign-up.',
    images: ['https://webdevpuneet.com/images/svg-animation-generator.png'],
  },
};

const seoData = {
  slug: 'svg-animation-generator',
  title: 'SVG Animation Generator — CSS, SMIL & GSAP Online Tool',

  about: {
    title: 'Animate Any SVG Online — CSS, SMIL, or GSAP — Download as Animated SVG or HTML',
    description: `You have an SVG icon or illustration and want it to rotate, bounce, draw its own stroke, or orbit along a path — but writing CSS \`@keyframes\` for SVG properties or looking up the \`<animateTransform>\` SMIL syntax from scratch is a significant time investment. Add a built-in shape, draw a freehand path, or upload an existing SVG here, pick a preset, and download the animated file.\n\nThree animation engines, each for a different need. The **CSS engine** embeds \`@keyframes\` in a \`<style>\` block inside the SVG — zero JavaScript, works as inline SVG, \`<img>\` src, or CSS background-image. 17 presets including Rotate, Bounce, Float, Draw Stroke (the popular stroke-dashoffset draw-on effect), Marching Ants, and Glow. The **SMIL engine** uses native \`<animate>\` and \`<animateTransform>\` elements baked directly into the SVG markup — maximum portability across SVG renderers, including some email clients and desktop apps that block script execution. The **GSAP engine** adds elastic easing, Orbit via MotionPathPlugin, and Figure-8 motion paths that CSS and SMIL cannot produce on their own — output is a self-contained HTML file with GSAP and its plugins loaded from the GreenSock CDN only when an animation actually needs them.\n\nUpload any SVG file and the parser reads the DOM, extracts each child element — path, circle, rect, group — as an independently animatable layer, and preserves the original defs, gradients, and inline styles so nothing breaks on export. Freehand paths you draw on the canvas get a normalized \`pathLength="1"\` and matching \`stroke-dasharray\`, which is what makes the Write-On and Erase presets scrub cleanly regardless of the path's actual length. Dragging a shape composes a \`translate()\` on top of its existing transform rather than overwriting it, so rotation or scale from an earlier edit survives a reposition. Adjust duration, delay, easing, and repeat count per animation with live preview, and every change is pushed onto an undo/redo history stack. Because SVG is vector, the animated output is sharp at any resolution — the same file looks correct on a laptop, 4K monitor, and Retina iPhone — and is typically far smaller than an equivalent GIF, with no runtime JavaScript required for the CSS or SMIL output.`,
  },

  features: [
    '9 shape types — circle, rectangle, ellipse, star, heart, arrow, triangle, line, and text — add any to the canvas',
    'Upload any SVG file — each element (path, circle, rect, g, etc.) becomes an independently animatable layer',
    'CSS engine — 17 presets, @keyframes embedded in <style> block, zero JavaScript, works as inline SVG or <img> src; use our [CSS Animation Generator](/css-animation-generator) for animating HTML elements with CSS',
    'SMIL engine — 15 presets, native SVG <animate>/<animateTransform> elements, maximum portability',
    'GSAP engine — 17 presets including Elastic, Orbit (MotionPathPlugin), and Figure-8 motion paths',
    'CSS stroke animations — Draw Stroke (stroke-dashoffset draw-on), Marching Ants, Stroke Pulse, Glow presets',
    'Per-animation duration, delay, easing, and repeat count controls with live preview; browse ready-made animations in our [Animated SVG Icons](https://fwdtools.com/animated-svg-icons/) library',
    'Canvas backgrounds: Dark, Light, Dots, Grid, Transparent',
    'Download as .svg (CSS and SMIL) or .html (GSAP with CDN scripts)',
    '100% browser-based — no server, no upload, no sign-up required; convert raster images to SVG with our [Image to SVG](https://fwdtools.com/image-to-svg/) converter before animating',
  ],

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Add a shape or upload your SVG', text: 'Start by either adding a built-in shape — click any shape button at the top of the canvas to add a circle, rectangle, ellipse, star, heart, arrow, triangle, line, or text element — or click Upload SVG to load an existing SVG file. When you upload an SVG, the tool parses the markup and extracts each child element (path, circle, rect, g, etc.) as a separate, independently animatable layer in the layers panel. You can also draw freehand shapes directly on the canvas using the draw mode. Import a raster image first with the [Image to SVG](https://fwdtools.com/image-to-svg/) converter, then bring it here to animate.' },
      { title: 'Choose an animation engine', text: 'Select your animation engine from the three tabs above the presets panel. Choose **CSS** for zero-dependency animated SVG — @keyframes are embedded inside a <style> block in the SVG, so the file works as an <img> src, inline SVG, or CSS background-image with no JavaScript. Choose **SMIL** for native SVG animation elements (<animate>, <animateTransform>) baked into the markup — maximum portability across SVG renderers including email clients and some desktop apps. Choose **GSAP** for the most sophisticated animations: elastic easing, Orbit via MotionPathPlugin, Figure-8 motion paths — output is a self-contained HTML file.' },
      { title: 'Click a preset to apply it', text: 'Browse the preset list on the left and click any preset name — the canvas preview plays the animation immediately. For CSS and SMIL: Rotate, Spin CCW, Pulse, Zoom In, Bounce, Float, Move Right, Shake, Wiggle, Skew, Fade, Blink, Color Cycle, Rainbow, Draw Stroke (the stroke-dashoffset draw-on effect), Write On, and Erase. For GSAP: all CSS presets plus Elastic, Orbit (circular path via MotionPathPlugin), and Figure-8. The Draw Stroke preset is especially popular — it progressively reveals a stroked path as if drawing itself, used for logo reveals, signature animations, and diagram walkthroughs.' },
      { title: 'Fine-tune duration, delay, easing, and repeat', text: 'Use the animation controls panel to adjust the parameters. Set Duration in seconds — shorter for snappy micro-animations, longer for flowing motion. Set Delay to stagger multiple layers. Choose an Easing function from the dropdown: ease, linear, ease-in, ease-out, ease-in-out, bounce, or elastic (GSAP only). Set Repeat count — use "infinite" for a looping icon, or "1" for a play-once animation that holds the end state with animation-fill-mode: forwards. Click the Replay button at any time to restart the animation from the beginning and preview the result.' },
      { title: 'Animate multiple layers independently', text: 'Select any layer in the layers panel to animate it separately from other elements. Each layer can have its own preset, duration, delay, and easing — allowing complex multi-part animations like a logo where the background fades in, then the wordmark draws itself, then an icon bounces. Reorder layers with drag-and-drop, duplicate a layer to copy its animation settings as a starting point, or delete unused elements. Undo and redo are available throughout the session.' },
      { title: 'Export the animated file', text: 'Click Export SVG to download an animated .svg file for CSS and SMIL animations — this is a single portable file with all animation code embedded. Click Export HTML for GSAP animations — the HTML file includes GSAP and MotionPathPlugin loaded from the GreenSock CDN plus all timeline code, ready to open in any browser. Click Copy Code to copy just the animation block (the CSS @keyframes rules, SMIL elements, or GSAP script) if you want to manually integrate the animation into an existing SVG or HTML file.' },
    ],
  },

  useCases: [
    {
      icon: '△',
      title: 'Create an animated SVG icon — checkmark, arrow, or heart — with zero JavaScript',
      desc: 'Use the CSS engine to embed @keyframes directly in the SVG. A single .svg file contains both the vector artwork and the animation code, so it works as an <img> src or inline SVG with no JavaScript dependency and no npm packages.',
    },
    {
      icon: '⚡',
      title: 'Make an SVG path draw itself on screen with the stroke-dashoffset technique',
      desc: 'Apply the Draw Stroke preset to animate a stroked path from invisible to fully drawn. The stroke-dashoffset technique progressively reveals the stroke length, creating the "writing itself" effect used in logo reveals, signature animations, and diagram walkthroughs.',
    },
    {
      icon: '◎',
      title: 'Build a branded loading spinner that matches your UI color scheme',
      desc: 'Apply the CSS Rotate or Spin CCW preset with 0.6–1s duration and infinite repeat to an SVG circle or arc. Export as an animated .svg and use it as an <img> src — no JavaScript spinner library, no GIF artifacts at high DPI. For more spinner styles, see our [CSS Loader Generator](/css-loader-generator).',
    },
    {
      icon: '▦',
      title: 'Add subtle motion to individual layers of an SVG illustration',
      desc: 'Upload a multi-layer SVG and animate individual paths and groups independently — floating leaves, pulsing highlights, color-cycling details. GSAP\'s elastic and bounce easing make character animations feel natural and springy.',
    },
    {
      icon: '✦',
      title: 'Animate an element along a circular orbit or figure-8 path with GSAP',
      desc: 'Use GSAP\'s Orbit and Figure-8 MotionPathPlugin presets for visual effects CSS transforms cannot produce alone — orbital loaders, decorative particle effects, and dashboard visualizations where elements trace a defined path.',
    },
    {
      icon: '≡',
      title: 'Compare how CSS, SMIL, and GSAP implement the same animation to understand the differences',
      desc: 'Apply the same preset — a rotating circle or a bouncing square — across all three engines and download each output. Seeing the CSS @keyframes, SMIL <animateTransform>, and GSAP gsap.to() code side by side is the fastest way to learn SVG animation fundamentals. Fine-tune easing curves with our [CSS Easing Generator](/css-easing-generator).',
    },
  ],

  faqs: [
    {
      q: 'What is the difference between CSS, SMIL, and GSAP for SVG animation?',
      a: 'CSS animation embeds @keyframes rules in a <style> block inside the SVG file — zero JavaScript, works as inline SVG, <img> src, or CSS background. SMIL uses native SVG animation elements (<animate>, <animateTransform>) baked into the markup — also zero JavaScript and maximum portability. GSAP is a JavaScript library enabling richer animations like elastic easing, motion paths, and timeline sequencing. GSAP output is a self-contained HTML file rather than a standalone SVG. For icons and simple illustrations use CSS; for complex interactive animations use GSAP.',
    },
    {
      q: 'How do I make an SVG draw itself on screen?',
      a: 'Use the Draw Stroke CSS preset. The technique sets stroke-dasharray to the total path length and animates stroke-dashoffset from that length down to 0 — as the offset decreases, progressively more stroke becomes visible, creating the "drawing itself" illusion. The preset calculates the values automatically. It works on any <path>, <circle>, or <line> element that has a visible stroke. This is used for logo reveals, signature animations, and diagram walkthroughs.',
    },
    {
      q: 'Can I upload my own SVG and animate individual elements separately?',
      a: 'Yes. Upload any .svg file and the tool parses the SVG XML, extracting each child element (circle, rect, path, g, etc.) as a separate layer. Click any layer to select it, then apply CSS, SMIL, or GSAP presets to that specific element independently. Gradients, clip-paths, and filter definitions from the original SVG are preserved in the exported output.',
    },
    {
      q: 'Does an animated SVG work as an <img> src or CSS background-image?',
      a: 'CSS and SMIL animated SVGs play correctly when used as an <img> src or CSS background-image — the animation is embedded in the SVG file itself, no JavaScript context is needed. GSAP animations require JavaScript and only work when the SVG is inline in the HTML (not as <img> src or background-image). For maximum portability across embedding contexts, use the CSS engine.',
    },
    {
      q: 'What GSAP plugins are used and are they free to use commercially?',
      a: 'Only free GSAP plugins are used: GSAP Core and MotionPathPlugin. Both are free for commercial projects under the GreenSock Standard License. The paid Club GreenSock plugins (MorphSVG, DrawSVG, SplitText, ScrambleText) are not included. The exported HTML loads GSAP from the official GreenSock CDN — no npm install or local files needed.',
    },
    {
      q: 'How do I use an animated SVG in a React or Next.js project?',
      a: 'For React, use the CSS engine output — export the animated SVG, then either inline it as a JSX component (converting SVG attributes to camelCase) or import it with next/image or as a module. CSS animations embedded in the SVG file play correctly in both cases. For GSAP animations in React, the exported HTML is a reference — recreate the animation using the @gsap/react package in your component.',
    },
    {
      q: 'Do CSS and SMIL SVG animations work in Firefox and Safari?',
      a: 'CSS @keyframes animations embedded in SVG work in all modern browsers: Chrome, Firefox, Safari, and Edge. SMIL animations work in Chrome, Firefox, and Safari. Both are supported without vendor prefixes. The main compatibility caveat is that animations in SVG used as <img> src or CSS background-image are restricted from JavaScript and network access — but pure CSS and SMIL animations play correctly in those contexts.',
    },
    {
      q: 'Is it better to use an animated SVG or a Lottie animation for a web icon?',
      a: 'Animated SVG with CSS is usually the better choice for simple icons — it requires zero JavaScript, has no runtime dependency, and the file is typically 1–5 KB. Lottie requires a 60–70 KB JavaScript library (lottie-web) plus the JSON animation file. Use Lottie when you need timeline scrubbing, complex After Effects animations with masks and mattes, or interactivity that CSS animations cannot support. For a loading spinner, bounce icon, or draw-stroke logo, an animated SVG is the lighter and simpler solution.',
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SVG Animation Generator',
  url: 'https://webdevpuneet.com/svg-animation-generator/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online SVG animation generator supporting CSS @keyframes, SMIL, and GSAP animation engines with 50+ presets, SVG upload with layer animation, stroke draw animations, and animated SVG/HTML download. 100% client-side.',
  featureList: seoData.features.join(', '),
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'SVG Animation Generator', item: 'https://webdevpuneet.com/svg-animation-generator/' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: seoData.faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function SvgAnimationGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><SvgAnimationGeneratorTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...seoData} /></IndexOnly>

    </div>
  );
}
