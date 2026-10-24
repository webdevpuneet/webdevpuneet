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

Every tip works as a 4:5 portrait post, a square, a Story and a 16:9 landscape post for X. Long tips shrink to fit. Download a PNG or JPEG, every size as a ZIP, or fork the HTML into [My Code](/ui-snippets/mycode/) to reuse it elsewhere.

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
      'Six sizes, including LinkedIn and Pinterest; PNG, JPG, ZIP or HTML export',
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
      'Centred layout that adapts to every post size',
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

The apply button is a solid accent block with your careers URL ("Apply → webdevpuneet.com/careers"). Because Instagram captions don't allow clickable links, put the URL right in the image and in your bio.

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

Post the 4:5 portrait version in the Instagram feed, the 9:16 version in Stories, and the 16:9 version on X. "All sizes (ZIP)" downloads every size at once, including LinkedIn and Pinterest, ready to schedule.

Need a softer, everyday sale design? Try [Discount Badge](/social-post-templates/discount-badge/). Building anticipation? Use [Countdown](/social-post-templates/countdown/) for "3 days left" posts.`,
    },
    features: [
      'Huge condensed BLACK / FRIDAY headline in Bebas Neue',
      'Outline first word (CSS text-stroke) and accent-filled second word',
      'Deal line, sale dates and promo code block',
      'Defaults set to the 2026 dates: Nov 27 – Nov 30',
      'Black and neon-yellow palette, editable for any holiday',
      'Accent bar along the bottom edge',
      'Six sizes, including Story, X, LinkedIn and Pinterest',
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
      'Centred layout across every size',
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
  'halloween-sale': {
    keywords: ['halloween sale post template', 'halloween instagram post', 'spooky sale graphic', 'halloween promo template', 'october sale social media post'],
    about: {
      title: 'Halloween Sale — Free Spooky Halloween Promo Post Template',
      description: `**Halloween Sale** is a free Halloween promo template for Instagram, Facebook, X, LinkedIn and Pinterest. A glowing orange moon rises over a midnight-purple sky with bat silhouettes and a dark hill, and a horror-style headline ("Spooky Sale") sits above your deal, the sale dates and a promo code.

**Ready for October 31, 2026**

Halloween falls on a Saturday in 2026, so the default dates run "Oct 29 – Oct 31" to cover the last few days before the weekend. The code chip ("BOO31") is easy to copy from the image, which matters on Instagram where captions can't hold clickable links.

**Pure CSS artwork, no stock photos**

The moon is a radial gradient with a soft glow, the bats are CSS clip-path silhouettes, and the hill is a rounded shape along the bottom. Everything is drawn in code, so it stays sharp at every size and recolours instantly when you change the sky, horizon or moon colour.

**Fonts with character**

The headline uses Creepster, a dripping horror display face from Google Fonts, over a clean Inter body. Swap it for any of the 1,900+ Google Fonts in the picker, or upload your own brand font.

**Every size for the campaign**

Post the 4:5 version in the feed, the 9:16 version in Stories, the 1.91:1 version on LinkedIn and the 2:3 pin on Pinterest. "All sizes (ZIP)" downloads every format at once.

Running a longer promotion? Pair it with [Countdown](/social-post-templates/countdown/) for "2 days left" reminders, or move straight on to [Black Friday Sale](/social-post-templates/holiday-sale/) in November.`,
    },
    features: [
      'Glowing CSS moon, bat silhouettes and a dark hill: no images needed',
      'Horror-style Creepster headline with *accent* highlights',
      'Deal line, sale dates and a copyable promo code chip',
      'Defaults set for Halloween 2026: Oct 29 – Oct 31',
      'Editable sky, horizon, text and moon colours',
      'Landscape layout moves the text left of the moon',
      'Six sizes: feed, square, Story, X, LinkedIn and Pinterest',
      'PNG, JPG, ZIP or HTML export, plus Fork to My Code',
    ],
    useCases: [
      { icon: '🎃', title: 'Halloween weekend sale', desc: 'Announce a storewide Halloween discount for October 29 to 31, 2026, with the percentage in the deal line and a code shoppers can type at checkout.' },
      { icon: '🍬', title: 'Candy, costume and party shops', desc: 'Promote costumes, decorations or treats in the run-up to October 31, switching the headline to "Costume Sale" or "Trick or Treat" and keeping the spooky artwork.' },
      { icon: '☕', title: 'Seasonal menu or product drop', desc: 'Launch a pumpkin latte, limited-edition flavour or spooky-season product by changing the deal line to the product name and the dates to its availability.' },
      { icon: '🎟', title: 'Halloween events and parties', desc: 'Invite followers to a Halloween party, haunted tour or themed workshop, using the dates line for the time and the code chip for a ticket discount.' },
    ],
    faqs: [
      { q: 'When is Halloween 2026?', a: 'Halloween is on Saturday October 31, 2026. The template\'s default dates, Oct 29 – Oct 31, cover the days leading up to it.' },
      { q: 'What size should a Halloween Instagram post be?', a: 'Use 1080×1350 (4:5) for the feed and 1080×1920 (9:16) for Stories. The template exports both, plus square, X, LinkedIn and Pinterest sizes.' },
      { q: 'Can I change the spooky font?', a: 'Yes. The headline uses the Creepster Google Font by default; pick any Google Font in the Fonts section or upload your own .woff2, .ttf or .otf file.' },
      { q: 'Can I reuse it after Halloween?', a: 'Change the headline and colours and it works for any night-themed promotion, from a midnight flash sale to a Friday the 13th deal.' },
    ],
  },
  'thanksgiving': {
    keywords: ['thanksgiving post template', 'thanksgiving instagram post', 'happy thanksgiving social media post', 'thank you post template', 'gratitude post template'],
    about: {
      title: 'Thanksgiving Thank You — Free Thanksgiving Social Post Template',
      description: `**Thanksgiving Thank You** is a free Thanksgiving post template for brands, creators and small businesses. Autumn leaves drift around a framed card with a "Happy Thanksgiving" kicker, an elegant serif headline ("Grateful for *you*"), a short message to your customers or community and your handle.

**For Thursday, November 26, 2026**

Thanksgiving in the US falls on November 26 in 2026, the day before Black Friday. A simple thank-you post on Thursday builds goodwill before the sales start, and it is one of the posts followers engage with most during the holiday week.

**Warm, calm and on-brand**

The cream background, rust accent and amber leaves feel seasonal without being loud. The leaves are CSS shapes with a gradient and a vein line, so they recolour with the palette. The headline uses Playfair Display, with italic accent words, and the message shrinks to fit if you write more.

**Not just for the US**

Change the kicker to "Happy Canadian Thanksgiving" for October, "Thank you" for an anniversary, or "Happy Friendsgiving" for a team post. The design works for any gratitude message.

**Every size**

Download the 4:5 feed version, a 9:16 Story and the LinkedIn and Pinterest sizes in one ZIP, so the same message reaches every channel.

