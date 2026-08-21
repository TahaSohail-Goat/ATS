import type { ReactNode } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { Button, Input, Textarea } from '@ats/ui';

interface ContactFormProps {
  /**
   * Hosted form endpoint, e.g. a Formspree/Basin/FormSubmit endpoint.
   * No ATS API or database is required; the provider owns delivery/storage.
   */
  endpoint?: string;
}

/**
 * Static-hosting-friendly contact form. It intentionally uses native HTML
 * submission instead of React Hook Form/API calls: browsers validate required
 * fields and the configured hosted provider handles delivery.
 *
 * The endpoint is optional during local development. When absent, the form
 * renders normally but explains the one deployment variable that must be set
 * before submissions are enabled — it never sends visitor data to an unknown
 * URL or pretends a message was delivered.
 */
export function ContactForm({ endpoint }: ContactFormProps) {
  const hasEndpoint = Boolean(endpoint);

  return (
    <form
      action={endpoint}
      method={hasEndpoint ? 'POST' : undefined}
      noValidate={!hasEndpoint}
      className="ats-ring-gradient relative rounded-4xl border border-ats-line bg-ats-surface/70 p-7 sm:p-9"
    >
      <input type="hidden" name="_subject" value="New ATS website enquiry" />
      <input type="hidden" name="_gotcha" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" required>
          <Input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Ada Lovelace"
            required={hasEndpoint}
          />
        </Field>

        <Field id="email" label="Email" required>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required={hasEndpoint}
          />
        </Field>

        <Field id="company" label="Company" hint="Optional">
          <Input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Acme Inc."
          />
        </Field>

        <Field id="phone" label="Phone" hint="Optional">
          <Input id="phone" name="phone" type="tel" autoComplete="tel" placeholder="+1 555 0100" />
        </Field>

        <Field id="message" label="Message" required className="sm:col-span-2">
          <Textarea
            id="message"
            name="message"
            rows={6}
            placeholder="What are you building, and what stage is it at?"
            required={hasEndpoint}
          />
        </Field>
      </div>

      {!hasEndpoint && (
        <p
          role="note"
          className="mt-6 flex items-start gap-2 rounded-xl border border-ats-accent/25 bg-ats-accent/10 px-4 py-3 text-sm leading-relaxed text-ats-ink-muted"
        >
          <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-ats-accent" aria-hidden />
          Set{' '}
          <code className="font-mono text-xs text-ats-accent">
            NEXT_PUBLIC_CONTACT_FORM_ENDPOINT
          </code>{' '}
          to enable submissions through your hosted form provider.
        </p>
      )}

      <div className="mt-8 flex flex-col gap-4 border-t border-ats-line pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-relaxed text-ats-ink-muted">
          We use your details only to reply to this enquiry.
        </p>
        <Button type="submit" size="lg" disabled={!hasEndpoint}>
          Send message
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-200 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5"
            aria-hidden
          />
        </Button>
      </div>
    </form>
  );
}

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
}

/** Label + control, kept server-renderable and paired by id. */
function Field({ id, label, hint, required, className = '', children }: FieldProps) {
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
        {hint && <span className="text-xs text-ats-ink-muted">{hint}</span>}
      </div>
      {children}
    </div>
  );
}
