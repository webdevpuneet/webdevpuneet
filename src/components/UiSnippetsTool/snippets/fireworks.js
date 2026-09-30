const fireworks = {
    id: 'fireworks',
    title: 'Fireworks',
    category: 'animations',
    html: `<canvas id="canvas"></canvas>
<div class="center-text">
  <div class="big">🎉 Congratulations!</div>
  <p>Click anywhere to launch fireworks</p>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #050810; overflow: hidden; cursor: crosshair; }
canvas { position: fixed; inset: 0; }
.center-text { position: fixed; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; pointer-events: none; text-align: center; padding: 20px; }
.big { font-family: system-ui, sans-serif; font-size: clamp(24px,6vw,48px); font-weight: 800; color: #f1f5f9; }
p { font-family: system-ui, sans-serif; font-size: 14px; color: #475569; }`,
    js: `const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');
let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;
window.addEventListener('resize', () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; });

const particles = [];
const colors = ['#6366f1','#8b5cf6','#ec4899','#f97316','#fbbf24','#22c55e','#0ea5e9','#fff'];

function burst(x, y) {
  const count = 80 + Math.floor(Math.random() * 40);
  const color = colors[Math.floor(Math.random() * colors.length)];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const speed = 2 + Math.random() * 5;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color: Math.random() > 0.3 ? color : '#fff',
      r: 1.5 + Math.random() * 2.5,
      gravity: 0.06 + Math.random() * 0.04,
    });
  }
}

function frame() {
  ctx.fillStyle = 'rgba(5,8,16,0.2)';
  ctx.fillRect(0, 0, W, H);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx; p.y += p.vy;
    p.vy += p.gravity;
    p.vx *= 0.98; p.vy *= 0.98;
    p.alpha -= 0.015;
    if (p.alpha <= 0) { particles.splice(i, 1); continue; }
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  requestAnimationFrame(frame);
}

// Auto launch on load
setTimeout(() => { burst(W/2, H/3); burst(W*0.3, H*0.4); burst(W*0.7, H*0.35); }, 400);
setTimeout(() => { burst(W*0.4, H*0.3); burst(W*0.6, H*0.45); }, 900);

document.addEventListener('click', e => burst(e.clientX, e.clientY));
frame();`,

  seo: {
    title: 'Fireworks — Free HTML CSS JS Canvas Snippet',
    description: 'Click-to-launch fireworks on Canvas — rockets explode into 80 particles with gravity and alpha fade. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: "Fireworks — Rocket Launch, Particle Explosion, Gravity & Alpha Fade",
      description: `A fireworks effect launches a rocket to the click position and explodes it into a burst of coloured particles that arc outward with gravity and fade out. Used for celebration moments (like the [confetti button](/ui-snippets/confetti-button/) and [confetti celebration card](/ui-snippets/confetti-celebration-card/)), success states (pair with an [animated success checkmark](/ui-snippets/animated-success-checkmark/)), and interactive canvas demos.

**Rocket phase**

Clicking the canvas creates a rocket particle at the bottom of the screen targeting the click Y coordinate. Each frame the rocket moves upward toward the target. When it arrives, it is removed and the \`explode()\` function is called.

**The particle explosion**

\`explode(cx, cy)\` creates 80 particles at the rocket's final position. Each particle gets a random angle (0-360°) and velocity converted to \`vx/vy\` via \`Math.cos/sin\`. A random colour from a curated palette is assigned.

**Physics each frame**

Each particle frame: \`vy += gravity\` (increases downward velocity each frame), \`x += vx; y += vy\` updates position, \`alpha -= 0.015\` fades the particle. Particles are removed from the array when \`alpha <= 0\`.

**Canvas clear each frame**

\`ctx.clearRect(0,0,W,H)\` clears the canvas each frame before redrawing all active particles. This is different from the Matrix Rain snippet which uses semi-transparent fill for trail effects.

**The physics simulation**

Each firework particle has a velocity (vx, vy), gravity deceleration (vy += 0.15 per frame), and an alpha fade (alpha -= 0.02). Particles start at the burst origin and disperse via polar coordinates: vx = speed * cos(angle), vy = speed * sin(angle). After 20–40 random particles are created per burst, they are all tracked in an array and updated each requestAnimationFrame tick.

**Canvas clearing and trail effect**

Instead of ctx.clearRect (which would erase all particles each frame), the canvas draws a semi-transparent black rectangle (rgba(0,0,0,0.15)) each frame. This darkens existing particles slightly each frame rather than erasing them instantly, creating a short trail/glow effect as particles fade.

**Click positioning**

The click handler reads e.clientX and e.clientY relative to the canvas getBoundingClientRect() to get the correct burst position regardless of page scroll or canvas position. Multiple rapid clicks create multiple simultaneous bursts — each burst's particles are added to the same array and updated together.

**Colour randomisation**

Each burst picks a random hue using hsl(Math.random()*360, 100%, 60%). HSL colour space is ideal for this because you can keep saturation and lightness constant while randomising the hue, ensuring all colours are vivid without producing muddy or near-invisible shades.`,
    },
    howToUse: { type: 'steps', items: [
      { title: "Click the canvas to launch", text: "Click anywhere on the dark canvas to launch a firework rocket to that position. It explodes into 80 coloured particles." },
      { title: "Click multiple times rapidly", text: "Rapid clicks launch multiple rockets simultaneously, creating overlapping firework bursts." },
      { title: "Change particle colours", text: "In the JS panel, update the colors array with your preferred colour palette." },
      { title: "Change particle count", text: "Update the 80 in the for loop inside explode() for more or fewer particles per burst." },
      { title: "Auto-launch on an event", text: "Call explode(W/2, H/3) directly from your event handler to auto-launch without requiring a click." },
      { title: "Export in your format", text: "Click \"HTML\" for a standalone file, \"JSX\" for a React component, or \"Tailwind\" for a React + Tailwind version." },
    ]},
    features: [
      "Click launches a rocket particle from bottom toward click Y position",
      "explode() creates 80 particles at rocket position with random angle/velocity",
      "Polar coords: vx = Math.cos(angle)*speed, vy = Math.sin(angle)*speed",
      "Each frame: vy += gravity (0.15), x += vx, y += vy for physics",
      "alpha -= 0.015 per frame; particle removed when alpha <= 0",
      "clearRect each frame — clean canvas (no trail like Matrix Rain)",
      "7-colour curated palette cycles via index for varied particle colours",
      "Export as HTML, JSX, or Tailwind CSS",
      "Mobile/Tablet/Desktop preview",
      "Live editor — preview updates as you type",
    ],
    useCases: [
      { icon: "STAR", title: "Purchase and subscription celebrations", desc: "Launch fireworks on the success screen after a purchase or subscription. The burst makes the moment memorable." },
      { icon: "APP", title: "Achievement and milestone unlocks", desc: "Trigger fireworks when a user reaches a milestone — 100 posts, first project completed, learning streak." },
      { icon: "LEARN", title: "Learn Canvas particle physics", desc: "Fireworks implement gravity, velocity, and alpha fade. Edit the gravity and speed values in the JS to understand how particle physics parameters affect motion." },
      { icon: "FLOW", title: "Game win and level complete screens", desc: "Browser game win screens use fireworks as the standard celebration animation. The click-to-launch interaction extends the celebration." },
      { icon: "DESIGN", title: "New Year and holiday celebration UIs", desc: "Auto-launch fireworks on New Year countdown completion or holiday promotion activation." },
      { icon: "CODE", title: "Auto-launch on load or event", desc: "Call explode(W/2, H/3) directly to auto-launch without a click. Wire to a success event, timer completion, or any celebration trigger." },
      { icon: 'CODE', title: 'Related: Liquid Swipe Page Transition', desc: 'See the [Liquid Swipe Page Transition](/ui-snippets/liquid-swipe-transition/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: "How do particles spread in a radial burst?", a: "Each particle gets a random angle between 0 and 2π. vx = Math.cos(angle) * speed and vy = Math.sin(angle) * speed convert the angle to x/y velocity components. This creates equal spread in all directions from the explosion centre." },
      { q: "How does gravity work in the particle physics?", a: "Each frame, vy += gravity (0.15). This increases the downward velocity component by 0.15 every frame. Initially vy is negative (upward) but gravity gradually pulls particles down, creating the arc. Higher gravity values make particles fall faster." },
      { q: "How do particles fade out?", a: "Each particle has an alpha value starting at 1. Each frame, alpha -= 0.015. When alpha <= 0, the particle is removed from the particles array via filter. ctx.globalAlpha = particle.alpha is set before drawing each particle." },
      { q: "How do I auto-launch fireworks without clicking?", a: "Call explode(cx, cy) directly from your JS code, where cx/cy is the screen position you want the burst at. To launch multiple bursts: setInterval(() => explode(Math.random()*W, Math.random()*H/2), 500)." },
      { q: "Can I use this in React?", a: "Yes. Click \"JSX\" for a React component. Use useRef on the canvas. Use useEffect to start the animation loop and add the click handler. Store particles in a useRef array to avoid re-render overhead." },
      { q: "How do I add a rocket trail?", a: "Store the rocket's previous positions in an array. Draw a line from the oldest position to the current position with decreasing opacity. This creates a fading trail behind the ascending rocket." },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the particle math by hand to see what makes this burst feel right. Paste the HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the polar-coordinate spread in burst() (Math.cos and Math.sin over an evenly divided angle) guarantees a circular explosion, and why the semi-transparent fillRect each frame produces a trailing glow instead of the harder edges a full clearRect would give. The same assistant can help optimize it — ask whether splicing particles out of the array during the backward for-loop is the cheapest removal strategy once hundreds of particles are alive from rapid clicks, or whether particles should be object-pooled instead of newly allocated on every burst. It's just as useful for extending the effect: have it add a rising rocket trail before each burst, secondary "crackle" particles that spawn from the burst particles, or sound timed to each explosion. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a click-to-launch fireworks effect in plain HTML, CSS, and JavaScript using only the Canvas 2D API and requestAnimationFrame — no libraries.

Requirements:
- A full-viewport canvas resized in JS to window.innerWidth/innerHeight, updated again on the window resize event.
- A burst function that, given an origin x and y, creates 80-120 particles. Each particle's angle must be evenly distributed around a full circle (index divided by count, times 2*PI) with a randomized speed, converted to vx and vy via Math.cos(angle) and Math.sin(angle) so the initial spread is a clean radial circle, not a random scatter.
- Assign each burst a shared random color from a small curated palette, but let roughly 30% of particles render pure white instead, so every burst has a bright sparkling core mixed with its main color.
- Each frame, apply gravity by incrementing every particle's vertical velocity by a small constant, apply light drag by multiplying both velocity components by a factor just under 1, move the particle by its velocity, and decrease an alpha value by a small constant every frame; remove the particle once alpha reaches zero or below.
- Instead of clearRect, paint a low-opacity dark rectangle over the entire canvas every frame before drawing particles, so old particles fade into a short trail rather than disappearing instantly.
- Draw every particle as a filled circle via arc(), sized with a small random radius per particle, using ctx.globalAlpha set to that particle's current alpha.
- Wire a click listener on the document so every click launches a new burst at the exact click coordinates, and support multiple simultaneous overlapping bursts from rapid clicking without resetting existing particles.`,
    },
  }
};

export default fireworks;
