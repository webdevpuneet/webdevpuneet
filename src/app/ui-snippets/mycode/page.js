import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import FrontendPlaygroundsStrip from '@/components/FrontendPlaygroundsStrip';
import { SNIPPET_COUNT } from '@/lib/snippet-count';

const OG_IMAGE = 'https://webdevpuneet.com/images/ui-snippets/mycode.png';
const TITLE    = 'My Code — Free Personal HTML CSS JS Code Space, No Signup | webdevpuneet.com';
const DESC     = `Free personal code space — no signup, no account. Save, practice and learn HTML, CSS and JavaScript. Save from ${SNIPPET_COUNT}+ snippets or write your own. Nothing uploaded, nothing shared — just your code, in your browser.`;

export const metadata = {
  title: TITLE,
  description: DESC,
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/ui-snippets/mycode/' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/ui-snippets/mycode/',
    siteName: 'webdevpuneet.com',
    title: TITLE,
    description: DESC,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'My Code — Personal HTML CSS JS Code Space' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: TITLE,
    description: DESC,
    images: [OG_IMAGE],
  },
};

const SEO = {
  about: {
    title: 'My Code — Personal HTML CSS JS Code Space',
    description: `If you are learning HTML, CSS, or JavaScript, one of the hardest problems is where to keep what you have learned. Notes get lost. CodePen links scatter across browser tabs. Copy-pasted snippets disappear into dead text files. My Code solves this — it is a personal, private, always-available code space built into the UI Snippets tool where you save your work, practice new techniques, and build your own collection of reusable components over time.

**For learners: the fastest way to understand frontend code is to read it, break it, and make it yours.** My Code gives you ${SNIPPET_COUNT}+ real-world HTML, CSS, and JavaScript components to learn from. Open a magnetic button — it teaches real-time vector math. Open a CSS aurora background — it teaches \`mix-blend-mode\` and \`@keyframes\`. Open an OTP input — it teaches DOM focus management. Load any snippet, change values, remove lines, add your own styles, and watch what breaks and what improves in the live preview. Then save your version with the name of the technique you just learned. Next time you need it, it is already there, already understood, already yours. Pair this with the [HTML Playground](/html-playground) or [CSS Playground](/css-playground) to go deeper on individual languages.

**For practitioners: stop rewriting the same things from memory on every project.** The patterns you reach for on every project — a loading state, a dropdown, a card layout, a responsive nav — should not live in your head or inside old project folders. Save your best version of each one to My Code, name it clearly, and paste it into any new project in seconds. Every snippet you save is fully editable at any time. Your personal library grows with you.

**Create from scratch, not just from templates.** My Code is not just a place to save library snippets. Click \`+ Create new\` and you get a completely blank HTML, CSS, and JavaScript editor with live preview. No template, no boilerplate, no framework. Write anything — a widget you are experimenting with, a layout idea you want to test, a JavaScript technique you are practising. Save it when it works. Come back and improve it later.

**Everything stays in your browser.** My Code uses your browser's IndexedDB — a local database built into every modern browser. No account required, no sign-up, no data uploaded to any server. Your snippets are as private as a file on your desktop. Close the tab, restart your computer, come back three months later — your code is still there.

**Add any external library via CDN.** Practising GSAP animations? Learning Three.js? Testing Alpine.js? Every snippet in My Code has a CDN panel where you paste any JS or CSS CDN URL — the library loads instantly in the preview. If you want to go deeper on CSS specifically, the [CSS Animation Generator](https://fwdtools.com/css-animation-generator) can help you generate keyframe code to paste in. Common libraries like Bootstrap, Tailwind, jQuery, GSAP, D3, and Chart.js are available as one-click suggestions. Your CDN links are saved with each snippet so they reload automatically every time you open it.

**Take your code anywhere with GitHub Gist sync.** Connect a GitHub personal access token (gist scope only) and your entire collection backs up to a private GitHub Gist. The sync runs automatically every 3 minutes while the tab is open. On a new device, enter your token and Gist ID and your full library restores instantly. Your code follows you without any webdevpuneet.com account, subscription, or cloud service involved.`,
  },
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Start learning from the library', text: `Open any of the ${SNIPPET_COUNT}+ components from the library. Read the HTML, CSS, and JS to understand how it works. Change values, remove styles, add new ones. See what breaks and what improves in the live preview — this is the fastest way to learn frontend techniques.` },
      { title: 'Save what you learn', text: 'Once you understand a snippet and have adapted it to your taste, click "Save as", give it a name that reflects what you learned (e.g. "CSS Grid Bento Layout" or "IntersectionObserver Reveal"), and press Enter. It lands in My Code instantly.' },
      { title: 'Create from scratch to practise', text: 'Click "+ Create new" to open a blank HTML/CSS/JS editor. Use it to practise a technique you just read about, sketch a UI idea, or experiment with a CSS property you have never tried. No template, no starting code — just a blank canvas with live preview.' },
      { title: 'Revisit and improve', text: 'Click any saved snippet to reopen it in the editor. Edit it, refine it, add dark mode, make it responsive, convert the CSS to variables. Your collection gets better every time you come back.' },
      { title: 'Search your collection', text: 'As your collection grows, use the search bar in My Code to find any snippet by name instantly. Filter by White or Dark theme tags to narrow results.' },
      { title: 'Back up with GitHub Gist', text: 'Click the GitHub icon in the header, paste a personal access token (gist scope), and click Sync Now. Your snippets back up to a private Gist automatically every 3 minutes. Restore on any device with the same token and Gist ID.' },
      { title: 'Export when you need it', text: 'When a snippet is ready for a real project, click "HTML" to download a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind component. "Copy all" puts the full HTML/CSS/JS on your clipboard in one click. Use the [HTML to JSX Converter](https://fwdtools.com/html-to-jsx-converter) if you need to convert existing markup before saving.' },
    ],
  },
  features: [
    'Blank HTML/CSS/JS editor with live preview — create any snippet from scratch, no template needed',
    `Save any of the ${SNIPPET_COUNT}+ library components to your personal collection with one click`,
    'Learn by doing — load, break, edit and re-save any snippet to truly understand how it works',
    'Fully editable — open any saved snippet and modify HTML, CSS, and JS with instant live preview',
    'Complete privacy — everything stored in browser IndexedDB, nothing uploaded to any server, ever',
    'Name snippets anything you want — your own naming, your own organisation system',
    'Search your saved snippets instantly as your collection grows into the hundreds',
    'White / Dark theme tags — filter your collection by snippet colour scheme',
    'CDN support — add any external CSS or JS library (Bootstrap, GSAP, Tailwind, Alpine, Three.js, D3) via CDN URL to any snippet',
    'Syntax highlighting — HTML, CSS, and JS panels all highlight as you type for easier reading and editing',
    'Reset button on each panel — instantly restore any panel to the last saved state without losing other changes',
    'GitHub Gist backup — private Gist, auto-sync every 3 minutes, restore on any device',
    'No account required — your snippets belong to your browser, not to any platform',
    'Export as standalone HTML, React JSX component, or React + Tailwind CSS (no style tag)',
    'Mobile (375px), Tablet (768px), Desktop device preview — test responsiveness as you build',
    'Copy all (HTML + CSS + JS) to clipboard in one click for instant use in any project',
    'Drag-to-resize panels — adjust the split between code and preview to match how you work',
  ],
  useCases: [
    { icon: 'LEARN', title: 'Learn HTML, CSS and JS by saving what you study', desc: 'Every time you learn a new technique — CSS Grid, Flexbox, IntersectionObserver, canvas, clip-path, custom properties — save a working example with your own edits and notes in the name. Build a searchable reference library of everything you have actually learned, not just bookmarked.' },
    { icon: 'CODE', title: 'Practice coding without losing your work', desc: 'Open a blank snippet, practise writing a component from memory, see if it works in the live preview, fix what breaks. Practising is useless if you cannot refer back to what you built. Save every practice session and watch your skills compound over weeks and months.' },
    { icon: 'DESIGN', title: 'Build a personal component library for your projects', desc: 'Adapt library snippets to match your design system and save them under names like "My Button" or "Project Card". Build a growing personal library of ready-to-paste components that are already tuned to how you work — no more rewriting the same patterns from memory on every project.' },
    { icon: 'FLOW', title: 'Capture UI ideas before they disappear', desc: 'Had a quick layout idea mid-task? Open My Code, create a blank snippet, sketch it out in HTML and CSS, and save it. Come back and refine it later. Your experiments are preserved alongside your polished components so nothing is ever lost.' },
    { icon: 'DOC', title: 'Keep a personal reference of patterns that actually work', desc: 'The dropdown that finally worked the way you wanted. The responsive nav you spent an afternoon perfecting. The card hover effect you are proud of. Stop rebuilding these from scratch on every project — save your best version and paste it in seconds next time.' },
    { icon: 'CODE', title: 'Experiment with external libraries using CDN', desc: 'Want to try GSAP, Three.js, Alpine.js, or Chart.js without setting up a project? Add the CDN link to any blank snippet and start experimenting immediately. Your CDN links save with the snippet so your experiment is always ready to continue.' },
    { icon: 'DESIGN', title: 'Test and preview responsive designs instantly', desc: 'Build a layout, then switch between Mobile (375px), Tablet (768px), and Desktop preview modes without leaving the editor. Save the final responsive version to My Code so it is always available as a tested, working starting point for future projects.' },
    { icon: 'LEARN', title: 'Track your learning progress over time', desc: 'As your collection grows from a handful of saved snippets to dozens, it becomes a visible record of everything you have learned. Each snippet is a technique mastered, a concept understood, a problem solved. My Code turns practice into a portfolio of real working code.' },
    { icon: 'FLOW', title: 'Prepare interview and challenge solutions', desc: 'Practising for frontend interviews or CSS challenges? Write your solutions in My Code, save them by topic (e.g. "CSS Centering Methods" or "Debounce Function"), and review them before interviews. Live preview keeps your solutions verified and working at all times.' },
  ],
  faqs: [
    { q: 'Is My Code a good way to learn HTML, CSS and JavaScript?', a: `Yes — learning by reading and modifying real working code is one of the most effective methods. My Code gives you ${SNIPPET_COUNT}+ real components to open, edit, break, and learn from in a live editor. When you understand something, save your version with a descriptive name and build a searchable library of everything you have actually learned.` },
    { q: 'Can I practise writing HTML, CSS and JS from scratch here?', a: 'Yes. Click "+ Create new" to open a completely blank editor with HTML, CSS, and JS panels and a live preview. No starting code, no template. Write a component from memory, practise a technique you just read about, or experiment with a CSS property. Save it when it works.' },
    { q: 'Is My Code private? Will anyone see my snippets?', a: 'Your snippets are stored only in your browser\'s IndexedDB — a local database no one else can access. Nothing is uploaded to any webdevpuneet.com server. No one can see your code. The only external request is the optional GitHub Gist sync, which goes directly from your browser to GitHub\'s API.' },
    { q: 'What happens to my snippets if I clear my browser data?', a: 'Clearing browser data removes your IndexedDB storage. Use GitHub Gist sync to back up your collection — connect a personal access token and your snippets are preserved in a private Gist. Restore them instantly on any device by entering the same token and Gist ID.' },
    { q: 'How do I save a snippet from the library to My Code?', a: 'Open any snippet from the library, customise it in the editor as much as you want, then click "Save as" in the header. Type a name and press Enter. Your edited version is saved to My Code immediately.' },
    { q: 'Can I access my saved snippets on a different device?', a: 'Yes, via GitHub Gist sync. On any device, open My Code, click the GitHub icon, and enter your personal access token and Gist ID. Your full collection restores from the private Gist. No webdevpuneet.com account needed.' },
    { q: 'Is there a limit to how many snippets I can save?', a: 'No hard limit from webdevpuneet.com. The practical limit is your browser\'s IndexedDB quota, typically several hundred megabytes — enough for thousands of text-based code snippets.' },
    { q: 'Can I use My Code to build a component library for my team?', a: 'My Code is designed for personal use — it lives in your browser and is not shareable. For team collaboration, export any snippet as an HTML file, JSX component, or React + Tailwind component and add it to your shared codebase. The GitHub Gist sync is personal and private.' },
    { q: 'Do I need an account or subscription to use My Code?', a: 'No account, no sign-up, no subscription. My Code is completely free. Your snippets live in your browser. The optional GitHub Gist sync requires only a GitHub personal access token, which you can create for free in your GitHub account settings.' },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: SEO.faqs.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'My Code — Personal UI Snippet Space',
  url: 'https://webdevpuneet.com/ui-snippets/mycode/',
  image: OG_IMAGE,
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript and IndexedDB',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: DESC,
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
  featureList: SEO.features,
};

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'How to save, practice and learn HTML CSS JS with My Code',
  description: 'Save snippets from the library or create your own, practise techniques in a live editor, and build a personal collection that stays in your browser.',
  totalTime: 'PT2M',
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
    { '@type': 'ListItem', position: 1, name: 'Home',             item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'UI Snippets',      item: 'https://webdevpuneet.com/ui-snippets/' },
    { '@type': 'ListItem', position: 3, name: 'My Code',          item: 'https://webdevpuneet.com/ui-snippets/mycode/' },
  ],
};

export default function SavedSnippetsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <IndexOnly>
        <AdSlot related={<FrontendPlaygroundsStrip />} />
        <SeoSection {...SEO} slug="ui-snippets" title="My Code — Personal HTML CSS JS Code Space" />
      </IndexOnly>
    </>
  );
}

