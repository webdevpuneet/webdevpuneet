export const CHAPTERS = [
  {
    id: 'document',
    title: 'Document',
    emoji: '📄',
    lessons: [
      {
        id: 'doc-structure',
        title: 'HTML Document Structure',
        concept: `Every HTML page has the same basic skeleton. The <!DOCTYPE html> declaration tells the browser this is an HTML5 document. The <html> tag wraps everything. Inside it, <head> holds invisible metadata and <body> holds the visible content.\n\nThe <head> contains things like the page title (shown in the browser tab), character encoding, viewport settings, and links to CSS files.`,
        demo: {
          type: 'info',
          label: 'Explore the document skeleton:',
          options: [
            { label: 'Full skeleton', code: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1">\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello World</h1>\n    <p>Page content goes here.</p>\n  </body>\n</html>', note: 'Every HTML page starts with this skeleton' },
            { label: '<head>', code: '<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1">\n  <title>Page Title</title>\n  <meta name="description" content="Page description for SEO">\n  <link rel="stylesheet" href="styles.css">\n</head>', desc: 'The <head> contains invisible metadata: character encoding, viewport settings, the page title (shown in the browser tab), SEO description, and links to CSS files. Users never see this content directly.', note: 'head content is invisible to users' },
            { label: '<body>', code: '<body>\n  <header>Site header</header>\n  <nav>Navigation</nav>\n  <main>\n    <h1>Main heading</h1>\n    <p>Content...</p>\n  </main>\n  <footer>Footer</footer>\n</body>', desc: 'The <body> contains everything users actually see — headings, paragraphs, images, links, buttons, forms, and tables.', note: 'body holds all visible page content' },
            { label: 'lang attribute', code: '<html lang="en">\n<!-- English page -->\n\n<html lang="fr">\n<!-- French page -->\n\n<html lang="ar" dir="rtl">\n<!-- Arabic page, right-to-left -->', desc: 'The lang attribute on <html> declares the page language. Screen readers use it to pick the correct voice. Search engines use it for language targeting. Always include it.', note: 'Always declare the language of your page' },
          ],
        },
        challenge: {
          prompt: 'Which tag holds the visible content of a webpage?',
          options: ['<head>', '<html>', '<body>', '<main>'],
          answer: '<body>',
        },
      },
      {
        id: 'meta-tags',
        title: 'Meta Tags',
        concept: `Meta tags live inside <head> and provide information about the page — they're invisible to users but important for browsers, search engines, and social media.\n\nThe most important ones: charset (character encoding), viewport (mobile scaling), description (SEO snippet), and Open Graph tags (social previews).`,
        demo: {
          type: 'info',
          label: 'Explore essential meta tags:',
          options: [
            { label: 'charset', code: '<meta charset="UTF-8">', desc: 'Tells the browser to use UTF-8 encoding — supports all languages, emoji, and special characters. Always include this as the very first tag inside <head>.', note: 'Always first inside <head>' },
            { label: 'viewport', code: '<meta name="viewport" content="width=device-width, initial-scale=1">', desc: 'Makes the page scale correctly on mobile devices. Without this, smartphones render a tiny zoomed-out desktop version of your page.', note: 'Essential for every mobile-friendly page' },
            { label: 'description', code: '<meta name="description" content="Learn HTML interactively with click-based visual demos. No setup required.">', desc: 'The description appears in Google search results under the page title. Keep it under 160 characters. It does not directly affect rankings but influences click-through rate.', note: 'Important for SEO and search snippets' },
            { label: 'title', code: '<title>HTML Playground — Learn HTML Visually | webdevpuneet.com</title>', desc: 'The <title> tag (not a meta tag, but lives in <head>) sets the text in the browser tab and is the main headline in search results. It is the single most important SEO element on your page.', note: 'Keep under 60 characters for search results' },
            { label: 'Open Graph', code: '<meta property="og:title" content="My Page">\n<meta property="og:description" content="Page description">\n<meta property="og:image" content="https://example.com/image.png">\n<meta property="og:url" content="https://example.com">', desc: 'Open Graph meta tags control how your page appears when shared on Facebook, Twitter, LinkedIn, and other social platforms — the title, description, and preview image.', note: 'Controls social media sharing previews' },
          ],
        },
      },
    ],
  },
  {
    id: 'basics',
    title: 'Basics',
    emoji: '🏗️',
    lessons: [
      {
        id: 'what-is-html',
        title: 'What is HTML?',
        concept: `HTML stands for HyperText Markup Language. It is the skeleton of every webpage — it tells the browser what content to display and what that content means.\n\nEvery website you have ever visited is built with HTML. It structures text, images, links, forms, and everything else you see on a page.`,
        demo: {
          type: 'picker',
          label: 'See what HTML can create:',
          options: [
            { label: 'Heading', html: '<h1>Hello, World!</h1>' },
            { label: 'Paragraph', html: '<p>This is a paragraph of text.</p>' },
            { label: 'Link', html: '<a href="#">Click me</a>' },
            { label: 'Image', html: '<img src="https://picsum.photos/200/100" alt="A random photo">' },
            { label: 'Button', html: '<button>Click me</button>' },
          ],
        },
      },
      {
        id: 'tags',
        title: 'Tags & Elements',
        concept: `HTML is made of tags. A tag is written inside angle brackets like <tag>. Most elements have an opening tag and a closing tag (with a slash), and the content goes in between.\n\nSome elements are self-closing — they don't need a closing tag because they don't wrap any content.`,
        demo: {
          type: 'picker',
          label: 'Pick a tag to see how it works:',
          options: [
            { label: '<h2>', html: '<h2>I am a heading</h2>', note: 'Opening + closing tag' },
            { label: '<p>', html: '<p>I am a paragraph</p>', note: 'Opening + closing tag' },
            { label: '<strong>', html: '<strong>I am bold</strong>', note: 'Opening + closing tag' },
            { label: '<br>', html: 'Line one<br>Line two', note: 'Self-closing — no content' },
            { label: '<hr>', html: '<p>Above</p><hr><p>Below</p>', note: 'Self-closing — draws a line' },
          ],
        },
      },
      {
        id: 'id-class',
        title: 'id & class',
        concept: `The id and class attributes are the most important attributes in HTML — they connect your HTML to CSS and JavaScript.\n\nid is unique — only one element on a page should have a given id. class is reusable — many elements can share the same class. Use id for targeting a specific unique element, and class for applying styles to groups.`,
        demo: {
          type: 'picker',
          label: 'See id and class in use:',
          options: [
            { label: 'id', html: '<p id="intro" style="background:#e0f2fe;padding:8px;border-radius:4px">I have id="intro" — unique on this page</p>', note: 'id targets one specific element' },
            { label: 'class', html: '<p class="highlight" style="background:#fef9c3;padding:8px;border-radius:4px">First highlighted item</p>\n<p class="highlight" style="background:#fef9c3;padding:8px;border-radius:4px">Second highlighted item</p>', note: 'class can be reused on many elements' },
            { label: 'Multiple classes', html: '<p class="card primary" style="background:#6366f1;color:white;padding:12px;border-radius:8px">I have two classes: "card" and "primary"</p>', note: 'Separate multiple classes with a space' },
            { label: 'id + class', html: '<div id="hero" class="section featured" style="border:2px solid #6366f1;padding:14px;border-radius:8px"><h2 style="margin:0">Hero Section</h2><p>Has both an id and classes.</p></div>', note: 'An element can have both id and class' },
          ],
        },
        challenge: {
          prompt: 'Which attribute should be unique — used on only one element per page?',
          options: ['class', 'id', 'name', 'type'],
          answer: 'id',
        },
      },
      {
        id: 'attributes',
        title: 'Attributes',
        concept: `Attributes give elements extra information. They go inside the opening tag as key="value" pairs.\n\nFor example, a link needs to know where to go — that's the href attribute. An image needs a source — that's src. Attributes are how you customise and configure HTML elements.`,
        demo: {
          type: 'picker',
          label: 'Change the attribute to see the effect:',
          options: [
            { label: 'href', html: '<a href="https://webdevpuneet.com">Visit webdevpuneet.com</a>', note: 'href tells a link where to go' },
            { label: 'target', html: '<a href="https://webdevpuneet.com" target="_blank">Opens in new tab</a>', note: 'target="_blank" opens a new tab' },
            { label: 'src + alt', html: '<img src="https://picsum.photos/200/80" alt="Sample image">', note: 'src = image URL, alt = description' },
            { label: 'width + height', html: '<img src="https://picsum.photos/200/80" width="100" height="40">', note: 'Resize with width & height' },
            { label: 'disabled', html: '<button disabled>Cannot click me</button>', note: 'disabled makes a button unclickable' },
          ],
        },
      },
    ],
  },
  {
    id: 'text',
    title: 'Text',
    emoji: '📝',
    lessons: [
      {
        id: 'headings',
        title: 'Headings',
        concept: `HTML has six heading levels: h1 through h6. h1 is the most important (biggest), h6 is the least important (smallest).\n\nSearch engines use headings to understand the structure of your page. Each page should have exactly one h1, and headings should nest logically — like chapters and sub-chapters in a book.`,
        demo: {
          type: 'picker',
          label: 'Click a heading level:',
          options: [
            { label: 'h1', html: '<h1>Page Title</h1>', note: 'Main page title — use once per page' },
            { label: 'h2', html: '<h2>Section Heading</h2>', note: 'Major sections' },
            { label: 'h3', html: '<h3>Sub-section</h3>', note: 'Sub-sections under h2' },
            { label: 'h4', html: '<h4>Sub-sub-section</h4>', note: 'Deeper nesting' },
            { label: 'h5', html: '<h5>Minor heading</h5>', note: 'Rarely used' },
            { label: 'h6', html: '<h6>Smallest heading</h6>', note: 'Rarely used' },
          ],
        },
        challenge: {
          prompt: 'Which tag is used for the most important heading on a page?',
          options: ['h1', 'h2', 'h3', 'h6'],
          answer: 'h1',
        },
      },
      {
        id: 'paragraphs',
        title: 'Paragraphs & Line Breaks',
        concept: `The <p> tag creates a paragraph — the browser automatically adds spacing above and below it.\n\nIf you just want to move to the next line without starting a new paragraph, use <br>. And if you want a horizontal dividing line, use <hr>.`,
        demo: {
          type: 'picker',
          label: 'See how text elements work:',
          options: [
            { label: '<p>', html: '<p>First paragraph.</p><p>Second paragraph.</p>', note: 'Each p gets its own block with spacing' },
            { label: '<br>', html: '<p>Line one.<br>Line two.<br>Line three.</p>', note: 'br breaks the line without new paragraph' },
            { label: '<hr>', html: '<p>Above the line</p><hr><p>Below the line</p>', note: 'hr draws a horizontal rule' },
            { label: 'Combined', html: '<h2>Title</h2><p>Intro text here.</p><hr><p>After the divider.</p>', note: 'Typical page structure' },
          ],
        },
      },
      {
        id: 'formatting',
        title: 'Text Formatting',
        concept: `HTML has several tags for formatting inline text — text within a paragraph or sentence.\n\nSome tags are semantic (they carry meaning) and some are purely visual. For example, <strong> means "this is important" (browsers make it bold), while <b> is just visually bold with no extra meaning.`,
        demo: {
          type: 'toggle',
          base: 'This is a sentence with formatted text inside it.',
          label: 'Toggle formatting tags:',
          toggles: [
            { label: '<strong>', wrap: ['<strong>', '</strong>'], note: 'Important / bold' },
            { label: '<em>', wrap: ['<em>', '</em>'], note: 'Emphasis / italic' },
            { label: '<mark>', wrap: ['<mark>', '</mark>'], note: 'Highlighted' },
            { label: '<del>', wrap: ['<del>', '</del>'], note: 'Strikethrough' },
            { label: '<small>', wrap: ['<small>', '</small>'], note: 'Smaller text' },
          ],
        },
        challenge: {
          prompt: 'Which tag makes text bold AND signals importance to search engines?',
          options: ['<b>', '<strong>', '<em>', '<mark>'],
          answer: '<strong>',
        },
      },
      {
        id: 'links',
        title: 'Links',
        concept: `The <a> (anchor) tag creates links. The href attribute sets the destination.\n\nLinks can go to other pages, sections on the same page (using #id), email addresses (mailto:), or phone numbers (tel:). The target="_blank" attribute opens the link in a new tab.`,
        demo: {
          type: 'picker',
          label: 'Different types of links:',
          options: [
            { label: 'External link', html: '<a href="https://webdevpuneet.com">Visit webdevpuneet.com</a>', note: 'Goes to another website' },
            { label: 'New tab', html: '<a href="https://webdevpuneet.com" target="_blank">Opens in new tab ↗</a>', note: 'target="_blank" opens new tab' },
            { label: 'Email link', html: '<a href="mailto:hello@example.com">Send an email</a>', note: 'Opens the mail app' },
            { label: 'Phone link', html: '<a href="tel:+1234567890">Call us</a>', note: 'Tappable on mobile' },
            { label: 'Anchor link', html: '<a href="#section">Jump to section</a>', note: '# links to an id on the same page' },
          ],
        },
        challenge: {
          prompt: 'Which attribute tells a link where to go?',
          options: ['src', 'href', 'target', 'url'],
          answer: 'href',
        },
      },
      {
        id: 'quotes-code',
        title: 'Quotes & Code',
        concept: `HTML has specific tags for quoting content and displaying code.\n\n<blockquote> is for longer quotes from another source. <q> is for short inline quotes (adds quotation marks automatically). <code> marks inline code snippets, and <pre> preserves whitespace and line breaks — perfect for showing blocks of code.`,
        demo: {
          type: 'picker',
          label: 'Explore quote and code tags:',
          options: [
            { label: '<blockquote>', html: '<blockquote style="border-left:4px solid #6366f1;margin:0;padding:8px 16px;color:#4b5563"><p>"The best way to predict the future is to invent it."</p><cite>— Alan Kay</cite></blockquote>', note: 'For longer quotes from external sources' },
            { label: '<q>', html: '<p>As Einstein said, <q>Imagination is more important than knowledge.</q></p>', note: 'Inline quote — browser adds quotation marks' },
            { label: '<code>', html: '<p>Use the <code>console.log()</code> function to debug JavaScript.</p>', note: 'Inline code snippet' },
            { label: '<pre>', html: '<pre style="background:#f1f5f9;padding:12px;border-radius:6px">function hello() {\n  console.log("Hello!");\n}</pre>', note: 'Preserves whitespace and line breaks' },
          ],
        },
      },
      {
        id: 'special-text',
        title: 'Superscript & Subscript',
        concept: `<sup> raises text above the baseline (superscript) and <sub> lowers it below (subscript).\n\nThese are used for mathematical formulas, chemical equations, footnotes, and ordinal indicators like 1st or 2nd.`,
        demo: {
          type: 'picker',
          label: 'See superscript and subscript:',
          options: [
            { label: 'sup — exponents', html: '<p>E = mc<sup>2</sup></p>', note: 'Superscript for powers/exponents' },
            { label: 'sub — chemistry', html: '<p>Water is H<sub>2</sub>O</p>', note: 'Subscript for chemical formulas' },
            { label: 'Ordinal numbers', html: '<p>She came 1<sup>st</sup> in the race</p>', note: 'Superscript for ordinals' },
            { label: 'Footnote', html: '<p>This is a claim<sup>[1]</sup> that needs a source.</p>', note: 'Superscript for footnote references' },
          ],
        },
      },
    ],
  },
  {
    id: 'lists',
    title: 'Lists',
    emoji: '📋',
    lessons: [
      {
        id: 'unordered',
        title: 'Unordered Lists',
        concept: `An unordered list (<ul>) shows items with bullet points — the order doesn't matter.\n\nEach item inside a list is an <li> (list item). You can nest lists inside other lists to create sub-lists.`,
        demo: {
          type: 'picker',
          label: 'Explore list styles:',
          options: [
            { label: 'Basic list', html: '<ul>\n  <li>Apples</li>\n  <li>Oranges</li>\n  <li>Bananas</li>\n</ul>' },
            { label: 'Nested list', html: '<ul>\n  <li>Fruits\n    <ul>\n      <li>Apples</li>\n      <li>Oranges</li>\n    </ul>\n  </li>\n  <li>Vegetables</li>\n</ul>' },
            { label: 'With links', html: '<ul>\n  <li><a href="#">Home</a></li>\n  <li><a href="#">About</a></li>\n  <li><a href="#">Contact</a></li>\n</ul>' },
          ],
        },
      },
      {
        id: 'ordered',
        title: 'Ordered Lists',
        concept: `An ordered list (<ol>) shows items with numbers — use it when the order matters, like steps in a recipe or ranked items.\n\nYou can change the numbering style with the type attribute, or start from a different number with start.`,
        demo: {
          type: 'picker',
          label: 'Try different ordered list styles:',
          options: [
            { label: 'Numbers (default)', html: '<ol>\n  <li>First step</li>\n  <li>Second step</li>\n  <li>Third step</li>\n</ol>' },
            { label: 'Letters (type="a")', html: '<ol type="a">\n  <li>Option A</li>\n  <li>Option B</li>\n  <li>Option C</li>\n</ol>' },
            { label: 'Roman (type="I")', html: '<ol type="I">\n  <li>First</li>\n  <li>Second</li>\n  <li>Third</li>\n</ol>' },
            { label: 'Start from 5', html: '<ol start="5">\n  <li>Step 5</li>\n  <li>Step 6</li>\n  <li>Step 7</li>\n</ol>' },
          ],
        },
      },
    ],
  },
  {
    id: 'structure',
    title: 'Structure',
    emoji: '🏛️',
    lessons: [
      {
        id: 'block-inline',
        title: 'Block vs Inline',
        concept: `Every HTML element is either block-level or inline.\n\nBlock elements start on a new line and take up the full available width: <div>, <p>, <h1>–<h6>, <ul>, <section>. Inline elements sit within the text flow without breaking onto a new line: <span>, <a>, <strong>, <em>, <img>.`,
        demo: {
          type: 'picker',
          label: 'See the difference:',
          options: [
            { label: 'Block elements', html: '<div style="background:#e0f2fe;padding:6px;margin-bottom:4px">div — block</div><p style="background:#fce7f3;padding:6px;margin-bottom:4px">p — block</p><h3 style="background:#fef9c3;padding:6px;margin:0">h3 — block</h3>', note: 'Each block element starts on its own line' },
            { label: 'Inline elements', html: '<p>This is <strong style="background:#fce7f3">strong</strong>, this is <em style="background:#e0f2fe">em</em>, and this is a <a href="#" style="background:#fef9c3">link</a> — all inline.</p>', note: 'Inline elements flow within the text' },
            { label: 'Block inside block', html: '<div style="background:#f1f5f9;padding:10px;border-radius:6px"><p style="background:#e0f2fe;padding:6px;margin-bottom:6px">First paragraph</p><p style="background:#fce7f3;padding:6px;margin:0">Second paragraph</p></div>', note: 'Block elements can contain other blocks' },
            { label: 'Inline inside block', html: '<p>A paragraph (block) containing <strong>bold</strong>, <em>italic</em>, and a <a href="#">link</a> (all inline).</p>', note: 'Block elements contain inline content' },
          ],
        },
        challenge: {
          prompt: 'Which of these is a block-level element?',
          options: ['<span>', '<strong>', '<a>', '<div>'],
          answer: '<div>',
        },
      },
      {
        id: 'div-span',
        title: 'Div & Span',
        concept: `<div> and <span> are generic containers with no visual meaning on their own — they're used to group elements so you can style or target them.\n\n<div> is a block element (takes full width, starts on a new line). <span> is inline (sits within text without breaking the flow). Together they are the backbone of CSS layouts.`,
        demo: {
          type: 'picker',
          label: 'See div vs span in action:',
          options: [
            { label: 'div (block)', html: '<div style="background:#e0f2fe;padding:8px">I am a div</div><div style="background:#fce7f3;padding:8px">I am another div</div>', note: 'Each div starts on a new line' },
            { label: 'span (inline)', html: '<p>I have a <span style="color:blue">blue word</span> and a <span style="color:red">red word</span> inline.</p>', note: 'Spans sit within the text flow' },
            { label: 'Grouped div', html: '<div style="border:2px solid #6366f1;padding:12px;border-radius:8px"><h3 style="margin:0 0 6px">Card Title</h3><p style="margin:0">Card content here.</p></div>', note: 'div groups elements into a card' },
          ],
        },
      },
      {
        id: 'semantic',
        title: 'Semantic HTML',
        concept: `Semantic HTML uses tags that describe their purpose — not just how they look. This helps search engines, screen readers, and other developers understand your page structure.\n\nInstead of wrapping everything in <div>, use meaningful tags: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>.`,
        demo: {
          type: 'picker',
          label: 'Compare semantic vs generic markup:',
          options: [
            { label: '<header>', html: '<header style="background:#1e293b;color:white;padding:12px 16px"><strong>My Website</strong></header>', note: 'Site header / branding area' },
            { label: '<nav>', html: '<nav style="background:#f1f5f9;padding:10px 16px"><a href="#" style="margin-right:16px">Home</a><a href="#" style="margin-right:16px">About</a><a href="#">Contact</a></nav>', note: 'Navigation links' },
            { label: '<main>', html: '<main style="padding:16px"><h1>Page Title</h1><p>Main page content goes here.</p></main>', note: 'Primary page content' },
            { label: '<article>', html: '<article style="border:1px solid #e2e8f0;border-radius:8px;padding:14px"><h2 style="margin:0 0 8px">Blog Post Title</h2><p>Self-contained content like a blog post.</p></article>', note: 'Self-contained piece of content' },
            { label: '<footer>', html: '<footer style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:12px 16px;font-size:13px;color:#64748b">© 2026 My Website. All rights reserved.</footer>', note: 'Site footer' },
          ],
        },
      },
    ],
  },
  {
    id: 'media',
    title: 'Media',
    emoji: '🖼️',
    lessons: [
      {
        id: 'images',
        title: 'Images',
        concept: `The <img> tag embeds an image. It has two required attributes:\n\n• src — the URL or path to the image\n• alt — a text description used by screen readers and shown if the image fails to load\n\nAlways include alt text — it's important for accessibility and SEO.`,
        demo: {
          type: 'picker',
          label: 'Explore image attributes:',
          options: [
            { label: 'Basic image', html: '<img src="https://picsum.photos/300/150" alt="A random photo">', note: 'src and alt are essential' },
            { label: 'With dimensions', html: '<img src="https://picsum.photos/300/150" alt="Photo" width="150" height="75">', note: 'width & height prevent layout shift' },
            { label: 'Rounded', html: '<img src="https://picsum.photos/150/150" alt="Photo" style="border-radius:50%;width:100px;height:100px;object-fit:cover">', note: 'CSS can style images' },
            { label: 'With caption', html: '<figure>\n  <img src="https://picsum.photos/300/150" alt="Sample">\n  <figcaption>A sample photo from picsum.photos</figcaption>\n</figure>', note: 'figure + figcaption is semantic' },
          ],
        },
      },
      {
        id: 'video',
        title: 'Video',
        concept: `The <video> tag embeds a video player. Add the controls attribute to show play/pause buttons. The src attribute points to your video file.\n\nYou can also use multiple <source> tags inside <video> to provide different formats — the browser picks the first one it supports.`,
        demo: {
          type: 'picker',
          label: 'Explore video attributes:',
          options: [
            { label: 'Basic video', html: '<video width="320" controls>\n  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">\n  Your browser does not support video.\n</video>', note: 'controls adds play/pause/volume buttons' },
            { label: 'Autoplay + muted', html: '<video width="320" autoplay muted loop>\n  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">\n</video>', note: 'autoplay requires muted in modern browsers' },
            { label: 'With poster', html: '<video width="320" controls poster="https://picsum.photos/320/180">\n  <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">\n</video>', note: 'poster shows a thumbnail before play' },
          ],
        },
      },
      {
        id: 'iframe',
        title: 'iFrame Embeds',
        concept: `The <iframe> tag embeds another webpage inside your page. It's how you embed YouTube videos, Google Maps, Spotify players, and other third-party content.\n\nThe src attribute sets the URL to embed. width and height control its size. The title attribute is required for accessibility.`,
        demo: {
          type: 'picker',
          label: 'See iframe in action:',
          options: [
            { label: 'YouTube video', html: '<iframe width="400" height="225" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="YouTube video" frameborder="0" allowfullscreen></iframe>', note: 'Get embed code from YouTube → Share → Embed' },
            { label: 'Google Maps', html: '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.542!2d-0.1278!3d51.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzI2LjciTiAwwrAwNyc0MC4xIlc!5e0!3m2!1sen!2suk!4v1" width="400" height="250" style="border:0" allowfullscreen title="Map of London"></iframe>', note: 'Embed maps from Google Maps → Share → Embed' },
            { label: 'Basic iframe', html: '<iframe src="https://example.com" width="400" height="200" title="Example site" style="border:1px solid #e2e8f0;border-radius:6px"></iframe>', note: 'Not all sites allow embedding (X-Frame-Options)' },
          ],
        },
      },
      {
        id: 'audio',
        title: 'Audio',
        concept: `The <audio> tag embeds an audio player. Like <video>, it uses the controls attribute to show the player UI and src or <source> tags for the audio file.\n\nAudio is great for podcasts, music, or sound effects on a webpage.`,
        demo: {
          type: 'picker',
          label: 'Explore audio:',
          options: [
            { label: 'Basic audio', html: '<audio controls>\n  <source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg">\n  <source src="https://www.w3schools.com/html/horse.mp3" type="audio/mpeg">\n  Your browser does not support audio.\n</audio>', note: 'Multiple source formats for compatibility' },
            { label: 'With label', html: '<p>Listen to this:</p>\n<audio controls>\n  <source src="https://www.w3schools.com/html/horse.ogg" type="audio/ogg">\n</audio>', note: 'Always label your audio content' },
          ],
        },
      },
    ],
  },
  {
    id: 'forms',
    title: 'Forms',
    emoji: '📬',
    lessons: [
      {
        id: 'inputs',
        title: 'Input Types',
        concept: `The <input> element is the workhorse of HTML forms. The type attribute controls what kind of input it is — text, email, password, number, checkbox, radio, date, and many more.\n\nAlways pair inputs with a <label> for accessibility — the label describes what the input is for.`,
        demo: {
          type: 'picker',
          label: 'Try different input types:',
          options: [
            { label: 'text', html: '<label>Name<br><input type="text" placeholder="Enter your name"></label>' },
            { label: 'email', html: '<label>Email<br><input type="email" placeholder="you@example.com"></label>' },
            { label: 'password', html: '<label>Password<br><input type="password" placeholder="••••••••"></label>' },
            { label: 'number', html: '<label>Age<br><input type="number" min="1" max="120" value="25"></label>' },
            { label: 'checkbox', html: '<label><input type="checkbox"> I agree to the terms</label>' },
            { label: 'radio', html: '<p>Pick one:</p><label><input type="radio" name="size" value="s"> Small</label><br><label><input type="radio" name="size" value="m"> Medium</label><br><label><input type="radio" name="size" value="l"> Large</label>' },
            { label: 'date', html: '<label>Birthday<br><input type="date"></label>' },
            { label: 'range', html: '<label>Volume: <input type="range" min="0" max="100" value="50"></label>' },
            { label: 'color', html: '<label>Pick a colour<br><input type="color" value="#6366f1"></label>' },
          ],
        },
      },
      {
        id: 'form-structure',
        title: 'Form Structure',
        concept: `A complete HTML form uses the <form> tag as a wrapper, with inputs, labels, and a submit button inside.\n\nThe action attribute sets where the form data is sent. The method attribute is usually "get" or "post". Labels improve accessibility — use the for attribute on the label matching the input's id.`,
        demo: {
          type: 'picker',
          label: 'See different form layouts:',
          options: [
            { label: 'Contact form', html: '<form style="display:flex;flex-direction:column;gap:10px;max-width:300px">\n  <label>Name<br><input type="text" placeholder="Your name" style="width:100%"></label>\n  <label>Email<br><input type="email" placeholder="you@example.com" style="width:100%"></label>\n  <label>Message<br><textarea rows="3" placeholder="Your message..." style="width:100%"></textarea></label>\n  <button type="submit">Send Message</button>\n</form>' },
            { label: 'Login form', html: '<form style="display:flex;flex-direction:column;gap:10px;max-width:260px">\n  <h3 style="margin:0">Log In</h3>\n  <label>Email<br><input type="email" style="width:100%"></label>\n  <label>Password<br><input type="password" style="width:100%"></label>\n  <button type="submit" style="background:#6366f1;color:white;border:none;padding:8px;border-radius:4px;cursor:pointer">Log In</button>\n  <a href="#" style="font-size:12px">Forgot password?</a>\n</form>' },
            { label: 'Search form', html: '<form style="display:flex;gap:6px">\n  <input type="search" placeholder="Search..." style="flex:1;padding:8px;border:1px solid #cbd5e1;border-radius:6px">\n  <button type="submit" style="padding:8px 16px;background:#6366f1;color:white;border:none;border-radius:6px;cursor:pointer">Search</button>\n</form>' },
          ],
        },
      },
      {
        id: 'select-textarea',
        title: 'Select & Textarea',
        concept: `<select> creates a dropdown menu. Options inside it use the <option> tag. Group related options with <optgroup>.\n\n<textarea> creates a multi-line text input — perfect for messages or comments. You control its size with the rows and cols attributes, or via CSS.`,
        demo: {
          type: 'picker',
          label: 'Explore select and textarea:',
          options: [
            { label: 'Basic select', html: '<label>Country<br>\n  <select>\n    <option value="">Choose...</option>\n    <option value="us">United States</option>\n    <option value="uk">United Kingdom</option>\n    <option value="ca">Canada</option>\n  </select>\n</label>', note: 'select creates a dropdown' },
            { label: 'Grouped options', html: '<label>Category<br>\n  <select>\n    <optgroup label="Fruits">\n      <option>Apple</option>\n      <option>Banana</option>\n    </optgroup>\n    <optgroup label="Vegetables">\n      <option>Carrot</option>\n      <option>Broccoli</option>\n    </optgroup>\n  </select>\n</label>', note: 'optgroup groups related options' },
            { label: 'Multiple select', html: '<label>Skills (hold Ctrl to select multiple)<br>\n  <select multiple size="4">\n    <option>HTML</option>\n    <option>CSS</option>\n    <option>JavaScript</option>\n    <option>React</option>\n  </select>\n</label>', note: 'multiple allows selecting several options' },
            { label: 'Textarea', html: '<label>Message<br>\n  <textarea rows="5" cols="40" placeholder="Write your message here..."></textarea>\n</label>', note: 'textarea for multi-line text input' },
          ],
        },
      },
      {
        id: 'fieldset',
        title: 'Fieldset & Legend',
        concept: `<fieldset> groups related form fields together with a visible border. <legend> provides a caption for the group — it appears at the top of the fieldset border.\n\nThis is great for forms with multiple sections, like a shipping address group and a billing address group, improving both readability and accessibility.`,
        demo: {
          type: 'picker',
          label: 'See fieldset in use:',
          options: [
            { label: 'Basic fieldset', html: '<fieldset>\n  <legend>Personal Details</legend>\n  <label>Name<br><input type="text" placeholder="Your name"></label><br><br>\n  <label>Email<br><input type="email" placeholder="you@example.com"></label>\n</fieldset>', note: 'fieldset groups related fields' },
            { label: 'Radio group', html: '<fieldset>\n  <legend>Preferred contact method</legend>\n  <label><input type="radio" name="contact" value="email"> Email</label><br>\n  <label><input type="radio" name="contact" value="phone"> Phone</label><br>\n  <label><input type="radio" name="contact" value="post"> Post</label>\n</fieldset>', note: 'Perfect for grouping radio buttons' },
            { label: 'Multi-section form', html: '<form>\n  <fieldset style="margin-bottom:12px">\n    <legend>Account</legend>\n    <label>Username<br><input type="text"></label>\n  </fieldset>\n  <fieldset>\n    <legend>Security</legend>\n    <label>Password<br><input type="password"></label>\n  </fieldset>\n</form>', note: 'Multiple fieldsets divide long forms into sections' },
          ],
        },
      },
      {
        id: 'form-validation',
        title: 'Form Validation',
        concept: `HTML5 added built-in form validation — no JavaScript required for basic checks. Attributes like required, minlength, maxlength, min, max, and pattern validate input before submission.\n\nThe browser shows a native error message if validation fails. This is your first line of defence against incorrect data.`,
        demo: {
          type: 'picker',
          label: 'Try validation attributes (click Submit):',
          options: [
            { label: 'required', html: '<form><label>Name (required)<br><input type="text" required placeholder="Can\'t be empty"></label> <button type="submit">Submit</button></form>', note: 'Field must be filled before submitting' },
            { label: 'minlength', html: '<form><label>Password (min 8 chars)<br><input type="password" minlength="8" placeholder="At least 8 characters"></label> <button type="submit">Submit</button></form>', note: 'Enforces minimum character count' },
            { label: 'min + max', html: '<form><label>Age (18–100)<br><input type="number" min="18" max="100" value="25"></label> <button type="submit">Submit</button></form>', note: 'Clamps numeric input to a range' },
            { label: 'pattern', html: '<form><label>UK postcode<br><input type="text" pattern="[A-Z]{1,2}[0-9][0-9A-Z]?\\s?[0-9][A-Z]{2}" placeholder="e.g. SW1A 1AA" title="Enter a valid UK postcode"></label> <button type="submit">Submit</button></form>', note: 'pattern uses a regex to validate format' },
          ],
        },
        challenge: {
          prompt: 'Which attribute makes a form field mandatory?',
          options: ['mandatory', 'required', 'validate', 'must'],
          answer: 'required',
        },
      },
      {
        id: 'button-types',
        title: 'Button Types',
        concept: `The <button> element has a type attribute that controls what it does inside a form:\n\n• type="submit" — submits the form (default behaviour)\n• type="reset" — clears all form fields\n• type="button" — does nothing by default, used with JavaScript\n\nAlways specify the type explicitly to avoid unexpected behaviour.`,
        demo: {
          type: 'picker',
          label: 'Explore button types:',
          options: [
            { label: 'submit', html: '<form>\n  <input type="text" placeholder="Type something">\n  <button type="submit" style="margin-left:8px;padding:6px 14px;background:#6366f1;color:white;border:none;border-radius:4px;cursor:pointer">Submit</button>\n</form>', note: 'Submits the form when clicked' },
            { label: 'reset', html: '<form>\n  <input type="text" value="Delete me">\n  <button type="reset" style="margin-left:8px;padding:6px 14px;background:#f1f5f9;border:1px solid #cbd5e1;border-radius:4px;cursor:pointer">Reset</button>\n</form>', note: 'Clears all inputs back to defaults' },
            { label: 'button', html: '<button type="button" style="padding:8px 16px;background:#f59e0b;color:white;border:none;border-radius:4px;cursor:pointer" onclick="this.textContent=\'Clicked!\'">Click me</button>', note: 'No default action — used with JavaScript' },
            { label: 'Styled buttons', html: '<div style="display:flex;gap:8px;flex-wrap:wrap">\n  <button style="padding:8px 16px;background:#6366f1;color:white;border:none;border-radius:6px;cursor:pointer">Primary</button>\n  <button style="padding:8px 16px;background:white;color:#6366f1;border:2px solid #6366f1;border-radius:6px;cursor:pointer">Outline</button>\n  <button style="padding:8px 16px;background:transparent;color:#6366f1;border:none;cursor:pointer;text-decoration:underline">Ghost</button>\n  <button disabled style="padding:8px 16px;background:#e2e8f0;color:#94a3b8;border:none;border-radius:6px;cursor:not-allowed">Disabled</button>\n</div>', note: 'CSS makes any button style possible' },
          ],
        },
      },
    ],
  },
  {
    id: 'tables',
    title: 'Tables',
    emoji: '📊',
    lessons: [
      {
        id: 'basic-table',
        title: 'Table Structure',
        concept: `HTML tables are used for displaying tabular data — think spreadsheets, schedules, or comparison grids.\n\nA table is made of rows (<tr>) containing cells. Use <th> for header cells (bold, centred by default) and <td> for data cells. Wrap your header row in <thead> and data rows in <tbody> for semantic clarity.`,
        demo: {
          type: 'picker',
          label: 'See table variations:',
          options: [
            { label: 'Basic table', html: '<table border="1" cellpadding="8">\n  <thead>\n    <tr><th>Name</th><th>Role</th><th>City</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Alice</td><td>Designer</td><td>London</td></tr>\n    <tr><td>Bob</td><td>Developer</td><td>Berlin</td></tr>\n    <tr><td>Carol</td><td>Manager</td><td>Paris</td></tr>\n  </tbody>\n</table>' },
            { label: 'Styled table', html: '<table style="width:100%;border-collapse:collapse;font-size:14px">\n  <thead>\n    <tr style="background:#6366f1;color:white">\n      <th style="padding:10px;text-align:left">Product</th>\n      <th style="padding:10px;text-align:left">Price</th>\n      <th style="padding:10px;text-align:left">Stock</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr style="border-bottom:1px solid #e2e8f0"><td style="padding:10px">Widget A</td><td style="padding:10px">$12.99</td><td style="padding:10px">✓ In stock</td></tr>\n    <tr style="border-bottom:1px solid #e2e8f0;background:#f8fafc"><td style="padding:10px">Widget B</td><td style="padding:10px">$8.49</td><td style="padding:10px">✗ Out of stock</td></tr>\n    <tr><td style="padding:10px">Widget C</td><td style="padding:10px">$24.00</td><td style="padding:10px">✓ In stock</td></tr>\n  </tbody>\n</table>' },
          ],
        },
      },
      {
        id: 'table-spanning',
        title: 'Spanning Cells',
        concept: `The colspan attribute makes a cell span across multiple columns. The rowspan attribute makes a cell span multiple rows.\n\nThese are used to create complex table layouts like merged headers or cells that span a group of rows — useful for schedules, timetables, and comparison tables.`,
        demo: {
          type: 'picker',
          label: 'See colspan and rowspan:',
          options: [
            { label: 'colspan', html: '<table border="1" cellpadding="8" style="border-collapse:collapse">\n  <tr>\n    <th colspan="3" style="background:#6366f1;color:white">Full Year Sales</th>\n  </tr>\n  <tr>\n    <th>Q1</th><th>Q2</th><th>Q3</th>\n  </tr>\n  <tr>\n    <td>$10k</td><td>$14k</td><td>$12k</td>\n  </tr>\n</table>', note: 'colspan="3" spans across 3 columns' },
            { label: 'rowspan', html: '<table border="1" cellpadding="8" style="border-collapse:collapse">\n  <tr>\n    <td rowspan="2" style="background:#f0fdf4;font-weight:bold">Mon</td>\n    <td>9am — Meeting</td>\n  </tr>\n  <tr>\n    <td>10am — Workshop</td>\n  </tr>\n  <tr>\n    <td>Tue</td>\n    <td>9am — Review</td>\n  </tr>\n</table>', note: 'rowspan="2" spans across 2 rows' },
            { label: 'Combined', html: '<table border="1" cellpadding="8" style="border-collapse:collapse;width:100%">\n  <tr>\n    <th colspan="2" style="background:#6366f1;color:white">Schedule</th>\n  </tr>\n  <tr>\n    <td rowspan="2" style="background:#fef9c3">Morning</td>\n    <td>9am — Standup</td>\n  </tr>\n  <tr>\n    <td>10am — Development</td>\n  </tr>\n  <tr>\n    <td rowspan="2" style="background:#f0fdf4">Afternoon</td>\n    <td>1pm — Review</td>\n  </tr>\n  <tr>\n    <td>3pm — Planning</td>\n  </tr>\n</table>', note: 'colspan + rowspan combined' },
          ],
        },
        challenge: {
          prompt: 'Which attribute makes a cell span across multiple columns?',
          options: ['rowspan', 'colspan', 'cellspan', 'merge'],
          answer: 'colspan',
        },
      },
    ],
  },
  {
    id: 'advanced',
    title: 'Advanced',
    emoji: '⚡',
    lessons: [
      {
        id: 'details-summary',
        title: 'Details & Summary',
        concept: `<details> creates a native collapsible section — no JavaScript needed. The <summary> tag inside it provides the clickable heading. Clicking it toggles the rest of the content open or closed.\n\nThis is perfect for FAQs, accordions, and progressive disclosure of information.`,
        demo: {
          type: 'picker',
          label: 'See details in action:',
          options: [
            { label: 'Basic details', html: '<details>\n  <summary>Click to expand</summary>\n  <p>This content is hidden until you click the summary.</p>\n</details>', note: 'Native accordion — no JavaScript needed' },
            { label: 'Open by default', html: '<details open>\n  <summary>Already open</summary>\n  <p>The open attribute makes it start expanded.</p>\n</details>', note: 'Add "open" attribute to start expanded' },
            { label: 'FAQ style', html: '<details style="border:1px solid #e2e8f0;border-radius:8px;margin-bottom:8px">\n  <summary style="padding:12px;cursor:pointer;font-weight:600">What is HTML?</summary>\n  <p style="padding:0 12px 12px">HTML is the standard markup language for creating web pages.</p>\n</details>\n<details style="border:1px solid #e2e8f0;border-radius:8px">\n  <summary style="padding:12px;cursor:pointer;font-weight:600">Do I need to install anything?</summary>\n  <p style="padding:0 12px 12px">No — just a text editor and a web browser.</p>\n</details>', note: 'Style with CSS for a polished FAQ' },
          ],
        },
        challenge: {
          prompt: 'Which tag provides the clickable heading inside a <details> element?',
          options: ['<title>', '<caption>', '<summary>', '<label>'],
          answer: '<summary>',
        },
      },
      {
        id: 'data-attributes',
        title: 'data-* Attributes',
        concept: `data-* attributes let you store custom data directly on any HTML element. You can name them anything: data-user-id, data-color, data-price.\n\nThey're invisible to users but readable by JavaScript using element.dataset. This is useful for passing data from your HTML to your scripts without polluting the markup.`,
        demo: {
          type: 'picker',
          label: 'See data attributes:',
          options: [
            { label: 'Basic usage', html: '<div data-user-id="42" data-role="admin" style="background:#f1f5f9;padding:12px;border-radius:6px">\n  <strong>User card</strong>\n  <p style="font-size:12px;color:#64748b;margin:4px 0 0">Check DevTools → inspect this element to see data-user-id and data-role attributes.</p>\n</div>', note: 'data-* stores info invisible to users' },
            { label: 'Product data', html: '<div style="display:flex;gap:10px;flex-wrap:wrap">\n  <button data-product-id="1" data-price="9.99" style="padding:8px 14px;background:#6366f1;color:white;border:none;border-radius:6px;cursor:pointer" onclick="this.textContent=\'Added! (id: \'+this.dataset.productId+\' $\'+this.dataset.price+\')\'">Add to cart — $9.99</button>\n  <button data-product-id="2" data-price="19.99" style="padding:8px 14px;background:#6366f1;color:white;border:none;border-radius:6px;cursor:pointer" onclick="this.textContent=\'Added! (id: \'+this.dataset.productId+\' $\'+this.dataset.price+\')\'">Add to cart — $19.99</button>\n</div>', note: 'Click buttons to see dataset in action' },
            { label: 'Tooltip via CSS', html: '<style>[data-tooltip]{position:relative;cursor:help}[data-tooltip]:hover::after{content:attr(data-tooltip);position:absolute;bottom:100%;left:50%;transform:translateX(-50%);background:#1e293b;color:white;padding:4px 10px;border-radius:4px;font-size:12px;white-space:nowrap;margin-bottom:4px}</style>\n<p>Hover over <span data-tooltip="This is a tooltip!" style="text-decoration:underline;text-decoration-style:dotted">this word</span> to see a tooltip built entirely with data-* and CSS.</p>', note: 'CSS can read data-* using attr()' },
          ],
        },
      },
      {
        id: 'abbr-tooltip',
        title: 'Abbreviations & Tooltips',
        concept: `The <abbr> tag marks abbreviations and acronyms. The title attribute provides the full expansion — browsers show it as a tooltip on hover, and screen readers announce it.\n\nThis improves accessibility and helps readers who may not know the acronym.`,
        demo: {
          type: 'picker',
          label: 'See abbreviations:',
          options: [
            { label: 'Basic abbr', html: '<p>The <abbr title="HyperText Markup Language">HTML</abbr> specification is maintained by the <abbr title="World Wide Web Consortium">W3C</abbr>.</p><p style="font-size:12px;color:#64748b;margin-top:8px">Hover over the underlined abbreviations to see the tooltip.</p>', note: 'title="..." shows as a tooltip on hover' },
            { label: 'Technical writing', html: '<p>We use <abbr title="Application Programming Interface">API</abbr> calls to fetch data from the <abbr title="Content Delivery Network">CDN</abbr>, ensuring fast <abbr title="Time To First Byte">TTFB</abbr>.</p>', note: 'Especially useful in technical documentation' },
          ],
        },
      },
    ],
  },

  // ── Responsive Images ─────────────────────────────────────────────────────
  {
    id: 'responsive-images',
    title: 'Responsive Images',
    emoji: '🖼️',
    lessons: [
      {
        id: 'picture-srcset',
        title: '<picture> & srcset',
        concept: `<picture> lets the browser pick the best image based on screen size or format support. Inside it, <source> elements define candidates — the browser picks the first match.\n\nsrcset on <img> serves different resolutions of the same image. The browser picks the right one based on the device pixel ratio and viewport width — saving bandwidth on smaller screens.`,
        challenge: {
          prompt: 'Which attribute lets you provide multiple image sources for different screen sizes?',
          options: ['srclist', 'sources', 'srcset', 'alternatives'],
          answer: 'srcset',
        },
        demo: {
          type: 'picker',
          label: 'See responsive images:',
          options: [
            { label: 'srcset basics', html: `<img
  src="https://picsum.photos/400/200"
  srcset="
    https://picsum.photos/400/200 400w,
    https://picsum.photos/800/400 800w,
    https://picsum.photos/1200/600 1200w
  "
  sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
  alt="Responsive photo"
  style="width:100%;border-radius:8px"
/>
<p style="font-size:12px;color:#64748b;margin-top:8px">Browser picks the right size based on viewport width and device pixel ratio.</p>`, note: 'srcset + sizes = right image for every screen' },
            { label: '<picture> formats', html: `<picture>
  <!-- Modern browsers use WebP -->
  <source
    type="image/webp"
    srcset="https://picsum.photos/600/300"
  />
  <!-- Fallback for older browsers -->
  <img
    src="https://picsum.photos/600/300"
    alt="Picture element demo"
    style="width:100%;border-radius:8px"
  />
</picture>
<p style="font-size:12px;color:#64748b;margin-top:8px">&lt;picture&gt; lets you serve WebP to modern browsers, JPEG to older ones.</p>`, note: '<picture> picks best format the browser supports' },
            { label: 'Art direction', html: `<picture>
  <!-- Wide screens: landscape crop -->
  <source
    media="(min-width: 600px)"
    srcset="https://picsum.photos/800/300"
  />
  <!-- Narrow screens: portrait crop -->
  <img
    src="https://picsum.photos/300/400"
    alt="Art directed image"
    style="width:100%;border-radius:8px"
  />
</picture>
<p style="font-size:12px;color:#64748b;margin-top:8px">Different crops for different viewports — resize the panel to see it change.</p>`, note: 'Different crops for different screen sizes' },
          ],
        },
      },
      {
        id: 'lazy-loading',
        title: 'Lazy loading & performance',
        concept: `loading="lazy" defers image loading until the image is near the viewport — massively reducing initial page weight.\n\nfetchpriority="high" tells the browser to prioritise a critical image (like the hero/LCP image). decoding="async" lets the browser decode the image without blocking the main thread.\n\nThese three attributes together can dramatically improve Core Web Vitals.`,
        challenge: {
          prompt: 'Which attribute defers loading an image until it is near the viewport?',
          options: ['defer', 'async', 'loading="lazy"', 'preload'],
          answer: 'loading="lazy"',
        },
        demo: {
          type: 'picker',
          label: 'See loading attributes:',
          options: [
            { label: 'Lazy loading', html: `<!-- Images below the fold load only when near viewport -->
<img src="https://picsum.photos/600/200?1" alt="Lazy image 1" loading="lazy" style="width:100%;border-radius:8px;margin-bottom:8px" />
<img src="https://picsum.photos/600/200?2" alt="Lazy image 2" loading="lazy" style="width:100%;border-radius:8px;margin-bottom:8px" />
<img src="https://picsum.photos/600/200?3" alt="Lazy image 3" loading="lazy" style="width:100%;border-radius:8px" />
<p style="font-size:12px;color:#64748b;margin-top:8px">loading="lazy" — browser only fetches images when they're close to the viewport.</p>`, note: 'loading="lazy" reduces initial page weight' },
            { label: 'Priority hints', html: `<!-- Hero image: load eagerly and at high priority -->
<img
  src="https://picsum.photos/600/250"
  alt="Hero image"
  loading="eager"
  fetchpriority="high"
  decoding="async"
  style="width:100%;border-radius:8px;margin-bottom:8px"
/>
<p style="font-size:12px;color:#64748b">fetchpriority="high" — tells the browser this image is critical (e.g. LCP element). decoding="async" — decode off the main thread.</p>`, note: 'fetchpriority + decoding for critical images' },
            { label: 'Script loading', html: `<p style="font-family:monospace;font-size:13px;background:#f1f5f9;padding:14px;border-radius:8px;line-height:1.8">
<span style="color:#7c3aed">&lt;script&gt;</span> → blocks parsing ❌<br>
<span style="color:#2563eb">&lt;script defer&gt;</span> → runs after parse ✓<br>
<span style="color:#059669">&lt;script async&gt;</span> → runs as soon as loaded ✓<br>
<span style="color:#b45309">&lt;link rel="preload"&gt;</span> → fetch early, use later ✓
</p>
<p style="font-size:12px;color:#64748b;margin-top:8px">defer keeps execution order. async doesn't — use async for independent scripts only.</p>`, note: 'defer vs async vs preload for scripts' },
          ],
        },
      },
    ],
  },

  // ── Native Components ─────────────────────────────────────────────────────
  {
    id: 'native-components',
    title: 'Native Components',
    emoji: '🪟',
    lessons: [
      {
        id: 'dialog-element',
        title: '<dialog> element',
        concept: `The <dialog> element is a native browser modal. Open it with showModal() (blocks background with backdrop) or show() (non-modal). It traps focus automatically, responds to the Escape key, and can be styled with the ::backdrop pseudo-element.\n\nNo JavaScript modal library needed — this is built into every modern browser.`,
        challenge: {
          prompt: 'Which method opens a <dialog> as a modal with a backdrop?',
          options: ['dialog.open()', 'dialog.show()', 'dialog.showModal()', 'dialog.display()'],
          answer: 'dialog.showModal()',
        },
        demo: {
          type: 'picker',
          label: 'See dialog in action:',
          options: [
            { label: 'Basic modal', html: `<button onclick="document.getElementById('d1').showModal()"
  style="padding:8px 18px;background:#6366f1;color:white;border:none;border-radius:8px;cursor:pointer;font-size:14px">
  Open Modal
</button>

<dialog id="d1" style="border-radius:12px;border:none;padding:24px;max-width:320px;box-shadow:0 20px 60px rgba(0,0,0,0.3)">
  <h3 style="margin:0 0 8px;font-size:1rem">Native Dialog Modal</h3>
  <p style="color:#6b7280;font-size:0.875rem;margin:0 0 16px">Press Escape or click Close to dismiss. Focus is trapped automatically.</p>
  <button onclick="document.getElementById('d1').close()"
    style="padding:7px 16px;background:#6366f1;color:white;border:none;border-radius:6px;cursor:pointer;font-size:13px">
    Close
  </button>
</dialog>`, note: 'showModal() traps focus & adds backdrop' },
            { label: 'Styled backdrop', html: `<style>
#d2::backdrop {
  background: rgba(79, 70, 229, 0.4);
  backdrop-filter: blur(4px);
}
</style>

<button onclick="document.getElementById('d2').showModal()"
  style="padding:8px 18px;background:#6366f1;color:white;border:none;border-radius:8px;cursor:pointer;font-size:14px">
  Open with Styled Backdrop
</button>

<dialog id="d2" style="border-radius:12px;border:none;padding:24px;max-width:300px;box-shadow:0 25px 60px rgba(0,0,0,0.4)">
  <h3 style="margin:0 0 8px">Styled ::backdrop</h3>
  <p style="color:#6b7280;font-size:0.875rem;margin:0 0 16px">The backdrop is styled with CSS using the ::backdrop pseudo-element.</p>
  <button onclick="document.getElementById('d2').close()"
    style="padding:6px 14px;background:#6366f1;color:white;border:none;border-radius:6px;cursor:pointer;font-size:13px">
    Close
  </button>
</dialog>`, note: '::backdrop is a real CSS pseudo-element' },
          ],
        },
      },
      {
        id: 'inline-svg',
        title: 'Inline SVG',
        concept: `SVG (Scalable Vector Graphics) can be written directly in HTML. Inline SVG is resolution-independent, styleable with CSS, animatable, and accessible. Basic shapes: <rect>, <circle>, <line>, <path>, <text>.\n\nThe viewBox attribute defines the coordinate system. SVG scales perfectly at any size — ideal for icons, logos, and illustrations.`,
        demo: {
          type: 'picker',
          label: 'See inline SVG:',
          options: [
            { label: 'Basic shapes', html: `<svg width="300" height="120" viewBox="0 0 300 120" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="80" height="80" rx="8" fill="#6366f1" />
  <circle cx="175" cy="50" r="40" fill="#10b981" />
  <polygon points="270,10 300,90 240,90" fill="#f59e0b" />
</svg>
<p style="font-size:12px;color:#64748b;margin-top:8px">rect, circle, polygon — all vector shapes that scale perfectly at any size.</p>`, note: 'SVG shapes are resolution-independent' },
            { label: 'CSS animated icon', html: `<style>
  .spin { animation: spin 2s linear infinite; transform-origin: center; }
  @keyframes spin { to { transform: rotate(360deg); } }
  .pulse { animation: pulse 1.5s ease-in-out infinite; }
  @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
</style>

<svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
  <circle cx="60" cy="60" r="50" fill="none" stroke="#e5e7eb" stroke-width="8"/>
  <circle cx="60" cy="60" r="50" fill="none" stroke="#6366f1" stroke-width="8"
    stroke-dasharray="80 240" stroke-linecap="round" class="spin"/>
  <circle cx="60" cy="60" r="20" fill="#6366f1" class="pulse"/>
</svg>
<p style="font-size:12px;color:#64748b;margin-top:8px">SVG elements can be styled and animated with CSS — no images needed.</p>`, note: 'SVG + CSS animations = no image files' },
            { label: 'Accessible icon', html: `<!-- Accessible SVG icon with title and aria -->
<button style="display:flex;align-items:center;gap:8px;padding:8px 16px;background:#6366f1;color:white;border:none;border-radius:8px;cursor:pointer;font-size:14px">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2"
    role="img" aria-label="Download">
    <title>Download</title>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
  Download
</button>
<p style="font-size:12px;color:#64748b;margin-top:12px">role="img" + aria-label + &lt;title&gt; make the icon accessible to screen readers.</p>`, note: 'Add role, aria-label, and <title> for accessibility' },
          ],
        },
      },
      {
        id: 'aria-roles',
        title: 'ARIA roles & landmarks',
        concept: `ARIA (Accessible Rich Internet Applications) roles tell assistive technologies what an element is and what it does. Landmark roles like main, navigation, banner, and complementary let screen reader users jump between page regions.\n\nlive regions (aria-live) announce dynamic content changes. aria-label and aria-describedby connect labels to controls when a visible label isn't practical.`,
        challenge: {
          prompt: 'Which ARIA attribute announces dynamic content changes to screen readers?',
          options: ['aria-hidden', 'aria-live', 'aria-label', 'aria-role'],
          answer: 'aria-live',
        },
        demo: {
          type: 'picker',
          label: 'See ARIA in action:',
          options: [
            { label: 'Landmarks', html: `<header role="banner" style="background:#6366f1;color:white;padding:10px 16px;border-radius:8px 8px 0 0;font-weight:700;font-size:14px">
  role="banner" — site header
</header>
<nav role="navigation" aria-label="Main" style="background:#eef2ff;padding:8px 16px;font-size:13px;color:#4338ca">
  role="navigation" — nav landmark
</nav>
<main role="main" style="background:#f9fafb;padding:10px 16px;font-size:13px;color:#374151;border-left:1px solid #e5e7eb;border-right:1px solid #e5e7eb">
  role="main" — primary content
</main>
<footer role="contentinfo" style="background:#f3f4f6;color:#6b7280;padding:8px 16px;border-radius:0 0 8px 8px;font-size:12px">
  role="contentinfo" — site footer
</footer>
<p style="font-size:12px;color:#6b7280;margin-top:8px">Screen reader users can jump between these landmarks directly.</p>`, note: 'Landmarks let screen readers jump between sections' },
            { label: 'aria-live region', html: `<div aria-live="polite" aria-atomic="true" id="status"
  style="min-height:36px;padding:10px;background:#f0fdf4;border:1px solid #86efac;border-radius:8px;font-size:13px;color:#15803d;margin-bottom:10px">
  No updates yet
</div>
<button onclick="document.getElementById('status').textContent='✓ Form saved at '+new Date().toLocaleTimeString()"
  style="padding:7px 14px;background:#059669;color:white;border:none;border-radius:6px;cursor:pointer;font-size:13px">
  Save form
</button>
<p style="font-size:12px;color:#6b7280;margin-top:8px">aria-live="polite" — screen readers announce the change without interrupting the user.</p>`, note: 'aria-live announces dynamic changes' },
          ],
        },
      },
    ],
  },

  // ── Performance & Loading ──────────────────────────────────────────────────
  {
    id: 'performance',
    title: 'Performance & Loading',
    emoji: '⚡',
    lessons: [
      {
        id: 'resource-hints',
        title: 'Resource hints',
        concept: `Resource hints tell the browser to start work early — before resources are needed. \`rel="preconnect"\` opens a TCP connection to a domain. \`rel="dns-prefetch"\` resolves the DNS (lighter than preconnect). \`rel="preload"\` fetches a resource at high priority without executing it.\n\nThese tags go in \`<head>\` and can make pages feel significantly faster by eliminating cold-start latency for third-party fonts, APIs, and CDN assets.`,
        demo: {
          type: 'picker',
          label: 'Resource hint type:',
          options: [
            {
              label: 'preconnect',
              html: `<!-- Opens TCP/TLS connection to the domain early -->
<!-- Best for: Google Fonts, payment APIs, analytics -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

<!-- Effect: browser connects to fonts.googleapis.com immediately
     when the page starts loading — not when the CSS requests the font.
     Saves ~100–200ms of connection setup time. -->

<p style="font-size:13px;color:#374151;padding:16px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">
  <strong>Best for:</strong> Google Fonts, Stripe, Cloudflare, any third-party resource you definitely need on every page.
</p>`,
              note: 'Opens TCP+TLS connection early',
            },
            {
              label: 'dns-prefetch',
              html: `<!-- Lighter than preconnect — only resolves DNS -->
<!-- Use for: resources you might need, or many third-party origins -->
<link rel="dns-prefetch" href="https://cdn.example.com">
<link rel="dns-prefetch" href="https://analytics.example.com">

<!-- preconnect does dns-prefetch + TCP + TLS.
     dns-prefetch alone is useful when:
     - You have many third-party origins (preconnect is expensive per origin)
     - You're not sure you'll use the resource on every page
-->

<p style="font-size:13px;color:#374151;padding:16px;background:#fffbeb;border-radius:8px;border:1px solid #fde68a">
  <strong>Rule of thumb:</strong> preconnect for 2–3 critical origins. dns-prefetch for everything else.
</p>`,
              note: 'Resolves DNS only — lighter weight',
            },
            {
              label: 'preload',
              html: `<!-- Fetch a resource at HIGH priority before it's discovered in CSS/JS -->
<link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/hero-image.jpg" as="image">
<link rel="preload" href="/critical.js" as="script">

<!-- The 'as' attribute is required — it tells the browser what kind of
     resource it is so it can set the right priority and headers.

     Without preload: the browser discovers the font only after parsing
     CSS → downloading CSS → parsing @font-face → then fetching the font.
     With preload: font download starts in parallel with everything else. -->

<p style="font-size:13px;color:#374151;padding:16px;background:#f0f9ff;border-radius:8px;border:1px solid #bae6fd">
  <strong>Best for:</strong> LCP images, fonts used in above-the-fold content, critical JS modules.
</p>`,
              note: 'Fetches resource at high priority',
            },
          ],
        },
        challenge: {
          prompt: 'Which hint is most appropriate for 10 different third-party analytics domains?',
          options: ['preconnect', 'dns-prefetch', 'preload', 'modulepreload'],
          answer: 'dns-prefetch',
        },
      },
      {
        id: 'script-loading',
        title: 'Script loading strategies',
        concept: `Script loading strategy determines when the browser downloads and executes JavaScript. The wrong choice blocks HTML parsing, delaying the first render.\n\n\`defer\` downloads in parallel, runs after HTML is fully parsed — ideal for most scripts. \`async\` downloads in parallel but runs immediately when ready, potentially before HTML finishes — only for independent scripts. \`type="module"\` implies \`defer\` automatically.`,
        demo: {
          type: 'picker',
          label: 'Loading strategy:',
          options: [
            {
              label: 'No attribute (blocking)',
              html: `<!-- ❌ Default: blocks HTML parsing until downloaded & executed -->
<head>
  <script src="/app.js"></script>
  <!-- Browser stops here. Downloads app.js. Executes it. Then resumes HTML. -->
  <!-- If app.js is 200KB, the page is blank for that entire time. -->
</head>

<div style="font-size:13px;padding:14px;background:#fef2f2;border-radius:8px;border:1px solid #fecaca">
  <strong>Never do this</strong> unless the script must run before any HTML renders
  (e.g., a theme-setting script that prevents flash of wrong theme).
</div>`,
              note: 'Blocks HTML parsing — avoid',
            },
            {
              label: 'defer',
              html: `<!-- ✅ Download in parallel, execute AFTER HTML is fully parsed -->
<head>
  <script src="/app.js" defer></script>
  <!-- Browser: start downloading app.js while I continue parsing HTML.
       Run app.js only after the full DOM is ready.
       Multiple deferred scripts run in order. -->
</head>

<!-- Equivalent to putting the script at end of <body>,
     but better because download starts immediately. -->

<div style="font-size:13px;padding:14px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">
  <strong>Use defer for:</strong> almost all scripts. It's the correct default for any script that touches the DOM.
</div>`,
              note: 'Best default for most scripts',
            },
            {
              label: 'async',
              html: `<!-- Download in parallel, execute immediately when ready (any order) -->
<head>
  <script src="/analytics.js" async></script>
  <!-- Browser: download in parallel, run the moment it's ready.
       May run before OR after HTML parsing finishes.
       Multiple async scripts run in arrival order — NOT document order. -->
</head>

<!-- Use async ONLY for scripts that: -->
<!-- 1. Don't depend on the DOM -->
<!-- 2. Don't depend on other scripts -->
<!-- 3. Nothing else depends on them -->

<div style="font-size:13px;padding:14px;background:#fffbeb;border-radius:8px;border:1px solid #fde68a">
  <strong>Use async for:</strong> analytics, third-party widgets, independent tracking pixels.
</div>`,
              note: 'For independent scripts only',
            },
            {
              label: 'type="module"',
              html: `<!-- ES module — deferred by default, strict mode, own scope -->
<script type="module" src="/app.mjs"></script>
<!-- Always deferred — same as adding defer. -->
<!-- Strict mode on by default. -->
<!-- Module scope: variables don't leak to window. -->
<!-- Can use import/export syntax. -->
<!-- Each module is only executed once even if imported multiple times. -->

<script type="module">
  import { setupNav } from './nav.mjs';
  import { initTheme } from './theme.mjs';

  setupNav();
  initTheme();
</script>

<div style="font-size:13px;padding:14px;background:#f5f3ff;border-radius:8px;border:1px solid #ddd6fe">
  <strong>Use for:</strong> modern apps with ES modules. Also requires a server (no file:// protocol).
</div>`,
              note: 'ES modules — deferred automatically',
            },
          ],
        },
      },
      {
        id: 'priority-hints',
        title: 'Priority hints',
        concept: `Priority hints tell the browser how urgently to fetch a specific resource via the \`fetchpriority\` attribute. Use \`fetchpriority="high"\` on your LCP (Largest Contentful Paint) image to start loading it immediately. Use \`fetchpriority="low"\` on below-the-fold images or non-critical scripts.\n\nCombine with \`loading="lazy"\` on images below the fold — lazy loading skips the fetch entirely until the user scrolls near the image.`,
        demo: {
          type: 'picker',
          label: 'Priority control:',
          options: [
            {
              label: 'fetchpriority="high"',
              html: `<!-- LCP image — boost it so it loads first -->
<img
  src="https://picsum.photos/800/450"
  alt="Hero"
  fetchpriority="high"
  width="800"
  height="450"
  style="width:100%;border-radius:8px"
>

<!-- The browser assigns images "auto" priority by default.
     fetchpriority="high" promotes it to the highest queue.
     This can improve LCP by 100–400ms on fast connections. -->

<div style="font-size:13px;padding:14px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0;margin-top:10px">
  <strong>Also useful for:</strong> preloaded fonts (<code>link rel="preload" fetchpriority="high"</code>),
  critical API fetches in JavaScript (<code>fetch(url, { priority: 'high' })</code>).
</div>`,
              note: 'Boost LCP image priority',
            },
            {
              label: 'loading="lazy"',
              html: `<!-- Native lazy loading — browser skips images until near viewport -->
<img src="https://picsum.photos/600/300?above" alt="Above fold" width="400" height="300" style="width:100%;border-radius:8px;margin-bottom:8px">
<!-- ^ no lazy: loads immediately -->

<img
  src="https://picsum.photos/600/300?below"
  alt="Below fold"
  loading="lazy"
  width="400"
  height="300"
  style="width:100%;border-radius:8px"
>
<!-- ^ loads only when the user scrolls within ~1200px of the image -->

<!-- Always set width and height attributes on lazy images.
     Without them, the browser doesn't know how much space to reserve,
     causing layout shift (bad CLS) when the image finally loads. -->

<div style="font-size:13px;padding:14px;background:#fffbeb;border-radius:8px;border:1px solid #fde68a;margin-top:10px">
  <strong>Never use loading="lazy" on the LCP image</strong> — it delays the most important image.
</div>`,
              note: 'Skip loading until near viewport',
            },
            {
              label: 'decoding="async"',
              html: `<!-- Decoding="async" decodes the image off the main thread -->
<img
  src="https://picsum.photos/600/400"
  alt="Large photo"
  decoding="async"
  width="600"
  height="400"
  style="width:100%;border-radius:8px"
>

<!-- Browser behaviour:
     - Default (auto): may decode synchronously, blocking paint
     - decoding="async": decodes off the main thread, never blocks paint
     - decoding="sync": force synchronous decode (rarely useful)

     For most images below the fold or in sliders, async decoding
     keeps the main thread free for interactions. -->

<div style="font-size:13px;padding:14px;background:#f0f9ff;border-radius:8px;border:1px solid #bae6fd;margin-top:10px">
  Combine: <code>loading="lazy" decoding="async" width="x" height="y"</code> for all below-fold images.
</div>`,
              note: 'Decode image off main thread',
            },
          ],
        },
        challenge: {
          prompt: 'Which combination is correct for a below-the-fold product image?',
          options: [
            'fetchpriority="high" loading="lazy"',
            'loading="lazy" decoding="async" width="x" height="y"',
            'defer loading="lazy"',
            'fetchpriority="low" decoding="sync"',
          ],
          answer: 'loading="lazy" decoding="async" width="x" height="y"',
        },
      },
    ],
  },

  // ── SEO Essentials ─────────────────────────────────────────────────────────
  {
    id: 'seo-essentials',
    title: 'SEO Essentials',
    emoji: '🔍',
    lessons: [
      {
        id: 'social-meta',
        title: 'Open Graph & social meta',
        concept: `Open Graph tags control how a page appears when shared on social networks — the title, description, and image shown in a link preview. Add them inside \`<head>\`. The og:image should be at least 1200×630px.\n\nTwitter/X has its own card system using \`name\` (not \`property\`) meta tags. Include both OG and Twitter tags for full coverage.`,
        demo: {
          type: 'picker',
          label: 'Social platform:',
          options: [
            {
              label: 'Open Graph (Facebook/LinkedIn)',
              html: `<head>
  <!-- Core Open Graph tags — required -->
  <meta property="og:title"       content="Free CSS Playground — Learn CSS in Your Browser">
  <meta property="og:description" content="Interactive CSS lessons with a live editor. 60+ lessons from selectors to container queries.">
  <meta property="og:image"       content="https://webdevpuneet.com/og/css-playground.png">
  <meta property="og:url"         content="https://webdevpuneet.com/css-playground/">
  <meta property="og:type"        content="website">

  <!-- Optional but recommended -->
  <meta property="og:site_name"   content="webdevpuneet.com">
  <meta property="og:locale"      content="en_GB">
  <meta property="og:image:width"  content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt"    content="CSS Playground preview">
</head>

<div style="font-size:13px;padding:14px;background:#f0f9ff;border-radius:8px;border:1px solid #bae6fd">
  og:image is the most important tag — a missing or wrong image makes link previews look broken on every share.
</div>`,
              note: 'Controls Facebook, LinkedIn previews',
            },
            {
              label: 'Twitter/X cards',
              html: `<head>
  <!-- Twitter Card tags use name= (not property=) -->
  <meta name="twitter:card"        content="summary_large_image">
  <meta name="twitter:site"        content="@webdevpuneet">
  <meta name="twitter:title"       content="Free CSS Playground">
  <meta name="twitter:description" content="Interactive CSS lessons with a live editor.">
  <meta name="twitter:image"       content="https://webdevpuneet.com/og/css-playground.png">
  <meta name="twitter:image:alt"   content="CSS Playground screenshot">

  <!-- twitter:card values:
       summary             — small thumbnail, title, description
       summary_large_image — full-width image above the text (most used)
       app                 — for app download cards
       player              — for embedded video/audio -->
</head>

<div style="font-size:13px;padding:14px;background:#fffbeb;border-radius:8px;border:1px solid #fde68a">
  Twitter falls back to og:title / og:description / og:image if the twitter: tags are missing.
</div>`,
              note: 'Controls Twitter/X link previews',
            },
          ],
        },
      },
      {
        id: 'structured-data',
        title: 'Structured data — JSON-LD',
        concept: `Structured data uses the Schema.org vocabulary to describe page content in machine-readable format. Search engines use it to create rich results — star ratings, FAQs, breadcrumbs, event dates — directly in the search results page.\n\nThe recommended format is JSON-LD: a \`<script type="application/ld+json">\` tag in \`<head>\`. It doesn't require changing your HTML markup.`,
        demo: {
          type: 'picker',
          label: 'Schema type:',
          options: [
            {
              label: 'Article',
              html: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "CSS Grid vs Flexbox — When to Use Each",
  "description": "A practical guide to choosing between CSS Grid and Flexbox for layout problems.",
  "author": {
    "@type": "Person",
    "name": "webdevpuneet.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "webdevpuneet.com",
    "logo": { "@type": "ImageObject", "url": "https://webdevpuneet.com/logo.png" }
  },
  "datePublished": "2025-01-15",
  "dateModified": "2025-03-01",
  "image": "https://webdevpuneet.com/og/css-grid-vs-flexbox.png",
  "url": "https://webdevpuneet.com/blog/css-grid-vs-flexbox/"
}
</script>

<div style="font-size:13px;padding:14px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0;margin-top:10px">
  Articles with correct JSON-LD can appear in Google's Top Stories carousel and get rich preview snippets.
</div>`,
              note: 'Blog post / article schema',
            },
            {
              label: 'FAQPage',
              html: `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is the CSS Playground free?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — the CSS Playground is completely free with no account required. All lessons run in your browser."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need to install anything?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "No installation needed. Open the playground in any modern browser and start writing CSS immediately."
      }
    }
  ]
}
</script>

<div style="font-size:13px;padding:14px;background:#f5f3ff;border-radius:8px;border:1px solid #ddd6fe;margin-top:10px">
  FAQPage schema can earn accordion-style FAQ results directly in Google search — significantly expanding your SERP footprint.
</div>`,
              note: 'FAQ schema for accordion SERP results',
            },
          ],
        },
        challenge: {
          prompt: 'What format is recommended for structured data in HTML?',
          options: ['RDFa attributes', 'Microdata attributes', 'JSON-LD in a script tag', 'Meta tags'],
          answer: 'JSON-LD in a script tag',
        },
      },
    ],
  },
];
