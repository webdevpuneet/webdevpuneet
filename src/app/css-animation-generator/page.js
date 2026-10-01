import CssAnimationGeneratorTool from '@/components/CssAnimationGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'CSS Animation Generator — Free, 79 Keyframe Animation Presets | webdevpuneet.com',
  description: 'Free CSS animation generator with 79 presets — adjust duration, easing, fill mode, and direction with live preview. Export CSS, Tailwind, or React.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/css-animation-generator/' },
  icons: { icon: '/icons/css-animation-generator.svg', shortcut: '/icons/css-animation-generator.svg' },
  openGraph: { type: 'website', url: 'https://webdevpuneet.com/css-animation-generator/', siteName: 'webdevpuneet.com', title: 'CSS Animation Generator — 79 Keyframe Presets Online', description: '79 CSS keyframe animations with live preview. Visual cubic-bezier editor. Control duration, easing, fill mode, direction. Export CSS, Tailwind config, or React. Free.', images: [{ url: 'https://webdevpuneet.com/images/css-animation-generator.png', width: 1200, height: 630, alt: 'CSS Keyframe Animation Generator' }], locale: 'en_US' },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: 'CSS Animation Generator — 79 Keyframe Presets', description: '79 CSS animations with visual cubic-bezier editor and live preview. Export CSS, Tailwind config, or React. Free, no sign-up.', images: ['https://webdevpuneet.com/images/css-animation-generator.png'] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I add a CSS animation to an element?', acceptedAnswer: { '@type': 'Answer', text: 'Pick an animation preset, adjust the duration, easing, fill-mode, direction, and iterations, then copy the CSS tab output. It includes the @keyframes block and the animation property — paste both into your stylesheet and apply the generated class name to any element. No JavaScript required.' } },
    { '@type': 'Question', name: 'What is animation-fill-mode and which value should I use?', acceptedAnswer: { '@type': 'Answer', text: '"forwards" is the most common value — it holds the final keyframe state after the animation ends, so an entrance animation like fadeIn leaves the element visible. "none" (default) snaps back to the original style when done, which causes entrance animations to disappear immediately. "backwards" applies the first keyframe state during the delay period. "both" combines forwards and backwards.' } },
    { '@type': 'Question', name: 'How do I make an infinite looping CSS animation?', acceptedAnswer: { '@type': 'Answer', text: 'Set the iteration count to "infinite" in the Iterations control. The exported CSS uses animation-iteration-count: infinite. Use direction: alternate for effects like pulse or bounce to create a back-and-forth oscillation rather than a jarring loop restart.' } },
    { '@type': 'Question', name: 'How do I animate an element when it scrolls into view?', acceptedAnswer: { '@type': 'Answer', text: 'Generate the animation CSS with fill-mode: forwards so the element stays in its end state after the animation completes. Initially set the element\'s visibility: hidden or opacity: 0. Add the animation class via an IntersectionObserver callback when the element enters the viewport. The element will animate in and remain visible.' } },
    { '@type': 'Question', name: 'What is the difference between ease, ease-in, and ease-out?', acceptedAnswer: { '@type': 'Answer', text: 'ease (default) starts and ends slowly with a fast middle. ease-in starts slowly and accelerates — feels like it\'s gaining momentum, good for exit animations. ease-out starts fast and decelerates — feels like it\'s settling in, good for entrance animations (elements feel like they slide into place). ease-in-out is slow at both ends.' } },
    { '@type': 'Question', name: 'How do I export a CSS animation for React?', acceptedAnswer: { '@type': 'Answer', text: 'Switch to the React tab. The output includes the @keyframes block inside a <style> JSX tag and the animation applied via a className with a scoped auto-generated name. Copy and paste into any React component.' } },
    { '@type': 'Question', name: 'How do I animate only on hover?', acceptedAnswer: { '@type': 'Answer', text: 'Copy the generated CSS and apply the animation property only in the :hover selector of your element: `.element:hover { animation: fadeIn 0.3s ease forwards; }`. The animation triggers when the cursor enters the element. Set fill-mode to none so it resets when the cursor leaves.' } },
    { '@type': 'Question', name: 'What is animation-direction and when should I use alternate?', acceptedAnswer: { '@type': 'Answer', text: 'animation-direction controls whether each cycle plays forward or backward. "normal" (default) plays forward every cycle. "reverse" plays backward every cycle. "alternate" plays forward on odd cycles and backward on even cycles — this creates a natural oscillation for effects like pulse, bounce, and swing without a jarring jump back to the start state. "alternate-reverse" starts in reverse. For looping ambient animations (a floating icon, a breathing glow, a bouncing badge), direction: alternate with iteration-count: infinite produces the most natural-looking result.' } },
    { '@type': 'Question', name: 'How do I stagger CSS animations across multiple elements?', acceptedAnswer: { '@type': 'Answer', text: 'Staggered animations use different animation-delay values for each element. Generate the base animation CSS here, then apply it to each element with an increasing delay: the first gets delay: 0s, the second delay: 0.1s, the third delay: 0.2s, and so on. Use CSS custom properties to make this scalable: --i: 0, --i: 1, --i: 2 on each element, then animation-delay: calc(var(--i) * 0.1s). Set fill-mode: backwards so each element stays hidden during its delay period — otherwise all elements will briefly show at their final state before animating.' } },
    { '@type': 'Question', name: 'What does animation-timing-function (easing) actually control?', acceptedAnswer: { '@type': 'Answer', text: 'Easing controls how the animation progresses through its keyframes over time — it sets the acceleration curve. "ease" starts slow, speeds up, then slows down at the end — a natural feel for most UI motion. "linear" moves at a constant rate the entire time — good for spinners and continuous rotation. "ease-in" starts slow and accelerates — suitable for exit animations where elements leave the screen. "ease-out" starts fast and decelerates — best for entrance animations where elements arrive and settle. "ease-in-out" is slow at both ends — ideal for elements that move across the screen from one position to another. For custom curves, use cubic-bezier(x1, y1, x2, y2).' } },
    { '@type': 'Question', name: 'How do I use a CSS animation in Tailwind CSS?', acceptedAnswer: { '@type': 'Answer', text: 'Switch to the Tailwind tab in the export panel. The output uses Tailwind\'s arbitrary value syntax for the animation property: className="[animation:fadeIn_0.5s_ease_forwards]". The @keyframes block still needs to be added to your global CSS — paste it into your globals.css or tailwind.css file. For animations you use frequently, add them to tailwind.config.js under theme.extend.keyframes and theme.extend.animation — then you can use the named class like animate-fadeIn instead of an arbitrary value.' } },
    { '@type': 'Question', name: 'Is a CSS animation better than a CSS transition for UI effects?', acceptedAnswer: { '@type': 'Answer', text: 'Transitions are simpler and better for state changes triggered by interaction — hover, focus, active. They interpolate between two states (before and after) automatically when the property changes. Animations with @keyframes are better for sequences that run on load, scroll triggers, or need multiple steps between start and end — like a bounce that overshoots, a shake with multiple oscillations, or a multi-step entrance that fades in and slides up simultaneously. Transitions require a state change to trigger; animations can start automatically and repeat independently of user interaction.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CSS Keyframe Animation Generator',
  url: 'https://webdevpuneet.com/css-animation-generator/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free CSS keyframe animation generator with 79 presets, visual cubic-bezier editor, live preview, and CSS/Tailwind/React export.',
  featureList: ['79 animation presets', 'Search and favorites with localStorage persistence', 'Visual cubic-bezier curve editor', 'Preview element picker (box/button/text/card)', 'Slow-motion preview (¼×/½×/1×) and dark background toggle', 'Stagger×3 preview with cascading delays', 'Edit @keyframes with live preview', 'Download as .css/.js/.jsx', 'Export CSS @keyframes, Tailwind tailwind.config.js, React inline style'],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'CSS Animation Generator', item: 'https://webdevpuneet.com/css-animation-generator/' },
  ],
};

