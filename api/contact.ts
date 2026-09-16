import type { VercelRequest, VercelResponse } from '@vercel/node';

// Same public inbox the client used to POST to directly. Living here instead
// keeps it out of the client bundle and behind Turnstile verification.
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/ast.devz@gmail.com';
const TURNSTILE_VERIFY_ENDPOINT = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

const LIMITS = { name: 100, email: 254, message: 5000 } as const;

interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  services: string[];
  message: string;
  turnstileToken?: string;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function parsePayload(body: unknown): ContactPayload | { error: string } {
  if (typeof body !== 'object' || body === null) return { error: 'Invalid request body.' };
  const { name, email, phone, services, message, turnstileToken } = body as Record<string, unknown>;

  if (typeof name !== 'string' || !name.trim() || name.length > LIMITS.name) {
    return { error: 'Invalid name.' };
  }
  if (typeof email !== 'string' || !isValidEmail(email) || email.length > LIMITS.email) {
    return { error: 'Invalid email.' };
  }
  if (!Array.isArray(services) || services.length === 0 || !services.every((s) => typeof s === 'string')) {
    return { error: 'Select at least one service.' };
  }
  if (typeof message !== 'string' || !message.trim() || message.length > LIMITS.message) {
    return { error: 'Invalid message.' };
  }
  if (phone !== undefined && typeof phone !== 'string') {
    return { error: 'Invalid phone.' };
  }
  if (turnstileToken !== undefined && typeof turnstileToken !== 'string') {
    return { error: 'Invalid verification token.' };
  }

  return {
    name: name.trim(),
    email: email.trim(),
    phone: typeof phone === 'string' && phone.trim() ? phone.trim() : 'Not provided',
    services,
    message: message.trim(),
    turnstileToken,
  };
}

/** Skips verification (returns true) when no secret key is configured yet, so the form keeps working pre-launch. */
async function verifyTurnstile(token: string, remoteIp: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;

  const params = new URLSearchParams({ secret, response: token });
  if (remoteIp) params.set('remoteip', remoteIp);

  const response = await fetch(TURNSTILE_VERIFY_ENDPOINT, { method: 'POST', body: params });
  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  const payload = parsePayload(req.body);
  if ('error' in payload) {
    return res.status(400).json({ success: false, message: payload.error });
  }
  const { name, email, phone, services, message, turnstileToken } = payload;

  if (process.env.TURNSTILE_SECRET_KEY && !turnstileToken) {
    return res.status(400).json({ success: false, message: 'Verification required.' });
  }

  if (turnstileToken) {
    const forwardedFor = req.headers['x-forwarded-for'];
    const remoteIp = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor?.split(',')[0]?.trim();
    const verified = await verifyTurnstile(turnstileToken, remoteIp);
    if (!verified) {
      return res.status(400).json({ success: false, message: 'Verification failed. Please try again.' });
    }
  }

  try {
    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: `New project inquiry from ${name}`,
        _template: 'table',
        _captcha: 'false',
        _replyto: email,
        _honey: '',
        Name: name,
        Email: email,
        Phone: phone,
        Services: services.join(', '),
        Message: message,
      }),
    });
    const data = (await response.json()) as { success?: string; message?: string };
    if (!response.ok || data.success !== 'true') {
      throw new Error(data.message || 'Send failed.');
    }
    return res.status(200).json({ success: true });
  } catch {
    return res.status(502).json({ success: false, message: 'Failed to forward message.' });
  }
}
