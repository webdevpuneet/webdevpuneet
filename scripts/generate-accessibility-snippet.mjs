// Builds the UI snippet "accessibility-toolbar-widget" from the Accessibility Toolbar section template:
//   src/components/UiSnippetsTool/snippets/accessibility-toolbar-widget.js
// The widget's html / css / js come straight from the template export (snippetParts + behaviorScript), so the
// snippet IS the template. This script adds a demo page (example text, links, an image, moving parts) around
// it so visitors can switch the options on and see the page change, plus the hand-written SEO text.
// It also registers the snippet in snippets.js. Re-runnable:  node scripts/generate-accessibility-snippet.mjs
import fs from 'node:fs';
import path from 'node:path';
import { SECTION_TEMPLATES, defaultSectionState } from '../src/components/SectionTemplates/templates/index.js';
import { snippetParts } from '../src/components/SectionTemplates/templates/render.js';
import { behaviorScript } from '../src/components/SectionTemplates/templates/behaviors.js';

const ID = 'accessibility-toolbar-widget';
const TODAY = new Date().toISOString().slice(0, 10);
const FILE = path.resolve(`src/components/UiSnippetsTool/snippets/${ID}.js`);
const REGISTRY = path.resolve('src/components/UiSnippetsTool/snippets.js');

const t = SECTION_TEMPLATES.find(x => x.id === 'accessibility-toolbar');
const parts = snippetParts(t, defaultSectionState(t));
const esc = s => s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

/* ---- demo page: example text so every option has something to change ---- */
const demoHtml = `<div class="atw-page">
  <header class="atw-top">
    <a class="atw-brand" href="#"><span class="atw-logo" aria-hidden="true"></span>Maple Grove School</a>
    <nav class="atw-nav" aria-label="Demo menu"><a href="#">News</a><a href="#">Events</a><a href="#">Parents</a><a href="#">Contact</a></nav>
  </header>
  <div class="atw-ticker" aria-hidden="true"><span>Spring concert on Friday &middot; Library open until 6 pm &middot; Charity run sign-ups close Monday &middot; </span></div>
  <main class="atw-main">
    <p class="atw-kicker">Newsletter &middot; Term 3</p>
    <h1>Welcome back to a busy spring term</h1>
    <p class="atw-lead">New clubs, a spring concert and a charity run: here is everything happening at Maple Grove over the next six weeks.</p>
    <img class="atw-photo" src="https://webdevpuneet.com/images/section-templates/hero-landscape.jpg" alt="Green hills at sunrise behind the school fields" width="1200" height="520">
    <h2>Clubs and activities</h2>
    <p>Sign-ups for after-school clubs are now open. Choose from coding, chess, football, choir and art. Places are limited, so please <a href="#">read the full schedule</a> and register by Friday. Every club is free for pupils in years 3 to 6.</p>
    <p>Our reading corner has also been refreshed with over 400 new books. Parents are welcome to borrow them too, and our librarian is happy to <a href="#">suggest titles for every age</a>.</p>
    <div class="atw-cards">
      <article class="atw-card"><h3>Spring concert</h3><p>Friday at 6 pm in the main hall. Doors open at 5:30 pm and entry is free.</p></article>
      <article class="atw-card"><h3>Charity run</h3><p>A 3 km family fun run on Saturday morning, raising money for the new playground.</p><span class="atw-pulse">Sign up</span></article>
      <article class="atw-card"><h3>Parents evening</h3><p>Book a ten-minute slot with your child's teacher using the <a href="#">online booking page</a>.</p></article>
    </div>
    <h2>Contact the office</h2>
    <p>Questions about term dates, meals or transport? Send us a message and we will reply within one working day.</p>
    <form class="atw-form" onsubmit="return false">
      <label for="atw-email">Your email</label>
      <input id="atw-email" type="email" placeholder="you@example.com">
      <button type="submit">Send message</button>
    </form>
  </main>
  <footer class="atw-foot">&copy; 2026 Maple Grove School &middot; An example page for the accessibility toolbar</footer>
</div>
`;

