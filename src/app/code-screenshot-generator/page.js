import CodeScreenshotTool from '@/components/CodeScreenshotTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Code Screenshot Generator — Beautiful Code Images Online Free | webdevpuneet.com',
  description: 'Create beautiful code screenshots — syntax highlighting for 20+ languages, 9 themes, macOS/Windows frames, and gradients. Download PNG free.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/code-screenshot-generator/' },
  icons: { icon: '/icons/code-screenshot-generator.svg', shortcut: '/icons/code-screenshot-generator.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/code-screenshot-generator/',
    siteName: 'webdevpuneet.com',
    title: 'Code Screenshot Generator — Beautiful Code Images Free',
    description: 'Turn any code snippet into a beautiful image. Pick a theme, language, window frame, and gradient background. Download as PNG instantly.',
    images: [{ url: 'https://webdevpuneet.com/images/code-screenshot-generator.png', width: 1200, height: 630, alt: 'Code Screenshot Generator Online' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Code Screenshot Generator — Beautiful Code Images Online',
    description: 'Turn any code snippet into a stunning PNG. 9 themes, 20+ languages, gradient backgrounds, macOS/Windows frames. Free.',
    images: ['https://webdevpuneet.com/images/code-screenshot-generator.png'],
  },
};

const seo = {
  slug: 'code-screenshot-generator',
  title: 'Code Screenshot Generator — Create Beautiful Code Images Online',
  about: {
    title: 'Turn Any Code Snippet into a Beautiful Shareable Image — Free Carbon.now.sh Alternative',
    description: `You pasted code into a tweet and the formatting disappeared. You're writing a dev blog post and a raw code block looks flat next to your screenshots. You need a slide with a readable snippet but PowerPoint butchers the spacing. Paste the code here, pick a theme, and download a crisp PNG in under 10 seconds — no sign-up, no watermark.\n\nThe highlighting is not an image of your editor — it's a lightweight regex-based tokenizer built into the tool that walks your code character by character, recognizing per-language keyword lists, string and comment delimiters, numbers, HTML tag structure, and CSS property/value pairs, then wraps each token in a themed color from one of nine built-in palettes: One Dark, Dracula, GitHub Dark, Monokai, Nord, Tokyo Night, GitHub Light, Solarized Dark, and Night Owl. This keeps the tool dependency-free and fast, at the cost of not matching a specific editor's TextMate grammar pixel-for-pixel.\n\nWhen you export, the tool doesn't just screenshot the DOM — it redraws the whole card on an offscreen HTML canvas. It measures each character's width at your chosen scale using a hidden canvas context, sizes the card to fit the longest line and total line count, draws the rounded-rectangle card background with a soft drop shadow, paints the window chrome (macOS traffic lights, a Windows title bar, or a terminal prompt), then walks through every token again to fill in the colored text at the correct baseline. Rendering at 1×, 2×, or 3× simply multiplies the canvas dimensions and font metrics before drawing, which is what produces genuinely sharp Retina output instead of a blurry upscaled screenshot.\n\nYour code, theme, font, and layout choices are auto-saved to localStorage on a short debounce so a refresh doesn't lose your work, and Reset clears that saved state. The finished canvas can be downloaded as a PNG or copied straight to your clipboard via the browser's Clipboard API for pasting into Slack, Notion, or Figma — no upload, ever, since every pixel is generated locally in your browser.`,
  },
  features: [
    '9 professional themes: One Dark, Dracula, GitHub Dark, Monokai, Nord, Tokyo Night, GitHub Light, Solarized Dark, Night Owl',
    'Syntax highlighting for 20+ languages: JS, TS, Python, HTML, CSS, JSON, SQL, Go, Rust, Java, C, C++, C#, Bash, PHP, Ruby, Swift, Kotlin, YAML and more; format JSON before screenshotting with our [JSON Formatter](/json-formatter/)',
    'Window frame styles: macOS (traffic lights), Windows title bar, Terminal, or no frame',
    '10 gradient backgrounds plus solid color picker with full hex control; create mesh gradient backgrounds with our [Mesh Gradient Generator](/mesh-gradient-generator)',
    'Toggle line numbers on/off for clean or annotated screenshots',
    'Adjustable font size (10–22px) and padding (8–80px) for perfect framing',
    'Choose from JetBrains Mono, Fira Code, Source Code Pro, Cascadia Code, and more',
    'Export at 1×, 2× or 3× pixel density for crisp Retina/HiDPI images; compress the PNG with our [Image Compressor](https://fwdtools.com/image-compressor/)',
    'Optional file title in the window chrome for realistic editor screenshots',
    'Line wrap toggle for long lines or narrow export widths',
    'Copy image to clipboard with one click — paste directly into Slack, Notion, or Figma',
    'Download as PNG — no watermark, no sign-up, no file size limits',
  ],
  useCases: [
    { icon: '🐦', title: 'Share a code snippet on Twitter/X or LinkedIn without losing formatting', desc: 'Paste into a tweet as an image instead of plain text — syntax highlighting is preserved and the code is readable at any size.' },
    { icon: '✍️', title: 'Add a polished code image to a blog post or tutorial', desc: 'Plain code blocks in Markdown look fine, but a styled screenshot with the right theme and padding looks intentional. Export at 2× or 3× for sharp rendering on Retina screens.' },
    { icon: '🎤', title: 'Create a readable code slide for a conference talk or meetup', desc: 'Paste the snippet, set a large font size and generous padding, and export a clean image. No more copying a PowerPoint screenshot that blurs the indentation.' },
    { icon: '💬', title: 'Post a code review example in Slack or Discord with full syntax coloring', desc: 'Paste the image directly into Slack using Copy Image — no upload step, just Ctrl+V.' },
    { icon: '🗂️', title: 'Add a highlighted code example to a GitHub README or portfolio', desc: 'Use the 2× or 3× export for sharp rendering in GitHub\'s markdown preview and on portfolio sites.' },
    { icon: '🎬', title: 'Generate a code image for a YouTube thumbnail or course material', desc: 'Export at 3× scale for the highest quality. The wide padding and gradient background options match standard thumbnail aspect ratios well.' },
    { icon: '📰', title: 'Create consistent branded code visuals for a developer newsletter', desc: 'Use the same theme and gradient for every issue to create visual consistency across emails and social content.' },
    { icon: '📖', title: 'Show API usage or CLI commands in product documentation', desc: 'A styled screenshot is faster to embed in a doc than configuring a code block plugin — and it renders consistently across every documentation platform. Generate the meta tags for that doc page with our [Meta Tag Generator](https://fwdtools.com/meta-tag-generator/).' },
  ],
  howToUse: `**Step 1 — Paste your code.** Click into the "Code Input" textarea and paste any code snippet. You can also type directly. The preview updates in real time as you type.

**Step 2 — Select the language.** Use the Language dropdown to tell the highlighter what language your code is. Correct language selection dramatically improves highlighting accuracy — pick from JavaScript, TypeScript, Python, HTML, CSS, SQL, Go, Rust, Java, Bash, and 13 more.

**Step 3 — Choose a theme.** Click any theme tile in the sidebar. Nine themes are available — from dark workhorses like One Dark and Dracula to light options like GitHub Light. The preview updates instantly so you can compare themes without clicking elsewhere.

**Step 4 — Pick a window frame.** Select macOS for the classic colored dot chrome, Windows for a title-bar style, Terminal for a minimal prompt header, or None for a fully frameless card. Optionally set a title (like \`index.js\` or \`main.py\`) to show in the window chrome.

**Step 5 — Set your background.** Switch between Gradient and Solid in the Background section. Ten preset gradients are available — Midnight, Ocean, Sunset, Aurora, Rose, Dusk, Forest, Amber, Slate, and Transparent. For solid color, use the color picker to choose any hex color.

**Step 6 — Fine-tune typography and padding.** Drag the Font Size slider (10–22px) and Padding slider (8–80px) to frame your code perfectly. Switch the font between JetBrains Mono, Fira Code, Source Code Pro, Cascadia Code, or Inconsolata.

**Step 7 — Set export resolution.** Choose 1×, 2×, or 3× scale for the download. Use 2× or 3× for Retina displays and high-quality social media posts. 1× is sufficient for small in-line uses.

**Step 8 — Export.** Click "↓ Download PNG" to save a crisp PNG file directly to your computer. Or click "Copy Image" to put the image on your clipboard and paste it straight into Slack, Twitter, Notion, Figma, or any image-accepting app.`,
  faqs: [
    {
      q: 'Is there a free Carbon.now.sh alternative that doesn\'t upload my code?',
      a: 'Yes — this tool covers all the core Carbon features (themes, languages, window frames, gradient backgrounds, PNG download) with a privacy-first approach. All processing runs entirely in your browser. Your code is never uploaded to any server, never stored, and never logged. It works fully offline once the page has loaded.',
    },
    {
      q: 'How do I create a beautiful code screenshot for Twitter or a blog post?',
      a: 'Paste your code, select the language, choose a theme (One Dark and Dracula are popular for social sharing), set a gradient background, and click Download PNG. For Retina-quality output that looks sharp on social media, set Export Scale to 2× or 3× before downloading.',
    },
    {
      q: 'What programming languages support syntax highlighting?',
      a: 'JavaScript, TypeScript, JSX, TSX, Python, HTML, CSS, JSON, Bash, SQL, Java, C, C++, C#, Go, Rust, Ruby, PHP, Swift, Kotlin, YAML, and Plain Text — 22 languages total.',
    },
    {
      q: 'What themes are available?',
      a: 'Nine professionally calibrated themes: One Dark, Dracula, GitHub Dark, Monokai, Nord, Tokyo Night, GitHub Light, Solarized Dark, and Night Owl. The preview updates instantly when you switch themes so you can compare without any delay.',
    },
    {
      q: 'How do I get a high-resolution PNG for social media or a YouTube thumbnail?',
      a: 'Set Export Scale to 2× or 3× before downloading. This produces a PNG that is 2× or 3× the pixel dimensions of the on-screen preview — sharp on Retina displays and high-quality enough for social media and video thumbnails.',
    },
    {
      q: 'How do I copy the code image directly to clipboard for Slack or Notion?',
      a: 'Click the Copy Image button. On Chrome, Edge, and modern Safari the image is placed on your clipboard and you can paste it directly into Slack, Notion, Figma, Twitter, or any app that accepts pasted images — no download needed.',
    },
    {
      q: 'Can I use a transparent background?',
      a: 'Yes. In the Background section, select Gradient, then choose the Transparent chip (the checkered tile). The downloaded PNG will have a transparent background, useful for placing the code card on any colored surface in a presentation or design tool.',
    },
    {
      q: 'What is the difference between the macOS, Windows, and Terminal window frames?',
      a: 'macOS shows three colored traffic-light buttons (red, yellow, green) at the top left. Windows shows a title bar with minimize/maximize/close icons at the top right. Terminal shows a minimal prompt-style header. None removes all chrome and shows just the code card.',
    },
    {
      q: 'What fonts can I use for the code screenshot?',
      a: 'JetBrains Mono, Fira Code, Source Code Pro, Cascadia Code, Inconsolata, and the system default monospace — six options covering the most popular programming fonts for readability.',
    },
    {
      q: 'Why does the syntax highlighting look slightly different from my editor?',
      a: 'This tool uses a lightweight browser-side tokenizer for fast, zero-dependency operation. It covers the most common token types accurately. Full fidelity to a specific editor theme would require bundling TextMate grammar files, which would significantly increase page load time.',
    },
  ],
  schema: [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Code Screenshot Generator',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      url: 'https://webdevpuneet.com/code-screenshot-generator/',
      description: 'Create beautiful code screenshots with syntax highlighting, themes, and gradient backgrounds. Free, no sign-up.',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      featureList: [
        '9 syntax highlight themes',
        '22 programming languages',
        'Window frame styles (macOS, Windows, Terminal)',
        'Gradient and solid backgrounds',
        'PNG download at 1×/2×/3× scale',
        'Copy image to clipboard',
        'No account required',
        'Privacy-first: runs in browser',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'Is the Code Screenshot Generator free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, completely free with no watermarks or sign-up required.' } },
        { '@type': 'Question', name: 'Does my code get uploaded to a server?', acceptedAnswer: { '@type': 'Answer', text: 'No. All processing runs in your browser. Your code never leaves your device.' } },
        { '@type': 'Question', name: 'What themes are available?', acceptedAnswer: { '@type': 'Answer', text: 'One Dark, Dracula, GitHub Dark, Monokai, Nord, Tokyo Night, GitHub Light, Solarized Dark, and Night Owl.' } },
        { '@type': 'Question', name: 'Is this a Carbon.now.sh alternative?', acceptedAnswer: { '@type': 'Answer', text: 'Yes — it covers all core Carbon features with a privacy-first, zero-upload approach.' } },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'FWD Tools', item: 'https://fwdtools.com' },
        { '@type': 'ListItem', position: 2, name: 'Code Screenshot Generator', item: 'https://webdevpuneet.com/code-screenshot-generator/' },
      ],
    },
  ],
};

export default function Page() {
  return (
    <div className={styles.page}>
      <div className={styles.toolSection}>
        <CodeScreenshotTool />
      </div>
      <AdSlot />
      <IndexOnly><SeoSection {...seo} /></IndexOnly>


    </div>
  );
}
