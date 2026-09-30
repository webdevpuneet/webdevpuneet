import MindMapTool from '@/components/MindMapTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'Mind Map Studio — Free Online Mind Mapping Tool | webdevpuneet.com',
  description: 'Create unlimited mind maps on an infinite canvas — auto layout, collapsible branches, presentation mode, Gist sync, and PNG/Markdown export. Free.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/mind-map/' },
  icons: { icon: '/icons/mind-map.svg', shortcut: '/icons/mind-map.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/mind-map/',
    siteName: 'webdevpuneet.com',
    title: 'Mind Map Studio — Multiple Maps, Search, Undo/Redo & GitHub Gist Sync',
    description: 'Unlimited mind maps with IndexedDB autosave, auto layout, outline navigation, collapsible branches, metadata, presentation mode, Gist sync, and PNG/Markdown export.',
    images: [{ url: 'https://webdevpuneet.com/images/mind-map.png', width: 1200, height: 630, alt: 'Mind Map Studio' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'Mind Map Studio — Multiple Maps, Search & GitHub Sync',
    description: 'Multi-map library, IndexedDB autosave, auto layout, outline sidebar, presentation mode, Gist sync, PNG export. Free, no sign-up.',
    images: ['https://webdevpuneet.com/images/mind-map.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How do I create and manage multiple mind maps?',
      acceptedAnswer: { '@type': 'Answer', text: 'Click the map name tab in the header to open the Map Library panel. It lists all your maps with a node count. Click any map to switch to it instantly. Use the "+ New map" button to create a fresh map from a template — choose Blank, Sample, SWOT Analysis, Pros & Cons, or Weekly Plan. Each map has rename, duplicate, and delete buttons. All maps are stored locally in IndexedDB and can optionally sync together via a single GitHub Gist.' },
    },
    {
      '@type': 'Question',
      name: 'How does search work across maps?',
      acceptedAnswer: { '@type': 'Answer', text: 'Press Ctrl+F (or click the search icon in the header) to open the search overlay. Type any text and it searches node titles and node notes across all your maps in real time. Results show the matching node text and which map it belongs to. Click any result to jump directly to that map, pan the canvas to centre on the node, and select it.' },
    },
    {
      '@type': 'Question',
      name: 'How do I create nodes and connections?',
      acceptedAnswer: { '@type': 'Answer', text: 'Click anywhere on the blank canvas to create a new node. To connect two nodes, select a node and drag from the circular handle on its right edge — drop on another node to draw an edge, or drop on the canvas to create a new connected node in one step. Press Tab while a node is selected to add a child node automatically placed to the right.' },
    },
    {
      '@type': 'Question',
      name: 'What are node notes?',
      acceptedAnswer: { '@type': 'Answer', text: 'Every node can carry a longer text note beneath its title. Select a node and click the Notes area in the left sidebar to open a text editor. Notes are saved with the node and appear as a small dot indicator on the node itself. Node notes are also included in Markdown exports and are searchable via Ctrl+F.' },
    },
    {
      '@type': 'Question',
      name: 'How does undo and redo work?',
      acceptedAnswer: { '@type': 'Answer', text: 'Press Ctrl+Z to undo the last action and Ctrl+Y (or Ctrl+Shift+Z) to redo. The undo history tracks node additions, deletions, moves, color changes, and edge operations — up to 60 steps per map. The undo stack resets when you switch between maps.' },
    },
    {
      '@type': 'Question',
      name: 'How does GitHub Gist sync work?',
      acceptedAnswer: { '@type': 'Answer', text: 'Click the GitHub icon in the header, paste a personal access token with the gist scope, and click Sync Now. All your maps are saved together as a private fwd-mindmaps.json Gist. On subsequent syncs the tool downloads the remote data, merges it with local changes on a per-map, per-node basis (last-write-wins), and uploads the merged result. This lets you access all maps from different browsers or devices without an account.' },
    },
    {
      '@type': 'Question',
      name: 'Where are mind maps stored locally?',
      acceptedAnswer: { '@type': 'Answer', text: 'Mind Map Studio stores map data locally in IndexedDB, your browser built-in database. This supports larger maps and many saved maps better than small key-value browser storage. Changes also sync across open Mind Map tabs on the same device. Small preferences such as the active map and optional GitHub token settings are still kept in browser storage.' },
    },
    {
      '@type': 'Question',
      name: 'Can I present a mind map as slides?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Click Present or press P to open Presentation Mode. The tool walks through visible branches in outline order, showing each node as a slide with notes, child branch links, status, priority, owner, due date, and tags. Use arrow keys, Space, PageUp/PageDown, Home/End, or Esc to navigate.' },
    },
    {
      '@type': 'Question',
      name: 'How do auto layout, outline, and collapsible branches work?',
      acceptedAnswer: { '@type': 'Answer', text: 'Use the L-R, Tree, Radial, or Branch layout buttons to tidy the full map or only the selected branch. The Outline sidebar mirrors the current map as a tree so you can jump to nodes, filter by status, reorder sibling nodes, and collapse or expand branches. Collapsed branches are hidden from the canvas and from presentation walkthroughs.' },
    },
    {
      '@type': 'Question',
      name: 'How do I export my mind map?',
      acceptedAnswer: { '@type': 'Answer', text: 'Three export formats are available. Markdown export produces an indented bullet-point outline of the map hierarchy including node notes — useful for documents, notes apps, or AI prompts. JSON export saves the complete map state including positions, colors, edges, and inbox items. PNG export downloads the canvas as a high-resolution image file.' },
    },
    {
      '@type': 'Question',
      name: 'Is GitHub Gist truly private? Should I worry about the Gist URL?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes — treat your Gist URL as a secret. GitHub "private" Gists are not encrypted — they are unlisted links. Anyone who has your Gist URL or Gist ID can read all your mind maps without needing a GitHub login. Never share your Gist URL, Gist ID, or Personal Access Token with anyone. Avoid including passwords, API keys, or highly sensitive details in map nodes. For maximum privacy, skip Gist sync and use Export JSON to back up and transfer maps manually via USB or your own encrypted storage.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Mind Map Studio',
  url: 'https://webdevpuneet.com/mind-map/',
  applicationCategory: 'ProductivityApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Free browser-based mind mapping tool with freeform canvas, IndexedDB autosave, outline navigation, auto layout, presentation mode, GitHub Gist sync, and Markdown export.',
  featureList: [
    'Multi-map library with create, rename, duplicate, delete',
    'Five templates: Blank, Sample, SWOT, Pros & Cons, Weekly Plan',
    'Ctrl+F search across all maps and node notes',
    'Undo/Redo up to 60 steps (Ctrl+Z / Ctrl+Y)',
    'Node notes with sidebar editor and search indexing',
    'Outline sidebar with jump-to-node, status filtering, collapse controls, and sibling reorder',
    'Auto layout: left-to-right, tree, radial, and selected branch',
    'Collapsible branches with visible-node fit-to-screen',
    'Status, priority, owner, due date, and tags on nodes',
    'Presentation Mode with keyboard slide navigation',
    'Infinite pan canvas with toolbar zoom buttons',
    'Click to create nodes, drag to move',
    'Drag connection handle to draw bezier edges',
    'Tab shortcut to add child node',
    'Idea inbox for quick thought capture',
    'Eight node colours with edge colour inheritance',
    'GitHub Gist sync — all maps in fwd-mindmaps.json',
    'IndexedDB auto-save with same-device tab sync',
    'Fit to screen',
    'Markdown export with node notes',
    'JSON export, PNG image export',
    '100% browser-based, no data uploaded',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',          item: 'https://webdevpuneet.com' },
    { '@type': 'ListItem', position: 2, name: 'Mind Map Studio', item: 'https://webdevpuneet.com/mind-map/' },
  ],
};

const SEO = {
  slug: 'mind-map',
  title: 'Mind Map Studio — Free Online Mind Mapping, Learning & Planning Tool',
  about: {
    title: 'Think Spatially, Learn Faster, Execute Better — Mind Map Studio',
    description: `Mind Map Studio is a free browser-based mind mapping tool built for the way ideas actually form — non-linearly, in bursts, across sessions. An infinite canvas lets you place nodes anywhere, draw connections between any two ideas, and rearrange everything freely as your thinking evolves. Nothing is locked into a rigid tree structure. Every map you build is auto-saved to your browser's IndexedDB database, synced across open tabs on the same device, and optionally synced to a private GitHub Gist so you can continue from any device.

**In the AI era, thinking spatially matters more than ever.** AI tools generate flat lists of ideas, steps, and summaries — but understanding requires seeing relationships. Paste AI output into the Idea Inbox, promote each point to a node, and wire up the connections the model flattened into prose. Gaps, contradictions, and missing links become immediately visible. Mind maps let you turn AI-generated content into genuine understanding rather than passive consumption.

**For learning and understanding new topics,** mind mapping is one of the most effective study methods. Start with the core concept at the centre, branch out into sub-topics, and add examples and definitions as leaf nodes. Colour-code branches by theme, add notes to complex nodes, and export to Markdown when you're ready to write up a summary. Seeing a topic as a network rather than a list reveals how concepts connect — which is the difference between memorising and actually understanding.

**For planning and execution,** a mind map bridges the gap between raw ideas and an actionable plan. Start broad: capture everything you know, every dependency, every unknown. Then group, organise, and prioritise spatially. Color-code by status — blue for ideas, amber for in-progress, green for done. Use the SWOT or Weekly Plan templates to start structured. Export the map to Markdown when it's time to write a spec, a task list, or a project brief. The spatial layout makes it easy to see what's missing before work begins.

**Multiple maps** are the foundation of the studio. A map library panel lists every map you've created with its node count. Switch instantly, rename, duplicate to experiment from a known state, or delete maps you no longer need. Five templates give you a running start: Blank, a pre-connected Sample, a full SWOT Analysis grid, a Pros & Cons comparison, and a seven-day Weekly Plan.

**Auto layout** helps turn messy thinking into a readable structure. Use L-R for a classic left-to-right map, Tree for a top-down hierarchy, Radial for concept maps, or Branch to tidy only the selected subtree without disturbing the rest of the canvas.

**The Outline sidebar** mirrors the current map as a navigable tree. Click any node to jump to it on the canvas, filter the outline by status, reorder sibling nodes by dragging, and collapse or expand branches when a map grows large.

**Collapsible branches** keep complex maps readable. Collapse any parent node from the canvas or outline to hide its descendants, then expand when you need detail again. Fit-to-screen, outline navigation, and Presentation Mode all respect visible branches.

**Node metadata** turns a mind map into a lightweight planning surface. Add status, priority, owner, due date, and tags to any node, then use the outline filter to focus on todos, risks, ideas, or completed work.

**Presentation Mode** turns a map into a slide-style walkthrough. Press P or click Present to move through visible branches in outline order. Slides show the node title, notes, child branches, status, priority, owner, due date, and tags, making the map useful for teaching, planning reviews, or pitching an idea.

**Search across all maps** with Ctrl+F. The search overlay queries node titles and node notes across every map you have in real time. Results show the matching text and the map it belongs to — click any result to jump to that map and pan directly to the node. This is the fastest way to find a specific idea when you have dozens of maps and hundreds of nodes.

**Undo and redo** (Ctrl+Z / Ctrl+Y) track up to 60 operations per map — node additions, deletions, moves, color changes, and edge operations. The history resets when you switch between maps so each map has its own independent undo stack.

**Node notes** let every node carry a longer explanation beyond its title. Select a node and click the Notes area in the sidebar to open a text editor. Notes appear in Markdown export as indented block quotes and are fully indexed by search. A small dot indicator on the node signals that a note exists.

**The Idea Inbox** is the tool's fastest capture method. Real thinking rarely arrives in the right order — the inbox sidebar lets you type thoughts and press Enter to capture them instantly without interrupting canvas work. Promote inbox items to the canvas with one click and wire them in where they belong.

**IndexedDB autosave** keeps your maps in your browser's built-in database instead of small key-value storage. This gives the studio more room for large maps, node notes, metadata, collapsed branches, presentation state, and many saved maps. Changes are also broadcast across open tabs on the same device so another Mind Map tab can refresh from the latest local data.

**GitHub Gist sync** stores all your maps together in a single private fwd-mindmaps.json Gist. Paste a GitHub token with the gist scope and every map syncs across all devices automatically on page load and after changes. The merge strategy works per-map and per-node using last-write-wins timestamps, so edits from different devices combine cleanly without overwriting each other.

**Export options** include Markdown (indented outline with node notes — ideal for documents, study notes, or AI prompts), JSON (full state for backup), and PNG (high-resolution image of the canvas). All processing is client-side. Data is never sent to webdevpuneet.com servers; the only external request is to the GitHub API when you use Gist sync.`,
  },

  features: [
    'Multi-map library — create unlimited maps, switch instantly, rename, duplicate, or delete any map',
    'Five built-in templates — Blank, Sample, SWOT Analysis, Pros & Cons, and Weekly Plan',
    'Ctrl+F search — find any node text or note across all maps in real time; click a result to jump to that map and node',
    'Undo/Redo (Ctrl+Z / Ctrl+Y) — up to 60 steps per map covering node additions, deletions, moves, color changes, and edges',
    'Node notes — attach a longer text note to any node; notes appear in Markdown export and are fully searchable; draft longer notes in the [Markdown editor](https://fwdtools.com/markdown-editor) or track follow-ups on the [mini kanban board](https://fwdtools.com/mini-kanban)',
    'Auto Layout — tidy the whole map as left-to-right, tree, or radial layout; tidy only the selected branch when needed',
    'Outline Sidebar — navigate the map as a tree, jump to nodes, filter by status, collapse branches, and reorder sibling nodes',
    'Collapsible branches — hide child branches on large maps; visible-node fit-to-screen and presentation walkthroughs respect collapsed state',
    'Node metadata — add todo, idea, risk, done, priority, owner, due date, and tags for planning workflows',
    'Presentation Mode — walk through visible branches as slides with keyboard navigation and node metadata',
    'AI-era workflow — paste AI output into the Inbox, promote to nodes, wire up relationships to build real understanding',
    'Learning tool — map concepts spatially to see connections, not just lists; export study notes to Markdown',
    'Planning to execution — go from raw ideas to structured plan; colour-code by status, export to spec or task list',
    'Infinite canvas with pan (drag background) and zoom via toolbar buttons — scroll is reserved for page, not canvas',
    'Click blank canvas to create a node; drag the right-edge handle to draw a connection or spawn a new connected node in one gesture',
    'Tab key adds a child node; Delete removes a node and all its edges; click any edge to delete just that connection',
    'Idea Inbox sidebar — capture raw thoughts without placing them on the canvas, then promote to map with one click',
    'Eight node colors with visual swatch picker; edge color inherits from source node for branch-level visual identity',
    'Auto-sync on page load and after changes — all maps sync together to one private GitHub Gist; red badge on error',
    'IndexedDB auto-save on every change with same-device tab sync; fit-to-screen calculates visible node bounds automatically',
    'Three export formats — Markdown outline (with notes), JSON full state, and PNG image download',
    '100% browser-based — maps are stored locally in IndexedDB and never uploaded to webdevpuneet.com servers',
  ],

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Pick a template or start blank',
        text: 'Open the Map Library in the left sidebar and hit "+ New map." Choose a template — Blank, SWOT Analysis, Pros & Cons, Weekly Plan, or a pre-connected Sample. The new map opens instantly on the canvas. Build as many maps as you need — one per topic, project, or idea space.',
      },
      {
        title: 'Capture thoughts in the Inbox first',
        text: 'As ideas surface — or as you paste in AI output — type into the Idea Inbox and press Enter. Ideas save instantly without touching the canvas, so your thinking keeps flowing. Promote any inbox item to the canvas later with the → button, then wire it in where it belongs.',
      },
      {
        title: 'Build connections on the canvas',
        text: 'Click anywhere on the blank canvas to add a node. Select a node and drag the circle on its right edge to draw a connection — drop on another node to link them, or drop on empty space to create and connect a new node in one move. Tab adds a child node instantly. Use colour to group branches by theme, status, or priority.',
      },
      {
        title: 'Tidy the structure with layout tools',
        text: 'Use L-R, Tree, or Radial layout to clean up the whole map in one click. Select a parent node and use Branch layout when only one section needs tidying. Fit-to-screen recalculates the visible map after layout changes.',
      },
      {
        title: 'Navigate from the Outline sidebar',
        text: 'Use the Outline sidebar as a synced tree view of the map. Click a row to jump to that node, drag sibling nodes to reorder them, filter by status, and collapse branches when the canvas gets crowded.',
      },
      {
        title: 'Add notes and metadata to key nodes',
        text: 'Select a node and add notes, status, priority, owner, due date, or tags in the sidebar. Notes are exported with Markdown and searchable via Ctrl+F. Metadata appears on the node and powers status filtering in the outline.',
      },
      {
        title: 'Search and navigate across maps',
        text: 'Press Ctrl+F to open the search overlay. Type any word to find matching nodes across all your maps — including note text. Click a result to jump to that map and pan directly to the node. This is how you navigate when you have many maps built up over time.',
      },
      {
        title: 'Sync and export when ready',
        text: 'Maps auto-save locally in IndexedDB and update across open tabs on the same device. Click the GitHub icon and paste a token with the gist scope to sync across devices. Use Present for a slide-style walkthrough, Export Markdown for notes/specs, or Export PNG for a shareable visual.',
      },
      {
        title: 'Keep your Gist private — never share the URL',
        text: 'GitHub private Gists are not truly encrypted — they are unlisted links. Anyone who has your Gist URL or Gist ID can read all your mind maps without logging in. Never share your Gist URL, Gist ID, or Personal Access Token with anyone. Avoid including passwords, API keys, or highly sensitive details in map nodes. For maximum privacy, skip Gist sync and use Export JSON to transfer maps manually instead.',
      },
    ],
  },

  useCases: [
    {
      icon: '◎',
      title: 'Project planning and execution',
      desc: 'Capture every component, dependency, and unknown visually before writing a spec. Add status, priority, owner, due date, and tags to turn branches into lightweight workstreams. Use the outline filter to focus on todos, risks, ideas, or done items, then export to Markdown when the plan is ready to become a task list or brief.',
    },
    {
      icon: '✦',
      title: 'AI output → real understanding',
      desc: 'AI generates flat lists. Mind maps turn them into networks. Paste AI output into the Inbox, promote each point to a node, and wire up the relationships the model flattened into prose. Gaps, contradictions, and missing connections become immediately visible — that\'s the difference between reading AI output and actually understanding it.',
    },
    {
      icon: '△',
      title: 'Research and literature mapping',
      desc: 'Map sources, arguments, counter-arguments, and evidence spatially. Connect supporting ideas with solid edges and opposing ones visually. Export to Markdown when ready to write up the synthesis, then convert with [Markdown to HTML](https://fwdtools.com/markdown-to-html) for publishing.',
    },
    {
      icon: '⚡',
      title: 'Brainstorming sessions',
      desc: 'Use the inbox for rapid idea capture during a session, then move to the canvas for clustering and connection. Auto layout cleans up the map after messy ideation, and collapsible branches let a group zoom into one topic without losing the full picture.',
    },
    {
      icon: '⊞',
      title: 'Learning and understanding new topics',
      desc: 'Build a concept map as you study — central concept at the centre, sub-topics branching out, definitions and examples as leaf nodes. Use radial layout for concept maps, notes for definitions, collapsible branches for revision, and Presentation Mode to walk yourself or a group through the topic.',
    },
    {
      icon: '▶',
      title: 'Decision mapping',
      desc: 'Map options, pros, cons, risks, and unknowns for a decision spatially. Use different colors for categories — green for strengths, red for risks, blue for unknowns. The SWOT and Pros & Cons templates give you a structured starting point. The visual layout makes trade-offs immediately legible without writing a single word of prose.',
    },
    {
      icon: '▣',
      title: 'Teaching, reviews, and pitches',
      desc: 'Turn any visible map into a slide-style walkthrough with Presentation Mode. Move through branches in outline order, show node notes and metadata, jump into child branches, then open the current slide back on the canvas when discussion needs more detail.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function MindMapPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><MindMapTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
