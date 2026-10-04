import LoremIpsumGenerator from '@/components/LoremIpsumGenerator';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Lorem Ipsum Generator — Free Placeholder Text Online | webdevpuneet.com',
  description: 'Generate lorem ipsum placeholder text instantly — paragraphs, sentences, or words, with optional HTML tags and length control. Free, no sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/lorem-ipsum-generator/' },
  icons: { icon: '/icons/lorem-ipsum-generator.svg', shortcut: '/icons/lorem-ipsum-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/lorem-ipsum-generator/',
    siteName: 'webdevpuneet.com',
    title: 'Lorem Ipsum Generator — Free Placeholder Text Online',
    description: 'Generate lorem ipsum placeholder text in paragraphs, sentences, or words. Control length, wrap in HTML, and copy instantly. Free and browser-based.',
    images: [{ url: 'https://webdevpuneet.com/images/lorem-ipsum-generator.png', width: 1200, height: 630, alt: 'Lorem Ipsum Generator Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Lorem Ipsum Generator — Free Placeholder Text Online',
    description: 'Generate lorem ipsum placeholder text in paragraphs, sentences, or words. Wrap in HTML, control sentence length, copy instantly. Free, no sign-up.',
    images: ['https://webdevpuneet.com/images/lorem-ipsum-generator.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is lorem ipsum and why do designers use it?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lorem ipsum is a scrambled excerpt from "de Finibus Bonorum et Malorum" (On the Ends of Good and Evil), a philosophical work by Cicero written in 45 BC. Richard McClintock, a Latin scholar, identified the source in the 1990s. Designers and typographers use lorem ipsum as placeholder text because it approximates the appearance of real English prose — similar average word length, natural spacing — without the distraction of meaningful content. When reviewers read real text in a layout mockup, they focus on the words instead of the design. Lorem ipsum keeps the focus on typography, layout, and visual composition rather than copywriting.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I generate lorem ipsum text online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Use this lorem ipsum generator: select whether you want Paragraphs, Sentences, or Words using the segmented control at the top. Drag the slider or type a number to set how many you want — up to 20 paragraphs, 50 sentences, or 500 words. Toggle "Start with Lorem ipsum…" if you want the classic opening phrase. Toggle "Wrap in HTML <p> tags" if you are pasting into an HTML document or CMS. Click Generate. The placeholder text appears in the output area and can be copied with the Copy button. The text is generated entirely in your browser — no server is involved.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I generate lorem ipsum paragraphs for a website mockup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Set the type to Paragraphs and choose a count — typically 3–5 paragraphs per page section. Enable the HTML <p> tags toggle so the output is ready to paste directly into your HTML file, React component, or CMS editor. Each paragraph will be wrapped in <p>…</p> tags with a line break between them. If you want more natural variation, use the Min/Max controls for sentences per paragraph (3–6 is standard prose) and words per sentence (8–18 is typical for web content). The generator randomizes within those bounds each time you click Generate.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between lorem ipsum paragraphs, sentences, and words?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Paragraphs mode generates full blocks of text, each containing multiple sentences. Use this when you are mocking up blog posts, article pages, product descriptions, or any layout that uses long-form text. Sentences mode generates individual sentences separated by spaces — useful for filling single-line UI elements like testimonials, card descriptions, or form field hints. Words mode generates a single sequence of randomly selected lorem ipsum words without punctuation — useful when you need a precise word count, filling a text label, or testing character limits in a component.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I generate lorem ipsum with HTML paragraph tags?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — toggle the "Wrap in HTML <p> tags" option before clicking Generate. When enabled, each paragraph is wrapped in an opening <p> and closing </p> tag, with a newline between paragraphs. The output is ready to paste directly into an HTML file, a React JSX component (add dangerouslySetInnerHTML if needed), a WordPress editor in Code view, a Webflow embed block, or any CMS rich-text field that accepts HTML. Sentence and word modes wrap the entire output in a single <p> tag when HTML mode is on.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many lorem ipsum words or paragraphs should I use for a layout?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For a hero section or short description, use 1–2 sentences (about 15–30 words). For a card grid where each card has body text, use 2–3 sentences per card. For a blog post or article body, use 3–7 paragraphs to fill the content area without excessive scrolling. For a full page mockup with header, body, and sidebar, use 5–10 paragraphs total. If you are testing responsive behavior, generate enough text to force the layout to wrap at multiple breakpoints — typically 5–8 paragraphs for a two-column layout.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is lorem ipsum text safe to use in production websites?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No — lorem ipsum is only for prototyping and design mockups, not production content. Publishing lorem ipsum text on a live website creates a poor user experience, signals to search engines that the page has no real content (which harms SEO rankings), and may confuse visitors or clients who see the mockup accidentally. Before launching any website, replace all placeholder text with real, keyword-targeted copy. Use this tool during the design and development phase only, and treat any lorem ipsum on a staging or preview URL as a reminder that the page is incomplete.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does this lorem ipsum generator save or send my data anywhere?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No — the lorem ipsum generator runs entirely in your browser using JavaScript. No text is sent to any server, logged, or stored. All generation happens locally on your device the moment you click Generate. This means the tool works offline once the page is loaded, and there is no privacy concern associated with using it for sensitive project names, internal design mockups, or client work.',
      },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Lorem Ipsum Generator',
  url: 'https://webdevpuneet.com/lorem-ipsum-generator/',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free online lorem ipsum generator. Generate placeholder text as paragraphs, sentences, or words with HTML wrapping option and adjustable length controls.',
  featureList: [
    'Generate lorem ipsum paragraphs, sentences, or words',
    'Adjustable min/max sentences per paragraph and words per sentence',
    'Classic "Lorem ipsum dolor sit amet" opening option',
    'Wrap output in HTML <p> tags for direct paste into HTML/CMS',
    'Slider + number input for precise count control',
    '100% browser-based — no server, no data sent',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'Lorem Ipsum Generator', item: 'https://webdevpuneet.com/lorem-ipsum-generator/' },
  ],
};

const SEO = {
  slug: 'lorem-ipsum-generator',
  title: 'Lorem Ipsum Generator — Free Placeholder Text for Designers & Developers',

  about: {
    title: 'Lorem Ipsum Generator — Free Placeholder Text for Websites, Mockups & Prototypes',
    description: 'You need placeholder text and you need it now. Paste a paragraph count into this lorem ipsum generator, click Generate, and copy the text directly into your Figma mockup, HTML template, React component, or CMS editor — in under five seconds.\n\nLorem ipsum text has been the standard placeholder for typographers since the 1500s, when an unknown printer scrambled a passage from Cicero to fill a type specimen book. The text looks like Latin but is deliberately meaningless, so your eye focuses on the font, line spacing, column width, and visual rhythm of the layout — not on what the words say. That is why every design tool from Figma to Webflow ships a lorem ipsum generator, and why designers reach for it on every project.\n\nThis generator gives you three output modes: **Paragraphs** for full blocks of multi-sentence text, **Sentences** for short one-line fills, and **Words** for precise word counts. You can control exactly how much variation you get — set the minimum and maximum number of sentences per paragraph, and the minimum and maximum number of words per sentence. This means you can match the density of real content in your specific design. A marketing landing page uses short punchy paragraphs (2–3 sentences, 8–12 words each). A blog post or documentation page uses longer paragraphs (4–6 sentences, 12–20 words each). Set the sliders to match and the placeholder will fill your layout naturally.\n\nThe **HTML wrapping** toggle is a time-saver for developers. When on, every paragraph is wrapped in `<p>` tags, ready to paste into an HTML file, a JSX component, a WordPress page in Code view, or a Webflow HTML embed. No manual wrapping needed.\n\nThe **"Start with Lorem ipsum…"** toggle preserves the classic opening phrase — "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." — which many clients and stakeholders recognize as placeholder text, signalling clearly that the content is not final. Turn it off when you want completely random text that does not visually call out "this is a wireframe."\n\nEverything runs in your browser. No account, no login, no text sent to any server. The generator works offline once the page has loaded.',
  },

  howToUse: {
    type: 'steps',
    items: [
      { title: 'Choose output type and count', text: 'Select Paragraphs for full blocks of text, Sentences for individual sentence fills, or Words for a flat word count. Use the slider or number input to set how many you need — up to 20 paragraphs, 50 sentences, or 500 words.' },
      { title: 'Adjust sentence and word length ranges', text: 'For Paragraphs and Sentences modes, set the min and max sentences per paragraph and the min and max words per sentence. Short sentences (6–10 words) match punchy UI copy; longer sentences (12–20 words) match editorial and documentation layouts.' },
      { title: 'Toggle the classic opening phrase', text: 'Turn on "Start with Lorem ipsum…" to begin with the universally recognized "Lorem ipsum dolor sit amet" phrase — signaling clearly to stakeholders that the content is placeholder, not final copy.' },
      { title: 'Enable HTML wrapping if needed', text: 'Toggle "Wrap in HTML <p> tags" on if you are pasting into an HTML file, a React component, or a CMS that accepts raw HTML. Each paragraph will be wrapped in <p>…</p> tags — no manual tag insertion needed.' },
      { title: 'Generate and copy', text: 'Click the Generate button. The text appears in the output area. Click Copy to copy the full output to your clipboard and paste it into Figma, VS Code, WordPress, Webflow, or any editor. Click Generate again for a new random variation with the same settings.' },
    ],
  },

  features: [
    'Generate lorem ipsum paragraphs — multiple sentences per block, ideal for filling blog post bodies, article sections, and long-form content mockups',
    'Generate lorem ipsum sentences — single-sentence fills for card descriptions, testimonial slots, product taglines, and form placeholder hints',
    'Generate lorem ipsum words — precise word-count fills for testing character limits, text labels, and navigation items',
    'HTML <p> tag wrapping — output ready to paste into HTML files, JSX components, WordPress code view, and Webflow embeds without manual tag insertion',
    'Classic "Lorem ipsum dolor sit amet" opening toggle — preserves the universally recognized first line so stakeholders immediately identify placeholder content',
    'Min/max sentences per paragraph control — set a range (e.g., 3–6) to vary paragraph density and match the natural rhythm of real prose',
    'Min/max words per sentence control — short sentences (6–10 words) for punchy UI copy, longer sentences (12–20 words) for editorial and documentation layouts',
    'Slider + number input for count — drag for quick approximate counts or type exact values; both controls stay in sync',
    'Instant copy with one click — no selection needed; the full output copies to clipboard and the button confirms with a checkmark',
    '100% browser-based — no server, no sign-up, no data sent; works offline once loaded and is safe for confidential project mockups',
  ],

  useCases: [
    {
      icon: '◑',
      title: 'Fill Figma and Sketch mockups with lorem ipsum placeholder text',
      desc: 'Generate 3–5 lorem ipsum paragraphs and paste them into Figma text layers to simulate how a real article or blog post will flow across your layout. Adjust the words-per-sentence range to match the reading level of your target audience — short sentences for consumer apps, longer for editorial or documentation sites. Enable HTML wrapping if you are copying the text into a Figma prototype that renders HTML. Use the [Word Counter](https://fwdtools.com/word-counter/) afterward to verify the approximate reading time matches your design requirements.',
    },
    {
      icon: '⚡',
      title: 'Populate HTML templates and React components with dummy content',
      desc: 'Toggle the HTML <p> tags option and generate the exact number of paragraphs your component needs. Paste directly into your JSX file between the container div and the output is valid HTML without any editing. For components that iterate over an array of text blocks, generate 5–10 paragraphs and split on double newlines to create an array. Combine with our [JSON Formatter](/json-formatter) if you need the placeholder content structured as JSON for a mock API response.',
    },
    {
      icon: '▦',
      title: 'Test typography and line spacing in web design layouts',
      desc: 'Use lorem ipsum generator output to test how your chosen typeface renders at different line lengths and weights. Generate 6–8 paragraphs to create enough text to scroll through at least two full viewport heights — this reveals whether your line-height, margin-bottom, and max-width values create a comfortable reading rhythm. Sentence mode fills short single-column callouts and pull-quotes. Words mode lets you fill a fixed-width label to see exactly how text truncates with overflow ellipsis.',
    },
    {
      icon: '⊞',
      title: 'Generate lorem ipsum for WordPress, Webflow, and CMS editors',
      desc: 'Enable HTML wrapping, generate your desired number of paragraphs, and paste into the WordPress editor in Code (HTML) view, a Webflow rich-text element, Squarespace page section, or any CMS field that accepts HTML. The output uses plain semantic <p> tags compatible with every CMS. To fill a multi-post archive page for a staging site, generate 5 separate batches of 3–4 paragraphs and paste one batch per post. Use our [Meta Tag Generator](https://fwdtools.com/meta-tag-generator/) to also fill placeholder meta descriptions while building out the staging environment.',
    },
    {
      icon: '⬡',
      title: 'Fill responsive layout breakpoints with placeholder text for testing',
      desc: 'Generate 8–10 paragraphs to stress-test how your layout reflows at mobile, tablet, and desktop breakpoints. Long lorem ipsum blocks expose issues with column collapse, font-size scaling, and overflow on small screens that short placeholder text misses. Use the [Responsive Preview Tool](/responsive-preview-tool) to view your layout across multiple device widths while the lorem ipsum fills the content area at a realistic density.',
    },
    {
      icon: '△',
      title: 'Create content briefs and document templates with filler text',
      desc: 'Use lorem ipsum sentences to fill placeholder sections in Google Docs or Notion content templates — section headers, introduction paragraphs, and body copy slots — so the template visually communicates the intended document structure to a new writer. Set a word count per section using the Words mode to communicate the expected content length. For example, an introduction section might specify "~120 words" — generate 120 lorem ipsum words to fill that slot as a visual reference.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function LoremIpsumGeneratorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><LoremIpsumGenerator /></div>
      <IndexOnly><AdSlot />
      <SeoSection heading="Free Lorem Ipsum Generator — Placeholder Text for Designers & Developers" {...SEO} /></IndexOnly>

    </div>
  );
}
