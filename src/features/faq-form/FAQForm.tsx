import { useState } from 'react';
import { Check, LoaderCircle } from 'lucide-react';

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/ast.devz@gmail.com';

type FormState = {
  name: string;
  email: string;
  category: string;
  question: string;
};

type FieldErrors = Partial<Record<'name' | 'email' | 'category' | 'question', string>>;

/**
 * Field length caps. The endpoint is a public third-party inbox with its
 * captcha disabled, so the client must not relay unbounded payloads to it.
 * Enforced both by `maxLength` (typing) and in `validate` (paste/scripted).
 */
const LIMITS = { name: 100, email: 254, question: 2000 } as const;

function validate(data: FormState): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.name.trim()) {
    errors.name = 'Name is required.';
  } else if (data.name.length > LIMITS.name) {
    errors.name = `Name must be ${LIMITS.name} characters or fewer.`;
  }

  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  } else if (data.email.length > LIMITS.email) {
    errors.email = `Email must be ${LIMITS.email} characters or fewer.`;
  }

  if (!data.category.trim()) errors.category = 'Please select a category.';

  if (!data.question.trim()) {
    errors.question = 'Question is required.';
  } else if (data.question.trim().length < 10) {
    errors.question = 'Question must be at least 10 characters.';
  } else if (data.question.length > LIMITS.question) {
    errors.question = `Question must be ${LIMITS.question} characters or fewer.`;
  }

  return errors;
}

const inputBase =
  'w-full rounded-xl border border-ast-line bg-ast-surface/60 px-4 py-3 text-sm text-ast-ink placeholder-ast-ink-muted/60 outline-none transition-all duration-200 focus:border-ast-brand/60 focus:ring-2 focus:ring-ast-brand/20';

const CATEGORIES = [
  { value: 'services', label: 'Services & Capabilities' },
  { value: 'process', label: 'Process & Timeline' },
  { value: 'pricing', label: 'Pricing & Budget' },
  { value: 'technology', label: 'Technology & Stack' },
  { value: 'team', label: 'Team & Expertise' },
  { value: 'game-dev', label: 'Game Development' },
  { value: 'ai-ml', label: 'AI & Machine Learning' },
  { value: 'other', label: 'Other' },
];

export function FAQForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    category: '',
    question: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  /** Honeypot: hidden from people, commonly auto-filled by bots. */
  const [botField, setBotField] = useState('');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;

    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    // A filled honeypot means a bot. Show the success state without sending so
    // the crawler gets no signal about what gave it away.
    if (botField) {
      setStatus('sent');
      return;
    }

    setStatus('sending');
    try {
      const response = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `New FAQ submission from ${form.name}`,
          _template: 'table',
          _captcha: 'false',
          _replyto: form.email,
          _honey: '',
          Name: form.name,
          Email: form.email,
          Category: form.category,
          Question: form.question,
        }),
      });
      const data = await response.json();
      if (!response.ok || data.success !== 'true') {
        throw new Error(data.message || 'Send failed');
      }
      setStatus('sent');
      setForm({ name: '', email: '', category: '', question: '' });
      setErrors({});
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-2xl border border-ast-success/30 bg-ast-success/10 p-6"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ast-success/20 text-ast-success">
          <Check className="h-5 w-5" />
        </span>
        <p className="font-semibold text-ast-ink">Question submitted!</p>
        <p className="text-sm leading-relaxed text-ast-ink-muted">
          Thank you for your question. We'll review it and add it to our FAQs if it would help others. You'll receive an email response within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Honeypot: off-screen and hidden from assistive tech, so only bots fill it. */}
      <div aria-hidden className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="faq-company-website">Company website (leave blank)</label>
        <input
          id="faq-company-website"
          name="faq-company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={botField}
          onChange={(e) => setBotField(e.target.value)}
        />
      </div>

      {status === 'error' && (
        <div role="alert" className="flex flex-col gap-2 rounded-2xl border border-ast-error/30 bg-ast-error/10 p-5">
          <p className="text-sm font-semibold text-ast-error">
            Your question could not be sent. Please try again.
          </p>
        </div>
      )}

      {/* Name + Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="faq-name" className="mb-1.5 block text-sm font-medium text-ast-ink">
            Full Name <span className="text-ast-error" aria-hidden>*</span>
          </label>
          <input
            id="faq-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={LIMITS.name}
            placeholder="Jane Smith"
            value={form.name}
            onChange={handleChange}
            className={inputBase}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1.5 text-xs text-ast-error">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="faq-email" className="mb-1.5 block text-sm font-medium text-ast-ink">
            Email Address <span className="text-ast-error" aria-hidden>*</span>
          </label>
          <input
            id="faq-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={LIMITS.email}
            placeholder="jane@company.com"
            value={form.email}
            onChange={handleChange}
            className={inputBase}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1.5 text-xs text-ast-error">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="faq-category" className="mb-1.5 block text-sm font-medium text-ast-ink">
          Question Category <span className="text-ast-error" aria-hidden>*</span>
        </label>
        <select
          id="faq-category"
          name="category"
          value={form.category}
          onChange={handleChange}
          className={inputBase}
          aria-invalid={!!errors.category}
          aria-describedby={errors.category ? 'category-error' : undefined}
        >
          <option value="">Select a category...</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.value} value={cat.label}>
              {cat.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p id="category-error" role="alert" className="mt-1.5 text-xs text-ast-error">
            {errors.category}
          </p>
        )}
      </div>

      {/* Question */}
      <div>
        <label htmlFor="faq-question" className="mb-1.5 block text-sm font-medium text-ast-ink">
          Your Question <span className="text-ast-error" aria-hidden>*</span>
        </label>
        <textarea
          id="faq-question"
          name="question"
          rows={4}
          maxLength={LIMITS.question}
          placeholder="Ask your question here..."
          value={form.question}
          onChange={handleChange}
          className={`${inputBase} resize-none`}
          aria-invalid={!!errors.question}
          aria-describedby={errors.question ? 'question-error' : undefined}
        />
        {errors.question && (
          <p id="question-error" role="alert" className="mt-1.5 text-xs text-ast-error">
            {errors.question}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-ast-brand px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-ast-brand-strong hover:shadow-ast-glow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ast-brand disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'sending' ? (
          <>
            Sending...
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
          </>
        ) : (
          'Submit Question'
        )}
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full skew-x-12 bg-white/10 transition-transform duration-500 ease-out group-hover:translate-x-full"
        />
      </button>

      <p className="text-center text-xs text-ast-ink-muted">
        <span className="text-ast-error">*</span> Required fields. We reply to every question within one business day.
      </p>
    </form>
  );
}
