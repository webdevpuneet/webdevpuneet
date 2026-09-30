const calloutBox = {
  id: 'callout-box',
  title: 'Callout / Admonition Box',
  category: 'cards',
  html: `<div class="callouts">
  <div class="callout note">
    <span class="ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg></span>
    <div class="body"><p class="ct-title">Note</p><p>Configuration changes take effect after a restart of the service.</p></div>
  </div>

  <div class="callout tip">
    <span class="ic"><svg viewBox="0 0 24 24"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1v.2h6v-.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z"/></svg></span>
    <div class="body"><p class="ct-title">Tip</p><p>Use keyboard shortcuts to switch tabs without reaching for the mouse.</p></div>
  </div>

  <div class="callout warning">
    <span class="ic"><svg viewBox="0 0 24 24"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span>
    <div class="body"><p class="ct-title">Warning</p><p>This action cannot be undone once the deployment goes live.</p></div>
  </div>

  <div class="callout danger">
    <span class="ic"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg></span>
    <div class="body"><p class="ct-title">Danger</p><p>Deleting your account erases all data permanently and immediately.</p></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, sans-serif;
  background: #f8fafc;
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  padding: 30px 20px;
}

.callouts { width: 100%; max-width: 520px; display: flex; flex-direction: column; gap: 14px; }

.callout {
  display: flex; gap: 13px;
  padding: 15px 16px;
  border-radius: 12px;
  border: 1px solid;
  /* Colored left accent bar via a thick left border */
  border-left-width: 4px;
}

.ic { flex-shrink: 0; width: 22px; height: 22px; }
.ic svg { width: 22px; height: 22px; fill: none; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }

.body { min-width: 0; }
.ct-title { font-size: 13.5px; font-weight: 800; margin-bottom: 3px; }
.callout .body p:last-child { font-size: 13.5px; line-height: 1.6; color: #334155; }

/* Variants: tinted background, matching border + icon + title */
.callout.note    { background: #eff6ff; border-color: #bfdbfe; border-left-color: #3b82f6; }
.callout.note .ic svg, .callout.note .ct-title    { color: #2563eb; stroke: #2563eb; }

.callout.tip     { background: #f0fdf4; border-color: #bbf7d0; border-left-color: #22c55e; }
.callout.tip .ic svg, .callout.tip .ct-title      { color: #16a34a; stroke: #16a34a; }

.callout.warning { background: #fffbeb; border-color: #fde68a; border-left-color: #f59e0b; }
.callout.warning .ic svg, .callout.warning .ct-title { color: #d97706; stroke: #d97706; }

.callout.danger  { background: #fef2f2; border-color: #fecaca; border-left-color: #ef4444; }
.callout.danger .ic svg, .callout.danger .ct-title { color: #dc2626; stroke: #dc2626; }`,
  js: `// 100% pure CSS — no JavaScript. Each .callout variant (note/tip/warning/danger) is styled by its class.`,

  seo: {
    title: 'Callout Box — Note, Tip & Warning Admonition Snippet',
    description: 'Docs-style callout boxes in note, tip, warning, and danger variants with an icon, accent bar, and tinted background. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Callout / Admonition Box — Note, Tip, Warning & Danger Variants in Pure CSS',
      description: `A callout box — also called an admonition, [alert](/ui-snippets/alert-banner/), or note box — is one of the most-searched content components because every documentation site, README, blog post, and help center needs a way to make important asides stand out from the body text (often right beside a [code block](/ui-snippets/code-block/)). This snippet ships **four ready-made variants** — note, tip, warning, and danger — each with an icon, a colored accent bar, a tinted background, and a title, built entirely with pure CSS. The variant is set by a single class, so adding a callout to any content is one line of markup.

**The anatomy of a callout**

Each callout is a flex row with two parts: an **icon** on the left that signals the type at a glance, and a **body** with a bold title and the message. The whole box has a tinted background, a subtle full border, and — the signature detail — a **thicker colored left border** (\`border-left-width: 4px\`) that acts as an accent bar. This left-accent-bar pattern is the visual convention readers immediately recognize as "this is a callout," used by GitHub, MDN, Docusaurus, and virtually every docs framework. The combination of color, icon, and accent makes the callout's importance and category obvious without reading a word.

**Color-coding by severity**

The four variants follow a universal severity scale that readers already understand: **note** is blue (neutral information), **tip** is green (a helpful suggestion), **warning** is amber (proceed with caution), and **danger** is red (destructive or irreversible). Each variant coordinates four things — the background tint, the full border color, the left-accent-bar color, and the icon plus title color — so the callout reads as a single coherent color. Changing the variant class (\`note\`/\`tip\`/\`warning\`/\`danger\`) re-skins the entire box. Using conventional colors means the meaning is instant: a red box says "stop and read this" before the reader processes the text.

**Matching icons to meaning**

Color alone is not enough — color-blind readers and quick scanners benefit from distinct **icons** per type: an info circle for note, a lightbulb for tip, a warning triangle for warning, and an X-circle for danger. The icons are inline SVGs that inherit the variant's color via \`stroke\`, so they always match the box. Pairing a recognizable icon with the color means the callout type is identifiable two ways, which is both clearer and more accessible than relying on hue alone — the same reason good alert components never use color as their only signal.

**Why a single class drives everything**

The power of this component is that all the styling cascades from one class on the wrapper. Markup-wise, a callout is just \`<div class="callout warning">\` with an icon and body inside — no per-element color classes, no inline styles. The CSS targets \`.callout.warning .ct-title\`, \`.callout.warning .ic svg\`, etc., so the title, icon, background, and borders all derive from that one word. This is exactly how documentation tooling works (you write \`:::warning\` and the renderer adds the class), and it makes callouts trivial to author and consistent across a whole site.

**Built for content, not chrome**

Callouts live inside flowing content — paragraphs, lists, code blocks — so they are designed to sit naturally in a column of text. They have comfortable padding, readable line height, and a max-width that matches a content column. The body text uses a neutral slate color so it stays legible regardless of the variant's accent. Because the box is just a styled \`div\`, you can put anything inside it: multiple paragraphs, a list, a link, even a code snippet — the icon stays pinned to the top-left while the body flows.

**Customizing the callouts**

Re-theme any variant by changing its four coordinated colors (background, border, left-accent, icon/title) — keep them as shades of one hue so the box reads as a single color. Add new variants (for example, "success" or "info") by copying a block and swapping the hue. Swap the icons for your icon set; they inherit color automatically via \`stroke: currentColor\` if you set the title color on a shared parent. To make the title optional, just omit the \`.ct-title\` paragraph. For a more minimal look, drop the full border and keep only the left accent bar and background tint. Because everything is class-driven CSS, these are all small edits.

**Accessibility considerations**

For purely visual emphasis, a callout is a styled container and needs no special ARIA. If a callout conveys something a screen-reader user must not miss (like a danger warning), you can add \`role="note"\` for general asides, or for time-sensitive alerts use \`role="alert"\` (which announces immediately) — but reserve \`alert\` for genuinely urgent, dynamically-inserted messages, not static page content. The icon is decorative and the title text provides the category in words, so the meaning is available without seeing the color or icon. Keep sufficient contrast between the body text and the tinted background (the slate-on-light-tint here passes AA) so the message stays readable in every variant.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Copy a callout', text: 'Each callout is a <div class="callout VARIANT"> with an .ic icon and a .body (title + message). Pick the variant: note, tip, warning, or danger.' },
        { title: 'Set the type with one class', text: 'Change the variant word on the wrapper to re-skin the whole box — background, border, accent bar, icon, and title all follow.' },
        { title: 'Edit the title and message', text: 'Change the .ct-title text and the message paragraph. You can put multiple paragraphs, lists, or code inside the .body.' },
        { title: 'Add your own variant', text: 'Copy a CSS variant block and swap the hue for a new type like "success" or "info", coordinating all four colors.' },
        { title: 'Swap the icons', text: 'Replace the inline SVGs with your icon set; they inherit the variant color via stroke automatically.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Four ready variants: note (blue), tip (green), warning (amber), danger (red)',
      'Signature colored left accent bar (thick left border) readers recognize as a callout',
      'Coordinated color: background tint, border, accent bar, icon, and title all match',
      'Distinct icon per type so the category is clear without relying on color alone',
      'Icons inherit the variant color via stroke for automatic theming',
      'Single class on the wrapper drives all the styling — one-line authoring',
      'Body flows naturally with the icon pinned top-left; holds lists, links, code',
      'Content-column max-width and readable line height for in-article use',
      'Pure CSS — no JavaScript at all',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
    ],
    useCases: [
      { icon: 'DOC',    title: 'Documentation & READMEs',           desc: 'Highlight notes, tips, warnings, and danger asides in technical docs, guides, and README files the way every docs framework does.' },
      { icon: 'LEARN',  title: 'Tutorials and blog posts',          desc: 'Pull important caveats and pro tips out of the body text so readers do not miss them while skimming.' },
      { icon: 'APP',    title: 'In-app help and onboarding',        desc: 'Inline guidance and cautions inside settings, forms, and wizards where a full toast or modal would be too heavy.' },
      { icon: 'CODE',   title: 'Markdown / MDX admonitions',        desc: 'Map :::note / :::warning syntax to these classes so authors write callouts in Markdown and get consistent styling.' },
      { icon: 'DESIGN', title: 'Design-system alert blocks',        desc: 'Add note/tip/warning/danger as standard content components, re-themeable to your brand from four coordinated colors.' },
      { icon: 'ACCESS', title: 'Color-plus-icon clarity',          desc: 'Each type is identified by both an icon and a color and named in the title, so the meaning is clear without relying on hue.' },
      { icon: 'CODE', title: 'Related: Empty State with Sample Data Toggle', desc: 'See the [Empty State with Sample Data Toggle](/ui-snippets/empty-state-sample-data-toggle/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is a callout or admonition box?', a: 'It is a styled container that lifts an important aside — a note, tip, warning, or danger message — out of the surrounding text. It typically has a colored left accent bar, a tinted background, an icon, and a title, so readers immediately see its importance and category. Docs frameworks like Docusaurus and MkDocs call these admonitions.' },
      { q: 'How do I change the callout type?', a: 'Change the single variant class on the wrapper — note, tip, warning, or danger. The CSS derives the background tint, border, left accent bar, icon color, and title color from that one class, so the whole box re-skins at once.' },
      { q: 'Why include an icon as well as a color?', a: 'Color alone fails for color-blind readers and quick scanners. Each variant has a distinct icon (info, lightbulb, triangle, X-circle) that inherits the variant color, so the type is identifiable two ways — by icon and by color — which is clearer and more accessible.' },
      { q: 'How do I add a new variant like "success"?', a: 'Copy one of the variant CSS blocks and change the four coordinated colors — background tint, full border, left-accent border, and icon/title color — to a new hue. Then use that variant word as the wrapper class.' },
      { q: 'Do callouts need ARIA roles?', a: 'For visual emphasis on static content, no — it is just a styled container. You can add role="note" for general asides. Reserve role="alert" for genuinely urgent, dynamically-inserted messages, since it announces immediately; do not use it for static page content.' },
      { q: 'Can I use these callout boxes in React?', a: 'Yes. Click "JSX" for a React component or "Tailwind" for a React + Tailwind version. In React, make a <Callout type="warning"> component that maps the type prop to the variant class and renders the matching icon, so authors just pass a type and content.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to compare every variant's four coordinated colors by hand to see the pattern here. Paste this snippet's HTML and CSS into an AI coding assistant like Claude and ask it to explain exactly why the border-left-width is set independently from the full border color, and how a single class like callout.warning cascades down to restyle the background, both border colors, the icon stroke, and the title text all at once through descendant selectors. The same assistant can help optimize it — asking whether the four variants' color values should become CSS custom properties scoped per variant so a rebrand only touches root-level tokens, or whether the decorative icons need any ARIA treatment given the title text already names the category in words. It's also useful for extending the set: ask it to add a fifth "success" variant, a dismissible close button, or a compact inline version for use mid-sentence rather than as a block. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a set of documentation-style "callout/admonition boxes" in plain HTML and CSS only, no JavaScript, with four semantic variants driven entirely by a single class name each.

Requirements:
- Exactly four variants — note, tip, warning, and danger — each a flex row containing a small icon on the left and a body containing a bold title and message text on the right.
- Every variant must coordinate exactly four visual properties from one shared hue: a tinted background color, a full border color, a distinctly thicker left border color (functioning as a colored accent bar), and a matching icon-and-title text color — changing only the single variant class name on the wrapper element must be sufficient to re-skin all four properties at once, with no other classes needed anywhere else in the markup.
- Give each variant a visually distinct icon (not just a different color of the same icon) so the category remains identifiable even without color vision — an info circle for note, a lightbulb for tip, a warning triangle for warning, and an X-circle for danger — with the icon's stroke color inheriting from the variant automatically rather than being hardcoded per icon.
- Style the body so it can contain more than a single paragraph (multiple paragraphs, a list, or inline code) without breaking the layout, with the icon staying pinned to the top-left regardless of how much content follows in the body.
- Keep the box comfortable for reading inline within flowing article content: appropriate padding, line-height, and a content-column-appropriate max-width, with body text using one neutral color across all four variants so message readability never depends on which variant is active.`,
    },
  },
};

export default calloutBox;
