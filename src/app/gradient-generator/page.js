import GradientGeneratorTool from '@/components/GradientGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const DESCRIPTION = 'Free CSS gradient generator with OKLCH smooth blending, layers, grain, radial and conic controls and live previews. Export CSS or Tailwind, or download PNG/SVG.';

export const metadata = {
  title: 'CSS Gradient Generator — Smooth, Layered & Animated',
  description: DESCRIPTION,
  keywords: [
    'css gradient generator', 'gradient generator', 'linear gradient generator', 'radial gradient generator',
    'conic gradient generator', 'oklch gradient', 'grainy gradient', 'mesh gradient css', 'animated gradient css',
    'gradient text css', 'gradient border css', 'tailwind gradient', 'gradient png download', 'gradient svg',
  ],
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/gradient-generator/' },
  icons: { icon: '/icons/gradient-generator.svg', shortcut: '/icons/gradient-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/gradient-generator/',
    siteName: 'webdevpuneet.com',
    title: 'CSS Gradient Generator — OKLCH, Layers, Grain & PNG Export',
    description: DESCRIPTION,
    images: [{ url: 'https://webdevpuneet.com/images/gradient-generator.png', width: 1200, height: 630, alt: 'CSS Gradient Generator — layers, OKLCH and real-world previews' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'CSS Gradient Generator — OKLCH, Layers, Grain & PNG Export',
    description: DESCRIPTION,
    images: ['https://webdevpuneet.com/images/gradient-generator.png'],
  },
};

/* ── FAQ: shown on the page and published as FAQPage structured data ── */
const FAQS = [
  {
    q: 'How do I create a CSS gradient online?',
    a: 'Pick Linear, Radial or Conic in the Type section, then edit the color stops: click the gradient bar to add a stop, drag a handle to move it, and use the color picker, hex field and opacity box to change it. The preview updates instantly. When it looks right, choose CSS, Tailwind, SCSS, CSS Variable or React above the code and click Copy — or download the gradient as a PNG or SVG image.',
  },
  {
    q: 'Why does my CSS gradient look grey or muddy in the middle?',
    a: 'Browsers blend gradient colors in the sRGB color space by default, and mixing two saturated colors that sit across the color wheel in sRGB passes through a dull, greyish middle. Switch the Color space to OKLab or OKLCH: the exported CSS then uses linear-gradient(in oklch …), which mixes colors the way the eye perceives them and keeps the middle vivid. The tool also writes an sRGB fallback line first for older browsers.',
  },
  {
    q: 'What is an OKLCH gradient and which browsers support it?',
    a: 'OKLCH is a perceptual color space with lightness, chroma and hue. A gradient written as linear-gradient(in oklch 90deg, …) interpolates in OKLCH, so colors stay bright and evenly spaced, and "in oklch longer hue" travels the long way round the hue wheel for rainbow sweeps. CSS color interpolation is supported in Chrome and Edge 111+, Safari 16.2+ and Firefox 127+; older browsers use the sRGB fallback line the tool adds automatically.',
  },
  {
    q: 'What does the Eased gradient option do?',
    a: 'A normal gradient changes color at a constant rate, which leaves a visible "seam" where it meets each color stop. Eased gradient adds seven in-between stops per segment that follow an ease-in-out curve, mixed in your chosen color space, so the transition starts and ends gently. It is the same technique designers use for smooth hero backgrounds and image overlays.',
  },
  {
    q: 'How do I make a grainy gradient in CSS?',
    a: 'Move the Grain slider. The tool adds a film-grain texture on top of your gradient as a small SVG noise image (feTurbulence) blended with background-blend-mode: overlay, so the whole effect is pure CSS with no image file. Grain also helps hide banding on large, subtle gradients. PNG and SVG downloads include the grain too.',
  },
  {
    q: 'How do I layer multiple gradients, like a mesh gradient?',
    a: 'Click "+ Layer" to add a gradient on top of the current one, then fade one of its stops to 0% opacity so the layers below show through. Stack a few soft radial layers over a linear base to get a mesh-style background, choose a blend mode such as screen or overlay for each upper layer, and reorder layers with the arrows. The CSS export lists every layer in one background declaration, top layer first.',
  },
  {
    q: 'How do I control a radial or conic gradient?',
    a: 'For radial gradients, choose an ellipse or circle and a size keyword — farthest-corner, closest-side, farthest-side or closest-corner — and set the center with the X and Y sliders or by dragging directly on the preview. For conic gradients, set the start angle with the dial and the center the same way. Linear gradients have a draggable angle dial, a slider and one-click angle chips.',
  },
  {
    q: 'How do I make CSS stripes or a pie chart with gradients?',
    a: 'Turn on Hard stops to make every color a solid band, then turn on Repeating and set the repeat size for stripes (repeating-linear-gradient) or ripples (repeating-radial-gradient). For a pie chart, use a conic gradient with hard stops — each stop position becomes a slice boundary. The Candy stripes, Pie chart and Ripples presets show each pattern.',
  },
  {
    q: 'How do I make gradient text or a gradient border?',
    a: 'Switch the preview to Text to see the gradient clipped to type with background-clip: text; the CSS export includes the -webkit- prefixes Safari needs. Switch to Border to see a card outline and buttons; the export uses the padding-box / border-box technique so the border keeps your border-radius. The Hero, Card and Buttons previews show other real-world uses.',
  },
  {
    q: 'Can I download the gradient as an image?',
    a: 'Yes. Pick a size — 1920×1080, 2560×1440, a 1200×630 social image, a 1080×1080 square or a 1080×1920 story — and click PNG or SVG. Both are drawn by the tool itself and include your layers, blend modes, opacity, grain and color space. SVG supports linear and radial layers; use PNG for conic or repeating gradients.',
  },
  {
    q: 'How do I share a gradient or keep editing it?',
    a: 'Click Share link to copy a URL that reopens the exact gradient — every layer, stop and setting is stored in the link itself, nothing is uploaded. Click Fork & Edit to open the gradient on a ready-made hero page in My Code, the free online code editor on webdevpuneet.com, where you can keep editing the HTML and CSS. Your work also auto-saves in your browser.',
  },
  {
    q: 'Does the tool check text contrast on the gradient?',
    a: 'Yes. In the Hero, Buttons and Border previews the tool samples the rendered gradient, measures the worst-case WCAG contrast of white and of dark text across it, picks the more readable one and shows the ratio with an AA, AA-large or Fails badge — so headings on a gradient stay readable.',
  },
  {
    q: 'Can I get Tailwind or React code for my gradient?',
    a: 'Yes. The Tailwind tab writes an arbitrary-value class (bg-[…] with spaces as underscores, plus a background-blend-mode class when needed) that works in Tailwind v3 and v4. The React tab writes a style object and a small component. There are also SCSS variable and CSS custom property exports.',
  },
  {
    q: 'Is this gradient generator free?',
    a: 'Yes — completely free with no sign-up. Everything runs in your browser: gradients, image downloads and share links are generated on your device and nothing is sent to a server.',
  },
];

const FEATURES = [
  { title: 'Smooth color spaces', text: 'Blend in OKLab, OKLCH, OKLCH long hue or HSL instead of sRGB — no more grey middles.' },
  { title: 'Eased gradients', text: 'Ease-in-out in-between stops remove the seam at every color stop.' },
  { title: 'Layers and blend modes', text: 'Stack up to six gradients with per-layer blend modes for mesh-style backgrounds.' },
  { title: 'Grain texture', text: 'Pure-CSS film grain for the modern "grainy gradient" look — no image files.' },
  { title: 'Full radial and conic control', text: 'Circle or ellipse, size keywords, and a center you can drag on the preview.' },
  { title: 'Angle dial', text: 'Drag a dial, use the slider, click an angle chip or nudge with the arrow keys.' },
  { title: 'Stripes, rings and pie charts', text: 'Repeating gradients and hard stops for patterns and charts.' },
  { title: 'Opacity per stop', text: 'Fade any stop to transparent so layers below show through.' },
  { title: 'Real-world previews', text: 'See it as a background, hero section, card, buttons, gradient text and gradient border.' },
  { title: 'Contrast check', text: 'Worst-case WCAG contrast for white or dark text over the gradient, with an AA badge.' },
  { title: 'Five code exports', text: 'CSS (with sRGB fallback), Tailwind, SCSS, CSS custom property and React.' },
  { title: 'PNG and SVG download', text: 'Wallpaper, social, square and story sizes — layers and grain included.' },
  { title: 'Share link', text: 'One URL reopens the exact gradient — nothing uploaded.' },
  { title: 'Fork & Edit', text: 'Open the gradient on a hero page in [My Code](/ui-snippets/mycode/) and keep editing.' },
  { title: '16 presets and 6 animations', text: 'Classic, mesh, grainy, rainbow, stripes, pie chart — plus Slide, Hue Shift, Spin and more.' },
];

const ABOUT = `A good gradient is more than two colors and an angle. Mix two saturated colors in a plain CSS gradient and the middle often turns grey; a big hero background shows visible bands; and the gradients designers love today are layered, softly blended, a little grainy and tested on real content. This free **CSS gradient generator** handles all of that visually, with a live preview, and gives you clean CSS — or a PNG or SVG image — in one click.

### Linear, radial and conic gradients

Pick a type in the **Type** section. **Linear** gradients run along a line at any angle: drag the **angle dial**, use the slider, click one of the angle chips, or focus the dial and use the arrow keys. **Radial** gradients spread out from a center point: choose an **ellipse** or **circle**, pick a size keyword (\`farthest-corner\`, \`closest-side\`, \`farthest-side\` or \`closest-corner\`) and set the center with the X/Y sliders or by **dragging directly on the preview**. **Conic** gradients sweep around a center like a clock face, with their own start-angle dial and draggable center.

### Color stops, opacity and the gradient bar

Each color stop appears as a handle on the gradient bar above the preview. Click the bar to add a stop — its color and opacity are worked out from the gradient at that exact point, so it blends in. Drag handles to move them, or select one and use the **← →** keys (hold Shift for bigger steps); **Delete** removes it. In the Color stops list, set each stop's color with the picker or a hex code, its **opacity** from 0 to 100%, and its exact position. Opacity is what makes layers possible: fade a stop to 0% and whatever is underneath shows through.

### Smooth gradients: OKLCH color spaces and easing

By default, browsers mix gradient colors in **sRGB**, and a blue-to-yellow or red-to-green gradient passes through a dull, greyish middle. The **Smoothness** section fixes it. Choose **OKLab** for a perceptually even blend, **OKLCH** to keep colors vivid by travelling around the hue wheel, **OKLCH long hue** to go the long way round for rainbow sweeps, or **HSL**. The exported CSS uses the modern syntax — for example \`linear-gradient(in oklch 135deg, …)\` — and adds an sRGB fallback line first, so older browsers still get a gradient.

Turn on **Eased gradient** to add ease-in-out in-between stops to every segment. Instead of changing color at a constant rate and leaving a visible seam at each stop, the gradient starts and ends gently — the technique behind smooth image overlays and soft hero backgrounds.

### Layers, blend modes and mesh-style gradients

Click **+ Layer** to stack another gradient on top. Each layer has its own type, stops, angle, center and **blend mode** (screen, overlay, multiply, soft-light and more), and the arrows reorder them. Stack a few soft radial "glows" over a dark linear base and you have a mesh-style background in pure CSS — the **Aurora mesh**, **Spotlight** and **Peach glow** presets show how. The export lists every layer in one \`background\` declaration, top layer first, with a matching \`background-blend-mode\`.

### Grainy gradients

The **Grain** slider adds a film-grain texture over the whole gradient. It is a tiny inline SVG noise image (\`feTurbulence\`) blended with \`overlay\`, so it needs no image file, scales to any size and also hides banding on large, subtle gradients — the popular "grainy gradient" look.

### Stripes, rings and pie charts

Turn on **Hard stops** to make each color a solid band, and **Repeating** to repeat the pattern every so many pixels (or degrees for conic gradients). That covers candy stripes and progress-bar stripes (\`repeating-linear-gradient\`), ripples and rings (\`repeating-radial-gradient\`) and pie charts (\`conic-gradient\` with hard stops).

### Real-world previews and a contrast check

Above the preview, switch between **Background**, **Hero**, **Card**, **Buttons**, **Text** and **Border**. Hero shows the gradient behind a landing-page heading and buttons; Card uses it as card artwork, avatars and a badge; Buttons shows filled, pill, outline and icon buttons; Text clips it to type with \`background-clip: text\`; Border draws a gradient outline that keeps its rounded corners. In the Hero, Buttons and Border views, the tool samples the rendered gradient, measures the **worst-case WCAG contrast** of white and dark text across it, picks the more readable color and shows the ratio with an AA badge.

### Animated gradients

Six animation presets — **Slide**, **Diagonal**, **Hue Shift**, **Breathe**, **Pulse** and **Spin** — play live in the preview, with a speed control from 1 to 12 seconds. The CSS export includes the complete \`@keyframes\` block. Spin animates the top linear layer's angle through a registered \`@property\`.

### Export the code, download an image, share or fork

Choose **CSS**, **Tailwind**, **SCSS**, **CSS Variable** or **React** above the code and click Copy; the CSS adapts to the preview you are on (a \`.gradient-text\` rule for Text, a \`.gradient-border\` rule for Border, and so on). Pick a size and click **PNG** or **SVG** to download an image — 1920×1080 and 2560×1440 wallpapers, a 1200×630 social image, a square or a story — drawn by the tool itself with layers, opacity, blend modes and grain included. **Share link** copies a URL that reopens the exact gradient, and **Fork & Edit** opens it on a ready-made hero page in [My Code](/ui-snippets/mycode/) so you can keep building. Everything auto-saves in your browser and runs entirely on your device.`;

const STEPS = [
  { title: 'Start from a preset or a type', text: 'Click a preset swatch — classic, mesh, grainy, rainbow, stripes or pie chart — or choose Linear, Radial or Conic in the Type section.' },
  { title: 'Edit the color stops', text: 'Click the gradient bar to add stops, drag handles to move them, and set each stop\'s color, opacity and position in the Color stops list.' },
  { title: 'Shape it', text: 'Set the angle with the dial, or for radial and conic gradients choose the shape, size and center — dragging on the preview works too. Turn on Repeating or Hard stops for patterns.' },
  { title: 'Make it smooth', text: 'Choose OKLab or OKLCH in Smoothness, turn on Eased gradient, and add Grain if you want texture.' },
  { title: 'Layer it', text: 'Click + Layer to stack gradients, fade stops to transparent, pick a blend mode for each upper layer and reorder with the arrows.' },
  { title: 'Preview it for real', text: 'Switch the preview to Hero, Card, Buttons, Text or Border and check the contrast badge.' },
  { title: 'Export, download, share or fork', text: 'Copy CSS, Tailwind, SCSS, a CSS variable or React code; download a PNG or SVG; copy a share link; or click Fork & Edit to keep going in My Code.' },
];

const USE_CASES = [
  { icon: '🌅', title: 'Landing-page hero backgrounds', desc: 'Layer soft radial glows over a dark base, add a little grain, check the hero preview and contrast badge, then copy the CSS — or download a 2560×1440 PNG.' },
  { icon: '🎨', title: 'Vivid brand gradients without grey middles', desc: 'Switch to OKLCH so brand colors stay saturated across the whole gradient, and ship it with an automatic sRGB fallback.' },
  { icon: '🔤', title: 'Gradient headings and logos', desc: 'Use the Text preview and copy a .gradient-text rule with the Safari prefixes already included.' },
  { icon: '🔘', title: 'Buttons, badges and gradient borders', desc: 'Preview filled, pill, outline and icon buttons, or a gradient border that keeps its rounded corners.' },
  { icon: '🖼️', title: 'Wallpapers, social images and placeholders', desc: 'Download a PNG or SVG at wallpaper, 1200×630 social, square or story size — great for Open Graph images and image placeholders.' },
  { icon: '📊', title: 'Stripes, progress bars and pie charts', desc: 'Combine hard stops with repeating and conic gradients for striped progress bars, ripples and lightweight pie charts in pure CSS.' },
];

const SPACE_TABLE = {
  columns: ['Color space', 'CSS', 'Best for'],
  rows: [
    ['**sRGB**', '`linear-gradient(90deg, …)`', 'Matching older designs exactly; neighbouring colors'],
    ['**OKLab**', '`linear-gradient(in oklab 90deg, …)`', 'Even, natural blends with no grey dead zone'],
    ['**OKLCH**', '`linear-gradient(in oklch 90deg, …)`', 'Vivid gradients between distant hues'],
    ['**OKLCH long hue**', '`linear-gradient(in oklch longer hue 90deg, …)`', 'Rainbow and spectrum sweeps'],
    ['**HSL**', '`linear-gradient(in hsl 90deg, …)`', 'Bright, saturated hue transitions'],
  ],
};

const SECTIONS = [
  { type: 'features', label: "What's included", heading: 'Gradient Generator Features', items: FEATURES },
  { type: 'text', label: 'About this tool', heading: 'A CSS Gradient Generator for Smooth, Layered and Grainy Gradients', text: ABOUT },
  { type: 'steps', label: 'Step by step', heading: 'How to Make a CSS Gradient', items: STEPS },
  { type: 'table', label: 'Smoothness', heading: 'Gradient Color Spaces Compared', ...SPACE_TABLE },
  { type: 'callout', variant: 'tip', heading: 'Tip: avoid the grey middle', text: 'If a gradient between two bright colors looks dull halfway, switch the color space to OKLCH. If it shows a hard line at each stop, turn on Eased gradient. If a large, subtle gradient shows bands, add a little grain.' },
  { type: 'cards', label: 'Real-world uses', heading: 'Common Use Cases', columns: 3, items: USE_CASES },
  { type: 'faq', label: 'Got questions?', heading: 'Frequently Asked Questions', items: FAQS },
  {
    type: 'timeline', label: 'Changelog', heading: 'Recent Features and Improvements',
    items: [{
      date: 'October 5, 2026', title: 'Smooth color spaces, layers, grain and image downloads',
      items: [
        'OKLab, OKLCH, OKLCH long hue and HSL interpolation with an automatic sRGB fallback, plus eased gradients',
        'Gradient layers with blend modes, per-stop opacity and a film-grain overlay',
        'Radial shape and size, draggable centers, an angle dial, repeating gradients and hard stops',
        'Hero, Card and Buttons previews with a WCAG contrast check',
        'CSS Variable and React exports, PNG and SVG downloads, share links and Fork & Edit into My Code',
      ],
    }],
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CSS Gradient Generator',
  url: 'https://webdevpuneet.com/gradient-generator/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free visual CSS gradient generator with OKLab / OKLCH interpolation, eased gradients, layers with blend modes, grain, radial and conic controls, real-world previews with a contrast check, CSS / Tailwind / SCSS / CSS variable / React export, PNG and SVG download, share links and Fork & Edit.',
  featureList: FEATURES.map(f => f.title),
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com/' },
    { '@type': 'ListItem', position: 2, name: 'CSS Tools', item: 'https://webdevpuneet.com/css-tools/' },
    { '@type': 'ListItem', position: 3, name: 'CSS Gradient Generator', item: 'https://webdevpuneet.com/gradient-generator/' },
  ],
};

export default function GradientGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><GradientGeneratorTool /></div>
      <AdSlot />
      <IndexOnly>
        <SeoSection
          slug="gradient-generator"
          title="CSS Gradient Generator — Linear, Radial, Conic, Layered & Grainy Gradients"
          subtitle="Build smooth OKLCH gradients, stack layers with blend modes, add grain, preview them on real UI, and export CSS, Tailwind or a PNG/SVG image."
          sections={SECTIONS}
        />
      </IndexOnly>
    </div>
  );
}
