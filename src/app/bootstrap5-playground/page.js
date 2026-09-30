import Bootstrap5PlaygroundTool from '@/components/Bootstrap5PlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/bootstrap5-playground.png';

export const metadata = {
  title: 'Bootstrap 5 Playground — Learn Bootstrap 5 Visually, 50 Lessons Free | webdevpuneet.com',
  description: 'Learn Bootstrap 5 online with 50 hands-on lessons — grid, forms, cards, modals, and utilities. Live preview with Bootstrap 5.3, free, no install needed.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/bootstrap5-playground/' },
  icons: { icon: '/icons/bootstrap5-playground.svg', shortcut: '/icons/bootstrap5-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/bootstrap5-playground/',
    siteName: 'webdevpuneet.com',
    title: 'Bootstrap 5 Playground — 50 Interactive Lessons, Live Preview',
    description: 'Learn Bootstrap 5 with 50 hands-on lessons: grid, flexbox, typography, forms, modals, navbar, carousel, toasts, and utilities. Native dark mode, auto-init JS components, progress tracking. No sign-up.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Bootstrap 5 Playground — Interactive Lessons with Live Preview' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Bootstrap 5 Playground — 50 Interactive Lessons',
    description: 'Learn Bootstrap 5 with 50 step-by-step lessons. Live preview, native dark mode, auto-initialized JS components — all in the browser.',
    images: [OG_IMAGE],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How many lessons are in the Bootstrap 5 Playground?',
      acceptedAnswer: { '@type': 'Answer', text: 'There are 50 lessons across 15 chapters: Getting Started, Grid System, Typography, Colors & Borders, Tables, Images, Alerts & Badges, Buttons, Cards, Navigation, Forms (including Floating Labels and Validation), Components (including Toasts), Overlays, Carousel, and Utilities (including Position). Every lesson includes a working HTML example you can edit live and see in the preview instantly.' },
    },
    {
      '@type': 'Question',
      name: 'Does this Bootstrap playground run code on a server?',
      acceptedAnswer: { '@type': 'Answer', text: 'No. All code runs locally in a sandboxed iframe in your browser. Nothing is sent to a server. Bootstrap 5.3.3 CSS and JavaScript are loaded from the jsDelivr CDN into the preview iframe — your HTML code never leaves your device.' },
    },
    {
      '@type': 'Question',
      name: 'Is my progress saved between sessions?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Completed lessons and your last open position are saved to localStorage in your browser. When you return, the playground reopens at the lesson you were on and shows your completed lessons in the sidebar progress bar.' },
    },
    {
      '@type': 'Question',
      name: 'Which Bootstrap version does the playground use?',
      acceptedAnswer: { '@type': 'Answer', text: 'Every lesson uses Bootstrap 5.3.3 loaded from the jsDelivr CDN. Both the Bootstrap CSS and the Bootstrap bundle JavaScript (which includes Popper.js) are included automatically — no setup, no imports, no package manager needed.' },
    },
    {
      '@type': 'Question',
      name: 'Does dark mode work in the Bootstrap preview?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. When you toggle dark mode on webdevpuneet.com, the Bootstrap preview automatically switches via the data-bs-theme="dark" attribute on the html element. Bootstrap 5.3 handles all the color changes natively — backgrounds, borders, text, and components all adapt without any custom CSS.' },
    },
    {
      '@type': 'Question',
      name: 'Do Bootstrap JavaScript components like modals and tooltips work in the preview?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Bootstrap 5.3.3 bundle JavaScript is loaded in every preview, so all data-bs-* components work: modals, dropdowns, accordions, tabs, carousels, toasts, offcanvas panels, tooltips, and popovers. Tooltips and popovers are auto-initialized by the playground, so you only need the HTML attributes.' },
    },
    {
      '@type': 'Question',
      name: 'How do I use Bootstrap Toasts in the playground?',
      acceptedAnswer: { '@type': 'Answer', text: 'The Toasts lesson (in the Components chapter) shows how to trigger toasts with new bootstrap.Toast(el).show(). You can control the delay with the { delay: ms } option and prevent auto-dismiss with data-bs-autohide="false". All three patterns are demonstrated with working buttons in the lesson.' },
    },
    {
      '@type': 'Question',
      name: 'Can I download or share code from the playground?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Click the .html button to download the current lesson code as a standalone HTML file with Bootstrap 5.3.3 already linked. The Share button encodes your code into a URL parameter so you can send your exact code to a colleague or student.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Bootstrap 5 Playground',
  url: 'https://webdevpuneet.com/bootstrap5-playground/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based Bootstrap 5 learning playground with 50 structured lessons, live preview, syntax highlighting, progress tracking, console output, and quick-check challenges — no install or sign-up required.',
  featureList: [
    '50 lessons across 15 chapters — complete Bootstrap 5 curriculum including Toasts, Floating Labels, and Position utilities; pairs well with the [CSS playground](/css-playground) for fundamentals',
    'Bootstrap 5.3.3 CSS and JavaScript pre-loaded in every lesson preview',
    'Native dark mode via data-bs-theme="dark" — switches with the site theme toggle automatically',
    'Auto-initialized tooltips and popovers in every preview',
    'Live preview with 400ms debounce after typing',
    'Syntax highlighting for HTML tags, attributes, class values, and inline JavaScript',
    'Console panel captures log, warn, error from inside the iframe',
    'Progress tracking saved to localStorage — persists across sessions',
    'Confetti animation on chapter completion',
    '6 quick-check multiple-choice challenges embedded in key lessons',
    'Ctrl+Enter for immediate preview refresh',
    'Download lesson code as a standalone .html file with Bootstrap included',
    'Share link via URL parameter — send your modified code to anyone',
    'Resizable editor/preview split with drag handle',
    'Runs entirely in the browser — no install, no sign-up, no Node.js',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Learn to Code', item: 'https://webdevpuneet.com/learn-to-code/' },
    { '@type': 'ListItem', position: 3, name: 'Bootstrap 5 Playground', item: 'https://webdevpuneet.com/bootstrap5-playground/' },
  ],
};

