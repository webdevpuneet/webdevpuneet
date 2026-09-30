import HtmlPlaygroundTool from '@/components/HtmlPlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'HTML Playground — Learn HTML Visually, 42 Lessons Free | webdevpuneet.com',
  description: 'Learn HTML online with 42 click-based lessons — headings, forms, tables, semantic HTML, and SEO metadata. Live preview, free, no typing or install.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/html-playground/' },
  icons: { icon: '/icons/html-playground.svg', shortcut: '/icons/html-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/html-playground/',
    siteName: 'webdevpuneet.com',
    title: 'HTML Playground — Learn HTML Online with 42 Interactive Lessons',
    description: 'Click-based HTML learning — 42 lessons across 13 chapters. See every tag render live with the code shown alongside. Forms, tables, semantic HTML, responsive images, ARIA, performance hints, and SEO metadata. No install.',
    images: [{ url: 'https://webdevpuneet.com/images/html-playground.png', width: 1200, height: 630, alt: 'HTML Playground — 42 Interactive Lessons' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'HTML Playground — Learn HTML with 42 Interactive Lessons',
    description: 'Click a button, see the HTML render live, read the highlighted code. 42 lessons across 13 chapters — from your first tag to responsive images, native components, and SEO metadata. Free, no sign-up.',
    images: ['https://webdevpuneet.com/images/html-playground.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Do I need coding experience to use the HTML Playground?', acceptedAnswer: { '@type': 'Answer', text: 'None whatsoever. The playground is designed for people who have never written HTML before. You start by clicking buttons and watching things appear in the preview pane — no typing required for most lessons. The concept explanations avoid jargon and assume no prior knowledge. By the time you reach the sandbox lessons, you will have enough understanding to start writing HTML yourself.' } },
    { '@type': 'Question', name: 'How is this different from reading an HTML tutorial?', acceptedAnswer: { '@type': 'Answer', text: 'Reading a tutorial tells you what HTML does. This playground shows you. When you click a button and see a form appear in the preview, then look at the five lines of HTML that produced it, your brain makes a direct connection between code and outcome. The changed-line flash animation and Quick Check challenges add active recall on top of the visual feedback, which research shows doubles retention compared to passive reading.' } },
    { '@type': 'Question', name: 'What HTML topics does the playground cover?', acceptedAnswer: { '@type': 'Answer', text: '42 lessons across 13 chapters: Document Structure (HTML boilerplate, meta tags), Basics (what is HTML, tags, id/class, attributes), Text (headings, paragraphs, formatting, links, quotes, superscript/subscript), Lists (unordered, ordered), Structure (block vs inline, div/span, semantic HTML), Media (images, video, iFrames, audio), Forms (input types, form structure, select/textarea, fieldset/legend, validation, button types), Tables (structure, spanning cells), Advanced (details/summary, data-* attributes, abbreviations/tooltips), Responsive Images (picture/srcset, lazy loading), Native Components (dialog, inline SVG, ARIA roles/landmarks), Performance & Loading (resource hints, script loading, priority hints), and SEO Essentials (Open Graph/social meta, structured data JSON-LD).' } },
    { '@type': 'Question', name: 'Is my progress saved if I close the browser?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Both completed lessons and your current position are saved to your browser\'s localStorage. When you return to the page you will be placed on the exact lesson you were viewing, with all previously completed lessons still marked as done. No account or login is required — everything is stored locally on your device.' } },
    { '@type': 'Question', name: 'Can I write my own HTML and test it in the playground?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Several lessons include a sandbox mode — a free-form text area where you can write any HTML you like and watch it render live in the preview pane. This is available alongside the guided picker and toggle lessons, so you can experiment beyond the curated examples without leaving the tool.' } },
    { '@type': 'Question', name: 'What are the Quick Check challenges?', acceptedAnswer: { '@type': 'Answer', text: 'Quick Check challenges appear after the interactive demo on selected lessons. They present a multiple-choice question about the concept you just explored. Click the answer you think is correct — a green highlight means you got it right; red shows the correct answer if you were wrong. These challenges use active recall, which is one of the most effective techniques for moving knowledge from short-term to long-term memory.' } },
    { '@type': 'Question', name: 'What is semantic HTML and why does the playground cover it?', acceptedAnswer: { '@type': 'Answer', text: 'Semantic HTML means using tags that describe the meaning of their content rather than just how it looks — header, nav, main, article, section, aside, and footer instead of generic divs. Search engines use these tags to understand page structure, which helps SEO. Screen readers use them to help visually impaired users navigate. The Structure chapter has a live lesson where you can see exactly how semantic tags differ from divs.' } },
    { '@type': 'Question', name: 'Does the playground cover HTML forms and form validation?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — forms are covered across six lessons. Input Types shows all common input types including text, email, password, checkbox, radio, date, range, and colour. Form Structure shows complete form layouts. Select & Textarea covers dropdowns and multi-line inputs. Fieldset & Legend shows how to group related inputs. Form Validation demonstrates HTML5 built-in validation attributes — required, minlength, min, max, and pattern — that validate input without JavaScript. Button Types covers submit, reset, and button roles.' } },
    { '@type': 'Question', name: 'What are resource hints and why are they in an HTML tutorial?', acceptedAnswer: { '@type': 'Answer', text: 'Resource hints are HTML link elements that tell the browser how to prioritise loading: dns-prefetch resolves a domain early, preconnect opens a connection in advance, preload fetches a critical resource immediately, and prefetch downloads a resource for the next page. They live in HTML — not CSS or JavaScript — so understanding them is part of learning modern HTML. The Performance & Loading chapter demonstrates all three and shows how they affect the browser\'s loading waterfall.' } },
    { '@type': 'Question', name: 'Can I use the HTML Playground on a phone or tablet?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, the layout is fully responsive. On smaller screens the sidebar collapses and the full width is used for the lesson content and preview. The demo controls, preview pane, and code panel all adapt to the available space. The playground is perfectly usable on mobile, though a larger screen is more comfortable for the split preview layout.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'HTML Playground',
  url: 'https://webdevpuneet.com/html-playground/',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires a modern browser with JavaScript enabled',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free interactive HTML learning playground with 42 click-based lessons across 13 chapters — document structure, text, lists, semantic HTML, forms, tables, media, responsive images, native browser components, performance hints, and SEO metadata. Live split-pane preview with syntax-highlighted code, changed-line flash animation, Quick Check challenges, sandbox mode, and progress tracking via localStorage. No install required.',
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
  featureList: [
    '42 click-based lessons across 13 chapters',
    'Live split pane — rendered preview and syntax-highlighted code side by side',
    'Click-based picker demos — no typing required to learn',
    'Changed-line flash animation highlights what each click modified',
    'Semantic HTML, ARIA roles, and accessibility covered',
    'Forms chapter — 6 lessons including input types, validation, fieldset/legend',
    'Responsive Images — picture/srcset and lazy loading',
    'Native Components — dialog, inline SVG, ARIA landmarks',
    'Performance & Loading — resource hints, script loading strategies, priority hints',
    'SEO Essentials — Open Graph/social meta and structured data JSON-LD',
    'Quick Check multiple-choice challenges with active recall',
    'Sandbox mode for free-form HTML experimentation',
    'Confetti burst on chapter completion',
    'Progress and position saved to localStorage — no account needed',
    'Resizable split handle — drag to adjust pane sizes',
    'Arrow-key navigation for picker options',
    '100% browser-based — no install, no sign-up',
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Learn to Code', item: 'https://webdevpuneet.com/learn-to-code/' },
    { '@type': 'ListItem', position: 3, name: 'HTML Playground', item: 'https://webdevpuneet.com/html-playground/' },
  ],
};

