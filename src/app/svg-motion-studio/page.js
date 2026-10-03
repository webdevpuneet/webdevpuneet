import SvgMotionStudioTool from '@/components/SvgMotionStudioTool';
import SeoSection from '@/components/SeoSection';
import IndexOnly from '@/components/SeoSection/IndexOnly';
import AdSlot from '@/components/AdSlot';
import styles from '../tool-page.module.css';

export const metadata = {
  title: 'SVG Motion Studio — Free Online SVG Animator with GSAP Export',
  description: 'Free SVG animation editor in your browser. Keyframes, bezier easing, layer timeline. Export CSS @keyframes, GSAP, Framer Motion, or Lottie JSON. No sign-up.',
  authors: [{ name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' }],
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://webdevpuneet.com/svg-motion-studio/' },
  icons: { icon: '/icons/svg-motion-studio.svg', shortcut: '/icons/svg-motion-studio.svg' },
  openGraph: {
    type: 'website',
    url: 'https://webdevpuneet.com/svg-motion-studio/',
    siteName: 'webdevpuneet.com',
    title: 'SVG Motion Studio — Animate SVG Layers with Timeline Keyframes, Bezier Curves & Multi-Format Export',
    description: 'Free — Import an SVG, animate every layer on a multi-track timeline with custom bezier easing, motion paths, filters, and stagger — then export CSS, GSAP, ScrollTrigger, Framer Motion, or Lottie JSON. GitHub Gist sync, drag-and-drop reorder, custom presets. 100% browser-based.',
    images: [{ url: 'https://webdevpuneet.com/images/svg-animation-generator.png', width: 1200, height: 630, alt: 'SVG Motion Studio Online SVG Animator' }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@webdevpuneet',
    title: 'SVG Motion Studio — Online SVG Animator with GSAP & Framer Motion Export',
    description: 'Multi-track timeline, bezier curve editor, motion paths, stagger, blur filters — export to CSS, GSAP, or Framer Motion. Free, browser-only.',
    images: ['https://webdevpuneet.com/images/svg-animation-generator.png'],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What animation properties can I set per keyframe?',
      acceptedAnswer: { '@type': 'Answer', text: 'Every keyframe supports translate X and Y (position offset in pixels), scale, rotation in degrees, opacity (0–1), fill color, blur in pixels, brightness multiplier, stroke-dasharray, and stroke-dashoffset. You can also set a custom per-segment easing curve using the visual bezier editor, so the animation can ease differently between each pair of keyframes.' },
    },
    {
      '@type': 'Question',
      name: 'Can I export to GSAP or Framer Motion instead of CSS?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The Export Code panel has three tabs: CSS (standard @keyframes with animation shorthand), GSAP (a gsap.timeline() with fromTo calls for each layer segment, respecting per-layer delay and stagger), and Framer Motion (motion.tag JSX with animate and transition props for React projects). All three formats are derived from the same keyframe data so they stay in sync.' },
    },
    {
      '@type': 'Question',
      name: 'How does the bezier curve editor work?',
      acceptedAnswer: { '@type': 'Answer', text: 'Click the ∿ button next to any easing selector to open the visual cubic-bezier editor. Drag the two control handles inside the square grid — the curve stretches freely beyond the grid for bounce and spring overshoot effects while the handles stay within reach. The dropdown auto-updates to show the live cubic-bezier() value. Nine quick-apply presets (Ease, Ease In, Bounce, Spring, Snappy, etc.) let you start from a named shape and fine-tune from there.' },
    },
    {
      '@type': 'Question',
      name: 'What is the stagger control?',
      acceptedAnswer: { '@type': 'Answer', text: 'Stagger adds a delay offset between layers based on their order. Setting stagger to 0.15s makes layer 0 start at 0s, layer 1 at 0.15s, layer 2 at 0.30s, and so on. This creates the cascading entrance effect used in most modern motion design without manually setting a delay on every layer. Stagger is included in CSS, GSAP, and Framer Motion exports.' },
    },
    {
      '@type': 'Question',
      name: 'Can I animate blur and brightness?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Each keyframe has Blur (px) and Brightness fields. Animating blur from 0 to 12 with the Blur Out preset creates a focus-out exit. Animating brightness from 1 to 1.8 and back creates a glow pulse. These values produce a CSS filter: blur() brightness() rule in the exported CSS and are included in GSAP and Framer Motion output as well.' },
    },
    {
      '@type': 'Question',
      name: 'What is motion path animation?',
      acceptedAnswer: { '@type': 'Answer', text: 'Motion path lets a layer follow a custom SVG path using CSS offset-path. Enable it in the Layer inspector, paste any SVG path d-attribute value, and the element animates along that curve over the animation duration. Motion path composites with normal transform keyframes — the element can simultaneously follow a path and scale, rotate, or fade.' },
    },
    {
      '@type': 'Question',
      name: 'Does the tool support undo and redo?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every keyframe change — adding, removing, moving, or editing a frame — is tracked in a history stack. Press Ctrl+Z (or Cmd+Z on Mac) to undo and Ctrl+Y (or Ctrl+Shift+Z) to redo. The undo and redo buttons in the header also show which operations are available.' },
    },
    {
      '@type': 'Question',
      name: 'How does the multi-project library work?',
      acceptedAnswer: { '@type': 'Answer', text: 'Click the folder icon in the header to open the project panel. Type a name and click Save to save the current SVG and all animation settings as a named project. Click Save as New to create a separate copy with a new name. All saved projects appear in a scrollable list — click any project name to switch to it instantly. Click the pencil icon to rename a project inline, or the x button to delete it (with a confirmation modal). Projects are stored in IndexedDB in your browser, so they persist across sessions without any sign-up. GitHub Gist sync pushes the full library — including all projects and deletion records — to a private Gist, making the same library available on every device.' },
    },
    {
      '@type': 'Question',
      name: 'Can I save my work and come back to it later?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes — in two ways. The multi-project library in the header lets you save unlimited named projects directly in the browser\'s IndexedDB. Click the folder icon in the header, type a project name, and click Save. Your projects persist across sessions and appear in the project picker for instant one-click switching. You can also click Export JSON to download a portable backup file and Import JSON to restore it. For cross-device persistence, connect GitHub Gist sync: paste a GitHub Personal Access Token with gist scope, click Save, and the studio automatically pushes your full project library to a private Gist. On any device, the latest library is fetched and merged on load.' },
    },
    {
      '@type': 'Question',
      name: 'What is GitHub Gist sync and how do I set it up?',
      acceptedAnswer: { '@type': 'Answer', text: 'GitHub Gist sync saves your entire multi-project library to a private GitHub Gist so your projects are accessible from any device. Click the GitHub icon in the header, paste a GitHub Personal Access Token (create one at github.com/settings/tokens with only the gist scope checked), and click Save. The studio finds or creates a private Gist named sms-motion-project.json and begins syncing automatically — pushing after every change (5-second debounce) and pulling on load. The merge logic compares each project\'s updatedAt timestamp independently, so edits and renames on different devices never overwrite each other. Deleted projects are stored as tombstone records so deletions also propagate correctly. The token is stored in your browser\'s localStorage and shared with all FWD tools — if you already set it up in another tool, SVG Motion Studio picks it up immediately.' },
    },
    {
      '@type': 'Question',
      name: 'Can I export to Lottie JSON format?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. The Export Code panel has a Lottie tab that generates a Lottie JSON file from your keyframe data. Lottie is the most widely supported SVG animation format — used by iOS, Android, React Native, and web apps via the lottie-web player. The export maps your translate (position), scale, rotation, and opacity keyframes to Lottie\'s transform properties at 60 fps. Click Download .json in the Lottie tab to save the file and load it in any Lottie player.' },
    },
    {
      '@type': 'Question',
      name: 'What is the GSAP ScrollTrigger export?',
      acceptedAnswer: { '@type': 'Answer', text: 'The ScrollTrigger tab generates GSAP animation code that plays as the user scrolls the page, using the GSAP ScrollTrigger plugin. The output includes gsap.registerPlugin(ScrollTrigger), a timeline with a scrollTrigger configuration block (trigger, start, end, toggleActions), and the same fromTo segment calls as the standard GSAP export. Change the trigger selector to your container element, adjust start and end positions, and optionally uncomment scrub: true to link the animation progress directly to the scroll position instead of playing it once.' },
    },
    {
      '@type': 'Question',
      name: 'How do I copy keyframes from one layer to another?',
      acceptedAnswer: { '@type': 'Answer', text: 'Select the source layer, then click Copy Keyframes in the Keyframe Clipboard section of the inspector (or press Ctrl+C when not focused on an input field). The keyframes are stored in the clipboard panel. Then select the target layer and click Paste to Layer (or press Ctrl+V). The pasted keyframes replace the target layer\'s existing keyframes. This is useful for applying the same entrance animation to multiple layers before tweaking timing and values individually.' },
    },
    {
      '@type': 'Question',
      name: 'How do I reorder layers in the timeline?',
      acceptedAnswer: { '@type': 'Answer', text: 'Drag the ≡ handle on the left edge of any layer row in the Layers panel to reorder it. Drag up or down — a highlight border shows where the layer will drop. Layer order affects stagger: layer 0 starts first, each subsequent layer is offset by the stagger value. Reordering is also reflected in the CSS, GSAP, Framer Motion, ScrollTrigger, and Lottie exports.' },
    },
    {
      '@type': 'Question',
      name: 'How do I save a custom preset?',
      acceptedAnswer: { '@type': 'Answer', text: 'Set up keyframes on a layer exactly as you want them, then scroll to the My Presets section at the bottom of the sidebar. Type a name in the input field and click Save. Your preset appears in the list and can be applied to any layer with one click — just like the built-in motion presets. Custom presets are stored in IndexedDB and persist between sessions reliably. To delete a preset, click the x button next to it.' },
    },
    {
      '@type': 'Question',
      name: 'How do I animate stroke drawing effects?',
      acceptedAnswer: { '@type': 'Answer', text: 'Use the Draw On preset from the Draw category. It sets stroke-dasharray to 1000 at frame 0 with stroke-dashoffset equal to 1000, then animates stroke-dashoffset to 0 by frame 100 — which draws the stroke progressively along the path. For best results, apply this to path or line elements that already have a stroke attribute. Adjust the dasharray value to match your actual path length for a perfect draw.' },
    },
    {
      '@type': 'Question',
      name: 'Is this tool safe for confidential client SVGs?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. SVG parsing, layer extraction, keyframe calculation, preview rendering, and all export formats are processed entirely in your browser using the DOMParser and XMLSerializer APIs. No file content, layer data, or export output is ever sent to a server. It is safe to use with unreleased logos, NDA-protected brand assets, and client illustrations.' },
    },
    {
      '@type': 'Question',
      name: 'What kinds of SVG files work best?',
      acceptedAnswer: { '@type': 'Answer', text: 'SVGs with named groups and elements work best — typically files exported from Figma, Illustrator, or Inkscape with layer names preserved as id attributes. The tool extracts every g, path, circle, rect, ellipse, line, polyline, polygon, and text element as a separate animatable layer. Simple illustrations with a handful of distinct sections (like a rocket with moon, stars, trail, body, and flame) are ideal. Very complex SVGs with hundreds of nested micro-paths still work but may produce a large layers list.' },
    },
    {
      '@type': 'Question',
      name: 'Is GitHub Gist truly private? Should I worry about the Gist URL?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes — treat your Gist URL as a secret. GitHub "private" Gists are not encrypted — they are unlisted links. Anyone who has your Gist URL or Gist ID can access your full animation project library without needing a GitHub login. Never share your Gist URL, Gist ID, or Personal Access Token with anyone. For maximum privacy, skip Gist sync and use Export JSON to back up and transfer projects manually instead.' },
    },
  ],
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'SVG Motion Studio',
  url: 'https://webdevpuneet.com/svg-motion-studio/',
  applicationCategory: 'DesignApplication',
  operatingSystem: 'Web',
  browserRequirements: 'Requires JavaScript',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  description: 'Browser-based SVG motion editor with multi-project library, multi-track timeline, bezier curve editor, motion paths, filter animations, stagger, and export to CSS, GSAP, GSAP ScrollTrigger, Framer Motion, or Lottie JSON. GitHub Gist syncs the full project library across devices.',
  featureList: [
    'SVG import by paste, file upload, or clipboard',
    'Automatic layer extraction from SVG elements with ID preservation',
    'Multi-project library — create, name, rename, and delete unlimited saved projects; switch between them from the header project picker',
    'IndexedDB storage — reliable per-project persistence across sessions; deleted projects carry a tombstone so deletions propagate to other devices via Gist',
    'Multi-track timeline showing all layers simultaneously with shared playhead',
    'Drag-to-reposition keyframe diamonds on the timeline',
    'Shift-drag to snap keyframes to 5% grid intervals',
    'Drag-and-drop layer reorder via handle — affects stagger order',
    'Keyframe copy/paste across layers — Ctrl+C / Ctrl+V or clipboard panel buttons',
    'Custom preset save/load — name and store keyframe sets; persisted in IndexedDB',
    'Keyframe properties: X/Y translate, scale, rotation, opacity, fill color (inline color picker)',
    'Keyframe properties: blur (px), brightness, stroke-dasharray, stroke-dashoffset',
    'Per-segment easing — different bezier curve between each keyframe pair',
    'Visual cubic-bezier curve editor with draggable handles and nine quick presets',
    'Per-layer easing and delay overrides',
    'Stagger control — cascading layer delays from a single slider',
    'Motion path — animate elements along an SVG path using CSS offset-path',
    '20 motion presets across Entrance, Emphasis, Exit, and Draw categories',
    'Preview background toggle: dark, light, checkerboard, custom color',
    'Playback speed control: x0.5, x1, x2',
    'Layer visibility toggle (eye) and lock toggle; click canvas element to select layer',
    'CSS @keyframes export with embedded SVG or standalone HTML file',
    'GSAP timeline code export (gsap.timeline() with fromTo per segment)',
    'GSAP ScrollTrigger export — scroll-linked or scroll-triggered timeline with full configuration',
    'Framer Motion JSX export (motion.tag with animate prop and transition)',
    'Lottie JSON export (60 fps, position/scale/rotation/opacity) — compatible with lottie-web, iOS, Android',
    'GitHub Gist sync — syncs full multi-project library; merge by per-project updatedAt timestamp; delete-flag propagation; shared token across FWD tools',
    'Undo and redo with Ctrl+Z / Ctrl+Y; unlimited history stack',
    'Export JSON / Import JSON for manual backup; download Lottie .json from export panel',
    '100% browser-based — SVG content, keyframes, and exports never leave your device',
  ],
  author: { '@type': 'Person', name: 'Puneet Sharma', url: 'https://www.webdevpuneet.com/' },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fwdtools.com' },
    { '@type': 'ListItem', position: 2, name: 'SVG Motion Studio', item: 'https://webdevpuneet.com/svg-motion-studio/' },
  ],
};

