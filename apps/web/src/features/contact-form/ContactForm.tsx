'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, type ContactFormInput } from '@ats/validation';
import { apiPost, ApiError } from '../../lib/api-client';

/**
 * Client Component: needs form state and submission handling.
 * Validation schema is shared with the backend via @ats/validation —
 * see docs/requirements/functional-requirements.md FR-001.
 */
export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormInput>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(data: ContactFormInput) {
    setStatus('submitting');
    setErrorMessage(null);
    try {
      await apiPost('/contact', data);
      setStatus('success');
      reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof ApiError ? err.message : 'Something went wrong. Please try again.',
      );
    }
  }

  if (status === 'success') {
    return (
      <p role="status" className="text-ats-success">
        Thanks for reaching out — we will get back to you shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full rounded-md border border-ats-text-muted/30 px-3 py-2"
          {...register('name')}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-ats-error">
            {errors.name.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full rounded-md border border-ats-text-muted/30 px-3 py-2"
          {...register('email')}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-ats-error">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          rows={5}
          className="w-full rounded-md border border-ats-text-muted/30 px-3 py-2"
          {...register('message')}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-ats-error">
            {errors.message.message}
          </p>
        )}
      </div>

      {status === 'error' && errorMessage && (
        <p role="alert" className="text-ats-error">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-fit rounded-md bg-ats-brand px-4 py-2 font-medium text-white disabled:opacity-60"
      >
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  );
}
