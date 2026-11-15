/* Hand-written SEO content for the website templates (part 12: Auto Repair Garage). See seo-website-templates-1.js. */

export const WEBSITE_TEMPLATE_SEO_12 = {
  garage: {
    about: `People look for a garage when something has gone wrong or an MOT is due, and they want three things: a price, trust and a quick booking. This template is built around those. The home page opens with a photo hero and a "Book a service" button, a breakdown call strip with a tap-to-call number, a services and prices list, an instant price estimator, reasons to choose you, a look at the workshop, your numbers, the team, reviews, an online booking request and live opening hours with a map.

Two sections make it different. The Services and Prices list shows each job with a duration and a starting price, with filter chips for MOT, servicing, brakes and tyres, and repairs. The Price Estimator lets a driver choose a job and the size of their vehicle and see the estimated price and time at once, with a note that the final price is confirmed after inspection and a Book button. Both run in the browser with no server.

The multi-page version adds a Services page with the list, the estimator and a question list about MOT failures, warranties and courtesy cars, an About page with the team, the story of the garage and a gallery of the workshop, and a Book page with the booking request, opening hours, map and the breakdown number. The hours show a live "Open now" badge and are written as AutoRepair data, which helps local search.

The booking form sends a request to a form service you choose, so the garage receives it by email and confirms by phone or text. That sets honest limits: it is a request, not a live diary, so there is no real-time availability, no reminders and no payments, and the estimator gives estimates, not quotes. For online scheduling, link the Book buttons to your garage software and keep this design as the website.

Every exported page has one main heading, descriptive image text, clean internal links and local business data, all as plain HTML, CSS and a little JavaScript that you can edit or host anywhere.`,
    checklist: [
      'A visible phone number and a breakdown line on every page, with tap-to-call on phones',
      'Prices and times for the jobs people ask about most, so they do not have to phone to find out',
      'An instant estimate for common jobs, with an honest note that the final price is confirmed after inspection',
      'Real photos of the workshop and the team, with names and roles',
      'Proof of trust: reviews, a warranty promise and how many cars you have looked after',
      'Opening hours, address and a map one tap away, plus a simple way to book',
    ],
    faqs: [
      { q: 'How does the Price Estimator work?', a: 'Each service has three prices, for small, medium and large vehicles, and each vehicle choice is set to one of them. Visitors pick a service and a vehicle and see the price and time at once. It is an estimate, not a quote.' },
      { q: 'Can customers book online?', a: 'They can send a booking request with the job, a day and a drop-off time, which goes to a form service you choose. It is not a live diary, so you confirm by phone or text. Link the Book buttons to your garage software if you need live booking.' },
      { q: 'Can I use it for tyres, bodywork or car valeting?', a: 'Yes. Replace the services, prices and photos, rename the vehicle choices if you like, and keep the estimator, booking form and opening hours. It suits any vehicle-related business.' },
      { q: 'Does it work as a multi-page site?', a: 'Yes. The multi-page version has Home, Services, About and Book pages sharing one navigation and footer, with links between them already set up.' },
      { q: 'Are the garage details and prices real?', a: 'No. Redline Garage, the address, phone numbers, team and prices are examples. Replace them with your own, and only publish prices that you really charge.' },
    ],
  },
};
