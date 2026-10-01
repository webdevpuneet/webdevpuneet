import BoxShadowGeneratorTool from '@/components/BoxShadowGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'CSS Box Shadow Generator — Free Multi-Layer Shadow Builder Online | webdevpuneet.com',
  description: 'Free CSS box shadow generator — build multi-layer shadows visually with neumorphism presets and inset support. Export CSS, Tailwind, or SCSS.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/box-shadow-generator/' },
  icons: { icon: '/icons/box-shadow-generator.svg', shortcut: '/icons/box-shadow-generator.svg' },
  openGraph: { type: 'website', url: 'https://webdevpuneet.com/box-shadow-generator/', siteName: 'webdevpuneet.com', title: 'CSS Box Shadow Generator — Multi-Layer Shadow Builder Online', description: 'Build multi-layer CSS box shadows visually. Neumorphism presets, inset shadow, live preview. Export CSS, Tailwind, JS, SCSS. Free.', images: [{ url: 'https://webdevpuneet.com/images/box-shadow-generator.png', width: 1200, height: 630, alt: 'CSS Box Shadow Generator Online' }], locale: 'en_US' },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: 'CSS Box Shadow Generator — Multi-Layer Shadow Builder', description: 'Build multi-layer CSS box shadows with neumorphism presets. Live preview, export CSS/Tailwind/JS/SCSS. Free, no sign-up.', images: ['https://webdevpuneet.com/images/box-shadow-generator.png'] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I create a CSS box shadow for a card?', acceptedAnswer: { '@type': 'Answer', text: 'For a realistic card elevation, use two shadow layers: a large soft shadow (40px blur, 0 spread, rgba(0,0,0,0.08)) and a smaller crisp one (8px blur, 0 spread, rgba(0,0,0,0.12)). This two-layer combination — ambient plus contact — is the approach used by Material Design and most modern UI frameworks. The CSS tab in this tool generates the ready-to-paste box-shadow property.' } },
    { '@type': 'Question', name: 'How do I make a neumorphic box shadow?', acceptedAnswer: { '@type': 'Answer', text: 'Switch to Neumorphism mode and choose your background color. The tool automatically calculates the paired light shadow and dark shadow values — one on the top-left, one on the bottom-right — that create the extruded soft-UI look. The key requirement is that the element background must closely match the page background for the effect to work.' } },
    { '@type': 'Question', name: 'How do I add multiple box shadow layers?', acceptedAnswer: { '@type': 'Answer', text: 'Click Add Layer to create each additional shadow. Every layer has independent controls for X/Y offset, blur, spread, color, opacity, and inset. All layers combine into a single box-shadow property with comma-separated values. Drag layers to reorder them — the order affects which shadow renders on top.' } },
    { '@type': 'Question', name: 'What does the spread radius do in box-shadow?', acceptedAnswer: { '@type': 'Answer', text: 'Spread radius expands or contracts the shadow before blur is applied. A positive value creates a colored halo larger than the element. A negative value shrinks the shadow — paired with an offset, this creates directional shadows that appear only on specific sides. At 0 (default), the shadow exactly matches the element size before blurring.' } },
    { '@type': 'Question', name: 'How do I make an inset or inner shadow in CSS?', acceptedAnswer: { '@type': 'Answer', text: 'Enable the Inset toggle on any shadow layer. The inset keyword makes the shadow appear inside the element\'s border rather than outside — creating a recessed or pressed-in effect useful for input fields that appear sunken, :active button states, and inset card panels.' } },
    { '@type': 'Question', name: 'How do I export a box shadow for Tailwind CSS?', acceptedAnswer: { '@type': 'Answer', text: 'Switch to the Tailwind tab in the export panel. The tool generates an arbitrary value class like shadow-[0_4px_20px_rgba(0,0,0,0.15)] for use in utility-first projects where the built-in shadow utilities don\'t match your design. Copy and paste directly into a className attribute.' } },
    { '@type': 'Question', name: 'What is the difference between box-shadow and filter: drop-shadow?', acceptedAnswer: { '@type': 'Answer', text: 'box-shadow renders against the rectangular bounding box, ignoring transparent areas. filter: drop-shadow() follows the actual alpha channel of the element — useful for transparent PNGs and SVG icons where you want the shadow to follow the actual shape rather than the bounding rectangle.' } },
    { '@type': 'Question', name: 'How do I create a subtle elevation shadow like Material Design or Tailwind\'s shadow-md?', acceptedAnswer: { '@type': 'Answer', text: 'Material Design-style elevation uses two overlapping shadow layers that simulate ambient and directional light simultaneously. A typical card elevation (equivalent to Material elevation 4): box-shadow: 0 2px 4px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.12). The first layer (small, dense) creates the contact shadow at the base of the element; the second (larger, soft) creates the ambient light spread. Tailwind\'s shadow-md is box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1) — which follows the same two-layer principle with negative spread on the second layer to keep it tight.' } },
    { '@type': 'Question', name: 'How do I export a box shadow for JavaScript or React?', acceptedAnswer: { '@type': 'Answer', text: 'Switch to the JS tab in the export panel. The generated output is a JavaScript object property in camelCase: boxShadow: "0 4px 20px rgba(0,0,0,0.15)". This format is ready to paste into a React inline style object or a styled-components / Emotion CSS-in-JS string. The SCSS tab generates a $box-shadow variable for SCSS/Sass projects where you want to centralize the shadow definition and reference it with var syntax.' } },
    { '@type': 'Question', name: 'Why is my box-shadow not visible on my element?', acceptedAnswer: { '@type': 'Answer', text: 'The most common causes: (1) The shadow color has full transparency — check that the opacity or alpha is not set to 0. (2) overflow: hidden on a parent element is clipping the shadow — move the overflow constraint to an inner container and keep the outer element\'s overflow visible. (3) The element has no background-color — elements with transparent backgrounds may not show shadows as expected. (4) The shadow offsets and blur are very small relative to the element size — try increasing the values to see if the shadow appears, then dial back to the subtlety you want.' } },
    { '@type': 'Question', name: 'Can I animate a CSS box shadow on hover?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Define the resting shadow on the element and the hover shadow on the :hover selector, then add a transition: box-shadow 0.2s ease. The shadow will interpolate smoothly between the two states. For a lift effect on hover: set the base shadow small and low (0 2px 4px rgba(0,0,0,0.1)) and the hover shadow larger and higher (0 8px 24px rgba(0,0,0,0.15)). Avoid animating the color channel of a shadow directly — the browser interpolates color in RGBA space, which can produce an unwanted color shift mid-transition. Animate only offset, blur, and spread.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CSS Box Shadow Generator',
  url: 'https://webdevpuneet.com/box-shadow-generator/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free — Visual CSS box shadow generator with multi-layer support, neumorphism mode, inset shadows, and CSS/Tailwind/JS/SCSS export.',
  featureList: ['Multi-layer shadows', 'Neumorphism mode', 'X/Y offset, blur, spread, opacity controls', 'Inset shadow toggle', 'Preview on multiple backgrounds', 'Export CSS/Tailwind/JS/SCSS'],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'Box Shadow Generator', item: 'https://webdevpuneet.com/box-shadow-generator/' },
  ],
};

