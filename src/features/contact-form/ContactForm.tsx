import { useMemo, useState } from 'react';
import { Check, ChevronDown, LoaderCircle } from 'lucide-react';
import {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  type CountryCode as PhoneCountryCode,
} from 'libphonenumber-js';

// ── Services ───────────────────────────────────────────────────────────────────
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

// ── Dynamic Country Helpers ────────────────────────────────────────────────────

// Countries to pin at the top of the list for convenience
const PINNED: PhoneCountryCode[] = ['PK', 'US', 'GB', 'AE', 'SA', 'IN'];

interface CountryEntry {
  iso: PhoneCountryCode;
  dialCode: string;
  name: string;
}

/** Build the full sorted country list once at module load time */
function buildCountryList(): CountryEntry[] {
  const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });

  const all = getCountries()
    .map((iso) => ({
      iso,
      dialCode: '+' + getCountryCallingCode(iso),
      name: regionNames.of(iso) ?? iso,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  // Split pinned (preserve order) and the rest
  const pinned = PINNED.map((iso) => all.find((c) => c.iso === iso)).filter(
    Boolean,
  ) as CountryEntry[];
  const rest = all.filter((c) => !PINNED.includes(c.iso));

  return [...pinned, ...rest];
}

const COUNTRY_LIST = buildCountryList();
const DEFAULT_ISO: PhoneCountryCode = 'PK';

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/tsasolutions1@gmail.com';

// ── Form state ─────────────────────────────────────────────────────────────────
type FormState = {
  name: string;
  email: string;
  iso: PhoneCountryCode;
  phone: string;
  services: string[];
  message: string;
};

type FieldErrors = Partial<Record<'name' | 'email' | 'phone' | 'services' | 'message', string>>;

function validatePhone(iso: PhoneCountryCode, phone: string): string | undefined {
  if (!phone.trim()) return undefined; // optional field
  const raw = phone.replace(/\D/g, '');
  if (!raw) return undefined;
  try {
    const valid = isValidPhoneNumber(raw, iso);
    if (!valid) {
      const callingCode = getCountryCallingCode(iso);
      return `Invalid number for +${callingCode}. Check the digit count and format.`;
    }
  } catch {
    return 'Could not validate this number. Please double-check it.';
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

  const phoneErr = validatePhone(data.iso, data.phone);
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

function buildMailtoHref(data: FormState, dialCode: string): string {
  const phoneStr = data.phone.trim() ? `Phone: ${dialCode} ${data.phone}\n` : '';
  const servicesStr = `Services of Interest:\n${data.services.map((s) => `  • ${s}`).join('\n')}`;
  const subject = encodeURIComponent(`Contact from ${data.name}`);
  const body = encodeURIComponent(
    `Name: ${data.name}\nEmail: ${data.email}\n${phoneStr}\n${servicesStr}\n\nMessage:\n${data.message}`,
  );
  return `mailto:tsasolutions1@gmail.com?subject=${subject}&body=${body}`;
}

// ── Shared input styles ────────────────────────────────────────────────────────
const inputBase =
  'w-full rounded-xl border border-ats-line bg-ats-surface/60 px-4 py-3 text-sm text-ats-ink placeholder-ats-ink-muted/60 outline-none transition-all duration-200 focus:border-ats-brand/60 focus:ring-2 focus:ring-ats-brand/20';

// ── Component ──────────────────────────────────────────────────────────────────
export function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    iso: DEFAULT_ISO,
    phone: '',
    services: [],
    message: '',
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [dialOpen, setDialOpen] = useState(false);
  const [search, setSearch] = useState('');

  const selectedCountry = useMemo(
    () => COUNTRY_LIST.find((c) => c.iso === form.iso) ?? COUNTRY_LIST[0],
    [form.iso],
  );

  const filteredCountries = useMemo(() => {
    if (!search.trim()) return COUNTRY_LIST;
    const q = search.toLowerCase();
    return COUNTRY_LIST.filter(
      (c) => c.name.toLowerCase().includes(q) || c.dialCode.includes(q) || c.iso.toLowerCase().includes(q),
    );
  }, [search]);

  // ── Field handlers ───────────────────────────────────────────────────────────
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.replace(/[^\d\s\-().]/g, '');
    setForm((prev) => ({ ...prev, phone: value }));
    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
  }

  function handleSelectCountry(iso: PhoneCountryCode) {
    setForm((prev) => ({ ...prev, iso, phone: '' }));
    setErrors((prev) => ({ ...prev, phone: undefined }));
    setDialOpen(false);
    setSearch('');
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

  // ── Submit ───────────────────────────────────────────────────────────────────
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
          _subject: `New project inquiry from ${form.name}`,
          _template: 'table',
          _captcha: 'false',
          _replyto: form.email,
          Name: form.name,
          Email: form.email,
          Phone: form.phone.trim() ? `${selectedCountry.dialCode} ${form.phone}` : 'Not provided',
          Services: form.services.join(', '),
          Message: form.message,
        }),
      });
      const data = await response.json();
      if (!response.ok || data.success !== 'true') {
        throw new Error(data.message || 'Send failed');
      }
      setStatus('sent');
      setForm({ name: '', email: '', iso: DEFAULT_ISO, phone: '', services: [], message: '' });
      setErrors({});
    } catch {
      setStatus('error');
    }
  }

  // ── Success state ────────────────────────────────────────────────────────────
  if (status === 'sent') {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-3 rounded-2xl border border-ats-success/30 bg-ats-success/10 p-6"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ats-success/20 text-ats-success">
          <Check className="h-5 w-5" />
        </span>
        <p className="font-semibold text-ats-ink">Message sent!</p>
        <p className="text-sm leading-relaxed text-ats-ink-muted">
          Thank you for reaching out. We reply to every message usually within one business day.
        </p>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {status === 'error' && (
        <div role="alert" className="flex flex-col gap-2 rounded-2xl border border-ats-error/30 bg-ats-error/10 p-5">
          <p className="text-sm font-semibold text-ats-error">
            Your message could not be sent. Please try again.
          </p>
          <p className="text-sm leading-relaxed text-ats-ink-muted">
            If the problem persists,{' '}
            <a
              href={buildMailtoHref(form, selectedCountry.dialCode)}
              className="font-medium text-ats-brand underline underline-offset-2 hover:text-ats-brand-strong"
            >
              send it through your email app
            </a>{' '}
            instead.
          </p>
        </div>
      )}
      {/* Name + Email */}
      <div className="grid gap-4 sm:grid-cols-2">
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

      {/* Phone with dynamic dial code */}
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ats-ink">
          Phone Number{' '}
          <span className="text-xs font-normal text-ats-ink-muted">(optional)</span>
        </label>
        <div className="flex gap-2">
          {/* Dial Code Selector */}
          <div className="relative shrink-0">
            <button
              type="button"
              id="dial-code-btn"
              aria-haspopup="listbox"
              aria-expanded={dialOpen}
              aria-label={`Country code: ${selectedCountry.name} ${selectedCountry.dialCode}`}
              onClick={() => setDialOpen((o) => !o)}
              className="flex h-full min-w-[7rem] items-center gap-1.5 rounded-xl border border-ats-line bg-ats-surface/60 px-3 py-3 text-sm text-ats-ink transition-all duration-200 hover:border-ats-brand/60 focus:outline-none focus:ring-2 focus:ring-ats-brand/20"
            >
              <span
                aria-hidden
                className={`fi fi-${selectedCountry.iso.toLowerCase()} shrink-0 rounded-[2px]`}
              />
              <span className="font-mono font-medium">{selectedCountry.dialCode}</span>
              <ChevronDown
                className={`ml-auto h-3.5 w-3.5 shrink-0 text-ats-ink-muted transition-transform duration-200 ${dialOpen ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </button>

            {/* Dropdown */}
            {dialOpen && (
              <div className="absolute left-0 top-full z-50 mt-1.5 w-64 rounded-xl border border-ats-line bg-ats-surface shadow-ats-lifted">
                {/* Search */}
                <div className="border-b border-ats-line p-2">
                  <input
                    type="text"
                    placeholder="Search country or code..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-ats-line bg-ats-surface/60 px-3 py-2 text-xs text-ats-ink placeholder-ats-ink-muted/60 outline-none focus:border-ats-brand/50 focus:ring-1 focus:ring-ats-brand/20"
                    autoFocus
                  />
                </div>
                <ul
                  role="listbox"
                  aria-label="Country dial codes"
                  className="max-h-56 overflow-y-auto py-1"
                >
                  {filteredCountries.length === 0 ? (
                    <li className="px-4 py-3 text-xs text-ats-ink-muted">No countries found.</li>
                  ) : (
                    filteredCountries.map((c) => (
                      <li
                        key={c.iso}
                        role="option"
                        aria-selected={c.iso === form.iso}
                      >
                        <button
                          type="button"
                          onClick={() => handleSelectCountry(c.iso)}
                          className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-ats-brand/10 ${c.iso === form.iso ? 'bg-ats-brand/10 font-medium text-ats-brand' : 'text-ats-ink'}`}
                        >
                          <span
                            aria-hidden
                            className={`fi fi-${c.iso.toLowerCase()} shrink-0 rounded-[2px]`}
                          />
                          <span className="min-w-0 flex-1 truncate">{c.name}</span>
                          <span className="ml-auto shrink-0 font-mono text-xs text-ats-ink-muted">
                            {c.dialCode}
                          </span>
                        </button>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Phone input */}
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel-national"
            placeholder="Enter phone number"
            value={form.phone}
            onChange={handlePhoneChange}
            maxLength={15}
            className={inputBase}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'}
          />
        </div>
        {errors.phone ? (
          <p id="phone-error" role="alert" className="mt-1.5 text-xs text-ats-error">
            {errors.phone}
          </p>
        ) : (
          <p id="phone-hint" className="mt-1.5 text-xs text-ats-ink-muted">
            Enter digits only no spaces or dashes required.
          </p>
        )}
      </div>

      {/* Services */}
      <div>
        <p className="mb-3 text-sm font-medium text-ats-ink">
          Services of Interest <span className="text-ats-error" aria-hidden>*</span>
        </p>
        <div role="group" aria-label="Services of interest" className="grid gap-2.5 sm:grid-cols-2">
          {SERVICES.map((service) => {
            const checked = form.services.includes(service.label);
            return (
              <label
                key={service.id}
                htmlFor={service.id}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm transition-all duration-200 ${checked
                  ? 'border-ats-brand/50 bg-ats-brand/8 text-ats-ink'
                  : 'border-ats-line bg-ats-surface/40 text-ats-ink-muted hover:border-ats-brand/30 hover:bg-ats-surface/60 hover:text-ats-ink'
                  }`}
              >
                <span
                  aria-hidden
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all duration-200 ${checked
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
        disabled={status === 'sending'}
        className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-ats-brand px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-ats-brand-strong hover:shadow-ats-glow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ats-brand disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === 'sending' ? (
          <>
            Sending...
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden />
          </>
        ) : (
          'Send Message'
        )}
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full skew-x-12 bg-white/10 transition-transform duration-500 ease-out group-hover:translate-x-full"
        />
      </button>

      <p className="text-center text-xs text-ats-ink-muted">
        <span className="text-ats-error">*</span> Required fields. We reply to every message
        within one business day.
      </p>
    </form>
  );
}
