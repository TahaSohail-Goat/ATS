/**
 * Explicit placeholders for approved client testimonials. Keep placeholder
 * values identifiable until ATS has written permission to publish a quote.
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  isPlaceholder: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote: 'An approved client quote about the delivery experience will appear here.',
    name: 'Client testimonial pending',
    role: 'Placeholder — approval required',
    isPlaceholder: true,
  },
  {
    quote: 'An approved client quote about collaboration and technical guidance will appear here.',
    name: 'Client testimonial pending',
    role: 'Placeholder — approval required',
    isPlaceholder: true,
  },
  {
    quote: 'An approved client quote about the outcome of a project will appear here.',
    name: 'Client testimonial pending',
    role: 'Placeholder — approval required',
    isPlaceholder: true,
  },
];
