const userAgentParser = {
  id: 'user-agent-parser',
  title: 'User-Agent String Parser',
  category: 'dev',
  html: `<div class="wrap">
  <h2>User-Agent Parser</h2>
  <p class="sub">Paste a User-Agent header to break it into browser, engine, OS, and device.</p>

  <textarea id="ua-input" spellcheck="false">Mozilla/5.0 (iPhone; CPU iPhone OS 17_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Mobile/15E148 Safari/604.1</textarea>

  <div class="use-mine">
    <button id="use-current">Use my browser's UA</button>
  </div>

  <div class="result-grid" id="result-grid"></div>

  <div class="tokens-label">Detected tokens</div>
  <div class="tokens" id="tokens"></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; padding: 28px 20px; }

.wrap { max-width: 700px; margin: 0 auto; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; }
h2 { font-size: 18px; font-weight: 800; color: #1e293b; }
.sub { font-size: 12.5px; color: #94a3b8; margin: 4px 0 14px; }

#ua-input {
  width: 100%; min-height: 70px; resize: vertical; padding: 11px 13px;
  border: 1.5px solid #e2e8f0; border-radius: 9px; font-family: "SF Mono", Consolas, monospace;
  font-size: 12.5px; color: #1e293b; line-height: 1.6;
}
#ua-input:focus { outline: none; border-color: #6366f1; }

.use-mine { margin: 10px 0 18px; }
#use-current { font-size: 11.5px; font-weight: 700; color: #4f46e5; background: #eef2ff; border: 1px solid #c7d2fe; padding: 6px 12px; border-radius: 7px; cursor: pointer; }
#use-current:hover { background: #e0e7ff; }

.result-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-bottom: 20px; }
.result-card { background: #f8fafc; border: 1px solid #eef2f7; border-radius: 10px; padding: 12px 14px; }
.result-card .label { font-size: 10.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 4px; }
.result-card .value { font-size: 14px; font-weight: 700; color: #1e293b; }
.result-card .sub-value { font-size: 11.5px; color: #6366f1; font-weight: 600; margin-top: 2px; }

.tokens-label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 8px; }
.tokens { display: flex; flex-wrap: wrap; gap: 6px; }
.token-chip { font-size: 11px; font-family: "SF Mono", Consolas, monospace; padding: 4px 8px; border-radius: 6px; background: #1e293b; color: #a5b4fc; }`,
  js: `const uaInput = document.getElementById('ua-input');
const resultGrid = document.getElementById('result-grid');
const tokensEl = document.getElementById('tokens');
const useCurrentBtn = document.getElementById('use-current');

function detectBrowser(ua) {
  let m;
  if ((m = ua.match(/Edg\\/([\\d.]+)/))) return { name: 'Microsoft Edge', version: m[1] };
  if ((m = ua.match(/OPR\\/([\\d.]+)/))) return { name: 'Opera', version: m[1] };
  if ((m = ua.match(/SamsungBrowser\\/([\\d.]+)/))) return { name: 'Samsung Internet', version: m[1] };
  if ((m = ua.match(/CriOS\\/([\\d.]+)/))) return { name: 'Chrome (iOS)', version: m[1] };
  if ((m = ua.match(/FxiOS\\/([\\d.]+)/))) return { name: 'Firefox (iOS)', version: m[1] };
  if ((m = ua.match(/Firefox\\/([\\d.]+)/))) return { name: 'Firefox', version: m[1] };
  if ((m = ua.match(/Chrome\\/([\\d.]+)/)) && !ua.includes('Chromium')) return { name: 'Chrome', version: m[1] };
  if ((m = ua.match(/Version\\/([\\d.]+).*Safari/))) return { name: 'Safari', version: m[1] };
  if ((m = ua.match(/MSIE ([\\d.]+)/)) || (m = ua.match(/rv:([\\d.]+)\\) like Gecko/))) return { name: 'Internet Explorer', version: m[1] };
  return { name: 'Unknown', version: '' };
}

function detectEngine(ua) {
  if (ua.includes('Gecko/') || (/Firefox\\//.test(ua))) return 'Gecko';
  if (ua.includes('AppleWebKit')) {
    if (ua.includes('Chrome/') || ua.includes('Chromium/') || ua.includes('Edg/') || ua.includes('OPR/')) return 'Blink';
    return 'WebKit';
  }
  if (ua.includes('Trident')) return 'Trident';
  return 'Unknown';
}

function detectOS(ua) {
  let m;
  if ((m = ua.match(/Windows NT ([\\d.]+)/))) {
    const map = { '10.0': '10 / 11', '6.3': '8.1', '6.2': '8', '6.1': '7' };
    return { name: 'Windows', version: map[m[1]] || m[1] };
  }
  if ((m = ua.match(/iPhone OS ([\\d_]+)/)) || (m = ua.match(/CPU OS ([\\d_]+)/))) return { name: 'iOS', version: m[1].replace(/_/g, '.') };
  if ((m = ua.match(/Mac OS X ([\\d_]+)/))) return { name: 'macOS', version: m[1].replace(/_/g, '.') };
  if ((m = ua.match(/Android ([\\d.]+)/))) return { name: 'Android', version: m[1] };
  if (ua.includes('Linux')) return { name: 'Linux', version: '' };
  return { name: 'Unknown', version: '' };
}

function detectDevice(ua) {
  if (/iPad/.test(ua)) return 'Tablet (iPad)';
  if (/iPhone/.test(ua)) return 'Mobile (iPhone)';
  if (/Android/.test(ua) && /Mobile/.test(ua)) return 'Mobile (Android)';
  if (/Android/.test(ua)) return 'Tablet (Android)';
  if (/Tablet|PlayBook/.test(ua)) return 'Tablet';
  if (/Mobile/.test(ua)) return 'Mobile';
  return 'Desktop';
}

function extractTokens(ua) {
  const regex = /([A-Za-z][A-Za-z0-9._-]*)\\/([\\d][\\d.]*)/g;
  const tokens = [];
  let m;
  while ((m = regex.exec(ua)) !== null) {
    tokens.push(m[1] + '/' + m[2]);
  }
  return tokens;
}

function card(label, value, sub) {
  return '<div class="result-card"><div class="label">' + label + '</div><div class="value">' + value + '</div>' +
    (sub ? '<div class="sub-value">' + sub + '</div>' : '') + '</div>';
}

function parse() {
  const ua = uaInput.value.trim();
  if (!ua) {
    resultGrid.innerHTML = '';
    tokensEl.innerHTML = '';
    return;
  }
  const browser = detectBrowser(ua);
  const engine = detectEngine(ua);
  const os = detectOS(ua);
  const device = detectDevice(ua);

  resultGrid.innerHTML =
    card('Browser', browser.name, browser.version ? 'v' + browser.version : '') +
    card('Rendering Engine', engine, '') +
    card('Operating System', os.name, os.version) +
    card('Device Type', device, '');

  const tokens = extractTokens(ua);
  tokensEl.innerHTML = tokens.length
    ? tokens.map(t => '<span class="token-chip">' + t + '</span>').join('')
    : '<span class="token-chip">No product/version tokens found</span>';
}

uaInput.addEventListener('input', parse);
useCurrentBtn.addEventListener('click', () => {
  uaInput.value = navigator.userAgent;
  parse();
});

parse();`,

  seo: {
    title: 'User-Agent String Parser — Browser, OS & Device Detector',
    description: 'Parse any User-Agent header into browser name and version, rendering engine, operating system, and device type using real regex pattern matching. Exports to React, Vue & Tailwind.',
    about: {
      title: 'User-Agent Parser — Detect Browser, Rendering Engine, OS & Device from a UA String',
      description: `A User-Agent header is a dense, historically accreted string that packs browser identity, rendering engine, operating system, and device hints into one line — and it is famously unreliable because nearly every browser lies about being several other browsers at once for compatibility reasons. This snippet parses that string using the same kind of ordered regex pattern-matching real user-agent detection libraries use, breaking it into browser, engine, OS, and device type, plus every individual product/version token found.

**Why browser detection has to check in a specific order**

\`detectBrowser()\` runs a sequence of regex checks in a very deliberate order, because most browsers include misleading substrings inherited from Safari and Chrome compatibility. A real Chrome UA contains \`Safari/537.36\`; a real Edge UA contains both \`Chrome/\` and \`Safari/\`; an Opera UA also contains \`Chrome/\`. Checking for \`Edg/\` before \`Chrome/\`, and \`Chrome/\` before \`Safari/\`, is what makes the detection correct — reversing that order would misidentify Edge and Opera as plain Chrome. The final catch for Safari is \`Version\\/([\\d.]+).*Safari\`, deliberately using the \`Version/\` token rather than the \`Safari/\` build number, since Safari's actual user-facing version number lives in \`Version/\`, not in the WebKit-derived \`Safari/\` number that other browsers also carry.

**Distinguishing the rendering engine from the browser brand**

\`detectEngine()\` is intentionally separate from browser detection because engine and brand do not map one-to-one: Edge, Opera, and Chrome are all different brands running the same Blink engine, distinguishable from Safari's WebKit only by checking for \`Chrome/\`, \`Chromium/\`, \`Edg/\`, or \`OPR/\` tokens alongside \`AppleWebKit\`. This separation mirrors how real compatibility decisions get made in practice — a rendering bug is usually an engine-level issue affecting every Blink-based browser identically, not a Chrome-specific one.

**Operating system version formatting**

Apple's own UA convention encodes OS version numbers with underscores instead of dots (\`iPhone OS 17_4\`), a historical artifact of early UA string generation. \`detectOS()\` matches that pattern and replaces underscores with dots via \`.replace(/_/g, '.')\` before display, so "17_4" reads as the expected "17.4". Windows versions are translated through a small lookup table, since Windows NT kernel version numbers (like \`10.0\`) do not match their marketing names — \`Windows NT 10.0\` covers both Windows 10 and Windows 11, which the UA string genuinely cannot distinguish between.

**Device type from Mobile and tablet-specific hints**

\`detectDevice()\` checks for \`iPad\`, \`iPhone\`, and Android's own combination of an \`Android\` token with or without a separate \`Mobile\` token — Android's convention is that phone UAs include the word \`Mobile\` while tablet UAs omit it, a subtle distinction that a naive "if it says Android, it's a phone" check would get wrong.

**Extracting every product/version token generically**

Beyond the specific browser/OS/device detection, \`extractTokens()\` runs a general regex, \`/([A-Za-z][A-Za-z0-9._-]*)\\/([\\d][\\d.]*)/g\`, matching the standard User-Agent grammar of "Product/Version" pairs, and lists every one found as a chip. This surfaces tokens the targeted detectors above do not specifically name — build identifiers, embedded WebView versions, or app-specific tokens some UAs append — useful when debugging a UA string that does not match any of the well-known patterns cleanly.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste a User-Agent string', text: 'Copy one from a network request header, a server log, or an analytics tool, and paste it into the textarea — it parses live.' },
        { title: 'Or use your own browser\'s UA', text: 'Click "Use my browser\'s UA" to instantly load and parse the User-Agent header your current browser is actually sending.' },
        { title: 'Read the summary cards', text: 'Browser name and version, rendering engine, operating system and version, and device type are shown as four separate cards.' },
        { title: 'Check the detected tokens row', text: 'Every Product/Version pair found in the raw string is listed as a chip, useful for spotting unusual or app-specific tokens.' },
        { title: 'Compare against a known-bad UA', text: 'Paste a User-Agent from a bug report to quickly confirm which real browser, OS, and device combination it actually represents.' },
        { title: 'Export in your format', text: 'Click HTML for a standalone file, JSX for a React component, or Tailwind for a React + Tailwind version.' },
      ],
    },
    features: [
      'Ordered regex detection that correctly distinguishes Edge, Opera, and Samsung Internet from plain Chrome',
      'Separates rendering engine (Blink, WebKit, Gecko, Trident) from browser brand identification',
      'Converts Apple\'s underscore-separated OS version format (17_4) to standard dotted notation',
      'Windows NT kernel version lookup table maps 10.0 to the 10 / 11 marketing name range',
      'Device type detection distinguishes phone vs tablet using Android\'s Mobile token convention',
      'Generic Product/Version token extractor surfaces every identifiable token in the raw string',
      '"Use my browser\'s UA" button loads navigator.userAgent from the live browser instantly',
      'Entirely client-side regex parsing — no external UA database or network lookup required',
    ],
    useCases: [
      { icon: 'CODE', title: 'Debugging a browser-specific bug report', desc: 'Paste the exact User-Agent string from a bug report or support ticket to quickly confirm the real browser, version, OS, and device type involved.' },
      { icon: 'DASH', title: 'Reviewing server or analytics logs', desc: 'Decode a raw UA string captured in an access log or analytics event when the platform\'s own dashboard only shows the unparsed raw value.' },
      { icon: 'LEARN', title: 'Teaching why UA sniffing is unreliable', desc: 'Show how many browsers include misleading tokens like Safari or Chrome for compatibility, and why feature detection is generally preferred over UA string matching in production code.' },
      { icon: 'APP', title: 'QA and cross-browser testing', desc: 'Confirm that a test device or emulator is actually sending the UA string you expect before trusting its test results as representative.' },
      { icon: 'FLOW', title: 'Building your own lightweight UA detection', desc: 'Use the ordered regex approach here as a reference pattern for a minimal in-app detector without pulling in a large third-party UA-parsing library.' },
      { icon: 'CODE', title: 'Related: JWT Decoder & Inspector', desc: 'See the [JWT Decoder & Inspector](/ui-snippets/jwt-decoder/) for a related client-side header-inspection tool worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the order of regex checks matter for browser detection?', a: 'Many browsers include misleading substrings for compatibility reasons — Edge and Opera both contain Chrome/, and Chrome itself contains Safari/. Checking more specific tokens like Edg/ or OPR/ before the generic Chrome/ or Safari/ checks is what prevents misidentifying one browser as another.' },
      { q: 'Is this as accurate as a full commercial UA-parsing database?', a: 'No. It covers the most common desktop and mobile browsers, engines, and operating systems using pattern matching, but User-Agent strings are inherently unreliable and can be spoofed or customized by any client, so no parser (commercial or otherwise) can guarantee perfect accuracy.' },
      { q: 'Why does it convert 17_4 to 17.4 for iOS and macOS?', a: 'Apple\'s User-Agent generator historically encodes OS version numbers with underscores instead of dots (an old URL-safety convention). The parser reverses that with a simple underscore-to-dot replacement so the version reads in the familiar dotted format.' },
      { q: 'Can it tell Windows 10 from Windows 11?', a: 'No, and neither can any other UA parser — both report the identical Windows NT 10.0 kernel version in their User-Agent string. The tool labels this case "10 / 11" rather than guessing incorrectly at one or the other.' },
      { q: 'What are the token chips at the bottom showing?', a: 'A generic regex extracts every Product/Version pair from the raw string (the standard User-Agent grammar), listing tokens the targeted browser/OS/device detectors above do not specifically name — useful for spotting embedded WebViews, app identifiers, or unusual build tags.' },
      { q: 'Does this send the UA string anywhere for lookup?', a: 'No. All parsing happens with local regular expressions in the browser; there is no external database call or network request, so it is safe to paste UA strings containing no sensitive data from internal logs.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JavaScript into an AI assistant like Claude and ask it to explain exactly why the browser-detection regex checks must run in a specific order, using the Edge-contains-Chrome-contains-Safari nesting as the concrete example — it is one of the most common bugs in hand-rolled UA parsers. It is also a good base to extend: ask for support for additional browsers like Vivaldi or Brave, a bot/crawler detection mode that flags strings containing tokens like Googlebot or bingbot, or a side-by-side comparison mode for two pasted UA strings.`,
      prompt: `Build a User-Agent string parser in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- A textarea where a user pastes a raw User-Agent header string, parsing live on every input event, plus a button that loads navigator.userAgent from the current browser as a quick example.
- Detect the browser name and version using an ordered sequence of regular expression checks that correctly distinguishes browsers whose UA strings contain misleading substrings from other browsers (e.g. Edge and Opera both include a Chrome/ token; Chrome itself includes a Safari/ token) — more specific tokens must be checked before more generic ones.
- Separately detect the rendering engine (Blink, WebKit, Gecko, or Trident) using its own distinct logic from the browser-brand detection, since multiple browser brands can share the same engine.
- Detect the operating system and its version, converting Apple's underscore-separated version format (like 17_4) to standard dotted notation (17.4), and mapping the Windows NT kernel version number to a readable Windows version range.
- Detect device type (desktop, mobile, or tablet), correctly distinguishing Android phones from Android tablets using the presence or absence of a Mobile token, and detecting iPad and iPhone separately.
- Below the parsed summary, extract and list every generic Product/Version token found in the string using a general-purpose regex, to surface tokens not covered by the specific detectors.
- Do not make any network request — parsing must rely entirely on local pattern matching.`,
    },
  },
};

export default userAgentParser;
