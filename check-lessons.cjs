const fs = require('fs');
const content = fs.readFileSync('src/components/ReactPlaygroundTool/lessons.js', 'utf8');

const lessons = [...content.matchAll(/id:\s*'([^']+)',\s*\n\s*chapter:\s*'([^']+)',\s*\n\s*title:\s*'([^']+)'/g)];
const chapters = [...new Set(lessons.map(m => m[2]))];

console.log('=== LESSON AUDIT ===');
console.log('Total lessons:', lessons.length);
console.log('Total chapters:', chapters.length);

// Level distribution
const beginnerChapters = ['JSX Basics','Components','Props','State','Events','Forms','Lists & Conditionals','Hooks','Beginner Patterns','Styling in React'];
const intermediateChapters = ['Patterns','Data & Async','Performance','Advanced Hooks','Real-World Patterns','Error Handling & Testing','Portals','Suspense & Concurrent','Accessibility & Patterns'];
const proChapters = ['Advanced Patterns','Patterns & Architecture','Performance & Debugging','TypeScript with React','Testing','Internationalisation','GSAP in React'];

const bCount = lessons.filter(m => beginnerChapters.includes(m[2])).length;
const iCount = lessons.filter(m => intermediateChapters.includes(m[2])).length;
const pCount = lessons.filter(m => proChapters.includes(m[2])).length;
const uncategorized = lessons.filter(m => !beginnerChapters.includes(m[2]) && !intermediateChapters.includes(m[2]) && !proChapters.includes(m[2]));

console.log('\nLevel distribution:');
console.log('  Beginner:', bCount, 'lessons');
console.log('  Intermediate:', iCount, 'lessons');
console.log('  Pro:', pCount, 'lessons');
if (uncategorized.length) {
  console.log('  Uncategorized:', uncategorized.map(m => m[2]+':'+m[3]).join(', '));
}

// Check for unescaped ${ in lesson code (outside of \${)
const unescapedDollar = [...content.matchAll(/\$\{(?![\s\S]*?\)/g)];
// Better: find ${word} patterns that aren't preceded by backslash
let badDollar = 0;
const lines = content.split('\n');
lines.forEach((line, i) => {
  if (line.match(/(?<!\)\$\{[a-zA-Z]/) && !line.trim().startsWith('//')) {
    console.log('Possible unescaped ${} at line ' + (i+1) + ':', line.trim().substring(0, 80));
    badDollar++;
  }
});
if (!badDollar) console.log('\nNo unescaped ${} issues found ✅');

// List all chapters with lesson counts
console.log('\nChapter breakdown:');
chapters.forEach(c => {
  const count = lessons.filter(m => m[2] === c).length;
  const level = beginnerChapters.includes(c) ? 'BEG' : intermediateChapters.includes(c) ? 'INT' : 'PRO';
  console.log(' ', level, '['+c+']', count, 'lessons');
});
