import type { VercelRequest, VercelResponse } from '@vercel/node';

const TURNSTILE_VERIFY_ENDPOINT = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

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

/**
 * Verifies the Turnstile challenge only. The actual message send stays a
 * direct browser -> formsubmit.co request (see ContactForm.tsx), the same
 * path the FAQ form already uses successfully: formsubmit.co sits behind
 * Cloudflare's own bot protection, which reliably blocks server-to-server
 * requests from datacenter IPs like Vercel's, even with spoofed headers --
 * so relaying the send through this function is not viable.
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed.' });
  }

  const { turnstileToken } = (req.body ?? {}) as { turnstileToken?: unknown };

  if (!process.env.TURNSTILE_SECRET_KEY) {
    return res.status(200).json({ success: true });
  }
  if (typeof turnstileToken !== 'string' || !turnstileToken) {
    return res.status(400).json({ success: false, message: 'Verification required.' });
  }

  const forwardedFor = req.headers['x-forwarded-for'];
  const remoteIp = Array.isArray(forwardedFor) ? forwardedFor[0] : forwardedFor?.split(',')[0]?.trim();
  const verified = await verifyTurnstile(turnstileToken, remoteIp);
  if (!verified) {
    return res.status(400).json({ success: false, message: 'Verification failed. Please try again.' });
  }

  return res.status(200).json({ success: true });
}
