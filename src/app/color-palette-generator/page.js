import ColorPaletteGeneratorTool from '@/components/ColorPaletteGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Color Palette Generator — Free Color Scheme & Harmony Generator | webdevpuneet.com',
  description: 'Free color palette generator — complementary, analogous, triadic, and monochromatic schemes from any base color. Export CSS vars, Tailwind, or SCSS.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/color-palette-generator/' },
  icons: { icon: '/icons/color-palette-generator.svg', shortcut: '/icons/color-palette-generator.svg' },
  openGraph: { type: 'website', url: 'https://webdevpuneet.com/color-palette-generator/', siteName: 'webdevpuneet.com', title: 'Color Palette Generator — Color Scheme & Harmony Generator Online', description: 'Generate harmony color palettes from any base color — complementary, analogous, triadic & more. Export CSS vars, Tailwind, Hex, SCSS. Free.', images: [{ url: 'https://webdevpuneet.com/images/color-palette-generator.png', width: 1200, height: 630, alt: 'Color Palette Generator Online' }], locale: 'en_US' },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: 'Color Palette Generator — Harmony Color Schemes Online', description: 'Generate color palettes from any base color. Complementary, analogous, triadic & more. Export CSS, Tailwind, Hex, SCSS. Free.', images: ['https://webdevpuneet.com/images/color-palette-generator.png'] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I generate a color palette from a hex code?', acceptedAnswer: { '@type': 'Answer', text: 'Type or paste your hex code into the input field (# prefix is optional) and select a harmony type. The palette generates instantly — no button press needed. Click any swatch to copy its hex value. Use the export panel to copy the palette in CSS variables, Tailwind config, hex list, HSL, or SCSS format.' } },
    { '@type': 'Question', name: 'How do I create a full 100–900 color scale from one brand color?', acceptedAnswer: { '@type': 'Answer', text: 'Select the Shades harmony to generate progressively darker variants, or Monochromatic for a full range from light to dark including tints. Both produce a 9-stop scale. Export as Tailwind config to get a theme.extend.colors object with numeric shades (100–900) — paste it in and immediately use classes like bg-brand-100, text-brand-700, and border-brand-300.' } },
    { '@type': 'Question', name: 'What is the difference between complementary and split-complementary colors?', acceptedAnswer: { '@type': 'Answer', text: 'Complementary uses the hue directly opposite (180°) — maximum contrast, vibrant but can feel aggressive. Split-complementary uses the two hues flanking the complement (~150° and ~210°) — provides strong contrast but is softer and easier to balance in UI design because the two accent colors are related in hue rather than forming a single jarring opposite.' } },
    { '@type': 'Question', name: 'How do I use a generated palette in Tailwind CSS?', acceptedAnswer: { '@type': 'Answer', text: 'Switch to the Tailwind tab and copy the generated theme.extend.colors object. Paste it into your tailwind.config.js and immediately use classes like bg-brand-500, text-brand-200, or border-brand-700. The naming convention matches Tailwind\'s built-in color scale.' } },
    { '@type': 'Question', name: 'How do I export palette colors as CSS custom properties?', acceptedAnswer: { '@type': 'Answer', text: 'Select the CSS Vars tab and click Copy All. The output is a :root { } block with --palette-1 through --palette-N properties. Paste into your stylesheet\'s :root rule and reference them with var(--palette-1) anywhere in your CSS — the standard pattern for design token management.' } },
    { '@type': 'Question', name: 'What is a monochromatic palette and when should I use it?', acceptedAnswer: { '@type': 'Answer', text: 'A monochromatic palette uses a single hue at multiple lightness levels — producing a range of tones that all share the same underlying color. Nothing clashes. It\'s ideal when one brand color needs to work across backgrounds, text, borders, and hover states without introducing a second hue.' } },
    { '@type': 'Question', name: 'What is the difference between shades and tints?', acceptedAnswer: { '@type': 'Answer', text: 'Shades are darker variants — mathematically, reduced lightness in HSL with the hue held constant. Tints are lighter variants — increased lightness producing pastel tones. Both maintain the original hue. Shades is useful for dark mode or depth; Tints for light backgrounds and surface colors.' } },
    { '@type': 'Question', name: 'How do I pick colors that work well together for a UI design?', acceptedAnswer: { '@type': 'Answer', text: 'For most UI work, start with your primary brand color and generate an analogous palette for secondary accents — analogous hues (adjacent on the color wheel) feel naturally cohesive. Use monochromatic shades for backgrounds, borders, and text hierarchy — keeping all neutrals tinted toward the primary hue produces a refined, intentional look instead of flat grays. Reserve complementary or triadic colors for alert states, success/error indicators, and CTA buttons where high contrast is needed. The 60-30-10 rule is a useful starting point: 60% of the interface uses the neutral or dominant color, 30% uses a secondary color, and 10% uses the accent.' } },
    { '@type': 'Question', name: 'What color formats does the export support?', acceptedAnswer: { '@type': 'Answer', text: 'The export panel supports five formats: Hex (the six-character #RRGGBB format used in HTML and CSS), HSL (hue/saturation/lightness — best for design tokens because the numeric values are human-readable and predictable), CSS Custom Properties (:root block with --palette-N variables), Tailwind config (theme.extend.colors object with shade numbers 100–900 for direct use in tailwind.config.js), and SCSS Variables ($palette-N declarations). Use CSS custom properties or SCSS variables for design-system work where you want centralized palette definitions; use Hex or HSL for one-off color values in component CSS.' } },
    { '@type': 'Question', name: 'How do I generate a dark mode color palette?', acceptedAnswer: { '@type': 'Answer', text: 'Generate a monochromatic palette from your primary brand color and use the darker shades (700–900 range) as surface and background colors in dark mode, with lighter shades (100–300) for text and icon colors. The key advantage of HSL-based generation is that all shades share the same hue, so the dark mode palette feels on-brand rather than looking like generic dark grays. For the CSS custom property export, you can reference the same variable names in a @media (prefers-color-scheme: dark) block and swap the light-mode values for their dark-mode equivalents.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Color Palette Generator',
  url: 'https://webdevpuneet.com/color-palette-generator/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free color palette generator that creates harmony-based color schemes from any base color with CSS vars, Tailwind, Hex, HSL, and SCSS export.',
  featureList: ['8 harmony types', 'Live color picker', 'Click-to-copy swatches', 'Export CSS vars/Tailwind/Hex/HSL/SCSS', 'HSL-based accurate generation', 'Zero dependencies'],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'Color Palette Generator', item: 'https://webdevpuneet.com/color-palette-generator/' },
  ],
};

