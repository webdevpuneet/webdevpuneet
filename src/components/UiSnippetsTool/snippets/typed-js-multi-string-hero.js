const typedJsMultiStringHero = {
  id: 'typed-js-multi-string-hero',
  title: 'Typed.js Multi-String Hero',
  lastmod: '2026-08-21',
  category: 'heroes',
  cdnUrls: [
    'https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.1.0/typed.umd.js',
  ],
  html: `<section class="tjh-hero">
  <div class="tjh-eyebrow">✦ Now hiring</div>
  <h1 class="tjh-heading">We build for<br><span id="tjhTyped" class="tjh-typed"></span><span class="tjh-caret" aria-hidden="true"></span></h1>
  <p class="tjh-sub">One product team, five very different customers — the headline cycles through who we ship for, typed and deleted in a loop by Typed.js.</p>
  <div class="tjh-actions">
    <button class="tjh-btn tjh-primary">See open roles</button>
    <button class="tjh-btn tjh-ghost">Our story →</button>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0a17;color:#eceafd;min-height:100vh}
.tjh-hero{max-width:680px;margin:0 auto;padding:14vh 24px;text-align:center}
.tjh-eyebrow{display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#a5b4fc;background:rgba(99,102,241,.14);border:1px solid rgba(99,102,241,.3);padding:5px 14px;border-radius:20px;margin-bottom:26px}
.tjh-heading{font-size:clamp(32px,6.5vw,58px);font-weight:800;line-height:1.18;letter-spacing:-.02em;margin-bottom:22px;min-height:2.4em}
.tjh-typed{background:linear-gradient(135deg,#818cf8,#e879f9);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.tjh-caret{display:inline-block;width:3px;height:.85em;background:#e879f9;margin-left:4px;vertical-align:-.1em;animation:tjhBlink 1s steps(1) infinite}
@keyframes tjhBlink{50%{opacity:0}}
.tjh-sub{color:#9691c4;font-size:16px;line-height:1.7;max-width:520px;margin:0 auto 34px}
.tjh-actions{display:flex;gap:14px;justify-content:center}
.tjh-btn{padding:13px 26px;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit}
.tjh-primary{background:linear-gradient(135deg,#6366f1,#c026d3);color:#fff;box-shadow:0 4px 20px rgba(99,102,241,.35)}
.tjh-primary:hover{transform:translateY(-2px)}
.tjh-ghost{background:rgba(255,255,255,.06);color:#eceafd;border:1px solid rgba(255,255,255,.14)}
.tjh-ghost:hover{background:rgba(255,255,255,.12)}`,

  js: `// Typed.js takes an options object with a strings array and manages the
// entire type-delete-type loop, including the cursor, itself — this is
// the whole animation, no manual setInterval/substring logic required.
const typed = new Typed('#tjhTyped', {
  strings: [
    'ambitious founders.',
    'enterprise teams.',
    'solo builders.',
    'design partners.',
    'the next big idea.',
  ],
  typeSpeed: 48,
  backSpeed: 28,
  backDelay: 1400,
  startDelay: 300,
  loop: true,
  smartBackspace: true,
  showCursor: false, // using our own CSS-animated caret instead of Typed's
});`,

  seo: {
    title: 'Typed.js Multi-String Hero — Free Typewriter Headline Snippet',
    description: `A hero headline that cycles through multiple strings with a realistic typing-and-deleting caret effect, powered by Typed.js. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Typed.js Multi-String Hero — Cycling Headlines with a Real Typewriter Loop',
      description: `A rotating headline is a common way to communicate that one product serves several different audiences without needing five separate hero sections. This snippet uses Typed.js — a small, purpose-built typewriter animation library — to cycle a hero headline through five phrases, each one typed out, held briefly, and deleted before the next begins, all driven by a single \`strings\` array.

**One options object, a full animation loop**

\`new Typed('#tjhTyped', { strings: [...], typeSpeed: 48, backSpeed: 28, backDelay: 1400, loop: true })\` is the entire animation. Typed.js owns the interval-based logic of adding one character at a time, pausing once a string is fully typed, deleting characters at a different (usually faster) speed, and moving to the next string in the array — looping back to the first once the array is exhausted. Compare this to [Typewriter](/ui-snippets/typewriter/) or [Split Text](/ui-snippets/split-text/), which build a single-string typing effect from scratch; this snippet gets the equivalent behavior across an arbitrary number of strings from one constructor call.

**Independent type and delete speeds**

\`typeSpeed: 48\` and \`backSpeed: 28\` are deliberately different — text usually reads better typing in a bit slower than it deletes, since deletion is meant to feel like a quick "clearing" gesture rather than a mirrored typing animation. \`backDelay: 1400\` is the pause after a string finishes typing and before deletion starts, giving the reader time to actually read the phrase rather than watching it vanish immediately.

**smartBackspace and why it matters here**

Because two of this hero's phrases share no common prefix while others might, \`smartBackspace: true\` tells Typed.js to only delete the characters that differ between the current string and the next one, rather than deleting the entire string down to nothing and retyping from scratch. For phrases that do share a prefix, this produces a subtly smarter, faster transition; when there's no shared prefix (as here) it behaves the same as a full backspace.

**A custom CSS caret instead of Typed's own**

Typed.js can render its own blinking cursor span, but this snippet sets \`showCursor: false\` and supplies a separate \`.tjh-caret\` element animated with a plain CSS \`@keyframes\` blink instead — this keeps the caret's exact color, width, and blink timing fully controllable in CSS rather than through Typed's cursor options, and avoids any layout shift from Typed inserting and removing its own cursor markup.

**Customizing it**

Add or remove phrases in the \`strings\` array, tune \`typeSpeed\`/\`backSpeed\`/\`backDelay\` for a snappier or more deliberate rhythm, or pair this hero with a [Hero Section](/ui-snippets/hero-section/) layout below featuring the specific audience the current phrase describes.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Typed.js CDN script', text: `Include typed.umd.js from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A hero with an empty typed span and blinking caret renders.` },
      { title: 'Watch the headline type', text: `The first phrase types out character by character.` },
      { title: 'Watch it pause, then delete', text: `After backDelay, it backspaces before typing the next phrase.` },
      { title: 'Let it loop', text: `All five phrases cycle continuously since loop is true.` },
      { title: 'Edit the strings array', text: `Replace the five phrases with your own audiences or value props.` },
    ] },
    features: [
      { title: 'Multi-string cycling', text: `A single strings array drives an unlimited phrase loop.` },
      { title: 'Independent type/delete speed', text: `typeSpeed and backSpeed tune each direction separately.` },
      { title: 'Configurable read pause', text: `backDelay controls how long a finished phrase stays visible.` },
      { title: 'Smart backspacing', text: `smartBackspace avoids re-deleting shared string prefixes.` },
      { title: 'Custom CSS caret', text: `A separately styled, independently animated blinking cursor.` },
      { title: 'Gradient typed text', text: `background-clip: text applies a gradient to the cycling phrase.` },
      { title: 'Looping by default', text: `loop: true keeps the headline cycling indefinitely.` },
      { title: 'Minimal setup', text: `One constructor call replaces manual interval-based typing logic.` },
    ],
    useCases: [
      { title: 'Multi-audience SaaS heroes', text: 'Cycle through customer segments in one headline, driven by a single `strings` array that supports an unlimited loop.' },
      { title: 'Recruiting and careers pages', text: 'Rotate roles or values, with `backDelay` controlling how long each finished phrase stays visible for reading.' },
      { title: 'Personal portfolio intros', text: 'Cycle job titles or skills in a personal portfolio introduction, with `typeSpeed` and `backSpeed` tuned independently for each direction.' },
      { title: 'Agency landing pages', text: 'Rotate industries or services under a standard [hero section](/ui-snippets/hero-section/), using `smartBackspace` to avoid deleting shared prefixes.' },
      { title: 'Positioning and onboarding', text: 'Show several use cases for one product, or compare with the lighter [typewriter](/ui-snippets/typewriter/) effect for a single phrase.' },
      { icon: 'CODE', title: 'Related: Hero with Animated Stat Counters', desc: 'See the [Hero with Animated Stat Counters](/ui-snippets/hero-stats-counter-row/) for a related heroes pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does Typed.js know when to move to the next string?', a: `The strings array is processed in order: Typed.js types out the current string one character at a time at typeSpeed, waits for backDelay once fully typed, deletes it at backSpeed, then advances to the next string in the array. Once the last string has been typed, deleted, and loop is true, it restarts from the first string, creating a continuous cycle.` },
      { q: 'What does smartBackspace actually save?', a: `Without it, Typed.js deletes a finished string down to zero characters before typing the next one from scratch. With smartBackspace: true, if the next string in the array shares a prefix with the current one, Typed.js only deletes the differing suffix and types the new suffix — producing a faster, subtly smarter-feeling transition for phrases that share common wording.` },
      { q: `Why is showCursor set to false if there's a visible caret?`, a: `Typed.js can render and animate its own cursor element automatically, but this snippet opts out of that (showCursor: false) and instead renders a separate .tjh-caret span animated with a plain CSS @keyframes blink. This gives full control over the caret's exact width, color, and blink timing directly in CSS rather than through Typed's more limited cursor styling options.` },
      { q: 'Can I trigger the typing to start only when the hero scrolls into view?', a: `Yes — instead of constructing new Typed(...) immediately on page load, wrap the construction in an IntersectionObserver callback watching the hero section, and only call new Typed('#tjhTyped', {...}) once the hero becomes visible. This defers the animation start until a visitor actually scrolls to it.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Install the typed.js npm package (or keep the CDN script), import Typed, and construct new Typed(selector, options) inside a mount effect (useEffect, onMounted, or ngAfterViewInit) targeting a ref to the span element. Call the returned instance's .destroy() method in the cleanup function to stop the typing loop and remove its DOM manipulation when the component unmounts.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to write the typing/deleting interval logic by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how Typed.js sequences through the strings array using typeSpeed, backSpeed, and backDelay, and what smartBackspace changes about the deletion behavior when consecutive phrases share a prefix. The same assistant can help you tune the rhythm — asking whether the current 48ms type speed and 1400ms read pause feel right for a five-phrase rotation, or whether shorter phrases should get a shorter backDelay than longer ones. It's also useful for extending the hero: ask it to defer starting the Typed.js instance until the hero scrolls into view using an IntersectionObserver, swap the custom CSS caret's color per phrase, or add a fade transition between phrases in addition to the type/delete effect. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a hero section with a headline that cycles through multiple strings using a realistic type-then-delete animation, powered by the Typed.js library loaded from a CDN.

Requirements:
- A hero section with an eyebrow label, a large heading containing an empty inline span reserved for the typed text plus a separately styled blinking caret element, a supporting paragraph, and two call-to-action buttons.
- Initialize a single new Typed(selector, options) instance targeting the empty span, passing an array of at least five distinct phrases as the strings option.
- Configure typeSpeed and backSpeed as two different numeric values (typing should generally feel a bit slower than deleting), a backDelay controlling how long a fully-typed phrase pauses before deletion begins, and loop: true so the cycle repeats indefinitely through all phrases.
- Enable smartBackspace so that if two consecutive phrases in the array happen to share a prefix, Typed.js only deletes the differing suffix rather than deleting the entire phrase down to nothing.
- Disable Typed.js's own built-in cursor (showCursor: false) and instead implement a separate caret element styled and animated purely with CSS (a simple opacity blink via @keyframes), positioned immediately after the typed text span.
- Apply a CSS gradient text effect (background-clip: text) to the typed span so the cycling phrase itself is visually distinct from the static portion of the headline.`,
    },
  },
};

export default typedJsMultiStringHero;