const demoCss = `/* Demo page (example content for the toolbar to change) */
*{box-sizing:border-box}
body{margin:0;background:#fff;color:#1e293b;font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.6}
.atw-page{min-height:100vh;display:flex;flex-direction:column}
.atw-top{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:16px 32px;border-bottom:1px solid #e2e8f0}
.atw-brand{display:inline-flex;align-items:center;gap:10px;font-weight:700;font-size:19px;color:#14532d;text-decoration:none}
.atw-logo{width:26px;height:26px;border-radius:8px;background:linear-gradient(135deg,#16a34a,#facc15)}
.atw-nav{display:flex;gap:20px}
.atw-nav a{color:#334155;text-decoration:none;font-size:15px}
.atw-ticker{overflow:hidden;white-space:nowrap;background:#14532d;color:#ecfccb;font-size:14px;padding:8px 0}
.atw-ticker span{display:inline-block;padding-left:100%;animation:atw-scroll 22s linear infinite}
@keyframes atw-scroll{to{transform:translateX(-100%)}}
.atw-main{width:100%;max-width:760px;margin:0 auto;padding:40px 24px 72px}
.atw-kicker{margin:0 0 8px;font:700 13px/1 system-ui,sans-serif;letter-spacing:.1em;text-transform:uppercase;color:#16a34a}
.atw-main h1{margin:0 0 14px;font-size:clamp(30px,5vw,44px);line-height:1.15;color:#0f172a}
.atw-main h2{margin:36px 0 10px;font-size:24px;color:#0f172a}
.atw-lead{font-size:19px;color:#475569}
.atw-photo{display:block;width:100%;height:auto;margin:24px 0;border-radius:14px;background:linear-gradient(135deg,#86efac,#fde68a)}
.atw-main a{color:#15803d}
.atw-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;margin:24px 0}
.atw-card{padding:18px;border:1px solid #e2e8f0;border-radius:14px;background:#f8fafc}
.atw-card h3{margin:0 0 6px;font-size:18px;color:#0f172a}
.atw-card p{margin:0 0 10px;font-size:15px}
.atw-pulse{display:inline-block;padding:6px 14px;border-radius:999px;background:#16a34a;color:#fff;font:700 13px/1 system-ui,sans-serif}
.atw-form{display:grid;gap:10px;max-width:420px}
.atw-form label{font:600 14px/1 system-ui,sans-serif}
.atw-form input{padding:12px 14px;border:1.5px solid #cbd5e1;border-radius:10px;font:inherit}
.atw-form button{justify-self:start;padding:12px 22px;border:0;border-radius:10px;background:#14532d;color:#fff;font:700 15px/1 system-ui,sans-serif;cursor:pointer}
.atw-foot{margin-top:auto;padding:20px 32px;border-top:1px solid #e2e8f0;font-size:14px;color:#64748b;text-align:center}
@media (max-width:640px){.atw-top{flex-direction:column;align-items:flex-start;padding:14px 20px}.atw-nav{gap:14px;flex-wrap:wrap}}
/* The accessibility toolbar (from the section template) */
`;

const demoJs = `// Demo only: a GSAP animation, so "Pause animations" is seen stopping both CSS and GSAP motion
if (window.gsap) gsap.to('.atw-pulse', { scale: 1.12, duration: 0.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });

// The toolbar (the same code the Website Section Templates export gives you)
`;

const html = demoHtml + parts.html;
const css = demoCss + parts.css;
const js = demoJs + behaviorScript(t);
const cdn = ['https://cdnjs.cloudflare.com/ajax/libs/gsap/3.15.0/gsap.min.js'];

