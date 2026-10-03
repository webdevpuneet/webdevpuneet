import TailwindToCssTool from '@/components/TailwindToCssTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Tailwind to CSS Converter Online Free | webdevpuneet.com',
  description: 'Convert Tailwind classes to plain CSS instantly. Supports 200+ utilities, arbitrary values, responsive and state variants, and JSX input. Free, no sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/tailwind-to-css/' },
  icons: { icon: '/icons/tailwind-to-css.svg', shortcut: '/icons/tailwind-to-css.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/tailwind-to-css/',
    siteName: 'webdevpuneet.com',
    title: 'Tailwind to CSS Converter — Expand Utility Classes to Plain CSS Online Free',
    description: 'Expand Tailwind CSS utility classes to standard CSS declarations. Supports 200+ classes, arbitrary values, responsive breakpoints, state variants, and HTML/JSX snippet input. Free, no sign-up.',
    images: [{ url: 'https://webdevpuneet.com/images/tailwind-to-css.png', width: 1200, height: 630, alt: 'Tailwind to CSS Converter' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Tailwind to CSS Converter — Expand Tailwind Classes to Plain CSS Online Free',
    description: 'Convert Tailwind utility classes to standard CSS. 200+ classes, arbitrary values, responsive and state variants. Free, no sign-up.',
    images: ['https://webdevpuneet.com/images/tailwind-to-css.png'],
  },
};

const seoData = {
  slug: 'tailwind-to-css',
  title: 'Tailwind to CSS Converter — Expand Utility Classes to Plain CSS Online',

  about: {
    title: 'See What Tailwind Classes Actually Do — Expand Any Class to Plain CSS Instantly',
    description: `You're debugging a layout and \`items-center\` isn't centering what you expect — but you're not sure if it's the wrong class or a parent container issue. You want to share a Tailwind className string with a teammate who doesn't know Tailwind. Or you're removing Tailwind from a project and need the equivalent CSS for each component's class list. Paste the class string here and see the exact CSS it produces in one click.\n\nThis converter expands Tailwind utility classes to their exact CSS declarations in real time. Each class first hits a static lookup table for fixed-value utilities like \`flex\` or \`items-center\`, then falls through to a set of pattern matchers keyed on prefix — \`p-\`, \`m-\`, \`w-\`, \`bg-\`, \`rounded-\`, and so on — each of which resolves its token against the matching Tailwind scale (spacing, the full color palette, font sizes, border radii, opacity, z-index) before emitting a CSS declaration. Classes that match nothing are collected separately and appear as a commented-out \`/* not converted */\` line rather than silently vanishing, so you always know what wasn't handled.\n\nVariant handling is where this goes beyond a simple lookup: the parser walks each class character by character, splitting on \`:\` while tracking bracket depth so that arbitrary variants like \`[&:hover]:bg-red-500\` aren't broken apart at the colon inside the brackets. Each variant resolves to either a media query (breakpoints \`sm\` through \`2xl\`, plus \`dark:\`, \`print:\`, and \`motion-safe:\`/\`motion-reduce:\`) or a pseudo-selector (\`hover:\`, \`focus:\`, \`nth-child\` patterns like \`odd:\`/\`even:\`, and pseudo-elements like \`before:\`/\`placeholder:\`). Classes are then grouped by their combined media+pseudo key so that, for example, every declaration produced by \`md:hover:bg-blue-500\` and \`md:hover:text-white\` lands in the same nested \`@media (min-width: 768px) { .element:hover { ... } }\` block instead of two separate ones.\n\nArbitrary value classes are handled throughout: \`w-[420px]\` expands to \`width: 420px\`, and underscore-encoded spaces resolve correctly so \`translate-x-[calc(50%_-_8px)]\` becomes \`transform: translateX(calc(50% - 8px))\`. Paste a bare class list, a full HTML element with \`class="..."\`, or JSX with \`className="..."\` — the tool auto-detects markup, extracts one selector per tag (\`.div\`, \`.button-2\` for a second button, etc.), and converts each independently. Output can be viewed as plain CSS, SCSS with nested variant blocks, or a camelCased JS style object, all client-side with nothing sent to a server.`,
  },

  features: [
    'Converts 200+ Tailwind utility classes to standard CSS declarations with accurate values',
    'Arbitrary value support — w-[420px], bg-[#3b82f6], p-[1.5rem], gap-[18px], translate-x-[calc(...)] all handled',
    'Responsive breakpoints — sm: md: lg: xl: 2xl: converted to correct @media (min-width: ...) rule blocks',
    'State variants — hover:, focus:, active:, disabled:, dark:, placeholder:, group-hover:, peer-focus: and more converted to proper CSS selectors and media rules',
    'HTML and JSX snippet input — paste a full component with class="..." or className="..." and the tool extracts and converts all classes automatically; use our [HTML Formatter](https://fwdtools.com/html-formatter/) to clean up the markup first',
    'Clean CSS output — base classes in .element { }, variants in separate .element:hover { } and @media { } blocks, all properly indented; minify the result with our [CSS Minifier & Beautifier](/css-minifier-beautifier)',
    'Conversion history — last 15 conversions auto-saved with one-click restore',
    'Syntax highlighting for Tailwind input and CSS output panels',
    'File upload and drag & drop for .txt, .html, .jsx, .tsx files',
    'Download output as a .css file',
    '100% client-side — no data uploaded, no sign-up required; reverse with our [CSS to Tailwind](/css-to-tailwind) converter',
  ],

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Paste Tailwind classes into the left panel',
        text: 'Paste a space-separated class list like `flex items-center justify-between p-4 bg-white rounded-lg shadow`, or an HTML element with a `class="..."` attribute, or a JSX element with `className="..."`. The tool strips markup and attribute syntax automatically and processes only the class values. Multiple elements can be pasted at once.',
      },
      {
        title: 'Review the live CSS output',
        text: 'The right panel updates instantly. Base classes appear in a single `.element { }` block. Responsive variant classes like `md:flex` or `lg:grid-cols-3` appear in separate `@media (min-width: ...)` blocks below. State variants like `hover:bg-blue-500` appear in `.element:hover { }` selectors. Dark mode classes like `dark:text-white` appear in `@media (prefers-color-scheme: dark)` blocks.',
      },
      {
        title: 'Handle arbitrary value classes',
        text: 'Arbitrary value classes like `w-[420px]`, `text-[#1f2937]`, `mt-[calc(100vh-4rem)]` expand to their exact CSS property and value. Underscores inside arbitrary values convert to spaces: `translate-x-[50%_-_8px]` becomes `transform: translateX(50% - 8px)`. All standard arbitrary value patterns including `calc()`, CSS custom properties, and URL values are supported.',
      },
      {
        title: 'Switch between CSS, SCSS, and JS Object output',
        text: 'Use the tabs in the header to switch output format. **CSS** gives a clean rule block. **SCSS** gives nested output with pseudo-class and media variants nested inside the selector. **JS Object** gives a JavaScript styles object with camelCased property names — useful for React inline styles or styled-components. Selector labels auto-generate from the HTML tag (`.div`, `.button`, etc.) and can be clicked to rename.',
      },
      {
        title: 'Upload a file for bulk conversion',
        text: 'Click **Upload** or drag and drop a `.html`, `.jsx`, `.tsx`, or `.txt` file onto the input panel. The tool reads the file, extracts all `class=""` and `className=""` attribute values it finds, and converts them. Each element gets its own CSS block with an annotated comment. You can rename the auto-generated selectors using the selector strip that appears below the toolbar.',
      },
      {
        title: 'Copy or download the CSS output',
        text: 'Click **Copy CSS**, **Copy SCSS**, or **Copy JS** (depending on the active tab) to copy to clipboard. Click **Download** to save the output as a `.css`, `.scss`, or `.js` file. The **History** panel stores the last 15 conversion sessions automatically — click any entry to restore that input and output instantly.',
      },
    ],
  },

  useCases: [
    {
      icon: '⇠',
      title: 'Debug a layout — see all the CSS a component is producing at once',
      desc: 'Paste a component\'s full className string and see every CSS declaration it generates. Makes it easy to spot conflicting values, unexpected overrides, and properties that aren\'t doing what you thought without digging through DevTools. Sort the class string first with our [Tailwind Formatter](https://fwdtools.com/tailwind-formatter/) to organize it by category.',
    },
    {
      icon: '⚡',
      title: 'Understand what a Tailwind class actually does before using it',
      desc: 'Not sure whether you need items-center or content-center? Paste both and compare the CSS output. Faster than reading docs and confirms the exact property and value, not just the description.',
    },
    {
      icon: '{}',
      title: 'Remove Tailwind from a project and get standard CSS for each component',
      desc: 'Paste each component\'s className string and download the CSS output. The resulting standard CSS declarations are immediately usable in a CSS Modules or plain stylesheet setup — no manual lookup needed. Build flexbox or grid layouts from scratch with our [Flexbox Builder](/flexbox-builder) after migrating.',
    },
    {
      icon: '◑',
      title: 'Learn how md:, hover:, and dark: variants translate to real CSS',
      desc: 'Paste md:flex, hover:bg-blue-500, or dark:text-white to see the exact @media rule or pseudo-class selector each generates. Makes Tailwind\'s variant system concrete instead of abstract.',
    },
    {
      icon: '▦',
      title: 'Share CSS with a designer or teammate who doesn\'t know Tailwind',
      desc: 'Paste the className string and copy the plain CSS output to share in a Figma comment, a PR description, or a design handoff doc. The CSS is universally readable — no Tailwind knowledge required.',
    },
    {
      icon: '⊞',
      title: 'Generate CSS for design system documentation or Storybook stories',
      desc: 'Convert component class strings to CSS for design system docs or Storybook. Designers and product managers can review actual CSS property values more easily than Tailwind utility names. Preview how the component looks at different breakpoints with our [Responsive Preview Tool](/responsive-preview-tool).',
    },
  ],

  faqs: [
    {
      q: 'How do I see what CSS a Tailwind class produces?',
      a: 'Paste the Tailwind class name into the input panel — for example flex, p-6, or text-gray-700 — and the CSS it produces appears instantly on the right: display: flex, padding: 1.5rem, or color: #374151. You can paste a single class, a full space-separated class list, or an entire HTML/JSX snippet with a class or className attribute. The converter strips the markup and converts just the class values.',
    },
    {
      q: 'How do I expand a Tailwind arbitrary value class like w-[420px] or bg-[#3b82f6]?',
      a: 'Paste the arbitrary value class directly and the converter expands it to the corresponding CSS property and value. w-[420px] becomes width: 420px, bg-[#3b82f6] becomes background-color: #3b82f6, and p-[1.5rem] becomes padding: 1.5rem. Underscores inside brackets are converted to spaces, so translate-x-[calc(50%_-_8px)] expands correctly to transform: translateX(calc(50% - 8px)). All standard arbitrary value patterns including calc() expressions, CSS variables, and URL values are supported.',
    },
    {
      q: 'What CSS does md:flex or lg:grid-cols-3 produce?',
      a: 'Responsive variants are converted to @media (min-width: ...) rules using Tailwind\'s default breakpoints: sm at 640px, md at 768px, lg at 1024px, xl at 1280px, and 2xl at 1536px. For example, md:flex becomes @media (min-width: 768px) { .element { display: flex; } } and lg:grid-cols-3 becomes @media (min-width: 1024px) { .element { grid-template-columns: repeat(3, minmax(0, 1fr)); } }. All five standard Tailwind breakpoints are supported.',
    },
    {
      q: 'What CSS does hover:bg-blue-500 or dark:text-white produce?',
      a: 'Pseudo-class variants (hover:, focus:, active:, disabled:, placeholder:, checked:) are converted to the appropriate CSS pseudo-class selectors — for example hover:bg-blue-500 becomes .element:hover { background-color: #3b82f6; }. Dark mode (dark:) is converted to @media (prefers-color-scheme: dark). Print (print:) becomes @media print. Motion-safe and motion-reduce variants are converted to @media (prefers-reduced-motion: ...) equivalents.',
    },
    {
      q: 'Can I paste a full JSX or HTML snippet instead of just the class string?',
      a: 'Yes. The converter detects and strips class="..." and className="..." attributes from pasted HTML or JSX automatically. Paste a full element like <button className="flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded"> and it extracts and converts all the class values. You can also upload a .jsx, .tsx, or .html file — the tool reads all class and className attributes it finds and converts them.',
    },
    {
      q: 'Can I save a Tailwind class conversion and come back to it?',
      a: 'The history panel stores up to 15 recent conversions automatically with a timestamp and a preview of the first few classes. Click any history entry to restore that input and output instantly — useful for comparing two class lists or returning to a string you were analyzing earlier.',
    },
    {
      q: 'Is my Tailwind code uploaded to a server when I use this?',
      a: 'No. All conversion runs entirely in your browser using JavaScript. Your class strings and any file contents you upload are never sent to any server, never stored, and never logged. Safe to use with proprietary component code, internal design systems, and client project code.',
    },
    {
      q: 'Does this work with Tailwind v4?',
      a: 'The converter uses Tailwind\'s stable class naming conventions which are compatible with both v3 and v4. Utility class names for spacing, typography, flexbox, grid, colors, and effects are the same in both versions. Some v4-specific changes to custom property naming and certain new utilities may not be reflected, but the vast majority of classes produce identical output across both versions.',
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Tailwind to CSS Converter',
  url: 'https://webdevpuneet.com/tailwind-to-css/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online Tailwind CSS to plain CSS converter. Expands Tailwind utility classes to standard CSS declarations. Supports 200+ classes, arbitrary values, responsive breakpoints, state variants, HTML/JSX input, conversion history, and CSS file download. 100% client-side.',
  featureList: seoData.features.join(', '),
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'Tailwind to CSS Converter', item: 'https://webdevpuneet.com/tailwind-to-css/' },
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
        <TailwindToCssTool />
      </div>
      <IndexOnly><AdSlot />
      <SeoSection {...seoData} /></IndexOnly>

    </div>
  );
}
