import { contactRepository } from './contact.repository.js';
import type { CreateContactSubmissionInput } from './contact.schema.js';

export const contactService = {
  async submit(input: CreateContactSubmissionInput) {
    // Business logic placeholder for future steps (e.g. notify sales via
    // email) — intentionally minimal until that requirement is confirmed
    // (see docs/product/roadmap.md).
    return contactRepository.create(input);
  },
};
