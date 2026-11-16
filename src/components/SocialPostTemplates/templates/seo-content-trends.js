/* SEO text for the trend-led template batch of 2026-11-16 (Black Friday, Tier List, Comment to Get,
   Red Flag / Green Flag, Receipt). One hand-written entry per template, merged into TEMPLATE_SEO and TEMPLATE_WHY. */

export const TEMPLATE_SEO_TREND = {
  'black-friday': {
    keywords: ['black friday post template', 'black friday instagram post', 'black friday sale graphic', 'black friday social media template', 'black friday promo code post'],
    about: {
      title: 'Black Friday Post Template — A Price-Tag Sale Graphic for Your Feed',
      description: `**Black Friday** is the one weekend when every feed is full of sale posts, so a plain "50% off" image disappears in seconds. **Black Friday Sale** is a free post template built to be noticed: a giant stacked headline, rolling caution tape and a yellow price tag that swings as it counts up your discount.

**Pure black, one loud colour**

The background is solid black with a single hazard yellow, the same two colours used on real warehouse signs. That contrast survives a small phone screen and a fast scroll. "Black" sits in white and "Friday" in yellow, so the date reads before anything else. A small label strip above ("Biggest sale of the year") sets the tone, and you can change it to "Early access" or "Members first".

**A price tag that carries the number**

The discount lives on a hanging tag with a punched hole and a short string. In the video export the tag sways and the figure counts up from zero, which draws the eye to the one number that matters. Type "UP TO 60% OFF", "BUY 1 GET 1" or "FROM $9" and the figure scales to fit the tag.

**Code, dates and handle**

Below the offer line sits a dashed promo-code box that gently pulses, then the sale dates and your handle with an optional logo. Two bands of caution tape run along the top and bottom edges and slide sideways in the animated export.

**Sizes**

Portrait suits the feed, the Story size keeps the headline and tag clear of the top and bottom overlays, and the landscape sizes work for X, LinkedIn and Facebook. Black Friday falls on 27 November in 2026, so publish a teaser a week early, the main post at midnight, and a last-chance post using [Cyber Monday](/social-post-templates/cyber-monday/) or [Holiday Sale](/social-post-templates/holiday-sale/) to keep the campaign going.`,
    },
    features: [
      'Giant stacked "Black Friday" headline with the second word in yellow',
      'Swinging price tag with a punched hole and string, discount counts up in the video',
      'Two bands of rolling caution tape along the top and bottom edges',
      'Editable top label strip, offer line, promo code and sale dates',
      'Dashed promo-code box that pulses to draw the eye',
      'Optional logo and handle in the footer',
      'Safe margins for Story, with matching portrait, square and wide sizes',
      'Three colours (background, text, tape and tag) can be changed to match your brand',
    ],
    useCases: [
      { icon: '🛍', title: 'Online shop sale announcement', desc: 'Post your Black Friday discount, promo code and sale dates in one image, then reuse it as the Story and the Facebook post.' },
      { icon: '💻', title: 'Software and course deals', desc: 'Show a yearly-plan discount on the tag and put the coupon in the code box for SaaS, templates, courses and digital downloads.' },
      { icon: '⏰', title: 'Teaser and last-chance posts', desc: 'Change the top strip to "Starts Friday" a week early and "Final hours" on Sunday so one design covers the whole campaign.' },
      { icon: '🏪', title: 'Local and in-store offers', desc: 'Swap the promo code for "Show this post in store" and add opening hours in the dates line for a shop with a physical door.' },
    ],
    faqs: [
      { q: 'When is Black Friday in 2026?', a: 'Black Friday is the day after US Thanksgiving, which is Friday 27 November 2026. Cyber Monday follows on 30 November. Post a teaser a week ahead and publish the main post at midnight on the day.' },
      { q: 'What should a Black Friday post include?', a: 'The size of the discount, what it applies to, the code if there is one, and when it ends. This template has a place for each, so nothing is left to the caption.' },
      { q: 'Can I change the yellow and black colours?', a: 'Yes. Background, text and the tape and tag colour are editable, so you can match your own brand. Keep strong contrast between the tag colour and the background so the number stays readable.' },
      { q: 'Does it work for a sale that is not 60% off?', a: 'The discount field takes any short text, such as "BUY 1 GET 1", "FROM $9" or "£20 OFF". The text shrinks to fit the tag, and the "Up to" line above it can be cleared or reworded.' },
      { q: 'How is it different from the Cyber Monday template?', a: 'Cyber Monday is a neon terminal window for tech and digital deals. Black Friday Sale is a high-contrast price-tag and caution-tape design for any shop, so the two can run back to back without looking alike.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Black Friday HTML and CSS: write urgency copy for the offer line, create a five-post countdown campaign from the same design, or recolour the tape for a brand that is not black and yellow.',
      prompt: `Create a 1080×1350 Black Friday sale post in plain HTML and CSS.

- Solid near-black background (#0a0a0a) with two diagonal hazard-tape bands (yellow #ffd60a and black stripes at 45 degrees), one near the top rotated -2 degrees and one near the bottom rotated 1.6 degrees.
- A small yellow label strip at top left in uppercase condensed type: "Biggest sale of the year".
- A giant stacked headline "BLACK" in white and "FRIDAY" in yellow, in a tall condensed sans such as Anton, line-height 1.1.
- To the right of the headline, a yellow price tag hanging from a short grey string: a rectangle with the top corners cut off (clip-path), a dark round hole near the top, a small "UP TO" line and "60% OFF" in the same condensed type, with a faint yellow glow.
- Below, an offer line in white semibold ("Every product. No exclusions.") with the last sentence in yellow, then a "USE CODE" label next to a yellow dashed-border box containing "BLACK60" in wide-spaced condensed type.
- A footer row: the sale dates in yellow on the left, the brand handle on the right. Keep clear of the tape bands.`,
    },
  },

  'tier-list': {
    keywords: ['tier list post template', 'tier list maker instagram', 'tier list template free', 'ranking post template', 's tier a tier b tier graphic'],
    about: {
      title: 'Tier List Post Template — Rank Anything from S to D on One Post',
      description: `A **tier list** is one of the few post formats that makes people argue in the comments, which is exactly what the feed algorithms reward. **Tier List Post** is a free template that gives you the familiar S to D ranking board without needing a spreadsheet or a game site.

**The format everyone already understands**

Five coloured rows, S in red, A in orange, B in yellow, C in green and D in blue, each with a large letter block on the left and your picks beside it. Nobody needs the format explained, so the post works in the half second before a thumb moves on. Type your picks as a comma-separated list, for example "VS Code, Cursor", and they sit on the row.

**Empty rows disappear**

Only ranking three tiers? Clear the C and D rows and the remaining rows grow to fill the space, so a short list looks as finished as a long one. The row heights are capped, so even a two-tier list does not become a wall of colour.

**Built to start a conversation**

A bold headline sits at the top ("Code editors tier list") with its key words highlighted, and the closing line, "Disagree? Tell me where yours goes", sits at the bottom with a nudging arrow in the video export. In the animated export the rows slide in one at a time from S down, which is the order people expect to read them.

**What to rank**

Tools, apps, frameworks, snacks, fonts, workouts, films, podcast episodes, your own past work. Opinionated beats neutral, so state your ranking with confidence and let the comments do the rest. For a one-line opinion rather than a full board, use [Hot Take](/social-post-templates/hot-take/), and for a two-way vote try [This or That](/social-post-templates/this-or-that/).`,
    },
    features: [
      'Five tier rows: S, A, B, C and an optional D, each with its own colour',
      'Large letter blocks and a bold display headline with highlighted words',
      'Picks typed as a simple comma-separated line per tier',
      'Empty tiers disappear and the others grow to fill the space',
      'Rows slide in one by one, from S downwards, in the video export',
      'A "disagree?" prompt with a nudging arrow to invite comments',
      'Optional logo and handle in the footer',
      'Layouts for portrait, square, Story and wide sizes',
    ],
    useCases: [
      { icon: '🛠', title: 'Tools and software rankings', desc: 'Rank code editors, design apps, CRMs or project tools for your audience, which is a natural format for developer and creator accounts.' },
      { icon: '🍔', title: 'Food, travel and lifestyle picks', desc: 'Sort local restaurants, airline snacks, coffee chains or city neighbourhoods into tiers and let followers fight over the order.' },
      { icon: '🎮', title: 'Gaming and entertainment lists', desc: 'Rank characters, seasons, soundtracks or consoles. The format comes from gaming, so the audience already knows how to read it.' },
      { icon: '📊', title: 'Business and brand comparisons', desc: 'Rate your own past campaigns, product features or competitors by how well they worked, then explain the top tier in the caption.' },
    ],
    faqs: [
      { q: 'What is a tier list?', a: 'A tier list ranks items into labelled tiers, usually S for best, then A, B, C and D. It started in gaming communities and is now used for any ranking. Each tier holds the items you think are about equal.' },
      { q: 'How many items can each tier hold?', a: 'As many as fit on one line or two. Type your picks separated by commas. If a tier has many items, shorten the names or move some to a second post, so the text stays readable on a phone.' },
      { q: 'Can I use fewer than five tiers?', a: 'Yes. Leave a tier blank and its row is removed, then the remaining rows grow to fill the post. Many good tier lists only use S to C.' },
      { q: 'Why do tier lists get so many comments?', a: 'Because every ranking is an opinion someone can disagree with. A confident, slightly controversial placement gives people a reason to reply, and the closing "disagree?" prompt makes the invitation explicit.' },
      { q: 'Can I change the tier colours?', a: 'The letter colours are the classic red to blue scale so the post is instantly recognisable. The background and accent used in the headline and prompt are editable to match your brand.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Tier List HTML and CSS: suggest a controversial but fair ranking for your niche, write a caption that invites disagreement, or turn it into a weekly series with a new topic each time.',
      prompt: `Create a 1080×1350 Instagram tier list post in plain HTML and CSS.

- A dark navy background (#14161f) with a soft pink radial glow in the top right corner.
- At the top, a small uppercase pink label "My honest ranking" and a large heavy display headline (Bowlby One or similar) "Code editors tier list" with "tier list" in pink.
- Five stacked rows with a small gap, each a rounded rectangle in a faint translucent white. On the left of each row a square coloured letter block with a large dark letter: S in red #ff5f6d, A in orange #ffa94d, B in yellow #ffe066, C in green #8ce99a, D in blue #74c0fc. To the right of each letter, the picks in bold white text, for example "VS Code, Cursor", "WebStorm, Zed", "Sublime Text, Atom", "Notepad++, Brackets", "Notepad".
- Hide any row with no text and let the others grow, with a maximum row height.
- At the bottom, a pink line "Disagree? Tell me where yours goes ↓" on the left and the brand handle on the right.`,
    },
  },

  'comment-to-get': {
    keywords: ['comment to get template', 'comment to get dm post', 'lead magnet post template instagram', 'comment guide and i will dm you graphic', 'free guide giveaway post template'],
    about: {
      title: 'Comment to Get Template — A Lead Magnet Post That Asks for the Comment',
      description: `"Comment GUIDE and I'll send it to you" is now one of the most common lead-magnet posts on Instagram and LinkedIn: the comment boosts the post, and the DM captures the follower. **Comment to Get** is a free template built around that exact moment, a mock comment box with your keyword typed into it.

**The comment box is the picture**

Most "comment below" posts bury the keyword in a caption. Here the keyword is the star: a white comment field with an avatar, a blinking cursor and a send button, with your word typed in big uppercase letters. In the video export the keyword types itself out, so the viewer sees what they are supposed to do. A small arrow nudges upwards towards the box.

**Say exactly what they get**

A dark card under the comment box names the reward with a gift icon: "2026 UI Cheat Sheet · 12-page PDF". Being specific lifts replies, because people comment when they know what they are asking for. The note underneath tells them what happens next ("I'll send it to your DMs. Follow me so it lands") which also saves you answering the same question fifty times.

**Friendly, not pushy**

A soft lilac background, a yellow "Free · no catch" label, a serif headline with the key words in italic purple, and a large organic blob in the corner keep the post warm. It reads as an offer from a person, not an advert.

**Using it well**

Pick a short keyword that is hard to mistype, set up the auto-reply in your DM tool, and mention the keyword in the first line of your caption as well. Pair the post with a [Carousel Save](/social-post-templates/carousel-save/) slide so people who miss the offer can still save the content, and finish the campaign with [Thank You](/social-post-templates/thank-you/).`,
    },
    features: [
      'Mock comment field with avatar, blinking cursor and send button',
      'Keyword typed in large uppercase letters, and typed out live in the video export',
      'Gift card naming exactly what people receive',
      'Note line explaining that the reply arrives by DM',
      'Nudging arrow pointing at the comment box',
      'Yellow "Free" label, serif headline with italic highlight and soft lilac blob',
      'Optional logo and handle',
      'Layouts for portrait, square, Story and wide sizes',
    ],
    useCases: [
      { icon: '📄', title: 'Free guides and PDFs', desc: 'Offer a cheat sheet, checklist or e-book in exchange for a comment, then deliver it by DM with a link and a thank-you.' },
      { icon: '🧰', title: 'Templates and swipe files', desc: 'Give away a Notion template, Canva pack or prompt list. A named, specific reward makes people comment instead of just saving.' },
      { icon: '📅', title: 'Webinar and event invitations', desc: 'Ask for the keyword "SEAT" to send the registration link by DM, which keeps the link out of the caption and the algorithm happy.' },
      { icon: '💼', title: 'Service enquiries and audits', desc: 'Offer a free mini audit or quote for anyone who comments, then follow up privately with the people who are a good fit.' },
    ],
    faqs: [
      { q: 'What does comment to get mean?', a: 'It is a lead-magnet tactic: you offer something free and ask people to comment a keyword. A tool or you then sends the item to their DMs. The comment boosts the post and you gain a conversation with a likely customer.' },
      { q: 'How do I send the DM automatically?', a: 'Many DM automation tools can watch a post for a keyword and reply with your link. Check the current platform rules for automated messages, and always say in the post that the reply arrives by DM.' },
      { q: 'What makes a good keyword?', a: 'One short word in capitals that is easy to type on a phone, such as GUIDE, CHECKLIST or SEAT. Avoid words people would comment anyway, so your tool can tell offer requests apart from ordinary replies.' },
      { q: 'Does it work on LinkedIn as well as Instagram?', a: 'Yes. The square and landscape sizes fit a LinkedIn feed, and the format is common there too. On LinkedIn, replace "Follow me so it lands" with "Connect with me so it lands" so the DM can arrive.' },
      { q: 'Why include a note about following?', a: 'Instagram sends messages from accounts people do not follow to a requests folder. Asking them to follow first helps the DM reach their inbox, and it adds a follower at the same time.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Comment to Get HTML and CSS: write a keyword and reward that fit your niche, draft the DM reply that goes out automatically, or build a four-post sequence that promotes the same freebie.',
      prompt: `Create a 1080×1350 Instagram "comment to get" lead-magnet post in plain HTML and CSS.

- A soft lilac background (#f3efff) with a large pale purple organic blob (border-radius 46% 54% 60% 40%) in the top right corner at low opacity.
- A pill label at top left in yellow (#ffd166), uppercase small bold: "Free · no catch".
- A large serif headline (Fraunces or similar) "Want my UI cheat sheet?" with "cheat sheet?" in italic purple (#6d3df5).
- A small bold line "Just comment the word", then a pill-shaped white comment field with a thick purple border and a hard purple offset shadow: a gradient round avatar on the left, the keyword "GUIDE" in large bold uppercase with a blinking purple cursor, and a purple round send button with a white arrow on the right. A small purple arrow below it points up at the field.
- A dark navy (#1e1b3a) rounded card with a gift emoji and white bold text: "2026 UI Cheat Sheet · 12-page PDF".
- A muted note line "I'll send it to your DMs. Follow me so it lands." and the brand handle in purple at the bottom right.`,
    },
  },

  'red-green-flags': {
    keywords: ['red flag green flag template', 'red flags green flags post', 'red flag instagram post template', 'green flag post graphic', 'dos and donts social post template'],
    about: {
      title: 'Red Flag / Green Flag Post Template — Two Lists, One Relatable Post',
      description: `"Red flags" and "green flags" have become a shorthand everyone understands, which makes the pair a ready-made post format. **Red Flag / Green Flag** is a free template that puts both lists side by side so a viewer can read the warning signs and the good signs in one glance.

**Two cards, two flags**

A red card on the left and a green card on the right, each with a small flag that sways in the video export. Each card holds up to four items marked with a cross or a tick: a red "✕ We'll pay in exposure" opposite a green "✓ Pays the deposit fast". The hard offset shadows and thick coloured borders make the cards look like stickers, so the post feels playful rather than preachy.

**Fits any niche**

The labels are editable, so the same layout works for client red flags, job-interview red flags, product red flags, gym habits or relationship advice. Freelancers and agencies use it for client warning signs, recruiters for interview behaviour, and coaches for habits. If one side has only three items, clear the fourth and that row disappears without leaving a gap.

**Why it earns comments**

People recognise themselves in the list, and almost everyone has a red flag of their own to add. The closing prompt, "What would you add? Comment below", turns the post into a thread. The items slide in from the sides in the animated export, red from the left and green from the right.

**Sizes and tone**

The headline uses a red-to-green gradient on its key word, set on warm paper so the colours stand out. Use portrait for the feed and square for LinkedIn. For a longer list of ideas, try [Mistakes to Avoid](/social-post-templates/mistakes-to-avoid/), and for a single strong opinion, [Hot Take](/social-post-templates/hot-take/).`,
    },
    features: [
      'Red card with up to four red flags and a green card with up to four green flags',
      'Editable card labels, so it works beyond "red" and "green" topics',
      'Waving flag icon on each card, items slide in from opposite sides in the video',
      'Cross and tick markers with sticker-style offset shadows',
      'Headline with a red-to-green gradient on the key words',
      'Empty items disappear and the list re-spaces itself',
      'Closing prompt that invites comments, with optional logo and handle',
      'Portrait, square, Story and wide layouts',
    ],
    useCases: [
      { icon: '🧑‍💻', title: 'Client red flags for freelancers', desc: 'Share the warning signs of a bad client next to the signs of a great one. It is relatable, saveable and a gentle way to advertise your standards.' },
      { icon: '🤝', title: 'Hiring and interview advice', desc: 'Recruiters and career coaches can contrast interview behaviour that worries them with what makes a candidate stand out.' },
      { icon: '🛒', title: 'Product and service buying guides', desc: 'Help customers spot a poor supplier or a trustworthy one, for example when choosing a web agency, builder or software vendor.' },
      { icon: '💪', title: 'Habits, health and lifestyle', desc: 'List habits that hold people back next to ones that help, whether for fitness, studying, money or working from home.' },
    ],
    faqs: [
      { q: 'What do red flag and green flag mean?', a: 'A red flag is a warning sign that something may be wrong. A green flag is a good sign. Together they make a quick, memorable way to compare behaviours, offers or choices.' },
      { q: 'How many items can I add?', a: 'Up to four per side. Leave one blank and it is removed. Short phrases work best, because the two cards sit next to each other and each line wraps at phone size.' },
      { q: 'Can I use it for something other than flags?', a: 'Yes. Rename the card labels to "Do" and "Don\'t", "Myth" and "Fact" or "Before" and "After". The colours and markers still read clearly for any two-sided comparison.' },
      { q: 'Does the red and green work for colour-blind viewers?', a: 'The cards also differ by symbol (a cross and a tick), by label and by position, so the meaning does not depend on colour alone.' },
      { q: 'How is it different from Us vs Them?', a: 'Us vs Them compares your offer to a typical alternative in a table. Red Flag / Green Flag is about behaviours and warning signs, written as short relatable lines, so it suits advice and opinion posts.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Red Flag / Green Flag HTML and CSS: brainstorm sharp, specific flags for your industry, rewrite them as short punchy lines, or create a matching series for clients, employers and suppliers.',
      prompt: `Create a 1080×1350 Instagram "red flags vs green flags" post in plain HTML and CSS.

- A warm cream background (#fbf7ee). A centred heavy headline at the top "Freelance client flags" in a bold rounded sans, with the word "flags" filled with a red-to-green gradient (background-clip text).
- Two equal cards side by side with a small gap. Each is a white rounded rectangle with a thick 4px border and a hard offset shadow in the same colour: red (#e5383b) on the left, green (#1f9d55) on the right.
- At the top of each card, a small flag (a pole made from a left border and a notched pennant made with clip-path) and an uppercase bold label, "Red flags" and "Green flags", in the card colour.
- Four short lines in each card, bold, with a red ✕ before the left lines and a green ✓ before the right lines. Left: "Can you start yesterday?", "We'll pay in exposure", "Just one tiny change (x40)", "No contract, only vibes". Right: "Clear brief and budget", "Pays the deposit fast", "Trusts your expertise", "Gives feedback in one round".
- At the bottom: a muted line "What would you add? Comment below" on the left and the brand handle on the right.`,
    },
  },

  'receipt': {
    keywords: ['receipt post template', 'receipt style instagram post', 'itemised breakdown graphic', 'build in public costs post', 'receipt template social media'],
    about: {
      title: 'Receipt Post Template — Show Costs, Wins or Numbers as a Till Receipt',
      description: `Numbers are more believable when they look like a document. **Receipt Post** is a free template that dresses an itemised list as a thermal-paper till receipt, which has become a favourite way to share costs, results and weekly stats on social media.

**A receipt people want to read**

A cream paper strip with a torn zigzag bottom edge sits on a dark backdrop, with a monospaced typeface that looks like a real till printer. A centred title ("MY SIDE PROJECT") and a date line sit at the top above a dashed rule. Each item is a row with a dotted leader line running out to the amount, exactly like a shop receipt, so the eye follows from name to price without effort.

**Up to five lines, one bold total**

Add up to five items and amounts: the cost of a launch, a week of wins, a project quote or "what my morning really costs". Clear the last row and it disappears. Underneath, a dashed rule and a large TOTAL in your accent colour pull the viewer to the figure that matters. In the video export the lines print in one by one and the total counts up.

**It does not have to be money**

The amounts are free text, so a row can read "-6 hrs", "+212 followers", "3 coffees" or "47 commits". Sleep going down while coffee goes up is a joke that works on a receipt. A thank-you line and a barcode finish the paper, with your handle and optional logo printed below.

**Where it works**

Build-in-public founders share monthly costs and revenue. Freelancers show what a website really costs, line by line. Creators show a weekly recap. For a single headline figure use [Big Stat](/social-post-templates/big-stat/), and for an end-of-year summary use [Year in Review](/social-post-templates/year-in-review/).`,
    },
    features: [
      'Cream thermal-paper receipt with a torn zigzag bottom edge on a dark backdrop',
      'Monospaced type, dashed rules and dotted leader lines from name to amount',
      'Up to five itemised rows, with empty rows removed automatically',
      'Large total in your accent colour that counts up in the video export',
      'Lines print in one after another, and the whole receipt settles into place',
      'Thank-you line, barcode, handle and optional logo',
      'Amounts are free text, so costs, hours, followers or anything else',
      'Portrait, square, Story and wide layouts',
    ],
    useCases: [
      { icon: '🚀', title: 'Build-in-public updates', desc: 'Share a month of hosting, tools and revenue as a receipt. It reads as honest and is easy to compare month to month.' },
      { icon: '🧾', title: 'What it really costs', desc: 'Break a website, a wedding or a launch into line items so clients and followers can see where the money goes.' },
      { icon: '📆', title: 'Weekly wins and recaps', desc: 'Turn a week of work into a list: posts shipped, calls booked, miles run, with a total that sums up the week.' },
      { icon: '😄', title: 'Light-hearted lifestyle posts', desc: 'Print the cost of a hobby, a commute or a coffee habit with a joke on the final line, a format people love to share.' },
    ],
    faqs: [
      { q: 'Why do receipt-style posts work?', a: 'A receipt signals an honest breakdown. People trust itemised numbers more than a single claim, and the familiar layout is read quickly. The monospaced type and the torn edge also make the post stand out in a feed of clean graphics.' },
      { q: 'Do the amounts have to be money?', a: 'No. Each amount is free text, so you can write hours, followers, steps or "priceless". Only the TOTAL line is styled as the headline figure, and it can say anything.' },
      { q: 'How many lines can I show?', a: 'Five. If you need fewer, clear the unused rows and they are hidden. If you need more, split the breakdown across two posts or use a carousel.' },
      { q: 'Can I change the colours?', a: 'Yes. The backdrop, the receipt ink, the paper and the total colour are editable. Keep the paper light and the ink dark so the small monospaced type stays readable on a phone.' },
      { q: 'Is it fine to share real revenue numbers?', a: 'That is your call. Many founders share costs and revenue to build trust, but you can use rounded or fictional numbers, or switch the content to hours and results, if you prefer to keep the figures private.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Receipt HTML and CSS: turn a list of your real expenses into five tidy line items, write a funny final line, or build a monthly series where only the figures change.',
      prompt: `Create a 1080×1350 Instagram receipt-style post in plain HTML and CSS.

- A dark navy background (#1c1f2b) with a soft magenta radial glow in the top left.
- A centred cream (#fbf8f0) paper strip about 72% of the width with a zigzag torn bottom edge (use clip-path with alternating points), a soft shadow and dark ink (#23201b). Use a monospaced font such as Courier Prime throughout.
- Header: centred bold title "MY SIDE PROJECT" with wide letter-spacing and a small muted date line "Month 3 · Nov 2026", then a dashed rule.
- Five item rows. Each row: the item name on the left, a dotted leader line filling the space, and the amount on the right in bold: Hosting $12.00, Domain $1.50, Design tools $15.00, Coffee (a lot) $48.00, Sleep -6 hrs.
- A dashed rule, then "TOTAL" on the left and "$76.50" large in pink (#d6336c) on the right.
- A centred small line "Thank you for following along!", a barcode made with repeating-linear-gradient, and a centred brand handle.`,
    },
  },
};

export const TEMPLATE_WHY_TREND = {
  'black-friday': [
    { icon: '⚡', title: 'Stands out in the busiest feed of the year', desc: 'Black, hazard yellow and a swinging price tag are loud on purpose, so your sale is seen among hundreds of near-identical offers.' },
    { icon: '🏷', title: 'The discount is the hero', desc: 'The number sits on a tag of its own and counts up in the video, so the first thing people take in is what they save.' },
    { icon: '🔁', title: 'One design for the whole campaign', desc: 'Change the top strip and dates and the same post becomes the teaser, the launch and the last-chance reminder.' },
  ],
  'tier-list': [
    { icon: '💬', title: 'Built to be argued with', desc: 'Every placement is an opinion, so the post invites replies, which tell the feed that people care about it.' },
    { icon: '👁', title: 'A format nobody has to learn', desc: 'S to D is already familiar, so viewers understand the post in a glance and spend the time on your picks.' },
    { icon: '📏', title: 'Short lists still look complete', desc: 'Empty tiers vanish and the others grow, so a three-tier ranking looks as finished as a five-tier one.' },
  ],
  'comment-to-get': [
    { icon: '⌨', title: 'Shows the action, not just the ask', desc: 'The keyword is typed into a real-looking comment box, so people see exactly what to do without reading a caption.' },
    { icon: '🎁', title: 'A named reward gets more replies', desc: 'Naming the file and its size makes the offer concrete, and people reply to things they can picture.' },
    { icon: '📩', title: 'Explains what happens next', desc: 'The DM note and the follow reminder answer the questions that would otherwise fill your comments and inbox.' },
  ],
  'red-green-flags': [
    { icon: '🙋', title: 'Readers see themselves in it', desc: 'Relatable warning signs make people nod, tag a friend and add their own, which is where the engagement comes from.' },
    { icon: '⚖', title: 'Two sides in one glance', desc: 'Opposite cards, opposite symbols and opposite colours give a complete comparison in a single scroll stop.' },
    { icon: '🧩', title: 'Works for any niche', desc: 'Editable labels and four slots per side let it carry clients, hiring, products or habits without a redesign.' },
  ],
  'receipt': [
    { icon: '🧾', title: 'Numbers feel more honest', desc: 'An itemised receipt looks like evidence, so cost and result breakdowns are believed faster than a plain claim.' },
    { icon: '✨', title: 'Looks different from every other post', desc: 'Monospaced type, a torn edge and a barcode make a distinctive object in a feed of clean rectangles.' },
    { icon: '🗓', title: 'Easy to repeat each month', desc: 'The layout stays fixed while the lines change, which makes a recurring update series quick to produce.' },
  ],
};
