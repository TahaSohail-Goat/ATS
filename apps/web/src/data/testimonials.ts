/**
 * Placeholder testimonials — replace with real client quotes (TBD, see
 * docs/website-design-brief.md). Shape is the contract for the Home
 * testimonials section.
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'ATS shipped in months what our previous agency estimated would take a year. The engineering quality was visible from the first sprint.',
    name: 'Placeholder name — TBD',
    role: 'COO, placeholder company',
  },
  {
    quote:
      'They challenged our requirements where it mattered and saved us from building the wrong thing. Rare in an agency.',
    name: 'Placeholder name — TBD',
    role: 'Founder, placeholder startup',
  },
  {
    quote:
      'Clear communication, predictable delivery, and a product our customers actually praise. We have already started the next project.',
    name: 'Placeholder name — TBD',
    role: 'Product Lead, placeholder client',
  },
];
