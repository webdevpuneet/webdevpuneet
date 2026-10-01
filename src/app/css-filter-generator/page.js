import CssFilterGeneratorTool from '@/components/CssFilterGeneratorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'CSS Filter Generator — Visual Image Filter Builder Online Free | webdevpuneet.com',
  description: 'Free CSS filter generator — adjust blur, brightness, contrast, sepia, and drop-shadow with live side-by-side preview. 10 presets, copy CSS instantly.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/css-filter-generator/' },
  icons: { icon: '/icons/css-filter-generator.svg', shortcut: '/icons/css-filter-generator.svg' },
  openGraph: { type: 'website', url: 'https://webdevpuneet.com/css-filter-generator/', siteName: 'webdevpuneet.com', title: 'CSS Filter Generator — Visual Image Filter Builder Online', description: 'Adjust blur, brightness, contrast, grayscale, sepia, hue-rotate visually with live preview. 10 presets. Copy CSS instantly. Free.', images: [{ url: 'https://webdevpuneet.com/images/css-filter-generator.png', width: 1200, height: 630, alt: 'CSS Filter Generator Online' }], locale: 'en_US' },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: 'CSS Filter Generator — Visual Image Filter Builder', description: 'Generate CSS filters visually — blur, brightness, contrast, sepia, hue-rotate, drop-shadow. 10 presets, live preview. Free.', images: ['https://webdevpuneet.com/images/css-filter-generator.png'] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How do I blur or adjust the brightness of an image with CSS?', acceptedAnswer: { '@type': 'Answer', text: 'Use the CSS filter property with the appropriate function. For blur: filter: blur(4px); For brightness: filter: brightness(120%); For both combined: filter: blur(4px) brightness(120%); Multiple filter functions are separated by spaces and applied left-to-right. This tool generates the combined filter declaration as you adjust the sliders — copy the output and paste it into your CSS.' } },
    { '@type': 'Question', name: 'Can I combine multiple CSS filters on one element?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. List multiple functions in a single filter declaration separated by spaces: filter: brightness(120%) contrast(110%) saturate(130%) hue-rotate(10deg). Each function is applied to the output of the previous one in left-to-right order, so sequence matters. This tool combines all your slider values into one clean declaration and omits functions set to their identity values to keep the output minimal.' } },
    { '@type': 'Question', name: 'What is the difference between CSS drop-shadow and box-shadow?', acceptedAnswer: { '@type': 'Answer', text: 'drop-shadow() is a CSS filter function that traces the element\'s actual alpha channel — it follows transparent cutouts in PNG images and SVG icons, producing a shadow that matches the visual shape. box-shadow casts a shadow from the rectangular bounding box regardless of transparency, so a circular PNG would get a rectangular shadow. For transparent PNGs and SVG icons, always use filter: drop-shadow() instead of box-shadow.' } },
    { '@type': 'Question', name: 'Does CSS filter hurt performance or cause janky animations?', acceptedAnswer: { '@type': 'Answer', text: 'CSS filters trigger GPU compositing — efficient for static elements, but animating filter values (especially blur()) can be expensive because each frame requires GPU re-rasterization. Keep blur radius below 10px for animated elements, avoid filtering large full-page sections, and add will-change: filter before animating to let the browser promote the element to its own compositing layer ahead of time.' } },
    { '@type': 'Question', name: 'How do I use CSS filter to recolor an SVG icon?', acceptedAnswer: { '@type': 'Answer', text: 'Apply hue-rotate() to shift the icon\'s colors around the HSL color wheel. hue-rotate(120deg) shifts a blue icon to green. hue-rotate(240deg) shifts it to red. Combine with saturate() to boost or reduce color intensity. This lets you recolor any monochrome or single-hue icon through CSS without editing the SVG source — useful for icon libraries across multiple color themes.' } },
    { '@type': 'Question', name: 'Can I apply CSS filter to divs, text, and entire page sections?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. CSS filter works on any HTML element — divs, text, buttons, SVG, video, canvas, and page sections. Applying filter to a container affects that element and all its children as a flattened composite. This is how you blur a background section behind a modal, desaturate an entire card on hover, or apply a warm tone to a full page region without editing each child element.' } },
    { '@type': 'Question', name: 'What browsers support CSS filter?', acceptedAnswer: { '@type': 'Answer', text: 'CSS filter is supported in all modern browsers — Chrome, Firefox, Safari, Edge — without vendor prefixes. Older Safari (pre-9.1) required -webkit-filter. This tool\'s output includes both filter and -webkit-filter for maximum compatibility. IE does not support CSS filter, but IE usage is negligible for modern projects.' } },
    { '@type': 'Question', name: 'What filter presets are available?', acceptedAnswer: { '@type': 'Answer', text: 'Ten presets: Vintage (warm sepia with slight desaturation), Grayscale (full desaturation), Cold (blue-shifted hue with boosted contrast), Warm (orange-shifted hue with raised brightness), High Contrast (maximized contrast), Dreamy (soft blur with brightened tones), Neon (high saturation with hue shift), Matte (reduced contrast, faded look), Night Vision (green-shifted with boosted brightness), and None (all defaults). Each can be refined further with the individual sliders.' } },
    { '@type': 'Question', name: 'How do I desaturate an image on hover with CSS?', acceptedAnswer: { '@type': 'Answer', text: 'Apply a full grayscale filter in the base state and remove it on hover, or do the reverse — start with color and fade to grayscale on hover. For a hover desaturation effect: .card img { filter: none; transition: filter 0.3s ease; } .card img:hover { filter: grayscale(100%); }. This signals interactivity by "dimming" an image when the user hovers, a common pattern for clickable image grids and portfolio galleries. You can soften the effect by using grayscale(60%) for a partial desaturation instead of full conversion to black and white.' } },
    { '@type': 'Question', name: 'How do I blur a background behind an element without affecting the element itself?', acceptedAnswer: { '@type': 'Answer', text: 'Use backdrop-filter instead of filter. backdrop-filter: blur(10px) applies the blur to whatever is rendered behind the element (the backdrop), not to the element itself — this is the CSS property that creates the frosted glass effect seen in macOS, iOS, and modern SaaS UIs. The element needs a semi-transparent background to let the blurred backdrop show through: background: rgba(255,255,255,0.3). backdrop-filter is supported in all modern browsers. Note: filter: blur() applied to a container blurs the container AND all its children, which is rarely what you want for overlay panels — backdrop-filter is the right tool for that use case.' } },
    { '@type': 'Question', name: 'Can I use CSS filter to make an image black and white?', acceptedAnswer: { '@type': 'Answer', text: 'Set filter: grayscale(100%) on the image element. A value of 100% produces a fully black-and-white image; values between 0% and 100% produce partial desaturation. To restore color on hover: img { filter: grayscale(100%); transition: filter 0.4s ease; } img:hover { filter: grayscale(0%); }. You can also combine grayscale with contrast for a high-contrast monochrome look: filter: grayscale(100%) contrast(120%). This approach changes only the visual rendering — the original image file is unmodified, and the full-color image is restored instantly if the filter is removed.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CSS Filter Generator',
  url: 'https://webdevpuneet.com/css-filter-generator/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Visual CSS filter generator with live side-by-side preview, 9 filter functions, 10 presets, custom image upload, and instant CSS copy.',
  featureList: ['9 CSS filter functions', 'drop-shadow control', 'Side-by-side live preview', '10 presets', 'Upload custom image', '-webkit-filter output', 'Reset to defaults'],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'CSS Filter Generator', item: 'https://webdevpuneet.com/css-filter-generator/' },
  ],
};

