import CssPlaygroundTool from '@/components/CssPlaygroundTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'CSS Playground — Learn CSS Visually, 53 Lessons Free | webdevpuneet.com',
  description: 'Learn CSS online with 53 interactive lessons — selectors, box model, flexbox, grid, animations, and container queries. Live editor, free, no install.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/css-playground/' },
  icons: { icon: '/icons/css-playground.svg', shortcut: '/icons/css-playground.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/css-playground/',
    siteName: 'webdevpuneet.com',
    title: 'Interactive CSS Playground — Learn CSS Visually',
    description: 'Live CSS + HTML editor with instant preview. 53 lessons across 18 chapters covering selectors, typography, box model, flexbox, grid, animations, variables, responsive design, modern selectors, cascade layers, visual effects, and modern color.',
    images: [{ url: 'https://webdevpuneet.com/images/css-playground.png', width: 1200, height: 630, alt: 'Interactive CSS Playground — Learn CSS Visually' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Interactive CSS Playground — Learn CSS Visually',
    description: 'Edit CSS and HTML, see the result instantly. 53 lessons, 18 chapters — learn CSS without memorising syntax. Free, no sign-up.',
    images: ['https://webdevpuneet.com/images/css-playground.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I need any coding experience to use the CSS Playground?',
      acceptedAnswer: { '@type': 'Answer', text: 'No prior experience is needed. The playground starts with the basics — what CSS selectors are, how to target elements, and what properties do. Each lesson provides working HTML + CSS code you can immediately edit and experiment with. The concept explanation above the editor explains the why, and the live preview shows the result instantly.' },
    },
    {
      '@type': 'Question',
      name: 'What CSS topics does the playground cover?',
      acceptedAnswer: { '@type': 'Answer', text: 'The playground covers 53 lessons across 18 chapters: Selectors, Colors, Typography, Box Model, Layout Basics, Flexbox, CSS Grid, Animations, CSS Variables, Pseudo-elements, Responsive Design, Modern Selectors, Modern Layout, Cascade & Layers, Visual Effects, Advanced Variables, Modern Color, and Clip & Mask.' },
    },
    {
      '@type': 'Question',
      name: 'Can I edit both the HTML and CSS?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The editor pane shows CSS and HTML editors stacked vertically — both visible at once. A draggable divider between them lets you adjust how much space each gets. Both editors update the live preview as you type. The Reset button restores the lesson\'s default code at any time.' },
    },
    {
      '@type': 'Question',
      name: 'Is my progress saved if I close the browser?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Both your completed lessons and your current lesson position are saved to localStorage in your browser. When you return, the playground resumes where you left off with all completed lessons still marked. No account or login is required.' },
    },
    {
      '@type': 'Question',
      name: 'How does the live preview work?',
      acceptedAnswer: { '@type': 'Answer', text: 'The preview is a sandboxed iframe that renders your HTML and CSS directly in the browser. As you type in the CSS or HTML editor, the preview updates after a short debounce (about 150ms). This means you see the effect of your changes almost instantly without any page reload or build step.' },
    },
    {
      '@type': 'Question',
      name: 'What are the Quick Check challenges?',
      acceptedAnswer: { '@type': 'Answer', text: 'Some lessons include a Quick Check — a multiple-choice question about the concept you just learned. Click the answer you think is correct. Green means right; red shows the correct answer if you were wrong. These use active recall, one of the most effective learning techniques, to help cement what you\'ve read.' },
    },
    {
      '@type': 'Question',
      name: 'Can I download my code?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Click the download (.html) button in the preview header to save the current HTML + CSS as a complete, self-contained HTML file you can open in any browser or deploy directly.' },
    },
    {
      '@type': 'Question',
      name: 'Does the playground cover CSS Flexbox and Grid?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes — both are covered in depth. Flexbox spans 4 lessons: understanding the flex container, flex-direction and flex-wrap, justify-content and align-items, and controlling individual flex items with flex-grow, flex-shrink, and flex-basis. CSS Grid spans 3 lessons: the grid container and fr unit, grid-template-areas for named layouts, and column spanning with auto-placement using minmax() and auto-fill.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CSS Playground',
  url: 'https://webdevpuneet.com/css-playground/',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires a modern browser with JavaScript enabled',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Interactive CSS learning tool with 53 lessons across 18 chapters. Live CSS and HTML editors with instant preview. Covers selectors, box model, typography, flexbox, grid, animations, variables, responsive design, modern selectors, cascade layers, visual effects, and modern color.',
  featureList: [
    '53 lessons across 18 chapters covering CSS fundamentals and modern production CSS',
    'CSS and HTML editors stacked vertically — both visible at once with a draggable divider',
    'Live sandboxed preview that updates as you type (150ms debounce)',
    'CSS syntax highlighting — at-rules, selectors, properties, values, hex colours colour-coded',
    'HTML syntax highlighting in the HTML editor',
    'Remove CSS / Apply CSS toggle — see how the page looks without any styles',
    'Format CSS button — auto-indents and prettifies the CSS editor content',
    'Responsive preview sizes — toggle 375px mobile / 768px tablet / full width',
    'CSS error detection — catches unclosed braces and syntax mistakes inline',
    'Copy CSS and Copy HTML buttons',
    'Download as .html — saves complete self-contained HTML + CSS file',
    'Quick Check multiple-choice challenges with persistent completion (saved to localStorage)',
    'Confetti burst on completing each chapter',
    'Lesson search/filter in sidebar',
    'Progress and position saved to localStorage — no account needed',
    'Collapsible sidebar and concept panel to maximise editor space',
    'Mobile-responsive layout',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com/' },
    { '@type': 'ListItem', position: 2, name: 'CSS Playground', item: 'https://webdevpuneet.com/css-playground/' },
  ],
};

