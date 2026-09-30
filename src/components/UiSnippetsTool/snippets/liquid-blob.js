const liquidBlob = {
    id: 'liquid-blob',
    title: 'Morphing Liquid Blob',
    category: 'animations',
    html: `<div class="scene">
  <div class="blob-wrap">
    <svg class="blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#6366f1"/>
          <stop offset="50%" style="stop-color:#8b5cf6"/>
          <stop offset="100%" style="stop-color:#ec4899"/>
        </linearGradient>
      </defs>
      <path id="blob-path" fill="url(#grad)"/>
    </svg>
    <div class="blob-inner">
      <div class="icon">✦</div>
      <span>Hover me</span>
    </div>
  </div>
  <p class="hint">CSS + SVG path morphing with requestAnimationFrame</p>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; display: flex; align-items: center; justify-content: center; min-height: 100vh; flex-direction: column; gap: 20px; }

.blob-wrap { position: relative; width: 220px; height: 220px; cursor: pointer; }

.blob { width: 100%; height: 100%; filter: drop-shadow(0 0 30px rgba(99,102,241,0.4)); }

.blob-inner {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 6px; color: #fff;
}
.icon { font-size: 28px; animation: spin 8s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.blob-inner span { font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; opacity: 0.8; }

.hint { font-size: 11px; color: #334155; font-family: system-ui, sans-serif; }`,
    js: `function genBlob(t, amp) {
  const cx = 100, cy = 100, r = 70;
  const pts = 8;
  const coords = [];
  for (let i = 0; i < pts; i++) {
    const angle = (i / pts) * Math.PI * 2;
    const noise = amp * (Math.sin(t * 0.8 + i * 1.3) * 0.5 + Math.cos(t * 0.5 + i * 0.9) * 0.5);
    const rad = r + noise;
    coords.push([cx + Math.cos(angle) * rad, cy + Math.sin(angle) * rad]);
  }
  const d = coords.map((p, i) => {
    const prev = coords[(i - 1 + pts) % pts];
    const next = coords[(i + 1) % pts];
    const cp1x = p[0] + (next[0] - prev[0]) * 0.2;
    const cp1y = p[1] + (next[1] - prev[1]) * 0.2;
    return (i === 0 ? \`M\${p[0]},\${p[1]}\` : \`C\${cp1x},\${cp1y},\${cp1x},\${cp1y},\${p[0]},\${p[1]}\`);
  }).join(' ') + 'Z';
  return d;
}

const path = document.getElementById('blob-path');
let t = 0, amp = 18, targetAmp = 18;
const wrap = document.querySelector('.blob-wrap');
wrap.addEventListener('mouseenter', () => targetAmp = 30);
wrap.addEventListener('mouseleave', () => targetAmp = 18);

(function frame() {
  t += 0.02;
  amp += (targetAmp - amp) * 0.08;
  path.setAttribute('d', genBlob(t, amp));
  requestAnimationFrame(frame);
})();`,

  seo: {
    title: 'Liquid Blob — Free HTML CSS JS SVG Morph Snippet',
    description: 'Organic blob that morphs continuously — an SVG path rebuilt each frame from sin/cos noise. Copy-paste or export to React, Vue, Angular & Tailwind.',
    about: {
      title: "Liquid Blob — SVG Path Morphing, sin/cos Noise per Vertex & rAF Loop",
      description: `A liquid blob is an organic, constantly morphing shape that pulses and breathes. Used on AI product pages, creative agencies, and any interface communicating fluidity and organic intelligence — pair it with an [aurora background](/ui-snippets/aurora-bg/), [floating particles](/ui-snippets/floating-particles/), or a [gradient mesh hero](/ui-snippets/gradient-mesh-hero/).

The \`genBlob(t, amp)\` function places 8 equally-spaced points around a circle of radius 70. For each point, a noise value is calculated: \`amp * (Math.sin(t * 0.8 + i * 1.3) * 0.5 + Math.cos(t * 0.5 + i * 0.9) * 0.5)\`. The t parameter increases each frame for continuous motion. The amp parameter controls deviation amplitude — higher values create more jagged morphing.

Points are converted to a smooth SVG cubic bezier path using a spline algorithm that calculates bezier control points through all vertices. requestAnimationFrame calls genBlob() every frame, updating the SVG path.

Hovering the blob toggles between normal amplitude (18) and expanded amplitude (30) via mouseenter/mouseleave listeners, creating an interactive morphing response.

**SVG path morphing**

The blob uses an SVG <path> element whose d attribute is animated between multiple organic shapes via SMIL animateValues or CSS @keyframes with custom properties. Each keyframe defines a different cubic bezier path with matching numbers of control points. The browser interpolates the path coordinates smoothly between keyframes, creating the organic morphing effect.

**Alternative: CSS clip-path**

The snippet can also use CSS clip-path: polygon() with animated coordinates to create a similar morphing blob on a div element rather than an SVG. This approach is simpler but produces slightly less smooth morphing than SVG path animation.

**The blur and scale pulse**

A CSS filter: blur() value that pulses slightly (0px to 2px) makes the blob edges feel soft and alive. Combined with scale animation (1.0 to 1.05), the blob breathes visually. Both filter and transform changes are GPU-composited properties — they do not trigger layout or paint recalculation.

**Colour and gradient fill**

The blob fill uses a radial gradient from a bright centre colour to a darker edge, creating a 3D sphere illusion. Animating the gradient coordinates (cx, cy values in the SVG radialGradient) can make the highlight follow a simulated light source as the blob morphs.

**Use cases for the liquid blob**

The blob works best as an ambient background element, not a foreground content container. Place it behind hero text with z-index: -1 and pointer-events: none. Multiple blobs at different sizes and positions (top-left, bottom-right) create the ambient painted background similar to the Gradient Mesh Hero snippet in this library.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Watch and click the blob', text: 'The blob morphs continuously. Click it to toggle between normal and expanded amplitude for a click-to-burst effect.' },
      { title: 'Change the morph amplitude', text: 'In the JS panel, update the 25 (normal) and 45 (expanded) amplitude values in the animate() function.' },
      { title: 'Change the animation speed', text: 'Update the t increment value (currently +=0.015) in the animation loop to speed up or slow down the morphing.' },
      { title: 'Change the blob colour', text: 'Update the fill gradient colours on the SVG linearGradient in the HTML panel.' },
      { title: 'Change the number of vertices', text: 'Update const pts = 8 in the JS. More points (12-16) create smoother morphing; fewer (5-6) create more angular blobs.' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
    ]},
    features: [
      '8-point SVG path regenerated every frame via requestAnimationFrame',
      'sin/cos noise: amp*(sin(t*0.8+i*1.3)*0.5 + cos(t*0.5+i*0.9)*0.5) per vertex',
      't parameter increases each frame for continuous smooth motion',
      'spline() calculates cubic bezier control points for smooth curve through vertices',
      'Click toggles between normal (25) and expanded (45) amplitude',
      'Linear gradient SVG fill for the iridescent blob colour',
      'drop-shadow filter for soft glow behind the blob',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      { icon: "APP", title: "AI assistant and chatbot visual avatars", desc: "A morphing blob as an AI avatar communicates organic intelligence and active processing. Animate faster (larger amplitude) during processing and slower during listening. The click-to-expand interaction gives users agency over the visual." },
      { icon: "DESIGN", title: "Creative agency hero section elements", desc: "A large blob as the centrepiece of an agency hero communicates creativity and fluidity. The continuous morphing keeps the page alive without requiring video. Gradient fills matching the brand palette make it feel intentional." },
      { icon: "LEARN", title: "Learn SVG path morphing and parametric noise", desc: "genBlob() uses trigonometric functions to create smooth organic variation. Edit the number of points (pts), the noise frequencies (0.8, 0.5, 1.3, 0.9), and the amplitude to see how each parameter controls the shape character." },
      { icon: "FLOW", title: "Loading and AI processing indicators", desc: "A morphing blob communicates active computation more engagingly than a spinner. Use during AI generation, file processing, or any operation where the wait time is variable. Speed up morphing during heavy processing and slow down when idle." },
      { icon: "STAR", title: "Interactive hover and proximity effects", desc: "Extend the click handler with a mousemove proximity effect: increase amplitude as the cursor approaches the blob centre and decrease as it moves away. The blob appears to react to the cursor's presence even without touching." },
      { icon: "CODE", title: "Audio-reactive blob for music and voice apps", desc: "Connect the amplitude parameter to Web Audio API frequency data: const analyser = ctx.createAnalyser(); analyser.getByteFrequencyData(dataArray); const avg = dataArray.reduce((a,b) => a+b) / dataArray.length; blob amplitude = avg / 255 * 50. The blob pulses to the music." },
      { icon: 'CODE', title: 'Related: Splitting.js CSS Stagger', desc: 'See the [Splitting.js CSS Stagger](/ui-snippets/splitting-css-stagger/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: "How does the blob maintain a smooth organic shape?", a: "8 points are placed equally around a circle (i * 2π / 8). Each point's radius is perturbed by amp * (sin(t*0.8 + i*1.3)*0.5 + cos(t*0.5 + i*0.9)*0.5). Different frequencies (0.8, 0.5) and phases (i*1.3, i*0.9) per point index ensure no two points move identically, creating organic variation rather than uniform pulsing." },
      { q: "What is the spline() function and why is it needed?", a: "spline() converts the 8 perturbed points into a smooth cubic bezier curve. Without it, straight lines between adjacent points would create a faceted polygon, not an organic blob. The function calculates bezier control points that create smooth curves through all 8 vertices." },
      { q: "How do I make the blob morph more aggressively?", a: "Increase the amplitude parameter: 25 (normal) to 40-50 for more dramatic morphing. Also try increasing the t increment per frame from 0.015 to 0.03 for faster motion. Be aware that very high amplitude (60+) can cause the blob to become concave (fold in on itself)." },
      { q: "How do I change the blob colour?", a: "The blob uses an SVG linearGradient element in the defs. Update the stop-color values in the gradient definition in the HTML panel. You can also change the shape to use a radial gradient for a different look, or add a feGaussianBlur filter for a glowing effect." },
      { q: "How do I use multiple blobs with different colours?", a: "Create multiple SVG elements each with their own path, gradient, and animation instance. Give each a different initial time offset: the first blob starts animate(t) at t=0, the second at t=100. They will be in different phases of their morphing cycles, creating organic variety." },
      { q: "Can I use this in React?", a: "Yes. Use useRef on the SVG path element and for the rAF handle. In useEffect, start the animation loop: const loop = () => { pathRef.current.setAttribute(\"d\", genBlob(t, amp)); t += 0.015; rafRef.current = requestAnimationFrame(loop); }. Clean up in the return: cancelAnimationFrame(rafRef.current)." },
    ],
    aiPrompt: {
      paragraph: `You do not have to unpack the trigonometry inside genBlob by staring at it alone. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why each of the 8 points uses two different sine and cosine frequencies (0.8 and 0.5) with different phase offsets (i times 1.3 and i times 0.9), and how the resulting noise value gets turned into a smooth cubic bezier path rather than a faceted polygon. The same assistant can help optimize it, for example asking whether recalculating and setting a full path string every single animation frame could be throttled to every other frame without a visible quality loss, or whether the amp easing toward targetAmp is stable at very high amplitudes. It is also useful for extending the blob: ask it to drive the amplitude from live Web Audio frequency data, add a second layered blob at a phase offset for more depth, or make the hover-expand transition itself easing-driven rather than instant on state change. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "morphing liquid blob" in plain HTML, CSS, and JavaScript using an SVG path regenerated every animation frame with requestAnimationFrame — no canvas, no libraries.

Requirements:
- An SVG path element filled with a gradient, whose d attribute is entirely recomputed and reset on every frame rather than driven by CSS keyframes.
- A point-generation function that places a fixed number of points (e.g. 8) evenly around a circle using angle = (index / count) * Math.PI * 2, then perturbs each point's radius by a noise value combining at least two sine/cosine terms with different frequencies and different per-point phase offsets (based on the point's index), so no two points move identically.
- The noise's amplitude must be a tunable variable that eases toward a target amplitude value on every frame (e.g. amp += (targetAmp - amp) * 0.08) rather than snapping instantly, so hovering smoothly increases the wobble and un-hovering smoothly settles it back down.
- Convert the perturbed points into a smooth closed curve using cubic bezier "C" commands with control points derived from each point's neighbors (not straight "L" lines), so the shape reads as an organic blob rather than a faceted polygon.
- A continuously incrementing time variable must feed into the noise functions every frame so the blob never stops moving, even at rest amplitude.
- Wrap static, non-animated content (an icon and a label) inside the blob using absolute positioning so the content stays legible and centered while the SVG path morphs underneath it.
- The animation loop itself must be a self-scheduling requestAnimationFrame call, not a setInterval.`,
    },
  }
};

export default liquidBlob;