const SEO = {
  slug: 'box-shadow-generator',
  title: 'CSS Box Shadow Generator — Multi-Layer Shadow Builder',

  about: {
    title: 'Build CSS Box Shadows Visually — Multi-Layer, Neumorphism, and Inset, With Export',
    description: `You need a subtle elevation shadow for a card, a neumorphic soft UI button, or a pressed inset effect — but writing \`box-shadow: 0 4px 20px rgba(0,0,0,0.12)\` by hand and tweaking it in browser DevTools is slow. Build it here: adjust sliders, see the live preview, add layers, and copy the CSS when it looks right.\n\nThe CSS \`box-shadow\` property supports multiple comma-separated layers — a large soft ambient shadow plus a smaller crisp contact shadow creates the kind of realistic depth that a single-layer shadow never achieves. This tool gives you independent sliders for X offset, Y offset, blur radius, spread radius, and opacity per layer. Add as many layers as you need. Drag to reorder them. Toggle any layer to inset for inner shadow effects.\n\nEach layer is stored as its own object and the generator joins them with commas in the order you arrange them, which matters visually — later layers paint on top, so a tight, dark contact shadow listed after a wide, soft ambient one reads as sitting closer to the surface. Spread radius is the parameter most people skip: it expands or shrinks the shadow's base rectangle before the blur is applied, independent of the offset, so a negative spread paired with a large offset produces a shadow that's visible on one side only and absent on the others — the technique behind Tailwind's own \`shadow-md\` and \`shadow-lg\` utilities, which use negative spread to keep large blurs from spilling too far outward. Neumorphism mode is a shortcut for the soft UI style built on exactly the same primitives: it automatically calculates the correct paired light and dark shadows from your chosen background color — one shadow offset toward the light source, one offset away from it, both un-blurred at the edges just enough to read as extruded — producing the clay-like look without any manual calculation. This is also why the technique only reads correctly when the element's own background closely matches the surrounding page background; any contrast breaks the illusion of the shape being carved from the same material.\n\nPreview the result on square, rounded, and circle shapes against multiple background colors before exporting. Export in four formats: raw CSS for direct use in stylesheets, Tailwind arbitrary value syntax for utility-first projects, a React inline style object, or SCSS variable for design token systems.`,
  },

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Choose a mode', text: 'Select Normal mode for standard box shadows or switch to Neumorphism mode for the soft-UI style. In Neumorphism mode, choose one of the four presets (Flat, Pressed, Concave, Raised) to auto-load paired light and dark shadow layers calibrated for the extruded clay look.' },
      { title: 'Add and select shadow layers', text: 'In Normal mode, click "+ Add Layer" to create a shadow layer. Each layer appears in the layers list — click it to select it and reveal its individual controls. Toggle the eye icon to show or hide a layer without deleting it, and click ✕ to remove a layer entirely.' },
      { title: 'Set offset, blur, and spread', text: 'Use the X Offset and Y Offset sliders to position the shadow — positive X moves it right, positive Y moves it down. Increase Blur Radius to soften the edge; values near 0 create a sharp, crisp shadow and large values create a soft, diffuse one. Adjust Spread Radius to expand (positive) or contract (negative) the shadow size.' },
      { title: 'Set color, opacity, and inset', text: 'Click the color swatch to open the color picker and choose any shadow color. Type a hex value directly into the hex input for precision. Use the Opacity slider to make the shadow more translucent. Toggle the Inset switch to convert the layer from an outer drop shadow to an inner shadow — useful for pressed buttons and recessed panels.' },
      { title: 'Configure the preview box', text: 'Use the Box Options section to set the width, height, and border radius of the preview element. Click the Rect or Circle shape buttons to quickly switch between a rectangle and a circle. Choose a background color swatch or click the + button to set a custom background.' },
      { title: 'Test on multiple backgrounds', text: 'Click any of the background color swatches at the top of the preview area to test the shadow against light, dark, and colorful backdrops. Use the custom color picker swatch for any color not in the preset swatches.' },
      { title: 'Export the code', text: 'Switch between the CSS, Tailwind, JS Object, and SCSS Var tabs in the output panel at the bottom. The CSS tab gives the raw box-shadow property. Tailwind gives the arbitrary value config for tailwind.config.js. JS Object gives a camelCase React style prop. SCSS Var gives a $shadow variable and mixin. Click Copy to copy the full output.' },
    ],
  },

  features: [
    'Add unlimited shadow layers, each with independent controls',
    'X/Y offset sliders and number inputs for precise positioning',
    'Blur radius and spread radius controls per layer',
    'Per-layer color picker with opacity slider; choose shadow colors with our [Color Picker](/color-picker)',
    'Inset toggle per layer — inner or outer shadow',
    'Normal mode and Neumorphism auto-pairing mode; pair with our [Glassmorphism Generator](/glassmorphism-generator) for a complete frosted-glass card',
    'Preview on Square, Rounded, and Circle shapes',
    'Preview on multiple background colors; build the backdrop with our [Gradient Generator](/gradient-generator)',
    'One-click presets for elevation, card, button, and neumorphic shadows',
    'Export as CSS, Tailwind arbitrary value, JS style object, or SCSS variable; apply transforms to the shadowed element with our [CSS Transform Generator](/css-transform-generator)',
  ],

  useCases: [
    {
      icon: '◻',
      title: 'Design a realistic card elevation shadow with multiple layers',
      desc: 'Stack a large soft ambient shadow (40px blur, 0.08 opacity) with a smaller crisp contact shadow (8px blur, 0.12 opacity). The two-layer combination creates realistic depth that single-layer shadows cannot achieve — matching the elevation model used by Material Design.',
    },
    {
      icon: '⬡',
      title: 'Create a neumorphic soft UI component',
      desc: 'Switch to Neumorphism mode, set your background color, and the tool automatically calculates the paired light and dark shadows. Adjust intensity to control how extruded or pressed the element appears. No manual color math required.',
    },
    {
      icon: '▦',
      title: 'Build default, hover, and pressed button shadow states',
      desc: 'Create three shadow configurations: default (small elevation), hover (slightly larger offset and blur for a lift effect), and active (inset shadow to simulate pressing). Export each as CSS and wire them up with :hover and :active pseudo-classes.',
    },
    {
      icon: '✦',
      title: 'Design a shadow for a modal or floating panel',
      desc: 'Use high blur (40–60px), low opacity (0.08–0.12), and zero or slight spread for a large diffuse shadow that gives modal dialogs and popovers a realistic sense of height above the page background.',
    },
    {
      icon: '≡',
      title: 'Define an elevation scale for a design system',
      desc: 'Build z0 through z5 shadow levels with consistent parameters and export each as an SCSS variable or JS object. The consistent multi-layer structure gives your component library a coherent depth model across all components.',
    },
    {
      icon: '◎',
      title: 'Get a Tailwind arbitrary shadow value when the defaults aren\'t enough',
      desc: 'The Tailwind export generates shadow-[0_20px_60px_rgba(0,0,0,0.15)] syntax for utility-first projects where the built-in shadow-md and shadow-lg classes don\'t match your design. Copy and paste directly into a className. Use our [CSS Button Generator](/css-button-generator) to add the shadow to a styled button.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function BoxShadowGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><BoxShadowGeneratorTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
