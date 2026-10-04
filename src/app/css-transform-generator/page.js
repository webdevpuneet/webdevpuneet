import CssTransformGeneratorTool from '@/components/CssTransformGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'CSS Transform Generator — Free Rotate, Scale, Translate & Skew | webdevpuneet.com',
  description: 'Free CSS transform generator — visual sliders for rotate, scale, translate, and skew with live preview and 3D perspective. Export CSS or Tailwind.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/css-transform-generator/' },
  icons: { icon: '/icons/css-transform-generator.svg', shortcut: '/icons/css-transform-generator.svg' },
  openGraph: { type: 'website', url: 'https://webdevpuneet.com/css-transform-generator/', siteName: 'webdevpuneet.com', title: 'CSS Transform Generator — Rotate, Scale, Translate & Skew', description: 'Visual CSS transform builder — sliders for translate, rotate, scale, skew with live preview. Export CSS, Tailwind, or React. Free.', images: [{ url: 'https://webdevpuneet.com/images/css-transform-generator.png', width: 1200, height: 630, alt: 'CSS Transform Generator' }], locale: 'en_US' },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: 'CSS Transform Generator — Rotate, Scale, Skew', description: 'Visual sliders for CSS translate, rotate, scale, skew with live preview. Export CSS, Tailwind, React. Free.', images: ['https://webdevpuneet.com/images/css-transform-generator.png'] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I rotate an element in CSS?', acceptedAnswer: { '@type': 'Answer', text: 'Use the CSS transform property with the rotate() function: transform: rotate(45deg); rotates the element 45 degrees clockwise. For 3D rotation around the horizontal axis use rotateX(), and rotateY() for the vertical axis. By default rotation happens around the element\'s center — change this with transform-origin. The RotateZ slider in this tool controls the standard 2D rotation; RotateX and RotateY add 3D tilting effects that require perspective to be visible.' } },
    { '@type': 'Question', name: 'How do I move an element without affecting the layout in CSS?', acceptedAnswer: { '@type': 'Answer', text: 'Use transform: translateX() and translateY() instead of changing margin, top, or left. CSS transforms are layout-neutral — they reposition the visual rendering of the element without affecting surrounding elements or triggering layout reflow. The space the element occupies in normal flow is preserved exactly. This makes translate the correct technique for hover lift effects, slide-in animations, and offset positioning.' } },
    { '@type': 'Question', name: 'What is transform-origin and when do I need to change it?', acceptedAnswer: { '@type': 'Answer', text: 'transform-origin defines the anchor point around which all transform functions are applied. The default is 50% 50% (center), so rotate() spins around the center and scale() expands from the center outward. Change it to "top left" to make a card fold from its top-left corner, "bottom center" to make a tooltip grow upward from its pointer, or "left center" to make an element expand from its left edge. The 3×3 grid picker in this tool maps directly to the nine standard transform-origin positions.' } },
    { '@type': 'Question', name: 'Why does the order of transform functions matter?', acceptedAnswer: { '@type': 'Answer', text: 'Transform functions are applied sequentially, each in the coordinate system left by the previous one. translate() then rotate() moves first, then rotates in place at the new location. rotate() then translate() rotates first, then moves along the rotated axes — producing a completely different visual result. This tool applies transforms in a standard order: translate → rotate → scale → skew, which produces predictable results for common UI patterns.' } },
    { '@type': 'Question', name: 'How do CSS 3D transforms and perspective work?', acceptedAnswer: { '@type': 'Answer', text: 'CSS 3D transforms use rotateX() and rotateY() to tilt elements around the horizontal and vertical axes, creating depth illusions. The perspective value — applied to the parent container — controls how dramatic the depth distortion is: small values like 200px create a strong fisheye effect, large values like 1000px create subtle nearly flat projection. The perspective slider in this tool appears automatically when any 3D property is set to a non-zero value so you can tune the effect immediately.' } },
    { '@type': 'Question', name: 'How do I use CSS transform for hover animations?', acceptedAnswer: { '@type': 'Answer', text: 'Generate the target transform value with this tool, then apply it inside a :hover rule with a transition on the default state: .card { transform: none; transition: transform 0.2s ease; } .card:hover { transform: translateY(-4px) scale(1.02); } Because transforms are GPU-composited, hover animations using transform run at 60fps without triggering layout reflow — always prefer transform over animating top, left, or margin for hover effects.' } },
    { '@type': 'Question', name: 'How do I flip an image or icon horizontally with CSS?', acceptedAnswer: { '@type': 'Answer', text: 'Use transform: scaleX(-1); to flip an element horizontally — it mirrors it around the vertical axis. This lets one SVG arrow icon serve both left-pointing and right-pointing directions without a separate file. scaleY(-1) flips vertically. The Flip H and Flip V presets in this tool load these transforms instantly. For icon systems, apply a .icon-flip-h modifier class with scaleX(-1) rather than maintaining duplicate mirrored assets.' } },
    { '@type': 'Question', name: 'How do I export CSS transforms for Tailwind or React?', acceptedAnswer: { '@type': 'Answer', text: 'Switch to the Tailwind export tab to get arbitrary-value utility classes like [transform:translateY(-4px)_scale(1.02)] that work with Tailwind v3 and v4. Switch to the React tab to get a JSX style prop with camelCase properties: style={{ transform: "translateX(20px) rotate(45deg)", transformOrigin: "center center" }}. Both exports include the transform-origin value alongside the transform string.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CSS Transform Generator',
  url: 'https://webdevpuneet.com/css-transform-generator/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free — Visual CSS transform generator with sliders for translate, rotate, scale, skew, transform-origin, 3D perspective, and CSS/Tailwind/React export.',
  featureList: ['Sliders for all 10 transform properties', 'Live preview', 'Transform-origin 9-point grid picker', 'Perspective slider for 3D', '10 presets', 'Export CSS/Tailwind/React'],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'CSS Transform Generator', item: 'https://webdevpuneet.com/css-transform-generator/' },
  ],
};

