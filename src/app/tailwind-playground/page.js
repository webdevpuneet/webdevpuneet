import TailwindPlaygroundTool from '@/components/TailwindPlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/tailwind-playground.png';

export const metadata = {
  title: 'Tailwind CSS Playground — 48 Interactive Lessons Free | webdevpuneet.com',
  description: 'Learn Tailwind CSS online with 48 hands-on lessons — utilities, flexbox, grid, responsive design, and dark mode. Live preview, free, no install needed.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/tailwind-playground/' },
  icons: { icon: '/icons/tailwind-playground.svg', shortcut: '/icons/tailwind-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/tailwind-playground/',
    siteName: 'webdevpuneet.com',
    title: 'Tailwind CSS Playground — 48 Interactive Lessons, Live Preview',
    description: 'Learn Tailwind CSS with 48 guided lessons: utility classes, flexbox, grid, responsive breakpoints, dark mode, group/peer, @apply, component patterns, accessibility, advanced variants, and Tailwind v4. No install.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Tailwind CSS Playground — Interactive Lessons with Live Preview' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Tailwind CSS Playground — 48 Interactive Lessons',
    description: 'Learn Tailwind CSS step by step with 48 guided lessons. Live preview, dark mode toggle, responsive preview sizes — all in the browser. No install.',
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I need to install Tailwind CSS to use this playground?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. The playground loads the Tailwind CSS Play CDN directly inside the preview iframe. The Play CDN includes the full JIT engine — every utility class, arbitrary value, and variant modifier works without any Node.js, npm, PostCSS, or build step. You write HTML with Tailwind classes in the editor and see the styled result instantly.' },
    },
    {
      '@type': 'Question',
      name: 'How many lessons are in the Tailwind CSS Playground?',
      acceptedAnswer: { '@type': 'Answer', text: 'There are 48 lessons across 15 chapters: Foundations, Typography, Spacing, Sizing, Flexbox, CSS Grid, Borders & Effects, Transitions & Animation, Responsive Design, Group & Peer, @apply & Config, Component Patterns, Accessibility, Advanced Patterns, and Tailwind v4. The curriculum covers everything from your first utility class to advanced patterns like arbitrary variants, the has-* modifier, @layer, motion-safe, print styles, skeleton loading, and dialog/popover components.' },
    },
    {
      '@type': 'Question',
      name: 'How is this different from the official Tailwind Play website?',
      acceptedAnswer: { '@type': 'Answer', text: 'The official Tailwind Play is a blank sandbox for developers who already know Tailwind. This playground is a structured learning tool — 48 lessons with plain-English explanations of what each utility does, pre-built HTML examples for each concept, Quick Check challenges to test your understanding, and a sidebar that tracks your progress through a complete curriculum. It is designed for people learning Tailwind for the first time, not for people debugging production code.' },
    },
    {
      '@type': 'Question',
      name: 'Does the dark mode toggle work with Tailwind dark: classes?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The dark mode toggle in the preview header adds or removes the dark class from the <html> element inside the preview iframe. This activates all your dark: modifier classes immediately — for example dark:bg-gray-900, dark:text-white, dark:border-gray-700. You can preview both light and dark variants of the same HTML without changing any code.' },
    },
    {
      '@type': 'Question',
      name: 'Can I use arbitrary Tailwind values like w-[327px] in the playground?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The playground uses the Tailwind Play CDN which includes the full JIT engine with arbitrary value support. Any class that works on the official Tailwind Play website works here: w-[327px], grid-cols-[repeat(auto-fill,minmax(200px,1fr))], text-[#1a1a1a], top-[117px], and arbitrary variants like [&>li]:mb-2. The Advanced Patterns chapter has a dedicated lesson on arbitrary values and variants.' },
    },
    {
      '@type': 'Question',
      name: 'Is my progress saved between sessions?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Completed lessons and your current lesson position are saved to localStorage in your browser. When you return, the playground reopens at the lesson you were on and shows all previously completed lessons still marked. Quick Check challenge answers are also persisted — a completed challenge shows a green confirmation instead of repeating the question. No account or sign-up is required.' },
    },
    {
      '@type': 'Question',
      name: 'What are group and peer modifiers in Tailwind CSS?',
      acceptedAnswer: { '@type': 'Answer', text: 'Group modifiers let you style child elements based on the state of a parent. Mark the parent with the group class, then use group-hover:, group-focus:, or group-active: on any child. When you hover the parent, all children with group-hover: classes respond — useful for card hover effects where the title, image, and button all change together. Named groups (group/{name}) let you nest multiple groups without conflicts. Peer modifiers do the same thing for sibling elements: mark an input as peer, then style a following label with peer-invalid: or peer-focus:. The Group & Peer chapter has three lessons covering all these patterns.' },
    },
    {
      '@type': 'Question',
      name: 'Can I download my code from the Tailwind playground?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The Download (.html) button saves the current lesson HTML as a complete standalone file that includes the Tailwind Play CDN script tag. Open the file in any browser to see your styled component exactly as it appears in the preview — no additional setup required.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Tailwind CSS Playground',
  url: 'https://webdevpuneet.com/tailwind-playground/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based Tailwind CSS learning playground with 48 guided lessons across 15 chapters — utility classes, flexbox, grid, responsive design, dark mode, group/peer modifiers, @apply, component patterns, accessibility, advanced variants, and Tailwind v4. No install required.',
  featureList: [
    '48 lessons across 15 chapters — complete Tailwind CSS curriculum including advanced patterns and Tailwind v4',
    'Live HTML editor with Tailwind Play CDN — JIT engine supports all utilities including arbitrary values',
    'Dark mode toggle — adds/removes dark class from preview html element to activate dark: modifiers',
    'Responsive preview sizes — 375px mobile, 768px tablet, full width',
    'HTML syntax highlighting in the editor',
    'Quick Check challenges with persistent completion saved to localStorage',
    'Confetti burst on completing every lesson in a chapter',
    'Download as .html (includes Tailwind CDN script tag)',
    'Lesson search/filter, collapsible sidebar and concept panel',
    'Progress saved to localStorage — no account required',
    'Instant preview updates with 200ms debounce after typing',
    'Runs entirely in the browser — no install, no account, no Node.js',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Learn to Code', item: 'https://webdevpuneet.com/learn-to-code/' },
    { '@type': 'ListItem', position: 3, name: 'Tailwind CSS Playground', item: 'https://webdevpuneet.com/tailwind-playground/' },
  ],
};

