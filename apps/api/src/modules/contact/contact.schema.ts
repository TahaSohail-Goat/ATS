import { contactFormSchema, type ContactFormInput } from '@ats/validation';

/**
 * Re-exported from packages/validation — the single source of truth for
 * the contact form shape, shared with apps/web. Do not redefine this
 * schema locally; extend packages/validation instead if the API needs
 * server-only fields.
 */
export const createContactSubmissionSchema = contactFormSchema;

export type CreateContactSubmissionInput = ContactFormInput;
