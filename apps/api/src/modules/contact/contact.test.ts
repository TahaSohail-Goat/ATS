import { describe, expect, it } from 'vitest';
import { createContactSubmissionSchema } from './contact.schema.js';

describe('createContactSubmissionSchema', () => {
  it('accepts a valid submission', () => {
    const result = createContactSubmissionSchema.safeParse({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: 'Interested in your services.',
    });
    expect(result.success).toBe(true);
  });

  it('rejects an invalid email', () => {
    const result = createContactSubmissionSchema.safeParse({
      name: 'Ada Lovelace',
      email: 'not-an-email',
      message: 'Interested in your services.',
    });
    expect(result.success).toBe(false);
  });

  it('rejects an empty message', () => {
    const result = createContactSubmissionSchema.safeParse({
      name: 'Ada Lovelace',
      email: 'ada@example.com',
      message: '',
    });
    expect(result.success).toBe(false);
  });
});
