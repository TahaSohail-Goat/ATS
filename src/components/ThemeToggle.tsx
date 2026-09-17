'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
import { getServerThemeSnapshot, getThemeSnapshot, setTheme, subscribeTheme } from '../lib/theme';

/**
 * Manual light/dark override. Light is the AST default; the choice persists in
 * localStorage and is applied before paint by the inline script in
 * `index.html`, so there is no flash on reload or navigation.
 *
 * The active theme is read from the document with `useSyncExternalStore`
 * rather than copied into state, which keeps hydration correct without an
 * effect.
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={() => setTheme(isLight ? 'dark' : 'light')}
      aria-label={isLight ? 'Switch to dark theme' : 'Switch to light theme'}
      aria-pressed={isLight}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-ast-ink/20 text-ast-ink-muted transition-colors duration-200 hocus:border-ast-accent/50 hocus:text-ast-accent ${className}`}
    >
      {isLight ? <Moon className="h-4 w-4" aria-hidden /> : <Sun className="h-4 w-4" aria-hidden />}
    </button>
  );
}
