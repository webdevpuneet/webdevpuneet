import CssMediaQueriesGeneratorTool from '@/components/CssMediaQueriesGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'CSS Media Queries Generator — Free Breakpoints & Features Online | webdevpuneet.com',
  description: 'Generate CSS media queries visually — Bootstrap, Tailwind, or MUI breakpoints plus dark mode and print. Export CSS, SCSS, or Tailwind config. Free.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/css-media-queries-generator/' },
  icons: { icon: '/icons/css-media-queries-generator.svg', shortcut: '/icons/css-media-queries-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/css-media-queries-generator/',
    siteName: 'webdevpuneet.com',
    title: 'CSS Media Queries Generator — 4 Formats, 10 Feature Queries, 3 Presets',
    description: 'Configure breakpoints visually using Bootstrap, Tailwind, or MUI presets. Add feature queries for dark mode, reduced motion, print, retina. Export as CSS, SCSS, Tailwind config, or JS strings.',
    images: [{ url: 'https://webdevpuneet.com/images/css-media-queries-generator.png', width: 1200, height: 800, alt: 'CSS Media Queries Generator' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'CSS Media Queries Generator — Breakpoints + Feature Queries',
    description: 'Generate CSS, SCSS, Tailwind config, and JS media query strings in one tool. Supports Bootstrap, Tailwind, MUI presets and 10 feature queries.',
    images: ['https://webdevpuneet.com/images/css-media-queries-generator.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the difference between min-width and max-width media queries?',
      acceptedAnswer: { '@type': 'Answer', text: 'Min-width queries implement a mobile-first approach: you write default styles for small screens and use @media (min-width: 768px) to add or override styles for larger screens. This is considered best practice because it keeps your baseline CSS simple and adds complexity as the viewport grows. Max-width queries implement a desktop-first approach: you write default styles for large screens and use @media (max-width: 767px) to override styles for smaller screens. Both approaches produce the same visual result — the choice depends on your workflow. Mobile-first is generally recommended for new projects because mobile traffic dominates and it tends to produce leaner, more performant stylesheets.' },
    },
    {
      '@type': 'Question',
      name: 'What is the modern CSS range syntax for media queries?',
      acceptedAnswer: { '@type': 'Answer', text: 'The modern range syntax was introduced in the Media Queries Level 4 specification and uses comparison operators instead of min-/max- prefixes. Traditional syntax: @media (min-width: 768px). Modern range syntax: @media (width >= 768px). For a range between two breakpoints: traditional uses @media (min-width: 576px) and (max-width: 767px), while modern uses @media (576px <= width < 768px). The modern syntax is more readable, supports half-open intervals, and avoids the off-by-one pixel issues common with min/max (like using 767.98px). Browser support for range syntax is 95%+ globally as of 2026, making it safe for production use in most projects.' },
    },
    {
      '@type': 'Question',
      name: 'What breakpoints does Bootstrap 5 use?',
      acceptedAnswer: { '@type': 'Answer', text: 'Bootstrap 5 defines six breakpoints: xs (0px — the default, no query), sm (576px), md (768px), lg (992px), xl (1200px), and xxl (1400px). Bootstrap uses a mobile-first approach, so these are all min-width breakpoints. The framework generates utility classes like .d-md-flex, .col-lg-6, and .container-xl based on these breakpoints. Bootstrap also uses fractional pixel values like 575.98px for max-width queries in its internal CSS to avoid the edge case where a browser renders a 576px wide viewport as both sm and below-sm simultaneously.' },
    },
    {
      '@type': 'Question',
      name: 'What breakpoints does Tailwind CSS use?',
      acceptedAnswer: { '@type': 'Answer', text: 'Tailwind CSS uses five default breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px), and 2xl (1536px). All are min-width breakpoints, making Tailwind inherently mobile-first. Breakpoints in Tailwind are applied as class prefixes: sm:text-lg means text-lg applies at 640px and up. Unlike Bootstrap, Tailwind does not include a zero-breakpoint for the smallest size — mobile styles are applied by using unprefixed classes. The Tailwind config supports custom breakpoints, max-width breakpoints (screens.md.max), and feature-based variants (screens.dark.raw) using the raw property.' },
    },
    {
      '@type': 'Question',
      name: 'How do I use the SCSS mixin output in my project?',
      acceptedAnswer: { '@type': 'Answer', text: 'Copy the SCSS output and paste it into a _breakpoints.scss (or _mixins.scss) partial in your SCSS project. Then import it at the top of your other SCSS files: @use "breakpoints" (Sass modules) or @import "breakpoints" (legacy). Use the mixins with @include: .element { font-size: 14px; @include bp-md { font-size: 16px; } @include dark-mode { color: #f0f0f0; } }. The mixins use @content which means your rules are injected inside the generated @media block. SCSS compiles the $bp-* variables at build time, so the output CSS uses plain pixel values — not CSS variables — which is important because CSS custom properties (var()) cannot be used inside @media conditions.' },
    },
    {
      '@type': 'Question',
      name: 'How do I add the Tailwind config output to my project?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Tailwind config output shows the screens section of your tailwind.config.js. Copy the screens object and paste it into the theme section of your existing config file. For Tailwind v3: replace or extend the existing screens in theme.screens or theme.extend.screens. For Tailwind v4 (CSS-first config), breakpoints are defined differently using @theme { --breakpoint-md: 768px; } in your CSS file — the JS config format shown here applies to v3. Feature-based variants like dark and motion-reduce in the screens config create custom variants you can use as class prefixes: dark:bg-gray-900 and motion-reduce:transition-none.' },
    },
    {
      '@type': 'Question',
      name: 'What are CSS feature queries and how are they different from breakpoint queries?',
      acceptedAnswer: { '@type': 'Answer', text: 'Breakpoint queries test the viewport or device dimensions (width, height, aspect ratio, resolution). Feature queries test user preferences or device capabilities rather than dimensions. Examples include: prefers-color-scheme: dark (user has enabled dark mode in OS settings), prefers-reduced-motion: reduce (user has requested less animation in accessibility settings), prefers-contrast: more (high contrast mode enabled), pointer: coarse (touch device with imprecise input), hover: none (device cannot hover, typically touch), orientation: portrait/landscape (screen rotation), print (document is being printed), and min-resolution: 2dppx (retina or high-DPI display). Feature queries do not trigger at specific pixel widths — they respond to the user\'s environment and preferences, making them essential for accessibility and multi-device support.' },
    },
    {
      '@type': 'Question',
      name: 'Why does the SCSS mixin use $bp-name - 1px for range queries instead of an exact value?',
      acceptedAnswer: { '@type': 'Answer', text: 'In traditional media query syntax, min-width and max-width are both inclusive. So @media (min-width: 576px) and (max-width: 768px) would match both a 576px viewport (the sm breakpoint) AND a 768px viewport (the md breakpoint) simultaneously. To create exclusive ranges, the upper bound is set to one pixel below the next breakpoint: max-width: 767px. In SCSS, this can be expressed as $bp-md - 1px (768px - 1px = 767px) using Sass arithmetic. This ensures the "sm only" range catches viewports from 576px to exactly 767px, with 768px and above belonging to "md". In modern range syntax, you use the < operator instead: (576px <= width < 768px) which makes the intent explicit without the off-by-one calculation.' },
    },
    {
      '@type': 'Question',
      name: 'Can I use the JS output with React, Next.js, or Vue?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The JS output exports two objects: bp (numeric pixel values) and mq (string media query expressions). The bp object is useful for JavaScript-driven breakpoint logic or when passing values to a charting library. The mq object is designed for use with CSS-in-JS libraries. With styled-components: const Box = styled.div`color: #333; ${mq.md} { font-size: 18px; }`. With Emotion (CSS prop): css={{ [mq.md]: { fontSize: 18 } }}. With vanilla CSS Modules or plain React, you would typically not use the JS strings directly — use the CSS or SCSS output instead. For Next.js App Router server components, use the CSS output; for styled-components with Next.js, use the JS output with the ServerStyleSheet configuration.' },
    },
    {
      '@type': 'Question',
      name: 'What does "include range queries" add to the output?',
      acceptedAnswer: { '@type': 'Answer', text: 'When "Include range queries" is enabled, the CSS and SCSS outputs gain an additional section showing "only" queries — media queries that target a specific breakpoint range exclusively. For example, with Bootstrap breakpoints: the main section shows @media (min-width: 576px) which means "sm and everything wider." The range section adds @media (min-width: 576px) and (max-width: 767px) which means "sm only, not md or wider." These are useful when you need styles to apply exclusively at one screen size — for example, hiding a sidebar only on tablet-sized screens without affecting mobile or desktop. In SCSS, the range mixins are named with -only suffix: @include bp-sm-only. The range queries follow the convention of placing the upper bound at (next breakpoint - 1)px.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CSS Media Queries Generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Visual CSS media queries generator with Bootstrap, Tailwind, and MUI presets, 10 feature queries, and output in CSS, SCSS, Tailwind config, and JS formats.',
  url: 'https://webdevpuneet.com/css-media-queries-generator/',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'CSS Media Queries Generator', item: 'https://webdevpuneet.com/css-media-queries-generator/' },
  ],
};

