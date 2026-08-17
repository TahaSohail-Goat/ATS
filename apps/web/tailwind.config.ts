import type { Config } from 'tailwindcss';
import { colors } from '@ats/ui/tokens/colors';

// ATS design tokens are the single source of color truth — see
// docs/frontend/design-system.md and packages/ui/src/tokens.
const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'ats-primary': colors.primary,
        'ats-secondary': colors.secondary,
        'ats-brand': colors.brand,
        'ats-accent': colors.accent,
        'ats-bg-light': colors.backgroundLight,
        'ats-bg-dark': colors.backgroundDark,
        'ats-text': colors.text,
        'ats-text-muted': colors.textMuted,
        'ats-success': colors.success,
        'ats-error': colors.error,
      },
    },
  },
  plugins: [],
};

export default config;
