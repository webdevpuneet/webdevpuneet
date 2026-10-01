import GradientGeneratorTool from '@/components/GradientGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'CSS Gradient Generator — Linear, Radial & Conic | webdevpuneet.com',
  description: 'Free CSS gradient generator — build linear, radial, and conic gradients with draggable stops. Export CSS, Tailwind, or SCSS with @keyframes. No sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/gradient-generator/' },
  icons: { icon: '/icons/gradient-generator.svg', shortcut: '/icons/gradient-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/gradient-generator/',
    siteName: 'webdevpuneet.com',
    title: 'CSS Gradient Generator — Linear, Radial, Conic & Animated Gradients Online Free',
    description: 'Build CSS gradients visually. Drag color stops, choose animated presets, preview as background, text, or border. Export CSS with @keyframes, Tailwind, or SCSS. Free.',
    images: [{ url: 'https://webdevpuneet.com/images/gradient-generator.png', width: 1200, height: 630, alt: 'CSS Gradient Generator Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'CSS Gradient Generator — Animated, Linear, Radial & Conic Online Free',
    description: 'Build CSS gradients visually with 6 animated presets. Drag color stops, preview text/border/background, export CSS/Tailwind/SCSS. Free, no sign-up.',
    images: ['https://webdevpuneet.com/images/gradient-generator.png'],
  },
};

const seoData = {
  slug: 'gradient-generator',
  title: 'CSS Gradient Generator — Linear, Radial, Conic & Animated',

  about: {
    title: 'Build a CSS Gradient Visually — Then Copy the Code for Background, Text, or Border',
    description: `You need a CSS gradient for a hero background, a gradient text heading, or a gradient card border — but writing \`linear-gradient(135deg, #667eea 0%, #764ba2 100%)\` from memory is tedious, and every small tweak means running back to the browser. Build it here visually, see it live in the exact context you need, and copy the complete CSS with one click.\n\nThe interactive gradient bar shows each color stop as a draggable handle. Drag to reposition stops. Click anywhere on the bar to add a new stop — the color is auto-interpolated from the gradient at that exact position so new stops blend naturally. Select any stop to change its color or opacity. Three gradient types: **linear** (any angle), **radial** (circular outward from a center), and **conic** (rotational sweep, useful for color wheels and pie charts).\n\nThree preview modes let you see the gradient in the context you actually need. **Background** fills the preview area — for hero sections and full-bleed backgrounds. **Text** clips the gradient to display typography using \`background-clip: text\` — for gradient headings and logos. **Border** shows the gradient as a card outline and filled button simultaneously. The CSS export updates automatically for whichever mode is active, including the correct \`-webkit-background-clip\` prefix for Safari.\n\nFor animated gradients, six presets generate complete \`@keyframes\` CSS with no JavaScript required: Slide (flowing background-position), Diagonal (corner-to-corner), Hue Shift (hue-rotate cycle), Breathe (background-size pulse), Pulse (opacity fade), and Spin (angle rotation via \`@property\`). Adjust speed from 1s to 12s and copy the full animation block for your stylesheet.\n\nClick-to-add works by linearly interpolating between the two nearest stop colors at the click position — the bar sorts stops by percentage, finds which pair straddles the clicked point, and blends their RGB channels by the fractional distance between them, so a new stop always starts as a believable blend rather than a jarring random color. The bar tells a click on empty space apart from a press on an existing handle by comparing the event target directly against the bar element itself, which is what lets dragging a handle and clicking to add a stop share the same element without misfiring. The **Spin** preset is the one animation that can't be done with plain \`background-position\` tricks, because you can't animate a gradient's angle argument directly — CSS has no keyframe-able "gradient angle" property by default. It works around that by registering a custom property with \`@property\` and an explicit \`<angle>\` syntax, which tells the browser the property is animatable, then keyframes that custom property from 0deg to 360deg and feeds it into the gradient with \`var()\`; this is why the exported Spin CSS is the only preset marked Chrome/Edge only, since \`@property\` isn't supported everywhere. The Tailwind export only maps to a named direction class (\`bg-gradient-to-br\` and friends) for the eight compass angles Tailwind ships utilities for; any other angle, or any gradient with more than two stops, falls back to Tailwind's arbitrary-value bracket syntax with the full CSS gradient string inlined. Every setting — mode, stops, angle, animation, preview mode — auto-saves to localStorage 600ms after your last change and silently restores on your next visit.`,
  },

  features: [
    'Interactive gradient bar — drag color stop handles, click to add new stops with auto-interpolated color',
    'Three gradient types: linear (any angle), radial (focal point control), and conic (rotational)',
    'Six animated gradient presets — Slide, Diagonal, Hue Shift, Breathe, Pulse, Spin (@property)',
    'Adjustable animation speed from 1s to 12s — preview plays live; build more complex animations with our [CSS Animation Generator](/css-animation-generator)',
    'Three preview modes — Background, Text clip (background-clip: text), Border/Button',
    '8+ curated one-click gradient presets to start from; explore mesh gradients with our [Mesh Gradient Generator](/mesh-gradient-generator)',
    'Angle and direction controls for linear gradients with degree input',
    'Opacity slider per color stop — full RGBA transparency support; pick exact stop colors with our [Color Picker](/color-picker)',
    'Export as CSS with @keyframes, Tailwind utility classes, or SCSS variables',
    'One-click Copy for any export format',
    '100% client-side — no data sent to any server, no sign-up required; add box shadows to your gradient card with our [Box Shadow Generator](/box-shadow-generator)',
  ],

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Choose a gradient type', text: 'Select Linear, Radial, or Conic from the Type section in the left panel. Linear uses a straight-line direction at any angle. Radial radiates outward from a focal center point. Conic sweeps colors rotationally — great for pie charts and color wheels. The preview updates immediately.' },
      { title: 'Edit color stops on the gradient bar', text: 'The interactive gradient bar shows each stop as a draggable handle. Drag a handle left or right to reposition the stop. Click anywhere on the bar to add a new stop — its color is auto-interpolated from the gradient at that position so new stops blend naturally. Click a handle to select it, then use the color picker and position slider to adjust that stop.' },
      { title: 'Set type-specific parameters', text: 'For linear gradients, drag the Angle slider or type a degree value — 0° is top-to-bottom, 90° is left-to-right, 135° is diagonal. For radial gradients, use the X and Y center sliders to position the focal point. For conic gradients, use the From Angle slider to set the starting sweep angle.' },
      { title: 'Apply an animation preset', text: 'In the Animate section, choose one of the six presets: Slide (flowing background-position), Diagonal (corner-to-corner shift), Hue Shift (hue-rotate cycle), Breathe (background-size pulse), Pulse (opacity fade), or Spin (angle rotation). Adjust the Speed slider from 1s to 12s. The preview animates live and the CSS export includes the full @keyframes block.' },
      { title: 'Switch the preview mode', text: 'Toggle between Background (full fill), Text (gradient clipped to typography using background-clip: text), and Border (card outline and button). Each mode updates the export code automatically — for Text mode the CSS includes -webkit-background-clip prefix for Safari.' },
      { title: 'Load a preset or randomize', text: 'Click any of the 8 preset swatches in the Presets section (Cosmic, Sunset, Ocean, Forest, Fire, Neon, Aurora, Rose) to instantly load a professionally chosen gradient. Click Randomize in the preview toolbar to shuffle all stop colors for quick exploration.' },
      { title: 'Export the code', text: 'Switch between CSS, Tailwind, and SCSS tabs at the bottom of the panel. CSS gives the background property plus @keyframes if animation is active. Tailwind gives utility class strings. SCSS gives a $gradient variable with a .element class. Click Copy to copy the output.' },
    ],
  },

  useCases: [
    {
      icon: '◑',
      title: 'Create a gradient hero background — static or animated',
      desc: 'Build a linear or radial gradient for a landing page hero. Add the Slide or Diagonal animation preset at 8–10s speed for a subtle flowing motion that adds life to an otherwise static page. Copy the complete CSS with @keyframes — no JavaScript needed.',
    },
    {
      icon: '⬡',
      title: 'Make a gradient text heading for a marketing page',
      desc: 'Switch to Text preview mode to see the gradient clipped to display typography. The CSS export includes the required -webkit-background-clip: text prefix for Safari. Copy and paste onto any heading element — the gradient text effect works in all modern browsers.',
    },
    {
      icon: '✦',
      title: 'Design a gradient card border or gradient button',
      desc: 'Border mode shows the gradient as a card outline and a filled button simultaneously — verify the same gradient works for both UI elements before copying the CSS. No manual wrapper div trick research needed.',
    },
    {
      icon: '▦',
      title: 'Define brand gradient tokens for a design system',
      desc: 'Use the SCSS export to save the gradient as configurable $gradient-start, $gradient-end, and $gradient-angle variables. Changes to the token values propagate to all elements using the gradient — the right structure for a design token system. Build a full color palette alongside with our [Color Palette Generator](/color-palette-generator).',
    },
    {
      icon: '◎',
      title: 'Add a shimmer loading animation to a skeleton or progress bar',
      desc: 'Apply the Slide animation preset to a gradient element for a smooth shimmer effect. The exported CSS includes a complete @keyframes block and the background-size property — paste it in and the shimmer runs with zero JavaScript.',
    },
    {
      icon: '≡',
      title: 'Get Tailwind gradient classes without looking up the syntax',
      desc: 'The Tailwind tab generates bg-gradient-to-r with from-, via-, and to- color classes for simple gradients, or arbitrary value syntax for complex custom gradients. Copy and paste directly into a className attribute.',
    },
  ],

  faqs: [
    {
      q: 'How do I create a CSS gradient online?',
      a: 'Select the gradient type (Linear, Radial, or Conic), drag color stop handles on the gradient bar, and click anywhere on the bar to add more stops. The live preview updates instantly. When the gradient looks right, click the CSS tab in the export panel and copy the generated background property — ready to paste into your stylesheet.',
    },
    {
      q: 'How do I make a gradient text effect in CSS?',
      a: 'Switch to Text preview mode using the mode toggle above the preview. The gradient is clipped to display text using background-clip: text and color: transparent. The CSS export includes the required -webkit-background-clip: text prefix for Safari compatibility. Copy and paste onto any heading or display element. Works in all modern browsers.',
    },
    {
      q: 'How do I make a CSS animated gradient background?',
      a: 'Select an animation preset from the animation panel — Slide, Diagonal, Hue Shift, Breathe, Pulse, or Spin. Adjust the speed slider from 1s (fast) to 12s (slow ambient). The CSS tab exports the full @keyframes block and the animation property — paste everything into your stylesheet and the animation runs with no JavaScript required.',
    },
    {
      q: 'What is the difference between linear, radial, and conic gradients?',
      a: 'Linear gradients transition along a straight line at a specified angle — 90deg is left-to-right, 135deg is diagonal, 180deg is top-to-bottom. Radial gradients transition outward from a focal center point in a circular or elliptical pattern. Conic gradients sweep colors rotationally around a center point — useful for pie charts, color wheels, and progress rings.',
    },
    {
      q: 'How do I add color stops to a gradient?',
      a: 'Click anywhere on the interactive gradient bar to add a new stop — the color is automatically interpolated from the gradient at that position so the new stop blends naturally. Drag any handle to reposition it. Click a handle to select it, then use the color picker and opacity slider to change its appearance. Remove a stop by selecting it and clicking the delete button.',
    },
    {
      q: 'How do I get Tailwind CSS classes for a gradient?',
      a: 'Switch to the Tailwind tab in the export panel. For simple directional gradients, it generates bg-gradient-to-r (or other direction variants) with from-, via-, and to- color classes. For complex gradients with custom angles or more than three stops, it uses Tailwind arbitrary value syntax: bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]. Copy and paste directly into a className attribute.',
    },
    {
      q: 'What is a conic gradient and when should I use it?',
      a: 'A conic gradient sweeps colors rotationally around a center point — like a clock face or a pie chart. Use conic-gradient() for pie charts (each color stop covers an arc percentage), color wheel backgrounds, loading spinners with a gradient arc, and donut chart segments. All modern browsers support it.',
    },
    {
      q: 'Is this gradient generator free?',
      a: 'Yes — completely free, no sign-up required. All gradient generation and code export runs in your browser. No gradient data or color values are sent to any server. Works offline once the page has loaded.',
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CSS Gradient Generator',
  url: 'https://webdevpuneet.com/gradient-generator/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free visual CSS gradient generator supporting linear, radial, and conic gradients with draggable color stops, 6 animated presets, 3 preview modes (background, text, border), and CSS/Tailwind/SCSS export. 100% client-side.',
  featureList: seoData.features.join(', '),
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'CSS Gradient Generator', item: 'https://webdevpuneet.com/gradient-generator/' },
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

export default function GradientGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><GradientGeneratorTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...seoData} /></IndexOnly>

    </div>
  );
}
