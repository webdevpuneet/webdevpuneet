/* Hand-written SEO content for the website templates (part 12: Auto Repair Garage). See seo-website-templates-1.js. */

export const WEBSITE_TEMPLATE_SEO_12 = {
  garage: {
    about: `People look for a garage when something has gone wrong or an MOT is due, and they want three things: a price, trust and a quick booking. This template is built around those. Drivers land on a smiling mechanic and a "Book a service" button, with the breakdown number just below. Prices for MOTs, servicing, brakes and repairs follow, then the estimator, three reasons to trust the garage, the workshop and its numbers, the team, reviews, a booking request and the garage hours with a map.

Two sections make it different. The Services and Prices list shows each job with a duration and a starting price, with filter chips for MOT, servicing, brakes and tyres, and repairs. The Price Estimator lets a driver choose a job and the size of their vehicle and see the estimated price and time at once, with a note that the final price is confirmed after inspection and a Book button. Both run in the browser with no server.

Spread over four pages, the site lets each question land in the right place: Services combines the price list, the estimator and answers about MOT failures, warranties and courtesy cars; About introduces the team and the workshop gallery; and Book puts the booking request beside opening hours, a map and the breakdown number. The hours carry a live "Open now" badge and AutoRepair data.

A booking request is emailed to the garage through the form service you choose, and the front desk calls or texts to fix a time. There is no live diary behind it, no reminders and no deposits, and the estimator shows starting prices rather than quotes. Garages that run their diary in workshop software can link the Book buttons there instead.

Prices sit in the page as text, the garage is described as an AutoRepair business with its hours, and every page keeps one main heading and described photos, which helps local searches such as "MOT near me" find a clear answer.`,
    checklist: [
      'A visible phone number and a breakdown line on every page, with tap-to-call on phones',
      'Prices and times for the jobs people ask about most, so they do not have to phone to find out',
      'An instant estimate for common jobs, with an honest note that the final price is confirmed after inspection',
      'Real photos of the workshop and the team, with names and roles',
      'Proof of trust: reviews, a warranty promise and how many cars you have looked after',
      'Garage hours, the drop-off address and a map one tap away, plus a quick way to request a slot',
    ],
    faqs: [
      { q: 'How does the Price Estimator work?', a: 'Each service has three prices, for small, medium and large vehicles, and each vehicle choice is set to one of them. Visitors pick a service and a vehicle and see the price and time at once. It is an estimate, not a quote.' },
      { q: 'Can drivers book an MOT online?', a: 'They can request one: the form collects the job, the preferred day and a drop-off time and emails it to you through a form service. You then confirm by phone or text. Link the Book buttons to your workshop software if you want live slots.' },
      { q: 'Can I use it for tyres, bodywork or car valeting?', a: 'Yes. Replace the services, prices and photos, rename the vehicle choices if you like, and keep the estimator, booking form and opening hours. It suits any vehicle-related business.' },
      { q: 'What goes on each page of the multi-page garage site?', a: 'Home sells the garage, Services holds the prices and the estimator, About introduces the team, and Book has the request form, hours and map. All four share the navigation and footer.' },
      { q: 'Are Redline\'s prices real?', a: 'No. Redline Garage, its Leeds address, phone numbers, team and prices are invented. The MOT fee shown is the UK maximum for a car at the time of writing; set every figure to what your garage charges.' },
    ],
  },
};