Moving straight into the sales weekend? Follow up with [Black Friday Sale](/social-post-templates/holiday-sale/) the next morning.`,
    },
    features: [
      'Framed thank-you card with an autumn-leaf border',
      'CSS leaves with gradient and vein, recoloured by the palette',
      'Playfair Display headline with italic accent words',
      'Message that shrinks to fit longer notes',
      'Your handle under a leaf-coloured rule',
      'Cream, rust and amber palette, fully editable',
      'Six sizes: feed, square, Story, X, LinkedIn and Pinterest',
      'PNG, JPG, ZIP or HTML export, plus Fork to My Code',
    ],
    useCases: [
      { icon: '🦃', title: 'Thanksgiving Day thank-you', desc: 'Post a warm thank-you to customers on Thursday November 26, 2026, before the Black Friday sales start, to build goodwill with your audience.' },
      { icon: '🤝', title: 'Customer appreciation', desc: 'Thank customers, clients or members for their support this year, with a short message about what the community made possible.' },
      { icon: '🍁', title: 'Canadian Thanksgiving', desc: 'Change the kicker to "Happy Canadian Thanksgiving" and post it on the second Monday of October for Canadian followers.' },
      { icon: '🍽', title: 'Restaurants and cafés', desc: 'Share holiday opening hours or a Thanksgiving menu note in the message, keeping the warm autumn design your regulars recognise.' },
    ],
    faqs: [
      { q: 'When is Thanksgiving 2026?', a: 'US Thanksgiving is on Thursday November 26, 2026. Canadian Thanksgiving is on Monday October 12, 2026.' },
      { q: 'What should a Thanksgiving business post say?', a: 'Keep it short and sincere: thank your customers or community, mention what you are grateful for this year, and avoid hard selling on the day itself.' },
      { q: 'Can I add my logo?', a: 'Your handle sits at the bottom. To use your brand fonts and colours everywhere, set them once in the Brand kit and click "Apply to this design".' },
      { q: 'Does it work for Friendsgiving or team posts?', a: 'Yes. Change the kicker and headline to "Happy Friendsgiving" or "Thank you, team" and update the message.' },
    ],
  },
  'christmas-greeting': {
    keywords: ['christmas post template', 'merry christmas instagram post', 'holiday greeting social media template', 'christmas social media post', 'seasons greetings post'],
    about: {
      title: 'Christmas Greeting — Free Merry Christmas Social Post Template',
      description: `**Christmas Greeting** is a free Christmas and holiday post template for Instagram, Facebook, X, LinkedIn and Pinterest. Snow falls over a deep evergreen background, gold and red ornaments hang from the top edge, and a flowing script "Merry Christmas" headline sits above a short holiday message, an optional offer pill and your handle.

**A greeting and a notice in one**

The optional offer line turns a greeting into something useful: "Free shipping until Dec 20", "Open Christmas Eve until 2 PM" or "Gift cards available online". Leave it empty and it disappears, leaving a clean greeting card.

**Festive, drawn in CSS**

The snow is layered radial-gradient dots, and each ornament is a string, a gold cap and a shiny bauble made from gradients and shadows. There are no images to load, so the post exports instantly at full resolution and recolours with the palette.

**Script headline**

The title uses Great Vibes, a classic script from Google Fonts, with the accent word on its own line. Pick a different Google Font, or upload your own, from the Fonts section.

**December dates for 2026**

Christmas Day 2026 is a Friday. Most carriers' last ground-shipping dates fall around December 15 to 18, so a "shipping cut-off" version of this post in mid-December is worth scheduling alongside the greeting on the 24th or 25th.

Ending the year? Follow it with [Happy New Year](/social-post-templates/new-year/) on December 31.`,
    },
    features: [
      'Script "Merry Christmas" headline (Great Vibes)',
      'Falling CSS snow and hanging gold and red ornaments',
      'Holiday message that shrinks to fit',
      'Optional offer pill that hides when empty',
      'Evergreen, gold and red palette, fully editable',
      'Six sizes: feed, square, Story, X, LinkedIn and Pinterest',
      'PNG, JPG, ZIP or HTML export',
      'Fork to My Code to keep editing the HTML',
    ],
    useCases: [
      { icon: '🎄', title: 'Christmas Day greeting', desc: 'Wish your followers a Merry Christmas on December 24 or 25, 2026 with a short thank-you message and your handle, no sales pitch needed.' },
      { icon: '📦', title: 'Shipping cut-off reminder', desc: 'Use the offer line for "Order by Dec 18 for Christmas delivery" and post it in mid-December so gift buyers order in time.' },
      { icon: '🕯', title: 'Holiday opening hours', desc: 'Share Christmas Eve, Christmas Day and Boxing Day hours in the message for shops, restaurants, clinics and studios.' },
      { icon: '🎁', title: 'Gift cards and holiday offers', desc: 'Promote gift cards, free gift wrapping or a festive discount in the offer pill while keeping the warm greeting-card look.' },
    ],
    faqs: [
      { q: 'When should I post a Christmas greeting?', a: 'Christmas Eve (December 24) and Christmas morning (December 25) are the most common. For shipping cut-offs, post one to two weeks earlier.' },
      { q: 'Can I make it say Happy Holidays instead?', a: 'Yes. Edit the kicker and headline to "Happy Holidays", "Season\'s Greetings" or "Happy Hanukkah", and adjust the palette.' },
      { q: 'Can I hide the offer line?', a: 'Yes. Clear the Offer field and the pill disappears, leaving a simple greeting.' },
      { q: 'What size is best for a Christmas Story?', a: 'Use the 1080×1920 Story size. The layout keeps the headline and message clear of the Story header and reply bar.' },
    ],
  },
  'new-year': {
    keywords: ['happy new year post template', 'new year 2027 instagram post', 'new year social media template', 'new year greeting post', 'happy new year 2027 graphic'],
    about: {
      title: 'Happy New Year — Free New Year 2027 Social Post Template',
      description: `**Happy New Year** is a free New Year 2027 post template for brands, creators and teams. A giant year in a gold gradient glows on a midnight background with CSS fireworks and confetti, a "Happy New Year" kicker above it and a short message and handle below.

**2027, ready to post**

The year is its own field, so the same template works every year: type "2028" next December and the post is done. The message has room for a thank-you for 2026 and a line about what is coming next, with accent highlights for the words that matter.

**Fireworks made in code**

Each firework is a repeating conic gradient masked into a ring, and the confetti are small rotated shapes. The gold year uses a gradient clipped to the text with a soft glow. It all scales with the post and recolours with the gold and fireworks colours.

**Great for year-in-review posts**

Change the message to your biggest number of the year, or follow it with [Milestone](/social-post-templates/milestone/) posts for each highlight. For January launches, pair it with [Product Launch](/social-post-templates/product-launch/).

**Every size**

Download the 4:5 feed post, a 9:16 Story for midnight, and LinkedIn and Pinterest sizes in one ZIP.

