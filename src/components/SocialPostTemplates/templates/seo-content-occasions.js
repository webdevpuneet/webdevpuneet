/* Hand-written SEO content for the occasion and seasonal social post templates added on 2026-11-03
   (see __directions/roadmaps/SUGGESTIONS-OCCASIONS.html for the priority list). Merged into
   TEMPLATE_SEO and TEMPLATE_WHY by seo-content.js and seo-why.js. Same shape as the others:
   keywords, about, 8 features, 4 use cases (18-42 words), 4 FAQs (answers 25-70 words), aiPrompt. */

export const TEMPLATE_SEO_OCC = {
  'cyber-monday': {
    keywords: ['cyber monday post template', 'cyber monday instagram post', 'cyber monday sale graphic', 'cyber monday promo code post', 'saas cyber monday deal post'],
    about: {
      title: 'Cyber Monday — Free Neon Terminal Sale Post Template',
      description: `**Cyber Monday** is a free social post template for the online-only sales day that follows Black Friday, which falls on **Monday 30 November 2026**. Black Friday posts tend to look alike: black, red and a giant percentage. This one is built to look like the internet itself: a neon command-line window floating over a synthwave grid, with a striped retro sun glowing behind the headline.

**A sale that types itself**

Inside the window, a command such as "$ run cyber-monday --deal" types out character by character in the exported video, then the discount counts up from zero to "40% OFF" with a cyan and pink chromatic glow. The grid floor rolls towards the viewer and a block cursor blinks after the promo code, so even a still frame reads as "digital".

**Everything a deal post needs, in the right order**

The big outlined "Cyber Monday" headline says what it is, the discount says how much, one line of offer copy says on what ("Every plan, every template. *Today only.*"), the code sits in a solid cyan box that is easy to copy by eye, and the deadline sits at the bottom with your handle and an optional logo. Words wrapped in asterisks turn cyan.

**Made for digital products**

The developer look suits SaaS plans, apps, online courses, templates, plugins and tech shops, the businesses that sell most on Cyber Monday. Change the neon colours to your brand, rewrite the command as a joke your audience will get ("npm install savings"), or clear it.

**Every size from one design**

The layout reflows from the 4:5 feed post to a 9:16 Story, a 16:9 X image and a LinkedIn link image, with the headline on one line on wide sizes. Export PNG, JPEG, PDF, an animated MP4 or the HTML. For the Friday before, use [Black Friday Sale](/social-post-templates/holiday-sale/); for the final hours, [Countdown](/social-post-templates/countdown/); and pair it with the [Black Friday email](/email-templates/black-friday-sale/).`,
    },
    features: [
      'Neon command-line window with traffic-light dots and a file tab',
      'Command line that types itself out in the animated export',
      'Discount that counts up from zero with a chromatic neon glow',
      'Synthwave grid floor that rolls towards the viewer, and a striped retro sun',
      'Promo code in a solid box with a blinking block cursor',
      'Deadline line, handle and an optional logo in the footer',
      'Outlined headline that runs on one line on wide sizes',
      'Export PNG, JPEG, PDF, animated MP4 or HTML at every post size',
    ],
    useCases: [
      { icon: '☁️', title: 'SaaS and app subscriptions', desc: 'Announce an annual-plan discount for Cyber Monday with the code CYBER40, the deadline in your customers\' time zone and the command line rewritten as a product joke.' },
      { icon: '🎓', title: 'Online courses and digital products', desc: 'Promote a course bundle, template pack or e-book at a Cyber Monday price, and post the Story size with a link sticker to the checkout page.' },
      { icon: '🔌', title: 'Tech and gadget shops', desc: 'Show the store-wide discount on headphones, accessories or components, with the offer line naming the best-selling category and the deadline at midnight.' },
      { icon: '⏱', title: 'Cyber Week extensions', desc: 'Change the headline to "Cyber Week" and the deadline to Friday, then post it daily from Monday to Friday with a fresh offer line each time.' },
    ],
    faqs: [
      { q: 'When is Cyber Monday 2026?', a: 'Cyber Monday 2026 is on Monday 30 November, the Monday after US Thanksgiving (26 November) and Black Friday (27 November). Many brands run the sale from Saturday to Monday or extend it into a Cyber Week.' },
      { q: 'How is this different from the Black Friday template?', a: 'Black Friday Sale is a bold condensed type poster. Cyber Monday is a digital-themed design, a neon terminal over a retro grid, so your Monday post looks new in the feed instead of repeating Friday\'s.' },
      { q: 'Can I remove the command line or change the colours?', a: 'Yes. Clear the command field and it disappears. The two neon colours, the background and the code box are editable, so the grid, sun, glow and headline outline all follow your brand.' },
      { q: 'How do I make the animated version?', a: 'Choose the animated video export. The command types out, the discount counts up from zero, the grid rolls forward and the cursor blinks, which works well as a Reel, TikTok or Story.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Cyber Monday HTML and CSS: write five command-line jokes for your product, turn it into a five-day Cyber Week series, or recolour the neon to your brand while keeping the contrast readable.',
      prompt: `Create a 1080×1350 Cyber Monday sale social post in plain HTML and CSS.

- Background #05060f with a pink glow behind the top half.
- A synthwave grid floor at the bottom: two linear-gradient line patterns in cyan (#22d3ee), tilted back with perspective and rotateX, fading out towards the horizon with a mask.
- A large striped retro sun (yellow to pink gradient cut by horizontal dark stripes) behind the headline at low opacity.
- A huge outlined headline "CYBER MONDAY" on two lines in JetBrains Mono, transparent fill with a cyan text-stroke and glow.
- Below it, a terminal window with a cyan border and glow, traffic-light dots and a "deals.sh" tab, containing: the command "$ run cyber-monday --deal" in cyan, "40% OFF" in giant mono type with a pink and cyan chromatic text-shadow, one line of offer text, and the code "CYBER40" in a solid cyan box followed by a block cursor.
- A footer row with the deadline in cyan on the left and the handle on the right.
- Size everything with a CSS variable --u equal to 1% of the shorter side, so it also works at 1080×1920 and 1600×900.`,
    },
  },

  'giving-tuesday': {
    keywords: ['giving tuesday post template', 'giving tuesday instagram post', 'donation goal graphic', 'nonprofit fundraising post template', 'charity social media post'],
    about: {
      title: 'Giving Tuesday — Free Donation Goal Post Template for Nonprofits',
      description: `**Giving Tuesday** is a free social post template for the global day of giving that follows Black Friday and Cyber Monday. In 2026 it falls on **Tuesday 1 December**. Since it began in 2012 it has grown into a movement in dozens of countries, and for many charities it opens the year-end giving season. This template is built to answer the two questions every donor has: how close are you, and what will my gift actually do?

**A heart that fills as the money comes in**

The centre of the post is a large heart drawn with a CSS mask. In the animated export it fills from the bottom like a jar while the amount raised, "$7,400", counts up from zero inside it, with the goal ("of our $10,000 goal") underneath. Then a soft halo around the heart beats gently and small hearts drift in the background. Progress is the most persuasive thing a fundraiser can show, and here it is the first thing people see.

**Make one gift concrete**

Under the heart, a serif headline ("Help us *fill* the heart", with the highlighted word in italic red) and a single impact line turn an abstract donation into something real: "$25 puts a hot meal on the table for a family of four, every night for a week." A dark pill carries the call to action, and the footer holds your handle and an optional logo.

**Post it again as the total grows**

Giving Tuesday is a one-day campaign, so most organisations post several updates. Save the design, then change only the amount raised for a morning, midday and final-hours post; the headline and impact line stay the same.

**Sized for every channel**

The 4:5 portrait suits Instagram and Facebook, the 9:16 Story works with a donate link sticker, and on 16:9 and LinkedIn the heart sits beside the text. Recolour the heart to your cause colour. Pair it with [Thank You](/social-post-templates/thank-you/) after the campaign and [Milestone](/social-post-templates/milestone/) when you pass the goal.`,
    },
    features: [
      'Large heart that fills from the bottom in the animated export',
      'Amount raised counting up from zero inside the heart',
      'Goal line under the amount',
      'Serif headline with an italic highlighted word',
      'One-line impact statement for what a single gift pays for',
      'Donate call-to-action pill, handle and optional logo',
      'Heart sits beside the text on 16:9 and LinkedIn sizes',
      'Heart, halo and button colours editable for any cause',
    ],
    useCases: [
      { icon: '🍲', title: 'Food banks and community charities', desc: 'Post the morning total on Giving Tuesday with an impact line about meals, then update the amount at noon and in the evening as donations arrive.' },
      { icon: '🏫', title: 'Schools, PTAs and alumni funds', desc: 'Show how close a library, scholarship or playground appeal is to its goal, with the impact line naming exactly what the next $50 buys.' },
      { icon: '🛍', title: 'Brands that donate a share of sales', desc: 'Announce that a percentage of Giving Tuesday sales goes to a partner charity, with the heart tracking the running total you will donate.' },
      { icon: '🐾', title: 'Animal shelters and rescues', desc: 'Recolour the heart to your brand, set the goal for winter care costs and say what one gift covers, such as vaccinations for a rescued puppy.' },
    ],
    faqs: [
      { q: 'When is Giving Tuesday 2026?', a: 'Giving Tuesday 2026 is on Tuesday 1 December, the Tuesday after US Thanksgiving, Black Friday and Cyber Monday. Many organisations start promoting it a week before and post updates throughout the day.' },
      { q: 'Does the heart fill to my actual percentage?', a: 'The heart fills completely as a symbol, while the real numbers sit inside it: the amount raised and the goal. Update the amount field for each new post and the count-up animation follows it.' },
      { q: 'What should a Giving Tuesday post say?', a: 'Show progress towards a clear goal, make one gift concrete ("$25 feeds a family for a week"), give one easy way to donate and thank people publicly. Short, specific posts outperform long appeals in the feed.' },
      { q: 'Can I use it for fundraisers on other days?', a: 'Yes. Replace the hashtag label with your campaign name and date, such as an end-of-year appeal or a charity run, and keep the heart, amount and impact line.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Giving Tuesday HTML and CSS: write five impact lines for your cause, turn it into a morning, midday and final-hour update series, or add a real percentage bar under the heart.',
      prompt: `Create a 1080×1350 Giving Tuesday fundraising social post in plain HTML and CSS.

- Warm cream background (#fff4e8) with a soft pink glow behind the centre and four faint hearts scattered around the edges.
- A small uppercase red label "#GivingTuesday · 1 December" at the top.
- A large heart (CSS mask with an inline SVG heart path) filled with a pink-to-red vertical gradient, with a lighter halo heart slightly larger behind it.
- Inside the heart, in white: "$7,400" in a heavy serif (Fraunces 900) and "of our $10,000 goal" below.
- Under the heart: a serif headline "Help us fill the heart" with "fill" in italic red, one line "$25 puts a hot meal on the table for a family of four, every night for a week.", and a dark pill button "Donate today · link in bio".
- A footer with an optional logo and the handle "@yourcharity".
- Animate the heart filling from the bottom (clip-path inset) and the amount counting up, with a reduced-motion fallback.
- Size everything with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },

  'advent-calendar': {
    keywords: ['advent calendar post template', '12 days of christmas post template', 'daily deal instagram post', 'advent calendar sale graphic', 'december daily deals post'],
    about: {
      title: 'Advent Calendar Deal — Free Daily December Post Template',
      description: `**Advent Calendar Deal** is a free social post template for running a deal, giveaway or tip every day in December. An advent calendar campaign is one of the easiest ways to give people a reason to check your feed every morning, but it needs 24 posts that look like one series. This template is that series: one design, with only the day number and the deal changing.

**A wall of little doors, and today's door in front**

The background is a pine-green wall of 24 numbered doors in thin gold outlines, with a few already opened to show a twinkling star. In front sits today's door: a deep red card with a double gold frame, a gold bow on top, "DAY" in spaced capitals and a huge serif day number. In the animated export the number ticks up from zero to today, like flipping through the calendar, while snowflakes drift down the wall.

**The deal, then the code**

Under the number, the deal is set in a large serif ("*20% off* every candle", with the highlighted words in gold italic) and the code or detail sits in a gold chip ("Today only · code DAY7"). Below the door, a note tells people why to come back ("A new door opens every morning until 24 December"), followed by your handle and optional logo on a soft backing so they stay readable over the doors.

**24 posts in a few minutes**

Because every day uses the same layout, the fastest way to make the whole month is Bulk create: paste a spreadsheet with a day and a deal per row and download every post as a ZIP. It also works for a "12 days of Christmas" countdown: change the label and run it from 13 to 24 December.

**For feed, Story and LinkedIn**

On the 16:9 and LinkedIn sizes the wall spreads to eight columns and the door sits in the middle; on the Story size the door stretches taller. Recolour the wall and door for Hanukkah's eight nights, a Ramadan calendar or a brand anniversary. Pair it with [Countdown](/social-post-templates/countdown/) for the final days and [Christmas Greeting](/social-post-templates/christmas-greeting/) on the 25th.`,
    },
    features: [
      'Pine-green wall of 24 numbered doors, some opened with twinkling stars',
      'Today\'s door as a red card with a double gold frame and a bow',
      'Huge serif day number that ticks up to today in the animated export',
      'Deal headline with gold italic highlights',
      'Gold code chip and a "come back tomorrow" note',
      'Falling snow across the wall',
      'Eight-column wall on 16:9 and LinkedIn sizes',
      'Bulk create 24 (or 12) days from one spreadsheet',
    ],
    useCases: [
      { icon: '🕯', title: 'Shops running 24 days of deals', desc: 'Post a new discount every morning from 1 to 24 December, each with its own code, and use Bulk create to make the whole month in one go.' },
      { icon: '🎁', title: '"12 days of Christmas" campaigns', desc: 'Change the label to "12 days of Christmas", start on 13 December and drop a new product, bundle or gift idea each day until Christmas Eve.' },
      { icon: '🍪', title: 'Daily tips, recipes or giveaways', desc: 'Use the deal line for a December tip, a recipe or a prize, and the chip for "Comment to enter", so the series builds daily engagement without a discount.' },
      { icon: '🕎', title: 'Other countdown festivals', desc: 'Recolour the wall and door for the eight nights of Hanukkah, the days of Ramadan or a launch countdown, keeping the same door-a-day idea.' },
    ],
    faqs: [
      { q: 'How do I make 24 advent calendar posts quickly?', a: 'Use Export, then "Bulk create from CSV", and paste a spreadsheet with day, deal and code columns. Every row becomes one post with the same design, and you download them all as a ZIP.' },
      { q: 'Can I use it for 12 days instead of 24?', a: 'Yes. Change the label to "12 days of Christmas" (or "12 days of deals") and the note to your end date. The wall of doors is decoration, so it works for any number of days.' },
      { q: 'What does the animation do?', a: 'In the animated export the day number ticks up from zero to today, snow falls across the wall and the stars behind the opened doors twinkle, which suits a daily Reel or Story.' },
      { q: 'When should I post an advent calendar deal?', a: 'At the same time every morning, so followers learn when to check. Many brands announce the calendar in late November, then post each door at 8 or 9 am local time from 1 December.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Advent Calendar Deal HTML and CSS: plan 24 days of offers for your shop, write a CSV for Bulk create, or restyle the door for Hanukkah or a brand anniversary.',
      prompt: `Create a 1080×1350 advent calendar daily-deal social post in plain HTML and CSS.

- A pine-green background (#123d2b) covered by a faint 4-column grid of 24 small doors, each with a thin gold outline and its number in the top-left; doors 3, 6, 11, 14, 19 and 22 are "opened" with a gold star in the middle.
- A small gold uppercase label "Advent calendar · 24 days of deals" on a dark pill at the top.
- In front, a large deep-red card (#b4182d) with a double gold inner frame (inset box-shadows) and a gold bow drawn with CSS on its top edge.
- Inside the card: "DAY" in spaced capitals, a huge gold serif "7" (Playfair Display 800), the deal "20% off every candle" with "20% off" in gold italic, and a gold pill "Today only · code DAY7".
- Under the card: "A new door opens every morning until 24 December" and the handle, each on a soft dark backing.
- A few white snow dots, and a CSS animation that makes them fall (disabled with prefers-reduced-motion).
- Size everything with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },

  hanukkah: {
    keywords: ['hanukkah post template', 'happy hanukkah instagram post', 'chanukah greeting template', 'menorah social media post', 'hanukkah sale post'],
    about: {
      title: 'Hanukkah — Free Menorah Greeting & Offer Post Template',
      description: `**Hanukkah** is a free social post template for the eight-night Jewish festival of lights, which in 2026 begins at sundown on **Friday 4 December** and ends on **Saturday 12 December**. It is drawn entirely in CSS, so the menorah, candles and flames recolour to your brand and stay sharp at every size, with no stock photo to license.

**A menorah that lights the way it does at home**

At the centre is a nine-branched Hanukkah menorah (a hanukkiah) in polished silver, with blue-and-white striped candles. The shamash, the helper candle used to light the others, stands raised in the middle on its own stem. In the animated export it is lit first, then the eight flames come on one after another and keep flickering. Each flame has a warm glow against the night-blue sky, and a few silver stars twinkle around it.

**Hebrew and English together**

Under the menorah, an editable Hebrew line, "חג חנוכה שמח" (Chag Chanukah Sameach, happy Hanukkah), is set right to left in Frank Ruhl Libre, a typeface that carries Hebrew and Latin. Below it, "Happy *Hanukkah*" is set in a large serif with the festival name in gold, followed by a short warm message. Clear the Hebrew field and it disappears.

**A greeting, or eight nights of deals**

The optional gold chip suits an "8 nights · 8 deals" campaign, a gift guide or opening hours during the festival. Leave it empty for a pure greeting from a school, synagogue, community group or company page. Your handle and an optional logo sit at the bottom.

**Every size**

The 4:5 portrait is for the Instagram and Facebook feed, the 9:16 Story for Stories and WhatsApp Status, and on 16:9 and LinkedIn the menorah sits beside the text. For one post per night, pair it with [Advent Calendar Deal](/social-post-templates/advent-calendar/) recoloured in blue and silver, and use [Thank You](/social-post-templates/thank-you/) after the festival.`,
    },
    features: [
      'Silver nine-branched menorah drawn in CSS, with the shamash raised in the middle',
      'Shamash lights first, then the eight flames light one by one and flicker',
      'Blue-and-white striped candles and twinkling silver stars',
      'Editable Hebrew greeting set right to left in Frank Ruhl Libre',
      'Large serif "Happy Hanukkah" headline with a gold highlight',
      'Optional offer chip for eight nights of deals',
      'Handle and optional logo in the footer',
      'Menorah beside the text on 16:9 and LinkedIn sizes',
    ],
    useCases: [
      { icon: '🛍', title: 'Eight nights of deals', desc: 'Announce a different offer for each night of Hanukkah, with the chip naming the night and the deal, and post it every evening at candle-lighting time.' },
      { icon: '🏫', title: 'Schools, synagogues and communities', desc: 'Share a Hanukkah greeting with families, with the offer chip cleared or used for a candle-lighting event time, a latke evening or holiday closing dates.' },
      { icon: '🏢', title: 'Company and client greetings', desc: 'Send a warm Hanukkah message from a company page on LinkedIn or Instagram, with the Hebrew line kept and the message written in your own voice.' },
      { icon: '🥯', title: 'Bakeries, cafés and delis', desc: 'Promote sufganiyot, latkes or Hanukkah gift boxes with the order deadline in the chip, using the Story size with a link sticker to the menu.' },
    ],
    faqs: [
      { q: 'When is Hanukkah 2026?', a: 'Hanukkah 2026 begins at sundown on Friday 4 December and ends at nightfall on Saturday 12 December. It lasts eight nights, and the dates follow the Hebrew calendar, so they move each year in the Gregorian calendar.' },
      { q: 'Why is one candle higher than the others?', a: 'That is the shamash, the helper candle used to light the other eight. It traditionally stands apart, higher or lower than the rest, which is why it is raised in the middle and lit first in the animation.' },
      { q: 'Can I change the Hebrew greeting?', a: 'Yes. It is an ordinary text field set right to left. Keep "חג חנוכה שמח", write another greeting such as "חג אורים שמח", or clear the field and the line disappears.' },
      { q: 'Is it spelled Hanukkah or Chanukah?', a: 'Both are common transliterations of the same Hebrew word. Change the headline to whichever your audience uses; the page and template work for searches with either spelling.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Hanukkah HTML and CSS: write eight nightly offers, add the night number above the menorah, or recolour it in gold and cream for a softer greeting.',
      prompt: `Create a 1080×1350 Hanukkah greeting social post in plain HTML and CSS.

- A night-blue gradient background from #071a45 at the top to #1d3f91 at the bottom, with a warm glow above the menorah and five small silver ✦ stars.
- A small uppercase silver label "Festival of lights · 8 nights" at the top.
- A nine-branched menorah drawn with CSS: a silver horizontal bar, a short stem and a rounded base; nine blue-and-white striped candles on the bar, the middle one (the shamash) raised on its own short stem.
- Each candle has a teardrop flame (radial gradient white to yellow to orange) with a soft glow; animate the flames lighting one by one, middle first, then flickering, with a prefers-reduced-motion fallback.
- Below: the Hebrew greeting "חג חנוכה שמח" in gold (dir="rtl", Frank Ruhl Libre), a large serif headline "Happy Hanukkah" with "Hanukkah" in gold, a two-line message, and a gold pill "8 nights · 8 deals · starts 4 Dec".
- The handle at the bottom. Size everything with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },

  'holiday-hours': {
    keywords: ['holiday hours post template', 'christmas opening hours post', 'we are closed post template', 'holiday closure notice instagram', 'store hours social media post'],
    about: {
      title: 'Holiday Hours — Free "We\'re Closed" Opening Hours Post Template',
      description: `**Holiday Hours** is a free social post template for the notice every local business has to publish at least once a year: when you are open, when you are closed and when you are back. Customers look for it on your Instagram, Facebook and Google profile before they make the trip, and a clear post saves you a stream of "are you open on the 26th?" messages.

**A shop sign, not a spreadsheet**

The hours sit on a cream enamel sign that hangs from a nail on two strings, with a double rule around the edge and two silver screws on top. In the animated export the sign swings gently on its nail, a line of coloured string lights twinkles along the top of the wall, and a red "Back on Mon 4 Jan" stamp thumps down onto the corner of the sign. It feels festive without naming a single holiday, so it works for Christmas, Eid, Diwali, Lunar New Year or a summer break.

**Dates and hours you can read at a glance**

Under the label and a friendly serif headline ("We're taking a *little break*"), up to four rows list a date or range on the left and the hours on the right, joined by a dotted leader like a menu. Write "Closed" where you are closed. Leave a row's date empty and that row disappears, so two or three rows look just as tidy as four.

**A note and your brand**

Under the sign, an optional note handles the exception people ask about most, such as "Online orders keep shipping from 2 Jan" or "Emergency line open 24/7". Your handle and an optional logo finish the post.

**Post it everywhere people check**

Use the 4:5 size for the Instagram and Facebook feed, the 9:16 Story for a pinned highlight, and the 16:9 and LinkedIn sizes for X, LinkedIn and your Google Business Profile update. The wall, sign and stamp colours are editable. Pair it with [Christmas Greeting](/social-post-templates/christmas-greeting/) or [Happy New Year](/social-post-templates/new-year/), and send the same dates in the [Holiday Greetings email](/email-templates/holiday-greetings/).`,
    },
    features: [
      'Cream enamel sign hanging from a nail on two strings',
      'Sign swings gently and a red "back on" stamp thumps down in the animated export',
      'Twinkling string lights along the top of the wall',
      'Up to four date and hours rows with dotted leaders, like a menu',
      'Empty rows disappear, so two or three dates look just as tidy',
      'Optional note for the exception, such as online orders or an emergency line',
      'Handle and optional logo under the sign',
      'Works for Christmas, Eid, Diwali, Lunar New Year or any closure',
    ],
    useCases: [
      { icon: '🍽', title: 'Restaurants and cafés', desc: 'List Christmas Eve, Christmas Day, New Year\'s Eve and New Year\'s Day hours, with the note pointing to gift vouchers available online while you are closed.' },
      { icon: '💈', title: 'Salons, clinics and studios', desc: 'Tell clients which days you close over the holidays and when bookings open again, and pin the Story version to your highlights until you reopen.' },
      { icon: '🏪', title: 'Shops and local services', desc: 'Post changed opening hours for a festival or public holiday, such as Eid or Diwali, and update your Google Business Profile with the same image.' },
      { icon: '🏢', title: 'Offices and B2B teams', desc: 'Share the office shutdown between Christmas and New Year on LinkedIn, with the note giving the support email or emergency number that stays open.' },
    ],
    faqs: [
      { q: 'How do I post holiday opening hours on Instagram?', a: 'Edit the dates and hours, set the "back on" stamp, then download the 4:5 PNG for the feed and the 9:16 Story. Post it a week before, then pin the Story to a highlight until you reopen.' },
      { q: 'Can I show fewer than four dates?', a: 'Yes. Leave the date field of any row empty and that row disappears. The sign keeps its layout, so two or three rows look as balanced as four.' },
      { q: 'Is it only for Christmas?', a: 'No. The design is festive but neutral: string lights, a hanging sign and a stamp. Change the headline and dates for Eid, Diwali, Lunar New Year, Easter, a national holiday or a summer break.' },
      { q: 'Should I also update my Google Business Profile?', a: 'Yes. Set special hours in your Google Business Profile so Maps and Search show them, and add this image as an update so people browsing your profile see it too.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Holiday Hours HTML and CSS: write the copy for your own closure dates, make an Eid or Diwali version with a matching palette, or produce the same notice as a short email and a Google Business Profile update.',
      prompt: `Create a 1080×1350 holiday opening-hours social post in plain HTML and CSS.

- A dark slate wall (#1d2b3a) with faint vertical panel lines.
- Across the top, string lights on a sagging wire: eight teardrop bulbs in yellow, red, green and blue with a soft glow; make them twinkle with a CSS animation.
- In the middle, a cream enamel sign (#fbf6ea) hanging from a silver nail on two diagonal strings, with an inner rule, two silver screws and a drop shadow; let the whole sign swing gently from the nail (rotate around the top centre).
- On the sign: a red uppercase label "Holiday hours", a serif headline "We're taking a little break" with "little break" in red italic, then four rows of date and hours joined by a dotted leader ("Wed 24 Dec … 9:00 – 14:00", "Thu 25 – Fri 26 Dec … Closed").
- A round red stamp "Back on Mon 4 Jan" tilted on the sign's top-right corner.
- Under the sign: a note "Online orders keep shipping from 2 Jan" and the handle.
- Size everything with a CSS variable --u equal to 1% of the shorter side, and respect prefers-reduced-motion.`,
    },
  },

  'year-in-review': {
    keywords: ['year in review post template', 'wrapped style instagram post', 'year in numbers graphic', 'end of year recap post', '2026 year in review template'],
    about: {
      title: 'Year in Review — Free "Wrapped" Style Stats Post Template',
      description: `**Year in Review** is a free social post template for the end-of-year recap, the post that turns twelve months of work into three numbers people want to share. Year-end "wrapped" recaps from music and fitness apps have made the format familiar: bold colour, huge numbers, a little bragging and a lot of thank-you. This template brings that energy to any brand, shop, creator or nonprofit.

**A year you can see from across the feed**

The top of the post is the year itself, "2026", in giant outlined letters with a lime stroke, a small "Year in review" pill above it and a pink starburst turning slowly in the corner. Under it, a heavy headline ("Our year in *numbers*") sets up the stats.

**Three tiles, three colours, three numbers**

The stats sit in colour-block tiles: a wide lime tile for the headline number ("12,480 orders packed by hand") and two smaller pink and orange tiles side by side ("38 countries shipped to", "4.9★ average review"). In the animated export the tiles slide in from the left, the bottom and the right while every number counts up from zero. Numbers with commas, decimals, stars or units ("12,480", "4.9★", "3.2M") all count correctly.

**End on a thank-you**

The footer pairs a one-line thank-you with your handle and an optional logo, because a recap lands best when it credits the people who made the numbers.

**Pick numbers that tell a story**

Choose one big number for the wide tile and two that add colour: something human (cups of coffee, cities visited, team members hired), something about reach (countries, members, downloads) and something about quality (rating, repeat customers). Recolour the tiles to your brand; on 16:9 and LinkedIn the year and headline move to the left with the tiles on the right.

Follow it with [Thank You](/social-post-templates/thank-you/) or [Happy New Year](/social-post-templates/new-year/), use [Big Stat](/social-post-templates/big-stat/) for a single number in the new year, and turn the same stats into a carousel with [Carousel Cover](/social-post-templates/carousel-cover/).`,
    },
    features: [
      'Giant outlined year with a slowly turning starburst',
      'Three colour-block stat tiles: one wide, two side by side',
      'Tiles slide in from the left, bottom and right in the animated export',
      'Every number counts up from zero, including commas, decimals and ★',
      'Heavy headline with a highlighted word',
      'Thank-you line, handle and optional logo in the footer',
      'Year and headline on the left, tiles on the right on wide sizes',
      'All three tile colours, the year and the background are editable',
    ],
    useCases: [
      { icon: '📦', title: 'Online shops and makers', desc: 'Share orders shipped, countries reached and your average review in December, with a thank-you line for customers and the logo in the footer.' },
      { icon: '☁️', title: 'SaaS and apps', desc: 'Post product numbers such as users, features shipped and uptime, then follow up with a carousel that explains the year behind each stat.' },
      { icon: '🎙', title: 'Creators and podcasters', desc: 'Recap episodes published, downloads and countries listening, styled like a wrapped summary your audience will recognise and share in Stories.' },
      { icon: '🤝', title: 'Nonprofits and community groups', desc: 'Turn the annual report into three numbers: meals served, volunteers and funds raised, with a thank-you to donors as the footer line.' },
    ],
    faqs: [
      { q: 'What should go in a year in review post?', a: 'Three numbers that tell your year at a glance: one headline result, one about reach and one about quality or people. Add a short thank-you, and save the detail for a caption or a carousel that follows.' },
      { q: 'When should I post a year in review?', a: 'Mid to late December, before people switch off for the holidays, or in the first week of January as a fresh-start post. Many brands post the recap on social and send the same numbers by email.' },
      { q: 'Do the numbers really count up in the video?', a: 'Yes. In the animated export each number counts up from zero while its tile slides in. Commas, decimals and symbols are kept, so "12,480", "4.9★" and "3.2M" all count correctly.' },
      { q: 'Can I use it for a monthly or campaign recap?', a: 'Yes. Change the year to a month, quarter or campaign name, such as "Q3" or "Launch week", and the outlined text and tiles work the same way.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Year in Review HTML and CSS: choose the three most shareable numbers from your year, write captions for each, or extend it into a five-slide wrapped carousel.',
      prompt: `Create a 1080×1350 "year in review" social post in a bold wrapped style, in plain HTML and CSS.

- Deep violet background (#1b1035) with a pink glow in the top-right and a lime glow bottom-left.
- A pink 16-point starburst (CSS mask with an inline SVG polygon) half off the top-right corner, slowly rotating.
- Top-left: a lime pill "YEAR IN REVIEW", the year "2026" in giant Archivo Black with a transparent fill and a lime text-stroke, and a headline "Our year in numbers" with "numbers" in lime.
- A two-row grid of stat tiles: a full-width lime tile "12,480 / orders packed by hand", then a pink tile "38 / countries shipped to" (one large rounded corner) and an orange tile "4.9★ / average review". Numbers in Archivo Black, labels in Space Grotesk, dark text on the tiles.
- Footer: "Thank you for being part of it." on the left and the handle in lime on the right.
- Animate the tiles sliding in from the left, bottom and right and the numbers counting up, with a prefers-reduced-motion fallback.
- Size everything with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },

  'lunar-new-year': {
    keywords: ['lunar new year post template', 'chinese new year instagram post', 'year of the goat 2027 post', 'spring festival greeting template', 'red envelope sale post'],
    about: {
      title: 'Lunar New Year — Free Chinese New Year Greeting Post Template',
      description: `**Lunar New Year** is a free social post template for the biggest festival in the lunar calendar, celebrated as Chinese New Year or the Spring Festival in China, Tết in Vietnam and Seollal in Korea, and across Singapore, Malaysia and Chinese communities worldwide. In 2027 it falls on **Saturday 6 February** and welcomes the **Year of the Goat**.

**Red, gold and everything that moves**

The background is a deep festive red that brightens towards the bottom, with a gold scalloped border along the base. Two silk lanterns hang from the top corners on gold cords, with ribbed bodies, gold caps and tassels, and in the animated export they sway on their cords while gold fireworks burst and fade in the sky behind them.

**A fortune charm at the centre**

In the middle hangs a diamond-shaped red charm with a gold frame and the character 福 (fú, good fortune), the kind of paper charm families hang on their doors for the new year. It pops in first in the animation. Some families hang it upside down, because "upside down" (dào) sounds like "arrived"; the character is an editable field, so you can use 春 (spring) or 喜 (joy) instead.

**Greeting, wish and a red-envelope offer**

Under the charm, an editable Chinese greeting, 新年快乐 (Happy New Year), is set in Noto Serif SC, followed by "Happy Lunar *New Year*" in a large serif with the highlight in gold and a short wish for health and good fortune. The optional chip carries a red-envelope (hongbao) offer; "8% off" is a nod to eight, a lucky number because it sounds like "prosper". Clear it for a pure greeting.

**For every community that celebrates**

Change the greeting to "Chúc Mừng Năm Mới" for Tết or "새해 복 많이 받으세요" for Seollal (scripts outside the bundled font use your device font), and change the label to the animal of your year. On 16:9 and LinkedIn the charm sits beside the text. Pair it with [Countdown](/social-post-templates/countdown/) for the run-up and [Holiday Hours](/social-post-templates/holiday-hours/) for festival closures.`,
    },
    features: [
      'Two silk lanterns with gold caps and tassels that sway on their cords',
      'Gold fireworks that burst and fade behind the lanterns',
      'Diamond-shaped 福 fortune charm that pops in first',
      'Editable charm character, such as 福, 春 or 喜',
      'Editable Chinese greeting in Noto Serif SC',
      'Optional red-envelope offer chip',
      'Gold scalloped border along the bottom',
      'Charm beside the text on 16:9 and LinkedIn sizes',
    ],
    useCases: [
      { icon: '🍜', title: 'Restaurants and bakeries', desc: 'Share a Lunar New Year greeting with the reunion-dinner menu or a pineapple-tart pre-order deadline in the offer chip, posted in the week before 6 February.' },
      { icon: '🛍', title: 'Shops running red-envelope sales', desc: 'Announce a "red envelope" discount in the chip, with 8% or 88 as a lucky number, and post a Story version with a link to the sale.' },
      { icon: '🏢', title: 'Companies with teams in Asia', desc: 'Send a festive greeting from your company page to clients and staff in China, Singapore, Malaysia, Vietnam or Korea, with the greeting changed for each market.' },
      { icon: '🎓', title: 'Schools and community groups', desc: 'Invite families to a lion dance, lantern-making workshop or Chinese New Year celebration by putting the date and time in the offer chip.' },
    ],
    faqs: [
      { q: 'When is Lunar New Year 2027?', a: 'Lunar New Year 2027 is on Saturday 6 February and begins the Year of the Goat. Celebrations traditionally last fifteen days, until the Lantern Festival, and many businesses close for the first few days.' },
      { q: 'Can I use it for Tết or Seollal?', a: 'Yes. Change the Chinese greeting to "Chúc Mừng Năm Mới" for Vietnamese Tết or "새해 복 많이 받으세요" for Korean Seollal, and edit the label. The lanterns, fireworks and colours suit both.' },
      { q: 'What does the 福 character mean?', a: '福 (fú) means good fortune or blessing, and it is hung on doors for the new year. It is an editable field, so you can replace it with 春 (spring), 喜 (joy) or your brand initial.' },
      { q: 'Should I say Lunar New Year or Chinese New Year?', a: 'Lunar New Year includes everyone who celebrates, including Vietnamese and Korean communities. If your audience is mainly Chinese, "Chinese New Year" or "Spring Festival" is common; the headline is yours to change.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Lunar New Year HTML and CSS: write greetings for Chinese, Vietnamese and Korean audiences, create a red-envelope sale series for the fifteen days, or redraw the charm with your brand initial.',
      prompt: `Create a 1080×1350 Lunar New Year greeting social post in plain HTML and CSS.

- A deep red vertical gradient (#8f0d14 to #c8161d) with a soft gold glow in the centre and a gold scalloped wave border along the bottom.
- Two silk lanterns hanging from the top corners on gold cords: red ribbed ellipse bodies with a warm glow, gold caps top and bottom and a gold tassel; make them sway from the top of the cord.
- Three gold firework bursts (repeating-conic-gradient rays masked into a ring) that grow and fade.
- In the centre, a red diamond (a square rotated 45°) with a gold double border and the gold character 福 kept upright inside.
- Below: the Chinese greeting 新年快乐 in gold (Noto Serif SC), a large serif headline "Happy Lunar New Year" with "New Year" in gold, a one-line wish, and a gold chip "Red envelope deal · 8% off everything".
- A small gold label "Year of the Goat · 2027" at the top and the handle at the bottom.
- Size everything with a CSS variable --u equal to 1% of the shorter side and respect prefers-reduced-motion.`,
    },
  },

  'ramadan-eid': {
    keywords: ['ramadan post template', 'ramadan kareem instagram post', 'eid mubarak post template', 'eid al fitr greeting template', 'iftar menu social media post'],
    about: {
      title: 'Ramadan & Eid — Free Ramadan Kareem and Eid Mubarak Post Template',
      description: `**Ramadan & Eid** is a free social post template for the holy month and the celebration that ends it. In 2027 Ramadan is expected to begin around **8 February**, with **Eid al-Fitr** around **9–10 March** and **Eid al-Adha** around **16 May**; the exact days depend on the sighting of the moon. One design covers all three moments: change the greeting from "Ramadan Kareem" to "Eid Mubarak" and it is ready.

**A night sky, a crescent and two lanterns**

The background is a deep teal night with a soft gold glow and a scatter of twinkling stars. Two fanous lanterns, the coloured-glass lanterns hung in streets and homes during Ramadan, hang from the top on gold chains. In the animated export they sway gently while the flame inside each one flickers, and the gold crescent moon at the top of the arch pops in first.

**A pointed arch as the frame**

The greeting sits inside a tall pointed arch, the shape of a mosque doorway or mihrab, drawn with a gold outline around a darker panel. Inside it: a small label ("Ramadan 2027"), an editable Arabic greeting, رمضان كريم, set in Amiri, a typeface designed for Arabic that also carries Latin letters, the headline "Ramadan *Kareem*" with the highlight in gold, and a short wish.

**Iftar times, hours or an Eid offer**

The optional gold chip handles the practical message that matters during the month: an iftar menu from sunset, changed opening hours, a suhoor delivery window or an Eid gift offer. Clear it for a pure greeting. Your handle and an optional logo sit under the arch.

**For every channel**

The 4:5 portrait suits Instagram and Facebook, the 9:16 Story fits WhatsApp Status, and on the 16:9 and LinkedIn sizes the arch stands in the middle between the lanterns. Recolour the night to a deep blue or burgundy if it suits your brand. Use [Holiday Hours](/social-post-templates/holiday-hours/) for Eid closures, [Discount Badge](/social-post-templates/discount-badge/) for an Eid sale, and [Thank You](/social-post-templates/thank-you/) after the month.`,
    },
    features: [
      'Gold crescent moon that pops in at the top of the arch',
      'Two fanous lanterns on gold chains that sway, with flickering flames',
      'Tall pointed arch with a gold outline framing the greeting',
      'Editable Arabic greeting set right to left in Amiri',
      'Headline with a gold highlight, such as "Ramadan Kareem" or "Eid Mubarak"',
      'Optional chip for iftar times, Ramadan hours or an Eid offer',
      'Twinkling stars on a deep teal night',
      'Handle and optional logo under the arch',
    ],
    useCases: [
      { icon: '🍽', title: 'Restaurants and cafés during Ramadan', desc: 'Share a Ramadan Kareem greeting with the iftar menu or suhoor delivery hours in the chip, and post the Story size with a link to reservations.' },
      { icon: '🛍', title: 'Eid sales and gift offers', desc: 'Change the greeting to عيد مبارك and the headline to "Eid *Mubarak*", then use the chip for an Eid gift box, outfit sale or delivery deadline.' },
      { icon: '🏢', title: 'Company and client greetings', desc: 'Send Ramadan and Eid greetings from your company page to clients and colleagues in the Gulf, South Asia, Southeast Asia and Europe.' },
      { icon: '🕌', title: 'Mosques, schools and charities', desc: 'Announce community iftars, taraweeh times or a zakat appeal, with the date and time in the chip and the message written for your community.' },
    ],
    faqs: [
      { q: 'When is Ramadan 2027?', a: 'Ramadan 2027 is expected to begin around 8 February, with Eid al-Fitr around 9 or 10 March. Dates follow the Islamic lunar calendar and moon sighting, so confirm them with your local mosque or authority before posting.' },
      { q: 'Can I use the same template for Eid Mubarak?', a: 'Yes. Change the Arabic line to عيد مبارك, the headline to "Eid Mubarak" and the label to "Eid al-Fitr" or "Eid al-Adha". The crescent, lanterns and arch suit both occasions.' },
      { q: 'What does Ramadan Kareem mean?', a: '"Ramadan Kareem" means "generous Ramadan" and is a common greeting during the month, as is "Ramadan Mubarak", meaning "blessed Ramadan". Use whichever your audience says; the headline is fully editable.' },
      { q: 'Which font is used for the Arabic text?', a: 'The Arabic greeting and the headline use Amiri, a classical naskh typeface made for Arabic that also includes Latin letters, so both scripts sit together naturally on the same post.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the Ramadan & Eid HTML and CSS: write greetings in Arabic, Urdu, Malay or Turkish, plan a 30-day iftar menu series, or make an Eid al-Adha version with a different palette.',
      prompt: `Create a 1080×1350 Ramadan Kareem greeting social post in plain HTML and CSS.

- A deep teal night gradient (#06242c to #0e3d44) with a soft gold glow near the top and six small gold ✦ stars that twinkle.
- Two fanous lanterns hanging from the top corners on dotted gold chains: a gold triangular cap, a glowing octagonal glass body (clip-path) with two gold vertical bars and a flickering teardrop flame inside, and a gold base; let them sway from the chain.
- In the centre, a tall pointed (Islamic) arch: a gold arch shape (CSS mask with an inline SVG path, stretched to fit) with a slightly smaller dark-teal arch inside it, forming a gold outline.
- Inside the arch: a gold crescent moon (a circle with an inset box-shadow), a small label "Ramadan 2027", the Arabic "رمضان كريم" in gold Amiri (dir="rtl"), a headline "Ramadan Kareem" with "Kareem" in gold, a short wish and a gold pill "Iftar menu · daily from sunset".
- The handle in gold under the arch. Size everything with a CSS variable --u equal to 1% of the shorter side, and respect prefers-reduced-motion.`,
    },
  },

  'national-day': {
    keywords: ['independence day post template', 'national day social media post', 'republic day instagram post', 'flag post template', 'patriotic greeting template'],
    about: {
      title: 'National Day — Free Independence & Republic Day Waving Flag Post Template',
      description: `**National Day** is a free social post template for independence days, republic days and national holidays in any country with a striped flag. Instead of a separate design for every nation, it gives you one flag you colour yourself: set the three stripe colours, and the same post works for India's Republic Day on 26 January, the Netherlands' King's Day on 27 April, Germany's Unity Day on 3 October or Hungary's national days.

**A flag that really waves**

The flag hangs from a silver pole with a gold finial, and it is cut into eighteen thin vertical slices. In the animated export each slice rises and falls a moment after its neighbour, so a smooth ripple runs from the pole to the tip like cloth in the wind, while fireworks in your flag's colours burst and fade in the night sky. Alternating light and dark slices add the soft folds of real fabric even in the still image.

**Emblems: built in, or your own**

The default flag is India's tricolour with its navy wheel drawn in CSS. Set the emblem colour to the middle stripe's colour and the wheel disappears, for a plain three-stripe flag. For flags with a crest, a sun or a star, upload the emblem as an image and it replaces the wheel in the centre.

**Greeting, message and your brand**

Under the flag sits a label for the occasion and date, a large serif headline ("Happy *Republic Day*") with the highlight in the accent colour, a short message, and your handle with an optional logo. On the 16:9 and LinkedIn sizes the flag sits on the left with the text beside it.

**One honest limit**

The stripes are horizontal. Flags with vertical stripes, such as France, Italy, Ireland, Mexico or Nigeria, are not a true match yet; for those, use [Save the Date](/social-post-templates/save-the-date/) or [Big Quote](/social-post-templates/big-quote/) in your flag colours. Pair national days with [Holiday Hours](/social-post-templates/holiday-hours/) for closures and [Discount Badge](/social-post-templates/discount-badge/) for a national-day sale.`,
    },
    features: [
      'Three editable stripe colours for any horizontally striped flag',
      'Flag cut into slices that ripple from the pole in the animated export',
      'Soft fabric folds from alternating light and dark slices',
      'Built-in wheel emblem, hidden by matching it to the middle stripe',
      'Optional uploaded emblem for flags with a crest, sun or star',
      'Fireworks in the flag colours that burst and fade',
      'Silver pole with a gold finial; flag beside the text on wide sizes',
      'Headline, message, handle and optional logo',
    ],
    useCases: [
      { icon: '🇮🇳', title: 'Republic Day and Independence Day in India', desc: 'Post a 26 January or 15 August greeting from your brand, school or office, with the tricolour waving and a message about the year ahead.' },
      { icon: '🌏', title: 'Brands in many countries', desc: 'Save one design and change the stripes, emblem and wording for each market\'s national day, so every country gets its own greeting in the same style.' },
      { icon: '🛍', title: 'National-day sales', desc: 'Run a national-day offer with the discount in the message, then follow up with a Discount Badge post in the same flag colours.' },
      { icon: '🏛', title: 'Embassies, schools and community groups', desc: 'Invite people to a national-day reception, flag-raising or cultural event, with the date in the label and the venue in the message.' },
    ],
    faqs: [
      { q: 'How do I change the flag to my country?', a: 'Open the colours panel and set the three stripe colours from top to bottom. Set the emblem colour to the same colour as the middle stripe to hide the wheel, or upload your flag\'s emblem as an image.' },
      { q: 'Which countries does it work for?', a: 'Any flag made of three horizontal stripes, with or without a central emblem, such as India, Germany, the Netherlands, Russia, Hungary, Bulgaria, Austria, Lithuania, Estonia and many more.' },
      { q: 'Does the flag really move?', a: 'Yes, in the animated export. The flag is made of thin slices that rise and fall one after another, so a ripple runs from the pole to the tip, while fireworks burst in the background.' },
      { q: 'Can I use it for flags with vertical stripes?', a: 'Not yet. The stripes are horizontal, so France, Italy, Ireland, Mexico or Nigeria will not look right. Use a different template in your flag colours for those days.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the National Day HTML and CSS: give it your country\'s flag colours and emblem, add a vertical-stripe version, or write national-day greetings for every market you serve.',
      prompt: `Create a 1080×1350 national day social post with a waving flag, in plain HTML and CSS.

- A night-blue background (#0d1b3d) with a warm glow behind the flag and four firework bursts (repeating-conic-gradient rays masked into rings) in the flag colours.
- A silver flagpole with a gold ball finial, and a 3:2 flag attached to it, built from 18 thin vertical slices. Each slice is a three-band gradient: saffron #ff9933, white #ffffff, green #138808. Alternate slices are slightly darker or lighter to suggest folds.
- A navy wheel (circle border plus repeating-conic-gradient spokes) centred on the flag.
- Animate the slices with translateY using sin(time - slice position) so a smooth ripple travels from the pole to the tip; respect prefers-reduced-motion.
- Above the flag, a small uppercase label "Republic Day · 26 January"; below it a large serif headline "Happy Republic Day" with "Republic Day" in amber, a one-line message and the handle.
- Colours as CSS custom properties (--stripe1, --stripe2, --stripe3, --emblem) so the flag can be changed for any country.
- Size everything with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },

  'five-star-review': {
    keywords: ['5 star review post template', 'google review instagram post', 'customer review graphic', 'trustpilot review social post', 'review post template for small business'],
    about: {
      title: '5-Star Review — Free Google Review Post Template with Rating',
      description: `**5-Star Review** is a free social post template for turning a great review into a post that makes the next customer trust you. Most review graphics are a quote with a few small stars on top. This one leads with the rating, because that is what people read first on Google, Trustpilot, Amazon or Etsy, and then lets one real customer explain why.

**Five big stars, then the number**

On a bright golden background with a sunburst slowly turning behind it, five large stars sit in a row, the middle one slightly bigger. They are drawn shapes, not a font character, so they look identical on every device and in every export. In the animated export the stars pop in one after another, like a review being left, and then your average rating counts up from zero ("4.9"). Next to it, a line gives the proof ("from 1,284 Google reviews") and a dark chip names the platform.

**One review, in the customer's words**

Below sits a white speech bubble with a small tail pointing up at the score. The review is set large enough to read on a phone, and words wrapped in asterisks get a yellow highlighter mark ("*spotless*"). Underneath, the reviewer's name with a round verified tick, a detail line ("Verified customer · Leeds") and an optional photo. Without a photo the name sits on its own, so you never need to ask a customer for one.

**Made for small businesses**

Trades, salons, restaurants, clinics, shops and apps live on their reviews. Post one a week, and use the Story size with a "Leave us a review" link sticker to ask for more. Your handle and optional logo sit at the bottom; on 16:9 and LinkedIn the rating sits on the left and the bubble on the right.

Always ask the customer before sharing their name, and keep their words as written. For longer B2B quotes with a company logo, use [Customer Testimonial](/social-post-templates/testimonial/); for proof in numbers, [Big Stat](/social-post-templates/big-stat/); and to collect more reviews, send the [Review Request email](/email-templates/review-request/).`,
    },
    features: [
      'Five large drawn stars that pop in one after another',
      'Average rating that counts up from zero in the animated export',
      'Review count line and a platform chip, such as Google Reviews',
      'Speech bubble with a tail, sized to read on a phone',
      'Yellow highlighter on words wrapped in asterisks',
      'Reviewer name, verified tick, detail line and optional photo',
      'Slowly turning golden sunburst behind the stars',
      'Rating on the left and the review on the right on wide sizes',
    ],
    useCases: [
      { icon: '🔧', title: 'Trades and home services', desc: 'Share a plumber, electrician or cleaner review that mentions speed and price, with your Google rating and review count above it to win local trust.' },
      { icon: '💇', title: 'Salons, clinics and studios', desc: 'Post a client review every week, with their first name and town, and use the Story version with a link sticker asking others to leave a review.' },
      { icon: '🍽', title: 'Restaurants and cafés', desc: 'Turn a glowing TripAdvisor or Google review into a post, highlight the dish they loved and keep the platform chip so people know where it came from.' },
      { icon: '📱', title: 'Apps and online shops', desc: 'Show your App Store, Trustpilot or Amazon rating with one detailed customer review, and pin it to your profile as permanent social proof.' },
    ],
    faqs: [
      { q: 'How do I turn a Google review into an Instagram post?', a: 'Copy the review text into the Review field, add the reviewer\'s first name and town, set your average rating and review count, then download the 4:5 PNG for the feed or the 9:16 Story.' },
      { q: 'Do I need permission to share a customer review?', a: 'It is good practice to ask, especially before using a full name or photo. Many businesses use the first name and initial, keep the review word for word and never edit its meaning.' },
      { q: 'How is this different from the Customer Testimonial template?', a: 'Customer Testimonial is a clean quote card for B2B case-study quotes with a company logo. 5-Star Review leads with the stars and your overall rating, which suits Google, Trustpilot and local businesses.' },
      { q: 'Can I show a rating below five stars?', a: 'The five stars are decorative and always full, so use it for 4.5 and above. The rating number and review count are separate fields, so they always show your real figures.' },
    ],
    aiPrompt: {
      paragraph: 'Ask an AI assistant to adapt the 5-Star Review HTML and CSS: pick your five most convincing reviews and trim them to two lines, write captions that ask for reviews, or turn it into a weekly review series.',
      prompt: `Create a 1080×1350 five-star review social post in plain HTML and CSS.

- A golden yellow background (#ffcf3f) with a large white sunburst (repeating-conic-gradient rays, fading out with a radial mask) slowly rotating behind the top half.
- A small uppercase label "What our customers say".
- Five large stars drawn with clip-path polygons (not a font glyph), gold gradient fill with a dark hard drop-shadow, the middle star slightly larger. Animate them popping in one after another.
- A row with the rating "4.9" in huge Archivo Black (counting up from 0), and beside it "from 1,284 Google reviews" with a dark pill "Google Reviews".
- A white speech bubble with a small tail pointing up, a dark hard shadow and large rounded corners, containing the review in Plus Jakarta Sans with one word given a yellow highlighter underline, then the reviewer "Priya S." with a round dark verified tick and "Verified customer · Leeds".
- The handle at the bottom. Size everything with a CSS variable --u equal to 1% of the shorter side.`,
    },
  },
};

export const TEMPLATE_WHY_OCC = {
  'cyber-monday': [
    { icon: '⌨', title: 'Looks nothing like Friday', desc: 'A neon terminal over a synthwave grid stands apart from the black-and-red Black Friday posts filling the same feed that weekend.' },
    { icon: '🔢', title: 'The deal animates itself', desc: 'In the video export the command types out, the discount counts up and the grid rolls forward, so a single post works as a Reel.' },
    { icon: '☁️', title: 'Speaks to digital buyers', desc: 'The developer look suits SaaS, apps, courses and tech shops, the businesses that sell the most on Cyber Monday.' },
  ],
  'giving-tuesday': [
    { icon: '❤', title: 'Progress people can feel', desc: 'A heart filling up while the total counts up shows momentum, the strongest reason for someone to give today.' },
    { icon: '🍲', title: 'One gift made concrete', desc: 'A single impact line turns "donate" into a meal, a book or a vaccination, which is what moves people to act.' },
    { icon: '🔁', title: 'Built for repeat updates', desc: 'Change only the amount for morning, midday and final-hour posts, so the campaign looks consistent all day.' },
  ],
  'advent-calendar': [
    { icon: '🚪', title: 'A reason to come back daily', desc: 'A door a day turns December into a series followers check every morning, which lifts reach for every post that follows.' },
    { icon: '🗂', title: 'One design, 24 posts', desc: 'Only the day number and the deal change, so Bulk create can make the whole month from one spreadsheet.' },
    { icon: '✨', title: 'Feels like a real calendar', desc: 'A wall of numbered doors, a gold bow and a number that ticks up to today make each post feel like opening a door.' },
  ],
  hanukkah: [
    { icon: '🕎', title: 'Lit the way it is at home', desc: 'The shamash lights first and the eight flames follow, a detail people who celebrate will notice and appreciate.' },
    { icon: 'א', title: 'Hebrew and English together', desc: 'An editable right-to-left Hebrew line in a typeface made for Hebrew sits above the English headline.' },
    { icon: '🏷', title: 'Greeting or eight nights of offers', desc: 'Keep it a warm greeting, or add the chip for a deal a night across the festival.' },
  ],
  'holiday-hours': [
    { icon: '🕘', title: 'Answers the question before it is asked', desc: 'Clear dates and hours stop the "are you open on the 26th?" calls and messages every holiday season.' },
    { icon: '🪧', title: 'Feels like your shop door', desc: 'A hanging enamel sign with a "back on" stamp is friendlier and easier to read than a table on a plain background.' },
    { icon: '🌍', title: 'One notice for every holiday', desc: 'String lights and a sign suit Christmas, Eid, Diwali, Lunar New Year or a summer break without redesigning anything.' },
  ],
  'year-in-review': [
    { icon: '🎉', title: 'The format people already share', desc: 'Year-end wrapped recaps are familiar and fun, so a bold three-number summary gets reposted by customers and team members.' },
    { icon: '🔢', title: 'Numbers that move', desc: 'Tiles slide in and every number counts up in the video export, which makes a strong end-of-year Reel or Story.' },
    { icon: '🎨', title: 'Your colours, not a copy', desc: 'Lime, pink and orange tiles recolour to your brand, so it feels like your recap rather than an app\'s.' },
  ],
  'lunar-new-year': [
    { icon: '🏮', title: 'Festive without stock photos', desc: 'Lanterns, fireworks and a fortune charm are drawn in CSS, so the post is sharp at every size and recolours to your brand.' },
    { icon: '福', title: 'Details people recognise', desc: 'A 福 charm, red envelopes and a lucky eight show you understand the festival, not just its colours.' },
    { icon: '🌏', title: 'One design, every community', desc: 'Swap the greeting for Chinese New Year, Tết or Seollal and the same post works across your markets.' },
  ],
  'ramadan-eid': [
    { icon: '🌙', title: 'Respectful and beautiful', desc: 'A crescent, fanous lanterns and a pointed arch in calm teal and gold set the tone without clichés or stock photos.' },
    { icon: 'ع', title: 'Arabic set properly', desc: 'The greeting is set right to left in Amiri, a typeface made for Arabic, beside an English headline.' },
    { icon: '🔁', title: 'Ramadan, then Eid', desc: 'Change the greeting and headline and the same design carries you from the first night of Ramadan to Eid.' },
  ],
  'national-day': [
    { icon: '🏳', title: 'One flag, many countries', desc: 'Three stripe colours and an optional emblem cover dozens of national flags, so you never redesign for each market.' },
    { icon: '🌬', title: 'A flag that waves', desc: 'A ripple runs from the pole to the tip in the video export, with fireworks in the flag colours behind it.' },
    { icon: '📅', title: 'Ready for every national day', desc: 'Save it once and change the stripes, label and message for each independence or republic day in your calendar.' },
  ],
  'five-star-review': [
    { icon: '⭐', title: 'Leads with what people trust', desc: 'Five big stars and your average rating come first, the way people scan reviews on Google and Trustpilot.' },
    { icon: '💬', title: 'Real words, easy to read', desc: 'One review in a large speech bubble with the customer\'s name and a verified tick feels genuine, not like ad copy.' },
    { icon: '🔁', title: 'A weekly post that builds trust', desc: 'Swap in a new review each week and the same bright design becomes a recognisable series on your grid.' },
  ],
};