const SEO = {
  slug: 'css-filter-generator',
  title: 'CSS Filter Generator — Visual Image Filter Builder Online',

  about: {
    title: 'Style Any Image With CSS Filters — Blur, Brightness, Sepia, Hue-Rotate — Live Side-by-Side Preview',
    description: `You want to apply a vintage tone to a hero image, desaturate a photo on hover to signal interactivity, or add a CSS drop-shadow that follows the transparent edges of a PNG icon instead of boxing its rectangle. The CSS \`filter\` property handles all of this — but figuring out the right combination of values without a live preview is guesswork. Adjust the sliders here and see the original and filtered images side by side.\n\nNine filter functions with individual sliders: **blur()** for gaussian blur, **brightness()** and **contrast()** for tonal control, **grayscale()** and **sepia()** for color mode, **hue-rotate()** for color wheel shifts, **invert()** for negative effects, **opacity()** and **saturate()** for intensity. The **drop-shadow** panel is separate: it uses the element's alpha channel to cast a shape-aware shadow that follows transparent PNG cutouts — unlike \`box-shadow\` which only casts a rectangular shadow.\n\nFilter functions apply in sequence, left to right, each one operating on the pixel output of the function before it — so \`grayscale(100%) sepia(30%)\` and \`sepia(30%) grayscale(100%)\` are not equivalent, since desaturating first then adding sepia tint produces a different tone than tinting first and then stripping all color. The generator writes functions in a fixed, tested order and drops any function left at its identity value (brightness at 100%, blur at 0px, and so on) so the output stays short and readable instead of listing nine functions every time. Because \`filter\` triggers GPU compositing rather than a full repaint, static filtered elements are cheap, but animating \`blur()\` specifically forces the GPU to re-rasterize every frame — worth knowing before wiring a filter transition to a hover state on a large element, where a lower blur ceiling or a \`will-change: filter\` hint keeps things smooth. It's also worth distinguishing \`filter\` from \`backdrop-filter\`: \`filter\` restyles the element and everything painted inside it, while \`backdrop-filter\` restyles only what's visible behind a semi-transparent element — the mechanism behind frosted-glass overlays, which this tool does not attempt to preview since it needs real content behind the element to blur.\n\nTen preset filter combinations — Vintage, Grayscale, Cold, Warm, High Contrast, Dreamy, Neon, Matte, Night Vision — load as starting points you can refine. Preview on four built-in sample images or upload your own. The generated CSS includes both \`filter\` and \`-webkit-filter\` for full Safari compatibility, and omits any filter functions set to their identity values to keep the output clean.`,
  },

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Start with a preset or from scratch', text: 'Click any of the 10 preset buttons at the top of the left panel to instantly load a pre-designed filter combination. Vintage, Grayscale, Cold, Warm, High Contrast, Dreamy, Neon, Matte, and Night Vision are good starting points. Click None to clear all filters and start from zero.' },
      { title: 'Adjust the filter sliders', text: 'Use the nine filter sliders to fine-tune each CSS function: Blur (0–20px), Brightness (0–300%), Contrast (0–300%), Saturate (0–300%), Grayscale (0–100%), Sepia (0–100%), Hue-Rotate (0–360°), Invert (0–100%), Opacity (0–100%). Type a value directly into the number input for precision. The preview updates in real time.' },
      { title: 'Add a drop-shadow', text: 'In the Drop Shadow section below the filter sliders, toggle the switch to enable it. Set X and Y offset in pixels, the blur radius, the shadow color via color picker, and shadow opacity. The drop-shadow() function traces the element\'s alpha channel — unlike box-shadow it follows the actual shape of transparent PNGs and SVGs.' },
      { title: 'Choose a preview image', text: 'Click any of the four sample image tabs — Landscape, Portrait, City, Color — to switch the preview image. Click Upload to use your own image file from disk. Paste an image URL into the URL input and click Apply to test with a remote image.' },
      { title: 'Compare original vs. filtered', text: 'The right panel always shows the original and filtered images side by side. Every slider change updates the Filtered panel instantly — no need to toggle anything to see the before-and-after comparison.' },
      { title: 'Copy the generated CSS', text: 'Click Copy CSS in the header or output panel to copy the complete filter declaration. The output includes both filter and -webkit-filter for full Safari compatibility, and omits any filter functions that are set to their identity defaults to keep the CSS clean.' },
    ],
  },

  features: [
    '9 CSS filter functions: blur, brightness, contrast, saturate, grayscale, sepia, hue-rotate, invert, opacity',
    'drop-shadow panel with X/Y offset, blur radius, color picker, and opacity control; choose precise colors with our [Color Picker](/color-picker)',
    'Side-by-side original vs. filtered live preview — updates in real time with every slider move',
    '10 built-in presets: Vintage, Grayscale, Cold, Warm, High Contrast, Dreamy, Neon, Matte, Night Vision, None',
    '4 sample preview images + upload your own image file or paste an image URL',
    'Precision numeric inputs alongside each range slider for exact value entry',
    'Generated CSS includes both filter and -webkit-filter for full Safari compatibility',
    'Identity-value omission — default-value functions are excluded from the output to keep CSS clean',
    'Reset to defaults in one click — restores all 9 functions to their neutral values; combine with our [CSS Transform Generator](/css-transform-generator) for positioned effects',
    '100% browser-based — no image or code is sent to any server; build glass overlays using backdrop-filter with our [Glassmorphism Generator](/glassmorphism-generator)',
  ],

  useCases: [
    {
      icon: '◑',
      title: 'Apply a consistent tone or treatment to all images site-wide with one CSS class',
      desc: 'A shared filter class on images is easier to maintain than editing each file. Apply a slight warm tone, a desaturated fade, or a contrast boost to hero images, avatars, and gallery thumbnails — update the entire site by changing one CSS value.',
    },
    {
      icon: '✦',
      title: 'Create Instagram-style photo presets for web images',
      desc: 'Build multi-function filter combinations: the Vintage preset uses warm sepia with reduced saturation and slight contrast boost. Cold shifts hue toward blue with raised contrast for a cinematic look. Start with a preset, then refine the sliders for your specific image.',
    },
    {
      icon: '⚡',
      title: 'Desaturate images at rest and bring them to color on hover',
      desc: 'Set grayscale(100%) on the default state and filter: none on :hover — images appear monochrome at rest and come to life in color when hovered. A clean, minimal interaction pattern that signals the content is clickable.',
    },
    {
      icon: '⬡',
      title: 'Dim images in dark mode without separate dark-mode image assets',
      desc: 'Apply brightness(0.85) contrast(1.05) under a [data-theme="dark"] img selector. Images that appear too bright on dark backgrounds are automatically adjusted when the theme switches — no duplicate image files needed. Build the gradient overlay behind the images with our [Gradient Generator](/gradient-generator).',
    },
    {
      icon: '△',
      title: 'Recolor an SVG icon to match brand colors without editing the SVG source',
      desc: 'Use hue-rotate() and saturate() to shift a blue icon to green, red, or any other hue. Control the color entirely through CSS while maintaining a single SVG file — useful for icon libraries across multiple themed products. Use our [Color Palette Generator](/color-palette-generator) to find the right target hue.',
    },
    {
      icon: '⟳',
      title: 'Create a blurred placeholder state for images while they load',
      desc: 'Combine grayscale(1), opacity(0.6), and blur(2px) on the loading state. Remove the filter class via onload to create a smooth reveal from blurred placeholder to sharp full-color image — no separate skeleton asset needed.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function CssFilterGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><CssFilterGeneratorTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