Celebrating the season first? See [Christmas Greeting](/social-post-templates/christmas-greeting/).`,
    },
    features: [
      'Giant year in a gold gradient with a soft glow',
      'CSS fireworks (conic gradients) and confetti',
      'Separate Year field, so it works every year',
      'Message with *accent* highlights that shrinks to fit',
      'Midnight, gold and violet palette, fully editable',
      'Six sizes: feed, square, Story, X, LinkedIn and Pinterest',
      'PNG, JPG, ZIP or HTML export',
      'Fork to My Code to keep editing the HTML',
    ],
    useCases: [
      { icon: '🎆', title: 'Midnight New Year greeting', desc: 'Schedule a Happy New Year 2027 post for midnight on December 31, 2026, with a thank-you for the year and your handle.' },
      { icon: '📈', title: 'Year-in-review opener', desc: 'Open a year-in-review carousel or thread with the year and a one-line summary, then follow with Milestone posts for each highlight.' },
      { icon: '🎯', title: 'Resolutions and January content', desc: 'Kick off January challenges, courses or resolution-themed content by changing the message to the challenge name and start date.' },
      { icon: '🏷', title: 'New Year sale', desc: 'Turn the message into a New Year offer, such as 20% off annual plans, and keep the celebratory fireworks to catch attention.' },
    ],
    faqs: [
      { q: 'Can I change the year?', a: 'Yes. The year is its own field, so type 2027, 2028 or any year. It stays on one line and shrinks to fit if needed.' },
      { q: 'What should a New Year post from a business say?', a: 'Thank your customers or community for the past year and share one line about what is coming next. Keep it short so the big year stays the focus.' },
      { q: 'Does the Happy New Year template work as a Story?', a: 'Yes. Pick the 1080×1920 Story size; everything is centred and clear of the Story header and reply bar.' },
      { q: 'Can I use it for Lunar New Year?', a: 'Change the kicker and year text (for example "Happy Lunar New Year" and "Year of the Horse") and switch to a red and gold palette.' },
    ],
  },

  'giveaway': {
    keywords: ['instagram giveaway post template', 'giveaway post template', 'contest post template', 'social media giveaway template', 'giveaway announcement post'],
    about: {
      title: 'Giveaway Contest — Free Instagram Giveaway Post Template',
      description: `**Giveaway Contest** is a free Instagram giveaway post template that turns a contest into a post people understand in two seconds: a tilted "Giveaway" badge, the prize as a huge headline, an optional photo of the prize, three numbered "how to enter" steps, the deadline and a short rules line. It works for Instagram, Facebook, LinkedIn, X and Pinterest from one design.

**Why giveaways need a clear layout**

Giveaways are one of the fastest ways to grow followers and reach, but only if people instantly see what they can win and what to do. That is why the prize is the biggest thing on the post and the entry steps sit in their own numbered panel. Wrap words in *asterisks* to colour them, for example the prize value, so the most exciting part pops.

**Rules that keep you compliant**

Instagram's promotion guidelines ask you to include official rules and to say that the promotion isn't sponsored, endorsed or administered by Instagram. The template has a dedicated rules line for that, plus a deadline line for the end date and when the winner is announced. Keep the full terms in your caption or on a landing page and use the line for the short version.

**Made for every placement**

The design is drawn with CSS: the confetti, the badge and the glowing background need no images. Add a photo of the prize and it appears in a tilted frame next to the headline. Switch to the Story size and the layout stacks with the photo larger, or to 16:9 for X and LinkedIn, where the steps move into a second column. Download PNG or JPEG, export a short animated video for Reels, or copy the HTML.

Celebrating a follower milestone? Pair it with the [Milestone](/social-post-templates/milestone/) post, and promote the launch with [Coming Soon Teaser](/social-post-templates/coming-soon/).`,
    },
    features: [
      'Tilted "Giveaway" badge and the prize as a huge headline',
      'Optional prize photo in a tilted frame; hidden when empty',
      'Three numbered "how to enter" steps in their own panel',
      'Deadline line for the end date and winner announcement',
      'Rules line for eligibility and the "not affiliated with Instagram" note',
      'Confetti and glow background drawn in CSS, no images needed',
      'Story, square, 16:9 and Pinterest layouts adapt automatically',
      'Export PNG, JPEG, animated video or HTML',
    ],
    useCases: [
      { icon: '🎁', title: 'Follower milestone giveaway', desc: 'Celebrate 10K followers with a prize for your community, three simple entry steps and a clear end date, then announce the winner with the Milestone template.' },
      { icon: '🤝', title: 'Brand collaboration contest', desc: 'Run a joint giveaway with a partner brand: ask entrants to follow both accounts in the steps and tag the partner in the caption so both audiences grow.' },
      { icon: '🚀', title: 'Product launch giveaway', desc: 'Give away the first units of a new product, with its photo in the frame, to build buzz in the week before launch and collect early reviews.' },
      { icon: '☕', title: 'Local business promotion', desc: 'Cafés, salons and gyms can offer a free month or gift card and ask locals to tag friends, a cheap way to reach new people nearby.' },
    ],
    faqs: [
      { q: 'How do I make an Instagram giveaway post?', a: 'Open the Giveaway Contest template, type the prize and the three entry steps, set the deadline and rules line, and optionally upload a photo of the prize. Keep the 1080×1350 portrait size for the feed or switch to Story, then download the PNG. Everything runs in your browser.' },
      { q: 'What should an Instagram giveaway post include?', a: 'The prize, how to enter, the end date, when the winner is announced, who can enter, and a statement that the giveaway is not sponsored, endorsed or administered by Instagram. The template has a place for each, and the full rules can go in your caption.' },
      { q: 'What are good giveaway entry steps?', a: 'Keep it to three simple actions, such as follow the account, like or save the post, and tag one or two friends. Instagram\'s guidelines don\'t allow asking people to tag themselves in content they don\'t appear in, so ask them to tag friends in the comments instead.' },
      { q: 'Can I make a giveaway Reel or Story?', a: 'Yes. Switch the size to Story / Reel (1080×1920) and the layout stacks with a larger prize photo. Use Animated video in the Export menu to get a short MP4 for Reels.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Giveaway Contest HTML and CSS: write the caption and full rules for your prize, turn it into a React component with prize and steps props, or create a winner-announcement version.',
      prompt: `Create a 1080×1350 Instagram giveaway post in plain HTML and CSS.

