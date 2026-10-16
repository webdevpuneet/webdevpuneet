/* Hand-written SEO content for each social post template, keyed by template id.
   `keywords` are the phrases people search for (on Google and in AI assistants);
   they feed the page copy, the FAQ wording, schema keywords and llms.txt.
   Use cases follow the snippet-library rules: 4 entries, 18-42 words each. */

export const TEMPLATE_SEO = {
  'big-quote': {
    keywords: ['instagram quote post template', 'quote card template', 'quote graphic maker', 'pull quote social media post', 'twitter quote image'],
    about: {
      title: 'Big Quote — Free Instagram Quote Post Template With Author Photo',
      description: `**Big Quote** is a free quote post template for Instagram, Facebook and X. It turns a single sentence into a shareable quote card: an oversized accent-coloured quotation mark, the quote in a bold serif face, and a footer with the author's name, role, optional round photo and your handle.

**Typography does the work**

The quote is set in Playfair Display at 700 weight with slightly tight letter-spacing, so even a short line feels editorial. The giant opening quote mark is the same serif at roughly four times the quote size, tinted with the accent colour. Wrap any words in *asterisks* and they switch to the accent colour, which is a simple way to highlight the key phrase of a long quote.

**A layout that survives long quotes**

The quote sits in a flexible middle area between the quote mark and the footer. When a quote is too long, the editor shrinks the type step by step until it fits instead of letting it spill over the footer. The same design works as a 4:5 portrait post, a square post, a 9:16 Story (with extra padding to clear the Story header and reply bar) and a 16:9 landscape post for X.

**Subtle depth, no images needed**

The background is the dark base colour with a soft radial glow of the accent colour in the top-right corner, drawn with a CSS radial-gradient, so the card looks finished even without a photo. The author photo is optional: leave it empty and the footer simply shows the name and role.

Want a lighter tip-style card instead? Try [Tip of the Day](/social-post-templates/tip-of-the-day/) or the fact-based [Did You Know?](/social-post-templates/did-you-know/) template.`,
    },
    features: [
      'Oversized accent-coloured serif quotation mark as the focal point',
      'Quote set in Playfair Display 700 with accent highlights via *asterisks*',
      'Author name, role or source line, and your handle in the footer',
      'Optional round author photo with an accent ring; hidden when empty',
      'Long quotes shrink automatically to fit above the footer',
      'Radial accent glow background, so it looks finished without images',
      'Works in 4:5, 1:1, 9:16 Story and 16:9 landscape sizes',
      'Download PNG or JPEG, or copy the HTML and CSS',
    ],
    useCases: [
      { icon: '❝', title: 'Founder and leadership quotes', desc: 'Share a line from your CEO, a podcast guest or a conference talk with their name, role and photo under it, in your brand colours across the feed and Stories.' },
      { icon: '★', title: 'Customer quote highlights', desc: 'Pull the strongest sentence from a review or case study and colour its key words with *asterisks*, for a cleaner alternative to a full testimonial card.' },
      { icon: '✍', title: 'Blog and newsletter pull-quotes', desc: 'Promote a new article by posting its most quotable line, with the author credited in the footer and your handle in the corner.' },
      { icon: '◎', title: 'Daily motivation series', desc: 'Run a consistent quote-of-the-day series by keeping the colours and fonts fixed and only changing the quote and author each day.' },
    ],
    faqs: [
      { q: 'How do I make a quote post for Instagram?', a: 'Open the Big Quote template, type the quote and the author, optionally upload a photo, and pick colours and fonts. Keep the 4:5 portrait size (1080×1350) for the feed, or switch to Story (1080×1920), then click Download. The whole thing runs in your browser.' },
      { q: 'Can I highlight part of the quote?', a: 'Yes. Wrap the words in asterisks, for example "Simplicity is the soul of *efficiency*", and they render in the accent colour. You can edit the quote in the side panel or by clicking it in the preview.' },
      { q: 'What happens if my quote is long?', a: 'The quote shrinks automatically until it fits between the quote mark and the footer. For readability on phones, aim for one or two sentences, roughly under 140 characters.' },
      { q: 'Is the author photo required?', a: 'No. The photo slot is optional. Without a photo the footer shows only the author name, role and your handle, and nothing is left empty.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Big Quote HTML and CSS: change the typeface pairing, turn it into a React component that takes quote and author props, or generate a week of quote posts from a list.',
      prompt: `Create a 1080×1350 social media quote card in plain HTML and CSS.

- Dark background with a soft radial glow of an accent colour in the top-right corner.
- A huge serif opening quotation mark in the accent colour, then the quote in a bold serif (Playfair Display 700).
- Footer separated by a thin line: optional round author photo with an accent ring, author name and role, and a handle aligned right.
- Size everything with a CSS variable --u equal to 1% of the shorter side, so the card also works at 1080×1080, 1080×1920 and 1600×900.`,
    },
  },

  'tip-of-the-day': {
    keywords: ['tip of the day post template', 'instagram tips post template', 'educational social media post', 'daily tip graphic', 'how-to tip post design'],
    about: {
      title: 'Tip of the Day — Free Educational Tip Post Template for Instagram',
      description: `**Tip of the Day** is a free social post template for daily or weekly tip series. It pairs a pill-shaped "Tip of the day" label with a large faded tip number, a bold headline tip, a short explanation and a footer with your logo and handle.

**Built for a series**

Numbered tips ("#27") build a habit with your followers, and the large translucent number in the top-right corner makes each post feel like part of a collection. Keep the colours and fonts the same, change only the number, tip and explanation, and your grid gets a consistent look.

**Readable hierarchy**

The headline uses Plus Jakarta Sans at 800 weight with tight tracking, and the explanation is a lighter, smaller paragraph at 82% opacity, so people can take in the tip at a glance and read the detail if they stop scrolling. Highlight the key term with *asterisks* to colour it with the accent.

**Soft gradient background**

The card uses a gentle CSS linear-gradient between two tints (lavender to periwinkle by default), so it reads as calm and trustworthy, which suits education, coaching and product how-to content. The logo slot is optional and keeps its proportions.

**Sizes and export**

Every tip works as a 4:5 portrait post, a square, a Story and a 16:9 landscape post for X. Long tips shrink to fit. Download a PNG or JPEG, all four sizes as a ZIP, or fork the HTML into [My Code](/ui-snippets/mycode/) to reuse it elsewhere.

Posting developer tips? The [Code Tip](/social-post-templates/code-tip/) template adds an editor-style code window.`,
    },
    features: [
      'Pill label ("Tip of the day") and large translucent tip number',
      'Bold headline tip with accent highlights using *asterisks*',
      'Short explanation paragraph styled for quick reading',
      'Optional logo that keeps its shape, plus your handle',
      'Soft two-colour gradient background with editable stops',
      'Headline and explanation shrink together when text is long',
      'Portrait, square, Story and landscape sizes from one design',
      'PNG, JPEG, ZIP of all sizes, or HTML export',
    ],
    useCases: [
      { icon: '💡', title: 'Daily or weekly tip series', desc: 'Number each post and keep the palette fixed so your grid builds into a recognisable library of tips that followers save and come back to.' },
      { icon: '🎓', title: 'Coaches and educators', desc: 'Turn one lesson into one card: the headline states the tip, the explanation gives the reason, and your handle keeps the post credited when it is shared.' },
      { icon: '🛠', title: 'Product how-to tips', desc: 'Teach a lesser-known feature of your app or service each week, with the feature name highlighted in the accent colour and your logo in the footer.' },
      { icon: '📌', title: 'Pinned "start here" posts', desc: 'Create a set of essential tips for new followers and pin them to your profile, using the same template so they read as one collection.' },
    ],
    faqs: [
      { q: 'How do I make a tip of the day post?', a: 'Open the template, set the label and tip number, write the tip headline and a one-sentence explanation, add your logo and handle, then download the 1080×1350 portrait image for the Instagram feed or the 1080×1920 Story version.' },
      { q: 'How long should a tip be?', a: 'Keep the headline under about 60 characters and the explanation to one or two short sentences. Longer text shrinks automatically to fit, but shorter text stays readable at phone size.' },
      { q: 'Can I change the gradient colours?', a: 'Yes. The background and gradient-end colours both have colour pickers with hex input, and the 12 palettes set background, text and accent in one click.' },
      { q: 'Can I reuse it for a carousel?', a: 'Yes. Use it as a single post, or pair it with the Carousel Cover, Step and Final slide templates for a multi-slide tip carousel.' },
    ],
    aiPrompt: {
      paragraph: 'Give the Tip of the Day code to an AI assistant to generate a month of tips from a list, convert it to a reusable component with number, tip and detail props, or restyle it to your brand guide.',
      prompt: `Build a 1080×1350 "tip of the day" social post in HTML and CSS.

- Soft linear gradient background between two light tints.
- Top row: a pill label ("Tip of the day") on the left and a large, faded tip number ("#27") on the right.
- Centre: a bold headline tip (Plus Jakarta Sans 800) above a lighter one-sentence explanation.
- Footer: optional logo and a handle.
- Use a --u variable (1% of the shorter side) for all sizes so the layout scales to square, Story and landscape formats.`,
    },
  },

  'did-you-know': {
    keywords: ['did you know post template', 'fun fact instagram post', 'fact post template', 'trivia social media post', 'statistic post design'],
    about: {
      title: 'Did You Know? — Free Fun Fact Post Template for Social Media',
      description: `**Did You Know?** is a free fact post template for Instagram, Facebook and X. A giant translucent question mark fills the corner, a bold "Did you know?" heading sits at the top, the fact is the hero, and a small source line keeps it credible.

**Why fact posts work**

Facts and statistics are some of the most saved and shared posts because they are quick to read and easy to pass on. This layout gives the fact plenty of room, in Poppins at 700 weight, and keeps everything else small.

**Credibility built in**

The footer has a dedicated source line ("Source: CERN, 1991") on the left and your handle on the right. Citing a source makes a fact post more trustworthy and more likely to be reshared, especially for statistics and history posts.

**Warm, attention-grabbing design**

The default palette is a warm amber background with deep brown text and an orange accent. The oversized question mark is drawn as text in the heading font at 22% accent opacity, positioned partly off the canvas so it frames the content without competing with it. On Story size it moves up to stay clear of the reply bar.

**Highlight the surprising part**

Wrap the surprising part of the fact in *asterisks* to colour it with the accent, for example "The first website ever made is *still online*". Long facts shrink automatically to fit.

Pair it with [Tip of the Day](/social-post-templates/tip-of-the-day/) for educational series, or [Big Quote](/social-post-templates/big-quote/) for quotes.`,
    },
    features: [
      'Giant translucent question mark framing the corner of the post',
      '"Did you know?" heading in the accent colour',
      'The fact set large in Poppins with *asterisk* highlights',
      'Dedicated source line for citing where the fact comes from',
      'Handle in the footer so shares stay credited',
      'Warm amber default palette, editable with pickers and palettes',
      'Auto-fitting text and Story-safe positioning',
      'Four post sizes; PNG, JPEG, ZIP or HTML export',
    ],
    useCases: [
      { icon: '📊', title: 'Industry statistics', desc: 'Share one striking number from a report, with the surprising part highlighted and the report named in the source line so followers can trust and reshare it.' },
      { icon: '🏛', title: 'History and "on this day"', desc: 'Post anniversaries and origin stories, like when a product, law or technology first appeared, with the date and source credited in the footer.' },
      { icon: '🧠', title: 'Engagement trivia', desc: 'Ask followers whether they knew the fact and invite answers in the comments, a quick way to start conversations without a long caption.' },
      { icon: '🔬', title: 'Science and health facts', desc: 'Explain a myth-busting fact in one sentence and cite the study or organisation, keeping the post factual and easy to verify.' },
    ],
    faqs: [
      { q: 'How do I create a "Did you know?" post?', a: 'Open the template, type your fact, add a source line and your handle, choose colours and fonts, and download it at 1080×1350 for the feed or 1080×1920 for Stories. Wrap the key words in asterisks to colour them.' },
      { q: 'Should I add a source to fact posts?', a: 'Yes, especially for statistics. The template has a dedicated source line under the fact. Credited facts are more trustworthy, and people are more willing to share them.' },
      { q: 'Can I change the heading text?', a: 'Yes. "Did you know?" is an editable field, so you can change it to "Fun fact", "Myth vs fact" or another language.' },
      { q: 'Will a long fact fit?', a: 'The fact shrinks automatically to fit the space. For the best result on phones, keep it to one or two sentences.' },
    ],
    aiPrompt: {
      paragraph: 'Use an AI assistant with this template to turn a research report into a series of fact posts, rewrite facts into punchier one-liners, or translate the heading and fact into other languages.',
      prompt: `Design a 1080×1350 "Did you know?" fact post in HTML and CSS.

- Warm solid background with an enormous translucent question mark (heading font, 22% accent opacity) bleeding off the bottom-right corner.
- Uppercase accent heading "Did you know?" at the top.
- The fact as large bold text (Poppins 700) in the middle, with an accent-coloured highlight span.
- Footer row: a small source line on the left and a bold handle on the right.
- Scale everything with --u (1% of the shorter side).`,
    },
  },

  'code-tip': {
    keywords: ['code snippet post template', 'developer social media post', 'programming tip instagram', 'code image for linkedin', 'coding post design template'],
    about: {
      title: 'Code Tip — Free Developer Code Snippet Post Template',
      description: `**Code Tip** is a free social post template for developers who share code on Instagram, LinkedIn and X. A title sits above a realistic code-editor window, with macOS-style traffic-light dots, a file name tab and your code in JetBrains Mono, all on a dark background with a cyan glow.

**Real, editable code text**

The code is live text, not a screenshot, so you can paste any snippet into the Code field and the line breaks and indentation are kept. It renders in JetBrains Mono at a comfortable size with 1.6 line height, coloured in the accent (cyan by default) for a terminal look. Long snippets shrink automatically to fit the window.

**Editor chrome that reads instantly**

The window has a title bar with red, yellow and green dots and a file name such as "copy.js". People recognise it as code at a glance, even in a fast-scrolling feed. The window has a subtle border and a deep drop shadow, so it floats above the background.

**Title plus code works best**

Developer posts perform best when the title states the benefit ("Copy to clipboard in *one line*") and the code proves it. Wrap the key phrase in asterisks to colour it with the accent.

**Made for dev content**

Use it for JavaScript, CSS, Python, SQL or shell one-liners, release notes with an API example, or tutorial carousels. Fork it to [My Code](/ui-snippets/mycode/) if you want to restyle it further, or see the [Code Screenshot Generator](/code-screenshot-generator/) for syntax-highlighted screenshots.

For text-only tips, use [Tip of the Day](/social-post-templates/tip-of-the-day/).`,
    },
    features: [
      'Code-editor window with traffic-light dots and a file name tab',
      'Code rendered as live text in JetBrains Mono, indentation preserved',
      'Accent-coloured code on a dark editor background',
      'Benefit-led title above the code with *asterisk* highlights',
      'Long code shrinks automatically to fit the window',
      'Dark background with a soft accent glow in the corner',
      'Portrait, square, Story and landscape sizes',
      'Export PNG or JPEG, a ZIP of all sizes, or the HTML',
    ],
    useCases: [
      { icon: '⌨', title: 'One-liner developer tips', desc: 'Share a short JavaScript, CSS or Python trick with a title that explains the benefit, so the post works for people who skim and people who read the code.' },
      { icon: '🚀', title: 'Release notes with code', desc: 'Announce a new API method or SDK version by showing the exact call developers need, with the file name tab naming the language or package.' },
      { icon: '🧵', title: 'Tutorial carousel slides', desc: 'Use one Code Tip per step inside a carousel, keeping the same window and colours so the steps read as a single tutorial.' },
      { icon: '💼', title: 'LinkedIn thought leadership', desc: 'Post the snippet that solved a real problem this week, with the title summarising the lesson, to build a technical reputation with your network.' },
    ],
    faqs: [
      { q: 'How do I make a code snippet image for social media?', a: 'Open the Code Tip template, paste your code into the Code field, set the file name and a title, then download the image. Indentation and line breaks are preserved, and long code shrinks to fit the editor window.' },
      { q: 'Does it have syntax highlighting?', a: 'The code is shown in a single accent colour for a clean terminal look. For multi-colour syntax highlighting, use the Code Screenshot Generator, or fork the template to My Code and add your own highlighting.' },
      { q: 'Which size is best for LinkedIn and X?', a: 'Use the 1080×1350 portrait size for LinkedIn and the Instagram feed, and the 1600×900 landscape size for X. Download all sizes at once with "All sizes (ZIP)".' },
      { q: 'Can I change the code font?', a: 'The code window always uses JetBrains Mono so it reads as code. The title and handle use the heading and body fonts you choose in the Fonts section.' },
    ],
    aiPrompt: {
      paragraph: 'Pair the Code Tip template with an AI assistant to turn a long code example into a tweet-sized snippet, write a benefit-first title, or generate a series of tips from your documentation.',
      prompt: `Create a 1080×1350 developer "code tip" social post in HTML and CSS.

- Dark navy background with a soft cyan radial glow in the top-left corner.
- Bold title (Space Grotesk 700) above an editor window.
- Editor window: rounded corners, subtle border, deep shadow, a title bar with red/yellow/green dots and a file name, then code in JetBrains Mono with white-space: pre-wrap in a cyan accent colour.
- Handle under the window.
- Use --u (1% of the shorter side) for sizing so it works at square, Story and 16:9 sizes.`,
    },
  },

  'product-launch': {
    keywords: ['product launch post template', 'new feature announcement post', 'saas launch instagram post', 'app launch social media template', 'product hunt launch graphic'],
    about: {
      title: 'Product Launch — Free New Product Announcement Post Template',
      description: `**Product Launch** is a free announcement template for SaaS products, apps and new features. A bright "New" badge, a big headline, a short tagline and a call to action sit above a glowing screenshot frame that rises from the bottom of the post.

**Show the product, not just words**

Upload a screenshot of your dashboard, app screen or landing page and it fills the frame, anchored to the top so the most important part of the UI stays visible. The frame has a soft border and an accent-coloured outer glow, drawn with CSS box-shadow, so even a plain screenshot looks premium. Without a screenshot the frame shows an accent gradient, so the post still works.

**Dark, high-contrast styling**

The background is a near-black violet with a large radial glow coming up from the bottom, which pulls the eye towards the product. The headline uses Plus Jakarta Sans at 800 weight with tight tracking. Colour the product name with *asterisks* ("Meet *Flowboard 2.0*").

**Layouts per size**

On portrait, square and Story sizes the copy sits on top with the screenshot below. On the 16:9 landscape size for X, the layout switches to two columns, with the copy on the left and the screenshot bleeding off the right edge. Long headlines shrink to fit.

**Launch week set**

Use it with [We're Live](/social-post-templates/we-are-live/) for launch day, [Countdown](/social-post-templates/countdown/) for the days before, and [Milestone](/social-post-templates/milestone/) when the signups come in.`,
    },
    features: [
      '"New" badge, headline, tagline and call to action',
      'Screenshot frame with accent glow, anchored to the top of the image',
      'Accent gradient placeholder when no screenshot is uploaded',
      'Dark violet background with a radial glow behind the product',
      'Two-column layout automatically on the 16:9 landscape size',
      'Product name highlights with *asterisks*',
      'Headline and tagline shrink to fit',
      'All four sizes; PNG, JPEG, ZIP or HTML export',
    ],
    useCases: [
      { icon: '🚀', title: 'SaaS and app launches', desc: 'Announce a new product with its real dashboard screenshot in the glowing frame, a one-line tagline and a "Try it free" call to action.' },
      { icon: '✨', title: 'New feature announcements', desc: 'Show the new screen or setting in the frame, put "New" or "Just shipped" in the badge, and name the feature in the accent colour.' },
      { icon: '🐱', title: 'Product Hunt launch day', desc: 'Post the landscape version on X and the portrait version on LinkedIn and Instagram, each pointing people to your launch page.' },
      { icon: '📦', title: 'Version and major updates', desc: 'Mark a 2.0 release or a redesign with the version in the headline and a before-unseen screenshot, a clear visual signal that something changed.' },
    ],
    faqs: [
      { q: 'How do I make a product launch post?', a: 'Open the Product Launch template, upload a screenshot, write the badge, headline, tagline and call to action, choose colours, and download. The 16:9 size switches to a two-column layout for X automatically.' },
      { q: 'What screenshot size should I upload?', a: 'Any size works. The image is cropped to fill the frame and anchored to the top, so a full-width screenshot of your app or website shows its header and main area. Uploads are resized in your browser and never sent to a server.' },
      { q: 'Can I use it for a new feature instead of a new product?', a: 'Yes. Change the badge to "New feature" or "Just shipped" and show the feature screen in the frame.' },
      { q: 'Which other templates fit a launch?', a: 'Countdown for the days before launch, We\'re Live for launch day, and Milestone to celebrate the first users or sales.' },
    ],
    aiPrompt: {
      paragraph: 'Give the Product Launch code to an AI assistant to write launch copy variations, swap in your brand gradient, or build a set of launch-week posts from one product description.',
      prompt: `Build a 1080×1350 product launch announcement post in HTML and CSS.

- Near-black violet background with a large radial glow rising from the bottom centre.
- Top: a small uppercase pill badge "New", a big headline (Plus Jakarta Sans 800, tight tracking), a short tagline and an accent call-to-action line.
- Bottom: a screenshot frame filling the remaining height, rounded top corners, subtle border and an accent outer glow (box-shadow), with the image covering it and anchored to the top.
- At 1600×900, switch to two columns: copy left, screenshot bleeding off the right edge.
- Size with --u (1% of the shorter side).`,
    },
  },

  'milestone': {
    keywords: ['milestone post template', 'thank you followers post', '10k followers celebration post', 'company anniversary post', 'achievement announcement template'],
    about: {
      title: 'Milestone — Free "Thank You" Celebration Post Template',
      description: `**Milestone** is a free celebration post template for follower counts, user numbers, sales goals and anniversaries. A giant number takes centre stage, framed by a kicker ("We just hit"), what the number counts ("happy users"), a thank-you message and scattered CSS confetti.

**The number is the hero**

The milestone number is set in Montserrat at 900 weight at a huge size, on a single line, and shrinks automatically if you enter a longer figure like "1,000,000". Everything else is deliberately smaller, so the achievement registers instantly in the feed.

**Confetti without images**

The confetti is six small CSS shapes, rounded rectangles and dots, rotated at different angles and coloured in the accent and a second "confetti" colour. It adds celebration without clutter, and because it's plain CSS it stays crisp at every export size.

**Say thank you**

Milestone posts perform best when they credit the community. The message line has room for a sentence of thanks and what comes next ("The next 10K starts today"). Centred text and a light mint palette keep the tone warm and positive.

**Every size, one design**

It works as a portrait or square feed post, a Story and a landscape post for X, with the content centred in each.

Celebrating a launch instead? See [Product Launch](/social-post-templates/product-launch/). Sharing a customer win? Try [Customer Testimonial](/social-post-templates/testimonial/).`,
    },
    features: [
      'Giant single-line milestone number in Montserrat 900',
      'Kicker, unit ("happy users") and thank-you message',
      'CSS confetti in two editable colours, crisp at any size',
      'Centred layout that adapts to all four post sizes',
      'Long numbers like 1,000,000 shrink to stay on one line',
      'Light mint default palette with green and amber accents',
      'Handle at the bottom so shares stay credited',
      'PNG, JPEG, ZIP or HTML export',
    ],
    useCases: [
      { icon: '🎉', title: 'Follower milestones', desc: 'Thank your audience at 1K, 10K or 100K followers with the number front and centre and a line about what you are planning next.' },
      { icon: '📈', title: 'Users, sales and downloads', desc: 'Celebrate product traction like signups, customers or app downloads, a simple piece of social proof that also motivates your team.' },
      { icon: '🎂', title: 'Anniversaries', desc: 'Mark one year in business or five years since launch by putting the years in the number field and "years building" as the unit.' },
      { icon: '🏆', title: 'Fundraising and goals', desc: 'Share a funding round, a donation total or a community goal reached, with a thank-you message crediting the people who made it happen.' },
    ],
    faqs: [
      { q: 'How do I make a 10K followers thank-you post?', a: 'Open the Milestone template, type "10,000" (or "10K") as the number, "followers" as the unit and your thank-you message, then download the portrait or Story size.' },
      { q: 'What if my number is very long?', a: 'The number stays on one line and shrinks automatically to fit the width, so values like "1,000,000" or "$2.5M" still fit.' },
      { q: 'Can I change the confetti colours?', a: 'Yes. The confetti uses the accent colour and a separate confetti colour, both editable with colour pickers or set by the palettes.' },
      { q: 'Is it only for followers?', a: 'No. Use it for users, sales, downloads, donations, years in business or any number worth celebrating.' },
    ],
    aiPrompt: {
      paragraph: 'Use an AI assistant to write warm thank-you messages for each milestone, generate a series of milestone posts, or convert the template into a component that takes the number and unit as props.',
      prompt: `Create a 1080×1350 milestone celebration post in HTML and CSS.

- Light mint background, everything centred.
- Uppercase accent kicker ("We just hit"), then a giant single-line number (Montserrat 900, white-space: nowrap), the unit ("happy users") and a one-sentence thank-you.
- Six absolutely positioned CSS confetti pieces (rotated rounded rectangles and dots) in two colours.
- Handle at the bottom in the accent colour.
- Use --u (1% of the shorter side) for all dimensions.`,
    },
  },

  'hiring': {
    keywords: ['we are hiring post template', 'job post template for linkedin', 'hiring announcement instagram', 'job vacancy social media post', 'recruitment post design'],
    about: {
      title: 'We’re Hiring — Free Job Post Template for LinkedIn and Instagram',
      description: `**We're Hiring** is a free recruitment post template for job openings on LinkedIn, Instagram, Facebook and X. A bold accent frame borders the post, with a "We're hiring" kicker and your logo at the top, a large role title in the middle, three detail chips, and an "Apply" button with your careers link.

**Everything a candidate scans for**

Job seekers look for three things in a feed: the role, where it is, and the type of contract. The role title is set very large in DM Sans at 800 weight, and the three chips underneath hold details like "Remote · US", "Full-time" and "React · TypeScript". Empty chips disappear, so you can use one, two or three.

**Stands out in the feed**

A thick accent-coloured border, drawn as a CSS border on the whole post, frames the job like a notice, and the warm orange palette signals opportunity. Highlight the key skill in the role title with *asterisks*.

**Clear call to action**

The apply button is a solid accent block with your careers URL ("Apply → yoursite.com/careers"). Because Instagram captions don't allow clickable links, put the URL right in the image and in your bio.

**Optional logo**

Upload your company logo to the top-right corner. It keeps its proportions and hides when empty.

Announcing the team's growth? Pair it with [Milestone](/social-post-templates/milestone/). Sharing culture? Try [Big Quote](/social-post-templates/big-quote/) with a quote from a team member.`,
    },
    features: [
      'Large role title with *asterisk* highlights for key skills',
      'Three detail chips (location, type, stack); empty chips hide',
      'Solid accent apply button with your careers link',
      'Optional company logo that keeps its proportions',
      'Thick accent border frame for feed visibility',
      'Warm orange default palette, fully editable',
      'Portrait, square, Story and landscape sizes',
      'PNG, JPEG, ZIP or HTML export',
    ],
    useCases: [
      { icon: '💼', title: 'LinkedIn job announcements', desc: 'Post the portrait version with the role, location and contract type as chips, then add the full job description and link in the post text.' },
      { icon: '🚀', title: 'Startup recruiting', desc: 'Show open roles with your logo and stack chips like "React · TypeScript", so the right engineers recognise the job in seconds.' },
      { icon: '🎓', title: 'Internships and graduate roles', desc: 'Advertise internship programmes on Instagram Stories using the 9:16 size, with the application deadline in one of the chips.' },
      { icon: '🤝', title: 'Freelance and contract calls', desc: 'Find freelancers by listing the project type, duration and budget range as chips and pointing to a short application form.' },
    ],
    faqs: [
      { q: 'How do I make a "We\'re hiring" post?', a: 'Open the template, enter the role title, fill up to three detail chips (location, contract type, skills), add your apply link and logo, and download it. Use the portrait size for LinkedIn and Instagram, and Story size for Stories.' },
      { q: 'Can I use fewer than three chips?', a: 'Yes. Leave a chip empty and it disappears, and the rest stay neatly aligned.' },
      { q: 'Where should the application link go?', a: 'Put a short careers URL in the apply button inside the image, and add the clickable link to the post text (LinkedIn, X, Facebook) or your bio (Instagram).' },
      { q: 'Can I post several roles?', a: 'Make one image per role and keep the same colours, or use the Carousel templates to list several roles in one swipeable post.' },
    ],
    aiPrompt: {
      paragraph: 'Hand this template to an AI assistant to turn a job description into a punchy role title and three chips, generate posts for every open role, or localise the copy for different markets.',
      prompt: `Design a 1080×1350 "We're hiring" job post in HTML and CSS.

- Light warm background with a thick accent-coloured border around the whole post.
- Top row: uppercase accent "We're hiring" kicker and an optional logo (background-size: contain) on the right.
- Middle: a very large role title (DM Sans 800) and a row of up to three rounded outline chips for location, contract type and skills.
- Bottom: a solid accent button containing the apply URL.
- Use --u (1% of the shorter side) for all sizes.`,
    },
  },

  'we-are-live': {
    keywords: ['we are live post template', 'launch day post template', 'product hunt launch post', 'now live announcement graphic', 'live stream announcement post'],
    about: {
      title: 'We’re Live — Free Launch Day Announcement Post Template',
      description: `**We're Live** is a free launch-day post template for Product Hunt launches, app store releases, Kickstarter campaigns and livestreams. Huge condensed "We're live on" type sits above the platform name in the accent colour, with the date and a one-line ask for support underneath, all on bold diagonal stripes.

**Loud by design**

Launch day is not the time for subtle. The platform name is set in Bebas Neue at a massive size, and the diagonal stripes, a CSS repeating-linear-gradient in the accent colour at 16% opacity, add energy without needing an image. The default black, white and coral palette echoes Product Hunt's colours, and you can change it in one click.

**One clear ask**

The footer, separated by a thick accent rule, has the date ("Today · Nov 18") and a single call to action ("Your upvote helps us reach more makers"). One request per post converts better than a list.

**Any platform, any launch**

Change the platform field to "the App Store", "Kickstarter", "YouTube" or "Twitch". Long names shrink automatically to fit the width. For livestreams, change the first line to "We're live now on".

**Launch week workflow**

Build anticipation with [Countdown](/social-post-templates/countdown/), announce the product with [Product Launch](/social-post-templates/product-launch/), post this on the day, and close with [Milestone](/social-post-templates/milestone/). All four sizes are included, so the landscape version suits X and the Story version suits Instagram.`,
    },
    features: [
      'Huge condensed "We\'re live on" headline in Bebas Neue',
      'Platform name in the accent colour, auto-shrinking to fit',
      'Diagonal CSS stripe background, no image required',
      'Date line and single call to action above a thick accent rule',
      'Product Hunt-inspired default palette, fully editable',
      'Works for launches, campaigns, releases and livestreams',
      'Portrait, square, Story and 16:9 landscape sizes',
      'PNG, JPEG, ZIP of every size, or HTML export',
    ],
    useCases: [
      { icon: '🐱', title: 'Product Hunt launch day', desc: 'Tell followers you are live and ask for an upvote, posting the landscape size on X and the Story size on Instagram the moment your launch goes up.' },
      { icon: '📱', title: 'App store releases', desc: 'Change the platform to "the App Store" or "Google Play" and the date line to "Download today" to announce your app\'s release.' },
      { icon: '💰', title: 'Crowdfunding campaigns', desc: 'Announce a Kickstarter or Indiegogo campaign launch, using the ask line to request early backers during the critical first days.' },
      { icon: '🔴', title: 'Livestreams and events', desc: 'Change the first line to "We\'re live now on" and the platform to YouTube, Twitch or LinkedIn Live, then post it as a Story when you go live.' },
    ],
    faqs: [
      { q: 'How do I make a Product Hunt launch post?', a: 'Open We\'re Live, keep "Product Hunt" as the platform, set the date and your upvote ask, then download the landscape size for X and the portrait or Story size for LinkedIn and Instagram.' },
      { q: 'Can I use it for other platforms?', a: 'Yes. The platform name is editable: App Store, Google Play, Kickstarter, YouTube, Twitch, or anything else. Long names shrink to fit.' },
      { q: 'Can I change the stripes?', a: 'The stripes use the accent colour, so changing the accent recolours them. To remove or restyle them, fork the template to My Code and edit the .l-stripes CSS.' },
      { q: 'What should I write in the ask?', a: 'Make one clear request, such as an upvote, a download, a backing or "join the stream", and keep it under about 60 characters.' },
    ],
    aiPrompt: {
      paragraph: 'Use an AI assistant to write launch-day copy for each platform, create matching posts for the days before and after, or adapt the stripes and typography to your brand.',
      prompt: `Create a 1080×1350 "We're live on Product Hunt" launch-day post in HTML and CSS.

- Black background covered by diagonal stripes: repeating-linear-gradient(-45deg) of the accent at 16% opacity.
- Huge condensed type (Bebas Neue): a first line "We're live on" and the platform name much larger in the accent colour.
- Footer above a thick accent top border: an uppercase date line and a one-sentence call to action.
- Use --u (1% of the shorter side) so the post scales to square, Story and 16:9.`,
    },
  },

  'discount-badge': {
    keywords: ['sale post template', 'discount instagram post', 'percent off coupon graphic', 'promo code social media post', 'flash sale post design'],
    about: {
      title: 'Discount Badge — Free Sale and Coupon Post Template',
      description: `**Discount Badge** is a free sale post template built around a big circular "% off" badge. Under the badge sit the offer headline, a dashed promo-code chip that looks like a coupon, and the end date that adds urgency.

**A badge that stops the scroll**

The badge is a solid accent circle tilted at -8 degrees, with a white "50%" in Poppins 900 and "OFF" spaced out underneath. A double ring, made with two CSS box-shadows (one in the background colour, one in the accent), gives it a sticker look without any image.

**Coupon-style promo code**

The promo code sits in a white chip with a dashed accent border, which people recognise as a coupon. The end-date line underneath ("Ends Sunday at midnight") adds a deadline, one of the most effective ways to lift sale conversions.

**Adapts to every size**

On portrait, square and Story sizes the badge sits above the centred copy. On the 16:9 landscape size for X the layout switches to a row, with a larger badge on the left and left-aligned copy on the right. Long offer headlines shrink to fit.

**Edit for any offer**

Use it for percentages ("30%"), fixed amounts ("$20") or words ("BOGO"). Change "OFF" to "SAVE" or "FREE", and the code chip to "No code needed".

Running Black Friday or Cyber Monday? The dedicated [Black Friday Sale](/social-post-templates/holiday-sale/) template uses bolder condensed type. Featuring one product? See [Product Spotlight](/social-post-templates/product-spotlight/).`,
    },
    features: [
      'Circular tilted discount badge with a double sticker ring',
      'Editable discount value and badge word (OFF, SAVE, FREE)',
      'Offer headline with *asterisk* highlights',
      'Coupon-style promo code chip with a dashed border',
      'End date line for urgency',
      'Row layout with a bigger badge on the 16:9 size',
      'Pink default palette; 12 palettes and colour pickers',
      'PNG, JPEG, ZIP or HTML export',
    ],
    useCases: [
      { icon: '⚡', title: 'Flash sales', desc: 'Announce a 24- or 48-hour sale with the discount in the badge and the exact end time in the date line, posting the Story version for urgency.' },
      { icon: '🎟', title: 'Coupon code promotions', desc: 'Share an exclusive code for followers in the dashed chip, which makes it easy to track how many sales come from social media.' },
      { icon: '📚', title: 'Course and subscription discounts', desc: 'Promote an annual-plan or course discount with "40%" in the badge and the plan name in the headline, highlighted in the accent colour.' },
      { icon: '🛍', title: 'Seasonal store sales', desc: 'Reuse the same design for spring, summer and end-of-season sales, switching palettes so each campaign looks fresh but on-brand.' },
    ],
    faqs: [
      { q: 'How do I make a sale post for Instagram?', a: 'Open Discount Badge, set the discount (for example 50%), write the offer, add your promo code and end date, choose colours, and download the 1080×1350 portrait or 1080×1920 Story image.' },
      { q: 'Can I show a dollar amount instead of a percentage?', a: 'Yes. The discount field is free text, so "$20", "2 for 1" or "BOGO" all work. Change the badge word to match.' },
      { q: 'What if there is no promo code?', a: 'Change the code chip to "No code needed" or "Auto-applied at checkout", or clear it and the chip disappears.' },
      { q: 'Is there a Black Friday version?', a: 'Yes. The Black Friday Sale template is designed for Black Friday and Cyber Monday, with condensed type on black.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to write offer headlines for different audiences, create a week of sale countdown posts, or convert this template into a component for your store\'s marketing pages.',
      prompt: `Build a 1080×1350 discount sale post in HTML and CSS.

- Light pink background with a soft radial accent glow behind a large circular badge.
- Badge: a solid accent circle tilted -8deg with "50%" (Poppins 900) and a spaced "OFF" below, plus a double ring from two box-shadows.
- Below it, centred: the offer headline, a white promo-code chip with a dashed accent border, and a small end-date line.
- At 1600×900, switch to a row layout with a larger badge on the left.
- Use --u (1% of the shorter side) for sizing.`,
    },
  },

  'holiday-sale': {
    keywords: ['black friday post template', 'cyber monday sale post', 'black friday instagram post', 'holiday sale social media template', 'black friday promo graphic'],
    about: {
      title: 'Black Friday Sale — Free Black Friday and Cyber Monday Post Template',
      description: `**Black Friday Sale** is a free social post template for Black Friday, Cyber Monday and holiday sales. Massive condensed "BLACK FRIDAY" type, with the first word in outline and the second in neon yellow, sits above the deal ("Up to 60% off"), with the sale dates and a promo-code block in the footer.

**Dates for 2026**

In 2026 Thanksgiving is on Thursday November 26, Black Friday is on **November 27** and Cyber Monday is on **November 30**. The default copy uses "Nov 27 – Nov 30" so the post covers the whole weekend. Change it for early-access deals or extended sales.

**Bold type, no photos needed**

Both headline words are set in Bebas Neue at an enormous size. The first word is outlined using CSS -webkit-text-stroke with a transparent fill, and the second is filled with the accent, which creates contrast without any image. A thin accent bar along the bottom edge finishes the frame.

**Retitle it for any holiday**

Every word is editable. Change the two lines to "CYBER / MONDAY", "HOLIDAY / SALE", "BOXING / DAY" or "END OF / SEASON", and switch the palette to match. Long deal lines shrink to fit.

**Every format for the weekend**

Post the 4:5 portrait version in the Instagram feed, the 9:16 version in Stories, and the 16:9 version on X. "All sizes (ZIP)" downloads all four at once, ready to schedule.

Need a softer, everyday sale design? Try [Discount Badge](/social-post-templates/discount-badge/). Building anticipation? Use [Countdown](/social-post-templates/countdown/) for "3 days left" posts.`,
    },
    features: [
      'Huge condensed BLACK / FRIDAY headline in Bebas Neue',
      'Outline first word (CSS text-stroke) and accent-filled second word',
      'Deal line, sale dates and promo code block',
      'Defaults set to the 2026 dates: Nov 27 – Nov 30',
      'Black and neon-yellow palette, editable for any holiday',
      'Accent bar along the bottom edge',
      'All four sizes, including Story and X landscape',
      'PNG, JPEG, ZIP or HTML export',
    ],
    useCases: [
      { icon: '🖤', title: 'Black Friday weekend', desc: 'Announce your Black Friday deal on November 27, 2026 with the discount in the deal line and a code customers can copy from the image.' },
      { icon: '💻', title: 'Cyber Monday offers', desc: 'Retitle the headline "CYBER / MONDAY" and switch to a blue or purple palette for November 30 online-only deals.' },
      { icon: '🎁', title: 'Holiday and Christmas sales', desc: 'Change the lines to "HOLIDAY / SALE" and use a red or green palette for December promotions, keeping the same bold style.' },
      { icon: '🏪', title: 'Small Business Saturday', desc: 'Promote local or independent shop deals on the Saturday after Black Friday, with your store name in the deal line.' },
    ],
    faqs: [
      { q: 'When is Black Friday 2026?', a: 'Black Friday 2026 is on Friday November 27, the day after Thanksgiving (Thursday November 26). Cyber Monday 2026 is on November 30. The template\'s default dates cover that weekend.' },
      { q: 'How do I make a Black Friday post for Instagram?', a: 'Open the template, set your deal (for example "Up to 60% off"), the dates and the promo code, then download the 1080×1350 portrait version for the feed and the 1080×1920 version for Stories.' },
      { q: 'Can I use it for Cyber Monday?', a: 'Yes. Change the headline lines to "CYBER" and "MONDAY", update the dates, and pick a different palette.' },
      { q: 'Should I post the same image everywhere?', a: 'Use the size made for each placement: 4:5 for the Instagram and Facebook feeds, 9:16 for Stories, and 16:9 for X. Download all four with "All sizes (ZIP)".' },
    ],
    aiPrompt: {
      paragraph: 'Use an AI assistant to plan a Black Friday post schedule, write deal lines for each product category, or generate matching Cyber Monday and holiday versions of this template.',
      prompt: `Create a 1080×1350 Black Friday sale post in HTML and CSS.

- Black background with a thin accent (neon yellow) bar along the bottom edge.
- Two huge uppercase condensed lines (Bebas Neue): "BLACK" in outline only (-webkit-text-stroke, transparent fill) and "FRIDAY" filled with the accent.
- A big uppercase deal line ("Up to 60% off") below.
- Footer row: sale dates on the left and a promo code on an accent block on the right.
- Use --u (1% of the shorter side) for sizing.`,
    },
  },

  'product-spotlight': {
    keywords: ['product post template', 'ecommerce instagram post', 'product showcase social media', 'new arrival post template', 'shopify product post design'],
    about: {
      title: 'Product Spotlight — Free Ecommerce Product Post Template',
      description: `**Product Spotlight** is a free ecommerce post template for Shopify, Etsy, WooCommerce and Instagram shops. A large product photo fills most of the post, and a clean white card underneath shows a "Featured" label, the product name, the price and a "Shop now" button.

**Photo first**

Product posts sell with the image, so the photo takes the available space above the card, with rounded corners. Upload any product shot: it's cropped to fill the frame and centred, so square studio photos and lifestyle shots both work. Uploads are resized in your browser and never leave your device.

**A card that converts**

The card stacks a small uppercase green label, the product name in DM Sans at 700 weight, and a row with the price on the left and a pill "Shop now" button on the right. The price is large and bold because it's the number shoppers look for first.

**Clean, neutral styling**

A warm stone background, white card and soft shadow suit almost any product photo, from fashion to homeware to gadgets. Change the accent to match your store's button colour.

**Layouts for every size**

On portrait, square and Story sizes the photo sits above the card. On the 16:9 landscape size the post switches to a row, with the photo on the left and the card on the right, which suits X and Facebook link posts. Long product names shrink to fit.

Running a sale on the product? Use [Discount Badge](/social-post-templates/discount-badge/). Sharing a customer review of it? Try [Customer Testimonial](/social-post-templates/testimonial/).`,
    },
    features: [
      'Large product photo with rounded corners, cropped to fill',
      'White card with label, product name, price and shop button',
      'Bold price display, the number shoppers look for first',
      'Photo-left, card-right row layout on the 16:9 size',
      'Neutral stone and white palette that suits any product photo',
      'Editable label (Featured, New, Back in stock, Best seller)',
      'Photos stay in your browser; nothing is uploaded',
      'PNG, JPEG, ZIP or HTML export',
    ],
    useCases: [
      { icon: '🛍', title: 'New arrivals', desc: 'Post each new product with the label set to "New" and a clean photo, so followers see what just landed in your store.' },
      { icon: '🔁', title: 'Back in stock alerts', desc: 'Change the label to "Back in stock" and post the Story version so followers who missed the product can buy it before it sells out again.' },
      { icon: '⭐', title: 'Best seller features', desc: 'Highlight your most popular item with the label "Best seller" and the price, a proven way to turn social traffic into sales.' },
      { icon: '🎁', title: 'Gift guides', desc: 'Create one card per gift idea with the same palette, then post them as a carousel or a series of Stories during the holiday season.' },
    ],
    faqs: [
      { q: 'How do I make a product post for Instagram?', a: 'Open Product Spotlight, upload your product photo, set the label, name, price and button text, then download the 1080×1350 portrait image for the feed or the Story version.' },
      { q: 'What kind of photo works best?', a: 'A sharp photo with the product in the centre. The image is cropped to fill the frame and centred, so leave some space around the product. Square or portrait photos give the best fit.' },
      { q: 'Can I hide the price?', a: 'Yes. Clear the price field and it disappears, leaving the shop button on its own.' },
      { q: 'Is my product photo uploaded anywhere?', a: 'No. The photo is resized and kept in your browser, and the image export is drawn locally.' },
    ],
    aiPrompt: {
      paragraph: 'Give this template to an AI assistant to write short product names and button copy, build a gift-guide carousel, or turn it into a product card component fed by your store\'s data.',
      prompt: `Design a 1080×1350 ecommerce product spotlight post in HTML and CSS.

- Warm light-grey background with padding.
- A large rounded product photo area (background-size: cover) filling the top.
- A white rounded card with a soft shadow at the bottom: small uppercase green label, product name (DM Sans 700), then a row with a big bold price on the left and a pill "Shop now" button on the right.
- At 1600×900, switch to a row: photo left, card (40% width) right.
- Use --u (1% of the shorter side) for sizing.`,
    },
  },

  'webinar-event': {
    keywords: ['webinar post template', 'event promotion post', 'webinar announcement linkedin', 'virtual event social media template', 'speaker announcement post'],
    about: {
      title: 'Webinar Event — Free Webinar and Event Promotion Post Template',
      description: `**Webinar Event** is a free post template for promoting webinars, workshops, meetups and conference talks on LinkedIn, Instagram, Facebook and X. A calendar-style date block and a "Free live webinar" kicker sit at the top, the talk title fills the middle, and the footer shows the speaker's photo, name and role next to a "Register free" button.

**The date is unmissable**

The date block is a rounded square with the month in small accent capitals and the day in a large bold numeral, the same pattern people know from calendar apps. It sits top-left, where eyes land first.

**Time zones included**

The time line ("Thursday · 1 PM ET / 10 AM PT") has room for two time zones, which matters for US audiences spread across coasts and for international attendees. Write it the way your audience reads it.

**Put a face on it**

Events with a visible speaker get more registrations. Upload the speaker's photo to the round frame with an accent ring, and add their name and role. The button on the right gives a clear next step.

**Professional blue gradient**

The default background is a deep ocean-blue diagonal gradient with sky-blue accents, which reads as professional for B2B and tech audiences. The title uses Montserrat at 800 weight. Highlight the key benefit with *asterisks*, and long titles shrink to fit.

Counting down to the event? Use [Countdown](/social-post-templates/countdown/). Sharing a quote from the speaker afterwards? Try [Big Quote](/social-post-templates/big-quote/).`,
    },
    features: [
      'Calendar-style date block with month and day',
      'Kicker, talk title and a time line with time zones',
      'Speaker photo with an accent ring, plus name and role',
      'Register button for a clear call to action',
      'Deep blue gradient background with sky-blue accents',
      'Title highlights with *asterisks*; long titles shrink',
      'Portrait, square, Story and landscape sizes',
      'PNG, JPEG, ZIP or HTML export',
    ],
    useCases: [
      { icon: '🎥', title: 'B2B webinars', desc: 'Promote a live webinar on LinkedIn with the speaker\'s photo and title, the date block for quick scanning and ET/PT times for US audiences.' },
      { icon: '🛠', title: 'Workshops and live classes', desc: 'Announce a hands-on session with the skill in the title and "Seats limited" in the kicker, posting the Story version as a reminder on the day.' },
      { icon: '🎤', title: 'Conference talks', desc: 'Share that you are speaking at a conference, with the event name in the kicker and your talk title as the headline.' },
      { icon: '👥', title: 'Meetups and community events', desc: 'Promote local meetups or X Spaces with the venue or platform in the time line and the host as the featured speaker.' },
    ],
    faqs: [
      { q: 'How do I make a webinar promotion post?', a: 'Open Webinar Event, set the month and day, the title and the time with time zones, upload the speaker photo, add their name and role, and download the portrait size for LinkedIn and Instagram or the landscape size for X.' },
      { q: 'How should I write the time for US audiences?', a: 'List at least two zones, such as "1 PM ET / 10 AM PT". Add CT or GMT if your audience spans more regions.' },
      { q: 'Can I use it for in-person events?', a: 'Yes. Change the kicker to "Meetup" or "Workshop" and put the venue in the time line.' },
      { q: 'What if there are several speakers?', a: 'The template shows one featured speaker. For a panel, list the names in the speaker field, or make one post per speaker.' },
    ],
    aiPrompt: {
      paragraph: 'Use an AI assistant to write event titles that promise a clear outcome, schedule a promotion sequence (announcement, reminder, last chance), or adapt the template for multi-speaker panels.',
      prompt: `Build a 1080×1350 webinar promotion post in HTML and CSS.

- Deep blue diagonal gradient background.
- Top row: a light rounded-square date block (small accent month, big bold day) and an uppercase accent kicker.
- Middle: a large title (Montserrat 800) and a time line with ET/PT time zones.
- Footer row: round speaker photo with an accent ring, name and role, and a solid accent "Register free" button on the right.
- Use --u (1% of the shorter side) for sizing.`,
    },
  },

  'countdown': {
    keywords: ['countdown post template', 'days left instagram post', 'event countdown graphic', 'launch countdown post', 'sale ends soon post template'],
    about: {
      title: 'Countdown — Free "Days Left" Countdown Post Template',
      description: `**Countdown** is a free urgency post template for launches, events, sales and deadlines. A giant number sits inside a glowing ring, with "Only" above, "days left" below, the event or offer name and the exact deadline.

**Urgency at a glance**

The number is set in Space Grotesk at a huge size in the centre of a circle drawn with a thick accent border. An outer glow and an inner glow (both CSS box-shadows) make the ring look neon against the deep indigo background. People get the message, "3 days left", before they read anything else.

**A series in minutes**

Countdowns work best as a sequence: 7 days, 3 days, 1 day, "Today". Change only the number and unit for each post, and keep the colours and title the same so your followers recognise the series. Use "hours left" or "spots left" for other kinds of urgency.

**Be specific about the deadline**

The deadline line ("Ends Friday, 11:59 PM ET") states exactly when the offer or registration closes, including the time zone. A precise deadline builds more trust, and more action, than a vague "ending soon".

**Every size**

The layout is centred for portrait, square and Story sizes, and the ring shrinks slightly on the 16:9 landscape size for X. Long event names shrink to fit.

Pair it with [We're Live](/social-post-templates/we-are-live/) for launch day, [Black Friday Sale](/social-post-templates/holiday-sale/) for holiday deals, or [Webinar Event](/social-post-templates/webinar-event/) for registrations.`,
    },
    features: [
      'Giant countdown number inside a glowing neon ring',
      'Kicker, unit ("days left") and event or offer name',
      'Deadline line with time and time zone',
      'Inner and outer glow made with CSS box-shadows',
      'Deep indigo and rose default palette',
      'Change the unit to hours, spots or seats',
      'Centred layout across all four sizes',
      'PNG, JPEG, ZIP or HTML export',
    ],
    useCases: [
      { icon: '⏳', title: 'Launch countdowns', desc: 'Build anticipation before a product launch with a 7-, 3- and 1-day sequence, then switch to the We\'re Live template on the day.' },
      { icon: '🎟', title: 'Early-bird ticket deadlines', desc: 'Remind followers that early-bird pricing ends soon, with the conference name highlighted and the exact cutoff time in the deadline line.' },
      { icon: '🛒', title: 'Sale ending reminders', desc: 'Post "1 day left" before a sale ends, the reminder that often drives the most sales, using the Story size for the final hours.' },
      { icon: '🪑', title: 'Limited spots', desc: 'Change the unit to "spots left" or "seats left" to show scarcity for a cohort course, workshop or beta programme.' },
    ],
    faqs: [
      { q: 'How do I make a countdown post for Instagram?', a: 'Open Countdown, enter the number of days, the event or offer name and the deadline, then download the Story size (1080×1920) for daily reminders or the portrait size for the feed.' },
      { q: 'Is the countdown live?', a: 'No. Social images are static, so the number is whatever you type. Make one image per day, which takes seconds because only the number changes.' },
      { q: 'Can I count hours or spots instead of days?', a: 'Yes. The unit is free text, so "hours left", "spots left" or "seats left" all work.' },
      { q: 'What deadline format works best?', a: 'Include the day, the time and the time zone, such as "Ends Friday, 11:59 PM ET".' },
    ],
    aiPrompt: {
      paragraph: 'Use an AI assistant to plan a countdown posting schedule, write a different hook for each day, or generate the full 7-to-1 sequence from this template.',
      prompt: `Create a 1080×1350 countdown social post in HTML and CSS.

- Deep indigo background with a radial accent glow behind the centre.
- Centred stack: uppercase "Only" kicker, a large circle with a thick accent border and inner/outer glow box-shadows containing a huge number (Space Grotesk 700), an uppercase accent "days left", the event name and a small deadline line.
- Use --u (1% of the shorter side) for sizing so it scales to square, Story and 16:9.`,
    },
  },

  'testimonial': {
    keywords: ['testimonial post template', 'customer review post instagram', 'client testimonial graphic', 'review social media template', '5 star review post design'],
    about: {
      title: 'Customer Testimonial — Free Review and Testimonial Post Template',
      description: `**Customer Testimonial** is a free social proof template for sharing reviews and client feedback on Instagram, LinkedIn, Facebook and X. A white card holds a five-star rating, the review quote, the customer's photo, name and company, and an optional company logo.

**Social proof that looks credible**

Real reviews outperform marketing copy, but only if they look genuine. The layout copies the familiar shape of review sites: stars first, then the quote, then a real person with a photo and job title. The company logo slot in the corner adds weight for B2B testimonials.

**Readable quote, clear hierarchy**

The review is set in Plus Jakarta Sans at 700 weight, large enough to read on a phone, with the key result highlighted in the accent colour using *asterisks* ("We cut onboarding time in half"). The stars are text characters in the accent colour, so you can show 4 or 4.5 stars by editing the field.

**Clean card on a soft background**

The white card has generous padding, large rounded corners and a soft shadow, on a pale indigo background with an amber glow in the corner. Long reviews shrink automatically to fit the card.

**Every format**

Use the portrait size for the Instagram feed and LinkedIn, the Story size with a link to your reviews page, and the landscape size for X.

Showing measurable results? [Before & After](/social-post-templates/before-after/) puts two images side by side. Quoting someone without a review score? Use [Big Quote](/social-post-templates/big-quote/).`,
    },
    features: [
      'Star rating line in the accent colour, editable as text',
      'Large review quote with *asterisk* highlights for the result',
      'Customer photo, name, role and company',
      'Optional company logo for B2B credibility',
      'White card with soft shadow on a pale background',
      'Long reviews shrink to fit the card',
      'Portrait, square, Story and landscape sizes',
      'PNG, JPEG, ZIP or HTML export',
    ],
    useCases: [
      { icon: '⭐', title: 'Customer reviews', desc: 'Turn a five-star Google, G2, Trustpilot or App Store review into a polished card, crediting the reviewer with their name and photo where you have permission.' },
      { icon: '🏢', title: 'B2B case study quotes', desc: 'Share a client\'s result-focused quote with their role, company and logo, a strong supporting post for a full case study on your website.' },
      { icon: '🎨', title: 'Freelancer and agency feedback', desc: 'Post client feedback after finishing a project, with the client\'s company logo, to win new work through social proof.' },
      { icon: '📚', title: 'Course and coaching results', desc: 'Share a student\'s outcome in their own words, with the result highlighted in the accent colour, to build trust before a course launch.' },
    ],
    faqs: [
      { q: 'How do I make a testimonial post for Instagram?', a: 'Open Customer Testimonial, paste the review, add the customer\'s name, role and company, upload their photo and logo, and download the 1080×1350 portrait image.' },
      { q: 'Can I show fewer than five stars?', a: 'Yes. The stars are an editable text field, so type four stars, or replace them with a score like "4.8/5" or a platform name.' },
      { q: 'Do I need permission to post a customer review?', a: 'It\'s good practice to ask before using someone\'s name, photo or company logo. Public reviews can usually be quoted, but permission builds trust and avoids problems.' },
      { q: 'What if I don\'t have a customer photo?', a: 'The photo slot shows an accent gradient circle by default. You can also upload the company logo there instead.' },
    ],
    aiPrompt: {
      paragraph: 'Use an AI assistant to shorten long reviews into a punchy quote without changing their meaning, pick the strongest testimonials from a spreadsheet, or create a carousel of reviews from this template.',
      prompt: `Design a 1080×1350 customer testimonial post in HTML and CSS.

- Pale indigo background with an amber radial glow in the top-right corner.
- A white card with large rounded corners and a soft shadow filling the post.
- Inside: a row of accent-coloured stars, a large review quote (Plus Jakarta Sans 700) with an accent highlight, and a footer with a round photo, name, role and company, plus a logo aligned right (background-size: contain).
- Use --u (1% of the shorter side) for sizing.`,
    },
  },

  'before-after': {
    keywords: ['before and after post template', 'before after comparison instagram', 'transformation post template', 'redesign before after graphic', 'results comparison social media post'],
    about: {
      title: 'Before & After — Free Before and After Comparison Post Template',
      description: `**Before & After** is a free comparison post template for showing transformations: website redesigns, renovations, fitness progress, cleaning results and photo edits. A results headline sits at the top, two photo panels labelled "Before" and "After" fill the post, and your handle sits at the bottom.

**The layout adapts to the size**

On tall sizes (4:5 portrait and 9:16 Story) the panels stack top and bottom, so each image stays as wide as possible. On square and 16:9 landscape sizes they sit side by side. The layout uses CSS grid, so both panels are always exactly the same size, which keeps the comparison fair.

**Labels that read instantly**

Each panel has a pill label in the top-left corner. "Before" is a translucent dark pill, and "After" is filled with the bright accent green, which signals the improvement. Rename them to "Old / New", "Day 1 / Day 90" or "v1 / v2".

**Headline with the result**

Lead with the outcome: "Same content. *3× the signups*." The highlighted part shows in the accent colour. Long headlines shrink so they never push the photos off the post.

**Photos stay private**

Upload both images. They're resized and kept in your browser, never sent to a server, and the export is drawn locally. Until you upload, the "Before" panel shows a desaturated placeholder so you can see the effect.

Sharing a client's words about the result too? Combine it with [Customer Testimonial](/social-post-templates/testimonial/).`,
    },
    features: [
      'Two equal photo panels using CSS grid',
      'Stacked on portrait and Story, side by side on square and landscape',
      'Editable "Before" and "After" pill labels, with the After label in the accent',
      'Results headline with *asterisk* highlights',
      'Headline shrinks so photos always keep their space',
      'Dark neutral background that suits any photos',
      'Photos stay in your browser; nothing is uploaded',
      'PNG, JPEG, ZIP or HTML export',
    ],
    useCases: [
      { icon: '🖥', title: 'Website and app redesigns', desc: 'Show the old and new homepage side by side, with the business result such as more signups or faster load times in the headline.' },
      { icon: '🏠', title: 'Renovation and cleaning', desc: 'Contractors, cleaners and interior designers can post stacked before and after room photos in the Story size, with the service named in the headline.' },
      { icon: '💪', title: 'Fitness and coaching progress', desc: 'Share client progress with "Day 1" and "Day 90" labels and the client\'s permission, highlighting the result in the accent colour.' },
      { icon: '📷', title: 'Photo editing and retouching', desc: 'Show a raw photo next to your edit to market editing services, presets or retouching skills, using the square size for a balanced comparison.' },
    ],
    faqs: [
      { q: 'How do I make a before and after post?', a: 'Open the template, upload the before and after photos, write a results headline, and download it. Portrait and Story sizes stack the photos and square and landscape put them side by side, so try the size that suits your images.' },
      { q: 'Can I change the labels?', a: 'Yes. Both labels are editable, so you can use "Old / New", "Day 1 / Day 90", "v1 / v2" or another language.' },
      { q: 'What photos work best?', a: 'Take both photos from the same angle and distance, with similar lighting. Each image is cropped to fill its panel, so keep the subject centred.' },
      { q: 'Are my photos uploaded?', a: 'No. Both photos stay in your browser, and the export is drawn locally on your device.' },
    ],
    aiPrompt: {
      paragraph: 'Use an AI assistant to write results-driven headlines for each comparison, or extend this template into an interactive before/after slider for your website.',
      prompt: `Create a 1080×1350 before-and-after comparison post in HTML and CSS.

- Dark neutral background, with a bold headline (with an accent highlight) at the top limited to about 28% of the height.
- Below it, a CSS grid with two equal rounded photo panels (background-size: cover): stacked rows on portrait and Story sizes, two columns on square and 16:9.
- Each panel has a pill label in the top-left: "Before" translucent dark, "After" in the accent colour.
- Handle at the bottom. Use --u (1% of the shorter side) for sizing.`,
    },
  },

  'carousel-cover': {
    keywords: ['instagram carousel template', 'carousel cover slide', 'linkedin carousel template', 'swipe post template', 'carousel first slide design'],
    about: {
      title: 'Carousel Cover Slide — Free Instagram and LinkedIn Carousel Template',
      description: `**Carousel Cover Slide** is the first slide of a free carousel template set for Instagram and LinkedIn. It's built to stop the scroll and earn the swipe: a bold hook headline on a vivid indigo-to-violet gradient, a "Save this" kicker, a slide counter ("1/7"), your handle and a bright "Swipe →" pill.

**The hook is everything**

A carousel lives or dies on its first slide. The headline is set in Poppins at 800 weight, very large, with tight tracking. Promise a specific payoff ("7 CSS tricks I wish I knew *sooner*") and colour the emotional word with *asterisks*. Long hooks shrink to fit.

**Signals that invite a swipe**

The slide counter tells people how much value is coming, and the yellow "Swipe →" pill in the bottom-right corner points them onward. A large translucent accent circle in the top-right corner, drawn with a CSS pseudo-element, adds depth without distracting from the headline.

**Part of a matching set**

Use this cover with [Carousel Step Slide](/social-post-templates/carousel-step/) for each point and [Carousel Final Slide](/social-post-templates/carousel-save/) for the call to action. Give them the same palette and fonts and the whole carousel looks designed as one.

**Carousel sizes**

Instagram carousels use one aspect ratio for every slide. 4:5 portrait (1080×1350) takes up the most feed space and is the default. LinkedIn document carousels also work well at 4:5 or square. Download each slide as a PNG and upload them in order.`,
    },
    features: [
      'Big hook headline in Poppins 800 with *asterisk* highlights',
      '"Save this" kicker and slide counter (e.g. 1/7)',
      '"Swipe →" pill in the accent colour',
      'Indigo-to-violet gradient with a decorative accent circle',
      'Matches the Step and Final carousel slide templates',
      '4:5 portrait default, the carousel format that fills the feed',
      'Long hooks shrink to fit',
      'PNG, JPEG, ZIP or HTML export',
    ],
    useCases: [
      { icon: '📋', title: 'Listicle carousels', desc: 'Open a "7 tools I use daily" or "5 mistakes to avoid" carousel with the number in the hook and the slide counter showing how many slides follow.' },
      { icon: '🎓', title: 'Mini-guides and tutorials', desc: 'Promise one clear outcome on the cover, then teach it step by step with the Carousel Step Slide template in the same colours.' },
      { icon: '💼', title: 'LinkedIn document posts', desc: 'Export the slides at 4:5, combine them into a PDF, and upload it as a LinkedIn document post, a format that tends to earn long dwell time.' },
      { icon: '🔖', title: 'Save-worthy cheat sheets', desc: 'Use the "Save this" kicker for reference content like shortcuts or checklists, which people bookmark and come back to.' },
    ],
    faqs: [
      { q: 'How do I make an Instagram carousel?', a: 'Make a cover with this template, one Carousel Step Slide per point, and a Carousel Final Slide, all in the same palette at 1080×1350. Download each one and upload them together as a carousel post, in order.' },
      { q: 'What size should carousel slides be?', a: 'Use 1080×1350 (4:5 portrait) for Instagram, which fills the most screen space. Every slide in a carousel must share the same aspect ratio.' },
      { q: 'How many slides should a carousel have?', a: 'Instagram allows up to 20 slides, but 5 to 10 is common. Make sure the counter on the cover matches the real number of slides.' },
      { q: 'Can I use it for LinkedIn?', a: 'Yes. Export the slides at 4:5 or square, combine them into a PDF, and upload it as a document post.' },
    ],
    aiPrompt: {
      paragraph: 'Give the carousel templates to an AI assistant to outline a carousel from one idea, write a scroll-stopping hook, or generate every slide\'s text for the Step template.',
      prompt: `Build a 1080×1350 Instagram carousel cover slide in HTML and CSS.

- Diagonal gradient from deep indigo to violet, with a large translucent accent circle (::after) in the top-right corner.
- Top row: a "Save this" kicker and a slide counter pill ("1/7").
- Middle: a huge hook headline (Poppins 800, tight tracking) with an accent highlight.
- Bottom row: the handle on the left and a yellow "Swipe →" pill on the right.
- Use --u (1% of the shorter side) for sizing.`,
    },
  },

  'carousel-step': {
    keywords: ['carousel slide template', 'numbered list post template', 'step by step instagram post', 'tutorial carousel slide', 'educational carousel design'],
    about: {
      title: 'Carousel Step Slide — Free Numbered Tutorial Slide Template',
      description: `**Carousel Step Slide** is the middle-slide template of the free carousel set. Each slide carries one step: a large outlined number ("02"), the step title, a short explanation, your handle and a progress indicator ("2 / 7").

**One idea per slide**

The best carousels give each slide one clear point. The step title is set in Poppins at 800 weight, with the explanation in a lighter, smaller paragraph underneath. Readers get the point from the title and the detail from the paragraph. Highlight a key term like *clamp()* with asterisks.

**Outlined numbers keep the order clear**

The step number is huge and drawn as an outline only, using CSS -webkit-text-stroke in the accent colour with a transparent fill. It shows where you are in the sequence without overpowering the content. A thick accent stripe down the left edge ties the slides together as you swipe.

**Progress keeps people swiping**

The "2 / 7" indicator in the bottom-right corner tells readers how far they've come and how much is left, which helps keep them swiping to the end.

**Make a whole carousel quickly**

Edit the number, title, explanation and progress for each step, download, and repeat. Your colours and fonts are saved, so every slide matches. Start with [Carousel Cover Slide](/social-post-templates/carousel-cover/) and finish with [Carousel Final Slide](/social-post-templates/carousel-save/).

Showing code in a step? Use [Code Tip](/social-post-templates/code-tip/) for that slide.`,
    },
    features: [
      'Huge outlined step number (CSS text-stroke)',
      'Step title and explanation with *asterisk* highlights',
      'Progress indicator such as "2 / 7"',
      'Accent stripe down the left edge for continuity',
      'Title and explanation shrink together when long',
      'Light violet default palette, matching the carousel set',
      'Edits are saved, so every slide stays consistent',
      'PNG, JPEG, ZIP or HTML export',
    ],
    useCases: [
      { icon: '🪜', title: 'Step-by-step tutorials', desc: 'Teach a process one step per slide, numbering each one and keeping explanations to a sentence or two so the carousel stays quick to read.' },
      { icon: '📝', title: 'Numbered list posts', desc: 'Turn a list article ("10 VS Code extensions") into slides, with each item\'s name as the title and a one-line reason why.' },
      { icon: '🧩', title: 'Frameworks and processes', desc: 'Explain a framework or method one stage at a time, with the stage name in the title and the progress indicator showing the full sequence.' },
      { icon: '✅', title: 'Checklists', desc: 'Break a launch, SEO or onboarding checklist into numbered slides that followers can save and work through later, one item per slide.' },
    ],
    faqs: [
      { q: 'How do I make several slides that match?', a: 'Edit the number, title, explanation and progress for the first step, download it, then change the text for the next step and download again. Colours and fonts stay the same because your edits are saved.' },
      { q: 'Can I use letters or icons instead of numbers?', a: 'Yes. The number field is free text, so "A", "B", "Q1" or a symbol all work.' },
      { q: 'How long should each step be?', a: 'Keep the title under about 50 characters and the explanation to one or two sentences. Longer text shrinks to fit.' },
      { q: 'Does it match the other carousel slides?', a: 'Yes. It shares the Poppins type and violet palette of the Carousel Cover and Final slides. If you change colours, apply the same palette to all three.' },
    ],
    aiPrompt: {
      paragraph: 'Use an AI assistant to split an article into carousel steps with titles and one-sentence explanations, then paste each into this template.',
      prompt: `Design a 1080×1350 numbered carousel step slide in HTML and CSS.

- Light violet background with a thick accent stripe down the left edge.
- A huge outlined step number ("02") using -webkit-text-stroke in the accent with a transparent fill.
- Middle: the step title (Poppins 800) and a one-sentence explanation below it.
- Footer row: the handle on the left and an accent progress indicator ("2 / 7") on the right.
- Use --u (1% of the shorter side) for sizing.`,
    },
  },

  'carousel-save': {
    keywords: ['carousel last slide template', 'follow for more post', 'call to action slide instagram', 'save this post template', 'like comment share save graphic'],
    about: {
      title: 'Carousel Final Slide — Free "Follow for More" CTA Slide Template',
      description: `**Carousel Final Slide** is the closing slide of the free carousel set. It turns readers who reached the end into followers: a big "Found this *useful?*" headline, four action chips (Like, Comment, Save, Share), a follow line, your handle and an optional logo or profile photo.

**Ask for the action you want**

Saves and shares are some of the strongest engagement signals on Instagram, and a final slide that asks for them clearly tends to earn more of both. The four chips sit in a 2×2 grid (a single row of four on the 16:9 size), each with a simple symbol: ♥ Like, ✎ Comment, ⚑ Save, ↗ Share.

**Make the follow obvious**

Under a thick dividing rule, the footer pairs your logo or photo with a line like "Follow for a new tip every day" and your handle in the accent colour. Telling people what they'll get from following works better than a bare "Follow me".

**Bold and friendly design**

The headline uses Poppins at 800 weight, very large, on a bright yellow background with near-black text and burnt-orange accents. The chips have white translucent fills with dark outlines, a hand-drawn sticker look that stands out from the slides before it.

**Completes the set**

Use it after [Carousel Cover Slide](/social-post-templates/carousel-cover/) and your [Carousel Step Slides](/social-post-templates/carousel-step/). It also works as a standalone engagement post, or at the end of a Story sequence.`,
    },
    features: [
      'Big "Found this useful?" headline with *asterisk* highlights',
      'Four editable action chips: Like, Comment, Save, Share',
      '2×2 chip grid, a row of four on the 16:9 size',
      'Follow line, handle and optional logo or profile photo',
      'Bright yellow sticker-style design',
      'Matches the carousel cover and step slides',
      'Portrait, square, Story and landscape sizes',
      'PNG, JPEG, ZIP or HTML export',
    ],
    useCases: [
      { icon: '🔚', title: 'Ending every carousel', desc: 'Close each carousel with a clear ask to save and follow, so readers who swiped to the end have an obvious next step.' },
      { icon: '📈', title: 'Growing followers', desc: 'Tell people exactly what they get by following, like "a new tip every day", and add your profile photo so they recognise you in their feed.' },
      { icon: '💬', title: 'Starting comment threads', desc: 'Change the Comment chip to a question such as "✎ Which tip was new?" to invite replies, which helps the post reach more people.' },
      { icon: '📲', title: 'End of a Story sequence', desc: 'Use the 9:16 size as the last frame of a Story series, pointing viewers to your profile or a link sticker.' },
    ],
    faqs: [
      { q: 'What should the last slide of a carousel say?', a: 'Ask for one or two specific actions, such as saving the post and following for more, and say what followers get. This template covers both, with a headline, four action chips and a follow line.' },
      { q: 'Can I change the action chips?', a: 'Yes. All four chips are editable, so you can swap in "Repost", "Tag a friend" or "Visit the link in bio". Leave a chip empty to remove it.' },
      { q: 'Can I add my profile photo?', a: 'Yes. Upload a logo or a profile photo to the footer image slot. It keeps its proportions.' },
      { q: 'Does it work outside carousels?', a: 'Yes. Use it as a standalone engagement post, or as the final frame of an Instagram or Facebook Story sequence.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to write closing calls to action matched to your content, or to adapt this slide for LinkedIn, where "Repost" and "Follow" fit better than "Save".',
      prompt: `Create a 1080×1350 final carousel slide in HTML and CSS.

- Bright yellow background, near-black text and a burnt-orange accent.
- A huge headline (Poppins 800) "Found this useful?" with the last word in the accent.
- A 2×2 grid of chunky chips with translucent white fills and dark outlines: ♥ Like, ✎ Comment, ⚑ Save, ↗ Share.
- Footer above a thick dark rule: an optional logo, a follow line and the handle in the accent.
- Use --u (1% of the shorter side) for sizing.`,
    },
  },

  'story-poll': {
    keywords: ['this or that instagram story template', 'instagram story poll template', 'engagement post template', 'would you rather post', 'story question template'],
    about: {
      title: 'This or That Poll — Free Instagram Story Poll Template',
      description: `**This or That Poll** is a free Story-first engagement template for Instagram and Facebook Stories. A "Settle this" kicker sits at the top, a big question fills the middle, two answer cards sit underneath with a round "VS" badge between them, and a "Vote in the poll ↓" prompt points to Instagram's poll sticker.

**Designed for Story stickers**

Instagram's poll sticker does the voting. This design gives it a stage. At 1080×1920 the two answer cards stack vertically with plenty of space, and the layout keeps text out of the top 250 px and bottom 340 px, where Instagram puts its header and reply bar. Place the poll sticker below the prompt.

**Two clear choices**

The cards are large rounded blocks: option A is translucent with a white outline, and option B is filled with the pink accent, so the two choices look distinct at a glance. The "VS" badge sits exactly between them, centred with CSS transforms.

**Works in the feed too**

On portrait, square and landscape sizes the answer cards sit side by side, so you can post the same question to the feed and ask for answers in the comments.

**Questions that get answers**

The best polls are quick and a little divisive: "Tabs or spaces?", "Coffee or tea?", "Dark mode or light mode?". Highlight the key word in the question with *asterisks*. Long questions shrink to fit.

For a Story that drives clicks instead of votes, use [New Post Link in Bio](/social-post-templates/story-link/).`,
    },
    features: [
      'Story-first 9:16 layout that clears the Story header and reply bar',
      'Big question with *asterisk* highlights',
      'Two answer cards with a centred "VS" badge',
      'Stacked cards on Story, side by side on feed sizes',
      'Prompt line pointing to Instagram\'s poll sticker',
      'Navy-to-blue gradient with a pink accent',
      'Long questions shrink to fit',
      'PNG, JPEG, ZIP or HTML export',
    ],
    useCases: [
      { icon: '🗳', title: 'Instagram Story polls', desc: 'Post the 9:16 version, add Instagram\'s poll sticker below the prompt, and use the two cards to show the options in your brand style.' },
      { icon: '🔥', title: 'Engagement boosters', desc: 'Ask light, divisive questions like "Tabs or spaces?" to get quick reactions from followers, which helps your later Stories reach more people.' },
      { icon: '🧪', title: 'Product feedback', desc: 'Let followers choose between two colours, names or features before you decide, turning everyday product research into engaging content.' },
      { icon: '💬', title: 'Feed debate posts', desc: 'Post the portrait version to the feed and ask people to vote in the comments, using the side-by-side card layout.' },
    ],
    faqs: [
      { q: 'How do I make a "this or that" Instagram Story?', a: 'Open the template (it opens at the 1080×1920 Story size), write your question and two options, download the image, add it to your Story, and place Instagram\'s poll sticker below the prompt.' },
      { q: 'Does the image include a working poll?', a: 'No. Images can\'t include interactive stickers. Add Instagram\'s or Facebook\'s own poll sticker on top of the image when you post the Story.' },
      { q: 'Can I post it in the feed?', a: 'Yes. Switch to the portrait or square size and the answer cards sit side by side. Ask people to vote in the comments.' },
      { q: 'Can I use more than two options?', a: 'The design is built for two choices. For more options, use Instagram\'s quiz sticker on a plain question post.' },
    ],
    aiPrompt: {
      paragraph: 'Use an AI assistant to brainstorm "this or that" questions for your niche, schedule a week of poll Stories, or extend the template with a third option.',
      prompt: `Build a 1080×1920 Instagram Story "this or that" poll graphic in HTML and CSS.

- Vertical gradient from navy to bright blue. Keep content out of the top 250 px and bottom 340 px.
- Uppercase pink kicker, then a big centred question (Poppins 800).
- Two large rounded answer cards stacked vertically (one translucent with a white outline, one filled pink) with a round "VS" badge absolutely centred between them.
- A prompt line ("Vote in the poll ↓") at the bottom.
- On feed sizes, place the cards side by side. Use --u (1% of the shorter side).`,
    },
  },

  'story-link': {
    keywords: ['link in bio story template', 'new post instagram story', 'blog post promotion story', 'story template for new video', 'instagram story link sticker design'],
    about: {
      title: 'New Post Link in Bio — Free Instagram Story Template for New Content',
      description: `**New Post Link in Bio** is a free Story template for promoting new content: blog posts, YouTube videos, podcast episodes, newsletters and product drops. An editorial "New on the blog" label, a serif headline, a cover photo card and a bold "Read it, link in bio ↑" button point viewers to the link.

**Editorial look**

The headline is set in Playfair Display, a magazine-style serif, over a clean DM Sans label and button. The label has an accent underline, and the soft lilac background keeps the post feeling like content rather than an ad.

**Room for the cover image**

Upload your article's featured image, video thumbnail or episode art to the photo card. It fills the space between the headline and the button, with rounded corners and a soft shadow. The headline is capped at 40% of the height, so the image always has room.

**Built around links**

On Instagram, add a link sticker on top of the button area. For feed posts, the "link in bio" call to action tells followers where to go. The layout keeps text clear of the Story header and reply bar at 1080×1920.

**Works beyond Stories**

On the 16:9 landscape size the layout switches to two columns, with text on the left and the photo on the right, which suits X. On portrait and square sizes it works as a feed post announcing new content.

Promoting the same content in the feed? Use [Big Quote](/social-post-templates/big-quote/) for a quote from the article. Asking a question instead? Try [This or That Poll](/social-post-templates/story-poll/).`,
    },
    features: [
      'Editorial Playfair Display headline with *asterisk* highlights',
      'Underlined label ("New on the blog") in the accent colour',
      'Cover photo card with rounded corners and a soft shadow',
      '"Link in bio" pill button for a clear call to action',
      'Story-safe 9:16 layout; two columns on 16:9',
      'Soft lilac and magenta default palette',
      'Headline capped so the photo always has room',
      'PNG, JPEG, ZIP or HTML export',
    ],
    useCases: [
      { icon: '📝', title: 'New blog posts', desc: 'Announce each new article with its headline and featured image, then add Instagram\'s link sticker on top of the button area.' },
      { icon: '▶', title: 'YouTube video drops', desc: 'Change the label to "New video", upload the thumbnail and point viewers to your channel link in bio when a video goes live.' },
      { icon: '🎙', title: 'Podcast and newsletter episodes', desc: 'Promote each episode or issue with the cover art in the photo card and the episode title as the headline.' },
      { icon: '🆕', title: 'Product and collection drops', desc: 'Show a new collection with a lifestyle photo and a "Shop the drop" button, posting the Story size at launch time.' },
    ],
    faqs: [
      { q: 'How do I promote a new blog post on Instagram Stories?', a: 'Open the template (it opens at 1080×1920), write the headline, upload the featured image, download the image, add it to your Story and place a link sticker over the button area.' },
      { q: 'Can I add a clickable link to the image?', a: 'Not in the image itself. Add Instagram\'s link sticker when you post the Story. In the feed, use "link in bio" and keep the link in your profile.' },
      { q: 'What image should I use?', a: 'Use your article\'s featured image, video thumbnail or episode art. It\'s cropped to fill the card and centred.' },
      { q: 'Does it work for YouTube videos?', a: 'Yes. Change the label to "New video", upload the thumbnail, and update the call to action.' },
    ],
    aiPrompt: {
      paragraph: 'Use an AI assistant to turn article titles into Story headlines, write calls to action for each content type, or batch-create Story promos for your latest posts.',
      prompt: `Design a 1080×1920 Instagram Story promoting a new blog post, in HTML and CSS.

- Soft lilac background. Keep content out of the top 250 px and bottom 340 px.
- An uppercase label with an accent underline, then a serif headline (Playfair Display 700) limited to 40% of the height.
- A rounded cover photo card with a soft shadow filling the remaining space (background-size: cover).
- Footer: a magenta pill button "Read it, link in bio ↑" and a handle.
- At 1600×900, switch to two columns: text left, photo right. Use --u (1% of the shorter side).`,
    },
  },
};
