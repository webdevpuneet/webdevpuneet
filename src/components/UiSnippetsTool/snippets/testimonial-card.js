const testimonialCard = {
    id: 'testimonial-card',
    title: 'Testimonial Card',
    category: 'cards',
    html: `<div class="scene">
  <div class="card">
    <div class="stars">★★★★★</div>
    <blockquote>"This tool saves me hours every week. The live preview is incredibly smooth — I can prototype an entire component in minutes."</blockquote>
    <div class="author">
      <div class="avatar">JD</div>
      <div class="info">
        <strong>Jamie Doe</strong>
        <span>Frontend Lead @ Acme Co.</span>
      </div>
    </div>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }

.card {
  background: #fff; border-radius: 20px; padding: 32px 28px; max-width: 400px;
  box-shadow: 0 4px 30px rgba(0,0,0,0.07); border: 1px solid #e2e8f0; position: relative;
}
.card::before { content: '"'; position: absolute; top: 16px; right: 24px; font-size: 80px; line-height: 1; color: #e2e8f0; font-family: Georgia, serif; }

.stars { color: #f59e0b; font-size: 16px; letter-spacing: 2px; margin-bottom: 16px; }
blockquote { font-size: 15px; line-height: 1.7; color: #334155; margin-bottom: 24px; font-style: italic; }

.author { display: flex; align-items: center; gap: 12px; }
.avatar { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff; font-size: 14px; font-weight: 700; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.info strong { display: block; font-size: 14px; font-weight: 700; color: #1e293b; }
.info span   { font-size: 12px; color: #64748b; }`,
    js: '',

  seo: {
    title: 'Testimonial Card — Free HTML CSS Snippet',
    description: 'Customer quote card with five stars, decorative quote mark and gradient avatar initials — pure CSS, no images. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Testimonial Card — Stars, Blockquote, Decorative Quote Mark & Author Row',
      description: `Testimonials are one of the most conversion-effective elements on any landing page — arrange several into a [testimonial slider](/ui-snippets/testimonial-slider/) or [testimonial masonry](/ui-snippets/testimonial-masonry/). Real user words carry more weight than any marketing copy. The design of the testimonial card determines whether the quote feels credible — a clean layout, a visible star rating, an identifiable author with a face or avatar, and appropriate typographic treatment of the quote all signal authenticity.

**The decorative quote mark**

\`.card::before { content: '"'; position: absolute; top: 16px; right: 24px; font-size: 80px; color: #e2e8f0; font-family: Georgia, serif; }\` places a large typographic quotation mark in the top-right corner of the card. It is purely decorative — the \`color: #e2e8f0\` light grey makes it a background texture rather than a foreground element. The \`font-family: Georgia\` is intentional: sans-serif quotation marks are ordinary characters; a serif font's curly quote (\`"\`) has the visual weight needed for this use.

**The star row**

Stars use Unicode ★ characters inside a \`color: #f59e0b\` amber container — for an interactive version, see the [star rating](/ui-snippets/star-rating/). The \`letter-spacing: 2px\` adds space between stars for readability. To show a 4-star rating, remove one star character. To use SVG stars, replace the text content with inline SVG elements.

**The blockquote element**

The quote uses \`<blockquote>\` — semantically correct for a cited quotation. \`font-style: italic\` and \`line-height: 1.7\` are standard typographic conventions for testimonial copy. The \`color: #334155\` dark slate is legible but slightly softer than black.

**The author row**

The author section uses flexbox with \`gap: 12px\`. The avatar is a gradient circle with initials — the same pattern as the Profile Card snippet. Replace the \`<div class="avatar">\` with \`<img class="avatar">\` and \`object-fit: cover; border-radius: 50%\` for a real photo. The \`.info\` div stacks the name and role vertically with \`display: block\` on the \`<strong>\`.

**The blockquote and cite pattern**

The testimonial uses semantic HTML5 elements: <blockquote> for the quote text and <cite> inside <figure> or <footer> for the attribution. Search engines and screen readers understand this markup — Google's rich result documentation recognises blockquote and cite for testimonial content. The quote marks are added via CSS ::before on blockquote using content: '"' rather than HTML entity characters.

**The star rating display**

The five stars use the ★ Unicode character in a .stars span with letter-spacing and amber colour. CSS ensures all five stars are always shown but at different opacities: filled stars at full opacity, empty stars at 20% opacity. Compute filled vs empty from a rating value: for (let i=0; i<5; i++) stars += (i < rating ? '★' : '☆').

**The avatar and author row**

The author section uses display: flex; align-items: center; gap: 12px. The avatar is a 44px circle with the person's initials or a real photo. The name and title sit in a flex column at font-size: 14px and 12px respectively. This compact layout fits neatly inside a card footer without taking space away from the quote.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Load the snippet',
          text: 'Click "Testimonial Card" in the sidebar. The preview shows the card with stars, quote, decorative mark, and author row.',
        },
        {
          title: 'Update the quote text',
          text: 'In the HTML panel, replace the blockquote text with your customer testimonial. Keep the <blockquote> element for semantic correctness.',
        },
        {
          title: 'Update the author details',
          text: 'Change the .avatar initials, .info strong (name), and .info span (role or company) in the HTML panel.',
        },
        {
          title: 'Adjust the star count',
          text: 'In the HTML panel, add or remove ★ characters inside .stars to show 1–5 stars.',
        },
        {
          title: 'Replace initials with a photo',
          text: 'Replace <div class="avatar">XY</div> with <img class="avatar" src="photo.jpg" alt="Name" />. Add object-fit: cover; border-radius: 50% in the CSS.',
        },
        {
          title: 'Export in your format',
          text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.',
        },
      ],
    },
    features: [
      'Large decorative quote mark via ::before with position: absolute — purely typographic, no image',
      'Serif font (Georgia) for the quotation mark for authentic typographic weight',
      'Five amber Unicode ★ stars with letter-spacing for star row spacing',
      'Semantic <blockquote> element with italic font-style',
      'Gradient avatar circle with initials — same pattern as Profile Card',
      'Author name + role stacked vertically in a flex row with gap',
      'Soft box-shadow and subtle border for card depth without heaviness',
      'Pure HTML and CSS — no JavaScript required',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      {
        icon: 'STAR',
        title: 'Landing page social proof sections',
        desc: 'Place 2–3 testimonial cards in a grid or carousel on a landing page. Real customer quotes with names and roles build trust faster than any marketing copy.',
      },
      {
        icon: 'APP',
        title: 'Product and SaaS review showcases',
        desc: 'Display hand-picked reviews from G2, Trustpilot, or Capterra on your product page. The star rating and company attribution signal third-party credibility.',
      },
      {
        icon: 'DESIGN',
        title: 'Agency and freelancer case study quotes',
        desc: 'Include a client quote on each case study page. The card format gives the quote visual presence without a full-width pull quote that breaks the reading flow.',
      },
      {
        icon: 'FLOW',
        title: 'Checkout and pricing page trust signals',
        desc: 'Place a testimonial card near the CTA button on a pricing or checkout page. A relevant customer quote at the decision point reduces checkout abandonment.',
      },
      {
        icon: 'LEARN',
        title: 'Learn ::before decorative typography',
        desc: 'The large quote mark uses content: open-quote on a positioned pseudo-element. Edit the font-size, colour, and position in the CSS panel to understand decorative pseudo-element placement.',
      },
      {
        icon: 'CODE',
        title: 'Build a testimonial carousel or grid',
        desc: 'Use this card as the base component for a testimonial carousel or responsive grid. The fixed max-width and self-contained layout make it easy to duplicate and map over a data array.',
      },
    ],
    faqs: [
      {
        q: 'How is the large decorative quotation mark created?',
        a: '.card::before uses content: "\\201C" (or the curly quote character directly), position: absolute, top and right placement, font-size: 80px, and color: #e2e8f0. Georgia serif is used because its curly quotes have the proper typographic weight. The light color makes it background-like rather than competing with the quote text.',
      },
      {
        q: 'How do I show a 4-star rating instead of 5?',
        a: 'Remove one ★ character from the .stars span in the HTML. The remaining stars inherit the amber color automatically. For a more precise rating like 4.5 stars, use a half-star SVG or a fractional width clip on the fifth star.',
      },
      {
        q: 'How do I replace the initials avatar with a photo?',
        a: 'Replace the <div class="avatar">XY</div> with <img class="avatar" src="your-photo.jpg" alt="Author name" />. In the CSS panel, add object-fit: cover to the .avatar rule and remove the background and color declarations. The border-radius: 50% and dimensions keep the circular shape.',
      },
      {
        q: 'How do I build a testimonial grid with multiple cards?',
        a: 'Wrap multiple .card elements in a CSS Grid container: display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px. Each card will sit in its own column and the grid reflows automatically to fewer columns on narrower screens.',
      },
      {
        q: 'Should I use <blockquote> for testimonials?',
        a: 'Yes. <blockquote> is the semantically correct element for quoted content from an external source. Screen readers may announce it differently from paragraph text, and it can be targeted by search engines looking for citation-style content. Add a <cite> element inside for the author attribution.',
      },
      {
        q: 'Can I use this testimonial card in React?',
        a: 'Yes. Click "JSX" to download a React component. Convert the card into a reusable Testimonial component with props for stars, quote, name, role, and initials. Map over a testimonials array to render multiple cards in a grid or carousel.',
      },
    ],
    aiPrompt: {
      paragraph: `You don't have to puzzle out the decorative quote mark on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the giant quotation mark is implemented as a positioned ::before pseudo-element in a serif font rather than an inline character in the markup, and why the star row uses plain Unicode characters instead of SVG or an icon font. The same assistant can help optimize it — for instance whether the fixed 80px pseudo-element quote mark scales awkwardly at very small or very large card widths, or whether a fractional star rating (like 4.5) needs a different technique than simply removing a character. It's also useful for extending the card: ask it to turn it into a reusable component that accepts a rating number and renders filled versus empty stars automatically, add a real photo avatar with a graceful initials fallback, or build a responsive grid of many of these cards. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "testimonial card" in plain HTML and CSS with no JavaScript, using a decorative pseudo-element quote mark and semantic markup.

Requirements:
- A single card element containing, in order: a row of star-rating characters, a semantically correct blockquote element holding the quote text, and an author section with an avatar, name, and role/company line.
- A large decorative quotation mark rendered via a ::before pseudo-element on the card (not as literal text in the HTML), absolutely positioned in a corner of the card, sized much larger than the body text, colored as a faint background tint rather than a foreground element, and set in a serif font family specifically because serif curly quotation marks carry more visual weight than a sans-serif quote character.
- The star rating must use plain Unicode star characters in a single span with letter-spacing for visual separation, styled in an accent color, structured so that showing a 4-star rating instead of 5 is just a matter of removing one character (or reducing opacity on a trailing star) without restructuring the markup.
- The avatar must be a circular element showing the author's initials on a CSS gradient background, structured so it can be swapped for a real photo element with object-fit cover and no other layout changes.
- The card must use box-shadow and a subtle border for depth, and the blockquote text must be styled in italic with generous line-height for readability, with the whole layout capped at a maximum width so it reads well as a single card or as one tile in a responsive grid of many such cards.`,
    },
  },
};

export default testimonialCard;
