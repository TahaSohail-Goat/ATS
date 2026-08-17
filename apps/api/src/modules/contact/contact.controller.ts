import type { Request, Response } from 'express';
import { sendSuccess } from '../../shared/validation/respond.js';
import { contactService } from './contact.service.js';
import { createContactSubmissionSchema } from './contact.schema.js';

export async function submitContactForm(req: Request, res: Response) {
  const input = createContactSubmissionSchema.parse(req.body);
  const submission = await contactService.submit(input);
  sendSuccess(res, { id: submission.id }, 201);
}
