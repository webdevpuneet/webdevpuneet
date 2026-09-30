const particleNetwork = {
  id: 'particle-network',
  title: 'Particle Network',
  lastmod: '2026-07-18',
  category: 'animations',
  html: `<section class="pn-hero">
  <canvas class="pn-canvas" id="pnCanvas" aria-hidden="true"></canvas>
  <div class="pn-content">
    <h1>Everything connected</h1>
    <p>A drifting constellation that links nearby nodes and reaches toward your cursor.</p>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#05050d;color:#fff}

.pn-hero{position:relative;min-height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;text-align:center;background:radial-gradient(ellipse at 50% 40%,#10102a,#05050d)}
.pn-canvas{position:absolute;inset:0;width:100%;height:100%}
.pn-content{position:relative;z-index:1;padding:0 20px;max-width:600px;pointer-events:none}
.pn-content h1{font-size:clamp(34px,7vw,64px);font-weight:900;letter-spacing:-.03em;text-shadow:0 4px 30px rgba(0,0,0,.5)}
.pn-content p{margin-top:14px;font-size:16px;color:#9a9ac0}`,

  js: `var canvas = document.getElementById('pnCanvas');
var ctx = canvas.getContext('2d');
var W, H, dpr, nodes = [], mouse = { x: -9999, y: -9999 };
var LINK = 130, COLOR = '129,140,248';

function resize() {
  dpr = Math.min(devicePixelRatio || 1, 2);
  W = canvas.clientWidth; H = canvas.clientHeight;
  canvas.width = W * dpr; canvas.height = H * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  var count = Math.round(Math.min(W, 900) / 12);   // density scales with width
  nodes = [];
  for (var i = 0; i < count; i++) {
    nodes.push({ x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4 });
  }
}
window.addEventListener('resize', resize);
resize();

var hero = document.querySelector('.pn-hero');
hero.addEventListener('pointermove', function (e) {
  var r = canvas.getBoundingClientRect();
  mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
});
hero.addEventListener('pointerleave', function () { mouse.x = mouse.y = -9999; });

function draw() {
  ctx.clearRect(0, 0, W, H);
  // move nodes
  for (var i = 0; i < nodes.length; i++) {
    var n = nodes[i];
    n.x += n.vx; n.y += n.vy;
    if (n.x < 0 || n.x > W) n.vx *= -1;
    if (n.y < 0 || n.y > H) n.vy *= -1;
  }
  // links between nearby nodes (and to the cursor)
  for (var a = 0; a < nodes.length; a++) {
    for (var b = a + 1; b < nodes.length; b++) {
      var dx = nodes[a].x - nodes[b].x, dy = nodes[a].y - nodes[b].y;
      var d = Math.sqrt(dx * dx + dy * dy);
      if (d < LINK) {
        ctx.strokeStyle = 'rgba(' + COLOR + ',' + (1 - d / LINK) * 0.5 + ')';
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(nodes[a].x, nodes[a].y); ctx.lineTo(nodes[b].x, nodes[b].y); ctx.stroke();
      }
    }
    var mdx = nodes[a].x - mouse.x, mdy = nodes[a].y - mouse.y, md = Math.sqrt(mdx * mdx + mdy * mdy);
    if (md < LINK * 1.5) {
      ctx.strokeStyle = 'rgba(' + COLOR + ',' + (1 - md / (LINK * 1.5)) * 0.7 + ')';
      ctx.beginPath(); ctx.moveTo(nodes[a].x, nodes[a].y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
    }
  }
  // dots
  ctx.fillStyle = 'rgba(' + COLOR + ',.9)';
  for (var k = 0; k < nodes.length; k++) {
    ctx.beginPath(); ctx.arc(nodes[k].x, nodes[k].y, 2, 0, Math.PI * 2); ctx.fill();
  }
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);`,

  seo: {
    title: 'Particle Network — Free HTML CSS JS Constellation Snippet',
    description: `A drifting canvas constellation that links nearby nodes and reaches toward your cursor. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Particle Network — Connected Constellation Reacting to the Cursor',
      description: `The particle network is the classic interactive backdrop where dozens of dots drift across the screen and draw connecting lines whenever they come near each other, forming an ever-shifting constellation that also reaches toward your cursor. This snippet builds it on an HTML \`<canvas>\` with plain vanilla JavaScript — sharp on retina screens, with no library.

**Drifting nodes**

Each node is a point with a position and a slow random velocity. Every frame the loop advances each node by its velocity and bounces it off the edges by flipping the relevant velocity component when it crosses a boundary. This gives a gentle, perpetual drift with nodes wandering and ricocheting softly off the walls — alive but calm. Node count scales with viewport width (\`min(W, 900) / 12\`), so the field stays appropriately dense on phones and desktops alike, recomputed on resize.

**Connecting nearby nodes**

The defining behavior is the linking. A double loop checks every pair of nodes, and when two are within \`LINK\` pixels (130), it draws a line between them whose opacity is \`1 - distance / LINK\` — so links are brightest when nodes are close and fade to nothing as they drift apart. The result is a web that continuously forms and dissolves as nodes move, the hallmark of the constellation effect. This pairwise check is O(n²), which is why keeping the node count modest matters for smoothness.

**Reaching toward the cursor**

The cursor participates in the network. For each node, the loop also measures the distance to the mouse and, within a larger radius (\`LINK * 1.5\`), draws a brighter line from the node to the cursor. So as you move, the nearby part of the web stretches toward your pointer like it is being attracted — the interactive touch that makes the backdrop feel responsive. When the pointer leaves, the mouse position is parked far off-screen so those links disappear.

**Crisp on every display**

Canvas is resolution-dependent, so \`resize()\` reads \`devicePixelRatio\` (capped at 2 for performance), sizes the backing buffer accordingly, and applies a \`setTransform\` so all drawing is done in CSS pixels but rendered at device resolution. Without this the dots and lines would look soft on HiDPI screens. The handler also re-seeds the node field for the new dimensions.

**Layering**

The canvas fills the hero behind the content, which sits above with \`pointer-events: none\` so moving over the headline still feeds the cursor interaction below. A radial background gradient gives the constellation a subtle glow at the center and darkens the edges.

**Customizing it**

Change \`LINK\` for a denser or sparser web, adjust the node count divisor and velocity range for more or fewer, faster or slower nodes, recolor via the \`COLOR\` RGB string, or widen the cursor reach. For large fields, swap the O(n²) check for a spatial grid. Pair it with an [aurora text](/ui-snippets/aurora-text/) headline or a [dot pattern](/ui-snippets/dot-pattern/) section for a connected, modern hero.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A drifting field of dots fills the hero behind the text.` },
      { title: 'Watch the links', text: `Lines form between nearby nodes and fade as they part.` },
      { title: 'Move your cursor', text: `Nearby nodes reach out and link to the pointer.` },
      { title: 'Resize the window', text: `The node count and canvas re-fit and stay crisp.` },
      { title: 'Recolor the web', text: `Change the COLOR RGB string.` },
      { title: 'Tune the density', text: `Adjust LINK, node count, and velocity.` },
    ] },
    features: [
      { title: 'Drifting nodes', text: `Slow velocities with edge bounce.` },
      { title: 'Distance-faded links', text: `Lines brighten as nodes get closer.` },
      { title: 'Cursor attraction', text: `Nodes link to the pointer within reach.` },
      { title: 'Width-scaled density', text: `Node count fits the viewport.` },
      { title: 'HiDPI-sharp canvas', text: `devicePixelRatio scaling.` },
      { title: 'Re-seed on resize', text: `Field rebuilds for new dimensions.` },
      { title: 'Click-through content', text: `Headline passes the cursor to the canvas.` },
      { title: 'No dependencies', text: `Pure canvas and vanilla JS.` },
    ],
    useCases: [
      { title: 'Tech landing heroes', text: `Backdrop for an [aurora text](/ui-snippets/aurora-text/) headline.` },
      { title: 'Network and data sites', text: `Visualize connectivity behind a [feature tabs showcase](/ui-snippets/feature-tabs-showcase/).` },
      { title: 'AI and platform pages', text: `Pair with a [dot pattern](/ui-snippets/dot-pattern/) section.` },
      { title: 'Conference microsites', text: `An interactive backdrop near a [shiny text](/ui-snippets/shiny-text/) badge.` },
      { title: 'Portfolio intros', text: `A connected alternative to a [minimal hero](/ui-snippets/minimal-hero/).` },
      { title: 'Canvas demos', text: `A reference for constellation networks.` },
    ],
    faqs: [
      { q: 'How are the connecting lines drawn?', a: `A double loop checks every pair of nodes each frame, and when two are within the link radius it draws a line whose opacity is 1 minus distance over the radius. So links are brightest when nodes are close and fade out as they drift apart, producing a web that continually forms and dissolves as the nodes move.` },
      { q: 'How does the network react to my cursor?', a: `For each node the loop also measures the distance to the mouse and, within a larger radius, draws a brighter line from the node to the cursor. As you move, the nearby part of the web stretches toward the pointer. When the pointer leaves, the mouse position is moved far off-screen so those links vanish.` },
      { q: 'Does it stay sharp on retina screens?', a: `Yes. The resize function reads devicePixelRatio (capped at 2), sizes the canvas backing buffer to the CSS size times that ratio, and applies a setTransform so drawing happens in CSS pixels but renders at device resolution. Without this, the dots and thin lines would look blurry on HiDPI displays.` },
      { q: 'Is the pairwise linking a performance concern?', a: `It is O(n squared), since every pair of nodes is checked each frame, so the node count is kept modest and scales with viewport width. That is smooth for typical hero fields. For much larger networks you would replace the brute-force check with a spatial grid or quadtree to only compare nearby nodes.` },
      { q: 'How do I use this particle network in React, Vue, or Angular?', a: `Put the canvas behind your content with a ref and run resize plus the rAF draw loop in a mount effect, cancelling the frame and removing listeners on unmount. Keep nodes and the mouse position in refs, not state, so the loop does not trigger re-renders. The component is framework-agnostic; in Tailwind just position the canvas absolute inset-0 behind a relative content layer.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the pairwise distance checks by hand to understand what's expensive here. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the link-drawing loop over every pair of nodes is O(n squared), and how the LINK radius and the 1 minus distance over LINK opacity formula combine to fade lines in and out. The same assistant is well suited to optimizing it, for example replacing the brute-force pairwise check with a spatial grid or quadtree so the node count can scale into the thousands without dropping frames, or checking whether the devicePixelRatio cap of 2 is the right tradeoff for a given device mix. It's also a fast way to extend the effect: ask it to make nodes actively repel or attract each other instead of just bouncing off walls, color links by a data value instead of a flat RGB string, or add a subtle pulse to nodes when a new connection forms. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a drifting "particle network" constellation background in plain HTML, CSS, and vanilla JavaScript using only the Canvas 2D API and requestAnimationFrame — no libraries, no WebGL.

Requirements:
- A full-bleed canvas positioned behind page content, sized from devicePixelRatio (capped at 2) via a resize function that also rebuilds the node array so the canvas stays sharp on retina displays and re-seeds when the viewport size changes.
- Generate a set of nodes whose count scales with viewport width (for example, roughly one node per 12px of width up to a cap), each with a random starting position and a small random velocity.
- Every animation frame, move each node by its velocity and reverse the relevant velocity component whenever the node's x or y crosses the canvas bounds, so nodes drift and bounce indefinitely.
- Each frame, check every pair of nodes and draw a line between any two within a fixed link radius, with the line's opacity computed as 1 minus their distance divided by that radius, so nearby pairs glow brighter and the connection fades out smoothly as nodes separate.
- Track the pointer position over the canvas's container and, for each node within a slightly larger radius of the pointer, draw a brighter line from the node to the pointer, so the nearest part of the network visibly reaches toward the cursor. When the pointer leaves, move its tracked position off-screen so those links disappear.
- Draw all nodes as small filled circles on top of the links each frame, and make sure the content layered on top of the canvas has pointer-events: none where needed so cursor interaction still reaches the canvas underneath.`,
    },
  },
};

export default particleNetwork;
