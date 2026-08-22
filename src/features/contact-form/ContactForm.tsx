import { useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

// ── Services ──────────────────────────────────────────────────────────────────
const SERVICES = [
  { id: 's01', label: 'AI Solutions & Integration' },
  { id: 's02', label: 'Custom Software Development' },
  { id: 's03', label: 'Web & SaaS Development' },
  { id: 's04', label: 'UI/UX & Product Design' },
  { id: 's05', label: 'Mobile App Development' },
  { id: 's06', label: 'E-Commerce Solutions' },
  { id: 's07', label: 'Automation & Business Process Optimization' },
  { id: 's08', label: 'Quality Engineering & Support' },
] as const;

// ── Country Codes ─────────────────────────────────────────────────────────────
const COUNTRY_CODES = [
  { code: '+1',   flag: '🇺🇸', name: 'US/CA',    digits: [10, 10] },
  { code: '+44',  flag: '🇬🇧', name: 'UK',        digits: [10, 10] },
  { code: '+92',  flag: '🇵🇰', name: 'Pakistan',  digits: [10, 10] },
  { code: '+91',  flag: '🇮🇳', name: 'India',     digits: [10, 10] },
  { code: '+971', flag: '🇦🇪', name: 'UAE',       digits: [9,  9]  },
  { code: '+966', flag: '🇸🇦', name: 'Saudi',     digits: [9,  9]  },
  { code: '+974', flag: '🇶🇦', name: 'Qatar',     digits: [8,  8]  },
  { code: '+965', flag: '🇰🇼', name: 'Kuwait',    digits: [8,  8]  },
  { code: '+973', flag: '🇧🇭', name: 'Bahrain',   digits: [8,  8]  },
  { code: '+968', flag: '🇴🇲', name: 'Oman',      digits: [8,  8]  },
  { code: '+49',  flag: '🇩🇪', name: 'Germany',   digits: [7,  11] },
  { code: '+33',  flag: '🇫🇷', name: 'France',    digits: [9,  9]  },
  { code: '+39',  flag: '🇮🇹', name: 'Italy',     digits: [9,  11] },
  { code: '+34',  flag: '🇪🇸', name: 'Spain',     digits: [9,  9]  },
  { code: '+31',  flag: '🇳🇱', name: 'Netherlands', digits: [9, 9] },
  { code: '+61',  flag: '🇦🇺', name: 'Australia', digits: [9,  9]  },
  { code: '+81',  flag: '🇯🇵', name: 'Japan',     digits: [10, 11] },
  { code: '+86',  flag: '🇨🇳', name: 'China',     digits: [11, 11] },
  { code: '+82',  flag: '🇰🇷', name: 'South Korea', digits: [9, 10] },
  { code: '+55',  flag: '🇧🇷', name: 'Brazil',    digits: [10, 11] },
  { code: '+27',  flag: '🇿🇦', name: 'South Africa', digits: [9, 9] },
  { code: '+20',  flag: '🇪🇬', name: 'Egypt',     digits: [10, 10] },
  { code: '+234', flag: '🇳🇬', name: 'Nigeria',   digits: [10, 10] },
  { code: '+880', flag: '🇧🇩', name: 'Bangladesh', digits: [10, 10] },
  { code: '+94',  flag: '🇱🇰', name: 'Sri Lanka', digits: [9,  9]  },
] as const;

type CountryCode = typeof COUNTRY_CODES[number];

// ── Form state ─────────────────────────────────────────────────────────────────
type FormState = {
  name: string;
  email: string;
  dialCode: string;
  phone: string;
  services: string[];
  message: string;
};

type FieldErrors = Partial<Record<'name' | 'email' | 'phone' | 'services' | 'message', string>>;

function getCountry(code: string): CountryCode {
  return COUNTRY_CODES.find((c) => c.code === code) ?? COUNTRY_CODES[0];
}

function validatePhone(dialCode: string, phone: string): string | undefined {
  if (!phone.trim()) return undefined; // phone is optional
  const digits = phone.replace(/\D/g, '');
  const [min, max] = getCountry(dialCode).digits;
  if (digits.length < min || digits.length > max) {
    return `Phone for this country should be ${min === max ? min : `${min}–${max}`} digits.`;
  }
  return undefined;
}

function validate(data: FormState): FieldErrors {
  const errors: FieldErrors = {};

  if (!data.name.trim()) errors.name = 'Name is required.';

  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  const phoneErr = validatePhone(data.dialCode, data.phone);
  if (phoneErr) errors.phone = phoneErr;

  if (data.services.length === 0) {
    errors.services = 'Please select at least one service.';
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required.';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  }

  return errors;
}

// ── Shared input styles ───────────────────────────────────────────────────────
const inputBase =
  'w-full rounded-xl border border-ats-line bg-ats-surface/60 px-4 py-3 text-sm text-ats-ink placeholder-ats-ink-muted/60 outline-none transition-all duration-200 focus:border-ats-brand/60 focus:ring-2 focus:ring-ats-brand/20';

// ── Component ─────────────────────────────────────────────────────────────────
export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    dialCode: '+92',
    phone: '',
    services: [],
    message: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [dialOpen, setDialOpen] = useState(false);

  // ── Field handlers ──────────────────────────────────────────────────────────
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Allow only digits, spaces, dashes, parentheses
    const value = e.target.value.replace(/[^\d\s\-().+]/g, '');
    setForm((prev) => ({ ...prev, phone: value }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  }

  function handleDialCode(code: string) {
    setForm((prev) => ({ ...prev, dialCode: code, phone: '' }));
    setErrors((prev) => ({ ...prev, phone: undefined }));
    setDialOpen(false);
  }

  function handleServiceToggle(label: string) {
    setForm((prev) => ({
      ...prev,
      services: prev.services.includes(label)
        ? prev.services.filter((s) => s !== label)
        : [...prev.services, label],
    }));
    if (errors.services) setErrors((prev) => ({ ...prev, services: undefined }));
  }

  // ── Submit ──────────────────────────────────────────────────────────────────
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    const phoneStr = form.phone.trim()
      ? `Phone: ${form.dialCode} ${form.phone}\n`
      : '';
    const servicesStr = `Services of Interest:\n${form.services.map((s) => `  • ${s}`).join('\n')}`;

    const subject = encodeURIComponent(`Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n${phoneStr}\n${servicesStr}\n\nMessage:\n${form.message}`,
    );
    window.location.href = `mailto:contact@ats.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setForm({ name: '', email: '', dialCode: '+92', phone: '', services: [], message: '' });
    setErrors({});
  }

  // ── Success state ───────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-2xl border border-ats-success/30 bg-ats-success/10 p-6"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ats-success/20 text-ats-success">
          <Check className="h-5 w-5" />
        </span>
        <p className="font-semibold text-ats-ink">Message queued!</p>
        <p className="text-sm leading-relaxed text-ats-ink-muted">
          Your email client should have opened with your message pre-filled. We reply to every
          message — usually within one business day.
        </p>
      </div>
    );
  }

  const selectedCountry = getCountry(form.dialCode);

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Name + Email row */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Name */}
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ats-ink">
            Full Name <span className="text-ats-error" aria-hidden>*</span>
          </label>
          <input
            id="name"
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

        {/* Email */}
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ats-ink">
            Email Address <span className="text-ats-error" aria-hidden>*</span>
          </label>
          <input
            id="email"
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

      {/* Phone Number with dial code */}
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ats-ink">
          Phone Number <span className="text-xs font-normal text-ats-ink-muted">(optional)</span>
        </label>
        <div className="flex gap-2">
          {/* Dial Code Selector */}
          <div className="relative">
            <button
              type="button"
              id="dial-code-btn"
              aria-haspopup="listbox"
              aria-expanded={dialOpen}
              aria-label={`Country code: ${selectedCountry.name} ${selectedCountry.code}`}
              onClick={() => setDialOpen((o) => !o)}
              onBlur={(e) => {
                if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node)) {
                  setDialOpen(false);
                }
              }}
              className="flex h-full min-w-[6.5rem] items-center gap-1.5 rounded-xl border border-ats-line bg-ats-surface/60 px-3 py-3 text-sm text-ats-ink transition-all duration-200 hover:border-ats-brand/60 focus:outline-none focus:ring-2 focus:ring-ats-brand/20"
            >
              <span aria-hidden>{selectedCountry.flag}</span>
              <span className="font-mono font-medium">{selectedCountry.code}</span>
              <ChevronDown
                className={`ml-auto h-3.5 w-3.5 shrink-0 text-ats-ink-muted transition-transform duration-200 ${dialOpen ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </button>

            {/* Dropdown */}
            {dialOpen && (
              <ul
                role="listbox"
                aria-label="Country dial codes"
                className="absolute left-0 top-full z-50 mt-1.5 max-h-64 w-56 overflow-y-auto rounded-xl border border-ats-line bg-ats-surface shadow-ats-lifted"
              >
                {COUNTRY_CODES.map((c) => (
                  <li key={c.code + c.name} role="option" aria-selected={c.code === form.dialCode}>
                    <button
                      type="button"
                      onClick={() => handleDialCode(c.code)}
                      className={`flex w-full items-center gap-3 px-3 py-2.5 text-sm transition-colors hover:bg-ats-brand/10 ${
                        c.code === form.dialCode
                          ? 'bg-ats-brand/10 font-medium text-ats-brand'
                          : 'text-ats-ink'
                      }`}
                    >
                      <span aria-hidden>{c.flag}</span>
                      <span>{c.name}</span>
                      <span className="ml-auto font-mono text-xs text-ats-ink-muted">{c.code}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Phone input */}
          <div className="flex-1">
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel-national"
              placeholder={`${selectedCountry.digits[0]} digits`}
              value={form.phone}
              onChange={handlePhoneChange}
              maxLength={15}
              className={inputBase}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'}
            />
          </div>
        </div>
        {errors.phone ? (
          <p id="phone-error" role="alert" className="mt-1.5 text-xs text-ats-error">
            {errors.phone}
          </p>
        ) : (
          <p id="phone-hint" className="mt-1.5 text-xs text-ats-ink-muted">
            Enter digits only — no spaces or dashes required.
          </p>
        )}
      </div>

      {/* Services */}
      <div>
        <p className="mb-3 text-sm font-medium text-ats-ink">
          Services of Interest <span className="text-ats-error" aria-hidden>*</span>
        </p>
        <div
          role="group"
          aria-label="Services of interest"
          className="grid gap-2.5 sm:grid-cols-2"
        >
          {SERVICES.map((service) => {
            const checked = form.services.includes(service.label);
            return (
              <label
                key={service.id}
                htmlFor={service.id}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm transition-all duration-200 ${
                  checked
                    ? 'border-ats-brand/50 bg-ats-brand/8 text-ats-ink'
                    : 'border-ats-line bg-ats-surface/40 text-ats-ink-muted hover:border-ats-brand/30 hover:bg-ats-surface/60 hover:text-ats-ink'
                }`}
              >
                {/* Custom checkbox */}
                <span
                  aria-hidden
                  className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border transition-all duration-200 ${
                    checked
                      ? 'border-ats-brand bg-ats-brand'
                      : 'border-ats-line bg-ats-surface'
                  }`}
                >
                  {checked && <Check className="h-2.5 w-2.5 text-white" aria-hidden />}
                </span>
                <input
                  type="checkbox"
                  id={service.id}
                  name="services"
                  value={service.label}
                  checked={checked}
                  onChange={() => handleServiceToggle(service.label)}
                  className="sr-only"
                />
                <span className="leading-tight">
                  <span className="mr-1.5 font-mono text-[10px] font-semibold text-ats-accent">
                    {service.id.replace('s', '').padStart(2, '0')}
                  </span>
                  {service.label}
                </span>
              </label>
            );
          })}
        </div>
        {errors.services && (
          <p role="alert" className="mt-2 text-xs text-ats-error">
            {errors.services}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ats-ink">
          Message <span className="text-ats-error" aria-hidden>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about your project, goals, or questions..."
          value={form.message}
          onChange={handleChange}
          className={`${inputBase} resize-none`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1.5 text-xs text-ats-error">
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-ats-brand px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-ats-brand-strong hover:shadow-ats-glow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ats-brand"
      >
        Send Message
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 ease-out group-hover:translate-x-full skew-x-12"
        />
      </button>

      <p className="text-center text-xs text-ats-ink-muted">
        <span className="text-ats-error">*</span> Required fields. We reply to every message within one business day.
      </p>
    </form>
  );
}
