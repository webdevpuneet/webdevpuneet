const fs = require('fs');
const raw = fs.readFileSync('c:/Projects/tools/src/components/UiSnippetsTool/snippets/range-slider.js','utf8');

const seoStart = raw.lastIndexOf('seo:');
const aboutStart = raw.indexOf('about: {', seoStart);
const descStart = raw.indexOf('description:', aboutStart);
const btStart = raw.indexOf('`', descStart); // opening backtick of description

// Walk forward to find the REAL closing backtick (unescaped, followed by comma)
let i = btStart + 1;
while (i < raw.length) {
  if (raw[i] === '\\') { i += 2; continue; } // skip escaped chars (\` \n etc)
  if (raw[i] === '`') {
    // Check if this is the string-closing backtick (next non-space is ',')
    let j = i + 1;
    while (j < raw.length && (raw[j] === ' ' || raw[j] === '\n' || raw[j] === '\r')) j++;
    if (raw[j] === ',') {
      // Found it
      const desc = raw.slice(btStart + 1, i);
      console.log('Description word count:', desc.trim().split(/\s+/).length);
      console.log('Description ends with:', JSON.stringify(desc.slice(-80)));
      break;
    }
  }
  i++;
}

// The description close backtick is at position i
// Insert expansion text before it
const expansion = `

**The accent-color property**

Modern browsers support accent-color: #6366f1 on range inputs to colour the track fill and thumb with one CSS property. For browsers that do not support it, the WebKit and Mozilla pseudo-element overrides provide consistent cross-browser styling. Both approaches are included in the snippet.

**Customising the live value format**

Each slider calls a dedicated update function on oninput. Change the format string in each function to match your use case: currency with toLocaleString(), distance as Nkm, time as Nh Nm, weight as Nkg. The format function runs on every input event at the native frame rate — no debounce is needed for simple text updates because range inputs only fire while the user is dragging.

**Dual-handle range slider for price range selection**

For a min/max selector with two handles, use two overlapping range inputs. Enforce constraints in JavaScript: the lower handle cannot exceed the upper, and vice versa. A CSS gradient between the two current values fills only the selected range area, giving users clear visual feedback about the selected window.`;

const newRaw = raw.slice(0, i) + expansion + raw.slice(i);
fs.writeFileSync('c:/Projects/tools/src/components/UiSnippetsTool/snippets/range-slider.js', newRaw);

// Verify
const updated = fs.readFileSync('c:/Projects/tools/src/components/UiSnippetsTool/snippets/range-slider.js','utf8');
const uSeo = updated.slice(updated.lastIndexOf('seo:'));
const uAbout = updated.indexOf('about: {', uSeo.length ? updated.lastIndexOf('seo:') : 0);
const uDescStart = updated.indexOf('description:', uAbout);
const uBtStart = updated.indexOf('`', uDescStart);
let j = uBtStart + 1;
while (j < updated.length) {
  if (updated[j] === '\\') { j += 2; continue; }
  if (updated[j] === '`') {
    let k = j + 1;
    while (k < updated.length && (updated[k] === ' ' || updated[k] === '\n' || updated[k] === '\r')) k++;
    if (updated[k] === ',') {
      const newDesc = updated.slice(uBtStart + 1, j);
      console.log('After fix - word count:', newDesc.trim().split(/\s+/).length);
      break;
    }
  }
  j++;
}
