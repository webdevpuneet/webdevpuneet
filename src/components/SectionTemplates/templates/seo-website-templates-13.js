/* Hand-written SEO content for the website templates (part 13: Plumber & Heating Engineer). See seo-website-templates-1.js. */

export const WEBSITE_TEMPLATE_SEO_13 = {
  plumber: {
    about: `When a pipe bursts or the boiler fails, people search on their phone, pick a plumber who looks trustworthy and call the first number they can see. This template is built for that moment. The home page opens with a photo hero and a "Book a visit" button, a 24/7 emergency call strip with a tap-to-call number, a services and prices list, an instant price estimator, a postcode checker, reasons to choose you, a bathroom story, your numbers, the team, reviews, an online booking request and live opening hours with a map.

Three sections do the heavy lifting. The Services and Prices list shows each job with a time and a starting price, filtered by emergency, boilers and heating, bathrooms and repairs. The Price Estimator lets a homeowner choose a job and the size of their home and see an estimate at once, with a note that the final price is confirmed at a free survey. The Service Area Checker is new with this template: the visitor types a postcode and sees immediately whether you cover it and how soon you can usually arrive, with a Book button when they are covered.

The multi-page version adds a Services page with the list, the estimator, the area checker and a question list about prices, Gas Safe and guarantees, an About page with the team, the story of the firm and a gallery of recent work, and a Book page with the booking request, opening hours, map and emergency number. The hours show a live "Open now" badge and are written as local business data, which helps local search.

The booking form sends a request to a form service you choose, so the office receives it by email and confirms by phone or text. That sets honest limits: it is a request, not a live diary, so there is no real-time availability, no payments and no job tracking. The postcode checker and estimator run in the browser from the numbers you type, so keep them up to date. For online scheduling, link the Book buttons to your job software and keep this design as the website.

Every exported page has one main heading, descriptive image text, clean internal links and local business data, all as plain HTML, CSS and a little JavaScript that you can edit or host anywhere.`,
    checklist: [
      'A visible emergency number on every page, with tap-to-call on phones',
      'Proof of trust near the top: Gas Safe registration, reviews, a guarantee and how long you have traded',
      'Clear prices and times for the jobs people ask about most, so they do not have to phone to find out',
      'A fast way to see whether you cover the visitor’s area and how soon you can arrive',
      'Photos of your real team and real work, with names and roles',
      'Opening hours, address and a map one tap away, plus a simple way to book',
    ],
    faqs: [
      { q: 'How does the postcode checker work?', a: 'The visitor types their postcode, and the checker compares its first part with the codes you list, for example M20. It then shows whether you cover the area, the area name and your usual arrival time. It runs in the browser and stores nothing.' },
      { q: 'Can I use it for electricians, locksmiths or cleaners?', a: 'Yes. Replace the services, prices, areas and photos, and rename the home-size choices in the estimator. The booking form, area checker and opening hours suit any trades or mobile business.' },
      { q: 'Can customers book online?', a: 'They can send a booking request with the job, a day and a time, which goes to a form service you choose. It is not a live diary, so you confirm by phone or text. Link the Book buttons to your job software if you need live booking.' },
      { q: 'Does it work as a multi-page site?', a: 'Yes. The multi-page version has Home, Services, About and Book pages sharing one navigation and footer, with links between them already set up.' },
      { q: 'Are the company details and prices real?', a: 'No. BlueFlow, the address, phone numbers, team and prices are examples. Replace them with your own, and only publish prices and arrival times that you can keep.' },
    ],
  },
};
