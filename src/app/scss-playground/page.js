import ScssPlaygroundTool from '@/components/ScssPlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/scss-playground.png';

export const metadata = {
  title: 'SCSS Playground — Learn SCSS Visually, 45 Lessons Free | webdevpuneet.com',
  description: 'Learn SCSS/Sass online — variables, nesting, @use, mixins, functions, maps, and loops with live CSS preview. Free playground, no install, no signup.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/scss-playground/' },
  icons: { icon: '/icons/scss-playground.svg', shortcut: '/icons/scss-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/scss-playground/',
    siteName: 'webdevpuneet.com',
    title: 'SCSS Playground - Learn Sass Online with 45 Interactive Lessons',
    description: 'Practice SCSS variables, nesting, mixins, functions, maps, loops, modules, design tokens, responsive patterns, CSS variables, and modern Sass architecture with live preview.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'SCSS Playground - Interactive Sass Lessons' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'SCSS Playground - Learn Sass Online',
    description: 'Browser-based SCSS playground with 45 guided Sass lessons, compiled CSS output, and live preview. No setup required.',
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is SCSS?', acceptedAnswer: { '@type': 'Answer', text: 'SCSS is the CSS-like syntax for Sass. It adds variables, nesting, mixins, functions, maps, loops, modules, and architecture patterns, then compiles to normal CSS.' } },
    { '@type': 'Question', name: 'Does this run a production Sass compiler?', acceptedAnswer: { '@type': 'Answer', text: 'No. This playground uses a browser-safe learning compiler for lesson patterns. It is designed for understanding SCSS concepts, not replacing Dart Sass in production projects.' } },
    { '@type': 'Question', name: 'Does it teach modern Sass?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Lessons include @use, @forward, module namespaces, map modules, math.div, color module patterns, CSS variables, design tokens, cascade layers, container queries, and component architecture.' } },
    { '@type': 'Question', name: 'Is this good for beginners?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. It starts with variables, comments, nesting, and the parent selector before moving into mixins, functions, maps, loops, modules, responsive patterns, and architecture.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SCSS Playground',
  url: 'https://webdevpuneet.com/scss-playground/',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires a modern browser with JavaScript enabled',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based SCSS playground with 45 guided Sass lessons, live preview, compiled CSS output, progress tracking, and examples from beginner variables through modern Sass architecture, design tokens, and @import migration.',
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
  featureList: [
    '45 guided SCSS and Sass lessons',
    'SCSS editor with syntax highlighting',
    'Compiled CSS output panel',
    'Live HTML preview',
    'Covers variables, nesting, modules, mixins, functions, maps, loops, interpolation, design tokens, CSS variables, responsive patterns, and architecture',
    'Progress saved locally in the browser',
    'No install or Sass setup required',
  ],
};
const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'SCSS Playground', item: 'https://webdevpuneet.com/scss-playground/' },
  ],
};


