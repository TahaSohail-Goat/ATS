export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'ast-theme';

/** AST defaults to the dark scheme; light is an explicit user choice. */
export const DEFAULT_THEME: Theme = 'dark';

/**
 * The document element is the source of truth for the active theme: the
 * inline script in `app/layout.tsx` sets it before first paint, so nothing
 * needs to re-derive it from storage during render.
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
  return document.documentElement.classList.contains('light') ? 'light' : 'dark';
}

/** Hydration snapshot — matches the class rendered by the server. */
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
}

/** Applies, persists, and notifies subscribers. */
export function setTheme(theme: Theme): void {
  applyTheme(theme);
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage can be unavailable (private mode, blocked cookies) — the
    // choice still applies for this page view.
  }
  listeners.forEach((listener) => listener());
}

/**
 * Runs before paint in `<head>` to prevent a theme flash. Kept as a string so
 * it can be inlined; it must stay dependency-free and synchronous.
 */
export const themeInitScript = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='light'&&t!=='dark'){t='${DEFAULT_THEME}';}var r=document.documentElement;r.classList.toggle('light',t==='light');r.classList.toggle('dark',t==='dark');r.style.colorScheme=t;}catch(e){}})();`;
