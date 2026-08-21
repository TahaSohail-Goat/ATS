import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';
import { theme, themeConstant } from '@ats/ui/tokens/colors';

// ATS design tokens are the single source of color truth — see
// docs/frontend/design-system.md and packages/ui/src/tokens.
//
// Semantic roles (canvas/surface/line/ink/brand) are emitted as CSS custom
// properties holding "R G B" channel triplets so that every Tailwind color
// utility supports opacity modifiers (`bg-ats-surface/60`) while a single
// `.light` / `.dark` class on <html> re-themes the entire site.

/** '#2563EB' → '37 99 235' */
function channels(hex: string): string {
  const value = hex.replace('#', '');
  const full =
    value.length === 3
      ? value
          .split('')
          .map((c) => c + c)
          .join('')
      : value;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `${r} ${g} ${b}`;
}

/** Tailwind color entry backed by a channel-triplet CSS variable. */
function tokenColor(variable: string) {
  return `rgb(var(${variable}) / <alpha-value>)`;
}

const SEMANTIC_VARS = {
  canvas: '--ats-canvas',
  surface: '--ats-surface',
  surfaceRaised: '--ats-surface-raised',
  line: '--ats-line',
  ink: '--ats-ink',
  inkMuted: '--ats-ink-muted',
  brand: '--ats-brand',
  brandStrong: '--ats-brand-strong',
  accent: '--ats-accent',
} as const;

function schemeVars(scheme: 'dark' | 'light'): Record<string, string> {
  return Object.fromEntries(
    Object.entries(SEMANTIC_VARS).map(([role, variable]) => [
      variable,
      channels(theme[scheme][role as keyof (typeof theme)['dark']]),
    ]),
  );
}

const constantVars: Record<string, string> = Object.fromEntries(
  Object.entries(themeConstant).map(([role, hex]) => [`--ats-${role}`, channels(hex)]),
);

const config: Config = {
  darkMode: ['class', '.dark'],
  content: ['./src/**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic, theme-aware roles — prefer these in components.
        'ats-canvas': tokenColor(SEMANTIC_VARS.canvas),
        'ats-surface': tokenColor(SEMANTIC_VARS.surface),
        'ats-surface-raised': tokenColor(SEMANTIC_VARS.surfaceRaised),
        'ats-line': tokenColor(SEMANTIC_VARS.line),
        'ats-ink': tokenColor(SEMANTIC_VARS.ink),
        'ats-ink-muted': tokenColor(SEMANTIC_VARS.inkMuted),
        'ats-brand': tokenColor(SEMANTIC_VARS.brand),
        'ats-brand-strong': tokenColor(SEMANTIC_VARS.brandStrong),
        'ats-accent': tokenColor(SEMANTIC_VARS.accent),
        'ats-primary': tokenColor('--ats-primary'),
        'ats-secondary': tokenColor('--ats-secondary'),
        'ats-violet': tokenColor('--ats-violet'),
        'ats-success': tokenColor('--ats-success'),
        'ats-error': tokenColor('--ats-error'),
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        // Fluid display scale — headline sizes track the viewport so the
        // layout reads intentionally at 375px and at 1920px.
        'display-sm': ['clamp(1.875rem, 1.55rem + 1.6vw, 2.5rem)', { lineHeight: '1.12' }],
        'display-md': ['clamp(2.25rem, 1.7rem + 2.6vw, 3.5rem)', { lineHeight: '1.08' }],
        'display-lg': ['clamp(2.75rem, 1.9rem + 4vw, 5rem)', { lineHeight: '1.04' }],
        'display-xl': ['clamp(3.25rem, 1.9rem + 6.2vw, 7rem)', { lineHeight: '0.98' }],
        eyebrow: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.2em' }],
      },
      letterSpacing: {
        display: '-0.045em',
        tighter2: '-0.03em',
      },
      maxWidth: {
        prose: '68ch',
        shell: '84rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      boxShadow: {
        'ats-card': '0 1px 2px 0 rgb(var(--ats-primary) / 0.06)',
        'ats-lifted': '0 28px 70px -34px rgb(var(--ats-primary) / 0.5)',
        'ats-glow':
          '0 0 0 1px rgb(var(--ats-brand) / 0.28), 0 24px 60px -26px rgb(var(--ats-brand) / 0.55)',
        'ats-inset': 'inset 0 1px 0 0 rgb(255 255 255 / 0.06)',
      },
      backgroundImage: {
        'ats-brand-gradient':
          'linear-gradient(120deg, rgb(var(--ats-brand)) 0%, rgb(var(--ats-accent)) 55%, rgb(var(--ats-violet)) 100%)',
        'ats-ink-gradient':
          'linear-gradient(180deg, rgb(var(--ats-ink)) 0%, rgb(var(--ats-ink) / 0.62) 100%)',
      },
      transitionTimingFunction: {
        'ats-out': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'ats-in-out': 'cubic-bezier(0.65, 0, 0.35, 1)',
      },
      keyframes: {
        'ats-drift': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(4%, -6%, 0) scale(1.12)' },
        },
        'ats-drift-slow': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1.08)' },
          '50%': { transform: 'translate3d(-5%, 5%, 0) scale(1)' },
        },
        'ats-marquee': {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
        'ats-marquee-reverse': {
          from: { transform: 'translate3d(-50%, 0, 0)' },
          to: { transform: 'translate3d(0, 0, 0)' },
        },
        'ats-shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'ats-pulse-ring': {
          '0%': { transform: 'scale(0.9)', opacity: '0.7' },
          '70%, 100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'ats-scroll-hint': {
          '0%, 100%': { transform: 'translateY(0)', opacity: '0.35' },
          '50%': { transform: 'translateY(6px)', opacity: '1' },
        },
      },
      animation: {
        'ats-drift': 'ats-drift 22s cubic-bezier(0.45, 0, 0.55, 1) infinite',
        'ats-drift-slow': 'ats-drift-slow 30s cubic-bezier(0.45, 0, 0.55, 1) infinite',
        'ats-marquee': 'ats-marquee var(--ats-marquee-duration, 40s) linear infinite',
        'ats-marquee-reverse':
          'ats-marquee-reverse var(--ats-marquee-duration, 40s) linear infinite',
        'ats-shimmer': 'ats-shimmer 6s linear infinite',
        'ats-pulse-ring': 'ats-pulse-ring 2.6s cubic-bezier(0.22, 1, 0.36, 1) infinite',
        'ats-scroll-hint': 'ats-scroll-hint 2s ease-in-out infinite',
      },
    },
  },
  plugins: [
    // Emit the semantic token variables. Dark is the default scheme for the
    // marketing site; `.light` on <html> is the manual override.
    plugin(({ addBase, addVariant }) => {
      addBase({
        ':root': { ...constantVars, ...schemeVars('dark'), 'color-scheme': 'dark' },
        '.light': { ...schemeVars('light'), 'color-scheme': 'light' },
      });
      // `hocus:` — hover and focus-visible in one place for CTA affordances.
      addVariant('hocus', ['&:hover', '&:focus-visible']);
      // `group-hocus:` counterpart.
      addVariant('group-hocus', [':merge(.group):hover &', ':merge(.group):focus-visible &']);
    }),
  ],
};

export default config;
