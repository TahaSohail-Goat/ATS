export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'ast-theme';

/** AST defaults to the light scheme; dark is an explicit user choice. */
export const DEFAULT_THEME: Theme = 'light';

/**
 * Reads the stored theme. Accessing `localStorage` throws outright in some
 * privacy modes and locked-down enterprise browsers, so every read and write
 * is guarded: a blocked store must degrade to the default theme, never break
 * the page.
 */
export function readStoredTheme(): Theme | null {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

/**
 * The document element is the source of truth for the active theme: it is set
 * before first paint, so nothing needs to re-derive it from storage during
 * render.
 *
 * Exposed as an external store (subscribe/getSnapshot) so components can read
 * it with `useSyncExternalStore` instead of syncing it into state via an
 * effect.
 */
const listeners = new Set<() => void>();

export function subscribeTheme(onChange: () => void): () => void {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

export function getThemeSnapshot(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

/** Hydration snapshot, matches the class rendered by the server. */
export function getServerThemeSnapshot(): Theme {
  return DEFAULT_THEME;
}

/**
 * Applies the theme to the document. Both classes are set: `light` drives the
 * semantic token overrides, `dark` keeps Tailwind's `dark:` variant available.
 */
export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  root.classList.toggle('light', theme === 'light');
  root.classList.toggle('dark', theme === 'dark');
  root.style.colorScheme = theme;

  // Keep the browser-chrome tint matching the scheme the user chose. The
  // initial value is set pre-paint by the inline script in index.html.
  const meta = document.querySelector('meta[name="theme-color"]');
  meta?.setAttribute('content', theme === 'dark' ? '#020617' : '#E2E8F0');
}

/** Applies, persists, and notifies subscribers. */
export function setTheme(theme: Theme): void {
  applyTheme(theme);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies), the
    // choice still applies for this page view.
  }
  listeners.forEach((listener) => listener());
}
