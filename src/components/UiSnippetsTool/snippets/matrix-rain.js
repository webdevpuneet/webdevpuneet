const matrixRain = {
    id: 'matrix-rain',
    title: 'Matrix Rain',
    category: 'animations',
    html: `<canvas id="canvas"></canvas>
<div class="overlay-text">
  <div class="code">WAKE UP</div>
  <div class="sub">The Matrix has you...</div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #000; overflow: hidden; }
canvas { position: fixed; inset: 0; }
.overlay-text { position: fixed; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; pointer-events: none; gap: 12px; }
.code { font-family: 'Courier New', monospace; font-size: clamp(32px,8vw,64px); font-weight: 900; color: #0f0; text-shadow: 0 0 30px #0f0; letter-spacing: 8px; animation: flicker 3s ease infinite; }
.sub  { font-family: 'Courier New', monospace; font-size: 14px; color: rgba(0,255,0,0.5); letter-spacing: 3px; }
@keyframes flicker { 0%,100%{opacity:1} 92%{opacity:1} 93%{opacity:0.3} 94%{opacity:1} 96%{opacity:0.5} 97%{opacity:1} }`,
    js: `const canvas = document.getElementById('canvas');
const ctx    = canvas.getContext('2d');
const chars  = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let W, H, cols, drops;

function init() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
  const fontSize = 14;
  cols = Math.floor(W / fontSize);
  drops = Array(cols).fill(1);
}

function draw() {
  ctx.fillStyle = 'rgba(0,0,0,0.05)';
  ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = '#0f0';
  ctx.font = '14px Courier New';
  drops.forEach((y, i) => {
    const ch = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillStyle = Math.random() > 0.98 ? '#fff' : '#0f0';
    ctx.fillText(ch, i * 14, y * 14);
    if (y * 14 > H && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}

window.addEventListener('resize', init);
init();
setInterval(draw, 40);`,

  seo: {
    title: 'Matrix Rain — Free HTML CSS JS Canvas Snippet',
    description: 'Falling Katakana code rain on Canvas with bright head characters and fading green trails. Copy-paste or export to React, Vue, Angular & Tailwind.',
    about: {
      title: "Matrix Rain — Canvas Column Drops, Character Pool & Fade-Trail Technique",
      description: `The matrix rain effect — falling columns of green characters — is the defining visual of the cyberpunk/hacker aesthetic, alongside [glitch text](/ui-snippets/glitch-text/), the [text scramble](/ui-snippets/text-scramble/) decode, and [neon glow](/ui-snippets/neon-glow/) buttons. This snippet implements it on a fullscreen canvas using the classic drop-array technique.

**The drop array**

\`drops\` is an array with one entry per column (\`Math.floor(W / fontSize)\`). Each entry is a Y position (in character units) representing the current head of that column. On each frame, a random character is drawn at \`(col * fontSize, drops[col] * fontSize)\`. Then \`drops[col]++\`. When a drop reaches the bottom or by random chance, it resets to 0.

**The fade-trail technique**

Rather than clearing the canvas each frame, a semi-transparent black rectangle is drawn over the entire canvas: \`ctx.fillStyle = "rgba(0,0,0,0.05)"\`. This darkens existing characters slightly each frame without erasing them — characters drawn earlier appear progressively darker, creating the fading trail effect without any per-character tracking.

**The character pool**

The chars string mixes Katakana characters (アイウエオ...) with digits and ASCII uppercase for variety. Each frame a random character is drawn for each column head.

**The Canvas column system**

The canvas width is divided into columns of 16px each. An array drops[] tracks the Y position of the falling character in each column — initialised to random starting positions for a natural staggered start. Each frame, every column draws a character at its Y position, then increments Y by 16px. When Y exceeds the canvas height it resets to 0, creating the continuous rain effect. Characters draw in bright green with older trail characters drawn darker, achieved by drawing a semi-transparent black rectangle each frame (rgba(0,0,0,0.05)) rather than clearing the canvas — this darkens existing characters gradually without erasing them.

**Customising the effect**

Change the character set by updating the chars string — use binary (01), hex (0-9A-F), or domain-specific symbols like network packets or DNA bases. Change the colour by updating ctx.fillStyle from bright green to cyan, amber, or any hue. Adjust the animation speed by changing the character pool density or the interval timing. The effect scales to any canvas size — resize the canvas element to match the viewport for a full-screen background.

**Performance note**

Canvas 2D text drawing is not GPU-composited. For very large canvases on mobile, reduce the character pool size or increase column width to reduce the per-frame character count. Using setInterval at 50ms instead of requestAnimationFrame reduces power consumption while keeping the visual smooth enough for decorative background use.

**The Canvas column system**

The canvas width is divided into columns of 16px each. An array drops[] tracks the Y position of the falling character in each column — initialised to random starting positions for a natural staggered start. Each frame, every column draws a character at its Y position, then increments Y by 16px. When Y exceeds the canvas height it resets to 0, creating the continuous rain effect. Characters draw in bright green with older trail characters drawn darker, achieved by drawing a semi-transparent black rectangle each frame (rgba(0,0,0,0.05)) rather than clearing the canvas — this darkens existing characters gradually without erasing them.

**Customising the effect**

Change the character set by updating the chars string — use binary (01), hex (0-9A-F), or domain-specific symbols like network packets or DNA bases. Change the colour by updating ctx.fillStyle from bright green to cyan, amber, or any hue. Adjust the animation speed by changing the character pool density or the interval timing. The effect scales to any canvas size — resize the canvas element to match the viewport for a full-screen background.

**Performance note**

Canvas 2D text drawing is not GPU-composited. For very large canvases on mobile, reduce the character pool size or increase column width to reduce the per-frame character count. Using setInterval at 50ms instead of requestAnimationFrame reduces power consumption while keeping the visual smooth enough for decorative background use.`,
    },
    howToUse: { type: 'steps', items: [
      { title: "Watch the matrix rain", text: "The canvas fills with falling columns of Katakana and ASCII characters with a fading green trail." },
      { title: "Change the character set", text: "In the JS panel, update the chars string — remove Katakana and use binary (01) or hex for a different aesthetic." },
      { title: "Change rain colour", text: "Update ctx.fillStyle on the character draw from #0f0 (bright green) to any colour." },
      { title: "Adjust fade trail speed", text: "Update 0.05 in rgba(0,0,0,0.05) — higher values (0.1) fade faster for shorter trails; lower values (0.02) leave longer trails." },
      { title: "Change font size and column density", text: "Update fontSize = 14 in the JS. Smaller values create more columns and denser rain." },
      { title: "Export in your format", text: "Click \"HTML\" for a standalone file, \"JSX\" for a React component, or \"Tailwind\" for a React + Tailwind version." },
    ]},
    features: [
      "drops array: one Y-position per column (canvas width / font size)",
      "Random character from Katakana + digit + ASCII pool per column head per frame",
      "Semi-transparent black fillRect (rgba 0,0,0,0.05) creates fade-trail without clearing",
      "Bright head character: first draw at full opacity",
      "Columns reset to 0 probabilistically or when reaching canvas bottom",
      "Responsive: resize event recalculates W, H, cols, drops",
      "Dark canvas with green text: classic matrix aesthetic",
      "Export as HTML, JSX, or Tailwind CSS",
      "Mobile/Tablet/Desktop preview",
      "Live editor — preview updates as you type",
    ],
    useCases: [
      { icon: "DESIGN", title: "Cyberpunk and hacker aesthetic backgrounds", desc: "The matrix rain is the defining aesthetic of hacker/cyberpunk interfaces. Use as a fullscreen background behind login screens or loading states." },
      { icon: "APP", title: "Security and crypto product splash screens", desc: "Cybersecurity tools, VPNs, and crypto wallets use the matrix aesthetic to communicate technical sophistication." },
      { icon: "LEARN", title: "Learn the drop-array canvas technique", desc: "Edit the fade alpha (0.05) and column reset probability in the JS panel to understand how the fade trail and column length are controlled." },
      { icon: "FLOW", title: "Developer tool intro animations", desc: "Show a matrix rain animation while a CLI tool or web app initialises, then transition to the main UI." },
      { icon: "STAR", title: "Game loading and menu backgrounds", desc: "Browser games with a hacker or sci-fi theme use matrix rain as menu backgrounds. Add the player name or game title as an overlay." },
      { icon: "CODE", title: "Customise character set and colour", desc: "Replace the Katakana chars with binary (01), hex digits, or any character set. Change ctx.fillStyle from green to any colour for a different theme." },
      { icon: 'CODE', title: 'Related: View Transitions Gallery', desc: 'See the [View Transitions Gallery](/ui-snippets/view-transitions-gallery/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: "How does the fade-trail effect work?", a: "Instead of clearing the canvas each frame (which would show no trail), a semi-transparent black rectangle is drawn over the entire canvas: ctx.fillStyle = \"rgba(0,0,0,0.05)\". This darkens all existing characters by 5% each frame. Characters drawn many frames ago are nearly black; recent ones are bright." },
      { q: "How are column drop positions managed?", a: "The drops array has one entry per column. Each entry is the current Y position (in character units) of that column's head. Each frame, a character is drawn at drops[col] * fontSize. Then drops[col]++. When it reaches the bottom or by random chance, drops[col] = 0 resets it." },
      { q: "How do I change the character set?", a: "Update the chars string in the JS panel. Remove the Katakana characters and replace with any characters. Binary (01) creates a different aesthetic; pure hex creates a memory dump effect." },
      { q: "How do I make some columns different colours?", a: "Store a colour per column in a separate array. Use ctx.fillStyle = columnColors[col] before drawing each character. Cycle through colours for a multi-colour matrix." },
      { q: "Can I use this in React?", a: "Yes. Click \"JSX\" for a React component. Use useRef on the canvas element and useEffect to initialise and start the animation loop. Clean up the rAF handle and resize listener in the useEffect return function." },
      { q: "How do I overlay text on the matrix rain?", a: "Add a div with position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none over the canvas. The pointer-events: none allows canvas mouse interaction to pass through." },
    ],
    aiPrompt: {
      paragraph: `You do not need to reverse-engineer the fade-trail trick from watching the animation alone. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why drawing a low-opacity black rectangle over the whole canvas every frame produces a fading trail instead of clearing the canvas outright, and how the drops array's per-column Y position combined with a random reset chance keeps individual columns from all cycling in visible sync. The same assistant can help optimize it, for instance asking whether setInterval at 40ms is the right choice compared to requestAnimationFrame for battery life on a decorative background, or whether font measurement per frame could be hoisted outside the draw loop. It is also useful for extending the effect: ask it to make columns react to mouse position, vary character brightness by a simulated depth value, or swap the character pool for a custom alphabet tied to a brand theme. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "matrix rain" falling-character effect in plain HTML, CSS, and JavaScript using the Canvas 2D API — no libraries.

Requirements:
- A fullscreen canvas sized to the window's width and height, resized on the window resize event, with a corresponding drops array rebuilt to match the new column count whenever the canvas is resized.
- Divide the canvas width into fixed-size columns based on a font-size constant, and maintain one numeric entry per column in a drops array representing that column's current fall position in character-height units.
- On every draw tick, instead of clearing the canvas, fill the entire canvas with a low-alpha black rectangle (not fully opaque) so previously drawn characters darken gradually across frames rather than disappearing instantly, producing a fading trail.
- For each column, draw one randomly chosen character from a mixed pool (e.g. katakana, digits, and uppercase letters) at that column's current position, occasionally drawing the character in a brighter color than the rest to simulate a bright "head" character, then increment that column's position.
- When a column's position moves past the bottom of the canvas, reset it back to the top with some randomness (not every column resetting deterministically at the exact same moment), so columns cycle independently and the rain never looks synchronized.
- Run the draw loop on a fixed-interval timer rather than requestAnimationFrame, and make the interval delay, font size, and character pool easy to change as top-level constants.
- Overlay static, non-canvas text on top of the animation using a fixed-position container with pointer-events disabled, so the text is readable without blocking mouse interaction with anything beneath the canvas.`,
    },
  }
};

export default matrixRain;
