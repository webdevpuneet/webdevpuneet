import CssToTailwindTool from '@/components/CssToTailwindTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'CSS to Tailwind Converter Online Free | webdevpuneet.com',
  description: 'Convert CSS to Tailwind utility classes instantly — handles 100+ properties, flexbox, grid, colors, and arbitrary value fallbacks. Free, no sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/css-to-tailwind/' },
  icons: { icon: '/icons/css-to-tailwind.svg', shortcut: '/icons/css-to-tailwind.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/css-to-tailwind/',
    siteName: 'webdevpuneet.com',
    title: 'CSS to Tailwind Converter — Convert CSS to Utility Classes Online Free',
    description: 'Paste CSS and instantly get the equivalent Tailwind utility classes. Supports 100+ properties — flexbox, grid, spacing, colors, typography, arbitrary value fallbacks. Free, no sign-up.',
    images: [{ url: 'https://webdevpuneet.com/images/css-to-tailwind-converter.png', width: 1200, height: 630, alt: 'CSS to Tailwind Converter' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'CSS to Tailwind Converter — Convert CSS to Utility Classes Online Free',
    description: 'Paste CSS and instantly get Tailwind utility classes — supports 100+ properties, arbitrary value fallbacks, @media queries, JSX output. Free, no sign-up.',
    images: ['https://webdevpuneet.com/images/css-to-tailwind-converter.png'],
  },
};

const seoData = {
  slug: 'css-to-tailwind',
  title: 'CSS to Tailwind Converter — Convert CSS to Utility Classes Online',

  about: {
    title: 'Paste CSS, Get Tailwind Classes — Handles Arbitrary Values for Any Custom Size or Color',
    description: `You're migrating a component from CSS Modules to Tailwind, or you copied CSS from Figma's inspect panel and want the equivalent Tailwind classes without manually looking up each spacing value in the docs. Paste the CSS here and get the Tailwind class string in under a second.\n\nSupports 100+ CSS properties: all display values, flexbox, grid, every margin/padding variant, sizing (min/max width and height), typography, colors, borders, border-radius, box-shadow, opacity, overflow, transitions, and transforms. Spacing values go through a lookup table built on Tailwind's 4px-per-unit scale — \`16px\` maps to \`4\` because 16 ÷ 4 = 4, and \`rem\` values are first converted to pixels (multiplied by 16) before the same lookup runs, so \`1rem\` and \`16px\` both resolve to the same class. Percentage values check a second table for common fraction classes like \`1/3\`, \`2/5\`, and \`full\` before falling back to an arbitrary value. Named CSS colors (\`red\`, \`cornflowerblue\`, \`forestgreen\`) are mapped to their closest approximate Tailwind palette shade through a curated color table, while hex, rgb(), and hsl() values — which have no reliable one-to-one palette equivalent — are output as arbitrary values with internal spaces escaped to underscores, e.g. \`bg-[rgb(20_20_30)]\`. A dedicated border-shorthand parser reads width, style, and color together from a single \`border: 1px solid #ddd\`-style declaration, including decimal widths like \`1.5px\` that a naive integer-only regex would silently drop.\n\nFor any value outside these tables — an unusual pixel size, an uncommon percentage, an odd font size — the converter falls back to Tailwind's arbitrary value syntax automatically: \`padding: 18px\` → \`p-[18px]\`, \`color: #2d5be3\` → \`text-[#2d5be3]\`. Arbitrary value classes are highlighted in amber in the output so you can spot non-standard design tokens immediately; the output is always valid Tailwind syntax, ready to paste without modification.\n\nThree output formats — **Classes** (just the string for className/class), **HTML** (wrapped in a div), and **JSX** (wrapped with className for React) — cover different destinations. Paste full CSS rule blocks with selectors and each selector is annotated as a comment above its class list; \`@media\` queries are detected and their breakpoint context is annotated in a comment, though Tailwind's own \`sm:\`/\`md:\` prefixes must still be added by hand. Drag and drop a .css file to convert an entire stylesheet at once, and the last 15 conversions are auto-saved to a local history panel for quick recall.`,
  },

  features: [
    'Converts 100+ CSS properties to Tailwind utility classes — display, position, flexbox, grid, spacing, sizing, typography, colors, borders, effects, and more',
    'Arbitrary value fallbacks for any value outside Tailwind\'s default scale — w-[420px], text-[#3b82f6], gap-[18px], etc.',
    'Parses full CSS rules with selectors (e.g. .card { ... }) and outputs selector as a comment above the class list',
    '@media query detection — nested declarations are processed and output with the media context annotated',
    'Three output formats: Classes (plain string), HTML (div with class=""), JSX (div with className=""); convert JSX further with our [HTML to JSX Converter](/html-to-jsx-converter/)',
    'CSS syntax highlighting in the input panel — selectors, properties, values, and at-rules all highlighted',
    'Tailwind output highlighting — arbitrary value classes highlighted in amber to distinguish from standard utilities',
    'Live conversion — output updates as you type with no delay',
    'File upload and drag & drop for .css files — convert entire stylesheets at once; compare the before/after with our [Diff Checker](https://fwdtools.com/diff-checker/)',
    'One-click Copy and Download for the converted output',
    '100% client-side — no CSS is ever sent to a server, no sign-up required; go back from Tailwind to CSS with our [Tailwind to CSS](/tailwind-to-css) converter',
  ],

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Paste your CSS into the left panel',
        text: 'Paste bare property-value declarations like `display: flex; align-items: center; padding: 16px;` or full CSS rule blocks like `.card { display: flex; padding: 24px; background: #fff; border-radius: 8px; }`. The converter auto-detects both formats. Multiple rule blocks can be pasted at once — each selector appears as a comment above its corresponding class list in the output.',
      },
      {
        title: 'Review the live Tailwind output',
        text: 'The right panel updates instantly as you type — no button click needed. Tailwind utility classes appear immediately. Standard-scale values map to named utilities like `p-6`, `rounded-lg`, or `flex`. Values outside Tailwind\'s default scale — custom pixel sizes, hex colors, unusual font sizes — are output as arbitrary value classes highlighted in amber: `rounded-[12px]`, `bg-[#2d5be3]`, `text-[17px]`.',
      },
      {
        title: 'Choose an output format',
        text: 'Use the three tabs at the top right of the output panel to switch format. **Classes** gives the raw class string — paste directly into any `className` or `class` attribute. **HTML** wraps the classes in a `<div class="...">` element for quick HTML prototyping. **JSX** wraps them in `<div className="...">` for React and Next.js components.',
      },
      {
        title: 'Upload a .css file for bulk conversion',
        text: 'Click **Upload** in the toolbar or drag and drop any .css file directly onto the input panel. The file contents load into the editor and conversion runs immediately. Useful for migrating a complete component stylesheet or converting a design system CSS file all at once.',
      },
      {
        title: 'Handle amber-highlighted arbitrary values',
        text: 'Arbitrary value classes in the output are highlighted in amber. Each one indicates a CSS value that doesn\'t match Tailwind\'s default scale. Review these — they may be good candidates for extending your `tailwind.config.js` theme with a custom design token, or you may decide to round to the nearest Tailwind scale value.',
      },
      {
        title: 'Copy or download the output',
        text: 'Click **Copy** to copy the output to your clipboard. Click **Download** to save it as a `.txt` file for reference during a migration. The History panel automatically saves the last 15 conversion sessions — click any entry to restore that session\'s input and output.',
      },
    ],
  },

  useCases: [
    {
      icon: '⇢',
      title: 'Migrate a component from CSS Modules or SCSS to Tailwind',
      desc: 'Paste each CSS rule block, take the Classes output, and add it to the JSX className. The mechanical conversion is automated — only the amber-highlighted arbitrary values need decisions about whether to normalize to your design scale. Sort the resulting classes with our [Tailwind Formatter](/tailwind-formatter/) to keep them consistent.',
    },
    {
      icon: '⚡',
      title: 'Convert Figma CSS or DevTools output to Tailwind classes',
      desc: 'Figma\'s inspect panel and browser DevTools both output CSS. Paste directly and get Tailwind classes without manually looking up spacing scales, border-radius values, or font sizes in the Tailwind documentation.',
    },
    {
      icon: '{}',
      title: 'Understand how CSS maps to Tailwind without reading the docs',
      desc: 'Paste any CSS rule you already understand and see which Tailwind classes correspond. The concrete mapping applied to your specific input builds the mental model faster than reading abstract documentation.',
    },
    {
      icon: '◑',
      title: 'Convert CSS from a UI kit or Stack Overflow snippet to Tailwind',
      desc: 'Copy CSS from a component library example or snippet site and convert it to Tailwind for use in a utility-first project — avoids mixing custom CSS files into an otherwise Tailwind-only codebase. Then minify any remaining CSS with our [CSS Minifier & Beautifier](/css-minifier-beautifier).',
    },
    {
      icon: '▦',
      title: 'Check if a CSS refactor can be fully expressed in Tailwind',
      desc: 'Paste the original CSS and see whether the output contains any amber-highlighted arbitrary values. Those indicate non-standard design tokens that don\'t align with Tailwind\'s default scale — useful context for a refactor PR review.',
    },
    {
      icon: '⊞',
      title: 'Write CSS intuitively, then convert to Tailwind when done',
      desc: 'Prototype with standard CSS (which some find faster to write), then convert the result to Tailwind once the design is finalized. Use the JSX tab to get className output ready for React without manual reformatting.',
    },
  ],

  faqs: [
    {
      q: 'How do I convert CSS to Tailwind classes online?',
      a: 'Paste your CSS declarations directly into the input panel — for example display: flex; align-items: center; padding: 16px; — and the Tailwind class string appears instantly in the output panel on the right. No button press required. You can paste bare property-value pairs or full CSS rule blocks with selectors. If you paste a full block like .card { display: flex; padding: 24px; }, the selector is shown as a comment above the resulting class list.',
    },
    {
      q: 'What if my CSS value isn\'t in Tailwind\'s default scale — like a custom px size or hex color?',
      a: "Any value that doesn't match Tailwind's built-in scale is output using Tailwind's arbitrary value syntax automatically. For example, padding: 18px becomes p-[18px], color: #2d5be3 becomes text-[#2d5be3], and border-radius: 12px becomes rounded-[12px]. Arbitrary value classes are highlighted in amber in the output panel so you can immediately identify which values are custom tokens versus standard Tailwind scale values. The output is always valid Tailwind and can be pasted directly without modification.",
    },
    {
      q: 'Can I paste a full CSS rule block with a selector like .card { ... }?',
      a: 'Yes. Paste a complete CSS rule block like .card { display: flex; padding: 24px; border-radius: 8px; } and the converter detects the selector (.card), outputs it as a comment above the resulting class list, and processes all declarations in the block. You can paste multiple rule blocks at once — each is processed independently with its selector annotated. Bare declarations without selectors also work and are converted directly.',
    },
    {
      q: 'How do I get JSX className output instead of a plain class string?',
      a: 'Use the tabs at the top right of the output panel to switch output format. Classes gives you the raw class string ready to paste into any className or class attribute. HTML wraps the classes in a <div class="..."> element for quick HTML prototyping. JSX wraps them in a <div className="..."> element for React, Next.js, or any JSX-based framework — paste it directly into a component without reformatting.',
    },
    {
      q: 'Does it convert @media queries?',
      a: 'Yes. The parser detects @media at-rules and processes the nested declarations, outputting each rule with the media context shown in an annotated comment. This handles the common pattern of responsive component stylesheets that already use breakpoint queries. Note that the output does not automatically add Tailwind responsive prefixes (sm:, md:, lg:) — the media context is annotated so you can add the appropriate Tailwind prefix to each class manually.',
    },
    {
      q: 'How does it handle hex color codes and rgb() values?',
      a: "Named CSS colors like red, blue, and green are mapped to approximate Tailwind palette names such as red-500 or blue-600. Hex codes and rgb/hsl values are output as arbitrary values like text-[#1f2937] since exact palette matching would require knowing your original design token. If you want palette classes instead of arbitrary values, use this tool to identify all your color values and then manually map each to the closest Tailwind palette color or extend your tailwind.config.js theme.",
    },
    {
      q: 'Can I upload a .css file to convert an entire stylesheet at once?',
      a: 'Yes. Click the Upload button in the toolbar to open a file picker and select any .css file, or drag and drop a .css file directly onto the input panel. The file contents load into the editor and conversion runs immediately. This is useful for converting complete component stylesheets or design system CSS files without copy-pasting. After conversion, click Download to save the output as a reference file.',
    },
    {
      q: 'Is my CSS uploaded to a server or kept private?',
      a: 'All conversion logic runs entirely in your browser. Your CSS is never sent to any server, never stored in any database, and never logged anywhere. This makes the tool safe for internal stylesheets, proprietary component code, client work, and any CSS you would prefer not to share with a third-party service. The tool also works fully offline once the page has loaded.',
    },
    {
      q: 'Does this work with Tailwind v4?',
      a: "The converter generates standard Tailwind utility class names and arbitrary value syntax compatible with both Tailwind v3 and v4. Tailwind v4 changed the configuration format and some class naming conventions for certain utilities, so a small number of class names may differ. For the vast majority of common properties — spacing, typography, colors, flexbox, grid — the output is identical between v3 and v4.",
    },
    {
      q: 'What\'s the fastest way to migrate a project from CSS Modules to Tailwind?',
      a: "Open each component's CSS file, paste each rule block into this converter one at a time, take the Classes output, and paste it into the corresponding JSX className. Check amber-highlighted arbitrary values — these are non-standard design tokens that may be worth normalizing to your tailwind.config.js theme scale. Delete the original CSS rule once converted. After all rules are migrated, remove the empty CSS file. This approach automates the mechanical part of the migration and leaves the design decisions about arbitrary values to you.",
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CSS to Tailwind Converter',
  url: 'https://webdevpuneet.com/css-to-tailwind/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online CSS to Tailwind converter that maps CSS declarations to Tailwind utility classes. Supports 100+ properties, arbitrary value fallbacks, full CSS rules with selectors, @media queries, and three output formats. 100% client-side.',
  featureList: seoData.features.join(', '),
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'CSS to Tailwind Converter', item: 'https://webdevpuneet.com/css-to-tailwind/' },
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

export default function Page() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}>
        <CssToTailwindTool />
      </div>
      <IndexOnly><AdSlot />
      <SeoSection {...seoData} /></IndexOnly>

    </div>
  );
}