const SEO = {
  slug: 'css-animation-generator',
  title: 'CSS Keyframe Animation Generator — 79 Animation Presets',

  about: {
    title: 'Pick a CSS Animation, Tweak the Settings, Copy the @keyframes Code',
    description: `Writing \`@keyframes\` by hand and tweaking timing, easing, and fill-mode in DevTools is slow. This tool gives you 79 ready-made animation presets — click one, adjust the controls, watch it preview live, and copy the complete CSS block in one click.\n\nEvery animation exposes the full set of CSS \`animation\` properties: duration, delay, easing (ease, linear, ease-in/out, or a custom cubic-bezier curve you design in the visual editor), fill-mode (none, forwards, backwards, both), direction (normal, reverse, alternate, alternate-reverse), and iteration count (any number or infinite). The preview replays whenever you change a setting — or click Replay to restart manually.\n\nFill-mode is the setting people get wrong most often: without \`forwards\`, the browser snaps the element back to its pre-animation style the instant the last keyframe finishes, so an entrance animation like fadeIn appears to flash and vanish. Setting \`animation-fill-mode: forwards\` holds the final keyframe's computed values in place after the animation ends, which is why every entrance preset here defaults to it. Easing works underneath as a cubic-bezier curve — a mathematical function mapping elapsed time to animation progress — and the visual editor lets you drag its two control handles rather than guessing coordinate values; \`ease-out\` front-loads the motion and decelerates into the resting frame, which reads as a natural arrival, while \`linear\` holds constant velocity and suits spinners where any deceleration would look like stuttering. Because \`animation\` and \`transform\`-based keyframes run on the compositor thread, they keep animating smoothly even while JavaScript is busy elsewhere on the page, unlike properties that trigger layout.\n\nThe 79 presets span entrances, exits, attention-seekers, and ambient effects: **fade in/out**, **slide** (6 directions), **bounce** (in/out), **scale** (up/down), **flip** (4 axes), **zoom** (in, in-down, in-left, in-right), **shake**, **pulse**, **glitch**, **neon-pulse**, **rubber-band**, **jello**, **wobble**, **swing**, **heartbeat**, **float**, **levitate**, **orbit**, **spiral**, **vortex**, **cinematic**, **spotlight**, **crash-in**, **ricochet**, **shockwave**, **door-open**, **peel**, **wipe-right**, and more. Export as raw **CSS** \`@keyframes\` + \`animation\` property, a **Tailwind** \`tailwind.config.js\` snippet, or a **React** inline-style snippet.`,
  },

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Search and pick an animation preset',
        text: 'Type in the search box at the top of the sidebar to filter the 79 presets by name, or scroll and click any preset to load it. Star any animation with the ☆ icon to pin it to your Favorites section at the top — favorites are saved across sessions.',
      },
      {
        title: 'Set Duration and Delay',
        text: 'Use the Duration slider to control how long one cycle takes — 0.2–0.4s for snappy UI feedback, 0.8–1.2s for ambient loops. Set Delay if you want the animation to pause before starting, useful when timing sequences across multiple elements.',
      },
      {
        title: 'Choose an Easing function',
        text: 'Pick from ease, linear, ease-in, ease-out, or ease-in-out. For a custom timing curve, click the cubic-bezier button to open the visual Bezier editor — drag the two control handles to shape the curve and see the generated cubic-bezier() value update live.',
      },
      {
        title: 'Configure Fill Mode, Direction, and Iterations',
        text: 'Set Fill Mode to "forwards" for entrance animations so the element stays visible after finishing. Set Direction to "alternate" and Iterations to "infinite" for natural back-and-forth ambient loops like float, pulse, or sway. Use a finite iteration count (2–3) for attention animations like shake or heartbeat.',
      },
      {
        title: 'Preview with element picker, slow-motion, stagger, and dark background',
        text: 'Switch the preview element between box, button, text, and card to see the animation on something closer to your real UI. Toggle ¼× or ½× speed to study the easing curve in slow motion. Enable Stagger×3 to see three elements animate with increasing delays — the most common real-world usage pattern. Toggle Dark BG to check neon, glow, and spotlight animations on a dark background.',
      },
      {
        title: 'Edit the @keyframes directly',
        text: 'Click the Edit KF tab in the code area to open an editable textarea seeded with the current @keyframes block. Modify any percentage stop, property, or value — the live preview updates immediately and the export uses your custom keyframes. Resets automatically when you switch to a different preset.',
      },
      {
        title: 'Copy or download the output',
        text: 'Switch between the CSS, Tailwind, and React export tabs. CSS gives the @keyframes block plus the animation shorthand property. Tailwind gives a tailwind.config.js snippet with theme.extend.keyframes and an animate-* class ready to use. React gives the animation as an inline style string plus the keyframes to paste into a global stylesheet. Click Copy to copy to clipboard, or ↓ DL to download as a .css, .js, or .jsx file.',
      },
    ],
  },

  features: [
    '79 CSS keyframe animation presets — fade, slide, bounce, flip, zoom, glitch, neon flicker, cinematic, shockwave, and more',
    'Search bar to filter presets by name; star any animation to pin it to a persistent Favorites section',
    'Duration and delay controls in seconds with decimal precision',
    'Easing selector — ease, linear, ease-in/out, ease-in-out, plus visual cubic-bezier curve editor with draggable handles; fine-tune timing with our [CSS Easing Generator](/css-easing-generator)',
    'Fill-mode, direction, and iteration count controls — covers every animation property',
    'Preview element picker — box, button, text paragraph, or card UI element',
    'Slow-motion preview at ¼× and ½× speed; dark background toggle for neon and glow effects; Stagger×3 shows three elements with cascading delays',
    'Edit @keyframes tab — editable textarea with live preview updates; reset to preset with one click',
    'Export as CSS @keyframes + animation property, Tailwind tailwind.config.js snippet, or React inline style; animate SVG icons with our [SVG Animation Generator](https://fwdtools.com/svg-animation-generator/)',
    'Download as .css, .js, or .jsx file; 100% client-side — no data sent to any server; build loaders with our [CSS Loader Generator](/css-loader-generator)',
  ],

  useCases: [
    {
      icon: '⚡',
      title: 'Animate a modal, toast, or dropdown entrance',
      desc: 'Pick slideInUp or fadeIn, set duration to 0.2–0.3s, fill-mode to forwards. The element appears smoothly rather than snapping in abruptly. Copy the CSS and apply the class when the element mounts. Add glassmorphism styling to the modal with our [Glassmorphism Generator](/glassmorphism-generator).',
    },
    {
      icon: '▦',
      title: 'Reveal elements as the user scrolls',
      desc: 'Generate the CSS for a fadeIn or slideInUp with fill-mode: forwards — so elements stay visible after the animation ends. Trigger the class via IntersectionObserver or a CSS scroll-driven animation when the element enters the viewport.',
    },
    {
      icon: '◎',
      title: 'Create a loading spinner or skeleton shimmer',
      desc: 'Use spin or pulse with animation-iteration-count: infinite. Duration of 0.8–1.2s creates a natural loading rhythm. Copy the CSS and apply it to any spinner icon or skeleton element.',
    },
    {
      icon: '✦',
      title: 'Draw attention to an error state or notification badge',
      desc: 'Shake works for form validation errors. Flash or heartbeat works for badges and alerts. Set iterations to 2–3 rather than infinite — enough to catch attention without being annoying.',
    },
    {
      icon: '⚙',
      title: 'Add personality to empty states or landing page illustrations',
      desc: 'Apply bounce or swing to an SVG icon with direction: alternate and iteration: infinite for a natural back-and-forth oscillation. The alternate direction avoids the jarring jump of a standard looping animation. Use our [Animated SVG Icons](https://fwdtools.com/animated-svg-icons/) collection for ready-made animated icon options.',
    },
    {
      icon: '≡',
      title: 'Get a Tailwind animation class or React snippet without writing @keyframes',
      desc: 'The Tailwind tab generates the animation as an arbitrary value class for direct use in className. The React tab generates a complete JSX snippet with the @keyframes block embedded in a style tag — paste into any component.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function CssAnimationGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><CssAnimationGeneratorTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