/* ---- SEO ---- */
const seo = {
  title: 'Accessibility Toolbar Widget: HTML, CSS & JS Snippet',
  description: 'Floating accessibility widget with a live demo page: bigger text, contrast, grayscale, readable font, hide images, pause animations and a reading mask.',
  subtitle: 'Free accessibility widget in plain HTML, CSS & JavaScript · 10 options · Remembers choices · Try it on the demo page',
  about: {
    title: 'Accessibility Toolbar Widget: A Floating Panel That Lets Visitors Adjust Your Page',
    description: `This snippet adds a floating accessibility button to a page, like the Ally and UserWay widgets, without a subscription or a third-party script. Click the round button in the corner of the preview, switch an option on, and watch the demo page change in front of you: the text grows, the colours drain, the images disappear. It is plain HTML, CSS and JavaScript, built from the free [Accessibility Toolbar Widget](/website-section-templates/accessibility-toolbar/) section template, where you can edit the labels and colours visually and export the same code.

**Ten options visitors can switch on**

The panel groups its options into Text, Visual and Orientation. **Bigger text** scales the text on the page in three steps, **line height** adds space between lines, **text align** cycles left, centre and right, and **readable font** swaps in a plain, widely installed typeface. **Contrast** has a high-contrast level and a dark inverted level, **grayscale** removes colour, **hide images** clears pictures and background images, and **pause animations** stops CSS animations, video and GSAP timelines. **Highlight links** puts every link on a bright underlined background, and the **reading mask** darkens the page except for a strip that follows the pointer, touch or keyboard focus.

**How the options are applied**

Each option sets a data attribute on the \`<html>\` element, and one injected \`<style>\` element holds the rules, such as \`html[data-a11y-font] body *:not(.a11y *)\`. The \`:not(.a11y *)\` part keeps the widget itself out of every rule, so the panel never becomes unreadable. Text size is the one exception: the script records each text element's computed size once and writes a scaled \`font-size\`, so layouts using rem, px or clamp() all grow together.

**Filters without breaking the button**

Putting \`filter: grayscale(1)\` on \`<html>\` or \`<body>\` would also filter the widget, and on \`<body>\` it would turn \`position: fixed\` descendants into absolutely positioned ones. The script instead adds a small class to the page's other top-level blocks and applies the filter to those, walking down the branch that contains the widget. The fixed button and panel stay sharp and stay where they are.

**It remembers each visitor**

Choices are written to localStorage inside a try/catch, applied again after the page loads and cleared by the reset button. If storage is blocked, the widget still works for the current page. You can turn memory off with the \`data-remember="off"\` attribute.

**Keyboard and screen reader basics**

The button has an accessible name and \`aria-expanded\`, every option is a real button with \`aria-pressed\`, Esc closes the panel and focus returns to the button. A widget is a helpful extra, not a substitute for an accessible page: headings in order, alt text, labelled forms, enough contrast and keyboard access still have to be built into the page itself.

**Customise and reuse**

Rename any label to translate the panel, remove options you do not need by deleting their tiles and their entries in the \`LEVELS\` object, and change the brand colour through the \`--st-brand\` variable. To use it in a framework, export it as React or Vue, or open the template in the [Website Builder](/website-builder/).`,
  },
  howToUse: {
    type: 'steps',
    items: [
      { title: 'Click the round button in the corner', text: 'The floating accessibility button opens a panel with three groups: Text, Visual and Orientation.' },
      { title: 'Switch on Bigger text', text: 'Each click steps through three sizes and back to normal. The level dots on the tile show where you are.' },
      { title: 'Try contrast, grayscale and Hide images', text: 'The demo page changes at once while the button and the panel stay untouched.' },
      { title: 'Turn on Highlight links and the Reading mask', text: 'Links get a bright underline, and the page dims everywhere except a strip that follows your pointer.' },
      { title: 'Pause animations', text: 'The moving banner and the pulsing Sign up badge stop, which covers both CSS and GSAP animation.' },
      { title: 'Reload the preview or press Reset', text: 'Your choices are remembered on this device; the reset icon in the panel header clears all of them.' },
      { title: 'Make it yours', text: 'Edit the labels in the HTML, delete options you do not need, or open the Website Section Template to change them visually.' },
    ],
  },
  features: [
    'Floating button in the bottom corner that takes no space in the page layout',
    'Bigger text in three steps, line height and text alignment options',
    'Readable font option using a plain, widely installed typeface',
    'High-contrast and dark inverted modes, with images kept natural when inverted',
    'Grayscale, hide images and pause animations (CSS, video and GSAP)',
    'Highlight links and a reading mask that follows the pointer, touch or keyboard focus',
    'Filters applied to the page blocks, never to the widget, so the button stays fixed and readable',
    'Choices saved in localStorage, restored on load, with a reset button and a safe fallback',
    'Keyboard friendly: aria-expanded, aria-pressed, Esc to close and focus returned to the button',
    'Plain HTML, CSS and JavaScript, exportable to React, Vue and Tailwind from this page',
  ],
  useCases: [
    { icon: 'ACCESS', title: 'School, council and charity websites', desc: 'Give pupils, parents and residents a visible way to enlarge text and raise contrast on information-heavy pages, on top of properly built content.' },
    { icon: 'APP', title: 'Clinics, shops and service sites', desc: 'Let older or low-vision visitors make opening hours, prices and booking forms easier to read, or hide busy images and pause moving banners.' },
    { icon: 'LEARN', title: 'Learning page-wide display options', desc: 'Study how root attributes, an injected style element, filters on sibling blocks and a pointer-following mask combine into one widget.' },
    { icon: 'CODE', title: 'Related: Skip to Content Link', desc: 'See the [Skip to Content Link](/ui-snippets/skip-to-content-link/) for a keyboard shortcut that belongs on every accessible page, next to the toolbar.' },
    { icon: 'CODE', title: 'Related: Reading Mode Toggle', desc: 'Compare with the [Reading Mode Toggle](/ui-snippets/reading-mode-toggle/), which changes one reading setting where this toolbar combines ten.' },
  ],
  faqs: [
    { q: 'Does an accessibility widget make my website compliant?', a: 'No. A widget helps visitors change how a page looks, but compliance depends on the page itself: heading order, alt text, labelled forms, colour contrast and keyboard access. Use the toolbar as a helpful extra and test your pages.' },
    { q: 'How does the bigger text option work?', a: 'The script records each text element\'s computed font size once, then writes a scaled font-size (115%, 130% or 150%) with !important. Going back to level zero restores the original inline values.' },
    { q: 'Why are filters not set on the html or body element?', a: 'A filter on the html or body element would also filter the widget, and on body it makes fixed descendants behave like absolute ones. The snippet applies filters to the page\'s other top-level blocks and walks down the branch containing the widget.' },
    { q: 'Are the visitor\'s choices saved?', a: 'Yes. They are stored in localStorage and applied again after the page loads, so they carry to other pages on the same site. Reset clears them, and data-remember="off" turns saving off.' },
    { q: 'Can I translate the labels or remove options?', a: 'Yes. Every label is plain text in the HTML, so edit it to translate. To remove an option, delete its tile and its key in the LEVELS object in the script.' },
    { q: 'Can I use this in React, Vue or Angular?', a: 'Yes. Click "JSX" for a React component, "Vue" for a single-file component or "Angular" for a standalone component. Initialise the script once after mount, and remove the injected style element when the component unmounts.' },
  ],
  aiPrompt: {
    paragraph: 'Paste this snippet\'s HTML, CSS and JavaScript into an AI coding assistant like Claude and ask it to explain how the filters avoid affecting the fixed widget, or to add a dyslexia-friendly font, a cursor size option, or a keyboard shortcut that opens the panel. It can also review the options against WCAG 2.2 success criteria.',
    prompt: `Build a floating accessibility toolbar in plain HTML, CSS and vanilla JavaScript, with a demo page behind it.

Requirements:
- A fixed round button in the bottom-right corner with an accessible name and aria-expanded. It opens a non-modal panel (role="dialog"); Esc and a close button close it and return focus to the button.
- The panel has a header with a title, a reset icon and a close icon, then three groups of tiles: Text (bigger text with 3 steps, line height with 2 steps, text align left/centre/right, readable font), Visual (contrast with high-contrast then inverted dark levels, grayscale, hide images, pause animations) and Orientation (highlight links, reading mask).
- Each tile is a real button with aria-pressed; clicking steps through its levels and back to off, shown by small level dots.
- Apply options with data attributes on the html element and one injected style element. Exclude the widget from every rule with :not(.a11y *). Scale text by recording each text element's computed font-size once and writing a scaled font-size.
- Apply filters (contrast, grayscale) to the page's other top-level blocks, never to html or body, by adding a class while walking down the branch that contains the widget.
- Pause animations sets animation and transition to none, pauses video and calls gsap.globalTimeline.pause() when GSAP is present.
- The reading mask is two dark fixed bars with a clear strip that follows the mouse, touch and focused element.
- Save choices in localStorage inside try/catch, restore them after the page loads, and clear them with reset. Respect prefers-reduced-motion and hide the widget when printing.
- Include a realistic demo page (header, ticker animation, article with an image, cards, links and a form) so every option visibly changes something.`,
  },
};

