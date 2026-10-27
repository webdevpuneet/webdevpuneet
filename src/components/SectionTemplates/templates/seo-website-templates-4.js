/* Hand-written SEO content for the website templates (part 4: Music). See seo-website-templates-1.js. */

export const WEBSITE_TEMPLATE_SEO_4 = {
  music: {
    about: `A band website has one job: get people to press play, buy a ticket and join your list. This template is built around those three actions. The page opens with a full-screen stage photo, the band name in huge type, a pill for the new release and buttons for the music and the tour. Under it a spotlight section counts down to the album, then an audio player lets visitors hear previews of the new songs without leaving the page.

Tour dates come next, as a calendar-style list with colour-coded status (Tickets, Few left, Sold out, Free) and ticket buttons, with Event structured data so search engines can show your concerts. The discography grid shows every release as cover art with a vinyl that slides out and filter chips for Album, EP, Single and Live. A live video, a filterable photo gallery, press quotes, a merch grid, a booking and press form and a newsletter finish the page, so a fan can discover, listen, buy and get in touch without hunting.

The multi-page version adds Music, Tour, Videos, Merch, About and Contact pages. The Music page opens with a 3D coverflow carousel of the album covers that visitors can scroll or drag, then the full discography and streaming links, and the Tour page adds gig questions (doors, age limits, refunds) that fans really ask. Every page has its own title and description, so each can rank for its own search, and every exported page has a single main heading, descriptive image text, clean internal links and structured data for the shows, so search engines and AI assistants can read what the page is about.

Everything is plain, editable HTML and CSS with a little JavaScript for the player, the filters and the countdown. The demo audio is a short generated loop: replace the audio links with your own MP3 or WAV previews, and swap the images, dates and links, then export HTML, a ZIP, React, Vue or a Next.js site.`,
    checklist: [
      'A play button or listen link above the fold, and your newest release first',
      'Audio previews of 30 to 60 seconds, with a stream or buy link on every track',
      'Tour dates in date order with a ticket link and a clear sold-out state',
      'Event structured data on your shows, so search engines can list your concerts',
      'A newsletter and a booking form, so you own your audience and your enquiries',
    ],
    faqs: [
      { q: 'How do I add my own songs to the audio player?', a: 'Open the Audio Player section and paste a direct link to an MP3 or WAV file in each track. Short previews of 30 to 60 seconds at 128 to 192 kbps load fastest. A track without a file stays in the list with its stream link.' },
      { q: 'Can the album countdown change on release day without me editing the page?', a: 'Yes. Set the release date and time in the New Release Spotlight section. When it passes, the countdown hides, an Out now message appears and the primary button changes to Listen now, in each visitor’s browser.' },
      { q: 'Will my concerts show up in Google?', a: 'The Tour Dates section writes Event structured data for every show that has a date, which helps search engines understand your concerts. Rich results are not guaranteed, but the data is correct and complete.' },
      { q: 'Can I use this for a DJ, a producer or a label?', a: 'Yes. Change the names, photos and links: a DJ can use the tour dates as a booking calendar and a label can use the discography grid as a roster, with the type field holding the artist name for the filter chips.' },
      { q: 'Is the music demo audio free to use?', a: 'The sample audio loops are generated for the demo and are free to use while you test. Replace them with your own music before you publish, because they are placeholders, not songs.' },
    ],
  },
};
