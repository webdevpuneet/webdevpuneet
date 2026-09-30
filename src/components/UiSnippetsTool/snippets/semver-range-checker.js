const semverRangeChecker = {
  id: 'semver-range-checker',
  title: 'Semver Range Checker',
  category: 'dev',
  html: `<div class="wrap">
  <h2>Semver Range Checker</h2>
  <p class="sub">Checks whether a version satisfies an npm-style semver range — caret, tilde, comparators and OR sets.</p>

  <div class="row">
    <div class="field">
      <label>Version</label>
      <input type="text" id="version-input" value="2.4.1" spellcheck="false" />
    </div>
    <div class="field">
      <label>Range</label>
      <input type="text" id="range-input" value="^2.1.0" spellcheck="false" />
    </div>
  </div>

  <div class="result" id="result"></div>

  <div class="examples">
    <span class="ex-label">Try:</span>
    <button class="ex" data-v="2.4.1" data-r="^2.1.0">^2.1.0</button>
    <button class="ex" data-v="3.0.0" data-r="^2.1.0">^2.1.0 vs 3.0.0</button>
    <button class="ex" data-v="1.4.9" data-r="~1.4.2">~1.4.2</button>
    <button class="ex" data-v="1.5.0" data-r=">=1.2.0 <2.0.0">range AND</button>
    <button class="ex" data-v="2.5.0" data-r="1.x || 2.x">1.x || 2.x</button>
    <button class="ex" data-v="1.0.0-beta.1" data-r=">=1.0.0-alpha">prerelease</button>
  </div>

  <div class="compare">
    <h3>Compare two versions</h3>
    <div class="row">
      <input type="text" id="cmp-a" value="1.9.0" spellcheck="false" />
      <span class="vs">vs</span>
      <input type="text" id="cmp-b" value="1.10.0" spellcheck="false" />
    </div>
    <div class="cmp-result" id="cmp-result"></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; min-height: 100vh; padding: 28px 20px; color: #e2e8f0; }

.wrap { max-width: 640px; margin: 0 auto; }
h2 { font-size: 18px; font-weight: 800; margin-bottom: 4px; }
.sub { font-size: 12.5px; color: #94a3b8; margin-bottom: 18px; line-height: 1.5; }

.row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; align-items: center; }
.field label { display: block; font-size: 11px; font-weight: 700; color: #94a3b8; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.03em; }

input[type="text"] {
  width: 100%; padding: 10px 12px; background: #1e293b; border: 1.5px solid #334155; border-radius: 8px;
  color: #a5b4fc; font-family: "SF Mono", Consolas, monospace; font-size: 13px;
}
input[type="text"]:focus { outline: none; border-color: #6366f1; }

.result {
  margin-top: 16px; padding: 14px 16px; border-radius: 10px; font-size: 14px; font-weight: 700;
  background: #1e293b; border: 1px solid #334155; color: #cbd5e1;
}
.result.pass { background: rgba(34,197,94,0.12); border-color: rgba(34,197,94,0.35); color: #4ade80; }
.result.fail { background: rgba(239,68,68,0.12); border-color: rgba(239,68,68,0.35); color: #f87171; }
.result .detail { display: block; font-size: 11.5px; font-weight: 400; color: #94a3b8; margin-top: 6px; font-family: "SF Mono", Consolas, monospace; }

.examples { margin-top: 16px; display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
.ex-label { font-size: 11px; color: #64748b; font-weight: 700; margin-right: 2px; }
.ex { background: #1e293b; border: 1px solid #334155; color: #93c5fd; font-size: 11px; font-family: "SF Mono", Consolas, monospace; padding: 5px 9px; border-radius: 6px; cursor: pointer; }
.ex:hover { background: #334155; }

.compare { margin-top: 26px; padding-top: 18px; border-top: 1px solid #1e293b; }
.compare h3 { font-size: 13px; font-weight: 800; margin-bottom: 10px; color: #cbd5e1; }
.compare .row { grid-template-columns: 1fr auto 1fr; }
.vs { font-size: 11px; color: #64748b; font-weight: 700; }
.cmp-result { margin-top: 10px; font-size: 13px; font-weight: 700; color: #a5b4fc; font-family: "SF Mono", Consolas, monospace; }`,
  js: `function parseVersion(str) {
  const s = String(str).trim().replace(/^v/i, '');
  const match = /^(\\d+)\\.(\\d+)\\.(\\d+)(?:-([0-9A-Za-z.-]+))?(?:\\+([0-9A-Za-z.-]+))?$/.exec(s);
  if (!match) return null;
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease: match[4] ? match[4].split('.') : [],
    raw: s,
  };
}

function comparePrerelease(a, b) {
  if (a.length === 0 && b.length === 0) return 0;
  if (a.length === 0) return 1;
  if (b.length === 0) return -1;
  const len = Math.max(a.length, b.length);
  for (let i = 0; i < len; i++) {
    if (a[i] === undefined) return -1;
    if (b[i] === undefined) return 1;
    const an = /^\\d+$/.test(a[i]);
    const bn = /^\\d+$/.test(b[i]);
    if (an && bn) {
      const diff = Number(a[i]) - Number(b[i]);
      if (diff !== 0) return diff < 0 ? -1 : 1;
    } else {
      if (a[i] === b[i]) continue;
      return a[i] < b[i] ? -1 : 1;
    }
  }
  return 0;
}

function compareVersions(v1, v2) {
  if (v1.major !== v2.major) return v1.major - v2.major;
  if (v1.minor !== v2.minor) return v1.minor - v2.minor;
  if (v1.patch !== v2.patch) return v1.patch - v2.patch;
  return comparePrerelease(v1.prerelease, v2.prerelease);
}

function parseComparator(token) {
  const m = /^(>=|<=|>|<|=)?\\s*v?(\\d+|\\*|x|X)(?:\\.(\\d+|\\*|x|X))?(?:\\.(\\d+|\\*|x|X))?(?:-([0-9A-Za-z.-]+))?$/.exec(token.trim());
  if (!m) return null;
  const op = m[1] || '=';
  const wildcard = (v) => v === undefined || v === '*' || /^x$/i.test(v);
  const majorW = wildcard(m[2]);
  const minorW = wildcard(m[3]);
  const patchW = wildcard(m[4]);
  return {
    op,
    major: majorW ? null : Number(m[2]),
    minor: minorW ? null : Number(m[3]),
    patch: patchW ? null : Number(m[4]),
    prerelease: m[5] ? m[5].split('.') : [],
    isWildcard: majorW,
  };
}

function expandCaretTilde(token) {
  const t = token.trim();
  const bare = t.replace(/^[\\^~]/, '');
  const parsed = parseComparator(bare);
  if (!parsed || parsed.major === null) return null;

  const major = parsed.major;
  const minor = parsed.minor === null ? 0 : parsed.minor;
  const patch = parsed.patch === null ? 0 : parsed.patch;

  if (t[0] === '~') {
    const upperMinor = parsed.minor === null ? major + 1 : minor + 1;
    const lower = major + '.' + minor + '.' + patch;
    const upper = parsed.minor === null ? (major + 1) + '.0.0' : major + '.' + upperMinor + '.0';
    return '>=' + lower + ' <' + upper;
  }

  if (t[0] === '^') {
    let upper;
    if (major > 0) upper = (major + 1) + '.0.0';
    else if (minor > 0) upper = major + '.' + (minor + 1) + '.0';
    else upper = major + '.' + minor + '.' + (patch + 1);
    const lower = major + '.' + minor + '.' + patch;
    return '>=' + lower + ' <' + upper;
  }

  return null;
}

function matchesComparator(version, comparator) {
  if (comparator.isWildcard) return true;
  const bound = {
    major: comparator.major,
    minor: comparator.minor === null ? 0 : comparator.minor,
    patch: comparator.patch === null ? 0 : comparator.patch,
    prerelease: comparator.prerelease,
  };
  if (comparator.minor === null && comparator.patch === null && (comparator.op === '=' )) {
    return version.major === comparator.major;
  }
  if (comparator.patch === null && comparator.op === '=') {
    return version.major === comparator.major && version.minor === bound.minor;
  }
  const cmp = compareVersions(version, bound);
  switch (comparator.op) {
    case '>=': return cmp >= 0;
    case '<=': return cmp <= 0;
    case '>': return cmp > 0;
    case '<': return cmp < 0;
    default: return cmp === 0;
  }
}

function satisfies(versionStr, rangeStr) {
  const version = parseVersion(versionStr);
  if (!version) return { ok: false, reason: 'Invalid version string' };

  const orSets = rangeStr.split('||').map((s) => s.trim()).filter(Boolean);
  if (orSets.length === 0) return { ok: false, reason: 'Empty range' };

  for (const orSet of orSets) {
    const rawTokens = orSet.split(/\\s+/).filter(Boolean);
    const expandedTokens = rawTokens.map((tok) => {
      if (tok[0] === '^' || tok[0] === '~') return expandCaretTilde(tok);
      return tok;
    });
    const flatTokens = [];
    expandedTokens.forEach((tok) => {
      if (!tok) { flatTokens.push(null); return; }
      tok.split(/\\s+/).forEach((t) => flatTokens.push(t));
    });
    if (flatTokens.some((t) => t === null)) continue;

    const comparators = flatTokens.map(parseComparator);
    if (comparators.some((c) => !c)) continue;

    const allMatch = comparators.every((c) => matchesComparator(version, c));
    if (allMatch) return { ok: true, reason: 'Matched "' + orSet + '"' };
  }
  return { ok: false, reason: 'No comparator set in the range matched' };
}

const versionInput = document.getElementById('version-input');
const rangeInput = document.getElementById('range-input');
const resultBox = document.getElementById('result');
const cmpA = document.getElementById('cmp-a');
const cmpB = document.getElementById('cmp-b');
const cmpResult = document.getElementById('cmp-result');

function renderRange() {
  const v = versionInput.value.trim();
  const r = rangeInput.value.trim();
  const parsedV = parseVersion(v);
  if (!parsedV) {
    resultBox.className = 'result fail';
    resultBox.innerHTML = 'Invalid version <span class="detail">"' + v + '" is not valid semver (expected major.minor.patch)</span>';
    return;
  }
  const res = satisfies(v, r);
  resultBox.className = 'result ' + (res.ok ? 'pass' : 'fail');
  resultBox.innerHTML = (res.ok ? v + ' satisfies ' + r : v + ' does NOT satisfy ' + r) + '<span class="detail">' + res.reason + '</span>';
}

function renderCompare() {
  const a = parseVersion(cmpA.value.trim());
  const b = parseVersion(cmpB.value.trim());
  if (!a || !b) {
    cmpResult.textContent = 'Enter two valid semver versions';
    return;
  }
  const cmp = compareVersions(a, b);
  const symbol = cmp < 0 ? '<' : cmp > 0 ? '>' : '=';
  cmpResult.textContent = a.raw + ' ' + symbol + ' ' + b.raw;
}

versionInput.addEventListener('input', renderRange);
rangeInput.addEventListener('input', renderRange);
cmpA.addEventListener('input', renderCompare);
cmpB.addEventListener('input', renderCompare);

document.querySelectorAll('.ex').forEach((btn) => {
  btn.addEventListener('click', () => {
    versionInput.value = btn.getAttribute('data-v');
    rangeInput.value = btn.getAttribute('data-r');
    renderRange();
  });
});

renderRange();
renderCompare();`,

  seo: {
    title: 'Semver Range Checker — Free HTML CSS JS Snippet',
    description: 'Check whether a version satisfies a semver range with real caret, tilde, comparator and OR-set logic, plus a standalone version comparator. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Semver Range Checker — Caret, Tilde & Comparator Range Matching, Explained',
      description: `Package managers like npm decide which version to install based on a range expression in \`package.json\` — \`^2.1.0\`, \`~1.4.2\`, \`>=1.2.0 <2.0.0\`, \`1.x || 2.x\` — and the exact meaning of each syntax is a frequent source of "why did it install that version" confusion. This snippet implements the real semantic versioning comparison and range-matching rules from scratch in vanilla JavaScript, following the same logic node-semver uses.

**Parsing a version into comparable parts**

\`parseVersion()\` matches a string against the semver grammar — \`major.minor.patch\` with an optional \`-prerelease\` suffix and an optional \`+build\` metadata suffix — and returns the three numeric components plus the prerelease identifiers split on \`.\`. Build metadata is deliberately parsed but discarded from comparison entirely, exactly as the semver spec requires: two versions differing only in build metadata are considered equal.

**Comparing prerelease identifiers correctly, not just alphabetically**

The semver spec's prerelease comparison rule is subtle: identifiers consisting only of digits are compared numerically, while any other identifier is compared as a string, and a version with prerelease identifiers always sorts *before* the same version without any (\`1.0.0-beta\` is less than \`1.0.0\`). \`comparePrerelease()\` implements exactly this — checking each dot-separated identifier with \`/^\\d+$/\` to decide whether to compare it as a number or a string, and treating a shorter identifier list as lower precedence per the spec.

**Expanding caret and tilde ranges into explicit bounds**

Rather than special-casing \`^\` and \`~\` throughout the matching logic, \`expandCaretTilde()\` converts each into an equivalent explicit \`>=lower <upper\` comparator pair up front. Tilde (\`~1.4.2\`) allows patch-level changes only, expanding to \`>=1.4.2 <1.5.0\`. Caret (\`^2.1.0\`) allows changes that do not modify the leftmost non-zero digit — for a version with a nonzero major it expands to \`>=2.1.0 <3.0.0\`, but for a zero-major version like \`^0.2.3\` it correctly narrows to \`>=0.2.3 <0.3.0\`, matching npm's "0.x is not yet stable, treat minor bumps as breaking" convention that trips up most hand-rolled semver implementations.

**Wildcards, comparator sets, and OR unions**

A bare \`1.x\` or \`2.*\` is parsed as a wildcard comparator matching any minor/patch within that major. Space-separated comparators within one range segment are ANDed together (all must match, as in \`>=1.2.0 <2.0.0\`), while segments separated by \`||\` are ORed (any one segment matching is enough), matching npm's exact range grammar. \`satisfies()\` splits on \`||\` first, then evaluates each space-separated comparator set independently until one fully matches.

**A standalone comparator for direct version-to-version ordering**

Below the range checker, a second tool compares two raw versions directly using the same \`compareVersions()\` function, useful for answering "is 1.9.0 actually less than 1.10.0" — a classic string-comparison trap, since \`"1.9.0" < "1.10.0"\` is false when compared as plain strings but true under real numeric semver ordering.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Enter a version and a range', text: 'Type any valid semver version and any npm-style range expression — the result updates live.' },
        { title: 'Read the pass/fail result', text: 'A green result means the version satisfies the range; red means it does not, with a short explanation underneath.' },
        { title: 'Try the example chips', text: 'Click any example to load a preset version/range pair, including caret, tilde, AND ranges, OR ranges, and prerelease comparisons.' },
        { title: 'Use the version comparator', text: 'Enter two versions directly in the lower section to see their strict ordering (<, >, or =) without needing a range at all.' },
        { title: 'Test edge cases', text: 'Try a zero-major version like ^0.2.3 versus ^2.1.0 to see how caret ranges narrow for pre-1.0 packages.' },
      ],
    },
    features: [
      'Full semver grammar parsing: major.minor.patch, prerelease identifiers, and build metadata',
      'Spec-correct prerelease precedence comparison (numeric vs string identifiers, shorter list sorts higher)',
      'Caret (^) and tilde (~) ranges expanded into explicit bounds, including the zero-major special case',
      'Wildcard support (1.x, 2.*) and bare comparator operators (>=, <=, >, <, =)',
      'Space-separated AND comparator sets and "||" OR unions, matching real npm range syntax',
      'Standalone two-version comparator demonstrating correct numeric ordering (1.9.0 < 1.10.0)',
      'Six built-in example chips covering common and tricky range patterns',
      'Live evaluation on every keystroke, no submit button required',
      'Zero dependencies — a complete semver implementation in vanilla JavaScript',
    ],
    useCases: [
      { icon: 'CODE', title: 'Debugging a package.json dependency range', desc: 'Check exactly why npm did or did not resolve a particular version against a range like ^2.1.0 before digging through npm\'s own resolution logs.' },
      { icon: 'LEARN', title: 'Teaching semantic versioning rules', desc: 'Demonstrate the difference between caret and tilde ranges, or why prerelease versions sort before their release version, with instant visual feedback.' },
      { icon: 'FLOW', title: 'Writing a peerDependencies or engines range', desc: 'Test a proposed range expression against several real installed versions before publishing a package to make sure it matches what you intend.' },
      { icon: 'APP', title: 'CI/CD version gate logic', desc: 'Prototype the comparator logic for a deploy script that only proceeds if a build tool or runtime version satisfies a minimum supported range.' },
      { icon: 'DASH', title: 'Internal developer tooling', desc: 'Pair with the [number-base converter](/ui-snippets/number-base-converter/) or [regex tester](/ui-snippets/regex-tester/) in an internal dev-tools reference dashboard.' },
    ],
    faqs: [
      { q: 'Does this match how npm actually resolves semver ranges?', a: 'Yes, it implements the same core rules node-semver uses: caret and tilde expansion, wildcard matching, AND within a comparator set, OR across "||"-separated sets, and spec-correct prerelease precedence. It covers the common range syntax you will find in a real package.json, though it does not implement every obscure edge case of the full node-semver grammar.' },
      { q: 'Why does ^0.2.3 behave differently from ^2.1.0?', a: 'Semver treats a zero major version as not yet stable, so caret ranges are intentionally stricter below 1.0.0: ^0.2.3 only allows patch-level changes (>=0.2.3 <0.3.0), while ^2.1.0 allows any change that keeps the major version at 2 (>=2.1.0 <3.0.0). This mirrors npm\'s actual caret behavior exactly.' },
      { q: 'Why is 1.9.0 less than 1.10.0 even though "9" is a bigger character than "1"?', a: 'Semver compares each of major, minor, and patch as a numeric value, not as a string. 9 < 10 numerically, even though the string "1.9.0" would sort after "1.10.0" under plain lexicographic string comparison — this exact trap is why the standalone comparator tool exists.' },
      { q: 'How are prerelease versions like 1.0.0-beta.1 compared?', a: 'Per the semver spec, a version with a prerelease suffix always has lower precedence than the same version without one. Among two prerelease versions, each dot-separated identifier is compared numerically if both sides are all-digit, and lexicographically as a string otherwise, until a difference is found.' },
      { q: 'Does it support the "1.x" and "*" wildcard syntax?', a: 'Yes. A bare major with an "x", "X", or "*" in the minor or patch position is treated as a wildcard matching any value in that position, consistent with common range syntax found in package.json files.' },
      { q: 'Can I combine multiple range types together?', a: 'Yes. Space-separated comparators within one segment are ANDed (e.g. >=1.2.0 <2.0.0), and segments separated by "||" are ORed (e.g. 1.x || 2.x) — both are supported and can be combined in the same range string.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JavaScript into an AI assistant like Claude and ask it to walk through exactly why caret ranges behave differently for a zero major version, and how comparePrerelease() decides between numeric and lexicographic identifier comparison. It is also a solid base to extend: ask for hyphen range support (1.2.3 - 2.3.4), a "next compatible version" suggestion feature, or a batch mode that checks a whole list of installed package versions against their declared ranges at once.`,
      prompt: `Build a client-side semver range checker in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- Two text inputs, a version and a range expression, evaluated live on every input event to report whether the version satisfies the range.
- Implement real semantic versioning parsing: major.minor.patch, an optional -prerelease suffix with dot-separated identifiers, and an optional +build metadata suffix that is parsed but excluded from all comparisons.
- Implement spec-correct version comparison: major, minor, and patch compared numerically; a version with a prerelease suffix always has lower precedence than the same version without one; prerelease identifiers compared numerically when both are all-digit, lexicographically otherwise, with a shorter identifier list ranking lower when it is a strict prefix of a longer one.
- Expand caret (^) ranges into explicit >=lower <upper bounds, correctly handling the zero-major special case (^0.2.3 should only allow patch-level bumps, not minor-level ones), and expand tilde (~) ranges into patch-level-only bounds.
- Support wildcard components (1.x, 2.*), explicit comparator operators (>=, <=, >, <, =), space-separated comparators within one range segment treated as AND, and "||"-separated segments treated as OR.
- Show a clear pass/fail result with a short explanation of which comparator set (if any) matched.
- Include several clickable example chips that load preset version/range pairs demonstrating caret, tilde, AND ranges, OR ranges, and prerelease comparisons.
- Add a separate, simpler two-version comparator section that reports strict ordering (less than, greater than, or equal) between two raw version strings using the same comparison logic.`,
    },
  },
};

export default semverRangeChecker;
