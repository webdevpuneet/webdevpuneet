/* Extra landing-page content for the social post category pages, merged into CATEGORY_SEO by
   seo-categories.js: one more paragraph for the intro and three more FAQs per category. */

export const CATEGORY_MORE = {
  quotes: {
    intro: `Series perform better than single posts, so decide on a format and repeat it. Keep the colours, fonts and layout the same, change only the quote, tip or fact, and put your handle in the footer so every share credits you. Write for the scroll: one short idea per post, a number or a bold claim in the first words and a source line where it is a statistic. Export the same design as a portrait post for the feed, a square for LinkedIn and X, and a Story, so one idea becomes three posts.`,
    faqs: [
      { q: 'How long should the text on a quote or tip post be?', a: 'Aim for one or two short sentences, roughly under 140 characters for a quote. The templates shrink long text to fit, but short posts are easier to read on a phone and more likely to be saved or shared.' },
      { q: 'Which size should I use for a quote post?', a: 'The 4:5 portrait size (1080×1350) fills the most of the Instagram feed, while the square (1080×1080) works well on LinkedIn and Facebook. Switch sizes in the editor and the layout adapts without a rebuild.' },
      { q: 'Can I make a whole month of tip posts quickly?', a: 'Yes. Use Bulk create: paste a CSV with one tip per row and the editor fills the template for each, then downloads all of them as a ZIP of images ready to schedule.' },
    ],
  },
  announcements: {
    intro: `An announcement post should answer three questions in a glance: what is happening, why it matters and what to do next. Lead with the news in a big headline, add a date or a number if there is one, and finish with a single action such as "Read more" or "Apply today". Post it where the people who care are, and repeat it as a Story and a carousel cover so followers who miss the first post see it again. Add your logo and brand colours so the post is recognisable in the feed.`,
    faqs: [
      { q: 'How often can I post the same announcement?', a: 'Post the main announcement once, then add follow-ups with a new angle, such as a behind-the-scenes Story, a countdown, a customer reaction or a thank-you after launch. The same news with a fresh visual does not feel repetitive.' },
      { q: 'Can I use these templates for hiring posts?', a: 'Yes. The hiring template has fields for the role, up to three detail chips (such as location, type and salary), an apply link and an optional logo, and exports in the LinkedIn size (1200×627) as well as the Instagram sizes. Link to the full job description in the caption, because text inside an image cannot be clicked.' },
      { q: 'Which template suits a meet-the-team post?', a: 'Use Meet the Team to introduce a new colleague or the people behind the business: a heading, a short introduction and a photo, name and role for up to three people, plus your handle. Post a short series, one person at a time, to build familiarity with your brand.' },
    ],
  },
  promo: {
    intro: `Promotion posts work when the offer is obvious in under a second: the discount or deal in the largest type, a clear deadline and one short line on what it covers. Use contrasting brand colours for the badge so it stands out in the feed, and add an end date to create urgency without shouting. Put the offer code or link in the caption, not only in the image, and make a Story version for the last day of the sale. Run a series of two or three posts so people who miss the first still catch the offer.`,
    faqs: [
      { q: 'Should the discount code be inside the image?', a: 'Put the headline offer in the image and the code and link in the caption, where it can be copied. If you want the code visible in the artwork, also repeat it in the caption so people can paste it at checkout.' },
      { q: 'How can I create posts for several products or offers at once?', a: 'Use Bulk create with a CSV: one row per product or offer with the headline, price and image. The editor fills the template for each row and downloads all the posts as a ZIP.' },
      { q: 'Are the giveaway and sale templates free for commercial use?', a: 'Yes, with no watermark or sign-up. Check the platform\'s rules before running a giveaway, because Instagram, Facebook and other networks have their own promotion guidelines.' },
    ],
  },
  events: {
    intro: `Event posts do two jobs: they announce, and they remind. Start a few weeks out with the date, time and place, add a post a week before with the speakers or agenda, and send a last-day reminder as a Story with the link. After the event, post a recap with highlights and thank people, which keeps your audience engaged and gives the next event a head start. Put the registration link in the caption and your bio, since text inside an image cannot be clicked.`,
    faqs: [
      { q: 'What should an event post include?', a: 'The name of the event, the date and time with the time zone, where it takes place or the online link, and one reason to attend. Keep the rest, such as the full agenda, for the registration page.' },
      { q: 'Can I show a countdown on a social post?', a: 'The countdown template shows a number of days that you set, such as "3 days to go". It is a static image, so make a new version each day or post it in key moments such as one week, three days and the day before.' },
      { q: 'How do I post a recap after the event?', a: 'Use the Event Recap template with up to three photos, three headline numbers such as attendees or sessions, a thank-you line and your handle, and put the full highlights in the caption or a carousel. Post it within a day or two while people are still talking about the event.' },
    ],
  },
  'social-proof': {
    intro: `Proof posts turn customers into your best marketing, but they only work when they are believable. Use real names, roles or businesses and photographs where you have permission, quote the customer's own words and add a number or a result where one exists. Before-and-after posts need the same framing and lighting on both sides so the difference is the point. Rotate proof posts with other content, and link to the full case study in the caption to give interested people a place to go next.`,
    faqs: [
      { q: 'How do I get permission to post customer reviews?', a: 'Ask before you post, in writing, and say where the review will appear. Many businesses add a line to the review request, and a short message such as "Can we feature this on our social channels?" is enough for most customers.' },
      { q: 'What makes a good before and after post?', a: 'Use identical framing, lighting and angle for both photos, label them clearly and add a short caption that explains what changed and how long it took. Avoid claims you cannot support and follow the rules of your industry.' },
      { q: 'Can I use a testimonial post in a carousel or Story?', a: 'Yes. Export the testimonial in the Story size (1080×1920) or use it as one slide in a carousel together with other reviews. Switching sizes in the editor adapts the layout automatically.' },
    ],
  },
  carousel: {
    intro: `A carousel earns attention by keeping people swiping, so the first slide has to promise something and the last has to ask for something. Use the cover slide for a clear title, the step slides for one idea each, and the closing save slide to remind people to bookmark and follow. Keep each slide short, use the same layout throughout and number the steps. On LinkedIn, export the slides as a single PDF, which posts as a swipeable document; on Instagram, download the images.`,
    faqs: [
      { q: 'How many slides should a carousel have?', a: 'Between five and ten slides works for most topics: a cover, a handful of content slides and a closing call to action. Each slide should make one point, so people want to swipe to the next.' },
      { q: 'How do I export a carousel as a PDF for LinkedIn?', a: 'In the Export menu choose the carousel PDF option, which puts every slide on its own page in one file. Upload it to LinkedIn as a document and it appears as a swipeable post.' },
      { q: 'Can I keep the same look across all my slides?', a: 'Yes. The cover, step and save templates share the same theme options, so pick a palette and fonts once, save your brand kit and reuse it. Save each slide to My designs to come back later.' },
    ],
  },
  stories: {
    intro: `Stories are full-screen and fast, so keep them simple: one idea, large text and a clear next step. The templates use the 1080×1920 size and leave the top and bottom free so your words are not hidden behind the profile bar and the reply field. Add your own interactive sticker, such as a poll or link, on top of the design in Instagram, because stickers are added in the app and are not part of the exported image. Post a few Stories in a row rather than one, and keep the look consistent so people recognise you.`,
    faqs: [
      { q: 'How do I make a this-or-that Story?', a: 'The Story Poll template has a question, two options and a divider. Export it at Story size (1080×1920), upload it, and add the Instagram poll sticker on top if you want votes to be counted, since stickers are added in the app and not in the image.' },
      { q: 'Do these work for Reels covers too?', a: 'Yes. The Story size (1080×1920) is the same shape as a Reel cover. Use a template for a clean title card and upload it as your cover image.' },
      { q: 'How can I animate a Story?', a: 'Choose Animated video in the Export menu to record the post as an MP4 where the text and photos animate in and then hold. Pick the effect and speed first and upload the video as a Story or Reel.' },
    ],
  },
  holidays: {
    intro: `Seasonal posts are best planned before the rush. Make a calendar for the main dates that matter to your audience, prepare the designs a few weeks ahead and save them to My designs so a few edits update them each year. Keep the message warm and simple, add your logo, and use the festive colour palettes the templates include. If you sell, pair a greeting post with a clear offer a few days earlier, and make a Story version for the day itself.`,
    faqs: [
      { q: 'Can I use the same holiday template every year?', a: 'Yes. Save your design to My designs and change the year, the offer and the wording each season. Because the templates are HTML, it is easy to change dates and colours without starting again.' },
      { q: 'Are the holiday templates only for Christmas and Halloween?', a: 'No. They cover Halloween, Thanksgiving, Christmas and New Year, but you can change the colours, text and images to suit other occasions such as Diwali, Eid, Valentine\'s Day or a local festival.' },
      { q: 'What is a good holiday post for a business without a sale?', a: 'A thank-you or greeting post that credits your customers or team, with a short, personal line, works well. It builds goodwill without asking for anything and is easy to make into a Story as well.' },
    ],
  },
};