const SEO = {
  slug: 'svg-motion-studio',
  title: 'SVG Motion Studio — Online SVG Animator with Timeline, Lottie & ScrollTrigger Export',
  about: {
    title: 'Animate SVG Logos, Icons, and Illustrations — Export CSS, GSAP, ScrollTrigger, Framer Motion, or Lottie',
    description: `SVG Motion Studio is a browser-based SVG animation editor that takes you from a static vector file to production-ready animated code in minutes. Import any SVG by pasting markup, uploading a file, or pasting from clipboard — the studio instantly parses every group, path, shape, and text element into independently animatable layers on a shared multi-track timeline. No account, no install, nothing uploaded to a server.

The tool is built around the problem that most SVG animation workflows are either too manual (writing CSS keyframes by hand) or too locked in (proprietary platforms that own your output). SVG Motion Studio sits in the middle: a visual keyframe editor that generates clean, portable code you can drop directly into any web project.

**Multi-track timeline** shows every layer simultaneously as its own row. The cyan playhead spans all rows and stays locked in sync. Click any diamond keyframe to jump to that frame, drag it left or right to shift timing, or hold Shift while dragging to snap to 5% intervals. Adding a keyframe captures the interpolated state at the current playhead position so you never lose work in progress. Drag the **≡ handle** on any layer row to reorder layers — order affects stagger timing and export output.

**Keyframe properties** go well beyond the basics. Every frame supports translate X and Y (position offset in pixels), scale, rotation in degrees, opacity, fill color (with inline color picker), blur in pixels, brightness, stroke-dasharray, and stroke-dashoffset. This makes effects like draw-on strokes, focus-pull exits, and glow pulses achievable without touching CSS. The two-column compact grid keeps all controls on screen at once.

**Copy and paste keyframes** across layers with Ctrl+C / Ctrl+V or the Keyframe Clipboard buttons in the inspector. Copy a layer's full animation, paste it to another layer, then tweak values — massively faster than rebuilding identical timing from scratch. **Custom presets** let you name and save any keyframe set to the My Presets panel. They sit alongside the 20 built-in presets and persist in localStorage between sessions.

**Bezier curve editor** opens with the ∿ button next to any easing dropdown — for global animation, per-layer overrides, or individual keyframe segments. Drag the two handles on the square grid: the handles always stay within the boundary while the curve stretches freely above and below for overshoot and spring effects. The easing dropdown auto-updates to the live cubic-bezier() value as you drag. Nine quick-apply presets (Bounce, Spring, Snappy, Smooth, and more) let you start from a named shape. Per-segment easing means the curve from frame 0 to frame 50 can be ease-in while frame 50 to frame 100 is bounce — which is how professional motion design actually works.

**Stagger** is a single slider in the Animation panel. Set it to 0.15 and every layer starts 0.15 seconds after the previous one, creating the cascading entrance effect used in landing page hero animations without manually setting a delay on each layer. Stagger is carried into all five export formats.

**Export formats** cover the full modern web stack. The CSS tab generates standard @keyframes with animation shorthand. The GSAP tab generates a gsap.timeline() with fromTo calls for each animation segment. The new **ScrollTrigger** tab wraps the same GSAP timeline in a scrollTrigger configuration block — toggle actions, start/end positions, and an optional scrub mode for scroll-linked animations. The **Framer Motion** tab generates motion.tag JSX with animate and transition props for React. The **Lottie** tab exports a standards-compliant Lottie JSON file at 60 fps, mapping translate, scale, rotation, and opacity keyframes to Lottie's transform properties — compatible with lottie-web, iOS, Android, and React Native.

**Multi-project library** lives in the header as a folder-icon project picker. Click it to see all your saved projects, switch between them instantly, create new ones with a custom name, rename any project inline, or delete one with a confirmation modal. Projects are stored in IndexedDB — more reliable than localStorage — so they survive cache clears and browser updates. Deleted projects are kept as tombstone records for 30 days so the deletion propagates correctly to every other device via Gist sync, then cleaned up automatically.

**GitHub Gist sync** keeps your entire project library safe across sessions and syncs it across devices without any account sign-up. Click the Gist button in the header, paste a GitHub Personal Access Token (gist scope), and the studio automatically pushes your full project library to a private Gist after every change. On your next visit — on any device — the latest library is pulled back and merged. The merge logic compares each project's \`updatedAt\` timestamp independently, so a rename on device A and an edit on device B both survive the sync without either one being overwritten. The token is shared across all FWD tools — one connection covers the whole suite.

**Motion path** lets a layer follow a custom SVG curve using CSS offset-path. Enable it in the Layer inspector, paste any SVG path d-value, and the element follows that arc over the animation duration while still compositing with whatever transform keyframes you have set. **Undo and redo** (Ctrl+Z / Ctrl+Y) tracks every change in a history stack. Export JSON / Import JSON preserves the complete project state for manual backup. Everything runs locally: no account, no cloud, no data leaving your browser.`,
  },

  features: [
    'Multi-project library — create, name, rename, and delete unlimited projects from the header project picker; switch between them instantly with auto-load; source ready-made icons from the [animated SVG icons library](/animated-svg-icons/)',
    'IndexedDB storage — projects persist reliably across sessions; deleted projects stored as tombstones for 30 days so deletes propagate to all devices via Gist',
    'Multi-track timeline — all layers visible as rows with a shared playhead; drag keyframe diamonds to retime, hold Shift to snap to 5% grid — a level up from the preset-based [SVG animation generator](/svg-animation-generator)',
    'Drag-and-drop layer reorder via handle — affects stagger timing order across all export formats, including GSAP timelines you can refine in the [GSAP playground](/gsap-playground)',
    'Keyframe copy/paste across layers — Ctrl+C copies the selected layer\'s full keyframe set; Ctrl+V or Paste to Layer applies it to the active layer',
    'Custom preset save/load — name any keyframe set, store it in My Presets, reuse it on any layer; persisted in IndexedDB',
    'Keyframe properties: translate X/Y, scale, rotation, opacity, fill color (inline color picker), blur (px), brightness, stroke-dasharray, stroke-dashoffset',
    'Visual cubic-bezier curve editor — handles stay inside the grid, curve stretches freely for bounce and spring; 9 quick presets',
    'Per-segment easing — set a different bezier curve between each pair of keyframes for professional-grade motion feel',
    'Stagger slider — one control creates cascading layer delays for entrance sequences without manually setting per-layer delays',
    'Five export formats: CSS @keyframes, GSAP timeline, GSAP ScrollTrigger (scroll-linked/triggered), Framer Motion JSX, and Lottie JSON (60 fps)',
    'GSAP ScrollTrigger export — configurable trigger, start/end, toggleActions, and optional scrub mode for scroll-linked animations',
    'Lottie JSON export — position, scale, rotation, and opacity mapped to Lottie\'s transform schema at 60 fps; compatible with lottie-web, iOS, Android',
    'GitHub Gist sync — syncs full multi-project library; per-project updatedAt merge so edits on different devices never overwrite each other; delete-flag propagation; shared token across all FWD tools',
    '20 motion presets across Entrance (Fade In, Slide Up, Zoom In, Bounce In), Emphasis (Float, Pulse, Shake, Wiggle, Glow), Exit (Fade Out, Blur Out, Zoom Out), and Draw (Draw On, Draw Off)',
    'Motion path animation using CSS offset-path — paste any SVG d-attribute and the layer follows the curve, compositing with transform keyframes',
    'Preview background toggle — dark, light, checkerboard (transparency), or custom color picker to test against real usage contexts',
    'Layer visibility (show/hide) and lock toggles; click any canvas element to select its layer; playback speed x0.5 / x1 / x2',
    'Undo and redo with Ctrl+Z / Ctrl+Y; Export JSON / Import JSON for manual backup',
    '100% browser-based — SVG content, keyframes, and exports never leave your device; safe for confidential client assets',
  ],

  howToUse: {
    type: 'steps',
    items: [
      {
        title: 'Import your SVG',
        text: 'Paste SVG markup into the import field, click Upload to choose a .svg file, or press Paste to pull SVG directly from your clipboard. The studio parses the file, strips scripts and event handlers, and lists every group, path, shape, and text element as a named layer in the sidebar and timeline. Click the ≡ drag handle on any layer row to reorder layers — the order determines stagger timing in all exports.',
      },
      {
        title: 'Select a layer and set keyframes',
        text: 'Click any layer row in the timeline or click an element directly on the canvas preview to select it. Move the playhead to the moment you want to record, then click "+ Keyframe". Adjust X, Y, scale, rotation, opacity, fill color (inline color picker), blur, or brightness for that frame. Add as many keyframes as the animation needs — each layer\'s diamonds are visible on its own timeline row. To copy a layer\'s keyframes to another layer, press Ctrl+C on the source layer, select the target layer, and press Ctrl+V.',
      },
      {
        title: 'Refine timing and easing',
        text: 'Drag keyframe diamonds left or right on the timeline (hold Shift to snap to 5% intervals). Click the ∿ button next to any easing selector to open the bezier curve editor — drag the handles to sculpt the curve, or choose a quick preset like Bounce or Spring. Set per-layer delays and the stagger slider for cascading entrances. To save a keyframe set as a reusable preset, type a name in the My Presets input and click Save.',
      },
      {
        title: 'Apply presets for common effects',
        text: 'Use the Motion Presets panel to apply pre-built animations with one click. Entrance presets add arrival keyframes; Emphasis presets create loops; Exit presets add departure keyframes; Draw presets animate stroke-dashoffset for path drawing. Each preset generates editable keyframes — tweak timing and values as needed. Saved custom presets appear in the My Presets section below the built-in ones.',
      },
      {
        title: 'Preview with playback controls',
        text: 'Press Play (▶) to watch the full animation. Use the speed buttons (×0.5 / ×1 / ×2) to slow down or speed up for review. Toggle the preview background between dark, light, checkerboard, and custom color to see how the animation looks against its real usage context. Drag the time slider to scrub frame-by-frame.',
      },
      {
        title: 'Export to CSS, GSAP, ScrollTrigger, Framer Motion, or Lottie',
        text: 'Open the Export Code panel and choose a tab. CSS generates standard @keyframes for any stylesheet or embedded SVG. GSAP generates a gsap.timeline() with fromTo calls. ScrollTrigger wraps the GSAP timeline in a scroll-triggered configuration — change the trigger selector, start/end points, and optionally enable scrub mode for scroll-linked playback. Framer Motion generates motion.tag JSX for React. Lottie generates a 60-fps JSON file — click Download .json to save it for use in lottie-web, iOS, Android, or React Native. For session persistence, click the Gist button in the header to connect GitHub Gist sync.',
      },
      {
        title: 'Keep your Gist private — never share the URL',
        text: 'GitHub private Gists are not truly encrypted — they are unlisted links. Anyone who has your Gist URL or Gist ID can access your full project library without logging in. Never share your Gist URL, Gist ID, or Personal Access Token with anyone. For maximum privacy, skip Gist sync and use Export JSON to back up and transfer projects manually instead.',
      },
    ],
  },

  useCases: [
    {
      icon: '◎',
      title: 'Logo reveal animations',
      desc: 'Animate each part of a logo — wordmark, icon, tagline — on its own timeline track with staggered delays. Use Slide Up and Fade In presets for the entrance, then fine-tune bezier curves to get that polished ease-out deceleration. Save your timing as a custom preset to reuse across multiple logo projects. Export an animated SVG or copy the GSAP code for a JavaScript-driven reveal.',
    },
    {
      icon: '▾',
      title: 'Scroll-driven section reveals with ScrollTrigger',
      desc: 'Design an entrance animation in the timeline, then switch to the ScrollTrigger export tab. The output wraps the GSAP timeline in a scrollTrigger block with trigger, start, end, and toggleActions pre-configured. Paste it into your site, change the trigger selector to your section element, and the animation fires as users scroll to it. Enable scrub: true to link animation progress directly to scroll position for parallax-style effects.',
    },
    {
      icon: '✦',
      title: 'Landing page hero illustrations',
      desc: 'Make stars float with a looping Float preset, animate a rocket following a motion path across the canvas, and fade in background elements with staggered delays. Each layer gets its own easing, so the rocket can ease-in-out while the stars use a spring bounce. Drag the ≡ handles to reorder layers and adjust the stagger sequence. Export the CSS and paste it directly into the page stylesheet.',
    },
    {
      icon: '△',
      title: 'React and mobile animations via Lottie',
      desc: 'Build the animation visually in the timeline, then export to the Lottie tab and download the JSON file. Drop it into your React Native, iOS, or Android app using the lottie-web or lottie-react-native player. The 60-fps Lottie JSON captures position, scale, rotation, and opacity keyframes from the timeline. For web React projects, the Framer Motion tab generates motion.tag JSX with animate and transition props ready to paste into your component.',
    },
    {
      icon: '⚡',
      title: 'Cross-device projects with Gist sync',
      desc: 'Connect GitHub Gist sync by clicking the Gist button in the header and pasting a Personal Access Token with gist scope. Your animation project is pushed to a private Gist after every change. Open the studio on another machine and the latest project loads automatically. The same token works for all FWD tools — one connection covers the entire suite. No additional account or subscription required.',
    },
    {
      icon: '⊞',
      title: 'Icon and UI micro-interaction design',
      desc: 'Animate SVG icons for buttons, loading indicators, empty states, and success confirmations. Use Pulse for a heartbeat, Draw On for stroke-based check marks, Blink for notification badges, and Shake for error states. Build a keyframe set you like, save it as a custom preset, then apply it to every icon in the set. The exported CSS-driven SVG adds no JavaScript dependency and plays in all modern browsers.',
    },
    {
      icon: '▶',
      title: 'Motion prototyping for developer handoff',
      desc: 'Design the full animation in the timeline, export an HTML file, and share it with developers as a motion reference. The HTML file plays in any browser — no tooling required. Developers can inspect the generated CSS keyframes and implement them in production. Save the JSON project file and connect Gist sync so you can reopen, adjust, and push updates as feedback comes back without file transfer friction.',
    },
  ],

  faqs: faqSchema.mainEntity.map(q => ({ q: q.name, a: q.acceptedAnswer.text })),
};

export default function SvgMotionStudioPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className={styles.toolSection}><SvgMotionStudioTool /></div>
      <IndexOnly><AdSlot />
      <SeoSection {...SEO} /></IndexOnly>
    </div>
  );
}
