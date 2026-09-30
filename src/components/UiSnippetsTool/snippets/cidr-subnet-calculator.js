const cidrSubnetCalculator = {
  id: 'cidr-subnet-calculator',
  title: 'CIDR / Subnet Calculator',
  category: 'dev',
  html: `<div class="wrap">
  <h2>CIDR / Subnet Calculator</h2>

  <div class="input-row">
    <input type="text" id="cidr-input" spellcheck="false" value="192.168.1.10/24" placeholder="e.g. 10.0.0.0/24" />
  </div>
  <div class="error" id="error-msg"></div>

  <div class="grid" id="result-grid"></div>

  <div class="host-note" id="host-note"></div>

  <div class="binary-block">
    <div class="binary-label">Address in binary</div>
    <div class="binary-row" id="binary-row"></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; padding: 28px 20px; }

.wrap { max-width: 640px; margin: 0 auto; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; }
h2 { font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 16px; }

.input-row input {
  width: 100%; padding: 12px 14px; border: 1.5px solid #e2e8f0; border-radius: 10px;
  font-family: "SF Mono", Consolas, monospace; font-size: 15px; color: #1e293b;
}
.input-row input:focus { outline: none; border-color: #6366f1; }

.error { color: #dc2626; font-size: 12.5px; margin-top: 8px; min-height: 16px; }

.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 16px; }
.cell { background: #f8fafc; border: 1px solid #eef2f7; border-radius: 10px; padding: 10px 12px; }
.cell .k { font-size: 10.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 3px; }
.cell .v { font-family: "SF Mono", Consolas, monospace; font-size: 14px; font-weight: 700; color: #1e293b; }
.cell.wide { grid-column: 1 / -1; }
.cell.accent .v { color: #6366f1; }

.host-note { font-size: 12px; color: #64748b; margin-top: 12px; line-height: 1.6; }

.binary-block { margin-top: 18px; }
.binary-label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 8px; }
.binary-row { display: flex; flex-wrap: wrap; gap: 2px; font-family: monospace; font-size: 12px; }
.binary-row span { padding: 2px 1px; }
.bit-net { color: #6366f1; font-weight: 700; }
.bit-host { color: #94a3b8; }
.octet-sep { color: #cbd5e1; padding: 0 4px; }`,
  js: `const input = document.getElementById('cidr-input');
const errorMsg = document.getElementById('error-msg');
const resultGrid = document.getElementById('result-grid');
const hostNote = document.getElementById('host-note');
const binaryRow = document.getElementById('binary-row');

function ipToInt(parts) {
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
}
function intToIp(n) {
  return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
}
function parseIp(str) {
  const parts = str.trim().split('.');
  if (parts.length !== 4) return null;
  const nums = parts.map(p => Number(p));
  if (nums.some(n => !Number.isInteger(n) || n < 0 || n > 255)) return null;
  return nums;
}

function calculate() {
  errorMsg.textContent = '';
  const raw = input.value.trim();
  const match = raw.match(/^(.+?)\\/(\\d{1,2})$/);
  if (!match) {
    errorMsg.textContent = 'Enter an address in CIDR form, e.g. 192.168.1.0/24';
    resultGrid.innerHTML = '';
    hostNote.textContent = '';
    binaryRow.innerHTML = '';
    return;
  }
  const ipParts = parseIp(match[1]);
  const prefix = Number(match[2]);
  if (!ipParts) {
    errorMsg.textContent = 'Invalid IPv4 address — each octet must be 0-255.';
    resultGrid.innerHTML = '';
    hostNote.textContent = '';
    binaryRow.innerHTML = '';
    return;
  }
  if (prefix < 0 || prefix > 32) {
    errorMsg.textContent = 'Prefix length must be between /0 and /32.';
    resultGrid.innerHTML = '';
    hostNote.textContent = '';
    binaryRow.innerHTML = '';
    return;
  }

  const ipInt = ipToInt(ipParts);
  const maskInt = prefix === 0 ? 0 : (0xFFFFFFFF << (32 - prefix)) >>> 0;
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;
  const totalAddresses = Math.pow(2, 32 - prefix);
  const usableHosts = prefix >= 31 ? 0 : totalAddresses - 2;
  const firstHost = prefix >= 31 ? networkInt : networkInt + 1;
  const lastHost = prefix >= 31 ? broadcastInt : broadcastInt - 1;

  const cells = [
    ['Network Address', intToIp(networkInt), true],
    ['Broadcast Address', intToIp(broadcastInt), true],
    ['Subnet Mask', intToIp(maskInt), false],
    ['Wildcard Mask', intToIp(~maskInt >>> 0), false],
    ['First Usable Host', usableHosts > 0 ? intToIp(firstHost) : 'n/a', false],
    ['Last Usable Host', usableHosts > 0 ? intToIp(lastHost) : 'n/a', false],
    ['Total Addresses', totalAddresses.toLocaleString(), false],
    ['Usable Hosts', usableHosts.toLocaleString(), false],
  ];

  resultGrid.innerHTML = cells.map(([k, v, accent]) =>
    '<div class="cell' + (accent ? ' accent' : '') + '"><div class="k">' + k + '</div><div class="v">' + v + '</div></div>'
  ).join('');

  if (prefix === 32) {
    hostNote.textContent = '/32 is a single host route — no network or broadcast distinction, no usable host range.';
  } else if (prefix === 31) {
    hostNote.textContent = '/31 is a point-to-point link (RFC 3021) — both addresses are usable, no broadcast address is reserved.';
  } else {
    hostNote.textContent = 'Usable hosts = total addresses minus the network and broadcast addresses (2^' + (32 - prefix) + ' - 2 = ' + usableHosts.toLocaleString() + ').';
  }

  renderBinary(ipParts, prefix);
}

function renderBinary(ipParts, prefix) {
  let bitIndex = 0;
  const spans = [];
  ipParts.forEach((octet, oi) => {
    const bits = octet.toString(2).padStart(8, '0');
    for (let i = 0; i < 8; i++) {
      const cls = bitIndex < prefix ? 'bit-net' : 'bit-host';
      spans.push('<span class="' + cls + '">' + bits[i] + '</span>');
      bitIndex++;
    }
    if (oi < 3) spans.push('<span class="octet-sep">.</span>');
  });
  binaryRow.innerHTML = spans.join('');
}

input.addEventListener('input', calculate);
calculate();`,

  seo: {
    title: 'CIDR / Subnet Calculator — Free HTML CSS JS Snippet',
    description: 'Compute network address, broadcast address, subnet mask, usable host range and total addresses from CIDR notation with a live binary bit breakdown. Exports to React, Vue & Tailwind.',
    about: {
      title: 'CIDR / Subnet Calculator — Network, Broadcast & Host Range from IPv4 CIDR Notation via Bitwise Arithmetic',
      description: `CIDR (Classless Inter-Domain Routing) notation packs an IPv4 address and a network prefix length into one compact string, like \`192.168.1.10/24\`. Reading the actual network boundaries out of that string by hand means converting each octet to binary and applying a mask — this snippet does that arithmetic for real, with genuine bitwise operations on 32-bit integers, not a lookup table of common prefixes.

**Packing an IPv4 address into a single 32-bit integer**

\`ipToInt()\` takes the four octet numbers and combines them with bit shifts: \`(parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]\`, then coerces the result to an unsigned 32-bit integer with \`>>> 0\` (a zero-fill right shift by zero, a common JavaScript idiom for forcing a value into unsigned 32-bit range). This matters because JavaScript's bitwise operators work on signed 32-bit integers internally — without the \`>>> 0\` coercion, an address with a high first octet like \`192.x.x.x\` would compute to a negative number and every downstream calculation would be wrong. \`intToIp()\` reverses the packing, extracting each octet with a right-shift and an \`& 255\` mask.

**Deriving the subnet mask from the prefix length**

The subnet mask for a given prefix \`/n\` is n set bits followed by \`32-n\` zero bits. The calculator builds it with \`(0xFFFFFFFF << (32 - prefix)) >>> 0\` — starting from all 32 bits set, then shifting left by the host-bit count zeroes out exactly that many low bits. A prefix of \`/0\` is special-cased to a mask of \`0\`, since shifting a 32-bit value left by 32 is undefined behavior in JavaScript (shift amounts wrap modulo 32, so \`<< 32\` is actually \`<< 0\`, which would incorrectly leave all bits set).

**Network and broadcast addresses via AND and OR with the wildcard mask**

The network address is \`ipInt & maskInt\` — ANDing zeroes out every host bit, leaving only the network portion. The broadcast address is the network address ORed with the wildcard mask (\`~maskInt >>> 0\`, the bitwise complement of the subnet mask), which sets every host bit to 1. This is exactly the arithmetic a router or a language like Python's \`ipaddress\` module performs internally; the calculator just makes each step and its rationale visible.

**Usable host count and the /31, /32 special cases**

Total addresses in a subnet is \`2^(32-prefix)\`. Usable hosts is normally that total minus 2, because the network and broadcast addresses at the two ends of the range can't be assigned to a host. Two edge cases are called out explicitly rather than silently applying the generic formula: a \`/32\` is a single-host route with no network/broadcast distinction at all, and a \`/31\` (per RFC 3021) is a point-to-point link where *both* addresses in the two-address block are usable, since there's no room to spare a broadcast address on a link with only two possible endpoints.

**The binary bit visualization**

\`renderBinary()\` converts each octet to an 8-character binary string and colors the first \`prefix\` bits (the network portion, shared by every host in the subnet) differently from the remaining host bits, letting you see directly which bits the mask fixes and which bits are free to vary across every address in the range — the same visual most networking textbooks draw by hand.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Type an address in CIDR notation', text: 'Enter an IPv4 address and prefix length together, e.g. 10.0.0.0/16 or 192.168.1.10/24 — results recalculate on every keystroke.' },
        { title: 'Read the network and broadcast addresses', text: 'These two accented cells show the exact boundaries of the subnet that address belongs to.' },
        { title: 'Check the subnet and wildcard masks', text: 'The wildcard mask (the bitwise inverse of the subnet mask) is what many router ACL configurations expect instead of the subnet mask itself.' },
        { title: 'Find the usable host range', text: 'First and last usable host are the network and broadcast addresses plus/minus one, with /31 and /32 handled as their documented special cases.' },
        { title: 'Compare total addresses vs usable hosts', text: 'Total addresses is 2 to the power of the host-bit count; usable hosts subtracts the two reserved addresses at typical prefix lengths.' },
        { title: 'Study the binary bit breakdown', text: 'The colored bit row shows exactly which leading bits the prefix length fixes as the network portion versus which trailing bits vary per host.' },
      ],
    },
    features: [
      'Real 32-bit bitwise arithmetic (shifts, AND, OR, NOT) matching what routers and IP libraries compute internally',
      'Correct unsigned coercion (>>> 0) throughout, avoiding the signed-integer bugs that plague naive JS IP math',
      'Special-cased /31 point-to-point links (RFC 3021) and /32 host routes instead of a blanket "total - 2" formula',
      'Live network, broadcast, subnet mask, wildcard mask, and usable host range from a single CIDR input',
      'Inline validation for malformed IPv4 octets and out-of-range prefix lengths with clear error messages',
      'Colored binary bit visualization distinguishing the fixed network portion from the variable host portion',
      'Updates on every keystroke, no submit button or page reload required',
      'Entirely client-side, no lookup tables — every value is computed live from the input',
    ],
    useCases: [
      { icon: 'CODE', title: 'Planning VPC or subnet allocations', desc: 'Quickly check how many usable hosts a /26 or /28 subnet provides before carving up a cloud VPC\'s address space, or confirm two proposed subnets don\'t overlap.' },
      { icon: 'LEARN', title: 'Teaching subnetting and CIDR notation', desc: 'The binary bit breakdown makes the abstract "prefix length determines the mask" rule visible and concrete for networking students studying for certifications.' },
      { icon: 'FLOW', title: 'Debugging firewall or routing rules', desc: 'Confirm exactly which addresses a given CIDR block in a security group or ACL rule actually covers before applying it to production infrastructure.' },
      { icon: 'APP', title: 'Home network and router configuration', desc: 'Work out the broadcast address and usable range for a custom home subnet before configuring DHCP reservation ranges on a router.' },
      { icon: 'DASH', title: 'Internal networking documentation tooling', desc: 'Embed in an internal wiki or runbook alongside infrastructure diagrams so engineers can self-serve subnet math without opening a separate calculator site.' },
      { icon: 'CODE', title: 'Related: Base64 & URL-Safe Encoder/Decoder', desc: 'See the [Base64 & URL-Safe Encoder/Decoder](/ui-snippets/base64-playground/) for a related dev pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: UUID / ULID Generator & Validator', desc: 'See the [UUID / ULID Generator & Validator](/ui-snippets/uuid-ulid-generator/) for a related dev pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: CSS Grid Generator', desc: 'See the [CSS Grid Generator](/ui-snippets/css-grid-generator/) for a related dev pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: .env File Parser & Validator', desc: 'See the [.env File Parser & Validator](/ui-snippets/dotenv-file-parser/) for a related dev pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the calculator use >>> 0 after bitwise operations?', a: 'JavaScript\'s bitwise operators treat numbers as signed 32-bit integers. An IPv4 address with a high first octet (anything 128 and above) produces a negative number when packed into a 32-bit integer using plain arithmetic. The >>> 0 idiom (zero-fill right shift by zero) forces the value back into the unsigned 0 to 4294967295 range so address comparisons and formatting work correctly.' },
      { q: 'Why are /31 and /32 handled differently from other prefixes?', a: 'A /32 identifies exactly one address with no room for a separate network or broadcast address, so there is no usable host range at all. A /31, per RFC 3021, is reserved for point-to-point links: rather than wasting one of only two available addresses on a broadcast address, both addresses in the block are treated as usable host addresses.' },
      { q: 'What is the wildcard mask and why is it different from the subnet mask?', a: 'The wildcard mask is the bitwise complement (NOT) of the subnet mask — where the subnet mask has 1s for the network portion, the wildcard mask has 1s for the host portion. Some router platforms, particularly Cisco access control lists, expect the wildcard mask form instead of the standard subnet mask when specifying an address range.' },
      { q: 'How is the network address calculated from the input address?', a: 'The input IP address is converted to a 32-bit integer, then bitwise-ANDed with the subnet mask. ANDing zeroes out every bit in the host portion while leaving the network portion bits unchanged, which is exactly what "the network this address belongs to" means at the bit level.' },
      { q: 'What happens if I enter an invalid octet like 999?', a: 'The calculator validates every octet is an integer between 0 and 255 before doing any math, and shows a clear inline error instead of silently computing with an invalid value.' },
      { q: 'Does this work for IPv6?', a: 'No, this calculator is IPv4-only — it packs addresses into a single 32-bit integer, which doesn\'t apply to IPv6\'s 128-bit address space. An IPv6 subnet calculator would need a different underlying representation, typically arrays of 16-bit groups or BigInt-based 128-bit arithmetic.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's JavaScript to an AI assistant like Claude and ask it to explain step by step why the >>> 0 coercion is necessary after every bitwise operation here — it's a subtlety that trips up most hand-written IP address arithmetic in JavaScript. It's also a solid base to extend: ask for IPv6 support using BigInt for 128-bit math, a subnet-splitting feature that divides a given CIDR block into N equal smaller subnets, or a reverse mode that takes two IP addresses and computes the smallest CIDR block containing both.`,
      prompt: `Build a CIDR / subnet calculator in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- A single text input accepting IPv4 CIDR notation like 192.168.1.10/24, recalculating live on every keystroke.
- Validate the IP address (four octets, each 0-255) and the prefix length (0-32) separately, showing a specific inline error message for each kind of invalid input.
- Pack the IPv4 address into a 32-bit integer using bit shifts, being careful to coerce results to unsigned 32-bit range (JavaScript's bitwise operators are signed by default) so addresses with a high first octet compute correctly.
- Compute and display: subnet mask, wildcard mask (bitwise complement of the subnet mask), network address (address AND mask), broadcast address (network address OR wildcard mask), total addresses (2 to the power of host bits), and the first/last usable host addresses.
- Correctly special-case /31 (RFC 3021 point-to-point link, both addresses usable, no broadcast) and /32 (single host, no network/broadcast distinction) rather than applying the generic "total minus 2" formula to every prefix length.
- Render a binary bit visualization of the address's 32 bits, coloring the network-portion bits (determined by the prefix length) differently from the host-portion bits.`,
    },
  },
};

export default cidrSubnetCalculator;
