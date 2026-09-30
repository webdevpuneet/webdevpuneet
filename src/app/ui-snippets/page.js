import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import FrontendPlaygroundsStrip from '@/components/FrontendPlaygroundsStrip';
import { SNIPPET_COUNT } from '@/lib/snippet-count';

const OG_IMAGE = 'https://webdevpuneet.com/images/ui-snippets.png';

export const metadata = {
  title: `UI Snippets — ${SNIPPET_COUNT}+ Free HTML CSS JS Components | webdevpuneet.com`,
  description: `Browse ${SNIPPET_COUNT}+ free copy-paste UI snippets with a live HTML/CSS/JS editor. Export as HTML, JSX, React + Tailwind, Vue, or Angular. No sign-up, no install.`,
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/ui-snippets/' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/ui-snippets/',
    siteName: 'webdevpuneet.com',
    title: `UI Snippets Library — ${SNIPPET_COUNT}+ Free HTML CSS JS Components with Live Preview`,
    description: `Browse ${SNIPPET_COUNT}+ free copy-paste UI snippets with live preview. Command palette, kanban board, magnetic button, aurora background, OTP input, pricing toggle and more. Test and export each snippet as HTML, JSX, React + Tailwind CSS, Vue 3 SFC, or Angular component — preview it live in every framework before you download. Edit live, save to IndexedDB, sync via GitHub Gist.`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `UI Snippets Library — ${SNIPPET_COUNT}+ Free HTML CSS JS Components with Live Preview Editor` }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: `UI Snippets Library — ${SNIPPET_COUNT}+ Free HTML CSS JS Components`,
    description: `${SNIPPET_COUNT}+ copy-paste UI snippets with live editor and preview. Command palette, kanban, 3D cards, neon buttons, aurora background and more. Export as HTML, JSX, React + Tailwind CSS, Vue 3 SFC, or Angular component. Free, no install.`,
    images: [OG_IMAGE],
  },
};

