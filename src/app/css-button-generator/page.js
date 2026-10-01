import CssButtonGeneratorTool from '@/components/CssButtonGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'CSS Button Generator — Create Beautiful Buttons Online Free | webdevpuneet.com',
  description: 'Free CSS button generator with live preview — 26 presets including gradient, neon, glassmorphism, and brutalist. Export CSS, SCSS, React, or Tailwind.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/css-button-generator/' },
  icons: { icon: '/icons/css-button-generator.svg', shortcut: '/icons/css-button-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/css-button-generator/',
    siteName: 'webdevpuneet.com',
    title: 'CSS Button Generator — Beautiful Buttons with Live Preview',
    description: 'Create stunning CSS buttons instantly. 26 presets: gradient, neon, metallic, brutalist, pastel, skeuomorphic, glassmorphism, 3D. Add icons. Export CSS, SCSS, Tailwind, React JSX. Free.',
    images: [{ url: 'https://webdevpuneet.com/images/css-button-generator.png', width: 1200, height: 630, alt: 'CSS Button Generator Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'CSS Button Generator — Create Beautiful Buttons Free',
    description: 'Gradient, neon, glassmorphism, neumorphism, 3D, outlined buttons. Live preview. Export CSS, SCSS, Tailwind, React JSX.',
    images: ['https://webdevpuneet.com/images/css-button-generator.png'],
  },
};

const seo = {
  slug: 'css-button-generator',
  title: 'CSS Button Generator — Create Stunning Buttons with Live Preview',
  about: {
    title: 'Design a CSS Button Visually — Export CSS, Tailwind, or React JSX Instantly',
    description: `You need a gradient CTA button for a landing page, a neon glow button for a dark dashboard, or a frosted glass button for a glassmorphism UI — but writing the \`box-shadow\`, \`backdrop-filter\`, and hover state CSS from scratch is tedious. Pick one of 26 presets across 10 style categories, adjust the values with sliders, and copy the code in whatever format your project needs.\n\nEach preset is really just a JavaScript object of style values — background colors, gradient direction, padding, border, shadow, and hover/active variants — that gets fed into the same style engine every other control writes to, so switching presets and then tweaking a slider never fights the underlying state. The neon presets get their glow from a multi-layer \`box-shadow\` combining a tight inner glow with a wider outer blur; the neumorphic preset pairs a light shadow on one corner with a dark shadow on the opposite corner against a matching background to fake an embossed, pressed-in look; the 3D and retro presets use a solid offset shadow that shrinks and the button that translates down on hover, simulating a physical button being pushed.\n\nEvery property is live-editable: background (solid or 2-stop gradient with direction), text color, font size, weight, letter-spacing and text-transform, padding, border radius and style, box shadow (normal and hover), hover background and scale transform, a separate active/press-down scale and shadow, transition duration, and backdrop-filter blur for glass effects. A Google Fonts picker loads any of 40+ web fonts on demand by injecting a stylesheet link, and an emoji icon can sit before or after the label with its own gap control. The dual-background preview shows the button on both dark and light surfaces at once so you can judge contrast without switching modes.\n\nFive export formats read from that same style object: plain CSS with \`:hover\` and \`:active\` blocks, SCSS with \`&\` nesting, a standalone HTML document, a React JSX component using \`useState\` to track hover and active state inline, and Tailwind utility classes with arbitrary-value syntax for non-standard radii and shadows. No account, no watermark, 100% in-browser.`,
  },
  features: [
    '26 built-in presets across 10 style categories: Gradient (Electric Blue, Sunset, Aurora, Ocean, Purple Rain, Fire), Neon (Cyan, Pink, Green), Glassmorphism (Glass, Frosted), Neumorphism (Soft Push), Outlined (Outlined, Pill), 3D (Depth, Retro Pop), Metallic (Silver, Gold), Brutalist (Neobrutalist, Dark), Pastel (Cotton Candy, Mint), Skeuomorphic (Classic, Embossed), Minimal (Minimal, Ghost, Underline), Solid (Amber, Danger); pick gradient colors with our [Color Palette Generator](/color-palette-generator)',
    'Live dual-background preview — see your button on dark and light backgrounds at the same time',
    'Full background control: solid color or 2-stop gradient with direction selector; build the gradient with our [Gradient Generator](/gradient-generator)',
    'Typography controls: font size, font weight, letter spacing, text transform (uppercase/capitalize/lowercase)',
    'Size and shape: padding X/Y sliders, border-radius from square (0px) to pill (50px)',
    'Border customization: width, color, and style (solid, dashed, dotted, double)',
    'Box shadow editor: set normal and hover shadows with full CSS value support; design complex shadows with our [Box Shadow Generator](/box-shadow-generator)',
    'Hover state controls: hover background color, scale transform, and transition duration',
    'Backdrop filter support for glassmorphism blur effects; design full glassmorphism cards with our [Glassmorphism Generator](/glassmorphism-generator)',
    'Icon support: add any emoji or symbol before or after button text using the full emoji picker or custom text input; gap slider controls spacing; icons included in all exports',
    'Export to 5 formats: CSS, SCSS (with nesting), HTML (full document), React JSX (with useState hover + active), Tailwind utility classes',
    'Active state controls: configure press-down scale and shadow for the :active state, or disable it entirely',
    'Resizable preview area: drag the handle to give more or less space to the preview stage',
    'Google Fonts picker: choose from 40+ web fonts with live preview rendered in the chosen font',
    'One-click copy to clipboard for any export format',
    'Category filter: quickly browse presets by style category',
    'No sign-up, no watermark, runs 100% in the browser',
  ],
  useCases: [
    { icon: '◉', title: 'Create a gradient or animated CTA button for a landing page', desc: 'Pick from the Gradient presets — Electric Blue, Sunset, Aurora — adjust the padding and border radius, and export CSS or Tailwind. No writing box-shadow and hover states by hand.' },
    { icon: '▦', title: 'Define a button style for a design system or component library', desc: 'Build the exact look, export the CSS, and use the values to create a consistent button token. All export formats include hover and active states so the component is production-ready.' },
    { icon: '◑', title: 'Build a neon or gradient button for a dark-mode dashboard', desc: 'The Neon and Gradient presets are designed for dark backgrounds. Preview on the dark background setting to confirm contrast, then export CSS or React JSX. Build the dashboard layout with our [CSS Grid Builder](/css-grid-builder).' },
    { icon: '△', title: 'Create a frosted glass button for a glassmorphism UI', desc: 'The Glass and Frosted presets use semi-transparent backgrounds with backdrop-filter blur. Works best over an image or gradient background — test in the preview before exporting.' },
    { icon: '⚡', title: 'Get Tailwind classes for a styled button without writing arbitrary values', desc: 'The Tailwind export tab generates a button with the correct utility classes including arbitrary values for colors and radii. Paste into any Next.js or Vite Tailwind project.' },
    { icon: '≡', title: 'Export a complete React button component with hover state', desc: 'The React JSX export generates a functional component with useState tracking hover state — the background and shadow change on mouse enter/leave. Paste directly into a React project.' },
    { icon: '✦', title: 'Generate an outlined or ghost button for secondary actions', desc: 'The Outlined and Ghost presets use transparent backgrounds with border or text-only styling. Good for cancel buttons, form secondary actions, and less prominent CTAs.' },
    { icon: '◉', title: 'Design a 3D or retro button for a game UI or creative site', desc: 'The 3D Depth and Retro Pop presets use layered box-shadow to simulate depth with a translateY press effect. Stand-out style for portfolios, game interfaces, and creative microsites.' },
  ],
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Choose a preset', text: 'The left panel shows 26 button presets grouped by 10 style categories: Gradient, Neon, Glassmorphism, Neumorphism, Outlined, 3D, Metallic, Brutalist, Pastel, Skeuomorphic, Minimal, and Solid. Use the category tabs to filter by style. Click any preset to load it into the customizer instantly.' },
      { title: 'Set the label and background', text: 'Enter your button text in the Label field. Switch the background between solid color and gradient. For gradient, pick two colors and a direction (135deg, 90deg, etc.). For glassmorphism effects, use a semi-transparent value like `rgba(255,255,255,0.15)` with a backdrop-filter blur.' },
      { title: 'Adjust typography, size, and shape', text: 'Control font size, font weight, text transform (uppercase, capitalize), and letter spacing. Drag the Padding X, Padding Y, and Border Radius sliders to shape the button. Set border-radius to 50px for a full pill shape.' },
      { title: 'Configure hover, active, and icon', text: 'Set hover background color, scale transform, and transition speed. Configure the press-down scale for the `:active` state. In the Icon section, set position to Before or After, open the emoji picker or type any character, and use the gap slider for spacing. Icons are included in all exports.' },
      { title: 'Preview on dark and light backgrounds', text: 'The live preview panel shows your button updating in real time. Toggle the background between dark, light, or a custom color to check contrast. Hover and click the button to see all three states animate. Drag the resize handle to give the preview more or less space.' },
      { title: 'Copy or export the code', text: 'Click any of the five export tabs: CSS (with `:hover` and `:active` states), SCSS (with `&` nesting), HTML (full standalone document), React JSX (complete component with `useState` hover logic), or Tailwind (utility classes). Click Copy to put the code on your clipboard and paste directly into your project.' },
    ],
  },
  faqs: [
    {
      q: 'How do I generate CSS for a button with a hover effect?',
      a: 'Pick a preset, adjust the hover background color and hover scale in the Hover State section, and export the CSS tab. The generated CSS includes the base style, :hover state (with background color change and scale transform), and :active state (press-down effect) in a single clean block — ready to paste.',
    },
    {
      q: 'How do I make a CSS gradient button?',
      a: 'Select any of the Gradient presets (Electric Blue, Sunset, Aurora, Ocean, Purple Rain, Fire) or set Background to Gradient in the Background section, pick two colors and a direction. The exported CSS uses a linear-gradient() for the background property with proper hover state handling.',
    },
    {
      q: 'How do I create a glassmorphism button with backdrop blur?',
      a: 'Select the Glass or Frosted preset. These use a semi-transparent background (rgba(255,255,255,0.15)), a thin rgba border, and backdrop-filter: blur(12px). The glass effect is only visible when the button sits over a colorful or image background — use the preview background toggle to test.',
    },
    {
      q: 'How do I make a neon glow button?',
      a: 'Select Neon Cyan, Neon Pink, or Neon Green from the Neon presets. These use a transparent background, a colored border, and a multi-layer box-shadow that creates the glow. The hover state widens the shadow for a brighter glow-on-hover effect.',
    },
    {
      q: 'How do I export a React button component with hover state?',
      a: 'Click the React JSX tab in the export panel. The generated code is a complete React function component using useState to track hover — different background and box-shadow values are applied on onMouseEnter and onMouseLeave. Paste it directly into a React project.',
    },
    {
      q: 'Can I use the Tailwind export directly in a Next.js or Vite project?',
      a: 'Yes. The Tailwind export generates a button with Tailwind utility classes. Paste into any project with Tailwind installed. Some values use arbitrary-value syntax like rounded-[8px] or shadow-[...] which requires Tailwind v3+.',
    },
    {
      q: 'Can I add an emoji or icon to the button?',
      a: 'Yes. In the Icon section, set position to Before or After, then open the emoji picker to browse hundreds of emojis by category, or type any character directly. Use the Gap slider to control icon-to-text spacing. The icon is included in all five export formats automatically.',
    },
    {
      q: 'Does backdrop-filter work in all browsers?',
      a: 'backdrop-filter is supported in all modern browsers (Chrome, Edge, Safari, Firefox 103+). The CSS export includes both the standard property and the -webkit- prefix for maximum compatibility.',
    },
    {
      q: 'Is this CSS button generator free with no sign-up?',
      a: 'Yes — completely free, no account required, no watermarks. All processing runs in your browser. No code or data is sent to any server.',
    },
  ],
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'CSS Button Generator',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      url: 'https://webdevpuneet.com/css-button-generator/',
      description: 'Create beautiful CSS buttons with live preview. 16 presets, full customization, export to CSS, SCSS, HTML, React JSX, and Tailwind.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: [
        '26 button presets across 10 style categories',
        'Gradient, Neon, Metallic, Brutalist, Pastel, Skeuomorphic, Glassmorphism, Neumorphism, 3D, Outlined styles',
        'Icon picker: add any emoji before or after button text',
        'Live preview with selectable background and resize handle',
        'Export to CSS, SCSS, HTML, React JSX, Tailwind',
        'Active state, hover state, Google Fonts picker',
        'One-click copy to clipboard',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Is the CSS Button Generator free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free with no sign-up required.' } },
        { '@type': 'Question', name: 'What export formats are supported?', acceptedAnswer: { '@type': 'Answer', text: 'CSS, SCSS, HTML, React JSX, and Tailwind utility classes.' } },
        { '@type': 'Question', name: 'What button styles are included?', acceptedAnswer: { '@type': 'Answer', text: '26 presets across 10 categories: Gradient, Neon, Metallic, Brutalist, Pastel, Skeuomorphic, Glassmorphism, Neumorphism, 3D, Outlined, Minimal, and Solid.' } },
        { '@type': 'Question', name: 'Can I add an icon to my button?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — use the Icon section to pick any emoji from the full emoji picker and place it before or after the label. Icons are included in all export formats.' } },
        { '@type': 'Question', name: 'How do I make a glassmorphism button?', acceptedAnswer: { '@type': 'Answer', text: 'Select the Glass or Frosted preset — they use semi-transparent backgrounds with backdrop-filter: blur().' } },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'webdevpuneet.com', item: 'https://fwdtools.com' },
        { '@type': 'ListItem', position: 2, name: 'CSS Button Generator', item: 'https://webdevpuneet.com/css-button-generator/' },
      ],
    },
  ],
};

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.toolSection}>
        <CssButtonGeneratorTool />
      </div>
      <IndexOnly><AdSlot />
      <SeoSection {...seo} /></IndexOnly>

    </div>
  );
}
