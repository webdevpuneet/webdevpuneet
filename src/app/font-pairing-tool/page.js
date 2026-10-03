import FontPairingTool from '@/components/FontPairingTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Font Pairing Tool — Free Google Font Combinations & Typography | webdevpuneet.com',
  description: 'Free Google Font pairing tool. Browse curated heading & body font combinations with live preview. Adjust sizes, preview your content, export CSS @import. No sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/font-pairing-tool/' },
  icons: { icon: '/icons/font-pairing-tool.svg', shortcut: '/icons/font-pairing-tool.svg' },
  openGraph: { type: 'website', url: 'https://webdevpuneet.com/font-pairing-tool/', siteName: 'webdevpuneet.com', title: 'Google Font Pairing Tool — Curated Font Combinations', description: 'Browse curated Google Font pairs with live preview. Adjust sizes, preview your text, export CSS. Free, no sign-up.', images: [{ url: 'https://webdevpuneet.com/images/font-pairing-tool.png', width: 1200, height: 630, alt: 'Google Font Pairing Tool' }], locale: 'en_US' },
  twitter: { card: 'summary_large_image', site: '@webdevpuneet', title: 'Google Font Pairing Tool — Curated Combinations', description: 'Browse curated Google Font pairs with live preview and CSS export. Free, no sign-up.', images: ['https://webdevpuneet.com/images/font-pairing-tool.png'] },
};

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'What is font pairing?', acceptedAnswer: { '@type': 'Answer', text: 'Font pairing is the practice of selecting two complementary typefaces — typically one for headings and one for body text — that create a clear visual hierarchy while working harmoniously together in a design. A good pairing contrasts enough to signal the difference between heading and body, but shares enough proportional similarities to feel cohesive rather than random. The most established convention is pairing a serif or display font for headings with a clean sans-serif for body text, though many effective modern pairings use two sans-serifs of contrasting weight and personality.' } },
    { '@type': 'Question', name: 'Why use Google Fonts specifically?', acceptedAnswer: { '@type': 'Answer', text: 'Google Fonts is the most widely-used web font platform in the world, hosting over 1,500 typeface families that are free, open-source, and served from Google\'s globally distributed CDN. Using Google Fonts requires only a single @import link in your CSS — no font file hosting, no font subsetting, no self-hosting setup required. The CDN caches fonts aggressively in browsers, so visitors who have already encountered a Google Font on any website will load it instantly from cache. All fonts are licensed under SIL Open Font License or Apache License 2.0, making them free for personal and commercial use with no attribution requirement.' } },
    { '@type': 'Question', name: 'What makes a good font pairing?', acceptedAnswer: { '@type': 'Answer', text: 'The most reliable pairing principle is contrast with harmony: the two fonts should look different enough that the distinction between heading and body is obvious at a glance, but share enough underlying proportions — x-height, cap height, general letter width — to feel like they belong in the same design. Contrasting a serif with a sans-serif is the traditional approach, but pairing two sans-serifs of dramatically different weight also works well. Matching fonts from the same designer or type family guarantees compatibility and is a reliable fallback when exploring is difficult.' } },
    { '@type': 'Question', name: 'Can I preview my own text?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Click on the heading or body paragraph areas in the preview and type or paste your own content — your actual product name, article title, or body copy renders immediately in the selected fonts at your chosen sizes. Testing with real copy is critical: some fonts that look beautiful with generic placeholder text can feel awkward with specific letter combinations or the actual words from your project. Always test with words from your own content before finalizing a font pairing.' } },
    { '@type': 'Question', name: 'How do I use the fonts in my project?', acceptedAnswer: { '@type': 'Answer', text: 'Click Export CSS to copy the complete Google Fonts @import statement and the CSS font-family declarations for both heading and body elements. Paste the @import at the top of your main stylesheet or inside a <link> tag in your HTML <head>. Then apply the font-family values from the export to your heading elements (h1–h6) and body element in your CSS. The Google Fonts CDN delivers only the character sets and weights specified in the URL, keeping the page load footprint small.' } },
    { '@type': 'Question', name: 'Are Google Fonts free for commercial use?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every font served by Google Fonts is licensed under the SIL Open Font License (OFL) or the Apache License 2.0, both of which permit free use in personal and commercial projects with no royalties, no attribution requirement, and no restriction on the number of websites or users. You can use Google Fonts in client work, SaaS products, mobile apps, print materials, and any other medium without any licensing cost or legal obligation.' } },
    { '@type': 'Question', name: 'Can I adjust font sizes in the preview?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The Heading Size slider adjusts the display heading from approximately 20px to 72px — useful for testing how a font holds up at large display sizes where individual letterform details become visible. The Body Size slider adjusts the body text from 13px to 22px, covering the full range from compact UI text to comfortable long-form reading sizes. Both sliders update the preview in real time so you can judge readability at your actual target sizes before committing to a pairing.' } },
    { '@type': 'Question', name: 'Can I filter font pairs by style category?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. The category filter tabs let you narrow the pairing list to specific combination types: Serif/Sans for traditional classic pairings, Display/Sans for expressive headings with neutral body text, Geometric/Humanist, Slab/Sans, and more. Filtering helps when you have a specific design personality in mind — a fashion brand needs different typography from a developer tool or a medical publication — and the categories reflect those use-case differences.' } },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Google Font Pairing Tool',
  url: 'https://webdevpuneet.com/font-pairing-tool/',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online Google Font pairing tool with 18 curated heading and body font combinations, live preview, size sliders, and CSS export.',
  featureList: ['18 curated font pairs', 'Live Google Fonts API rendering', 'Heading and body size sliders', 'Editable preview text', 'Category filter', 'CSS @import export'],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'Font Pairing Tool', item: 'https://webdevpuneet.com/font-pairing-tool/' },
  ],
};

