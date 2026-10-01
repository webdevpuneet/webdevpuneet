import CssShapeGeneratorTool from '@/components/CssShapeGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'CSS Shape Generator — 37 Shapes · 7 Code Exports Free Online | webdevpuneet.com',
  description: 'Generate pure CSS shapes — triangles, arrows, stars, hearts, hexagons, and speech bubbles. Export CSS, React, Tailwind, SCSS, or Vue. Free, no sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/css-shape-generator/' },
  icons: { icon: '/icons/css-shape-generator.svg', shortcut: '/icons/css-shape-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/css-shape-generator/',
    siteName: 'webdevpuneet.com',
    title: 'CSS Shape Generator — 37 Shapes · 7 Code Exports',
    description: 'Pick a CSS shape, customize color/size/rotation, and copy the code in your preferred format. 37 shapes including triangles, stars, hearts, hexagons, arrows. CSS, React, Tailwind, SCSS, Styled-Components, Vue export.',
    images: [{ url: 'https://webdevpuneet.com/images/css-shape-generator.png', width: 1200, height: 800, alt: 'CSS Shape Generator — 37 Shapes Online Tool' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'CSS Shape Generator — 37 Shapes · 7 Code Exports',
    description: 'Generate CSS shapes and copy them as CSS class, React JSX, Tailwind utilities, SCSS, Styled-Components, or Vue. 37 shapes, zero dependencies.',
    images: ['https://webdevpuneet.com/images/css-shape-generator.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What CSS techniques does this tool use to create shapes?',
      acceptedAnswer: { '@type': 'Answer', text: 'The tool uses five core CSS techniques depending on the shape: the Border Trick creates triangles and trapezoids by setting width and height to zero and using transparent borders on adjacent sides; clip-path: polygon() cuts geometric shapes like stars, hexagons, arrows, and hearts from a rectangular element; border-radius creates circles, ovals, squircles, pills, leaves, and teardrops; CSS transform (skewX) creates parallelograms; and radial-gradient creates crescents without needing a background color. Each shape uses only standard CSS — no images, no SVG, no JavaScript.' },
    },
    {
      '@type': 'Question',
      name: 'How do I use the CSS output in my project?',
      acceptedAnswer: { '@type': 'Answer', text: 'Choose your preferred export format from the tabs — CSS Class gives you a ready-to-use .shape-name { } block; HTML gives you the full <style> + <div> snippet; React gives you a JSX element with a style prop; Tailwind gives you arbitrary-value utility classes; SCSS extracts the color into a $color variable; Styled-Components gives you a const Shape = styled.div template; and Vue gives you a <script setup> component with :style binding. Copy and paste directly into your project — no modifications needed for the CSS, HTML, SCSS, or Styled-Components formats.' },
    },
    {
      '@type': 'Question',
      name: 'What is the CSS Border Trick and how does it work for triangles?',
      acceptedAnswer: { '@type': 'Answer', text: 'The CSS border trick exploits how borders meet at 45-degree mitered corners. When an element has zero width and height, its visual size is determined entirely by its border widths. By making some borders transparent and one border colored, the colored border appears as a triangle pointing away from its side. For example: width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 100px solid teal; creates a triangle pointing upward. The four directional triangles work this way, and the corner variants (top-left, bottom-right, etc.) use two adjacent borders — one colored and one transparent — to create right-angle triangles.' },
    },
    {
      '@type': 'Question',
      name: 'Why does the Crescent shape use radial-gradient instead of clip-path?',
      acceptedAnswer: { '@type': 'Answer', text: 'A crescent shape requires a circle with a circular "bite" taken out of it. clip-path cannot subtract shapes — it can only clip to a polygon outline. The radial-gradient approach places a transparent inner circle offset from center inside a solid colored outer circle: background: radial-gradient(circle at 65% 35%, transparent 35%, teal 35%). The transparent region creates the cutout, and the solid region forms the crescent. This technique works with any background behind the element because the transparent section is truly transparent, not masked with a background-colored overlay.' },
    },
    {
      '@type': 'Question',
      name: 'How do I create a CSS triangle that points diagonally (corner triangles)?',
      acceptedAnswer: { '@type': 'Answer', text: 'Corner triangles use two adjacent border sides — one colored and one transparent. For a top-left triangle: width: 0; height: 0; border-top: 100px solid teal; border-right: 100px solid transparent; The colored border-top draws the horizontal edge and the transparent border-right determines the diagonal hypotenuse. For bottom-right: border-bottom and border-left. These are perfect for decorative page section dividers, ribbon effects on card corners, and directional callout indicators.' },
    },
    {
      '@type': 'Question',
      name: 'Can I use these CSS shapes with Tailwind CSS?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The Tailwind export uses arbitrary value syntax — for example clip-path shapes become [clip-path:polygon(50%_0%,_100%_50%,_50%_100%,_0%_50%)] where spaces are replaced with underscores per Tailwind arbitrary value rules. Width and height become w-[100px] and h-[100px], background color becomes bg-[#0d9488], and border-radius becomes rounded-[50%]. For border trick triangles, the border values use the [border-bottom:100px_solid_#0d9488] format. All generated Tailwind classes work with Tailwind v3 and v4.' },
    },
    {
      '@type': 'Question',
      name: 'How does the rotation control work for shapes that already have a built-in transform?',
      acceptedAnswer: { '@type': 'Answer', text: 'Two shapes have built-in CSS transforms: the Teardrop uses rotate(-45deg) as part of its shape definition, and the Parallelogram uses skewX(-20deg). When you adjust the rotation slider, the Teardrop adds your rotation value to its base -45 degrees — so a 45-degree rotation produces rotate(0deg) which shows it as a simple rounded square, and 90 degrees produces rotate(45deg). The Parallelogram appends rotate(Ndeg) to its skewX(-20deg) so both transforms apply together. All other shapes apply rotation independently via a single rotate() transform.' },
    },
    {
      '@type': 'Question',
      name: 'Do these CSS shapes scale responsively?',
      acceptedAnswer: { '@type': 'Answer', text: 'Most shapes scale perfectly because clip-path uses percentage values which are relative to the element size. Change the width and height and the clip-path shape scales with it. Border-radius shapes like circles and squircles also scale because border-radius: 50% is percentage-based. The main exception is the Border Trick shapes (triangles, trapezoids) — their sizes are defined in absolute pixel values, so to scale them you need to update the border-width values. For fully responsive triangles, consider using a clip-path: polygon(50% 0%, 100% 100%, 0% 100%) on an element with a percentage-based width instead.' },
    },
    {
      '@type': 'Question',
      name: 'Which shapes work as containers that can hold text or content inside?',
      acceptedAnswer: { '@type': 'Answer', text: 'Shapes created with clip-path, border-radius, and transform can all hold content inside them. The visible area will be clipped to the shape outline for clip-path shapes, so text should be kept inside the clip region. Good choices for content containers include: Circle, Oval, Squircle, Pill (great for badge labels and buttons), Hexagon (for profile photos), Octagon, and Diamond. Avoid Triangle, Trapezoid, Crescent, and Ring as content containers — they either have zero width/height or their background is defined by gradients/borders rather than a solid fill that clips content cleanly.' },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between this tool and a CSS clip-path generator?',
      acceptedAnswer: { '@type': 'Answer', text: 'A clip-path generator like the CSS Clip-Path Generator on this site is an interactive vertex editor — you drag polygon points to create custom free-form clip paths and get the polygon() coordinates. The CSS Shape Generator is a shape library with pre-built shapes and a customizer — you pick a shape, adjust color, size, and rotation, and get ready-to-use code in 7 different formats. The shape generator also covers shapes that clip-path cannot produce (triangles via the border trick, crescents via gradients, rings via borders) and provides framework-specific exports for React, Vue, Tailwind, SCSS, and Styled-Components that the clip-path editor does not.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CSS Shape Generator',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Generate pure CSS for 37 shapes with 7 export formats including CSS, HTML, React, Tailwind, SCSS, Styled-Components, and Vue.',
  url: 'https://webdevpuneet.com/css-shape-generator/',
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'CSS Shape Generator', item: 'https://webdevpuneet.com/css-shape-generator/' },
  ],
};

const seoData = {
  slug: 'css-shape-generator',
  title: 'CSS Shape Generator — 37 Shapes, 7 Export Formats',
  about: {
    title: 'Get the CSS for Any Shape Instantly — Triangle, Star, Heart, Hexagon — 7 Export Formats',
    description: `You need a triangle for a tooltip pointer and you can't remember if it's \`border-left\` or \`border-right\` that makes it point right. You need a five-pointed star for a rating component but writing the polygon coordinates from memory is unreliable. Pick the shape from the library here, set the color and size, and copy the CSS — no manual coordinate calculation.\n\nA visual library of 37 shapes in five groups: **Triangles** (8 directional variants), **Arrows and Chevrons** (6), **Geometric** (8: hexagon, pentagon, octagon, star, diamond, and more), **Decorative** (8: heart, leaf, teardrop, crescent, ring), and **UI** (7: pill, speech bubble, notch arrow, price tag, trapezoid). Each uses the appropriate CSS technique — the border trick for triangles, \`clip-path: polygon()\` for stars and polygons, \`border-radius\` for circles and organic shapes, \`radial-gradient\` for crescents.\n\nEach technique exists for a specific structural reason. The border trick works because a zero-width, zero-height element's visible area collapses entirely into its border, and adjacent border edges always meet at a 45-degree miter — coloring one side while leaving the others transparent exposes only a triangular sliver, a technique that predates \`clip-path\` and still renders in every browser back to IE6. \`clip-path: polygon()\` instead lists x/y coordinate pairs as percentages of the element's own box, so the star, hexagon, or heart rescales correctly the moment you resize the element — nothing needs recalculating by hand. \`border-radius\` shapes exploit the fact each corner accepts an independent radius: the Leaf sets two opposite corners to 0% and the other two to 100% to pull a square into a curved diamond, while the Teardrop layers a -45 degree rotation on top of a similar asymmetric radius pattern. The Crescent has no clip-path equivalent at all — subtracting one circle from another isn't expressible as a single polygon outline — so it falls back to a \`radial-gradient\` with a transparent inner stop offset from center, letting the page background show through as the missing bite without needing \`mix-blend-mode\` or a mask image.\n\nSeven export formats: plain **CSS** class, **HTML** snippet with \`<style>\`, **React** JSX with a \`style\` prop, **Tailwind** arbitrary-value utilities, **SCSS** with a \`$color\` variable, **Styled-Components** template literal, and **Vue** \`<script setup>\` with \`:style\` binding. Clip-path and border-radius shapes also accept content inside them since the box model is unaffected — only the border-trick triangles have a genuinely empty content box. One shape, any stack, no rewriting.`,
  },
  features: [
    '**37 pure CSS shapes** — triangles, arrows, chevrons, stars, hexagons, heart, crescent, speech bubble, and more; for custom polygon shapes use our [CSS Clip-path Generator](/css-clip-path-generator)',
    '**5 CSS techniques** — Border trick, clip-path polygon, border-radius, CSS transform, radial-gradient',
    '**7 export formats** — CSS class, HTML snippet, React JSX, Tailwind utilities, SCSS with variables, Styled-Components, Vue',
    '**Live preview** — checkerboard background shows transparency accurately as you adjust controls',
    '**Color picker + hex input** — choose any fill color with visual picker or type a hex value directly; pick exact colors with our [Color Picker](/color-picker)',
    '**Size slider** — scale any shape from 50px to 250px with instant preview update',
    '**Rotation control** — rotate any shape 0–360° with a ↺ reset button',
    '**Group filter tabs** — filter shapes by All, Triangles, Arrows, Geometric, Decorative, UI',
    '**Active shape thumbnails** — shape grid previews update to show the currently selected color',
    '**One-click copy** — copies the full generated code with visual confirmation',
  ],
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Filter and pick a shape', text: 'Use the group filter tabs at the top of the left panel — All, Triangles, Arrows, Geometric, Decorative, or UI — to narrow the shape grid. Click any thumbnail to select it. The large preview panel on the right updates immediately and the technique badge in the header shows which CSS method is used (Border, Clip-Path, Border-Radius, etc.).' },
      { title: 'Set the fill color', text: 'Use the Color picker swatch to open the browser color picker, or type a hex value directly into the text input for precision. The shape preview and all export code update live as you change the color.' },
      { title: 'Adjust size and rotation', text: 'Drag the Size slider to scale the shape from 50px to 250px. Drag the Rotation slider to rotate it from 0 to 360 degrees. When rotation is non-zero, a ↺ reset button appears to snap it back to 0.' },
      { title: 'Choose an export format', text: 'Click the export tab for your stack: CSS for a plain .shape-name {} class; HTML for a complete <style> + <div> snippet; React for a JSX element with a style prop; Tailwind for arbitrary-value utility classes; SCSS for a class with a $color variable; Styled-C for a Styled-Components template; Vue for a <script setup> component with :style binding.' },
      { title: 'Copy and paste the code', text: 'Click the ⎘ Copy button at the bottom of the export panel to copy the generated code to your clipboard. CSS, HTML, and SCSS outputs are drop-in ready. React, Vue, and Styled-Components outputs are self-contained but may require an import for the library in the target file.' },
    ],
  },
  useCases: [
    { icon: '🔺', title: 'Create a CSS triangle for a tooltip pointer or dropdown caret', desc: 'Use a directional triangle from the Triangles group. Apply it via ::before or ::after pseudo-elements on the tooltip container — no extra HTML elements needed, pure CSS.' },
    { icon: '⬡', title: 'Crop a profile photo or avatar to a hexagon or circle without image editing', desc: 'Apply the hexagon or circle shape via clip-path to an img element. Percentage-based polygon coordinates scale with the element so the crop stays correct at any size. Add CSS transforms with our [CSS Transform Generator](/css-transform-generator).' },
    { icon: '🏷️', title: 'Build a price tag, breadcrumb notch, or status badge shape for a UI component', desc: 'The price tag, notch arrow, pill, and badge shapes from the UI group cover the most common label patterns. Pick the shape, set your brand color, and export as CSS or Tailwind.' },
    { icon: '💬', title: 'Create a speech bubble shape for a chat message or tooltip container', desc: 'The speech bubble shape produces a div that can hold text content. Apply it as a background class to message containers for chat UI — the bubble pointer is included in the CSS.' },
    { icon: '⭐', title: 'Generate a star shape for a rating component without an icon font', desc: 'The 4-point, 5-point, and 6-point star shapes use clip-path polygon — no SVG or icon font import needed. Set the fill color to match filled/empty star states.' },
    { icon: '🌿', title: 'Use organic shapes as decorative accents on a marketing page', desc: 'Leaves, teardrops, and crescents as background SVG-free accents in landing page sections. The crescent uses a radial-gradient technique that stays crisp at any scale.' },
  ],
  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function CssShapeGeneratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.page}>
        <div className={styles.toolSection}>
          <CssShapeGeneratorTool />
        </div>
        <IndexOnly><AdSlot />
        <SeoSection {...seoData} /></IndexOnly>

      </div>
    </>
  );
}
