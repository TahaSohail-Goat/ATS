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

export const testimonials: Testimonial[] = [];
