import { prisma } from '../../config/prisma.js';
import type { CreateContactSubmissionInput } from './contact.schema.js';

/**
 * Only this file talks to Prisma for the contact domain.
 * No business logic here — persistence only.
 */
export const contactRepository = {
  create(input: CreateContactSubmissionInput) {
    return prisma.contactSubmission.create({ data: input });
  },
};
