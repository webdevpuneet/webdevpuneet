const llmModelComparisonTable = {
  id: 'llm-model-comparison-table',
  title: 'AI Model Comparison Table',
  lastmod: '2026-09-05',
  category: 'tables',
  cdnUrls: [],
  html: `<div class="lmc-wrap">
  <div class="lmc-scroll">
    <table class="lmc-table">
      <thead>
        <tr>
          <th class="lmc-attr-col">Attribute</th>
          <th>Fast</th>
          <th class="lmc-recommended-col">
            <span class="lmc-rec-badge">Recommended</span>
            Balanced
          </th>
          <th>Advanced</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="lmc-attr-col">Context window</td>
          <td>32K tokens</td>
          <td class="lmc-recommended-col">128K tokens</td>
          <td>1M tokens</td>
        </tr>
        <tr>
          <td class="lmc-attr-col">Speed</td>
          <td><span class="lmc-dots"><span class="lmc-dot lmc-on"></span><span class="lmc-dot lmc-on"></span><span class="lmc-dot lmc-on"></span><span class="lmc-dot"></span><span class="lmc-dot"></span></span></td>
          <td class="lmc-recommended-col"><span class="lmc-dots"><span class="lmc-dot lmc-on"></span><span class="lmc-dot lmc-on"></span><span class="lmc-dot"></span><span class="lmc-dot"></span><span class="lmc-dot"></span></span></td>
          <td><span class="lmc-dots"><span class="lmc-dot lmc-on"></span><span class="lmc-dot"></span><span class="lmc-dot"></span><span class="lmc-dot"></span><span class="lmc-dot"></span></span></td>
        </tr>
        <tr>
          <td class="lmc-attr-col">Relative cost</td>
          <td><span class="lmc-cost">$</span><span class="lmc-cost lmc-off">$</span><span class="lmc-cost lmc-off">$</span></td>
          <td class="lmc-recommended-col"><span class="lmc-cost">$</span><span class="lmc-cost">$</span><span class="lmc-cost lmc-off">$</span></td>
          <td><span class="lmc-cost">$</span><span class="lmc-cost">$</span><span class="lmc-cost">$</span></td>
        </tr>
        <tr>
          <td class="lmc-attr-col">Best for</td>
          <td class="lmc-strength">Quick replies, autocomplete, high-volume tasks</td>
          <td class="lmc-recommended-col lmc-strength">Everyday chat, drafting, and general reasoning</td>
          <td class="lmc-strength">Deep analysis, long documents, complex reasoning</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.lmc-wrap { width: 100%; max-width: 640px; }
.lmc-scroll { overflow-x: auto; }
.lmc-table { width: 100%; border-collapse: separate; border-spacing: 0; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 12px 30px rgba(30,41,59,0.06); min-width: 520px; }

.lmc-table th, .lmc-table td { padding: 14px 16px; text-align: center; font-size: 12.5px; border-bottom: 1px solid #f1f5f9; }
.lmc-table thead th { background: #f8fafc; font-weight: 800; color: #1e293b; font-size: 13px; border-bottom: 1px solid #e2e8f0; position: relative; }
.lmc-attr-col { text-align: left !important; color: #64748b; font-weight: 700; width: 28%; }
.lmc-table tbody tr:last-child td { border-bottom: none; }

.lmc-recommended-col {
  background: #f5f4ff; position: relative; border-left: 2px solid #6366f1; border-right: 2px solid #6366f1;
}
thead .lmc-recommended-col { border-top: 2px solid #6366f1; }
tbody tr:last-child .lmc-recommended-col { border-bottom: 2px solid #6366f1; }

.lmc-rec-badge {
  display: block; font-size: 9.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em;
  color: #6366f1; background: #eef2ff; padding: 3px 8px; border-radius: 999px; margin: 0 auto 6px; width: fit-content;
}

.lmc-dots { display: inline-flex; gap: 3px; }
.lmc-dot { width: 8px; height: 8px; border-radius: 50%; background: #e2e8f0; display: inline-block; }
.lmc-dot.lmc-on { background: #6366f1; }

.lmc-cost { font-weight: 800; color: #1e293b; font-size: 14px; }
.lmc-cost.lmc-off { color: #e2e8f0; }

.lmc-strength { color: #475569; text-align: left; line-height: 1.5; font-size: 12px; }`,
  js: `// Purely presentational comparison table — no dynamic behavior required,
// but we add a light hover-highlight on rows for readability on larger screens.
const table = document.querySelector('.lmc-table');
if (table) {
  const rows = table.querySelectorAll('tbody tr');
  rows.forEach((row) => {
    row.addEventListener('mouseenter', () => {
      row.style.background = '#fafbff';
    });
    row.addEventListener('mouseleave', () => {
      row.style.background = '';
    });
  });
}`,
  seo: {
    title: 'AI Model Comparison Table — Free HTML CSS JS Snippet',
    description: 'A comparison table across three fictional AI model tiers with context window, speed dots, cost symbols, and a highlighted Recommended column. Exports to React, Vue & Tailwind.',
    about: {
      title: 'AI Model Comparison Table — Compare AI Model Tiers by Speed, Cost & Context',
      description: `Products that offer multiple AI model tiers (a fast/cheap option, a balanced default, and a slower/more capable option) usually need a compact way to help users pick one. This snippet lays out three generic tiers — Fast, Balanced, and Advanced — as columns against four attributes as rows, using visual encodings instead of dense text wherever a number alone would be harder to scan.

**Dots and dollar signs instead of raw numbers**

Rather than printing "Speed: 8/10", the speed row renders five small dot spans per model, with a variable number carrying the \`.lmc-on\` class to appear filled versus the rest staying an empty gray — a quick visual bar built from plain \`<span>\` elements and one CSS class, no chart library involved. Cost uses the same idea with dollar-sign characters, styling unused signs a faint gray so "$" vs "$$$" reads at a glance as relative cost tier.

**One column visually promoted as Recommended**

The Balanced column gets a small uppercase "Recommended" badge in its header cell and a distinct light-indigo background plus a 2px indigo border running down both sides of that column (applied via the \`.lmc-recommended-col\` class on every cell in that column, including the top and bottom border pieces on the header and last row) — drawing the eye to one clear default choice without needing JavaScript to compute or highlight anything.

**Static markup, minimal JS**

Because the content here is a fixed comparison rather than dynamic data, the table is authored directly in HTML with no data-driven rendering step. The included JS is intentionally light — just a row hover highlight for readability — so the snippet is trivial to adapt by editing the table cells directly.`,
    },
    features: [
      'Three generic AI model tiers (Fast, Balanced, Advanced) compared across four attributes',
      'Speed shown as a five-dot filled/unfilled indicator instead of a raw number',
      'Relative cost shown as styled dollar-sign groups (active vs. faded) per tier',
      'One column visually promoted with a "Recommended" badge and accent border',
      'Fully static, hand-authored comparison markup that is simple to edit directly',
      'Horizontally scrollable container so the table stays usable on narrow screens',
      'Row hover highlighting for easier scanning on wider viewports',
      'Clean, accessible table semantics with a proper thead/tbody structure',
    ],
    useCases: [
      { icon: 'APP', title: 'AI product pricing and plan pages', desc: 'Help users choose between model tiers with the same visual pattern as a pricing table.' },
      { icon: 'DESIGN', title: 'Model picker documentation and dev portals', desc: 'Give developers an at-a-glance comparison before they pick a default model for an integration.' },
      { icon: 'CODE', title: 'Internal AI tooling and admin dashboards', desc: 'Show teams the trade-offs between available model options in one place.' },
      { icon: 'LEARN', title: 'Teaching visual data encoding in plain HTML/CSS', desc: 'A clear example of representing relative values (speed, cost) with dots and symbols instead of numbers.' },
    ],
    faqs: [
      { q: 'Are these real AI models?', a: 'No — Fast, Balanced, and Advanced are generic placeholder tier names. Replace them, and the values in each row, with your own actual model names and specs.' },
      { q: 'How is the speed indicator built?', a: 'Each cell renders five small <span> "dot" elements; a subset of them carry the .lmc-on class to appear filled indigo while the rest stay a light gray, forming a simple visual bar without any chart library.' },
      { q: 'How do I change which column is marked Recommended?', a: 'Move the lmc-recommended-col class (and the "Recommended" badge markup in the header) from the current column\'s cells to the cells of whichever column should be highlighted instead.' },
      { q: 'Is this table responsive?', a: 'Yes — the table sits inside a horizontally scrollable container with a minimum width, so on narrow screens it can be scrolled sideways rather than being crushed illegibly.' },
    ],
  },
};

export default llmModelComparisonTable;
