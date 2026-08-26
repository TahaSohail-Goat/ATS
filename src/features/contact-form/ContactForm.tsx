import { useEffect, useMemo, useRef, useState } from 'react';
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
  { id: 's09', label: 'Game Development - Android | Desktop | VR' },
  { id: 's10', label: 'Game Development - Asset Creation' },
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

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/ast.devz@gmail.com';

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

/**
 * Field length caps. The endpoint is a public third-party inbox with its
 * captcha disabled, so the client must not relay unbounded payloads to it.
 * Enforced both by `maxLength` (typing) and in `validate` (paste/scripted).
 */
const LIMITS = { name: 100, email: 254, message: 5000 } as const;

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

  const phoneErr = validatePhone(data.iso, data.phone);
  if (phoneErr) errors.phone = phoneErr;

  if (data.services.length === 0) {
    errors.services = 'Please select at least one service.';
  }

  if (!data.message.trim()) {
    errors.message = 'Message is required.';
  } else if (data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters.';
  } else if (data.message.length > LIMITS.message) {
    errors.message = `Message must be ${LIMITS.message} characters or fewer.`;
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
  return `mailto:ast.devz@gmail.com?subject=${subject}&body=${body}`;
}

// ── Shared input styles ────────────────────────────────────────────────────────
const inputBase =
  'w-full rounded-xl border border-ast-line bg-ast-surface/60 px-4 py-3 text-sm text-ast-ink placeholder-ast-ink-muted/60 outline-none transition-all duration-200 focus:border-ast-brand/60 focus:ring-2 focus:ring-ast-brand/20';

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
  /** Honeypot: hidden from people, commonly auto-filled by bots. */
  const [botField, setBotField] = useState('');

  const dialRef = useRef<HTMLDivElement>(null);

  const selectedCountry = useMemo(
    () => COUNTRY_LIST.find((c) => c.iso === form.iso) ?? COUNTRY_LIST[0],
    [form.iso],
  );

  // Dismiss the dial-code popover the way any menu is expected to close.
  // Without this it can only be closed by clicking its own trigger again.
  useEffect(() => {
    if (!dialOpen) return;

    function onPointerDown(event: PointerEvent) {
      if (!dialRef.current?.contains(event.target as Node)) closeDial();
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      closeDial();
      document.getElementById('dial-code-btn')?.focus();
    }

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [dialOpen]);

  function closeDial() {
    setDialOpen(false);
    setSearch('');
  }

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
          _subject: `New project inquiry from ${form.name}`,
          _template: 'table',
          _captcha: 'false',
          _replyto: form.email,
          _honey: '',
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
        className="flex flex-col items-start gap-3 rounded-2xl border border-ast-success/30 bg-ast-success/10 p-6"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ast-success/20 text-ast-success">
          <Check className="h-5 w-5" />
        </span>
        <p className="font-semibold text-ast-ink">Message sent!</p>
        <p className="text-sm leading-relaxed text-ast-ink-muted">
          Thank you for reaching out. We reply to every message usually within one business day.
        </p>
      </div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      {/* Honeypot: off-screen and hidden from assistive tech, so only bots fill it. */}
      <div aria-hidden className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company-website">Company website (leave blank)</label>
        <input
          id="company-website"
          name="company-website"
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
            Your message could not be sent. Please try again.
          </p>
          <p className="text-sm leading-relaxed text-ast-ink-muted">
            If the problem persists,{' '}
            <a
              href={buildMailtoHref(form, selectedCountry.dialCode)}
              className="font-medium text-ast-brand underline underline-offset-2 hover:text-ast-brand-strong"
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
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ast-ink">
            Full Name <span className="text-ast-error" aria-hidden>*</span>
          </label>
          <input
            id="name"
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
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ast-ink">
            Email Address <span className="text-ast-error" aria-hidden>*</span>
          </label>
          <input
            id="email"
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

      {/* Phone with dynamic dial code */}
      <div>
        <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-ast-ink">
          Phone Number{' '}
          <span className="text-xs font-normal text-ast-ink-muted">(optional)</span>
        </label>
        <div className="flex gap-2">
          {/* Dial Code Selector */}
          <div className="relative shrink-0" ref={dialRef}>
            <button
              type="button"
              id="dial-code-btn"
              aria-haspopup="listbox"
              aria-expanded={dialOpen}
              aria-label={`Country code: ${selectedCountry.name} ${selectedCountry.dialCode}`}
              onClick={() => setDialOpen((o) => !o)}
              className="flex h-full min-w-[7rem] items-center gap-1.5 rounded-xl border border-ast-line bg-ast-surface/60 px-3 py-3 text-sm text-ast-ink transition-all duration-200 hover:border-ast-brand/60 focus:outline-none focus:ring-2 focus:ring-ast-brand/20"
            >
              <span
                aria-hidden
                className={`fi fi-${selectedCountry.iso.toLowerCase()} shrink-0 rounded-[2px]`}
              />
              <span className="font-mono font-medium">{selectedCountry.dialCode}</span>
              <ChevronDown
                className={`ml-auto h-3.5 w-3.5 shrink-0 text-ast-ink-muted transition-transform duration-200 ${dialOpen ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </button>

            {/* Dropdown */}
            {dialOpen && (
              <div className="absolute left-0 top-full z-50 mt-1.5 w-64 rounded-xl border border-ast-line bg-ast-surface shadow-ast-lifted">
                {/* Search */}
                <div className="border-b border-ast-line p-2">
                  <input
                    type="text"
                    placeholder="Search country or code..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-lg border border-ast-line bg-ast-surface/60 px-3 py-2 text-xs text-ast-ink placeholder-ast-ink-muted/60 outline-none focus:border-ast-brand/50 focus:ring-1 focus:ring-ast-brand/20"
                    autoFocus
                  />
                </div>
                <ul
                  role="listbox"
                  aria-label="Country dial codes"
                  className="max-h-56 overflow-y-auto py-1"
                >
                  {filteredCountries.length === 0 ? (
                    <li className="px-4 py-3 text-xs text-ast-ink-muted">No countries found.</li>
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
                          className={`flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors hover:bg-ast-brand/10 ${c.iso === form.iso ? 'bg-ast-brand/10 font-medium text-ast-brand' : 'text-ast-ink'}`}
                        >
                          <span
                            aria-hidden
                            className={`fi fi-${c.iso.toLowerCase()} shrink-0 rounded-[2px]`}
                          />
                          <span className="min-w-0 flex-1 truncate">{c.name}</span>
                          <span className="ml-auto shrink-0 font-mono text-xs text-ast-ink-muted">
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
            placeholder="300 1234567"
            value={form.phone}
            onChange={handlePhoneChange}
            maxLength={15}
            className={inputBase}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'}
          />
        </div>
        {errors.phone ? (
          <p id="phone-error" role="alert" className="mt-1.5 text-xs text-ast-error">
            {errors.phone}
          </p>
        ) : (
          <p id="phone-hint" className="mt-1.5 text-xs text-ast-ink-muted">
            Enter digits only no spaces or dashes required.
          </p>
        )}
      </div>

      {/* Services */}
      <div>
        <p className="mb-3 text-sm font-medium text-ast-ink">
          Services of Interest <span className="text-ast-error" aria-hidden>*</span>
        </p>
        <div role="group" aria-label="Services of interest" className="grid gap-2.5 sm:grid-cols-2">
          {SERVICES.map((service) => {
            const checked = form.services.includes(service.label);
            return (
              <label
                key={service.id}
                htmlFor={service.id}
                className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm transition-all duration-200 ${checked
                  ? 'border-ast-brand/50 bg-ast-brand/8 text-ast-ink'
                  : 'border-ast-line bg-ast-surface/40 text-ast-ink-muted hover:border-ast-brand/30 hover:bg-ast-surface/60 hover:text-ast-ink'
                  }`}
              >
                <span
                  aria-hidden
                  className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all duration-200 ${checked
                    ? 'border-ast-brand bg-ast-brand'
                    : 'border-ast-line bg-ast-surface'
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
                  <span className="mr-1.5 font-mono text-[10px] font-semibold text-ast-accent">
                    {service.id.replace('s', '').padStart(2, '0')}
                  </span>
                  {service.label}
                </span>
              </label>
            );
          })}
        </div>
        {errors.services && (
          <p role="alert" className="mt-2 text-xs text-ast-error">
            {errors.services}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ast-ink">
          Message <span className="text-ast-error" aria-hidden>*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          maxLength={LIMITS.message}
          placeholder="Tell us about your project, goals, or questions..."
          value={form.message}
          onChange={handleChange}
          className={`${inputBase} resize-none`}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-1.5 text-xs text-ast-error">
            {errors.message}
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
          'Send Message'
        )}
        <span
          aria-hidden
          className="absolute inset-0 -translate-x-full skew-x-12 bg-white/10 transition-transform duration-500 ease-out group-hover:translate-x-full"
        />
      </button>

      <p className="text-center text-xs text-ast-ink-muted">
        <span className="text-ast-error">*</span> Required fields. We reply to every message
        within one business day.
      </p>
    </form>
  );
}
