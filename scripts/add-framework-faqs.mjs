// Appends a framework-export FAQ to the seo.faqs array of snippets missing one.
import fs from 'fs';
import path from 'path';

const DIR = 'src/components/UiSnippetsTool/snippets';

const FAQS = {
  'qr-code-generator': { q: 'Can I use this QR code generator in React, Vue, or Angular?', a: 'Yes. Use the export buttons on this page: JSX downloads a React component, Vue a Vue 3 SFC, Angular a standalone component, and Tailwind a utility-class version. In React, load the qrcode.js script inside useEffect and generate the code after the library resolves; in Vue use onMounted.' },
  'date-range-picker': { q: 'Can I use this date range picker in React, Vue, or Angular?', a: 'Yes. Click JSX for a React component, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a utility-class version. In React, keep startDate and endDate in useState and re-render the calendar grid from those values instead of mutating the DOM directly.' },
  'swipe-cards': { q: 'Can I use these swipe cards in React, Vue, or Angular?', a: 'Yes. The JSX, Vue, Angular, and Tailwind export buttons on this page convert the snippet automatically. In React, attach the pointerdown/pointermove handlers in a useEffect with cleanup, and track the card stack as state so removed cards trigger a re-render rather than manual DOM removal.' },
  'activity-heatmap': { q: 'Can I use this activity heatmap in React, Vue, or Angular?', a: 'Yes. Use the JSX, Vue, Angular, or Tailwind export buttons to download a converted component. In React, generate the day cells with a map() over your contribution data instead of the DOM loop, and derive each cell’s level class from the count at render time.' },
  'spin-wheel': { q: 'Can I use this spin wheel in React, Vue, or Angular?', a: 'Yes. Click JSX for React, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a utility-class build. In React, store the accumulated rotation in a ref (not state) so the CSS transition animates from the previous angle, and read the winning segment in a transitionend handler.' },
  'infinite-scroll': { q: 'Can I use this infinite scroll in React, Vue, or Angular?', a: 'Yes. The JSX, Vue, Angular, and Tailwind exports convert it automatically. In React, create the IntersectionObserver in useEffect, observe the sentinel div via a ref, and append items with setState; return observer.disconnect() as the cleanup so the observer does not leak between renders.' },
  'onboarding-tour': { q: 'Can I use this onboarding tour in React, Vue, or Angular?', a: 'Yes. Export via the JSX, Vue, Angular, or Tailwind buttons on this page. In React, keep the current step index in useState and compute the spotlight position from getBoundingClientRect inside a useLayoutEffect so the highlight measures the target after each render.' },
  'bar-chart': { q: 'Can I use this bar chart in React, Vue, or Angular?', a: 'Yes. Click JSX for a React component, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a utility-class version. In React, render the SVG bars from a map() over your data array and trigger the grow animation by toggling a class in useEffect after mount.' },
  'ai-chat-interface': { q: 'Can I use this AI chat interface in React, Vue, or Angular?', a: 'Yes. The JSX, Vue, Angular, and Tailwind export buttons convert it automatically. In React, keep the message array in useState, replace the typing simulation with your streaming API call, and scroll the container in a useEffect that runs whenever messages change.' },
  'gauge-chart': { q: 'Can I use this gauge chart in React, Vue, or Angular?', a: 'Yes. Use the JSX, Vue, Angular, or Tailwind export buttons on this page. In React, pass the gauge value as a prop and compute the needle rotation and arc dashoffset from it during render — the CSS transition animates the change automatically, no imperative animation code needed.' },
  'glassmorphism-login': { q: 'Can I use this glassmorphism login in React, Vue, or Angular?', a: 'Yes. Click JSX for React, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for utility classes — backdrop-blur, bg-white/15, and border-white/30 map directly to Tailwind. Wire the form submit to your auth API and keep input values in controlled state.' },
  'drawing-canvas': { q: 'Can I use this drawing canvas in React, Vue, or Angular?', a: 'Yes. The JSX, Vue, Angular, and Tailwind exports convert the markup automatically. In React, grab the canvas through a ref, set up the 2D context and pointer listeners in useEffect with cleanup, and keep tool, colour, and brush size in state read by the stroke handlers.' },
  'physics-balls': { q: 'Can I use these physics balls in React, Vue, or Angular?', a: 'Yes. Export with the JSX, Vue, Angular, or Tailwind buttons. In React, run the requestAnimationFrame physics loop inside useEffect and cancel it in the cleanup return; keep the ball array in a ref rather than state, since it mutates 60 times per second without needing re-renders.' },
  'split-flap-display': { q: 'Can I use this split-flap display in React, Vue, or Angular?', a: 'Yes. Click JSX for a React component, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a utility-class version. In React, drive each character cell from props and trigger the flip animation in useEffect when the target text changes.' },
  'speech-to-text': { q: 'Can I use this speech-to-text in React, Vue, or Angular?', a: 'Yes. Use the JSX, Vue, Angular, or Tailwind export buttons. In React, create the SpeechRecognition instance once in a ref, attach result handlers in useEffect, and stop recognition in the cleanup return. The Web Speech API itself works identically in any framework.' },
  'image-filter-editor': { q: 'Can I use this image filter editor in React, Vue, or Angular?', a: 'Yes. The JSX, Vue, Angular, and Tailwind exports convert it automatically. In React, keep each slider value in useState and build the CSS filter string during render; for download, draw the filtered image to a canvas inside an event handler using ctx.filter before calling toDataURL.' },
  'pattern-lock': { q: 'Can I use this pattern lock in React, Vue, or Angular?', a: 'Yes. Click JSX for React, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for utility classes. In React, attach pointer listeners in useEffect, keep the selected dot sequence in a ref during the drag, and commit it to state on pointerup to trigger validation.' },
  'radar-chart': { q: 'Can I use this radar chart in React, Vue, or Angular?', a: 'Yes. Use the JSX, Vue, Angular, or Tailwind export buttons on this page. In React, compute the polygon points from your data array with the same polar-coordinate math during render, and pass datasets as props — the SVG re-renders declaratively when values change.' },
  'text-particles': { q: 'Can I use these text particles in React, Vue, or Angular?', a: 'Yes. The JSX, Vue, Angular, and Tailwind exports convert the snippet automatically. In React, run the canvas particle loop in useEffect with cancelAnimationFrame cleanup, store the particle array in a ref, and re-sample the text pixels whenever the displayed word prop changes.' },
  'virtual-scroll': { q: 'Can I use this virtual scroll in React, Vue, or Angular?', a: 'Yes. Click JSX for a React component, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a utility-class version. In React, derive the visible slice from scrollTop state in an onScroll handler and render only those rows — or compare with react-window, which implements the same windowing technique.' },
};

let applied = 0, failed = [];
for (const [id, { q, a }] of Object.entries(FAQS)) {
  const file = path.join(DIR, `${id}.js`);
  if (!fs.existsSync(file)) { failed.push(`${id} (file missing)`); continue; }
  let src = fs.readFileSync(file, 'utf8');
  const seoIdx = src.indexOf('seo: {');
  const faqsIdx = src.indexOf('faqs: [', seoIdx);
  if (seoIdx === -1 || faqsIdx === -1) { failed.push(`${id} (no seo.faqs array)`); continue; }
  const closeMatch = /\r?\n(    \],)/.exec(src.slice(faqsIdx));
  if (!closeMatch) { failed.push(`${id} (faqs close not found)`); continue; }
  const esc = s => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const entry = `\n      { q: '${esc(q)}', a: '${esc(a)}' },`;
  const insertAt = faqsIdx + closeMatch.index;
  src = src.slice(0, insertAt) + entry + src.slice(insertAt);
  fs.writeFileSync(file, src, 'utf8');
  applied++;
}
console.log(`applied: ${applied}/${Object.keys(FAQS).length}`);
if (failed.length) { console.log('FAILED:'); failed.forEach(f => console.log('  ' + f)); process.exit(1); }