const seoData = {
  slug: 'scss-playground',
  title: 'SCSS Playground - Learn Sass Online, Compile SCSS, and See Live CSS',
  subtitle: 'A free Sass tutorial, SCSS online editor, and compiled CSS preview with 45 lessons for variables, nesting, @use, @forward, mixins, functions, maps, loops, design tokens, responsive components, and modern Sass architecture.',
  about: {
    title: 'Learn Sass Online with an SCSS Editor, CSS Output, and Live Preview',
    description: `If you searched for "SCSS playground", "Sass tutorial", "learn Sass online", or "SCSS compiler online", you probably want more than a list of syntax rules. You want to write SCSS, see the compiled CSS, and understand why Sass is useful in real frontend projects. This playground is built for that search intent: every lesson gives you editable SCSS, a live HTML preview, and a compiled CSS section that updates as you learn.

SCSS is the CSS-like syntax for Sass. It lets you write normal CSS plus variables, nesting, mixins, functions, maps, loops, modules, and reusable architecture patterns. The browser does not run SCSS directly; Sass compiles it into regular CSS. That is why this tool keeps the compiled CSS visible: you can see exactly what variables, nesting, @include, @each, @for, @use, and @forward produce.

For beginners, the first chapters answer common searches like "Sass variables", "SCSS nesting", "Sass mixins", "Sass functions", and "Sass maps". You start with simple examples, then compare the SCSS source to the generated CSS. This makes the compile-time mental model clear before you install Dart Sass, Vite, Next.js, Angular, Vue, Laravel Mix, Rails, or any build tool.

For modern frontend developers, the later chapters focus on current Sass practice: @use instead of old @import, @forward for public module APIs, sass:map for token lookup, sass:math for division, sass:color for color changes, design token maps, runtime CSS custom properties, responsive mixins, cascade layers, container queries, and component APIs. These are the topics that matter when you maintain a serious SCSS codebase.

For teams and freelancers, the architecture lessons are written around real code-review problems: selectors that become too specific, deep nesting that is hard to override, utility classes generated without limits, theme variables spread across files, and old @import structures that leak globals everywhere. The goal is not just to learn Sass syntax; it is to write SCSS that another developer can safely extend.

Use this page as a Sass tutorial for beginners, an SCSS practice editor, a quick SCSS-to-CSS learning compiler, or a roadmap for modernizing an older Sass project. The topic coverage is inspired by common Sass tutorial paths, including the W3Schools Sass tutorial, but the lessons, examples, compiler behavior, and SEO content are original to webdevpuneet.com.`,
  },
  features: [
    '45 guided Sass and SCSS lessons from beginner syntax to advanced architecture, building on [CSS playground](/css-playground) fundamentals',
    'SCSS online editor with live HTML preview and always-visible compiled CSS output',
    'Beginner Sass tutorial topics: comments, variables, nesting, parent selector, nested properties, and partial files',
    'Core reusable patterns: mixins, mixin arguments, @content, custom functions, @extend, and placeholder selectors',
    'Modern Sass modules: @use, @forward, aliases, configuration with with(), namespaced variables, and module APIs',
    'Data-driven Sass: maps, lists, sass:map, @each loops, @for loops, @if conditions, and interpolation',
    'Design system workflows: token maps, CSS custom properties, theme scopes, generated utilities, and component variants',
    'Modern CSS with Sass: cascade layers, container queries, clamp() fluid type, BEM selectors, and responsive mixins',
    'Migration lessons for old @import-heavy Sass projects moving to @use and @forward',
    'Architecture guidance for clean nesting, folder structure, Stylelint, component APIs, and maintainable SCSS',
    'Progress saved locally, shareable snippets, downloadable .scss files, and no install required',
  ],
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Choose the Sass topic you searched for', text: 'Start at variables, nesting, mixins, functions, maps, @use, @forward, design tokens, container queries, or @import migration.' },
      { title: 'Edit SCSS and watch the preview', text: 'Change the SCSS source and the HTML preview markup to understand selectors, components, states, and generated classes.' },
      { title: 'Read the compiled CSS every time', text: 'Use the compiled CSS section to see what Sass actually outputs. This helps you catch deep nesting, selector bloat, and unnecessary abstractions.' },
      { title: 'Move from syntax to architecture', text: 'After the basics, study modules, token maps, responsive mixins, theme output, folder structure, linting, and component APIs.' },
      { title: 'Apply the pattern in a real build tool', text: 'After practicing here, move the SCSS into Dart Sass, Vite, Next.js, Angular, Vue, Rails, Laravel Mix, or your project build pipeline.' },
    ],
  },
  useCases: [
    { icon: 'CSS', title: 'Learn Sass after CSS basics', desc: 'Use SCSS variables, nesting, and mixins once plain CSS starts feeling repetitive across components.' },
    { icon: 'CODE', title: 'Practice SCSS online without setup', desc: 'Use the browser editor as a no-install SCSS practice space with live preview and compiled CSS output. Minify the result with the [CSS minifier](/css-minifier-beautifier/) or convert utility-first codebases with [CSS to Tailwind](/css-to-tailwind/).' },
    { icon: 'TABS', title: 'Understand SCSS to CSS compilation', desc: 'Compare the source and output so you know what Sass sends to the browser.' },
    { icon: 'SAFE', title: 'Modernize old Sass projects', desc: 'Move from @import and global helpers toward @use, @forward, module namespaces, and safer APIs.' },
    { icon: 'CHART', title: 'Build design tokens and themes', desc: 'Practice maps, token output, CSS variables, theme scopes, generated utilities, and component variants.' },
    { icon: 'GLOBAL', title: 'Prepare for real frontend stacks', desc: 'Use SCSS patterns in React, Vue, Angular, WordPress, Shopify, Laravel, Rails, and static websites.' },
    { icon: 'SYNC', title: 'Audit existing SCSS code', desc: 'Spot deep nesting, selector bloat, uncontrolled utility generation, unclear module boundaries, and token drift.' },
    { icon: 'WRITE', title: 'Create maintainable components', desc: 'Use BEM, component APIs, responsive mixins, and limited variants to keep styles readable.' },
  ],
  faqs: [
    { q: 'Is SCSS the same as Sass?', a: 'Sass is the preprocessor. SCSS is the CSS-like syntax for Sass. Most modern Sass projects use SCSS because valid CSS is also valid SCSS.' },
    { q: 'Does this playground compile every Sass feature?', a: 'No. It includes a browser-safe learning compiler that handles the lesson patterns and shows curated compiled output for examples. Use Dart Sass for production builds.' },
    { q: 'Should I learn @import or @use?', a: 'Learn @use and @forward for modern Sass. @import appears in older codebases, but modern Sass projects use modules to avoid duplicated output and global namespace problems.' },
    { q: 'What should I know before learning SCSS?', a: 'You should understand basic CSS selectors, properties, classes, and media queries. The SCSS Playground is useful right after CSS basics and before larger component systems.' },
    { q: 'Does SCSS replace CSS variables?', a: 'No. Sass variables are compile-time values, while CSS variables work at runtime in the browser. Modern projects often use Sass to generate CSS variables for themes and design tokens.' },
    { q: 'Can I use this for real project snippets?', a: 'Yes for practice and prototyping. For production, copy the SCSS into a real project that uses Dart Sass, Vite, Next.js, Angular, Vue, Rails, Laravel Mix, or another Sass-capable build tool.' },
    { q: 'Why does the compiled CSS matter?', a: 'The browser never receives SCSS. It receives compiled CSS. Comparing the SCSS source with compiled CSS helps you see selector specificity, duplicated output, generated utilities, nested selector expansion, and whether a Sass abstraction is actually worth using.' },
    { q: 'Is Sass still useful with modern CSS?', a: 'Yes, but its role is more focused. Modern CSS handles custom properties, cascade layers, container queries, nesting, and clamp(). Sass is still useful for design token maps, module boundaries, reusable mixins, build-time functions, generated variants, and organizing large component systems.' },
    { q: 'What should I learn after this SCSS Playground?', a: 'Install Dart Sass in a real project, compile SCSS from the command line or your framework build tool, add Stylelint, migrate one @import-based file to @use, and build a small component library with tokens, themes, and documented variants.' },
  ],
  links: [
    { label: 'CSS Playground', href: '/css-playground/', desc: 'Learn the CSS foundations that SCSS compiles into.' },
    { label: 'Tailwind Playground', href: '/tailwind-playground/', desc: 'Compare SCSS component styling with utility-first CSS.' },
    { label: 'CSS to Tailwind Converter', href: 'https://fwdtools.com/css-to-tailwind/', desc: 'Translate CSS declarations into Tailwind utility classes.' },
    { label: 'Sass tutorial reference', href: 'https://www.w3schools.com/sass/', desc: 'External Sass tutorial path used as a topic reference.' },
  ],
};

export default function ScssPlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}>
        <ScssPlaygroundTool />
      </div>
      <AdSlot />
      <IndexOnly><SeoSection {...seoData} /></IndexOnly>
    </div>
  );
}
