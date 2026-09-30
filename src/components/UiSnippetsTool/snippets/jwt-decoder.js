const jwtDecoder = {
  id: 'jwt-decoder',
  title: 'JWT Decoder & Inspector',
  category: 'dev',
  html: `<div class="wrap">
  <div class="header">
    <h2>JWT Decoder</h2>
    <span class="badge" id="status-badge">Paste a token</span>
  </div>
  <textarea id="token-input" spellcheck="false" placeholder="Paste a JSON Web Token here, e.g. eyJhbGciOi...header.payload.signature">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkYSBMb3ZlbGFjZSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoxNzMxNTM2MDAwfQ.4sYh1n2rV0k3s6q9tW2u5x8B1e4H7k0N3q6T9w2Z5c8</textarea>

  <div class="segments" id="segments"></div>

  <div class="panels">
    <div class="panel">
      <div class="panel-head"><span class="dot header-dot"></span>Header</div>
      <pre id="header-out" class="out"></pre>
    </div>
    <div class="panel">
      <div class="panel-head"><span class="dot payload-dot"></span>Payload</div>
      <pre id="payload-out" class="out"></pre>
    </div>
    <div class="panel">
      <div class="panel-head"><span class="dot sig-dot"></span>Signature</div>
      <pre id="sig-out" class="out sig"></pre>
      <div class="note">Signature is shown raw — this tool cannot verify it without the signing secret or public key.</div>
    </div>
  </div>

  <div class="claims" id="claims-row"></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; min-height: 100vh; padding: 28px 20px; color: #e2e8f0; }

.wrap { max-width: 760px; margin: 0 auto; }

.header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
h2 { font-size: 18px; font-weight: 800; }
.badge { font-size: 11px; font-weight: 700; padding: 5px 10px; border-radius: 999px; background: #1e293b; color: #94a3b8; border: 1px solid #334155; }
.badge.valid { background: rgba(34,197,94,0.15); color: #4ade80; border-color: rgba(34,197,94,0.3); }
.badge.invalid { background: rgba(239,68,68,0.15); color: #f87171; border-color: rgba(239,68,68,0.3); }
.badge.expired { background: rgba(245,158,11,0.15); color: #fbbf24; border-color: rgba(245,158,11,0.3); }

#token-input {
  width: 100%; min-height: 90px; resize: vertical; padding: 12px 14px;
  background: #1e293b; border: 1.5px solid #334155; border-radius: 10px;
  color: #a5b4fc; font-family: "SF Mono", Consolas, monospace; font-size: 12.5px; line-height: 1.6;
  word-break: break-all;
}
#token-input:focus { outline: none; border-color: #6366f1; }

.segments { display: flex; gap: 3px; margin: 10px 0 18px; font-family: monospace; font-size: 10.5px; flex-wrap: wrap; word-break: break-all; }
.segments span { padding: 3px 2px; border-radius: 3px; }
.seg-header { background: rgba(244,63,94,0.25); color: #fda4af; }
.seg-payload { background: rgba(139,92,246,0.25); color: #c4b5fd; }
.seg-sig { background: rgba(34,197,94,0.2); color: #86efac; }
.seg-dot-char { color: #64748b; padding: 3px 1px; }

.panels { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 14px; }
.panel { grid-column: span 1; background: #1e293b; border: 1px solid #334155; border-radius: 10px; padding: 12px 14px; }
.panel:last-child { grid-column: span 2; }

.panel-head { display: flex; align-items: center; gap: 7px; font-size: 11.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 8px; }
.dot { width: 8px; height: 8px; border-radius: 50%; }
.header-dot { background: #fb7185; }
.payload-dot { background: #a78bfa; }
.sig-dot { background: #4ade80; }

.out { font-family: "SF Mono", Consolas, monospace; font-size: 12px; color: #e2e8f0; white-space: pre-wrap; word-break: break-word; line-height: 1.7; min-height: 20px; }
.out.sig { color: #86efac; word-break: break-all; }
.note { font-size: 11px; color: #64748b; margin-top: 8px; line-height: 1.5; }

.claims { display: flex; flex-wrap: wrap; gap: 8px; }
.claim-chip { font-size: 11.5px; padding: 6px 10px; border-radius: 8px; background: #1e293b; border: 1px solid #334155; color: #cbd5e1; }
.claim-chip b { color: #a5b4fc; }`,
  js: `const input = document.getElementById('token-input');
const segments = document.getElementById('segments');
const headerOut = document.getElementById('header-out');
const payloadOut = document.getElementById('payload-out');
const sigOut = document.getElementById('sig-out');
const badge = document.getElementById('status-badge');
const claimsRow = document.getElementById('claims-row');

function base64UrlDecode(str) {
  let s = str.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  const binary = atob(s);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return new TextDecoder('utf-8').decode(bytes);
}

function fmtTime(sec) {
  if (typeof sec !== 'number') return null;
  const d = new Date(sec * 1000);
  return d.toISOString().replace('T', ' ').replace('.000Z', ' UTC');
}

function renderSegments(parts) {
  segments.innerHTML = '';
  const classes = ['seg-header', 'seg-payload', 'seg-sig'];
  parts.forEach((part, i) => {
    const span = document.createElement('span');
    span.className = classes[i];
    span.textContent = part || '';
    segments.appendChild(span);
    if (i < parts.length - 1) {
      const dot = document.createElement('span');
      dot.className = 'seg-dot-char';
      dot.textContent = '.';
      segments.appendChild(dot);
    }
  });
}

function decode() {
  const token = input.value.trim();
  claimsRow.innerHTML = '';
  if (!token) {
    badge.textContent = 'Paste a token';
    badge.className = 'badge';
    segments.innerHTML = '';
    headerOut.textContent = '';
    payloadOut.textContent = '';
    sigOut.textContent = '';
    return;
  }
  const parts = token.split('.');
  renderSegments(parts);

  if (parts.length !== 3) {
    badge.textContent = 'Malformed (expected 3 segments)';
    badge.className = 'badge invalid';
    headerOut.textContent = '';
    payloadOut.textContent = '';
    sigOut.textContent = parts[2] || '(missing)';
    return;
  }

  let header, payload;
  try {
    header = JSON.parse(base64UrlDecode(parts[0]));
  } catch (e) {
    header = null;
  }
  try {
    payload = JSON.parse(base64UrlDecode(parts[1]));
  } catch (e) {
    payload = null;
  }

  headerOut.textContent = header ? JSON.stringify(header, null, 2) : 'Could not decode/parse header segment as JSON';
  payloadOut.textContent = payload ? JSON.stringify(payload, null, 2) : 'Could not decode/parse payload segment as JSON';
  sigOut.textContent = parts[2] || '(empty)';

  if (!header || !payload) {
    badge.textContent = 'Invalid base64url / JSON';
    badge.className = 'badge invalid';
    return;
  }

  const now = Math.floor(Date.now() / 1000);
  if (typeof payload.exp === 'number' && payload.exp < now) {
    badge.textContent = 'Expired';
    badge.className = 'badge expired';
  } else {
    badge.textContent = 'Decoded OK (alg: ' + (header.alg || '?') + ')';
    badge.className = 'badge valid';
  }

  const chips = [];
  if (header.alg) chips.push(['alg', header.alg]);
  if (header.typ) chips.push(['typ', header.typ]);
  if (payload.iat) chips.push(['iat', fmtTime(payload.iat)]);
  if (payload.exp) chips.push(['exp', fmtTime(payload.exp)]);
  if (payload.sub) chips.push(['sub', payload.sub]);
  chips.forEach(([k, v]) => {
    const chip = document.createElement('div');
    chip.className = 'claim-chip';
    chip.innerHTML = '<b>' + k + '</b>: ' + v;
    claimsRow.appendChild(chip);
  });
}

input.addEventListener('input', decode);
decode();`,

  seo: {
    title: 'JWT Decoder & Inspector — Free HTML CSS JS Snippet',
    description: 'Decode JSON Web Token header, payload and signature client-side with real base64url decoding, expiry detection and claim chips. Exports to React, Vue & Tailwind.',
    about: {
      title: 'JWT Decoder — Client-Side Base64Url Decode of Header, Payload & Expiry Detection',
      description: `A JSON Web Token is three base64url-encoded segments joined by dots: a header describing the signing algorithm, a payload carrying claims, and a signature proving the first two segments weren't tampered with. Debugging a JWT usually means copy-pasting it into some third-party website — this snippet does the same decoding entirely in the browser, with no network request and no token ever leaving the page.

**Base64url is not the same as base64**

JWTs use base64url encoding (RFC 4648 §5), which swaps \`+\` and \`/\` for \`-\` and \`_\` and drops trailing \`=\` padding so the token is safe to embed in URLs and HTTP headers without escaping. The browser's built-in \`atob()\` only understands standard base64, so \`base64UrlDecode()\` first reverse-swaps those characters and re-pads the string to a multiple of four characters before calling \`atob()\`. The result is then run through \`TextDecoder('utf-8')\` on a \`Uint8Array\` built from the decoded binary string — a detail that matters because \`atob()\` alone mangles any non-ASCII characters in claim values (unicode names, for example) if you skip the byte-array round trip.

**Splitting and rendering the three segments**

\`decode()\` calls \`token.split('.')\` and immediately checks the result has exactly three parts. A token with the wrong number of segments is flagged as malformed rather than silently decoding garbage. Each of the three raw segments is also rendered as a colored inline chip in the \`.segments\` row so you can see visually which characters of the raw token correspond to header, payload, and signature — useful when comparing two tokens byte-for-byte.

**Header and payload are parsed as JSON, independently**

The header and payload segments are decoded and \`JSON.parse\`d in separate \`try/catch\` blocks. This means a JWT with a valid header but a corrupted payload (or vice versa) still shows you the segment that *did* parse correctly, with a clear message on the one that didn't — rather than a single try/catch around the whole token that would hide which half failed.

**Expiry detection using the \`exp\` claim**

Per RFC 7519, the \`exp\` claim is a Unix timestamp (seconds, not milliseconds) after which the token should be rejected by any consumer. The tool compares \`payload.exp\` against \`Math.floor(Date.now() / 1000)\` and flips the status badge to an amber "Expired" state when the token is past its expiry — a fast way to check "is this the stale token I've been debugging with all morning" without doing the math by hand.

**Signature is shown, never verified**

The signature segment is displayed raw as the third panel, but this tool makes no attempt to verify it — verifying an HMAC-signed token requires the shared secret, and verifying an RS256/ES256 token requires the issuer's public key, neither of which a client-side decoder should ever ask you to paste in. The note under the signature panel is intentional: decoding a JWT tells you what it *claims*, not whether it's authentic. Trusting a JWT's contents always requires signature verification on a server that holds the correct key.

**Claim chips for common fields**

Below the three panels, \`decode()\` builds small chips for whichever of \`alg\`, \`typ\`, \`iat\`, \`exp\`, and \`sub\` are present, formatting the Unix timestamps into a readable UTC string via \`fmtTime()\`. This gives an at-a-glance summary without having to mentally parse the raw JSON for the fields you check most often when debugging an auth issue.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste a JWT into the textarea', text: 'Any three-segment token (header.payload.signature) decodes live as you type or paste — no submit button needed.' },
        { title: 'Read the colored segment breakdown', text: 'The row under the textarea shows exactly which raw characters belong to the header, payload, and signature.' },
        { title: 'Inspect the Header and Payload panels', text: 'Both segments are base64url-decoded and pretty-printed as JSON. A parse failure on either segment is reported independently.' },
        { title: 'Check the status badge', text: 'It reads "Decoded OK", "Expired" (when the exp claim is in the past), or an error state for malformed tokens.' },
        { title: 'Scan the claim chips', text: 'Common fields — alg, typ, iat, exp, sub — are pulled out into quick-reference chips with human-readable timestamps.' },
        { title: 'Remember: this never verifies signatures', text: 'The signature panel is display-only. Verifying authenticity requires the signing secret or public key on a trusted server, never in the browser.' },
      ],
    },
    features: [
      'Real base64url decoding (not plain base64) matching RFC 4648 §5, including correct re-padding',
      'UTF-8 safe decode via TextDecoder on a Uint8Array, so unicode claim values render correctly',
      'Independent JSON.parse try/catch for header and payload — one bad segment doesn\'t hide the other',
      'Live status badge: Decoded OK, Expired (via exp claim vs current time), or malformed/invalid',
      'Colored raw-segment breakdown showing exactly which characters are header, payload, and signature',
      'Quick-reference claim chips for alg, typ, iat, exp, and sub with human-readable UTC timestamps',
      'Entirely client-side — no network request, no token ever transmitted anywhere',
      'Updates on every keystroke via a single input listener, no submit button required',
    ],
    useCases: [
      { icon: 'CODE', title: 'Debugging an auth integration', desc: 'Paste a token straight from a browser dev-tools network tab or an Authorization header to see exactly which claims and expiry your backend is issuing, without leaving the browser or hitting a third-party decoder site.' },
      { icon: 'LEARN', title: 'Teaching how JWTs are structured', desc: 'Use the colored segment breakdown to show students or teammates that a JWT is just three base64url JSON blobs joined by dots — not an opaque encrypted blob — and why the signature alone is what makes it trustworthy.' },
      { icon: 'APP', title: 'Internal developer tooling', desc: 'Embed alongside an [API response inspector](/ui-snippets/api-response-inspector/) or an [API key manager](/ui-snippets/api-key-manager/) in an internal dev-tools dashboard for quick token debugging during support tickets.' },
      { icon: 'FLOW', title: 'Verifying token expiry during incident response', desc: 'When users report being logged out unexpectedly, decode the token they were using and check the exp claim against the incident timestamp to rule in or out a premature-expiry bug.' },
      { icon: 'DASH', title: 'QA and staging environment checks', desc: 'Confirm that a staging environment is issuing tokens with the expected alg, audience, or custom claims before promoting an auth change to production.' },
      { icon: 'CODE', title: 'Related: CIDR / Subnet Calculator', desc: 'See the [CIDR / Subnet Calculator](/ui-snippets/cidr-subnet-calculator/) for a related dev pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: User-Agent String Parser', desc: 'See the [User-Agent String Parser](/ui-snippets/user-agent-parser/) for a related dev pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: SQL Query Formatter', desc: 'See the [SQL Query Formatter](/ui-snippets/sql-query-formatter/) for a related dev pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this verify the JWT signature?', a: 'No. Verifying a signature requires either the shared HMAC secret (for HS256) or the issuer\'s public key (for RS256/ES256/etc.), and a client-side tool should never ask you to paste secrets into it. This snippet only decodes and displays the three segments — treat the decoded payload as unverified claims, not proof of authenticity.' },
      { q: 'Why does it use base64url decoding instead of atob() directly?', a: 'JWTs use base64url encoding, which replaces the standard base64 characters + and / with - and _ and omits trailing = padding so the token is URL-safe. Calling atob() on a raw JWT segment without first reversing those substitutions and re-adding padding produces garbage or throws. base64UrlDecode() handles both steps before delegating to atob().' },
      { q: 'What happens if I paste something that is not a JWT?', a: 'If the pasted text doesn\'t split into exactly three dot-separated segments, the badge reports it as malformed immediately. If it has three segments but one doesn\'t decode to valid base64url JSON, that specific panel reports a decode/parse failure while the other panel (if valid) still renders normally.' },
      { q: 'How is token expiry detected?', a: 'The tool reads the payload\'s exp claim, a Unix timestamp in seconds per RFC 7519, and compares it against Math.floor(Date.now() / 1000). If exp is in the past, the status badge switches to an amber "Expired" state.' },
      { q: 'Can unicode characters in claims (like non-Latin names) break the decoder?', a: 'No — the decoder runs the base64url-decoded binary string through a Uint8Array and TextDecoder(\'utf-8\') rather than trusting atob()\'s raw output directly, which is what makes multi-byte UTF-8 sequences in claim values render correctly instead of as mojibake.' },
      { q: 'Is any part of the token sent to a server?', a: 'No. Everything happens with browser built-ins (atob, TextDecoder, JSON.parse) directly in the page — nothing is transmitted anywhere, which is exactly why it\'s safe to paste production tokens into it for debugging.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JavaScript into an AI assistant like Claude and ask it to walk through exactly why base64url decoding needs the character substitution and re-padding steps before atob() will accept the string — it's a detail that trips up a lot of hand-rolled JWT tooling. It's also a good starting point to extend: ask for HS256 signature verification using the Web Crypto SubtleCrypto API when a shared secret is supplied, support for the nbf (not-before) claim alongside exp, or a compact "copy as curl Authorization header" button.`,
      prompt: `Build a client-side JWT (JSON Web Token) decoder in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- A textarea where a user pastes a three-segment dot-separated JWT (header.payload.signature), decoding live on every input event.
- Implement real base64url decoding (RFC 4648 section 5: - and _ instead of + and /, no padding) built on the browser's atob(), including correct re-padding, and decode the resulting bytes through TextDecoder('utf-8') so unicode claim values render correctly rather than through atob()'s output directly.
- Parse the decoded header and payload segments as JSON independently, in separate try/catch blocks, so a failure in one segment doesn't prevent the other valid segment from displaying.
- Render the header and payload as pretty-printed JSON in separate panels, and show the raw signature segment in a third panel with a clear note that the tool does not and cannot verify the signature without the signing key.
- Show a status badge that reads a decoded-OK state, an amber "Expired" state when the payload's exp claim (a Unix timestamp in seconds) is earlier than the current time, or an invalid/malformed state when the token doesn't have exactly three segments or fails to decode.
- Never make a network request — everything must run entirely in the browser using only built-in APIs.`,
    },
  },
};

export default jwtDecoder;
