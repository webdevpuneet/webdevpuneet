// Converts top-level `about: { title, description, about, ... }` to
// `seo: { title (SERP), description (SERP), about, howToUse, features, useCases, faqs }`
// for snippet files that were written before the seo: key convention.
import fs from 'fs';

const FILES = [
  {
    path: 'src/components/UiSnippetsTool/snippets/notification-center.js',
    serpTitle: 'Notification Center — Free HTML CSS JS Snippet',
    serpDesc: 'Slide-down notification panel with badge counter, mark-as-read, dismiss, and click-outside close. Exports to React, Vue, Angular & Tailwind.',
  },
  {
    path: 'src/components/UiSnippetsTool/snippets/chip-filter.js',
    serpTitle: 'Chip Filter — Free HTML CSS JS Snippet',
    serpDesc: 'Pill filter chips filtering a responsive card grid by category with live count badges and animated transitions. Exports to React, Vue, Angular & Tailwind.',
  },
  {
    path: 'src/components/UiSnippetsTool/snippets/mega-menu.js',
    serpTitle: 'Mega Menu — Free HTML CSS JS Dropdown Snippet',
    serpDesc: 'Desktop mega dropdown with 3 link columns, featured card, hover-intent delay, CSS arrow pointer, and ARIA. Exports to React, Vue, Angular & Tailwind.',
  },
  {
    path: 'src/components/UiSnippetsTool/snippets/auto-resize-textarea.js',
    serpTitle: 'Auto-Resize Textarea — Free HTML CSS JS Snippet',
    serpDesc: 'Auto-growing textarea using scrollHeight measurement, 3-threshold character counter, connected border design, and success state. Exports to React, Vue & Tailwind.',
  },
];

const esc = s => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

for (const { path, serpTitle, serpDesc } of FILES) {
  let src = fs.readFileSync(path, 'utf8');

  // Find the top-level `  about: {` line
  const marker = /^  about: \{/m;
  if (!marker.test(src)) {
    // already converted or different structure
    console.log(`SKIP (no top-level about:): ${path}`);
    continue;
  }

  // Replace top-level `  about: {` with seo wrapper
  const newHeader = `  seo: {\n    title: '${esc(serpTitle)}',\n    description: '${esc(serpDesc)}',\n    about: {`;
  src = src.replace(/^  about: \{/m, newHeader);

  // The file now ends with:
  //     ],      <- faqs close
  //   },        <- was closing the about: object
  // };          <- closing the snippet
  // We need to add an extra `  },` to close the seo: wrapper.
  // The pattern to find is `\n  },\n};` at the very end of the file.
  // Pattern: `\n  },\n};\nexport default ...`
  const endPattern = /(\n  \},\n\};)(\nexport default [^;]+;)/;
  if (!endPattern.test(src)) {
    console.log(`WARN (end pattern not found): ${path}`);
    continue;
  }
  src = src.replace(endPattern, '\n    },\n  },\n};$2');

  fs.writeFileSync(path, src, 'utf8');
  console.log(`CONVERTED: ${path}`);
}
console.log('Done.');
