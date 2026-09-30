import { readFileSync } from 'fs';

const src = readFileSync('src/components/UiSnippetsTool/snippets/parallax-hero.js', 'utf8');
const jsStart = src.indexOf('js: `') + 5;
const jsEnd   = src.indexOf('`,\n  seo:');
const raw = src.slice(jsStart, jsEnd);

// The JS inside the template literal has escaped backticks \` and \${
// Unescape them to get the actual injected JS
const js = raw.replace(/\\`/g, '`').replace(/\\\${/g, '${');

console.log('JS block length:', js.length, 'lines:', js.split('\n').length);
console.log('Has demoMode:', js.includes('demoMode'));
console.log('Has Math.sin:', js.includes('Math.sin'));
console.log('Has animate():', js.includes('animate();'));

try {
  new Function(js);
  console.log('✅ JS parses OK');
} catch(e) {
  console.log('❌ PARSE ERROR:', e.message);
}
