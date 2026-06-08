export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

/** Add testimonials here — section renders only when non-empty. */
export const testimonials: Testimonial[] = [];
