import { z } from 'zod';

/**
 * Shared contact-form schema — the single source of truth used by both
 * apps/web (React Hook Form resolver) and apps/api (request validation).
 * See docs/requirements/functional-requirements.md FR-001.
 */
export const contactFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(200),
  email: z.string().trim().email('Invalid email address').max(320),
  company: z.string().trim().max(200).optional(),
  phone: z.string().trim().max(50).optional(),
  message: z.string().trim().min(1, 'Message is required').max(5000),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
