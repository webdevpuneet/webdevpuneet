import CssEasingGeneratorTool from '@/components/CssEasingGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'CSS Easing Generator — Cubic-Bezier Editor Free | webdevpuneet.com',
  description: 'Visual cubic-bezier easing generator — drag handles to create custom timing functions and preview live animations. 27 presets. Free, copy CSS instantly.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/css-easing-generator/' },
  icons: { icon: '/icons/css-easing-generator.svg', shortcut: '/icons/css-easing-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/css-easing-generator/',
    siteName: 'webdevpuneet.com',
    title: 'CSS Easing Generator — Cubic-Bezier Editor with 27 Presets',
    description: 'Drag handles to build custom CSS cubic-bezier curves. Live animation preview, 27 named presets, copy transition/animation snippets instantly. Free online tool.',
    images: [{ url: 'https://webdevpuneet.com/images/css-easing-generator.png', width: 1200, height: 800, alt: 'CSS Easing Generator — Cubic-Bezier Editor Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'CSS Easing Generator — Cubic-Bezier Editor & 27 Presets',
    description: 'Visual cubic-bezier editor with live animation preview. 27 presets including Back, Expo, Circ easings. Copy CSS instantly. Free online.',
    images: ['https://webdevpuneet.com/images/css-easing-generator.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is CSS cubic-bezier() and how do I use it?',
      acceptedAnswer: { '@type': 'Answer', text: 'cubic-bezier() is a CSS timing function that controls how an animation or transition progresses over time. The syntax is cubic-bezier(x1, y1, x2, y2) — four values defining two control points of a curve. The x-axis is time (0 = start, 1 = end), the y-axis is progress. By adjusting the control points you create slow starts, fast endings, overshoots, and spring effects. Use it as the timing-function in transition or animation: transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1).' },
    },
    {
      '@type': 'Question',
      name: 'Which CSS easing should I use for UI animations?',
      acceptedAnswer: { '@type': 'Answer', text: 'For elements entering the screen, use ease-out or easeOutCubic — they decelerate naturally as the element arrives. For elements leaving, use ease-in (they accelerate out). For modals, drawers, and cards that pop open, easeOutBack adds a subtle spring-settle. For hover effects and micro-interactions, easeInOutSine or easeInOutQuad are smooth without being dramatic. Avoid linear except for continuous loops — any natural motion has acceleration and deceleration.' },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between ease-in, ease-out, and ease-in-out?',
      acceptedAnswer: { '@type': 'Answer', text: 'ease-in starts slow and ends fast — best for elements exiting (they accelerate as they leave). ease-out starts fast and ends slow — best for elements entering (they decelerate as they arrive, feeling natural). ease-in-out starts slow, speeds up in the middle, slows down at end — good for elements moving between two on-screen positions. linear moves at constant speed — only use for loops where natural deceleration creates visible jitter at the restart point.' },
    },
    {
      '@type': 'Question',
      name: 'How do I create a spring or bounce effect in CSS?',
      acceptedAnswer: { '@type': 'Answer', text: 'Use easeOutBack — it briefly overshoots the end state before settling back, creating a spring-like feel. The cubic-bezier values are approximately (0.34, 1.56, 0.64, 1). The overshoot happens because Y2 is above 1, meaning the animation temporarily exceeds its end value. Y values outside [0, 1] are valid in CSS cubic-bezier. For a stronger spring, increase Y2 further; for a subtler one, reduce it toward 1.' },
    },
    {
      '@type': 'Question',
      name: 'How do I use cubic-bezier in a CSS transition?',
      acceptedAnswer: { '@type': 'Answer', text: 'Use cubic-bezier() as the timing-function value in the transition shorthand: transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); Or as individual properties: transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); transition-duration: 0.3s; This tool generates a complete ready-to-paste transition line in the CSS output — click the copy icon next to it.' },
    },
    {
      '@type': 'Question',
      name: 'Can I use cubic-bezier in CSS @keyframes animations?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Apply it as animation-timing-function: animation: slide 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); You can also set different timing functions between individual keyframe steps — place animation-timing-function inside keyframe step blocks (0%, 50%, 100%) to create multi-phase motion with different acceleration curves in each phase.' },
    },
    {
      '@type': 'Question',
      name: 'Can I use the cubic-bezier values in GSAP, Framer Motion, or Anime.js?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Most JS animation libraries accept cubic-bezier values as arrays or strings. GSAP uses CustomEase or accepts [x1, y1, x2, y2] arrays. Framer Motion accepts cubic-bezier strings in transition.ease. Anime.js accepts cubic-bezier arrays. The four coordinate values are shown in the X1 Y1 X2 Y2 inputs in this tool — copy them directly.' },
    },
    {
      '@type': 'Question',
      name: 'Why do Y1 and Y2 go below 0 or above 1 in some presets?',
      acceptedAnswer: { '@type': 'Answer', text: 'CSS cubic-bezier allows Y values outside [0, 1], which creates overshoot effects. A Y2 above 1 means the animation temporarily exceeds its end state before snapping back — the "Back" spring effect. A Y1 below 0 creates an undershoot. X values are constrained to [0, 1] because they represent time (time cannot reverse). The Back presets use values like Y1=-0.56, Y2=1.56 for their characteristic spring overshoot.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CSS Easing Generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Visual CSS cubic-bezier easing generator with draggable curve editor, live animation preview, 27 presets, and CSS output snippets.',
  url: 'https://webdevpuneet.com/css-easing-generator/',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'CSS Easing Generator', item: 'https://webdevpuneet.com/css-easing-generator/' },
  ],
};