const seoData = {
  slug: 'css-media-queries-generator',
  title: 'CSS Media Queries Generator — Breakpoints, Features & 4 Output Formats',
  about: {
    title: 'Generate CSS Media Queries for Bootstrap, Tailwind, or Your Own Breakpoints — 4 Output Formats',
    description: `You're starting a new project and need to configure breakpoints consistently — but should you use Bootstrap's values, Tailwind's, or something custom? You need a dark mode media query, a retina image query, and a print stylesheet block, but you can't remember the exact syntax for each. You want a shared SCSS breakpoints partial the whole team can \`@include\` from. This tool generates all of it at once from a single configuration, keeping every output format in sync.\n\nSelect a preset — **Bootstrap 5** (xs, sm, md, lg, xl, xxl), **Tailwind CSS** (sm, md, lg, xl, 2xl), or **Material UI** (xs, sm, md, lg, xl) — and edit any breakpoint name or pixel value to match your design system; changing any value flips the preset badge to "custom" so you always know whether you're still on the stock scale. Toggle between **min-width** (mobile-first) and **max-width** (desktop-first): the direction toggle doesn't just swap the query text, it reorders the Tailwind config output (desktop-first breakpoints are listed largest-first and wrapped as \`{ max: 'Npx' }\` instead of a bare string, matching how Tailwind expects max-width screens to be declared). Switch between **traditional** \`(min-width: 768px)\` syntax and the modern **Level 4 range syntax** \`(width >= 768px)\` — supported by 95%+ of browsers globally as of 2026.\n\nEnabling **Include range queries** adds "only" queries that target a single breakpoint exclusively. Because min-width and max-width are both inclusive bounds, an exclusive range has to subtract one pixel from the next breakpoint to avoid double-matching at the boundary — the generator handles this automatically, emitting \`max-width: $bp-md - 1px\` in SCSS (calculated at compile time from the variable) and a literal \`- 1\` pixel value in plain CSS, while the range-syntax output sidesteps the problem entirely using an exclusive \`<\` comparison.\n\nTen **feature query toggles** add non-dimension queries — dark mode (\`prefers-color-scheme: dark\`), light mode, reduced motion, high contrast, print, retina/2×, portrait, landscape, coarse-pointer touch, and no-hover — each mapped to its correct \`@media\` condition and, for the Tailwind output, wired up as a \`raw\` screen variant so it becomes a usable class prefix.\n\nFour export formats cover different stacks: annotated **CSS**, an **SCSS** partial with aligned \`$bp-\` variables and \`@mixin\` shortcuts using \`@content\`, a **Tailwind** \`screens\` config object, and a **JS** module exporting both a numeric \`bp\` object and a string \`mq\` object for styled-components or Emotion template literals.`,
  },
  features: [
    '**3 framework presets** — Bootstrap 5 (6 breakpoints), Tailwind CSS (5 breakpoints), Material UI (5 breakpoints), all instantly loadable — matching the breakpoints taught in the [Tailwind playground](/tailwind-playground) and [Bootstrap 5 playground](/bootstrap5-playground)',
    '**Fully editable breakpoints** — rename and change pixel values; add or remove breakpoints; custom badge appears when you deviate from a preset',
    '**Direction toggle** — switch between min-width (mobile-first) and max-width (desktop-first) with a single click',
    '**Syntax toggle** — traditional `(min-width: X)` or modern Level 4 range syntax `(width >= X)` — works across CSS, SCSS, and JS outputs',
    '**Range queries toggle** — adds "only" queries for precise single-breakpoint targeting with correct `- 1px` upper bounds in SCSS',
    '**10 feature query toggles** — dark mode, light mode, reduced motion, high contrast, print, retina/2×, portrait, landscape, touch (coarse pointer), no-hover',
    '**CSS output** — clean, annotated `@media` rules with section headers for breakpoints, ranges, and feature queries',
    '**SCSS output** — `$bp-*` variables aligned for readability + `@mixin bp-*` and feature mixins with `@content` — paste into a `_breakpoints.scss` partial',
    '**Tailwind output** — `theme.screens` config object with standard breakpoints and feature raw variants; supports both min-width and max-width (desktop-first) formats',
    '**JS output** — `bp` numeric object + `mq` string object for styled-components, Emotion, and CSS-in-JS; includes usage comment',
  ],
  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Choose a framework preset',
        text: 'Click Bootstrap 5, Tailwind CSS, or Material UI to load the standard breakpoints for that framework. Bootstrap 5 loads six breakpoints (xs through xxl), Tailwind loads five (sm through 2xl), and Material UI loads five (xs through xl). Select any preset as a starting point even if you plan to customize — it is faster than building from scratch.',
      },
      {
        title: 'Edit breakpoint names and values',
        text: 'The breakpoint list shows each entry sorted by pixel value. Click any name field to rename it, or click the number field to change the pixel value. Click × to remove a breakpoint. Click "+ Add Breakpoint" to append a new one pre-filled 200px above your current maximum. A "custom" badge appears in the preset bar whenever you modify a preset\'s values.',
      },
      {
        title: 'Set direction and syntax',
        text: 'Use the `min-width` / `max-width` pills to choose mobile-first or desktop-first query direction. Then choose Traditional (`(min-width: X)`, works in all browsers) or Range syntax (`(width >= X)`, supported by 95%+ of browsers globally as of 2026 and considered the modern standard). Your choice applies to the CSS, SCSS, and JS outputs simultaneously.',
      },
      {
        title: 'Enable range queries if needed',
        text: 'Check "Include range queries" to add a second section of single-breakpoint "only" queries — for example, a query that targets sm-size screens specifically without cascading to md and above. These use the `and (max-width: next - 1px)` pattern in CSS and SCSS, and the `< next` comparison in range syntax.',
      },
      {
        title: 'Toggle feature queries',
        text: 'Scroll to the Feature Queries section and enable any non-dimension media features your project needs. Dark mode (`prefers-color-scheme: dark`) and Reduced Motion are on by default. Other options include Light Mode, High Contrast, Print, Retina/2×, Portrait, Landscape, Touch (coarse pointer), and No Hover. Each enabled feature adds the correct `@media` block to all four output formats.',
      },
      {
        title: 'Copy in your preferred format',
        text: 'Click the CSS, SCSS, Tailwind, or JS tab at the top of the right panel to switch output format. CSS gives annotated `@media` blocks. SCSS gives `$bp-*` variables plus `@mixin bp-*` shortcuts ready for a `_breakpoints.scss` partial. Tailwind gives a `theme.screens` config object for `tailwind.config.js`. JS gives `bp` (numeric values) and `mq` (string expressions) objects for styled-components and Emotion. Click ⎘ Copy to copy.',
      },
    ],
  },
  useCases: [
    { icon: '📱', title: 'Set up a consistent breakpoint system on day one of a project', desc: 'Pick a preset, adjust to your design system values, and export the SCSS partial and Tailwind config simultaneously. Prevents the common situation of different breakpoints in different components. Build the layouts themselves in the [CSS grid builder](/css-grid-builder).' },
    { icon: '🌙', title: 'Add dark mode, reduced motion, and high contrast media queries for accessibility', desc: 'Toggle on prefers-color-scheme, prefers-reduced-motion, and prefers-contrast to generate the full set of accessibility-aware @media rules. Copy the SCSS or CSS output into your stylesheet.' },
    { icon: '🖨️', title: 'Generate a @media print block as a starting point for a print stylesheet', desc: 'Enable the Print toggle and get a properly formatted block. Use it as the scaffold for hiding navigation, removing shadows, resetting font sizes, and setting page margins for paper output.' },
    { icon: '🔄', title: 'Migrate breakpoints from Bootstrap to Tailwind or from SCSS to styled-components', desc: 'Configure your breakpoints once and export in all four formats simultaneously — CSS, SCSS, Tailwind config, and JS strings. Useful when switching frameworks and needing the same values in a new format.' },
    { icon: '✦', title: 'Get the correct retina media query for serving @2x images', desc: 'Enable the Retina / 2× toggle to generate the (min-resolution: 2dppx) and (-webkit-min-device-pixel-ratio: 2) block. Paste it around your background-image or srcset logic.' },
    { icon: '👆', title: 'Remove hover effects on touch devices where they never fire correctly', desc: 'Enable Touch (coarse pointer) and No Hover to generate pointer and hover media queries. Use them to conditionally apply hover styles only on devices that support real hover, and increase tap targets on touch.' },
  ],
  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function CssMediaQueriesGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.page}>
        <div className={styles.toolSection}>
          <CssMediaQueriesGeneratorTool />
        </div>
        <AdSlot />
        <IndexOnly><SeoSection {...seoData} /></IndexOnly>

      </div>
    </>
  );
}