const SEO = {
  slug: 'ui-snippets',
  title: `UI Snippets Library — ${SNIPPET_COUNT}+ Free HTML, CSS & JavaScript Components`,
  subtitle: 'Browse, edit, and copy production-ready UI snippets. Export as HTML, JSX, React + Tailwind CSS, Vue 3 SFC, or Angular component. Save to browser, sync via GitHub Gist.',
  about: {
    title: 'The Fastest Way to Build UI — Ready-to-Use HTML, CSS & JS Snippets with Live Preview',
    description: `When you're building a frontend, you keep writing the same things. A hamburger navigation. A pricing card. A skeleton loader. A toast notification. A floating label form. The patterns are the same every time — the markup you've typed before, the CSS rules you already know, the JavaScript you've copied from your last project. The only thing that changes is the colors and the copy.

The UI Snippets Library solves this. It's a free, browser-based collection of ${SNIPPET_COUNT}+ production-ready HTML, CSS, and JavaScript components. Every snippet loads instantly in a split-pane editor. Edit the HTML, CSS, or JS live — the preview updates as you type. Export as a standalone HTML file, a React JSX component, or a React + Tailwind CSS component with utility classes replacing the CSS. No install, no npm, no build step.

**What makes this different from a component library** is that these aren't React components wrapped in a framework. Every snippet is raw HTML, plain CSS, and vanilla JavaScript. Paste it anywhere. Adapt it to any project. You own the code — there's no external dependency to update, no peer dependency conflict, no version lock-in.

**Navigation snippets** include an animated hamburger menu with smooth open/close toggle, a tab bar with sliding active indicator, a breadcrumb with CSS-generated separators, a dropdown menu with scale+opacity animation, a multi-step progress stepper with forward/back navigation, and a scroll progress bar that fills as you read. The command palette is fully keyboard-navigable — arrow keys, Enter to run, Escape to close, Cmd+K to open — with fuzzy search and grouped results.

**Card snippets** go beyond the standard profile card. The 3D flip card uses CSS \`preserve-3d\` and \`backface-visibility\` to reveal a back face on click. The music player card has a working progress bar, play/pause toggle, vinyl spin animation, next/prev track switching, and a volume slider. The gradient border card uses an animated conic gradient pseudo-element border with a glow. The stats card animates numbers from zero using IntersectionObserver — the count starts when the card enters the viewport.

**Button snippets** include the magnetic button (the cursor physically pulls the button toward it using mouse position math), neon glow buttons in four colors (cyan, pink, green, purple — built purely with CSS \`box-shadow\` and \`text-shadow\`), a confetti burst button that launches particle physics on click, a loading button that cycles through idle/loading/success states, and a ripple button that creates a Material-style click ripple from the exact mouse position.

**Form snippets** solve the components that take the most time to get right. The OTP/PIN input auto-advances focus, handles paste, supports backspace, and validates on submit. The file dropzone handles drag-and-drop and file-input click with live file list, file type color coding, and remove buttons. The star rating has hover previews, click-to-set, and label display. The range slider includes three independent instances with live value display. The floating label uses only CSS — no JavaScript — with \`:placeholder-shown\` and \`:focus\` selectors.

**Layout snippets** demonstrate modern CSS techniques: the bento grid uses named \`grid-column: span\` areas, the split hero uses a two-column grid with a dark terminal-style right panel, the pricing toggle animates between monthly and annual prices with a CSS easing transition, the vertical timeline uses a \`::before\` gradient line with absolute-positioned node dots and pulse animation, and the kanban board uses the HTML5 drag-and-drop API with column count updates.

**Animation snippets** cover the effects that define modern UI: an aurora background with four floating CSS-animated gradient orbs using \`mix-blend-mode: screen\`, a spotlight effect that follows the mouse using a \`radial-gradient\` hole, a text scramble effect that decodes random characters into the final string frame by frame, a typewriter that cycles through an array of words with erase and retype, a 3D card tilt that calculates rotation angles from mouse position relative to the card center, a reveal-on-scroll using IntersectionObserver, a shimmer skeleton loader, a count-up animation with easing, a gradient text animation using \`background-clip: text\`, a marquee with CSS mask-based edge fade, and a dark mode toggle with a smooth knob transition and color-scheme-aware swatches.

**Gallery search and category filters.** The main library view is a searchable, filterable grid of all ${SNIPPET_COUNT}+ snippets with live iframe previews. Type in the search box to filter by name, or click a category pill (All, Navigation, Cards, Buttons, Forms, Layouts, Animations, Scroll Effects, Mobile Screens) to narrow the view. Pagination loads 9 snippets at a time with a "Load more" button.

**Five export formats.** Once you have edited a snippet to your liking, export it in the format that fits your project. The **HTML** button downloads a self-contained \`.html\` file ready to open in any browser. The **JSX** button downloads a React component with the CSS injected via a \`<style>\` tag. The **Tailwind** button converts the CSS to Tailwind utility classes (with arbitrary value fallbacks for custom sizes and colours) and downloads a component with no style tag — ready to drop into any Tailwind project. The **Vue** button exports a Vue 3 single-file component (\`.vue\`) — HTML event attributes are converted to Vue \`@event\` directives, JavaScript is wrapped in \`onMounted()\` from the Composition API, and the file is structured with \`<template>\`, \`<script setup>\`, and \`<style scoped>\` blocks. The **Angular** button exports a standalone Angular component (\`.component.ts\`) — inline event attributes are converted to Angular \`(event)\` bindings, JavaScript is placed inside \`ngAfterViewInit()\`, and the component uses the modern standalone API with \`CommonModule\` imported. Drop it into any Angular 14+ or Nuxt-style project without a module declaration.

**Test every export before you download.** Click **Test Exports** to open a split view: the generated code on one side, a live rendered preview on the other, with tabs for HTML, Tailwind, React, React + Tailwind, Vue, and Angular. Switch tabs to see the same snippet running as a real React component, a Vue 3 SFC, an Angular standalone component, or a Tailwind build — each rendered in a sandboxed iframe with the CDN libraries loaded. A built-in console surfaces any runtime errors, so you can confirm the converted component actually mounts and works before you ever download the file.

**Saved snippets gallery and GitHub Gist sync.** Unlike a static snippet library, this tool lets you save your own snippets — with any name you choose — to your browser's IndexedDB. Click the Saved tab to see your saved snippets as a full gallery grid with live previews and a search bar, identical to the library view. Edit any built-in snippet (or start from scratch), click "Save as", give it a name, and it's stored permanently in your browser. To back up across devices, connect a GitHub personal access token with \`gist\` scope. Your saved snippets sync to a private GitHub Gist — auto-syncing every 3 minutes while the tab is open and on every save. Restore from Gist on any device by entering your token and Gist ID.

All code runs locally in your browser. Nothing is uploaded to any server. The preview is a sandboxed \`<iframe>\` using \`srcdoc\`. Your saved snippets live in IndexedDB. Your GitHub token is stored only in \`localStorage\` — it never leaves your browser except to communicate with the GitHub API directly.`,
  },
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Browse or search snippets', text: `Use the sidebar search box or category chips (Navigation, Cards, Buttons, Forms, Layouts, Animations, Scroll Effects, Mobile Screens) to find the component you need. ${SNIPPET_COUNT}+ snippets are available instantly.` },
      { title: 'Load a snippet', text: 'Click any snippet to load its HTML, CSS, and JS into the three editor panels. The preview updates instantly — no need to click "run" or "refresh".' },
      { title: 'Edit the code live', text: 'Modify HTML, CSS, or JS in any panel. The preview refreshes as you type with a 200ms debounce. Each panel has Reset, Copy, and collapse buttons in its header.' },
      { title: 'Switch device preview', text: 'Click the Mobile (375px), Tablet (768px), or Desktop (full) buttons in the preview header to check how the snippet responds at different viewport widths.' },
      { title: 'Save your version', text: 'Click "Save as" in the header, type a name, and press Enter. Your snippet is saved to IndexedDB and appears in the Saved tab in the sidebar.' },
      { title: 'Sync via GitHub Gist', text: 'Click the GitHub button, paste a personal access token (gist scope), and click Sync Now. Your saved snippets back up to a private Gist and sync across devices automatically every 3 minutes.' },
      { title: 'Keep your Gist private — never share the URL', text: 'GitHub private Gists are not truly encrypted — they are unlisted links. Anyone who has your Gist URL or Gist ID can read all your saved snippets without logging in. Never share your Gist URL, Gist ID, or Personal Access Token with anyone. Avoid saving snippets that contain real API keys or credentials. For maximum privacy, skip Gist sync and use the Export and Import feature to transfer snippets manually instead.' },
      { title: 'Export in your format', text: 'Click "Copy all" to copy HTML+CSS+JS to your clipboard. Click "HTML" to download a standalone file. Click "JSX" for a React component. Click "Tailwind" for a React + Tailwind CSS component. Click "Vue" for a Vue 3 SFC (.vue). Click "Angular" for a standalone Angular .component.ts file with (event) bindings and ngAfterViewInit().' },
    ],
  },
  features: [
    `${SNIPPET_COUNT}+ production-ready UI snippets across 15 categories including Navigation, Cards, Buttons, Forms, Layouts, Animations, Scroll Effects, and Mobile Screens; build full navbars in the [navbar builder](https://fwdtools.com/navbar-builder) and sliders in the [carousel builder](https://fwdtools.com/carousel-builder)`,
    'Command palette with Cmd+K shortcut, arrow-key navigation, fuzzy search, and grouped results',
    'Kanban board with HTML5 drag-and-drop between To Do, In Progress, and Done columns — or use the full [mini kanban app](https://fwdtools.com/mini-kanban) for real task tracking',
    'Music player card with progress bar, play/pause, vinyl spin, track switching, and volume slider',
    'Magnetic button — mouse physically pulls the button toward the cursor using real-time position math',
    'Neon glow buttons in four cyberpunk colors — built entirely with CSS box-shadow and text-shadow',
    '3D card tilt with perspective rotation calculated from mouse position and a glow that follows the cursor',
    'Aurora background with four animated gradient orbs using CSS keyframes and mix-blend-mode: screen',
    'OTP/PIN input with auto-focus advance, paste handling, and backspace-to-previous behavior',
    'File dropzone with drag-and-drop, file type color coding, file size display, and remove buttons',
    'Pricing toggle with animated monthly/annual price flip using CSS easing transitions',
    'Vertical timeline with IntersectionObserver-triggered pulse animation on the active step',
    'Text scramble — matrix-style decode animation using requestAnimationFrame',
    'Spotlight effect — mouse-controlled radial gradient cut-out revealing content beneath a dark overlay',
    'Typewriter with array of words, per-character typing speed, erase, and loop',
    'Confetti button — click launches 80 physics particles with gravity and rotation',
    'Live HTML/CSS/JS split-pane editor with per-panel syntax highlighting, Reset, Copy, and collapse',
    'Mobile (375px), Tablet (768px), Desktop device preview buttons in the preview header',
    'Export as HTML file, React JSX component, React + Tailwind CSS component, Vue 3 SFC, or Angular standalone component (.component.ts)',
    'Test Exports — preview every snippet rendered live in HTML, Tailwind, React, React + Tailwind, Vue, and Angular before you download, with a built-in console for runtime errors',
    `Gallery search bar and category filters — find any snippet instantly across ${SNIPPET_COUNT}+ components`,
    'Save custom snippets to IndexedDB with any name — persists across page reloads',
    'Saved snippets gallery view — browse your saved snippets as a searchable grid with live previews',
    'GitHub Gist backup and sync — private Gist, auto-sync every 3 minutes, restore on any device',
    'Drag-to-resize sidebar, code/preview split, and vertical panel heights — all with snap-to-close',
    'Runs entirely in your browser — no server, no framework, no sign-up, no data uploaded',
  ],
  useCases: [
    { icon: 'CODE', title: 'Grab a component and ship it', desc: 'Find the skeleton loader, pricing card, or dropdown you need, edit it in the live editor, and paste the code into your project. No re-implementing the same patterns from memory on every project.' },
    { icon: 'LEARN', title: 'Understand how a CSS or JS technique works', desc: 'The magnetic button shows real-time vector math. The 3D tilt shows perspective transforms. The aurora shows mix-blend-mode. The OTP input shows DOM focus management. Each snippet is code you can read, break, and learn from.' },
    { icon: 'DESIGN', title: 'Prototype and test responsive layouts', desc: 'Load a hero section or bento grid, edit it to match your content, then use the Mobile/Tablet/Desktop preview buttons to check breakpoints before writing a line of framework code.' },
    { icon: 'FLOW', title: 'Build your own snippet library', desc: 'Edit any snippet to match your design system, save it under your own name, and build up a personal collection of ready-to-paste components stored in your browser. Connect GitHub Gist to access your library on any device.' },
    { icon: 'DOC', title: 'Reference production-ready patterns', desc: 'Bookmark this as your go-to for notification bells, command palettes, pricing toggles, file dropzones, and timelines. Every pattern here is real-world, not a toy demo.' },
    { icon: 'PEOPLE', title: 'Share patterns with your team', desc: 'Link a teammate to a specific snippet and describe which one to open. Every component is plainly named and searchable. No framework context required — just paste and adapt.' },
  ],
  faqs: [
    { q: 'What is a UI snippets library?', a: 'A UI snippets library is a collection of pre-built, copy-paste HTML, CSS, and JavaScript components — buttons, cards, forms, navigation menus, animations, and layouts — that you can drop into any web project without a framework or build tool.' },
    { q: 'How many UI snippets are included?', a: `The library currently includes ${SNIPPET_COUNT}+ snippets across 15 categories: Navigation (command palette, hamburger nav, dropdown, tab bar, breadcrumb, stepper, scroll progress, bottom nav, context menu, side drawer, animated tabs), Cards (3D flip, music player, profile, pricing, glassmorphism, gradient border, testimonial, stats, product card, event card, article card, social post card, user stats card), Buttons (magnetic, neon glow, confetti, ripple, loading, copy button, social buttons), Forms (OTP input, file dropzone, star rating, floating label, toggle switch, range slider, search box, tag input, color picker, credit card input, password strength, multi-step form), Layouts (bento grid, kanban board, pricing toggle, vertical timeline, split hero, modal, card grid, dashboard layout, masonry grid), Animations (aurora, spotlight, text scramble, typewriter, 3D tilt, skeleton loader, toast, count-up, gradient text, marquee, dark mode toggle, wave text, stagger list, glitch text, liquid blob, floating particles, matrix rain, analog clock, fireworks), Scroll Effects (scroll reveal, parallax layers, pinned story, horizontal pin, sticky stack, image-sequence scrub, velocity marquee, text clip reveal, SVG path draw, perspective cards, and more scroll-triggered effects), and Mobile Screens (chat, settings, feed, checkout, banking, music player, food order, ride-hailing, calendar, fitness, camera, stories, notifications, and search app screens framed in a CSS phone mockup).` },
    { q: 'Do the snippets work without a framework?', a: 'Yes. Every snippet is plain HTML, CSS, and vanilla JavaScript. No React, Vue, Angular, npm, or build step is needed. Paste the code into any .html file and open it in a browser — it works.' },
    { q: 'Can I edit the snippets before copying?', a: 'Yes. All three panels — HTML, CSS, and JS — are fully editable with live preview. Changes update the preview as you type. Each panel has a Reset button to restore the original code if needed.' },
    { q: 'How do I preview snippets on mobile and tablet sizes?', a: 'Use the three device buttons in the preview header: the phone icon constrains the preview to 375px (standard mobile), the tablet icon to 768px, and the monitor icon restores full width. The grey gutter around constrained previews simulates how the component would look on smaller screens.' },
    { q: 'Can I save my own custom snippets?', a: 'Yes. Click "Save as" in the header, type a name, and press Enter. Your snippet (with your edited HTML, CSS, and JS) is saved to IndexedDB in your browser. It appears in the "Saved" tab in the sidebar and persists across page reloads.' },
    { q: 'How does the GitHub Gist sync work?', a: 'Click the GitHub icon in the header, paste a GitHub personal access token with gist scope, and click Sync Now. Your saved snippets are stored as a private GitHub Gist (fwd-ui-snippets.json). The tool auto-syncs every 3 minutes when the tab is open. To restore on a new device, enter the same token and the Gist ID shown in the panel.' },
    { q: 'Is my data stored on any server?', a: 'No. Saved snippets live in your browser\'s IndexedDB. Your GitHub token is stored in localStorage. Neither is sent to any webdevpuneet.com server. The only network request this tool makes is to the GitHub API when you click Sync.' },
    { q: 'How do I export a snippet to use in my project?', a: 'Six options: "Copy all" copies HTML+CSS+JS to your clipboard as a single block. "HTML" downloads a self-contained .html file. "JSX" downloads a React component with the CSS in a style tag. "Tailwind" downloads a React component where the CSS has been converted to Tailwind utility classes. "Vue" downloads a Vue 3 SFC (.vue file) with @event directives, onMounted(), and <template>/<script setup>/<style scoped> blocks. "Angular" downloads a standalone Angular .component.ts file with (event) bindings, ngAfterViewInit(), and the modern standalone component API. Individual panel Copy buttons let you copy just the HTML, CSS, or JS.' },
    { q: 'Can I preview a snippet as React, Vue, or Angular before downloading?', a: 'Yes. Click "Test Exports" to open a split view with the generated code on one side and a live rendered preview on the other. Tabs let you switch between HTML, Tailwind, React, React + Tailwind, Vue, and Angular — each rendered in a sandboxed iframe with the required CDN libraries loaded, plus a console panel that surfaces runtime errors. You can confirm the converted component actually mounts and behaves correctly before you download the file.' },
    { q: 'Can I export snippets as Vue 3 or Angular components?', a: 'Yes — both frameworks are supported. Click "Vue" to download a Vue 3 single-file component (.vue) — inline event attributes (onclick, onchange, oninput, onsubmit, onkeydown) are converted to Vue @event directive syntax, JavaScript is wrapped in onMounted() from the Vue Composition API, and the file has <template>, <script setup>, and <style scoped> blocks. Click "Angular" to download a standalone Angular component (.component.ts) — event attributes become Angular (event) bindings, JavaScript is placed in ngAfterViewInit(), and the component uses the modern standalone API with CommonModule imported, compatible with Angular 14+ and no NgModule declaration required. Syntax-highlighted Vue SFC and Angular versions are also shown in the full source code section on each individual snippet page.' },
    { q: 'Can I resize the editor and preview panels?', a: 'Yes. Drag the vertical divider between the code panels and the preview to adjust the split. Drag the horizontal dividers between HTML, CSS, and JS panels to change their relative heights. Drag the sidebar handle to resize it — drag it below 100px and it snaps closed. Drag the code area below 100px and it collapses entirely, revealing a "Code" tab to reopen it.' },
    { q: 'Which snippets use JavaScript?', a: 'The command palette (keyboard navigation and fuzzy search), kanban board (drag-and-drop), music player (progress, playback), magnetic button (mouse position math), confetti button (particle physics), OTP input (focus management and paste), file dropzone (drag-and-drop events), star rating (hover and click state), pricing toggle (price animation), typewriter (character-by-character rendering), text scramble (requestAnimationFrame decode), 3D card tilt (real-time transform calculation), spotlight effect (mouse tracking), and reveal-on-scroll (IntersectionObserver) all use vanilla JavaScript. Navigation snippets, CSS cards, pure CSS forms, and CSS animations use no JavaScript at all.' },
    { q: 'Can I request new snippets?', a: 'The library grows regularly. To request a specific component or pattern, use the page comments below. Commonly requested snippets are added in batches.' },
    { q: 'Is GitHub Gist truly private? What should I avoid storing in synced snippets?', a: 'GitHub "private" Gists are not encrypted — they are unlisted links. Anyone who has your Gist URL or Gist ID can read all your saved snippets without needing a GitHub login. Never share your Gist URL, Gist ID, or Personal Access Token with anyone. Avoid saving snippets that contain real API keys, tokens, or production credentials — use placeholder values instead. For maximum privacy, skip Gist sync and use the Export and Import feature to transfer snippets manually.' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: SEO.faqs.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'UI Snippets Library',
  url: 'https://webdevpuneet.com/ui-snippets/',
  image: OG_IMAGE,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript and IndexedDB',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: metadata.description,
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
  featureList: SEO.features.map(f => typeof f === 'string' ? f : f.title),
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to find, edit, and copy UI snippets with live preview',
  description: 'Browse 50+ HTML CSS JS components, edit them live, preview on mobile/tablet/desktop, save to browser, and sync via GitHub Gist.',
  totalTime: 'PT3M',
  step: SEO.howToUse.items.map((item, i) => ({
    '@type': 'HowToStep',
    position: i + 1,
    name: item.title,
    text: item.text,
  })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',          item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Learn to Code', item: 'https://webdevpuneet.com/learn-to-code/' },
    { '@type': 'ListItem', position: 3, name: 'UI Snippets Library', item: 'https://webdevpuneet.com/ui-snippets/' },
  ],
};

export default function UiSnippetsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <IndexOnly>
        <AdSlot related={<FrontendPlaygroundsStrip />} />
        <SeoSection {...SEO} />
      </IndexOnly>
    </>
  );
}

