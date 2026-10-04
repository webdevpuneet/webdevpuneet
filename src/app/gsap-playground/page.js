import GsapPlaygroundTool from '@/components/GsapPlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'GSAP Playground — Learn GSAP Visually, 55 Lessons Free | webdevpuneet.com',
  description: 'Learn GSAP animation online with 55 interactive lessons — gsap.to(), timelines, stagger, ScrollTrigger, and plugins. Live preview, free, no install.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/gsap-playground/' },
  icons: { icon: '/icons/gsap-playground.svg', shortcut: '/icons/gsap-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/gsap-playground/',
    siteName: 'webdevpuneet.com',
    title: 'GSAP Playground - Learn GSAP Animation Interactively',
    description: 'Edit GSAP code and see animations play instantly. 55 lessons across 18 chapters covering tweens, timelines, stagger, ScrollTrigger, keyframes, gsap.utils, responsive animation, official GSAP plugins, and real UI patterns.',
    images: [{ url: 'https://webdevpuneet.com/images/gsap-playground.png', width: 1200, height: 630, alt: 'GSAP Animation Playground' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'GSAP Playground - Learn GSAP Animation Interactively',
    description: 'Free interactive GSAP playground with 55 lessons across 18 chapters. Live editor, instant visual preview, no install.',
    images: ['https://webdevpuneet.com/images/gsap-playground.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Do I need to install GSAP to use this playground?', acceptedAnswer: { '@type': 'Answer', text: 'No. The playground loads GSAP and official plugin files from the local project bundle inside a sandboxed iframe. You write animation code in the editor and see the result instantly — no Node.js, npm, CDN request, or build step required.' } },
    { '@type': 'Question', name: 'What GSAP features does this playground cover?', acceptedAnswer: { '@type': 'Answer', text: 'The 55 lessons cover gsap.to(), gsap.from(), gsap.fromTo(), duration and delay, transforms, opacity, CSS properties, eases, timelines, stagger, callbacks, ScrollTrigger, keyframes, gsap.utils, responsive patterns, reduced motion, interaction plugins, text plugins, SVG plugins, physics plugins, helper plugins, and renderer integration notes.' } },
    { '@type': 'Question', name: 'Which GSAP version does this playground use?', acceptedAnswer: { '@type': 'Answer', text: 'The playground uses the installed GSAP 3 package and loads gsap.min.js plus official plugin files from the local public bundle. Available plugin globals are registered automatically before lesson code runs.' } },
    { '@type': 'Question', name: 'How do I replay an animation?', acceptedAnswer: { '@type': 'Answer', text: 'Click the green Replay button in the preview pane header. This kills all current GSAP tweens, resets element styles, and re-executes the current code — so you can watch the animation from the beginning as many times as you want.' } },
    { '@type': 'Question', name: 'Can I use this playground as a free GSAP sandbox?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Clear the editor and write your own GSAP code — the pre-built elements (.box, .heading, .subtitle, .btn, .card, #scroll-box) are always available as animation targets. The Replay button restarts your animation at any time.' } },
    { '@type': 'Question', name: 'Do I need a GSAP Club membership for the features covered?', acceptedAnswer: { '@type': 'Answer', text: 'No. GSAP made the formerly Club-only plugins free, and this playground now includes official plugin files from the installed GSAP package, including SplitText, MorphSVG, DrawSVG, Draggable, InertiaPlugin, ScrollSmoother, and ScrambleTextPlugin.' } },
    { '@type': 'Question', name: 'Should I know JavaScript before learning GSAP?', acceptedAnswer: { '@type': 'Answer', text: 'Basic JavaScript is helpful — you should understand variables, functions, objects, and arrow functions. GSAP itself is straightforward to start with (gsap.to() is just a function call), but you will encounter callbacks, method chaining, and setTimeout patterns as lessons progress. Use the JavaScript Playground to build JavaScript foundations first if needed.' } },
    { '@type': 'Question', name: 'How do ScrollTrigger lessons work in this playground?', acceptedAnswer: { '@type': 'Answer', text: 'ScrollTrigger lessons use #scroll-box, an element placed below the main demo area. Scroll down in the preview iframe to see the trigger activate. The scrub and pin lessons work the same way — scroll in the preview pane to drive the animation.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'GSAP Playground',
  url: 'https://webdevpuneet.com/gsap-playground/',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires a modern browser with JavaScript enabled',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Interactive GSAP animation learning tool with 55 lessons across 18 chapters, live code editor, instant visual preview, Replay button, and structured curriculum covering tweens, timelines, ScrollTrigger, keyframes, gsap.utils, responsive animation, official GSAP plugins, and animation patterns.',
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'GSAP Playground', item: 'https://webdevpuneet.com/gsap-playground/' },
  ],
};

const SEO = {
  slug: 'gsap-playground',
  title: 'GSAP Playground — Learn Web Animation from Tweens to ScrollTrigger',
  subtitle: 'A free interactive GSAP playground with 55 guided lessons across 18 chapters, a live JavaScript editor, instant visual preview, and a Replay button. Learn gsap.to(), timelines, stagger, ScrollTrigger, keyframes, gsap.utils, responsive animation, official GSAP plugins, and real animation patterns with no install and no setup.',
  sections: [
    {
      type: '2col',
      left: {
        type: 'text',
        label: 'About this tool',
        heading: 'Learn GSAP by Writing Code and Watching Animations Play',
        text: `GSAP (GreenSock Animation Platform) is the industry-standard JavaScript animation library — used by Google, Nike, Awwwards winners, and countless production websites. It's fast, reliable, and works in every browser. But learning it by reading documentation alone is slow because the key insight is seeing what each property and method does, not just understanding the syntax.

This GSAP Playground puts a live code editor next to a visual preview. Write gsap.to(".box", { x: 200 }), watch the box move, edit the duration, change the ease, add a second tween, build a timeline — and see every change play out immediately. A Replay button resets all animations and runs your code from the beginning whenever you want to watch it again.

The 55 structured lessons are organized into 18 chapters. Each lesson starts with a concept explanation, loads a working code example into the editor, and gives you pre-built demo elements to animate against. Picker lessons show multiple variants of the same concept so you can compare ease types, stagger directions, position parameters, utility helpers, responsive patterns, or plugin workflows by switching between them without rewriting code.`,
      },
      right: {
        type: 'features',
        heading: 'What You Can Practice',
        items: [
          { title: 'Live GSAP editor', text: 'Write GSAP code and see animations play instantly. The preview auto-updates as you type, with a 400ms debounce so the animation waits for you to stop.' },
          { title: 'Replay button', text: 'Click Replay at any time to kill all running tweens, reset element styles, and re-execute your code from the start.' },
          { title: 'Pre-built demo elements', text: 'Boxes, heading, subtitle, button, cards, and a scroll section are always available in the preview — just target them with GSAP selectors.' },
          { title: '55 structured lessons', text: 'From gsap.to() basics through timelines, stagger, ScrollTrigger, keyframes, gsap.utils, responsive animation, official plugins, and real UI animation patterns.' },
          { title: 'Official plugin bundle', text: 'Draggable, Observer, SplitText, TextPlugin, ScrambleText, DrawSVG, MorphSVG, Inertia, physics plugins, helpers, and renderer plugins are available from local GSAP files.' },
          { title: 'Progress saved locally', text: 'Completed lessons are saved in localStorage. No account needed — return to the same lesson later.' },
        ],
      },
    },
    {
      type: 'table',
      heading: 'What the GSAP Lessons Cover',
      columns: ['Chapter', 'Lessons', 'What You Learn'],
      rows: [
        ['Getting Started', '4 lessons', 'gsap.to(), gsap.from(), gsap.fromTo(), duration and delay.'],
        ['Properties', '4 lessons', 'x/y transform, rotation, scale, opacity, autoAlpha, and animating CSS properties and colours.'],
        ['Easing', '3 lessons', 'Power eases (in/out/inOut), bounce, elastic, back, steps, and linear.'],
        ['Timelines', '4 lessons', 'gsap.timeline(), position parameter (<, -=, +=), defaults, and play/pause/reverse/restart controls.'],
        ['Stagger', '2 lessons', 'Basic stagger timing and stagger from (start, end, center).'],
        ['Repeat & Yoyo', '2 lessons', 'repeat, repeatDelay, and yoyo for looping and ping-pong animations.'],
        ['Callbacks', '2 lessons', 'onComplete, onStart, and onUpdate — reading tween progress in real time.'],
        ['ScrollTrigger', '4 lessons', 'trigger and toggleActions, toggleClass, scrub for scroll-linked animation, and pin for scroll-driven storytelling.'],
        ['Keyframes', '2 lessons', 'Array keyframes for sequential states and percent keyframes for CSS-@keyframes-style control.'],
        ['Real Patterns', '4 lessons', 'Card reveal, hero entrance, pulsing loader, and animated number counter.'],
        ['GSAP Utils', '2 lessons', 'gsap.utils helpers for mapping, clamping, wrapping, interpolation, arrays, and reusable animation utilities.'],
        ['Responsive', '2 lessons', 'matchMedia patterns, reduced motion handling, and responsive animation changes.'],
        ['Plugins', '5 lessons', 'All-plugin availability plus CustomEase, ScrollToPlugin, MotionPathPlugin, and Flip workflows.'],
        ['Interaction Plugins', '3 lessons', 'Draggable, Observer, and InertiaPlugin for pointer, gesture, and momentum interactions.'],
        ['Text Plugins', '3 lessons', 'SplitText, TextPlugin, and ScrambleTextPlugin for kinetic text and typewriter effects.'],
        ['SVG Plugins', '3 lessons', 'DrawSVGPlugin, MorphSVGPlugin, and CSSRulePlugin for SVG and pseudo-element animation.'],
        ['Physics & Ease Plugins', '3 lessons', 'CustomBounce, CustomWiggle, Physics2DPlugin, PhysicsPropsPlugin, and EasePack.'],
        ['Helper & Integration Plugins', '3 lessons', 'ScrollSmoother, MotionPathHelper, GSDevTools, PixiPlugin, and EaselPlugin usage patterns.'],
      ],
    },
    {
      type: 'text',
      heading: 'Why GSAP Is Worth Learning',
      text: `CSS transitions and CSS animations handle simple state changes well. But when animations need to be sequenced, controlled by user input, driven by scroll position, synced to data, or reversed programmatically, CSS becomes difficult to manage. GSAP was built exactly for these situations.

A GSAP timeline lets you chain 10 animations and control the entire sequence with one \`.play()\` or \`.reverse()\` call. ScrollTrigger links any animation to scroll position with two lines of configuration. The stagger system turns one tween call into a cascading animation across dozens of elements. These are things that would require significant custom JavaScript to replicate in CSS.

GSAP is also consistent across browsers and handles edge cases that trip up CSS transitions — such as animating from a partially-completed state, reversing mid-tween, or compositing multiple transform properties. Once you understand the core methods (to, from, fromTo, timeline, stagger) you can read almost any GSAP code and quickly produce production-quality animation.

Learning here gives you a fast feedback loop: write the code, hit Replay, adjust a number, Replay again. That iteration speed makes the relationship between code and motion intuitive in a way that reading the GSAP documentation alone cannot replicate.`,
    },
    {
      type: 'steps',
      heading: 'How to Use the GSAP Playground',
      items: [
        { title: 'Start with gsap.to()', text: 'The first lesson is intentionally small. Change the x value, change the duration, add a second property — watch each edit play out.' },
        { title: 'Use the Replay button freely', text: 'GSAP animations play once by default. Click Replay whenever you want to watch the animation from the beginning without reloading the page.' },
        { title: 'Switch between Picker variants', text: 'Ease and position parameter lessons show multiple options. Click each variant to load that code and see exactly how power2.in differs from power2.out.' },
        { title: 'Scroll in the preview for ScrollTrigger lessons', text: 'ScrollTrigger lessons target #scroll-box below the main demo area. Scroll down inside the preview pane to trigger, scrub, or pin the animation.' },
        { title: 'Edit the demo elements freely', text: 'The pre-built .box, .heading, .subtitle, .btn, and .card elements are just starting points. Target them differently, add more tweens, or modify properties not in the lesson.' },
        { title: 'Apply the Real Patterns to your own projects', text: 'The final chapter covers card reveal, hero entrance, pulsing loader, and animated counter. These are ready to copy and adapt — just change the selectors and values to match your markup.' },
      ],
    },
    {
      type: 'cards',
      heading: 'Who This GSAP Playground Is For',
      columns: 3,
      items: [
        { icon: '🎬', title: 'JavaScript developers new to GSAP', desc: 'If you know basic JavaScript but have never written a GSAP animation, the Getting Started chapter gets you moving elements in minutes.' },
        { icon: '🎨', title: 'Designers who write code', desc: 'Experiment with ease types, stagger timing, and timeline sequencing to build intuition for motion design before putting it into a project. For pure-CSS motion without JavaScript, browse the [CSS animation generator](/css-animation-generator/).' },
        { icon: '⚛️', title: 'React developers adding animation', desc: 'Learn GSAP fundamentals here, then apply them in React using useRef and useEffect — the same core API works in any framework.' },
        { icon: '📜', title: 'Scroll animation learners', desc: 'The ScrollTrigger chapter teaches trigger, scrub, and pin — the three most useful scroll animation tools for portfolio and marketing sites.' },
        { icon: '🚀', title: 'Developers polishing UIs', desc: 'Pick up card reveal, stagger, and timeline patterns quickly and drop them into production-ready components.' },
        { icon: '🏫', title: 'Teachers and workshop instructors', desc: 'Load a lesson, explain the concept, edit a value live, and hit Replay. Students see the animation change in real time.' },
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      heading: 'Suggested Learning Order',
      text: `If you are new to JavaScript, start with the [JavaScript Playground](/js-playground/) to get comfortable with functions, objects, and callbacks. Then use this GSAP Playground to learn animation. After GSAP, the [React Playground](/react-playground/) shows how to integrate animation into component-based UIs using useRef and useEffect with GSAP's context cleanup.`,
    },
    {
      type: 'faq',
      heading: 'Frequently Asked Questions',
      items: [
        { q: 'Do I need to install GSAP to use this playground?', a: 'No. The playground loads GSAP and official plugin files from the local project bundle inside a sandboxed iframe. You write animation code and see the result instantly — no Node.js, npm, CDN request, or build step required.' },
        { q: 'What GSAP features are covered?', a: 'The 55 lessons cover gsap.to(), gsap.from(), gsap.fromTo(), duration, delay, x/y, rotation, scale, opacity, CSS properties, eases, timelines, stagger, callbacks, ScrollTrigger, keyframes, real animation patterns, gsap.utils, responsive animation, reduced motion, and official plugin workflows across interaction, text, SVG, physics, helper, and renderer categories.' },
        { q: 'Which GSAP version is loaded?', a: 'The playground loads GSAP 3 from the installed package, with official plugin files copied into the local public bundle. Available plugin globals are registered automatically before lesson code runs.' },
        { q: 'How do I replay an animation?', a: 'Click the green Replay button in the preview pane. It kills all current GSAP tweens, clears inline styles from the demo elements, and re-executes your code from scratch.' },
        { q: 'Can I write my own GSAP code beyond the lessons?', a: 'Yes. Clear the editor and write anything. The pre-built elements (.box, .heading, .subtitle, .btn, .card, #scroll-box) are always present in the preview as animation targets.' },
        { q: 'Do I need a GSAP Club membership?', a: 'No. GSAP made the formerly Club-only plugins free, and this playground now includes official plugin files from the installed GSAP package, including MorphSVG, SplitText, DrawSVG, Draggable, ScrollSmoother, InertiaPlugin, and more.' },
        { q: 'Should I know JavaScript before GSAP?', a: 'Basic JavaScript helps — understanding variables, functions, objects, and arrow functions makes the lessons easier. GSAP itself is approachable, but the callbacks and method chaining in the later chapters assume some comfort with JavaScript.' },
        { q: 'How do ScrollTrigger lessons work in the preview?', a: 'The preview iframe has a scroll zone below the main demo elements. Scroll down inside the preview pane to activate the ScrollTrigger. For scrub lessons, scroll slowly to drive the animation frame by frame.' },
      ],
    },
  ],
  faqs: [
    { q: 'Do I need to install anything?', a: 'No. GSAP and its plugin files load from the local project bundle inside the sandboxed preview. No npm, no build step.' },
    { q: 'How do I replay an animation?', a: 'Click the green Replay button in the preview header to reset all tweens and re-run the code.' },
    { q: 'Which GSAP version is used?', a: 'GSAP 3 from the installed package, with available official plugins registered automatically.' },
    { q: 'Can I write my own GSAP animations?', a: 'Yes — clear the editor and write anything. Pre-built .box, .card, .heading, and .btn elements are always available in the preview.' },
    { q: 'Do I need a GSAP Club license?', a: 'No. The formerly Club-only plugins are now free, and this playground includes official plugin files from the installed package.' },
  ],
};

export default function GsapPlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}>
        <GsapPlaygroundTool />
      </div>
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
