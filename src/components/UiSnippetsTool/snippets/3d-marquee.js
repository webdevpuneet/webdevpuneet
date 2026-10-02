const threeDMarquee = {
  id: '3d-marquee',
  title: '3D Marquee',
  lastmod: '2026-07-18',
  category: 'animations',
  html: `<section class="tm-hero">
  <div class="tm-scene" id="tmScene" aria-hidden="true">
    <div class="tm-col" data-dir="1"></div>
    <div class="tm-col" data-dir="-1"></div>
    <div class="tm-col" data-dir="1"></div>
    <div class="tm-col" data-dir="-1"></div>
  </div>
  <div class="tm-overlay"></div>
  <div class="tm-content"><h1>The wall of work</h1><p>A 3D gallery that drifts in perspective behind your message.</p></div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#06060e;color:#fff}

.tm-hero{position:relative;height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;text-align:center}

.tm-scene{position:absolute;top:50%;left:50%;width:1100px;height:1100px;display:grid;grid-template-columns:repeat(4,1fr);gap:18px;transform:translate(-50%,-50%) rotateX(52deg) rotateZ(-42deg);transform-origin:center}
.tm-col{display:flex;flex-direction:column;gap:18px;will-change:transform}
.tm-col[data-dir="1"]{animation:tmUp 26s linear infinite}
.tm-col[data-dir="-1"]{animation:tmDown 26s linear infinite}
@keyframes tmUp{to{transform:translateY(-50%)}}
@keyframes tmDown{from{transform:translateY(-50%)}to{transform:translateY(0)}}

.tm-tile{aspect-ratio:4/3;border-radius:12px;background:var(--g);box-shadow:0 14px 30px -12px rgba(0,0,0,.6);flex-shrink:0}

.tm-overlay{position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(6,6,14,.25),rgba(6,6,14,.85) 75%)}
.tm-content{position:relative;z-index:1;padding:0 20px;max-width:600px}
.tm-content h1{font-size:clamp(32px,7vw,64px);font-weight:900;letter-spacing:-.03em;text-shadow:0 6px 40px rgba(0,0,0,.6)}
.tm-content p{margin-top:14px;font-size:16px;color:#c7c7dd}`,

  js: `var GRADS = [
  'linear-gradient(135deg,#6366f1,#8b5cf6)','linear-gradient(135deg,#ec4899,#f43f5e)',
  'linear-gradient(135deg,#22d3ee,#3b82f6)','linear-gradient(135deg,#34d399,#10b981)',
  'linear-gradient(135deg,#f59e0b,#ef4444)','linear-gradient(135deg,#a78bfa,#6366f1)',
  'linear-gradient(135deg,#f472b6,#db2777)','linear-gradient(135deg,#2dd4bf,#0ea5e9)'
];
function tile() {
  var d = document.createElement('div');
  d.className = 'tm-tile';
  d.style.setProperty('--g', GRADS[Math.floor(Math.random() * GRADS.length)]);
  return d;
}

// Fill each column with tiles twice over so the 50% translate loops seamlessly.
Array.prototype.slice.call(document.querySelectorAll('.tm-col')).forEach(function (col) {
  var set = document.createDocumentFragment();
  for (var i = 0; i < 6; i++) set.appendChild(tile());
  var clone = set.cloneNode(true);
  col.appendChild(set);
  col.appendChild(clone);
});`,

  seo: {
    title: '3D Marquee — Free HTML CSS JS Perspective Gallery Snippet',
    description: `A perspective wall of image tiles in a tilted grid, columns scrolling opposite directions in an endless loop behind your headline. Exports to React, Vue & Tailwind.`,
    about: {
      title: '3D Marquee — Tilted Perspective Wall of Scrolling Tiles',
      description: `The 3D marquee is the dramatic hero backdrop where a grid of image tiles is tilted back in perspective like a wall receding into the distance, with its columns endlessly scrolling in alternating directions — a living gallery behind your headline. This snippet builds it with plain HTML, CSS 3D transforms, and a little vanilla JavaScript to populate and loop the tiles.

**Tilting the grid into perspective**

The scene is a four-column CSS grid that's transformed with \`rotateX(52deg) rotateZ(-42deg)\`. That combination lays the wall back and rotates it diagonally, so the flat grid reads as a large surface angling away into space — the signature isometric-ish look. It's sized larger than the viewport (1100×1100) and centered with \`translate(-50%, -50%)\` so the tilted plane covers the whole hero with no visible edges. No \`perspective\` property is needed here because the rotation alone, at this scale, produces the receding-wall illusion.

**Columns that scroll in opposite directions**

Each column animates vertically, but adjacent columns move opposite ways: columns marked \`data-dir="1"\` run the \`tmUp\` keyframe (translating to \`-50%\`), while \`data-dir="-1"\` columns run \`tmDown\` (from \`-50%\` back to \`0\`). The counter-motion is what gives the wall its dynamic, woven feel — a single direction would look like one flat conveyor. Both keyframes are pure CSS, so the browser's compositor drives the scroll efficiently.

**Seamless looping by duplication**

To loop endlessly, each column is filled with a set of tiles and then an exact clone of that set, so the column is two identical halves. Animating by \`50%\` (one half's height) means that when a column reaches the end of the first set, the cloned second set sits precisely where the first began — so the keyframe restart is invisible. The tiles are built in JavaScript and cloned with \`cloneNode(true)\`, which is both concise and guarantees the two halves match exactly.

**Image-free, themeable tiles**

Each tile is a \`4:3\` rounded rectangle filled with a random gradient from a palette, with a soft drop shadow so the wall has depth. Using gradients keeps the snippet dependency-free and the wall colorful; swap the \`--g\` background for real image URLs to turn it into a portfolio or product wall without changing the layout or loop logic.

**Keeping the headline readable**

A radial \`.tm-overlay\` darkens the scene from a translucent center to near-opaque edges, so the bright tiles don't fight the text. The content sits above at a higher z-index with a soft text-shadow, so the headline stays crisp and centered over the busy, moving backdrop.

**Customizing it**

Change the \`rotateX\`/\`rotateZ\` angles to steepen or flatten the wall, adjust the animation duration for a faster or calmer drift, add or remove columns (each picks up its own direction from \`data-dir\`), or swap gradients for images. Tune the overlay stops to reveal more or less of the gallery. Pair it with a [hero parallax grid](/ui-snippets/hero-parallax-grid/) elsewhere or a [text generate](/ui-snippets/text-generate/) headline for a bold landing page.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A tilted wall of colorful tiles fills the hero behind a headline.` },
      { title: 'Watch the motion', text: `Columns scroll up and down in alternating directions, endlessly.` },
      { title: 'Note the perspective', text: `The grid angles away like a receding surface.` },
      { title: 'Read the headline', text: `A radial overlay keeps the centered text legible.` },
      { title: 'Swap in images', text: `Set each tile's --g to a real image URL.` },
      { title: 'Adjust the tilt', text: `Change the rotateX and rotateZ angles.` },
    ] },
    features: [
      { title: 'Perspective tilt', text: `rotateX + rotateZ lay the grid into space.` },
      { title: 'Alternating columns', text: `data-dir scrolls neighbors opposite ways.` },
      { title: 'Seamless loop', text: `Cloned tile sets and a 50% translate.` },
      { title: 'cloneNode duplication', text: `Guarantees the two halves match exactly.` },
      { title: 'Themeable tiles', text: `Random gradients, swappable for images.` },
      { title: 'Compositor-driven', text: `Pure CSS keyframes, smooth on mobile.` },
      { title: 'Readable overlay', text: `A radial scrim protects the headline.` },
      { title: 'Auto-filled columns', text: `JavaScript populates every column.` },
    ],
    useCases: [
      { title: 'Portfolio image walls', text: 'Show work behind a [portfolio hero](/ui-snippets/portfolio-hero/), with a tilted wall of tiles receding into perspective as columns scroll in opposite directions.' },
      { title: 'Agency gallery homepages', text: 'Pair with a [hero parallax grid](/ui-snippets/hero-parallax-grid/) section on an agency homepage for a gallery-forward, image-led look.' },
      { title: 'Product gallery backdrops', text: 'Place a moving image wall behind a [text generate](/ui-snippets/text-generate/) headline, using `cloneNode` to keep both halves of the loop identical.' },
      { title: 'Exhibition and festival sites', text: 'Set a vivid stage near a [lamp header](/ui-snippets/lamp-header/), with `data-dir` attributes making neighbouring columns travel opposite ways.' },
      { title: 'Photography sites', text: 'Tile real shots into a receding wall, where `rotateX` and `rotateZ` lay the grid into space and a 50% translate makes the loop seamless.' },
      { icon: 'CODE', title: 'Related: AI Code Typing Preview', desc: 'See the [AI Code Typing Preview](/ui-snippets/ai-code-typing-preview/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: 3D Swipe Card Stack', desc: 'See the [3D Swipe Card Stack](/ui-snippets/3d-swipe-card-stack/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the wall tilted into perspective?', a: `The four-column grid is transformed with rotateX(52deg) and rotateZ(-42deg), which lays it back and rotates it diagonally so the flat grid reads as a surface receding into space. It's sized larger than the viewport and centered so the tilted plane covers the whole hero with no visible edges.` },
      { q: 'How do the columns loop without a seam?', a: `Each column is filled with a set of tiles and an exact clone of that set, making it two identical halves. The columns animate by 50% — one half's height — so when the first set scrolls away, the cloned set sits exactly where it began. The keyframe restart lands on an identical frame, so the loop is seamless.` },
      { q: 'Why do adjacent columns move in opposite directions?', a: `Columns marked data-dir 1 run an upward keyframe and those marked -1 run a downward one. The counter-motion gives the wall a woven, dynamic feel; if every column scrolled the same way it would look like a single flat conveyor belt. Both keyframes are pure CSS so the compositor handles them efficiently.` },
      { q: 'Can I use real images instead of gradients?', a: `Yes. Each tile is a 4:3 rounded box whose background comes from a --g custom property, set to a random gradient by default. Replace --g with a url() image (or swap the div for an img), and the perspective tilt, alternating scroll, and seamless loop all keep working unchanged.` },
      { q: 'How do I use this 3D marquee in React, Vue, or Angular?', a: `Render the columns and generate the doubled tile lists from a data array in render. The tilt, alternating keyframes, and overlay are pure CSS. If you swap to images, map your URLs into the tiles. In Tailwind, build the grid with grid utilities, apply the rotateX/rotateZ via arbitrary transform values, and define the scroll keyframes in the config.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work through the loop math by hand — paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why each column is filled with its tile set twice via cloneNode and animated by only 50 percent instead of 100, and why that specific combination is what makes the scroll appear seamless. The same assistant is useful for optimizing it — asking whether generating 48 tiles up front is wasteful on a mobile viewport, or whether swapping the gradient tiles for lazy-loaded real images would need an IntersectionObserver to avoid loading offscreen columns. It's just as good for extending the wall: ask it to make tiles clickable and open a lightbox, vary the rotateX/rotateZ tilt responsively so it flattens on narrow screens, or drive the gradient palette from a prop so the wall matches different brand themes. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "3D marquee" hero background in plain HTML, CSS, and vanilla JavaScript — pure CSS keyframe animations for the motion, JS only to populate the tiles, no animation libraries.

Requirements:
- A grid container of four columns tilted into perspective using a combined transform of rotateX (around 52 degrees) and rotateZ (around -42 degrees), sized noticeably larger than the viewport and centered with translate(-50%, -50%) so no edge of the tilted plane is visible within the hero.
- Each column must scroll vertically forever using a CSS @keyframes animation set to linear timing and infinite iteration, and alternating columns (via a data attribute like data-dir) must scroll in opposite directions — one animating toward a negative translateY, the neighboring one animating from a negative translateY back to zero.
- To make each column's scroll loop seamlessly with no visible jump: generate one set of tile elements in JavaScript, clone that exact set with cloneNode(true), and append both the original and the clone to the column (so the column contains two identical halves back to back). The keyframe animation must move by exactly 50% (one half's height), not 100%, so when the loop restarts it lands on a frame identical to the start.
- Fill each tile with a random gradient background (from a small fixed palette) via a CSS custom property, keeping tiles dependency-free and swappable for real background-image URLs later.
- Add a radial-gradient overlay that darkens from a translucent center toward opaque edges, and center a headline and subtext above it at a higher z-index with a text-shadow, so the moving tile wall stays legible as a backdrop rather than fighting the text.`,
    },
  },
};

export default threeDMarquee;
