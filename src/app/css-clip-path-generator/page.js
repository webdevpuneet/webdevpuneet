import CssClipPathGenerator from '@/components/CssClipPathGenerator';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'CSS Clip-path Generator — Free Polygon, Circle, Ellipse, Inset | webdevpuneet.com',
  description: 'Visual CSS clip-path generator with draggable handles and 18 presets — polygon, circle, ellipse, and inset. Export CSS, Tailwind, or React. Free.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/css-clip-path-generator/' },
  icons: { icon: '/icons/css-clip-path-generator.svg', shortcut: '/icons/css-clip-path-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/css-clip-path-generator/',
    siteName: 'webdevpuneet.com',
    title: 'CSS Clip-path Generator — Polygon, Circle, Ellipse, Inset',
    description: 'Drag polygon handles on a live preview to build any clip-path shape. 18 presets, 4 shape modes, CSS/Tailwind/React export. The most visual clip-path tool online.',
    images: [{ url: 'https://webdevpuneet.com/images/css-clip-path-generator.png', width: 1200, height: 630, alt: 'CSS Clip-path Generator Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'CSS Clip-path Generator — Drag Polygon Handles, 18 Presets',
    description: 'Build CSS clip-path shapes visually. Drag handles, pick from 18 presets, export CSS, Tailwind, or React. 100% free and browser-only.',
    images: ['https://webdevpuneet.com/images/css-clip-path-generator.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is CSS clip-path and what does it do?',
      acceptedAnswer: { '@type': 'Answer', text: 'The CSS clip-path property clips an element to a defined shape — only the pixels inside the clipping region are visible, the rest is hidden. It does not remove the element from the document flow (unlike display:none), and unlike border-radius it supports complex polygon shapes. Clip-path can produce triangles, stars, hexagons, arrows, speech bubbles, and any polygon you define. It works on images, divs, buttons, and any HTML element. Modern browsers support it fully without vendor prefixes.' },
    },
    {
      '@type': 'Question',
      name: 'What clip-path shape functions are available in CSS?',
      acceptedAnswer: { '@type': 'Answer', text: 'CSS clip-path supports five shape functions: polygon() accepts any number of x/y coordinate pairs and creates custom shapes; circle(radius at center-x center-y) clips to a circle; ellipse(rx ry at center-x center-y) clips to an ellipse; inset(top right bottom left round radius) clips to a rectangle with optional rounded corners; and path() accepts an SVG path string for complex shapes including curves. The polygon() function is the most versatile for custom UI shapes.' },
    },
    {
      '@type': 'Question',
      name: 'How do polygon percentages work in clip-path?',
      acceptedAnswer: { '@type': 'Answer', text: 'Polygon coordinates are specified as percentages of the element\'s bounding box. The origin (0% 0%) is the top-left corner, (100% 0%) is top-right, (100% 100%) is bottom-right, and (0% 100%) is bottom-left. A triangle pointing upward would be: polygon(50% 0%, 100% 100%, 0% 100%). Coordinates can exceed 0–100% to create shapes that extend beyond the element boundary. Using percentages makes clip-path responsive — the shape scales with the element.' },
    },
    {
      '@type': 'Question',
      name: 'Can I animate clip-path in CSS?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. CSS transitions and animations work on clip-path when both the start and end values use the same function type and the same number of points. For example, you can transition between two polygon() shapes if both have the same number of vertices. To animate from a polygon to a hidden state, transition to polygon(50% 50%, 50% 50%, 50% 50%) — all points converge to the center. Browsers interpolate the coordinates smoothly using linear interpolation.' },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between clip-path and border-radius?',
      acceptedAnswer: { '@type': 'Answer', text: 'border-radius only produces rounded rectangle shapes (circles and ellipses included). clip-path can produce any shape including polygons, triangles, stars, arrows, and hexagons — shapes that border-radius cannot. Both properties clip the visual rendering of an element. However, clip-path does not affect the element layout box (the element still occupies its original space), while border-radius only affects corners. clip-path is more powerful but requires more complex coordinate specification.' },
    },
    {
      '@type': 'Question',
      name: 'How do I use clip-path in Tailwind CSS?',
      acceptedAnswer: { '@type': 'Answer', text: 'Tailwind CSS does not include clip-path utilities by default. Use an arbitrary value with square-bracket syntax: className="[clip-path:polygon(50%_0%,100%_100%,0%_100%)]". Note that spaces in arbitrary values must be replaced with underscores in Tailwind class names. This tool generates the Tailwind arbitrary value format directly when you select the Tailwind export tab — just copy and paste into your className.' },
    },
    {
      '@type': 'Question',
      name: 'Does clip-path affect mouse events and clickable areas?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes — by default, clipped areas are also non-interactive. Pixels outside the clip region do not receive mouse events (hover, click). This is usually the desired behavior for shaped buttons and images. If you need the full element area to be interactive regardless of clipping, you can apply the clip-path to a child element only, leaving the parent element fully interactive.' },
    },
    {
      '@type': 'Question',
      name: 'What browser support does clip-path have?',
      acceptedAnswer: { '@type': 'Answer', text: 'CSS clip-path with basic shapes (polygon, circle, ellipse, inset) is supported in all modern browsers — Chrome, Firefox, Safari, Edge — without vendor prefixes. The path() function has broad support in modern browsers. clip-path on SVG elements has slightly different rules. Overall browser support exceeds 96% of global users as of 2025, making it safe to use in production without fallbacks for most projects.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CSS Clip-path Generator',
  url: 'https://webdevpuneet.com/css-clip-path-generator/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Visual CSS clip-path generator with draggable polygon handles, 18 presets, and 4 shape modes. Export CSS, Tailwind arbitrary values, or React inline styles. 100% client-side.',
  featureList: [
    '18 preset shapes: triangle, diamond, pentagon, hexagon, star, arrow, chevron, cross, and more',
    'Draggable polygon handles — click and drag to reshape any polygon vertex',
    'Click on the preview to add new polygon points',
    'Right-click a handle to delete a polygon point',
    'Four shape modes: polygon, circle, ellipse, inset',
    'Slider controls for circle, ellipse, and inset parameters',
    'Three export formats: CSS, Tailwind arbitrary value, React inline style',
    'Show/hide outside region toggle for clipping visualization',
    'Three preview backgrounds: gradient, solid color, checkerboard pattern',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'CSS Clip-path Generator', item: 'https://webdevpuneet.com/css-clip-path-generator/' },
  ],
};

const SEO = {
  slug: 'css-clip-path-generator',
  title: 'CSS Clip-path Generator Online — Polygon, Circle, Ellipse, Inset',
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Pick a preset shape', text: 'Choose from the 18 preset shapes listed in the right panel — Triangle Up/Down/Left/Right, Corner variants, Diamond, Pentagon, Hexagon, Star, Arrow, Chevron, and more. The preview updates immediately to show the clip-path applied to the preview element.' },
      { title: 'Drag polygon handles to reshape', text: 'For polygon shapes, each vertex appears as a draggable purple handle on the preview canvas. Click and drag any handle to move it and reshape the polygon in real time. The clip-path coordinates update live as you drag.' },
      { title: 'Add or remove polygon points', text: 'Click anywhere on the preview canvas (not on an existing handle) to add a new polygon vertex at that position. Right-click any handle to delete that point. A minimum of 3 points is required to maintain a valid polygon.' },
      { title: 'Switch shape modes', text: 'Click Polygon, Circle, Ellipse, or Inset in the Shape Type selector to change the clip-path function. Circle and Ellipse modes show radius and center position sliders instead of handles. Inset mode provides four side sliders (top, right, bottom, left) and a border-radius slider for rounded rectangular clips.' },
      { title: 'Toggle the outside region overlay', text: 'Click "Show outside" at the top of the preview to display a faint overlay over the clipped region. This makes it easy to visualize exactly which pixels will be hidden and where the visible shape boundary falls.' },
      { title: 'Change the preview background', text: 'Switch the preview background between Gradient, Solid color, and Checkerboard pattern to see how the clipped element looks in different contexts. Use Checkerboard to visualize the clipped transparent areas accurately.' },
      { title: 'Export the code', text: 'Select CSS, Tailwind, or React from the export format tabs. CSS gives the clip-path property ready to paste into a stylesheet. Tailwind gives the [clip-path:polygon(...)] arbitrary value format. React gives the clipPath style prop in camelCase. Click Copy to copy the output.' },
    ],
  },
  about: {
    title: 'Create Any CSS clip-path Shape Visually — Drag the Polygon Handles, Copy the Code',
    description: `You need a diagonal section divider, a hexagon image crop, or an arrow-shaped button — but writing \`clip-path: polygon(50% 0%, 100% 100%, 0% 100%)\` coordinates by hand and counting pixels is brutal. Drag the handles on the preview here and the CSS updates in real time.\n\nThe polygon editor lets you drag any vertex, click to add new points, and right-click to remove them. All 18 presets — triangle, diamond, pentagon, hexagon, star, arrow, chevron, parallelogram, trapezoid, cross, message bubble, and more — load instantly as a starting point you can reshape. Switch between four shape modes: **polygon()** for custom multi-point shapes, **circle()** with radius and center sliders, **ellipse()** for oval crops, and **inset()** for rectangular clips with rounded corners. The clipped region is shown as a faint overlay so you can see exactly what will be hidden.\n\nEvery preset point is stored as an x/y percentage pair rather than a pixel value, which is the mechanism that keeps a shape correct at any element size — \`polygon()\` interpolates each vertex relative to the element's own bounding box, so a hexagon crop still meets its edges cleanly whether the image is 80px or 800px wide, with no separate breakpoint math required. This is also what makes clip-path fundamentally different from \`border-radius\`: border-radius only rounds the four corners of a box, while clip-path discards everything outside an arbitrary boundary you define, and it does so without touching the element's layout box — the element still occupies its original space in the document, receives its original margin and padding, and only its painted pixels are hidden. A side effect worth knowing before you rely on it: clicks and hover events don't fire outside the visible clip region, which is usually what you want for a shaped button but can surprise you on a clipped card if you expected the invisible corners to stay clickable. \`path()\`, the fifth clip-path function for SVG-style curves, isn't exposed here since polygon, circle, ellipse, and inset cover the vast majority of UI shapes with simpler percentage-based controls.\n\nExports: plain CSS (\`clip-path: polygon(...);\`), Tailwind arbitrary value format (\`[clip-path:polygon(...)]\`) ready to paste into a JSX \`className\`, and React inline style object (\`clipPath: '...'\`). All processing runs in your browser — nothing sent to any server.`,
  },
  features: [
    '18 preset shapes: triangle, diamond, pentagon, hexagon, star, arrow, chevron, parallelogram, trapezoid, cross, message bubble, and more',
    'Draggable polygon handles — drag any vertex directly on the live preview to reshape; apply CSS transforms to those shapes with our [CSS Transform Generator](/css-transform-generator)',
    'Click the preview to add new points to any polygon, right-click to remove a point',
    'Four shape modes with dedicated controls: polygon, circle, ellipse, inset()',
    'Slider controls for radius, center X/Y (circle/ellipse) and all four inset sides with border-radius',
    'Three export formats: CSS property, Tailwind arbitrary value, React inline style',
    'Show/hide outside toggle — visualize the clipped vs visible region',
    'Three preview backgrounds: color gradient, solid color picker, checkerboard pattern; add box shadows behind clipped elements with our [Box Shadow Generator](/box-shadow-generator)',
  ],
  useCases: [
    { icon: '🔷', title: 'Crop a profile photo or hero image to a hexagon or diamond without Photoshop', desc: 'Apply clip-path to an img element — pure CSS that scales responsively with the element and requires no image editing software.' },
    { icon: '▶', title: 'Create an arrow-shaped CTA button or parallelogram navigation tab', desc: 'Use clip-path on a standard button element — polygon coordinates are percentages so the shape scales correctly at any button size.' },
    { icon: '✦', title: 'Build a diagonal or chevron section divider between page sections', desc: 'Apply clip-path to a full-width section background div to create a clean angled transition between sections — no SVG, no negative margin hacks. Layer a mesh gradient behind it with our [Mesh Gradient Generator](/mesh-gradient-generator).' },
    { icon: '💬', title: 'Make a CSS tooltip or speech bubble pointer shape', desc: 'Use polygon() to cut a triangle pointer into a tooltip div. Combine with a solid background color for a clean callout without extra markup.' },
    { icon: '⭐', title: 'Mask an image or div to a star, badge, or hexagon shape', desc: 'Clip images or colored backgrounds to badge shapes for achievement icons, avatar frames, and icon systems — no image files needed, fully CSS.' },
    { icon: '🎞️', title: 'Animate a CSS shape reveal on page load or scroll', desc: 'CSS transitions animate smoothly between two polygon() shapes with the same number of vertices. Transition from all-points-at-center to the full polygon for a reveal effect — no JavaScript. Build the animation keyframes with our [CSS Animation Generator](/css-animation-generator).' },
  ],
  faqs: [
    { q: 'How do I create a triangle, hexagon, or star shape with CSS?', a: 'Use the CSS clip-path property with polygon() coordinates. This tool generates the correct polygon() value — pick the Triangle, Hexagon, or Star preset, then copy the CSS output. Clip-path works on any HTML element including images, divs, and buttons, and uses percentage coordinates so the shape scales responsively.' },
    { q: 'What is CSS clip-path and how does it work?', a: 'clip-path clips an element to a defined shape — only pixels inside the shape are visible. It supports polygon() for custom multi-point shapes, circle() for circular clips, ellipse() for ovals, and inset() for rectangular clips with optional rounded corners. It works on any HTML element without affecting document layout.' },
    { q: 'How do polygon percentages work in clip-path?', a: "Polygon coordinates are percentages of the element's bounding box. 0% 0% is top-left, 100% 0% is top-right, 100% 100% is bottom-right, 0% 100% is bottom-left. A triangle pointing up is polygon(50% 0%, 100% 100%, 0% 100%). Percentages make the shape responsive — it scales with the element at any size." },
    { q: 'Can I animate CSS clip-path?', a: 'Yes — CSS transitions animate clip-path smoothly when both the start and end values use the same shape function and the same number of points. To animate a reveal, transition from all points collapsed to the center (polygon(50% 50%, 50% 50%, 50% 50%)) to the full polygon. Both states need the same vertex count.' },
    { q: 'How do I use clip-path in Tailwind CSS?', a: 'Tailwind has no built-in clip-path utilities — use arbitrary value syntax: className="[clip-path:polygon(50%_0%,100%_100%,0%_100%)]". Spaces inside arbitrary values must be replaced with underscores. This tool generates the Tailwind format directly in the Tailwind export tab — copy and paste.' },
    { q: 'Does clip-path affect which area is clickable?', a: 'Yes — clipped areas are also non-interactive. Mouse events (hover, click) only register inside the visible clip region. If you need the full element area to be clickable regardless of the clip shape, apply clip-path to a child element only, keeping the parent fully interactive.' },
    { q: 'What is the difference between clip-path and border-radius?', a: 'border-radius only rounds the corners of a rectangle. clip-path supports any shape — triangles, stars, arrows, hexagons, polygons with any number of vertices. Both clip visual rendering but clip-path is far more flexible for non-rectangular shapes.' },
    { q: 'Is CSS clip-path supported in all browsers?', a: 'Yes — polygon, circle, ellipse, and inset are supported in all modern browsers (Chrome, Firefox, Safari, Edge) without vendor prefixes. Global support exceeds 96% as of 2025. Safe to use in production without fallbacks for most projects.' },
  ],
};

export default function CssClipPathGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><CssClipPathGenerator /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
