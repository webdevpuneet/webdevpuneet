import MermaidEditorTool from '@/components/MermaidEditorTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

const OG_IMAGE = 'https://webdevpuneet.com/images/mermaid-diagram-editor.png';
const URL = 'https://webdevpuneet.com/mermaid-diagram-editor/';

const howToSteps = [
  { title: 'Paste your Mermaid code', text: 'Paste the code an AI assistant gave you, or pick a diagram type from Start from to load a working example. The preview draws as you type, after a short pause.' },
  { title: 'Fix any error it reports', text: 'If the code has a mistake, the line number is highlighted in the editor and a plain-English message appears under it. The preview keeps showing the last working version so you can see what changed.' },
  { title: 'Choose a theme', text: 'Pick Default, Neutral, Forest, Dark or Base. Choosing Dark also switches the background to dark, and you can change the export background to white, transparent or dark at any time.' },
  { title: 'Zoom and move around', text: 'Drag the diagram to move it, hold Ctrl (or Cmd on a Mac) and scroll to zoom, or use the plus and minus buttons. Reset puts it back in the middle.' },
  { title: 'Export the diagram', text: 'Download SVG for a sharp image that scales, PNG for slides and documents, or PNG 4x for a large, crisp image. Copy SVG puts the markup on your clipboard.' },
  { title: 'Copy it for Markdown', text: 'Copy for Markdown wraps your code in a mermaid code block, which GitHub, GitLab, Notion and many docs tools render as a diagram.' },
  { title: 'Share a link', text: 'Share link copies a web address with the whole diagram stored inside it. Anyone who opens it sees the same diagram and can edit their own copy. Nothing is saved on a server.' },
];

export const metadata = {
  title: 'Mermaid Live Editor: Preview, Fix and Export Diagrams',
  description: 'Write Mermaid code and see the diagram live. Fix syntax errors by line, switch themes, then export SVG or PNG or share a link. Free, runs in your browser.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: URL },
  icons: { icon: '/icons/mermaid-diagram-editor.svg', shortcut: '/icons/mermaid-diagram-editor.svg' },
  openGraph: {
    type: 'website', url: URL, siteName: 'webdevpuneet.com',
    title: 'Mermaid Live Editor - Preview, Fix and Export Diagrams',
    description: 'Preview Mermaid code live, fix errors by line, and export SVG or PNG. Flowcharts, sequence, ER, Gantt, mind maps and more. Free.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Mermaid Live Editor by webdevpuneet.com' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image', site: '@webdevpuneet',
    title: 'Mermaid Live Editor - Preview, Fix and Export Diagrams',
    description: 'Preview Mermaid code live and export SVG or PNG. Free, in your browser.',
    images: [OG_IMAGE],
  },
};

const faqs = [
  { q: 'What is Mermaid?', a: 'Mermaid is a text-based way to describe diagrams. You write a few lines such as "flowchart TD" followed by arrows between boxes, and a renderer draws the picture. It is built into GitHub, GitLab, Notion, Obsidian and many documentation tools, and AI assistants often answer with Mermaid code when you ask for a flowchart or an architecture diagram.' },
  { q: 'How do I preview Mermaid code from ChatGPT or Claude?', a: 'Copy the code from inside the mermaid code block, leaving out the three backticks and the word mermaid, and paste it into the editor. The diagram appears on the right. If the assistant made a syntax mistake, the error message and line number show you where to fix it.' },
  { q: 'Which diagram types does it support?', a: 'Flowcharts, sequence diagrams, class diagrams, state diagrams, entity relationship diagrams, Gantt charts, pie charts, mind maps, user journeys and Git graphs, and the other types supported by Mermaid version 10. The Start from menu loads a working example of each of the main ones.' },
  { q: 'Why does my diagram say "Parse error"?', a: 'The most common causes are a missing diagram type on the first line, an arrow with nothing after it, text with brackets or quotes that is not wrapped in quotes, and a reserved word such as end used as a node name. The editor highlights the line the parser stopped on, which is usually at or just after the real mistake.' },
  { q: 'How do I export a Mermaid diagram as PNG or SVG?', a: 'Use the SVG, PNG or PNG 4x buttons above the editor. SVG stays sharp at any size and suits web pages and print. PNG is better for slides and chat. Choose a white, transparent or dark export background first if you need one.' },
  { q: 'Can I put a Mermaid diagram in a README?', a: 'Yes. GitHub and GitLab render a code block marked mermaid as a diagram. Copy for Markdown wraps your code in that block, so you can paste it straight into a README, an issue or a pull request.' },
  { q: 'How does the share link work?', a: 'The diagram code is encoded into the part of the web address after the # sign. Opening the link loads that code into the editor. Because that part of an address is not sent to a server, nothing is stored or uploaded, but anyone you give the link to can read the diagram.' },
  { q: 'Is my diagram uploaded or saved?', a: 'No. Drawing happens in your browser, and the last diagram is kept only in your own browser\'s local storage so it is there when you come back. Clearing site data removes it. The Mermaid library itself is loaded from a public CDN the first time you open the page.' },
  { q: 'Why is the PNG or SVG slightly different from the preview?', a: 'For reliable exports the tool draws labels as plain SVG text rather than HTML, and adds the background colour you chose. The shapes and layout are the same, and very large diagrams are capped at 8,000 pixels on the longest side for PNG.' },
  { q: 'Does it work on a phone?', a: 'Yes. On a small screen the code box sits above the preview. You can drag the diagram with a finger, and exports and share links work the same way.' },
];

