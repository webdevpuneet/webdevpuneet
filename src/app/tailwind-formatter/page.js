import TailwindFormatterTool from '@/components/TailwindFormatterTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Tailwind CSS Class Sorter & Formatter Online Free | webdevpuneet.com',
  description: 'Sort and format Tailwind CSS classes online — deduplicate and group utilities into 13 categories with responsive and state variant support. Free.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/tailwind-formatter/' },
  icons: { icon: '/icons/tailwind-formatter.svg', shortcut: '/icons/tailwind-formatter.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/tailwind-formatter/',
    siteName: 'webdevpuneet.com',
    title: 'Tailwind CSS Class Sorter — Sort & Group Tailwind Classes Online Free',
    description: 'Sort, deduplicate, and group Tailwind utility classes into 13 categories. Flat and grouped output, responsive variant support, stats bar. Free, no sign-up, 100% browser-based.',
    images: [{ url: 'https://webdevpuneet.com/images/tailwind-formatter.png', width: 1200, height: 630, alt: 'Tailwind CSS Class Sorter' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Tailwind CSS Class Sorter — Sort & Group Tailwind Classes Online Free',
    description: 'Sort, deduplicate, and group Tailwind utility classes into 13 categories. Flat and grouped output, responsive variant support. Free, no sign-up.',
    images: ['https://webdevpuneet.com/images/tailwind-formatter.png'],
  },
};

const seoData = {
  slug: 'tailwind-formatter',
  title: 'Tailwind Class Sorter — Sort & Group Tailwind CSS Classes Online',

  about: {
    title: 'Sort and Clean Tailwind Class Strings — 13 Categories, Dedup, Flat or Grouped Output',
    description: `You have a component whose \`className\` grew over months of iteration — \`p-4\` next to \`hover:bg-blue-600\` next to \`rounded-lg\` next to \`text-white\`, added wherever the developer happened to type at the time. Paste it here and get a clean, consistently ordered result grouped by category — no npm install, no Prettier setup required.\n\nUnder the hood, every class is matched against a fixed list of 13 category definitions, each backed by a set of regular expressions — Layout matches things like \`flex\`, \`absolute\`, and \`z-\`; Spacing matches the \`^[mp][xytblr]?-\` pattern that covers every margin and padding utility; Effects matches \`shadow\`, \`blur-\`, \`backdrop-\`, and the filter utilities. Before matching, any leading variant chain (\`hover:\`, \`dark:\`, \`sm:\`, or a stack like \`lg:hover:\`) is stripped with a regex so a class is grouped by what it does, not by the state it applies in — \`hover:bg-blue-600\` lands in Background next to \`bg-blue-500\`, not off in its own bucket. Anything that matches no known pattern falls into an Other group rather than being dropped, so custom utility classes and typos survive the round trip.\n\nThe category order — **Layout** → **Flexbox & Grid** → **Spacing** → **Sizing** → **Typography** → **Background** → **Border** → **Effects** → **Transitions** → **Transforms** → **Interactivity** → **SVG** → **Accessibility** — mirrors the convention used by the official \`prettier-plugin-tailwindcss\` package, so output here looks the same as what a configured Prettier setup would produce. A deduplication pass runs first, using a Set to catch classes repeated verbatim (a common byproduct of \`clsx()\` or template-literal composition), and the stats bar reports how many were removed. Within each group, remaining classes are sorted alphabetically by their base name so variant and non-variant versions of the same utility sit together.\n\nTwo output formats cover different needs: **Flat** collapses everything into a single sorted string ready to paste into \`className\` or \`class\`, while **Grouped** renders labeled category blocks with per-group counts — useful for documentation or reviewing a component's visual structure without running the code. A Multiline toggle switches the flat output's separator from a space to a newline for cleaner version-control diffs. Everything runs synchronously in your browser; nothing is uploaded.`,
  },

  features: [
    'Sorts Tailwind utility classes into 13 logical categories: Layout, Flexbox & Grid, Spacing, Sizing, Typography, Background, Border, Effects, Transitions, Transforms, Interactivity, SVG, Accessibility',
    'Deduplicates repeated classes — reports the count of removed duplicates in the stats bar',
    'Flat output mode — single sorted class string ready for direct use in className or class attributes',
    'Grouped output mode — categories displayed as labeled blocks for documentation and readability',
    'Stats bar — shows total class count, unique count, duplicate count, and number of active groups',
    'Multiline output option — each class on its own line for cleaner diffs in version control; compare versions using our [Diff Checker](https://fwdtools.com/diff-checker/)',
    'Responsive and state variant support — sm:, md:, lg:, hover:, focus:, dark:, active: all preserved and sorted correctly',
    'Sort and Group toggles — enable or disable sorting and grouping independently',
    'Sample button — loads a representative class string to explore all formatter features instantly',
    'One-click Copy — copies the full formatted output to clipboard with a confirmation toast',
    '100% client-side — no data sent to any server, no sign-up, no watermark, no character limit; convert raw CSS to Tailwind first with our [CSS to Tailwind](/css-to-tailwind) tool',
  ],

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Paste your Tailwind class string',
        text: 'Paste any string of Tailwind utility classes into the left input panel. Order does not matter — the formatter handles any arrangement. Classes can be on one line, multiple lines, or comma-separated. Responsive prefixes like `sm:` and `lg:` and state variants like `hover:`, `focus:`, `dark:`, and `active:` are all supported and preserved in the output. Click **Sample** to load a built-in example that demonstrates all 13 groups.',
      },
      {
        title: 'Enable processing options',
        text: 'Four toggles in the toolbar control formatting behavior. **Dedup** removes duplicate class entries and reports the count in the stats bar — useful for catching accidental repetition from copy-paste or `clsx()` composition. **Sort** alphabetically orders classes within each category group. **Group** separates output into labeled category blocks following the Prettier Tailwind plugin ordering convention. **Multiline** puts each class on its own line for clean version-control diffs.',
      },
      {
        title: 'Check the stats bar',
        text: 'The stats bar shows four numbers: **Total** (all input classes including duplicates), **Unique** (classes after deduplication), **Dupes** (count removed — highlighted red when non-zero), and **Groups** (active category count). This gives an at-a-glance audit of how complex and how clean the class string is before you paste it back into your component.',
      },
      {
        title: 'Switch between Flat and Grouped output',
        text: 'Use the **Flat** and **Grouped** tabs above the right panel. Flat output is a single sorted class string — paste directly into a `className` prop or `class` attribute. Grouped output shows each of the 13 categories as a labeled block with count — useful for documentation, code comments, and design system component libraries where human-readable structure matters.',
      },
      {
        title: 'Copy the formatted output',
        text: 'Click **Copy** to copy the full formatted class string to your clipboard. A brief toast confirms the copy. Paste the flat output directly back into your JSX `className`, or use the grouped output as inline documentation in a code comment above the component.',
      },
    ],
  },

  useCases: [
    {
      icon: '✦',
      title: 'Clean up a sprawling className string before submitting a PR',
      desc: 'Paste the class string from a diff to see it sorted. Consistent category ordering makes it easy to spot misplaced utilities, redundant classes, and responsive variants that contradict each other — without running the code. If you started with raw CSS, use our [CSS to Tailwind](/css-to-tailwind) converter before pasting here.',
    },
    {
      icon: '▦',
      title: 'Understand the visual structure of a complex layout component at a glance',
      desc: 'Grouped output separates spacing, typography, background, and effects into labeled blocks. You can see immediately which categories are over-used, which are missing, and where responsive overrides live relative to the base styles.',
    },
    {
      icon: '◎',
      title: 'Find and remove duplicate classes from dynamic class composition or copy-paste',
      desc: 'Ending up with p-4 p-4 or text-white text-white in a class string is easy during merges or template literal composition. The stats bar highlights duplicate count in red and deduplication is on by default.',
    },
    {
      icon: '≡',
      title: 'Enforce consistent class ordering across a design system component library',
      desc: 'Run each component\'s base class string through the formatter and paste the sorted output back. When multiple engineers contribute to Button, Card, and Input, consistent ordering reduces merge conflicts and speeds up code review. Preview the component at all breakpoints with our [Responsive Preview Tool](/responsive-preview-tool).',
    },
    {
      icon: '✓',
      title: 'Normalize AI-generated Tailwind classes to your project\'s ordering convention',
      desc: 'GitHub Copilot and ChatGPT produce syntactically correct but structurally chaotic class strings. Paste them here and copy the sorted, deduplicated result before committing.',
    },
    {
      icon: '⚙',
      title: 'Use grouped output as inline documentation above a component',
      desc: 'Enable Group and Multiline, then paste the category blocks as a code comment above the component explaining its visual structure. Useful for design system libraries where class intent should be human-readable without running the code. Use our [HTML Formatter](/html-formatter) to clean up the surrounding template markup at the same time.',
    },
  ],

  faqs: [
    {
      q: 'What does a Tailwind CSS class formatter do?',
      a: 'A Tailwind CSS class formatter takes a raw string of utility classes — possibly in random order, with duplicates, and mixed with responsive and state variants — and produces a clean, consistently ordered result. It sorts classes into logical categories (Layout, Spacing, Typography, etc.), removes duplicates, and optionally outputs the result as a single flat string or as labeled category groups. The goal is to make class strings readable and auditable at a glance, the same way a code formatter like Prettier makes JavaScript or CSS readable.',
    },
    {
      q: 'Why should I sort Tailwind CSS classes?',
      a: "Tailwind's utility-first model produces class strings that grow organically over time, with each class added wherever the developer happened to put it. Unsorted strings are difficult to review, hard to audit for conflicts, and prone to accidental duplication. Sorted classes group related utilities together — all spacing tokens appear together, all typography tokens appear together — so the visual structure of the element is immediately apparent during a code review or debugging session. Consistent ordering also reduces merge conflicts when multiple developers edit the same component.",
    },
    {
      q: 'What 13 categories does the grouper use?',
      a: 'The formatter groups classes into: Layout (positioning, display, overflow, z-index), Flexbox & Grid (flex direction, gap, justify, align, grid columns), Spacing (padding, margin, space-between), Sizing (width, height, min/max), Typography (text size, font weight, leading, tracking, decoration), Background (bg-color, gradients), Border (border-width, rounded, ring, outline), Effects (shadow, opacity, blur, backdrop), Transitions (transition, duration, ease, animate), Transforms (scale, rotate, translate), Interactivity (cursor, pointer-events, select, scroll-snap), SVG (fill, stroke), and Accessibility (sr-only, not-sr-only). Any class that does not match a known pattern is placed in an Other group.',
    },
    {
      q: 'Does it remove duplicate Tailwind classes?',
      a: 'Yes. When the Dedup option is enabled (on by default), the formatter identifies every class that appears more than once in the input and removes the extra occurrences. The stats bar shows the total duplicate count and highlights it in red when duplicates are found. Duplicate classes are harmless from a CSS perspective — Tailwind compiles them to identical output — but they inflate HTML size, confuse readers, and are typically the result of accidental merges or copy-paste errors that should be cleaned up.',
    },
    {
      q: 'What is the difference between flat and grouped output?',
      a: 'Flat output is a single space-separated (or newline-separated with Multiline on) class string, ready to paste directly into a className prop in JSX or a class attribute in HTML. It is the format Tailwind expects. Grouped output displays each category as a labeled block so you can see at a glance which groups your component uses and how many classes are in each — useful for documentation, code comments, design system libraries, and code reviews where human readability matters more than direct usability.',
    },
    {
      q: 'Does it handle responsive prefixes and state variants?',
      a: 'Yes. Responsive prefixes (sm:, md:, lg:, xl:, 2xl:) and state variants (hover:, focus:, active:, disabled:, dark:, group-hover:, peer-focus:) are fully supported. The formatter strips the prefix when determining the category — a hover:bg-blue-600 class is categorized as Background — and preserves the full prefixed class name in the output. Variants are sorted within their category group alongside their non-prefixed counterparts.',
    },
    {
      q: 'Is this the same as the Prettier Tailwind CSS plugin?',
      a: 'This tool uses the same 13-category grouping convention and similar sort order as the official prettier-plugin-tailwindcss package. The key difference is that this runs entirely in your browser — no Node.js, no npm install, no configuration file, and no Prettier setup required. You can use it on any machine, in any project, without touching your toolchain. For automated sorting on save inside an IDE, the Prettier plugin is the right choice; for one-off cleanup, quick audits, or use outside a configured project, this browser tool is faster.',
    },
    {
      q: 'Can I use the Multiline output option in my JSX code?',
      a: 'Multiline output places each class on its own line. This is not directly pasteable into a standard single-line className string, but it is useful for several purposes: generating clean line-by-line diffs in version control, creating readable code comment documentation, pasting into tools that accept multiline class lists, or using with template literal class composition patterns like clsx or cn() where each line becomes a separate array entry. Toggle Multiline on when you need per-class granularity rather than a compact string.',
    },
    {
      q: 'Does it work with classes from Tailwind v3 and v4?',
      a: 'The formatter works with any Tailwind class string — it uses pattern matching against known utility prefixes and names rather than parsing a Tailwind configuration file. This means it handles classes from Tailwind v2, v3, and the new v4 utility set. Custom classes that do not match any known pattern are placed in an Other category rather than being dropped or causing an error. The formatter never fails on unknown input — it always produces a sorted, deduplicated output regardless of what is in the class string.',
    },
    {
      q: 'Is there a character or class count limit?',
      a: "There is no hard limit imposed by the tool — it is bounded only by your browser's available memory, which is generous even for very large class strings. In practice, the formatter handles class strings from single utility components up to large generated class sets with hundreds of entries instantly. Parsing and sorting are synchronous and complete in milliseconds for any realistic class string.",
    },
    {
      q: 'Does it send my classes to a server?',
      a: 'No. All processing runs entirely in your browser using JavaScript. Your class strings are never transmitted over the network, never stored on any server, and never logged. This makes the tool safe to use with internal component code, proprietary design systems, and client work you would prefer not to share with a third-party service.',
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Tailwind CSS Class Sorter',
  url: 'https://webdevpuneet.com/tailwind-formatter/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based Tailwind CSS class sorter that sorts, deduplicates, and groups utility classes into 13 logical categories. Supports responsive prefixes, state variants, flat and grouped output, multiline mode, and stats. 100% client-side.',
  featureList: seoData.features.join(', '),
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'Tailwind Formatter', item: 'https://webdevpuneet.com/tailwind-formatter/' },
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

export default function TailwindFormatterPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><TailwindFormatterTool /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...seoData} /></IndexOnly>

    </div>
  );
}
