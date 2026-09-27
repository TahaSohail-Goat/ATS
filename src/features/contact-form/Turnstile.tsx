import { useEffect, useRef, useState } from 'react';

const SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY;

/** Whether a site key has been configured. False renders no widget and skips client-side gating. */
export const TURNSTILE_ENABLED = !!SITE_KEY;

const SCRIPT_SRC = 'https://challenges.cloudflare.com/turnstile/v0/api.js';

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Turnstile'));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

interface TurnstileProps {
  onVerify: (token: string) => void;
  onExpire: () => void;
}

/**
 * Cloudflare Turnstile challenge widget. Renders nothing when
 * VITE_TURNSTILE_SITE_KEY is unset, so the contact form stays usable before
 * the real site key is configured.
 */
export function Turnstile({ onVerify, onExpire }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const onVerifyRef = useRef(onVerify);
  const onExpireRef = useRef(onExpire);
  const [failed, setFailed] = useState(false);

  onVerifyRef.current = onVerify;
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!SITE_KEY) return;
    let cancelled = false;

    loadScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          // Pinned so the reserved space below always matches what actually
          // renders; without it Cloudflare is free to pick a different size.
          size: 'normal',
          callback: (token: string) => onVerifyRef.current(token),
          'expired-callback': () => onExpireRef.current(),
          'error-callback': () => onExpireRef.current(),
        });
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, []);

  if (!SITE_KEY || failed) return null;

  // The widget script loads async and inserts itself into this container a
  // moment after the page first paints (Cloudflare's own round trip, not
  // something this component controls). Reserving its footprint up front
  // means that insertion adds no height here. Without it, the container
  // jumps from 0 to Cloudflare's `size: 'normal'` height (65px, a little
  // more with its error copy) partway through the page load, which on this
  // page changes the whole section's height — and the full-bleed background
  // photo above, sized to cover that section, visibly rescales/recrops a
  // moment later to match.
  return <div ref={containerRef} className="min-h-[72px]" />;
}