const seoData = {
  slug: 'css-playground',
  title: 'Interactive CSS Playground — Learn CSS Visually with a Live Editor',
  subtitle: '53 lessons across 18 chapters. Edit CSS and HTML, see results instantly. Free, no sign-up.',
  about: {
    description: `Most people struggle with CSS because they read about properties without seeing what they actually do. The CSS Playground flips that — you edit CSS in a live editor, the preview updates instantly, and you build a genuine understanding by doing rather than memorising.\n\nThe tool has 53 lessons across 18 chapters covering everything from basic selectors to modern production CSS: container queries, subgrid, CSS nesting, cascade layers, logical properties, blend modes, filters, scroll-driven animations, @property, clamp(), color-mix(), OKLCH, relative color syntax, clip-path, and mask-image. Each lesson provides a base HTML structure and starter CSS in a live split-pane editor — CSS on top, HTML below, preview on the right.\n\nThe preview itself renders inside a sandboxed iframe, rebuilt from your current HTML and CSS about 150ms after you stop typing — long enough to avoid re-rendering on every keystroke, short enough that the update still feels instant. Alongside it, a small error checker walks the CSS character by character tracking brace depth while correctly skipping over string literals and \`/* */\` comments, so a stray brace inside a quoted \`content\` value or a comment doesn't produce a false "unclosed rule" warning — only a genuinely mismatched \`{\`/\`}\` pair does. The Format button uses a simpler line-based reflow: it inserts a newline after every \`{\`, \`;\`, and \`}\`, then re-indents based on a running brace-depth counter, which is enough to turn a single-line paste into a readable, consistently indented stylesheet without needing a full CSS parser.\n\nThe "Remove CSS" toggle strips all styles from the preview so you can see exactly what your CSS is contributing versus the browser's default rendering — often the fastest way to build intuition for what a property actually does. Responsive preview buttons (375px mobile, 768px tablet, full width) let you check how your layout responds at different widths without leaving the page. Quick Check challenges after key lessons reinforce learning through active recall, and your answers persist across visits. Progress, current lesson position, and completed challenges are each tracked under their own localStorage key, so closing the tab and coming back — even days later — resumes exactly where you left off, with no account or sign-up involved.\n\nIf you are a freelance designer or developer building your CSS skills, also check out the [Freelance Rate Calculator](https://fwdtools.com/freelance-rate-calculator/) to price your services correctly and the [Freelance Invoice Generator](https://fwdtools.com/freelance-invoice-generator/) to handle your billing — both run entirely in your browser. For longer, example-driven walkthroughs of specific CSS concepts, see the [CSS tutorials on webdevpuneet.com](https://webdevpuneet.com/blog/).`,
  },
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Pick a lesson', text: 'Browse the 18 chapters in the left sidebar. Click any lesson to load its HTML and CSS into the editors. Use the search box to filter lessons by name.' },
      { title: 'Read the concept', text: 'The collapsible panel above the editors explains what the lesson covers and why it matters — including the mental model behind the CSS property or technique.' },
      { title: 'Edit CSS and HTML', text: 'The CSS editor (top) and HTML editor (bottom) are both visible at once. Edit either and watch the preview update instantly. Drag the divider between them to resize.' },
      { title: 'Use the toolbar buttons', text: 'Format cleans up messy CSS. Remove CSS strips all styles so you can see the unstyled HTML. The responsive size buttons (375 / 768 / Full) resize the preview to check your layout.' },
      { title: 'Answer the Quick Check', text: 'Some lessons end with a multiple-choice challenge. Your answers are saved — revisiting the lesson shows "✓ Challenge complete" if you already answered correctly.' },
      { title: 'Move to the next lesson', text: 'Use the Prev / Next buttons or click any lesson in the sidebar. Progress is saved to localStorage automatically.' },
    ],
  },
  features: [
    '53 lessons across 18 chapters — selectors, colours, typography, box model, display, flexbox, grid, animations, CSS variables, pseudo-elements, responsive design, modern selectors, modern layout, cascade layers, visual effects, modern color, clip-path, and masks',
    'Split-pane editor: CSS and HTML editors visible simultaneously with a draggable resize divider',
    'Live sandboxed preview that updates as you type',
    'Remove CSS / Apply CSS toggle — instantly see the page without any styles applied',
    'Responsive preview sizes — 375px mobile, 768px tablet, full width',
    'CSS error detection — inline warning for unclosed braces and syntax mistakes',
    'Format CSS button auto-indents and prettifies the editor content',
    'Quick Check challenges with persistent completion saved to localStorage',
    'Copy CSS and Copy HTML buttons — grab just the code you need in one click',
    'Progress and position saved locally — no account required',
  ],
  useCases: [
    { title: 'Beginners Learning CSS for the First Time', desc: 'If you have never written CSS before, this playground removes every barrier. Each lesson explains one concept in plain English, gives you working code to edit immediately, and shows the result in a live preview. No setup, no terminal, no memorising property names — just open a lesson and start changing things.' },
    { title: 'Developers Who Struggle with Flexbox and Grid', desc: 'Flexbox and CSS Grid are the most commonly misunderstood parts of CSS. The playground dedicates seven lessons to layout — flex container, direction, wrapping, justify-content, align-items, grid columns, grid areas, and auto-placement. Edit the values and watch the layout shift in real time until the mental model clicks. Then build real layouts visually with the [Flexbox builder](/flexbox-builder/) and [CSS Grid builder](/css-grid-builder/).' },
    { title: 'Students Following a Web Dev Curriculum', desc: 'If you are working through a bootcamp or university course, the CSS Playground gives you a hands-on environment to experiment with exactly what you are studying. Load the lesson that matches your module, edit the CSS, break it, fix it, and build the intuition that reading slides alone cannot give you.' },
    { title: 'Self-Taught Developers Filling CSS Gaps', desc: 'Many self-taught developers know enough CSS to get by but have gaps — they skip pseudo-elements, avoid CSS variables, or hardcode breakpoints instead of using clamp(). The modern chapters target exactly these gaps with focused, editable lessons covering variables, pseudo-elements, responsive design, modern selectors, layout, cascade layers, visual effects, and modern color.' },
    { title: 'Anyone Prototyping CSS Effects', desc: 'Need to quickly test a keyframe animation, a box-shadow stack, or a gradient before applying it to a real project? Load the relevant lesson, modify the values, and use the Copy CSS or Download buttons to take the working code straight into your project. Faster than a blank CodePen.' },
    { title: 'Teachers Demonstrating CSS in the Classroom', desc: 'The split-pane layout works perfectly on a projected screen — the CSS editor on the left, the live result on the right. Load a lesson, edit a property live, and the class watches the layout respond instantly. The Remove CSS toggle is especially effective for showing students exactly what each CSS rule contributes.' },
  ],
  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function CssPlaygroundPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}>
        <CssPlaygroundTool />
      </div>
      <AdSlot />
      <IndexOnly><SeoSection {...seoData} /></IndexOnly>
    </div>
  );
}