- Deep purple background with soft pink and yellow glows and small confetti dots drawn with CSS radial-gradients.
- A tilted yellow "GIVEAWAY" pill badge, then the prize as a huge bold headline (e.g. "Win a $250 gift card") with the amount in yellow.
- An optional prize photo in a tilted rounded frame beside the headline.
- A translucent panel titled "How to enter" with three numbered steps in yellow circles.
- A footer with the deadline, a small rules line ("Not sponsored by or affiliated with Instagram") and the handle on the right.
- Size everything with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },

  'meet-the-team': {
    keywords: ['meet the team post template', 'meet the team instagram post', 'team introduction post', 'employee spotlight post template', 'linkedin team post template'],
    about: {
      title: 'Meet the Team — Free Team Introduction Post Template for Instagram & LinkedIn',
      description: `**Meet the Team** is a free social media post template for introducing the people behind your brand. It has a "Behind the scenes" label, a big "Meet the team" headline, a short intro, and three member cards with round photos, names and roles, finished with your handle.

**Why team posts work**

People follow people. Posts that show the faces behind a business consistently feel more trustworthy than product posts, and behind-the-scenes and employee content is one of the content types brands lean on most on LinkedIn and Instagram. A tidy, consistent team post makes it easy to run a regular series, introducing one department or one new hire at a time.

**Photos that look consistent**

Each photo sits in a circle with a white gap and an accent ring, so headshots taken on different phones still look like a set. Upload photos straight from your computer; they're cropped to the circle, you can drag to reposition faces, and they never leave your browser. Until you add photos, the circles show a soft accent gradient, so the layout still looks finished.

**One design, every size**

On the 4:5 feed size the three cards sit side by side. On the 9:16 Story size they stack into a list with the photo on the left, and on 16:9 for X and LinkedIn the headline moves into a left column. Names and roles wrap neatly, and *asterisks* colour any word in the headline. Download PNG or JPEG, a PDF, a short animated video or the HTML.

Hiring as well? Follow up with the [We're Hiring](/social-post-templates/hiring/) post, or share a customer's view with [Customer Testimonial](/social-post-templates/testimonial/).`,
    },
    features: [
      '"Meet the team" headline with a behind-the-scenes label and intro',
      'Three member cards with round photos, names and roles',
      'Accent ring around every photo so mixed headshots match',
      'Drag-to-reposition photo crops, processed only in your browser',
      'Gradient placeholders so the post looks finished before photos',
      'Cards stack into a list on the Story size',
      'Two-column layout on 16:9 for X and LinkedIn',
      'Export PNG, JPEG, PDF, animated video or HTML',
    ],
    useCases: [
      { icon: '👋', title: 'Introduce your founders', desc: 'Show the people who started the company with their roles and a short line about why they built it, a strong first post for a new account or rebrand.' },
      { icon: '🆕', title: 'New hire welcome', desc: 'Welcome new teammates publicly: put the new hire in the middle card, change the headline to "Welcome to the team" and tag them on LinkedIn.' },
      { icon: '🏢', title: 'Department spotlight series', desc: 'Introduce one team each week, such as support, design or engineering, keeping colours fixed so the series looks consistent on your grid.' },
      { icon: '🎨', title: 'Agency and studio about-us post', desc: 'Freelance collectives and agencies can show who clients will work with, which builds trust before a sales call or proposal.' },
    ],
    faqs: [
      { q: 'How do I make a "meet the team" post for Instagram?', a: 'Open the Meet the Team template, change the headline and intro, then upload a photo and type the name and role for each of the three people. Keep the 1080×1350 portrait size for the feed or switch to Story, and download the PNG.' },
      { q: 'Can I show more than three people?', a: 'The template shows three, which stays readable on a phone. For bigger teams, make a series of posts or a carousel, or fork the template to My Code and add more cards to the grid.' },
      { q: 'Does it work for LinkedIn?', a: 'Yes. Use the 1080×1350 portrait size for LinkedIn feed posts or the 1200×627 LinkedIn image size, where the headline moves to a left column and the three cards sit on the right.' },
      { q: 'Are my team photos uploaded anywhere?', a: 'No. Photos are processed in your browser and saved on your device only. They are never uploaded to our servers.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Meet the Team HTML and CSS: write short bios for each person, turn it into a React component that maps over a team array, or add a fourth card and a "We\'re hiring" footer.',
      prompt: `Create a 1080×1350 "Meet the team" social media post in plain HTML and CSS.

- Warm off-white background with a soft orange glow in the top-right corner.
- A small uppercase "Behind the scenes" label, a large bold "Meet the team" headline with "team" in orange, and a one-line intro.
- Three equal white cards in a row, each with a round photo (white gap plus an orange ring), the name in bold and the role underneath.
- The handle aligned bottom-right.
- Size everything with a CSS variable --u equal to 1% of the shorter side, and stack the cards into a list on a 1080×1920 Story.`,
    },
  },

  'myth-vs-fact': {
    keywords: ['myth vs fact post template', 'myth vs fact instagram post', 'myth busting post template', 'educational social media post template', 'fact vs fiction post'],
    about: {
      title: 'Myth vs Fact — Free Myth-Busting Post Template for Instagram & LinkedIn',
      description: `**Myth vs Fact** is a free educational post template that corrects a common misconception. A topic pill and a "Myth vs Fact" headline sit above two panels: the myth in red, crossed out, with an ✕ badge, and the fact in green with a ✓ badge. A source line and your handle finish the post.

**Why myth-busting posts perform**

Myth vs fact posts are a staple of educational accounts in health, finance, fitness, marketing and tech, and they're sold as dedicated template packs for a reason: they combine a hook people recognise ("I believed that") with something useful they want to save or send to a friend. The format also positions you as the expert who knows the real answer.

**Built for clarity**

The two panels use colour, icons and a strikethrough, so the post still reads correctly for people who are colour-blind. The fact panel gets more room because it carries the real message, and long facts shrink automatically to fit. Wrap words in *asterisks* to highlight the key part of the fact. The myth and fact colours are separate settings, so you can match your brand while keeping the contrast.

**Credible by default**

A dedicated source line under the panels makes it easy to cite the study, report or guideline behind your fact, which matters more than ever now that AI assistants and readers both look for sources. On 16:9 the panels sit side by side for X and LinkedIn, and on the Story size the fact panel grows taller.

For single facts, see [Did You Know?](/social-post-templates/did-you-know/); for numbers, try [Big Stat](/social-post-templates/big-stat/); and turn a series of myths into a [carousel](/social-post-templates/carousel-cover/).`,
    },
    features: [
      'Myth panel in red with an ✕ badge and strikethrough text',
      'Fact panel in green with a ✓ badge and more room',
      'Separate myth and fact colours, plus background and text',
      'Topic pill and editable "Myth" and "Fact" labels',
      'Source line for citing the study or report',
      'Long facts shrink automatically to fit',
      'Side-by-side panels on 16:9 for X and LinkedIn',
      'Export PNG, JPEG, PDF, animated video or HTML',
    ],
    useCases: [
      { icon: '🩺', title: 'Health and fitness myths', desc: 'Correct common beliefs about diet, sleep or training with a clear fact and a cited source, a format followers save and share with friends.' },
      { icon: '💰', title: 'Personal finance education', desc: 'Bust money myths such as "renting is throwing money away" with a short, balanced fact, ideal for financial advisers and fintech brands.' },
      { icon: '💻', title: 'Tech and marketing myths', desc: 'Answer misconceptions your customers have about your industry, from SEO to email marketing, and build authority on LinkedIn.' },
      { icon: '🛍', title: 'Product misconceptions', desc: 'Clear up a myth about your own product, such as "it\'s only for big teams", with the fact and a link in your caption.' },
    ],
    faqs: [
      { q: 'How do I make a myth vs fact post?', a: 'Open the Myth vs Fact template, set the topic, type the myth and the fact that corrects it, and add a source. Choose a size such as 1080×1350 for Instagram and LinkedIn and download the PNG.' },
      { q: 'Can I make a myth vs fact carousel?', a: 'Yes. Make one post per myth with the same colours, download each as a PNG, and upload them together as an Instagram carousel or a LinkedIn PDF. Use the Carousel templates for a cover slide.' },
      { q: 'Should I cite a source?', a: 'Yes, whenever the fact is a claim or statistic. A source makes the post more credible and more likely to be shared, and the template has a dedicated source line under the panels.' },
      { q: 'Can I change the red and green colours?', a: 'Yes. Myth colour and Fact colour are separate settings. The ✕, ✓ icons and the strikethrough keep the meaning clear for colour-blind readers whatever colours you choose.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Myth vs Fact HTML and CSS: research and write ten myths with sourced facts for your niche, turn it into a React component, or build a carousel version with a cover slide.',
      prompt: `Create a 1080×1350 "Myth vs Fact" educational social post in plain HTML and CSS.

- Light background, a small topic pill and a bold "Myth vs Fact" headline.
- Two stacked panels: the myth in a pale red panel with a red left border, an ✕ badge and strikethrough text; the fact in a pale green panel with a green border, a ✓ badge and more height.
- A footer with a source line on the left and the handle on the right.
- Size everything with a CSS variable --u equal to 1% of the shorter side, and place the panels side by side on a 1600×900 landscape size.`,
    },
  },

  'big-stat': {
    keywords: ['statistic post template', 'stat post instagram', 'data social media post template', 'infographic post template', 'linkedin statistic post'],
    about: {
      title: 'Big Stat — Free Statistic Post Template for LinkedIn & Instagram',
      description: `**Big Stat** is a free statistic post template built around one striking number. A giant glowing figure in the accent colour sits above a sentence that explains it, a slim bar chart visualises the share, a context line says why it matters, and a source line and handle finish the post on a dark, subtly gridded background.

**One number beats a busy infographic**

On a phone, a single big number stops the scroll far better than a crowded chart. Data posts are a favourite format for LinkedIn thought leadership, report launches and B2B marketing, because a surprising statistic is easy to quote, comment on and share, and a cited number is exactly the kind of fact AI assistants and journalists pick up.

**A chart that follows your data**

The bar under the number is driven by its own field: type a value from 0 to 100 and the fill matches, or leave it empty to hide the bar for numbers that aren't percentages, such as "$4.2M" or "3×". Wrap words in *asterisks* to colour the key part of the explanation, like "abandoned".

**Credible and reusable**

A dedicated source line keeps the post honest and trustworthy. The default example uses Baymard Institute's well-known finding that around 70% of online carts are abandoned. Keep the colours and fonts fixed and only change the number and sentence, and you have a recognisable "by the numbers" series across Instagram, LinkedIn and X.

For a fact without a big number, use [Did You Know?](/social-post-templates/did-you-know/); to correct a misconception, use [Myth vs Fact](/social-post-templates/myth-vs-fact/).`,
    },
    features: [
      'Giant glowing statistic in the accent colour',
      'Explanation sentence with *asterisk* highlights',
      'Bar chart driven by a 0–100 field, hidden when empty',
      'Context line explaining why the number matters',
      'Source line for the study, report or survey',
      'Dark gridded background with a soft accent glow',
      'Scales to Story, square, 16:9 and LinkedIn sizes',
      'Export PNG, JPEG, PDF, animated video or HTML',
    ],
    useCases: [
      { icon: '📊', title: 'Research and survey highlights', desc: 'Turn the headline finding of your report or customer survey into a post, with the number up front and a link to the full report in your caption.' },
      { icon: '💼', title: 'LinkedIn thought leadership', desc: 'Open a LinkedIn post with an industry statistic and your take on it, a format that reliably starts discussion in the comments.' },
      { icon: '🏆', title: 'Customer results and case studies', desc: 'Show a result such as "38% faster checkout" from a case study, with the customer named in the context line and the bar showing the improvement.' },
      { icon: '🗓', title: '"By the numbers" series', desc: 'Share one number a week about your industry or company, keeping the design fixed so followers recognise the series instantly.' },
    ],
    faqs: [
      { q: 'How do I make a statistic post for LinkedIn?', a: 'Open the Big Stat template, type the number, what it means and the source, and set the bar fill if it is a percentage. Use the 1080×1350 portrait size for the LinkedIn feed or 1200×627 for a link-style image, and download the PNG.' },
      { q: 'What if my number is not a percentage?', a: 'Clear the Bar fill field and the bar disappears. The big number accepts any text, such as "$4.2M", "3×" or "12,000".' },
      { q: 'Should I always add a source?', a: 'Yes. A source makes a statistic credible and shareable, and readers are rightly sceptical of uncited numbers. Name the organisation and the study or year.' },
      { q: 'Can I animate the statistic?', a: 'Yes. Use Animated video in the Export menu to get a short MP4 where the number and text animate in, which works well for Reels and LinkedIn video posts.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Big Stat HTML and CSS: find well-sourced statistics for your industry, add a count-up animation, or turn it into a component that takes a number, label and source.',
      prompt: `Create a 1080×1350 statistic social post in plain HTML and CSS.

- Dark navy background with faint horizontal grid lines and a cyan glow in the top-left.
- A small uppercase "By the numbers" label, then a giant glowing cyan number (e.g. "70%").
- A bold sentence explaining the number with one highlighted word, a slim rounded progress bar filled to the percentage, and a lighter context line.
- A footer with a source on the left and the handle on the right, above a thin divider.
- Size everything with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },

  'coming-soon': {
    keywords: ['coming soon post template', 'coming soon instagram post', 'launch teaser post template', 'product launch teaser', 'stay tuned post template'],
    about: {
      title: 'Coming Soon Teaser — Free Coming Soon Post Template for Instagram',
      description: `**Coming Soon Teaser** is a free pre-launch post template that builds anticipation before you reveal something new. A huge outlined "Coming soon" headline sits over a blurred mystery image, with a short teaser line, the launch date in a bright pill and a "turn on post notifications" call to action.

**Tease, don't tell**

The best teaser posts give away just enough to make people curious. That's why the image is blurred on purpose: upload a photo of the product, the new store or the app screen, and it shows as a soft, mysterious glow rather than a full reveal. Without a photo, the background shows abstract accent-coloured light, so the post works even before you have final images.

**Typography that stops the scroll**

The headline uses outlined, condensed capitals that read clearly against the dark background, while the teaser line underneath can highlight a word with *asterisks*. The launch date sits in a solid accent-coloured pill, the single most important detail, and the call to action tells followers exactly how not to miss the launch.

**Part of a launch campaign**

Post it a week or two before launch, follow with the [Countdown](/social-post-templates/countdown/) post as the date gets closer, announce the day with [We're Live](/social-post-templates/we-are-live/), and show the product with [Product Launch](/social-post-templates/product-launch/). Every size, from Story to Pinterest, comes from one design, and you can export a short animated video for Reels.`,
    },
    features: [
      'Huge outlined "Coming soon" headline in condensed capitals',
      'Mystery image shown blurred, or abstract light without one',
      'Teaser line with *asterisk* highlights',
      'Launch date in a solid accent-coloured pill',
      'Call-to-action line, such as turning on notifications',
      'Dark vignette that keeps text readable over any photo',
      'Works in Story, square, 16:9, LinkedIn and Pinterest sizes',
      'Export PNG, JPEG, animated video or HTML',
    ],
    useCases: [
      { icon: '📦', title: 'Product or collection teaser', desc: 'Show a blurred photo of a new product or collection two weeks before launch, with the release date and a prompt to turn on notifications.' },
      { icon: '🏪', title: 'New store or location opening', desc: 'Tease a new shop, café or office with a blurred photo of the space and the opening date, then reveal it on opening day.' },
      { icon: '📱', title: 'App or feature pre-launch', desc: 'Build a waitlist by teasing an app screenshot, with the call to action pointing to a sign-up link in your bio.' },
      { icon: '🎤', title: 'Event or announcement reveal', desc: 'Hint at a speaker lineup, collaboration or big announcement with the date set, then follow with the full reveal post.' },
    ],
    faqs: [
      { q: 'How do I make a "coming soon" post for Instagram?', a: 'Open the Coming Soon Teaser template, write a short teaser, set the launch date and call to action, and optionally upload a photo, which is shown blurred. Download the 1080×1350 portrait post or the 1080×1920 Story.' },
      { q: 'When should I post a coming soon teaser?', a: 'One to two weeks before launch works well, followed by a countdown post in the final days and a launch-day post. Teasing too far ahead can lose people\'s attention.' },
      { q: 'Why is my image blurred?', a: 'On purpose: teasers work by hiding the full reveal. The image shows as a soft glow behind the text. For a clear product shot, use the Product Launch or Product Spotlight template on launch day.' },
      { q: 'Can I make it a Reel?', a: 'Yes. Switch to the Story / Reel size and use Animated video in the Export menu to get a short MP4 where the headline and date animate in.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Coming Soon Teaser HTML and CSS: write a week of teaser captions, add a live countdown for your website, or make a matching reveal post.',
      prompt: `Create a 1080×1350 "Coming soon" teaser social post in plain HTML and CSS.

- Near-black background with a heavily blurred image (or abstract lime and violet light) behind a dark radial vignette.
- A small lime uppercase label, then a huge outlined "COMING SOON" headline (transparent fill, white text stroke) in a condensed font.
- A bold teaser line with one highlighted phrase, then the launch date in a solid lime pill, a "Turn on post notifications" line and the handle.
- Centre everything, and size it with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },

  'numbered-list': {
    keywords: ['list post template', 'listicle post template instagram', 'tips post template', '5 tips instagram post', 'numbered list social media post'],
    about: {
      title: 'Numbered List Post — Free "5 Tips" Listicle Template for Instagram & LinkedIn',
      description: `**Numbered List Post** is a free listicle template for the posts people save most: "5 ways to…", "3 mistakes to avoid", "7 tools I use". A small topic label and a bold headline sit above up to five numbered points with large accent numerals, a "save this" prompt and your handle.

**Why list posts work**

Lists promise a specific, skimmable payoff before anyone reads a word, which is why "X tips" posts are among the most saved and shared formats on Instagram and LinkedIn. Numbered points also make it easy for people to reference them in comments ("number 3 changed everything"), and a clear save prompt nudges the save, which platforms treat as a strong signal.

**Flexible length, consistent design**

Write three, four or five points: any empty point hides itself and the rest spread to fill the space, so a "3 mistakes" post looks just as finished as a "5 tips" post. Long points shrink step by step until they fit. Wrap a word in the headline in *asterisks* to colour it, such as "opened" in "5 ways to get your emails opened".

**Every size from one design**

On the 4:5 feed size the list sits under the headline. On 16:9 for X and LinkedIn the headline moves into a left column and the list fills the right. The Story size gives each point more room. For longer lists, turn each point into its own slide with the [Carousel Step Slide](/social-post-templates/carousel-step/), or pair the post with [Tip of the Day](/social-post-templates/tip-of-the-day/) for a daily series.`,
    },
    features: [
      'Bold headline with *asterisk* highlights and a topic label',
      'Up to five numbered points with large accent numerals',
      'Empty points hide automatically for 3- or 4-item lists',
      'Long points shrink to fit instead of overflowing',
      '"Save this" prompt and handle in the footer',
      'Two-column layout on 16:9 for X and LinkedIn',
      'Works in Story, square, portrait and Pinterest sizes',
      'Export PNG, JPEG, PDF, animated video or HTML',
    ],
    useCases: [
      { icon: '💡', title: '"5 tips" educational posts', desc: 'Share five practical tips from your field, such as writing, fitness or finance, as a single save-worthy post with a clear topic label and your handle.' },
      { icon: '⚠️', title: '"3 mistakes to avoid" posts', desc: 'Delete the last two points and list three common mistakes, a format that hooks people who worry they are making them.' },
      { icon: '🧰', title: 'Tool and resource round-ups', desc: 'List your favourite tools, books or apps for a task, then link them in the caption or a link-in-bio page.' },
      { icon: '✅', title: 'Checklists and quick how-tos', desc: 'Turn a process into five clear steps, like a launch checklist or a morning routine, that followers screenshot and come back to.' },
    ],
    faqs: [
      { q: 'How do I make a list post for Instagram?', a: 'Open the Numbered List Post template, write a headline such as "5 ways to…", fill in up to five points and add your handle. Keep the 1080×1350 portrait size for the feed and download the PNG.' },
      { q: 'Can I make a list with only three points?', a: 'Yes. Leave points four and five empty and they disappear; the remaining points spread out to fill the space.' },
      { q: 'How many points should a list post have?', a: 'Three to five is the sweet spot for a single image: enough to feel valuable, short enough to read on a phone. For longer lists, use a carousel with one point per slide.' },
      { q: 'Does it work on LinkedIn?', a: 'Yes. Use the 1080×1350 portrait size in the LinkedIn feed, or the 1200×627 LinkedIn image size, where the headline and list sit side by side.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Numbered List Post HTML and CSS: write ten list-post ideas for your niche, turn it into a component that takes an array of points, or make a carousel version.',
      prompt: `Create a 1080×1350 numbered list ("5 tips") social media post in plain HTML and CSS.

- Warm pale-yellow background with a soft gold glow in the top-right.
- A small gold pill label, then a large bold headline with one highlighted word.
- Five list items, each with a large gold two-digit number (01–05) and a bold point, separated by thin lines; hide items whose text is empty.
- A footer with a "Save this for later" prompt on the left and the handle on the right.
- Size everything with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },

  'qa-post': {
    keywords: ['q&a post template', 'faq post template instagram', 'you asked we answered post', 'ask me anything post template', 'question and answer social media post'],
    about: {
      title: 'Q&A Post — Free "You Asked, We Answered" FAQ Post Template',
      description: `**Q&A Post** is a free social media template that turns a follower's question into content. Styled like a chat, it shows the question in a bubble with who asked it, your answer in a larger accent-coloured bubble with your avatar initial, a "drop your question in the comments" prompt and your handle.

**Your best content is in your DMs**

The questions customers and followers ask you are exactly what other people are searching for. Answering them publicly builds trust, saves you from repeating yourself in DMs, and gives you a steady stream of content ideas. A recognisable "You asked, we answered" series also invites more questions, which feeds the next post.

**Designed like a conversation**

The chat-bubble layout reads instantly as a question and an answer, even before anyone reads the words. The question is set in a bold heading font, the answer in a comfortable reading size, and both shrink automatically if your text is long. Wrap the most important part of the answer in *asterisks* to highlight it. Credit the person who asked ("@sam.designs asked") to make followers feel heard, or change it to "A customer asked" for privacy.

**Ready for every network**

The dark default palette stands out in light feeds, and the question bubble colour is its own setting. It exports as an Instagram portrait or square post, a Story, a 16:9 X post or a LinkedIn image. For myths people believe, use [Myth vs Fact](/social-post-templates/myth-vs-fact/); for a list of answers, try the [Numbered List Post](/social-post-templates/numbered-list/).`,
    },
    features: [
      'Chat-style question bubble with "asked by" credit',
      'Larger accent answer bubble with an avatar initial',
      'Question and answer shrink to fit long text',
      '*Asterisk* highlights for the key part of the answer',
      'Separate question bubble colour plus background, text and accent',
      'Call-to-action line inviting new questions',
      'Works in portrait, square, Story, 16:9 and LinkedIn sizes',
      'Export PNG, JPEG, PDF, animated video or HTML',
    ],
    useCases: [
      { icon: '💬', title: 'Weekly "you asked" series', desc: 'Pick one question from your DMs or comments each week and answer it in a consistent design, building a series followers look forward to.' },
      { icon: '❓', title: 'Product FAQs', desc: 'Answer the questions customers ask before buying, such as shipping times or compatibility, so they see the answer in their feed before they need to ask.' },
      { icon: '🎙', title: 'AMA and live session recaps', desc: 'After an Instagram Live or AMA, turn the best questions into posts so people who missed it still get the value.' },
      { icon: '🧑‍🏫', title: 'Expert and creator advice', desc: 'Coaches, consultants and creators can answer common questions in their field to show their expertise, build trust and attract new clients.' },
    ],
    faqs: [
      { q: 'How do I make a Q&A post for Instagram?', a: 'Open the Q&A Post template, type the question and who asked it, write your answer and set your avatar initial. Keep the 1080×1350 portrait size or switch to Story, then download the PNG.' },
      { q: 'Should I name the person who asked?', a: 'Only with their permission. Crediting them makes followers feel heard and encourages more questions; otherwise change the line to "A customer asked" or "You asked".' },
      { q: 'What if my answer is long?', a: 'The answer shrinks automatically to fit its bubble. For readability, keep it to two or three sentences and put the full answer in your caption.' },
      { q: 'Can I use it as a Story question response?', a: 'Yes. Switch to the Story / Reel size; the bubbles stack with room above and below for Instagram\'s Story buttons.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Q&A Post HTML and CSS: draft concise answers to your top customer questions, turn it into a component with question and answer props, or add a second Q&A pair.',
      prompt: `Create a 1080×1350 "You asked, we answered" social media post in plain HTML and CSS.

- Dark charcoal background with a soft indigo glow in the bottom-left.
- An indigo headline label "You asked, we answered".
- A question in a dark grey chat bubble aligned left (rounded, with a smaller bottom-left corner), with a small "@name asked" line above it.
- An answer in a larger indigo-tinted bubble aligned right, with a round indigo avatar showing an initial.
- A footer with a "Drop your question in the comments" prompt and the handle.
- Size everything with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },

  'us-vs-them': {
    keywords: ['comparison post template', 'us vs them post template', 'competitor comparison social post', 'versus post template instagram', 'old way vs new way post'],
    about: {
      title: 'Us vs Them Comparison — Free Comparison Post Template for Instagram & LinkedIn',
      description: `**Us vs Them Comparison** is a free social media template for showing why customers choose you. A bold headline ("Why teams switch to Acme") sits above two columns: a muted "Other tools" column with four cross-marked drawbacks and a highlighted column for your brand with four tick-marked benefits, separated by a "VS" badge, with a call to action and your handle underneath.

**Why comparison posts convert**

People considering a purchase are already comparing options. A side-by-side post answers "why you and not them?" in a few seconds, which makes it one of the most effective formats for SaaS, agencies, coaches and product brands. It's equally useful as an "old way vs new way" post that compares a frustrating habit with the better approach your product enables.

**Clear at a glance**

The visual hierarchy does the persuading: the competitor column is greyed out, while your column is white, outlined in your accent colour and lifted with a soft glow. Crosses and ticks in coloured circles make each row readable without colour alone. Leave any row empty and it disappears, so you can compare three points instead of four.

**Keep it fair**

Comparisons work best when they're accurate and specific: "one flat price" beats vague claims, and naming a generic "other tools" column keeps it about your benefits rather than attacking a competitor. On the Story size the columns stack vertically; on 16:9 for X and LinkedIn they stay side by side. Pair it with [Customer Testimonial](/social-post-templates/testimonial/) to back the claims with a real review, or [Before & After](/social-post-templates/before-after/) for visual results.`,
    },
    features: [
      'Headline with *asterisk* highlights for your brand name',
      'Muted "others" column with four cross-marked points',
      'Highlighted brand column with four tick-marked points',
      '"VS" badge between the columns',
      'Empty rows hide automatically',
      'Columns stack vertically on the Story size',
      'Call-to-action line and handle in the footer',
      'Export PNG, JPEG, PDF, animated video or HTML',
    ],
    useCases: [
      { icon: '☁️', title: 'SaaS "why switch" posts', desc: 'Compare pricing, setup time, support and features with typical alternatives, and link to a free trial in the call-to-action line.' },
      { icon: '🔄', title: '"Old way vs new way" posts', desc: 'Contrast a painful manual process with the better way your product or method enables, such as spreadsheets versus a dashboard.' },
      { icon: '🧑‍💼', title: 'Agency and freelancer positioning', desc: 'Show what clients get with you versus a typical agency, like direct access to the expert, fixed pricing and faster turnaround.' },
      { icon: '🥗', title: 'Product and ingredient comparisons', desc: 'Food, beauty and wellness brands can compare their ingredients or materials with typical products, keeping each claim short and accurate.' },
    ],
    faqs: [
      { q: 'How do I make a comparison post for Instagram?', a: 'Open the Us vs Them Comparison template, write a headline, fill in up to four points for each column and add a call to action. Keep the 1080×1350 portrait size or switch to Story, then download the PNG.' },
      { q: 'Should I name a competitor?', a: 'It is usually safer to use a generic label such as "Other tools" or "The old way" and focus on your own benefits. If you name a competitor, make sure every claim is accurate and up to date.' },
      { q: 'Can I compare fewer than four points?', a: 'Yes. Leave a row empty in both columns and it disappears, so you can compare two or three points.' },
      { q: 'Does the Us vs Them Comparison template work as a Story?', a: 'Yes. On the 1080×1920 Story size the two columns stack vertically with the VS badge between them.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Us vs Them Comparison HTML and CSS: write honest comparison points for your product, turn it into a component that takes two arrays, or make a carousel that compares one feature per slide.',
      prompt: `Create a 1080×1350 "us vs them" comparison social post in plain HTML and CSS.

- Light grey background and a large bold centred headline with the brand name in blue.
- Two equal columns: a muted grey "Other tools" card with four rows, each with a red cross in a pale red circle, and a white card outlined in blue with a soft blue glow, four rows with white ticks in blue circles.
- A round dark "VS" badge centred between the columns, with enough gap that it never overlaps the text.
- A footer with a call to action and the handle.
- Size everything with a CSS variable --u equal to 1% of the shorter side, and stack the columns on a 1080×1920 Story.`,
    },
  },

  'just-listed': {
    keywords: ['just listed instagram post template', 'real estate social media post template', 'just listed post template', 'realtor instagram post template', 'open house post template'],
    about: {
      title: 'Just Listed — Free Real Estate Instagram Post Template for Realtors',
      description: `**Just Listed (Real Estate)** is a free social media post template for real estate agents, brokerages and property managers. A large property photo with a "Just listed" ribbon fills the top of the post, and a clean information panel below shows the asking price, the address, a beds / baths / square feet row, an optional open-house line and the agent's name, photo and contact details.

**Built for how buyers browse**

Buyers scroll quickly and decide in seconds, so the photo does the selling and the price is the biggest piece of text. The specs sit in tidy pills that are easy to scan on a phone, and the open-house line stands out in the accent colour. An elegant serif price and warm neutral palette suit most brokerages, and every colour can be changed to match your brand.

**One template, every listing moment**

Change the ribbon text to reuse the design for the whole listing journey: "Just listed", "Open house", "Price reduced", "Under contract" and "Just sold". Upload the property photo straight from your computer; it's cropped to fill the frame, you can drag to choose the best part of the shot, and it never leaves your browser. The agent photo is optional and disappears when empty.

**Ready for every platform**

Export the 4:5 portrait post for Instagram and Facebook, a 9:16 Story with a taller photo, a 16:9 version for X and Facebook with the photo on the left and the details on the right, or a 2:3 Pinterest pin for property boards. Pair it with [Countdown](/social-post-templates/countdown/) for an open-house countdown and [Customer Testimonial](/social-post-templates/testimonial/) for client reviews.`,
    },
    features: [
      'Large property photo with a "Just listed" ribbon',
      'Asking price in an elegant serif heading',
      'Address and beds / baths / square feet pills',
      'Optional open-house line in the accent colour',
      'Agent name, contact and optional round photo',
      'Ribbon text changes for open house, price reduced or just sold',
      'Photo-left, details-right layout on 16:9',
      'Export PNG, JPEG, PDF, animated video or HTML',
    ],
    useCases: [
      { icon: '🏡', title: 'New listing announcements', desc: 'Post every new listing with its best exterior photo, price and key specs the day it goes live, with your contact details on the image itself.' },
      { icon: '🗝', title: 'Open house promotion', desc: 'Change the ribbon to "Open house", fill in the date and time line and post it a few days before, then share the Story version on the morning.' },
      { icon: '📉', title: 'Price reduced posts', desc: 'Re-promote a listing with a "Price reduced" ribbon and the new price, a quick way to bring back buyers who looked before.' },
      { icon: '🎉', title: 'Just sold celebrations', desc: 'Change the ribbon to "Just sold" to celebrate a closing, show proof of results and attract new sellers in the same neighbourhood.' },
    ],
    faqs: [
      { q: 'How do I make a "just listed" post for Instagram?', a: 'Open the Just Listed template, upload the property photo, and fill in the price, address, beds, baths, square feet and your contact details. Keep the 1080×1350 portrait size for the feed or switch to Story, then download the PNG.' },
      { q: 'Can I use it for "just sold" or "open house" posts?', a: 'Yes. Change the ribbon text to "Just sold", "Open house", "Price reduced" or "Under contract", and use the open-house line for dates and times.' },
      { q: 'What photo works best?', a: 'A bright, horizontal exterior or main-living-area photo at least 1600 px wide. You can drag the photo to choose which part shows in the frame.' },
      { q: 'Are my listing photos uploaded anywhere?', a: 'No. Photos are processed in your browser and saved only on your device, which keeps client and listing photos private.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Just Listed HTML and CSS: write listing captions and hashtags, turn it into a component fed from your MLS data, or generate a "just sold" version for every closing.',
      prompt: `Create a 1080×1350 "Just listed" real estate social post in plain HTML and CSS.

- The top 60% is a property photo (cover-cropped) with a dark orange "JUST LISTED" ribbon in the top-left.
- Below it, on an off-white panel: the price in a large serif font with an orange open-house line beside it, the two-line address, and three outlined pills for beds, baths and square feet.
- A footer row separated by a thin line, with an optional round agent photo, the agent name and contact details.
- Size everything with a CSS variable --u equal to 1% of the shorter side; on a 1600×900 size, put the photo on the left and the details on the right.`,
    },
  },

  'event-recap': {
    keywords: ['event recap post template', 'thats a wrap post template', 'conference recap social media post', 'event thank you post template', 'event highlights instagram post'],
    about: {
      title: 'Event Recap — Free "That\'s a Wrap" Event Recap Post Template',
      description: `**Event Recap** is a free social media template for the post that goes out after your event: a "That's a wrap!" label, the event name, a collage of three photos, three highlight numbers and a thank-you line to everyone who made it happen.

**Keep the momentum after the event**

The day after an event, attendees are sharing their own photos and tagging you. A recap post joins that conversation, thanks speakers and sponsors publicly, and shows people who missed it what they missed, which is the best promotion for next year's tickets. Big numbers such as "1,200 attendees" and "36 talks" make the event feel substantial at a glance.

**Photo collage without a design tool**

Upload three photos (one large, two smaller) straight from your computer, and drag each to choose the best crop. Until you add photos, the slots show soft accent-coloured gradients, so the layout always looks finished. The stats are three editable number-and-label pairs, so they work for any event: attendees, talks, workshops, cities, countries or cups of coffee.

**Every size from one design**

On the 4:5 feed size the photos sit between the headline and the stats. On 16:9 for X and LinkedIn the photos move to the right with the headline and stats stacked on the left, a great fit for LinkedIn, where event recaps get strong engagement. Wrap part of the event name in *asterisks* to colour it, like the year. Promote your next event with [Webinar Event](/social-post-templates/webinar-event/) and [Countdown](/social-post-templates/countdown/).`,
    },
    features: [
      '"That\'s a wrap" label and event name with *asterisk* highlights',
      'Three-photo collage with one large and two small photos',
      'Drag-to-reposition photo crops, processed in your browser',
      'Gradient placeholders so the post looks finished before photos',
      'Three editable highlight stats',
      'Thank-you line and handle in the footer',
      'Photos-right layout on 16:9 for X and LinkedIn',
      'Export PNG, JPEG, PDF, animated video or HTML',
    ],
    useCases: [
      { icon: '🎤', title: 'Conference and summit recaps', desc: 'Share the best stage, crowd and networking photos with attendee and talk numbers, and thank your speakers and sponsors by tagging them.' },
      { icon: '🍕', title: 'Meetup and community events', desc: 'Recap a local meetup with photos of the room and the number of people who came, an easy way to grow the next one.' },
      { icon: '🛠', title: 'Workshops and webinars', desc: 'After a workshop or webinar, share the number of attendees and lessons, and link the recording in the caption for those who missed it.' },
      { icon: '🥂', title: 'Launch parties and company events', desc: 'Celebrate a launch party, offsite or anniversary with team photos and fun stats, great content for your company LinkedIn page.' },
    ],
    faqs: [
      { q: 'How do I make an event recap post?', a: 'Open the Event Recap template, type the event name, upload three photos, fill in three highlight stats and write a thank-you line. Keep the 1080×1350 portrait size or switch to the LinkedIn size, then download the PNG.' },
      { q: 'When should I post an event recap?', a: 'Within one or two days of the event, while attendees are still posting about it and the photos are fresh. Tag speakers and sponsors in the caption so they can reshare it.' },
      { q: 'What stats should I include?', a: 'Pick three numbers that make the event feel big or special, such as attendees, talks, workshops, countries represented or funds raised. Keep the labels short.' },
      { q: 'What if I only have one good photo?', a: 'Use it in the large slot. The two small slots show soft gradients when empty, or you can add close-up shots such as the stage, the venue or the swag.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Event Recap HTML and CSS: write a recap caption that thanks speakers and sponsors, turn it into a component that takes photos and stats, or make a carousel with one highlight per slide.',
      prompt: `Create a 1080×1350 "That's a wrap!" event recap social post in plain HTML and CSS.

- Very dark navy background with a pink glow in the top-right.
- A small pink uppercase "That's a wrap!" label and the event name in a large bold font with the year in pink.
- A photo collage: one tall photo on the left and two stacked photos on the right, with rounded corners and gradient placeholders.
- Three stat cards in a row with large pink numbers and small labels.
- A footer with a thank-you line on the left and the handle on the right.
- Size everything with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },
};
