const numberBaseConverter = {
  id: 'number-base-converter',
  title: 'Number Base Converter',
  category: 'dev',
  html: `<div class="wrap">
  <h2>Number Base Converter</h2>
  <p class="sub">Enter a value in any base — the others update live.</p>

  <div class="rows" id="rows">
    <div class="row" data-base="2">
      <label>Binary <span class="tag">base 2</span></label>
      <input type="text" id="base-2" spellcheck="false" />
    </div>
    <div class="row" data-base="8">
      <label>Octal <span class="tag">base 8</span></label>
      <input type="text" id="base-8" spellcheck="false" />
    </div>
    <div class="row" data-base="10">
      <label>Decimal <span class="tag">base 10</span></label>
      <input type="text" id="base-10" spellcheck="false" />
    </div>
    <div class="row" data-base="16">
      <label>Hexadecimal <span class="tag">base 16</span></label>
      <input type="text" id="base-16" spellcheck="false" />
    </div>
  </div>

  <div class="status" id="status"></div>

  <div class="bits" id="bits-label">8-bit binary breakdown</div>
  <div class="bit-grid" id="bit-grid"></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; padding: 28px 20px; }

.wrap { max-width: 620px; margin: 0 auto; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; }
h2 { font-size: 18px; font-weight: 800; color: #1e293b; }
.sub { font-size: 12.5px; color: #94a3b8; margin: 4px 0 18px; }

.rows { display: flex; flex-direction: column; gap: 10px; margin-bottom: 14px; }
.row label { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 700; color: #475569; margin-bottom: 5px; }
.tag { font-size: 10px; font-weight: 700; color: #94a3b8; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; }

.row input {
  width: 100%; padding: 10px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px;
  font-family: "SF Mono", Consolas, monospace; font-size: 14px; color: #1e293b; letter-spacing: 0.02em;
}
.row input:focus { outline: none; border-color: #6366f1; }
.row.active input { border-color: #6366f1; background: #f5f5ff; }
.row.invalid input { border-color: #dc2626; }

.status { font-size: 12px; font-weight: 600; color: #dc2626; min-height: 16px; margin-bottom: 16px; }

.bits { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 8px; }
.bit-grid { display: grid; grid-template-columns: repeat(8, 1fr); gap: 4px; }
.bit-cell { text-align: center; padding: 8px 2px; border-radius: 6px; background: #f8fafc; border: 1px solid #eef2f7; font-family: monospace; font-size: 13px; font-weight: 700; color: #cbd5e1; }
.bit-cell.on { background: #eef2ff; border-color: #a5b4fc; color: #4338ca; }
.bit-cell .place { display: block; font-size: 8.5px; font-weight: 600; color: inherit; opacity: 0.6; margin-top: 2px; }`,
  js: `const bases = [2, 8, 10, 16];
const inputs = {};
bases.forEach(b => { inputs[b] = document.getElementById('base-' + b); });
const rows = document.querySelectorAll('.row');
const statusEl = document.getElementById('status');
const bitGrid = document.getElementById('bit-grid');

function validCharsFor(base) {
  if (base === 2) return /^[01]*$/;
  if (base === 8) return /^[0-7]*$/;
  if (base === 10) return /^[0-9]*$/;
  return /^[0-9a-fA-F]*$/;
}

function renderBits(value) {
  bitGrid.innerHTML = '';
  const bits = [];
  let n = value;
  for (let i = 0; i < 8; i++) {
    bits.unshift(n & 1);
    n = n >> 1;
  }
  bits.forEach((bit, idx) => {
    const place = Math.pow(2, 7 - idx);
    const cell = document.createElement('div');
    cell.className = 'bit-cell' + (bit ? ' on' : '');
    cell.innerHTML = bit + '<span class="place">' + place + '</span>';
    bitGrid.appendChild(cell);
  });
}

function updateFrom(sourceBase) {
  const raw = inputs[sourceBase].value.trim();
  rows.forEach(r => r.classList.remove('active', 'invalid'));
  document.querySelector('.row[data-base="' + sourceBase + '"]').classList.add('active');

  if (!raw) {
    statusEl.textContent = '';
    bases.forEach(b => { if (b !== sourceBase) inputs[b].value = ''; });
    bitGrid.innerHTML = '';
    return;
  }

  const pattern = validCharsFor(sourceBase);
  if (!pattern.test(raw)) {
    statusEl.textContent = 'Invalid digit for base ' + sourceBase;
    document.querySelector('.row[data-base="' + sourceBase + '"]').classList.add('invalid');
    return;
  }

  const value = parseInt(raw, sourceBase);
  if (!Number.isFinite(value) || value < 0) {
    statusEl.textContent = 'Could not parse value';
    return;
  }
  if (value > 4294967295) {
    statusEl.textContent = 'Value exceeds 32-bit unsigned range (max 4294967295)';
    return;
  }

  statusEl.textContent = '';

  bases.forEach(b => {
    if (b === sourceBase) return;
    inputs[b].value = value.toString(b).toUpperCase();
  });

  renderBits(value & 0xff);
}

bases.forEach(b => {
  inputs[b].addEventListener('input', () => updateFrom(b));
});

inputs[10].value = '156';
updateFrom(10);`,

  seo: {
    title: 'Number Base Converter — Binary, Octal, Decimal & Hex',
    description: 'Convert numbers live between binary, octal, decimal, and hexadecimal using real parseInt/toString radix conversion, with a per-bit visual breakdown. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Number Base Converter — Live Binary, Octal, Decimal & Hexadecimal with Bit Breakdown',
      description: `Converting between number bases by hand is a rite of passage in every programming course, and a tool you still reach for years later when debugging a bitmask, a file permission value, or a color hex code. This snippet keeps four inputs — binary, octal, decimal, and hexadecimal — permanently in sync: type in any one of them and the other three update instantly using JavaScript's own radix-aware number parsing and formatting, not a hand-rolled conversion algorithm.

**parseInt and toString do the real conversion work**

The core conversion logic is exactly two built-in calls. \`parseInt(raw, sourceBase)\` reads the input string as a number in whichever base the user typed into, and \`value.toString(targetBase)\` re-renders that same numeric value into any other base's string representation. This is deliberate: JavaScript's \`Number\` type and these two methods already implement correct, well-tested radix conversion, so there is no reason to hand-write digit-by-digit division-and-remainder logic that could introduce subtle bugs. The interesting engineering is entirely in validation and UI synchronization, not in the math itself.

**Per-base input validation before conversion**

Each base has a different valid character set, checked with a dedicated regular expression before any conversion is attempted: \`/^[01]*$/\` for binary, \`/^[0-7]*$/\` for octal, \`/^[0-9]*$/\` for decimal, and \`/^[0-9a-fA-F]*$/\` for hex. This catches invalid input — typing "2" into the binary field, or "G" into the hex field — before it reaches \`parseInt\`, which would otherwise silently parse only the valid leading digits and produce a confusingly wrong number rather than an obvious error. The offending row is marked with a red border and the status line names exactly which base rejected the input.

**Avoiding an infinite update loop**

Because every input listens for changes and rewrites the other three fields, a naive implementation would trigger the hex field's own input handler when the converter programmatically sets its value, cascading into every other field again. \`updateFrom(sourceBase)\` sidesteps this entirely by writing to \`inputs[b].value\` directly — a plain DOM property assignment — rather than calling any method that dispatches a synthetic \`input\` event, so only the field the user actually typed into ever fires the update function.

**A 32-bit range guard**

Values above 4294967295 (2³²−1) are rejected with an explicit message rather than allowed to silently produce \`Infinity\` or lose precision, since \`Number.prototype.toString(radix)\` on values beyond safe integer precision can behave unpredictably. This keeps the tool honest about its limits instead of quietly returning a wrong answer for very large inputs.

**The 8-bit visual breakdown**

Below the four synced inputs, \`renderBits()\` takes the current value modulo 256 (via a bitwise \`& 0xff\`) and extracts its low 8 bits one at a time using \`n & 1\` followed by a right shift, building an array of individual bit values. Each bit renders as its own cell labeled with the binary place value it represents (128, 64, 32, ... down to 1), with "on" bits highlighted in a distinct color. This makes bitwise concepts — which single bit toggling produces which change in decimal, how a byte's most significant bit relates to values 128 and above — visible rather than abstract, which is exactly the kind of thing that is much easier to understand by watching a highlighted cell flip than by reading an explanation of it.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Type into any field', text: 'Enter a value in Binary, Octal, Decimal, or Hexadecimal — the other three fields convert and update instantly.' },
        { title: 'Watch invalid input get flagged', text: 'Typing a digit that is not valid for that base (like "9" in binary) highlights the field red and explains why in the status line.' },
        { title: 'Read the bit breakdown', text: 'The 8-bit grid below shows the low byte of your value broken into individual bits with their place values (128 down to 1).' },
        { title: 'Try a hex color or file permission value', text: 'Paste a hex code like FF or an octal permission like 755 to see it instantly cross-referenced in the other bases.' },
        { title: 'Clear a field to reset', text: 'Clearing any input clears the others too, giving you a blank slate to start a new conversion.' },
        { title: 'Export in your format', text: 'Click HTML for a standalone file, JSX for a React component, or Tailwind for a React + Tailwind version.' },
      ],
    },
    features: [
      'Live bidirectional sync across binary, octal, decimal, and hexadecimal inputs',
      'Uses real parseInt(str, radix) and Number.toString(radix) — no hand-rolled conversion math',
      'Per-base regex validation catches invalid digits before conversion, with a clear error message',
      'No infinite update loop — programmatic updates never re-trigger the input event',
      '32-bit unsigned range guard (max 4294967295) prevents silent precision loss on huge values',
      'Visual 8-bit breakdown of the low byte with per-bit place values (128 down to 1)',
      'Active-row highlighting shows which field is currently driving the conversion',
      'Zero dependencies, pure vanilla JavaScript',
    ],
    useCases: [
      { icon: 'CODE', title: 'Debugging bitmasks and flags', desc: 'Convert a decimal flag value to binary to see exactly which bits are set, useful when working with permission systems, feature flags, or hardware registers.' },
      { icon: 'LEARN', title: 'Teaching number systems and bitwise operations', desc: 'Show students how the same quantity looks in different bases, and use the bit grid to make abstract place-value concepts concrete and visual.' },
      { icon: 'APP', title: 'Working with Unix file permissions', desc: 'Convert an octal permission value like 755 to see its binary representation and understand which read/write/execute bits are set for owner, group, and others.' },
      { icon: 'DESIGN', title: 'Cross-checking hex color values', desc: 'Convert a hex color component to decimal to understand its intensity, or pair with a [color contrast checker](/ui-snippets/color-contrast-checker/) when working out RGB math by hand.' },
      { icon: 'FLOW', title: 'Low-level and embedded programming', desc: 'Quickly translate register values or memory addresses between the bases used in datasheets (often hex) and application code (often decimal).' },
      { icon: 'CODE', title: 'Related: CIDR / Subnet Calculator', desc: 'See the [CIDR / Subnet Calculator](/ui-snippets/cidr-subnet-calculator/) for a related bitwise dev tool worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: User-Agent String Parser', desc: 'See the [User-Agent String Parser](/ui-snippets/user-agent-parser/) for a related dev pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this use a custom conversion algorithm?', a: 'No. It relies entirely on JavaScript built-ins: parseInt(string, radix) to read the typed value in its source base, and Number.prototype.toString(radix) to render that same numeric value into every other base. This is the same well-tested conversion logic every JavaScript engine already implements.' },
      { q: 'What happens if I type an invalid digit for a base?', a: 'A regex validates the input against that base\'s legal character set before any conversion happens — for example /^[01]*$/ for binary. An invalid character marks the field red and shows a specific error message rather than silently parsing only the valid leading digits.' },
      { q: 'Why doesn\'t typing cause an infinite loop of updates?', a: 'When the converter writes a computed value into the other three fields, it sets the DOM .value property directly rather than calling anything that dispatches a synthetic input event. Only genuine user keystrokes in a field trigger that field\'s own update handler.' },
      { q: 'Is there a maximum value this can convert?', a: 'Yes, values above 4294967295 (2 to the 32nd power minus 1, the classic 32-bit unsigned integer maximum) are rejected with an explicit error rather than silently losing precision, since toString(radix) on very large numbers can behave unpredictably near JavaScript\'s safe integer limit.' },
      { q: 'What does the 8-bit grid at the bottom show?', a: 'It shows the low byte (value modulo 256) of your current number broken into its 8 individual bits, each labeled with the binary place value it represents (128, 64, 32, 16, 8, 4, 2, 1), with set bits highlighted so you can see exactly which powers of two sum to your value.' },
      { q: 'Are hex digits case-sensitive?', a: 'No. The hex input accepts both uppercase and lowercase a-f, and the converter always outputs uppercase hex digits (via .toUpperCase()) for consistency, matching common formatting conventions.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JavaScript into an AI assistant like Claude and ask it to walk through exactly why parseInt and toString(radix) are sufficient for correct base conversion without any custom digit-by-digit math, and why the 32-bit range guard exists. It's also a good base to extend: ask for a signed two's-complement mode for negative numbers, support for arbitrary custom bases beyond the four shown, or a 32-bit bit grid (four rows of 8) instead of just the low byte for full-width bitmask work.`,
      prompt: `Build a number base converter in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- Four text inputs, one each for binary, octal, decimal, and hexadecimal, all kept in sync live: typing in any one field immediately updates the value shown in the other three.
- Use JavaScript's built-in parseInt(string, radix) to read the source value and Number.prototype.toString(radix) to render it into the other bases — no hand-written conversion algorithm.
- Validate each field's input against a regular expression matching that base's legal digit set before converting (binary: 0-1, octal: 0-7, decimal: 0-9, hex: 0-9a-fA-F case-insensitive), and show a clear inline error naming the offending base when an invalid character is typed, without attempting to convert.
- Ensure programmatic updates to the other three fields do not themselves trigger further update cycles (avoid an infinite loop by setting the value property directly rather than dispatching input events).
- Reject values above 4294967295 (32-bit unsigned max) with an explicit error message instead of silently losing precision.
- Below the inputs, render an 8-cell visual grid showing the low byte of the current value broken into individual bits, each cell labeled with its binary place value (128 down to 1) and visually highlighted when the bit is set to 1.`,
    },
  },
};

export default numberBaseConverter;