const SEO = {
  slug: 'css-transform-generator',
  title: 'CSS Transform Generator — Rotate, Scale, Translate & Skew',

  about: {
    title: 'Build CSS Transform Values Visually — Rotate, Scale, Translate, Skew With Live Preview',
    description: `You want a card hover that lifts slightly — \`translateY(-4px) scale(1.02)\` — but tweaking those numbers in browser DevTools until it feels right is tedious. You need a \`skewY(-3deg)\` section divider but aren't sure if -3 or -5 degrees looks better. Use the sliders here and watch the live preview update in real time.\n\nPrecision controls for all 10 transform functions: **translateX/Y** (move), **translateZ** (depth), **rotateX/Y/Z** (spin), **scaleX/Y** (resize and flip), **skewX/Y** (shear). A 3×3 grid picker sets the **transform-origin** anchor point — center by default, top-left for folding effects, bottom-center for tooltip reveals. The **perspective** slider appears automatically when any 3D property is non-zero — drag it left for dramatic depth, right for flat projection.\n\nThe generator builds a single \`transform\` string by composing functions in a fixed order — translate, then rotate, then scale, then skew — because each function operates in the coordinate space left behind by the one before it. Translating first and rotating second moves the element, then spins it in place at that new position; reversing the order rotates the axes themselves before the move happens, sending the element somewhere else entirely. That's also why transform-origin matters: every rotate, scale, and skew is anchored to whichever point the 3×3 grid sets, so changing it from the default center to a corner changes the pivot for every function that follows, not just rotation. Because \`transform\` and \`perspective\` are handled by the compositor rather than the layout engine, none of these changes trigger reflow — the browser can animate translate, rotate, and scale at 60fps even on complex pages, which is why transform is preferred over animating \`top\`, \`left\`, or \`margin\` for hover and keyframe transitions.\n\nTen presets load common patterns instantly: Flip H, Flip V, Rotate 45°, Scale Up, Scale Down, Skew, Tilt 3D, Slide Right. The real-time transform string in the header shows the current value as you drag. Export as CSS, Tailwind arbitrary value classes, or a React inline style object with camelCase properties — each export also carries the transform-origin value whenever it differs from center.`,
  },

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Load a preset or start from scratch', text: 'Click any of the 10 preset tiles in the presets bar — None, Flip H, Flip V, Rotate 45°, Rotate 90°, Scale Up, Scale Down, Skew, Tilt 3D, Slide Right — to load a useful starting configuration instantly. The live preview updates immediately.' },
      { title: 'Adjust translate sliders', text: 'Use the Translate X and Y sliders to move the element in pixels — positive X moves right, negative moves left, positive Y moves down, negative moves up. TranslateZ adds depth displacement along the Z axis (relevant only when perspective is active). Use the number inputs for precise values.' },
      { title: 'Rotate the element', text: 'The RotateZ slider spins the element clockwise in degrees (−360 to 360). RotateX tilts the top and bottom toward or away from the viewer. RotateY tilts the left and right sides. RotateX and RotateY require a perspective value to produce a visible 3D effect.' },
      { title: 'Scale and skew', text: 'Scale X and Scale Y resize the element along each axis — values greater than 1 enlarge, values between 0 and 1 shrink, negative values flip and mirror. Skew X and Skew Y apply diagonal shearing distortion in degrees, useful for section dividers and card accent shapes.' },
      { title: 'Set transform-origin', text: 'Click one of the nine cells in the Transform Origin 3×3 grid picker to set the anchor point for all transform operations. The center cell (default) spins around the element center. Top-left is used for folding effects, bottom-center for tooltip reveals expanding upward.' },
      { title: 'Tune perspective for 3D effects', text: 'When any 3D property (RotateX, RotateY, or TranslateZ) is non-zero, the Perspective slider appears automatically. Drag left for a dramatic depth effect (200–400px) and right for a flatter, nearly isometric projection (1000–2000px).' },
      { title: 'Export the code', text: 'Switch between the CSS, Tailwind, and React export tabs at the bottom of the right panel. CSS gives the transform and transform-origin properties. Tailwind gives arbitrary value classes. React gives a camelCase style object. Click Copy to copy the output.' },
    ],
  },

  features: [
    'Sliders and number inputs for all 10 transform properties: translateX/Y/Z, rotateX/Y/Z, scaleX/Y, skewX/Y',
    'Live preview box with grid background, crosshair origin indicator, and color swatch options',
    'Transform-origin 3×3 grid picker — select any of 9 standard anchor positions visually',
    'Perspective slider that auto-appears when 3D transform properties are non-zero',
    '10 presets: Flip H/V, Rotate 45°/90°, Scale Up/Down, Skew, Tilt 3D, Slide Right, and more',
    'Real-time transform string shown in the header for instant reference while adjusting sliders',
    'Export as CSS with transform and transform-origin properties; add animation to your transforms with our [CSS Animation Generator](/css-animation-generator)',
    'Export as Tailwind arbitrary value classes for utility-first stylesheets',
    'Export as React inline style object with camelCase properties',
    '100% browser-based — no sign-up, all processing runs client-side; add box shadow depth with our [Box Shadow Generator](/box-shadow-generator)',
  ],

  useCases: [
    {
      icon: '⚡',
      title: 'Get the exact translateY and scale values for a card hover lift effect',
      desc: 'A typical card hover uses transform: translateY(-4px) scale(1.02) — but -4px vs -6px and 1.02 vs 1.05 produces visibly different energy. Drag the sliders and watch the preview update in real time until it feels right, then copy the CSS and add it to your :hover rule with a CSS transition.',
    },
    {
      icon: '△',
      title: 'Build a 3D tilt or card flip effect using rotateX and rotateY with perspective',
      desc: 'Use rotateX and rotateY transforms with perspective for flipping card components, 3D hover tilt effects, and depth reveals. The perspective slider controls how dramatic the distortion appears — 400–600px gives a realistic depth feel for most card sizes. Start from the Tilt 3D preset and adjust the individual axes.',
    },
    {
      icon: '◑',
      title: 'Find the from and to transform values for a CSS @keyframes animation',
      desc: 'Set the sliders to the animation\'s start state, copy the transform value, then adjust to the end state and copy again. Use both values in your @keyframes block. Because transform is GPU-composited, keyframe animations built this way run at 60fps without triggering layout reflow. Build the complete animation with our [CSS Animation Generator](/css-animation-generator).',
    },
    {
      icon: '▦',
      title: 'Flip an arrow or chevron icon horizontally so one SVG serves both directions',
      desc: 'Apply the Flip H preset to get scaleX(-1) — this mirrors the element so a right-pointing arrow becomes left-pointing without a separate SVG file. Add it as a .icon-flip-h modifier class to your icon system. scaleY(-1) handles vertical flipping for up/down arrow pairs.',
    },
    {
      icon: '⇄',
      title: 'Get the rotation value for a CSS loading spinner @keyframes animation',
      desc: 'The standard CSS spinner uses transform: rotate(360deg) as the @keyframes to value with animation-iteration-count: infinite. Use the Rotate 90° or Rotate 45° preset as a reference point, then set the keyframe endpoint to rotate(360deg) for the full spinning loop.',
    },
    {
      icon: '✦',
      title: 'Find the right skewY() degree for a diagonal section divider',
      desc: 'Drag the skewY slider to dial in whether -3 or -5 degrees better matches your layout\'s angle — the live preview updates immediately so you can judge before writing any code. A typical section divider uses skewY(-3deg) on a full-width container with a compensating negative margin to close the gap. Apply a gradient background to the section with our [Gradient Generator](/gradient-generator).',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function CssTransformGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><CssTransformGeneratorTool /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