const SEO = {
  slug: 'font-pairing-tool',
  title: 'Google Font Pairing Tool — Curated Font Combinations',

  about: {
    title: 'Find the Right Google Font Pairing — Preview at Your Sizes, Export the CSS @import',
    description: `You're choosing fonts for a new project and you've scrolled Google Fonts for an hour comparing individual typefaces — but they only show one font at a time and you need to see a heading and body paragraph together at real sizes with your actual copy. Browse curated heading-and-body pairs here, click one to load both fonts live, and type your real content into the preview. No account, no install, no third-party dependency — just the fonts, your text, and the CSS to ship it.\n\nThe classic pairing principle is **contrast with harmony** — the heading and body should look different enough that hierarchy is obvious at a glance, but share enough underlying proportions (x-height, letter width, general weight) to feel like they belong in the same design. The curated pairs cover the most useful archetypes: **Serif/Sans** for editorial authority and long-form reading, **Display/Geometric** for modern SaaS and tech products, **Slab/Sans** for bold editorial and news, **Script/Humanist** for creative and lifestyle brands, and **Mono** pairs for developer tools and technical documentation. The **category filter tabs** let you narrow to pair types that match your project's visual personality — a legal firm needs different typography than a fintech startup or a creative portfolio.\n\nEach pair loads through the **Google Fonts API** so the preview renders the actual typefaces — not substitutes or approximations. Adjust the **heading size slider** (16–72px) to test whether a typeface that looks elegant at 24px still holds up at a 64px hero heading, and the **body size slider** (13–22px) to verify readability at your actual target line length. The preview shows a full display heading, a sub-heading, and a complete body paragraph so you can evaluate the full typographic hierarchy together. The most important step is replacing the sample text with your own project's copy — seeing your actual product name, tagline, and article text in the font is what reveals whether a pairing truly works. Click **Export CSS** to copy the \`@import\` URL and \`font-family\` declarations for both fonts, ready to paste into your stylesheet, Tailwind config, or CSS module.`,
  },

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Filter by category and browse pairs', text: 'Use the Category filter tabs — All, Serif/Sans, Display/Sans, Mono, and more — to narrow the list to pairs that suit your project personality. Browse the curated list in the left panel — each entry shows the heading font name and the body font name paired together.' },
      { title: 'Click a pair to load it live', text: 'Click any font pair to immediately load both fonts via the Google Fonts API and render them in the live preview panel on the right. The preview shows a display heading, a sub-heading, and a full paragraph of body text at proportional sizes.' },
      { title: 'Adjust heading and body sizes', text: 'Use the Heading Size slider to adjust the heading font from 16px to 72px — useful for checking whether a font that looks good at 24px still works well at 64px as a hero heading. Use the Body Size slider to change body text from 13px to 22px to verify readability at your target size.' },
      { title: 'Type your own content into the preview', text: 'Replace the sample text by clicking on the heading or body text areas and typing directly. This is the most important step — seeing your actual product name, tagline, or article copy in the font tells you far more than generic placeholder text.' },
      { title: 'Export the CSS @import', text: 'Click Export CSS to copy the Google Fonts @import URL and the CSS font-family declarations for both heading and body elements. Paste directly into your stylesheet or CSS module — the CDN delivers only the character sets and weights specified in the URL.' },
    ],
  },

  features: [
    'Curated Google Font pairs across editorial, tech, fashion, creative, and developer categories — each combination hand-selected for visual harmony and contrast',
    'Live Google Fonts API loading — previews render the actual typefaces directly from Google CDN, not substitutes or fallback approximations',
    'Full typographic hierarchy preview — display heading, sub-heading, and body paragraph shown together at proportional sizes',
    'Heading size slider 16–72px — test whether a typeface that looks elegant at small sizes still works as a large hero display heading',
    'Body size slider 13–22px — verify readability and line density at your actual target body text size before committing',
    'Editable preview text — click heading or body areas and type your actual product name, tagline, or article copy for real-world testing',
    'Category filter tabs — Serif/Sans, Display/Sans, Display/Geometric, Slab/Sans, Script, Mono/Sans and more to narrow by design personality',
    'Export CSS — copies the Google Fonts @import URL and font-family declarations for both heading and body; paste directly into any stylesheet',
    'Free, open-source fonts — every pair uses SIL OFL or Apache 2.0 licensed fonts, free for commercial use with no royalties; apply fluid sizes with our [CSS Clamp() Generator](/css-clamp-generator)',
    '100% browser-based — no account required; font loading uses the Google CDN and all rendering runs client-side; build your full color palette alongside with our [Color Palette Generator](/color-palette-generator)',
  ],

  useCases: [
    {
      icon: '◑',
      title: 'Pick a heading and body font combination for a new website and get the CSS @import',
      desc: 'Browse heading-and-body pairs filtered by personality — editorial, tech, fashion, creative — and preview your actual page title before committing. Export the @import link and font-family declarations to drop straight into your stylesheet. Then set fluid font sizes with our [CSS Clamp() Generator](/css-clamp-generator).',
    },
    {
      icon: '▦',
      title: 'Choose fonts that communicate the right personality for a brand identity',
      desc: 'Type choices convey brand personality more persistently than color. Test Serif/Sans, Display/Geometric, and Script/Humanist archetypes against your brand name and tagline — a clean geometric sans projects modernity, a bracketed serif projects authority, a hand-drawn display projects creativity.',
    },
    {
      icon: '◎',
      title: 'Find a readable body font for a blog or editorial publication',
      desc: 'Long-form reading quality depends on body font x-height, open counters, and letter-spacing. The curated pairs include editorial-optimized combinations — high-contrast display headings with body fonts like Inter, Lato, or Source Serif Pro — test them at your target body size (14–18px).',
    },
    {
      icon: '✦',
      title: 'Choose a font pair for a SaaS UI that balances brand expression with readability',
      desc: 'Product UIs favor clean sans-serif body fonts with slightly more expressive headings. Filter by Geometric/Humanist and test at typical UI sizes (14–16px) to check that the pair works on data-dense screens and not just in hero type.',
    },
    {
      icon: '≡',
      title: 'Show a client the font pair at your actual target sizes with their real copy',
      desc: 'Communicating type decisions requires rendering the fonts, not just naming them. Replace the sample text with your client\'s product name and tagline, set the heading to the sizes in your design spec, and share the page or export the CSS for the development team. Define the accompanying color palette with our [Color Palette Generator](/color-palette-generator).',
    },
    {
      icon: '⚙',
      title: 'Study classic font pairings to understand why some combinations work and others do not',
      desc: 'Browse pairings like Playfair Display + Source Sans or Roboto + Merriweather and analyze the contrast in stroke weight, x-height, and letter width between the heading and body fonts. Seeing both rendered at size with real text builds intuition faster than theory alone. Convert reference px sizes to rem with our [REM to PX Converter](/rem-px-converter/).',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function FontPairingToolPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><FontPairingTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>

    </div>
  );
}
