'use client';

import { useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Loader2 } from 'lucide-react';
import { contactFormSchema, type ContactFormInput } from '@ats/validation';
import { Button, Input, Textarea } from '@ats/ui';
import { apiPost, ApiError } from '../../lib/api-client';
import { transitionReveal } from '../../lib/motion';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Client Component: needs form state and submission handling.
 * Validation schema is shared with the backend via @ats/validation —
 * see docs/requirements/functional-requirements.md FR-001.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

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
      <motion.div
        role="status"
        initial={reduceMotion ? undefined : { opacity: 0, y: 12 }}
        animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        transition={transitionReveal}
        className="ats-ring-gradient relative flex flex-col items-center rounded-4xl border border-ats-line bg-ats-surface/70 px-8 py-16 text-center"
      >
        <span
          aria-hidden
          className="flex h-14 w-14 items-center justify-center rounded-full border border-ats-success/30 bg-ats-success/10 text-ats-success"
        >
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <p className="mt-6 text-xl font-semibold tracking-tighter2">Message sent</p>
        <p className="mt-2 max-w-sm leading-relaxed text-ats-ink-muted">
          Thanks for reaching out — we will get back to you shortly.
        </p>
        <Button variant="outline" size="sm" className="mt-8" onClick={() => setStatus('idle')}>
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="ats-ring-gradient relative rounded-4xl border border-ats-line bg-ats-surface/70 p-7 sm:p-9"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name?.message} required>
          <Input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Ada Lovelace"
            invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name')}
          />
        </Field>

        <Field id="email" label="Email" error={errors.email?.message} required>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
        </Field>

        <Field id="company" label="Company" error={errors.company?.message} hint="Optional">
          <Input
            id="company"
            type="text"
            autoComplete="organization"
            placeholder="Acme Inc."
            invalid={!!errors.company}
            aria-describedby={errors.company ? 'company-error' : undefined}
            {...register('company')}
          />
        </Field>

        <Field id="phone" label="Phone" error={errors.phone?.message} hint="Optional">
          <Input
            id="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 555 0100"
            invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            {...register('phone')}
          />
        </Field>

        <Field
          id="message"
          label="Message"
          error={errors.message?.message}
          required
          className="sm:col-span-2"
        >
          <Textarea
            id="message"
            rows={6}
            placeholder="What are you building, and what stage is it at?"
            invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            {...register('message')}
          />
        </Field>
      </div>

      <AnimatePresence>
        {status === 'error' && errorMessage && (
          <motion.p
            role="alert"
            initial={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1, height: 'auto' }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            className="mt-6 overflow-hidden rounded-xl border border-ats-error/30 bg-ats-error/10 px-4 py-3 text-sm text-ats-error"
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="mt-8 flex flex-col gap-4 border-t border-ats-line pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-ats-ink-muted">
          We use your details only to reply to this enquiry.
        </p>
        <Button type="submit" size="lg" disabled={status === 'submitting'}>
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5"
                aria-hidden
              />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

/** Label + control + error message, wired together by id. */
function Field({ id, label, error, hint, required, className = '', children }: FieldProps) {
  return (
    <div className={className}>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium">
          {label}
          {required && (
            <span aria-hidden className="ml-1 text-ats-accent">
              *
            </span>
          )}
        </label>
        {hint && !error && <span className="text-xs text-ats-ink-muted">{hint}</span>}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-ats-error">
          {error}
        </p>
      )}
    </div>
  );
}
