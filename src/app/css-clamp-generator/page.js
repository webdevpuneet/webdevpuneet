import CssClampGeneratorTool from '@/components/CssClampGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'CSS Clamp Generator — Fluid Typography Free Online | webdevpuneet.com',
  description: 'Free CSS clamp() generator for fluid typography — responsive font sizes with a full type scale, viewport slider, and CSS/Tailwind/SCSS export.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/css-clamp-generator/' },
  icons: { icon: '/icons/css-clamp-generator.svg', shortcut: '/icons/css-clamp-generator.svg' },
  openGraph: { type: 'website', url: 'https://webdevpuneet.com/css-clamp-generator/', siteName: 'webdevpuneet.com', title: 'CSS Clamp() Generator — Fluid Typography & Type Scale', description: 'Generate a complete fluid type scale using CSS clamp(). Visual viewport slider, 6 scale ratios, CSS vars, Tailwind config, SCSS export. Free.', images: [{ url: 'https://webdevpuneet.com/images/css-clamp-generator.png', width: 1200, height: 630, alt: 'CSS Clamp Generator — Fluid Typography Tool' }], locale: 'en_US' },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: 'CSS Clamp() Generator — Fluid Typography Tool', description: 'Generate responsive font sizes with CSS clamp(). Full type scale, viewport slider, Tailwind export. Free.', images: ['https://webdevpuneet.com/images/css-clamp-generator.png'] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I make font size responsive without media queries?',
      acceptedAnswer: { '@type': 'Answer', text: 'Use CSS clamp() with a viewport-relative preferred value. The syntax is clamp(minimum, preferred, maximum). The preferred value uses vw units so the font scales proportionally with viewport width. Below the minimum viewport it stays fixed at the minimum size; above the maximum viewport it stays at the maximum size. This creates smooth, linear scaling between two breakpoints with a single value — no @media queries needed. This generator calculates the formula automatically: you set min size, max size, min viewport, and max viewport, and get the complete clamp() expression to paste.' }
    },
    {
      '@type': 'Question',
      name: 'How is the CSS clamp() formula calculated for fluid font sizes?',
      acceptedAnswer: { '@type': 'Answer', text: 'The clamp() preferred value uses linear interpolation. Given minimum font size, maximum font size, minimum viewport, and maximum viewport: slope = (maxSize − minSize) / (maxViewport − minViewport). The y-intercept is: intercept = minSize − (slope × minViewport). The preferred value is: intercept + slope × 100vw. The full expression: clamp(minSize, intercept + slope×100vw, maxSize). At the minimum viewport this resolves to exactly minSize; at the maximum viewport it resolves to exactly maxSize. The Formula panel in this tool shows every step of this calculation for any selected size in the scale.' }
    },
    {
      '@type': 'Question',
      name: 'What is a type scale ratio and which one should I use?',
      acceptedAnswer: { '@type': 'Answer', text: 'A type scale ratio is a multiplier applied to a base font size to generate a harmonious progression of sizes. Minor Third (1.2) creates subtle, compact size differences good for dense interfaces. Major Third (1.25) balances variety and subtlety — the most common choice for UI design systems. Perfect Fourth (1.333) creates bolder contrasts good for editorial layouts. Perfect Fifth (1.5) and Golden Ratio (1.618) produce dramatic jumps used for display typography and landing pages. Use the viewport slider to preview how each ratio affects your heading hierarchy before committing.' }
    },
    {
      '@type': 'Question',
      name: 'Should I use rem or px in CSS clamp() for typography?',
      acceptedAnswer: { '@type': 'Answer', text: 'Rem is strongly preferred over px for accessibility. When a user changes their browser\'s default font size (a common accommodation for low-vision users), rem-based sizes scale proportionally while px sizes stay fixed. WCAG 1.4.4 (Resize Text, Level AA) requires text can be resized to 200% without loss of functionality. Using rem in clamp() satisfies this because the min and max values scale with the user\'s root preference. The generator outputs rem by default and shows the rem conversion alongside pixel values in the formula panel.' }
    },
    {
      '@type': 'Question',
      name: 'How do I generate a complete fluid type scale instead of individual clamp() values?',
      acceptedAnswer: { '@type': 'Answer', text: 'Set min base size, max base size, min viewport, max viewport, and a scale ratio — then click generate. The tool produces all eight sizes (xs, sm, base, lg, xl, 2xl, 3xl, 4xl) as a proportional system in a single operation. Every size is derived from the same ratio so the relationships feel natural. Export as CSS custom properties, Tailwind fontSize config, or SCSS variables — updating the entire system\'s typography then only requires changing two numbers.' }
    },
    {
      '@type': 'Question',
      name: 'What viewport widths should I set for min and max?',
      acceptedAnswer: { '@type': 'Answer', text: 'The minimum viewport should represent your smallest supported device — typically 360px for modern Android phones. The maximum viewport should be your largest common desktop breakpoint — 1440px is the most common choice and covers most laptop and desktop displays. A 360px–1440px range gives a 1080px scaling window with smooth, perceptible font growth across the most common device sizes. Below the minimum the font stays fixed at the min size; above the maximum it stays at the max size.' }
    },
    {
      '@type': 'Question',
      name: 'How do I use the generated CSS variables in my stylesheet?',
      acceptedAnswer: { '@type': 'Answer', text: 'Paste the CSS output into a :root { } block in your global stylesheet. Then use the variables anywhere: h1 { font-size: var(--text-4xl); }, p { font-size: var(--text-base); }. For Tailwind, paste the fontSize object into tailwind.config.js under theme.extend.fontSize — your existing text-xl, text-2xl classes then output fluid clamp() values. For SCSS, use the $text-base, $text-lg variable names in your component stylesheets after importing the variables file.' }
    },
    {
      '@type': 'Question',
      name: 'How do I preview what font sizes look like at different screen sizes?',
      acceptedAnswer: { '@type': 'Answer', text: 'Drag the Viewport slider left to simulate a mobile screen (360px) or right to simulate a wide desktop (1440px). All eight font sizes update in real time showing both live text rendering and the exact computed pixel size. This lets you verify that sizes like 3xl and 4xl aren\'t too overwhelming on mobile or too small on desktop before committing to the values.' }
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CSS Clamp() Generator',
  url: 'https://webdevpuneet.com/css-clamp-generator/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free — Fluid typography generator that produces a complete 8-step type scale using CSS clamp(). Visual viewport slider, 6 scale ratios, step-by-step formula explainer, CSS vars, Tailwind config, and SCSS export.',
  featureList: ['Full 8-step type scale (xs–4xl)', 'Visual viewport width slider with live preview', '6 scale ratio presets + custom', 'Slope/intercept formula explainer', 'CSS custom properties output', 'Tailwind fontSize config output', 'SCSS variables output', 'rem/px unit toggle'],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'CSS Clamp() Generator', item: 'https://webdevpuneet.com/css-clamp-generator/' },
  ],
};