const out = `// Generated by scripts/generate-accessibility-snippet.mjs from the "accessibility-toolbar" section template.
// Do not edit the widget code by hand: change the template, then regenerate this file.
const accessibilityToolbarWidget = {
  id: '${ID}',
  title: 'Accessibility Toolbar Widget',
  lastmod: '${TODAY}',
  category: 'misc',
  cdnUrls: ${JSON.stringify(cdn)},
  html: \`${esc(html)}\`,

  css: \`${esc(css)}\`,

  js: \`${esc(js)}\`,

  seo: ${JSON.stringify(seo, null, 2).replace(/\n/g, '\n  ')},
};

export default accessibilityToolbarWidget;
`;
const old = fs.existsSync(FILE) ? fs.readFileSync(FILE, 'utf8') : null;
if (old === null || old.replace(/lastmod: '[^']*'/, '') !== out.replace(/lastmod: '[^']*'/, '')) {
  fs.writeFileSync(FILE, out);
  console.log(old === null ? '+ new' : '✓ updated', ID, `${(out.length / 1024).toFixed(0)} KB`);
} else console.log('= unchanged', ID);

// Register in snippets.js (idempotent)
let reg = fs.readFileSync(REGISTRY, 'utf8');
if (!reg.includes(`from './snippets/${ID}.js'`)) {
  const camel = 'accessibilityToolbarWidget';
  const lastImport = [...reg.matchAll(/^import .*;$/gm)].filter(m => m[0].includes("'./snippets/")).pop();
  reg = reg.slice(0, lastImport.index + lastImport[0].length) + `\nimport ${camel} from './snippets/${ID}.js';` + reg.slice(lastImport.index + lastImport[0].length);
  const end = reg.lastIndexOf('];');
  reg = reg.slice(0, end) + `  ${camel},\n` + reg.slice(end);
  fs.writeFileSync(REGISTRY, reg);
  console.log('registered in snippets.js');
}
