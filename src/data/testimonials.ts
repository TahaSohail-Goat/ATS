/**
 * Keep real client feedback distinct from illustrative copy. Any example
 * testimonial must be visibly identified as fictional in the UI.
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  isExample?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'We used to rely on big paper registers, and tracking every bag of crop coming in and out took hours. Now, I just enter the numbers on the screen. When a deal happens, it records the buying and selling instantly and updates the whole ledger. The biggest relief is that it automatically calculates and separates our commission for every single entry, so I don’t have to sit with a calculator for hours. It does exactly what our business needs.',
    name: 'M. Sadiq',
    role: 'Owner, Pakistan Traders · Old Gala Mandi, Yazman',
  },
  {
    quote:
      'We needed a clearer way to manage requests across the team. The proposed workflow made the handoffs easier to understand, and the team could review progress in one place.',
    name: 'Illustrative client',
    role: 'Sample feedback · internal operations project',
    isExample: true,
  },
  {
    quote:
      'The first version gave us something concrete to react to. We were able to refine the important details together before investing in the next stage.',
    name: 'Illustrative client',
    role: 'Sample feedback · product design and development',
    isExample: true,
  },
  {
    quote:
      'We wanted to explore where AI could help without making the product harder to use. The focused prototype helped us evaluate the idea with our actual workflow in mind.',
    name: 'Illustrative client',
    role: 'Sample feedback · AI workflow prototype',
    isExample: true,
  },
];