const seoData = {
  slug: 'html-playground',
  title: 'HTML Playground — Learn HTML Visually, No Typing Required',
  subtitle: 'A free interactive HTML tutorial with 42 click-based lessons across 13 chapters — from your first tag to forms, semantic HTML, responsive images, native components, performance hints, and SEO metadata.',

  about: {
    title: 'Learn HTML Online Without Memorising Syntax — 42 Lessons, Live Preview',
    description: `Most people struggle to learn HTML because they stare at code without seeing what it actually does. You read that \`<h1>\` makes a heading, but you do not feel the difference between \`<h1>\` and \`<h3>\` until you see both on screen. You read that forms use \`<input type="email">\`, but you do not understand the validation behaviour until you try submitting one. This HTML Playground fixes that by making every concept visual and immediate: click a button, see the result render in the preview, read the exact lines of HTML that produced it.

No typing is required to start. No install, no account, no terminal. Open the page and 42 lessons are ready — click-based demos that teach you what HTML does by showing you, not telling you.

**Document Structure and Basics — what every HTML file starts with**

The first chapter walks through the HTML boilerplate that every webpage is built on: \`<!DOCTYPE html>\`, \`<html lang>\`, \`<head>\`, \`<meta charset>\`, \`<meta name="viewport">\`, \`<title>\`, and \`<body>\`. A Meta Tags lesson shows which \`<meta>\` elements browsers and search engines actually read. The Basics chapter answers the foundational questions — what is HTML, how do tags and elements work, what are id and class attributes for, and how do attributes pass information to elements.

**Text — headings, paragraphs, formatting, links, quotes, and more**

Six text lessons covering the elements you will type in every HTML document. Headings demonstrates all six levels (\`<h1>\` through \`<h6>\`) so you can see the visual and semantic hierarchy — and understand why page structure matters for SEO and screen readers. Paragraphs & Line Breaks shows the difference between \`<p>\` and \`<br>\` in practice. Text Formatting lets you toggle \`<strong>\`, \`<em>\`, \`<mark>\`, \`<del>\`, and \`<ins>\` individually and in combination. Links covers \`href\`, \`target="_blank"\`, relative paths, anchor links within the same page, and the \`download\` attribute. Quotes & Code demonstrates \`<blockquote>\`, \`<q>\`, \`<cite>\`, \`<code>\`, \`<kbd>\`, and \`<pre>\` — elements that give meaning to quoted text and code samples. Superscript & Subscript shows \`<sup>\` and \`<sub>\` with footnote and chemical formula examples.

**Lists, Structure, and Semantic HTML — how pages are organised**

Lists covers unordered (\`<ul>\`) and ordered (\`<ol>\`) lists, list item nesting, and the different \`type\` attribute values for numbered lists. The Structure chapter is where the mental model of how HTML organises a page becomes concrete: Block vs Inline shows why a \`<div>\` takes up the full width while a \`<span>\` sits inline with text. Div & Span demonstrates their roles as unsemantic wrappers. Semantic HTML is one of the most important lessons in the curriculum — it shows \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`, \`<aside>\`, and \`<footer>\` side by side with equivalent \`<div>\` soup, making the meaning difference impossible to miss. Search engines and screen readers both rely on these tags, so understanding them is essential for anyone building real web pages.

**Media — images, video, iFrames, and audio**

Four media lessons. Images covers \`<img>\` with \`src\`, \`alt\`, \`width\`, \`height\`, and loading attributes — and why the \`alt\` attribute is not optional when the image carries meaning. Video demonstrates the \`<video>\` element with multiple source formats, \`controls\`, \`autoplay\`, \`muted\`, and \`loop\`. iFrame Embeds shows embedding a YouTube video, a map, and a web page with \`sandbox\` and \`allow\` attributes. Audio covers the \`<audio>\` element with \`controls\` and multiple source fallbacks.

**Forms — six lessons covering every form pattern**

Forms are the most complex chapter and get six lessons. Input Types covers all common \`<input>\` types: text, email, password, number, tel, checkbox, radio, date, range, and colour — each rendered live so you can see the browser's native UI for each type. Form Structure builds complete layouts including a contact form, login form, and search bar. Select & Textarea covers \`<select>\` with option groups and \`<textarea>\` with rows and cols. Fieldset & Legend shows how to group related inputs with an accessible label. Form Validation demonstrates HTML5 built-in attributes — \`required\`, \`minlength\`, \`maxlength\`, \`min\`, \`max\`, \`step\`, and \`pattern\` — that validate user input in the browser without any JavaScript. Button Types covers the three \`<button>\` type values: submit, reset, and button — and why mixing them up breaks forms.

**Tables — structure and spanning**

Two table lessons. Table Structure builds a data table from scratch: \`<table>\`, \`<thead>\`, \`<tbody>\`, \`<tfoot>\`, \`<tr>\`, \`<th>\`, and \`<td>\` — with \`scope\` for accessibility. Spanning Cells demonstrates \`colspan\` and \`rowspan\` with a visual calendar-style example so you can see exactly which cells merge and how the HTML describes that.

**Advanced, Responsive Images, Native Components — modern HTML**

Three advanced chapters covering features that rarely appear in beginner tutorials but are used constantly in real-world HTML. The Advanced chapter covers \`<details>\` and \`<summary>\` for native accordions, \`data-*\` attributes for embedding custom data in elements, and \`<abbr>\` with \`title\` for accessible tooltips. Responsive Images teaches \`<picture>\` with multiple \`<source>\` elements for art direction and \`srcset\` with \`sizes\` for resolution switching — the correct way to serve different images at different screen sizes. The Lazy Loading lesson shows \`loading="lazy"\` on images and iFrames. Native Components covers the HTML \`<dialog>\` element with \`showModal()\` and \`close()\`, inline SVG shapes and icons embedded directly in HTML, and ARIA \`role\` attributes and landmark roles for screen reader navigation.

**Performance & Loading — resource hints, script strategies, priority hints**

Three lessons that explain how HTML controls browser loading behaviour. Resource Hints covers \`<link rel="dns-prefetch">\`, \`rel="preconnect"\`, \`rel="preload"\`, and \`rel="prefetch"\` — each shown with a concrete use case. Script Loading Strategies demonstrates the difference between a render-blocking \`<script>\`, \`defer\`, and \`async\` — with a visual timeline showing when each strategy executes relative to HTML parsing. Priority Hints covers the \`fetchpriority\` attribute on images, scripts, and link elements — the mechanism behind Core Web Vitals LCP optimisation.

**SEO Essentials — Open Graph and structured data**

Two lessons on the HTML that affects how your pages appear in search results and social media. Open Graph & Social Meta covers the \`og:title\`, \`og:description\`, \`og:image\`, and \`og:url\` meta tags used by Facebook, LinkedIn, and Slack, plus the Twitter/X \`twitter:card\` meta tags. Structured Data — JSON-LD demonstrates embedding a \`<script type="application/ld+json">\` schema in a page and explains how Google uses it to generate rich results.

Progress is saved to localStorage automatically. Quick Check questions appear on key lessons for active recall. A sandbox mode on selected lessons lets you write any HTML and see it render live. All code runs fully in your browser — no data is uploaded.

For longer, example-driven walkthroughs of specific HTML concepts, see the [HTML tutorials on webdevpuneet.com](https://www.webdevpuneet.com/search/label/HTML).`,
  },

  features: [
    '42 click-based lessons across 13 chapters — from HTML boilerplate to JSON-LD structured data (generate production schema with the [schema markup generator](https://fwdtools.com/schema-markup-generator))',
    'Live split pane — rendered browser preview and syntax-highlighted code side by side — continue to the [CSS playground](/css-playground) and [JavaScript playground](/js-playground) when ready',
    'Click-based picker demos — no typing required to see every HTML tag in action',
    'Changed-line flash animation highlights exactly what each click modified in the code',
    'Forms chapter — 6 lessons covering input types, form structure, fieldset, validation, and button types',
    'Semantic HTML lesson — header, nav, main, article, section, aside, footer vs div soup',
    'Responsive Images — picture/srcset for art direction and resolution switching, loading="lazy"',
    'Native Components — dialog element, inline SVG, ARIA roles and landmark attributes',
    'Performance & Loading — dns-prefetch, preconnect, preload, defer, async, fetchpriority',
    'SEO Essentials — Open Graph/social meta tags and JSON-LD structured data',
    'Quick Check multiple-choice challenges with active recall on key lessons',
    'Sandbox mode — write any HTML and see it render live in the preview',
    'Confetti burst when completing the last lesson in a chapter',
    'Progress and position saved to localStorage — resume exactly where you left off',
    'Resizable split handle — drag to adjust editor/preview ratio',
    'Arrow-key navigation for cycling through picker options',
    '100% browser-based — no install, no account, no sign-up',
  ],

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Open the playground — no install required',
        text: 'Navigate to the HTML Playground. No Node.js, no npm, no editor install. The first lesson is already loaded in the preview. Start from Document Structure if you are new to HTML, or click any lesson in the sidebar to jump directly to a topic.',
      },
      {
        title: 'Read the short concept explanation',
        text: 'Every lesson starts with a plain-English explanation — what the HTML element does, when to use it, and why it matters. Written without jargon and without assumed knowledge. Read it once, then move to the interactive demo.',
      },
      {
        title: 'Click the picker options and watch the preview update',
        text: 'The Interactive Demo section shows clickable option buttons. Click one to load that HTML into the preview instantly. Use the ← → arrow keys to cycle through options without clicking. Callout notes (💡) on individual options explain specific details or browser behaviour for that variant.',
      },
      {
        title: 'Study the split preview and code panel',
        text: 'The left pane shows exactly what the browser renders. The right pane shows the HTML with syntax highlighting — tags in orange, attributes in blue, values in green. When you switch options, changed lines flash briefly so your eye goes straight to what moved. Drag the divider to resize the panes. Click Copy to copy the current HTML to your clipboard.',
      },
      {
        title: 'Answer the Quick Check challenge',
        text: 'On key lessons a 🎯 Quick Check appears after you interact with the demo. Click the answer you think is correct — green means right, red means wrong with the correct answer shown. These challenges use active recall to move knowledge from short-term to long-term memory.',
      },
      {
        title: 'Use sandbox mode to experiment freely',
        text: 'Sandbox lessons provide a free-form text area where you can write any HTML and see it render live. Combine tags you have just learned, try something new, or paste in code from another source to see what it produces. Sandbox mode is the bridge from guided lessons to writing HTML yourself.',
      },
      {
        title: 'Work through the advanced chapters at your own pace',
        text: 'Responsive Images, Native Components, Performance & Loading, and SEO Essentials are standalone chapters you can visit in any order. Each teaches a specific area of modern HTML that beginners often miss — picture/srcset, dialog, ARIA roles, resource hints, and JSON-LD structured data.',
      },
      {
        title: 'Track chapter completions and your overall progress',
        text: 'The sidebar progress bar and lesson counter update as you finish lessons. Completing the last lesson in any chapter triggers a confetti celebration. Your progress and current position are saved automatically — close the tab and return later to pick up exactly where you left off.',
      },
    ],
  },

  useCases: [
    {
      icon: '🌱',
      title: 'Complete beginners learning HTML for the first time',
      desc: 'If you have never written a line of HTML and want to understand how websites are built, this playground removes every barrier. No install, no account, no terminal. Click a button, see a webpage element appear, read the five lines of HTML that produced it. The visual feedback loop teaches HTML faster than any text tutorial because your brain connects code to outcome in real time. The 42-lesson path takes you from document boilerplate to responsive images and SEO metadata.',
    },
    {
      icon: '🎨',
      title: 'Designers who want to read and write developer code',
      desc: 'Designers who work alongside developers need to understand HTML without becoming full-time engineers. This playground shows you what every tag produces so you can read a pull request, speak the same language as your team, or make small edits to a template yourself. See the difference between block and inline elements, learn why semantic tags like article and section matter, and understand when to use div vs a meaningful element.',
    },
    {
      icon: '📚',
      title: 'Students and bootcamp learners reinforcing classroom lessons',
      desc: 'Use the HTML Playground alongside any course, bootcamp, or classroom curriculum. When an instructor introduces a new tag, jump to the corresponding lesson here and interact with it immediately. Seeing the tag render live and answering a Quick Check challenge cements understanding far faster than re-reading notes. Work through lessons systematically using the progress tracker, or jump to any topic for targeted review.',
    },
    {
      icon: '⊞',
      title: 'Developers learning modern HTML features',
      desc: 'Even experienced developers forget the exact attributes for srcset, have never used the native dialog element, or have not looked at fetchpriority and resource hints before. The Responsive Images, Native Components, Performance & Loading, and SEO Essentials chapters cover the modern HTML that rarely appears in beginner tutorials — click through each option and read the exact markup, no MDN tab-switching required.',
    },
    {
      icon: '🏫',
      title: 'Teachers demonstrating HTML in the classroom',
      desc: 'The HTML Playground works well as a live demonstration tool projected on a classroom screen. Click through picker options to show how heading levels compare, toggle formatting tags to show how strong and em combine, or build a form layout during a lesson. The large preview pane is easy to see from a distance, and the code panel shows exactly what produced each result so students can follow along.',
    },
    {
      icon: '🚀',
      title: 'Career changers building a web development foundation',
      desc: 'If you are transitioning into a tech role and need to get comfortable with HTML quickly, the structured 42-lesson path gives you a clear route from your first tag to form validation, semantic structure, responsive images, and SEO metadata. Each lesson takes a few minutes and builds on the one before. By the time you finish all 13 chapters you have a solid mental model of how HTML works — ready to add CSS and JavaScript on top.',
    },
  ],

  faqs: [
    { q: 'Do I need any coding experience to use the HTML Playground?', a: 'None whatsoever. The playground is designed for people who have never written HTML before. You start by clicking buttons and watching things appear in the preview pane — no typing required for most lessons. The concept explanations avoid jargon and assume no prior knowledge.' },
    { q: 'How is this different from just reading an HTML tutorial?', a: 'Reading a tutorial tells you what HTML does. This playground shows you. When you click a button and see a form appear in the preview, then look at the five lines of HTML that produced it, your brain makes a direct connection between code and outcome. The changed-line flash and Quick Check challenges add active recall on top of the visual feedback, which doubles retention compared to passive reading.' },
    { q: 'What HTML topics are covered in the 42 lessons?', a: '13 chapters: Document Structure (boilerplate, meta tags), Basics (tags, id/class, attributes), Text (headings, paragraphs, formatting, links, quotes, superscript/subscript), Lists (unordered, ordered), Structure (block vs inline, div/span, semantic HTML), Media (images, video, iFrames, audio), Forms (input types, form structure, select/textarea, fieldset/legend, validation, button types), Tables (structure, spanning cells), Advanced (details/summary, data-* attributes, abbreviations/tooltips), Responsive Images (picture/srcset, lazy loading), Native Components (dialog, inline SVG, ARIA roles), Performance & Loading (resource hints, script strategies, priority hints), and SEO Essentials (Open Graph meta, JSON-LD structured data).' },
    { q: 'Is my progress saved if I close the browser?', a: 'Yes. Completed lessons and your current position are saved to your browser\'s localStorage. When you return you will be placed on the exact lesson you were viewing, with all completed lessons still marked done. No account or login is required. Clearing your browser\'s local storage or using a different browser will reset progress.' },
    { q: 'Can I write my own HTML and test it in the playground?', a: 'Yes. Several lessons include a sandbox mode — a free-form text area where you can write any HTML and watch it render live. This is available alongside the guided picker lessons, so you can experiment beyond the curated examples without leaving the tool.' },
    { q: 'What is semantic HTML and why is it in an HTML tutorial?', a: 'Semantic HTML means using tags that describe the meaning of their content — header, nav, main, article, section, aside, footer — instead of generic divs. Search engines use these tags to understand page structure, which helps SEO. Screen readers use them to help visually impaired users navigate. The Structure chapter has a live lesson where you can see how semantic tags differ from div soup.' },
    { q: 'Does the playground cover HTML forms and form validation?', a: 'Yes — forms get six lessons. Input Types shows all common input types. Form Structure builds complete form layouts. Select & Textarea covers dropdowns and multi-line inputs. Fieldset & Legend groups related inputs accessibly. Form Validation demonstrates HTML5 built-in attributes — required, minlength, min, max, step, and pattern — that validate user input without JavaScript. Button Types covers submit, reset, and button roles.' },
    { q: 'What are resource hints and why are they in an HTML tutorial?', a: 'Resource hints are HTML link elements that tell the browser how to prioritise loading: dns-prefetch resolves a domain early, preconnect opens a connection in advance, preload fetches a critical resource immediately. They live in HTML — not CSS or JavaScript — so they are part of learning modern HTML. The Performance & Loading chapter shows all three with concrete use cases and explains how they affect loading waterfalls.' },
    { q: 'What are the Quick Check challenges?', a: 'Quick Check challenges appear after the interactive demo on selected lessons. They present a multiple-choice question about the concept you just explored. Click the answer — green means right, red shows the correct answer if you were wrong. They use active recall, one of the most effective techniques for moving knowledge into long-term memory.' },
    { q: 'Can I use the HTML Playground on a phone or tablet?', a: 'Yes. The layout is fully responsive — on smaller screens the sidebar collapses and the full width is used for the lesson content and preview. The playground is perfectly usable on mobile, though a larger screen is more comfortable for the split preview layout.' },
  ],

  links: [
    { label: 'CSS Playground', href: '/css-playground/', desc: 'Add styling to your HTML — learn CSS with interactive visual lessons.' },
    { label: 'JavaScript Playground', href: '/js-playground/', desc: 'Add behaviour to your HTML — 60 guided JS lessons including DOM and events.' },
    { label: 'Tailwind CSS Playground', href: '/tailwind-playground/', desc: 'Learn the utility-first CSS framework that works directly in HTML class attributes.' },
    { label: 'SEO Checker', href: 'https://fwdtools.com/seo-checker/', desc: 'Audit your HTML meta tags, Open Graph, and structured data with a live checker.' },
    { label: 'React Playground', href: '/react-playground/', desc: 'Learn how React components generate HTML — the natural next step after HTML and CSS.' },
  ],
};

export default function HtmlPlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}>
        <HtmlPlaygroundTool />
      </div>
      <IndexOnly><AdSlot />
      <SeoSection {...seoData} /></IndexOnly>
    </div>
  );
}