const SEO = {
  slug: 'bootstrap5-playground',
  title: 'Learn Bootstrap 5 Online — 50 Interactive Lessons with Live Preview',
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Pick a lesson from the sidebar', text: 'The sidebar lists all 50 lessons grouped into 15 chapters. Start at the beginning with Getting Started and work through Grid System, Typography, Colors, Tables, Images, Alerts, Buttons, Cards, Navigation, Forms, Components, Overlays, Carousel, and Utilities — or jump directly to any lesson you need.' },
      { title: 'Read the concept panel at the top', text: 'Each lesson opens with a concise explanation of the Bootstrap class, component, or pattern it covers — including which HTML attributes and class combinations to use. Collapse the concept panel once you understand it to give the editor and preview more room.' },
      { title: 'Edit the HTML and watch the preview update', text: 'The editor on the left contains working Bootstrap 5 HTML for the lesson. The preview on the right rebuilds automatically 400ms after you stop typing. Bootstrap 5.3.3 CSS and JavaScript are pre-loaded — just write body HTML, no boilerplate, no CDN links needed.' },
      { title: 'Toggle dark mode to see Bootstrap\'s native theme', text: 'Use the dark mode toggle on webdevpuneet.com. The preview iframe switches automatically via data-bs-theme="dark" on the html element — Bootstrap 5.3 handles all color changes natively. Test how your layouts look in both light and dark before shipping.' },
      { title: 'Interact with Bootstrap JavaScript components', text: 'Modals, dropdowns, accordions, tabs, carousels, toasts, offcanvas panels, tooltips, and popovers all work in the preview. Bootstrap bundle JS is loaded automatically and tooltips/popovers are pre-initialized — just use data-bs-* HTML attributes and click the elements to test them.' },
      { title: 'Answer the Quick Check challenge', text: 'Six key lessons include a multiple-choice Quick Check below the editor — covering the grid system, alerts role attribute, button semantics, navbar breakpoints, form validation, and accordion behavior. Select an answer to see the correct one highlighted immediately.' },
      { title: 'Mark lessons done and track your progress', text: 'Click "Mark Done →" in the footer to record your progress. The progress bar in the sidebar updates. When you complete every lesson in a chapter, a confetti animation fires. Toggle the button again to reset progress from that lesson forward.' },
      { title: 'Download or share your modified code', text: 'Click .html to download the current lesson as a standalone HTML file with Bootstrap 5.3.3 already linked — ready to open in any browser. The Share button encodes your code into a URL so you can send your exact modifications to a colleague or student.' },
    ],
  },
  about: {
    title: 'Learn Bootstrap 5 Step by Step — 50 Interactive Lessons in the Browser',
    description: `Bootstrap 5 is the world's most popular CSS framework, powering millions of websites and web applications. It gives you a complete design system in one CDN link: a responsive 12-column grid, a full library of UI components, utility classes for spacing and layout, and interactive JavaScript widgets — all without writing a line of custom CSS or JavaScript for most tasks. If you are learning web development for the first time, adding Bootstrap to an existing project, or prepping for a front-end interview, the Bootstrap 5 Playground gives you a structured, interactive path through the entire framework — with 50 live, editable examples and a preview that updates as you type.

The playground is organized into **15 chapters** covering the complete Bootstrap 5 curriculum: Getting Started, Grid System, Typography, Colors & Borders, Tables, Images, Alerts & Badges, Buttons, Cards, Navigation, Forms, Components, Overlays, Carousel, and Utilities. Each lesson has a focused concept explanation and working HTML you can modify immediately. No Node.js, no terminal, no build step — open the playground and start writing.

The **Grid System chapter** teaches Bootstrap's 12-column responsive grid from the ground up: basic \`.col\` classes, breakpoint suffixes (sm/md/lg/xl/xxl), responsive column layouts with \`row-cols\`, column offsets with \`.offset-{n}\`, and visual reordering with \`.order-{n}\`. The grid is the foundation of every Bootstrap layout and understanding it thoroughly is the first milestone for any Bootstrap developer.

The **Forms chapter** (6 lessons) covers every input control Bootstrap provides: text, password, email, and textarea with \`.form-control\`; selects with \`.form-select\`; range sliders and color pickers; checkboxes, radio buttons, and switches with \`.form-check\`; input groups with text and button addons; **floating labels** that animate on focus; and the \`was-validated\` / \`needs-validation\` pattern for native browser constraint validation with Bootstrap's styled feedback messages.

The **Components chapter** (6 lessons) covers Bootstrap's most-used UI patterns: progress bars with striped and animated variants; spinners in border and grow styles for loading states; list groups with contextual colors and badges; accordions with \`data-bs-parent\` for exclusive open behavior; modals with scrollable and centered variants; and **toasts** — Bootstrap's push notification component — with auto-dismiss, custom delay, and persistent (non-autohide) configurations.

The **Overlays chapter** covers the three Bootstrap overlay patterns: dropdowns with headers, dividers, and direction variants (dropup, dropend, dropstart); tooltips and popovers — both auto-initialized in every preview so you can use them with just HTML attributes; and offcanvas panels that slide in from any edge — ideal for mobile navigation menus and side drawers.

The **Utilities chapter** (5 lessons) covers the building blocks for responsive fine-tuning without custom CSS: spacing utilities (margin and padding on all sides and breakpoints), flexbox utilities for alignment and distribution, display utilities for responsive show/hide, **position utilities** with corner anchoring, center alignment with \`translate-middle\`, and the notification badge pattern — plus shadows and overflow control.

Progress is saved to localStorage automatically. Your completed lessons persist across browser sessions. The sidebar progress bar shows how far through the curriculum you are. Completing every lesson in a chapter triggers a confetti animation. The dark mode toggle on webdevpuneet.com switches the Bootstrap preview to native dark mode via Bootstrap 5.3's built-in color system — backgrounds, text, borders, and all components adapt instantly without any custom CSS. For longer, example-driven walkthroughs of specific Bootstrap concepts, see the [Bootstrap tutorials on webdevpuneet.com](https://webdevpuneet.com/blog/).`,
  },
  features: [
    '50 lessons across 15 chapters — complete Bootstrap 5 curriculum including Toasts, Floating Labels, and Position utilities',
    'Bootstrap 5.3.3 CSS + JS pre-loaded in every lesson — no setup, no imports needed',
    'Native dark mode via data-bs-theme="dark" — switches automatically with the site theme toggle',
    'Auto-initialized tooltips and popovers — use data-bs-toggle without any JS code',
    'All JavaScript components work: modals, dropdowns, tabs, toasts, offcanvas, carousels, accordions',
    'Live preview rebuilds 400ms after typing stops — no Run button needed',
    'Syntax highlighting for HTML tags, class attributes, and inline JavaScript',
    'Console panel captures console.log, warn, and error output from the iframe',
    'Progress tracking saved to localStorage — persists across browser sessions',
    'Confetti animation fires on chapter completion',
    '6 quick-check multiple-choice challenges on key Bootstrap concepts',
    'Ctrl+Enter for immediate preview rebuild without waiting for debounce',
    'Download code as a standalone .html file with Bootstrap 5.3.3 already linked',
    'Share link via URL parameter — encode your code and send it to anyone',
    'Resizable editor/preview split with a drag handle',
    'Runs entirely in the browser — no install, no account, no Node.js',
  ],
  useCases: [
    { icon: '⚡', title: 'Learn Bootstrap 5 from scratch', desc: 'Work through all 50 lessons in order — from containers and the 12-column grid to forms with floating labels and validation, modals, toasts, carousels, and position utilities. Every concept builds on the previous one. Prefer utility-first CSS? Compare with the [Tailwind playground](/tailwind-playground).' },
    { icon: '⬚', title: 'Master the responsive grid', desc: 'The 3-lesson Grid chapter teaches col classes, breakpoint infixes, row-cols for card grids, offsets, and visual reordering — compare with hand-written layouts in the [CSS Grid builder](https://fwdtools.com/css-grid-builder) or [Flexbox builder](https://fwdtools.com/flexbox-builder).' },
    { icon: '⇄', title: 'Build forms with validation and floating labels', desc: 'The 6-lesson Forms chapter covers every Bootstrap form control including the floating label pattern and the was-validated client-side validation system — no JavaScript required for the validation styles.' },
    { icon: '▹', title: 'Prototype UI components before coding', desc: 'Test modals, dropdowns, accordions, toasts, offcanvas panels, and carousels directly in the preview. All Bootstrap JS components work via data-bs-* attributes — no initialization code needed for most of them.' },
    { icon: '◈', title: 'Teach Bootstrap in workshops or courses', desc: 'Share lesson URLs with students. Each lesson is self-contained — students can modify the HTML, see results instantly, download the file, or share their version via URL. Progress is stored locally per browser.' },
    { icon: '◇', title: 'Test dark mode layouts instantly', desc: 'Toggle dark mode on webdevpuneet.com to switch every Bootstrap component to data-bs-theme="dark". Bootstrap 5.3 handles all color changes natively — use the playground to check that your layout works in both themes before shipping.' },
  ],
  faqs: faqSchema.mainEntity.map(item => ({ q: item.name, a: item.acceptedAnswer.text })),
  links: [
    { href: '/css-playground', label: 'CSS Playground — learn CSS with interactive lessons and live preview' },
    { href: '/tailwind-playground', label: 'Tailwind CSS Playground — learn utility-first CSS interactively' },
    { href: '/html-playground', label: 'HTML Playground — practice HTML structure with instant visual feedback' },
    { href: '/js-playground', label: 'JavaScript Playground — write and run JavaScript in the browser' },
    { href: '/jquery-playground', label: 'jQuery Playground — 72 lessons covering selectors, AJAX, and plugins' },
  ],
};

export default function Bootstrap5PlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><Bootstrap5PlaygroundTool /></div>
      <IndexOnly><AdSlot showBlog={false} />
      <SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
