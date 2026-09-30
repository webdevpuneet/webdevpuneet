const metaOgTagGenerator = {
  id: 'meta-og-tag-generator',
  title: 'Meta & Open Graph Tag Generator',
  category: 'dev',
  html: `<div class="wrap">
  <h2>Meta &amp; Open Graph Tag Generator</h2>

  <div class="grid">
    <div class="form">
      <label>Page Title <span id="title-count">0</span>/60</label>
      <input type="text" id="f-title" maxlength="70" value="Free UI Snippets — Copy-Paste HTML, CSS & JS Components" />

      <label>Meta Description <span id="desc-count">0</span>/160</label>
      <textarea id="f-desc" maxlength="180">Browse hundreds of free, dependency-free UI snippets you can copy, customize, and export straight to React, Vue, or Tailwind.</textarea>

      <label>Canonical URL</label>
      <input type="text" id="f-url" value="https://example.com/ui-snippets/" />

      <label>Image URL</label>
      <input type="text" id="f-image" value="https://example.com/og/preview.png" />

      <label>Site Name</label>
      <input type="text" id="f-site" value="Free UI Snippets" />

      <label>Twitter Card Type</label>
      <select id="f-twitter">
        <option value="summary_large_image">summary_large_image</option>
        <option value="summary">summary</option>
      </select>
    </div>

    <div class="preview-col">
      <div class="preview-label">Social preview</div>
      <div class="card">
        <div class="card-img" id="card-img"></div>
        <div class="card-body">
          <div class="card-domain" id="card-domain">example.com</div>
          <div class="card-title" id="card-title"></div>
          <div class="card-desc" id="card-desc"></div>
        </div>
      </div>
      <div class="preview-label">Google search result</div>
      <div class="serp">
        <div class="serp-title" id="serp-title"></div>
        <div class="serp-url" id="serp-url"></div>
        <div class="serp-desc" id="serp-desc"></div>
      </div>
    </div>
  </div>

  <div class="output">
    <div class="output-head">
      <span>Generated Tags</span>
      <button id="copy-btn">Copy</button>
    </div>
    <pre id="tags-output"></pre>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; padding: 28px 20px; }

.wrap { max-width: 880px; margin: 0 auto; }
h2 { font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 16px; }

.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 18px; }

.form { display: flex; flex-direction: column; gap: 4px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; }
.form label { font-size: 11.5px; font-weight: 700; color: #475569; margin-top: 10px; display: flex; justify-content: space-between; }
.form label span { color: #94a3b8; font-weight: 600; }
.form input, .form textarea, .form select {
  padding: 8px 10px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 13px; font-family: inherit; color: #1e293b;
}
.form input:focus, .form textarea:focus, .form select:focus { outline: none; border-color: #6366f1; }
.form textarea { resize: vertical; min-height: 56px; }

.preview-col { display: flex; flex-direction: column; gap: 10px; }
.preview-label { font-size: 11px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; }

.card { border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; background: #fff; }
.card-img { height: 130px; background: linear-gradient(135deg, #6366f1, #a855f7); display: flex; align-items: center; justify-content: center; color: rgba(255,255,255,0.6); font-size: 11px; font-weight: 700; }
.card-body { padding: 10px 12px; }
.card-domain { font-size: 10.5px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 3px; }
.card-title { font-size: 13.5px; font-weight: 700; color: #1e293b; line-height: 1.3; margin-bottom: 3px; }
.card-desc { font-size: 12px; color: #64748b; line-height: 1.4; }

.serp { border: 1px solid #e2e8f0; border-radius: 12px; background: #fff; padding: 12px 14px; }
.serp-title { font-size: 15px; color: #1a0dab; margin-bottom: 2px; }
.serp-url { font-size: 12px; color: #006621; margin-bottom: 4px; }
.serp-desc { font-size: 12.5px; color: #4d5156; line-height: 1.5; }

.output { background: #0f172a; border-radius: 12px; padding: 14px 16px; }
.output-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
.output-head span { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; }
#copy-btn { background: #1e293b; border: 1px solid #334155; color: #cbd5e1; font-size: 11px; font-weight: 700; padding: 5px 10px; border-radius: 6px; cursor: pointer; }
#copy-btn:hover { background: #334155; }
#copy-btn.copied { background: rgba(34,197,94,0.2); border-color: rgba(34,197,94,0.4); color: #4ade80; }
#tags-output { font-family: "SF Mono", Consolas, monospace; font-size: 11.5px; color: #a5b4fc; white-space: pre-wrap; word-break: break-word; line-height: 1.7; max-height: 260px; overflow: auto; }

@media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }`,
  js: `const fTitle = document.getElementById('f-title');
const fDesc = document.getElementById('f-desc');
const fUrl = document.getElementById('f-url');
const fImage = document.getElementById('f-image');
const fSite = document.getElementById('f-site');
const fTwitter = document.getElementById('f-twitter');

const titleCount = document.getElementById('title-count');
const descCount = document.getElementById('desc-count');

const cardImg = document.getElementById('card-img');
const cardDomain = document.getElementById('card-domain');
const cardTitle = document.getElementById('card-title');
const cardDesc = document.getElementById('card-desc');
const serpTitle = document.getElementById('serp-title');
const serpUrl = document.getElementById('serp-url');
const serpDesc = document.getElementById('serp-desc');
const tagsOutput = document.getElementById('tags-output');
const copyBtn = document.getElementById('copy-btn');

function escapeAttr(str) {
  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function domainOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\\./, '');
  } catch (e) {
    return url.replace(/^https?:\\/\\//, '').split('/')[0] || 'example.com';
  }
}

function truncate(str, max) {
  return str.length > max ? str.slice(0, max - 1).trim() + '\\u2026' : str;
}

function render() {
  const title = fTitle.value.trim() || 'Untitled Page';
  const desc = fDesc.value.trim() || 'No description provided.';
  const url = fUrl.value.trim() || 'https://example.com/';
  const image = fImage.value.trim();
  const site = fSite.value.trim() || domainOf(url);
  const twitterCard = fTwitter.value;

  titleCount.textContent = title.length;
  titleCount.style.color = title.length > 60 ? '#ef4444' : '#94a3b8';
  descCount.textContent = desc.length;
  descCount.style.color = desc.length > 160 ? '#ef4444' : '#94a3b8';

  const domain = domainOf(url);

  cardImg.style.backgroundImage = image ? 'url(' + JSON.stringify(image) + ')' : '';
  cardImg.style.backgroundSize = 'cover';
  cardImg.style.backgroundPosition = 'center';
  cardImg.textContent = image ? '' : 'NO IMAGE SET';
  cardDomain.textContent = domain.toUpperCase();
  cardTitle.textContent = truncate(title, 70);
  cardDesc.textContent = truncate(desc, 120);

  serpTitle.textContent = truncate(title, 60);
  serpUrl.textContent = url;
  serpDesc.textContent = truncate(desc, 160);

  const lines = [
    '<title>' + escapeAttr(title) + '</title>',
    '<meta name="description" content="' + escapeAttr(desc) + '" />',
    '<link rel="canonical" href="' + escapeAttr(url) + '" />',
    '',
    '<meta property="og:type" content="website" />',
    '<meta property="og:title" content="' + escapeAttr(title) + '" />',
    '<meta property="og:description" content="' + escapeAttr(desc) + '" />',
    '<meta property="og:url" content="' + escapeAttr(url) + '" />',
    '<meta property="og:site_name" content="' + escapeAttr(site) + '" />',
    image ? '<meta property="og:image" content="' + escapeAttr(image) + '" />' : '',
    '',
    '<meta name="twitter:card" content="' + twitterCard + '" />',
    '<meta name="twitter:title" content="' + escapeAttr(title) + '" />',
    '<meta name="twitter:description" content="' + escapeAttr(desc) + '" />',
    image ? '<meta name="twitter:image" content="' + escapeAttr(image) + '" />' : '',
  ].filter((line) => line !== '');

  tagsOutput.textContent = lines.join('\\n');
}

[fTitle, fDesc, fUrl, fImage, fSite, fTwitter].forEach((el) => el.addEventListener('input', render));

copyBtn.addEventListener('click', () => {
  const finish = () => {
    copyBtn.textContent = 'Copied!';
    copyBtn.classList.add('copied');
    setTimeout(() => { copyBtn.textContent = 'Copy'; copyBtn.classList.remove('copied'); }, 1200);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(tagsOutput.textContent).then(finish).catch(finish);
  } else {
    finish();
  }
});

render();`,

  seo: {
    title: 'Meta & Open Graph Tag Generator — Free Snippet',
    description: 'Generate title, meta description, Open Graph and Twitter Card tags with a live Google SERP and social share card preview. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Meta Tag & Open Graph Generator — Live Social Card & Google SERP Preview',
      description: `Getting a page to look right when it's shared on Slack, Twitter, or in a Google search result depends on a handful of \`<meta>\` tags that are easy to get wrong or forget entirely — a missing \`og:image\`, a description over Google's truncation limit, or a Twitter card type that doesn't match what was actually supplied. This snippet generates all three tag families from one shared form and renders a live approximation of how each surface will actually display the page.

**One set of fields, three tag families**

The form collects six fields — title, description, canonical URL, image URL, site name, and Twitter card type — and \`render()\` derives the \`<title>\`/\`<meta name="description">\` pair, the full \`og:*\` Open Graph tag set, and the \`twitter:*\` Twitter Card tags from that same shared data on every keystroke. This mirrors how these tags actually work in practice: Open Graph and Twitter Card both fall back to the same title and description most of the time, so editing them independently would just create three places for them to drift out of sync.

**Character counters tied to real truncation limits**

Google typically truncates a page title display around 60 characters and a meta description around 160, though the exact cutoff varies by pixel width rather than character count in modern search results. The counters next to Title and Description turn red past those approximate thresholds — not because they enforce a hard limit, but because they give an early visual warning before you find out a title got cut off mid-word in an actual search result.

**Deriving the domain from the URL, safely**

\`domainOf()\` first tries \`new URL(url).hostname\` — the correct, spec-compliant way to extract a hostname — wrapped in a \`try/catch\` because the URL field is free text and may not be a valid absolute URL while the user is still mid-edit. The catch block falls back to a simple string strip of the protocol and everything after the first slash, so the domain preview never throws or goes blank just because the URL field is temporarily incomplete.

**Truncating preview text to match each surface's real limits**

\`truncate()\` clips text to a maximum length and appends an ellipsis when it overflows, applied with different limits per surface: the social card preview shows a title truncated to 70 characters and description to 120 (roughly matching how Facebook and Slack unfurl cards render), while the Google SERP preview uses 60 and 160 to match search snippet conventions. Seeing the actual truncation happen in the preview — not just a character counter — is what makes the difference between a title that reads naturally when cut off versus one that gets chopped mid-word.

**Escaping attribute values in the generated markup**

Because the generated output is literal HTML meant to be pasted into a \`<head>\`, \`escapeAttr()\` replaces \`&\`, \`"\`, \`<\`, and \`>\` in every user-supplied value before it's interpolated into a \`content="..."\` attribute. Skipping this step would let a title or description containing a quote character break out of its attribute and corrupt the generated tag, or even inject unintended markup if pasted directly into a real page.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Fill in the page basics', text: 'Enter the page title, meta description, and canonical URL — the character counters warn you if either field runs long.' },
        { title: 'Add an image and site name', text: 'Set the Open Graph image URL and site name used across the social share card and Twitter Card tags.' },
        { title: 'Choose a Twitter Card type', text: 'Pick summary_large_image for a full-width image card or summary for a small square thumbnail card.' },
        { title: 'Check both live previews', text: 'The social preview card approximates a Slack/Facebook unfurl; the SERP block approximates a Google search result, both truncated to realistic limits.' },
        { title: 'Copy the generated tags', text: 'Click Copy to grab the full block of title, description, canonical, Open Graph, and Twitter Card tags, ready to paste into your page\'s <head>.' },
      ],
    },
    features: [
      'Generates <title>, meta description, canonical link, full og:* set, and twitter:* set from one shared form',
      'Live character counters that flag titles over ~60 and descriptions over ~160 characters',
      'Social share card preview approximating a Slack/Facebook/Twitter unfurl, truncated to realistic limits',
      'Google search result (SERP) preview showing title, URL, and description as they would actually render',
      'Safe domain extraction via the URL constructor with a string-based fallback for incomplete input',
      'Automatic HTML attribute escaping so quotes and special characters in your copy never break the generated tags',
      'Switchable Twitter Card type between summary_large_image and summary',
      'One-click Copy button with visual confirmation',
      'Entirely client-side — no data sent anywhere, safe for unpublished page drafts',
    ],
    useCases: [
      { icon: 'APP', title: 'Preparing a new landing page for launch', desc: 'Fill in the real copy and image before publishing to catch a truncated title or missing og:image while it is still easy to fix.' },
      { icon: 'CODE', title: 'Handing tags to a developer or CMS', desc: 'Copy the generated block directly into a page\'s <head>, a Next.js Metadata object, or a CMS SEO plugin\'s custom meta tags field.' },
      { icon: 'LEARN', title: 'Teaching SEO and social-share fundamentals', desc: 'Show how the same title and description map differently onto a Google result versus a Slack/Twitter unfurl, and why both need their own truncation-aware copy.' },
      { icon: 'FLOW', title: 'QA-ing an existing page\'s share appearance', desc: 'Paste a page\'s current title, description, and image URL to preview exactly how it currently unfurls before deciding whether to rewrite the copy.' },
      { icon: 'DESIGN', title: 'A/B testing headline and description copy', desc: 'Quickly try several title and description variants and see the truncated preview for each before committing to final on-page copy.' },
      { icon: 'CODE', title: 'Related: SQL Query Formatter', desc: 'See the [SQL Query Formatter](/ui-snippets/sql-query-formatter/) for a related dev pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this validate that my image URL actually loads?', a: 'No, it only checks that an image URL was provided and uses it as a CSS background-image in the preview card. It does not verify the image loads, its dimensions, or its file size, all of which matter for real Open Graph rendering.' },
      { q: 'Why do the character counters turn red at different lengths for title and description?', a: 'They approximate widely cited Google search-result truncation points: around 60 characters for a title and around 160 for a description. Google actually truncates based on rendered pixel width, not a strict character count, so these are practical guidelines, not hard limits.' },
      { q: 'What is the difference between summary and summary_large_image Twitter Cards?', a: 'summary_large_image renders a full-width image above the title and description, similar to a Facebook unfurl. summary renders a small square thumbnail beside the text. The generated twitter:card tag switches between the two based on your selection.' },
      { q: 'Why does the domain in the preview change as I type the URL?', a: 'domainOf() parses the URL field with the built-in URL constructor to extract just the hostname. If what you have typed is not yet a valid URL, it falls back to a simple string-based guess rather than showing a blank or broken preview.' },
      { q: 'Are quotes and special characters in my title or description handled safely?', a: 'Yes. Every value is passed through an escaping function that converts &, ", <, and > into their HTML entity equivalents before being placed inside a content="..." attribute, so the generated tags stay valid even if your copy contains quotation marks.' },
      { q: 'Is any of my content sent to a server?', a: 'No. Every preview and every generated tag is computed entirely in the browser from the form fields — nothing is transmitted anywhere, so it is safe to use for unpublished or embargoed page copy.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI assistant like Claude and ask it to explain exactly why the social card preview and the Google SERP preview truncate text at different lengths, and how those numbers relate to real-world pixel-based truncation. It is also a good starting point to extend: ask for a JSON-LD structured data block generator alongside the meta tags, an image-dimension warning for Open Graph's recommended 1200x630 aspect ratio, or a Next.js/React Helmet-formatted output mode instead of raw HTML tags.`,
      prompt: `Build a client-side meta tag and Open Graph tag generator in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- A form with fields for page title, meta description, canonical URL, Open Graph image URL, site name, and a Twitter Card type selector (summary_large_image or summary), updating everything live on every input event.
- Character counters next to the title and description fields that visually flag (e.g. turn red) once the title exceeds roughly 60 characters and the description exceeds roughly 160 characters, without hard-blocking further typing.
- A live social share card preview mimicking a Slack/Facebook/Twitter unfurl: an image area, a domain label, a truncated title, and a truncated description, each using appropriately different truncation lengths than the SERP preview.
- A live Google search result (SERP) preview showing a truncated title, the full canonical URL, and a truncated description using search-result-appropriate limits.
- Safely derive the displayed domain from the canonical URL field using the URL constructor, with a string-based fallback if the field is not yet a valid URL (since the user may still be typing).
- A read-only output panel generating the actual <title>, <meta name="description">, <link rel="canonical">, full Open Graph (og:*) tag set, and Twitter Card (twitter:*) tag set as pasteable HTML, with every user-supplied value HTML-attribute-escaped (ampersands, quotes, angle brackets) so special characters in the copy never break the generated markup.
- A Copy button using the Clipboard API with a brief visual confirmation.`,
    },
  },
};

export default metaOgTagGenerator;
