const gsapTextScrambleScroll = {
  id: 'gsap-text-scramble-scroll',
  title: 'GSAP Scroll Text Scramble',
  lastmod: '2026-08-21',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="ts-intro"><p>Scroll down to decode the headline.</p></section>
<section class="ts-stage">
  <h1 class="ts-headline" id="tsHeadline" data-final="SIGNAL FOUND">SIGNAL FOUND</h1>
  <h2 class="ts-sub" id="tsSub" data-final="Clarity from noise">Clarity from noise</h2>
</section>
<section class="ts-outro"><p>Fully resolved once in view.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#08090d;color:#fff}
.ts-intro,.ts-outro{min-height:65vh;display:flex;align-items:center;justify-content:center;padding:24px}
.ts-intro p,.ts-outro p{color:#7a8199;font-size:15px}
.ts-stage{min-height:80vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;padding:24px}
.ts-headline{font-family:'Courier New',monospace;font-size:clamp(30px,7vw,72px);letter-spacing:.02em;color:#4ade80;text-shadow:0 0 20px rgba(74,222,128,.35)}
.ts-sub{font-family:'Courier New',monospace;font-size:clamp(14px,2.4vw,20px);color:#5eead4;opacity:.85}`,

  js: `gsap.registerPlugin(ScrollTrigger);

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*';

// Scrambles an element's text from random characters into its final string,
// resolving one character at a time left to right as progress advances 0→1.
function scramble(el) {
  const final = el.dataset.final;
  const len = final.length;
  const obj = { progress: 0 };

  gsap.to(obj, {
    progress: 1,
    duration: 1.4,
    ease: 'none',
    onUpdate: () => {
      const revealCount = Math.floor(obj.progress * len);
      let out = '';
      for (let i = 0; i < len; i++) {
        if (final[i] === ' ') { out += ' '; continue; }
        out += i < revealCount ? final[i] : CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      el.textContent = out;
    },
    onComplete: () => { el.textContent = final; },
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    }
  });
}

scramble(document.getElementById('tsHeadline'));
scramble(document.getElementById('tsSub'));`,

  seo: {
    title: 'GSAP Scroll Text Scramble — Free Decode-In Headline Snippet',
    description: `A headline that scrambles through random characters and resolves into readable text as it scrolls into view, driven by GSAP ScrollTrigger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'GSAP Scroll Text Scramble — Headlines That Decode as You Scroll',
      description: `The scroll text scramble snippet gives a headline a hacker-terminal decode effect — random characters flicker across the text and resolve into the real words left to right, timed to when the headline scrolls into view. It's built with a small hand-rolled scramble function driven by a GSAP tween, plus ScrollTrigger from a CDN — no paid text plugin required.

**A tweened proxy drives the scramble**

Instead of animating the DOM text directly (which GSAP can't tween as a number), the function tweens a plain object's \`progress\` value from 0 to 1 with \`gsap.to(obj, { progress: 1, onUpdate: ... })\`. Every \`onUpdate\` tick, that progress value determines how many characters from the left are "resolved" versus how many are still random — \`Math.floor(obj.progress * len)\` gives the cutoff index.

**Left-to-right resolution, not a flat swap**

For each character position, resolved indices (\`i < revealCount\`) show the real final character; everything after it is replaced with a random pick from a character pool on every single frame, so unresolved letters keep visibly flickering rather than sitting static. That per-frame re-randomization of only the *unresolved* tail is what produces the classic "decoding" look rather than a simple crossfade.

**Reusable across elements**

\`scramble(el)\` reads the target text from a \`data-final\` attribute rather than hardcoding it, so the same function decodes both the headline and the subheading with their own independent ScrollTrigger instances and timings — you can call it on any element that has a \`data-final\` value.

**Gated by scroll, replays on reverse**

Each scramble has its own \`scrollTrigger: { start: 'top 80%', toggleActions: 'play none none reverse' }\`, so the decode begins only once the element is nearly in view, and scrolling back out reverses the tween — since the scramble re-randomizes on every update, reversing doesn't look like rewinding footage, it just looks like the text scrambling again, which reads correctly either direction.

**Customizing it**

Swap the character pool, change \`duration\` for a faster or slower decode, or resolve characters from the center outward instead of left to right by changing which index check gates \`revealCount\`. Pair it with [text scramble](/ui-snippets/text-scramble/) or [scramble text links](/ui-snippets/scramble-text-links/) for hover-triggered variants, or a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) for the surrounding layout.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A headline and subheading with data-final text render.` },
      { title: 'Scroll toward the stage', text: `Text starts as random characters near the trigger point.` },
      { title: 'Keep scrolling', text: `Characters resolve left to right into the real words.` },
      { title: 'Scroll back up', text: `The scramble reverses instead of staying resolved.` },
      { title: 'Change data-final', text: `Any element with that attribute can be scrambled.` },
    ] },
    features: [
      { title: 'Tweened proxy value', text: `A plain object's progress drives character reveal.` },
      { title: 'Left-to-right decode', text: `Resolved characters lock in order, not all at once.` },
      { title: 'Live re-randomization', text: `Unresolved characters flicker every frame.` },
      { title: 'Data-driven target text', text: `data-final lets one function scramble any element.` },
      { title: 'Independent ScrollTriggers', text: `Headline and subhead decode on their own timing.` },
      { title: 'Reversible', text: `Scrolling back out re-scrambles the text.` },
      { title: 'No paid plugin', text: `Built from a plain onUpdate callback, not a bonus plugin.` },
      { title: 'Space-aware', text: `Spaces are preserved instead of scrambled as characters.` },
    ],
    useCases: [
      { title: 'Hero headline decode', text: 'Resolve a headline from flickering random characters into readable words as it scrolls into view, as a scroll-gated sibling of [text scramble](/ui-snippets/text-scramble/).' },
      { title: 'Section divider labels', text: 'Decode a section label before a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) appears, with `data-final` letting one function scramble any element.' },
      { title: 'Technology product launches', text: 'Reinforce a decoding or reveal narrative, with resolved characters locking in left to right while unresolved ones keep flickering.' },
      { title: 'Statistic callouts', text: 'Pair with a [GSAP scroll number counter](/ui-snippets/gsap-scroll-number-counter/) so headings scramble into place and the figures beneath count up.' },
      { title: 'Link hover reuse', text: 'Reuse the same scramble logic as [scramble text links](/ui-snippets/scramble-text-links/), or reveal chapter titles in an editorial story as the reader arrives.' },
      { icon: 'CODE', title: 'Related: Independence Day Flag Hoist', desc: 'See the [Independence Day Flag Hoist](/ui-snippets/independence-day-flag-hoist/) for a related scroll pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Scroll-Snap Carousel (view-timeline Scale)', desc: 'See the [Scroll-Snap Carousel (view-timeline Scale)](/ui-snippets/scroll-snap-view-timeline-carousel/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: `How can GSAP tween text if text isn't a number?`, a: `It doesn't tween the text directly — it tweens a plain object's progress property from 0 to 1, which is a normal numeric tween GSAP handles natively. The onUpdate callback reads that progress value on every tick and rebuilds the element's textContent from it, so the visible "animation" is really a side effect of a simple number tween.` },
      { q: 'Why does the scramble look different from a fade or typewriter effect?', a: `Because on every single frame, every character to the right of the current reveal cutoff is replaced with a fresh random pick from the character pool, not just displayed once. That continuous re-randomization of the unresolved tail is what creates the flicker, and only the resolved left portion stays stable — a typewriter effect just adds characters, it doesn't scramble them first.` },
      { q: 'Does this need any GSAP bonus/club plugin?', a: `No. It only uses GSAP core and the free ScrollTrigger plugin. The scramble behavior itself is plain JavaScript inside an onUpdate callback, not a specialized text plugin, so there's no licensing consideration beyond standard GSAP core and ScrollTrigger, which are free.` },
      { q: 'Can I scramble multiple different elements with different text?', a: `Yes — that's why the target text comes from a data-final attribute rather than being hardcoded in the function. Call scramble(el) on any element that has data-final set, and each call creates its own independent tween and ScrollTrigger, so elements can decode at different scroll positions with different timings.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Keep the scramble function outside your component (or in a utility module), and call it on the DOM node via a ref inside a mount effect once the element exists. Register ScrollTrigger once at the app level, and kill the created tween/ScrollTrigger in the cleanup function to avoid duplicates on re-render.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why tweening a plain numeric progress object rather than the text itself is the technique that makes a scramble animation possible with GSAP, and how the revealCount cutoff produces the left-to-right decode instead of a flat all-at-once resolve. It can also help extend the effect — ask for a center-out or random-order reveal pattern, a version that scrambles on hover in addition to on scroll, or a variant using a themed character set (binary, glitch symbols, a different alphabet) for a different visual tone. Use the conversation to make sure you understand the onUpdate-driven approach before reusing it elsewhere.`,
      prompt: `Build a "scroll text scramble" headline effect in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin (load both from a CDN) — do not use any paid/club GSAP text plugin.

Requirements:
- A headline element (and at least one secondary text element) whose final text is stored in a data attribute, so the scramble function is generic and reusable across elements rather than hardcoding the target string.
- Implement the scramble by tweening a plain JavaScript object's numeric progress property from 0 to 1 with GSAP (not by tweening the DOM text directly), and use that tween's onUpdate callback to rebuild the element's rendered text on every frame.
- On each onUpdate tick, compute how many characters (counting from the left) are considered "resolved" based on the current progress value; resolved characters must show their real final character, while every character after the resolve cutoff must be replaced with a freshly random character from a defined character pool on every single frame, so unresolved characters visibly flicker rather than sitting static.
- Preserve literal spaces in the final string as spaces rather than scrambling them.
- Gate the scramble with a ScrollTrigger on the element so it only starts once the element scrolls to roughly 80% down the viewport, and set toggleActions so scrolling back out of view reverses the tween (letting it re-scramble) rather than leaving the text permanently resolved.
- On tween completion, force the element's text to exactly the final string to avoid any last-frame randomness lingering.`,
    },
  },
};

export default gsapTextScrambleScroll;