const faqSchema = {
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
};

const softwareSchema = {
  '@context': 'https://schema.org', '@type': 'SoftwareApplication',
  name: 'Mermaid Live Editor', applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Any (browser-based)', browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Write Mermaid code, preview the diagram live, fix syntax errors by line, switch themes and export SVG or PNG or a share link.',
  url: URL,
  featureList: ['Live Mermaid preview', 'Line-numbered error messages', 'Templates for flowchart, sequence, class, state, ER, Gantt, pie, mind map, journey and Git graph', 'Five themes', 'Export SVG, PNG and PNG 4x', 'White, transparent or dark export background', 'Copy for Markdown', 'Share link with the diagram inside the URL', 'Zoom and pan', 'Runs in the browser'],
};

function stripInlineMarkdown(text) { return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[`*]/g, ''); }

const howToSchema = {
  '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to preview and export a Mermaid diagram',
  description: 'Paste Mermaid code, fix any error, choose a theme, and export the diagram as SVG or PNG or share a link.',
  totalTime: 'PT3M',
  step: howToSteps.map((step, i) => ({ '@type': 'HowToStep', position: i + 1, name: step.title, text: stripInlineMarkdown(step.text) })),
};

const breadcrumbSchema = {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://webdevpuneet.com/' },
    { '@type': 'ListItem', position: 2, name: 'Mermaid Live Editor', item: URL },
  ],
};

const SEO = {
  slug: 'mermaid-diagram-editor',
  title: 'Mermaid Live Editor',
  about: {
    title: 'A Place to Preview and Fix the Diagram Your AI Just Wrote',
    description: `Ask an AI assistant for a flowchart, a database diagram or a project timeline and it will usually answer with Mermaid code, a few lines of text that a renderer turns into a picture. The code is easy to get and awkward to check: it only becomes a diagram somewhere that supports Mermaid, and when it has a syntax error you often get nothing and no hint why.\n\nThis editor gives you that missing step. Paste the code, see the diagram straight away, and if something is wrong the line number is highlighted with a plain-English message while the preview keeps the last working version. Pick a template to start from a flowchart, sequence diagram, class diagram, state diagram, entity relationship diagram, Gantt chart, pie chart, mind map, user journey or Git graph, then edit it live.\n\nWhen it looks right, export it. SVG stays sharp at any size, PNG and a 4x PNG suit slides and documents, and you can choose a white, transparent or dark background. Copy for Markdown wraps the code in a mermaid block for a README or wiki, and Share link stores the whole diagram inside the web address so a colleague can open exactly what you see, with nothing uploaded to a server.\n\nThe diagram is drawn in your browser with Mermaid version 10, loaded from a public CDN the first time you open the page. Your code stays on your device, and the last diagram is remembered in your own browser. If you write documentation with it, [Markdown Editor](/markdown-editor/) previews the rest of the page, [Diff Checker](/diff-checker/) compares two versions of a diagram's code, and [AI Prompt Studio](/ai-prompt-studio/) helps you ask for better diagrams in the first place.`,
  },
  features: [
    '**Live preview** - the diagram redraws as you type, after a short pause',
    '**Line-numbered errors** - the failing line is highlighted with a plain-English message',
    '**Last working version stays visible** - so you can see what a change broke',
    '**Ten starter templates** - flowchart, sequence, class, state, ER, Gantt, pie, mind map, user journey and Git graph',
    '**Five themes** - Default, Neutral, Forest, Dark and Base',
    '**SVG, PNG and PNG 4x export** - with a white, transparent or dark background',
    '**Copy SVG and Copy for Markdown** - for pages, READMEs, Notion and wikis',
    '**Share link** - the diagram lives in the URL, nothing is stored on a server',
    '**Zoom and pan** - drag to move, Ctrl or Cmd plus scroll to zoom',
    '**Remembers your last diagram** - kept in your own browser only',
    '**Works on phones** - code above, preview below, drag with a finger',
  ],
  howToUse: { type: 'steps', items: howToSteps },
  useCases: [
    { icon: 'FLOW', title: 'Check diagrams from ChatGPT or Claude', desc: 'Paste the code block an assistant gave you and see whether it actually draws. When it does not, the highlighted line tells you what to fix or what to ask the assistant to correct.' },
    { icon: 'DOC', title: 'Add diagrams to a README or wiki', desc: 'Draw it here, then use Copy for Markdown to paste a ready-made mermaid block into a README, a GitHub issue or a Notion page.' },
    { icon: 'WEB', title: 'Explain a system architecture', desc: 'Sketch services, queues and databases as a flowchart or sequence diagram, export an SVG, and drop it into a design doc or a slide.' },
    { icon: 'CHART', title: 'Plan a project on a Gantt chart', desc: 'Write tasks and dates as text, adjust them in seconds, and export a PNG for a status update without opening a heavy planning tool.' },
    { icon: 'CODE', title: 'Document a database schema', desc: 'Describe tables and their relationships with an entity relationship diagram, then share the link so a teammate can review it.' },
    { icon: 'LEARN', title: 'Teach or learn diagram syntax', desc: 'Start from a template, change one line at a time, and watch the picture change. It is the quickest way to learn how Mermaid arrows, shapes and labels work.' },
  ],
  faqs,
};

export default function MermaidDiagramEditorPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><MermaidEditorTool /></div>
      <AdSlot />
      <IndexOnly><SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
