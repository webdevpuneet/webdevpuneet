const fs = require('fs');
const p = 'c:/Projects/tools/src/components/UiSnippetsTool/snippets/';

const additions = {
'autocomplete-input': `

**Performance with large datasets**

For datasets with hundreds of items, the inline includes() filter is fast enough — arrays under 1000 items filter in under 1ms. For thousands of items, consider a trie or sorted binary search instead of linear scan. For truly large datasets (city names, product catalogues, user directories), replace the inline filter with a debounced API call and render suggestions from the server response.`,

'code-block': `

**Extending with a filename tab**

Add a filename display between the browser dots and the language label: <span class="cb-filename">api/users.js</span>. This is standard in documentation sites where the same code block appears across multiple files. Update via JavaScript when the language tab changes: setLang() updates both the lang-label and filename spans simultaneously.`,

'expanding-fab': `

**Positioning and safe area handling**

The FAB uses position: fixed; bottom: 28px; right: 28px. On iOS Safari, the home indicator area can overlap the FAB. Use CSS environment variables: bottom: calc(28px + env(safe-area-inset-bottom)) to push the FAB above the safe area. This is important for mobile web apps that users install as PWAs on their home screen.`,

'sticky-header': `

**Preventing layout shift**

When the header transitions from absolute to fixed (or from tall to short), content can jump because the document flow changes. Prevent this by wrapping the page content in a container with padding-top equal to the header's maximum height. This reserves space for the header at all scroll positions without layout recalculation.`,

'testimonial-slider': `

**Adding pause on hover**

Improve usability by pausing auto-advance when the user hovers the slider: track.addEventListener("mouseenter", () => clearInterval(autoTimer)); track.addEventListener("mouseleave", resetAuto). This gives users time to read a testimonial they are currently viewing without the slider advancing while their cursor is on it.`,

'plan-selector': `

**Handling the :has() browser support fallback**

CSS :has() is supported in Chrome 105+, Safari 15.4+, and Firefox 121+. For older browser support, add a JavaScript fallback: document.querySelectorAll(".plan-card input").forEach(input => input.addEventListener("change", () => { document.querySelectorAll(".plan-card").forEach(c => c.classList.toggle("is-checked", c.contains(input))); })). Add .plan-card.is-checked .plan-inner styles alongside the :has() rules.`,

'split-text': `

**Combining multiple variants for a sequence**

Chain all four variants with increasing base delays for a coordinated reveal sequence: splitWords(headline, 0); splitChars(subheading, 0.6); wipeReveal(tagline, 1.0); scramble(cta, 1.4). The delays create a natural reading order — headline first, supporting text follows. Use this pattern for full-screen hero sections where each text element appears sequentially.`,
};

let fixed = 0;
Object.entries(additions).forEach(([id, add]) => {
  let raw = fs.readFileSync(p+id+'.js','utf8');
  const seoBlock = raw.slice(raw.lastIndexOf('seo:'));
  const am = seoBlock.match(/about:\s*\{[\s\S]*?description:\s*`([\s\S]*?)`\s*,\s*\n\s*\}/);
  if(!am){ console.log('SKIP '+id); return; }
  const newDesc = am[1] + add;
  raw = raw.replace(am[1], newDesc);
  fs.writeFileSync(p+id+'.js', raw);
  const wc = newDesc.trim().split(/\s+/).length;
  console.log((wc>=350?'PASS':'NEED_MORE')+' '+id+': '+wc+'w');
  fixed++;
});
console.log('Fixed:', fixed);