const SEO = {
  slug: 'color-palette-generator',
  title: 'Color Palette Generator — Harmony-Based Color Schemes',

  about: {
    title: 'Generate a Color Palette From Your Brand Color — With Tailwind and CSS Variable Export',
    description: `You have a brand hex code and you need a full color scale, a complementary accent color, or a set of analogous tones that all feel like they belong together. Enter your hex code, pick a harmony type, and the palette regenerates instantly with CSS variable and Tailwind export included — no button press required.\n\nEight harmony algorithms based on color wheel mathematics, each producing a different swatch count: **Monochromatic** (7 swatches) — one hue held constant while lightness steps up and down around it, ideal for a brand scale where everything stays in the same hue family. **Shades** and **Tints** (9 swatches each) — the darkest and lightest ends of that same idea taken to their full range, stepping lightness from near-black to near-white or near-white to a hint of color while hue stays fixed. **Analogous** (5 swatches) — hues offset ±20° and ±40° from your base, which feel natural because they sit next to each other on the wheel. **Complementary** (6 swatches) — your hue plus its 180° opposite, each rendered at three lightness levels for a full light/base/dark set on both sides. **Split-Complementary** (5 swatches) — the two hues flanking the complement (150° and 210° away) instead of the single opposite, giving strong but less jarring contrast. **Triadic** (6 swatches) and **Tetradic** (8 swatches) — hues spaced 120° or 90° apart around the wheel, each at more than one lightness.\n\nUnder the hood, every swatch is generated by converting your base hex to HSL, then reconstructing new hex values at shifted hue and lightness coordinates — all the math works in HSL rather than RGB because adjusting lightness or rotating hue in HSL space maps directly to how the human eye perceives brightness and color family, so shifting one number doesn't accidentally wash out saturation the way blending RGB channels would. Lightness values are clamped (for example, never pushed past 92% or below 5%) so no swatch ever collapses into pure white or pure black.\n\nEvery swatch is click-to-copy, and the export panel turns the current palette into five ready-to-paste formats: CSS custom properties in a \`:root\` block, a Tailwind \`theme.extend.colors\` object numbered by swatch position (100, 200, 300...), a plain hex list, HSL function values, and SCSS variables.`,
  },

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Enter your base color', text: 'Click the color swatch on the left to open the color picker and choose any color visually, or type a hex code directly into the text field next to it — the # prefix is optional. The live HSL badge updates as you type, showing the hue, saturation, and lightness values of your current color. Any valid 3- or 6-character hex code is accepted. The palette regenerates instantly on every change — no button press needed.' },
      { title: 'Select a harmony type', text: 'Choose one of the eight harmony algorithms from the dropdown. **Monochromatic** produces a 7-stop scale at different lightness levels — all same hue, nothing clashes. **Analogous** picks 5 adjacent hues — natural, cohesive, great for secondary accents. **Complementary** adds the 180° opposite hue — maximum contrast for CTA buttons and badges. **Split-Complementary** uses the two hues flanking the complement — softer contrast, easier to balance in UI. **Triadic** gives 3 evenly spaced hues — vibrant and varied. **Tetradic** gives 4 hues in a rectangle — maximum variety. **Shades** produces 9 progressively darker variants for a 100-to-900 dark scale. **Tints** produces 9 progressively lighter variants for a pastel/light scale.' },
      { title: 'Review the swatches', text: 'The generated palette appears as a row of swatches. Each swatch shows its hex code and HSL values. The base color is highlighted with a ring so you can identify your starting point within the generated set. Hover over any swatch to see a larger tooltip with the exact values. The color math runs in HSL space, which mirrors how human vision perceives color relationships — producing harmonies that look balanced and intentional rather than mathematically arbitrary.' },
      { title: 'Click a swatch to copy its hex value', text: 'Click any swatch to copy its hex code to your clipboard. A checkmark icon appears briefly on the swatch to confirm the copy. Use these individual hex values when you need to reference a single color — paste into a CSS file, a design tool\'s color field, or a brand style guide document. For copying the entire palette, use the export panel instead.' },
      { title: 'Export the palette in your format', text: 'Scroll to the export panel below the swatches and click the tab for your target format. **CSS Vars** outputs a :root { --palette-1: #hex; ... } block — paste into your root stylesheet for design token management. **Tailwind** outputs a theme.extend.colors object with numeric shades (100–900) — paste into tailwind.config.js and use classes like bg-brand-500 immediately. **Hex** outputs a plain newline-separated list of hex codes. **HSL** outputs HSL function values. **SCSS** outputs $palette-N: #hex variable declarations. Click Copy All to copy the complete block for any format.' },
    ],
  },

  features: [
    '8 harmony algorithms: monochromatic, analogous, complementary, split-complementary, triadic, tetradic, shades, tints',
    'Live color picker with hex input — type any valid hex code directly; explore individual swatches in detail with our [Color Picker](/color-picker)',
    'HSL values displayed for each swatch — see hue, saturation, and lightness at a glance',
    'Click any swatch to copy its hex value to clipboard with visual confirmation',
    'Export as CSS custom properties (:root variable block)',
    'Export as Tailwind config colors object with numeric shades (100–900)',
    'Export as plain hex list, HSL value list, or SCSS variable declarations',
    'All color math computed in HSL space for perceptually accurate harmony',
    'Base color highlighted with a ring in the palette for easy identification',
    '100% browser-based — no server requests, works offline after page load; turn palette colors into a gradient with our [Gradient Generator](/gradient-generator)',
  ],

  useCases: [
    {
      icon: '◉',
      title: 'Generate a 100–900 brand color scale from one hex code',
      desc: 'Use the Shades or Monochromatic harmony to produce a complete 9-stop scale from your brand primary — backgrounds (100–200), borders (300), text (600–700), dark text (800–900). Export as a Tailwind config object and start using bg-brand-100, text-brand-700, border-brand-300 immediately.',
    },
    {
      icon: '▦',
      title: 'Find a complementary accent color for a UI component',
      desc: 'Switch to Complementary to get the hue 180° opposite your brand primary — the highest-contrast accent option for call-to-action buttons, badges, and highlights. Switch to Split-Complementary for a softer two-color accent option if pure complementary feels too aggressive.',
    },
    {
      icon: '✦',
      title: 'Export a palette as Tailwind color tokens',
      desc: 'The Tailwind tab generates a ready-to-paste theme.extend.colors object with numeric shades. Copy it into tailwind.config.js and immediately use classes like bg-brand-200, text-brand-700, and ring-brand-500 — no manual config work needed.',
    },
    {
      icon: '◑',
      title: 'Build CSS variable tokens for a light and dark theme',
      desc: 'Generate Tints for light theme backgrounds and Shades for dark theme backgrounds — both anchored to the same base hue. Export as CSS custom properties and assign under :root and [data-theme="dark"] for a token-driven theming system.',
    },
    {
      icon: '⚡',
      title: 'Explore color directions before committing to a design',
      desc: 'Switch between harmony types on the same base color to compare how a complementary scheme feels versus triadic, or analogous versus split-complementary — the palette regenerates instantly. Find the direction that works, then copy the hex values and move into design or code. Apply those colors to a glassmorphism card style with our [Glassmorphism Generator](/glassmorphism-generator).',
    },
    {
      icon: '{}',
      title: 'Define semantic color tokens for a design system',
      desc: 'Generate harmonies for each semantic role — brand, neutral, success, warning, error — and export each as CSS variables or SCSS. The numeric 100–900 scale matches Tailwind, Material Design, and most design system conventions. Preview how your palette looks in typography with our [Font Pairing Tool](/font-pairing-tool/).',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function ColorPaletteGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><ColorPaletteGeneratorTool /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
