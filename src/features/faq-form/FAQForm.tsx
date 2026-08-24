import { useState } from 'react';
import { Check, LoaderCircle } from 'lucide-react';

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/tsasolutions1@gmail.com';

type FormState = {
  name: string;
  email: string;
  category: string;
  question: string;
};

type FieldErrors = Partial<Record<'name' | 'email' | 'category' | 'question', string>>;

function validate(data: FormState): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.name.trim()) errors.name = 'Name is required.';

  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!data.category.trim()) errors.category = 'Please select a category.';

  if (!data.question.trim()) {
    errors.question = 'Question is required.';
  } else if (data.question.trim().length < 10) {
    errors.question = 'Question must be at least 10 characters.';
  }

  return errors;
}

const inputBase =
  'w-full rounded-xl border border-ats-line bg-ats-surface/60 px-4 py-3 text-sm text-ats-ink placeholder-ats-ink-muted/60 outline-none transition-all duration-200 focus:border-ats-brand/60 focus:ring-2 focus:ring-ats-brand/20';

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
        className="flex flex-col items-start gap-3 rounded-2xl border border-ats-success/30 bg-ats-success/10 p-6"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ats-success/20 text-ats-success">
          <Check className="h-5 w-5" />
        </span>
        <p className="font-semibold text-ats-ink">Question submitted!</p>
        <p className="text-sm leading-relaxed text-ats-ink-muted">
          Thank you for your question. We'll review it and add it to our FAQs if it would help others. You'll receive an email response within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {status === 'error' && (
        <div role="alert" className="flex flex-col gap-2 rounded-2xl border border-ats-error/30 bg-ats-error/10 p-5">
          <p className="text-sm font-semibold text-ats-error">
            Your question could not be sent. Please try again.
          </p>
        </div>
      )}

      {/* Name + Email */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="faq-name" className="mb-1.5 block text-sm font-medium text-ats-ink">
            Full Name <span className="text-ats-error" aria-hidden>*</span>
          </label>
          <input
            id="faq-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            value={form.name}
            onChange={handleChange}
            className={inputBase}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-1.5 text-xs text-ats-error">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="faq-email" className="mb-1.5 block text-sm font-medium text-ats-ink">
            Email Address <span className="text-ats-error" aria-hidden>*</span>
          </label>
          <input
            id="faq-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@company.com"
            value={form.email}
            onChange={handleChange}
            className={inputBase}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="mt-1.5 text-xs text-ats-error">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="faq-category" className="mb-1.5 block text-sm font-medium text-ats-ink">
          Question Category <span className="text-ats-error" aria-hidden>*</span>
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
          <p id="category-error" role="alert" className="mt-1.5 text-xs text-ats-error">
            {errors.category}
          </p>
        )}
      </div>

      {/* Question */}
      <div>
        <label htmlFor="faq-question" className="mb-1.5 block text-sm font-medium text-ats-ink">
          Your Question <span className="text-ats-error" aria-hidden>*</span>
        </label>
        <textarea
          id="faq-question"
          name="question"
          rows={4}
          placeholder="Ask your question here..."
          value={form.question}
          onChange={handleChange}
          className={`${inputBase} resize-none`}
          aria-invalid={!!errors.question}
          aria-describedby={errors.question ? 'question-error' : undefined}
        />
        {errors.question && (
          <p id="question-error" role="alert" className="mt-1.5 text-xs text-ats-error">
            {errors.question}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-ats-brand px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-ats-brand-strong hover:shadow-ats-glow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ats-brand disabled:cursor-not-allowed disabled:opacity-70"
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

      <p className="text-center text-xs text-ats-ink-muted">
        <span className="text-ats-error">*</span> Required fields. We reply to every question within one business day.
      </p>
    </form>
  );
}