const seoData = {
  slug: 'css-easing-generator',
  title: 'CSS Easing Generator — Cubic-Bezier Editor',
  about: {
    title: 'Pick the Right CSS Easing for Your Animation — Preview It Live, Then Copy the cubic-bezier()',
    description: `Your modal slides in but feels wrong — too mechanical, or it overshoots and feels too bouncy. You know you need a different easing function, but picking the right \`cubic-bezier()\` values by guessing numbers is tedious. Use this visual editor: drag the handles, watch the ball animate in real time, and copy the value when it feels right.\n\nThe curve editor visualizes exactly how your element will accelerate and decelerate. Moving the P1 handle up makes the start faster; moving P2 below the baseline creates an overshoot (spring-like "Back" effect). The animation preview replays automatically with every change. Copy the raw \`cubic-bezier()\` value, or grab a ready-to-paste \`transition\` or \`animation\` CSS line from the output panel.\n\nA cubic-bezier curve is defined by two control points, \`cubic-bezier(x1, y1, x2, y2)\`, plotted against an x-axis representing elapsed time and a y-axis representing animation progress; the browser evaluates this curve every frame to decide how far along the animation should be. The x-coordinates are clamped to 0–1 because time can't run backward, but the y-coordinates here range from -1.5 to 2.5 — CSS explicitly allows progress values outside 0–1, which is how the "Back" family produces its spring feel: a y2 above 1 makes the element temporarily overshoot its final position before the curve pulls it back down to exactly 1, and a y1 below 0 does the same thing in reverse for an undershoot at the start. This is fundamentally different from framework spring physics (mass, tension, friction), which are simulated frame-by-frame rather than expressed as a fixed function of time — cubic-bezier always produces the same curve shape regardless of distance or duration, so a spring library is the better choice when you need the animation to feel physically consistent across wildly different travel distances.\n\n27 presets covering the full Penner easing library: Sine, Quad, Cubic, Quart, Quint, Expo, Circ, and Back — each with easeIn, easeOut, and easeInOut variants — plus the 5 standard CSS keywords. For most UI animations, start with **easeOutCubic** for elements entering and **easeInCubic** for elements leaving. Use **easeOutBack** for a satisfying spring-settle effect on modals and cards.`,
  },
  features: [
    '**Draggable SVG curve editor** — move P1 and P2 handles directly on the bezier curve',
    '**Live animation preview** — ball replays automatically on every easing change',
    '**27 presets** — all Penner easing families (Sine, Quad, Cubic, Quart, Quint, Expo, Circ, Back), ready to pair with the [CSS transform generator](/css-transform-generator)',
    '**5 CSS keywords** — linear, ease, ease-in, ease-out, ease-in-out built-in',
    '**Numeric coordinate inputs** — type exact X1 Y1 X2 Y2 values with validation',
    '**Y overshoot support** — Y range [-1.5, 2.5] for Back and spring-style easings',
    '**Duration slider** — 0.3s to 3.0s preview and output duration control',
    '**Three CSS outputs** — cubic-bezier value, transition shorthand, animation shorthand',
    '**One-click copy** — copy any output line instantly with visual confirmation',
    '**cbValue in header** — always-visible cubic-bezier string with global copy button',
  ],
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Drag the curve handles', text: 'The SVG curve editor shows two draggable handles. The purple handle (P1) controls the early phase of the motion — drag it up to make the start faster, down to make it slower. The lighter purple handle (P2) controls the late phase — drag it below the baseline to create an overshoot (the spring-like Back effect). The curve updates immediately and the animation ball replays automatically.' },
      { title: 'Pick a named preset', text: 'Scroll the Presets panel on the left and click any named easing. Presets are grouped by family: CSS Standard (linear, ease, ease-in, ease-out, ease-in-out), Sine, Quad, Cubic, Quart, Quint, Expo, Circ, and Back — each with easeIn, easeOut, and easeInOut variants. For everyday UI work, start with easeOutCubic for entering elements and easeInCubic for exiting ones.' },
      { title: 'Fine-tune with numeric inputs', text: 'Type exact values into the X1, Y1, X2, Y2 numeric inputs below the curve editor. X values are clamped to 0–1 (time cannot go backward). Y values can range from −1.5 to 2.5 — values outside [0, 1] create undershoot or overshoot effects. The Back presets use Y values like −0.56 and 1.56 for their spring feel.' },
      { title: 'Adjust the preview duration', text: 'Use the Duration slider (0.3–3.0s) in the preview section to match your real animation\'s speed. Click the ▶ play button to replay the animation at any time. Shorter durations reveal whether fast easings feel snappy or abrupt; longer durations show if slow easings feel smooth or sluggish.' },
      { title: 'Copy the CSS output', text: 'Click the ⎘ copy icon next to any of the three output rows: the raw cubic-bezier() value, a complete transition shorthand line, or a complete animation shorthand line. The cubic-bezier value is also displayed in the header with its own global Copy button for quick access.' },
    ],
  },
  useCases: [
    { icon: '🎨', title: 'Make a modal, drawer, or tooltip feel natural on open and close', desc: 'easeOutCubic or easeOutQuart for entering (decelerates to a natural stop). easeInCubic for leaving (accelerates out). easeOutBack adds a subtle spring-settle without feeling excessive. Apply the curve to full keyframe animations in the [CSS animation generator](/css-animation-generator) or [GSAP playground](/gsap-playground).' },
    { icon: '⚡', title: 'Add a satisfying spring effect to a button or toggle switch', desc: 'easeOutBack briefly overshoots the end state before snapping back — creating a tactile click feel. Adjust the duration to 0.2–0.3s for button presses to keep it snappy.' },
    { icon: '📱', title: 'Build smooth page slide transitions for a Next.js or SPA app', desc: 'easeOutExpo or easeInOutCubic — elements slide in fast and settle gently. Set duration to 0.4–0.5s. Avoid linear (mechanical) and ease-in-out (too slow to start for entering elements).' },
    { icon: '🔄', title: 'Create a skeleton loader or pulse animation that feels organic', desc: 'easeInOutSine creates a smooth breathing-style pulse. For continuous spinners use linear — any easing creates visual jitter at the loop restart point.' },
    { icon: '🧩', title: 'Apply different easings to separate keyframe steps in @keyframes', desc: 'Set animation-timing-function inside individual keyframe steps — ease-in from 0% to 50%, ease-out from 50% to 100%. The four coordinate values work directly in keyframe steps.' },
    { icon: '🛠️', title: 'Use the bezier values in GSAP, Framer Motion, or Anime.js', desc: 'Most JS animation libraries accept cubic-bezier arrays or strings. Copy the X1 Y1 X2 Y2 values from the coordinate inputs for GSAP\'s ease parameter or Framer Motion\'s transition.ease.' },
  ],
  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function CssEasingGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.page}>
        <div className={styles.toolSection}>
          <CssEasingGeneratorTool />
        </div>
        <IndexOnly><AdSlot />
        <SeoSection {...seoData} /></IndexOnly>
      </div>
    </>
  );
}
