/**
 * Approved client testimonials. Empty until AST has written permission to
 * publish a real quote, the Testimonials section shows a "coming soon"
 * state until this array has entries.
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'We used to rely on big paper registers, and tracking every bag of crop coming in and out took hours. Now, I just enter the numbers on the screen. When a deal happens, it records the buying and selling instantly and updates the whole ledger. The biggest relief is that it automatically calculates and separates our commission for every single entry, so I don’t have to sit with a calculator for hours. It does exactly what our business needs.',
    name: 'M. Sadiq',
    role: 'Owner, Pakistan Traders · Old Gala Mandi, Yazman',
  },
];
