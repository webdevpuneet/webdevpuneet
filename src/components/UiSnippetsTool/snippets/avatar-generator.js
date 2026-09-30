const avatarGenerator = {
  id: 'avatar-generator',
  title: 'Avatar Generator',
  lastmod: '2026-07-18',
  category: 'tools',
  html: `<div class="ag-card">
  <div class="ag-preview" id="agPreview"></div>
  <label class="ag-field">Name or email
    <input type="text" id="agName" value="Ada Lovelace" autocomplete="off" spellcheck="false">
  </label>
  <div class="ag-row">
    <label class="ag-opt"><input type="radio" name="agShape" value="circle" checked> Circle</label>
    <label class="ag-opt"><input type="radio" name="agShape" value="rounded"> Rounded</label>
    <button type="button" class="ag-shuffle" id="agShuffle">Shuffle palette</button>
  </div>
  <div class="ag-grid" id="agGrid"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;color:#0f172a;display:flex;justify-content:center;padding:30px 18px}

.ag-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:20px;width:100%;max-width:340px;text-align:center;box-shadow:0 12px 34px -22px rgba(0,0,0,.25)}
.ag-preview{width:96px;height:96px;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:38px;font-family:var(--font-ui,inherit);user-select:none}
.ag-circle{border-radius:50%}
.ag-rounded{border-radius:22px}

.ag-field{display:block;text-align:left;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.04em;margin-bottom:14px}
.ag-field input{width:100%;margin-top:6px;border:1px solid #e2e8f0;border-radius:9px;padding:9px 11px;font-size:14px;font-family:inherit;outline:none}
.ag-field input:focus{border-color:#6366f1}

.ag-row{display:flex;align-items:center;gap:12px;margin-bottom:14px;flex-wrap:wrap}
.ag-opt{display:flex;align-items:center;gap:5px;font-size:12.5px;font-weight:600;color:#475569}
.ag-opt input{accent-color:#6366f1}
.ag-shuffle{margin-left:auto;background:#0f172a;color:#fff;border:none;border-radius:8px;padding:7px 12px;font-size:11.5px;font-weight:700;cursor:pointer;font-family:inherit}
.ag-shuffle:hover{opacity:.9}

.ag-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:8px}
.ag-mini{aspect-ratio:1;display:flex;align-items:center;justify-content:center;color:#fff;font-size:13px;font-weight:800}`,

  js: `var PALETTES = [
  ['#6366f1','#22d3ee','#f59e0b','#34d399','#f472b6','#a855f7'],
  ['#0ea5e9','#14b8a6','#f43f5e','#eab308','#8b5cf6','#ec4899'],
  ['#2563eb','#059669','#dc2626','#d97706','#7c3aed','#db2777']
];
var paletteIdx = 0;
var nameInput = document.getElementById('agName');
var preview = document.getElementById('agPreview');
var grid = document.getElementById('agGrid');

// Deterministic hash so the same name always yields the same avatar.
function hash(str) { var h = 0; for (var i = 0; i < str.length; i++) { h = (h << 5) - h + str.charCodeAt(i); h |= 0; } return Math.abs(h); }

function initials(name) {
  var parts = name.trim().split(/[\\s@._-]+/).filter(Boolean);
  if (!parts.length) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function colorFor(name) {
  var pal = PALETTES[paletteIdx];
  return pal[hash(name) % pal.length];
}

function shape() { return document.querySelector('input[name=agShape]:checked').value; }

function render() {
  var name = nameInput.value || '';
  var cls = shape() === 'circle' ? 'ag-circle' : 'ag-rounded';
  preview.className = 'ag-preview ' + cls;
  preview.style.background = colorFor(name);
  preview.textContent = initials(name);

  // sample grid of other names to show determinism + palette
  var samples = ['Grace Hopper','Alan T','john@acme.io','Zoë','M','Linus B','Ada L','team-ops'];
  grid.innerHTML = '';
  samples.forEach(function (s) {
    var d = document.createElement('div');
    d.className = 'ag-mini ' + cls;
    d.style.background = colorFor(s);
    d.style.borderRadius = shape() === 'circle' ? '50%' : '8px';
    d.textContent = initials(s);
    d.title = s;
    grid.appendChild(d);
  });
}

nameInput.addEventListener('input', render);
Array.prototype.forEach.call(document.querySelectorAll('input[name=agShape]'), function (r) { r.addEventListener('change', render); });
document.getElementById('agShuffle').addEventListener('click', function () { paletteIdx = (paletteIdx + 1) % PALETTES.length; render(); });
render();`,

  seo: {
    title: 'Avatar Generator — Initials Avatars with Deterministic Color',
    description: `An initials avatar generator: initials from a name or email with a deterministic color, plus shape and palette options. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Avatar Generator — Initials and Deterministic Color from a Name',
      description: `An avatar generator turns a name or email into a coloured initials avatar — the fallback every app shows when a user hasn't uploaded a photo. The two things that make it good are correct initials and a colour that's **deterministic** (the same person always gets the same colour). This snippet builds both, with shape and palette options, in plain HTML, CSS, and vanilla JavaScript with no images or canvas.

**Initials that handle real input**

Names come in messy: "Ada Lovelace", "john@acme.io", "Zoë", a single word, a handle like "team-ops". The \`initials()\` function splits on spaces, \`@\`, dots, underscores, and hyphens, drops empties, and takes the first letter of the first and last parts (or the first two letters of a single word). So emails become "JA", multi-word names become first+last, and edge cases degrade gracefully to a sensible one or two letters rather than breaking.

**Deterministic color from a hash**

The colour isn't random — it's chosen by hashing the name to a number and indexing into a palette (\`hash(name) % palette.length\`). A simple, stable string hash means the same name always maps to the same colour across reloads, sessions, and devices, so a user's avatar is recognisable everywhere. The sample grid demonstrates this: every name keeps its colour, and different names spread across the palette.

**Shape and palette options**

A toggle switches between circle and rounded-square avatars, and a shuffle button cycles curated palettes — so you can match the generator to your brand. Because the colour is derived from the palette by hash, changing palettes instantly recolours every avatar consistently.

**Pure CSS rendering, no canvas**

Each avatar is just a flex box with a background colour and centred text, so it's crisp at any size, theme-able with CSS, and trivially exportable (no canvas-to-image step). That makes it cheap to render hundreds of them in a list.

**Portable and dependency-free**

The hash, initials, and colour functions are pure and reusable — drop them into a user list, a comment thread, or a presence indicator. It's a clean reference for the initials-avatar pattern that libraries like boring-avatars or Gravatar fallbacks implement, with no dependency and full control.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An avatar generator renders with a name field and a sample grid.` },
      { title: 'Type a name or email', text: `The initials and color update as you type.` },
      { title: 'Pick a shape', text: `Toggle between circle and rounded-square avatars.` },
      { title: 'Shuffle the palette', text: `Cycle curated palettes to match your brand.` },
      { title: 'Note determinism', text: `The same name always gets the same color.` },
      { title: 'Reuse the functions', text: `Lift initials() and colorFor() into your user list.` },
    ] },
    features: [
      { title: 'Smart initials', text: `Handles names, emails, single words, and separators.` },
      { title: 'Deterministic color', text: `A stable hash maps each name to a fixed palette color.` },
      { title: 'Shape options', text: `Circle or rounded-square avatars.` },
      { title: 'Swappable palettes', text: `Shuffle curated palettes; recolors consistently.` },
      { title: 'Pure CSS render', text: `Flex box + text — crisp at any size, no canvas.` },
      { title: 'Graceful fallbacks', text: `Odd input degrades to a sensible one or two letters.` },
      { title: 'Reusable helpers', text: `Pure hash, initials, and color functions.` },
      { title: 'No library', text: `Pure HTML/CSS/JS — no avatar dependency.` },
    ],
    useCases: [
      { title: 'User list fallbacks', text: `Show initials when no photo, beside an [avatar group](/ui-snippets/avatar-group/).` },
      { title: 'Comment and chat avatars', text: `Color-code authors in a [comment thread](/ui-snippets/comment-thread/).` },
      { title: 'Team and member grids', text: `Consistent avatars across a [team card](/ui-snippets/team-card/) list.` },
      { title: 'Presence and mentions', text: `Recognizable avatars in a [team presence list](/ui-snippets/team-presence-list/).` },
      { title: 'Seed data and demos', text: `Generate avatars without uploading images.` },
      { title: 'Learning hashing', text: `A reference for deterministic color from strings.` },
      { icon: 'CODE', title: 'Related: Buy Now Pay Later Selector', desc: 'See the [Buy Now Pay Later Selector](/ui-snippets/bnpl-payment-selector/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How are the initials chosen?', a: `The name is split on spaces, @, dots, underscores, and hyphens, and empty pieces are dropped. With two or more parts it takes the first letter of the first and last parts (so "Ada Lovelace" becomes AL and "john@acme.io" becomes JA). With a single word it takes the first two letters. Anything empty falls back to a question mark, so messy real-world input never breaks the avatar.` },
      { q: 'Why is the color deterministic instead of random?', a: `So a given person always has the same avatar color everywhere — in a list, a comment, a header — which makes them recognizable. The color is picked by hashing the name to a number and indexing into a palette, and because the hash is stable, the same string always yields the same color across reloads and devices. Random colors would change on every render and lose that identity.` },
      { q: 'Can I use my own brand colors?', a: `Yes. Replace the PALETTES arrays with your brand colors; the generator indexes into the active palette by the name hash, so your colors are distributed deterministically across users. The shuffle button cycles palettes for previewing, but in production you would usually fix one palette that matches your design system.` },
      { q: 'Why render with CSS instead of canvas or an image?', a: `A CSS avatar is just a colored box with centered text, so it is crisp at any size, themeable, accessible (real text), and cheap to render in bulk — a list of hundreds costs almost nothing. Canvas or generated images add a rasterization step, fixed resolution, and export complexity. For initials avatars, CSS is simpler and better in every way that matters here.` },
      { q: 'How do I use this avatar generator in React, Vue, or Angular?', a: `Keep hash, initials, and colorFor as pure functions and call them in a small Avatar component that takes a name prop and renders a styled box with the computed color and initials. Because the functions are deterministic, the same name always renders identically, which also makes them safe for server rendering. Tailwind users apply the shape and sizing with utilities and set the background via an inline style.` },
    ],
    aiPrompt: {
      paragraph: `Rather than working through the bit-shift hash by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the hash function's h << 5 - h + charCode formula distributes different strings across the palette array, or why initials() splits on spaces, @, dots, underscores, and hyphens instead of just spaces. The same assistant can help optimize it — ask whether the hash could collide often enough on a real user base that visually similar names end up with the same color, and how you'd widen the palette or combine the hash with a secondary seed to reduce that. It's also useful for extending the generator: ask it to render a subtle gradient background instead of a flat color, add a photo-upload fallback that only shows the initials avatar when no image is set, or export the same functions as a tiny reusable npm-style module. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a deterministic "initials avatar generator" in plain HTML, CSS, and JavaScript — no canvas, no images, no external avatar library.

Requirements:
- A pure string-hashing function that converts any input string into a stable non-negative integer using bitwise operations (not Math.random, not a network call), such that the exact same input string always produces the exact same output number across page loads and sessions.
- An initials-extraction function that splits a name or email on whitespace, @, periods, underscores, and hyphens, filters out empty pieces, and returns the first letter of the first and last remaining pieces uppercased for multi-part input, or the first two letters for single-word input, falling back to a placeholder character for empty input.
- A color-selection function that uses the hash of the input string modulo the length of a chosen color palette array to pick a color, so the same name always resolves to the same color from whichever palette is currently active.
- A shape toggle (circle vs rounded-square) that re-renders both a large preview avatar and a grid of several sample avatars for different names, demonstrating that different names get visually distinct but individually consistent colors.
- A "shuffle palette" button that cycles through at least three predefined color palette arrays, instantly recoloring every visible avatar (both the main preview and the sample grid) according to the new palette while keeping each name's relative color assignment consistent within that palette.
- Render every avatar as a plain flex-centered div with a background color and text content — no canvas element, no generated image, no SVG text.`,
    },
  },
};

export default avatarGenerator;