const SEO = {
  slug: 'css-clamp-generator',
  title: 'CSS Clamp() Generator — Fluid Responsive Typography',

  about: {
    title: 'Generate a Fluid Type Scale With CSS clamp() — No Media Queries, Export as CSS Vars, Tailwind, or SCSS',
    description: `You need responsive typography that scales smoothly between mobile and desktop — not a fixed font size that jumps between two breakpoints with a \`@media\` query. \`clamp()\` is the CSS solution: it linearly interpolates between a minimum and maximum size based on viewport width, producing smooth scaling with no layout jumps. This tool calculates the complete formula and outputs a full 8-step scale (xs through 4xl) in one click.\n\nSet four inputs — min base size, max base size, min viewport width, max viewport width — pick a type scale ratio, and the tool generates eight fluid \`clamp()\` expressions that form a proportional typographic system. The math: \`slope = (maxSize − minSize) / (maxViewport − minViewport)\`, \`preferred = intercept + slope × 100vw\`, \`clamp(minSize, preferred, maxSize)\`. You don't need to do this by hand — the Formula panel shows every step of the calculation for any selected size so you can understand and verify it.\n\n\`clamp()\` takes exactly three arguments and CSS evaluates them independently every time the viewport changes: below the min viewport, the middle \`vw\`-based expression computes smaller than the first argument so the browser clamps to that fixed minimum; above the max viewport, the same expression computes larger than the third argument so it clamps to the fixed maximum; between the two, the raw \`vw\` calculation wins and produces the linear ramp. This is why the formula needs both a slope and an intercept rather than a bare percentage — a pure \`vw\` value scales from zero at 0px viewport width, but typography needs to start at a specific minimum size at a specific minimum viewport, so the intercept shifts the line to pass through that point exactly. Each of the eight steps applies your chosen ratio as an exponent against the base size rather than its own independent min/max pair, which keeps the scale visually proportional instead of eight arbitrary numbers — change the ratio or base size once and every step recalculates in sync.\n\nSix scale ratio presets — Minor Third (1.2), Major Third (1.25), Perfect Fourth (1.333), Augmented Fourth (1.414), Perfect Fifth (1.5), Golden Ratio (1.618) — plus a custom input. A visual viewport slider lets you preview all eight font sizes at any width between your min and max. Export as CSS custom properties (\`--text-xs\` through \`--text-4xl\`), a Tailwind \`fontSize\` config object for \`tailwind.config.js\`, or SCSS variables.`,
  },

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Set the viewport range',
        text: 'In the Viewport Range section, set Min viewport to the smallest screen you support — 360px works for modern Android phones. Set Max viewport to your widest desktop breakpoint — 1440px is the most common choice. These two values define the window over which all font sizes scale linearly. Values outside this range are clamped to the fixed min or max size.',
      },
      {
        title: 'Set the base font size range',
        text: 'In the Base Font Size section, set Min to your desired body font size at the minimum viewport (typically 16px) and Max to the size you want at the maximum viewport (typically 18–20px for body text). The Root font size field (default 16px) is used only for rem conversion — set it if your document uses a non-default `html { font-size: ... }` value.',
      },
      {
        title: 'Choose a type scale ratio',
        text: 'Open the Type Scale dropdown and select a ratio. **Major Third (1.25)** is the default and works well for most UI design systems — clear but not dramatic size jumps. **Perfect Fourth (1.333)** suits editorial or marketing sites that need a bold heading hierarchy. **Golden Ratio (1.618)** creates very large jumps for display typography on landing pages. Select **Custom** to enter any ratio from 1.01 to 3.',
      },
      {
        title: 'Choose rem or px output',
        text: 'Toggle between `rem` and `px` output. `rem` is strongly recommended for accessibility: it scales proportionally if the user changes their browser default font size, satisfying WCAG 1.4.4 (Resize Text, Level AA). `px` output ignores browser font preferences and is appropriate only when you have specific technical requirements for fixed pixel values.',
      },
      {
        title: 'Preview at any viewport width',
        text: 'In the Preview pane, drag the Viewport slider left (toward your minimum) to simulate mobile, or right (toward your maximum) to simulate a wide desktop. All eight font sizes — xs, sm, base, lg, xl, 2xl, 3xl, 4xl — update live with actual rendered text and a px badge showing the exact computed size at that viewport. Click any size row to see the full slope/intercept formula derivation for that step in the Formula panel.',
      },
      {
        title: 'Export the generated scale',
        text: 'Switch between the **CSS Vars**, **Tailwind**, and **SCSS** tabs in the output panel. CSS Vars outputs a `:root { }` block with `--text-xs` through `--text-4xl` custom properties. Tailwind outputs a `tailwind.config.js` `fontSize` object ready to paste into `theme.extend.fontSize`. SCSS outputs `$text-xs` through `$text-4xl` variable declarations. Click Copy to copy the output.',
      },
    ],
  },

  features: [
    'Full 8-step type scale in one operation: xs, sm, base, lg, xl, 2xl, 3xl, 4xl — all from a single ratio and base size',
    'Visual viewport slider (min–max range) with live font size preview — see exact px sizes at any viewport width',
    '6 scale ratio presets: Minor Third, Major Third, Perfect Fourth, Aug. Fourth, Perfect Fifth, Golden Ratio + custom input',
    'Step-by-step formula explainer showing slope, intercept, and derivation for every selected size',
    'CSS custom properties output (:root with --text-xs through --text-4xl)',
    'Tailwind CSS fontSize config output — paste into tailwind.config.js theme.extend.fontSize; sort your Tailwind classes with our [Tailwind Formatter](/tailwind-formatter/)',
    'SCSS variables output ($text-xs through $text-4xl) for SCSS/Sass workflows',
    'rem/px unit toggle — rem output respects user browser font size preferences (WCAG 1.4.4 compliance); convert rem values with our [REM to PX Converter](/rem-px-converter/)',
    'Configurable root font size for accurate rem conversion on non-standard base sizes',
    '100% client-side — all calculations run in the browser, nothing is sent to any server; apply sizes to a fluid layout with our [Flexbox Builder](/flexbox-builder)',
  ],

  useCases: [
    {
      icon: '✦',
      title: 'Replace @media font-size breakpoints with smooth fluid scaling',
      desc: 'If your stylesheet has `@media (max-width: 768px) { h1 { font-size: 2rem; } }` style rules, replace them with a single clamp() value. Set min/max viewport widths to match your breakpoints and min/max sizes to your two values — the clamp() output replaces both rules.',
    },
    {
      icon: '⬡',
      title: 'Add fluid typography to a Tailwind project without overriding every class',
      desc: 'Export the Tailwind fontSize config and paste it into tailwind.config.js under theme.extend.fontSize. All your existing text-xl, text-2xl etc. classes immediately output fluid clamp() values — no changes to templates. The generated values respect Tailwind\'s naming conventions. Pair with our [Font Pairing Tool](/font-pairing-tool/) to choose typefaces for the scale.',
    },
    {
      icon: '⚡',
      title: 'Create dramatic fluid headings for a landing page or marketing site',
      desc: 'Use Golden Ratio (1.618) or Perfect Fifth (1.5) for maximum size contrast. Set a small min base (15px) and large max base (22px) — the 4xl and 3xl sizes will be commanding at wide viewports while xs and sm remain readable on mobile.',
    },
    {
      icon: '△',
      title: 'Generate rem-based clamp() values that respect user browser font preferences',
      desc: 'Use rem output so the min and max values scale with the user\'s browser default. If a user sets their browser to 20px, all rem-based clamp() sizes scale proportionally. Required for WCAG 1.4.4 (Resize Text, Level AA) compliance.',
    },
    {
      icon: '◑',
      title: 'Build a complete design system type scale from one ratio and base size',
      desc: 'Set min base to 16px, max to 18px, Perfect Fourth ratio. Export the CSS custom properties (--text-xs through --text-4xl) for a :root block. Every component references the same tokens — update the entire system\'s typography by changing two numbers. Preview the scale across viewports with our [Responsive Preview Tool](/responsive-preview-tool/).',
    },
    {
      icon: '▦',
      title: 'Compare type scale ratios visually before committing',
      desc: 'Drag the viewport slider to see how all eight sizes look at any width. Switch between ratio presets — Minor Third (subtle) to Golden Ratio (dramatic) — and watch how heading-to-body size contrast changes in real time before writing any CSS.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function CssClampGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><CssClampGeneratorTool /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