const SEO = {
  slug: 'tailwind-playground',
  title: 'Learn Tailwind CSS Online — 48 Interactive Lessons with Live Preview',
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Start with Foundations to understand the utility-first model', text: 'The first three lessons explain why Tailwind replaces custom CSS with utility classes, how the color system works (color-500 scales, bg-*, text-*, border-*), and how hover:, focus:, and active: state modifiers attach behavior directly to HTML elements. Understanding these three ideas before anything else makes every later lesson click faster.' },
      { title: 'Work through Typography, Spacing, and Sizing', text: 'These three chapters cover the most frequently used utilities in any real project: text-* for font size and weight, leading-* for line height, tracking-* for letter spacing; p-* and m-* for padding and margin on every side; w-* and h-* for widths and heights including full, screen, min, max, and fit variants. These are the classes you will type hundreds of times per day.' },
      { title: 'Learn Flexbox and Grid for layout', text: 'Tailwind\'s Flexbox chapter covers flex, flex-row/col, justify-*, items-*, flex-wrap, and flex-grow/shrink. The CSS Grid chapter covers grid-cols-*, col-span-*, row-span-*, grid-flow-*, and auto-fill/auto-fit patterns. Both chapters include working layout examples you can resize and modify directly in the editor.' },
      { title: 'Add polish with Borders, Effects, and Animations', text: 'The Borders & Effects chapter covers rounded-*, border, ring-*, shadow-*, opacity-*, and backdrop-blur-*. The Transitions & Animation chapter covers transition, duration-*, ease-*, delay-*, transform, scale-*, rotate-*, translate-*, and Tailwind\'s built-in animate-spin, animate-pulse, animate-bounce keyframe classes.' },
      { title: 'Master responsive design with breakpoint prefixes', text: 'The Responsive Design chapter teaches Tailwind\'s mobile-first breakpoint system: sm:, md:, lg:, xl:, and 2xl:. Every utility can be prefixed — sm:flex-row stacks columns on mobile and switches to row on small screens. The Container lesson shows the container mx-auto px-4 pattern. The Dark Mode lesson teaches the dark: modifier with a complete themed component example.' },
      { title: 'Use group and peer modifiers for interactive components', text: 'The Group & Peer chapter unlocks one of Tailwind\'s most powerful patterns. Mark a parent with group, then use group-hover: on any child to style it when the parent is hovered — the entire card can respond to one hover. Named groups handle nested interactive regions. Peer modifiers style siblings based on input state — peer-invalid: and peer-focus: power form validation UI without JavaScript.' },
      { title: 'Study advanced patterns and Tailwind v4 changes', text: 'The Advanced Patterns chapter covers arbitrary values and variants in square brackets, the has-* selector modifier, @layer for custom utilities, motion-safe: for reduced-motion accessibility, print: styles, skeleton loading with animate-pulse, and dialog/popover component patterns. The Tailwind v4 chapter covers the CSS-first config approach, new color and variant features, and how to compose utilities differently in v4.' },
      { title: 'Track your progress and download your work', text: 'Click "Mark Done →" after each lesson to record your progress. The sidebar shows completed lessons with green indicators. Finishing every lesson in a chapter triggers a confetti animation. Download any lesson as a standalone .html file with Tailwind CDN included — ready to open in any browser or paste into a project.' },
    ],
  },
  about: {
    title: 'Learn Tailwind CSS Step by Step — 48 Lessons from Utility Basics to Advanced Patterns',
    description: `Tailwind CSS is now the dominant CSS framework for modern web development. It ships with Next.js, SvelteKit, Astro, and Laravel by default. Every major design system company has published Tailwind component libraries. And hiring managers who used to ask "do you know CSS?" now ask "do you know Tailwind?" The framework's utility-first approach is genuinely different from writing custom CSS or using component libraries like Bootstrap — and that difference is what makes Tailwind feel confusing at first and extremely productive once it clicks. The Tailwind CSS Playground gives you 48 structured, interactive lessons that teach every layer of Tailwind from first class to production pattern, with a live preview that updates as you type.

The playground uses the official Tailwind Play CDN in every lesson, so the full JIT engine — including arbitrary values, all modifiers, and every built-in utility — is available without any Node.js, npm, PostCSS, or build configuration. Open the playground and start writing Tailwind classes immediately.

The curriculum is organized into **15 chapters** that build on each other deliberately. The **Foundations** chapter opens with the core idea behind utility-first CSS: instead of writing a custom class and then writing CSS for it, you compose utilities directly in HTML. Three lessons cover the utility-first mental model, Tailwind's 10-shade color scale system (\`bg-blue-500\`, \`text-gray-900\`, \`border-red-300\`), and state modifiers (\`hover:\`, \`focus:\`, \`active:\`, \`disabled:\`) that apply utilities on interaction.

The **Typography**, **Spacing**, and **Sizing** chapters cover the classes you will use in every project: \`text-xl\`, \`font-bold\`, \`leading-relaxed\`, \`tracking-wide\`; \`p-4\`, \`px-6\`, \`mt-8\`, \`gap-3\`; \`w-full\`, \`h-screen\`, \`max-w-lg\`, \`min-h-0\`. These are the utilities that replace 80% of the custom CSS most developers write by hand.

The **Flexbox** chapter (3 lessons) covers everything the Flexbox spec provides via Tailwind: \`flex\`, \`flex-row\`, \`flex-col\`, \`flex-wrap\`, \`justify-start/center/between/around/evenly\`, \`items-start/center/end/stretch\`, \`flex-1\`, \`flex-grow\`, \`flex-shrink-0\`, and \`self-*\` for overriding individual item alignment. The **CSS Grid** chapter covers \`grid-cols-{n}\`, column and row spanning with \`col-span-*\` and \`row-span-*\`, and automatic placement with \`grid-flow-col\` — including the \`auto-fill\` and \`auto-fit\` responsive grid patterns that eliminate most media queries for card grids.

The **Borders & Effects** chapter teaches \`rounded-*\` for border radius, \`border\` and \`border-{color}\`, \`ring-*\` for box shadows that work in focus states, \`shadow-sm/md/lg/xl/2xl\`, \`opacity-*\`, and \`backdrop-blur-*\` for glassmorphism effects. The **Transitions & Animation** chapter adds motion: \`transition\`, \`duration-300\`, \`ease-in-out\`, \`delay-150\` for smooth property changes; \`scale-105\`, \`rotate-45\`, \`translate-x-2\` for transforms; and the three built-in keyframe animations — \`animate-spin\`, \`animate-pulse\`, and \`animate-bounce\`.

The **Responsive Design** chapter is where utility-first really demonstrates its power. Every Tailwind utility can be prefixed with a breakpoint — \`sm:flex-row\` applies only at 640px+, \`lg:grid-cols-3\` applies only at 1024px+. No media query blocks, no context switching between files. Three lessons cover the breakpoint system, the \`container\` centering pattern, and a complete dark mode implementation with \`dark:\` modifier classes.

The **Group & Peer** chapter teaches two of Tailwind's most distinctive patterns. Group modifiers (\`group\`, \`group-hover:\`, \`group-focus:\`) let parent hover states cascade to child elements — one hover on a card div can change the title color, show an arrow icon, and lift the shadow simultaneously. Named groups (\`group/nav\`, \`group-hover/nav:\`) handle nested interactive regions without conflicts. Peer modifiers (\`peer\`, \`peer-invalid:\`, \`peer-checked:\`, \`peer-focus:\`) style sibling elements based on form input state — the foundation of CSS-only form validation UI.

The **@apply & Config** chapter covers two production workflows: the \`@apply\` directive for extracting repeated utility groups into a single reusable class, and custom \`tailwind.config.js\` \`theme.extend\` entries for adding custom colors, spacing, font families, and breakpoints to the design system.

The **Component Patterns** chapter (4 lessons) builds complete, real UI with Tailwind: card components with image, body, and footer; responsive navigation bars with mobile hamburger menu states; form elements with labels, inputs, selects, checkboxes, and validation states; and badge and chip patterns for tags, status indicators, and notification counts.

The **Accessibility** chapter covers \`sr-only\` for screen-reader-only text (visually hidden but available to assistive technology), \`focus-visible:\` for keyboard-only focus rings that don't appear on mouse click, and \`aria-*\` modifiers (\`aria-checked:\`, \`aria-disabled:\`, \`aria-expanded:\`) that style elements based on ARIA attributes — letting you build fully accessible interactive components without JavaScript state management.

The **Advanced Patterns** chapter (7 lessons) goes deep on Tailwind's most powerful features: arbitrary values in square brackets (\`w-[327px]\`, \`grid-cols-[repeat(auto-fill,minmax(180px,1fr))]\`), arbitrary variants (\`[&>li]:mb-2\`, \`[&:nth-child(3)]:font-bold\`), the \`has-*\` selector modifier, \`@layer\` for adding custom utilities without specificity conflicts, \`motion-safe:\` for respecting reduced-motion preferences, \`print:\` styles for print-specific layouts, \`animate-pulse\` skeleton loading screens, and modern dialog/popover HTML patterns styled with Tailwind.

The **Tailwind v4** chapter covers the major changes in Tailwind CSS v4: the new CSS-first configuration approach using \`@import "tailwindcss"\` and \`@theme\` instead of \`tailwind.config.js\`, new built-in variants and color features, and how utility composition changes in v4. Understanding these differences is essential for any developer starting a new project or upgrading from v3.`,
  },
  features: [
    '48 lessons across 15 chapters — complete Tailwind CSS curriculum from first utility class to Tailwind v4 — convert existing styles with [CSS to Tailwind](https://fwdtools.com/css-to-tailwind) or expand classes back with [Tailwind to CSS](https://fwdtools.com/tailwind-to-css)',
    'Live HTML editor with Tailwind Play CDN — JIT engine supports all utilities including arbitrary values like w-[327px]',
    'Dark mode toggle — adds/removes dark class from preview <html> to activate dark: modifier classes',
    'Responsive preview sizes — 375px mobile, 768px tablet, full width — check breakpoints without resizing',
    'HTML syntax highlighting in the editor',
    'Quick Check multiple-choice challenges on key Tailwind concepts with persistent completion',
    'Confetti burst when completing all lessons in a chapter',
    'Download as standalone .html file with Tailwind CDN included — opens in any browser',
    'Lesson search and filter in the sidebar',
    'Progress saved to localStorage — no account or sign-up required',
    'Instant preview updates with 200ms debounce after typing',
    'Runs entirely in the browser — no install, no Node.js, no build step',
  ],
  useCases: [
    { icon: '⚡', title: 'Learn Tailwind from scratch', desc: 'Work through all 48 lessons in order — from the utility-first mental model and color system to flexbox layouts, responsive breakpoints, dark mode, group/peer modifiers, accessibility utilities, and Tailwind v4. Every concept has a working HTML example to edit.' },
    { icon: '⬚', title: 'Master responsive layouts fast', desc: 'The Responsive Design chapter teaches sm:/md:/lg:/xl:/ breakpoint prefixes with live editable examples. Use the 375px and 768px preview buttons to see your layout respond as you type class names — no browser resizing needed. Generate matching media queries with the [CSS media queries generator](https://fwdtools.com/css-media-queries-generator).' },
    { icon: '⇄', title: 'Build interactive components with group and peer', desc: 'The Group & Peer chapter teaches group-hover: cascades (entire card responds to one hover), named groups for nested regions, and peer-invalid:/peer-focus: for CSS-only form validation UI — powerful patterns that eliminate JavaScript for most interaction states.' },
    { icon: '▹', title: 'Prototype UI components quickly', desc: 'The Component Patterns chapter has working examples of cards, navigation bars, forms with validation, and badge patterns. Load the closest example, edit the classes to match your design, and copy the HTML into your project — faster than starting from a blank file.' },
    { icon: '◈', title: 'Prepare for frontend interviews', desc: 'Tailwind knowledge is now listed in most frontend job descriptions. The 15 chapters cover every topic that appears in technical screens: flexbox alignment, responsive breakpoints, dark mode implementation, hover state transitions, accessibility modifiers, and Tailwind v4 changes.' },
    { icon: '◇', title: 'Teach Tailwind in a classroom or workshop', desc: 'Load a lesson, walk through the concept, then live-edit the HTML and show the preview updating. The dark mode toggle and responsive preview buttons are especially effective for demonstrating theme and breakpoint behavior to an audience without switching tabs.' },
  ],
  faqs: faqSchema.mainEntity.map(item => ({ q: item.name, a: item.acceptedAnswer.text })),
  links: [
    { href: '/css-playground', label: 'CSS Playground — learn vanilla CSS before Tailwind utility classes' },
    { href: '/bootstrap5-playground', label: 'Bootstrap 5 Playground — learn Bootstrap with 50 interactive lessons' },
    { href: '/html-playground', label: 'HTML Playground — practice HTML structure with instant visual feedback' },
    { href: '/js-playground', label: 'JavaScript Playground — add interactivity to your Tailwind components' },
    { href: '/react-playground', label: 'React Playground — learn React component patterns with Tailwind-style props' },
  ],
};

export default function TailwindPlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}>
        <TailwindPlaygroundTool />
      </div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
