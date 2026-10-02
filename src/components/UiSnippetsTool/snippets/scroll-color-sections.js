const scrollColorSections = {
  id: 'scroll-color-sections',
  title: 'Scroll Color Sections',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<main class="cs-wrap" id="csWrap">
  <section class="cs-sec" data-bg="#0e1430" data-fg="#dfe6ff"><h2>Midnight</h2><p>The background fades as each section meets the middle of the screen.</p></section>
  <section class="cs-sec" data-bg="#2a123a" data-fg="#f7e6ff"><h2>Plum</h2><p>No hard cuts — colors crossfade with your scroll.</p></section>
  <section class="cs-sec" data-bg="#0c3030" data-fg="#dffcf4"><h2>Teal</h2><p>Each theme also tints the text for contrast.</p></section>
  <section class="cs-sec" data-bg="#33240c" data-fg="#fff0d6"><h2>Amber</h2><p>Driven by GSAP ScrollTrigger toggles.</p></section>
  <section class="cs-sec" data-bg="#0e1430" data-fg="#dfe6ff"><h2>Back to start</h2><p>And it all reverses on the way up.</p></section>
</main>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{font-family:system-ui,-apple-system,sans-serif;background:#0e1430;color:#dfe6ff;transition:background-color .6s ease,color .6s ease}
.cs-wrap{position:relative}
.cs-sec{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:14px;padding:clamp(24px,8vw,140px)}
.cs-sec h2{font-size:clamp(40px,9vw,104px);letter-spacing:-.03em;font-weight:800}
.cs-sec p{font-size:clamp(15px,2.2vw,20px);max-width:440px;opacity:.82}`,

  js: `gsap.registerPlugin(ScrollTrigger);

// When a section reaches the middle of the viewport, theme the page to its colors.
function theme(bg, fg) {
  gsap.to(document.body, { backgroundColor: bg, color: fg, duration: 0.6, overwrite: 'auto' });
}

gsap.utils.toArray('.cs-sec').forEach(function (sec) {
  ScrollTrigger.create({
    trigger: sec,
    start: 'top center',   // entering from below
    end: 'bottom center',  // section owns the theme while it spans center
    onToggle: function (self) {
      if (self.isActive) theme(sec.dataset.bg, sec.dataset.fg);
    }
  });
});`,

  seo: {
    title: 'Scroll Color Sections — Free GSAP ScrollTrigger Color Shift',
    description: `Full-screen sections that crossfade the page background and text color as each reaches center, using GSAP ScrollTrigger toggles. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Color Sections — Crossfade the Page Theme as You Scroll',
      description: `Scroll color sections is the effect where the entire page background smoothly shifts color as you move from one full-screen section to the next, each section owning its own palette — the immersive technique on product and portfolio sites that makes scrolling feel like changing rooms. This snippet builds it with GSAP and ScrollTrigger (from a CDN), plus plain HTML and CSS.

**Palettes as data**

Each section declares its theme with two attributes: \`data-bg\` for the background and \`data-fg\` for the text color. The script reads these when the section becomes active, so the palette lives in the markup, not the code — adding a section or recoloring one is a two-attribute change. One loop wires every section to the same logic.

**Toggle on center crossing**

For each section a \`ScrollTrigger\` is created with \`start: 'top center'\` and \`end: 'bottom center'\`, so the trigger is "active" precisely while that section spans the middle of the viewport. Its \`onToggle\` callback checks \`self.isActive\` and themes the page to that section's colors. Using the viewport center as the boundary means the new palette takes over exactly when the new section dominates the screen — the most natural moment to switch — and reverts as you scroll back up.

**Crossfade, not cut**

The actual color change is a GSAP tween on \`document.body\`'s \`backgroundColor\` and \`color\` with a short duration, so the page eases between palettes instead of snapping. \`overwrite: 'auto'\` cancels any in-flight color tween when a new one starts, which prevents flicker if you scroll quickly through several sections — the new target simply takes over from wherever the color currently is. A CSS \`transition\` on the body is also present as a fallback.

**Why ScrollTrigger toggles fit this**

This is a discrete state effect (which section is in charge), not a continuous scrub, so \`onToggle\` with active/inactive states is the right tool — far cleaner than computing scroll math by hand or stacking IntersectionObservers with threshold tuning. ScrollTrigger handles the enter/leave boundaries and the reverse direction automatically.

**Tinted text for contrast**

Because each palette sets both background and foreground, text stays readable on every theme — a light foreground on the dark plum, a warm one on amber. Pairing the two colors per section is what keeps contrast correct as the whole page recolors.

**Customizing it**

Add sections with their own palettes, change the crossfade duration, switch the boundary (e.g. \`top 60%\`), or also tween an accent variable for buttons and links. Pair it with a [scroll parallax layers](/ui-snippets/scroll-parallax-layers/) scene, a [scroll zoom hero](/ui-snippets/scroll-zoom-hero/), or [reveal on scroll](/ui-snippets/reveal-on-scroll/) content.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `Five full-screen color sections render.` },
      { title: 'Scroll down', text: `The page background crossfades per section.` },
      { title: 'Scroll back up', text: `The palettes revert in reverse order.` },
      { title: 'Recolor a section', text: `Edit its data-bg and data-fg attributes.` },
      { title: 'Add a section', text: `Drop in another with its own palette.` },
    ] },
    features: [
      { title: 'Palette data attributes', text: `data-bg and data-fg per section.` },
      { title: 'Center-crossing toggle', text: `Theme switches when a section owns center.` },
      { title: 'Smooth crossfade', text: `Body color tweens between palettes.` },
      { title: 'Flicker-safe', text: `overwrite auto cancels stale tweens.` },
      { title: 'Reversible', text: `Colors revert on scroll-up automatically.` },
      { title: 'Readable text', text: `Foreground tints with each background.` },
      { title: 'One wiring loop', text: `Every section uses the same trigger logic.` },
      { title: 'CSS fallback', text: `Body transition backs up the tween.` },
    ],
    useCases: [
      { title: 'Story mood shifts', text: 'Set a different mood for each chapter of a [scroll pin story](/ui-snippets/scroll-pin-story/), with `data-bg` and `data-fg` attributes defining each palette.' },
      { title: 'Product page themes', text: 'Give sections around [feature cards](/ui-snippets/feature-cards/) their own colours, switching when a section crosses the centre of the screen.' },
      { title: 'Portfolio scene changes', text: 'Recolour the page between [scroll parallax layers](/ui-snippets/scroll-parallax-layers/) scenes in a portfolio, with the body colour tweening smoothly between each palette.' },
      { title: 'Onboarding step tints', text: 'Tint the steps of an [onboarding tour](/ui-snippets/onboarding-tour/), with `overwrite: auto` cancelling stale tweens so fast scrolling never flickers.' },
      { title: 'Brand reels and reveals', text: 'Pair with a [scroll zoom hero](/ui-snippets/scroll-zoom-hero/) for a brand reel, or set a theme behind [reveal on scroll](/ui-snippets/reveal-on-scroll/) blocks.' },
      { icon: 'CODE', title: 'Related: Scroll Chat Story', desc: 'See the [Scroll Chat Story](/ui-snippets/scroll-chat-story/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'When does the page change color?', a: `Each section has a ScrollTrigger with start: top center and end: bottom center, so it is active precisely while it spans the middle of the viewport. Its onToggle fires and themes the page when isActive becomes true, so the new palette takes over exactly when the new section dominates the screen, and reverts as you scroll back up.` },
      { q: 'How do the colors crossfade instead of snapping?', a: `The change is a GSAP tween on the body's backgroundColor and color with a short duration, so the page eases between palettes. overwrite: auto cancels any in-flight color tween when a new one starts, preventing flicker during fast scrolls — the new target takes over from the current color. A CSS transition on the body acts as a fallback.` },
      { q: 'Why use onToggle instead of scrub?', a: `This is a discrete state effect — which section currently owns the theme — not a continuous value, so onToggle with active and inactive states is the right tool. ScrollTrigger handles the enter and leave boundaries and the reverse direction automatically, which is cleaner than manual scroll math or threshold-tuned IntersectionObservers.` },
      { q: 'How is text kept readable on every background?', a: `Each section defines both data-bg and data-fg, and the tween sets the body's color alongside its background. Pairing a foreground with each background — light text on dark plum, warm text on amber — keeps contrast correct as the whole page recolors, rather than leaving the text fixed against a changing backdrop.` },
      { q: 'How do I use this scroll color sections in React, Vue, or Angular?', a: `Render sections with data-bg/data-fg, then in a mount effect register ScrollTrigger and loop the sections to create triggers whose onToggle tweens the document body. Return a cleanup that reverts the GSAP context so triggers are removed on unmount. The CSS ports unchanged; you can also tween a CSS variable instead of the body for scoped theming.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to reason through the toggle logic in isolation. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why onToggle with self.isActive is the right primitive here instead of a continuous scrub, and why start: 'top center' / end: 'bottom center' is what makes the "owns the theme" boundary land precisely at the viewport's middle. The same assistant is useful for optimizing it — asking whether overwrite: 'auto' fully prevents flicker on very fast scroll-throughs of many sections, or whether tweening a CSS custom property instead of document.body directly would scope the recolor more safely in a larger app. It's also useful for extending the effect: ask it to also crossfade an accent color used by buttons and links, tie in a background image crossfade alongside the color, or drive the palette list from a CMS array instead of inline data attributes. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll color sections" effect in plain HTML, CSS, and JavaScript using GSAP and its ScrollTrigger plugin (load both from a CDN, no build step).

Requirements:
- A sequence of full-viewport-height sections, each carrying its own background color and foreground text color as data attributes on the section element (not hardcoded in JS or CSS), so adding a themed section is purely a markup change.
- For every section, create a ScrollTrigger whose start is 'top center' and whose end is 'bottom center', so the trigger is considered active only while that specific section spans the vertical middle of the viewport.
- Use the trigger's onToggle callback (checking self.isActive) — not scrub — to decide when a section takes ownership of the page theme, since this is a discrete state change (which section is "in charge") rather than a continuously interpolated scroll value.
- When a section becomes active, animate document.body's backgroundColor and color to that section's data attributes with a short GSAP tween (a few tenths of a second), and set overwrite: 'auto' on that tween so a fast scroll through multiple sections cancels any in-flight color tween rather than queuing or flickering between them.
- Add a plain CSS transition on the body's background-color and color as a non-JS fallback layer underneath the GSAP tween.
- Confirm scrolling back up reverts the theme correctly through the same triggers with no separate "reverse" code — ScrollTrigger's own active/inactive toggling in both directions must be what drives it.
- Do not use IntersectionObserver or manual scroll-offset calculations for this — the section-owns-the-viewport-center logic must come from ScrollTrigger's start/end/onToggle model.`,
    },
  },
};

export default scrollColorSections;
